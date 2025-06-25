import axios from 'axios';

// Determine the base URL based on environment
const getBaseURL = () => {
  // Always use relative URL in production to leverage Netlify's proxy
  if (import.meta.env.PROD) {
    return '/api';
  }
  
  // Use proxy in development too
  return '/api';
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
    // Add auth token if available
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

API.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Better error logging to help with debugging
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.error('API error response:', {
        status: error.response.status,
        data: error.response.data,
        headers: error.response.headers
      });
    } else if (error.request) {
      // The request was made but no response was received
      console.error('API request made, but no response received:', error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.error('API request setup error:', error.message);
    }
    return Promise.reject(error);
  }
);

export default API;