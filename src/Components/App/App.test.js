import React from 'react';
import App from './App';
import { shallow, mount } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';
import CardContainer from '../CardContainer/CardContainer';

import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

describe('App', () => {
  it('should match the snapshot', () => {
    const wrapper = shallow(<App />);

    expect(wrapper).toMatchSnapshot();
  })

  it('has a method to updateState -- passed to child components', () => {
    const wrapper = shallow(<App />);
    const initialState = wrapper.state();
    const mockPeopleArray = [{name: 'Anakin'}, {name: 'Chewy'}]

    wrapper.instance().updateAppState('people', mockPeopleArray)

    const expectedState = wrapper.state();

    expect(expectedState.people).not.toEqual(initialState.people)
    expect(expectedState.people).toEqual(mockPeopleArray)
  }
  )
  
    // it('should fire fetch calls when mounted', () => {
      
    //   // const wrapper = shallow(<App />);
    //   // let mockFetchMovie = jest.fn()
    //   // let mockFetchCards = jest.fn();

    //   // wrapper.instance().componentDidMount = jest.fn()

    //   // wrapper.instance().fetchCards = mockFetchCards;
    //   // wrapper.instance().fetchMovie = mockFetchMovie;
    //   // wrapper.instance().forceUpdate();

    //   // console.log(wrapper.instance())

    //   // expect(componentDidMount).toHaveBeenCalled();

    // })

})

describe('Router', () => {
  it('should show People component for /people router', () => {
    const wrapper = mount(
      <MemoryRouter initialEntries={['/people']}>
        <App />
      </MemoryRouter>
    )

    const cardContainer = wrapper.find(CardContainer)
    
    expect(cardContainer).toHaveLength(1)
  });
  it('should show Planets component for /planets router', () => {
    const wrapper = mount(
      <MemoryRouter initialEntries={['/planets']}>
        <App />
      </MemoryRouter>
    )

    const cardContainer = wrapper.find(CardContainer)
    
    expect(cardContainer).toHaveLength(1)
  });
  it('should show Vehicles component for /vehicles router', () => {
    const wrapper = mount(
      <MemoryRouter initialEntries={['/vehicles']}>
        <App />
      </MemoryRouter>
    )

    const cardContainer = wrapper.find(CardContainer)
    
    expect(cardContainer).toHaveLength(1)
  });

  it('should show prompt  for / router', () => {
    const wrapper = mount(
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>
    )


    const expected = wrapper.find('h2').props().children
    
    expect(expected).toEqual('Please select a link above to display stuff.')

    //This test is throwing async errors b/c of fetch calls
  });

})
