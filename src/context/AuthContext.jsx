import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

const AuthContext = createContext(null);

// ── Session storage keys ──
const SESSION_KEY = 'hhc_session';
const SESSION_TTL = 60 * 60 * 1000; // 1 hour in ms

const isSessionValid = (session) => {
  if (!session) return false;
  try {
    const { expiresAt } = JSON.parse(session);
    return Date.now() < expiresAt;
  } catch {
    return false;
  }
};

export const AuthProvider = ({ children }) => {
  const [admin,   setAdmin]   = useState(() => {
    const session = localStorage.getItem(SESSION_KEY);
    return isSessionValid(session) ? JSON.parse(session).admin : null;
  });
  const [loading, setLoading] = useState(false);

  /* ── Auto-logout when session expires (checks every minute) ── */
  useEffect(() => {
    if (!admin) return;
    const interval = setInterval(() => {
      const session = localStorage.getItem(SESSION_KEY);
      if (!isSessionValid(session)) logout();
    }, 60_000);
    return () => clearInterval(interval);
  }, [admin]);

  /* ── login: calls the server-side API — no credentials in client code ── */
  const login = useCallback(async (email, password) => {
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (!res.ok) {
      // Propagate server error message — already generic ("Invalid credentials.")
      throw new Error(data.error || 'Login failed.');
    }

    const adminData = data.admin;
    const session = JSON.stringify({
      admin:     adminData,
      token:     data.token,
      expiresAt: Date.now() + SESSION_TTL,
    });

    localStorage.setItem(SESSION_KEY, session);
    setAdmin(adminData);
    return adminData;
  }, []);

  /* ── logout ── */
  const logout = useCallback(() => {
    localStorage.removeItem(SESSION_KEY);
    setAdmin(null);
  }, []);

  /* ── authFetch — attaches Bearer token to API requests ── */
  const authFetch = useCallback((url, options = {}) => {
    const session = localStorage.getItem(SESSION_KEY);
    let token = null;
    if (session) {
      try { token = JSON.parse(session).token; } catch {}
    }
    return fetch(url, {
      ...options,
      headers: {
        ...(options.headers || {}),
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
    });
  }, []);

  return (
    <AuthContext.Provider value={{ admin, loading, login, logout, authFetch }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside <AuthProvider>');
  return ctx;
};
