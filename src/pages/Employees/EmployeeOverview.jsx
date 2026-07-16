import React, { useState } from 'react';
import { Calendar as DateRangeCalendar } from 'react-date-range';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import {
  Users,
  CheckCircle,
  Clock,
  UserCheck,
  AlertCircle,
  Calendar,
  Download,
  Star,
  ShieldAlert,
  ArrowUpRight,
  TrendingUp,
  SlidersHorizontal,
  ChevronRight
} from 'lucide-react';
import { useToast } from '../../components/common/ToastNotification';

const overviewKpis = [
  { title: 'TOTAL EMPLOYEES', value: '1,284', trend: '12%', positive: true, icon: Users },
  { title: 'ACTIVE WORKFORCE', value: '942', footer: '73% of workforce', icon: UserCheck },
  { title: 'AVAILABLE STAFF', value: '156', footer: 'Ready for task', icon: CheckCircle },
  { title: 'BUSY ON ASSIGNMENT', value: '112', footer: 'On assignment', icon: Clock },
  { title: 'ON VACATION/LEAVE', value: '64', footer: 'Vacation/Medical', icon: Calendar },
  { title: 'SUSPENDED/INACTIVE', value: '10', footer: 'Requires action', icon: AlertCircle, negative: true }
];

const newJoinings = [
  {
    name: 'David Chen',
    role: 'Operations Specialist',
    time: 'Joined 2h ago',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=80&h=80&q=80'
  },
  {
    name: 'Sarah Jenkins',
    role: 'Support Lead',
    time: 'Joined 5h ago',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=80&h=80&q=80'
  },
  {
    name: 'Marcus Rivera',
    role: 'Field Tech',
    time: 'Joined Yesterday',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=80&h=80&q=80'
  }
];

const kycAlerts = [
  {
    name: 'Alex Kim',
    docType: 'Work Authorization',
    expiryDate: 'Expired (Oct 12)',
    status: 'CRITICAL',
    action: 'Remind',
    initials: 'AK',
    bg: '#fee2e2',
    color: '#ef4444'
  },
  {
    name: 'Lisa Lopez',
    docType: 'Identity Card',
    expiryDate: 'Nov 15, 2024',
    status: 'EXPIRING SOON',
    action: 'Update',
    initials: 'LL',
    bg: '#fef3c7',
    color: '#d97706'
  },
  {
    name: 'James Miller',
    docType: 'Safety Certification',
    expiryDate: 'Pending Verification',
    status: 'REVIEW NEEDED',
    action: 'Review',
    initials: 'JM',
    bg: '#dbeafe',
    color: '#2563eb'
  }
];

