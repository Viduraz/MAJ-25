import axios from 'axios';

// Create an Axios instance with baseURL
const API = axios.create({
  baseURL: import.meta.env.MODE === 'development' 
    ? '/api' // When running locally with Vite proxy
    : 'https://35.232.49.147:3000/api', // For production or direct access
});

export default API;