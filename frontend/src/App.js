import React, { Component } from 'react';
import { hot } from 'react-hot-loader';

import history from './history';
import HomePage from './container/HomePage';

import './App.css';

class App extends Component {
  componentDidMount() {
    // Force an update if the URL changes
    history.listen(() => this.forceUpdate());
  }

  render() {
    return (
      <HomePage />
    );
  }
}

export default hot(module)(App);
