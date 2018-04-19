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
        this.setState({
            [input]: e.target.value
        })
    }

    handleSubmit = () => {
        const {username, email, password } = this.state; 
        axios.post('/api/users', {username, email, password})
            .then(res => {       
                return res.data;
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
            <div className="container-fluid d-flex flex-column my-auto py-3">
                <div className="d-flex flex-column col-xl-4 col-lg-5 col-md-6 col-sm-8 col-9 mx-auto">
                    <Register 
                        handleChange={this.handleChange} 
                        inputs={this.state} 
                        handleSubmit={this.handleSubmit}
                        onFocus={this.onFocus}
                        onBlur={this.onBlur}
                        />
                </div>
            </div>
        )
    }
};

export default Auth;