import React, { Component } from 'react';
import PropTypes from 'prop-types';

class CardContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      filterSelected: 'people',
      isLoading: true
    }
  }

  componentDidMount()  {
    
  }

  render() {
    return(
      <p>This is the card container</p>
    )
  }
}


export default CardContainer;

CardContainer.propTypes = {
}