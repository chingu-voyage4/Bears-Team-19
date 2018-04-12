import React from 'react';
import { shallow } from 'enzyme';
import SpinnerBox from './SpinnerBox';
import ErrorBox from './ErrorBox';
import AsyncReportBox from './AsyncReportBox';

describe('AsyncReportBox', () => {
  test('It renders a div of class AsyncReportBox', () => {
    const wrapper = shallow(
      <AsyncReportBox />
    );
    const boxWrapper = wrapper.find('div.AsyncReportBox');
    expect(boxWrapper).toHaveLength(1);
    expect(boxWrapper.children()).toHaveLength(0);
  });

  test('It renders a SpinnerBox containing the message when the state is "onGoing"', () => {
    const state = 'onGoing';
    const message = 'Please wait';
    const wrapper = shallow(
      <AsyncReportBox state={state} message={message} />
    );
    const boxWrapper = wrapper.find('div.AsyncReportBox');
    expect(boxWrapper).toHaveLength(1);
    expect(boxWrapper.children()).toHaveLength(1);
    expect(boxWrapper.childAt(0).type()).toEqual(SpinnerBox);
    expect(boxWrapper.childAt(0).props().message).toEqual(message);
  });

  test('It renders a SpinnerBox when the state is "onGoing" even if there is no message', () => {
    const state = 'onGoing';
    const wrapper = shallow(
      <AsyncReportBox state={state} />
    );
    const boxWrapper = wrapper.find('div.AsyncReportBox');
    expect(boxWrapper).toHaveLength(1);
    expect(boxWrapper.children()).toHaveLength(1);
    expect(boxWrapper.childAt(0).type()).toEqual(SpinnerBox);
    expect(boxWrapper.childAt(0).props().message).toBeUndefined();
  });

  test('It renders an ErrorBox containing the message when the state is "error"', () => {
    const state = 'error';
    const message = 'Ooops! An error occurred';
    const wrapper = shallow(
      <AsyncReportBox state={state} message={message} />
    );
    const boxWrapper = wrapper.find('div.AsyncReportBox');
    expect(boxWrapper).toHaveLength(1);
    expect(boxWrapper.children()).toHaveLength(1);
    expect(boxWrapper.childAt(0).type()).toEqual(ErrorBox);
    expect(boxWrapper.childAt(0).props().errorMsg).toEqual(message);
  });

  test('It renders an empty ErrorBox when the state is "error" and there is no error message', () => {
    const state = 'error';
    const wrapper = shallow(
      <AsyncReportBox state={state} />
    );
    const boxWrapper = wrapper.find('div.AsyncReportBox');
    expect(boxWrapper).toHaveLength(1);
    expect(boxWrapper.children()).toHaveLength(1);
    expect(boxWrapper.childAt(0).type()).toEqual(ErrorBox);
    expect(boxWrapper.childAt(0).props().errorMsg).toBeUndefined();
  });

  test('It doesn\'t render any children when the state is neither "onGoing"  nor "error"', () => {
    const state = 'idle';
    const message = 'Random message';
    const wrapper = shallow(
      <AsyncReportBox state={state} message={message} />
    );
    const boxWrapper = wrapper.find('div.AsyncReportBox');
    expect(boxWrapper).toHaveLength(1);
    expect(boxWrapper.children()).toHaveLength(0);
  });

  test('It doesn\'t render any children when no state is provided as props', () => {
    const message = 'Random message';
    const wrapper = shallow(
      <AsyncReportBox message={message} />
    );
    const boxWrapper = wrapper.find('div.AsyncReportBox');
    expect(boxWrapper).toHaveLength(1);
    expect(boxWrapper.children()).toHaveLength(0);
  });
});