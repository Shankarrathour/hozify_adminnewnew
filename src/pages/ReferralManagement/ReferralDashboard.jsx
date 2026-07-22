import React, { useState } from 'react';
import {
  Link, CheckCircle, XCircle, Clock, Users, User, Briefcase, Star,
  Eye, ChevronDown, RefreshCw, Download, ChevronRight, ChevronLeft
} from 'lucide-react';
import AdminShell from '../../components/layouts/AdminShell';
import { useToast } from '../../components/common/ToastNotification';
import {
  LineChart, Line, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';

/* ─────────────────── Mock Data ─────────────────── */

const referralOverTime = [
  { day: '01 May', total: 1200, users: 800, partners: 400 },
  { day: '05 May', total: 1500, users: 1000, partners: 500 },
  { day: '10 May', total: 2100, users: 1400, partners: 700 },
  { day: '15 May', total: 2400, users: 1600, partners: 800 },
  { day: '20 May', total: 2800, users: 1900, partners: 900 },
  { day: '25 May', total: 3200, users: 2100, partners: 1100 },
  { day: '31 May', total: 3600, users: 2500, partners: 1100 },
];

const genByDist = [
  { name: 'Users',       value: 1245, color: '#22c55e', pct: '48.5%' },
  { name: 'Partners',    value: 892,  color: '#3b82f6', pct: '34.7%' },
  { name: 'Influencers', value: 431,  color: '#8b5cf6', pct: '16.8%' },
];

const usedByDist = [
  { name: 'Users',    value: 6125, color: '#3b82f6', pct: '70.8%' },
  { name: 'Partners', value: 2517, color: '#22c55e', pct: '29.1%' },
];

const statusDist = [
  { name: 'Active',          value: 1842, color: '#22c55e', pct: '71.7%' },
  { name: 'Inactive',        value: 562,  color: '#ef4444', pct: '21.9%' },
  { name: 'Going to Expire', value: 164,  color: '#f59e0b', pct: '6.4%'  },
];

const rewardDist = [
  { name: 'Reward1', value: 4125, color: '#3b82f6', pct: '47.7%' },
  { name: 'Reward2', value: 2653, color: '#22c55e', pct: '30.7%' },
  { name: 'Reward3', value: 1256, color: '#8b5cf6', pct: '14.5%' },
  { name: 'Reward4', value: 608,  color: '#f59e0b', pct: '7.0%'  },
];

const expiringCodes = [
  { code: 'HOZ98462', expires: '05 Jun 2026', generatedBy: 'User',       daysLeft: 3, danger: true },
  { code: 'HOZ75663', expires: '06 Jun 2026', generatedBy: 'Partner',    daysLeft: 4, danger: true },
  { code: 'HOZ14487', expires: '07 Jun 2026', generatedBy: 'Influencer', daysLeft: 5, danger: false },
  { code: 'HOZ16219', expires: '08 Jun 2026', generatedBy: 'User',       daysLeft: 6, danger: false },
  { code: 'HOZ18351', expires: '09 Jun 2026', generatedBy: 'Partner',    daysLeft: 7, danger: false },
];

const topPerformerUsers = [
  { rank: 1, name: 'Ramesh Kumar',  referred: 142 },
  { rank: 2, name: 'Suresh Babu',   referred: 98  },
  { rank: 3, name: 'Priya Sharma',  referred: 75  },
  { rank: 4, name: 'Anil Kumar',    referred: 64  },
  { rank: 5, name: 'Kavitha Reddy', referred: 52  },
];

const topPerformerPartners = [
  { rank: 1, name: 'Tech Revive Solutions', referred: 68 },
  { rank: 2, name: 'QuickFix Services',     referred: 47 },
  { rank: 3, name: 'Home Care Pro',         referred: 39 },
  { rank: 4, name: 'Service Hub India',     referred: 31 },
  { rank: 5, name: 'Bright Services',       referred: 27 },
];

const topPerformerInfluencers = [
  { rank: 1, name: 'Tech Talk India',       uRef: 218, pRef: 108, tRef: 326 },
  { rank: 2, name: 'Home Service Guide',    uRef: 164, pRef: 77,  tRef: 241 },
  { rank: 3, name: 'Smart Life Channel',    uRef: 131, pRef: 58,  tRef: 189 },
  { rank: 4, name: 'Fix It With Us',        uRef: 104, pRef: 49,  tRef: 153 },
  { rank: 5, name: 'Daily Deals',           uRef: 86,  pRef: 41,  tRef: 127 },
];

const rewardPerformance = [
  { type: 'Reward1', total: 856, used: 732, usage: 4125, pct: 47.7, color: '#3b82f6' },
  { type: 'Reward2', total: 642, used: 521, usage: 2653, pct: 30.7, color: '#22c55e' },
  { type: 'Reward3', total: 412, used: 298, usage: 1256, pct: 14.5, color: '#8b5cf6' },
  { type: 'Reward4', total: 218, used: 144, usage: 608,  pct: 7.0,  color: '#f59e0b' },
];

const codesPerformance = [
  { code: 'HOZ98462', genBy: 'User',       name: 'Ramesh Kumar',       type: 'User',       status: 'Active',          users: 18, partners: 7,  total: 25, reward: 'Reward1', earned: '₹250.00', expires: '05 Jun 2026', created: '05 May 2026' },
  { code: 'HOZ75663', genBy: 'Partner',    name: 'Suresh Electricals', type: 'Partner',    status: 'Active',          users: 32, partners: 13, total: 45, reward: 'Reward2', earned: '₹450.00', expires: '06 Jun 2026', created: '06 May 2026' },
  { code: 'HOZ14487', genBy: 'Influencer', name: 'Tech Review Hub',    type: 'Influencer', status: 'Going to Expire', users: 60, partners: 18, total: 78, reward: 'Reward1', earned: '₹780.00', expires: '07 Jun 2026', created: '07 May 2026' },
  { code: 'HOZ16219', genBy: 'User',       name: 'Priya Sharma',       type: 'User',       status: 'Inactive',        users: 9,  partners: 1,  total: 10, reward: 'Reward3', earned: '₹100.00', expires: '08 Jun 2026', created: '08 May 2026' },
  { code: 'HOZ18351', genBy: 'Partner',    name: 'QuickFix Services',  type: 'Partner',    status: 'Active',          users: 24, partners: 12, total: 36, reward: 'Reward4', earned: '₹360.00', expires: '09 Jun 2026', created: '09 May 2026' },
];

/* ─────────────────── Helpers ─────────────────── */

function fmtNum(n) {
  if (n >= 1_000_000) return (n / 1_000_000).toFixed(1) + 'M';
  if (n >= 1_000) return n.toLocaleString();
  return String(n);
}

function StatusBadge({ status }) {
  const map = {
    'Active':          { bg: '#f0fdf4', color: '#16a34a' },
    'Inactive':        { bg: '#fff1f2', color: '#dc2626' },
    'Going to Expire': { bg: '#fffbeb', color: '#d97706' },
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

export default function ReferralDashboard({ activeTab = 'Referral Dashboard' }) {
  const { addToast } = useToast();
  const [period, setPeriod]     = useState('Monthly');
  const [chartFreq, setChartFreq] = useState('Daily');
  const [viewAllModal, setViewAllModal] = useState(null);
  const [filterTrigger, setFilterTrigger] = useState(0);

  const m = filterTrigger === 0 ? 1 : 1 + ((filterTrigger % 5) * 0.15); // cycle modifiers

  const dynTopKpis = [
    { label: 'Total Referral Codes Generated', value: Math.floor(2568 * m), sub: '↑ 18.6% vs Apr 2026', trend: 'up', icon: Link,        iconColor: '#8b5cf6', iconBg: '#f5f3ff' },
    { label: 'Active Referral Codes',           value: Math.floor(1842 * m), sub: '71.7% of total ↑ 12.5%', trend: 'up', icon: CheckCircle, iconColor: '#22c55e', iconBg: '#f0fdf4' },
    { label: 'Inactive Referral Codes',         value: Math.floor(562 * m),  sub: '21.9% of total ↓ 5.8%',  trend: 'down', icon: XCircle,   iconColor: '#ef4444', iconBg: '#fff1f2' },
    { label: 'Going to Expire',                 value: Math.floor(164 * m),  sub: '6.4% of total',           trend: 'neutral', icon: Clock,  iconColor: '#f59e0b', iconBg: '#fffbeb' },
    { label: 'Total Members Referred',          value: Math.floor(8642 * m), sub: '↑ 22.4% vs Apr 2026',    trend: 'up', icon: Users,       iconColor: '#3b82f6', iconBg: '#eff6ff' },
    { label: 'Users Referred',                  value: Math.floor(6125 * m), sub: '70.8% of total',          trend: 'neutral', icon: User,  iconColor: '#22c55e', iconBg: '#f0fdf4' },
    { label: 'Partners Referred',               value: Math.floor(2517 * m), sub: '29.1% of total',          trend: 'neutral', icon: Briefcase, iconColor: '#8b5cf6', iconBg: '#f5f3ff' },
    { label: 'Influencers Referred', isCustom: true, icon: Star, iconColor: '#f59e0b', iconBg: '#fffbeb' },
  ];

  const dynSubKpis = [
    { label: 'Users Generated',      value: Math.floor(1245 * m), sub: '48.5% of total', unused: Math.floor(312 * m), unusedPct: '25.1%', icon: User,      iconColor: '#3b82f6', iconBg: '#eff6ff' },
    { label: 'Partners Generated',   value: Math.floor(892 * m),  sub: '34.7% of total', unused: Math.floor(213 * m), unusedPct: '23.9%', icon: Briefcase, iconColor: '#8b5cf6', iconBg: '#f5f3ff' },
    { label: 'Influencers Generated', value: Math.floor(431 * m), sub: '16.8% of total', unused: Math.floor(97 * m),  unusedPct: '22.5%', icon: Star,      iconColor: '#f59e0b', iconBg: '#fffbeb' },
  ];

  const dynGenByDist = genByDist.map(k => ({ ...k, value: Math.floor(k.value * m) }));
  const dynUsedByDist = usedByDist.map(k => ({ ...k, value: Math.floor(k.value * m) }));
  const dynStatusDist = statusDist.map(k => ({ ...k, value: Math.floor(k.value * m) }));
  const dynRewardDist = rewardDist.map(k => ({ ...k, value: Math.floor(k.value * m) }));
  const dynRewardPerf = rewardPerformance.map(r => ({ ...r, total: Math.floor(r.total * m), used: Math.floor(r.used * m), usage: Math.floor(r.usage * m) }));
  const dynCodesPerf = codesPerformance.map(c => ({
    ...c,
    users: Math.floor(c.users * m),
    partners: Math.floor(c.partners * m),
    total: Math.floor(c.total * m),
    earned: '₹' + (parseFloat(c.earned.replace('₹', '')) * m).toFixed(2)
  }));
  
  const dynTopUsers = topPerformerUsers.map(u => ({ ...u, referred: Math.floor(u.referred * m) }));
  const dynTopPartners = topPerformerPartners.map(u => ({ ...u, referred: Math.floor(u.referred * m) }));
  const dynTopInfluencers = topPerformerInfluencers.map(u => ({ ...u, uRef: Math.floor(u.uRef * m), pRef: Math.floor(u.pRef * m), tRef: Math.floor(u.tRef * m) }));

  const chartDataWeekly = [
    { day: 'Week 1', total: 8400, users: 5600, partners: 2800 },
    { day: 'Week 2', total: 10500, users: 7000, partners: 3500 },
    { day: 'Week 3', total: 14700, users: 9800, partners: 4900 },
    { day: 'Week 4', total: 16800, users: 11200, partners: 5600 },
  ];
  const chartDataMonthly = [
    { day: 'Jan', total: 40000, users: 30000, partners: 10000 },
    { day: 'Feb', total: 45000, users: 32000, partners: 13000 },
    { day: 'Mar', total: 52000, users: 38000, partners: 14000 },
    { day: 'Apr', total: 61000, users: 45000, partners: 16000 },
    { day: 'May', total: 86420, users: 61250, partners: 25170 },
  ];
  
  const dynChartData = (chartFreq === 'Weekly' ? chartDataWeekly : chartFreq === 'Monthly' ? chartDataMonthly : referralOverTime).map(d => ({
    ...d,
    total: Math.floor(d.total * m),
    users: Math.floor(d.users * m),
    partners: Math.floor(d.partners * m)
  }));



  return (
    <AdminShell showGlobalExport={true} activeTab={activeTab} headerTitle="Referral Dashboard" searchPlaceholder="Search pages, modules...">
      <div className="ref-dash-root">

        {/* ── Filter Bar (Combined Card) ── */}
        <div className="ref-filter-bar">

          {/* ╌ Row 1: Location + Period + Month/Year + Apply/Reset ╌ */}
          <div className="ref-filter-row">
            {/* Location dropdowns */}
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

            {/* Divider */}
            <div className="ref-filter-divider" />

            {/* Period Toggle */}
            <div className="ref-period-toggle" style={{ alignSelf: 'flex-end' }}>
              {['Daily', 'Weekly', 'Monthly', 'Yearly'].map(p => (
                <button
                  key={p}
                  className={`ref-period-btn${period === p ? ' active' : ''}`}
                  onClick={() => setPeriod(p)}
                >{p}</button>
              ))}
            </div>

            {/* Month dropdown */}
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

            {/* Year dropdown */}
            <div className="ref-filter-group" style={{ minWidth: '90px' }}>
              <label>Year</label>
              <div className="ref-select-wrap">
                <select className="ref-select ref-select-sm">
                  {['2026','2027','2028','2029','2030','2031','2032','2033','2034','2035'].map(y => (
                    <option key={y}>{y}</option>
                  ))}
                </select>
                <ChevronDown size={12} className="ref-select-arrow" />
              </div>
            </div>

            {/* Apply + Reset pushed right */}
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

          {/* ╌ Row 2: Referral code filters ╌ */}
          <div className="ref-filter-row">
            <div className="ref-filter-group ref-filter-group-wide">
              <label>Referral Code Generated by</label>
              <div className="ref-select-wrap">
                <select className="ref-select">
                  {['All','User','Partner','Influencer'].map(o => <option key={o}>{o}</option>)}
                </select>
                <ChevronDown size={12} className="ref-select-arrow" />
              </div>
            </div>

            <div className="ref-filter-group ref-filter-group-wide">
              <label>Referral Code used by</label>
              <div className="ref-select-wrap">
                <select className="ref-select">
                  {['All','User','Partner'].map(o => <option key={o}>{o}</option>)}
                </select>
                <ChevronDown size={12} className="ref-select-arrow" />
              </div>
            </div>

            <div className="ref-filter-divider" />

            <div className="ref-filter-group ref-filter-group-wide">
              <label>Reward Type</label>
              <div className="ref-select-wrap">
                <select className="ref-select">
                  {['All','Reward1','Reward2','Reward3','Reward4'].map(o => <option key={o}>{o}</option>)}
                </select>
                <ChevronDown size={12} className="ref-select-arrow" />
              </div>
            </div>

            <div className="ref-filter-group ref-filter-group-wide">
              <label>Referral code Status</label>
              <div className="ref-select-wrap">
                <select className="ref-select">
                  {['All','Active','Inactive','Going to Expire'].map(o => <option key={o}>{o}</option>)}
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
                      <span className="ref-kpi-inf-label">User Referred</span>
                      <span className="ref-kpi-inf-val">1,136 <span className="ref-kpi-inf-pct">(63.1%)</span></span>
                    </div>
                    <div className="ref-kpi-inf-row">
                      <span className="ref-kpi-inf-label">Partner Referred</span>
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
          {/* Sub KPI Cards — horizontal unified row */}
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
                    <div className="ref-sub-kpi-unused-label">Unused Codes</div>
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
              {/* Top Referred Users */}
              <div className="ref-perf-card">
                <div className="ref-performer-header">
                  <span className="ref-performer-title">
                    <div style={{ width: 24, height: 24, borderRadius: '50%', background: '#dcfce7', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <User size={12} color="#22c55e" />
                    </div>
                    Top Referred Users
                  </span>
                  <a href="#" className="ref-view-all-link" onClick={(e) => { e.preventDefault(); setViewAllModal({ type: 'users', title: 'Top Referred Users' }); }}>View All</a>
                </div>
                <table className="ref-perf-table">
                  <thead>
                    <tr>
                      <th>Rank</th>
                      <th>User Name</th>
                      <th>Users Referred</th>
                    </tr>
                  </thead>
                  <tbody>
                    {dynTopUsers.map(u => (
                      <tr key={u.rank}>
                        <td>{u.rank}</td>
                        <td className="ref-perf-name">{u.name}</td>
                        <td className="ref-perf-num">{u.referred}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Top Referred Partners */}
              <div className="ref-perf-card">
                <div className="ref-performer-header">
                  <span className="ref-performer-title">
                    <div style={{ width: 24, height: 24, borderRadius: '50%', background: '#ede9fe', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Briefcase size={12} color="#8b5cf6" />
                    </div>
                    Top Referred Partners
                  </span>
                  <a href="#" className="ref-view-all-link" onClick={(e) => { e.preventDefault(); setViewAllModal({ type: 'partners', title: 'Top Referred Partners' }); }}>View All</a>
                </div>
                <table className="ref-perf-table">
                  <thead>
                    <tr>
                      <th>Rank</th>
                      <th>Partner Name</th>
                      <th>Partners Referred</th>
                    </tr>
                  </thead>
                  <tbody>
                    {dynTopPartners.map(u => (
                      <tr key={u.rank}>
                        <td>{u.rank}</td>
                        <td className="ref-perf-name">{u.name}</td>
                        <td className="ref-perf-num">{u.referred}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Top Referred Influencers */}
              <div className="ref-perf-card">
                <div className="ref-performer-header">
                  <span className="ref-performer-title">
                    <div style={{ width: 24, height: 24, borderRadius: '50%', background: '#ffedd5', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Star size={12} color="#f59e0b" />
                    </div>
                    Top Referred Influencers
                  </span>
                  <a href="#" className="ref-view-all-link" onClick={(e) => { e.preventDefault(); setViewAllModal({ type: 'influencers', title: 'Top Referred Influencers' }); }}>View All</a>
                </div>
                <table className="ref-perf-table">
                  <thead>
                    <tr>
                      <th>Rank</th>
                      <th>Influencer Name</th>
                      <th>Users Referred</th>
                      <th>Partners Referred</th>
                      <th>Total Referred</th>
                    </tr>
                  </thead>
                  <tbody>
                    {dynTopInfluencers.map(u => (
                      <tr key={u.rank}>
                        <td>{u.rank}</td>
                        <td className="ref-perf-name">{u.name}</td>
                        <td className="ref-perf-num">{u.uRef}</td>
                        <td className="ref-perf-num">{u.pRef}</td>
                        <td className="ref-perf-num">{u.tRef}</td>
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
            title="Referral Codes Generated by"
            data={dynGenByDist}
            centerValue={fmtNum(Math.floor(2568 * m))}
            centerLabel="Total Codes"
          />
          <DonutCard
            title="Referral Codes Used by"
            data={dynUsedByDist}
            centerValue={fmtNum(Math.floor(8642 * m))}
            centerLabel="Total Members"
          />
          <DonutCard
            title="Referral Code Status"
            data={dynStatusDist}
            centerValue={fmtNum(Math.floor(2568 * m))}
            centerLabel="Total Codes"
          />

          {/* Codes Going to Expire */}
          <div className="ref-card ref-expire-card">
            <div className="ref-card-header">
              <h3 className="ref-card-title">Codes Going to Expire</h3>
              <a href="#" className="ref-view-all-link">View All</a>
            </div>
            <table className="ref-expire-table">
              <thead>
                <tr>
                  <th>Referral Code</th>
                  <th>Expires On</th>
                  <th>Generated By</th>
                  <th>Days Left</th>
                </tr>
              </thead>
              <tbody>
                {expiringCodes.map(c => (
                  <tr key={c.code}>
                    <td className="ref-code-cell">{c.code}</td>
                    <td>{c.expires}</td>
                    <td>{c.generatedBy}</td>
                    <td className="ref-days-cell">{c.daysLeft} days</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* ── Line Chart + Reward Donut + Reward Table ── */}
        <div className="ref-charts-row">
          {/* Line Chart */}
          <div className="ref-card ref-line-chart-card">
            <div className="ref-card-header">
              <h3 className="ref-card-title">Referral Members Over Time</h3>
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
                <Line type="monotone" dataKey="total"    name="Total Members" stroke="#3b82f6" strokeWidth={2.5} dot={false} />
                <Line type="monotone" dataKey="users"    name="Users"         stroke="#22c55e" strokeWidth={2.5} dot={false} />
                <Line type="monotone" dataKey="partners" name="Partners"      stroke="#8b5cf6" strokeWidth={2.5} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Top Reward Types Donut */}
          <DonutCard
            title="Top Reward Types"
            data={dynRewardDist}
            centerValue={fmtNum(Math.floor(8642 * m))}
            centerLabel="Total Usage"
          />

          {/* Reward Types Performance */}
          <div className="ref-card ref-reward-perf-card">
            <div className="ref-card-header">
              <h3 className="ref-card-title">Reward Types Performance</h3>
            </div>
            <div style={{ overflowY: 'auto', maxHeight: '400px', width: '100%' }}>
              <table className="ref-reward-table" style={{ width: '100%', borderCollapse: 'collapse', minWidth: '450px' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
                    <th style={{ padding: '12px 16px', textAlign: 'left', fontSize: '13px', color: '#1e3a8a', fontWeight: 700 }}>Reward Type</th>
                    <th className="text-center" style={{ padding: '12px 16px', fontSize: '13px', color: '#1e3a8a', fontWeight: 700 }}>Total Codes</th>
                    <th className="text-center" style={{ padding: '12px 16px', fontSize: '13px', color: '#1e3a8a', fontWeight: 700 }}>Used Codes</th>
                    <th className="text-center" style={{ padding: '12px 16px', fontSize: '13px', color: '#1e3a8a', fontWeight: 700 }}>Total Usage</th>
                    <th style={{ padding: '12px 16px', textAlign: 'right', fontSize: '13px', color: '#1e3a8a', fontWeight: 700, whiteSpace: 'nowrap' }}>% Usage</th>
                  </tr>
                </thead>
                <tbody>
                  {dynRewardPerf.map((r, i) => (
                    <tr key={r.type} style={{ borderBottom: i === dynRewardPerf.length - 1 ? 'none' : '1px solid #e2e8f0' }}>
                      <td className="ref-reward-type" style={{ padding: '14px 16px', fontWeight: 700, color: '#0f172a', fontSize: '13px', whiteSpace: 'nowrap' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: r.color }} />
                          {r.type}
                        </div>
                      </td>
                      <td className="text-center" style={{ padding: '14px 16px', fontSize: '13px', fontWeight: 600 }}>{r.total}</td>
                      <td className="text-center" style={{ padding: '14px 16px', fontSize: '13px', fontWeight: 600 }}>{r.used}</td>
                      <td className="text-center" style={{ padding: '14px 16px', fontSize: '13px', fontWeight: 600 }}>{fmtNum(r.usage)}</td>
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

        {/* ── Referral Codes Performance Table ── */}
        <div className="ref-card ref-main-table-card">
          <div className="ref-card-header">
            <h3 className="ref-card-title">Referral Codes Performance</h3>
          </div>
          <div className="ref-table-scroll">
            <table className="ref-main-table">
              <thead>
                <tr>
                  <th>Referral Code</th>
                  <th>Generated By</th>
                  <th>Generated By Name</th>
                  <th>Code Type</th>
                  <th>Status</th>
                  <th colSpan={3} style={{ textAlign: 'center' }}>Members Referred</th>
                  <th>Reward Type</th>
                  <th>Total Reward Earned</th>
                  <th>Expires On</th>
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
                {dynCodesPerf.map((r, i) => (
                  <tr key={i}>
                    <td className="ref-code-bold">{r.code}</td>
                    <td>{r.genBy}</td>
                    <td className="ref-name-bold">{r.name}</td>
                    <td>{r.type}</td>
                    <td><StatusBadge status={r.status} /></td>
                    <td className="ref-num-cell">{r.users}</td>
                    <td className="ref-num-cell">{r.partners}</td>
                    <td className="ref-num-cell ref-total-bold">{r.total}</td>
                    <td>{r.reward}</td>
                    <td className="ref-earned-cell">{r.earned}</td>
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
                        <th>User Name</th>
                        <th>Users Referred</th>
                      </tr>
                    </thead>
                    <tbody>
                      {dynTopUsers.map(u => (
                        <tr key={u.rank}>
                          <td>{u.rank}</td>
                          <td style={{ fontWeight: 600, color: '#1e40af' }}>{u.name}</td>
                          <td style={{ fontWeight: 700 }}>{u.referred}</td>
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
                        <th>Partners Referred</th>
                      </tr>
                    </thead>
                    <tbody>
                      {dynTopPartners.map(u => (
                        <tr key={u.rank}>
                          <td>{u.rank}</td>
                          <td style={{ fontWeight: 600, color: '#5b21b6' }}>{u.name}</td>
                          <td style={{ fontWeight: 700 }}>{u.referred}</td>
                        </tr>
                      ))}
                    </tbody>
                  </>
                )}
                {viewAllModal.type === 'influencers' && (
                  <>
                    <thead>
                      <tr>
                        <th>Rank</th>
                        <th>Influencer Name</th>
                        <th>Users Referred</th>
                        <th>Partners Referred</th>
                        <th>Total Referred</th>
                      </tr>
                    </thead>
                    <tbody>
                      {dynTopInfluencers.map(u => (
                        <tr key={u.rank}>
                          <td>{u.rank}</td>
                          <td style={{ fontWeight: 600, color: '#9a3412' }}>{u.name}</td>
                          <td>{u.uRef}</td>
                          <td>{u.pRef}</td>
                          <td style={{ fontWeight: 700 }}>{u.tRef}</td>
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