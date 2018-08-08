import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { addUrlProps } from 'react-url-query';

import SearchBox from '../../presentation/Search/Box';
import SearchPage from '../../presentation/Search/Page';

import AddMovieButton from '../../presentation/AddMovie/Button';
import Header from '../../presentation/Header';
import TwoColumnLayout from '../../presentation/TwoColumnLayout';
import Pagination from '../../presentation/Pagination';

import Facets from '../Facets';
import MovieResults from '../MovieResults';
import AddMovieModal from '../AddMovieModal';

import { FACET_GENRE, FACET_RATING } from '../../constants/facets';

import { deleteMovieAPI } from '../../dataProviders/API';
import { searchMovies } from '../../dataProviders/search';
import { urlPropsQueryConfig } from '../../dataProviders/urlState';

class Home extends Component {

  constructor(props) {
    super(props);
    this.state = {
      q: '',
      movies: [],
      facets: {},
      facetFilters: [],
      page: 0,
      resultsCount: 0,
      pageCount: 0,
      hitsPerPage: 0,
      deletingMovieId: '',
      showAddMovieModal: false,
      isInitialLoad: true
    }
  }

  componentWillReceiveProps(nextProps) {
    const { rating, genre, page, q } = nextProps;

    this.buildFiltersAndSearch(
      rating,
      genre,
      page && page > 0 ? page : 1,
      q ? q : ''
    );
  }

  componentDidMount() {
    const { rating, genre, page, q } = this.props;

    /**
     * Build facet filters based on the URL, and fetch movies
     * from the search provider on initial page load.
     */
    this.buildFiltersAndSearch(
      rating,
      genre,
      page && page > 0 ? page : 1,
      q ? q : ''
    );
  }

  buildFiltersAndSearch(rating, genre, page, q) {
    let filters = [];
    let ratingFilters = [];

    /**
     * Build filters for genre.
     * Each genre filter as pushed individually
     * in the array as "genre:<genre-name>" to
     * signify an AND relationship between them.
     */
    if (genre) {
      genre.forEach(selectedGenre => {
        filters.push("genre:" + selectedGenre);
      });
    }

    /**
     * Build filter for rating.
     * Starting from the selected rating, going up
     * till 5, each rating is pushed as one array
     * to signify an OR relationship between them.
     */
    if (rating) {
      for (let i = rating; i <= 5; i++) {
        ratingFilters.push("rating:" + i);
      }

      filters.push(ratingFilters);
    }

    this.setState({
      facetFilters: filters,
      page,
      q
    }, () => this.executeSearch());
  }

  executeSearch() {
    searchMovies(
      this.state.q,
      (this.state.page - 1),
      this.state.facetFilters,
      (error, content) => {
        if (error) {
          alert(`Oops, could not search!\nError: ${error.message}.`);
          return;
        }

        /**
         * If no facets were returned, then insert
         * the keys with empty values so that we can
         * render the title of the facet filters at least.
         */
        let facets = content.facets;
        if (!facets || Object.keys(facets).length === 0) {
          facets = {
            [FACET_GENRE]: {},
            [FACET_RATING]: {}
          }
        }

        this.setState({
          movies: content.hits,
          resultsCount: content.nbHits,
          pageCount: content.nbPages,
          page: (content.page + 1),
          hitsPerPage: content.hitsPerPage,
          facets: facets,
          isInitialLoad: false
        });
      }
    );
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
    this.setState({
      deletingMovieId: movieId
    });
    deleteMovieAPI(movieId, (error, response) => {
      if (error) {
        this.setState({
          deletingMovieId: ''
        });
        alert(`Could not delete the movie!\nError: ${error.message}.\nPlease try again.`);
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
      resultsCount: this.state.resultsCount - 1,
      deletingMovieId: ''
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
              <SearchBox />
              <MovieResults
                counters={{
                  resultsCount: this.state.resultsCount,
                  pageNumber: this.state.page,
                  hitsPerPage: this.state.hitsPerPage,
                }}
                movies={this.state.movies}
                isInitialLoad={this.state.isInitialLoad}
                deletingMovieId={this.state.deletingMovieId}
                deleteMovieCallback={(movieId) => this.deleteMovie(movieId)} />
              <Pagination
                currentPage={this.state.page}
                totalPageCount={this.state.pageCount} />
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
  page: PropTypes.number,
  q: PropTypes.string,
  onChangeGenre: PropTypes.func,
  onChangeRating: PropTypes.func,
  onChangePage: PropTypes.func,
  onChangeQ: PropTypes.func,
  onChangeUrlQueryParams: PropTypes.func
}

export default addUrlProps({ urlPropsQueryConfig })(Home);
