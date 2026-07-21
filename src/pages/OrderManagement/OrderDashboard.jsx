import React, { useState } from 'react';
import {
  ShoppingCart, CheckCircle, XCircle, Clock, Users, User, Briefcase, Star,
  Eye, ChevronDown, ChevronLeft, ChevronRight, Package, DollarSign, RefreshCcw, TruckIcon
} from 'lucide-react';
import AdminShell from '../../components/layouts/AdminShell';
import { useToast } from '../../components/common/ToastNotification';
import {
  LineChart, Line, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';

/* ─────────────────── Mock Data ─────────────────── */

const ordersOverTime = [
  { day: '01 May', total: 980,  confirmed: 720,  pending: 260 },
  { day: '05 May', total: 1120, confirmed: 860,  pending: 260 },
  { day: '10 May', total: 1480, confirmed: 1120, pending: 360 },
  { day: '15 May', total: 1750, confirmed: 1350, pending: 400 },
  { day: '20 May', total: 2100, confirmed: 1650, pending: 450 },
  { day: '25 May', total: 2450, confirmed: 1950, pending: 500 },
  { day: '31 May', total: 2820, confirmed: 2280, pending: 540 },
];

const categoryDist = [
  { name: 'Electronics',  value: 2140, color: '#3b82f6', pct: '41.8%' },
  { name: 'Home & Garden',value: 1580, color: '#22c55e', pct: '30.9%' },
  { name: 'Clothing',     value: 980,  color: '#ec4899', pct: '19.1%' },
  { name: 'Food & Bev.',  value: 420,  color: '#f59e0b', pct: '8.2%'  },
];

const statusDist = [
  { name: 'Delivered',   value: 3420, color: '#22c55e', pct: '66.8%' },
  { name: 'Processing',  value: 980,  color: '#3b82f6', pct: '19.1%' },
  { name: 'Cancelled',   value: 420,  color: '#ef4444', pct: '8.2%'  },
  { name: 'Returned',    value: 300,  color: '#f59e0b', pct: '5.9%'  },
];

const paymentDist = [
  { name: 'Paid Online',      value: 3820, color: '#22c55e', pct: '74.6%' },
  { name: 'Cash on Delivery', value: 1300, color: '#f59e0b', pct: '25.4%' },
];

const pendingOrders = [
  { id: 'ORD-98462', scheduledOn: '05 Jun 2026', orderBy: 'User',    daysLeft: 3, danger: true  },
  { id: 'ORD-75663', scheduledOn: '06 Jun 2026', orderBy: 'Partner', daysLeft: 4, danger: true  },
  { id: 'ORD-14487', scheduledOn: '07 Jun 2026', orderBy: 'User',    daysLeft: 5, danger: false },
  { id: 'ORD-16219', scheduledOn: '08 Jun 2026', orderBy: 'Partner', daysLeft: 6, danger: false },
  { id: 'ORD-18351', scheduledOn: '09 Jun 2026', orderBy: 'User',    daysLeft: 7, danger: false },
];

const topCustomers = [
  { rank: 1, name: 'Ramesh Kumar',   orders: 56 },
  { rank: 2, name: 'Suresh Babu',    orders: 42 },
  { rank: 3, name: 'Priya Sharma',   orders: 38 },
  { rank: 4, name: 'Anil Kumar',     orders: 31 },
  { rank: 5, name: 'Kavitha Reddy',  orders: 27 },
];

const topPartners = [
  { rank: 1, name: 'Tech Revive Solutions', orders: 128 },
  { rank: 2, name: 'QuickFix Services',     orders: 94  },
  { rank: 3, name: 'Home Care Pro',         orders: 78  },
  { rank: 4, name: 'Service Hub India',     orders: 63  },
  { rank: 5, name: 'Bright Services',       orders: 52  },
];

const topCategories = [
  { rank: 1, name: 'Electronics',   custOrders: 1240, partOrders: 900,  total: 2140 },
  { rank: 2, name: 'Home & Garden', custOrders: 940,  partOrders: 640,  total: 1580 },
  { rank: 3, name: 'Clothing',      custOrders: 620,  partOrders: 360,  total: 980  },
  { rank: 4, name: 'Food & Bev.',   custOrders: 280,  partOrders: 140,  total: 420  },
  { rank: 5, name: 'Sports',        custOrders: 210,  partOrders: 110,  total: 320  },
];

const categoryPerformance = [
  { type: 'Electronics',   total: 2140, delivered: 1680, revenue: 86500, pct: 41.8, color: '#3b82f6' },
  { type: 'Home & Garden', total: 1580, delivered: 1240, revenue: 52300, pct: 30.9, color: '#22c55e' },
  { type: 'Clothing',      total: 980,  delivered: 720,  revenue: 28400, pct: 19.1, color: '#ec4899' },
  { type: 'Food & Bev.',   total: 420,  delivered: 310,  revenue: 12800, pct: 8.2,  color: '#f59e0b' },
];

const ordersPerformance = [
  { id: 'ORD-98462', orderedBy: 'User',    name: 'Ramesh Kumar',       category: 'Electronics',   status: 'Delivered',  custOrders: 22, partOrders: 10, total: 32, product: 'Laptop Stand',   amount: '₹2,450.00', scheduledOn: '05 Jun 2026', created: '05 May 2026' },
  { id: 'ORD-75663', orderedBy: 'Partner', name: 'Suresh Electricals', category: 'Home & Garden', status: 'Delivered',  custOrders: 18, partOrders: 14, total: 32, product: 'Garden Hose',    amount: '₹1,250.00', scheduledOn: '06 Jun 2026', created: '06 May 2026' },
  { id: 'ORD-14487', orderedBy: 'User',    name: 'Tech Review Hub',    category: 'Clothing',      status: 'Processing', custOrders: 30, partOrders: 9,  total: 39, product: 'Formal Shirt',   amount: '₹980.00',   scheduledOn: '07 Jun 2026', created: '07 May 2026' },
  { id: 'ORD-16219', orderedBy: 'Partner', name: 'Priya Sharma',       category: 'Food & Bev.',   status: 'Cancelled',  custOrders: 6,  partOrders: 2,  total: 8,  product: 'Organic Tea',    amount: '₹350.00',   scheduledOn: '08 Jun 2026', created: '08 May 2026' },
  { id: 'ORD-18351', orderedBy: 'User',    name: 'QuickFix Services',  category: 'Electronics',   status: 'Returned',   custOrders: 14, partOrders: 8,  total: 22, product: 'Smart Speaker',  amount: '₹1,800.00', scheduledOn: '09 Jun 2026', created: '09 May 2026' },
];

/* ─────────────────── Helpers ─────────────────── */

function fmtNum(n) {
  if (n >= 1_000_000) return (n / 1_000_000).toFixed(1) + 'M';
  if (n >= 1_000) return n.toLocaleString();
  return String(n);
}

function StatusBadge({ status }) {
  const map = {
    'Delivered':  { bg: '#f0fdf4', color: '#16a34a' },
    'Processing': { bg: '#eff6ff', color: '#2563eb' },
    'Cancelled':  { bg: '#fff1f2', color: '#dc2626' },
    'Returned':   { bg: '#fffbeb', color: '#d97706' },
  };
  const s = map[status] || { bg: '#f1f5f9', color: '#64748b' };
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center',
      padding: '2px 8px', borderRadius: 20,
      fontSize: 10.5, fontWeight: 700,
      background: s.bg, color: s.color,
    }}>{status}</span>
  );
}

function LineTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null;
  return (
    <div style={{ background: '#1e293b', borderRadius: 10, padding: '10px 14px', fontSize: 11 }}>
      <div style={{ color: '#94a3b8', fontWeight: 700, marginBottom: 6 }}>{label}</div>
      {payload.map(p => (
        <div key={p.name} style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 3 }}>
          <span style={{ width: 7, height: 7, borderRadius: '50%', background: p.color, display: 'inline-block' }} />
          <span style={{ color: '#cbd5e1' }}>{p.name}:</span>
          <strong style={{ color: '#fff' }}>{fmtNum(p.value)}</strong>
        </div>
      ))}
    </div>
  );
}

function DonutCenterLabel({ viewBox, value, label }) {
  const { cx, cy } = viewBox;
  return (
    <g>
      <text x={cx} y={cy - 6} textAnchor="middle" fill="#0f172a" fontSize={14} fontWeight={800}>{value}</text>
      <text x={cx} y={cy + 9}  textAnchor="middle" fill="#94a3b8" fontSize={8}  fontWeight={600}>{label}</text>
    </g>
  );
}

function DonutCard({ title, data, centerValue, centerLabel }) {
  return (
    <div className="ref-card ref-donut-card">
      <div className="ref-card-header">
        <h3 className="ref-card-title">{title}</h3>
      </div>
      <div className="ref-donut-body">
        <PieChart width={130} height={130}>
          <Pie
            data={data} cx={65} cy={65}
            innerRadius={38} outerRadius={60}
            paddingAngle={2} dataKey="value"
            startAngle={90} endAngle={-270}
          >
            {data.map((e, i) => <Cell key={i} fill={e.color} />)}
            <DonutCenterLabel viewBox={{ cx: 65, cy: 65 }} value={centerValue} label={centerLabel} />
          </Pie>
          <Tooltip formatter={v => fmtNum(v)} />
        </PieChart>
        <div className="ref-donut-legend">
          {data.map((item, i) => (
            <div key={i} className="ref-donut-legend-row">
              <span className="ref-donut-dot" style={{ background: item.color }} />
              <span className="ref-donut-name">{item.name}</span>
              <span className="ref-donut-val">{fmtNum(item.value)}</span>
              <span className="ref-donut-pct">({item.pct})</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─────────────────── Main Component ─────────────────── */

export default function OrderDashboard({ activeTab = 'Order Dashboard' }) {
  const { addToast } = useToast();
  const [period, setPeriod]         = useState('Monthly');
  const [chartFreq, setChartFreq]   = useState('Daily');
  const [viewAllModal, setViewAllModal] = useState(null);
  const [filterTrigger, setFilterTrigger] = useState(0);

  const m = filterTrigger === 0 ? 1 : 1 + ((filterTrigger % 5) * 0.15);

  const dynTopKpis = [
    { label: 'Total Orders',       value: Math.floor(5120 * m),  sub: '↑ 21.4% vs Apr 2026',    trend: 'up',      icon: ShoppingCart, iconColor: '#3b82f6', iconBg: '#eff6ff' },
    { label: 'Delivered Orders',   value: Math.floor(3420 * m),  sub: '66.8% of total ↑ 14.2%', trend: 'up',      icon: CheckCircle,  iconColor: '#22c55e', iconBg: '#f0fdf4' },
    { label: 'Processing Orders',  value: Math.floor(980 * m),   sub: '19.1% of total ↓ 3.8%',  trend: 'down',    icon: Clock,        iconColor: '#3b82f6', iconBg: '#eff6ff' },
    { label: 'Cancelled Orders',   value: Math.floor(420 * m),   sub: '8.2% of total',           trend: 'neutral', icon: XCircle,      iconColor: '#ef4444', iconBg: '#fff1f2' },
    { label: 'Total Revenue',      value: Math.floor(180000 * m),sub: '↑ 19.8% vs Apr 2026',    trend: 'up',      icon: DollarSign,   iconColor: '#8b5cf6', iconBg: '#f5f3ff' },
    { label: 'Total Customers',    value: Math.floor(4280 * m),  sub: '↑ 11.3% vs Apr 2026',    trend: 'up',      icon: Users,        iconColor: '#3b82f6', iconBg: '#eff6ff' },
    { label: 'Returned Orders',    value: Math.floor(300 * m),   sub: '5.9% of total',           trend: 'neutral', icon: RefreshCcw,   iconColor: '#f59e0b', iconBg: '#fffbeb' },
    { label: 'Partner Orders', isCustom: true, icon: TruckIcon, iconColor: '#8b5cf6', iconBg: '#f5f3ff' },
  ];

  const dynSubKpis = [
    { label: 'Electronics',   value: Math.floor(2140 * m), sub: '41.8% of total', unused: Math.floor(460 * m),  unusedPct: '21.5%', icon: Package,   iconColor: '#3b82f6', iconBg: '#eff6ff' },
    { label: 'Home & Garden', value: Math.floor(1580 * m), sub: '30.9% of total', unused: Math.floor(340 * m),  unusedPct: '21.5%', icon: User,      iconColor: '#22c55e', iconBg: '#f0fdf4' },
    { label: 'Clothing',      value: Math.floor(980 * m),  sub: '19.1% of total', unused: Math.floor(260 * m),  unusedPct: '26.5%', icon: Briefcase, iconColor: '#ec4899', iconBg: '#fdf2f8' },
  ];

  const dynCategoryDist   = categoryDist.map(k => ({ ...k, value: Math.floor(k.value * m) }));
  const dynStatusDist     = statusDist.map(k => ({ ...k, value: Math.floor(k.value * m) }));
  const dynPaymentDist    = paymentDist.map(k => ({ ...k, value: Math.floor(k.value * m) }));
  const dynCatPerf        = categoryPerformance.map(r => ({ ...r, total: Math.floor(r.total * m), delivered: Math.floor(r.delivered * m), revenue: Math.floor(r.revenue * m) }));
  const dynOrdersPerf     = ordersPerformance.map(c => ({
    ...c,
    custOrders:  Math.floor(c.custOrders * m),
    partOrders:  Math.floor(c.partOrders * m),
    total:       Math.floor(c.total * m),
  }));

  const dynTopCustomers   = topCustomers.map(u => ({ ...u, orders: Math.floor(u.orders * m) }));
  const dynTopPartners    = topPartners.map(u => ({ ...u, orders: Math.floor(u.orders * m) }));
  const dynTopCategories  = topCategories.map(u => ({ ...u, custOrders: Math.floor(u.custOrders * m), partOrders: Math.floor(u.partOrders * m), total: Math.floor(u.total * m) }));

  const chartDataWeekly = [
    { day: 'Week 1', total: 5880, confirmed: 4480, pending: 1400 },
    { day: 'Week 2', total: 7350, confirmed: 5600, pending: 1750 },
    { day: 'Week 3', total: 9240, confirmed: 7140, pending: 2100 },
    { day: 'Week 4', total: 10500, confirmed: 8190, pending: 2310 },
  ];
  const chartDataMonthly = [
    { day: 'Jan', total: 38000, confirmed: 29000, pending: 9000 },
    { day: 'Feb', total: 42000, confirmed: 33000, pending: 9000 },
    { day: 'Mar', total: 49000, confirmed: 39000, pending: 10000 },
    { day: 'Apr', total: 55000, confirmed: 44000, pending: 11000 },
    { day: 'May', total: 62000, confirmed: 50000, pending: 12000 },
  ];

  const dynChartData = (chartFreq === 'Weekly' ? chartDataWeekly : chartFreq === 'Monthly' ? chartDataMonthly : ordersOverTime).map(d => ({
    ...d,
    total:     Math.floor(d.total * m),
    confirmed: Math.floor(d.confirmed * m),
    pending:   Math.floor(d.pending * m),
  }));

  return (
    <AdminShell activeTab={activeTab} headerTitle="Order Dashboard" searchPlaceholder="Search pages, modules...">
      <div className="ref-dash-root">

        {/* ── Filter Bar ── */}
        <div className="ref-filter-bar">

          {/* Row 1: Location + Period + Month/Year + Apply/Reset */}
          <div className="ref-filter-row">
            <div className="ref-filter-group">
              <label>State</label>
              <div className="ref-select-wrap">
                <select className="ref-select" style={{ minWidth: '110px' }}>
                  <option>All States</option>
                  <option>Maharashtra</option>
                  <option>Karnataka</option>
                  <option>Tamil Nadu</option>
                  <option>Delhi</option>
                </select>
                <ChevronDown size={12} className="ref-select-arrow" />
              </div>
            </div>

            <div className="ref-filter-group">
              <label>City</label>
              <div className="ref-select-wrap">
                <select className="ref-select" style={{ minWidth: '110px' }}>
                  <option>All Cities</option>
                  <option>Mumbai</option>
                  <option>Bengaluru</option>
                  <option>Chennai</option>
                  <option>Hyderabad</option>
                </select>
                <ChevronDown size={12} className="ref-select-arrow" />
              </div>
            </div>

            <div className="ref-filter-group">
              <label>District</label>
              <div className="ref-select-wrap">
                <select className="ref-select" style={{ minWidth: '110px' }}>
                  <option>All Districts</option>
                  <option>Andheri</option>
                  <option>Koramangala</option>
                  <option>T. Nagar</option>
                </select>
                <ChevronDown size={12} className="ref-select-arrow" />
              </div>
            </div>

            <div className="ref-filter-divider" />

            <div className="ref-period-toggle" style={{ alignSelf: 'flex-end' }}>
              {['Daily', 'Weekly', 'Monthly', 'Yearly'].map(p => (
                <button
                  key={p}
                  className={`ref-period-btn${period === p ? ' active' : ''}`}
                  onClick={() => setPeriod(p)}
                >{p}</button>
              ))}
            </div>

            <div className="ref-filter-group" style={{ minWidth: '90px' }}>
              <label>Month</label>
              <div className="ref-select-wrap">
                <select className="ref-select ref-select-sm">
                  {['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'].map(mon => (
                    <option key={mon}>{mon}</option>
                  ))}
                </select>
                <ChevronDown size={12} className="ref-select-arrow" />
              </div>
            </div>

            <div className="ref-filter-group" style={{ minWidth: '90px' }}>
              <label>Year</label>
              <div className="ref-select-wrap">
                <select className="ref-select ref-select-sm">
                  {['2026','2025','2024','2023'].map(y => (
                    <option key={y}>{y}</option>
                  ))}
                </select>
                <ChevronDown size={12} className="ref-select-arrow" />
              </div>
            </div>

            <div style={{ marginLeft: 'auto', display: 'flex', gap: '8px', alignSelf: 'flex-end' }}>
              <button
                className="ref-btn-primary"
                onClick={() => { setFilterTrigger(prev => prev + 1); addToast('Filters applied', 'success'); }}
              >Apply</button>
              <button
                className="ref-btn-secondary"
                onClick={() => { setPeriod('Monthly'); setFilterTrigger(0); addToast('Filters reset', 'info'); }}
              >Reset</button>
            </div>
          </div>

          {/* Row 2: Order-specific filters */}
          <div className="ref-filter-row">
            <div className="ref-filter-group ref-filter-group-wide">
              <label>Order Category</label>
              <div className="ref-select-wrap">
                <select className="ref-select">
                  {['All','Electronics','Home & Garden','Clothing','Food & Bev.','Sports'].map(o => <option key={o}>{o}</option>)}
                </select>
                <ChevronDown size={12} className="ref-select-arrow" />
              </div>
            </div>

            <div className="ref-filter-group ref-filter-group-wide">
              <label>Payment Status</label>
              <div className="ref-select-wrap">
                <select className="ref-select">
                  {['All','Paid Online','Cash on Delivery'].map(o => <option key={o}>{o}</option>)}
                </select>
                <ChevronDown size={12} className="ref-select-arrow" />
              </div>
            </div>

            <div className="ref-filter-divider" />

            <div className="ref-filter-group ref-filter-group-wide">
              <label>Ordered By</label>
              <div className="ref-select-wrap">
                <select className="ref-select">
                  {['All','User','Partner'].map(o => <option key={o}>{o}</option>)}
                </select>
                <ChevronDown size={12} className="ref-select-arrow" />
              </div>
            </div>

            <div className="ref-filter-group ref-filter-group-wide">
              <label>Order Status</label>
              <div className="ref-select-wrap">
                <select className="ref-select">
                  {['All','Delivered','Processing','Cancelled','Returned'].map(o => <option key={o}>{o}</option>)}
                </select>
                <ChevronDown size={12} className="ref-select-arrow" />
              </div>
            </div>
          </div>

        </div>

        {/* ── 8 KPI Cards ── */}
        <div className="ref-kpi-grid">
          {dynTopKpis.map((k, i) => {
            const Icon = k.icon;
            return (
              <div key={i} className="ref-kpi-card">
                <div className="ref-kpi-top-row">
                  <div className="ref-kpi-icon-wrap" style={{ background: k.iconBg }}>
                    <Icon size={18} color={k.iconColor} />
                  </div>
                  <div className="ref-kpi-label">{k.label}</div>
                </div>
                {!k.isCustom ? (
                  <>
                    <div className="ref-kpi-value">{fmtNum(k.value)}</div>
                    <div className={`ref-kpi-sub${k.trend === 'up' ? ' up' : k.trend === 'down' ? ' down' : ''}`}>
                      {k.sub}
                    </div>
                  </>
                ) : (
                  <div className="ref-kpi-influencer">
                    <div className="ref-kpi-inf-row">
                      <span className="ref-kpi-inf-label">Customer Orders</span>
                      <span className="ref-kpi-inf-val">{fmtNum(Math.floor(3820 * m))} <span className="ref-kpi-inf-pct">(74.6%)</span></span>
                    </div>
                    <div className="ref-kpi-inf-row">
                      <span className="ref-kpi-inf-label">Partner Orders</span>
                      <span className="ref-kpi-inf-val">{fmtNum(Math.floor(1300 * m))} <span className="ref-kpi-inf-pct">(25.4%)</span></span>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* ── Sub KPIs + Top Performers ── */}
        <div className="ref-mid-row">
          {/* Sub KPI Cards */}
          <div className="ref-sub-kpi-row">
            {dynSubKpis.map((k, i) => {
              const Icon = k.icon;
              return (
                <div key={i} className="ref-sub-kpi-card">
                  <div className="ref-sub-kpi-left">
                    <div className="ref-sub-kpi-icon" style={{ background: k.iconBg }}>
                      <Icon size={15} color={k.iconColor} />
                    </div>
                    <div className="ref-sub-kpi-info">
                      <div className="ref-sub-kpi-label">{k.label}</div>
                      <div className="ref-sub-kpi-value">{fmtNum(k.value)}</div>
                      <div className="ref-sub-kpi-sub">{k.sub}</div>
                    </div>
                  </div>
                  <div className="ref-sub-kpi-divider" />
                  <div className="ref-sub-kpi-right">
                    <div className="ref-sub-kpi-unused-label">Pending</div>
                    <div className="ref-sub-kpi-unused-val">{fmtNum(k.unused)}</div>
                    <div className="ref-sub-kpi-unused-sub">({k.unusedPct} of total)</div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Top Performer Statistics */}
          <div className="ref-top-performers">
            <h3 className="ref-card-title" style={{ marginBottom: '12px', fontSize: '13px' }}>Top Performer Statistics</h3>
            <div className="ref-performers-grid">
              {/* Top Ordering Customers */}
              <div className="ref-perf-card">
                <div className="ref-performer-header">
                  <span className="ref-performer-title">
                    <div style={{ width: 24, height: 24, borderRadius: '50%', background: '#dcfce7', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <User size={12} color="#22c55e" />
                    </div>
                    Top Ordering Customers
                  </span>
                  <a href="#" className="ref-view-all-link" onClick={(e) => { e.preventDefault(); setViewAllModal({ type: 'customers', title: 'Top Ordering Customers' }); }}>View All</a>
                </div>
                <table className="ref-perf-table">
                  <thead>
                    <tr>
                      <th>Rank</th>
                      <th>Customer Name</th>
                      <th>Orders</th>
                    </tr>
                  </thead>
                  <tbody>
                    {dynTopCustomers.map(u => (
                      <tr key={u.rank}>
                        <td>{u.rank}</td>
                        <td className="ref-perf-name">{u.name}</td>
                        <td className="ref-perf-num">{u.orders}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Top Supplying Partners */}
              <div className="ref-perf-card">
                <div className="ref-performer-header">
                  <span className="ref-performer-title">
                    <div style={{ width: 24, height: 24, borderRadius: '50%', background: '#ede9fe', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Briefcase size={12} color="#8b5cf6" />
                    </div>
                    Top Supplying Partners
                  </span>
                  <a href="#" className="ref-view-all-link" onClick={(e) => { e.preventDefault(); setViewAllModal({ type: 'partners', title: 'Top Supplying Partners' }); }}>View All</a>
                </div>
                <table className="ref-perf-table">
                  <thead>
                    <tr>
                      <th>Rank</th>
                      <th>Partner Name</th>
                      <th>Orders</th>
                    </tr>
                  </thead>
                  <tbody>
                    {dynTopPartners.map(u => (
                      <tr key={u.rank}>
                        <td>{u.rank}</td>
                        <td className="ref-perf-name">{u.name}</td>
                        <td className="ref-perf-num">{u.orders}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Top Order Categories */}
              <div className="ref-perf-card">
                <div className="ref-performer-header">
                  <span className="ref-performer-title">
                    <div style={{ width: 24, height: 24, borderRadius: '50%', background: '#ffedd5', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Star size={12} color="#f59e0b" />
                    </div>
                    Top Order Categories
                  </span>
                  <a href="#" className="ref-view-all-link" onClick={(e) => { e.preventDefault(); setViewAllModal({ type: 'categories', title: 'Top Order Categories' }); }}>View All</a>
                </div>
                <table className="ref-perf-table">
                  <thead>
                    <tr>
                      <th>Rank</th>
                      <th>Category</th>
                      <th>Cust. Orders</th>
                      <th>Part. Orders</th>
                      <th>Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {dynTopCategories.map(u => (
                      <tr key={u.rank}>
                        <td>{u.rank}</td>
                        <td className="ref-perf-name">{u.name}</td>
                        <td className="ref-perf-num">{u.custOrders}</td>
                        <td className="ref-perf-num">{u.partOrders}</td>
                        <td className="ref-perf-num">{u.total}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        {/* ── Donut Charts Row ── */}
        <div className="ref-donuts-row">
          <DonutCard
            title="Orders by Category"
            data={dynCategoryDist}
            centerValue={fmtNum(Math.floor(5120 * m))}
            centerLabel="Total Orders"
          />
          <DonutCard
            title="Order Status"
            data={dynStatusDist}
            centerValue={fmtNum(Math.floor(5120 * m))}
            centerLabel="Total Orders"
          />
          <DonutCard
            title="Payment Method"
            data={dynPaymentDist}
            centerValue={fmtNum(Math.floor(5120 * m))}
            centerLabel="Total Orders"
          />

          {/* Pending / Upcoming Orders */}
          <div className="ref-card ref-expire-card">
            <div className="ref-card-header">
              <h3 className="ref-card-title">Pending Orders</h3>
              <a href="#" className="ref-view-all-link">View All</a>
            </div>
            <table className="ref-expire-table">
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Scheduled On</th>
                  <th>Ordered By</th>
                  <th>Days Left</th>
                </tr>
              </thead>
              <tbody>
                {pendingOrders.map(c => (
                  <tr key={c.id}>
                    <td className="ref-code-cell">{c.id}</td>
                    <td>{c.scheduledOn}</td>
                    <td>{c.orderBy}</td>
                    <td className="ref-days-cell">{c.daysLeft} days</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* ── Line Chart + Revenue Donut + Category Performance Table ── */}
        <div className="ref-charts-row">
          {/* Line Chart */}
          <div className="ref-card ref-line-chart-card">
            <div className="ref-card-header">
              <h3 className="ref-card-title">Orders Over Time</h3>
              <div className="ref-freq-btns">
                {['Daily', 'Weekly', 'Monthly'].map(f => (
                  <button
                    key={f}
                    className={`ref-freq-btn${chartFreq === f ? ' active' : ''}`}
                    onClick={() => setChartFreq(f)}
                  >{f}</button>
                ))}
              </div>
            </div>
            <ResponsiveContainer width="100%" height={195}>
              <LineChart data={dynChartData} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="day" tick={{ fontSize: 10, fill: '#94a3b8', fontWeight: 600 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 10, fill: '#94a3b8', fontWeight: 600 }} axisLine={false} tickLine={false} tickFormatter={v => v >= 1000 ? (v / 1000) + 'K' : v} />
                <Tooltip content={<LineTooltip />} />
                <Legend iconType="circle" iconSize={8} wrapperStyle={{ fontSize: 11, paddingTop: 6, fontWeight: 600 }} />
                <Line type="monotone" dataKey="total"     name="Total Orders" stroke="#3b82f6" strokeWidth={2.5} dot={false} />
                <Line type="monotone" dataKey="confirmed" name="Confirmed"    stroke="#22c55e" strokeWidth={2.5} dot={false} />
                <Line type="monotone" dataKey="pending"   name="Pending"      stroke="#f59e0b" strokeWidth={2.5} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Revenue by Category Donut */}
          <DonutCard
            title="Revenue by Category"
            data={[
              { name: 'Electronics',   value: Math.floor(86500 * m),  color: '#3b82f6', pct: '48.0%' },
              { name: 'Home & Garden', value: Math.floor(52300 * m),  color: '#22c55e', pct: '29.1%' },
              { name: 'Clothing',      value: Math.floor(28400 * m),  color: '#ec4899', pct: '15.8%' },
              { name: 'Food & Bev.',   value: Math.floor(12800 * m),  color: '#f59e0b', pct: '7.1%'  },
            ]}
            centerValue={'₹' + fmtNum(Math.floor(180000 * m))}
            centerLabel="Total Revenue"
          />

          {/* Category Performance */}
          <div className="ref-card ref-reward-perf-card">
            <div className="ref-card-header">
              <h3 className="ref-card-title">Category Performance</h3>
            </div>
            <div style={{ overflowX: 'auto', width: '100%' }}>
              <table className="ref-reward-table" style={{ width: '100%', borderCollapse: 'collapse', minWidth: '450px' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
                    <th style={{ padding: '12px 16px', textAlign: 'left', fontSize: '13px', color: '#1e3a8a', fontWeight: 700 }}>Category</th>
                    <th className="text-center" style={{ padding: '12px 16px', fontSize: '13px', color: '#1e3a8a', fontWeight: 700 }}>Total Orders</th>
                    <th className="text-center" style={{ padding: '12px 16px', fontSize: '13px', color: '#1e3a8a', fontWeight: 700 }}>Delivered</th>
                    <th className="text-center" style={{ padding: '12px 16px', fontSize: '13px', color: '#1e3a8a', fontWeight: 700 }}>Revenue</th>
                    <th style={{ padding: '12px 16px', textAlign: 'right', fontSize: '13px', color: '#1e3a8a', fontWeight: 700, whiteSpace: 'nowrap' }}>% Share</th>
                  </tr>
                </thead>
                <tbody>
                  {dynCatPerf.map((r, i) => (
                    <tr key={r.type} style={{ borderBottom: i === dynCatPerf.length - 1 ? 'none' : '1px solid #e2e8f0' }}>
                      <td style={{ padding: '14px 16px', fontWeight: 700, color: '#0f172a', fontSize: '13px', whiteSpace: 'nowrap' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: r.color }} />
                          {r.type}
                        </div>
                      </td>
                      <td className="text-center" style={{ padding: '14px 16px', fontSize: '13px', fontWeight: 600 }}>{r.total}</td>
                      <td className="text-center" style={{ padding: '14px 16px', fontSize: '13px', fontWeight: 600 }}>{r.delivered}</td>
                      <td className="text-center" style={{ padding: '14px 16px', fontSize: '13px', fontWeight: 600 }}>₹{fmtNum(r.revenue)}</td>
                      <td style={{ padding: '14px 16px', verticalAlign: 'middle', whiteSpace: 'nowrap' }}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '12px' }}>
                          <div style={{ width: '80px', height: '10px', borderRadius: '10px', background: '#f1f5f9', overflow: 'hidden' }}>
                            <div style={{ width: `${r.pct}%`, height: '100%', borderRadius: '10px', background: r.color }} />
                          </div>
                          <span style={{ fontSize: '13px', fontWeight: 700, color: '#1e3a8a', minWidth: '40px', textAlign: 'right' }}>
                            {r.pct.toFixed(1)}%
                          </span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* ── Orders Performance Table ── */}
        <div className="ref-card ref-main-table-card">
          <div className="ref-card-header">
            <h3 className="ref-card-title">Orders Performance</h3>
          </div>
          <div className="ref-table-scroll">
            <table className="ref-main-table">
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Ordered By</th>
                  <th>Customer Name</th>
                  <th>Category</th>
                  <th>Status</th>
                  <th colSpan={3} style={{ textAlign: 'center' }}>Order Counts</th>
                  <th>Product</th>
                  <th>Amount</th>
                  <th>Scheduled On</th>
                  <th>Created On</th>
                  <th>Actions</th>
                </tr>
                <tr className="ref-sub-header">
                  <th colSpan={5}></th>
                  <th>Customers</th>
                  <th>Partners</th>
                  <th>Total</th>
                  <th colSpan={5}></th>
                </tr>
              </thead>
              <tbody>
                {dynOrdersPerf.map((r, i) => (
                  <tr key={i}>
                    <td className="ref-code-bold">{r.id}</td>
                    <td>{r.orderedBy}</td>
                    <td className="ref-name-bold">{r.name}</td>
                    <td>{r.category}</td>
                    <td><StatusBadge status={r.status} /></td>
                    <td className="ref-num-cell">{r.custOrders}</td>
                    <td className="ref-num-cell">{r.partOrders}</td>
                    <td className="ref-num-cell ref-total-bold">{r.total}</td>
                    <td>{r.product}</td>
                    <td className="ref-earned-cell">{r.amount}</td>
                    <td className="ref-date-cell">{r.scheduledOn}</td>
                    <td className="ref-date-cell">{r.created}</td>
                    <td>
                      <button className="ref-action-btn">
                        <Eye size={12} color="#2563eb" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {/* Pagination */}
          <div className="ref-pagination">
            <button className="ref-page-btn ref-page-arrow"><ChevronLeft size={13} /></button>
            {[1, 2, 3, '...', 5].map((p, i) => (
              <button key={i} className={`ref-page-btn${p === 1 ? ' active' : ''}`}>{p}</button>
            ))}
            <button className="ref-page-btn ref-page-arrow"><ChevronRight size={13} /></button>
            <span className="ref-page-info">312 total pages</span>
          </div>
        </div>

      </div>

      {/* ── View All Modal ── */}
      {viewAllModal && (
        <div className="ref-modal-overlay" onClick={() => setViewAllModal(null)}>
          <div className="ref-modal-content" onClick={e => e.stopPropagation()}>
            <div className="ref-modal-header">
              <h3 className="ref-modal-title">{viewAllModal.title}</h3>
              <button className="ref-modal-close" onClick={() => setViewAllModal(null)}>
                <XCircle size={20} />
              </button>
            </div>
            <div className="ref-modal-body">
              <table className="ref-modal-table">
                {viewAllModal.type === 'customers' && (
                  <>
                    <thead><tr><th>Rank</th><th>Customer Name</th><th>Orders</th></tr></thead>
                    <tbody>
                      {dynTopCustomers.map(u => (
                        <tr key={u.rank}>
                          <td>{u.rank}</td>
                          <td style={{ fontWeight: 600, color: '#1e40af' }}>{u.name}</td>
                          <td style={{ fontWeight: 700 }}>{u.orders}</td>
                        </tr>
                      ))}
                    </tbody>
                  </>
                )}
                {viewAllModal.type === 'partners' && (
                  <>
                    <thead><tr><th>Rank</th><th>Partner Name</th><th>Orders</th></tr></thead>
                    <tbody>
                      {dynTopPartners.map(u => (
                        <tr key={u.rank}>
                          <td>{u.rank}</td>
                          <td style={{ fontWeight: 600, color: '#5b21b6' }}>{u.name}</td>
                          <td style={{ fontWeight: 700 }}>{u.orders}</td>
                        </tr>
                      ))}
                    </tbody>
                  </>
                )}
                {viewAllModal.type === 'categories' && (
                  <>
                    <thead><tr><th>Rank</th><th>Category</th><th>Cust. Orders</th><th>Part. Orders</th><th>Total</th></tr></thead>
                    <tbody>
                      {dynTopCategories.map(u => (
                        <tr key={u.rank}>
                          <td>{u.rank}</td>
                          <td style={{ fontWeight: 600, color: '#9a3412' }}>{u.name}</td>
                          <td>{u.custOrders}</td>
                          <td>{u.partOrders}</td>
                          <td style={{ fontWeight: 700 }}>{u.total}</td>
                        </tr>
                      ))}
                    </tbody>
                  </>
                )}
              </table>
            </div>
          </div>
        </div>
      )}
    </AdminShell>
  );
}