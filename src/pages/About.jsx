import React from 'react';
import { Home, HeartPulse, CheckCircle2, Heart, Award, Users, Shield } from 'lucide-react';

const DIFFERENTIATORS = [
  {
    icon: '🏡',
    title: 'A Calm, Healing Environment',
    desc: 'Our clinic is designed to reduce stress and promote comfort, helping patients feel relaxed from the moment they arrive.',
  },
  {
    icon: '🎯',
    title: 'Personalized Attention',
    desc: 'We take the time to listen, understand, and guide you with care that is tailored specifically to you.',
  },
  {
    icon: '🤝',
    title: 'Compassionate Care Team',
    desc: "Our doctors don't just treat—they connect. Every interaction is built on trust, respect, and clear communication.",
  },
  {
    icon: '📈',
    title: 'Focus on Long-Term Wellness',
    desc: 'We believe in preventing problems before they start, helping you maintain a healthier lifestyle over time.',
  },
];

const STATS = [
  { number: '500+', label: 'Patients Served' },
  { number: '24/7', label: 'Availability' },
  { number: '12+',  label: 'Homecare Services' },
  { number: '100%', label: 'Certified Staff' },
];

const About = () => {
  const [hov, setHov] = React.useState(null);
  const [statVis, setStatVis] = React.useState(false);
  const statsRef = React.useRef(null);

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setStatVis(true); },
      { threshold: 0.2 }
    );
    if (statsRef.current) observer.observe(statsRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="animate-fade-in" style={{ background: 'var(--color-bg)' }}>

      {/* ── Hero Banner ── */}
      <section style={{
        position: 'relative', overflow: 'hidden',
        background: 'linear-gradient(135deg,#0c4a6e 0%,#0369a1 50%,#047857 100%)',
        padding: '7rem 0 5rem',
      }}>
        {/* Blobs */}
        <div style={{ position:'absolute', top:'-80px', right:'-80px', width:'380px', height:'380px', borderRadius:'50%',
          background:'radial-gradient(circle,rgba(255,255,255,0.08) 0%,transparent 70%)', pointerEvents:'none' }} />
        <div style={{ position:'absolute', bottom:'-60px', left:'-60px', width:'320px', height:'320px', borderRadius:'50%',
          background:'radial-gradient(circle,rgba(16,185,129,0.1) 0%,transparent 70%)', pointerEvents:'none' }} />

        <div className="container text-center" style={{ position:'relative', zIndex:1 }}>
          <span className="pill" style={{ marginBottom:'1.2rem', display:'inline-block',
            background:'rgba(255,255,255,0.18)', color:'#fff', border:'1px solid rgba(255,255,255,0.3)',
            backdropFilter:'blur(8px)' }}>
            🏥 About HomeHeal Clinic
          </span>
          <h1 style={{ color:'#fff', marginBottom:'1.25rem', fontSize:'clamp(2.2rem,5vw,3.5rem)' }}>
            Care You Can Trust,<br/>At Home
          </h1>
          <p style={{ color:'rgba(255,255,255,0.82)', fontSize:'1.15rem', maxWidth:'680px', margin:'0 auto', lineHeight:1.7 }}>
            At HomeHeal Clinic, we believe that healing should never feel stressful or impersonal.
            It should feel calm, reassuring, and comfortable — just like being at home.
          </p>
        </div>
      </section>

      {/* ── Stats ── */}
      <section ref={statsRef} style={{ background:'#fff', padding:'3.5rem 0', borderBottom:'1px solid #e0eef8' }}>
        <div className="container">
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(150px,1fr))', gap:'1.5rem' }}>
            {STATS.map((stat, i) => (
              <div key={i} style={{
                textAlign:'center', padding:'1.5rem 1rem',
                borderRadius:'16px', border:'1.5px solid #e0eef8',
                background: statVis ? 'linear-gradient(135deg,#f0f9ff,#ecfdf5)' : '#fff',
                opacity: statVis ? 1 : 0,
                transform: statVis ? 'translateY(0)' : 'translateY(20px)',
                transition: `all 0.55s ease ${i * 0.1}s`,
                boxShadow:'0 4px 16px rgba(14,165,233,0.08)',
              }}>
                <div style={{ fontSize:'2rem', fontWeight:900,
                  background:'linear-gradient(135deg,#0369a1,#10b981)',
                  WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent' }}>
                  {stat.number}
                </div>
                <div style={{ color:'#64748b', fontSize:'0.85rem', fontWeight:600, marginTop:'0.3rem' }}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Our Story & Approach ── */}
      <section style={{ background:'var(--gradient-surface,linear-gradient(180deg,#f0f9ff,#f8fafc 55%,#ecfdf5))', padding:'5rem 0' }}>
        <div className="container">
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(300px,1fr))', gap:'1.75rem' }}>

            {/* Story */}
            <div style={{
              background:'#fff', borderRadius:'20px', padding:'2.25rem',
              border:'1.5px solid #cce5f6',
              boxShadow:'0 4px 20px rgba(14,165,233,0.09)',
              transition:'all 0.3s ease',
            }}
              onMouseEnter={e => { e.currentTarget.style.transform='translateY(-5px)'; e.currentTarget.style.boxShadow='0 14px 40px rgba(14,165,233,0.16)'; e.currentTarget.style.borderColor='#0ea5e9'; }}
              onMouseLeave={e => { e.currentTarget.style.transform='translateY(0)'; e.currentTarget.style.boxShadow='0 4px 20px rgba(14,165,233,0.09)'; e.currentTarget.style.borderColor='#cce5f6'; }}
            >
              <div style={{ width:50, height:50, borderRadius:'13px', background:'linear-gradient(135deg,#e0f2fe,#d1fae5)',
                display:'flex', alignItems:'center', justifyContent:'center', marginBottom:'1.25rem', fontSize:'1.5rem' }}>
                🏠
              </div>
              <h2 style={{ color:'#0c4a6e', fontSize:'1.5rem', marginBottom:'1rem' }}>Our Story</h2>
              <p style={{ color:'#475569', lineHeight:1.75, marginBottom:'0.85rem' }}>
                Located in Barzulla, Srinagar, our clinic is built around a patient-first philosophy where care goes beyond prescriptions.
                We focus on creating an environment where every individual feels heard, respected, and genuinely supported throughout their health journey.
              </p>
              <p style={{ color:'#475569', lineHeight:1.75, marginBottom:'0.85rem' }}>
                HomeHeal Clinic was created with a simple vision — to redefine the way people experience healthcare. Many patients often feel
                rushed or overlooked in traditional clinical settings. We wanted to change that.
              </p>
              <p style={{ color:'#475569', lineHeight:1.75, margin:0 }}>
                Every visit is designed to be different. From the moment you connect with us, you're welcomed into a space that prioritizes
                comfort, clarity, and care.
              </p>
            </div>

            {/* Approach */}
            <div style={{
              background:'#fff', borderRadius:'20px', padding:'2.25rem',
              border:'1.5px solid #cce5f6',
              boxShadow:'0 4px 20px rgba(14,165,233,0.09)',
              transition:'all 0.3s ease',
            }}
              onMouseEnter={e => { e.currentTarget.style.transform='translateY(-5px)'; e.currentTarget.style.boxShadow='0 14px 40px rgba(14,165,233,0.16)'; e.currentTarget.style.borderColor='#0ea5e9'; }}
              onMouseLeave={e => { e.currentTarget.style.transform='translateY(0)'; e.currentTarget.style.boxShadow='0 4px 20px rgba(14,165,233,0.09)'; e.currentTarget.style.borderColor='#cce5f6'; }}
            >
              <div style={{ width:50, height:50, borderRadius:'13px', background:'linear-gradient(135deg,#e0f2fe,#d1fae5)',
                display:'flex', alignItems:'center', justifyContent:'center', marginBottom:'1.25rem', fontSize:'1.5rem' }}>
                💊
              </div>
              <h2 style={{ color:'#0c4a6e', fontSize:'1.5rem', marginBottom:'1rem' }}>Our Approach</h2>
              <p style={{ color:'#475569', lineHeight:1.75 }}>
                We take a holistic approach to healthcare — we don't just treat symptoms, we understand the root cause.
                Our homecare services are designed to support both physical and medical well-being:
              </p>
              <ul style={{ listStyle:'none', padding:0, margin:'1rem 0', display:'flex', flexDirection:'column', gap:'0.65rem' }}>
                {[
                  'Professional nursing & IV care',
                  'Physiotherapy & neuro rehabilitation',
                  'Post-operative recovery support',
                  'Vital parameters monitoring 24/7',
                  'Wound care & diabetic foot care',
                  'Ambulance transportation all over India',
                ].map((item, i) => (
                  <li key={i} style={{ display:'flex', alignItems:'center', gap:'0.6rem', color:'#334155', fontWeight:500, fontSize:'0.93rem' }}>
                    <div style={{ width:20, height:20, borderRadius:'50%', background:'linear-gradient(135deg,#0ea5e9,#10b981)',
                      display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
                      <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                        <path d="M2 5l2.5 2.5L8 3" stroke="#fff" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── Differentiators ── */}
      <section style={{ background:'#fff', padding:'5rem 0' }}>
        <div className="container">
          <div className="text-center" style={{ marginBottom:'3rem' }}>
            <span className="pill" style={{ marginBottom:'0.85rem', display:'inline-block' }}>⭐ Why Choose Us</span>
            <h2 style={{ color:'#0c4a6e', margin:0 }}>What Makes Us Different</h2>
          </div>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(240px,1fr))', gap:'1.2rem' }}>
            {DIFFERENTIATORS.map((item, i) => (
              <div key={i}
                onMouseEnter={() => setHov(i)}
                onMouseLeave={() => setHov(null)}
                style={{
                  padding:'1.75rem 1.5rem',
                  borderRadius:'18px',
                  border:`1.5px solid ${hov === i ? '#0ea5e9' : '#e0eef8'}`,
                  background: hov === i ? 'linear-gradient(140deg,#f0f9ff,#ecfdf5)' : '#fff',
                  boxShadow: hov === i ? '0 14px 36px rgba(14,165,233,0.16)' : '0 2px 10px rgba(14,165,233,0.05)',
                  transform: hov === i ? 'translateY(-5px)' : 'none',
                  transition:'all 0.3s ease',
                  borderLeft: `4px solid ${hov === i ? '#0ea5e9' : '#0369a1'}`,
                }}>
                <div style={{ fontSize:'2rem', marginBottom:'0.85rem' }}>{item.icon}</div>
                <h3 style={{ color: hov === i ? '#0c4a6e' : '#1e293b', fontSize:'1rem', fontWeight:700, marginBottom:'0.6rem' }}>
                  {item.title}
                </h3>
                <p style={{ color:'#64748b', fontSize:'0.88rem', lineHeight:1.65, margin:0 }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Mission Banner ── */}
      <section style={{ padding:'5rem 0 6rem', background:'linear-gradient(180deg,#f0f9ff,#ecfdf5)' }}>
        <div className="container">
          <div style={{
            background:'linear-gradient(135deg,#0369a1 0%,#0ea5e9 50%,#059669 100%)',
            borderRadius:'24px', padding:'3.5rem 2.5rem',
            textAlign:'center', position:'relative', overflow:'hidden',
            boxShadow:'0 22px 55px rgba(3,105,161,0.28)',
          }}>
            {/* decorative circles */}
            <div style={{ position:'absolute', top:'-60px', right:'-60px', width:'220px', height:'220px', borderRadius:'50%',
              background:'rgba(255,255,255,0.07)', pointerEvents:'none' }} />
            <div style={{ position:'absolute', bottom:'-40px', left:'-40px', width:'180px', height:'180px', borderRadius:'50%',
              background:'rgba(16,185,129,0.1)', pointerEvents:'none' }} />

            <div style={{ fontSize:'3rem', marginBottom:'1rem' }}>❤️</div>
            <h2 style={{ color:'#fff', fontSize:'clamp(1.6rem,3.5vw,2.2rem)', marginBottom:'1.25rem', fontWeight:800 }}>
              Our Mission
            </h2>
            <p style={{ fontSize:'1.2rem', fontStyle:'italic', color:'rgba(255,255,255,0.88)',
              maxWidth:'680px', margin:'0 auto 2rem', lineHeight:1.7 }}>
              "To provide modern, compassionate homecare that is accessible, trustworthy,
              and focused on long-term well-being — right at your doorstep."
            </p>
            <div style={{ display:'inline-block', background:'rgba(255,255,255,0.15)',
              borderRadius:'12px', padding:'1rem 1.75rem', border:'1px solid rgba(255,255,255,0.25)',
              backdropFilter:'blur(8px)' }}>
              <p style={{ color:'rgba(255,255,255,0.82)', fontSize:'0.95rem', margin:0, lineHeight:1.65 }}>
                Whether you're reaching out for a routine checkup or ongoing homecare, HomeHeal Clinic is here
                to support you every step of the way. Because true healing begins where you feel at home.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
