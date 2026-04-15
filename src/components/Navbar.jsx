import React from 'react';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import '../index.css';

const Navbar = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close mobile menu when route changes
  React.useEffect(() => { setIsOpen(false); }, [location.pathname]);

  const handleNavClick = (path, id) => {
    setIsOpen(false);
    if (path === '/about') {
      navigate('/about');
      window.scrollTo(0, 0);
    } else if (path === '/') {
      if (location.pathname !== '/') {
        navigate('/');
        setTimeout(() => {
          if (id === 'home') window.scrollTo(0, 0);
          else document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
        }, 150);
      } else {
        if (id === 'home') window.scrollTo({ top: 0, behavior: 'smooth' });
        else document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const navLinks = [
    { label: 'Home',     path: '/', id: 'home' },
    { label: 'About',    path: '/about', id: null },
    { label: 'Services', path: '/', id: 'services' },
    { label: 'Doctors',  path: '/', id: 'doctors' },
  ];

  return (
    <>
      <nav style={{
        position: 'sticky', top: 0, zIndex: 200,
        background: scrolled
          ? 'rgba(255,255,255,0.96)'
          : 'rgba(240,249,255,0.92)',
        backdropFilter: 'blur(18px)',
        WebkitBackdropFilter: 'blur(18px)',
        borderBottom: `1px solid ${scrolled ? 'rgba(14,165,233,0.15)' : 'transparent'}`,
        boxShadow: scrolled ? '0 2px 20px rgba(14,165,233,0.1)' : 'none',
        transition: 'all 0.3s ease',
      }}>
        <div className="container" style={{
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          padding: '0.85rem 1.25rem',
        }}>

          {/* Logo */}
          <NavLink to="/" onClick={e => { e.preventDefault(); handleNavClick('/', 'home'); }}
            style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', textDecoration: 'none' }}>
            {/* Logo — larger, clean white background */}
            <div style={{
              background: '#fff',
              borderRadius: '12px',
              padding: '4px',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: '0 2px 10px rgba(14,165,233,0.18)',
              border: '1.5px solid rgba(14,165,233,0.15)',
              flexShrink: 0,
            }}>
              <img src="/logo.jpg" alt="Apollo Clinic Logo" height="42"
                style={{ objectFit: 'contain', borderRadius: '8px', display: 'block', width: 'auto' }} />
            </div>
            <div>
              <div style={{ fontWeight: 800, fontSize: '1.05rem', lineHeight: 1.1,
                background: 'linear-gradient(135deg,#0369a1,#047857)',
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                Apollo Clinic
              </div>
              <div style={{ fontSize: '0.68rem', color: '#64748b', fontWeight: 600, letterSpacing: '0.07em' }}>
                SRINAGAR
              </div>
            </div>
          </NavLink>

          {/* Desktop Links */}
          <div className="nav-desktop" style={{ display: 'flex', alignItems: 'center', gap: '0.2rem' }}>
            {navLinks.map(({ label, path, id }) => (
              <button key={label}
                onClick={() => handleNavClick(path, id)}
                style={{
                  background: 'none', border: 'none',
                  padding: '0.5rem 0.85rem', borderRadius: '8px',
                  fontWeight: 600, fontSize: '0.9rem', color: '#334155',
                  cursor: 'pointer', transition: 'all 0.2s',
                }}
                onMouseEnter={e => { e.currentTarget.style.background = 'linear-gradient(135deg,rgba(14,165,233,0.1),rgba(16,185,129,0.1))'; e.currentTarget.style.color = '#0369a1'; }}
                onMouseLeave={e => { e.currentTarget.style.background = 'none'; e.currentTarget.style.color = '#334155'; }}
              >{label}</button>
            ))}
            <button className="btn btn-primary"
              onClick={() => handleNavClick('/', 'booking')}
              style={{ marginLeft: '0.5rem', padding: '0.55rem 1.25rem', fontSize: '0.88rem' }}>
              Book Appointment
            </button>
          </div>

          {/* Mobile Hamburger */}
          <button
            className="nav-mobile-toggle"
            aria-label={isOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isOpen}
            onClick={() => setIsOpen(!isOpen)}
            style={{
              display: 'none',
              background: isOpen ? 'rgba(14,165,233,0.1)' : 'none',
              border: '1.5px solid rgba(14,165,233,0.2)',
              borderRadius: '10px',
              color: '#0369a1',
              padding: '8px',
              minWidth: '44px',
              minHeight: '44px',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              transition: 'all 0.2s',
            }}>
            {isOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {/* Mobile Dropdown Menu */}
        <div className="nav-mobile-menu" style={{
          display: isOpen ? 'block' : 'none',
          background: 'rgba(248,250,252,0.98)',
          backdropFilter: 'blur(20px)',
          borderTop: '1px solid rgba(14,165,233,0.1)',
          padding: '0.5rem 1.25rem 1.25rem',
        }}>
          {navLinks.map(({ label, path, id }) => (
            <button key={label}
              onClick={() => handleNavClick(path, id)}
              style={{
                display: 'flex', width: '100%', textAlign: 'left',
                padding: '0.9rem 0.5rem',
                background: 'none', border: 'none',
                borderBottom: '1px solid rgba(14,165,233,0.08)',
                fontSize: '1rem', fontWeight: 600, color: '#0369a1',
                cursor: 'pointer', alignItems: 'center', gap: '0.5rem',
                minHeight: '48px',
              }}>{label}</button>
          ))}
          <button className="btn btn-primary"
            onClick={() => {
              setIsOpen(false);
              if (window.location.pathname !== '/') {
                import('react-router-dom').then(() => {});
                window.location.href = '/#booking';
              } else {
                document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' });
              }
            }}
            style={{ width: '100%', marginTop: '0.85rem', padding: '0.9rem', fontSize: '1rem', minHeight: '52px', borderRadius: '14px', fontFamily: 'inherit' }}>
            📅 Book Appointment
          </button>
        </div>
      </nav>

      <style>{`
        @media (max-width: 768px) {
          .nav-desktop { display: none !important; }
          .nav-mobile-toggle { display: flex !important; }
          nav .container { padding-left: 1rem !important; padding-right: 1rem !important; }
        }
      `}</style>
    </>
  );
};

export default Navbar;
