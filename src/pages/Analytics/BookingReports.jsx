import React, { useState } from 'react';
import AdminShell from '../../components/layouts/AdminShell';
import { downloadDummyPDF } from '../../utils/downloadHelper';
import {
  Download,
  ChevronDown,
  Search,
  SlidersHorizontal,
  TrendingUp,
  TrendingDown,
  ArrowUpRight,
  Zap,
  BarChart2,
  BookOpen,
  CheckCircle,
  DollarSign
} from 'lucide-react';

const KPI_CARDS = [
  { id: 'total_bookings', label: 'Total Bookings', value: '12,482', growth: '+8.2%', isPositive: true, sub: 'vs last 30 days', icon: BookOpen, iconColor: '#4f46e5', iconBg: '#eef2ff' },
  { id: 'completion_rate', label: 'Completion Rate', value: '98.2%', growth: '+0.4%', isPositive: true, sub: 'Target: 98%', icon: CheckCircle, iconColor: '#10b981', iconBg: '#ecfdf5' },
  { id: 'avg_order_value', label: 'Avg. Order Value', value: '$142.50', growth: '-2.1%', isPositive: false, sub: 'Manual correction required', icon: DollarSign, iconColor: '#f59e0b', iconBg: '#fffbeb' },
  { id: 'revenue_generated', label: 'Revenue Generated', value: '$1.78M', growth: '+12.5%', isPositive: true, sub: 'vs last 30 days', icon: TrendingUp, iconColor: '#8b5cf6', iconBg: '#f5f3ff' }
];

const MONTHLY_REVENUE = [
  { month: 'Jan', standard: 68, premium: 42 }, { month: 'Feb', standard: 74, premium: 55 },
  { month: 'Mar', standard: 62, premium: 38 }, { month: 'Apr', standard: 85, premium: 61 },
  { month: 'May', standard: 72, premium: 48 }, { month: 'Jun', standard: 90, premium: 72 },
  { month: 'Jul', standard: 78, premium: 59 }, { month: 'Aug', standard: 95, premium: 80 },
  { month: 'Sep', standard: 83, premium: 65 }, { month: 'Oct', standard: 100, premium: 88 },
  { month: 'Nov', standard: 88, premium: 70 }, { month: 'Dec', standard: 76, premium: 54 }
];

const BOOKINGS_TABLE = [
  { id: 'HZ-06421', customer: 'Eleanor Lawrence', avatar: 'EL', avatarColor: '#4f46e5', service: 'Deep Clean', status: 'Completed', date: 'Oct 24, 2023', revenue: '$169.00' },
  { id: 'HZ-06422', customer: 'Marcus Kane', avatar: 'MK', avatarColor: '#0ea5e9', service: 'Maintenance', status: 'In Progress', date: 'Oct 24, 2023', revenue: '$78.00' },
  { id: 'HZ-06423', customer: 'Sarah Nolan', avatar: 'SN', avatarColor: '#10b981', service: 'Decoration', status: 'Scheduled', date: 'Oct 25, 2023', revenue: '$210.00' },
  { id: 'HZ-06424', customer: 'David Byrne', avatar: 'DB', avatarColor: '#ef4444', service: 'Deep Clean', status: 'Cancelled', date: 'Oct 25, 2023', revenue: '$0.00' },
  { id: 'HZ-06425', customer: 'Jessica Lee', avatar: 'JL', avatarColor: '#8b5cf6', service: 'Maintenance', status: 'Completed', date: 'Oct 26, 2023', revenue: '$925.00' }
];

const STATUS_CONFIG = {
  'Completed':   { bg: '#ecfdf5', color: '#059669', dot: '#10b981' },
  'In Progress': { bg: '#eff6ff', color: '#2563eb', dot: '#3b82f6' },
  'Scheduled':   { bg: '#fefce8', color: '#ca8a04', dot: '#eab308' },
  'Cancelled':   { bg: '#fef2f2', color: '#dc2626', dot: '#ef4444' }
};

const SERVICE_CATEGORIES = [
  { label: 'Standard Maintenance', pct: 43, color: '#4f46e5' },
  { label: 'Deep Cleaning', pct: 35, color: '#0ea5e9' },
  { label: 'Subscription Plans', pct: 18, color: '#10b981' },
  { label: 'Installation Services', pct: 9, color: '#f59e0b' },
  { label: 'Emergency Repairs', pct: 6, color: '#ef4444' }
];

