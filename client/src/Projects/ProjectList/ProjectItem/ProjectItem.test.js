import React from 'react';
import { shallow, mount, render } from 'enzyme';
import ProjectItem from './ProjectItem';
import KeywordList from './KeywordList/KeywordList';
import ErrorBoundary from '../../../Utils/ErrorBoundary/ErrorBoundary';

describe('ProjectItem component', () => {
  // no project
  it('should display "No data" if it is not given a project object', () => {
    let project;
    const wrapper = mount(
          <ProjectItem />
    );
    expect(wrapper.text()).toContain("No data");
  });

  // Title
  it('should display the project\'s title', () => {
    let project = { title: 'Example title' };
    const wrapper = mount(
          <ProjectItem project={project}/>
    );
    expect(wrapper.text()).toContain('Example title');
  });

  it('should display "Untitled" if the project doesn\'t have a title', () => {
    let project = { id: 34 };
    const wrapper = mount(
          <ProjectItem project={project}/>
    );
    expect(wrapper.text()).toContain('Untitled');
  });

  it('should display "Untitled" if the project has an empty title', () => {
    let project = { id: 34, title: '' };
    const wrapper = mount(
          <ProjectItem project={project}/>
    );
    expect(wrapper.text()).toContain('Untitled');
  });

  // Keywords
  it('should display the list of keywords', () => {
    let project = { title: 'Title', keywords: ['html', 'css', 'js'] };
    const wrapper = mount(
      <ErrorBoundary>
        <ProjectItem project={project}/>
      </ErrorBoundary>
    );
    const list = wrapper.find(KeywordList);
    expect(list).toHaveLength(1);
    expect(list.find('ul')).toHaveLength(1);
    expect(list.find('li')).toHaveLength(3);
  });

  it('should not create HTML elements for keywords if there is no keyword list', () => {
    let project = { title: 'Title' };
    const wrapper = mount(
      <ErrorBoundary>
        <ProjectItem project={project}/>
      </ErrorBoundary>
    );
    const list = wrapper.find(KeywordList);
    expect(list).toHaveLength(1);
    expect(list.find('ul')).toHaveLength(0);
    expect(list.find('li')).toHaveLength(0);
  });

  it('should not create HTML elements for keywords if the keyword list is empty', () => {
    let project = { title: 'Title', keywords: [] };
    const wrapper = mount(
      <ErrorBoundary>
        <ProjectItem project={project}/>
      </ErrorBoundary>
    );
    const list = wrapper.find(KeywordList);
    expect(list).toHaveLength(1);
    expect(list.find('ul')).toHaveLength(0);
    expect(list.find('li')).toHaveLength(0);
  });

  // Description
  // Owner
  // Date created
  // test the key as well
});