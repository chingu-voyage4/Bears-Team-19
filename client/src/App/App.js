import React, { Component } from 'react';
import Header from '../Header/Header.js';
import Main from '../Main/Main.js';
import Footer from '../Footer/Footer.js';
import './App.css';


class App extends Component {
  constructor(props){
    super(props);

    this.state = {
      user: null,
      login: user => this.setState({ user }),
      logout: () => this.setState({ user: null }),
    };
  }

  render() {
    return (
      <div className="App text-center d-flex flex-column">
        <Header user={this.state.user} />
        <Main user={this.state.user} />
        <Footer user={this.state.user} />
      </div>
    );
  }
}

export default App;
