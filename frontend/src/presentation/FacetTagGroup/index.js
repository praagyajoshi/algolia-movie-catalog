import React, { Component } from 'react';
import PropTypes from 'prop-types';

import FacetTag from '../FacetTag';

class FacetTagGroup extends Component {
  getTags() {
    const facetValues = this.props.facetValues;
    var renderArray = [];

    /**
     * Looping through the facetValues individually
     * where 'key' is the facet value and 'value' is
     * the count of available results for that facet.
     */
    for (var key in facetValues) {
      if (facetValues.hasOwnProperty(key)) {
        const tagElementKey = key + ':' + facetValues[key];
        // TODO: sort alphabetically for rating
        // TODO: sort by count for genre
        renderArray.push(
          <FacetTag
            key={tagElementKey}
            count={facetValues[key]}
            name={key}
            isRating={this.props.groupName.toLowerCase() === 'rating'} />
        );
      }
    }

    return renderArray;
  }

  render() {
    const groupName = this.props.groupName;
    // TODO: move to util function
    const capitalizedGroupName = groupName.charAt(0).toUpperCase() + groupName.slice(1);

    return (
      <div className="field">
        <label className="label">{capitalizedGroupName}</label>
        <div className="control">
          {/* <div className="field is-grouped is-grouped-multiline"> */}
            {this.getTags()}
          {/* </div> */}
        </div>
      </div>
    );
  }
}

FacetTagGroup.propTypes = {
  facetValues: PropTypes.object.isRequired,
  groupName: PropTypes.string.isRequired
}

export default FacetTagGroup;
