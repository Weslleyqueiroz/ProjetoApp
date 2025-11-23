

import api from './fetchApi';

export const authService = {
  
  // 🛑 CORREÇÃO: Função login retorna response.data
  login: async (credentials: { email: string; password: string }) => {
    try {
        const response = await api.post('/login', credentials);
        return response.data; 
    } catch (error) {
        throw error;
    }
  },

  // 🛑 CORREÇÃO: Função register retorna response.data
  register: async (credentials: { name: string; email: string; password: string }) => {
    try {
        const response = await api.post('/register', credentials);
        return response.data;
    } catch (error) {
        throw error;
    }
  },
};