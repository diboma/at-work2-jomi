/**
 * Check if a value is on object
 * Source: https://www.w3docs.com/snippets/javascript/how-to-check-if-a-value-is-an-object-in-javascript.html
 */
export const isObject = (objValue) =>
  objValue && typeof objValue === 'object' && objValue.constructor === Object;

/**
 * Get a random number between the specified min and max.
 *
 * @param {int} min defaults to 0
 * @param {int} max defaults to 10
 * @returns {int} a random number
 */
export function getRandomNum(min = 0, max = 10) {
  return Math.floor(Math.random() * (max - min)) + min;
}

/**
 * Check if user is a coach
 */
export const getUserIsCoach = (user) => user?.role.id === 1 || false;

/**
 * Add leading zero to numbers smaller than 10
 *
 * @param {number} num
 * @returns {string}
 */
export const padNumber = (num) => {
  if (num < 10) return `0${num}`;
  else return `${num}`;
};

/**
 * Get date and time in locale string
 */
export const getDateTime = (date) => {
  if (!date) return '';
  const dateString = new Date(date).toLocaleDateString('nl-BE', {
    timezone: 'Europe/Brussels',
  });
  const timeString = new Date(date).toLocaleTimeString('nl-BE').substring(0, 5);
  return `${dateString} om ${timeString}`;
};
