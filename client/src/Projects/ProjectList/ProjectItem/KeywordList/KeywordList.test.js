import React from 'react';
import { shallow, mount, render } from 'enzyme';
import KeywordList from './KeywordList';

describe('KeywordList component', () => {
  it('should not produce any HTML if it is not given a keywords prop', () => {
    const wrapper = mount(
          <KeywordList />
    );
    expect(wrapper.find('ul')).toHaveLength(0);
    expect(wrapper.find('li')).toHaveLength(0);
    expect(wrapper.find('.KeywordList')).toHaveLength(0);
    expect(wrapper.find('.Keyword')).toHaveLength(0);
  });

  it('should not produce any HTML if the keywords prop is not an array', () => {
    let keyword1 = {};
    let keyword2 = "Hello";
    let keyword3 = 3;

    const wrapper1 = mount(
          <KeywordList keywords={keyword1}/>
    );
    expect(wrapper1.find('ul')).toHaveLength(0);
    expect(wrapper1.find('li')).toHaveLength(0);
    expect(wrapper1.find('.KeywordList')).toHaveLength(0);
    expect(wrapper1.find('.Keyword')).toHaveLength(0);

    const wrapper2 = mount(
          <KeywordList keywords={keyword2}/>
    );
    expect(wrapper2.find('ul')).toHaveLength(0);
    expect(wrapper2.find('li')).toHaveLength(0);
    expect(wrapper2.find('.KeywordList')).toHaveLength(0);
    expect(wrapper2.find('.Keyword')).toHaveLength(0);

    const wrapper3 = mount(
          <KeywordList keywords={keyword3}/>
    );
    expect(wrapper3.find('ul')).toHaveLength(0);
    expect(wrapper3.find('li')).toHaveLength(0);
    expect(wrapper3.find('.KeywordList')).toHaveLength(0);
    expect(wrapper3.find('.Keyword')).toHaveLength(0);
  });

  it('should not produce any HTML if the keywords prop is an empty array', () => {
    let keywords = [];
    const wrapper = mount(
          <KeywordList keywords={keywords}/>
    );
    expect(wrapper.find('ul')).toHaveLength(0);
    expect(wrapper.find('li')).toHaveLength(0);
    expect(wrapper.find('.KeywordList')).toHaveLength(0);
    expect(wrapper.find('.Keyword')).toHaveLength(0);
  });

  it('should create a <ul> element from the list of keywords', () => {
    let keywords = ['one', 'two', 'three'];
    const wrapper = mount(
          <KeywordList keywords={keywords}/>
    );
    expect(wrapper.find('ul.KeywordList')).toHaveLength(1);
    expect(wrapper.find('li.Keyword')).toHaveLength(3);
  });
});