import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Calendar, Phone, ArrowRight, UserCheck, ShieldCheck, HeartPulse, Clock } from 'lucide-react';

const PHONE      = '+91 1234 567 890'; // Updated to match screenshot "+91 1234 567 890" for design fidelity
const PHONE_HREF = 'tel:+911234567890';

export const ALL_DOCTORS = [
  {
    id: 'dr-shabir-ahmad-mir',
    image: '/doctor-arjun.png',
    name: 'Dr. Shabir Ahmad Mir',
    title: 'Senior Consultant – Internal Medicine',
    specialty: 'General Physician',
    dept: 'General Physician',
    qual: 'MBBS, MD (Internal Medicine)',
    exp: '12+ years',
    avail: 'MON - SAT',
    languages: ['English', 'Kashmiri', 'Urdu', 'Hindi'],
    bio: `Dr. Shabir Ahmad Mir is a highly experienced General Physician and Internal Medicine specialist with over 12 years of clinical practice in Kashmir. He manages a wide range of conditions including fever, infections, chronic diseases, and metabolic disorders.

He trained at premier medical institutions and brings a patient-centred approach to every consultation — taking time to listen, explain, and formulate personalised treatment plans. He is the lead physician at Apollo Clinic Srinagar and oversees the day-to-day clinical standards of the facility.

His practice is grounded in evidence-based medicine, with a strong emphasis on preventive healthcare and early detection to reduce the burden of chronic illness in the community.`,
    education: [
      'MBBS – Recognized University',
      'MD (Internal Medicine) – Recognized University',
      'Advanced Training in Internal Medicine & Critical Care',
      'Member – Association of Physicians of India (API)'
    ],
    expertise: ['General Medicine', 'Diabetes Management', 'Hypertension', 'Respiratory Infections', 'Thyroid Disorders', 'Gastrointestinal Disorders', 'Lifestyle Disorders', 'Preventive Healthcare', 'Health Checkups'],
    specializedCare: [
      { name: 'Chronic Disease Management', desc: 'Diabetes, hypertension, and long-term condition management with regular monitoring.', icon: 'Heart' },
      { name: 'Fever & Infectious Disease',  desc: 'Diagnosis and treatment of viral, bacterial, and other systemic infections.', icon: 'Virus' },
      { name: 'Preventive Health Screening', desc: 'Annual health checkups, risk assessment, and early detection protocols.', icon: 'Shield' },
      { name: 'Metabolic Disorders',         desc: 'Thyroid dysfunction, obesity, lipid disorders, and diabetes care.', icon: 'Activity' },
    ],
    hours: [
      { day: 'Mon – Sat', time: '12:00 PM – 7:00 PM' },
      { day: 'Sunday',    time: 'Closed'              },
    ],
  },
  {
    id: 'dr-insha-yousuf-bhat',
    image: '/doctor-priya.png',
    name: 'Dr. Insha Yousuf Bhat',
    title: 'Consultant Pediatrician',
    specialty: 'Pediatrics',
    dept: 'Pediatrics',
    qual: 'MBBS, MD (Pediatrics)',
    exp: '10+ years',
    avail: 'MON - SAT',
    languages: ['English', 'Urdu'],
    bio: `Dr. Insha Yousuf Bhat is a dedicated Pediatrician and Child Health specialist with over 10 years of experience caring for infants, children, and adolescents. She is known for her calm, child-friendly bedside manner that puts even the most anxious young patients at ease.

She holds an MBBS and a postgraduate MD in Pediatrics. She has extensive experience managing neonatal conditions, growth disorders, vaccines, and acute pediatric illnesses.

Dr. Insha strongly advocates for immunisation and preventive child health, and provides parents with practical, evidence-based guidance on nutrition, development milestones, and early intervention.`,
    education: [
      'MBBS – Recognized Medical College',
      'MD (Pediatrics) – Premier Institute',
      'Fellowship in Neonatology',
      'Member – Indian Academy of Pediatrics (IAP)'
    ],
    expertise: ['Neonatal Care', 'Childhood Infections', 'Immunisation', 'Growth Monitoring', 'Pediatric Asthma', 'Child Nutrition', 'Developmental Pediatrics', 'Adolescent Health'],
    specializedCare: [
      { name: 'Immunisation & Vaccines', desc: 'Complete national immunisation schedules and travel vaccines for children.', icon: 'Shield' },
      { name: 'Growth & Development',    desc: 'Developmental milestone assessment and nutritional guidance for healthy growth.', icon: 'Activity' },
      { name: 'Newborn & Neonatal Care', desc: 'Expert guidance for new parents on newborn health, feeding, and early assessments.', icon: 'Heart' },
      { name: 'Pediatric Illness',       desc: 'Fever, respiratory infections, diarrhoea, and acute childhood conditions.', icon: 'Virus' },
    ],
    hours: [
      { day: 'Mon – Sat', time: '10:00 AM – 4:00 PM' },
      { day: 'Sunday',    time: 'Closed'              },
    ],
  },
  {
    id: 'dr-aamir-rashid-lone',
    image: '/doctor-rohan.png',
    name: 'Dr. Aamir Rashid Lone',
    title: 'Senior Interventional Cardiologist',
    specialty: 'Cardiology',
    dept: 'Cardiology',
    qual: 'MBBS, DM (Cardiology)',
    exp: '14+ years',
    avail: 'MON - SAT',
    languages: ['English', 'Kashmiri'],
    bio: `Dr. Aamir Rashid Lone is a renowned Cardiologist with a wealth of experience in managing complex cardiovascular conditions. He specializes in both non-invasive and interventional cardiology, offering state-of-the-art care to his patients.

With an advanced DM in Cardiology, he is adept at diagnosing and treating heart rhythm disorders, coronary artery disease, and heart failure. He is committed to providing compassionate care and utilizing the latest medical advancements to ensure optimal patient outcomes.`,
    education: [
      'MBBS – Top Medical University',
      'MD (General Medicine)',
      'DM (Cardiology) – National Board of Examinations',
      'Fellow of the American College of Cardiology (FACC)'
    ],
    expertise: ['Coronary Artery Disease', 'Heart Failure Management', 'Arrhythmias', 'Preventive Cardiology', 'Echocardiography', 'Hypertension Management', 'Lipid Disorders'],
    specializedCare: [
      { name: 'Cardiac Diagnostics', desc: 'Expert interpretation of ECG, ECHO, TMT, and Holter monitoring.', icon: 'Activity' },
      { name: 'Heart Failure Care',  desc: 'Comprehensive management and optimization of heart failure therapies.', icon: 'Heart' },
      { name: 'Preventive Cardiology', desc: 'Risk assessment and lifestyle modification for cardiovascular health.', icon: 'Shield' },
      { name: 'Rhythm Disorders',    desc: 'Diagnosis and medical management of atrial fibrillation and other arrhythmias.', icon: 'Virus' },
    ],
    hours: [
      { day: 'Mon – Sat', time: '2:00 PM – 7:00 PM' },
      { day: 'Sunday',    time: 'Closed'              },
    ],
  },
  {
    id: 'dr-mehvish-jaan-wani',
    image: '/doctor-neha.png',
    name: 'Dr. Mehvish Jaan Wani',
    title: 'Consultant Obstetrician & Gynecologist',
    specialty: 'Gynecology',
    dept: 'Gynecology',
    qual: 'MBBS, MS (Obstetrics & Gynecology)',
    exp: '11+ years',
    avail: 'MON - SAT',
    languages: ['English', 'Urdu'],
    bio: `Dr. Mehvish Jaan Wani is a senior Obstetrician and Gynaecologist with over 11 years of dedicated service to women's healthcare. She provides compassionate, comprehensive care across all stages of a woman's life — from adolescence through menopause.

She holds an MBBS and a postgraduate MS in Obstetrics and Gynecology, and is skilled in managing high-risk pregnancies, hormonal disorders, infertility evaluation, and routine gynecological examinations.

Dr. Mehvish creates a safe, respectful environment where women can comfortably discuss sensitive health concerns. She is particularly passionate about maternal wellbeing and reproductive health education.`,
    education: [
      'MBBS – Recognized University',
      'MS (Obstetrics & Gynecology) – Leading Medical College',
      'Fellowship in Minimal Access Surgery',
      'Member – FOGSI'
    ],
    expertise: ['High-Risk Pregnancy', 'PCOS Management', 'Infertility Evaluation', 'Menopause Counseling', 'Adolescent Gynecology', 'Preventive Women’s Health', 'Menstrual Disorders'],
    specializedCare: [
      { name: 'Antenatal Care',           desc: 'Comprehensive pregnancy monitoring, risk assessment, and nutritional guidance.', icon: 'Heart' },
      { name: 'Menstrual Health',         desc: 'PCOS, irregular cycles, dysmenorrhoea, and menopause management.', icon: 'Activity' },
      { name: 'Reproductive Wellness',    desc: 'Family planning, cervical screening, and reproductive health consultations.', icon: 'Shield' },
      { name: 'Hormonal Disorders',       desc: 'Hormonal imbalances, thyroid in pregnancy, and endocrine condition management.', icon: 'Virus' },
    ],
    hours: [
      { day: 'Mon – Sat', time: '11:00 AM – 5:00 PM' },
      { day: 'Sunday',    time: 'Closed'              },
    ],
  },
  {
    id: 'dr-owais-nazir-shah',
    image: '/doctor-arjun.png',
    name: 'Dr. Owais Nazir Shah',
    title: 'Consultant Dermatologist',
    specialty: 'Dermatology',
    dept: 'Dermatology',
    qual: 'MBBS, MD (Dermatology)',
    exp: '9+ years',
    avail: 'MON - SAT',
    languages: ['English', 'Kashmiri'],
    bio: `Dr. Owais Nazir Shah is a board-certified Dermatologist with nearly a decade of experience in clinical and cosmetic dermatology. He provides expert care for a comprehensive range of skin, hair, and nail conditions.

He completed his MD in Dermatology from a reputed institution and has special expertise in acne management, hair restoration, and treatment-resistant eczema. He is known for his thorough consultations and holistic, patient-specific treatment plans.

Dr. Owais believes that healthy skin is central to overall wellbeing and confidence. He approaches each patient with clinical precision and genuine compassion, ensuring comfort throughout every consultation.`,
    education: [
      'MBBS – Recognized University',
      'MD (Dermatology, Venereology & Leprosy)',
      'Certificate in Aesthetic Dermatology',
      'Member – Indian Association of Dermatologists (IADVL)'
    ],
    expertise: ['Clinical Dermatology', 'Acne & Scarring', 'Hair Fall Treatments', 'Psoriasis & Eczema', 'Skin Allergies', 'Cosmetic Procedures', 'Pigmentation'],
    specializedCare: [
      { name: 'Acne & Eczema',        desc: 'Advanced medical management of acne vulgaris, atopic dermatitis, and chronic eczema.', icon: 'Activity' },
      { name: 'Hair Loss (Alopecia)', desc: 'Diagnosis and treatment of androgenetic alopecia, telogen effluvium, and alopecia areata.', icon: 'Heart' },
      { name: 'Cosmetic Dermatology', desc: 'Skin brightening, anti-ageing consultations, pigmentation treatment, and peel therapy.', icon: 'Shield' },
      { name: 'Allergy & Urticaria',  desc: 'Patch testing, food-related skin reactions, chronic urticaria management.', icon: 'Virus' },
    ],
    hours: [
      { day: 'Mon – Sat', time: '1:00 PM – 6:00 PM' },
      { day: 'Sunday',    time: 'Closed'              },
    ],
  },
  {
    id: 'dr-irfan-mushtaq-bhat',
    image: '/doctor-rohan.png',
    name: 'Dr. Irfan Mushtaq Bhat',
    title: 'Consultant Orthopedic Surgeon',
    specialty: 'Orthopedics',
    dept: 'Orthopedics',
    qual: 'MBBS, MS (Orthopedics)',
    exp: '13+ years',
    avail: 'MON - SAT',
    languages: ['English', 'Urdu'],
    bio: `Dr. Irfan Mushtaq Bhat is a highly experienced Orthopaedic Surgeon with 13+ years of practice specialising in bone, joint, and spine conditions. He provides expert evaluation and management for a wide range of musculoskeletal and sports-related injuries.

He completed his MS in Orthopaedics from a premier institution and has a proven track record in conservative and surgical management of orthopaedic conditions. He believes in exhausting non-surgical options before recommending procedures, making him a trusted advisor for patients seeking quality orthopaedic care.`,
    education: [
      'MBBS – Recognized University',
      'MS (Orthopedics) – Leading Institution',
      'Fellowship in Joint Replacement',
      'Member – Indian Orthopaedic Association (IOA)'
    ],
    expertise: ['Joint Replacement', 'Sports Injuries', 'Spine Disorders', 'Trauma Management', 'Arthritis Care', 'Pediatric Orthopedics', 'Rehabilitation Protocols'],
    specializedCare: [
      { name: 'Joint & Bone Pain',     desc: 'Knee, hip, shoulder, and foot pain — diagnosis, injection therapy, and rehabilitation.', icon: 'Activity' },
      { name: 'Spine Care',            desc: 'Disc herniation, sciatica, back pain, and spondylosis management.', icon: 'Shield' },
      { name: 'Sports Injury',         desc: 'Acute injury management, ligament sprains, fractures, and return-to-sport protocols.', icon: 'Heart' },
      { name: 'Arthritis Management',  desc: 'Osteoarthritis and rheumatoid arthritis evaluation and conservative treatment.', icon: 'Virus' },
    ],
    hours: [
      { day: 'Mon – Sat', time: '3:00 PM – 7:00 PM' },
      { day: 'Sunday',    time: 'Closed'              },
    ],
  },
];

