import React, { useState } from 'react';
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

function StatusBadge({ status }) {
  let cls = 'gst-status-default';
  if (status === 'Filed' || status === 'Filed on Time') cls = 'gst-status-success';
  if (status === 'Pending') cls = 'gst-status-danger';
  if (status === 'Late Filed' || status === 'Filed Late') cls = 'gst-status-warning';
  return <span className={`gst-status-badge ${cls}`}>{status}</span>;
}

function PriorityBadge({ priority }) {
  const cls = priority === 'High' ? 'alert-high' : priority === 'Medium' ? 'alert-medium' : 'alert-low';
  return <span className={`gst-priority-badge ${cls}`}>{priority}</span>;
}

function Avatar({ initials }) {
  return (
    <div style={{ width: 28, height: 28, borderRadius: '50%', background: 'linear-gradient(135deg, #4f46e5, #818cf8)', color: '#fff', fontSize: 10, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
      {initials}
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
            <div className="gst-filter-select">
              <span>{fy}</span>
              <ChevronDown size={14} />
            </div>
          </div>
          <div className="gst-filter-group">
            <label>Month</label>
            <div className="gst-filter-select">
              <span>{month}</span>
              <ChevronDown size={14} />
            </div>
          </div>
          <div className="gst-filter-group">
            <label>GST Category</label>
            <div className="gst-filter-select">
              <span>{category}</span>
              <ChevronDown size={14} />
            </div>
          </div>
          <div className="gst-filter-group">
            <label>Filing Status</label>
            <div className="gst-filter-select">
              <span>{filingStatus}</span>
              <ChevronDown size={14} />
            </div>
          </div>
          <div className="gst-filter-actions">
            <button className="gst-filter-btn-refresh">
              <RefreshCw size={15} /> Refresh
            </button>
            <button className="gst-filter-btn-export">
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
            value="₹6,42,260" label="CGST Collected" sublabel="This Month"
            trend="+14.2%" trendUp={true} trendLabel="vs Apr 2026"
          />
          <StatCard
            icon={DivideCircle} iconBg="#faf5ff" iconColor="#9333ea"
            value="₹6,42,260" label="SGST Collected" sublabel="This Month"
            trend="+14.2%" trendUp={true} trendLabel="vs Apr 2026"
          />
          <StatCard
            icon={AlertTriangle} iconBg="#fff7ed" iconColor="#ea580c"
            value="14" label="GST Filings Due" sublabel="Upcoming"
            trend="-6" trendUp={false} trendLabel="vs Apr 2026"
          />
          <StatCard
            icon={AlertTriangle} iconBg="#fff1f2" iconColor="#e11d48"
            value="₹2,14,180" label="Pending Reconciliation" sublabel="Unresolved"
            trend="-18.4%" trendUp={false} trendLabel="vs Apr 2026"
          />
          <StatCard
            icon={ShieldCheck} iconBg="#f0fdf4" iconColor="#16a34a"
            value="96.8%" label="Compliance Rate" sublabel="This Quarter"
            trend="+1.2%" trendUp={true} trendLabel="vs Apr 2026"
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

          {/* Rate Slabs Table */}
          <div className="gst-dash-card">
            <div className="gst-dash-card-header">
              <h3>GST Rate Slabs Overview</h3>
            </div>
            <table className="gst-dash-table">
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
                {gstRateSlabs.map((row, i) => (
                  <tr key={i}>
                    <td style={{ fontFamily: 'monospace', fontWeight: 600, color: '#4f46e5' }}>{row.hsn}</td>
                    <td style={{ fontWeight: 500 }}>{row.category}</td>
                    <td><span className="gst-rate-badge">{row.rate}</span></td>
                    <td>{row.cgst}</td>
                    <td>{row.sgst}</td>
                    <td>{row.taxable}</td>
                    <td className="gst-amount-cell">{row.amount}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div style={{ padding: '12px 16px', borderTop: '1px solid #f1f5f9' }}>
              <button style={{ background: 'none', border: 'none', color: '#4f46e5', fontWeight: 600, fontSize: 13, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 4 }}>
                View All Slabs <ChevronRight size={14} />
              </button>
            </div>
          </div>

          {/* Recent Filings Table */}
          <div className="gst-dash-card">
            <div className="gst-dash-card-header">
              <h3>Recent GST Filings</h3>
            </div>
            <table className="gst-dash-table">
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
                {recentFilings.map((row, i) => (
                  <tr key={i}>
                    <td className="gstin-cell">{row.gstin.substring(0, 12)}...</td>
                    <td style={{ fontWeight: 500 }}>{row.partner}</td>
                    <td>
                      <span style={{ fontFamily: 'monospace', fontSize: 12, fontWeight: 600, color: '#6366f1' }}>{row.returnType}</span>
                    </td>
                    <td>{row.period}</td>
                    <td style={{ color: '#64748b', fontSize: 12 }}>{row.date}</td>
                    <td><StatusBadge status={row.status} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div style={{ padding: '12px 16px', borderTop: '1px solid #f1f5f9' }}>
              <button style={{ background: 'none', border: 'none', color: '#4f46e5', fontWeight: 600, fontSize: 13, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 4 }}>
                View All Filings <ChevronRight size={14} />
              </button>
            </div>
          </div>
        </div>

        {/* ── Bottom Row ── */}
        <div className="gst-dash-bottom-row">

          {/* Partner Collection Table */}
          <div className="gst-dash-card">
            <div className="gst-dash-card-header">
              <h3>Partner-wise GST Collection</h3>
            </div>
            <table className="gst-dash-table">
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
                {partnerCollection.map((row, i) => (
                  <tr key={i}>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <Avatar initials={row.initials} />
                        <span style={{ fontWeight: 600 }}>{row.partner}</span>
                      </div>
                    </td>
                    <td>{row.category}</td>
                    <td style={{ fontWeight: 600 }}>{row.taxable}</td>
                    <td style={{ color: '#4f46e5', fontWeight: 600 }}>{row.cgst}</td>
                    <td style={{ color: '#9333ea', fontWeight: 600 }}>{row.sgst}</td>
                    <td className="gst-amount-cell">{row.total}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div style={{ padding: '12px 16px', borderTop: '1px solid #f1f5f9' }}>
              <button style={{ background: 'none', border: 'none', color: '#4f46e5', fontWeight: 600, fontSize: 13, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 4 }}>
                View All Partners <ChevronRight size={14} />
              </button>
            </div>
          </div>

          {/* Reconciliation Issues Table */}
          <div className="gst-dash-card">
            <div className="gst-dash-card-header">
              <h3>GST Reconciliation Issues</h3>
            </div>
            <table className="gst-dash-table">
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
                {reconciliationIssues.map((row, i) => (
                  <tr key={i}>
                    <td className="invoice-cell">{row.invoice}</td>
                    <td style={{ fontWeight: 500 }}>{row.partner}</td>
                    <td style={{ color: '#64748b', fontSize: 12 }}>{row.mismatch}</td>
                    <td className="gst-amount-cell">{row.diffAmount}</td>
                    <td><PriorityBadge priority={row.priority} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div style={{ padding: '12px 16px', borderTop: '1px solid #f1f5f9' }}>
              <button style={{ background: 'none', border: 'none', color: '#4f46e5', fontWeight: 600, fontSize: 13, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 4 }}>
                View All Alerts <ChevronRight size={14} />
              </button>
            </div>
          </div>
        </div>

      </div>
    </AdminShell>
  );
}
