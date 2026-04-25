import React, { useState, useRef } from 'react';
import { useNavigate, Navigate, Link } from 'react-router-dom';
import { ShieldCheck, Eye, EyeOff, Loader2 } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import {
  checkRateLimit, recordAttempt, clearRateLimit,
  sanitizeInput, isValidEmail, logSuspicious,
} from '../../utils/security';

const RATE_KEY    = 'admin_login';
const MAX_ATTEMPTS = 5;
const WINDOW_MS   = 15 * 60 * 1000; // 15 minutes

const Login = () => {
  const { login, admin } = useAuth();
  const navigate = useNavigate();

  const [email,    setEmail]    = useState('');
  const [password, setPassword] = useState('');
  const [showPwd,  setShowPwd]  = useState(false);
  const [error,    setError]    = useState('');
  const [loading,  setLoading]  = useState(false);
  const [cooldown, setCooldown] = useState(0);
  const cooldownRef = useRef(null);

  if (admin) return <Navigate to="/admin/dashboard" replace />;

  const startCooldownTimer = (seconds) => {
    setCooldown(seconds);
    if (cooldownRef.current) clearInterval(cooldownRef.current);
    cooldownRef.current = setInterval(() => {
      setCooldown(prev => {
        if (prev <= 1) { clearInterval(cooldownRef.current); return 0; }
        return prev - 1;
      });
    }, 1000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    const trimmedEmail = sanitizeInput(email, 254);
    if (!trimmedEmail) return setError('Please enter your email address.');
    if (!password)     return setError('Please enter your password.');
    if (!isValidEmail(trimmedEmail)) return setError('Please enter a valid email address.');

    const rl = checkRateLimit(RATE_KEY, MAX_ATTEMPTS, WINDOW_MS);
    if (!rl.allowed) {
      logSuspicious('admin_login_rate_limited', { email: trimmedEmail });
      startCooldownTimer(rl.resetIn);
      return setError(`Too many login attempts. Please try again in ${Math.ceil(rl.resetIn / 60)} minute(s).`);
    }

    setLoading(true);
    try {
      await login(trimmedEmail, password);
      clearRateLimit(RATE_KEY);
      navigate('/admin/dashboard', { replace: true });
    } catch {
      recordAttempt(RATE_KEY);
      const remaining = checkRateLimit(RATE_KEY, MAX_ATTEMPTS, WINDOW_MS);
      if (!remaining.allowed) {
        startCooldownTimer(remaining.resetIn);
        setError(`Too many failed attempts. Please wait ${Math.ceil(remaining.resetIn / 60)} minute(s).`);
      } else {
        setError('Invalid credentials. Please try again.');
      }
      logSuspicious('admin_login_failed', { email: trimmedEmail });
    } finally {
      setLoading(false);
    }
  };

  const isLocked = cooldown > 0;

  return (
    <div style={{
      minHeight: '100vh', background: 'var(--bg)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: '1.5rem',
    }}>
      <div style={{ width: '100%', maxWidth: 400 }}>

        {/* Logo / header */}
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{
            width: 54, height: 54, borderRadius: 'var(--r-xl)',
            margin: '0 auto 1rem',
            background: 'var(--navy)', color: '#fff',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <ShieldCheck size={26} strokeWidth={2} />
          </div>
          <div style={{ fontWeight: 800, fontSize: '1rem', color: 'var(--heading)', marginBottom: '0.2rem' }}>
            Apollo Clinic
          </div>
          <div style={{ fontSize: '0.72rem', color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
            Srinagar
          </div>
        </div>

        {/* Card */}
        <div style={{
          background: '#fff', borderRadius: 'var(--r-2xl)',
          padding: '2.25rem',
          boxShadow: 'var(--shadow-md)',
          border: '1px solid var(--border)',
        }}>
          <h2 style={{ color: 'var(--heading)', fontWeight: 800, fontSize: '1.2rem', marginBottom: '0.3rem', textAlign: 'center' }}>
            Admin Login
          </h2>
          <p style={{ color: 'var(--muted)', fontSize: '0.82rem', textAlign: 'center', marginBottom: '1.75rem' }}>
            Sign in to access the Apollo Clinic dashboard.
          </p>

          {/* Error */}
          {error && (
            <div style={{
              background: 'var(--red-light)', border: '1px solid #fecdd3',
              color: 'var(--red)', padding: '0.8rem 1rem',
              borderRadius: 'var(--r-md)', marginBottom: '1.25rem',
              fontSize: '0.85rem', textAlign: 'center', lineHeight: 1.5,
            }}>
              ⚠️ {error}
            </div>
          )}

          <form onSubmit={handleSubmit} noValidate style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {/* Email */}
            <div className="form-group">
              <label className="form-label">Email Address</label>
              <input
                type="email" className="form-input"
                placeholder="admin@apolloclinicsgr.com"
                value={email} onChange={e => setEmail(e.target.value)}
                required autoComplete="email" disabled={isLocked}
                style={{ opacity: isLocked ? 0.6 : 1 }}
              />
            </div>

            {/* Password */}
            <div className="form-group">
              <label className="form-label">Password</label>
              <div style={{ position: 'relative' }}>
                <input
                  type={showPwd ? 'text' : 'password'} className="form-input"
                  placeholder="Enter password"
                  value={password} onChange={e => setPassword(e.target.value)}
                  required autoComplete="current-password" disabled={isLocked}
                  style={{ paddingRight: '3rem', opacity: isLocked ? 0.6 : 1 }}
                />
                <button
                  type="button" onClick={() => setShowPwd(!showPwd)}
                  style={{
                    position: 'absolute', right: '0.9rem', top: '50%', transform: 'translateY(-50%)',
                    background: 'none', border: 'none', color: 'var(--muted)', cursor: 'pointer', padding: '4px',
                  }}
                >
                  {showPwd ? <EyeOff size={17} /> : <Eye size={17} />}
                </button>
              </div>
            </div>

            {/* Cooldown */}
            {isLocked && (
              <div style={{
                background: '#fffbeb', border: '1px solid #fde68a',
                color: '#92400e', padding: '0.7rem 1rem',
                borderRadius: 'var(--r-md)', fontSize: '0.84rem',
                textAlign: 'center', fontWeight: 600,
              }}>
                🔒 Account locked. Try again in {cooldown}s
              </div>
            )}

            <button
              type="submit" disabled={loading || isLocked}
              className="btn btn-primary"
              style={{
                width: '100%', justifyContent: 'center', minHeight: 50,
                borderRadius: 'var(--r-md)', fontSize: '0.95rem', fontWeight: 700,
                cursor: (loading || isLocked) ? 'not-allowed' : 'pointer',
                opacity: (loading || isLocked) ? 0.75 : 1,
                marginTop: '0.25rem',
              }}
            >
              {loading
                ? <><Loader2 size={17} style={{ animation: 'spin 0.8s linear infinite' }} /> Signing in…</>
                : <><ShieldCheck size={17} /> Access Dashboard</>
              }
            </button>
          </form>

          <p style={{ textAlign: 'center', marginTop: '1.5rem', color: 'var(--muted)', fontSize: '0.75rem', marginBottom: '0.35rem' }}>
            🔒 Secure admin access only
          </p>
          <div style={{ marginTop: '1.2rem' }}>
            <Link to="/" className="btn btn-outline" style={{ width: '100%', justifyContent: 'center', borderRadius: 'var(--r-md)' }}>
              ← Back to Apollo
            </Link>
          </div>
        </div>
      </div>

      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
};

export default Login;
