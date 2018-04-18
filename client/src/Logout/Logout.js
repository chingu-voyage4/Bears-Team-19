import React, { Component } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import SpinnerBox from '../Form/SpinnerBox.js';

class Logout extends Component {

    constructor(props) {
        super(props);

        this.state = {
            message: 'Redirecting in 2 seconds.'
        }
    }

    componentWillMount () {
        console.log(this.props.auth.user);
        this.logoutUser();
    }

    logoutUser = () => {
        axios.post('/api/auth/logout')
            .then(() => {
                setTimeout(() => this.props.auth.logout(), 2000);         
            }  
        );
    }

    render () {
        if (!this.props.auth.user) {
            return (<Redirect to="/" />);
        }
        
        return (
            <div>
               <SpinnerBox message={this.state.message} />}
            </div>
        )
    }
}

export default Logout;