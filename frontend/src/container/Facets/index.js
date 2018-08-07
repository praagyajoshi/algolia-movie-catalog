import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { addUrlProps, UrlQueryParamTypes, UrlUpdateTypes } from 'react-url-query';

import { FACET_GENRE, FACET_RATING } from '../../constants/facets';

import FacetGroup from './FacetGroup';

// TODO: move to a constants file?
const urlPropsQueryConfig = {
  genre: { type: UrlQueryParamTypes.array, updateType: UrlUpdateTypes.pushIn },
  rating: { type: UrlQueryParamTypes.number, updateType: UrlUpdateTypes.pushIn }
}

class Facets extends Component {
  constructor(props) {
    super(props);
    this.state = {
      facets: {},
      ratingFacetActive: this.props.rating ? this.props.rating : null,
      genreFacetActive: this.props.genre ? this.props.genre : []
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      facets: nextProps.facets,
      ratingFacetActive: nextProps.rating ? nextProps.rating : null,
      genreFacetActive: nextProps.genre ? nextProps.genre : []
    });
  }

  toggleSelectionCallback(value, facetType) {
    if (facetType === FACET_RATING) {
      this.handleRatingFacetToggle(value);
    } else if (facetType === FACET_GENRE) {
      this.handleGenreFacetToggle(value);
    }
  }

  resetFilters(facetType) {
    const { onChangeGenre, onChangeRating } = this.props;

    if (facetType === FACET_RATING) {
      onChangeRating(null);
    } else if (facetType === FACET_GENRE) {
      onChangeGenre(null);
    }
  }

  handleRatingFacetToggle(value) {
    const { rating, onChangeRating } = this.props;
    const ratingInteger = parseInt(value, 10);

    if (rating === ratingInteger) {
      /**
       * If the same rating was clicked again, then we need
       * to remove it as the rating filter.
       */
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
      /**
       * If the same genre was clicked again, then we need
       * to remove it from the list of genre filterss.
       */
      newGenre = newGenre.filter(genre => genre !== lowercaseValue);
    } else {
      newGenre = newGenre.concat(lowercaseValue);
    }

    onChangeGenre(newGenre);
  }

  getFacetGroups() {
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
        if (key === FACET_RATING) {
          /**
           * While the rating is a number, as opposed to an array for genre,
           * we are passing it as an array to maintain uniformity for the
           * FacetGroup component.
           */
          renderArray.push(
            <FacetGroup
              key={key}
              facetValues={facets[key]}
              facetType={FACET_RATING}
              toggleSelectionCallback={(value, facetType) => this.toggleSelectionCallback(value, facetType)}
              resetFiltersCallback={(facetType) => this.resetFilters(facetType)}
              facetsActive={this.state.ratingFacetActive ? [this.state.ratingFacetActive] : []} />
          );
        } else if (key === FACET_GENRE) {
          renderArray.push(
            <FacetGroup
              key={key}
              facetValues={facets[key]}
              facetType={FACET_GENRE}
              toggleSelectionCallback={(value, facetType) => this.toggleSelectionCallback(value, facetType)}
              resetFiltersCallback={(facetType) => this.resetFilters(facetType)}
              facetsActive={this.state.genreFacetActive} />
          );
        }
      }
    }

    return renderArray;
  }

  render() {
    return (
      <div className="facets">
        {this.getFacetGroups()}
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
