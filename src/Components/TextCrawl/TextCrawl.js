import React from 'react';
import PropTypes from 'prop-types';
import './TextCrawl.scss'

const TextCrawl = (props) => {



  return(
    <section className="TextCrawl">
      <p>{props.movie && props.movie.opening_crawl}</p>
      <p>{props.movie && props.movie.title}</p>
      <p>{props.movie && props.movie.release_date}</p>
    </section>
  )
}

export default TextCrawl;

TextCrawl.propTypes = {
  movie: PropTypes.object,
}

