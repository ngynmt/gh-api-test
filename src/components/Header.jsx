/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react';
import Logo from '../assets/Logo';


const Header = ({ isOpen, toggleSideBar }) => {
  let burgerStyle;
  if (isOpen) {
    burgerStyle = {
      top: {
        transform: 'rotate(45deg) translate(3px,3px)',
        backfaceVisibility: 'hidden',
        backgroundColor: '#d3daea',
        height: '2px',
        transition: 'all .3s',
        width: '20px',
        content: '',
        position: 'absolute',
        top: '13px'
      },
      middle: {
        backgroundColor: 'transparent',
        backfaceVisibility: 'hidden',
        height: '2px',
        transition: 'all .3s',
        width: '20px',
        top: '-1px',
        display: 'block', //
        position: 'relative' //
      },
      bottom: {
        transform: 'rotate(-45deg) translate(5px,-6px)',
        backgroundColor: '#d3daea',
        backfaceVisibility: 'hidden',
        height: '2px',
        transition: 'all .3s',
        width: '20px',
        top: '25px',
        content: '',
        position: 'absolute',
        // top: '-6px'
      }
    };
  } else {
    burgerStyle = {
      top: {
        backfaceVisibility: 'hidden',
        height: '2px',
        transition: 'all .3s',
        width: '20px',
        backgroundColor: '#d3daea',
        content: '',
        position: 'absolute',
        top: '13px'
      },
      middle: {
        backfaceVisibility: 'hidden',
        height: '2px',
        transition: 'all .3s',
        width: '20px',
        top: '-1px',
        backgroundColor: '#d3daea',
        display: 'block', //
        position: 'relative' //
      },
      bottom: {
        backfaceVisibility: 'hidden',
        height: '2px',
        transition: 'all .3s',
        width: '20px',
        backgroundColor: '#d3daea',
        content: '',
        position: 'absolute',
        top: '25px'
      }
    };
  }
  return (
    <div className="header" onClick={() => toggleSideBar()} onKeyPress={() => toggleSideBar()}>
      <a className="toggle">
        <span style={burgerStyle.top} />
        <span style={burgerStyle.middle} />
        <span style={burgerStyle.bottom} />
      </a>
      {/* <Logo style={{ display: 'none' }} /> */}
    </div>
  );
};

export default Header;
