import React from 'react';
import { mount, shallow } from 'enzyme';
import ContactForm from './ContactForm.js';

describe('ContactForm Component', () => {


    it('Component renders one input & one text area & one button', () => {
        const wrapper = shallow(
            <ContactForm />
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
        const wrapper = shallow(<ContactForm projectTitle={projectTitle} />);
        expect(wrapper.text()).toContain("Example Project");
    })

    it('Input has same value as subject prop', () => {
        const subject = "Test Subject";
        const wrapper = shallow(<ContactForm subject={subject} />);

        const input = wrapper.find('input');
        expect(input.props().value).toMatch(/Test Subject/);
    });

    it('Textarea has same value as body prop', () => {
        const body = "Test Body";
        const wrapper = shallow(<ContactForm body={body} />);

        const Textarea = wrapper.find('textarea');
        expect(Textarea.props().value).toMatch(/Test Body/);
    })

    it('Submit button is disabled if disabled is true', () => {
        const wrapper = shallow(<ContactForm  disabled={true}/>);
        const button = wrapper.find('button');
        expect(button.prop('disabled')).toBe(true);
    })


    it('Submit button is enabled if disabled is false', () => {

        const wrapper = shallow(<ContactForm  disabled={false}/>);
        const button = wrapper.find('button');
        expect(button.prop('disabled')).toBe(false);
    })

})