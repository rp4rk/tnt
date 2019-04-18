import {
  GET_PROJECTS_START,
  GET_PROJECTS_SUCCESS,
  GET_PROJECTS_FAILURE,
  SET_PROJECT_ALIAS
} from "../constants/actionTypes";

const initialState = {
  loading: true,
  error: null,
  projects: {},
  projectAliases: {
    ...Object.entries(localStorage).reduce((aliases, [key, value]) => {
      if (key.indexOf("PROJECT_ALIAS") === -1) return aliases;

      const id = key.match(/\d+/g);
      aliases[id] = value;

      return aliases;
    }, {})
  }
};

const REDUCERS = {
  [GET_PROJECTS_START]: (state, action) => ({
    ...state,
    loading: action.payload.loading,
    error: action.error
  }),
  [GET_PROJECTS_SUCCESS]: (state, action) => ({
    ...state,
    loading: action.payload.loading,
    projects: action.payload.projects.reduce((map, project) => {
      map[project.id] = project;

      return map;
    }, {})
  }),
  [GET_PROJECTS_FAILURE]: (state, action) => ({
    ...state,
    loading: action.payload.loading,
    error: action.error
  }),
  [SET_PROJECT_ALIAS]: (state, action) => ({
    ...state,
    projectAliases: {
      ...state.projectAliases,
      [action.meta.id]: action.payload
    }
  })
};

export default function projects(state = initialState, action) {
  const handler = REDUCERS[action.type];
  return handler ? handler(state, action) : state;
}

// Private selectors
export const getProjects = state => Object.values(state.projects);
export const getProjectsLoading = state => state.loading;
export const getProjectById = (state, id) => state.projects[id];
export const getProjectName = (state, id) =>
  state.projectAliases[id] || getProjectById(state, id).name;
