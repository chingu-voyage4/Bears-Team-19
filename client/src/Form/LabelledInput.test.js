import React from 'react';
import { shallow, render } from 'enzyme';
import LabelledInput from './LabelledInput';

const testData = {
  inputId: 'test',
  label: 'Test',
  inputText: 'abcde',
  disabled: false,
  onChange: (e) => e,
};


describe('LabelledInput', () => {
  test('It renders a div containing a label and an input', () => {
    const wrapper = shallow(
      <LabelledInput />
    );
    expect(wrapper.hasClass('LabelledInput')).toBe(true);
    expect(wrapper.children()).toHaveLength(2);
    expect(wrapper.childAt(0).type()).toEqual('label');
    expect(wrapper.childAt(1).type()).toEqual('input');
  });

  test('It connects the label and the input through the inputId prop', () => {
    const wrapper = render(
      <LabelledInput
        inputId={testData.inputId} 
      />
    );
    expect(wrapper.children()).toHaveLength(2);
    expect(wrapper.find('label').first().attr('for')).toEqual(testData.inputId);
    expect(wrapper.find('input').first().attr('id')).toEqual(testData.inputId);
  });

  test('It displays text in the label', () => {
    const wrapper = render(
      <LabelledInput
        label={testData.label}
      />
    );
    expect(wrapper.find('label').first().text()).toEqual(testData.label);
  });

  test('It sets the input text', () => {
    const wrapper = render(
      <LabelledInput
        inputText={testData.inputText} 
        onChange={testData.onChange} 
      />
    );
    expect(wrapper.find('input').first().val()).toEqual(testData.inputText);
  });

  test('It sets the disabled flag on the text input', () => {
    let disabled = true;
    let wrapper = render(
      <LabelledInput
        inputId={testData.inputId} 
        label={testData.label}
        inputText={testData.inputText} 
        onChange={testData.onChange} 
        disabled={disabled}
      />
    );
    expect(wrapper.find('input').first().attr('disabled')).toBeTruthy();

    disabled = false;
    wrapper = render(
      <LabelledInput
        inputId={testData.inputId} 
        label={testData.label}
        inputText={testData.inputText} 
        onChange={testData.onChange} 
        disabled={disabled}
      />
    );
    expect(wrapper.find('input').first().attr('disabled')).toBeFalsy();
  });

  test('It passes the other props to the input', () => {
    const wrapper = shallow(
      <LabelledInput {...testData} type="email" placeholder="name@example.com" />
    );
    expect(wrapper.find('label').first().prop('type')).toBeUndefined();
    expect(wrapper.find('label').first().prop('placeholder')).toBeUndefined();
    expect(wrapper.find('input').first().prop('type')).toEqual('email');
    expect(wrapper.find('input').first().prop('placeholder')).toEqual('name@example.com');
  });

  test('It passes labelProps to the label', () => {
    const labelProps = {
      id: 'labelId',
      hidden: true,
    };
    const wrapper = shallow(
      <LabelledInput {...testData} labelProps={labelProps} />
    );
    expect(wrapper.find('label').first().prop('id')).toEqual(labelProps.id);
    expect(wrapper.find('label').first().prop('hidden')).toEqual(labelProps.hidden);
    expect(wrapper.find('input').first().prop('id')).not.toEqual(labelProps.id);
    expect(wrapper.find('input').first().prop('hidden')).toBeUndefined();
  });
});