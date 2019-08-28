import React from 'react';
import { shallow } from 'enzyme';
import Header from './Header';


import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });



describe('Header', () => {
  it('should match the snapshot', () => {

    const mockMovie = {
      title: 'StarWars',
    }
    
    const mockError1 = null;

    const wrapper = shallow(<Header 
      movie={mockMovie}
      favoritesCount={(2)}
      error={mockError1}
    />)

    expect(wrapper).toMatchSnapshot();
  })

  it('should show an error if an error is thrown', () => {

    const mockMovie = {
      title: 'StarWars',
    }
    
    const mockError2 = 'There was an error.'

    const wrapper = shallow(<Header 
      movie={mockMovie}
      favoritesCount={(2)}
      error={mockError2}
    />)

    const expected = wrapper.find('p').props().children;

    expect(expected).toEqual(mockError2)

  })

  it('should show some text if no movie nor error yet', () => {

    const mockMovie = null;
    
    const mockError3 = null;

    const wrapper = shallow(<Header 
      movie={mockMovie}
      favoritesCount={(2)}
      error={mockError3}
    />)

    const expected = wrapper.find('h4').props().children;

    expect(expected).toEqual('A long time ago in a galaxy far, far away ...')

  })
})