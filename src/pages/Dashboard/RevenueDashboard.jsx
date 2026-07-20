import React, { useState } from 'react';
import {
  DollarSign,
  CreditCard,
  TrendingUp,
  TrendingDown,
  RefreshCw,
  Download,
  ChevronDown,
  ChevronRight,
  Eye,
  Briefcase,
  Users,
  BarChart2
} from 'lucide-react';
import AdminShell from '../../components/layouts/AdminShell';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';

/* ───────────────────── Mock Data ───────────────────── */

const revenueChartData = [
  { date: '01 May', revenue: 62000 },
  { date: '05 May', revenue: 75000 },
  { date: '08 May', revenue: 50000 },
  { date: '11 May', revenue: 81000 },
  { date: '14 May', revenue: 64000 },
  { date: '16 May', revenue: 90000 },
  { date: '18 May', revenue: 74000 },
  { date: '20 May', revenue: 82000 },
  { date: '22 May', revenue: 68000 },
  { date: '24 May', revenue: 96000 },
  { date: '26 May', revenue: 78000 },
  { date: '28 May', revenue: 85000 },
  { date: '31 May', revenue: 72000 },
];

const sellerTypeData = [
  { name: 'Enterprise', value: 210, color: '#4f46e5' },
  { name: 'Mid-Market', value: 94, color: '#f59e0b' },
  { name: 'Small Biz', value: 45, color: '#22c55e' },
  { name: 'Freelance', value: 16, color: '#64748b' },
];

const channelData = [
  { name: 'Direct', value: 44, color: '#4f46e5' },
  { name: 'Partner', value: 28, color: '#8b5cf6' },
  { name: 'Online', value: 18, color: '#10b981' },
  { name: 'Referral', value: 10, color: '#f59e0b' },
];

const recentTransactions = [
  { id: 'TXN-8829', partner: 'Global Logistics Ltd.', initials: 'GL', category: 'Logistics', gross: '₹1,24,000', commission: '₹18,600', payout: '₹1,05,400', status: 'Settled', date: '31 May 2026 14:20' },
  { id: 'TXN-8830', partner: 'HomeCare Solutions', initials: 'HC', category: 'Services', gross: '₹45,000', commission: '₹6,750', payout: '₹38,250', status: 'Pending', date: '31 May 2026 15:45' },
  { id: 'TXN-8831', partner: 'Swift Delivery Co.', initials: 'SD', category: 'Logistics', gross: '₹2,80,000', commission: '₹42,000', payout: '₹2,38,000', status: 'Settled', date: '31 May 2026 10:12' },
  { id: 'TXN-8832', partner: 'Urban Cleaning Inc.', initials: 'UC', category: 'Cleaning', gross: '₹8,500', commission: '₹1,275', payout: '₹7,225', status: 'Refunded', date: '31 May 2026 09:30' },
  { id: 'TXN-8833', partner: 'Pro Electricians', initials: 'PE', category: 'Electrical', gross: '₹32,000', commission: '₹4,800', payout: '₹27,200', status: 'Settled', date: '30 May 2026 16:55' },
];

const topPartners = [
  { name: 'Global Logistics Ltd.', initials: 'GL', category: 'Logistics', revenue: '₹12,40,000', commission: '₹1,86,000', orders: 84, growth: '+18.4%', growthUp: true },
  { name: 'HomeCare Solutions', initials: 'HC', category: 'Services', revenue: '₹8,20,000', commission: '₹1,23,000', orders: 62, growth: '+9.7%', growthUp: true },
  { name: 'Swift Delivery Co.', initials: 'SD', category: 'Logistics', revenue: '₹6,90,000', commission: '₹1,03,500', orders: 55, growth: '-2.1%', growthUp: false },
  { name: 'Urban Cleaning Inc.', initials: 'UC', category: 'Cleaning', revenue: '₹4,50,000', commission: '₹67,500', orders: 38, growth: '+6.3%', growthUp: true },
  { name: 'Pro Electricians', initials: 'PE', category: 'Electrical', revenue: '₹3,20,000', commission: '₹48,000', orders: 29, growth: '+12.8%', growthUp: true },
];

const categoryBreakdown = [
  { category: 'Logistics', totalRevenue: '₹19,30,000', commission: '₹2,89,500', partners: 28, orders: 139, share: '42%' },
  { category: 'Services', totalRevenue: '₹8,20,000', commission: '₹1,23,000', partners: 19, orders: 62, share: '18%' },
  { category: 'Cleaning', totalRevenue: '₹6,10,000', commission: '₹91,500', partners: 15, orders: 51, share: '13%' },
  { category: 'Electrical', totalRevenue: '₹5,40,000', commission: '₹81,000', partners: 12, orders: 44, share: '12%' },
  { category: 'Plumbing', totalRevenue: '₹4,20,000', commission: '₹63,000', partners: 9, orders: 35, share: '9%' },
  { category: 'Others', totalRevenue: '₹2,80,000', commission: '₹42,000', partners: 8, orders: 22, share: '6%' },
];

