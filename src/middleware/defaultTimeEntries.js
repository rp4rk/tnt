import { GET_PROJECTS_SUCCESS } from "../constants/actionTypes";
import { createTimeEntry } from "../actions/entries";

/**
 * Creates a default entry for any projects that enter our store
 */
export const defaultTimeEntries = store => dispatch => action => {
  if (action.type !== GET_PROJECTS_SUCCESS || !action.payload.projects) {
    dispatch(action);
    return;
  }

  // Create a default time entry for each project
  const { projects } = action.payload;

  projects.forEach(project => {
    const { id } = project;
    dispatch(createTimeEntry(id));
  });

  dispatch(action);
};
