import { getActionType } from '../../utils';

export function TriggerOnly(store, config, system, uid) {
  const canTrigger = config.config.canTrigger;

  return (actionType, actionStatus, actionArgs) => {
    const process = system.findProcessByUid(uid);
    if (process.length) {
      if (canTrigger && canTrigger.includes(actionType)) {
        const combynedType = getActionType(actionType, actionStatus);
        store.dispatch({
          type: combynedType,
          payload: actionArgs,
          sourceName: process[0].sourceName,
          opts: {
            noUpdate: true,
          },
        });
      } else {
        console.log(
          `WARNING!: ${config.trigger} can not trigger ${actionType}`
        );
      }
    }
  };
}
