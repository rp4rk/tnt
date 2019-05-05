import { SET_REDMINE_ADDRESS, SET_REDMINE_KEY } from '../constants/actionTypes';

const initialState = {
  key: localStorage.getItem('redmineKey') || '',
  address: localStorage.getItem('redmineAddress') || ''
};

const REDUCERS = {
  [SET_REDMINE_KEY]: (state, action) => ({
    ...state,
    key: action.payload
  }),
  [SET_REDMINE_ADDRESS]: (state, action) => ({
    ...state,
    address: action.payload
  })
};

export default function redmine(state = initialState, action) {
  const handler = REDUCERS[action.type];
  return handler ? handler(state, action) : state;
}

// Private selectors
/**
 * Get the current API key for redmine
 * @param {Object} state Scoped state
 * @returns {String} The API key
 */
export const getRedmineKey = state => state.key;

/**
 * Get the current address for the redmine instance
 * @param {Object} state Scoped state
 * @returns {String} The address for redmine
 */
export const getRedmineAddress = state => state.address;
