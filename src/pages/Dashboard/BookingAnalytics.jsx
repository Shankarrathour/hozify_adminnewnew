import React, { useState } from 'react';
import {
  CalendarCheck, CheckCircle, XCircle, Clock, Users, User, Briefcase, Star,
  Eye, ChevronDown, ChevronLeft, ChevronRight, Download, RefreshCcw, DollarSign
} from 'lucide-react';
import AdminShell from '../../components/layouts/AdminShell';
import { useToast } from '../../components/common/ToastNotification';
import {
  LineChart, Line, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';

/* ─────────────────── Mock Data ─────────────────── */

const bookingsOverTime = [
  { day: '01 May', total: 150, completed: 100, pending: 50 },
  { day: '05 May', total: 180, completed: 120, pending: 60 },
  { day: '10 May', total: 240, completed: 180, pending: 60 },
  { day: '15 May', total: 290, completed: 210, pending: 80 },
  { day: '20 May', total: 320, completed: 250, pending: 70 },
  { day: '25 May', total: 380, completed: 310, pending: 70 },
  { day: '31 May', total: 420, completed: 350, pending: 70 },
];

const categoryDist = [
  { name: 'Home Services', value: 1450, color: '#3b82f6', pct: '45.0%' },
  { name: 'Beauty & Salon', value: 950,  color: '#ec4899', pct: '29.5%' },
  { name: 'Cleaning',       value: 820,  color: '#22c55e', pct: '25.5%' },
];

const statusDist = [
  { name: 'Completed', value: 2450, color: '#22c55e', pct: '76.1%' },
  { name: 'Pending',   value: 620,  color: '#f59e0b', pct: '19.2%' },
  { name: 'Cancelled', value: 150,  color: '#ef4444', pct: '4.7%'  },
];

const paymentDist = [
  { name: 'Paid Online',       value: 2150, color: '#22c55e', pct: '66.8%' },
  { name: 'Cash on Delivery',  value: 1070, color: '#f59e0b', pct: '33.2%' },
];

const upcomingBookings = [
  { id: 'BK-98462', expires: '05 Jun 2026', generatedBy: 'User',    daysLeft: 3, danger: true  },
  { id: 'BK-75663', expires: '06 Jun 2026', generatedBy: 'Partner', daysLeft: 4, danger: true  },
  { id: 'BK-14487', expires: '07 Jun 2026', generatedBy: 'User',    daysLeft: 5, danger: false },
  { id: 'BK-16219', expires: '08 Jun 2026', generatedBy: 'Partner', daysLeft: 6, danger: false },
  { id: 'BK-18351', expires: '09 Jun 2026', generatedBy: 'User',    daysLeft: 7, danger: false },
];

const topPerformerUsers = [
  { rank: 1, name: 'Ramesh Kumar',   bookings: 26 },
  { rank: 2, name: 'Vikram Mehta',   bookings: 21 },
  { rank: 3, name: 'Neha Gupta',     bookings: 18 },
  { rank: 4, name: 'Sandeep Sharma', bookings: 15 },
  { rank: 5, name: 'Anjali Verma',   bookings: 12 },
];

const topPerformerPartners = [
  { rank: 1, name: 'Tech Revive Solutions', bookings: 68 },
  { rank: 2, name: 'QuickFix Services',     bookings: 47 },
  { rank: 3, name: 'Home Care Pro',         bookings: 39 },
  { rank: 4, name: 'Service Hub India',     bookings: 31 },
  { rank: 5, name: 'Bright Services',       bookings: 27 },
];

const topPerformerServices = [
  { rank: 1, name: 'Deep Cleaning',  uBookings: 218, pBookings: 108, tBookings: 326 },
  { rank: 2, name: 'AC Repair',      uBookings: 164, pBookings: 77,  tBookings: 241 },
  { rank: 3, name: 'Plumbing',       uBookings: 131, pBookings: 58,  tBookings: 189 },
  { rank: 4, name: 'Hair Cut & Spa', uBookings: 104, pBookings: 49,  tBookings: 153 },
  { rank: 5, name: 'Pest Control',   uBookings: 86,  pBookings: 41,  tBookings: 127 },
];

const servicePerformance = [
  { type: 'Deep Cleaning',  total: 856, completed: 732, revenue: 41250, pct: 47.7, color: '#3b82f6' },
  { type: 'AC Repair',      total: 642, completed: 521, revenue: 26530, pct: 30.7, color: '#22c55e' },
  { type: 'Plumbing',       total: 412, completed: 298, revenue: 12560, pct: 14.5, color: '#f59e0b' },
  { type: 'Hair Cut & Spa', total: 218, completed: 144, revenue: 6080,  pct: 7.0,  color: '#ec4899' },
];

const bookingsPerformance = [
  { id: 'BK-98462', genBy: 'User',    name: 'Ramesh Kumar',       category: 'Home Services', status: 'Completed',      userBookings: 18, partnerBookings: 7,  total: 25, service: 'AC Repair',    amount: '₹1,250.00', expires: '05 Jun 2026', created: '05 May 2026' },
  { id: 'BK-75663', genBy: 'Partner', name: 'Suresh Electricals', category: 'Cleaning',      status: 'Completed',      userBookings: 32, partnerBookings: 13, total: 45, service: 'Deep Cleaning', amount: '₹2,450.00', expires: '06 Jun 2026', created: '06 May 2026' },
  { id: 'BK-14487', genBy: 'User',    name: 'Tech Review Hub',    category: 'Beauty & Salon', status: 'Pending',        userBookings: 60, partnerBookings: 18, total: 78, service: 'Hair Cut & Spa', amount: '₹780.00',   expires: '07 Jun 2026', created: '07 May 2026' },
  { id: 'BK-16219', genBy: 'Partner', name: 'Priya Sharma',       category: 'Home Services', status: 'Cancelled',      userBookings: 9,  partnerBookings: 1,  total: 10, service: 'Plumbing',     amount: '₹100.00',   expires: '08 Jun 2026', created: '08 May 2026' },
  { id: 'BK-18351', genBy: 'User',    name: 'QuickFix Services',  category: 'Cleaning',      status: 'Completed',      userBookings: 24, partnerBookings: 12, total: 36, service: 'Pest Control', amount: '₹1,360.00', expires: '09 Jun 2026', created: '09 May 2026' },
];

/* ─────────────────── Helpers ─────────────────── */

function fmtNum(n) {
  if (n >= 1_000_000) return (n / 1_000_000).toFixed(1) + 'M';
  if (n >= 1_000) return n.toLocaleString();
  return String(n);
}

function StatusBadge({ status }) {
  const map = {
    'Completed': { bg: '#f0fdf4', color: '#16a34a' },
    'Pending':   { bg: '#fffbeb', color: '#d97706' },
    'Cancelled': { bg: '#fff1f2', color: '#dc2626' },
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

export default function BookingAnalytics({ activeTab = 'Bookings Dashboard' }) {
  const { addToast } = useToast();
  const [period, setPeriod]       = useState('Monthly');
  const [chartFreq, setChartFreq] = useState('Daily');
  const [viewAllModal, setViewAllModal] = useState(null);
  const [filterTrigger, setFilterTrigger] = useState(0);

  const m = filterTrigger === 0 ? 1 : 1 + ((filterTrigger % 5) * 0.15);

  const dynTopKpis = [
    { label: 'Total Bookings',      value: Math.floor(3220 * m),  sub: '↑ 18.6% vs Apr 2026',      trend: 'up',      icon: CalendarCheck, iconColor: '#3b82f6', iconBg: '#eff6ff' },
    { label: 'Completed Bookings',  value: Math.floor(2450 * m),  sub: '76.1% of total ↑ 12.5%',  trend: 'up',      icon: CheckCircle,   iconColor: '#22c55e', iconBg: '#f0fdf4' },
    { label: 'Pending Bookings',    value: Math.floor(620 * m),   sub: '19.2% of total ↓ 5.8%',   trend: 'down',    icon: Clock,         iconColor: '#f59e0b', iconBg: '#fffbeb' },
    { label: 'Cancelled Bookings',  value: Math.floor(150 * m),   sub: '4.7% of total',            trend: 'neutral', icon: XCircle,       iconColor: '#ef4444', iconBg: '#fff1f2' },
    { label: 'Total Revenue',       value: Math.floor(105000 * m),sub: '↑ 22.4% vs Apr 2026',      trend: 'up',      icon: DollarSign,    iconColor: '#8b5cf6', iconBg: '#f5f3ff' },
    { label: 'Total Customers',     value: Math.floor(8642 * m),  sub: '↑ 15.2% vs Apr 2026',      trend: 'up',      icon: Users,         iconColor: '#3b82f6', iconBg: '#eff6ff' },
    { label: 'Assigned Bookings',   value: Math.floor(2150 * m),  sub: '66.8% of total',           trend: 'neutral', icon: User,          iconColor: '#22c55e', iconBg: '#f0fdf4' },
    { label: 'Booking Partners', isCustom: true, icon: Briefcase, iconColor: '#f59e0b', iconBg: '#fffbeb' },
  ];

  const dynSubKpis = [
    { label: 'Home Services',  value: Math.floor(1450 * m), sub: '45.0% of total', unused: Math.floor(450 * m), unusedPct: '31.0%', icon: CalendarCheck, iconColor: '#3b82f6', iconBg: '#eff6ff' },
    { label: 'Beauty & Salon', value: Math.floor(950 * m),  sub: '29.5% of total', unused: Math.floor(210 * m), unusedPct: '22.1%', icon: User,          iconColor: '#ec4899', iconBg: '#fdf2f8' },
    { label: 'Cleaning',       value: Math.floor(820 * m),  sub: '25.5% of total', unused: Math.floor(160 * m), unusedPct: '19.5%', icon: Briefcase,     iconColor: '#22c55e', iconBg: '#f0fdf4' },
  ];

  const dynCategoryDist   = categoryDist.map(k => ({ ...k, value: Math.floor(k.value * m) }));
  const dynStatusDist     = statusDist.map(k => ({ ...k, value: Math.floor(k.value * m) }));
  const dynPaymentDist    = paymentDist.map(k => ({ ...k, value: Math.floor(k.value * m) }));
  const dynServicePerf    = servicePerformance.map(r => ({ ...r, total: Math.floor(r.total * m), completed: Math.floor(r.completed * m), revenue: Math.floor(r.revenue * m) }));
  const dynBookingsPerf   = bookingsPerformance.map(c => ({
    ...c,
    userBookings: Math.floor(c.userBookings * m),
    partnerBookings: Math.floor(c.partnerBookings * m),
    total: Math.floor(c.total * m),
  }));

  const dynTopUsers       = topPerformerUsers.map(u => ({ ...u, bookings: Math.floor(u.bookings * m) }));
  const dynTopPartners    = topPerformerPartners.map(u => ({ ...u, bookings: Math.floor(u.bookings * m) }));
  const dynTopServices    = topPerformerServices.map(u => ({ ...u, uBookings: Math.floor(u.uBookings * m), pBookings: Math.floor(u.pBookings * m), tBookings: Math.floor(u.tBookings * m) }));

  const chartDataWeekly = [
    { day: 'Week 1', total: 420, completed: 320, pending: 100 },
    { day: 'Week 2', total: 560, completed: 430, pending: 130 },
    { day: 'Week 3', total: 780, completed: 620, pending: 160 },
    { day: 'Week 4', total: 920, completed: 750, pending: 170 },
  ];
  const chartDataMonthly = [
    { day: 'Jan', total: 2100, completed: 1600, pending: 500 },
    { day: 'Feb', total: 2400, completed: 1850, pending: 550 },
    { day: 'Mar', total: 2800, completed: 2200, pending: 600 },
    { day: 'Apr', total: 3100, completed: 2450, pending: 650 },
    { day: 'May', total: 3220, completed: 2450, pending: 620 },
  ];

  const dynChartData = (chartFreq === 'Weekly' ? chartDataWeekly : chartFreq === 'Monthly' ? chartDataMonthly : bookingsOverTime).map(d => ({
    ...d,
    total:     Math.floor(d.total * m),
    completed: Math.floor(d.completed * m),
    pending:   Math.floor(d.pending * m),
  }));

  return (
    <AdminShell activeTab={activeTab} headerTitle="Bookings Dashboard" searchPlaceholder="Search pages, modules...">
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

          {/* Row 2: Booking-specific filters */}
          <div className="ref-filter-row">
            <div className="ref-filter-group ref-filter-group-wide">
              <label>Booking Category</label>
              <div className="ref-select-wrap">
                <select className="ref-select">
                  {['All','Home Services','Beauty & Salon','Cleaning'].map(o => <option key={o}>{o}</option>)}
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
              <label>Service Type</label>
              <div className="ref-select-wrap">
                <select className="ref-select">
                  {['All','Deep Cleaning','AC Repair','Plumbing','Hair Cut & Spa'].map(o => <option key={o}>{o}</option>)}
                </select>
                <ChevronDown size={12} className="ref-select-arrow" />
              </div>
            </div>

            <div className="ref-filter-group ref-filter-group-wide">
              <label>Booking Status</label>
              <div className="ref-select-wrap">
                <select className="ref-select">
                  {['All','Completed','Pending','Cancelled'].map(o => <option key={o}>{o}</option>)}
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
                      <span className="ref-kpi-inf-label">User Bookings</span>
                      <span className="ref-kpi-inf-val">{fmtNum(Math.floor(6125 * m))} <span className="ref-kpi-inf-pct">(70.8%)</span></span>
                    </div>
                    <div className="ref-kpi-inf-row">
                      <span className="ref-kpi-inf-label">Partner Bookings</span>
                      <span className="ref-kpi-inf-val">{fmtNum(Math.floor(2517 * m))} <span className="ref-kpi-inf-pct">(29.2%)</span></span>
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
                    <div className="ref-sub-kpi-unused-val">{k.unused}</div>
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
              {/* Top Booking Customers */}
              <div className="ref-perf-card">
                <div className="ref-performer-header">
                  <span className="ref-performer-title">
                    <div style={{ width: 24, height: 24, borderRadius: '50%', background: '#dcfce7', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <User size={12} color="#22c55e" />
                    </div>
                    Top Booking Customers
                  </span>
                  <a href="#" className="ref-view-all-link" onClick={(e) => { e.preventDefault(); setViewAllModal({ type: 'users', title: 'Top Booking Customers' }); }}>View All</a>
                </div>
                <table className="ref-perf-table">
                  <thead>
                    <tr>
                      <th>Rank</th>
                      <th>Customer Name</th>
                      <th>Bookings</th>
                    </tr>
                  </thead>
                  <tbody>
                    {dynTopUsers.map(u => (
                      <tr key={u.rank}>
                        <td>{u.rank}</td>
                        <td className="ref-perf-name">{u.name}</td>
                        <td className="ref-perf-num">{u.bookings}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Top Service Partners */}
              <div className="ref-perf-card">
                <div className="ref-performer-header">
                  <span className="ref-performer-title">
                    <div style={{ width: 24, height: 24, borderRadius: '50%', background: '#ede9fe', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Briefcase size={12} color="#8b5cf6" />
                    </div>
                    Top Service Partners
                  </span>
                  <a href="#" className="ref-view-all-link" onClick={(e) => { e.preventDefault(); setViewAllModal({ type: 'partners', title: 'Top Service Partners' }); }}>View All</a>
                </div>
                <table className="ref-perf-table">
                  <thead>
                    <tr>
                      <th>Rank</th>
                      <th>Partner Name</th>
                      <th>Bookings</th>
                    </tr>
                  </thead>
                  <tbody>
                    {dynTopPartners.map(u => (
                      <tr key={u.rank}>
                        <td>{u.rank}</td>
                        <td className="ref-perf-name">{u.name}</td>
                        <td className="ref-perf-num">{u.bookings}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Top Services */}
              <div className="ref-perf-card">
                <div className="ref-performer-header">
                  <span className="ref-performer-title">
                    <div style={{ width: 24, height: 24, borderRadius: '50%', background: '#ffedd5', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Star size={12} color="#f59e0b" />
                    </div>
                    Top Services
                  </span>
                  <a href="#" className="ref-view-all-link" onClick={(e) => { e.preventDefault(); setViewAllModal({ type: 'services', title: 'Top Services' }); }}>View All</a>
                </div>
                <table className="ref-perf-table">
                  <thead>
                    <tr>
                      <th>Rank</th>
                      <th>Service Name</th>
                      <th>User Bkgs</th>
                      <th>Partner Bkgs</th>
                      <th>Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {dynTopServices.map(u => (
                      <tr key={u.rank}>
                        <td>{u.rank}</td>
                        <td className="ref-perf-name">{u.name}</td>
                        <td className="ref-perf-num">{u.uBookings}</td>
                        <td className="ref-perf-num">{u.pBookings}</td>
                        <td className="ref-perf-num">{u.tBookings}</td>
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
            title="Bookings by Category"
            data={dynCategoryDist}
            centerValue={fmtNum(Math.floor(3220 * m))}
            centerLabel="Total Bookings"
          />
          <DonutCard
            title="Booking Status"
            data={dynStatusDist}
            centerValue={fmtNum(Math.floor(3220 * m))}
            centerLabel="Total Bookings"
          />
          <DonutCard
            title="Payment Method"
            data={dynPaymentDist}
            centerValue={fmtNum(Math.floor(3220 * m))}
            centerLabel="Total Bookings"
          />

          {/* Upcoming / Expiring Bookings */}
          <div className="ref-card ref-expire-card">
            <div className="ref-card-header">
              <h3 className="ref-card-title">Upcoming Bookings</h3>
              <a href="#" className="ref-view-all-link">View All</a>
            </div>
            <table className="ref-expire-table">
              <thead>
                <tr>
                  <th>Booking ID</th>
                  <th>Scheduled On</th>
                  <th>Booked By</th>
                  <th>Days Left</th>
                </tr>
              </thead>
              <tbody>
                {upcomingBookings.map(c => (
                  <tr key={c.id}>
                    <td className="ref-code-cell">{c.id}</td>
                    <td>{c.expires}</td>
                    <td>{c.generatedBy}</td>
                    <td className="ref-days-cell">{c.daysLeft} days</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* ── Line Chart + Service Donut + Service Performance Table ── */}
        <div className="ref-charts-row">
          {/* Line Chart */}
          <div className="ref-card ref-line-chart-card">
            <div className="ref-card-header">
              <h3 className="ref-card-title">Bookings Over Time</h3>
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
                <Line type="monotone" dataKey="total"     name="Total Bookings" stroke="#3b82f6" strokeWidth={2.5} dot={false} />
                <Line type="monotone" dataKey="completed" name="Completed"       stroke="#22c55e" strokeWidth={2.5} dot={false} />
                <Line type="monotone" dataKey="pending"   name="Pending"         stroke="#f59e0b" strokeWidth={2.5} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Category Revenue Donut */}
          <DonutCard
            title="Revenue by Category"
            data={[
              { name: 'Home Services', value: Math.floor(45000 * m), color: '#3b82f6', pct: '42.8%' },
              { name: 'Beauty & Salon', value: Math.floor(35000 * m), color: '#ec4899', pct: '33.3%' },
              { name: 'Cleaning', value: Math.floor(25000 * m), color: '#22c55e', pct: '23.9%' },
            ]}
            centerValue={'₹' + fmtNum(Math.floor(105000 * m))}
            centerLabel="Total Revenue"
          />

          {/* Service Performance */}
          <div className="ref-card ref-reward-perf-card">
            <div className="ref-card-header">
              <h3 className="ref-card-title">Service Performance</h3>
            </div>
            <div style={{ overflowX: 'auto', width: '100%' }}>
              <table className="ref-reward-table" style={{ width: '100%', borderCollapse: 'collapse', minWidth: '450px' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
                    <th style={{ padding: '12px 16px', textAlign: 'left', fontSize: '13px', color: '#1e3a8a', fontWeight: 700 }}>Service Type</th>
                    <th className="text-center" style={{ padding: '12px 16px', fontSize: '13px', color: '#1e3a8a', fontWeight: 700 }}>Total Bookings</th>
                    <th className="text-center" style={{ padding: '12px 16px', fontSize: '13px', color: '#1e3a8a', fontWeight: 700 }}>Completed</th>
                    <th className="text-center" style={{ padding: '12px 16px', fontSize: '13px', color: '#1e3a8a', fontWeight: 700 }}>Revenue</th>
                    <th style={{ padding: '12px 16px', textAlign: 'right', fontSize: '13px', color: '#1e3a8a', fontWeight: 700, whiteSpace: 'nowrap' }}>% Share</th>
                  </tr>
                </thead>
                <tbody>
                  {dynServicePerf.map((r, i) => (
                    <tr key={r.type} style={{ borderBottom: i === dynServicePerf.length - 1 ? 'none' : '1px solid #e2e8f0' }}>
                      <td className="ref-reward-type" style={{ padding: '14px 16px', fontWeight: 700, color: '#0f172a', fontSize: '13px', whiteSpace: 'nowrap' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: r.color }} />
                          {r.type}
                        </div>
                      </td>
                      <td className="text-center" style={{ padding: '14px 16px', fontSize: '13px', fontWeight: 600 }}>{r.total}</td>
                      <td className="text-center" style={{ padding: '14px 16px', fontSize: '13px', fontWeight: 600 }}>{r.completed}</td>
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

        {/* ── Bookings Performance Table ── */}
        <div className="ref-card ref-main-table-card">
          <div className="ref-card-header">
            <h3 className="ref-card-title">Bookings Performance</h3>
          </div>
          <div className="ref-table-scroll">
            <table className="ref-main-table">
              <thead>
                <tr>
                  <th>Booking ID</th>
                  <th>Booked By</th>
                  <th>Customer Name</th>
                  <th>Category</th>
                  <th>Status</th>
                  <th colSpan={3} style={{ textAlign: 'center' }}>Booking Counts</th>
                  <th>Service</th>
                  <th>Amount</th>
                  <th>Scheduled On</th>
                  <th>Created On</th>
                  <th>Actions</th>
                </tr>
                <tr className="ref-sub-header">
                  <th colSpan={5}></th>
                  <th>Users</th>
                  <th>Partners</th>
                  <th>Total</th>
                  <th colSpan={5}></th>
                </tr>
              </thead>
              <tbody>
                {dynBookingsPerf.map((r, i) => (
                  <tr key={i}>
                    <td className="ref-code-bold">{r.id}</td>
                    <td>{r.genBy}</td>
                    <td className="ref-name-bold">{r.name}</td>
                    <td>{r.category}</td>
                    <td><StatusBadge status={r.status} /></td>
                    <td className="ref-num-cell">{r.userBookings}</td>
                    <td className="ref-num-cell">{r.partnerBookings}</td>
                    <td className="ref-num-cell ref-total-bold">{r.total}</td>
                    <td>{r.service}</td>
                    <td className="ref-earned-cell">{r.amount}</td>
                    <td className="ref-date-cell">{r.expires}</td>
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
            <span className="ref-page-info">257 total pages</span>
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
                {viewAllModal.type === 'users' && (
                  <>
                    <thead>
                      <tr>
                        <th>Rank</th>
                        <th>Customer Name</th>
                        <th>Bookings</th>
                      </tr>
                    </thead>
                    <tbody>
                      {dynTopUsers.map(u => (
                        <tr key={u.rank}>
                          <td>{u.rank}</td>
                          <td style={{ fontWeight: 600, color: '#1e40af' }}>{u.name}</td>
                          <td style={{ fontWeight: 700 }}>{u.bookings}</td>
                        </tr>
                      ))}
                    </tbody>
                  </>
                )}
                {viewAllModal.type === 'partners' && (
                  <>
                    <thead>
                      <tr>
                        <th>Rank</th>
                        <th>Partner Name</th>
                        <th>Bookings</th>
                      </tr>
                    </thead>
                    <tbody>
                      {dynTopPartners.map(u => (
                        <tr key={u.rank}>
                          <td>{u.rank}</td>
                          <td style={{ fontWeight: 600, color: '#5b21b6' }}>{u.name}</td>
                          <td style={{ fontWeight: 700 }}>{u.bookings}</td>
                        </tr>
                      ))}
                    </tbody>
                  </>
                )}
                {viewAllModal.type === 'services' && (
                  <>
                    <thead>
                      <tr>
                        <th>Rank</th>
                        <th>Service Name</th>
                        <th>User Bookings</th>
                        <th>Partner Bookings</th>
                        <th>Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      {dynTopServices.map(u => (
                        <tr key={u.rank}>
                          <td>{u.rank}</td>
                          <td style={{ fontWeight: 600, color: '#9a3412' }}>{u.name}</td>
                          <td>{u.uBookings}</td>
                          <td>{u.pBookings}</td>
                          <td style={{ fontWeight: 700 }}>{u.tBookings}</td>
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
