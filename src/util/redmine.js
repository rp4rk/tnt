import { format } from "date-fns";

/**
 * Determines if the provided URL is secure. (HTTPS)
 * @param {String} url A URL
 * @returns {Boolean} Whether or not the provided URL is secure
 */
export const isSecureUrl = url => url && url.match(/^https:\/\//g);

/**
 * Determines if the provided API key is valid
 * Note: Naive
 * @param {String} key A redmine API key
 * @returns {Boolean} Whether or no the provided key is valid
 */
export const isValidApiKey = key => key && String(key).length === 40;

/**
 * Formats dates to redmine's strange preference (YYYY-MM-DD)
 * @param {String|Date} date An ISO string or date
 * @returns {String} A redmine formatted date
 */
export const redmineDate = date => format(date, "YYYY-MM-DD");
