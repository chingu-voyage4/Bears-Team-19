import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Welcome from '../Welcome/Welcome';
import Projects from '../Projects/Projects';
import ProjectCreate from '../ProjectCreate/ProjectCreate';
import './Main.css';

const Main = () => (
  <main className="Main d-flex">
    <Switch>
      <Route exact path='/' component={Welcome} />
      <Route exact path='/projects' component={Projects} />
      <Route exact path='/projectCreate' component={ProjectCreate} />

    </Switch>
  </main>
)

export default Main;
