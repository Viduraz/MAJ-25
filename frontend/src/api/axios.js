import axios from 'axios';

// Determine the base URL based on environment
const getBaseURL = () => {
  // Check if we're in development (localhost)
  if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
    return '/api'; // Use proxy in development
  }
  
  // Production - use direct backend URL
  return 'http://35.232.49.147:3000/api';
};

const API = axios.create({ 
  baseURL: getBaseURL(),
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  }
});

// Add interceptors for better error handling
API.interceptors.request.use(
  (config) => {
    console.log('Making request to:', config.baseURL + config.url);
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

API.interceptors.response.use(
  (response) => {
    // Check if response is HTML instead of JSON
    if (typeof response.data === 'string' && response.data.includes('<!doctype html>')) {
      console.error('Received HTML instead of JSON - API endpoint not found');
      throw new Error('API endpoint not found - received HTML response');
    }
    return response;
  },
  (error) => {
    if (error.code === 'ECONNREFUSED') {
      console.error('Backend server is not accessible');
    }
    return Promise.reject(error);
  }
);

export default API;