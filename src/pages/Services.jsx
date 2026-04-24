import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Phone, Calendar, ArrowRight, CheckCircle, Clock, MapPin } from 'lucide-react';

/* ── Constants ── */
const PHONE      = '+91 9000000000';
const PHONE_HREF = 'tel:+919000000000';
const WA_LINK    = `https://wa.me/919000000000?text=${encodeURIComponent('Hello! I would like to book a consultation at Apollo Clinic Srinagar.')}`;

/* ── Scroll-reveal hook ── */
function useInView(threshold = 0.05) {
  const ref = React.useRef(null);
  const [vis, setVis] = React.useState(false);
  React.useEffect(() => {
    const o = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVis(true); }, { threshold });
    if (ref.current) o.observe(ref.current);
    return () => o.disconnect();
  }, [threshold]);
  return [ref, vis];
}

/* ── Service data — mirrors homepage SPECIALTIES with richer expanded content ── */
const SERVICES = [
  {
    id: 'gp',
    accent: '#0369a1', accentLight: '#e0f2fe',
    tag: 'Primary Care',
    title: 'General Physician',
    short: 'Comprehensive primary care focused on diagnosis, preventive health, and long-term wellness for patients of all ages.',
    detail: 'Our general physicians serve as your first point of care — managing acute illness, chronic conditions, and long-term health monitoring. From fever and infections to diabetes and hypertension management, every consultation is handled with clinical thoroughness and personal attention.',
    features: ['Fever & Infections', 'Chronic Disease Management', 'Preventive Screenings', 'Follow-up Care'],
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
    title: 'Pediatrics',
    short: 'Specialized child healthcare with expert attention to growth, development, immunization, and common childhood illnesses.',
    detail: 'Our pediatric team delivers attentive, warm healthcare for children from birth through adolescence. We focus on vaccinations, developmental milestones, nutrition guidance, and early detection of childhood health conditions — all in a reassuring, child-friendly environment.',
    features: ['Vaccinations & Immunization', 'Growth Monitoring', 'Child Nutrition Guidance', 'Illness & Fever Management'],
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
    title: "Obstetrics & Gynecology",
    short: "Complete women's healthcare covering pregnancy, reproductive wellness, gynecological concerns, and lifelong support.",
    detail: "Our OB/GYN specialists deliver sensitive, evidence-based care across the full spectrum of women's health. From routine gynecological checkups and menstrual health to antenatal support and reproductive wellness — every patient is treated with respect, privacy, and clinical expertise.",
    features: ["Antenatal & Prenatal Care", "Menstrual Health", "Reproductive Wellness", "Hormonal Management"],
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
    title: 'Dermatology',
    short: 'Advanced care for skin, hair, and nail conditions with personalized treatment and expert clinical guidance.',
    detail: 'Our dermatology service covers the full range of clinical and aesthetic skin conditions — from acne, eczema, and psoriasis to hair loss, fungal infections, and cosmetic skin concerns. Personalized treatment plans are built around each patient\'s unique skin profile and health goals.',
    features: ['Acne & Eczema Treatment', 'Hair Loss Management', 'Skin Allergy Care', 'Cosmetic Dermatology'],
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
    title: 'Orthopedics',
    short: 'Specialized treatment for bone, joint, muscle, and spine conditions to restore strength, mobility, and comfort.',
    detail: 'Our orthopedic specialists manage a wide range of musculoskeletal conditions — including joint pain, arthritis, back and spine problems, sports injuries, and post-surgical rehabilitation. The goal is always to restore mobility, reduce pain, and improve your quality of life.',
    features: ['Joint & Bone Pain', 'Back & Spine Care', 'Sports Injury Management', 'Post-Surgery Rehabilitation'],
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
    title: 'ENT (Otolaryngology)',
    short: 'Expert care for ear, nose, and throat conditions, including sinus issues, infections, hearing concerns, and more.',
    detail: 'Our ENT department provides expert diagnosis and treatment for a wide range of ear, nose, and throat conditions. From sinusitis, ear infections, and tonsillitis to hearing evaluations and chronic throat problems — our specialists deliver focused, evidence-based care.',
    features: ['Sinus & Nasal Conditions', 'Ear Infections & Hearing', 'Throat & Tonsil Care', 'Allergy-Related ENT'],
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
    title: 'Ophthalmology',
    short: 'Comprehensive eye care focused on vision protection, diagnosis, treatment, and long-term visual health.',
    detail: 'Our ophthalmology service covers vision assessments, refractive evaluations, and the diagnosis and management of common and complex eye conditions. We prioritize early detection, accurate treatment, and long-term visual health for patients of all ages.',
    features: ['Vision Assessment', 'Refractive Error Management', 'Eye Infection Care', 'Routine Eye Checkups'],
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
    title: 'Dentistry',
    short: 'Complete dental care ranging from routine check-ups to restorative and smile-enhancing treatments.',
    detail: 'Our dental department offers comprehensive oral healthcare — from routine cleanings, cavity treatments, and dental X-rays to restorative and cosmetic procedures. We deliver every treatment in a comfortable, professional environment focused on your dental health and confidence.',
    features: ['Routine Dental Checkups', 'Cavity & Filling Treatment', 'Teeth Cleaning', 'Restorative Dentistry'],
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
    title: 'Pathology',
    short: 'Accurate laboratory diagnostics and timely reporting to support reliable medical decisions and better patient care.',
    detail: 'Our in-house pathology lab delivers a comprehensive range of blood tests and diagnostic panels with fast turnaround times. CBC, LFT, KFT, thyroid, HbA1c, lipid profiles, diabetes panels — all processed accurately and reported efficiently to support your doctor\'s clinical decisions.',
    features: ['Blood Tests & CBC', 'Thyroid & Hormonal Panels', 'Diabetes Monitoring', 'Specialty Lab Work'],
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
    title: 'Physiotherapy',
    short: 'Personalized rehabilitation and movement therapy to reduce pain, improve mobility, and restore daily function.',
    detail: 'Our physiotherapy services are designed around your recovery goals. Whether managing post-surgical rehabilitation, sports injuries, musculoskeletal pain, or improving mobility and strength — our physiotherapists design structured, personalized programs that deliver lasting results.',
    features: ['Post-Surgery Recovery', 'Pain Relief Therapy', 'Mobility Restoration', 'Sports Injury Rehab'],
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="5" r="2"/>
        <path d="M8 22v-8l-2-4h12l-2 4v8"/>
        <path d="M8 14h8"/>
      </svg>
    ),
  },
];

