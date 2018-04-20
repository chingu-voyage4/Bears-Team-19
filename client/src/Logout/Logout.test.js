import React from 'react';
import { shallow } from 'enzyme';
import Logout from './Logout.js';
import { MemoryRouter } from 'react-router-dom';
import SpinnerBox from '../Form/SpinnerBox.js';


describe("Logout Page", async () => {
    it('Logout Component renders', async () => {
        const wrapper = shallow(
            <MemoryRouter initalEntries={['/logout']}>
                <Logout />
            </MemoryRouter>
        );
        const log = wrapper.find(Logout);
        expect(log).toHaveLength(1);
    });
})