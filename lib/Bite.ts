import { MakeBiteProcessorType, MakeBiteReducerType } from './types';

export const Bite = <ITrigger, IRootTrigger, IState, K extends keyof ITrigger>(
  reducer: MakeBiteReducerType<ITrigger, IState, K>,
  processor: MakeBiteProcessorType<ITrigger, IRootTrigger, IState, K>
) => ({ reducer, processor });
