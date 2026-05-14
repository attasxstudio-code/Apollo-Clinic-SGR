import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  LogOut, Plus, Trash2, CheckCircle, Clock, Phone,
  User, Calendar, ArrowRight, TrendingUp, Star, X,
  ShieldCheck, FlaskConical, Stethoscope,
  FileText, Copy, Send, Upload, Eye, Loader2, LinkIcon,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { sanitizeObject } from '../../utils/security';
import { PRIMARY_PHONE } from '../../config/contact';
import { supabase } from '../../utils/supabase';
import {
  getAppointments as getVisitingAppts,
  updateAppointment as updateVisitingAppt,
  deleteAppointment as deleteVisitingAppt,
  getAllSettings as getVisitingSettings,
  saveDoctorSettings as saveVisitingDrSettings,
} from '../../services/visitingDoctorAppointments';
import { appointmentService } from '../../services/appointmentService';

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

      {/* Doctor info if booked from Doctor Profile */}
      {lead.doctor && (
        <div style={{ marginTop:'0.55rem', display:'flex', alignItems:'center', gap:5, color:'#0369a1', fontSize:'0.76rem', fontWeight:700,
          background:'#eff9ff', border:'1px solid #bae6fd', borderRadius:'8px', padding:'3px 8px', width:'fit-content' }}>
          <Stethoscope size={11}/> {lead.doctor}
          {lead.specialty && <span style={{ color:'#64748b', fontWeight:500 }}>· {lead.specialty}</span>}
        </div>
      )}

      {/* Department info */}
      {!isCheckup && lead.department && (
        <div style={{ marginTop:'0.45rem', display:'flex', alignItems:'center', gap:5, color:'#7c3aed', fontSize:'0.76rem', fontWeight:700,
          background:'#f5f3ff', border:'1px solid #ddd6fe', borderRadius:'8px', padding:'3px 8px', width:'fit-content' }}>
          <Stethoscope size={11}/> {lead.department}
        </div>
      )}

      {/* Lab Test-specific: type (New format) */}
      {isCheckup && lead.mainTestType && (
        <div style={{ marginTop:'0.6rem', display:'flex', flexDirection:'column', gap:'0.2rem' }}>
          <div style={{ display:'flex', alignItems:'center', gap:5, color:'#059669', fontSize:'0.76rem', fontWeight:700 }}>
            <FlaskConical size={11}/> {lead.mainTestType}
          </div>
          <div style={{ display:'flex', alignItems:'center', gap:5, color:'#047857', fontSize:'0.72rem', fontWeight:500, paddingLeft:'16px' }}>
            ↳ {lead.specificTest}
          </div>
        </div>
      )}

      {/* Checkup-specific: type (Old format fallback) */}
      {isCheckup && !lead.mainTestType && lead.checkupType && (
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

      {(lead.date || lead.time) && (
        <div style={{ display:'flex', alignItems:'center', gap:5, marginTop:'0.6rem', color:'#94a3b8', fontSize:'0.76rem' }}>
          <Calendar size={11}/> {lead.date} {lead.time ? `at ${lead.time}` : ''}
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
const Section = ({ type, label, isCheckup, icon, initialData = [], refreshData }) => {
  const [leads, setLeads] = useState(initialData);
  const [showModal, setShowModal] = useState(false);
  const [activeTab, setActiveTab] = useState('All');
  const [newLead, setNewLead] = useState({
    name: '', phone: '', date: '', time: '', department: '',
    mainTestType: '', specificTest: '', checkupType: '', status: 'Pending'
  });

  // Sync with parent data if it changes
  useEffect(() => {
    setLeads(initialData);
  }, [initialData]);

  const advanceStatus = async (id) => {
    const order = ['Pending','Contacted','Confirmed'];
    const lead = leads.find(l => l.id === id);
    if (!lead) return;
    const nextStatus = order[(order.indexOf(lead.status) + 1) % order.length];
    try {
      await appointmentService.updateAppointment(id, { status: nextStatus });
      setLeads(leads.map(l => l.id === id ? { ...l, status: nextStatus } : l));
    } catch (err) {
      console.error('Failed to update appointment status:', err);
    }
  };

  const deleteLead = async (id) => {
    if (!window.confirm(`Delete this ${isCheckup ? 'checkup' : 'appointment'} entry?`)) return;
    try {
      await appointmentService.deleteAppointment(id);
      setLeads(leads.filter(l => l.id !== id));
    } catch (err) {
      console.error('Failed to delete appointment:', err);
    }
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    try {
      let saved;
      if (isCheckup) {
        saved = await appointmentService.saveCheckup({
          name: newLead.name, phone: newLead.phone,
          date: newLead.date, department: newLead.mainTestType || newLead.department,
          notes: newLead.notes || '',
        });
      } else {
        saved = await appointmentService.saveLead({
          name: newLead.name, phone: newLead.phone,
          date: newLead.date, department: newLead.department,
          notes: newLead.notes || '',
          source: 'Admin Manual Entry',
        });
      }
      if (saved) {
        if (refreshData) refreshData();
        else setLeads([saved, ...leads]);
      }
      setShowModal(false);
      setNewLead({ name:'', phone:'', date:'', time:'', department:'', mainTestType:'', specificTest:'', checkupType:'', status:'Pending' });
    } catch (err) {
      console.error('Failed to save manual entry:', err);
    }
  };

  const pending   = leads.filter(l => l.status === 'Pending');
  const contacted = leads.filter(l => l.status === 'Contacted');
  const confirmed = leads.filter(l => l.status === 'Confirmed');
  const todayCount = leads.filter(l => new Date(l.created_at || l.createdAt).toDateString() === new Date().toDateString()).length;

  const TABS = ['All','Pending','Contacted','Confirmed'];
  const filteredByTab = { All:leads, Pending:pending, Contacted:contacted, Confirmed:confirmed };

  const labTestCategories = [
    {
      name: 'Ultrasound / USG',
      tests: ['CD / Color Doppler', 'Abdomen USG', 'Scrotum USG', 'Other USG scans as advised']
    },
    {
      name: 'X-Ray & Radiology Studies',
      tests: ['All X-rays', 'MCU', 'Scanogram', 'MCU / RGU', 'Barium Swallow', 'HSG', 'Sinogram']
    },
    {
      name: 'Cardiac Diagnostics',
      tests: ['Echo', 'ECG', 'UMT', 'Holter', 'ABPM']
    },
    {
      name: 'Sleep, Neuro, ENT & Pulmonary Diagnostics',
      tests: ['Sleep Study', 'Polysomnography', 'EEG', 'Audiometry', 'PFT']
    },
    {
      name: 'Endoscopy & Gastro Diagnostics',
      tests: ['Endoscopy', 'Colonoscopy', 'Sigmoidoscopy']
    },
    {
      name: 'Urology Diagnostics',
      tests: ['Uroflowmetry']
    }
  ];

  return (
    <div>
      {/* Stats row */}
      <div className="admin-stats-grid" style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(120px,1fr))', gap:'0.7rem', marginBottom:'1.35rem' }}>
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
          display:'flex', alignItems:'center', justifyContent:'center',
          zIndex:1000, backdropFilter:'blur(6px)', padding:'1rem',
        }}>
          <div className="admin-modal" onClick={e => e.stopPropagation()} style={{
            background:'#fff', width:'100%', maxWidth:'520px',
            borderRadius:'20px',
            padding:'2rem',
            boxShadow:'0 20px 60px rgba(0,0,0,0.2)',
            position:'relative', overflow:'hidden',
            maxHeight:'90vh', overflowY:'auto',
          }}>

            {/* Header */}
            <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:'1.5rem' }}>
              <div>
                <h3 style={{ color: isCheckup ? '#059669' : '#0369a1', fontWeight:800, margin:'0 0 0.25rem', fontSize:'1.15rem' }}>
                  {isCheckup ? '🔬' : '🗓️'} Add {isCheckup ? 'Checkup' : 'Appointment'}
                </h3>
                <p style={{ color:'#94a3b8', fontSize:'0.82rem', margin:0 }}>Enter patient details manually</p>
              </div>
              <button onClick={() => setShowModal(false)} style={{
                background:'#f1f5f9', border:'none', borderRadius:'10px',
                width:36, height:36, display:'flex', alignItems:'center', justifyContent:'center',
                cursor:'pointer', color:'#64748b', flexShrink:0,
              }}><X size={16}/></button>
            </div>

            <form onSubmit={handleAdd}>
              {/* Patient Name */}
              <div style={{ marginBottom:'0.85rem' }}>
                <label style={{ display:'block', fontWeight:700, fontSize:'0.8rem', color:'#374151', marginBottom:'0.3rem' }}>
                  Patient Full Name *
                </label>
                <input
                  type="text" required maxLength={100} placeholder="e.g. Aisha Bhat"
                  value={newLead.name} onChange={e => setNewLead({...newLead, name: e.target.value})}
                  style={{ width:'100%', padding:'0.75rem 1rem', border:'1.5px solid #cce5f6',
                    borderRadius:'10px', background:'#f0f9ff', fontSize:'0.9rem',
                    fontFamily:'inherit', color:'#0f172a', outline:'none', transition:'all 0.2s',
                    boxSizing:'border-box' }}
                  onFocus={e => { e.target.style.borderColor='#0ea5e9'; e.target.style.background='#fff'; }}
                  onBlur={e => { e.target.style.borderColor='#cce5f6'; e.target.style.background='#f0f9ff'; }}
                />
              </div>

              {/* Phone + Date + Time row */}
              <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'0.75rem', marginBottom:'0.85rem' }}>
                <div>
                  <label style={{ display:'block', fontWeight:700, fontSize:'0.8rem', color:'#374151', marginBottom:'0.3rem' }}>
                    Phone Number *
                  </label>
                  <input
                    type="tel" required maxLength={15} placeholder="+91 XXXXX XXXXX"
                    value={newLead.phone} onChange={e => setNewLead({...newLead, phone: e.target.value})}
                    style={{ width:'100%', padding:'0.75rem 1rem', border:'1.5px solid #cce5f6',
                      borderRadius:'10px', background:'#f0f9ff', fontSize:'0.9rem',
                      fontFamily:'inherit', color:'#0f172a', outline:'none', transition:'all 0.2s',
                      boxSizing:'border-box' }}
                    onFocus={e => { e.target.style.borderColor='#0ea5e9'; e.target.style.background='#fff'; }}
                    onBlur={e => { e.target.style.borderColor='#cce5f6'; e.target.style.background='#f0f9ff'; }}
                  />
                </div>
                <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'0.5rem' }}>
                  <div>
                    <label style={{ display:'block', fontWeight:700, fontSize:'0.8rem', color:'#374151', marginBottom:'0.3rem' }}>
                      Date
                    </label>
                    <input
                      type="date"
                      value={newLead.date} onChange={e => setNewLead({...newLead, date: e.target.value})}
                      style={{ width:'100%', padding:'0.75rem 0.5rem', border:'1.5px solid #cce5f6',
                        borderRadius:'10px', background:'#f0f9ff', fontSize:'0.8rem',
                        fontFamily:'inherit', color:'#0f172a', outline:'none', transition:'all 0.2s',
                        boxSizing:'border-box' }}
                      onFocus={e => { e.target.style.borderColor='#0ea5e9'; e.target.style.background='#fff'; }}
                      onBlur={e => { e.target.style.borderColor='#cce5f6'; e.target.style.background='#f0f9ff'; }}
                    />
                  </div>
                  <div>
                    <label style={{ display:'block', fontWeight:700, fontSize:'0.8rem', color:'#374151', marginBottom:'0.3rem' }}>
                      Time
                    </label>
                    <input
                      type="time"
                      value={newLead.time} onChange={e => setNewLead({...newLead, time: e.target.value})}
                      style={{ width:'100%', padding:'0.75rem 0.5rem', border:'1.5px solid #cce5f6',
                        borderRadius:'10px', background:'#f0f9ff', fontSize:'0.8rem',
                        fontFamily:'inherit', color:'#0f172a', outline:'none', transition:'all 0.2s',
                        boxSizing:'border-box' }}
                      onFocus={e => { e.target.style.borderColor='#0ea5e9'; e.target.style.background='#fff'; }}
                      onBlur={e => { e.target.style.borderColor='#cce5f6'; e.target.style.background='#f0f9ff'; }}
                    />
                  </div>
                </div>
              </div>

              {/* Lab Test Type (only for checkups) */}
              {isCheckup && (
                <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'0.75rem', marginBottom:'0.85rem' }}>
                  <div>
                    <label style={{ display:'block', fontWeight:700, fontSize:'0.8rem', color:'#374151', marginBottom:'0.3rem' }}>
                      Main Test Type *
                    </label>
                    <select
                      value={newLead.mainTestType} onChange={e => setNewLead({...newLead, mainTestType: e.target.value, specificTest: ''})}
                      style={{ width:'100%', padding:'0.75rem 1rem', border:'1.5px solid #cce5f6',
                        borderRadius:'10px', background:'#f0f9ff', fontSize:'0.9rem',
                        fontFamily:'inherit', color:'#0f172a', outline:'none', transition:'all 0.2s',
                        boxSizing:'border-box', appearance:'none', cursor:'pointer' }}
                      onFocus={e => { e.target.style.borderColor='#0ea5e9'; e.target.style.background='#fff'; }}
                      onBlur={e => { e.target.style.borderColor='#cce5f6'; e.target.style.background='#f0f9ff'; }}
                    >
                      <option value="">Select Test Type</option>
                      {labTestCategories.map(c => <option key={c.name} value={c.name}>{c.name}</option>)}
                    </select>
                  </div>
                  <div>
                    <label style={{ display:'block', fontWeight:700, fontSize:'0.8rem', color:'#374151', marginBottom:'0.3rem' }}>
                      Specific Test *
                    </label>
                    <select
                      value={newLead.specificTest} onChange={e => setNewLead({...newLead, specificTest: e.target.value})}
                      disabled={!newLead.mainTestType}
                      style={{ width:'100%', padding:'0.75rem 1rem', border:'1.5px solid #cce5f6',
                        borderRadius:'10px', background:'#f0f9ff', fontSize:'0.9rem',
                        fontFamily:'inherit', color:'#0f172a', outline:'none', transition:'all 0.2s',
                        boxSizing:'border-box', appearance:'none', cursor: newLead.mainTestType ? 'pointer' : 'not-allowed', opacity: newLead.mainTestType ? 1 : 0.6 }}
                      onFocus={e => { e.target.style.borderColor='#0ea5e9'; e.target.style.background='#fff'; }}
                      onBlur={e => { e.target.style.borderColor='#cce5f6'; e.target.style.background='#f0f9ff'; }}
                    >
                      {!newLead.mainTestType ? (
                        <option value="">Select type first</option>
                      ) : (
                        <>
                          <option value="">Select Specific Test</option>
                          {labTestCategories.find(c => c.name === newLead.mainTestType)?.tests.map(t => <option key={t} value={t}>{t}</option>)}
                        </>
                      )}
                    </select>
                  </div>
                </div>
              )}

              {/* Department (only for appointments) */}
              {!isCheckup && (
                <div style={{ marginBottom:'0.85rem' }}>
                  <label style={{ display:'block', fontWeight:700, fontSize:'0.8rem', color:'#374151', marginBottom:'0.3rem' }}>
                    Department / Service
                  </label>
                  <select
                    value={newLead.department} onChange={e => setNewLead({...newLead, department: e.target.value})}
                    style={{ width:'100%', padding:'0.75rem 1rem', border:'1.5px solid #cce5f6',
                      borderRadius:'10px', background:'#f0f9ff', fontSize:'0.9rem',
                      fontFamily:'inherit', color:'#0f172a', outline:'none', transition:'all 0.2s',
                      boxSizing:'border-box', appearance:'none', cursor:'pointer' }}
                    onFocus={e => { e.target.style.borderColor='#0ea5e9'; e.target.style.background='#fff'; }}
                    onBlur={e => { e.target.style.borderColor='#cce5f6'; e.target.style.background='#f0f9ff'; }}
                  >
                    <option value="">Select Department</option>
                    {['Orthopaedics','Paediatrician','Physician','ENT','Cardiologist','Ophthalmologist','Neuro Surgeon','Dentist','Psychologist','Dietician','Urologist','Physiotherapist','Infertility Clinic','General Consultation'].map(d => <option key={d} value={d}>{d}</option>)}
                  </select>
                </div>
              )}

              {/* Status */}
              <div style={{ marginBottom:'1.25rem' }}>
                <label style={{ display:'block', fontWeight:700, fontSize:'0.8rem', color:'#374151', marginBottom:'0.3rem' }}>
                  Status
                </label>
                <select
                  value={newLead.status} onChange={e => setNewLead({...newLead, status: e.target.value})}
                  style={{ width:'100%', padding:'0.75rem 1rem', border:'1.5px solid #cce5f6',
                    borderRadius:'10px', background:'#f0f9ff', fontSize:'0.9rem',
                    fontFamily:'inherit', color:'#0f172a', outline:'none', transition:'all 0.2s',
                    boxSizing:'border-box', appearance:'none', cursor:'pointer' }}
                  onFocus={e => { e.target.style.borderColor='#0ea5e9'; e.target.style.background='#fff'; }}
                  onBlur={e => { e.target.style.borderColor='#cce5f6'; e.target.style.background='#f0f9ff'; }}
                >
                  <option>Pending</option>
                  <option>Contacted</option>
                  <option>Confirmed</option>
                </select>
              </div>

              <div style={{ display:'flex', gap:'0.75rem' }}>
                <button type="button" onClick={() => setShowModal(false)} style={{
                  flex:1, minHeight:'50px', borderRadius:'12px', border:'1.5px solid #e0eef8',
                  background:'#fff', color:'#64748b', fontWeight:600, cursor:'pointer', fontSize:'0.92rem', fontFamily:'inherit',
                }}>Cancel</button>
                <button type="submit" style={{
                  flex:1, minHeight:'50px', borderRadius:'12px', border:'none',
                  background: isCheckup
                    ? 'linear-gradient(135deg,#059669,#10b981)'
                    : 'linear-gradient(135deg,#0369a1,#0ea5e9)',
                  color:'#fff', fontWeight:800, cursor:'pointer', fontSize:'0.92rem',
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
   TEST REPORTS SECTION
══════════════════════════════════════════ */
const REPORT_STATUS = {
  Pending: { color:'#f59e0b', bg:'#fffbeb', border:'#fde68a', icon:<Clock size={13}/> },
  Sent:    { color:'#0ea5e9', bg:'#eff9ff', border:'#bae6fd', icon:<Send size={13}/> },
  Viewed:  { color:'#10b981', bg:'#ecfdf5', border:'#a7f3d0', icon:<Eye size={13}/> },
};

const ALLOWED_FILE_TYPES = ['application/pdf', 'image/jpeg', 'image/jpg', 'image/png'];
const MAX_FILE_MB = 2;

const TestReportsSection = () => {
  const { authFetch } = useAuth();
  const [reports, setReports] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState('');
  const [copyFeedback, setCopyFeedback] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');
  const [loading, setLoading] = useState(true);
  const fileInputRef = useRef(null);

  const [form, setForm] = useState({
    patientName:'', phone:'', dob:'', reportTitle:'',
    reportDate:'', testType:'', notes:'',
  });
  const [selectedFile, setSelectedFile] = useState(null);

  useEffect(() => { loadReports(); }, []);

  const loadReports = async () => {
    setLoading(true);
    console.log('[LoadReports] Starting...');
    try {
      const { data, error } = await supabase
        .from('test_reports')
        .select('*')
        .order('created_at', { ascending: false });
      
      console.log('[LoadReports] Response:', { data: data?.length, error });
      
      if (error) {
        console.error('[LoadReports] Supabase error:', error.message);
        throw error;
      }
      
      const mapped = (data || []).map(r => ({
        id: r.id,
        patientName: r.patient_name,
        phone: r.phone,
        dob: r.dob,
        reportTitle: r.report_title,
        reportDate: r.report_date,
        testType: r.test_type,
        notes: r.notes,
        status: r.status,
        blobUrl: r.blob_url,
        token: r.token,
        createdAt: r.created_at
      }));
      
      console.log('[LoadReports] Loaded reports:', mapped.length);
      setReports(mapped);
    } catch (err) {
      console.error('[LoadReports] Failed to load reports:', err);
      setReports([]);
    } finally {
      setLoading(false);
    }
  };

  const saveReports = async (data) => {
    setReports(data);
  };

  const deleteReportFromSupabase = async (id) => {
    try {
      const { error } = await supabase
        .from('test_reports')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
      
      // Remove from local state
      setReports(reports.filter(r => r.id !== id));
    } catch (err) {
      console.error('Failed to delete report:', err);
    }
  };

  const handleFileSelect = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!ALLOWED_FILE_TYPES.includes(file.type)) {
      setUploadError('Only PDF, JPG, JPEG, and PNG files are allowed.');
      return;
    }
    if (file.size > MAX_FILE_MB * 1024 * 1024) {
      setUploadError(`File too large. Maximum size is ${MAX_FILE_MB}MB.`);
      return;
    }
    setUploadError('');
    setSelectedFile(file);
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    setUploadError('');

    if (!selectedFile) return setUploadError('Please select a file.');
    if (!form.patientName.trim()) return setUploadError('Patient name is required.');
    if (!form.phone.trim()) return setUploadError('Phone number is required.');
    if (!form.dob) return setUploadError('Date of birth is required.');
    if (!form.reportTitle.trim()) return setUploadError('Report title is required.');
    if (!form.reportDate) return setUploadError('Report date is required.');

    setUploading(true);

    try {
      console.log('[Upload] Starting upload...');
      
      // Read file as base64
      const fileData = await new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsDataURL(selectedFile);
      });

      console.log('[Upload] Calling API...');
      const res = await authFetch('/api/reports/upload', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fileData,
          fileName: selectedFile.name,
          patientName: form.patientName.trim(),
          phone: form.phone.trim(),
          dob: form.dob,
          reportTitle: form.reportTitle.trim(),
          reportDate: form.reportDate,
          testType: form.testType.trim(),
          notes: form.notes.trim(),
        }),
      });

      console.log('[Upload] Response status:', res.status);
      const data = await res.json();
      console.log('[Upload] Response data:', data);

      if (!res.ok) {
        throw new Error(data.error || 'Upload failed.');
      }

      if (!data.reportId) {
        console.error('[Upload] No reportId in response!');
        throw new Error('Invalid response - missing report ID');
      }

      // Save to localStorage for dashboard
      const newReport = {
        id: data.reportId,
        token: data.token,
        patientName: form.patientName.trim(),
        phone: form.phone.trim(),
        dob: form.dob,
        reportTitle: form.reportTitle.trim(),
        reportDate: form.reportDate,
        testType: form.testType.trim(),
        notes: form.notes.trim(),
        status: 'Pending',
        createdAt: new Date().toISOString(),
        blobUrl: data.blobUrl,
      };

      // Save to Supabase
      try {
        console.log('[Upload] Saving to Supabase:', {
          id: data.reportId,
          patient_name: form.patientName.trim(),
          report_title: form.reportTitle.trim()
        });
        
        const { data: supabaseData, error } = await supabase.from('test_reports').insert([{
          id: data.reportId,
          patient_name: form.patientName.trim(),
          phone: form.phone.trim(),
          dob: form.dob,
          report_title: form.reportTitle.trim(),
          report_date: form.reportDate,
          test_type: form.testType.trim(),
          notes: form.notes.trim(),
          status: 'Pending',
          blob_url: data.blobUrl,
          token: data.token
        }]);
        
        if (error) {
          console.error('[Upload] Supabase error:', error.message, error.code, error.details);
        } else {
          console.log('[Upload] Saved to Supabase successfully:', supabaseData);
        }
      } catch (err) {
        console.error('[Upload] Failed to save to Supabase:', err);
      }

      saveReports([newReport, ...reports]);

      // Reset form
      setForm({ patientName:'', phone:'', dob:'', reportTitle:'', reportDate:'', testType:'', notes:'' });
      setSelectedFile(null);
      if (fileInputRef.current) fileInputRef.current.value = '';
      setShowModal(false);
    } catch (err) {
      setUploadError(err.message || 'Upload failed. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  const getReportLink = (token) => {
    const base = window.location.origin;
    return `${base}/report/${token}`;
  };

  const getWhatsAppMessage = (report) => {
    const link = getReportLink(report.token);
    return `Hello ${report.patientName},\n\nYour test report from Appolo Clinic Srinagar is ready.\n\n📋 Report: ${report.reportTitle}\n📅 Date: ${report.reportDate}\n\nPlease use the secure link below to access your report:\n${link}\n\nTo protect your privacy, you will need:\n• Your FULL NAME IN CAPITAL LETTERS\n• Your Date of Birth\n\nThis link is confidential. Please do not share it.\n\nAppolo Clinic Srinagar\n📍 Karan Nagar, Near National School\n📞 ${PRIMARY_PHONE}`;
  };

  const openWhatsApp = async (report) => {
    const phone = report.phone.replace(/[\s\-+()]/g, '');
    const phoneNum = phone.startsWith('91') ? phone : `91${phone}`;
    const msg = getWhatsAppMessage(report);
    window.open(`https://wa.me/${phoneNum}?text=${encodeURIComponent(msg)}`, '_blank');

    // Update status to Sent in Supabase
    try {
      await supabase
        .from('test_reports')
        .update({ status: 'Sent' })
        .eq('id', report.id);
    } catch (err) {
      console.error('Failed to update status:', err);
    }

    // Update local
    const updated = reports.map(r =>
      r.id === report.id ? { ...r, status: 'Sent' } : r
    );
    saveReports(updated);
  };

  const copyToClipboard = (text, label) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopyFeedback(label);
      setTimeout(() => setCopyFeedback(''), 2000);
    });
  };

  const handleDeleteReport = async (id) => {
    const confirmed = window.confirm('Delete this report? This cannot be undone.');
    
    if (!confirmed) return;
    
    // Delete from Supabase
    await deleteReportFromSupabase(id);
  };

  const toggleStatus = async (id) => {
    const report = reports.find(r => r.id === id);
    if (!report) return;
    
    const next = report.status === 'Pending' ? 'Sent' : report.status === 'Sent' ? 'Viewed' : 'Pending';
    
    // Update Supabase
    try {
      await supabase
        .from('test_reports')
        .update({ status: next })
        .eq('id', id);
    } catch (err) {
      console.error('Failed to update status:', err);
    }
    
    // Update local
    const updated = reports.map(r => r.id === id ? { ...r, status: next } : r);
    saveReports(updated);
  };

  const filtered = filterStatus === 'All' ? reports : reports.filter(r => r.status === filterStatus);
  const counts = {
    total: reports.length,
    pending: reports.filter(r => r.status === 'Pending').length,
    sent: reports.filter(r => r.status === 'Sent').length,
    viewed: reports.filter(r => r.status === 'Viewed').length,
  };

  const inputStyle = {
    width:'100%', padding:'0.75rem 1rem', border:'1.5px solid #ddd6fe',
    borderRadius:'10px', background:'#faf5ff', fontSize:'0.9rem',
    fontFamily:'inherit', color:'#0f172a', outline:'none', transition:'all 0.2s',
  };

  return (
    <div>
      {/* Stats row */}
      <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(130px, 1fr))', gap:'0.75rem', marginBottom:'1.5rem' }}>
        {[
          { label:'Total', value:counts.total, color:'#7c3aed', bg:'#f5f3ff', border:'#ddd6fe' },
          { label:'Pending', value:counts.pending, color:'#f59e0b', bg:'#fffbeb', border:'#fde68a' },
          { label:'Sent', value:counts.sent, color:'#0ea5e9', bg:'#eff9ff', border:'#bae6fd' },
          { label:'Viewed', value:counts.viewed, color:'#10b981', bg:'#ecfdf5', border:'#a7f3d0' },
        ].map(s => (
          <div key={s.label} style={{
            background:s.bg, borderRadius:'14px', padding:'1rem 1.1rem',
            border:`1.5px solid ${s.border}`, textAlign:'center',
          }}>
            <div style={{ fontSize:'1.5rem', fontWeight:900, color:s.color }}>{s.value}</div>
            <div style={{ fontSize:'0.75rem', fontWeight:600, color:'#64748b', marginTop:'0.15rem' }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Actions bar */}
      <div style={{ display:'flex', gap:'0.75rem', marginBottom:'1.25rem', flexWrap:'wrap', alignItems:'center' }}>
        <button onClick={() => setShowModal(true)} style={{
          display:'flex', alignItems:'center', gap:'0.4rem',
          padding:'0.65rem 1.25rem', borderRadius:'10px',
          background:'linear-gradient(135deg,#7c3aed,#a855f7)',
          color:'#fff', fontWeight:700, fontSize:'0.85rem',
          cursor:'pointer', border:'none', fontFamily:'inherit',
          boxShadow:'0 4px 14px rgba(124,58,237,0.3)',
        }}>
          <Upload size={15} /> Upload Report
        </button>

        {/* Filter */}
        <div style={{ display:'flex', gap:'0.35rem', marginLeft:'auto' }}>
          {['All','Pending','Sent','Viewed'].map(s => (
            <button key={s} onClick={() => setFilterStatus(s)} style={{
              padding:'0.4rem 0.85rem', borderRadius:'8px', border:'none',
              background: filterStatus === s ? '#7c3aed' : '#f5f3ff',
              color: filterStatus === s ? '#fff' : '#7c3aed',
              fontWeight:700, fontSize:'0.78rem', cursor:'pointer',
              fontFamily:'inherit', transition:'all 0.2s',
            }}>
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Copy feedback toast */}
      {copyFeedback && (
        <div style={{
          position:'fixed', bottom:'2rem', right:'2rem', zIndex:9999,
          background:'#065f46', color:'#fff', padding:'0.7rem 1.25rem',
          borderRadius:'12px', fontWeight:700, fontSize:'0.85rem',
          boxShadow:'0 8px 24px rgba(0,0,0,0.15)', animation:'fadeIn 0.3s ease',
        }}>
          ✅ {copyFeedback} copied!
        </div>
      )}

      {/* Reports table */}
      {filtered.length === 0 ? (
        <div style={{
          textAlign:'center', padding:'3rem 1.5rem', borderRadius:'16px',
          background:'#fff', border:'1.5px dashed #ddd6fe', color:'#94a3b8',
        }}>
          <FileText size={40} color="#ddd6fe" style={{ marginBottom:'0.75rem' }} />
          <p style={{ fontWeight:600, color:'#64748b', margin:0 }}>
            {filterStatus === 'All' ? 'No reports uploaded yet' : `No ${filterStatus.toLowerCase()} reports`}
          </p>
          <p style={{ fontSize:'0.82rem', margin:'0.4rem 0 0' }}>
            Click "Upload Report" to add a patient test report.
          </p>
        </div>
      ) : (
        <div style={{ display:'flex', flexDirection:'column', gap:'0.65rem' }}>
          {filtered.map(report => {
            const cfg = REPORT_STATUS[report.status] || REPORT_STATUS.Pending;
            return (
              <div key={report.id} style={{
                background:'#fff', borderRadius:'14px', padding:'1.1rem 1.25rem',
                border:`1.5px solid #ede9fe`,
                boxShadow:'0 2px 8px rgba(124,58,237,0.06)',
                transition:'all 0.25s',
              }}>
                {/* Row 1: Name + Status */}
                <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:'0.5rem' }}>
                  <div style={{ display:'flex', alignItems:'center', gap:'0.6rem', flex:1, minWidth:0 }}>
                    <div style={{
                      width:38, height:38, borderRadius:'50%', flexShrink:0,
                      background:'linear-gradient(135deg,#f5f3ff,#ede9fe)',
                      display:'flex', alignItems:'center', justifyContent:'center',
                    }}>
                      <FileText size={16} color="#7c3aed" />
                    </div>
                    <div style={{ minWidth:0 }}>
                      <div style={{ fontWeight:700, fontSize:'0.92rem', color:'#0f172a',
                        whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis' }}>
                        {report.patientName}
                      </div>
                      <a href={`tel:${report.phone}`} style={{
                        color:'#64748b', fontSize:'0.78rem', display:'flex',
                        alignItems:'center', gap:4, textDecoration:'none',
                      }}>
                        <Phone size={11} /> {report.phone}
                      </a>
                    </div>
                  </div>
                  <div style={{ display:'flex', alignItems:'center', gap:'0.5rem' }}>
                    <button onClick={() => toggleStatus(report.id)} style={{
                      display:'inline-flex', alignItems:'center', gap:4,
                      background:cfg.bg, color:cfg.color, border:`1px solid ${cfg.border}`,
                      borderRadius:'20px', padding:'3px 10px', fontSize:'0.73rem',
                      fontWeight:700, cursor:'pointer', fontFamily:'inherit',
                    }}>
                      {cfg.icon} {report.status}
                    </button>
                    <button 
                      type="button"
                      onClick={() => handleDeleteReport(report.id)}
                      style={{
                        background:'none', border:'none', cursor:'pointer',
                        color:'#cbd5e1', padding:'4px',
                      }}
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>

                {/* Row 2: Report details */}
                <div style={{ display:'flex', flexWrap:'wrap', gap:'0.75rem', fontSize:'0.78rem', color:'#64748b', marginBottom:'0.65rem' }}>
                  <span style={{ display:'flex', alignItems:'center', gap:4 }}>
                    <FileText size={11} /> {report.reportTitle}
                  </span>
                  <span style={{ display:'flex', alignItems:'center', gap:4 }}>
                    <Calendar size={11} /> {report.reportDate}
                  </span>
                  {report.testType && (
                    <span style={{ display:'flex', alignItems:'center', gap:4 }}>
                      <FlaskConical size={11} /> {report.testType}
                    </span>
                  )}
                  <span style={{ display:'flex', alignItems:'center', gap:4, color:'#94a3b8' }}>
                    <Clock size={11} /> {new Date(report.createdAt).toLocaleDateString()}
                  </span>
                </div>

                {/* Row 3: Action buttons */}
                <div style={{ display:'flex', gap:'0.4rem', flexWrap:'wrap' }}>
                  {/* Send via WhatsApp */}
                  <button onClick={() => openWhatsApp(report)} style={{
                    display:'flex', alignItems:'center', gap:'0.3rem',
                    padding:'0.45rem 0.85rem', borderRadius:'8px',
                    background:'linear-gradient(135deg,#25D366,#128C7E)',
                    color:'#fff', fontWeight:700, fontSize:'0.76rem',
                    cursor:'pointer', border:'none', fontFamily:'inherit',
                    boxShadow:'0 2px 8px rgba(37,211,102,0.25)',
                  }}>
                    <Send size={12} /> Send via WhatsApp
                  </button>

                  {/* Copy Link */}
                  <button onClick={() => copyToClipboard(getReportLink(report.token), 'Link')} style={{
                    display:'flex', alignItems:'center', gap:'0.3rem',
                    padding:'0.45rem 0.75rem', borderRadius:'8px',
                    background:'#f5f3ff', color:'#7c3aed',
                    fontWeight:700, fontSize:'0.76rem', cursor:'pointer',
                    border:'1px solid #ddd6fe', fontFamily:'inherit',
                  }}>
                    <LinkIcon size={12} /> Copy Link
                  </button>

                  {/* Copy Message */}
                  <button onClick={() => copyToClipboard(getWhatsAppMessage(report), 'Message')} style={{
                    display:'flex', alignItems:'center', gap:'0.3rem',
                    padding:'0.45rem 0.75rem', borderRadius:'8px',
                    background:'#f0f9ff', color:'#0369a1',
                    fontWeight:700, fontSize:'0.76rem', cursor:'pointer',
                    border:'1px solid #bae6fd', fontFamily:'inherit',
                  }}>
                    <Copy size={12} /> Copy Message
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* ── Upload Modal ── */}
      {showModal && (
        <div style={{
          position:'fixed', inset:0, zIndex:9999,
          background:'rgba(0,0,0,0.5)', backdropFilter:'blur(4px)',
          display:'flex', alignItems:'center', justifyContent:'center',
          padding:'1rem',
        }} onClick={(e) => { if (e.target === e.currentTarget) setShowModal(false); }}>
          <div className="admin-modal" style={{
            background:'#fff', borderRadius:'20px', width:'100%', maxWidth:'520px',
            maxHeight:'90vh', overflow:'auto', padding:'2rem',
            boxShadow:'0 20px 60px rgba(0,0,0,0.2)',
          }}>
            <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'1.5rem' }}>
              <div>
                <h3 style={{ margin:0, color:'#7c3aed', fontWeight:800, fontSize:'1.15rem' }}>
                  📋 Upload Test Report
                </h3>
                <p style={{ margin:'0.25rem 0 0', color:'#94a3b8', fontSize:'0.82rem' }}>
                  Upload a patient report and generate a secure link
                </p>
              </div>
              <button onClick={() => { setShowModal(false); setUploadError(''); }} style={{
                background:'#f1f5f9', border:'none', borderRadius:'10px',
                width:36, height:36, cursor:'pointer', display:'flex',
                alignItems:'center', justifyContent:'center',
              }}>
                <X size={18} color="#64748b" />
              </button>
            </div>

            {uploadError && (
              <div style={{
                background:'#fff1f2', border:'1.5px solid #fecdd3', color:'#be123c',
                padding:'0.75rem 1rem', borderRadius:'10px', marginBottom:'1rem',
                fontSize:'0.82rem', textAlign:'center',
              }}>
                ⚠️ {uploadError}
              </div>
            )}

            <form onSubmit={handleUpload}>
              {/* Patient Name */}
              <div style={{ marginBottom:'0.85rem' }}>
                <label style={{ display:'block', fontWeight:700, fontSize:'0.8rem', color:'#374151', marginBottom:'0.3rem' }}>
                  Patient Full Name *
                </label>
                <input type="text" required maxLength={100} placeholder="e.g. Aisha Bhat"
                  value={form.patientName} onChange={e => setForm({...form, patientName: e.target.value})}
                  style={inputStyle}
                  onFocus={e => { e.target.style.borderColor='#7c3aed'; e.target.style.background='#fff'; }}
                  onBlur={e => { e.target.style.borderColor='#ddd6fe'; e.target.style.background='#faf5ff'; }}
                />
              </div>

              {/* Phone + DOB row */}
              <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'0.75rem', marginBottom:'0.85rem' }}>
                <div>
                  <label style={{ display:'block', fontWeight:700, fontSize:'0.8rem', color:'#374151', marginBottom:'0.3rem' }}>
                    Phone Number *
                  </label>
                  <input type="tel" required maxLength={15} placeholder="+91 XXXXX XXXXX"
                    value={form.phone} onChange={e => setForm({...form, phone: e.target.value})}
                    style={inputStyle}
                    onFocus={e => { e.target.style.borderColor='#7c3aed'; e.target.style.background='#fff'; }}
                    onBlur={e => { e.target.style.borderColor='#ddd6fe'; e.target.style.background='#faf5ff'; }}
                  />
                </div>
                <div>
                  <label style={{ display:'block', fontWeight:700, fontSize:'0.8rem', color:'#374151', marginBottom:'0.3rem' }}>
                    Date of Birth *
                  </label>
                  <input type="date" required
                    value={form.dob} onChange={e => setForm({...form, dob: e.target.value})}
                    style={inputStyle}
                    onFocus={e => { e.target.style.borderColor='#7c3aed'; e.target.style.background='#fff'; }}
                    onBlur={e => { e.target.style.borderColor='#ddd6fe'; e.target.style.background='#faf5ff'; }}
                  />
                </div>
              </div>

              {/* Report Title */}
              <div style={{ marginBottom:'0.85rem' }}>
                <label style={{ display:'block', fontWeight:700, fontSize:'0.8rem', color:'#374151', marginBottom:'0.3rem' }}>
                  Report Title *
                </label>
                <input type="text" required maxLength={200} placeholder="e.g. Complete Blood Count (CBC)"
                  value={form.reportTitle} onChange={e => setForm({...form, reportTitle: e.target.value})}
                  style={inputStyle}
                  onFocus={e => { e.target.style.borderColor='#7c3aed'; e.target.style.background='#fff'; }}
                  onBlur={e => { e.target.style.borderColor='#ddd6fe'; e.target.style.background='#faf5ff'; }}
                />
              </div>

              {/* Report Date + Test Type row */}
              <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'0.75rem', marginBottom:'0.85rem' }}>
                <div>
                  <label style={{ display:'block', fontWeight:700, fontSize:'0.8rem', color:'#374151', marginBottom:'0.3rem' }}>
                    Report Date *
                  </label>
                  <input type="date" required
                    value={form.reportDate} onChange={e => setForm({...form, reportDate: e.target.value})}
                    style={inputStyle}
                    onFocus={e => { e.target.style.borderColor='#7c3aed'; e.target.style.background='#fff'; }}
                    onBlur={e => { e.target.style.borderColor='#ddd6fe'; e.target.style.background='#faf5ff'; }}
                  />
                </div>
                <div>
                  <label style={{ display:'block', fontWeight:700, fontSize:'0.8rem', color:'#374151', marginBottom:'0.3rem' }}>
                    Test Type
                  </label>
                  <input type="text" maxLength={100} placeholder="e.g. Blood Test"
                    value={form.testType} onChange={e => setForm({...form, testType: e.target.value})}
                    style={inputStyle}
                    onFocus={e => { e.target.style.borderColor='#7c3aed'; e.target.style.background='#fff'; }}
                    onBlur={e => { e.target.style.borderColor='#ddd6fe'; e.target.style.background='#faf5ff'; }}
                  />
                </div>
              </div>

              {/* Notes */}
              <div style={{ marginBottom:'0.85rem' }}>
                <label style={{ display:'block', fontWeight:700, fontSize:'0.8rem', color:'#374151', marginBottom:'0.3rem' }}>
                  Notes (Optional)
                </label>
                <textarea rows={2} maxLength={500} placeholder="Optional notes for the admin..."
                  value={form.notes} onChange={e => setForm({...form, notes: e.target.value})}
                  style={{ ...inputStyle, resize:'vertical' }}
                  onFocus={e => { e.target.style.borderColor='#7c3aed'; e.target.style.background='#fff'; }}
                  onBlur={e => { e.target.style.borderColor='#ddd6fe'; e.target.style.background='#faf5ff'; }}
                />
              </div>

              {/* File Upload */}
              <div style={{ marginBottom:'1.25rem' }}>
                <label style={{ display:'block', fontWeight:700, fontSize:'0.8rem', color:'#374151', marginBottom:'0.3rem' }}>
                  Report File (PDF, JPG, PNG — max 2MB) *
                </label>
                <div style={{
                  border:'2px dashed #ddd6fe', borderRadius:'12px', padding:'1.25rem',
                  textAlign:'center', background:'#faf5ff', cursor:'pointer',
                  transition:'all 0.2s',
                }} onClick={() => fileInputRef.current?.click()}>
                  <input ref={fileInputRef} type="file" accept=".pdf,.jpg,.jpeg,.png"
                    onChange={handleFileSelect} style={{ display:'none' }} />
                  <Upload size={24} color="#7c3aed" style={{ marginBottom:'0.5rem' }} />
                  <p style={{ color:'#7c3aed', fontWeight:600, fontSize:'0.85rem', margin:0 }}>
                    {selectedFile ? `📄 ${selectedFile.name}` : 'Click to select a file'}
                  </p>
                  {selectedFile && (
                    <p style={{ color:'#94a3b8', fontSize:'0.75rem', margin:'0.3rem 0 0' }}>
                      {(selectedFile.size / 1024).toFixed(0)} KB · {selectedFile.type}
                    </p>
                  )}
                </div>
              </div>

              {/* Submit */}
              <button type="submit" disabled={uploading} style={{
                width:'100%', minHeight:'50px', borderRadius:'12px', border:'none',
                background: uploading
                  ? 'linear-gradient(135deg,#c4b5fd,#a5b4fc)'
                  : 'linear-gradient(135deg,#7c3aed,#a855f7)',
                color:'#fff', fontWeight:800, fontSize:'0.95rem', cursor: uploading ? 'wait' : 'pointer',
                fontFamily:'inherit', display:'flex', alignItems:'center', justifyContent:'center', gap:'0.5rem',
                boxShadow:'0 4px 16px rgba(124,58,237,0.3)',
              }}>
                {uploading
                  ? <><Loader2 size={16} style={{ animation:'spin 0.8s linear infinite' }} /> Uploading…</>
                  : <><Upload size={16} /> Upload & Generate Secure Link</>
                }
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

/* ══════════════════════════════════════════
   VISITING DOCTORS SECTION
══════════════════════════════════════════ */
const VISITING_DOCTORS_LIST = [
  { slug:'dr-gauri-agarwal',       name:'Dr Gauri Agarwal' },
  { slug:'dr-anindya-mukherjee',   name:'Dr Anindya Mukherjee' },
  { slug:'dr-showkat-nazir-wani',  name:'Dr Showkat Nazir Wani' },
  { slug:'dr-harish-kumar-verma',  name:'Dr Harish Kumar Verma' },
];

const VisitingAppointmentsSection = ({ initialData = [], refreshData }) => {
  // Use initialData directly - no need for separate state that causes re-render loops
  const appts = initialData || [];
  const [settings, setSettings] = useState({});
  const [showSettings, setShowSettings] = useState(false);
  const [filterDoc, setFilterDoc] = useState('All');
  const [filterStatus, setFilterStatus] = useState('All');
  const [filterCycle, setFilterCycle] = useState('All');
  const [search, setSearch] = useState('');

  // Only load settings once on mount
  useEffect(() => {
    setSettings(getVisitingSettings());
  }, []);

  const toggleContacted = async (id) => {
    const a = appts.find(x => x.id === id);
    if (!a) return;
    const isNowConfirmed = a.status !== 'Confirmed';
    try {
      await appointmentService.updateAppointment(id, { 
        status: isNowConfirmed ? 'Confirmed' : 'Pending' 
      });
      if (refreshData) refreshData();
    } catch (err) {
      console.error('Failed to update status:', err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this visiting appointment?')) return;
    try {
      await appointmentService.deleteAppointment(id);
      if (refreshData) refreshData();
    } catch (err) {
      console.error('Failed to delete:', err);
    }
  };

  const openWhatsApp = (a) => {
    const phone = (a.phone || '').replace(/[\s\-+()]/g, '');
    const phoneNum = phone.startsWith('91') ? phone : `91${phone}`;
    const patientName = a.name || a.patientName || 'Patient';
    const doctorName = a.doctor_name || a.doctorName || 'Specialist';
    const msg = `Hello ${patientName}, this is Appolo Clinic Srinagar. We received your visiting appointment request for ${doctorName}. Our team is contacting you to confirm your spot for the upcoming monthly visit.`;
    window.open(`https://wa.me/${phoneNum}?text=${encodeURIComponent(msg)}`, '_blank');
  };

  const handleSettingToggle = (slug, field) => {
    const current = settings[slug] || { currentMonthFull: false, acceptNextMonthBookings: true };
    saveVisitingDrSettings(slug, { [field]: !current[field] });
    setSettings(getVisitingSettings());
  };

  /* Filter logic */
  let filtered = [...appts];
  if (filterDoc !== 'All') filtered = filtered.filter(a => a.doctorSlug === filterDoc || a.doctor_name?.includes(filterDoc));
  if (filterStatus === 'New') filtered = filtered.filter(a => a.status === 'Pending');
  if (filterStatus === 'Confirmed') filtered = filtered.filter(a => a.status === 'Confirmed');
  if (filterCycle === 'Current Month') filtered = filtered.filter(a => (a.bookingCycle || a.notes)?.includes('current-month'));
  if (filterCycle === 'Next Month') filtered = filtered.filter(a => (a.bookingCycle || a.notes)?.includes('next-month'));
  
  if (search.trim()) {
    const q = search.trim().toLowerCase();
    filtered = filtered.filter(a => 
      (a.name || a.patientName || '').toLowerCase().includes(q) || 
      (a.phone || '').includes(q)
    );
  }

  const totalNew = appts.filter(a => a.status === 'Pending').length;
  const totalConfirmed = appts.filter(a => a.status === 'Confirmed').length;
  const currentMonth = appts.filter(a => (a.bookingCycle || a.notes)?.includes('current-month')).length;
  const nextMonth = appts.filter(a => (a.bookingCycle || a.notes)?.includes('next-month')).length;

  const selectStyle = {
    padding:'0.45rem 0.75rem', borderRadius:'8px', border:'1.5px solid #fed7aa',
    background:'#fff', fontSize:'0.8rem', fontFamily:'inherit', fontWeight:600,
    color:'#9a3412', cursor:'pointer', outline:'none', minHeight:36,
  };

  return (
    <div>
      {/* Stats */}
      <div className="admin-stats-grid" style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(120px,1fr))', gap:'0.7rem', marginBottom:'1.35rem' }}>
        {[
          { label:'Total', value:appts.length, color:'#f97316' },
          { label:'New', value:totalNew, color:'#f59e0b' },
          { label:'Confirmed', value:totalConfirmed, color:'#10b981' },
          { label:'Current Month', value:currentMonth, color:'#0ea5e9' },
          { label:'Next Month', value:nextMonth, color:'#6366f1' },
        ].map((s,i) => (
          <div key={i} style={{
            background:'#fff', borderRadius:'12px', padding:'0.9rem 0.85rem', textAlign:'center',
            border:'1.5px solid #fed7aa', borderTop:`4px solid ${s.color}`,
            boxShadow:'0 2px 10px rgba(249,115,22,0.06)',
          }}>
            <div style={{ fontSize:'1.65rem', fontWeight:900, color:'#0f172a', lineHeight:1 }}>{s.value}</div>
            <div style={{ color:'#64748b', fontSize:'0.72rem', fontWeight:600, marginTop:'0.25rem' }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Section header */}
      <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:'1rem', gap:'0.75rem', flexWrap:'wrap' }}>
        <div>
          <h3 style={{ margin:'0 0 0.15rem', color:'#9a3412', fontWeight:800, fontSize:'1.05rem', display:'flex', alignItems:'center', gap:'0.45rem' }}>
            <Calendar size={16} color="#f97316"/> Visiting Doctors Appointments
          </h3>
          <p style={{ margin:0, color:'#94a3b8', fontSize:'0.79rem' }}>Visiting doctor appointment requests from the website</p>
        </div>
        <button onClick={() => setShowSettings(!showSettings)} style={{
          display:'flex', alignItems:'center', gap:'5px',
          background: showSettings ? '#f97316' : '#fff7ed',
          color: showSettings ? '#fff' : '#9a3412',
          border: showSettings ? 'none' : '1.5px solid #fed7aa',
          borderRadius:'10px', padding:'0.5rem 0.9rem', fontWeight:700, fontSize:'0.85rem',
          cursor:'pointer', fontFamily:'inherit', transition:'all 0.2s', minHeight:'40px',
        }}>
          ⚙️ Booking Settings
        </button>
      </div>

      {/* Booking Settings Panel */}
      {showSettings && (
        <div style={{
          background:'#fff7ed', border:'1.5px solid #fed7aa', borderRadius:'16px',
          padding:'1.25rem', marginBottom:'1.5rem',
        }}>
          <h4 style={{ margin:'0 0 1rem', color:'#9a3412', fontWeight:800, fontSize:'0.95rem' }}>Visiting Doctor Booking Settings</h4>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(260px,1fr))', gap:'0.85rem' }}>
            {VISITING_DOCTORS_LIST.map(dr => {
              const s = settings[dr.slug] || { currentMonthFull: false, acceptNextMonthBookings: true };
              return (
                <div key={dr.slug} style={{
                  background:'#fff', borderRadius:'12px', padding:'1rem',
                  border:'1px solid #fed7aa',
                }}>
                  <div style={{ fontWeight:700, fontSize:'0.88rem', color:'#0f172a', marginBottom:'0.75rem' }}>{dr.name}</div>
                  <div style={{ display:'flex', flexDirection:'column', gap:'0.6rem' }}>
                    <label style={{ display:'flex', alignItems:'center', gap:'0.6rem', cursor:'pointer', fontSize:'0.8rem', color:'#374151' }}>
                      <input type="checkbox" checked={s.currentMonthFull} onChange={() => handleSettingToggle(dr.slug, 'currentMonthFull')}
                        style={{ width:18, height:18, accentColor:'#f97316', cursor:'pointer' }}
                      />
                      <span>Mark Current Month Full</span>
                    </label>
                    <label style={{ display:'flex', alignItems:'center', gap:'0.6rem', cursor:'pointer', fontSize:'0.8rem', color:'#374151' }}>
                      <input type="checkbox" checked={s.acceptNextMonthBookings} onChange={() => handleSettingToggle(dr.slug, 'acceptNextMonthBookings')}
                        style={{ width:18, height:18, accentColor:'#10b981', cursor:'pointer' }}
                      />
                      <span>Accept Next Month Bookings</span>
                    </label>
                  </div>
                  <div style={{ marginTop:'0.5rem', fontSize:'0.72rem', color:'#94a3b8' }}>
                    Status: {s.currentMonthFull ? '🔴 Full' : '🟢 Open'}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Filters */}
      <div className="visiting-filters" style={{ display:'flex', gap:'0.5rem', marginBottom:'1rem', flexWrap:'wrap', alignItems:'center' }}>
        <select value={filterDoc} onChange={e => setFilterDoc(e.target.value)} style={selectStyle}>
          <option value="All">All Doctors</option>
          {VISITING_DOCTORS_LIST.map(d => <option key={d.slug} value={d.slug}>{d.name}</option>)}
        </select>
        <select value={filterStatus} onChange={e => setFilterStatus(e.target.value)} style={selectStyle}>
          <option value="All">All Status</option>
          <option value="New">New</option>
          <option value="Confirmed">Confirmed</option>
        </select>
        <select value={filterCycle} onChange={e => setFilterCycle(e.target.value)} style={selectStyle}>
          <option value="All">All Months</option>
          <option value="Current Month">Current Month</option>
          <option value="Next Month">Next Month</option>
        </select>
        <input
          type="text" placeholder="Search name or phone…" value={search}
          onChange={e => setSearch(e.target.value)}
          style={{ ...selectStyle, flex:1, minWidth:160, color:'#0f172a', borderColor:'#e0eef8' }}
        />
      </div>

      {/* Appointments List */}
      {filtered.length === 0 ? (
        <div style={{
          textAlign:'center', color:'#94a3b8', fontSize:'0.88rem',
          padding:'3rem 1rem', borderRadius:'14px',
          border:'1.5px dashed #fed7aa', background:'#fff',
        }}>
          <Calendar size={40} color="#fed7aa" style={{ marginBottom:'0.75rem' }} />
          <p style={{ fontWeight:600, color:'#64748b', margin:0 }}>No visiting doctor appointments yet.</p>
        </div>
      ) : (
        <div style={{ display:'flex', flexDirection:'column', gap:'0.65rem' }}>
          {filtered.map(a => {
            const isConfirmed = a.contacted;
            return (
              <div key={a.id} style={{
                background:'#fff', borderRadius:'14px', padding:'1rem 1.15rem',
                border:`1.5px solid ${isConfirmed ? '#a7f3d0' : '#fed7aa'}`,
                boxShadow:'0 2px 8px rgba(249,115,22,0.06)',
                transition:'all 0.2s',
              }}>
                {/* Row 1: Patient + Status */}
                <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:'0.5rem' }}>
                  <div style={{ display:'flex', alignItems:'center', gap:'0.6rem', flex:1, minWidth:0 }}>
                    <div style={{
                      width:38, height:38, borderRadius:'50%', flexShrink:0,
                      background: isConfirmed ? '#ecfdf5' : '#fff7ed',
                      display:'flex', alignItems:'center', justifyContent:'center',
                      color: isConfirmed ? '#10b981' : '#f97316',
                    }}>
                      <User size={16} />
                    </div>
                    <div style={{ minWidth:0 }}>
                      <div style={{ fontWeight:700, fontSize:'0.92rem', color:'#0f172a',
                        whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis' }}>
                        {a.name || a.patientName}
                      </div>
                      <a href={`tel:${a.phone}`} style={{
                        color:'#64748b', fontSize:'0.78rem', display:'flex',
                        alignItems:'center', gap:4, textDecoration:'none',
                      }}>
                        <Phone size={11} /> {a.phone}
                      </a>
                    </div>
                  </div>
                  <button onClick={() => handleDelete(a.id)} style={{
                    background:'none', border:'none', cursor:'pointer',
                    color:'#cbd5e1', padding:'4px',
                  }}>
                    <Trash2 size={14} />
                  </button>
                </div>

                {/* Row 2: Doctor + Cycle + Date */}
                <div style={{ display:'flex', flexWrap:'wrap', gap:'0.6rem', fontSize:'0.78rem', color:'#64748b', marginBottom:'0.6rem' }}>
                  <span style={{
                    display:'inline-flex', alignItems:'center', gap:4,
                    background:'#fff7ed', color:'#9a3412', border:'1px solid #fed7aa',
                    borderRadius:'8px', padding:'2px 8px', fontWeight:700,
                  }}>
                    <Stethoscope size={11} /> {a.doctor_name || a.doctorName}
                  </span>
                  <span style={{
                    display:'inline-flex', alignItems:'center', gap:4,
                    background: (a.bookingCycle || a.notes)?.includes('next-month') ? '#f5f3ff' : '#eff9ff',
                    color: (a.bookingCycle || a.notes)?.includes('next-month') ? '#6366f1' : '#0369a1',
                    border:`1px solid ${(a.bookingCycle || a.notes)?.includes('next-month') ? '#ddd6fe' : '#bae6fd'}`,
                    borderRadius:'8px', padding:'2px 8px', fontWeight:600,
                  }}>
                    <Calendar size={11} /> {(a.bookingCycle || a.notes)?.includes('next-month') ? 'Next Month' : 'Current Month'}
                  </span>
                  <span style={{ display:'flex', alignItems:'center', gap:4, color:'#94a3b8' }}>
                    <Clock size={11} /> {new Date(a.created_at || a.createdAt).toLocaleDateString()} {new Date(a.created_at || a.createdAt).toLocaleTimeString([], { hour:'2-digit', minute:'2-digit' })}
                  </span>
                </div>

                {/* Row 3: Actions */}
                <div style={{ display:'flex', gap:'0.4rem', flexWrap:'wrap', alignItems:'center' }}>
                  <button onClick={() => toggleContacted(a.id)} style={{
                    display:'flex', alignItems:'center', gap:4,
                    padding:'0.4rem 0.85rem', borderRadius:'8px',
                    background: a.status === 'Confirmed' ? '#ecfdf5' : '#fff7ed',
                    color: a.status === 'Confirmed' ? '#065f46' : '#9a3412',
                    border:`1.5px solid ${a.status === 'Confirmed' ? '#a7f3d0' : '#fed7aa'}`,
                    fontWeight:700, fontSize:'0.76rem', cursor:'pointer', fontFamily:'inherit',
                    transition:'all 0.2s',
                  }}>
                    {a.status === 'Confirmed' ? <><CheckCircle size={13} /> Confirmed</> : <><Clock size={13} /> Mark Contacted</>}
                  </button>
                  <button onClick={() => openWhatsApp(a)} style={{
                    display:'flex', alignItems:'center', gap:'0.3rem',
                    padding:'0.4rem 0.75rem', borderRadius:'8px',
                    background:'linear-gradient(135deg,#25D366,#128C7E)',
                    color:'#fff', fontWeight:700, fontSize:'0.76rem',
                    cursor:'pointer', border:'none', fontFamily:'inherit',
                    boxShadow:'0 2px 8px rgba(37,211,102,0.25)',
                  }}>
                    <Send size={12} /> WhatsApp
                  </button>
                </div>
              </div>
            );
          })}
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
  const [allAppointments, setAllAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchAllData = async () => {
    setLoading(true);
    console.log('[Dashboard] Starting to fetch data...');
    try {
      const data = await appointmentService.getAllAppointments();
      console.log('[Dashboard] Raw data received:', data?.length || 0, 'appointments');
      
      // Normalize data to handle property name differences (Supabase vs Legacy)
      const normalized = (data || []).map(a => ({
        ...a,
        // Ensure name is always available
        name: a.name || a.patientName || a.patient_name || 'Unknown',
        // Ensure phone is always available
        phone: a.phone || a.patient_phone || '',
        // Ensure doctor_name is available
        doctor_name: a.doctor_name || a.doctorName || a.doctor || '',
        // Ensure status is handled
        status: a.status || 'Pending',
        // Ensure created_at is handled
        created_at: a.created_at || a.createdAt || a.createdat || new Date().toISOString()
      }));

      // Log breakdown by type
      const general = normalized.filter(a => a.type === 'general').length;
      const checkup = normalized.filter(a => a.type === 'checkup').length;
      const visiting = normalized.filter(a => a.type === 'visiting').length;
      console.log(`[Dashboard] Breakdown - General: ${general}, Checkup: ${checkup}, Visiting: ${visiting}`);

      setAllAppointments(normalized);
    } catch (err) {
      console.error('[Dashboard] Load failed:', err);
    } finally {
      setLoading(false);
      console.log('[Dashboard] Loading complete');
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
            onMouseEnter={e => e.currentTarget.style.opacity='0.75'}
            onMouseLeave={e => e.currentTarget.style.opacity='1'}
            title="Go to Home Page">
            <div style={{ background:'linear-gradient(135deg,#0ea5e9,#10b981)', borderRadius:'10px', padding:'6px',
              display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
              <img src="/images/ui/logo.webp" alt="Appolo Clinic" height="26" style={{ objectFit:'contain', borderRadius:'5px' }} className="admin-logo-img" />
            </div>
            <div>
              <div style={{ fontWeight:800, fontSize:'0.92rem', lineHeight:1.15,
                background:'linear-gradient(135deg,#0369a1,#047857)',
                WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent' }}>
                Admin Panel
              </div>
              <div style={{ color:'#94a3b8', fontSize:'0.65rem', fontWeight:500 }}>Appolo Clinic Srinagar</div>
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
              <VisitingAppointmentsSection
                initialData={allAppointments.filter(a => {
                  const isVis = a.type === 'visiting';
                  return isVis;
                })}
                refreshData={fetchAllData}
              />
            )}
          </>
        )}
      </div>

      <style>{`
        /* Base Admin Layout */
        .admin-dash-nav {
          background: #fff;
          border-bottom: 1px solid #e0eef8;
          position: sticky;
          top: 0;
          z-index: 100;
          box-shadow: 0 2px 10px rgba(14,165,233,0.05);
        }
        .admin-dash-header {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0.75rem 1.5rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .admin-dash-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 1.5rem 1.5rem 3rem;
        }
        .admin-dash-tabs {
          display: flex;
          gap: 0.5rem;
          margin-bottom: 1.5rem;
          background: #fff;
          border: 1.5px solid #e0eef8;
          border-radius: 14px;
          padding: 0.4rem;
          width: fit-content;
        }

        /* Desktop specific */
        @media (min-width: 769px) {
          .kanban-desktop { display: flex !important; }
          .kanban-mobile  { display: none !important; }
          .mobile-tabs    { display: none !important; }
          .admin-badge    { display: flex !important; }
        }

        /* Mobile Adjustments */
        @media (max-width: 768px) {
          .kanban-desktop { display: none !important; }
          .kanban-mobile  { display: block !important; }
          .mobile-tabs    { display: flex !important; }
          .admin-badge    { display: none !important; }
          .logout-label   { display: none; }
          
          /* Header & Container */
          .admin-dash-header {
            padding: 0.75rem 1rem;
          }
          .admin-dash-container {
            padding: 1.25rem 1rem 4rem;
          }
          
          /* Dashboard Main Tabs - horizontal scroll */
          .admin-dash-tabs {
            width: 100%;
            overflow-x: auto;
            -webkit-overflow-scrolling: touch;
            padding-bottom: 0.2rem; /* space for scrollbar or shadow */
            border-radius: 12px;
          }
          .admin-dash-tabs::-webkit-scrollbar { display: none; }
          .admin-dash-tabs { scrollbar-width: none; }

          /* Filter Pills / Mobile Tabs */
          .mobile-tabs {
            width: 100%;
            overflow-x: auto;
            -webkit-overflow-scrolling: touch;
            flex-wrap: nowrap !important;
            padding-bottom: 0.2rem;
          }
          .mobile-tabs button {
            flex-shrink: 0;
            white-space: nowrap;
          }
          
          /* Visiting Doctors Filters */
          .visiting-filters {
            flex-wrap: nowrap !important;
            overflow-x: auto;
            -webkit-overflow-scrolling: touch;
            padding-bottom: 0.5rem;
          }
          
          /* Stats Grid */
          .admin-stats-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }

          /* Modals */
          .admin-modal {
            padding: 1.5rem !important;
            border-radius: 16px !important;
            max-height: 85vh !important;
          }
          
          /* Typography & Elements */
          h3, h4 { font-size: 1.05rem !important; }
          input, select, button { font-size: 0.9rem !important; }
        }
        
        .mobile-tabs { scrollbar-width: none; }
        .mobile-tabs::-webkit-scrollbar { display: none; }
        .visiting-filters::-webkit-scrollbar { display: none; }
      `}</style>
    </div>
  );
};

export default Dashboard;
