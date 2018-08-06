import React, { Component } from 'react';
import PropTypes from 'prop-types';

import FacetTagGroup from '../../presentation/FacetTagGroup'
import FacetTag from '../../presentation/FacetTag';

class GenreFacetGroup extends Component {
  toggleSelectionCallback(value) {
    this.props.toggleSelectionCallback(value, 'genre');
  }

  resetFilters() {
    this.props.resetFiltersCallback('genre');
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

        // TODO: sort by count for genre
        renderArray.push(
          <FacetTag
            key={tagElementKey}
            count={facetValues[key]}
            name={key}
            isRating={this.props.groupName.toLowerCase() === 'rating'}
            isActive={this.props.genreFacetActive.includes(key.toLowerCase())}
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

GenreFacetGroup.propTypes = {
  facetValues: PropTypes.object.isRequired,
  groupName: PropTypes.string.isRequired,
  toggleSelectionCallback: PropTypes.func.isRequired,
  resetFiltersCallback: PropTypes.func.isRequired,
  genreFacetActive: PropTypes.array
}

export default GenreFacetGroup;
