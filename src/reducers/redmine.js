import {
  SET_REDMINE_ADDRESS,
  SET_REDMINE_KEY,
  GET_USER_START,
  GET_USER_FAILURE,
  GET_USER_SUCCESS
} from 'constants/actionTypes';

const initialState = {
  key: localStorage.getItem('redmineKey') || '',
  address: localStorage.getItem('redmineAddress') || '',
  userId: localStorage.getItem('userId') || null,
  loading: false
};

const REDUCERS = {
  [SET_REDMINE_KEY]: (state, action) => ({
    ...state,
    key: action.payload
  }),
  [SET_REDMINE_ADDRESS]: (state, action) => ({
    ...state,
    address: action.payload
  }),
  [GET_USER_START]: (state, action) => ({
    ...state,
    loading: action.payload.loading,
    error: action.error
  }),
  [GET_USER_SUCCESS]: (state, action) => ({
    ...state,
    loading: action.payload.loading,
    userId: action.payload.userId
  }),
  [GET_USER_FAILURE]: (state, action) => ({
    ...state,
    loading: action.payload.loading,
    userId: null,
    error: action.error
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

/**
 * Get the current user id, used to query for entries
 * @param {Object} state Scoped state
 * @returns {String} The currently logged in user
 */
export const getRedmineUserId = state => state.address;
