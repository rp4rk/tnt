import {
  GET_PROJECTS_START,
  GET_PROJECTS_SUCCESS,
  GET_PROJECTS_FAILURE,
  SET_PROJECT_ALIAS,
  SET_ACTIVE_PROJECT
} from '../constants/actionTypes';

const initialState = {
  loading: true,
  error: null,
  projects: {},
  activeProject: null,
  projectAliases: {
    ...Object.entries(localStorage).reduce((aliases, [key, value]) => {
      if (key.indexOf('PROJECT_ALIAS') === -1) return aliases;

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
  }),
  [SET_ACTIVE_PROJECT]: (state, action) => ({
    ...state,
    activeProject: action.payload
  })
};

export default function projects(state = initialState, action) {
  const handler = REDUCERS[action.type];
  return handler ? handler(state, action) : state;
}

// Private selectors
/**
 * Gets an array of all projects
 * @param {Object} state Scoped state
 * @return {Object[]} An array of all projects
 */
export const getProjects = state => Object.values(state.projects);

/**
 * Gets the loading status of projects
 * @param {Object} state Scoped state
 * @returns {Boolean} Whether or not the project call is loading
 */
export const getProjectsLoading = state => state.loading;

/**
 * Get a single project by it's id
 * @param {Object} state Scoped state
 * @param {Number} id A project id
 * @returns {Object} A project
 */
export const getProjectById = (state, id) => state.projects[id];

/**
 * Get a project name by it's id
 * @param {Object} state Scoped state
 * @param {Number} id A project id
 * @returns {String} The name of a project
 */
export const getProjectName = (state, id) =>
  state.projectAliases[id] || getProjectById(state, id).name;

/**
 * Get a list of valid activities for the given project
 * @param {Object} state Scoped state
 * @param {Number} id The id of the project
 * @returns {Object[]} A list of activities for this project
 */
export const getProjectActivities = (state, id) =>
  getProjectById(state, id).time_entry_activities;

/**
 * Get a project name by it's id
 * @param {Object} state Scoped state
 * @returns {Number} ID of the currently active project
 */
export const getActiveProject = state => state.activeProject;
