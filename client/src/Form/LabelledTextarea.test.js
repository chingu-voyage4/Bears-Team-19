import React from 'react';
import { shallow, render } from 'enzyme';
import LabelledTextarea from './LabelledTextarea';

const testData = {
  id: 'test',
  label: 'Test',
  value: 'abcde',
  disabled: false,
  onChange: (e) => e,
};


describe('LabelledTextarea', () => {
  test('It renders a div containing a label and a textarea', () => {
    const wrapper = shallow(
      <LabelledTextarea />
    );
    expect(wrapper.hasClass('LabelledTextarea')).toBe(true);
    expect(wrapper.children()).toHaveLength(2);
    expect(wrapper.childAt(0).type()).toEqual('label');
    expect(wrapper.childAt(1).type()).toEqual('textarea');
  });

  test('It connects the label and the textarea through the inputId prop', () => {
    const wrapper = render(
      <LabelledTextarea
        inputId={testData.id} 
      />
    );
    expect(wrapper.children()).toHaveLength(2);
    expect(wrapper.find('label').first().attr('for')).toEqual(testData.id);
    expect(wrapper.find('textarea').first().attr('id')).toEqual(testData.id);
  });

  test('It displays text in the label', () => {
    const wrapper = render(
      <LabelledTextarea
        label={testData.label}
      />
    );
    expect(wrapper.find('label').first().text()).toEqual(testData.label);
  });

  test('It sets the text in the textarea', () => {
    const wrapper = render(
      <LabelledTextarea
        inputText={testData.value} 
        onChange={testData.onChange} 
      />
    );
    expect(wrapper.find('textarea').first().val()).toEqual(testData.value);
  });

  test('It sets the disabled flag on the textarea', () => {
    let disabled = true;
    let wrapper = render(
      <LabelledTextarea
        inputId={testData.id} 
        label={testData.label}
        inputText={testData.value} 
        onChange={testData.onChange} 
        disabled={disabled}
      />
    );
    expect(wrapper.find('textarea').first().attr('disabled')).toBeTruthy();

    disabled = false;
    wrapper = render(
      <LabelledTextarea
        inputId={testData.id} 
        label={testData.label}
        inputText={testData.value} 
        onChange={testData.onChange} 
        disabled={disabled}
      />
    );
    expect(wrapper.find('textarea').first().attr('disabled')).toBeFalsy();
  });

  test('It passes the other props to the textarea', () => {
    const wrapper = shallow(
      <LabelledTextarea {...testData} placeholder="Enter a long text" />
    );
    expect(wrapper.find('label').first().prop('placeholder')).toBeUndefined();
    expect(wrapper.find('textarea').first().prop('placeholder')).toEqual('Enter a long text');
  });

  test('It passes labelProps to the label', () => {
    const labelProps = {
      id: 'labelId',
      hidden: true,
    };
    const wrapper = shallow(
      <LabelledTextarea {...testData} labelProps={labelProps} />
    );
    expect(wrapper.find('label').first().prop('id')).toEqual(labelProps.id);
    expect(wrapper.find('label').first().prop('hidden')).toEqual(labelProps.hidden);
    expect(wrapper.find('textarea').first().prop('id')).not.toEqual(labelProps.id);
    expect(wrapper.find('textarea').first().prop('hidden')).toBeUndefined();
  });
});