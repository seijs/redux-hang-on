class AsyncProcessor {}

export const createAsyncSlice = (api) => {
  const setWaitReducer = (state, payload) => {
    state.loading = true;
  };
  const setDoneReducer = (state, payload) => {
    (state.loading = false), (state.loaded = true);
    state.data = payload;
  };
  const setFailReducer = (state, payload) => {
    (state.loading = false), (state.loaded = false);
    state.error = payload;
  };

  return {
    reducer: {
      wait: setWaitReducer,
      done: setDoneReducer,
      fail: setFailReducer,
    },
    processorOpt: {
      opts: AsyncProcessor,
    },
  };
};
