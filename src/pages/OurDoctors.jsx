import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Calendar, Phone, ArrowRight, UserCheck, ShieldCheck, HeartPulse, Clock } from 'lucide-react';

import { PRIMARY_PHONE_HREF } from '../config/contact';

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
  {
    id: 'dr-junaid-s-wani',
    image: '/Doctor_junaid-S-Wani.png',
    name: 'Dr Junaid S Wani',
    title: 'Professor & Head, Ophthalmology',
    specialty: 'Ophthalmology',
    dept: 'Ophthalmology',
    qual: 'MS',
    exp: '',
    avail: 'MON, TUE, THU, FRI',
    languages: [],
    bio: `Dr Junaid S Wani is an Ophthalmology specialist consulting at Apollo Clinic Srinagar. He provides specialist consultation for eye-related concerns, vision problems, eye examinations, and ophthalmology care.\n\nHe serves as Professor & Head, Ophthalmology, and is affiliated with GMC Srinagar. Patients can consult him at Apollo Clinic Srinagar on Monday, Tuesday, Thursday, and Friday from 5:00 PM onwards.\n\nPrior registration is mandatory for consultation.`,
    education: [
      'MS',
      'Professor & Head, Ophthalmology',
      'GMC Srinagar'
    ],
    expertise: ['Ophthalmology', 'Eye Care', 'Vision Concerns', 'Eye Examination', 'Eye Infections', 'Specialist Eye Consultation', 'Follow-up Eye Care'],
    specializedCare: [
      { name: 'Eye Consultation', desc: 'Specialist consultation for common and complex eye-related concerns.', icon: 'Activity' },
      { name: 'Vision Problems', desc: 'Evaluation and guidance for blurred vision, reduced vision, and related symptoms.', icon: 'Activity' },
      { name: 'Eye Examination', desc: 'Clinical eye assessment and specialist ophthalmology evaluation.', icon: 'Shield' },
      { name: 'Eye Infections & Irritation', desc: 'Consultation for redness, irritation, watering, discomfort, and infection-related concerns.', icon: 'Virus' },
    ],
    hours: [
      { day: 'Mon, Tue, Thu, Fri', time: '5:00 PM onwards' },
      { day: 'Wed, Sat, Sun', time: 'Not available' },
    ],
    institution: 'GMC Srinagar',
    consultation_days: 'Monday, Tuesday, Thursday & Friday\nFrom 5:00 PM onwards',
    trust_banner: 'Specialist ophthalmology consultation available at Apollo Clinic Srinagar with prior registration.',
    clinic_location: 'Apollo Clinic, Karan Nagar Chowk\nNear Mughal Darbar\nOpposite Medicare Diagnostic Centre\nSrinagar, Jammu & Kashmir',
    clinic_contact: '0194-2488069 / 0194-4068095',
    clinic_email: 'cypherhealthservicespvtltd@gmail.com',
  },
  {
    id: 'dr-adil-bashir-shah',
    image: '/Doctor-Adil-Bashir-Shah.png',
    name: 'Dr. Adil Bashir Shah',
    title: 'Consultant Orthopaedic Surgeon',
    specialty: 'Orthopaedics',
    dept: 'Orthopaedics',
    qual: 'MBBS, MS Orthopaedics, MRCS, FRCS (Tr & Orth)',
    qual_short: 'MBBS, MS Orthopaedics',
    exp: '',
    avail: 'MON - SAT',
    languages: [],
    bio: `Dr. Adil Bashir Shah is a Consultant Orthopaedic Surgeon consulting at Apollo Clinic Srinagar. He provides specialist orthopaedic consultation for bone, joint, trauma, arthroplasty, and musculoskeletal conditions.\n\nHe has advanced training in primary and revision joint arthroplasty, general and major trauma, musculoskeletal oncology, complex arthroplasty, and limb salvage surgery. His training includes experience from GMC Srinagar, Edinburgh UK, Birmingham UK, Liverpool UK, and Max Hospital for Cancer Care, Delhi.\n\nPatients can consult him at Apollo Clinic Srinagar from Monday to Saturday, 4:00 PM onwards.`,
    education: [
      'MBBS',
      'MS Orthopaedics, GMC Srinagar',
      'MRCS, Edinburgh UK',
      'FRCS (Tr & Orth), Edinburgh UK',
      'Fellowship training in primary and revision joint arthroplasty',
      'Fellowship training in general and major trauma',
      'Fellowship training in musculoskeletal oncology, complex arthroplasty, and limb salvage surgery'
    ],
    expertise: [
      'Orthopaedics', 'Joint Replacement', 'Trauma Care', 'Revision Arthroplasty', 'Fracture Care', 'Musculoskeletal Oncology', 'Limb Salvage Surgery', 'Joint Reconstruction', 'Complex Arthroplasty', 'Bone & Joint Care'
    ],
    specializedCare: [
      { name: 'Joint Arthroplasty', desc: 'Consultation for primary and revision joint replacement-related concerns.', icon: 'Activity' },
      { name: 'Trauma & Fracture Care', desc: 'Specialist orthopaedic consultation for general trauma, major trauma, and fracture-related conditions.', icon: 'Shield' },
      { name: 'Musculoskeletal Oncology', desc: 'Specialist guidance for bone and soft tissue tumour-related orthopaedic concerns.', icon: 'Heart' },
      { name: 'Limb Salvage & Reconstruction', desc: 'Consultation for complex limb reconstruction, joint reconstruction, and limb salvage-related cases.', icon: 'Virus' },
    ],
    hours: [
      { day: 'Mon – Sat', time: '4:00 PM onwards' },
      { day: 'Sunday', time: 'Closed' },
    ],
    advanced_credentials: 'MRCS, Edinburgh UK\nFRCS (Tr & Orth), Edinburgh UK',
    consultation_days: 'Monday to Saturday\n4:00 PM onwards',
    trust_banner: 'Specialist orthopaedic consultation available at Apollo Clinic Srinagar.',
    clinic_location: 'Apollo Clinic, Karan Nagar Chowk\nNear Mughal Darbar\nOpposite Medicare Diagnostic Centre\nSrinagar, Jammu & Kashmir',
    clinic_contact: '0194-2488069 / 0194-4068095',
    clinic_email: 'cypherhealthservicespvtltd@gmail.com',
  },
  {
    id: 'dr-ahmad-javaid',
    image: '/Doctor-Ahmad-Javid.png',
    name: 'Dr. Ahmad Javaid',
    title: 'Physical Therapy & Manual Therapy Specialist',
    specialty: 'Physiotherapy',
    dept: 'Physiotherapy',
    qual: 'P.T., M.T.',
    qual_short: 'Physical Therapy (P.T.)\nManual Therapy (M.T.)',
    exp: '',
    avail: 'MON-THU, SAT-SUN',
    languages: [],
    bio: `Dr. Ahmad Javaid provides physiotherapy and manual therapy consultation at Apollo Clinic Srinagar. His work includes physical therapy, manual therapy, spinal and soft tissue manipulations, adjustments, ergonomics guidance, and nutritional balancing support.\n\nHe is available for consultation on Monday, Tuesday, Wednesday, Thursday, Saturday, and Sunday from 11:30 AM to 6:00 PM.`,
    education: [
      'Physical Therapy (P.T.)',
      'Manual Therapy (M.T.)',
      'Ergonomics, Sweden',
      'Nutritional Balancing',
      'HTMA, USA'
    ],
    expertise: [
      'Physiotherapy', 'Manual Therapy', 'Spine Care', 'Physical Therapy', 'Spinal Manipulations', 'Soft Tissue Manipulations', 'Adjustments', 'Ergonomics', 'Posture Care', 'Mobility Improvement', 'Nutritional Balancing', 'HTMA'
    ],
    specializedCare: [
      { name: 'Physical Therapy', desc: 'Therapy support for pain relief, mobility improvement, movement correction, and rehabilitation needs.', icon: 'Activity' },
      { name: 'Manual Therapy', desc: 'Hands-on therapy approach for musculoskeletal discomfort, stiffness, and movement-related concerns.', icon: 'Shield' },
      { name: 'Spine & Soft Tissue Care', desc: 'Consultation for spinal, soft tissue, posture, and movement-related issues.', icon: 'Heart' },
      { name: 'Ergonomics & Adjustments', desc: 'Guidance for posture, workplace ergonomics, body mechanics, and corrective adjustments.', icon: 'Virus' },
    ],
    hours: [
      { day: 'Mon-Thu, Sat-Sun', time: '11:30 AM to 6:00 PM' },
      { day: 'Friday', time: 'Closed' },
    ],
    advanced_training: 'Ergonomics, Sweden\nNutritional Balancing / HTMA, USA',
    consultation_days: 'Monday, Tuesday, Wednesday, Thursday, Saturday & Sunday\n11:30 AM to 6:00 PM',
    trust_banner: 'Physiotherapy and manual therapy consultation available at Apollo Clinic Srinagar.',
    clinic_location: 'Apollo Clinic, Karan Nagar Chowk\nNear Mughal Darbar\nOpposite Medicare Diagnostic Centre\nSrinagar, Jammu & Kashmir',
    clinic_contact: '0194-2488069 / 0194-4068095',
    clinic_email: 'cypherhealthservicespvtltd@gmail.com',
  },
  {
    id: 'dr-ajaz-ahmad-khan',
    image: '/Doctor-Ajaz-Ahmad-Khan.png',
    name: 'Dr. Ajaz Ahmad Khan',
    title: 'Senior Consultant Clinical and Child Psychologist',
    specialty: 'Clinical Psychology',
    dept: 'Psychology',
    qual: 'Ph.D, M.Phil – Clinical Psychology',
    qual_short: 'Ph.D\nM.Phil – Clinical Psychology',
    exp: '',
    avail: 'TUE - WED',
    languages: [],
    bio: `Dr. Ajaz Ahmad Khan is a Clinical Psychologist consulting at Apollo Clinic Srinagar. He is an RCI Licensed Clinical Psychologist and serves as Senior Consultant Clinical and Child Psychologist.\n\nHe provides consultation for clinical psychology and child psychology-related concerns. Patients can consult him at Apollo Clinic Srinagar on Tuesday and Wednesday from 4:00 PM to 6:00 PM.`,
    education: [
      'Ph.D',
      'M.Phil – Clinical Psychology',
      'PGIBAMS',
      'RCI Licensed Clinical Psychologist',
      'Senior Consultant Clinical and Child Psychologist'
    ],
    expertise: [
      'Clinical Psychology', 'Child Psychology', 'RCI Licensed', 'Mental Wellness', 'Emotional Health', 'Stress Management', 'Anxiety Support', 'Behavioral Concerns', 'Psychological Guidance', 'RCI Licensed Clinical Psychologist'
    ],
    specializedCare: [
      { name: 'Clinical Psychology Consultation', desc: 'Professional consultation for emotional, behavioral, and psychological concerns.', icon: 'Activity' },
      { name: 'Child Psychology', desc: 'Specialist support for child behavior, emotional concerns, development-related issues, and family guidance.', icon: 'Shield' },
      { name: 'Stress & Emotional Health', desc: 'Guidance for stress, anxiety, mood concerns, and emotional well-being.', icon: 'Heart' },
      { name: 'Psychological Assessment & Guidance', desc: 'Clinical guidance and assessment support based on the patient’s concern and consultation needs.', icon: 'Virus' },
    ],
    hours: [
      { day: 'Tuesday & Wednesday', time: '4:00 PM to 6:00 PM' },
      { day: 'Mon, Thu, Fri, Sat, Sun', time: 'Closed' },
    ],
    license: 'RCI Licensed Clinical Psychologist',
    institution: 'PGIBAMS',
    consultation_days: 'Tuesday & Wednesday\n4:00 PM to 6:00 PM',
    trust_banner: 'Clinical and child psychology consultation available at Apollo Clinic Srinagar.',
    clinic_location: 'Apollo Clinic, Karan Nagar Chowk\nNear Mughal Darbar\nOpposite Medicare Diagnostic Centre\nSrinagar, Jammu & Kashmir',
    clinic_contact: '0194-2488069 / 0194-4068095',
    clinic_email: 'cypherhealthservicespvtltd@gmail.com',
  },
  {
    id: 'prof-dr-arshad-farooq',
    image: '/Doctor-Arshad-Farooq.png',
    name: 'Prof. Dr. Arshad Farooq',
    title: 'Child Specialist',
    specialty: 'Paediatrics',
    dept: 'Paediatrics',
    qual: 'MBBS, M.D. Pediatrics',
    qual_short: 'MBBS\nM.D. Pediatrics',
    exp: '',
    avail: 'DAILY',
    languages: [],
    bio: `Prof. Dr. Arshad Farooq is a Child Specialist consulting at Apollo Clinic Srinagar. He provides paediatric consultation for infants, children, and adolescents, including general child health concerns, routine checkups, fever, infections, growth-related concerns, and child healthcare guidance.\n\nPatients can consult him at Apollo Clinic Srinagar from Monday to Saturday and on Sunday, between 10:30 AM and 2:00 PM.`,
    education: [
      'MBBS',
      'M.D. Pediatrics',
      'Child Specialist'
    ],
    expertise: [
      'Paediatrics', 'Child Specialist', 'Child Healthcare', 'Fever & Infections', 'Growth Monitoring', 'Child Wellness', 'Preventive Child Care', 'Paediatric Consultation', 'Routine Child Checkups'
    ],
    specializedCare: [
      { name: 'Child Health Consultation', desc: 'Consultation for general child health concerns, routine illnesses, and paediatric care needs.', icon: 'Activity' },
      { name: 'Fever & Infections', desc: 'Paediatric consultation for fever, infections, cough, cold, and common childhood illnesses.', icon: 'Shield' },
      { name: 'Growth & Development', desc: 'Guidance for growth monitoring, developmental concerns, nutrition, and child wellness.', icon: 'Heart' },
      { name: 'Preventive Child Care', desc: 'Support for routine checkups, preventive guidance, and child healthcare planning.', icon: 'Virus' },
    ],
    hours: [
      { day: 'Monday to Saturday', time: '10:30 AM to 2:00 PM' },
      { day: 'Sunday', time: '10:30 AM to 2:00 PM' },
    ],
    consultation_days: 'Monday to Saturday: 10:30 AM to 2:00 PM\nSunday: 10:30 AM to 2:00 PM',
    trust_banner: 'Paediatric and child specialist consultation available at Apollo Clinic Srinagar.',
    clinic_location: 'Apollo Clinic, Karan Nagar Chowk\nNear Mughal Darbar\nOpposite Medicare Diagnostic Centre\nSrinagar, Jammu & Kashmir',
    clinic_contact: '0194-2488069 / 0194-4068095',
    clinic_email: 'cypherhealthservicespvtltd@gmail.com',
  },
  {
    id: 'dr-faisal-arshad',
    image: '/Doctor-Faisal_Arshad.png',
    name: 'Dr. Faisal Arshad',
    title: 'Assistant Professor',
    specialty: 'Orthodontics',
    dept: 'Dentistry',
    qual: 'BDS, MDS, PhD',
    qual_short: 'BDS\nMDS\nPhD',
    exp: '',
    avail: 'MON-SUN',
    languages: [],
    bio: `Dr. Faisal Arshad is an Orthodontics specialist consulting at Apollo Clinic Srinagar. He provides specialist consultation for dental braces, aligners, orthodontic correction, and dentofacial orthopaedic concerns.\n\nHe is an Assistant Professor at Govt. Dental College and Hospital, Srinagar, with qualifications including BDS, MDS, PhD, and specialization in Orthodontics & Dentofacial Orthopaedics.\n\nPatients can consult him at Apollo Clinic Srinagar from Monday to Friday between 4:30 PM and 7:00 PM, on Saturday from 1:30 PM to 7:00 PM, and on Sunday from 10:30 AM to 2:00 PM.`,
    education: [
      'BDS',
      'MDS',
      'PhD',
      'Orthodontics & Dentofacial Orthopaedics',
      'Assistant Professor',
      'Govt. Dental College and Hospital, Srinagar',
      'Dental Braces & Aligner Specialist'
    ],
    expertise: [
      'Orthodontics', 'Dental Braces', 'Aligners', 'Dentistry', 'Clear Aligners', 'Teeth Alignment', 'Bite Correction', 'Dentofacial Orthopaedics', 'Orthodontic Consultation', 'Smile Alignment', 'Braces Specialist'
    ],
    specializedCare: [
      { name: 'Dental Braces', desc: 'Specialist consultation for orthodontic braces and teeth alignment-related concerns.', icon: 'Activity' },
      { name: 'Clear Aligners', desc: 'Consultation for aligner-based orthodontic correction and smile alignment planning.', icon: 'Shield' },
      { name: 'Orthodontic Consultation', desc: 'Evaluation of teeth alignment, bite concerns, spacing, crowding, and jaw-related orthodontic issues.', icon: 'Heart' },
      { name: 'Dentofacial Orthopaedics', desc: 'Specialist guidance for dentofacial growth, jaw alignment, and orthodontic correction planning.', icon: 'Virus' },
    ],
    hours: [
      { day: 'Mon to Fri', time: '4:30 PM to 7:00 PM' },
      { day: 'Saturday', time: '1:30 PM to 7:00 PM' },
      { day: 'Sunday', time: '10:30 AM to 2:00 PM' },
    ],
    specialization: 'Orthodontics & Dentofacial Orthopaedics',
    institution: 'Govt. Dental College and Hospital, Srinagar',
    consultation_days: 'Mon-Fri: 4:30 PM to 7:00 PM\nSat: 1:30 PM to 7:00 PM\nSun: 10:30 AM to 2:00 PM',
    trust_banner: 'Orthodontic braces and aligner consultation available at Apollo Clinic Srinagar.',
    clinic_location: 'Apollo Clinic, Karan Nagar Chowk\nNear Mughal Darbar\nOpposite Medicare Diagnostic Centre\nSrinagar, Jammu & Kashmir',
    clinic_contact: '0194-2488069 / 0194-4068095',
    clinic_email: 'cypherhealthservicespvtltd@gmail.com',
  },
  {
    id: 'dr-feroze-ahmad',
    image: '/Doctor-Feroze-Ahmad.png',
    name: 'Dr. Feroze Ahmad',
    title: 'Physician',
    specialty: 'Physician / Internal Medicine',
    dept: 'General Medicine',
    qual: 'MBBS, MD Medicine',
    qual_short: 'MBBS, GMC Srinagar\nMD Medicine, SKIMS',
    exp: '',
    avail: 'MON-WED, FRI',
    languages: [],
    bio: `Dr. Feroze Ahmad is a Physician and Internal Medicine specialist consulting at Apollo Clinic Srinagar. He provides consultation for general medical concerns, fever, infections, chronic illness management, blood pressure, diabetes-related concerns, and internal medicine evaluation.\n\nHe holds MBBS from GMC Srinagar and MD Medicine from SKIMS. Patients can consult him at Apollo Clinic Srinagar on Monday, Tuesday, Wednesday, and Friday from 8:00 AM to 10:00 AM.`,
    education: [
      'MBBS, GMC Srinagar',
      'MD Medicine, SKIMS',
      'Physician / Internal Medicine'
    ],
    expertise: [
      'Internal Medicine', 'General Medicine', 'Physician', 'Fever & Infections', 'Diabetes Care', 'Hypertension', 'Preventive Healthcare', 'Chronic Disease Management', 'Adult Health Consultation', 'Routine Medical Checkups'
    ],
    specializedCare: [
      { name: 'General Medicine', desc: 'Consultation for common illnesses, fever, weakness, infections, and general health concerns.', icon: 'Activity' },
      { name: 'Internal Medicine', desc: 'Medical evaluation and management of adult health concerns and internal medical conditions.', icon: 'Shield' },
      { name: 'Diabetes & Blood Pressure Care', desc: 'Consultation for diabetes, hypertension, and related lifestyle or chronic health concerns.', icon: 'Heart' },
      { name: 'Preventive Health Consultation', desc: 'Guidance for early detection, routine checkups, and preventive healthcare planning.', icon: 'Virus' },
    ],
    hours: [
      { day: 'Mon, Tue, Wed, Fri', time: '8:00 AM to 10:00 AM' },
      { day: 'Thu, Sat, Sun', time: 'Closed' },
    ],
    consultation_days: 'Monday, Tuesday, Wednesday & Friday\n8:00 AM to 10:00 AM',
    trust_banner: 'Physician and internal medicine consultation available at Apollo Clinic Srinagar.',
    clinic_location: 'Apollo Clinic, Karan Nagar Chowk\nNear Mughal Darbar\nOpposite Medicare Diagnostic Centre\nSrinagar, Jammu & Kashmir',
    clinic_contact: '0194-2488069 / 0194-4068095',
    clinic_email: 'cypherhealthservicespvtltd@gmail.com',
  },
  {
    id: 'dr-gowhar-ahmad-kozgar',
    image: '/Doctor-Gowhar-Ahmad-Kozgar.png',
    name: 'Dr. Gowhar Ahmad Kozgar',
    title: 'Senior Consultant Ophthalmologist',
    specialty: 'Ophthalmology',
    dept: 'Eye Care',
    qual: 'MBBS, MS Ophthalmology',
    qual_short: 'MBBS\nMS Ophthalmology',
    exp: '',
    avail: 'MON, WED, SAT',
    languages: [],
    bio: `Dr. Gowhar Ahmad Kozgar is a Senior Consultant Ophthalmologist and Senior Eye Specialist consulting at Apollo Clinic Srinagar. He provides specialist consultation for eye-related concerns, vision problems, eye examinations, and ophthalmology care.\n\nHe holds MBBS and MS Ophthalmology qualifications and has fellowship training in Paediatric Ophthalmology. Patients can consult him at Apollo Clinic Srinagar on Monday, Wednesday, and Saturday from 2:00 PM to 6:00 PM.`,
    education: [
      'MBBS',
      'MS Ophthalmology',
      'Fellowship in Paediatric Ophthalmology',
      'Senior Eye Specialist',
      'Senior Consultant Ophthalmologist'
    ],
    expertise: [
      'Ophthalmology', 'Eye Specialist', 'Paediatric Ophthalmology', 'Senior Eye Consultation', 'Vision Concerns', 'Eye Examination', 'Eye Care', 'Specialist Eye Consultation', 'Follow-up Eye Care'
    ],
    specializedCare: [
      { name: 'Eye Consultation', desc: 'Specialist consultation for eye-related concerns, discomfort, irritation, and vision-related symptoms.', icon: 'Activity' },
      { name: 'Vision Problems', desc: 'Evaluation and guidance for blurred vision, reduced vision, and related eye concerns.', icon: 'Shield' },
      { name: 'Paediatric Ophthalmology', desc: 'Specialist eye consultation for children and paediatric vision-related concerns.', icon: 'Heart' },
      { name: 'Eye Examination', desc: 'Clinical eye assessment and specialist ophthalmology evaluation.', icon: 'Virus' },
    ],
    hours: [
      { day: 'Mon, Wed, Sat', time: '2:00 PM to 6:00 PM' },
      { day: 'Tue, Thu, Fri, Sun', time: 'Closed' },
    ],
    fellowship: 'Fellowship in Paediatric Ophthalmology',
    consultation_days: 'Monday, Wednesday & Saturday\n2:00 PM to 6:00 PM',
    trust_banner: 'Senior ophthalmology and eye specialist consultation available at Apollo Clinic Srinagar.',
    clinic_location: 'Apollo Clinic, Karan Nagar Chowk\nNear Mughal Darbar\nOpposite Medicare Diagnostic Centre\nSrinagar, Jammu & Kashmir',
    clinic_contact: '0194-2488069 / 0194-4068095',
    clinic_email: 'cypherhealthservicespvtltd@gmail.com',
  },
  {
    id: 'doctor-khalil-m-baba',
    image: '/Doctor-Khalil-M-Baba.png',
    name: 'Doctor Khalil M. Baba',
    title: 'Professor and Head of Dept. (Pathology), SKIMS Srinagar',
    specialty: 'Pathology',
    dept: 'Pathology',
    qual: 'MD Pathology',
    qual_short: 'MD Pathology',
    exp: '',
    avail: 'TO BE CONFIRMED',
    languages: [],
    bio: `Doctor Khalil M. Baba is a Pathology specialist associated with Apollo Clinic Srinagar. He holds MD Pathology and serves as Professor and Head of Dept. (Pathology) at SKIMS Srinagar.\n\nHe provides specialist pathology-related consultation and diagnostic guidance. Consultation schedule is currently to be confirmed, and patients are advised to contact Apollo Clinic Srinagar for availability.`,
    education: [
      'MD Pathology',
      'Professor and Head of Dept. (Pathology)',
      'SKIMS Srinagar'
    ],
    expertise: [
      'Pathology', 'Laboratory Medicine', 'Diagnostic Guidance', 'Report Interpretation', 'Clinical Pathology', 'Diagnostic Consultation', 'Lab Investigation Review', 'Medical Diagnostics'
    ],
    specializedCare: [
      { name: 'Pathology Consultation', desc: 'Specialist consultation for pathology-related diagnostic guidance and report interpretation.', icon: 'Activity' },
      { name: 'Laboratory Medicine', desc: 'Guidance related to laboratory investigations, diagnostic testing, and clinical correlation.', icon: 'Shield' },
      { name: 'Diagnostic Report Review', desc: 'Review and interpretation support for pathology and lab-based reports.', icon: 'Heart' },
      { name: 'Clinical Diagnostic Guidance', desc: 'Specialist input for diagnostic evaluation in coordination with clinical findings.', icon: 'Virus' },
    ],
    hours: [
      { day: 'Schedule', time: 'To be confirmed' },
      { day: 'Contact', time: 'Clinic for availability' },
    ],
    institution: 'SKIMS Srinagar',
    consultation_days: 'Schedule to be confirmed\nContact clinic for availability',
    trust_banner: 'Pathology consultation available at Apollo Clinic Srinagar. Please contact the clinic for schedule confirmation.',
    clinic_location: 'Apollo Clinic, Karan Nagar Chowk\nNear Mughal Darbar\nOpposite Medicare Diagnostic Centre\nSrinagar, Jammu & Kashmir',
    clinic_contact: '0194-2488069 / 0194-4068095',
    clinic_email: 'cypherhealthservicespvtltd@gmail.com',
  },
  {
    id: 'dr-masood-ahmed-laharwal',
    image: '/Doctor-Masood-Ahmed-Laharwal.png',
    name: 'Dr. Masood Ahmed Laharwal',
    title: 'Neurosurgery Specialist',
    specialty: 'Neurosurgery',
    dept: 'Neuro Surgery',
    qual: 'MBBS, MS, MCh Neurosurgery',
    qual_short: 'MBBS\nMS\nMCh Neurosurgery',
    exp: '',
    avail: 'MON - SAT',
    languages: [],
    bio: `Dr. Masood Ahmed Laharwal is a Neurosurgery specialist consulting at Apollo Clinic Srinagar. He holds MBBS, MS, and MCh Neurosurgery qualifications and has served as Ex Consultant Neurosurgery at SKIMS and Ex Senior Consultant at Paras Health Care Srinagar.\n\nHe provides specialist neurosurgery consultation for brain, spine, nerve-related concerns, neurological symptoms, headaches, back and neck pain, and surgical opinion where required. Patients can consult him at Apollo Clinic Srinagar from Monday to Saturday, 3:30 PM to 6:00 PM.`,
    education: [
      'MBBS',
      'MS',
      'MCh Neurosurgery',
      'Ex Consultant Neurosurgery, SKIMS',
      'Ex Senior Consultant, Paras Health Care Srinagar'
    ],
    expertise: [
      'Neurosurgery', 'Brain & Spine', 'Neuro Consultation', 'Spine Care', 'Nerve-Related Concerns', 'Headache Evaluation', 'Back Pain', 'Neck Pain', 'Surgical Opinion', 'Neurological Symptoms'
    ],
    specializedCare: [
      { name: 'Neurosurgery Consultation', desc: 'Specialist consultation for brain, spine, and nerve-related concerns requiring neurosurgical evaluation.', icon: 'Activity' },
      { name: 'Brain & Nerve Concerns', desc: 'Evaluation and guidance for neurological symptoms, headaches, nerve-related complaints, and specialist opinion.', icon: 'Shield' },
      { name: 'Spine Consultation', desc: 'Consultation for back pain, neck pain, spine-related symptoms, and neurosurgical assessment.', icon: 'Heart' },
      { name: 'Surgical Opinion', desc: 'Specialist neurosurgery opinion for cases requiring further evaluation, follow-up, or surgical guidance.', icon: 'Virus' },
    ],
    hours: [
      { day: 'Mon - Sat', time: '3:30 PM to 6:00 PM' },
      { day: 'Sunday', time: 'Closed' },
    ],
    previous_experience: 'Ex Consultant Neurosurgery, SKIMS\nEx Senior Consultant, Paras Health Care Srinagar',
    consultation_days: 'Monday to Saturday\n3:30 PM to 6:00 PM',
    trust_banner: 'Neurosurgery consultation available at Apollo Clinic Srinagar.',
    clinic_location: 'Apollo Clinic, Karan Nagar Chowk\nNear Mughal Darbar\nOpposite Medicare Diagnostic Centre\nSrinagar, Jammu & Kashmir',
    clinic_contact: '0194-2488069 / 0194-4068095',
    clinic_email: 'cypherhealthservicespvtltd@gmail.com',
  },
  {
    id: 'dr-mukhtiar-wani',
    image: '/Doctor-Mukhtiar-Wani.png',
    name: 'Dr. Mukhtiar Wani',
    title: 'General Physician',
    specialty: 'General Physician',
    dept: 'Medicine',
    qual: 'MBBS, MD Medicine',
    qual_short: 'MBBS\nMD Medicine',
    exp: '',
    avail: 'MON - SAT',
    languages: [],
    bio: `Dr. Mukhtiar Wani is a General Physician consulting at Apollo Clinic Srinagar. He holds MBBS and MD Medicine qualifications and provides consultation for general medical concerns, fever, infections, weakness, blood pressure, diabetes-related concerns, chronic illness management, and preventive healthcare guidance.\n\nPatients can consult him at Apollo Clinic Srinagar from Monday to Saturday between 11:30 AM and 2:00 PM, with evening consultation available on Monday, Wednesday, and Friday from 4:00 PM to 5:30 PM.`,
    education: [
      'MBBS',
      'MD Medicine',
      'General Physician'
    ],
    expertise: [
      'General Physician', 'General Medicine', 'Internal Medicine', 'Fever & Infections', 'Diabetes Care', 'Hypertension', 'Preventive Healthcare', 'Chronic Disease Management', 'Adult Health Consultation', 'Routine Medical Checkups'
    ],
    specializedCare: [
      { name: 'General Medical Consultation', desc: 'Consultation for common illnesses, fever, weakness, infections, and general health concerns.', icon: 'Activity' },
      { name: 'Internal Medicine', desc: 'Medical evaluation and management of adult health concerns and internal medical conditions.', icon: 'Shield' },
      { name: 'Diabetes & Blood Pressure Care', desc: 'Consultation for diabetes, hypertension, and related lifestyle or chronic health concerns.', icon: 'Heart' },
      { name: 'Preventive Health Guidance', desc: 'Guidance for routine checkups, early detection, and preventive healthcare planning.', icon: 'Virus' },
    ],
    hours: [
      { day: 'Mon - Sat', time: '11:30 AM to 2:00 PM' },
      { day: 'Mon, Wed, Fri', time: '4:00 PM to 5:30 PM' },
    ],
    consultation_days: 'Monday to Saturday: 11:30 AM to 2:00 PM\nMonday, Wednesday & Friday: 4:00 PM to 5:30 PM',
    trust_banner: 'General physician consultation available at Apollo Clinic Srinagar.',
    clinic_location: 'Apollo Clinic, Karan Nagar Chowk\nNear Mughal Darbar\nOpposite Medicare Diagnostic Centre\nSrinagar, Jammu & Kashmir',
    clinic_contact: '0194-2488069 / 0194-4068095',
    clinic_email: 'cypherhealthservicespvtltd@gmail.com',
  },
  {
    id: 'prof-dr-nazir-ahmad-lone',
    image: '/Doctor-Nazir-Ahmad-Lone.png',
    name: 'Prof. Dr. Nazir Ahmad Lone',
    title: 'Senior Interventional Cardiologist',
    specialty: 'Cardiology',
    dept: 'Cardiology',
    qual: 'MD Medicine, DM Cardiology',
    qual_short: 'MD Medicine\nDM Cardiology',
    exp: '',
    avail: 'MON - SAT',
    languages: [],
    bio: `Prof. Dr. Nazir Ahmad Lone is a Senior Interventional Cardiologist consulting at Apollo Clinic Srinagar. He holds MD Medicine and DM Cardiology qualifications and provides specialist consultation for heart-related concerns, cardiac evaluation, blood pressure, chest discomfort, rhythm-related concerns, and preventive cardiac care.\n\nPatients can consult him at Apollo Clinic Srinagar from Monday to Saturday between 10:00 AM and 5:30 PM.`,
    education: [
      'MD Medicine',
      'DM Cardiology',
      'Senior Interventional Cardiologist'
    ],
    expertise: [
      'Cardiology', 'Interventional Cardiology', 'Heart Care', 'Cardiac Consultation', 'Blood Pressure', 'Chest Discomfort', 'ECG Review', 'Echo Review', 'Preventive Cardiology', 'Cardiac Risk Assessment'
    ],
    specializedCare: [
      { name: 'Cardiology Consultation', desc: 'Specialist consultation for heart-related symptoms, cardiac concerns, and preventive heart care.', icon: 'Activity' },
      { name: 'Interventional Cardiology', desc: 'Specialist cardiac guidance for patients requiring interventional cardiology evaluation and opinion.', icon: 'Shield' },
      { name: 'Blood Pressure & Heart Risk', desc: 'Consultation for hypertension, cardiac risk assessment, and lifestyle-related heart health concerns.', icon: 'Heart' },
      { name: 'ECG / Echo Review', desc: 'Cardiology consultation and guidance for ECG, Echo, rhythm-related concerns, and cardiac investigation review.', icon: 'Virus' },
    ],
    hours: [
      { day: 'Mon - Sat', time: '10:00 AM to 5:30 PM' },
      { day: 'Sunday', time: 'Closed' },
    ],
    consultation_days: 'Monday to Saturday\n10:00 AM to 5:30 PM',
    trust_banner: 'Senior interventional cardiology consultation available at Apollo Clinic Srinagar.',
    clinic_location: 'Apollo Clinic, Karan Nagar Chowk\nNear Mughal Darbar\nOpposite Medicare Diagnostic Centre\nSrinagar, Jammu & Kashmir',
    clinic_contact: '0194-2488069 / 0194-4068095',
    clinic_email: 'cypherhealthservicespvtltd@gmail.com',
  },
  {
    id: 'dt-qurat-ul-aan',
    image: '/Doctor-Qurat-UL-Aan.png',
    name: 'Dt. Qurat-Ul-Aan',
    title: 'Consultant Dietitian',
    specialty: 'Dietitian / Nutrition',
    dept: 'Dietetics & Nutrition',
    qual: 'P.G. Dietetics & Food Service Management',
    qual_short: 'P.G. Dietetics & Food Service Management\nCertified in Food and Nutrition Care',
    exp: '',
    avail: 'MON - WED',
    languages: [],
    bio: `Dt. Qurat-Ul-Aan is a Consultant Dietitian specializing in lifestyle diseases management at Apollo Clinic Srinagar. She provides nutrition consultation for diabetes, fatty liver disease, PCOS, PCOD, osteoporosis, onco nutrition, gut nutrition, women’s health, juvenile obesity, and maternal nutrition.\n\nShe holds P.G. Dietetics & Food Service Management credentials, is certified in Food and Nutrition Care, and has professional experience across Health & Nutrition consulting, clinical dietetics, and lifestyle nutrition care.\n\nPatients can consult her at Apollo Clinic Srinagar on Monday, Tuesday, and Wednesday from 11:00 AM to 3:00 PM.`,
    education: [
      'P.G. Dietetics & Food Service Management',
      'MIDA',
      'MIPHA',
      'Certified in Food and Nutrition Care',
      'Consultant Dietitian',
      'Lifestyle Diseases Management',
      'Former State Consultant, Health & Nutrition, Leh, UT Ladakh, Ministry of Women and Child Development',
      'Ex Senior Consultant Dietitian, HealthifyMe, Bengaluru',
      'Ex Senior Consultant Dietitian, Fitelo, Chandigarh',
      'Ex Clinical Dietitian, Mother Care Clinic, Srinagar',
      'Ex Clinical Dietitian, Modern Hospital, Srinagar'
    ],
    expertise: [
      'Dietitian', 'Nutrition Care', 'Lifestyle Diseases Management', 'Diabetes Management', 'Fatty Liver Disease', 'PCOS', 'PCOD', 'Osteoporosis', 'Onco Nutrition', 'Gut Nutrition', 'Women’s Health', 'Juvenile Obesity', 'Maternal Nutrition', 'Food and Nutrition Care'
    ],
    specializedCare: [
      { name: 'Diabetes Nutrition', desc: 'Nutrition consultation for diabetes management, blood sugar control, and lifestyle-based dietary guidance.', icon: 'Activity' },
      { name: 'PCOS, PCOD & Women’s Health', desc: 'Diet and lifestyle guidance for PCOS, PCOD, women’s health, and hormonal wellness concerns.', icon: 'Shield' },
      { name: 'Fatty Liver & Gut Nutrition', desc: 'Nutrition support for fatty liver disease, digestive health, gut nutrition, and lifestyle improvement.', icon: 'Heart' },
      { name: 'Maternal & Child Nutrition', desc: 'Guidance for maternal nutrition, juvenile obesity, child nutrition, and healthy diet planning.', icon: 'Virus' },
    ],
    hours: [
      { day: 'Mon, Tue, Wed', time: '11:00 AM to 3:00 PM' },
      { day: 'Thu, Fri, Sat, Sun', time: 'Closed' },
    ],
    consultation_days: 'Monday, Tuesday & Wednesday\n11:00 AM to 3:00 PM',
    trust_banner: 'Dietitian and lifestyle disease nutrition consultation available at Apollo Clinic Srinagar.',
    clinic_location: 'Apollo Clinic, Karan Nagar Chowk\nNear Mughal Darbar\nOpposite Medicare Diagnostic Centre\nSrinagar, Jammu & Kashmir',
    clinic_contact: '0194-2488069 / 0194-4068095',
    clinic_email: 'cypherhealthservicespvtltd@gmail.com',
    credentials: 'MIDA\nMIPHA',
    focus: 'Lifestyle Diseases Management'
  },
  {
    id: 'dr-shabeer-koul',
    image: '/Doctor-Shabeer-Koul.png',
    name: 'Dr. Shabeer Koul',
    title: 'ENT Head & Neck Surgeon',
    specialty: 'ENT',
    dept: 'Ear, Nose & Throat',
    qual: 'MBBS, MS',
    qual_short: 'MBBS\nMS',
    exp: '',
    avail: 'MON - THU',
    languages: [],
    bio: `Dr. Shabeer Koul is an ENT Head & Neck Surgeon consulting at Apollo Clinic Srinagar. He provides specialist consultation for ear, nose, throat, sinus, hearing, voice, tonsil, and head and neck-related concerns.\n\nHe holds MBBS and MS qualifications. Patients can consult him at Apollo Clinic Srinagar on Monday, Tuesday, Wednesday, and Thursday from 9:00 AM to 10:00 AM.`,
    education: [
      'MBBS',
      'MS',
      'ENT Head & Neck Surgeon'
    ],
    expertise: [
      'ENT', 'Ear, Nose & Throat', 'Head & Neck Surgery', 'Sinus Problems', 'Hearing Concerns', 'Ear Infections', 'Throat Problems', 'Tonsil Concerns', 'Voice Issues', 'Nasal Allergy'
    ],
    specializedCare: [
      { name: 'ENT Consultation', desc: 'Specialist consultation for ear, nose, throat, sinus, and related ENT concerns.', icon: 'Activity' },
      { name: 'Ear & Hearing Concerns', desc: 'Evaluation and guidance for ear pain, hearing problems, ear infections, and related symptoms.', icon: 'Shield' },
      { name: 'Nose & Sinus Care', desc: 'Consultation for sinus issues, nasal blockage, allergies, and nose-related concerns.', icon: 'Heart' },
      { name: 'Throat & Head-Neck Concerns', desc: 'Specialist guidance for throat infections, tonsil concerns, voice issues, and head and neck-related symptoms.', icon: 'Virus' },
    ],
    hours: [
      { day: 'Mon - Thu', time: '9:00 AM to 10:00 AM' },
      { day: 'Fri, Sat, Sun', time: 'Closed' },
    ],
    consultation_days: 'Monday, Tuesday, Wednesday & Thursday\n9:00 AM to 10:00 AM',
    trust_banner: 'ENT and head & neck surgery consultation available at Apollo Clinic Srinagar.',
    clinic_location: 'Apollo Clinic, Karan Nagar Chowk\nNear Mughal Darbar\nOpposite Medicare Diagnostic Centre\nSrinagar, Jammu & Kashmir',
    clinic_contact: '0194-2488069 / 0194-4068095',
    clinic_email: 'cypherhealthservicespvtltd@gmail.com',
  },
  {
    id: 'dr-syed-sadaf-altaf',
    image: '/Doctor-Syed-Sadaf-Altaf.png',
    name: 'Dr. Syed Sadaf Altaf',
    title: 'Lecturer, Govt. Medical College, Srinagar',
    specialty: 'Ophthalmology',
    dept: 'Eye Care',
    qual: 'MS Ophthalmology',
    qual_short: 'MS Ophthalmology',
    exp: '',
    avail: 'FRI',
    languages: [],
    bio: `Dr. Syed Sadaf Altaf is an Ophthalmology specialist consulting at Apollo Clinic Srinagar. She holds MS Ophthalmology and serves as Lecturer at Govt. Medical College, Srinagar.\n\nShe provides specialist consultation for eye-related concerns, vision problems, eye examinations, eye irritation, infections, and ophthalmology care. Patients can consult her at Apollo Clinic Srinagar every Friday from 4:00 PM to 6:00 PM.`,
    education: [
      'MS Ophthalmology',
      'Lecturer',
      'Govt. Medical College, Srinagar',
      'Ophthalmology'
    ],
    expertise: [
      'Ophthalmology', 'Eye Care', 'Eye Consultation', 'Vision Concerns', 'Eye Examination', 'Eye Infections', 'Eye Irritation', 'Specialist Eye Care', 'Follow-up Eye Care'
    ],
    specializedCare: [
      { name: 'Eye Consultation', desc: 'Specialist consultation for eye-related symptoms, discomfort, irritation, and vision-related concerns.', icon: 'Activity' },
      { name: 'Vision Problems', desc: 'Evaluation and guidance for blurred vision, reduced vision, and other vision-related issues.', icon: 'Shield' },
      { name: 'Eye Examination', desc: 'Clinical eye assessment and specialist ophthalmology evaluation.', icon: 'Heart' },
      { name: 'Eye Infections & Irritation', desc: 'Consultation for redness, watering, irritation, discomfort, and infection-related eye concerns.', icon: 'Virus' },
    ],
    hours: [
      { day: 'Friday', time: '4:00 PM to 6:00 PM' },
      { day: 'Mon - Thu, Sat - Sun', time: 'Closed' },
    ],
    consultation_days: 'Friday\n4:00 PM to 6:00 PM',
    institution: 'Govt. Medical College, Srinagar',
    trust_banner: 'Ophthalmology consultation available at Apollo Clinic Srinagar every Friday.',
    clinic_location: 'Apollo Clinic, Karan Nagar Chowk\nNear Mughal Darbar\nOpposite Medicare Diagnostic Centre\nSrinagar, Jammu & Kashmir',
    clinic_contact: '0194-2488069 / 0194-4068095',
    clinic_email: 'cypherhealthservicespvtltd@gmail.com',
  },
  {
    id: 'prof-dr-syed-sajjad-nazir',
    image: '/Doctor-Syed-Sajjad-Nazir.png',
    name: 'Prof. Dr. Syed Sajjad Nazir',
    title: 'Senior Consultant Urologist',
    specialty: 'Urology',
    dept: 'Urology',
    qual: 'MBBS, MS, DNB Urology',
    qual_short: 'MBBS\nMS General Surgery\nDNB Urology',
    exp: '',
    avail: 'MON - THU',
    languages: [],
    bio: `Prof. Dr. Syed Sajjad Nazir is a Senior Consultant Urologist consulting at Apollo Clinic Srinagar. He holds MBBS, MS General Surgery, and DNB Urology qualifications.\n\nHis areas of expertise include endourology, laparoscopic urology, uro oncology, and renal transplant surgery. Patients can consult him at Apollo Clinic Srinagar from Monday to Thursday between 5:00 PM and 6:00 PM.`,
    education: [
      'MBBS',
      'MS General Surgery',
      'DNB Urology',
      'Senior Consultant Urologist',
      'Endourologist',
      'Laparoscopic Urologist',
      'Uro Oncologist',
      'Renal Transplant Surgeon'
    ],
    expertise: [
      'Urology', 'Senior Consultant Urologist', 'Endourology', 'Laparoscopic Urology', 'Uro Oncology', 'Renal Transplant Surgery', 'Kidney Concerns', 'Bladder Concerns', 'Prostate Concerns', 'Male Urological Health', 'Urinary Tract Concerns'
    ],
    specializedCare: [
      { name: 'Urology Consultation', desc: 'Specialist consultation for urinary tract, kidney, bladder, prostate, and male urological concerns.', icon: 'Activity' },
      { name: 'Endourology', desc: 'Specialist guidance for endoscopic urology-related evaluation and management planning.', icon: 'Shield' },
      { name: 'Uro Oncology', desc: 'Consultation for cancer-related urological concerns requiring specialist urology opinion.', icon: 'Heart' },
      { name: 'Renal Transplant & Laparoscopic Urology', desc: 'Specialist consultation for renal transplant-related guidance and laparoscopic urology concerns.', icon: 'Virus' },
    ],
    hours: [
      { day: 'Mon - Thu', time: '5:00 PM to 6:00 PM' },
      { day: 'Fri, Sat, Sun', time: 'Closed' },
    ],
    consultation_days: 'Monday to Thursday\n5:00 PM to 6:00 PM',
    trust_banner: 'Senior urology consultation available at Apollo Clinic Srinagar.',
    clinic_location: 'Apollo Clinic, Karan Nagar Chowk\nNear Mughal Darbar\nOpposite Medicare Diagnostic Centre\nSrinagar, Jammu & Kashmir',
    clinic_contact: '0194-2488069 / 0194-4068095',
    clinic_email: 'cypherhealthservicespvtltd@gmail.com',
    expertise_card: 'Endourologist\nLaparoscopic Urologist\nUro Oncologist\nRenal Transplant Surgeon'
  }
];

