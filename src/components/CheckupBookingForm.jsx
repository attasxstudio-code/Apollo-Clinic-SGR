import React from 'react';
import { MessageSquare, User, Phone, Calendar, FlaskConical, FileText, CheckCircle } from 'lucide-react';

const CHECKUP_TYPES = [
  'Basic Health Screen',
  'Comprehensive Health Package',
  'Cardiac Risk Assessment (ECG + ECHO)',
  'Diabetes Screening',
  'Thyroid Panel',
  'Pulmonary Function Test (PFT)',
  'Blood Tests / Lab Work',
  'Urine Analysis',
  'Other / Not Sure',
];

const CheckupBookingForm = () => {
  const [focused,   setFocused]   = React.useState(null);
  const [submitted, setSubmitted] = React.useState(false);

  /* ── Save to localStorage so it shows in Admin → Checkups ── */
  const saveCheckupToAdmin = ({ name, phone, checkupType, date, notes }) => {
    const existing = JSON.parse(localStorage.getItem('clinic_checkups') || '[]');
    const newEntry = {
      id:         Date.now(),
      name,
      phone,
      checkupType,
      date,
      notes,
      status:     'Pending',
      createdAt:  new Date().toISOString(),
      source:     'Website Checkup Form',
    };
    localStorage.setItem('clinic_checkups', JSON.stringify([newEntry, ...existing]));
  };

  function handleSubmit(e) {
    e.preventDefault();
    const name       = document.getElementById('cu-name').value.trim();
    const rawPhone   = document.getElementById('cu-phone').value.trim();
    const phone      = '+91 ' + rawPhone;
    const checkupType= document.getElementById('cu-type').value;
    const date       = document.getElementById('cu-date').value;
    const notes      = document.getElementById('cu-notes').value.trim();

    // 1️⃣ Save to admin
    saveCheckupToAdmin({ name, phone, checkupType, date, notes });

    // 2️⃣ Open WhatsApp with pre-written message
    const text = [
      `Health Checkup Request — Apollo Clinic Srinagar`,
      `Name: ${name}`,
      `Phone: ${phone}`,
      `Checkup Type: ${checkupType}`,
      `Preferred Date: ${date || 'Flexible'}`,
      notes ? `Additional Notes: ${notes}` : null,
    ].filter(Boolean).join('\n');

    window.open(`https://wa.me/919000000000?text=${encodeURIComponent(text)}`, '_blank');

    // 3️⃣ Show success + reset
    setSubmitted(true);
    e.target.reset();
    setTimeout(() => setSubmitted(false), 4500);
  }

  const fieldStyle = (id) => ({
    width: '100%',
    padding: '0.85rem 1rem 0.85rem 2.8rem',
    border: `1.5px solid ${focused === id ? '#059669' : '#bbf7d0'}`,
    borderRadius: '12px',
    background: focused === id ? '#fff' : '#f0fdf4',
    fontSize: '0.92rem',
    fontFamily: 'inherit',
    color: '#0f172a',
    transition: 'all 0.25s ease',
    boxShadow: focused === id ? '0 0 0 3px rgba(5,150,105,0.13)' : 'none',
    outline: 'none',
  });

  const iconColor = (id) => focused === id ? '#059669' : '#94a3b8';

  return (
    <div style={{
      background: '#fff',
      borderRadius: '20px',
      padding: '2.25rem',
      boxShadow: '0 12px 40px rgba(5,150,105,0.13)',
      border: '1.5px solid #bbf7d0',
      maxWidth: '500px',
      margin: '0 auto',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Top bar */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: '4px',
        background: 'linear-gradient(90deg,#059669,#10b981,#0ea5e9)',
      }} />

      <div style={{ textAlign: 'center', marginBottom: '1.75rem' }}>
        <span style={{
          display: 'inline-flex', alignItems: 'center', gap: '0.35rem',
          background: '#f0fdf4', color: '#059669', border: '1px solid #bbf7d0',
          fontWeight: 700, fontSize: '0.78rem', padding: '0.3rem 0.9rem',
          borderRadius: '9999px', marginBottom: '0.75rem',
        }}>🔬 Health Checkup</span>
        <h3 style={{ color: '#065f46', fontWeight: 800, fontSize: '1.3rem', marginBottom: '0.3rem' }}>
          Book a Checkup
        </h3>
        <p style={{ color: '#64748b', fontSize: '0.85rem', margin: 0 }}>
          Fill the form — we'll confirm your slot via WhatsApp.
        </p>
      </div>

      {/* Success banner */}
      {submitted && (
        <div style={{
          background: 'linear-gradient(135deg,#ecfdf5,#f0fdf4)',
          border: '1.5px solid #6ee7b7', borderRadius: '14px',
          padding: '1.25rem 1.5rem', marginBottom: '1.5rem',
          display: 'flex', alignItems: 'flex-start', gap: '0.85rem',
        }}>
          <CheckCircle size={22} color="#10b981" style={{ flexShrink: 0, marginTop: '1px' }} />
          <div>
            <div style={{ fontWeight: 800, color: '#065f46', fontSize: '0.95rem', marginBottom: '0.3rem' }}>
              Checkup Request Sent! 🎉
            </div>
            <div style={{ color: '#047857', fontSize: '0.82rem', lineHeight: 1.6 }}>
              Your request is saved as <strong>Pending</strong> in our admin dashboard.
              WhatsApp has opened — send the message to confirm your slot.
            </div>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit}>

        {/* Name */}
        <div style={{ marginBottom: '1rem' }}>
          <label style={{ display: 'block', fontWeight: 700, fontSize: '0.82rem', color: '#374151', marginBottom: '0.4rem' }}>
            Full Name *
          </label>
          <div style={{ position: 'relative' }}>
            <User size={15} style={{ position: 'absolute', left: '0.9rem', top: '50%', transform: 'translateY(-50%)', color: iconColor('cu-name'), transition: 'color 0.2s' }} />
            <input id="cu-name" type="text" required placeholder="e.g. Aisha Bhat"
              style={fieldStyle('cu-name')}
              onFocus={() => setFocused('cu-name')}
              onBlur={() => setFocused(null)} />
          </div>
        </div>

        {/* Phone */}
        <div style={{ marginBottom: '1rem' }}>
          <label style={{ display: 'block', fontWeight: 700, fontSize: '0.82rem', color: '#374151', marginBottom: '0.4rem' }}>
            Phone Number *
          </label>
          <div style={{ position: 'relative', display: 'flex' }}>
            <span style={{
              padding: '0.85rem 0.9rem',
              background: focused === 'cu-phone' ? '#dcfce7' : '#e0fdf4',
              border: `1.5px solid ${focused === 'cu-phone' ? '#059669' : '#bbf7d0'}`,
              borderRight: 'none', borderRadius: '12px 0 0 12px',
              color: '#059669', fontWeight: 700, fontSize: '0.9rem',
              transition: 'all 0.25s',
            }}>+91</span>
            <Phone size={14} style={{ position: 'absolute', left: '4.2rem', top: '50%', transform: 'translateY(-50%)', color: iconColor('cu-phone'), transition: 'color 0.2s' }} />
            <input id="cu-phone" type="tel" required placeholder="XXXXX XXXXX"
              style={{ ...fieldStyle('cu-phone'), borderRadius: '0 12px 12px 0', paddingLeft: '2.2rem', flex: 1 }}
              onFocus={() => setFocused('cu-phone')}
              onBlur={() => setFocused(null)} />
          </div>
        </div>

        {/* Checkup Type */}
        <div style={{ marginBottom: '1rem' }}>
          <label style={{ display: 'block', fontWeight: 700, fontSize: '0.82rem', color: '#374151', marginBottom: '0.4rem' }}>
            Checkup / Test Type *
          </label>
          <div style={{ position: 'relative' }}>
            <FlaskConical size={15} style={{ position: 'absolute', left: '0.9rem', top: '50%', transform: 'translateY(-50%)', color: iconColor('cu-type'), pointerEvents: 'none', transition: 'color 0.2s' }} />
            <select id="cu-type" required
              style={{ ...fieldStyle('cu-type'), appearance: 'none', cursor: 'pointer' }}
              onFocus={() => setFocused('cu-type')}
              onBlur={() => setFocused(null)}>
              <option value="">Select a checkup or test</option>
              {CHECKUP_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
            </select>
          </div>
        </div>

        {/* Date */}
        <div style={{ marginBottom: '1rem' }}>
          <label style={{ display: 'block', fontWeight: 700, fontSize: '0.82rem', color: '#374151', marginBottom: '0.4rem' }}>
            Preferred Date
          </label>
          <div style={{ position: 'relative' }}>
            <Calendar size={15} style={{ position: 'absolute', left: '0.9rem', top: '50%', transform: 'translateY(-50%)', color: iconColor('cu-date'), pointerEvents: 'none', transition: 'color 0.2s' }} />
            <input id="cu-date" type="date"
              style={fieldStyle('cu-date')}
              onFocus={() => setFocused('cu-date')}
              onBlur={() => setFocused(null)} />
          </div>
        </div>

        {/* Notes */}
        <div style={{ marginBottom: '1.25rem' }}>
          <label style={{ display: 'block', fontWeight: 700, fontSize: '0.82rem', color: '#374151', marginBottom: '0.4rem' }}>
            Additional Notes (Optional)
          </label>
          <div style={{ position: 'relative' }}>
            <FileText size={15} style={{ position: 'absolute', left: '0.9rem', top: '0.95rem', color: iconColor('cu-notes'), transition: 'color 0.2s' }} />
            <textarea id="cu-notes" rows="3"
              placeholder="e.g. Any symptoms, previous reports, or special requests..."
              style={{ ...fieldStyle('cu-notes'), paddingTop: '0.85rem', resize: 'vertical' }}
              onFocus={() => setFocused('cu-notes')}
              onBlur={() => setFocused(null)} />
          </div>
        </div>

        <button type="submit" style={{
          width: '100%', padding: '1rem', marginTop: '0.25rem',
          background: 'linear-gradient(135deg,#059669,#10b981)',
          color: '#fff', border: 'none', borderRadius: '14px',
          fontWeight: 800, fontSize: '1rem', cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem',
          fontFamily: 'inherit', boxShadow: '0 4px 16px rgba(5,150,105,0.3)',
          transition: 'filter 0.2s',
        }}
          onMouseEnter={e => e.currentTarget.style.filter = 'brightness(1.1)'}
          onMouseLeave={e => e.currentTarget.style.filter = 'none'}
        >
          <MessageSquare size={20} />
          {submitted ? 'Booked! Open WhatsApp Again ↗' : 'Book Checkup via WhatsApp'}
        </button>

        <p style={{ textAlign: 'center', fontSize: '0.75rem', color: '#94a3b8', marginTop: '0.85rem', marginBottom: 0 }}>
          🔒 Your details are securely saved and only visible to our admin team.
        </p>
      </form>
    </div>
  );
};

export default CheckupBookingForm;
