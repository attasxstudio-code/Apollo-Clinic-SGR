import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ShieldCheck, User, Calendar, Loader2, FileText, Download, AlertTriangle, CheckCircle, Lock } from 'lucide-react';

/* ── PDF Viewer: blob URL iframe on desktop, download card on mobile ── */
const PdfViewer = ({ dataUri, title, onDownload }) => {
  const [blobUrl, setBlobUrl] = useState(null);
  const [error, setError]     = useState(false);

  // Mobile browsers (Android, iOS) can't render PDFs inside iframes
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    typeof navigator !== 'undefined' ? navigator.userAgent : ''
  );

  useEffect(() => {
    if (!dataUri) return;
    try {
      const match = dataUri.match(/^data:([^;]+);base64,(.+)$/);
      if (!match) { setError(true); return; }

      const mimeType = match[1];
      const base64   = match[2];
      const binary   = atob(base64);
      const bytes    = new Uint8Array(binary.length);
      for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);

      const blob = new Blob([bytes], { type: mimeType });
      const url  = URL.createObjectURL(blob);
      setBlobUrl(url);

      return () => URL.revokeObjectURL(url);
    } catch (e) {
      console.error('PDF blob conversion failed:', e);
      setError(true);
    }
  }, [dataUri]);

  /* Mobile → show download card instead of blank iframe */
  if (isMobile || error) {
    return (
      <div style={{
        padding: 'clamp(2rem,6vw,3rem) 1.5rem', textAlign: 'center',
        background: 'linear-gradient(135deg,#f8fafc,#f0f9ff)',
      }}>
        <div style={{
          width: 72, height: 72, borderRadius: '18px', margin: '0 auto 1.25rem',
          background: 'linear-gradient(135deg,#0369a1,#0ea5e9)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: '0 8px 24px rgba(3,105,161,0.25)',
        }}>
          <FileText size={32} color="#fff" strokeWidth={2} />
        </div>
        <h3 style={{ color: '#0c4a6e', fontWeight: 800, fontSize: '1.1rem', margin: '0 0 0.4rem' }}>
          Your Report is Ready
        </h3>
        <p style={{ color: '#64748b', fontSize: '0.85rem', marginBottom: '1.5rem', lineHeight: 1.6 }}>
          {isMobile && !error
            ? 'Tap the button below to download and view your report.'
            : 'Unable to preview this PDF. Please download it instead.'}
        </p>
        <button
          onClick={() => {
            if (blobUrl) {
              const link = document.createElement('a');
              link.href = blobUrl;
              link.download = `${title || 'report'}.pdf`;
              link.click();
            } else if (dataUri) {
              const link = document.createElement('a');
              link.href = dataUri;
              link.download = `${title || 'report'}.pdf`;
              link.click();
            }
          }}
          style={{
            display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
            padding: '0.9rem 2rem', borderRadius: '12px',
            background: 'linear-gradient(135deg,#0369a1,#0ea5e9)',
            color: '#fff', fontWeight: 800, fontSize: '1rem',
            border: 'none', cursor: 'pointer', fontFamily: 'inherit',
            boxShadow: '0 6px 20px rgba(3,105,161,0.3)',
          }}
        >
          <Download size={18} /> Download Report (PDF)
        </button>
        <p style={{ color: '#94a3b8', fontSize: '0.72rem', marginTop: '1rem' }}>
          The file will open in your device's PDF viewer
        </p>
      </div>
    );
  }

  if (!blobUrl) {
    return (
      <div style={{ padding: '2rem', textAlign: 'center', color: '#94a3b8' }}>
        Loading preview…
      </div>
    );
  }

  /* Desktop → inline iframe preview */
  return (
    <iframe
      src={blobUrl}
      title={title || 'Test Report'}
      style={{ width: '100%', height: '80vh', border: 'none', display: 'block' }}
    />
  );
};

