import React, { useState } from 'react';
import {
  Search, ListFilter, ClipboardList, Clock, CheckCircle, RefreshCcw, FileText, X, AlertCircle
} from 'lucide-react';
import { useToast } from '../../components/common/ToastNotification';

import Select from "../../components/ui/Select";

const MOCK_ASSIGNMENTS = [
  { id: 'ASN-2010', employee: 'John Doe', branch: 'Downtown HQ', task: 'Monthly Inventory Audit', assignedBy: 'Michael Chen', date: 'Oct 12, 2026', status: 'ACTIVE' },
  { id: 'ASN-2011', employee: 'Alice Smith', branch: 'North Suburbs', task: 'Customer Feedback Review', assignedBy: 'David Rodriguez', date: 'Oct 13, 2026', status: 'PENDING' },
  { id: 'ASN-2012', employee: 'Bob Johnson', branch: 'Westside Heights', task: 'Safety Compliance Check', assignedBy: 'Sarah Jenkins', date: 'Oct 10, 2026', status: 'COMPLETED' },
  { id: 'ASN-2013', employee: 'Eve Williams', branch: 'East River', task: 'Equipment Maintenance', assignedBy: 'Emily Thompson', date: 'Oct 14, 2026', status: 'REASSIGNED' },
  { id: 'ASN-2014', employee: 'Charlie Brown', branch: 'Downtown HQ', task: 'Staff Training Session', assignedBy: 'Michael Chen', date: 'Oct 15, 2026', status: 'PENDING' },
];

