import React from 'react';
import ReactDOM from 'react-dom';
import { shallow, mount, render } from 'enzyme';
import App from './App';
import Header from './Header';
import Welcome from './Welcome';

describe('App component', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<App />, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it('contains a Header', () => {
    const wrapper = shallow(<App />);
    expect(wrapper.find(Header)).toHaveLength(1);
  });

  it('contains the Welcome page', () => {
    const wrapper = shallow(<App />);
    expect(wrapper.find(Welcome)).toHaveLength(1);
  });
});
