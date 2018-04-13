import React from 'react';
import HeaderNavbar from './Navbar/HeaderNavbar';

const Header = (props) => {
  return (
    <HeaderNavbar user={props.user} />
  );
}

export default Header;
