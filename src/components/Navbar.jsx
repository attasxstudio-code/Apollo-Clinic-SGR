import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Menu, X, Calendar, Phone } from 'lucide-react';

const PHONE      = '+91 9149425496';
const PHONE_HREF = 'tel:+919149425496';

/* ── Live clinic status ── */
function getClinicStatus() {
  const now  = new Date();
  const day  = now.getDay();
  const mins = now.getHours() * 60 + now.getMinutes();
  if (day >= 1 && day <= 6) return { open: mins >= 720 && mins < 1140, hours: '12:00 PM – 7:00 PM' };
  return { open: mins >= 600 && mins < 810, hours: '10:00 AM – 1:30 PM' };
}

const NAV_LINKS = [
  { label: 'Home',        path: '/'            },
  { label: 'Services',    path: '/services'    },
  { label: 'Doctors',     path: '/doctors'     },
  { label: 'Diagnostics', path: '/diagnostics' },
  { label: 'Reports',     path: '/reports'     },
];

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [scrolled,   setScrolled]   = React.useState(false);
  const navigate  = useNavigate();
  const location  = useLocation();

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  React.useEffect(() => { setMobileOpen(false); }, [location.pathname]);

  const goTo = (path) => { navigate(path); window.scrollTo(0, 0); };
  const status = getClinicStatus();

  return (
    <header id="main-nav" className={`navbar${scrolled ? ' scrolled' : ''}`}>
      <div className="container">
        <div className="navbar-inner">

          {/* ── Logo ── */}
          <button
            className="navbar-logo"
            onClick={() => goTo('/')}
            aria-label="Apollo Clinic Srinagar — home"
            style={{ position: 'relative' }}
          >
            <div style={{
              position: 'absolute',
              inset: '-4px -10px',
              borderRadius: '12px',
              background: 'linear-gradient(135deg, rgba(3,105,161,0.08) 0%, rgba(14,165,233,0.06) 50%, rgba(16,185,129,0.06) 100%)',
              border: '1px solid rgba(3,105,161,0.1)',
              zIndex: 0,
            }} />
            <img 
              src="/logo.jpg" 
              alt="Apollo Clinic Srinagar Logo" 
              style={{ 
                height: '44px', 
                width: 'auto', 
                objectFit: 'contain', 
                position: 'relative', 
                zIndex: 1,
                filter: 'contrast(1.1) saturate(1.15)',
              }} 
            />
          </button>

          {/* ── Desktop Nav Links ── */}
          <nav className="navbar-links" aria-label="Main navigation">
            {NAV_LINKS.map(({ label, path }) => (
              <button
                key={path}
                className={`navbar-link${location.pathname === path ? ' active' : ''}`}
                onClick={() => goTo(path)}
              >
                {label}
              </button>
            ))}
          </nav>

          {/* ── Desktop Actions ── */}
          <div className="navbar-actions">
            {/* Status dot */}
            <div style={{
              display: 'flex', alignItems: 'center', gap: '0.35rem',
              fontSize: '0.75rem', fontWeight: 600,
              color: status.open ? 'var(--green)' : 'var(--muted)',
              padding: '0.3rem 0.65rem',
              background: status.open ? 'var(--green-light)' : 'var(--bg-alt)',
              border: `1px solid ${status.open ? 'var(--green-border)' : 'var(--border)'}`,
              borderRadius: 'var(--r-full)',
              whiteSpace: 'nowrap',
            }}>
              <span style={{
                width: 6, height: 6, borderRadius: '50%',
                background: status.open ? 'var(--green)' : 'var(--muted)',
                display: 'inline-block', flexShrink: 0,
              }} />
              {status.open ? 'Open Now' : 'Closed'}
            </div>

            <button
              className="btn btn-primary btn-sm"
              onClick={() => goTo('/book')}
              style={{ borderRadius: 'var(--r-full)' }}
            >
              <Calendar size={14} />
              Book Appointment
            </button>
          </div>

          {/* ── Mobile Toggle ── */}
          <button
            className="navbar-toggle"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* ── Mobile Menu ── */}
      {mobileOpen && (
        <div className="nav-mobile-panel">
          {NAV_LINKS.map(({ label, path }) => (
            <button
              key={path}
              className="nav-mobile-item"
              onClick={() => goTo(path)}
            >
              {label}
            </button>
          ))}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', padding: '0.75rem 1.5rem 0.25rem' }}>
            <button
              className="btn btn-primary"
              onClick={() => goTo('/book')}
              style={{ width: '100%', justifyContent: 'center', minHeight: 48, borderRadius: 'var(--r-lg)' }}
            >
              <Calendar size={16} /> Book Appointment
            </button>
            <a
              href={PHONE_HREF}
              style={{
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem',
                padding: '0.75rem', background: 'var(--blue-light)',
                border: '1px solid var(--blue-border)',
                borderRadius: 'var(--r-lg)', color: 'var(--navy)',
                fontWeight: 700, fontSize: '0.9rem', textDecoration: 'none',
              }}
            >
              <Phone size={15} /> {PHONE}
            </a>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
