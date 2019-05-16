import * as FromTutorials from 'reducers/tutorials';

const STATE_KEY = 'tutorials';

/**
 * Fetches the view status of a given tutorial
 * @param {Object} state Scoped application state
 * @param {String} tutorial A tutorial id
 * @returns {Boolean} The view status
 */
export const getTutorialViewedStatus = (state, tutorial) =>
  FromTutorials.getTutorialViewedStatus(state[STATE_KEY], tutorial);
