import toast from 'react-hot-toast';
import React, { useState } from 'react';
import {
  ArrowLeft,
  Edit3,
  Star,
  CheckCircle2,
  TrendingUp,
  Smile,
  CalendarDays,
  Clock,
  Shield,
  MoreVertical,
  Mail,
  Zap
} from 'lucide-react';
import { useToast } from '../../components/common/ToastNotification';

const recentWorkOrders = [
  { id: '#WO-89218', client: 'AeroDynamics HQ', date: 'Oct 24, 2023', status: 'COMPLETED' },
  { id: '#WO-89245', client: 'Global Logistics Hub', date: 'Oct 26, 2023', status: 'IN PROGRESS' },
  { id: '#WO-89301', client: 'Quantum Data Center', date: 'Oct 27, 2023', status: 'PENDING' }
];

const assignedTechs = [
  { name: 'Marcus Sterling', role: 'Senior Systems Engineer', image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=80&h=80&q=80' },
  { name: 'Elena Rodriguez', role: 'HVAC Specialist', image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=80&h=80&q=80' },
  { name: 'David Chen', role: 'Diagnostic Expert', image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=80&h=80&q=80' }
];

export default function ServiceProfile({ onClose }) {
  const { addToast } = useToast();
  const [activeSubTab, setActiveSubTab] = useState('Overview');

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-section)' }}>
      
      {/* Breadcrumb & Navigation Back Action */}
      <div style={{ display: 'flex', alignItems: 'center', justifySelf: 'stretch', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: 'var(--muted)', fontWeight: '700' }}>
          <span style={{ cursor: 'pointer' }} onClick={onClose}>Catalog</span>
          <span>&gt;</span>
          <span>Facility Maintenance</span>
          <span>&gt;</span>
          <span style={{ color: 'var(--text)' }}>Service Profile</span>
        </div>
        
        <button
          onClick={onClose}
          style={{
            border: 'none',
            background: 'transparent',
            color: 'var(--primary)',
            fontSize: '13px',
            fontWeight: '700',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '4px'
          }}
          type="button"
        >
          <ArrowLeft size={16} />
          <span>Back to Catalog</span>
        </button>
      </div>

      {/* Main Profile Summary Panel */}
      <div className="panel" style={{ background: '#ffffff', border: '1.5px solid #25108f', borderRadius: '12px', padding: 'var(--spacing-section)', display: 'flex', gap: 'var(--spacing-section)', alignItems: 'center', flexWrap: 'wrap' }}>
        <img
          src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=140&h=140&q=80"
          alt="Industrial HVAC Maintenance"
          style={{ width: '120px', height: '120px', borderRadius: '12px', objectFit: 'cover', border: '1.5px solid #25108f' }}
        />
        
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '8px', minWidth: '240px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
            <h1 style={{ fontSize: '24px', fontWeight: '800', color: 'var(--text)', margin: 0 }}>Industrial HVAC Maintenance</h1>
            <span style={{ fontSize: '9px', fontWeight: '800', color: '#059669', background: '#ecfdf5', padding: '3px 8px', borderRadius: '4px' }}>
              ACTIVE
            </span>
          </div>
          
          <div style={{ fontSize: '13px', color: 'var(--muted)', display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <span>Category: <strong>Critical Infrastructure</strong></span>
            <span>•</span>
            <span>Last updated 2 days ago</span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginTop: '8px', flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '13px', fontWeight: '700', color: '#f59e0b' }}>
              <Star size={16} fill="currentColor" stroke="none" />
              <span>4.9</span>
              <span style={{ color: 'var(--muted)', fontWeight: 'normal' }}>(128 Reviews)</span>
            </div>
            <span style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '12px', color: 'var(--muted)', fontWeight: '700' }}>
              <CheckCircle2 size={16} style={{ color: '#2563eb' }} />
              Enterprise Certified
            </span>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '12px', alignSelf: 'center' }}>
          <button
            style={{
              height: '38px',
              padding: '0 16px',
              background: '#ffffff',
              color: 'var(--text)',
              border: '1.5px solid #25108f',
              borderRadius: '6px',
              fontSize: '13px',
              fontWeight: '700',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
            type="button"
           onClick={(e) => { e.preventDefault(); e.stopPropagation(); addToast("Opening edit form...", "info"); }}>
            <Edit3 size={16} />
            <span>Edit Service</span>
          </button>
          
          <button
            style={{
              height: '38px',
              padding: '0 16px',
              background: 'var(--primary)',
              color: '#ffffff',
              border: 'none',
              borderRadius: '6px',
              fontSize: '13px',
              fontWeight: '700',
              cursor: 'pointer'
            }}
            type="button"
           onClick={(e) => { e.preventDefault(); e.stopPropagation(); addToast("Promotion campaign started!", "success"); }}>
            Promote Service
          </button>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px' }}>
        
        {/* TOTAL BOOKINGS */}
        <div className="panel" style={{ background: '#ffffff', borderRadius: '12px', border: '1.5px solid #25108f', padding: '20px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <span style={{ display: 'block', fontSize: '9px', fontWeight: '800', color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Total Bookings</span>
              <strong style={{ display: 'block', fontSize: '24px', fontWeight: '800', color: 'var(--text)', marginTop: '4px' }}>1,284</strong>
            </div>
            <span style={{ fontSize: '11px', fontWeight: '800', color: '#059669', display: 'flex', alignItems: 'center', gap: '2px' }}>
              <TrendingUp size={14} /> +12.5%
            </span>
          </div>
          {/* Sparkline curve */}
          <div style={{ height: '28px', marginTop: '4px' }}>
            <svg width="100%" height="28" viewBox="0 0 160 28">
              <path d="M 0 20 Q 30 20, 60 12 C 90 24, 120 8, 160 4" fill="none" stroke="#4f46e5" strokeWidth="2" />
            </svg>
          </div>
        </div>

        {/* REVENUE */}
        <div className="panel" style={{ background: '#ffffff', borderRadius: '12px', border: '1.5px solid #25108f', padding: '20px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <span style={{ display: 'block', fontSize: '9px', fontWeight: '800', color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Revenue</span>
              <strong style={{ display: 'block', fontSize: '24px', fontWeight: '800', color: 'var(--text)', marginTop: '4px' }}>$42.8k</strong>
            </div>
            <span style={{ fontSize: '11px', fontWeight: '800', color: '#059669', display: 'flex', alignItems: 'center', gap: '2px' }}>
              <TrendingUp size={14} /> +8.2%
            </span>
          </div>
          {/* Sparkline curve */}
          <div style={{ height: '28px', marginTop: '4px' }}>
            <svg width="100%" height="28" viewBox="0 0 160 28">
              <path d="M 0 22 Q 40 22, 80 14 C 120 22, 140 6, 160 2" fill="none" stroke="#4f46e5" strokeWidth="2" />
            </svg>
          </div>
        </div>

        {/* CUSTOMER SATISFACTION */}
        <div className="panel" style={{ background: '#ffffff', borderRadius: '12px', border: '1.5px solid #25108f', padding: '20px', display: 'flex', justifySelf: 'stretch', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <span style={{ display: 'block', fontSize: '9px', fontWeight: '800', color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Customer Satisfaction</span>
            <strong style={{ display: 'block', fontSize: '24px', fontWeight: '800', color: 'var(--text)', marginTop: '4px' }}>98%</strong>
            <span style={{ display: 'block', fontSize: '11px', color: 'var(--muted)', marginTop: '6px', fontWeight: '700' }}>Stable</span>
          </div>
          <Smile size={32} style={{ color: '#4f46e5' }} />
        </div>

        {/* CANCELLATIONS */}
        <div className="panel" style={{ background: '#ffffff', borderRadius: '12px', border: '1.5px solid #25108f', padding: '20px', display: 'flex', justifySelf: 'stretch', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <span style={{ display: 'block', fontSize: '9px', fontWeight: '800', color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Cancellations</span>
            <strong style={{ display: 'block', fontSize: '24px', fontWeight: '800', color: 'var(--text)', marginTop: '4px' }}>2.1%</strong>
            <span style={{ display: 'block', fontSize: '11px', color: '#dc2626', marginTop: '6px', fontWeight: '800' }}>+0.4%</span>
          </div>
          <CalendarDays size={32} style={{ color: '#ef4444' }} />
        </div>
      </div>

      {/* Internal View Tab Row */}
      <div style={{ display: 'flex', gap: '16px', borderBottom: '1.5px solid #25108f', overflowX: 'auto', whiteSpace: 'nowrap' }}>
        {['Overview', 'Pricing', 'Availability', 'Requirements', 'Team', 'Documentation', 'Reviews'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveSubTab(tab)}
            style={{
              border: 'none',
              background: 'transparent',
              borderBottom: activeSubTab === tab ? '2px solid #25108f' : '2px solid transparent',
              color: activeSubTab === tab ? '#25108f' : 'var(--muted)',
              fontSize: '13px',
              fontWeight: '700',
              padding: '10px 4px',
              cursor: 'pointer',
              marginRight: '8px'
            }}
            type="button"
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Grid Content Layout */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr', lgGridTemplateColumns: '2fr 1fr', gap: 'var(--spacing-section)', alignItems: 'stretch' }}>
        
        {/* Left Columns (Details & Recent Work Orders) */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-section)', flex: 2 }}>
          
          {/* Service Overview Panel */}
          <div className="panel" style={{ background: '#ffffff', border: '1.5px solid #25108f', borderRadius: '12px', padding: 'var(--spacing-section)', display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <h2 style={{ fontSize: '16px', fontWeight: '800', color: 'var(--text)', margin: 0 }}>Service Overview</h2>
            <p style={{ fontSize: '13px', color: 'var(--muted)', margin: 0, lineHeight: '1.6' }}>
              Comprehensive preventive and corrective maintenance for industrial-scale HVAC systems. Our certified technicians specialize in variable refrigerant flow (VRF) systems, centrifugal chillers, and large-scale air handling units. We utilize predictive diagnostic tools to identify potential points of failure before they impact operational uptime.
            </p>
            
            <div style={{ display: 'flex', gap: '32px', flexWrap: 'wrap', borderTop: '1px solid #f1f5f9', paddingTop: '16px', marginTop: '8px' }}>
              <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                <Clock size={20} style={{ color: '#4f46e5' }} />
                <div>
                  <strong style={{ display: 'block', fontSize: '13px', color: 'var(--text)' }}>SLA Response Time</strong>
                  <span style={{ fontSize: '11px', color: 'var(--muted)' }}>Guaranteed within 4 hours</span>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                <Shield size={20} style={{ color: '#4f46e5' }} />
                <div>
                  <strong style={{ display: 'block', fontSize: '13px', color: 'var(--text)' }}>Compliance Status</strong>
                  <span style={{ fontSize: '11px', color: 'var(--muted)' }}>ISO 9001:2015 Verified</span>
                </div>
              </div>
            </div>
          </div>

          {/* Recent Work Orders */}
          <div className="panel" style={{ background: '#ffffff', border: '1.5px solid #25108f', borderRadius: '12px', padding: 'var(--spacing-section)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <h2 style={{ fontSize: '16px', fontWeight: '800', color: 'var(--text)', margin: 0 }}>Recent Work Orders</h2>
              <a href="#view-all-work" onClick={(e) => e.preventDefault()} style={{ fontSize: '12px', color: '#4f46e5', fontWeight: '800', textDecoration: 'none' }}>
                View All
              </a>
            </div>

            <div style={{ overflowX: 'auto' }}>
              <div className="table-responsive-wrapper">
<table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                <thead>
                  <tr style={{ borderBottom: '1.5px solid #25108f' }}>
                    <th style={{ padding: '12px 8px', fontSize: '11px', fontWeight: '800', color: 'var(--muted)', textTransform: 'uppercase' }}>Order ID</th>
                    <th style={{ padding: '12px 8px', fontSize: '11px', fontWeight: '800', color: 'var(--muted)', textTransform: 'uppercase' }}>Client</th>
                    <th style={{ padding: '12px 8px', fontSize: '11px', fontWeight: '800', color: 'var(--muted)', textTransform: 'uppercase' }}>Scheduled Date</th>
                    <th style={{ padding: '12px 8px', fontSize: '11px', fontWeight: '800', color: 'var(--muted)', textTransform: 'uppercase' }}>Status</th>
                    <th style={{ padding: '12px 8px', width: '40px' }} />
                  </tr>
                </thead>
                <tbody>
                  {recentWorkOrders.map((wo) => (
                    <tr key={wo.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                      <td style={{ padding: '14px 8px', fontSize: '13px', fontWeight: '700', color: 'var(--text)' }}>{wo.id}</td>
                      <td style={{ padding: '14px 8px', fontSize: '13px', fontWeight: '700', color: 'var(--text)' }}>{wo.client}</td>
                      <td style={{ padding: '14px 8px', fontSize: '13px', color: 'var(--muted)' }}>{wo.date}</td>
                      <td style={{ padding: '14px 8px' }}>
                        <span
                          style={{
                            fontSize: '10px',
                            fontWeight: '800',
                            padding: '4px 8px',
                            borderRadius: '4px',
                            background:
                              wo.status === 'COMPLETED'
                                ? '#ecfdf5'
                                : wo.status === 'IN PROGRESS'
                                ? '#fffbeb'
                                : '#f1f5f9',
                            color:
                              wo.status === 'COMPLETED'
                                ? '#059669'
                                : wo.status === 'IN PROGRESS'
                                ? '#d97706'
                                : 'var(--muted)'
                          }}
                        >
                          {wo.status}
                        </span>
                      </td>
                      <td style={{ padding: '14px 8px', textAlign: 'center' }}>
                        <button style={{ border: 'none', background: 'transparent', color: 'var(--muted)', cursor: 'pointer' }} type="button" onClick={(e) => { e.preventDefault(); e.stopPropagation(); addToast("Loading recent work orders...", "info"); }}>
                          <MoreVertical size={16} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
</div>
            </div>
          </div>
        </div>

        {/* Right Columns (Metrics, Technicians, Support) */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-section)', flex: 1 }}>
          
          {/* Real-time Performance */}
          <div className="panel" style={{ background: '#ffffff', border: '1.5px solid #25108f', borderRadius: '12px', padding: 'var(--spacing-section)', display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3 style={{ fontSize: '14px', fontWeight: '800', color: 'var(--text)', margin: 0 }}>Real-time Performance</h3>
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#10b981' }} />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', marginBottom: '6px', fontWeight: '700' }}>
                  <span style={{ color: 'var(--muted)' }}>Technician Utilization</span>
                  <span>92%</span>
                </div>
                <div style={{ height: '6px', background: '#f1f5f9', borderRadius: '3px', overflow: 'hidden' }}>
                  <div style={{ width: '92%', height: '100%', background: '#4f46e5' }} />
                </div>
              </div>

              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', marginBottom: '6px', fontWeight: '700' }}>
                  <span style={{ color: 'var(--muted)' }}>Parts Inventory Level</span>
                  <span>64%</span>
                </div>
                <div style={{ height: '6px', background: '#f1f5f9', borderRadius: '3px', overflow: 'hidden' }}>
                  <div style={{ width: '64%', height: '100%', background: '#f59e0b' }} />
                </div>
              </div>
            </div>

            <button
              style={{
                width: '100%',
                height: '38px',
                background: '#ffffff',
                border: '1.5px solid #25108f',
                borderRadius: '6px',
                color: 'var(--text)',
                fontSize: '12px',
                fontWeight: '700',
                cursor: 'pointer',
                marginTop: '4px'
              }}
              type="button"
             onClick={(e) => { e.preventDefault(); e.stopPropagation(); addToast("Generating report, this may take a moment...", "info"); }}>
              Generate Full Report
            </button>
          </div>

          {/* Assigned Lead Technicians */}
          <div className="panel" style={{ background: '#ffffff', border: '1.5px solid #25108f', borderRadius: '12px', padding: 'var(--spacing-section)', display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <h3 style={{ fontSize: '14px', fontWeight: '800', color: 'var(--text)', margin: 0 }}>
              Assigned Lead Technicians
            </h3>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {assignedTechs.map((tech, idx) => (
                <div key={idx} style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                  <img
                    src={tech.image}
                    alt={tech.name}
                    style={{ width: '36px', height: '36px', borderRadius: '50%', objectFit: 'cover' }}
                  />
                  <div style={{ flex: 1 }}>
                    <strong style={{ display: 'block', fontSize: '12px', color: 'var(--text)' }}>{tech.name}</strong>
                    <span style={{ display: 'block', fontSize: '10px', color: 'var(--muted)', marginTop: '2px' }}>{tech.role}</span>
                  </div>
                  
                  <button
                    style={{
                      width: '28px',
                      height: '28px',
                      borderRadius: '6px',
                      border: '1.5px solid #25108f',
                      background: 'transparent',
                      color: 'var(--muted)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer'
                    }}
                    type="button"
                    title="Send Email"
                   onClick={(e) => { e.preventDefault(); e.stopPropagation(); addToast(`Opening email draft to ${tech.name}...`, "info"); }}>
                    <Mail size={14} />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Premium Support */}
          <div className="panel" style={{ background: '#0b1329', color: '#ffffff', borderRadius: '12px', padding: 'var(--spacing-section)', display: 'flex', flexDirection: 'column', gap: '12px', justifySelf: 'stretch', justifyContent: 'space-between', minHeight: '180px', position: 'relative' }}>
            <div>
              <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                <Zap size={16} style={{ color: '#fbbf24' }} fill="#fbbf24" />
                <h3 style={{ fontSize: '14px', fontWeight: '800', margin: 0 }}>Premium Support</h3>
              </div>
              <p style={{ fontSize: '11px', color: 'rgba(255,255,255,0.7)', marginTop: '6px', margin: 0, lineHeight: '1.4' }}>
                Dedicated enterprise concierge available for all high-priority service requirements.
              </p>
            </div>
            
            <button
              style={{
                width: '100%',
                height: '38px',
                background: '#ffffff',
                color: '#0b1329',
                border: 'none',
                borderRadius: '6px',
                fontSize: '12px',
                fontWeight: '800',
                cursor: 'pointer',
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
              }}
              type="button"
             onClick={(e) => { e.preventDefault(); e.stopPropagation(); addToast("Connecting you with your Enterprise Concierge...", "success"); }}>
              Contact Account Manager
            </button>
          </div>

        </div>

      </div>

    </div>
  );
}


