import React, { Component } from 'react';

class ProjectItem extends Component {
  render() {
    return (
      <li className="Project">
        <strong>  id : </strong>  {this.props.project.id}- <strong>title :</strong>{this.props.project.title} -
        <strong>category :</strong> {this.props.project.category} -<strong>descript.:</strong>
        {this.props.project.description}
      </li>
    );
  }
}

export default ProjectItem;
