import React, { useState, useEffect } from 'react';
import { Calendar, CheckCircle, Phone, User, AlertCircle } from 'lucide-react';
import { getDoctorSettings } from '../services/visitingDoctorAppointments';
import { appointmentService } from '../services/appointmentService';
import { WHATSAPP_NUMBER } from '../config/contact';

const VisitingDoctorBookingForm = ({ doc }) => {
  const [settings, setSettings] = useState({ currentMonthFull: false, acceptNextMonthBookings: true });
  const [name, setName] = useState('');
  const [phone, setPhoneVal] = useState('');
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const s = getDoctorSettings(doc.id);
    setSettings(s);
  }, [doc.id]);

  const bookingCycle = settings.currentMonthFull ? 'next-month' : 'current-month';
  const bookingDisabled = settings.currentMonthFull && !settings.acceptNextMonthBookings;

  const validate = () => {
    const e = {};
    if (!name.trim()) e.name = 'Name is required.';
    const cleaned = phone.replace(/[\s\-+()]/g, '');
    if (!cleaned) {
      e.phone = 'Phone number is required.';
    } else if (!/^\d{10,13}$/.test(cleaned)) {
      e.phone = 'Enter a valid 10-digit phone number.';
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate() || submitting) return;
    setSubmitting(true);

    try {
      appointmentService.saveVisitingAppointment({
        doctorSlug: doc.id,
        doctorName: doc.name,
        patientName: name.trim(),
        phone: phone.trim(),
        bookingCycle,
        bookingMonthLabel: bookingCycle === 'next-month' ? 'Next Month' : 'Current Month'
      }).then(appt => {
         // Optionally update something with appt.id if needed
      });

      // Mark success before WhatsApp redirect
      setSuccess(true);
      setSubmitting(false);

      // Build WhatsApp message
      const cycleLabel = bookingCycle === 'next-month'
        ? 'Next monthly visit'
        : 'Selected monthly visit / Once a month';

      const msg = `Hello Apollo Clinic Srinagar, I want to book a visiting appointment.\n\nDoctor: ${doc.name}\nPatient Name: ${name.trim()}\nPhone Number: ${phone.trim()}\nAppointment Type: Visiting Doctor Appointment\nVisit Schedule: ${cycleLabel}\n\nPlease contact me to confirm my spot.`;

      // Update whatsapp status
      // WhatsApp redirection is handled by the browser redirect below
      // markWhatsappRedirected(appt.id);

      // Open WhatsApp after short delay so user sees success
      setTimeout(() => {
        const waPhone = WHATSAPP_NUMBER.replace(/[\s\-+()]/g, '');
        const waNum = waPhone.startsWith('91') ? waPhone : `91${waPhone}`;
        console.log('Redirecting to WhatsApp:', waNum);
        window.location.href = `https://wa.me/${waNum}?text=${encodeURIComponent(msg)}`;
      }, 800);

    } catch {
      setSubmitting(false);
      setErrors({ form: 'Something went wrong. Please try again.' });
    }
  };

  const inputStyle = {
    width: '100%', padding: '0.8rem 1rem',
    border: '1.5px solid rgba(13,82,192,0.15)',
    borderRadius: '10px', background: '#f8fbff',
    fontSize: '0.9rem', fontFamily: 'inherit',
    color: '#0f172a', outline: 'none',
    transition: 'all 0.2s', boxSizing: 'border-box',
  };

  const labelStyle = {
    display: 'block', fontSize: '0.78rem', fontWeight: 800,
    color: '#1a365d', marginBottom: '0.4rem',
  };

  const errorStyle = {
    fontSize: '0.75rem', color: '#ef4444', marginTop: '0.3rem',
    display: 'flex', alignItems: 'center', gap: '0.25rem',
  };

  /* ── Booking Disabled State ── */
  if (bookingDisabled) {
    return (
      <div id="visiting-booking-form" style={{
        display: 'flex', flexDirection: 'column', gap: '1.5rem',
      }}>
        <div style={{
          background: '#fff', borderRadius: '16px', border: '1.5px solid #fde68a',
          borderTop: '4px solid #f59e0b', padding: '2rem 1.5rem',
          boxShadow: '0 4px 20px rgba(245,158,11,0.08)',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
            <div style={{
              width: 40, height: 40, borderRadius: '10px',
              background: '#fffbeb', color: '#f59e0b',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <AlertCircle size={20} />
            </div>
            <h3 style={{ fontSize: '1.1rem', color: '#92400e', margin: 0, fontWeight: 800 }}>
              Bookings Currently Full
            </h3>
          </div>
          <p style={{
            fontSize: '0.9rem', color: '#78716c', lineHeight: 1.65, margin: 0,
          }}>
            All visiting appointment slots for <strong>{doc.name}</strong> are currently full.
            Please contact Apollo Clinic Srinagar directly for availability or check back later.
          </p>
          <a href="tel:01942488069" style={{
            display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
            marginTop: '1.25rem', padding: '0.7rem 1.25rem',
            background: '#f59e0b', color: '#fff', borderRadius: '10px',
            fontWeight: 700, fontSize: '0.85rem', textDecoration: 'none',
          }}>
            <Phone size={15} /> Call Clinic for Availability
          </a>
        </div>
      </div>
    );
  }

  /* ── Success State ── */
  if (success) {
    return (
      <div id="visiting-booking-form" style={{
        display: 'flex', flexDirection: 'column', gap: '1.5rem',
      }}>
        <div style={{
          background: '#fff', borderRadius: '16px', border: '1.5px solid #a7f3d0',
          borderTop: '4px solid #10b981', padding: '2.5rem 1.5rem',
          boxShadow: '0 4px 20px rgba(16,185,129,0.08)', textAlign: 'center',
        }}>
          <div style={{
            width: 64, height: 64, borderRadius: '50%',
            background: '#ecfdf5', color: '#10b981',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            margin: '0 auto 1.25rem',
          }}>
            <CheckCircle size={32} />
          </div>
          <h3 style={{ fontSize: '1.3rem', color: '#065f46', marginBottom: '0.5rem' }}>
            Appointment Request Sent!
          </h3>
          <p style={{ fontSize: '0.9rem', color: '#64748b', lineHeight: 1.6, maxWidth: 380, margin: '0 auto 1.5rem' }}>
            Your visiting appointment request for <strong>{doc.name}</strong> has been submitted.
            You are being redirected to WhatsApp to confirm. Our team will contact you shortly.
          </p>
          <button
            onClick={() => { setSuccess(false); setName(''); setPhoneVal(''); setErrors({}); }}
            style={{
              padding: '0.7rem 1.5rem', borderRadius: '10px',
              border: '1.5px solid #a7f3d0', background: '#ecfdf5',
              color: '#065f46', fontWeight: 700, fontSize: '0.85rem',
              cursor: 'pointer', fontFamily: 'inherit',
            }}
          >
            Book Another Appointment
          </button>
        </div>
      </div>
    );
  }

  /* ── Form State ── */
  return (
    <div id="visiting-booking-form" style={{
      display: 'flex', flexDirection: 'column', gap: '1.5rem',
    }}>
      <div style={{
        background: '#fff', borderRadius: '16px',
        border: '1.5px solid rgba(13,82,192,0.1)',
        borderTop: '4px solid var(--orange, #f97316)',
        padding: '1.75rem 1.5rem',
        boxShadow: '0 4px 24px rgba(13,82,192,0.06)',
      }}>
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem' }}>
          <div style={{
            width: 40, height: 40, borderRadius: '10px',
            background: 'rgba(249,115,22,0.1)', color: '#f97316',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <Calendar size={20} />
          </div>
          <div>
            <h3 style={{ fontSize: '1.1rem', color: '#1a365d', margin: 0, fontWeight: 800 }}>
              Book a Visiting Appointment
            </h3>
            <p style={{ fontSize: '0.75rem', color: '#94a3b8', margin: '2px 0 0' }}>
              Booking for <strong style={{ color: '#0369a1' }}>{doc.name}</strong>
            </p>
          </div>
        </div>

        {/* Cycle Note */}
        <div style={{
          padding: '0.7rem 1rem', borderRadius: '10px',
          background: bookingCycle === 'next-month' ? '#fffbeb' : '#f0f9ff',
          border: `1px solid ${bookingCycle === 'next-month' ? '#fde68a' : '#bae6fd'}`,
          fontSize: '0.82rem', lineHeight: 1.5,
          color: bookingCycle === 'next-month' ? '#92400e' : '#0c4a6e',
          marginBottom: '1.5rem',
        }}>
          {bookingCycle === 'next-month'
            ? '⚡ Current month slots are full. You can register for the next monthly visit.'
            : '📋 Limited monthly slots available. Our team will contact you to confirm your spot.'}
        </div>

        {/* Global error */}
        {errors.form && (
          <div style={{
            padding: '0.7rem 1rem', borderRadius: '10px',
            background: '#fef2f2', border: '1px solid #fecaca',
            color: '#991b1b', fontSize: '0.82rem', marginBottom: '1rem',
            display: 'flex', alignItems: 'center', gap: '0.5rem',
          }}>
            <AlertCircle size={15} /> {errors.form}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {/* Name */}
          <div>
            <label style={labelStyle}>
              <User size={13} style={{ marginRight: 4, verticalAlign: 'middle' }} />
              Full Name *
            </label>
            <input
              type="text"
              placeholder="Enter your full name"
              maxLength={100}
              value={name}
              onChange={e => { setName(e.target.value); if (errors.name) setErrors(p => ({ ...p, name: '' })); }}
              style={{
                ...inputStyle,
                borderColor: errors.name ? '#fecaca' : inputStyle.border,
              }}
              onFocus={e => { e.target.style.borderColor = '#0ea5e9'; e.target.style.background = '#fff'; }}
              onBlur={e => { e.target.style.borderColor = errors.name ? '#fecaca' : 'rgba(13,82,192,0.15)'; e.target.style.background = '#f8fbff'; }}
            />
            {errors.name && <div style={errorStyle}><AlertCircle size={12} /> {errors.name}</div>}
          </div>

          {/* Phone */}
          <div>
            <label style={labelStyle}>
              <Phone size={13} style={{ marginRight: 4, verticalAlign: 'middle' }} />
              Phone Number *
            </label>
            <input
              type="tel"
              placeholder="+91 XXXXX XXXXX"
              maxLength={15}
              value={phone}
              onChange={e => { setPhoneVal(e.target.value); if (errors.phone) setErrors(p => ({ ...p, phone: '' })); }}
              style={{
                ...inputStyle,
                borderColor: errors.phone ? '#fecaca' : inputStyle.border,
              }}
              onFocus={e => { e.target.style.borderColor = '#0ea5e9'; e.target.style.background = '#fff'; }}
              onBlur={e => { e.target.style.borderColor = errors.phone ? '#fecaca' : 'rgba(13,82,192,0.15)'; e.target.style.background = '#f8fbff'; }}
            />
            {errors.phone && <div style={errorStyle}><AlertCircle size={12} /> {errors.phone}</div>}
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={submitting}
            style={{
              width: '100%', minHeight: 50,
              padding: '0.8rem', borderRadius: '12px', border: 'none',
              background: submitting
                ? 'linear-gradient(135deg,#c4b5fd,#a5b4fc)'
                : 'linear-gradient(135deg,#f97316,#ea580c)',
              color: '#fff', fontWeight: 800, fontSize: '0.95rem',
              cursor: submitting ? 'wait' : 'pointer',
              fontFamily: 'inherit', transition: 'all 0.2s',
              boxShadow: submitting ? 'none' : '0 4px 16px rgba(249,115,22,0.3)',
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem',
            }}
          >
            {submitting ? 'Submitting…' : '📩 Book Visiting Appointment'}
          </button>
        </form>

        <p style={{
          fontSize: '0.73rem', color: '#94a3b8', marginTop: '1rem',
          textAlign: 'center', lineHeight: 1.5,
        }}>
          After submitting, you'll be redirected to WhatsApp. Our team will contact you to confirm your spot.
        </p>
      </div>
    </div>
  );
};

export default VisitingDoctorBookingForm;
