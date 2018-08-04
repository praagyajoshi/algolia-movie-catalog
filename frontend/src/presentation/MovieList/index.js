import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './style.css';

class MovieList extends Component {
  render() {
    const movie = this.props.movie;

    return (
      <div className="box movie-list">
        <article className="media">
          <div className="media-left">
            <figure className="image is-2by3">
              {/* TODO: handle image being blank */}
              <img src={ movie.image } alt="Movie poster" />
            </figure>
          </div>
          <div className="media-content">
            <div className="content">
              <p>
                <strong>{movie.title}</strong>&nbsp;&middot;&nbsp;
                <small>{movie.year}</small>&nbsp;&middot;&nbsp;
                <small>Rating: { movie.rating }</small>
                <br />
                { movie.actors.join(', ') }
              </p>
            </div>
          </div>
        </article>
      </div>
    );
  }
}

MovieList.propTypes = {
  movie: PropTypes.object.isRequired
}

export default MovieList;
