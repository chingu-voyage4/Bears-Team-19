import React from 'react';
import { shallow, mount, render } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';
import Header from './Header';
import HeaderNavbar from './Navbar/HeaderNavbar';

describe('Header component', () => {
  it('should render a header element', () => {
    const wrapper = render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>);
    expect(wrapper.find('header')).toBeDefined();
  });

  it('should contain a HeaderNavbar', () => {
    const wrapper = mount(
      <MemoryRouter>
        <Header />
      </MemoryRouter>);
    expect(wrapper.find(HeaderNavbar)).toHaveLength(1);
  });
});
