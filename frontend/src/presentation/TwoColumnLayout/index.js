import React, { Component } from 'react';
import PropTypes from 'prop-types';

class TwoColumnLayout extends Component {
  render() {
    return (
      <section className="section">
        <div className="container home-container">
          <div className="columns">
            <div className="column is-one-quarter">
              {this.props.left}
            </div>
            <div className="column is-three-quarters">
              {this.props.right}
            </div>
          </div>
        </div>
      </section>
    );
  }
}

TwoColumnLayout.propTypes = {
  left: PropTypes.element.isRequired,
  right: PropTypes.element.isRequired
}

export default TwoColumnLayout;
