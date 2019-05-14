import { GET_PROJECTS_SUCCESS } from 'constants/actionTypes';
import { createTimeEntry } from 'actions/entries';
import { getEntriesForProject } from 'selectors/entries';

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
  const state = store.getState();

  projects.forEach(project => {
    const { id } = project;

    // Bomb out if the project already has entries
    if (getEntriesForProject(state, id)) {
      return;
    }

    dispatch(createTimeEntry(id));
  });

  dispatch(action);
};
