import { MakeBiteReducerType } from "@seijs/redux-hang-on/lib/types";
import { IAppState, IAppTriggers } from "../app.config";

export const loadAppDone: MakeBiteReducerType<IAppTriggers, IAppState, 'loadApp'>['done'] = (state, payload) => {
  if (typeof state.app === 'number') {
    state.app += payload as number;
  } else {
    state.app = payload;
  }

  state.loading = false;
};
