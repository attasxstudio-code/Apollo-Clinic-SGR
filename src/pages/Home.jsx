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
      <CareGuide />
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
const SPECIALTIES = [
  {
    id: 'gp',
    accent: '#0369a1', accentLight: '#e0f2fe',
    tag: 'Primary Care',
    label: 'General Physician',
    desc: 'Comprehensive primary care focused on diagnosis, preventive health, and long-term wellness for patients of all ages.',
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 12h-4l-3 9L9 3l-3 9H2"/>
      </svg>
    ),
  },
  {
    id: 'peds',
    accent: '#0891b2', accentLight: '#e0f7fa',
    tag: 'Child Health',
    label: 'Pediatrics',
    desc: 'Specialized child healthcare with expert attention to growth, development, immunization, and common childhood illnesses.',
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="7" r="4"/>
        <path d="M8 14s-4 .5-4 4v1h16v-1c0-3.5-4-4-4-4"/>
        <line x1="12" y1="11" x2="12" y2="14"/>
      </svg>
    ),
  },
  {
    id: 'obgyn',
    accent: '#7c3aed', accentLight: '#ede9fe',
    tag: "Women's Health",
    label: 'Obstetrics & Gynecology',
    desc: 'Complete women\'s healthcare covering pregnancy, reproductive wellness, gynecological concerns, and lifelong support.',
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="8" r="5"/>
        <line x1="12" y1="13" x2="12" y2="21"/>
        <line x1="8.5" y1="17" x2="15.5" y2="17"/>
      </svg>
    ),
  },
  {
    id: 'derm',
    accent: '#db2777', accentLight: '#fce7f3',
    tag: 'Skin Care',
    label: 'Dermatology',
    desc: 'Advanced care for skin, hair, and nail conditions with personalized treatment and expert clinical guidance.',
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14.5 4.5c1 1 1.5 2.5 1.5 4a6 6 0 01-6 6c-1.5 0-3-.5-4-1.5"/>
        <path d="M5 15c-.5 2 .5 4 2.5 5s4.5.5 6-1l1-1.5"/>
        <path d="M20 4l-1 1"/>
        <circle cx="17" cy="7" r="1"/>
      </svg>
    ),
  },
  {
    id: 'ortho',
    accent: '#d97706', accentLight: '#fef3c7',
    tag: 'Bone & Joint',
    label: 'Orthopedics',
    desc: 'Specialized treatment for bone, joint, muscle, and spine conditions to restore strength, mobility, and comfort.',
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 8h1a4 4 0 010 8h-1"/>
        <path d="M2 8h16v9a4 4 0 01-4 4H6a4 4 0 01-4-4V8z"/>
        <line x1="6" y1="1" x2="6" y2="4"/>
        <line x1="10" y1="1" x2="10" y2="4"/>
        <line x1="14" y1="1" x2="14" y2="4"/>
      </svg>
    ),
  },
  {
    id: 'ent',
    accent: '#059669', accentLight: '#d1fae5',
    tag: 'ENT',
    label: 'ENT (Otolaryngology)',
    desc: 'Expert care for ear, nose, and throat conditions, including sinus issues, infections, hearing concerns, and more.',
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2a7 7 0 00-7 7c0 3 1.5 5.5 3.5 7l.5 4h6l.5-4c2-1.5 3.5-4 3.5-7a7 7 0 00-7-7z"/>
        <line x1="9" y1="20" x2="15" y2="20"/>
      </svg>
    ),
  },
  {
    id: 'eye',
    accent: '#0e7490', accentLight: '#cffafe',
    tag: 'Eye Care',
    label: 'Ophthalmology',
    desc: 'Comprehensive eye care focused on vision protection, diagnosis, treatment, and long-term visual health.',
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
        <circle cx="12" cy="12" r="3"/>
      </svg>
    ),
  },
  {
    id: 'dental',
    accent: '#0369a1', accentLight: '#dbeafe',
    tag: 'Dental',
    label: 'Dentistry',
    desc: 'Complete dental care ranging from routine check-ups to restorative and smile-enhancing treatments.',
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2C8.5 2 6 4.5 6 7c0 1.5.5 3 1 4-.5 3-1 5-1 7 0 2 1 4 3 4 1 0 2-1 3-3 1 2 2 3 3 3 2 0 3-2 3-4 0-2-.5-4-1-7 .5-1 1-2.5 1-4 0-2.5-2.5-5-6-5z"/>
      </svg>
    ),
  },
  {
    id: 'path',
    accent: '#6d28d9', accentLight: '#ede9fe',
    tag: 'Lab & Diagnostics',
    label: 'Pathology',
    desc: 'Accurate laboratory diagnostics and timely reporting to support reliable medical decisions and better patient care.',
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 3H5a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2V8l-5-5H9z"/>
        <polyline points="9 3 9 8 19 8"/>
        <line x1="7" y1="13" x2="17" y2="13"/>
        <line x1="7" y1="17" x2="13" y2="17"/>
      </svg>
    ),
  },
  {
    id: 'physio',
    accent: '#047857', accentLight: '#d1fae5',
    tag: 'Rehabilitation',
    label: 'Physiotherapy',
    desc: 'Personalized rehabilitation and movement therapy to reduce pain, improve mobility, and restore daily function.',
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="5" r="2"/>
        <path d="M8 22v-8l-2-4h12l-2 4v8"/>
        <path d="M8 14h8"/>
      </svg>
    ),
  },
];

