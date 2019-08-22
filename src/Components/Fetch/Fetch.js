import PropTypes from 'prop-types'



const fetchMovie = (updateMovie) => { 

  let movie = null;
  let movieURL = 'https://swapi.co/api/films/' + getRandomMovieID();

  function getRandomMovieID() {
    return Math.floor(Math.random() * Math.floor(7) + 1);
  }

  const cleanMovie = () => {
    let { title, opening_crawl, release_date } = movie;
    let cleanMovie = {
      title,
      opening_crawl,
      release_date
    }
    updateMovie(cleanMovie)
  }

  


    fetch(movieURL)
      .then(resp => resp.json())
      .then(data => {
        movie = data
        return data
      })
      .then(data => cleanMovie())
      .catch(error => console.log(error))

}


export default fetchMovie;

fetchMovie.propTypes = {
  updateMovie: PropTypes.func,
}

