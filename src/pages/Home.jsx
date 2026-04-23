import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Phone, MapPin, ArrowRight, ChevronDown, CheckCircle, ExternalLink, Calendar, FileText, MessageCircle, Navigation } from 'lucide-react';
import BookingForm from '../components/BookingForm';

/* ─── Constants ─── */
const PHONE      = '+91 9000000000';
const PHONE_HREF = 'tel:+919000000000';
const WA_LINK    = `https://wa.me/919000000000?text=${encodeURIComponent('Hello! I would like to book an appointment at Apollo Clinic Srinagar.')}`;
const MAPS_LINK  = 'https://maps.google.com/?q=34.0806043,74.7988594';
const MAPS_EMBED = 'https://maps.google.com/maps?q=34.0806043,74.7988594&hl=en&z=17&output=embed&iwloc=near';

/* ─── WhatsApp icon ─── */
const WAIcon = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" style={{ flexShrink: 0 }}>
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

/* ─── Scroll-trigger hook ─── */
function useInView(threshold = 0.07) {
  const ref = React.useRef(null);
  const [vis, setVis] = React.useState(false);
  React.useEffect(() => {
    const o = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVis(true); }, { threshold });
    if (ref.current) o.observe(ref.current);
    return () => o.disconnect();
  }, []);
  return [ref, vis];
}

/* ─── Clinic status helper ─── */
function getClinicStatus() {
  const now  = new Date();
  const day  = now.getDay();
  const mins = now.getHours() * 60 + now.getMinutes();
  if (day >= 1 && day <= 6) {
    return { open: mins >= 720 && mins < 1140, hours: '12:00 PM – 7:00 PM', label: 'Mon–Sat' };
  } else {
    return { open: mins >= 600 && mins < 810, hours: '10:00 AM – 1:30 PM', label: 'Sunday' };
  }
}

