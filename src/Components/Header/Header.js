import React from 'react';
import './Header.scss';
import PropTypes from 'prop-types';
import TextCrawl from '../TextCrawl/TextCrawl'
import { NavLink } from 'react-router-dom';

const Header = ({ movie, favoritesCount }) => {

  return(
    <header className="Header">
      <h1>SWAPIbox</h1>
      
        {movie !== null && <TextCrawl movie={movie}/>}
        {movie === null && <div className="placeholder">
          <h4>A long time ago in a galaxy far, far away ...</h4>
        </div>}
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
          favorites | {favoritesCount}
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