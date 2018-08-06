import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ClassNames from 'classnames';

import './style.css';

class FacetTag extends Component {
  onTagClick(e) {
    e.preventDefault();
    this.props.toggleSelectionCallback(this.props.name);
  }

  render() {
    const postfix = this.props.isRating ? ' and above' : '';

    const tagClassNames = ClassNames({
      'facet-tag': true,
      'is-active': this.props.isActive
    });

    return (
      <a className="facet-value-link" onClick={(e) => this.onTagClick(e)}>
        <div className={tagClassNames}>
          <div className="is-name">
            {this.props.name}&nbsp;
            {this.props.isRating && (<i className="fas fa-star star-rating"></i>)}
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
  isRating: PropTypes.bool.isRequired,
  isActive: PropTypes.bool.isRequired,
  toggleSelectionCallback: PropTypes.func.isRequired
}

export default FacetTag;
