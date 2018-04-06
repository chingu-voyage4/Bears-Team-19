import React from 'react';
import { shallow, mount, render } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';
import AuthContainer from './Auth.js';
import Register from './Register/Register.js';


describe('Register component', () => {
  it('Register component should exist within Container', () => {
    const wrapper = mount(
      <MemoryRouter>
        <AuthContainer />
      </MemoryRouter>);
    expect(wrapper.find(Register)).toBeDefined();
  });
});