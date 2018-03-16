import React, { Component } from 'react';
import AddProject from './AddProject';



class ProjectCreate extends Component {
  constructor(props){
    super(props);
    this.state = { projects: [] };
  }



  handleAddProject(project){
    let projects = this.state.projects;
    projects.push(project);
    this.setState({projects:projects});
    console.log(project); //see the object added, in console
  }

  render() {
    return (
      <div className="container text-center">

        <AddProject addProject={this.handleAddProject.bind(this)} />

      </div>
    )
  }
}

export default ProjectCreate;
