import React from 'react';
import { ShieldCheck, Phone, Mail, Clock, MapPin } from 'lucide-react';
import { PRIMARY_PHONE, CLINIC_PHONES, WHATSAPP_NUMBER, CLINIC_EMAIL, WORKING_HOURS } from '../config/contact';

const Section = ({ number, title, children }) => (
  <div style={{ marginBottom: '2.5rem' }}>
    <h2 style={{
      fontSize: 'clamp(1.1rem, 2.5vw, 1.35rem)', fontWeight: 800, color: '#0c4a6e',
      marginBottom: '1rem', lineHeight: 1.35,
      display: 'flex', alignItems: 'flex-start', gap: '0.6rem',
    }}>
      <span style={{
        display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
        width: '32px', height: '32px', borderRadius: '50%', flexShrink: 0,
        background: 'linear-gradient(135deg, #e0f2fe, #d1fae5)',
        color: '#0369a1', fontSize: '0.82rem', fontWeight: 900,
      }}>
        {number}
      </span>
      {title}
    </h2>
    <div style={{ paddingLeft: '0' }}>{children}</div>
  </div>
);

const P = ({ children, style }) => (
  <p style={{ color: '#475569', fontSize: '0.92rem', lineHeight: 1.8, margin: '0 0 1rem', ...style }}>
    {children}
  </p>
);

const BulletList = ({ items }) => (
  <ul style={{
    listStyleType: 'none', padding: 0, margin: '0.5rem 0 1.25rem',
    display: 'flex', flexDirection: 'column', gap: '0.45rem',
  }}>
    {items.map((item, i) => (
      <li key={i} style={{
        display: 'flex', alignItems: 'flex-start', gap: '0.6rem',
        fontSize: '0.9rem', color: '#475569', lineHeight: 1.7,
      }}>
        <span style={{ color: '#0ea5e9', marginTop: '5px', flexShrink: 0, fontSize: '0.55rem' }}>●</span>
        <span>{item}</span>
      </li>
    ))}
  </ul>
);

const SubHeading = ({ children }) => (
  <h3 style={{
    fontSize: '0.95rem', fontWeight: 700, color: '#0f172a',
    margin: '1.25rem 0 0.5rem',
  }}>
    {children}
  </h3>
);

