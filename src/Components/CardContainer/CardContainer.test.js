import React from 'react';
import CardContainer from './CardContainer';
import { shallow } from 'enzyme';
import { Card } from '../Card/Card';

import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

let mockCards = [
  {name: "Luke Skywalker", homeworld: "Tatooine", population: "200000", species: "Human", language: "Galactic Basic"},
  {name: "C-3PO", homeworld: "Tatooine", population: "200000", species: "Droid", language: "n/a"},
  {name: "R2-D2", homeworld: "Naboo", population: "4500000000", species: "Droid", language: "n/a"}
]

let mockHandleFavorite = jest.fn();

let mockFavorites = [
  {name: "Luke Skywalker", homeworld: "Tatooine", population: "200000", species: "Human", language: "Galactic Basic"},
]

let error = null;

describe('CardContainer', () => {
  it('should match the wrapper with data passed through', () => {
    const wrapper = shallow(<CardContainer 
      cards={mockCards}
      type='people'
      handleFavorite={mockHandleFavorite}
      favorites={mockFavorites}
      error={error} />)

      expect(wrapper).toMatchSnapshot();
    
  })
})

