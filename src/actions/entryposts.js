import {
  CREATE_PENDING_ENTRY_START,
  CREATE_PENDING_ENTRY_SUCCESS,
  CREATE_PENDING_ENTRY_FAILURE
} from 'constants/actionTypes';
import { getEntryForProject } from 'selectors/entries';
import { dateRange } from 'util/date';
import { isWeekend } from 'date-fns';
import { getTimeEntryEndpoint } from 'constants/endpoints';
import { getRedmineAddress, getRedmineKey } from 'selectors/redmine';
import { redmineDate } from 'util/redmine';

/**
 * Post entries
 */
export const createPendingEntriesStart = (projectId, entryId, date) => ({
  type: CREATE_PENDING_ENTRY_START,
  payload: {
    loading: true,
    complete: false
  },
  meta: {
    projectId,
    entryId,
    date
  },
  error: null
});

export const createPendingEntriesSuccess = (projectId, entryId, date) => ({
  type: CREATE_PENDING_ENTRY_SUCCESS,
  payload: {
    loading: false,
    complete: true
  },
  meta: {
    projectId,
    entryId,
    date
  }
});

export const createPendingEntriesFailure = (
  projectId,
  entryId,
  date,
  error
) => ({
  type: CREATE_PENDING_ENTRY_FAILURE,
  payload: {
    loading: false,
    complete: false
  },
  meta: {
    projectId,
    entryId,
    date
  },
  error: error.toString()
});

export const createPendingEntries = (projectId, entryId) => (
  dispatch,
  getState
) => {
  const state = getState();
  const host = getRedmineAddress(state);
  const key = getRedmineKey(state);
  const entry = getEntryForProject(state, projectId, entryId);
  const { fromDate, toDate, includeWeekends } = entry;

  if (!fromDate) return;

  const dates = includeWeekends
    ? dateRange(fromDate, toDate)
    : dateRange(fromDate, toDate).filter(date => !isWeekend(date));

  dates.forEach(async date => {
    dispatch(createPendingEntriesStart(projectId, entryId, date));
    const { hours, activityId, comments } = entry;

    try {
      await fetch(getTimeEntryEndpoint(host), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Redmine-Api-Key': key
        },
        body: JSON.stringify({
          time_entry: {
            project_id: projectId,
            activity_id: activityId,
            spent_on: redmineDate(date),
            comments,
            hours
          }
        })
      });

      dispatch(createPendingEntriesSuccess(projectId, entryId, date));
    } catch (error) {
      dispatch(createPendingEntriesFailure(projectId, entryId, date, error));
    }
  });
};
