import React, { useState } from 'react';
import {
  Users, UserPlus, UserCheck, UserMinus, LogIn, LogOut,
  Wifi, WifiOff, ShieldX, TrendingUp, Eye, X, TrendingDown,
  Download, ChevronDown, RotateCcw, Network, Briefcase,
  ShoppingBag, GitBranch, Star
} from 'lucide-react';
import AdminShell from '../../components/layouts/AdminShell';
import ExportReportModal from '../../components/common/ExportReportModal';
import { useToast } from '../../components/common/ToastNotification';
import {
  LineChart, Line, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';

// ─── MOCK DATA ────────────────────────────────────────────────────────────────

const growthTrend = [
  { day:'01 May', newP:420,  active:1800, inactive:320, suspended:40 },
  { day:'05 May', newP:580,  active:2100, inactive:290, suspended:38 },
  { day:'10 May', newP:390,  active:1950, inactive:340, suspended:45 },
  { day:'15 May', newP:720,  active:2400, inactive:310, suspended:30 },
  { day:'20 May', newP:640,  active:2250, inactive:280, suspended:35 },
  { day:'25 May', newP:810,  active:2600, inactive:260, suspended:28 },
  { day:'31 May', newP:920,  active:2800, inactive:240, suspended:25 },
];

const roleOverTime = [
  { month:'Jan', ISP:480, BSP:260, BS:180, BM:72, Pro:38 },
  { month:'Feb', ISP:510, BSP:278, BS:192, BM:78, Pro:42 },
  { month:'Mar', ISP:530, BSP:290, BS:204, BM:80, Pro:45 },
  { month:'Apr', ISP:495, BSP:270, BS:185, BM:74, Pro:40 },
  { month:'May', ISP:560, BSP:310, BS:215, BM:86, Pro:48 },
  { month:'Jun', ISP:540, BSP:295, BS:208, BM:82, Pro:46 },
  { month:'Jul', ISP:520, BSP:285, BS:197, BM:79, Pro:43 },
  { month:'Aug', ISP:545, BSP:300, BS:210, BM:84, Pro:47 },
  { month:'Sep', ISP:505, BSP:275, BS:188, BM:76, Pro:41 },
  { month:'Oct', ISP:490, BSP:265, BS:182, BM:73, Pro:39 },
  { month:'Nov', ISP:475, BSP:258, BS:176, BM:71, Pro:37 },
  { month:'Dec', ISP:460, BSP:250, BS:170, BM:69, Pro:35 },
];

const statusDist = [
  { name:'Active',          value:9856, color:'#22c55e', pct:'78.5%' },
  { name:'Inactive',        value:1204, color:'#94a3b8', pct:'9.6%'  },
  { name:'Suspended',       value:156,  color:'#ef4444', pct:'1.2%'  },
  { name:'New (This Month)',value:1245, color:'#3b82f6', pct:'9.9%'  },
];

const onlineOffline = [
  { name:'Online',  value:3842, color:'#3b82f6', pct:'30.6%' },
  { name:'Offline', value:8706, color:'#94a3b8', pct:'69.4%' },
];

const citiesData = [
  { city:'Hyderabad', total:1245, pct:9.9 },
  { city:'Bengaluru', total:1102, pct:8.8 },
  { city:'Mumbai',    total:986,  pct:7.8 },
  { city:'Delhi',     total:854,  pct:6.8 },
  { city:'Pune',      total:680,  pct:5.4 },
  { city:'Chennai',   total:548,  pct:4.4 },
  { city:'Kolkata',   total:465,  pct:3.7 },
  { city:'Ahmedabad', total:412,  pct:3.3 },
  { city:'Jaipur',    total:356,  pct:2.8 },
  { city:'Surat',     total:324,  pct:2.6 },
];

const roleSummary = [
  { role:'ISP (Independent Service Provider)', total:5842, active:4652, inactive:742, online:1918, offline:3914, loginToday:3156, logoutToday:2686, suspended:52 },
  { role:'BSP (Business Service Provider)',    total:3215, active:2561, inactive:512, online:1012, offline:2203, loginToday:1842, logoutToday:1372, suspended:37 },
  { role:'BS (Business Seller)',               total:2145, active:1685, inactive:261, online:604,  offline:1541, loginToday:1040, logoutToday:1104, suspended:29 },
  { role:'Branch Manager',                     total:892,  active:680,  inactive:148, online:204,  offline:688,  loginToday:412,  logoutToday:480,  suspended:15 },
  { role:'Professional',                       total:454,  active:270,  inactive:149, online:57,   offline:397,  loginToday:340,  logoutToday:114,  suspended:25 },
];

const recentRegistrations = [
  { name:'Suresh Electricals', role:'ISP',            city:'Hyderabad', date:'31 May 2026', status:'Active'  },
  { name:'Best Home Services', role:'BSP',            city:'Bengaluru', date:'31 May 2026', status:'Active'  },
  { name:'Shree Hardware',     role:'BS',             city:'Mumbai',    date:'30 May 2026', status:'Active'  },
  { name:'Ravi Branch',        role:'Branch Manager', city:'Pune',      date:'30 May 2026', status:'Active'  },
  { name:'TechPro Solutions',  role:'Professional',   city:'Delhi',     date:'30 May 2026', status:'Pending' },
  { name:'QuickFix Services',  role:'ISP',            city:'Chennai',   date:'29 May 2026', status:'Active'  },
];

// ─── HELPERS ─────────────────────────────────────────────────────────────────

function fmtNum(n) {
  if (n >= 1_000_000) return (n / 1_000_000).toFixed(1) + 'M';
  if (n >= 1_000) return n.toLocaleString();
  return String(n);
}

function DonutCenter({ viewBox, value, label }) {
  const { cx, cy } = viewBox;
  return (
    <g>
      <text x={cx} y={cy - 7} textAnchor="middle" fill="#0f172a" fontSize={17} fontWeight={800}>{value}</text>
      <text x={cx} y={cy + 10} textAnchor="middle" fill="#94a3b8" fontSize={9} fontWeight={600}>{label}</text>
    </g>
  );
}

const LineTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div style={{ background:'#1e293b', borderRadius:10, padding:'10px 14px', fontSize:11 }}>
      <div style={{ color:'#94a3b8', fontWeight:700, marginBottom:6 }}>{label}</div>
      {payload.map(p => (
        <div key={p.name} style={{ display:'flex', alignItems:'center', gap:6, marginBottom:3 }}>
          <span style={{ width:7, height:7, borderRadius:'50%', background:p.color, display:'inline-block' }} />
          <span style={{ color:'#cbd5e1' }}>{p.name}:</span>
          <strong style={{ color:'#fff' }}>{fmtNum(p.value)}</strong>
        </div>
      ))}
    </div>
  );
};

const StackTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div style={{ background:'#1e293b', borderRadius:10, padding:'10px 14px', fontSize:11 }}>
      <div style={{ color:'#94a3b8', fontWeight:700, marginBottom:6 }}>{label} 2026</div>
      {payload.map(p => (
        <div key={p.name} style={{ display:'flex', alignItems:'center', gap:6, marginBottom:3 }}>
          <span style={{ width:7, height:7, borderRadius:'50%', background:p.fill, display:'inline-block' }} />
          <span style={{ color:'#cbd5e1' }}>{p.name}:</span>
          <strong style={{ color:'#fff' }}>{p.value}</strong>
        </div>
      ))}
    </div>
  );
};

function FilterSelect({ label, options }) {
  return (
    <div style={{ display:'flex', flexDirection:'column', gap:4 }}>
      {label && <label style={{ fontSize:10, fontWeight:600, color:'#94a3b8', letterSpacing:0.3 }}>{label}</label>}
      <div style={{ position:'relative' }}>
        <select style={{
          appearance:'none', background:'#fff', border:'1px solid #dde3ea',
          borderRadius:6, padding:'6px 28px 6px 10px', fontSize:12,
          fontWeight:500, color:'#334155', cursor:'pointer', outline:'none', minWidth:110,
        }}>
          {options.map(o => <option key={o}>{o}</option>)}
        </select>
        <ChevronDown size={11} style={{ position:'absolute', right:8, top:'50%', transform:'translateY(-50%)', color:'#94a3b8', pointerEvents:'none' }} />
      </div>
    </div>
  );
}

