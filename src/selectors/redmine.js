import * as FromRedmine from "../reducers/redmine";

const STATE_KEY = "redmine";

export const getRedmineKey = state =>
  FromRedmine.getRedmineKey(state[STATE_KEY]);
export const getRedmineAddress = state =>
  FromRedmine.getRedmineAddress(state[STATE_KEY]);
