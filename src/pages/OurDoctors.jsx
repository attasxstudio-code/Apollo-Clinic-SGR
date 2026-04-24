import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Phone, Calendar, CheckCircle, Clock, MapPin, ArrowRight } from 'lucide-react';

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

/* ── Doctor data — mirrors homepage DoctorCard with extended bios ── */
const DOCTORS = [
  {
    initials: 'SA', color: '#0369a1', accentLight: '#e0f2fe',
    name: 'Dr. Shabir Ahmad Mir',
    dept: 'General Physician',
    specialty: 'General Medicine & Internal Care',
    qual: 'MBBS, MD — Internal Medicine',
    exp: '12+ Years',
    days: 'Mon – Sat',
    bio: 'A highly experienced and patient-focused general physician committed to delivering attentive, evidence-based primary care with professionalism and compassion.',
    detail: 'Dr. Shabir Ahmad Mir leads primary care at Apollo Clinic with over a decade of clinical experience. His approach combines thorough diagnosis with a warm, patient-centered style — ensuring every patient feels heard, fully examined, and clearly guided toward their best health outcomes.',
    focus: ['Chronic Disease Management', 'Preventive Screenings', 'Wellness Checkups', 'Fever & Infection Care'],
  },
  {
    initials: 'NR', color: '#db2777', accentLight: '#fce7f3',
    name: 'Dr. Nazia Rashid',
    dept: 'Dermatology',
    specialty: 'Skin, Hair & Nail Care',
    qual: 'MBBS, MD — Dermatology',
    exp: '9+ Years',
    days: 'Mon – Sat',
    bio: 'A specialist in clinical and cosmetic dermatology, offering personalized treatment protocols for skin, hair, and nail conditions with a gentle and thorough approach.',
    detail: 'Dr. Nazia Rashid brings specialized expertise in both clinical and aesthetic dermatology. She offers personalized care for a wide range of skin concerns — from acne, eczema, and psoriasis to hair loss and cosmetic interventions — with careful attention to each patient\'s unique skin profile.',
    focus: ['Acne & Eczema Treatment', 'Hair Loss Management', 'Cosmetic Dermatology', 'Skin Allergy Care'],
  },
  {
    initials: 'AH', color: '#0891b2', accentLight: '#e0f7fa',
    name: 'Dr. Aijaz Hussain',
    dept: 'Pediatrics',
    specialty: 'Child Health & Development',
    qual: 'MBBS, DCH, MD — Paediatrics',
    exp: '10+ Years',
    days: 'Mon – Fri',
    bio: 'Dedicated to providing expert child healthcare from infancy through adolescence, with a warm and reassuring approach to diagnosis, immunization, and wellness.',
    detail: 'Dr. Aijaz Hussain is committed to supporting the health and development of children at every stage. His practice combines expert clinical diagnosis with a nurturing approach that puts young patients and their families at ease — from routine vaccinations to complex childhood illness management.',
    focus: ['Vaccinations & Immunization', 'Growth & Development Monitoring', 'Child Nutrition Guidance', 'Pediatric Illness Care'],
  },
  {
    initials: 'SB', color: '#7c3aed', accentLight: '#ede9fe',
    name: 'Dr. Saima Bano',
    dept: 'Obstetrics & Gynecology',
    specialty: "Women's Health & Reproductive Care",
    qual: 'MBBS, DGO, MS — Obs & Gynaecology',
    exp: '11+ Years',
    days: 'Mon – Sat',
    bio: "Committed to delivering comprehensive, sensitive, and evidence-based care across all stages of women's health — from reproductive wellness to antenatal and postnatal support.",
    detail: "Dr. Saima Bano provides thoughtful, private, and comprehensive women's healthcare. Her clinical practice spans antenatal care, gynecological evaluation, menstrual health management, and hormonal disorders — always delivered with sensitivity, clarity, and evidence-based clinical judgment.",
    focus: ['Antenatal & Prenatal Care', 'Menstrual Health Management', 'Reproductive Wellness', 'Hormonal Disorder Care'],
  },
  {
    initials: 'MA', color: '#047857', accentLight: '#d1fae5',
    name: 'Dr. Mushtaq Ahmed',
    dept: 'Orthopedics',
    specialty: 'Bone, Joint & Spine Health',
    qual: 'MBBS, MS — Orthopaedics',
    exp: '14+ Years',
    days: 'Tue, Thu & Sat',
    bio: 'An experienced orthopedic specialist focused on restoring movement and quality of life through precise diagnosis, conservative management, and surgical excellence.',
    detail: 'With 14+ years of orthopedic practice, Dr. Mushtaq Ahmed is a trusted specialist for bone, joint, and spine conditions. He brings precision to every diagnosis and tailors treatment — whether conservative management or post-surgical rehabilitation — with a strong focus on restoring full function and quality of life.',
    focus: ['Joint & Bone Pain', 'Back & Spine Conditions', 'Sports Injury Management', 'Post-Surgical Rehabilitation'],
  },
  {
    initials: 'AY', color: '#b45309', accentLight: '#fef3c7',
    name: 'Dr. Asma Yousuf',
    dept: 'Clinical Psychology',
    specialty: 'Mental Health & Wellness',
    qual: 'M.Phil — Clinical Psychology',
    exp: '8+ Years',
    days: 'Mon, Wed & Fri',
    bio: "A compassionate mental health professional providing structured psychological support, counselling, and therapeutic interventions tailored to each patient's unique needs.",
    detail: "Dr. Asma Yousuf offers structured, evidence-based psychological care in a confidential and supportive environment. Her sessions are tailored to individual needs — addressing anxiety, depression, emotional difficulties, and life stress — with therapeutic interventions that foster lasting mental resilience.",
    focus: ['Anxiety & Depression Support', 'Individual Counselling', 'Cognitive Behavioural Therapy', 'Stress & Burnout Management'],
  },
];

