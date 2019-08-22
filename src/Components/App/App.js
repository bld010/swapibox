import React, { Component } from 'react';
import './App.scss';
import Header from '../Header/Header';
import fetchMovie from '../Fetch/Fetch';
import CardContainer from '../CardContainer/CardContainer';

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
    this.updateAppState = this.updateAppState.bind(this)
  }

  updateAppState(stateProperty, stateValue) {
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
          <Header favoritesCount={this.state.favorites.length} movie={this.state.movie}/>
          <CardContainer />
        </div>
    )
    }

}

export default App;