/* ════════════════════════════════════════════
   HOME PAGE
════════════════════════════════════════════ */
const Home = () => {
  const navigate = useNavigate();
  const goBook   = () => { navigate('/book'); window.scrollTo(0, 0); };

  return (
    <div style={{ background: '#fff' }}>
      <Hero    goBook={goBook} />
      <TrustStrip />
      <Services goBook={goBook} />
      <Doctors  goBook={goBook} />
      <Diagnostics goBook={goBook} />
      <PatientServices goBook={goBook} />
      <Testimonials />
      <ContactSection />
      <FAQSection goBook={goBook} />
      <FinalCTA goBook={goBook} />

      {/* Floating WhatsApp */}
      <a href={WA_LINK} target="_blank" rel="noreferrer" aria-label="Chat on WhatsApp"
        style={{
          position: 'fixed', bottom: '86px', right: '14px', zIndex: 999,
          width: '50px', height: '50px', borderRadius: '50%',
          background: '#25D366', color: '#fff',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: '0 4px 18px rgba(37,211,102,0.4)',
          textDecoration: 'none', transition: 'transform 0.2s',
        }}
        onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.1)'}
        onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
      >
        <WAIcon size={23} />
      </a>

      {/* Sticky mobile bottom bar — 4 buttons */}
      <div style={{
        display: 'none', position: 'fixed', bottom: 0, left: 0, right: 0,
        zIndex: 998, background: '#fff',
        borderTop: '1px solid #e2e8f0',
        boxShadow: '0 -2px 16px rgba(0,0,0,0.07)',
      }} id="mobile-cta">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: 0 }}>
          <a href={PHONE_HREF} style={{
            padding: '0.65rem 0', background: '#0369a1',
            color: '#fff', fontWeight: 700, fontSize: '0.72rem',
            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '0.2rem',
            textDecoration: 'none',
          }}>
            <Phone size={16} /> Call
          </a>
          <a href={WA_LINK} target="_blank" rel="noreferrer" style={{
            padding: '0.65rem 0', background: '#25D366',
            color: '#fff', fontWeight: 700, fontSize: '0.72rem',
            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '0.2rem',
            textDecoration: 'none',
          }}>
            <WAIcon size={16} /> WhatsApp
          </a>
          <a href={MAPS_LINK} target="_blank" rel="noreferrer" style={{
            padding: '0.65rem 0', background: '#0c4a6e',
            color: '#fff', fontWeight: 700, fontSize: '0.72rem',
            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '0.2rem',
            textDecoration: 'none',
          }}>
            <Navigation size={16} /> Directions
          </a>
          <button onClick={goBook} style={{
            padding: '0.65rem 0', background: 'linear-gradient(135deg,#059669,#10b981)',
            color: '#fff', border: 'none', fontWeight: 700, fontSize: '0.72rem',
            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '0.2rem',
            cursor: 'pointer', fontFamily: 'inherit',
          }}>
            <Calendar size={16} /> Book
          </button>
        </div>
      </div>

      <style>{`
        *, *::before, *::after { box-sizing: border-box; }

        @media (max-width: 768px) {
          #mobile-cta { display: block !important; }
          body { padding-bottom: 68px; }
          a[aria-label="Chat on WhatsApp"] { bottom: 78px !important; }
        }
        @media (max-width: 640px) {
          .hero-btns { flex-direction: column !important; }
          .hero-btns > * { width: 100% !important; justify-content: center !important; }
          .hero-grid { grid-template-columns: 1fr !important; }
          .hero-right { display: none !important; }
        }
        @media (max-width: 768px) {
          .svc-grid { grid-template-columns: repeat(2,1fr) !important; }
          .doc-grid  { grid-template-columns: repeat(2,1fr) !important; }
          .testi-grid { grid-template-columns: 1fr !important; }
          .contact-split { grid-template-columns: 1fr !important; }
          .diag-grid { grid-template-columns: repeat(2,1fr) !important; }
          .faq-split { grid-template-columns: 1fr !important; }
          .patient-svc-grid { grid-template-columns: repeat(2,1fr) !important; }
        }
        @media (max-width: 480px) {
          .svc-grid { grid-template-columns: 1fr !important; }
          .doc-grid  { grid-template-columns: 1fr !important; }
          .diag-grid { grid-template-columns: 1fr !important; }
          .patient-svc-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
};

/* ═══════════════════════════════════
   1. HERO — Utility-first, action-focused
═══════════════════════════════════ */
const Hero = ({ goBook }) => {
  const status = getClinicStatus();
  return (
  <section id="home" style={{
    background: '#fff',
    borderBottom: '1px solid #e2e8f0',
    padding: '3rem 0 2.5rem',
    position: 'relative',
    overflow: 'hidden',
  }}>
    {/* Subtle background accent */}
    <div style={{
      position: 'absolute', top: 0, right: 0,
      width: '50%', height: '100%',
      background: 'linear-gradient(135deg,transparent 0%,#f0f9ff 100%)',
      pointerEvents: 'none', zIndex: 0,
    }} />

    <div className="container" style={{ position: 'relative', zIndex: 1 }}>
      <div className="hero-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 400px', gap: '3rem', alignItems: 'center' }}>

        {/* Left */}
        <div>
          {/* Location + Open status */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: '0.35rem',
              background: '#f0f9ff', border: '1px solid #bae6fd',
              color: '#0369a1', fontSize: '0.78rem', fontWeight: 700,
              padding: '0.3rem 0.75rem', borderRadius: '6px',
            }}>
              <MapPin size={12} />
              Karan Nagar, Srinagar
            </div>
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: '0.35rem',
              background: status.open ? '#f0fdf4' : '#fff1f2',
              border: `1px solid ${status.open ? '#bbf7d0' : '#fecdd3'}`,
              color: status.open ? '#047857' : '#be123c',
              fontSize: '0.78rem', fontWeight: 800,
              padding: '0.3rem 0.75rem', borderRadius: '6px',
            }}>
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: status.open ? '#059669' : '#dc2626' }} />
              {status.open ? 'Open Now' : 'Closed'} · Today: {status.hours}
            </div>
          </div>

          <h1 style={{
            color: '#0c4a6e', fontWeight: 900,
            fontSize: 'clamp(1.85rem,4.2vw,2.9rem)',
            lineHeight: 1.1, letterSpacing: '-0.03em',
            marginBottom: '0.85rem',
          }}>
            Trusted Multi-Speciality<br />
            Healthcare in Srinagar
          </h1>

          <p style={{
            color: '#475569', fontSize: '1rem', lineHeight: 1.7,
            marginBottom: '1.25rem', maxWidth: '520px',
          }}>
            Expert consultations across General Medicine, Dermatology, Paediatrics, Gynaecology, Orthopaedics & more. In-house ECG, ECHO, PFT & blood tests. Preventive health checkups. One clinic, complete care.
          </p>

          {/* Address + hours — compact */}
          <div style={{
            display: 'flex', flexDirection: 'column', gap: '0.35rem',
            marginBottom: '1.5rem', padding: '0.85rem 1rem',
            background: '#f8fafc', borderRadius: '10px',
            border: '1px solid #e2e8f0', maxWidth: '520px',
          }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', fontSize: '0.85rem', color: '#334155' }}>
              <MapPin size={14} color="#0369a1" style={{ flexShrink: 0, marginTop: '1px' }} />
              <span>Arham Towers, Near National School, Karan Nagar, Srinagar, J&K</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', color: '#334155' }}>
              <span style={{ fontSize: '0.8rem', color: '#64748b' }}>🕐</span>
              <span>Mon–Sat: 12 PM – 7 PM &nbsp;·&nbsp; Sun: 10 AM – 1:30 PM</span>
            </div>
          </div>

          {/* CTAs */}
          <div className="hero-btns" style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap' }}>
            <button onClick={goBook} className="btn btn-primary" style={{ padding: '0.8rem 1.5rem', fontSize: '0.92rem' }}>
              <Calendar size={15} /> Book Appointment
            </button>
            <Link to="/book-checkup" style={{
              display: 'inline-flex', alignItems: 'center', gap: '0.4rem',
              padding: '0.8rem 1.5rem', background: 'linear-gradient(135deg,#059669,#10b981)',
              borderRadius: '9999px',
              color: '#fff', fontWeight: 700, fontSize: '0.92rem',
              textDecoration: 'none', transition: 'all 0.2s',
              boxShadow: '0 4px 16px rgba(5,150,105,0.25)',
            }}
              onMouseEnter={e => { e.currentTarget.style.filter = 'brightness(1.08)'; }}
              onMouseLeave={e => { e.currentTarget.style.filter = 'none'; }}
            >
              🔬 Book Health Checkup
            </Link>
            <a href={PHONE_HREF} style={{
              display: 'inline-flex', alignItems: 'center', gap: '0.4rem',
              padding: '0.8rem 1.3rem', background: '#f0f9ff',
              border: '1.5px solid #bae6fd', borderRadius: '9999px',
              color: '#0369a1', fontWeight: 700, fontSize: '0.9rem',
              textDecoration: 'none', transition: 'all 0.2s',
            }}
              onMouseEnter={e => { e.currentTarget.style.background = '#e0f2fe'; }}
              onMouseLeave={e => { e.currentTarget.style.background = '#f0f9ff'; }}
            >
              <Phone size={14} /> Call Now
            </a>
            <a href={WA_LINK} target="_blank" rel="noreferrer" style={{
              display: 'inline-flex', alignItems: 'center', gap: '0.4rem',
              padding: '0.8rem 1.3rem', background: '#f0fdf4',
              border: '1.5px solid #a7f3d0', borderRadius: '9999px',
              color: '#047857', fontWeight: 700, fontSize: '0.9rem',
              textDecoration: 'none', transition: 'all 0.2s',
            }}
              onMouseEnter={e => { e.currentTarget.style.background = '#dcfce7'; }}
              onMouseLeave={e => { e.currentTarget.style.background = '#f0fdf4'; }}
            >
              <WAIcon size={14} /> WhatsApp
            </a>
            <a href={MAPS_LINK} target="_blank" rel="noreferrer" style={{
              display: 'inline-flex', alignItems: 'center', gap: '0.4rem',
              padding: '0.8rem 1.3rem', background: '#f8fafc',
              border: '1.5px solid #e2e8f0', borderRadius: '9999px',
              color: '#64748b', fontWeight: 700, fontSize: '0.9rem',
              textDecoration: 'none', transition: 'all 0.2s',
            }}
              onMouseEnter={e => { e.currentTarget.style.background = '#f1f5f9'; }}
              onMouseLeave={e => { e.currentTarget.style.background = '#f8fafc'; }}
            >
              <MapPin size={13} /> Directions
            </a>
          </div>
        </div>

        {/* Right: Clinic Info Card */}
        <div className="hero-right" style={{
          background: '#fff',
          border: '1.5px solid #e2e8f0',
          borderRadius: '16px',
          overflow: 'hidden',
          boxShadow: '0 4px 24px rgba(14,165,233,0.09)',
        }}>
          {/* Card header */}
          <div style={{
            background: 'linear-gradient(135deg,#0c4a6e,#0369a1)',
            padding: '1.15rem 1.3rem',
          }}>
            <div style={{ color: '#fff', fontWeight: 800, fontSize: '0.95rem', marginBottom: '0.15rem' }}>Apollo Clinic Srinagar</div>
            <div style={{ color: 'rgba(255,255,255,0.75)', fontSize: '0.78rem' }}>Multi-Speciality Healthcare · Karan Nagar</div>
          </div>

          {/* Specialities */}
          <div style={{ padding: '1rem 1.3rem', borderBottom: '1px solid #f1f5f9' }}>
            <div style={{ fontSize: '0.7rem', fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '0.6rem' }}>Available Specialities</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem' }}>
              {['General Medicine','Cardiology','Dermatology','Paediatrics','Gynaecology','Orthopaedics','Pulmonology','Diagnostics'].map((s, i) => (
                <span key={i} style={{
                  background: '#f0f9ff', color: '#0369a1', border: '1px solid #bae6fd',
                  fontSize: '0.71rem', fontWeight: 600,
                  padding: '0.18rem 0.55rem', borderRadius: '5px',
                }}>{s}</span>
              ))}
            </div>
          </div>

          {/* Hours */}
          <div style={{ padding: '1rem 1.3rem', borderBottom: '1px solid #f1f5f9' }}>
            <div style={{ fontSize: '0.7rem', fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '0.6rem' }}>Clinic Hours</div>
            {[
              { day: 'Mon – Sat', time: '12:00 PM – 7:00 PM' },
              { day: 'Sunday',    time: '10:00 AM – 1:30 PM' },
            ].map((t, i) => (
              <div key={i} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.83rem', marginBottom: '0.35rem' }}>
                <span style={{ color: '#64748b' }}>{t.day}</span>
                <span style={{ color: '#0c4a6e', fontWeight: 700 }}>{t.time}</span>
              </div>
            ))}
          </div>

          {/* Quick actions */}
          <div style={{ padding: '1rem 1.3rem', display: 'flex', flexDirection: 'column', gap: '0.45rem' }}>
            <button onClick={goBook} style={{
              width: '100%', padding: '0.7rem', background: 'linear-gradient(135deg,#0369a1,#0ea5e9)',
              color: '#fff', border: 'none', borderRadius: '10px', fontWeight: 800,
              fontSize: '0.88rem', cursor: 'pointer', fontFamily: 'inherit',
            }}>Book Appointment</button>
            <Link to="/book-checkup" style={{
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem',
              padding: '0.7rem', background: 'linear-gradient(135deg,#059669,#10b981)',
              borderRadius: '10px', color: '#fff', fontWeight: 800, fontSize: '0.85rem',
              textDecoration: 'none',
            }}>🔬 Book Health Checkup</Link>
            <a href={PHONE_HREF} style={{
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem',
              padding: '0.7rem', background: '#f8fafc', border: '1.5px solid #e2e8f0',
              borderRadius: '10px', color: '#0369a1', fontWeight: 700, fontSize: '0.85rem',
              textDecoration: 'none',
            }}>
              <Phone size={13} /> {PHONE}
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>
  );
};

/* ═══════════════════════════════════
   2. TRUST STRIP
═══════════════════════════════════ */
const TRUST_ITEMS = [
  { icon: '🏥', label: '6+ Medical Specialities' },
  { icon: '👨‍⚕️', label: 'Experienced Specialists' },
  { icon: '🔬', label: 'In-House Diagnostics' },
  { icon: '🛡️', label: 'Preventive Health Checkups' },
  { icon: '📅', label: 'Easy Appointment Booking' },
  { icon: '📍', label: 'Karan Nagar, Srinagar' },
];

const TrustStrip = () => (
  <div style={{ background: '#f8fafc', borderBottom: '1px solid #e2e8f0', overflowX: 'auto', WebkitOverflowScrolling: 'touch' }}>
    <div style={{
      display: 'flex', alignItems: 'stretch', justifyContent: 'center',
      minWidth: 'max-content', margin: '0 auto', maxWidth: 1200,
      padding: '0 2rem',
    }}>
      {TRUST_ITEMS.map((item, i) => (
        <div key={i} style={{
          display: 'flex', alignItems: 'center', gap: '0.5rem',
          padding: '0.75rem 1.5rem',
          borderRight: i < TRUST_ITEMS.length - 1 ? '1px solid #e2e8f0' : 'none',
          whiteSpace: 'nowrap',
        }}>
          <span style={{ fontSize: '0.9rem' }}>{item.icon}</span>
          <span style={{ fontSize: '0.78rem', fontWeight: 600, color: '#475569' }}>{item.label}</span>
        </div>
      ))}
    </div>
  </div>
);

/* ═══════════════════════════════════
   3. SERVICES / SPECIALITIES
═══════════════════════════════════ */
const SERVICES = [
  {
    label: 'General Medicine',
    icon: '🩺',
    desc: 'Primary care for fever, infections, diabetes, hypertension, and chronic conditions. Your first point of care at Apollo Clinic.',
    tags: ['Fever & Infections', 'Diabetes', 'Hypertension', 'Chronic Care'],
  },
  {
    label: 'Cardiology',
    icon: '❤️',
    desc: 'Heart health evaluation with in-house ECG and ECHO. Cardiac risk screening, monitoring, and ongoing management.',
    tags: ['ECG', 'ECHO', 'Heart Screening', 'Cardiac Risk'],
  },
  {
    label: 'Dermatology',
    icon: '🧴',
    desc: 'Skin, hair, and nail conditions — acne, eczema, psoriasis, fungal infections, hair loss, and cosmetic concerns.',
    tags: ['Acne & Eczema', 'Hair Loss', 'Skin Care', 'Cosmetic'],
  },
  {
    label: 'Paediatrics',
    icon: '👶',
    desc: 'Child healthcare from newborn to adolescent. Vaccinations, growth tracking, nutrition guidance, illness management.',
    tags: ['Vaccinations', 'Growth Monitoring', 'Child Nutrition', 'Paediatric Care'],
  },
  {
    label: 'Gynaecology',
    icon: '🌸',
    desc: "Women's health — menstrual disorders, reproductive health, hormonal concerns, and routine preventive care with complete privacy.",
    tags: ["Women's Health", 'Menstrual Care', 'Hormonal', 'Preventive'],
  },
  {
    label: 'Orthopaedics',
    icon: '🦴',
    desc: 'Bone, joint, and muscle conditions — arthritis, back pain, sports injuries, and post-surgical rehabilitation support.',
    tags: ['Joint Pain', 'Back & Spine', 'Sports Injuries', 'Rehabilitation'],
  },
  {
    label: 'Pulmonology / PFT',
    icon: '🫁',
    desc: 'Respiratory health with in-house Pulmonary Function Testing. Asthma, COPD, chronic cough, and breathlessness evaluation.',
    tags: ['PFT Testing', 'Asthma', 'COPD', 'Lung Function'],
  },
  {
    label: 'Diagnostics & Lab',
    icon: '🔬',
    desc: 'Complete in-house lab — CBC, LFT, KFT, lipid profile, thyroid, HbA1c, urine analysis, and specialized panels.',
    tags: ['Blood Tests', 'Thyroid', 'HbA1c', 'Lipid Profile'],
  },
  {
    label: 'Preventive Checkups',
    icon: '🛡️',
    desc: 'Structured annual health packages for individuals, families, and professionals. Detect conditions early, stay ahead.',
    tags: ['Annual Checkup', 'Health Packages', 'Early Detection', 'Family Care'],
  },
  {
    label: 'Physiotherapy',
    icon: '💪',
    desc: 'Personalised rehabilitation for pain relief, post-surgery recovery, mobility improvement, and sports injury management.',
    tags: ['Pain Relief', 'Post-Surgery', 'Mobility', 'Sports Rehab'],
  },
];

const Services = ({ goBook }) => {
  const [ref, vis] = useInView(0.04);
  return (
    <section id="services" style={{ background: '#fff', padding: '4.5rem 0', borderTop: '1px solid #f1f5f9' }}>
      <div className="container">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '2rem', gap: '1rem', flexWrap: 'wrap' }}>
          <div>
            <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#0369a1', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.5rem' }}>
              Clinical Specialities
            </div>
            <h2 style={{ color: '#0c4a6e', margin: 0, fontSize: 'clamp(1.5rem,4vw,2.3rem)' }}>Services & Specialities</h2>
            <p style={{ color: '#64748b', marginTop: '0.4rem', fontSize: '0.95rem', maxWidth: 520, margin: '0.4rem 0 0' }}>
              10 specialities and full diagnostic support — all under one roof at Karan Nagar.
            </p>
          </div>
          <Link to="/services" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', color: '#0369a1', fontWeight: 700, fontSize: '0.85rem', textDecoration: 'none', flexShrink: 0 }}>
            All services <ArrowRight size={14} />
          </Link>
        </div>

        <div ref={ref} className="svc-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(280px,1fr))', gap: '1px', background: '#e2e8f0', border: '1px solid #e2e8f0', borderRadius: '14px', overflow: 'hidden' }}>
          {SERVICES.map((svc, i) => (
            <div key={i} style={{
              background: '#fff', padding: '1.25rem 1.3rem',
              transition: 'background 0.2s',
              opacity: vis ? 1 : 0,
              transform: vis ? 'none' : 'translateY(12px)',
              transitionDelay: `${i * 0.03}s`,
              transitionProperty: 'opacity, transform, background',
              transitionDuration: '0.4s',
            }}
              onMouseEnter={e => e.currentTarget.style.background = '#f8fafc'}
              onMouseLeave={e => e.currentTarget.style.background = '#fff'}
            >
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                <div style={{
                  width: 40, height: 40, borderRadius: '10px',
                  background: '#f0f9ff', display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '1.2rem', flexShrink: 0,
                }}>{svc.icon}</div>
                <div style={{ flex: 1 }}>
                  <h3 style={{ color: '#0c4a6e', fontWeight: 800, fontSize: '0.9rem', margin: '0 0 0.25rem', lineHeight: 1.3 }}>{svc.label}</h3>
                  <p style={{ color: '#64748b', fontSize: '0.78rem', lineHeight: 1.55, margin: 0 }}>{svc.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div style={{
          marginTop: '1.75rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          gap: '1rem', flexWrap: 'wrap', background: '#f0f9ff',
          border: '1px solid #bae6fd', borderRadius: '12px', padding: '1.2rem 1.4rem',
        }}>
          <div>
            <div style={{ fontWeight: 800, color: '#0c4a6e', fontSize: '0.95rem', marginBottom: '0.15rem' }}>Need a consultation?</div>
            <div style={{ color: '#64748b', fontSize: '0.82rem' }}>Walk in or book ahead · Karan Nagar, Srinagar</div>
          </div>
          <div style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap' }}>
            <button onClick={goBook} className="btn btn-primary" style={{ padding: '0.6rem 1.25rem', fontSize: '0.88rem' }}>Book Appointment</button>
            <a href={PHONE_HREF} style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', padding: '0.6rem 1.1rem', background: '#fff', border: '1.5px solid #bae6fd', borderRadius: '9999px', color: '#0369a1', fontWeight: 700, fontSize: '0.85rem', textDecoration: 'none' }}>
              <Phone size={13} /> {PHONE}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

/* ═══════════════════════════════════
   4. DOCTORS
═══════════════════════════════════ */
const DOCTORS = [
  { initials: 'SA', name: 'Dr. Shabir Ahmad Mir',  color: '#0369a1', specialty: 'General Physician & Internal Medicine',   qual: 'MBBS, MD (Internal Medicine)',             exp: '12+ Years', days: 'Mon – Sat' },
  { initials: 'NR', name: 'Dr. Nazia Rashid',       color: '#0891b2', specialty: 'Dermatology & Skin Care',                 qual: 'MBBS, MD (Dermatology)',                    exp: '9+ Years',  days: 'Mon – Sat' },
  { initials: 'AH', name: 'Dr. Aijaz Hussain',      color: '#0e7490', specialty: 'Paediatrics & Child Healthcare',          qual: 'MBBS, DCH, MD (Paediatrics)',               exp: '10+ Years', days: 'Mon – Fri' },
  { initials: 'SB', name: 'Dr. Saima Bano',         color: '#6d28d9', specialty: 'Gynaecology & Women\'s Health',           qual: 'MBBS, DGO, MS (Obs & Gynaecology)',         exp: '11+ Years', days: 'Mon – Sat' },
  { initials: 'MA', name: 'Dr. Mushtaq Ahmed',      color: '#047857', specialty: 'Orthopaedics & Bone Health',              qual: 'MBBS, MS (Orthopaedics)',                   exp: '14+ Years', days: 'Tue, Thu, Sat' },
  { initials: 'AY', name: 'Dr. Asma Yousuf',        color: '#b45309', specialty: 'Clinical Psychology & Mental Health',     qual: 'M.Phil Clinical Psychology',                exp: '8+ Years',  days: 'Mon, Wed, Fri' },
];

const Doctors = ({ goBook }) => {
  const [ref, vis] = useInView(0.06);
  return (
    <section id="doctors" style={{ background: '#f8fafc', padding: '4.5rem 0', borderTop: '1px solid #e2e8f0' }}>
      <div className="container">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '2rem', gap: '1rem', flexWrap: 'wrap' }}>
          <div>
            <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#0369a1', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.5rem' }}>Medical Team</div>
            <h2 style={{ color: '#0c4a6e', margin: 0 }}>Our Doctors</h2>
            <p style={{ color: '#64748b', marginTop: '0.4rem', fontSize: '0.95rem', maxWidth: 500, margin: '0.4rem 0 0' }}>
              Qualified specialists with verified credentials. Patient-centred practice across all key disciplines.
            </p>
          </div>
          <Link to="/doctors" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', color: '#0369a1', fontWeight: 700, fontSize: '0.85rem', textDecoration: 'none', flexShrink: 0 }}>
            Full team <ArrowRight size={14} />
          </Link>
        </div>

        <div ref={ref} className="doc-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(290px,1fr))', gap: '1.15rem' }}>
          {DOCTORS.map((doc, i) => (
            <div key={i} style={{
              background: '#fff', border: '1px solid #e2e8f0', borderRadius: '14px',
              overflow: 'hidden', transition: 'all 0.25s',
              opacity: vis ? 1 : 0,
              transform: vis ? 'none' : 'translateY(16px)',
              transitionDelay: `${i * 0.07}s`,
              transitionProperty: 'opacity, transform, box-shadow, border-color',
              transitionDuration: '0.45s',
            }}
              onMouseEnter={e => { e.currentTarget.style.boxShadow = '0 8px 28px rgba(14,165,233,0.12)'; e.currentTarget.style.borderColor = '#bae6fd'; e.currentTarget.style.transform = 'translateY(-3px)'; }}
              onMouseLeave={e => { e.currentTarget.style.boxShadow = 'none'; e.currentTarget.style.borderColor = '#e2e8f0'; e.currentTarget.style.transform = 'none'; }}
            >
              <div style={{ height: '4px', background: doc.color }} />
              <div style={{ padding: '1.25rem 1.3rem' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.9rem', marginBottom: '0.85rem' }}>
                  <div style={{
                    width: 50, height: 50, borderRadius: '50%', flexShrink: 0,
                    background: doc.color, display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: '#fff', fontWeight: 900, fontSize: '1.05rem', letterSpacing: '-0.02em',
                    boxShadow: `0 2px 10px ${doc.color}40`,
                  }}>
                    {doc.initials}
                  </div>
                  <div>
                    <h3 style={{ color: '#0c4a6e', fontWeight: 800, fontSize: '0.92rem', margin: '0 0 0.12rem', lineHeight: 1.25 }}>{doc.name}</h3>
                    <p style={{ color: doc.color, fontWeight: 700, fontSize: '0.78rem', margin: '0 0 0.12rem' }}>{doc.specialty}</p>
                    <p style={{ color: '#94a3b8', fontSize: '0.73rem', margin: 0 }}>{doc.qual}</p>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '0.45rem', marginBottom: '0.85rem', flexWrap: 'wrap' }}>
                  <span style={{ background: '#f0f9ff', color: '#0369a1', border: '1px solid #bae6fd', fontSize: '0.71rem', fontWeight: 700, padding: '0.2rem 0.6rem', borderRadius: '6px' }}>
                    {doc.exp}
                  </span>
                  <span style={{ background: '#f8fafc', color: '#64748b', border: '1px solid #e2e8f0', fontSize: '0.71rem', fontWeight: 600, padding: '0.2rem 0.6rem', borderRadius: '6px' }}>
                    {doc.days}
                  </span>
                  <span style={{ background: '#f0fdf4', color: '#047857', border: '1px solid #bbf7d0', fontSize: '0.71rem', fontWeight: 600, padding: '0.2rem 0.6rem', borderRadius: '6px' }}>
                    Apollo Clinic, Karan Nagar
                  </span>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '0.75rem', borderTop: '1px solid #f1f5f9' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                    <CheckCircle size={12} color="#059669" />
                    <span style={{ fontSize: '0.73rem', color: '#64748b', fontWeight: 500 }}>Verified Specialist</span>
                  </div>
                  <button onClick={goBook} style={{
                    background: doc.color, color: '#fff', border: 'none',
                    padding: '0.38rem 0.85rem', borderRadius: '8px',
                    fontWeight: 700, fontSize: '0.76rem', cursor: 'pointer',
                    fontFamily: 'inherit', transition: 'filter 0.2s',
                  }}
                    onMouseEnter={e => e.currentTarget.style.filter = 'brightness(1.12)'}
                    onMouseLeave={e => e.currentTarget.style.filter = 'none'}
                  >Book Appointment</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ═══════════════════════════════════
   5. DIAGNOSTICS
═══════════════════════════════════ */
const DIAG_ITEMS = [
  { icon: '❤️', name: 'ECG (12-Lead)',            why: 'Heart rhythm & electrical activity. Done in-clinic, results same day.' },
  { icon: '🔊', name: 'ECHO (Echocardiogram)',    why: 'Ultrasound assessment of heart structure and function.' },
  { icon: '🫁', name: 'Pulmonary Function (PFT)', why: 'Lung capacity testing for asthma, COPD, and breathlessness.' },
  { icon: '🔬', name: 'Blood Tests & Lab',        why: 'CBC, LFT, KFT, lipid profile, thyroid, HbA1c — in-house lab.' },
  { icon: '🩸', name: 'Diabetes Panel',           why: 'Fasting glucose, post-meal sugar, HbA1c for screening & monitoring.' },
  { icon: '🛡️', name: 'Health Checkup Packages', why: 'Annual wellness packages covering key markers for early detection.' },
];

const Diagnostics = ({ goBook }) => {
  const [ref, vis] = useInView(0.06);
  return (
    <section id="diagnostics" style={{ background: '#fff', padding: '4.5rem 0', borderTop: '1px solid #e2e8f0' }}>
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(300px,1fr))', gap: '3rem', alignItems: 'start' }}>
          <div>
            <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#0369a1', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.5rem' }}>
              Lab & Diagnostics
            </div>
            <h2 style={{ color: '#0c4a6e', marginBottom: '0.75rem', fontSize: 'clamp(1.5rem,4vw,2.2rem)' }}>
              In-House Diagnostics & Health Checkups
            </h2>
            <p style={{ color: '#64748b', lineHeight: 1.7, marginBottom: '1.25rem', fontSize: '0.95rem' }}>
              No external lab visits. Tests done on-site, results available quickly, reviewed by your doctor at Apollo Clinic.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', marginBottom: '1.5rem' }}>
              {['Same-day results for routine tests', 'Quality-controlled, certified equipment', 'Results reviewed by your consulting doctor', 'Walk in and test — no referral needed'].map((pt, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.55rem', fontSize: '0.86rem', color: '#334155' }}>
                  <CheckCircle size={14} color="#059669" style={{ flexShrink: 0, marginTop: '2px' }} />
                  {pt}
                </div>
              ))}
            </div>
            <div style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap' }}>
              <Link to="/book-checkup" className="btn btn-primary" style={{ fontSize: '0.88rem', padding: '0.7rem 1.3rem', display: 'inline-flex', alignItems: 'center', gap: '0.4rem', textDecoration: 'none' }}>Book a Checkup</Link>
              <Link to="/diagnostics" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', padding: '0.7rem 1.1rem', background: '#f8fafc', border: '1.5px solid #e2e8f0', borderRadius: '9999px', color: '#334155', fontWeight: 700, fontSize: '0.85rem', textDecoration: 'none' }}>
                View Packages <ArrowRight size={14} />
              </Link>
            </div>
          </div>

          <div ref={ref} className="diag-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: '1px', background: '#e2e8f0', border: '1px solid #e2e8f0', borderRadius: '14px', overflow: 'hidden' }}>
            {DIAG_ITEMS.map((d, i) => (
              <div key={i} style={{
                background: '#fff', padding: '1.1rem',
                opacity: vis ? 1 : 0,
                transform: vis ? 'none' : 'translateY(12px)',
                transition: `opacity 0.4s ease ${i * 0.06}s, transform 0.4s ease ${i * 0.06}s, background 0.15s`,
              }}
                onMouseEnter={e => e.currentTarget.style.background = '#f8fafc'}
                onMouseLeave={e => e.currentTarget.style.background = '#fff'}
              >
                <div style={{ fontSize: '1.3rem', marginBottom: '0.3rem' }}>{d.icon}</div>
                <h4 style={{ color: '#0c4a6e', fontWeight: 800, fontSize: '0.83rem', margin: '0 0 0.25rem' }}>{d.name}</h4>
                <p style={{ color: '#64748b', fontSize: '0.76rem', lineHeight: 1.5, margin: 0 }}>{d.why}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

/* ═══════════════════════════════════
   6. PATIENT SERVICES HUB — NEW
═══════════════════════════════════ */
const PATIENT_ACTIONS = [
  { icon: <Calendar size={22} />, label: 'Book Appointment', desc: 'Schedule a doctor consultation online', color: '#0369a1', action: 'book' },
  { icon: <Phone size={22} />, label: 'Call Clinic', desc: 'Speak to our front desk directly', color: '#0891b2', action: 'call' },
  { icon: <WAIcon size={22} />, label: 'WhatsApp Us', desc: 'Message us for quick assistance', color: '#25D366', action: 'wa' },
  { icon: <FileText size={22} />, label: 'View Test Reports', desc: 'Access your reports securely online', color: '#6d28d9', action: 'reports' },
  { icon: <Navigation size={22} />, label: 'Get Directions', desc: 'Navigate to our Karan Nagar clinic', color: '#047857', action: 'map' },
  { icon: <span style={{ fontSize: '1.3rem' }}>🔬</span>, label: 'Book Health Checkup', desc: 'Preventive health screening packages', color: '#b45309', action: 'checkup' },
];

const PatientServices = ({ goBook }) => {
  const navigate = useNavigate();
  const [ref, vis] = useInView(0.06);

  const handleAction = (action) => {
    switch (action) {
      case 'book': goBook(); break;
      case 'call': window.location.href = PHONE_HREF; break;
      case 'wa': window.open(WA_LINK, '_blank'); break;
      case 'reports': navigate('/reports'); window.scrollTo(0, 0); break;
      case 'map': window.open(MAPS_LINK, '_blank'); break;
      case 'checkup': navigate('/book-checkup'); window.scrollTo(0, 0); break;
      default: break;
    }
  };

  return (
    <section id="patient-services" style={{ background: '#f8fafc', padding: '4.5rem 0', borderTop: '1px solid #e2e8f0' }}>
      <div className="container">
        <div style={{ marginBottom: '2rem' }}>
          <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#0369a1', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.5rem' }}>
            Patient Services
          </div>
          <h2 style={{ color: '#0c4a6e', margin: 0, fontSize: 'clamp(1.5rem,4vw,2.3rem)' }}>How Can We Help You?</h2>
          <p style={{ color: '#64748b', marginTop: '0.4rem', fontSize: '0.95rem', maxWidth: 480, margin: '0.4rem 0 0' }}>
            Quick access to everything you need — book, call, message, or view your reports.
          </p>
        </div>

        <div ref={ref} className="patient-svc-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '1rem' }}>
          {PATIENT_ACTIONS.map((act, i) => (
            <button key={i} onClick={() => handleAction(act.action)} style={{
              background: '#fff', border: '1.5px solid #e2e8f0', borderRadius: '14px',
              padding: '1.5rem 1.3rem', cursor: 'pointer', textAlign: 'left',
              fontFamily: 'inherit', transition: 'all 0.25s',
              opacity: vis ? 1 : 0,
              transform: vis ? 'none' : 'translateY(14px)',
              transitionDelay: `${i * 0.06}s`,
              transitionProperty: 'opacity, transform, box-shadow, border-color',
              transitionDuration: '0.4s',
              display: 'flex', alignItems: 'flex-start', gap: '1rem',
            }}
              onMouseEnter={e => { e.currentTarget.style.boxShadow = '0 8px 28px rgba(14,165,233,0.12)'; e.currentTarget.style.borderColor = '#bae6fd'; e.currentTarget.style.transform = 'translateY(-3px)'; }}
              onMouseLeave={e => { e.currentTarget.style.boxShadow = 'none'; e.currentTarget.style.borderColor = '#e2e8f0'; e.currentTarget.style.transform = 'none'; }}
            >
              <div style={{
                width: 48, height: 48, borderRadius: '12px', flexShrink: 0,
                background: `${act.color}12`, color: act.color,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                {act.icon}
              </div>
              <div>
                <div style={{ fontWeight: 800, fontSize: '0.92rem', color: '#0c4a6e', marginBottom: '0.2rem' }}>{act.label}</div>
                <div style={{ fontSize: '0.8rem', color: '#64748b', lineHeight: 1.5 }}>{act.desc}</div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ═══════════════════════════════════
   7. TESTIMONIALS
═══════════════════════════════════ */
const TESTIMONIALS = [
  {
    initials: 'A', color: '#0369a1',
    name: 'Arjuman', location: 'Srinagar', rating: 5,
    text: 'I had an excellent experience at Apollo Clinic. The clinic was clean, hygienic, and very well maintained. The facilities were impressive, the waiting time was short, and the staff made the entire visit comfortable and smooth.',
  },
  {
    initials: 'AM', color: '#047857',
    name: 'Arsheen Mehrajudin', location: 'Srinagar', rating: 5,
    text: 'My visit to Apollo Clinic was very smooth and comfortable. The clinic is clean, well maintained, and the staff is friendly and helpful. Booking was simple, and the overall experience felt professional and reassuring.',
  },
  {
    initials: 'MP', color: '#6d28d9',
    name: 'Mrs Pakiza', location: 'Karan Nagar, Srinagar', rating: 5,
    text: 'Apollo Clinic offers a caring and supportive environment. The staff is attentive, and the facilities feel modern and well equipped. The overall experience was seamless and professional.',
  },
  {
    initials: 'G', color: '#b45309',
    name: 'Gagan', location: 'Srinagar', rating: 5,
    text: 'The treatment experience at Apollo Clinic was excellent. The staff was caring, the facilities were very good, and the overall service felt professional. It gave me a lot of confidence in the care provided.',
  },
  {
    initials: 'T', color: '#0891b2',
    name: 'Tabassum', location: 'Srinagar', rating: 5,
    text: 'I was impressed by the quick support and professional care at Apollo Clinic. The staff was responsive, the environment felt safe and hygienic, and the treatment process was handled very efficiently.',
  },
];

const Testimonials = () => {
  const [ref, vis] = useInView(0.07);
  return (
    <section id="testimonials" style={{ background: '#fff', padding: '4.5rem 0', borderTop: '1px solid #e2e8f0' }}>
      <div className="container">
        <div style={{ marginBottom: '2rem' }}>
          <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#0369a1', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.5rem' }}>
            Patient Reviews
          </div>
          <h2 style={{ color: '#0c4a6e', margin: 0 }}>What Patients Say</h2>
          <p style={{ color: '#64748b', marginTop: '0.4rem', fontSize: '0.95rem', maxWidth: 480 }}>
            Real feedback from patients who visited Apollo Clinic Srinagar.
          </p>
        </div>

        <div ref={ref} className="testi-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(270px,1fr))', gap: '1.15rem' }}>
          {TESTIMONIALS.map((t, i) => (
            <div key={i} style={{
              background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '14px',
              padding: '1.4rem', transition: 'all 0.25s',
              opacity: vis ? 1 : 0,
              transform: vis ? 'none' : 'translateY(16px)',
              transitionDelay: `${i * 0.08}s`,
              transitionProperty: 'opacity, transform, box-shadow',
              transitionDuration: '0.45s',
            }}
              onMouseEnter={e => { e.currentTarget.style.boxShadow = '0 6px 24px rgba(14,165,233,0.1)'; e.currentTarget.style.borderColor = '#bae6fd'; }}
              onMouseLeave={e => { e.currentTarget.style.boxShadow = 'none'; e.currentTarget.style.borderColor = '#e2e8f0'; }}
            >
              <div style={{ display: 'flex', gap: '2px', marginBottom: '0.75rem' }}>
                {[...Array(t.rating)].map((_, s) => <span key={s} style={{ color: '#f59e0b', fontSize: '0.95rem' }}>★</span>)}
              </div>
              <p style={{ color: '#334155', fontSize: '0.85rem', lineHeight: 1.65, margin: '0 0 1.1rem', fontStyle: 'italic' }}>"{t.text}"</p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                <div style={{ width: 34, height: 34, borderRadius: '50%', background: t.color, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 800, fontSize: '0.8rem', flexShrink: 0 }}>
                  {t.initials}
                </div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: '0.82rem', color: '#1e293b' }}>{t.name}</div>
                  <div style={{ fontSize: '0.7rem', color: '#94a3b8' }}>{t.location}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ═══════════════════════════════════
   8. CONTACT + TIMINGS + MAP
═══════════════════════════════════ */
const ContactSection = () => (
  <section id="contact" style={{ background: '#f8fafc', padding: '4.5rem 0', borderTop: '1px solid #e2e8f0' }}>
    <div className="container">
      <div style={{ marginBottom: '2rem' }}>
        <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#0369a1', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.5rem' }}>
          Visit Us
        </div>
        <h2 style={{ color: '#0c4a6e', margin: 0 }}>Location, Timings & Contact</h2>
        <p style={{ color: '#64748b', marginTop: '0.4rem', fontSize: '0.95rem', maxWidth: 520 }}>
          We're in Karan Nagar, Srinagar — open 7 days a week. Walk-ins welcome. Appointments recommended for specialists.
        </p>
      </div>

      <div className="contact-split" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
        {/* Map */}
        <div>
          <div style={{ borderRadius: '12px', overflow: 'hidden', border: '1px solid #e2e8f0', marginBottom: '0.85rem' }}>
            <div style={{ background: '#0c4a6e', padding: '0.75rem 1rem', display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
              <MapPin size={12} color="#fff" />
              <span style={{ color: '#fff', fontWeight: 700, fontSize: '0.8rem' }}>Arham Towers, Near National School, Karan Nagar, Srinagar</span>
            </div>
            <iframe
              width="100%" height="230"
              style={{ border: 0, display: 'block' }}
              allowFullScreen="" loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              src={MAPS_EMBED}
              title="Apollo Clinic Srinagar - Karan Nagar Location"
            />
          </div>
          <a href={MAPS_LINK} target="_blank" rel="noreferrer" style={{
            display: 'inline-flex', alignItems: 'center', gap: '0.35rem',
            color: '#0369a1', fontWeight: 700, fontSize: '0.85rem', textDecoration: 'none',
          }}>
            <ExternalLink size={12} /> Open in Google Maps →
          </a>
        </div>

        {/* Info */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.15rem' }}>
          {/* Timings */}
          <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '1.25rem' }}>
            <h4 style={{ color: '#0c4a6e', fontWeight: 800, fontSize: '0.88rem', margin: '0 0 0.85rem' }}>🕐 Clinic Timings</h4>
            {[
              { day: 'Monday – Saturday', time: '12:00 PM – 7:00 PM' },
              { day: 'Sunday',            time: '10:00 AM – 1:30 PM' },
            ].map((t, i) => (
              <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.55rem 0', borderBottom: i === 0 ? '1px solid #e2e8f0' : 'none' }}>
                <span style={{ color: '#64748b', fontSize: '0.86rem' }}>{t.day}</span>
                <span style={{ color: '#059669', fontWeight: 700, fontSize: '0.86rem' }}>{t.time}</span>
              </div>
            ))}
            <div style={{ marginTop: '0.75rem', background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: '8px', padding: '0.55rem 0.8rem' }}>
              <p style={{ color: '#047857', fontWeight: 600, fontSize: '0.76rem', margin: 0 }}>Walk-ins welcome. Appointments recommended for specialist consultations.</p>
            </div>
          </div>

          {/* Contact */}
          <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '1.25rem' }}>
            <h4 style={{ color: '#0c4a6e', fontWeight: 800, fontSize: '0.88rem', margin: '0 0 0.85rem' }}>📞 Get In Touch</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.55rem' }}>
              <a href={PHONE_HREF} style={{
                display: 'flex', alignItems: 'center', gap: '0.55rem',
                padding: '0.75rem 0.9rem', background: '#0369a1', borderRadius: '10px',
                color: '#fff', fontWeight: 700, fontSize: '0.88rem', textDecoration: 'none',
              }}>
                <Phone size={15} /> Call: {PHONE}
              </a>
              <a href={WA_LINK} target="_blank" rel="noreferrer" style={{
                display: 'flex', alignItems: 'center', gap: '0.55rem',
                padding: '0.75rem 0.9rem', background: '#25D366', borderRadius: '10px',
                color: '#fff', fontWeight: 700, fontSize: '0.88rem', textDecoration: 'none',
              }}>
                <WAIcon size={15} /> WhatsApp Us
              </a>
              <a href={MAPS_LINK} target="_blank" rel="noreferrer" style={{
                display: 'flex', alignItems: 'center', gap: '0.55rem',
                padding: '0.75rem 0.9rem', background: '#f0f9ff', border: '1.5px solid #bae6fd', borderRadius: '10px',
                color: '#0369a1', fontWeight: 700, fontSize: '0.88rem', textDecoration: 'none',
              }}>
                <MapPin size={15} /> Get Directions
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

/* ═══════════════════════════════════
   9. FAQ
═══════════════════════════════════ */
const FAQS = [
  { q: 'How do I book an appointment at Apollo Clinic?', a: 'Use the Book Appointment form on this website, call us directly, or send a WhatsApp message. We confirm your slot within a few hours.' },
  { q: 'What are the clinic timings?', a: 'Monday to Saturday: 12:00 PM – 7:00 PM. Sunday: 10:00 AM – 1:30 PM. Walk-ins are welcome during these hours.' },
  { q: 'Which specialities are available?', a: 'General Medicine, Cardiology (ECG/ECHO), Dermatology, Paediatrics, Gynaecology, Orthopaedics, Pulmonology (PFT), Psychology, Physiotherapy, and Preventive Health Checkups.' },
  { q: 'Are diagnostic tests done in-house?', a: 'Yes. ECG, ECHO, PFT, blood work, urine analysis, and more — all done in-house at the clinic. No separate lab visit needed.' },
  { q: 'Where exactly is Apollo Clinic Srinagar?', a: 'Arham Towers, Near National School, Karan Nagar, Srinagar, J&K. Use the Directions button to open Google Maps directly.' },
  { q: 'How do I access my test reports online?', a: 'After your tests are processed, the clinic will send you a secure link via WhatsApp. Open the link, verify your identity, and view or download your report.' },
  { q: 'Do you offer preventive health checkup packages?', a: 'Yes. We offer structured annual health packages for individuals, families, and professionals. These include blood work, ECG, and key screenings. Book through our website or call the clinic.' },
];

const FAQItem = ({ item }) => {
  const [open, setOpen] = React.useState(false);
  return (
    <div style={{
      border: `1px solid ${open ? '#bae6fd' : '#e2e8f0'}`,
      borderRadius: '10px', background: '#fff', overflow: 'hidden',
      transition: 'border-color 0.2s',
      boxShadow: open ? '0 2px 12px rgba(14,165,233,0.08)' : 'none',
    }}>
      <button onClick={() => setOpen(!open)} style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem',
        padding: '0.95rem 1.15rem', background: 'none', border: 'none', width: '100%',
        textAlign: 'left', cursor: 'pointer', fontFamily: 'inherit',
        fontWeight: 700, fontSize: '0.88rem', color: open ? '#0369a1' : '#1e293b',
        transition: 'color 0.2s',
      }}>
        <span>{item.q}</span>
        <ChevronDown size={15} color={open ? '#0369a1' : '#94a3b8'} style={{ transition: 'transform 0.2s', transform: open ? 'rotate(180deg)' : 'none', flexShrink: 0 }} />
      </button>
      {open && (
        <div style={{ padding: '0 1.15rem 0.95rem', color: '#475569', fontSize: '0.86rem', lineHeight: 1.7 }}>
          {item.a}
        </div>
      )}
    </div>
  );
};

const FAQSection = ({ goBook }) => (
  <section id="faq" style={{ background: '#fff', padding: '4.5rem 0', borderTop: '1px solid #e2e8f0' }}>
    <div className="container">
      <div className="faq-split" style={{ display: 'grid', gridTemplateColumns: '320px 1fr', gap: '3rem', alignItems: 'start' }}>
        <div>
          <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#0369a1', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.5rem' }}>FAQ</div>
          <h2 style={{ color: '#0c4a6e', marginBottom: '0.75rem', fontSize: 'clamp(1.4rem,4vw,2.1rem)' }}>Common Questions</h2>
          <p style={{ color: '#64748b', lineHeight: 1.7, marginBottom: '1.5rem', fontSize: '0.92rem' }}>
            Quick answers about our clinic, timings, services, and how to book.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
            <button onClick={goBook} className="btn btn-primary" style={{ fontSize: '0.88rem', padding: '0.7rem 1.3rem' }}>Book Appointment</button>
            <Link to="/faq" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem', color: '#0369a1', fontWeight: 700, fontSize: '0.83rem', textDecoration: 'none' }}>
              All FAQs <ArrowRight size={13} />
            </Link>
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
          {FAQS.map((item, i) => <FAQItem key={i} item={item} />)}
        </div>
      </div>
    </div>
  </section>
);

/* ═══════════════════════════════════
   10. FINAL CTA + BOOKING
═══════════════════════════════════ */
const FinalCTA = ({ goBook }) => (
  <section id="booking" style={{ background: '#f8fafc', padding: '4.5rem 0', borderTop: '1px solid #e2e8f0' }}>
    <div className="container">
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(300px,1fr))', gap: '3.5rem', alignItems: 'start' }}>

        {/* Left */}
        <div>
          <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#0369a1', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.5rem' }}>
            Book Now
          </div>
          <h2 style={{ color: '#0c4a6e', marginBottom: '0.75rem', fontSize: 'clamp(1.5rem,4vw,2.2rem)' }}>
            Schedule Your Consultation
          </h2>
          <p style={{ color: '#64748b', lineHeight: 1.7, marginBottom: '1.75rem', fontSize: '0.95rem' }}>
            Fill in the form and we'll confirm your appointment within a few hours. Or call us directly for immediate help.
          </p>

          {/* Clinic card */}
          <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: '14px', overflow: 'hidden' }}>
            <div style={{ background: 'linear-gradient(135deg,#0c4a6e,#0369a1)', padding: '1rem 1.25rem' }}>
              <div style={{ color: '#fff', fontWeight: 800, fontSize: '0.92rem', marginBottom: '0.1rem' }}>Apollo Clinic Srinagar</div>
              <div style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.76rem' }}>Multi-Speciality · Karan Nagar, Srinagar</div>
            </div>
            <div style={{ padding: '1rem 1.25rem', display: 'flex', flexDirection: 'column', gap: '0.55rem' }}>
              {[
                { icon: <MapPin size={13} />, text: 'Arham Towers, Near National School, Karan Nagar' },
                { icon: <span style={{ fontSize: '0.82rem' }}>🕐</span>, text: 'Mon–Sat: 12 PM – 7 PM · Sun: 10 AM – 1:30 PM' },
                { icon: <Phone size={13} />, text: PHONE },
              ].map((item, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', fontSize: '0.83rem', color: '#334155' }}>
                  <span style={{ color: '#0369a1', flexShrink: 0, marginTop: '1px' }}>{item.icon}</span>
                  {item.text}
                </div>
              ))}
              <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.25rem' }}>
                <a href={PHONE_HREF} style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.35rem', padding: '0.6rem', background: '#0369a1', borderRadius: '8px', color: '#fff', fontWeight: 700, fontSize: '0.8rem', textDecoration: 'none' }}>
                  <Phone size={12} /> Call
                </a>
                <a href={WA_LINK} target="_blank" rel="noreferrer" style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.35rem', padding: '0.6rem', background: '#25D366', borderRadius: '8px', color: '#fff', fontWeight: 700, fontSize: '0.8rem', textDecoration: 'none' }}>
                  <WAIcon size={12} /> WhatsApp
                </a>
                <a href={MAPS_LINK} target="_blank" rel="noreferrer" style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.35rem', padding: '0.6rem', background: '#f0f9ff', border: '1.5px solid #bae6fd', borderRadius: '8px', color: '#0369a1', fontWeight: 700, fontSize: '0.8rem', textDecoration: 'none' }}>
                  <MapPin size={12} /> Map
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Booking form */}
        <div>
          <BookingForm />
        </div>
      </div>
    </div>
  </section>
);

export default Home;
