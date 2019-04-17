import {
  GET_PROJECTS_START,
  GET_PROJECTS_SUCCESS,
  GET_PROJECTS_FAILURE
} from "../constants/actionTypes";
import { getProjectEndpoint } from "../constants/endpoints";
import { getRedmineAddress, getRedmineKey } from "../selectors/redmine";

export const getProjectsStart = () => ({
  type: GET_PROJECTS_START,
  payload: {
    loading: true
  },
  error: null
});

export const getProjectsSuccess = projects => ({
  type: GET_PROJECTS_SUCCESS,
  payload: {
    projects,
    loading: false
  }
});

export const getProjectsFailure = error => ({
  type: GET_PROJECTS_FAILURE,
  payload: {
    loading: false
  },
  error
});

export const getProjects = () => async (dispatch, getState) => {
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

    dispatch(getProjectsSuccess(projectJson));
  } catch (err) {
    dispatch(getProjectsFailure(err));
  }
};
