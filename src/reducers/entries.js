import { CREATE_TIME_ENTRY } from "../constants/actionTypes";

const initialState = {};

const REDUCERS = {
  [CREATE_TIME_ENTRY]: (state, action) => {
    const { projectId } = action.payload;
    const existingEntries = state[projectId] || [];

    return {
      ...state,
      [projectId]: [...existingEntries, action.payload]
    };
  }
};

export default function entries(state = initialState, action) {
  const handler = REDUCERS[action.type];
  return handler ? handler(state, action) : state;
}

// Private selectors
export const getEntriesForProject = (state, projectId) => state[projectId];
