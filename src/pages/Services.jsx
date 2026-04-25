import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, Phone, ArrowRight, CheckCircle, Clock, MapPin } from 'lucide-react';

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

const SPECIALTIES = [
  {
    id: 'gp', name: 'General Physician', dept: 'Primary Care',
    doctor: 'Dr. Shabir Ahmad Mir', doctorId: 'dr-shabir-ahmad-mir',
    desc: 'Comprehensive primary care including chronic disease management, preventive medicine, and internal medicine for patients of all ages.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
      </svg>
    ),
    features: ['Fever & Infection Care', 'Chronic Disease Management', 'Health Screenings', 'Preventive Care Advice'],
  },
  {
    id: 'cardio', name: 'Cardiology', dept: 'Cardiac Care',
    doctor: 'Visiting Cardiologist', doctorId: null,
    desc: 'Expert cardiac evaluation, ECG and echocardiogram interpretation, risk stratification, and ongoing cardiovascular management.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
      </svg>
    ),
    features: ['ECG (12-Lead)', 'Echocardiogram (ECHO)', 'Cardiac Risk Assessment', 'Hypertension Management'],
  },
  {
    id: 'paed', name: 'Pediatrics', dept: 'Child Health',
    doctor: 'Dr. Aijaz Hussain', doctorId: 'dr-aijaz-hussain',
    desc: 'Comprehensive child healthcare from infancy through adolescence — growth monitoring, vaccinations, nutrition, and illness management.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="8" r="5"/><path d="M6 21v-1a6 6 0 0112 0v1"/>
      </svg>
    ),
    features: ['Vaccinations & Immunization', 'Growth Monitoring', 'Child Nutrition Guidance', 'Pediatric Illness Care'],
  },
  {
    id: 'gyn', name: 'Gynecology', dept: "Women's Health",
    doctor: 'Dr. Saima Bano', doctorId: 'dr-saima-bano',
    desc: "Complete women's healthcare — antenatal and postnatal care, reproductive wellness, menstrual health, and hormonal disorders.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22V8M12 8C12 8 9 5 6 5c-2 0-3 1.5-3 3 0 4 3 6 3 9h12c0-3 3-5 3-9 0-1.5-1-3-3-3-3 0-6 3-6 3z"/>
      </svg>
    ),
    features: ['Antenatal & Postnatal Care', 'Menstrual Health', 'Reproductive Wellness', 'Hormonal Disorders'],
  },
  {
    id: 'derm', name: 'Dermatology', dept: 'Skin & Hair',
    doctor: 'Dr. Nazia Rashid', doctorId: 'dr-nazia-rashid',
    desc: 'Expert diagnosis and treatment of skin, hair, and nail conditions — from medical dermatology to cosmetic concerns.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/>
      </svg>
    ),
    features: ['Acne & Eczema', 'Hair Loss Management', 'Cosmetic Dermatology', 'Skin Allergy Care'],
  },
  {
    id: 'ortho', name: 'Orthopedics', dept: 'Bone & Joint',
    doctor: 'Dr. Mushtaq Ahmed', doctorId: 'dr-mushtaq-ahmed',
    desc: 'Diagnosis and treatment of musculoskeletal conditions — bone and joint pain, spine disorders, sports injuries, and rehabilitation.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
        <line x1="12" y1="2" x2="12" y2="22"/><path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/>
      </svg>
    ),
    features: ['Joint & Bone Pain', 'Spine Conditions', 'Sports Injury', 'Rehabilitation'],
  },
  {
    id: 'psych', name: 'Clinical Psychology', dept: 'Mental Health',
    doctor: 'Dr. Asma Yousuf', doctorId: 'dr-asma-yousuf',
    desc: 'Evidence-based psychological care in a confidential setting — anxiety, depression, cognitive therapy, and stress management.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z"/>
      </svg>
    ),
    features: ['Anxiety & Depression', 'Individual Counselling', 'Cognitive Behavioural Therapy', 'Stress Management'],
  },
  {
    id: 'ent', name: 'ENT', dept: 'Ear, Nose & Throat',
    doctor: 'Visiting ENT Specialist', doctorId: null,
    desc: 'Evaluation and management of ear, nose, throat, and sinus conditions — from infections to chronic ENT problems.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2a3 3 0 013 3v7a3 3 0 01-6 0V5a3 3 0 013-3z"/><path d="M19 10v2a7 7 0 01-14 0v-2"/>
        <line x1="12" y1="19" x2="12" y2="22"/>
      </svg>
    ),
    features: ['Ear & Hearing Issues', 'Sinusitis', 'Throat & Tonsil Care', 'Nasal Conditions'],
  },
  {
    id: 'diab', name: 'Diabetes & Endocrinology', dept: 'Metabolic Health',
    doctor: 'Dr. Shabir Ahmad Mir', doctorId: 'dr-shabir-ahmad-mir',
    desc: 'Comprehensive diabetes care, thyroid disorders, and metabolic health management with regular monitoring and personalised treatment.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z"/>
        <path d="M8 12h8M12 8v8"/>
      </svg>
    ),
    features: ['Diabetes Monitoring', 'Thyroid Disorders', 'HbA1c Management', 'Metabolic Screening'],
  },
  {
    id: 'resp', name: 'Respiratory Care', dept: 'Pulmonology',
    doctor: 'Visiting Pulmonologist', doctorId: null,
    desc: 'Assessment and management of respiratory conditions — asthma, COPD, breathlessness — with in-house Pulmonary Function Testing.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22V8M12 8C12 8 9 5 6 5c-2 0-3 1.5-3 3 0 4 3 6 3 9h12c0-3 3-5 3-9 0-1.5-1-3-3-3-3 0-6 3-6 3z"/>
      </svg>
    ),
    features: ['Asthma Management', 'COPD & Bronchitis', 'Pulmonary Function Test (PFT)', 'Breathlessness Assessment'],
  },
];

