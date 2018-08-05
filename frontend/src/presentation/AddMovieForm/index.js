import React, { Component } from 'react';
import PropTypes from 'prop-types';

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
      rating: 0,
      alternativeTitles: '',
      imageFile: null,
      imageName: ''
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

  onSubmitClick(e) {
    e.preventDefault();

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

  render() {
    return (
      <form>
        <div className="field">
          <label className="label">Title</label>
          <div className="control">
            <input
              className="input"
              value={this.state.title}
              onChange={(e) => this.onValueChange(e)}
              name="title"
              type="text"
              placeholder="The Matrix" />
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
              type="text"
              placeholder="1996" />
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
              placeholder="Drama, suspense, comedy" />
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
            <label className="radio">
              <input
                type="radio"
                name="rating"
                value="1"
                onChange={(e) => this.onValueChange(e)}
                checked={this.state.rating === "1"}/>
              &nbsp;1
            </label>
            <label className="radio">
              <input
                type="radio"
                name="rating"
                value="2"
                onChange={(e) => this.onValueChange(e)}
                checked={this.state.rating === "2"}/>
              &nbsp;2
            </label>
            <label className="radio">
              <input
                type="radio"
                name="rating"
                value="3"
                onChange={(e) => this.onValueChange(e)}
                checked={this.state.rating === "3"}/>
              &nbsp;3
            </label>
            <label className="radio">
              <input
                type="radio"
                name="rating"
                value="4"
                onChange={(e) => this.onValueChange(e)}
                checked={this.state.rating === "4"}/>
              &nbsp;4
            </label>
            <label className="radio">
              <input
                type="radio"
                name="rating"
                value="5"
                onChange={(e) => this.onValueChange(e)}
                checked={this.state.rating === "5"}/>
              &nbsp;5
            </label>
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
