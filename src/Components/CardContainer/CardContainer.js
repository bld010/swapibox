import React from 'react';
import PropTypes from 'prop-types';
import Card from '../Card/Card';
import './CardContainer.scss'

const CardContainer = ({ cards, isLoading, type, addFavorite }) => {
  return(
    <section className="CardContainer">
      {cards !== null && cards.map(card => 
        <Card key={card.name} addFavorite={addFavorite} type={type} {...card}/>
        
      )}
      {cards === null && <p>Loading ...</p>}
    </section>
  )
}

export default CardContainer;

CardContainer.propTypes = {
  isLoading: PropTypes.bool,
  cards: PropTypes.array,
  type: PropTypes.string,
  addFavorite: PropTypes.func
}