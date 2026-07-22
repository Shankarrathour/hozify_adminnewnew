import React, { useState } from 'react';
import AdminShell from '../../components/layouts/AdminShell';
import {
  Calendar,
  Filter,
  TrendingUp,
  MapPin,
  MoreVertical,
  Activity,
  ChevronDown,
  Info
} from 'lucide-react';

/* ─────────────── STATIC DATA ─────────────── */
const QUALITY_SCORE_BARS = [
  { val: 60, isDark: false }, { val: 75, isDark: false }, { val: 65, isDark: false },
  { val: 90, isDark: true }, { val: 85, isDark: true }, { val: 70, isDark: false },
  { val: 95, isDark: true }, { val: 65, isDark: false }, { val: 50, isDark: false },
  { val: 80, isDark: true }
];

const KPI_CARDS = [
  { id: 'total', title: 'Total Partners', value: '1,284', type: 'badge', badgeText: '+12 New', badgeColor: '#3b82f6', badgeBg: '#eff6ff' },
  { id: 'sla', title: 'SLA Compliance', value: '98.1%', type: 'progress', progressVal: 98.1 },
  { id: 'latency', title: 'Avg. Latency', value: '24ms', type: 'target', targetText: 'Target: <30ms' },
  { id: 'rank', title: 'Uptime Rank', value: 'Tier 1', type: 'dots', activeDots: 3, totalDots: 4 }
];

const PARTNERS_TABLE = [
  { id: '1', name: 'Nexus Global ISP', sub: 'ID: 4882-QX', type: 'ISP', region: 'North America (East)', score: '98.8', uptime: '99.99%', status: 'COMPLIANT', statusColor: '#2563eb', statusBg: '#eff6ff', initial: 'N' },
  { id: '2', name: 'Quantum Link BSP', sub: 'ID: 9021-LP', type: 'BSP', region: 'Europe (Central)', score: '91.4', uptime: '99.92%', status: 'COMPLIANT', statusColor: '#2563eb', statusBg: '#eff6ff', initial: 'Q' },
  { id: '3', name: 'OpticStream Pro', sub: 'ID: 1125-ZZ', type: 'ISP', region: 'Asia Pacific (West)', score: '84.2', uptime: '98.45%', status: 'WARNING', statusColor: '#dc2626', statusBg: '#fef2f2', initial: 'O', isLowScore: true },
  { id: '4', name: 'CloudPath Connect', sub: 'ID: 7721-GC', type: 'BSP', region: 'North America (West)', score: '96.0', uptime: '99.98%', status: 'COMPLIANT', statusColor: '#2563eb', statusBg: '#eff6ff', initial: 'C' }
];

