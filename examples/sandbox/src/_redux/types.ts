import { Store } from 'redux';
import { IAppState, IAppTriggers } from 'src/app/app.config';

export type IState = {
  app: IAppState;
};

export type ITriggers = IAppTriggers;

