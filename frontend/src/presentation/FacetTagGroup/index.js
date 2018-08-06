import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './style.css';

class FacetTagGroup extends Component {
  render() {
    return (
      <div className="field facet-field">
        <label className="label">
          <h4 className="title is-4">
            {this.props.groupName}
          </h4>
        </label>
        <div className="control">
          {this.props.children}
        </div>
      </div>
    );
  }
}

FacetTagGroup.propTypes = {
  groupName: PropTypes.string.isRequired
}

export default FacetTagGroup;
