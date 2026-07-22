import React, { useState } from 'react';
import {
  Download, FileText, Calendar, Search, ListFilter, Activity, Star, Award, MapPin, MoreVertical, TrendingUp
} from 'lucide-react';
import { Calendar as DateRangeCalendar } from 'react-date-range';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import { useToast } from '../../components/common/ToastNotification';

import Select from "../../components/ui/Select";

const MOCK_EMPLOYEES = [
  { id: 'EMP-001', name: 'John Doe', branch: 'Downtown HQ', score: '88.4%', revenue: '$12,450', rating: '4.8', status: 'ACTIVE' },
  { id: 'EMP-002', name: 'Alice Smith', branch: 'Westside Heights', score: '92.1%', revenue: '$9,200', rating: '4.5', status: 'ACTIVE' },
  { id: 'EMP-003', name: 'Bob Johnson', branch: 'North Suburbs', score: '78.5%', revenue: '$6,120', rating: '4.1', status: 'SUSPENDED' },
  { id: 'EMP-004', name: 'Eve Williams', branch: 'East River', score: '94.2%', revenue: '$14,200', rating: '4.9', status: 'ACTIVE' },
];

const MOCK_TOP_PERFORMERS = [
  { name: 'Eve Williams', status: 'Operations', revenue: '$14,200', performance: '+15.2%' },
  { name: 'John Doe', status: 'Cleaning', revenue: '$12,450', performance: '+10.4%' },
  { name: 'Jane Miller', status: 'Support', revenue: '$11,800', performance: '+8.7%' }
];

const MOCK_BRANCH_LEADERBOARD = [
  { rank: 1, branch: 'Downtown HQ', count: 45, score: '94.2%', rating: '4.8' },
  { rank: 2, branch: 'Westside Heights', count: 32, score: '91.5%', rating: '4.6' },
  { rank: 3, branch: 'North Suburbs', count: 28, score: '88.1%', rating: '4.5' }
];