/* ── Specialty card sub-component ── */
const SpecCard = ({ sp, vis, delay, navigate }) => {
  const [hov, setHov] = React.useState(false);
  return (
    <div
      onClick={() => { navigate('/services'); window.scrollTo(0, 0); }}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        background: '#fff',
        borderRadius: '18px',
        padding: '1.75rem 1.6rem 1.5rem',
        border: `1.5px solid ${hov ? sp.accent + '35' : '#edf2f7'}`,
        boxShadow: hov
          ? `0 18px 44px rgba(0,0,0,0.07), 0 0 0 1px ${sp.accent}15`
          : '0 2px 12px rgba(14,31,63,0.045)',
        cursor: 'pointer',
        transform: hov ? 'translateY(-5px)' : 'translateY(0)',
        transition: 'all 0.26s cubic-bezier(0.34,1.4,0.64,1)',
        opacity: vis ? 1 : 0,
        transitionDelay: `${delay}s`,
        position: 'relative',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Top accent strip */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: '3px',
        background: `linear-gradient(90deg,${sp.accent},${sp.accent}55)`,
        opacity: hov ? 1 : 0.35,
        transition: 'opacity 0.26s ease',
      }} />

      {/* Icon bubble */}
      <div style={{
        width: 52, height: 52, borderRadius: '14px',
        background: hov ? sp.accent : sp.accentLight,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        marginBottom: '1.1rem',
        color: hov ? '#fff' : sp.accent,
        transition: 'all 0.26s ease',
        boxShadow: hov ? `0 6px 18px ${sp.accent}45` : 'none',
        flexShrink: 0,
      }}>
        {sp.icon}
      </div>

      {/* Tag */}
      <div style={{
        fontSize: '0.65rem', fontWeight: 700, textTransform: 'uppercase',
        letterSpacing: '0.1em', color: sp.accent, marginBottom: '0.3rem',
      }}>
        {sp.tag}
      </div>

      {/* Title */}
      <h3 style={{
        color: '#0c1f3f', fontWeight: 800, fontSize: '0.97rem',
        lineHeight: 1.25, margin: '0 0 0.65rem',
      }}>
        {sp.label}
      </h3>

      {/* Description */}
      <p style={{
        color: '#64748b', fontSize: '0.82rem', lineHeight: 1.68,
        margin: '0 0 1.25rem', flex: 1,
      }}>
        {sp.desc}
      </p>

      {/* CTA */}
      <div style={{
        display: 'inline-flex', alignItems: 'center', gap: '0.3rem',
        color: sp.accent, fontWeight: 700, fontSize: '0.8rem',
        transform: hov ? 'translateX(4px)' : 'translateX(0)',
        transition: 'transform 0.22s ease',
        marginTop: 'auto',
      }}>
        Learn More
        <ArrowRight size={13} />
      </div>
    </div>
  );
};

