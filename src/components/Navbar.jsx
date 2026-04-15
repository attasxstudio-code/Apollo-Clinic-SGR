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
            style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', textDecoration: 'none' }}>
            <div style={{
              background: 'linear-gradient(135deg,#0ea5e9,#10b981)',
              borderRadius: '10px', padding: '6px',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: '0 4px 12px rgba(14,165,233,0.3)',
              flexShrink: 0,
            }}>
              <img src="/logo.jpg" alt="Clinic Logo" height="28"
                style={{ objectFit: 'contain', borderRadius: '6px', display: 'block' }} />
            </div>
            <div>
              <div style={{ fontWeight: 800, fontSize: '0.98rem', lineHeight: 1.1,
                background: 'linear-gradient(135deg,#0369a1,#047857)',
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                Q'Derma
              </div>
              <div style={{ fontSize: '0.65rem', color: '#64748b', fontWeight: 600, letterSpacing: '0.06em' }}>
                SKIN CLINIC
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
          <button className="btn btn-whatsapp"
            onClick={() => window.open(`https://wa.me/916005348879?text=${encodeURIComponent('Hello! I would like to book an appointment at Q Derma The Skin Clinic.')}`, '_blank')}
            style={{ width: '100%', marginTop: '0.85rem', padding: '0.9rem', fontSize: '1rem', minHeight: '52px', borderRadius: '14px' }}>
            <svg width="19" height="19" viewBox="0 0 24 24" fill="currentColor" style={{ flexShrink: 0 }}>
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            Book on WhatsApp
          </button>
        </div>
      </nav>

      <style>{`
        @media (max-width: 768px) {
          .nav-desktop { display: none !important; }
          .nav-mobile-toggle { display: flex !important; }
        }
      `}</style>
    </>
  );
};

export default Navbar;
