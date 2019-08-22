import React from 'react';
import PropTypes from 'prop-types';
import './FilterButton.scss';

const FilterButton = (props) => {

  return(
    <button className={props.filterType}>
      {props.filterType !== 'favorites' && <p>| {props.filterType}</p>}
      {props.filterType === 'favorites' && <p>| {props.filterType} | {props.favoritesCount} </p>}
    </button>
  )
}

export default FilterButton;

FilterButton.propTypes = {
  filterType: PropTypes.string,
  favoritesCount: PropTypes.number
}