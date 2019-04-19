const initialState = {
  45: [
    {
      projectId: 45,
      hours: 3,
      activityId: 1,
      comments: "",
      timeSpent: {
        fromDate: new Date(),
        toDate: new Date()
      }
    }
  ]
};

const REDUCERS = {};

export default function entries(state = initialState, action) {
  const handler = REDUCERS[action.type];
  return handler ? handler(state, action) : state;
}

// Private selectors
export const getEntriesForProject = (state, projectId) => state[projectId];
