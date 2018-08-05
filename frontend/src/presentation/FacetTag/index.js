import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ClassNames from 'classnames';

import './style.css';

class FacetTag extends Component {
  onClick(e) {
    e.preventDefault();
    this.props.toggleSelectionCallback(this.props.name);
  }

  render() {
    let postfix = this.props.isRating ? ' and above' : '';

    const tagClassNames = ClassNames({
      'facet-tag': true,
      'is-active': this.props.isActive
    });

    return (
      <a className="facet-value-link">
        <div className={tagClassNames}>
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
  isRating: PropTypes.bool.isRequired,
  isActive: PropTypes.bool.isRequired,
  toggleSelectionCallback: PropTypes.func.isRequired
}

export default FacetTag;
