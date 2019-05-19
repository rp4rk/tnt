import * as FromEntries from 'reducers/entries';

import { isValidRedmineEntry } from 'util/redmine';
import { entryPostsComplete } from './entryposts';
import { createSelector } from 'reselect';
import { getActiveProject } from './projects';

const STATE_KEY = 'entries';

export const getEntriesForProject = (state, projectId) =>
  FromEntries.getEntriesForProject(state[STATE_KEY], projectId);
export const getEntriesForActiveProject = state => {
  const activeProject = getActiveProject(state);

  return getEntriesForProject(state, activeProject);
};
export const getEntryForProject = (state, projectId, entryId) =>
  FromEntries.getEntryForProject(state[STATE_KEY], projectId, entryId);
export const getEntryProperty = (state, projectId, entryId, propertyId) =>
  FromEntries.getEntryProperty(
    state[STATE_KEY],
    projectId,
    entryId,
    propertyId
  );

/**
 * Determines if the submit button should be disabled for a given entry
 * @param {Object} state Application State
 * @param {Number} projectId A project id
 * @param {Number} entryId An entry id
 * @returns {Boolean}
 */
export const entrySubmissionDisabled = (state, projectId, entryId) => {
  const submitted = entryPostsComplete(state, projectId, entryId);
  if (submitted) return true;

  const entry = getEntryForProject(state, projectId, entryId);
  return !isValidRedmineEntry(entry);
};

export const validEntries = createSelector(
  getEntriesForActiveProject,
  entries =>
    entries &&
    entries.filter(entry => {
      return isValidRedmineEntry(entry);
    })
);