const SPECIALTIES_FILTER = ['All', 'General Physician', 'Cardiology', 'Pediatrics', 'Gynecology', 'Dermatology', 'Orthopedics', 'ENT'];

const DoctorCard = ({ doc, onProfile, onBook }) => {
  const [hov, setHov] = React.useState(false);
  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        background: '#fff',
        border: '1px solid rgba(0,0,0,0.05)',
        borderRadius: '16px',
        display: 'flex', flexDirection: 'column',
        transition: 'all 0.3s ease',
        boxShadow: hov ? '0 12px 30px rgba(13,82,192,0.1)' : '0 4px 20px rgba(0,0,0,0.02)',
        transform: hov ? 'translateY(-5px)' : 'none',
        overflow: 'hidden',
        cursor: 'pointer'
      }}
    >
      {/* Top Image Area */}
      <div style={{ position: 'relative', height: '240px', background: '#eef2f6', overflow: 'hidden' }}>
        <img 
          src={doc.image} 
          alt={doc.name} 
          style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top' }}
        />
        <div style={{ position: 'absolute', top: 12, right: 12 }}>
          <span style={{ 
            background: '#fff',
            border: '1px solid var(--green-border)', 
            borderRadius: '4px', fontSize: '0.65rem', fontWeight: 800, 
            color: 'var(--green)', 
            padding: '0.2rem 0.6rem', textTransform: 'uppercase', letterSpacing: '0.05em',
            boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
          }}>
            {doc.avail}
          </span>
        </div>
      </div>

      {/* Body */}
      <div style={{ padding: '1.5rem', flex: 1, display: 'flex', flexDirection: 'column', textAlign: 'center' }}>
        <div style={{ fontSize: '0.65rem', fontWeight: 800, color: 'var(--blue)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.5rem' }}>
          {doc.specialty}
        </div>
        <h3 style={{ fontWeight: 800, fontSize: '1.1rem', color: 'var(--navy)', lineHeight: 1.3, marginBottom: '0.3rem' }}>{doc.name}</h3>
        <p style={{ fontSize: '0.8rem', color: 'var(--body)', marginBottom: '1.25rem' }}>{doc.qual}</p>
        
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', justifyContent: 'center', marginBottom: '1.5rem' }}>
          <span style={{ background: 'var(--blue-light)', color: 'var(--blue)', fontSize: '0.7rem', fontWeight: 600, padding: '0.2rem 0.6rem', borderRadius: '4px' }}>
            Exp: {doc.exp}
          </span>
          <span style={{ background: 'var(--blue-light)', color: 'var(--blue)', fontSize: '0.7rem', fontWeight: 600, padding: '0.2rem 0.6rem', borderRadius: '4px' }}>
            {doc.languages[0]}
          </span>
          {doc.languages[1] && (
            <span style={{ background: 'var(--blue-light)', color: 'var(--blue)', fontSize: '0.7rem', fontWeight: 600, padding: '0.2rem 0.6rem', borderRadius: '4px' }}>
              {doc.languages[1]}
            </span>
          )}
        </div>

        {/* Actions */}
        <div style={{ display: 'flex', gap: '0.5rem', marginTop: 'auto' }}>
          <button
            onClick={(e) => { e.stopPropagation(); onProfile(); }}
            style={{ flex: 1, padding: '0.75rem', fontSize: '0.85rem', fontWeight: 700, color: 'var(--navy)', background: '#fff', border: '1.5px solid var(--navy)', borderRadius: '8px', cursor: 'pointer', transition: 'all 0.2s', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            onMouseEnter={e => e.currentTarget.style.background = 'var(--bg)'}
            onMouseLeave={e => e.currentTarget.style.background = '#fff'}
          >
            View Profile
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); onBook(); }}
            style={{ flex: 1, padding: '0.75rem', fontSize: '0.85rem', fontWeight: 700, color: '#fff', background: 'var(--navy)', border: '1.5px solid var(--navy)', borderRadius: '8px', cursor: 'pointer', transition: 'all 0.2s', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            onMouseEnter={e => e.currentTarget.style.background = 'var(--blue)'}
            onMouseLeave={e => e.currentTarget.style.background = 'var(--navy)'}
          >
            Book Now
          </button>
        </div>
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
    const matchDept   = filter === 'All' || d.dept === filter || d.specialty === filter;
    const matchSearch = search === '' || d.name.toLowerCase().includes(search.toLowerCase()) || d.specialty.toLowerCase().includes(search.toLowerCase());
    return matchDept && matchSearch;
  });

  return (
    <div style={{ background: '#f8fafc', minHeight: '100vh', paddingBottom: '4rem' }}>

      {/* ── Hero ── */}
      <section className="doc-hero" style={{ padding: '5rem 0' }}>
        <div className="container m-grid-1" style={{ maxWidth: '1400px', display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '4rem', alignItems: 'center' }}>
          
          <div className="m-center">
            <div style={{ display: 'inline-block', marginBottom: '1rem' }}>
              <span style={{ color: 'var(--blue)', fontWeight: 800, fontSize: '0.85rem', letterSpacing: '1px', textTransform: 'uppercase' }}>
                OUR SPECIALISTS
              </span>
              <div style={{ height: '3px', width: '40px', background: 'var(--orange)', marginTop: '4px' }}></div>
            </div>
            
            <h1 style={{ fontSize: '3.5rem', lineHeight: 1.1, marginBottom: '1.5rem', color: 'var(--navy)' }}>
              Find the Right <span style={{ color: 'var(--blue)' }}>Doctor</span>
            </h1>
            
            <p style={{ fontSize: '1.1rem', color: 'var(--body)', marginBottom: '3rem', maxWidth: '500px', lineHeight: 1.6 }}>
              Browse our team of experienced, patient-centred specialists across multiple disciplines — committed to delivering personalised, evidence-based care.
            </p>

            {/* Search + Filter */}
            <div className="doc-search" style={{ position: 'relative', maxWidth: '500px', marginBottom: '1.5rem' }}>
              <div className="doc-search-icon" style={{ position: 'absolute', left: '1.2rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--muted)', display: 'flex', alignItems: 'center' }}>
                <Search size={20} />
              </div>
              <input
                className="form-input doc-search-input"
                style={{ width: '100%', padding: '1rem 1rem 1rem 3.5rem', borderRadius: '50px', fontSize: '1rem', border: '1px solid rgba(0,0,0,0.1)', boxShadow: '0 4px 15px rgba(0,0,0,0.05)' }}
                placeholder="Search doctor or specialty"
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
            </div>
            
            <div className="doc-filters" style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
              {SPECIALTIES_FILTER.map(f => (
                <button
                  key={f}
                  style={{
                    padding: '0.5rem 1.25rem',
                    borderRadius: '50px',
                    fontSize: '0.85rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    background: filter === f ? 'var(--navy)' : '#fff',
                    color: filter === f ? '#fff' : 'var(--body)',
                    border: `1px solid ${filter === f ? 'var(--navy)' : 'rgba(0,0,0,0.1)'}`,
                    boxShadow: filter === f ? '0 4px 12px rgba(13,82,192,0.2)' : 'none'
                  }}
                  onClick={() => setFilter(f)}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>

          <div className="m-hide" style={{ position: 'relative', display: 'flex', justifyContent: 'center' }}>
             {/* Instead of a complex collage we use a placeholder or stylized images. 
                 Using existing patient/doctor images grouped beautifully */}
             <div style={{ position: 'relative', width: '100%', height: '450px', background: 'radial-gradient(circle, rgba(13,82,192,0.05) 0%, rgba(255,255,255,0) 70%)' }}>
                <div style={{ position: 'absolute', top: '5%', left: '20%', width: '180px', height: '180px', borderRadius: '24px', overflow: 'hidden', boxShadow: '0 20px 40px rgba(0,0,0,0.1)', zIndex: 2 }}>
                  <img src="/doctor-priya.png" alt="Doctor" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                <div style={{ position: 'absolute', top: '25%', right: '10%', width: '220px', height: '220px', borderRadius: '24px', overflow: 'hidden', boxShadow: '0 20px 40px rgba(0,0,0,0.1)', zIndex: 3 }}>
                  <img src="/doctor-arjun.png" alt="Doctor" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                <div style={{ position: 'absolute', bottom: '10%', left: '30%', width: '160px', height: '160px', borderRadius: '24px', overflow: 'hidden', boxShadow: '0 20px 40px rgba(0,0,0,0.1)', zIndex: 1 }}>
                  <img src="/doctor-rohan.png" alt="Doctor" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* ── Doctors grid ── */}
      <section className="doc-listing" style={{ padding: '2rem 0 6rem' }}>
        <div className="container" style={{ maxWidth: '1400px' }}>
          
          <div className="doc-listing-header" style={{ textAlign: 'center', marginBottom: '4rem' }}>
             <div style={{ display: 'inline-block', marginBottom: '1rem' }}>
                <div style={{ height: '2px', width: '30px', background: 'var(--orange)', margin: '0 auto 8px' }}></div>
              </div>
            <h2 style={{ fontSize: '2.2rem', color: 'var(--navy)', marginBottom: '0.75rem' }}>Our Specialist Doctors</h2>
            <p style={{ color: 'var(--body)', fontSize: '1rem' }}>Highly qualified doctors dedicated to your health and well-being.</p>
          </div>

          {filtered.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '4rem 0', color: 'var(--muted)' }}>
              <div style={{ fontSize: '0.95rem' }}>No doctors matched <strong>"{search}"</strong></div>
              <button className="btn btn-outline-blue btn-sm" onClick={() => { setSearch(''); setFilter('All'); }} style={{ marginTop: '1rem', borderRadius: '8px' }}>
                Clear filters
              </button>
            </div>
          ) : (
            <div className="doc-cards-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem' }}>
              {filtered.map(doc => (
                <DoctorCard key={doc.id} doc={doc} onProfile={() => goProfile(doc.id)} onBook={goBook} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ── Why Choose Our Doctors ── */}
      <section className="doc-why-section" style={{ padding: '2rem 0 5rem' }}>
        <div className="container" style={{ maxWidth: '1400px', textAlign: 'center' }}>
          <div style={{ display: 'inline-block', marginBottom: '1rem' }}>
             <div style={{ height: '2px', width: '30px', background: 'var(--orange)', margin: '0 auto 8px' }}></div>
          </div>
          <h2 style={{ fontSize: '2.2rem', color: 'var(--navy)', marginBottom: '4rem' }}>
            Why Choose Our Doctors
          </h2>

          <div className="doc-why-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.5rem' }}>
            {[
              { title: 'Experienced Specialists', desc: 'Our doctors bring years of clinical expertise and stay updated with the latest medical advancements.', icon: <UserCheck size={32} /> },
              { title: 'Patient-First Care', desc: 'We prioritize your health and comfort with compassionate, personalized care at every step.', icon: <HeartPulse size={32} /> },
              { title: 'Multispecialty Expertise', desc: 'Access a wide range of specialties under one roof with seamless, coordinated care.', icon: <ShieldCheck size={32} /> },
              { title: 'Easy Appointment Booking', desc: 'Book appointments online in just a few clicks and choose a time that works best for you.', icon: <Calendar size={32} /> },
            ].map((f, i) => (
              <div key={i} style={{ 
                background: '#fff', borderRadius: '16px', padding: '2.5rem 1.5rem', 
                border: '1px solid rgba(0,0,0,0.05)', boxShadow: '0 4px 20px rgba(0,0,0,0.02)',
                display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center',
                transition: 'all 0.3s ease', cursor: 'pointer'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-5px)';
                e.currentTarget.style.boxShadow = '0 12px 30px rgba(13,82,192,0.1)';
                e.currentTarget.style.borderColor = 'rgba(13,82,192,0.15)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.02)';
                e.currentTarget.style.borderColor = 'rgba(0,0,0,0.05)';
              }}>
                <div style={{ color: 'var(--blue)', marginBottom: '1.25rem' }}>
                  {f.icon}
                </div>
                <h4 style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--navy)', marginBottom: '0.75rem' }}>{f.title}</h4>
                <p style={{ fontSize: '0.85rem', color: 'var(--body)', margin: 0, lineHeight: 1.5 }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA Banner ── */}
      <section className="doc-cta" style={{ padding: '2rem 0' }}>
        <div className="container" style={{ maxWidth: '1400px' }}>
          <div className="m-stack m-p-sm m-center" style={{ 
            background: '#fff', borderRadius: '16px', padding: '2.5rem 3rem',
            border: '1px solid rgba(0,0,0,0.05)', boxShadow: '0 10px 40px rgba(0,0,0,0.04)',
            display: 'flex', justifyContent: 'space-between', alignItems: 'center'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
              <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: 'var(--blue-light)', color: 'var(--blue)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Calendar size={28} />
              </div>
              <div>
                <span style={{ color: 'var(--blue)', fontWeight: 800, fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Your Health, Our Priority</span>
                <h3 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--navy)', margin: '0.25rem 0' }}>
                  Book a Consultation Today
                </h3>
                <p style={{ fontSize: '0.95rem', color: 'var(--body)', margin: 0 }}>
                  Take the first step towards better health. Our team is here to help you and your family.
                </p>
              </div>
            </div>
            
            <div className="m-wrap" style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
              <button className="btn btn-orange btn-lg" onClick={goBook} style={{ padding: '0.75rem 1.5rem', fontSize: '0.95rem', borderRadius: '50px' }}>
                <Calendar size={18} /> Book Appointment
              </button>
              <a href={PHONE_HREF} className="btn btn-outline-blue btn-lg" style={{ padding: '0.75rem 1.5rem', fontSize: '0.95rem', textDecoration: 'none', borderRadius: '50px', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Phone size={18} /> Talk to Clinic
              </a>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default OurDoctors;
