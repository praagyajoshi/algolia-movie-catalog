import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ClassNames from 'classnames';

class ModalHolder extends Component {
  onCloseClick(e) {
    e.preventDefault();
    this.props.closeCallback();
  }

  render() {
    const modalClasses = ClassNames({
      'modal': true,
      'is-active': this.props.isActive
    });

    return (
      <div className={modalClasses}>
        <div className="modal-background" onClick={(e) => this.onCloseClick(e)}></div>
        <div className="modal-card">
          <header className="modal-card-head">
            <p className="modal-card-title">
              {this.props.title}
            </p>
            <button
              className="delete"
              aria-label="close"
              onClick={(e) => this.onCloseClick(e)}>
            </button>
          </header>

          <section className="modal-card-body">
            {this.props.children}
          </section>
        </div>
      </div>
    );
  }
}

ModalHolder.propTypes = {
  title: PropTypes.string.isRequired,
  isActive: PropTypes.bool.isRequired,
  closeCallback: PropTypes.func.isRequired
}

export default ModalHolder;
