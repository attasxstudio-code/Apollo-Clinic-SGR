import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, Phone, Award, FlaskConical, Clock, ShieldCheck, FileText, CheckCircle, FileSignature, Stethoscope, UserCheck, Smartphone } from 'lucide-react';

const PHONE      = '+91 9149425496';
const PHONE_HREF = 'tel:+919149425496';

const TESTS = [
  {
    name: 'Complete Blood Count (CBC)', tag: 'HEMATOLOGY',
    desc: 'Measures different components of your blood to assess overall health and detect infections.',
    includes: ['Accurate Results', 'NABL Certified', 'Quick Turnaround'],
    icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22a8 8 0 0 0 8-8c0-4.4-8-12-8-12S4 9.6 4 14a8 8 0 0 0 8 8z"/><path d="M9 14h6"/><path d="M12 11v6"/></svg>
  },
  {
    name: 'Lipid Profile', tag: 'CARDIOLOGY',
    desc: 'Evaluates cholesterol and triglycerides to assess heart disease risk.',
    includes: ['HDL, LDL, VLDL', 'Total Cholesterol', 'Doctor Reviewed'],
    icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22a8 8 0 0 0 8-8c0-4.4-8-12-8-12S4 9.6 4 14a8 8 0 0 0 8 8z"/></svg>
  },
  {
    name: 'Thyroid Profile (T3, T4, TSH)', tag: 'ENDOCRINOLOGY',
    desc: 'Assesses thyroid hormone levels to detect underactive or overactive thyroid.',
    includes: ['T3, T4, TSH', 'Hormonal Insight', 'Early Detection'],
    icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 12c-2.66 0-4.32-2.3-5-4.5-.68 2.2-2.34 4.5-5 4.5s-4.32-2.3-5-4.5c-.68 2.2-2.34 4.5-5 4.5 2.66 0 4.32 2.3 5 4.5.68-2.2 2.34-4.5 5-4.5s4.32 2.3 5 4.5c.68-2.2 2.34-4.5 5-4.5z"/></svg>
  },
  {
    name: 'Liver Function Test (LFT)', tag: 'HEPATOLOGY',
    desc: 'Checks liver enzymes and proteins to evaluate liver health and function.',
    includes: ['Enzyme Analysis', 'Liver Health', 'Comprehensive Panel'],
    icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M8 4c-3.3 0-6 2.7-6 6 0 5 8 10 10 11.5 2-1.5 10-6.5 10-11.5 0-3.3-2.7-6-6-6-2.2 0-4.1 1.2-5.1 3-1-1.8-2.9-3-5.1-3z"/></svg>
  },
  {
    name: 'Kidney Function Test (KFT)', tag: 'NEPHROLOGY',
    desc: 'Evaluates kidney function and helps detect kidney disorders early.',
    includes: ['Urea, Creatinine', 'eGFR Calculation', 'Kidney Health'],
    icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 21a9 9 0 0 0 9-9c0-5-4-9-9-9s-9 4-9 9a9 9 0 0 0 9 9z"/><path d="M12 12c-2 0-3.5-1.5-3.5-3.5S10 5 12 5s3.5 1.5 3.5 3.5S14 12 12 12z"/><path d="M8.5 15.5c1.5 1.5 3.5 2.5 5.5 2.5"/></svg>
  },
  {
    name: 'HbA1c / Diabetes Screening', tag: 'ENDOCRINOLOGY',
    desc: 'Measures average blood sugar levels over 2-3 months for diabetes management.',
    includes: ['HbA1c Test', 'Diabetes Monitoring', 'Early Detection'],
    icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22a8 8 0 0 0 8-8c0-4.4-8-12-8-12S4 9.6 4 14a8 8 0 0 0 8 8z"/><path d="M9 14h6"/><path d="M12 11v6"/></svg>
  },
  {
    name: 'ECG – 12-Lead Electrocardiogram', tag: 'CARDIOLOGY',
    desc: 'Records the electrical activity of your heart to detect irregularities.',
    includes: ['12-Lead ECG', 'Heart Rhythm', 'Instant Results'],
    icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>
  },
  {
    name: 'Chest X-Ray', tag: 'RADIOLOGY',
    desc: 'Imaging test to examine lungs, heart and chest structures for diagnosis.',
    includes: ['Digital X-Ray', 'Quick & Safe', 'Expert Report'],
    icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22V8M12 8C12 8 9 5 6 5c-2 0-3 1.5-3 3 0 4 3 6 3 9h12c0-3 3-5 3-9 0-1.5-1-3-3-3-3 0-6 3-6 3z"/></svg>
  },
  {
    name: 'Pulmonary Function Test (PFT)', tag: 'PULMONOLOGY',
    desc: 'Assesses lung capacity and function to detect respiratory disorders.',
    includes: ['Lung Function', 'Spirometry Test', 'Doctor Reviewed'],
    icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22V8M12 8C12 8 9 5 6 5c-2 0-3 1.5-3 3 0 4 3 6 3 9h12c0-3 3-5 3-9 0-1.5-1-3-3-3-3 0-6 3-6 3z"/></svg>
  },
  {
    name: 'Ultrasound Abdomen', tag: 'RADIOLOGY',
    desc: 'Non-invasive scan to examine abdominal organs and detect abnormalities.',
    includes: ['High Resolution', 'Safe & Painless', 'Detailed Report'],
    icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/><path d="M8 8h.01"/><path d="M12 8h.01"/><path d="M16 8h.01"/><path d="M8 12h.01"/><path d="M12 12h.01"/><path d="M16 12h.01"/></svg>
  },
];

