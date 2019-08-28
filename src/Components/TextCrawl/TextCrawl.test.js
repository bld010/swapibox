import React from 'react';
import { shallow } from 'enzyme';
import TextCrawl from './TextCrawl';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

describe('TextCrawl', () => {
  it('should match the snapshot', () => {

    const mockMovie = {
        opening_crawl: 'A long time ago in a galaxy far far away',
        title:'Star Wars',
        release_date: 'Yesteryear'
      }
    
    const wrapper = shallow(<TextCrawl 
      movie={mockMovie}
    />)

    expect(wrapper).toMatchSnapshot();

  })
})