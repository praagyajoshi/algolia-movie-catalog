import React, { Component } from 'react';
import PropTypes from 'prop-types';

import SearchResults from '../../presentation/SearchResults';
import MovieList from '../../presentation/MovieList';
import NoResult from '../../presentation/NoResult';

class MovieResults extends Component {
  getList() {
    var movies = this.props.movies;

    if (movies.length) {
      return movies.map(
        movie => this.getMovieList(movie)
      );
    } else {
      return this.getEmptyState();
    }
  }

  getEmptyState() {
    return (
      <NoResult
        message="No results found!"
        emoji="😔" />
    );
  }

  getMovieList(movie) {
    const isDeleting = (movie._id.$oid === this.props.deletingMovieId);
    return (
      <MovieList
        key={movie._id.$oid}
        movie={movie}
        isDeleting={isDeleting}
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
  deleteMovieCallback: PropTypes.func.isRequired,
  deletingMovieId: PropTypes.string
}

export default MovieResults;
