import * as FromEntryPosts from '../reducers/entryposts';

const STATE_KEY = 'entryposts';

export const entryPostsComplete = (state, projectId, entryId) =>
  FromEntryPosts.entryPostsComplete(state[STATE_KEY], projectId, entryId);
export const entryPostsLoading = (state, projectId, entryId) =>
  FromEntryPosts.entryPostsLoading(state[STATE_KEY], projectId, entryId);
