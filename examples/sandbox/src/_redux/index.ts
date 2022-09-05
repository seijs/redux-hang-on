import { createStore, applyMiddleware, compose, Middleware } from 'redux';
import { appSlice } from 'src/app/app.config';
import rootReducer from './reducer';

function configureStore() {
  const middlewares: Middleware[] = [appSlice.middleware];

  const store = createStore(
    rootReducer,
    compose(applyMiddleware(...middlewares))
  );

  return store;
}

const store = configureStore();

export const dispatch = store.dispatch;
export default store;
