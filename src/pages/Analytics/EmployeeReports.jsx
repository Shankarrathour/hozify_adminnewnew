import React, { useState } from 'react';
import AdminShell from '../../components/layouts/AdminShell';
import {
  Calendar,
  Filter,
  TrendingDown,
  TrendingUp,
  Star,
  ChevronDown,
  ArrowUpRight,
  ArrowRight,
  MoreVertical
} from 'lucide-react';

/* ─────────────── STATIC DATA ─────────────── */
const KPI_CARDS = [
  { id: 'completion', label: 'AVG COMPLETION TIME', value: '24.5m', growth: '-2.4%', isPositive: false, type: 'line', lineVal: 60, lineColor: '#1e1b4b' },
  { id: 'feedback', label: 'FEEDBACK SCORE', value: '4.82', growth: '+0.12', isPositive: true, type: 'stars', stars: 5 },
  { id: 'jobs', label: 'JOBS COMPLETED', value: '1,204', growth: '+18%', isPositive: true, type: 'target', targetText: 'Target: 1,500 by EOM' },
  { id: 'productivity', label: 'PRODUCTIVITY RATE', value: '92.1%', growth: '+3.2%', isPositive: true, type: 'status', statusText: 'Above Threshold' }
];

const TRENDS_DATA = [
  { day: 'MON', val: 50 },
  { day: 'TUE', val: 70 },
  { day: 'WED', val: 55 },
  { day: 'THU', val: 93, isHigh: true },
  { day: 'FRI', val: 65 },
  { day: 'SAT', val: 75 },
  { day: 'SUN', val: 40 }
];

const LEADERBOARD_DATA = [
  { rank: '01', name: 'Elena Vance', role: 'Tech Lead', score: '98.5', badge: 'TOP 1%', avatar: 'EV', color: '#0ea5e9' },
  { rank: '02', name: 'Marcus Thorne', role: 'Senior Analyst', score: '96.2', avatar: 'MT', color: '#4f46e5' },
  { rank: '03', name: 'Sarah Jenkins', role: 'Team Manager', score: '95.8', avatar: 'SJ', color: '#10b981' },
  { rank: '04', name: 'David Chen', role: 'Ops Specialist', score: '94.1', avatar: 'DC', color: '#f59e0b' }
];

const STAFF_DATA = [
  { id: '1', name: 'Lila Thorne', role: 'Customer Experience', avatar: 'LT', color: '#8b5cf6', jobs: '42 Completed', time: '18m 42s', feedback: '4.9', trend: 'up' },
  { id: '2', name: 'James Wilson', role: 'Logistics Lead', avatar: 'JW', color: '#3b82f6', jobs: '36 Completed', time: '22m 15s', feedback: '4.7', trend: 'flat' },
  { id: '3', name: 'Sofia Rodriguez', role: 'Support Tier III', avatar: 'SR', color: '#10b981', jobs: '51 Completed', time: '15m 10s', feedback: '5.0', trend: 'up' }
];

/* ─────────────── HELPERS ─────────────── */
function Avatar({ initials, color }) {
  return (
    <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: color + '20', color: color, fontWeight: '700', fontSize: '11px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      {initials}
    </div>
  );
}

