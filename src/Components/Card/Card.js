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
    passengers,
    addFavorite
   } = props


   let getFavoriteInfo = () => {

    if (type === 'people') {
      return { name, species, homeworld, population, language, type}
    }

    if (type === 'vehicles') {
      return { name, model, vehicle_class, passengers, type}
    }

    if (type === 'planets') {
      return { name, population, terrain, climate, residents, type}
    }

  }

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
    <>
      <p className='residents'></p>
      <span>{residents && residents.length > 0 && residents.join(', ')}</span>
      {residents && residents.length === 0 && <p>None</p>}
    </>
  
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
      <button onClick={(props) => addFavorite(getFavoriteInfo())}></button>
        
      <h4>{name}</h4>
      
      {type === 'people' && peopleCard}
      {type === 'planets' && planetCard}
      {type === 'vehicles' && vehicleCard}
      
    </article>
  )
}

export default Card;

Card.propTypes = {
  type: PropTypes.string,
  name: PropTypes.string,
  species:  PropTypes.string,
  homeworld:  PropTypes.string,
  population:  PropTypes.string,
  language:  PropTypes.string,
  terrain:  PropTypes.string,
  model:  PropTypes.string,
  vehicle_class:  PropTypes.string,
  residents: PropTypes.array,
  climate:  PropTypes.string,
  passengers:  PropTypes.string,
  addFavorite: PropTypes.func
}