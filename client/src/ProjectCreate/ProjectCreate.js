import React, { Component } from 'react';
import AddProject1 from './AddProject1';



class ProjectCreate extends Component {
  constructor(props){
    super(props);
    this.state = { projects: [] };
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

        <AddProject1 addProject={this.handleAddProject.bind(this)} />

      </div>
    )
  }
}

export default ProjectCreate;
