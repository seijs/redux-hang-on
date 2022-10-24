import { combineReducers } from 'redux';
import { lettersSlice } from 'src/letters/letters.config';
import { settingsSlice } from 'src/settings/settings.config';

const rootReducer = combineReducers({
  ...lettersSlice.reducer,
  ...settingsSlice.reducer
});

export default rootReducer;
