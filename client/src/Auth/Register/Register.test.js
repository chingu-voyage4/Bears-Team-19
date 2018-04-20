import React from 'react';
import { mount } from 'enzyme';
import Register from './Register';

const defaultInputs = {
  username: '',
  password: '',
  email: '',
  confirmPassword: '',
  focus: ''
};

  const props = {
    handleChange: (e) => e,
    inputs: defaultInputs,
    handleSubmit: (e) => e,
    onFocus: (e) => e,
    onBlur: (e) => e
  };

describe('Register Component', () => {
  

  it('Component renders 3 inputs', () => {
    const wrapper = mount(
      <Register {...props} /> 
    );

    const inputs = wrapper.find('input');
    expect(inputs.length).toEqual(3);
    
  });

  it('Component renders 1 button', () => {
    const wrapper = mount(
      <Register {...props} /> 
    );

    const button = wrapper.find('button');
    expect(button.length).toEqual(1);
  })

  it('Component renders fourth input once password field is 6 or more characters long', () => {
    const newInputs = {
      username: '',
      password: 'passw',
      email: '',
      confirmPassword: '',
      focus: ''
    };

    const wrapper = mount(
      <Register {...props} inputs={newInputs} />
    );

    const inputs = wrapper.find('input');
    const passwordInput = inputs.at(2);

    expect(inputs.length).toEqual(3);
    expect(passwordInput.props().value.length).toEqual(5);

    const longerInputs = {
      username: '',
      password: 'passwo',
      email: '',
      confirmPassword: '',
      focus: ''
    }

    wrapper.setProps({inputs: longerInputs});
    const newInput = wrapper.find('input');
    expect(newInput.length).toEqual(4);
    expect(newInput.at(2).props().value.length).toEqual(6);
  })

  it('Inputs are empty by default', () => {

    const wrapper = mount(
    <Register {...props} />
    );

    // takes first input
    const firstInput = wrapper.find('input').at(0);
    const secondInput = wrapper.find('input').at(1);
    expect(firstInput.props().value).toMatch('');
    expect(secondInput.props().value).toMatch('')
  });

  it('Component is controlled and renders inputs.username value in first input', () => {
    const newInputs = {
      username: 'foo',
      password: '',
      email: '',
      confirmPassword: '',
      focus: 'username'
    };

    const wrapper = mount(
      <Register {...props} inputs={newInputs} /> 
    );

    const username = wrapper.find('input').at(0);
    expect(username.props().value).toMatch(/foo/);
  });

  it('Username input has a string < than 5 chars length it renders an error message', () => {
    const newInputs = {
      username: 'fooo',
      password: '',
      email: '',
      confirmPassword: '',
      focus: 'username'
    };

    const wrapper = mount(
      <Register {...props} inputs={newInputs} /> 
    );
    const username = wrapper.find('input').at(0);
    expect(username.props().value).toMatch(/fooo/);
    expect(username.props().value.length).toEqual(4);

    username.find('input').prop('onFocus')()
    const p = wrapper.find('p');
    expect(p.length).toEqual(1);
  })

  it('Username input shows error at 4 characters but no error at 5 or more chars in length', () => {
    const newInputs = {
      username: 'foob',
      password: '',
      email: '',
      confirmPassword: '',
      focus: 'username'
    };

    const wrapper = mount(
      <Register {...props} inputs={newInputs} /> 
    );
    const username = wrapper.find('input').at(0);
    expect(username.props().value).toMatch(/foob/);
    expect(username.props().value.length).toEqual(4);

    username.find('input').prop('onFocus')()
    const p = wrapper.find('p');
    expect(p.length).toEqual(1);

    const longerInputs = {
      username: 'foobar',
      password: '',
      email: '',
      confirmPassword: '',
      focus: 'username'
    }

    wrapper.setProps({inputs: longerInputs});
    const newUsername = wrapper.find('input').at(0);
    expect(newUsername.props().value).toMatch(/foobar/);
    expect(newUsername.props().value.length).toEqual(6);

    newUsername.find('input').prop('onFocus')()
    const newP = wrapper.find('p');
    expect(newP.length).toEqual(0);
  })

  it('Username Input is not focused, does not display error message', () => {
    const newInputs = {
      username: 'foo',
      password: '',
      email: '',
      confirmPassword: '',
      focus: ''
    };

    const wrapper = mount(
      <Register {...props} inputs={newInputs} /> 
    );
    const username = wrapper.find('input').at(0);
    expect(username.props().value).toMatch(/foo/);
    const p = wrapper.find('p');
    expect(p.length).toEqual(0);
  })

  it('Input is not focused but has value not meeting length, has class of dirty', () => {
    const newInputs = {
      username: 'foo',
      password: '',
      email: '',
      confirmPassword: '',
      focus: ''
    };

    const wrapper = mount(
      <Register {...props} inputs={newInputs} /> 
    );

    const usernameInput = wrapper.find('input').at(0);
    expect(usernameInput.hasClass('dirty')).toEqual(true);
  })

  it('Button is by default disabled', () => {

    const wrapper = mount(
      <Register {...props} /> 
    );

    const button = wrapper.find('button');
    expect(button.prop('disabled')).toBe(true);
  })

  it('Button is disabled when 2 inputs match requirements', () => {
    const newInputs = {
      username: 'heyjp',
      password: 'password',
      email: '',
      confirmPassword: '',
      focus: ''
    };

    const wrapper = mount(
      <Register {...props} inputs={newInputs} />
    );

    const button = wrapper.find('button');
    expect(button.prop('disabled')).toBe(true);
  })

  it('All 4 fields have valid inputs, button is enabled', () => {
    const newInputs = {
      username: 'heyjpp',
      password: 'password',
      email: 'joebloggs@example.com',
      confirmPassword: 'password',
      focus: ''
    };

    const wrapper = mount(
      <Register {...props} inputs={newInputs} />
    );

    const button = wrapper.find('button');
    expect(button.prop('disabled')).toBe(false);
  })

  it('Fields can be cleared', () => {
    const newInputs = {
      username: 'heyjpp',
      password: 'password',
      email: '',
      confirmPassword: 'password',
      focus: ''
    };

    const wrapper = mount(<Register {...props} inputs={newInputs} />);
    const firstInput = wrapper.find('input').at(0);
    expect(firstInput.props().value).toMatch(/heyjpp/);
    wrapper.setProps({inputs: props.inputs});
    expect(firstInput.props().value).toMatch('');
  })

  it('Username input contains spaces, returns error message')
  it('checks that email is valid')
  
});
