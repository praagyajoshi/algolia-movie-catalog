import React, { Component } from 'react';

import SearchBox from '../../presentation/SearchBox';
import Facets from '../Facets';
import MovieResults from '../MovieResults';

// TODO: get application ID and key from env file
var algoliaSearch = require('algoliasearch');
var searchClient = algoliaSearch('Q9082UFEFH', '999cbc167aea99acb23b92054ac46e2f');
var searchIndex = searchClient.initIndex('Movie');

class HomePage extends Component {

  constructor(props) {
    super(props);
    this.state = {
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

  render() {
    return (
      <div>
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
            movies={this.state.movies} />
        </section>
      </div>
    );
  }
}

export default HomePage;
