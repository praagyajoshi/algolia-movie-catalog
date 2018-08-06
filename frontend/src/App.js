import React, { Component } from 'react';
import { hot } from 'react-hot-loader';

import history from './history';
import Home from './container/Home';

import './styles/main.css';

class App extends Component {
  componentDidMount() {
    // Force an update if the URL changes
    history.listen(() => this.forceUpdate());
  }

  render() {
    return (
      <Home />
    );
  }
}

export default hot(module)(App);
