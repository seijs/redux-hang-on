import { combineReducers } from 'redux';
import { composeSlice } from 'src/compose/compose.config';
import { lettersSlice } from 'src/letters/letters.config';
import { notificationSlice } from 'src/notification/notification.config';
import { popupSlice } from 'src/popup/popup.config';
import { settingsSlice } from 'src/settings/settings.config';
import { recorderSlice } from 'src/_recorder/recorder.config';

const rootReducer = combineReducers({
  ...lettersSlice.reducer,
  ...settingsSlice.reducer,
  ...composeSlice.reducer,
  ...notificationSlice.reducer,
  ...popupSlice.reducer,
  ...recorderSlice.reducer,
});

export default rootReducer;
