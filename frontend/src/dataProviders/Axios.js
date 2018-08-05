import Axios from 'axios';

// TODO: get url from env file
export default Axios.create({
  baseURL: 'http://localhost:8080/api/v1/'
});
