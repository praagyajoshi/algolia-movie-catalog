import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './style.css';

class ModalBodyNotification extends Component {
  render() {
    return (
      <div className="modal-notification-container">
        <div className="notification is-warning">
          {this.props.message}
        </div>
      </div>
    );
  }
}

ModalBodyNotification.propTypes = {
  message: PropTypes.string.isRequired
}

export default ModalBodyNotification;
