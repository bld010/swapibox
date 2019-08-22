import React from 'react';
import './Header.scss';
import PropTypes from 'prop-types';
import TextCrawl from '../TextCrawl/TextCrawl'
import FilterButton from '../FilterButton/FilterButton'

function Header(props) {



  return(
    <header className="Header">
      <h1>SWAPIbox</h1>
      <TextCrawl movie={props.movie}/>
      <nav>
        <FilterButton filterType="people"/>
        <FilterButton filterType="planets"/>
        <FilterButton filterType="vehicles" />
        <FilterButton filterType="favorites" favoritesCount={props.favoritesCount} />  
      </nav>
    </header>
  )
}


export default Header;

Header.propTypes = {
  favoritesCount: PropTypes.number,
  movie: PropTypes.object,
}