/* ── Doctor card ── */
const DoctorCard = ({ doc, vis, delay, onBook }) => {
  const [hov, setHov] = React.useState(false);

  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        background: '#fff',
        borderRadius: '22px',
        border: `1.5px solid ${hov ? doc.color + '38' : '#edf2f7'}`,
        boxShadow: hov
          ? `0 22px 52px rgba(0,0,0,0.09), 0 0 0 1px ${doc.color}12`
          : '0 2px 16px rgba(14,31,63,0.05)',
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
        background: `linear-gradient(90deg,${doc.color},${doc.color}55)`,
        opacity: hov ? 1 : 0.35,
        transition: 'opacity 0.26s ease',
        flexShrink: 0,
      }} />

      {/* Card body */}
      <div style={{ padding: '1.85rem 1.7rem', display: 'flex', flexDirection: 'column', flex: 1 }}>

        {/* Avatar + name block */}
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem', marginBottom: '1.25rem' }}>
          {/* Avatar */}
          <div style={{
            width: 66, height: 66, borderRadius: '18px',
            background: hov ? doc.color : doc.accentLight,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: hov ? '#fff' : doc.color,
            fontWeight: 900, fontSize: '1.3rem', letterSpacing: '-0.02em',
            flexShrink: 0,
            transition: 'all 0.26s ease',
            boxShadow: hov ? `0 8px 24px ${doc.color}42` : 'none',
          }}>
            {doc.initials}
          </div>

          <div style={{ flex: 1, minWidth: 0 }}>
            {/* Dept badge */}
            <div style={{
              display: 'inline-block',
              background: doc.accentLight,
              color: doc.color,
              fontSize: '0.62rem', fontWeight: 700,
              textTransform: 'uppercase', letterSpacing: '0.09em',
              padding: '0.2rem 0.65rem', borderRadius: '999px',
              marginBottom: '0.4rem',
            }}>
              {doc.dept}
            </div>
            <h3 style={{
              color: '#0c1f3f', fontWeight: 800,
              fontSize: '1.02rem', lineHeight: 1.2,
              margin: '0 0 0.2rem',
            }}>
              {doc.name}
            </h3>
            <p style={{
              color: doc.color, fontWeight: 600,
              fontSize: '0.78rem', margin: 0, lineHeight: 1.3,
            }}>
              {doc.specialty}
            </p>
          </div>
        </div>

        {/* Divider */}
        <div style={{ height: '1px', background: '#f0f4f8', marginBottom: '1rem' }} />

        {/* Short bio */}
        <p style={{ color: '#64748b', fontSize: '0.84rem', lineHeight: 1.7, margin: '0 0 0.75rem' }}>
          {doc.bio}
        </p>

        {/* Expanded detail */}
        <p style={{ color: '#475569', fontSize: '0.79rem', lineHeight: 1.72, margin: '0 0 1rem', flex: 1 }}>
          {doc.detail}
        </p>

        {/* Qual line */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.9rem' }}>
          <CheckCircle size={13} color={doc.color} style={{ flexShrink: 0 }} />
          <span style={{ color: '#475569', fontSize: '0.78rem', fontWeight: 600 }}>
            {doc.qual}
          </span>
        </div>

        {/* Focus areas */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem', marginBottom: '1rem' }}>
          {doc.focus.map((f, i) => (
            <span key={i} style={{
              background: doc.accentLight, color: doc.color,
              fontSize: '0.67rem', fontWeight: 700,
              padding: '0.2rem 0.6rem', borderRadius: '6px',
            }}>
              {f}
            </span>
          ))}
        </div>

        {/* Availability tags */}
        <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap', marginBottom: '1.25rem' }}>
          <span style={{
            display: 'flex', alignItems: 'center', gap: '0.3rem',
            background: '#f8fafc', color: '#64748b',
            border: '1px solid #e2e8f0',
            fontSize: '0.68rem', fontWeight: 600,
            padding: '0.22rem 0.65rem', borderRadius: '6px',
          }}>
            <Clock size={10} /> {doc.days}
          </span>
          <span style={{
            background: '#f0fdf4', color: '#047857',
            border: '1px solid #bbf7d0',
            fontSize: '0.68rem', fontWeight: 600,
            padding: '0.22rem 0.65rem', borderRadius: '6px',
          }}>
            Karan Nagar
          </span>
        </div>

        {/* CTA */}
        <button
          onClick={onBook}
          style={{
            width: '100%',
            padding: '0.75rem 1rem',
            background: hov ? doc.color : '#fff',
            color: hov ? '#fff' : doc.color,
            border: `1.5px solid ${doc.color}`,
            borderRadius: '13px',
            fontWeight: 700, fontSize: '0.87rem',
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
const OurDoctors = () => {
  const navigate    = useNavigate();
  const [gridRef, vis]  = useInView(0.04);
  const [infoRef, infoVis] = useInView(0.1);

  const goBook = () => { navigate('/book'); window.scrollTo(0, 0); };

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
        <div style={{ position:'absolute',top:'-80px',right:'-80px',width:360,height:360,borderRadius:'50%',background:'radial-gradient(circle,rgba(14,165,233,0.18),transparent 65%)',pointerEvents:'none' }} />
        <div style={{ position:'absolute',bottom:'-60px',left:'-60px',width:260,height:260,borderRadius:'50%',background:'radial-gradient(circle,rgba(124,58,237,0.12),transparent 70%)',pointerEvents:'none' }} />
        {/* Cross decoration */}
        <div style={{ position:'absolute',top:'15%',right:'7%',width:200,height:200,opacity:0.04,pointerEvents:'none' }}>
          <svg viewBox="0 0 200 200" fill="white">
            <rect x="75" y="0" width="50" height="200" rx="8"/>
            <rect x="0" y="75" width="200" height="50" rx="8"/>
          </svg>
        </div>

        <div className="container" style={{ position:'relative',zIndex:1,textAlign:'center' }}>
          <div style={{
            display:'inline-flex',alignItems:'center',gap:'0.45rem',
            background:'rgba(255,255,255,0.12)',
            border:'1px solid rgba(255,255,255,0.2)',
            borderRadius:'999px',padding:'0.3rem 0.9rem',marginBottom:'1.25rem',
          }}>
            <div style={{ width:6,height:6,borderRadius:'50%',background:'#4ade80',boxShadow:'0 0 6px #4ade80' }} />
            <span style={{ fontSize:'0.7rem',fontWeight:700,color:'rgba(255,255,255,0.9)',textTransform:'uppercase',letterSpacing:'0.08em' }}>
              Medical Team
            </span>
          </div>

          <h1 style={{
            color:'#fff',
            fontSize:'clamp(2rem,5vw,3.2rem)',
            fontWeight:900,lineHeight:1.12,
            margin:'0 0 1.1rem',
            letterSpacing:'-0.02em',
          }}>
            Experienced Doctors,{' '}
            <span style={{ color:'#67e8f9' }}>Personalized Care</span>
          </h1>

          <p style={{
            color:'rgba(255,255,255,0.75)',
            fontSize:'clamp(0.95rem,2vw,1.1rem)',
            lineHeight:1.75,maxWidth:600,
            margin:'0 auto 2.5rem',
          }}>
            Apollo Clinic Srinagar brings together qualified, credentialed specialists across multiple disciplines — so you receive the right care, from the right expert, all under one roof at Karan Nagar.
          </p>

          <div style={{ display:'flex',gap:'0.75rem',justifyContent:'center',flexWrap:'wrap' }}>
            <button onClick={goBook} style={{
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
          TRUST INTRO STRIP
      ══════════════════════════════════════ */}
      <section ref={infoRef} style={{
        background: '#fafbfc',
        borderBottom: '1px solid #f0f4f8',
        padding: '2.75rem 0',
      }}>
        <div className="container">
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit,minmax(220px,1fr))',
            gap: '1rem',
            opacity: infoVis ? 1 : 0,
            transform: infoVis ? 'none' : 'translateY(14px)',
            transition: 'opacity 0.55s ease,transform 0.55s ease',
          }}>
            {[
              { icon: <CheckCircle size={18} color="#059669" />, title: '6 Experienced Specialists', body: 'Verified, credentialed doctors across essential clinical disciplines.' },
              { icon: <CheckCircle size={18} color="#059669" />, title: 'Multi-Specialty Coverage', body: 'From primary care to orthopedics, gynecology, dermatology, and more.' },
              { icon: <CheckCircle size={18} color="#059669" />, title: 'Patient-First Practice', body: 'Every consultation, follow-up, and treatment plan is centered on you.' },
              { icon: <CheckCircle size={18} color="#059669" />, title: 'All at Karan Nagar', body: 'Coordinated expert care, conveniently available in one location.' },
            ].map((item, i) => (
              <div key={i} style={{
                display: 'flex', alignItems: 'flex-start', gap: '0.75rem',
                padding: '1.1rem 1.25rem',
                background: '#fff',
                border: '1.5px solid #edf2f7',
                borderRadius: '16px',
              }}>
                <div style={{ marginTop: '0.08rem', flexShrink: 0 }}>{item.icon}</div>
                <div>
                  <div style={{ color: '#0c1f3f', fontWeight: 800, fontSize: '0.88rem', marginBottom: '0.25rem' }}>{item.title}</div>
                  <div style={{ color: '#64748b', fontSize: '0.78rem', lineHeight: 1.6 }}>{item.body}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          DOCTORS GRID
      ══════════════════════════════════════ */}
      <section style={{
        background: '#fafbfc',
        padding: '5.5rem 0',
        position: 'relative', overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          backgroundImage: 'radial-gradient(circle at 15% 50%,rgba(3,105,161,0.03) 0%,transparent 55%), radial-gradient(circle at 85% 20%,rgba(124,58,237,0.025) 0%,transparent 50%)',
        }} />

        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          {/* Section heading */}
          <div style={{ maxWidth: 620, marginBottom: '3rem' }}>
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: '0.45rem',
              background: '#e0f2fe', borderRadius: '999px',
              padding: '0.28rem 0.85rem', marginBottom: '0.9rem',
            }}>
              <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#0369a1' }} />
              <span style={{ fontSize: '0.7rem', fontWeight: 700, color: '#0369a1', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                Our Specialists
              </span>
            </div>
            <h2 style={{
              color: '#0c1f3f',
              fontSize: 'clamp(1.7rem,3.8vw,2.4rem)',
              fontWeight: 800, lineHeight: 1.18,
              margin: '0 0 0.75rem',
            }}>
              Meet Our{' '}
              <span style={{
                background: 'linear-gradient(135deg,#0369a1,#0ea5e9)',
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
              }}>
                Expert Doctors
              </span>
            </h2>
            <p style={{ color: '#64748b', fontSize: '0.95rem', lineHeight: 1.7, margin: 0 }}>
              Our team of qualified specialists is committed to delivering compassionate, evidence-based care across every stage of treatment — with clinical precision and a patient-first approach.
            </p>
          </div>

          {/* Doctor grid */}
          <div ref={gridRef} style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill,minmax(310px,1fr))',
            gap: '1.15rem',
          }}>
            {DOCTORS.map((doc, i) => (
              <DoctorCard key={i} doc={doc} vis={vis} delay={i * 0.07} onBook={goBook} />
            ))}
          </div>

          {/* Trust footer strip */}
          <div style={{
            marginTop: '2.5rem',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            gap: '1.5rem', flexWrap: 'wrap',
            padding: '1.25rem',
            background: '#fff',
            border: '1.5px solid #e2e8f0',
            borderRadius: '16px',
          }}>
            {[
              { icon: <CheckCircle size={15} color="#059669" />, text: 'Verified & Credentialed Specialists' },
              { icon: <CheckCircle size={15} color="#059669" />, text: 'Patient-Centered Practice' },
              { icon: <CheckCircle size={15} color="#059669" />, text: 'Consulting at Karan Nagar, Srinagar' },
            ].map((item, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                {item.icon}
                <span style={{ color: '#475569', fontSize: '0.82rem', fontWeight: 600 }}>{item.text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          INFO STRIP
      ══════════════════════════════════════ */}
      <section style={{ background: '#fff', borderTop: '1px solid #f0f4f8', padding: '3.5rem 0' }}>
        <div className="container">
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit,minmax(240px,1fr))',
            gap: '1.1rem',
          }}>
            {[
              { icon: <Clock size={20} color="#0369a1" />, label: 'Consultation Hours', lines: ['Mon – Sat: 12:00 PM – 7:00 PM', 'Sunday: 10:00 AM – 1:30 PM'] },
              { icon: <MapPin size={20} color="#059669" />, label: 'Our Location', lines: ['Near National School, Arham Towers', 'Karan Nagar, Srinagar, J&K'] },
              { icon: <Phone size={20} color="#7c3aed" />, label: 'Contact Us', lines: [PHONE, 'Call or WhatsApp for queries'] },
            ].map((item, i) => (
              <div key={i} style={{
                display: 'flex', alignItems: 'flex-start', gap: '0.85rem',
                padding: '1.4rem 1.35rem',
                background: '#fafbfc',
                border: '1.5px solid #edf2f7',
                borderRadius: '18px',
                boxShadow: '0 2px 10px rgba(14,31,63,0.04)',
              }}>
                <div style={{
                  width: 44, height: 44, borderRadius: '13px',
                  background: '#fff', border: '1px solid #edf2f7',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  flexShrink: 0,
                }}>
                  {item.icon}
                </div>
                <div>
                  <div style={{ color: '#0c1f3f', fontWeight: 800, fontSize: '0.88rem', marginBottom: '0.35rem' }}>{item.label}</div>
                  {item.lines.map((l, li) => (
                    <div key={li} style={{ color: '#64748b', fontSize: '0.82rem', lineHeight: 1.6 }}>{l}</div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          BOTTOM CTA
      ══════════════════════════════════════ */}
      <section style={{ background: '#fafbfc', padding: '4rem 0' }}>
        <div className="container">
          <div style={{
            background: 'linear-gradient(135deg,#0c1f3f 0%,#0369a1 60%,#0ea5e9 100%)',
            borderRadius: '22px',
            padding: 'clamp(2rem,4vw,2.75rem) clamp(1.5rem,4vw,3rem)',
            position: 'relative', overflow: 'hidden',
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            gap: '1.5rem', flexWrap: 'wrap',
          }}>
            <div style={{ position:'absolute',top:'-60px',right:'-60px',width:240,height:240,borderRadius:'50%',background:'radial-gradient(circle,rgba(255,255,255,0.08),transparent 65%)',pointerEvents:'none' }} />
            <div style={{ zIndex: 1 }}>
              <div style={{ color:'#bae6fd',fontSize:'0.72rem',fontWeight:700,textTransform:'uppercase',letterSpacing:'0.08em',marginBottom:'0.4rem' }}>
                Apollo Clinic Srinagar
              </div>
              <h2 style={{ color:'#fff',fontWeight:800,fontSize:'clamp(1.1rem,3vw,1.6rem)',lineHeight:1.2,margin:'0 0 0.5rem' }}>
                Ready to see one of our specialists?
              </h2>
              <p style={{ color:'rgba(255,255,255,0.7)',fontSize:'0.9rem',margin:0,lineHeight:1.65 }}>
                Book a consultation today. Walk in or schedule ahead — Mon–Sat at Karan Nagar, Srinagar.
              </p>
            </div>
            <div style={{ display:'flex',gap:'0.75rem',flexWrap:'wrap',zIndex:1 }}>
              <button onClick={goBook} style={{
                display:'inline-flex',alignItems:'center',gap:'0.4rem',
                padding:'0.8rem 1.5rem',
                background:'#fff',color:'#0369a1',
                border:'none',borderRadius:'12px',
                fontWeight:800,fontSize:'0.9rem',
                cursor:'pointer',fontFamily:'inherit',
                boxShadow:'0 4px 18px rgba(0,0,0,0.15)',transition:'all 0.2s',
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

export default OurDoctors;
