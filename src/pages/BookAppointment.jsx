import React, { useState, useEffect } from 'react';
import { Phone, Clock, MapPin, CheckCircle, MessageCircle, Shield, Users, Lock, ChevronLeft, ShieldCheck } from 'lucide-react';
import BookingForm from '../components/BookingForm';
import { WORKING_HOURS } from '../config/contact';

const BookAppointment = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <div style={{ background: '#f8fafc', minHeight: '100vh' }}>
      
      {/* ── Main Section ── */}
      <section style={{ padding: '2rem 0 2rem' }}>
        <div className="container" style={{ maxWidth: '1200px' }}>
          
          {/* Header - Only show on mobile */}
          {isMobile && (
            <div style={{ marginBottom: '1.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
                <ChevronLeft size={16} color="var(--blue)" />
                <span style={{ color: 'var(--blue)', fontWeight: 800, fontSize: '0.85rem', letterSpacing: '1px' }}>APPOINTMENTS</span>
              </div>
              <h1 style={{ fontSize: '2rem', lineHeight: 1.2, color: 'var(--navy)', marginBottom: '0.5rem' }}>
                Book Your<br/>Appointment
              </h1>
            </div>
          )}

          {/* Form Section - First on mobile, right on desktop */}
          <div style={{ 
            background: '#fff', 
            borderRadius: '20px', 
            padding: isMobile ? '1.5rem' : '2.5rem 3rem',
            boxShadow: '0 10px 40px rgba(0,0,0,0.08)', 
            border: '1px solid #e2e8f0',
            position: 'relative',
            zIndex: 100
          }}>
            <BookingForm />
          </div>

          {/* Info Section - Only show on desktop */}
          {!isMobile && (
            <div style={{ paddingTop: '2rem' }}>
              <h1 style={{ fontSize: '3.5rem', lineHeight: 1.1, color: 'var(--navy)', marginBottom: '1rem' }}>
                Book Your<br/>Appointment
              </h1>
              <div style={{ height: '3px', width: '40px', background: 'var(--orange)', marginBottom: '1.5rem' }}></div>
              <p style={{ fontSize: '1.25rem', color: 'var(--body)', marginBottom: '3rem', lineHeight: 1.6, maxWidth: '400px' }}>
                Expert care. Personal attention.<br/>We're here for you and your family.
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', marginBottom: '4rem' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1.25rem' }}>
                  <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'var(--blue-light)', color: 'var(--blue)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <MessageCircle size={24} />
                  </div>
                  <div>
                    <h4 style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--navy)', marginBottom: '0.25rem' }}>WhatsApp Confirmation</h4>
                    <p style={{ fontSize: '0.95rem', color: 'var(--body)', margin: 0 }}>We'll confirm your appointment<br/>via WhatsApp.</p>
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1.25rem' }}>
                  <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'var(--blue-light)', color: 'var(--blue)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Lock size={24} />
                  </div>
                  <div>
                    <h4 style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--navy)', marginBottom: '0.25rem' }}>Secure & Confidential</h4>
                    <p style={{ fontSize: '0.95rem', color: 'var(--body)', margin: 0 }}>Your information is protected<br/>with the highest standards.</p>
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1.25rem' }}>
                  <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'var(--blue-light)', color: 'var(--blue)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Users size={24} />
                  </div>
                  <div>
                    <h4 style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--navy)', marginBottom: '0.25rem' }}>Trusted by Millions</h4>
                    <p style={{ fontSize: '0.95rem', color: 'var(--body)', margin: 0 }}>India's most trusted healthcare<br/>brand for over 40 years.</p>
                  </div>
                </div>
              </div>

              <div style={{ height: '320px', borderRadius: '24px', overflow: 'hidden', boxShadow: '0 20px 40px rgba(0,0,0,0.1)' }}>
                <img src="/images/clinic/reception.webp" alt="Appolo Clinic Reception" loading="lazy" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
            </div>
          )}

        </div>
      </section>

      {/* ── Bottom Strip ── */}
      <section style={{ padding: '3rem 0' }}>
        <div className="container" style={{ maxWidth: '1200px' }}>
          <div style={{ 
            background: '#fff', borderRadius: '16px', padding: '1.5rem 2rem',
            border: '1px solid rgba(0,0,0,0.05)', boxShadow: '0 10px 40px rgba(0,0,0,0.03)',
            display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)', gap: '1.5rem'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: '#ecfdf5', color: '#10b981', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <MessageCircle size={20} />
              </div>
              <div>
                <h4 style={{ fontSize: '0.9rem', fontWeight: 800, color: 'var(--navy)', marginBottom: '0.2rem' }}>WhatsApp Confirmation</h4>
                <p style={{ fontSize: '0.8rem', color: 'var(--body)', margin: 0 }}>Get instant confirmation</p>
              </div>
            </div>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'var(--blue-light)', color: 'var(--blue)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <ShieldCheck size={20} />
              </div>
              <div>
                <h4 style={{ fontSize: '0.9rem', fontWeight: 800, color: 'var(--navy)', marginBottom: '0.2rem' }}>Secure Information</h4>
                <p style={{ fontSize: '0.8rem', color: 'var(--body)', margin: 0 }}>Your data is encrypted</p>
              </div>
            </div>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'var(--blue-light)', color: 'var(--blue)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Clock size={20} />
              </div>
              <div>
                <h4 style={{ fontSize: '0.9rem', fontWeight: 800, color: 'var(--navy)', marginBottom: '0.2rem' }}>Care, When You Need</h4>
                <p style={{ fontSize: '0.8rem', color: 'var(--body)', margin: 0 }}>
                  Mon–Sat: 8 AM–7 PM<br/>Sun: 8 AM–2 PM
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default BookAppointment;