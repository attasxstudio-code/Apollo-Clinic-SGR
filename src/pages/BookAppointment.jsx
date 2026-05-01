import React from 'react';
import { Phone, Clock, MapPin, CheckCircle, MessageCircle, Shield, Users, Lock, ChevronLeft, ShieldCheck } from 'lucide-react';
import BookingForm from '../components/BookingForm';
import { WORKING_HOURS } from '../config/contact';

const BookAppointment = () => (
  <div style={{ background: '#f8fafc', minHeight: '100vh' }}>
    
    {/* ── Main Section ── */}
    <section style={{ padding: '4rem 0 0rem', position: 'relative' }}>
      {/* Background gradient for top half */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '70%', background: '#fff', zIndex: 0 }}></div>
      
      <div className="container" style={{ maxWidth: '1400px', position: 'relative', zIndex: 1 }}>
        <div className="m-grid-1" style={{ display: 'grid', gridTemplateColumns: '1fr 1.1fr', gap: '5rem', alignItems: 'flex-start' }}>

          {/* Left Column: Info & Image */}
          <div className="m-center" style={{ paddingTop: '2rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem' }}>
              <ChevronLeft size={16} color="var(--blue)" />
              <span style={{ color: 'var(--blue)', fontWeight: 800, fontSize: '0.85rem', letterSpacing: '1px', textTransform: 'uppercase' }}>
                APPOINTMENTS
              </span>
            </div>
            
            <h1 style={{ fontSize: '3.5rem', lineHeight: 1.1, color: 'var(--navy)', marginBottom: '1rem' }}>
              Book Your<br/>Appointment
            </h1>
            
            <div style={{ height: '3px', width: '40px', background: 'var(--orange)', marginBottom: '1.5rem' }}></div>
            
            <p style={{ fontSize: '1.25rem', color: 'var(--body)', marginBottom: '3rem', lineHeight: 1.6, maxWidth: '400px' }}>
              Expert care. Personal attention.<br/>We're here for you and your family.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', marginBottom: '4rem' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1.25rem' }}>
                <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'var(--blue-light)', color: 'var(--blue)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <MessageCircle size={24} />
                </div>
                <div>
                  <h4 style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--navy)', marginBottom: '0.25rem' }}>WhatsApp Confirmation</h4>
                  <p style={{ fontSize: '0.95rem', color: 'var(--body)', margin: 0, lineHeight: 1.5 }}>We'll confirm your appointment<br/>via WhatsApp.</p>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1.25rem' }}>
                <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'var(--blue-light)', color: 'var(--blue)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <Lock size={24} />
                </div>
                <div>
                  <h4 style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--navy)', marginBottom: '0.25rem' }}>Secure & Confidential</h4>
                  <p style={{ fontSize: '0.95rem', color: 'var(--body)', margin: 0, lineHeight: 1.5 }}>Your information is protected<br/>with the highest standards.</p>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1.25rem' }}>
                <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'var(--blue-light)', color: 'var(--blue)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <Users size={24} />
                </div>
                <div>
                  <h4 style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--navy)', marginBottom: '0.25rem' }}>Trusted by Millions</h4>
                  <p style={{ fontSize: '0.95rem', color: 'var(--body)', margin: 0, lineHeight: 1.5 }}>India's most trusted healthcare<br/>brand for over 40 years.</p>
                </div>
              </div>
            </div>

            <div className="m-h-auto m-ml-0" style={{ height: '320px', borderRadius: '24px', overflow: 'hidden', boxShadow: '0 20px 40px rgba(0,0,0,0.1)', marginLeft: '-2rem' }}>
              <img src="/clinic-reception.png" alt="Apollo Clinic Reception" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
          </div>

          {/* Right Column: Form */}
          <div style={{ paddingTop: '1rem' }}>
            <div className="m-p-sm" style={{ 
              background: '#fff', borderRadius: '24px', padding: '3rem 4rem', 
              boxShadow: '0 20px 60px rgba(0,0,0,0.06)', border: '1px solid rgba(0,0,0,0.05)',
              maxWidth: '600px', margin: '0 auto'
            }}>
              <BookingForm />
            </div>
          </div>
          
        </div>
      </div>
    </section>

    {/* ── Bottom Strip ── */}
    <section style={{ padding: '6rem 0' }}>
      <div className="container" style={{ maxWidth: '1400px' }}>
        <div className="m-grid-1 m-p-sm" style={{ 
          background: '#fff', borderRadius: '16px', padding: '2rem 3rem',
          border: '1px solid rgba(0,0,0,0.05)', boxShadow: '0 10px 40px rgba(0,0,0,0.03)',
          display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2rem'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', borderRight: '1px solid rgba(0,0,0,0.05)' }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: '#ecfdf5', color: '#10b981', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <MessageCircle size={24} />
            </div>
            <div>
              <h4 style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--navy)', marginBottom: '0.25rem' }}>WhatsApp Confirmation</h4>
              <p style={{ fontSize: '0.85rem', color: 'var(--body)', margin: 0 }}>Get instant confirmation<br/>on WhatsApp.</p>
            </div>
          </div>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', borderRight: '1px solid rgba(0,0,0,0.05)' }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'var(--blue-light)', color: 'var(--blue)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <ShieldCheck size={24} />
            </div>
            <div>
              <h4 style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--navy)', marginBottom: '0.25rem' }}>Secure Information</h4>
              <p style={{ fontSize: '0.85rem', color: 'var(--body)', margin: 0 }}>Your data is encrypted and<br/>handled with care.</p>
            </div>
          </div>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'var(--blue-light)', color: 'var(--blue)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Clock size={24} />
            </div>
            <div>
              <h4 style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--navy)', marginBottom: '0.25rem' }}>Care, When You Need</h4>
              <p style={{ fontSize: '0.85rem', color: 'var(--body)', margin: 0 }}>
                {WORKING_HOURS.weekdays.label.replace('Monday – Saturday', 'Mon–Sat')}: {WORKING_HOURS.weekdays.time.replace('08:00 AM – 07:00 PM', '8 AM–7 PM')}<br/>
                {WORKING_HOURS.sunday.label}: {WORKING_HOURS.sunday.time.replace('08:00 AM – 02:00 PM', '8 AM–2 PM')}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

  </div>
);

export default BookAppointment;
