import {
  CREATE_TIME_ENTRY,
  UPDATE_TIME_ENTRY,
  DELETE_TIME_ENTRY
} from "../constants/actionTypes";

export const createTimeEntry = projectId => ({
  type: CREATE_TIME_ENTRY,
  payload: {
    projectId,
    hours: 0,
    activityId: "",
    comments: "",
    timeSpent: {
      fromDate: null,
      toDate: null,
      includeWeekends: false
    }
  }
});

export const updateTimeEntry = () => ({
  type: UPDATE_TIME_ENTRY
});

export const deleteTimeEntry = () => ({
  type: DELETE_TIME_ENTRY
});
