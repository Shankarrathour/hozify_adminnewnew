import React, { useState, useMemo } from 'react';
import {
  Users, UserPlus, UserCheck, UserMinus, LogIn, LogOut,
  ShieldX, Trash2, TrendingUp, TrendingDown, Download,
  ChevronDown, RotateCcw
} from 'lucide-react';
import AdminShell from '../../components/layouts/AdminShell';
import { useToast } from '../../components/common/ToastNotification';
import {
  LineChart, Line, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';

// ─── MOCK DATA ────────────────────────────────────────────────────────────────

const trendData = [
  { day:'01 May', newUsers:1800, active:6200, login:4800, logout:3100, blocked:400 },
  { day:'05 May', newUsers:2100, active:7800, login:5600, logout:3800, blocked:350 },
  { day:'10 May', newUsers:1600, active:6800, login:5100, logout:3400, blocked:420 },
  { day:'15 May', newUsers:2500, active:8500, login:6200, logout:4200, blocked:300 },
  { day:'20 May', newUsers:2200, active:7900, login:6100, logout:4000, blocked:380 },
  { day:'25 May', newUsers:2800, active:9000, login:7000, logout:4600, blocked:280 },
  { day:'31 May', newUsers:3100, active:9800, login:7500, logout:5100, blocked:250 },
];

const monthlyGrowth = [
  { month:'Jan', users:61000 }, { month:'Feb', users:65000 }, { month:'Mar', users:70000 },
  { month:'Apr', users:75000 }, { month:'May', users:82000 }, { month:'Jun', users:79000 },
  { month:'Jul', users:76000 }, { month:'Aug', users:80000 }, { month:'Sep', users:70000 },
  { month:'Oct', users:66000 }, { month:'Nov', users:62000 }, { month:'Dec', users:58000 },
];

const statusDist = [
  { name:'Active Users',   value:48215, color:'#22c55e', pct:'48.9%' },
  { name:'Inactive Users', value:1204,  color:'#94a3b8', pct:'1.2%'  },
  { name:'Logged In',      value:32756, color:'#2563eb', pct:'33.2%' },
  { name:'Logged Out',     value:65886, color:'#8b5cf6', pct:'66.8%' },
  { name:'Blocked Users',  value:156,   color:'#ef4444', pct:'0.2%'  },
];

const genderDist = [
  { name:'Male',   value:61652, color:'#2563eb', pct:'62.5%' },
  { name:'Female', value:36240, color:'#ec4899', pct:'36.8%' },
  { name:'Other',  value:750,   color:'#f59e0b', pct:'0.7%'  },
];

const citiesData = [
  { rank:1, city:'Hyderabad', users:8654, pct:18.0 },
  { rank:2, city:'Bengaluru', users:6245, pct:13.0 },
  { rank:3, city:'Mumbai',    users:5842, pct:12.1 },
  { rank:4, city:'Delhi',     users:4958, pct:10.3 },
  { rank:5, city:'Pune',      users:3652, pct:7.6  },
  { rank:6, city:'Chennai',   users:3215, pct:6.7  },
  { rank:7, city:'Kolkata',   users:2654, pct:5.5  },
  { rank:8, city:'Ahmedabad', users:2059, pct:4.3  },
  { rank:9, city:'Jaipur',    users:1654, pct:3.4  },
  { rank:10,city:'Surat',     users:1450, pct:2.9  },
];

const DAYS = ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'];

const heatmapData = DAYS.map(day => ({
  day,
  values: Array.from({ length: 24 }, (_, h) => {
    const base = h >= 9 && h <= 22 ? 60 : 15;
    return Math.floor(base + Math.random() * 40);
  }),
}));

// ─── HELPERS ─────────────────────────────────────────────────────────────────

function fmtNum(n) {
  if (n >= 1_000_000) return (n / 1_000_000).toFixed(1) + 'M';
  if (n >= 1_000)     return n.toLocaleString();
  return n.toString();
}

function heatColor(val) {
  if (val < 25) return '#ede9fe';
  if (val < 45) return '#c4b5fd';
  if (val < 60) return '#a78bfa';
  if (val < 78) return '#7c3aed';
  return '#4c1d95';
}

// ─── CUSTOM TOOLTIP ──────────────────────────────────────────────────────────

const LineTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div style={{ background:'#1e293b', borderRadius:10, padding:'10px 14px', fontSize:11 }}>
      <div style={{ color:'#94a3b8', fontWeight:700, marginBottom:6 }}>{label}</div>
      {payload.map(p => (
        <div key={p.name} style={{ display:'flex', alignItems:'center', gap:6, marginBottom:3 }}>
          <span style={{ width:8, height:8, borderRadius:'50%', background:p.color, display:'inline-block' }} />
          <span style={{ color:'#cbd5e1' }}>{p.name}:</span>
          <strong style={{ color:'#fff' }}>{fmtNum(p.value)}</strong>
        </div>
      ))}
    </div>
  );
};

const BarTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div style={{
      background:'#fff', borderRadius:10, padding:'10px 14px', fontSize:11,
      boxShadow:'0 4px 20px rgba(0,0,0,0.12)', border:'1px solid #e8edf2',
    }}>
      <div style={{ color:'#0f172a', fontWeight:700, marginBottom:6 }}>{label} 2026</div>
      <div style={{ display:'flex', alignItems:'center', gap:6, color:'#4f46e5' }}>
        <span style={{ width:8, height:8, borderRadius:'50%', background:'#4f46e5', display:'inline-block', flexShrink:0 }} />
        <span style={{ color:'#334155', fontWeight:500 }}>Total Users:</span>
        <strong style={{ color:'#0f172a' }}>{payload[0].value.toLocaleString()}</strong>
      </div>
    </div>
  );
};

// ─── DONUT CENTER LABEL ───────────────────────────────────────────────────────
const DonutCenter = ({ viewBox, value, label }) => {
  const { cx, cy } = viewBox;
  return (
    <g>
      <text x={cx} y={cy-7} textAnchor="middle" fill="#0f172a" fontSize={18} fontWeight={800}>{value}</text>
      <text x={cx} y={cy+10} textAnchor="middle" fill="#94a3b8" fontSize={9} fontWeight={600}>{label}</text>
    </g>
  );
};

// ─── MAIN COMPONENT ──────────────────────────────────────────────────────────

