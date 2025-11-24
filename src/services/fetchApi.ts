const BASE = 'http://192.168.100.38:5500';

export async function post(path: string, body: any) {
  console.log('🔗 POST:', `${BASE}${path}`, body);
  
  try {
    const response = await fetch(`${BASE}${path}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });
    
    const data = await response.json();
    
    if (!response.ok) {
      console.log('❌ Erro HTTP:', response.status, data);
      throw { 
        message: `Erro ${response.status}: ${response.statusText}`,
        response: { data }
      };
    }
    
    console.log('✅ Sucesso:', data);
    return data;
    
  } catch (error) {
    console.log('❌ Erro de rede:', error);
    throw error;
  }
}

export async function get(path: string) {
  console.log('🔗 GET:', `${BASE}${path}`);
  
  try {
    const response = await fetch(`${BASE}${path}`);
    const data = await response.json();
    
    if (!response.ok) {
      throw { 
        message: `Erro ${response.status}: ${response.statusText}`,
        response: { data }
      };
    }
    
    return data;
  } catch (error) {
    console.log('❌ Erro na requisição GET:', error);
    throw error;
  }
}

export default { get, post };