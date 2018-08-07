import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ClassNames from 'classnames';

import { FACET_RATING } from '../../../constants/facets';

import './style.css';

class FacetTag extends Component {
  onTagClick(e) {
    e.preventDefault();
    this.props.toggleSelectionCallback(this.props.name);
  }

  render() {
    const isRating = (this.props.facetType === FACET_RATING);
    const postfix = isRating && (parseInt(this.props.name, 10) !== 5) ? ' and above' : '';

    const tagClassNames = ClassNames({
      'facet-tag': true,
      'is-active': this.props.isActive
    });

    return (
      <a className="facet-value-link" onClick={(e) => this.onTagClick(e)}>
        <div className={tagClassNames}>
          <div className="is-name">
            {this.props.name}&nbsp;
            {isRating && (<i className="fas fa-star star-rating"></i>)}
            {postfix}
          </div>
          <div className="is-count">{this.props.count}</div>
          <div className="icon active-icon">
            <i className="fas fa-check"></i>
          </div>
          <div className="icon remove-icon">
            <i className="fas fa-times"></i>
          </div>
        </div>
      </a>
    );
  }
}

FacetTag.propTypes = {
  name: PropTypes.string.isRequired,
  count: PropTypes.number.isRequired,
  facetType: PropTypes.string.isRequired,
  isActive: PropTypes.bool.isRequired,
  toggleSelectionCallback: PropTypes.func.isRequired
}

export default FacetTag;
