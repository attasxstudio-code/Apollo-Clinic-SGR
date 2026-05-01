import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShieldCheck, User, Calendar, Loader2, FileText, AlertTriangle, ArrowRight, Search } from 'lucide-react';

import { PRIMARY_PHONE, PRIMARY_PHONE_HREF } from '../config/contact';

const Reports = () => {
  const navigate = useNavigate();
  const [step,     setStep]     = useState('form'); // form | loading | results | error
  const [fullName, setFullName] = useState('');
  const [dob,      setDob]      = useState('');
  const [error,    setError]    = useState('');
  const [reports,  setReports]  = useState([]);
  const [attempts, setAttempts] = useState(0);

  const handleLookup = async (e) => {
    e.preventDefault();
    setError('');
    if (!fullName.trim() || fullName.trim().length < 2)
      return setError('Please enter your full name (minimum 2 characters).');
    if (!dob)
      return setError('Please enter your date of birth.');
    setStep('loading');
    try {
      const res  = await fetch('/api/reports/lookup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fullName: fullName.toUpperCase().trim(), dob }),
      });
      const data = await res.json();
      if (!res.ok) {
        setAttempts(p => p + 1);
        setError(data.error || 'No reports found. Please try again.');
        setStep('form');
        return;
      }
      setReports(data.reports || []);
      setStep('results');
    } catch {
      setError('Network error. Please check your connection and try again.');
      setStep('form');
    }
  };

  const viewReport = (token) => navigate(`/report/${token}`);
  const resetForm  = () => { setStep('form'); setReports([]); setError(''); };

  /* ── FORM ── */
  if (step === 'form' || step === 'loading') {
    return (
      <div style={{
        minHeight: '100vh', background: 'var(--bg)',
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        padding: '2rem 1.25rem 4rem',
      }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{
            width: 56, height: 56, borderRadius: 'var(--r-xl)',
            margin: '0 auto 1rem',
            background: 'var(--blue-light)', color: 'var(--blue)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            border: '1px solid var(--blue-border)',
          }}>
            <FileText size={26} strokeWidth={2} />
          </div>
          <h1 style={{
            color: 'var(--heading)', fontWeight: 800,
            fontSize: 'clamp(1.3rem,4vw,1.65rem)',
            marginBottom: '0.4rem', letterSpacing: '-0.02em',
          }}>
            Online Report Access
          </h1>
          <p style={{ color: 'var(--body)', fontSize: '0.88rem', margin: 0, lineHeight: 1.6 }}>
            Securely view and download your laboratory and diagnostic reports.
          </p>
        </div>

        {/* Card */}
        <div style={{
          background: '#fff', borderRadius: 'var(--r-2xl)',
          padding: '2rem', width: '100%', maxWidth: 400,
          boxShadow: 'var(--shadow-sm)', border: '1px solid var(--border)',
        }}>

          {/* Error */}
          {error && (
            <div style={{
              background: 'var(--red-light)', border: '1px solid #fecdd3',
              color: 'var(--red)', padding: '0.75rem 1rem',
              borderRadius: 'var(--r-md)', marginBottom: '1.25rem',
              fontSize: '0.83rem', lineHeight: 1.5,
              display: 'flex', alignItems: 'flex-start', gap: '0.45rem',
            }}>
              <AlertTriangle size={15} style={{ flexShrink: 0, marginTop: '1px' }} />
              {error}
            </div>
          )}

          {attempts >= 3 && (
            <div style={{
              background: '#fffbeb', border: '1px solid #fde68a',
              color: '#92400e', padding: '0.65rem 0.9rem',
              borderRadius: 'var(--r-md)', marginBottom: '1rem',
              fontSize: '0.78rem', fontWeight: 600,
            }}>
              ⚠️ Multiple failed attempts. Access may be temporarily restricted.
            </div>
          )}

          <form onSubmit={handleLookup} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {/* Patient ID / Name */}
            <div className="form-group">
              <label className="form-label">Patient ID or Registered Mobile Number</label>
              <div style={{ position: 'relative' }}>
                <User size={14} style={{ position: 'absolute', left: '0.85rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--muted)', pointerEvents: 'none' }} />
                <input
                  type="text" className="form-input"
                  placeholder="Enter Patient ID or Mobile"
                  value={fullName}
                  onChange={e => setFullName(e.target.value.toUpperCase())}
                  required maxLength={100}
                  style={{ paddingLeft: '2.5rem' }}
                />
              </div>
            </div>

            {/* DOB */}
            <div className="form-group">
              <label className="form-label">Date of Birth or Report ID</label>
              <div style={{ position: 'relative' }}>
                <Calendar size={14} style={{ position: 'absolute', left: '0.85rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--muted)', pointerEvents: 'none' }} />
                <input
                  type="date" className="form-input"
                  value={dob}
                  onChange={e => setDob(e.target.value)}
                  required
                  style={{ paddingLeft: '2.5rem' }}
                />
              </div>
            </div>

            {/* Privacy note */}
            <p style={{ fontSize: '0.72rem', color: 'var(--muted)', margin: 0, textAlign: 'center', lineHeight: 1.6 }}>
              🔒 Your health data is protected with end-to-end encryption.<br />
              Results available within 24 hours after sample collection.
            </p>

            <button
              type="submit" disabled={step === 'loading'}
              className="btn btn-primary"
              style={{ width: '100%', justifyContent: 'center', minHeight: 48, borderRadius: 'var(--r-md)', fontSize: '0.92rem' }}
            >
              {step === 'loading'
                ? <><Loader2 size={16} style={{ animation: 'spin 0.8s linear infinite' }} /> Searching…</>
                : <><Search size={16} /> View Report →</>
              }
            </button>
          </form>

          <div style={{ marginTop: '1.1rem', paddingTop: '1rem', borderTop: '1px solid var(--border)' }}>
            <Link to="/" className="btn btn-outline" style={{ width: '100%', justifyContent: 'center', borderRadius: 'var(--r-md)' }}>
              ← Back to Apollo
            </Link>
          </div>
        </div>

        {/* Help box */}
        <div style={{
          marginTop: '1.25rem', background: '#fff', borderRadius: 'var(--r-xl)',
          padding: '1.1rem 1.25rem', border: '1px solid var(--border)',
          width: '100%', maxWidth: 400,
        }}>
          <h4 style={{ color: 'var(--heading)', fontWeight: 700, fontSize: '0.84rem', margin: '0 0 0.5rem' }}>
            Having trouble finding your report?
          </h4>
          <ul style={{ color: 'var(--body)', fontSize: '0.8rem', lineHeight: 1.7, margin: 0, paddingLeft: '1.1rem' }}>
            <li>Make sure your name is in <strong>CAPITAL LETTERS</strong></li>
            <li>Enter your date of birth exactly as provided to the clinic</li>
            <li>Reports are available after the clinic processes your results</li>
            <li>Contact us at <a href={PRIMARY_PHONE_HREF} style={{ color: 'var(--blue)', fontWeight: 600 }}>{PRIMARY_PHONE}</a> for help</li>
          </ul>
        </div>

        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  /* ── RESULTS ── */
  if (step === 'results' && reports.length > 0) {
    return (
      <div style={{
        minHeight: '100vh', background: 'var(--bg)',
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        padding: '2rem 1.25rem 4rem',
      }}>
        <div style={{ width: '100%', maxWidth: 520 }}>
          {/* Header */}
          <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
            <div style={{ width: 52, height: 52, borderRadius: 'var(--r-xl)', margin: '0 auto 0.85rem', background: 'var(--green-light)', color: 'var(--green)', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid var(--green-border)' }}>
              <ShieldCheck size={24} />
            </div>
            <h2 style={{ color: 'var(--heading)', fontWeight: 800, fontSize: 'clamp(1.2rem,4vw,1.5rem)', marginBottom: '0.3rem' }}>
              Reports Found
            </h2>
            <p style={{ color: 'var(--body)', fontSize: '0.85rem', margin: 0 }}>
              {reports.length} report{reports.length > 1 ? 's' : ''} found for <strong style={{ color: 'var(--heading)' }}>{fullName}</strong>
            </p>
          </div>

          {/* Verified badge */}
          <div style={{ background: 'var(--green-light)', border: '1px solid var(--green-border)', borderRadius: 'var(--r-lg)', padding: '0.75rem 1rem', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <ShieldCheck size={15} color="var(--green)" />
            <span style={{ color: 'var(--green)', fontSize: '0.82rem', fontWeight: 600 }}>Identity verified — your reports are listed below</span>
          </div>

          {/* Report cards */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1.25rem' }}>
            {reports.map((rep, i) => (
              <div key={i} style={{
                background: '#fff', border: '1px solid var(--border)',
                borderRadius: 'var(--r-xl)', padding: '1.1rem 1.25rem',
                display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem',
                transition: 'all 0.2s',
              }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--blue-border)'; e.currentTarget.style.boxShadow = 'var(--shadow-sm)'; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.boxShadow = 'none'; }}
              >
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.35rem' }}>
                    <FileText size={15} color="var(--blue)" />
                    <span style={{ fontWeight: 700, color: 'var(--heading)', fontSize: '0.92rem' }}>{rep.title}</span>
                  </div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem' }}>
                    {rep.date && <span style={{ background: 'var(--blue-light)', color: 'var(--blue)', border: '1px solid var(--blue-border)', fontSize: '0.68rem', fontWeight: 600, padding: '0.15rem 0.5rem', borderRadius: 'var(--r-sm)' }}>📅 {rep.date}</span>}
                    {rep.type && <span style={{ background: 'var(--bg)', color: 'var(--muted)', border: '1px solid var(--border)', fontSize: '0.68rem', fontWeight: 600, padding: '0.15rem 0.5rem', borderRadius: 'var(--r-sm)' }}>🔬 {rep.type}</span>}
                    <span style={{ background: 'var(--green-light)', color: 'var(--green)', border: '1px solid var(--green-border)', fontSize: '0.68rem', fontWeight: 600, padding: '0.15rem 0.5rem', borderRadius: 'var(--r-sm)' }}>
                      {rep.mimeType === 'application/pdf' ? '📄 PDF' : '🖼️ Image'}
                    </span>
                  </div>
                </div>
                <button onClick={() => viewReport(rep.token)}
                  className="btn btn-primary btn-sm"
                  style={{ flexShrink: 0, borderRadius: 'var(--r-md)', gap: '0.3rem' }}
                >
                  View <ArrowRight size={13} />
                </button>
              </div>
            ))}
          </div>

          <div style={{ background: '#fffbeb', border: '1px solid #fde68a', borderRadius: 'var(--r-lg)', padding: '0.7rem 0.9rem', marginBottom: '1.25rem', fontSize: '0.76rem', color: '#92400e', fontWeight: 500 }}>
            🔒 These reports are for your private use only. Do not share access credentials with others.
          </div>

          <div style={{ display: 'flex', gap: '0.65rem' }}>
            <button onClick={resetForm} className="btn btn-ghost" style={{ flex: 1, justifyContent: 'center', borderRadius: 'var(--r-md)' }}>← Search Again</button>
            <Link to="/" className="btn btn-primary" style={{ flex: 1, justifyContent: 'center', borderRadius: 'var(--r-md)', textDecoration: 'none' }}>Apollo Clinic Home</Link>
          </div>
        </div>
      </div>
    );
  }

  /* ── ERROR FALLBACK ── */
  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--bg)', padding: '1.25rem' }}>
      <div style={{ maxWidth: 360, textAlign: 'center', background: '#fff', padding: '2.5rem 2rem', borderRadius: 'var(--r-2xl)', boxShadow: 'var(--shadow-sm)', border: '1px solid var(--border)' }}>
        <AlertTriangle size={40} color="var(--red)" style={{ marginBottom: '0.85rem' }} />
        <h2 style={{ color: 'var(--heading)', fontWeight: 800, fontSize: '1.1rem', marginBottom: '0.4rem' }}>Something Went Wrong</h2>
        <p style={{ color: 'var(--body)', fontSize: '0.87rem', marginBottom: '1.25rem' }}>Please try again or contact Apollo Clinic.</p>
        <button onClick={resetForm} className="btn btn-primary" style={{ width: '100%', justifyContent: 'center', borderRadius: 'var(--r-md)' }}>Try Again</button>
      </div>
    </div>
  );
};

export default Reports;
