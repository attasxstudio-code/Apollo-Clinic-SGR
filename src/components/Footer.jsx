import React from 'react';
import { Phone, MapPin, Clock, ShieldCheck } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

import { PRIMARY_PHONE, PRIMARY_PHONE_HREF, waLink, WORKING_HOURS } from '../config/contact';

const LINKS = {
  'Quick Links': [
    { label: 'Services',          path: '/services'    },
    { label: 'Find a Doctor',     path: '/doctors'     },
    { label: 'Diagnostics',       path: '/diagnostics' },
    { label: 'Book Appointment',  path: '/book'        },
    { label: 'View Reports',      path: '/reports'     },
  ],
  'Information': [
    { label: 'About Us',          path: '/about'    },
    { label: 'Contact & Timing',  path: '/contact'  },
    { label: 'Book a Checkup',    path: '/book-checkup' },
    { label: 'FAQ',               path: '/faq'      },
  ],
};

const Footer = () => {
  const navigate = useNavigate();
  const goTo = (path) => { navigate(path); window.scrollTo(0, 0); };

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">

          {/* Brand column */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1rem' }}>
              <img src="/logo.jpg" alt="Apollo Clinic Logo" style={{ height: '44px', objectFit: 'contain' }} />
            </div>

            <p style={{ color: 'var(--body)', fontSize: '0.85rem', lineHeight: 1.7, marginBottom: '1.25rem', maxWidth: 240 }}>
              Multi-speciality care with in-house diagnostics. Patient-centered medicine at Karan Nagar, Srinagar.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.55rem' }}>
              {[
                { icon: <Phone size={13} />, text: PRIMARY_PHONE, href: PRIMARY_PHONE_HREF },
                { icon: <MapPin size={13} />, text: 'Near National School, Arham Towers, Karan Nagar', href: null },
                { icon: <Clock size={13} />, text: `${WORKING_HOURS.weekdays.label.replace('Monday – Saturday', 'Mon–Sat')}: ${WORKING_HOURS.weekdays.time.replace('08:00 AM – 07:00 PM', '8 AM–7 PM')} · ${WORKING_HOURS.sunday.label}: ${WORKING_HOURS.sunday.time.replace('08:00 AM – 02:00 PM', '8 AM–2 PM')}`, href: null },
              ].map((item, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem' }}>
                  <span style={{ color: 'var(--blue)', flexShrink: 0, marginTop: '2px' }}>{item.icon}</span>
                  {item.href
                    ? <a href={item.href} style={{ color: 'var(--body)', fontSize: '0.82rem', textDecoration: 'none' }}>{item.text}</a>
                    : <span style={{ color: 'var(--body)', fontSize: '0.82rem', lineHeight: 1.55 }}>{item.text}</span>
                  }
                </div>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          {Object.entries(LINKS).map(([heading, items]) => (
            <div key={heading}>
              <div className="footer-heading">{heading}</div>
              {items.map(({ label, path }) => (
                <button key={label} className="footer-link" onClick={() => goTo(path)}>
                  {label}
                </button>
              ))}
            </div>
          ))}

          {/* Contact CTA */}
          <div>
            <div className="footer-heading">Book a Visit</div>
            <p style={{ color: 'var(--body)', fontSize: '0.82rem', marginBottom: '1rem', lineHeight: 1.6 }}>
              Call us or send a WhatsApp message to schedule your appointment.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
              <a href={PRIMARY_PHONE_HREF} className="btn btn-outline-blue" style={{
                display: 'flex', alignItems: 'center', gap: '0.45rem', justifyContent: 'center',
                padding: '0.65rem 1rem', fontSize: '0.85rem', textDecoration: 'none',
              }}>
                <Phone size={14} /> {PRIMARY_PHONE}
              </a>
              <a href={waLink('Hello! I would like to book an appointment at Apollo Clinic Srinagar.')} target="_blank" rel="noreferrer" style={{
                display: 'flex', alignItems: 'center', gap: '0.45rem', justifyContent: 'center',
                background: '#25D366', borderRadius: '8px', padding: '0.65rem 1rem',
                color: '#fff', fontWeight: 600, fontSize: '0.85rem', textDecoration: 'none', transition: 'opacity 0.2s',
              }}
                onMouseEnter={e => e.currentTarget.style.opacity = '0.9'}
                onMouseLeave={e => e.currentTarget.style.opacity = '1'}
              >
                <svg width={14} height={14} viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                WhatsApp Us
              </a>
            </div>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} Apollo Clinic Srinagar. Clinical excellence in Karan Nagar.</span>
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
            <button className="footer-link" onClick={() => goTo('/faq')} style={{ marginBottom: 0 }}>Privacy Policy</button>
            <button className="footer-link" onClick={() => goTo('/contact')} style={{ marginBottom: 0 }}>Contact Us</button>
            <Link to="/admin/login" style={{
              display: 'flex', alignItems: 'center', gap: '0.35rem',
              background: 'var(--bg-alt)', border: '1px solid var(--border)',
              color: 'var(--muted)', borderRadius: '6px',
              padding: '0.3rem 0.75rem', fontSize: '0.75rem', fontWeight: 600,
              textDecoration: 'none', transition: 'all 0.2s',
            }}
              onMouseEnter={e => e.currentTarget.style.color = 'var(--blue)'}
              onMouseLeave={e => e.currentTarget.style.color = 'var(--muted)'}
            >
              <ShieldCheck size={12} /> Admin
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
