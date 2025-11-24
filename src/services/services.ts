// services/services.ts - CORRIGIDO
import AsyncStorage from '@react-native-async-storage/async-storage';

export const servicesApi = {
  scheduleService: async (data: any) => {
    console.log('🔍 DEBUG - Dados sendo enviados:', JSON.stringify(data, null, 2));
    
    // ✅ CORREÇÃO: Pega o token do jeito certo
    const userDataString = await AsyncStorage.getItem('userData');
    console.log('🔍 UserData do AsyncStorage:', userDataString);
    
    let token = '';
    if (userDataString) {
      try {
        const userData = JSON.parse(userDataString);
        token = userData.token || userData?.user?.token || '';
        console.log('🔍 Token encontrado:', token);
      } catch (error) {
        console.log('❌ Erro ao parsear userData:', error);
      }
    }

    const headers: any = {
      'Content-Type': 'application/json',
    };
    
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
      console.log('🔍 Headers com token:', headers);
    } else {
      console.log('⚠️  Token não encontrado, enviando sem autenticação');
    }

    try {
      const response = await fetch('http://192.168.100.38:5500/appointments', {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(data),
      });
      
      console.log('🔍 DEBUG - Status da resposta:', response.status);
      
      if (!response.ok) {
        const errorText = await response.text();
        console.log('🔍 DEBUG - Resposta de erro:', errorText);
        throw new Error(`Erro ${response.status}: ${errorText}`);
      }
      
      const responseData = await response.json();
      console.log('🔍 DEBUG - Resposta de sucesso:', responseData);
      return responseData;
      
    } catch (error) {
      console.log('🔍 DEBUG - Erro de rede:', error);
      throw error;
    }
  }
}