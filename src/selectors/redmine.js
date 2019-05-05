import * as FromRedmine from 'reducers/redmine';

const STATE_KEY = 'redmine';

/**
 * Get the current API key for redmine
 * @param {Object} state Scoped state
 * @returns {String} The API key
 */
export const getRedmineKey = state =>
  FromRedmine.getRedmineKey(state[STATE_KEY]);

/**
 * Get the current address for the redmine instance
 * @param {Object} state Scoped state
 * @returns {String} The address for redmine
 */
export const getRedmineAddress = state =>
  FromRedmine.getRedmineAddress(state[STATE_KEY]);
