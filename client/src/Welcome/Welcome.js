import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Welcome.css';

class Welcome extends Component {
  render() {
    return (
      <div className="container-fluid text-center py-3 d-flex flex-column justify-content-around">
        <p className="lead my-5">
          Find your next collaborative project
        </p>

        <div className="row">
          <div className="col-12 col-md-4 mb-5">
            <div className="Welcome-icon"><i className="far fa-list-alt fa-5x"></i></div>
            <div className="h3 text-uppercase my-3">Browse</div>
            <div>Can't think what to build next? Browse our projects</div>
          </div>
          <div className="col-12 col-md-4 mb-5">
            <div className="Welcome-icon"><i className="fas fa-code-branch fa-5x"></i></div>
            <div className="h3 text-uppercase my-3">Build</div>
            <div>Join a project to collaborate with other developers</div>
          </div>
          <div className="col-12 col-md-4 mb-5">
            <div className="Welcome-icon"><i className="fas fa-bullhorn fa-5x"></i></div>
            <div className="h3 text-uppercase my-3">Share</div>
            <div>Find collaborators for your projects</div>
          </div>
        </div>

        <div className="mb-5">
          <Link to="/projects" className="btn btn-primary">Browse Our Projects</Link>
        </div>
      </div>
    );
  }
}

export default Welcome;
