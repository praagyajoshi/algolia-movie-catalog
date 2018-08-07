/**
 * Capitalises the first letter of the given word.
 *
 * @param {string} word
 */
export const capitaliseWord = (word) => {
  return word.charAt(0).toUpperCase() + word.slice(1);
};