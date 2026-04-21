import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Calendar, CheckCircle } from 'lucide-react';

const WA_LINK = `https://wa.me/919000000000?text=${encodeURIComponent('Hello! I would like to enquire about diagnostics and health checkups at Apollo Clinic Srinagar.')}`;

const DIAGNOSTIC_SERVICES = [
  { icon: '❤️', title: 'ECG (Electrocardiogram)', desc: 'Rapid, non-invasive heart rhythm and electrical activity assessment for cardiac monitoring and diagnosis.' },
  { icon: '🔊', title: 'ECHO (Echocardiogram)', desc: 'Ultrasound imaging of the heart to evaluate structure, valves, and pump function with precision.' },
  { icon: '🫁', title: 'Pulmonary Function Test (PFT)', desc: 'Lung capacity and airflow measurement for asthma, COPD, and respiratory condition assessment.' },
  { icon: '🔬', title: 'Blood Tests & Lab Work', desc: 'Complete blood count, lipid profiles, blood sugar, thyroid, liver function, kidney function, and more.' },
  { icon: '🧪', title: 'Urine & Stool Analysis', desc: 'Routine urinalysis and stool tests for infection detection, kidney health, and gastrointestinal conditions.' },
  { icon: '🩸', title: 'Diabetes Screening', desc: 'HbA1c, fasting glucose, and post-meal sugar levels for early detection and ongoing diabetes management.' },
];

const PACKAGES = [
  {
    name: 'Basic Health Screen',
    subtitle: 'Essential Annual Checkup',
    price: 'Ask at Clinic',
    featured: false,
    tests: [
      'Complete Blood Count (CBC)',
      'Blood Glucose (Fasting)',
      'Lipid Profile',
      'Urine Routine Examination',
      'Blood Pressure Assessment',
      'BMI & Body Weight Check',
    ],
  },
  {
    name: 'Comprehensive Health Package',
    subtitle: 'Full Body Assessment — Most Popular',
    price: 'Ask at Clinic',
    featured: true,
    tests: [
      'CBC + Lipid Profile + Glucose',
      'Liver & Kidney Function Tests',
      'Thyroid Profile (TSH/T3/T4)',
      'Urine & Stool Analysis',
      'ECG (Heart Rhythm)',
      'Blood Pressure & Pulse',
      'BMI & Body Weight',
      'Physician Consultation Included',
    ],
  },
  {
    name: 'Cardiac Risk Assessment',
    subtitle: 'Heart Health Focus',
    price: 'Ask at Clinic',
    featured: false,
    tests: [
      'ECG (12-Lead)',
      'ECHO (Echocardiogram)',
      'Lipid Profile (Full)',
      'Blood Glucose & HbA1c',
      'Blood Pressure Monitoring',
      'Cardiologist Consultation',
    ],
  },
];

function useScrollVisible(ref) {
  const [vis, setVis] = React.useState(false);
  React.useEffect(() => {
    const o = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVis(true); }, { threshold: 0.05 });
    if (ref.current) o.observe(ref.current);
    return () => o.disconnect();
  }, [ref]);
  return vis;
}

