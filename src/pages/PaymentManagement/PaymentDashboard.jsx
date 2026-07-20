import React, { useState } from 'react';
import {
  CreditCard,
  CheckCircle2,
  XCircle,
  RotateCcw,
  TrendingUp,
  TrendingDown,
  Clock,
  RefreshCw,
  Download,
  ChevronDown,
  ChevronRight,
  Eye,
  Zap
} from 'lucide-react';
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

const paymentVolumeData = [
  { date: '01 May', volume: 152000 },
  { date: '03 May', volume: 185000 },
  { date: '05 May', volume: 140000 },
  { date: '08 May', volume: 220000 },
  { date: '10 May', volume: 190000 },
  { date: '13 May', volume: 250000 },
  { date: '15 May', volume: 210000 },
  { date: '18 May', volume: 280000 },
  { date: '20 May', volume: 230000 },
  { date: '23 May', volume: 310000 },
  { date: '25 May', volume: 260000 },
  { date: '28 May', volume: 340000 },
  { date: '31 May', volume: 290000 },
];

const methodData = [
  { name: 'UPI', value: 44, color: '#4f46e5' },
  { name: 'Card', value: 28, color: '#8b5cf6' },
  { name: 'NetBanking', value: 14, color: '#10b981' },
  { name: 'Wallet', value: 9, color: '#f59e0b' },
  { name: 'COD', value: 5, color: '#64748b' },
];

const statusData = [
  { name: 'Successful', value: 91.8, color: '#22c55e' },
  { name: 'Pending', value: 5.4, color: '#eab308' },
  { name: 'Failed', value: 1.8, color: '#ef4444' },
  { name: 'Refunded', value: 1.0, color: '#f97316' },
];

const recentTransactions = [
  { id: 'TXN-7281', user: 'Amit Kumar', initials: 'AK', amount: '₹4,500', method: 'UPI', gateway: 'Razorpay', status: 'Successful', date: '31 May 2026, 14:30' },
  { id: 'TXN-7282', user: 'Neha Sharma', initials: 'NS', amount: '₹12,000', method: 'Credit Card', gateway: 'Stripe', status: 'Pending', date: '31 May 2026, 14:15' },
  { id: 'TXN-7283', user: 'Rahul Verma', initials: 'RV', amount: '₹2,500', method: 'Wallet', gateway: 'Paytm', status: 'Failed', date: '31 May 2026, 13:45' },
  { id: 'TXN-7284', user: 'Priya Singh', initials: 'PS', amount: '₹8,900', method: 'NetBanking', gateway: 'Razorpay', status: 'Successful', date: '31 May 2026, 13:10' },
  { id: 'TXN-7285', user: 'Vikram Patel', initials: 'VP', amount: '₹1,200', method: 'UPI', gateway: 'Razorpay', status: 'Successful', date: '31 May 2026, 12:55' },
];

const gatewayPerformance = [
  { name: 'Razorpay', successRate: '94.2%', avgTime: '1.2s', totalVol: '₹32,45,000', status: 'Optimal' },
  { name: 'Paytm', successRate: '89.5%', avgTime: '2.1s', totalVol: '₹18,20,000', status: 'Degraded' },
  { name: 'Stripe', successRate: '96.8%', avgTime: '0.8s', totalVol: '₹11,49,820', status: 'Optimal' },
];

const refundRequests = [
  { id: 'REF-091', origTxn: 'TXN-6102', amount: '₹4,500', user: 'Sanjay Gupta', reason: 'Service Cancelled', status: 'Processing' },
  { id: 'REF-092', origTxn: 'TXN-6054', amount: '₹12,000', user: 'Anita Desai', reason: 'Duplicate Charge', status: 'Approved' },
  { id: 'REF-093', origTxn: 'TXN-5921', amount: '₹2,500', user: 'Karan Mehra', reason: 'Dissatisfied', status: 'Rejected' },
];

const chargebackSummary = [
  { id: 'CB-44', origTxn: 'TXN-5011', amount: '₹18,500', user: 'Meena Iyer', gateway: 'Stripe', status: 'Disputed' },
  { id: 'CB-45', origTxn: 'TXN-4890', amount: '₹6,200', user: 'Rohan Das', gateway: 'Razorpay', status: 'Lost' },
  { id: 'CB-46', origTxn: 'TXN-4812', amount: '₹9,000', user: 'Shruti Jain', gateway: 'Paytm', status: 'Won' },
];

