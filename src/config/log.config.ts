import axios from 'axios';

export default axios.create({
  baseURL: `${process.env.APM_SERVER_HOST}` || 'http://localhost:8080',
});
