import React, { Component } from 'react';

import './style.css';

class Header extends Component {
  render() {
    return (
      <section className="hero hero-header">

        <div className="hero-body">
          <div className="header-content container">
            <div className="columns">
              <div className="column is-half">
                <a href="/">
                  <h3 className="title is-3">
                    <i className="fas fa-film"></i>
                    &nbsp;
                    Movie Laundry
                  </h3>
                </a>
              </div>
              <div className="column">
                {this.props.children}
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default Header;