/* ─────────────── MAIN PAGE ─────────────── */
export default function EmployeeReports() {
  const maxTrend = 100;

  return (
    <AdminShell activeTab="Reports & Analytics" searchPlaceholder="Search export..." headerTitle="Employee Reports">
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', fontFamily: "'Inter', sans-serif" }}>

        {/* ── HEADER ── */}
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
          <div>
            <h1 style={{ fontSize: '22px', fontWeight: '700', color: '#0f172a', margin: 0, lineHeight: 1.3 }}>Employee Reports</h1>
            <p style={{ margin: '4px 0 0', color: '#64748b', fontSize: '13px' }}>Comprehensive tracking of staff performance and operational efficiency.</p>
          </div>
          <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
            <button style={{ display: 'flex', alignItems: 'center', gap: '6px', background: '#fff', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '8px 12px', fontSize: '12px', fontWeight: '600', color: '#334155', cursor: 'pointer' }}>
              <Calendar size={14} color="#64748b" /> Last 30 Days
            </button>
            <button style={{ display: 'flex', alignItems: 'center', gap: '6px', background: '#fff', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '8px 12px', fontSize: '12px', fontWeight: '600', color: '#334155', cursor: 'pointer' }}>
              <Filter size={14} color="#64748b" /> Filters
            </button>
          </div>
        </div>

        {/* ── KPI CARDS ── */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px' }}>
          {KPI_CARDS.map(card => (
            <div 
              key={card.id} 
              className="report-kpi-card"
              style={{ background: '#fff', borderRadius: '12px', padding: '20px', display: 'flex', flexDirection: 'column', gap: '12px' }}
            >
              <span style={{ fontSize: '10px', fontWeight: '700', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.5px' }}>{card.label}</span>
              <div style={{ display: 'flex', alignItems: 'flex-end', gap: '8px' }}>
                <span style={{ fontSize: '26px', fontWeight: '800', color: '#0f172a', lineHeight: 1 }}>{card.value}</span>
                <span style={{ fontSize: '12px', fontWeight: '700', color: card.isPositive ? '#10b981' : '#ef4444', marginBottom: '2px' }}>
                  {card.growth}
                </span>
              </div>
              
              <div style={{ marginTop: 'auto', minHeight: '20px', display: 'flex', alignItems: 'flex-end' }}>
                {card.type === 'line' && (
                  <div style={{ width: '100%', height: '3px', background: '#f1f5f9' }}>
                    <div style={{ width: `${card.lineVal}%`, height: '100%', background: card.lineColor }} />
                  </div>
                )}
                {card.type === 'stars' && (
                  <div style={{ display: 'flex', gap: '2px' }}>
                    {[...Array(5)].map((_, i) => <Star key={i} size={12} fill="#1e1b4b" color="#1e1b4b" />)}
                  </div>
                )}
                {card.type === 'target' && (
                  <span style={{ fontSize: '11px', color: '#94a3b8', fontWeight: '500' }}>{card.targetText}</span>
                )}
                {card.type === 'status' && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#10b981' }} />
                    <span style={{ fontSize: '11px', color: '#0f172a', fontWeight: '600' }}>{card.statusText}</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* ── ROW 2: Charts & Leaderboard ── */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: '16px', alignItems: 'stretch' }}>
          
          {/* Productivity Trends */}
          <div style={{ background: '#fff', borderRadius: '12px', border: '1px solid #e2e8f0', display: 'flex', flexDirection: 'column' }}>
            <div style={{ padding: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #f1f5f9' }}>
              <h2 style={{ margin: 0, fontSize: '14px', fontWeight: '700', color: '#0f172a' }}>Productivity Trends</h2>
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '12px', fontWeight: '600', color: '#64748b', cursor: 'pointer' }}>
                Weekly <ChevronDown size={14} />
              </div>
            </div>
            
            <div style={{ padding: '30px 20px', flex: 1, display: 'flex', gap: '8px', alignItems: 'flex-end', height: '220px' }}>
              {TRENDS_DATA.map(d => {
                const pct = (d.val / maxTrend) * 100;
                return (
                  <div key={d.day} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px', height: '100%', justifyContent: 'flex-end', position: 'relative' }}>
                    {d.isHigh && (
                      <div style={{ position: 'absolute', top: `${100 - pct - 20}%`, background: '#1e1b4b', color: '#fff', fontSize: '10px', fontWeight: '700', padding: '4px 8px', borderRadius: '4px' }}>
                        {d.val}%
                      </div>
                    )}
                    <div style={{ width: '40px', height: `${pct}%`, background: d.isHigh ? '#cbd5e1' : '#e2e8f0', borderRadius: '2px 2px 0 0' }} />
                    <span style={{ fontSize: '10px', fontWeight: '700', color: '#94a3b8', letterSpacing: '0.5px' }}>{d.day}</span>
                  </div>
                );
              })}
            </div>
            <div style={{ height: '40px', background: '#f8fafc', borderTop: '1px solid #f1f5f9', borderRadius: '0 0 12px 12px' }} />
          </div>

          {/* Performance Leaderboard */}
          <div style={{ background: '#fff', borderRadius: '12px', border: '1px solid #e2e8f0', display: 'flex', flexDirection: 'column' }}>
            <div style={{ padding: '20px', borderBottom: '1px solid #f1f5f9' }}>
              <h2 style={{ margin: 0, fontSize: '14px', fontWeight: '700', color: '#0f172a' }}>Performance Leaderboard</h2>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
              {LEADERBOARD_DATA.map((row, i) => (
                <div key={row.rank} style={{ padding: '16px 20px', display: 'flex', alignItems: 'center', gap: '16px', borderBottom: i < LEADERBOARD_DATA.length - 1 ? '1px solid #f8fafc' : 'none' }}>
                  <span style={{ fontSize: '12px', fontWeight: '800', color: '#94a3b8' }}>{row.rank}</span>
                  <Avatar initials={row.avatar} color={row.color} />
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: '13px', fontWeight: '700', color: '#0f172a' }}>{row.name}</div>
                    <div style={{ fontSize: '11px', color: '#64748b' }}>{row.role}</div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: '14px', fontWeight: '800', color: '#0f172a' }}>{row.score}</div>
                    {row.badge && (
                      <div style={{ fontSize: '9px', fontWeight: '800', color: '#4f46e5', marginTop: '2px' }}>{row.badge}</div>
                    )}
                  </div>
                </div>
              ))}
            </div>
            <button style={{ border: 'none', borderTop: '1px solid #e2e8f0', background: 'transparent', padding: '16px', fontSize: '12px', fontWeight: '700', color: '#0f172a', cursor: 'pointer', borderRadius: '0 0 12px 12px' }}>
              View Full Leaderboard
            </button>
          </div>
        </div>

        {/* ── BOTTOM TABLE ── */}
        <div style={{ background: '#fff', borderRadius: '12px', border: '1px solid #e2e8f0', display: 'flex', flexDirection: 'column' }}>
          
          <div style={{ padding: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #e2e8f0' }}>
            <h2 style={{ margin: 0, fontSize: '14px', fontWeight: '700', color: '#0f172a' }}>Staff Performance Breakdown</h2>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#1e1b4b' }} />
                <span style={{ fontSize: '11px', color: '#64748b' }}>High Performance</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#94a3b8' }} />
                <span style={{ fontSize: '11px', color: '#64748b' }}>Standard</span>
              </div>
            </div>
          </div>

          <div style={{ overflowY: 'auto', maxHeight: '400px' }}>
            <div className="table-responsive-wrapper">
<table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
              <thead>
                <tr style={{ background: '#f8fafc', borderBottom: '1px solid #e2e8f0' }}>
                  {['Employee', 'Job Status', 'Completion Time', 'Feedback', 'Trend', 'Action'].map(col => (
                    <th key={col} style={{ padding: '12px 20px', fontSize: '10px', fontWeight: '700', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.5px' }}>{col}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {STAFF_DATA.map((row, i) => (
                  <tr key={row.id} style={{ borderBottom: i < STAFF_DATA.length - 1 ? '1px solid #f1f5f9' : 'none' }}>
                    <td style={{ padding: '16px 20px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <Avatar initials={row.avatar} color={row.color} />
                        <div>
                          <div style={{ fontSize: '13px', fontWeight: '700', color: '#0f172a' }}>{row.name}</div>
                          <div style={{ fontSize: '11px', color: '#94a3b8', marginTop: '2px' }}>{row.role}</div>
                        </div>
                      </div>
                    </td>
                    <td style={{ padding: '16px 20px' }}>
                      <span style={{ background: '#f1f5f9', color: '#475569', fontSize: '11px', fontWeight: '600', padding: '4px 10px', borderRadius: '20px' }}>
                        {row.jobs}
                      </span>
                    </td>
                    <td style={{ padding: '16px 20px', fontSize: '13px', color: '#0f172a', fontWeight: '500' }}>
                      {row.time}
                    </td>
                    <td style={{ padding: '16px 20px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '13px', fontWeight: '700', color: '#0f172a' }}>
                        {row.feedback} <Star size={12} fill="#0f172a" />
                      </div>
                    </td>
                    <td style={{ padding: '16px 20px', color: '#64748b' }}>
                      {row.trend === 'up' ? <ArrowUpRight size={16} /> : <ArrowRight size={16} />}
                    </td>
                    <td style={{ padding: '16px 20px' }}>
                      <button style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: '#94a3b8' }}>
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
    </AdminShell>
  );
}
