import React from 'react';
import HeaderNavbar from './Navbar/HeaderNavbar';

const Header = (props) => {
  return (
    <HeaderNavbar auth={props.auth} />
  );
}

export default Header;
