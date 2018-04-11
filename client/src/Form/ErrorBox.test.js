import React from 'react';
import { render } from 'enzyme';
import ErrorBox from './ErrorBox';

describe('ErrorBox', () => {
  test('It renders a div containing an error message', () => {
    const testMsg = 'test message';
    const wrapper = render(
      <ErrorBox errorMsg={testMsg} />
    );
    expect(wrapper).toHaveLength(1);
    expect(wrapper.text()).toEqual(testMsg);
    expect(wrapper.children()).toHaveLength(0);
  });

  test('It renders null if the error message is empty', () => {
    const testMsg = '';
    const wrapper = render(
      <ErrorBox errorMsg={testMsg} />
    );
    expect(wrapper).toHaveLength(0);
  });

  test('It renders null if there is no error message', () => {
    const wrapper = render(
      <ErrorBox />
    );
    expect(wrapper).toHaveLength(0);
  });
});