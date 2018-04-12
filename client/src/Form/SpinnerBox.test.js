import React from 'react';
import { shallow } from 'enzyme';
import Spinner from './Spinner';
import SpinnerBox from './SpinnerBox';

describe('SpinnerBox', () => {
  test('It renders a div containing a message and a Spinner', () => {
    const testMsg = 'test message';
    const wrapper = shallow(
      <SpinnerBox message={testMsg} />
    );
    const boxWrapper = wrapper.find('div.SpinnerBox');
    expect(boxWrapper).toHaveLength(1);
    expect(boxWrapper.children()).toHaveLength(2);
    expect(boxWrapper.childAt(0).type()).toEqual('div');
    expect(boxWrapper.childAt(0).text()).toEqual(testMsg);
    expect(boxWrapper.childAt(1).type()).toEqual(Spinner);
  });

  test('It renders an empty div and a Spinner if there is no message', () => {
    const wrapper = shallow(
      <SpinnerBox />
    );
    const boxWrapper = wrapper.find('div.SpinnerBox');
    expect(boxWrapper).toHaveLength(1);
    expect(boxWrapper.children()).toHaveLength(2);
    expect(boxWrapper.childAt(0).type()).toEqual('div');
    expect(boxWrapper.childAt(0).text()).toEqual('');
    expect(boxWrapper.childAt(1).type()).toEqual(Spinner);
  });
});