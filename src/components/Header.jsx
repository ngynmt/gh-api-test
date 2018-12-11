import React from 'react';
import Logo from '../assets/Logo';


const Header = () => {
  const openSideBar = () => {
    document.getElementsByClassName('sidebar')[0].style.width = '14rem';
  };

  return (
    <div className="header" onClick={openSideBar} onKeyPress={openSideBar}>
      <div className="burger-menu-container">
        <div className="burger-menu" />
        <div className="burger-menu" />
        <div className="burger-menu" />
      </div>
      <Logo />
    </div>
  );
};

export default Header;
