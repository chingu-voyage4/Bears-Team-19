import React, { Component } from 'react';
import Register from './Register/Register.js';
import axios from 'axios';

const defaultState = {
    username: '',
    email: '',
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
        console.log(input, e , 'this is handlechange')
        this.setState({
            [input]: e.target.value
        })
    }

    handleSubmit = () => {
        const {username, email, password } = this.state; 
        axios.post('/api/user/create', {username, email, password})
            .then(res => {    
                console.log(res, 'this is res on handlesubmit');     
                return res;
            })
            .catch(err => {
                console.log(err, 'this is err');
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