import * as FromProjects from "../reducers/projects";

const STATE_KEY = "projects";

/**
 * Gets an array of all projects
 * @param {Object} state Application state
 * @return {Object[]} An array of all projects
 */
export const getProjects = state => FromProjects.getProjects(state[STATE_KEY]);

/**
 * Gets the loading status of projects
 * @param {Object} state Application state
 * @returns {Boolean} Whether or not the project call is loading
 */
export const getProjectsLoading = state =>
  FromProjects.getProjectsLoading(state[STATE_KEY]);

/**
 * Get a single project by it's id
 * @param {Object} state Application state
 * @param {Number} id A project id
 * @returns {Object} A project
 */
export const getProjectById = (state, id) =>
  FromProjects.getProjectById(state[STATE_KEY], id);

/**
 * Get a project name by it's id
 * @param {Object} state Application state
 * @param {Number} id A project id
 * @returns {String} The name of a project
 */
export const getProjectName = (state, id) =>
  FromProjects.getProjectName(state[STATE_KEY], id);

/**
 * Get a list of valid activities for the given project
 * @param {Object} state Application state
 * @param {Number} id The id of the project
 * @returns {Object[]} A list of activities for this project
 */
export const getProjectActivities = (state, id) =>
  FromProjects.getProjectActivities(state[STATE_KEY], id);
