import React, { useState, useMemo } from 'react';
import toast from 'react-hot-toast';
import {
  FileText,
  DivideCircle,
  AlertTriangle,
  ShieldCheck,
  TrendingUp,
  TrendingDown,
  RefreshCw,
  Download,
  ChevronDown,
  ChevronRight,
  Eye,
  FileCheck
} from 'lucide-react';
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
import AdminShell from '../../components/layouts/AdminShell';
import StatusBadge from '../../components/common/StatusBadge';
import Avatar from '../../components/common/Avatar';

/* ───────────────────── Mock Data ───────────────────── */

const gstCollectionTrend = [
  { month: 'Apr', cgst: 42000, sgst: 42000 },
  { month: 'May', cgst: 53500, sgst: 53500 },
  { month: 'Jun', cgst: 48000, sgst: 48000 },
  { month: 'Jul', cgst: 61000, sgst: 61000 },
  { month: 'Aug', cgst: 59000, sgst: 59000 },
  { month: 'Sep', cgst: 65000, sgst: 65000 },
  { month: 'Oct', cgst: 72000, sgst: 72000 },
  { month: 'Nov', cgst: 68000, sgst: 68000 },
  { month: 'Dec', cgst: 85000, sgst: 85000 },
  { month: 'Jan', cgst: 79000, sgst: 79000 },
  { month: 'Feb', cgst: 82000, sgst: 82000 },
  { month: 'Mar', cgst: 95000, sgst: 95000 },
];

const gstServiceData = [
  { name: 'AC Services', value: 38, color: '#3b82f6' },
  { name: 'Plumbing', value: 24, color: '#8b5cf6' },
  { name: 'Electrical', value: 18, color: '#ec4899' },
  { name: 'Cleaning', value: 12, color: '#f59e0b' },
  { name: 'Others', value: 8, color: '#64748b' },
];

const filingStatusData = [
  { name: 'Filed on Time', value: 74, color: '#10b981' },
  { name: 'Filed Late', value: 14, color: '#f59e0b' },
  { name: 'Pending', value: 8, color: '#ef4444' },
  { name: 'Exempted', value: 4, color: '#94a3b8' },
];

const gstRateSlabs = [
  { hsn: '9987', category: 'AC Services', rate: '18%', cgst: '9%', sgst: '9%', taxable: '₹4,50,000', amount: '₹81,000' },
  { hsn: '9954', category: 'Plumbing', rate: '18%', cgst: '9%', sgst: '9%', taxable: '₹2,80,000', amount: '₹50,400' },
  { hsn: '9954', category: 'Electrical', rate: '18%', cgst: '9%', sgst: '9%', taxable: '₹2,10,000', amount: '₹37,800' },
  { hsn: '9985', category: 'Cleaning', rate: '18%', cgst: '9%', sgst: '9%', taxable: '₹1,40,000', amount: '₹25,200' },
  { hsn: '9987', category: 'Appliances', rate: '18%', cgst: '9%', sgst: '9%', taxable: '₹95,000', amount: '₹17,100' },
];

const recentFilings = [
  { gstin: '29ABCDE1234F1Z5', partner: 'Cooling Experts', returnType: 'GSTR-3B', period: 'Apr 2026', status: 'Filed', date: '18 May 2026' },
  { gstin: '29FGHIJ5678K1Z2', partner: 'A1 Plumbing', returnType: 'GSTR-1', period: 'Apr 2026', status: 'Filed', date: '11 May 2026' },
  { gstin: '29KLMNO9012P1Z8', partner: 'Spark Electric', returnType: 'GSTR-3B', period: 'Apr 2026', status: 'Pending', date: '-' },
  { gstin: '29PQRST3456U1Z4', partner: 'Deep Cleaners', returnType: 'GSTR-1', period: 'May 2026', status: 'Late Filed', date: '22 May 2026' },
];

