import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { fetchCards } from '../Fetch/Fetch';
import Card from '../Card/Card';
import './CardContainer.scss'

class CardContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      filterType: 'people',
      isLoading: true,
    }
    this.updateAppState = this.props.updateAppState
  }

  updateCardContainerState = () => {
    this.setState({
      isLoading: false,
    })
  }

  componentDidMount()  {
    if (this.state.filterType === 'people') {
      fetchCards('https://swapi.co/api/people/', this.state.filterType, this.updateCardContainerState, this.updateAppState)
    }
    if (this.state.filterType === 'planets') {
      fetchCards('https://swapi.co/api/planets/', this.state.filterType, this.updateCardContainerState)
    }
    if (this.state.filterType === 'vehicles') {
      fetchCards('https://swapi.co/api/planets/', this.state.filterType, this.updateCardContainerState)
    }
    if (this.state.filterType === 'favorites') {
      // displayFavorites()
      // add conditional to show prompt to add favorites if none
    }
  }

  render() {
    return(
      <section className="CardContainer">
          {this.props.cards !== null && this.props.cards.map(card => 
          <Card 
            key={card.name} 
            {...card}/>
          )}
    
        {this.state.isLoading && <p>Loading ...</p>}
      </section>
    )
  }
}


export default CardContainer;

CardContainer.propTypes = {
  updateAppState: PropTypes.func
}