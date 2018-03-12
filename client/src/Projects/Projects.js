import React, { Component } from 'react';
import ProjectList from './ProjectList/ProjectList';
import './Projects.css';

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

  render() {
    return (
      <div className="Projects container text-center">
        <h1>Browse All Projects</h1>
        <ProjectList projects={ this.state.projects } />
      </div>
    )
  }
}

export default Projects;