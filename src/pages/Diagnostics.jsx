import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, Phone, Award, FlaskConical, Clock, ShieldCheck, FileText, CheckCircle, FileSignature, Stethoscope, UserCheck, Smartphone, HeartPulse, Moon, Search, Activity } from 'lucide-react';

import { PRIMARY_PHONE_HREF } from '../config/contact';

export const DIAGNOSTICS_CATEGORIES = [
  {
    name: 'Ultrasound / USG',
    desc: 'Advanced ultrasound imaging support for abdominal, vascular, scrotal, and other scan requirements as advised by the doctor.',
    tests: ['CD / Color Doppler', 'Abdomen USG', 'Scrotum USG', 'Other USG scans as advised'],
    icon: <Activity size={28} strokeWidth={1.5} />
  },
  {
    name: 'X-Ray & Radiology Studies',
    desc: 'Radiology and contrast-based imaging services for diagnostic evaluation and specialist guidance.',
    tests: ['All X-rays', 'MCU', 'Scanogram', 'MCU / RGU', 'Barium Swallow', 'HSG', 'Sinogram'],
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
        <circle cx="12" cy="12" r="4"/>
        <path d="M12 8v8"/>
        <path d="M8 12h8"/>
      </svg>
    )
  },
  {
    name: 'Cardiac Diagnostics',
    desc: 'Heart-related diagnostic tests for cardiac evaluation, rhythm monitoring, blood pressure monitoring, and cardiac monitoring.',
    tests: ['Echo', 'ECG', 'UMT', 'Holter', 'ABPM'],
    icon: <HeartPulse size={28} strokeWidth={1.5} />
  },
  {
    name: 'Sleep, Neuro, ENT & Pulmonary Diagnostics',
    desc: 'Specialized investigations for sleep, brain activity, hearing assessment, and lung function evaluation.',
    tests: ['Sleep Study', 'Polysomnography', 'EEG', 'Audiometry', 'PFT'],
    icon: <Moon size={28} strokeWidth={1.5} />
  },
  {
    name: 'Endoscopy & Gastro Diagnostics',
    desc: 'Endoscopic diagnostic services for evaluation of the digestive tract and related concerns.',
    tests: ['Endoscopy', 'Colonoscopy', 'Sigmoidoscopy'],
    icon: <Search size={28} strokeWidth={1.5} />
  },
  {
    name: 'Urology Diagnostics',
    desc: 'Urology-focused diagnostic testing for urinary flow and related evaluation.',
    tests: ['Uroflowmetry'],
    icon: <FlaskConical size={28} strokeWidth={1.5} />
  }
];



