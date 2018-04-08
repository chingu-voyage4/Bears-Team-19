import React, { Component } from 'react';
import { Redirect } from 'react-router';
import axios from 'axios';
import AddProjectForm from './AddProjectForm/AddProjectForm';
import AsyncReportBox from '../Form/AsyncReportBox';

class NewProjectPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      savingState: 'idle',
      message: '',
    };

    this.handleError = this.handleError.bind(this);
  }

  handleError(err) {
    let error = 'Error: The project was not saved. ';
    if (err.response) {
      error += `${err.response.status} ${err.response.body}`;
    } else if (err.request) {
      // no response was received
      error += 'No response from server';
    } else {
      // something else happened
      error += err.message;
    }

    this.setState({ savingState: 'error', message: error });
  }

  handleAddProject(project) {
    this.setState({ savingState: 'onGoing', message: 'Saving...' }, () => {
      setTimeout(() => {
        this.setState({ message: 'Waiting for confirmation...'});
      }, 2000);      
    });

    // post
    axios.post('/api/projects', project)
      // if successful, update the state to redirect
      .then(() => this.setState({ savingState: 'done' }))
      // if failed, change state to display error message
      .catch(this.handleError);
  }

  render() {
    if (this.state.savingState === 'done'){
      return (
        <Redirect push to="/projects"/>
      );
    }
    return (
      <div className="container text-center">
        <h1>Add New Project</h1>
        <AddProjectForm disabled={this.state.savingState === 'onGoing'} addProject={this.handleAddProject.bind(this)} />
        <AsyncReportBox state={this.state.savingState} message={this.state.message} />
      </div>
    );
  }
}

export default NewProjectPage;
