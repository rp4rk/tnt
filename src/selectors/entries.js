import * as FromEntries from '../reducers/entries';
import { ENTRY_PROPERTY } from '../constants/entryProperties';
import { validRedmineDescription, validRedmineHours } from '../util/redmine';
import { entryPostsComplete } from './entryposts';

const STATE_KEY = 'entries';

export const getEntriesForProject = (state, projectId) =>
  FromEntries.getEntriesForProject(state[STATE_KEY], projectId);
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

  const dependencies = [
    ENTRY_PROPERTY.DESCRIPTION,
    ENTRY_PROPERTY.HOURS,
    ENTRY_PROPERTY.ACTIVITY_ID,
    ENTRY_PROPERTY.FROM_DATE
  ];

  const [description, hours, activityId, fromDate] = dependencies.map(
    property => getEntryProperty(state, projectId, entryId, property)
  );

  const validDescription = validRedmineDescription(description);
  const validHours = validRedmineHours(hours);
  const validActivityId = !!activityId;
  const validDate = !!fromDate;

  return !(validDescription && validHours && validActivityId && validDate);
};
