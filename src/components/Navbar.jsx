import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown, Calendar, Phone, MapPin, Clock } from 'lucide-react';
import '../index.css';

const WA_LINK = `https://wa.me/919000000000?text=${encodeURIComponent('Hello! I would like to book an appointment at Apollo Clinic Srinagar.')}`;
const DIRECTIONS_LINK = 'https://maps.google.com/?q=34.0806043,74.7988594';

/* ── Live open/closed indicator ── */
function getClinicStatus() {
  const now  = new Date();
  const day  = now.getDay();      // 0=Sun, 1-6=Mon-Sat
  const mins = now.getHours() * 60 + now.getMinutes();

  if (day >= 1 && day <= 6) {
    // Mon–Sat: 12:00 PM (720) – 7:00 PM (1140)
    return { open: mins >= 720 && mins < 1140, hours: '12:00 PM – 7:00 PM' };
  } else {
    // Sunday: 10:00 AM (600) – 1:30 PM (810)
    return { open: mins >= 600 && mins < 810, hours: '10:00 AM – 1:30 PM' };
  }
}

/* ── Utility Bar ── */
const UtilityBar = () => {
  const status = getClinicStatus();
  return (
    <div className="utility-bar">
      <div className="container utility-bar-inner">
        <div className="utility-bar-left">
          <div className="utility-bar-item">
            <MapPin size={11} />
            <span>Near National School, Karan Nagar, Srinagar</span>
          </div>
          <div className="utility-bar-divider" />
          <div className="utility-bar-item">
            <Clock size={11} />
            <span>Today: {status.hours}</span>
            <span className={`utility-open-badge ${status.open ? 'open' : 'closed'}`}>
              {status.open ? 'Open Now' : 'Closed'}
            </span>
          </div>
          <div className="utility-bar-divider" />
          <div className="utility-bar-item">
            <Phone size={11} />
            <a href="tel:+919000000000">+91 9000000000</a>
          </div>
        </div>
        <div className="utility-bar-right">
          <a href={WA_LINK} target="_blank" rel="noreferrer" className="utility-wa-pill">
            WhatsApp Us
          </a>
          <a href={DIRECTIONS_LINK} target="_blank" rel="noreferrer" style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', color: 'rgba(255,255,255,0.82)' }}>
            <MapPin size={11} /> Directions
          </a>
        </div>
      </div>
    </div>
  );
};

