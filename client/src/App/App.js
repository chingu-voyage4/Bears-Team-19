import React, { Component } from 'react';
import Header from '../Header/Header.js';
import Main from '../Main/Main.js';
import Footer from '../Footer/Footer.js';
import './App.css';


class App extends Component {
  constructor(props){
    super(props);

    this.state = {
      auth: {
        user: null,
        login: user => this.setState({ auth: {...this.state.auth, user} }),
        logout: () => this.setState({ auth: {...this.state.auth, user: null } }),
      },
    };
  }

  render() {
    return (
      <div className="App text-center d-flex flex-column">
        <Header auth={this.state.auth} />
        <Main auth={this.state.auth} />
        <Footer auth={this.state.auth} />
      </div>
    );
  }
}

export default App;
