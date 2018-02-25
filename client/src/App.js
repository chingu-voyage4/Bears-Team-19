import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  // demo
  state = {authors: []}

  componentDidMount() {
    fetch('/api/authors')
      .then(res => res.json())
      .then(authors => this.setState({ authors }));
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <br></br>
        <h2>Bears-Team-19</h2>
        <p>The team, straight from the API:</p>
        <ul className="Team-list">
        {this.state.authors.map(author =>
          <li key={author.id}>{author.name}</li>
        )}
        </ul>
      </div>
    );
  }
}

export default App;
