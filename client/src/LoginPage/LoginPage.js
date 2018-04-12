import React, { Component } from 'react';
import axios from 'axios';
import AsyncFormPage from '../Form/AsyncFormPage'
import LoginForm from './LoginForm/LoginForm';

class LoginPage extends Component {
  constructor(props) {
    super(props);

    this.handleLogin = this.handleLogin.bind(this);
  }

  handleLogin(loginData){
    return axios.post('/api/auth/login', loginData);
  }

  render(){
    return (
      <AsyncFormPage className="LoginPage" title="Log In" actionName="Logging in" redirect="/" asyncAction={this.handleLogin}>
        <LoginForm />
      </AsyncFormPage>
    );
  }
};

export default LoginPage;
