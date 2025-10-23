import api from './fetchApi';

export const authService = {
  login: (data: { email: string; password: string }) => api.post('/login', data),
  register: (data: { name: string; email: string; password: string }) => api.post('/register', data),
};