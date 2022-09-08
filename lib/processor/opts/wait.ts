import { getActionType } from '../../utils';

export function Wait(store, config, system, uid) {
  const canTrigger = config.config.canTrigger;

  return (actionType, actionStatus) => {

    const combynedType = getActionType(actionType, actionStatus);
    return new Promise((resolve, reject)=> { 
        system.addWait(combynedType, {resolve, reject});
    })

    // inside Update checkfor waits; and resolve them

    // const process = system.findProcessByUid(uid);
    // if (process.length) {
    //   if (canTrigger && canTrigger.includes(actionType)) {
    //     const combynedType = getActionType(actionType, actionStatus);
    //     store.dispatch({
    //       type: combynedType,
    //       payload: actionArgs,
    //     });
    //   } else {
    //     console.log(
    //       `WARNING!: ${config.trigger} can not trigger ${actionType}`
    //     );
    //   }
    // }
  };
}