const partnerCollection = [
  { partner: 'Cooling Experts', initials: 'CE', category: 'AC Services', taxable: '₹1,25,000', cgst: '₹11,250', sgst: '₹11,250', total: '₹22,500' },
  { partner: 'Urban Plumbers', initials: 'UP', category: 'Plumbing', taxable: '₹85,000', cgst: '₹7,650', sgst: '₹7,650', total: '₹15,300' },
  { partner: 'Pro Electricians', initials: 'PE', category: 'Electrical', taxable: '₹72,000', cgst: '₹6,480', sgst: '₹6,480', total: '₹12,960' },
  { partner: 'Shine Cleaners', initials: 'SC', category: 'Cleaning', taxable: '₹54,000', cgst: '₹4,860', sgst: '₹4,860', total: '₹9,720' },
];

const reconciliationIssues = [
  { invoice: 'INV-2026-401', partner: 'Cooling Experts', mismatch: 'GSTR-1 vs GSTR-3B', diffAmount: '₹4,500', priority: 'High' },
  { invoice: 'INV-2026-382', partner: 'A1 Plumbing', mismatch: 'ITC Claim', diffAmount: '₹1,200', priority: 'Medium' },
  { invoice: 'INV-2026-415', partner: 'Spark Electric', mismatch: 'Tax Rate (18% vs 12%)', diffAmount: '₹3,600', priority: 'High' },
  { invoice: 'INV-2026-290', partner: 'FixIt All', mismatch: 'Late Fee Missing', diffAmount: '₹500', priority: 'Low' },
];

/* ───────────────────── Sub-components ───────────────────── */

