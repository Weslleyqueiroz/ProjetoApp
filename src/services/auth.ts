import api from './fetchApi';

export const authService = {
  login: async (credentials: { email: string; password: string }) => {
    try {
      console.log('🔐 Enviando login:', credentials);
      
      // ✅ CORREÇÃO: api.post já retorna { token, user } diretamente
      const data = await api.post('/login', credentials);
      
      console.log('✅ Login bem-sucedido:', data);
      return data; // Já é { token, user }
      
    } catch (error) {
      console.log('❌ Erro no authService.login:', error);
      throw error;
    }
  },

  register: async (credentials: { name: string; email: string; password: string }) => {
    try {
      console.log('👤 Enviando cadastro:', credentials);
      
      // ✅ CORREÇÃO: api.post já retorna os dados diretamente
      const data = await api.post('/register', credentials);
      
      console.log('✅ Cadastro bem-sucedido:', data);
      return data; // Já é { token, user }
      
    } catch (error) {
      console.log('❌ Erro no authService.register:', error);
      throw error;
    }
  },
};