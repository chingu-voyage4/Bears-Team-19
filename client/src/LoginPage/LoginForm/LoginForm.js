import React, { Component, Fragment } from 'react';
import LabelledInput from '../../Form/LabelledInput';

class LoginForm extends Component {
  constructor(props){
    super(props);
  }

  render() {
    return (
      <form>
        <LabelledInput
          inputId="username"
          label="Username"
        />
        <LabelledInput
          inputId="password"
          label="Password"
        />
        <button>Log In</button>
      </form>
    );
  }
}

export default LoginForm;
