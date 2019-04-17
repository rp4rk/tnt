import { SET_REDMINE_ADDRESS, SET_REDMINE_KEY } from "../constants/actionTypes";

const initialState = {
  key: localStorage.getItem("redmineKey") || "",
  address: localStorage.getItem("redmineAddress") || ""
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
export const getRedmineKey = state => state.key;
export const getRedmineAddress = state => state.address;
