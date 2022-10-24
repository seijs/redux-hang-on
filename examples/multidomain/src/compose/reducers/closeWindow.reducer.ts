


export const closeWindowRecucer =  (state, payload) => {
    const newComposesArray = state.composeItems.filter(
      (c) => c.id !== payload.id
    );
    state.composeItems = [...newComposesArray];
    state.openedComposeId = null;
}
