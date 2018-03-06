import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Welcome from '../Welcome/Welcome';
import Projects from '../Projects/Projects';
import './Main.css';

const Main = () => (
  <main className="Main d-flex">
    <Switch>
      <Route exact path='/' component={Welcome} />
      <Route exact path='/projects' component={Projects} />
    </Switch>
  </main>
)

export default Main;