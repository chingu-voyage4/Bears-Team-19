import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Welcome from '../Welcome/Welcome';
import Projects from '../Projects/Projects';
import Auth from '../Auth/Auth.js';
import Contact from '../Contact/Contact.js';
import './Main.css';

const Main = () => (
  <main className="Main d-flex">
    <Switch>
      <Route exact path='/' component={Welcome} />
      <Route exact path='/projects' component={Projects} />
      <Route exact path='/register' component={Auth} />
      <Route path="/contact/:id" component={Contact} />
    </Switch>
  </main>
)

export default Main;