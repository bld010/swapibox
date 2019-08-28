// import PropTypes from 'prop-types';


export const fetchSpeciesAndLang = (peopleArray, updateAppState, handleFetchError) => {
  let speciesPromises = peopleArray.map(person => {
    return fetch(person.species)
      .then(resp => resp.json())
      .then(resp => {
        person.species = resp.name;
        person.language = resp.language;
        return ({
          name: person.name,
          homeworld: person.homeworld,
          species: person.species,
          language: person.language,
          population: person.population
        });
      })
      .catch(error => handleFetchError('cardFetchError', 'There was an error gathering Species and Language info.'))
  });
  return Promise.all(speciesPromises)
    .then(people => updateAppState('people', people))
    
}

export const fetchHomeworldAndPopulation = (peopleArray, updateAppState, handleFetchError) => {
  console.log(peopleArray)
  let homeworldPromises = peopleArray.map(person => {
    return fetch(person.homeworld)
      .then(resp => resp.json())
      .then(homeworldData => {
        console.log(homeworldData)
        person.homeworld = homeworldData.name;
        person.population = homeworldData.population;      
      })
      .catch(error => handleFetchError('cardFetchError', 'There was an error gathering Homeworld and Population info.'))
    })
  
    return Promise.all(homeworldPromises)
    .then(resp => fetchSpeciesAndLang(peopleArray, updateAppState, handleFetchError))
}

export const cleanPlanets = (planets, updateAppState) => {

  let cleanedPlanets = planets.map(planet => {

    const {
      name,
      terrain,
      population,
      climate,
      residents
    } = planet;

    return {
      name,
      terrain,
      population,
      climate,
      residents
    }

  })
  
  updateAppState('planets', cleanedPlanets);
}

export const cleanVehicles = (residentsArray, updateAppState) => {
  const cleanedVehicles = residentsArray.map(vehicle => {
    const { name, model, vehicle_class, passengers } = vehicle
    return { name, model, vehicle_class, passengers }
  })
  updateAppState('vehicles', cleanedVehicles )
}

export const getErrorName = (dataType) => {
  return dataType + 'FetchError'
}

export const handleFirstResponse = (responseData, dataType, updateAppState, handleFetchError) => {
  if( dataType === 'vehicles') {
    cleanVehicles(responseData, updateAppState)
  } else {
    callSecondaryFetches(responseData, updateAppState, handleFetchError, dataType)
  }
}

export const fetchResidents = (planetsArray, updateAppState, handleFetchError) => {
  planetsArray.forEach((planet) => {
    let residentsPromises = planet.residents.map(resident => {
      return fetch(resident)
        .then(resp => resp.json())
        .then(residentObj => residentObj.name)
        .catch(error => handleFetchError('cardFetchError', 'There was an error gathering resident data.'))
    });
    Promise.all(residentsPromises)
      .then(resolvedResidentsNames => {
        planet.residents = resolvedResidentsNames;
        cleanPlanets(planetsArray, updateAppState)
      })
})
}

export const callSecondaryFetches = (responseData, updateAppState, handleFetchError, dataType) => {
  if (dataType === 'planets') {
    fetchResidents(responseData, updateAppState, handleFetchError)
  }
  if ( dataType === 'people') {
    fetchHomeworldAndPopulation(responseData, updateAppState, handleFetchError)
  }
}

export const fetchCards = (url, updateAppState, dataType, handleFetchError) => {
  fetch(url)
    .then(resp => resp.json())
    .then(data => {
      handleFirstResponse(data.results, dataType, updateAppState, handleFetchError)
      return data} 
      )
    .catch(error => console.log(error))
    .catch(error => handleFetchError(getErrorName(dataType), 'There was an error gathering the requested ' + dataType + ' info.'))
}

export const cleanMovie = (movie, updateAppState) => {
  let { title, opening_crawl, release_date } = movie;
  let cleanedMovie = {
    title,
    opening_crawl,
    release_date
  }

  updateAppState('movie', cleanedMovie)
}


export const fetchMovie = (updateAppState, handleFetchError) => { 

  const getRandomMovieID = () => {
    return Math.floor(Math.random() * Math.floor(7) + 1);
  }
  let movie = null;
  let movieURL = 'https://swapi.co/api/films/' + getRandomMovieID();


  fetch(movieURL)
    .then(resp => resp.json())
    .then(data => {
      movie = data
      return data
    })
    .then(data => cleanMovie(movie, updateAppState))
    .catch(error => handleFetchError('movieFetchError', 'There was an error fetching movie info.'))

}


// fetchMovie.propTypes = {
//   updateAppState: PropTypes.func,
//   handleFetchError: PropTypes.func
// }

// fetchCards.propTypes = {
//   updateAppState: PropTypes.func,
//   handleFetchError: PropTypes.func,
//   url: PropTypes.string,
//   dataType: PropTypes.string
// }

