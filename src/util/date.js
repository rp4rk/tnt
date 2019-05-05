import { parse, eachDay } from 'date-fns';

/**
 * Generates a range of days between the two provided dates
 * @param {String|Date} a An ISO string or date object
 * @param {String|Date} b An ISO string or date object
 * @returns {Date[]} An array of all days between these
 */
export const dateRange = (a, b) => {
  if (!b) return [parse(a)];

  return eachDay(a, b);
};
