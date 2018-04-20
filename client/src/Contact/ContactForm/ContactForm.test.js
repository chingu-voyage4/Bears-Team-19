import React from 'react';
import { mount, shallow } from 'enzyme';
import ContactForm from './ContactForm.js';

const props = {
    handleChange: () => {},
    handleSubmit: () => {},
    subject: '',
    body: '',
};

describe('ContactForm Component', () => {


    it('Component renders one input & one text area & one button', () => {
        const wrapper = shallow(
            <ContactForm {...props}/>
        );
        const input = wrapper.find('input')
        const textArea = wrapper.find('textarea');
        const button = wrapper.find('button');
        expect(input.length).toEqual(1);
        expect(textArea.length).toEqual(1);
        expect(button.length).toEqual(1);
    })

    it('displays the name of the project', () => {
        const projectTitle = "Example Project";
        const wrapper = shallow(<ContactForm {...props} projectTitle={projectTitle} />);
        expect(wrapper.text()).toContain("Example Project");
    })

    it('Input has same value as subject prop', () => {
        const newSubject = "Test Subject";
        const { subject, ...otherProps} = props;
        const wrapper = shallow(<ContactForm {...otherProps} subject={newSubject} />);

        const input = wrapper.find('input');
        expect(input.props().value).toMatch(/Test Subject/);
    });

    it('Textarea has same value as body prop', () => {
        const newBody = "Test Body";
        const { body, ...otherProps} = props;
        const wrapper = shallow(<ContactForm {...otherProps} body={newBody} />);

        const Textarea = wrapper.find('textarea');
        expect(Textarea.props().value).toMatch(/Test Body/);
    })

    it('Submit button is disabled if disabled is true', () => {
        const wrapper = shallow(<ContactForm {...props} disabled={true}/>);
        const button = wrapper.find('button');
        expect(button.prop('disabled')).toBe(true);
    })


    it('Submit button is enabled if disabled is false', () => {

        const wrapper = shallow(<ContactForm {...props} disabled={false}/>);
        const button = wrapper.find('button');
        expect(button.prop('disabled')).toBe(false);
    })

})