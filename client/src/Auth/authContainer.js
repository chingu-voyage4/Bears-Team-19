import React, { Component } from 'react';
import Register from './Register/register.js';
import axios from 'axios';

const defaultState = {
    username: '',
    password: '',
    passwordMatch: ''
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

        axios.post('/api/register')
            .then(res => {         
                return res;
            }) 
        return this.clearState();
    }

    render () {
        return(
            <Register handleChange={this.handleChange} inputs={this.state} handleSubmit={this.handleSubmit} />
        )
    }
};

export default Auth;