function StatusBadge({ status }) {
  const cfg = STATUS_CONFIG[status] || { bg: '#f3f4f6', color: '#6b7280', dot: '#9ca3af' };
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '5px', background: cfg.bg, color: cfg.color, fontSize: '11px', fontWeight: '600', padding: '3px 10px', borderRadius: '20px', whiteSpace: 'nowrap' }}>
      <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: cfg.dot, flexShrink: 0 }} />
      {status}
    </span>
  );
}

function AvatarCircle({ initials, color }) {
  return (
    <div style={{ width: '30px', height: '30px', borderRadius: '50%', background: color + '22', color, fontWeight: '700', fontSize: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, border: `1.5px solid ${color}44` }}>
      {initials}
    </div>
  );
}

export default function BookingReports() {
  const [currentPage, setCurrentPage] = useState(1);
  const maxBarVal = Math.max(...MONTHLY_REVENUE.map(d => d.standard + d.premium));

  return (
    <AdminShell activeTab="Reports & Analytics" searchPlaceholder="Search reports..." headerTitle="Booking Reports">
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif" }}>

        {/* PAGE HEADER */}
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
          <div>
            <h1 style={{ fontSize: '22px', fontWeight: '700', color: '#0f172a', margin: 0, lineHeight: 1.3 }}>Booking Reports</h1>
            <p style={{ margin: '4px 0 0', color: '#64748b', fontSize: '13px' }}>Real-time performance metrics and historical booking activity.</p>
          </div>
          <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
            <button style={{ display: 'flex', alignItems: 'center', gap: '6px', background: '#fff', border: '1.5px solid #e2e8f0', borderRadius: '10px', padding: '8px 14px', fontSize: '13px', fontWeight: '600', color: '#334155', cursor: 'pointer', boxShadow: '0 1px 3px rgba(0,0,0,0.06)' }}>
              Last 30 Days <ChevronDown size={14} color="#64748b" />
            </button>
            <button 
              onClick={() => downloadDummyPDF('Booking Reports', 'Total Bookings: 14,208\nRevenue: $1.78M\nSuccess Rate: 99.8%')}
              style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#4f46e5', border: 'none', borderRadius: '10px', padding: '8px 14px', cursor: 'pointer', boxShadow: '0 2px 8px rgba(79,70,229,0.25)' }}
            >
              <Download size={16} color="#fff" />
            </button>
          </div>
        </div>

        {/* KPI CARDS */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px' }}>
          {KPI_CARDS.map(card => {
            const Icon = card.icon;
            return (
              <div 
                key={card.id} 
                className="report-kpi-card"
                style={{ background: '#fff', borderRadius: '14px', padding: '18px 20px', display: 'flex', flexDirection: 'column', gap: '10px', cursor: 'pointer' }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '11px', fontWeight: '600', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.5px' }}>{card.label}</span>
                  <div style={{ width: '34px', height: '34px', borderRadius: '9px', background: card.iconBg, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Icon size={16} color={card.iconColor} />
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'flex-end', gap: '8px' }}>
                  <span style={{ fontSize: '26px', fontWeight: '800', color: '#0f172a', lineHeight: 1 }}>{card.value}</span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '2px', fontSize: '12px', fontWeight: '700', lineHeight: 1, marginBottom: '2px', color: card.isPositive ? '#10b981' : '#ef4444' }}>
                    {card.isPositive ? <TrendingUp size={12} /> : <TrendingDown size={12} />}{card.growth}
                  </span>
                </div>
                <span style={{ fontSize: '11.5px', color: '#94a3b8' }}>{card.sub}</span>
              </div>
            );
          })}
        </div>

        {/* MAIN GRID */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: '16px', alignItems: 'start' }}>

          {/* LEFT */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>

            {/* Bar Chart */}
            <div style={{ background: '#fff', borderRadius: '14px', border: '1px solid #e8edf3', padding: '22px 24px', boxShadow: '0 1px 6px rgba(15,23,42,0.05)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <div>
                  <h2 style={{ margin: 0, fontSize: '15px', fontWeight: '700', color: '#0f172a' }}>Revenue Distribution</h2>
                  <p style={{ margin: '3px 0 0', fontSize: '12px', color: '#94a3b8' }}>Monthly booking revenue breakdown</p>
                </div>
                <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <span style={{ width: '10px', height: '10px', borderRadius: '2px', background: '#4f46e5', display: 'inline-block' }} />
                    <span style={{ fontSize: '12px', color: '#64748b', fontWeight: '500' }}>Standard</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <span style={{ width: '10px', height: '10px', borderRadius: '2px', background: '#c4b5fd', display: 'inline-block' }} />
                    <span style={{ fontSize: '12px', color: '#64748b', fontWeight: '500' }}>Premium</span>
                  </div>
                </div>
              </div>
              <div style={{ display: 'flex', gap: '6px', alignItems: 'flex-end', height: '190px' }}>
                {MONTHLY_REVENUE.map(d => {
                  const totalPct = ((d.standard + d.premium) / maxBarVal) * 100;
                  const premiumPct = (d.premium / (d.standard + d.premium)) * 100;
                  return (
                    <div key={d.month} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px', height: '100%', justifyContent: 'flex-end' }}>
                      <div style={{ width: '100%', height: `${totalPct}%`, minHeight: '8px', display: 'flex', flexDirection: 'column', borderRadius: '5px 5px 0 0', overflow: 'hidden' }}>
                        <div style={{ background: '#c4b5fd', height: `${premiumPct}%`, minHeight: '4px' }} />
                        <div style={{ background: '#4f46e5', flex: 1 }} />
                      </div>
                      <span style={{ fontSize: '10px', color: '#94a3b8', fontWeight: '500' }}>{d.month}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Table */}
            <div style={{ background: '#fff', borderRadius: '14px', border: '1px solid #e8edf3', padding: '22px 24px', boxShadow: '0 1px 6px rgba(15,23,42,0.05)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                <div>
                  <h2 style={{ margin: 0, fontSize: '15px', fontWeight: '700', color: '#0f172a' }}>Recent Bookings</h2>
                  <p style={{ margin: '3px 0 0', fontSize: '12px', color: '#94a3b8' }}>Showing 1–5 of 1,248 entries</p>
                </div>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <button style={{ width: '34px', height: '34px', borderRadius: '8px', border: '1.5px solid #e2e8f0', background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}><Search size={15} color="#64748b" /></button>
                  <button style={{ width: '34px', height: '34px', borderRadius: '8px', border: '1.5px solid #e2e8f0', background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}><SlidersHorizontal size={15} color="#64748b" /></button>
                </div>
              </div>
              <div style={{ overflowY: 'auto', maxHeight: '400px' }}>
                <div className="table-responsive-wrapper">
<table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
                  <thead>
                    <tr style={{ borderBottom: '1.5px solid #f1f5f9' }}>
                      {['Booking ID', 'Customer', 'Service Type', 'Status', 'Date', 'Revenue'].map(col => (
                        <th key={col} style={{ padding: '8px 12px', textAlign: 'left', fontSize: '11px', fontWeight: '700', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.5px', whiteSpace: 'nowrap' }}>{col}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {BOOKINGS_TABLE.map((row, i) => (
                      <tr key={row.id} style={{ borderBottom: i < BOOKINGS_TABLE.length - 1 ? '1px solid #f8fafc' : 'none', transition: 'background 0.15s' }}
                        onMouseEnter={e => e.currentTarget.style.background = '#f8fafc'}
                        onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
                        <td style={{ padding: '12px 12px', fontWeight: '600', color: '#4f46e5', whiteSpace: 'nowrap' }}>{row.id}</td>
                        <td style={{ padding: '12px 12px' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <AvatarCircle initials={row.avatar} color={row.avatarColor} />
                            <span style={{ fontWeight: '500', color: '#0f172a', whiteSpace: 'nowrap' }}>{row.customer}</span>
                          </div>
                        </td>
                        <td style={{ padding: '12px 12px', color: '#64748b', whiteSpace: 'nowrap' }}>{row.service}</td>
                        <td style={{ padding: '12px 12px' }}><StatusBadge status={row.status} /></td>
                        <td style={{ padding: '12px 12px', color: '#64748b', whiteSpace: 'nowrap' }}>{row.date}</td>
                        <td style={{ padding: '12px 12px', fontWeight: '700', color: '#0f172a', whiteSpace: 'nowrap' }}>{row.revenue}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
</div>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '16px', paddingTop: '14px', borderTop: '1px solid #f1f5f9' }}>
                <span style={{ fontSize: '12px', color: '#94a3b8' }}>Previous</span>
                <div style={{ display: 'flex', gap: '4px', alignItems: 'center' }}>
                  {[1, 2, 3].map(p => (
                    <button key={p} onClick={() => setCurrentPage(p)} style={{ width: '30px', height: '30px', borderRadius: '7px', border: p === currentPage ? '1.5px solid #4f46e5' : '1.5px solid #e2e8f0', background: p === currentPage ? '#4f46e5' : '#fff', color: p === currentPage ? '#fff' : '#64748b', fontSize: '12px', fontWeight: '600', cursor: 'pointer' }}>{p}</button>
                  ))}
                  <span style={{ fontSize: '12px', color: '#94a3b8', padding: '0 4px' }}>...</span>
                  <button style={{ padding: '0 12px', height: '30px', borderRadius: '7px', border: '1.5px solid #e2e8f0', background: '#fff', color: '#64748b', fontSize: '12px', fontWeight: '600', cursor: 'pointer' }}>Next</button>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {/* Categories */}
            <div style={{ background: '#fff', borderRadius: '14px', border: '1px solid #e8edf3', padding: '22px 20px', boxShadow: '0 1px 6px rgba(15,23,42,0.05)' }}>
              <h2 style={{ margin: '0 0 4px', fontSize: '15px', fontWeight: '700', color: '#0f172a' }}>Service Category Breakdown</h2>
              <p style={{ margin: '0 0 18px', fontSize: '12px', color: '#94a3b8' }}>Distribution by service type</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                {SERVICE_CATEGORIES.map(cat => (
                  <div key={cat.label}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                      <span style={{ fontSize: '12.5px', fontWeight: '600', color: '#334155' }}>{cat.label}</span>
                      <span style={{ fontSize: '12.5px', fontWeight: '700', color: '#0f172a' }}>{cat.pct}%</span>
                    </div>
                    <div style={{ height: '7px', borderRadius: '10px', background: '#f1f5f9', overflow: 'hidden' }}>
                      <div style={{ width: `${cat.pct}%`, height: '100%', background: cat.color, borderRadius: '10px' }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Efficiency Card */}
            <div style={{ background: 'linear-gradient(135deg, #4338ca 0%, #6d28d9 60%, #7c3aed 100%)', borderRadius: '14px', padding: '22px 20px', boxShadow: '0 6px 24px rgba(79,70,229,0.32)', position: 'relative', overflow: 'hidden' }}>
              <div style={{ position: 'absolute', top: '-30px', right: '-30px', width: '120px', height: '120px', borderRadius: '50%', background: 'rgba(255,255,255,0.06)', pointerEvents: 'none' }} />
              <div style={{ position: 'absolute', bottom: '-20px', left: '-20px', width: '80px', height: '80px', borderRadius: '50%', background: 'rgba(255,255,255,0.04)', pointerEvents: 'none' }} />
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: 'rgba(255,255,255,0.18)', borderRadius: '8px', padding: '4px 10px', marginBottom: '14px' }}>
                <Zap size={13} color="#fbbf24" fill="#fbbf24" />
                <span style={{ fontSize: '10px', fontWeight: '700', color: '#fff', letterSpacing: '0.5px', textTransform: 'uppercase' }}>Optimization Status</span>
              </div>
              <h3 style={{ margin: '0 0 10px', fontSize: '17px', fontWeight: '800', color: '#fff' }}>Efficiency Insight</h3>
              <p style={{ margin: '0 0 16px', fontSize: '12.5px', color: 'rgba(255,255,255,0.82)', lineHeight: '1.65' }}>
                Operational levels are performing <strong style={{ color: '#86efac' }}>12% faster</strong> than last month. Consider increasing booking capacity for <span style={{ color: '#fde68a', fontWeight: '600' }}>High Performance</span> zones.
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', background: 'rgba(255,255,255,0.12)', borderRadius: '9px', padding: '10px 12px', marginBottom: '18px' }}>
                <div style={{ width: '30px', height: '30px', borderRadius: '7px', background: 'rgba(251,191,36,0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <BarChart2 size={15} color="#fbbf24" />
                </div>
                <div>
                  <div style={{ fontSize: '9.5px', color: 'rgba(255,255,255,0.55)', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Optimization Status</div>
                  <div style={{ fontSize: '13px', fontWeight: '700', color: '#fff' }}>High Performance</div>
                </div>
              </div>
              <button style={{ width: '100%', padding: '11px', borderRadius: '9px', background: '#fff', border: 'none', cursor: 'pointer', fontSize: '13px', fontWeight: '700', color: '#4f46e5', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', boxShadow: '0 2px 10px rgba(0,0,0,0.15)' }}
                onMouseEnter={e => e.currentTarget.style.opacity = '0.9'}
                onMouseLeave={e => e.currentTarget.style.opacity = '1'}>
                View Suggestions <ArrowUpRight size={14} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </AdminShell>
  );
}
