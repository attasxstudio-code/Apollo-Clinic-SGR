import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Phone, MapPin, ArrowRight, Calendar, CheckCircle,
  Clock, Star, ChevronDown, Shield, Heart, Activity,
  FileText, Navigation,
} from 'lucide-react';

/* ─── Constants ─── */
const PHONE      = '+91 9149425496';
const PHONE_HREF = 'tel:+919149425496';
const WA_NUMBER  = '919149425496';
const WA_LINK    = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent('Hello! I would like to book an appointment at Apollo Clinic Srinagar.')}`;
const MAPS_LINK  = 'https://maps.google.com/?q=34.0806043,74.7988594';
const MAPS_EMBED = 'https://maps.google.com/maps?q=34.0806043,74.7988594&hl=en&z=17&output=embed&iwloc=near';

/* ─── WhatsApp Icon ─── */
const WAIcon = ({ size = 20 }) => (
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

/* ─── Clinic status ─── */
function getClinicStatus() {
  const now  = new Date();
  const day  = now.getDay();
  const mins = now.getHours() * 60 + now.getMinutes();
  if (day >= 1 && day <= 6) return { open: mins >= 720 && mins < 1140, hours: '12:00 PM – 7:00 PM' };
  return { open: mins >= 600 && mins < 810, hours: '10:00 AM – 1:30 PM' };
}

/* ════════════════════════════════════
   1. HERO
════════════════════════════════════ */
const HERO_SPECIALTIES = ['General Physician','Cardiologist','Paediatrician','Gynaecologist','Dermatologist'];

const Hero = ({ goBook, goTo }) => {
  const status = getClinicStatus();
  return (
    <section style={{
      background: '#fff',
      borderBottom: '1px solid var(--border)',
      padding: 'clamp(3.5rem,8vw,5.5rem) 0 clamp(3rem,6vw,5rem)',
    }}>
      <div className="container">
        <div className="hero-split" style={{
          display: 'grid',
          gap: '3.5rem',
          alignItems: 'center',
        }}>
          {/* Left — text */}
          <div>
            {/* Status badge */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
              <span style={{
                display: 'inline-flex', alignItems: 'center', gap: '0.35rem',
                background: status.open ? 'var(--green-light)' : 'var(--bg-alt)',
                color: status.open ? 'var(--green)' : 'var(--muted)',
                border: `1px solid ${status.open ? 'var(--green-border)' : 'var(--border)'}`,
                borderRadius: 'var(--r-full)',
                fontSize: '0.75rem', fontWeight: 700,
                padding: '0.3rem 0.8rem',
              }}>
                <span style={{ width: 6, height: 6, borderRadius: '50%', background: status.open ? 'var(--green)' : 'var(--muted)', display: 'inline-block' }} />
                {status.open ? `Open Now · ${status.hours}` : 'Currently Closed'}
              </span>
              <span style={{ fontSize: '0.75rem', color: 'var(--muted)', fontWeight: 500 }}>
                Karan Nagar, Srinagar
              </span>
            </div>

            <h1 style={{ marginBottom: '1.1rem', color: 'var(--heading)', lineHeight: 1.12 }}>
              Clinical Excellence,{' '}
              <span style={{ color: 'var(--blue)' }}>Rooted in<br />Srinagar</span>
            </h1>

            <p style={{ fontSize: '1.05rem', color: 'var(--body)', lineHeight: 1.72, maxWidth: 480, marginBottom: '2rem' }}>
              Apollo Clinic Srinagar brings together qualified specialists, in-house diagnostics, and a patient-first approach — all under one roof at Karan Nagar.
            </p>

            {/* Specialties scroll */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '2rem' }}>
              {HERO_SPECIALTIES.map(s => (
                <span key={s} style={{
                  background: 'var(--bg)', border: '1px solid var(--border)',
                  borderRadius: 'var(--r-full)', color: 'var(--body)',
                  fontSize: '0.78rem', fontWeight: 500,
                  padding: '0.28rem 0.75rem',
                }}>
                  {s}
                </span>
              ))}
            </div>

            <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', marginBottom: '2.5rem' }}>
              <button className="btn btn-primary btn-lg" onClick={goBook}>
                <Calendar size={17} /> Book Appointment
              </button>
              <a href={PHONE_HREF} className="btn btn-ghost btn-lg">
                <Phone size={17} /> {PHONE}
              </a>
            </div>

            {/* Trust row */}
            <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
              {[
                { num: '10+', label: 'Specialties' },
                { num: '6',   label: 'Doctors' },
                { num: '24/7', label: 'Reports Online' },
              ].map(s => (
                <div key={s.label}>
                  <div style={{ fontSize: '1.5rem', fontWeight: 900, color: 'var(--navy)', lineHeight: 1, letterSpacing: '-0.03em' }}>{s.num}</div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--muted)', fontWeight: 500, marginTop: '0.2rem' }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right — clinic card */}
          <div style={{
            background: 'var(--bg)',
            border: '1px solid var(--border)',
            borderRadius: '20px',
            overflow: 'hidden',
          }}>
            {/* Map/photo placeholder — clinic building visual */}
            <div style={{
              background: 'linear-gradient(135deg, #e8f4fd 0%, #dbeafe 100%)',
              height: 240,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              position: 'relative', overflow: 'hidden',
            }}>
              {/* Simple clinic illustration */}
              <svg width="180" height="160" viewBox="0 0 180 160" fill="none" opacity="0.55">
                <rect x="20" y="60" width="140" height="90" rx="4" fill="#1e3a8a" fillOpacity="0.15"/>
                <rect x="40" y="30" width="100" height="35" rx="4" fill="#1e3a8a" fillOpacity="0.2"/>
                <rect x="65" y="8" width="50" height="26" rx="3" fill="#2563eb" fillOpacity="0.3"/>
                <rect x="75" y="90" width="30" height="60" rx="2" fill="#1e3a8a" fillOpacity="0.25"/>
                <rect x="25" y="80" width="40" height="30" rx="2" fill="#2563eb" fillOpacity="0.15"/>
                <rect x="115" y="80" width="40" height="30" rx="2" fill="#2563eb" fillOpacity="0.15"/>
                {/* Cross */}
                <rect x="85" y="14" width="10" height="14" rx="1" fill="#1e3a8a" fillOpacity="0.6"/>
                <rect x="81" y="18" width="18" height="6" rx="1" fill="#1e3a8a" fillOpacity="0.6"/>
                {/* Windows */}
                <rect x="28" y="84" width="14" height="10" rx="1" fill="#2563eb" fillOpacity="0.35"/>
                <rect x="48" y="84" width="14" height="10" rx="1" fill="#2563eb" fillOpacity="0.35"/>
                <rect x="118" y="84" width="14" height="10" rx="1" fill="#2563eb" fillOpacity="0.35"/>
                <rect x="138" y="84" width="14" height="10" rx="1" fill="#2563eb" fillOpacity="0.35"/>
              </svg>
            </div>

            {/* Info block */}
            <div style={{ padding: '1.25rem' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '0.5rem', marginBottom: '0.85rem' }}>
                <div>
                  <div style={{ fontWeight: 800, fontSize: '0.97rem', color: 'var(--heading)', marginBottom: '0.2rem' }}>
                    Apollo Clinic Srinagar
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', color: 'var(--muted)', fontSize: '0.8rem' }}>
                    <MapPin size={12} /> Near National School, Arham Towers, Karan Nagar
                  </div>
                </div>
                <span style={{
                  background: status.open ? 'var(--green-light)' : 'var(--bg-alt)',
                  color: status.open ? 'var(--green)' : 'var(--muted)',
                  border: `1px solid ${status.open ? 'var(--green-border)' : 'var(--border)'}`,
                  borderRadius: 'var(--r-sm)', fontSize: '0.68rem', fontWeight: 700,
                  padding: '0.2rem 0.5rem', flexShrink: 0,
                  textTransform: 'uppercase', letterSpacing: '0.04em',
                }}>
                  {status.open ? 'Open' : 'Closed'}
                </span>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem', marginBottom: '1rem' }}>
                {[
                  { icon: <Clock size={13} />, label: 'Mon–Sat', val: '12–7 PM' },
                  { icon: <Clock size={13} />, label: 'Sunday',  val: '10–1:30 PM' },
                  { icon: <Phone size={13} />, label: 'Call',    val: PHONE },
                ].map((r, i) => (
                  <div key={i} style={{
                    display: 'flex', alignItems: 'center', gap: '0.45rem',
                    background: 'var(--bg)', borderRadius: 'var(--r-md)',
                    padding: '0.5rem 0.65rem', gridColumn: i === 2 ? '1/-1' : undefined,
                  }}>
                    <span style={{ color: 'var(--blue)', flexShrink: 0 }}>{r.icon}</span>
                    <span style={{ fontSize: '0.75rem', color: 'var(--muted)', fontWeight: 500 }}>{r.label}</span>
                    <span style={{ fontSize: '0.75rem', color: 'var(--heading)', fontWeight: 700, marginLeft: 'auto' }}>{r.val}</span>
                  </div>
                ))}
              </div>

              <a
                href={MAPS_LINK} target="_blank" rel="noreferrer"
                className="btn btn-outline w-full"
                style={{ justifyContent: 'center', fontSize: '0.85rem' }}
              >
                <Navigation size={14} /> Get Directions
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile hero responsive */}
      <style>{`
        @media (max-width: 860px) {
          section .container > div[style*="grid-template-columns: 1fr 420px"] {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
};

/* ════════════════════════════════════
   2. TRUST STRIP
════════════════════════════════════ */
const TRUST_ITEMS = [
  { icon: <Shield size={15} />, label: 'In-House Diagnostics'   },
  { icon: <Activity size={15} />, label: '10+ Medical Specialties' },
  { icon: <CheckCircle size={15} />, label: 'Verified Specialists' },
  { icon: <Clock size={15} />, label: 'Same-Day Lab Results'    },
  { icon: <Heart size={15} />, label: 'Patient-First Care'      },
];
const TrustStrip = () => (
  <div className="trust-strip" style={{ overflowX: 'auto' }}>
    {TRUST_ITEMS.map((t, i) => (
      <div key={i} className="trust-item">
        <div className="trust-icon">{t.icon}</div>
        {t.label}
      </div>
    ))}
  </div>
);

/* ════════════════════════════════════
   3. SERVICES — Comprehensive Clinical Services
════════════════════════════════════ */
const HOME_SERVICES = [
  {
    id: 'gp', slug: 'general-physician',
    name: 'General Physician',
    desc: 'Primary care, chronic disease management, fever, infections and wellness consultations.',
    icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>,
  },
  {
    id: 'cardio', slug: 'cardiology',
    name: 'Cardiology',
    desc: 'ECG, ECHO, cardiac risk assessment and cardiovascular management.',
    icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>,
  },
  {
    id: 'paed', slug: 'pediatrics',
    name: 'Pediatrics',
    desc: 'Comprehensive child healthcare — vaccinations, growth monitoring and illness management.',
    icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="5"/><path d="M6 21v-1a6 6 0 0112 0v1"/></svg>,
  },
  {
    id: 'gyn', slug: 'gynecology',
    name: 'Gynecology',
    desc: "Women's health, antenatal care, reproductive wellness and hormonal disorders.",
    icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22V8M12 8C12 8 9 5 6 5c-2 0-3 1.5-3 3 0 4 3 6 3 9h12c0-3 3-5 3-9 0-1.5-1-3-3-3-3 0-6 3-6 3z"/></svg>,
  },
  {
    id: 'derm', slug: 'dermatology',
    name: 'Dermatology',
    desc: 'Skin, hair and nail care — acne, eczema, hair loss and cosmetic dermatology.',
    icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/></svg>,
  },
  {
    id: 'ortho', slug: 'orthopedics',
    name: 'Orthopedics',
    desc: 'Bone, joint and spine care — injuries, chronic pain and rehabilitation.',
    icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="2" x2="12" y2="22"/><path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/></svg>,
  },
  {
    id: 'psych', slug: 'psychology',
    name: 'Clinical Psychology',
    desc: 'Anxiety, depression, counselling and cognitive behavioural therapy.',
    icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z"/></svg>,
  },
  {
    id: 'diag', slug: 'diagnostics',
    name: 'Diagnostics & Lab',
    desc: 'In-house ECG, ECHO, PFT, blood panels, diabetes screening and health packages.',
    icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M9 3H5a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2V8l-5-5H9z"/><polyline points="9 3 9 8 19 8"/><line x1="7" y1="13" x2="17" y2="13"/><line x1="7" y1="17" x2="13" y2="17"/></svg>,
  },
];

const ServicesSection = ({ goBook, goTo }) => {
  const [ref, vis] = useInView(0.05);
  return (
    <section id="services" style={{ background: 'var(--bg)', padding: '5rem 0' }}>
      <div className="container">
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: '1.5rem', flexWrap: 'wrap', marginBottom: '2.5rem' }}>
          <div>
            <div className="section-label">Our Services</div>
            <h2 style={{ marginBottom: '0.65rem' }}>Comprehensive Clinical Services</h2>
            <p style={{ margin: 0, maxWidth: 500, color: 'var(--body)' }}>
              Multi-speciality care delivered by experienced, verified doctors — all under one roof at Karan Nagar, Srinagar.
            </p>
          </div>
          <button
            className="btn btn-outline-blue btn-sm"
            onClick={() => goTo('/services')}
            style={{ flexShrink: 0, borderRadius: 'var(--r-full)' }}
          >
            View All Services <ArrowRight size={14} />
          </button>
        </div>

        <div ref={ref} style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
          gap: '1rem',
        }}>
          {HOME_SERVICES.map((svc, i) => (
            <div
              key={svc.id}
              className="spec-card"
              onClick={() => goTo('/services')}
              style={{
                opacity: vis ? 1 : 0,
                transform: vis ? 'none' : 'translateY(16px)',
                transition: `opacity 0.45s ease ${i * 0.05}s, transform 0.4s ease ${i * 0.05}s, border-color 0.2s, box-shadow 0.2s`,
              }}
            >
              <div className="spec-card-icon">{svc.icon}</div>
              <h3 className="spec-card h3" style={{ fontSize: '0.95rem', fontWeight: 700, margin: '0.4rem 0 0.25rem', color: 'var(--heading)' }}>
                {svc.name}
              </h3>
              <p style={{ margin: 0, fontSize: '0.8rem', color: 'var(--body)', lineHeight: 1.6 }}>{svc.desc}</p>
              <div className="spec-card-link" style={{ marginTop: '0.75rem' }}>
                Book Now <ArrowRight size={12} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ════════════════════════════════════
   4. DOCTORS — Find a Doctor (preview)
════════════════════════════════════ */
const HOME_DOCTORS = [
  { initials: 'SA', name: 'Dr. Shabir Ahmad Mir', specialty: 'General Physician', qual: 'MBBS, MD', exp: '12+ yrs', avail: 'Mon–Sat', id: 'dr-shabir-ahmad-mir' },
  { initials: 'NR', name: 'Dr. Nazia Rashid',     specialty: 'Dermatology',       qual: 'MBBS, MD', exp: '9+ yrs',  avail: 'Mon–Sat', id: 'dr-nazia-rashid'     },
  { initials: 'AH', name: 'Dr. Aijaz Hussain',    specialty: 'Pediatrics',        qual: 'MBBS, DCH, MD', exp: '10+ yrs', avail: 'Mon–Fri', id: 'dr-aijaz-hussain' },
  { initials: 'SB', name: 'Dr. Saima Bano',       specialty: 'Gynecology',        qual: 'MBBS, MS', exp: '11+ yrs', avail: 'Mon–Sat', id: 'dr-saima-bano'       },
];

const DoctorsSection = ({ goBook, goTo }) => {
  const [ref, vis] = useInView(0.05);
  return (
    <section id="doctors" style={{ background: '#fff', padding: '5rem 0', borderTop: '1px solid var(--border)' }}>
      <div className="container">
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: '1.5rem', flexWrap: 'wrap', marginBottom: '2.5rem' }}>
          <div>
            <div className="section-label">Meet Our Team</div>
            <h2 style={{ marginBottom: '0.65rem' }}>Experienced Specialists</h2>
            <p style={{ margin: 0, maxWidth: 500, color: 'var(--body)' }}>
              Our verified team of multi-specialty doctors is committed to compassionate, evidence-based care for every patient.
            </p>
          </div>
          <button
            className="btn btn-outline-blue btn-sm"
            onClick={() => goTo('/doctors')}
            style={{ flexShrink: 0, borderRadius: 'var(--r-full)' }}
          >
            Find a Doctor <ArrowRight size={14} />
          </button>
        </div>

        <div ref={ref} style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
          gap: '1rem',
        }}>
          {HOME_DOCTORS.map((doc, i) => (
            <div
              key={doc.id}
              className="doc-card"
              onClick={() => goTo(`/doctors/${doc.id}`)}
              style={{
                cursor: 'pointer',
                opacity: vis ? 1 : 0,
                transform: vis ? 'none' : 'translateY(16px)',
                transition: `opacity 0.45s ease ${i * 0.06}s, transform 0.4s ease ${i * 0.06}s, border-color 0.2s, box-shadow 0.2s`,
              }}
            >
              <div className="doc-card-avatar">
                {doc.initials}
              </div>
              <div className="doc-card-body">
                <div style={{ fontSize: '0.68rem', fontWeight: 700, color: 'var(--blue)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                  {doc.specialty}
                </div>
                <div style={{ fontWeight: 800, fontSize: '0.97rem', color: 'var(--heading)', lineHeight: 1.2 }}>{doc.name}</div>
                <div style={{ fontSize: '0.78rem', color: 'var(--body)' }}>{doc.qual}</div>
                <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap', marginTop: '0.35rem' }}>
                  <span style={{ background: 'var(--bg)', border: '1px solid var(--border)', borderRadius: 'var(--r-sm)', fontSize: '0.68rem', fontWeight: 600, color: 'var(--body)', padding: '0.18rem 0.55rem' }}>
                    {doc.exp}
                  </span>
                  <span style={{ background: 'var(--green-light)', border: '1px solid var(--green-border)', borderRadius: 'var(--r-sm)', fontSize: '0.68rem', fontWeight: 600, color: 'var(--green)', padding: '0.18rem 0.55rem' }}>
                    Available
                  </span>
                </div>
              </div>
              <div className="doc-card-actions">
                <button
                  className="btn btn-outline btn-sm"
                  onClick={e => { e.stopPropagation(); goTo(`/doctors/${doc.id}`); }}
                  style={{ borderRadius: 'var(--r-md)' }}
                >
                  Learn More
                </button>
                <button
                  className="btn btn-primary btn-sm"
                  onClick={e => { e.stopPropagation(); goBook(); }}
                  style={{ borderRadius: 'var(--r-md)' }}
                >
                  Book
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ════════════════════════════════════
   5. DIAGNOSTICS — Precision Diagnostics
════════════════════════════════════ */
const DIAG_LIST = [
  { name: 'ECG (12-Lead)',           tag: 'Cardiac',      desc: 'Heart rhythm & electrical activity — results same day.' },
  { name: 'ECHO (Echocardiogram)',   tag: 'Cardiac',      desc: 'Ultrasound imaging of heart structure and valves.' },
  { name: 'Pulmonary Function Test', tag: 'Respiratory',  desc: 'Lung capacity testing for asthma and COPD.' },
  { name: 'Blood Tests & Lab',       tag: 'Laboratory',   desc: 'CBC, LFT, KFT, lipid, thyroid, HbA1c — in-house.' },
  { name: 'Diabetes Panel',          tag: 'Metabolic',    desc: 'Fasting glucose, post-meal sugar and HbA1c.' },
  { name: 'Health Checkup Packages', tag: 'Preventive',   desc: 'Annual wellness packages for early detection.' },
];

const DiagnosticsSection = ({ goTo }) => {
  const [ref, vis] = useInView(0.06);
  return (
    <section id="diagnostics" style={{ background: 'var(--bg)', padding: '5rem 0', borderTop: '1px solid var(--border)' }}>
      <div className="container">
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '4rem',
          alignItems: 'center',
        }}>
          {/* Left — text */}
          <div>
            <div className="section-label">Lab & Diagnostics</div>
            <h2 style={{ marginBottom: '0.75rem' }}>
              Precision Diagnostics<br />
              <span style={{ color: 'var(--blue)' }}>you can rely on</span>
            </h2>
            <p style={{ marginBottom: '1.25rem', color: 'var(--body)' }}>
              Accurate, timely, and comprehensive health testing. Our in-house laboratory ensures your results are delivered swiftly, reviewed by your doctor at the same visit.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem', marginBottom: '1.75rem' }}>
              {['Same-day results for most tests', 'No external lab visits needed', 'Results reviewed by your doctor', 'Walk-in friendly — no referral required'].map((pt, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.55rem', fontSize: '0.87rem', color: 'var(--body)' }}>
                  <CheckCircle size={14} color="var(--green)" style={{ flexShrink: 0 }} />
                  {pt}
                </div>
              ))}
            </div>

            <div style={{ display: 'flex', gap: '0.65rem', flexWrap: 'wrap' }}>
              <button className="btn btn-primary" onClick={() => goTo('/book-checkup')} style={{ borderRadius: 'var(--r-full)' }}>
                <Calendar size={15} /> Book a Checkup
              </button>
              <button className="btn btn-outline-blue" onClick={() => goTo('/diagnostics')} style={{ borderRadius: 'var(--r-full)' }}>
                View Packages <ArrowRight size={14} />
              </button>
            </div>
          </div>

          {/* Right — list */}
          <div ref={ref} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
            {DIAG_LIST.map((d, i) => (
              <div key={i} style={{
                background: '#fff',
                border: '1px solid var(--border)',
                borderRadius: 'var(--r-lg)',
                padding: '1rem',
                opacity: vis ? 1 : 0,
                transform: vis ? 'none' : 'translateY(12px)',
                transition: `opacity 0.4s ease ${i * 0.05}s, transform 0.4s ease ${i * 0.05}s`,
              }}>
                <div style={{
                  background: 'var(--blue-light)', color: 'var(--blue)',
                  borderRadius: 'var(--r-sm)', fontSize: '0.62rem',
                  fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.07em',
                  display: 'inline-block', padding: '0.15rem 0.5rem', marginBottom: '0.5rem',
                }}>
                  {d.tag}
                </div>
                <div style={{ fontWeight: 700, fontSize: '0.84rem', color: 'var(--heading)', lineHeight: 1.25, marginBottom: '0.3rem' }}>{d.name}</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--body)', lineHeight: 1.55 }}>{d.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 780px) {
          #diagnostics .container > div { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
};

/* ════════════════════════════════════
   6. GUIDING PRINCIPLES / WHY US
════════════════════════════════════ */
const PRINCIPLES = [
  {
    icon: <Heart size={20} />,
    title: 'Patient-First Care',
    desc: 'Every clinical decision is guided by what is best for the patient — not metrics or templates.',
  },
  {
    icon: <Activity size={20} />,
    title: 'Advanced Technology',
    desc: 'We utilise quality-controlled, certified diagnostic equipment to ensure accurate and reliable results.',
  },
  {
    icon: <Shield size={20} />,
    title: 'Verified Specialists',
    desc: 'All our doctors are verified, credentialed specialists with substantial clinical experience.',
  },
  {
    icon: <CheckCircle size={20} />,
    title: 'Transparent Practice',
    desc: 'Clear communication of diagnosis, treatment plans, and costs — no hidden surprises.',
  },
];

const GuidingPrinciples = ({ goBook, goTo }) => {
  const [ref, vis] = useInView(0.06);
  return (
    <section id="principles" style={{ background: '#fff', padding: '5rem 0', borderTop: '1px solid var(--border)' }}>
      <div className="container">
        <div style={{
          display: 'grid',
          gridTemplateColumns: '420px 1fr',
          gap: '4rem',
          alignItems: 'center',
        }}>
          {/* Left */}
          <div>
            <div className="section-label">Why Choose Us</div>
            <h2 style={{ marginBottom: '0.75rem' }}>Our Guiding<br />Principles</h2>
            <p style={{ color: 'var(--body)', marginBottom: '1.75rem' }}>
              Apollo Clinic Srinagar is built on a foundation of clinical integrity,
              patient dignity, and medical excellence — every day, for every patient.
            </p>
            <div style={{ display: 'flex', gap: '2rem', marginBottom: '2rem' }}>
              {[{ n: '6', l: 'Doctors' }, { n: '10+', l: 'Specialties' }, { n: '∞', l: 'Compassion' }].map(s => (
                <div key={s.l}>
                  <div style={{ fontSize: '1.6rem', fontWeight: 900, color: 'var(--navy)', letterSpacing: '-0.03em', lineHeight: 1 }}>{s.n}</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--muted)', fontWeight: 500, marginTop: '0.2rem' }}>{s.l}</div>
                </div>
              ))}
            </div>
            <div style={{ display: 'flex', gap: '0.65rem', flexWrap: 'wrap' }}>
              <button className="btn btn-primary" onClick={goBook} style={{ borderRadius: 'var(--r-full)' }}>
                <Calendar size={15} /> Book Appointment
              </button>
              <button className="btn btn-ghost" onClick={() => goTo('/about')} style={{ borderRadius: 'var(--r-full)' }}>
                About Us <ArrowRight size={14} />
              </button>
            </div>
          </div>

          {/* Right — 2x2 principle cards */}
          <div ref={ref} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            {PRINCIPLES.map((p, i) => (
              <div key={i} style={{
                background: 'var(--bg)',
                border: '1px solid var(--border)',
                borderRadius: 'var(--r-xl)',
                padding: '1.5rem',
                opacity: vis ? 1 : 0,
                transform: vis ? 'none' : 'translateY(14px)',
                transition: `opacity 0.45s ease ${i * 0.08}s, transform 0.4s ease ${i * 0.08}s`,
              }}>
                <div style={{
                  width: 40, height: 40, borderRadius: 'var(--r-md)',
                  background: 'var(--blue-light)', color: 'var(--blue)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  marginBottom: '0.85rem',
                }}>
                  {p.icon}
                </div>
                <div style={{ fontWeight: 700, fontSize: '0.93rem', color: 'var(--heading)', marginBottom: '0.35rem' }}>{p.title}</div>
                <div style={{ fontSize: '0.8rem', color: 'var(--body)', lineHeight: 1.62 }}>{p.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 860px) {
          #principles .container > div {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
};

/* ════════════════════════════════════
   7. QUICK ACTIONS
════════════════════════════════════ */
const QuickActions = ({ goBook, goTo }) => (
  <section style={{ background: 'var(--bg)', padding: '3.5rem 0', borderTop: '1px solid var(--border)' }}>
    <div className="container">
      <div style={{ textAlign: 'center', marginBottom: '1.75rem' }}>
        <div className="section-label">Patient Services</div>
        <h2 style={{ marginBottom: '0.5rem', fontSize: 'clamp(1.3rem,3vw,1.9rem)' }}>Everything You Need, In One Place</h2>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '0.85rem' }}>
        {[
          { icon: <Calendar size={20} />, label: 'Book Appointment', sub: 'Online scheduling',       action: goBook },
          { icon: <Phone size={20} />,    label: 'Call Clinic',      sub: 'Speak to our team',       action: () => { window.location.href = PHONE_HREF; } },
          { icon: <WAIcon size={20} />,   label: 'WhatsApp Us',      sub: 'Quick assistance',        action: () => window.open(WA_LINK,'_blank') },
          { icon: <FileText size={20} />, label: 'View Reports',     sub: 'Access test reports',     action: () => goTo('/reports') },
          { icon: <Navigation size={20}/>,label: 'Get Directions',   sub: 'Navigate to clinic',      action: () => window.open(MAPS_LINK,'_blank') },
          { icon: <Activity size={20} />, label: 'Health Checkup',   sub: 'Preventive packages',     action: () => goTo('/book-checkup') },
        ].map((a, i) => (
          <button
            key={i}
            onClick={a.action}
            style={{
              background: '#fff',
              border: '1px solid var(--border)',
              borderRadius: 'var(--r-xl)',
              padding: '1.25rem 1rem',
              display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem',
              cursor: 'pointer', transition: 'all 0.2s', fontFamily: 'inherit',
              textAlign: 'center',
            }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--blue-border)'; e.currentTarget.style.boxShadow = 'var(--shadow-sm)'; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.boxShadow = 'none'; }}
          >
            <div style={{ width: 44, height: 44, borderRadius: 'var(--r-lg)', background: 'var(--blue-light)', color: 'var(--blue)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              {a.icon}
            </div>
            <div style={{ fontWeight: 700, fontSize: '0.84rem', color: 'var(--heading)' }}>{a.label}</div>
            <div style={{ fontSize: '0.72rem', color: 'var(--muted)' }}>{a.sub}</div>
          </button>
        ))}
      </div>
    </div>
  </section>
);

/* ════════════════════════════════════
   8. TESTIMONIALS
════════════════════════════════════ */
const TESTIMONIALS = [
  { name: 'Aisha K.',   rating: 5, specialty: 'Dermatology', text: 'Excellent clinic. Dr. Nazia was thorough, attentive and explained everything clearly. The facility is clean and professional.' },
  { name: 'Farooq A.',  rating: 5, specialty: 'Cardiology',  text: 'ECG and ECHO done in-house — quick results and the doctor reviewed them immediately. Very convenient and trustworthy.' },
  { name: 'Sobia M.',   rating: 5, specialty: 'Pediatrics',  text: 'Dr. Aijaz is wonderful with children. My son was comfortable throughout the consultation. Highly recommend the clinic.' },
  { name: 'Irfan G.',   rating: 5, specialty: 'Orthopedics', text: 'Dr. Mushtaq gave a very thorough assessment. The follow-up care was exceptional and my recovery has been smooth.' },
];

const Testimonials = () => {
  const [ref, vis] = useInView(0.05);
  return (
    <section style={{ background: '#fff', padding: '5rem 0', borderTop: '1px solid var(--border)' }}>
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <div className="section-label">Patient Feedback</div>
          <h2>What Our Patients Say</h2>
          <p style={{ maxWidth: 480, margin: '0.5rem auto 0', color: 'var(--body)' }}>
            Trusted by patients across Srinagar for quality, attentive, and compassionate healthcare.
          </p>
        </div>
        <div ref={ref} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '1rem' }}>
          {TESTIMONIALS.map((t, i) => (
            <div key={i} className="testimonial-card" style={{
              opacity: vis ? 1 : 0,
              transform: vis ? 'none' : 'translateY(14px)',
              transition: `opacity 0.45s ease ${i * 0.07}s, transform 0.4s ease ${i * 0.07}s`,
            }}>
              <div style={{ display: 'flex', gap: '0.15rem', marginBottom: '0.75rem' }}>
                {[...Array(t.rating)].map((_, s) => (
                  <Star key={s} size={13} fill="var(--blue)" stroke="var(--blue)" />
                ))}
              </div>
              <p style={{ margin: '0 0 1rem', fontSize: '0.875rem', lineHeight: 1.68, color: 'var(--body)' }}>
                "{t.text}"
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                <div style={{
                  width: 36, height: 36, borderRadius: '50%',
                  background: 'var(--blue-light)', color: 'var(--blue)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontWeight: 800, fontSize: '0.85rem',
                }}>
                  {t.name[0]}
                </div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: '0.84rem', color: 'var(--heading)' }}>{t.name}</div>
                  <div style={{ fontSize: '0.72rem', color: 'var(--muted)' }}>{t.specialty} patient</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ════════════════════════════════════
   9. CONTACT / MAP SECTION
════════════════════════════════════ */
const ContactSection = ({ goTo }) => (
  <section style={{ background: 'var(--bg)', padding: '5rem 0', borderTop: '1px solid var(--border)' }}>
    <div className="container">
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2.5rem', alignItems: 'start' }}>
        <div>
          <div className="section-label">Find Us</div>
          <h2 style={{ marginBottom: '0.75rem' }}>Visit Apollo Clinic<br /><span style={{ color: 'var(--blue)' }}>Karan Nagar, Srinagar</span></h2>
          <p style={{ color: 'var(--body)', marginBottom: '1.5rem' }}>
            Near National School, Arham Towers, Karan Nagar, Srinagar, Jammu & Kashmir.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem', marginBottom: '1.75rem' }}>
            {[
              { icon: <Phone size={15} />, label: 'Phone', val: PHONE, href: PHONE_HREF },
              { icon: <MapPin size={15} />, label: 'Address', val: 'Near National School, Arham Towers, Karan Nagar', href: null },
              { icon: <Clock size={15} />, label: 'Mon–Sat', val: '12:00 PM – 7:00 PM', href: null },
              { icon: <Clock size={15} />, label: 'Sunday',  val: '10:00 AM – 1:30 PM', href: null },
            ].map((row, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', padding: '0.85rem 1rem', background: '#fff', border: '1px solid var(--border)', borderRadius: 'var(--r-lg)' }}>
                <div style={{ width: 32, height: 32, borderRadius: 'var(--r-md)', background: 'var(--blue-light)', color: 'var(--blue)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  {row.icon}
                </div>
                <div>
                  <div style={{ fontSize: '0.72rem', color: 'var(--muted)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em' }}>{row.label}</div>
                  {row.href
                    ? <a href={row.href} style={{ fontSize: '0.88rem', fontWeight: 600, color: 'var(--navy)' }}>{row.val}</a>
                    : <div style={{ fontSize: '0.88rem', fontWeight: 600, color: 'var(--heading)' }}>{row.val}</div>
                  }
                </div>
              </div>
            ))}
          </div>
          <div style={{ display: 'flex', gap: '0.65rem', flexWrap: 'wrap' }}>
            <a href={MAPS_LINK} target="_blank" rel="noreferrer" className="btn btn-primary" style={{ borderRadius: 'var(--r-full)' }}>
              <Navigation size={15} /> Get Directions
            </a>
            <button className="btn btn-ghost" onClick={() => goTo('/contact')} style={{ borderRadius: 'var(--r-full)' }}>
              Contact Us <ArrowRight size={14} />
            </button>
          </div>
        </div>

        {/* Map */}
        <div style={{ borderRadius: 'var(--r-xl)', overflow: 'hidden', border: '1px solid var(--border)', height: 380 }}>
          <iframe
            title="Apollo Clinic Srinagar Location"
            src={MAPS_EMBED}
            width="100%" height="100%"
            style={{ border: 0, display: 'block' }}
            allowFullScreen loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </div>
    <style>{`@media(max-width:768px){#contact-section-grid{grid-template-columns:1fr!important}}`}</style>
  </section>
);

/* ════════════════════════════════════
   10. FAQ
════════════════════════════════════ */
const FAQS = [
  { q: 'What are Apollo Clinic\'s consultation hours?',         a: 'Monday to Saturday: 12:00 PM to 7:00 PM. Sunday: 10:00 AM to 1:30 PM.' },
  { q: 'Do I need an appointment to visit?',                    a: 'Walk-ins are welcome, but booking an appointment is recommended to reduce waiting time — especially for specialist consultations.' },
  { q: 'What diagnostic tests are available in-house?',         a: 'ECG (12-Lead), Echocardiogram (ECHO), Pulmonary Function Test (PFT), blood tests (CBC, LFT, KFT, lipid, thyroid, HbA1c), urine and stool analysis, and diabetes screening panels.' },
  { q: 'How can I access my test reports online?',              a: 'Visit the Reports section of our website and enter your Patient ID or registered mobile number along with your date of birth to securely access and download your reports.' },
  { q: 'Can I consult a specialist without a GP referral?',     a: 'Yes. Apollo Clinic Srinagar is a multi-specialty clinic — you can directly book an appointment with any of our specialists without a referral.' },
];

const FAQSection = ({ goTo }) => {
  const [open, setOpen] = React.useState(null);
  return (
    <section style={{ background: '#fff', padding: '5rem 0', borderTop: '1px solid var(--border)' }}>
      <div className="container" style={{ maxWidth: 780 }}>
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <div className="section-label">FAQs</div>
          <h2>Frequently Asked Questions</h2>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
          {FAQS.map((f, i) => (
            <div
              key={i}
              className={`faq-item${open === i ? ' open' : ''}`}
              onClick={() => setOpen(open === i ? null : i)}
            >
              <button className="faq-question">
                {f.q}
                <ChevronDown size={16} className="faq-chevron" />
              </button>
              <div className="faq-answer"><p style={{ margin: 0 }}>{f.a}</p></div>
            </div>
          ))}
        </div>
        <div style={{ textAlign: 'center', marginTop: '2rem' }}>
          <button className="btn btn-outline-blue" onClick={() => goTo('/faq')} style={{ borderRadius: 'var(--r-full)' }}>
            View All FAQs <ArrowRight size={14} />
          </button>
        </div>
      </div>
    </section>
  );
};

/* ════════════════════════════════════
   11. FINAL CTA
════════════════════════════════════ */
const FinalCTA = ({ goBook }) => (
  <section style={{ background: 'var(--navy)', padding: '4rem 0' }}>
    <div className="container" style={{ textAlign: 'center' }}>
      <div style={{
        display: 'inline-flex', alignItems: 'center', gap: '0.35rem',
        background: 'rgba(255,255,255,0.1)',
        border: '1px solid rgba(255,255,255,0.2)',
        borderRadius: 'var(--r-full)',
        padding: '0.28rem 0.85rem', marginBottom: '1.25rem',
        fontSize: '0.72rem', fontWeight: 700, color: 'rgba(255,255,255,0.8)',
        textTransform: 'uppercase', letterSpacing: '0.08em',
      }}>
        Apollo Clinic Srinagar
      </div>
      <h2 style={{ color: '#fff', marginBottom: '0.75rem', fontSize: 'clamp(1.4rem,4vw,2.1rem)' }}>
        Ready to book your appointment?
      </h2>
      <p style={{ color: 'rgba(255,255,255,0.65)', maxWidth: 480, margin: '0 auto 2rem', fontSize: '0.97rem' }}>
        Walk in or schedule ahead — our team is here to provide trusted, personalised care at Karan Nagar, Srinagar.
      </p>
      <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center', flexWrap: 'wrap' }}>
        <button
          className="btn btn-lg"
          onClick={goBook}
          style={{ background: '#fff', color: 'var(--navy)', border: 'none', borderRadius: 'var(--r-full)' }}
          onMouseEnter={e => e.currentTarget.style.background='var(--bg)'}
          onMouseLeave={e => e.currentTarget.style.background='#fff'}
        >
          <Calendar size={17} /> Book Appointment
        </button>
        <a
          href={WA_LINK} target="_blank" rel="noreferrer"
          className="btn btn-lg"
          style={{ background: '#25D366', color: '#fff', border: 'none', borderRadius: 'var(--r-full)' }}
        >
          <WAIcon size={17} /> WhatsApp Us
        </a>
        <a
          href={PHONE_HREF}
          className="btn btn-lg"
          style={{ background: 'rgba(255,255,255,0.12)', color: '#fff', border: '1.5px solid rgba(255,255,255,0.25)', borderRadius: 'var(--r-full)' }}
        >
          <Phone size={17} /> {PHONE}
        </a>
      </div>
    </div>
  </section>
);

/* ════════════════════════════════════
   HOME PAGE ROOT
════════════════════════════════════ */
const Home = () => {
  const navigate = useNavigate();
  const goBook   = () => { navigate('/book');  window.scrollTo(0, 0); };
  const goTo     = (path) => { navigate(path); window.scrollTo(0, 0); };

  return (
    <div>
      <Hero        goBook={goBook} goTo={goTo} />
      <TrustStrip />
      <ServicesSection goBook={goBook} goTo={goTo} />
      <DoctorsSection  goBook={goBook} goTo={goTo} />
      <DiagnosticsSection goTo={goTo} />
      <GuidingPrinciples goBook={goBook} goTo={goTo} />
      <QuickActions      goBook={goBook} goTo={goTo} />
      <Testimonials />
      <ContactSection    goTo={goTo} />
      <FAQSection        goTo={goTo} />
      <FinalCTA          goBook={goBook} />

      {/* Floating WhatsApp */}
      <a
        href={WA_LINK} target="_blank" rel="noreferrer"
        aria-label="Chat on WhatsApp"
        style={{
          position: 'fixed', bottom: '84px', right: '14px', zIndex: 999,
          width: 50, height: 50, borderRadius: '50%',
          background: '#25D366', color: '#fff',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: '0 4px 16px rgba(37,211,102,0.45)',
          textDecoration: 'none', transition: 'transform 0.2s',
        }}
        onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.1)'}
        onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
      >
        <WAIcon size={22} />
      </a>

      {/* Mobile sticky bar */}
      <style>{`
        @media (max-width: 640px) {
          #mobile-sticky-bar { display: flex !important; }
        }
      `}</style>
      <div id="mobile-sticky-bar" style={{
        display: 'none', position: 'fixed', bottom: 0, left: 0, right: 0,
        zIndex: 998, background: '#fff', borderTop: '1px solid var(--border)',
        boxShadow: '0 -2px 16px rgba(0,0,0,0.07)',
        gridTemplateColumns: '1fr 1fr 1fr 1fr',
      }}>
        {[
          { label: 'Call', href: PHONE_HREF, icon: <Phone size={17} /> },
          { label: 'WhatsApp', href: WA_LINK, icon: <WAIcon size={17} />, ext: true },
          { label: 'Book', action: goBook, icon: <Calendar size={17} /> },
          { label: 'Reports', action: () => goTo('/reports'), icon: <FileText size={17} /> },
        ].map((b, i) => (
          b.href
            ? <a key={i} href={b.href} target={b.ext ? '_blank' : undefined} rel="noreferrer"
                style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '0.2rem', padding: '0.7rem 0.5rem', color: 'var(--body)', fontSize: '0.68rem', fontWeight: 600, textDecoration: 'none', borderRight: '1px solid var(--border)' }}>
                {b.icon}{b.label}
              </a>
            : <button key={i} onClick={b.action}
                style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '0.2rem', padding: '0.7rem 0.5rem', color: 'var(--body)', fontSize: '0.68rem', fontWeight: 600, background: 'none', border: 'none', borderRight: '1px solid var(--border)', cursor: 'pointer', fontFamily: 'inherit' }}>
                {b.icon}{b.label}
              </button>
        ))}
      </div>
    </div>
  );
};

export default Home;
