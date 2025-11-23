const BASE = 'http://192.168.100.38:5500';

export async function post(path: string, body: any) {
  console.log('🔗 URL:', `${BASE}${path}`);
  
  try {
    const response = await fetch(`${BASE}${path}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });
    
    const data = await response.json();
    console.log('✅ Sucesso:', data);
    return data;
    
  } catch (error) {
    console.log('❌ Erro completo:', error);
    throw error;
  }
}

export async function get(path: string) {
  const res = await fetch(`${BASE}${path}`);
  return res.json();
}

export default { get, post };