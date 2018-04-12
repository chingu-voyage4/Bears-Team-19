import React from 'react';
import { shallow } from 'enzyme';
import AsyncFormPage from '../Form/AsyncFormPage'
import LoginPage from './LoginPage';
import LoginForm from './LoginForm/LoginForm';

describe('LoginPage', () => {
  test('It exists', () => {
    const wrapper = shallow(<LoginPage />);
    expect(wrapper).toBeDefined();
  });

  test('It renders a title and a form inside a container div', () => {
    const wrapper = shallow(<LoginPage />);
    expect(wrapper.type()).toEqual(AsyncFormPage);
    expect(wrapper.hasClass('LoginPage')).toBe(true);
    expect(wrapper.prop('title')).toBeDefined();
    expect(wrapper.prop('title')).toEqual('Log In');
    expect(wrapper.prop('actionName')).toBeDefined();
    expect(wrapper.prop('actionName')).toEqual('Logging in');
    expect(wrapper.prop('asyncAction')).toBeDefined();
    expect(wrapper.prop('redirect')).toBeDefined();
    expect(wrapper.prop('redirect')).toEqual('/');

    expect(wrapper.children()).toHaveLength(1);
    expect(wrapper.childAt(0).type()).toEqual(LoginForm);
  });
});