function StatCard({ icon: Icon, iconBg, iconColor, value, label, sublabel, trend, trendUp, trendLabel }) {
  return (
    <div className="gst-dash-stat-card">
      <div className="gst-dash-stat-icon" style={{ background: iconBg }}>
        <Icon size={22} color={iconColor} />
      </div>
      <div className="gst-dash-stat-body">
        <div className="gst-dash-stat-value">{value}</div>
        <div className="gst-dash-stat-label">{label}</div>
        {sublabel && <div style={{ fontSize: '11px', color: '#94a3b8', fontWeight: 400, marginTop: 2 }}>{sublabel}</div>}
        {trend && (
          <div className={`gst-dash-stat-trend ${trendUp ? 'up' : 'down'}`}>
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
        {payload.map((p, i) => (
          <p key={i} style={{ margin: 0, fontWeight: 600, color: p.color }}>
            {p.name}: ₹{p.value.toLocaleString()}
          </p>
        ))}
      </div>
    );
  }
  return null;
}

function DonutLegend({ data }) {
  return (
    <div className="gst-donut-legend">
      {data.map(d => (
        <div key={d.name} className="gst-donut-legend-item">
          <span className="gst-donut-legend-dot" style={{ background: d.color }} />
          <span className="gst-donut-legend-name">{d.name}</span>
          <span className="gst-donut-legend-val">{d.value}%</span>
        </div>
      ))}
    </div>
  );
}

/* ───────────────────── Main Component ───────────────────── */

export default function GSTDashboard() {
  const [fy, setFy] = useState('FY 2025-26');
  const [month, setMonth] = useState('May 2026');
  const [category, setCategory] = useState('All Categories');
  const [filingStatus, setFilingStatus] = useState('All Statuses');

  const totalGST = gstCollectionTrend.reduce((s, d) => s + d.cgst + d.sgst, 0);

  const rateSlabsColumns = [
    { header: 'HSN Code', accessor: 'hsn', render: (row) => <span style={{fontFamily: 'monospace', fontWeight: 600, color: '#4f46e5'}}>{row.hsn}</span> },
    { header: 'Category', accessor: 'category', render: (row) => <span style={{fontWeight: 500}}>{row.category}</span> },
    { header: 'Rate', accessor: 'rate', render: (row) => <span className="premium-chip">{row.rate}</span> },
    { header: 'CGST', accessor: 'cgst' },
    { header: 'SGST', accessor: 'sgst' },
    { header: 'Taxable Value', accessor: 'taxable' },
    { header: 'GST Amount', accessor: 'amount', render: (row) => <span style={{fontWeight: 600}}>{row.amount}</span> }
  ];

  const filingsColumns = [
    { header: 'GSTIN', accessor: 'gstin', render: (row) => <span style={{fontWeight: 600, color: '#4f46e5'}}>{row.gstin.substring(0, 12)}...</span> },
    { header: 'Partner', accessor: 'partner', render: (row) => <span style={{fontWeight: 500}}>{row.partner}</span> },
    { header: 'Type', accessor: 'returnType', render: (row) => <span className="premium-chip premium-chip-indigo">{row.returnType}</span> },
    { header: 'Period', accessor: 'period' },
    { header: 'Date', accessor: 'date' },
    { header: 'Status', accessor: 'status', render: (row) => <StatusBadge status={row.status} /> }
  ];

  const collectionColumns = [
    { header: 'Partner Name', accessor: 'partner', render: (row) => (
      <div className="avatar-cell">
        <Avatar name={row.partner} size={32} />
        <span className="avatar-cell-name">{row.partner}</span>
      </div>
    ) },
    { header: 'Category', accessor: 'category', render: (row) => <span className="premium-chip">{row.category}</span> },
    { header: 'Taxable Value', accessor: 'taxable', render: (row) => <span style={{fontWeight: 600}}>{row.taxable}</span> },
    { header: 'CGST', accessor: 'cgst', render: (row) => <span style={{color: '#4f46e5', fontWeight: 600}}>{row.cgst}</span> },
    { header: 'SGST', accessor: 'sgst', render: (row) => <span style={{color: '#9333ea', fontWeight: 600}}>{row.sgst}</span> },
    { header: 'Total GST', accessor: 'total', render: (row) => <span style={{fontWeight: 600}}>{row.total}</span> }
  ];

  const reconciliationColumns = [
    { header: 'Invoice No.', accessor: 'invoice', render: (row) => <span style={{fontWeight: 600, color: '#4f46e5'}}>{row.invoice}</span> },
    { header: 'Partner', accessor: 'partner', render: (row) => <span style={{fontWeight: 500}}>{row.partner}</span> },
    { header: 'Mismatch Type', accessor: 'mismatch', render: (row) => <span style={{color: '#64748b', fontSize: '12px'}}>{row.mismatch}</span> },
    { header: 'Diff Amount', accessor: 'diffAmount', render: (row) => <span style={{fontWeight: 600}}>{row.diffAmount}</span> },
    { header: 'Priority', accessor: 'priority', render: (row) => <StatusBadge status={row.priority} /> }
  ];

  const [filterTrigger, setFilterTrigger] = useState(0);

  const m = month === 'Apr 2026' ? 0.8 : month === 'Mar 2026' ? 1.2 : 1;

  const dynRateSlabs = useMemo(() => gstRateSlabs.slice(0, Math.max(2, Math.floor(gstRateSlabs.length * (m >= 1 ? 1 : m * 1.5)))), [m, filterTrigger]);
  
  const dynRecentFilings = useMemo(() => {
    let filtered = recentFilings.filter(t => {
      if (filingStatus !== 'All Statuses' && t.status !== filingStatus) return false;
      return true;
    });
    return filtered.slice(0, Math.max(2, Math.floor(filtered.length * (m >= 1 ? 1 : m * 1.5))));
  }, [m, filterTrigger, filingStatus]);

  const dynPartnerCollection = useMemo(() => {
    let filtered = partnerCollection.filter(t => {
      if (category !== 'All Categories' && t.category !== category) return false;
      return true;
    });
    return filtered.slice(0, Math.max(2, Math.floor(filtered.length * (m >= 1 ? 1 : m * 1.5))));
  }, [m, filterTrigger, category]);

  const dynReconciliationIssues = useMemo(() => reconciliationIssues.slice(0, Math.max(2, Math.floor(reconciliationIssues.length * (m >= 1 ? 1 : m * 1.5)))), [m, filterTrigger]);

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
    toast.success('GST report exported successfully!');
  };


  return (
    <AdminShell
      activeTab="GST Management"
      pageTitle="GST Dashboard"
      pageSubtitle="GST Collection, Filing & Compliance Overview"
    >
      <div className="gst-dash-root">

        {/* ── Header Filters ── */}
        <div className="gst-dash-filters">
          <div className="gst-filter-group">
            <label>Financial Year</label>
            <div className="gst-filter-select" style={{ position: 'relative' }}>
              <select value={fy} onChange={e => setFy(e.target.value)} style={{ appearance: 'none', width: '100%', height: '100%', position: 'absolute', opacity: 0, cursor: 'pointer', left: 0, top: 0 }}>
                <option>FY 2025-26</option>
                <option>FY 2024-25</option>
              </select>
              <span>{fy}</span>
              <ChevronDown size={14} />
            </div>
          </div>
          <div className="gst-filter-group">
            <label>Month</label>
            <div className="gst-filter-select" style={{ position: 'relative' }}>
              <select value={month} onChange={e => setMonth(e.target.value)} style={{ appearance: 'none', width: '100%', height: '100%', position: 'absolute', opacity: 0, cursor: 'pointer', left: 0, top: 0 }}>
                <option>May 2026</option>
                <option>Apr 2026</option>
                <option>Mar 2026</option>
              </select>
              <span>{month}</span>
              <ChevronDown size={14} />
            </div>
          </div>
          <div className="gst-filter-group">
            <label>GST Category</label>
            <div className="gst-filter-select" style={{ position: 'relative' }}>
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
          <div className="gst-filter-group">
            <label>Filing Status</label>
            <div className="gst-filter-select" style={{ position: 'relative' }}>
              <select value={filingStatus} onChange={e => setFilingStatus(e.target.value)} style={{ appearance: 'none', width: '100%', height: '100%', position: 'absolute', opacity: 0, cursor: 'pointer', left: 0, top: 0 }}>
                <option>All Statuses</option>
                <option>Filed</option>
                <option>Pending</option>
                <option>Late Filed</option>
              </select>
              <span>{filingStatus}</span>
              <ChevronDown size={14} />
            </div>
          </div>
          <div className="gst-filter-actions">
            <button className="gst-filter-btn-refresh" onClick={handleRefresh}>
              <RefreshCw size={15} /> Refresh
            </button>
            <button className="gst-filter-btn-export" onClick={handleExport}>
              <Download size={15} /> Export Report
            </button>
          </div>
        </div>

        {/* ── Stat Cards Row ── */}
        <div className="gst-dash-stats-grid">
          <StatCard
            icon={FileText} iconBg="#eff6ff" iconColor="#2563eb"
            value="₹12,84,520" label="Total GST Collected" sublabel="This Month"
            trend="+14.2%" trendUp={true} trendLabel="vs Apr 2026"
          />
          <StatCard
            icon={DivideCircle} iconBg="#eef2ff" iconColor="#4f46e5"
            value={`₹${(1.24 * m).toFixed(2)}Cr`} label="Total GST Collected" sublabel="This Month"
            trend="+12%" trendUp={true} trendLabel="vs prev month"
          />
          <StatCard
            icon={DivideCircle} iconBg="#f0fdf4" iconColor="#16a34a"
            value="89%" label="Filing Compliance" sublabel="Partners filed on time"
            trend="+5%" trendUp={true} trendLabel="vs prev month"
          />
          <StatCard
            icon={AlertTriangle} iconBg="#fff1f2" iconColor="#e11d48"
            value={Math.floor(14 * m)} label="Mismatches Found" sublabel="GSTR-1 vs 3B"
            trend="-3" trendUp={false} trendLabel="vs prev month"
          />
          <StatCard
            icon={ShieldCheck} iconBg="#faf5ff" iconColor="#9333ea"
            value={`₹${(18.5 * m).toFixed(1)}L`} label="Eligible ITC" sublabel="Input Tax Credit"
            trend="+8%" trendUp={true} trendLabel="vs prev month"
          />
        </div>

        {/* ── Charts Row ── */}
        <div className="gst-dash-charts-row">

          {/* Collection Trend Chart */}
          <div className="gst-dash-card gst-dash-trend-chart">
            <div className="gst-dash-card-header">
              <h3>GST Collection Trend</h3>
            </div>
            <ResponsiveContainer width="100%" height={220}>
              <AreaChart data={gstCollectionTrend} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="cgstGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#4f46e5" stopOpacity={0.02} />
                  </linearGradient>
                  <linearGradient id="sgstGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#9333ea" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#9333ea" stopOpacity={0.02} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
                <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                <Tooltip content={<CustomTooltip />} />
                <Area type="monotone" dataKey="cgst" stroke="#4f46e5" strokeWidth={2} fill="url(#cgstGrad)" dot={false} name="CGST" />
                <Area type="monotone" dataKey="sgst" stroke="#9333ea" strokeWidth={2} fill="url(#sgstGrad)" dot={false} name="SGST" />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Service Category Donut */}
          <div className="gst-dash-card gst-dash-donut">
            <div className="gst-dash-card-header">
              <h3>GST by Service</h3>
            </div>
            <div className="gst-donut-content">
              <div className="gst-donut-wrap">
                <PieChart width={160} height={160}>
                  <Pie data={gstServiceData} cx={75} cy={75} innerRadius={50} outerRadius={72} dataKey="value" stroke="none">
                    {gstServiceData.map((entry, i) => <Cell key={i} fill={entry.color} />)}
                  </Pie>
                </PieChart>
                <div style={{ position: 'absolute', textAlign: 'center', pointerEvents: 'none' }}>
                  <span style={{ display: 'block', fontSize: '18px', fontWeight: 800, color: '#1e293b' }}>38%</span>
                  <span style={{ display: 'block', fontSize: '10px', color: '#64748b', fontWeight: 600 }}>AC Top</span>
                </div>
              </div>
              <DonutLegend data={gstServiceData} />
            </div>
          </div>

          {/* Filing Status Donut */}
          <div className="gst-dash-card gst-dash-donut">
            <div className="gst-dash-card-header">
              <h3>Filing Status</h3>
            </div>
            <div className="gst-donut-content">
              <div className="gst-donut-wrap">
                <PieChart width={160} height={160}>
                  <Pie data={filingStatusData} cx={75} cy={75} innerRadius={50} outerRadius={72} dataKey="value" stroke="none">
                    {filingStatusData.map((entry, i) => <Cell key={i} fill={entry.color} />)}
                  </Pie>
                </PieChart>
                <div style={{ position: 'absolute', textAlign: 'center', pointerEvents: 'none' }}>
                  <span style={{ display: 'block', fontSize: '18px', fontWeight: 800, color: '#1e293b' }}>74%</span>
                  <span style={{ display: 'block', fontSize: '10px', color: '#64748b', fontWeight: 600 }}>On Time</span>
                </div>
              </div>
              <DonutLegend data={filingStatusData} />
            </div>
          </div>
        </div>

        {/* ── Mid Row ── */}
        <div className="gst-dash-mid-row">
          <div className="admin-dash-card">
            <div className="admin-dash-card-header">
              <h3>GST Rate Slabs Overview</h3>
            </div>
            <div style={{ overflowX: 'auto', width: '100%' }}>
            <table className="rev-dash-table" style={{ width: '100%', minWidth: '700px' }}>
              <thead>
                <tr>
                  <th>HSN Code</th>
                  <th>Category</th>
                  <th>Rate</th>
                  <th>CGST</th>
                  <th>SGST</th>
                  <th>Taxable Value</th>
                  <th>GST Amount</th>
                </tr>
              </thead>
              <tbody>
                {dynRateSlabs.map((r, i) => (
                  <tr key={i}>
                    <td><span style={{fontFamily: 'monospace', fontWeight: 600, color: '#4f46e5'}}>{r.hsn}</span></td>
                    <td><span style={{fontWeight: 500}}>{r.category}</span></td>
                    <td><span className="premium-chip">{r.rate}</span></td>
                    <td>{r.cgst}</td>
                    <td>{r.sgst}</td>
                    <td>{r.taxable}</td>
                    <td><span style={{fontWeight: 600}}>{r.amount}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
            </div>
            <div className="rev-dash-view-all" style={{ paddingLeft: '16px', paddingRight: '16px' }}>
              <button onClick={() => toast.success('Navigating to Rate Slabs')}>View All Rate Slabs <ChevronRight size={14} /></button>
            </div>
          </div>

          <div className="admin-dash-card">
            <div className="admin-dash-card-header">
              <h3>Recent GST Filings</h3>
            </div>
            <div style={{ overflowX: 'auto', width: '100%' }}>
            <table className="rev-dash-table" style={{ width: '100%', minWidth: '600px' }}>
              <thead>
                <tr>
                  <th>GSTIN</th>
                  <th>Partner</th>
                  <th>Type</th>
                  <th>Period</th>
                  <th>Date</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {dynRecentFilings.map((f, i) => (
                  <tr key={i}>
                    <td><span style={{fontWeight: 600, color: '#4f46e5'}}>{f.gstin.substring(0, 12)}...</span></td>
                    <td><span style={{fontWeight: 500}}>{f.partner}</span></td>
                    <td><span className="premium-chip premium-chip-indigo">{f.returnType}</span></td>
                    <td>{f.period}</td>
                    <td>{f.date}</td>
                    <td><StatusBadge status={f.status} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
            </div>
            <div className="rev-dash-view-all" style={{ paddingLeft: '16px', paddingRight: '16px' }}>
              <button onClick={() => toast.success('Navigating to Filings')}>View All Filings <ChevronRight size={14} /></button>
            </div>
          </div>
        </div>

        {/* ── Bottom Row ── */}
        <div className="gst-dash-bottom-row">

          <div className="admin-dash-card">
            <div className="admin-dash-card-header">
              <h3>Partner Wise GST Collection</h3>
            </div>
            <div style={{ overflowX: 'auto', width: '100%' }}>
            <table className="rev-dash-table" style={{ width: '100%', minWidth: '800px' }}>
              <thead>
                <tr>
                  <th>Partner Name</th>
                  <th>Category</th>
                  <th>Taxable Value</th>
                  <th>CGST</th>
                  <th>SGST</th>
                  <th>Total GST</th>
                </tr>
              </thead>
              <tbody>
                {dynPartnerCollection.map((p, i) => (
                  <tr key={i}>
                    <td>
                      <div className="avatar-cell">
                        <Avatar name={p.partner} size={32} />
                        <span className="avatar-cell-name">{p.partner}</span>
                      </div>
                    </td>
                    <td><span className="premium-chip">{p.category}</span></td>
                    <td><span style={{fontWeight: 600}}>{p.taxable}</span></td>
                    <td><span style={{color: '#4f46e5', fontWeight: 600}}>{p.cgst}</span></td>
                    <td><span style={{color: '#9333ea', fontWeight: 600}}>{p.sgst}</span></td>
                    <td><span style={{fontWeight: 600}}>{p.total}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
            </div>
            <div className="rev-dash-view-all" style={{ paddingLeft: '16px', paddingRight: '16px' }}>
              <button onClick={() => toast.success('Navigating to Collections')}>View All Collections <ChevronRight size={14} /></button>
            </div>
          </div>

          <div className="admin-dash-card">
            <div className="admin-dash-card-header">
              <h3>ITC Reconciliation Issues</h3>
            </div>
            <div style={{ overflowX: 'auto', width: '100%' }}>
            <table className="rev-dash-table" style={{ width: '100%', minWidth: '600px' }}>
              <thead>
                <tr>
                  <th>Invoice No.</th>
                  <th>Partner</th>
                  <th>Mismatch Type</th>
                  <th>Diff Amount</th>
                  <th>Priority</th>
                </tr>
              </thead>
              <tbody>
                {dynReconciliationIssues.map((r, i) => (
                  <tr key={i}>
                    <td><span style={{fontWeight: 600, color: '#4f46e5'}}>{r.invoice}</span></td>
                    <td><span style={{fontWeight: 500}}>{r.partner}</span></td>
                    <td><span style={{color: '#64748b', fontSize: '12px'}}>{r.mismatch}</span></td>
                    <td><span style={{fontWeight: 600}}>{r.diffAmount}</span></td>
                    <td><StatusBadge status={r.priority} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
            </div>
            <div className="rev-dash-view-all" style={{ paddingLeft: '16px', paddingRight: '16px' }}>
              <button onClick={() => toast.success('Navigating to ITC Issues')}>View All Issues <ChevronRight size={14} /></button>
            </div>
          </div>
        </div>

      </div>
    </AdminShell>
  );
}
