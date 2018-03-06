import React, { Component } from 'react';
import Header from '../Header/Header.js';
import Welcome from '../Welcome/Welcome.js';
import Footer from '../Footer/Footer.js';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App text-center d-flex flex-column">
        <Header />

        <div className="AppPage d-flex">
          <Welcome />
        </div>
        
        <Footer />
      </div>
    );
  }
}

export default App;
