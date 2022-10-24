import { Store } from 'redux';
import { IComposeState, IComposeTriggers } from 'src/compose/compose.config';
import { ILettersState, ILettersTriggers } from 'src/letters/letters.config';
import { ISettingsState, ISettingsTriggers } from 'src/settings/settings.config';

export type IState = {
  letters: ILettersState
  settings: ISettingsState
  compose: IComposeState
};

export type ITriggers =  ILettersTriggers & ISettingsTriggers & IComposeTriggers;

