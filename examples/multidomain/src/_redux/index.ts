import { createStore, applyMiddleware, compose, Middleware } from 'redux';
import { composeSlice } from 'src/compose/compose.config';
import { lettersSlice } from 'src/letters/letters.config';
import { settingsSlice } from 'src/settings/settings.config';
import rootReducer from './reducer';

function configureStore() {
  const middlewares: Middleware[] = [lettersSlice.middleware, settingsSlice.middleware, composeSlice.middleware];

  const store = createStore(
    rootReducer,
    compose(applyMiddleware(...middlewares))
  );

  return store;
}

const store = configureStore();

export const dispatch = store.dispatch;
export default store;
