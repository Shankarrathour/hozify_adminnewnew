import React, { useState } from 'react';
import {
  Layers,
  CheckCircle2,
  Clock,
  CalendarCheck,
  Star,
  TrendingUp,
  ChevronDown,
  RefreshCw,
  Download,
  ChevronRight,
  AlertTriangle,
  Info,
  XCircle,
  Eye,
  CheckCircle,
  AlertCircle
} from 'lucide-react';
import AdminShell from '../../components/layouts/AdminShell';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend
} from 'recharts';

/* ───────────────────── Mock Data ───────────────────── */

const bookingsChartData = [
  { category: 'AC', bookings: 12420 },
  { category: 'Plumbing', bookings: 9840 },
  { category: 'Electrical', bookings: 7280 },
  { category: 'Cleaning', bookings: 6840 },
  { category: 'Carpentry', bookings: 3240 },
  { category: 'Painting', bookings: 3220 },
];

const categoryData = [
  { name: 'AC', value: 31, color: '#3b82f6' },
  { name: 'Plumbing', value: 22, color: '#10b981' },
  { name: 'Electrical', value: 19, color: '#f59e0b' },
  { name: 'Cleaning', value: 16, color: '#8b5cf6' },
  { name: 'Others', value: 12, color: '#94a3b8' },
];

const statusData = [
  { name: 'Active', value: 83.5, color: '#22c55e' },
  { name: 'Pending', value: 6.7, color: '#f59e0b' },
  { name: 'Inactive', value: 7.2, color: '#ef4444' },
  { name: 'Suspended', value: 2.6, color: '#f97316' },
];

const topServices = [
  { name: 'AC Repair (Split/Window)', category: 'AC', bookings: 8420, revenue: '₹42,10,000', rating: 4.8, status: 'Active' },
  { name: 'Deep Home Cleaning', category: 'Cleaning', bookings: 6150, revenue: '₹36,90,000', rating: 4.6, status: 'Active' },
  { name: 'Plumbing Minor Fixes', category: 'Plumbing', bookings: 5400, revenue: '₹16,20,000', rating: 4.7, status: 'Active' },
  { name: 'Electrical Wiring', category: 'Electrical', bookings: 4200, revenue: '₹25,20,000', rating: 4.5, status: 'Active' },
  { name: 'Sofa Cleaning', category: 'Cleaning', bookings: 3800, revenue: '₹19,00,000', rating: 4.7, status: 'Active' },
  { name: 'Custom Carpentry', category: 'Carpentry', bookings: 2100, revenue: '₹31,50,000', rating: 4.9, status: 'Active' },
];

const recentApprovals = [
  { service: 'Premium AC Servicing', provider: 'Cooling Experts', category: 'AC', date: '20 Jul 2026', status: 'Pending' },
  { service: 'Pest Control (Termite)', provider: 'Safe Home Services', category: 'Cleaning', date: '19 Jul 2026', status: 'Approved' },
  { service: 'Water Purifier Repair', provider: 'Pure Water Co', category: 'Plumbing', date: '19 Jul 2026', status: 'Approved' },
  { service: 'Inverter Installation', provider: 'Volt Electric', category: 'Electrical', date: '18 Jul 2026', status: 'Rejected' },
  { service: 'Wooden Floor Polishing', provider: 'WoodCrafters', category: 'Carpentry', date: '18 Jul 2026', status: 'Pending' },
];

const performanceByCategory = [
  { category: 'AC', providers: 342, totalRevenue: '₹1,45,20,000', avgRating: 4.7, complaints: 14 },
  { category: 'Plumbing', providers: 415, totalRevenue: '₹88,50,000', avgRating: 4.5, complaints: 28 },
  { category: 'Electrical', providers: 290, totalRevenue: '₹76,40,000', avgRating: 4.6, complaints: 19 },
  { category: 'Cleaning', providers: 185, totalRevenue: '₹64,20,000', avgRating: 4.8, complaints: 8 },
];

