import React, { useState } from 'react';
import {
  Search, ListFilter, Activity, LogIn, Database, ShieldAlert, Download, Calendar, UserCheck
} from 'lucide-react';
import { useToast } from '../../components/common/ToastNotification';

import Select from "../../components/ui/Select";

const MOCK_LOGS = [
  { id: 'LOG-9001', user: 'Admin User', action: 'Approved KYC', module: 'Employee KYC', timestamp: '2026-10-12 14:32:01', ip: '192.168.1.45', status: 'SUCCESS' },
  { id: 'LOG-9002', user: 'System', action: 'Auto-assigned task', module: 'Assignments', timestamp: '2026-10-12 12:00:00', ip: '10.0.0.1', status: 'SUCCESS' },
  { id: 'LOG-9003', user: 'Manager Jane', action: 'Failed Login Attempt', module: 'Auth', timestamp: '2026-10-12 10:15:22', ip: '203.0.113.5', status: 'FAILED' },
  { id: 'LOG-9004', user: 'Admin User', action: 'Updated Salary Structure', module: 'Earnings', timestamp: '2026-10-11 16:45:10', ip: '192.168.1.45', status: 'SUCCESS' },
  { id: 'LOG-9005', user: 'Manager Bob', action: 'Deleted Document', module: 'Documents', timestamp: '2026-10-11 09:20:05', ip: '192.168.1.112', status: 'WARNING' },
];

const MOCK_TIMELINE = [
  { time: '14:32', title: 'KYC Approved', desc: 'Admin User approved KYC for EMP-001', color: '#10b981' },
  { time: '12:00', title: 'Task Auto-assigned', desc: 'System assigned task to EMP-004', color: '#3b82f6' },
  { time: '10:15', title: 'Failed Login Attempt', desc: 'Manager Jane failed to login', color: '#ef4444' },
  { time: '09:20', title: 'Document Deleted', desc: 'Manager Bob deleted a verified document', color: '#f59e0b' }
];

