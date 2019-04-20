/**
 * Checks to see if a string contains an instance of another string
 * @param {string} a Initial string
 * @param {string} b comparison string
 * @returns {boolean} Whether or not the two strings are similar
 */
export const containsString = (a, b) =>
  String(a)
    .toLowerCase()
    .indexOf(String(b).toLowerCase()) > -1;
