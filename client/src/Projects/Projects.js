import React, { Component } from 'react';
import ProjectList from './ProjectList/ProjectList';
import AddProject from './AddProject/AddProject';

class Projects extends Component {

  constructor(props){
    super(props);
    this.state = { projects: [] };
  }

  componentDidMount() {
    // requesting projects to backend
    fetch('/api/projects')
      .then(res => res.json())
      .then(projects => this.setState({ projects: projects }));
  }
  handleAddProject(project){
    let projects = this.state.projects;
    projects.push(project);
    this.setState({projects:projects});
    console.log(project);
  }

  render() {
    return (
      <div className="container text-center">
        <AddProject addProject={this.handleAddProject.bind(this)} />
        <h1>Browse All Projects</h1>
        <ProjectList projects={ this.state.projects } />
      </div>
    )
  }
}

export default Projects;