/* ───────────────────── Sub-components ───────────────────── */

function StatCard({ icon: Icon, iconBg, iconColor, value, label, sublabel, trend, trendUp, trendLabel }) {
  return (
    <div className="rev-dash-stat-card">
      <div className="rev-dash-stat-icon" style={{ background: iconBg }}>
        <Icon size={22} color={iconColor} />
      </div>
      <div className="rev-dash-stat-body">
        <div className="rev-dash-stat-value">{value}</div>
        <div className="rev-dash-stat-label">{label}</div>
        {sublabel && <div style={{ fontSize: '11px', color: '#94a3b8', fontWeight: 400 }}>{sublabel}</div>}
        {trend && (
          <div className={`rev-dash-stat-trend ${trendUp ? 'up' : 'down'}`}>
            {trendUp ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
            <span>{trend}</span>
            <span className="trend-vs">{trendLabel}</span>
          </div>
        )}
      </div>
    </div>
  );
}

function TxnStatusBadge({ status }) {
  const map = {
    Settled:  { bg: '#dcfce7', color: '#166534' },
    Pending:  { bg: '#fef3c7', color: '#92400e' },
    Refunded: { bg: '#fee2e2', color: '#991b1b' },
  };
  const s = map[status] || { bg: '#f1f5f9', color: '#475569' };
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', padding: '3px 10px', borderRadius: '20px', fontSize: '11.5px', fontWeight: 600, background: s.bg, color: s.color }}>
      {status}
    </span>
  );
}

