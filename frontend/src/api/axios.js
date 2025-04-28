import axios from 'axios';

// Option 1: Use relative URLs (recommended)
const API = axios.create({ baseURL: '/api' });

// Option 2: Use HTTPS explicitly
// const API = axios.create({ baseURL: 'https://35.232.49.147:3000/api' });

export default API;