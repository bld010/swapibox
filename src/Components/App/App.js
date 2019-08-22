import React, { Component } from 'react';
import './App.scss';
import Header from '../Header/Header';
import fetchMovie from '../Fetch/Fetch'

class App extends Component {
  constructor() {
    super(); 
    this.state = {
      planets: null,
      people: null,
      movie: null,
      vehicles: null,
      favorites: []
    }
    this.updateMovie = this.updateMovie.bind(this)
  }

  updateMovie(movie) {
    this.setState({
      movie: movie
    })
  }

  componentDidMount() {
    fetchMovie(this.updateMovie)
  }

  render() {
    return (
        <div className="App">
          <Header favoritesCount={this.state.favorites.length}/>
        </div>
    )
    }

}

export default App;