export default function EmployeeAssignments() {
  const { addToast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [selectedAssignment, setSelectedAssignment] = useState(null);

  const filteredAssignments = MOCK_ASSIGNMENTS.filter(a => {
    const searchLower = searchTerm.toLowerCase();
    const matchSearch = 
      a.employee.toLowerCase().includes(searchLower) || 
      a.task.toLowerCase().includes(searchLower) ||
      a.id.toLowerCase().includes(searchLower) ||
      a.branch.toLowerCase().includes(searchLower) ||
      a.assignedBy.toLowerCase().includes(searchLower);
    const matchStatus = statusFilter === 'All' || a.status === statusFilter;
    return matchSearch && matchStatus;
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-section)', paddingBottom: '40px' }}>
      {/* KPI Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '24px' }}>
        <div 
          onClick={() => addToast("Card clicked: Active Assignments details", "success")}
          className="kpi-card" 
          style={{ padding: '12px', borderRadius: '12px', border: '1.5px solid #25108f', background: '#fff', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', minHeight: '80px', cursor: 'pointer' }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', width: '100%' }}>
            <div>
              <span style={{ fontSize: '9px', fontWeight: '800', color: 'var(--muted)', textTransform: 'uppercase', display: 'block' }}>Active Assignments</span>
              <strong style={{ display: 'block', fontSize: '18px', fontWeight: '800', color: 'var(--text)', marginTop: '4px' }}>142</strong>
              <span style={{ fontSize: '9px', color: '#10b981', fontWeight: '700', marginTop: '2px', display: 'block' }}>Currently in progress</span>
            </div>
            <div style={{ width: '28px', height: '28px', borderRadius: '8px', background: '#eff6ff', color: '#3b82f6', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <ClipboardList size={14} />
            </div>
          </div>
        </div>

        <div 
          onClick={() => addToast("Card clicked: Pending tasks list", "success")}
          className="kpi-card" 
          style={{ padding: '12px', borderRadius: '12px', border: '1.5px solid #25108f', background: '#fff', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', minHeight: '80px', cursor: 'pointer' }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', width: '100%' }}>
            <div>
              <span style={{ fontSize: '9px', fontWeight: '800', color: 'var(--muted)', textTransform: 'uppercase', display: 'block' }}>Pending</span>
              <strong style={{ display: 'block', fontSize: '18px', fontWeight: '800', color: 'var(--text)', marginTop: '4px' }}>38</strong>
              <span style={{ fontSize: '9px', color: '#f59e0b', fontWeight: '700', marginTop: '2px', display: 'block' }}>Awaiting acknowledgment</span>
            </div>
            <div style={{ width: '28px', height: '28px', borderRadius: '8px', background: '#fef3c7', color: '#d97706', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Clock size={14} />
            </div>
          </div>
        </div>

        <div 
          onClick={() => addToast("Card clicked: Completed assignments records", "success")}
          className="kpi-card" 
          style={{ padding: '12px', borderRadius: '12px', border: '1.5px solid #25108f', background: '#fff', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', minHeight: '80px', cursor: 'pointer' }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', width: '100%' }}>
            <div>
              <span style={{ fontSize: '9px', fontWeight: '800', color: 'var(--muted)', textTransform: 'uppercase', display: 'block' }}>Completed</span>
              <strong style={{ display: 'block', fontSize: '18px', fontWeight: '800', color: 'var(--text)', marginTop: '4px' }}>856</strong>
              <span style={{ fontSize: '9px', color: '#10b981', fontWeight: '700', marginTop: '2px', display: 'block' }}>This month</span>
            </div>
            <div style={{ width: '28px', height: '28px', borderRadius: '8px', background: '#f0fdf4', color: '#10b981', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <CheckCircle size={14} />
            </div>
          </div>
        </div>

        <div 
          onClick={() => addToast("Card clicked: Reassigned tasks metrics", "success")}
          className="kpi-card" 
          style={{ padding: '12px', borderRadius: '12px', border: '1.5px solid #25108f', background: '#fff', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', minHeight: '80px', cursor: 'pointer' }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', width: '100%' }}>
            <div>
              <span style={{ fontSize: '9px', fontWeight: '800', color: 'var(--muted)', textTransform: 'uppercase', display: 'block' }}>Reassigned Tasks</span>
              <strong style={{ display: 'block', fontSize: '18px', fontWeight: '800', color: 'var(--text)', marginTop: '4px' }}>12</strong>
              <span style={{ fontSize: '9px', color: '#ec4899', fontWeight: '700', marginTop: '2px', display: 'block' }}>Needs attention</span>
            </div>
            <div style={{ width: '28px', height: '28px', borderRadius: '8px', background: '#fdf2f8', color: '#ec4899', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <RefreshCcw size={14} />
            </div>
          </div>
        </div>
      </div>
      <div className="panel" style={{ background: '#fff', border: '1.5px solid #25108f', borderRadius: '12px', padding: 'var(--spacing-section)', marginBottom: 0 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '12px' }}>
          <h3 style={{ fontSize: '16px', fontWeight: '800', color: 'var(--text)', margin: 0 }}>Assignment Log</h3>
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <div className="dash-search" style={{ margin: 0, height: '34px', border: '1.5px solid #25108f', borderRadius: '6px', width: '220px', display: 'flex', alignItems: 'center' }}>
              <Search size={14} style={{ marginLeft: '12px', color: 'var(--muted)' }} />
              <input
                placeholder="Search assignments..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{ fontSize: '12px', border: 'none', background: 'transparent', outline: 'none', paddingLeft: '8px', flex: 1, color: 'var(--text)' }}
              />
            </div>
            <Select
              className="dash-select"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              style={{ height: '34px', border: '1.5px solid #25108f', borderRadius: '6px', padding: '0 12px', fontSize: '12px', color: 'var(--text)', background: '#fff', outline: 'none', cursor: 'pointer', fontWeight: '700' }}
              options={[{
                label: "All Statuses",
                value: "All"
              }, {
                label: "Active",
                value: "ACTIVE"
              }, {
                label: "Pending",
                value: "PENDING"
              }, {
                label: "Completed",
                value: "COMPLETED"
              }, {
                label: "Reassigned",
                value: "REASSIGNED"
              }]} />
          </div>
        </div>

        <div className="table-wrap" style={{ overflowY: 'auto', maxHeight: '400px' }}>
          <div className="table-responsive-wrapper">
<table className="partner-table" style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', minWidth: '800px' }}>
            <thead>
              <tr style={{ borderBottom: '1.5px solid #25108f' }}>
                <th style={{ padding: '12px', fontSize: '11px', fontWeight: '800', color: 'var(--muted)', textTransform: 'uppercase' }}>Employee</th>
                <th style={{ padding: '12px', fontSize: '11px', fontWeight: '800', color: 'var(--muted)', textTransform: 'uppercase' }}>Branch</th>
                <th style={{ padding: '12px', fontSize: '11px', fontWeight: '800', color: 'var(--muted)', textTransform: 'uppercase' }}>Assigned Task</th>
                <th style={{ padding: '12px', fontSize: '11px', fontWeight: '800', color: 'var(--muted)', textTransform: 'uppercase' }}>Assigned By</th>
                <th style={{ padding: '12px', fontSize: '11px', fontWeight: '800', color: 'var(--muted)', textTransform: 'uppercase' }}>Date</th>
                <th style={{ padding: '12px', fontSize: '11px', fontWeight: '800', color: 'var(--muted)', textTransform: 'uppercase' }}>Status</th>
                <th style={{ padding: '12px', fontSize: '11px', fontWeight: '800', color: 'var(--muted)', textTransform: 'uppercase', textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredAssignments.map((row) => (
                  <tr key={row.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                    <td style={{ padding: '12px' }}>
                      <strong style={{ display: 'block', fontSize: '13px', color: 'var(--text)' }}>{row.employee}</strong>
                    </td>
                    <td style={{ padding: '12px', fontSize: '12px', color: 'var(--text)' }}>{row.branch}</td>
                    <td style={{ padding: '12px' }}>
                      <span style={{ fontSize: '13px', color: 'var(--text)', fontWeight: '700' }}>{row.task}</span>
                      <span style={{ display: 'block', fontSize: '11px', color: 'var(--muted)' }}>ID: {row.id}</span>
                    </td>
                    <td style={{ padding: '12px', fontSize: '12px', color: 'var(--text)' }}>{row.assignedBy}</td>
                    <td style={{ padding: '12px', fontSize: '12px', color: 'var(--muted)' }}>{row.date}</td>
                    <td style={{ padding: '12px' }}>
                      <span style={{ fontSize: '10px', fontWeight: '800', padding: '4px 8px', borderRadius: '4px', background: row.status === 'COMPLETED' ? '#d1fae5' : row.status === 'PENDING' ? '#fef3c7' : row.status === 'ACTIVE' ? '#e0e7ff' : '#fee2e2', color: row.status === 'COMPLETED' ? '#059669' : row.status === 'PENDING' ? '#d97706' : row.status === 'ACTIVE' ? '#4f46e5' : '#dc2626' }}>
                        {row.status}
                      </span>
                    </td>
                    <td style={{ padding: '12px', textAlign: 'right' }}>
                      <button 
                        onClick={() => { setSelectedAssignment(row); addToast(`Opening assignment details for ${row.id}`, "success"); }} 
                        className="cursor-pointer"
                        style={{ background: '#f8fafc', border: '1.5px solid #25108f', color: 'var(--text)', fontSize: '12px', fontWeight: '700', padding: '6px 12px', borderRadius: '6px' }}
                      >
                        Details
                      </button>
                    </td>
                  </tr>
                ))}
                {filteredAssignments.length === 0 && (
                  <tr>
                    <td colSpan="7" style={{ padding: 'var(--spacing-section)', textAlign: 'center', color: 'var(--muted)', fontSize: '13px' }}>
                      No assignments found.
                    </td>
                  </tr>
                )}
            </tbody>
          </table>
</div>
        </div>
      </div>
      {/* Drawer for Assignment Details */}
      {selectedAssignment && (
        <>
          <div 
            style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(15, 23, 42, 0.4)', backdropFilter: 'blur(4px)', zIndex: 999 }}
            onClick={() => setSelectedAssignment(null)}
          />
          <div style={{ position: 'fixed', top: 0, right: 0, bottom: 0, width: '400px', background: '#fff', zIndex: 1000, boxShadow: '-8px 0 24px rgba(0,0,0,0.1)', display: 'flex', flexDirection: 'column' }}>
            <div style={{ padding: 'var(--spacing-section)', borderBottom: '1.5px solid #25108f', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#f8fafc' }}>
              <div>
                <h3 style={{ fontSize: '16px', fontWeight: '800', color: 'var(--text)', margin: 0 }}>Assignment Details</h3>
                <span style={{ fontSize: '12px', color: 'var(--muted)' }}>{selectedAssignment.id}</span>
              </div>
              <button onClick={() => setSelectedAssignment(null)} style={{ background: 'transparent', border: 'none', color: 'var(--muted)', cursor: 'pointer', padding: '4px' }}>
                <X size={18} />
              </button>
            </div>
            
            <div style={{ padding: 'var(--spacing-section)', flex: 1, overflowY: 'auto' }}>
              
              <div style={{ background: '#f8fafc', border: '1.5px solid #25108f', borderRadius: '8px', padding: '16px', marginBottom: '24px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                  <div style={{ width: '40px', height: '40px', borderRadius: '8px', background: '#e0e7ff', color: '#4f46e5', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <FileText size={20} />
                  </div>
                  <div>
                    <strong style={{ display: 'block', fontSize: '15px', color: 'var(--text)' }}>{selectedAssignment.task}</strong>
                    <span style={{ fontSize: '12px', color: 'var(--muted)' }}>Assigned on {selectedAssignment.date}</span>
                  </div>
                </div>

                <p style={{ fontSize: '13px', color: 'var(--text)', lineHeight: '1.6', margin: 0, padding: '12px 0', borderTop: '1.5px solid #25108f' }}>
                  This is a detailed description of the assignment. Please ensure all steps are followed according to the standard operating procedures. Report any anomalies directly to the branch manager.
                </p>
              </div>

              <div style={{ marginBottom: '24px' }}>
                <h4 style={{ fontSize: '12px', fontWeight: '800', color: 'var(--muted)', textTransform: 'uppercase', marginBottom: '12px' }}>Assignment Info</h4>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  <div>
                    <span style={{ display: 'block', fontSize: '11px', color: 'var(--muted)', marginBottom: '4px' }}>Assigned To</span>
                    <strong style={{ fontSize: '13px', color: 'var(--text)' }}>{selectedAssignment.employee}</strong>
                  </div>
                  <div>
                    <span style={{ display: 'block', fontSize: '11px', color: 'var(--muted)', marginBottom: '4px' }}>Branch</span>
                    <strong style={{ fontSize: '13px', color: 'var(--text)' }}>{selectedAssignment.branch}</strong>
                  </div>
                  <div>
                    <span style={{ display: 'block', fontSize: '11px', color: 'var(--muted)', marginBottom: '4px' }}>Assigned By</span>
                    <strong style={{ fontSize: '13px', color: 'var(--text)' }}>{selectedAssignment.assignedBy}</strong>
                  </div>
                  <div>
                    <span style={{ display: 'block', fontSize: '11px', color: 'var(--muted)', marginBottom: '4px' }}>Status</span>
                    <span style={{ fontSize: '10px', fontWeight: '800', padding: '4px 8px', borderRadius: '4px', display: 'inline-block', background: selectedAssignment.status === 'COMPLETED' ? '#d1fae5' : selectedAssignment.status === 'PENDING' ? '#fef3c7' : selectedAssignment.status === 'ACTIVE' ? '#e0e7ff' : '#fee2e2', color: selectedAssignment.status === 'COMPLETED' ? '#059669' : selectedAssignment.status === 'PENDING' ? '#d97706' : selectedAssignment.status === 'ACTIVE' ? '#4f46e5' : '#dc2626' }}>
                      {selectedAssignment.status}
                    </span>
                  </div>
                </div>
              </div>

              {selectedAssignment.status === 'PENDING' && (
                <div style={{ background: '#fffbeb', border: '1px solid #fde68a', borderRadius: '8px', padding: '12px', display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                  <AlertCircle size={16} style={{ color: '#d97706', flexShrink: 0, marginTop: '2px' }} />
                  <p style={{ fontSize: '12px', color: '#92400e', margin: 0, lineHeight: '1.5' }}>
                    This assignment is currently pending acknowledgment from the employee. Reminders are sent automatically every 24 hours.
                  </p>
                </div>
              )}
            </div>

            <div style={{ padding: '20px', borderTop: '1.5px solid #25108f', display: 'flex', gap: '12px' }}>
              <button 
                onClick={() => setSelectedAssignment(null)}
                style={{ flex: 1, padding: '10px', background: '#fff', border: '1.5px solid #25108f', borderRadius: '8px', color: 'var(--text)', fontSize: '13px', fontWeight: '700', cursor: 'pointer' }}
              >
                Close
              </button>
              <button 
                onClick={() => addToast(`Opening status update console for ${selectedAssignment.id}`, "success")}
                className="cursor-pointer"
                style={{ flex: 1, padding: '10px', background: '#4f46e5', border: 'none', borderRadius: '8px', color: '#fff', fontSize: '13px', fontWeight: '700' }}
              >
                Update Status
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}


