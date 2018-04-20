import React, { Component } from 'react';
import { Redirect } from 'react-router';
import Register from './Register/Register.js';
import axios from 'axios';

const defaultState = {
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    focus: '',
    done: false,
};

class Auth extends Component {
    constructor (props) {
        super(props);
         
        this.state = defaultState;
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    clearState = () => {
        this.setState(defaultState);
    }

    handleChange = (input, e) => {
        this.setState({
            [input]: e.target.value
        })
    }

    handleSubmit = (e) => {
        // prevent submission of form by browser
        e.preventDefault();

        const {username, email, password } = this.state;
        axios.post('/api/users', {username, email, password})
            .then(res => {
                // set the state so we can redirect next time we render
                this.setState({ done: true });
                // tell the App we are logged in
                this.props.auth.login(res.data);
            })
            .catch(err => {
                console.log(err, 'this is err');
            })
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
        if (this.state.done){
            const redirect = this.props.location.state && this.props.location.state.from && this.props.location.state.from.pathname
                ? this.props.location.state.from.pathname 
                : '/projects';
            return(
                <Redirect push to={redirect} />
            );
        }
        return(
            <div className="container-fluid d-flex flex-column my-auto py-3">
                <Register 
                    handleChange={this.handleChange} 
                    inputs={this.state} 
                    handleSubmit={this.handleSubmit}
                    onFocus={this.onFocus}
                    onBlur={this.onBlur}
                    />
            </div>
        )
    }
};

export default Auth;