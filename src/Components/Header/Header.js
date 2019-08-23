import React from 'react';
import './Header.scss';
import PropTypes from 'prop-types';
import TextCrawl from '../TextCrawl/TextCrawl'
import FilterButton from '../FilterButton/FilterButton';
import { NavLink } from 'react-router-dom';

const Header = ({ movie, favoritesCount }) => {

  return(
    <header className="Header">
      <h1>SWAPIbox</h1>
        {movie !== null && <TextCrawl movie={movie}/>}
      <nav>
        <NavLink to="/people">
          people
        </NavLink>
        <NavLink to="/planets">
          planets
        </NavLink>
        <NavLink to="/vehicles">
          vehicles
        </NavLink>
        <NavLink to="/favorites">
          favorites | {favoritesCount} />
        </NavLink>
      </nav>
    </header>
  )
}



export default Header;

Header.propTypes = {
  favoritesCount: PropTypes.number,
  movie: PropTypes.object,
}