/* ─────────────── MAIN PAGE ─────────────── */
export default function PartnerReports() {
  const [currentPage, setCurrentPage] = useState(1);
  const maxBar = 100;

  return (
    <AdminShell activeTab="Reports & Analytics" searchPlaceholder="Search export...." headerTitle="Partner Reports">
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-section)', fontFamily: "'Inter', sans-serif" }}>

        {/* ── HEADER ── */}
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
          <div>
            <h1 style={{ fontSize: '24px', fontWeight: '800', color: '#0f172a', margin: 0, lineHeight: 1.3 }}>Partner Performance Analytics</h1>
            <p style={{ margin: '4px 0 0', color: '#64748b', fontSize: '14px', fontWeight: '500' }}>ISP and BSP regional management & quality compliance</p>
          </div>
          <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
            <button style={{ display: 'flex', alignItems: 'center', gap: '8px', background: '#fff', border: '1.5px solid #e2e8f0', borderRadius: '8px', padding: '10px 16px', fontSize: '13px', fontWeight: '600', color: '#334155', cursor: 'pointer', boxShadow: '0 1px 2px rgba(0,0,0,0.05)' }}>
              <Calendar size={16} color="#64748b" /> Oct 01 - Oct 31, 2023
            </button>
            <button style={{ display: 'flex', alignItems: 'center', gap: '8px', background: '#fff', border: '1.5px solid #e2e8f0', borderRadius: '8px', padding: '10px 16px', fontSize: '13px', fontWeight: '600', color: '#334155', cursor: 'pointer', boxShadow: '0 1px 2px rgba(0,0,0,0.05)' }}>
              <Filter size={16} color="#64748b" /> Filter
            </button>
          </div>
        </div>

        {/* ── TOP SECTION: Charts ── */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: '20px', alignItems: 'stretch' }}>
          
          {/* Aggregate Quality Score */}
          <div style={{ background: '#fff', borderRadius: '12px', border: '1px solid #e2e8f0', padding: 'var(--spacing-section)', boxShadow: '0 1px 3px rgba(0,0,0,0.02)', display: 'flex', flexDirection: 'column' }}>
            <h2 style={{ margin: '0 0 16px', fontSize: '11px', fontWeight: '700', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Aggregate Quality Score</h2>
            
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px', marginBottom: '24px' }}>
              <div style={{ fontSize: '42px', fontWeight: '800', color: '#1e1b4b', lineHeight: 1 }}>94.2</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '2px', paddingTop: '4px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '2px', color: '#4f46e5', fontWeight: '700', fontSize: '13px' }}>
                  <TrendingUp size={14} /> +2.4%
                </div>
                <div style={{ fontSize: '11px', color: '#64748b', fontWeight: '500' }}>vs last month</div>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'flex-end', gap: '8px', flex: 1, minHeight: '140px', marginTop: 'auto' }}>
              {QUALITY_SCORE_BARS.map((bar, i) => (
                <div key={i} style={{ flex: 1, background: bar.isDark ? '#1e1b4b' : '#c4b5fd', height: `${bar.val}%`, borderRadius: '4px 4px 0 0' }} />
              ))}
            </div>
          </div>

          {/* Regional Distribution */}
          <div style={{ background: '#fff', borderRadius: '12px', border: '1px solid #e2e8f0', padding: 'var(--spacing-section)', boxShadow: '0 1px 3px rgba(0,0,0,0.02)', display: 'flex', flexDirection: 'column' }}>
            <h2 style={{ margin: '0 0 16px', fontSize: '11px', fontWeight: '700', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Regional Distribution</h2>
            
            <div style={{ background: '#0f172a', borderRadius: '8px', padding: '16px', flex: 1, display: 'flex', flexDirection: 'column', position: 'relative', overflow: 'hidden' }}>
              {/* Simulated Map Background */}
              <div style={{ position: 'absolute', top: '10%', left: '10%', right: '10%', bottom: '30%', opacity: 0.5, backgroundImage: 'radial-gradient(circle at 30% 40%, #4f46e5 2px, transparent 2px), radial-gradient(circle at 70% 60%, #eab308 2px, transparent 2px), radial-gradient(circle at 40% 70%, #38bdf8 2px, transparent 2px)', backgroundSize: '20px 20px' }}>
                {/* Just abstract dots to look like a glowing map */}
                <div style={{ position: 'absolute', top: '40%', left: '30%', width: '4px', height: '4px', background: '#eab308', borderRadius: '50%', boxShadow: '0 0 8px 2px rgba(234,179,8,0.6)' }} />
                <div style={{ position: 'absolute', top: '60%', left: '70%', width: '3px', height: '3px', background: '#38bdf8', borderRadius: '50%', boxShadow: '0 0 8px 2px rgba(56,189,248,0.6)' }} />
                <div style={{ position: 'absolute', top: '30%', left: '60%', width: '5px', height: '5px', background: '#eab308', borderRadius: '50%', boxShadow: '0 0 10px 3px rgba(234,179,8,0.8)' }} />
              </div>
              
              <div style={{ marginTop: 'auto', background: '#fff', borderRadius: '6px', padding: '12px', zIndex: 10 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                  <span style={{ fontSize: '12px', fontWeight: '700', color: '#0f172a' }}>Active Regions</span>
                  <span style={{ fontSize: '12px', fontWeight: '700', color: '#0f172a' }}>14 / 20</span>
                </div>
                <div style={{ height: '4px', background: '#f1f5f9', borderRadius: '2px' }}>
                  <div style={{ width: '70%', height: '100%', background: '#4f46e5', borderRadius: '2px' }} />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── KPI CARDS ── */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px' }}>
          {KPI_CARDS.map(card => (
            <div 
              key={card.id} 
              className="report-kpi-card"
              style={{ background: '#fff', borderRadius: '12px', padding: '20px', display: 'flex', flexDirection: 'column', gap: '12px' }}
            >
              <span style={{ fontSize: '11px', fontWeight: '600', color: '#64748b' }}>{card.title}</span>
              <span style={{ fontSize: '24px', fontWeight: '800', color: '#0f172a', lineHeight: 1 }}>{card.value}</span>
              
              {card.type === 'badge' && (
                <span style={{ alignSelf: 'flex-start', background: card.badgeBg, color: card.badgeColor, fontSize: '10px', fontWeight: '700', padding: '4px 8px', borderRadius: '4px' }}>
                  {card.badgeText}
                </span>
              )}
              {card.type === 'progress' && (
                <div style={{ width: '100%', height: '3px', background: '#e2e8f0', marginTop: '6px' }}>
                  <div style={{ width: `${card.progressVal}%`, height: '100%', background: '#0f172a' }} />
                </div>
              )}
              {card.type === 'target' && (
                <span style={{ fontSize: '11px', color: '#94a3b8', fontWeight: '500', marginTop: '4px' }}>
                  {card.targetText}
                </span>
              )}
              {card.type === 'dots' && (
                <div style={{ display: 'flex', gap: '4px', marginTop: '8px' }}>
                  {Array.from({ length: card.totalDots }).map((_, i) => (
                    <div key={i} style={{ width: '6px', height: '6px', borderRadius: '50%', background: i < card.activeDots ? '#0f172a' : '#e2e8f0' }} />
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* ── TABLE ── */}
        <div style={{ background: '#fff', borderRadius: '12px', border: '1px solid #e2e8f0', padding: 'var(--spacing-section)', boxShadow: '0 1px 3px rgba(0,0,0,0.02)' }}>
          
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
            <h2 style={{ margin: 0, fontSize: '16px', fontWeight: '800', color: '#0f172a' }}>Partner Registry</h2>
            <div style={{ display: 'flex', gap: '12px' }}>
              <button style={{ display: 'flex', alignItems: 'center', gap: '6px', background: '#fff', border: '1px solid #e2e8f0', borderRadius: '6px', padding: '8px 12px', fontSize: '12px', fontWeight: '600', color: '#334155', cursor: 'pointer' }}>
                All Types <ChevronDown size={14} color="#64748b" />
              </button>
              <button style={{ width: '34px', height: '34px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#fff', border: '1px solid #e2e8f0', borderRadius: '6px', color: '#64748b', cursor: 'pointer' }}>
                <Info size={16} />
              </button>
            </div>
          </div>

          <div style={{ overflowY: 'auto', maxHeight: '400px' }}>
            <div className="table-responsive-wrapper">
<table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
                  {['Partner Name', 'Type', 'Region', 'Health Score', 'Uptime', 'SLA Status'].map(col => (
                    <th key={col} style={{ padding: '12px 16px', textAlign: 'left', fontSize: '11px', fontWeight: '700', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                      {col}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {PARTNERS_TABLE.map((row, i) => (
                  <tr key={row.id} style={{ borderBottom: i < PARTNERS_TABLE.length - 1 ? '1px solid #f1f5f9' : 'none' }}>
                    <td style={{ padding: '16px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <div style={{ width: '32px', height: '32px', borderRadius: '6px', background: '#f1f5f9', color: '#0f172a', fontWeight: '700', fontSize: '13px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          {row.initial}
                        </div>
                        <div>
                          <div style={{ fontWeight: '700', color: '#0f172a', fontSize: '13px' }}>{row.name}</div>
                          <div style={{ fontSize: '11px', color: '#94a3b8', marginTop: '2px' }}>{row.sub}</div>
                        </div>
                      </div>
                    </td>
                    <td style={{ padding: '16px' }}>
                      <span style={{ border: '1px solid #e2e8f0', borderRadius: '4px', padding: '2px 6px', fontSize: '10px', fontWeight: '700', color: '#475569' }}>
                        {row.type}
                      </span>
                    </td>
                    <td style={{ padding: '16px', fontSize: '13px', color: '#475569', fontWeight: '500' }}>
                      {row.region}
                    </td>
                    <td style={{ padding: '16px', fontSize: '13px', fontWeight: '700', color: row.isLowScore ? '#dc2626' : '#0f172a' }}>
                      {row.score}
                    </td>
                    <td style={{ padding: '16px', fontSize: '13px', color: '#475569', fontWeight: '500' }}>
                      {row.uptime}
                    </td>
                    <td style={{ padding: '16px' }}>
                      <span style={{ display: 'inline-flex', background: row.statusBg, color: row.statusColor, fontSize: '10px', fontWeight: '800', padding: '4px 10px', borderRadius: '12px', letterSpacing: '0.5px' }}>
                        {row.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
</div>
            
          </div>

          {/* Pagination */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '20px', paddingTop: '16px', borderTop: '1px solid #f1f5f9' }}>
            <span style={{ fontSize: '12px', color: '#94a3b8', fontWeight: '500' }}>
              Showing 4 of 1,284 entries
            </span>
            <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
              <button style={{ padding: '6px 12px', background: '#fff', border: '1px solid #e2e8f0', borderRadius: '6px', color: '#64748b', fontSize: '12px', fontWeight: '600', cursor: 'pointer' }}>Previous</button>
              {[1, 2, 3].map(p => (
                <button
                  key={p}
                  onClick={() => setCurrentPage(p)}
                  style={{ width: '28px', height: '28px', borderRadius: '6px', border: 'none', background: p === currentPage ? '#0f172a' : 'transparent', color: p === currentPage ? '#fff' : '#64748b', fontSize: '12px', fontWeight: '600', cursor: 'pointer' }}
                >
                  {p}
                </button>
              ))}
              <button style={{ padding: '6px 12px', background: '#fff', border: '1px solid #e2e8f0', borderRadius: '6px', color: '#64748b', fontSize: '12px', fontWeight: '600', cursor: 'pointer' }}>Next</button>
            </div>
          </div>
          
        </div>
      </div>
    </AdminShell>
  );
}