/* ── Individual service card ── */
const ServiceCard = ({ svc, vis, delay }) => {
  const navigate = useNavigate();
  const [hov, setHov] = React.useState(false);

  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        background: '#fff',
        borderRadius: '20px',
        border: `1.5px solid ${hov ? svc.accent + '38' : '#edf2f7'}`,
        boxShadow: hov
          ? `0 20px 48px rgba(0,0,0,0.08), 0 0 0 1px ${svc.accent}14`
          : '0 2px 14px rgba(14,31,63,0.05)',
        transform: hov ? 'translateY(-6px)' : 'translateY(0)',
        transition: 'all 0.28s cubic-bezier(0.34,1.4,0.64,1)',
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
        height: '3px',
        background: `linear-gradient(90deg,${svc.accent},${svc.accent}55)`,
        opacity: hov ? 1 : 0.35,
        transition: 'opacity 0.26s ease',
        flexShrink: 0,
      }} />

      <div style={{ padding: '1.75rem 1.6rem', display: 'flex', flexDirection: 'column', flex: 1 }}>
        {/* Icon + tag row */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.1rem' }}>
          <div style={{
            width: 54, height: 54, borderRadius: '15px',
            background: hov ? svc.accent : svc.accentLight,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: hov ? '#fff' : svc.accent,
            transition: 'all 0.26s ease',
            boxShadow: hov ? `0 7px 20px ${svc.accent}42` : 'none',
            flexShrink: 0,
          }}>
            {svc.icon}
          </div>
          <div style={{
            background: svc.accentLight,
            color: svc.accent,
            fontSize: '0.62rem', fontWeight: 700,
            textTransform: 'uppercase', letterSpacing: '0.09em',
            padding: '0.22rem 0.65rem', borderRadius: '999px',
          }}>
            {svc.tag}
          </div>
        </div>

        {/* Title */}
        <h3 style={{
          color: '#0c1f3f', fontWeight: 800,
          fontSize: '1.05rem', lineHeight: 1.22,
          margin: '0 0 0.6rem',
        }}>
          {svc.title}
        </h3>

        {/* Short description */}
        <p style={{
          color: '#64748b', fontSize: '0.84rem',
          lineHeight: 1.68, margin: '0 0 0.9rem',
        }}>
          {svc.short}
        </p>

        {/* Divider */}
        <div style={{ height: '1px', background: '#f0f4f8', margin: '0 0 0.9rem' }} />

        {/* Detail text */}
        <p style={{
          color: '#475569', fontSize: '0.8rem',
          lineHeight: 1.72, margin: '0 0 1rem', flex: 1,
        }}>
          {svc.detail}
        </p>

        {/* Feature tags */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem', marginBottom: '1.25rem' }}>
          {svc.features.map((f, i) => (
            <span key={i} style={{
              background: svc.accentLight,
              color: svc.accent,
              fontSize: '0.67rem', fontWeight: 700,
              padding: '0.2rem 0.6rem', borderRadius: '6px',
            }}>
              {f}
            </span>
          ))}
        </div>

        {/* CTA */}
        <button
          onClick={() => { navigate('/book'); window.scrollTo(0, 0); }}
          style={{
            width: '100%',
            padding: '0.72rem 1rem',
            background: hov ? svc.accent : '#fff',
            color: hov ? '#fff' : svc.accent,
            border: `1.5px solid ${svc.accent}`,
            borderRadius: '12px',
            fontWeight: 700, fontSize: '0.85rem',
            cursor: 'pointer', fontFamily: 'inherit',
            transition: 'all 0.22s ease',
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem',
            marginTop: 'auto',
          }}
        >
          <Calendar size={14} />
          Book Consultation
        </button>
      </div>
    </div>
  );
};

