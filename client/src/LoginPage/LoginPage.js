import React, { Component } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import AsyncFormPage from '../Form/AsyncFormPage'
import LoginForm from './LoginForm/LoginForm';

class LoginPage extends Component {
  constructor(props) {
    super(props);

    this.handleLogin = this.handleLogin.bind(this);
  }

  handleLogin(loginData){
    return axios.post('/api/auth/login', loginData)
      .then((response) => {
        this.props.auth.login(response.data);
      });
  }

  render(){
    const redirect = this.props.location.state && this.props.location.state.from && this.props.location.state.from.pathname
      ? this.props.location.state.from.pathname 
      : '/projects';
    return (
      <AsyncFormPage className="LoginPage" title="Log In" actionName="Logging in" 
        redirect={redirect} asyncAction={this.handleLogin}
      >
        <LoginForm />
      </AsyncFormPage>
    );
  }
};

LoginPage.propTypes = {
  auth: PropTypes.shape({
    user: PropTypes.object,
    login: PropTypes.func,
  }).isRequired,
  location: PropTypes.object.isRequired,
};
export default LoginPage;
