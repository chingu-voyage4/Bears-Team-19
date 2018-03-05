import React from 'react';
import ReactDOM from 'react-dom';
import { shallow, mount, render } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';
import App from './App';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';

describe('App component', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render((
      <MemoryRouter>
        <App />
      </MemoryRouter>
      ), div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it('contains a Header', () => {
    const wrapper = mount(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );
    expect(wrapper.find(Header)).toHaveLength(1);
  });

  it('contains the content as a Main component', () => {
    const wrapper = mount(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );
    expect(wrapper.find(Main)).toHaveLength(1);
  });

  it('contains a Footer', () => {
    const wrapper = mount(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );
    expect(wrapper.find(Footer)).toHaveLength(1);
  });
});
