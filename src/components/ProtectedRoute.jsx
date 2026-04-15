import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

/**
 * ProtectedRoute
 * Wraps any route that requires authentication.
 * - While token is being validated (loading) → shows a spinner
 * - If no valid token → redirects to /admin/login
 * - Otherwise → renders children
 */
const ProtectedRoute = ({ children }) => {
  const { token, admin, loading } = useAuth();

  if (loading) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        background: 'linear-gradient(160deg,#f0f9ff 0%,#e0f2fe 50%,#ecfdf5 100%)',
        flexDirection: 'column', gap: '1rem',
      }}>
        {/* Spinner */}
        <div style={{
          width: 44, height: 44, borderRadius: '50%',
          border: '4px solid #e0f2fe',
          borderTopColor: '#0ea5e9',
          animation: 'spin 0.8s linear infinite',
        }} />
        <p style={{ color: '#64748b', fontWeight: 600, margin: 0 }}>Verifying session…</p>
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  // Not authenticated → redirect
  if (!token || !admin) {
    return <Navigate to="/admin/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
