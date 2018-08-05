import React, { Component } from 'react';
import PropTypes from 'prop-types';

class AddMovieButton extends Component {
  onClick(e) {
    e.preventDefault();
    this.props.onClickCallback();
  }

  render() {
    return (
      <section className="section">
        <div className="container">
          <a className="button is-warning is-active"
            onClick={(e) => this.onClick(e)}>
            + Add movie
          </a>
        </div>
      </section>
    );
  }
}

AddMovieButton.propTypes = {
  onClickCallback: PropTypes.func.isRequired
}

export default AddMovieButton;