const Services = ({ goBook }) => {
  const [ref, vis] = useInView(0.04);
  const navigate   = useNavigate();

  return (
    <section id="services" style={{
      background: '#fff',
      padding: '5.5rem 0',
      borderTop: '1px solid #f0f4f8',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Subtle background texture */}
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: 'radial-gradient(circle at 80% 20%, rgba(3,105,161,0.03) 0%, transparent 60%), radial-gradient(circle at 10% 80%, rgba(5,150,105,0.025) 0%, transparent 55%)',
        pointerEvents: 'none',
      }} />

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>

        {/* ── Section heading ── */}
        <div style={{
          display: 'flex', justifyContent: 'space-between',
          alignItems: 'flex-end', marginBottom: '3rem',
          gap: '1rem', flexWrap: 'wrap',
        }}>
          <div style={{ maxWidth: 600 }}>
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: '0.45rem',
              background: '#e0f2fe', borderRadius: '999px',
              padding: '0.28rem 0.85rem', marginBottom: '0.9rem',
            }}>
              <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#0369a1' }} />
              <span style={{ fontSize: '0.7rem', fontWeight: 700, color: '#0369a1', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                Clinical Specialties
              </span>
            </div>
            <h2 style={{
              color: '#0c1f3f', fontSize: 'clamp(1.7rem,3.8vw,2.4rem)',
              fontWeight: 800, lineHeight: 1.18, margin: '0 0 0.75rem',
            }}>
              Specialized Care,{' '}
              <span style={{
                background: 'linear-gradient(135deg,#0369a1,#0ea5e9)',
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
              }}>
                All Under One Roof
              </span>
            </h2>
            <p style={{ color: '#64748b', fontSize: '0.95rem', lineHeight: 1.7, margin: 0, maxWidth: 520 }}>
              Delivering trusted, patient-centered care across 10 essential specialties — with clinical excellence, comfort, and continuity at Karan Nagar.
            </p>
          </div>

          <Link to="/services" onClick={() => window.scrollTo(0,0)} style={{
            display: 'inline-flex', alignItems: 'center', gap: '0.4rem',
            padding: '0.6rem 1.2rem', border: '1.5px solid #0369a1',
            borderRadius: '9999px', color: '#0369a1', fontWeight: 700,
            fontSize: '0.82rem', textDecoration: 'none',
            transition: 'all 0.2s ease', flexShrink: 0,
            background: 'transparent',
          }}
            onMouseEnter={e => { e.currentTarget.style.background='#0369a1'; e.currentTarget.style.color='#fff'; }}
            onMouseLeave={e => { e.currentTarget.style.background='transparent'; e.currentTarget.style.color='#0369a1'; }}
          >
            All Specialties <ArrowRight size={13} />
          </Link>
        </div>

        {/* ── Specialty card grid ── */}
        <div
          ref={ref}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
            gap: '1.1rem',
          }}
        >
          {SPECIALTIES.map((sp, i) => (
            <SpecCard key={sp.id} sp={sp} vis={vis} delay={i * 0.055} navigate={navigate} />
          ))}
        </div>

        {/* ── CTA bar ── */}
        <div style={{
          marginTop: '2.5rem',
          background: 'linear-gradient(135deg,#0c1f3f 0%,#0369a1 60%,#0ea5e9 100%)',
          borderRadius: '18px',
          padding: 'clamp(1.5rem,3vw,2rem) clamp(1.5rem,3vw,2.5rem)',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          gap: '1.25rem', flexWrap: 'wrap',
        }}>
          <div>
            <div style={{ color: '#bae6fd', fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: '0.35rem' }}>
              Apollo Clinic Srinagar
            </div>
            <div style={{ color: '#fff', fontWeight: 800, fontSize: 'clamp(1rem,2.5vw,1.25rem)', lineHeight: 1.25, marginBottom: '0.3rem' }}>
              Need a consultation with a specialist?
            </div>
            <div style={{ color: '#94d3f7', fontSize: '0.84rem' }}>
              Walk in or book ahead · Mon–Sat 12PM–7PM · Sun 10AM–1:30PM
            </div>
          </div>
          <div style={{ display: 'flex', gap: '0.7rem', flexWrap: 'wrap' }}>
            <button onClick={goBook} style={{
              display: 'inline-flex', alignItems: 'center', gap: '0.4rem',
              padding: '0.7rem 1.4rem', background: '#fff',
              color: '#0369a1', fontWeight: 800, fontSize: '0.88rem',
              border: 'none', borderRadius: '10px', cursor: 'pointer',
              fontFamily: 'inherit', transition: 'all 0.2s',
              boxShadow: '0 4px 16px rgba(0,0,0,0.15)',
            }}
              onMouseEnter={e => e.currentTarget.style.transform='scale(1.04)'}
              onMouseLeave={e => e.currentTarget.style.transform='scale(1)'}
            >
              <Calendar size={14} /> Book Appointment
            </button>
            <a href={PHONE_HREF} style={{
              display: 'inline-flex', alignItems: 'center', gap: '0.4rem',
              padding: '0.7rem 1.2rem',
              background: 'rgba(255,255,255,0.12)',
              border: '1.5px solid rgba(255,255,255,0.3)',
              borderRadius: '10px', color: '#fff',
              fontWeight: 700, fontSize: '0.85rem', textDecoration: 'none',
              transition: 'all 0.2s',
            }}
              onMouseEnter={e => e.currentTarget.style.background='rgba(255,255,255,0.2)'}
              onMouseLeave={e => e.currentTarget.style.background='rgba(255,255,255,0.12)'}
            >
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

