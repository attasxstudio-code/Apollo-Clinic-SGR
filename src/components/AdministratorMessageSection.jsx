import React from 'react';

const AdministratorMessageSection = () => {
  return (
    <section className="admin-message-section py-20 bg-white" style={{ padding: '6rem 0', background: '#fff' }}>
      <div className="container" style={{ maxWidth: '1120px', margin: '0 auto', padding: '0 1rem' }}>
        <div className="section-header" style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <span style={{ color: 'var(--blue)', fontWeight: 800, fontSize: '0.85rem', letterSpacing: '1px', textTransform: 'uppercase', display: 'inline-block', marginBottom: '1rem' }}>
            Leadership Message
          </span>
          <h2 style={{ fontSize: '2.5rem', color: 'var(--heading)', margin: '0 0 1rem 0' }}>
            Message from the Administrator
          </h2>
          <p style={{ fontSize: '1.05rem', color: 'var(--body)', maxWidth: '600px', margin: '0 auto', lineHeight: 1.6 }}>
            A note of trust, care, and commitment from the leadership of Appolo Clinic Srinagar.
          </p>
        </div>

        <div className="admin-message-grid">
          
          <div className="admin-photo-card" style={{ 
            background: '#fff', 
            borderRadius: '16px', 
            overflow: 'hidden', 
            boxShadow: '0 12px 40px rgba(0,0,0,0.06)',
            border: '1px solid rgba(0,0,0,0.05)',
            display: 'flex', flexDirection: 'column'
          }}>
            <div style={{ position: 'relative', width: '100%', aspectRatio: '4/5' }}>
              <img 
                src="/images/doctors/Doctor-Gazzafar-Hameed-Rather(Administrator).webp" 
                alt="Gazzanfar Hameed Rather, Administrator of Appolo Clinic Srinagar"
                loading="lazy"
                decoding="async"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>
            <div style={{ padding: '1.5rem', textAlign: 'center', background: '#fff' }}>
              <h3 style={{ fontSize: '1.25rem', color: 'var(--navy)', margin: '0 0 0.25rem 0', fontWeight: 800 }}>
                Gazzanfar Hameed Rather — M.Com, M.Phil
              </h3>
              <p style={{ fontSize: '0.95rem', color: 'var(--blue)', margin: 0, fontWeight: 600 }}>
                Administrator, Appolo Clinic Srinagar
              </p>
            </div>
          </div>

          <div className="admin-message-content" style={{
            background: '#f8fafc',
            borderRadius: '16px',
            padding: '2.5rem',
            border: '1px solid rgba(0,0,0,0.04)',
            position: 'relative'
          }}>
             <div style={{ position: 'absolute', top: '1.5rem', left: '1.5rem', opacity: 0.1, fontSize: '5rem', color: 'var(--blue)', fontFamily: 'serif', lineHeight: 1 }}>"</div>
             
             <div style={{ position: 'relative', zIndex: 2 }}>
               <p style={{ fontSize: '1.05rem', color: 'var(--heading)', fontWeight: 700, marginBottom: '1.25rem' }}>
                 Welcome to Appolo Clinic, Karan Nagar.
               </p>
               <p style={{ fontSize: '0.95rem', color: 'var(--body)', lineHeight: 1.8, marginBottom: '1.25rem' }}>
                 At Appolo Clinic, we redefine healthcare by combining clinical excellence with a refined patient experience. Strategically located in Karan Nagar, our clinic is designed to offer an environment of comfort, privacy, and advanced medical care — where every detail reflects our commitment to quality.
               </p>
               <p style={{ fontSize: '0.95rem', color: 'var(--body)', lineHeight: 1.8, marginBottom: '1.25rem' }}>
                 Our distinguished team of highly qualified doctors and healthcare professionals brings together expertise, precision, and compassion to deliver world-class medical services. We focus on personalized care, ensuring that every patient receives attention tailored to their individual needs, supported by accurate diagnostics and modern treatment protocols.
               </p>
               <p style={{ fontSize: '0.95rem', color: 'var(--body)', lineHeight: 1.8, marginBottom: '1.25rem' }}>
                 At Appolo Clinic, we believe true healthcare goes beyond treatment — it is about trust, reassurance, and long-term wellness. From consultation to recovery, we ensure a seamless and dignified experience for every patient who walks through our doors.
               </p>
               <p style={{ fontSize: '0.95rem', color: 'var(--body)', lineHeight: 1.8, marginBottom: '1.25rem' }}>
                 With state-of-the-art facilities, stringent hygiene standards, and a patient-first philosophy, we strive to set a benchmark in premium healthcare services in the region.
               </p>
               <p style={{ fontSize: '1.05rem', color: 'var(--blue)', fontWeight: 700, marginBottom: '2.5rem', fontStyle: 'italic' }}>
                 Excellence in Care. Commitment to Life.
               </p>

               <div className="admin-signature" style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                 <img 
                   src="/Doctor-Gazzafar-Hameed-Rather(Administrator)-signature.png" 
                   alt="Signature of Gazzanfar Hameed Rather"
                   loading="lazy"
                   decoding="async"
                   style={{ objectFit: 'contain', height: 'auto', maxWidth: '240px', display: 'block' }}
                 />
                 <div>
                   <p style={{ fontSize: '1rem', color: 'var(--navy)', fontWeight: 800, margin: '0 0 0.15rem 0' }}>
                     Gazzanfar Hameed Rather
                   </p>
                   <p style={{ fontSize: '0.85rem', color: 'var(--muted)', margin: 0 }}>
                     Administrator
                   </p>
                 </div>
               </div>
             </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AdministratorMessageSection;
