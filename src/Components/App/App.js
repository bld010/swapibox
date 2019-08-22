import React, { Component } from 'react';
import './App.scss';
import Header from '../Header/Header';
// import { fetchMovie } from '../Fetch/Fetch';
import CardContainer from '../CardContainer/CardContainer';

class App extends Component {
  constructor() {
    super(); 
    this.state = {
      planets: null,
      people: [],
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
    
  }

  render() {
    return (
        <div className="App">
          <Header favoritesCount={this.state.favorites.length} movie={this.state.movie} updateAppState={this.updateAppState} />
          <CardContainer people={this.state.people} />
        </div>
    )
    }

}

export default App;
