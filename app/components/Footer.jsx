import { AiFillTwitterCircle } from 'react-icons/ai';
import { BsGithub } from 'react-icons/bs';
import Link from 'next/link';

const Footer = () => {
  return (
    <div className='bg-trasparent absolute bottom-0 text-white flex justify-end w-full p-[10px] text-4xl'>
      <Link href={'https://github.com/Srijoy2007/KOLKATA-FM'} target='_blank'>
        <BsGithub className='text-white mr-4 cursor-pointer' />
      </Link>
      <Link href={'https://twitter.com/SrijoyGanguly'} target='_blank'>
        <AiFillTwitterCircle className='text-white cursor-pointer' />
      </Link>
      <Link href={'https://docs.google.com/forms/d/1FLrVcoK-By3aI--KkVTkKtGPvXUMWOvP8bfgNiCa8QQ/edit'} target='_blank'>
        
        <p className='text-sm my-3 mr-3 ml-3 decoration-slice  '>REQUEST SONG</p>
      </Link>
    </div>
  );
};

export default Footer;
