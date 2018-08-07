import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { FACET_GENRE, FACET_RATING } from '../../../constants/facets';

import { capitaliseWord } from '../../../utils/string';

import FacetTag from '../../../presentation/Facets/Tag';
import FacetTagGroup from '../../../presentation/Facets/TagGroup'

class FacetGroup extends Component {
  toggleSelectionCallback(value) {
    this.props.toggleSelectionCallback(value, this.props.facetType);
  }

  resetFilters() {
    this.props.resetFiltersCallback(this.props.facetType);
  }

  getTags() {
    const { facetValues, facetType } = this.props;
    var renderArray = [];

    /**
     * Looping through the facetValues individually
     * where 'key' is the facet value and 'value' is
     * the count of available results for that facet.
     */
    for (var key in facetValues) {
      if (facetValues.hasOwnProperty(key)) {
        const tagElementKey = key + ':' + facetValues[key];
        let isActive = false;

        if (facetType === FACET_RATING) {
          const facetValue = parseInt(key, 10);
          const activeFacetValue = this.props.facetsActive && this.props.facetsActive[0] ? this.props.facetsActive[0] : null;
          isActive = (facetValue === activeFacetValue);
        } else if (facetType === FACET_GENRE) {
          isActive = this.props.facetsActive.includes(key.toLowerCase());
        }

        renderArray.push(
          <FacetTag
            key={tagElementKey}
            count={facetValues[key]}
            name={key}
            facetType={facetType}
            isActive={isActive}
            toggleSelectionCallback={(value) => this.toggleSelectionCallback(value)} />
        );
      }
    }

    return renderArray;
  }

  render() {
    const groupName = capitaliseWord(this.props.facetType);

    return (
      <FacetTagGroup
        groupName={groupName}
        resetFiltersCallback={() => this.resetFilters()}>
        {this.getTags()}
      </FacetTagGroup>
    );
  }
}

FacetGroup.propTypes = {
  facetValues: PropTypes.object.isRequired,
  facetType: PropTypes.string.isRequired,
  toggleSelectionCallback: PropTypes.func.isRequired,
  resetFiltersCallback: PropTypes.func.isRequired,
  facetsActive: PropTypes.array.isRequired
}

export default FacetGroup;
