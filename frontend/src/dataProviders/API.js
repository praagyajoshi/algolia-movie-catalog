import Axios from 'axios';
import FormData from 'form-data';

// TODO: get url from env file
const Client = Axios.create({
  baseURL: 'http://localhost:8080/api/v1/'
});

/**
 * Deletes the movie on the server, which also
 * triggers a reindex with the search provider.
 * The callback function is used to provide
 * error and response as applicable.
 *
 * @param {string} movieId - The movie to delete
 * @param {function} callback
 */
export const deleteMovieAPI = (movieId, callback) => {
  Client.delete(
    'movies/' + movieId
  ).then((response) => {
    callback(null, response);
  }).catch((error) => {
    callback(error, null);
  });
};

/**
 * Adds a new movie to the server, which also
 * indexes it with the search provider.
 * The callback function is used to provide
 * error and response as applicable.
 *
 * @param {object} formInfo - Info from the add movie form
 * @param {function} callback
 */
export const addMovieAPI = (formInfo, callback) => {
  /**
     * Creating multipart form data for the
     * post request along with the image
     */
  let data = new FormData();
  if (formInfo.uploaded_image &&
    formInfo.hasOwnProperty('uploaded_image')) {
    data.append(
      'uploaded_image',
      formInfo.uploaded_image,
      formInfo.uploaded_image.name
    );
  }

  /**
   * Processing parameters other than the image
   */
  for (var key in formInfo) {
    if (formInfo.hasOwnProperty(key) &&
      key !== 'uploaded_image') {
      data.append(key, formInfo[key]);
    }
  }

  /**
   * Making the POST request with multipart/form-data as the
   * content type so that we can upload the image in one go as well.
   */
  Client.post(
    'movies',
    data,
    {
      headers: {
        'Content-Type': `multipart/form-data; boundary=${data._boundary}`
      }
    }
  ).then((response) => {
    callback(null, response);
  }).catch((error) => {
    callback(error, null);
  });
}
