import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import store from '../_redux';
import { ErrorBoundary } from '../_components';

import { LettersList } from 'src/letters/components/LettersList';
import { Notification } from 'src/notification/components/Notification';

/*
** In MULD-4 we implement popup window 
** and mechanism that open popup when close compose without saving
**
*/

const Application = () => (
  <ErrorBoundary>
    <Provider store={store}>
        <LettersList/>
        <Notification/>
    </Provider>
  </ErrorBoundary>
);

ReactDOM.render(<Application />, document.getElementById('app'));

