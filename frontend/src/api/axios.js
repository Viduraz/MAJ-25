import axios from 'axios';

const API = axios.create({ 
  baseURL: 'http://35.232.49.147:3000/api',
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  }
});

// Add interceptors for better error handling
API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.code === 'ECONNREFUSED') {
      console.error('Backend server is not accessible');
    }
    return Promise.reject(error);
  }
);

export default API;