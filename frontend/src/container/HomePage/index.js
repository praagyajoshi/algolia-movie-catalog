import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { addUrlProps, UrlQueryParamTypes, UrlUpdateTypes } from 'react-url-query';

import SearchBox from '../../presentation/SearchBox';
import AddMovieButton from '../../presentation/AddMovieButton';
import Header from '../../presentation/Header';
import TwoColumnLayout from '../../presentation/TwoColumnLayout';
import Pagination from '../../presentation/Pagination';

import Facets from '../Facets';
import MovieResults from '../MovieResults';
import AddMovieModal from '../AddMovieModal';

import Axios from '../../dataProviders/Axios';

// TODO: get application ID and key from env file
// TODO: move to dataProviders/search
const algoliaSearch = require('algoliasearch');
const searchClient = algoliaSearch('Q9082UFEFH', '999cbc167aea99acb23b92054ac46e2f');
const searchIndex = searchClient.initIndex('Movie');

// TODO: move to a constants file?
const urlPropsQueryConfig = {
  genre: { type: UrlQueryParamTypes.array, updateType: UrlUpdateTypes.pushIn },
  rating: { type: UrlQueryParamTypes.number, updateType: UrlUpdateTypes.pushIn }
}

class HomePage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      searchQuery: '',
      movies: [],
      facets: {},
      facetFilters: [],
      resultsCount: 0,
      pageCount: 0,
      pageNumber: 0,
      hitsPerPage: 0,
      showAddMovieModal: false
    }
  }

  componentWillReceiveProps(nextProps) {
    this.buildFacetFilters(nextProps.rating, nextProps.genre);
  }

  componentDidMount() {
    /**
     * Fetch all the movies from the search provider
     * on initial page load.
     */
    this.searchMovies('');
  }

  buildFacetFilters(rating, genre) {
    let filters = [];
    let ratingFilters = [];

    // Build filters for genre
    if (genre) {
      genre.forEach(selectedGenre => {
        filters.push("genre:" + selectedGenre);
      });
    }

    // Build filters for rating
    if (rating) {
      for (let i = rating; i <= 5; i++) {
        ratingFilters.push("rating:" + i);
      }

      filters.push(ratingFilters);
    }

    this.setState({
      facetFilters: filters
    }, () => this.searchMovies(this.state.searchQuery));
  }

  searchValueUpdated(newValue) {
    this.searchMovies(newValue);
  }

  searchMovies(query, pageNumber = 0) {
    searchIndex.search({
      query,
      page: pageNumber,
      facetFilters: this.state.facetFilters,
      facets: ['genre', 'rating']
    }, (error, content) => {
      // TODO: catch error
      this.setState({
        searchQuery: query,
        movies: content.hits,
        resultsCount: content.nbHits,
        pageCount: content.nbPages,
        pageNumber: content.page,
        hitsPerPage: content.hitsPerPage,
        facets: content.facets
      });
    });
  }

  jumpToPage(pageNumber) {
    this.searchMovies(this.state.searchQuery, pageNumber);
  }

  showAddMovieModal() {
    this.setState({
      showAddMovieModal: true
    });
  }

  hideAddMovieModal() {
    this.setState({
      showAddMovieModal: false
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
      <div className="home-page-container">
        <div className="home-page">

          <Header>
            <AddMovieButton
              onClickCallback={() => this.showAddMovieModal()} />
          </Header>

          <TwoColumnLayout
            left={
              <Facets
                facets={this.state.facets} />
            }
            right={
              <div>
                <SearchBox
                  valueChangeCallback={(value) => this.searchValueUpdated(value)} />
                <MovieResults
                  counters={{
                    resultsCount: this.state.resultsCount,
                    pageNumber: this.state.pageNumber,
                    hitsPerPage: this.state.hitsPerPage,
                  }}
                  movies={this.state.movies}
                  deleteMovieCallback={(movieId) => this.deleteMovie(movieId)} />
                <Pagination
                  currentPage={this.state.pageNumber}
                  totalPageCount={this.state.pageCount}
                  pageNumberSelectedCallback={(pageNumber) => this.jumpToPage(pageNumber)} />
              </div>
            } />
        </div>

        <AddMovieModal
          isActive={this.state.showAddMovieModal}
          closeButtonClickCallback={() => this.hideAddMovieModal()} />
      </div>
    );
  }
}

HomePage.propTypes = {
  genre: PropTypes.array,
  rating: PropTypes.number,
  onChangeGenre: PropTypes.func,
  onChangeRating: PropTypes.func,
  onChangeUrlQueryParams: PropTypes.func
}

export default addUrlProps({ urlPropsQueryConfig })(HomePage);
