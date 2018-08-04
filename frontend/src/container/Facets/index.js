import React, { Component } from 'react';
import PropTypes from 'prop-types';

import FacetTagGroup from '../../presentation/FacetTagGroup';

import './style.css';

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

    // Split facets into their groups
    // and get the tags rendered
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
      <div className="facets container">
        {this.getFaceGroups()}
      </div>
    );
  }
}

Facets.propTypes = {
  facets: PropTypes.object.isRequired
}

export default Facets;
