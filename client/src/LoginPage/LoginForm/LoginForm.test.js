import React from 'react';
import { shallow } from 'enzyme';
import LoginForm from './LoginForm';
import LabelledInput from '../../Form/LabelledInput';

const testProps = {
  disabled: false,
  onSubmit: () => {},
};

const USERNAME = 0;
const PASSWORD = 1;
const SUBMIT = 2;
const CHILDREN = 3;

describe('LoginForm', () => {
  test('It exists', () => {
    const wrapper = shallow(<LoginForm {...testProps} />);
    expect(wrapper).toBeDefined();
  });

  test('It renders a form', () => {
    const wrapper = shallow(<LoginForm {...testProps} />);
    expect(wrapper.type()).toEqual('form');
  });

  test('The form contains inputs for username and password and a submit button', () => {
    const wrapper = shallow(<LoginForm {...testProps} />);
    expect(wrapper.children()).toHaveLength(CHILDREN);

    expect(wrapper.childAt(USERNAME).type()).toEqual(LabelledInput);
    expect(wrapper.childAt(USERNAME).props().label).toEqual('Username');
    expect(wrapper.childAt(USERNAME).props().type).toEqual('text');
    expect(wrapper.childAt(USERNAME).props().autoComplete).toEqual('username');

    expect(wrapper.childAt(PASSWORD).type()).toEqual(LabelledInput);
    expect(wrapper.childAt(PASSWORD).props().label).toEqual('Password');
    expect(wrapper.childAt(PASSWORD).props().type).toEqual('password');
    expect(wrapper.childAt(PASSWORD).props().autoComplete).toEqual('current-password');

    expect(wrapper.childAt(SUBMIT).type()).toEqual('button');
    expect(wrapper.childAt(SUBMIT).text()).toEqual('Sign In');
  });

  test('When props.disabled is true all elements are disabled', () => {
    const props = {
      disabled: true,
      onSubmit: () => {},
    };
    const wrapper = shallow(<LoginForm {...props} />);
    expect(wrapper.childAt(USERNAME).props().disabled).toEqual(true);
    expect(wrapper.childAt(PASSWORD).props().disabled).toEqual(true);
    expect(wrapper.childAt(SUBMIT).props().disabled).toEqual(true);
  });

  test('When props.disabled is false username and password input is possible', () => {
    const wrapper = shallow(<LoginForm {...testProps} />);
    expect(wrapper.childAt(USERNAME).props().disabled).toEqual(false);
    expect(wrapper.childAt(PASSWORD).props().disabled).toEqual(false);
    expect(wrapper.childAt(SUBMIT).props().disabled).toBeDefined();
  });

  test('When username is empty the submit button is disabled');
  test('When password is empty the submit button is disabled');
  test('When both username and password are non-empty the submit button is enabled');
  test('When the submit button is clicked props.onSubmit is called with an object containing the username and password');
});