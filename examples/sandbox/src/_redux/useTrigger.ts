import { useDispatch } from 'react-redux';
import { ITriggers } from './types';
import { DispatcherType } from '@seijs/redux-hang-on/lib/types';

export const useTrigger = () => {
  const trigger = useDispatch() as DispatcherType<ITriggers>;

  return trigger;
};
