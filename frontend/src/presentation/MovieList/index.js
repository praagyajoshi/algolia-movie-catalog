import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './style.css';

class MovieList extends Component {

  onDeleteClick(e) {
    e.preventDefault();
    this.props.deleteMovieCallback(this.props.movie.objectID);
  }

  render() {
    const movie = this.props.movie;
    var movieImageUrl = '';

    if (movie.image && movie.image.length) {
      movieImageUrl = movie.image;
    } else if (movie.uploaded_image && movie.uploaded_image.length) {
      movieImageUrl = movie.uploaded_image;
    } else {
      // TODO: add a local placeholder poster
    }

    return (
      <div className="box movie-list">
        <article className="media">
          <div className="media-left">
            <figure className="image is-2by3">
              <img src={ movieImageUrl } alt="Movie poster" />
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
            <nav className="level is-mobile">
              <div className="level-left">
                <a
                  className="level-item button is-small is-danger is-outlined"
                  aria-label="delete"
                  onClick={(e) => this.onDeleteClick(e)}>
                  Delete
                </a>
              </div>
            </nav>
          </div>
        </article>
      </div>
    );
  }
}

MovieList.propTypes = {
  movie: PropTypes.object.isRequired,
  deleteMovieCallback: PropTypes.func.isRequired
}

export default MovieList;
