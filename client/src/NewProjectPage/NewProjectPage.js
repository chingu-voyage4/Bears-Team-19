import React, { Component } from 'react';
import AddProjectForm from './AddProjectForm/AddProjectForm';

class NewProjectPage extends Component {
  constructor(props) {
    super(props);
    this.state = { projects: [] };
  }

  handleAddProject(project) {
    // TO DO redirect to Browse Projects page
    /*
    let projects = this.state.projects;
    projects.push(project);
    this.setState({ projects: projects });
    console.log(project); //see the object added, in console
    */
  }

  render() {
    return (
      <div className="container text-center">
        <AddProjectForm addProject={this.handleAddProject.bind(this)} />
      </div>
    );
  }
}

export default NewProjectPage;
