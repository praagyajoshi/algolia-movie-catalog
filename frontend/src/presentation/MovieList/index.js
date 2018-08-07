import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ClassNames from 'classnames';

import './style.css';

class MovieList extends Component {

  onDeleteClick(e) {
    e.preventDefault();
    this.props.deleteMovieCallback(this.props.movie.objectID);
  }

  getCastList() {
    const movie = this.props.movie;

    if (movie.actors.length > 5) {
      const remainingCount = movie.actors.length - 5;
      const remainingPronoun = remainingCount > 1 ? 'others' : 'other';
      return movie.actors.slice(0, 5).join(', ') + `, and ${remainingCount} ${remainingPronoun}`;
    } else {
      return movie.actors.join(', ');
    }
  }

  getMovieImage() {
    const movie = this.props.movie;
    let movieImageUrl = '';
    let backgroundColor = '#F3F3F3';

    if (movie.image && movie.image.length) {
      movieImageUrl = movie.image;
    } else if (movie.uploaded_image && movie.uploaded_image.length) {
      movieImageUrl = movie.uploaded_image;
    }

    if (movie.color) {
      backgroundColor = movie.color;
    }

    const imageStyle = {
      backgroundImage: 'url(' + movieImageUrl + ')',
      backgroundColor
    };

    return (
      <div
        style={imageStyle}
        className="image is-2by3"
        alt="Movie poster" />
    );
  }

  render() {
    const { movie, isDeleting } = this.props;
    const deleteButtonClasses = ClassNames({
      'button' : true,
      'delete-button' : true,
      'is-danger' : true,
      'is-outlined' : true,
      'is-loading' : isDeleting
    });

    return (
      <div className="movie-list">
        <article className="media">

          <div className="media-left">
            {this.getMovieImage()}
          </div>

          <div className="media-content">
            <div className="content">

              <div className="top-content">
                <div>
                  <h5 className="title movie-title is-5">
                    {movie.title}
                  </h5>
                  <div className="movie-info">
                    {movie.year}&nbsp;&middot;&nbsp;
                    {movie.genre && movie.genre.join(', ')}
                  </div>
                </div>

                <div>
                  {movie.rating}&nbsp;<i className="fas fa-star star-rating"></i>
                </div>

                <div className="movie-cast-container">
                  <div className="movie-cast">
                    {this.getCastList()}
                  </div>
                </div>
              </div>

              <div>
                <a
                  className={deleteButtonClasses}
                  aria-label="delete"
                  onClick={(e) => this.onDeleteClick(e)}>
                  Delete
                </a>
              </div>
            </div>
          </div>

        </article>
      </div>
    );
  }
}

MovieList.propTypes = {
  movie: PropTypes.object.isRequired,
  deleteMovieCallback: PropTypes.func.isRequired,
  isDeleting: PropTypes.bool.isRequired
}

export default MovieList;
