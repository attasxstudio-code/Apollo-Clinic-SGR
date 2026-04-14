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
    <nav style={{
      position: 'sticky', top: 0, zIndex: 200,
      background: scrolled
        ? 'rgba(255,255,255,0.92)'
        : 'rgba(240,249,255,0.85)',
      backdropFilter: 'blur(18px)',
      WebkitBackdropFilter: 'blur(18px)',
      borderBottom: `1px solid ${scrolled ? 'rgba(14,165,233,0.12)' : 'transparent'}`,
      boxShadow: scrolled ? '0 2px 20px rgba(14,165,233,0.1)' : 'none',
      transition: 'all 0.3s ease',
      padding: '0.9rem 0',
    }}>
      <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>

        {/* Logo */}
        <NavLink to="/" onClick={e => { e.preventDefault(); handleNavClick('/', 'home'); }}
          style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
          <div style={{
            background: 'linear-gradient(135deg,#0ea5e9,#10b981)',
            borderRadius: '10px', padding: '6px',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 4px 12px rgba(14,165,233,0.3)',
          }}>
            <img src="/logo.jpg" alt="Home Heal Clinic" height="30"
              style={{ objectFit: 'contain', borderRadius: '6px', display: 'block' }} />
          </div>
          <div>
            <div style={{ fontWeight: 800, fontSize: '1rem', lineHeight: 1.1,
              background: 'linear-gradient(135deg,#0369a1,#047857)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              HomeHeal
            </div>
            <div style={{ fontSize: '0.68rem', color: '#64748b', fontWeight: 500, letterSpacing: '0.04em' }}>
              CLINIC
            </div>
          </div>
        </NavLink>

        {/* Desktop Links */}
        <div className="desktop-menu" style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
          {navLinks.map(({ label, path, id }) => (
            <button key={label}
              onClick={() => handleNavClick(path, id)}
              style={{
                background: 'none', border: 'none',
                padding: '0.5rem 0.9rem', borderRadius: '8px',
                fontWeight: 600, fontSize: '0.92rem', color: '#334155',
                cursor: 'pointer', transition: 'all 0.2s',
              }}
              onMouseEnter={e => { e.currentTarget.style.background = 'linear-gradient(135deg,rgba(14,165,233,0.1),rgba(16,185,129,0.1))'; e.currentTarget.style.color = '#0369a1'; }}
              onMouseLeave={e => { e.currentTarget.style.background = 'none'; e.currentTarget.style.color = '#334155'; }}
            >{label}</button>
          ))}
          <button className="btn btn-primary"
            onClick={() => handleNavClick('/', 'booking')}
            style={{ marginLeft: '0.75rem', padding: '0.55rem 1.4rem', fontSize: '0.9rem' }}>
            Book Appointment
          </button>
        </div>

        {/* Mobile Toggle */}
        <button className="mobile-toggle"
          style={{ display: 'none', background: 'none', border: 'none', color: '#0369a1', padding: '4px' }}
          onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div style={{
          background: 'rgba(240,249,255,0.97)',
          backdropFilter: 'blur(20px)',
          borderTop: '1px solid rgba(14,165,233,0.12)',
          padding: '1rem 2rem 1.5rem',
        }}>
          {navLinks.map(({ label, path, id }) => (
            <button key={label}
              onClick={() => handleNavClick(path, id)}
              style={{
                display: 'block', width: '100%', textAlign: 'left',
                padding: '0.8rem 0', background: 'none', border: 'none',
                borderBottom: '1px solid rgba(14,165,233,0.1)',
                fontSize: '1rem', fontWeight: 600, color: '#0369a1', cursor: 'pointer',
              }}>{label}</button>
          ))}
          <button className="btn btn-primary"
            onClick={() => handleNavClick('/', 'booking')}
            style={{ width: '100%', marginTop: '1rem', padding: '0.8rem' }}>
            Book Appointment
          </button>
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .desktop-menu { display: none !important; }
          .mobile-toggle { display: block !important; }
        }
      `}</style>
    </nav>
  );
};

export default Navbar;
