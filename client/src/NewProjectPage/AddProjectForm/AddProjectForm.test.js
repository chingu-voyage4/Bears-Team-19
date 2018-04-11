import React from 'react';
import { shallow } from 'enzyme';
import LabelledInput from '../../Form/LabelledInput';
import LabelledTextarea from '../../Form/LabelledTextarea';
import LabelledTagInput from '../../Form/LabelledTagInput';
import AddProjectForm from './AddProjectForm';

describe('AddProjectForm', () => {
  test('It renders a form', () => {
    const wrapper = shallow(
      <AddProjectForm />
    );
    expect(wrapper.children()).toHaveLength(1);
    expect(wrapper.childAt(0).type()).toEqual('form');
  });

  test('It renders inputs for the title, description and tags and a submit button', () => {
    const wrapper = shallow(
      <AddProjectForm />
    );
    const formWrapper = wrapper.childAt(0);
    expect(formWrapper.children()).toHaveLength(4);
    expect(formWrapper.childAt(0).type()).toEqual(LabelledInput);
    expect(formWrapper.childAt(0).props().label).toEqual('Title');
    expect(formWrapper.childAt(1).type()).toEqual(LabelledTextarea);
    expect(formWrapper.childAt(1).props().label).toEqual('Description');
    expect(formWrapper.childAt(2).type()).toEqual(LabelledTagInput);
    expect(formWrapper.childAt(2).props().label).toEqual('Keywords');
    expect(formWrapper.childAt(3).type()).toEqual('div');
    expect(formWrapper.childAt(3).children()).toHaveLength(1);
    expect(formWrapper.childAt(3).childAt(0).type()).toEqual('button');
    expect(formWrapper.childAt(3).childAt(0).text()).toEqual('Submit');
  });

  test('It disables the submit button when the title is empty', () => {
    const wrapper = shallow(
      <AddProjectForm />
    );
    const formWrapper = wrapper.childAt(0);
    const titleWrapper = formWrapper.childAt(0);

    expect(wrapper.state('title')).toEqual('');
    expect(wrapper.state('canSubmit')).toEqual(false);

    titleWrapper.simulate('change', { target: { value: 'a' } });
    expect(wrapper.state('title')).toEqual('a');
    expect(wrapper.state('canSubmit')).toEqual(true);

    titleWrapper.simulate('change', { target: { value: '' } });
    expect(wrapper.state('title')).toEqual('');
    expect(wrapper.state('canSubmit')).toEqual(false);
  });

  test('Clicking the submit button calls props.addProject with an object argument containing the title, description and tags');
  test('All the input components are disabled when props.disabled is true');
});