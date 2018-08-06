import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './style.css';

class TwoColumnLayout extends Component {
  render() {
    return (
      <section className="section two-column-layout">
        <div className="container">
          <div className="columns">
            <div className="column is-one-quarter is-hidden-mobile">
              {this.props.left}
            </div>
            <div className="column is-three-quarters">
              <div className="right-column-container">
                {this.props.right}
              </div>
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
