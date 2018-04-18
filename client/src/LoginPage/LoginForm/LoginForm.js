import React, { Component } from 'react';
import PropTypes from 'prop-types';
import LabelledInput from '../../Form/LabelledInput';
import './LoginForm.css';

class LoginForm extends Component {
  constructor(props){
    super(props);

    this.state = {
      username: '',
      password: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ 
      [event.target.id]: event.target.value, 
    });
  }

  handleSubmit(){
    const { username, password } = this.state;
    this.props.onSubmit({ username, password });
  }

  render() {
    return (
      <form className="LoginForm">
        <div className="LoginForm-icon mb-4">
          <i className="fas fa-user fa-5x"></i>
        </div>
        <LabelledInput
          inputId="username"
          label="Username"
          inputText={this.state.username} 
          onChange={this.handleChange} 
          disabled={this.props.disabled}
          type="text"
          placeholder="Enter your username"
          autoComplete="username"
        />
        <LabelledInput
          inputId="password"
          label="Password"
          inputText={this.state.password} 
          onChange={this.handleChange} 
          disabled={this.props.disabled}
          type="password"
          placeholder="Enter your password"
          autoComplete="current-password"
        />
        <button
          className="btn btn-primary"
          type="button"
          onClick={this.handleSubmit}
          disabled={this.props.disabled || this.state.username === '' || this.state.password === ''}
        >Sign In</button>
      </form>
    );
  }
}

// those props are set up by AsyncFormPage, not LoginPage
LoginForm.propTypes = {
  disabled: PropTypes.bool,
  onSubmit: PropTypes.func,
};

export default LoginForm;
