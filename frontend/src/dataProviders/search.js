/**
 * Configuring the Algolia search client, and
 * choosing the work on the 'Movie' index.
 */
const algoliaSearch = require('algoliasearch');
const searchClient = algoliaSearch(
  process.env.REACT_APP_ALGOLIA_APPLICATION_ID,
  process.env.REACT_APP_ALGOLIA_API_KEY
);
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
