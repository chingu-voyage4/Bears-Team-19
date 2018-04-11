import React from 'react';
import { shallow, render } from 'enzyme';
import LabelledInput from './LabelledInput';

const testData = {
  id: 'test',
  label: 'Test',
  value: 'abcde',
  disabled: false,
  onChange: (e) => e,
};


describe('LabelledInput', () => {
  test('It renders a div containing a label and a text input', () => {
    const wrapper = shallow(
      <LabelledInput />
    );
    expect(wrapper.hasClass('LabelledInput')).toBe(true);
    expect(wrapper.children()).toHaveLength(2);
    expect(wrapper.childAt(0).type()).toEqual('label');
    expect(wrapper.childAt(1).type()).toEqual('input');
    const input = wrapper.childAt(1).render();
    expect(input.attr('type')).toEqual('text');
  });

  test('It connects the label and the input through the inputId prop', () => {
    const wrapper = render(
      <LabelledInput
        inputId={testData.id} 
      />
    );
    expect(wrapper.children()).toHaveLength(2);
    expect(wrapper.find('label').first().attr('for')).toEqual(testData.id);
    expect(wrapper.find('input').first().attr('id')).toEqual(testData.id);
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
        inputText={testData.value} 
        onChange={testData.onChange} 
      />
    );
    expect(wrapper.find('input').first().val()).toEqual(testData.value);
  });

  test('It sets the disabled flag on the text input', () => {
    let disabled = true;
    let wrapper = render(
      <LabelledInput
        inputId={testData.id} 
        label={testData.label}
        inputText={testData.value} 
        onChange={testData.onChange} 
        disabled={disabled}
      />
    );
    expect(wrapper.find('input').first().attr('disabled')).toBeTruthy();

    disabled = false;
    wrapper = render(
      <LabelledInput
        inputId={testData.id} 
        label={testData.label}
        inputText={testData.value} 
        onChange={testData.onChange} 
        disabled={disabled}
      />
    );
    expect(wrapper.find('input').first().attr('disabled')).toBeFalsy();
  });
});