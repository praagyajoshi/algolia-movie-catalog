import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { addUrlProps, UrlQueryParamTypes, UrlUpdateTypes } from 'react-url-query';

import FacetTagGroup from '../../presentation/FacetTagGroup';

// TODO: move to a constants file?
const urlPropsQueryConfig = {
  genre: { type: UrlQueryParamTypes.array, updateType: UrlUpdateTypes.pushIn },
  rating: { type: UrlQueryParamTypes.number, updateType: UrlUpdateTypes.pushIn }
}

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

  toggleSelectionCallback(value, facetType) {
    // TODO: introduce constants for checking type
    if (facetType.toLowerCase() === 'rating') {
      this.handleRatingFacetToggle(value);
    } else if (facetType.toLowerCase() === 'genre') {
      this.handleGenreFacetToggle(value);
    }
  }

  handleRatingFacetToggle(value) {
    const { rating, onChangeRating } = this.props;
    const ratingInteger = parseInt(value, 10);

    if (rating === ratingInteger) {
      onChangeRating(null);
    } else {
      onChangeRating(ratingInteger);
    }
  }

  handleGenreFacetToggle(value) {
    const lowercaseValue = value.toLowerCase();
    const { genre, onChangeGenre } = this.props;
    let newGenre;

    if (!genre) {
      newGenre = [];
    } else {
      newGenre = genre;
    }

    if (newGenre.includes(lowercaseValue)) {
      newGenre = newGenre.filter(genre => genre !== lowercaseValue);
    } else {
      newGenre = newGenre.concat(lowercaseValue);
    }

    onChangeGenre(newGenre);
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
            groupName={key}
            toggleSelectionCallback={(value, facetType) => this.toggleSelectionCallback(value, facetType)} />
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
  facets: PropTypes.object.isRequired,
  genre: PropTypes.array,
  rating: PropTypes.number,
  onChangeGenre: PropTypes.func,
  onChangeRating: PropTypes.func,
  onChangeUrlQueryParams: PropTypes.func
}

export default addUrlProps({ urlPropsQueryConfig })(Facets);
