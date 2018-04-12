import React, { Component } from 'react';
import LoginForm from './LoginForm/LoginForm';

class LoginPage extends Component {
  constructor(props) {
    super(props);
  }

  render(){
    return (
      <div className="LoginPage container text-center">
        <h1>Log In</h1>
        <LoginForm />
      </div>
    );
  }
};

export default LoginPage;
