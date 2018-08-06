import React, { Component } from 'react';
import PropTypes from 'prop-types';

import debounce from '../../utils/debounce';

import './style.css';

class SearchBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchValue: ''
    };
    this.debouncedHandleCallback = debounce(this.handleCallback, 250);
  }

  handleChange(event) {
    /**
     * Because of React'sevent pooling, we can't send the event to
     * the debounced function directly as it's properties might've
     * been erased.
     * So, we save the event's value in the local state, and then
     * call the debounced function with the state value.
     * More info: https://reactjs.org/docs/events.html#event-pooling
     */
    this.setState(
      {searchValue: event.target.value},
      () => this.debouncedHandleCallback(this.state.searchValue)
    );
  }

  handleCallback(searchValue) {
    this.props.valueChangeCallback(searchValue.trim());
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