function Avatar({ initials }) {
  return (
    <div style={{ width: 30, height: 30, borderRadius: '50%', background: 'linear-gradient(135deg, #4f46e5, #818cf8)', color: '#fff', fontSize: 11, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
      {initials}
    </div>
  );
}

function CustomTooltip({ active, payload, label }) {
  if (active && payload && payload.length) {
    return (
      <div style={{ background: '#1e293b', border: '1px solid #334155', borderRadius: 8, padding: '8px 14px', color: '#f1f5f9', fontSize: 13 }}>
        <p style={{ margin: 0, color: '#94a3b8', marginBottom: 4 }}>{label}</p>
        <p style={{ margin: 0, fontWeight: 600 }}>₹{payload[0].value.toLocaleString()}</p>
      </div>
    );
  }
  return null;
}

function DonutLegend({ data }) {
  const total = data.reduce((s, d) => s + d.value, 0);
  return (
    <div className="rev-donut-legend">
      {data.map(d => (
        <div key={d.name} className="rev-donut-legend-item">
          <span className="rev-donut-legend-dot" style={{ background: d.color }} />
          <span className="rev-donut-legend-name">{d.name}</span>
          <span className="rev-donut-legend-val">{d.value}</span>
          <span style={{ color: '#94a3b8', fontSize: '11.5px' }}>({((d.value / total) * 100).toFixed(0)}%)</span>
        </div>
      ))}
    </div>
  );
}

/* ───────────────────── Main Component ───────────────────── */

export default function RevenueDashboard({ activeTab = 'Revenue Management' }) {
  const [dateRange, setDateRange] = useState('01 May 2026 - 31 May 2026');
  const [partnerType, setPartnerType] = useState('All Partners');
  const [category, setCategory] = useState('All Categories');
  const [statusFilter, setStatusFilter] = useState('All Status');
  const [chartFreq, setChartFreq] = useState('Daily');

  const totalSellers = sellerTypeData.reduce((s, d) => s + d.value, 0);

  return (
    <AdminShell
      activeTab={activeTab}
      pageTitle="Revenue Dashboard"
      pageSubtitle="Revenue Transactions & Partner Earnings Analytics"
    >
      <div className="rev-dash-root">

        {/* ── Header Filters ── */}
        <div className="rev-dash-filters">
          <div className="rev-filter-group">
            <label>Date Range</label>
            <div className="rev-filter-select">
              <span>{dateRange}</span>
              <ChevronDown size={14} />
            </div>
          </div>
          <div className="rev-filter-group">
            <label>Partner Type</label>
            <div className="rev-filter-select">
              <span>{partnerType}</span>
              <ChevronDown size={14} />
            </div>
          </div>
          <div className="rev-filter-group">
            <label>Category</label>
            <div className="rev-filter-select">
              <span>{category}</span>
              <ChevronDown size={14} />
            </div>
          </div>
          <div className="rev-filter-group">
            <label>Status</label>
            <div className="rev-filter-select">
              <span>{statusFilter}</span>
              <ChevronDown size={14} />
            </div>
          </div>
          <div className="rev-filter-actions">
            <button className="rev-filter-btn-refresh">
              <RefreshCw size={15} /> Refresh
            </button>
            <button className="rev-filter-btn-export">
              <Download size={15} /> Export Report
            </button>
          </div>
        </div>

        {/* ── Stat Cards Row ── */}
        <div className="rev-dash-stats-grid">
          <StatCard
            icon={DollarSign}
            iconBg="#eff6ff" iconColor="#2563eb"
            value="₹45,82,000" label="Total Revenue"
            sublabel="This Month"
            trend="+14.2%" trendUp={true} trendLabel="vs Apr 2026"
          />
          <StatCard
            icon={CreditCard}
            iconBg="#f0fdf4" iconColor="#16a34a"
            value="₹6,87,300" label="Total Commission"
            sublabel="This Month"
            trend="+11.8%" trendUp={true} trendLabel="vs Apr 2026"
          />
          <StatCard
            icon={Briefcase}
            iconBg="#faf5ff" iconColor="#9333ea"
            value="365" label="Transactions"
            sublabel="This Month"
            trend="+8.4%" trendUp={true} trendLabel="vs Apr 2026"
          />
          <StatCard
            icon={Users}
            iconBg="#fff7ed" iconColor="#ea580c"
            value="81" label="Active Partners"
            sublabel="Currently Active"
            trend="+5.1%" trendUp={true} trendLabel="vs Apr 2026"
          />
          <StatCard
            icon={TrendingUp}
            iconBg="#f0f9ff" iconColor="#0284c7"
            value="₹1,25,534" label="Avg. Transaction"
            sublabel="Per Transaction"
            trend="+6.3%" trendUp={true} trendLabel="vs Apr 2026"
          />
          <StatCard
            icon={BarChart2}
            iconBg="#fff1f2" iconColor="#e11d48"
            value="₹3,42,180" label="Pending Payouts"
            sublabel="Awaiting Clearance"
            trend="-9.7%" trendUp={false} trendLabel="vs Apr 2026"
          />
        </div>

        {/* ── Charts Row ── */}
        <div className="rev-dash-charts-row">

          {/* Revenue Line Chart */}
          <div className="rev-dash-card rev-dash-line-chart">
            <div className="rev-dash-card-header">
              <div>
                <h3>Revenue Growth Trend</h3>
              </div>
              <div className="rev-chart-freq">
                {['Daily', 'Weekly', 'Monthly'].map(f => (
                  <button
                    key={f}
                    className={`rev-chart-freq-btn ${chartFreq === f ? 'active' : ''}`}
                    onClick={() => setChartFreq(f)}
                  >
                    {f}
                  </button>
                ))}
              </div>
            </div>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={revenueChartData} margin={{ top: 8, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
                <XAxis dataKey="date" tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                <Tooltip content={<CustomTooltip />} />
                <Line
                  type="monotone"
                  dataKey="revenue"
                  stroke="#4f46e5"
                  strokeWidth={2.5}
                  dot={false}
                  activeDot={{ r: 5, fill: '#4f46e5' }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Seller Type Donut */}
          <div className="rev-dash-card rev-dash-donut">
            <div className="rev-dash-card-header">
              <h3>Partner Type Split</h3>
            </div>
            <div className="rev-donut-content">
              <div className="rev-donut-wrap">
                <PieChart width={170} height={170}>
                  <Pie
                    data={sellerTypeData}
                    cx={80}
                    cy={80}
                    innerRadius={52}
                    outerRadius={78}
                    dataKey="value"
                    startAngle={90}
                    endAngle={-270}
                    stroke="none"
                  >
                    {sellerTypeData.map((entry, i) => (
                      <Cell key={i} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
                <div className="rev-donut-center-label">
                  <span className="rev-donut-center-val">{totalSellers}</span>
                  <span className="rev-donut-center-txt">Total Partners</span>
                </div>
              </div>
              <DonutLegend data={sellerTypeData} />
            </div>
          </div>

          {/* Channel Donut */}
          <div className="rev-dash-card rev-dash-donut">
            <div className="rev-dash-card-header">
              <h3>Revenue by Channel</h3>
            </div>
            <div className="rev-donut-content">
              <div className="rev-donut-wrap">
                <PieChart width={170} height={170}>
                  <Pie
                    data={channelData}
                    cx={80}
                    cy={80}
                    innerRadius={52}
                    outerRadius={78}
                    dataKey="value"
                    startAngle={90}
                    endAngle={-270}
                    stroke="none"
                  >
                    {channelData.map((entry, i) => (
                      <Cell key={i} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
                <div className="rev-donut-center-label">
                  <span className="rev-donut-center-val">100%</span>
                  <span className="rev-donut-center-txt">All Channels</span>
                </div>
              </div>
              <DonutLegend data={channelData} />
            </div>
          </div>
        </div>

        {/* ── Mid Row: Transactions + Top Partners ── */}
        <div className="rev-dash-mid-row">

          {/* Recent Transactions */}
          <div className="rev-dash-card rev-dash-transactions">
            <div className="rev-dash-card-header">
              <h3>Recent Transactions</h3>
            </div>
            <table className="rev-dash-table">
              <thead>
                <tr>
                  <th>Txn ID</th>
                  <th>Partner</th>
                  <th>Category</th>
                  <th>Gross</th>
                  <th>Commission</th>
                  <th>Status</th>
                  <th>Date & Time</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {recentTransactions.map((t, i) => (
                  <tr key={i}>
                    <td className="rev-highlight-cell">{t.id}</td>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <Avatar initials={t.initials} />
                        <span style={{ fontWeight: 500 }}>{t.partner}</span>
                      </div>
                    </td>
                    <td>{t.category}</td>
                    <td style={{ fontWeight: 600 }}>{t.gross}</td>
                    <td style={{ fontWeight: 600, color: '#16a34a' }}>{t.commission}</td>
                    <td><TxnStatusBadge status={t.status} /></td>
                    <td className="rev-time-cell">{t.date}</td>
                    <td>
                      <button className="admin-table-eye-btn"><Eye size={15} /></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="rev-dash-view-all">
              <button>View All Transactions <ChevronRight size={14} /></button>
            </div>
          </div>

          {/* Top Partners */}
          <div className="rev-dash-card rev-dash-partners">
            <div className="rev-dash-card-header">
              <h3>Top Earning Partners</h3>
            </div>
            <table className="rev-dash-table">
              <thead>
                <tr>
                  <th>Partner</th>
                  <th>Category</th>
                  <th>Revenue</th>
                  <th>Orders</th>
                  <th>Growth</th>
                </tr>
              </thead>
              <tbody>
                {topPartners.map((p, i) => (
                  <tr key={i}>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <Avatar initials={p.initials} />
                        <span style={{ fontWeight: 600 }}>{p.name}</span>
                      </div>
                    </td>
                    <td>{p.category}</td>
                    <td style={{ fontWeight: 600 }}>{p.revenue}</td>
                    <td>{p.orders}</td>
                    <td>
                      <span style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 12, fontWeight: 600, color: p.growthUp ? '#16a34a' : '#dc2626' }}>
                        {p.growthUp ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
                        {p.growth}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="rev-dash-view-all">
              <button>View All Partners <ChevronRight size={14} /></button>
            </div>
          </div>
        </div>

        {/* ── Bottom Row: Category Breakdown ── */}
        <div className="rev-dash-bottom-row" style={{ gridTemplateColumns: '1fr' }}>
          <div className="rev-dash-card rev-dash-category">
            <div className="rev-dash-card-header">
              <h3>Revenue by Category <span className="rev-dash-card-subtitle" style={{ fontSize: 13, color: '#94a3b8', fontWeight: 400 }}>(This Month)</span></h3>
            </div>
            <table className="rev-dash-table">
              <thead>
                <tr>
                  <th>Category</th>
                  <th>Total Revenue</th>
                  <th>Commission Earned</th>
                  <th>Active Partners</th>
                  <th>Total Orders</th>
                  <th>Revenue Share</th>
                </tr>
              </thead>
              <tbody>
                {categoryBreakdown.map((c, i) => (
                  <tr key={i}>
                    <td style={{ fontWeight: 600 }}>{c.category}</td>
                    <td style={{ fontWeight: 600 }}>{c.totalRevenue}</td>
                    <td style={{ color: '#16a34a', fontWeight: 600 }}>{c.commission}</td>
                    <td>{c.partners}</td>
                    <td>{c.orders}</td>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <div style={{ flex: 1, height: 6, background: '#f1f5f9', borderRadius: 3, overflow: 'hidden', minWidth: 60 }}>
                          <div style={{ width: c.share, height: '100%', background: '#4f46e5', borderRadius: 3 }} />
                        </div>
                        <span style={{ fontSize: 12, fontWeight: 600, color: '#4f46e5', minWidth: 30 }}>{c.share}</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="rev-dash-view-all">
              <button>View Full Report <ChevronRight size={14} /></button>
            </div>
          </div>
        </div>

      </div>
    </AdminShell>
  );
}
