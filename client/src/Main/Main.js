import React from 'react';
import { Switch, Route } from 'react-router-dom';
import PrivateRoute from '../Utils/Route/PrivateRoute';
import Welcome from '../Welcome/Welcome';
import Projects from '../Projects/Projects';
import NewProjectPage from '../NewProjectPage/NewProjectPage';
import Auth from '../Auth/Auth.js';
import LoginPage from '../LoginPage/LoginPage';
import Logout from '../Logout/Logout';
import './Main.css';

const Main = (props) => (
  <main className="Main d-flex">
    <Switch>
      <Route exact path='/' component={Welcome} />
      <Route exact path='/projects' component={Projects} />
      <PrivateRoute exact path='/projects/create' component={NewProjectPage} componentProps={props} />
      <Route exact path='/register' component={Auth} />
      <Route 
        exact path='/login' 
        render={(routeProps) => <LoginPage {...props} {...routeProps} />}
      />
      <Route exact path='/logout' render={ (routeProps) => {
        return (<Logout {...props} {...routeProps} />);
      }}/>
    </Switch>
  </main>
)

export default Main;
