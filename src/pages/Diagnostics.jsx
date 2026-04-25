import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, Phone, CheckCircle, ArrowRight, Clock, MapPin, ShieldCheck } from 'lucide-react';

const PHONE      = '+91 9149425496';
const PHONE_HREF = 'tel:+919149425496';

function useInView(t = 0.05) {
  const ref = React.useRef(null);
  const [vis, setVis] = React.useState(false);
  React.useEffect(() => {
    const o = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVis(true); }, { threshold: t });
    if (ref.current) o.observe(ref.current);
    return () => o.disconnect();
  }, []);
  return [ref, vis];
}

/* ── Diagnostic Services ── */
const DIAG_SERVICES = [
  {
    name: 'ECG — 12-Lead Electrocardiogram',
    tag: 'Cardiac',
    short: 'Heart rhythm, electrical activity and arrhythmia detection.',
    detail: 'A non-invasive test that records the electrical signals of your heart. Used to detect irregular heartbeats, previous heart attacks, and monitor the overall electrical health of the cardiac system.',
    includes: ['Rhythm analysis', 'ST-T wave evaluation', 'Instant results', 'Doctor-reviewed'],
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
      </svg>
    ),
  },
  {
    name: 'ECHO — Echocardiogram',
    tag: 'Cardiac',
    short: 'Ultrasound imaging of heart structure, chambers, and valves.',
    detail: "Echocardiography uses sound waves to produce detailed images of the heart's anatomy. It evaluates heart muscle function, valve conditions, and congenital abnormalities without any radiation.",
    includes: ['2D cardiac imaging', 'Valve assessment', 'Ejection fraction', 'Wall motion analysis'],
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/>
      </svg>
    ),
  },
  {
    name: 'PFT — Pulmonary Function Test',
    tag: 'Respiratory',
    short: 'Lung capacity and airflow measurement for respiratory conditions.',
    detail: 'Pulmonary Function Testing comprehensively assesses how well the lungs work. Essential for diagnosing and monitoring asthma, COPD, and other respiratory diseases.',
    includes: ['Spirometry', 'FVC / FEV1 ratio', 'Asthma screening', 'COPD evaluation'],
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22V8M12 8C12 8 9 5 6 5c-2 0-3 1.5-3 3 0 4 3 6 3 9h12c0-3 3-5 3-9 0-1.5-1-3-3-3-3 0-6 3-6 3z"/>
      </svg>
    ),
  },
  {
    name: 'Blood Tests & Laboratory',
    tag: 'Laboratory',
    short: 'Complete blood panel, metabolic, liver, kidney, and thyroid tests.',
    detail: 'Our in-house laboratory processes a full range of haematological and biochemical tests. Results are available rapidly and reviewed by your treating physician at the same visit.',
    includes: ['CBC (Complete Blood Count)', 'LFT / KFT', 'Lipid Profile', 'Thyroid (T3/T4/TSH)', 'HbA1c'],
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 3H5a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2V8l-5-5H9z"/>
        <polyline points="9 3 9 8 19 8"/>
        <line x1="7" y1="13" x2="17" y2="13"/>
        <line x1="7" y1="17" x2="13" y2="17"/>
      </svg>
    ),
  },
  {
    name: 'Urine & Stool Analysis',
    tag: 'Laboratory',
    short: 'Routine and microscopic urinalysis and stool examination.',
    detail: 'Urinalysis detects urinary tract infections, kidney disease, and metabolic conditions. Stool examination identifies parasitic infections, occult blood, and digestive disorders.',
    includes: ['Routine urinalysis', 'Microscopic exam', 'Stool culture', 'Occult blood test'],
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
        <path d="M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2z"/>
      </svg>
    ),
  },
  {
    name: 'Diabetes Screening Panel',
    tag: 'Metabolic',
    short: 'Comprehensive diabetes evaluation including fasting, post-meal, and HbA1c.',
    detail: 'Our diabetes panel provides a complete picture of blood glucose control. Ideal for screening, monitoring, and management of Type 1 and Type 2 diabetes.',
    includes: ['Fasting Blood Sugar (FBS)', 'Post-Prandial Blood Sugar', 'HbA1c', 'Insulin resistance markers'],
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/>
        <path d="M8 12h8M12 8v8"/>
      </svg>
    ),
  },
];

