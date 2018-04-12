import React, { Component } from 'react';
import { Redirect } from 'react-router';
import axios from 'axios';
import AddProjectForm from './AddProjectForm/AddProjectForm';
import AsyncReportBox from '../Form/AsyncReportBox';
import './NewProjectPage.css';

class NewProjectPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      savingState: 'idle',
      message: '',
      timeoutId: -1,
    };

    this.handleError = this.handleError.bind(this);
  }

  handleError(err) {
    let error = 'Error: The project was not saved. ';
    if (err.response) {
      error += `${err.response.status} ${err.response.data}`;
    } else if (err.request) {
      // no response was received
      error += 'No response from server';
    } else {
      // something else happened
      error += err.message;
    }

    // get rid of any asynchronous info message in the queue
    if (this.state.timeoutId >= 0){
      clearTimeout(this.state.timeoutId);
      this.setState({ timeoutId: -1 });
    }

    this.setState({ savingState: 'error', message: error });
  }

  handleAddProject(project) {
    this.setState({ savingState: 'onGoing', message: 'Saving...' }, () => {
      const id = setTimeout(() => {
        this.setState({ savingState: 'onGoing', message: 'Waiting for confirmation...'});
      }, 2000);
      this.setState({ timeoutId: id });    
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
      <div className="NewProjectPage container text-center">
        <h1>Add New Project</h1>
        <AddProjectForm disabled={this.state.savingState === 'onGoing'} addProject={this.handleAddProject.bind(this)} />
        <div className="mt-3">
          <AsyncReportBox state={this.state.savingState} message={this.state.message} />
        </div>
      </div>
    );
  }
}

export default NewProjectPage;
