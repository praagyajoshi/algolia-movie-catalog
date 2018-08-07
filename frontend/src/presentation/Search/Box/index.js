import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { addUrlProps } from 'react-url-query';

import debounce from '../../../utils/debounce';

import { urlPropsQueryConfig } from '../../../dataProviders/urlState';

import './style.css';

class SearchBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchValue: ''
    };
    this.debouncedHandleCallback = debounce(this.handleCallback, 250);
  }

  componentDidMount() {
    if (this.props.q && this.props.q.length) {
      this.setState({
        searchValue: this.props.q
      });
    }
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
    this.props.onChangeQ(searchValue.trim());
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
  q: PropTypes.string,
  onChangeQ: PropTypes.func
}

export default addUrlProps({ urlPropsQueryConfig })(SearchBox);