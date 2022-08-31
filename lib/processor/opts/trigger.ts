import { getActionType } from '../../utils';

export function Trigger(store, config) {
  const canTrigger = config.config.canTrigger;

  return (actionType, actionStatus, actionArgs) => {
    if (canTrigger && canTrigger.includes(actionType)) {
      const combynedType = getActionType(actionType, actionStatus);
      store.dispatch({
        type: combynedType,
        payload: actionArgs,
      });
    } else {
      console.log(`WARNING!: ${config.trigger} can not trigger ${actionType}`);
    }
  };
}
