import React, { Component } from 'react';
import axios from 'axios';
import AsyncFormPage from '../Form/AsyncFormPage'
import AddProjectForm from './AddProjectForm/AddProjectForm';

class NewProjectPage extends Component {
  constructor(props) {
    super(props);

    this.handleAddProject = this.handleAddProject.bind(this);
  }

  handleAddProject(project) {
    return axios.post('/api/projects', { project });
  }

  render(){
    return (
      <AsyncFormPage 
        title="Add a Project" 
        actionName="Saving" 
        redirect="/projects" 
        asyncAction={this.handleAddProject}
        {...this.props}
      >
        <AddProjectForm />
      </AsyncFormPage>
    );
  }
};

export default NewProjectPage;
