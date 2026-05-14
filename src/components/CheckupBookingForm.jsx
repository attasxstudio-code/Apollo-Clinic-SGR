import React from 'react';
import { MessageSquare, User, Phone, Calendar, FlaskConical, FileText, CheckCircle } from 'lucide-react';
import { waLink } from '../config/contact';
import {
  checkRateLimit, recordAttempt,
  sanitizeInput, isValidName, isValidPhone, isValidDate, isValidMessage,
  isBot, isTooFast, isDuplicateSubmission, logSuspicious,
} from '../utils/security';
import { appointmentService } from '../services/appointmentService';

const RATE_KEY = 'checkup_form';

const labTestCategories = [
  {
    name: 'Ultrasound / USG',
    tests: ['CD / Color Doppler', 'Abdomen USG', 'Scrotum USG', 'Other USG scans as advised']
  },
  {
    name: 'X-Ray & Radiology Studies',
    tests: ['All X-rays', 'MCU', 'Scanogram', 'MCU / RGU', 'Barium Swallow', 'HSG', 'Sinogram']
  },
  {
    name: 'Cardiac Diagnostics',
    tests: ['Echo', 'ECG', 'UMT', 'Holter', 'ABPM']
  },
  {
    name: 'Sleep, Neuro, ENT & Pulmonary Diagnostics',
    tests: ['Sleep Study', 'Polysomnography', 'EEG', 'Audiometry', 'PFT']
  },
  {
    name: 'Endoscopy & Gastro Diagnostics',
    tests: ['Endoscopy', 'Colonoscopy', 'Sigmoidoscopy']
  },
  {
    name: 'Urology Diagnostics',
    tests: ['Uroflowmetry']
  }
];

