import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Menu, X, Calendar, Phone, Lock, Stethoscope } from 'lucide-react';

import { PRIMARY_PHONE, PRIMARY_PHONE_HREF, WORKING_HOURS } from '../config/contact';

/* ── Live clinic status ── */
function getClinicStatus() {
  const now  = new Date();
  const day  = now.getDay();
  const mins = now.getHours() * 60 + now.getMinutes();
  if (day >= 1 && day <= 6) return { open: mins >= 480 && mins < 1140, hours: WORKING_HOURS.weekdays.time };
  return { open: mins >= 480 && mins < 840, hours: WORKING_HOURS.sunday.time };
}

const NAV_LINKS = [
  { label: 'Home',        path: '/'            },
  { label: 'Services',    path: '/services'    },
  { label: 'Doctors',     path: '/doctors'     },
  { label: 'Diagnostics', path: '/diagnostics' },
  { label: 'About Us',    path: '/about'       },
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
            aria-label="Appolo Clinic Srinagar — home"
          >
            <img 
              src="/images/ui/logo.webp" 
              alt="Appolo Clinic Srinagar Logo"
              className="navbar-logo-img"
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
          <div className="navbar-actions" style={{ gap: '1rem' }}>
            <button
              className="btn btn-outline-blue"
              onClick={() => goTo('/book-checkup')}
              style={{ fontSize: '0.9rem', fontWeight: 600, padding: '0.5rem 1rem', borderRadius: 'var(--r-full)' }}
            >
              <Stethoscope size={16} /> Book Lab Tests
            </button>
            <button
              className="btn btn-orange"
              onClick={() => goTo('/book')}
              style={{ fontSize: '0.9rem', fontWeight: 600, padding: '0.5rem 1rem', borderRadius: 'var(--r-full)' }}
            >
              <Calendar size={16} /> Book Appointment
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
            <button
              className="btn btn-outline-blue"
              onClick={() => goTo('/book-checkup')}
              style={{ width: '100%', justifyContent: 'center', minHeight: 48, borderRadius: 'var(--r-lg)', background: 'var(--blue-light)' }}
            >
              <Stethoscope size={16} /> Book Lab Tests
            </button>
            <a
              href={PRIMARY_PHONE_HREF}
              style={{
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem',
                padding: '0.75rem', background: 'var(--blue-light)',
                border: '1px solid var(--blue-border)',
                borderRadius: 'var(--r-lg)', color: 'var(--navy)',
                fontWeight: 700, fontSize: '0.9rem', textDecoration: 'none',
              }}
            >
              <Phone size={15} /> {PRIMARY_PHONE}
            </a>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
