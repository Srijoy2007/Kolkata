'use client'
import { useEffect, useRef, useState } from "react";
import { initializeApp } from "firebase/app";
import { getStorage, ref, listAll, getDownloadURL } from "firebase/storage";
import { firebaseConfig } from "../firebase";

import styles from "../playsongsold/play.module.css";
import Card from "../components/Card";
import Image from "next/image";
import { Yanone_Kaffeesatz } from "next/font/google";
const yanone = Yanone_Kaffeesatz({
  weight: ["600", "700"],
  subsets: ["latin"],
});

const app = initializeApp(firebaseConfig);
const storage = getStorage();

// Create a reference under which you want to list
const listRef = ref(storage, "songs");

const Page = () => {
  const audioRef = useRef(null);
  const [songs, setSongs] = useState([]);
  const [currentsongIndex, setCurrentsongsIndex] = useState(0);
  const [playState, setPlayState] = useState(false);
  const songPath = useRef();
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const fetchSongs = async () => {
      // Find all the prefixes and items.
      await listAll(listRef)
        .then((res) => {
          res.prefixes.forEach((folderRef) => {
            console.log("folderref", folderRef);
          });
          res.items.forEach((itemRef) => {
            console.log("itermPathLocation", itemRef._location.path_);
            getDownloadURL(ref(storage, itemRef._location.path_)).then(
              (url) => {
                setSongs((prevSongs) => [...prevSongs, url]);
                console.log("downloadurl:", url);
              }
            );
          });
        })
        .catch((error) => {
          console.log(error);
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
    <div className="min-h-screen flex flex-col justify-center items-center  text-white">
      {/* this is the bg for the page */}
      <div className={`${styles.bg_before} absolute inset-0 z-0`}></div>

      <div className="absolute top-10 xl:top-28 right-10 xl:right-28 xsm:top-40 flex flex-col justify-center items-center ">
        {cardRerender && <Card />}

        <div className="py-4 flex items-center">
          <button onClick={handleAudioClick} className="mr-4">
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

      <div className="absolute bottom-10 xl:bottom-28 left-10 xl:left-60 flex flex-col items-center">
        <h1
          className={`${yanone.className} text-3xl md:text-5xl font-extrabold md:mb-5`}
        >
          Amar<span className="text-pink-600"> কলকাতা</span>
        </h1>
        <p className="text-white my-4">
          Press{" "}
          <span className="bg-slate-300 p-1 opacity-70 rounded-md">Space</span>{" "}
          OR
          <span className="bg-slate-300 p-1 opacity-70 rounded-md">Tab</span> to
          play
        </p>
      </div>

      <audio
        src={songPath.current}
        ref={audioRef}
        onEnded={handleAudioEnded}
      ></audio>
    </div>
  );
};

export default Page;
