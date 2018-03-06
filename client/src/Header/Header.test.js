import React from 'react';
import { shallow, mount, render } from 'enzyme';
import Header from './Header';
import HeaderNavbar from './HeaderNavbar';

describe('Header component', () => {
  it('should render a header element', () => {
    const wrapper = render(<Header />);
    expect(wrapper.find('header')).toBeDefined();
  });

  it('should contain a HeaderNavbar', () => {
    const wrapper = shallow(<Header />);
    expect(wrapper.find(HeaderNavbar)).toHaveLength(1);
  });
});
