import axios from 'axios';

const api = axios.create({
  baseURL: 'https://kompetenzen-backend-production.up.railway.app/api', // Live Railway Backend
});

// Automatically attach the JWT token to every request if it exists
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  // Strict check to avoid sending "Bearer null" or "Bearer undefined"
  if (token && token !== 'null' && token !== 'undefined') {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export default api;
