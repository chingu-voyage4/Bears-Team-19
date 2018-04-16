import React from 'react';
import { Switch, Route, Redirect, MemoryRouter } from 'react-router-dom';
import { shallow, mount } from 'enzyme';
import PrivateRoute from './PrivateRoute';

describe('PrivateRoute', () => {
  test('It exists', () => {
    const wrapper = shallow(<PrivateRoute />);
    expect(wrapper.find(PrivateRoute)).toBeDefined();
  });

  test('It renders the component passed in if the user is authenticated', () => {
    const Protected = () => <h3>Protected</h3>;
    const componentProps = {
      auth: {
        user: {
          username: 'name',
        },
      },
    };
    const wrapper = mount(
      <MemoryRouter
        initialEntries={['/protected']}
        initialIndex={0}
      >
        <PrivateRoute path='/protected' component={Protected} componentProps={componentProps} />
      </MemoryRouter>
    );
    expect(wrapper.find(Route)).toHaveLength(1);
    expect(wrapper.find(Route).first().prop('path')).toEqual('/protected');
    expect(wrapper.find(Protected)).toBeDefined();
  });
  test('It redirects to Login if the user is not authenticated'); // don't know how to test
});