const ReportVerify = () => {
  const { token } = useParams();
  const [step, setStep]           = useState('verify'); // verify | loading | success | error
  const [fullName, setFullName]   = useState('');
  const [dob, setDob]             = useState('');
  const [error, setError]         = useState('');
  const [report, setReport]       = useState(null);
  const [attempts, setAttempts]   = useState(0);

  const handleVerify = async (e) => {
    e.preventDefault();
    setError('');

    if (!fullName.trim() || fullName.trim().length < 2) {
      return setError('Please enter your full name.');
    }
    if (!dob) {
      return setError('Please enter your date of birth.');
    }

    setStep('loading');

    try {
      const res = await fetch('/api/reports/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, fullName: fullName.toUpperCase().trim(), dob }),
      });

      const data = await res.json();

      if (!res.ok) {
        setAttempts(prev => prev + 1);
        setError(data.error || 'Verification failed. Please try again.');
        setStep('verify');
        return;
      }

      setReport(data.report);
      setStep('success');
    } catch (err) {
      setError('Network error. Please check your connection and try again.');
      setStep('verify');
    }
  };

  const isPdf = report?.mimeType === 'application/pdf';
  const isImage = report?.mimeType?.startsWith('image/');

  /* ═══════════════════════════════════════════
     RENDER: VERIFICATION FORM
  ═══════════════════════════════════════════ */
  if (step === 'verify' || step === 'loading') {
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
          width: '100%', maxWidth: '460px',
          background: '#fff', borderRadius: '24px',
          padding: 'clamp(1.75rem, 6vw, 3rem) clamp(1.25rem, 5vw, 2.5rem)',
          boxShadow: '0 16px 50px rgba(14,165,233,0.15)',
          border: '1.5px solid #cce5f6',
          position: 'relative', overflow: 'hidden',
        }}>
          {/* Top gradient */}
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
              <Lock size={32} color="#fff" strokeWidth={2.5} />
            </div>
            <h2 style={{ color:'#0c4a6e', fontWeight:800, margin:'0 0 0.4rem', fontSize:'clamp(1.3rem,4vw,1.65rem)' }}>
              Secure Report Access
            </h2>
            <p style={{ color:'#64748b', fontSize:'0.9rem', margin:0, lineHeight:1.6 }}>
              Appolo Clinic Srinagar — Patient Verification
            </p>
          </div>

          {/* Info notice */}
          <div style={{
            background:'linear-gradient(135deg,#f0f9ff,#ecfdf5)',
            border:'1.5px solid #bae6fd',
            borderRadius:'14px', padding:'1rem 1.15rem', marginBottom:'1.5rem',
          }}>
            <p style={{ color:'#0369a1', fontSize:'0.82rem', margin:0, lineHeight:1.6, fontWeight:500 }}>
              🔒 To protect your privacy, please verify your identity below. Enter your <strong>full name in CAPITAL LETTERS</strong> and your <strong>date of birth</strong> exactly as provided to the clinic.
            </p>
          </div>

          {/* Error */}
          {error && (
            <div style={{
              background:'#fff1f2', border:'1.5px solid #fecdd3',
              color:'#be123c', padding:'0.85rem 1rem',
              borderRadius:'12px', marginBottom:'1.25rem',
              fontSize:'0.85rem', textAlign:'center', lineHeight:1.5,
              display:'flex', alignItems:'center', justifyContent:'center', gap:'0.5rem',
            }}>
              <AlertTriangle size={16} style={{ flexShrink:0 }} />
              {error}
            </div>
          )}

          {/* Rate limit warning */}
          {attempts >= 3 && (
            <div style={{
              background:'#fffbeb', border:'1.5px solid #fde68a',
              color:'#92400e', padding:'0.75rem 1rem',
              borderRadius:'12px', marginBottom:'1rem',
              fontSize:'0.8rem', textAlign:'center', fontWeight:600,
            }}>
              ⚠️ Multiple failed attempts detected. Your access may be temporarily restricted.
            </div>
          )}

          <form onSubmit={handleVerify}>
            {/* Full Name */}
            <div style={{ marginBottom:'1.25rem' }}>
              <label style={{ display:'block', marginBottom:'0.5rem', fontWeight:700, color:'#334155', fontSize:'0.88rem' }}>
                Full Name (CAPITAL LETTERS) *
              </label>
              <div style={{ position:'relative' }}>
                <User size={16} style={{ position:'absolute', left:'0.9rem', top:'50%', transform:'translateY(-50%)', color:'#94a3b8' }} />
                <input
                  type="text"
                  placeholder="e.g. AISHA BHAT"
                  value={fullName}
                  onChange={e => setFullName(e.target.value.toUpperCase())}
                  required
                  maxLength={100}
                  style={{
                    width:'100%', padding:'0.85rem 1rem 0.85rem 2.8rem',
                    border:'1.5px solid #cce5f6', borderRadius:'12px',
                    background:'#f0f9ff', fontSize:'0.95rem', fontFamily:'inherit',
                    color:'#0f172a', fontWeight:700, letterSpacing:'0.03em',
                    transition:'all 0.25s', outline:'none',
                  }}
                  onFocus={e => { e.target.style.borderColor='#0ea5e9'; e.target.style.background='#fff'; e.target.style.boxShadow='0 0 0 3px rgba(14,165,233,0.12)'; }}
                  onBlur={e => { e.target.style.borderColor='#cce5f6'; e.target.style.background='#f0f9ff'; e.target.style.boxShadow='none'; }}
                />
              </div>
            </div>

            {/* DOB */}
            <div style={{ marginBottom:'1.5rem' }}>
              <label style={{ display:'block', marginBottom:'0.5rem', fontWeight:700, color:'#334155', fontSize:'0.88rem' }}>
                Date of Birth *
              </label>
              <div style={{ position:'relative' }}>
                <Calendar size={16} style={{ position:'absolute', left:'0.9rem', top:'50%', transform:'translateY(-50%)', color:'#94a3b8', pointerEvents:'none' }} />
                <input
                  type="date"
                  value={dob}
                  onChange={e => setDob(e.target.value)}
                  required
                  style={{
                    width:'100%', padding:'0.85rem 1rem 0.85rem 2.8rem',
                    border:'1.5px solid #cce5f6', borderRadius:'12px',
                    background:'#f0f9ff', fontSize:'0.95rem', fontFamily:'inherit',
                    color:'#0f172a', transition:'all 0.25s', outline:'none',
                  }}
                  onFocus={e => { e.target.style.borderColor='#0ea5e9'; e.target.style.background='#fff'; e.target.style.boxShadow='0 0 0 3px rgba(14,165,233,0.12)'; }}
                  onBlur={e => { e.target.style.borderColor='#cce5f6'; e.target.style.background='#f0f9ff'; e.target.style.boxShadow='none'; }}
                />
              </div>
            </div>

            {/* Submit */}
            <button type="submit" disabled={step === 'loading'} style={{
              width:'100%', minHeight:'54px',
              background: step === 'loading'
                ? 'linear-gradient(135deg,#93c5fd,#6ee7b7)'
                : 'linear-gradient(135deg,#0369a1,#0ea5e9,#10b981)',
              color:'#fff', border:'none', borderRadius:'14px',
              fontWeight:800, fontSize:'1.05rem', cursor: step === 'loading' ? 'wait' : 'pointer',
              boxShadow:'0 6px 20px rgba(14,165,233,0.3)',
              display:'flex', alignItems:'center', justifyContent:'center', gap:'0.5rem',
              fontFamily:'inherit', transition:'all 0.25s',
            }}>
              {step === 'loading'
                ? <><Loader2 size={18} style={{ animation:'spin 0.8s linear infinite' }} /> Verifying…</>
                : <><ShieldCheck size={18} /> Verify & View Report</>
              }
            </button>
          </form>

          <div style={{ textAlign:'center', marginTop:'1.5rem', paddingTop:'1rem', borderTop:'1px solid #e2e8f0' }}>
            <p style={{ color:'#94a3b8', fontSize:'0.76rem', margin:'0 0 0.5rem' }}>
              🔒 Your data is verified securely. We do not store your verification details.
            </p>
            <Link to="/" style={{ color:'#0369a1', fontSize:'0.8rem', fontWeight:600 }}>
              ← Back to Appolo Clinic
            </Link>
          </div>
        </div>

        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  /* ═══════════════════════════════════════════
     RENDER: REPORT VIEW (after verification)
  ═══════════════════════════════════════════ */
  if (step === 'success' && report) {
    return (
      <div style={{
        minHeight: '100vh',
        background: 'linear-gradient(180deg,#f0f9ff,#f8fafc)',
      }}>
        {/* Header bar */}
        <div style={{
          background:'rgba(255,255,255,0.95)', backdropFilter:'blur(12px)',
          borderBottom:'1px solid rgba(14,165,233,0.12)',
          padding:'0.75rem 1.25rem',
          position:'sticky', top:0, zIndex:100,
          boxShadow:'0 2px 12px rgba(14,165,233,0.08)',
        }}>
          <div style={{ maxWidth:900, margin:'0 auto', display:'flex', justifyContent:'space-between', alignItems:'center' }}>
            <div style={{ display:'flex', alignItems:'center', gap:'0.65rem' }}>
              <div style={{
                background:'linear-gradient(135deg,#0ea5e9,#10b981)', borderRadius:'10px',
                padding:'5px', display:'flex', alignItems:'center', justifyContent:'center',
              }}>
                <ShieldCheck size={20} color="#fff" />
              </div>
              <div>
                <div style={{ fontWeight:800, fontSize:'0.85rem', color:'#0c4a6e', lineHeight:1.2 }}>Appolo Clinic</div>
                <div style={{ fontSize:'0.65rem', color:'#94a3b8' }}>Secure Report Viewer</div>
              </div>
            </div>

            <div style={{ display:'flex', gap:'0.5rem' }}>
              <button
                onClick={() => {
                  const link = document.createElement('a');
                  link.href = report.fileData;
                  link.download = `${report.title || 'report'}.${isPdf ? 'pdf' : 'jpg'}`;
                  link.click();
                }}
                style={{
                  display:'flex', alignItems:'center', gap:'0.35rem',
                  padding:'0.5rem 1rem', borderRadius:'10px',
                  background:'linear-gradient(135deg,#0369a1,#0ea5e9)',
                  color:'#fff', fontWeight:700, fontSize:'0.8rem',
                  cursor:'pointer', border:'none', fontFamily:'inherit',
                  boxShadow:'0 3px 12px rgba(3,105,161,0.25)',
                }}
              >
                <Download size={15} /> Download
              </button>
            </div>
          </div>
        </div>

        {/* Report info */}
        <div style={{ maxWidth:900, margin:'0 auto', padding:'1.5rem 1.25rem 0' }}>
          <div style={{
            background:'#fff', borderRadius:'16px', padding:'1.25rem 1.5rem',
            border:'1.5px solid #cce5f6', marginBottom:'1rem',
            display:'flex', alignItems:'center', gap:'1rem', flexWrap:'wrap',
          }}>
            <CheckCircle size={22} color="#059669" style={{ flexShrink:0 }} />
            <div style={{ flex:1 }}>
              <div style={{ fontWeight:800, color:'#065f46', fontSize:'0.95rem' }}>
                ✅ Identity Verified — Report Ready
              </div>
              <div style={{ color:'#64748b', fontSize:'0.82rem', marginTop:'0.2rem' }}>
                {report.title}{report.date ? ` · ${report.date}` : ''}{report.type ? ` · ${report.type}` : ''}
              </div>
            </div>
          </div>

          {/* Privacy notice */}
          <div style={{
            background:'#fffbeb', border:'1px solid #fde68a', borderRadius:'12px',
            padding:'0.75rem 1rem', marginBottom:'1.25rem',
            fontSize:'0.78rem', color:'#92400e', fontWeight:500,
          }}>
            🔒 This report is for your private use only. Please do not share the link.
          </div>
        </div>

        {/* Report display */}
        <div style={{ maxWidth:900, margin:'0 auto', padding:'0 1.25rem 3rem' }}>
          <div style={{
            background:'#fff', borderRadius:'20px', overflow:'hidden',
            border:'1.5px solid #e2e8f0', boxShadow:'0 8px 32px rgba(14,165,233,0.1)',
          }}>
            {isPdf && <PdfViewer dataUri={report.fileData} title={report.title} />}
            {isImage && (
              <div style={{ padding:'1.5rem', textAlign:'center', background:'#fafcff' }}>
                <img
                  src={report.fileData}
                  alt="Test Report"
                  style={{
                    maxWidth:'100%', maxHeight:'80vh',
                    borderRadius:'12px', boxShadow:'0 4px 20px rgba(0,0,0,0.1)',
                  }}
                />
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div style={{
          textAlign:'center', padding:'1.5rem 1rem 2rem',
          borderTop:'1px solid #e2e8f0',
        }}>
          <p style={{ color:'#94a3b8', fontSize:'0.78rem', margin:'0 0 0.5rem' }}>
            Appolo Clinic Srinagar · Karan Nagar, Near National School
          </p>
          <Link to="/" style={{ color:'#0369a1', fontSize:'0.82rem', fontWeight:600 }}>
            Visit Appolo Clinic →
          </Link>
        </div>
      </div>
    );
  }

  /* ═══════════════════════════════════════════
     RENDER: ERROR STATE
  ═══════════════════════════════════════════ */
  return (
    <div style={{
      minHeight:'100vh', display:'flex', alignItems:'center', justifyContent:'center',
      background:'linear-gradient(160deg,#f0f9ff,#e0f2fe,#ecfdf5)', padding:'1.25rem',
    }}>
      <div style={{
        maxWidth:420, textAlign:'center', background:'#fff',
        padding:'3rem 2rem', borderRadius:'24px',
        boxShadow:'0 12px 40px rgba(14,165,233,0.12)',
        border:'1.5px solid #fecdd3',
      }}>
        <AlertTriangle size={48} color="#dc2626" style={{ marginBottom:'1rem' }} />
        <h2 style={{ color:'#991b1b', fontWeight:800, fontSize:'1.3rem', marginBottom:'0.5rem' }}>
          Invalid Report Link
        </h2>
        <p style={{ color:'#64748b', fontSize:'0.9rem', marginBottom:'1.5rem' }}>
          This report link appears to be invalid or has expired. Please contact Appolo Clinic for assistance.
        </p>
        <Link to="/" style={{
          display:'inline-flex', alignItems:'center', gap:'0.4rem',
          padding:'0.75rem 1.75rem', borderRadius:'12px',
          background:'linear-gradient(135deg,#0369a1,#0ea5e9)',
          color:'#fff', fontWeight:700, fontSize:'0.9rem',
          textDecoration:'none',
        }}>
          ← Back to Appolo Clinic
        </Link>
      </div>
    </div>
  );
};

export default ReportVerify;
