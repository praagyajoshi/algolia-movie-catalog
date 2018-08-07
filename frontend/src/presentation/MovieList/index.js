import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ClassNames from 'classnames';

import './style.css';

class MovieList extends Component {

  onDeleteClick(e) {
    e.preventDefault();
    this.props.deleteMovieCallback(this.props.movie.objectID);
  }

  getTitle() {
    const highlightResult = this.props.movie._highlightResult;

    return { __html: highlightResult.title.value};
  }

  getCastList() {
    let actors = this.props.movie._highlightResult.actors;
    let remainingPostfix = '';
    let actorsHtml = '';
    let actorsArray = [];

    if (!actors) {
      return { __html: actorsHtml };
    }

    // Checking if there's any actor who has been highlighted
    const highlightFound = actors.some(actor => {
      return (actor.matchedWords.length > 0);
    });

    if (!highlightFound) {
      /**
       * If no highlight was found, then use the actors attribute
       * instead of the _highlightResult.actors attribute
       */
      actorsArray = this.props.movie.actors;
    } else {
      /**
       * If a highlight was found, then sort the actors array on
       * the basis of number of words which were matched. This is
       * done to ensure that a highlighted name is always shown
       * in the results.
       */
      actors.sort((a, b) => { return (b.matchedWords.length - a.matchedWords.length) });
      actorsArray = actors.map((actor) => { return actor.value });
    }

    // Not showing more than 5 actors at a time
    if (actorsArray.length > 5) {
      const remainingCount = actorsArray.length - 5;
      remainingPostfix = ' and ' + remainingCount;
      remainingPostfix += remainingCount > 1 ? ' others' : ' other';
      actorsArray = actorsArray.slice(0, 5);
    }

    actorsHtml = actorsArray.join(', ') + remainingPostfix;

    return { __html: actorsHtml };
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
                  <h5
                    className="title movie-title is-5"
                    dangerouslySetInnerHTML={this.getTitle()} />
                  <div className="movie-info">
                    {movie.year}&nbsp;&middot;&nbsp;
                    {movie.genre && movie.genre.join(', ')}
                  </div>
                </div>

                <div>
                  {movie.rating}&nbsp;<i className="fas fa-star star-rating"></i>
                </div>

                <div className="movie-cast-container">
                  <div className="movie-cast" dangerouslySetInnerHTML={this.getCastList()} />
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
