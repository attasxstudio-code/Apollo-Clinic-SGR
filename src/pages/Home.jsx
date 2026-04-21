import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Phone, MapPin, ArrowRight, ChevronDown, CheckCircle, ExternalLink } from 'lucide-react';
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

      {/* Sticky mobile bar */}
      <div style={{
        display: 'none', position: 'fixed', bottom: 0, left: 0, right: 0,
        zIndex: 998, background: '#fff',
        borderTop: '1px solid #e2e8f0',
        boxShadow: '0 -2px 16px rgba(0,0,0,0.07)',
      }} id="mobile-cta">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 0 }}>
          <button onClick={goBook} style={{
            padding: '0.85rem', background: 'linear-gradient(135deg,#0369a1,#0ea5e9)',
            color: '#fff', border: 'none', fontWeight: 800, fontSize: '0.92rem',
            cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem',
            fontFamily: 'inherit',
          }}>
            Book Appointment
          </button>
          <a href={PHONE_HREF} style={{
            padding: '0.85rem', background: '#0c4a6e',
            color: '#fff', fontWeight: 800, fontSize: '0.92rem',
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem',
            textDecoration: 'none',
          }}>
            <Phone size={15} /> Call Us
          </a>
        </div>
      </div>

      <style>{`
        *, *::before, *::after { box-sizing: border-box; }

        @media (max-width: 768px) {
          #mobile-cta { display: block !important; }
          body { padding-bottom: 60px; }
          a[aria-label="Chat on WhatsApp"] { bottom: 72px !important; }
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
        }
        @media (max-width: 480px) {
          .svc-grid { grid-template-columns: 1fr !important; }
          .doc-grid  { grid-template-columns: 1fr !important; }
          .diag-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
};

/* ═══════════════════════════════════
   1. HERO
═══════════════════════════════════ */
const Hero = ({ goBook }) => (
  <section id="home" style={{
    background: '#fff',
    borderBottom: '1px solid #e2e8f0',
    padding: '4rem 0 3.5rem',
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
      <div className="hero-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 420px', gap: '3.5rem', alignItems: 'center' }}>

        {/* Left */}
        <div>
          {/* Location badge */}
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '0.4rem',
            background: '#f0f9ff', border: '1px solid #bae6fd',
            color: '#0369a1', fontSize: '0.8rem', fontWeight: 700,
            padding: '0.35rem 0.85rem', borderRadius: '6px',
            marginBottom: '1.25rem',
          }}>
            <MapPin size={13} />
            Karan Nagar, Srinagar, J&K
          </div>

          <h1 style={{
            color: '#0c4a6e', fontWeight: 900,
            fontSize: 'clamp(2rem,4.5vw,3.2rem)',
            lineHeight: 1.1, letterSpacing: '-0.03em',
            marginBottom: '1rem',
          }}>
            Apollo Clinic Srinagar<br />
            <span style={{ color: '#0369a1', fontSize: '0.72em', fontWeight: 700, letterSpacing: '-0.02em' }}>
              Multi-Speciality Healthcare in Karan Nagar
            </span>
          </h1>

          <p style={{
            color: '#475569', fontSize: '1.05rem', lineHeight: 1.75,
            marginBottom: '1.5rem', maxWidth: '520px',
          }}>
            Consultations across 6+ specialities, in-house diagnostics — ECG, ECHO, PFT, blood tests — and preventive health checkups. Experienced doctors. One clinic.
          </p>

          {/* Address + hours */}
          <div style={{
            display: 'flex', flexDirection: 'column', gap: '0.5rem',
            marginBottom: '2rem', padding: '1rem 1.1rem',
            background: '#f8fafc', borderRadius: '10px',
            border: '1px solid #e2e8f0', maxWidth: '520px',
          }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.55rem', fontSize: '0.88rem', color: '#334155' }}>
              <MapPin size={15} color="#0369a1" style={{ flexShrink: 0, marginTop: '1px' }} />
              <span>Near National School, Arham Towers, Karan Nagar, Srinagar, J&K</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.55rem', fontSize: '0.88rem', color: '#334155' }}>
              <span style={{ fontSize: '0.82rem', color: '#64748b' }}>🕐</span>
              <span>Mon–Sat: 12:00 PM – 7:00 PM &nbsp;·&nbsp; Sunday: 10:00 AM – 1:30 PM</span>
            </div>
          </div>
          {/* CTAs */}
          <div className="hero-btns" style={{ display: 'flex', gap: '0.7rem', flexWrap: 'wrap' }}>
            <button onClick={goBook} className="btn btn-primary" style={{ padding: '0.85rem 1.6rem', fontSize: '0.95rem' }}>
              Book Appointment
            </button>
            <Link to="/book-checkup" style={{
              display: 'inline-flex', alignItems: 'center', gap: '0.45rem',
              padding: '0.85rem 1.6rem', background: '#059669',
              borderRadius: '9999px',
              color: '#fff', fontWeight: 700, fontSize: '0.92rem',
              textDecoration: 'none', transition: 'all 0.2s',
            }}
              onMouseEnter={e => { e.currentTarget.style.background = '#047857'; }}
              onMouseLeave={e => { e.currentTarget.style.background = '#059669'; }}
            >
              🔬 Book a Checkup
            </Link>
            <a href={PHONE_HREF} style={{
              display: 'inline-flex', alignItems: 'center', gap: '0.45rem',
              padding: '0.85rem 1.4rem', background: '#f0f9ff',
              border: '1.5px solid #bae6fd', borderRadius: '9999px',
              color: '#0369a1', fontWeight: 700, fontSize: '0.92rem',
              textDecoration: 'none', transition: 'all 0.2s',
            }}
              onMouseEnter={e => { e.currentTarget.style.background = '#e0f2fe'; }}
              onMouseLeave={e => { e.currentTarget.style.background = '#f0f9ff'; }}
            >
              <Phone size={15} /> Call Now
            </a>
            <a href={WA_LINK} target="_blank" rel="noreferrer" style={{
              display: 'inline-flex', alignItems: 'center', gap: '0.45rem',
              padding: '0.85rem 1.4rem', background: '#f0fdf4',
              border: '1.5px solid #a7f3d0', borderRadius: '9999px',
              color: '#047857', fontWeight: 700, fontSize: '0.92rem',
              textDecoration: 'none', transition: 'all 0.2s',
            }}
              onMouseEnter={e => { e.currentTarget.style.background = '#dcfce7'; }}
              onMouseLeave={e => { e.currentTarget.style.background = '#f0fdf4'; }}
            >
              <WAIcon size={15} /> WhatsApp
            </a>
            <a href={MAPS_LINK} target="_blank" rel="noreferrer" style={{
              display: 'inline-flex', alignItems: 'center', gap: '0.45rem',
              padding: '0.85rem 1.4rem', background: '#f8fafc',
              border: '1.5px solid #e2e8f0', borderRadius: '9999px',
              color: '#64748b', fontWeight: 700, fontSize: '0.92rem',
              textDecoration: 'none', transition: 'all 0.2s',
            }}
              onMouseEnter={e => { e.currentTarget.style.background = '#f1f5f9'; }}
              onMouseLeave={e => { e.currentTarget.style.background = '#f8fafc'; }}
            >
              <MapPin size={14} /> Get Directions
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
            padding: '1.25rem 1.4rem',
          }}>
            <div style={{ color: '#fff', fontWeight: 800, fontSize: '1rem', marginBottom: '0.2rem' }}>Apollo Clinic Srinagar</div>
            <div style={{ color: 'rgba(255,255,255,0.75)', fontSize: '0.8rem' }}>Multi-Speciality Clinic · Karan Nagar</div>
          </div>

          {/* Specialities */}
          <div style={{ padding: '1.1rem 1.4rem', borderBottom: '1px solid #f1f5f9' }}>
            <div style={{ fontSize: '0.72rem', fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '0.7rem' }}>Available Specialities</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
              {['General Medicine','Dermatology','Paediatrics','Gynaecology','Orthopaedics','Psychology','Physiotherapy','Diagnostics'].map((s, i) => (
                <span key={i} style={{
                  background: '#f0f9ff', color: '#0369a1', border: '1px solid #bae6fd',
                  fontSize: '0.73rem', fontWeight: 600,
                  padding: '0.2rem 0.6rem', borderRadius: '6px',
                }}>{s}</span>
              ))}
            </div>
          </div>

          {/* Hours */}
          <div style={{ padding: '1.1rem 1.4rem', borderBottom: '1px solid #f1f5f9' }}>
            <div style={{ fontSize: '0.72rem', fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '0.7rem' }}>Clinic Hours</div>
            {[
              { day: 'Mon – Sat', time: '12:00 PM – 7:00 PM' },
              { day: 'Sunday',    time: '10:00 AM – 1:30 PM' },
            ].map((t, i) => (
              <div key={i} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '0.4rem' }}>
                <span style={{ color: '#64748b' }}>{t.day}</span>
                <span style={{ color: '#0c4a6e', fontWeight: 700 }}>{t.time}</span>
              </div>
            ))}
          </div>

          {/* Quick actions */}
          <div style={{ padding: '1.1rem 1.4rem', display: 'flex', flexDirection: 'column', gap: '0.55rem' }}>
            <button onClick={goBook} style={{
              width: '100%', padding: '0.75rem', background: 'linear-gradient(135deg,#0369a1,#0ea5e9)',
              color: '#fff', border: 'none', borderRadius: '10px', fontWeight: 800,
              fontSize: '0.9rem', cursor: 'pointer', fontFamily: 'inherit',
            }}>Book Appointment</button>
            <Link to="/book-checkup" style={{
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem',
              padding: '0.75rem', background: 'linear-gradient(135deg,#059669,#10b981)',
              borderRadius: '10px', color: '#fff', fontWeight: 800, fontSize: '0.88rem',
              textDecoration: 'none',
            }}>🔬 Book a Checkup</Link>
            <a href={PHONE_HREF} style={{
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem',
              padding: '0.75rem', background: '#f8fafc', border: '1.5px solid #e2e8f0',
              borderRadius: '10px', color: '#0369a1', fontWeight: 700, fontSize: '0.88rem',
              textDecoration: 'none',
            }}>
              <Phone size={14} /> {PHONE}
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>
);

/* ═══════════════════════════════════
   2. TRUST STRIP
═══════════════════════════════════ */
const TRUST_ITEMS = [
  { icon: '🏥', label: 'Multi-Speciality Clinic' },
  { icon: '👨‍⚕️', label: 'Experienced Doctors' },
  { icon: '🔬', label: 'In-House Diagnostics' },
  { icon: '📅', label: 'Easy Online Booking' },
  { icon: '📍', label: 'Karan Nagar, Srinagar' },
  { icon: '✅', label: 'Patient-Focused Care' },
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
          padding: '0.8rem 1.6rem',
          borderRight: i < TRUST_ITEMS.length - 1 ? '1px solid #e2e8f0' : 'none',
          whiteSpace: 'nowrap',
        }}>
          <span style={{ fontSize: '0.95rem' }}>{item.icon}</span>
          <span style={{ fontSize: '0.8rem', fontWeight: 600, color: '#475569' }}>{item.label}</span>
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
    desc: 'Primary care consultations for fever, infections, chronic conditions, hypertension, diabetes, and general health concerns. First point of care for most conditions.',
    tags: ['Fever & Infections', 'Chronic Disease', 'Diabetes', 'Hypertension'],
  },
  {
    label: 'Cardiology',
    icon: '❤️',
    desc: 'Cardiac evaluation with in-house ECG and ECHO testing. Early detection of heart conditions, monitoring of existing cardiac patients.',
    tags: ['ECG', 'ECHO', 'Heart Monitoring', 'Cardiac Risk'],
  },
  {
    label: 'Dermatology',
    icon: '🧴',
    desc: 'Diagnosis and treatment of skin conditions including acne, eczema, psoriasis, fungal infections, hair loss, and cosmetic skin concerns.',
    tags: ['Acne & Eczema', 'Hair Loss', 'Skin Infections', 'Cosmetic Concerns'],
  },
  {
    label: 'Paediatrics',
    icon: '👶',
    desc: 'Comprehensive child healthcare from infancy through adolescence. Vaccination schedules, growth monitoring, nutrition counseling, and illness management.',
    tags: ['Vaccinations', 'Growth Monitoring', 'Child Nutrition', 'Illness'],
  },
  {
    label: 'Gynaecology',
    icon: '🌸',
    desc: "Women's health consultations covering menstrual disorders, reproductive health, hormonal concerns, and routine preventive care — delivered with care and privacy.",
    tags: ["Women's Health", 'Menstrual Disorders', 'Fertility', 'Preventive'],
  },
  {
    label: 'Orthopaedics',
    icon: '🦴',
    desc: 'Evaluation and management of bone, joint, and muscle conditions. Arthritis, back pain, sports injuries, and post-surgery rehabilitation support.',
    tags: ['Joint Pain', 'Back & Spine', 'Sports Injuries', 'Rehabilitation'],
  },
  {
    label: 'Pulmonology / PFT',
    icon: '🫁',
    desc: 'Respiratory health assessment with in-house Pulmonary Function Testing (PFT). Essential for asthma, COPD, chronic cough, and breathlessness evaluation.',
    tags: ['PFT Testing', 'Asthma', 'COPD', 'Breathing Disorders'],
  },
  {
    label: 'Diagnostics & Lab',
    icon: '🔬',
    desc: 'Comprehensive in-house laboratory services including blood work, urine tests, lipid profiles, thyroid panels, HbA1c, LFT, KFT, and more.',
    tags: ['Blood Tests', 'Thyroid Panel', 'HbA1c', 'Lipid Profile'],
  },
  {
    label: 'Preventive Checkups',
    icon: '🛡️',
    desc: 'Structured annual health packages for individuals, families, and working professionals. Early detection before conditions become serious.',
    tags: ['Annual Checkup', 'Screening Packages', 'Corporate Health', 'Family Care'],
  },
  {
    label: 'Physiotherapy',
    icon: '💪',
    desc: 'Personalised rehabilitation programs for pain relief, post-surgical recovery, mobility improvement, and sports injury management.',
    tags: ['Pain Management', 'Post-Surgery Rehab', 'Mobility', 'Sports Rehab'],
  },
];

const Services = ({ goBook }) => {
  const [ref, vis] = useInView(0.04);
  return (
    <section id="services" style={{ background: '#fff', padding: '5rem 0', borderTop: '1px solid #f1f5f9' }}>
      <div className="container">
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '2.5rem', gap: '1rem', flexWrap: 'wrap' }}>
          <div>
            <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#0369a1', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.5rem' }}>
              Our Specialities
            </div>
            <h2 style={{ color: '#0c4a6e', margin: 0, fontSize: 'clamp(1.6rem,4vw,2.4rem)' }}>Services & Specialities</h2>
            <p style={{ color: '#64748b', marginTop: '0.5rem', fontSize: '1rem', maxWidth: 520, margin: '0.5rem 0 0' }}>
              6+ specialities and in-house diagnostics — all available under one roof in Karan Nagar.
            </p>
          </div>
          <Link to="/services" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', color: '#0369a1', fontWeight: 700, fontSize: '0.88rem', textDecoration: 'none', flexShrink: 0 }}>
            View all services <ArrowRight size={14} />
          </Link>
        </div>

        {/* Grid */}
        <div ref={ref} className="svc-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(280px,1fr))', gap: '1px', background: '#e2e8f0', border: '1px solid #e2e8f0', borderRadius: '14px', overflow: 'hidden' }}>
          {SERVICES.map((svc, i) => (
            <div key={i} style={{
              background: '#fff', padding: '1.35rem 1.4rem',
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
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.85rem' }}>
                <div style={{
                  width: 42, height: 42, borderRadius: '10px',
                  background: '#f0f9ff', display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '1.3rem', flexShrink: 0,
                }}>{svc.icon}</div>
                <div style={{ flex: 1 }}>
                  <h3 style={{ color: '#0c4a6e', fontWeight: 800, fontSize: '0.92rem', margin: '0 0 0.3rem', lineHeight: 1.3 }}>{svc.label}</h3>
                  <p style={{ color: '#64748b', fontSize: '0.8rem', lineHeight: 1.55, margin: 0 }}>{svc.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div style={{
          marginTop: '2rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          gap: '1.25rem', flexWrap: 'wrap', background: '#f0f9ff',
          border: '1px solid #bae6fd', borderRadius: '12px', padding: '1.35rem 1.5rem',
        }}>
          <div>
            <div style={{ fontWeight: 800, color: '#0c4a6e', fontSize: '1rem', marginBottom: '0.2rem' }}>Need a consultation?</div>
            <div style={{ color: '#64748b', fontSize: '0.85rem' }}>Mon–Sat · 12 PM – 7 PM · Near National School, Karan Nagar</div>
          </div>
          <div style={{ display: 'flex', gap: '0.65rem', flexWrap: 'wrap' }}>
            <button onClick={goBook} className="btn btn-primary" style={{ padding: '0.65rem 1.35rem', fontSize: '0.9rem' }}>Book Appointment</button>
            <a href={PHONE_HREF} style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', padding: '0.65rem 1.2rem', background: '#fff', border: '1.5px solid #bae6fd', borderRadius: '9999px', color: '#0369a1', fontWeight: 700, fontSize: '0.88rem', textDecoration: 'none' }}>
              <Phone size={14} /> {PHONE}
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
    <section id="doctors" style={{ background: '#f8fafc', padding: '5rem 0', borderTop: '1px solid #e2e8f0' }}>
      <div className="container">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '2.5rem', gap: '1rem', flexWrap: 'wrap' }}>
          <div>
            <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#0369a1', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.5rem' }}>Medical Team</div>
            <h2 style={{ color: '#0c4a6e', margin: 0 }}>Our Doctors</h2>
            <p style={{ color: '#64748b', marginTop: '0.5rem', fontSize: '1rem', maxWidth: 500, margin: '0.5rem 0 0' }}>
              Experienced specialists across all key disciplines. Verified qualifications, patient-centred practice.
            </p>
          </div>
          <Link to="/doctors" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', color: '#0369a1', fontWeight: 700, fontSize: '0.88rem', textDecoration: 'none', flexShrink: 0 }}>
            View full team <ArrowRight size={14} />
          </Link>
        </div>

        <div ref={ref} className="doc-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(290px,1fr))', gap: '1.25rem' }}>
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
              {/* Top color bar */}
              <div style={{ height: '4px', background: doc.color }} />

              <div style={{ padding: '1.35rem 1.4rem' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem', marginBottom: '1rem' }}>
                  {/* Initials Avatar */}
                  <div style={{
                    width: 52, height: 52, borderRadius: '50%', flexShrink: 0,
                    background: doc.color, display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: '#fff', fontWeight: 900, fontSize: '1.1rem', letterSpacing: '-0.02em',
                    boxShadow: `0 2px 10px ${doc.color}40`,
                  }}>
                    {doc.initials}
                  </div>
                  <div>
                    <h3 style={{ color: '#0c4a6e', fontWeight: 800, fontSize: '0.95rem', margin: '0 0 0.15rem', lineHeight: 1.25 }}>{doc.name}</h3>
                    <p style={{ color: doc.color, fontWeight: 700, fontSize: '0.8rem', margin: '0 0 0.15rem' }}>{doc.specialty}</p>
                    <p style={{ color: '#94a3b8', fontSize: '0.75rem', margin: 0 }}>{doc.qual}</p>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
                  <span style={{ background: '#f0f9ff', color: '#0369a1', border: '1px solid #bae6fd', fontSize: '0.73rem', fontWeight: 700, padding: '0.22rem 0.65rem', borderRadius: '6px' }}>
                    {doc.exp} Experience
                  </span>
                  <span style={{ background: '#f8fafc', color: '#64748b', border: '1px solid #e2e8f0', fontSize: '0.73rem', fontWeight: 600, padding: '0.22rem 0.65rem', borderRadius: '6px' }}>
                    {doc.days}
                  </span>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '0.85rem', borderTop: '1px solid #f1f5f9' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                    <CheckCircle size={13} color="#059669" />
                    <span style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: 500 }}>Verified Specialist</span>
                  </div>
                  <button onClick={goBook} style={{
                    background: doc.color, color: '#fff', border: 'none',
                    padding: '0.42rem 0.95rem', borderRadius: '8px',
                    fontWeight: 700, fontSize: '0.78rem', cursor: 'pointer',
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
  { icon: '❤️', name: 'ECG (12-Lead)',            why: 'Heart rhythm & electrical activity evaluation. Done in-clinic, results same day.' },
  { icon: '🔊', name: 'ECHO (Echocardiogram)',    why: 'Ultrasound assessment of heart structure and function for cardiac conditions.' },
  { icon: '🫁', name: 'Pulmonary Function (PFT)', why: 'Lung capacity and airflow testing for asthma, COPD, and breathlessness.' },
  { icon: '🔬', name: 'Blood Tests & Lab',        why: 'CBC, LFT, KFT, lipid profile, thyroid, HbA1c, and more — in-house lab.' },
  { icon: '🩸', name: 'Diabetes Panel',           why: 'Fasting glucose, post-meal sugar, and HbA1c for screening and monitoring.' },
  { icon: '🛡️', name: 'Health Checkup Packages', why: 'Structured preventive packages covering key markers for annual wellness screening.' },
];

const Diagnostics = ({ goBook }) => {
  const [ref, vis] = useInView(0.06);
  return (
    <section id="diagnostics" style={{ background: '#fff', padding: '5rem 0', borderTop: '1px solid #e2e8f0' }}>
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(300px,1fr))', gap: '3.5rem', alignItems: 'start' }}>
          {/* Left */}
          <div>
            <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#0369a1', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.5rem' }}>
              Lab & Diagnostics
            </div>
            <h2 style={{ color: '#0c4a6e', marginBottom: '0.85rem', fontSize: 'clamp(1.6rem,4vw,2.3rem)' }}>
              In-House Diagnostics & Health Checkups
            </h2>
            <p style={{ color: '#64748b', lineHeight: 1.75, marginBottom: '1.5rem', fontSize: '1rem' }}>
              Apollo Clinic Srinagar runs its own diagnostic facility in-house. No external lab visits needed. Tests done on-site, results available quickly, reviewed by your doctor.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '1.75rem' }}>
              {['Same-day results for most routine tests', 'Certified lab with quality-controlled equipment', 'Results reviewed and explained by your doctor', 'No referral needed — walk in and test'].map((pt, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.6rem', fontSize: '0.88rem', color: '#334155' }}>
                  <CheckCircle size={14} color="#059669" style={{ flexShrink: 0, marginTop: '2px' }} />
                  {pt}
                </div>
              ))}
            </div>
            <div style={{ display: 'flex', gap: '0.65rem', flexWrap: 'wrap' }}>
              <Link to="/book-checkup" className="btn btn-primary" style={{ fontSize: '0.9rem', padding: '0.75rem 1.4rem', display: 'inline-flex', alignItems: 'center', gap: '0.4rem', textDecoration: 'none' }}>Book a Checkup</Link>
              <Link to="/diagnostics" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', padding: '0.75rem 1.2rem', background: '#f8fafc', border: '1.5px solid #e2e8f0', borderRadius: '9999px', color: '#334155', fontWeight: 700, fontSize: '0.88rem', textDecoration: 'none' }}>
                View Packages <ArrowRight size={14} />
              </Link>
            </div>
          </div>

          {/* Right */}
          <div ref={ref} className="diag-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: '1px', background: '#e2e8f0', border: '1px solid #e2e8f0', borderRadius: '14px', overflow: 'hidden' }}>
            {DIAG_ITEMS.map((d, i) => (
              <div key={i} style={{
                background: '#fff', padding: '1.2rem',
                opacity: vis ? 1 : 0,
                transform: vis ? 'none' : 'translateY(12px)',
                transition: `opacity 0.4s ease ${i * 0.06}s, transform 0.4s ease ${i * 0.06}s, background 0.15s`,
              }}
                onMouseEnter={e => e.currentTarget.style.background = '#f8fafc'}
                onMouseLeave={e => e.currentTarget.style.background = '#fff'}
              >
                <div style={{ fontSize: '1.4rem', marginBottom: '0.4rem' }}>{d.icon}</div>
                <h4 style={{ color: '#0c4a6e', fontWeight: 800, fontSize: '0.85rem', margin: '0 0 0.3rem' }}>{d.name}</h4>
                <p style={{ color: '#64748b', fontSize: '0.78rem', lineHeight: 1.55, margin: 0 }}>{d.why}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

/* ═══════════════════════════════════
   6. TESTIMONIALS
═══════════════════════════════════ */
const TESTIMONIALS = [
  {
    initials: 'AB', color: '#0369a1',
    name: 'Aisha Bhat', location: 'Karan Nagar, Srinagar', rating: 5,
    text: 'Very clean clinic with well-organised staff. I came for a routine checkup — the blood tests were done in-house and the doctor explained everything clearly. Didn\'t have to wait long. Highly recommend.',
  },
  {
    initials: 'IW', color: '#047857',
    name: 'Irfan Wani', location: 'Srinagar', rating: 5,
    text: 'Took my child for a pediatric consultation. The doctor was patient and thorough. The fact that ECG and lab tests are available in the same clinic saved us a separate trip. Good service overall.',
  },
  {
    initials: 'NF', color: '#6d28d9',
    name: 'Noor Fatima', location: 'Srinagar', rating: 5,
    text: 'Had an orthopedic consultation here. The doctor was experienced and straightforward — explained the condition and the treatment options clearly without overcomplicating things. Satisfied with the visit.',
  },
];

const Testimonials = () => {
  const [ref, vis] = useInView(0.07);
  return (
    <section id="testimonials" style={{ background: '#f8fafc', padding: '5rem 0', borderTop: '1px solid #e2e8f0' }}>
      <div className="container">
        <div style={{ marginBottom: '2.5rem' }}>
          <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#0369a1', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.5rem' }}>
            Patient Reviews
          </div>
          <h2 style={{ color: '#0c4a6e', margin: 0 }}>What Patients Say</h2>
          <p style={{ color: '#64748b', marginTop: '0.5rem', fontSize: '1rem', maxWidth: 480 }}>
            Feedback from patients who visited Apollo Clinic Srinagar.
          </p>
        </div>

        <div ref={ref} className="testi-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(280px,1fr))', gap: '1.25rem' }}>
          {TESTIMONIALS.map((t, i) => (
            <div key={i} style={{
              background: '#fff', border: '1px solid #e2e8f0', borderRadius: '14px',
              padding: '1.5rem', transition: 'all 0.25s',
              opacity: vis ? 1 : 0,
              transform: vis ? 'none' : 'translateY(16px)',
              transitionDelay: `${i * 0.1}s`,
              transitionProperty: 'opacity, transform, box-shadow',
              transitionDuration: '0.45s',
            }}
              onMouseEnter={e => { e.currentTarget.style.boxShadow = '0 6px 24px rgba(14,165,233,0.1)'; e.currentTarget.style.borderColor = '#bae6fd'; }}
              onMouseLeave={e => { e.currentTarget.style.boxShadow = 'none'; e.currentTarget.style.borderColor = '#e2e8f0'; }}
            >
              {/* Stars */}
              <div style={{ display: 'flex', gap: '2px', marginBottom: '0.85rem' }}>
                {[...Array(t.rating)].map((_, s) => <span key={s} style={{ color: '#f59e0b', fontSize: '1rem' }}>★</span>)}
              </div>
              <p style={{ color: '#334155', fontSize: '0.88rem', lineHeight: 1.7, margin: '0 0 1.25rem', fontStyle: 'italic' }}>"{t.text}"</p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.7rem' }}>
                <div style={{ width: 36, height: 36, borderRadius: '50%', background: t.color, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 800, fontSize: '0.85rem', flexShrink: 0 }}>
                  {t.initials}
                </div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: '0.85rem', color: '#1e293b' }}>{t.name}</div>
                  <div style={{ fontSize: '0.73rem', color: '#94a3b8' }}>{t.location}</div>
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
   7. CONTACT + TIMINGS + MAP
═══════════════════════════════════ */
const ContactSection = () => (
  <section id="contact" style={{ background: '#fff', padding: '5rem 0', borderTop: '1px solid #e2e8f0' }}>
    <div className="container">
      <div style={{ marginBottom: '2.5rem' }}>
        <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#0369a1', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.5rem' }}>
          Find Us
        </div>
        <h2 style={{ color: '#0c4a6e', margin: 0 }}>Location, Timings & Contact</h2>
        <p style={{ color: '#64748b', marginTop: '0.5rem', fontSize: '1rem', maxWidth: 480 }}>
          We're in Karan Nagar, Srinagar. Open Mon–Sunday. Walk-ins welcome. Appointments recommended for specialist care.
        </p>
      </div>

      <div className="contact-split" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2.5rem' }}>
        {/* Left: map */}
        <div>
          <div style={{ borderRadius: '12px', overflow: 'hidden', border: '1px solid #e2e8f0', marginBottom: '1rem' }}>
            <div style={{ background: '#0c4a6e', padding: '0.8rem 1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <MapPin size={13} color="#fff" />
              <span style={{ color: '#fff', fontWeight: 700, fontSize: '0.82rem' }}>Near National School, Arham Towers, Karan Nagar, Srinagar, J&K</span>
            </div>
            <iframe
              width="100%" height="240"
              style={{ border: 0, display: 'block' }}
              allowFullScreen="" loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              src={MAPS_EMBED}
              title="Apollo Clinic Srinagar - Karan Nagar Location"
            />
          </div>
          <a href={MAPS_LINK} target="_blank" rel="noreferrer" style={{
            display: 'inline-flex', alignItems: 'center', gap: '0.4rem',
            color: '#0369a1', fontWeight: 700, fontSize: '0.88rem', textDecoration: 'none',
          }}>
            <ExternalLink size={13} /> Open in Google Maps →
          </a>
        </div>

        {/* Right: info */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          {/* Timings */}
          <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '1.35rem' }}>
            <h4 style={{ color: '#0c4a6e', fontWeight: 800, fontSize: '0.9rem', margin: '0 0 1rem' }}>🕐 Clinic Timings</h4>
            {[
              { day: 'Monday – Saturday', time: '12:00 PM – 7:00 PM' },
              { day: 'Sunday',            time: '10:00 AM – 1:30 PM' },
            ].map((t, i) => (
              <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.6rem 0', borderBottom: i === 0 ? '1px solid #e2e8f0' : 'none' }}>
                <span style={{ color: '#64748b', fontSize: '0.88rem' }}>{t.day}</span>
                <span style={{ color: '#059669', fontWeight: 700, fontSize: '0.88rem' }}>{t.time}</span>
              </div>
            ))}
            <div style={{ marginTop: '0.85rem', background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: '8px', padding: '0.6rem 0.85rem' }}>
              <p style={{ color: '#047857', fontWeight: 600, fontSize: '0.78rem', margin: 0 }}>Walk-ins welcome. Appointments recommended for specialist consultations.</p>
            </div>
          </div>

          {/* Contact */}
          <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '1.35rem' }}>
            <h4 style={{ color: '#0c4a6e', fontWeight: 800, fontSize: '0.9rem', margin: '0 0 1rem' }}>📞 Get In Touch</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
              <a href={PHONE_HREF} style={{
                display: 'flex', alignItems: 'center', gap: '0.6rem',
                padding: '0.8rem 1rem', background: '#0369a1', borderRadius: '10px',
                color: '#fff', fontWeight: 700, fontSize: '0.9rem', textDecoration: 'none',
              }}>
                <Phone size={16} /> Call: {PHONE}
              </a>
              <a href={WA_LINK} target="_blank" rel="noreferrer" style={{
                display: 'flex', alignItems: 'center', gap: '0.6rem',
                padding: '0.8rem 1rem', background: '#25D366', borderRadius: '10px',
                color: '#fff', fontWeight: 700, fontSize: '0.9rem', textDecoration: 'none',
              }}>
                <WAIcon size={16} /> WhatsApp Us
              </a>
              <a href={MAPS_LINK} target="_blank" rel="noreferrer" style={{
                display: 'flex', alignItems: 'center', gap: '0.6rem',
                padding: '0.8rem 1rem', background: '#f0f9ff', border: '1.5px solid #bae6fd', borderRadius: '10px',
                color: '#0369a1', fontWeight: 700, fontSize: '0.9rem', textDecoration: 'none',
              }}>
                <MapPin size={16} /> Get Directions
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

/* ═══════════════════════════════════
   8. FAQ
═══════════════════════════════════ */
const FAQS = [
  { q: 'How do I book an appointment at Apollo Clinic Srinagar?', a: 'Use the Book Appointment form on this website, call +91 9000000000 directly, or send a WhatsApp message. We confirm your slot within a few hours.' },
  { q: 'What are the clinic working hours?', a: 'Monday to Saturday: 12:00 PM – 7:00 PM. Sunday: 10:00 AM – 1:30 PM. Walk-ins are welcome during these hours.' },
  { q: 'Which specialities are available at Apollo Clinic?', a: 'General Medicine, Cardiology (ECG/ECHO), Dermatology, Paediatrics, Gynaecology, Orthopaedics, Pulmonology (PFT), Psychology, Physiotherapy, and Preventive Health Checkups.' },
  { q: 'Are diagnostic tests done in-house?', a: 'Yes. ECG, ECHO, Pulmonary Function Tests (PFT), blood work, urine analysis, and other lab tests are all done in-house at the clinic. No separate lab visit needed.' },
  { q: 'Where exactly is Apollo Clinic Srinagar located?', a: 'Near National School, Arham Towers, Karan Nagar, Srinagar, Jammu & Kashmir. You can use the Directions button on this page to open Google Maps.' },
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
        padding: '1rem 1.2rem', background: 'none', border: 'none', width: '100%',
        textAlign: 'left', cursor: 'pointer', fontFamily: 'inherit',
        fontWeight: 700, fontSize: '0.9rem', color: open ? '#0369a1' : '#1e293b',
        transition: 'color 0.2s',
      }}>
        <span>{item.q}</span>
        <ChevronDown size={16} color={open ? '#0369a1' : '#94a3b8'} style={{ transition: 'transform 0.2s', transform: open ? 'rotate(180deg)' : 'none', flexShrink: 0 }} />
      </button>
      {open && (
        <div style={{ padding: '0 1.2rem 1rem', color: '#475569', fontSize: '0.88rem', lineHeight: 1.7 }}>
          {item.a}
        </div>
      )}
    </div>
  );
};

const FAQSection = ({ goBook }) => (
  <section id="faq" style={{ background: '#f8fafc', padding: '5rem 0', borderTop: '1px solid #e2e8f0' }}>
    <div className="container">
      <div className="faq-split" style={{ display: 'grid', gridTemplateColumns: '340px 1fr', gap: '3.5rem', alignItems: 'start' }}>
        <div>
          <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#0369a1', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.5rem' }}>FAQ</div>
          <h2 style={{ color: '#0c4a6e', marginBottom: '0.85rem', fontSize: 'clamp(1.5rem,4vw,2.2rem)' }}>Common Questions</h2>
          <p style={{ color: '#64748b', lineHeight: 1.7, marginBottom: '1.75rem', fontSize: '0.95rem' }}>
            Quick answers about our clinic, timings, services, and how to book.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
            <button onClick={goBook} className="btn btn-primary" style={{ fontSize: '0.9rem', padding: '0.75rem 1.4rem' }}>Book Appointment</button>
            <Link to="/faq" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', color: '#0369a1', fontWeight: 700, fontSize: '0.85rem', textDecoration: 'none' }}>
              View all FAQs <ArrowRight size={14} />
            </Link>
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
          {FAQS.map((item, i) => <FAQItem key={i} item={item} />)}
        </div>
      </div>
    </div>
  </section>
);

/* ═══════════════════════════════════
   9. FINAL CTA + BOOKING
═══════════════════════════════════ */
const FinalCTA = ({ goBook }) => (
  <section id="booking" style={{ background: '#fff', padding: '5rem 0', borderTop: '1px solid #e2e8f0' }}>
    <div className="container">
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(300px,1fr))', gap: '4rem', alignItems: 'start' }}>

        {/* Left */}
        <div>
          <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#0369a1', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.5rem' }}>
            Book an Appointment
          </div>
          <h2 style={{ color: '#0c4a6e', marginBottom: '0.85rem', fontSize: 'clamp(1.6rem,4vw,2.3rem)' }}>
            Ready to See a Doctor?
          </h2>
          <p style={{ color: '#64748b', lineHeight: 1.75, marginBottom: '2rem', fontSize: '1rem' }}>
            Fill out the form and our team will confirm your appointment within a few hours. Or call us directly for immediate assistance.
          </p>

          {/* Clinic card */}
          <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '14px', overflow: 'hidden' }}>
            <div style={{ background: 'linear-gradient(135deg,#0c4a6e,#0369a1)', padding: '1.1rem 1.35rem' }}>
              <div style={{ color: '#fff', fontWeight: 800, fontSize: '0.95rem', marginBottom: '0.15rem' }}>Apollo Clinic Srinagar</div>
              <div style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.78rem' }}>Multi-Speciality · Karan Nagar</div>
            </div>
            <div style={{ padding: '1.1rem 1.35rem', display: 'flex', flexDirection: 'column', gap: '0.7rem' }}>
              {[
                { icon: <MapPin size={14} />, text: 'Near National School, Arham Towers, Karan Nagar, Srinagar' },
                { icon: <span style={{ fontSize: '0.85rem' }}>🕐</span>, text: 'Mon–Sat: 12 PM – 7 PM · Sun: 10 AM – 1:30 PM' },
                { icon: <Phone size={14} />, text: '+91 9000000000' },
              ].map((item, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.6rem', fontSize: '0.85rem', color: '#334155' }}>
                  <span style={{ color: '#0369a1', flexShrink: 0, marginTop: '1px' }}>{item.icon}</span>
                  {item.text}
                </div>
              ))}
              <div style={{ display: 'flex', gap: '0.6rem', marginTop: '0.25rem' }}>
                <a href={PHONE_HREF} style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem', padding: '0.65rem', background: '#0369a1', borderRadius: '8px', color: '#fff', fontWeight: 700, fontSize: '0.83rem', textDecoration: 'none' }}>
                  <Phone size={13} /> Call
                </a>
                <a href={WA_LINK} target="_blank" rel="noreferrer" style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem', padding: '0.65rem', background: '#25D366', borderRadius: '8px', color: '#fff', fontWeight: 700, fontSize: '0.83rem', textDecoration: 'none' }}>
                  <WAIcon size={13} /> WhatsApp
                </a>
                <a href={MAPS_LINK} target="_blank" rel="noreferrer" style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem', padding: '0.65rem', background: '#f0f9ff', border: '1.5px solid #bae6fd', borderRadius: '8px', color: '#0369a1', fontWeight: 700, fontSize: '0.83rem', textDecoration: 'none' }}>
                  <MapPin size={13} /> Map
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
