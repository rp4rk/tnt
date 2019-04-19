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
