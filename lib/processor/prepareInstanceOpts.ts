import { Drop } from './opts/drop';
import { SetStatus } from './opts/setStatus';
import { Trigger } from './opts/trigger';

export function prepareOpts(config, store, system) {
  const trigger = Trigger(store, config);
  const setStatus = SetStatus(store, config);
  const drop = Drop(system, config);
  const state = store.getState();
  const getCurrentState = store.getState;

  return {
    trigger,
    setStatus,
    drop,
    getCurrentState,
    state,
    customOpts: config.customOpts,
  };
}
