import React from 'react';
import { MessageSquare, User, Phone, Calendar, FileText, CheckCircle, Stethoscope, ChevronDown } from 'lucide-react';
import { waLink } from '../config/contact';
import {
  checkRateLimit, recordAttempt,
  sanitizeInput, isValidName, isValidPhone, isValidDate, isValidMessage,
  isBot, isTooFast, isDuplicateSubmission, logSuspicious,
} from '../utils/security';
import { appointmentService } from '../services/appointmentService';

const RATE_KEY = 'booking_form';

const DEPARTMENTS = [
  'Orthopaedics',
  'Paediatrician',
  'Physician',
  'ENT',
  'Cardiologist',
  'Ophthalmologist',
  'Neuro Surgeon',
  'Dentist',
  'Psychologist',
  'Dietician',
  'Urologist',
  'Physiotherapist',
  'Infertility Clinic',
  'General Consultation',
];

const BookingForm = () => {
  const [focused,   setFocused]   = React.useState(null);
  const [submitted, setSubmitted] = React.useState(false);
  const [error,     setError]     = React.useState('');
  const mountTime = React.useRef(Date.now());

  // ── Save lead to Supabase so it appears in the Admin Dashboard ──
  const saveLeadToAdmin = async ({ name, phone, date, message, department }) => {
    const result = await appointmentService.saveLead({
      name: sanitizeInput(name, 100),
      phone: sanitizeInput(phone, 20),
      date: sanitizeInput(date, 10),
      department: sanitizeInput(department, 100),
      notes: sanitizeInput(message, 1000),
    });
    if (!result) throw new Error('Appointment was not saved.');
  };

  async function handleSubmit(e) {
    e.preventDefault();
    e.stopPropagation();
    await sendToWhatsApp(e);
  }

  async function sendToWhatsApp(e) {
    setError('');

    // Security Checks
    const hp = document.getElementById('booking_hp')?.value;
    if (isBot(hp)) return; 
    
    if (isDuplicateSubmission(RATE_KEY, 1000)) return;

    const rl = checkRateLimit(RATE_KEY, 10, 5 * 60 * 1000); 
    if (!rl.allowed) return setError(`Too many attempts. Please try again later.`);

    const name    = sanitizeInput(document.getElementById('name')?.value || '', 100);
    const rawPhone= sanitizeInput(document.getElementById('phone')?.value || '', 20);
    const phone   = '+91 ' + rawPhone;
    const date    = sanitizeInput(document.getElementById('date')?.value || '', 10);
    const department = sanitizeInput(document.getElementById('department')?.value || '', 100);
    const message = sanitizeInput(document.getElementById('message')?.value || '', 1000);

    if (!name || name.length < 2) return setError('Please enter your full name.');
    if (!isValidPhone(rawPhone))  return setError('Please enter a valid 10-digit phone number.');
    if (!date)                   return setError('Please select a preferred date.');

    recordAttempt(RATE_KEY);

    const text = [
      `New Appointment Request — Appolo Clinic Srinagar:`,
      `Name: ${name}`,
      `Phone: ${phone}`,
      `Department: ${department || 'Not specified'}`,
      `Date: ${date}`,
      `Message: ${message || 'No additional message.'}`
    ].join('\n');
    const waUrl = waLink(text);

    try {
      await saveLeadToAdmin({ name, phone, date, message, department });
    } catch {
      return setError('We could not save your booking. Please try again or contact the clinic directly.');
    }

    window.location.href = waUrl;

    setSubmitted(true);
    document.getElementById('booking-form')?.reset();
    setTimeout(() => setSubmitted(false), 4000);
  }

  const fieldStyle = (id) => ({
    width: '100%',
    padding: '0.85rem 1rem 0.85rem 2.8rem',
    border: `1.5px solid ${focused === id ? '#0ea5e9' : '#cce5f6'}`,
    borderRadius: '12px',
    background: focused === id ? '#fff' : '#f0f9ff',
    fontSize: '1rem',
    fontFamily: 'inherit',
    color: '#0f172a',
    transition: 'all 0.25s ease',
    boxShadow: focused === id ? '0 0 0 3px rgba(14,165,233,0.14)' : 'none',
    outline: 'none',
  });

  const iconColor = (id) => focused === id ? '#0ea5e9' : '#94a3b8';

  return (
    <div style={{
      background: '#fff',
      borderRadius: '20px',
      padding: '2.25rem',
      boxShadow: '0 12px 40px rgba(14,165,233,0.14)',
      border: '1.5px solid #cce5f6',
      maxWidth: '500px',
      margin: '0 auto',
      position: 'relative',
      overflow: 'hidden',
      zIndex: 1
    }}>
      {/* Top gradient bar */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: '4px',
        background: 'linear-gradient(90deg,#0369a1,#0ea5e9,#10b981)',
      }} />

      <div className="text-center" style={{ marginBottom: '1.75rem' }}>
        <span className="pill" style={{ marginBottom: '0.75rem', display: 'inline-block' }}>📅 Quick Booking</span>
        <h3 style={{ color: '#0c4a6e', fontWeight: 800, fontSize: '1.3rem', marginBottom: '0.3rem' }}>
          Book an Appointment
        </h3>
        <p style={{ color: '#64748b', fontSize: '0.85rem', margin: 0 }}>
          Complete the form and we'll confirm your appointment via WhatsApp.
        </p>
      </div>

      {/* ── Error Banner ── */}
      {error && (
        <div style={{
          background: '#fff1f2', border: '1.5px solid #fecdd3',
          color: '#be123c', padding: '0.85rem 1rem',
          borderRadius: '12px', marginBottom: '1.25rem',
          fontSize: '0.84rem', textAlign: 'center', lineHeight: 1.5,
        }}>
          ⚠️ {error}
        </div>
      )}

      {/* ── Success Banner (shows for 4s after submit) ── */}
      {submitted && (
        <div style={{
          background: 'linear-gradient(135deg,#ecfdf5,#f0fdf4)',
          border: '1.5px solid #6ee7b7',
          borderRadius: '14px',
          padding: '1.25rem 1.5rem',
          marginBottom: '1.5rem',
          display: 'flex', alignItems: 'flex-start', gap: '0.85rem',
          animation: 'fadeIn 0.4s ease',
        }}>
          <CheckCircle size={22} color="#10b981" style={{ flexShrink: 0, marginTop: '1px' }} />
          <div>
            <div style={{ fontWeight: 800, color: '#065f46', fontSize: '0.95rem', marginBottom: '0.3rem' }}>
              Booking Received! 🎉
            </div>
            <div style={{ color: '#047857', fontSize: '0.82rem', lineHeight: 1.6 }}>
              Your appointment request has been saved to our admin dashboard as a <strong>Pending</strong> inquiry.
              WhatsApp has opened so you can send your details directly to our team.
            </div>
          </div>
        </div>
      )}

      <form id="booking-form" onSubmit={handleSubmit}>

        {/* Honeypot — invisible to users, bots fill it */}
        <div style={{ position: 'absolute', left: '-9999px', opacity: 0, height: 0, overflow: 'hidden' }} aria-hidden="true">
          <input id="booking_hp" name="website_url" type="text" tabIndex="-1" autoComplete="off" />
        </div>

        {/* Name */}
        <div className="form-group">
          <label className="form-label" htmlFor="name">Full Name *</label>
          <div style={{ position: 'relative' }}>
            <User size={15} style={{ position:'absolute', left:'0.9rem', top:'50%', transform:'translateY(-50%)', color: iconColor('name'), transition:'color 0.2s' }} />
            <input id="name" name="name" type="text" required placeholder="e.g. Aisha Bhat"
              maxLength={100}
              style={fieldStyle('name')}
              onFocus={() => setFocused('name')}
              onBlur={() => setFocused(null)} />
          </div>
        </div>

        {/* Phone */}
        <div className="form-group">
          <label className="form-label" htmlFor="phone">Phone Number *</label>
          <div style={{ position: 'relative', display: 'flex' }}>
            <span style={{
              padding: '0.85rem 0.9rem', background: focused === 'phone' ? '#e0f2fe' : '#e8f4fd',
              border: `1.5px solid ${focused === 'phone' ? '#0ea5e9' : '#cce5f6'}`,
              borderRight: 'none', borderRadius: '12px 0 0 12px',
              color: '#0369a1', fontWeight: 700, fontSize: '0.9rem',
              transition: 'all 0.25s',
            }}>+91</span>
            <Phone size={14} style={{ position:'absolute', left:'4.2rem', top:'50%', transform:'translateY(-50%)', color: iconColor('phone'), transition:'color 0.2s' }} />
            <input id="phone" name="phone" type="tel" required placeholder="XXXXX XXXXX"
              maxLength={15}
              style={{ ...fieldStyle('phone'), borderRadius: '0 12px 12px 0', paddingLeft: '2.2rem', flex: 1 }}
              onFocus={() => setFocused('phone')}
              onBlur={() => setFocused(null)} />
          </div>
        </div>

        {/* Date */}
        <div className="form-group">
          <label className="form-label" htmlFor="date">Preferred Date *</label>
          <div style={{ position: 'relative' }}>
            <Calendar size={15} style={{ position:'absolute', left:'0.9rem', top:'50%', transform:'translateY(-50%)', color: iconColor('date'), transition:'color 0.2s', pointerEvents:'none' }} />
            <input id="date" name="date" type="date" required
              style={fieldStyle('date')}
              onFocus={() => setFocused('date')}
              onBlur={() => setFocused(null)} />
          </div>
        </div>

        {/* Department */}
        <div className="form-group">
          <label className="form-label" htmlFor="department">Department / Service *</label>
          <div style={{ position: 'relative' }}>
            <Stethoscope size={15} style={{ position:'absolute', left:'0.9rem', top:'50%', transform:'translateY(-50%)', color: iconColor('department'), transition:'color 0.2s', pointerEvents:'none', zIndex:1 }} />
            <ChevronDown size={15} style={{ position:'absolute', right:'0.9rem', top:'50%', transform:'translateY(-50%)', color: iconColor('department'), transition:'color 0.2s', pointerEvents:'none', zIndex:1 }} />
            <select id="department" name="department" required
              style={{ ...fieldStyle('department'), appearance: 'none', cursor: 'pointer', paddingRight: '2.5rem' }}
              onFocus={() => setFocused('department')}
              onBlur={() => setFocused(null)}>
              <option value="">Select a department</option>
              {DEPARTMENTS.map(d => <option key={d} value={d}>{d}</option>)}
            </select>
          </div>
        </div>

        {/* Message */}
        <div className="form-group">
          <label className="form-label" htmlFor="message">Concerns (Optional)</label>
          <div style={{ position: 'relative' }}>
            <FileText size={15} style={{ position:'absolute', left:'0.9rem', top:'0.95rem', color: iconColor('message'), transition:'color 0.2s' }} />
            <textarea id="message" name="message" rows="3"
              placeholder="e.g. Please describe your concerns..."
              maxLength={1000}
              style={{ ...fieldStyle('message'), paddingTop: '0.85rem', resize: 'vertical' }}
              onFocus={() => setFocused('message')}
              onBlur={() => setFocused(null)} />
          </div>
        </div>

        <button 
          type="button"
          className="btn btn-primary"
          onClick={handleSubmit}
          style={{ 
            width: '100%', 
            padding: '1rem', 
            marginTop: '0.5rem', 
            fontSize: '1rem', 
            fontWeight: 800, 
            borderRadius: '14px', 
            background: 'var(--navy)',
            cursor: 'pointer',
            position: 'relative',
            zIndex: 10,
            pointerEvents: 'auto',
            touchAction: 'manipulation',
            WebkitTapHighlightColor: 'transparent'
          }}>
          <MessageSquare size={20} />
          {submitted ? 'Booked! Open WhatsApp Again ↗' : 'Book Now'}
        </button>

        <p style={{ textAlign: 'center', fontSize: '0.75rem', color: '#94a3b8', marginTop: '0.85rem', marginBottom: 0 }}>
          🔒 Your information is saved securely and only visible to our admin team.
        </p>
      </form>
    </div>
  );
};

export default BookingForm;
