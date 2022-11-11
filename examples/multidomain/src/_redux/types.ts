import { Store } from 'redux';
import { IComposeState, IComposeTriggers } from 'src/compose/compose.config';
import { ILettersState, ILettersTriggers } from 'src/letters/letters.config';
import { INotificationState, INotificationTriggers } from 'src/notification/notification.config';
import { IPopupState, IPopupTriggers } from 'src/popup/popup.config';
import { ISettingsState, ISettingsTriggers } from 'src/settings/settings.config';
import { IRecordState, IRecordTriggers } from 'src/_recorder/recorder.config';

export type IState = {
  letters: ILettersState
  settings: ISettingsState
  compose: IComposeState
  notification: INotificationState
  popup: IPopupState
  recorder: IRecordState
};

export type ITriggers =  IRecordTriggers & ILettersTriggers & ISettingsTriggers & IComposeTriggers & INotificationTriggers & IPopupTriggers;

