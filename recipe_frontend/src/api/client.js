import { buildUrl } from './endpoints';

/**
 * Lightweight fetch wrapper adding JSON defaults and Authorization header if token present.
 * Reads REACT_APP_API_BASE_URL, defaulting to http://localhost:3001
 */
const API_BASE = process.env.REACT_APP_API_BASE_URL || 'http://localhost:3001';

// PUBLIC_INTERFACE
export async function apiFetch(path, { method = 'GET', token, headers = {}, body, query } = {}) {
  /** Generic API fetch with sensible defaults and error handling. */
  const url = new URL(buildUrl(API_BASE, path));
  if (query && typeof query === 'object') {
    Object.entries(query).forEach(([k, v]) => {
      if (v !== undefined && v !== null && v !== '') url.searchParams.append(k, v);
    });
  }

  const opts = {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...headers
    },
    credentials: 'include'
  };

  if (token) {
    opts.headers.Authorization = `Bearer ${token}`;
  }
  if (body !== undefined) {
    opts.body = typeof body === 'string' ? body : JSON.stringify(body);
  }

  const res = await fetch(url.toString(), opts);
  const contentType = res.headers.get('content-type') || '';

  let data = null;
  if (contentType.includes('application/json')) {
    data = await res.json();
  } else {
    data = await res.text();
  }

  if (!res.ok) {
    const err = new Error((data && data.detail) || res.statusText || 'Request failed');
    err.status = res.status;
    err.data = data;
    throw err;
  }
  return data;
}

// PUBLIC_INTERFACE
export function createApiWithToken(getToken) {
  /** Factory that returns API helpers bound to a token getter */
  return {
    get: (path, opts = {}) => apiFetch(path, { ...opts, method: 'GET', token: getToken() }),
    post: (path, body, opts = {}) => apiFetch(path, { ...opts, method: 'POST', body, token: getToken() }),
    put: (path, body, opts = {}) => apiFetch(path, { ...opts, method: 'PUT', body, token: getToken() }),
    patch: (path, body, opts = {}) => apiFetch(path, { ...opts, method: 'PATCH', body, token: getToken() }),
    del: (path, opts = {}) => apiFetch(path, { ...opts, method: 'DELETE', token: getToken() }),
    baseUrl: API_BASE
  };
}