const CheckupBookingForm = () => {
  const [focused,   setFocused]   = React.useState(null);
  const [submitted, setSubmitted] = React.useState(false);
  const [error,     setError]     = React.useState('');
  const [mainTestType, setMainTestType] = React.useState('');
  const [specificTest, setSpecificTest] = React.useState('');
  const [date, setDate] = React.useState('');
  const [time, setTime] = React.useState('');
  const mountTime = React.useRef(Date.now());

  /* ── Save to Supabase so it shows in Admin → Checkups ── */
  const saveCheckupToAdmin = async ({ name, phone, mainTestType, specificTest, date, time, notes }) => {
    console.log('%c📤 saveCheckupToAdmin called', 'color: purple; font-weight: bold');
    console.log('  Input:', { name, phone, mainTestType, specificTest, date, time });
    
    try {
      console.log('  Calling appointmentService.saveCheckup...');
      const result = await appointmentService.saveCheckup({
        name: sanitizeInput(name, 100),
        phone: sanitizeInput(phone, 20),
        date: sanitizeInput(date, 10),
        mainTestType: sanitizeInput(mainTestType, 100),
        specificTest: sanitizeInput(specificTest, 100),
        notes: time ? `Time: ${sanitizeInput(time, 10)}${notes ? ' | ' + sanitizeInput(notes, 1000) : ''}` : sanitizeInput(notes, 1000),
      });
      console.log('  Result:', result);
      console.log('%c✅ Checkup saved to Supabase:', 'color: green', result);
    } catch (err) {
      console.error('%c❌ Failed to save checkup to Supabase:', 'color: red', err);
    }
  };

  function handleSubmit(e) {
    e.preventDefault();
    setError('');

    // 2. Security Checks
    const hp = document.getElementById('checkup_hp')?.value;
    if (isBot(hp)) return; // Silent return for bots
    
    // Lenient duplicate check
    if (isDuplicateSubmission('checkup', 1000)) return;

    // High rate limit for testing
    const rl = checkRateLimit(RATE_KEY, 10, 5 * 60 * 1000); 
    if (!rl.allowed) return setError(`Too many attempts. Please try again later.`);

    const name        = sanitizeInput(document.getElementById('cu-name')?.value || '', 100);
    const rawPhone    = sanitizeInput(document.getElementById('cu-phone')?.value || '', 20);
    const phone       = '+91 ' + rawPhone;
    const notes       = sanitizeInput(document.getElementById('cu-notes')?.value || '', 1000);

    // More forgiving validation
    if (!name || name.length < 2)       return setError('Please enter your full name.');
    if (!isValidPhone(rawPhone))        return setError('Please enter a valid 10-digit phone number.');
    if (!mainTestType)                  return setError('Please select a main test type.');
    if (!specificTest)                  return setError('Please select a specific test.');
    if (!date)                          return setError('Please select a preferred date.');
    if (!time)                          return setError('Please select a preferred time.');

    recordAttempt(RATE_KEY);
    
    // Create WhatsApp text immediately
    const text = [
      `Hello Apollo Clinic, I want to book a lab test.`,
      ``,
      `Patient Name: ${name}`,
      `Phone Number: ${phone}`,
      `Test Type: ${mainTestType}`,
      `Selected Test: ${specificTest}`,
      `Preferred Date: ${date}`,
      `Preferred Time: ${time}`,
      notes ? `Notes: ${notes}` : null,
      ``,
      `Please confirm availability.`
    ].filter(line => line !== null).join('\n');

    const waUrl = waLink(text);

    // Fire-and-forget save to Supabase
    console.log('Checkup form valid. Triggering save and redirect...');
    saveCheckupToAdmin({ name, phone, mainTestType, specificTest, date, time, notes });

    // Open WhatsApp - Using window.location to avoid pop-up blockers
    console.log('Redirecting to WhatsApp:', waUrl);
    window.location.href = waUrl;

    setSubmitted(true);
    if (e.target && typeof e.target.reset === 'function') e.target.reset();
    setMainTestType('');
    setSpecificTest('');
    setDate('');
    setTime('');
    setTimeout(() => setSubmitted(false), 4500);
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
    }}>
      {/* Top gradient bar */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: '4px',
        background: 'linear-gradient(90deg,#0369a1,#0ea5e9,#10b981)',
      }} />

      <div className="text-center" style={{ marginBottom: '1.75rem' }}>
        <span className="pill" style={{ marginBottom: '0.75rem', display: 'inline-block' }}>🔬 Lab Tests</span>
        <h3 style={{ color: '#0c4a6e', fontWeight: 800, fontSize: '1.3rem', marginBottom: '0.3rem' }}>
          Book a Lab Test
        </h3>
        <p style={{ color: '#64748b', fontSize: '0.85rem', margin: 0 }}>
          Fill the form — we'll confirm your slot via WhatsApp.
        </p>
      </div>

      {/* Error banner */}
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

      {/* Success banner */}
      {submitted && (
        <div style={{
          background: 'linear-gradient(135deg,#ecfdf5,#f0fdf4)',
          border: '1.5px solid #6ee7b7', borderRadius: '14px',
          padding: '1.25rem 1.5rem', marginBottom: '1.5rem',
          display: 'flex', alignItems: 'flex-start', gap: '0.85rem',
          animation: 'fadeIn 0.4s ease',
        }}>
          <CheckCircle size={22} color="#10b981" style={{ flexShrink: 0, marginTop: '1px' }} />
          <div>
            <div style={{ fontWeight: 800, color: '#065f46', fontSize: '0.95rem', marginBottom: '0.3rem' }}>
              Lab Test Request Sent! 🎉
            </div>
            <div style={{ color: '#047857', fontSize: '0.82rem', lineHeight: 1.6 }}>
              Your request is saved as <strong>Pending</strong> in our admin dashboard.
              WhatsApp has opened — send the message to confirm your slot.
            </div>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit}>
        {/* Honeypot */}
        <div style={{ position: 'absolute', left: '-9999px', opacity: 0, height: 0, overflow: 'hidden' }} aria-hidden="true">
          <input id="checkup_hp" name="company_name" type="text" tabIndex="-1" autoComplete="off" />
        </div>

        {/* Name */}
        <div className="form-group">
          <label className="form-label">Full Name *</label>
          <div style={{ position: 'relative' }}>
            <User size={15} style={{ position: 'absolute', left: '0.9rem', top: '50%', transform: 'translateY(-50%)', color: iconColor('cu-name'), transition: 'color 0.2s' }} />
            <input id="cu-name" type="text" required placeholder="e.g. Aisha Bhat"
              maxLength={100}
              style={fieldStyle('cu-name')}
              onFocus={() => setFocused('cu-name')}
              onBlur={() => setFocused(null)} />
          </div>
        </div>

        {/* Phone */}
        <div className="form-group">
          <label className="form-label">Phone Number *</label>
          <div style={{ position: 'relative', display: 'flex' }}>
            <span style={{
              padding: '0.85rem 0.9rem',
              background: focused === 'cu-phone' ? '#e0f2fe' : '#e8f4fd',
              border: `1.5px solid ${focused === 'cu-phone' ? '#0ea5e9' : '#cce5f6'}`,
              borderRight: 'none', borderRadius: '12px 0 0 12px',
              color: '#0369a1', fontWeight: 700, fontSize: '0.9rem',
              transition: 'all 0.25s',
            }}>+91</span>
            <Phone size={14} style={{ position: 'absolute', left: '4.2rem', top: '50%', transform: 'translateY(-50%)', color: iconColor('cu-phone'), transition: 'color 0.2s' }} />
            <input id="cu-phone" type="tel" required placeholder="XXXXX XXXXX"
              maxLength={15}
              style={{ ...fieldStyle('cu-phone'), borderRadius: '0 12px 12px 0', paddingLeft: '2.2rem', flex: 1 }}
              onFocus={() => setFocused('cu-phone')}
              onBlur={() => setFocused(null)} />
          </div>
        </div>

        {/* Main Test Type */}
        <div className="form-group">
          <label className="form-label">Main Test Type *</label>
          <div style={{ position: 'relative' }}>
            <FlaskConical size={15} style={{ position: 'absolute', left: '0.9rem', top: '50%', transform: 'translateY(-50%)', color: iconColor('cu-type'), pointerEvents: 'none', transition: 'color 0.2s' }} />
            <select id="cu-type" required
              value={mainTestType}
              onChange={(e) => {
                setMainTestType(e.target.value);
                setSpecificTest('');
              }}
              style={{ ...fieldStyle('cu-type'), appearance: 'none', cursor: 'pointer' }}
              onFocus={() => setFocused('cu-type')}
              onBlur={() => setFocused(null)}>
              <option value="">Select test type</option>
              {labTestCategories.map((c) => <option key={c.name} value={c.name}>{c.name}</option>)}
            </select>
          </div>
        </div>

        {/* Specific Test */}
        <div className="form-group">
          <label className="form-label">Specific Test *</label>
          <div style={{ position: 'relative' }}>
            <FileText size={15} style={{ position: 'absolute', left: '0.9rem', top: '50%', transform: 'translateY(-50%)', color: iconColor('cu-specific'), pointerEvents: 'none', transition: 'color 0.2s' }} />
            <select id="cu-specific" required
              value={specificTest}
              onChange={(e) => setSpecificTest(e.target.value)}
              disabled={!mainTestType}
              style={{ ...fieldStyle('cu-specific'), appearance: 'none', cursor: mainTestType ? 'pointer' : 'not-allowed', opacity: mainTestType ? 1 : 0.6 }}
              onFocus={() => setFocused('cu-specific')}
              onBlur={() => setFocused(null)}>
              {!mainTestType ? (
                <option value="">Select test type first</option>
              ) : (
                <>
                  <option value="">Select specific test</option>
                  {labTestCategories.find(c => c.name === mainTestType)?.tests.map((t) => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </>
              )}
            </select>
          </div>
        </div>

        {/* Date & Time Row */}
        <div className="checkup-datetime-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.25rem' }}>
          {/* Date */}
          <div>
            <label className="form-label">Preferred Date *</label>
            <div style={{ position: 'relative' }}>
              <Calendar size={15} style={{ position: 'absolute', left: '0.9rem', top: '50%', transform: 'translateY(-50%)', color: iconColor('cu-date'), pointerEvents: 'none', transition: 'color 0.2s' }} />
              <input id="cu-date" type="date" required
                value={date}
                onChange={(e) => setDate(e.target.value)}
                style={fieldStyle('cu-date')}
                onFocus={() => setFocused('cu-date')}
                onBlur={() => setFocused(null)} />
            </div>
          </div>
          
          {/* Time */}
          <div>
            <label className="form-label">Preferred Time *</label>
            <div style={{ position: 'relative' }}>
              <input id="cu-time" type="time" required
                value={time}
                onChange={(e) => setTime(e.target.value)}
                style={{ ...fieldStyle('cu-time'), paddingLeft: '1rem' }}
                onFocus={() => setFocused('cu-time')}
                onBlur={() => setFocused(null)} />
            </div>
          </div>
        </div>

        {/* Notes */}
        <div className="form-group">
          <label className="form-label">Additional Notes (Optional)</label>
          <div style={{ position: 'relative' }}>
            <FileText size={15} style={{ position: 'absolute', left: '0.9rem', top: '0.95rem', color: iconColor('cu-notes'), transition: 'color 0.2s' }} />
            <textarea id="cu-notes" rows="3"
              placeholder="e.g. Any symptoms, previous reports, or special requests..."
              maxLength={1000}
              style={{ ...fieldStyle('cu-notes'), paddingTop: '0.85rem', resize: 'vertical' }}
              onFocus={() => setFocused('cu-notes')}
              onBlur={() => setFocused(null)} />
          </div>
        </div>

        <button type="submit" className="btn btn-primary"
          style={{ 
            width: '100%', 
            padding: '1rem', 
            marginTop: '0.5rem', 
            fontSize: '1rem', 
            fontWeight: 800, 
            borderRadius: '14px', 
            background: 'var(--navy)', 
            justifyContent: 'center',
            cursor: 'pointer',
            position: 'relative',
            zIndex: 10,
            pointerEvents: 'auto'
          }}>
          <MessageSquare size={20} />
          {submitted ? 'Booked! Open WhatsApp Again ↗' : 'Book Lab Tests'}
        </button>

        <p style={{ textAlign: 'center', fontSize: '0.75rem', color: '#94a3b8', marginTop: '0.85rem', marginBottom: 0 }}>
          🔒 Your details are securely saved and only visible to our admin team.
        </p>
      </form>
    </div>
  );
};

export default CheckupBookingForm;
