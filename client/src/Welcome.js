import React, { Component } from 'react';

class Welcome extends Component {
  render() {
    return (
      <div className="container-fluid text-center py-3 d-flex flex-column my-auto">
        <h1>Projects</h1>
        
        <p className="lead">
          Find your next collaborative project
        </p>
        
        <ul className="list-unstyled my-4">
          <li className="m-3">
            Can't think what to build next? Browse our projects
          </li>
          <li className="m-3">
            Join a project to collaborate with other developers
          </li>
          <li className="m-3">
            Find collaborators for your projects
          </li>
        </ul>

        <div>
          <a className="btn btn-primary" href="#">Browse Projects</a>
        </div>
      </div>
    );
  }
}

export default Welcome;
