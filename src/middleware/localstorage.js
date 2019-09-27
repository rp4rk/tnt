/**
 * Stores any action payload that has a 'store' property on the meta tag
 */
export const localstorage = store => dispatch => action => {
  if (!action.meta || !action.meta.store) {
    dispatch(action);
    return;
  }

  const key = action.meta.store.key || action.type;
  const pick = action.meta.store.pick;

  localStorage.setItem(key, pick ? action.payload[pick] : action.payload);
  dispatch(action);
};
