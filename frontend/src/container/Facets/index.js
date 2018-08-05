import React, { Component } from 'react';
import PropTypes from 'prop-types';

import FacetTagGroup from '../../presentation/FacetTagGroup';

class Facets extends Component {
  constructor(props) {
    super(props);
    this.state = {
      facets: {}
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      facets: nextProps.facets
    });
  }

  getFaceGroups() {
    const facets = this.state.facets;
    var renderArray = [];

    /**
     * Rendering groups of facets individually
     * Facets are in the format:
     * {
     *   facet_name_1 : {facet_value_1 : count_1, facet_value_2 : count_2},
     *   facet_name_2 : {facet_value_1 : count_1, facet_value_2 : count_2},
     * }
     * Key will be the name of the facet, and it's value
     * with be an an object with a list of facet values
     * and their count in a key value pair.
     */
    for (var key in facets) {
      if (facets.hasOwnProperty(key)) {
        renderArray.push(
          <FacetTagGroup
            key={key}
            facetValues={facets[key]}
            groupName={key} />
        );
      }
    }

    return renderArray;
  }

  render() {
    return (
      <div className="facets">
        {this.getFaceGroups()}
      </div>
    );
  }
}

Facets.propTypes = {
  facets: PropTypes.object.isRequired
}

export default Facets;
