import React, { Component } from 'react';
import './App.scss';
import Header from '../Header/Header';
import CardContainer from '../CardContainer/CardContainer';
import { fetchMovie, fetchCards } from '../Fetch/Fetch';
import { Route } from 'react-router-dom';


class App extends Component {
  constructor() {
    super(); 
    this.state = {
      planets: null,
      people: null,
      movie: null,
      vehicles: null,
      favorites: [],
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
    fetchCards('https://swapi.co/api/people/', this.updateAppState, 'people')
    fetchCards('https://swapi.co/api/planets/',  this.updateAppState, 'planets')
    fetchCards('https://swapi.co/api/vehicles/', this.updateAppState, 'vehicles')
  }
  

  render() {
    return (
        <div className='App'>
          <Header favoritesCount={this.state.favorites.length} movie={this.state.movie} />

          <Route exact path="/" render={() => {
            return <h2>Please select a link above to display stuff.</h2>
          }} />

          <Route path='/people' render={() => {
            return <CardContainer cards={this.state.people} isLoading={this.state.isLoading} />
          }} />

          <Route path='/planets' render={() => {
            return <CardContainer cards={this.state.planets} isLoading={this.state.isLoading} />
          }} />

          <Route path='/vehicles' render={() => {
            return <CardContainer cards={this.state.vehicles} isLoading={this.state.isLoading} />
          }} />

        </div>
    )
    }

}

export default App;
