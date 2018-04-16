import React from 'react';
import { shallow, mount, render } from 'enzyme';
import ProjectList from './ProjectList';
import ProjectItem from './ProjectItem/ProjectItem';

describe('ProjectList component', () => {
  it('should display "No projects found" if it is not given an array of projects', () => {
    let projects;
    const wrapper = render(
      <ProjectList projects={projects}/>
    );
    expect(wrapper.text()).toContain("No projects found");
  });

  it('should display "No projects found" if it is given an empty array of projects', () => {
    let projects = [];
    const wrapper = render(
      <ProjectList projects={projects}/>
    );
    expect(wrapper.text()).toContain("No projects found");
  });

  it('should have a single ProjectItem component if passed an array of one item', () => {
    let projects = [{
      id:'1', 
      title: 'snap this',
      author:'Bears 19', 
      category:['web' ,'development'], 
      keywords:['web', 'react', 'js'], 
      description:'lorem ipsum....'
    }];
    const wrapper = shallow(
      <ProjectList projects={projects}/>
    );
    expect(wrapper.find(ProjectItem)).toHaveLength(1);
  });
  
  it('should have the same number of ProjectItem components as the array it is given', () => {
    let projects = [
      {
        id:'1', 
        title: 'Project one',
        author:'Bears 19', 
        category:['web' ,'development'], 
        keywords:['web', 'react', 'js'], 
        description:'lorem ipsum....'
      },
      {
        id:'2', 
        title: 'Project two',
        author:'Bears 19', 
        category:['web' ,'development'], 
        keywords:['web', 'react', 'js'], 
        description:'lorem ipsum....'
      },
      {
        id:'3', 
        title: 'Project three',
        author:'Bears 19', 
        category:['web' ,'development'], 
        keywords:['web', 'react', 'js'], 
        description:'lorem ipsum....'
      }
    ];
    const wrapper = shallow(
      <ProjectList projects={projects}/>
    );
    expect(wrapper.find(ProjectItem)).toHaveLength(3);
  });
  
  it('should use the project id as key for the ProjectItems', () => {
    let projects = [
      {
        id:'1', 
        title: 'Project one',
        author:'Bears 19', 
        category:['web' ,'development'], 
        keywords:['web', 'react', 'js'], 
        description:'lorem ipsum....'
      },
      {
        id:'2', 
        title: 'Project two',
        author:'Bears 19', 
        category:['web' ,'development'], 
        keywords:['web', 'react', 'js'], 
        description:'lorem ipsum....'
      },
      {
        id:'3', 
        title: 'Project three',
        author:'Bears 19', 
        category:['web' ,'development'], 
        keywords:['web', 'react', 'js'], 
        description:'lorem ipsum....'
      }
    ];
    const wrapper = shallow(
      <ProjectList projects={projects}/>
    );
    expect(wrapper.childAt(0).key()).toEqual('1');
    expect(wrapper.childAt(1).key()).toEqual('2');
    expect(wrapper.childAt(2).key()).toEqual('3');
  });
});
