import React, { useState, useMemo } from 'react';
import toast from 'react-hot-toast';
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
  Eye, X,
  Star,
  ArrowUpRight,
  Map
} from 'lucide-react';
import { useToast } from '../../components/common/ToastNotification';
import AdminShell from '../../components/layouts/AdminShell';
import StatusBadge from '../../components/common/StatusBadge';
import Avatar from '../../components/common/Avatar';
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

  const topServicesColumns = [
    { header: 'Service', accessor: 'name', render: (row) => <span style={{fontWeight: 600, color: '#1e293b'}}>{row.name}</span> },
    { header: 'Category', accessor: 'category', render: (row) => <span className="premium-chip premium-chip-indigo">{row.category}</span> },
    { header: 'Revenue', accessor: 'revenue', render: (row) => <span style={{fontWeight: 600, color: '#16a34a'}}>{row.revenue}</span> },
    { header: 'Orders', accessor: 'orders' },
    { header: 'Rating', accessor: 'rating', render: (row) => (
      <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', fontSize: '13px', fontWeight: 600, color: '#1e293b' }}>
        <Star size={14} color="#f59e0b" fill="#f59e0b" /> {row.rating}
      </span>
    ) },
    { header: 'Status', accessor: 'status', render: (row) => <StatusBadge status={row.status} /> }
  ];

  const recentOrdersColumns = [
    { header: 'Order ID', accessor: 'id', render: (row) => <span style={{fontWeight: 600, color: '#4f46e5'}}>{row.id}</span> },
    { header: 'Service', accessor: 'service', render: (row) => <span style={{fontWeight: 600, color: '#1e293b'}}>{row.service}</span> },
    { header: 'Amount', accessor: 'amount', render: (row) => <span style={{fontWeight: 600}}>{row.amount}</span> },
    { header: 'Status', accessor: 'status', render: (row) => <StatusBadge status={row.status} /> },
    { header: 'Date', accessor: 'date' }
  ];

  const slaAlertsColumns = [
    { header: 'Alert ID', accessor: 'id', render: (row) => <span style={{fontWeight: 600, color: '#4f46e5'}}>{row.id}</span> },
    { header: 'Service', accessor: 'service', render: (row) => <span style={{fontWeight: 600, color: '#1e293b'}}>{row.service}</span> },
    { header: 'Issue', accessor: 'issue', render: (row) => <span style={{color: '#64748b', fontSize: '13px'}}>{row.issue}</span> },
    { header: 'Severity', accessor: 'severity', render: (row) => <StatusBadge status={row.severity} /> },
    { header: 'Assignee', accessor: 'assignee' },
    { header: 'Date', accessor: 'date' }
  ];

  const [filterTrigger, setFilterTrigger] = useState(0);

  const m = dateRange === 'This Quarter' ? 1 : dateRange === 'Last 30 Days' ? 0.3 : 3;

  const dynTopServices = useMemo(() => topServices.slice(0, Math.max(2, Math.floor(topServices.length * (m >= 1 ? 1 : m * 1.5)))), [m, filterTrigger]);
  
  const dynRecentOrders = useMemo(() => {
    let filtered = recentOrders.filter(t => {
      if (category !== 'All Categories' && t.service !== category) return false;
      if (statusFilter !== 'All Status' && t.status !== statusFilter) return false;
      return true;
    });
    return filtered.slice(0, Math.max(2, Math.floor(filtered.length * (m >= 1 ? 1 : m * 1.5))));
  }, [m, filterTrigger, category, statusFilter]);

  const dynSlaAlerts = useMemo(() => slaAlerts.slice(0, Math.max(2, Math.floor(slaAlerts.length * (m >= 1 ? 1 : m * 1.5)))), [m, filterTrigger]);

  const renderActions = (row) => (
    <div className="action-btn-group">
      <button className="action-icon-btn" title="View Details" onClick={() => toast.success('Viewing Details')}><Eye size={16} /></button>
    </div>
  );

  const handleRefresh = () => {
    setFilterTrigger(prev => prev + 1);
    toast.success('Dashboard data refreshed successfully.');
  };

  const handleExport = () => {
    toast.success('Services report exported successfully!');
  };


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
            <div className="svc-filter-select" style={{ position: 'relative' }}>
              <select value={dateRange} onChange={e => setDateRange(e.target.value)} style={{ appearance: 'none', width: '100%', height: '100%', position: 'absolute', opacity: 0, cursor: 'pointer', left: 0, top: 0 }}>
                <option>This Quarter</option>
                <option>Last 30 Days</option>
                <option>This Year</option>
              </select>
              <span>{dateRange}</span>
              <ChevronDown size={14} />
            </div>
          </div>
          <div className="svc-filter-group">
            <label>Category</label>
            <div className="svc-filter-select" style={{ position: 'relative' }}>
              <select value={category} onChange={e => setCategory(e.target.value)} style={{ appearance: 'none', width: '100%', height: '100%', position: 'absolute', opacity: 0, cursor: 'pointer', left: 0, top: 0 }}>
                <option>All Categories</option>
                <option>AC Services</option>
                <option>Plumbing</option>
                <option>Electrical</option>
                <option>Cleaning</option>
              </select>
              <span>{category}</span>
              <ChevronDown size={14} />
            </div>
          </div>
          <div className="svc-filter-group">
            <label>Region</label>
            <div className="svc-filter-select" style={{ position: 'relative' }}>
              <select value={region} onChange={e => setRegion(e.target.value)} style={{ appearance: 'none', width: '100%', height: '100%', position: 'absolute', opacity: 0, cursor: 'pointer', left: 0, top: 0 }}>
                <option>All Regions</option>
                <option>North</option>
                <option>South</option>
                <option>East</option>
                <option>West</option>
              </select>
              <span>{region}</span>
              <ChevronDown size={14} />
            </div>
          </div>
          <div className="svc-filter-group">
            <label>Status</label>
            <div className="svc-filter-select" style={{ position: 'relative' }}>
              <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)} style={{ appearance: 'none', width: '100%', height: '100%', position: 'absolute', opacity: 0, cursor: 'pointer', left: 0, top: 0 }}>
                <option>All Status</option>
                <option>Completed</option>
                <option>In Progress</option>
                <option>Cancelled</option>
              </select>
              <span>{statusFilter}</span>
              <ChevronDown size={14} />
            </div>
          </div>
          <div className="svc-filter-actions">
            <button className="svc-filter-btn-refresh" onClick={handleRefresh}><RefreshCw size={15} /> Refresh</button>
            <button className="svc-filter-btn-export" onClick={handleExport}><Download size={15} /> Export Report</button>
          </div>
        </div>

        {/* ── Stat Cards ── */}
        <div className="svc-dash-stats-grid">
          <StatCard
            icon={Layers} iconBg="#eff6ff" iconColor="#2563eb"
            value={Math.floor(248 * m)} label="Total Services" sublabel="Active offerings"
            trend="+12" trendUp={true} trendLabel="new this qtr"
          />
          <StatCard
            icon={DollarSign} iconBg="#f0fdf4" iconColor="#16a34a"
            value={`₹${(34.2 * m).toFixed(1)}L`} label="Service Revenue" sublabel="This Quarter"
            trend="+18.4%" trendUp={true} trendLabel="vs prev"
          />
          <StatCard
            icon={Clock} iconBg="#fef3c7" iconColor="#d97706"
            value={`${Math.floor(45 * (2 - (m > 1 ? 1 : m)))}m`} label="Avg SLA Time" sublabel="Resolution speed"
            trend="-12%" trendUp={true} trendLabel="improvement"
          />
          <StatCard
            icon={ThumbsUp} iconBg="#faf5ff" iconColor="#9333ea"
            value={(4.7).toFixed(1)} label="Avg Rating" sublabel="Customer satisfaction"
            trend="+0.2" trendUp={true} trendLabel="vs prev"
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

          {/* Top Performing Services */}
          <div className="admin-dash-card">
            <div className="admin-dash-card-header">
              <h3>Top Performing Services</h3>
            </div>
            <div style={{ overflowY: 'auto', maxHeight: '400px', width: '100%' }}>
            <table className="rev-dash-table" style={{ width: '100%', minWidth: '700px' }}>
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
                {dynTopServices.map((s, i) => (
                  <tr key={i}>
                    <td><span style={{fontWeight: 600, color: '#1e293b'}}>{s.name}</span></td>
                    <td><span className="premium-chip premium-chip-indigo">{s.category}</span></td>
                    <td><span style={{fontWeight: 600, color: '#16a34a'}}>{s.revenue}</span></td>
                    <td>{s.orders}</td>
                    <td>
                      <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', fontSize: '13px', fontWeight: 600, color: '#1e293b' }}>
                        <Star size={14} color="#f59e0b" fill="#f59e0b" /> {s.rating}
                      </span>
                    </td>
                    <td><StatusBadge status={s.status} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
            </div>
            <div className="rev-dash-view-all" style={{ paddingLeft: '16px', paddingRight: '16px' }}>
              <button onClick={() => { setViewAllModal('services'); setSelectedRow(null); }}>View All Services <ChevronRight size={14} /></button>
            </div>
          </div>

          {/* Recent Orders */}
          <div className="admin-dash-card">
            <div className="admin-dash-card-header">
              <h3>Recent Service Orders</h3>
            </div>
            <div style={{ overflowY: 'auto', maxHeight: '400px', width: '100%' }}>
            <table className="rev-dash-table" style={{ width: '100%', minWidth: '600px' }}>
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Service</th>
                  <th>Amount</th>
                  <th>Status</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {dynRecentOrders.map((o, i) => (
                  <tr key={i}>
                    <td><span style={{fontWeight: 600, color: '#4f46e5'}}>{o.id}</span></td>
                    <td><span style={{fontWeight: 600, color: '#1e293b'}}>{o.service}</span></td>
                    <td><span style={{fontWeight: 600}}>{o.amount}</span></td>
                    <td><StatusBadge status={o.status} /></td>
                    <td>{o.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            </div>
            <div className="rev-dash-view-all" style={{ paddingLeft: '16px', paddingRight: '16px' }}>
              <button onClick={() => { setViewAllModal('orders'); setSelectedRow(null); }}>View All Orders <ChevronRight size={14} /></button>
            </div>
          </div>

          {/* SLA Alerts Table */}
          <div className="admin-dash-card">
            <div className="admin-dash-card-header">
              <h3>SLA Alerts & Escalations</h3>
            </div>
            <div style={{ overflowY: 'auto', maxHeight: '400px', width: '100%' }}>
            <table className="rev-dash-table" style={{ width: '100%', minWidth: '700px' }}>
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
                {dynSlaAlerts.map((a, i) => (
                  <tr key={i}>
                    <td><span style={{fontWeight: 600, color: '#4f46e5'}}>{a.id}</span></td>
                    <td><span style={{fontWeight: 600, color: '#1e293b'}}>{a.service}</span></td>
                    <td><span style={{color: '#64748b', fontSize: '13px'}}>{a.issue}</span></td>
                    <td><StatusBadge status={a.severity} /></td>
                    <td>{a.assignee}</td>
                    <td>{a.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            </div>
            <div className="rev-dash-view-all" style={{ paddingLeft: '16px', paddingRight: '16px' }}>
              <button onClick={() => { setViewAllModal('escalations'); setSelectedRow(null); }}>View All Escalations <ChevronRight size={14} /></button>
            </div>
          </div>
        </div>

        {/* ── Bottom Row ── */}
        <div className="svc-dash-bottom-row">

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
                    viewAllModal === 'services' ? 'All Services' :
                    viewAllModal === 'orders' ? 'All Orders' :
                    viewAllModal === 'escalations' ? 'All Escalations' : 'Details'
                  )}
                </h3>
              </div>
              <button className="sd-modal-close" onClick={() => { setViewAllModal(null); setSelectedRow(null); }} style={{background:'transparent',border:'none',color:'#64748b',cursor:'pointer'}}><X size={18} /></button>
            </div>
            
            <div className="sd-modal-body" style={{padding:24,overflowY:'auto',flex:1}}>
              {selectedRow ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                  {Object.keys(selectedRow).map(k => {
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
                      if (viewAllModal === 'services') data = topServices;
                      else if (viewAllModal === 'orders') data = recentOrders;
                      else if (viewAllModal === 'escalations') data = slaAlerts;

                      if (!data.length) return <tbody><tr><td style={{padding: 20, textAlign: 'center'}}>No data available</td></tr></tbody>;

                      const keys = Object.keys(data[0]);
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
