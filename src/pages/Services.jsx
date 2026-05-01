import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, Phone, Stethoscope, FlaskConical, ShieldCheck, FileText, CheckCircle, Bone, Baby, Ear, HeartPulse, Eye, Brain, Smile, Apple, Activity, Users } from 'lucide-react';

import { PRIMARY_PHONE_HREF } from '../config/contact';

export const SPECIALTIES = [
  {
    name: 'Orthopaedics',
    desc: 'Care for bone, joint, spine, muscle, ligament, and sports-related problems with expert consultation and treatment guidance.',
    icon: <Bone size={32} strokeWidth={1.5} />,
  },
  {
    name: 'Paediatrician',
    desc: 'Child healthcare services for infants, children, and teenagers, including routine checkups, growth monitoring, fever, infections, and vaccinations.',
    icon: <Baby size={32} strokeWidth={1.5} />,
  },
  {
    name: 'Physician',
    desc: 'General medical consultation for common illnesses, fever, infections, diabetes, blood pressure, weakness, and preventive health advice.',
    icon: <Stethoscope size={32} strokeWidth={1.5} />,
  },
  {
    name: 'ENT',
    desc: 'Diagnosis and treatment support for ear, nose, and throat concerns including sinus issues, throat infections, hearing problems, and allergy-related symptoms.',
    icon: <Ear size={32} strokeWidth={1.5} />,
  },
  {
    name: 'Cardiologist',
    desc: 'Heart health consultation for chest discomfort, blood pressure, ECG evaluation, heart rhythm concerns, and preventive cardiac care.',
    icon: <HeartPulse size={32} strokeWidth={1.5} />,
  },
  {
    name: 'Ophthalmologist',
    desc: 'Eye care services for vision problems, eye infections, eye pressure checks, general eye examination, and specialist consultation.',
    icon: <Eye size={32} strokeWidth={1.5} />,
  },
  {
    name: 'Neuro Surgeon',
    desc: 'Specialist consultation for brain, spine, nerve-related concerns, headaches, back pain, neurological symptoms, and surgical opinion when required.',
    icon: <Brain size={32} strokeWidth={1.5} />,
  },
  {
    name: 'Dentist',
    desc: 'Dental consultation and oral care for tooth pain, gum problems, cleaning, cavities, dental checkups, and preventive dental care.',
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M10 21v-4a2 2 0 014 0v4"/>
        <path d="M12 4a3 3 0 00-3 3v2c0 1.5 2 2 2 3v1a1 1 0 002 0v-1c0-1 2-1.5 2-3V7a3 3 0 00-3-3z"/>
        <path d="M7 9a5 5 0 00-5 5v2a3 3 0 006 0v-2"/>
        <path d="M17 9a5 5 0 015 5v2a3 3 0 01-6 0v-2"/>
      </svg>
    ),
  },
  {
    name: 'Psychologist',
    desc: 'Mental wellness support for stress, anxiety, emotional health, behavioral concerns, counseling, and psychological guidance.',
    icon: <Smile size={32} strokeWidth={1.5} />,
  },
  {
    name: 'Dietician',
    desc: 'Personalized nutrition guidance for weight management, diabetes, cholesterol, digestive health, pregnancy nutrition, and lifestyle improvement.',
    icon: <Apple size={32} strokeWidth={1.5} />,
  },
  {
    name: 'Urologist',
    desc: 'Consultation for urinary tract problems, kidney and bladder concerns, prostate issues, stones, infections, and male urological health.',
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 10a4 4 0 0 1-4 4H5.5a2.5 2.5 0 0 1-2.5-2.5V8a4 4 0 0 1 4-4H8a4 4 0 0 1 4 4v2Z"/>
        <path d="M12 10a4 4 0 0 0 4 4h2.5a2.5 2.5 0 0 0 2.5-2.5V8a4 4 0 0 0-4-4h-1a4 4 0 0 0-4 4v2Z"/>
        <path d="M12 14v8"/>
        <path d="M8 22h8"/>
      </svg>
    ),
  },
  {
    name: 'Physiotherapist',
    desc: 'Rehabilitation and therapy support for pain relief, injury recovery, mobility improvement, posture correction, and post-surgical recovery.',
    icon: <Activity size={32} strokeWidth={1.5} />,
  },
  {
    name: 'Infertility Clinic',
    desc: 'Consultation and guidance for fertility concerns, reproductive health, pregnancy planning, and specialist evaluation for couples.',
    icon: <Users size={32} strokeWidth={1.5} />,
  },
];

