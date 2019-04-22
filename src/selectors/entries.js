import * as FromEntries from "../reducers/entries";
import { parse, eachDay } from "date-fns";

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

// Get days for an entry
export const getEntryDays = (state, projectId, entryId) => {
  const fromDate = getEntryProperty(state, projectId, entryId, "fromDate");
  const toDate = getEntryProperty(state, projectId, entryId, "toDate");

  if (!fromDate) {
    return null;
  }

  if (!toDate) {
    return parse(fromDate);
  }

  return eachDay(parse(fromDate), parse(toDate));
};