/* ── Main Navbar ── */
const Navbar = () => {
  const [isOpen,   setIsOpen]   = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);
  const [moreOpen, setMoreOpen] = React.useState(false);
  const navigate  = useNavigate();
  const location  = useLocation();

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  React.useEffect(() => { setIsOpen(false); setMoreOpen(false); }, [location.pathname]);

  React.useEffect(() => {
    const handler = (e) => {
      if (moreOpen && !e.target.closest('#more-dropdown-wrap')) setMoreOpen(false);
    };
    document.addEventListener('click', handler);
    return () => document.removeEventListener('click', handler);
  }, [moreOpen]);

  const scrollToId = (id) => {
    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        if (id === 'home') window.scrollTo({ top: 0, behavior: 'smooth' });
        else document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
      }, 160);
    } else {
      if (id === 'home') window.scrollTo({ top: 0, behavior: 'smooth' });
      else document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const goTo = (path) => { navigate(path); window.scrollTo(0, 0); };

  const primaryLinks = [
    { label: 'Home',        action: () => scrollToId('home') },
    { label: 'Services',    action: () => goTo('/services')   },
    { label: 'Doctors',     action: () => goTo('/doctors')    },
    { label: 'Diagnostics', action: () => goTo('/diagnostics') },
  ];

  const moreLinks = [
    { label: 'About Us',           action: () => goTo('/about')    },
    { label: 'Contact & Timings',  action: () => goTo('/contact')  },
    { label: 'View Reports',       action: () => goTo('/reports')  },
    { label: 'FAQ',                action: () => goTo('/faq')      },
  ];

  return (
    <>
      <UtilityBar />

      <nav id="main-nav" style={{
        position: 'sticky', top: 0, zIndex: 200,
        background: scrolled ? 'rgba(255,255,255,0.98)' : '#fff',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        borderBottom: scrolled ? '1px solid #e2e8f0' : '1px solid #f1f5f9',
        boxShadow: scrolled ? '0 1px 20px rgba(0,0,0,0.07)' : 'none',
        transition: 'all 0.25s ease',
      }}>
        <div className="container" style={{
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          padding: '0.7rem 1.25rem',
        }}>

          {/* Logo */}
          <button onClick={() => scrollToId('home')} style={{
            display: 'flex', alignItems: 'center', gap: '0.6rem',
            background: 'none', border: 'none', cursor: 'pointer', padding: 0,
          }}>
            <div style={{
              background: '#fff', borderRadius: '10px', padding: '3px',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: '0 1px 8px rgba(3,105,161,0.15)',
              border: '1.5px solid #e0eef8', flexShrink: 0,
            }}>
              <img src="/logo.jpg" alt="Apollo Clinic Srinagar" height="38" width="auto"
                style={{ objectFit: 'contain', borderRadius: '7px', display: 'block' }} />
            </div>
            <div style={{ textAlign: 'left' }}>
              <div style={{
                fontWeight: 800, fontSize: '0.97rem', lineHeight: 1.1,
                letterSpacing: '-0.02em', color: '#0c4a6e',
              }}>Apollo Clinic</div>
              <div style={{ fontSize: '0.62rem', color: '#64748b', fontWeight: 600, letterSpacing: '0.07em', textTransform: 'uppercase' }}>
                Srinagar
              </div>
            </div>
          </button>

          {/* Desktop Links */}
          <div className="nav-desktop" style={{ display: 'flex', alignItems: 'center', gap: '0.1rem' }}>
            {primaryLinks.map(({ label, action }) => (
              <button key={label} onClick={action} className="nav-link-btn">{label}</button>
            ))}

            {/* More dropdown */}
            <div id="more-dropdown-wrap" style={{ position: 'relative' }}>
              <button
                className="nav-link-btn"
                onClick={e => { e.stopPropagation(); setMoreOpen(!moreOpen); }}
                style={{ display: 'flex', alignItems: 'center', gap: '0.2rem' }}
              >
                More
                <ChevronDown size={13} style={{ transition: 'transform 0.2s', transform: moreOpen ? 'rotate(180deg)' : 'none' }} />
              </button>
              {moreOpen && (
                <div style={{
                  position: 'absolute', top: 'calc(100% + 8px)', right: 0,
                  background: '#fff', border: '1px solid #e2e8f0',
                  borderRadius: '12px', padding: '0.5rem',
                  boxShadow: '0 8px 30px rgba(0,0,0,0.1)',
                  minWidth: '200px', zIndex: 300,
                }}>
                  {moreLinks.map(({ label, action }) => (
                    <button key={label} onClick={() => { action(); setMoreOpen(false); }}
                      style={{
                        display: 'block', width: '100%', textAlign: 'left',
                        padding: '0.6rem 0.85rem', background: 'none', border: 'none',
                        color: '#334155', fontSize: '0.87rem', fontWeight: 600,
                        borderRadius: '8px', cursor: 'pointer', fontFamily: 'inherit',
                        transition: 'all 0.15s',
                      }}
                      onMouseEnter={e => { e.currentTarget.style.background = '#f0f9ff'; e.currentTarget.style.color = '#0369a1'; }}
                      onMouseLeave={e => { e.currentTarget.style.background = 'none'; e.currentTarget.style.color = '#334155'; }}
                    >{label}</button>
                  ))}
                </div>
              )}
            </div>

            <button className="btn btn-primary"
              onClick={() => goTo('/book')}
              style={{ marginLeft: '0.75rem', padding: '0.55rem 1.25rem', fontSize: '0.87rem', borderRadius: '9999px' }}>
              <Calendar size={14} /> Book Appointment
            </button>
          </div>

          {/* Mobile hamburger */}
          <button
            aria-label={isOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isOpen}
            onClick={() => setIsOpen(!isOpen)}
            className="nav-mobile-toggle"
          >
            {isOpen ? <X size={21} /> : <Menu size={21} />}
          </button>
        </div>

        {/* Mobile menu */}
        {isOpen && (
          <div className="nav-mobile-menu">
            {[...primaryLinks, ...moreLinks].map(({ label, action }) => (
              <button key={label} onClick={() => { action(); setIsOpen(false); }} className="nav-mobile-link">
                {label}
              </button>
            ))}
            <div style={{ padding: '0.75rem 0 0.25rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <button className="btn btn-primary"
                onClick={() => { goTo('/book'); setIsOpen(false); }}
                style={{ width: '100%', padding: '0.85rem', fontSize: '0.97rem', minHeight: '50px', borderRadius: '12px' }}>
                <Calendar size={16} /> Book Appointment
              </button>
              <a href="tel:+919000000000" style={{
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem',
                padding: '0.75rem', background: '#f0f9ff', border: '1.5px solid #bae6fd',
                borderRadius: '12px', color: '#0369a1', fontWeight: 700, fontSize: '0.92rem',
                textDecoration: 'none',
              }}>
                <Phone size={15} /> +91 9000000000
              </a>
            </div>
          </div>
        )}
      </nav>

      <style>{`
        .nav-link-btn {
          background: none; border: none;
          padding: 0.48rem 0.75rem; border-radius: 8px;
          font-weight: 600; font-size: 0.87rem; color: #334155;
          cursor: pointer; transition: all 0.15s; font-family: inherit;
          white-space: nowrap;
        }
        .nav-link-btn:hover { background: #f0f9ff; color: #0369a1; }

        .nav-mobile-toggle {
          display: none;
          background: none;
          border: 1.5px solid #e2e8f0;
          border-radius: 9px;
          color: #334155;
          padding: 7px;
          min-width: 40px; min-height: 40px;
          align-items: center; justify-content: center;
          cursor: pointer; transition: all 0.2s;
        }
        .nav-mobile-toggle:hover { border-color: #0369a1; color: #0369a1; }

        .nav-mobile-menu {
          background: #fff;
          border-top: 1px solid #f1f5f9;
          padding: 0.35rem 1.25rem 1rem;
        }
        .nav-mobile-link {
          display: flex; width: 100%; text-align: left;
          padding: 0.85rem 0.4rem;
          background: none; border: none;
          border-bottom: 1px solid #f8fafc;
          font-size: 0.95rem; font-weight: 600; color: #334155;
          cursor: pointer; align-items: center;
          min-height: 46px; font-family: inherit;
          transition: color 0.15s;
        }
        .nav-mobile-link:hover { color: #0369a1; }

        @media (max-width: 768px) {
          .nav-desktop        { display: none !important; }
          .nav-mobile-toggle  { display: flex !important; }
          #main-nav .container { padding-left: 1rem !important; padding-right: 1rem !important; }
        }
      `}</style>
    </>
  );
};

export default Navbar;
