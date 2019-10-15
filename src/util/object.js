/**
 * Sets a value on an object safely, if the path doesn't exist it is created
 * @param {String[]} path The path to set
 * @param {any} value The value to set
 * @param {Object} obj The object to set the value on
 * @returns The object
 */
export const set = ([key, ...next], value, obj) => {
  if (next.length === 0) {
    return { ...obj, [key]: value };
  }

  return { ...obj, [key]: set(next, value, obj[key] || {}) };
};

export const get = (path = [], obj = {}, defaultValue) =>
  path.reduce((val, key) => {
    return val && val[key] ? val[key] : defaultValue;
  }, obj);

/**
 * Builds a state object from localstorage items with the prefix provided
 * @param {String} prefix The prefix of the key in localstorage
 * @returns {Object}
 */
export const buildStateFromLocalStorage = prefix =>
  Object.entries(localStorage).reduce((items, [key, value]) => {
    if (key.indexOf(prefix) === -1) return items;

    const id = key.match(/\d+/g);
    items[id] = value;

    return items;
  }, {});
