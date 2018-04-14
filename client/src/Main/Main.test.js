import React from 'react';
import { Switch, Route, Redirect, MemoryRouter } from 'react-router-dom';
import { shallow, mount } from 'enzyme';
import Main from './Main';

const publicRoutes = [
  '/',
  '/projects',
  '/register',
  '/login',
];

describe('Main', () => {
  test('It exists', () => {
    const wrapper = shallow(<Main />);
    expect(wrapper).toBeDefined();
  });

  test('It handles all the public routes for the app', () => {
    const wrapper = shallow(<Main />);
    expect(wrapper.find(Switch)).toHaveLength(1);
    const routesWrapper = wrapper.find(Route);
    expect(routesWrapper).toHaveLength(publicRoutes.length);
    publicRoutes.forEach((el, index) => {
      expect(routesWrapper.find({ path: el })).toHaveLength(1);
    });
  });

  describe('Private routes', () => {
    describe('Create Project', () => {
      test('It redirects to Login when the user is not logged in', () => {
        const auth = {
          user: null,
          login: () => {},
          logout: () => {},
        };
        const wrapper = mount(
          <MemoryRouter
            initialEntries={['/projects/create']}
            initialIndex={0}
          >
            <Main auth={auth} />
          </MemoryRouter>
        );
        expect(wrapper.find(Route)).toHaveLength(1);
        expect(wrapper.find(Route).first().prop('path')).toEqual('/login');
      });

      test('It routes to Create Project when the user is logged in', () => {
        const auth = {
          user: {
            username: 'tom',
            email: 'tom@example.com',
          },
          login: () => {},
          logout: () => {},
        };
        const wrapper = mount(
          <MemoryRouter
            initialEntries={['/projects/create']}
            initialIndex={0}
          >
            <Main auth={auth}/>
          </MemoryRouter>
        );
        expect(wrapper.find(Route)).toHaveLength(1);
        expect(wrapper.find(Route).first().prop('path')).toEqual('/projects/create');
      });
    });
    
    test('It handles the Sign out route as a private route that redirects to Browse Projects');

  });
});