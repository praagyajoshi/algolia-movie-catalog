import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './style.css';

class SearchResults extends Component {
  getCounters() {
    const counters = this.props.counters;
    const resultsCount = counters.resultsCount;
    var endNumber = counters.hitsPerPage * (counters.pageNumber + 1);
    const startNumber = endNumber - (counters.hitsPerPage - 1);

    if (endNumber > resultsCount) {
      endNumber = resultsCount;
    }

    return (
      <div className="search-results-counters">
        Showing <strong>{startNumber} to {endNumber}</strong> out of {resultsCount}
      </div>
    );
  }

  render() {
    return (
      <div className="field">
        <div className="control movie-results">
          <div>
            {this.props.showCounters && this.getCounters()}
          </div>
          <div>
            {this.props.children}
          </div>
        </div>
      </div>
    );
  }
}

SearchResults.propTypes = {
  showCounters: PropTypes.bool.isRequired,
  counters: PropTypes.object.isRequired
};

export default SearchResults;
