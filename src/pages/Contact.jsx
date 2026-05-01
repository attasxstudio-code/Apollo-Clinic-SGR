import React from 'react';
import { Phone, MapPin, Clock, MessageCircle, Calendar } from 'lucide-react';
import BookingForm from '../components/BookingForm';
import { Link } from 'react-router-dom';

import { PRIMARY_PHONE, PRIMARY_PHONE_HREF, waLink, WORKING_HOURS } from '../config/contact';

const Contact = () => (
  <div>
    {/* ── Page Hero ── */}
    <section className="page-hero">
      <div className="container text-center" style={{ position: 'relative', zIndex: 1 }}>
        <span className="pill" style={{ background: 'rgba(255,255,255,0.15)', color: '#fff', border: '1px solid rgba(255,255,255,0.3)', marginBottom: '1.25rem', display: 'inline-flex' }}>
          📍 Contact Us
        </span>
        <h1 style={{ color: '#fff', marginBottom: '1.1rem', fontSize: 'clamp(2rem,5vw,3.2rem)' }}>
          Get In Touch With Us
        </h1>
        <p style={{ color: 'rgba(255,255,255,0.82)', fontSize: '1.1rem', maxWidth: '580px', margin: '0 auto', lineHeight: 1.7 }}>
          Book an appointment, ask a question, or simply find us. We're here Mon–Sun at Karan Nagar, Srinagar.
        </p>
      </div>
    </section>

    {/* ── Quick contact strip ── */}
    <section style={{ background: '#fff', padding: '2.5rem 0', borderBottom: '1px solid #e2e8f0' }}>
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))', gap: '1rem' }}>
          {[
            { icon: <Phone size={20} color="#0369a1" />, label: 'Call Us', value: PRIMARY_PHONE, href: PRIMARY_PHONE_HREF },
            { icon: <MessageCircle size={20} color="#25D366" />, label: 'WhatsApp', value: 'Chat Now →', href: waLink('Hello! I would like to book an appointment at Apollo Clinic Srinagar.'), ext: true },
            { icon: <Clock size={20} color="#0369a1" />, label: `${WORKING_HOURS.weekdays.label.replace('Monday – Saturday', 'Mon–Sat')} Hours`, value: WORKING_HOURS.weekdays.time.replace('08:00 AM – 07:00 PM', '8 AM–7 PM'), href: null },
            { icon: <MapPin size={20} color="#0369a1" />, label: 'Address', value: 'Karan Nagar, Srinagar', href: 'https://maps.google.com/?q=34.0806043,74.7988594', ext: true },
          ].map((item, i) => (
            <div key={i} style={{
              display: 'flex', alignItems: 'center', gap: '0.875rem',
              padding: '1.1rem 1.25rem', borderRadius: '14px',
              border: '1.5px solid #e2e8f0', background: '#fafcff',
              transition: 'all 0.25s',
            }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = '#0ea5e9'; e.currentTarget.style.boxShadow = '0 4px 20px rgba(14,165,233,0.1)'; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = '#e2e8f0'; e.currentTarget.style.boxShadow = 'none'; }}
            >
              <div style={{ width: 40, height: 40, borderRadius: '10px', background: 'linear-gradient(135deg,#e0f2fe,#d1fae5)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                {item.icon}
              </div>
              <div>
                <p style={{ color: '#94a3b8', fontSize: '0.74rem', fontWeight: 600, margin: 0, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{item.label}</p>
                {item.href
                  ? <a href={item.href} target={item.ext ? '_blank' : undefined} rel="noreferrer" style={{ color: '#0c4a6e', fontWeight: 700, fontSize: '0.9rem', textDecoration: 'none' }}>{item.value}</a>
                  : <span style={{ color: '#0c4a6e', fontWeight: 700, fontSize: '0.9rem' }}>{item.value}</span>
                }
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* ── Main content ── */}
    <section style={{ background: 'linear-gradient(180deg,#f8fafc,#fff)', padding: '5rem 0' }}>
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '3rem', alignItems: 'start' }}>

          {/* Left: Info */}
          <div>
            {/* Hours card */}
            <div className="info-box" style={{ marginBottom: '1.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '1.1rem' }}>
                <div style={{ width: 38, height: 38, borderRadius: '10px', background: 'linear-gradient(135deg,#0369a1,#0ea5e9)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Clock size={17} color="#fff" />
                </div>
                <h3 style={{ color: '#0c4a6e', fontWeight: 800, fontSize: '1rem', margin: 0 }}>Clinic Hours</h3>
              </div>
              {Object.values(WORKING_HOURS).map((t, i) => (
                <div key={i} className="timing-row">
                  <span className="timing-day">{t.label}</span>
                  <span className={`timing-time timing-open`}>{t.time}</span>
                </div>
              ))}
              <div style={{ marginTop: '1rem', padding: '0.75rem', background: 'rgba(5,150,105,0.07)', borderRadius: '10px', border: '1px solid rgba(5,150,105,0.15)' }}>
                <p style={{ color: '#047857', fontWeight: 600, fontSize: '0.82rem', margin: 0 }}>
                  ✅ Walk-ins welcome. Prior appointment recommended for specialist care.
                </p>
              </div>
            </div>

            {/* Address + map */}
            <div className="info-box" style={{ marginBottom: '1.5rem', overflow: 'hidden', padding: 0 }}>
              <div style={{ background: 'linear-gradient(135deg,#0369a1,#0ea5e9)', padding: '0.85rem 1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <MapPin size={15} color="#fff" />
                <span style={{ color: '#fff', fontWeight: 700, fontSize: '0.88rem' }}>Near National School, Arham Towers, Karan Nagar, Srinagar</span>
              </div>
              <iframe
                width="100%"
                height="220"
                style={{ border: 0, display: 'block' }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                src="https://maps.google.com/maps?q=34.0806043,74.7988594&hl=en&z=17&output=embed&iwloc=near"
                title="Apollo Clinic - Karan Nagar, Srinagar"
              />
              <div style={{ padding: '1rem 1.25rem' }}>
                <a
                  href="https://maps.google.com/?q=34.0806043,74.7988594"
                  target="_blank" rel="noreferrer"
                  style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', color: '#0369a1', fontWeight: 700, fontSize: '0.85rem' }}
                >
                  <MapPin size={14} /> Get Directions →
                </a>
              </div>
            </div>

            {/* Quick contact buttons */}
            <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
              <a href={PRIMARY_PHONE_HREF} className="btn btn-call" style={{ flex: 1, minWidth: 150 }}>
                <Phone size={16} /> Call Now
              </a>
              <a href={waLink('Hello! I would like to book an appointment at Apollo Clinic Srinagar.')} target="_blank" rel="noreferrer" className="btn btn-whatsapp" style={{ flex: 1, minWidth: 150 }}>
                <svg width={16} height={16} viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>
                WhatsApp
              </a>
            </div>
          </div>

          {/* Right: Booking form */}
          <div>
            <div style={{ marginBottom: '1.25rem' }}>
              <span className="pill" style={{ marginBottom: '0.65rem', display: 'inline-flex' }}>📅 Appointment</span>
              <h2 style={{ color: '#0c4a6e', fontSize: 'clamp(1.45rem,3.5vw,2rem)', marginBottom: '0.5rem' }}>Book Your Visit</h2>
              <p style={{ color: '#64748b', margin: 0, fontSize: '0.95rem' }}>Fill out the form and we'll confirm your appointment as soon as possible.</p>
            </div>
            <BookingForm />
          </div>
        </div>
      </div>
    </section>

    <style>{`
      @media (max-width: 768px) {
        .contact-main-grid { grid-template-columns: 1fr !important; }
        .contact-strip-grid { grid-template-columns: 1fr 1fr !important; }
      }
      @media (max-width: 480px) {
        .contact-strip-grid { grid-template-columns: 1fr !important; }
      }
    `}</style>
  </div>
);

export default Contact;
