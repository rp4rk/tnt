import * as FromProjects from "../reducers/projects";

const STATE_KEY = "projects";

// Gets all projects in an array
export const getProjects = state => FromProjects.getProjects(state[STATE_KEY]);

// Gets the project loading status
export const getProjectsLoading = state =>
  FromProjects.getProjectsLoading(state[STATE_KEY]);

// Gets a single project by the id
export const getProjectById = (state, id) =>
  FromProjects.getProjectById(state[STATE_KEY], id);

// Get a project name, including the alias
export const getProjectName = (state, id) =>
  FromProjects.getProjectName(state[STATE_KEY], id);
