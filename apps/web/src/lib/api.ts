export async function fetchApi(endpoint: string, options: RequestInit = {}) {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
  const res = await fetch(`${baseUrl}${endpoint}`, {
    ...options,
    credentials: 'include', // Importante para enviar cookies HttpOnly
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  });
  return res.json();
}
