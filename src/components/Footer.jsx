import React from 'react';
import { Phone, MapPin, Heart, ShieldCheck, MessageCircle } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const WA_NUMBER = '916005348879';

const QUICK_LINKS = [
  { label: 'Home',             path: '/', id: 'home' },
  { label: 'About Us',         path: '/about', id: null },
  { label: 'Services',         path: '/', id: 'services' },
  { label: 'Our Doctors',      path: '/', id: 'doctors' },
  { label: 'Book Appointment', path: '/', id: 'booking' },
];

const Footer = () => {
  const navigate = useNavigate();

  const handleQuickLink = (path, id) => {
    if (path === '/about') {
      navigate('/about');
      window.scrollTo(0, 0);
    } else {
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
    }
  };
  return (
    <footer style={{
      background: 'linear-gradient(135deg,#0c4a6e 0%,#0369a1 45%,#047857 100%)',
      padding: '3.5rem 0 1.5rem',
      marginTop: 'auto',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Decorative blobs */}
      <div style={{ position:'absolute', top:'-80px', right:'-80px', width:'320px', height:'320px', borderRadius:'50%',
        background:'radial-gradient(circle,rgba(255,255,255,0.07) 0%,transparent 70%)', pointerEvents:'none' }} />
      <div style={{ position:'absolute', bottom:'-60px', left:'-60px', width:'260px', height:'260px', borderRadius:'50%',
        background:'radial-gradient(circle,rgba(16,185,129,0.12) 0%,transparent 70%)', pointerEvents:'none' }} />

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>

        {/* ── Mobile CTA strip ── */}
        <div style={{
          background: 'rgba(255,255,255,0.12)',
          border: '1px solid rgba(255,255,255,0.2)',
          borderRadius: '16px',
          padding: '1.25rem',
          marginBottom: '2.5rem',
          backdropFilter: 'blur(8px)',
        }}>
          <p style={{ color: 'rgba(255,255,255,0.9)', fontWeight: 700, fontSize: '1rem', textAlign: 'center', margin: '0 0 1rem' }}>
            📅 Book a Consultation — Mon to Sun
          </p>
          <div className="footer-cta-grid">
            <a href="tel:+916005348879" className="footer-action-btn footer-action-call">
              <Phone size={17} />
              Call Now
            </a>
            <a
              href={`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent('Hello! I would like to book an appointment.')}`}
              target="_blank" rel="noreferrer"
              className="footer-action-btn footer-action-wa"
            >
              <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              WhatsApp Us
            </a>
          </div>
        </div>

        {/* ── Grid ── */}
        <div className="footer-grid">

          {/* Brand */}
          <div>
            <div style={{ display:'flex', alignItems:'center', gap:'0.65rem', marginBottom:'1rem' }}>
              <div style={{ background:'rgba(255,255,255,0.15)', borderRadius:'10px', padding:'6px',
                display:'flex', alignItems:'center', justifyContent:'center', backdropFilter:'blur(4px)' }}>
                <img src="/logo.jpg" alt="Clinic Logo" height="32" style={{ objectFit:'contain', borderRadius:'6px' }} />
              </div>
              <div>
                <div style={{ fontWeight:800, fontSize:'1.05rem', color:'#fff' }}>Q'Derma The Skin Clinic</div>
                <div style={{ fontSize:'0.7rem', color:'rgba(255,255,255,0.6)', letterSpacing:'0.05em' }}>JAWAHAR NAGAR, SRINAGAR</div>
              </div>
            </div>
            <p style={{ color:'rgba(255,255,255,0.72)', fontSize:'0.9rem', lineHeight:1.65, maxWidth:'280px', margin:'0 0 1rem' }}>
              Precision Dermatology. Personalized Care. Your Skin, Perfected.
            </p>
            {/* Instagram */}
            <a
              href="https://www.instagram.com/qderma_theskinclinic"
              target="_blank" rel="noreferrer"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                background: 'linear-gradient(135deg,#833ab4,#fd1d1d,#fcb045)',
                color: '#fff', textDecoration: 'none',
                padding: '0.45rem 1rem', borderRadius: '20px',
                fontSize: '0.82rem', fontWeight: 700,
                transition: 'opacity 0.2s, transform 0.2s',
                marginBottom: '0.5rem',
              }}
              onMouseEnter={e => { e.currentTarget.style.opacity='0.88'; e.currentTarget.style.transform='translateY(-2px)'; }}
              onMouseLeave={e => { e.currentTarget.style.opacity='1'; e.currentTarget.style.transform='translateY(0)'; }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
              @qderma_theskinclinic
            </a>
          </div>

          {/* Contact */}
          <div>
            <h4 style={{ color:'#fff', fontWeight:700, marginBottom:'1.25rem', fontSize:'0.9rem', letterSpacing:'0.05em', textTransform:'uppercase' }}>
              Contact Us
            </h4>
            {[
              { icon: <Phone size={15}/>, text: '+91 6005348879', href: 'tel:+916005348879' },
              { icon: <MessageCircle size={15}/>, text: 'Chat on WhatsApp', href: `https://wa.me/${WA_NUMBER}` },
              { icon: <MapPin size={15}/>, text: 'Jawahar Nagar / Raj Bagh, Srinagar', href: null },
            ].map((item, i) => (
              <div key={i} style={{ display:'flex', alignItems:'center', gap:'0.6rem', marginBottom:'0.7rem' }}>
                <span style={{ color:'#67e8f9', flexShrink: 0 }}>{item.icon}</span>
                {item.href
                  ? <a href={item.href} target={item.href.startsWith('http') ? '_blank' : undefined} rel="noreferrer"
                      style={{ color:'rgba(255,255,255,0.85)', fontSize:'0.88rem', fontWeight:500 }}>{item.text}</a>
                  : <span style={{ color:'rgba(255,255,255,0.8)', fontSize:'0.88rem' }}>{item.text}</span>}
              </div>
            ))}
          </div>

          {/* Working Hours */}
          <div>
            <h4 style={{ color:'#fff', fontWeight:700, marginBottom:'1.25rem', fontSize:'0.9rem', letterSpacing:'0.05em', textTransform:'uppercase' }}>
              Working Hours
            </h4>
            {[
              { day: 'Mon – Sat', time: '12:00 PM – 7:00 PM' },
              { day: 'Sunday', time: '10:00 AM – 1:30 PM' },
              { day: 'Appointment', time: 'Book via WhatsApp' },
            ].map((row, i) => (
              <div key={i} style={{ display:'flex', justifyContent:'space-between', alignItems:'center',
                marginBottom:'0.65rem', gap:'1rem' }}>
                <span style={{ color:'rgba(255,255,255,0.65)', fontSize:'0.85rem' }}>{row.day}</span>
                <span style={{ color: i === 2 ? '#6ee7b7' : 'rgba(255,255,255,0.9)', fontSize:'0.85rem', fontWeight:600 }}>{row.time}</span>
              </div>
            ))}
            <div style={{ marginTop: '1.25rem' }}>
              <h4 style={{ color:'#fff', fontWeight:700, marginBottom:'0.85rem', fontSize:'0.9rem', letterSpacing:'0.05em', textTransform:'uppercase' }}>
                Quick Links
              </h4>
              {QUICK_LINKS.map(({ label, path, id }) => (
                <div key={label} style={{ marginBottom:'0.5rem' }}>
                  <button
                    onClick={() => handleQuickLink(path, id)}
                    style={{
                      background: 'none', border: 'none', padding: 0,
                      color:'rgba(255,255,255,0.75)', fontSize:'0.85rem',
                      cursor:'pointer', transition:'color 0.2s',
                      textAlign: 'left', fontFamily: 'inherit',
                    }}
                    onMouseEnter={e => e.currentTarget.style.color='#67e8f9'}
                    onMouseLeave={e => e.currentTarget.style.color='rgba(255,255,255,0.75)'}
                  >→ {label}</button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{ borderTop:'1px solid rgba(255,255,255,0.15)', paddingTop:'1.5rem', marginTop:'1rem',
          display:'flex', alignItems:'center', justifyContent:'space-between', flexWrap:'wrap', gap:'1rem' }}>
          <p style={{ color:'rgba(255,255,255,0.6)', fontSize:'0.8rem', margin:0 }}>
            © {new Date().getFullYear()} Q'Derma The Skin Clinic. Built with{' '}
            <Heart size={12} color="#f87171" style={{ verticalAlign:'middle', margin:'0 2px' }} />
            for the patients of Srinagar.
          </p>
          <Link to="/admin/login"
            style={{
              display:'inline-flex', alignItems:'center', gap:'0.45rem',
              background:'rgba(255,255,255,0.12)',
              border:'1px solid rgba(255,255,255,0.25)',
              color:'rgba(255,255,255,0.85)',
              borderRadius:'8px', padding:'0.4rem 1rem',
              fontSize:'0.8rem', fontWeight:600,
              backdropFilter:'blur(8px)',
              transition:'all 0.2s',
            }}
            onMouseEnter={e => { e.currentTarget.style.background='rgba(255,255,255,0.22)'; }}
            onMouseLeave={e => { e.currentTarget.style.background='rgba(255,255,255,0.12)'; }}
          >
            <ShieldCheck size={14} /> Admin Platform
          </Link>
        </div>
      </div>

      <style>{`
        .footer-cta-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 0.75rem;
        }
        .footer-action-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          padding: 0.85rem 1rem;
          border-radius: 12px;
          font-weight: 700;
          font-size: 0.95rem;
          text-decoration: none;
          transition: all 0.2s;
          min-height: 50px;
        }
        .footer-action-call {
          background: rgba(255,255,255,0.15);
          border: 1.5px solid rgba(255,255,255,0.3);
          color: #fff;
        }
        .footer-action-call:hover { background: rgba(255,255,255,0.25); }
        .footer-action-wa {
          background: #25D366;
          color: #fff;
          border: 1.5px solid rgba(255,255,255,0.2);
        }
        .footer-action-wa:hover { filter: brightness(1.1); }
        .footer-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 2.5rem;
          margin-bottom: 2rem;
        }
        @media (max-width: 768px) {
          .footer-grid {
            grid-template-columns: 1fr;
            gap: 2rem;
          }
        }
      `}</style>
    </footer>
  );
};

export default Footer;
