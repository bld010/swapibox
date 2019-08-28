import PropTypes from 'prop-types';

export const fetchCards = (url, updateAppState, dataType, handleFetchError) => {

  let objToReturn = null

  const fetchHomeworldAndPopulation = (peopleArray) => {
    let homeworldPromises = peopleArray.map(person => {
      return fetch(person.homeworld)
        .then(resp => resp.json())
        .then(data => {
          let { name, population } = data;
          return {
            name: person.name,
            homeworld: name,
            population,
            species: person.species[0]
          };
        })
        .catch(error => handleFetchError('cardFetchError', 'There was an error gathering Homeworld and Population info.'))
    });
    return Promise.all(homeworldPromises)
        .then(data => (objToReturn = data))
        .then(data => fetchSpeciesAndLang(objToReturn));
  }

  const fetchSpeciesAndLang = (peopleArray) => {
      let speciesPromises = objToReturn.map(person => {
        return fetch(person.species)
          .then(resp => resp.json())
          .then(resp => {
            person.species = resp.name;
            person.language = resp.language;
          })
          .catch(error => handleFetchError('cardFetchError', 'There was an error gathering Species and Language info.'))
      });
      return Promise.all(speciesPromises).then(resp =>{
        updateAppState('people', objToReturn)
        updateAppState('isLoading', false)
      })
        
    }

  const cleanPlanets = (planets) => {

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
    updateAppState('isLoading', false)
  }

  const fetchResidents = (planetsArray) => {
    objToReturn= planetsArray;
      objToReturn.map(planet => {
        let residentsPromises = planet.residents.map(resident => {
          return fetch(resident)
            .then(resp => resp.json())
            .then(resp => resp.name)
            .catch(error => handleFetchError('cardFetchError', 'There was an error gathering resident data.'))
        });
        Promise.all(residentsPromises)
          .then(resp => {
            planet.residents = resp;
            cleanPlanets(objToReturn)
          })
    })
  }

  const cleanVehicles = (responseData) => {
    const cleanVehicles = responseData.map(vehicle => {
      const { name, model, vehicle_class, passengers } = vehicle

      return { name, model, vehicle_class, passengers }
    })
    
    updateAppState('vehicles', cleanVehicles )
  }
    
  const callSecondaryFetches = (responseData) => {
    if (dataType === 'people') {
      fetchHomeworldAndPopulation(responseData)
    }
    if (dataType === 'planets') {
      fetchResidents(responseData)
    }
    if (dataType === 'vehicles') {
      cleanVehicles(responseData)
    }
    }
  
  const getErrorName = () => {
    return dataType + 'FetchError'
  }

  fetch(url)
    .then(resp => resp.json())
    .then(data => callSecondaryFetches(data.results))
    .catch(error => handleFetchError(getErrorName(), 'There was an error gathering the requested ' + dataType + ' info.'))
}












export const fetchMovie = (updateAppState, handleFetchError) => { 

  const getRandomMovieID = () => {
    return Math.floor(Math.random() * Math.floor(7) + 1);
  }
  let movie = null;
  let movieURL = 'https://swapi.co/api/films/' + getRandomMovieID();


  const cleanMovie = () => {
    let { title, opening_crawl, release_date } = movie;
    let cleanedMovie = {
      title,
      opening_crawl,
      release_date
    }

    updateAppState('movie', cleanedMovie)
  }

  fetch(movieURL)
    .then(resp => resp.json())
    .then(data => {
      movie = data
      return data
    })
    .then(data => cleanMovie())
    .catch(error => handleFetchError('movieFetchError', 'There was an error fetching movie info.'))

}


fetchMovie.propTypes = {
  updateAppState: PropTypes.func,
  handleFetchError: PropTypes.func
}

fetchCards.propTypes = {
  updateAppState: PropTypes.func,
  handleFetchError: PropTypes.func
}

