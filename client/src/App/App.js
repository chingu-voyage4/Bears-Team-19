import React, { Component } from 'react';
import Header from '../Header/Header.js';
import Main from '../Main/Main.js';
import Footer from '../Footer/Footer.js';
import './App.css';


class App extends Component {
  render() {
    return (
      <div className="App text-center d-flex flex-column">
        <Header />
        <Main />
        <Footer />
      </div>
    );
  }
}

export default App;
