import React, { Component } from 'react';
import PropTypes from 'prop-types';

import FacetTagGroup from '../../presentation/FacetTagGroup'
import FacetTag from '../../presentation/FacetTag';

class RatingFacetGroup extends Component {
  toggleSelectionCallback(value) {
    this.props.toggleSelectionCallback(value, 'rating');
  }

  resetFilters() {
    this.props.resetFiltersCallback('rating');
  }

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

        const facetValue = parseInt(key, 10);
        const isActive = this.props.ratingFacetActive ?
          (facetValue === this.props.ratingFacetActive) : false;

        // TODO: sort alphabetically for rating
        // TODO: always make sure 3, 4, and 5+ are available?
        renderArray.push(
          <FacetTag
            key={tagElementKey}
            count={facetValues[key]}
            name={key}
            isRating={this.props.groupName.toLowerCase() === 'rating'}
            isActive={isActive}
            toggleSelectionCallback={(value) => this.toggleSelectionCallback(value)} />
        );
      }
    }

    return renderArray;
  }

  render() {
    // TODO: remove and replace with constant
    const groupName = this.props.groupName;
    // TODO: move to util function
    const capitalizedGroupName = groupName.charAt(0).toUpperCase() + groupName.slice(1);

    return (
      <FacetTagGroup
        groupName={capitalizedGroupName}
        resetFiltersCallback={() => this.resetFilters()}>
        {this.getTags()}
      </FacetTagGroup>
    );
  }
}

RatingFacetGroup.propTypes = {
  facetValues: PropTypes.object.isRequired,
  groupName: PropTypes.string.isRequired,
  toggleSelectionCallback: PropTypes.func.isRequired,
  resetFiltersCallback: PropTypes.func.isRequired,
  ratingFacetActive: PropTypes.number
}

export default RatingFacetGroup;
