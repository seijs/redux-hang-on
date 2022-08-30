import { System } from '../System';
import { v4 } from 'uuid';

type Modes = 'stable' | 'refreshing' | 'multiple';

export function createProcessorInstance(
  system: System,
  config: any,
  opt: any,
  actionType: string
) {
  const mode: Modes = config.instance;
  switch (mode) {
    case 'stable':
      return stableMode(system, config, opt, actionType);
    case 'refreshing':
      return refreshingMode(system, config, opt, actionType);
    case 'multiple':
      return multipleMode(system, config, opt, actionType);
    default:
      throw Error('Unknown instantiating mode');
  }
}

function multipleMode(system, config, opt, actionType) {
  const processor = config.saga;
  const newInstance = new processor(opt);
  const processUid = v4();
  system.upProcess(newInstance, actionType, processUid);

  return newInstance;
}

function stableMode(system, config, opt, actionType) {
  const processor = config.saga;
  const found = system.findProcess(actionType);
  if (found.length) {
    return found[0];
  }
  const newInstance = new processor(opt);
  system.upProcess(newInstance, actionType);

  return newInstance;
}

function refreshingMode(system, config, opt, actionType) {
  const processor = config.saga;
  const found = system.findProcess(actionType);
  if (found) {
    system.downProcess(actionType);
  }
  const newInstance = new processor(opt);
  system.upProcess(newInstance, actionType);

  return newInstance;
}
