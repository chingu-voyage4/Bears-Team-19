import React from 'react';
import { shallow, mount, render } from 'enzyme';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink } from 'reactstrap';
import HeaderNavbar from './HeaderNavbar';

describe('HeaderNavbar component', () => {
  it('should create a Navbar', () => {
    const wrapper = shallow(<HeaderNavbar />);
    expect(wrapper.find(Navbar)).toBeDefined();
  });
});
