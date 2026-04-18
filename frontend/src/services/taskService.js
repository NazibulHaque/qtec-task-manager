import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: { 'Content-Type': 'application/json' },
});

export const taskService = {
  getAll: (params = {}) => api.get('/tasks', { params }),
  getOne: (id)          => api.get(`/tasks/${id}`),
  create: (data)        => api.post('/tasks', data),
  update: (id, data)    => api.put(`/tasks/${id}`, data),
  delete: (id)          => api.delete(`/tasks/${id}`),
};