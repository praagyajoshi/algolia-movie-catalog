import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ClassNames from 'classnames';

import './style.css';

class AddMovieForm extends Component {
  constructor(props) {
    super(props);
    this.state = this.getInitialState();
  }

  getInitialState() {
    return {
      title: '',
      year: '',
      actors: '',
      genre: '',
      rating: '3',
      alternativeTitles: '',
      imageFile: null,
      imageName: '',
      wasFormValidated: false
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.clearState !== this.props.clearState &&
      nextProps.clearState) {
        this.setState(this.getInitialState());
    }
  }

  onValueChange(e) {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({[name]: value});
  }

  onImageAdded(e) {
    e.preventDefault();
    this.setState({
      imageFile: e.target.files[0],
      imageName: e.target.files[0].name
    });
  }

  validateForm() {
    const formLength = this.formElement.length;

    this.setState({
      wasFormValidated: true
    });

    /**
     * Using HTML5 form validation API for client
     * side validation.
     */
    if (this.formElement.checkValidity() === false) {
      /**
       * If the form didn't pass validation, look through
       * all the 'input' elements of the form and set an
       * error message for them.
       * The error message is also provided by the HTML5
       * validation API.
       */
      for (let i = 0; i < formLength; i++) {
        const element = this.formElement[i];
        if (element.nodeName.toLowerCase() !== 'input') {
          continue;
        }

        let parentElement = element.parentNode;

        /**
         * For radio buttons, we will have to go one level higher
         * to access the message element because of the radio
         * button's hierarchy.
         */
        if (element.type.toLowerCase() === 'radio') {
          parentElement = parentElement.parentNode;
        }

        const errorLabel = parentElement.querySelector('.help');
        if (errorLabel) {
          if (!element.validity.valid) {
            errorLabel.textContent = element.validationMessage;
          } else {
            errorLabel.textContent = '';
          }
        }
      }

      return false;
    } else {
      /**
       * If the form didn't passed validation, look through
       * all the 'input' elements of the form and clear the
       * error message for them.
       */
      for (let i = 0; i < formLength; i++) {
        const element = this.formElement[i];
        if (element.nodeName.toLowerCase() !== 'input') {
          continue;
        }

        let parentElement = element.parentNode;

        /**
         * For radio buttons, we will have to go one level higher
         * to access the message element because of the radio
         * button's hierarchy.
         */
        if (element.type.toLowerCase() === 'radio') {
          parentElement = parentElement.parentNode;
        }

        const errorLabel = parentElement.querySelector('.help');
        if (errorLabel) {
          errorLabel.textContent = '';
        }
      }

      return true;
    }
  }

  onSubmitClick(e) {
    e.preventDefault();

    if (!this.validateForm()) {
      return;
    }

    // TODO: move trim to the backend
    const actorsArray = this.state.actors.trim().split(/\s*,\s*/);
    const altTitlesArray = this.state.alternativeTitles.trim().split(/\s*,\s*/);
    const genreArray = this.state.genre.trim().split(/\s*,\s*/);

    const formData = {
      title: this.state.title,
      year: this.state.year,
      actors: actorsArray.join(','),
      genre: genreArray.join(','),
      rating: this.state.rating,
      alternative_titles: altTitlesArray.join(','),
      uploaded_image: this.state.imageFile
    };
    this.props.submitClickCallback(formData);
  }

  onCancelClick(e) {
    e.preventDefault();
    this.props.cancelClickCallback();
  }

  getRadioButtons() {
    return ['1', '2', '3', '4', '5'].map((rating) => {
      return (
        <label key={rating} className="radio">
          <input
            type="radio"
            name="rating"
            value={rating}
            required
            onChange={(e) => this.onValueChange(e)}
            checked={this.state.rating === rating} />
          &nbsp;{rating}
        </label>
      );
    });
  }

  render() {
    const formClasses = ClassNames({
      'add-movie-form': true,
      'was-validated': this.state.wasFormValidated
    });

    return (
      <form className={formClasses} ref={form => this.formElement = form} noValidate>
        <div className="field">
          <label className="label">Title</label>
          <div className="control">
            <input
              className="input"
              value={this.state.title}
              onChange={(e) => this.onValueChange(e)}
              name="title"
              type="text"
              required
              minLength="5"
              placeholder="The Matrix" />
            <p className="help is-danger"></p>
          </div>
        </div>

        <div className="field">
          <label className="label">Year</label>
          <div className="control">
            <input
              className="input"
              value={this.state.year}
              onChange={(e) => this.onValueChange(e)}
              name="year"
              type="number"
              required
              min="1906"
              max="2018"
              placeholder="1996" />
            <p className="help is-danger"></p>
          </div>
        </div>

        <div className="field">
          <label className="label">Actors</label>
          <div className="control">
            <input
              className="input"
              value={this.state.actors}
              onChange={(e) => this.onValueChange(e)}
              name="actors"
              type="text"
              placeholder="Anthony Hopkins, Meryl Streep" />
          </div>
        </div>

        <div className="field">
          <label className="label">Genre</label>
          <div className="control">
            <input
              className="input"
              value={this.state.genre}
              onChange={(e) => this.onValueChange(e)}
              name="genre"
              type="text"
              required
              minLength="5"
              placeholder="Drama, suspense, comedy" />
            <p className="help is-danger"></p>
          </div>
        </div>

        <div className="field">
          <label className="label">Alternative titles</label>
          <div className="control">
            <input
              className="input"
              value={this.state.alternativeTitles}
              onChange={(e) => this.onValueChange(e)}
              name="alternativeTitles"
              type="text"
              placeholder="The Young People Who Traverse Dimensions While Wearing Sunglasses" />
          </div>
        </div>

        <div className="field">
          <label className="label">Image</label>
          <div className="control">
            <div className="file has-name is-fullwidth">
              <label className="file-label">
                <input
                  className="file-input"
                  type="file"
                  name="image"
                  onChange={(e) => this.onImageAdded(e)} />
                <span className="file-cta">
                  <span className="file-label">
                    Choose a file…
                  </span>
                </span>
                <span className="file-name">
                  {this.state.imageName}
                </span>
              </label>
            </div>
          </div>
        </div>

        <div className="field">
          <label className="label">Rating</label>
          <div className="control">
            { this.getRadioButtons() }
            <p className="help is-danger"></p>
          </div>
        </div>

        <div className="field is-grouped">
          <div className="control">
            <button
              className="button is-warning"
              onClick={(e) => this.onSubmitClick(e)}>
              Submit
            </button>
          </div>
          <div className="control">
            <button
              className="button"
              onClick={(e) => this.onCancelClick(e)}>
              Cancel
            </button>
          </div>
        </div>
      </form>
    );
  }
}

AddMovieForm.propTypes = {
  submitClickCallback: PropTypes.func.isRequired,
  cancelClickCallback: PropTypes.func.isRequired
}

export default AddMovieForm;