export default function EmployeeAuditLogs() {
  const { addToast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [activityFilter, setActivityFilter] = useState('All');

  const filteredLogs = MOCK_LOGS.filter(l => {
    const matchSearch = l.user.toLowerCase().includes(searchTerm.toLowerCase()) || l.action.toLowerCase().includes(searchTerm.toLowerCase());
    const matchActivity = activityFilter === 'All' || l.status === activityFilter;
    return matchSearch && matchActivity;
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-section)', paddingBottom: '40px' }}>
      {/* KPI Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '24px' }}>
        <div 
          onClick={() => addToast("Card clicked: Total system activities logged", "success")}
          className="kpi-card" 
          style={{ padding: '12px', borderRadius: '12px', border: '1.5px solid #25108f', background: '#fff', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', minHeight: '80px', cursor: 'pointer' }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', width: '100%' }}>
            <div>
              <span style={{ fontSize: '9px', fontWeight: '800', color: 'var(--muted)', textTransform: 'uppercase', display: 'block' }}>Total Activities</span>
              <strong style={{ display: 'block', fontSize: '18px', fontWeight: '800', color: 'var(--text)', marginTop: '4px' }}>24,592</strong>
            </div>
            <div style={{ width: '28px', height: '28px', borderRadius: '8px', background: '#eff6ff', color: '#3b82f6', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Activity size={14} />
            </div>
          </div>
        </div>

        <div 
          onClick={() => addToast("Card clicked: Login activities metrics", "success")}
          className="kpi-card" 
          style={{ padding: '12px', borderRadius: '12px', border: '1.5px solid #25108f', background: '#fff', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', minHeight: '80px', cursor: 'pointer' }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', width: '100%' }}>
            <div>
              <span style={{ fontSize: '9px', fontWeight: '800', color: 'var(--muted)', textTransform: 'uppercase', display: 'block' }}>Login Activities</span>
              <strong style={{ display: 'block', fontSize: '18px', fontWeight: '800', color: 'var(--text)', marginTop: '4px' }}>12,845</strong>
            </div>
            <div style={{ width: '28px', height: '28px', borderRadius: '8px', background: '#f0fdf4', color: '#10b981', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <LogIn size={14} />
            </div>
          </div>
        </div>

        <div 
          onClick={() => addToast("Card clicked: Database updates log details", "success")}
          className="kpi-card" 
          style={{ padding: '12px', borderRadius: '12px', border: '1.5px solid #25108f', background: '#fff', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', minHeight: '80px', cursor: 'pointer' }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', width: '100%' }}>
            <div>
              <span style={{ fontSize: '9px', fontWeight: '800', color: 'var(--muted)', textTransform: 'uppercase', display: 'block' }}>Data Updates</span>
              <strong style={{ display: 'block', fontSize: '18px', fontWeight: '800', color: 'var(--text)', marginTop: '4px' }}>8,420</strong>
            </div>
            <div style={{ width: '28px', height: '28px', borderRadius: '8px', background: '#fef3c7', color: '#d97706', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Database size={14} />
            </div>
          </div>
        </div>

        <div 
          onClick={() => addToast("Card clicked: Security events audit list", "success")}
          className="kpi-card" 
          style={{ padding: '12px', borderRadius: '12px', border: '1.5px solid #25108f', background: '#fff', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', minHeight: '80px', cursor: 'pointer' }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', width: '100%' }}>
            <div>
              <span style={{ fontSize: '9px', fontWeight: '800', color: 'var(--muted)', textTransform: 'uppercase', display: 'block' }}>Security Events</span>
              <strong style={{ display: 'block', fontSize: '18px', fontWeight: '800', color: 'var(--text)', marginTop: '4px' }}>142</strong>
            </div>
            <div style={{ width: '28px', height: '28px', borderRadius: '8px', background: '#fef2f2', color: '#ef4444', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <ShieldAlert size={14} />
            </div>
          </div>
        </div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 'var(--spacing-section)' }}>
        
        {/* Left Column */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-section)' }}>
          
          <div className="panel" style={{ background: '#fff', border: '1.5px solid #25108f', borderRadius: '12px', padding: 'var(--spacing-section)', marginBottom: 0 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '12px' }}>
              <h3 style={{ fontSize: '16px', fontWeight: '800', color: 'var(--text)', margin: 0 }}>System Audit Logs</h3>
              <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                <div className="dash-search" style={{ margin: 0, height: '34px', border: '1.5px solid #25108f', borderRadius: '6px', width: '220px', display: 'flex', alignItems: 'center' }}>
                  <Search size={14} style={{ marginLeft: '12px', color: 'var(--muted)' }} />
                  <input
                    placeholder="Search logs..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    style={{ fontSize: '12px', border: 'none', background: 'transparent', outline: 'none', paddingLeft: '8px', flex: 1 }}
                  />
                </div>
                <Select
                  className="dash-select"
                  value={activityFilter}
                  onChange={(e) => setActivityFilter(e.target.value)}
                  style={{ height: '34px', border: '1.5px solid #25108f', borderRadius: '6px', padding: '0 12px', fontSize: '12px', color: 'var(--text)', background: '#fff', outline: 'none', cursor: 'pointer', fontWeight: '700' }}
                  options={[{
                    label: "All Severity Levels",
                    value: "All"
                  }, {
                    label: "Success",
                    value: "SUCCESS"
                  }, {
                    label: "Warning",
                    value: "WARNING"
                  }, {
                    label: "Failed",
                    value: "FAILED"
                  }]} />
                <button 
                  onClick={() => addToast("Exporting security log audits spreadsheet...", "success")}
                  style={{ height: '34px', padding: '0 12px', border: '1.5px solid #25108f', background: '#fff', borderRadius: '6px', display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', fontWeight: '700', color: 'var(--text)', cursor: 'pointer' }}
                >
                  <Download size={14} /> Export
                </button>
              </div>
            </div>

            <div className="table-wrap" style={{ overflowY: 'auto', maxHeight: '400px' }}>
              <div className="table-responsive-wrapper">
<table className="partner-table" style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', minWidth: '800px' }}>
                <thead>
                  <tr style={{ borderBottom: '1.5px solid #25108f' }}>
                    <th style={{ padding: '12px', fontSize: '11px', fontWeight: '800', color: 'var(--muted)', textTransform: 'uppercase' }}>LOG ID</th>
                    <th style={{ padding: '12px', fontSize: '11px', fontWeight: '800', color: 'var(--muted)', textTransform: 'uppercase' }}>User</th>
                    <th style={{ padding: '12px', fontSize: '11px', fontWeight: '800', color: 'var(--muted)', textTransform: 'uppercase' }}>Action Details</th>
                    <th style={{ padding: '12px', fontSize: '11px', fontWeight: '800', color: 'var(--muted)', textTransform: 'uppercase' }}>Module</th>
                    <th style={{ padding: '12px', fontSize: '11px', fontWeight: '800', color: 'var(--muted)', textTransform: 'uppercase' }}>IP Address</th>
                    <th style={{ padding: '12px', fontSize: '11px', fontWeight: '800', color: 'var(--muted)', textTransform: 'uppercase' }}>Timestamp</th>
                    <th style={{ padding: '12px', fontSize: '11px', fontWeight: '800', color: 'var(--muted)', textTransform: 'uppercase' }}>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredLogs.map((row) => (
                      <tr 
                        key={row.id} 
                        onClick={() => addToast(`Opening trace parameters for audit entry: ${row.id}`, "success")}
                        className="partner-row-clickable"
                      >
                        <td style={{ padding: '12px' }}><strong>{row.id}</strong></td>
                        <td style={{ padding: '12px' }}><strong>{row.user}</strong></td>
                        <td style={{ padding: '12px', fontSize: '13px', color: 'var(--text)', fontWeight: '700' }}>{row.action}</td>
                        <td style={{ padding: '12px', fontSize: '12px', color: 'var(--text)' }}>{row.module}</td>
                        <td style={{ padding: '12px', fontSize: '12px', color: 'var(--muted)' }}>{row.ip}</td>
                        <td style={{ padding: '12px', fontSize: '12px', color: 'var(--muted)' }}>{row.timestamp}</td>
                        <td style={{ padding: '12px' }}>
                          <span style={{ fontSize: '10px', fontWeight: '800', padding: '4px 8px', borderRadius: '4px', background: row.status === 'SUCCESS' ? '#d1fae5' : row.status === 'WARNING' ? '#fef3c7' : '#fee2e2', color: row.status === 'SUCCESS' ? '#059669' : row.status === 'WARNING' ? '#d97706' : '#dc2626' }}>
                            {row.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                    {filteredLogs.length === 0 && (
                      <tr>
                        <td colSpan="7" style={{ padding: 'var(--spacing-section)', textAlign: 'center', color: 'var(--muted)', fontSize: '13px' }}>
                          No audit entries found.
                        </td>
                      </tr>
                    )}
                </tbody>
              </table>
</div>
            </div>
          </div>

        </div>

        {/* Right Column: Timeline */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-section)', flex: '1' }}>
          
          <div className="panel" style={{ background: '#fff', border: '1.5px solid #25108f', borderRadius: '12px', padding: 'var(--spacing-section)', marginBottom: 0 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
              <Calendar size={18} style={{ color: 'var(--primary)' }} />
              <h3 style={{ fontSize: '15px', fontWeight: '800', color: 'var(--text)', margin: 0 }}>Activity Timeline</h3>
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', position: 'relative', paddingLeft: '20px', borderLeft: '2px solid #e2e8f0', marginLeft: '10px' }}>
              {MOCK_TIMELINE.map((item, i) => (
                <div 
                  key={i} 
                  onClick={() => addToast(`Timeline: ${item.title} details loaded.`, "success")}
                  style={{ position: 'relative', cursor: 'pointer' }}
                >
                  <span style={{ position: 'absolute', left: '-27px', top: '4px', width: '12px', height: '12px', borderRadius: '50%', background: item.color, border: '3px solid #fff', boxShadow: '0 0 0 1px #e2e8f0' }} />
                  <span style={{ fontSize: '11px', color: 'var(--muted)', fontWeight: '700' }}>{item.time}</span>
                  <strong style={{ display: 'block', fontSize: '13px', color: 'var(--text)', marginTop: '2px' }}>{item.title}</strong>
                  <p style={{ margin: '4px 0 0', fontSize: '12px', color: 'var(--muted)', lineHeight: '1.4' }}>{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}