const SPECIALTIES_FILTER = ['All', 'General Physician', 'Physician', 'Internal Medicine', 'Cardiology', 'Pediatrics', 'Paediatrics', 'Gynecology', 'Dermatology', 'Orthopedics', 'Orthopaedics', 'ENT', 'Ophthalmology', 'Physiotherapy', 'Clinical Psychology', 'Orthodontics', 'Pathology', 'Neurosurgery', 'Dietitian / Nutrition', 'Urology'];

export const DoctorCard = ({ doc, onProfile, onBook }) => {
  const [hov, setHov] = React.useState(false);
  return (
    <div
      className="doctor-card-h"
      onClick={() => onProfile()}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        background: '#fff',
        border: '1px solid rgba(0,0,0,0.06)',
        borderRadius: '14px',
        display: 'flex', flexDirection: 'column',
        transition: 'all 0.3s ease',
        boxShadow: hov ? '0 8px 28px rgba(13,82,192,0.12)' : '0 2px 12px rgba(0,0,0,0.04)',
        transform: hov ? 'translateY(-3px)' : 'none',
        overflow: 'hidden',
        cursor: 'pointer'
      }}
    >
      {/* Top row: image + details */}
      <div className="doctor-card-h-body" style={{ display: 'flex', flex: 1 }}>
        {/* Left: Image */}
        <div className="doctor-card-h-img" style={{ 
          width: '42%', minHeight: '210px', position: 'relative',
          background: 'linear-gradient(135deg, #edf2f7 0%, #e2e8f0 100%)',
          overflow: 'hidden', flexShrink: 0
        }}>
          <img 
            src={doc.image} 
            alt={doc.name} 
            style={{ 
              width: '100%', height: '100%', 
              objectFit: doc.imageFit || 'cover', 
              objectPosition: doc.imagePosition || 'center top' 
            }}
          />
          <div style={{ position: 'absolute', top: 8, right: 8 }}>
            <span style={{ 
              background: 'rgba(255,255,255,0.95)',
              border: '1px solid var(--green-border)', 
              borderRadius: '4px', fontSize: '0.6rem', fontWeight: 800, 
              color: 'var(--green)', 
              padding: '0.15rem 0.45rem', textTransform: 'uppercase', letterSpacing: '0.03em',
              boxShadow: '0 1px 4px rgba(0,0,0,0.08)',
              lineHeight: 1.3, display: 'inline-block'
            }}>
              {doc.avail}
            </span>
          </div>
        </div>

        {/* Right: Details */}
        <div className="doctor-card-h-info" style={{ 
          flex: 1, padding: '1rem 1.15rem', display: 'flex', flexDirection: 'column', 
          justifyContent: 'center', minWidth: 0
        }}>
          <div style={{ fontSize: '0.62rem', fontWeight: 800, color: 'var(--blue)', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: '0.35rem' }}>
            {doc.specialty}
          </div>
          <h3 className="doctor-card-h-name" style={{ fontWeight: 800, fontSize: '1rem', color: 'var(--navy)', lineHeight: 1.25, marginBottom: '0.2rem', margin: 0 }}>{doc.name}</h3>
          <p style={{ fontSize: '0.75rem', color: 'var(--body)', marginBottom: '0.6rem', lineHeight: 1.35, margin: '0 0 0.6rem 0' }}>{doc.qual}</p>
          
          <div className="doctor-card-h-tags" style={{ display: 'flex', gap: '0.35rem', flexWrap: 'wrap' }}>
            {doc.exp && (
              <span style={{ background: 'var(--blue-light)', color: 'var(--blue)', fontSize: '0.62rem', fontWeight: 600, padding: '0.15rem 0.5rem', borderRadius: '4px' }}>
                Exp: {doc.exp}
              </span>
            )}
            {doc.expertise && doc.expertise.slice(0, 3).map((tag, i) => (
              <span key={i} style={{ background: 'var(--blue-light)', color: 'var(--blue)', fontSize: '0.62rem', fontWeight: 600, padding: '0.15rem 0.5rem', borderRadius: '4px' }}>
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom: Action buttons */}
      <div className="doctor-card-h-actions" style={{ display: 'flex', borderTop: '1px solid rgba(0,0,0,0.06)' }}>
        <button
          onClick={(e) => { e.stopPropagation(); onBook(); }}
          style={{ 
            flex: 1, padding: '0.7rem', fontSize: '0.8rem', fontWeight: 700, 
            color: '#fff', background: 'var(--navy)', 
            border: 'none', borderRight: '1px solid rgba(255,255,255,0.15)',
            cursor: 'pointer', transition: 'background 0.2s',
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.35rem'
          }}
          onMouseEnter={e => e.currentTarget.style.background = 'var(--blue)'}
          onMouseLeave={e => e.currentTarget.style.background = 'var(--navy)'}
        >
          Book Appointment <span style={{ fontSize: '0.85em' }}>↗</span>
        </button>
        <button
          onClick={(e) => { e.stopPropagation(); onProfile(); }}
          style={{ 
            flex: 1, padding: '0.7rem', fontSize: '0.8rem', fontWeight: 700, 
            color: 'var(--navy)', background: '#fff', 
            border: 'none',
            cursor: 'pointer', transition: 'background 0.2s',
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.35rem'
          }}
          onMouseEnter={e => e.currentTarget.style.background = '#f8fafc'}
          onMouseLeave={e => e.currentTarget.style.background = '#fff'}
        >
          View Profile
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
            <div className="doc-cards-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1.5rem' }}>
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
              <a href={PRIMARY_PHONE_HREF} className="btn btn-outline-blue btn-lg" style={{ padding: '0.75rem 1.5rem', fontSize: '0.95rem', textDecoration: 'none', borderRadius: '50px', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
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
