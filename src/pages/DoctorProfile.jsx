import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Calendar, Phone, MapPin, Clock, ChevronLeft, ArrowRight, ShieldCheck, UserCheck, GraduationCap, HeartPulse, Shield, Activity, FileText, Briefcase, CheckCircle } from 'lucide-react';
import { ALL_DOCTORS } from './OurDoctors';
import VisitingDoctorBookingForm from '../components/VisitingDoctorBookingForm';
import BookingForm from '../components/BookingForm';

import { PRIMARY_PHONE, PRIMARY_PHONE_HREF } from '../config/contact';

const DoctorProfile = () => {
  const { id }    = useParams();
  const navigate  = useNavigate();
  const doc       = ALL_DOCTORS.find(d => d.id === id);

  const goBack  = () => { navigate('/doctors'); window.scrollTo(0, 0); };
  const goBook  = () => { navigate('/book');    window.scrollTo(0, 0); };



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
      <div className="dp-back-link">
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
        <div className="doctor-profile-layout">

          {/* ════════════ LEFT COLUMN ════════════ */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>

            {/* Profile Header Card */}
            <div style={{ background: '#fff', borderRadius: '16px', border: '1px solid rgba(0,0,0,0.05)', overflow: 'hidden' }}>
              <div className="doctor-profile-header">
                {/* Image */}
                <div className="dp-image-wrap">
                  <img src={doc.image} alt={doc.name} style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top' }} />
                </div>
                
                {/* Info */}
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                  <h1 style={{ fontSize: '2rem', color: 'var(--navy)', marginBottom: '0.25rem', lineHeight: 1.2 }}>{doc.name}</h1>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem', flexWrap: 'wrap' }}>
                    <div style={{ fontSize: '1.05rem', color: 'var(--blue)', fontWeight: 800 }}>{doc.specialty}</div>
                    {doc.type === 'visiting-doctor' && (
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <span style={{ background: 'var(--navy)', color: '#fff', padding: '0.2rem 0.6rem', borderRadius: '4px', fontSize: '0.7rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                          Visiting Doctor
                        </span>
                        <span style={{ background: 'var(--orange-light)', color: 'var(--orange)', padding: '0.2rem 0.6rem', borderRadius: '4px', fontSize: '0.7rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                          Limited Monthly Visit
                        </span>
                      </div>
                    )}
                  </div>
                  <div style={{ fontSize: '0.95rem', color: 'var(--heading)', fontWeight: 600, marginBottom: '2rem' }}>{doc.title}</div>
                  
                  <div className="dp-quick-info-grid">
                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', background: '#f8fafc', padding: '1rem', borderRadius: '8px' }}>
                      <div style={{ color: 'var(--blue)' }}><GraduationCap size={20} /></div>
                      <div>
                        <div style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--heading)', marginBottom: '0.15rem' }}>Qualification</div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--body)', whiteSpace: 'pre-line' }}>{doc.qual_short || doc.qual.split(',')[1]?.trim() || doc.qual}</div>
                      </div>
                    </div>
                    {doc.specialization ? (
                      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', background: '#f8fafc', padding: '1rem', borderRadius: '8px' }}>
                        <div style={{ color: 'var(--blue)' }}><ShieldCheck size={20} /></div>
                        <div>
                          <div style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--heading)', marginBottom: '0.15rem' }}>Specialization</div>
                          <div style={{ fontSize: '0.75rem', color: 'var(--body)', whiteSpace: 'pre-line' }}>{doc.specialization}</div>
                        </div>
                      </div>
                    ) : doc.expertise_card ? (
                      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', background: '#f8fafc', padding: '1rem', borderRadius: '8px' }}>
                        <div style={{ color: 'var(--blue)' }}><Activity size={20} /></div>
                        <div>
                          <div style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--heading)', marginBottom: '0.15rem' }}>Expertise</div>
                          <div style={{ fontSize: '0.75rem', color: 'var(--body)', whiteSpace: 'pre-line' }}>{doc.expertise_card}</div>
                        </div>
                      </div>
                    ) : doc.focus ? (
                      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', background: '#f8fafc', padding: '1rem', borderRadius: '8px' }}>
                        <div style={{ color: 'var(--blue)' }}><Activity size={20} /></div>
                        <div>
                          <div style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--heading)', marginBottom: '0.15rem' }}>Focus</div>
                          <div style={{ fontSize: '0.75rem', color: 'var(--body)', whiteSpace: 'pre-line' }}>{doc.focus}</div>
                        </div>
                      </div>
                    ) : doc.credentials ? (
                      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', background: '#f8fafc', padding: '1rem', borderRadius: '8px' }}>
                        <div style={{ color: 'var(--blue)' }}><ShieldCheck size={20} /></div>
                        <div>
                          <div style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--heading)', marginBottom: '0.15rem' }}>Credentials</div>
                          <div style={{ fontSize: '0.75rem', color: 'var(--body)', whiteSpace: 'pre-line' }}>{doc.credentials}</div>
                        </div>
                      </div>
                    ) : doc.previous_experience ? (
                      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', background: '#f8fafc', padding: '1rem', borderRadius: '8px' }}>
                        <div style={{ color: 'var(--blue)' }}><Briefcase size={20} /></div>
                        <div>
                          <div style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--heading)', marginBottom: '0.15rem' }}>Experience / Affiliation</div>
                          <div style={{ fontSize: '0.75rem', color: 'var(--body)', whiteSpace: 'pre-line' }}>{doc.previous_experience}</div>
                        </div>
                      </div>
                    ) : doc.fellowship ? (
                      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', background: '#f8fafc', padding: '1rem', borderRadius: '8px' }}>
                        <div style={{ color: 'var(--blue)' }}><GraduationCap size={20} /></div>
                        <div>
                          <div style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--heading)', marginBottom: '0.15rem' }}>Fellowship</div>
                          <div style={{ fontSize: '0.75rem', color: 'var(--body)', whiteSpace: 'pre-line' }}>{doc.fellowship}</div>
                        </div>
                      </div>
                    ) : doc.license ? (
                      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', background: '#f8fafc', padding: '1rem', borderRadius: '8px' }}>
                        <div style={{ color: 'var(--blue)' }}><ShieldCheck size={20} /></div>
                        <div>
                          <div style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--heading)', marginBottom: '0.15rem' }}>License</div>
                          <div style={{ fontSize: '0.75rem', color: 'var(--body)', whiteSpace: 'pre-line' }}>{doc.license}</div>
                        </div>
                      </div>
                    ) : doc.advanced_credentials ? (
                      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', background: '#f8fafc', padding: '1rem', borderRadius: '8px' }}>
                        <div style={{ color: 'var(--blue)' }}><ShieldCheck size={20} /></div>
                        <div>
                          <div style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--heading)', marginBottom: '0.15rem' }}>Advanced Credentials</div>
                          <div style={{ fontSize: '0.75rem', color: 'var(--body)', whiteSpace: 'pre-line' }}>{doc.advanced_credentials}</div>
                        </div>
                      </div>
                    ) : doc.advanced_training ? (
                      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', background: '#f8fafc', padding: '1rem', borderRadius: '8px' }}>
                        <div style={{ color: 'var(--blue)' }}><GraduationCap size={20} /></div>
                        <div>
                          <div style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--heading)', marginBottom: '0.15rem' }}>Advanced Training</div>
                          <div style={{ fontSize: '0.75rem', color: 'var(--body)', whiteSpace: 'pre-line' }}>{doc.advanced_training}</div>
                        </div>
                      </div>
                    ) : doc.institution ? (
                      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', background: '#f8fafc', padding: '1rem', borderRadius: '8px' }}>
                        <div style={{ color: 'var(--blue)' }}><MapPin size={20} /></div>
                        <div>
                          <div style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--heading)', marginBottom: '0.15rem' }}>Institution</div>
                          <div style={{ fontSize: '0.75rem', color: 'var(--body)', whiteSpace: 'pre-line' }}>{doc.institution}</div>
                        </div>
                      </div>
                    ) : doc.languages && doc.languages.length > 0 ? (
                      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', background: '#f8fafc', padding: '1rem', borderRadius: '8px' }}>
                        <div style={{ color: 'var(--blue)' }}><FileText size={20} /></div>
                        <div>
                          <div style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--heading)', marginBottom: '0.15rem' }}>Languages</div>
                          <div style={{ fontSize: '0.75rem', color: 'var(--body)', whiteSpace: 'pre-line' }}>{doc.languages.join(', ')}</div>
                        </div>
                      </div>
                    ) : null}
                    
                    {doc.institution && (doc.expertise_card || doc.focus || doc.credentials || doc.previous_experience || doc.fellowship || doc.specialization || doc.license || doc.advanced_credentials || doc.advanced_training) ? (
                      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', background: '#f8fafc', padding: '1rem', borderRadius: '8px' }}>
                        <div style={{ color: 'var(--blue)' }}><MapPin size={20} /></div>
                        <div>
                          <div style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--heading)', marginBottom: '0.15rem' }}>Institution / Detail</div>
                          <div style={{ fontSize: '0.75rem', color: 'var(--body)', whiteSpace: 'pre-line' }}>{doc.institution}</div>
                        </div>
                      </div>
                    ) : null}
                    {doc.consultation_days ? (
                      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', background: '#f8fafc', padding: '1rem', borderRadius: '8px' }}>
                        <div style={{ color: 'var(--blue)' }}><Clock size={20} /></div>
                        <div>
                          <div style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--heading)', marginBottom: '0.15rem' }}>Consultation</div>
                          <div style={{ fontSize: '0.75rem', color: 'var(--body)' }}>{doc.consultation_days}</div>
                        </div>
                      </div>
                    ) : doc.exp ? (
                      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', background: '#f8fafc', padding: '1rem', borderRadius: '8px' }}>
                        <div style={{ color: 'var(--blue)' }}><Clock size={20} /></div>
                        <div>
                          <div style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--heading)', marginBottom: '0.15rem' }}>{doc.exp} Years</div>
                          <div style={{ fontSize: '0.75rem', color: 'var(--body)' }}>Overall Experience</div>
                        </div>
                      </div>
                    ) : null}
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
                  {doc.trust_banner || 'Trusted by patients for compassionate care and evidence-based treatment.'}
                </span>
              </div>
            </div>

            {/* Professional Overview */}
            <div className="dp-section-card">
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

            {/* Education & Training */}
            <div className="dp-section-card">
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'var(--blue-light)', color: 'var(--blue)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <GraduationCap size={20} />
                </div>
                <h2 style={{ fontSize: '1.25rem', color: 'var(--navy)', margin: 0 }}>Education & Training</h2>
              </div>
              <ul style={{ margin: 0, padding: '0 0 0 1.5rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {doc.education.map((edu, i) => (
                  <li key={i} style={{ fontSize: '0.95rem', color: 'var(--body)', lineHeight: 1.5 }}>
                    {edu}
                  </li>
                ))}
              </ul>
            </div>

            {/* Experience */}
            {doc.experience && doc.experience.length > 0 && (
              <div className="dp-section-card">
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
                  <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'var(--blue-light)', color: 'var(--blue)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Briefcase size={20} />
                  </div>
                  <h2 style={{ fontSize: '1.25rem', color: 'var(--navy)', margin: 0 }}>Experience</h2>
                </div>
                <ul style={{ margin: 0, padding: '0 0 0 1.5rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  {doc.experience.map((exp, i) => (
                    <li key={i} style={{ fontSize: '0.95rem', color: 'var(--body)', lineHeight: 1.5 }}>
                      {exp}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Awards & Recognition */}
            {doc.awards && doc.awards.length > 0 && (
              <div className="dp-section-card">
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
                  <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'var(--blue-light)', color: 'var(--blue)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <ShieldCheck size={20} />
                  </div>
                  <h2 style={{ fontSize: '1.25rem', color: 'var(--navy)', margin: 0 }}>Awards & Achievements</h2>
                </div>
                <ul style={{ margin: 0, padding: '0 0 0 1.5rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  {doc.awards.map((award, i) => (
                    <li key={i} style={{ fontSize: '0.95rem', color: 'var(--body)', lineHeight: 1.5 }}>
                      {award}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Research & Publications */}
            {doc.research && doc.research.length > 0 && (
              <div className="dp-section-card">
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
                  <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'var(--blue-light)', color: 'var(--blue)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <FileText size={20} />
                  </div>
                  <h2 style={{ fontSize: '1.25rem', color: 'var(--navy)', margin: 0 }}>Research & Publications</h2>
                </div>
                <ul style={{ margin: 0, padding: '0 0 0 1.5rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  {doc.research.map((item, i) => (
                    <li key={i} style={{ fontSize: '0.95rem', color: 'var(--body)', lineHeight: 1.5 }}>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Clinical Interests */}
            {doc.clinicalInterests && doc.clinicalInterests.length > 0 && (
              <div className="dp-section-card">
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
                  <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'var(--blue-light)', color: 'var(--blue)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <HeartPulse size={20} />
                  </div>
                  <h2 style={{ fontSize: '1.25rem', color: 'var(--navy)', margin: 0 }}>Clinical Interests</h2>
                </div>
                <ul style={{ margin: 0, padding: '0 0 0 1.5rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  {doc.clinicalInterests.map((item, i) => (
                    <li key={i} style={{ fontSize: '0.95rem', color: 'var(--body)', lineHeight: 1.5 }}>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Public Awareness & Media Presence */}
            {doc.media && doc.media.length > 0 && (
              <div className="dp-section-card">
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
                  <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'var(--blue-light)', color: 'var(--blue)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <FileText size={20} />
                  </div>
                  <h2 style={{ fontSize: '1.25rem', color: 'var(--navy)', margin: 0 }}>Public Awareness & Media Presence</h2>
                </div>
                <ul style={{ margin: 0, padding: '0 0 0 1.5rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  {doc.media.map((item, i) => (
                    <li key={i} style={{ fontSize: '0.95rem', color: 'var(--body)', lineHeight: 1.5 }}>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Specialized Treatments */}
            <div className="dp-section-card">
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'var(--blue-light)', color: 'var(--blue)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <HeartPulse size={20} />
                </div>
                <h2 style={{ fontSize: '1.25rem', color: 'var(--navy)', margin: 0 }}>{doc.specializedCareHeading || 'Specialized Treatments'}</h2>
              </div>
              <div className="dp-treatments-grid">
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
            <div className="dp-section-card">
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'var(--blue-light)', color: 'var(--blue)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <ShieldCheck size={20} />
                </div>
                <h2 style={{ fontSize: '1.25rem', color: 'var(--navy)', margin: 0 }}>Areas of Expertise</h2>
              </div>
              <div className="dp-expertise-flex">
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
            <div className="dp-section-card">
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'var(--blue-light)', color: 'var(--blue)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <MapPin size={20} />
                </div>
                <h2 style={{ fontSize: '1.25rem', color: 'var(--navy)', margin: 0 }}>Clinic Details</h2>
              </div>
              
              <div className="dp-clinic-grid">
                <div className="dp-clinic-details-grid">
                  <div>
                    <div style={{ fontWeight: 800, fontSize: '0.85rem', color: 'var(--heading)', marginBottom: '0.5rem' }}>Location</div>
                    <div style={{ fontSize: '0.85rem', color: 'var(--body)', lineHeight: 1.6, whiteSpace: 'pre-line' }}>{doc.clinic_location || 'Near National School, Arham Towers, Karan Nagar, Srinagar, Jammu & Kashmir, 190010'}</div>
                    <button style={{ background: 'none', border: 'none', color: 'var(--blue)', fontWeight: 700, fontSize: '0.85rem', marginTop: '0.5rem', padding: 0, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                      View on Map <ArrowRight size={14} />
                    </button>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 800, fontSize: '0.85rem', color: 'var(--heading)', marginBottom: '0.25rem' }}>
                        <Phone size={14} /> Contact
                      </div>
                      <div style={{ fontSize: '0.85rem', color: 'var(--body)' }}>{doc.clinic_contact || PRIMARY_PHONE}</div>
                    </div>
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 800, fontSize: '0.85rem', color: 'var(--heading)', marginBottom: '0.25rem' }}>
                        <FileText size={14} /> Email
                      </div>
                      <div style={{ fontSize: '0.85rem', color: 'var(--body)' }}>{doc.clinic_email || 'info@appoloclinic.in'}</div>
                    </div>
                    {doc.consultation_days && (
                      <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 800, fontSize: '0.85rem', color: 'var(--heading)', marginBottom: '0.25rem' }}>
                          <Clock size={14} /> Consultation
                        </div>
                        <div style={{ fontSize: '0.85rem', color: 'var(--body)', whiteSpace: 'pre-line' }}>{doc.consultation_days}</div>
                      </div>
                    )}
                  </div>
                </div>
                <div style={{ height: '120px', borderRadius: '12px', overflow: 'hidden' }}>
                  <img src="/images/clinic/receptionist.webp" alt="Clinic Location" loading="lazy" decoding="async" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
              </div>
            </div>

          </div>

          {/* ════════════ RIGHT COLUMN ════════════ */}
          <div style={{ position: 'sticky', top: '2rem' }}>
            {doc.type === 'lab-incharge' ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <div className="dp-form-card">
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
                    <div style={{ width: '36px', height: '36px', borderRadius: '8px', background: 'var(--blue-light)', color: 'var(--blue)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Activity size={18} />
                    </div>
                    <h3 style={{ fontSize: '1.15rem', color: 'var(--navy)', margin: 0 }}>Laboratory Leadership</h3>
                  </div>
                  <p style={{ fontSize: '0.9rem', color: 'var(--body)', margin: 0, lineHeight: 1.6 }}>
                    Overseeing all diagnostic operations, ensuring that patient test results meet the highest clinical and academic standards.
                  </p>
                </div>
                <div className="dp-form-card">
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
                    <div style={{ width: '36px', height: '36px', borderRadius: '8px', background: 'var(--blue-light)', color: 'var(--blue)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <ShieldCheck size={18} />
                    </div>
                    <h3 style={{ fontSize: '1.15rem', color: 'var(--navy)', margin: 0 }}>Diagnostics Quality</h3>
                  </div>
                  <p style={{ fontSize: '0.9rem', color: 'var(--body)', margin: 0, lineHeight: 1.6 }}>
                    Committed to precision, timely reporting, and advanced laboratory processes for accurate healthcare decisions.
                  </p>
                </div>
              </div>
            ) : doc.type === 'visiting-doctor' ? (
              <VisitingDoctorBookingForm doc={doc} />
            ) : (
            <div>
              <BookingForm />

              <div className="dp-form-card" style={{ marginTop: '1.5rem' }}>

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

              </div>{/* close dp-form-card */}
            </div>
            )}
          </div>
        </div>
      </div>

      {/* ── CTA Banner ── */}
      <section style={{ padding: '2rem 0' }}>
        <div className="container" style={{ maxWidth: '1200px' }}>
          <div className="dp-cta-card" style={{ background: '#fff', borderRadius: '16px', border: '1px solid rgba(0,0,0,0.05)', boxShadow: '0 10px 40px rgba(0,0,0,0.04)' }}>
            <div className="dp-cta-content">
              <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: 'var(--blue-light)', color: 'var(--blue)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {doc.type === 'lab-incharge' ? <Activity size={28} /> : <Calendar size={28} />}
              </div>
              <div>
                <h3 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--navy)', margin: '0 0 0.25rem 0' }}>
                  {doc.type === 'lab-incharge' ? 'Explore Lab Services' : 'Book a Consultation Today'}
                </h3>
                <p style={{ fontSize: '0.95rem', color: 'var(--body)', margin: 0 }}>
                  {doc.type === 'lab-incharge' ? 'Discover our comprehensive diagnostic and laboratory services.' : 'Take the first step towards better health with expert care you can trust.'}
                </p>
              </div>
            </div>
            
            <div className="dp-cta-actions">
              {doc.type === 'lab-incharge' ? (
                <button className="btn btn-orange btn-lg" onClick={() => { navigate('/diagnostics'); window.scrollTo(0,0); }} style={{ padding: '0.75rem 2rem', fontSize: '0.95rem' }}>
                  <Activity size={18} /> View Diagnostics Services
                </button>
              ) : (
                <button className="btn btn-orange btn-lg" onClick={goBook} style={{ padding: '0.75rem 2rem', fontSize: '0.95rem' }}>
                  <Calendar size={18} /> Book Appointment
                </button>
              )}
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
