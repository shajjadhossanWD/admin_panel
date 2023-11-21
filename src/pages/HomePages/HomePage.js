import React from 'react';
import BannerItem from './BannerItem';
import FooterItem from './FooterItem';
import NavbarHome from './NavbarHome';

const HomePage = () => {
  return (
    <div>
      <NavbarHome />
      <BannerItem />
      <FooterItem />
    </div>
  );
}

export default HomePage;
