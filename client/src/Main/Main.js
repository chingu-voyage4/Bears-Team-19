import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Welcome from '../Welcome/Welcome';
import Projects from '../Projects/Projects';
import NewProjectPage from '../NewProjectPage/NewProjectPage';
import Auth from '../Auth/Auth.js';
import './Main.css';

const Main = () => (
  <main className="Main d-flex">
    <Switch>
      <Route exact path='/' component={Welcome} />
      <Route exact path='/projects' component={Projects} />
      <Route exact path='/projects/create' component={NewProjectPage} />
      <Route exact path='/register' component={Auth} />
    </Switch>
  </main>
)

export default Main;
