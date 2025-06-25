import axios from 'axios';

// Determine the base URL based on environment
const getBaseURL = () => {
  // Check if we're in development (localhost)
  if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
    return '/api'; // Use proxy in development
  }
  
  // For maj2025.com domain
  if (window.location.hostname === 'maj2025.com' || window.location.hostname.includes('maj2025')) {
    // Use https if the site is served over https, otherwise use http
    const protocol = window.location.protocol === 'https:' ? 'https' : 'http';
    return `${protocol}://35.232.49.147:3000/api`;
  }
  
  // Fallback for any other environments
  return 'http://35.232.49.147:3000/api';
};

const API = axios.create({ 
  baseURL: getBaseURL(),
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true // Enable sending cookies with cross-origin requests
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
    console.error('API request failed:', error.message);
    if (error.code === 'ECONNREFUSED') {
      console.error('Backend server is not accessible');
    }
    return Promise.reject(error);
  }
);

export default API;