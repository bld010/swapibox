import React from 'react';
import App from './App';
import { shallow, mount } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';
import CardContainer from '../CardContainer/CardContainer';

import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

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
