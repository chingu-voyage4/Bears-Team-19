import React, { Component } from 'react';
import ContactForm from './ContactForm/ContactForm.js';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import NotificationSystem from 'react-notification-system';

class Contact extends Component {

    constructor(props) {
        super(props);

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

    handleError = (err) => {
        this.refs.notificationSystem.addNotification({
            message: err.message,
            level: 'error',
            position: 'tc'
        });
    }

    handleSuccess = (res) => {
        this.refs.notificationSystem.addNotification({
            message: `${res.message}, redirecting in 3 seconds.`,
            level: 'success',
            position: 'tc'
        })

        // force redirect
        setTimeout(() => this.setState({redirect: true}), 3000);
    }

    clearState = () => {
        return this.setState({
            subject: '',
            body: ''
        });
    }

    componentWillMount = () => {
        this.fetchProject();
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
        const {subject, body} = this.state;
        axios.post(`/api/contact/${this.state.project._id}`, {subject, body})
            .then(res => {
                this.handleSuccess(res.data);
            })
            .catch(err => {
                this.handleError(err);
            })
    }


    render () {
        console.log(this.state.project.published, 'this is project')
        if (this.state.redirect) return (<Redirect to="/" />);
        return (
            <div className="container-fluid">
                <ContactForm 
                    authorName={this.state.project.authorName}
                    projectTitle={this.state.project.published.title}
                    subject={this.state.subject} 
                    body={this.state.body}
                    handleChange={this.handleChange}
                    handleSubmit={this.handleSubmit}
                    disabled={this.state.body.length === 0 || this.state.subject.length === 0}
                />
                 <NotificationSystem ref="notificationSystem" />
            </div>
        )
    }
}

export default Contact;