import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
        </header>
        <h1 className="App-title">Projects</h1>
        <p className="App-intro">
          We connect developers over project ideas
        </p>
        <p>
          This is for developers who:
          <ul>
            <li>
              want to collaborate with other developers on open-source projects
            </li>
            <li>
              want to practice their skills on a real project but don't know what to build
            </li>
            <li>
              need help from other developers to build their project
            </li>
          </ul>
        </p>
        <a href="#">Browse Projects</a>
      </div>
    );
  }
}

export default App;
