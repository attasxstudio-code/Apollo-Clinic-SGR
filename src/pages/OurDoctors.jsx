import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Calendar, Phone, ArrowRight, UserCheck, ShieldCheck, HeartPulse, Clock } from 'lucide-react';

import { PRIMARY_PHONE_HREF } from '../config/contact';

export const ALL_DOCTORS = [
  {
    id: 'dr-junaid-s-wani',
    image: '/images/doctors/Doctor_junaid-S-Wani.webp',
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
    image: '/images/doctors/Doctor-Adil-Bashir-Shah.webp',
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
    image: '/images/doctors/Doctor-Ahmad-Javid.webp',
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
    image: '/images/doctors/Doctor-Ajaz-Ahmad-Khan.webp',
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
    image: '/images/doctors/Doctor-Arshad-Farooq.webp',
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
    image: '/images/doctors/Doctor-Faisal_Arshad.webp',
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
    image: '/images/doctors/Doctor-Feroze-Ahmad.webp',
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
    image: '/images/doctors/Doctor-Gowhar-Ahmad-Kozgar.webp',
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
    image: '/images/doctors/Doctor-Khalil-M-Baba.webp',
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
    id: 'dr-masood-ahmad-laharwal',
    image: '/images/doctors/Doctor-Masood-Ahmad-Laharwal.webp',
    name: 'Dr. Masood Ahmad Laharwal',
    title: 'Neurosurgery Specialist',
    specialty: 'Neurosurgery',
    dept: 'Neuro Surgery',
    qual: 'MBBS, MS, MCh Neurosurgery',
    qual_short: 'MBBS\nMS\nMCh Neurosurgery',
    exp: '',
    avail: 'MON - SAT',
    languages: [],
    bio: `Dr. Masood Ahmad Laharwal is a Neurosurgery specialist consulting at Apollo Clinic Srinagar. He holds MBBS, MS, and MCh Neurosurgery qualifications and has served as Ex Consultant Neurosurgery at SKIMS and Ex Senior Consultant at Paras Health Care Srinagar.\n\nHe provides specialist neurosurgery consultation for brain, spine, nerve-related concerns, neurological symptoms, headaches, back and neck pain, and surgical opinion where required. Patients can consult him at Apollo Clinic Srinagar from Monday to Saturday, 3:30 PM to 6:00 PM.`,
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
    image: '/images/doctors/Doctor-Mukhtiar-Wani.webp',
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
    image: '/images/doctors/Doctor-Nazir-Ahmad-Lone.webp',
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
    image: '/images/doctors/Doctor-Qurat-UL-Aan.webp',
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
    image: '/images/doctors/Doctor-Shabeer-Koul.webp',
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
    image: '/images/doctors/Doctor-Syed-Sadaf-Altaf.webp',
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
    image: '/images/doctors/Doctor-Syed-Sajjad-Nazir.webp',
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
  },
  {
    id: 'dr-muntakhab-ul-nafae',
    image: '/images/doctors/Doctor-Muntakhab-ul-Nafae.webp',
    name: 'Dr. Muntakhab ul Nafae',
    title: 'General Surgeon',
    specialty: 'General Surgery',
    dept: 'General Surgery',
    qual: 'MBBS, MS',
    qual_short: 'MBBS\nMS',
    exp: '',
    avail: 'MON - SAT',
    languages: [],
    bio: `Dr Muntakhab ul Nafae is a General Surgeon consulting at Apollo Clinic Srinagar. She provides expert surgical consultation, evaluation, and guidance for patients requiring general surgery care, follow-up assessment, and specialist medical opinion.`,
    education: [
      'MBBS',
      'MS'
    ],
    expertise: [
      'General Surgery', 'Surgical Evaluation', 'Abdominal Concerns', 'Gastrointestinal Concerns', 'Minor Surgical Opinion', 'Pre-surgical Guidance', 'Post-surgical Follow-up', 'Specialist Surgical Opinion'
    ],
    specializedCare: [
      { name: 'General Surgery Consultation', desc: 'Expert surgical consultation, evaluation, and guidance for patients requiring general surgery care.', icon: 'Activity' },
      { name: 'Abdominal & Gastrointestinal', desc: 'Evaluation and specialist surgical opinion for abdominal and gastrointestinal concerns.', icon: 'Shield' },
      { name: 'Pre & Post Surgical Care', desc: 'Pre-surgical guidance and comprehensive post-surgical follow-up assessment.', icon: 'Heart' },
      { name: 'Minor Surgical Opinion', desc: 'Specialist medical opinion and evaluation for minor surgical procedures and concerns.', icon: 'Virus' },
    ],
    hours: [
      { day: 'Mon - Sat', time: '3:00 PM to 5:00 PM' },
      { day: 'Sunday', time: 'Closed' },
    ],
    consultation_days: 'Monday to Saturday\n3:00 PM to 5:00 PM',
    trust_banner: 'General surgery consultation available at Apollo Clinic Srinagar. Prior registration is mandatory.',
    clinic_location: 'Apollo Clinic, Karan Nagar Chowk\nNear Mughal Darbar\nOpposite Medicare Diagnostic Centre\nSrinagar, Jammu & Kashmir',
    clinic_contact: '0194-2488069 / 0194-4068095',
    clinic_email: 'cypherhealthservicespvtltd@gmail.com',
  },
  {
    id: 'dr-abdul-rashid-khan',
    image: '/images/doctors/Doctor-Abdul-Rashid-Khan.webp',
    name: 'Dr. Abdul Rashid Khan',
    title: 'Head of Department',
    specialty: 'Biochemistry',
    dept: 'Diagnostics',
    qual: 'PhD Biochemistry',
    qual_short: 'PhD Biochemistry',
    type: 'lab-incharge',
    avail: 'Lab Incharge',
    languages: [],
    bio: `Dr Abdul Rashid Khan is a PhD Biochemistry professional and Lab Incharge associated with Apollo Clinic Srinagar. As Head of Department at SKIMS Medical College, he brings strong academic, laboratory, and diagnostic expertise to support reliable lab processes, diagnostic quality, and patient-focused healthcare standards.`,
    education: [
      'PhD Biochemistry',
      'Head of Department',
      'SKIMS Medical College'
    ],
    expertise: [
      'Biochemistry', 'Laboratory Medicine', 'Diagnostic Quality', 'Clinical Laboratory Supervision', 'Lab Process Management', 'Test Accuracy', 'Reporting Standards', 'Diagnostics Department Guidance'
    ],
    specializedCare: [
      { name: 'Diagnostic Quality Assurance', desc: 'Overseeing test accuracy and reliable laboratory processes for patient-focused care.', icon: 'Activity' },
      { name: 'Clinical Laboratory Supervision', desc: 'Guidance and management of the diagnostics department and laboratory standards.', icon: 'Shield' },
    ],
    hours: [],
    consultation_days: null,
    institution: 'SKIMS Medical College',
    trust_banner: 'Laboratory leadership ensuring quality diagnostics at Apollo Clinic Srinagar.',
    clinic_location: 'Apollo Clinic, Karan Nagar Chowk\nNear Mughal Darbar\nOpposite Medicare Diagnostic Centre\nSrinagar, Jammu & Kashmir',
    clinic_contact: '0194-2488069 / 0194-4068095',
    clinic_email: 'cypherhealthservicespvtltd@gmail.com',
  },
  {
    id: 'dr-gauri-agarwal',
    image: '/Doctor-Gauri-Agarwal.png',
    name: 'Dr Gauri Agarwal',
    title: 'Founder & Director, Seeds of Innocence IVF & Genestring Labs',
    specialty: 'IVF, Fertility & Reproductive Medicine',
    dept: 'IVF & Fertility',
    qual: 'MD, DNB, MBBS',
    exp: '15+ years',
    type: 'visiting-doctor',
    avail: 'Once a month',
    languages: [],
    bio: `Dr Gauri Agarwal is a leading IVF and reproductive medicine specialist with over 15 years of experience in advanced infertility treatment, reproductive endocrinology, and advanced fertility techniques. She is the Founder and Director of Seeds of Innocence IVF and Genestring Labs, and has played an important role in bringing innovative fertility solutions and evidence-based reproductive care to India and beyond.\n\nTrained in Embryology at the National University of Singapore and with a Fellowship in IVF & ART from Ghent University, Belgium, Dr Gauri Agarwal combines clinical expertise, advanced reproductive technology, and compassionate patient care. Her work focuses on improving women’s health, spreading awareness about reproductive health, and helping families with trusted fertility guidance.`,
    education: [
      'MD, DNB, MBBS',
      'Trained in Embryology at the National University of Singapore',
      'Fellowship in IVF & ART from Ghent University, Belgium',
      'Stanford University Graduate: School of Business',
      'FDGSI Fertility Specialist'
    ],
    expertise: [
      'IVF consultation', 'Infertility evaluation', 'Reproductive endocrinology', 'Advanced fertility techniques', 'Reproductive medicine', 'Reproductive genetics', 'Women’s reproductive health', 'Fertility counselling', 'Advanced infertility treatment', 'Evidence-based fertility care'
    ],
    specializedCare: [
      { name: 'IVF Consultation', desc: 'Advanced infertility evaluation and individualized IVF treatment planning.', icon: 'Activity' },
      { name: 'Reproductive Endocrinology', desc: 'Expertise in hormonal imbalances and reproductive health disorders.', icon: 'Activity' },
      { name: 'Advanced Fertility Techniques', desc: 'Implementation of modern ART procedures and evidence-based fertility care.', icon: 'Shield' },
      { name: 'Reproductive Genetics', desc: 'Integration of genetic testing in reproductive medicine and fertility solutions.', icon: 'Activity' }
    ],
    experience: [
      'Founder & Director at Seeds of Innocence IVF, India, Oman & Africa',
      'Founder & Director of Genestring Labs',
      '15+ years of experience in advanced infertility treatment and reproductive genetics',
      'Leading gynecologist and highly respected IVF specialist'
    ],
    awards: [
      'Business World Healthcare 40 Under 40 Leaders in India 2022',
      'Times 40 Under 40 Healthcare Leaders in India 2022',
      'ET Healthworld Hall of Fame recognition as IVF Virtuoso of 2022'
    ],
    media: [
      'Recognized for public health awareness around fertility, reproductive health, and women’s health',
      'Featured in major digital interactions and podcasts reaching millions of viewers',
      'Known for helping break the stigma surrounding infertility through education and outreach'
    ],
    hours: [],
    consultation_days: 'Selected monthly schedules. Prior registration is required.',
    institution: 'Seeds of Innocence IVF & Genestring Labs',
    trust_banner: 'Limited slots available. Prior registration is mandatory for visiting appointments.',
    clinic_location: 'Apollo Clinic, Karan Nagar Chowk\nNear Mughal Darbar\nOpposite Medicare Diagnostic Centre\nSrinagar, Jammu & Kashmir',
    clinic_contact: '0194-2488069 / 0194-4068095',
    clinic_email: 'cypherhealthservicespvtltd@gmail.com',
  },
  {
    id: 'dr-anindya-mukherjee',
    image: '/Doctor-Anindya-Mukherjee.png',
    name: 'Dr Anindya Mukherjee',
    title: 'Consultant Medical Oncologist',
    specialty: 'Medical Oncology',
    specialization: 'Solid Tumors, Hematologic Malignancies, Chemotherapy, Immunotherapy, Targeted Therapy, Precision Oncology',
    dept: 'Medical Oncology',
    qual: 'MBBS, MD/DNB Radiation Oncology, DrNB Medical Oncology, ECMO',
    exp: '12+ years',
    type: 'visiting-doctor',
    avail: 'Once a month',
    languages: [],
    bio: `Dr Anindya Mukherjee is a highly competent and research-driven Medical Oncologist with over 12 years of experience in cancer care. He has strong academic and clinical training from leading cancer institutes and has worked extensively in the management of solid tumors and hematologic malignancies.\n\nHis clinical approach combines chemotherapy, immunotherapy, targeted therapy, precision oncology, and evidence-based treatment planning. Dr Mukherjee focuses on personalized cancer care, multidisciplinary decision-making, and compassionate support for patients and families throughout the treatment journey.`,
    education: [
      'MBBS',
      'MD/DNB Radiation Oncology',
      'DrNB Medical Oncology',
      'ECMO'
    ],
    experience: [
      'Consultant, Rajiv Gandhi Cancer Institute and Research Centre, New Delhi',
      'Consultant, Meherbai Tata Memorial Hospital, Jamshedpur',
      'Assistant Professor, Malabar Cancer Centre, Kerala',
      '12+ years of experience in oncology care'
    ],
    expertise: [
      'Medical oncology consultation', 'Breast cancer', 'Lung cancer', 'Gastrointestinal cancer', 'Head and neck cancer', 'Genitourinary cancer', 'Brain tumors', 'Bone tumors and sarcoma', 'Lymphoma management', 'Leukemia management', 'Chemotherapy', 'Immunotherapy', 'Targeted therapy', 'Precision and molecular oncology', 'Multidisciplinary cancer care', 'Palliative cancer care'
    ],
    specializedCareHeading: 'Specialization & Expertise',
    specializedCare: [
      { name: 'Solid Tumors', desc: 'Breast, lung, gastrointestinal, head and neck, genitourinary cancer.', icon: 'Activity' },
      { name: 'Complex Tumors', desc: 'Brain tumor, bone tumor and sarcoma management.', icon: 'Activity' },
      { name: 'Hematologic Malignancies', desc: 'Lymphoma and leukemia management.', icon: 'Shield' },
      { name: 'Advanced Therapy', desc: 'Chemotherapy, immunotherapy and targeted therapy.', icon: 'Activity' },
      { name: 'Precision Oncology', desc: 'Precision and molecular oncology.', icon: 'Shield' },
      { name: 'Comprehensive Care', desc: 'Multidisciplinary and palliative cancer care.', icon: 'Heart' }
    ],
    awards: [],
    media: [],
    hours: [],
    consultation_days: 'Selected monthly schedules. Prior registration is required.',
    institution: 'Apollo Clinic Srinagar',
    trust_banner: 'Limited slots available. Prior registration is mandatory for visiting appointments.',
    clinic_location: 'Apollo Clinic, Karan Nagar Chowk\nNear Mughal Darbar\nOpposite Medicare Diagnostic Centre\nSrinagar, Jammu & Kashmir',
    clinic_contact: '0194-2488069 / 0194-4068095',
    clinic_email: 'cypherhealthservicespvtltd@gmail.com',
  },
  {
    id: 'dr-harish-kumar-verma',
    image: '/Doctor-Harish-Kumar-Verma.png',
    name: 'Dr Harish Kumar Verma',
    title: 'Senior Pulmonologist & Critical Care Expert',
    specialty: 'Pulmonology & Critical Care Medicine',
    specialization: 'Chest & Lung Disease, Sleep Medicine, Interventional Pulmonology, Critical Care, Bronchoscopy, EBUS, Thoracoscopy, Pulmonary Rehabilitation',
    dept: 'Pulmonology',
    qual: 'MBBS, MD Internal Medicine, DM Pulmonary & Critical Care Medicine',
    exp: '18+ years',
    type: 'visiting-doctor',
    avail: 'Once a month',
    languages: [],
    bio: `Dr Harish Kumar Verma is a seasoned Pulmonologist and Critical Care expert with over 18 years of clinical experience. He specializes in advanced respiratory care, sleep medicine, interventional pulmonology, and critical care procedures.\n\nHe is recognized for managing complex ICU cases, using advanced bronchoscopic techniques, and providing pulmonary rehabilitation. His clinical approach combines evidence-based medicine, compassionate patient care, and advanced respiratory care for patients with complex chest, lung, sleep, and critical care conditions.`,
    education: [
      'MBBS',
      'MD Internal Medicine',
      'DM Pulmonary & Critical Care Medicine from VMMC & Safdarjung Hospital, Delhi'
    ],
    experience: [
      'Senior Consultant & Incharge, Yathartha Super-speciality Hospital',
      'Director, Advanta Super-speciality Hospital, Rohtak',
      'Consultant & Head, Noble Heart & Super-speciality Hospital, Rohtak',
      'Consultant & Head, Teerathankar Mahaveer Medical College & Hospital, Moradabad',
      'Associate Consultant, Max Hospital, Saket, Delhi',
      '18+ years of clinical experience in pulmonology and critical care'
    ],
    expertise: [
      'Chest and lung disease', 'Respiratory diseases', 'Pleural effusion', 'Lung cancer and fibrosis', 'Pneumonia and TB', 'Sleep disorders', 'Asthma and allergy disorders', 'Bronchoscopy', 'EBUS', 'Thoracoscopy', 'Pulmonary rehabilitation', 'Interstitial Lung Disease', 'COPD', 'Smoking-related lung disorders', 'Critical care medicine', 'ICU care and complex respiratory cases'
    ],
    specializedCareHeading: 'Specialization & Expertise',
    specializedCare: [
      { name: 'Chest & Lung Disease', desc: 'Pleural effusion, lung cancer, fibrosis, pneumonia, and TB.', icon: 'Activity' },
      { name: 'Sleep & Allergy', desc: 'Sleep disorders, asthma, and allergy disorders.', icon: 'Activity' },
      { name: 'Advanced Interventions', desc: 'Bronchoscopy, EBUS and thoracoscopy.', icon: 'Shield' },
      { name: 'Chronic Care', desc: 'Pulmonary rehabilitation, ILD, COPD, and smoking-related lung disorders.', icon: 'Activity' },
      { name: 'Critical Care', desc: 'Critical care and advanced ICU management.', icon: 'Heart' }
    ],
    awards: [
      'Paper presented at APICON 2010: “Comparison of Indian C-DAS with DAS-28 in Rheumatoid Arthritis”',
      'Active participant in research on rheumatoid arthritis, critical care, and pulmonary interventions',
      'Leadership roles across multiple super-speciality hospitals in pulmonology and ICU care'
    ],
    research: [
      'Correlation of Intima-Media Thickness with Rheumatoid Arthritis activity — JIACM, 2011',
      'Hand function assessment in Rheumatoid Arthritis and its correlation to disease activity — Rheumatology International, 2011',
      'Clinical Disease Activity Index for Rheumatoid Arthritis assessment — Arthritis, 2011',
      'Biological therapy as first-line treatment in Rheumatoid Arthritis — Medicine Update, 2011',
      'International publications of interest from India — Indian Journal of Rheumatology, 2011',
      'Chemotherapy safety and drug toxicity review — EJBP Sciences, 2017'
    ],
    media: [],
    hours: [],
    consultation_days: 'Selected monthly schedules. Prior registration is required.',
    institution: 'Apollo Clinic Srinagar',
    trust_banner: 'Limited slots available. Prior registration is mandatory for visiting appointments.',
    clinic_location: 'Apollo Clinic, Karan Nagar Chowk\nNear Mughal Darbar\nOpposite Medicare Diagnostic Centre\nSrinagar, Jammu & Kashmir',
    clinic_contact: '0194-2488069 / 0194-4068095',
    clinic_email: 'cypherhealthservicespvtltd@gmail.com',
  }
];

