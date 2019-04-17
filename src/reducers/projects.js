import {
  GET_PROJECTS_START,
  GET_PROJECTS_SUCCESS,
  GET_PROJECTS_FAILURE
} from "../constants/actionTypes";

const initialState = {
  loading: true,
  projects: {}
};

const REDUCERS = {
  [GET_PROJECTS_START]: (state, action) => ({}),
  [GET_PROJECTS_SUCCESS]: (state, action) => ({}),
  [GET_PROJECTS_FAILURE]: (state, action) => ({})
};

export default function projects(state = initialState, action) {
  const handler = REDUCERS[action.type];
  return handler ? handler(state, action) : state;
}

// Private selectors
export const getProjects = state => Object.values(state.projects);
