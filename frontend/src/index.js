import React from 'react';
import ReactDOM from 'react-dom';
import { configureUrlQuery } from 'react-url-query';

import App from './App';
import history from './history';
import registerServiceWorker from './registerServiceWorker';

// Link the history used by our app with url-query.
configureUrlQuery({ history });

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
