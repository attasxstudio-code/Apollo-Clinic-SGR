import React from 'react';
import { Phone, Clock, MapPin, CheckCircle, MessageCircle, Shield, Users, Lock, ChevronLeft, ShieldCheck, HeartPulse, FileText, Calendar } from 'lucide-react';
import CheckupBookingForm from '../components/CheckupBookingForm';
import { WORKING_HOURS, PRIMARY_PHONE, CLINIC_EMAIL } from '../config/contact';

const BookCheckup = () => (
  <div style={{ background: '#f8fafc', minHeight: '100vh' }}>
    
    {/* ── Main Section ── */}
    <section style={{ padding: '4rem 0 0rem', position: 'relative' }}>
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '70%', background: '#fff', zIndex: 0 }}></div>
      
      <div className="container" style={{ maxWidth: '1400px', position: 'relative', zIndex: 1 }}>
        <div className="m-grid-1" style={{ display: 'grid', gridTemplateColumns: '1fr 1.1fr', gap: '5rem', alignItems: 'flex-start' }}>

          {/* Left Column */}
          <div className="m-center" style={{ paddingTop: '2rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem' }}>
              <span style={{ color: 'var(--blue)', fontWeight: 800, fontSize: '0.85rem', letterSpacing: '1px', textTransform: 'uppercase' }}>
                HEALTH CHECKUPS
              </span>
            </div>
            
            <h1 style={{ fontSize: '3.5rem', lineHeight: 1.1, color: 'var(--navy)', marginBottom: '1rem' }}>
              Book Your<br/>Checkup
            </h1>
            
            <div style={{ height: '3px', width: '40px', background: 'var(--orange)', marginBottom: '1.5rem' }}></div>
            
            <p style={{ fontSize: '1.2rem', color: 'var(--body)', marginBottom: '3rem', lineHeight: 1.6, maxWidth: '420px' }}>
              Preventive care today leads to a healthier tomorrow. Schedule your checkup at a time that's convenient for you.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', marginBottom: '4rem' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1.25rem' }}>
                <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'var(--blue-light)', color: 'var(--blue)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <MessageCircle size={24} />
                </div>
                <div>
                  <h4 style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--navy)', marginBottom: '0.25rem' }}>Instant WhatsApp confirmation</h4>
                  <p style={{ fontSize: '0.95rem', color: 'var(--body)', margin: 0, lineHeight: 1.5 }}>We'll confirm your appointment<br/>via WhatsApp.</p>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1.25rem' }}>
                <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'var(--blue-light)', color: 'var(--blue)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <Shield size={24} />
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
                  <h4 style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--navy)', marginBottom: '0.25rem' }}>Expert Diagnostic Support</h4>
                  <p style={{ fontSize: '0.95rem', color: 'var(--body)', margin: 0, lineHeight: 1.5 }}>Backed by Apollo's trusted<br/>network of specialists.</p>
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
              <CheckupBookingForm />
            </div>
          </div>
          
        </div>
      </div>
    </section>

    {/* ── Bottom Strip ── */}
    <section style={{ padding: '6rem 0 3rem' }}>
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
              <h4 style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--navy)', marginBottom: '0.25rem' }}>WhatsApp Assistance</h4>
              <p style={{ fontSize: '0.85rem', color: 'var(--body)', margin: 0 }}>Get instant confirmation<br/>on WhatsApp.</p>
            </div>
          </div>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', borderRight: '1px solid rgba(0,0,0,0.05)' }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'var(--blue-light)', color: 'var(--blue)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Clock size={24} />
            </div>
            <div>
              <h4 style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--navy)', marginBottom: '0.25rem' }}>Clinic Hours</h4>
              <p style={{ fontSize: '0.85rem', color: 'var(--body)', margin: 0 }}>
                {WORKING_HOURS.weekdays.label.replace('Monday – Saturday', 'Mon–Sat')}: {WORKING_HOURS.weekdays.time.replace('08:00 AM – 07:00 PM', '8 AM–7 PM')}<br/>
                {WORKING_HOURS.sunday.label}: {WORKING_HOURS.sunday.time.replace('08:00 AM – 02:00 PM', '8 AM–2 PM')}
              </p>
            </div>
          </div>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'var(--blue-light)', color: 'var(--blue)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Phone size={24} />
            </div>
            <div>
              <h4 style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--navy)', marginBottom: '0.25rem' }}>Need Help?</h4>
              <p style={{ fontSize: '0.85rem', color: 'var(--body)', margin: 0 }}>Call us at {PRIMARY_PHONE}<br/>or email {CLINIC_EMAIL}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    {/* ── How It Works ── */}
    <section style={{ padding: '3rem 0 6rem' }}>
      <div className="container" style={{ maxWidth: '1400px', textAlign: 'center' }}>
        <div style={{ display: 'inline-block', marginBottom: '1rem' }}>
          <span style={{ color: 'var(--blue)', fontWeight: 800, fontSize: '0.85rem', letterSpacing: '1px', textTransform: 'uppercase' }}>
            HOW IT WORKS
          </span>
          <div style={{ height: '3px', width: '30px', background: 'var(--orange)', margin: '4px auto 0' }}></div>
        </div>
        <h2 style={{ fontSize: '2.2rem', color: 'var(--navy)', marginBottom: '4rem' }}>
          Simple steps to better health
        </h2>

        <div className="m-grid-2" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '2rem', position: 'relative' }}>
          {/* Connecting line */}
          <div style={{ position: 'absolute', top: '40px', left: '12%', right: '12%', height: '2px', background: 'rgba(0,0,0,0.05)', zIndex: 0 }}></div>
          
          <div style={{ position: 'relative', zIndex: 1, background: '#f8fafc', padding: '0 1rem' }}>
            <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: '#fff', border: '1px solid rgba(0,0,0,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem', boxShadow: '0 10px 30px rgba(0,0,0,0.02)', position: 'relative' }}>
              <Calendar size={32} color="var(--blue)" />
              <div style={{ position: 'absolute', bottom: '-10px', width: '24px', height: '24px', borderRadius: '50%', background: 'var(--navy)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.75rem', fontWeight: 800, border: '2px solid #fff' }}>1</div>
            </div>
            <h4 style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--navy)', marginBottom: '0.5rem' }}>Book Your Checkup</h4>
            <p style={{ fontSize: '0.85rem', color: 'var(--body)' }}>Fill in the form with your details and preferred date.</p>
          </div>

          <div style={{ position: 'relative', zIndex: 1, background: '#f8fafc', padding: '0 1rem' }}>
            <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: '#fff', border: '1px solid rgba(0,0,0,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem', boxShadow: '0 10px 30px rgba(0,0,0,0.02)', position: 'relative' }}>
              <MessageCircle size={32} color="#10b981" />
              <div style={{ position: 'absolute', bottom: '-10px', width: '24px', height: '24px', borderRadius: '50%', background: 'var(--navy)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.75rem', fontWeight: 800, border: '2px solid #fff' }}>2</div>
            </div>
            <h4 style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--navy)', marginBottom: '0.5rem' }}>Get WhatsApp Confirmation</h4>
            <p style={{ fontSize: '0.85rem', color: 'var(--body)' }}>We'll confirm your appointment instantly on WhatsApp.</p>
          </div>

          <div style={{ position: 'relative', zIndex: 1, background: '#f8fafc', padding: '0 1rem' }}>
            <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: '#fff', border: '1px solid rgba(0,0,0,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem', boxShadow: '0 10px 30px rgba(0,0,0,0.02)', position: 'relative' }}>
              <HeartPulse size={32} color="var(--blue)" />
              <div style={{ position: 'absolute', bottom: '-10px', width: '24px', height: '24px', borderRadius: '50%', background: 'var(--navy)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.75rem', fontWeight: 800, border: '2px solid #fff' }}>3</div>
            </div>
            <h4 style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--navy)', marginBottom: '0.5rem' }}>Visit & Get Checked</h4>
            <p style={{ fontSize: '0.85rem', color: 'var(--body)' }}>Our experts will take care of your health.</p>
          </div>

          <div style={{ position: 'relative', zIndex: 1, background: '#f8fafc', padding: '0 1rem' }}>
            <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: '#fff', border: '1px solid rgba(0,0,0,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem', boxShadow: '0 10px 30px rgba(0,0,0,0.02)', position: 'relative' }}>
              <FileText size={32} color="var(--blue)" />
              <div style={{ position: 'absolute', bottom: '-10px', width: '24px', height: '24px', borderRadius: '50%', background: 'var(--navy)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.75rem', fontWeight: 800, border: '2px solid #fff' }}>4</div>
            </div>
            <h4 style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--navy)', marginBottom: '0.5rem' }}>Receive Reports</h4>
            <p style={{ fontSize: '0.85rem', color: 'var(--body)' }}>Get your reports and expert advice with next steps.</p>
          </div>
        </div>
      </div>
    </section>

  </div>
);

export default BookCheckup;
