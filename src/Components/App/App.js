import React, { Component } from 'react';
import './App.scss';
import Header from '../Header/Header';
import CardContainer from '../CardContainer/CardContainer';
import { fetchMovie } from '../Fetch/Fetch';


class App extends Component {
  constructor() {
    super(); 
    this.state = {
      planets: null,
      people: null,
      movie: null,
      vehicles: null,
      favorites: [],
    }
  }

  updateAppState = (stateProperty, stateValue) => {
    this.setState({
      [stateProperty]: stateValue
    })
  }

  componentDidMount() {
    fetchMovie(this.updateAppState)
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
