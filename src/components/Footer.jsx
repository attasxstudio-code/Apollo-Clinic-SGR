import React from 'react';
import { Phone, MapPin, Heart, ShieldCheck, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer style={{
      background: 'linear-gradient(135deg,#0c4a6e 0%,#0369a1 45%,#047857 100%)',
      padding: '4rem 0 1.5rem',
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
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(240px,1fr))', gap: '3rem', marginBottom: '3rem' }}>

          {/* Brand */}
          <div>
            <div style={{ display:'flex', alignItems:'center', gap:'0.65rem', marginBottom:'1rem' }}>
              <div style={{ background:'rgba(255,255,255,0.15)', borderRadius:'10px', padding:'6px',
                display:'flex', alignItems:'center', justifyContent:'center', backdropFilter:'blur(4px)' }}>
                <img src="/logo.jpg" alt="Home Heal Clinic" height="32" style={{ objectFit:'contain', borderRadius:'6px' }} />
              </div>
              <div>
                <div style={{ fontWeight:800, fontSize:'1.05rem', color:'#fff' }}>HomeHeal Clinic</div>
                <div style={{ fontSize:'0.7rem', color:'rgba(255,255,255,0.6)', letterSpacing:'0.05em' }}>BARZULLA, SRINAGAR</div>
              </div>
            </div>
            <p style={{ color:'rgba(255,255,255,0.72)', fontSize:'0.9rem', lineHeight:1.65, maxWidth:'280px', margin:0 }}>
              Healing That Listens, Care That Understands. Professional homecare services delivered with compassion.
            </p>
          </div>

          {/* Contact */}
          <div>
            <h4 style={{ color:'#fff', fontWeight:700, marginBottom:'1.25rem', fontSize:'0.95rem', letterSpacing:'0.04em', textTransform:'uppercase' }}>
              Contact Us
            </h4>
            {[
              { icon: <Phone size={15}/>, text: '+91 9149425496', href: 'tel:+919149425496' },
              { icon: <Phone size={15}/>, text: '+91 7006159475', href: 'tel:+917006159475' },
              { icon: <Phone size={15}/>, text: '+91 6006271727', href: 'tel:+916006271727' },
              { icon: <MapPin size={15}/>, text: 'Barzulla, Srinagar, J&K', href: null },
            ].map((item, i) => (
              <div key={i} style={{ display:'flex', alignItems:'center', gap:'0.6rem', marginBottom:'0.75rem' }}>
                <span style={{ color:'#67e8f9' }}>{item.icon}</span>
                {item.href
                  ? <a href={item.href} style={{ color:'rgba(255,255,255,0.8)', fontSize:'0.88rem', fontWeight:500 }}>{item.text}</a>
                  : <span style={{ color:'rgba(255,255,255,0.8)', fontSize:'0.88rem' }}>{item.text}</span>}
              </div>
            ))}
          </div>

          {/* Quick Links */}
          <div>
            <h4 style={{ color:'#fff', fontWeight:700, marginBottom:'1.25rem', fontSize:'0.95rem', letterSpacing:'0.04em', textTransform:'uppercase' }}>
              Quick Links
            </h4>
            {['Home', 'About', 'Services', 'Doctors', 'Book Appointment'].map(link => (
              <div key={link} style={{ marginBottom:'0.6rem' }}>
                <span style={{ color:'rgba(255,255,255,0.75)', fontSize:'0.88rem', cursor:'pointer',
                  transition:'color 0.2s' }}
                  onMouseEnter={e => e.currentTarget.style.color='#67e8f9'}
                  onMouseLeave={e => e.currentTarget.style.color='rgba(255,255,255,0.75)'}
                >{link}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{ borderTop:'1px solid rgba(255,255,255,0.15)', paddingTop:'1.75rem',
          display:'flex', alignItems:'center', justifyContent:'space-between', flexWrap:'wrap', gap:'1rem' }}>
          <p style={{ color:'rgba(255,255,255,0.6)', fontSize:'0.82rem', margin:0 }}>
            © {new Date().getFullYear()} Home Heal Clinic. Built with{' '}
            <Heart size={12} color="#f87171" style={{ verticalAlign:'middle', margin:'0 2px' }} />
            for the community of Srinagar.
          </p>
          <Link to="/admin/login"
            style={{
              display:'inline-flex', alignItems:'center', gap:'0.45rem',
              background:'rgba(255,255,255,0.12)',
              border:'1px solid rgba(255,255,255,0.25)',
              color:'rgba(255,255,255,0.85)',
              borderRadius:'8px', padding:'0.4rem 1rem',
              fontSize:'0.82rem', fontWeight:600,
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
    </footer>
  );
};

export default Footer;
