import React, { Component } from 'react';
import PropTypes from 'prop-types';

import SearchResults from '../../presentation/SearchResults';
import MovieList from '../../presentation/MovieList';

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
      <MovieList
        key={movie._id.$oid}
        movie={movie}
        deleteMovieCallback={(movieId) => this.deleteMovieClicked(movieId)} />
    );
  }

  deleteMovieClicked(movieId) {
    this.props.deleteMovieCallback(movieId);
  }

  render() {
    return (
      <SearchResults
        counters={this.props.counters}
        showCounters={this.props.movies.length ? true : false}>
        {this.getList()}
      </SearchResults>
    );
  }
}

MovieResults.propTypes = {
  movies: PropTypes.array.isRequired,
  counters: PropTypes.object.isRequired,
  deleteMovieCallback: PropTypes.func.isRequired
}

export default MovieResults;
