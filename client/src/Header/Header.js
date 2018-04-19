import React from 'react';
import HeaderNavbar from './Navbar/HeaderNavbar';
import './Header.css';

const Header = (props) => {
  return (
    <div className="Header">
      <HeaderNavbar auth={props.auth} />
    </div>
  );
}

export default Header;
