import imgSrc1 from '../../public/assets/images/coverImg/img1.png';
import imgSrc2 from '../../public/assets/images/coverImg/img2.png';
import imgSrc3 from '../../public/assets/images/coverImg/img3.png';
import imgSrc4 from '../../public/assets/images/coverImg/img4.png';
import imgSrc5 from '../../public/assets/images/coverImg/img5.png';
import imgSrc6 from '../../public/assets/images/coverImg/img6.png';
import imgSrc7 from '../../public/assets/images/coverImg/img7.png';
import imgSrc8 from '../../public/assets/images/coverImg/img8.png';
import imgSrc9 from '../../public/assets/images/coverImg/img9.png';
import imgSrc10 from '../../public/assets/images/coverImg/img10.png';
import imgSrc11 from '../../public/assets/images/coverImg/img11.png';
import imgSrc12 from '../../public/assets/images/coverImg/img12.png';
import imgSrc13 from '../../public/assets/images/coverImg/img13.png';
import imgSrc14 from '../../public/assets/images/coverImg/img14.jpeg';
import imgSrc15 from '../../public/assets/images/coverImg/img15.jpeg';
import imgSrc16 from '../../public/assets/images/coverImg/img16.png';
import { motion, useAnimation } from 'framer-motion';

/* const array = [
  '../../public/assets/images/coverImg/img1.png',
  '../../public/assets/images/coverImg/img2.png',
  '../../public/assets/images/coverImg/img3.png',
  '../../public/assets/images/coverImg/img4.png',
  '../../public/assets/images/coverImg/img5.png',
  '../../public/assets/images/coverImg/img6.png',
  '../../public/assets/images/coverImg/img7.png',
  '../../public/assets/images/coverImg/img8.png',
  '../../public/assets/images/coverImg/img9.png',
]; */

const Card = () => {
  let allImg, curImg;
  (function changeImg() {
    allImg = [
      imgSrc1,
      imgSrc2,
      imgSrc3,
      imgSrc4,
      imgSrc5,
      imgSrc6,
      imgSrc7,
      imgSrc8,
      imgSrc9,
      imgSrc10,
      imgSrc11,
      imgSrc12,
      imgSrc13,
      imgSrc14,
      imgSrc15,
      imgSrc16,
    ];
    curImg = allImg[Math.round(Math.random() * 15)].src;
  })();

  const cardBackground = {
    backgroundImage: `url('${curImg}')`,
    backgroundSize: 'cover',
  };
  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        drag
        dragConstraints={{ top: 0, right: 100, bottom: 0, left: 0 }}>
        <div className='border-none rounded-xl w-64 h-64' style={cardBackground}></div>
      </motion.div>
    </>
  );
};

export default Card;
