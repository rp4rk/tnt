import { eachDayOfInterval } from 'date-fns';

/**
 * Generates a range of days between the two provided dates
 * @param {String|Date} a A date object
 * @param {String|Date} b A date object
 * @returns {Date[]} An array of all days between these
 */
export const dateRange = (a, b) => {
  if (!b) return [a];

  return eachDayOfInterval({
    start: a,
    end: b
  });
};
