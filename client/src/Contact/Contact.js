import React, { Component } from 'react';
import ContactForm from './ContactForm/ContactForm.js';
import axios from 'axios';
import { Redirect } from 'react-router-dom';

class Contact extends Component {

    constructor(props) {
        super(props);

        this.fetchProject();

        this.state = {
            subject: '',
            body: '',
            redirect: false,
            project: {
                published: {
                    title: ''
                }
            }
        }
    }

    clearState = () => {
        return this.setState({
            subject: '',
            body: ''
        });
    }

    fetchProject = () => {
        axios.get(`/api/projects/${this.props.match.params.id}`)
            .then(res => {
                return this.setState({
                    project: res.data
                })
            }).catch(err => {
                return this.setState({
                    redirect: true,
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
        if (this.state.redirect) <Redirect to="/" />
        console.log(this.state.project, 'this is project from state');
        return (
             <ContactForm 
                projectTitle={this.state.project.published.title}
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