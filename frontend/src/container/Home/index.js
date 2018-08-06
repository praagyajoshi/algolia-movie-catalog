import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { addUrlProps, UrlQueryParamTypes, UrlUpdateTypes } from 'react-url-query';

import SearchBox from '../../presentation/SearchBox';
import AddMovieButton from '../../presentation/AddMovieButton';
import Header from '../../presentation/Header';
import TwoColumnLayout from '../../presentation/TwoColumnLayout';
import Pagination from '../../presentation/Pagination';
import SearchPage from '../../presentation/SearchPage';

import Facets from '../Facets';
import MovieResults from '../MovieResults';
import AddMovieModal from '../AddMovieModal';

import { FACET_GENRE, FACET_RATING } from '../../constants/facets';

import { deleteMovieAPI } from '../../dataProviders/API';
import { searchMovies } from '../../dataProviders/search';

// TODO: move to a constants file?
const urlPropsQueryConfig = {
  genre: { type: UrlQueryParamTypes.array, updateType: UrlUpdateTypes.pushIn },
  rating: { type: UrlQueryParamTypes.number, updateType: UrlUpdateTypes.pushIn }
}

class Home extends Component {

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
     * Build facet filters based on the URL, and fetch movies
     * from the search provider on initial page load.
     */
    this.buildFacetFilters(this.props.rating, this.props.genre);
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
    searchMovies(
      query,
      pageNumber,
      this.state.facetFilters,
      (error, content) => {
        /**
         * If no facets were returned, then insert
         * the keys with empty values so that we can
         * render the title of the facet filters at least.
         */
        let facets = content.facets;
        if (Object.keys(facets).length === 0) {
          facets = {
            [FACET_GENRE]: {},
            [FACET_RATING]: {}
          }
        }

        this.setState({
          searchQuery: query,
          movies: content.hits,
          resultsCount: content.nbHits,
          pageCount: content.nbPages,
          pageNumber: content.page,
          hitsPerPage: content.hitsPerPage,
          facets: facets
        });
      }
    );
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
    deleteMovieAPI(movieId, (error, response) => {
      if (error) {
        alert('Could not delete the movie! Please try again.');
      } else if (response) {
        if (response.status === 204) {
          this.removeMovieFromLocalData(movieId);
        }
      }
    });
  }

  removeMovieFromLocalData(movieId) {
    const movies = this.state.movies;
    const newMovies = movies.filter((movie) => {
      return movie.objectID !== movieId
    });

    this.setState({
      movies: newMovies,
      resultsCount: this.state.resultsCount - 1
    });
  }

  render() {
    return (
      <SearchPage>
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

        <AddMovieModal
          isActive={this.state.showAddMovieModal}
          closeButtonClickCallback={() => this.hideAddMovieModal()} />
      </SearchPage>
    );
  }
}

Home.propTypes = {
  genre: PropTypes.array,
  rating: PropTypes.number,
  onChangeGenre: PropTypes.func,
  onChangeRating: PropTypes.func,
  onChangeUrlQueryParams: PropTypes.func
}

export default addUrlProps({ urlPropsQueryConfig })(Home);
