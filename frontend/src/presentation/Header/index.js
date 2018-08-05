import React, { Component } from 'react';

class Header extends Component {
  render() {
    return (
      <section className="hero is-medium is-bold is-link">
        <div className="hero-head">

          <nav className="navbar">
            <div className="container">
              <div className="navbar-brand">
                <a href="/" className="navbar-item">
                  <h3 className="title is-3">
                    Movie Laundry
                  </h3>
                </a>

                <a role="button" className="navbar-burger" aria-label="menu" aria-expanded="false">
                  <span aria-hidden="true"></span>
                  <span aria-hidden="true"></span>
                  <span aria-hidden="true"></span>
                </a>
              </div>

              <div className="navbar-menu">
                <div className="navbar-end">
                  <span className="navbar-item">
                    {this.props.children}
                  </span>
                </div>
              </div>
            </div>
          </nav>

        </div>

        <div className="hero-body">
        </div>
      </section>
    );
  }
}

export default Header;