export default function EmployeeOverview({ onNavigateToWorkforce }) {
  const { addToast } = useToast();
  const [dateRange, setDateRange] = useState('');
  const [activeDropdown, setActiveDropdown] = useState(null);

  return (
    <div className="employee-overview-flow">
      {/* Title Header */}
      <div className="partners-page-header">
        <div>
          <h1 className="page-title">Employee Overview</h1>
          <p className="page-subtitle">Real-time status of your global workforce at Hozify.</p>
        </div>
        <div className="partners-header-buttons">
          <div style={{ position: 'relative', zIndex: 99 }}>
            {activeDropdown === 'calendar' && (
              <div style={{ position: 'fixed', inset: 0, zIndex: 40 }} onClick={() => setActiveDropdown(null)} />
            )}
            <div 
              onClick={() => setActiveDropdown(activeDropdown === 'calendar' ? null : 'calendar')}
              style={{ display: 'flex', alignItems: 'center', gap: '8px', border: '1.5px solid #25108f', padding: '6px 12px', borderRadius: '6px', background: '#fff', cursor: 'pointer', position: 'relative', zIndex: 41 }}
            >
              <Calendar size={16} />
              <span style={{ fontWeight: '700', fontSize: '13px', color: 'var(--text)' }}>
                {dateRange ? new Date(dateRange).toLocaleDateString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' }) : 'Last 30 Days'}
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
      </div>

      {/* KPI Grid Row */}
      <section className="kpi-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', marginBottom: '24px', gap: '16px' }}>
        {overviewKpis.map((kpi, idx) => {
          const Icon = kpi.icon;
          return (
            <div
              key={idx}
              onClick={() => addToast(`Stat "${kpi.title}": ${kpi.value}`, "success")}
              className="panel kpi-card"
              style={{
                padding: '12px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                minHeight: '80px',
                cursor: 'pointer',
                marginBottom: 0,
              }}
            >
              <div>
                <span style={{ fontSize: '9px', fontWeight: '800', color: 'var(--muted)', textTransform: 'uppercase', display: 'block' }}>{kpi.title}</span>
                <strong style={{ display: 'block', fontSize: '18px', color: kpi.negative ? '#ef4444' : 'var(--text)', marginTop: '4px' }}>{kpi.value}</strong>
              </div>
              {kpi.footer && (
                <span style={{ fontSize: '9px', color: kpi.negative ? '#ef4444' : '#4f46e5', fontWeight: '700', marginTop: '2px', display: 'block' }}>
                  {kpi.footer}
                </span>
              )}
              {kpi.trend && (
                <span style={{ fontSize: '9px', color: '#10b981', fontWeight: '700', marginTop: '2px', display: 'block' }}>
                  ↗ {kpi.trend}
                </span>
              )}
            </div>
          );
        })}
      </section>

      {/* Charts Grid */}
      <div className="fraud-top-grid" style={{ marginBottom: '24px', gap: '20px' }}>
        
        {/* Attendance Trend Chart */}
        <div className="panel" style={{ flex: 1.6, padding: 'var(--spacing-section)' }}>
          <div className="service-card-title-wrap header-row-justify" style={{ marginBottom: '20px' }}>
            <div>
              <h2 style={{ fontSize: '16px', fontWeight: '700', margin: '0' }}>Attendance & Growth Trends</h2>
            </div>
            <div style={{ display: 'flex', gap: '16px', fontSize: '12px', fontWeight: '700' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#4f46e5' }}>
                <span style={{ width: '8px', height: '8px', background: '#4f46e5', borderRadius: '50%' }} />
                Active
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#a5b4fc' }}>
                <span style={{ width: '8px', height: '8px', background: '#a5b4fc', borderRadius: '50%' }} />
                Expected
              </span>
            </div>
          </div>

          {/* SVG Line Chart Viewport */}
          <div className="analytics-chart-viewport" style={{ height: '200px', position: 'relative', overflow: 'hidden' }}>
            <svg width="100%" height="100%" viewBox="0 0 600 200" preserveAspectRatio="none">
              {/* Horizontal grid lines */}
              <line x1="0" y1="40" x2="600" y2="40" stroke="#f1ecf7" strokeWidth="1" />
              <line x1="0" y1="90" x2="600" y2="90" stroke="#f1ecf7" strokeWidth="1" />
              <line x1="0" y1="140" x2="600" y2="140" stroke="#f1ecf7" strokeWidth="1" />

              {/* Expected Line (Dashed) */}
              <path d="M 20 120 C 100 90, 200 130, 300 70 C 400 30, 500 110, 580 90" fill="none" stroke="#a5b4fc" strokeWidth="2.5" strokeDasharray="6,4" />

              {/* Active Line (Gradient Solid) */}
              <path d="M 20 150 C 100 110, 200 140, 300 90 C 400 50, 500 130, 580 100" fill="none" stroke="#4f46e5" strokeWidth="3" />

              {/* Dots for Active Data Points */}
              <circle cx="20" cy="150" r="4.5" fill="#4f46e5" stroke="#fff" strokeWidth="1.5" />
              <circle cx="113" cy="118" r="4.5" fill="#4f46e5" stroke="#fff" strokeWidth="1.5" />
              <circle cx="206" cy="139" r="4.5" fill="#4f46e5" stroke="#fff" strokeWidth="1.5" />
              <circle cx="300" cy="90" r="4.5" fill="#4f46e5" stroke="#fff" strokeWidth="1.5" />
              <circle cx="393" cy="53" r="4.5" fill="#4f46e5" stroke="#fff" strokeWidth="1.5" />
              <circle cx="486" cy="128" r="4.5" fill="#4f46e5" stroke="#fff" strokeWidth="1.5" />
              <circle cx="580" cy="100" r="4.5" fill="#4f46e5" stroke="#fff" strokeWidth="1.5" />
            </svg>
          </div>
          
          {/* Weekday labels */}
          <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 10px 0', fontSize: '11px', color: 'var(--muted)', fontWeight: '700' }}>
            <span>Mon</span>
            <span>Tue</span>
            <span>Wed</span>
            <span>Thu</span>
            <span>Fri</span>
            <span>Sat</span>
            <span>Sun</span>
          </div>
        </div>

        {/* Rating Distribution Card */}
        <div className="panel" style={{ flex: 1, padding: 'var(--spacing-section)', display: 'flex', flexDirection: 'column' }}>
          <h2 style={{ fontSize: '16px', fontWeight: '700', margin: '0 0 16px' }}>Rating Distribution</h2>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', flex: 1, justifyContent: 'center' }}>
            {/* 5 Stars */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '12px' }}>
              <span style={{ width: '50px', fontWeight: '700' }}>5 Stars</span>
              <div style={{ flex: 1, height: '8px', background: '#f1ebf8', borderRadius: '4px', overflow: 'hidden' }}>
                <div style={{ width: '42%', height: '100%', background: '#4f46e5', borderRadius: '4px' }} />
              </div>
              <span style={{ width: '30px', textAlign: 'right', fontWeight: '700' }}>42%</span>
            </div>

            {/* 4 Stars */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '12px' }}>
              <span style={{ width: '50px', fontWeight: '700' }}>4 Stars</span>
              <div style={{ flex: 1, height: '8px', background: '#f1ebf8', borderRadius: '4px', overflow: 'hidden' }}>
                <div style={{ width: '35%', height: '100%', background: '#4f46e5', borderRadius: '4px' }} />
              </div>
              <span style={{ width: '30px', textAlign: 'right', fontWeight: '700' }}>35%</span>
            </div>

            {/* 3 Stars */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '12px' }}>
              <span style={{ width: '50px', fontWeight: '700' }}>3 Stars</span>
              <div style={{ flex: 1, height: '8px', background: '#f1ebf8', borderRadius: '4px', overflow: 'hidden' }}>
                <div style={{ width: '18%', height: '100%', background: '#cbc5d9', borderRadius: '4px' }} />
              </div>
              <span style={{ width: '30px', textAlign: 'right', fontWeight: '700' }}>18%</span>
            </div>

            {/* Below 3 */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '12px' }}>
              <span style={{ width: '50px', fontWeight: '700' }}>Below 3</span>
              <div style={{ flex: 1, height: '8px', background: '#f1ebf8', borderRadius: '4px', overflow: 'hidden' }}>
                <div style={{ width: '5%', height: '100%', background: '#ef4444', borderRadius: '4px' }} />
              </div>
              <span style={{ width: '30px', textAlign: 'right', fontWeight: '700' }}>5%</span>
            </div>
          </div>

          <div style={{ borderTop: '1px solid #f1ecf7', marginTop: '16px', paddingTop: '16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <span style={{ fontSize: '11px', color: 'var(--muted)', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Avg Performance</span>
              <strong style={{ display: 'block', fontSize: '26px', color: 'var(--text)', marginTop: '4px' }}>4.6</strong>
            </div>
            <div style={{ width: '40px', height: '40px', background: '#e0e7ff', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#4f46e5' }}>
              <Star size={20} fill="#4f46e5" stroke="#4f46e5" />
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Grid: New Joinings & KYC Alerts */}
      <div className="fraud-top-grid" style={{ gap: '20px' }}>
        
        {/* New Joinings Panel */}
        <div className="panel" style={{ flex: 1, padding: 'var(--spacing-section)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px' }}>
            <h2 style={{ fontSize: '16px', fontWeight: '700', margin: '0' }}>New Joinings</h2>
            <button
              onClick={onNavigateToWorkforce}
              style={{ border: 'none', background: 'transparent', color: '#4f46e5', fontWeight: '700', fontSize: '13px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}
            >
              View All
            </button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {newJoinings.map((joining, index) => (
              <div 
                key={index} 
                onClick={() => addToast(`Navigating to profile of ${joining.name}...`, "success")}
                style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px', border: '1px solid #f1ecf7', borderRadius: '8px', cursor: 'pointer' }}
              >
                <img src={joining.avatar} alt={joining.name} style={{ width: '40px', height: '40px', borderRadius: '50%', objectFit: 'cover' }} />
                <div style={{ flex: 1 }}>
                  <strong style={{ display: 'block', fontSize: '14px', color: 'var(--text)' }}>{joining.name}</strong>
                  <span style={{ display: 'block', fontSize: '12px', color: 'var(--muted)', marginTop: '2px' }}>{joining.role} • {joining.time}</span>
                </div>
                <ChevronRight size={18} color="var(--muted)" />
              </div>
            ))}
          </div>
        </div>

        {/* Critical KYC Alerts Panel */}
        <div className="panel" style={{ flex: 1.6, padding: 'var(--spacing-section)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px' }}>
            <h2 style={{ fontSize: '16px', fontWeight: '700', margin: '0' }}>Critical KYC Alerts</h2>
            <span style={{ fontSize: '10px', fontWeight: '800', color: '#fff', background: '#ef4444', padding: '4px 8px', borderRadius: '4px', letterSpacing: '0.5px' }}>
              ACTION REQUIRED
            </span>
          </div>

          <div className="table-wrap" style={{ border: '1px solid #e1dce8', borderRadius: '8px', overflow: 'hidden' }}>
            <div className="table-responsive-wrapper">
<table className="approval-queue-table" style={{ width: '100%', minWidth: 'auto' }}>
              <thead>
                <tr>
                  <th style={{ padding: '10px 14px', fontSize: '10px' }}>EMPLOYEE</th>
                  <th style={{ padding: '10px 14px', fontSize: '10px' }}>DOCUMENT TYPE</th>
                  <th style={{ padding: '10px 14px', fontSize: '10px' }}>EXPIRY DATE</th>
                  <th style={{ padding: '10px 14px', fontSize: '10px' }}>STATUS</th>
                  <th style={{ padding: '10px 14px', fontSize: '10px', textAlign: 'right' }}>ACTIONS</th>
                </tr>
              </thead>
              <tbody>
                {kycAlerts.map((alert, index) => (
                  <tr key={index}>
                    <td style={{ padding: '12px 14px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span style={{ width: '28px', height: '28px', borderRadius: '50%', backgroundColor: alert.bg, color: alert.color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px', fontWeight: '800' }}>
                          {alert.initials}
                        </span>
                        <strong style={{ fontSize: '13px' }}>{alert.name}</strong>
                      </div>
                    </td>
                    <td style={{ padding: '12px 14px', color: 'var(--muted)', fontSize: '12px' }}>{alert.docType}</td>
                    <td style={{ padding: '12px 14px', color: alert.status === 'CRITICAL' ? '#ef4444' : 'var(--text)', fontSize: '12px', fontWeight: '700' }}>
                      {alert.expiryDate}
                    </td>
                    <td style={{ padding: '12px 14px' }}>
                      <span style={{ fontSize: '9px', fontWeight: '800', padding: '3px 6px', borderRadius: '3px', color: alert.color, background: alert.bg }}>
                        {alert.status}
                      </span>
                    </td>
                    <td style={{ padding: '12px 14px', textAlign: 'right' }}>
                      <button
                        onClick={() => addToast(`KYC Alert Action: "${alert.action}" triggered for ${alert.name}`, "success")}
                        style={{ border: 'none', background: 'transparent', color: '#4f46e5', fontWeight: '700', fontSize: '12px', cursor: 'pointer', padding: 0 }}
                      >
                        {alert.action}
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
    </div>
  );
}


