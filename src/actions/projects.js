import {
  GET_PROJECTS_START,
  GET_PROJECTS_SUCCESS,
  GET_PROJECTS_FAILURE,
  SET_PROJECT_ALIAS
} from "../constants/actionTypes";
import { getProjectEndpoint } from "../constants/endpoints";
import { getRedmineAddress, getRedmineKey } from "../selectors/redmine";

/**
 * Fetching Projects
 */
export const getProjectsStart = () => ({
  type: GET_PROJECTS_START,
  payload: {
    loading: true
  },
  error: null
});

export const getProjectsSuccess = projectResponse => ({
  type: GET_PROJECTS_SUCCESS,
  payload: {
    projects: projectResponse.projects,
    loading: false
  }
});

export const getProjectsFailure = error => ({
  type: GET_PROJECTS_FAILURE,
  payload: {
    loading: false
  },
  error: error.toString()
});

export const fetchProjects = () => async (dispatch, getState) => {
  const state = getState();
  const host = getRedmineAddress(state);
  const key = getRedmineKey(state);
  dispatch(getProjectsStart());

  try {
    const projects = await fetch(getProjectEndpoint(host), {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "X-Redmine-Api-Key": key
      }
    });

    const projectJson = await projects.json();

    if (projects.status !== 200)
      throw new Error("Failed to get a response from the server.");

    dispatch(getProjectsSuccess(projectJson));
  } catch (err) {
    dispatch(getProjectsFailure(err));
  }
};

/**
 * Project Aliases
 */
export const setProjectAlias = (id, alias) => ({
  type: SET_PROJECT_ALIAS,
  payload: alias,
  meta: {
    id,
    store: {
      key: `PROJECT_ALIAS_${id}`
    }
  }
});
