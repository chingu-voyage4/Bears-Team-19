import React from 'react';
import { CardText } from 'reactstrap';
import { shallow, mount, render } from 'enzyme';
import ProjectItem from './ProjectItem';
import KeywordList from './KeywordList/KeywordList';
import ErrorBoundary from '../../../Utils/ErrorBoundary/ErrorBoundary';
import { MemoryRouter } from 'react-router-dom';

describe('ProjectItem component', () => {
  // no project
  it('should display "No data" if it is not given a project object', () => {
    let project;
    const wrapper = mount(
        <MemoryRouter>
          <ProjectItem />
        </MemoryRouter>
    );
    expect(wrapper.text()).toContain("No data");
  });

  // Title
  it('should display the project\'s title', () => {
    let project = { title: 'Example title' };
    const wrapper = mount(
        <MemoryRouter>
          <ProjectItem project={project}/>
        </MemoryRouter>
    );
    expect(wrapper.text()).toContain('Example title');
  });

  it('should display "Untitled" if the project doesn\'t have a title', () => {
    let project = { id: 34 };
    const wrapper = mount(
      <MemoryRouter>
          <ProjectItem project={project}/>
          </MemoryRouter>
    );
    expect(wrapper.text()).toContain('Untitled');
  });

  it('should display "Untitled" if the project has an empty title', () => {
    let project = { id: 34, title: '' };
    const wrapper = mount(
      <MemoryRouter>
          <ProjectItem project={project}/>
          </MemoryRouter>
    );
    expect(wrapper.text()).toContain('Untitled');
  });

  // Keywords
  it('should display the list of keywords', () => {
    let project = { title: 'Title', keywords: ['html', 'css', 'js'] };
    const wrapper = mount(
      <MemoryRouter>
        <ErrorBoundary>
          <ProjectItem project={project}/>
        </ErrorBoundary>
      </MemoryRouter>
    );
    const list = wrapper.find(KeywordList);
    expect(list).toHaveLength(1);
    expect(list.find('ul')).toHaveLength(1);
    expect(list.find('li')).toHaveLength(3);
  });

  it('should not create HTML elements for keywords if there is no keyword list', () => {
    let project = { title: 'Title' };
    const wrapper = mount(
      <MemoryRouter>
        <ErrorBoundary>
          <ProjectItem project={project}/>
        </ErrorBoundary>
      </MemoryRouter>
    );
    const list = wrapper.find(KeywordList);
    expect(list).toHaveLength(1);
    expect(list.find('ul')).toHaveLength(0);
    expect(list.find('li')).toHaveLength(0);
  });

  it('should not create HTML elements for keywords if the keyword list is empty', () => {
    let project = { title: 'Title', keywords: [] };
    const wrapper = mount(
      <MemoryRouter>
        <ErrorBoundary>
          <ProjectItem project={project}/>
        </ErrorBoundary>
        </MemoryRouter>
    );
    const list = wrapper.find(KeywordList);
    expect(list).toHaveLength(1);
    expect(list.find('ul')).toHaveLength(0);
    expect(list.find('li')).toHaveLength(0);
  });

  // Description
  it('should display the project\'s description', () => {
    let project = { title: 'Title', keywords: ['one'], description: 'This is a description' };
    const wrapper = mount(
      <MemoryRouter>
      <ErrorBoundary>
        <ProjectItem project={project}/>
      </ErrorBoundary>
      </MemoryRouter>
    );
    expect(wrapper.find('.ProjectDescription')).not.toHaveLength(0);
    expect(wrapper.text()).toContain(project.description);
  });
  
  it('should display an empty card body if the project has no description', () => {
    let project = { title: 'Title', keywords: ['one'] };
    const wrapper = mount(
      <MemoryRouter>
      <ErrorBoundary>
        <ProjectItem project={project}/>
      </ErrorBoundary>
      </MemoryRouter>
    );
    expect(wrapper.find('.ProjectDescription')).not.toHaveLength(0);
    expect(wrapper.find(CardText)).toHaveLength(0);
  });

  it('should display an empty card body if the project has an empty description', () => {
    let project = { title: 'Title', keywords: ['one'], description: '' };
    const wrapper = mount(
      <MemoryRouter>
      <ErrorBoundary>
        <ProjectItem project={project}/>
      </ErrorBoundary>
      </MemoryRouter>
    );
    expect(wrapper.find('.ProjectDescription')).not.toHaveLength(0);
    expect(wrapper.find(CardText)).toHaveLength(0);
  });

  it('should display several paragraphs if there are new lines in the description', () => {
    let project = { title: 'Title', keywords: ['one'], description: 'one\r\ntwo\r\nthree' };
    const wrapper = mount(
      <MemoryRouter>
      <ErrorBoundary>
        <ProjectItem project={project}/>
      </ErrorBoundary>
      </MemoryRouter>
    );
    expect(wrapper.find(CardText)).toHaveLength(3);
  });

  it('should not add paragraphs for empty lines in the description', () => {
    let project = { title: 'Title', keywords: ['one'], description: 'one\r\ntwo\r\n\r\nthree\r\n \r\n\t' };
    const wrapper = mount(
      <MemoryRouter>
      <ErrorBoundary>
        <ProjectItem project={project}/>
      </ErrorBoundary>
      </MemoryRouter>
    );
    expect(wrapper.find(CardText)).toHaveLength(3);
  });

  // Owner
  it('should display the project owner', () => {
    let project = { title: 'Title', keywords: ['one'], description: 'This is a description', authorName: 'TheL0lz' };
    const wrapper = mount(
      <MemoryRouter>
      <ErrorBoundary>
        <ProjectItem project={project}/>
      </ErrorBoundary>
      </MemoryRouter>
    );
    expect(wrapper.find('.ProjectOwner')).not.toHaveLength(0);
    expect(wrapper.text()).toContain(project.authorName);    
  });

  // Date modified
  it('should not crash if the project post has no lastPublished property', () => {
    let project = { title: 'Title', keywords: ['one'], description: 'This is a description', authorName: 'TheL0lz' };
    const wrapper = mount(
      <MemoryRouter>
      <ErrorBoundary>
        <ProjectItem project={project}/>
      </ErrorBoundary>
      </MemoryRouter>
    );
    expect(wrapper.find('.ProjectDateSaved')).not.toHaveLength(0);
  });

  it('should display the date the project post was last published', () => {
    let date = new Date(Date.UTC(2018, 3, 15, 15, 3, 34));
    let project = { title: 'Title', keywords: ['one'], description: 'This is a description', authorName: 'TheL0lz', lastSaved: date.toJSON(), lastPublished: date.toJSON() };
    const wrapper = mount(
      <MemoryRouter>
      <ErrorBoundary>
        <ProjectItem project={project}/>
      </ErrorBoundary>
      </MemoryRouter>
    );
    const dateWrapper = wrapper.find('.ProjectDateSaved');
    expect(dateWrapper).not.toHaveLength(0);
    expect(dateWrapper.text()).toContain(date.toLocaleDateString('en', {day: 'numeric'}));
    expect(dateWrapper.text()).toContain(date.toLocaleDateString('en', {year: 'numeric'}));
    expect(dateWrapper.text()).toContain(date.toLocaleDateString('en', {month: 'short'}));    
  });
});
