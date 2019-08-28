import React from 'react';
import {
  fetchMovie,
  cleanMovie
} from './Fetch';
import { shallow } from 'enzyme';

import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

describe('Fetch', () => {
  describe('fetchMovie', () => {
    it('should fetch a movie object', () => {


      let mockUpdateAppState = jest.fn();
      let mockHandleFetchError = jest.fn();
     

      window.fetch = jest.fn().mockImplementation(() => {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve({title: 'StarWars'})
        });
      });

      fetchMovie(mockUpdateAppState, mockHandleFetchError);

      expect(window.fetch).toHaveBeenCalled();
      

    })
    it('should throw an error if something goes wrong', () => {
      let mockUpdateAppState = jest.fn();
      let mockHandleFetchError = jest.fn();
     

      window.fetch = jest.fn().mockImplementation(() => {
        return Promise.reject({
          ok: false,
          message: 'Something went wrong'
        });
      });

      fetchMovie(mockUpdateAppState, mockHandleFetchError);

      expect(window.fetch()).rejects.toEqual({
        ok: false,
        message: 'Something went wrong'
      });

      
    })

    // describe('fetchCards', () => {
    //   it('should fetch from the SWAPI', () => {

    //   })
    // })
  })
})
