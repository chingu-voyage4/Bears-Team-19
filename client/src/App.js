import React, { Component } from 'react';
import Header from './Header';
import Welcome from './Welcome';

class App extends Component {
  render() {
    return (
      <div className="text-center">
        <Header />
        <Welcome />
      </div>
    );
  }
}

export default App;
