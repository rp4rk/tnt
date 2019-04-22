import * as FromEntries from "../reducers/entries";

const STATE_KEY = "entries";

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
