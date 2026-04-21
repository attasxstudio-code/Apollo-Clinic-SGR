import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  LogOut, Plus, Trash2, CheckCircle, Clock, Phone,
  User, Calendar, ArrowRight, TrendingUp, Star, X,
  ShieldCheck, FlaskConical, Stethoscope,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { sanitizeObject } from '../../utils/security';

/* ══════════════════════════════════════════
   STATUS CONFIG
══════════════════════════════════════════ */
const STATUS = {
  Pending:   { color:'#f59e0b', bg:'#fffbeb', border:'#fde68a', gradBg:'#fffdf5', gradThumb:'linear-gradient(135deg,#f59e0b,#d97706)', next:'Mark Contacted',  icon:<Clock size={14}/> },
  Contacted: { color:'#0ea5e9', bg:'#eff9ff', border:'#bae6fd', gradBg:'#f0f9ff', gradThumb:'linear-gradient(135deg,#0ea5e9,#0369a1)', next:'Mark Confirmed',  icon:<Phone size={14}/> },
  Confirmed: { color:'#10b981', bg:'#ecfdf5', border:'#a7f3d0', gradBg:'#f0fdf8', gradThumb:'linear-gradient(135deg,#10b981,#059669)', next:'Reset to Pending', icon:<CheckCircle size={14}/> },
};

