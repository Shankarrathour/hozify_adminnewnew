import React, { useState } from 'react';
import {
  DollarSign,
  Clock,
  Layers,
  ThumbsUp,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  RefreshCw,
  Download,
  ChevronDown,
  ChevronRight,
  Eye,
  Star,
  ArrowUpRight,
  Map
} from 'lucide-react';
import { useToast } from '../../components/common/ToastNotification';
import AdminShell from '../../components/layouts/AdminShell';
import {
  AreaChart,
  Area,
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

const growthData = [
  { month: 'Jan', revenue: 280000 },
  { month: 'Feb', revenue: 310000 },
  { month: 'Mar', revenue: 295000 },
  { month: 'Apr', revenue: 380000 },
  { month: 'May', revenue: 420000 },
  { month: 'Jun', revenue: 390000 },
  { month: 'Jul', revenue: 450000 },
  { month: 'Aug', revenue: 480000 },
  { month: 'Sep', revenue: 510000 },
  { month: 'Oct', revenue: 540000 },
  { month: 'Nov', revenue: 520000 },
  { month: 'Dec', revenue: 580000 },
];

const revenueMixData = [
  { name: 'Subscriptions', value: 62, color: '#4f46e5' },
  { name: 'Professional', value: 24, color: '#818cf8' },
  { name: 'Ad-hoc', value: 14, color: '#cbd5e1' },
];

const categoryRevenueData = [
  { name: 'AC Services', value: 38, color: '#3b82f6' },
  { name: 'Plumbing', value: 24, color: '#8b5cf6' },
  { name: 'Electrical', value: 18, color: '#ec4899' },
  { name: 'Cleaning', value: 12, color: '#f59e0b' },
  { name: 'Others', value: 8, color: '#64748b' },
];

const topServices = [
  { id: 'SVC-001', name: 'Premium On-Demand Support', category: 'Support', revenue: '₹8,42,000', orders: 312, rating: 4.9, status: 'Active' },
  { id: 'SVC-002', name: 'Enterprise Security Audit', category: 'Security', revenue: '₹6,12,000', orders: 228, rating: 4.8, status: 'Active' },
  { id: 'SVC-003', name: 'Cloud Infrastructure Managed', category: 'Cloud', revenue: '₹5,44,000', orders: 195, rating: 4.7, status: 'Active' },
  { id: 'SVC-004', name: 'Regional Logistics Bulk', category: 'Logistics', revenue: '₹1,20,000', orders: 42, rating: 3.2, status: 'Critical' },
  { id: 'SVC-005', name: 'Legacy Database Support', category: 'Database', revenue: '₹82,000', orders: 28, rating: 3.5, status: 'At Risk' },
];

const recentOrders = [
  { id: 'ORD-4821', service: 'AC Services', partner: 'Cooling Experts', customer: 'Raj Sharma', amount: '₹2,400', status: 'Completed', date: '31 May 2026, 14:30' },
  { id: 'ORD-4822', service: 'Plumbing', partner: 'A1 Plumbing', customer: 'Meera Patel', amount: '₹1,800', status: 'In Progress', date: '31 May 2026, 13:45' },
  { id: 'ORD-4823', service: 'Electrical', partner: 'Spark Electric', customer: 'Vikram Singh', amount: '₹3,200', status: 'Completed', date: '31 May 2026, 12:20' },
  { id: 'ORD-4824', service: 'Cleaning', partner: 'Shine Cleaners', customer: 'Anita Roy', amount: '₹950', status: 'Cancelled', date: '31 May 2026, 11:10' },
  { id: 'ORD-4825', service: 'AC Services', partner: 'CoolFix Pro', customer: 'Suresh Kumar', amount: '₹1,600', status: 'Completed', date: '31 May 2026, 10:05' },
];

const slaAlerts = [
  { id: 'SLA-001', service: 'Regional Logistics Bulk', issue: 'Dropped 14% below target', severity: 'High', assignee: 'Ops Team', date: '31 May 2026' },
  { id: 'SLA-002', service: 'Legacy Database Support', issue: 'Response time exceeded', severity: 'Medium', assignee: 'Tech Team', date: '30 May 2026' },
  { id: 'SLA-003', service: 'On-site Maintenance', issue: 'Partner capacity low', severity: 'Medium', assignee: 'PM Team', date: '30 May 2026' },
  { id: 'SLA-004', service: 'Cloud Infrastructure', issue: 'Minor uptime dip', severity: 'Low', assignee: 'DevOps', date: '29 May 2026' },
];

/* ───────────────────── Sub-components ───────────────────── */

function StatCard({ icon: Icon, iconBg, iconColor, value, label, sublabel, trend, trendUp, trendLabel }) {
  return (
    <div className="svc-dash-stat-card">
      <div className="svc-dash-stat-icon" style={{ background: iconBg }}>
        <Icon size={22} color={iconColor} />
      </div>
      <div className="svc-dash-stat-body">
        <div className="svc-dash-stat-value">{value}</div>
        <div className="svc-dash-stat-label">{label}</div>
        {sublabel && <div style={{ fontSize: '11px', color: '#94a3b8', fontWeight: 400, marginTop: 2 }}>{sublabel}</div>}
        {trend && (
          <div className="svc-dash-stat-trend" style={{ color: trendUp ? '#16a34a' : '#dc2626', display: 'flex', alignItems: 'center', gap: 4, fontSize: 12, fontWeight: 600, marginTop: 6 }}>
            {trendUp ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
            <span>{trend}</span>
            <span style={{ color: '#94a3b8', fontWeight: 400 }}>{trendLabel}</span>
          </div>
        )}
      </div>
    </div>
  );
}

function SvcStatusBadge({ status }) {
  const map = {
    Active:      { bg: '#dcfce7', color: '#166534' },
    Completed:   { bg: '#dcfce7', color: '#166534' },
    'In Progress': { bg: '#fef3c7', color: '#92400e' },
    Critical:    { bg: '#fee2e2', color: '#991b1b' },
    'At Risk':   { bg: '#ffedd5', color: '#9a3412' },
    Cancelled:   { bg: '#fee2e2', color: '#991b1b' },
  };
  const s = map[status] || { bg: '#f1f5f9', color: '#475569' };
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', padding: '3px 10px', borderRadius: '20px', fontSize: '11.5px', fontWeight: 600, background: s.bg, color: s.color }}>
      {status}
    </span>
  );
}

function SeverityBadge({ severity }) {
  const cls = severity === 'High' ? 'svc-severity-high' : severity === 'Medium' ? 'svc-severity-medium' : 'svc-severity-low';
  return <span className={`svc-severity-badge ${cls}`}>{severity}</span>;
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
  return (
    <div className="svc-donut-legend">
      {data.map(d => (
        <div key={d.name} className="svc-donut-legend-item">
          <span className="svc-donut-legend-dot" style={{ background: d.color }} />
          <span className="svc-donut-legend-name">{d.name}</span>
          <span className="svc-donut-legend-val">{d.value}%</span>
        </div>
      ))}
    </div>
  );
}

/* ───────────────────── Main Component ───────────────────── */

export default function ServiceDashboard() {
  const { addToast } = useToast();
  const [dateRange, setDateRange] = useState('This Quarter');
  const [category, setCategory] = useState('All Categories');
  const [region, setRegion] = useState('All Regions');
  const [statusFilter, setStatusFilter] = useState('All Status');
  const [chartFreq, setChartFreq] = useState('Monthly');

  const totalMix = revenueMixData.reduce((s, d) => s + d.value, 0);

  return (
    <AdminShell
      activeTab="Services"
      pageTitle="Services Dashboard"
      pageSubtitle="Service Performance, Fulfillment & SLA Monitoring"
    >
      <div className="svc-dash-root">

        {/* ── SLA Alert Banner ── */}
        <div style={{ background: '#fef2f2', border: '1px solid #fee2e2', borderRadius: '12px', padding: '14px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14, flex: 1 }}>
            <div style={{ width: 36, height: 36, borderRadius: 8, background: '#fee2e2', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <AlertTriangle size={18} color="#dc2626" />
            </div>
            <div>
              <strong style={{ display: 'block', fontSize: 13, color: '#991b1b' }}>Priority Risk Assessment: Critical</strong>
              <p style={{ fontSize: 12, color: '#dc2626', margin: '2px 0 0' }}>Service "Regional Logistics" has dropped 14% below SLA target. Urgent reallocation recommended.</p>
            </div>
          </div>
          <button onClick={() => addToast('Emergency SLA action initiated!', 'success')} style={{ height: 34, padding: '0 16px', background: '#b91c1c', color: '#fff', border: 'none', borderRadius: 6, fontSize: 12, fontWeight: 700, cursor: 'pointer' }}>
            Initiate Action
          </button>
        </div>

        {/* ── Header Filters ── */}
        <div className="svc-dash-filters">
          <div className="svc-filter-group">
            <label>Date Range</label>
            <div className="svc-filter-select">
              <span>{dateRange}</span>
              <ChevronDown size={14} />
            </div>
          </div>
          <div className="svc-filter-group">
            <label>Category</label>
            <div className="svc-filter-select">
              <span>{category}</span>
              <ChevronDown size={14} />
            </div>
          </div>
          <div className="svc-filter-group">
            <label>Region</label>
            <div className="svc-filter-select">
              <span>{region}</span>
              <ChevronDown size={14} />
            </div>
          </div>
          <div className="svc-filter-group">
            <label>Status</label>
            <div className="svc-filter-select">
              <span>{statusFilter}</span>
              <ChevronDown size={14} />
            </div>
          </div>
          <div className="svc-filter-actions">
            <button className="svc-filter-btn-refresh"><RefreshCw size={15} /> Refresh</button>
            <button className="svc-filter-btn-export"><Download size={15} /> Export Report</button>
          </div>
        </div>

        {/* ── Stat Cards ── */}
        <div className="svc-dash-stats-grid">
          <StatCard
            icon={DollarSign} iconBg="#eff6ff" iconColor="#2563eb"
            value="₹42,00,000" label="Total Revenue" sublabel="This Quarter"
            trend="+12%" trendUp={true} trendLabel="vs last quarter"
          />
          <StatCard
            icon={Clock} iconBg="#fef2f2" iconColor="#dc2626"
            value="2.4d" label="Avg. Fulfillment" sublabel="Per Order"
            trend="-0.3d" trendUp={false} trendLabel="vs last quarter"
          />
          <StatCard
            icon={Layers} iconBg="#fff7ed" iconColor="#ea580c"
            value="1,842" label="Active Orders" sublabel="Currently Active"
            trend="+3.6%" trendUp={true} trendLabel="vs last quarter"
          />
          <StatCard
            icon={ThumbsUp} iconBg="#f0fdf4" iconColor="#16a34a"
            value="4.8/5" label="Customer CSAT" sublabel="Avg Rating"
            trend="+0.2" trendUp={true} trendLabel="vs last quarter"
          />
          <StatCard
            icon={TrendingUp} iconBg="#faf5ff" iconColor="#9333ea"
            value="94.6%" label="SLA Compliance" sublabel="This Quarter"
            trend="+1.8%" trendUp={true} trendLabel="vs last quarter"
          />
          <StatCard
            icon={AlertTriangle} iconBg="#fff1f2" iconColor="#e11d48"
            value="4" label="SLA Breaches" sublabel="This Month"
            trend="-33%" trendUp={false} trendLabel="vs last month"
          />
        </div>

        {/* ── Charts Row ── */}
        <div className="svc-dash-charts-row">

          {/* Growth Trajectory Chart */}
          <div className="svc-dash-card svc-dash-bookings-chart">
            <div className="svc-dash-card-header">
              <div>
                <h3>Service Revenue Growth</h3>
              </div>
              <div className="svc-chart-freq">
                {['Monthly', 'Quarterly', 'Yearly'].map(f => (
                  <button key={f} className={`svc-chart-freq-btn ${chartFreq === f ? 'active' : ''}`} onClick={() => setChartFreq(f)}>{f}</button>
                ))}
              </div>
            </div>
            <div style={{ padding: '0 20px 20px' }}>
              <ResponsiveContainer width="100%" height={200}>
                <AreaChart data={growthData} margin={{ top: 8, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="svcGrowthGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#4f46e5" stopOpacity={0.02} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
                  <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                  <Tooltip content={<CustomTooltip />} />
                  <Area type="monotone" dataKey="revenue" stroke="#4f46e5" strokeWidth={2.5} fill="url(#svcGrowthGrad)" dot={false} activeDot={{ r: 5, fill: '#4f46e5' }} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Revenue Mix Donut */}
          <div className="svc-dash-card">
            <div className="svc-dash-card-header">
              <h3>Revenue Mix</h3>
            </div>
            <div className="svc-donut-content">
              <div className="svc-donut-wrap">
                <PieChart width={160} height={160}>
                  <Pie data={revenueMixData} cx={75} cy={75} innerRadius={50} outerRadius={72} dataKey="value" startAngle={90} endAngle={-270} stroke="none">
                    {revenueMixData.map((entry, i) => <Cell key={i} fill={entry.color} />)}
                  </Pie>
                </PieChart>
                <div style={{ position: 'absolute', textAlign: 'center', pointerEvents: 'none' }}>
                  <span style={{ display: 'block', fontSize: '20px', fontWeight: 800, color: '#1e293b' }}>62%</span>
                  <span style={{ display: 'block', fontSize: '10px', color: '#64748b', fontWeight: 600 }}>Subs.</span>
                </div>
              </div>
              <DonutLegend data={revenueMixData} />
            </div>
          </div>

          {/* Category Revenue Donut */}
          <div className="svc-dash-card">
            <div className="svc-dash-card-header">
              <h3>Revenue by Category</h3>
            </div>
            <div className="svc-donut-content">
              <div className="svc-donut-wrap">
                <PieChart width={160} height={160}>
                  <Pie data={categoryRevenueData} cx={75} cy={75} innerRadius={50} outerRadius={72} dataKey="value" startAngle={90} endAngle={-270} stroke="none">
                    {categoryRevenueData.map((entry, i) => <Cell key={i} fill={entry.color} />)}
                  </Pie>
                </PieChart>
                <div style={{ position: 'absolute', textAlign: 'center', pointerEvents: 'none' }}>
                  <span style={{ display: 'block', fontSize: '20px', fontWeight: 800, color: '#1e293b' }}>5</span>
                  <span style={{ display: 'block', fontSize: '10px', color: '#64748b', fontWeight: 600 }}>Cats</span>
                </div>
              </div>
              <DonutLegend data={categoryRevenueData} />
            </div>
          </div>
        </div>

        {/* ── Mid Row ── */}
        <div className="svc-dash-mid-row">

          {/* Top Performing Services */}
          <div className="svc-dash-card">
            <div className="svc-dash-card-header">
              <h3>Top Performing Services</h3>
              <a href="#details" onClick={e => e.preventDefault()} style={{ fontSize: 12, color: '#4f46e5', fontWeight: 600, textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 4 }}>
                View All <ArrowUpRight size={14} />
              </a>
            </div>
            <div className="svc-table-container">
              <table className="svc-dash-table">
                <thead>
                  <tr>
                    <th>Service</th>
                    <th>Category</th>
                    <th>Revenue</th>
                    <th>Orders</th>
                    <th>Rating</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {topServices.map((s, i) => (
                    <tr key={i}>
                      <td className="svc-bold-cell">{s.name}</td>
                      <td>{s.category}</td>
                      <td className="svc-revenue-cell">{s.revenue}</td>
                      <td>{s.orders}</td>
                      <td>
                        <span className="svc-rating">
                          <Star size={12} color="#f59e0b" fill="#f59e0b" /> {s.rating}
                        </span>
                      </td>
                      <td><SvcStatusBadge status={s.status} /></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="svc-dash-view-all">
              <button>View All Services <ChevronRight size={14} /></button>
            </div>
          </div>

          {/* Recent Orders */}
          <div className="svc-dash-card">
            <div className="svc-dash-card-header">
              <h3>Recent Orders</h3>
            </div>
            <div className="svc-table-container">
              <table className="svc-dash-table">
                <thead>
                  <tr>
                    <th>Order ID</th>
                    <th>Service</th>
                    <th>Amount</th>
                    <th>Status</th>
                    <th>Date</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {recentOrders.map((o, i) => (
                    <tr key={i}>
                      <td className="svc-id-cell">{o.id}</td>
                      <td className="svc-bold-cell">{o.service}</td>
                      <td style={{ fontWeight: 600 }}>{o.amount}</td>
                      <td><SvcStatusBadge status={o.status} /></td>
                      <td className="svc-date-cell">{o.date}</td>
                      <td>
                        <button className="svc-btn-icon"><Eye size={14} /></button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="svc-dash-view-all">
              <button>View All Orders <ChevronRight size={14} /></button>
            </div>
          </div>
        </div>

        {/* ── Bottom Row ── */}
        <div className="svc-dash-bottom-row">

          {/* SLA Alerts Table */}
          <div className="svc-dash-card">
            <div className="svc-dash-card-header">
              <h3>SLA Alerts <span style={{ fontSize: 13, color: '#94a3b8', fontWeight: 400 }}>(This Month)</span></h3>
            </div>
            <div className="svc-table-container">
              <table className="svc-dash-table">
                <thead>
                  <tr>
                    <th>Alert ID</th>
                    <th>Service</th>
                    <th>Issue</th>
                    <th>Severity</th>
                    <th>Assignee</th>
                    <th>Date</th>
                  </tr>
                </thead>
                <tbody>
                  {slaAlerts.map((a, i) => (
                    <tr key={i}>
                      <td className="svc-id-cell">{a.id}</td>
                      <td className="svc-bold-cell">{a.service}</td>
                      <td style={{ color: '#64748b', fontSize: 12 }}>{a.issue}</td>
                      <td><SeverityBadge severity={a.severity} /></td>
                      <td>{a.assignee}</td>
                      <td className="svc-date-cell">{a.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="svc-dash-view-all">
              <button>View All Alerts <ChevronRight size={14} /></button>
            </div>
          </div>

          {/* Global Service Density */}
          <div className="svc-dash-card">
            <div className="svc-dash-card-header">
              <div>
                <h3>Global Service Density</h3>
                <p style={{ fontSize: 12, color: '#64748b', margin: '4px 0 0' }}>Real-time load balancing across regional hubs.</p>
              </div>
              <button onClick={() => addToast('Opening global network map...', 'info')} style={{ height: 32, padding: '0 12px', background: '#f8fafc', color: '#1e293b', border: '1px solid #e2e8f0', borderRadius: 6, fontSize: 12, fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6 }}>
                <Map size={14} /> View Map
              </button>
            </div>
            <div style={{ padding: '0 20px 20px', display: 'flex', flexDirection: 'column', gap: 12 }}>
              {[
                { name: 'North America', active: 842, total: 900, status: 'Healthy', color: '#22c55e' },
                { name: 'European Union', active: 615, total: 700, status: 'Warning', color: '#eab308' },
                { name: 'Asia Pacific', active: 420, total: 500, status: 'Healthy', color: '#22c55e' },
                { name: 'Latin America', active: 180, total: 300, status: 'Critical', color: '#ef4444' },
              ].map((r, i) => (
                <div key={i} style={{ background: '#f8fafc', borderRadius: 8, padding: '12px 14px', border: '1px solid #f1f5f9' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                    <span style={{ fontSize: 13, fontWeight: 600, color: '#1e293b' }}>{r.name}</span>
                    <span style={{ fontSize: 12, fontWeight: 600, color: r.color }}>{r.status}</span>
                  </div>
                  <div style={{ height: 6, background: '#e2e8f0', borderRadius: 3, overflow: 'hidden' }}>
                    <div style={{ width: `${(r.active / r.total) * 100}%`, height: '100%', background: r.color, borderRadius: 3 }} />
                  </div>
                  <span style={{ fontSize: 11, color: '#64748b', marginTop: 4, display: 'block' }}>{r.active} / {r.total} services active</span>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </AdminShell>
  );
}
