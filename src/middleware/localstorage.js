/**
 * Stores any action payload that has a 'store' property on the meta tag
 */
export const localstorage = store => dispatch => action => {
  // If we have no store meta, ignore the action
  if (!action.meta || !action.meta.store) {
    dispatch(action);
    return;
  }

  // Key is either specified, or we use the action type
  const key = action.meta.store.key || action.type;
  localStorage.setItem(key, action.payload);
  dispatch(action);
};
