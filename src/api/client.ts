import { getExtra } from '@/src/config';

export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

const { API_URL } = getExtra();

async function request<T>(
  path: string,
  options: {
    method?: HttpMethod;
    body?: any;
    headers?: Record<string, string>;
  } = {}
): Promise<T> {
  const url = `${API_URL}${path}`;
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(options.headers || {}),
  };

  const res = await fetch(url, {
    method: options.method || 'GET',
    headers,
    body: options.body ? JSON.stringify(options.body) : undefined,
  });

  if (!res.ok) {
    const text = await res.text().catch(() => '');
    throw new Error(
      `HTTP ${res.status} ${res.statusText} — ${text || 'no body'}`
    );
  }

  return (await res.json()) as T;
}

export const api = {
  get: <T>(p: string) => request<T>(p),
  post: <T>(p: string, body?: any) => request<T>(p, { method: 'POST', body }),
  put: <T>(p: string, body?: any) => request<T>(p, { method: 'PUT', body }),
  patch: <T>(p: string, body?: any) => request<T>(p, { method: 'PATCH', body }),
  delete: <T>(p: string) => request<T>(p, { method: 'DELETE' }),
};
