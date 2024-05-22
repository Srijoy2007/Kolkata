'use client'
import { useEffect, useRef, useState } from "react";
import { initializeApp } from "firebase/app";
import { getStorage, ref, listAll, getDownloadURL } from "firebase/storage";
import { firebaseConfig } from "../firebase"; // Ensure you have updated this file
import styles from "../playsongsold/play.module.css";
import Card from "../components/Card";
import Image from "next/image";
import { Yanone_Kaffeesatz } from "next/font/google";
import { Range } from "react-range";

const yanone = Yanone_Kaffeesatz({
  weight: ["600", "700"],
  subsets: ["latin"],
});

const app = initializeApp(firebaseConfig);
const storage = getStorage();

// Reference to your new songs directory
const listRef = ref(storage, "new-songs");

const Page = () => {
  const audioRef = useRef(null);
  const [songs, setSongs] = useState([]);
  const [currentsongIndex, setCurrentsongsIndex] = useState(0);
  const [playState, setPlayState] = useState(false);
  const songPath = useRef();
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(50); // Initial volume value

  const getTrackBackground = ({ values, colors, min, max }) => {
    const range = max - min;
    const percentage = ((values[0] - min) / range) * 100;
    return `linear-gradient(90deg, ${colors[0]} ${percentage}%, ${colors[1]} ${percentage}%)`;
  };

  const handleVolumeChange = (values) => {
    const newVolume = values[0];
    setVolume(newVolume);
    audioRef.current.volume = newVolume / 100;
  };

  useEffect(() => {
    const fetchSongs = async () => {
      await listAll(listRef)
        .then((res) => {
          res.items.forEach((itemRef) => {
            getDownloadURL(ref(storage, itemRef.fullPath)).then(
              (url) => {
                setSongs((prevSongs) => [...prevSongs, url]);
              }
            );
          });
        })
        .catch((error) => {
          console.error(error);
        });
    };
    fetchSongs();
  }, []);

  songPath.current = songs[currentsongIndex];

  useEffect(() => {
    if (songs.length > 0) audioRef.current.play();
  }, [currentsongIndex]);

  const handleAudioClick = () => {
    isPlaying ? audioRef.current.pause() : audioRef.current.play();
    setPlayState((pre) => !pre);
    setIsPlaying((prevState) => !prevState);
    setCardRerender(true);
  };

  const handleAudioEnded = () => {
    songs.length - 1 === currentsongIndex
      ? setCurrentsongsIndex(0)
      : setCurrentsongsIndex((prevIndex) => prevIndex + 1);
    setCardRerender(true);
    setPlayState(true);
  };

  const handleAudioPrevious = () => {
    setCurrentsongsIndex((prevIndex) =>
      prevIndex === 0 ? songs.length - 1 : prevIndex - 1
    );
    setCardRerender(true);
    setPlayState(true);
  };

  const [cardRerender, setCardRerender] = useState(true);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.code === "Space" || event.code === "Tab") {
        event.preventDefault();
        isPlaying ? audioRef.current.pause() : audioRef.current.play();
        handleAudioClick();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col justify-center items-center text-white">
      <div className={`${styles.bg_before} absolute inset-0 z-0`}></div>

      <div className="absolute top-10 xl:top-28 right-10 xl:right-28 xsm:top-40 flex flex-col justify-center items-center ">
        {cardRerender && <Card />}

        <div className="py-4 flex items-center">
          <button onClick={handleAudioPrevious} className="ml-4">
            <Image
              src={"/assets/images/back.png"}
              width={60}
              height={60}
              className="xl:text-[5rem] text-6xl text-white"
              alt=""
            />
          </button>
          <button onClick={handleAudioClick} className="mr-4 ml-4">
            {playState ? (
              <Image
                src={"/assets/images/pause.png"}
                width={50}
                height={50}
                className="xl:text-[5rem] text-6xl text-white"
                alt=""
              />
            ) : (
              <Image
                src={"/assets/images/play.png"}
                width={50}
                height={50}
                className="xl:text-[5rem] text-6xl text-white"
                alt=""
              />
            )}
          </button>
          <button onClick={handleAudioEnded} className="ml-4">
            <Image
              src={"../assets/images/next.svg"}
              width={60}
              height={60}
              className="xl:text-[5rem] text-6xl text-white"
              alt=""
            />
          </button>
        </div>
      </div>

      <div className="absolute bottom-10 xl:bottom-5 left-10 xl:left-60 flex flex-col items-center mb-8">
        <h1 className={`${yanone.className} text-3xl md:text-5xl font-extrabold md:mb-3`}>
          Amar<span className="text-pink-600"> কলকাতা</span>
        </h1>
        <p className="text-white my-4">
          Press{" "}
          <span className="bg-slate-300 p-1 opacity-70 rounded-md">Space</span>{" "}
          OR
          <span className="bg-slate-300 p-1 opacity-70 rounded-md">Tab</span> to
          play
        </p>
        <div className="w-64">
          <Range
            values={[volume]}
            step={1}
            min={0}
            max={100}
            onChange={handleVolumeChange}
            renderTrack={({ props, children }) => (
              <div
                {...props}
                className="h-1 bg-gray-300 rounded-md"
                style={{ touchAction: 'none' }}
              >
                <div className="flex">
                  <div
                    className="h-1 bg-indigo-600 rounded-md"
                    style={{
                      width: `${volume}%`,
                      transition: 'width 0.2s',
                    }}
                  >
                    {children}
                  </div>
                </div>
              </div>
            )}
            renderThumb={({ props }) => (
              <div
                {...props}
                className="h-5 w-5 bg-indigo-600 rounded-full shadow-md cursor-pointer"
              />
            )}
          />
        </div>
      </div>

      <audio
        ref={audioRef}
        src={songPath.current}
        onEnded={handleAudioEnded}
        onPause={() => setIsPlaying(false)}
        onPlay={() => setIsPlaying(true)}
      />
    </div>
  );
};

export default Page;
