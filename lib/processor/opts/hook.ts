import { getActionType } from '../../utils';

export function Hook(store, config, system, uid) {
  const canTrigger = config.config.canTrigger;

  return (actionType, actionStatusStart, actionStatusStop, startPAyload) => {

    const combynedTypeStart = getActionType(actionType, actionStatusStart);
    const combynedTypeStop = getActionType(actionType, actionStatusStop);
    
    setTimeout(()=> {
        store.dispatch({
            type: combynedTypeStart,
            payload: startPAyload,
        });
    }, 0)  
    return new Promise((resolve, reject)=> { 
        system.addWait(combynedTypeStop, {resolve, reject});
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