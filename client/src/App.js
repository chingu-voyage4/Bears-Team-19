import React, { Component } from 'react';
import Header from './Header';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <div className="container-fluid text-center py-3">
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

          <a className="btn btn-primary" href="#">Browse Projects</a>
        </div>
      </div>
    );
  }
}

export default App;
