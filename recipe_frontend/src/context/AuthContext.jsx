import { createContext, useContext, useMemo, useState, useEffect } from 'react';
import { createApiWithToken } from '../api/client';
import { endpoints } from '../api/endpoints';

const AuthCtx = createContext(null);

// PUBLIC_INTERFACE
export function AuthProvider({ children }) {
  /** Provides auth token and actions to the app */
  const [token, setToken] = useState(() => localStorage.getItem('token') || '');

  useEffect(() => {
    if (token) localStorage.setItem('token', token);
    else localStorage.removeItem('token');
  }, [token]);

  const api = useMemo(() => createApiWithToken(() => token), [token]);

  const login = async (email, password) => {
    const res = await api.post(endpoints.auth.login, { email, password });
    if (res?.access_token) setToken(res.access_token);
    return true;
  };

  const register = async (name, email, password) => {
    // Backend expects {email, password, full_name?}
    const res = await api.post(endpoints.auth.register, { email, password, full_name: name });
    // Optionally auto-login with returned token
    if (res?.access_token) setToken(res.access_token);
    return true;
  };

  const logout = () => setToken('');

  const value = useMemo(() => ({ token, login, register, logout, api }), [token, api]);

  return <AuthCtx.Provider value={value}>{children}</AuthCtx.Provider>;
}

// PUBLIC_INTERFACE
export function useAuth() {
  /** Hook to access the auth context */
  const ctx = useContext(AuthCtx);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
