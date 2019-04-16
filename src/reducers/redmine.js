const initialState = {
  key: localStorage.getItem("redmineKey") || null,
  address: localStorage.getItem("redmineAddress") || null
};

const REDUCERS = {};

export default function redmine(state = initialState, action) {
  const handler = REDUCERS[action.type];
  return handler ? handler(state, action) : state;
}
