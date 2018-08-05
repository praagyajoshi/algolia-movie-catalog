import React, { Component } from 'react';
import PropTypes from 'prop-types';

class FacetTagGroup extends Component {
  render() {
    return (
      <div className="field">
        <label className="label">{this.props.groupName}</label>
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
