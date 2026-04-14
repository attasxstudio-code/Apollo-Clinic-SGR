import React from 'react';
import { MessageSquare, User, Phone, Calendar, FileText, CheckCircle } from 'lucide-react';

const BookingForm = () => {
  const [focused,   setFocused]   = React.useState(null);
  const [submitted, setSubmitted] = React.useState(false);

  // ── Save lead to localStorage so it appears in the Admin Dashboard ──
  const saveLeadToAdmin = ({ name, phone, date, message }) => {
    const existing = JSON.parse(localStorage.getItem('clinic_leads') || '[]');
    const newLead = {
      id:        Date.now(),
      name,
      phone,          // already includes "+91 " prefix
      date,
      notes:     message,
      status:    'Pending',
      createdAt: new Date().toISOString(),
      source:    'Website Booking Form',
    };
    localStorage.setItem('clinic_leads', JSON.stringify([newLead, ...existing]));
  };

  function sendToWhatsApp(e) {
    e.preventDefault();
    const name    = document.getElementById('name').value.trim();
    const rawPhone= document.getElementById('phone').value.trim();
    const phone   = '+91 ' + rawPhone;
    const date    = document.getElementById('date').value;
    const message = document.getElementById('message').value.trim();

    // 1️⃣  Save to admin dashboard
    saveLeadToAdmin({ name, phone, date, message });

    // 2️⃣  Open WhatsApp
    const text = `New Appointment Request — HomeHeal Clinic:\nName: ${name}\nPhone: ${phone}\nDate: ${date}\nMessage: ${message || 'No additional message.'}`;
    window.open(`https://wa.me/919149425496?text=${encodeURIComponent(text)}`, '_blank');

    // 3️⃣  Show brief success state then reset
    setSubmitted(true);
    e.target.reset();
    setTimeout(() => setSubmitted(false), 4000);
  }

  const fieldStyle = (id) => ({
    width: '100%',
    padding: '0.85rem 1rem 0.85rem 2.8rem',
    border: `1.5px solid ${focused === id ? '#0ea5e9' : '#cce5f6'}`,
    borderRadius: '12px',
    background: focused === id ? '#fff' : '#f0f9ff',
    fontSize: '0.92rem',
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
          Fill the form to reach us instantly via WhatsApp.
        </p>
      </div>

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

      <form onSubmit={sendToWhatsApp}>

        {/* Name */}
        <div className="form-group">
          <label className="form-label" htmlFor="name">Full Name *</label>
          <div style={{ position: 'relative' }}>
            <User size={15} style={{ position:'absolute', left:'0.9rem', top:'50%', transform:'translateY(-50%)', color: iconColor('name'), transition:'color 0.2s' }} />
            <input id="name" name="name" type="text" required placeholder="e.g. Aisha Bhat"
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

        {/* Message */}
        <div className="form-group">
          <label className="form-label" htmlFor="message">Concerns (Optional)</label>
          <div style={{ position: 'relative' }}>
            <FileText size={15} style={{ position:'absolute', left:'0.9rem', top:'0.95rem', color: iconColor('message'), transition:'color 0.2s' }} />
            <textarea id="message" name="message" rows="3"
              placeholder="e.g. Need nursing care for post-surgery recovery..."
              style={{ ...fieldStyle('message'), paddingTop: '0.85rem', resize: 'vertical' }}
              onFocus={() => setFocused('message')}
              onBlur={() => setFocused(null)} />
          </div>
        </div>

        <button type="submit" className="btn btn-whatsapp"
          style={{ width: '100%', padding: '1rem', marginTop: '0.5rem', fontSize: '1rem', fontWeight: 800, borderRadius: '14px' }}>
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

