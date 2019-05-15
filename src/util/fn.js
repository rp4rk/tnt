/**
 * Debounces a function by the specified amount of time
 * @param {function} fn The function to call after debouncing
 * @param {number} time The debounce threshold
 */
export const debounce = (fn, time = 300) => {
  let timeout;

  return function(...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => fn(...args), time);
  };
};
