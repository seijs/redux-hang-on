import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import store from '../_redux';
import { ErrorBoundary } from '../_components';

import { LettersList } from 'src/letters/components/LettersList';
import { Notification } from 'src/notification/components/Notification';
import { Window } from 'src/popup/components/Window';

/*
** In MULD-4 we implement popup window 
** and mechanism that open popup when close compose without saving
** Works with wrong behavior - need to be fixed 
**
*/

/*
** In MULD-6 we implement different behavior when 
** one opens compose window via clik on letters list item 
** and on "Create New" button
*/


const Application = () => (
  <ErrorBoundary>
    <Provider store={store}>
        <LettersList/>
        <Notification/>
        <Window/>
    </Provider>
  </ErrorBoundary>
);

ReactDOM.render(<Application />, document.getElementById('app'));

