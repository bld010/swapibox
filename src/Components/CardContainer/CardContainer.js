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