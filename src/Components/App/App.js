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

  addFavorite = (newFavoriteCard) => {
    
    if (!this.state.favorites.find(favorite => favorite.name === newFavoriteCard.name)) {
      
      this.setState({
        favorites: [...this.state.favorites, newFavoriteCard]
      })
      console.log(this.state.favorites)
    }
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
            return <CardContainer addFavorite={this.addFavorite} cards={this.state.people} isLoading={this.state.isLoading} type='people' />
          }} />

          <Route path='/planets' render={() => {
            return <CardContainer addFavorite={this.addFavorite} cards={this.state.planets} isLoading={this.state.isLoading} type='planets' />
          }} />

          <Route path='/vehicles' render={() => {
            return <CardContainer addFavorite={this.addFavorite} cards={this.state.vehicles} isLoading={this.state.isLoading} type='vehicles' />
          }} />

          <Route path='/favorites' render={() => {
            return <CardContainer addFavorite={this.addFavorite} cards={this.state.favorites} isLoading={this.state.isLoading} />
          }} />

        </div>
    )
    }

}

export default App;