export default function EmployeeAnalytics() {
  const { addToast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [branchFilter, setBranchFilter] = useState('All Branches');
  const [deptFilter, setDeptFilter] = useState('All Departments');
  const [dateRange, setDateRange] = useState('');
  const [activeDropdown, setActiveDropdown] = useState(null);

  const filteredEmployees = MOCK_EMPLOYEES.filter(emp => {
    const matchSearch = emp.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchSearch;
  });

  const getStatusBadge = (status) => {
    return status === 'ACTIVE' ? (
      <span style={{ fontSize: '10px', fontWeight: '800', padding: '3px 8px', borderRadius: '4px', background: '#d1fae5', color: '#059669' }}>ACTIVE</span>
    ) : (
      <span style={{ fontSize: '10px', fontWeight: '800', padding: '3px 8px', borderRadius: '4px', background: '#fee2e2', color: '#dc2626' }}>SUSPENDED</span>
    );
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-section)', paddingBottom: '40px' }}>
      {/* Top Filter Section */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px', background: '#fff', padding: '16px', borderRadius: '12px', border: '1.5px solid #25108f' }}>
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          <Select
            value={branchFilter}
            onChange={(e) => setBranchFilter(e.target.value)}
            className="dash-select"
            style={{ height: '36px', border: '1.5px solid #25108f', borderRadius: '6px', padding: '0 12px', fontSize: '13px', fontWeight: '600', color: 'var(--text)', background: '#f8fafc', minWidth: '140px', outline: 'none', cursor: 'pointer' }}
            options={[{
              label: "All Branches",
              value: "All Branches"
            }, {
              label: "Indore",
              value: "Indore"
            }, {
              label: "Bhopal",
              value: "Bhopal"
            }, {
              label: "Jaipur",
              value: "Jaipur"
            }, {
              label: "Pune",
              value: "Pune"
            }, {
              label: "Ahmedabad",
              value: "Ahmedabad"
            }]} />
          <Select
            value={deptFilter}
            onChange={(e) => setDeptFilter(e.target.value)}
            className="dash-select"
            style={{ height: '36px', border: '1.5px solid #25108f', borderRadius: '6px', padding: '0 12px', fontSize: '13px', fontWeight: '600', color: 'var(--text)', background: '#f8fafc', minWidth: '140px', outline: 'none', cursor: 'pointer' }}
            options={[{
              label: "All Departments",
              value: "All Departments"
            }, {
              label: "Operations",
              value: "Operations"
            }, {
              label: "Cleaning",
              value: "Cleaning"
            }, {
              label: "Plumbing",
              value: "Plumbing"
            }, {
              label: "Electrical",
              value: "Electrical"
            }, {
              label: "Support",
              value: "Support"
            }, {
              label: "Administration",
              value: "Administration"
            }]} />
          <div style={{ position: 'relative', zIndex: 99 }}>
            {activeDropdown === 'calendar' && (
              <div style={{ position: 'fixed', inset: 0, zIndex: 40 }} onClick={() => setActiveDropdown(null)} />
            )}
            <div 
              onClick={() => setActiveDropdown(activeDropdown === 'calendar' ? null : 'calendar')}
              style={{ display: 'flex', alignItems: 'center', gap: '8px', border: '1.5px solid #25108f', padding: '6px 12px', borderRadius: '6px', background: '#fff', cursor: 'pointer', position: 'relative', zIndex: 41 }}
            >
              <Calendar size={14} />
              <span style={{ fontWeight: '600', fontSize: '13px', color: 'var(--text)' }}>
                {dateRange ? new Date(dateRange).toLocaleDateString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' }) : 'Oct 1 - Oct 31, 2026'}
              </span>
            </div>
            {activeDropdown === 'calendar' && (
              <div className="calendar-dropdown">
                <DateRangeCalendar 
                  date={dateRange ? new Date(dateRange) : new Date()}
                  onChange={(item) => {
                    const localDate = new Date(item.getTime() - (item.getTimezoneOffset() * 60000)).toISOString().split('T')[0];
                    setDateRange(localDate);
                    setActiveDropdown(null);
                  }}
                  color="#25108f"
                />
              </div>
            )}
          </div>
        </div>
        <div style={{ display: 'flex', gap: '12px' }}>
          <button 
            onClick={() => {
              addToast("Preparing CSV export...", "info");
              setTimeout(() => addToast("Employee_Analytics.csv downloaded successfully", "success"), 1500);
            }}
            style={{ height: '36px', padding: '0 16px', border: 'none', background: '#e0e7ff', color: '#4f46e5', borderRadius: '6px', display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', fontWeight: '700', cursor: 'pointer' }}
          >
            <Download size={14} /> EXPORT CSV
          </button>
          <button 
            onClick={() => {
              addToast("Preparing PDF export...", "info");
              setTimeout(() => {
                addToast("Analytics_Report.pdf generated successfully", "success");
                window.print();
              }, 1500);
            }}
            style={{ height: '36px', padding: '0 16px', border: 'none', background: '#1e293b', color: '#fff', borderRadius: '6px', display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', fontWeight: '700', cursor: 'pointer' }}
          >
            <FileText size={14} /> PDF REPORT
          </button>
        </div>
      </div>
      {/* KPI Cards Row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '24px' }}>
        
        {/* Productivity Card */}
        <div 
          onClick={() => addToast("Card clicked: Productivity Score details", "success")}
          className="kpi-card" 
          style={{ padding: '12px', borderRadius: '12px', border: '1.5px solid #25108f', background: '#fff', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', minHeight: '80px', cursor: 'pointer', color: 'var(--text)' }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '9px', fontWeight: '800', color: 'var(--muted)', textTransform: 'uppercase' }}>Productivity Score</span>
            <Activity size={14} style={{ color: '#4f46e5' }} />
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', marginTop: '4px' }}>
              <strong style={{ fontSize: '18px', fontWeight: '800' }}>88.4%</strong>
              <span style={{ fontSize: '9px', fontWeight: '700', color: '#10b981' }}>↗ +2.4%</span>
            </div>
            <div style={{ height: '3px', background: '#f1ebf8', borderRadius: '2px', marginTop: '6px', overflow: 'hidden' }}>
              <div style={{ width: '88.4%', height: '100%', background: '#4f46e5' }} />
            </div>
          </div>
        </div>

        {/* Avg Efficiency */}
        <div 
          onClick={() => addToast("Card clicked: Avg Efficiency details", "success")}
          className="kpi-card" 
          style={{ padding: '12px', borderRadius: '12px', border: '1.5px solid #25108f', background: '#fff', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', minHeight: '80px', cursor: 'pointer', color: 'var(--text)' }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '9px', fontWeight: '800', color: 'var(--muted)', textTransform: 'uppercase' }}>Avg Efficiency</span>
            <Activity size={14} style={{ color: '#3b82f6' }} />
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', marginTop: '4px' }}>
              <strong style={{ fontSize: '18px', fontWeight: '800' }}>92.1%</strong>
              <span style={{ fontSize: '9px', fontWeight: '700', color: '#10b981' }}>↗ +1.2%</span>
            </div>
            <div style={{ height: '3px', background: '#f1f5f9', borderRadius: '2px', marginTop: '6px', overflow: 'hidden' }}>
              <div style={{ width: '92.1%', height: '100%', background: '#3b82f6' }} />
            </div>
          </div>
        </div>

        {/* Avg Rating */}
        <div 
          onClick={() => addToast("Card clicked: Avg Rating details", "success")}
          className="kpi-card" 
          style={{ padding: '12px', borderRadius: '12px', border: '1.5px solid #25108f', background: '#fff', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', minHeight: '80px', cursor: 'pointer', color: 'var(--text)' }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '9px', fontWeight: '800', color: 'var(--muted)', textTransform: 'uppercase' }}>Avg Rating</span>
            <Star size={14} style={{ color: '#f59e0b' }} />
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', marginTop: '4px' }}>
              <strong style={{ fontSize: '18px', fontWeight: '800' }}>4.92</strong>
              <span style={{ fontSize: '9px', color: '#4f46e5', fontWeight: '700' }}>Top 5%</span>
            </div>
            <div style={{ display: 'flex', gap: '2px', marginTop: '6px' }}>
              {[1, 2, 3, 4, 5].map(i => <Star key={i} size={8} fill={i <= 4 ? '#f59e0b' : '#e2e8f0'} color={i <= 4 ? '#f59e0b' : '#cbd5e1'} />)}
            </div>
          </div>
        </div>

        {/* Attendance Compliance */}
        <div 
          onClick={() => addToast("Card clicked: Attendance Compliance metrics", "success")}
          className="kpi-card" 
          style={{ padding: '12px', borderRadius: '12px', border: '1.5px solid #25108f', background: '#fff', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', minHeight: '80px', cursor: 'pointer', color: 'var(--text)' }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '9px', fontWeight: '800', color: 'var(--muted)', textTransform: 'uppercase' }}>Attendance Compliance</span>
            <Calendar size={14} style={{ color: '#ef4444' }} />
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', marginTop: '4px' }}>
              <strong style={{ fontSize: '18px', fontWeight: '800' }}>94.1%</strong>
              <span style={{ fontSize: '9px', fontWeight: '700', color: '#ef4444' }}>↘ -1.2%</span>
            </div>
            <div style={{ height: '3px', background: '#fee2e2', borderRadius: '2px', marginTop: '6px', overflow: 'hidden' }}>
              <div style={{ width: '94.1%', height: '100%', background: '#ef4444' }} />
            </div>
          </div>
        </div>

      </div>
      {/* Analytics Charts and Tables */}
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 'var(--spacing-section)' }}>
        
        {/* Left Column */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-section)' }}>
          
          {/* Charts Row */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--spacing-section)' }}>
            {/* Chart 1: Performance Matrix */}
            <div className="panel" style={{ background: '#fff', border: '1.5px solid #25108f', borderRadius: '12px', padding: 'var(--spacing-section)', minHeight: '320px', display: 'flex', flexDirection: 'column', marginBottom: 0 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                <h3 style={{ fontSize: '15px', fontWeight: '800', color: 'var(--text)', margin: 0 }}>Department Performance</h3>
              </div>
              <div style={{ flex: 1, display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: '16px', height: '160px', padding: '10px 0' }}>
                {[60, 45, 75, 50, 90, 65, 85].map((h, i) => (
                  <div key={i} style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', alignItems: 'center', gap: '8px' }}>
                    <div style={{ width: '100%', height: `${h}%`, background: i === 4 ? '#4f46e5' : '#e0e7ff', borderRadius: '6px 6px 0 0', transition: 'height 0.3s ease' }} />
                  </div>
                ))}
              </div>
            </div>

            {/* Chart 2: Attendance Heatmap / Line */}
            <div className="panel" style={{ background: '#fff', border: '1.5px solid #25108f', borderRadius: '12px', padding: 'var(--spacing-section)', minHeight: '320px', display: 'flex', flexDirection: 'column', marginBottom: 0 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                <h3 style={{ fontSize: '15px', fontWeight: '800', color: 'var(--text)', margin: 0 }}>Attendance Analytics</h3>
              </div>
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '12px', justifyContent: 'center' }}>
                {[
                  { label: 'Present', val: 85, color: '#10b981' },
                  { label: 'Absent', val: 5, color: '#ef4444' },
                  { label: 'Late Entries', val: 8, color: '#f59e0b' },
                  { label: 'On Leave', val: 2, color: '#3b82f6' }
                ].map(item => (
                  <div key={item.label} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <span style={{ fontSize: '12px', fontWeight: '700', color: 'var(--text)', width: '80px' }}>{item.label}</span>
                    <div style={{ flex: 1, height: '8px', background: '#f1f5f9', borderRadius: '4px', overflow: 'hidden' }}>
                      <div style={{ width: `${item.val}%`, height: '100%', background: item.color, borderRadius: '4px' }} />
                    </div>
                    <span style={{ fontSize: '12px', fontWeight: '800', color: item.color, width: '40px', textAlign: 'right' }}>{item.val}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Employee Efficiency Matrix Table */}
          <div className="panel" style={{ background: '#fff', border: '1.5px solid #25108f', borderRadius: '12px', padding: 'var(--spacing-section)', marginBottom: 0 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '12px' }}>
              <h3 style={{ fontSize: '16px', fontWeight: '800', color: 'var(--text)', margin: 0 }}>Employee Efficiency Matrix</h3>
              <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                <div className="dash-search" style={{ margin: 0, height: '34px', border: '1.5px solid #25108f', borderRadius: '6px', width: '220px', display: 'flex', alignItems: 'center' }}>
                  <Search size={14} style={{ marginLeft: '12px', color: 'var(--muted)' }} />
                  <input
                    placeholder="Search employees..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    style={{ fontSize: '12px', border: 'none', background: 'transparent', outline: 'none', paddingLeft: '8px', flex: 1 }}
                  />
                </div>
                <button 
                  onClick={() => addToast("Efficiency Matrix filter options loaded", "success")}
                  style={{ height: '34px', padding: '0 12px', border: '1.5px solid #25108f', background: '#fff', borderRadius: '6px', display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', fontWeight: '700', color: 'var(--text)', cursor: 'pointer' }}
                >
                  <ListFilter size={14} /> Filter
                </button>
              </div>
            </div>

            <div className="table-wrap" style={{ overflowY: 'auto', maxHeight: '400px' }}>
              <div className="table-responsive-wrapper">
<table className="partner-table" style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', minWidth: '800px' }}>
                <thead>
                  <tr style={{ borderBottom: '1.5px solid #25108f' }}>
                    <th style={{ padding: '12px', fontSize: '11px', fontWeight: '800', color: 'var(--muted)', textTransform: 'uppercase' }}>Employee</th>
                    <th style={{ padding: '12px', fontSize: '11px', fontWeight: '800', color: 'var(--muted)', textTransform: 'uppercase', textAlign: 'right' }}>Productivity</th>
                    <th style={{ padding: '12px', fontSize: '11px', fontWeight: '800', color: 'var(--muted)', textTransform: 'uppercase', textAlign: 'right' }}>Rev. Contribution</th>
                    <th style={{ padding: '12px', fontSize: '11px', fontWeight: '800', color: 'var(--muted)', textTransform: 'uppercase', textAlign: 'center' }}>CSAT / Rating</th>
                    <th style={{ padding: '12px', fontSize: '11px', fontWeight: '800', color: 'var(--muted)', textTransform: 'uppercase' }}>Status</th>
                    <th style={{ padding: '12px', width: '40px' }}></th>
                  </tr>
                </thead>
                <tbody>
                  {filteredEmployees.map((row) => (
                      <tr 
                        key={row.id} 
                        onClick={() => addToast(`Opening productivity trace report for ${row.name}`, "success")}
                        className="partner-row-clickable"
                      >
                        <td style={{ padding: '12px' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                            <div style={{ width: '32px', height: '32px', borderRadius: '16px', background: '#e0e7ff', color: '#4f46e5', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', fontWeight: '800' }}>
                              {row.name.split(' ').map(n => n[0]).join('')}
                            </div>
                            <div>
                              <strong style={{ display: 'block', fontSize: '13px', color: 'var(--text)' }}>{row.name}</strong>
                              <span style={{ fontSize: '11px', color: 'var(--muted)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                                <MapPin size={10} /> {row.branch}
                              </span>
                            </div>
                          </div>
                        </td>
                        <td style={{ padding: '12px', textAlign: 'right' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', justifyContent: 'flex-end' }}>
                            <strong style={{ fontSize: '13px', color: 'var(--text)' }}>{row.score}</strong>
                            <div style={{ width: '40px', height: '4px', background: '#f1f5f9', borderRadius: '2px', overflow: 'hidden' }}>
                              <div style={{ width: row.score, height: '100%', background: '#4f46e5' }} />
                            </div>
                          </div>
                        </td>
                        <td style={{ padding: '12px', fontSize: '13px', color: 'var(--text)', fontWeight: '700', textAlign: 'right' }}>{row.revenue}</td>
                        <td style={{ padding: '12px', fontSize: '13px', color: 'var(--text)', fontWeight: '700', textAlign: 'center' }}>{row.rating}</td>
                        <td style={{ padding: '12px' }}>
                          {getStatusBadge(row.status)}
                        </td>
                        <td style={{ padding: '12px', textAlign: 'center' }} onClick={(e) => e.stopPropagation()}>
                          <button 
                            onClick={() => addToast(`Opening actions dropdown menu for ${row.name}`, "success")}
                            style={{ background: 'transparent', border: 'none', color: 'var(--muted)', cursor: 'pointer', padding: '4px' }}
                          >
                            <MoreVertical size={16} />
                          </button>
                        </td>
                      </tr>
                    ))}
                    {filteredEmployees.length === 0 && (
                      <tr>
                        <td colSpan="6" style={{ padding: 'var(--spacing-section)', textAlign: 'center', color: 'var(--muted)', fontSize: '13px' }}>
                          No employees found.
                        </td>
                      </tr>
                    )}
                </tbody>
              </table>
</div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '16px', fontSize: '12px', color: 'var(--muted)' }}>
              <span>Showing {filteredEmployees.length} of {MOCK_EMPLOYEES.length} employees</span>
              <div style={{ display: 'flex', gap: '4px' }}>
                <button onClick={() => addToast("Loaded previous matrix page", "success")} style={{ padding: '4px 8px', border: '1.5px solid #25108f', background: '#fff', borderRadius: '4px', cursor: 'pointer' }}>Prev</button>
                <button onClick={() => addToast("Loaded next matrix page", "success")} style={{ padding: '4px 8px', border: '1.5px solid #25108f', background: '#fff', borderRadius: '4px', cursor: 'pointer' }}>Next</button>
              </div>
            </div>
          </div>
        </div>

        {/* Right Content / Side Panels */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-section)', flex: '1' }}>
          
          {/* Top Performers Leaders Panel */}
          <div className="panel" style={{ background: '#fff', border: '1.5px solid #25108f', borderRadius: '12px', padding: 'var(--spacing-section)', marginBottom: 0, overflow: 'visible' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '20px' }}>
              <Award size={18} style={{ color: '#10b981' }} />
              <h3 style={{ fontSize: '15px', fontWeight: '800', color: 'var(--text)', margin: 0 }}>Revenue Leaders</h3>
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {MOCK_TOP_PERFORMERS.slice(0,4).map((emp, i) => (
                <div 
                  key={i} 
                  onClick={() => addToast(`Opening revenue profile details for ${emp.name}`, "success")}
                  style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer' }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{ width: '36px', height: '36px', borderRadius: '18px', background: i === 0 ? '#fef3c7' : '#f1f5f9', color: i === 0 ? '#d97706' : 'var(--text)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '13px', fontWeight: '800' }}>
                      {emp.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <strong style={{ display: 'block', fontSize: '13px', color: 'var(--text)' }}>{emp.name}</strong>
                      <span style={{ fontSize: '11px', color: 'var(--muted)' }}>{emp.status}</span>
                    </div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <strong style={{ display: 'block', fontSize: '13px', color: '#4f46e5' }}>{emp.revenue}</strong>
                    <span style={{ fontSize: '11px', color: '#10b981', fontWeight: '700' }}>{emp.performance}</span>
                  </div>
                </div>
              ))}
            </div>
            <button 
              onClick={() => addToast("Navigating to full rankings roster page...", "success")}
              className="cursor-pointer"
              style={{ width: '100%', marginTop: '20px', padding: '10px', background: 'transparent', border: '1.5px solid #25108f', borderRadius: '8px', fontSize: '12px', fontWeight: '800', color: 'var(--text)' }}
            >
              VIEW FULL RANKING
            </button>
          </div>

          {/* Branch Performance Leaderboard */}
          <div className="panel" style={{ background: '#fff', border: '1.5px solid #25108f', borderRadius: '12px', padding: 'var(--spacing-section)', marginBottom: 0 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '20px' }}>
              <MapPin size={18} style={{ color: '#ec4899' }} />
              <h3 style={{ fontSize: '15px', fontWeight: '800', color: 'var(--text)', margin: 0 }}>Branch Leaderboard</h3>
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {MOCK_BRANCH_LEADERBOARD.map((b) => (
                <div 
                  key={b.rank} 
                  onClick={() => addToast(`Opening branch analytics dashboard for ${b.branch}`, "success")}
                  style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px', borderRadius: '8px', background: '#f8fafc', border: '1.5px solid #25108f', cursor: 'pointer' }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{ width: '24px', height: '24px', borderRadius: '12px', background: b.rank === 1 ? '#d1fae5' : '#e2e8f0', color: b.rank === 1 ? '#059669' : 'var(--muted)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px', fontWeight: '800' }}>
                      #{b.rank}
                    </div>
                    <div>
                      <strong style={{ display: 'block', fontSize: '13px', color: 'var(--text)' }}>{b.branch}</strong>
                      <span style={{ fontSize: '10px', color: 'var(--muted)' }}>{b.count} Employees</span>
                    </div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <strong style={{ display: 'block', fontSize: '13px', color: 'var(--text)' }}>{b.score}</strong>
                    <span style={{ fontSize: '10px', color: 'var(--muted)', display: 'flex', alignItems: 'center', gap: '2px', justifyContent: 'flex-end' }}>
                      <Star size={10} style={{ color: '#f59e0b', fill: '#f59e0b' }} /> {b.rating}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Rating Distribution (Pie/Doughnut Placeholder) */}
          <div className="panel" style={{ background: '#fff', border: '1.5px solid #25108f', borderRadius: '12px', padding: 'var(--spacing-section)', marginBottom: 0 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '20px' }}>
              <Star size={18} style={{ color: '#f59e0b' }} />
              <h3 style={{ fontSize: '15px', fontWeight: '800', color: 'var(--text)', margin: 0 }}>Rating Distribution</h3>
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {[
                { label: '5 Stars', val: 55, color: '#10b981' },
                { label: '4 Stars', val: 30, color: '#3b82f6' },
                { label: '3 Stars', val: 10, color: '#f59e0b' },
                { label: '1-2 Stars', val: 5, color: '#ef4444' }
              ].map(item => (
                <div key={item.label}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', fontWeight: '700', marginBottom: '6px' }}>
                    <span style={{ color: 'var(--text)' }}>{item.label}</span>
                    <span style={{ color: 'var(--muted)' }}>{item.val}%</span>
                  </div>
                  <div style={{ height: '6px', background: '#f1f5f9', borderRadius: '3px', overflow: 'hidden' }}>
                    <div style={{ width: `${item.val}%`, height: '100%', background: item.color, borderRadius: '3px' }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}


