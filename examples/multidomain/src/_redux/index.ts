import { createStore, applyMiddleware, compose, Middleware } from 'redux';
import { composeSlice } from 'src/compose/compose.config';
import { lettersSlice } from 'src/letters/letters.config';
import { notificationSlice } from 'src/notification/notification.config';
import { popupSlice } from 'src/popup/popup.config';
import { settingsSlice } from 'src/settings/settings.config';
import { recorderSlice } from 'src/_recorder/recorder.config';
import rootReducer from './reducer';

function configureStore() {
  const middlewares: Middleware[] = [
  lettersSlice.middleware, 
  settingsSlice.middleware,
  composeSlice.middleware,
  notificationSlice.middleware, 
  popupSlice.middleware,
  recorderSlice.middleware
  ];

  const store = createStore(
    rootReducer,
    compose(applyMiddleware(...middlewares))
  );

  return store;
}

const store = configureStore();

export const dispatch = store.dispatch;
export default store;
