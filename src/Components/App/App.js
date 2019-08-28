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
      isLoading: true,
      peopleFetchError: null,
      vehiclesFetchError: null,
      planetsFetchError: null,
      movieFetchError: null,
    }
    this.fetchMovie = fetchMovie;
    this.fetchCards = fetchCards;
  }

  handleFetchError = (errorType, errorMessage) => {

    this.updateAppState(errorType, errorMessage)
  }

  updateAppState = (stateProperty, stateValue) => {
    this.setState({
      [stateProperty]: stateValue
    })
  }

  handleFavorite = (favoritedCard) => {
    if (!this.state.favorites.find(favorite => favorite.name === favoritedCard.name)) {
      this.addFavorite(favoritedCard)
    } else {
      this.removeFavorite(favoritedCard)
    }
  }

  addFavorite = (newFavoriteCard) => {
      this.setState({
        favorites: [...this.state.favorites, newFavoriteCard]
      })
  } 

  removeFavorite = (cardToRemove) => {
    this.setState({
      favorites: this.state.favorites.filter(favorite => favorite.name !== cardToRemove.name)
    })
  }

  componentDidMount() {
    this.fetchMovie(this.updateAppState, this.handleFetchError);
    this.fetchCards('https://swapi.co/api/people/', this.updateAppState, 'people', this.handleFetchError)
    this.fetchCards('https://swapi.co/api/planets/',  this.updateAppState, 'planets', this.handleFetchError)
    this.fetchCards('https://swapi.co/api/vehicles/', this.updateAppState, 'vehicles', this.handleFetchError)
  }
  

  render() {
    return (
        <div className='App'>
          <Header 
            favoritesCount={this.state.favorites.length} 
            movie={this.state.movie}  
            error={this.state.movieFetchError}
            />

          <Route exact path="/" render={() => {
            return (<section className='CardContainer'>
              <h2>Please select a link above to display people, planets, vehicles, or favorites.</h2>
            
            </section>)
          }} />

          <Route path='/people' render={() => {
            return <CardContainer 
              favorites={this.state.favorites} 
              handleFavorite={this.handleFavorite} 
              cards={this.state.people} 
              error={this.state.peopleFetchError}
              type='people' />
          }} />

          <Route path='/planets' render={() => {
            return <CardContainer 
              favorites={this.state.favorites} 
              handleFavorite={this.handleFavorite} 
              cards={this.state.planets} 
              error={this.state.planetsFetchError}
              type='planets' />
          }} />

          <Route path='/vehicles' render={() => {
            return <CardContainer 
            favorites={this.state.favorites} 
            handleFavorite={this.handleFavorite} 
            cards={this.state.vehicles} 
            error={this.state.vehiclesFetchError}
            type='vehicles' />
          }} />

          <Route path='/favorites' render={() => {
            if (this.state.favorites.length === 0) {
              return <section className='CardContainer favorites'>
                  <p>No favorites found.  Click on the circle next to the name of the person, 
                  vehicle, or planet you'd like to favorite.</p>
                </section>
            } else {
                return <CardContainer 
                  favorites={this.state.favorites} 
                  handleFavorite={this.handleFavorite} 
                  cards={this.state.favorites} 
                  type='favorites' />
            }
          }} />

        </div>
    )
    }

}

export default App;
