import { SET_TUTORIAL_VIEWED } from 'constants/actionTypes';
import { buildStateFromLocalStorage } from 'util/object';

const initialState = {
  ...buildStateFromLocalStorage('TUTORIAL_VIEWED')
};

const REDUCERS = {
  [SET_TUTORIAL_VIEWED]: (state, action) => ({
    ...state,
    [action.meta.id]: action.payload
  })
};

export default function tutorials(state = initialState, action) {
  const handler = REDUCERS[action.type];
  return handler ? handler(state, action) : state;
}

// Private Selectors

/**
 * Fetches the view status of a given tutorial
 * @param {Object} state Scoped application state
 * @param {String} tutorial A tutorial id
 * @returns {Boolean} The view status
 */
export const getTutorialViewedStatus = (state, tutorial) =>
  state[tutorial] || false;
