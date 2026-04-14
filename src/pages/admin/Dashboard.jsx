import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogOut, Plus, Trash2, CheckCircle, Clock, Phone, User, Calendar, ArrowRight, TrendingUp, Star } from 'lucide-react';

const Dashboard = () => {
  const navigate = useNavigate();
  const [leads, setLeads] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [newLead, setNewLead] = useState({ name: '', phone: '', date: '', status: 'Pending' });
  const [hoveredCard, setHoveredCard] = useState(null);

  useEffect(() => {
    const isAuth = localStorage.getItem('isAuthenticated');
    if (!isAuth) navigate('/admin/login');
    else loadLeads();
  }, [navigate]);

  const loadLeads = () => {
    const saved = localStorage.getItem('clinic_leads');
    if (saved) {
      setLeads(JSON.parse(saved));
    } else {
      const mock = [
        { id: 1, name: 'Aisha Bhat',   phone: '919000000001', date: '2025-04-20', status: 'Contacted', createdAt: new Date().toISOString() },
        { id: 2, name: 'Tariq Ahmed',  phone: '919000000002', date: '2025-04-21', status: 'Pending',   createdAt: new Date().toISOString() },
        { id: 3, name: 'Noor Fatima',  phone: '919000000003', date: '2025-04-19', status: 'Confirmed', createdAt: new Date().toISOString() },
      ];
      setLeads(mock);
      localStorage.setItem('clinic_leads', JSON.stringify(mock));
    }
  };

  const save = (updated) => { setLeads(updated); localStorage.setItem('clinic_leads', JSON.stringify(updated)); };

  const advanceStatus = (id) => {
    const order = ['Pending', 'Contacted', 'Confirmed'];
    save(leads.map(l => l.id === id ? { ...l, status: order[(order.indexOf(l.status) + 1) % order.length] } : l));
  };

  const deleteLead = (id) => {
    if (window.confirm('Delete this inquiry?')) save(leads.filter(l => l.id !== id));
  };

  const handleAddLead = (e) => {
    e.preventDefault();
    save([{ ...newLead, id: Date.now(), createdAt: new Date().toISOString() }, ...leads]);
    setShowModal(false);
    setNewLead({ name: '', phone: '', date: '', status: 'Pending' });
  };

  const pending   = leads.filter(l => l.status === 'Pending');
  const contacted = leads.filter(l => l.status === 'Contacted');
  const confirmed = leads.filter(l => l.status === 'Confirmed');
  const todayCount = leads.filter(l => new Date(l.createdAt).toDateString() === new Date().toDateString()).length;

  const STATUS = {
    Pending:   { color: '#f59e0b', bg: '#fffbeb', border: '#fde68a', gradBg: '#fffdf5', gradThumb: 'linear-gradient(135deg,#f59e0b,#d97706)', next: 'Mark Contacted' },
    Contacted: { color: '#0ea5e9', bg: '#eff9ff', border: '#bae6fd', gradBg: '#f0f9ff', gradThumb: 'linear-gradient(135deg,#0ea5e9,#0369a1)', next: 'Mark Confirmed' },
    Confirmed: { color: '#10b981', bg: '#ecfdf5', border: '#a7f3d0', gradBg: '#f0fdf8', gradThumb: 'linear-gradient(135deg,#10b981,#059669)', next: 'Reset to Pending' },
  };

  const STATS = [
    { label: 'Total Leads',  value: leads.length,      icon: <TrendingUp size={18}/>, color: '#0ea5e9' },
    { label: 'New Today',    value: todayCount,         icon: <Star size={18}/>,       color: '#6366f1' },
    { label: 'Pending',      value: pending.length,     icon: <Clock size={18}/>,      color: '#f59e0b' },
    { label: 'Contacted',    value: contacted.length,   icon: <Phone size={18}/>,      color: '#0ea5e9' },
    { label: 'Confirmed',    value: confirmed.length,   icon: <CheckCircle size={18}/>,color: '#10b981' },
  ];

  const LeadCard = ({ lead }) => {
    const cfg = STATUS[lead.status];
    const isHov = hoveredCard === lead.id;
    return (
      <div
        onMouseEnter={() => setHoveredCard(lead.id)}
        onMouseLeave={() => setHoveredCard(null)}
        style={{
          background: isHov ? `linear-gradient(135deg,${cfg.bg},#fff)` : '#fff',
          borderRadius: '14px',
          border: `1.5px solid ${isHov ? cfg.color : '#e0eef8'}`,
          padding: '1.1rem 1.2rem',
          marginBottom: '0.85rem',
          boxShadow: isHov ? `0 10px 28px ${cfg.color}28` : '0 2px 8px rgba(14,165,233,0.06)',
          transition: 'all 0.25s ease',
          transform: isHov ? 'translateY(-3px)' : 'none',
        }}
      >
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start' }}>
          <div style={{ display:'flex', alignItems:'center', gap:'0.65rem' }}>
            <div style={{
              width:38, height:38, borderRadius:'50%',
              background: isHov ? cfg.gradThumb : cfg.bg,
              display:'flex', alignItems:'center', justifyContent:'center',
              color: isHov ? '#fff' : cfg.color, flexShrink:0, transition:'all 0.25s',
            }}>
              <User size={16} />
            </div>
            <div>
              <div style={{ fontWeight:700, fontSize:'0.92rem', color:'#0f172a' }}>{lead.name}</div>
              <div style={{ color:'#64748b', fontSize:'0.78rem', marginTop:'1px', display:'flex', alignItems:'center', gap:4 }}>
                <Phone size={11} /> {lead.phone}
              </div>
            </div>
          </div>
          <button onClick={() => deleteLead(lead.id)} style={{
            background:'none', border:'none', cursor:'pointer',
            color: isHov ? '#ef4444' : '#cbd5e1', transition:'color 0.2s', padding:'2px',
          }}><Trash2 size={14} /></button>
        </div>

        {lead.date && (
          <div style={{ display:'flex', alignItems:'center', gap:5, marginTop:'0.65rem', color:'#94a3b8', fontSize:'0.76rem' }}>
            <Calendar size={11} /> {lead.date}
          </div>
        )}

        <button onClick={() => advanceStatus(lead.id)} style={{
          marginTop:'0.85rem', width:'100%', padding:'0.45rem 0', borderRadius:'9px',
          border:`1.5px solid ${isHov ? cfg.color : cfg.border}`,
          background: isHov ? cfg.bg : '#fafcff',
          color: cfg.color, cursor:'pointer', fontSize:'0.76rem', fontWeight:700,
          display:'flex', alignItems:'center', justifyContent:'center', gap:5,
          transition:'all 0.2s',
        }}>
          {cfg.next} <ArrowRight size={12} />
        </button>
      </div>
    );
  };

  const Column = ({ title, items, status }) => {
    const cfg = STATUS[status];
    return (
      <div style={{
        flex:1, minWidth:0, borderRadius:'18px', padding:'1.2rem',
        background: cfg.gradBg, border:`1.5px solid ${cfg.color}28`,
      }}>
        <div style={{ display:'flex', alignItems:'center', gap:'0.5rem', marginBottom:'1rem' }}>
          <div style={{ background: cfg.gradThumb, borderRadius:'9px', width:30, height:30,
            display:'flex', alignItems:'center', justifyContent:'center', color:'#fff', flexShrink:0 }}>
            {status === 'Pending'   && <Clock size={14}/>}
            {status === 'Contacted' && <Phone size={14}/>}
            {status === 'Confirmed' && <CheckCircle size={14}/>}
          </div>
          <h4 style={{ margin:0, color:'#0f172a', fontWeight:800, fontSize:'0.95rem' }}>{title}</h4>
          <span style={{
            marginLeft:'auto', background: cfg.gradThumb, color:'#fff',
            borderRadius:'20px', fontSize:'0.72rem', fontWeight:800,
            padding:'1px 10px', minWidth:24, textAlign:'center',
          }}>{items.length}</span>
        </div>
        {items.length === 0 ? (
          <div style={{ textAlign:'center', color:'#94a3b8', fontSize:'0.82rem',
            padding:'2rem 1rem', borderRadius:'10px', border:'1.5px dashed #e0eef8', background:'#fff' }}>
            {status === 'Pending' ? '🎉 No pending inquiries' : status === 'Contacted' ? 'No contacted inquiries yet' : 'No confirmed appointments yet'}
          </div>
        ) : items.map(lead => <LeadCard key={lead.id} lead={lead} />)}
      </div>
    );
  };

  return (
    <div style={{ background:'linear-gradient(180deg,#f0f9ff 0%,#f8fafc 100%)', minHeight:'100vh' }}>

      {/* Navbar */}
      <nav style={{
        background:'rgba(255,255,255,0.92)', backdropFilter:'blur(18px)',
        borderBottom:'1px solid rgba(14,165,233,0.12)',
        padding:'0.9rem 2rem',
        display:'flex', justifyContent:'space-between', alignItems:'center',
        position:'sticky', top:0, zIndex:100,
        boxShadow:'0 2px 18px rgba(14,165,233,0.1)',
      }}>
        <div onClick={() => navigate('/')} style={{ display:'flex', alignItems:'center', gap:'0.7rem', cursor:'pointer', transition:'opacity 0.2s' }}
          onMouseEnter={e => e.currentTarget.style.opacity='0.75'}
          onMouseLeave={e => e.currentTarget.style.opacity='1'}
          title="Go to Home Page">
          <div style={{ background:'linear-gradient(135deg,#0ea5e9,#10b981)', borderRadius:'10px', padding:'6px',
            display:'flex', alignItems:'center', justifyContent:'center' }}>
            <img src="/logo.jpg" alt="HomeHeal" height="28" style={{ objectFit:'contain', borderRadius:'5px' }} />
          </div>
          <div>
            <div style={{ fontWeight:800, fontSize:'0.95rem', lineHeight:1.15,
              background:'linear-gradient(135deg,#0369a1,#047857)',
              WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent' }}>Admin Panel</div>
            <div style={{ color:'#94a3b8', fontSize:'0.68rem', fontWeight:500 }}>HomeHeal Clinic</div>
          </div>
        </div>

        <button onClick={() => { localStorage.removeItem('isAuthenticated'); navigate('/admin/login'); }}
          style={{
            display:'flex', alignItems:'center', gap:'6px',
            background:'none', border:'1.5px solid #e0eef8',
            borderRadius:'10px', padding:'0.45rem 1rem',
            color:'#64748b', fontWeight:600, fontSize:'0.85rem',
            cursor:'pointer', transition:'all 0.2s',
          }}
          onMouseEnter={e => { e.currentTarget.style.borderColor='#ef4444'; e.currentTarget.style.color='#ef4444'; }}
          onMouseLeave={e => { e.currentTarget.style.borderColor='#e0eef8'; e.currentTarget.style.color='#64748b'; }}>
          <LogOut size={15} /> Logout
        </button>
      </nav>

      <div style={{ maxWidth:1200, margin:'0 auto', padding:'2rem 1.5rem' }}>

        {/* Stats */}
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(160px,1fr))', gap:'1rem', marginBottom:'2rem' }}>
          {STATS.map((s, i) => (
            <div key={i} style={{
              background:'#fff', borderRadius:'16px', padding:'1.25rem 1rem', textAlign:'center',
              border:'1.5px solid #e0eef8', borderTop:`4px solid ${s.color}`,
              boxShadow:'0 2px 10px rgba(14,165,233,0.06)', transition:'all 0.25s',
            }}
              onMouseEnter={e => { e.currentTarget.style.transform='translateY(-4px)'; e.currentTarget.style.boxShadow=`0 10px 28px ${s.color}28`; }}
              onMouseLeave={e => { e.currentTarget.style.transform='translateY(0)'; e.currentTarget.style.boxShadow='0 2px 10px rgba(14,165,233,0.06)'; }}>
              <div style={{ color:s.color, marginBottom:'0.4rem' }}>{s.icon}</div>
              <div style={{ fontSize:'1.9rem', fontWeight:900, color:'#0f172a', lineHeight:1 }}>{s.value}</div>
              <div style={{ color:'#64748b', fontSize:'0.78rem', fontWeight:600, marginTop:'0.3rem' }}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* Action Row */}
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'1.5rem' }}>
          <div>
            <h3 style={{ margin:0, color:'#0c4a6e', fontWeight:800, fontSize:'1.15rem' }}>Patient Inquiries</h3>
            <p style={{ margin:'2px 0 0', color:'#94a3b8', fontSize:'0.8rem' }}>Track and manage all appointment requests</p>
          </div>
          <button onClick={() => setShowModal(true)} style={{
            display:'flex', alignItems:'center', gap:'6px',
            background:'linear-gradient(135deg,#0369a1,#0ea5e9,#10b981)',
            color:'#fff', border:'none', borderRadius:'12px',
            padding:'0.6rem 1.3rem', fontWeight:700, fontSize:'0.9rem',
            cursor:'pointer', boxShadow:'0 4px 14px rgba(14,165,233,0.3)',
            transition:'all 0.25s',
          }}
            onMouseEnter={e => { e.currentTarget.style.transform='translateY(-2px) scale(1.02)'; e.currentTarget.style.boxShadow='0 8px 22px rgba(14,165,233,0.4)'; }}
            onMouseLeave={e => { e.currentTarget.style.transform='none'; e.currentTarget.style.boxShadow='0 4px 14px rgba(14,165,233,0.3)'; }}>
            <Plus size={16} /> Add Inquiry
          </button>
        </div>

        {/* Kanban */}
        <div style={{ display:'flex', gap:'1.2rem', alignItems:'flex-start', flexWrap:'wrap' }}>
          <Column title="Pending"   items={pending}   status="Pending"   />
          <Column title="Contacted" items={contacted} status="Contacted" />
          <Column title="Confirmed" items={confirmed} status="Confirmed" />
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div onClick={() => setShowModal(false)} style={{
          position:'fixed', inset:0, background:'rgba(15,23,42,0.55)',
          display:'flex', alignItems:'center', justifyContent:'center',
          zIndex:1000, backdropFilter:'blur(6px)',
        }}>
          <div onClick={e => e.stopPropagation()} style={{
            background:'#fff', borderRadius:'20px', padding:'2.25rem',
            width:'100%', maxWidth:'430px', margin:'1rem',
            boxShadow:'0 24px 60px rgba(14,165,233,0.2)',
            border:'1.5px solid #cce5f6',
            position:'relative', overflow:'hidden',
          }}>
            {/* gradient top bar */}
            <div style={{ position:'absolute', top:0, left:0, right:0, height:'4px',
              background:'linear-gradient(90deg,#0369a1,#0ea5e9,#10b981)' }} />
            <h3 style={{ color:'#0c4a6e', fontWeight:800, marginBottom:'0.25rem' }}>Log Inquiry Manually</h3>
            <p style={{ color:'#94a3b8', fontSize:'0.84rem', marginBottom:'1.5rem' }}>Enter patient details below</p>
            <form onSubmit={handleAddLead}>
              <div className="form-group">
                <input className="form-control" type="text" placeholder="Patient Name" required
                  value={newLead.name} onChange={e => setNewLead({...newLead, name: e.target.value})} />
              </div>
              <div className="form-group">
                <input className="form-control" type="text" placeholder="Phone Number" required
                  value={newLead.phone} onChange={e => setNewLead({...newLead, phone: e.target.value})} />
              </div>
              <div className="form-group">
                <input className="form-control" type="date"
                  value={newLead.date} onChange={e => setNewLead({...newLead, date: e.target.value})} />
              </div>
              <div className="form-group">
                <select className="form-control" value={newLead.status}
                  onChange={e => setNewLead({...newLead, status: e.target.value})}>
                  <option>Pending</option>
                  <option>Contacted</option>
                  <option>Confirmed</option>
                </select>
              </div>
              <div style={{ display:'flex', gap:'0.75rem', marginTop:'0.5rem' }}>
                <button type="button" onClick={() => setShowModal(false)} style={{
                  flex:1, padding:'0.7rem', borderRadius:'12px', border:'1.5px solid #e0eef8',
                  background:'#fff', color:'#64748b', fontWeight:600, cursor:'pointer', fontSize:'0.9rem',
                }}>Cancel</button>
                <button type="submit" style={{
                  flex:1, padding:'0.7rem', borderRadius:'12px', border:'none',
                  background:'linear-gradient(135deg,#0369a1,#0ea5e9,#10b981)',
                  color:'#fff', fontWeight:700, cursor:'pointer', fontSize:'0.9rem',
                }}>Save Inquiry</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
