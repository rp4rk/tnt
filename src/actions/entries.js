import {
  CREATE_TIME_ENTRY,
  UPDATE_TIME_ENTRY,
  DELETE_TIME_ENTRY
} from 'constants/actionTypes';
import { getProjectDefaultIssue } from 'selectors/projects';

export const createTimeEntry = projectId => (dispatch, getState) => {
  const state = getState();
  const issueId = getProjectDefaultIssue(state, projectId);

  dispatch({
    type: CREATE_TIME_ENTRY,
    payload: {
      projectId,
      issueId,
      hours: 0,
      activityId: null,
      comments: null,
      fromDate: null,
      toDate: null,
      includeWeekends: false
    }
  });
};

export const updateTimeEntry = (projectId, entryId, propertyId, value) => ({
  type: UPDATE_TIME_ENTRY,
  payload: value,
  meta: {
    propertyId,
    entryId,
    projectId
  }
});

export const deleteTimeEntry = () => ({
  type: DELETE_TIME_ENTRY
});