/* ── Service card ── */
const ServiceCard = ({ svc, vis, delay, onBook, onDoctor }) => {
  const [hov, setHov] = React.useState(false);
  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        background: 'linear-gradient(150deg, #ffffff 0%, #f7fafe 100%)',
        border: `1px solid ${hov ? 'rgba(13,82,192,0.2)' : 'rgba(13,82,192,0.08)'}`,
        borderRadius: 'var(--r-xl)',
        display: 'flex', flexDirection: 'column',
        transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
        boxShadow: hov ? '0 16px 32px rgba(13,82,192,0.12)' : '0 4px 16px rgba(13,82,192,0.04)',
        transform: hov ? 'translateY(-3px)' : 'none',
        opacity: vis ? 1 : 0,
        transitionDelay: `${delay}s`,
        overflow: 'hidden',
      }}
    >
      {/* Top accent line */}
      <div style={{ height: 3, background: hov ? 'var(--blue)' : 'var(--border)', transition: 'background 0.3s' }} />

      <div style={{ padding: '1.25rem', flex: 1, display: 'flex', flexDirection: 'column', gap: '0' }}>
        {/* Icon + dept */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
          <div style={{
            width: 46, height: 46, borderRadius: 'var(--r-md)',
            background: hov ? 'linear-gradient(135deg, var(--navy), var(--blue))' : 'var(--blue-light)',
            color: hov ? '#fff' : 'var(--blue)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            transition: 'all 0.3s',
            boxShadow: hov ? '0 4px 12px rgba(13,82,192,0.2)' : 'none',
          }}>
            {svc.icon}
          </div>
          <span style={{ background: 'var(--bg)', border: '1px solid var(--border)', borderRadius: 'var(--r-sm)', fontSize: '0.65rem', fontWeight: 700, color: 'var(--muted)', padding: '0.18rem 0.55rem', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
            {svc.dept}
          </span>
        </div>

        <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--heading)', marginBottom: '0.4rem', lineHeight: 1.3 }}>{svc.name}</h3>
        <p style={{ fontSize: '0.86rem', color: 'var(--body)', lineHeight: 1.55, marginBottom: '0.85rem' }}>{svc.desc}</p>

        {/* Doctor */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '1rem', padding: '0.5rem 0.65rem', background: 'rgba(13,82,192,0.03)', borderRadius: 'var(--r-md)', border: '1px solid rgba(13,82,192,0.05)' }}>
          <div style={{ width: 26, height: 26, borderRadius: '50%', background: 'linear-gradient(135deg, var(--blue-light), #e0eeff)', color: 'var(--blue)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.65rem', fontWeight: 900, flexShrink: 0 }}>
            {svc.doctor.includes('Visiting') ? '?' : svc.doctor.split(' ')[1]?.[0]}{svc.doctor.split(' ')[2]?.[0]}
          </div>
          <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--heading)' }}>{svc.doctor}</span>
        </div>

        {/* Feature tags */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem', marginBottom: '1.25rem', flex: 1 }}>
          {svc.features.map((f, i) => (
            <span key={i} style={{ background: 'var(--blue-light)', color: 'var(--blue)', fontSize: '0.68rem', fontWeight: 600, padding: '0.18rem 0.55rem', borderRadius: 'var(--r-sm)' }}>
              {f}
            </span>
          ))}
        </div>

        <button
          onClick={onBook}
          style={{
            width: '100%', padding: '0.7rem',
            background: hov ? 'var(--navy)' : '#fff',
            color: hov ? '#fff' : 'var(--navy)',
            border: '1.5px solid var(--navy)',
            borderRadius: 'var(--r-md)',
            fontWeight: 700, fontSize: '0.85rem',
            cursor: 'pointer', fontFamily: 'inherit',
            transition: 'all 0.2s',
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem',
          }}
        >
          <Calendar size={14} /> Book Consultation
        </button>
      </div>
    </div>
  );
};

