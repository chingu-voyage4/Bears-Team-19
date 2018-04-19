import { shallow } from 'enzyme';
import Logout from './Logout.js';
import { MemoryRouter } from 'react-router-dom';
import SpinnerBox from '../Form/SpinnerBox.js';


describe("Logout Page", async () => {



    it('Logout Component renders', async () => {

        const wrapper = shallow(<Logout />);
        const spinner = wrapper.find(SpinnerBox);
        expect(spinner).toHaveLength(1);
    });
})