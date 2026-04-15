import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

const AuthContext = createContext(null);

// ── Hardcoded single-admin credentials (client-side auth) ──
const ADMIN_EMAIL    = 'admin@apolloclinicsrg.com';
const ADMIN_PASSWORD = 'Apolloclinicsrg@001admin';
const SESSION_KEY    = 'hhc_session';
const SESSION_TTL    = 60 * 60 * 1000; // 1 hour in ms

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

  /* ── login: client-side credential check ── */
  const login = useCallback(async (email, password) => {
    if (
      email.trim().toLowerCase() !== ADMIN_EMAIL ||
      password !== ADMIN_PASSWORD
    ) {
      throw new Error('Invalid credentials.');
    }

    const adminData = { email: ADMIN_EMAIL, role: 'admin', name: "Apollo Clinic Admin" };
    const session   = JSON.stringify({
      admin:     adminData,
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

  /* ── authFetch kept for API compatibility (no-op wrapper) ── */
  const authFetch = useCallback((url, options = {}) => {
    return fetch(url, { ...options });
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
