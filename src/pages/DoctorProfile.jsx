import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Calendar, Phone, MapPin, Clock, ChevronLeft, CheckCircle, ArrowRight, ShieldCheck, UserCheck, GraduationCap, HeartPulse, Shield, Activity, FileText } from 'lucide-react';
import { ALL_DOCTORS } from './OurDoctors';

import { PRIMARY_PHONE, PRIMARY_PHONE_HREF } from '../config/contact';

const DoctorProfile = () => {
  const { id }    = useParams();
  const navigate  = useNavigate();
  const doc       = ALL_DOCTORS.find(d => d.id === id);

  const [form, setForm] = React.useState({
    name: '', phone: '',
    date: new Date().toISOString().split('T')[0],
    time: 'Morning (10 AM - 12 PM)'
  });
  const [submitted, setSubmitted] = React.useState(false);

  const goBack  = () => { navigate('/doctors'); window.scrollTo(0, 0); };
  const goBook  = () => { navigate('/book');    window.scrollTo(0, 0); };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.phone) return;

    // Save to admin dashboard
    const existing = JSON.parse(localStorage.getItem('clinic_leads') || '[]');
    const newLead = {
      id:        Date.now(),
      name:      form.name,
      phone:     form.phone,
      date:      form.date,
      time:      form.time,
      notes:     `Appointment requested with ${doc.name} (${doc.specialty})`,
      doctor:    doc.name,
      specialty: doc.specialty,
      status:    'Pending',
      createdAt: new Date().toISOString(),
      source:    `Doctor Profile — ${doc.name}`,
    };
    localStorage.setItem('clinic_leads', JSON.stringify([newLead, ...existing]));

    setSubmitted(true);
  };

  if (!doc) {
    return (
      <div style={{ textAlign: 'center', padding: '8rem 2rem' }}>
        <h2 style={{ color: 'var(--navy)', marginBottom: '1rem' }}>Doctor not found</h2>
        <p style={{ color: 'var(--body)', marginBottom: '1.5rem' }}>This doctor profile does not exist or may have moved.</p>
        <button className="btn btn-primary" onClick={() => { navigate('/doctors'); window.scrollTo(0,0); }} style={{ borderRadius: '8px' }}>
          <ChevronLeft size={15} /> Back to Doctors
        </button>
      </div>
    );
  }

  // Helper for icons based on specialized care string
  const getIcon = (iconStr) => {
    switch (iconStr) {
      case 'Heart': return <HeartPulse size={24} />;
      case 'Shield': return <Shield size={24} />;
      case 'Activity': return <Activity size={24} />;
      case 'Virus': return <ShieldCheck size={24} />;
      default: return <HeartPulse size={24} />;
    }
  };

  return (
    <div style={{ background: '#f8fafc', minHeight: '100vh', paddingBottom: '4rem' }}>

      {/* ── Breadcrumb / back ── */}
      <div style={{ padding: '2rem 0 1rem' }}>
        <div className="container" style={{ maxWidth: '1200px' }}>
          <button onClick={goBack} style={{
            display: 'flex', alignItems: 'center', gap: '0.4rem',
            background: 'none', border: 'none', color: 'var(--blue)', fontWeight: 700, fontSize: '0.85rem',
            cursor: 'pointer', padding: 0,
          }}>
            <ChevronLeft size={16} /> Back to Doctors
          </button>
        </div>
      </div>

      <div className="container" style={{ maxWidth: '1200px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1.8fr 1fr', gap: '2rem', alignItems: 'flex-start' }}>

          {/* ════════════ LEFT COLUMN ════════════ */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>

            {/* Profile Header Card */}
            <div style={{ background: '#fff', borderRadius: '16px', border: '1px solid rgba(0,0,0,0.05)', overflow: 'hidden' }}>
              <div style={{ padding: '2.5rem', display: 'flex', gap: '2.5rem' }}>
                {/* Image */}
                <div style={{ width: '220px', height: '280px', borderRadius: '12px', background: '#eef2f6', overflow: 'hidden', flexShrink: 0 }}>
                  <img src={doc.image} alt={doc.name} style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top' }} />
                </div>
                
                {/* Info */}
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                  <h1 style={{ fontSize: '2rem', color: 'var(--navy)', marginBottom: '0.25rem', lineHeight: 1.2 }}>{doc.name}</h1>
                  <div style={{ fontSize: '1.05rem', color: 'var(--blue)', fontWeight: 800, marginBottom: '0.5rem' }}>{doc.specialty}</div>
                  <div style={{ fontSize: '0.95rem', color: 'var(--heading)', fontWeight: 600, marginBottom: '2rem' }}>{doc.title}</div>
                  
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '2rem' }}>
                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', background: '#f8fafc', padding: '1rem', borderRadius: '8px' }}>
                      <div style={{ color: 'var(--blue)' }}><GraduationCap size={20} /></div>
                      <div>
                        <div style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--heading)', marginBottom: '0.15rem' }}>MBBS</div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--body)' }}>{doc.qual.split(',')[1]?.trim() || doc.qual}</div>
                      </div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', background: '#f8fafc', padding: '1rem', borderRadius: '8px' }}>
                      <div style={{ color: 'var(--blue)' }}><FileText size={20} /></div>
                      <div>
                        <div style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--heading)', marginBottom: '0.15rem' }}>Languages</div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--body)' }}>{doc.languages.join(', ')}</div>
                      </div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', background: '#f8fafc', padding: '1rem', borderRadius: '8px' }}>
                      <div style={{ color: 'var(--blue)' }}><Clock size={20} /></div>
                      <div>
                        <div style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--heading)', marginBottom: '0.15rem' }}>{doc.exp} Years</div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--body)' }}>Overall Experience</div>
                      </div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', background: 'var(--green-light)', border: '1px solid var(--green-border)', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 700, color: 'var(--green)', padding: '0.4rem 0.8rem' }}>
                        <CheckCircle size={14} /> Accepting New Patients
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Trust Banner */}
              <div style={{ background: 'var(--blue-light)', padding: '1.25rem 2.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <ShieldCheck size={18} color="var(--blue)" />
                <span style={{ fontSize: '0.85rem', color: 'var(--heading)', fontWeight: 600 }}>
                  Trusted by patients for compassionate care and evidence-based treatment.
                </span>
              </div>
            </div>

            {/* Professional Overview */}
            <div style={{ background: '#fff', borderRadius: '16px', border: '1px solid rgba(0,0,0,0.05)', padding: '2.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'var(--blue-light)', color: 'var(--blue)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <UserCheck size={20} />
                </div>
                <h2 style={{ fontSize: '1.25rem', color: 'var(--navy)', margin: 0 }}>Professional Overview</h2>
              </div>
              {doc.bio.split('\n\n').filter(Boolean).map((para, i) => (
                <p key={i} style={{ marginBottom: i < doc.bio.split('\n\n').length - 1 ? '1rem' : 0, lineHeight: 1.7, color: 'var(--body)', fontSize: '0.95rem' }}>
                  {para}
                </p>
              ))}
            </div>

            {/* Education & Credentials */}
            <div style={{ background: '#fff', borderRadius: '16px', border: '1px solid rgba(0,0,0,0.05)', padding: '2.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'var(--blue-light)', color: 'var(--blue)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <GraduationCap size={20} />
                </div>
                <h2 style={{ fontSize: '1.25rem', color: 'var(--navy)', margin: 0 }}>Education & Credentials</h2>
              </div>
              <ul style={{ margin: 0, padding: '0 0 0 1.5rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {doc.education.map((edu, i) => (
                  <li key={i} style={{ fontSize: '0.95rem', color: 'var(--body)', lineHeight: 1.5 }}>
                    {edu}
                  </li>
                ))}
              </ul>
            </div>

            {/* Specialized Treatments */}
            <div style={{ background: '#fff', borderRadius: '16px', border: '1px solid rgba(0,0,0,0.05)', padding: '2.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'var(--blue-light)', color: 'var(--blue)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <HeartPulse size={20} />
                </div>
                <h2 style={{ fontSize: '1.25rem', color: 'var(--navy)', margin: 0 }}>Specialized Treatments</h2>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem' }}>
                {doc.specializedCare.map((care, i) => (
                  <div key={i} style={{ 
                    border: '1px solid rgba(0,0,0,0.05)', borderRadius: '12px', padding: '1.5rem 1rem', textAlign: 'center',
                    transition: 'all 0.3s ease', cursor: 'pointer'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-5px)';
                    e.currentTarget.style.boxShadow = '0 12px 30px rgba(13,82,192,0.1)';
                    e.currentTarget.style.borderColor = 'rgba(13,82,192,0.15)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = 'none';
                    e.currentTarget.style.borderColor = 'rgba(0,0,0,0.05)';
                  }}>
                    <div style={{ color: 'var(--blue)', marginBottom: '1rem', display: 'flex', justifyContent: 'center' }}>
                      {getIcon(care.icon)}
                    </div>
                    <div style={{ fontWeight: 800, fontSize: '0.85rem', color: 'var(--navy)', marginBottom: '0.5rem', lineHeight: 1.3 }}>{care.name}</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--body)', lineHeight: 1.5 }}>{care.desc}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Areas of Expertise */}
            <div style={{ background: '#fff', borderRadius: '16px', border: '1px solid rgba(0,0,0,0.05)', padding: '2.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'var(--blue-light)', color: 'var(--blue)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <ShieldCheck size={20} />
                </div>
                <h2 style={{ fontSize: '1.25rem', color: 'var(--navy)', margin: 0 }}>Areas of Expertise</h2>
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
                {doc.expertise.map((tag, i) => (
                  <span key={i} style={{ 
                    background: 'var(--blue-light)', color: 'var(--blue)', 
                    border: '1px solid var(--blue-border)', borderRadius: '4px', 
                    padding: '0.5rem 1rem', fontSize: '0.85rem', fontWeight: 600 
                  }}>
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Clinic Details */}
            <div style={{ background: '#fff', borderRadius: '16px', border: '1px solid rgba(0,0,0,0.05)', padding: '2.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'var(--blue-light)', color: 'var(--blue)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <MapPin size={20} />
                </div>
                <h2 style={{ fontSize: '1.25rem', color: 'var(--navy)', margin: 0 }}>Clinic Details</h2>
              </div>
              
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 200px', gap: '2rem', alignItems: 'center' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
                  <div>
                    <div style={{ fontWeight: 800, fontSize: '0.85rem', color: 'var(--heading)', marginBottom: '0.5rem' }}>Location</div>
                    <div style={{ fontSize: '0.85rem', color: 'var(--body)', lineHeight: 1.6 }}>Near National School, Arham Towers, Karan Nagar, Srinagar, Jammu & Kashmir, 190010</div>
                    <button style={{ background: 'none', border: 'none', color: 'var(--blue)', fontWeight: 700, fontSize: '0.85rem', marginTop: '0.5rem', padding: 0, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                      View on Map <ArrowRight size={14} />
                    </button>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 800, fontSize: '0.85rem', color: 'var(--heading)', marginBottom: '0.25rem' }}>
                        <Phone size={14} /> Contact
                      </div>
                      <div style={{ fontSize: '0.85rem', color: 'var(--body)' }}>{PRIMARY_PHONE}</div>
                    </div>
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 800, fontSize: '0.85rem', color: 'var(--heading)', marginBottom: '0.25rem' }}>
                        <FileText size={14} /> Email
                      </div>
                      <div style={{ fontSize: '0.85rem', color: 'var(--body)' }}>info@apolloclinic.in</div>
                    </div>
                  </div>
                </div>
                <div style={{ height: '120px', borderRadius: '12px', overflow: 'hidden' }}>
                  <img src="/APOLLO-receptionist-image.png" alt="Clinic Location" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
              </div>
            </div>

          </div>

          {/* ════════════ RIGHT COLUMN ════════════ */}
          <div style={{ position: 'sticky', top: '2rem' }}>
            <div style={{ background: '#fff', borderRadius: '16px', border: '1px solid rgba(0,0,0,0.05)', padding: '2rem', boxShadow: '0 10px 40px rgba(0,0,0,0.04)' }}>
              
              {submitted ? (
                <div style={{ textAlign: 'center', padding: '2rem 0' }}>
                  <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: 'var(--green-light)', color: 'var(--green)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem' }}>
                    <CheckCircle size={32} />
                  </div>
                  <h3 style={{ fontSize: '1.4rem', color: 'var(--navy)', marginBottom: '0.5rem' }}>Request Sent</h3>
                  <p style={{ fontSize: '0.95rem', color: 'var(--body)', marginBottom: '2rem', lineHeight: 1.5 }}>
                    We'll call you shortly to confirm your appointment with {doc.name}.
                  </p>
                  <button className="btn btn-outline-blue w-full" onClick={() => setSubmitted(false)} style={{ borderRadius: '8px', justifyContent: 'center' }}>
                    Book Another
                  </button>
                </div>
              ) : (
                <>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
                    <div style={{ width: '36px', height: '36px', borderRadius: '8px', background: 'var(--blue-light)', color: 'var(--blue)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Calendar size={18} />
                    </div>
                    <h3 style={{ fontSize: '1.15rem', color: 'var(--navy)', margin: 0 }}>Request Appointment</h3>
                  </div>
                  <p style={{ fontSize: '0.85rem', color: 'var(--body)', marginBottom: '1.5rem', lineHeight: 1.5 }}>
                    Select a convenient date and time to consult with {doc.name.split(' ')[0]}.
                  </p>

                  <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 800, color: 'var(--heading)', marginBottom: '0.4rem' }}>Full Name</label>
                      <input
                        type="text"
                        style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid rgba(0,0,0,0.1)', fontSize: '0.85rem' }}
                        placeholder="Enter your full name"
                        value={form.name}
                        onChange={e => setForm(p => ({ ...p, name: e.target.value }))}
                        required
                      />
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 800, color: 'var(--heading)', marginBottom: '0.4rem' }}>Phone Number</label>
                      <input
                        type="tel"
                        style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid rgba(0,0,0,0.1)', fontSize: '0.85rem' }}
                        placeholder="Your contact number"
                        value={form.phone}
                        onChange={e => setForm(p => ({ ...p, phone: e.target.value }))}
                        required
                      />
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                      <div>
                        <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 800, color: 'var(--heading)', marginBottom: '0.4rem' }}>Preferred Date</label>
                        <input
                          type="date"
                          style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid rgba(0,0,0,0.1)', fontSize: '0.85rem', color: 'var(--body)' }}
                          value={form.date}
                          min={new Date().toISOString().split('T')[0]}
                          onChange={e => setForm(p => ({ ...p, date: e.target.value }))}
                        />
                      </div>
                      <div>
                        <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 800, color: 'var(--heading)', marginBottom: '0.4rem' }}>Preferred Time</label>
                        <select
                          style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid rgba(0,0,0,0.1)', fontSize: '0.85rem', color: 'var(--body)', background: '#fff' }}
                          value={form.time}
                          onChange={e => setForm(p => ({ ...p, time: e.target.value }))}
                        >
                          <option>Select a time</option>
                          <option>Morning (10 AM - 12 PM)</option>
                          <option>Afternoon (12 PM - 3 PM)</option>
                          <option>Evening (3 PM - 6 PM)</option>
                        </select>
                      </div>
                    </div>

                    <button
                      type="submit"
                      style={{ width: '100%', padding: '0.85rem', background: 'var(--blue)', color: '#fff', border: 'none', borderRadius: '8px', fontWeight: 700, fontSize: '0.9rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', cursor: 'pointer', marginTop: '0.5rem' }}
                    >
                      <Calendar size={16} /> Request Consultation
                    </button>
                  </form>

                  <div style={{ marginTop: '1.25rem', textAlign: 'center' }}>
                    <button onClick={goBook} style={{
                      background: 'none', border: 'none', color: 'var(--blue)', fontSize: '0.8rem', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.3rem', width: '100%'
                    }}>
                      Use full booking form <ArrowRight size={14} />
                    </button>
                  </div>
                </>
              )}

              <hr style={{ border: 'none', borderTop: '1px solid rgba(0,0,0,0.05)', margin: '2rem 0' }} />

              {/* Consultation Hours */}
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
                  <Clock size={16} color="var(--blue)" />
                  <span style={{ fontSize: '0.85rem', fontWeight: 800, color: 'var(--navy)' }}>Consultation Hours</span>
                </div>
                {doc.hours.map((row, i) => (
                  <div key={i} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.65rem', fontSize: '0.85rem' }}>
                    <span style={{ color: 'var(--body)' }}>{row.day}</span>
                    <span style={{
                      fontWeight: 700,
                      color: row.time === 'Closed' || row.time === 'Not available' ? 'var(--red)' : 'var(--heading)',
                    }}>
                      {row.time}
                    </span>
                  </div>
                ))}
              </div>

              {/* Quick phone link */}
              <div style={{ marginTop: '1.5rem', background: '#f8fafc', borderRadius: '8px', padding: '1.25rem', textAlign: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', color: 'var(--blue)', marginBottom: '0.25rem' }}>
                  <Phone size={16} /> <span style={{ fontWeight: 800, fontSize: '1rem' }}>{PRIMARY_PHONE}</span>
                </div>
                <div style={{ fontSize: '0.75rem', color: 'var(--muted)' }}>Call us for any assistance</div>
              </div>

            </div>
          </div>
        </div>
      </div>

      {/* ── CTA Banner ── */}
      <section style={{ padding: '2rem 0' }}>
        <div className="container" style={{ maxWidth: '1200px' }}>
          <div style={{ 
            background: '#fff', borderRadius: '16px', padding: '2.5rem 3rem',
            border: '1px solid rgba(0,0,0,0.05)', boxShadow: '0 10px 40px rgba(0,0,0,0.04)',
            display: 'flex', justifyContent: 'space-between', alignItems: 'center'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
              <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: 'var(--blue-light)', color: 'var(--blue)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Calendar size={28} />
              </div>
              <div>
                <h3 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--navy)', margin: '0 0 0.25rem 0' }}>
                  Book a Consultation Today
                </h3>
                <p style={{ fontSize: '0.95rem', color: 'var(--body)', margin: 0 }}>
                  Take the first step towards better health with expert care you can trust.
                </p>
              </div>
            </div>
            
            <div style={{ display: 'flex', gap: '1rem' }}>
              <button className="btn btn-orange btn-lg" onClick={goBook} style={{ padding: '0.75rem 2rem', fontSize: '0.95rem' }}>
                <Calendar size={18} /> Book Appointment
              </button>
              <a href={PRIMARY_PHONE_HREF} className="btn btn-outline-orange btn-lg" style={{ padding: '0.75rem 2rem', fontSize: '0.95rem', textDecoration: 'none', border: '1px solid var(--orange)', color: 'var(--orange)', display: 'flex', alignItems: 'center', gap: '0.5rem', borderRadius: 'var(--r-full)' }}>
                <Phone size={18} /> Call Now
              </a>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default DoctorProfile;
