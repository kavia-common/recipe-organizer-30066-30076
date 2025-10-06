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
    // const res = await api.post(endpoints.auth.login, { email, password });
    // setToken(res?.access_token);
    // Placeholder demo:
    setToken('demo-token');
  };

  const register = async (name, email, password) => {
    // await api.post(endpoints.auth.register, { name, email, password });
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
