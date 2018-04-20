import React, { Component } from 'react';
import PropTypes from 'prop-types';
import AsyncFormPage from '../Form/AsyncFormPage'
import Register from './Register/Register.js';
import axios from 'axios';

const defaultState = {
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    focus: '',
};

class Auth extends Component {
    constructor (props) {
        super(props);
         
        this.state = defaultState;
        this.handleRegister = this.handleRegister.bind(this);
    }

    clearState = () => {
        this.setState(defaultState);
    }

    handleChange = (input, e) => {
        this.setState({
            [input]: e.target.value
        })
    }

    handleRegister = (userData) => {
        return axios.post('/api/users', userData);
    };

    onFocus = (element) => {
        return this.setState({
            focus: element
        })
    }

    onBlur = () => {
        return this.setState({
            focus: ''
        })
    }

    render () {
        const redirect = this.props.location.state && this.props.location.state.from && this.props.location.state.from.pathname
            ? this.props.location.state.from.pathname 
            : '/login';
        return(
            <AsyncFormPage actionName="Registering" 
                redirect={redirect} asyncAction={this.handleRegister}
            >
                <Register 
                    handleChange={this.handleChange} 
                    inputs={this.state} 
                    onFocus={this.onFocus}
                    onBlur={this.onBlur}
                    />
            </AsyncFormPage>
        )
    }
};

Auth.propTypes = {
  location: PropTypes.object.isRequired,
};

export default Auth;