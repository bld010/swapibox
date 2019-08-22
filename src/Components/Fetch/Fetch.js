import PropTypes from 'prop-types';



export const fetchCards = (url, filterType, updateCardContainerState, updateAppState) => {

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
    });
    return Promise.all(homeworldPromises)
        .then(data => (objToReturn = data))
        // .then(data => console.log(objToReturn))
        .then(data => fetchSpeciesAndLang(objToReturn));
  }

  const fetchSpeciesAndLang = (peopleArray) => {
      let speciesPromises = objToReturn.map(person => {
        return fetch(person.species)
          .then(resp => resp.json())
          .then(resp => {
            person.species = resp.name;
            person.language = resp.language;
          });
      });
      return Promise.all(speciesPromises).then(resp =>{
        updateAppState('people', objToReturn)
        updateCardContainerState()
      })
        
    }

  

  // const fetchResidents = (planetsArray) => {
  //   objToReturn= planetsArray;
  //     objToReturn.map(planet => {
  //       let residentsPromises = planet.residents.map(resident => {
  //         return fetch(resident)
  //           .then(resp => resp.json())
  //           .then(resp => resp.name)
  //           .catch(error => console.log('errorFetchingREsidents'))
  //       });
  //       Promise.all(residentsPromises)
  //         .then(resp => {
  //           planet.residents = resp;
  //           console.log(objToReturn, "planet");
  //         })
  //         .then(resp =>
  //           console.log("this is where I should fire the cleaner function")
  //         );
  //   })
  // }

  const callSecondaryFetches = (responseData) => {
    if (filterType === 'people') {
      fetchHomeworldAndPopulation(responseData)
    }
    // if (filterType === 'planets') {
    //   fetchResidents(responseData)
    // }
  }

  fetch(url)
    .then(resp => resp.json())
    .then(data => callSecondaryFetches(data.results))
    .catch(error => console.log(error))
}












export const fetchMovie = (updateAppState) => { 
  console.log(updateAppState)

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
      console.log(data)
      return data
    })
    .then(data => cleanMovie())
    .catch(error => console.log(error))

}


fetchMovie.propTypes = {
  updateAppState: PropTypes.func,
}

fetchCards.propTypes = {
  updateCardContainerState: PropTypes.func
}

