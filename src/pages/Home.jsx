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

/* ─── Constants ─── */
const PHONE      = '+91 9149425496';
const PHONE_HREF = 'tel:+919149425496';
const EMAIL      = 'contact@apolloclinic.com';
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
              <img src="/APOLLO-receptionist-image.png" alt="Apollo Clinic Srinagar Interior" style={{ width: '100%', height: 'auto', display: 'block' }} />
            </div>
          </div>
        </div>
      </section>

      {/* ─── OUR SERVICES ─── */}
      <section style={{ padding: '5rem 0', background: '#fff', textAlign: 'center' }}>
        <div className="container" style={{ maxWidth: '1400px', position: 'relative' }}>
          <div style={{ color: 'var(--blue)', fontWeight: 800, fontSize: '0.85rem', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '1rem' }}>
            OUR SERVICES
          </div>
          <h2 style={{ fontSize: '2.5rem', color: 'var(--heading)', marginBottom: '3.5rem' }}>
            Comprehensive care for you and your family.
          </h2>

          <div 
            ref={servicesRef}
            style={{ 
              display: 'flex', gap: '1.5rem', overflowX: 'auto', paddingBottom: '1rem', scrollbarWidth: 'none', msOverflowStyle: 'none', scrollSnapType: 'x mandatory'
            }}
            className="no-scrollbar"
          >
            {SPECIALTIES.map((s, i) => (
              <div key={i} className="card" onClick={() => goTo('/services')} style={{ flex: '0 0 calc((100% - 7.5rem) / 6)', padding: '2rem 1.5rem', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', cursor: 'pointer', scrollSnapAlign: 'start' }}>
                <div style={{ width: '60px', height: '60px', borderRadius: '50%', background: 'var(--blue-light)', color: 'var(--blue)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem' }}>
                  {s.icon}
                </div>
                <h3 style={{ fontSize: '1.1rem', marginBottom: '0.75rem' }}>{s.name}</h3>
                <p style={{ fontSize: '0.85rem', color: 'var(--body)', marginBottom: '1.5rem', flex: 1 }}>{s.desc}</p>
                <span style={{ color: 'var(--blue)', fontWeight: 600, fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  Learn More <ArrowRight size={16} />
                </span>
              </div>
            ))}
          </div>

          <style>{`.no-scrollbar::-webkit-scrollbar { display: none; }`}</style>

          {/* Scroll Arrows */}
          <div onClick={() => scrollContainer(servicesRef, 'left')} style={{ position: 'absolute', left: '-24px', top: '55%', transform: 'translateY(-50%)', width: '48px', height: '48px', background: '#fff', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 12px rgba(0,0,0,0.1)', cursor: 'pointer', zIndex: 10 }}>
            <ChevronLeft size={24} color="var(--blue)" />
          </div>
          <div onClick={() => scrollContainer(servicesRef, 'right')} style={{ position: 'absolute', right: '-24px', top: '55%', transform: 'translateY(-50%)', width: '48px', height: '48px', background: '#fff', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 12px rgba(0,0,0,0.1)', cursor: 'pointer', zIndex: 10 }}>
            <ChevronRight size={24} color="var(--blue)" />
          </div>
        </div>
      </section>

      {/* ─── OUR DOCTORS ─── */}
      <section style={{ padding: '5rem 0', background: '#f8fafc' }}>
        <div className="container" style={{ maxWidth: '1400px', position: 'relative' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '3.5rem' }}>
            <div>
              <div style={{ color: 'var(--blue)', fontWeight: 800, fontSize: '0.85rem', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '1rem' }}>
                OUR DOCTORS
              </div>
              <h2 style={{ fontSize: '2.5rem', color: 'var(--heading)', margin: 0 }}>
                Highly experienced specialists dedicated to your health.
              </h2>
            </div>
            <button onClick={() => goTo('/doctors')} style={{ color: 'var(--blue)', fontWeight: 600, fontSize: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'inherit' }}>
              View All Doctors <ArrowRight size={18} />
            </button>
          </div>

          <div 
            ref={doctorsRef}
            style={{ display: 'flex', gap: '2rem', overflowX: 'auto', paddingBottom: '1rem', scrollbarWidth: 'none', msOverflowStyle: 'none', scrollSnapType: 'x mandatory' }}
            className="no-scrollbar"
          >
            {ALL_DOCTORS.map((d, i) => (
              <div key={i} className="card" onClick={() => goTo(`/doctors/${d.id}`)} style={{ flex: '0 0 calc((100% - 6rem) / 4)', padding: 0, overflow: 'hidden', cursor: 'pointer', scrollSnapAlign: 'start' }}>
                <img src={d.image} alt={d.name} style={{ width: '100%', height: '240px', objectFit: 'cover' }} />
                <div style={{ padding: '1.5rem' }}>
                  <h3 style={{ fontSize: '1.2rem', color: 'var(--blue)', marginBottom: '0.25rem' }}>{d.name}</h3>
                  <p style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--navy)', marginBottom: '0.25rem' }}>{d.title || d.specialty}</p>
                  <p style={{ fontSize: '0.8rem', color: 'var(--body)', marginBottom: '0.75rem' }}>{d.qual}</p>
                  <p style={{ fontSize: '0.85rem', color: 'var(--muted)', margin: 0 }}>{d.exp} experience</p>
                </div>
              </div>
            ))}
          </div>

          {/* Scroll Arrows */}
          <div onClick={() => scrollContainer(doctorsRef, 'left')} style={{ position: 'absolute', left: '-24px', top: '55%', transform: 'translateY(-50%)', width: '48px', height: '48px', background: '#fff', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 12px rgba(0,0,0,0.1)', cursor: 'pointer', zIndex: 10 }}>
            <ChevronLeft size={24} color="var(--blue)" />
          </div>
          <div onClick={() => scrollContainer(doctorsRef, 'right')} style={{ position: 'absolute', right: '-24px', top: '55%', transform: 'translateY(-50%)', width: '48px', height: '48px', background: '#fff', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 12px rgba(0,0,0,0.1)', cursor: 'pointer', zIndex: 10 }}>
            <ChevronRight size={24} color="var(--blue)" />
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

      {/* ─── PATIENT FEEDBACK ─── */}
      <section style={{ padding: '5rem 0', background: '#f8fafc' }}>
        <div className="container" style={{ maxWidth: '1400px', position: 'relative' }}>
          <div style={{ textAlign: 'center', marginBottom: '3.5rem', position: 'relative' }}>
            <div style={{ color: 'var(--blue)', fontWeight: 800, fontSize: '0.85rem', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '1rem' }}>
              PATIENT FEEDBACK
            </div>
            <h2 style={{ fontSize: '2.5rem', color: 'var(--heading)', margin: 0 }}>
              Trusted by thousands of patients and families.
            </h2>
            <button onClick={() => goTo('/about')} style={{ position: 'absolute', right: 0, bottom: '10px', color: 'var(--blue)', fontWeight: 600, fontSize: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'inherit' }}>
              View All Reviews <ArrowRight size={18} />
            </button>
          </div>

          <div 
            ref={reviewsRef}
            style={{ display: 'flex', gap: '2rem', overflowX: 'auto', paddingBottom: '1rem', scrollbarWidth: 'none', msOverflowStyle: 'none', scrollSnapType: 'x mandatory' }}
            className="no-scrollbar"
          >
            {REVIEWS.map((r, i) => (
              <div key={i} className="card" style={{ flex: '0 0 calc((100% - 4rem) / 3)', padding: '2.5rem', display: 'flex', flexDirection: 'column', scrollSnapAlign: 'start' }}>
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
          </div>
            
          {/* Arrows */}
          <div onClick={() => scrollContainer(reviewsRef, 'left')} style={{ position: 'absolute', left: '-24px', top: '55%', transform: 'translateY(-50%)', width: '48px', height: '48px', background: '#fff', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 12px rgba(0,0,0,0.1)', cursor: 'pointer', zIndex: 10 }}>
            <ChevronLeft size={24} color="var(--blue)" />
          </div>
          <div onClick={() => scrollContainer(reviewsRef, 'right')} style={{ position: 'absolute', right: '-24px', top: '55%', transform: 'translateY(-50%)', width: '48px', height: '48px', background: '#fff', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 12px rgba(0,0,0,0.1)', cursor: 'pointer', zIndex: 10 }}>
            <ChevronRight size={24} color="var(--blue)" />
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
                  Near National School, Arham Towers,<br/>Karan Nagar, Srinagar
                </span>
              </div>
              <div style={{ display: 'flex', gap: '1rem' }}>
                <Phone className="text-blue" size={24} style={{ flexShrink: 0 }} />
                <a href={PHONE_HREF} style={{ fontSize: '0.95rem', color: 'var(--body)', textDecoration: 'none' }}>
                  {PHONE}
                </a>
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
                  Mon–Sat: 12 PM–7 PM · Sun: 10 AM–1:30 PM
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
              title="Apollo Clinic Srinagar Location"
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
            <button onClick={() => goTo('/faq')} style={{ color: 'var(--blue)', fontWeight: 600, fontSize: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'inherit' }}>
              View All FAQs <ArrowRight size={18} />
            </button>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', alignItems: 'start' }}>
            {[
              { q: "How do I book an appointment?", a: "You can book an appointment by calling us directly, sending a WhatsApp message, or using the 'Book Appointment' button on our website." },
              { q: "How can I access my test reports?", a: "Test reports can be accessed online through our patient portal or collected in person at the clinic reception." },
              { q: "Do you accept health insurance?", a: "Yes, we accept all major health insurance plans. Please contact our reception desk for specific details regarding your provider." },
              { q: "Do you offer home sample collection?", a: "Yes, we offer convenient home sample collection services for most diagnostic tests. Contact us to schedule a pickup." },
              { q: "What are your clinic timings?", a: "We are open Monday to Saturday from 12 PM to 7 PM, and on Sundays from 10 AM to 1:30 PM." },
              { q: "What should I carry during my visit?", a: "Please bring your valid ID, previous medical records, and any current prescriptions or test reports." }
            ].map((faq, i) => (
              <div key={i} className="faq-item" style={{ background: '#fff', border: '1px solid var(--border)', borderRadius: '12px', overflow: 'hidden' }}>
                <button 
                  onClick={() => toggleFaq(i)}
                  style={{ width: '100%', padding: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left', fontWeight: 600, fontSize: '1rem', color: 'var(--heading)', fontFamily: 'inherit' }}
                >
                  {faq.q}
                  <ChevronDown size={20} className="text-muted" style={{ transform: activeFaq === i ? 'rotate(180deg)' : 'rotate(0)', transition: 'transform 0.3s', flexShrink: 0, marginLeft: '1rem' }} />
                </button>
                {activeFaq === i && (
                  <div style={{ padding: '0 1.5rem 1.5rem', color: 'var(--body)', fontSize: '0.95rem', lineHeight: 1.6 }}>
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
