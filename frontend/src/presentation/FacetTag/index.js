import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './style.css';

class FacetTag extends Component {
  render() {
    return (
      <div className="facet-tag control">
        <div className="tags has-addons">
          <a className="tag is-link">{this.props.name}</a>
          <a className="tag is-count">{this.props.count}</a>
        </div>
      </div>
    );
  }
}

FacetTag.propTypes = {
  name: PropTypes.string.isRequired,
  count: PropTypes.number.isRequired
}

export default FacetTag;