// ─── KPI CARD ────────────────────────────────────────────────────────────────
function KPICard({ icon: Icon, iconBg, iconColor, label, value, sub, pct, up, cmp }) {
  return (
    <div style={{
      background:'#fff', borderRadius:10, padding:'13px 13px 11px',
      boxShadow:'0 1px 3px rgba(0,0,0,0.06)', border:'1px solid #e8edf2',
      transition:'transform 0.18s, box-shadow 0.18s', cursor:'default', minWidth:0,
    }}
      onMouseEnter={e => { e.currentTarget.style.transform='translateY(-2px)'; e.currentTarget.style.boxShadow='0 6px 20px rgba(37,99,235,0.10)'; }}
      onMouseLeave={e => { e.currentTarget.style.transform='translateY(0)'; e.currentTarget.style.boxShadow='0 1px 3px rgba(0,0,0,0.06)'; }}
    >
      <div style={{ display:'flex', alignItems:'center', gap:7, marginBottom:6 }}>
        <div style={{ background:iconBg, borderRadius:8, padding:'6px', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
          <Icon size={14} color={iconColor} />
        </div>
        <span style={{ fontSize:9.5, fontWeight:600, color:'#64748b', lineHeight:1.3 }}>{label}</span>
      </div>
      <div style={{ fontSize:21, fontWeight:800, color:'#0f172a', lineHeight:1, marginBottom:3 }}>{fmtNum(value)}</div>
      <div style={{ fontSize:9.5, color:'#94a3b8', marginBottom:3 }}>{sub}</div>
      <div style={{ display:'flex', alignItems:'center', gap:3 }}>
        {up ? <TrendingUp size={9} color="#16a34a" /> : <TrendingDown size={9} color="#dc2626" />}
        <span style={{ fontSize:9.5, fontWeight:700, color: up ? '#16a34a' : '#dc2626' }}>
          {up ? '+' : '-'}{pct}%
        </span>
      </div>
      <div style={{ fontSize:8.5, color:'#cbd5e1', marginTop:2 }}>{cmp}</div>
    </div>
  );
}

// ─── MAIN ────────────────────────────────────────────────────────────────────
export default function PartnerAnalytics({ activeTab = 'Dashboard' }) {
  const { addToast } = useToast();
  const [viewAllModal, setViewAllModal] = useState(null);
  const [isExportOpen, setIsExportOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [period, setPeriod] = useState('Monthly');
  const [locationType, setLocationType] = useState('All');

  const locationMultiplier = locationType === 'Urban' ? 0.65 : locationType === 'Rural' ? 0.35 : 1;

  const kpis = [
    { label:'Total Partners',    value:12548, sub:'All Time',    pct:13.6, up:true,  cmp:'vs Apr 2026', icon:Users,    iconBg:'#eff6ff', iconColor:'#2563eb' },
    { label:'New Partners',      value:1245,  sub:'This Month',  pct:15.4, up:true,  cmp:'vs Apr 2026', icon:UserPlus, iconBg:'#f0fdf4', iconColor:'#22c55e' },
    { label:'Active Partners',   value:9856,  sub:'This Month',  pct:9.9,  up:true,  cmp:'vs Apr 2026', icon:UserCheck,iconBg:'#faf5ff', iconColor:'#8b5cf6' },
    { label:'Inactive Partners', value:1204,  sub:'This Month',  pct:2.1,  up:false, cmp:'vs Apr 2026', icon:UserMinus,iconBg:'#fff7ed', iconColor:'#f97316' },
    { label:'Login Partners',    value:6752,  sub:'Today',       pct:12.2, up:true,  cmp:'vs Yesterday',icon:LogIn,    iconBg:'#eff6ff', iconColor:'#3b82f6' },
    { label:'Logout Partners',   value:6148,  sub:'Today',       pct:5.4,  up:true,  cmp:'vs Yesterday',icon:LogOut,   iconBg:'#fdf4ff', iconColor:'#a855f7' },
    { label:'Online Partners',   value:3842,  sub:'Right Now',   pct:11.3, up:true,  cmp:'vs Yesterday',icon:Wifi,     iconBg:'#f0fdf4', iconColor:'#16a34a' },
    { label:'Offline Partners',  value:8706,  sub:'Right Now',   pct:3.6,  up:false, cmp:'vs Yesterday',icon:WifiOff,  iconBg:'#f8fafc', iconColor:'#94a3b8' },
    { label:'Suspended Partners',value:156,   sub:'This Month',  pct:5.4,  up:false, cmp:'vs Apr 2026', icon:ShieldX,  iconBg:'#fff1f2', iconColor:'#ef4444' },
  ];

  const roles = [
    { label:'ISP', sub:'Independent Service Provider', count:5842, pct:46.53, color:'#2563eb', iconBg:'#eff6ff', icon:Network },
    { label:'BSP', sub:'Business Service Provider',    count:3215, pct:25.61, color:'#22c55e', iconBg:'#f0fdf4', icon:Briefcase },
    { label:'BS',  sub:'Business Seller',              count:2145, pct:17.08, color:'#f97316', iconBg:'#fff7ed', icon:ShoppingBag },
    { label:'BM',  sub:'Branch Manager',               count:892,  pct:7.10,  color:'#8b5cf6', iconBg:'#faf5ff', icon:GitBranch },
    { label:'Pro', sub:'Professional',                 count:454,  pct:3.61,  color:'#ec4899', iconBg:'#fdf4ff', icon:Star },
  ];

  const roleColors = { ISP:'#2563eb', BSP:'#22c55e', BS:'#f97316', BM:'#8b5cf6', Pro:'#ec4899' };
  const statusColors = { Active:'#22c55e', Pending:'#f97316', Suspended:'#ef4444', Inactive:'#94a3b8' };

  const totalRow = {
    total:   roleSummary.reduce((s,r)=>s+r.total,0),
    active:  roleSummary.reduce((s,r)=>s+r.active,0),
    inactive:roleSummary.reduce((s,r)=>s+r.inactive,0),
    online:  roleSummary.reduce((s,r)=>s+r.online,0),
    offline: roleSummary.reduce((s,r)=>s+r.offline,0),
    loginToday: roleSummary.reduce((s,r)=>s+r.loginToday,0),
    logoutToday:roleSummary.reduce((s,r)=>s+r.logoutToday,0),
    suspended:  roleSummary.reduce((s,r)=>s+r.suspended,0),
  };

  const pct = (v, t) => `${((v/t)*100).toFixed(1)}%`;

  return (
    <AdminShell activeTab={activeTab} headerTitle="Partner Dashboard" searchPlaceholder="Search pages, modules...">
      <div style={{ padding:'20px 24px 48px', background:'#f8fafc', minHeight:'100vh', fontFamily:"'Inter',-apple-system,sans-serif" }}>

        

        {/* ── FILTER BAR ── */}
        <div style={{
          background:'#fff', borderRadius:10, padding:'12px 16px',
          boxShadow:'0 1px 3px rgba(0,0,0,0.05)', marginBottom:14,
          display:'flex', alignItems:'flex-end', flexWrap:'wrap', gap:12, border:'1px solid #e8edf2',
        }}>
          <FilterSelect label="State"        options={['All States','Maharashtra','Karnataka','Telangana','Tamil Nadu','Delhi']} />
          <FilterSelect label="City"         options={['All Cities','Mumbai','Bengaluru','Hyderabad','Chennai','Delhi','Pune']} />
          <FilterSelect label="District"     options={['All Districts','Andheri','Koramangala','Banjara Hills','T. Nagar']} />
          <FilterSelect label="Partner Role" options={['All Roles','ISP','BSP','Business Seller','Branch Manager','Professional']} />

          {/* Location Type Dropdown */}
          <div style={{ display:'flex', flexDirection:'column', gap:4 }}>
            <label style={{ fontSize:10, fontWeight:600, color:'#94a3b8', letterSpacing:0.3 }}>Location Type</label>
            <div style={{ position:'relative' }}>
              <select
                value={locationType}
                onChange={e => setLocationType(e.target.value)}
                style={{
                  appearance:'none', background:'#fff', border:'1px solid #dde3ea',
                  borderRadius:6, padding:'6px 28px 6px 10px', fontSize:12,
                  fontWeight:500, color:'#334155', cursor:'pointer', outline:'none', minWidth:110,
                }}
              >
                {['All', 'Urban', 'Rural'].map(o => <option key={o}>{o}</option>)}
              </select>
              <ChevronDown size={11} style={{ position:'absolute', right:8, top:'50%', transform:'translateY(-50%)', color:'#94a3b8', pointerEvents:'none' }} />
            </div>
          </div>
          <div style={{ width:1, height:34, background:'#e8edf2', alignSelf:'flex-end', margin:'0 2px' }} />
          <div style={{ display:'flex', flexDirection:'column', gap:4 }}>
            <label style={{ fontSize:10, fontWeight:600, color:'transparent' }}>_</label>
            <div style={{ display:'flex', border:'1px solid #dde3ea', borderRadius:6, overflow:'hidden' }}>
              {['Daily','Weekly','Monthly','Yearly'].map((p,i) => (
                <button key={p} onClick={() => setPeriod(p)} style={{
                  padding:'6px 13px', border:'none', borderLeft:i>0?'1px solid #dde3ea':'none',
                  fontSize:12, fontWeight:600, cursor:'pointer', transition:'all 0.15s',
                  background: period===p ? '#0f172a' : '#fff',
                  color: period===p ? '#fff' : '#64748b',
                }}>{p}</button>
              ))}
            </div>
          </div>
          <FilterSelect label="" options={['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']} />
          <FilterSelect label="" options={['2026','2025','2024','2023']} />
          <div style={{ display:'flex', gap:8, alignSelf:'flex-end' }}>
            <button onClick={() => addToast('Filters applied','success')} style={{ padding:'7px 20px', borderRadius:6, border:'none', background:'#0f172a', color:'#fff', fontSize:12, fontWeight:600, cursor:'pointer' }}>Apply</button>
            <button onClick={() => { setPeriod('Monthly'); setLocationType('All'); addToast('Filters reset','info'); }} style={{ padding:'7px 14px', borderRadius:6, border:'1px solid #dde3ea', background:'#fff', color:'#334155', fontSize:12, fontWeight:600, cursor:'pointer', display:'flex', alignItems:'center', gap:5 }}>
              <RotateCcw size={11} /> Reset
            </button>
          </div>
        </div>

        {/* ── 9 KPI CARDS ── */}
        <div style={{ display:'grid', gridTemplateColumns:'repeat(9,1fr)', gap:10, marginBottom:14 }}>
          {kpis.map((k,i) => <KPICard key={i} {...k} />)}
        </div>

        {/* ── PARTNERS BY ROLE + STATUS DONUT + ONLINE/OFFLINE DONUT ── */}
        <div style={{ display:'grid', gridTemplateColumns:'1.5fr 1fr 0.9fr', gap:12, marginBottom:12 }}>

          {/* Partners by Role */}
          <div style={{ background:'#fff', borderRadius:10, padding:'18px', boxShadow:'0 1px 3px rgba(0,0,0,0.05)', border:'1px solid #e8edf2' }}>
            <h2 style={{ fontSize:13, fontWeight:700, color:'#0f172a', margin:'0 0 14px' }}>Partners by Role</h2>
            <div style={{ display:'flex', justifyContent:'space-between', gap:8 }}>
              {roles.map((r,i) => {
                const Icon = r.icon;
                return (
                  <div key={i} style={{ flex:1, display:'flex', flexDirection:'column', alignItems:'center', gap:6 }}>
                    <div style={{ background:r.iconBg, borderRadius:10, padding:'8px', display:'flex', alignItems:'center', justifyContent:'center' }}>
                      <Icon size={16} color={r.color} />
                    </div>
                    <span style={{ fontSize:10, fontWeight:700, color:r.color }}>{r.label}</span>
                    <span style={{ fontSize:9, color:'#94a3b8', textAlign:'center', lineHeight:1.3 }}>{r.sub}</span>
                    <span style={{ fontSize:18, fontWeight:800, color:'#0f172a' }}>{r.count.toLocaleString()}</span>
                    <span style={{ fontSize:10, color:'#64748b' }}>{r.pct}%</span>
                    <div style={{ width:'100%', height:4, borderRadius:2, background:'#f1f5f9' }}>
                      <div style={{ height:'100%', borderRadius:2, background:r.color, width:`${r.pct*2}%` }} />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Partner Status Donut */}
          <div style={{ background:'#fff', borderRadius:10, padding:'18px', boxShadow:'0 1px 3px rgba(0,0,0,0.05)', border:'1px solid #e8edf2', display:'flex', flexDirection:'column' }}>
            <h2 style={{ fontSize:13, fontWeight:700, color:'#0f172a', margin:'0 0 6px' }}>Partner Status Overview</h2>
            <div style={{ display:'flex', justifyContent:'center' }}>
              <PieChart width={155} height={155}>
                <Pie data={statusDist} cx={77} cy={77} innerRadius={50} outerRadius={70} paddingAngle={2} dataKey="value" startAngle={90} endAngle={-270}>
                  {statusDist.map((e,i) => <Cell key={i} fill={e.color} />)}
                  <DonutCenter viewBox={{ cx:77, cy:77 }} value="12,548" label="Total Partners" />
                </Pie>
                <Tooltip formatter={v => fmtNum(v)} />
              </PieChart>
            </div>
            <div style={{ display:'flex', flexDirection:'column', gap:5 }}>
              {statusDist.map((item,i) => (
                <div key={i} style={{ display:'flex', alignItems:'center', justifyContent:'space-between', fontSize:10 }}>
                  <div style={{ display:'flex', alignItems:'center', gap:5 }}>
                    <span style={{ width:7, height:7, borderRadius:'50%', background:item.color, flexShrink:0, display:'inline-block' }} />
                    <span style={{ color:'#475569', fontWeight:500 }}>{item.name}</span>
                  </div>
                  <div style={{ display:'flex', gap:5 }}>
                    <span style={{ fontWeight:700, color:'#0f172a' }}>{fmtNum(item.value)}</span>
                    <span style={{ color:'#94a3b8' }}>({item.pct})</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Online vs Offline Donut */}
          <div style={{ background:'#fff', borderRadius:10, padding:'18px', boxShadow:'0 1px 3px rgba(0,0,0,0.05)', border:'1px solid #e8edf2', display:'flex', flexDirection:'column' }}>
            <h2 style={{ fontSize:13, fontWeight:700, color:'#0f172a', margin:'0 0 6px' }}>Online vs Offline Partners</h2>
            <div style={{ display:'flex', justifyContent:'center' }}>
              <PieChart width={155} height={155}>
                <Pie data={onlineOffline} cx={77} cy={77} innerRadius={50} outerRadius={70} paddingAngle={2} dataKey="value" startAngle={90} endAngle={-270}>
                  {onlineOffline.map((e,i) => <Cell key={i} fill={e.color} />)}
                  <DonutCenter viewBox={{ cx:77, cy:77 }} value="12,548" label="Total Partners" />
                </Pie>
                <Tooltip formatter={v => fmtNum(v)} />
              </PieChart>
            </div>
            <div style={{ display:'flex', flexDirection:'column', gap:6 }}>
              {onlineOffline.map((item,i) => (
                <div key={i} style={{ display:'flex', alignItems:'center', justifyContent:'space-between', fontSize:10 }}>
                  <div style={{ display:'flex', alignItems:'center', gap:5 }}>
                    <span style={{ width:7, height:7, borderRadius:'50%', background:item.color, flexShrink:0, display:'inline-block' }} />
                    <span style={{ color:'#475569', fontWeight:500 }}>{item.name}</span>
                  </div>
                  <div style={{ display:'flex', gap:5 }}>
                    <span style={{ fontWeight:700, color:'#0f172a' }}>{fmtNum(item.value)}</span>
                    <span style={{ color:'#94a3b8' }}>({item.pct})</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── GROWTH TREND + ROLE OVER TIME + TOP CITIES ── */}
        <div style={{ display:'grid', gridTemplateColumns:'1.6fr 1.6fr 1fr', gap:12, marginBottom:12 }}>

          {/* Partner Growth Trend Line Chart */}
          <div style={{ background:'#fff', borderRadius:10, padding:'18px 18px 10px', boxShadow:'0 1px 3px rgba(0,0,0,0.05)', border:'1px solid #e8edf2' }}>
            <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:12 }}>
              <h2 style={{ fontSize:13, fontWeight:700, color:'#0f172a', margin:0 }}>Partner Growth Trend</h2>
              <div style={{ display:'flex', alignItems:'center', gap:5, fontSize:10, color:'#64748b', border:'1px solid #e2e8f0', borderRadius:6, padding:'4px 9px', cursor:'pointer' }}>
                Line Chart <ChevronDown size={10} />
              </div>
            </div>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={growthTrend} margin={{ top:4, right:4, left:-28, bottom:0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="day" tick={{ fontSize:8, fill:'#94a3b8' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize:8, fill:'#94a3b8' }} axisLine={false} tickLine={false} tickFormatter={v => v>=1000?(v/1000)+'K':v} />
                <Tooltip content={<LineTooltip />} />
                <Legend iconType="circle" iconSize={7} wrapperStyle={{ fontSize:10, paddingTop:8 }} />
                <Line type="monotone" dataKey="newP"      name="New Partners"       stroke="#2563eb" strokeWidth={2} dot={false} />
                <Line type="monotone" dataKey="active"    name="Active Partners"    stroke="#22c55e" strokeWidth={2} dot={false} />
                <Line type="monotone" dataKey="inactive"  name="Inactive Partners"  stroke="#f97316" strokeWidth={2} dot={false} />
                <Line type="monotone" dataKey="suspended" name="Suspended Partners" stroke="#ef4444" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Partners by Role Over Time — Stacked Bar */}
          <div style={{ background:'#fff', borderRadius:10, padding:'18px 18px 10px', boxShadow:'0 1px 3px rgba(0,0,0,0.05)', border:'1px solid #e8edf2' }}>
            <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:12 }}>
              <h2 style={{ fontSize:13, fontWeight:700, color:'#0f172a', margin:0 }}>Partners by Role Over Time</h2>
              <div style={{ display:'flex', alignItems:'center', gap:5, fontSize:10, color:'#64748b', border:'1px solid #e2e8f0', borderRadius:6, padding:'4px 9px', cursor:'pointer' }}>
                Monthly <ChevronDown size={10} />
              </div>
            </div>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={roleOverTime} margin={{ top:4, right:4, left:-28, bottom:0 }} barSize={16}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                <XAxis dataKey="month" tick={{ fontSize:8, fill:'#94a3b8' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize:8, fill:'#94a3b8' }} axisLine={false} tickLine={false} />
                <Tooltip content={<StackTooltip />} />
                <Legend iconType="circle" iconSize={7} wrapperStyle={{ fontSize:10, paddingTop:8 }} />
                <Bar dataKey="ISP" stackId="a" fill="#2563eb" />
                <Bar dataKey="BSP" stackId="a" fill="#22c55e" />
                <Bar dataKey="BS"  stackId="a" fill="#f97316" />
                <Bar dataKey="BM"  name="Branch Manager" stackId="a" fill="#8b5cf6" />
                <Bar dataKey="Pro" name="Professional"   stackId="a" fill="#ec4899" radius={[4,4,0,0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Top 10 Cities */}
          <div style={{ background:'#fff', borderRadius:10, padding:'18px', boxShadow:'0 1px 3px rgba(0,0,0,0.05)', border:'1px solid #e8edf2' }}>
            <h2 style={{ fontSize:13, fontWeight:700, color:'#0f172a', margin:'0 0 12px' }}>Top 10 Cities by Partners</h2>
            <div style={{ display:'grid', gridTemplateColumns:'auto 1fr auto', columnGap:10, alignItems:'center' }}>
              <div style={{ fontSize:9.5, fontWeight:600, color:'#94a3b8', paddingBottom:8, borderBottom:'1px solid #f1f5f9' }}>City</div>
              <div style={{ fontSize:9.5, fontWeight:600, color:'#94a3b8', paddingBottom:8, borderBottom:'1px solid #f1f5f9' }}>Total Partners</div>
              <div style={{ fontSize:9.5, fontWeight:600, color:'#94a3b8', paddingBottom:8, borderBottom:'1px solid #f1f5f9', textAlign:'right' }}>%</div>
              {citiesData.map((c,i) => (
                <React.Fragment key={i}>
                  <div style={{ fontSize:11, fontWeight:600, color:'#0f172a', padding:'5px 0', borderBottom:i<9?'1px solid #f8fafc':'none', whiteSpace:'nowrap' }}>{c.city}</div>
                  <div style={{ padding:'5px 0', borderBottom:i<9?'1px solid #f8fafc':'none', display:'flex', alignItems:'center', gap:6 }}>
                    <span style={{ fontSize:10, fontWeight:600, color:'#334155', minWidth:28 }}>{c.total.toLocaleString()}</span>
                    <div style={{ flex:1, height:4, borderRadius:3, background:'#eef2ff', overflow:'hidden' }}>
                      <div style={{ height:'100%', borderRadius:3, background:'#4f46e5', width:`${(c.pct/9.9)*100}%` }} />
                    </div>
                  </div>
                  <div style={{ fontSize:10, color:'#64748b', padding:'5px 0', borderBottom:i<9?'1px solid #f8fafc':'none', textAlign:'right' }}>{c.pct}%</div>
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>

        {/* ── PARTNERS BY ROLE SUMMARY TABLE + RECENT REGISTRATIONS ── */}
        <div style={{ display:'grid', gridTemplateColumns:'1.1fr 1fr', gap:12, marginBottom:12 }}>

          {/* Summary Table */}
          <div style={{ background:'#fff', borderRadius:10, padding:'18px', boxShadow:'0 1px 3px rgba(0,0,0,0.05)', border:'1px solid #e8edf2', overflowY: 'auto', maxHeight: '400px' }}>
            <h2 style={{ fontSize:13, fontWeight:700, color:'#0f172a', margin:'0 0 12px' }}>Partners by Role Summary</h2>
            <table style={{ width:'100%', borderCollapse:'collapse', fontSize:10, minWidth:600 }}>
              <thead>
                <tr style={{ background:'#f8fafc' }}>
                  {['Role','Total','Active','Inactive','Online','Offline','Login (Today)','Logout (Today)','Suspended'].map(h => (
                    <th key={h} style={{ padding:'8px 6px', textAlign:h==='Role'?'left':'right', fontWeight:700, color:'#64748b', fontSize:9.5, borderBottom:'1px solid #f1f5f9', whiteSpace:'nowrap' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {roleSummary.map((r,i) => (
                  <tr key={i} style={{ borderBottom:'1px solid #f8fafc' }}>
                    <td style={{ padding:'8px 6px', fontWeight:600, color:'#334155', whiteSpace:'nowrap', fontSize:10 }}>{r.role}</td>
                    <td style={{ padding:'8px 6px', textAlign:'right', fontWeight:700, color:'#0f172a' }}>{r.total.toLocaleString()}</td>
                    <td style={{ padding:'8px 6px', textAlign:'right', color:'#16a34a', fontWeight:600 }}>{r.active.toLocaleString()} <span style={{ color:'#94a3b8', fontWeight:400 }}>({pct(r.active,r.total)})</span></td>
                    <td style={{ padding:'8px 6px', textAlign:'right', color:'#dc2626', fontWeight:600 }}>{r.inactive.toLocaleString()} <span style={{ color:'#94a3b8', fontWeight:400 }}>({pct(r.inactive,r.total)})</span></td>
                    <td style={{ padding:'8px 6px', textAlign:'right', color:'#2563eb', fontWeight:600 }}>{r.online.toLocaleString()}</td>
                    <td style={{ padding:'8px 6px', textAlign:'right', color:'#64748b', fontWeight:600 }}>{r.offline.toLocaleString()} <span style={{ color:'#94a3b8', fontWeight:400 }}>({pct(r.offline,r.total)})</span></td>
                    <td style={{ padding:'8px 6px', textAlign:'right', color:'#0f172a' }}>{r.loginToday.toLocaleString()} <span style={{ color:'#94a3b8', fontWeight:400 }}>({pct(r.loginToday,r.total)})</span></td>
                    <td style={{ padding:'8px 6px', textAlign:'right', color:'#0f172a' }}>{r.logoutToday.toLocaleString()} <span style={{ color:'#94a3b8', fontWeight:400 }}>({pct(r.logoutToday,r.total)})</span></td>
                    <td style={{ padding:'8px 6px', textAlign:'right', color:'#ef4444', fontWeight:600 }}>{r.suspended} <span style={{ color:'#94a3b8', fontWeight:400 }}>({pct(r.suspended,r.total)})</span></td>
                  </tr>
                ))}
                {/* Total row */}
                <tr style={{ background:'#f8fafc', borderTop:'2px solid #e8edf2' }}>
                  <td style={{ padding:'8px 6px', fontWeight:800, color:'#0f172a', fontSize:10 }}>Total</td>
                  <td style={{ padding:'8px 6px', textAlign:'right', fontWeight:800, color:'#0f172a' }}>{totalRow.total.toLocaleString()}</td>
                  <td style={{ padding:'8px 6px', textAlign:'right', fontWeight:700, color:'#16a34a' }}>{totalRow.active.toLocaleString()} <span style={{ color:'#94a3b8', fontWeight:400 }}>({pct(totalRow.active,totalRow.total)})</span></td>
                  <td style={{ padding:'8px 6px', textAlign:'right', fontWeight:700, color:'#dc2626' }}>{totalRow.inactive.toLocaleString()} <span style={{ color:'#94a3b8', fontWeight:400 }}>({pct(totalRow.inactive,totalRow.total)})</span></td>
                  <td style={{ padding:'8px 6px', textAlign:'right', fontWeight:700, color:'#2563eb' }}>{totalRow.online.toLocaleString()}</td>
                  <td style={{ padding:'8px 6px', textAlign:'right', fontWeight:700, color:'#64748b' }}>{totalRow.offline.toLocaleString()} <span style={{ color:'#94a3b8', fontWeight:400 }}>({pct(totalRow.offline,totalRow.total)})</span></td>
                  <td style={{ padding:'8px 6px', textAlign:'right', fontWeight:700 }}>{totalRow.loginToday.toLocaleString()} <span style={{ color:'#94a3b8', fontWeight:400 }}>({pct(totalRow.loginToday,totalRow.total)})</span></td>
                  <td style={{ padding:'8px 6px', textAlign:'right', fontWeight:700 }}>{totalRow.logoutToday.toLocaleString()} <span style={{ color:'#94a3b8', fontWeight:400 }}>({pct(totalRow.logoutToday,totalRow.total)})</span></td>
                  <td style={{ padding:'8px 6px', textAlign:'right', fontWeight:700, color:'#ef4444' }}>{totalRow.suspended} <span style={{ color:'#94a3b8', fontWeight:400 }}>({pct(totalRow.suspended,totalRow.total)})</span></td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Recent Partner Registrations */}
          <div style={{ background:'#fff', borderRadius:10, padding:'18px', boxShadow:'0 1px 3px rgba(0,0,0,0.05)', border:'1px solid #e8edf2', overflowY: 'auto', maxHeight: '400px' }}>
            <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:12 }}>
              <h2 style={{ fontSize:13, fontWeight:700, color:'#0f172a', margin:0 }}>Recent Partner Registrations</h2>
            </div>
            <table style={{ width:'100%', borderCollapse:'collapse', fontSize:11 }}>
              <thead>
                <tr style={{ background:'#f8fafc' }}>
                  {['Partner Name','Role','City','Registered On','Status'].map(h => (
                    <th key={h} style={{ padding:'8px 8px', textAlign:'left', fontWeight:700, color:'#64748b', fontSize:9.5, borderBottom:'1px solid #f1f5f9', whiteSpace:'nowrap' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {recentRegistrations.map((r,i) => (
                  <tr key={i} style={{ borderBottom:i<recentRegistrations.length-1?'1px solid #f8fafc':'none' }}>
                    <td style={{ padding:'9px 8px', fontWeight:600, color:'#0f172a' }}>{r.name}</td>
                    <td style={{ padding:'9px 8px', color:'#475569' }}>{r.role}</td>
                    <td style={{ padding:'9px 8px', color:'#475569' }}>{r.city}</td>
                    <td style={{ padding:'9px 8px', color:'#64748b', whiteSpace:'nowrap' }}>{r.date}</td>
                    <td style={{ padding:'9px 8px' }}>
                      <span style={{
                        fontSize:9.5, fontWeight:700, padding:'3px 8px', borderRadius:12,
                        background: r.status==='Active' ? '#f0fdf4' : r.status==='Pending' ? '#fff7ed' : '#fff1f2',
                        color: statusColors[r.status] || '#64748b',
                      }}>{r.status}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div style={{ display:'flex', justifyContent:'flex-end', marginTop:10 }}>
              <button onClick={() => { setViewAllModal('partners'); setSelectedRow(null); }} style={{ background:'none', border:'none', color:'#2563eb', fontSize:11, fontWeight:600, cursor:'pointer', display:'flex', alignItems:'center', gap:4 }}>View All Partners →</button>
            </div>
          </div>
        </div>

        {/* ── QUICK SUMMARY FOOTER ── */}
        <div style={{
          background:'#fff', borderRadius:10, padding:'13px 18px',
          boxShadow:'0 1px 3px rgba(0,0,0,0.05)', border:'1px solid #e8edf2',
          display:'flex', alignItems:'center', justifyContent:'space-between', flexWrap:'wrap', gap:10,
        }}>
          <h2 style={{ fontSize:13, fontWeight:700, color:'#0f172a', margin:0, minWidth:80 }}>Quick Summary</h2>
          <div style={{ display:'flex', alignItems:'center', gap:16, flex:1, flexWrap:'wrap' }}>
            {kpis.slice(0,8).map((k,i) => {
              const Icon = k.icon;
              return (
                <div key={i} style={{ display:'flex', alignItems:'center', gap:7 }}>
                  {i > 0 && <div style={{ width:1, height:26, background:'#e8edf2' }} />}
                  <div style={{ background:k.iconBg, borderRadius:7, padding:'5px', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
                    <Icon size={13} color={k.iconColor} />
                  </div>
                  <div>
                    <div style={{ fontSize:9, color:'#94a3b8', fontWeight:500, whiteSpace:'nowrap' }}>{k.label}</div>
                    <div style={{ fontSize:13, fontWeight:800, color:'#0f172a' }}>{fmtNum(k.value)}</div>
                  </div>
                </div>
              );
            })}
          </div>
          <button onClick={() => addToast('Generating partner report...','success')} style={{
            display:'flex', alignItems:'center', gap:6, padding:'8px 14px', borderRadius:8,
            border:'1px solid #dde3ea', background:'#fff', color:'#0f172a', fontSize:12, fontWeight:600,
            cursor:'pointer', flexShrink:0, whiteSpace:'nowrap', transition:'all 0.15s',
          }}
            onMouseEnter={e => { e.currentTarget.style.background='#0f172a'; e.currentTarget.style.color='#fff'; }}
            onMouseLeave={e => { e.currentTarget.style.background='#fff'; e.currentTarget.style.color='#0f172a'; }}
          >
            <Download size={13} /> Export Report <ChevronDown size={11} />
          </button>
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
                  {selectedRow ? 'Record Details' : 'All Recent Partners'}
                </h3>
              </div>
              <button className="sd-modal-close" onClick={() => { setViewAllModal(null); setSelectedRow(null); }} style={{background:'transparent',border:'none',color:'#64748b',cursor:'pointer'}}><X size={18} /></button>
            </div>
            
            <div className="sd-modal-body" style={{padding:24,overflowY:'auto',flex:1}}>
              {selectedRow ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                  {Object.keys(selectedRow).map(k => {
                    if (k === 'icon') return null; // Skip rendering icon component
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
                      let data = recentRegistrations;
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

      <ExportReportModal isOpen={isExportOpen} onClose={() => setIsExportOpen(false)} entityName="Partner Analytics Report" data={recentRegistrations} />
    </AdminShell>
  );
}
