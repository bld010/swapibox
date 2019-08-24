import React from 'react';
import PropTypes from 'prop-types';
import './Card.scss'

const Card = (props) => {

  let { name, 
    species, 
    homeworld, 
    population, 
    language, 
    terrain, 
    model, 
    vehicle_class, 
    residents, 
    climate, 
    type,
    passengers
   } = props

  let peopleCard = 
    <>
    <h5>| Species: </h5> 
    <p>{species}</p>
    <h5>| Home: </h5>
    <p>{homeworld} (Pop. {population})</p>
    <h5>| Language: </h5>
    <p>{language}</p>
    </>;

  let residentsList = 
      <p className='residents'>
      <span>{residents && residents.length > 0 && residents.join(', ')}</span>
      {residents && residents.length === 0 && <p>None</p>}
      </p>;
  
  let planetCard = 
    <>
    <h5>| Terrain: </h5>
    <p>{terrain}</p>
    <h5>| Population: </h5>
    <p>{population}</p>
    <h5>| Climate: </h5>
    <p>{climate}</p>
    <h5>| Residents: </h5>
    {residentsList}
    </>;
  
  let vehicleCard = 
    <>
    <h5>| Model: </h5>
    <p>{model} </p>
    <h5>| Class: </h5>
    <p>{vehicle_class}</p>
    <h5>| Passengers: </h5>
    <p>{passengers}</p>
    </>;

  return(
    <article className={type + ' Card'}>
      <button></button>
      <h4>{name}</h4>
      
      {type === 'people' && peopleCard}
      {type === 'planets' && planetCard}
      {type === 'vehicles' && vehicleCard}
      
    </article>
  )
}

export default Card;

Card.propTypes = {
  type: PropTypes.string
}