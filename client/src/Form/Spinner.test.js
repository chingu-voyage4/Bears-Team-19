import React from 'react';
import { shallow } from 'enzyme';
import Spinner from './Spinner';

describe('Spinner', () => {
  test('It renders a single div of class Spinner (who does the animation)', () => {
    const wrapper = shallow(<Spinner />);
    expect(wrapper.find('div')).toHaveLength(1);
    expect(wrapper.find('div.Spinner')).toHaveLength(1);
  });
});