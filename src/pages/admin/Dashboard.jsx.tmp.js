const Dashboard = () => {
  const navigate = useNavigate();
  const { admin, logout } = useAuth();
  const [activeSection, setActiveSection] = useState('appointments');
  const [allAppointments, setAllAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchAllData = async () => {
    setLoading(true);
    try {
      const data = await appointmentService.getAllAppointments();
      setAllAppointments(data);
    } catch (err) {
      console.error('Dashboard load failed:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!admin) { navigate('/admin/login'); }
    else { fetchAllData(); }
  }, [admin]);

  /* Seed legacy clinic_leads if it's empty */
  useEffect(() => {
    const appts = localStorage.getItem('clinic_leads');
    if (!appts) {
      const mock = [
        { id:1, name:'Aisha Bhat',  phone:'+91 9000000001', date:'2025-04-20', status:'Contacted', createdAt:new Date().toISOString(), source:'Demo' },
        { id:2, name:'Tariq Ahmed', phone:'+91 9000000002', date:'2025-04-21', status:'Pending',   createdAt:new Date().toISOString(), source:'Demo' },
        { id:3, name:'Noor Fatima', phone:'+91 9000000003', date:'2025-04-19', status:'Confirmed', createdAt:new Date().toISOString(), source:'Demo' },
      ];
      localStorage.setItem('clinic_leads', JSON.stringify(mock));
    }
  }, []);

  const handleLogout = () => { logout(); navigate('/admin/login', { replace: true }); };

  const SECTIONS = [
    { key:'appointments', label:'Appointments', icon:<Stethoscope size={15}/>, color:'#0369a1' },
    { key:'checkups',     label:'Lab Tests', icon:<FlaskConical size={15}/>, color:'#059669' },
    { key:'visiting',     label:'Visiting Doctors', icon:<Calendar size={15}/>, color:'#f97316' },
    { key:'reports',      label:'Test Reports', icon:<FileText size={15}/>, color:'#7c3aed' },
  ];

  return (
    <div style={{ background:'linear-gradient(180deg,#f0f9ff 0%,#f8fafc 100%)', minHeight:'100vh' }}>

      {/* Navbar */}
      <nav style={{
        background:'rgba(255,255,255,0.94)', backdropFilter:'blur(18px)',
        borderBottom:'1px solid rgba(14,165,233,0.12)',
        position:'sticky', top:0, zIndex:100,
        boxShadow:'0 2px 18px rgba(14,165,233,0.1)',
      }}>
        <div style={{ maxWidth:1200, margin:'0 auto', padding:'0.75rem 1.1rem',
          display:'flex', justifyContent:'space-between', alignItems:'center' }}>
          {/* Brand */}
          <div onClick={() => navigate('/')} style={{ display:'flex', alignItems:'center', gap:'0.65rem', cursor:'pointer' }}
            title="Go to Home Page">
            <div style={{ background:'linear-gradient(135deg,#0ea5e9,#10b981)', borderRadius:'10px', padding:'6px',
              display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
              <img src="/images/ui/logo.webp" alt="Apollo Clinic" height="26" style={{ objectFit:'contain', borderRadius:'5px' }} className="admin-logo-img" />
            </div>
            <div>
              <div style={{ fontWeight:800, fontSize:'0.92rem', lineHeight:1.15,
                background:'linear-gradient(135deg,#0369a1,#047857)',
                WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent' }}>
                Admin Panel
              </div>
              <div style={{ color:'#94a3b8', fontSize:'0.65rem', fontWeight:500 }}>Apollo Clinic Srinagar</div>
            </div>
          </div>

          <div style={{ display:'flex', alignItems:'center', gap:'0.5rem' }}>
            {admin && (
              <div className="admin-badge" style={{
                display:'flex', alignItems:'center', gap:'0.5rem',
                background:'linear-gradient(135deg,rgba(14,165,233,0.1),rgba(16,185,129,0.1))',
                border:'1px solid rgba(14,165,233,0.2)',
                borderRadius:'10px', padding:'0.4rem 0.85rem',
              }}>
                <ShieldCheck size={14} color="#0369a1"/>
                <span style={{ fontSize:'0.8rem', fontWeight:700, color:'#0369a1' }}>{admin.email}</span>
              </div>
            )}
            <button onClick={handleLogout} style={{
              display:'flex', alignItems:'center', gap:'5px',
              background:'none', border:'1.5px solid #e0eef8',
              borderRadius:'10px', padding:'0.5rem 0.75rem',
              color:'#64748b', fontWeight:600, fontSize:'0.83rem',
              cursor:'pointer', transition:'all 0.2s', minHeight:'40px', fontFamily:'inherit',
            }}>
              <LogOut size={15}/> <span className="logout-label">Logout</span>
            </button>
          </div>
        </div>
      </nav>

      {/* Main */}
      <div className="admin-dash-container">

        {/* Section switcher tabs */}
        <div className="admin-dash-tabs">
          {SECTIONS.map(s => (
            <button key={s.key} onClick={() => setActiveSection(s.key)} style={{
              display:'flex', alignItems:'center', gap:'0.5rem',
              padding:'0.6rem 1.25rem', borderRadius:'10px', border:'none',
              background: activeSection === s.key ? s.color : 'none',
              color: activeSection === s.key ? '#fff' : '#64748b',
              fontWeight: 700, fontSize:'0.88rem', cursor:'pointer',
              transition:'all 0.2s', fontFamily:'inherit', minHeight:'40px', flexShrink:0, whiteSpace:'nowrap'
            }}>
              {s.icon} {s.label}
            </button>
          ))}
        </div>

        {loading ? (
          <div style={{ display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', minHeight:'400px', gap:'1rem', color:'#64748b' }}>
            <Loader2 size={40} style={{ animation:'spin 1.5s linear infinite', color:'#0ea5e9' }} />
            <div style={{ fontWeight:700, fontSize:'1.1rem' }}>Loading Dashboard Data...</div>
            <div style={{ fontSize:'0.85rem', opacity:0.7 }}>Connecting to secure database</div>
          </div>
        ) : (
          <>
            {/* Appointments section */}
            {activeSection === 'appointments' && (
              <Section
                key="appointments"
                type="general"
                label="Appointments"
                initialData={allAppointments.filter(a => a.type === 'general')}
                refreshData={fetchAllData}
                isCheckup={false}
                icon={<Stethoscope size={16} color="#0369a1"/>}
              />
            )}

            {/* Checkups section */}
            {activeSection === 'checkups' && (
              <Section
                key="checkups"
                type="checkup"
                label="Lab Tests"
                initialData={allAppointments.filter(a => a.type === 'checkup')}
                refreshData={fetchAllData}
                isCheckup={true}
                icon={<FlaskConical size={16} color="#059669"/>}
              />
            )}

            {/* Test Reports section */}
            {activeSection === 'reports' && (
              <TestReportsSection />
            )}

            {/* Visiting Doctors section */}
            {activeSection === 'visiting' && (
              <VisitingAppointmentsSection />
            )}
          </>
        )}
      </div>
