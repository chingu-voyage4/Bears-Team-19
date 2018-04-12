import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import LabelledInput from '../../Form/LabelledInput';

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
      <form>
        <LabelledInput
          inputId="username"
          label="Username"
          inputText={this.state.username} 
          onChange={this.handleChange} 
          disabled={this.props.disabled}
        />
        <LabelledInput
          inputId="password"
          label="Password"
          inputText={this.state.password} 
          onChange={this.handleChange} 
          disabled={this.props.disabled}
        />
        <div className="form-group">
          <button
            className="btn btn-primary"
            type="button"
            onClick={this.handleSubmit}
            disabled={this.props.disabled || this.state.username === '' || this.state.password === ''}
          >Log In</button>
        </div>
      </form>
    );
  }
}

LoginForm.propTypes = {
  disabled: PropTypes.bool.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default LoginForm;
