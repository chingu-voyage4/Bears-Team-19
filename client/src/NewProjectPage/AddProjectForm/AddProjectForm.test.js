import React from 'react';
import { shallow } from 'enzyme';
import LabelledInput from '../../Form/LabelledInput';
import LabelledTextarea from '../../Form/LabelledTextarea';
import LabelledTagInput from '../../Form/LabelledTagInput';
import AddProjectForm from './AddProjectForm';

const testProps = {
  disabled: false,
  onSubmit: () => {},
};

const TITLE = 0;
const DESCRIPTION = 1;
const KEYWORDS = 2;
const SUBMIT = 3;
const CHILDREN = 4;

describe('AddProjectForm', () => {
  test('It exists', () => {
    const wrapper = shallow(<AddProjectForm {...testProps} />);
    expect(wrapper).toBeDefined();
  });

  test('It renders a form', () => {
    const wrapper = shallow(
      <AddProjectForm {...testProps} />
    );
    expect(wrapper.type()).toEqual('form');
  });

  test('It renders inputs for the title, description and tags and a submit button', () => {
    const wrapper = shallow(
      <AddProjectForm {...testProps} />
    );
    expect(wrapper.children()).toHaveLength(CHILDREN);
    expect(wrapper.childAt(TITLE).type()).toEqual(LabelledInput);
    expect(wrapper.childAt(TITLE).props().label).toEqual('Title');
    expect(wrapper.childAt(DESCRIPTION).type()).toEqual(LabelledTextarea);
    expect(wrapper.childAt(DESCRIPTION).props().label).toEqual('Description');
    expect(wrapper.childAt(DESCRIPTION).props().rows).toEqual(10);
    expect(wrapper.childAt(KEYWORDS).type()).toEqual(LabelledTagInput);
    expect(wrapper.childAt(KEYWORDS).props().label).toEqual('Keywords');
    expect(wrapper.childAt(SUBMIT).type()).toEqual('div');
    expect(wrapper.childAt(SUBMIT).children()).toHaveLength(1);
    expect(wrapper.childAt(SUBMIT).childAt(0).type()).toEqual('button');
    expect(wrapper.childAt(SUBMIT).childAt(0).text()).toEqual('Submit');
  });

  test('It disables the submit button when the title is empty', () => {
    const wrapper = shallow(
      <AddProjectForm {...testProps} />
    );
    const titleWrapper = wrapper.childAt(TITLE);

    expect(wrapper.state('title')).toEqual('');
    expect(wrapper.state('canSubmit')).toEqual(false);

    titleWrapper.simulate('change', { target: { value: 'a' } });
    expect(wrapper.state('title')).toEqual('a');
    expect(wrapper.state('canSubmit')).toEqual(true);

    titleWrapper.simulate('change', { target: { value: '' } });
    expect(wrapper.state('title')).toEqual('');
    expect(wrapper.state('canSubmit')).toEqual(false);
  });

  test('Clicking the submit button calls props.onSubmit with an object argument containing the title, description and tags');
  test('All the input components are disabled when props.disabled is true');
});
