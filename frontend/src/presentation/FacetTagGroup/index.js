import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './style.css';

class FacetTagGroup extends Component {
  onResetClick(e) {
    e.preventDefault();
    this.props.resetFiltersCallback();
  }

  render() {
    return (
      <div className="field facet-field">
        <div className="header">
          <h4 className="title is-4">
            {this.props.groupName}
          </h4>
          <a
            className="button is-white is-small reset-filter-button"
            onClick={(e) => this.onResetClick(e)} >
            Reset
          </a>
        </div>
        <div className="control">
          {this.props.children}
        </div>
      </div>
    );
  }
}

FacetTagGroup.propTypes = {
  groupName: PropTypes.string.isRequired,
  resetFiltersCallback: PropTypes.func.isRequired
}

export default FacetTagGroup;
