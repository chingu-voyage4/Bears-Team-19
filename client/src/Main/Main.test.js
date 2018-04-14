import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { shallow } from 'enzyme';
import Main from './Main';

const routes = [
  '/',
  '/projects',
  '/projects/create',
  '/register',
  '/login',
];

describe('Main', () => {
  test('It exists', () => {
    const wrapper = shallow(<Main />);
    expect(wrapper).toBeDefined();
  });

  test('It handles all the routes for the app', () => {
    const wrapper = shallow(<Main />);
    expect(wrapper.find(Switch)).toHaveLength(1);
    const routesWrapper = wrapper.find(Route);
    expect(routesWrapper).toHaveLength(routes.length);
    routes.forEach((el, index) => {
      expect(routesWrapper.find({ path: el })).toHaveLength(1);
    });
  });

  test('It handles Create Project as a private route that redirects to Browse Projects');
  test('It handles the Sign out route as a private route that redirects to Browse Projects');
});