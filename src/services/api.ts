import axios from 'axios';

const api = axios.create({
  baseURL: 'http://10.111.80.146:5500',
  headers: {
    'Content-Type': 'application/json'
  }
});

export default api;