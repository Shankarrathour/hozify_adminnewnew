import React, { useState } from 'react';
import {
  DollarSign,
  TrendingUp,
  ShoppingBag,
  BarChart2,
  Percent,
  Clock,
  ChevronDown,
  RefreshCw,
  Download,
  Eye,
  ChevronRight,
  TrendingDown
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

const revenueTrendData = [
  { date: '01 May', value: 120000 },
  { date: '04 May', value: 145000 },
  { date: '07 May', value: 110000 },
  { date: '10 May', value: 180000 },
  { date: '12 May', value: 160000 },
  { date: '15 May', value: 210000 },
  { date: '18 May', value: 195000 },
  { date: '21 May', value: 230000 },
  { date: '24 May', value: 200000 },
  { date: '26 May', value: 260000 },
  { date: '28 May', value: 240000 },
  { date: '30 May', value: 290000 },
  { date: '31 May', value: 275000 },
];

const categoryData = [
  { name: 'AC Service', value: 38, color: '#3b82f6' },
  { name: 'Plumbing', value: 24, color: '#10b981' },
  { name: 'Electrical', value: 18, color: '#f59e0b' },
  { name: 'Cleaning', value: 12, color: '#8b5cf6' },
  { name: 'Others', value: 8, color: '#94a3b8' },
];

const channelData = [
  { name: 'App', value: 52, color: '#4f46e5' },
  { name: 'Web', value: 28, color: '#06b6d4' },
  { name: 'Walk-in', value: 12, color: '#ec4899' },
  { name: 'Partner API', value: 8, color: '#f97316' },
];

const topPartners = [
  { name: 'QuickFix AC', region: 'Mumbai', revenue: '₹4,25,000', orders: 342, commission: '₹42,500' },
  { name: 'ProPlumbers', region: 'Delhi', revenue: '₹3,18,200', orders: 215, commission: '₹31,820' },
  { name: 'Spark Electricals', region: 'Bangalore', revenue: '₹2,95,400', orders: 198, commission: '₹29,540' },
  { name: 'CleanSweep Inc.', region: 'Hyderabad', revenue: '₹2,45,000', orders: 275, commission: '₹24,500' },
  { name: 'CoolAir Solutions', region: 'Pune', revenue: '₹2,10,500', orders: 185, commission: '₹21,050' },
];

const recentTransactions = [
  { id: 'TXN-98234', partner: 'QuickFix AC', amount: '₹12,400', date: '31 May, 14:30', status: 'Success' },
  { id: 'TXN-98233', partner: 'Spark Electricals', amount: '₹4,200', date: '31 May, 14:15', status: 'Success' },
  { id: 'TXN-98232', partner: 'CleanSweep Inc.', amount: '₹8,500', date: '31 May, 13:45', status: 'Pending' },
  { id: 'TXN-98231', partner: 'ProPlumbers', amount: '₹15,200', date: '31 May, 12:20', status: 'Failed' },
  { id: 'TXN-98230', partner: 'CoolAir Solutions', amount: '₹6,800', date: '31 May, 11:10', status: 'Success' },
];

const revenueByService = [
  { service: 'AC Repair & Service', category: 'AC Service', revenue: '₹18,50,000', bookings: 1245 },
  { service: 'Full Home Cleaning', category: 'Cleaning', revenue: '₹8,40,000', bookings: 850 },
  { service: 'Pipe Leakage Fix', category: 'Plumbing', revenue: '₹6,25,000', bookings: 620 },
  { service: 'Wiring Repair', category: 'Electrical', revenue: '₹5,10,000', bookings: 415 },
  { service: 'AC Installation', category: 'AC Service', revenue: '₹4,80,000', bookings: 310 },
];

const settlementSummary = [
  { batchId: 'SET-MAY-04', date: '31 May 2026', amount: '₹12,45,000', partners: 142, status: 'Processing' },
  { batchId: 'SET-MAY-03', date: '24 May 2026', amount: '₹11,20,500', partners: 138, status: 'Completed' },
  { batchId: 'SET-MAY-02', date: '17 May 2026', amount: '₹10,85,200', partners: 125, status: 'Completed' },
  { batchId: 'SET-MAY-01', date: '10 May 2026', amount: '₹11,50,000', partners: 130, status: 'Completed' },
  { batchId: 'SET-APR-04', date: '03 May 2026', amount: '₹9,80,400', partners: 118, status: 'Completed' },
];

/* ───────────────────── Sub-components ───────────────────── */

function StatCard({ icon: Icon, iconBg, iconColor, value, label, trend, trendUp }) {
  return (
    <div className="rev-dash-stat-card">
      <div className="rev-dash-stat-icon" style={{ background: iconBg }}>
        <Icon size={22} color={iconColor} />
      </div>
      <div className="rev-dash-stat-body">
        <div className="rev-dash-stat-value">{value}</div>
        <div className="rev-dash-stat-label">{label}</div>
        {trend && (
          <div className={`rev-dash-stat-trend ${trendUp ? 'up' : 'down'}`}>
            {trendUp ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
            <span>{trend}</span>
            <span className="trend-vs">vs last period</span>
          </div>
        )}
      </div>
    </div>
  );
}

function StatusBadge({ status }) {
  let cls = '';
  if (status === 'Success' || status === 'Completed') cls = 'rev-status-success';
  else if (status === 'Pending' || status === 'Processing') cls = 'rev-status-pending';
  else if (status === 'Failed') cls = 'rev-status-failed';
  return <span className={`rev-status-badge ${cls}`}>{status}</span>;
}

function CustomTooltip({ active, payload, label }) {
  if (active && payload && payload.length) {
    return (
      <div style={{ background: '#1e293b', border: '1px solid #334155', borderRadius: 8, padding: '8px 14px', color: '#f1f5f9', fontSize: 13 }}>
        <p style={{ margin: 0, color: '#94a3b8', marginBottom: 4 }}>{label}</p>
        <p style={{ margin: 0, fontWeight: 600 }}>₹{payload[0].value.toLocaleString('en-IN')}</p>
      </div>
    );
  }
  return null;
}

function DonutLegend({ data }) {
  return (
    <div className="rev-donut-legend">
      {data.map(d => (
        <div key={d.name} className="rev-donut-legend-item">
          <span className="rev-donut-legend-dot" style={{ background: d.color }} />
          <span className="rev-donut-legend-name">{d.name}</span>
          <span className="rev-donut-legend-val">{d.value}%</span>
        </div>
      ))}
    </div>
  );
}

/* ───────────────────── Main Component ───────────────────── */

export default function RevenueDashboardNew() {
  const [dateRange, setDateRange] = useState('01 May 2026 - 31 May 2026');
  const [region, setRegion] = useState('All Regions');
  const [category, setCategory] = useState('All Categories');
  const [period, setPeriod] = useState('This Month');
  const [chartFreq, setChartFreq] = useState('Daily');

  return (
    <AdminShell
      activeTab="Revenue Management"
      pageTitle="Revenue Dashboard"
      pageSubtitle="Revenue & Financial Performance Overview"
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
            <label>Region</label>
            <div className="rev-filter-select">
              <span>{region}</span>
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
            <label>Period</label>
            <div className="rev-filter-select">
              <span>{period}</span>
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
            value="₹48,24,310" label="Total Revenue"
            trend="+18.4% up" trendUp={true}
          />
          <StatCard
            icon={TrendingUp}
            iconBg="#f0fdf4" iconColor="#16a34a"
            value="₹12,18,540" label="Gross Profit"
            trend="+11.2% up" trendUp={true}
          />
          <StatCard
            icon={ShoppingBag}
            iconBg="#faf5ff" iconColor="#9333ea"
            value="14,820" label="Total Orders"
            trend="+9.7% up" trendUp={true}
          />
          <StatCard
            icon={BarChart2}
            iconBg="#fff7ed" iconColor="#ea580c"
            value="₹3,255" label="Avg Order Value"
            trend="+6.3% up" trendUp={true}
          />
          <StatCard
            icon={Percent}
            iconBg="#eef2ff" iconColor="#4f46e5"
            value="₹2,41,215" label="Platform Commission"
            trend="+14.8% up" trendUp={true}
          />
          <StatCard
            icon={Clock}
            iconBg="#fff1f2" iconColor="#e11d48"
            value="₹4,82,100" label="Pending Settlements"
            trend="-3.2% down" trendUp={false}
          />
        </div>

        {/* ── Charts Row ── */}
        <div className="rev-dash-charts-row">

          {/* Line Chart */}
          <div className="rev-dash-card rev-dash-line-chart">
            <div className="rev-dash-card-header">
              <div>
                <h3>Revenue Trend</h3>
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
              <LineChart data={revenueTrendData} margin={{ top: 8, right: 10, left: 10, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
                <XAxis dataKey="date" tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} tickFormatter={(val) => `₹${val/1000}k`} />
                <Tooltip content={<CustomTooltip />} />
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke="#2563eb"
                  strokeWidth={2.5}
                  dot={false}
                  activeDot={{ r: 5, fill: '#2563eb' }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Category Donut */}
          <div className="rev-dash-card rev-dash-donut">
            <div className="rev-dash-card-header">
              <h3>Revenue by Category</h3>
            </div>
            <div className="rev-donut-content">
              <div className="rev-donut-wrap">
                <PieChart width={170} height={170}>
                  <Pie
                    data={categoryData}
                    cx={80}
                    cy={80}
                    innerRadius={52}
                    outerRadius={78}
                    dataKey="value"
                    startAngle={90}
                    endAngle={-270}
                    stroke="none"
                  >
                    {categoryData.map((entry, i) => (
                      <Cell key={i} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
                <div className="rev-donut-center-label">
                  <span className="rev-donut-center-val">100%</span>
                  <span className="rev-donut-center-txt">Total Revenue</span>
                </div>
              </div>
              <DonutLegend data={categoryData} />
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
                  <span className="rev-donut-center-txt">Total Revenue</span>
                </div>
              </div>
              <DonutLegend data={channelData} />
            </div>
          </div>
        </div>

        {/* ── Mid Row (Top Partners + Recent TXN) ── */}
        <div className="rev-dash-mid-row">

          {/* Top Partners Table */}
          <div className="rev-dash-card rev-dash-partners">
            <div className="rev-dash-card-header">
              <h3>Top Performing Partners</h3>
            </div>
            <table className="rev-dash-table">
              <thead>
                <tr>
                  <th>Partner Name</th>
                  <th>Region</th>
                  <th>Revenue</th>
                  <th>Orders</th>
                  <th>Commission</th>
                </tr>
              </thead>
              <tbody>
                {topPartners.map((p, i) => (
                  <tr key={i}>
                    <td className="rev-bold-cell">{p.name}</td>
                    <td>{p.region}</td>
                    <td className="rev-bold-cell">{p.revenue}</td>
                    <td>{p.orders}</td>
                    <td className="rev-highlight-cell">{p.commission}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="rev-dash-view-all">
              <button>View All Partners <ChevronRight size={14} /></button>
            </div>
          </div>

          {/* Recent Transactions Table */}
          <div className="rev-dash-card rev-dash-transactions">
            <div className="rev-dash-card-header">
              <h3>Recent Transactions</h3>
            </div>
            <table className="rev-dash-table">
              <thead>
                <tr>
                  <th>TXN ID</th>
                  <th>Partner</th>
                  <th>Amount</th>
                  <th>Date & Time</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {recentTransactions.map((t, i) => (
                  <tr key={i}>
                    <td className="rev-mono-cell">{t.id}</td>
                    <td>{t.partner}</td>
                    <td className="rev-bold-cell">{t.amount}</td>
                    <td className="rev-time-cell">{t.date}</td>
                    <td><StatusBadge status={t.status} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="rev-dash-view-all">
              <button>View All Transactions <ChevronRight size={14} /></button>
            </div>
          </div>
        </div>

        {/* ── Bottom Row (Revenue By Service + Settlements) ── */}
        <div className="rev-dash-bottom-row">

          {/* Revenue By Service Table */}
          <div className="rev-dash-card rev-dash-services">
            <div className="rev-dash-card-header">
              <h3>Revenue by Service</h3>
            </div>
            <table className="rev-dash-table">
              <thead>
                <tr>
                  <th>Service Name</th>
                  <th>Category</th>
                  <th>Total Revenue</th>
                  <th>Total Bookings</th>
                </tr>
              </thead>
              <tbody>
                {revenueByService.map((s, i) => (
                  <tr key={i}>
                    <td className="rev-bold-cell">{s.service}</td>
                    <td>{s.category}</td>
                    <td className="rev-bold-cell">{s.revenue}</td>
                    <td>{s.bookings}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="rev-dash-view-all">
              <button>View All Services <ChevronRight size={14} /></button>
            </div>
          </div>

          {/* Settlement Summary Table */}
          <div className="rev-dash-card rev-dash-settlements">
            <div className="rev-dash-card-header">
              <h3>Settlement Summary</h3>
            </div>
            <table className="rev-dash-table">
              <thead>
                <tr>
                  <th>Batch ID</th>
                  <th>Date</th>
                  <th>Total Amount</th>
                  <th>Partners</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {settlementSummary.map((s, i) => (
                  <tr key={i}>
                    <td className="rev-mono-cell">{s.batchId}</td>
                    <td className="rev-time-cell">{s.date}</td>
                    <td className="rev-bold-cell">{s.amount}</td>
                    <td>{s.partners}</td>
                    <td><StatusBadge status={s.status} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="rev-dash-view-all">
              <button>View All Settlements <ChevronRight size={14} /></button>
            </div>
          </div>
        </div>
      </div>
    </AdminShell>
  );
}
