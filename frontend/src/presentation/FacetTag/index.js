import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './style.css';

class FacetTag extends Component {
  render() {
    let postfix = this.props.isRating ? ' and above' : '';

    return (
      <a className="facet-value-link">
        <div className="facet-tag">
          <div className="is-name">{this.props.name + postfix}</div>
          <div className="is-count">{this.props.count}</div>
        </div>
      </a>
    );
  }
}

FacetTag.propTypes = {
  name: PropTypes.string.isRequired,
  count: PropTypes.number.isRequired,
  isRating: PropTypes.bool.isRequired
}

export default FacetTag;
