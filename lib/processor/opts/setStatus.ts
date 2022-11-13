import { getActionType } from '../../utils';

export function SetStatus(store, config, system, uid) {
  return (status, args) => {
    const process = system.findProcessByUid(uid);
    if (process.length) {
      store.dispatch({
        sourceName: process[0].sourceName,
        type: getActionType(config.trigger, status),
        payload: args,
      });
    }
  };
}
