import React from 'react';
import { shallow } from 'enzyme';
import LoginForm from './LoginForm';
import LabelledInput from '../../Form/LabelledInput';

describe('LoginForm', () => {
  test('It exists', () => {
    const wrapper = shallow(<LoginForm />);
    expect(wrapper).toBeDefined();
  });

  test('It renders a form', () => {
    const wrapper = shallow(<LoginForm />);
    expect(wrapper.type()).toEqual('form');
  });

  test('The form contains inputs for username and password and a submit button', () => {
    const wrapper = shallow(<LoginForm />);
    expect(wrapper.children()).toHaveLength(3);
    expect(wrapper.childAt(0).type()).toEqual(LabelledInput);
    expect(wrapper.childAt(0).props().label).toEqual('Username');
    expect(wrapper.childAt(1).type()).toEqual(LabelledInput);
    expect(wrapper.childAt(1).props().label).toEqual('Password');
    expect(wrapper.childAt(2).type()).toEqual('button');
    expect(wrapper.childAt(2).text()).toEqual('Log In');
  });
});