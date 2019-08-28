import React from 'react';
import PropTypes from 'prop-types';
import Card from '../Card/Card';
import './CardContainer.scss'

const CardContainer = ({ cards, type, handleFavorite, favorites }) => {
  return(
    <section className={type + " CardContainer"}>
      {cards !== null && cards.map(card => 
        <Card key={card.name} favorites={favorites} handleFavorite={handleFavorite} type={type} {...card}/>
      )}
      {cards === null && <p>Loading ...</p>}
    </section>
  )
}

export default CardContainer;

CardContainer.propTypes = {
  cards: PropTypes.array,
  type: PropTypes.string,
  handleFavorite: PropTypes.func,
  favorites: PropTypes.array
}