import React, { Component } from 'react';
import { hot } from 'react-hot-loader';

import HomePage from './container/HomePage';

import './App.css';

class App extends Component {
  render() {
    return (
      <HomePage />
    );
  }
}

export default hot(module)(App);
