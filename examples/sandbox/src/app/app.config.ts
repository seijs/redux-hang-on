import { Bite, Slice } from '@seijs/redux-hang-on';
import { TriggerPhaseWrapper } from '@seijs/redux-hang-on/lib/types';
import { LoadApp } from './scripts/LoadApp.script';
import { loadAppDone } from './reducers/loadEventsDone.reducer';
import { loadAppWait } from './reducers/loadEventsWait.reducer';
import { IState, ITriggers } from 'src/_redux/types';

export interface IAppState {
  app: string | null | number;
  loading: boolean;
}

export interface IAppTriggers {
  setApp: {
    one: string;
    two: number;
  };
  loadApp: TriggerPhaseWrapper<{ // This type wrapper is needed when trigger (action type) has subtriggers 
    wait: {
      foo: string;
      bar: number;
    };
    done: string | number;
    fail: string;
  }>;
}

export const appInitialState: IAppState = {
  app: null,
  loading: true,
};

const loadAppBite = Bite<IAppTriggers, ITriggers, IAppState, IState, 'loadApp'>(
  {
    wait: loadAppWait,
    done: loadAppDone,
    fail: null, // since reducer is null - store will no be renewed
  },
  {
    updateOn: [{ loadApp: 'fail' }],
    canTrigger: [],
    instance: 'stable',
    script: LoadApp,
    triggerStatus: 'done',
  }
);


// NO reducer, No processor
const setAppBite = Bite<IAppTriggers, ITriggers, IAppState, IState, 'setApp'>(
  null,
  null
);

export const appSlice = Slice<IAppTriggers, ITriggers, IAppState, IState>(
  'app',
  {
    loadApp: loadAppBite,
    setApp: setAppBite,
  },
  appInitialState
);
