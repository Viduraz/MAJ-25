import axios from 'axios';

// Change this:
// const API = axios.create({ baseURL: '/registration' });
// or whatever current configuration you have

// To this - use the full API path:
const API = axios.create({ baseURL: '/api' });

export default API;