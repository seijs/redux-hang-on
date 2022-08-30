import { makeProcMiddleware } from 'src/createMiddleware';
import { makeReducer } from 'src/createReducer';
import {
  MakeProcessorType,
  MakeReducerType,
} from 'src/types';

export function createSlice<IStore, Store, ITrigger>(args: {
  reducer: MakeReducerType<ITrigger, IStore>;
  processor: MakeProcessorType<ITrigger, Store>;
  initialState: IStore;
  sliceName: string;
}) {
  return {
    reducer: makeReducer(args.reducer, args.initialState),
    middleware: makeProcMiddleware(
      args.processor,
      args.reducer,
      args.sliceName
    ),
  };
}