const Diagnostics = () => {
  const navigate = useNavigate();

  return (
    <div style={{ background: '#f8fafc', minHeight: '100vh', paddingBottom: '4rem' }}>
      
      {/* ── Hero Section ── */}
      <section className="diag-hero" style={{ padding: '5rem 0' }}>
        <div className="container m-grid-1" style={{ maxWidth: '1400px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'center' }}>
          
          <div className="m-center" style={{ maxWidth: '600px' }}>
            <div style={{ display: 'inline-block', marginBottom: '1rem' }}>
              <span style={{ color: 'var(--blue)', fontWeight: 800, fontSize: '0.85rem', letterSpacing: '1px', textTransform: 'uppercase' }}>
                LAB & DIAGNOSTICS
              </span>
              <div style={{ height: '3px', width: '40px', background: 'var(--orange)', marginTop: '4px' }}></div>
            </div>
            
            <h1 style={{ fontSize: '3.5rem', lineHeight: 1.1, marginBottom: '1.5rem', color: 'var(--navy)' }}>
              Accurate Testing.<br/>Trusted Results.
            </h1>
            
            <p style={{ fontSize: '1.05rem', color: 'var(--body)', marginBottom: '3rem', lineHeight: 1.6 }}>
              State-of-the-art diagnostics with NABL-standard processes and specialist oversight—delivering accurate results, every time.
            </p>

            <div className="diag-features" style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'var(--blue-light)', color: 'var(--blue)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <ShieldCheck size={20} />
                </div>
                <span style={{ fontSize: '0.95rem', color: 'var(--body)', fontWeight: 500 }}>NABL-standard processes</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'var(--blue-light)', color: 'var(--blue)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <FileSignature size={20} />
                </div>
                <span style={{ fontSize: '0.95rem', color: 'var(--body)', fontWeight: 500 }}>Fast digital reports</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'var(--blue-light)', color: 'var(--blue)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <UserCheck size={20} />
                </div>
                <span style={{ fontSize: '0.95rem', color: 'var(--body)', fontWeight: 500 }}>Specialist-reviewed diagnostics</span>
              </div>
            </div>
          </div>

          <div style={{ position: 'relative' }}>
            <div className="diag-hero-img" style={{ borderRadius: '24px', overflow: 'hidden', boxShadow: '0 20px 40px rgba(0,0,0,0.08)' }}>
              <img src="/images/services/lab-technician.webp" alt="Appolo Clinic Diagnostics" loading="lazy" decoding="async" style={{ width: '100%', height: 'auto', display: 'block', backgroundColor: '#e2e8f0', minHeight: '400px', objectFit: 'cover' }} />
            </div>
            
            {/* Stats Card */}
            <div className="m-static diag-stats" style={{ 
              position: 'absolute', bottom: '-2rem', right: '-2rem', 
              background: '#fff', padding: '2rem', borderRadius: '20px', 
              boxShadow: '0 10px 30px rgba(0,0,0,0.08)',
              display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <Award size={32} className="text-blue" />
                <div>
                  <div style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--navy)' }}>NABL</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--muted)', fontWeight: 600 }}>Accredited Labs</div>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <FlaskConical size={32} className="text-blue" />
                <div>
                  <div style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--navy)' }}>1000+</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--muted)', fontWeight: 600 }}>Tests Offered</div>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <Clock size={32} className="text-blue" />
                <div>
                  <div style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--navy)' }}>Quick</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--muted)', fontWeight: 600 }}>Turnaround</div>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <ShieldCheck size={32} className="text-blue" />
                <div>
                  <div style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--navy)' }}>Trusted</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--muted)', fontWeight: 600 }}>By Doctors</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Inside Our Diagnostic Lab ── */}
      <section className="diag-lab-section" style={{ padding: '3rem 0 0' }}>
        <div className="container" style={{ maxWidth: '1400px' }}>
          
          <div className="m-center" style={{ marginBottom: '3rem', textAlign: 'center' }}>
            <h2 style={{ fontSize: '2.5rem', color: 'var(--navy)', marginBottom: '0.75rem' }}>
              Inside Our Diagnostic Lab
            </h2>
            <p style={{ fontSize: '1.05rem', color: 'var(--body)', maxWidth: '600px', margin: '0 auto', lineHeight: 1.6, textAlign: 'center' }}>
              A closer look at our testing environment, equipment, and patient-focused diagnostic care.
            </p>
          </div>

          <div className="diag-lab-grid" style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(3, 1fr)', 
            gap: '1.5rem'
          }}>
            {[
              { src: '/images/lab/lab-1.webp', label: 'Modern Testing Area', alt: 'Appolo Clinic modern lab testing area with advanced equipment' },
              { src: '/images/lab/lab-2.webp', label: 'Lab Equipment', alt: 'State-of-the-art diagnostic lab equipment at Appolo Clinic Srinagar' },
              { src: '/images/lab/lab-3.webp', label: 'Diagnostic Care', alt: 'Patient-focused diagnostic care at Appolo Clinic' },
            ].map((img, i) => (
              <div key={i} className="diag-lab-card" style={{
                borderRadius: '16px',
                overflow: 'hidden',
                border: '1px solid rgba(0,0,0,0.06)',
                boxShadow: '0 4px 20px rgba(0,0,0,0.04)',
                background: '#e2e8f0',
                position: 'relative',
                lineHeight: 0,
                transition: 'all 0.4s ease',
                cursor: 'pointer',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.boxShadow = '0 12px 40px rgba(13,82,192,0.12)';
                e.currentTarget.style.borderColor = 'rgba(13,82,192,0.15)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.04)';
                e.currentTarget.style.borderColor = 'rgba(0,0,0,0.06)';
              }}>
                <img
                  src={img.src}
                  alt={img.alt}
                  loading="lazy"
                  decoding="async"
                  className="diag-lab-img"
                  style={{
                    width: '100%',
                    height: 'auto',
                    display: 'block',
                    transition: 'transform 0.5s ease',
                  }}
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.parentElement.style.minHeight = '200px';
                    e.target.parentElement.style.background = '#eff6ff';
                  }}
                />
                <div style={{
                  position: 'absolute',
                  bottom: '0',
                  left: '0',
                  right: '0',
                  padding: '1.25rem 1.25rem 1rem',
                  background: 'linear-gradient(transparent, rgba(0,0,0,0.6))',
                }}>
                  <span style={{
                    color: '#fff',
                    fontWeight: 700,
                    fontSize: '0.9rem',
                    display: 'block',
                    textShadow: '0 1px 4px rgba(0,0,0,0.3)',
                  }}>
                    {img.label}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Diagnostic Tests We Offer ── */}
      <section className="diag-tests-section" style={{ padding: '6rem 0' }}>
        <div className="container" style={{ maxWidth: '1400px', textAlign: 'center' }}>
          
          <h2 style={{ fontSize: '2.5rem', color: 'var(--navy)', marginBottom: '1rem' }}>
            Diagnostic Tests We Offer
          </h2>
          <p style={{ fontSize: '1.05rem', color: 'var(--body)', marginBottom: '4rem', maxWidth: '600px', margin: '0 auto 4rem' }}>
            Advanced testing across specialties to help in early detection and better health.
          </p>

          <div className="diag-tests-grid diag-categories-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem', textAlign: 'left' }}>
            {DIAGNOSTICS_CATEGORIES.map((cat, i) => (
              <div key={i} className="diag-category-card" style={{ 
                background: '#fff', borderRadius: '16px', padding: '2rem', 
                border: '1px solid rgba(0,0,0,0.05)', boxShadow: '0 4px 20px rgba(0,0,0,0.02)',
                display: 'flex', flexDirection: 'column',
                transition: 'all 0.3s ease', cursor: 'pointer', height: '100%'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-5px)';
                e.currentTarget.style.boxShadow = '0 12px 30px rgba(13,82,192,0.1)';
                e.currentTarget.style.borderColor = 'rgba(13,82,192,0.15)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.02)';
                e.currentTarget.style.borderColor = 'rgba(0,0,0,0.05)';
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.25rem' }}>
                  <div style={{ width: '56px', height: '56px', borderRadius: '50%', background: 'var(--blue-light)', color: 'var(--blue)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    {cat.icon}
                  </div>
                  <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--navy)', margin: 0, lineHeight: 1.2 }}>
                    {cat.name}
                  </h3>
                </div>
                
                <p style={{ fontSize: '0.85rem', color: 'var(--body)', lineHeight: 1.5, marginBottom: '1.5rem' }}>
                  {cat.desc}
                </p>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '2rem', flexGrow: 1 }}>
                  <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--navy)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Key Tests:</span>
                  <div className="diag-pill-list">
                    {cat.tests.map((test, j) => (
                      <span key={j} className="diag-pill">
                        <span className="diag-pill-dot"></span>
                        {test}
                      </span>
                    ))}
                  </div>
                </div>

                <button onClick={() => navigate('/book-checkup')} style={{ 
                  width: '100%', padding: '0.85rem', background: 'var(--navy)', color: '#fff', 
                  border: 'none', borderRadius: '8px', fontWeight: 600, fontSize: '0.9rem', 
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', cursor: 'pointer', marginTop: 'auto'
                }}>
                  <Calendar size={16} /> Book Test
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Health Checkups Info ── */}
      <section className="diag-packages-section" style={{ padding: '2rem 0 4rem' }}>
        <div className="container" style={{ maxWidth: '1400px' }}>
          <div style={{
            background: 'var(--navy)',
            borderRadius: '16px', padding: '2.5rem 3rem',
            textAlign: 'center', color: '#fff',
            boxShadow: '0 15px 40px rgba(13,82,192,0.15)',
            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem'
          }}>
            <Award size={48} color="var(--orange)" style={{ marginBottom: '0.5rem' }} />
            <h2 style={{ fontSize: '2rem', color: '#fff', margin: 0 }}>
              Health Checkups Available
            </h2>
            <p style={{ fontSize: '1.05rem', color: 'rgba(255,255,255,0.85)', margin: 0, maxWidth: '600px' }}>
              We offer comprehensive health checkup packages at the clinic. Please contact the clinic directly to book a health checkup or inquire about available packages.
            </p>
            <a href={PRIMARY_PHONE_HREF} className="btn btn-orange" style={{ padding: '0.75rem 1.5rem', fontSize: '0.95rem', textDecoration: 'none', marginTop: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Phone size={18} /> Contact Clinic
            </a>
          </div>
        </div>
      </section>

      {/* ── Why Choose Our Diagnostics ── */}
      <section className="diag-why-section" style={{ padding: '2rem 0 4rem' }}>
        <div className="container" style={{ maxWidth: '1400px', textAlign: 'center' }}>
          
          <h2 style={{ fontSize: '2.5rem', color: 'var(--navy)', marginBottom: '4rem' }}>
            Why Choose Our Diagnostics
          </h2>

          <div className="diag-why-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.5rem' }}>
            {[
              { title: 'Certified Lab Standards', desc: 'NABL-accredited labs following strict quality control protocols.', icon: <Award size={32} /> },
              { title: 'Fast Turnaround', desc: 'Quick sample processing and on-time digital reports.', icon: <Clock size={32} /> },
              { title: 'Expert Interpretation', desc: 'Results reviewed and interpreted by qualified specialists.', icon: <UserCheck size={32} /> },
              { title: 'Digital Reports', desc: 'Secure, easy-to-access reports anytime, anywhere.', icon: <Smartphone size={32} /> },
            ].map((f, i) => (
              <div key={i} style={{ 
                background: '#fff', borderRadius: '16px', padding: '2rem 1.5rem', 
                border: '1px solid rgba(0,0,0,0.05)', boxShadow: '0 4px 20px rgba(0,0,0,0.02)',
                display: 'flex', alignItems: 'center', gap: '1rem', textAlign: 'left',
                transition: 'all 0.3s ease', cursor: 'pointer'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-5px)';
                e.currentTarget.style.boxShadow = '0 12px 30px rgba(13,82,192,0.1)';
                e.currentTarget.style.borderColor = 'rgba(13,82,192,0.15)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.02)';
                e.currentTarget.style.borderColor = 'rgba(0,0,0,0.05)';
              }}>
                <div style={{ color: 'var(--blue)', flexShrink: 0 }}>
                  {f.icon}
                </div>
                <div>
                  <h4 style={{ fontSize: '0.95rem', fontWeight: 800, color: 'var(--navy)', marginBottom: '0.25rem' }}>{f.title}</h4>
                  <p style={{ fontSize: '0.8rem', color: 'var(--body)', margin: 0, lineHeight: 1.4 }}>{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA Strip ── */}
      <section className="diag-cta" style={{ padding: '2rem 0' }}>
        <div className="container" style={{ maxWidth: '1400px' }}>
          <div className="m-stack m-p-sm m-center" style={{ 
            background: '#fff', borderRadius: '16px', padding: '2.5rem 3rem',
            border: '1px solid rgba(0,0,0,0.05)', boxShadow: '0 10px 40px rgba(0,0,0,0.04)',
            display: 'flex', justifyContent: 'space-between', alignItems: 'center'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
              <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: 'var(--blue-light)', color: 'var(--blue)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <FileText size={28} />
              </div>
              <div>
                <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--navy)', margin: 0, marginBottom: '0.25rem' }}>
                  Book a Diagnostic Test or Speak to Our Team
                </h3>
                <p style={{ fontSize: '0.95rem', color: 'var(--body)', margin: 0 }}>
                  Take the first step towards better health. Our team is here to help you choose the right test or package.
                </p>
              </div>
            </div>
            
            <div className="m-wrap" style={{ display: 'flex', gap: '1rem' }}>
              <button className="btn btn-orange btn-lg" onClick={() => navigate('/book-checkup')} style={{ padding: '0.75rem 1.5rem', fontSize: '0.95rem' }}>
                <Calendar size={18} /> Book Lab Tests
              </button>
              <a href={PRIMARY_PHONE_HREF} className="btn btn-outline-blue btn-lg" style={{ padding: '0.75rem 1.5rem', fontSize: '0.95rem', textDecoration: 'none' }}>
                <Phone size={18} /> Talk to Clinic
              </a>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Diagnostics;