const issuesList = [
  { id: '#ISS-892', type: 'Quality of Service', service: 'AC Repair', severity: 'High', date: '20 Jul 2026', status: 'Open' },
  { id: '#ISS-890', type: 'Overcharging', service: 'Plumbing Minor Fixes', severity: 'Medium', date: '19 Jul 2026', status: 'Resolved' },
  { id: '#ISS-888', type: 'No Show', service: 'Deep Home Cleaning', severity: 'High', date: '19 Jul 2026', status: 'Investigating' },
  { id: '#ISS-885', type: 'Rude Behavior', service: 'Electrical Wiring', severity: 'Low', date: '18 Jul 2026', status: 'Open' },
];

/* ───────────────────── Sub-components ───────────────────── */

function StatCard({ icon: Icon, iconBg, iconColor, value, label, trend, trendUp }) {
  return (
    <div className="svc-dash-stat-card">
      <div className="svc-dash-stat-icon" style={{ background: iconBg }}>
        <Icon size={22} color={iconColor} />
      </div>
      <div className="svc-dash-stat-body">
        <div className="svc-dash-stat-value">{value}</div>
        <div className="svc-dash-stat-label">{label}</div>
        {trend && (
          <div className="svc-dash-stat-trend">
            <TrendingUp size={14} color={trendUp ? "#16a34a" : "#ea580c"} style={{ marginRight: 4 }} />
            <span style={{ color: trendUp ? "#16a34a" : "#ea580c", fontWeight: 600 }}>{trend}</span>
          </div>
        )}
      </div>
    </div>
  );
}

function StatusBadge({ status }) {
  let cls = 'svc-status-default';
  if (status === 'Active' || status === 'Approved') cls = 'svc-status-active';
  if (status === 'Pending') cls = 'svc-status-pending';
  if (status === 'Inactive' || status === 'Rejected') cls = 'svc-status-inactive';
  return <span className={`svc-status-badge ${cls}`}>{status}</span>;
}

function SeverityBadge({ severity }) {
  let cls = 'svc-severity-low';
  if (severity === 'High') cls = 'svc-severity-high';
  if (severity === 'Medium') cls = 'svc-severity-medium';
  return <span className={`svc-severity-badge ${cls}`}>{severity}</span>;
}

function IssueStatusBadge({ status }) {
  let cls = 'svc-iss-status-open';
  if (status === 'Resolved') cls = 'svc-iss-status-resolved';
  if (status === 'Investigating') cls = 'svc-iss-status-investigating';
  return <span className={`svc-iss-status-badge ${cls}`}>{status}</span>;
}

