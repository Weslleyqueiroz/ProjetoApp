// fetchApi.js - Versão super simples
const BASE = 'http://10.0.2.2:5500'; // Funciona para emulador Android

export async function get(path: string) {
  const res = await fetch(`${BASE}${path}`);
  return res.json();
}

export async function post(path: string, body: any) {
  const res = await fetch(`${BASE}${path}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  return res.json();
}

export default { get, post };