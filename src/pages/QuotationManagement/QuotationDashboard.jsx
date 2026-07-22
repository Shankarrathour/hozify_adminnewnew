import React, { useState } from 'react';
import {
  FileText, CheckCircle, XCircle, Clock, Users, User, Briefcase, Star,
  Eye, ChevronDown, Download, ChevronRight, ChevronLeft, Search, X, Zap, ArrowUpRight
} from 'lucide-react';
import AdminShell from '../../components/layouts/AdminShell';
import { useToast } from '../../components/common/ToastNotification';
import {
  LineChart, Line, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';

/* ─────────────────── Mock Data ─────────────────── */

const quotationsOverTime = [
  { day: '01 May', total: 1200, b2c: 800, b2b: 400 },
  { day: '05 May', total: 1500, b2c: 1000, b2b: 500 },
  { day: '10 May', total: 2100, b2c: 1400, b2b: 700 },
  { day: '15 May', total: 2400, b2c: 1600, b2b: 800 },
  { day: '20 May', total: 2800, b2c: 1900, b2b: 900 },
  { day: '25 May', total: 3200, b2c: 2100, b2b: 1100 },
  { day: '31 May', total: 3600, b2c: 2500, b2b: 1100 },
];

const genByDist = [
  { name: 'B2C Direct',   value: 1245, color: '#22c55e', pct: '48.5%' },
  { name: 'B2B Partner',  value: 892,  color: '#3b82f6', pct: '34.7%' },
  { name: 'Sales Team',   value: 431,  color: '#8b5cf6', pct: '16.8%' },
];

const usedByDist = [
  { name: 'Approved',   value: 6125, color: '#3b82f6', pct: '70.8%' },
  { name: 'Unconverted', value: 2517, color: '#22c55e', pct: '29.1%' },
];

const statusDist = [
  { name: 'Approved',        value: 1842, color: '#22c55e', pct: '71.7%' },
  { name: 'Rejected',        value: 562,  color: '#ef4444', pct: '21.9%' },
  { name: 'Going to Expire', value: 164,  color: '#f59e0b', pct: '6.4%'  },
];

const rewardDist = [
  { name: 'Standard (0-10%)', value: 4125, color: '#3b82f6', pct: '47.7%' },
  { name: 'Special (10-20%)', value: 2653, color: '#22c55e', pct: '30.7%' },
  { name: 'Bulk (20%+)',      value: 1256, color: '#8b5cf6', pct: '14.5%' },
  { name: 'Custom Deal',      value: 608,  color: '#f59e0b', pct: '7.0%'  },
];

const expiringQuotes = [
  { code: 'QTN-98462', expires: '05 Jun 2026', generatedBy: 'B2C Customer', daysLeft: 3, danger: true, category: 'AC Repair' },
  { code: 'QTN-75663', expires: '06 Jun 2026', generatedBy: 'B2B Partner',  daysLeft: 4, danger: true, category: 'Plumbing' },
  { code: 'QTN-14487', expires: '07 Jun 2026', generatedBy: 'Sales Rep',    daysLeft: 5, danger: false, category: 'Electrical' },
  { code: 'QTN-16219', expires: '08 Jun 2026', generatedBy: 'B2C Customer', daysLeft: 6, danger: false, category: 'Cleaning' },
  { code: 'QTN-18351', expires: '09 Jun 2026', generatedBy: 'B2B Partner',  daysLeft: 7, danger: false, category: 'Pest Control' },
];

const topServicesB2C = [
  { rank: 1, name: 'AC Service & Repair', quotes: 142 },
  { rank: 2, name: 'Bathroom Deep Clean',  quotes: 98  },
  { rank: 3, name: 'Home Full Electrical', quotes: 75  },
  { rank: 4, name: 'Full House Painting',  quotes: 64  },
  { rank: 5, name: 'Kitchen Plumbing Fix', quotes: 52  },
];

const topPartnersB2B = [
  { rank: 1, name: 'Tech Revive Solutions', quotes: 68 },
  { rank: 2, name: 'QuickFix Services',     quotes: 47 },
  { rank: 3, name: 'Home Care Pro',         quotes: 39 },
  { rank: 4, name: 'Service Hub India',     quotes: 31 },
  { rank: 5, name: 'Bright Services',       quotes: 27 },
];

const topSalesReps = [
  { rank: 1, name: 'Rahul Verma',    uRef: 218, pRef: 108, tRef: 326 },
  { rank: 2, name: 'Neha Sharma',    uRef: 164, pRef: 77,  tRef: 241 },
  { rank: 3, name: 'Amitabh Kumar',  uRef: 131, pRef: 58,  tRef: 189 },
  { rank: 4, name: 'Pooja Hegde',    uRef: 104, pRef: 49,  tRef: 153 },
  { rank: 5, name: 'Vikramaditya',   uRef: 86,  pRef: 41,  tRef: 127 },
];

const quotationPerformance = [
  { type: 'Standard (0-10%)', total: 856, used: 732, usage: '₹41,25,000', pct: 47.7, color: '#3b82f6' },
  { type: 'Special (10-20%)', total: 642, used: 521, usage: '₹26,53,000', pct: 30.7, color: '#22c55e' },
  { type: 'Bulk (20%+)',      total: 412, used: 298, usage: '₹12,56,000', pct: 14.5, color: '#8b5cf6' },
  { type: 'Custom Deal',      total: 218, used: 144, usage: '₹6,08,000',  pct: 7.0,  color: '#f59e0b' },
];

const quotationsListing = [
  { code: 'QTN-98462', genBy: 'B2C Customer', name: 'Ramesh Kumar',       type: 'B2C',       status: 'Approved',        users: 18, partners: 7,  total: 25, reward: 'Standard', earned: '₹4,500.00', expires: '05 Jun 2026', created: '05 May 2026' },
  { code: 'QTN-75663', genBy: 'B2B Partner',  name: 'Suresh Electricals', type: 'B2B',       status: 'Approved',        users: 32, partners: 13, total: 45, reward: 'Special',  earned: '₹12,000.00', expires: '06 Jun 2026', created: '06 May 2026' },
  { code: 'QTN-14487', genBy: 'Sales Rep',    name: 'Tech Review Hub',    type: 'Direct',    status: 'Going to Expire', users: 60, partners: 18, total: 78, reward: 'Standard', earned: '₹8,900.00',  expires: '07 Jun 2026', created: '07 May 2026' },
  { code: 'QTN-16219', genBy: 'B2C Customer', name: 'Priya Sharma',       type: 'B2C',       status: 'Rejected',        users: 9,  partners: 1,  total: 10, reward: 'Bulk',     earned: '₹2,100.00',  expires: '08 Jun 2026', created: '08 May 2026' },
  { code: 'QTN-18351', genBy: 'B2B Partner',  name: 'QuickFix Services',  type: 'B2B',       status: 'Approved',        users: 24, partners: 12, total: 36, reward: 'Custom',   earned: '₹15,400.00', expires: '09 Jun 2026', created: '09 May 2026' },
  { code: 'QTN-21094', genBy: 'B2C Customer', name: 'Anil Verma',         type: 'B2C',       status: 'Approved',        users: 14, partners: 3,  total: 17, reward: 'Standard', earned: '₹3,200.00',  expires: '12 Jun 2026', created: '10 May 2026' },
  { code: 'QTN-24105', genBy: 'Sales Rep',    name: 'Metropolis Infra',   type: 'Direct',    status: 'Approved',        users: 45, partners: 20, total: 65, reward: 'Custom',   earned: '₹45,000.00', expires: '15 Jun 2026', created: '12 May 2026' },
];

/* ─────────────────── Helpers ─────────────────── */

function fmtNum(n) {
  if (n >= 1_000_000) return (n / 1_000_000).toFixed(1) + 'M';
  if (n >= 1_000) return n.toLocaleString();
  return String(n);
}

function StatusBadge({ status }) {
  const map = {
    'Approved':        { bg: '#f0fdf4', color: '#16a34a' },
    'Rejected':        { bg: '#fff1f2', color: '#dc2626' },
    'Going to Expire': { bg: '#fffbeb', color: '#d97706' },
    'Active':          { bg: '#f0fdf4', color: '#16a34a' },
    'Inactive':        { bg: '#fff1f2', color: '#dc2626' }
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

export default function QuotationDashboard({ activeTab = 'Quotation Dashboard' }) {
  const { addToast } = useToast();
  const [period, setPeriod]       = useState('Monthly');
  const [chartFreq, setChartFreq] = useState('Daily');
  const [viewAllModal, setViewAllModal] = useState(null);
  const [filterTrigger, setFilterTrigger] = useState(0);
  const [modalSearch, setModalSearch] = useState('');

  const m = filterTrigger === 0 ? 1 : 1 + ((filterTrigger % 5) * 0.15);

  const dynTopKpis = [
    { label: 'Total Quotations Generated', value: Math.floor(2568 * m), sub: '↑ 18.6% vs Apr 2026', trend: 'up', icon: FileText,    iconColor: '#8b5cf6', iconBg: '#f5f3ff' },
    { label: 'Approved Quotations',        value: Math.floor(1842 * m), sub: '71.7% of total ↑ 12.5%', trend: 'up', icon: CheckCircle, iconColor: '#22c55e', iconBg: '#f0fdf4' },
    { label: 'Declined / Rejected',        value: Math.floor(562 * m),  sub: '21.9% of total ↓ 5.8%',  trend: 'down', icon: XCircle,   iconColor: '#ef4444', iconBg: '#fff1f2' },
    { label: 'Pending Approval',           value: Math.floor(164 * m),  sub: '6.4% of total',           trend: 'neutral', icon: Clock,  iconColor: '#f59e0b', iconBg: '#fffbeb' },
    { label: 'Total Quotation Value',      value: '₹' + Math.floor(86420 * m).toLocaleString(), sub: '↑ 22.4% vs Apr 2026', trend: 'up', icon: Users, iconColor: '#3b82f6', iconBg: '#eff6ff' },
    { label: 'B2C Direct Quotations',      value: Math.floor(6125 * m), sub: '70.8% of total',          trend: 'neutral', icon: User,  iconColor: '#22c55e', iconBg: '#f0fdf4' },
    { label: 'B2B Enterprise Quotes',      value: Math.floor(2517 * m), sub: '29.1% of total',          trend: 'neutral', icon: Briefcase, iconColor: '#8b5cf6', iconBg: '#f5f3ff' },
    { label: 'Custom Enterprise Deals', isCustom: true, icon: Star, iconColor: '#f59e0b', iconBg: '#fffbeb' },
  ];

  const dynSubKpis = [
    { label: 'B2C Direct Quotes',      value: Math.floor(1245 * m), sub: '48.5% of total', unused: Math.floor(312 * m), unusedPct: '25.1%', icon: User,      iconColor: '#3b82f6', iconBg: '#eff6ff' },
    { label: 'B2B Partner Quotes',     value: Math.floor(892 * m),  sub: '34.7% of total', unused: Math.floor(213 * m), unusedPct: '23.9%', icon: Briefcase, iconColor: '#8b5cf6', iconBg: '#f5f3ff' },
    { label: 'Sales Team Quotes',      value: Math.floor(431 * m),  sub: '16.8% of total', unused: Math.floor(97 * m),  unusedPct: '22.5%', icon: Star,      iconColor: '#f59e0b', iconBg: '#fffbeb' },
  ];

  const dynGenByDist = genByDist.map(k => ({ ...k, value: Math.floor(k.value * m) }));
  const dynUsedByDist = usedByDist.map(k => ({ ...k, value: Math.floor(k.value * m) }));
  const dynStatusDist = statusDist.map(k => ({ ...k, value: Math.floor(k.value * m) }));
  const dynRewardDist = rewardDist.map(k => ({ ...k, value: Math.floor(k.value * m) }));
  const dynRewardPerf = quotationPerformance.map(r => ({ ...r, total: Math.floor(r.total * m), used: Math.floor(r.used * m) }));
  const dynCodesPerf = quotationsListing.map(c => ({
    ...c,
    users: Math.floor(c.users * m),
    partners: Math.floor(c.partners * m),
    total: Math.floor(c.total * m),
  }));
  
  const dynTopServices = topServicesB2C.map(u => ({ ...u, quotes: Math.floor(u.quotes * m) }));
  const dynTopPartners = topPartnersB2B.map(u => ({ ...u, quotes: Math.floor(u.quotes * m) }));
  const dynTopSalesReps = topSalesReps.map(u => ({ ...u, uRef: Math.floor(u.uRef * m), pRef: Math.floor(u.pRef * m), tRef: Math.floor(u.tRef * m) }));

  const chartDataWeekly = [
    { day: 'Week 1', total: 8400, b2c: 5600, b2b: 2800 },
    { day: 'Week 2', total: 10500, b2c: 7000, b2b: 3500 },
    { day: 'Week 3', total: 14700, b2c: 9800, b2b: 4900 },
    { day: 'Week 4', total: 16800, b2c: 11200, b2b: 5600 },
  ];
  const chartDataMonthly = [
    { day: 'Jan', total: 40000, b2c: 30000, b2b: 10000 },
    { day: 'Feb', total: 45000, b2c: 32000, b2b: 13000 },
    { day: 'Mar', total: 52000, b2c: 38000, b2b: 14000 },
    { day: 'Apr', total: 61000, b2c: 45000, b2b: 16000 },
    { day: 'May', total: 86420, b2c: 61250, b2b: 25170 },
  ];
  
  const dynChartData = (chartFreq === 'Weekly' ? chartDataWeekly : chartFreq === 'Monthly' ? chartDataMonthly : quotationsOverTime).map(d => ({
    ...d,
    total: Math.floor(d.total * m),
    b2c: Math.floor(d.b2c * m),
    b2b: Math.floor(d.b2b * m)
  }));

  return (
    <AdminShell showGlobalExport={true} activeTab={activeTab} headerTitle="Quotation Dashboard" searchPlaceholder="Search quotations, customers...">
      <div className="ref-dash-root">

        {/* ── Filter Bar ── */}
        <div className="ref-filter-bar">
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
                  {['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'].map(m => (
                    <option key={m}>{m}</option>
                  ))}
                </select>
                <ChevronDown size={12} className="ref-select-arrow" />
              </div>
            </div>

            <div className="ref-filter-group" style={{ minWidth: '90px' }}>
              <label>Year</label>
              <div className="ref-select-wrap">
                <select className="ref-select ref-select-sm">
                  {['2026','2027','2028','2029','2030'].map(y => (
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

          <div className="ref-filter-row">
            <div className="ref-filter-group ref-filter-group-wide">
              <label>Quotation Type</label>
              <div className="ref-select-wrap">
                <select className="ref-select">
                  {['All','B2C Direct','B2B Partner','Sales Rep Direct'].map(o => <option key={o}>{o}</option>)}
                </select>
                <ChevronDown size={12} className="ref-select-arrow" />
              </div>
            </div>

            <div className="ref-filter-group ref-filter-group-wide">
              <label>Service Category</label>
              <div className="ref-select-wrap">
                <select className="ref-select">
                  {['All','AC Repair','Plumbing','Electrical','Cleaning','Pest Control'].map(o => <option key={o}>{o}</option>)}
                </select>
                <ChevronDown size={12} className="ref-select-arrow" />
              </div>
            </div>

            <div className="ref-filter-divider" />

            <div className="ref-filter-group ref-filter-group-wide">
              <label>Discount Slab</label>
              <div className="ref-select-wrap">
                <select className="ref-select">
                  {['All','Standard (0-10%)','Special (10-20%)','Bulk (20%+)','Custom Deal'].map(o => <option key={o}>{o}</option>)}
                </select>
                <ChevronDown size={12} className="ref-select-arrow" />
              </div>
            </div>

            <div className="ref-filter-group ref-filter-group-wide">
              <label>Quotation Status</label>
              <div className="ref-select-wrap">
                <select className="ref-select">
                  {['All','Approved','Rejected','Going to Expire'].map(o => <option key={o}>{o}</option>)}
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
                    <div className="ref-kpi-value">{typeof k.value === 'number' ? fmtNum(k.value) : k.value}</div>
                    <div className={`ref-kpi-sub${k.trend === 'up' ? ' up' : k.trend === 'down' ? ' down' : ''}`}>
                      {k.sub}
                    </div>
                  </>
                ) : (
                  <div className="ref-kpi-influencer">
                    <div className="ref-kpi-inf-row">
                      <span className="ref-kpi-inf-label">B2C Quotes</span>
                      <span className="ref-kpi-inf-val">1,136 <span className="ref-kpi-inf-pct">(63.1%)</span></span>
                    </div>
                    <div className="ref-kpi-inf-row">
                      <span className="ref-kpi-inf-label">B2B Quotes</span>
                      <span className="ref-kpi-inf-val">662 <span className="ref-kpi-inf-pct">(36.9%)</span></span>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* ── Sub KPIs + Top Performers ── */}
        <div className="ref-mid-row">
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
                    <div className="ref-sub-kpi-unused-label">Unconverted Quotes</div>
                    <div className="ref-sub-kpi-unused-val">{k.unused}</div>
                    <div className="ref-sub-kpi-unused-sub">({k.unusedPct} of total)</div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="ref-top-performers">
            <h3 className="ref-card-title" style={{ marginBottom: '12px', fontSize: '13px' }}>Top Quotation Statistics</h3>
            <div className="ref-performers-grid">
              
              <div className="ref-perf-card">
                <div className="ref-performer-header">
                  <span className="ref-performer-title">
                    <div style={{ width: 24, height: 24, borderRadius: '50%', background: '#dcfce7', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <User size={12} color="#22c55e" />
                    </div>
                    Top B2C Services
                  </span>
                  <button className="ref-view-all-link" onClick={() => setViewAllModal({ type: 'services', title: 'Top B2C Services Requested' })}>View All</button>
                </div>
                <table className="ref-perf-table">
                  <thead>
                    <tr>
                      <th>Rank</th>
                      <th>Service Name</th>
                      <th>Quotes Generated</th>
                    </tr>
                  </thead>
                  <tbody>
                    {dynTopServices.map(u => (
                      <tr key={u.rank}>
                        <td>{u.rank}</td>
                        <td className="ref-perf-name">{u.name}</td>
                        <td className="ref-perf-num">{u.quotes}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="ref-perf-card">
                <div className="ref-performer-header">
                  <span className="ref-performer-title">
                    <div style={{ width: 24, height: 24, borderRadius: '50%', background: '#eff6ff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Briefcase size={12} color="#3b82f6" />
                    </div>
                    Top B2B Partners
                  </span>
                  <button className="ref-view-all-link" onClick={() => setViewAllModal({ type: 'partners', title: 'Top B2B Corporate Partners' })}>View All</button>
                </div>
                <table className="ref-perf-table">
                  <thead>
                    <tr>
                      <th>Rank</th>
                      <th>Partner Name</th>
                      <th>Quotes Issued</th>
                    </tr>
                  </thead>
                  <tbody>
                    {dynTopPartners.map(p => (
                      <tr key={p.rank}>
                        <td>{p.rank}</td>
                        <td className="ref-perf-name">{p.name}</td>
                        <td className="ref-perf-num">{p.quotes}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="ref-perf-card">
                <div className="ref-performer-header">
                  <span className="ref-performer-title">
                    <div style={{ width: 24, height: 24, borderRadius: '50%', background: '#fffbeb', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Star size={12} color="#f59e0b" />
                    </div>
                    Top Sales Representatives
                  </span>
                  <button className="ref-view-all-link" onClick={() => setViewAllModal({ type: 'sales', title: 'Top Sales Representatives' })}>View All</button>
                </div>
                <table className="ref-perf-table">
                  <thead>
                    <tr>
                      <th>Rank</th>
                      <th>Sales Rep</th>
                      <th>Quotes</th>
                    </tr>
                  </thead>
                  <tbody>
                    {dynTopSalesReps.map(inf => (
                      <tr key={inf.rank}>
                        <td>{inf.rank}</td>
                        <td className="ref-perf-name">{inf.name}</td>
                        <td className="ref-perf-num">{inf.tRef}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

            </div>
          </div>
        </div>

        {/* ── Main Charts Grid ── */}
        <div className="ref-charts-grid">
          <div className="ref-card ref-line-chart-card">
            <div className="ref-card-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3 className="ref-card-title">Quotation Volume Over Time</h3>
              <div className="ref-freq-toggle">
                {['Daily', 'Weekly', 'Monthly'].map(f => (
                  <button
                    key={f}
                    className={`ref-freq-btn${chartFreq === f ? ' active' : ''}`}
                    onClick={() => setChartFreq(f)}
                  >{f}</button>
                ))}
              </div>
            </div>
            <div style={{ height: 210, width: '100%', marginTop: 8 }}>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={dynChartData} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="day" tick={{ fontSize: 10, fill: '#64748b' }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 10, fill: '#64748b' }} axisLine={false} tickLine={false} tickFormatter={fmtNum} />
                  <Tooltip content={<LineTooltip />} />
                  <Line type="monotone" dataKey="total" name="Total Quotes" stroke="#8b5cf6" strokeWidth={2.5} dot={false} />
                  <Line type="monotone" dataKey="b2c"   name="B2C Quotes"   stroke="#22c55e" strokeWidth={2}   dot={false} />
                  <Line type="monotone" dataKey="b2b"   name="B2B Quotes"   stroke="#3b82f6" strokeWidth={2}   dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          <DonutCard title="Quotation Source Distribution" data={dynGenByDist} centerValue={fmtNum(2568*m)} centerLabel="TOTAL GENERATED" />
          <DonutCard title="Converted vs Unconverted"    data={dynUsedByDist} centerValue={fmtNum(8642*m)} centerLabel="TOTAL QUOTES" />
          <DonutCard title="Quotation Status"             data={dynStatusDist} centerValue={fmtNum(2568*m)} centerLabel="TOTAL GENERATED" />
          <DonutCard title="Discount Slab Breakdown"      data={dynRewardDist} centerValue={fmtNum(8642*m)} centerLabel="TOTAL USAGE" />
        </div>

        {/* ── Expiring Quotations + Discount Performance ── */}
        <div className="ref-bottom-grid">
          <div className="ref-card ref-expiring-card">
            <div className="ref-card-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3 className="ref-card-title">Expiring Quotations</h3>
              <button className="ref-view-all-link" onClick={() => setViewAllModal({ type: 'expiring', title: 'All Expiring Quotations' })}>View All</button>
            </div>
            <table className="ref-expiring-table">
              <thead>
                <tr>
                  <th>Quote ID</th>
                  <th>Category</th>
                  <th>Source</th>
                  <th>Expiry Date</th>
                </tr>
              </thead>
              <tbody>
                {expiringQuotes.map((c, i) => (
                  <tr key={i}>
                    <td className="ref-code-cell">{c.code}</td>
                    <td>{c.category}</td>
                    <td className="ref-gen-by">{c.generatedBy}</td>
                    <td>
                      <span className={`ref-days-tag${c.danger ? ' danger' : ''}`}>
                        {c.expires} ({c.daysLeft}d left)
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="ref-card ref-perf-summary-card">
            <div className="ref-card-header">
              <h3 className="ref-card-title">Discount & Slab Performance Summary</h3>
            </div>
            <table className="ref-summary-table">
              <thead>
                <tr>
                  <th>Slab / Type</th>
                  <th>Total Quotes</th>
                  <th>Converted</th>
                  <th>Quotation Value</th>
                  <th>Conversion %</th>
                </tr>
              </thead>
              <tbody>
                {dynRewardPerf.map((r, i) => (
                  <tr key={i}>
                    <td>
                      <span className="ref-type-dot" style={{ background: r.color }} />
                      <strong style={{ color: '#0f172a' }}>{r.type}</strong>
                    </td>
                    <td>{r.total}</td>
                    <td>{r.used}</td>
                    <td><strong>{r.usage}</strong></td>
                    <td><span className="ref-pct-badge" style={{ background: r.color + '18', color: r.color }}>{r.pct}%</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* ── Detailed Quotations Table ── */}
        <div className="ref-card ref-codes-card" style={{ marginBottom: 24 }}>
          <div className="ref-card-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h3 className="ref-card-title">Recent Quotation Requests & Status</h3>
            <button className="ref-view-all-link" onClick={() => setViewAllModal({ type: 'all_quotes', title: 'All Quotations Listing' })}>View All Records</button>
          </div>
          <div style={{ overflowX: 'auto' }}>
            <table className="ref-codes-table">
              <thead>
                <tr>
                  <th>Quote ID</th>
                  <th>Customer / Partner</th>
                  <th>Type</th>
                  <th>Service Category</th>
                  <th>Quote Amount</th>
                  <th>Status</th>
                  <th>Slab</th>
                  <th>Expiry Date</th>
                  <th>Created Date</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {dynCodesPerf.map((r, i) => (
                  <tr key={i}>
                    <td className="ref-code-cell">{r.code}</td>
                    <td style={{ fontWeight: 600 }}>{r.name}</td>
                    <td><span className="ref-gen-tag">{r.type}</span></td>
                    <td>AC Repair</td>
                    <td style={{ fontWeight: 700 }}>{r.earned}</td>
                    <td><StatusBadge status={r.status} /></td>
                    <td>{r.reward}</td>
                    <td style={{ color: '#64748b' }}>{r.expires}</td>
                    <td style={{ color: '#64748b' }}>{r.created}</td>
                    <td>
                      <button className="ref-action-btn" title="View Details" onClick={() => addToast(`Viewing Quote ${r.code}`, 'info')}>
                        <Eye size={13} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* ── VIEW ALL MODAL POPUP ── */}
        {viewAllModal && (
          <div
            onClick={() => setViewAllModal(null)}
            style={{
              position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh',
              background: 'rgba(15, 23, 42, 0.65)', backdropFilter: 'blur(4px)',
              zIndex: 99999, display: 'flex', alignItems: 'center', justifyContent: 'center',
              padding: 20
            }}
          >
            <div
              onClick={e => e.stopPropagation()}
              style={{
                background: '#fff', borderRadius: 16, width: '100%', maxWidth: 1000,
                maxHeight: '85vh', display: 'flex', flexDirection: 'column',
                boxShadow: '0 25px 50px -12px rgba(0,0,0,0.25)', overflow: 'hidden'
              }}
            >
              <div style={{ padding: '18px 24px', borderBottom: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#fafbfc' }}>
                <div>
                  <h3 style={{ margin: 0, fontSize: 16, fontWeight: 700, color: '#0f172a' }}>{viewAllModal.title}</h3>
                  <span style={{ fontSize: 12, color: '#64748b', fontWeight: 500 }}>Comprehensive records breakdown</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div style={{ position: 'relative' }}>
                    <Search size={14} style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
                    <input
                      type="text"
                      placeholder="Search..."
                      value={modalSearch}
                      onChange={e => setModalSearch(e.target.value)}
                      style={{
                        padding: '6px 12px 6px 30px', fontSize: 12, borderRadius: 8,
                        border: '1.5px solid #e2e8f0', outline: 'none', width: 200,
                        fontFamily: 'Inter, sans-serif'
                      }}
                    />
                  </div>
                  <button
                    onClick={() => setViewAllModal(null)}
                    style={{ background: '#f1f5f9', border: 'none', color: '#64748b', borderRadius: '50%', width: 32, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
                  >
                    <X size={16} />
                  </button>
                </div>
              </div>

              <div style={{ padding: 20, overflowY: 'auto', flex: 1 }}>
                <table className="ref-codes-table" style={{ width: '100%' }}>
                  <thead>
                    <tr>
                      <th>ID / Code</th>
                      <th>Name / Source</th>
                      <th>Status / Category</th>
                      <th>Expiry / Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {quotationsListing
                      .filter(r => r.code.toLowerCase().includes(modalSearch.toLowerCase()) || r.name.toLowerCase().includes(modalSearch.toLowerCase()))
                      .map((r, i) => (
                        <tr key={i}>
                          <td className="ref-code-cell">{r.code}</td>
                          <td style={{ fontWeight: 600 }}>{r.name}</td>
                          <td><StatusBadge status={r.status} /></td>
                          <td style={{ color: '#64748b' }}>{r.expires}</td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>

              <div style={{ padding: '12px 24px', borderTop: '1px solid #e2e8f0', background: '#fafbfc', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: 12, color: '#64748b', fontWeight: 500 }}>Showing all records</span>
                <button
                  onClick={() => setViewAllModal(null)}
                  style={{ background: '#0f172a', color: '#fff', border: 'none', borderRadius: 8, padding: '8px 20px', fontSize: 12, fontWeight: 600, cursor: 'pointer' }}
                >Close</button>
              </div>
            </div>
          </div>
        )}

      </div>
    </AdminShell>
  );
}