const PACKAGES = [
  {
    name: 'Basic Health Checkup',
    desc: 'Essential tests for your annual wellness.',
    includes: ['CBC', 'Fasting Blood Sugar', 'Lipid Profile', 'Urine Analysis', 'Doctor Consultation'],
    icon: <FileText size={28} />,
    featured: false,
  },
  {
    name: 'Comprehensive Health Checkup',
    desc: 'A complete overview of your health and well-being.',
    includes: ['CBC', 'Lipid Profile', 'Liver Function Test', 'Kidney Function Test', 'Thyroid Profile', 'HbA1c', 'Urine & Stool Analysis', 'ECG (12-Lead)', 'Doctor Consultation'],
    icon: <Award size={28} />,
    featured: true,
    badge: 'MOST POPULAR'
  },
  {
    name: 'Diabetes Screening Package',
    desc: 'Focused tests for early diabetes detection.',
    includes: ['Fasting Blood Sugar', 'Post-Prandial Sugar', 'HbA1c', 'Kidney Function Test', 'Urine Albumin'],
    icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22a8 8 0 0 0 8-8c0-4.4-8-12-8-12S4 9.6 4 14a8 8 0 0 0 8 8z"/></svg>,
    featured: false,
  },
  {
    name: 'Cardiac Risk Profile',
    desc: 'Assess your heart health and risk factors.',
    includes: ['ECG (12-Lead)', 'Lipid Profile', 'Blood Pressure Check', 'Blood Sugar', 'Cardiac Consultation'],
    icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/></svg>,
    featured: false,
  },
  {
    name: "Women's Wellness Package",
    desc: "Care tailored for women's health at every stage.",
    includes: ['CBC', 'Thyroid Profile', 'Vitamin D', 'Urine Analysis', 'Gynec Consultation'],
    icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 15v7M9 19h6M12 15a6 6 0 100-12 6 6 0 000 12z"/></svg>,
    featured: false,
  },
];

