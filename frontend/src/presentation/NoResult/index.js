import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './style.css';

class NoResult extends Component {
  render() {
    return (
      <div className="notification no-result has-text-centered">
        <div className="message">
          {this.props.message}
        </div>
        {this.props.emoji && <div className="emoji">
          {this.props.emoji}
        </div>}
      </div>
    );
  }
}

NoResult.propTypes = {
  message: PropTypes.string.isRequired,
  emoji: PropTypes.string
};

export default NoResult;
