import axios from 'axios';

const api = axios.create({
  baseURL: 'http://192.168.100.38:5500',
});

// Interceptor de resposta para debug
api.interceptors.response.use(
  (response) => {
    console.log('✅ Resposta da API recebida:', {
      status: response.status,
      data: response.data,
      headers: response.headers
    });
    return response;
  },
  (error) => {
    console.log('❌ Erro da API:', {
      message: error.message,
      response: error.response,
      data: error.response?.data
    });
    return Promise.reject(error);
  }
);

// Interceptor de requisição para debug
api.interceptors.request.use(
  (config) => {
    console.log('📤 Enviando requisição:', {
      url: config.url,
      method: config.method,
      data: config.data
    });
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;