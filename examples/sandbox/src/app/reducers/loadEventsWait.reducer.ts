import { MakeBiteReducerType } from "@seijs/redux-hang-on/lib/types";
import { IAppState, IAppTriggers } from "../app.config";

export const loadAppWait: MakeBiteReducerType<IAppTriggers, IAppState, 'loadApp'>['wait'] = (state, payload) => {
  state.loading = true;
};