const Diagnostics = () => {
  const navigate = useNavigate();

  return (
    <div style={{ background: '#f8fafc', minHeight: '100vh', paddingBottom: '4rem' }}>
      
      {/* ── Hero Section ── */}
      <section style={{ padding: '5rem 0' }}>
        <div className="container" style={{ maxWidth: '1400px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'center' }}>
          
          <div style={{ maxWidth: '600px' }}>
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

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
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
            <div style={{ borderRadius: '24px', overflow: 'hidden', boxShadow: '0 20px 40px rgba(0,0,0,0.08)' }}>
              <img src="/lab-technician.jpg" alt="Apollo Clinic Diagnostics" style={{ width: '100%', height: 'auto', display: 'block', backgroundColor: '#e2e8f0', minHeight: '400px', objectFit: 'cover' }} />
            </div>
            
            {/* Stats Card */}
            <div style={{ 
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

      {/* ── Diagnostic Tests We Offer ── */}
      <section style={{ padding: '6rem 0' }}>
        <div className="container" style={{ maxWidth: '1400px', textAlign: 'center' }}>
          
          <h2 style={{ fontSize: '2.5rem', color: 'var(--navy)', marginBottom: '1rem' }}>
            Diagnostic Tests We Offer
          </h2>
          <p style={{ fontSize: '1.05rem', color: 'var(--body)', marginBottom: '4rem', maxWidth: '600px', margin: '0 auto 4rem' }}>
            Advanced testing across specialties to help in early detection and better health.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '1.5rem', textAlign: 'left' }}>
            {TESTS.map((test, i) => (
              <div key={i} style={{ 
                background: '#fff', borderRadius: '16px', padding: '1.5rem', 
                border: '1px solid rgba(0,0,0,0.05)', boxShadow: '0 4px 20px rgba(0,0,0,0.02)',
                display: 'flex', flexDirection: 'column',
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
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
                  <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'var(--blue-light)', color: 'var(--blue)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    {test.icon}
                  </div>
                  <span style={{ fontSize: '0.65rem', fontWeight: 700, color: 'var(--blue)', background: 'var(--blue-light)', padding: '0.2rem 0.6rem', borderRadius: '4px', letterSpacing: '0.5px' }}>
                    {test.tag}
                  </span>
                </div>
                
                <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--navy)', marginBottom: '0.5rem', lineHeight: 1.3 }}>
                  {test.name}
                </h3>
                <p style={{ fontSize: '0.8rem', color: 'var(--body)', lineHeight: 1.5, marginBottom: '1.25rem', flexGrow: 1 }}>
                  {test.desc}
                </p>
                
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginBottom: '1.5rem' }}>
                  {test.includes.map((inc, j) => (
                    <span key={j} style={{ fontSize: '0.7rem', color: 'var(--muted)', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                      <span style={{ width: '4px', height: '4px', borderRadius: '50%', background: 'var(--blue)' }}></span>
                      {inc}
                    </span>
                  ))}
                </div>

                <button onClick={() => navigate('/book')} style={{ 
                  width: '100%', padding: '0.75rem', background: 'var(--navy)', color: '#fff', 
                  border: 'none', borderRadius: '8px', fontWeight: 600, fontSize: '0.85rem', 
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', cursor: 'pointer'
                }}>
                  <Calendar size={14} /> Book Test
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Featured Health Checkups ── */}
      <section style={{ padding: '2rem 0 6rem' }}>
        <div className="container" style={{ maxWidth: '1400px', textAlign: 'center' }}>
          
          <h2 style={{ fontSize: '2.5rem', color: 'var(--navy)', marginBottom: '1rem' }}>
            Featured Health Checkups
          </h2>
          <p style={{ fontSize: '1.05rem', color: 'var(--body)', marginBottom: '4rem', maxWidth: '600px', margin: '0 auto 4rem' }}>
            Comprehensive packages for proactive health and peace of mind.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '1.5rem', textAlign: 'left' }}>
            {PACKAGES.map((pkg, i) => (
              <div key={i} style={{ 
                background: pkg.featured ? 'var(--navy)' : '#fff', 
                borderRadius: '16px', padding: '1.5rem', 
                border: pkg.featured ? 'none' : '1px solid rgba(0,0,0,0.05)', 
                boxShadow: pkg.featured ? '0 10px 30px rgba(13,82,192,0.15)' : '0 4px 20px rgba(0,0,0,0.02)',
                display: 'flex', flexDirection: 'column', position: 'relative', overflow: 'hidden',
                transition: 'all 0.3s ease', cursor: 'pointer'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-5px)';
                if (pkg.featured) {
                  e.currentTarget.style.boxShadow = '0 15px 40px rgba(13,82,192,0.25)';
                } else {
                  e.currentTarget.style.boxShadow = '0 12px 30px rgba(13,82,192,0.1)';
                  e.currentTarget.style.borderColor = 'rgba(13,82,192,0.15)';
                }
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                if (pkg.featured) {
                  e.currentTarget.style.boxShadow = '0 10px 30px rgba(13,82,192,0.15)';
                } else {
                  e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.02)';
                  e.currentTarget.style.borderColor = 'rgba(0,0,0,0.05)';
                }
              }}>
                {pkg.badge && (
                  <div style={{ position: 'absolute', top: 16, right: 16, background: '#3b82f6', color: '#fff', fontSize: '0.65rem', fontWeight: 700, padding: '0.2rem 0.6rem', borderRadius: '4px', letterSpacing: '0.5px' }}>
                    {pkg.badge}
                  </div>
                )}
                
                <div style={{ color: pkg.featured ? '#fff' : 'var(--blue)', marginBottom: '1rem' }}>
                  {pkg.icon}
                </div>
                
                <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: pkg.featured ? '#fff' : 'var(--navy)', marginBottom: '0.5rem', lineHeight: 1.3 }}>
                  {pkg.name}
                </h3>
                <p style={{ fontSize: '0.8rem', color: pkg.featured ? 'rgba(255,255,255,0.8)' : 'var(--body)', lineHeight: 1.5, marginBottom: '1.5rem' }}>
                  {pkg.desc}
                </p>
                
                <div style={{ marginBottom: '1.5rem', flexGrow: 1 }}>
                  <div style={{ fontSize: '0.75rem', color: pkg.featured ? 'rgba(255,255,255,0.5)' : 'var(--muted)', marginBottom: '0.5rem' }}>Includes:</div>
                  <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                    {pkg.includes.map((inc, j) => (
                      <li key={j} style={{ fontSize: '0.75rem', color: pkg.featured ? '#fff' : 'var(--body)', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                        <CheckCircle size={12} color={pkg.featured ? '#4ade80' : 'var(--green)'} /> {inc}
                      </li>
                    ))}
                  </ul>
                </div>

                <button onClick={() => navigate('/book')} style={{ 
                  width: '100%', padding: '0.75rem', 
                  background: pkg.featured ? '#3b82f6' : 'transparent', 
                  color: pkg.featured ? '#fff' : 'var(--navy)', 
                  border: pkg.featured ? 'none' : '1px solid var(--border)', 
                  borderRadius: '8px', fontWeight: 600, fontSize: '0.85rem', 
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', cursor: 'pointer'
                }}>
                  <Calendar size={14} /> Book This Package
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Why Choose Our Diagnostics ── */}
      <section style={{ padding: '2rem 0 4rem' }}>
        <div className="container" style={{ maxWidth: '1400px', textAlign: 'center' }}>
          
          <h2 style={{ fontSize: '2.5rem', color: 'var(--navy)', marginBottom: '4rem' }}>
            Why Choose Our Diagnostics
          </h2>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.5rem' }}>
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
      <section style={{ padding: '2rem 0' }}>
        <div className="container" style={{ maxWidth: '1400px' }}>
          <div style={{ 
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
            
            <div style={{ display: 'flex', gap: '1rem' }}>
              <button className="btn btn-orange btn-lg" onClick={() => navigate('/book')} style={{ padding: '0.75rem 1.5rem', fontSize: '0.95rem' }}>
                <Calendar size={18} /> Book Appointment
              </button>
              <a href={PHONE_HREF} className="btn btn-outline-blue btn-lg" style={{ padding: '0.75rem 1.5rem', fontSize: '0.95rem', textDecoration: 'none' }}>
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
