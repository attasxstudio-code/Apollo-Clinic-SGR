import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

const AuthContext = createContext(null);

const API_BASE = '/api';   // Vite proxies this → http://localhost:4000/api
const TOKEN_KEY = 'hhc_token';

export const AuthProvider = ({ children }) => {
  const [token,   setToken]   = useState(() => localStorage.getItem(TOKEN_KEY));
  const [admin,   setAdmin]   = useState(null);
  const [loading, setLoading] = useState(true);  // true while /me is in-flight on mount

  /* ── Verify token on mount / whenever token changes ── */
  useEffect(() => {
    if (!token) {
      setAdmin(null);
      setLoading(false);
      return;
    }
    // Validate with /me so we don't trust an expired local token
    fetch(`${API_BASE}/auth/me`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(r => r.ok ? r.json() : Promise.reject(r))
      .then(data => setAdmin(data.admin))
      .catch(() => {
        // Token invalid or expired — clear it
        localStorage.removeItem(TOKEN_KEY);
        setToken(null);
        setAdmin(null);
      })
      .finally(() => setLoading(false));
  }, [token]);

  /* ── Auto-logout when token expires (checks every minute) ── */
  useEffect(() => {
    if (!token) return;
    const interval = setInterval(() => {
      try {
        const { exp } = JSON.parse(atob(token.split('.')[1]));
        if (Date.now() / 1000 >= exp) logout();
      } catch { logout(); }
    }, 60_000);
    return () => clearInterval(interval);
  }, [token]);

  /* ── login: POST /api/auth/login ── */
  const login = useCallback(async (email, password) => {
    const res = await fetch(`${API_BASE}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Login failed.');

    localStorage.setItem(TOKEN_KEY, data.token);
    setToken(data.token);
    setAdmin(data.admin);
    return data;
  }, []);

  /* ── logout ── */
  const logout = useCallback(() => {
    localStorage.removeItem(TOKEN_KEY);
    setToken(null);
    setAdmin(null);
  }, []);

  /* ── Convenience helper for protected fetch calls ── */
  const authFetch = useCallback((url, options = {}) => {
    return fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...(options.headers || {}),
        Authorization: `Bearer ${token}`,
      },
    });
  }, [token]);

  return (
    <AuthContext.Provider value={{ token, admin, loading, login, logout, authFetch }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside <AuthProvider>');
  return ctx;
};
