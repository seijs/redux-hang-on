

export const changeItemReducer = (state, payload) => {
    const foundItem = state.composeItems.find((i) => i.id === payload.id);
    console.log(`foundItem`)
    console.log(foundItem)
    if (foundItem) {
      Object.assign(foundItem, payload);
    }
  }