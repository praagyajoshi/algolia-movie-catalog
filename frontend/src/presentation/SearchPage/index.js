import React, { Component } from 'react';

class SearchPage extends Component {
  render() {
    return (
      <div className="home-page-container">
        <div className="home-page">
          {this.props.children}
        </div>
      </div>
    );
  }
}

export default SearchPage;
