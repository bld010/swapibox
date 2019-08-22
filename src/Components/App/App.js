import React, { Component } from 'react';
import './App.scss';
import Header from '../Header/Header';
import CardContainer from '../CardContainer/CardContainer';
import { fetchMovie, fetchCards } from '../Fetch/Fetch';


class App extends Component {
  constructor() {
    super(); 
    this.state = {
      planets: null,
      people: null,
      movie: null,
      vehicles: null,
      favorites: [],
      filterType: 'people',
      isLoading: true
    }
  }

  updateAppState = (stateProperty, stateValue) => {
    this.setState({
      [stateProperty]: stateValue
    })
  }

  componentDidMount() {
    fetchMovie(this.updateAppState)

    if (this.state.filterType === 'people') {
      fetchCards('https://swapi.co/api/people/', this.state.filterType, this.updateAppState)
    }
    if (this.state.filterType === 'planets') {
      fetchCards('https://swapi.co/api/planets/', this.state.filterType, this.updateAppState)
    }
    if (this.state.filterType === 'vehicles') {
      fetchCards('https://swapi.co/api/planets/', this.state.filterType, this.updateAppState)
    }
    if (this.state.filterType === 'favorites') {
      // displayFavorites()
      // add conditional to show prompt to add favorites if none
    }
  }

  render() {
    return (
        <div className="App">
          <Header favoritesCount={this.state.favorites.length} movie={this.state.movie} />
          <CardContainer cards={this.state.people} updateAppState={this.updateAppState} />
        </div>
    )
    }

}

export default App;
