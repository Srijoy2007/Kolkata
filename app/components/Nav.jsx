import Image from 'next/image';
import Logo from '../../public/assets/images/logo.svg';

const Nav = () => {
  return (
    <div className={`pt-[30px] xl:pl-[40px] xsm:flex xsm:justify-center xsm:items-center`}>
      <Image src={Logo} width={150} height={150} priority alt=''/>
    </div>
  );
};

export default Nav;
