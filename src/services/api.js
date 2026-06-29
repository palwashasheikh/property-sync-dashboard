import axios from 'axios';

const API_BASE = ' https://evasion-muck-irritate.ngrok-free.dev';

const api = axios.create({
  baseURL: API_BASE,
  timeout: 10000,
});

// Listings endpoints
export const listingsAPI = {
  getListings: (params) => api.get('/listings', { params }),
  getListingById: (id) => api.get(`/listings/${id}`),
};

// Sync endpoints
export const syncAPI = {
  getStats: () => api.get('/sync/stats'),
  getLogs: (params) => api.get('/sync/logs', { params }),
  getDuplicates: (params) => api.get('/sync/duplicates', { params }),
};

export default api;