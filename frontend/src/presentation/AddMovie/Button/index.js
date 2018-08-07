import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './style.css';

class AddMovieButton extends Component {
  onClick(e) {
    e.preventDefault();
    this.props.onClickCallback();
  }

  render() {
    return (
      <a className="button add-movie-button is-warning is-active"
        onClick={(e) => this.onClick(e)}>
        + Add a movie
      </a>
    );
  }
}

AddMovieButton.propTypes = {
  onClickCallback: PropTypes.func.isRequired
}

export default AddMovieButton;
