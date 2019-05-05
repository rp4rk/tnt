import { CREATE_TIME_ENTRY, UPDATE_TIME_ENTRY } from 'constants/actionTypes';

const initialState = {};

const REDUCERS = {
  [CREATE_TIME_ENTRY]: (state, action) => {
    const { projectId } = action.payload;
    const existingEntries = state[projectId] || [];

    return {
      ...state,
      [projectId]: [...existingEntries, action.payload]
    };
  },
  [UPDATE_TIME_ENTRY]: (state, action) => {
    const { entryId, projectId, propertyId } = action.meta;

    const entry = { ...state[projectId][entryId] };
    entry[propertyId] = action.payload;

    const entries = [...state[projectId]];
    entries[entryId] = entry;

    return {
      ...state,
      [projectId]: entries
    };
  }
};

export default function entries(state = initialState, action) {
  const handler = REDUCERS[action.type];
  return handler ? handler(state, action) : state;
}

// Private selectors
export const getEntriesForProject = (state, projectId) => state[projectId];
export const getEntryForProject = (state, projectId, entryId) =>
  state[projectId][entryId];
export const getEntryProperty = (state, projectId, entryId, propertyId) => {
  const entry = getEntryForProject(state, projectId, entryId);

  return entry && entry[propertyId];
};
