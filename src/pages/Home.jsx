import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Phone, MapPin, ArrowRight, Calendar, CheckCircle,
  Clock, Star, ChevronDown, Heart,
  Stethoscope, ShieldCheck, 
  Baby, HeartPulse, Syringe, Users, ChevronRight,
  ChevronLeft, Mail,
} from 'lucide-react';

import { SPECIALTIES } from './Services';
import { ALL_DOCTORS } from './OurDoctors';
import { DIAGNOSTICS_CATEGORIES } from './Diagnostics';

import { PRIMARY_PHONE, PRIMARY_PHONE_HREF, CLINIC_EMAIL, WORKING_HOURS } from '../config/contact';

/* ─── Constants ─── */
const MAPS_EMBED = 'https://maps.google.com/maps?q=34.0806043,74.7988594&hl=en&z=17&output=embed&iwloc=near';

const REVIEWS = [
  { quote: "Excellent care and professional staff. The doctors explained everything clearly and patiently.", author: "Anjali S.", img: "/patient-anjali.png" },
  { quote: "Very clean and well-organized clinic. Got my reports quickly and the staff was very helpful.", author: "Rahul K.", img: "/patient-rahul.png" },
  { quote: "I highly recommend Apollo Clinic for anyone looking for quality healthcare and genuine care.", author: "Meena T.", img: "/patient-meena.png" },
  { quote: "The pediatric department is wonderful. My kids feel very comfortable with the doctors here.", author: "Sunita M.", img: "/patient-anjali.png" },
  { quote: "State-of-the-art facilities and a very smooth booking process. Saved me a lot of time.", author: "Vikram R.", img: "/patient-rahul.png" },
  { quote: "Their preventive health checkups are very comprehensive. Great value for money.", author: "Neha P.", img: "/patient-meena.png" },
];