/* ════════════════════════════════════════════
   CARE GUIDE — Premium information cards
════════════════════════════════════════════ */
const CARE_CARDS = [
  {
    id: 'appointments',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="4" width="18" height="18" rx="3"/>
        <line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/>
        <line x1="3" y1="10" x2="21" y2="10"/>
        <circle cx="12" cy="15" r="1.5" fill="currentColor" stroke="none"/>
      </svg>
    ),
    accent: '#0369a1',
    accentLight: '#e0f2fe',
    tag: 'Appointments',
    title: 'Consultations & Bookings',
    body: 'Learn how to schedule a consultation, what to expect during your visit, follow-up procedures, clinic timings, and how our doctors review your case.',
    cta: 'Explore More',
    href: '/book',
  },
  {
    id: 'treatments',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2C9 2 6 5 6 8c0 4 6 10 6 10s6-6 6-10c0-3-3-6-6-6z"/>
        <circle cx="12" cy="8" r="2"/>
        <line x1="12" y1="18" x2="12" y2="22"/>
        <line x1="8" y1="22" x2="16" y2="22"/>
      </svg>
    ),
    accent: '#059669',
    accentLight: '#d1fae5',
    tag: 'Treatments',
    title: 'Treatments & Specialties',
    body: 'Discover the full range of clinical specialties, treatment protocols, and procedures available at Apollo Clinic — from general medicine to specialist consultations.',
    cta: 'Explore More',
    href: '/services',
  },
  {
    id: 'diagnostics',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 3H5a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2V8l-5-5H9z"/>
        <polyline points="9 3 9 8 19 8"/>
        <line x1="7" y1="13" x2="17" y2="13"/>
        <line x1="7" y1="17" x2="13" y2="17"/>
      </svg>
    ),
    accent: '#7c3aed',
    accentLight: '#ede9fe',
    tag: 'Diagnostics',
    title: 'Diagnostics & Patient Care',
    body: 'Understand our in-house lab tests, ECG, blood workups, and the clinic\'s commitment to accurate, timely, and safe diagnostic support for every patient.',
    cta: 'Explore More',
    href: '/diagnostics',
  },
  {
    id: 'faq',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/>
        <path d="M9.09 9a3 3 0 015.83 1c0 2-3 3-3 3"/>
        <circle cx="12" cy="17" r=".5" fill="currentColor" stroke="none"/>
      </svg>
    ),
    accent: '#b45309',
    accentLight: '#fef3c7',
    tag: 'Patient FAQ',
    title: 'Patient Guidance & FAQ',
    body: 'Get clear answers to common questions about appointments, prescriptions, report collection, consultation follow-ups, and how to prepare for your visit.',
    cta: 'Explore More',
    href: '/faq',
  },
];