const PrivacyPolicy = () => (
  <div>
    {/* ── Page Hero ── */}
    <section className="page-hero">
      <div className="container text-center" style={{ position: 'relative', zIndex: 1 }}>
        <span className="pill" style={{
          background: 'rgba(255,255,255,0.15)', color: '#fff',
          border: '1px solid rgba(255,255,255,0.3)', marginBottom: '1.25rem', display: 'inline-flex',
        }}>
          <ShieldCheck size={16} style={{ marginRight: '0.4rem' }} /> Privacy & Security
        </span>
        <h1 style={{ color: '#fff', marginBottom: '1.1rem', fontSize: 'clamp(2rem, 5vw, 3.2rem)' }}>
          Privacy Policy
        </h1>
        <p style={{
          color: 'rgba(255,255,255,0.82)', fontSize: '1.1rem',
          maxWidth: '580px', margin: '0 auto', lineHeight: 1.7,
        }}>
          How we collect, use, and protect patient information.
        </p>
      </div>
    </section>

    {/* ── Content ── */}
    <section style={{ background: '#fff', padding: 'clamp(2.5rem, 5vw, 5rem) 0' }}>
      <div className="container" style={{ maxWidth: '800px' }}>

        {/* Last updated badge */}
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
          background: '#f0f9ff', border: '1px solid #bae6fd', borderRadius: '8px',
          padding: '0.5rem 1rem', marginBottom: '2rem', fontSize: '0.82rem',
          fontWeight: 600, color: '#0369a1',
        }}>
          <Clock size={14} /> Last Updated: 01 May 2026
        </div>

        <P>
          Appolo Clinic Srinagar respects your privacy and is committed to protecting your personal and medical information. This Privacy Policy explains how we collect, use, store, and protect information when you visit our website, book appointments, book health checkups, contact us, or access online reports through our platform.
        </P>
        <P>
          By using this website, you agree to the terms of this Privacy Policy.
        </P>

        <div style={{
          width: '100%', height: '1px',
          background: 'linear-gradient(90deg, transparent, #e2e8f0, transparent)',
          margin: '2rem 0 2.5rem',
        }} />

        {/* ── Section 1 ── */}
        <Section number="1" title="Information We Collect">
          <P>We may collect the following information when you use our website or services:</P>

          <SubHeading>Personal Information:</SubHeading>
          <BulletList items={[
            'Full name',
            'Age or date of birth',
            'Gender',
            'Phone number',
            'Email address',
            'Address or location, if provided',
            'Appointment or checkup details',
          ]} />

          <SubHeading>Medical / Health-Related Information:</SubHeading>
          <BulletList items={[
            'Selected service, doctor, department, test, or health checkup',
            'Symptoms or health concerns shared through forms',
            'Diagnostic report details, if uploaded or accessed through the website',
            'Prescription, report, image, PDF, or medical document, if provided by the clinic or patient',
          ]} />

          <SubHeading>Technical Information:</SubHeading>
          <BulletList items={[
            'Device type',
            'Browser type',
            'IP address',
            'Pages visited on the website',
            'Date and time of website usage',
            'Basic analytics data used to improve website performance',
          ]} />
        </Section>

        {/* ── Section 2 ── */}
        <Section number="2" title="How We Use Your Information">
          <P>We use your information for the following purposes:</P>
          <BulletList items={[
            'To book appointments and health checkups',
            'To contact you regarding your booking or enquiry',
            'To send appointment or checkup details through WhatsApp, phone, or email',
            'To provide access to online reports where applicable',
            'To manage patient service requests',
            'To improve website performance and user experience',
            'To maintain clinic records',
            'To respond to patient queries',
            'To ensure security and prevent misuse of the website',
            'To comply with applicable legal or regulatory requirements',
          ]} />
        </Section>

        {/* ── Section 3 ── */}
        <Section number="3" title="WhatsApp Communication">
          <P>
            When you submit an appointment or health checkup form, your booking details may be redirected to WhatsApp for clinic communication.
          </P>
          <P>
            The WhatsApp booking number used by the clinic is:
          </P>
          <div style={{
            background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: '10px',
            padding: '0.85rem 1.25rem', marginBottom: '1rem',
            fontWeight: 700, fontSize: '1rem', color: '#166534',
            display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
          }}>
            <Phone size={16} /> {WHATSAPP_NUMBER}
          </div>
          <P>
            This number is used for booking-related communication only. Please do not share highly sensitive medical information over WhatsApp unless necessary and requested by the clinic.
          </P>
          <P>
            WhatsApp is a third-party platform, and its own privacy policy and security practices also apply when you communicate through it.
          </P>
        </Section>

        {/* ── Section 4 ── */}
        <Section number="4" title="Online Reports and Medical Documents">
          <P>
            If the website provides online report access, the clinic may upload reports, PDFs, images, or related medical documents for patient viewing.
          </P>
          <P>To protect patient privacy:</P>
          <BulletList items={[
            'Reports may be accessible only through a unique link or secure verification method.',
            'Patients may be asked to verify details such as full name and date of birth before accessing reports.',
            'Report links should not be shared with unauthorized persons.',
            'Patients are responsible for keeping their report links and verification details private.',
          ]} />
          <P>
            Appolo Clinic Srinagar takes reasonable steps to protect reports and medical documents, but no online system can be guaranteed to be completely risk-free.
          </P>
        </Section>

        {/* ── Section 5 ── */}
        <Section number="5" title="Sharing of Information">
          <P>We do not sell or rent your personal or medical information.</P>
          <P>We may share your information only when necessary with:</P>
          <BulletList items={[
            'Doctors, consultants, technicians, or clinic staff involved in your care',
            'Diagnostic or lab staff for report processing',
            'Website, hosting, database, or storage service providers',
            'WhatsApp or communication platforms used for patient communication',
            'Government, legal, or regulatory authorities when required by law',
          ]} />
          <P>
            Any third-party service provider involved in website hosting, storage, or communication is expected to handle information securely and only for the required purpose.
          </P>
        </Section>

        {/* ── Section 6 ── */}
        <Section number="6" title="Data Storage and Security">
          <P>
            We take reasonable technical and organizational measures to protect your information from unauthorized access, misuse, alteration, disclosure, or loss.
          </P>
          <P>These measures may include:</P>
          <BulletList items={[
            'Secure website hosting',
            'Restricted admin access',
            'Password-protected admin areas',
            'Secure report links where applicable',
            'Limited staff access to patient information',
            'Regular review of website security practices',
          ]} />
          <P>
            However, no website, server, or internet-based system can be guaranteed to be 100% secure. Users should avoid submitting unnecessary sensitive information through public or shared devices.
          </P>
        </Section>

        {/* ── Section 7 ── */}
        <Section number="7" title="Data Retention">
          <P>
            We keep personal and medical information only for as long as necessary for clinic operations, patient service, legal compliance, record keeping, or report access.
          </P>
          <P>
            Medical records, reports, appointment records, and communication history may be retained as required by clinic policy, medical standards, or applicable law.
          </P>
        </Section>

        {/* ── Section 8 ── */}
        <Section number="8" title="Your Rights">
          <P>Depending on applicable law, you may request to:</P>
          <BulletList items={[
            'Access the personal information we hold about you',
            'Correct inaccurate personal information',
            'Request deletion of certain personal information, where legally permitted',
            'Withdraw consent for certain types of communication',
            'Raise a concern about how your information is handled',
          ]} />
          <P>To make such a request, contact us using the details provided below.</P>
        </Section>

        {/* ── Section 9 ── */}
        <Section number="9" title="Children's Privacy">
          <P>
            The clinic may collect information related to children when parents or guardians book pediatric appointments, vaccinations, checkups, or medical services.
          </P>
          <P>
            Such information should be submitted only by a parent, guardian, or authorized adult. We do not knowingly collect children's information directly without appropriate adult involvement.
          </P>
        </Section>

        {/* ── Section 10 ── */}
        <Section number="10" title="Cookies and Website Analytics">
          <P>
            Our website may use cookies or similar technologies to improve user experience, understand website traffic, and improve performance.
          </P>
          <P>Cookies may help us understand:</P>
          <BulletList items={[
            'Which pages are visited',
            'How users interact with the website',
            'Whether the website is working properly on different devices',
          ]} />
          <P>
            You may disable cookies through your browser settings, but some website features may not work properly.
          </P>
        </Section>

        {/* ── Section 11 ── */}
        <Section number="11" title="Third-Party Links">
          <P>
            Our website may contain links to third-party services such as WhatsApp, Google Maps, payment platforms if added in the future, or other external websites.
          </P>
          <P>
            We are not responsible for the privacy practices, content, or security of third-party websites or platforms. Users should review the privacy policies of those platforms before using them.
          </P>
        </Section>

        {/* ── Section 12 ── */}
        <Section number="12" title="Emergency Disclaimer">
          <div style={{
            background: '#fff7ed', border: '1.5px solid #fed7aa', borderRadius: '12px',
            padding: '1.25rem 1.5rem', marginBottom: '1rem',
          }}>
            <P style={{ fontWeight: 600, color: '#9a3412', margin: 0 }}>
              This website is not intended for emergency medical situations.
            </P>
          </div>
          <P>
            If you are experiencing a medical emergency, serious symptoms, chest pain, breathing difficulty, severe injury, or any urgent health concern, please call emergency services or visit the nearest hospital immediately.
          </P>
          <P>
            Do not rely on website forms, WhatsApp messages, or online enquiries for emergency care.
          </P>
        </Section>

        {/* ── Section 13 ── */}
        <Section number="13" title="Updates to This Privacy Policy">
          <P>
            We may update this Privacy Policy from time to time to reflect changes in our services, website features, legal requirements, or privacy practices.
          </P>
          <P>
            Any updated version will be posted on this page with a revised "Last Updated" date.
          </P>
        </Section>

        {/* ── Section 14 — Contact ── */}
        <Section number="14" title="Contact Us">
          <P>
            For questions, privacy requests, or concerns regarding this Privacy Policy, you may contact us at:
          </P>

          <div style={{
            background: 'linear-gradient(135deg, #f0f9ff, #ecfdf5)', borderRadius: '16px',
            padding: 'clamp(1.5rem, 3vw, 2rem)', border: '1.5px solid #bae6fd',
          }}>
            <h3 style={{
              fontSize: '1.15rem', fontWeight: 800, color: '#0c4a6e',
              margin: '0 0 1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem',
            }}>
              <MapPin size={18} /> Appolo Clinic Srinagar
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
              <div>
                <div style={{ fontSize: '0.78rem', fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: '0.3rem' }}>
                  Phone Numbers
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.2rem' }}>
                  {CLINIC_PHONES.map((p, i) => (
                    <a key={i} href={p.href} style={{ color: '#0c4a6e', fontWeight: 700, fontSize: '0.92rem', textDecoration: 'none' }}>
                      {p.display}
                    </a>
                  ))}
                  <span style={{ color: '#0c4a6e', fontWeight: 700, fontSize: '0.92rem' }}>
                    {WHATSAPP_NUMBER}
                  </span>
                </div>
              </div>

              <div>
                <div style={{ fontSize: '0.78rem', fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: '0.3rem' }}>
                  Email
                </div>
                <a href={`mailto:${CLINIC_EMAIL}`} style={{ color: '#0c4a6e', fontWeight: 700, fontSize: '0.92rem', textDecoration: 'none' }}>
                  {CLINIC_EMAIL}
                </a>
              </div>

              <div>
                <div style={{ fontSize: '0.78rem', fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: '0.3rem' }}>
                  Clinic Working Hours
                </div>
                <div style={{ fontSize: '0.92rem', color: '#0c4a6e', fontWeight: 600, lineHeight: 1.7 }}>
                  {WORKING_HOURS.weekdays.label}: {WORKING_HOURS.weekdays.time}<br />
                  {WORKING_HOURS.sunday.label}: {WORKING_HOURS.sunday.time}
                </div>
              </div>
            </div>
          </div>
        </Section>

      </div>
    </section>
  </div>
);

export default PrivacyPolicy;
