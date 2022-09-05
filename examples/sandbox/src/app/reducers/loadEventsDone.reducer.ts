
export const loadAppDone = (state, payload) => {
  if (typeof state.app === 'number') {
    state.app += payload as number;
  } else {
    state.app = payload;
  }

  state.loading = false;
};
