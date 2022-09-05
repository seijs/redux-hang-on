import { combineReducers } from 'redux';
import { appSlice } from 'src/app/app.config';

const rootReducer = combineReducers({
  ...appSlice.reducer,
});

export default rootReducer;
