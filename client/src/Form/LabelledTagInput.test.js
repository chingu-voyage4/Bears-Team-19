import React from 'react';
import { shallow, render } from 'enzyme';
import TagsInput from 'react-tagsinput';
import LabelledTagInput from './LabelledTagInput';

describe('LabelledTagInput', () => {
  test('It renders a div containing a label and a tag input', () => {
    const wrapper = shallow(
      <LabelledTagInput />
    );
    expect(wrapper.hasClass('LabelledTagInput')).toBe(true);
    expect(wrapper.children()).toHaveLength(1);
    expect(wrapper.childAt(0).type()).toEqual('label');
    expect(wrapper.childAt(0).children()).toHaveLength(3);
    expect(wrapper.childAt(0).childAt(0).type()).toEqual('div');
    expect(wrapper.childAt(0).childAt(1).type()).toEqual(TagsInput);
    expect(wrapper.childAt(0).childAt(2).type()).toEqual('small');
  });

  test('It displays text in the label', () => {
    const label = 'Test Label';
    const wrapper = shallow(
      <LabelledTagInput
        label={label}
      />
    );
    expect(wrapper.childAt(0).childAt(0).text()).toEqual(label);
  });

  test('It sets the input value', () => {
    const testData = {
      value: 'abcde',
      onChange: (e) => e,
    };
    const wrapper = shallow(
      <LabelledTagInput
        value={testData.value} 
        onChange={testData.onChange} 
      />
    );
    expect(wrapper.childAt(0).childAt(1).props().value).toEqual(testData.value);
    expect(wrapper.childAt(0).childAt(1).props().onChange).toEqual(testData.onChange);
  });

  test('It sets the disabled flag on the text input', () => {
    let disabled = true;
    let wrapper = shallow(
      <LabelledTagInput
        disabled={disabled}
      />
    );
    expect(wrapper.childAt(0).childAt(1).props().disabled).toEqual(disabled);

    disabled = false;
    wrapper = shallow(
      <LabelledTagInput
        disabled={disabled}
      />
    );
    expect(wrapper.childAt(0).childAt(1).props().disabled).toEqual(disabled);
  });
});