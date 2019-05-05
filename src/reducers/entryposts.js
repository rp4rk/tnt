import {
  CREATE_PENDING_ENTRY_START,
  CREATE_PENDING_ENTRY_SUCCESS,
  CREATE_PENDING_ENTRY_FAILURE
} from '../constants/actionTypes';
import { redmineDate } from '../util/redmine';
import { set, get } from '../util/object';

const initialState = {};

const REDUCERS = {
  [CREATE_PENDING_ENTRY_START]: (state, action) => {
    const { projectId, entryId, date } = action.meta;
    const { loading, complete } = action.payload;
    const { error } = action;
    const redmineFormattedDate = redmineDate(date);

    return set(
      [projectId, entryId, redmineFormattedDate],
      { loading, error, complete },
      state
    );
  },
  [CREATE_PENDING_ENTRY_SUCCESS]: (state, action) => {
    const { projectId, entryId, date } = action.meta;
    const { loading, complete } = action.payload;
    const { error } = action;
    const redmineFormattedDate = redmineDate(date);

    return set(
      [projectId, entryId, redmineFormattedDate],
      { loading, error, complete },
      state
    );
  },
  [CREATE_PENDING_ENTRY_FAILURE]: (state, action) => {
    const { projectId, entryId, date } = action.meta;
    const { loading, complete } = action.payload;
    const { error } = action;
    const redmineFormattedDate = redmineDate(date);

    return set(
      [projectId, entryId, redmineFormattedDate],
      { loading, error, complete },
      state
    );
  }
};

export default function entryposts(state = initialState, action) {
  const handler = REDUCERS[action.type];
  return handler ? handler(state, action) : state;
}

// Private selectors
export const entryPostsComplete = (state, projectId, entryId) => {
  const entryPosts = get([projectId, entryId], state);

  if (!entryPosts) {
    return false;
  }

  return !Object.values(entryPosts).find(entryPost => !entryPost.complete);
};

export const entryPostsLoading = (state, projectId, entryId) => {
  const entryPosts = get([projectId, entryId], state);

  if (!entryPosts) {
    return false;
  }

  return Object.values(entryPosts).find(entryPost => entryPost.loading);
};
