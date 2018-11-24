import React from 'react';
import Navbar from 'react-bootstrap/lib/Navbar';

const NavBar = () => {
  return (
    <Navbar>
      <Navbar.Brand>
        <img 
          alt='UW University of Washington logo'
          src='../../../assets/W-Logo_White.png' />
        {'UW Foster School of Business'}
      </Navbar.Brand>
    </Navbar>
  );
};

export default NavBar;
