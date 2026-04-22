import React from 'react';
import { Phone, MapPin, Heart, ShieldCheck, MessageCircle, Clock } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const WA_NUMBER = '919000000000';
const WA_LINK   = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent('Hello! I would like to book an appointment at Apollo Clinic Srinagar.')}`;

const QUICK_LINKS = [
  { label: 'Home',                path: '/',            id: 'home'      },
  { label: 'About Us',            path: '/about',       id: null        },
  { label: 'Our Doctors',         path: '/doctors',     id: null        },
  { label: 'Services',            path: '/services',    id: null        },
  { label: 'Diagnostics',         path: '/diagnostics', id: null        },
  { label: 'View Test Reports',   path: '/reports',     id: null        },
  { label: 'Contact Us',          path: '/contact',     id: null        },
  { label: 'Book Appointment',    path: '/book',        id: null        },
  { label: 'FAQ',                 path: '/faq',         id: null        },
];

const Footer = () => {
  const navigate = useNavigate();

  const handleLink = (path, id) => {
    if (path === '/' && id) {
      if (window.location.pathname !== '/') {
        navigate('/');
        setTimeout(() => {
          if (id === 'home') window.scrollTo({ top: 0, behavior: 'smooth' });
          else document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
        }, 150);
      } else {
        if (id === 'home') window.scrollTo({ top: 0, behavior: 'smooth' });
        else document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      navigate(path);
      window.scrollTo(0, 0);
    }
  };

  return (
    <footer style={{
      background: 'linear-gradient(135deg,#0c4a6e 0%,#0369a1 50%,#047857 100%)',
      padding: '3.5rem 0 1.5rem',
      marginTop: 'auto',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Decorative blobs */}
      <div style={{ position: 'absolute', top: '-80px', right: '-80px', width: '320px', height: '320px', borderRadius: '50%', background: 'radial-gradient(circle,rgba(255,255,255,0.07) 0%,transparent 70%)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', bottom: '-60px', left: '-60px', width: '260px', height: '260px', borderRadius: '50%', background: 'radial-gradient(circle,rgba(16,185,129,0.1) 0%,transparent 70%)', pointerEvents: 'none' }} />

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>

        {/* ── Quick action strip ── */}
        <div style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.18)', borderRadius: '16px', padding: '1.35rem', marginBottom: '3rem', backdropFilter: 'blur(8px)' }}>
          <p style={{ color: 'rgba(255,255,255,0.88)', fontWeight: 700, fontSize: '1rem', textAlign: 'center', margin: '0 0 1rem' }}>
            📅 Book a Consultation — Mon to Sun · Apollo Clinic Srinagar
          </p>
          <div className="footer-cta-grid">
            <a href="tel:+919000000000" className="footer-action-btn footer-action-call">
              <Phone size={16} /> Call Now
            </a>
            <a href={WA_LINK} target="_blank" rel="noreferrer" className="footer-action-btn footer-action-wa">
              <svg width={16} height={16} viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              WhatsApp Us
            </a>
          </div>
        </div>

        {/* ── Main grid ── */}
        <div className="footer-grid">

          {/* Brand */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '1rem' }}>
              <div style={{ background: '#fff', borderRadius: '12px', padding: '5px', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 2px 12px rgba(0,0,0,0.25)' }}>
                <img src="/logo.jpg" alt="Apollo Clinic Logo" height="42" width="auto" style={{ objectFit: 'contain', borderRadius: '8px' }} />
              </div>
              <div>
                <div style={{ fontWeight: 800, fontSize: '1rem', color: '#fff' }}>Apollo Clinic Srinagar</div>
                <div style={{ fontSize: '0.68rem', color: 'rgba(255,255,255,0.55)', letterSpacing: '0.06em', textTransform: 'uppercase' }}>Karan Nagar, Srinagar</div>
              </div>
            </div>
            <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.88rem', lineHeight: 1.65, maxWidth: '270px', margin: '0 0 1.1rem' }}>
              Expert Multi-Speciality Care · Advanced In-House Diagnostics · Patient-First Healthcare for Srinagar.
            </p>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.82)', padding: '0.4rem 0.9rem', borderRadius: '20px', fontSize: '0.8rem', fontWeight: 700, border: '1px solid rgba(255,255,255,0.18)' }}>
              📍 Karan Nagar, Srinagar
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 style={{ color: '#fff', fontWeight: 700, marginBottom: '1.1rem', fontSize: '0.85rem', letterSpacing: '0.07em', textTransform: 'uppercase' }}>Contact</h4>
            {[
              { icon: <Phone size={14} />, text: '+91 9000000000', href: 'tel:+919000000000' },
              { icon: <svg width={14} height={14} viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>, text: 'WhatsApp Us', href: WA_LINK, ext: true },
              { icon: <MapPin size={14} />, text: 'Near National School, Arham Towers, Karan Nagar, Srinagar', href: null },
            ].map((item, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.6rem', marginBottom: '0.7rem' }}>
                <span style={{ color: '#67e8f9', flexShrink: 0, marginTop: '2px' }}>{item.icon}</span>
                {item.href
                  ? <a href={item.href} target={item.ext ? '_blank' : undefined} rel="noreferrer" style={{ color: 'rgba(255,255,255,0.82)', fontSize: '0.85rem', fontWeight: 500 }}>{item.text}</a>
                  : <span style={{ color: 'rgba(255,255,255,0.75)', fontSize: '0.85rem', lineHeight: 1.5 }}>{item.text}</span>
                }
              </div>
            ))}

            <h4 style={{ color: '#fff', fontWeight: 700, margin: '1.5rem 0 0.85rem', fontSize: '0.85rem', letterSpacing: '0.07em', textTransform: 'uppercase' }}>
              <Clock size={13} style={{ verticalAlign: 'middle', marginRight: '0.35rem', color: '#67e8f9' }} />
              Hours
            </h4>
            {[
              { day: 'Mon – Sat', time: '12:00 PM – 7:00 PM' },
              { day: 'Sunday',   time: '10:00 AM – 1:30 PM' },
            ].map((row, i) => (
              <div key={i} style={{ display: 'flex', justifyContent: 'space-between', gap: '1rem', marginBottom: '0.45rem' }}>
                <span style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.82rem' }}>{row.day}</span>
                <span style={{ color: 'rgba(255,255,255,0.88)', fontSize: '0.82rem', fontWeight: 600 }}>{row.time}</span>
              </div>
            ))}
          </div>

          {/* Quick Links */}
          <div>
            <h4 style={{ color: '#fff', fontWeight: 700, marginBottom: '1.1rem', fontSize: '0.85rem', letterSpacing: '0.07em', textTransform: 'uppercase' }}>Quick Links</h4>
            {QUICK_LINKS.map(({ label, path, id }) => (
              <div key={label} style={{ marginBottom: '0.5rem' }}>
                <button
                  onClick={() => handleLink(path, id)}
                  style={{ background: 'none', border: 'none', padding: 0, color: 'rgba(255,255,255,0.7)', fontSize: '0.85rem', cursor: 'pointer', transition: 'color 0.2s', textAlign: 'left', fontFamily: 'inherit', fontWeight: 500 }}
                  onMouseEnter={e => e.currentTarget.style.color = '#67e8f9'}
                  onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.7)'}
                >→ {label}</button>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.13)', paddingTop: '1.5rem', marginTop: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
          <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: '0.78rem', margin: 0 }}>
            © {new Date().getFullYear()} Apollo Clinic Srinagar. Built with{' '}
            <Heart size={11} color="#f87171" style={{ verticalAlign: 'middle', margin: '0 2px' }} />
            for the patients of Srinagar.
          </p>
          <Link to="/admin/login"
            style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.22)', color: 'rgba(255,255,255,0.8)', borderRadius: '8px', padding: '0.35rem 0.9rem', fontSize: '0.78rem', fontWeight: 600, backdropFilter: 'blur(8px)', transition: 'all 0.2s', textDecoration: 'none' }}
            onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.18)'; }}
            onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.1)'; }}
          >
            <ShieldCheck size={13} /> Admin Platform
          </Link>
        </div>
      </div>

      <style>{`
        .footer-cta-grid {
          display: grid; grid-template-columns: 1fr 1fr; gap: 0.75rem;
        }
        .footer-action-btn {
          display: flex; align-items: center; justify-content: center; gap: 0.5rem;
          padding: 0.85rem 1rem; border-radius: 12px;
          font-weight: 700; font-size: 0.92rem; text-decoration: none;
          transition: all 0.2s; min-height: 50px;
        }
        .footer-action-call {
          background: rgba(255,255,255,0.15);
          border: 1.5px solid rgba(255,255,255,0.28); color: #fff;
        }
        .footer-action-call:hover { background: rgba(255,255,255,0.24); }
        .footer-action-wa {
          background: #25D366; color: #fff;
          border: 1.5px solid rgba(255,255,255,0.15);
        }
        .footer-action-wa:hover { filter: brightness(1.08); }
        .footer-grid {
          display: grid;
          grid-template-columns: 1.2fr 1.1fr 0.9fr;
          gap: 2.5rem;
          margin-bottom: 2rem;
        }
        @media (max-width: 900px) {
          .footer-grid { grid-template-columns: 1fr 1fr; }
        }
        @media (max-width: 600px) {
          .footer-grid { grid-template-columns: 1fr; gap: 2rem; }
          .footer-cta-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </footer>
  );
};

export default Footer;
