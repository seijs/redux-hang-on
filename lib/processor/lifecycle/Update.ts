import { getTriggerAndStatus } from '../../utils';

function pickReducer(reducers: any, trigger: string, status: string): any {
  if (reducers[trigger]) {
    if (typeof reducers[trigger] === 'function') {
      return reducers[trigger].bind(this);
    } else if (typeof reducers[trigger][status] === 'function') {
      return reducers[trigger][status].bind(this);
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

  const reducer = pickReducer(reducers, trigger, status);
  let propagate = true;
  let keepUpdate = false;
  const stopPropagate = (args?: { keepUpdate: boolean }) => {
    keepUpdate = (args && args.keepUpdate) || false;
    propagate = false;
  };

  if (instance.update) {
    const { trigger, status } = getTriggerAndStatus(actionType);
    const updateArgs = {
      payload: actionPayload,
      trigger,
      status,
      hangOn: stopPropagate,
    };

    instance.update(updateArgs);
    if (!propagate && keepUpdate) {
      const stateCopy = { ...state };
      reducer(stateCopy[sliceName], actionPayload);
    }
  }

  return propagate;
}
