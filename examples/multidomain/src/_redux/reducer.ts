import { combineReducers } from 'redux';
import { composeSlice } from 'src/compose/compose.config';
import { lettersSlice } from 'src/letters/letters.config';
import { settingsSlice } from 'src/settings/settings.config';

const rootReducer = combineReducers({
  ...lettersSlice.reducer,
  ...settingsSlice.reducer,
  ...composeSlice.reducer
});

export default rootReducer;
