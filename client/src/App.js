import React, { Component } from 'react';
import Header from './Header';
import Welcome from './Welcome';
import Footer from './Footer';

class App extends Component {
  render() {
    return (
      <div className="text-center">
        <Header />
        <Welcome />
        <Footer />
      </div>
    );
  }
}

export default App;
