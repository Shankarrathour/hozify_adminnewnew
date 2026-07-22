import { useToast } from '../../components/common/ToastNotification';
import React, { useState } from 'react';
import { Star, Download, Edit3, ArrowUpRight, Map, SlidersHorizontal, Plus, Clock, ShieldAlert, AlertCircle, ChevronRight, History } from 'lucide-react';
import { useApp } from '../../hooks/useApp';
import { ROUTES } from '../../config/routes';
import AdminShell from '../../components/layouts/AdminShell';

const timelineEvents = [
  { time: 'TODAY, 09:45 AM', text: 'New document verified: Compliance Certificate 2024', subtext: 'Verified by Admin System (Auto-Match)', color: '#4f46e5' },
  { time: 'YESTERDAY, 04:20 PM', text: 'Branch Capacity Alert: Bookings reached 95% threshold', subtext: 'Automated system notification triggered', color: '#94a3b8' },
  { time: 'OCT 24, 11:00 AM', text: 'Employee Schedule Updated (12 staff added to Peak Shift)', subtext: 'Updated by Robert Henderson', color: '#94a3b8' }
];

export default function BranchProfile() {
  const { addToast } = useToast();
  const { navigate, currentBranchId } = useApp();
  const [activeSubTab, setActiveSubTab] = useState('Overview');

  const branchId = currentBranchId || 'BR-NM-2024';
  const branchName = branchId === 'BR-90210' ? 'Downtown Logistics Center' :
                     branchId === 'BR-7842' ? 'Uptown Service Hub' :
                     branchId === 'BR-5510' ? 'Industrial Zone East' : 'North Manhattan Logistics Hub';

  const handleSubTabClick = (tab) => {
    setActiveSubTab(tab);
    if (tab === 'Availability') {
      navigate(ROUTES.branchSchedule);
    } else if (tab === 'Service Areas') {
      navigate(ROUTES.serviceAreas);
    }
  };

  return (
    <AdminShell
      activeTab="Branches"
      headerTitle="Branch Manager"
      searchPlaceholder="Search across branches..."
    >
      <div className="branch-profile-wrapper">
        
        {/* Breadcrumb / Back button */}
        <span style={{ fontSize: '11px', color: 'var(--muted)', fontWeight: '700', cursor: 'pointer', display: 'block', marginBottom: '8px' }} onClick={() => navigate(ROUTES.branches)}>
          &lt; Back to Branch Listing
        </span>

        {/* Profile Title Header Block */}
        <div className="panel" style={{ padding: '20px', marginBottom: '24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '8px', background: '#eee9f6', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary)' }}>
                <Map size={24} />
              </div>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <h1 style={{ fontSize: '20px', fontWeight: '800', margin: 0, color: 'var(--text)' }}>{branchName}</h1>
                  <span style={{ fontSize: '9px', fontWeight: '800', color: '#059669', background: '#ecfdf5', padding: '3px 8px', borderRadius: '4px' }}>VERIFIED</span>
                </div>
                <span style={{ fontSize: '12px', color: 'var(--muted)', fontWeight: '700' }}>Code: <strong style={{ color: 'var(--text)' }}>{branchId}</strong> • Sector: <strong style={{ color: 'var(--text)' }}>Last-Mile Distribution</strong></span>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '10px' }}>
              <button className="secondary-action-btn font-bold" type="button" style={{ cursor: 'pointer',  height: '36px' }} onClick={() => addToast('Action performed successfully.', 'success')}>
                <span>Export Data</span>
              </button>
              <button className="primary-action-btn font-bold" type="button" style={{ cursor: 'pointer',  height: '36px', display: 'flex', alignItems: 'center', gap: '6px' }} onClick={() => addToast('Action performed successfully.', 'success')}>
                <Edit3 size={14} />
                <span>Edit Branch</span>
              </button>
            </div>
          </div>

          {/* Profile Metrics mini bars row */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: '16px', marginTop: '20px', paddingTop: '20px', borderTop: '1.5px solid #25108f' }}>
            <div>
              <span style={{ display: 'block', fontSize: '10px', color: 'var(--muted)', fontWeight: '700' }}>Employees</span>
              <strong style={{ display: 'block', fontSize: '18px', color: 'var(--text)', margin: '2px 0' }}>142 <span style={{ fontSize: '11px', color: '#10b981', fontWeight: '700' }}>+4.2%</span></strong>
              <div style={{ height: '3px', background: '#f1ebf8', borderRadius: '1.5px' }}><div style={{ width: '60%', height: '100%', background: 'var(--primary)' }} /></div>
            </div>

            <div>
              <span style={{ display: 'block', fontSize: '10px', color: 'var(--muted)', fontWeight: '700' }}>Active Services</span>
              <strong style={{ display: 'block', fontSize: '18px', color: 'var(--text)', margin: '2px 0' }}>28 <span style={{ fontSize: '11px', color: 'var(--muted)', fontWeight: '700' }}>Stable</span></strong>
              <div style={{ height: '3px', background: '#f1ebf8', borderRadius: '1.5px' }}><div style={{ width: '45%', height: '100%', background: 'var(--primary)' }} /></div>
            </div>

            <div>
              <span style={{ display: 'block', fontSize: '10px', color: 'var(--muted)', fontWeight: '700' }}>Total Bookings</span>
              <strong style={{ display: 'block', fontSize: '18px', color: 'var(--text)', margin: '2px 0' }}>1,240 <span style={{ fontSize: '11px', color: '#10b981', fontWeight: '700' }}>+12%</span></strong>
              <div style={{ height: '3px', background: '#f1ebf8', borderRadius: '1.5px' }}><div style={{ width: '75%', height: '100%', background: 'var(--primary)' }} /></div>
            </div>

            <div>
              <span style={{ display: 'block', fontSize: '10px', color: 'var(--muted)', fontWeight: '700' }}>Monthly Revenue</span>
              <strong style={{ display: 'block', fontSize: '18px', color: 'var(--text)', margin: '2px 0' }}>$84.2k <span style={{ fontSize: '11px', color: '#10b981', fontWeight: '700' }}>+8.4%</span></strong>
              <div style={{ height: '3px', background: '#f1ebf8', borderRadius: '1.5px' }}><div style={{ width: '80%', height: '100%', background: 'var(--primary)' }} /></div>
            </div>

            <div>
              <span style={{ display: 'block', fontSize: '10px', color: 'var(--muted)', fontWeight: '700' }}>Rating</span>
              <strong style={{ display: 'block', fontSize: '18px', color: 'var(--text)', margin: '2px 0', display: 'flex', alignItems: 'center', gap: '4px' }}>
                4.8
                <span style={{ display: 'flex', alignItems: 'center' }}>{[1,2,3,4,5].map(x => <Star key={x} size={10} fill="#eab308" stroke="#eab308" />)}</span>
              </strong>
              <div style={{ height: '3px', background: '#f1ebf8', borderRadius: '1.5px' }}><div style={{ width: '90%', height: '100%', background: 'var(--primary)' }} /></div>
            </div>

            <div>
              <span style={{ display: 'block', fontSize: '10px', color: 'var(--muted)', fontWeight: '700' }}>Completion Rate</span>
              <strong style={{ display: 'block', fontSize: '18px', color: 'var(--text)', margin: '2px 0' }}>99.2% <span style={{ fontSize: '10px', color: '#10b981', fontWeight: '800' }}>Target met</span></strong>
              <div style={{ height: '3px', background: '#f1ebf8', borderRadius: '1.5px' }}><div style={{ width: '99%', height: '100%', background: '#10b981' }} /></div>
            </div>
          </div>
        </div>

        {/* Sub-tab menu selectors */}
        <div style={{ display: 'flex', gap: '16px', borderBottom: '1.5px solid #25108f', marginBottom: '24px', overflowY: 'auto', maxHeight: '400px', whiteSpace: 'nowrap' }}>
          {[
            'Overview',
            'Services',
            'Employees',
            'Bookings',
            'Revenue',
            'Service Areas',
            'Availability',
            'Reviews',
            'Documents'
          ].map((tab) => (
            <button
              key={tab}
              onClick={() => handleSubTabClick(tab)}
              type="button"
              style={{
                background: 'transparent',
                border: 'none',
                borderBottom: activeSubTab === tab ? '2px solid #4f46e5' : '2px solid transparent',
                color: activeSubTab === tab ? '#4f46e5' : 'var(--muted)',
                fontWeight: '700',
                fontSize: '13px',
                padding: '10px 4px',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                marginRight: '8px'
              }}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Render Tab Contents */}
        {activeSubTab === 'Overview' && (
          <div className="fraud-top-grid" style={{ gap: '20px', alignItems: 'stretch' }}>
            
            {/* Left Overview Block */}
            <div style={{ flex: 1.8, display: 'flex', flexDirection: 'column', gap: '20px' }}>
              
              {/* Branch Information */}
              <div className="panel" style={{ padding: 'var(--spacing-section)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                  <h2 style={{ fontSize: '15px', fontWeight: '800', color: 'var(--text)', margin: '0' }}>Branch Information</h2>
                  <a href="#history" onClick={(e) => e.preventDefault()} style={{ color: '#4f46e5', fontWeight: '700', fontSize: '11px', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <History size={12} /> View History
                  </a>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', fontSize: '12px' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    <div>
                      <span style={{ display: 'block', fontSize: '9px', fontWeight: '800', color: 'var(--muted)', textTransform: 'uppercase' }}>Business Parent</span>
                      <strong style={{ color: 'var(--text)', fontSize: '13px' }}>Global Distribution Services Inc.</strong>
                    </div>
                    <div>
                      <span style={{ display: 'block', fontSize: '9px', fontWeight: '800', color: 'var(--muted)', textTransform: 'uppercase' }}>Branch Manager</span>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '4px' }}>
                        <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=60&h=60&q=80" alt="Manager" style={{ width: '24px', height: '24px', borderRadius: '50%', objectFit: 'cover' }} />
                        <strong style={{ color: 'var(--text)' }}>Robert J. Henderson</strong>
                      </div>
                    </div>
                    <div>
                      <span style={{ display: 'block', fontSize: '9px', fontWeight: '800', color: 'var(--muted)', textTransform: 'uppercase' }}>Operational Status</span>
                      <strong style={{ color: 'var(--text)' }}>Full Capacity - 24/7 Operations</strong>
                    </div>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    <div>
                      <span style={{ display: 'block', fontSize: '9px', fontWeight: '800', color: 'var(--muted)', textTransform: 'uppercase' }}>Contact Details</span>
                      <strong style={{ color: 'var(--text)', display: 'block' }}>+1 (212) 555-0198</strong>
                      <strong style={{ color: 'var(--text)', display: 'block', marginTop: '2px' }}>n-manhattan@gdservices.com</strong>
                    </div>
                    <div>
                      <span style={{ display: 'block', fontSize: '9px', fontWeight: '800', color: 'var(--muted)', textTransform: 'uppercase' }}>Location</span>
                      <strong style={{ color: 'var(--text)' }}>285 Fulton St, New York, NY 10007, United States</strong>
                    </div>
                  </div>
                </div>
              </div>

              {/* Recent Operations Timeline */}
              <div className="panel" style={{ padding: 'var(--spacing-section)' }}>
                <h2 style={{ fontSize: '15px', fontWeight: '800', color: 'var(--text)', margin: '0 0 16px' }}>
                  Recent Operations Timeline
                </h2>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', fontSize: '11px', fontWeight: '700' }}>
                  {timelineEvents.map((evt, idx) => (
                    <div key={idx} style={{ display: 'flex', gap: '10px' }}>
                      <span style={{ width: '6px', height: '6px', background: evt.color, borderRadius: '50%', marginTop: '5px' }} />
                      <div>
                        <span style={{ color: 'var(--muted)', display: 'block', textTransform: 'uppercase', fontSize: '9px' }}>{evt.time}</span>
                        <strong style={{ display: 'block', color: 'var(--text)', marginTop: '2px' }}>{evt.text}</strong>
                        <span style={{ color: 'var(--muted)', fontWeight: 'normal' }}>{evt.subtext}</span>
                      </div>
                    </div>
                  ))}
                </div>

                <a href="#audit-log" onClick={(e) => e.preventDefault()} style={{ display: 'block', textAlign: 'center', fontSize: '12px', color: '#4f46e5', fontWeight: '700', textDecoration: 'none', marginTop: '20px', borderTop: '1px solid #f1f5f9', paddingTop: '14px' }}>
                  View Full Audit Log
                </a>
              </div>

            </div>

            {/* Right Overview Block */}
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '20px' }}>
              
              {/* Operational Boundary map */}
              <div className="panel" style={{ padding: '20px' }}>
                <h2 style={{ fontSize: '14px', fontWeight: '800', color: 'var(--text)', margin: '0 0 12px' }}>
                  Operational Boundary
                </h2>

                <div style={{ border: '1.5px solid #25108f', borderRadius: '6px', height: '120px', background: '#f8fafc', position: 'relative', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <svg width="100%" height="100%" viewBox="0 0 200 120" style={{ fill: 'none', stroke: '#cbd5e1', strokeWidth: '1.5' }}>
                    <path d="M 10 20 L 120 15 L 180 80 L 80 110 Z" fill="#4f46e5" fillOpacity="0.05" stroke="#4f46e5" strokeWidth="1.5" />
                    <circle cx="100" cy="55" r="4" fill="#4f46e5" />
                  </svg>
                  <div style={{ position: 'absolute', right: '8px', bottom: '8px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    <button style={{ cursor: 'pointer',  width: '20px', height: '20px', border: '1.5px solid #25108f', background: '#fff', fontSize: '12px', fontWeight: 'bold', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', borderRadius: '3px' }} onClick={() => addToast('Action performed successfully.', 'success')}>+</button>
                    <button style={{ cursor: 'pointer',  width: '20px', height: '20px', border: '1.5px solid #25108f', background: '#fff', fontSize: '12px', fontWeight: 'bold', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', borderRadius: '3px' }} onClick={() => addToast('Action performed successfully.', 'success')}>-</button>
                  </div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '12px', fontSize: '11px', fontWeight: '700' }}>
                  <span style={{ color: 'var(--muted)' }}>Radius Coverage</span>
                  <span>12.5 km</span>
                </div>
                
                <div style={{ display: 'flex', gap: '6px', marginTop: '8px' }}>
                  <span style={{ fontSize: '9px', fontWeight: '800', background: '#f1ebf8', color: 'var(--primary)', padding: '2px 6px', borderRadius: '3px' }}>POLYGON-A1</span>
                  <span style={{ fontSize: '9px', fontWeight: '800', background: '#f1ebf8', color: 'var(--primary)', padding: '2px 6px', borderRadius: '3px' }}>METRO-NORTH</span>
                </div>
              </div>

              {/* Pending Reviews */}
              <div className="panel" style={{ padding: '20px', position: 'relative' }}>
                <h2 style={{ fontSize: '14px', fontWeight: '800', color: 'var(--text)', margin: '0 0 16px' }}>
                  Pending Reviews
                </h2>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  <button style={{ cursor: 'pointer',  display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 12px', border: '1px solid #f1f5f9', borderRadius: '6px', background: '#fff', textAlign: 'left', width: '100%', cursor: 'pointer' }} type="button" onClick={() => addToast('Action performed successfully.', 'success')}>
                    <div>
                      <strong style={{ display: 'block', fontSize: '12px', color: 'var(--text)' }}>Compliance Audit</strong>
                      <span style={{ fontSize: '10px', color: '#ef4444' }}>Expiring in 12 days</span>
                    </div>
                    <ChevronRight size={14} style={{ color: 'var(--muted)' }} />
                  </button>

                  <button style={{ cursor: 'pointer',  display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 12px', border: '1px solid #f1f5f9', borderRadius: '6px', background: '#fff', textAlign: 'left', width: '100%', cursor: 'pointer' }} type="button" onClick={() => addToast('Action performed successfully.', 'success')}>
                    <div>
                      <strong style={{ display: 'block', fontSize: '12px', color: 'var(--text)' }}>Safety Inspection</strong>
                      <span style={{ fontSize: '10px', color: 'var(--muted)', fontWeight: 'normal' }}>Scheduled for Oct 30</span>
                    </div>
                    <ChevronRight size={14} style={{ color: 'var(--muted)' }} />
                  </button>

                  <button style={{ cursor: 'pointer',  display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 12px', border: '1px solid #f1f5f9', borderRadius: '6px', background: '#fff', textAlign: 'left', width: '100%', cursor: 'pointer' }} type="button" onClick={() => addToast('Action performed successfully.', 'success')}>
                    <div>
                      <strong style={{ display: 'block', fontSize: '12px', color: 'var(--text)' }}>Tax Certification</strong>
                      <span style={{ fontSize: '10px', color: '#10b981' }}>Approved - Download available</span>
                    </div>
                    <ChevronRight size={14} style={{ color: 'var(--muted)' }} />
                  </button>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '16px', borderTop: '1px solid #f1f5f9', paddingTop: '12px' }}>
                  <a href="#compliance" onClick={(e) => { e.preventDefault(); navigate(ROUTES.branchCompliance); }} style={{ fontSize: '11px', color: '#4f46e5', fontWeight: '700', textDecoration: 'none' }}>
                    View All Compliance
                  </a>
                  
                  {/* Floating Action Button */}
                  <button style={{ cursor: 'pointer',  width: '32px', height: '32px', borderRadius: '50%', background: '#4f46e5', color: '#fff', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', boxShadow: '0 2px 6px rgba(79, 70, 229, 0.3)' }} type="button" onClick={() => addToast('Action performed successfully.', 'success')}>
                    <Plus size={16} />
                  </button>
                </div>
              </div>

            </div>

          </div>
        )}

      </div>
    </AdminShell>
  );
}


