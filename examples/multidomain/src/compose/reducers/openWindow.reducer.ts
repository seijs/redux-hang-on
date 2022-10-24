


const openWindowReducer  = (state, payload) => {
    if (payload.id !== null) {
      const id = `${Math.random()}`;
      const newComposeItem = {
        id,
        subject: '',
        touched: null,
      };
      state.composeItems = [newComposeItem, ...state.composeItems];
      state.openedComposeId = id;
    } else {
      state.openedComposeId = payload.id;
    }
  }