const Services = () => {
  const navigate = useNavigate();

  return (
    <div style={{ background: '#f8fafc', minHeight: '100vh', paddingBottom: '4rem' }}>
      
      {/* ── Hero Section ── */}
      <section className="svc-hero" style={{ padding: '5rem 0' }}>
        <div className="container m-grid-1" style={{ maxWidth: '1400px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'center' }}>
          
          <div className="m-center" style={{ maxWidth: '600px' }}>
            <div style={{ display: 'inline-block', marginBottom: '1rem' }}>
              <span style={{ color: 'var(--blue)', fontWeight: 800, fontSize: '0.85rem', letterSpacing: '1px', textTransform: 'uppercase' }}>
                OUR SERVICES
              </span>
              <div style={{ height: '3px', width: '40px', background: 'var(--orange)', marginTop: '4px' }}></div>
            </div>
            
            <h1 style={{ fontSize: '3.5rem', lineHeight: 1.1, marginBottom: '1.5rem', color: 'var(--navy)' }}>
              Comprehensive Care,<br/>Closer to You
            </h1>
            
            <p style={{ fontSize: '1.05rem', color: 'var(--body)', marginBottom: '3rem', lineHeight: 1.6 }}>
              At Apollo Clinic, we bring together experienced doctors, advanced technology, and compassionate care to provide complete healthcare solutions under one roof.
            </p>

            <div className="svc-features" style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'var(--blue-light)', color: 'var(--blue)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Stethoscope size={20} />
                </div>
                <span style={{ fontSize: '0.95rem', color: 'var(--body)', fontWeight: 500 }}>Multi-specialty care for all age groups</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'var(--blue-light)', color: 'var(--blue)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <FlaskConical size={20} />
                </div>
                <span style={{ fontSize: '0.95rem', color: 'var(--body)', fontWeight: 500 }}>Advanced diagnostics and in-house lab</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'var(--blue-light)', color: 'var(--blue)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <ShieldCheck size={20} />
                </div>
                <span style={{ fontSize: '0.95rem', color: 'var(--body)', fontWeight: 500 }}>Patient-first approach with 24/7 support</span>
              </div>
            </div>
          </div>

          <div style={{ position: 'relative' }}>
            <div className="svc-hero-img" style={{ borderRadius: '24px', overflow: 'hidden', boxShadow: '0 20px 40px rgba(0,0,0,0.08)' }}>
              {/* Replace with actual image later */}
              <img src="/services-collage.jpg" alt="Apollo Clinic Services" style={{ width: '100%', height: 'auto', display: 'block', backgroundColor: '#e2e8f0', minHeight: '400px' }} />
            </div>
            
            {/* Stats Card */}
            <div className="m-static svc-stats" style={{ 
              position: 'absolute', bottom: '-2rem', left: '-2rem', 
              background: '#fff', padding: '2rem', borderRadius: '20px', 
              boxShadow: '0 10px 30px rgba(0,0,0,0.08)',
              display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <Stethoscope size={32} className="text-blue" />
                <div>
                  <div style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--navy)' }}>10+</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--muted)', fontWeight: 600 }}>Specialties</div>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--blue)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
                <div>
                  <div style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--navy)' }}>Expert</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--muted)', fontWeight: 600 }}>Doctors</div>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <FileText size={32} className="text-blue" />
                <div>
                  <div style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--navy)' }}>24/7</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--muted)', fontWeight: 600 }}>Reports Online</div>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <FlaskConical size={32} className="text-blue" />
                <div>
                  <div style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--navy)' }}>In-House</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--muted)', fontWeight: 600 }}>Lab</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Specialties Section ── */}
      <section style={{ padding: '6rem 0' }}>
        <div className="container" style={{ maxWidth: '1400px', textAlign: 'center' }}>
          <div style={{ display: 'inline-flex', flexDirection: 'column', alignItems: 'center', marginBottom: '1rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <div style={{ height: '2px', width: '20px', background: 'var(--orange)' }}></div>
              <span style={{ color: 'var(--blue)', fontWeight: 800, fontSize: '0.85rem', letterSpacing: '1px', textTransform: 'uppercase' }}>
                OUR SPECIALTIES
              </span>
            </div>
          </div>
          
          <h2 style={{ fontSize: '2.5rem', color: 'var(--navy)', marginBottom: '1rem' }}>
            Care Across Every Specialty
          </h2>
          <p style={{ fontSize: '1.05rem', color: 'var(--body)', marginBottom: '4rem', maxWidth: '600px', margin: '0 auto 4rem' }}>
            We offer a wide range of medical services to address all your healthcare needs.
          </p>

          <div className="svc-specialty-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.5rem' }}>
            {SPECIALTIES.map((svc, i) => (
              <div key={i} style={{ 
                background: '#fff', borderRadius: '16px', padding: '2rem 1.5rem', 
                border: '1px solid rgba(0,0,0,0.05)', boxShadow: '0 4px 20px rgba(0,0,0,0.02)',
                display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center',
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
                <div style={{ 
                  width: '64px', height: '64px', borderRadius: '50%', 
                  background: 'var(--blue-light)', color: 'var(--blue)', 
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  marginBottom: '1.25rem'
                }}>
                  {svc.icon}
                </div>
                <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--navy)', marginBottom: '0.5rem' }}>
                  {svc.name}
                </h3>
                <p style={{ fontSize: '0.8rem', color: 'var(--body)', lineHeight: 1.5 }}>
                  {svc.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Why Choose Us ── */}
      <section style={{ padding: '4rem 0' }}>
        <div className="container" style={{ maxWidth: '1400px', textAlign: 'center' }}>
          <div style={{ display: 'inline-flex', flexDirection: 'column', alignItems: 'center', marginBottom: '1rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <div style={{ height: '2px', width: '20px', background: 'var(--orange)' }}></div>
              <span style={{ color: 'var(--blue)', fontWeight: 800, fontSize: '0.85rem', letterSpacing: '1px', textTransform: 'uppercase' }}>
                WHY CHOOSE OUR SERVICES
              </span>
            </div>
          </div>
          
          <h2 style={{ fontSize: '2.5rem', color: 'var(--navy)', marginBottom: '4rem' }}>
            Your Health, Our Priority
          </h2>

          <div className="svc-why-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.5rem' }}>
            {[
              { title: 'Experienced Doctors', desc: 'Qualified specialists with years of expertise and a patient-first mindset.', icon: <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg> },
              { title: 'Modern Diagnostics', desc: 'Advanced technology and in-house lab for accurate results.', icon: <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="2" width="16" height="20" rx="2" ry="2"/><path d="M12 18h.01"/></svg> },
              { title: 'Personalized Care', desc: 'Tailored treatment plans focused on your unique health needs.', icon: <ShieldCheck size={32} /> },
              { title: 'Coordinated Treatment', desc: 'Seamless care across specialties for better health outcomes.', icon: <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg> },
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
      <section className="svc-cta" style={{ padding: '2rem 0' }}>
        <div className="container" style={{ maxWidth: '1400px' }}>
          <div className="m-stack m-p-sm m-center" style={{ 
            background: '#fff', borderRadius: '16px', padding: '2.5rem 3rem',
            border: '1px solid rgba(0,0,0,0.05)', boxShadow: '0 10px 40px rgba(0,0,0,0.04)',
            display: 'flex', justifyContent: 'space-between', alignItems: 'center'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
              <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: 'var(--blue-light)', color: 'var(--blue)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Calendar size={28} />
              </div>
              <div>
                <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--navy)', margin: 0, marginBottom: '0.25rem' }}>
                  Take the first step towards better health.
                </h3>
                <p style={{ fontSize: '0.95rem', color: 'var(--body)', margin: 0 }}>
                  Book an appointment or talk to our care team today.
                </p>
              </div>
            </div>
            
            <div className="m-wrap" style={{ display: 'flex', gap: '1rem' }}>
              <button className="btn btn-orange btn-lg" onClick={() => navigate('/book')} style={{ padding: '0.75rem 1.5rem', fontSize: '0.95rem' }}>
                <Calendar size={18} /> Book Appointment
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

export default Services;
