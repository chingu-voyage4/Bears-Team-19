import React, { Component } from 'react';
import ContactForm from './ContactForm/ContactForm.js';
import axios from 'axios';

class Contact extends Component {

    constructor(props) {
        super(props);


        this.state = {
            subject: '',
            body: ''
        }
    }

    clearState = () => {
        return this.setState({
            subject: '',
            body: ''
        });
    }   

    componentWillMount = (props) => {
        axios.get(`/api/projects/${this.props.match.projectId}`)
            .then(res => {
                return this.setState({
                    project: res.data
                })
            })
    }

    handleChange = (input, event) => {
        this.setState({
            [input]: event.target.value
        })
    }

    handleSubmit = () => {
        axios.post(`/api/contact/${this.state.projectId}`)
            .then(res => {
                console.log(res);
                return this.clearState();
            })
    }


    render () {
        return (
             <ContactForm 
                projectTitle={this.state.projecTitle}
                subject={this.state.subject} 
                body={this.state.body}
                handleChange={this.handleChange}
                handleSubmit={this.handleSubmit}
                disabled={this.state.body.length === 0 || this.state.subject.length === 0}
             />
        )
    }
}

export default Contact;