const Diagnostics = () => {
  const servRef = React.useRef(null);
  const pkgRef  = React.useRef(null);
  const servVis = useScrollVisible(servRef);
  const pkgVis  = useScrollVisible(pkgRef);

  return (
    <div>
      {/* ── Page Hero ── */}
      <section className="page-hero">
        <div className="container text-center" style={{ position: 'relative', zIndex: 1 }}>
          <span className="pill" style={{ background: 'rgba(255,255,255,0.15)', color: '#fff', border: '1px solid rgba(255,255,255,0.3)', marginBottom: '1.25rem', display: 'inline-flex' }}>
            🔬 Diagnostics
          </span>
          <h1 style={{ color: '#fff', marginBottom: '1.1rem', fontSize: 'clamp(2rem,5vw,3.2rem)' }}>
            Accurate Diagnostics for Better Health
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.82)', fontSize: '1.1rem', maxWidth: '620px', margin: '0 auto 2rem', lineHeight: 1.7 }}>
            Apollo Clinic Srinagar offers a range of in-house diagnostic services and health checkup packages — delivered with precision, speed, and care.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/book-checkup" className="btn btn-white"><Calendar size={17} /> Book a Checkup</Link>
            <a href={`tel:+919000000000`} className="btn" style={{ background: 'rgba(255,255,255,0.15)', color: '#fff', border: '1.5px solid rgba(255,255,255,0.35)' }}>
              <Phone size={17} /> Call Now
            </a>
          </div>
        </div>
      </section>

      {/* ── Key Features ── */}
      <section style={{ background: '#fff', padding: '3.5rem 0', borderBottom: '1px solid #e2e8f0' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
            {[
              { icon: '⚡', title: 'Fast Turnaround', desc: 'Most tests reported same or next day' },
              { icon: '🎯', title: 'High Accuracy', desc: 'Certified equipment & trained technicians' },
              { icon: '🏥', title: 'In-House Lab', desc: 'No need to visit an external facility' },
              { icon: '👨‍⚕️', title: 'Doctor Review', desc: 'Physician consultation with your results' },
              { icon: '🔒', title: 'Confidential', desc: 'Your results are kept strictly private' },
            ].map((f, i) => (
              <div key={i} style={{
                textAlign: 'center', padding: '1.5rem 1rem',
                borderRadius: '14px', border: '1.5px solid #e2e8f0',
                background: '#fafcff',
              }}>
                <div style={{ fontSize: '1.75rem', marginBottom: '0.6rem' }}>{f.icon}</div>
                <h4 style={{ color: '#0c4a6e', fontSize: '0.9rem', fontWeight: 800, marginBottom: '0.3rem' }}>{f.title}</h4>
                <p style={{ color: '#64748b', fontSize: '0.78rem', lineHeight: 1.55, margin: 0 }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Diagnostic Services ── */}
      <section style={{ background: 'linear-gradient(180deg,#f0f9ff,#fff)', padding: '5rem 0' }}>
        <div className="container">
          <div className="text-center section-header">
            <span className="pill" style={{ marginBottom: '0.85rem', display: 'inline-flex' }}>🔬 Services</span>
            <h2 style={{ color: '#0c4a6e' }}>Diagnostic Services</h2>
            <p className="section-desc" style={{ margin: '0 auto' }}>
              A range of clinical and laboratory diagnostics available in-house at Apollo Clinic Srinagar.
            </p>
          </div>

          <div ref={servRef} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.25rem' }}>
            {DIAGNOSTIC_SERVICES.map((svc, i) => (
              <div key={i} className="diag-card" style={{
                opacity: servVis ? 1 : 0,
                transform: servVis ? 'translateY(0)' : 'translateY(22px)',
                transition: `opacity 0.5s ease ${i * 0.07}s, transform 0.4s ease ${i * 0.07}s, box-shadow 0.25s, border-color 0.25s`,
              }}>
                <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                  <div style={{
                    width: 48, height: 48, borderRadius: '13px', flexShrink: 0,
                    background: 'linear-gradient(135deg,#e0f2fe,#d1fae5)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.55rem',
                  }}>{svc.icon}</div>
                  <div>
                    <h3 style={{ color: '#0c4a6e', fontWeight: 800, fontSize: '0.97rem', margin: '0 0 0.4rem' }}>{svc.title}</h3>
                    <p style={{ color: '#64748b', fontSize: '0.84rem', lineHeight: 1.6, margin: 0 }}>{svc.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Packages ── */}
      <section style={{ background: '#fff', padding: '5rem 0' }}>
        <div className="container">
          <div className="text-center section-header">
            <span className="pill" style={{ marginBottom: '0.85rem', display: 'inline-flex' }}>📦 Packages</span>
            <h2 style={{ color: '#0c4a6e' }}>Health Checkup Packages</h2>
            <p className="section-desc" style={{ margin: '0 auto' }}>
              Structured packages designed to give you a complete picture of your health — from essential screening to full-body assessment.
            </p>
          </div>

          <div ref={pkgRef} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
            {PACKAGES.map((pkg, i) => (
              <div key={i} className={`package-card${pkg.featured ? ' featured' : ''}`} style={{
                opacity: pkgVis ? 1 : 0,
                transform: pkgVis ? 'translateY(0)' : 'translateY(24px)',
                transition: `opacity 0.5s ease ${i * 0.1}s, transform 0.4s ease ${i * 0.1}s`,
              }}>
                {pkg.featured && (
                  <div style={{
                    position: 'absolute', top: 0, left: 0, right: 0, height: '4px',
                    background: 'linear-gradient(90deg,#0369a1,#0ea5e9,#059669)',
                  }} />
                )}
                {pkg.featured && (
                  <div style={{
                    position: 'absolute', top: '1rem', right: '1rem',
                    background: 'linear-gradient(135deg,#0369a1,#0ea5e9)',
                    color: '#fff', fontSize: '0.7rem', fontWeight: 800,
                    padding: '0.25rem 0.65rem', borderRadius: '20px',
                  }}>Most Popular</div>
                )}
                <div style={{ marginBottom: '1.25rem' }}>
                  <h3 style={{ color: '#0c4a6e', fontWeight: 900, fontSize: '1.1rem', marginBottom: '0.25rem' }}>{pkg.name}</h3>
                  <p style={{ color: '#64748b', fontSize: '0.83rem', margin: 0 }}>{pkg.subtitle}</p>
                </div>
                <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 1.5rem', display: 'flex', flexDirection: 'column', gap: '0.55rem' }}>
                  {pkg.tests.map((test, t) => (
                    <li key={t} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.55rem', fontSize: '0.84rem', color: '#334155' }}>
                      <CheckCircle size={14} color="#059669" style={{ flexShrink: 0, marginTop: '2px' }} />
                      {test}
                    </li>
                  ))}
                </ul>
                <Link to="/book-checkup" className={`btn ${pkg.featured ? 'btn-primary' : 'btn-outline'}`} style={{ width: '100%', justifyContent: 'center' }}>
                  <Calendar size={16} /> Book This Package
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section style={{ background: 'linear-gradient(180deg,#f0f9ff,#ecfdf5)', padding: '4rem 0' }}>
        <div className="container">
          <div className="cta-banner">
            <div style={{ position: 'absolute', top: '-50px', right: '-50px', width: '220px', height: '220px', borderRadius: '50%', background: 'rgba(255,255,255,0.07)', pointerEvents: 'none' }} />
            <h2 style={{ color: '#fff', marginBottom: '0.75rem' }}>Book Your Health Checkup Today</h2>
            <p style={{ color: 'rgba(255,255,255,0.85)', maxWidth: 520, margin: '0 auto 2rem', fontSize: '1rem' }}>
              Early detection saves lives. Schedule your checkup at Apollo Clinic Srinagar — Mon to Sun.
            </p>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link to="/book-checkup" className="btn btn-white"><Calendar size={17} /> Book Now</Link>
              <a href={WA_LINK} target="_blank" rel="noreferrer" className="btn" style={{ background: '#25D366', color: '#fff', border: 'none' }}>WhatsApp Us</a>
              <a href="tel:+919000000000" className="btn" style={{ background: 'rgba(255,255,255,0.15)', color: '#fff', border: '1.5px solid rgba(255,255,255,0.35)' }}>
                <Phone size={17} /> +91 9000000000
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Diagnostics;