export default function UserAnalytics({ activeTab = 'Dashboard' }) {
  const { addToast } = useToast();
  const [period, setPeriod] = useState('Monthly');

  const [filterTrigger, setFilterTrigger] = useState(0);

  const handleApply = () => {
    setFilterTrigger(prev => prev + 1);
    addToast('Filters applied successfully', 'success');
  };
  const handleReset = () => { 
    setPeriod('Monthly'); 
    setFilterTrigger(0);
    addToast('Filters reset', 'info'); 
  };
  const handleExport = () => addToast('Generating report... Download will start shortly.', 'success');

  const periodMultiplier = period === 'Daily' ? 0.03 : period === 'Weekly' ? 0.25 : period === 'Yearly' ? 12 : 1;
  const filterMultiplier = filterTrigger === 0 ? 1 : 1 + ((filterTrigger % 5) * 0.15);
  const m = periodMultiplier * filterMultiplier;

  // KPI definitions
  const dynKpis = useMemo(() => [
    { label:'Total Users',     val:Math.floor(98642 * (m>=1?1:m)),  sub:'All Time',   pct:18.5, up:true,  color:'#2563eb', bg:'#eff6ff', icon:<Users size={16} color="#2563eb" />      },
    { label:'New Users',       val:Math.floor(2842 * m),   sub:'This Period', pct:12.4, up:true,  color:'#22c55e', bg:'#f0fdf4', icon:<UserPlus size={16} color="#22c55e" />    },
    { label:'Active Users',    val:Math.floor(48215 * m),  sub:'This Period', pct:8.7,  up:true,  color:'#8b5cf6', bg:'#faf5ff', icon:<UserCheck size={16} color="#8b5cf6" />   },
    { label:'Inactive Users',  val:Math.floor(1204 * m),   sub:'This Period', pct:2.1,  up:false, color:'#f97316', bg:'#fff7ed', icon:<UserMinus size={16} color="#f97316" />   },
    { label:'Logged In',       val:Math.floor(32756 * m),  sub:'This Period', pct:9.6,  up:true,  color:'#2563eb', bg:'#eff6ff', icon:<LogIn size={16} color="#2563eb" />       },
    { label:'Logged Out',      val:Math.floor(65886 * m),  sub:'This Period', pct:10.3, up:true,  color:'#8b5cf6', bg:'#faf5ff', icon:<LogOut size={16} color="#8b5cf6" />      },
    { label:'Blocked Users',   val:Math.floor(156 * m),    sub:'This Period', pct:5.4,  up:false, color:'#ef4444', bg:'#fff1f2', icon:<ShieldX size={16} color="#ef4444" />     },
  ], [m, filterTrigger]);

  const dynTrendData = useMemo(() => trendData.map(d => ({
    ...d,
    newUsers: Math.floor(d.newUsers * m),
    active: Math.floor(d.active * m),
    login: Math.floor(d.login * m),
    logout: Math.floor(d.logout * m),
    blocked: Math.floor(d.blocked * m)
  })), [m, filterTrigger]);

  const dynMonthlyGrowth = useMemo(() => monthlyGrowth.map(d => ({
    ...d,
    users: Math.floor(d.users * m)
  })), [m, filterTrigger]);

  const dynStatusDist = useMemo(() => statusDist.map(d => ({
    ...d,
    value: Math.floor(d.value * m)
  })), [m, filterTrigger]);

  const dynGenderDist = useMemo(() => genderDist.map(d => ({
    ...d,
    value: Math.floor(d.value * m)
  })), [m, filterTrigger]);

  const dynCitiesData = useMemo(() => citiesData.map(d => ({
    ...d,
    users: Math.floor(d.users * m)
  })), [m, filterTrigger]);

  const dynHeatmapData = useMemo(() => heatmapData.map(d => ({
    ...d,
    values: d.values.map(v => Math.floor(v * (m > 1 ? 1 : m)))
  })), [m, filterTrigger]);



  return (
    <AdminShell activeTab={activeTab} headerTitle="User Dashboard" searchPlaceholder="Search pages, modules...">
      <div style={{ padding:'20px 24px 48px', background:'#f8fafc', minHeight:'100vh', fontFamily:"'Inter', -apple-system, sans-serif" }}>

        {/* ── FILTER BAR ── */}
        <div style={{
          background:'#fff', borderRadius:10, padding:'12px 16px',
          boxShadow:'0 1px 3px rgba(0,0,0,0.06)', marginBottom:16,
          display:'flex', alignItems:'flex-end', flexWrap:'wrap', gap:12,
          border:'1px solid #e8edf2',
        }}>
          {/* Location Dropdowns */}
          {[
            { label:'State',    opts:['All States','Maharashtra','Karnataka','Telangana','Tamil Nadu','Delhi'] },
            { label:'City',     opts:['All Cities','Mumbai','Bengaluru','Hyderabad','Chennai','Delhi','Pune'] },
            { label:'District', opts:['All Districts','Andheri','Koramangala','Banjara Hills','T. Nagar'] },
          ].map(f => (
            <div key={f.label} style={{ display:'flex', flexDirection:'column', gap:4 }}>
              <label style={{ fontSize:10, fontWeight:600, color:'#94a3b8', letterSpacing:0.3 }}>{f.label}</label>
              <div style={{ position:'relative' }}>
                <select style={{
                  appearance:'none', background:'#fff', border:'1px solid #dde3ea',
                  borderRadius:6, padding:'6px 28px 6px 10px', fontSize:12,
                  fontWeight:500, color:'#334155', cursor:'pointer', outline:'none', minWidth:120,
                }}>
                  {f.opts.map(o => <option key={o}>{o}</option>)}
                </select>
                <ChevronDown size={11} style={{ position:'absolute', right:8, top:'50%', transform:'translateY(-50%)', color:'#94a3b8', pointerEvents:'none' }} />
              </div>
            </div>
          ))}

          {/* Divider */}
          <div style={{ width:1, height:34, background:'#e8edf2', alignSelf:'flex-end', margin:'0 4px' }} />

          {/* Period Pills */}
          <div style={{ display:'flex', flexDirection:'column', gap:4 }}>
            <label style={{ fontSize:10, fontWeight:600, color:'transparent', letterSpacing:0.3 }}>_</label>
            <div style={{ display:'flex', border:'1px solid #dde3ea', borderRadius:6, overflow:'hidden' }}>
              {['Daily','Weekly','Monthly','Yearly'].map((p, i) => (
                <button key={p} onClick={() => setPeriod(p)} style={{
                  padding:'6px 14px', border:'none',
                  borderLeft: i > 0 ? '1px solid #dde3ea' : 'none',
                  fontSize:12, fontWeight:600, cursor:'pointer', transition:'all 0.15s',
                  background: period === p ? '#0f172a' : '#fff',
                  color: period === p ? '#fff' : '#64748b',
                }}>{p}</button>
              ))}
            </div>
          </div>

          {/* Month + Year dropdowns */}
          {[
            { label:'Month', opts:['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'], def:'May' },
            { label:'Year',  opts:['2026','2025','2024','2023'], def:'2026' },
          ].map(f => (
            <div key={f.label} style={{ display:'flex', flexDirection:'column', gap:4 }}>
              <label style={{ fontSize:10, fontWeight:600, color:'transparent', letterSpacing:0.3 }}>_</label>
              <div style={{ position:'relative' }}>
                <select defaultValue={f.def} style={{
                  appearance:'none', background:'#fff', border:'1px solid #dde3ea',
                  borderRadius:6, padding:'6px 28px 6px 10px', fontSize:12,
                  fontWeight:500, color:'#334155', cursor:'pointer', outline:'none', minWidth:72,
                }}>
                  {f.opts.map(o => <option key={o}>{o}</option>)}
                </select>
                <ChevronDown size={11} style={{ position:'absolute', right:8, top:'50%', transform:'translateY(-50%)', color:'#94a3b8', pointerEvents:'none' }} />
              </div>
            </div>
          ))}

          {/* Apply / Reset */}
          <div style={{ display:'flex', gap:8, alignSelf:'flex-end' }}>
            <button onClick={handleApply} style={{
              padding:'7px 20px', borderRadius:6, border:'none',
              background:'#0f172a', color:'#fff', fontSize:12, fontWeight:600,
              cursor:'pointer', transition:'opacity 0.15s',
            }}
              onMouseEnter={e=>e.currentTarget.style.opacity='0.85'}
              onMouseLeave={e=>e.currentTarget.style.opacity='1'}
            >Apply</button>
            <button onClick={handleReset} style={{
              padding:'7px 16px', borderRadius:6, border:'1px solid #dde3ea',
              background:'#fff', color:'#334155', fontSize:12, fontWeight:600,
              cursor:'pointer', transition:'background 0.15s',
            }}
              onMouseEnter={e=>e.currentTarget.style.background='#f8fafc'}
              onMouseLeave={e=>e.currentTarget.style.background='#fff'}
            >Reset</button>
          </div>
        </div>

        {/* ── KPI CARDS – single row 7 cards ── */}
        <div style={{
          display:'grid',
          gridTemplateColumns:'repeat(7, 1fr)',
          gap:12, marginBottom:16,
        }}>
          {dynKpis.map((k, i) => (
            <div key={i} style={{
              background:'#fff', borderRadius:10, padding:'14px 14px 12px',
              boxShadow:'0 1px 3px rgba(0,0,0,0.06)', border:'1px solid #e8edf2',
              transition:'transform 0.18s, box-shadow 0.18s', cursor:'default',
            }}
              onMouseEnter={e=>{e.currentTarget.style.transform='translateY(-2px)';e.currentTarget.style.boxShadow='0 6px 20px rgba(37,99,235,0.1)';}}
              onMouseLeave={e=>{e.currentTarget.style.transform='translateY(0)';e.currentTarget.style.boxShadow='0 1px 3px rgba(0,0,0,0.06)';}}
            >
              {/* Icon + Label row */}
              <div style={{ display:'flex', alignItems:'center', gap:8, marginBottom:6 }}>
                <div style={{ background:k.bg, borderRadius:8, padding:'6px', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
                  {k.icon}
                </div>
                <span style={{ fontSize:10, fontWeight:600, color:'#64748b', lineHeight:1.3 }}>{k.label}</span>
              </div>
              {/* Value */}
              <div style={{ fontSize:22, fontWeight:800, color:'#0f172a', lineHeight:1, marginBottom:4 }}>
                {fmtNum(k.val)}
              </div>
              {/* Sub + Trend */}
              <div style={{ fontSize:10, color:'#94a3b8', marginBottom:4 }}>{k.sub}</div>
              <div style={{ display:'flex', alignItems:'center', gap:4 }}>
                {k.up
                  ? <TrendingUp size={10} color="#16a34a" />
                  : <TrendingDown size={10} color="#dc2626" />
                }
                <span style={{ fontSize:10, fontWeight:700, color: k.up ? '#16a34a' : '#dc2626' }}>
                  {k.up ? '+' : '-'}{k.pct}%
                </span>
              </div>
              <div style={{ fontSize:9, color:'#cbd5e1', marginTop:3 }}>vs Apr 2026</div>
            </div>
          ))}
        </div>

        {/* ── ROW 2: Line Chart + Status Donut + Gender Donut ── */}
        <div style={{ display:'grid', gridTemplateColumns:'1.85fr 1fr 1fr', gap:12, marginBottom:12 }}>

          {/* User Overview Trend - Line Chart */}
          <div style={{ background:'#fff', borderRadius:10, padding:'18px 18px 10px', boxShadow:'0 1px 3px rgba(0,0,0,0.06)', border:'1px solid #e8edf2' }}>
            <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:12 }}>
              <h2 style={{ fontSize:13, fontWeight:700, color:'#0f172a', margin:0 }}>User Overview Trend</h2>
              <div style={{ display:'flex', alignItems:'center', gap:5, fontSize:11, color:'#64748b', border:'1px solid #e2e8f0', borderRadius:6, padding:'4px 10px', cursor:'pointer' }}>
                Line Chart <ChevronDown size={11} />
              </div>
            </div>
            <ResponsiveContainer width="100%" height={210}>
              <LineChart data={dynTrendData} margin={{ top:4, right:8, left:-24, bottom:0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="day" tick={{ fontSize:9, fill:'#94a3b8' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize:9, fill:'#94a3b8' }} axisLine={false} tickLine={false} tickFormatter={v => v >= 1000 ? (v/1000)+'K' : v} />
                <Tooltip content={<LineTooltip />} />
                <Legend iconType="circle" iconSize={7} wrapperStyle={{ fontSize:10, paddingTop:8 }} />
                <Line type="monotone" dataKey="newUsers"  name="New Users"    stroke="#2563eb" strokeWidth={2} dot={false} />
                <Line type="monotone" dataKey="active"    name="Active Users"  stroke="#22c55e" strokeWidth={2} dot={false} />
                <Line type="monotone" dataKey="login"     name="Login"         stroke="#8b5cf6" strokeWidth={2} dot={false} />
                <Line type="monotone" dataKey="logout"    name="Logout"        stroke="#f97316" strokeWidth={2} dot={false} />
                <Line type="monotone" dataKey="blocked"   name="Blocked"       stroke="#ef4444" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* User Status Distribution */}
          <div style={{ background:'#fff', borderRadius:10, padding:'18px', boxShadow:'0 1px 3px rgba(0,0,0,0.06)', border:'1px solid #e8edf2', display:'flex', flexDirection:'column' }}>
            <h2 style={{ fontSize:13, fontWeight:700, color:'#0f172a', margin:'0 0 10px' }}>User Status Distribution</h2>
            <div style={{ display:'flex', justifyContent:'center', alignItems:'center', position: 'relative' }}>
              <PieChart width={160} height={160}>
                  <Pie data={dynStatusDist} cx={80} cy={80} innerRadius={52} outerRadius={74} paddingAngle={2} dataKey="value" startAngle={90} endAngle={-270}>
                    {dynStatusDist.map((e, i) => <Cell key={i} fill={e.color} />)}
                  </Pie>
              </PieChart>
              <div style={{ position:'absolute', textAlign:'center', pointerEvents:'none' }}>
                <span style={{ display:'block', fontSize:14, fontWeight:800, color:'#0f172a' }}>{fmtNum(Math.floor(98642 * (m>=1?1:m)))}</span>
                <span style={{ fontSize:9, color:'#94a3b8' }}>Total</span>
              </div>
            </div>
            <div style={{ display:'flex', flexDirection:'column', gap:5, marginTop:6 }}>
              {dynStatusDist.map((item, i) => (
                <div key={i} style={{ display:'flex', alignItems:'center', justifyContent:'space-between', fontSize:10 }}>
                  <div style={{ display:'flex', alignItems:'center', gap:5 }}>
                    <span style={{ width:7, height:7, borderRadius:'50%', background:item.color, flexShrink:0, display:'inline-block' }} />
                    <span style={{ color:'#475569', fontWeight:500 }}>{item.name}</span>
                  </div>
                  <div style={{ display:'flex', gap:6 }}>
                    <span style={{ fontWeight:700, color:'#0f172a' }}>{fmtNum(item.value)}</span>
                    <span style={{ color:'#94a3b8' }}>({item.pct})</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Gender Distribution */}
          <div style={{ background:'#fff', borderRadius:10, padding:'18px', boxShadow:'0 1px 3px rgba(0,0,0,0.06)', border:'1px solid #e8edf2', display:'flex', flexDirection:'column' }}>
            <h2 style={{ fontSize:13, fontWeight:700, color:'#0f172a', margin:'0 0 10px' }}>Gender Distribution</h2>
            <div style={{ display:'flex', justifyContent:'center', alignItems:'center', position: 'relative' }}>
              <PieChart width={160} height={160}>
                  <Pie data={dynGenderDist} cx={80} cy={80} innerRadius={52} outerRadius={74} paddingAngle={2} dataKey="value" startAngle={90} endAngle={-270}>
                    {dynGenderDist.map((e, i) => <Cell key={i} fill={e.color} />)}
                  </Pie>
              </PieChart>
              <div style={{ position:'absolute', textAlign:'center', pointerEvents:'none' }}>
                <span style={{ display:'block', fontSize:14, fontWeight:800, color:'#0f172a' }}>{fmtNum(Math.floor(98642 * (m>=1?1:m)))}</span>
                <span style={{ fontSize:9, color:'#94a3b8' }}>Total</span>
              </div>
            </div>
            <div style={{ display:'flex', flexDirection:'column', gap:5, marginTop:6 }}>
              {dynGenderDist.map((item, i) => (
                <div key={i} style={{ display:'flex', alignItems:'center', justifyContent:'space-between', fontSize:10 }}>
                  <div style={{ display:'flex', alignItems:'center', gap:5 }}>
                    <span style={{ width:7, height:7, borderRadius:'50%', background:item.color, flexShrink:0, display:'inline-block' }} />
                    <span style={{ color:'#475569', fontWeight:500 }}>{item.name}</span>
                  </div>
                  <div style={{ display:'flex', gap:6 }}>
                    <span style={{ fontWeight:700, color:'#0f172a' }}>{fmtNum(item.value)}</span>
                    <span style={{ color:'#94a3b8' }}>({item.pct})</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── ROW 3: Cities + Bar Chart + Heatmap ── */}
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1.4fr 1.3fr', gap:12, marginBottom:12 }}>

          {/* Top 10 Cities */}
          <div style={{ background:'#fff', borderRadius:10, padding:'18px', boxShadow:'0 1px 3px rgba(0,0,0,0.06)', border:'1px solid #e8edf2' }}>
            <h2 style={{ fontSize:13, fontWeight:700, color:'#0f172a', margin:'0 0 12px' }}>Top 10 Cities by Active Users</h2>
            <div style={{ display:'grid', gridTemplateColumns:'auto 1fr auto', columnGap:12, rowGap:0, alignItems:'center' }}>
              {/* Header */}
              <div style={{ fontSize:10, fontWeight:600, color:'#94a3b8', paddingBottom:8, borderBottom:'1px solid #f1f5f9' }}>City</div>
              <div style={{ fontSize:10, fontWeight:600, color:'#94a3b8', paddingBottom:8, borderBottom:'1px solid #f1f5f9' }}>Active Users</div>
              <div style={{ fontSize:10, fontWeight:600, color:'#94a3b8', paddingBottom:8, borderBottom:'1px solid #f1f5f9', textAlign:'right' }}>%</div>
              {/* Rows */}
              {dynCitiesData.map((c, i) => (
                <React.Fragment key={i}>
                  <div style={{ fontSize:11, fontWeight:600, color:'#0f172a', padding:'7px 0', borderBottom: i<9 ? '1px solid #f8fafc' : 'none', whiteSpace:'nowrap' }}>{c.city}</div>
                  <div style={{ padding:'7px 0', borderBottom: i<9 ? '1px solid #f8fafc' : 'none', display:'flex', alignItems:'center', gap:8 }}>
                    <span style={{ fontSize:11, fontWeight:600, color:'#334155', minWidth:36, textAlign:'right' }}>{c.users.toLocaleString()}</span>
                    <div style={{ flex:1, height:4, borderRadius:3, background:'#eef2ff', overflow:'hidden' }}>
                      <div style={{ height:'100%', borderRadius:3, background:'#4f46e5', width:`${(c.pct/18)*100}%`, transition:'width 0.3s' }} />
                    </div>
                  </div>
                  <div style={{ fontSize:11, color:'#64748b', padding:'7px 0', borderBottom: i<9 ? '1px solid #f8fafc' : 'none', textAlign:'right' }}>{c.pct}%</div>
                </React.Fragment>
              ))}
            </div>
          </div>

          {/* User Growth by Month - Bar Chart with gradient */}
          <div style={{ background:'#fff', borderRadius:10, padding:'18px 18px 10px', boxShadow:'0 1px 3px rgba(0,0,0,0.06)', border:'1px solid #e8edf2' }}>
            <h2 style={{ fontSize:13, fontWeight:700, color:'#0f172a', margin:'0 0 14px' }}>User Growth by Month (2026)</h2>
            <ResponsiveContainer width="100%" height={240}>
              <BarChart data={dynMonthlyGrowth} margin={{ top:8, right:4, left:-16, bottom:0 }} barSize={22}
                style={{ cursor:'default' }}
              >
                <defs>
                  <linearGradient id="barGradient" x1="0" y1="1" x2="0" y2="0">
                    <stop offset="0%"   stopColor="#818cf8" stopOpacity={1} />
                    <stop offset="100%" stopColor="#3730a3" stopOpacity={1} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                <XAxis
                  dataKey="month"
                  tick={{ fontSize:9, fill:'#94a3b8', fontWeight:500 }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  tick={{ fontSize:9, fill:'#94a3b8', fontWeight:500 }}
                  axisLine={false}
                  tickLine={false}
                  tickFormatter={v => v === 0 ? '0' : (v / 1000) + 'K'}
                  domain={[0, 100000]}
                  ticks={[0, 20000, 40000, 60000, 80000, 100000]}
                />
                <Tooltip content={<BarTooltip />} cursor={{ fill:'rgba(99,102,241,0.06)', radius:4 }} />
                <Bar dataKey="users" radius={[6,6,0,0]} fill="url(#barGradient)" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Activity Heatmap */}
          <div style={{ background:'#fff', borderRadius:10, padding:'18px', boxShadow:'0 1px 3px rgba(0,0,0,0.06)', border:'1px solid #e8edf2', overflow:'hidden' }}>
            <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:14 }}>
              <h2 style={{ fontSize:13, fontWeight:700, color:'#0f172a', margin:0 }}>User Activity Heatmap</h2>
              <div style={{ display:'flex', alignItems:'center', gap:4, fontSize:10, color:'#64748b', border:'1px solid #e2e8f0', borderRadius:6, padding:'4px 9px', cursor:'pointer' }}>
                By Hour <ChevronDown size={10} />
              </div>
            </div>
            {/* Main heatmap grid */}
            <div style={{ display:'flex', gap:0 }}>
              {/* Day labels column */}
              <div style={{ display:'flex', flexDirection:'column', gap:3, paddingTop:18, marginRight:6 }}>
                {DAYS.map(d => (
                  <div key={d} style={{ height:14, fontSize:9, color:'#94a3b8', fontWeight:600, display:'flex', alignItems:'center', whiteSpace:'nowrap' }}>{d}</div>
                ))}
              </div>
              {/* Cells + Hour labels */}
              <div style={{ flex:1, overflow:'hidden' }}>
                {/* Hour labels */}
                <div style={{ display:'flex', justifyContent:'space-between', marginBottom:4, paddingRight:1 }}>
                  {['12 AM','4 AM','8 AM','12 PM','4 PM','8 PM','11 PM'].map((h) => (
                    <span key={h} style={{ fontSize:8, color:'#94a3b8', fontWeight:500 }}>{h}</span>
                  ))}
                </div>
                {/* Day rows */}
                {dynHeatmapData.map((row, ri) => (
                  <div key={ri} style={{ display:'grid', gridTemplateColumns:'repeat(24, 1fr)', gap:2, marginBottom:3 }}>
                    {row.values.map((v, ci) => (
                      <div
                        key={ci}
                        title={`${row.day} ${ci}:00 — ${v}% activity`}
                        style={{
                          height:14, borderRadius:3,
                          background: heatColor(v),
                          transition:'opacity 0.12s',
                          cursor:'default',
                        }}
                        onMouseEnter={e => e.currentTarget.style.opacity='0.65'}
                        onMouseLeave={e => e.currentTarget.style.opacity='1'}
                      />
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ── QUICK SUMMARY FOOTER ── */}
        <div style={{
          background:'#fff', borderRadius:10, padding:'14px 20px',
          boxShadow:'0 1px 3px rgba(0,0,0,0.06)', border:'1px solid #e8edf2',
          display:'flex', alignItems:'center', justifyContent:'space-between',
          flexWrap:'wrap', gap:12,
        }}>
          <h2 style={{ fontSize:13, fontWeight:700, color:'#0f172a', margin:0, minWidth:100 }}>Quick Summary</h2>
          
          {/* Summary stats */}
          <div style={{ display:'flex', alignItems:'center', gap:20, flex:1, flexWrap:'wrap' }}>
            {dynKpis.slice(0, 7).map((k, i) => (
              <div key={i} style={{ display:'flex', alignItems:'center', gap:8 }}>
                {i > 0 && <div style={{ width:1, height:28, background:'#e8edf2' }} />}
                <div style={{ background:k.bg, borderRadius:7, padding:'5px', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
                  {k.icon}
                </div>
                <div>
                  <div style={{ fontSize:9, color:'#94a3b8', fontWeight:500, whiteSpace:'nowrap' }}>{k.label}</div>
                  <div style={{ fontSize:14, fontWeight:800, color:'#0f172a', lineHeight:1.2 }}>{fmtNum(k.val)}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Export button */}
          <button onClick={handleExport} style={{
            display:'flex', alignItems:'center', gap:6,
            padding:'8px 16px', borderRadius:8, border:'1px solid #dde3ea',
            background:'#fff', color:'#0f172a', fontSize:12, fontWeight:600,
            cursor:'pointer', boxShadow:'0 1px 3px rgba(0,0,0,0.05)',
            transition:'all 0.15s', flexShrink:0, whiteSpace:'nowrap',
          }}
            onMouseEnter={e=>{ e.currentTarget.style.background='#0f172a'; e.currentTarget.style.color='#fff'; }}
            onMouseLeave={e=>{ e.currentTarget.style.background='#fff'; e.currentTarget.style.color='#0f172a'; }}
          >
            <Download size={13} />
            Export Report
            <ChevronDown size={11} />
          </button>
        </div>

      </div>
    </AdminShell>
  );
}
