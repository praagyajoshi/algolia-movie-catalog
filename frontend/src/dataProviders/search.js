// TODO: get application ID and key from env file
const algoliaSearch = require('algoliasearch');
const searchClient = algoliaSearch('Q9082UFEFH', '999cbc167aea99acb23b92054ac46e2f');
const searchIndex = searchClient.initIndex('Movie');

/**
 * Searches for movies using the Algolia seach client.
 * The callback function is used to provide either error,
 * or results.
 *
 * @param {string} query
 * @param {number} page
 * @param {Array} facetFilters
 * @param {function} callback
 */
export const searchMovies = (query, page, facetFilters, callback) => {
  searchIndex.search({
    query,
    page,
    facetFilters,
    facets: ['genre', 'rating']
  }, (error, content) => {
    callback(error, content);
  });
};
