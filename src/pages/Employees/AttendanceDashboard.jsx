import React, { useState } from 'react';
import { Calendar, Download, UserCheck, UserMinus, Clock, Hourglass, SlidersHorizontal, ChevronLeft, ChevronRight, MoreVertical } from 'lucide-react';
import { useToast } from '../../components/common/ToastNotification';
import { Calendar as DateRangeCalendar } from 'react-date-range';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';

const attendanceDetails = [
  { name: 'Marcus Holloway', id: 'EMP-9283', dept: 'Engineering', shift: '09:00 - 18:00', checkIn: '08:54 AM', status: 'ON TIME', statusClass: 'on-time', initials: 'MH', bg: '#ecfdf5', color: '#059669' },
  { name: 'Elara Vance', id: 'EMP-4412', dept: 'Design', shift: '09:00 - 18:00', checkIn: '09:12 AM', status: 'LATE', statusClass: 'late', initials: 'EV', bg: '#fef3c7', color: '#d97706' },
  { name: 'Julian Thorne', id: 'EMP-0922', dept: 'Operations', shift: '08:00 - 17:00', checkIn: '- - : - -', status: 'ABSENT', statusClass: 'absent', initials: 'JT', bg: '#fee2e2', color: '#ef4444' }
];

export default function AttendanceDashboard() {
  const { addToast } = useToast();
  const [date, setDate] = useState('2024-06-14');
  const [viewType, setViewType] = useState('Real-time');
  const [activeDropdown, setActiveDropdown] = useState(null);

  return (
    <div className="attendance-dashboard-flow">
      {activeDropdown !== null && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 40 }} onClick={() => setActiveDropdown(null)} />
      )}
      {/* Title Header */}
      <div className="partners-page-header">
        <div>
          <h1 className="page-title">Attendance Dashboard</h1>
          <p className="page-subtitle">Monitoring real-time presence across all branches.</p>
        </div>
        <div className="partners-header-buttons">
          <div style={{ position: 'relative', zIndex: 99 }}>
            <div 
              onClick={() => setActiveDropdown(activeDropdown === 'calendar' ? null : 'calendar')} 
              style={{ display: 'flex', alignItems: 'center', gap: '8px', border: '1.5px solid #25108f', padding: '6px 12px', borderRadius: '6px', background: '#fff', cursor: 'pointer' }}
            >
              <Calendar size={16} />
              <span style={{ fontWeight: '700', fontSize: '13px', color: 'var(--text)' }}>
                {new Date(date).toLocaleDateString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' })}
              </span>
            </div>
            {activeDropdown === 'calendar' && (
              <div className="calendar-dropdown">
                <DateRangeCalendar 
                  date={new Date(date)}
                  onChange={(item) => {
                    const localDate = new Date(item.getTime() - (item.getTimezoneOffset() * 60000)).toISOString().split('T')[0];
                    setDate(localDate);
                    setActiveDropdown(null);
                  }}
                  color="#25108f"
                />
              </div>
            )}
          </div>

          <button 
            onClick={() => window.print()}
            className="primary-action-btn font-bold cursor-pointer" 
            type="button" 
            style={{ height: '36px' }}
          >
            <Download size={14} style={{ marginRight: '4px' }} />
            <span>Export PDF</span>
          </button>
        </div>
      </div>

      {/* KPI Cards Row */}
      <section className="kpi-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', marginBottom: '24px', gap: '16px' }}>
        {/* Today's Attendance */}
        <div 
          onClick={() => addToast("Card clicked: Today's Attendance details", "success")}
          className="panel kpi-card" 
          style={{ display: 'flex', justifyContent: 'space-between', padding: '12px', minHeight: '80px', background: '#fff', border: '1.5px solid #25108f', cursor: 'pointer', marginBottom: 0 }}
        >
          <div>
            <span style={{ fontSize: '9px', fontWeight: '800', color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.5px', display: 'block' }}>Today's Attendance</span>
            <strong style={{ display: 'block', fontSize: '18px', margin: '4px 0 2px', color: 'var(--text)' }}>1,248 <span style={{ fontSize: '11px', color: 'var(--muted)', fontWeight: 'normal' }}>/ 1,350</span></strong>
            <span style={{ fontSize: '9px', color: '#10b981', fontWeight: '700', display: 'block' }}>↗ 92.4% rate today</span>
          </div>
          <span style={{ color: 'var(--primary)', width: '28px', height: '28px', borderRadius: '50%', backgroundColor: '#eee9f6', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><UserCheck size={14} /></span>
        </div>

        {/* Absent */}
        <div 
          onClick={() => addToast("Card clicked: Absent employees list", "success")}
          className="panel kpi-card" 
          style={{ display: 'flex', justifyContent: 'space-between', padding: '12px', minHeight: '80px', background: '#fff', border: '1.5px solid #25108f', cursor: 'pointer', marginBottom: 0 }}
        >
          <div>
            <span style={{ fontSize: '9px', fontWeight: '800', color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.5px', display: 'block' }}>Absent</span>
            <strong style={{ display: 'block', fontSize: '18px', margin: '4px 0 2px', color: 'var(--text)' }}>42</strong>
            <span style={{ fontSize: '9px', color: '#ef4444', fontWeight: '700', display: 'block' }}>↗ +12% from yesterday</span>
          </div>
          <span style={{ color: '#ef4444', width: '28px', height: '28px', borderRadius: '50%', backgroundColor: '#fee2e2', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><UserMinus size={14} /></span>
        </div>

        {/* Late Arrivals */}
        <div 
          onClick={() => addToast("Card clicked: Late arrivals roster", "success")}
          className="panel kpi-card" 
          style={{ display: 'flex', justifyContent: 'space-between', padding: '12px', minHeight: '80px', background: '#fff', border: '1.5px solid #25108f', cursor: 'pointer', marginBottom: 0 }}
        >
          <div>
            <span style={{ fontSize: '9px', fontWeight: '800', color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.5px', display: 'block' }}>Late Arrivals</span>
            <strong style={{ display: 'block', fontSize: '18px', margin: '4px 0 2px', color: 'var(--text)' }}>15</strong>
            <span style={{ fontSize: '9px', color: 'var(--muted)', fontWeight: '700', display: 'block' }}>→ Stable trend</span>
          </div>
          <span style={{ color: '#d97706', width: '28px', height: '28px', borderRadius: '50%', backgroundColor: '#fef3c7', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Clock size={14} /></span>
        </div>

        {/* Total Hours */}
        <div 
          onClick={() => addToast("Card clicked: Total cumulative hours logged", "success")}
          className="panel kpi-card" 
          style={{ display: 'flex', justifyContent: 'space-between', padding: '12px', minHeight: '80px', background: '#fff', border: '1.5px solid #25108f', cursor: 'pointer', marginBottom: 0 }}
        >
          <div>
            <span style={{ fontSize: '9px', fontWeight: '800', color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.5px', display: 'block' }}>Total Hours (Today)</span>
            <strong style={{ display: 'block', fontSize: '18px', margin: '4px 0 2px', color: 'var(--text)' }}>9,842h</strong>
            <span style={{ fontSize: '9px', color: '#4f46e5', fontWeight: '700', display: 'block' }}>↗ High productivity peak</span>
          </div>
          <span style={{ color: '#0ea5e9', width: '28px', height: '28px', borderRadius: '50%', backgroundColor: '#e0f2fe', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Hourglass size={14} /></span>
        </div>
      </section>

      {/* Middle Row Grid */}
      <div className="fraud-top-grid" style={{ marginBottom: '24px', gap: '20px' }}>
        
        {/* Attendance Trends */}
        <div className="panel" style={{ flex: 1.6, padding: 'var(--spacing-section)' }}>
          <div className="service-card-title-wrap header-row-justify" style={{ marginBottom: '20px' }}>
            <div>
              <h2 style={{ fontSize: '16px', fontWeight: '700', margin: '0' }}>Attendance Trends</h2>
              <p style={{ margin: '2px 0 0', color: 'var(--muted)', fontSize: '12px' }}>Presence overview for the last 14 days</p>
            </div>
            <div 
              onClick={() => addToast("Opened trend analytics picker", "success")}
              style={{ display: 'flex', gap: '8px', border: '1.5px solid #25108f', padding: '4px 8px', borderRadius: '6px', fontSize: '12px', fontWeight: '700', backgroundColor: '#fff', cursor: 'pointer' }}
            >
              <span>Last 14 Days</span>
            </div>
          </div>

          {/* SVG line chart */}
          <div className="analytics-chart-viewport" style={{ height: '180px', position: 'relative' }}>
            <svg width="100%" height="100%" viewBox="0 0 600 180" preserveAspectRatio="none">
              <line x1="0" y1="45" x2="600" y2="45" stroke="#f1f5f9" strokeWidth="1" />
              <line x1="0" y1="90" x2="600" y2="90" stroke="#f1f5f9" strokeWidth="1" />
              <line x1="0" y1="135" x2="600" y2="135" stroke="#f1f5f9" strokeWidth="1" />

              <path d="M 0 140 C 100 110, 200 130, 300 90 C 400 70, 500 110, 600 80" fill="none" stroke="#4f46e5" strokeWidth="3" />
            </svg>
          </div>
        </div>

        {/* Breakdowns */}
        <div className="panel" style={{ flex: 1, padding: 'var(--spacing-section)', display: 'flex', flexDirection: 'column' }}>
          <h2 style={{ fontSize: '16px', fontWeight: '700', margin: '0 0 16px' }}>Shift Compliance Rate</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', flex: 1, justifyContent: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '12px' }}>
              <span style={{ width: '80px', fontWeight: '700' }}>Morning Shift</span>
              <div style={{ flex: 1, height: '8px', background: '#f1f5f9', borderRadius: '4px', overflow: 'hidden' }}>
                <div style={{ width: '94%', height: '100%', background: '#4f46e5', borderRadius: '4px' }} />
              </div>
              <span style={{ width: '30px', textAlign: 'right', fontWeight: '700' }}>94%</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '12px' }}>
              <span style={{ width: '80px', fontWeight: '700' }}>Evening Shift</span>
              <div style={{ flex: 1, height: '8px', background: '#f1f5f9', borderRadius: '4px', overflow: 'hidden' }}>
                <div style={{ width: '88%', height: '100%', background: '#4f46e5', borderRadius: '4px' }} />
              </div>
              <span style={{ width: '30px', textAlign: 'right', fontWeight: '700' }}>88%</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '12px' }}>
              <span style={{ width: '80px', fontWeight: '700' }}>Night Shift</span>
              <div style={{ flex: 1, height: '8px', background: '#f1f5f9', borderRadius: '4px', overflow: 'hidden' }}>
                <div style={{ width: '76%', height: '100%', background: '#cbc5d9', borderRadius: '4px' }} />
              </div>
              <span style={{ width: '30px', textAlign: 'right', fontWeight: '700' }}>76%</span>
            </div>
          </div>
        </div>

      </div>

      {/* Attendance List */}
      <section className="panel partner-directory-panel" style={{ marginBottom: '24px' }}>
        <div className="panel-head" style={{ padding: '16px 20px', borderBottom: '1.5px solid #25108f' }}>
          <h2 style={{ fontSize: '15px', fontWeight: '800' }}>Attendance Records</h2>
          <div style={{ display: 'flex', gap: '12px' }}>
            <button 
              onClick={() => addToast("Switched attendance view filters", "success")}
              className="secondary-action-btn cursor-pointer" 
              style={{ height: '32px' }} 
              type="button"
            >
              <SlidersHorizontal size={14} style={{ marginRight: '4px' }} />
              <span>Filter View</span>
            </button>
          </div>
        </div>

        <div className="table-wrap">
          <div className="table-responsive-wrapper">
<table className="partner-table">
            <thead>
              <tr>
                <th>EMPLOYEE</th>
                <th>DEPARTMENT</th>
                <th>SHIFT SCHEDULE</th>
                <th>CHECK-IN TIME</th>
                <th>COMPLIANCE STATUS</th>
                <th style={{ width: '60px' }}></th>
              </tr>
            </thead>
            <tbody>
              {attendanceDetails.map((emp, index) => (
                <tr 
                  key={index} 
                  onClick={() => addToast(`Showing attendance card history for ${emp.name}`, "success")}
                  className="partner-row-clickable"
                >
                  <td style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '14px 20px' }}>
                    <span style={{ width: '28px', height: '28px', borderRadius: '50%', backgroundColor: emp.bg, color: emp.color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px', fontWeight: '800' }}>
                      {emp.initials}
                    </span>
                    <div>
                      <strong style={{ fontSize: '13px', display: 'block' }}>{emp.name}</strong>
                      <span style={{ fontSize: '11px', color: 'var(--muted)' }}>{emp.id}</span>
                    </div>
                  </td>
                  <td>{emp.dept}</td>
                  <td>{emp.shift}</td>
                  <td>{emp.checkIn}</td>
                  <td>
                    <span
                      className="status-badge"
                      style={{
                        fontSize: '10px',
                        fontWeight: '800',
                        color: emp.statusClass === 'on-time' ? '#059669' : emp.statusClass === 'late' ? '#d97706' : '#ef4444',
                        background: emp.statusClass === 'on-time' ? '#ecfdf5' : emp.statusClass === 'late' ? '#fef3c7' : '#fee2e2',
                      }}
                    >
                      {emp.status}
                    </span>
                  </td>
                  <td onClick={(e) => e.stopPropagation()}>
                    <div style={{ position: 'relative', zIndex: activeDropdown === index ? 50 : 1 }}>
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          setActiveDropdown(activeDropdown === index ? null : index);
                        }}
                        className="table-row-action-btn cursor-pointer" 
                        style={{ border: 'none', background: 'transparent', color: 'var(--muted)', padding: '4px' }}
                        type="button"
                      >
                        <MoreVertical size={16} />
                      </button>
                      
                      {activeDropdown === index && (
                        <div style={{ position: 'absolute', right: 0, top: '100%', background: '#fff', border: '1.5px solid #25108f', borderRadius: '8px', boxShadow: '0 10px 25px -5px rgba(0,0,0,0.1)', minWidth: '140px', padding: '6px 0', marginTop: '4px' }}>
                          <button onClick={(e) => { e.stopPropagation(); addToast(`Editing record for ${emp.name}...`, "info"); setActiveDropdown(null); }} style={{ width: '100%', textAlign: 'left', padding: '8px 16px', background: 'transparent', border: 'none', cursor: 'pointer', fontSize: '13px', color: 'var(--text)' }}>Edit Record</button>
                          <button onClick={(e) => { e.stopPropagation(); addToast(`Marking ${emp.name} as absent...`, "info"); setActiveDropdown(null); }} style={{ width: '100%', textAlign: 'left', padding: '8px 16px', background: 'transparent', border: 'none', cursor: 'pointer', fontSize: '13px', color: 'var(--text)' }}>Mark Absent</button>
                          <button onClick={(e) => { e.stopPropagation(); addToast(`Deleting record for ${emp.name}...`, "error"); setActiveDropdown(null); }} style={{ width: '100%', textAlign: 'left', padding: '8px 16px', background: 'transparent', border: 'none', cursor: 'pointer', fontSize: '13px', color: '#ef4444' }}>Delete</button>
                        </div>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
</div>
        </div>

        {/* Footer pagination */}
        <div className="directory-table-footer">
          <span className="footer-results-text">Showing 1-3 of 1,248 records</span>
          <div className="pagination-wrap">
            <button 
              onClick={() => addToast("Loaded previous attendance records page", "success")}
              className="pag-nav-btn cursor-pointer" 
              type="button" 
              disabled
            >
              <ChevronLeft size={16} />
            </button>
            <button onClick={() => addToast("Loaded page 1", "success")} className="pag-num-btn active cursor-pointer" type="button">1</button>
            <button onClick={() => addToast("Loaded page 2", "success")} className="pag-num-btn cursor-pointer" type="button">2</button>
            <button onClick={() => addToast("Loaded page 3", "success")} className="pag-num-btn cursor-pointer" type="button">3</button>
            <button 
              onClick={() => addToast("Loaded next attendance records page", "success")}
              className="pag-nav-btn cursor-pointer" 
              type="button"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}


