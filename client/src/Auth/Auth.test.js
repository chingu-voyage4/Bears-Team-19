import React from 'react';
import { shallow, mount, render } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';
import AuthContainer from './Auth.js';
import Register from './Register/Register.js';
import ErrorBoundary from '../Utils/ErrorBoundary/ErrorBoundary.js';

const props = {
  location: {},
};

describe('Register component', () => {
  it('Register component should exist within Container', () => {
    const wrapper = mount(
      <ErrorBoundary>
        <AuthContainer {...props}/>
      </ErrorBoundary>);
    expect(wrapper.find(Register)).toBeDefined();
  });
});