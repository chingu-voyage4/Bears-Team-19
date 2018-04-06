import React, { Component } from 'react';
import Register from './Register/Register.js';
import axios from 'axios';

const defaultState = {
    username: '',
    password: '',
    confirmPassword: '',
    focus: ''
};

class Auth extends Component {
    constructor (props) {
        super();
         
        this.state = defaultState;
    }

    clearState = () => {
        this.setState(defaultState);
    }

    handleChange = (input, e) => {
        this.setState({
            [input]: e.target.value
        })
    }

    handleSubmit = () => {
        const {username, password } = this.state; 
        axios.post('/api/register', {username, password})
            .then(res => {         
                return res;
            }) 
        return this.clearState();
    }

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
        return(
            <Register 
                handleChange={this.handleChange} 
                inputs={this.state} 
                handleSubmit={this.handleSubmit}
                onFocus={this.onFocus}
                onBlur={this.onBlur}
                />
        )
    }
};

export default Auth;