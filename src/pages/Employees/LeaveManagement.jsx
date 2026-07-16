import React, { useState } from 'react';
import { Search, SlidersHorizontal, Download, ChevronLeft, ChevronRight, CheckCircle2, ShieldAlert, Ban, Trash2 } from 'lucide-react';
import { useToast } from '../../components/common/ToastNotification';

import Select from "../../components/ui/Select";

const leaveRequests = [
  { id: 'emp_1', name: 'John Doe', role: 'Senior Developer', type: 'SICK LEAVE', typeClass: 'sick', duration: 'Oct 24 - Oct 26 (3 Days)', reason: 'Severe seasonal flu and high fever.', status: 'Pending', statusClass: 'pending', initials: 'JD', bg: '#f1ebf8', color: 'var(--primary)', isOnLeave: true },
  { id: 'emp_2', name: 'Sarah Smith', role: 'UI Designer', type: 'ANNUAL', typeClass: 'annual', duration: 'Nov 12 - Nov 20 (9 Days)', reason: 'Pre-planned family vacation to Greece.', status: 'Approved', statusClass: 'active', initials: 'SS', bg: '#ecfdf5', color: '#059669', isOnLeave: true },
  { id: 'emp_3', name: 'Michael Chen', role: 'Accountant', type: 'BEREAVEMENT', typeClass: 'bereavement', duration: 'Oct 25 - Oct 25 (1 Day)', reason: 'Personal emergency / Family matter.', status: 'Pending', statusClass: 'pending', initials: 'MC', bg: '#fee2e2', color: '#ef4444', isOnLeave: true },
  { id: 'emp_4', name: 'Elena Rodriguez', role: 'Marketing Lead', type: 'ANNUAL', typeClass: 'annual', duration: 'Nov 01 - Nov 05 (5 Days)', reason: 'Moving houses and settling in.', status: 'Rejected', statusClass: 'suspended', initials: 'ER', bg: '#e0f2fe', color: '#0284c7', isOnLeave: false }
];

