import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, ChevronDown } from 'lucide-react';
import { WORKING_HOURS, PRIMARY_PHONE, PRIMARY_PHONE_HREF } from '../config/contact';

const FAQ_CATEGORIES = [
  {
    category: 'Appointments & Booking',
    items: [
      {
        q: 'How do I book an appointment at Apollo Clinic Srinagar?',
        a: `You can book an appointment by filling out the online form on our Book Appointment page, calling us directly at ${PRIMARY_PHONE}, or sending us a WhatsApp message. We will confirm your slot within a few hours.`,
      },
      {
        q: 'Do I need an appointment, or can I walk in?',
        a: 'Walk-in patients are welcome at Apollo Clinic during our working hours. However, we strongly recommend booking an appointment in advance for specialist consultations to avoid waiting.',
      },
      {
        q: 'What are the clinic working hours?',
        a: `Apollo Clinic Srinagar is open ${WORKING_HOURS.weekdays.label} from ${WORKING_HOURS.weekdays.time}, and on ${WORKING_HOURS.sunday.label} from ${WORKING_HOURS.sunday.time}.`,
      },
      {
        q: 'How will I know my appointment is confirmed?',
        a: 'After submitting the booking form, our team will contact you via phone or WhatsApp to confirm your appointment slot within a few hours.',
      },
    ],
  },
  {
    category: 'Services & Specialities',
    items: [
      {
        q: 'What specialities are available at Apollo Clinic Srinagar?',
        a: 'We offer General Physician, Dermatology, Pediatrics, Gynecology, Orthopedics, Physiotherapy, and Psychology consultations, along with in-house diagnostics including ECG, ECHO, PFT, and laboratory services.',
      },
      {
        q: 'Do you offer health checkup packages?',
        a: 'Yes. We offer structured health checkup packages including Basic Health Screen, Comprehensive Health Package, and Cardiac Risk Assessment. Visit our Diagnostics page for full details.',
      },
      {
        q: 'Is physiotherapy available at the clinic?',
        a: 'Yes, physiotherapy and rehabilitation services are available. Our physiotherapist designs personalised recovery programs for pain management, post-surgery recovery, and sports injuries.',
      },
      {
        q: 'Do you provide mental health or counseling services?',
        a: 'Yes. We have a qualified clinical psychologist available for consultations covering anxiety, depression, stress management, cognitive therapy, and general counseling.',
      },
    ],
  },
  {
    category: 'Diagnostics & Lab Tests',
    items: [
      {
        q: 'What diagnostic tests are available in-house?',
        a: 'Apollo Clinic offers ECG, ECHO (echocardiogram), Pulmonary Function Tests (PFT), blood tests, urine and stool analysis, diabetes screening, and other routine laboratory tests — all in-house.',
      },
      {
        q: 'How quickly will I get my lab test results?',
        a: 'Most routine blood and urine tests are reported the same day or within 24 hours. Results for more specialized tests may take slightly longer. Our team will inform you at the time of testing.',
      },
      {
        q: 'Do I need to fast before a blood test?',
        a: 'For some tests like fasting blood glucose and lipid profiles, fasting for 8-12 hours is required. Please confirm with our team at the time of booking which tests require fasting.',
      },
    ],
  },
  {
    category: 'Location & General Information',
    items: [
      {
        q: 'Where is Apollo Clinic Srinagar located?',
        a: 'Apollo Clinic Srinagar is located near National School, Arham Towers, Karan Nagar, Srinagar, Jammu & Kashmir. You can find us on Google Maps using the directions link on our Contact page.',
      },
      {
        q: 'Is parking available near the clinic?',
        a: 'Parking is generally available in the vicinity of the clinic at Karan Nagar. We recommend arriving a few minutes early to find a suitable spot.',
      },
      {
        q: 'Is Apollo Clinic Srinagar part of the Apollo Hospitals group?',
        a: 'Apollo Clinic Srinagar operates under the Apollo Clinic brand, which is associated with the Apollo Health & Lifestyle Ltd. network — providing trusted multi-speciality care to communities across India.',
      },
      {
        q: 'Is my personal and medical information kept confidential?',
        a: 'Absolutely. Patient privacy is a core value at Apollo Clinic. All medical records, test results, and personal information are handled with strict confidentiality and are only accessible to authorized clinical staff.',
      },
    ],
  },
];

const FAQItem = ({ item }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className={`faq-item${open ? ' open' : ''}`}>
      <button className="faq-question" onClick={() => setOpen(!open)}>
        <span>{item.q}</span>
        <ChevronDown size={18} className="faq-chevron" />
      </button>
      <div className="faq-answer">
        <p style={{ margin: 0 }}>{item.a}</p>
      </div>
    </div>
  );
};

const FAQ = () => (
  <div>
    {/* ── Page Hero ── */}
    <section className="page-hero">
      <div className="container text-center" style={{ position: 'relative', zIndex: 1 }}>
        <span className="pill" style={{ background: 'rgba(255,255,255,0.15)', color: '#fff', border: '1px solid rgba(255,255,255,0.3)', marginBottom: '1.25rem', display: 'inline-flex' }}>
          💬 FAQ
        </span>
        <h1 style={{ color: '#fff', marginBottom: '1.1rem', fontSize: 'clamp(2rem,5vw,3.2rem)' }}>
          Frequently Asked Questions
        </h1>
        <p style={{ color: 'rgba(255,255,255,0.82)', fontSize: '1.1rem', maxWidth: '580px', margin: '0 auto', lineHeight: 1.7 }}>
          Find quick answers to the most common questions about Apollo Clinic Srinagar — our services, booking, timings, and more.
        </p>
      </div>
    </section>

    {/* ── FAQ Sections ── */}
    <section style={{ background: '#fff', padding: '5rem 0' }}>
      <div className="container">
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          {FAQ_CATEGORIES.map((cat, ci) => (
            <div key={ci} style={{ marginBottom: '3rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem', paddingBottom: '0.75rem', borderBottom: '2px solid #e2e8f0' }}>
                <div style={{ width: 8, height: 8, borderRadius: '50%', background: 'linear-gradient(135deg,#0369a1,#059669)', flexShrink: 0 }} />
                <h2 style={{ color: '#0c4a6e', fontWeight: 800, fontSize: 'clamp(1.1rem,3vw,1.4rem)', margin: 0 }}>{cat.category}</h2>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {cat.items.map((item, ii) => (
                  <FAQItem key={ii} item={item} />
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Still have a question */}
        <div style={{ maxWidth: '800px', margin: '1rem auto 0' }}>
          <div style={{
            background: 'linear-gradient(135deg,#f0f9ff,#ecfdf5)',
            borderRadius: '20px', padding: '2.5rem',
            border: '1.5px solid #bae6fd', textAlign: 'center',
          }}>
            <div style={{ fontSize: '2rem', marginBottom: '0.75rem' }}>💬</div>
            <h3 style={{ color: '#0c4a6e', fontWeight: 800, marginBottom: '0.6rem' }}>Still have a question?</h3>
            <p style={{ color: '#64748b', fontSize: '0.95rem', marginBottom: '1.5rem', maxWidth: 420, margin: '0 auto 1.5rem' }}>
              Our team is ready to help. Reach out via WhatsApp, call us, or use our online booking form.
            </p>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link to="/book" className="btn btn-primary"><Calendar size={16} /> Book Appointment</Link>
              <a href={PRIMARY_PHONE_HREF} className="btn btn-call">Call {PRIMARY_PHONE}</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
);

export default FAQ;
