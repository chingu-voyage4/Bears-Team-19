import { shallow, mount, render } from 'enzyme';

import React from 'react';
import Contact from './Contact.js';
import ContactForm from './ContactForm/ContactForm.js';
import NotificationSystem from 'react-notification-system';

import { MemoryRouter } from 'react-router-dom';

describe('Contact Component', () => {
    

    it('Contact should should exist', () => {
        const wrapper = shallow(
        <MemoryRouter
            initialEntries={['/contact/31283u129u31']}
        >
            <Contact  />
        </MemoryRouter>
        );

        expect(wrapper).toHaveLength(1);
        expect(wrapper.find(Contact)).toBeDefined();
    })

    it('Contact should contacint a form and a notifiation component', () => {
        const wrapper = shallow(
            <MemoryRouter
                initialEntries={['/contact/31283u129u31']}
            >
                <Contact  />
            </MemoryRouter>
            );

        const contact = wrapper.find((Contact));
        expect(contact.find(ContactForm)).toBeDefined();
        expect(contact.find(NotificationSystem)).toBeDefined();
    })
})