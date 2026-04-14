import React from 'react';
import { User, Leaf, MapPin, ArrowRight, HeartPulse, Activity, CheckCircle } from 'lucide-react';
import BookingForm from '../components/BookingForm';

/* ─── scroll helper ─── */
const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

/* ════════════════════════════════════════════
   HOME PAGE
════════════════════════════════════════════ */
const Home = () => (
  <div>
    <HeroSection />
    <HomecareServices />
    <DoctorsSection />
    <BookingSection />
  </div>
);

/* ─── Hero ─── */
const HeroSection = () => {
  const [hov, setHov] = React.useState(null);

  return (
    <section id="home" style={{
      position: 'relative', overflow: 'hidden',
      background: 'linear-gradient(160deg,#f0f9ff 0%,#e0f2fe 40%,#ecfdf5 100%)',
      minHeight: '88vh', display: 'flex', alignItems: 'center',
      padding: '5rem 0',
    }}>
      {/* Background blobs */}
      <div style={{ position:'absolute', top:'-120px', right:'-100px', width:'520px', height:'520px', borderRadius:'50%',
        background:'radial-gradient(circle,rgba(14,165,233,0.13) 0%,transparent 70%)', pointerEvents:'none' }} />
      <div style={{ position:'absolute', bottom:'-80px', left:'-80px', width:'400px', height:'400px', borderRadius:'50%',
        background:'radial-gradient(circle,rgba(16,185,129,0.12) 0%,transparent 70%)', pointerEvents:'none' }} />

      <div className="container" style={{ position:'relative', zIndex:1,
        display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(320px,1fr))', gap:'4rem', alignItems:'center' }}>

        {/* Text */}
        <div className="animate-fade-in">
          <span className="pill" style={{ marginBottom:'1.25rem', display:'inline-block' }}>
            🏥 Homecare Services · Barzulla, Srinagar
          </span>
          <h1 style={{ color:'#0c4a6e', marginBottom:'1.25rem', lineHeight:1.15 }}>
            Hospital-Grade Care,<br />
            <span style={{ background:'linear-gradient(135deg,#0ea5e9,#10b981)',
              WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent' }}>
              In Your Home
            </span>
          </h1>
          <p style={{ fontSize:'1.15rem', color:'#475569', lineHeight:1.75, marginBottom:'2rem', maxWidth:'480px' }}>
            Certified nursing staff, IV therapy, physiotherapy, and 12+ homecare services —
            delivered with compassion, right at your doorstep.
          </p>

          {/* Trust badges */}
          <div style={{ display:'flex', gap:'1rem', flexWrap:'wrap', marginBottom:'2rem' }}>
            {['✅ Certified Staff', '🕐 Available 24/7', '🏥 Clinical Standards'].map((badge, i) => (
              <span key={i} style={{
                background:'rgba(14,165,233,0.1)', color:'#0369a1',
                padding:'0.35rem 0.9rem', borderRadius:'20px',
                fontSize:'0.82rem', fontWeight:600, border:'1px solid rgba(14,165,233,0.2)',
              }}>{badge}</span>
            ))}
          </div>

          <div style={{ display:'flex', gap:'1rem', flexWrap:'wrap' }}>
            <button className="btn btn-primary"
              style={{ padding:'0.9rem 2rem', fontSize:'1rem' }}
              onClick={() => scrollTo('booking')}
              onMouseEnter={() => setHov('book')}
              onMouseLeave={() => setHov(null)}>
              Book Appointment
              <ArrowRight size={16} style={{ marginLeft:6, transform: hov==='book' ? 'translateX(4px)':'none', transition:'transform 0.2s' }} />
            </button>
            <button className="btn btn-outline"
              style={{ padding:'0.9rem 2rem', fontSize:'1rem' }}
              onClick={() => scrollTo('services')}>
              View Services
            </button>
          </div>
        </div>

        {/* Visual card */}
        <div className="animate-fade-in" style={{ display:'flex', justifyContent:'center' }}>
          <div style={{
            background:'linear-gradient(135deg,#0369a1 0%,#0ea5e9 50%,#059669 100%)',
            borderRadius:'28px', padding:'2.5rem',
            boxShadow:'0 24px 60px rgba(3,105,161,0.3)',
            width:'100%', maxWidth:'380px',
            position:'relative', overflow:'hidden',
          }}>
            <div style={{ position:'absolute', top:'-40px', right:'-40px', width:'180px', height:'180px', borderRadius:'50%',
              background:'rgba(255,255,255,0.08)', pointerEvents:'none' }} />
            <div style={{ fontSize:'3.5rem', marginBottom:'1rem' }}>🏠</div>
            <h3 style={{ color:'#fff', fontWeight:800, fontSize:'1.35rem', marginBottom:'0.75rem' }}>
              HomeHeal Clinic
            </h3>
            <p style={{ color:'rgba(255,255,255,0.82)', fontSize:'0.9rem', lineHeight:1.65, marginBottom:'1.5rem' }}>
              Professional medical care delivered to your doorstep by our certified team.
            </p>
            {[
              '🩺 Nursing Care & IV Therapy',
              '🤸 Physiotherapy',
              '🚑 Ambulance Services',
              '📊 Vitals Monitoring',
            ].map((item, i) => (
              <div key={i} style={{ display:'flex', alignItems:'center', gap:'0.6rem',
                padding:'0.55rem 0.85rem', borderRadius:'10px',
                background:'rgba(255,255,255,0.12)', marginBottom:'0.5rem',
                backdropFilter:'blur(4px)',
              }}>
                <span style={{ fontSize:'0.88rem', color:'rgba(255,255,255,0.9)', fontWeight:500 }}>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

/* ─── Homecare Services ─── */
const SERVICES = [
  { icon: '🩺', title: 'Nursing Care',                                              desc: 'Expert nursing professionals providing round-the-clock care at home.' },
  { icon: '💉', title: 'Central & Long IV Care',                                    desc: 'Safe central line and long-line IV therapy by trained nursing staff.' },
  { icon: '🔧', title: "Ryle's Tube Insertion / Removal",                           desc: 'Professional nasogastric tube insertion and removal with patient comfort.' },
  { icon: '🧪', title: 'IV Fluids, Medications & Administration',                   desc: 'Precise IV fluid therapy and medication administration at home.' },
  { icon: '🫁', title: 'Tracheostomy Tube Change & Care',                           desc: 'Hygienic tracheostomy management ensuring airway safety and comfort.' },
  { icon: '🩹', title: 'Urine Catheterization, Wound Care & Dressing',             desc: 'Sterile catheterization, wound irrigation, and professional dressings.' },
  { icon: '🦶', title: 'Diabetic Foot Care / Dressing',                            desc: 'Specialised diabetic foot assessment and evidence-based wound dressing.' },
  { icon: '🩸', title: 'IV Cannulation',                                            desc: 'Skilled peripheral IV access with minimal patient discomfort.' },
  { icon: '📊', title: 'Hemodynamic / Vital Parameters Monitoring',                desc: 'Continuous monitoring of BP, SpO₂, heart rate and temperature.' },
  { icon: '🏥', title: 'Post-Operative Care & Blood Sample Extraction',            desc: 'Expert post-op recovery support and safe home blood sample collection.' },
  { icon: '🤸', title: 'Physiotherapy (Limbs, Respiratory & Neuro Critical Care)', desc: 'Tailored physio for mobility, breathing recovery, and neuro rehab.' },
  { icon: '🚑', title: 'Ambulance Patient Transportation (All Over India)',         desc: 'Equipped ambulance services with trained medical staff across India.' },
];

const HomecareServices = () => {
  const [hovered, setHovered] = React.useState(null);
  const [visible, setVisible] = React.useState({});
  const refs = React.useRef([]);

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach(e => {
        if (e.isIntersecting) setVisible(p => ({ ...p, [e.target.dataset.index]: true }));
      }),
      { threshold: 0.1 }
    );
    refs.current.forEach(el => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section id="services" style={{
      position:'relative', overflow:'hidden',
      background:'linear-gradient(180deg,#f0f9ff 0%,#f8fafc 55%,#ecfdf5 100%)',
      padding:'5.5rem 0',
    }}>
      <div style={{ position:'absolute', top:'-130px', right:'-130px', width:'520px', height:'520px', borderRadius:'50%',
        background:'radial-gradient(circle,rgba(14,165,233,0.09) 0%,transparent 70%)', pointerEvents:'none' }} />
      <div style={{ position:'absolute', bottom:'-90px', left:'-90px', width:'420px', height:'420px', borderRadius:'50%',
        background:'radial-gradient(circle,rgba(16,185,129,0.09) 0%,transparent 70%)', pointerEvents:'none' }} />

      <div className="container" style={{ position:'relative', zIndex:1 }}>
        {/* Header */}
        <div className="text-center" style={{ marginBottom:'3.5rem' }}>
          <span className="pill" style={{ marginBottom:'1rem', display:'inline-block' }}>🏠 Homecare Services</span>
          <h2 style={{ color:'#0c4a6e', margin:'0 0 1rem' }}>Wellness At Home</h2>
          <p style={{ maxWidth:'640px', margin:'0 auto', color:'#475569', fontSize:'1.05rem', lineHeight:1.68 }}>
            Professional medical care delivered with compassion — right at your doorstep.
            Our certified team brings hospital-grade services to the comfort of your home.
          </p>
        </div>

        {/* Grid */}
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(255px,1fr))', gap:'1.2rem', marginBottom:'3.5rem' }}>
          {SERVICES.map((svc, i) => {
            const isVis = !!visible[i];
            const isHov = hovered === i;
            return (
              <div key={i} data-index={i} ref={el => { refs.current[i] = el; }}
                onMouseEnter={() => setHovered(i)} onMouseLeave={() => setHovered(null)}
                style={{
                  position:'relative', borderRadius:'16px', padding:'1.4rem',
                  border:`1.5px solid ${isHov ? '#0ea5e9' : '#e4f0fb'}`,
                  background: isHov ? 'linear-gradient(140deg,#f0f9ff,#ecfdf5)' : '#fff',
                  opacity: isVis ? 1 : 0,
                  transform: isVis ? (isHov ? 'translateY(-7px) scale(1.02)' : 'translateY(0)') : 'translateY(30px)',
                  transition: `opacity 0.55s ease ${i * 0.055}s, transform 0.32s ease, box-shadow 0.32s, border-color 0.28s, background 0.28s`,
                  boxShadow: isHov ? '0 18px 44px rgba(14,165,233,0.18)' : '0 2px 12px rgba(0,0,0,0.05)',
                }}>
                <div style={{
                  width:50, height:50, borderRadius:'13px', display:'flex', alignItems:'center', justifyContent:'center',
                  background: isHov ? 'linear-gradient(135deg,#0ea5e9,#10b981)' : 'linear-gradient(135deg,#e0f2fe,#d1fae5)',
                  transform: isHov ? 'rotate(-5deg) scale(1.12)' : 'rotate(0) scale(1)',
                  transition:'all 0.3s ease',
                }}>
                  <span style={{ fontSize:'1.55rem', lineHeight:1 }}>{svc.icon}</span>
                </div>
                <div style={{
                  position:'absolute', top:'1rem', right:'1rem', width:22, height:22, borderRadius:'50%',
                  background: isHov ? '#10b981' : '#e2e8f0',
                  display:'flex', alignItems:'center', justifyContent:'center', transition:'background 0.28s',
                }}>
                  <svg width="11" height="11" viewBox="0 0 10 10" fill="none">
                    <path d="M2 5l2.5 2.5L8 3" stroke="#fff" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <h3 style={{ fontSize:'0.92rem', fontWeight:700, lineHeight:1.4, color: isHov ? '#0c4a6e' : '#1e293b',
                  margin:'0.95rem 0 0.4rem', transition:'color 0.28s' }}>{svc.title}</h3>
                <p style={{ fontSize:'0.79rem', color:'#64748b', lineHeight:1.6, margin:0 }}>{svc.desc}</p>
              </div>
            );
          })}
        </div>

        {/* CTA */}
        <div style={{
          background:'linear-gradient(135deg,#0369a1 0%,#0ea5e9 50%,#059669 100%)',
          borderRadius:'20px', padding:'2.5rem',
          display:'flex', alignItems:'center', justifyContent:'space-between', gap:'2rem', flexWrap:'wrap',
          boxShadow:'0 22px 55px rgba(3,105,161,0.28)',
        }}>
          <div style={{ flex:1, minWidth:250 }}>
            <div style={{ fontSize:'2.2rem', marginBottom:'0.4rem' }}>📞</div>
            <h3 style={{ margin:'0 0 0.25rem', color:'#fff', fontSize:'1.45rem', fontWeight:800 }}>Need Homecare Now?</h3>
            <p style={{ margin:0, color:'rgba(255,255,255,0.82)', fontSize:'0.9rem' }}>Available 24/7 · Trained Professionals · All Over India</p>
            <div style={{ marginTop:'0.85rem', display:'flex', gap:'0.75rem', flexWrap:'wrap' }}>
              {['+91 7006159475', '+91 6006271727'].map(num => (
                <a key={num} href={`tel:${num.replace(/\s/g,'')}`} style={{
                  color:'#fff', fontWeight:700, fontSize:'0.88rem', textDecoration:'none',
                  background:'rgba(255,255,255,0.18)', padding:'0.3rem 0.85rem',
                  borderRadius:'20px', border:'1px solid rgba(255,255,255,0.32)',
                }}>📱 {num}</a>
              ))}
            </div>
          </div>
          <button
            onClick={() => window.open(`https://wa.me/917006159475?text=${encodeURIComponent('Hello! I would like to book a homecare service.')}`, '_blank')}
            style={{
              display:'flex', alignItems:'center', gap:'0.6rem',
              background:'#fff', color:'#059669', border:'none', borderRadius:'12px',
              padding:'0.9rem 1.9rem', fontWeight:800, fontSize:'1rem',
              cursor:'pointer', boxShadow:'0 4px 14px rgba(0,0,0,0.15)',
              transition:'all 0.25s ease', whiteSpace:'nowrap', flexShrink:0,
            }}
            onMouseEnter={e => { e.currentTarget.style.transform='scale(1.05)'; e.currentTarget.style.boxShadow='0 10px 28px rgba(0,0,0,0.25)'; }}
            onMouseLeave={e => { e.currentTarget.style.transform='scale(1)'; e.currentTarget.style.boxShadow='0 4px 14px rgba(0,0,0,0.15)'; }}
          >
            <svg width="21" height="21" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
            Book Now on WhatsApp
          </button>
        </div>
      </div>
    </section>
  );
};

/* ─── Doctors ─── */
const DOCTORS = [
  { name: 'Doctor Owais',          role: 'Emergency Supervisor / PG / OT / AT',      icon: '🩺' },
  { name: 'Doctor Aatif Fayaz',    role: 'Anaesthetist & Critical Care',              icon: '💉' },
  { name: 'Doctor Aadil Ali Khan', role: 'ICU Incharge — Critically Ill Patients',   icon: '🏥' },
  { name: 'Doctor Mehraj Mushtaq', role: 'HR · MSc Nursing · Incharge Nursing Officer', icon: '👨‍⚕️' },
];

const DoctorsSection = () => {
  const [hov, setHov] = React.useState(null);
  const [vis, setVis]  = React.useState(false);
  const ref = React.useRef(null);

  React.useEffect(() => {
    const observer = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVis(true); }, { threshold: 0.15 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="doctors" style={{ background:'#fff', padding:'5.5rem 0' }} ref={ref}>
      <div className="container">
        <div className="text-center" style={{ marginBottom:'3.5rem' }}>
          <span className="pill" style={{ marginBottom:'1rem', display:'inline-block' }}>👨‍⚕️ Our Experts</span>
          <h2 style={{ color:'#0c4a6e', margin:0 }}>Meet Our Medical Team</h2>
          <p style={{ color:'#64748b', marginTop:'0.75rem', fontSize:'1rem', maxWidth:500, margin:'0.75rem auto 0' }}>
            Experienced specialists dedicated to delivering the highest standard of homecare.
          </p>
        </div>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(240px,1fr))', gap:'1.5rem' }}>
          {DOCTORS.map((doc, i) => (
            <div key={i}
              onMouseEnter={() => setHov(i)} onMouseLeave={() => setHov(null)}
              style={{
                borderRadius:'20px', padding:'2rem 1.5rem', textAlign:'center',
                border:`1.5px solid ${hov === i ? '#0ea5e9' : '#e0eef8'}`,
                background: hov === i ? 'linear-gradient(140deg,#f0f9ff,#ecfdf5)' : '#fff',
                boxShadow: hov === i ? '0 16px 42px rgba(14,165,233,0.18)' : '0 2px 12px rgba(14,165,233,0.06)',
                transform: vis ? (hov === i ? 'translateY(-6px)' : 'translateY(0)') : 'translateY(28px)',
                opacity: vis ? 1 : 0,
                transition: `opacity 0.5s ease ${i * 0.1}s, transform 0.3s ease, box-shadow 0.3s, border-color 0.3s, background 0.3s`,
                cursor: 'default',
              }}>
              {/* Avatar */}
              <div style={{
                width:80, height:80, borderRadius:'50%', margin:'0 auto 1.25rem',
                background: hov === i ? 'linear-gradient(135deg,#0ea5e9,#10b981)' : 'linear-gradient(135deg,#e0f2fe,#d1fae5)',
                display:'flex', alignItems:'center', justifyContent:'center',
                fontSize:'2.2rem', transition:'background 0.3s',
                boxShadow: hov === i ? '0 8px 24px rgba(14,165,233,0.3)' : '0 4px 12px rgba(14,165,233,0.1)',
              }}>{doc.icon}</div>
              <h3 style={{ color: hov === i ? '#0c4a6e' : '#1e293b', fontWeight:800, fontSize:'1.05rem', marginBottom:'0.4rem' }}>
                {doc.name}
              </h3>
              <p style={{ color:'#64748b', fontSize:'0.85rem', lineHeight:1.55, margin:0 }}>{doc.role}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ─── Booking & Contact ─── */
const BookingSection = () => (
  <section id="booking" style={{
    position:'relative', overflow:'hidden',
    background:'linear-gradient(180deg,#f0f9ff 0%,#ecfdf5 100%)',
    padding:'5.5rem 0',
  }}>
    <div style={{ position:'absolute', top:'-100px', right:'-100px', width:'400px', height:'400px', borderRadius:'50%',
      background:'radial-gradient(circle,rgba(14,165,233,0.1) 0%,transparent 70%)', pointerEvents:'none' }} />
    <div style={{ position:'absolute', bottom:'-70px', left:'-70px', width:'340px', height:'340px', borderRadius:'50%',
      background:'radial-gradient(circle,rgba(16,185,129,0.1) 0%,transparent 70%)', pointerEvents:'none' }} />

    <div className="container" style={{ position:'relative', zIndex:1 }}>
      <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(320px,1fr))', gap:'4rem', alignItems:'center' }}>
        {/* Left info */}
        <div>
          <span className="pill" style={{ marginBottom:'1.1rem', display:'inline-block' }}>📅 Book Appointment</span>
          <h2 style={{ color:'#0c4a6e', marginBottom:'1rem' }}>Ready to Get Care?</h2>
          <p style={{ fontSize:'1.05rem', color:'#475569', lineHeight:1.75, marginBottom:'2rem' }}>
            Taking the first step is often the hardest, but we're here to make it as simple and
            comforting as possible. Reach out via WhatsApp to schedule care at home.
          </p>

          <div style={{
            borderRadius:'18px', overflow:'hidden',
            border:'1.5px solid #cce5f6',
            boxShadow:'0 8px 28px rgba(14,165,233,0.1)',
          }}>
            {/* Map header */}
            <div style={{
              background:'linear-gradient(135deg,#0369a1,#0ea5e9)',
              padding:'0.9rem 1.25rem',
              display:'flex', alignItems:'center', gap:'0.6rem',
            }}>
              <MapPin size={16} color="#fff" />
              <span style={{ color:'#fff', fontWeight:700, fontSize:'0.9rem' }}>
                Barzulla, Srinagar · Jammu &amp; Kashmir
              </span>
            </div>
            <iframe
              width="100%" height="220"
              style={{ border:0, display:'block' }}
              allowFullScreen="" loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              src="https://maps.google.com/maps?q=34.0402115,74.7993097&hl=en&z=15&output=embed"
              title="Home Heal Clinic Location"
            />
          </div>
        </div>

        {/* Form */}
        <div style={{ position:'relative', zIndex:10 }}>
          <BookingForm />
        </div>
      </div>
    </div>
  </section>
);

export default Home;