export default function LeaveManagement() {
  const { addToast } = useToast();
  const [search, setSearch] = useState('');
  const [requests, setRequests] = useState(leaveRequests);
  
  // लीव रिमार्क्स को हैंडल करने के लिए स्टेट
  const [employeeRemarks, setEmployeeRemarks] = useState({});

  const [isApplyModalOpen, setApplyModalOpen] = useState(false);

  const executeStatusTrigger = (employeeId, name, action) => {
    if (action === 'DELETE') {
      setRequests(requests.filter(r => r.id !== employeeId));
      addToast(`Success: Leave request for ${name} deleted.`, "success");
      return;
    }

    let nextStatus = '';
    let nextStatusClass = '';

    if (action === 'APPROVE') {
      nextStatus = 'Approved';
      nextStatusClass = 'active';
    } else if (action === 'REJECT') {
      nextStatus = 'Rejected';
      nextStatusClass = 'suspended';
    } else if (action === 'PENDING') {
      nextStatus = 'Pending';
      nextStatusClass = 'pending';
    }

    setRequests(requests.map(r => 
      r.id === employeeId 
        ? { ...r, status: nextStatus, statusClass: nextStatusClass } 
        : r
    ));

    const remark = employeeRemarks[employeeId] || '';
    const remarkMsg = remark ? ` with justification: "${remark}"` : '';
    
    addToast(`Success: Status changed to ${nextStatus} for ${name}${remarkMsg}!`, "success");
  };

  const syncRemarkState = (employeeId, value) => {
    setEmployeeRemarks(prev => ({
      ...prev,
      [employeeId]: value
    }));
  };

  const filteredRequests = requests.filter(r =>
    r.name.toLowerCase().includes(search.toLowerCase()) ||
    r.reason.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="leave-management-flow" style={{ paddingBottom: '40px' }}>
      {isApplyModalOpen && (
        <>
          <div style={{ position: 'fixed', inset: 0, background: 'rgba(15, 23, 42, 0.4)', backdropFilter: 'blur(4px)', zIndex: 999 }} onClick={() => setApplyModalOpen(false)} />
          <div style={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', background: '#fff', padding: 'var(--spacing-section)', borderRadius: '12px', zIndex: 1000, width: '400px', boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1)' }}>
            <h2 style={{ fontSize: '18px', fontWeight: '800', marginBottom: '16px', color: 'var(--text)' }}>Apply for Leave</h2>
            <div style={{ marginBottom: '16px' }}>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: '800', color: 'var(--muted)', marginBottom: '6px' }}>LEAVE TYPE</label>
              <Select
                style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1.5px solid #25108f', fontSize: '13px', outline: 'none' }}
                options={[{
                  label: "Annual Leave",
                  value: "Annual Leave"
                }, {
                  label: "Sick Leave",
                  value: "Sick Leave"
                }, {
                  label: "Bereavement",
                  value: "Bereavement"
                }, {
                  label: "Unpaid Leave",
                  value: "Unpaid Leave"
                }]} />
            </div>
            <div style={{ marginBottom: '16px', display: 'flex', gap: '12px' }}>
              <div style={{ flex: 1 }}>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: '800', color: 'var(--muted)', marginBottom: '6px' }}>START DATE</label>
                <input type="date" style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1.5px solid #25108f', fontSize: '13px', outline: 'none' }} />
              </div>
              <div style={{ flex: 1 }}>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: '800', color: 'var(--muted)', marginBottom: '6px' }}>END DATE</label>
                <input type="date" style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1.5px solid #25108f', fontSize: '13px', outline: 'none' }} />
              </div>
            </div>
            <div style={{ marginBottom: '24px' }}>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: '800', color: 'var(--muted)', marginBottom: '6px' }}>REASON / JUSTIFICATION</label>
              <textarea placeholder="Please provide details for your leave request..." style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1.5px solid #25108f', fontSize: '13px', minHeight: '80px', resize: 'vertical', outline: 'none' }}></textarea>
            </div>
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
              <button onClick={() => setApplyModalOpen(false)} style={{ padding: '8px 16px', borderRadius: '6px', border: '1.5px solid #25108f', background: '#fff', color: 'var(--text)', cursor: 'pointer', fontSize: '13px', fontWeight: '700' }}>Cancel</button>
              <button onClick={() => { addToast("Leave application submitted successfully!", "success"); setApplyModalOpen(false); }} style={{ padding: '8px 16px', borderRadius: '6px', border: 'none', background: '#4f46e5', color: '#fff', cursor: 'pointer', fontSize: '13px', fontWeight: '700' }}>Submit Application</button>
            </div>
          </div>
        </>
      )}
      {/* Title Header */}
      <div className="partners-page-header">
        <div>
          <h1 className="page-title">Leave Management</h1>
          <p className="page-subtitle">Configure leave requests, holiday schedules, and tracking indices.</p>
        </div>
        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
          <div className="dash-search" style={{ width: '260px', margin: 0 }}>
            <Search size={18} />
            <input
              placeholder="Search leave requests..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              aria-label="Search leave requests by name or reason"
            />
          </div>
          <button 
            onClick={() => setApplyModalOpen(true)}
            className="primary-action-btn font-bold cursor-pointer" 
            style={{ height: '34px', padding: '0 16px', background: '#4f46e5', color: '#fff', borderRadius: '6px', border: 'none', display: 'flex', alignItems: 'center', gap: '6px' }}
          >
            Apply Leave
          </button>
        </div>
      </div>
      {/* KPI Cards Row */}
      <section className="kpi-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', marginBottom: '24px', gap: '16px' }}>
        {/* Pending Requests */}
        <div 
          onClick={() => addToast("Card clicked: Pending leave requests details", "success")}
          className="panel kpi-card" 
          style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', padding: '16px', minHeight: '80px', background: '#fff', border: '1.5px solid #25108f', borderRadius: '12px', cursor: 'pointer', marginBottom: 0 }}
        >
          <div>
            <span style={{ fontSize: '9px', fontWeight: '800', color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.5px', display: 'block' }}>Pending Requests</span>
            <strong style={{ display: 'block', fontSize: '20px', margin: '4px 0 2px', color: 'var(--text)' }}>24</strong>
            <span style={{ fontSize: '10px', color: '#ef4444', fontWeight: '800' }}>↗ +12% vs last month</span>
          </div>
          <span style={{ fontSize: '9px', padding: '3px 6px', background: '#e0e7ff', color: '#4f46e5', borderRadius: '4px', fontWeight: '800' }}>LIVE</span>
        </div>

        {/* Active Leaves */}
        <div 
          onClick={() => addToast("Card clicked: Active leaves today list", "success")}
          className="panel kpi-card" 
          style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', padding: '16px', minHeight: '80px', background: '#fff', border: '1.5px solid #25108f', borderRadius: '12px', cursor: 'pointer', marginBottom: 0 }}
        >
          <div>
            <span style={{ fontSize: '9px', fontWeight: '800', color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.5px', display: 'block' }}>Active Leaves</span>
            <strong style={{ display: 'block', fontSize: '20px', margin: '4px 0 2px', color: 'var(--text)' }}>42</strong>
            <span style={{ fontSize: '10px', color: '#10b981', fontWeight: '800' }}>↘ -5% vs last month</span>
          </div>
          <span style={{ fontSize: '9px', padding: '3px 6px', background: '#f8fafc', color: 'var(--muted)', borderRadius: '4px', border: '1.5px solid #25108f', fontWeight: '800' }}>TODAY</span>
        </div>

        {/* Approval Rate */}
        <div 
          onClick={() => addToast("Card clicked: Leave approval rate analysis", "success")}
          className="panel kpi-card" 
          style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', padding: '16px', minHeight: '80px', background: '#fff', border: '1.5px solid #25108f', borderRadius: '12px', cursor: 'pointer', marginBottom: 0 }}
        >
          <div>
            <span style={{ fontSize: '9px', fontWeight: '800', color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.5px', display: 'block' }}>Approval Rate</span>
            <strong style={{ display: 'block', fontSize: '20px', margin: '4px 0 2px', color: 'var(--text)' }}>94%</strong>
            <span style={{ fontSize: '10px', color: '#059669', fontWeight: '800' }}>✓ Stable trend</span>
          </div>
        </div>

        {/* Staff on Floor */}
        <div 
          onClick={() => addToast("Card clicked: Present staff count details", "success")}
          className="panel kpi-card" 
          style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', padding: '16px', minHeight: '80px', background: '#fff', border: '1.5px solid #25108f', borderRadius: '12px', cursor: 'pointer', marginBottom: 0 }}
        >
          <div>
            <span style={{ fontSize: '9px', fontWeight: '800', color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.5px', display: 'block' }}>Staff on Floor</span>
            <strong style={{ display: 'block', fontSize: '20px', margin: '4px 0 2px', color: 'var(--text)' }}>186</strong>
            <span style={{ fontSize: '10px', color: 'var(--muted)', fontWeight: '700' }}>out of 228 total</span>
          </div>
        </div>
      </section>
      {/* Recent Leave Requests Table */}
      <section className="panel partner-directory-panel" style={{ padding: 'var(--spacing-section)', marginBottom: '24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px' }}>
          <h2 style={{ fontSize: '16px', fontWeight: '700', margin: '0' }}>Recent Leave Requests</h2>
          <div style={{ display: 'flex', gap: '12px' }}>
            <button 
              onClick={() => addToast("Opened leave requests filter view", "success")}
              className="secondary-action-btn cursor-pointer" 
              style={{ height: '32px' }} 
              type="button"
            >
              <SlidersHorizontal size={14} style={{ marginRight: '4px' }} />
              <span>Filter</span>
            </button>
            <button 
              onClick={() => addToast("Exporting leave records report as CSV...", "success")}
              className="secondary-action-btn cursor-pointer" 
              style={{ height: '32px' }} 
              type="button"
            >
              <Download size={14} style={{ marginRight: '4px' }} />
              <span>Export CSV</span>
            </button>
          </div>
        </div>

        <div className="table-wrap">
          <div className="table-responsive-wrapper">
<table className="partner-table">
            <thead>
              <tr>
                <th>EMPLOYEE</th>
                <th>LEAVE TYPE</th>
                <th>DURATION</th>
                <th>REASON</th>
                <th>STATUS</th>
                <th style={{ width: '220px', textAlign: 'right' }}>ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {filteredRequests.map((row, index) => (
                <tr 
                  key={row.id || index} 
                  onClick={() => addToast(`Reviewing leave detail timeline for ${row.name}`, "success")}
                  className="partner-row-clickable"
                >
                  <td style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '14px 20px' }}>
                    <span style={{ width: '28px', height: '28px', borderRadius: '50%', backgroundColor: row.bg, color: row.color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px', fontWeight: '800' }}>
                      {row.initials}
                    </span>
                    <div>
                      <strong style={{ fontSize: '13px', display: 'block' }}>{row.name}</strong>
                      <span style={{ fontSize: '11px', color: 'var(--muted)' }}>{row.role}</span>
                    </div>
                  </td>
                  <td>
                    <span style={{ fontSize: '10px', fontWeight: '800', letterSpacing: '0.5px' }}>{row.type}</span>
                  </td>
                  <td style={{ fontSize: '12px', color: 'var(--muted)' }}>{row.duration}</td>
                  <td style={{ maxWidth: '280px', overflow: 'hidden', textOverflow: 'ellipsis', fontSize: '13px' }}>
                    {row.reason}
                  </td>
                  <td>
                    <span
                      className="status-badge"
                      style={{
                        fontSize: '10px',
                        fontWeight: '800',
                        color: row.statusClass === 'active' ? '#059669' : row.statusClass === 'pending' ? '#d97706' : '#ef4444',
                        background: row.statusClass === 'active' ? '#ecfdf5' : row.statusClass === 'pending' ? '#fef3c7' : '#fee2e2',
                      }}
                    >
                      {row.status}
                    </span>
                  </td>
                  
                  {/* UPDATED ACTIONS COLUMN WITH INSTANT ICONS & REMARK TEXTBOX */}
                  <td onClick={(e) => e.stopPropagation()} style={{ textAlign: 'right' }}>
                    <div style={{ 
                      display: 'flex', 
                      flexDirection: 'column', 
                      gap: '6px', 
                      alignItems: 'flex-end',
                      width: '100%' 
                    }}>
                      {/* Action Buttons Panel */}
                      <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
                        {/* APPROVE */}
                        <button 
                          type="button"
                          onClick={() => executeStatusTrigger(row.id, row.name, 'APPROVE')}
                          title="Approve Leave"
                          style={{ border: '1px solid #bbf7d0', background: '#f0fdf4', cursor: 'pointer', color: '#16a34a', padding: '6px', borderRadius: '6px', display: 'flex' }}
                        >
                          <CheckCircle2 size={15} strokeWidth={2.5} />
                        </button>

                        {/* PENDING */}
                        <button 
                          type="button"
                          onClick={() => executeStatusTrigger(row.id, row.name, 'PENDING')}
                          title="Mark as Pending"
                          style={{ border: '1px solid #fed7aa', background: '#fff7ed', cursor: 'pointer', color: '#ea580c', padding: '6px', borderRadius: '6px', display: 'flex' }}
                        >
                          <ShieldAlert size={15} strokeWidth={2.5} />
                        </button>

                        {/* REJECT */}
                        <button 
                          type="button"
                          onClick={() => executeStatusTrigger(row.id, row.name, 'REJECT')}
                          title="Reject Leave"
                          style={{ border: '1px solid #fecaca', background: '#fef2f2', cursor: 'pointer', color: '#dc2626', padding: '6px', borderRadius: '6px', display: 'flex' }}
                        >
                          <Ban size={15} strokeWidth={2.5} />
                        </button>

                        {/* DELETE */}
                        <button 
                          type="button"
                          onClick={() => executeStatusTrigger(row.id, row.name, 'DELETE')}
                          title="Delete Request"
                          style={{ border: '1px solid #e2e8f0', background: '#f8fafc', cursor: 'pointer', color: '#4b5563', padding: '6px', borderRadius: '6px', display: 'flex' }}
                        >
                          <Trash2 size={15} strokeWidth={2.5} />
                        </button>
                      </div>

                      {/* Dynamic Textbox for Leave Justification */}
                      {row.isOnLeave && (
                        <div style={{ width: '100%', maxWidth: '180px', marginTop: '2px' }}>
                          <input
                            type="text"
                            placeholder="Leave justification..."
                            value={employeeRemarks[row.id] || ''}
                            onChange={(e) => syncRemarkState(row.id, e.target.value)}
                            style={{
                              width: '100%',
                              padding: '5px 8px',
                              fontSize: '11px',
                              border: '1px solid #cbd5e1',
                              borderRadius: '4px',
                              outline: 'none',
                              backgroundColor: '#ffffff',
                              color: '#334155'
                            }}
                          />
                        </div>
                      )}
                    </div>
                  </td>

                </tr>
              ))}
              {filteredRequests.length === 0 && (
                <tr>
                  <td colSpan="6" style={{ textAlign: 'center', padding: 'var(--spacing-section)', color: 'var(--muted)' }}>No matching leave requests found.</td>
                </tr>
              )}
            </tbody>
          </table>
</div>
        </div>

        {/* Pagination footer */}
        <div className="directory-table-footer">
          <span className="footer-results-text">Showing {filteredRequests.length} of {requests.length} requests</span>
          <div className="pagination-wrap">
            <button onClick={() => addToast("Loaded previous leaves page", "success")} className="pag-nav-btn cursor-pointer" type="button" disabled>
              <ChevronLeft size={16} />
            </button>
            <button onClick={() => addToast("Loaded page 1", "success")} className="pag-num-btn active cursor-pointer" type="button">1</button>
            <button onClick={() => addToast("Loaded next leaves page", "success")} className="pag-nav-btn cursor-pointer" type="button" disabled>
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

