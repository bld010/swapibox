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
  
  it('should update state with fetch errors', () => {
    const wrapper = shallow(<App />)

    const initialError = wrapper.state().peopleFetchError;
    wrapper.instance().handleFetchError('peopleFetchError', 'Error with people fetch')
    const expected = wrapper.state().peopleFetchError;
    
    expect(initialError).toEqual(null);
    expect(expected).toEqual('Error with people fetch')
  })

  it('should add favoriteCards to state', () => {
    const wrapper = shallow(<App />);
    wrapper.setState({favorites: [{name: 'Anakin'}]})
    const expected = [{name: 'Anakin'}, {name: 'Chewy'}];
    wrapper.instance().addFavorite({name: 'Chewy'})
    expect(wrapper.state().favorites).toEqual(expected);
  })

  it('should remove unfavoritedCards from state', () => {

    const wrapper = shallow(<App />);
    wrapper.setState({favorites: [{name: 'Anakin'}, {name: 'Chewy'}]});
    wrapper.instance().removeFavorite({name: 'Chewy'});
    const expected = [{name: 'Anakin'}];
    expect(wrapper.state().favorites).toEqual(expected);

  })

  describe('handleFavorite' , () => {
    it('should fire removeFavorite when new favorite is passed as argument', () => {
      const wrapper = shallow(<App />);
      const mockAddFavorite = jest.fn();
      wrapper.instance().addFavorite = mockAddFavorite;
      wrapper.setState({favorites: [{name: 'Anakin'}, {name: 'Chewy'}]});
      wrapper.instance().handleFavorite({name: 'Han'});
      expect(mockAddFavorite).toHaveBeenCalled();
    })

    it('should fire removeFavorite when current favorite is passed as argument', () => {
      const wrapper = shallow(<App />);
      const mockRemoveFavorite = jest.fn();
      wrapper.instance().removeFavorite = mockRemoveFavorite;
      wrapper.setState({favorites: [{name: 'Anakin'}, {name: 'Chewy'}]});
      wrapper.instance().handleFavorite({name: 'Anakin'});
      expect(mockRemoveFavorite).toHaveBeenCalled();
    })

  })


  describe('componentDidMount', () => {
    it('should fire 4 fetch calls', async () => {
      jest.spyOn(window, "fetch")
      const wrapper = await shallow(<App />)
      await wrapper.update()
      expect(window.fetch).toHaveBeenCalledTimes(4);
    }) 
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
    
    expect(expected).toEqual('Please select a link above to display people, planets, vehicles, or favorites.')

  });

})

})