/* ───────────────────── Sub-components ───────────────────── */

function StatCard({ icon: Icon, iconBg, iconColor, value, label, sublabel, trend, trendUp, trendLabel }) {
  return (
    <div className="pay-dash-stat-card">
      <div className="pay-dash-stat-icon" style={{ background: iconBg }}>
        <Icon size={22} color={iconColor} />
      </div>
      <div className="pay-dash-stat-body">
        <div className="pay-dash-stat-value">{value}</div>
        <div className="pay-dash-stat-label">{label}</div>
        {sublabel && <div style={{ fontSize: '11px', color: '#94a3b8', fontWeight: 400 }}>{sublabel}</div>}
        {trend && (
          <div className={`pay-dash-stat-trend ${trendUp ? 'up' : 'down'}`}>
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
  let cls = 'pay-status-default';
  if (status === 'Successful' || status === 'Approved' || status === 'Optimal' || status === 'Won') cls = 'pay-status-success';
  if (status === 'Pending' || status === 'Processing' || status === 'Degraded' || status === 'Disputed') cls = 'pay-status-warning';
  if (status === 'Failed' || status === 'Rejected' || status === 'Lost') cls = 'pay-status-danger';
  return <span className={`pay-dash-status-badge ${cls}`}>{status}</span>;
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
    <div className="pay-donut-legend">
      {data.map(d => (
        <div key={d.name} className="pay-donut-legend-item">
          <span className="pay-donut-legend-dot" style={{ background: d.color }} />
          <span className="pay-donut-legend-name">{d.name}</span>
          <span className="pay-donut-legend-val">{d.value}%</span>
        </div>
      ))}
    </div>
  );
}

/* ───────────────────── Main Component ───────────────────── */

export default function PaymentDashboard() {
  const [dateRange, setDateRange] = useState('01 May 2026 - 31 May 2026');
  const [method, setMethod] = useState('All Methods');
  const [statusFilter, setStatusFilter] = useState('All Status');
  const [gateway, setGateway] = useState('All Gateways');
  const [activeGatewayTab, setActiveGatewayTab] = useState('All');

  return (
    <AdminShell
      activeTab="Payment Management"
      pageTitle="Payment Dashboard"
      pageSubtitle="Payment Transactions & Gateway Analytics"
    >
      <div className="pay-dash-root">

        {/* ── Header Filters ── */}
        <div className="pay-dash-filters">
          <div className="pay-filter-group">
            <label>Date Range</label>
            <div className="pay-filter-select">
              <span>{dateRange}</span>
              <ChevronDown size={14} />
            </div>
          </div>
          <div className="pay-filter-group">
            <label>Payment Method</label>
            <div className="pay-filter-select">
              <span>{method}</span>
              <ChevronDown size={14} />
            </div>
          </div>
          <div className="pay-filter-group">
            <label>Status</label>
            <div className="pay-filter-select">
              <span>{statusFilter}</span>
              <ChevronDown size={14} />
            </div>
          </div>
          <div className="pay-filter-group">
            <label>Gateway</label>
            <div className="pay-filter-select">
              <span>{gateway}</span>
              <ChevronDown size={14} />
            </div>
          </div>
          <div className="pay-filter-actions">
            <button className="pay-filter-btn-refresh">
              <RefreshCw size={15} /> Refresh
            </button>
            <button className="pay-filter-btn-export">
              <Download size={15} /> Export Report
            </button>
          </div>
        </div>

        {/* ── Stat Cards Row ── */}
        <div className="pay-dash-stats-grid">
          <StatCard
            icon={CreditCard}
            iconBg="#eff6ff" iconColor="#2563eb"
            value="₹62,14,820" label="Total Payments"
            sublabel="This Month"
            trend="+21.3%" trendUp={true} trendLabel="vs Apr 2026"
          />
          <StatCard
            icon={CheckCircle2}
            iconBg="#f0fdf4" iconColor="#16a34a"
            value="18,420" label="Successful Payments"
            sublabel="This Month"
            trend="+15.8%" trendUp={true} trendLabel="vs Apr 2026"
          />
          <StatCard
            icon={XCircle}
            iconBg="#fff1f2" iconColor="#e11d48"
            value="342" label="Failed Payments"
            sublabel="This Month"
            trend="-28.4%" trendUp={false} trendLabel="vs Apr 2026"
          />
          <StatCard
            icon={RotateCcw}
            iconBg="#fff7ed" iconColor="#ea580c"
            value="₹1,24,500" label="Refunds Processed"
            sublabel="This Month"
            trend="+4.2%" trendUp={true} trendLabel="vs Apr 2026"
          />
          <StatCard
            icon={TrendingUp}
            iconBg="#faf5ff" iconColor="#9333ea"
            value="₹3,374" label="Avg Transaction"
            sublabel="Per Transaction"
            trend="+5.6%" trendUp={true} trendLabel="vs Apr 2026"
          />
          <StatCard
            icon={Clock}
            iconBg="#fefce8" iconColor="#ca8a04"
            value="₹8,42,180" label="Pending Settlements"
            sublabel="Awaiting Clearance"
            trend="-12.1%" trendUp={false} trendLabel="vs Apr 2026"
          />
        </div>

        {/* ── Charts Row ── */}
        <div className="pay-dash-charts-row">

          {/* Volume Chart */}
          <div className="pay-dash-card pay-dash-volume-chart">
            <div className="pay-dash-card-header">
              <div>
                <h3>Payment Volume</h3>
              </div>
              <div className="pay-chart-freq">
                {['All', 'Razorpay', 'Paytm', 'Stripe'].map(f => (
                  <button
                    key={f}
                    className={`pay-chart-freq-btn ${activeGatewayTab === f ? 'active' : ''}`}
                    onClick={() => setActiveGatewayTab(f)}
                  >
                    {f}
                  </button>
                ))}
              </div>
            </div>
            <ResponsiveContainer width="100%" height={200}>
              <AreaChart data={paymentVolumeData} margin={{ top: 8, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="payAreaGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#4f46e5" stopOpacity={0.02} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
                <XAxis dataKey="date" tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                <Tooltip content={<CustomTooltip />} />
                <Area
                  type="monotone"
                  dataKey="volume"
                  stroke="#4f46e5"
                  strokeWidth={2.5}
                  fill="url(#payAreaGrad)"
                  dot={false}
                  activeDot={{ r: 5, fill: '#4f46e5' }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Method Donut */}
          <div className="pay-dash-card pay-dash-donut">
            <div className="pay-dash-card-header">
              <h3>Payment by Method</h3>
            </div>
            <div className="pay-donut-content">
              <div className="pay-donut-wrap">
                <PieChart width={160} height={160}>
                  <Pie data={methodData} cx={75} cy={75} innerRadius={50} outerRadius={72} dataKey="value" startAngle={90} endAngle={-270} stroke="none">
                    {methodData.map((entry, i) => <Cell key={i} fill={entry.color} />)}
                  </Pie>
                </PieChart>
                <div style={{ position: 'absolute', textAlign: 'center', pointerEvents: 'none' }}>
                  <span style={{ display: 'block', fontSize: '20px', fontWeight: 800, color: '#1e293b' }}>5</span>
                  <span style={{ display: 'block', fontSize: '10px', color: '#64748b', fontWeight: 600 }}>Methods</span>
                </div>
              </div>
              <DonutLegend data={methodData} />
            </div>
          </div>

          {/* Status Donut */}
          <div className="pay-dash-card pay-dash-donut">
            <div className="pay-dash-card-header">
              <h3>Payment Status</h3>
            </div>
            <div className="pay-donut-content">
              <div className="pay-donut-wrap">
                <PieChart width={160} height={160}>
                  <Pie data={statusData} cx={75} cy={75} innerRadius={50} outerRadius={72} dataKey="value" startAngle={90} endAngle={-270} stroke="none">
                    {statusData.map((entry, i) => <Cell key={i} fill={entry.color} />)}
                  </Pie>
                </PieChart>
                <div style={{ position: 'absolute', textAlign: 'center', pointerEvents: 'none' }}>
                  <span style={{ display: 'block', fontSize: '20px', fontWeight: 800, color: '#1e293b' }}>91.8%</span>
                  <span style={{ display: 'block', fontSize: '10px', color: '#64748b', fontWeight: 600 }}>Success</span>
                </div>
              </div>
              <DonutLegend data={statusData} />
            </div>
          </div>
        </div>

        {/* ── Mid Row ── */}
        <div className="pay-dash-mid-row">

          {/* Recent Transactions Table */}
          <div className="pay-dash-card pay-dash-transactions">
            <div className="pay-dash-card-header">
              <h3>Recent Transactions</h3>
            </div>
            <div style={{ overflowX: 'auto', padding: '0 18px' }}>
              <table className="pay-dash-table">
                <thead>
                  <tr>
                    <th>Txn ID</th>
                    <th>User</th>
                    <th>Amount</th>
                    <th>Method</th>
                    <th>Gateway</th>
                    <th>Status</th>
                    <th>Date & Time</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {recentTransactions.map((t, i) => (
                    <tr key={i}>
                      <td className="pay-id-cell">{t.id}</td>
                      <td>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                          <Avatar initials={t.initials} />
                          <span style={{ fontWeight: 500 }}>{t.user}</span>
                        </div>
                      </td>
                      <td className="pay-amount-cell">{t.amount}</td>
                      <td>{t.method}</td>
                      <td>{t.gateway}</td>
                      <td><StatusBadge status={t.status} /></td>
                      <td className="pay-time-cell">{t.date}</td>
                      <td>
                        <button className="pay-table-eye-btn"><Eye size={15} /></button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="pay-dash-view-all">
              <button>View All Transactions <ChevronRight size={14} /></button>
            </div>
          </div>

          {/* Gateway Performance Table */}
          <div className="pay-dash-card pay-dash-gateway-perf">
            <div className="pay-dash-card-header">
              <h3>Gateway Performance</h3>
            </div>
            <div style={{ padding: '0 18px' }}>
              <table className="pay-dash-table">
                <thead>
                  <tr>
                    <th>Gateway</th>
                    <th>Success Rate</th>
                    <th>Avg Response</th>
                    <th>Total Vol</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {gatewayPerformance.map((g, i) => (
                    <tr key={i}>
                      <td>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                          <div style={{ width: 28, height: 28, borderRadius: 6, background: '#f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <Zap size={14} color="#4f46e5" />
                          </div>
                          <span style={{ fontWeight: 600 }}>{g.name}</span>
                        </div>
                      </td>
                      <td style={{ fontWeight: 600, color: '#16a34a' }}>{g.successRate}</td>
                      <td>{g.avgTime}</td>
                      <td style={{ fontWeight: 600 }}>{g.totalVol}</td>
                      <td><StatusBadge status={g.status} /></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="pay-dash-view-all">
              <button>View Full Analytics <ChevronRight size={14} /></button>
            </div>
          </div>
        </div>

        {/* ── Bottom Row ── */}
        <div className="pay-dash-bottom-row">

          {/* Refund Requests Table */}
          <div className="pay-dash-card pay-dash-refunds">
            <div className="pay-dash-card-header">
              <h3>Refund Requests</h3>
            </div>
            <div style={{ padding: '0 18px' }}>
              <table className="pay-dash-table">
                <thead>
                  <tr>
                    <th>Refund ID</th>
                    <th>Orig Txn</th>
                    <th>Amount</th>
                    <th>User</th>
                    <th>Reason</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {refundRequests.map((r, i) => (
                    <tr key={i}>
                      <td className="pay-id-cell">{r.id}</td>
                      <td className="pay-muted-cell">{r.origTxn}</td>
                      <td className="pay-amount-cell">{r.amount}</td>
                      <td style={{ fontWeight: 500 }}>{r.user}</td>
                      <td>{r.reason}</td>
                      <td><StatusBadge status={r.status} /></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="pay-dash-view-all">
              <button>View All Refunds <ChevronRight size={14} /></button>
            </div>
          </div>

          {/* Chargeback Summary Table */}
          <div className="pay-dash-card pay-dash-chargebacks">
            <div className="pay-dash-card-header">
              <h3>Chargeback Summary</h3>
            </div>
            <div style={{ padding: '0 18px' }}>
              <table className="pay-dash-table">
                <thead>
                  <tr>
                    <th>CB ID</th>
                    <th>Orig Txn</th>
                    <th>Amount</th>
                    <th>User</th>
                    <th>Gateway</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {chargebackSummary.map((c, i) => (
                    <tr key={i}>
                      <td className="pay-id-cell">{c.id}</td>
                      <td className="pay-muted-cell">{c.origTxn}</td>
                      <td className="pay-amount-cell">{c.amount}</td>
                      <td style={{ fontWeight: 500 }}>{c.user}</td>
                      <td>{c.gateway}</td>
                      <td><StatusBadge status={c.status} /></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="pay-dash-view-all">
              <button>View All Chargebacks <ChevronRight size={14} /></button>
            </div>
          </div>
        </div>

      </div>
    </AdminShell>
  );
}
