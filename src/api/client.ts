import { getExtra } from '@/src/config';
import { logger } from '@/src/lib/logger';

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
  const method = options.method || 'GET';

  logger.debug(`API Request: ${method} ${url}`, {
    body: options.body,
    headers: options.headers,
  });

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(options.headers || {}),
  };

  try {
    const res = await fetch(url, {
      method,
      headers,
      body: options.body ? JSON.stringify(options.body) : undefined,
    });

    if (!res.ok) {
      const text = await res.text().catch(() => '');
      const error = `HTTP ${res.status} ${res.statusText} — ${text || 'no body'}`;
      logger.error(`API Error: ${method} ${url}`, {
        status: res.status,
        statusText: res.statusText,
        body: text,
      });
      throw new Error(error);
    }

    const data = (await res.json()) as T;
    logger.debug(`API Success: ${method} ${url}`, { data });
    return data;
  } catch (error) {
    logger.error(`API Exception: ${method} ${url}`, { error });
    throw error;
  }
}

export const api = {
  get: <T>(p: string) => request<T>(p),
  post: <T>(p: string, body?: any) => request<T>(p, { method: 'POST', body }),
  put: <T>(p: string, body?: any) => request<T>(p, { method: 'PUT', body }),
  patch: <T>(p: string, body?: any) => request<T>(p, { method: 'PATCH', body }),
  delete: <T>(p: string) => request<T>(p, { method: 'DELETE' }),
};