const Home = () => {
  const navigate = useNavigate();
  const [activeFaq, setActiveFaq] = useState(null);

  const servicesRef = useRef(null);
  const doctorsRef = useRef(null);
  const reviewsRef = useRef(null);

  const scrollContainer = (ref, direction) => {
    if (ref.current) {
      const scrollAmount = direction === 'left' ? -350 : 350;
      ref.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  const toggleFaq = (index) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  const goBook = () => navigate('/book');
  const goTo = (path) => navigate(path);

  return (
    <>
      {/* ─── HERO SECTION ─── */}
      <section className="hero-section" style={{ padding: '6rem 0', background: 'linear-gradient(to bottom, #f8fafc, #fff)' }}>
        <div className="container m-grid-1" style={{ maxWidth: '1400px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'center' }}>
          
          <div className="m-center" style={{ maxWidth: '600px' }}>
            <div style={{ color: 'var(--blue)', fontWeight: 800, fontSize: '0.85rem', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '1rem' }}>
              WELCOME TO APOLLO CLINIC
            </div>
            
            <h1 style={{ fontSize: '4.5rem', lineHeight: 1.1, marginBottom: '1rem', color: 'var(--navy)' }}>
              Expertise.<br/>
              <span className="text-orange">Closer to you.</span>
            </h1>
            
            <p style={{ fontSize: '1.1rem', color: 'var(--body)', marginBottom: '2rem', lineHeight: 1.6 }}>
              World-class healthcare with compassionate care.<br/>
              Your health is our priority.
            </p>

            <div className="m-wrap" style={{ display: 'flex', gap: '1rem', marginBottom: '2.5rem' }}>
              <button className="btn btn-blue btn-lg" onClick={goBook} style={{ padding: '1rem 2rem', fontSize: '1rem' }}>
                Book Appointment <Calendar size={18} />
              </button>
              <button className="btn btn-white btn-lg" onClick={() => goTo('/services')} style={{ padding: '1rem 2rem', fontSize: '1rem', border: '1px solid var(--border)' }}>
                Explore Services <ArrowRight size={18} />
              </button>
            </div>

            {/* Trust Indicators — become compact chips on mobile */}
            <div className="trust-indicators" style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
              <div className="trust-chip" style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                <Users className="text-blue" size={20} />
                <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--heading)' }}>Top Specialists</span>
              </div>
              <div className="trust-chip" style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                <ShieldCheck className="text-blue" size={20} />
                <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--heading)' }}>Advanced Technology</span>
              </div>
              <div className="trust-chip" style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                <Heart className="text-blue" size={20} />
                <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--heading)' }}>Patient First</span>
              </div>
            </div>
          </div>

          {/* Hero Image */}
          <div className="hero-image" style={{ borderRadius: '24px', overflow: 'hidden', boxShadow: '0 20px 40px rgba(0,0,0,0.08)' }}>
            <img src="/APOLLO-receptionist-image.png" alt="Apollo Clinic Srinagar Interior" style={{ width: '100%', height: 'auto', display: 'block' }} />
          </div>
        </div>
      </section>

      {/* ─── OUR SERVICES ─── */}
      <section style={{ padding: '5rem 0', background: '#fff', textAlign: 'center' }}>
        <div className="container" style={{ maxWidth: '1400px', position: 'relative' }}>
          <div className="section-header">
            <div style={{ color: 'var(--blue)', fontWeight: 800, fontSize: '0.85rem', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '0.75rem' }}>
              OUR SERVICES
            </div>
            <h2 style={{ fontSize: '2.5rem', color: 'var(--heading)', marginBottom: '2rem' }}>
              Comprehensive care for you and your family.
            </h2>
          </div>

          <div 
            ref={servicesRef}
            className="carousel-container no-scrollbar"
            style={{ 
              display: 'flex', gap: '1.5rem', overflowX: 'auto', paddingBottom: '1rem', scrollbarWidth: 'none', msOverflowStyle: 'none', scrollSnapType: 'x mandatory'
            }}
          >
            {SPECIALTIES.map((s, i) => (
              <div key={i} className="card service-card" onClick={() => goTo('/services')} style={{ flex: '0 0 calc((100% - 4.5rem) / 4)', padding: '2rem 1.5rem', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', cursor: 'pointer', scrollSnapAlign: 'start' }}>
                <div style={{ width: '56px', height: '56px', borderRadius: '50%', background: 'var(--blue-light)', color: 'var(--blue)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.25rem' }}>
                  {s.icon}
                </div>
                <h3 style={{ fontSize: '1.05rem', marginBottom: '0.5rem' }}>{s.name}</h3>
                <p style={{ fontSize: '0.85rem', color: 'var(--body)', marginBottom: '1.25rem', flex: 1 }}>{s.desc}</p>
                <span style={{ color: 'var(--blue)', fontWeight: 600, fontSize: '0.88rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  Learn More <ArrowRight size={15} />
                </span>
              </div>
            ))}
          </div>

          <style>{`.no-scrollbar::-webkit-scrollbar { display: none; }`}</style>

          {/* Scroll Arrows */}
          <div className="scroll-arrow" onClick={() => scrollContainer(servicesRef, 'left')} style={{ position: 'absolute', left: '-24px', top: '55%', transform: 'translateY(-50%)', width: '48px', height: '48px', background: '#fff', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 12px rgba(0,0,0,0.1)', cursor: 'pointer', zIndex: 10 }}>
            <ChevronLeft size={24} color="var(--blue)" />
          </div>
          <div className="scroll-arrow" onClick={() => scrollContainer(servicesRef, 'right')} style={{ position: 'absolute', right: '-24px', top: '55%', transform: 'translateY(-50%)', width: '48px', height: '48px', background: '#fff', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 12px rgba(0,0,0,0.1)', cursor: 'pointer', zIndex: 10 }}>
            <ChevronRight size={24} color="var(--blue)" />
          </div>
        </div>
      </section>

      {/* ─── OUR DOCTORS ─── */}
      <section style={{ padding: '5rem 0', background: '#f8fafc' }}>
        <div className="container" style={{ maxWidth: '1400px', position: 'relative' }}>
          <div className="section-header m-stack" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '2rem' }}>
            <div>
              <div style={{ color: 'var(--blue)', fontWeight: 800, fontSize: '0.85rem', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '0.75rem' }}>
                OUR DOCTORS
              </div>
              <h2 style={{ fontSize: '2.5rem', color: 'var(--heading)', margin: 0 }}>
                Highly experienced specialists dedicated to your health.
              </h2>
            </div>
            <button className="view-all-link" onClick={() => goTo('/doctors')} style={{ color: 'var(--blue)', fontWeight: 600, fontSize: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'inherit', whiteSpace: 'nowrap' }}>
              View All Doctors <ArrowRight size={18} />
            </button>
          </div>

          <div 
            ref={doctorsRef}
            className="carousel-container no-scrollbar"
            style={{ display: 'flex', gap: '1.5rem', overflowX: 'auto', paddingBottom: '1rem', scrollbarWidth: 'none', msOverflowStyle: 'none', scrollSnapType: 'x mandatory' }}
          >
            {ALL_DOCTORS.map((d, i) => (
              <div key={i} className="card doctor-card" onClick={() => goTo(`/doctors/${d.id}`)} style={{ flex: '0 0 calc((100% - 4.5rem) / 4)', padding: 0, overflow: 'hidden', cursor: 'pointer', scrollSnapAlign: 'start' }}>
                <img src={d.image} alt={d.name} style={{ width: '100%', height: '220px', objectFit: 'cover' }} />
                <div className="card-body" style={{ padding: '1.25rem' }}>
                  <h3 style={{ fontSize: '1.1rem', color: 'var(--blue)', marginBottom: '0.2rem' }}>{d.name}</h3>
                  <p style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--navy)', marginBottom: '0.2rem' }}>{d.title || d.specialty}</p>
                  <p style={{ fontSize: '0.78rem', color: 'var(--body)', marginBottom: '0.5rem' }}>{d.qual}</p>
                  <p style={{ fontSize: '0.82rem', color: 'var(--muted)', margin: 0 }}>{d.exp} experience</p>
                </div>
              </div>
            ))}
          </div>

          {/* Scroll Arrows */}
          <div className="scroll-arrow" onClick={() => scrollContainer(doctorsRef, 'left')} style={{ position: 'absolute', left: '-24px', top: '55%', transform: 'translateY(-50%)', width: '48px', height: '48px', background: '#fff', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 12px rgba(0,0,0,0.1)', cursor: 'pointer', zIndex: 10 }}>
            <ChevronLeft size={24} color="var(--blue)" />
          </div>
          <div className="scroll-arrow" onClick={() => scrollContainer(doctorsRef, 'right')} style={{ position: 'absolute', right: '-24px', top: '55%', transform: 'translateY(-50%)', width: '48px', height: '48px', background: '#fff', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 12px rgba(0,0,0,0.1)', cursor: 'pointer', zIndex: 10 }}>
            <ChevronRight size={24} color="var(--blue)" />
          </div>
        </div>
      </section>

      {/* ─── LAB & DIAGNOSTICS ─── */}
      <section style={{ padding: '6rem 0', background: '#f8fafc' }}>
        <div className="container" style={{ maxWidth: '1400px' }}>
          
          <div className="section-header m-stack" style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <div style={{ color: 'var(--blue)', fontWeight: 800, fontSize: '0.85rem', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '0.75rem' }}>
              LAB & DIAGNOSTICS
            </div>
            <h2 style={{ fontSize: '2.5rem', color: 'var(--heading)', margin: 0, marginBottom: '1rem' }}>
              Advanced testing.<br/>Precise results.
            </h2>
            <p style={{ fontSize: '1.05rem', color: 'var(--body)', maxWidth: '600px', margin: '0 auto' }}>
              State-of-the-art laboratories and advanced diagnostic imaging for accurate and timely results.
            </p>
          </div>

          <div className="diag-categories-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem', textAlign: 'left' }}>
            {DIAGNOSTICS_CATEGORIES.map((cat, i) => (
              <div key={i} className="diag-category-card" style={{ 
                background: '#fff', borderRadius: '16px', padding: '2rem', 
                border: '1px solid rgba(0,0,0,0.05)', boxShadow: '0 4px 20px rgba(0,0,0,0.02)',
                display: 'flex', flexDirection: 'column',
                transition: 'all 0.3s ease', cursor: 'pointer', height: '100%'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-5px)';
                e.currentTarget.style.boxShadow = '0 12px 30px rgba(13,82,192,0.1)';
                e.currentTarget.style.borderColor = 'rgba(13,82,192,0.15)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.02)';
                e.currentTarget.style.borderColor = 'rgba(0,0,0,0.05)';
              }}
              onClick={() => goTo('/diagnostics')}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.25rem' }}>
                  <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'var(--blue-light)', color: 'var(--blue)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    {cat.icon}
                  </div>
                  <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--navy)', margin: 0, lineHeight: 1.2 }}>
                    {cat.name}
                  </h3>
                </div>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', marginBottom: '2rem', flexGrow: 1 }}>
                  <ul style={{ listStyleType: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                    {cat.tests.slice(0, 4).map((test, j) => (
                      <li key={j} style={{ fontSize: '0.85rem', color: 'var(--body)', display: 'flex', alignItems: 'flex-start', gap: '0.4rem' }}>
                        <span style={{ color: 'var(--blue)', marginTop: '2px' }}>•</span>
                        <span>{test}</span>
                      </li>
                    ))}
                    {cat.tests.length > 4 && (
                      <li style={{ fontSize: '0.8rem', color: 'var(--blue)', fontWeight: 600, marginTop: '0.2rem' }}>
                        + {cat.tests.length - 4} more
                      </li>
                    )}
                  </ul>
                </div>

                <div style={{ 
                  color: 'var(--blue)', fontWeight: 600, fontSize: '0.9rem', 
                  display: 'flex', alignItems: 'center', gap: '0.4rem', marginTop: 'auto'
                }}>
                  View Diagnostics <ArrowRight size={16} />
                </div>
              </div>
            ))}
          </div>
          
        </div>
      </section>

      {/* ─── PATIENT FEEDBACK ─── */}
      <section style={{ padding: '5rem 0', background: '#f8fafc' }}>
        <div className="container" style={{ maxWidth: '1400px', position: 'relative' }}>
          <div className="section-header m-stack" style={{ textAlign: 'center', marginBottom: '2rem', position: 'relative' }}>
            <div style={{ color: 'var(--blue)', fontWeight: 800, fontSize: '0.85rem', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '0.75rem' }}>
              PATIENT FEEDBACK
            </div>
            <h2 style={{ fontSize: '2.5rem', color: 'var(--heading)', margin: 0, marginBottom: '0.75rem' }}>
              Trusted by thousands of patients and families.
            </h2>
            <button className="view-all-link" onClick={() => goTo('/about')} style={{ color: 'var(--blue)', fontWeight: 600, fontSize: '0.95rem', display: 'inline-flex', alignItems: 'center', gap: '0.4rem', background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'inherit' }}>
              View All Reviews <ArrowRight size={16} />
            </button>
          </div>

          <div 
            ref={reviewsRef}
            className="carousel-container no-scrollbar"
            style={{ display: 'flex', gap: '1.5rem', overflowX: 'auto', paddingBottom: '1rem', scrollbarWidth: 'none', msOverflowStyle: 'none', scrollSnapType: 'x mandatory' }}
          >
            {REVIEWS.map((r, i) => (
              <div key={i} className="card review-card" style={{ flex: '0 0 calc((100% - 3rem) / 3)', padding: '2rem', display: 'flex', flexDirection: 'column', scrollSnapAlign: 'start' }}>
                <div style={{ display: 'flex', gap: '0.2rem', color: '#f59e0b', marginBottom: '1rem' }}>
                  {[1,2,3,4,5].map(star => <Star key={star} size={18} fill="currentColor" />)}
                </div>
                <p style={{ fontSize: '0.95rem', color: 'var(--body)', marginBottom: '1.5rem', flex: 1, fontStyle: 'italic', lineHeight: 1.6 }}>"{r.quote}"</p>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontWeight: 600, color: 'var(--heading)', fontSize: '0.9rem' }}>— {r.author}</span>
                  <img src={r.img} alt={r.author} style={{ width: '40px', height: '40px', borderRadius: '50%', objectFit: 'cover' }} />
                </div>
              </div>
            ))}
          </div>
            
          {/* Arrows */}
          <div className="scroll-arrow" onClick={() => scrollContainer(reviewsRef, 'left')} style={{ position: 'absolute', left: '-24px', top: '55%', transform: 'translateY(-50%)', width: '48px', height: '48px', background: '#fff', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 12px rgba(0,0,0,0.1)', cursor: 'pointer', zIndex: 10 }}>
            <ChevronLeft size={24} color="var(--blue)" />
          </div>
          <div className="scroll-arrow" onClick={() => scrollContainer(reviewsRef, 'right')} style={{ position: 'absolute', right: '-24px', top: '55%', transform: 'translateY(-50%)', width: '48px', height: '48px', background: '#fff', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 12px rgba(0,0,0,0.1)', cursor: 'pointer', zIndex: 10 }}>
            <ChevronRight size={24} color="var(--blue)" />
          </div>
        </div>
      </section>

      {/* ─── FIND US ─── */}
      <section style={{ padding: '5rem 0', background: '#fff' }}>
        <div className="container m-grid-1" style={{ maxWidth: '1400px', display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '3rem', alignItems: 'center' }}>
          
          <div className="m-center">
            <div style={{ color: 'var(--blue)', fontWeight: 800, fontSize: '0.85rem', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '0.75rem' }}>
              FIND US
            </div>
            <h2 style={{ fontSize: '2.5rem', color: 'var(--heading)', marginBottom: '0.75rem' }}>
              We're here for you.
            </h2>
            <p style={{ fontSize: '1rem', color: 'var(--body)', marginBottom: '1.75rem' }}>
              Visit your nearest Apollo Clinic center.
            </p>

            <div className="contact-info" style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                <MapPin className="text-blue" size={20} style={{ flexShrink: 0, marginTop: '2px' }} />
                <span style={{ fontSize: '0.9rem', color: 'var(--body)' }}>
                  Near National School, Arham Towers,<br/>Karan Nagar, Srinagar
                </span>
              </div>
              <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                <Phone className="text-blue" size={20} style={{ flexShrink: 0 }} />
                <a href={PRIMARY_PHONE_HREF} style={{ fontSize: '0.9rem', color: 'var(--body)', textDecoration: 'none' }}>
                  {PRIMARY_PHONE}
                </a>
              </div>
              <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                <Mail className="text-blue" size={20} style={{ flexShrink: 0 }} />
                <span style={{ fontSize: '0.9rem', color: 'var(--body)' }}>
                  {CLINIC_EMAIL}
                </span>
              </div>
              <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                <Clock className="text-blue" size={20} style={{ flexShrink: 0 }} />
                <span style={{ fontSize: '0.9rem', color: 'var(--body)' }}>
                  {WORKING_HOURS.weekdays.label.replace('Monday – Saturday', 'Mon–Sat')}: {WORKING_HOURS.weekdays.time.replace('08:00 AM – 07:00 PM', '8 AM–7 PM')} · {WORKING_HOURS.sunday.label}: {WORKING_HOURS.sunday.time.replace('08:00 AM – 02:00 PM', '8 AM–2 PM')}
                </span>
              </div>
            </div>
          </div>

          <div className="map-container" style={{ borderRadius: '20px', overflow: 'hidden', height: '380px', boxShadow: '0 8px 24px rgba(0,0,0,0.06)', border: '1px solid var(--border)' }}>
            <iframe 
              src={MAPS_EMBED}
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen="" 
              loading="lazy"
              title="Apollo Clinic Srinagar Location"
            />
          </div>
        </div>
      </section>

      {/* ─── FAQs ─── */}
      <section style={{ padding: '5rem 0', background: '#f8fafc' }}>
        <div className="container" style={{ maxWidth: '1400px' }}>
          <div className="section-header m-stack" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '2rem' }}>
            <div>
              <h2 style={{ fontSize: '2.5rem', color: 'var(--heading)', margin: 0, marginBottom: '0.4rem' }}>FAQs</h2>
              <p style={{ fontSize: '0.95rem', color: 'var(--body)', margin: 0 }}>Find answers to common questions.</p>
            </div>
            <button className="view-all-link" onClick={() => goTo('/faq')} style={{ color: 'var(--blue)', fontWeight: 600, fontSize: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'inherit', whiteSpace: 'nowrap' }}>
              View All FAQs <ArrowRight size={18} />
            </button>
          </div>

          <div className="m-grid-1" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', alignItems: 'start' }}>
            {[
              { q: "How do I book an appointment?", a: "You can book an appointment by calling us directly, sending a WhatsApp message, or using the 'Book Appointment' button on our website." },
              { q: "How can I access my test reports?", a: "Test reports can be accessed online through our patient portal or collected in person at the clinic reception." },
              { q: "Do you accept health insurance?", a: "Yes, we accept all major health insurance plans. Please contact our reception desk for specific details regarding your provider." },
              { q: "Do you offer home sample collection?", a: "Yes, we offer convenient home sample collection services for most diagnostic tests. Contact us to schedule a pickup." },
              { q: "What are your clinic timings?", a: `We are open ${WORKING_HOURS.weekdays.label} from ${WORKING_HOURS.weekdays.time}, and on ${WORKING_HOURS.sunday.label} from ${WORKING_HOURS.sunday.time}.` },
              { q: "What should I carry during my visit?", a: "Please bring your valid ID, previous medical records, and any current prescriptions or test reports." }
            ].map((faq, i) => (
              <div key={i} className="faq-item" style={{ background: '#fff', border: '1px solid var(--border)', borderRadius: '12px', overflow: 'hidden' }}>
                <button 
                  onClick={() => toggleFaq(i)}
                  style={{ width: '100%', padding: '1.25rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left', fontWeight: 600, fontSize: '0.95rem', color: 'var(--heading)', fontFamily: 'inherit' }}
                >
                  {faq.q}
                  <ChevronDown size={18} className="text-muted" style={{ transform: activeFaq === i ? 'rotate(180deg)' : 'rotate(0)', transition: 'transform 0.3s', flexShrink: 0, marginLeft: '0.75rem' }} />
                </button>
                {activeFaq === i && (
                  <div style={{ padding: '0 1.25rem 1.25rem', color: 'var(--body)', fontSize: '0.9rem', lineHeight: 1.6 }}>
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
