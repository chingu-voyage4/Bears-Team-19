import { shallow } from 'enzyme';
import Logout from './Logout.js';
import { MemoryRouter } from 'react-router-dom';
import SpinnerBox from '../Form/SpinnerBox.js';


describe("Logout Page", async () => {



    it('Logout Component renders', async () => {

        const warpper = shallow(<Logout />);
        const spinner = wrapper.find(SpinnerBox);
        expect(spinner).toHaveLength(1);
    })

    it('Componennt redirects to home page if user is not logged in', () => {
        const wrapper = shallow(
            <MemoryRouter initialEntries={[ '/', '/logout' ]}>
                <Logout />
            </MemoryRouter>
        );

    })

    it('Component redirects if components successful logs out', async () => {
    })
})