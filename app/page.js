'use client';
import Link from 'next/link';
import { Yanone_Kaffeesatz } from 'next/font/google';
import TextAnimation from './components/TextAnimation';
import './globals.css';
import styles from './mainPage.module.css';

const yanone = Yanone_Kaffeesatz({ subsets: ['latin'], weight: ['300', '500', '600', '700'] });
const page = () => {
  return (
    <>
      <div className={`${styles.main_bg} min-h-screen min-w-full -z-10 absolute top-0`}></div>
      <div className={`flex_center min-h-screen min-w-full bg-transparent flex_center flex-col`}>
        <TextAnimation text="KOLKATA-FM" fontClassname={yanone.className} />
        <Link
          className={`bg-white p-4 px-6 rounded-md ${yanone.className} font-bold text-2xl cursor-pointer`}
          href="/play">
          Play Music
        </Link>
      </div>
    </>
  );
};

export default page;
 