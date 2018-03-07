import React from 'react';
import { shallow, mount, render } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';
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
    const wrapper = mount(
      <MemoryRouter>
        <HeaderNavbar />
      </MemoryRouter>);
    expect(wrapper.find(Navbar)).toBeDefined();
  });
});