const Services = () => {
  const navigate = useNavigate();
  const [ref, vis] = useInView(0.04);
  const goBook = () => { navigate('/book'); window.scrollTo(0, 0); };
  const goDoctor = (id) => { if (id) { navigate(`/doctors/${id}`); window.scrollTo(0, 0); } };

  return (
    <div style={{ background: '#fff' }}>

      {/* ── Hero ── */}
      <section style={{ background: '#fff', borderBottom: '1px solid var(--border)', padding: 'clamp(3.5rem,8vw,5rem) 0 clamp(2.5rem,5vw,3.5rem)' }}>
        <div className="container">
          <nav style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.8rem', color: 'var(--muted)', marginBottom: '1.5rem' }}>
            <button onClick={() => { navigate('/'); window.scrollTo(0,0); }} style={{ background: 'none', border: 'none', color: 'var(--blue)', fontWeight: 600, cursor: 'pointer', fontSize: '0.8rem', fontFamily: 'inherit' }}>Home</button>
            <ArrowRight size={12} />
            <span>Clinical Specialties</span>
          </nav>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 440px', gap: '3rem', alignItems: 'center' }}>
            <div>
              <div className="section-label">Our Services</div>
              <h1 style={{ marginBottom: '0.85rem' }}>
                Clinical <span style={{ color: 'var(--blue)' }}>Specialties</span>
              </h1>
              <p style={{ fontSize: '1rem', color: 'var(--body)', lineHeight: 1.72, marginBottom: '2rem', maxWidth: 480 }}>
                Expert multi-specialty care across 10+ disciplines — all delivered by verified, experienced specialists under one roof at Apollo Clinic, Karan Nagar Srinagar.
              </p>
              <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                <button className="btn btn-primary btn-lg" onClick={goBook} style={{ borderRadius: 'var(--r-full)' }}>
                  <Calendar size={16} /> Book Appointment
                </button>
                <a href={PHONE_HREF} className="btn btn-ghost btn-lg" style={{ borderRadius: 'var(--r-full)' }}>
                  <Phone size={16} /> {PHONE}
                </a>
              </div>
            </div>

            {/* Image with Floating Stats Overlay */}
            <div style={{ position: 'relative', marginTop: '1rem' }}>
              {/* Collage Image */}
              <div style={{ borderRadius: 'var(--r-xl)', overflow: 'hidden', boxShadow: '0 20px 40px rgba(0,0,0,0.08)' }}>
                <img src="/services-collage.jpg" alt="Apollo Clinic Services" style={{ width: '100%', display: 'block', objectFit: 'cover' }} />
              </div>

              {/* Smaller Stats panel floating overlay */}
              <div style={{
                position: 'absolute', bottom: '-1.5rem', left: '-2.5rem',
                background: '#fff', border: '1px solid var(--border)', borderRadius: 'var(--r-xl)',
                padding: '1.2rem', boxShadow: '0 10px 30px rgba(15,23,42,0.08)',
                maxWidth: '280px',
              }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.8rem' }}>
                  {[
                    { n: '10+', l: 'Specialties' },
                    { n: '6',   l: 'Doctors' },
                    { n: '24/7', l: 'Reports Online' },
                    { n: '100%', l: 'In-House Lab' },
                  ].map(s => (
                    <div key={s.l} style={{ textAlign: 'center', padding: '0.75rem 0.5rem', background: '#f8fafc', borderRadius: 'var(--r-md)', border: '1px solid var(--border)' }}>
                      <div style={{ fontSize: '1.4rem', fontWeight: 900, color: 'var(--navy)', letterSpacing: '-0.03em', lineHeight: 1 }}>{s.n}</div>
                      <div style={{ fontSize: '0.62rem', color: 'var(--muted)', fontWeight: 600, marginTop: '0.3rem' }}>{s.l}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        <style>{`@media(max-width:860px){
          section > .container > div[style*="grid-template-columns: 1fr 440px"]{grid-template-columns:1fr!important; gap: 2rem !important; padding-bottom: 1.5rem;}
          section > .container > div[style*="grid-template-columns"] > div:last-child { margin-top: 2rem !important; }
          section > .container > div[style*="grid-template-columns"] > div:last-child > div:last-child { left: 50% !important; transform: translateX(-50%); bottom: -2rem !important; width: 90%; max-width: none; }
        }`}</style>
      </section>

      {/* ── Trust strip ── */}
      <div style={{ background: 'var(--bg)', borderBottom: '1px solid var(--border)', padding: '1.25rem 0' }}>
        <div className="container">
          <div style={{ display: 'flex', gap: '1.25rem', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center' }}>
            {[
              <CheckCircle size={14} />, 'Verified & Credentialed Specialists',
              <CheckCircle size={14} />, 'In-House Diagnostics',
              <CheckCircle size={14} />, 'Patient-First Approach',
              <CheckCircle size={14} />, 'Walk-In Friendly',
            ].reduce((acc, item, i) => {
              if (i % 2 === 0) return [...acc, { icon: item }];
              acc[acc.length - 1].text = item;
              return acc;
            }, []).map((item, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--body)', fontSize: '0.82rem', fontWeight: 500 }}>
                <span style={{ color: 'var(--green)' }}>{item.icon}</span>{item.text}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Services grid ── */}
      <section style={{ background: 'var(--bg)', padding: '4.5rem 0' }}>
        <div className="container">
          <div style={{ maxWidth: 600, marginBottom: '2.5rem' }}>
            <div className="section-label">All Specialties</div>
            <h2 style={{ marginBottom: '0.65rem' }}>Expert Care Across Every Specialty</h2>
            <p style={{ margin: 0, color: 'var(--body)' }}>
              From primary care to specialist consultations — find the right doctor for your health needs.
            </p>
          </div>

          <div ref={ref} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '1rem' }}>
            {SPECIALTIES.map((svc, i) => (
              <ServiceCard key={svc.id} svc={svc} vis={vis} delay={i * 0.04} onBook={goBook} onDoctor={() => goDoctor(svc.doctorId)} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Info strip ── */}
      <section style={{ background: '#fff', borderTop: '1px solid var(--border)', padding: '3rem 0' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' }}>
            {[
              { icon: <Clock size={18} />, label: 'Consultation Hours', lines: ['Mon – Sat: 12:00 PM – 7:00 PM', 'Sunday: 10:00 AM – 1:30 PM'] },
              { icon: <MapPin size={18} />, label: 'Our Location', lines: ['Near National School, Arham Towers', 'Karan Nagar, Srinagar, J&K'] },
              { icon: <Phone size={18} />, label: 'Appointments', lines: [PHONE, 'Call or WhatsApp to book'] },
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

      {/* ── CTA ── */}
      <section style={{ padding: '3.5rem 0' }}>
        <div className="container">
          <div className="cta-banner">
            <div style={{ fontSize: '0.72rem', fontWeight: 700, color: 'rgba(255,255,255,0.65)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.4rem' }}>
              Apollo Clinic Srinagar
            </div>
            <h2 style={{ color: '#fff', marginBottom: '0.5rem', fontSize: 'clamp(1.1rem,3vw,1.6rem)' }}>
              Need help choosing the right specialty?
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.65)', marginBottom: '1.75rem', fontSize: '0.92rem' }}>
              Our front desk will connect you with the right specialist. Call us or book online.
            </p>
            <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <button onClick={goBook} className="btn btn-lg" style={{ background: '#fff', color: 'var(--navy)', border: 'none', borderRadius: 'var(--r-full)' }}>
                <Calendar size={16} /> Book Appointment
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

export default Services;
