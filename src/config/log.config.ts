import axios from 'axios';

export default axios.create({
  baseURL: `http://${process.env.APM_SERVER_HOST}` || 'http://database:8080',
});
