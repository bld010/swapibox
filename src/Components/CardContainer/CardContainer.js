import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { fetchCards } from '../Fetch/Fetch'

class CardContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      filterType: '',
      isLoading: true
    }
  }

  componentDidMount()  {
    if (this.state.filterType === 'people') {
      fetchCards('https://swapi.co/api/people/', this.state.filterType, this.updateAppState)
    }
    if (this.state.filterType === 'planets') {
      fetchCards('https://swapi.co/api/planets/', this.state.filterType, this.updateAppState)
    }
    if (this.state.filterType === 'vehicles') {
      fetchCards('https://swapi.co/api/planets/', this.state.filterType, this.updateAppState)
    }
    if (this.state.filterType === 'favorites') {
      // displayFavorites()
      // add conditional to show prompt to add favorites if none
    }
  }

  render() {
    return(
      <p>This is the card container and this should be a loading image</p>
    )
  }
}


export default CardContainer;

CardContainer.propTypes = {
  updateAppState: PropTypes.func
}