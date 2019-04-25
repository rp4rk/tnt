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
