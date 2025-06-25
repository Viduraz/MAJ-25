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
    console.error('API request failed:', error.message);
    return Promise.reject(error);
  }
);

export default API;