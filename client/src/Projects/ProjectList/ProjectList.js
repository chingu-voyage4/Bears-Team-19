import React from 'react';
import ProjectItem from './ProjectItem/ProjectItem';

const Projects = (props) => {
  let projectItems;
  if (props.projects && props.projects.length > 0){
    projectItems = props.projects.map(project => {
      return (
        <ProjectItem key={project.id} project={project}/>
      );
    });
  } else {
    return(
        <p className="mt-5">No projects found</p>
      );
  }

  return (
    <div className="ProjectList">
      {projectItems}
    </div>
  );
}

export default Projects;
