import React, { useState, useMemo } from 'react';
import toast from 'react-hot-toast';
import {
  DollarSign,
  CreditCard,
  TrendingUp,
  TrendingDown,
  RefreshCw,
  Download,
  ChevronDown,
  ChevronRight,
  Eye, X,
  Briefcase,
  Users,
  BarChart2
} from 'lucide-react';
import AdminShell from '../../components/layouts/AdminShell';
import StatusBadge from '../../components/common/StatusBadge';
import Avatar from '../../components/common/Avatar';
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

const chartDataDaily = [
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

const chartDataWeekly = [
  { date: 'Week 1', revenue: 268000 },
  { date: 'Week 2', revenue: 309000 },
  { date: 'Week 3', revenue: 312000 },
  { date: 'Week 4', revenue: 331000 },
];

const chartDataMonthly = [
  { date: 'Jan', revenue: 950000 },
  { date: 'Feb', revenue: 1020000 },
  { date: 'Mar', revenue: 1150000 },
  { date: 'Apr', revenue: 1210000 },
  { date: 'May', revenue: 1220000 },
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
  const [viewAllModal, setViewAllModal] = useState(null);
  const [selectedRow, setSelectedRow] = useState(null);
  const [partnerType, setPartnerType] = useState('All Partners');
  const [category, setCategory] = useState('All Categories');
  const [statusFilter, setStatusFilter] = useState('All Status');
  const [chartFreq, setChartFreq] = useState('Daily');
  const [isRefreshing, setIsRefreshing] = useState(false);

  const totalSellers = sellerTypeData.reduce((s, d) => s + d.value, 0);

  const txnColumns = [
    { header: 'Txn ID', accessor: 'id', render: (row) => <span style={{fontWeight: 600, color: '#4f46e5'}}>{row.id}</span> },
    { header: 'Partner', accessor: 'partner', render: (row) => (
      <div className="avatar-cell">
        <Avatar name={row.partner} size={32} />
        <span className="avatar-cell-name">{row.partner}</span>
      </div>
    ) },
    { header: 'Category', accessor: 'category', render: (row) => <span className="premium-chip">{row.category}</span> },
    { header: 'Gross', accessor: 'gross', render: (row) => <span style={{fontWeight: 600}}>{row.gross}</span> },
    { header: 'Commission', accessor: 'commission', render: (row) => <span style={{fontWeight: 600, color: '#16a34a'}}>{row.commission}</span> },
    { header: 'Status', accessor: 'status', render: (row) => <StatusBadge status={row.status} /> },
    { header: 'Date & Time', accessor: 'date' }
  ];

  const partnerColumns = [
    { header: 'Partner', accessor: 'name', render: (row) => (
      <div className="avatar-cell">
        <Avatar name={row.name} size={32} />
        <span className="avatar-cell-name">{row.name}</span>
      </div>
    ) },
    { header: 'Category', accessor: 'category', render: (row) => <span className="premium-chip">{row.category}</span> },
    { header: 'Revenue', accessor: 'revenue', render: (row) => <span style={{fontWeight: 600}}>{row.revenue}</span> },
    { header: 'Orders', accessor: 'orders' },
    { header: 'Growth', accessor: 'growth', render: (row) => (
      <span style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '12px', fontWeight: 600, color: row.growthUp ? '#16a34a' : '#dc2626' }}>
        {row.growthUp ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
        {row.growth}
      </span>
    ) }
  ];

  const categoryColumns = [
    { header: 'Category', accessor: 'category', render: (row) => <span className="premium-chip premium-chip-indigo">{row.category}</span> },
    { header: 'Total Revenue', accessor: 'totalRevenue', render: (row) => <span style={{fontWeight: 600}}>{row.totalRevenue}</span> },
    { header: 'Commission Earned', accessor: 'commission', render: (row) => <span style={{color: '#16a34a', fontWeight: 600}}>{row.commission}</span> },
    { header: 'Active Partners', accessor: 'partners' },
    { header: 'Total Orders', accessor: 'orders' },
    { header: 'Revenue Share', accessor: 'share', render: (row) => (
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <div style={{ flex: 1, height: '6px', background: '#f1f5f9', borderRadius: '3px', overflow: 'hidden', minWidth: '60px' }}>
          <div style={{ width: row.share, height: '100%', background: '#4f46e5', borderRadius: '3px' }} />
        </div>
        <span style={{ fontSize: '12px', fontWeight: 600, color: '#4f46e5', minWidth: '30px' }}>{row.share}</span>
      </div>
    ) }
  ];

  const renderActions = (row) => (
    <div className="action-btn-group">
      <button className="action-icon-btn" title="View Details"><Eye size={16} /></button>
    </div>
  );


  const [filterTrigger, setFilterTrigger] = useState(0);

  const m = dateRange === 'Last 7 Days' ? 0.25 : dateRange === 'Last 30 Days' ? 1.5 : 1;

  const dynFilteredTransactions = useMemo(() => {
    let filtered = recentTransactions.filter(t => {
      if (category !== 'All Categories' && t.category !== category) return false;
      if (statusFilter !== 'All Status' && t.status !== statusFilter) return false;
      return true;
    });
    return filtered.slice(0, Math.max(2, Math.floor(filtered.length * (m >= 1 ? 1 : m * 1.5))));
  }, [m, filterTrigger, category, statusFilter]);

  const dynTopPartners = useMemo(() => topPartners.slice(0, Math.max(2, Math.floor(topPartners.length * (m >= 1 ? 1 : m * 1.5)))), [m, filterTrigger]);
  const dynCategoryBreakdown = useMemo(() => categoryBreakdown.slice(0, Math.max(2, Math.floor(categoryBreakdown.length * (m >= 1 ? 1 : m * 1.5)))), [m, filterTrigger]);
  
  const dynChartData = useMemo(() => {
    const baseData = chartFreq === 'Weekly' ? chartDataWeekly : chartFreq === 'Monthly' ? chartDataMonthly : chartDataDaily;
    return baseData.map(d => ({ ...d, revenue: Math.floor(d.revenue * m) }));
  }, [chartFreq, m, filterTrigger]);

  const handleRefresh = () => {
    setFilterTrigger(prev => prev + 1);
    toast.success('Dashboard data refreshed successfully.');
  };

  const handleExport = () => {
    toast.success('Revenue report exported successfully!');
  };

  return (
    <AdminShell
      activeTab={activeTab}
    >
      <div className="rev-dash-root">

        {/* ── Header Filters ── */}
        <div className="rev-dash-filters">
          <div className="rev-filter-group">
            <label>Date Range</label>
            <div className="rev-filter-select" style={{ position: 'relative' }}>
              <select 
                value={dateRange} 
                onChange={e => setDateRange(e.target.value)}
                style={{ appearance: 'none', width: '100%', height: '100%', position: 'absolute', opacity: 0, cursor: 'pointer', left: 0, top: 0 }}
              >
                <option value="01 May 2026 - 31 May 2026">01 May 2026 - 31 May 2026</option>
                <option value="Last 7 Days">Last 7 Days</option>
                <option value="Last 30 Days">Last 30 Days</option>
              </select>
              <span>{dateRange}</span>
              <ChevronDown size={14} />
            </div>
          </div>
          <div className="rev-filter-group">
            <label>Partner Type</label>
            <div className="rev-filter-select" style={{ position: 'relative' }}>
              <select 
                value={partnerType} 
                onChange={e => setPartnerType(e.target.value)}
                style={{ appearance: 'none', width: '100%', height: '100%', position: 'absolute', opacity: 0, cursor: 'pointer', left: 0, top: 0 }}
              >
                <option value="All Partners">All Partners</option>
                <option value="Enterprise">Enterprise</option>
                <option value="Mid-Market">Mid-Market</option>
                <option value="Small Biz">Small Biz</option>
                <option value="Freelance">Freelance</option>
              </select>
              <span>{partnerType}</span>
              <ChevronDown size={14} />
            </div>
          </div>
          <div className="rev-filter-group">
            <label>Category</label>
            <div className="rev-filter-select" style={{ position: 'relative' }}>
              <select 
                value={category} 
                onChange={e => setCategory(e.target.value)}
                style={{ appearance: 'none', width: '100%', height: '100%', position: 'absolute', opacity: 0, cursor: 'pointer', left: 0, top: 0 }}
              >
                <option value="All Categories">All Categories</option>
                <option value="Logistics">Logistics</option>
                <option value="Services">Services</option>
                <option value="Cleaning">Cleaning</option>
                <option value="Electrical">Electrical</option>
                <option value="Plumbing">Plumbing</option>
                <option value="Others">Others</option>
              </select>
              <span>{category}</span>
              <ChevronDown size={14} />
            </div>
          </div>
          <div className="rev-filter-group">
            <label>Status</label>
            <div className="rev-filter-select" style={{ position: 'relative' }}>
              <select 
                value={statusFilter} 
                onChange={e => setStatusFilter(e.target.value)}
                style={{ appearance: 'none', width: '100%', height: '100%', position: 'absolute', opacity: 0, cursor: 'pointer', left: 0, top: 0 }}
              >
                <option value="All Status">All Status</option>
                <option value="Settled">Settled</option>
                <option value="Pending">Pending</option>
                <option value="Refunded">Refunded</option>
              </select>
              <span>{statusFilter}</span>
              <ChevronDown size={14} />
            </div>
          </div>
          <div className="rev-filter-actions">
            <button className="rev-filter-btn-refresh" onClick={handleRefresh} disabled={isRefreshing} style={{ opacity: isRefreshing ? 0.7 : 1 }}>
              <RefreshCw size={15} style={{ animation: isRefreshing ? 'spin 1s linear infinite' : 'none' }} /> {isRefreshing ? 'Refreshing...' : 'Refresh'}
            </button>
            <button className="rev-filter-btn-export" onClick={handleExport}>
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
              <LineChart data={dynChartData} margin={{ top: 8, right: 10, left: -20, bottom: 0 }}>
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
          <div className="admin-dash-card">
            <div className="admin-dash-card-header">
              <h3>Recent Transactions</h3>
            </div>
            <div style={{ overflowY: 'auto', maxHeight: '400px', width: '100%' }}>
            <table className="rev-dash-table" style={{ width: '100%', minWidth: '800px' }}>
              <thead>
                <tr>
                  <th>Txn ID</th>
                  <th>Partner</th>
                  <th>Category</th>
                  <th>Gross</th>
                  <th>Commission</th>
                  <th>Status</th>
                  <th>Date & Time</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {dynFilteredTransactions.map((t, i) => (
                  <tr key={i}>
                    <td><span style={{fontWeight: 600, color: '#4f46e5'}}>{t.id}</span></td>
                    <td>
                      <div className="avatar-cell">
                        <Avatar name={t.partner} size={32} />
                        <span className="avatar-cell-name">{t.partner}</span>
                      </div>
                    </td>
                    <td><span className="premium-chip">{t.category}</span></td>
                    <td><span style={{fontWeight: 600}}>{t.gross}</span></td>
                    <td><span style={{fontWeight: 600, color: '#16a34a'}}>{t.commission}</span></td>
                    <td><StatusBadge status={t.status} /></td>
                    <td>{t.date}</td>
                    <td>{renderActions(t)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            </div>
            <div className="rev-dash-view-all" style={{ paddingLeft: '16px', paddingRight: '16px' }}>
              <button onClick={() => { setViewAllModal('transactions'); setSelectedRow(null); }}>View All Transactions <ChevronRight size={14} /></button>
            </div>
          </div>

          {/* Top Partners */}
          <div className="admin-dash-card">
            <div className="admin-dash-card-header">
              <h3>Top Earning Partners</h3>
            </div>
            <div style={{ overflowY: 'auto', maxHeight: '400px', width: '100%' }}>
            <table className="rev-dash-table" style={{ width: '100%', minWidth: '700px' }}>
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
                {dynTopPartners.map((p, i) => (
                  <tr key={i}>
                    <td>
                      <div className="avatar-cell">
                        <Avatar name={p.name} size={32} />
                        <span className="avatar-cell-name">{p.name}</span>
                      </div>
                    </td>
                    <td><span className="premium-chip">{p.category}</span></td>
                    <td><span style={{fontWeight: 600}}>{p.revenue}</span></td>
                    <td>{p.orders}</td>
                    <td>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '12px', fontWeight: 600, color: p.growthUp ? '#16a34a' : '#dc2626' }}>
                        {p.growthUp ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
                        {p.growth}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            </div>
            <div className="rev-dash-view-all" style={{ paddingLeft: '16px', paddingRight: '16px' }}>
              <button onClick={() => { setViewAllModal('partners'); setSelectedRow(null); }}>View All Partners <ChevronRight size={14} /></button>
            </div>
          </div>
        </div>

        {/* ── Bottom Row: Category Breakdown ── */}
        <div className="rev-dash-bottom-row" style={{ gridTemplateColumns: '1fr' }}>
          <div className="admin-dash-card">
            <div className="admin-dash-card-header">
              <h3>Revenue by Category (This Month)</h3>
            </div>
            <div style={{ overflowY: 'auto', maxHeight: '400px', width: '100%' }}>
            <table className="rev-dash-table" style={{ width: '100%', minWidth: '800px' }}>
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
                {dynCategoryBreakdown.map((c, i) => (
                  <tr key={i}>
                    <td><span className="premium-chip premium-chip-indigo">{c.category}</span></td>
                    <td><span style={{fontWeight: 600}}>{c.totalRevenue}</span></td>
                    <td><span style={{color: '#16a34a', fontWeight: 600}}>{c.commission}</span></td>
                    <td>{c.partners}</td>
                    <td>{c.orders}</td>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <div style={{ flex: 1, height: '6px', background: '#f1f5f9', borderRadius: '3px', overflow: 'hidden', minWidth: '60px' }}>
                          <div style={{ width: c.share, height: '100%', background: '#4f46e5', borderRadius: '3px' }} />
                        </div>
                        <span style={{ fontSize: '12px', fontWeight: 600, color: '#4f46e5', minWidth: '30px' }}>{c.share}</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            </div>
            <div className="rev-dash-view-all" style={{ paddingLeft: '16px', paddingRight: '16px' }}>
              <button onClick={() => { setViewAllModal('categories'); setSelectedRow(null); }}>View All Categories <ChevronRight size={14} /></button>
            </div>
          </div>
        </div>

      </div>
    
      {/* ════════════════════ MODAL ════════════════════ */}
      {viewAllModal && (
        <div className="sd-modal-overlay" onClick={() => { setViewAllModal(null); setSelectedRow(null); }} style={{position:'fixed',top:0,left:0,width:'100vw',height:'100vh',background:'rgba(15,23,42,0.6)',backdropFilter:'blur(4px)',zIndex:99999,display:'flex',alignItems:'center',justifyContent:'center',padding:20,animation:'fadeIn 0.2s ease-out'}}>
          <div className="sd-modal-content" onClick={e => e.stopPropagation()} style={{background:'#fff',borderRadius:16,width:'100%',maxWidth: selectedRow ? 600 : 900,maxHeight:'90vh',display:'flex',flexDirection:'column',boxShadow:'0 25px 50px -12px rgba(0,0,0,0.25)',animation:'slideUp 0.3s cubic-bezier(0.16, 1, 0.3, 1)'}}>
            
            <div className="sd-modal-header" style={{padding:'20px 24px',borderBottom:'1px solid #e2e8f0',display:'flex',justifyContent:'space-between',alignItems:'center'}}>
              <div style={{display:'flex',alignItems:'center',gap:12}}>
                {selectedRow && (
                  <button onClick={() => setSelectedRow(null)} style={{background:'#f1f5f9',color:'#475569',border:'none',borderRadius:8,padding:'6px 12px',fontSize:13,fontWeight:600,cursor:'pointer',display:'flex',alignItems:'center',gap:4}}>
                    ← Back
                  </button>
                )}
                <h3 className="sd-modal-title" style={{margin:0,fontSize:18,fontWeight:700,color:'#0f172a'}}>
                  {selectedRow ? 'Record Details' : (
                    viewAllModal === 'transactions' ? 'All Transactions' :
                    viewAllModal === 'partners' ? 'All Partners' :
                    viewAllModal === 'categories' ? 'All Categories' : 'Details'
                  )}
                </h3>
              </div>
              <button className="sd-modal-close" onClick={() => { setViewAllModal(null); setSelectedRow(null); }} style={{background:'transparent',border:'none',color:'#64748b',cursor:'pointer'}}><X size={18} /></button>
            </div>
            
            <div className="sd-modal-body" style={{padding:24,overflowY:'auto',flex:1}}>
              {selectedRow ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                  {Object.keys(selectedRow).map(k => {
                    if (k === 'initials') return null; // Skip rendering initials
                    return (
                      <div key={k} style={{ display: 'flex', flexDirection: 'column', gap: 6, paddingBottom: 16, borderBottom: '1px dashed #e2e8f0' }}>
                        <span style={{ fontSize: 13, fontWeight: 600, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                          {k.replace(/([A-Z])/g, ' $1').trim()}
                        </span>
                        <span style={{ fontSize: 15, fontWeight: 500, color: '#1e293b' }}>
                          {typeof selectedRow[k] === 'boolean' ? (selectedRow[k] ? 'Yes' : 'No') : selectedRow[k]}
                        </span>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div style={{ overflowY: 'auto', maxHeight: '400px' }}>
                  <table className="sd-rtable" style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                    {(() => {
                      let data = [];
                      if (viewAllModal === 'transactions') data = recentTransactions;
                      else if (viewAllModal === 'partners') data = topPartners;
                      else if (viewAllModal === 'categories') data = categoryBreakdown;

                      if (!data.length) return <tbody><tr><td style={{padding: 20, textAlign: 'center'}}>No data available</td></tr></tbody>;

                      const keys = Object.keys(data[0]).filter(k => k !== 'initials' && k !== 'growthUp');
                      return (
                        <>
                          <thead>
                            <tr style={{ background: '#f8fafc', borderBottom: '1px solid #e2e8f0' }}>
                              {keys.map(k => <th key={k} style={{ textTransform: 'capitalize', padding: '12px 16px', color: '#475569', fontSize: 13, fontWeight: 600 }}>{k.replace(/([A-Z])/g, ' $1').trim()}</th>)}
                              <th style={{ padding: '12px 16px', color: '#475569', fontSize: 13, fontWeight: 600, textAlign: 'right' }}>Actions</th>
                            </tr>
                          </thead>
                          <tbody>
                            {data.map((r, i) => (
                              <tr key={i} style={{ borderBottom: '1px solid #f1f5f9', cursor: 'pointer', transition: 'background 0.2s' }}
                                  onMouseEnter={e => e.currentTarget.style.background = '#f8fafc'}
                                  onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                                  onClick={() => setSelectedRow(r)}>
                                {keys.map(k => (
                                  <td key={k} style={{ padding: '12px 16px', fontSize: 13, color: '#1e293b', fontWeight: typeof r[k] === 'number' ? 700 : 500 }}>
                                    {typeof r[k] === 'boolean' ? (r[k] ? 'Yes' : 'No') : r[k]}
                                  </td>
                                ))}
                                <td style={{ padding: '12px 16px', textAlign: 'right' }}>
                                  <button 
                                    onClick={(e) => { e.stopPropagation(); setSelectedRow(r); }}
                                    style={{
                                      background: '#e0e7ff', color: '#4f46e5', border: 'none', borderRadius: 6,
                                      padding: '6px 12px', fontSize: 13, fontWeight: 600, cursor: 'pointer',
                                      display: 'inline-flex', alignItems: 'center', gap: 4, transition: 'all 0.2s'
                                    }}
                                  >
                                    <Eye size={14} /> View
                                  </button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </>
                      );
                    })()}
                  </table>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
      <style>{`
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes slideUp { from { opacity: 0; transform: translateY(20px) scale(0.98); } to { opacity: 1; transform: translateY(0) scale(1); } }
      `}</style>

    </AdminShell>
  );
}
