import React from 'react';
import { Switch, Route } from 'react-router-dom';
import PrivateRoute from '../Utils/Route/PrivateRoute';
import Welcome from '../Welcome/Welcome';
import Projects from '../Projects/Projects';
import NewProjectPage from '../NewProjectPage/NewProjectPage';
import Auth from '../Auth/Auth.js';
import LoginPage from '../LoginPage/LoginPage';

import Logout from '../Logout/Logout';

import Contact from '../Contact/Contact.js';

import './Main.css';

const Main = (props) => (
  <main className="Main d-flex">
    <Switch>
      <Route exact path='/' component={Welcome} />
      <Route exact path='/projects' component={Projects} />
      <PrivateRoute exact path='/projects/create' component={NewProjectPage} componentProps={props} />
      <PrivateRoute exact path='/logout' component={Logout} componentProps={props} />
      {/* Contact should only be available when logged in */}
      <PrivateRoute path='/contact/:id' component={Contact} componentProps={props} />
      <Route 
        exact path='/register' 
        render={(routeProps) => <Auth {...props} {...routeProps} />}
      />
      <Route 
        exact path='/login' 
        render={(routeProps) => <LoginPage {...props} {...routeProps} />}
      />
    </Switch>
  </main>
)

export default Main;
