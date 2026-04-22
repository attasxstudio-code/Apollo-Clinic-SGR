import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShieldCheck, User, Calendar, Loader2, FileText, AlertTriangle, Lock, ArrowRight, Search } from 'lucide-react';

const Reports = () => {
  const navigate = useNavigate();
  const [step, setStep]         = useState('form'); // form | loading | results | error
  const [fullName, setFullName] = useState('');
  const [dob, setDob]           = useState('');
  const [error, setError]       = useState('');
  const [reports, setReports]   = useState([]);
  const [attempts, setAttempts] = useState(0);

  const handleLookup = async (e) => {
    e.preventDefault();
    setError('');

    if (!fullName.trim() || fullName.trim().length < 2) {
      return setError('Please enter your full name (minimum 2 characters).');
    }
    if (!dob) {
      return setError('Please enter your date of birth.');
    }

    setStep('loading');

    try {
      const res = await fetch('/api/reports/lookup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fullName: fullName.toUpperCase().trim(), dob }),
      });

      const data = await res.json();

      if (!res.ok) {
        setAttempts(prev => prev + 1);
        setError(data.error || 'No reports found. Please try again.');
        setStep('form');
        return;
      }

      setReports(data.reports || []);
      setStep('results');
    } catch (err) {
      setError('Network error. Please check your connection and try again.');
      setStep('form');
    }
  };

  const viewReport = (token) => {
    navigate(`/report/${token}`);
  };

  const resetForm = () => {
    setStep('form');
    setReports([]);
    setError('');
  };

  /* ═══════════════════════════════════════════
     RENDER: SEARCH FORM
  ═══════════════════════════════════════════ */
  if (step === 'form' || step === 'loading') {
    return (
      <div style={{
        minHeight: '100vh',
        background: 'linear-gradient(180deg,#f0f9ff,#f8fafc)',
        padding: '2rem 1.25rem 4rem',
      }}>
        <div className="container" style={{ maxWidth: '520px', margin: '0 auto' }}>

          {/* Header */}
          <div style={{ textAlign: 'center', marginBottom: '2rem', paddingTop: '1rem' }}>
            <div style={{
              width: 64, height: 64, borderRadius: '16px', margin: '0 auto 1rem',
              background: 'linear-gradient(135deg,#0369a1,#0ea5e9)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: '0 8px 24px rgba(3,105,161,0.25)',
            }}>
              <FileText size={28} color="#fff" strokeWidth={2.5} />
            </div>
            <h1 style={{
              color: '#0c4a6e', fontWeight: 900, fontSize: 'clamp(1.4rem,4vw,1.75rem)',
              marginBottom: '0.4rem', letterSpacing: '-0.02em',
            }}>
              Access Your Test Reports
            </h1>
            <p style={{ color: '#64748b', fontSize: '0.9rem', margin: 0, lineHeight: 1.6 }}>
              Apollo Clinic Srinagar — Secure Patient Report Access
            </p>
          </div>

          {/* Form card */}
          <div style={{
            background: '#fff', borderRadius: '20px',
            padding: 'clamp(1.5rem, 5vw, 2.5rem)',
            boxShadow: '0 12px 40px rgba(14,165,233,0.1)',
            border: '1.5px solid #cce5f6',
            position: 'relative', overflow: 'hidden',
          }}>
            {/* Top gradient bar */}
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '4px',
              background: 'linear-gradient(90deg,#0369a1,#0ea5e9,#10b981)' }} />

            {/* Security notice */}
            <div style={{
              background: 'linear-gradient(135deg,#f0f9ff,#ecfdf5)',
              border: '1.5px solid #bae6fd',
              borderRadius: '12px', padding: '0.85rem 1rem', marginBottom: '1.5rem',
            }}>
              <p style={{ color: '#0369a1', fontSize: '0.8rem', margin: 0, lineHeight: 1.6, fontWeight: 500 }}>
                🔒 Enter your <strong>full name in CAPITAL LETTERS</strong> and <strong>date of birth</strong> exactly as provided when your report was submitted. This ensures only you can access your results.
              </p>
            </div>

            {/* Error */}
            {error && (
              <div style={{
                background: '#fff1f2', border: '1.5px solid #fecdd3',
                color: '#be123c', padding: '0.8rem 1rem',
                borderRadius: '10px', marginBottom: '1.25rem',
                fontSize: '0.83rem', textAlign: 'center', lineHeight: 1.5,
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.45rem',
              }}>
                <AlertTriangle size={15} style={{ flexShrink: 0 }} />
                {error}
              </div>
            )}

            {/* Rate limit warning */}
            {attempts >= 3 && (
              <div style={{
                background: '#fffbeb', border: '1.5px solid #fde68a',
                color: '#92400e', padding: '0.7rem 0.9rem',
                borderRadius: '10px', marginBottom: '1rem',
                fontSize: '0.78rem', textAlign: 'center', fontWeight: 600,
              }}>
                ⚠️ Multiple failed attempts. Access may be temporarily restricted.
              </div>
            )}

            <form onSubmit={handleLookup}>
              {/* Full Name */}
              <div style={{ marginBottom: '1.15rem' }}>
                <label style={{ display: 'block', marginBottom: '0.4rem', fontWeight: 700, color: '#334155', fontSize: '0.86rem' }}>
                  Full Name (CAPITAL LETTERS) *
                </label>
                <div style={{ position: 'relative' }}>
                  <User size={15} style={{ position: 'absolute', left: '0.85rem', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
                  <input
                    type="text"
                    placeholder="e.g. AISHA BHAT"
                    value={fullName}
                    onChange={e => setFullName(e.target.value.toUpperCase())}
                    required
                    maxLength={100}
                    style={{
                      width: '100%', padding: '0.8rem 1rem 0.8rem 2.65rem',
                      border: '1.5px solid #cce5f6', borderRadius: '10px',
                      background: '#f0f9ff', fontSize: '0.92rem', fontFamily: 'inherit',
                      color: '#0f172a', fontWeight: 700, letterSpacing: '0.03em',
                      transition: 'all 0.25s', outline: 'none',
                    }}
                    onFocus={e => { e.target.style.borderColor = '#0ea5e9'; e.target.style.background = '#fff'; e.target.style.boxShadow = '0 0 0 3px rgba(14,165,233,0.12)'; }}
                    onBlur={e => { e.target.style.borderColor = '#cce5f6'; e.target.style.background = '#f0f9ff'; e.target.style.boxShadow = 'none'; }}
                  />
                </div>
              </div>

              {/* DOB */}
              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{ display: 'block', marginBottom: '0.4rem', fontWeight: 700, color: '#334155', fontSize: '0.86rem' }}>
                  Date of Birth *
                </label>
                <div style={{ position: 'relative' }}>
                  <Calendar size={15} style={{ position: 'absolute', left: '0.85rem', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8', pointerEvents: 'none' }} />
                  <input
                    type="date"
                    value={dob}
                    onChange={e => setDob(e.target.value)}
                    required
                    style={{
                      width: '100%', padding: '0.8rem 1rem 0.8rem 2.65rem',
                      border: '1.5px solid #cce5f6', borderRadius: '10px',
                      background: '#f0f9ff', fontSize: '0.92rem', fontFamily: 'inherit',
                      color: '#0f172a', transition: 'all 0.25s', outline: 'none',
                    }}
                    onFocus={e => { e.target.style.borderColor = '#0ea5e9'; e.target.style.background = '#fff'; e.target.style.boxShadow = '0 0 0 3px rgba(14,165,233,0.12)'; }}
                    onBlur={e => { e.target.style.borderColor = '#cce5f6'; e.target.style.background = '#f0f9ff'; e.target.style.boxShadow = 'none'; }}
                  />
                </div>
              </div>

              {/* Submit */}
              <button type="submit" disabled={step === 'loading'} style={{
                width: '100%', minHeight: '50px',
                background: step === 'loading'
                  ? 'linear-gradient(135deg,#93c5fd,#6ee7b7)'
                  : 'linear-gradient(135deg,#0369a1,#0ea5e9,#10b981)',
                color: '#fff', border: 'none', borderRadius: '12px',
                fontWeight: 800, fontSize: '1rem', cursor: step === 'loading' ? 'wait' : 'pointer',
                boxShadow: '0 6px 20px rgba(14,165,233,0.3)',
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem',
                fontFamily: 'inherit', transition: 'all 0.25s',
              }}>
                {step === 'loading'
                  ? <><Loader2 size={17} style={{ animation: 'spin 0.8s linear infinite' }} /> Searching…</>
                  : <><Search size={17} /> Find My Reports</>
                }
              </button>
            </form>

            <div style={{ textAlign: 'center', marginTop: '1.25rem', paddingTop: '0.85rem', borderTop: '1px solid #e2e8f0' }}>
              <p style={{ color: '#94a3b8', fontSize: '0.74rem', margin: '0 0 0.35rem' }}>
                🔒 Your data is verified securely. We do not store your lookup details.
              </p>
              <Link to="/" style={{ color: '#0369a1', fontSize: '0.78rem', fontWeight: 600 }}>
                ← Back to Apollo Clinic
              </Link>
            </div>
          </div>

          {/* Help text */}
          <div style={{
            marginTop: '1.5rem', background: '#fff', borderRadius: '14px',
            padding: '1.1rem 1.25rem', border: '1px solid #e2e8f0',
          }}>
            <h4 style={{ color: '#0c4a6e', fontWeight: 800, fontSize: '0.85rem', margin: '0 0 0.5rem' }}>
              Having trouble finding your report?
            </h4>
            <ul style={{ color: '#64748b', fontSize: '0.8rem', lineHeight: 1.7, margin: 0, paddingLeft: '1.1rem' }}>
              <li>Make sure your name is in <strong>CAPITAL LETTERS</strong></li>
              <li>Enter your date of birth exactly as provided to the clinic</li>
              <li>Reports are available after the clinic processes your results</li>
              <li>If you received a direct link via WhatsApp, use that link instead</li>
              <li>Contact the clinic at <a href="tel:+919000000000" style={{ color: '#0369a1', fontWeight: 600 }}>+91 9000000000</a> for help</li>
            </ul>
          </div>
        </div>

        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  /* ═══════════════════════════════════════════
     RENDER: RESULTS
  ═══════════════════════════════════════════ */
  if (step === 'results' && reports.length > 0) {
    return (
      <div style={{
        minHeight: '100vh',
        background: 'linear-gradient(180deg,#f0f9ff,#f8fafc)',
        padding: '2rem 1.25rem 4rem',
      }}>
        <div className="container" style={{ maxWidth: '600px', margin: '0 auto' }}>

          {/* Header */}
          <div style={{ textAlign: 'center', marginBottom: '1.5rem', paddingTop: '1rem' }}>
            <div style={{
              width: 56, height: 56, borderRadius: '14px', margin: '0 auto 0.85rem',
              background: 'linear-gradient(135deg,#059669,#10b981)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: '0 6px 20px rgba(5,150,105,0.25)',
            }}>
              <ShieldCheck size={26} color="#fff" strokeWidth={2.5} />
            </div>
            <h2 style={{
              color: '#0c4a6e', fontWeight: 900, fontSize: 'clamp(1.3rem,4vw,1.6rem)',
              marginBottom: '0.3rem',
            }}>
              Reports Found
            </h2>
            <p style={{ color: '#64748b', fontSize: '0.85rem', margin: 0 }}>
              {reports.length} report{reports.length > 1 ? 's' : ''} found for <strong style={{ color: '#0c4a6e' }}>{fullName}</strong>
            </p>
          </div>

          {/* Verified badge */}
          <div style={{
            background: '#f0fdf4', border: '1.5px solid #bbf7d0',
            borderRadius: '12px', padding: '0.75rem 1rem', marginBottom: '1.25rem',
            display: 'flex', alignItems: 'center', gap: '0.5rem',
          }}>
            <ShieldCheck size={16} color="#059669" />
            <span style={{ color: '#047857', fontSize: '0.82rem', fontWeight: 600 }}>
              Identity verified — your reports are listed below
            </span>
          </div>

          {/* Report cards */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', marginBottom: '1.5rem' }}>
            {reports.map((report, i) => (
              <div key={i} style={{
                background: '#fff', border: '1.5px solid #e2e8f0', borderRadius: '14px',
                overflow: 'hidden', transition: 'all 0.25s',
              }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = '#bae6fd'; e.currentTarget.style.boxShadow = '0 6px 24px rgba(14,165,233,0.12)'; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = '#e2e8f0'; e.currentTarget.style.boxShadow = 'none'; }}
              >
                <div style={{ padding: '1.15rem 1.25rem' }}>
                  <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '1rem' }}>
                    <div style={{ flex: 1 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.4rem' }}>
                        <FileText size={16} color="#0369a1" />
                        <h3 style={{ color: '#0c4a6e', fontWeight: 800, fontSize: '0.95rem', margin: 0 }}>
                          {report.title}
                        </h3>
                      </div>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                        {report.date && (
                          <span style={{ background: '#f0f9ff', color: '#0369a1', border: '1px solid #bae6fd', fontSize: '0.72rem', fontWeight: 600, padding: '0.18rem 0.5rem', borderRadius: '5px' }}>
                            📅 {report.date}
                          </span>
                        )}
                        {report.type && (
                          <span style={{ background: '#f8fafc', color: '#64748b', border: '1px solid #e2e8f0', fontSize: '0.72rem', fontWeight: 600, padding: '0.18rem 0.5rem', borderRadius: '5px' }}>
                            🔬 {report.type}
                          </span>
                        )}
                        <span style={{ background: '#f0fdf4', color: '#047857', border: '1px solid #bbf7d0', fontSize: '0.72rem', fontWeight: 600, padding: '0.18rem 0.5rem', borderRadius: '5px' }}>
                          {report.mimeType === 'application/pdf' ? '📄 PDF' : '🖼️ Image'}
                        </span>
                      </div>
                    </div>

                    <button onClick={() => viewReport(report.token)} style={{
                      display: 'flex', alignItems: 'center', gap: '0.35rem',
                      padding: '0.55rem 1rem', borderRadius: '10px',
                      background: 'linear-gradient(135deg,#0369a1,#0ea5e9)',
                      color: '#fff', border: 'none', fontWeight: 700, fontSize: '0.8rem',
                      cursor: 'pointer', fontFamily: 'inherit',
                      boxShadow: '0 3px 12px rgba(3,105,161,0.2)',
                      whiteSpace: 'nowrap', flexShrink: 0,
                    }}>
                      View <ArrowRight size={13} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Privacy notice */}
          <div style={{
            background: '#fffbeb', border: '1px solid #fde68a', borderRadius: '10px',
            padding: '0.7rem 0.9rem', marginBottom: '1.25rem',
            fontSize: '0.76rem', color: '#92400e', fontWeight: 500,
          }}>
            🔒 These reports are for your private use only. Do not share access credentials with others.
          </div>

          {/* Actions */}
          <div style={{ display: 'flex', gap: '0.65rem', flexWrap: 'wrap' }}>
            <button onClick={resetForm} style={{
              flex: 1, padding: '0.7rem', background: '#f8fafc', border: '1.5px solid #e2e8f0',
              borderRadius: '10px', color: '#334155', fontWeight: 700, fontSize: '0.85rem',
              cursor: 'pointer', fontFamily: 'inherit',
            }}>
              ← Search Again
            </button>
            <Link to="/" style={{
              flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center',
              padding: '0.7rem', background: '#0369a1', borderRadius: '10px',
              color: '#fff', fontWeight: 700, fontSize: '0.85rem', textDecoration: 'none',
            }}>
              Apollo Clinic Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  /* ═══════════════════════════════════════════
     RENDER: ERROR FALLBACK
  ═══════════════════════════════════════════ */
  return (
    <div style={{
      minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
      background: 'linear-gradient(160deg,#f0f9ff,#e0f2fe,#ecfdf5)', padding: '1.25rem',
    }}>
      <div style={{
        maxWidth: 400, textAlign: 'center', background: '#fff',
        padding: '2.5rem 2rem', borderRadius: '20px',
        boxShadow: '0 12px 40px rgba(14,165,233,0.12)',
        border: '1.5px solid #e2e8f0',
      }}>
        <AlertTriangle size={42} color="#dc2626" style={{ marginBottom: '0.85rem' }} />
        <h2 style={{ color: '#991b1b', fontWeight: 800, fontSize: '1.2rem', marginBottom: '0.4rem' }}>
          Something Went Wrong
        </h2>
        <p style={{ color: '#64748b', fontSize: '0.88rem', marginBottom: '1.25rem' }}>
          Please try again or contact Apollo Clinic.
        </p>
        <button onClick={resetForm} style={{
          padding: '0.7rem 1.5rem', borderRadius: '10px',
          background: 'linear-gradient(135deg,#0369a1,#0ea5e9)',
          color: '#fff', fontWeight: 700, fontSize: '0.88rem',
          border: 'none', cursor: 'pointer', fontFamily: 'inherit',
        }}>
          Try Again
        </button>
      </div>
    </div>
  );
};

export default Reports;
