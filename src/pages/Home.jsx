import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Phone, MapPin, ArrowRight, Calendar, CheckCircle,
  Clock, Star, ChevronDown, Shield, Heart, Activity,
  FileText, Navigation, Stethoscope, ShieldCheck, 
  Baby, HeartPulse, Syringe, Users, ChevronRight,
  ChevronLeft, BriefcaseMedical, Lock, Mail, Check,
  Facebook, Instagram, Youtube, Linkedin, Menu, X
} from 'lucide-react';

/* ─── Constants ─── */
const PHONE      = '+91 80 1234 5678';
const EMAIL      = 'contact@apolloclinic.com';
const TIMINGS    = 'Mon - Sun: 8:00 AM - 8:00 PM';
const MAPS_EMBED = 'https://maps.google.com/maps?q=34.0806043,74.7988594&hl=en&z=17&output=embed&iwloc=near';

const Home = () => {
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const goBook = () => navigate('/book');
  const goTo = (path) => {
    setMobileMenuOpen(false);
    navigate(path);
  };

  return (
    <div className="home-page" style={{ background: '#fff', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      
      {/* ─── NAVBAR ─── */}
      <nav className="navbar" style={{ padding: '0 1.5rem', background: '#fff', borderBottom: '1px solid var(--border)', position: 'sticky', top: 0, zIndex: 50 }}>
        <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '80px', maxWidth: '1400px' }}>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }} onClick={() => goTo('/')}>
            <img src="/logo.jpg" alt="Apollo Clinic" style={{ height: '40px' }} />
          </div>

          <div className="navbar-links" style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
            {['Home', 'Services', 'Doctors', 'Diagnostics', 'About Us', 'Reports'].map(link => (
              <button key={link} className="navbar-link" style={{ fontWeight: 600, color: link === 'Home' ? 'var(--blue)' : 'var(--body)', fontSize: '0.95rem' }} onClick={() => goTo(`/${link.toLowerCase().replace(' ', '-')}`)}>
                {link}
              </button>
            ))}
          </div>

          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
            <button className="btn btn-outline-blue" onClick={() => goTo('/admin-login')} style={{ fontSize: '0.9rem', fontWeight: 600 }}>
              <Lock size={16} /> Admin Login
            </button>
            <button className="btn btn-orange" onClick={goBook} style={{ fontSize: '0.9rem', fontWeight: 600 }}>
              <Calendar size={16} /> Book Appointment
            </button>
          </div>
        </div>
      </nav>

      {/* ─── HERO SECTION ─── */}
      <section style={{ padding: '6rem 0', background: 'linear-gradient(to bottom, #f8fafc, #fff)' }}>
        <div className="container" style={{ maxWidth: '1400px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'center' }}>
          
          <div style={{ maxWidth: '600px' }}>
            <div style={{ color: 'var(--blue)', fontWeight: 800, fontSize: '0.85rem', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '1.5rem' }}>
              WELCOME TO APOLLO CLINIC
            </div>
            
            <h1 style={{ fontSize: '4.5rem', lineHeight: 1.1, marginBottom: '1.5rem', color: 'var(--navy)' }}>
              Expertise.<br/>
              <span className="text-orange">Closer to you.</span>
            </h1>
            
            <p style={{ fontSize: '1.15rem', color: 'var(--body)', marginBottom: '3rem', lineHeight: 1.6 }}>
              World-class healthcare with compassionate care.<br/>
              Your health is our priority.
            </p>

            <div style={{ display: 'flex', gap: '1rem', marginBottom: '4rem' }}>
              <button className="btn btn-blue btn-lg" onClick={goBook} style={{ padding: '1rem 2rem', fontSize: '1rem' }}>
                Book Appointment <Calendar size={18} />
              </button>
              <button className="btn btn-white btn-lg" onClick={() => goTo('/services')} style={{ padding: '1rem 2rem', fontSize: '1rem', border: '1px solid var(--border)' }}>
                Explore Services <ArrowRight size={18} />
              </button>
            </div>

            <div style={{ display: 'flex', gap: '3rem', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <Users className="text-blue" size={24} />
                <span style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--heading)' }}>Top<br/>Specialists</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <ShieldCheck className="text-blue" size={24} />
                <span style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--heading)' }}>Advanced<br/>Technology</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <Heart className="text-blue" size={24} />
                <span style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--heading)' }}>Patient<br/>First Approach</span>
              </div>
            </div>
          </div>

          <div style={{ position: 'relative' }}>
            <div style={{ borderRadius: '24px', overflow: 'hidden', boxShadow: '0 20px 40px rgba(0,0,0,0.08)' }}>
              <img src="/clinic-interior.jpg" alt="Clinic Interior" style={{ width: '100%', height: 'auto', display: 'block' }} />
            </div>
          </div>
        </div>
      </section>

      {/* ─── OUR SERVICES ─── */}
      <section style={{ padding: '5rem 0', background: '#fff', textAlign: 'center' }}>
        <div className="container" style={{ maxWidth: '1400px' }}>
          <div style={{ color: 'var(--blue)', fontWeight: 800, fontSize: '0.85rem', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '1rem' }}>
            OUR SERVICES
          </div>
          <h2 style={{ fontSize: '2.5rem', color: 'var(--heading)', marginBottom: '3.5rem' }}>
            Comprehensive care for you and your family.
          </h2>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: '1.5rem' }}>
            {[
              { icon: <Stethoscope size={28} />, title: 'Consultation', desc: 'Expert consultations across multiple specialties.' },
              { icon: <ShieldCheck size={28} />, title: 'Preventive Care', desc: 'Screenings and health checkups for everyone.' },
              { icon: <span style={{fontSize: '28px', lineHeight: 1}}>♀</span>, title: "Women's Health", desc: 'Compassionate care for women at every stage.' },
              { icon: <Baby size={28} />, title: 'Child Care', desc: 'Complete healthcare for infants, children and teens.' },
              { icon: <HeartPulse size={28} />, title: 'Chronic Care', desc: 'Managed care for long-term conditions.' },
              { icon: <Syringe size={28} />, title: 'Vaccination', desc: 'Safe and effective vaccination services.' },
            ].map((s, i) => (
              <div key={i} className="card" style={{ padding: '2rem 1.5rem', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <div style={{ width: '60px', height: '60px', borderRadius: '50%', background: 'var(--blue-light)', color: 'var(--blue)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem' }}>
                  {s.icon}
                </div>
                <h3 style={{ fontSize: '1.1rem', marginBottom: '0.75rem' }}>{s.title}</h3>
                <p style={{ fontSize: '0.85rem', color: 'var(--body)', marginBottom: '1.5rem', flex: 1 }}>{s.desc}</p>
                <button className="btn-ghost" style={{ color: 'var(--blue)', fontWeight: 600, fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  Learn More <ArrowRight size={16} />
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── OUR DOCTORS ─── */}
      <section style={{ padding: '5rem 0', background: '#f8fafc' }}>
        <div className="container" style={{ maxWidth: '1400px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '3.5rem' }}>
            <div>
              <div style={{ color: 'var(--blue)', fontWeight: 800, fontSize: '0.85rem', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '1rem' }}>
                OUR DOCTORS
              </div>
              <h2 style={{ fontSize: '2.5rem', color: 'var(--heading)', margin: 0 }}>
                Highly experienced specialists dedicated to your health.
              </h2>
            </div>
            <button className="btn-ghost" style={{ color: 'var(--blue)', fontWeight: 600, fontSize: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              View All Doctors <ArrowRight size={18} />
            </button>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '2rem', position: 'relative' }}>
            {[
              { name: 'Dr. Neha Sharma', spec: 'Consultant - Internal Medicine', qual: 'MBBS, MD', exp: '12+ years experience', img: '/doctor-neha.png' },
              { name: 'Dr. Arjun Mehta', spec: 'Consultant - Cardiology', qual: 'MBBS, MD, DM', exp: '15+ years experience', img: '/doctor-arjun.png' },
              { name: 'Dr. Priya Nair', spec: 'Consultant - Gynecology', qual: 'MBBS, MS (OBG)', exp: '14+ years experience', img: '/doctor-priya.png' },
              { name: 'Dr. Rohan Verma', spec: 'Consultant - Orthopedics', qual: 'MBBS, MS (Ortho)', exp: '10+ years experience', img: '/doctor-rohan.png' },
            ].map((d, i) => (
              <div key={i} className="card" style={{ padding: 0, overflow: 'hidden' }}>
                <img src={d.img} alt={d.name} style={{ width: '100%', height: '240px', objectFit: 'cover' }} />
                <div style={{ padding: '1.5rem' }}>
                  <h3 style={{ fontSize: '1.2rem', color: 'var(--blue)', marginBottom: '0.25rem' }}>{d.name}</h3>
                  <p style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--navy)', marginBottom: '0.25rem' }}>{d.spec}</p>
                  <p style={{ fontSize: '0.8rem', color: 'var(--body)', marginBottom: '0.75rem' }}>{d.qual}</p>
                  <p style={{ fontSize: '0.85rem', color: 'var(--muted)', margin: 0 }}>{d.exp}</p>
                </div>
              </div>
            ))}

            {/* Next arrow */}
            <div style={{ position: 'absolute', right: '-24px', top: '50%', transform: 'translateY(-50%)', width: '48px', height: '48px', background: '#fff', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 12px rgba(0,0,0,0.1)', cursor: 'pointer', zIndex: 10 }}>
              <ChevronRight size={24} color="var(--blue)" />
            </div>
          </div>
        </div>
      </section>

      {/* ─── LAB & DIAGNOSTICS ─── */}
      <section style={{ padding: '5rem 0', background: '#fff' }}>
        <div className="container" style={{ maxWidth: '1400px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'center' }}>
          
          <div>
            <div style={{ color: 'var(--blue)', fontWeight: 800, fontSize: '0.85rem', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '1rem' }}>
              LAB & DIAGNOSTICS
            </div>
            <h2 style={{ fontSize: '2.5rem', color: 'var(--heading)', marginBottom: '1.5rem' }}>
              Accurate results.<br/>Better decisions.
            </h2>
            <p style={{ fontSize: '1.1rem', color: 'var(--body)', marginBottom: '2.5rem', lineHeight: 1.6 }}>
              State-of-the-art laboratories and advanced diagnostic imaging for precise and timely results.
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '3rem' }}>
              {[
                'Advanced pathology lab', 'Digital X-Ray, MRI, CT Scan',
                'Fast & reliable reporting', 'Home sample collection'
              ].map(item => (
                <div key={item} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <CheckCircle size={20} className="text-blue" />
                  <span style={{ fontSize: '0.95rem', fontWeight: 500, color: 'var(--heading)' }}>{item}</span>
                </div>
              ))}
            </div>

            <button className="btn btn-outline-blue btn-lg" onClick={() => goTo('/diagnostics')} style={{ padding: '0.85rem 2rem' }}>
              Explore Diagnostics <ArrowRight size={18} />
            </button>
          </div>

          <div style={{ borderRadius: '24px', overflow: 'hidden' }}>
            <img src="/lab-technician.jpg" alt="Lab Diagnostics" style={{ width: '100%', height: 'auto', display: 'block' }} />
          </div>
        </div>
      </section>

      {/* ─── WHY CHOOSE APOLLO CLINIC ─── */}
      <section style={{ padding: '4rem 0', background: '#f8fafc', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}>
        <div className="container" style={{ maxWidth: '1400px', textAlign: 'center' }}>
          <div style={{ color: 'var(--blue)', fontWeight: 800, fontSize: '0.85rem', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '3rem' }}>
            WHY CHOOSE APOLLO CLINIC?
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '2rem' }}>
            {[
              { icon: <UserCircle size={32} />, title: 'Experienced Doctors', desc: 'Highly qualified and compassionate specialists.' },
              { icon: <BriefcaseMedical size={32} />, title: 'Advanced Technology', desc: 'Modern facilities and latest medical technology.' },
              { icon: <Heart size={32} />, title: 'Patient-Centric Care', desc: 'Personalized care with empathy and respect.' },
              { icon: <ShieldCheck size={32} />, title: 'Safe & Hygienic', desc: 'Strict safety protocols for your peace of mind.' },
              { icon: <MapPin size={32} />, title: 'Convenient Access', desc: 'Multiple centers and easy appointment booking.' },
            ].map((f, i) => (
              <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <div style={{ color: 'var(--blue)', marginBottom: '1rem' }}>{f.icon}</div>
                <h4 style={{ fontSize: '1rem', color: 'var(--heading)', marginBottom: '0.5rem' }}>{f.title}</h4>
                <p style={{ fontSize: '0.85rem', color: 'var(--body)' }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── PATIENT SERVICES ─── */}
      <section style={{ padding: '4rem 0', background: '#fff' }}>
        <div className="container" style={{ maxWidth: '1400px', textAlign: 'center' }}>
          <div style={{ color: 'var(--blue)', fontWeight: 800, fontSize: '0.85rem', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '3rem' }}>
            PATIENT SERVICES
          </div>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '4rem', flexWrap: 'wrap' }}>
            {[
              { icon: <Calendar size={28} />, title: 'Book Appointment' },
              { icon: <HeartPulse size={28} />, title: 'Health Checkups' },
              { icon: <Shield size={28} />, title: 'Insurance Assistance' },
              { icon: <BriefcaseMedical size={28} />, title: 'Pharmacy' },
              { icon: <FileText size={28} />, title: 'Online Reports' },
              { icon: <MapPin size={28} />, title: 'Home Collection' },
            ].map((s, i) => (
              <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem', cursor: 'pointer' }}>
                <div style={{ width: '64px', height: '64px', borderRadius: '50%', border: '1px solid var(--blue-border)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--blue)' }}>
                  {s.icon}
                </div>
                <span style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--blue)' }}>{s.title}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── PATIENT FEEDBACK ─── */}
      <section style={{ padding: '5rem 0', background: '#f8fafc' }}>
        <div className="container" style={{ maxWidth: '1400px' }}>
          <div style={{ textAlign: 'center', marginBottom: '3.5rem', position: 'relative' }}>
            <div style={{ color: 'var(--blue)', fontWeight: 800, fontSize: '0.85rem', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '1rem' }}>
              PATIENT FEEDBACK
            </div>
            <h2 style={{ fontSize: '2.5rem', color: 'var(--heading)', margin: 0 }}>
              Trusted by thousands of patients and families.
            </h2>
            <button className="btn-ghost" style={{ position: 'absolute', right: 0, bottom: '10px', color: 'var(--blue)', fontWeight: 600, fontSize: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              View All Reviews <ArrowRight size={18} />
            </button>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2rem', position: 'relative' }}>
            {[
              { quote: "Excellent care and professional staff. The doctors explained everything clearly and patiently.", author: "Anjali S.", img: "/patient-anjali.png" },
              { quote: "Very clean and well-organized clinic. Got my reports quickly and the staff was very helpful.", author: "Rahul K.", img: "/patient-rahul.png" },
              { quote: "I highly recommend Apollo Clinic for anyone looking for quality healthcare and genuine care.", author: "Meena T.", img: "/patient-meena.png" },
            ].map((r, i) => (
              <div key={i} className="card" style={{ padding: '2.5rem', display: 'flex', flexDirection: 'column' }}>
                <div style={{ display: 'flex', gap: '0.25rem', color: '#f59e0b', marginBottom: '1.5rem' }}>
                  {[1,2,3,4,5].map(star => <Star key={star} size={20} fill="currentColor" />)}
                </div>
                <p style={{ fontSize: '1.05rem', color: 'var(--body)', marginBottom: '2rem', flex: 1, fontStyle: 'italic' }}>"{r.quote}"</p>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontWeight: 600, color: 'var(--heading)' }}>- {r.author}</span>
                  <img src={r.img} alt={r.author} style={{ width: '48px', height: '48px', borderRadius: '50%', objectFit: 'cover' }} />
                </div>
              </div>
            ))}
            
            {/* Arrows */}
            <div style={{ position: 'absolute', left: '-24px', top: '50%', transform: 'translateY(-50%)', width: '48px', height: '48px', background: '#fff', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 12px rgba(0,0,0,0.1)', cursor: 'pointer', zIndex: 10 }}>
              <ChevronLeft size={24} color="var(--blue)" />
            </div>
            <div style={{ position: 'absolute', right: '-24px', top: '50%', transform: 'translateY(-50%)', width: '48px', height: '48px', background: '#fff', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 12px rgba(0,0,0,0.1)', cursor: 'pointer', zIndex: 10 }}>
              <ChevronRight size={24} color="var(--blue)" />
            </div>
          </div>
        </div>
      </section>

      {/* ─── FIND US ─── */}
      <section style={{ padding: '5rem 0', background: '#fff' }}>
        <div className="container" style={{ maxWidth: '1400px', display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '4rem', alignItems: 'center' }}>
          
          <div>
            <div style={{ color: 'var(--blue)', fontWeight: 800, fontSize: '0.85rem', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '1rem' }}>
              FIND US
            </div>
            <h2 style={{ fontSize: '2.5rem', color: 'var(--heading)', marginBottom: '1rem' }}>
              We're here for you.
            </h2>
            <p style={{ fontSize: '1rem', color: 'var(--body)', marginBottom: '2.5rem' }}>
              Visit your nearest Apollo Clinic center.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <div style={{ display: 'flex', gap: '1rem' }}>
                <MapPin className="text-blue" size={24} style={{ flexShrink: 0 }} />
                <span style={{ fontSize: '0.95rem', color: 'var(--body)' }}>
                  123, Health City, MG Road,<br/>Bangalore - 560001, India
                </span>
              </div>
              <div style={{ display: 'flex', gap: '1rem' }}>
                <Phone className="text-blue" size={24} style={{ flexShrink: 0 }} />
                <span style={{ fontSize: '0.95rem', color: 'var(--body)' }}>
                  {PHONE}
                </span>
              </div>
              <div style={{ display: 'flex', gap: '1rem' }}>
                <Mail className="text-blue" size={24} style={{ flexShrink: 0 }} />
                <span style={{ fontSize: '0.95rem', color: 'var(--body)' }}>
                  {EMAIL}
                </span>
              </div>
              <div style={{ display: 'flex', gap: '1rem' }}>
                <Clock className="text-blue" size={24} style={{ flexShrink: 0 }} />
                <span style={{ fontSize: '0.95rem', color: 'var(--body)' }}>
                  {TIMINGS}
                </span>
              </div>
            </div>
          </div>

          <div style={{ borderRadius: '24px', overflow: 'hidden', height: '400px', boxShadow: '0 10px 30px rgba(0,0,0,0.05)' }}>
            <iframe 
              src={MAPS_EMBED}
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen="" 
              loading="lazy"
            />
          </div>
        </div>
      </section>

      {/* ─── FAQs ─── */}
      <section style={{ padding: '5rem 0', background: '#f8fafc' }}>
        <div className="container" style={{ maxWidth: '1400px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '3.5rem' }}>
            <div>
              <h2 style={{ fontSize: '2.5rem', color: 'var(--heading)', margin: 0, marginBottom: '0.5rem' }}>FAQs</h2>
              <p style={{ fontSize: '1rem', color: 'var(--body)', margin: 0 }}>Find answers to common questions.</p>
            </div>
            <button className="btn-ghost" style={{ color: 'var(--blue)', fontWeight: 600, fontSize: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              View All FAQs <ArrowRight size={18} />
            </button>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
            {[
              "How do I book an appointment?",
              "How can I access my test reports?",
              "Do you accept health insurance?",
              "Do you offer home sample collection?",
              "What are your clinic timings?",
              "What should I carry during my visit?"
            ].map((q, i) => (
              <div key={i} className="faq-item" style={{ background: '#fff', border: '1px solid var(--border)', borderRadius: '12px' }}>
                <button className="faq-question" style={{ width: '100%', padding: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left', fontWeight: 600, fontSize: '1rem', color: 'var(--heading)' }}>
                  {q}
                  <ChevronDown size={20} className="text-muted" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FOOTER ─── */}
      <footer style={{ background: '#fff', borderTop: '1px solid var(--border)', padding: '4rem 0 2rem' }}>
        <div className="container" style={{ maxWidth: '1400px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr 1fr 1fr 1.2fr', gap: '3rem', marginBottom: '4rem' }}>
            
            <div>
              <img src="/logo.jpg" alt="Apollo Clinic" style={{ height: '40px', marginBottom: '1.5rem' }} />
              <p style={{ fontSize: '0.85rem', color: 'var(--body)', lineHeight: 1.6, marginBottom: '1.5rem' }}>
                Apollo Clinic is committed to delivering quality healthcare with compassion, innovation and integrity.
              </p>
              <div style={{ display: 'flex', gap: '1rem', color: 'var(--heading)' }}>
                <Facebook size={20} style={{ cursor: 'pointer' }} />
                <Instagram size={20} style={{ cursor: 'pointer' }} />
                <Youtube size={20} style={{ cursor: 'pointer' }} />
                <Linkedin size={20} style={{ cursor: 'pointer' }} />
              </div>
            </div>

            <div>
              <h4 style={{ fontSize: '1rem', color: 'var(--heading)', marginBottom: '1.5rem' }}>Quick Links</h4>
              {['Home', 'Services', 'Doctors', 'Diagnostics', 'About Us', 'Reports'].map(l => (
                <div key={l} style={{ fontSize: '0.9rem', color: 'var(--body)', marginBottom: '0.75rem', cursor: 'pointer' }}>{l}</div>
              ))}
            </div>

            <div>
              <h4 style={{ fontSize: '1rem', color: 'var(--heading)', marginBottom: '1.5rem' }}>Our Services</h4>
              {['Consultation', 'Diagnostics', 'Health Checkups', 'Specialty Care', 'Vaccination', 'Chronic Care'].map(l => (
                <div key={l} style={{ fontSize: '0.9rem', color: 'var(--body)', marginBottom: '0.75rem', cursor: 'pointer' }}>{l}</div>
              ))}
            </div>

            <div>
              <h4 style={{ fontSize: '1rem', color: 'var(--heading)', marginBottom: '1.5rem' }}>Contact Us</h4>
              <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '1rem' }}>
                <MapPin size={18} className="text-muted" style={{ flexShrink: 0 }} />
                <span style={{ fontSize: '0.85rem', color: 'var(--body)' }}>123, Health City, MG Road,<br/>Bangalore - 560001, India</span>
              </div>
              <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '1rem' }}>
                <Phone size={18} className="text-muted" style={{ flexShrink: 0 }} />
                <span style={{ fontSize: '0.85rem', color: 'var(--body)' }}>{PHONE}</span>
              </div>
              <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '1rem' }}>
                <Mail size={18} className="text-muted" style={{ flexShrink: 0 }} />
                <span style={{ fontSize: '0.85rem', color: 'var(--body)' }}>{EMAIL}</span>
              </div>
              <div style={{ display: 'flex', gap: '0.75rem' }}>
                <Clock size={18} className="text-muted" style={{ flexShrink: 0 }} />
                <span style={{ fontSize: '0.85rem', color: 'var(--body)' }}>{TIMINGS}</span>
              </div>
            </div>

            <div>
              <h4 style={{ fontSize: '1rem', color: 'var(--heading)', marginBottom: '1.5rem' }}>Stay Updated</h4>
              <p style={{ fontSize: '0.85rem', color: 'var(--body)', marginBottom: '1rem' }}>Subscribe to our newsletter for health tips and updates.</p>
              <input 
                type="email" 
                placeholder="Enter your email" 
                style={{ width: '100%', padding: '0.75rem 1rem', borderRadius: '8px', border: '1px solid var(--border)', marginBottom: '1rem', fontSize: '0.9rem' }} 
              />
              <button className="btn btn-blue" style={{ width: '100%', borderRadius: '8px', padding: '0.75rem' }}>Subscribe</button>
            </div>

          </div>

          <div style={{ borderTop: '1px solid var(--border)', paddingTop: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
            <div style={{ fontSize: '0.85rem', color: 'var(--muted)' }}>
              © 2024 Apollo Clinic. All rights reserved.
            </div>
            <div style={{ display: 'flex', gap: '2rem', fontSize: '0.85rem', color: 'var(--muted)' }}>
              <span style={{ cursor: 'pointer' }}>Privacy Policy</span>
              <span style={{ cursor: 'pointer' }}>Terms & Conditions</span>
              <span style={{ cursor: 'pointer' }}>Sitemap</span>
            </div>
          </div>
        </div>
      </footer>

    </div>
  );
};

export default Home;
