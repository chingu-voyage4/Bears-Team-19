import React from 'react';
import { shallow } from 'enzyme';
import AsyncFormPage from '../Form/AsyncFormPage'
import AddProjectForm from './AddProjectForm/AddProjectForm';
import NewProjectPage from './NewProjectPage';

describe('NewProjectPage', () => {
  test('It exists', () => {
    const wrapper = shallow(<NewProjectPage />);
    expect(wrapper).toBeDefined();
  });

  test('It renders an AsyncFormPage with an AddProjectForm and the correct props', () => {
    const wrapper = shallow(<NewProjectPage />);
    expect(wrapper.type()).toEqual(AsyncFormPage);
    expect(wrapper.prop('actionName')).toBeDefined();
    expect(wrapper.prop('actionName')).toEqual('Saving');
    expect(wrapper.prop('asyncAction')).toBeDefined();
    expect(wrapper.prop('redirect')).toBeDefined();
    expect(wrapper.prop('redirect')).toEqual('/projects');

    expect(wrapper.children()).toHaveLength(1);
    expect(wrapper.childAt(0).type()).toEqual(AddProjectForm);
  });
});
