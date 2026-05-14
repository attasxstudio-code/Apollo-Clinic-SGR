import React, { useState, useRef } from 'react';
import { useNavigate, Navigate, Link } from 'react-router-dom';
import { ShieldCheck, Eye, EyeOff, Loader2, Lock } from 'lucide-react';
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
      minHeight: '100vh', 
      background: 'url(/clinic-reception.png) center/cover no-repeat',
      position: 'relative',
      fontFamily: 'inherit',
    }}>
      {/* Light overlay to match the design's soft background */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(240, 246, 255, 0.92)' }}></div>
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'linear-gradient(135deg, rgba(255,255,255,0.7) 0%, rgba(255,255,255,1) 50%, rgba(255,255,255,0.7) 100%)' }}></div>
      
      <div style={{ position: 'relative', zIndex: 1, minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        
        {/* Top Navbar */}
        <header className="admin-login-header">
          <div>
            <img src="/images/ui/logo.webp" alt="Appolo Clinic" className="admin-login-header-logo" />
          </div>
          <div className="admin-login-trust">
            <span>Trusted healthcare for over 40 years</span>
            <span style={{ color: 'var(--orange)', fontSize: '1.2rem', lineHeight: 0 }}>•</span>
            <div style={{ width: '1px', height: '20px', background: 'rgba(0,0,0,0.1)' }}></div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <ShieldCheck size={18} color="var(--navy)" />
              <span>Secure & Confidential</span>
            </div>
          </div>
        </header>

        {/* Center Content */}
        <div className="admin-login-card-container">
          
          <div className="admin-login-card">
            {/* Logo in card */}
            <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
              <img src="/images/ui/logo.webp" alt="Appolo Clinic" className="admin-login-card-logo" />
            </div>

            <h2 style={{ color: 'var(--navy)', fontWeight: 900, fontSize: '1.8rem', marginBottom: '0.5rem', textAlign: 'center' }}>
              Admin Login
            </h2>
            <p style={{ color: 'var(--body)', fontSize: '0.95rem', textAlign: 'center', marginBottom: '2.5rem' }}>
              Sign in to access the Appolo Clinic dashboard.
            </p>

            {/* Error Banner */}
            {error && (
              <div style={{
                background: '#fff1f2', border: '1px solid #fecdd3',
                color: '#be123c', padding: '0.8rem 1rem',
                borderRadius: '12px', marginBottom: '1.5rem',
                fontSize: '0.85rem', textAlign: 'center', lineHeight: 1.5,
              }}>
                ⚠️ {error}
              </div>
            )}

            <form onSubmit={handleSubmit} noValidate style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              {/* Email */}
              <div>
                <label style={{ display: 'block', fontWeight: 800, fontSize: '0.9rem', color: 'var(--navy)', marginBottom: '0.5rem' }}>Email Address</label>
                <input
                  type="email"
                  placeholder="admin@appoloclinicsgr.com"
                  value={email} onChange={e => setEmail(e.target.value)}
                  required autoComplete="email" disabled={isLocked}
                  style={{ 
                    width: '100%', padding: '0.9rem 1rem', 
                    borderRadius: '12px', border: '1.5px solid rgba(0,0,0,0.1)',
                    fontSize: '1rem', color: 'var(--heading)', outline: 'none',
                    opacity: isLocked ? 0.6 : 1, transition: 'all 0.2s',
                    fontFamily: 'inherit', boxSizing: 'border-box'
                  }}
                  onFocus={(e) => { e.target.style.borderColor = 'var(--blue)'; e.target.style.boxShadow = '0 0 0 3px rgba(14,165,233,0.1)'; }}
                  onBlur={(e) => { e.target.style.borderColor = 'rgba(0,0,0,0.1)'; e.target.style.boxShadow = 'none'; }}
                />
              </div>

              {/* Password */}
              <div>
                <label style={{ display: 'block', fontWeight: 800, fontSize: '0.9rem', color: 'var(--navy)', marginBottom: '0.5rem' }}>Password</label>
                <div style={{ position: 'relative' }}>
                  <input
                    type={showPwd ? 'text' : 'password'}
                    placeholder="Enter password"
                    value={password} onChange={e => setPassword(e.target.value)}
                    required autoComplete="current-password" disabled={isLocked}
                    style={{ 
                      width: '100%', padding: '0.9rem 2.8rem 0.9rem 1rem', 
                      borderRadius: '12px', border: '1.5px solid rgba(0,0,0,0.1)',
                      fontSize: '1rem', color: 'var(--heading)', outline: 'none',
                      opacity: isLocked ? 0.6 : 1, transition: 'all 0.2s',
                      fontFamily: 'inherit', boxSizing: 'border-box'
                    }}
                    onFocus={(e) => { e.target.style.borderColor = 'var(--blue)'; e.target.style.boxShadow = '0 0 0 3px rgba(14,165,233,0.1)'; }}
                    onBlur={(e) => { e.target.style.borderColor = 'rgba(0,0,0,0.1)'; e.target.style.boxShadow = 'none'; }}
                  />
                  <button
                    type="button" onClick={() => setShowPwd(!showPwd)}
                    style={{
                      position: 'absolute', right: '1rem', top: '50%', transform: 'translateY(-50%)',
                      background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer', padding: '4px',
                    }}
                  >
                    {showPwd ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              {/* Cooldown */}
              {isLocked && (
                <div style={{
                  background: '#fffbeb', border: '1px solid #fde68a',
                  color: '#92400e', padding: '0.8rem 1rem',
                  borderRadius: '12px', fontSize: '0.85rem',
                  textAlign: 'center', fontWeight: 700,
                }}>
                  🔒 Account locked. Try again in {cooldown}s
                </div>
              )}

              <button
                type="submit" disabled={loading || isLocked}
                style={{
                  width: '100%', padding: '1.1rem', background: 'var(--navy)', color: '#fff',
                  border: 'none', borderRadius: '12px', fontSize: '1rem', fontWeight: 800,
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.6rem',
                  cursor: (loading || isLocked) ? 'not-allowed' : 'pointer',
                  opacity: (loading || isLocked) ? 0.8 : 1, marginTop: '0.5rem',
                  transition: 'all 0.2s'
                }}
              >
                {loading
                  ? <><Loader2 size={18} style={{ animation: 'spin 0.8s linear infinite' }} /> Signing in…</>
                  : <><ShieldCheck size={18} /> Access Dashboard</>
                }
              </button>
            </form>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem', marginTop: '1.5rem', color: '#94a3b8', fontSize: '0.8rem' }}>
              <Lock size={14} color="#f59e0b" /> Secure admin access only
            </div>

            <div style={{ marginTop: '1.5rem' }}>
              <Link to="/" style={{ 
                display: 'block', width: '100%', padding: '1rem', 
                background: '#fff', color: 'var(--navy)',
                border: '1.5px solid var(--navy)', borderRadius: '12px', 
                fontSize: '0.95rem', fontWeight: 800, textAlign: 'center',
                textDecoration: 'none', transition: 'all 0.2s'
              }}>
                ← Back to Appolo
              </Link>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        
        .admin-login-header {
          padding: 2rem 3rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .admin-login-header-logo {
          height: 48px;
          object-fit: contain;
        }
        .admin-login-trust {
          display: flex;
          align-items: center;
          gap: 1rem;
          font-size: 0.9rem;
          color: var(--navy);
          font-weight: 600;
        }
        .admin-login-card-container {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 2rem;
        }
        .admin-login-card {
          background: #fff;
          border-radius: 24px;
          padding: 3rem 4rem;
          width: 100%;
          max-width: 520px;
          box-shadow: 0 25px 60px rgba(0,0,0,0.05);
          border: 1px solid rgba(0,0,0,0.03);
          box-sizing: border-box;
        }
        .admin-login-card-logo {
          height: 55px;
          object-fit: contain;
          margin: 0 auto;
        }

        /* Mobile Adjustments */
        @media (max-width: 768px) {
          .admin-login-header {
            padding: 1.5rem;
            justify-content: center;
          }
          .admin-login-header-logo {
            display: none; /* Hide header logo on mobile since card has it */
          }
          .admin-login-trust {
            display: none; /* Hide marketing text on mobile */
          }
          .admin-login-card-container {
            padding: 1rem;
            align-items: flex-start; /* Move card higher up */
            padding-top: 2rem;
          }
          .admin-login-card {
            padding: 2.5rem 1.5rem;
            border-radius: 20px;
          }
          .admin-login-card h2 {
            font-size: 1.6rem !important;
          }
        }
      `}</style>
    </div>
  );
};

export default Login;
