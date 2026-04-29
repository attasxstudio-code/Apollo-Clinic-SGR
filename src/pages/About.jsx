import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Calendar, Phone, ArrowRight, Activity, Users, FileText, FlaskConical, 
  UserCheck, HeartPulse, Stethoscope, Clock, Target, Eye, Heart,
  ShieldCheck, MessageSquare, CheckCircle2
} from 'lucide-react';

const PHONE      = '+91 1234 567 890';
const PHONE_HREF = 'tel:+911234567890';

const About = () => {
  const navigate = useNavigate();
  const goBook = () => { navigate('/book-checkup'); window.scrollTo(0, 0); };
  const goServices = () => { navigate('/services'); window.scrollTo(0, 0); };

  return (
    <div style={{ background: '#f8fafc', minHeight: '100vh', paddingBottom: '4rem' }}>

      {/* ── Hero Section ── */}
      <section style={{ padding: '4rem 0 6rem', background: '#fff', position: 'relative' }}>
        <div className="container" style={{ maxWidth: '1400px' }}>
          <div className="m-grid-1" style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: '4rem', alignItems: 'center' }}>
            {/* Left Content */}
            <div className="m-center">
              <div style={{ display: 'inline-block', marginBottom: '1rem' }}>
                <span style={{ color: 'var(--blue)', fontWeight: 800, fontSize: '0.85rem', letterSpacing: '1px', textTransform: 'uppercase' }}>
                  ABOUT US
                </span>
                <div style={{ height: '3px', width: '40px', background: 'var(--orange)', marginTop: '4px' }}></div>
              </div>
              
              <h1 style={{ fontSize: '3.5rem', lineHeight: 1.1, marginBottom: '1.5rem', color: 'var(--navy)' }}>
                About Apollo Clinic<br/>
                <span style={{ color: 'var(--orange)' }}>Compassionate healthcare.</span><br/>
                <span style={{ color: 'var(--blue)' }}>Modern expertise.</span> Trusted<br/>
                care for every family.
              </h1>
              
              <p style={{ fontSize: '1.1rem', color: 'var(--body)', marginBottom: '2.5rem', lineHeight: 1.6, maxWidth: '540px' }}>
                Apollo Clinic is a multi-specialty healthcare destination committed to delivering high-quality, patient-centered care. With experienced doctors, advanced diagnostics, and personalized treatment, we put your health and well-being at the heart of everything we do.
              </p>

              <div className="m-wrap" style={{ display: 'flex', gap: '1rem' }}>
                <button className="btn btn-primary btn-lg" onClick={goBook} style={{ borderRadius: '8px', padding: '0.8rem 1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  Book Appointment <Calendar size={18} />
                </button>
                <button className="btn btn-outline-blue btn-lg" onClick={goServices} style={{ borderRadius: '8px', padding: '0.8rem 1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  Explore Services <ArrowRight size={18} />
                </button>
              </div>
            </div>

            {/* Right Image */}
            <div className="m-h-auto" style={{ position: 'relative', height: '500px', borderRadius: '24px', overflow: 'hidden', boxShadow: '0 20px 40px rgba(0,0,0,0.1)' }}>
              <img src="/APOLLO-outside.png" alt="Apollo Clinic Building" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
          </div>

          {/* Floating Stats Bar */}
          <div className="m-grid-2 m-static" style={{ 
            background: '#fff', borderRadius: '16px', padding: '2rem', 
            boxShadow: '0 10px 40px rgba(0,0,0,0.08)', border: '1px solid rgba(0,0,0,0.05)',
            display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '2rem',
            position: 'absolute', bottom: '-40px', left: '50%', transform: 'translateX(-50%)', width: '90%', maxWidth: '1200px', zIndex: 10
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', borderRight: '1px solid rgba(0,0,0,0.05)' }}>
              <div style={{ color: 'var(--blue)' }}><Activity size={32} /></div>
              <div>
                <div style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--navy)', lineHeight: 1 }}>10+</div>
                <div style={{ fontSize: '0.85rem', color: 'var(--body)' }}>Specialties</div>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', borderRight: '1px solid rgba(0,0,0,0.05)' }}>
              <div style={{ color: 'var(--blue)' }}><Users size={32} /></div>
              <div>
                <div style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--navy)', lineHeight: 1 }}>6+</div>
                <div style={{ fontSize: '0.85rem', color: 'var(--body)' }}>Expert Doctors</div>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', borderRight: '1px solid rgba(0,0,0,0.05)' }}>
              <div style={{ color: 'var(--blue)' }}><FileText size={32} /></div>
              <div>
                <div style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--navy)', lineHeight: 1 }}>24/7</div>
                <div style={{ fontSize: '0.85rem', color: 'var(--body)' }}>Reports Online</div>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <div style={{ color: 'var(--blue)' }}><FlaskConical size={32} /></div>
              <div>
                <div style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--navy)', lineHeight: 1.2 }}>Advanced</div>
                <div style={{ fontSize: '0.85rem', color: 'var(--body)' }}>Diagnostics</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Who We Are ── */}
      <section style={{ padding: '8rem 0 5rem' }}>
        <div className="container" style={{ maxWidth: '1400px' }}>
          <div className="m-grid-1" style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: '5rem', alignItems: 'center' }}>
            <div className="m-center">
              <div style={{ display: 'inline-block', marginBottom: '1rem' }}>
                <span style={{ color: 'var(--blue)', fontWeight: 800, fontSize: '0.85rem', letterSpacing: '1px', textTransform: 'uppercase' }}>
                  WHO WE ARE
                </span>
                <div style={{ height: '3px', width: '40px', background: 'var(--orange)', marginTop: '4px' }}></div>
              </div>
              <h2 style={{ fontSize: '2.5rem', color: 'var(--navy)', marginBottom: '1.5rem', lineHeight: 1.2 }}>
                A legacy of care.<br/>A commitment to you.
              </h2>
              <p style={{ fontSize: '1rem', color: 'var(--body)', marginBottom: '2.5rem', lineHeight: 1.7 }}>
                Apollo Clinic is built on the trusted foundation of the Apollo brand—one of India's most respected names in healthcare. We bring hospital-grade expertise to your neighborhood with a focus on convenience, compassion, and clinical excellence.
              </p>
              
              <div className="m-grid-2" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ color: 'var(--blue)', marginBottom: '0.5rem', display: 'flex', justifyContent: 'center' }}><UserCheck size={32} /></div>
                  <div style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--navy)' }}>Experienced<br/>Doctors</div>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ color: 'var(--blue)', marginBottom: '0.5rem', display: 'flex', justifyContent: 'center' }}><HeartPulse size={32} /></div>
                  <div style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--navy)' }}>Patient-First<br/>Care</div>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ color: 'var(--blue)', marginBottom: '0.5rem', display: 'flex', justifyContent: 'center' }}><FlaskConical size={32} /></div>
                  <div style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--navy)' }}>Advanced Lab<br/>Support</div>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ color: 'var(--blue)', marginBottom: '0.5rem', display: 'flex', justifyContent: 'center' }}><Clock size={32} /></div>
                  <div style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--navy)' }}>Easy Access &<br/>Follow-up</div>
                </div>
              </div>
            </div>
            
            <div className="m-h-auto" style={{ height: '400px', borderRadius: '24px', overflow: 'hidden', boxShadow: '0 20px 40px rgba(0,0,0,0.1)' }}>
              <img src="/clinic-reception.png" alt="Clinic Interior" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
          </div>
        </div>
      </section>

      {/* ── Purpose, Mission, Vision, Values ── */}
      <section style={{ padding: '5rem 0', background: '#fff' }}>
        <div className="container" style={{ maxWidth: '1400px', textAlign: 'center' }}>
          <div style={{ display: 'inline-block', marginBottom: '1rem' }}>
            <span style={{ color: 'var(--blue)', fontWeight: 800, fontSize: '0.85rem', letterSpacing: '1px', textTransform: 'uppercase' }}>
              OUR PURPOSE
            </span>
            <div style={{ height: '3px', width: '30px', background: 'var(--orange)', margin: '4px auto 0' }}></div>
          </div>
          <h2 style={{ fontSize: '2.2rem', color: 'var(--navy)', marginBottom: '4rem' }}>
            Our Mission, Vision & Values
          </h2>

          <div className="m-grid-1" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2rem' }}>
            <div style={{ 
              border: '1px solid rgba(0,0,0,0.05)', borderRadius: '16px', padding: '3rem 2rem', 
              boxShadow: '0 10px 30px rgba(0,0,0,0.02)', textAlign: 'left',
              transition: 'all 0.3s ease', cursor: 'pointer'
            }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-5px)'; e.currentTarget.style.boxShadow = '0 15px 40px rgba(13,82,192,0.08)'; e.currentTarget.style.borderColor = 'rgba(13,82,192,0.1)'; }}
            onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = '0 10px 30px rgba(0,0,0,0.02)'; e.currentTarget.style.borderColor = 'rgba(0,0,0,0.05)'; }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
                <div style={{ width: '56px', height: '56px', borderRadius: '50%', background: 'var(--blue-light)', color: 'var(--blue)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Target size={28} />
                </div>
                <h3 style={{ fontSize: '1.25rem', color: 'var(--navy)', margin: 0 }}>Our Mission</h3>
              </div>
              <p style={{ fontSize: '0.95rem', color: 'var(--body)', lineHeight: 1.6, margin: 0 }}>
                To provide accessible, high-quality healthcare through advanced technology, skilled professionals, and a patient-first approach.
              </p>
            </div>
            
            <div style={{ 
              border: '1px solid rgba(0,0,0,0.05)', borderRadius: '16px', padding: '3rem 2rem', 
              boxShadow: '0 10px 30px rgba(0,0,0,0.02)', textAlign: 'left',
              transition: 'all 0.3s ease', cursor: 'pointer'
            }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-5px)'; e.currentTarget.style.boxShadow = '0 15px 40px rgba(13,82,192,0.08)'; e.currentTarget.style.borderColor = 'rgba(13,82,192,0.1)'; }}
            onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = '0 10px 30px rgba(0,0,0,0.02)'; e.currentTarget.style.borderColor = 'rgba(0,0,0,0.05)'; }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
                <div style={{ width: '56px', height: '56px', borderRadius: '50%', background: 'var(--blue-light)', color: 'var(--blue)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Eye size={28} />
                </div>
                <h3 style={{ fontSize: '1.25rem', color: 'var(--navy)', margin: 0 }}>Our Vision</h3>
              </div>
              <p style={{ fontSize: '0.95rem', color: 'var(--body)', lineHeight: 1.6, margin: 0 }}>
                To be the most trusted multi-specialty clinic chain, setting new benchmarks in clinical outcomes and patient experience.
              </p>
            </div>

            <div style={{ 
              border: '1px solid rgba(0,0,0,0.05)', borderRadius: '16px', padding: '3rem 2rem', 
              boxShadow: '0 10px 30px rgba(0,0,0,0.02)', textAlign: 'left',
              transition: 'all 0.3s ease', cursor: 'pointer'
            }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-5px)'; e.currentTarget.style.boxShadow = '0 15px 40px rgba(13,82,192,0.08)'; e.currentTarget.style.borderColor = 'rgba(13,82,192,0.1)'; }}
            onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = '0 10px 30px rgba(0,0,0,0.02)'; e.currentTarget.style.borderColor = 'rgba(0,0,0,0.05)'; }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
                <div style={{ width: '56px', height: '56px', borderRadius: '50%', background: 'var(--blue-light)', color: 'var(--blue)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Heart size={28} />
                </div>
                <h3 style={{ fontSize: '1.25rem', color: 'var(--navy)', margin: 0 }}>Our Values</h3>
              </div>
              <p style={{ fontSize: '0.95rem', color: 'var(--body)', lineHeight: 1.6, margin: 0 }}>
                Compassion, integrity, excellence and respect guide every interaction and decision we make.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Why Patients Trust Apollo Clinic ── */}
      <section style={{ padding: '5rem 0' }}>
        <div className="container" style={{ maxWidth: '1400px', textAlign: 'center' }}>
          <div style={{ display: 'inline-block', marginBottom: '1rem' }}>
            <span style={{ color: 'var(--blue)', fontWeight: 800, fontSize: '0.85rem', letterSpacing: '1px', textTransform: 'uppercase' }}>
              WHY PATIENTS TRUST APOLLO CLINIC
            </span>
            <div style={{ height: '3px', width: '30px', background: 'var(--orange)', margin: '4px auto 0' }}></div>
          </div>
          <h2 style={{ fontSize: '2.2rem', color: 'var(--navy)', marginBottom: '4rem' }}>
            Trusted care. Backed by expertise.
          </h2>

          <div className="m-grid-1" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.5rem' }}>
            {[
              { title: 'Compassionate Care', desc: 'We listen, we care, and we treat every patient with dignity and empathy.', icon: <HeartPulse size={32} /> },
              { title: 'Coordinated Specialties', desc: 'Seamless collaboration across specialties for comprehensive and continuous care.', icon: <Users size={32} /> },
              { title: 'Accurate Diagnostics', desc: 'Advanced labs and protocols ensure precise results for better clinical decisions.', icon: <FlaskConical size={32} /> },
              { title: 'Transparent Communication', desc: 'Clear guidance, honest advice, and complete transparency at every step.', icon: <MessageSquare size={32} /> },
            ].map((item, i) => (
              <div key={i} style={{ 
                background: '#fff', padding: '2.5rem 1.5rem', borderRadius: '16px',
                border: '1px solid rgba(0,0,0,0.05)', boxShadow: '0 4px 20px rgba(0,0,0,0.02)',
                display: 'flex', alignItems: 'flex-start', gap: '1rem', textAlign: 'left',
                transition: 'all 0.3s ease', cursor: 'pointer'
              }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-5px)'; e.currentTarget.style.boxShadow = '0 12px 30px rgba(13,82,192,0.1)'; e.currentTarget.style.borderColor = 'rgba(13,82,192,0.15)'; }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.02)'; e.currentTarget.style.borderColor = 'rgba(0,0,0,0.05)'; }}
              >
                <div style={{ color: 'var(--blue)' }}>{item.icon}</div>
                <div>
                  <h4 style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--navy)', marginBottom: '0.5rem' }}>{item.title}</h4>
                  <p style={{ fontSize: '0.85rem', color: 'var(--body)', margin: 0, lineHeight: 1.5 }}>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Our Care Approach & Facility Highlights ── */}
      <section style={{ padding: '5rem 0', background: '#fff' }}>
        <div className="container" style={{ maxWidth: '1400px' }}>
          
          <div className="m-grid-1" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'center', marginBottom: '6rem' }}>
            <div className="m-center">
              <div style={{ display: 'inline-block', marginBottom: '1rem' }}>
                <span style={{ color: 'var(--blue)', fontWeight: 800, fontSize: '0.85rem', letterSpacing: '1px', textTransform: 'uppercase' }}>
                  OUR CARE APPROACH
                </span>
                <div style={{ height: '3px', width: '40px', background: 'var(--orange)', marginTop: '4px' }}></div>
              </div>
              <h2 style={{ fontSize: '2.5rem', color: 'var(--navy)', marginBottom: '1.5rem', lineHeight: 1.2 }}>
                Personalized care at every step.
              </h2>
              <p style={{ fontSize: '1rem', color: 'var(--body)', marginBottom: '2rem', lineHeight: 1.6 }}>
                We follow a structured, patient-first approach that ensures the right care, at the right time.
              </p>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                <li style={{ display: 'flex', alignItems: 'center', gap: '1rem', fontSize: '1rem', color: 'var(--heading)', fontWeight: 600 }}>
                  <CheckCircle2 size={24} color="var(--blue)" /> Detailed consultation and health assessment
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '1rem', fontSize: '1rem', color: 'var(--heading)', fontWeight: 600 }}>
                  <CheckCircle2 size={24} color="var(--blue)" /> Accurate diagnosis with advanced technology
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '1rem', fontSize: '1rem', color: 'var(--heading)', fontWeight: 600 }}>
                  <CheckCircle2 size={24} color="var(--blue)" /> Personalized treatment and care planning
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '1rem', fontSize: '1rem', color: 'var(--heading)', fontWeight: 600 }}>
                  <CheckCircle2 size={24} color="var(--blue)" /> Continuous follow-up for better outcomes
                </li>
              </ul>
            </div>
            <div className="m-h-auto" style={{ height: '350px', borderRadius: '24px', overflow: 'hidden', boxShadow: '0 20px 40px rgba(0,0,0,0.1)' }}>
              {/* Patient consulting image placeholder */}
              <img src="/patient-anjali.png" alt="Patient Consultation" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
          </div>

          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <div style={{ display: 'inline-block', marginBottom: '1rem' }}>
              <span style={{ color: 'var(--blue)', fontWeight: 800, fontSize: '0.85rem', letterSpacing: '1px', textTransform: 'uppercase' }}>
                OUR FACILITY HIGHLIGHTS
              </span>
              <div style={{ height: '3px', width: '30px', background: 'var(--orange)', margin: '4px auto 0' }}></div>
            </div>
          </div>

          <div className="m-grid-2" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.5rem' }}>
            {[
              { img: '/clinic-reception.png', title: 'Welcoming Reception', desc: 'Designed for comfort, convenience, and a smooth experience.' },
              { img: '/consultation-room.png', title: 'Modern Consultation Rooms', desc: 'Well-equipped rooms for private and comfortable consultations.' },
              { img: '/lab-technician.jpg', title: 'Advanced Diagnostics Lab', desc: 'State-of-the-art technology for accurate and reliable results.' },
              { img: '/patient-waiting.png', title: 'Patient Comfort Areas', desc: 'Spacious waiting areas designed for relaxation and ease.' }
            ].map((fac, i) => (
              <div key={i} style={{ 
                borderRadius: '16px', overflow: 'hidden', border: '1px solid rgba(0,0,0,0.05)',
                transition: 'all 0.3s ease', cursor: 'pointer', background: '#fff'
              }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-5px)'; e.currentTarget.style.boxShadow = '0 12px 30px rgba(13,82,192,0.1)'; }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = 'none'; }}
              >
                <div style={{ height: '160px', overflow: 'hidden' }}>
                  <img src={fac.img} alt={fac.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                <div style={{ padding: '1.5rem' }}>
                  <h4 style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--navy)', marginBottom: '0.5rem' }}>{fac.title}</h4>
                  <p style={{ fontSize: '0.85rem', color: 'var(--body)', margin: 0, lineHeight: 1.5 }}>{fac.desc}</p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ── CTA Banner ── */}
      <section style={{ padding: '5rem 0 2rem' }}>
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
                <h3 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--navy)', margin: '0 0 0.25rem 0' }}>
                  Your health deserves expert care.
                </h3>
                <p style={{ fontSize: '0.95rem', color: 'var(--body)', margin: 0 }}>
                  Book an appointment or connect with our care team today.
                </p>
              </div>
            </div>
            
            <div className="m-wrap" style={{ display: 'flex', gap: '1rem' }}>
              <button className="btn btn-orange btn-lg" onClick={goBook} style={{ padding: '0.75rem 2rem', fontSize: '0.95rem' }}>
                <Calendar size={18} /> Book Appointment
              </button>
              <a href={PHONE_HREF} className="btn btn-outline-blue btn-lg" style={{ padding: '0.75rem 2rem', fontSize: '0.95rem', textDecoration: 'none', border: '1px solid var(--blue)', color: 'var(--blue)', display: 'flex', alignItems: 'center', gap: '0.5rem', borderRadius: '8px' }}>
                <Phone size={18} /> Talk to Clinic
              </a>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default About;
