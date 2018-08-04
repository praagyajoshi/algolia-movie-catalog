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
      <div className="container">
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
    );
  }
}

SearchBox.propTypes = {
  valueChangeCallback: PropTypes.func.isRequired
}

export default SearchBox;
