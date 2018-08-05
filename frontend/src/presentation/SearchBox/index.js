import React, { Component } from 'react';
import PropTypes from 'prop-types';

class SearchBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchValue: ''
    };
  }

  handleChange(event) {
    // TODO: trim value
    this.setState({searchValue: event.target.value});
    this.props.valueChangeCallback(event.target.value);
  }

  render() {
    return (
      <section className="hero is-bold is-warning">
        <div className="hero-body">
          <div className="container">
            <h1 className="title">Movie Laundry</h1>
            <h2 className="subtitle">There are not the movies you're looking for</h2>
            <div className="field">
              <div className="control">
                <input type="text"
                  className="input is-large"
                  placeholder="Search for 'Jurassic Park' or 'Brad Pitt'"
                  value={this.state.searchValue}
                  onChange={(e) => this.handleChange(e)} />
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

SearchBox.propTypes = {
  valueChangeCallback: PropTypes.func.isRequired
}

export default SearchBox;