const ALL_POSSIBLE_FILTERS = ['All', 'General Physician', 'Physician', 'Internal Medicine', 'Cardiology', 'Pediatrics', 'Paediatrics', 'Gynecology', 'Dermatology', 'Orthopedics', 'Orthopaedics', 'ENT', 'Ophthalmology', 'Physiotherapy', 'Clinical Psychology', 'Orthodontics', 'Pathology', 'Neurosurgery', 'General Surgery', 'Diagnostics', 'Dietitian / Nutrition', 'Urology'];
const SPECIALTIES_FILTER = ALL_POSSIBLE_FILTERS.filter(f => 
  f === 'All' || ALL_DOCTORS.some(d => d.dept === f || d.specialty === f)
);


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
        <div className="doctor-card-h-img">
          <img 
            src={doc.image} 
            alt={doc.name} 
            loading="lazy"
            decoding="async"
            width="400"
            height="500"
            style={{ 
              position: 'absolute', top: 0, left: 0,
              width: '100%', height: '100%', 
              objectFit: doc.imageFit || 'cover', 
              objectPosition: doc.imagePosition || 'center top' 
            }}
          />
        </div>

        {/* Right: Details */}
        <div className="doctor-card-h-info">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.35rem', gap: '0.5rem' }}>
            <div style={{ fontSize: '0.62rem', fontWeight: 800, color: 'var(--blue)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
              {doc.type === 'lab-incharge' ? 'Lab Incharge' : doc.type === 'visiting-doctor' ? 'Visiting Doctor' : doc.specialty}
            </div>
            {doc.type === 'visiting-doctor' && (
              <div style={{ background: 'var(--orange-light)', color: 'var(--orange)', padding: '0.15rem 0.4rem', borderRadius: '4px', fontSize: '0.6rem', fontWeight: 800, textTransform: 'uppercase', flexShrink: 0 }}>
                Limited Visit
              </div>
            )}
          </div>
          <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--heading)', marginBottom: '0.15rem', lineHeight: 1.2 }}>
            {doc.name}
          </h3>
          <p style={{ fontSize: '0.8rem', color: 'var(--muted)', marginBottom: '0.3rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
            {doc.qual}
          </p>
          <p style={{ fontSize: '0.75rem', color: 'var(--body)', marginBottom: '0.5rem', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden', lineHeight: 1.4, flex: 1 }}>
            {doc.title}
          </p>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--heading)', fontSize: '0.75rem', fontWeight: 600, marginTop: 'auto' }}>
            <Clock size={12} className="text-blue" /> 
            {doc.type === 'visiting-doctor' ? 'Visits once a month' : (doc.avail || 'Check availability')}
          </div>
        </div>
      </div>

      {/* Bottom row: CTAs */}
      <div className="doctor-card-h-actions">
        {doc.type === 'visiting-doctor' ? (
          <button 
            className="btn btn-outline-blue" 
            style={{ flex: 1, padding: '0.5rem', fontSize: '0.8rem', borderRadius: '8px' }}
            onClick={(e) => { e.stopPropagation(); onProfile(); }}
          >
            View Visiting Profile
          </button>
        ) : (
          <button 
            className="btn btn-outline-blue" 
            style={{ flex: 1, padding: '0.5rem', fontSize: '0.8rem', borderRadius: '8px' }}
            onClick={(e) => { e.stopPropagation(); onProfile(); }}
          >
            View Profile
          </button>
        )}
        
        {doc.type !== 'lab-incharge' && doc.type !== 'visiting-doctor' && (
          <button 
            className="btn btn-primary" 
            style={{ flex: 1, padding: '0.5rem', fontSize: '0.8rem', borderRadius: '8px' }}
            onClick={(e) => { e.stopPropagation(); onBook(doc); }}
          >
            Book Appointment
          </button>
        )}
      </div>
    </div>
  );
};

const OurDoctors = () => {
  const navigate = useNavigate();
  const [search,  setSearch]  = React.useState('');
  const [filter,  setFilter]  = React.useState('All');

  const goBook    = (doc) => { navigate('/book');      window.scrollTo(0, 0); };
  const goProfile = (id) => { navigate(`/doctors/${id}`); window.scrollTo(0, 0); };

  const filteredDoctors = ALL_DOCTORS.filter(d => d.type !== 'visiting-doctor' && (filter === 'All' || d.dept === filter || d.specialty === filter));
  const visitingDoctors = ALL_DOCTORS.filter(d => d.type === 'visiting-doctor');

  const filtered = filteredDoctors.filter(d => 
    d.name.toLowerCase().includes(search.toLowerCase()) ||
    d.specialty.toLowerCase().includes(search.toLowerCase()) ||
    d.title.toLowerCase().includes(search.toLowerCase())
  );

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
                  <img src="/images/doctors/Doctor-Faisal_Arshad.webp" alt="Doctor" loading="lazy" decoding="async" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                <div style={{ position: 'absolute', top: '25%', right: '10%', width: '220px', height: '220px', borderRadius: '24px', overflow: 'hidden', boxShadow: '0 20px 40px rgba(0,0,0,0.1)', zIndex: 3 }}>
                  <img src="/images/doctors/Doctor-Adil-Bashir-Shah.webp" alt="Doctor" loading="lazy" decoding="async" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                <div style={{ position: 'absolute', bottom: '10%', left: '30%', width: '160px', height: '160px', borderRadius: '24px', overflow: 'hidden', boxShadow: '0 20px 40px rgba(0,0,0,0.1)', zIndex: 1 }}>
                  <img src="/images/doctors/Doctor-Ahmad-Javid.webp" alt="Doctor" loading="lazy" decoding="async" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
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

      {/* ── Visiting Doctors ── */}
      {visitingDoctors.length > 0 && (
        <section className="visiting-doc-listing" style={{ padding: '0 0 6rem' }}>
          <div className="container" style={{ maxWidth: '1400px' }}>
            <div className="doc-listing-header" style={{ textAlign: 'center', marginBottom: '4rem' }}>
               <div style={{ display: 'inline-block', marginBottom: '1rem' }}>
                  <div style={{ height: '2px', width: '30px', background: 'var(--orange)', margin: '0 auto 8px' }}></div>
                </div>
              <h2 style={{ fontSize: '2.2rem', color: 'var(--navy)', marginBottom: '0.75rem' }}>Visiting Doctors</h2>
              <p style={{ color: 'var(--body)', fontSize: '1rem', maxWidth: '600px', margin: '0 auto' }}>
                Specialist doctors available on selected monthly visits. Prior registration is required due to limited slots.
              </p>
            </div>

            <div className="doc-cards-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem', justifyContent: 'center' }}>
              {visitingDoctors.map(doc => (
                <DoctorCard key={doc.id} doc={doc} onProfile={() => goProfile(doc.id)} onBook={goBook} />
              ))}
            </div>
          </div>
        </section>
      )}

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
