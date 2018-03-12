import React, { Component } from 'react';
import ProjectItem from './ProjectItem/ProjectItem';
import './ProjectList.css';

class Projects extends Component {

  render() {
    let projectItems;
    if (this.props.projects && this.props.projects.length > 0){
      projectItems = this.props.projects.map(project => {
        return (
          <ProjectItem key={project.title} project={project}/>
        );
      });
    } else {
      return(
          <p className="mt-5">No projects found</p>
        );
    }

    return (
      <div className="ProjectList d-flex flex-column flex-lg-row flex-lg-wrap justify-content-start align-items-stretch">
        {projectItems}
      </div>
    );
  }
}

export default Projects;
