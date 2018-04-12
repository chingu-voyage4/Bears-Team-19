import React from 'react';
import { shallow } from 'enzyme';
import Main from './Main';

describe('Main', () => {
  test('It exists', () => {
    const wrapper = shallow(<Main />);
    expect(wrapper).toBeDefined();
  });
});