/* ── Health Packages ── */
const PACKAGES = [
  {
    name: 'Basic Health Checkup',
    tagline: 'Essential annual wellness screening',
    price: 'Enquire for pricing',
    includes: ['CBC (Complete Blood Count)', 'Fasting Blood Sugar', 'Lipid Profile', 'Urine Analysis', 'Medical Consultation'],
    featured: false,
    badge: null,
  },
  {
    name: 'Comprehensive Health Checkup',
    tagline: 'A complete overview of your health',
    price: 'Enquire for pricing',
    includes: ['Complete Blood Count (CBC)', 'Lipid Profile', 'Liver Function Test (LFT)', 'Kidney Function Test (KFT)', 'Thyroid (T3, T4, TSH)', 'Blood Sugar (FBS / PP)', 'HbA1c', 'Urine & Stool Analysis', 'ECG (12-Lead)', 'Medical Consultation'],
    featured: true,
    badge: 'Most Popular',
  },
  {
    name: 'Diabetes Screening',
    tagline: 'Essential tests for early detection of diabetes',
    price: 'Enquire for pricing',
    includes: ['Fasting Blood Sugar (FBS)', 'Post-Prandial Blood Sugar', 'HbA1c', 'Kidney Function Test', 'Urine Albumin'],
    featured: false,
    badge: null,
  },
  {
    name: 'Cardiac Risk Profile',
    tagline: 'Heart health and cardiovascular risk assessment',
    price: 'Enquire for pricing',
    includes: ['ECG (12-Lead)', 'Lipid Profile', 'Blood Pressure Assessment', 'Blood Sugar', 'Cardiac Consultation'],
    featured: false,
    badge: null,
  },
  {
    name: 'Thyroid Profile',
    tagline: 'Detailed analysis of thyroid gland function',
    price: 'Enquire for pricing',
    includes: ['T3 (Triiodothyronine)', 'T4 (Thyroxine)', 'TSH (Thyroid Stimulating Hormone)', 'Anti-TPO Antibodies'],
    featured: false,
    badge: null,
  },
];

/* ── Individual Investigations Table ── */
const INV_CATEGORIES = [
  { cat: 'Cardiac',    tests: ['ECG 12-Lead', 'Echocardiogram (ECHO)'] },
  { cat: 'Respiratory', tests: ['Pulmonary Function Test (PFT)', 'Spirometry'] },
  { cat: 'Blood',      tests: ['Complete Blood Count (CBC)', 'ESR', 'Blood Group & Rh Factor', 'Lipid Profile', 'Liver Function Test', 'Kidney Function Test', 'Serum Electrolytes', 'Uric Acid'] },
  { cat: 'Metabolic',  tests: ['Fasting Blood Sugar', 'Post-Prandial Blood Sugar', 'HbA1c', 'Insulin Level', 'Thyroid Profile (T3/T4/TSH)'] },
  { cat: 'Urine & Stool', tests: ['Routine Urinalysis', 'Urine Culture', 'Urine Albumin', 'Stool Routine', 'Occult Blood Test'] },
];

