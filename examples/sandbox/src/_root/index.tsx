import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import store from '../_redux';
import { ErrorBoundary } from '../_components';


import { App } from 'src/app/components/App';

const Application = () => (
  <ErrorBoundary>
    <Provider store={store}>
        <App />
    </Provider>
  </ErrorBoundary>
);

ReactDOM.render(<Application />, document.getElementById('app'));