const CareGuide = () => {
  const navigate = useNavigate();
  const [ref, vis] = useInView(0.07);
  const [hovered, setHovered] = React.useState(null);

  return (
    <section ref={ref} style={{
      background: '#fafbfc',
      padding: '5.5rem 0',
      position: 'relative',
      overflow: 'hidden',
      borderTop: '1px solid #f0f4f8',
    }}>
      {/* Decorative background cross — medical, low opacity */}
      <div style={{
        position: 'absolute', top: '-60px', right: '-60px',
        width: '340px', height: '340px', opacity: 0.03,
        pointerEvents: 'none',
      }}>
        <svg viewBox="0 0 200 200" fill="#0369a1">
          <rect x="75" y="0" width="50" height="200" rx="8"/>
          <rect x="0" y="75" width="200" height="50" rx="8"/>
        </svg>
      </div>
      <div style={{
        position: 'absolute', bottom: '-40px', left: '-40px',
        width: '260px', height: '260px', opacity: 0.025,
        pointerEvents: 'none',
      }}>
        <svg viewBox="0 0 200 200" fill="#059669">
          <rect x="75" y="0" width="50" height="200" rx="8"/>
          <rect x="0" y="75" width="200" height="50" rx="8"/>
        </svg>
      </div>

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        {/* Header */}
        <div style={{
          maxWidth: 620, marginBottom: '3.5rem',
          opacity: vis ? 1 : 0, transform: vis ? 'none' : 'translateY(18px)',
          transition: 'opacity 0.55s ease, transform 0.55s ease',
        }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
            background: '#e0f2fe', borderRadius: '999px',
            padding: '0.3rem 0.9rem', marginBottom: '1rem',
          }}>
            <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#0369a1' }} />
            <span style={{ fontSize: '0.72rem', fontWeight: 700, color: '#0369a1', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
              Your Complete Guide
            </span>
          </div>
          <h2 style={{ color: '#0c1f3f', fontSize: 'clamp(1.7rem,4vw,2.4rem)', fontWeight: 800, lineHeight: 1.2, margin: '0 0 1rem' }}>
            Have Questions?{' '}
            <span style={{
              background: 'linear-gradient(135deg,#0369a1,#0ea5e9)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
            }}>
              Our Care Team
            </span>
            {' '}Is Here to Guide You.
          </h2>
          <p style={{ color: '#64748b', fontSize: '1rem', lineHeight: 1.7, margin: 0 }}>
            Everything you need to know about your care at Apollo Clinic — consultations, treatments, diagnostics, and more — clearly explained.
          </p>
        </div>

        {/* Card grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '1.25rem',
        }}>
          {CARE_CARDS.map((card, i) => {
            const isHov = hovered === card.id;
            return (
              <div
                key={card.id}
                onClick={() => { navigate(card.href); window.scrollTo(0, 0); }}
                onMouseEnter={() => setHovered(card.id)}
                onMouseLeave={() => setHovered(null)}
                style={{
                  background: '#fff',
                  borderRadius: '20px',
                  padding: '2rem 1.75rem 1.75rem',
                  border: `1.5px solid ${isHov ? card.accent + '40' : '#eef2f7'}`,
                  boxShadow: isHov
                    ? `0 20px 48px rgba(0,0,0,0.08), 0 0 0 1px ${card.accent}18`
                    : '0 2px 16px rgba(14,31,63,0.05)',
                  cursor: 'pointer',
                  transform: isHov ? 'translateY(-6px)' : 'translateY(0)',
                  transition: 'all 0.28s cubic-bezier(0.34,1.56,0.64,1)',
                  opacity: vis ? 1 : 0,
                  transitionDelay: vis ? `${i * 0.08}s` : '0s',
                  position: 'relative',
                  overflow: 'hidden',
                }}
              >
                {/* Top accent line */}
                <div style={{
                  position: 'absolute', top: 0, left: '1.75rem', right: '1.75rem', height: '3px',
                  background: `linear-gradient(90deg,${card.accent},${card.accent}66)`,
                  borderRadius: '0 0 4px 4px',
                  opacity: isHov ? 1 : 0.4,
                  transition: 'opacity 0.28s ease',
                }} />

                {/* Icon */}
                <div style={{
                  width: 56, height: 56, borderRadius: '16px',
                  background: isHov ? card.accent : card.accentLight,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  marginBottom: '1.25rem',
                  color: isHov ? '#fff' : card.accent,
                  transition: 'all 0.28s ease',
                  boxShadow: isHov ? `0 8px 20px ${card.accent}40` : 'none',
                }}>
                  {card.icon}
                </div>

                {/* Tag */}
                <div style={{
                  fontSize: '0.68rem', fontWeight: 700, textTransform: 'uppercase',
                  letterSpacing: '0.1em', color: card.accent,
                  marginBottom: '0.4rem',
                }}>
                  {card.tag}
                </div>

                {/* Title */}
                <h3 style={{
                  color: '#0c1f3f', fontWeight: 800, fontSize: '1.05rem',
                  lineHeight: 1.25, margin: '0 0 0.75rem',
                }}>
                  {card.title}
                </h3>

                {/* Body */}
                <p style={{
                  color: '#64748b', fontSize: '0.875rem', lineHeight: 1.7,
                  margin: '0 0 1.5rem',
                }}>
                  {card.body}
                </p>

                {/* CTA */}
                <div style={{
                  display: 'inline-flex', alignItems: 'center', gap: '0.35rem',
                  color: card.accent, fontWeight: 700, fontSize: '0.85rem',
                  transform: isHov ? 'translateX(4px)' : 'none',
                  transition: 'transform 0.25s ease',
                }}>
                  {card.cta}
                  <ArrowRight size={14} />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

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
