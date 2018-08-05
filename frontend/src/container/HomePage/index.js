import React, { Component } from 'react';

import SearchBox from '../../presentation/SearchBox';
import Facets from '../Facets';
import MovieResults from '../MovieResults';

import Axios from '../../dataProviders/Axios';

// TODO: get application ID and key from env file
const algoliaSearch = require('algoliasearch');
const searchClient = algoliaSearch('Q9082UFEFH', '999cbc167aea99acb23b92054ac46e2f');
const searchIndex = searchClient.initIndex('Movie');

class HomePage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      searchQuery: '',
      movies: [],
      facets: {},
      activeFacets: [],
      resultsCount: 0,
      pageNumber: 0,
      hitsPerPage: 0
    }
  }

  searchValueUpdated(newValue) {
    this.searchWithAlgolia(newValue);
  }

  searchWithAlgolia(query) {
    searchIndex.search({
      query
      // facetFilters: 'genre:comedy'
    }, (error, content) => {
      this.setState({
        searchQuery: query,
        movies: content.hits,
        resultsCount: content.nbHits,
        pageNumber: content.page,
        hitsPerPage: content.hitsPerPage
      });
    });
    searchIndex.search({
      query,
      attributesToRetrieve: ['_id'],
      facets: ['genre', 'rating']
    }, (error, content) => {
      this.setState({
        facets: content.facets
      });
    });
  }

  deleteMovie(movieId) {
    Axios.delete(
      'movies/' + movieId
    ).then((response) => {
      if (response.status === 204) {
        this.removeMovieFromLocalData(movieId);
      }
    }).catch((error) => {
      alert('Could not delete the movie! Please try again.');
    });
  }

  removeMovieFromLocalData(movieId) {
    const movies = this.state.movies;
    const newMovies = movies.filter((movie) => {
      return movie.objectID !== movieId
    });

    this.setState({
      movies: newMovies
    });
  }

  render() {
    return (
      <div className="home-page">
        <SearchBox
          valueChangeCallback={(value) => this.searchValueUpdated(value)} />

        <section className="section">
          <Facets
            facets={this.state.facets} />

          <MovieResults
            counters = {{
              resultsCount: this.state.resultsCount,
              pageNumber: this.state.pageNumber,
              hitsPerPage: this.state.hitsPerPage,
            }}
            movies={this.state.movies}
            deleteMovieCallback={(movieId) => this.deleteMovie(movieId)} />
        </section>
      </div>
    );
  }
}

export default HomePage;
