import React from 'react';
import { shallow } from 'enzyme';
import LoginPage from './LoginPage';
import LoginForm from './LoginForm/LoginForm';

describe('LoginPage', () => {
  test('It exists', () => {
    const wrapper = shallow(<LoginPage />);
    expect(wrapper).toBeDefined();
  });

  test('It renders a title and a form inside a container div', () => {
    const wrapper = shallow(<LoginPage />);
    expect(wrapper.type()).toEqual('div');
    expect(wrapper.hasClass('LoginPage')).toBe(true);
    expect(wrapper.hasClass('container')).toBe(true);
    expect(wrapper.hasClass('text-center')).toBe(true);
    expect(wrapper.children()).toHaveLength(2);
    expect(wrapper.childAt(0).type()).toEqual('h1');
    expect(wrapper.childAt(1).type()).toEqual(LoginForm);
  });
});