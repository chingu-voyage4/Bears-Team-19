import React from 'react';
import { shallow, mount, render } from 'enzyme';
import Projects from './Projects';
import ProjectList from './ProjectList/ProjectList';

describe('Projects page', () => {
  it('should have a title', () => {
    const wrapper = render(
      <Projects />
    );
    expect(wrapper.find('h1')).toBeDefined();
  });

  it('should have a ProjectList component', () => {
    const wrapper = render(
      <Projects />
    );
    expect(wrapper.find(ProjectList)).toBeDefined();
  });
});
