import React from 'react';
import { Phone, MapPin, CheckCircle } from 'lucide-react';
import CheckupBookingForm from '../components/CheckupBookingForm';

const PHONE_HREF = 'tel:+919000000000';
const MAPS_LINK  = 'https://maps.google.com/?q=34.0806043,74.7988594';

const WHY_ITEMS = [
  { icon: '⚡', title: 'Same-Day Results',   desc: 'Most routine tests reported the same day.' },
  { icon: '🏥', title: 'In-House Lab',       desc: 'No separate lab visit. Tests done right here.' },
  { icon: '👨‍⚕️', title: 'Doctor Consultation', desc: 'Physician explains your report with you.' },
  { icon: '🔒', title: 'Fully Confidential', desc: 'Results are private and only shared with you.' },
];

const BookCheckup = () => (
  <div style={{ background: '#fff' }}>

    {/* Hero */}
    <section style={{
      background: 'linear-gradient(135deg,#065f46 0%,#059669 50%,#0ea5e9 100%)',
      padding: '4rem 0',
    }}>
      <div className="container" style={{ textAlign: 'center' }}>
        <span style={{
          display: 'inline-flex', alignItems: 'center', gap: '0.4rem',
          background: 'rgba(255,255,255,0.15)', color: '#fff',
          border: '1px solid rgba(255,255,255,0.3)',
          fontWeight: 700, fontSize: '0.78rem',
          padding: '0.3rem 0.9rem', borderRadius: '9999px',
          marginBottom: '1rem',
        }}>🔬 Diagnostics & Health Checkups</span>

        <h1 style={{
          color: '#fff', fontWeight: 900,
          fontSize: 'clamp(1.8rem,5vw,3rem)',
          letterSpacing: '-0.03em', marginBottom: '1rem',
        }}>Book a Health Checkup</h1>

        <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: '1.05rem', lineHeight: 1.7, maxWidth: '540px', margin: '0 auto 1.5rem' }}>
          Choose from ECG, ECHO, blood tests, diabetes screening, comprehensive packages and more — all in-house at Apollo Clinic Srinagar.
        </p>

        <div style={{ display: 'flex', gap: '0.85rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <a href={PHONE_HREF} style={{
            display: 'inline-flex', alignItems: 'center', gap: '0.4rem',
            background: 'rgba(255,255,255,0.15)', color: '#fff',
            border: '1.5px solid rgba(255,255,255,0.35)',
            padding: '0.7rem 1.3rem', borderRadius: '9999px',
            fontWeight: 700, fontSize: '0.9rem', textDecoration: 'none',
          }}><Phone size={15} /> +91 9000000000</a>
          <a href={MAPS_LINK} target="_blank" rel="noreferrer" style={{
            display: 'inline-flex', alignItems: 'center', gap: '0.4rem',
            background: 'rgba(255,255,255,0.12)', color: '#fff',
            border: '1.5px solid rgba(255,255,255,0.25)',
            padding: '0.7rem 1.3rem', borderRadius: '9999px',
            fontWeight: 700, fontSize: '0.9rem', textDecoration: 'none',
          }}><MapPin size={15} /> Karan Nagar, Srinagar</a>
        </div>
      </div>
    </section>

    {/* Why choose */}
    <div style={{ background: '#f8fafc', borderBottom: '1px solid #e2e8f0' }}>
      <div className="container" style={{ padding: '2rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(200px,1fr))', gap: '1rem' }}>
          {WHY_ITEMS.map((w, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', padding: '0.85rem' }}>
              <div style={{ width: 38, height: 38, borderRadius: '10px', background: '#ecfdf5', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem', flexShrink: 0 }}>{w.icon}</div>
              <div>
                <div style={{ fontWeight: 800, fontSize: '0.85rem', color: '#065f46', marginBottom: '0.15rem' }}>{w.title}</div>
                <div style={{ fontSize: '0.78rem', color: '#64748b', lineHeight: 1.5 }}>{w.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>

    {/* Main: form + info */}
    <section style={{ padding: '5rem 0', background: '#fff' }}>
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(300px,1fr))', gap: '4rem', alignItems: 'start' }}>

          {/* Left */}
          <div>
            <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#059669', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.5rem' }}>Health Checkup</div>
            <h2 style={{ color: '#065f46', marginBottom: '0.85rem', fontSize: 'clamp(1.6rem,4vw,2.2rem)' }}>
              How It Works
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', marginBottom: '2rem' }}>
              {[
                { step: '1', title: 'Fill the form', desc: 'Select your checkup type, preferred date, and contact details.' },
                { step: '2', title: 'Send via WhatsApp', desc: 'The form opens WhatsApp with a pre-filled message to our team.' },
                { step: '3', title: 'Get confirmed', desc: 'We respond on WhatsApp to confirm your slot within a few hours.' },
                { step: '4', title: 'Walk in & get tested', desc: 'Visit Apollo Clinic Srinagar, Karan Nagar on your confirmed date.' },
              ].map((s, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                  <div style={{
                    width: 32, height: 32, borderRadius: '50%', flexShrink: 0,
                    background: '#059669', color: '#fff',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontWeight: 900, fontSize: '0.82rem',
                  }}>{s.step}</div>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: '0.9rem', color: '#065f46', marginBottom: '0.15rem' }}>{s.title}</div>
                    <div style={{ fontSize: '0.82rem', color: '#64748b', lineHeight: 1.55 }}>{s.desc}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Available tests */}
            <div style={{ background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: '14px', padding: '1.35rem' }}>
              <h4 style={{ color: '#065f46', fontWeight: 800, margin: '0 0 1rem', fontSize: '0.9rem' }}>Available Tests & Packages</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                {[
                  'ECG (12-Lead)', 'ECHO (Echocardiogram)', 'Pulmonary Function Test (PFT)',
                  'Blood Tests (CBC, LFT, KFT)', 'Thyroid Profile (TSH, T3, T4)',
                  'Diabetes Screening (HbA1c, Fasting Sugar)',
                  'Basic Health Screen Package', 'Comprehensive Health Package',
                  'Cardiac Risk Assessment Package',
                ].map((t, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.83rem', color: '#374151' }}>
                    <CheckCircle size={13} color="#059669" style={{ flexShrink: 0 }} />
                    {t}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right: form */}
          <div>
            <CheckupBookingForm />
            <div style={{ marginTop: '1.25rem', background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '1.1rem 1.25rem' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.55rem', fontSize: '0.83rem', color: '#334155' }}>
                  <MapPin size={13} color="#059669" />
                  Near National School, Arham Towers, Karan Nagar, Srinagar
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.55rem', fontSize: '0.83rem', color: '#334155' }}>
                  <span style={{ fontSize: '0.85rem' }}>🕐</span>
                  Mon–Sat: 12 PM – 7 PM · Sunday: 10 AM – 1:30 PM
                </div>
                <a href={PHONE_HREF} style={{ display: 'flex', alignItems: 'center', gap: '0.55rem', fontSize: '0.83rem', color: '#059669', fontWeight: 700, textDecoration: 'none' }}>
                  <Phone size={13} /> +91 9000000000
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
);

export default BookCheckup;
