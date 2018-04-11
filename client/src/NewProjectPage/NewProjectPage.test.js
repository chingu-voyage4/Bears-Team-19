import React from 'react';
import { shallow } from 'enzyme';
import AsyncReportBox from '../Form/AsyncReportBox';
import AddProjectForm from './AddProjectForm/AddProjectForm';
import NewProjectPage from './NewProjectPage';

describe('NewProjectPage', () => {
  test('It renders a title, an AddProjectForm and an AsyncReportBox', () => {
    const wrapper = shallow(
      <NewProjectPage />
    );
    expect(wrapper.hasClass('NewProjectPage')).toEqual(true);
    expect(wrapper.children()).toHaveLength(3);
    expect(wrapper.childAt(0).type()).toEqual('h1');
    expect(wrapper.childAt(1).type()).toEqual(AddProjectForm);
    expect(wrapper.childAt(2).containsMatchingElement(<AsyncReportBox />)).toEqual(true);
  });

  test('It provides the form with a submit callback');
  test('the submit callback disables any input in the form');
  test('The submit callback keeps the user informed with the AsyncReportBox');
  test('The saving message changes after 2 seconds to show that we are waiting for confirmation from the server');
  test('If an error happens before the 2 seconds are up, the delayed saving message is cancelled');
  test('When saving successfully the page redirects to the Browse Project page');
  test('When saving fails the AsyncReportBox is updated with an error message and form input is re-enabled');
});