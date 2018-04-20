import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import SpinnerBox from '../Form/SpinnerBox.js';

class Logout extends Component {

    constructor(props) {
        super(props);

        this.state = {
            message: 'Redirecting in 2 seconds.'
        }
    }

    componentWillMount () {
        this.logoutUser();
    }

    logoutUser = () => {
        axios.post('/api/auth/logout')
            .then(res => {
                setTimeout(() => this.props.auth.logout(), 2000);
            })
    }

    render () {
        if (!this.props.auth.user) return (<Redirect to="/" />);

        return (
            <div className="container-fluid">
                <div className="d-flex justify-content-center align-items-center my-auto h-75">
                    <SpinnerBox message={this.state.message} />
                </div>
            </div>
        )
    }
}

export default Logout;