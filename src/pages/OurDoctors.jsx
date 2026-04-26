import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Calendar, Phone, ArrowRight } from 'lucide-react';

const PHONE      = '+91 9149425496';
const PHONE_HREF = 'tel:+919149425496';

export const ALL_DOCTORS = [
  {
    id: 'dr-shabir-ahmad-mir',
    initials: 'SA',
    name: 'Dr. Shabir Ahmad Mir',
    specialty: 'General Physician',
    dept: 'Primary Care',
    qual: 'MBBS, MD (Internal Medicine)',
    exp: '12+ years',
    avail: 'Mon – Sat',
    languages: ['English', 'Kashmiri', 'Urdu', 'Hindi'],
    bio: `Dr. Shabir Ahmad Mir is a highly experienced General Physician and Internal Medicine specialist with over 12 years of clinical practice in Kashmir. He manages a wide range of conditions including fever, infections, chronic diseases, and metabolic disorders.

He trained at premier medical institutions and brings a patient-centred approach to every consultation — taking time to listen, explain, and formulate personalised treatment plans. He is the lead physician at Apollo Clinic Srinagar and oversees the day-to-day clinical standards of the facility.

His practice is grounded in evidence-based medicine, with a strong emphasis on preventive healthcare and early detection to reduce the burden of chronic illness in the community.`,
    specializedCare: [
      { name: 'Chronic Disease Management', desc: 'Diabetes, hypertension, and long-term condition management with regular monitoring.' },
      { name: 'Fever & Infectious Disease',  desc: 'Diagnosis and treatment of viral, bacterial, and other systemic infections.' },
      { name: 'Preventive Health Screening', desc: 'Annual health checkups, risk assessment, and early detection protocols.' },
      { name: 'Metabolic Disorders',         desc: 'Thyroid dysfunction, obesity, lipid disorders, and diabetes care.' },
    ],
    hours: [
      { day: 'Monday – Saturday', time: '12:00 PM – 7:00 PM' },
      { day: 'Sunday',            time: 'Closed'              },
    ],
  },
  {
    id: 'dr-nazia-rashid',
    initials: 'NR',
    name: 'Dr. Nazia Rashid',
    specialty: 'Dermatology',
    dept: 'Skin & Hair',
    qual: 'MBBS, MD (Dermatology)',
    exp: '9+ years',
    avail: 'Mon – Sat',
    languages: ['English', 'Kashmiri', 'Urdu'],
    bio: `Dr. Nazia Rashid is a board-certified Dermatologist with nearly a decade of experience in clinical and cosmetic dermatology. She provides expert care for a comprehensive range of skin, hair, and nail conditions.

She completed her MD in Dermatology from a reputed institution and has special expertise in acne management, hair restoration, and treatment-resistant eczema. She is known for her thorough consultations and holistic, patient-specific treatment plans.

Dr. Nazia believes that healthy skin is central to overall wellbeing and confidence. She approaches each patient with clinical precision and genuine compassion, ensuring comfort throughout every consultation.`,
    specializedCare: [
      { name: 'Acne & Eczema',        desc: 'Advanced medical management of acne vulgaris, atopic dermatitis, and chronic eczema.' },
      { name: 'Hair Loss (Alopecia)', desc: 'Diagnosis and treatment of androgenetic alopecia, telogen effluvium, and alopecia areata.' },
      { name: 'Cosmetic Dermatology', desc: 'Skin brightening, anti-ageing consultations, pigmentation treatment, and peel therapy.' },
      { name: 'Allergy & Urticaria',  desc: 'Patch testing, food-related skin reactions, chronic urticaria management.' },
    ],
    hours: [
      { day: 'Monday – Saturday', time: '12:00 PM – 6:00 PM' },
      { day: 'Sunday',            time: 'Closed'              },
    ],
  },
  {
    id: 'dr-aijaz-hussain',
    initials: 'AH',
    name: 'Dr. Aijaz Hussain',
    specialty: 'Pediatrics',
    dept: 'Child Health',
    qual: 'MBBS, DCH, MD (Pediatrics)',
    exp: '10+ years',
    avail: 'Mon – Fri',
    languages: ['English', 'Kashmiri', 'Urdu'],
    bio: `Dr. Aijaz Hussain is a dedicated Pediatrician and Child Health specialist with over 10 years of experience caring for infants, children, and adolescents. He is known for his calm, child-friendly bedside manner that puts even the most anxious young patients at ease.

He holds an MBBS, a Diploma in Child Health (DCH), and a postgraduate MD in Pediatrics. He has extensive experience managing neonatal conditions, growth disorders, vaccines, and acute pediatric illnesses.

Dr. Aijaz strongly advocates for immunisation and preventive child health, and provides parents with practical, evidence-based guidance on nutrition, development milestones, and early intervention.`,
    specializedCare: [
      { name: 'Immunisation & Vaccines', desc: 'Complete national immunisation schedules and travel vaccines for children.' },
      { name: 'Growth & Development',    desc: 'Developmental milestone assessment and nutritional guidance for healthy growth.' },
      { name: 'Newborn & Neonatal Care', desc: 'Expert guidance for new parents on newborn health, feeding, and early assessments.' },
      { name: 'Pediatric Illness',       desc: 'Fever, respiratory infections, diarrhoea, and acute childhood conditions.' },
    ],
    hours: [
      { day: 'Monday – Friday',  time: '1:00 PM – 6:00 PM'  },
      { day: 'Saturday–Sunday',  time: 'Closed'              },
    ],
  },
  {
    id: 'dr-saima-bano',
    initials: 'SB',
    name: 'Dr. Saima Bano',
    specialty: 'Gynecology',
    dept: "Women's Health",
    qual: 'MBBS, MS (Obstetrics & Gynecology)',
    exp: '11+ years',
    avail: 'Mon – Sat',
    languages: ['English', 'Kashmiri', 'Urdu'],
    bio: `Dr. Saima Bano is a senior Obstetrician and Gynaecologist with over 11 years of dedicated service to women's healthcare in Srinagar. She provides compassionate, comprehensive care across all stages of a woman's life — from adolescence through menopause.

She holds an MBBS and a postgraduate MS in Obstetrics and Gynecology, and is skilled in managing high-risk pregnancies, hormonal disorders, infertility evaluation, and routine gynecological examinations.

Dr. Saima creates a safe, respectful environment where women can comfortably discuss sensitive health concerns. She is particularly passionate about maternal wellbeing and reproductive health education.`,
    specializedCare: [
      { name: 'Antenatal Care',           desc: 'Comprehensive pregnancy monitoring, risk assessment, and nutritional guidance.' },
      { name: 'Menstrual Health',         desc: 'PCOS, irregular cycles, dysmenorrhoea, and menopause management.' },
      { name: 'Reproductive Wellness',    desc: 'Family planning, cervical screening, and reproductive health consultations.' },
      { name: 'Hormonal Disorders',       desc: 'Hormonal imbalances, thyroid in pregnancy, and endocrine condition management.' },
    ],
    hours: [
      { day: 'Monday – Saturday', time: '12:00 PM – 5:00 PM' },
      { day: 'Sunday',            time: 'Closed'              },
    ],
  },
  {
    id: 'dr-mushtaq-ahmed',
    initials: 'MA',
    name: 'Dr. Mushtaq Ahmed',
    specialty: 'Orthopedics',
    dept: 'Bone & Joint',
    qual: 'MBBS, MS (Orthopedics)',
    exp: '14+ years',
    avail: 'Mon, Wed, Fri',
    languages: ['English', 'Kashmiri', 'Urdu'],
    bio: `Dr. Mushtaq Ahmed is a highly experienced Orthopaedic Surgeon with 14+ years of practice specialising in bone, joint, and spine conditions. He provides expert evaluation and management for a wide range of musculoskeletal and sports-related injuries.

He completed his MS in Orthopaedics from a premier institution and has a proven track record in conservative and surgical management of orthopaedic conditions. He believes in exhausting non-surgical options before recommending procedures, making him a trusted advisor for patients seeking quality orthopaedic care.`,
    specializedCare: [
      { name: 'Joint & Bone Pain',     desc: 'Knee, hip, shoulder, and foot pain — diagnosis, injection therapy, and rehabilitation.' },
      { name: 'Spine Care',            desc: 'Disc herniation, sciatica, back pain, and spondylosis management.' },
      { name: 'Sports Injury',         desc: 'Acute injury management, ligament sprains, fractures, and return-to-sport protocols.' },
      { name: 'Arthritis Management',  desc: 'Osteoarthritis and rheumatoid arthritis evaluation and conservative treatment.' },
    ],
    hours: [
      { day: 'Mon, Wed, Fri', time: '3:00 PM – 6:00 PM'  },
      { day: 'Other days',    time: 'Not available'       },
    ],
  },
  {
    id: 'dr-asma-yousuf',
    initials: 'AY',
    name: 'Dr. Asma Yousuf',
    specialty: 'Clinical Psychology',
    dept: 'Mental Health',
    qual: 'M.Phil (Clinical Psychology)',
    exp: '8+ years',
    avail: 'Mon – Thu',
    languages: ['English', 'Kashmiri', 'Urdu'],
    bio: `Dr. Asma Yousuf is a licensed Clinical Psychologist with 8+ years of experience providing evidence-based psychological care. She works with individuals experiencing anxiety, depression, trauma, grief, and a range of relationship and workplace stressors.

She holds an M.Phil in Clinical Psychology and is trained in Cognitive Behavioural Therapy (CBT), Acceptance and Commitment Therapy (ACT), and mindfulness-based interventions. All sessions are conducted in a confidential, non-judgemental setting.

Dr. Asma is particularly passionate about mental health awareness in Kashmir and takes a culturally sensitive approach to therapy, ensuring every client feels understood and respected.`,
    specializedCare: [
      { name: 'Anxiety & Panic',        desc: 'CBT-based therapy for generalised anxiety, panic disorder, and phobias.' },
      { name: 'Depression Counselling', desc: 'Evidence-based psychotherapy for mild-to-moderate depression and low mood.' },
      { name: 'Trauma & PTSD',          desc: 'Trauma-focused therapy delivered sensitively with structured interventions.' },
      { name: 'Stress & Burnout',       desc: 'Mindfulness and ACT-based support for work stress, burnout, and fatigue.' },
    ],
    hours: [
      { day: 'Monday – Thursday', time: '2:00 PM – 6:00 PM'  },
      { day: 'Fri–Sun',           time: 'Not available'       },
    ],
  },
];

