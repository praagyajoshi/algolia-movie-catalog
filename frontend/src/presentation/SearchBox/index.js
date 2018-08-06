import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './style.css';

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
      <div className="field search-box-field">
        <div className="control has-icons-right">
          <input type="text"
            className="input is-medium"
            placeholder="Search for 'Jurassic Park' or 'Brad Pitt'"
            value={this.state.searchValue}
            onChange={(e) => this.handleChange(e)} />
          <span className="icon is-right">
            <i className="fas fa-search"></i>
          </span>
        </div>
      </div>
    );
  }
}

SearchBox.propTypes = {
  valueChangeCallback: PropTypes.func.isRequired
}

export default SearchBox;
