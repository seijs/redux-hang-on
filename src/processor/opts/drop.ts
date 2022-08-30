import { getActionType } from 'src/utils';

export function Drop(system, config) {
  const actionType = getActionType(config.trigger, config.config.triggerStatus);

  return () => {
    system.downProcess(actionType);
  };
}
