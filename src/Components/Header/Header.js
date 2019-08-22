import React, { Component }from 'react';
import './Header.scss';
import PropTypes from 'prop-types';
import TextCrawl from '../TextCrawl/TextCrawl'
import FilterButton from '../FilterButton/FilterButton';
import { fetchMovie } from '../Fetch/Fetch';


class Header extends Component {
  constructor(props) {
    super(props)
    this.state = {

    }
  }

  componentDidMount() {
    fetchMovie(this.props.updateAppState)
  }

  render() {
    return(
      <header className="Header">
        <h1>SWAPIbox</h1>
        <TextCrawl movie={this.props.movie}/>
        <nav>
          <FilterButton filterType="people"/>
          <FilterButton filterType="planets"/>
          <FilterButton filterType="vehicles" />
          <FilterButton filterType="favorites" favoritesCount={this.props.favoritesCount} />  
        </nav>
      </header>
    )
  }
}


export default Header;

Header.propTypes = {
  favoritesCount: PropTypes.number,
  movie: PropTypes.object,
}