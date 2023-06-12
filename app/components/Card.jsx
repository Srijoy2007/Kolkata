import imgSrc1 from '../../public/assets/images/coverImg/image1.gif';
import imgSrc2 from '../../public/assets/images/coverImg/image2.gif';
import imgSrc3 from '../../public/assets/images/coverImg/image3.gif';
import imgSrc4 from '../../public/assets/images/coverImg/image4.gif';
import imgSrc5 from '../../public/assets/images/coverImg/image5.gif';
import imgSrc6 from '../../public/assets/images/coverImg/image6.gif';
import imgSrc7 from '../../public/assets/images/coverImg/image7.gif';
import imgSrc8 from '../../public/assets/images/coverImg/image8.gif';
import imgSrc9 from '../../public/assets/images/coverImg/image9.gif';
import imgSrc10 from '../../public/assets/images/coverImg/image10.gif';
import imgSrc11 from '../../public/assets/images/coverImg/image11.gif';
import imgSrc12 from '../../public/assets/images/coverImg/image12.gif';
import imgSrc13 from '../../public/assets/images/coverImg/image13.gif';
import imgSrc14 from '../../public/assets/images/coverImg/image14.gif';
import imgSrc15 from '../../public/assets/images/coverImg/image15.gif';
import imgSrc16 from '../../public/assets/images/coverImg/image16.gif';
import imgSrc17 from '../../public/assets/images/coverImg/image17.gif';
import imgSrc18 from '../../public/assets/images/coverImg/image18.gif';

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
      imgSrc17,
      imgSrc18
    ];
    curImg = allImg[Math.round(Math.random() * 15)].src;
  })();

  const cardBackground = {
    backgroundImage: `url('${curImg}')`,
    backgroundSize: 'cover',
  };
  return (
    <div className=''>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        drag
        
        dragConstraints={{ top: 0, right: 100, bottom: 0, left: 0 }}>
        <div  className="border-none rounded-xl w-44 h-44 md:w-64 md:h-64 md:py-10 sm:mx-auto sm:my-20- mt-30 " style={cardBackground}></div>
      </motion.div>
    </div>
  );
};

export default Card;
