/*
 ** Callback is processor's updatePreflight function
 ** accespts nextStore
 */

import { getTriggerAndStatus } from '../../utils';

interface Args {
  config: any;
  reducers: unknown;
  cb: Function;
  state: any;
  status: string;
  trigger: string;
  action: any;
}

function pickReducer(reducers: any, trigger: string, status: string): any {
  if (reducers[trigger]) {
    if (typeof reducers[trigger] === 'function') {
      return reducers[trigger];
    } else if (typeof reducers[trigger][status] === 'function') {
      return reducers[trigger][status];
    }
  }
}

export function BeforeUpdate(
  instance,
  state,
  actionType,
  actionPayload,
  reducers,
  sliceName
) {
  const { trigger, status } = getTriggerAndStatus(actionType);
  const stateCopy = { ...state };
  const reducer = pickReducer(reducers, trigger, status);
  let propagate = true;
  const stopPropagate = () => {
    propagate = false;
  };
  reducer(stateCopy[sliceName], actionPayload);
  if (instance.update) {
    const { trigger, status } = getTriggerAndStatus(actionType);
    const updateArgs = {
      nextState: stateCopy,
      payload: actionPayload,
      trigger,
      status,
      stop: stopPropagate,
    };

    instance.update(updateArgs, stopPropagate);
  }

  return propagate;
}
