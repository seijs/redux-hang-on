import { Drop } from './opts/drop';
import { SetStatus } from './opts/setStatus';
import { Trigger } from './opts/trigger';
import { v4 } from 'uuid';
import { Save } from './opts/save';
import { TriggerOnly } from './opts/triggerOnly';
import { Wait } from './opts/wait';
import { Hook } from './opts/hook';

export function prepareOpts(config, store, system) {
  const processUid = v4();
  const trigger = Trigger(store, config, system, processUid);

  const setStatus = SetStatus(store, config, system, processUid);
  const save = Save(store, config, system, processUid);
  const triggerOnly = TriggerOnly(store, config, system, processUid);
  const drop = Drop(system, config);
  const state = store.getState();
  const getCurrentState = store.getState;
  const wait = Wait(store, config, system, processUid);
  const hook = Hook(store, config, system, processUid)
  return {
    dispatch: store.dispatch,
    uid: processUid,
    wait,
    hook, 
    trigger,
    triggerOnly,
    save,
    setStatus,
    drop,
    getCurrentState,
    state,
    customOpts: config.config.customOpts,
  };
}
