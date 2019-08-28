import React from 'react';
import Card from './Card';
import { shallow } from 'enzyme';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

let favorites = [{name: 'Han Solo'}, {name: 'X-Wing'}, {name: 'Hoth'}]

describe('Card', () => {
  describe('snapshots', () => {

      it('should match the people snapshot if a favorited person card', () => {
        const wrapper = shallow(<Card 
            name="Han Solo"
            species="Human"
            homeworld="Tatooine"
            population="3"
            language="Galactic Basic"
            type="people"
            favorites={favorites} />
          )
          expect(wrapper).toMatchSnapshot();
        })

          it('should match the people snapshot if not favorited person card', () => {
            const wrapper = shallow(<Card 
                name="Anakin Skywalker"
                species="Human"
                homeworld="Tatooine"
                population="3"
                language="Galactic Basic"
                type="people"
                favorites={favorites} />
              )
              expect(wrapper).toMatchSnapshot();    
      })

      it('should match the vehicles snapshot if not favorited vehicle card', () => {
        const wrapper = shallow(<Card 
            name="AT-AT"
            model="Giant Walking Thingy"
            vehicle_class="Real Big Vehicle"
            passengers="4"
            type="vehicles"
            favorites={favorites} />
          )
          expect(wrapper).toMatchSnapshot();    
    })

      it('should match the vehicles snapshot if favorited vehicle card', () => {
        const wrapper = shallow(<Card 
            name="X-Wing"
            model="Giant Flying Thingy"
            vehicle_class="Small Jet"
            passengers="1"
            type="vehicles"
            favorites={favorites} />
          )
          expect(wrapper).toMatchSnapshot();    
    })


    it('should match the planets snapshot if favorited planet card', () => {
      const wrapper = shallow(<Card 
          name="Hoth"
          terrain="Scary"
          population="?"
          climate="Cold, probably"
          residents={[]}
          type="planets"
          favorites={favorites} />
        )
        expect(wrapper).toMatchSnapshot();    
    })


    it('should match the planets snapshot if not favorited planet card', () => {
      const wrapper = shallow(<Card 
          name="Naboo"
          terrain="Scary"
          population="?"
          type="planets"
          climate="Cold, probably"
          residents={['Joe', 'Bob', 'Sarah']}
          favorites={favorites} />
        )
        expect(wrapper).toMatchSnapshot();    
    })
  })

it('should fire handleFavorite when favorited', () => {
  const mockHandleFavorite = jest.fn();
  
  const wrapper = shallow(<Card 
    name="Naboo"
    terrain="Scary"
    population="?"
    type="planets"
    climate="Cold, probably"
    residents={['Joe', 'Bob', 'Sarah']}
    handleFavorite ={mockHandleFavorite}
    favorites={favorites} />
  )

  wrapper.find('button').simulate('click')
  expect(mockHandleFavorite).toHaveBeenCalled();
})



})