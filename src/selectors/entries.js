import * as FromEntries from "../reducers/entries";

const STATE_KEY = "entries";

export const getEntriesForProject = (state, projectId) =>
  FromEntries.getEntriesForProject(state[STATE_KEY], projectId);
