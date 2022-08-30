import { getActionType } from 'src/utils';

export function SetStatus(store, config) {
  return (status, args) => {
    store.dispatch({
      type: getActionType(config.trigger, status),
      payload: args,
    });
  };
}