const SPECIALTIES_FILTER = ['All', 'Primary Care', 'Skin & Hair', 'Child Health', "Women's Health", 'Bone & Joint', 'Mental Health'];

const DoctorCard = ({ doc, onProfile, onBook }) => {
  const [hov, setHov] = React.useState(false);
  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        background: 'linear-gradient(150deg, #ffffff 0%, #f7fafe 100%)',
        border: `1px solid ${hov ? 'rgba(13,82,192,0.2)' : 'rgba(13,82,192,0.08)'}`,
        borderRadius: 'var(--r-xl)',
        display: 'flex', flexDirection: 'column',
        transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
        boxShadow: hov ? '0 16px 32px rgba(13,82,192,0.12)' : '0 4px 16px rgba(13,82,192,0.04)',
        transform: hov ? 'translateY(-3px)' : 'none',
        overflow: 'hidden',
      }}
    >
      {/* Top accent line */}
      <div style={{ height: 3, background: hov ? 'var(--blue)' : 'var(--border)', transition: 'background 0.3s' }} />

      {/* Avatar area */}
      <div style={{ 
        background: hov ? 'linear-gradient(135deg, var(--navy), var(--blue))' : 'var(--blue-light)', 
        height: 120, display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative',
        transition: 'all 0.3s',
        boxShadow: hov ? '0 4px 12px rgba(13,82,192,0.1)' : 'none',
      }}>
        <div style={{ fontSize: '2.2rem', fontWeight: 900, color: hov ? '#fff' : 'var(--navy)', letterSpacing: '-0.03em', transition: 'color 0.3s' }}>
          {doc.initials}
        </div>
        <div style={{ position: 'absolute', top: 10, right: 10 }}>
          <span style={{ 
            background: hov ? 'rgba(255,255,255,0.2)' : 'var(--green-light)', 
            border: hov ? '1px solid rgba(255,255,255,0.4)' : '1px solid var(--green-border)', 
            borderRadius: 'var(--r-sm)', fontSize: '0.62rem', fontWeight: 700, 
            color: hov ? '#fff' : 'var(--green)', 
            padding: '0.18rem 0.5rem', textTransform: 'uppercase', letterSpacing: '0.05em',
            transition: 'all 0.3s'
          }}>
            {doc.avail}
          </span>
        </div>
      </div>

      {/* Body */}
      <div style={{ padding: '1.25rem', flex: 1, display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
        <div style={{ fontSize: '0.65rem', fontWeight: 700, color: 'var(--blue)', textTransform: 'uppercase', letterSpacing: '0.07em' }}>
          {doc.specialty}
        </div>
        <div style={{ fontWeight: 800, fontSize: '1.05rem', color: 'var(--heading)', lineHeight: 1.3 }}>{doc.name}</div>
        <div style={{ fontSize: '0.8rem', color: 'var(--body)', marginBottom: '0.85rem' }}>{doc.qual}</div>
        <div style={{ display: 'flex', gap: '0.35rem', flexWrap: 'wrap' }}>
          <span style={{ background: 'var(--blue-light)', color: 'var(--blue)', fontSize: '0.68rem', fontWeight: 600, padding: '0.18rem 0.55rem', borderRadius: 'var(--r-sm)' }}>
            Exp: {doc.exp}
          </span>
          <span style={{ background: 'var(--blue-light)', color: 'var(--blue)', fontSize: '0.68rem', fontWeight: 600, padding: '0.18rem 0.55rem', borderRadius: 'var(--r-sm)' }}>
            {doc.languages[0]}
          </span>
        </div>
      </div>

      {/* Actions */}
      <div style={{ padding: '0 1.25rem 1.25rem', display: 'flex', gap: '0.5rem' }}>
        <button
          onClick={onProfile}
          style={{ flex: 1, padding: '0.65rem 0.75rem', fontSize: '0.8rem', fontWeight: 600, color: 'var(--navy)', background: '#fff', border: '1.5px solid var(--navy)', borderRadius: 'var(--r-md)', cursor: 'pointer', fontFamily: 'inherit', transition: 'all 0.2s', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          onMouseEnter={e => { e.currentTarget.style.background = 'var(--bg)'; }}
          onMouseLeave={e => { e.currentTarget.style.background = '#fff'; }}
        >
          View Profile
        </button>
        <button
          onClick={onBook}
          style={{ flex: 1, padding: '0.65rem 0.75rem', fontSize: '0.8rem', fontWeight: 700, color: '#fff', background: 'var(--navy)', border: '1.5px solid var(--navy)', borderRadius: 'var(--r-md)', cursor: 'pointer', fontFamily: 'inherit', transition: 'all 0.2s', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          onMouseEnter={e => e.currentTarget.style.background = 'var(--blue)'}
          onMouseLeave={e => e.currentTarget.style.background = 'var(--navy)'}
        >
          Book Now
        </button>
      </div>
    </div>
  );
};

const OurDoctors = () => {
  const navigate = useNavigate();
  const [search,  setSearch]  = React.useState('');
  const [filter,  setFilter]  = React.useState('All');

  const goBook    = () => { navigate('/book');         window.scrollTo(0, 0); };
  const goProfile = (id) => { navigate(`/doctors/${id}`); window.scrollTo(0, 0); };

  const filtered = ALL_DOCTORS.filter(d => {
    const matchDept   = filter === 'All' || d.dept === filter;
    const matchSearch = search === '' || d.name.toLowerCase().includes(search.toLowerCase()) || d.specialty.toLowerCase().includes(search.toLowerCase());
    return matchDept && matchSearch;
  });

  return (
    <div style={{ background: '#fff' }}>

      {/* ── Hero ── */}
      <section style={{ background: '#fff', borderBottom: '1px solid var(--border)', padding: '4.5rem 0 3rem' }}>
        <div className="container">
          <div className="section-label">Our Specialists</div>
          <h1 style={{ marginBottom: '0.85rem' }}>
            Find a <span style={{ color: 'var(--blue)' }}>Doctor</span>
          </h1>
          <p style={{ fontSize: '1rem', color: 'var(--body)', maxWidth: 520, marginBottom: '2rem', lineHeight: 1.72 }}>
            Browse our team of qualified, patient-centred specialists — each committed to delivering personalised, evidence-based care.
          </p>

          {/* Search + Filter row */}
          <div style={{ display: 'flex', gap: '0.85rem', flexWrap: 'wrap', alignItems: 'flex-start' }}>
            {/* Search */}
            <div style={{ position: 'relative', width: 320 }}>
              <Search size={15} style={{ position: 'absolute', left: '0.85rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--muted)', pointerEvents: 'none' }} />
              <input
                className="search-input"
                placeholder="Search a doctor, specialty…"
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
            </div>
            {/* Filter pills */}
            <div className="filter-pills">
              {SPECIALTIES_FILTER.map(f => (
                <button
                  key={f}
                  className={`filter-pill${filter === f ? ' active' : ''}`}
                  onClick={() => setFilter(f)}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Doctors grid ── */}
      <section style={{ background: 'var(--bg)', padding: '3.5rem 0' }}>
        <div className="container">
          {filtered.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '4rem 0', color: 'var(--muted)' }}>
              <div style={{ fontSize: '0.95rem' }}>No doctors matched <strong>"{search}"</strong></div>
              <button className="btn btn-outline-blue btn-sm" onClick={() => { setSearch(''); setFilter('All'); }} style={{ marginTop: '1rem', borderRadius: 'var(--r-full)' }}>
                Clear filters
              </button>
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '1rem' }}>
              {filtered.map(doc => (
                <DoctorCard key={doc.id} doc={doc} onProfile={() => goProfile(doc.id)} onBook={goBook} />
              ))}
            </div>
          )}

          {/* Book CTA */}
          <div style={{
            marginTop: '2.5rem',
            background: '#fff',
            border: '1px solid var(--border)',
            borderRadius: 'var(--r-xl)',
            padding: '2rem',
            display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1.5rem', flexWrap: 'wrap',
          }}>
            <div>
              <div style={{ fontWeight: 800, fontSize: '1rem', color: 'var(--heading)', marginBottom: '0.35rem' }}>
                Not sure which doctor to consult?
              </div>
              <div style={{ fontSize: '0.87rem', color: 'var(--body)' }}>
                Call our front desk — we'll guide you to the right specialist.
              </div>
            </div>
            <div style={{ display: 'flex', gap: '0.65rem', flexWrap: 'wrap' }}>
              <button className="btn btn-primary" onClick={goBook} style={{ borderRadius: 'var(--r-full)' }}>
                <Calendar size={15} /> Book Appointment
              </button>
              <a href={PHONE_HREF} className="btn btn-ghost" style={{ borderRadius: 'var(--r-full)' }}>
                <Phone size={15} /> {PHONE}
              </a>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default OurDoctors;
