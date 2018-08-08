import React, { Component } from 'react';
import { hot } from 'react-hot-loader';
import Helmet from 'react-helmet';

import history from './utils/history';
import Home from './container/Home';

import './styles/main.css';

class App extends Component {
  componentDidMount() {
    // Force an update if the URL changes
    history.listen(() => this.forceUpdate());
  }

  render() {
    const siteTitle = 'Algolia Movie Catalog - Praagya';
    const siteDescription = 'Movie management made easy';

    return (
      <div className="app-container">
        <Helmet
          title={siteTitle}
          meta={[
            { name: 'description', content: 'siteDescription' },
            { property: 'og:title', content: siteTitle },
            { property: 'og:description', content: siteDescription },
          ]}
        />
        <Home />
      </div>
    );
  }
}

export default hot(module)(App);