/* ── Main page ── */
const Services = () => {
  const navigate = useNavigate();
  const [gridRef, vis] = useInView(0.04);
  const [infoRef, infoVis] = useInView(0.1);

  return (
    <div style={{ background: '#fff' }}>

      {/* ══════════════════════════════════════
          HERO
      ══════════════════════════════════════ */}
      <section style={{
        background: 'linear-gradient(135deg,#0c1f3f 0%,#0f3460 50%,#0369a1 100%)',
        padding: 'clamp(5rem,10vw,7rem) 0 clamp(4rem,8vw,6rem)',
        position: 'relative',
        overflow: 'hidden',
      }}>
        {/* Glow decorations */}
        <div style={{ position:'absolute',top:'-80px',right:'-80px',width:380,height:380,borderRadius:'50%',background:'radial-gradient(circle,rgba(14,165,233,0.18),transparent 65%)',pointerEvents:'none' }} />
        <div style={{ position:'absolute',bottom:'-60px',left:'-60px',width:280,height:280,borderRadius:'50%',background:'radial-gradient(circle,rgba(124,58,237,0.12),transparent 70%)',pointerEvents:'none' }} />

        {/* Medical cross decoration */}
        <div style={{ position:'absolute',top:'20%',right:'8%',width:220,height:220,opacity:0.04,pointerEvents:'none' }}>
          <svg viewBox="0 0 200 200" fill="white">
            <rect x="75" y="0" width="50" height="200" rx="8"/>
            <rect x="0" y="75" width="200" height="50" rx="8"/>
          </svg>
        </div>

        <div className="container" style={{ position:'relative',zIndex:1,textAlign:'center' }}>
          {/* Pill badge */}
          <div style={{
            display:'inline-flex',alignItems:'center',gap:'0.45rem',
            background:'rgba(255,255,255,0.12)',
            border:'1px solid rgba(255,255,255,0.2)',
            borderRadius:'999px',padding:'0.3rem 0.9rem',
            marginBottom:'1.25rem',
          }}>
            <div style={{ width:6,height:6,borderRadius:'50%',background:'#4ade80',boxShadow:'0 0 6px #4ade80' }} />
            <span style={{ fontSize:'0.7rem',fontWeight:700,color:'rgba(255,255,255,0.9)',textTransform:'uppercase',letterSpacing:'0.08em' }}>
              Clinical Specialties
            </span>
          </div>

          <h1 style={{
            color:'#fff',
            fontSize:'clamp(2rem,5vw,3.2rem)',
            fontWeight:900,lineHeight:1.12,
            margin:'0 0 1.1rem',
            letterSpacing:'-0.02em',
          }}>
            Specialized Care,{' '}
            <span style={{ color:'#67e8f9' }}>All Under One Roof</span>
          </h1>

          <p style={{
            color:'rgba(255,255,255,0.75)',
            fontSize:'clamp(0.95rem,2vw,1.1rem)',
            lineHeight:1.75,maxWidth:600,
            margin:'0 auto 2.5rem',
          }}>
            Our multi-specialty services are designed to provide accurate diagnosis, quality treatment, and patient-centered care across every stage of health and recovery — at Karan Nagar, Srinagar.
          </p>

          <div style={{ display:'flex',gap:'0.75rem',justifyContent:'center',flexWrap:'wrap' }}>
            <button
              onClick={() => { navigate('/book'); window.scrollTo(0,0); }}
              style={{
                display:'inline-flex',alignItems:'center',gap:'0.4rem',
                padding:'0.8rem 1.5rem',
                background:'#fff',color:'#0369a1',
                border:'none',borderRadius:'12px',
                fontWeight:800,fontSize:'0.9rem',
                cursor:'pointer',fontFamily:'inherit',
                boxShadow:'0 4px 20px rgba(0,0,0,0.2)',
                transition:'all 0.2s',
              }}
              onMouseEnter={e => e.currentTarget.style.transform='scale(1.04)'}
              onMouseLeave={e => e.currentTarget.style.transform='scale(1)'}
            >
              <Calendar size={16} /> Book Appointment
            </button>
            <a href={PHONE_HREF} style={{
              display:'inline-flex',alignItems:'center',gap:'0.4rem',
              padding:'0.8rem 1.4rem',
              background:'rgba(255,255,255,0.12)',
              border:'1.5px solid rgba(255,255,255,0.3)',
              borderRadius:'12px',color:'#fff',
              fontWeight:700,fontSize:'0.9rem',
              textDecoration:'none',transition:'all 0.2s',
            }}
              onMouseEnter={e => e.currentTarget.style.background='rgba(255,255,255,0.2)'}
              onMouseLeave={e => e.currentTarget.style.background='rgba(255,255,255,0.12)'}
            >
              <Phone size={16} /> {PHONE}
            </a>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          INTRO STRIP
      ══════════════════════════════════════ */}
      <section ref={infoRef} style={{
        background:'#fafbfc',
        borderBottom:'1px solid #f0f4f8',
        padding:'2.75rem 0',
      }}>
        <div className="container">
          <div style={{
            display:'grid',
            gridTemplateColumns:'repeat(auto-fit,minmax(220px,1fr))',
            gap:'1rem',
            opacity: infoVis ? 1 : 0,
            transform: infoVis ? 'none' : 'translateY(14px)',
            transition:'opacity 0.55s ease,transform 0.55s ease',
          }}>
            {[
              {
                icon: <CheckCircle size={18} color="#059669" />,
                title: '10 Medical Specialties',
                body: 'A full range of essential clinical specialties under one roof.',
              },
              {
                icon: <CheckCircle size={18} color="#059669" />,
                title: 'In-House Diagnostics',
                body: 'Lab, ECG, ECHO, and PFT — accurate results on the same day.',
              },
              {
                icon: <CheckCircle size={18} color="#059669" />,
                title: 'Patient-Centered Approach',
                body: 'Every treatment plan is tailored to your individual health needs.',
              },
              {
                icon: <CheckCircle size={18} color="#059669" />,
                title: 'Verified Specialists',
                body: 'Experienced, credentialed doctors committed to clinical excellence.',
              },
            ].map((item, i) => (
              <div key={i} style={{
                display:'flex',alignItems:'flex-start',gap:'0.75rem',
                padding:'1.1rem 1.25rem',
                background:'#fff',border:'1.5px solid #edf2f7',
                borderRadius:'16px',
              }}>
                <div style={{ marginTop:'0.08rem',flexShrink:0 }}>{item.icon}</div>
                <div>
                  <div style={{ color:'#0c1f3f',fontWeight:800,fontSize:'0.88rem',marginBottom:'0.25rem' }}>{item.title}</div>
                  <div style={{ color:'#64748b',fontSize:'0.78rem',lineHeight:1.6 }}>{item.body}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          SERVICES GRID
      ══════════════════════════════════════ */}
      <section style={{
        background:'#fff',
        padding:'5.5rem 0',
        position:'relative',overflow:'hidden',
      }}>
        {/* Subtle background texture */}
        <div style={{
          position:'absolute',inset:0,pointerEvents:'none',
          backgroundImage:'radial-gradient(circle at 85% 15%,rgba(3,105,161,0.03) 0%,transparent 55%), radial-gradient(circle at 10% 85%,rgba(5,150,105,0.025) 0%,transparent 50%)',
        }} />

        <div className="container" style={{ position:'relative',zIndex:1 }}>
          {/* Section heading */}
          <div style={{ maxWidth:620,marginBottom:'3rem' }}>
            <div style={{
              display:'inline-flex',alignItems:'center',gap:'0.45rem',
              background:'#e0f2fe',borderRadius:'999px',
              padding:'0.28rem 0.85rem',marginBottom:'0.9rem',
            }}>
              <div style={{ width:6,height:6,borderRadius:'50%',background:'#0369a1' }} />
              <span style={{ fontSize:'0.7rem',fontWeight:700,color:'#0369a1',textTransform:'uppercase',letterSpacing:'0.08em' }}>
                Our Specialties
              </span>
            </div>
            <h2 style={{
              color:'#0c1f3f',
              fontSize:'clamp(1.7rem,3.8vw,2.4rem)',
              fontWeight:800,lineHeight:1.18,
              margin:'0 0 0.75rem',
            }}>
              Comprehensive Healthcare{' '}
              <span style={{
                background:'linear-gradient(135deg,#0369a1,#0ea5e9)',
                WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent',
              }}>
                Services
              </span>
            </h2>
            <p style={{ color:'#64748b',fontSize:'0.95rem',lineHeight:1.7,margin:0 }}>
              Every specialty at Apollo Clinic is led by an experienced, credentialed physician and supported by in-house diagnostics — so your care stays coordinated, timely, and of the highest standard.
            </p>
          </div>

          {/* Card grid */}
          <div
            ref={gridRef}
            style={{
              display:'grid',
              gridTemplateColumns:'repeat(auto-fill,minmax(310px,1fr))',
              gap:'1.15rem',
            }}
          >
            {SERVICES.map((svc, i) => (
              <ServiceCard key={svc.id} svc={svc} vis={vis} delay={i * 0.05} />
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          INFO STRIP — hours / location
      ══════════════════════════════════════ */}
      <section style={{ background:'#fafbfc',borderTop:'1px solid #f0f4f8',padding:'3.5rem 0' }}>
        <div className="container">
          <div style={{
            display:'grid',
            gridTemplateColumns:'repeat(auto-fit,minmax(240px,1fr))',
            gap:'1.1rem',
          }}>
            {[
              {
                icon: <Clock size={20} color="#0369a1" />,
                label: 'Consultation Hours',
                lines: ['Mon – Sat: 12:00 PM – 7:00 PM', 'Sunday: 10:00 AM – 1:30 PM'],
              },
              {
                icon: <MapPin size={20} color="#059669" />,
                label: 'Our Location',
                lines: ['Near National School, Arham Towers', 'Karan Nagar, Srinagar, J&K'],
              },
              {
                icon: <Phone size={20} color="#7c3aed" />,
                label: 'Contact Us',
                lines: [PHONE, 'Call or WhatsApp for queries'],
              },
            ].map((item, i) => (
              <div key={i} style={{
                display:'flex',alignItems:'flex-start',gap:'0.85rem',
                padding:'1.4rem 1.35rem',
                background:'#fff',
                border:'1.5px solid #edf2f7',
                borderRadius:'18px',
                boxShadow:'0 2px 10px rgba(14,31,63,0.04)',
              }}>
                <div style={{
                  width:44,height:44,borderRadius:'13px',
                  background:'#f8fafc',border:'1px solid #edf2f7',
                  display:'flex',alignItems:'center',justifyContent:'center',
                  flexShrink:0,
                }}>
                  {item.icon}
                </div>
                <div>
                  <div style={{ color:'#0c1f3f',fontWeight:800,fontSize:'0.88rem',marginBottom:'0.35rem' }}>
                    {item.label}
                  </div>
                  {item.lines.map((l, li) => (
                    <div key={li} style={{ color:'#64748b',fontSize:'0.82rem',lineHeight:1.6 }}>{l}</div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          BOTTOM CTA BAR
      ══════════════════════════════════════ */}
      <section style={{ background:'#fff',padding:'4rem 0' }}>
        <div className="container">
          <div style={{
            background:'linear-gradient(135deg,#0c1f3f 0%,#0369a1 60%,#0ea5e9 100%)',
            borderRadius:'22px',
            padding:'clamp(2rem,4vw,2.75rem) clamp(1.5rem,4vw,3rem)',
            position:'relative',overflow:'hidden',
            display:'flex',alignItems:'center',justifyContent:'space-between',
            gap:'1.5rem',flexWrap:'wrap',
          }}>
            {/* Glow decoration */}
            <div style={{ position:'absolute',top:'-60px',right:'-60px',width:240,height:240,borderRadius:'50%',background:'radial-gradient(circle,rgba(255,255,255,0.08),transparent 65%)',pointerEvents:'none' }} />

            <div style={{ zIndex:1 }}>
              <div style={{ color:'#bae6fd',fontSize:'0.72rem',fontWeight:700,textTransform:'uppercase',letterSpacing:'0.08em',marginBottom:'0.4rem' }}>
                Apollo Clinic Srinagar
              </div>
              <h2 style={{ color:'#fff',fontWeight:800,fontSize:'clamp(1.1rem,3vw,1.6rem)',lineHeight:1.2,margin:'0 0 0.5rem' }}>
                Need help choosing the right specialty?
              </h2>
              <p style={{ color:'rgba(255,255,255,0.7)',fontSize:'0.9rem',margin:0,lineHeight:1.65 }}>
                Book a consultation with our team and we'll guide you to the right department — conveniently, professionally, and with no waiting.
              </p>
            </div>

            <div style={{ display:'flex',gap:'0.75rem',flexWrap:'wrap',zIndex:1 }}>
              <button
                onClick={() => { navigate('/book'); window.scrollTo(0,0); }}
                style={{
                  display:'inline-flex',alignItems:'center',gap:'0.4rem',
                  padding:'0.8rem 1.5rem',
                  background:'#fff',color:'#0369a1',
                  border:'none',borderRadius:'12px',
                  fontWeight:800,fontSize:'0.9rem',
                  cursor:'pointer',fontFamily:'inherit',
                  boxShadow:'0 4px 18px rgba(0,0,0,0.15)',
                  transition:'all 0.2s',
                }}
                onMouseEnter={e => e.currentTarget.style.transform='scale(1.04)'}
                onMouseLeave={e => e.currentTarget.style.transform='scale(1)'}
              >
                <Calendar size={15} /> Book Appointment
              </button>
              <a href={PHONE_HREF} style={{
                display:'inline-flex',alignItems:'center',gap:'0.4rem',
                padding:'0.8rem 1.3rem',
                background:'rgba(255,255,255,0.12)',
                border:'1.5px solid rgba(255,255,255,0.3)',
                borderRadius:'12px',color:'#fff',
                fontWeight:700,fontSize:'0.88rem',
                textDecoration:'none',transition:'all 0.2s',
              }}
                onMouseEnter={e => e.currentTarget.style.background='rgba(255,255,255,0.2)'}
                onMouseLeave={e => e.currentTarget.style.background='rgba(255,255,255,0.12)'}
              >
                <Phone size={14} /> {PHONE}
              </a>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Services;
