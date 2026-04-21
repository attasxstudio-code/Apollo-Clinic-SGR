import React, { useState, useRef } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { ShieldCheck, Eye, EyeOff, Loader2 } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import {
  checkRateLimit, recordAttempt, clearRateLimit,
  sanitizeInput, isValidEmail, logSuspicious,
} from '../../utils/security';

const RATE_KEY = 'admin_login';
const MAX_ATTEMPTS = 5;
const WINDOW_MS = 15 * 60 * 1000; // 15 minutes

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

  // Already logged in → go straight to dashboard
  if (admin) return <Navigate to="/admin/dashboard" replace />;

  const startCooldownTimer = (seconds) => {
    setCooldown(seconds);
    if (cooldownRef.current) clearInterval(cooldownRef.current);
    cooldownRef.current = setInterval(() => {
      setCooldown(prev => {
        if (prev <= 1) {
          clearInterval(cooldownRef.current);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Basic client-side checks
    const trimmedEmail = sanitizeInput(email, 254);
    if (!trimmedEmail) return setError('Please enter your email address.');
    if (!password)     return setError('Please enter your password.');

    // Email format check
    if (!isValidEmail(trimmedEmail)) {
      return setError('Please enter a valid email address.');
    }

    // Rate limit check
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
    } catch (err) {
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
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      background: 'linear-gradient(160deg,#f0f9ff 0%,#e0f2fe 50%,#ecfdf5 100%)',
      padding: '1.25rem',
    }}>
      {/* Blobs */}
      <div style={{ position:'fixed', top:'-100px', right:'-100px', width:'380px', height:'380px', borderRadius:'50%',
        background:'radial-gradient(circle,rgba(14,165,233,0.12) 0%,transparent 70%)', pointerEvents:'none' }} />
      <div style={{ position:'fixed', bottom:'-80px', left:'-80px', width:'320px', height:'320px', borderRadius:'50%',
        background:'radial-gradient(circle,rgba(16,185,129,0.1) 0%,transparent 70%)', pointerEvents:'none' }} />

      <div style={{
        width: '100%', maxWidth: '420px',
        background: '#fff', borderRadius: '24px',
        padding: 'clamp(1.75rem, 6vw, 3rem) clamp(1.25rem, 5vw, 2.5rem)',
        boxShadow: '0 16px 50px rgba(14,165,233,0.15)',
        border: '1.5px solid #cce5f6',
        position: 'relative', overflow: 'hidden',
      }}>
        {/* Top bar */}
        <div style={{ position:'absolute', top:0, left:0, right:0, height:'4px',
          background:'linear-gradient(90deg,#0369a1,#0ea5e9,#10b981)' }} />

        {/* Header */}
        <div style={{ textAlign:'center', marginBottom:'2rem' }}>
          <div style={{
            width:68, height:68, borderRadius:'18px', margin:'0 auto 1rem',
            background:'linear-gradient(135deg,#0ea5e9,#10b981)',
            display:'flex', alignItems:'center', justifyContent:'center',
            boxShadow:'0 8px 24px rgba(14,165,233,0.3)',
          }}>
            <ShieldCheck size={32} color="#fff" strokeWidth={2.5} />
          </div>
          <h2 style={{ color:'#0c4a6e', fontWeight:800, margin:'0 0 0.4rem', fontSize:'clamp(1.4rem,5vw,1.75rem)' }}>
            Admin Login
          </h2>
          <p style={{ color:'#64748b', fontSize:'0.9rem', margin:0 }}>
            Apollo Clinic — Admin Dashboard
          </p>
        </div>

        {/* Error banner */}
        {error && (
          <div style={{
            background:'#fff1f2', border:'1.5px solid #fecdd3',
            color:'#be123c', padding:'0.85rem 1rem',
            borderRadius:'12px', marginBottom:'1.5rem',
            fontSize:'0.88rem', textAlign:'center', lineHeight:1.5,
          }}>
            ⚠️ {error}
          </div>
        )}

        <form onSubmit={handleSubmit} noValidate>
          {/* Email */}
          <div style={{ marginBottom:'1.25rem' }}>
            <label style={{ display:'block', marginBottom:'0.5rem', fontWeight:600, color:'#334155', fontSize:'0.9rem' }}>
              Email Address
            </label>
            <input
              type="email" className="form-control"
              placeholder="admin@apolloclinicsgr.com"
              value={email} onChange={e => setEmail(e.target.value)}
              required autoComplete="email"
              disabled={isLocked}
              style={{ minHeight:'52px', fontSize:'1rem', opacity: isLocked ? 0.6 : 1 }}
            />
          </div>

          {/* Password */}
          <div style={{ marginBottom:'1.5rem' }}>
            <label style={{ display:'block', marginBottom:'0.5rem', fontWeight:600, color:'#334155', fontSize:'0.9rem' }}>
              Password
            </label>
            <div style={{ position:'relative' }}>
              <input
                type={showPwd ? 'text' : 'password'} className="form-control"
                placeholder="Enter password"
                value={password} onChange={e => setPassword(e.target.value)}
                required autoComplete="current-password"
                disabled={isLocked}
                style={{ minHeight:'52px', fontSize:'1rem', paddingRight:'3rem', opacity: isLocked ? 0.6 : 1 }}
              />
              <button type="button" onClick={() => setShowPwd(!showPwd)} style={{
                position:'absolute', right:'0.9rem', top:'50%', transform:'translateY(-50%)',
                background:'none', border:'none', color:'#94a3b8', cursor:'pointer', padding:'4px',
              }}>
                {showPwd ? <EyeOff size={18}/> : <Eye size={18}/>}
              </button>
            </div>
          </div>

          {/* Cooldown indicator */}
          {isLocked && (
            <div style={{
              background:'#fffbeb', border:'1.5px solid #fde68a',
              color:'#92400e', padding:'0.75rem 1rem',
              borderRadius:'12px', marginBottom:'1rem',
              fontSize:'0.84rem', textAlign:'center', fontWeight:600,
            }}>
              🔒 Account locked. Try again in {cooldown}s
            </div>
          )}

          {/* Submit */}
          <button type="submit" disabled={loading || isLocked} style={{
            width:'100%', minHeight:'54px',
            background: (loading || isLocked)
              ? 'linear-gradient(135deg,#93c5fd,#6ee7b7)'
              : 'linear-gradient(135deg,#0369a1,#0ea5e9,#10b981)',
            color:'#fff', border:'none', borderRadius:'14px',
            fontWeight:800, fontSize:'1.05rem', cursor: (loading || isLocked) ? 'not-allowed' : 'pointer',
            boxShadow:'0 6px 20px rgba(14,165,233,0.3)',
            transition:'all 0.25s',
            display:'flex', alignItems:'center', justifyContent:'center', gap:'0.5rem',
          }}>
            {loading
              ? <><Loader2 size={18} style={{ animation:'spin 0.8s linear infinite' }}/> Signing in…</>
              : <><ShieldCheck size={18}/> Sign In to Dashboard</>
            }
          </button>
        </form>

        <p style={{ textAlign:'center', marginTop:'1.5rem', color:'#94a3b8', fontSize:'0.78rem', marginBottom:0 }}>
          🔒 Secure admin access · Apollo Clinic Srinagar
        </p>
      </div>

      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
};

export default Login;