/* ════════════════════════════════════
   DIAGNOSTICS PAGE
════════════════════════════════════ */
const Diagnostics = () => {
  const navigate = useNavigate();
  const [servRef, servVis] = useInView(0.04);
  const [pkgRef, pkgVis]   = useInView(0.04);
  const goBook     = () => { navigate('/book-checkup'); window.scrollTo(0, 0); };
  const goAppt     = () => { navigate('/book');         window.scrollTo(0, 0); };

  return (
    <div style={{ background: '#fff' }}>

      {/* ── Hero ── */}
      <section style={{ background: '#fff', borderBottom: '1px solid var(--border)', padding: '4.5rem 0 3.5rem' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 360px', gap: '3rem', alignItems: 'center' }}>
            <div>
              <nav style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.8rem', color: 'var(--muted)', marginBottom: '1.25rem' }}>
                <button onClick={() => { navigate('/'); window.scrollTo(0,0); }} style={{ background: 'none', border: 'none', color: 'var(--blue)', fontWeight: 600, cursor: 'pointer', fontSize: '0.8rem', fontFamily: 'inherit' }}>Home</button>
                <ArrowRight size={12} />
                <span>Diagnostics</span>
              </nav>
              <div className="section-label">Lab & Diagnostics</div>
              <h1 style={{ marginBottom: '0.85rem' }}>
                Precision <span style={{ color: 'var(--blue)' }}>Diagnostics</span>
              </h1>
              <p style={{ fontSize: '1rem', maxWidth: 480, lineHeight: 1.72, marginBottom: '1.5rem', color: 'var(--body)' }}>
                Accurate, timely, and comprehensive health testing. Our in-house laboratory ensures your results are delivered swiftly, empowering you with vital health insights at every visit.
              </p>

              {/* Trust badges */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '2rem' }}>
                {['Same-Day Results', 'In-House Lab', 'Doctor-Reviewed', 'Walk-In Friendly', 'Confidential'].map(b => (
                  <span key={b} style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', background: 'var(--bg)', border: '1px solid var(--border)', borderRadius: 'var(--r-full)', fontSize: '0.75rem', fontWeight: 600, color: 'var(--body)', padding: '0.28rem 0.75rem' }}>
                    <CheckCircle size={11} color="var(--green)" /> {b}
                  </span>
                ))}
              </div>

              <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                <button className="btn btn-primary btn-lg" onClick={goBook} style={{ borderRadius: 'var(--r-full)' }}>
                  <Calendar size={16} /> Book a Checkup
                </button>
                <a href={PHONE_HREF} className="btn btn-ghost btn-lg" style={{ borderRadius: 'var(--r-full)' }}>
                  <Phone size={16} /> {PHONE}
                </a>
              </div>
            </div>

            {/* Right info card */}
            <div style={{ background: 'var(--bg)', border: '1px solid var(--border)', borderRadius: 'var(--r-xl)', overflow: 'hidden' }}>

              {/* Lab photo with NABL badge overlay */}
              <div style={{ position: 'relative', height: 240, overflow: 'hidden' }}>
                <img
                  src="/lab-technician.jpg"
                  alt="Apollo Clinic In-House Laboratory"
                  style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top', display: 'block' }}
                />
                {/* NABL Accredited floating badge */}
                <div style={{
                  position: 'absolute', bottom: '1rem', right: '1rem',
                  background: 'rgba(255,255,255,0.97)',
                  borderRadius: '14px', padding: '0.65rem 0.9rem',
                  display: 'flex', alignItems: 'center', gap: '0.6rem',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.14)',
                  maxWidth: '200px',
                }}>
                  <div style={{
                    width: 36, height: 36, borderRadius: '50%',
                    background: 'var(--blue-light)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    flexShrink: 0,
                  }}>
                    <ShieldCheck size={18} color="var(--blue)" />
                  </div>
                  <div>
                    <div style={{ fontWeight: 800, fontSize: '0.82rem', color: 'var(--heading)', lineHeight: 1.2 }}>NABL Accredited</div>
                    <div style={{ fontSize: '0.7rem', color: 'var(--muted)', lineHeight: 1.4, marginTop: '0.1rem' }}>Ensuring the highest standards of diagnostic accuracy.</div>
                  </div>
                </div>
              </div>

              {/* Info content */}
              <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div style={{ fontWeight: 800, fontSize: '0.97rem', color: 'var(--heading)' }}>In-House Laboratory</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
                  {[
                    { icon: <CheckCircle size={14} />, text: 'ECG & ECHO on site — no referrals needed' },
                    { icon: <CheckCircle size={14} />, text: 'Blood tests processed in-house' },
                    { icon: <CheckCircle size={14} />, text: 'Same-visit report review with your doctor' },
                    { icon: <CheckCircle size={14} />, text: 'Secure online report access' },
                    { icon: <CheckCircle size={14} />, text: 'Certified diagnostic equipment' },
                  ].map((item, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', fontSize: '0.84rem', color: 'var(--body)' }}>
                      <span style={{ color: 'var(--green)', flexShrink: 0, marginTop: '1px' }}>{item.icon}</span>
                      {item.text}
                    </div>
                  ))}
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.65rem', marginTop: '0.25rem' }}>
                  <div style={{ background: '#fff', border: '1px solid var(--border)', borderRadius: 'var(--r-lg)', padding: '0.85rem', textAlign: 'center' }}>
                    <div style={{ fontSize: '1.4rem', fontWeight: 900, color: 'var(--navy)', letterSpacing: '-0.03em' }}>6+</div>
                    <div style={{ fontSize: '0.72rem', color: 'var(--muted)', fontWeight: 500 }}>Test Types</div>
                  </div>
                  <div style={{ background: '#fff', border: '1px solid var(--border)', borderRadius: 'var(--r-lg)', padding: '0.85rem', textAlign: 'center' }}>
                    <div style={{ fontSize: '1.4rem', fontWeight: 900, color: 'var(--navy)', letterSpacing: '-0.03em' }}>Same</div>
                    <div style={{ fontSize: '0.72rem', color: 'var(--muted)', fontWeight: 500 }}>Day Results</div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
        <style>{`@media(max-width:860px){ section .container > div[style*="grid-template-columns: 1fr 360px"]{grid-template-columns:1fr!important}}`}</style>
      </section>

      {/* ── Diagnostic Services ── */}
      <section style={{ background: 'var(--bg)', padding: '4.5rem 0' }}>
        <div className="container">
          <div style={{ marginBottom: '2.5rem' }}>
            <div className="section-label">Our Tests</div>
            <h2 style={{ marginBottom: '0.65rem' }}>Diagnostic Services</h2>
            <p style={{ margin: 0, color: 'var(--body)', maxWidth: 520 }}>
              From cardiac investigations to comprehensive blood panels — all processed on site.
            </p>
          </div>

          <div ref={servRef} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1rem' }}>
            {DIAG_SERVICES.map((svc, i) => (
              <div key={i} style={{
                background: 'linear-gradient(150deg, #ffffff 0%, #f7fafe 100%)',
                border: '1px solid rgba(13,82,192,0.08)',
                borderRadius: 'var(--r-xl)',
                overflow: 'hidden',
                transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                boxShadow: '0 4px 16px rgba(13,82,192,0.04)',
                opacity: servVis ? 1 : 0,
                transform: servVis ? 'none' : 'translateY(14px)',
                transitionDelay: `${i * 0.04}s`,
              }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(13,82,192,0.2)'; e.currentTarget.style.boxShadow = '0 16px 32px rgba(13,82,192,0.12)'; e.currentTarget.style.transform = 'translateY(-3px)'; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(13,82,192,0.08)'; e.currentTarget.style.boxShadow = '0 4px 16px rgba(13,82,192,0.04)'; e.currentTarget.style.transform = 'none'; }}
              >
                <div style={{ height: 3, background: 'var(--blue)' }} />
                <div style={{ padding: '1.25rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.85rem' }}>
                    <div style={{ width: 44, height: 44, borderRadius: 'var(--r-md)', background: 'linear-gradient(135deg, var(--blue-light), #e0eeff)', color: 'var(--blue)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      {svc.icon}
                    </div>
                    <span style={{ background: 'var(--blue-light)', color: 'var(--blue)', fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', padding: '0.18rem 0.55rem', borderRadius: 'var(--r-sm)', border: '1px solid var(--blue-border)' }}>
                      {svc.tag}
                    </span>
                  </div>
                  <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--heading)', marginBottom: '0.4rem', lineHeight: 1.3 }}>{svc.name}</h3>
                  <p style={{ fontSize: '0.86rem', color: 'var(--body)', lineHeight: 1.55, marginBottom: '0.85rem' }}>{svc.detail}</p>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem', marginBottom: '1.1rem' }}>
                    {svc.includes.map((inc, j) => (
                      <span key={j} style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', background: 'var(--bg)', border: '1px solid var(--border)', borderRadius: 'var(--r-sm)', fontSize: '0.68rem', fontWeight: 500, color: 'var(--body)', padding: '0.15rem 0.5rem' }}>
                        <CheckCircle size={9} color="var(--green)" /> {inc}
                      </span>
                    ))}
                  </div>
                  <button onClick={goBook} style={{ width: '100%', padding: '0.65rem', background: 'var(--navy)', color: '#fff', border: 'none', borderRadius: 'var(--r-md)', fontWeight: 700, fontSize: '0.82rem', cursor: 'pointer', fontFamily: 'inherit', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.35rem', transition: 'all 0.2s' }}
                    onMouseEnter={e => e.currentTarget.style.background = 'var(--navy-hover)'}
                    onMouseLeave={e => e.currentTarget.style.background = 'var(--navy)'}
                  >
                    <Calendar size={13} /> Book This Test
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Featured Health Packages ── */}
      <section style={{ background: '#fff', borderTop: '1px solid var(--border)', padding: '4.5rem 0' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
            <div className="section-label">Health Packages</div>
            <h2 style={{ marginBottom: '0.65rem' }}>Featured Health Packages</h2>
            <p style={{ margin: '0 auto', maxWidth: 480, color: 'var(--body)' }}>
              Preventative care designed for your well-being. Bundled test packages for early detection and peace of mind.
            </p>
          </div>

          <div ref={pkgRef} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '1rem' }}>
            {PACKAGES.map((pkg, i) => (
              <div key={i} style={{
                background: pkg.featured ? 'var(--navy)' : '#fff',
                border: `1px solid ${pkg.featured ? 'var(--navy)' : 'var(--border)'}`,
                borderRadius: 'var(--r-xl)',
                padding: '1.75rem',
                display: 'flex', flexDirection: 'column',
                position: 'relative', overflow: 'hidden',
                transition: 'all 0.2s',
                opacity: pkgVis ? 1 : 0,
                transform: pkgVis ? 'none' : 'translateY(14px)',
                transitionDelay: `${i * 0.05}s`,
              }}
                onMouseEnter={e => { if (!pkg.featured) { e.currentTarget.style.borderColor = 'var(--blue-border)'; e.currentTarget.style.boxShadow = 'var(--shadow-md)'; e.currentTarget.style.transform = 'translateY(-2px)'; } }}
                onMouseLeave={e => { if (!pkg.featured) { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.boxShadow = 'none'; e.currentTarget.style.transform = 'none'; } }}
              >
                {pkg.badge && (
                  <div style={{ position: 'absolute', top: 14, right: 14, background: '#3b82f6', color: '#fff', borderRadius: 'var(--r-sm)', fontSize: '0.65rem', fontWeight: 700, padding: '0.2rem 0.55rem', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                    {pkg.badge}
                  </div>
                )}

                <div style={{ marginBottom: '0.5rem' }}>
                  <div style={{ width: 40, height: 40, borderRadius: 'var(--r-md)', background: pkg.featured ? 'rgba(255,255,255,0.15)' : 'var(--blue-light)', color: pkg.featured ? '#fff' : 'var(--blue)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem' }}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M9 3H5a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2V8l-5-5H9z"/>
                      <polyline points="9 3 9 8 19 8"/>
                    </svg>
                  </div>
                  <h3 style={{ fontSize: '1rem', fontWeight: 800, color: pkg.featured ? '#fff' : 'var(--heading)', marginBottom: '0.3rem', lineHeight: 1.2 }}>{pkg.name}</h3>
                  <p style={{ fontSize: '0.8rem', color: pkg.featured ? 'rgba(255,255,255,0.65)' : 'var(--body)', margin: '0 0 1rem', lineHeight: 1.55 }}>{pkg.tagline}</p>
                </div>

                <div style={{ marginBottom: '1.25rem', flex: 1 }}>
                  <div style={{ fontSize: '0.72rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.07em', color: pkg.featured ? 'rgba(255,255,255,0.5)' : 'var(--muted)', marginBottom: '0.5rem' }}>
                    Includes
                  </div>
                  <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                    {pkg.includes.map((inc, j) => (
                      <li key={j} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.45rem', fontSize: '0.82rem', color: pkg.featured ? 'rgba(255,255,255,0.8)' : 'var(--body)' }}>
                        <CheckCircle size={12} color={pkg.featured ? '#4ade80' : 'var(--green)'} style={{ flexShrink: 0, marginTop: '2px' }} />
                        {inc}
                      </li>
                    ))}
                  </ul>
                </div>

                <button onClick={goBook} style={{
                  width: '100%', padding: '0.75rem',
                  background: pkg.featured ? '#3b82f6' : 'var(--navy)',
                  color: '#fff',
                  border: 'none', borderRadius: 'var(--r-md)',
                  fontWeight: 700, fontSize: '0.85rem', cursor: 'pointer',
                  fontFamily: 'inherit', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem',
                  transition: 'all 0.2s',
                }}>
                  <Calendar size={14} /> Book This Package
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Individual Investigations (table) ── */}
      <section style={{ background: 'var(--bg)', borderTop: '1px solid var(--border)', padding: '4rem 0' }}>
        <div className="container">
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem', marginBottom: '2rem' }}>
            <div>
              <div className="section-label">A–Z Tests</div>
              <h2 style={{ marginBottom: '0.4rem' }}>Individual Investigations</h2>
              <p style={{ margin: 0, color: 'var(--body)' }}>All tests listed below are available at Apollo Clinic Srinagar.</p>
            </div>
            <button className="btn btn-outline-blue btn-sm" onClick={goAppt} style={{ borderRadius: 'var(--r-full)' }}>
              Enquire About a Test <ArrowRight size={14} />
            </button>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1rem' }}>
            {INV_CATEGORIES.map((cat, i) => (
              <div key={i} style={{ background: '#fff', border: '1px solid var(--border)', borderRadius: 'var(--r-xl)', padding: '1.25rem' }}>
                <div style={{ fontWeight: 800, fontSize: '0.9rem', color: 'var(--heading)', marginBottom: '0.85rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <div style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--blue)', flexShrink: 0 }} />
                  {cat.cat}
                </div>
                <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                  {cat.tests.map((t, j) => (
                    <li key={j} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.82rem', color: 'var(--body)' }}>
                      <div style={{ width: 4, height: 4, borderRadius: '50%', background: 'var(--muted)', flexShrink: 0 }} />
                      {t}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Info strip ── */}
      <section style={{ background: '#fff', borderTop: '1px solid var(--border)', padding: '3rem 0' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' }}>
            {[
              { icon: <Clock size={18} />, label: 'Lab Hours', lines: ['Mon – Sat: 12:00 PM – 6:30 PM', 'Sunday: 10:00 AM – 1:00 PM'] },
              { icon: <MapPin size={18} />, label: 'Location', lines: ['Near National School, Arham Towers', 'Karan Nagar, Srinagar'] },
              { icon: <Phone size={18} />, label: 'Contact', lines: [PHONE, 'Walk-ins welcome'] },
            ].map((item, i) => (
              <div key={i} className="info-card">
                <div className="info-card-icon">{item.icon}</div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: '0.88rem', color: 'var(--heading)', marginBottom: '0.35rem' }}>{item.label}</div>
                  {item.lines.map((l, li) => <div key={li} style={{ fontSize: '0.82rem', color: 'var(--body)' }}>{l}</div>)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA Banner ── */}
      <section style={{ padding: '3.5rem 0' }}>
        <div className="container">
          <div className="cta-banner">
            <div style={{ fontSize: '0.72rem', fontWeight: 700, color: 'rgba(255,255,255,0.65)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.4rem' }}>Book a Test Today</div>
            <h2 style={{ color: '#fff', fontSize: 'clamp(1.1rem,3vw,1.6rem)', marginBottom: '0.5rem' }}>
              Ready to get tested?
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.65)', marginBottom: '1.75rem', fontSize: '0.92rem' }}>
              Book a health checkup package or individual test — walk in or schedule ahead.
            </p>
            <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <button onClick={goBook} className="btn btn-lg" style={{ background: '#fff', color: 'var(--navy)', border: 'none', borderRadius: 'var(--r-full)' }}>
                <Calendar size={16} /> Book a Checkup
              </button>
              <a href={PHONE_HREF} className="btn btn-lg" style={{ background: 'rgba(255,255,255,0.12)', color: '#fff', border: '1.5px solid rgba(255,255,255,0.25)', borderRadius: 'var(--r-full)' }}>
                <Phone size={15} /> {PHONE}
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Diagnostics;
