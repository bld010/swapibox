import React from 'react';
import PropTypes from 'prop-types';
import './Card.scss'

const Card = (props) => {

  let { name, 
    species, 
    homeworld, 
    population, language, terrain } = props

  return(
    <article className="Card">
      <h4>{name}</h4>
      <p>| {species}</p>
      <p>| {homeworld} ({population})</p>
      <p>| {language}</p>
      <p>{terrain}</p>
      <button></button>
    </article>
  )
}

export default Card;

Card.propTypes = {
  
}