function CustomTooltip({ active, payload, label }) {
  if (active && payload && payload.length) {
    return (
      <div style={{ background: '#1e293b', border: '1px solid #334155', borderRadius: 8, padding: '8px 14px', color: '#f1f5f9', fontSize: 13 }}>
        <p style={{ margin: 0, color: '#94a3b8', marginBottom: 4 }}>{label}</p>
        <p style={{ margin: 0, fontWeight: 600 }}>{payload[0].value} {payload[0].name}</p>
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

export default function ServicesOverviewDashboard() {
  const [dateRange, setDateRange] = useState('This Month');
  const [category, setCategory] = useState('All Categories');
  const [statusFilter, setStatusFilter] = useState('All Status');
  const [region, setRegion] = useState('All Regions');
  const [chartFreq, setChartFreq] = useState('This Month');

  return (
    <AdminShell
      activeTab="Service Management"
      pageTitle="Services Dashboard"
      pageSubtitle="Service Management & Performance Overview"
    >
      <div className="svc-dash-root">

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
            <label>Status</label>
            <div className="svc-filter-select">
              <span>{statusFilter}</span>
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
          <div className="svc-filter-actions">
            <button className="svc-filter-btn-refresh">
              <RefreshCw size={15} /> Refresh
            </button>
            <button className="svc-filter-btn-export">
              <Download size={15} /> Export Report
            </button>
          </div>
        </div>

        {/* ── Stat Cards Row ── */}
        <div className="svc-dash-stats-grid">
          <StatCard
            icon={Layers}
            iconBg="#eff6ff" iconColor="#2563eb"
            value="1,248" label="Total Services"
            trend="+8.4% up" trendUp={true}
          />
          <StatCard
            icon={CheckCircle2}
            iconBg="#f0fdf4" iconColor="#16a34a"
            value="1,042" label="Active Services"
            trend="+12.1% up" trendUp={true}
          />
          <StatCard
            icon={Clock}
            iconBg="#fff7ed" iconColor="#ea580c"
            value="84" label="Pending Approval"
            trend="+24.7% up" trendUp={true}
          />
          <StatCard
            icon={CalendarCheck}
            iconBg="#faf5ff" iconColor="#9333ea"
            value="42,840" label="Total Bookings"
            trend="+19.3% up" trendUp={true}
          />
          <StatCard
            icon={Star}
            iconBg="#fefce8" iconColor="#ca8a04"
            value="4.6★" label="Avg Rating"
            trend="+0.2 up" trendUp={true}
          />
          <StatCard
            icon={TrendingUp}
            iconBg="#eef2ff" iconColor="#4f46e5"
            value="₹48,24,310" label="Service Revenue"
            trend="+18.4% up" trendUp={true}
          />
        </div>

        {/* ── Charts Row ── */}
        <div className="svc-dash-charts-row">

          {/* Bookings Chart */}
          <div className="svc-dash-card svc-dash-bookings-chart">
            <div className="svc-dash-card-header">
              <div>
                <h3>Bookings by Category</h3>
              </div>
              <div className="svc-chart-freq">
                {['All', 'This Week', 'This Month'].map(f => (
                  <button
                    key={f}
                    className={`svc-chart-freq-btn ${chartFreq === f ? 'active' : ''}`}
                    onClick={() => setChartFreq(f)}
                  >
                    {f}
                  </button>
                ))}
              </div>
            </div>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={bookingsChartData} margin={{ top: 20, right: 10, left: -10, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
                <XAxis dataKey="category" tick={{ fontSize: 12, fill: '#64748b' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 12, fill: '#64748b' }} axisLine={false} tickLine={false} />
                <Tooltip content={<CustomTooltip />} cursor={{ fill: '#f1f5f9' }} />
                <Bar dataKey="bookings" name="Bookings" fill="#3b82f6" radius={[4, 4, 0, 0]} barSize={36} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Services by Category Donut */}
          <div className="svc-dash-card svc-dash-donut">
            <div className="svc-dash-card-header">
              <h3>Services by Category</h3>
            </div>
            <div className="svc-donut-content">
              <div className="svc-donut-wrap">
                <PieChart width={160} height={160}>
                  <Pie
                    data={categoryData}
                    cx={76}
                    cy={76}
                    innerRadius={50}
                    outerRadius={76}
                    dataKey="value"
                    stroke="none"
                  >
                    {categoryData.map((entry, i) => (
                      <Cell key={i} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </div>
              <DonutLegend data={categoryData} />
            </div>
          </div>

          {/* Service Status Donut */}
          <div className="svc-dash-card svc-dash-donut">
            <div className="svc-dash-card-header">
              <h3>Service Status</h3>
            </div>
            <div className="svc-donut-content">
              <div className="svc-donut-wrap">
                <PieChart width={160} height={160}>
                  <Pie
                    data={statusData}
                    cx={76}
                    cy={76}
                    innerRadius={50}
                    outerRadius={76}
                    dataKey="value"
                    stroke="none"
                  >
                    {statusData.map((entry, i) => (
                      <Cell key={i} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </div>
              <DonutLegend data={statusData} />
            </div>
          </div>
        </div>

        {/* ── Mid Row (2 cols) ── */}
        <div className="svc-dash-mid-row">

          {/* Top Services Table */}
          <div className="svc-dash-card svc-dash-top-services">
            <div className="svc-dash-card-header">
              <h3>Top Performing Services</h3>
            </div>
            <div className="svc-table-container">
              <table className="svc-dash-table">
                <thead>
                  <tr>
                    <th>Service Name</th>
                    <th>Category</th>
                    <th>Bookings</th>
                    <th>Revenue</th>
                    <th>Rating</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {topServices.map((s, i) => (
                    <tr key={i}>
                      <td className="svc-bold-cell">{s.name}</td>
                      <td>{s.category}</td>
                      <td>{s.bookings.toLocaleString()}</td>
                      <td className="svc-revenue-cell">{s.revenue}</td>
                      <td><span className="svc-rating"><Star size={12} fill="#ca8a04" color="#ca8a04" /> {s.rating}</span></td>
                      <td><StatusBadge status={s.status} /></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="svc-dash-view-all">
              <button>View All Services <ChevronRight size={14} /></button>
            </div>
          </div>

          {/* Recent Approvals Table */}
          <div className="svc-dash-card svc-dash-recent-approvals">
            <div className="svc-dash-card-header">
              <h3>Recent Service Approvals</h3>
            </div>
            <div className="svc-table-container">
              <table className="svc-dash-table">
                <thead>
                  <tr>
                    <th>Service Name</th>
                    <th>Provider</th>
                    <th>Date</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {recentApprovals.map((a, i) => (
                    <tr key={i}>
                      <td className="svc-bold-cell">{a.service}</td>
                      <td>{a.provider}</td>
                      <td className="svc-date-cell">{a.date}</td>
                      <td><StatusBadge status={a.status} /></td>
                      <td>
                        <button className="svc-btn-icon"><Eye size={16} /></button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="svc-dash-view-all">
              <button>View All Requests <ChevronRight size={14} /></button>
            </div>
          </div>
        </div>

        {/* ── Bottom Row (2 cols) ── */}
        <div className="svc-dash-bottom-row">
          
          {/* Service Performance Table */}
          <div className="svc-dash-card svc-dash-perf">
            <div className="svc-dash-card-header">
              <h3>Performance by Category</h3>
            </div>
            <div className="svc-table-container">
              <table className="svc-dash-table">
                <thead>
                  <tr>
                    <th>Category</th>
                    <th>Providers</th>
                    <th>Total Revenue</th>
                    <th>Avg Rating</th>
                    <th>Complaints</th>
                  </tr>
                </thead>
                <tbody>
                  {performanceByCategory.map((p, i) => (
                    <tr key={i}>
                      <td className="svc-bold-cell">{p.category}</td>
                      <td>{p.providers}</td>
                      <td className="svc-revenue-cell">{p.totalRevenue}</td>
                      <td><span className="svc-rating"><Star size={12} fill="#ca8a04" color="#ca8a04" /> {p.avgRating}</span></td>
                      <td>{p.complaints}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="svc-dash-view-all">
              <button>Detailed Report <ChevronRight size={14} /></button>
            </div>
          </div>

          {/* Service Issues Table */}
          <div className="svc-dash-card svc-dash-issues">
            <div className="svc-dash-card-header">
              <h3>Service Issues & Complaints</h3>
            </div>
            <div className="svc-table-container">
              <table className="svc-dash-table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Issue Type</th>
                    <th>Service</th>
                    <th>Severity</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {issuesList.map((iss, i) => (
                    <tr key={i}>
                      <td className="svc-id-cell">{iss.id}</td>
                      <td className="svc-bold-cell">{iss.type}</td>
                      <td>{iss.service}</td>
                      <td><SeverityBadge severity={iss.severity} /></td>
                      <td><IssueStatusBadge status={iss.status} /></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="svc-dash-view-all">
              <button>View All Issues <ChevronRight size={14} /></button>
            </div>
          </div>

        </div>

      </div>
    </AdminShell>
  );
}
