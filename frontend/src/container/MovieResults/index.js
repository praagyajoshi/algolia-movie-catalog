import React, { Component } from 'react';
import PropTypes from 'prop-types';

import MovieList from '../../presentation/MovieList';

import './style.css';

class MovieResults extends Component {
  getList() {
    // TODO: handle no results state
    var movies = this.props.movies;
    return movies.map(
      movie => this.getMovieList(movie)
    );
  }

  getMovieList(movie) {
    return (
      <MovieList key={movie._id.$oid} movie={movie} />
    );
  }

  getCounters() {
    if (this.props.movies.length) {
      const counters = this.props.counters;
      const resultsCount = counters.resultsCount;
      var endNumber = counters.hitsPerPage * (counters.pageNumber + 1);
      const startNumber = endNumber - (counters.hitsPerPage - 1);

      if (endNumber > resultsCount) {
        endNumber = resultsCount;
      }

      return (
        <div className="notification">
          Showing <strong>{startNumber} to {endNumber}</strong> of {resultsCount}
        </div>
      );
    } else {
      return null;
    }
  }

  render() {
    return (
      <div className="movie-results container">
        <div>
          { this.getCounters() }
        </div>
        <div>
          { this.getList() }
        </div>
      </div>
    );
  }
}

MovieResults.propTypes = {
  movies: PropTypes.array.isRequired,
  counters: PropTypes.object.isRequired
}

export default MovieResults;