/* ══════════════════════════════════════════
   LEAD CARD (used for both appointments + checkups)
══════════════════════════════════════════ */
const LeadCard = ({ lead, onAdvance, onDelete, isCheckup }) => {
  const [hov, setHov] = useState(false);
  const cfg = STATUS[lead.status];
  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        background: hov ? `linear-gradient(135deg,${cfg.bg},#fff)` : '#fff',
        borderRadius:'14px',
        border:`1.5px solid ${hov ? cfg.color : '#e0eef8'}`,
        padding:'1rem 1.1rem', marginBottom:'0.8rem',
        boxShadow: hov ? `0 10px 28px ${cfg.color}28` : '0 2px 8px rgba(14,165,233,0.06)',
        transition:'all 0.25s ease',
        transform: hov ? 'translateY(-3px)' : 'none',
      }}
    >
      {/* Name + phone */}
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start' }}>
        <div style={{ display:'flex', alignItems:'center', gap:'0.65rem', flex:1, minWidth:0 }}>
          <div style={{
            width:38, height:38, borderRadius:'50%', flexShrink:0,
            background: hov ? cfg.gradThumb : cfg.bg,
            display:'flex', alignItems:'center', justifyContent:'center',
            color: hov ? '#fff' : cfg.color, transition:'all 0.25s',
          }}>
            {isCheckup ? <FlaskConical size={16}/> : <User size={16}/>}
          </div>
          <div style={{ minWidth:0 }}>
            <div style={{ fontWeight:700, fontSize:'0.92rem', color:'#0f172a',
              whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis' }}>
              {lead.name}
            </div>
            <a href={`tel:${lead.phone}`} style={{
              color:'#64748b', fontSize:'0.78rem', marginTop:'1px',
              display:'flex', alignItems:'center', gap:4, textDecoration:'none',
            }}>
              <Phone size={11}/> {lead.phone}
            </a>
          </div>
        </div>
        <button onClick={() => onDelete(lead.id)} style={{
          background:'none', border:'none', cursor:'pointer',
          color: hov ? '#ef4444' : '#cbd5e1', transition:'color 0.2s',
          padding:'4px', minWidth:32, minHeight:32,
          display:'flex', alignItems:'center', justifyContent:'center',
        }}>
          <Trash2 size={15}/>
        </button>
      </div>

      {/* Checkup-specific: type */}
      {isCheckup && lead.checkupType && (
        <div style={{ marginTop:'0.6rem', display:'flex', alignItems:'center', gap:5, color:'#059669', fontSize:'0.76rem', fontWeight:600 }}>
          <FlaskConical size={11}/> {lead.checkupType}
        </div>
      )}

      {/* Notes preview */}
      {lead.notes && (
        <div style={{ marginTop:'0.4rem', color:'#94a3b8', fontSize:'0.75rem',
          whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis' }}>
          📝 {lead.notes}
        </div>
      )}

      {lead.date && (
        <div style={{ display:'flex', alignItems:'center', gap:5, marginTop:'0.6rem', color:'#94a3b8', fontSize:'0.76rem' }}>
          <Calendar size={11}/> {lead.date}
        </div>
      )}

      <div style={{ marginTop:'0.6rem' }}>
        <span style={{
          display:'inline-flex', alignItems:'center', gap:5,
          background:cfg.bg, color:cfg.color, border:`1px solid ${cfg.border}`,
          borderRadius:'20px', padding:'2px 10px', fontSize:'0.73rem', fontWeight:700,
        }}>
          {cfg.icon} {lead.status}
        </span>
      </div>

      <button onClick={() => onAdvance(lead.id)} style={{
        marginTop:'0.75rem', width:'100%', minHeight:'40px',
        padding:'0.4rem 0', borderRadius:'10px',
        border:`1.5px solid ${hov ? cfg.color : cfg.border}`,
        background: hov ? cfg.bg : '#fafcff',
        color:cfg.color, cursor:'pointer', fontSize:'0.78rem', fontWeight:700,
        display:'flex', alignItems:'center', justifyContent:'center', gap:5, transition:'all 0.2s',
        fontFamily:'inherit',
      }}>
        {cfg.next} <ArrowRight size={12}/>
      </button>
    </div>
  );
};

/* ── Kanban Column ── */
const Column = ({ title, items, status, onAdvance, onDelete, isCheckup }) => {
  const cfg = STATUS[status];
  return (
    <div style={{ flex:1, minWidth:'280px', borderRadius:'18px', padding:'1.1rem',
      background:cfg.gradBg, border:`1.5px solid ${cfg.color}28` }}>
      <div style={{ display:'flex', alignItems:'center', gap:'0.5rem', marginBottom:'1rem' }}>
        <div style={{ background:cfg.gradThumb, borderRadius:'9px', width:30, height:30,
          display:'flex', alignItems:'center', justifyContent:'center', color:'#fff', flexShrink:0 }}>
          {cfg.icon}
        </div>
        <h4 style={{ margin:0, color:'#0f172a', fontWeight:800, fontSize:'0.95rem' }}>{title}</h4>
        <span style={{ marginLeft:'auto', background:cfg.gradThumb, color:'#fff',
          borderRadius:'20px', fontSize:'0.72rem', fontWeight:800,
          padding:'2px 10px', minWidth:24, textAlign:'center' }}>
          {items.length}
        </span>
      </div>
      {items.length === 0 ? (
        <div style={{ textAlign:'center', color:'#94a3b8', fontSize:'0.82rem',
          padding:'2rem 1rem', borderRadius:'10px', border:'1.5px dashed #e0eef8', background:'#fff' }}>
          {status === 'Pending' ? '🎉 No pending entries'
            : status === 'Contacted' ? 'None contacted yet' : 'No confirmed yet'}
        </div>
      ) : items.map(lead => (
        <LeadCard key={lead.id} lead={lead} onAdvance={onAdvance} onDelete={onDelete} isCheckup={isCheckup}/>
      ))}
    </div>
  );
};

/* ══════════════════════════════════════════
   SECTION: Appointments or Checkups
══════════════════════════════════════════ */
const Section = ({ storageKey, label, isCheckup, icon }) => {
  const [leads,     setLeads]     = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [activeTab, setActiveTab] = useState('All');
  const [newLead,   setNewLead]   = useState({ name:'', phone:'', date:'', checkupType:'', status:'Pending' });

  useEffect(() => { loadLeads(); }, []);

  const loadLeads = () => {
    const saved = localStorage.getItem(storageKey);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        // Sanitize all string fields when reading from localStorage (prevent stored XSS)
        const sanitized = Array.isArray(parsed) ? parsed.map(sanitizeObject) : [];
        setLeads(sanitized);
      } catch {
        // Corrupted data — reset
        setLeads([]);
        localStorage.setItem(storageKey, JSON.stringify([]));
      }
    } else {
      setLeads([]);
      localStorage.setItem(storageKey, JSON.stringify([]));
    }
  };

  const save = (updated) => {
    setLeads(updated);
    localStorage.setItem(storageKey, JSON.stringify(updated));
  };

  const advanceStatus = (id) => {
    const order = ['Pending','Contacted','Confirmed'];
    save(leads.map(l => l.id === id ? {...l, status: order[(order.indexOf(l.status)+1) % order.length]} : l));
  };

  const deleteLead = (id) => {
    if (window.confirm(`Delete this ${isCheckup ? 'checkup' : 'appointment'} entry?`)) save(leads.filter(l => l.id !== id));
  };

  const handleAdd = (e) => {
    e.preventDefault();
    save([{
      ...newLead,
      id: Date.now(),
      createdAt: new Date().toISOString(),
      source: 'Admin Manual Entry',
    }, ...leads]);
    setShowModal(false);
    setNewLead({ name:'', phone:'', date:'', checkupType:'', status:'Pending' });
  };

  const pending   = leads.filter(l => l.status === 'Pending');
  const contacted = leads.filter(l => l.status === 'Contacted');
  const confirmed = leads.filter(l => l.status === 'Confirmed');
  const todayCount = leads.filter(l => new Date(l.createdAt).toDateString() === new Date().toDateString()).length;

  const TABS = ['All','Pending','Contacted','Confirmed'];
  const filteredByTab = { All:leads, Pending:pending, Contacted:contacted, Confirmed:confirmed };

  const CHECKUP_TYPES = [
    'Basic Health Screen', 'Comprehensive Health Package', 'Cardiac Risk Assessment',
    'Diabetes Screening', 'Thyroid Panel', 'Pulmonary Function Test (PFT)',
    'Blood Tests / Lab Work', 'ECG', 'ECHO', 'Other',
  ];

  return (
    <div>
      {/* Stats row */}
      <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(120px,1fr))', gap:'0.7rem', marginBottom:'1.35rem' }}>
        {[
          { label:`Total ${label}`, value:leads.length,    color:'#0ea5e9' },
          { label:'New Today',      value:todayCount,       color:'#6366f1' },
          { label:'Pending',        value:pending.length,   color:'#f59e0b' },
          { label:'Contacted',      value:contacted.length, color:'#0ea5e9' },
          { label:'Confirmed',      value:confirmed.length, color:'#10b981' },
        ].map((s, i) => (
          <div key={i} style={{
            background:'#fff', borderRadius:'12px', padding:'0.9rem 0.85rem', textAlign:'center',
            border:'1.5px solid #e0eef8', borderTop:`4px solid ${s.color}`,
            boxShadow:'0 2px 10px rgba(14,165,233,0.06)',
          }}>
            <div style={{ fontSize:'1.65rem', fontWeight:900, color:'#0f172a', lineHeight:1 }}>{s.value}</div>
            <div style={{ color:'#64748b', fontSize:'0.72rem', fontWeight:600, marginTop:'0.25rem' }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Section header */}
      <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:'1rem', gap:'1rem', flexWrap:'wrap' }}>
        <div>
          <h3 style={{ margin:'0 0 0.15rem', color:'#0c4a6e', fontWeight:800, fontSize:'1.05rem', display:'flex', alignItems:'center', gap:'0.45rem' }}>
            {icon} {label}
          </h3>
          <p style={{ margin:0, color:'#94a3b8', fontSize:'0.79rem' }}>
            {isCheckup ? 'Health checkup requests from the website form' : 'Appointment requests from the website form'}
          </p>
        </div>
        <button onClick={() => setShowModal(true)} style={{
          display:'flex', alignItems:'center', gap:'5px',
          background:'linear-gradient(135deg,#0369a1,#0ea5e9,#10b981)',
          color:'#fff', border:'none', borderRadius:'10px',
          padding:'0.5rem 0.9rem', fontWeight:700, fontSize:'0.85rem',
          cursor:'pointer', boxShadow:'0 3px 12px rgba(14,165,233,0.3)',
          transition:'all 0.2s', minHeight:'40px', fontFamily:'inherit',
        }}>
          <Plus size={15}/> Add Manually
        </button>
      </div>

      {/* Mobile tabs */}
      <div className="mobile-tabs" style={{ display:'none', gap:'0.5rem', marginBottom:'1.25rem', overflowX:'auto', paddingBottom:'2px' }}>
        {TABS.map(tab => {
          const count = filteredByTab[tab]?.length;
          const cfg = tab !== 'All' ? STATUS[tab] : null;
          return (
            <button key={tab} onClick={() => setActiveTab(tab)} style={{
              flexShrink:0, padding:'0.5rem 1rem', borderRadius:'20px', border:'1.5px solid',
              borderColor: activeTab === tab ? (cfg?.color || '#0ea5e9') : '#e0eef8',
              background:  activeTab === tab ? (cfg?.bg || '#eff9ff') : '#fff',
              color:       activeTab === tab ? (cfg?.color || '#0369a1') : '#64748b',
              fontWeight:700, fontSize:'0.83rem', cursor:'pointer',
              transition:'all 0.2s', minHeight:'38px',
              display:'flex', alignItems:'center', gap:'5px', fontFamily:'inherit',
            }}>
              {tab}
              <span style={{
                background: activeTab === tab ? (cfg?.gradThumb || 'linear-gradient(135deg,#0ea5e9,#0369a1)') : '#e0eef8',
                color: activeTab === tab ? '#fff' : '#94a3b8',
                borderRadius:'10px', padding:'0px 6px', fontSize:'0.72rem', fontWeight:800,
              }}>{count}</span>
            </button>
          );
        })}
      </div>

      {/* Desktop Kanban */}
      <div className="kanban-desktop" style={{ display:'flex', gap:'1.1rem', alignItems:'flex-start' }}>
        <Column title="Pending"   items={pending}   status="Pending"   onAdvance={advanceStatus} onDelete={deleteLead} isCheckup={isCheckup}/>
        <Column title="Contacted" items={contacted} status="Contacted" onAdvance={advanceStatus} onDelete={deleteLead} isCheckup={isCheckup}/>
        <Column title="Confirmed" items={confirmed} status="Confirmed" onAdvance={advanceStatus} onDelete={deleteLead} isCheckup={isCheckup}/>
      </div>

      {/* Mobile list */}
      <div className="kanban-mobile" style={{ display:'none' }}>
        {filteredByTab[activeTab]?.length === 0 ? (
          <div style={{ textAlign:'center', color:'#94a3b8', fontSize:'0.88rem',
            padding:'3rem 1rem', borderRadius:'14px', border:'1.5px dashed #e0eef8', background:'#fff' }}>
            No {activeTab === 'All' ? '' : activeTab.toLowerCase()} entries yet
          </div>
        ) : filteredByTab[activeTab]?.map(lead => (
          <LeadCard key={lead.id} lead={lead} onAdvance={advanceStatus} onDelete={deleteLead} isCheckup={isCheckup}/>
        ))}
      </div>

      {/* Add Modal */}
      {showModal && (
        <div onClick={() => setShowModal(false)} style={{
          position:'fixed', inset:0, background:'rgba(15,23,42,0.55)',
          display:'flex', alignItems:'flex-end', zIndex:1000, backdropFilter:'blur(6px)',
        }}>
          <div onClick={e => e.stopPropagation()} style={{
            background:'#fff', width:'100%',
            borderRadius:'24px 24px 0 0',
            padding:'1.75rem 1.5rem 2rem',
            boxShadow:'0 -8px 40px rgba(14,165,233,0.2)',
            border:'1.5px solid #cce5f6',
            position:'relative', overflow:'hidden',
            maxHeight:'92vh', overflowY:'auto',
          }}>
            <div style={{ position:'absolute', top:0, left:0, right:0, height:'4px',
              background: isCheckup
                ? 'linear-gradient(90deg,#059669,#10b981,#0ea5e9)'
                : 'linear-gradient(90deg,#0369a1,#0ea5e9,#10b981)' }} />
            <div style={{ width:40, height:4, background:'#e0eef8', borderRadius:4, margin:'0 auto 1.5rem' }} />

            <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:'1.25rem' }}>
              <div>
                <h3 style={{ color:'#0c4a6e', fontWeight:800, margin:'0 0 0.2rem', fontSize:'1.2rem' }}>
                  Add {isCheckup ? 'Checkup' : 'Appointment'}
                </h3>
                <p style={{ color:'#94a3b8', fontSize:'0.84rem', margin:0 }}>Enter patient details manually</p>
              </div>
              <button onClick={() => setShowModal(false)} style={{
                background:'#f1f5f9', border:'none', borderRadius:'10px',
                width:36, height:36, display:'flex', alignItems:'center', justifyContent:'center',
                cursor:'pointer', color:'#64748b',
              }}><X size={16}/></button>
            </div>

            <form onSubmit={handleAdd}>
              {[
                { placeholder:'Patient Name', type:'text', field:'name',  required:true  },
                { placeholder:'Phone Number', type:'text', field:'phone', required:true  },
                { placeholder:'Date',         type:'date', field:'date',  required:false },
              ].map(({ placeholder, type, field, required }) => (
                <div key={field} style={{ marginBottom:'1rem' }}>
                  <input
                    className="form-control" type={type} placeholder={placeholder} required={required}
                    value={newLead[field]} onChange={e => setNewLead({...newLead, [field]: e.target.value})}
                    style={{ minHeight:'52px', fontSize:'1rem' }}
                  />
                </div>
              ))}

              {isCheckup && (
                <div style={{ marginBottom:'1rem' }}>
                  <select className="form-control" value={newLead.checkupType}
                    onChange={e => setNewLead({...newLead, checkupType: e.target.value})}
                    style={{ minHeight:'52px', fontSize:'1rem' }}>
                    <option value="">Select Checkup Type</option>
                    {CHECKUP_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
                  </select>
                </div>
              )}

              <div style={{ marginBottom:'1.25rem' }}>
                <select className="form-control" value={newLead.status}
                  onChange={e => setNewLead({...newLead, status: e.target.value})}
                  style={{ minHeight:'52px', fontSize:'1rem' }}>
                  <option>Pending</option>
                  <option>Contacted</option>
                  <option>Confirmed</option>
                </select>
              </div>

              <div style={{ display:'flex', gap:'0.75rem' }}>
                <button type="button" onClick={() => setShowModal(false)} style={{
                  flex:1, minHeight:'52px', borderRadius:'14px', border:'1.5px solid #e0eef8',
                  background:'#fff', color:'#64748b', fontWeight:600, cursor:'pointer', fontSize:'0.95rem', fontFamily:'inherit',
                }}>Cancel</button>
                <button type="submit" style={{
                  flex:1, minHeight:'52px', borderRadius:'14px', border:'none',
                  background: isCheckup
                    ? 'linear-gradient(135deg,#059669,#10b981)'
                    : 'linear-gradient(135deg,#0369a1,#0ea5e9,#10b981)',
                  color:'#fff', fontWeight:800, cursor:'pointer', fontSize:'0.95rem',
                  boxShadow:'0 4px 14px rgba(14,165,233,0.3)', fontFamily:'inherit',
                }}>Save Entry</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

/* ══════════════════════════════════════════
   DASHBOARD
══════════════════════════════════════════ */
const Dashboard = () => {
  const navigate = useNavigate();
  const { admin, logout } = useAuth();
  const [activeSection, setActiveSection] = useState('appointments');

  useEffect(() => {
    if (!admin) { navigate('/admin/login'); }
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
    { key:'checkups',     label:'Health Checkups', icon:<FlaskConical size={15}/>, color:'#059669' },
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
            onMouseEnter={e => e.currentTarget.style.opacity='0.75'}
            onMouseLeave={e => e.currentTarget.style.opacity='1'}
            title="Go to Home Page">
            <div style={{ background:'linear-gradient(135deg,#0ea5e9,#10b981)', borderRadius:'10px', padding:'6px',
              display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
              <img src="/logo.jpg" alt="Apollo Clinic" height="26" style={{ objectFit:'contain', borderRadius:'5px' }}/>
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
            }}
              onMouseEnter={e => { e.currentTarget.style.borderColor='#ef4444'; e.currentTarget.style.color='#ef4444'; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor='#e0eef8'; e.currentTarget.style.color='#64748b'; }}>
              <LogOut size={15}/> <span className="logout-label">Logout</span>
            </button>
          </div>
        </div>
      </nav>

      {/* Main */}
      <div style={{ maxWidth:1200, margin:'0 auto', padding:'1.5rem 1.1rem 3rem' }}>

        {/* Section switcher tabs */}
        <div style={{
          display:'flex', gap:'0.5rem', marginBottom:'1.75rem',
          background:'#fff', border:'1.5px solid #e0eef8', borderRadius:'14px', padding:'0.4rem',
          width:'fit-content',
        }}>
          {SECTIONS.map(s => (
            <button key={s.key} onClick={() => setActiveSection(s.key)} style={{
              display:'flex', alignItems:'center', gap:'0.5rem',
              padding:'0.6rem 1.25rem', borderRadius:'10px', border:'none',
              background: activeSection === s.key ? s.color : 'none',
              color: activeSection === s.key ? '#fff' : '#64748b',
              fontWeight: 700, fontSize:'0.88rem', cursor:'pointer',
              transition:'all 0.2s', fontFamily:'inherit', minHeight:'40px',
            }}>
              {s.icon} {s.label}
            </button>
          ))}
        </div>

        {/* Appointments section */}
        {activeSection === 'appointments' && (
          <Section
            key="appointments"
            storageKey="clinic_leads"
            label="Appointments"
            isCheckup={false}
            icon={<Stethoscope size={16} color="#0369a1"/>}
          />
        )}

        {/* Checkups section */}
        {activeSection === 'checkups' && (
          <Section
            key="checkups"
            storageKey="clinic_checkups"
            label="Health Checkups"
            isCheckup={true}
            icon={<FlaskConical size={16} color="#059669"/>}
          />
        )}
      </div>

      <style>{`
        @media (min-width: 769px) {
          .kanban-desktop { display: flex !important; }
          .kanban-mobile  { display: none !important; }
          .mobile-tabs    { display: none !important; }
          .admin-badge    { display: flex !important; }
        }
        @media (max-width: 768px) {
          .kanban-desktop { display: none !important; }
          .kanban-mobile  { display: block !important; }
          .mobile-tabs    { display: flex !important; }
          .admin-badge    { display: none !important; }
          .logout-label   { display: none; }
        }
        .mobile-tabs { scrollbar-width: none; }
        .mobile-tabs::-webkit-scrollbar { display: none; }
      `}</style>
    </div>
  );
};

export default Dashboard;
