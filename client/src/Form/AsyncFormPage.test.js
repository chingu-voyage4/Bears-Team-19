import React from 'react';
import { shallow } from 'enzyme';
import AsyncReportBox from '../Form/AsyncReportBox';
import AsyncFormPage from './AsyncFormPage';

const testData = {
  asyncAction: () => {},
  actionName: 'Testing',
  redirect: '/',
  title: 'Test',
};

describe('AsyncFormPage', () => {
  test('It exists', () => {
    const wrapper = shallow(
      <AsyncFormPage {...testData}>
        <form></form>
      </AsyncFormPage>
    );
    expect(wrapper).toBeDefined();
  });

  test('It renders a title, a form and an AsyncReportBox', () => {
    const wrapper = shallow(
      <AsyncFormPage {...testData}>
        <form></form>
      </AsyncFormPage>
    );
    expect(wrapper.hasClass('AsyncFormPage')).toEqual(true);
    expect(wrapper.children()).toHaveLength(2);
    expect(wrapper.childAt(0).type()).toEqual('h1');
    expect(wrapper.childAt(1).type()).toEqual('form');
  });

  test('It gives the disabled and onSubmit props to the form', () => {
    const wrapper = shallow(
      <AsyncFormPage {...testData}>
        <form></form>
      </AsyncFormPage>
    );
    expect(wrapper.childAt(1).props('disabled')).toBeDefined;
    expect(wrapper.childAt(1).props('onSubmit')).toBeDefined;
  });

  test('It creates an AsyncReportBox dynamically when there is something to report to the user');
  test('It provides the form with a submit callback');
  test('the submit callback disables any input in the form');
  test('The submit callback keeps the user informed with the AsyncReportBox');
  test('The saving message changes after 2 seconds to show that we are waiting for confirmation from the server');
  test('If an error happens before the 2 seconds are up, the delayed saving message is cancelled');
  test('If success happens before the 2 seconds are up, the delayed saving message is cancelled');
  test('When saving successfully the page redirects to the Browse Project page');
  test('When saving fails the AsyncReportBox is updated with an error message and form input is re-enabled');
});
