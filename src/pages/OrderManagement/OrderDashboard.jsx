import React, { useState } from 'react';
import {
  Link, CheckCircle, XCircle, Clock, Users, User, Briefcase, Star,
  Download, ChevronDown, Eye, RefreshCcw
} from 'lucide-react';
import AdminShell from '../../components/layouts/AdminShell';
import { useToast } from '../../components/common/ToastNotification';
import {
  LineChart, Line, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';

// ─── MOCK DATA ────────────────────────────────────────────────────────────────

const referralOverTime = [
  { day:'01 May', total:1200, users:800, partners:400 },
  { day:'05 May', total:1500, users:1000, partners:500 },
  { day:'10 May', total:2100, users:1400, partners:700 },
  { day:'15 May', total:2400, users:1600, partners:800 },
  { day:'20 May', total:2800, users:1900, partners:900 },
  { day:'25 May', total:3200, users:2100, partners:1100 },
  { day:'31 May', total:3600, users:2500, partners:1100 },
];

const genByDist = [
  { name:'Users',        value:1245, color:'#22c55e', pct:'48.5%' },
  { name:'Partners',     value:892,  color:'#3b82f6', pct:'34.7%' },
  { name:'Influencers',  value:431,  color:'#8b5cf6', pct:'16.8%' },
];

const usedByDist = [
  { name:'Users',    value:6125, color:'#3b82f6', pct:'70.8%' },
  { name:'Partners', value:2517, color:'#22c55e', pct:'29.1%' },
];

const statusDist = [
  { name:'Active',           value:1842, color:'#22c55e', pct:'71.7%' },
  { name:'Inactive',         value:562,  color:'#ef4444', pct:'21.9%' },
  { name:'Going to Expire',  value:164,  color:'#f59e0b', pct:'6.4%'  },
];

const rewardDist = [
  { name:'Reward1', value:4125, color:'#3b82f6', pct:'47.7%' },
  { name:'Reward2', value:2653, color:'#22c55e', pct:'30.7%' },
  { name:'Reward3', value:1256, color:'#f59e0b', pct:'14.5%' },
  { name:'Reward4', value:608,  color:'#8b5cf6', pct:'7.0%'  },
];

const expiringCodes = [
  { code:'HOZ98462', expires:'05 Jun 2026', generatedBy:'User',        daysLeft:3 },
  { code:'HOZ75663', expires:'06 Jun 2026', generatedBy:'Partner',     daysLeft:4 },
  { code:'HOZ14487', expires:'07 Jun 2026', generatedBy:'Influencer',  daysLeft:5 },
  { code:'HOZ16219', expires:'08 Jun 2026', generatedBy:'User',        daysLeft:6 },
  { code:'HOZ18351', expires:'09 Jun 2026', generatedBy:'Partner',     daysLeft:7 },
];

const topPerformerUsers = [
  { rank:1, name:'Ramesh Kumar', referred:142 },
  { rank:2, name:'Suresh Babu', referred:98 },
  { rank:3, name:'Priya Sharma', referred:75 },
  { rank:4, name:'Anil Kumar', referred:64 },
  { rank:5, name:'Kavitha Reddy', referred:52 },
];
const topPerformerPartners = [
  { rank:1, name:'Tech Revive Solutions', referred:68 },
  { rank:2, name:'QuickFix Services', referred:47 },
  { rank:3, name:'Home Care Pro', referred:39 },
  { rank:4, name:'Service Hub India', referred:31 },
  { rank:5, name:'Bright Services', referred:27 },
];
const topPerformerInfluencers = [
  { rank:1, name:'Tech Talk India', uRef:218, pRef:108, tRef:326 },
  { rank:2, name:'Home Service Guide', uRef:164, pRef:77, tRef:241 },
  { rank:3, name:'Smart Life Channel', uRef:131, pRef:58, tRef:189 },
  { rank:4, name:'Fix It With Us', uRef:104, pRef:49, tRef:153 },
  { rank:5, name:'Daily Deals', uRef:86, pRef:41, tRef:127 },
];

const rewardPerformance = [
  { type:'Reward1', total:856, used:732, usage:4125, pct:47.7, color:'#3b82f6' },
  { type:'Reward2', total:642, used:521, usage:2653, pct:30.7, color:'#22c55e' },
  { type:'Reward3', total:412, used:298, usage:1256, pct:14.5, color:'#f59e0b' },
  { type:'Reward4', total:218, used:144, usage:608,  pct:7.0,  color:'#8b5cf6' },
];

const codesPerformance = [
  { code:'HOZ98462', genBy:'User', name:'Ramesh Kumar', type:'User', status:'Active', users:18, partners:7, total:25, reward:'Reward1', earned:'₹250.00', expires:'05 Jun 2026', created:'05 May 2026' },
  { code:'HOZ75663', genBy:'Partner', name:'Suresh Electricals', type:'Partner', status:'Active', users:32, partners:13, total:45, reward:'Reward2', earned:'₹450.00', expires:'06 Jun 2026', created:'06 May 2026' },
  { code:'HOZ14487', genBy:'Influencer', name:'Tech Review Hub', type:'Influencer', status:'Going to Expire', users:60, partners:18, total:78, reward:'Reward1', earned:'₹780.00', expires:'07 Jun 2026', created:'07 May 2026' },
  { code:'HOZ16219', genBy:'User', name:'Priya Sharma', type:'User', status:'Inactive', users:9, partners:1, total:10, reward:'Reward3', earned:'₹100.00', expires:'08 Jun 2026', created:'08 May 2026' },
  { code:'HOZ18351', genBy:'Partner', name:'QuickFix Services', type:'Partner', status:'Active', users:24, partners:12, total:36, reward:'Reward4', earned:'₹360.00', expires:'09 Jun 2026', created:'09 May 2026' },
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
      <text x={cx} y={cy - 7} textAnchor="middle" fill="#0f172a" fontSize={15} fontWeight={800}>{value}</text>
      <text x={cx} y={cy + 9}  textAnchor="middle" fill="#94a3b8" fontSize={8}  fontWeight={600}>{label}</text>
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

function FilterSelect({ label, options }) {
  return (
    <div style={{ display:'flex', flexDirection:'column', gap:3, flex:1, minWidth:110 }}>
      {label && <label style={{ fontSize:10, fontWeight:600, color:'#0f172a', letterSpacing:0.3 }}>{label}</label>}
      <div style={{ position:'relative' }}>
        <select style={{
          appearance:'none', background:'#fff', border:'1px solid #dde3ea',
          borderRadius:6, padding:'6px 26px 6px 10px', fontSize:11.5,
          fontWeight:500, color:'#334155', cursor:'pointer', outline:'none', width:'100%',
        }}>
          {options.map(o => <option key={o}>{o}</option>)}
        </select>
        <ChevronDown size={11} style={{ position:'absolute', right:8, top:'50%', transform:'translateY(-50%)', color:'#94a3b8', pointerEvents:'none' }} />
      </div>
    </div>
  );
}

// ─── MAIN ────────────────────────────────────────────────────────────────────
export default function OrderDashboard({ activeTab = 'Order Dashboard' }) {
  const { addToast } = useToast();
  const [period, setPeriod] = useState('Monthly');

  const topKpis = [
    { label:'Total Orders', value:2568, sub:'↑ 18.6% vs Apr 2026', color:'#8b5cf6', bg:'#f5f3ff', icon:Link },
    { label:'Completed Orders', value:1842, sub:'71.7% of total ↑ 12.5%', color:'#22c55e', bg:'#f0fdf4', icon:CheckCircle },
    { label:'Pending Orders', value:562, sub:'21.9% of total ↓ 5.8%', color:'#ef4444', bg:'#fff1f2', icon:XCircle },
    { label:'Cancelled Orders', value:164, sub:'6.4% of total', color:'#f59e0b', bg:'#fffbeb', icon:Clock },
    { label:'Total Revenue', value:8642, sub:'↑ 22.4% vs Apr 2026', color:'#3b82f6', bg:'#eff6ff', icon:Users },
    { label:'Avg Order Value', value:6125, sub:'70.8% of total', color:'#22c55e', bg:'#f0fdf4', icon:User },
    { label:'Products Sold', value:2517, sub:'29.1% of total', color:'#8b5cf6', bg:'#f5f3ff', icon:Briefcase },
    { label:'Active Customers', value:0, isCustom:true, color:'#f59e0b', bg:'#fffbeb', icon:Star },
  ];

  const subKpis = [
    { label:'Users Generated', value:1245, sub:'48.5% of total', unused:312, unusedPct:'25.1%', color:'#3b82f6', bg:'#eff6ff', icon:User },
    { label:'Partners Generated', value:892, sub:'34.7% of total', unused:213, unusedPct:'23.9%', color:'#8b5cf6', bg:'#f5f3ff', icon:Briefcase },
    { label:'Influencers Generated', value:431, sub:'16.8% of total', unused:97, unusedPct:'22.5%', color:'#f59e0b', bg:'#fffbeb', icon:Star },
  ];

  return (
    <AdminShell activeTab={activeTab} headerTitle="Order Dashboard" searchPlaceholder="Search pages, modules...">
      <div style={{ padding:'20px 24px 48px', background:'#f8fafc', minHeight:'100vh', fontFamily:"'Inter',-apple-system,sans-serif" }}>

        {/* ── HEADER ── */}
        <div style={{ marginBottom:16 }}>
          <h1 style={{ fontSize:22, fontWeight:800, color:'#0f172a', margin:0 }}>Order Dashboard</h1>
          <p style={{ fontSize:12, color:'#94a3b8', margin:'4px 0 0' }}>High-level overview of order performance and ecosystem health</p>
        </div>

        {/* ── FILTER BAR 1 ── */}
        <div style={{
          marginBottom:14,
          display:'flex', alignItems:'center', flexWrap:'wrap', gap:12,
        }}>
          <FilterSelect label="City" options={['All Cities','Mumbai','Bengaluru']} />
          <FilterSelect label="District" options={['All Districts','Andheri','Koramangala']} />
          <FilterSelect label="Service" options={['All Services','Cleaning','Repair']} />
          <FilterSelect label="Partner Vise" options={['All Partners','Partner A','Partner B']} />
          
          <div style={{ display:'flex', border:'1px solid #dde3ea', borderRadius:6, overflow:'hidden', marginTop:14 }}>
            {['Daily','Weekly','Monthly','Yearly'].map((p, i) => (
              <button key={p} onClick={() => setPeriod(p)} style={{
                padding:'6px 12px', border:'none', borderLeft:i>0?'1px solid #dde3ea':'none',
                fontSize:11.5, fontWeight:600, cursor:'pointer', transition:'all 0.15s',
                background: period===p ? '#0f172a' : '#fff',
                color: period===p ? '#fff' : '#64748b',
              }}>{p}</button>
            ))}
          </div>

          <FilterSelect label="" options={['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']} />
          <FilterSelect label="" options={['2026', '2027', '2028', '2029', '2030', '2031', '2032', '2033', '2034', '2035']} />

          <div style={{ display:'flex', gap:8, marginTop:14 }}>
            <button onClick={() => addToast('Filters applied','success')} style={{ padding:'7px 20px', borderRadius:6, border:'none', background:'#0f172a', color:'#fff', fontSize:12, fontWeight:600, cursor:'pointer' }}>Apply</button>
            <button onClick={() => { setPeriod('Monthly'); addToast('Filters reset','info'); }} style={{ padding:'7px 14px', borderRadius:6, border:'1px solid #dde3ea', background:'#fff', color:'#334155', fontSize:12, fontWeight:600, cursor:'pointer' }}>Reset</button>
          </div>
        </div>

        {/* ── 8 KPI CARDS ── */}
        <div style={{ display:'grid', gridTemplateColumns:'repeat(8,1fr)', gap:8, marginBottom:14 }}>
          {topKpis.map((k, i) => {
            const Icon = k.icon;
            return (
              <div key={i} style={{
                background:'#fff', borderRadius:10, padding:'12px',
                boxShadow:'0 1px 3px rgba(0,0,0,0.06)', border:'1px solid #e8edf2',
                display:'flex', flexDirection:'column', gap:8
              }}>
                <div style={{ display:'flex', alignItems:'center', gap: 6 }}>
                  <div style={{ background:k.bg, borderRadius:'50%', width:28, height:28, display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
                    <Icon size={14} color={k.color} />
                  </div>
                  <div style={{ fontSize:9, fontWeight:700, color:'#0f172a', lineHeight:1.2 }}>{k.label}</div>
                </div>
                {!k.isCustom ? (
                  <>
                    <div style={{ fontSize:18, fontWeight:800, color:'#0f172a' }}>{fmtNum(k.value)}</div>
                    <div style={{ fontSize:9, color: k.sub.includes('↑') ? '#16a34a' : k.sub.includes('↓') ? '#dc2626' : '#64748b', fontWeight:600 }}>{k.sub}</div>
                  </>
                ) : (
                  <div style={{ display:'flex', flexDirection:'column', gap:2 }}>
                    <div style={{ display:'flex', justifyContent:'space-between', fontSize:9 }}>
                      <span style={{ color:'#64748b' }}>User Referred</span>
                      <span style={{ fontWeight:700 }}>1,136 <span style={{ color:'#94a3b8', fontWeight:400 }}>(63.1%)</span></span>
                    </div>
                    <div style={{ display:'flex', justifyContent:'space-between', fontSize:9 }}>
                      <span style={{ color:'#64748b' }}>Partner Referred</span>
                      <span style={{ fontWeight:700 }}>662 <span style={{ color:'#94a3b8', fontWeight:400 }}>(36.9%)</span></span>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* ── 3 SUB KPI + TOP PERFORMERS ── */}
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1.5fr', gap:12, marginBottom:14 }}>
          {/* Sub KPIs (Left side) */}
          <div style={{ display:'flex', gap:10 }}>
            {subKpis.map((k,i) => {
              const Icon = k.icon;
              return (
                <div key={i} style={{ flex:1, background:'#fff', borderRadius:10, padding:'14px', boxShadow:'0 1px 3px rgba(0,0,0,0.06)', border:'1px solid #e8edf2', display:'flex' }}>
                  <div style={{ flex:1 }}>
                    <div style={{ display:'flex', alignItems:'center', gap: 6, marginBottom:8 }}>
                      <div style={{ background:k.bg, borderRadius:'50%', width:28, height:28, display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
                        <Icon size={14} color={k.color} />
                      </div>
                      <div style={{ fontSize:10, fontWeight:800, color:'#0f172a', lineHeight:1.1, maxWidth:70 }}>
                        {k.label.split(' ').map((w,j)=><div key={j}>{w}</div>)}
                      </div>
                    </div>
                    <div style={{ fontSize:18, fontWeight:800, color:'#0f172a' }}>{fmtNum(k.value)}</div>
                    <div style={{ fontSize:9, color:'#64748b', fontWeight:600 }}>{k.sub}</div>
                  </div>
                  
                  <div style={{ width:1, background:'#e8edf2', margin:'0 10px' }} />
                  
                  <div style={{ flex:1, display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'center', textAlign:'center' }}>
                    <div style={{ fontSize:10, fontWeight:800, color:'#3b82f6', marginBottom:4, lineHeight:1.1 }}>
                      Unused<br/>Codes
                    </div>
                    <div style={{ fontSize:16, fontWeight:800, color:'#0f172a' }}>{k.unused}</div>
                    <div style={{ fontSize:9, color:'#64748b', fontWeight:600 }}>({k.unusedPct} of total)</div>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Top Performers (Right side card) */}
          <div style={{ background:'#fff', borderRadius:10, padding:'14px', boxShadow:'0 1px 3px rgba(0,0,0,0.06)', border:'1px solid #e8edf2' }}>
            <h2 style={{ fontSize:13, fontWeight:800, color:'#0f172a', margin:'0 0 12px' }}>Top Performer Statistics</h2>
            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr 1fr', gap:16 }}>
              {/* Table 1 */}
              <div>
                <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:10 }}>
                  <div style={{ fontSize:11, fontWeight:800, color:'#0f172a', display:'flex', alignItems:'center', gap:4 }}><User size={12} color="#22c55e" /> Top Referred Users</div>
                  <a href="#" style={{ fontSize:9, color:'#3b82f6', textDecoration:'none', fontWeight:600 }}>View All</a>
                </div>
                <table style={{ width:'100%', fontSize:9.5, borderCollapse:'collapse' }}>
                  <thead>
                    <tr style={{ background:'#1e1b4b', color:'#fff' }}>
                      <th style={{ textAlign:'left', padding:'6px 8px', fontWeight:700 }}>RANK</th>
                      <th style={{ textAlign:'left', padding:'6px 8px', fontWeight:700 }}>USER NAME</th>
                      <th style={{ textAlign:'right', padding:'6px 8px', fontWeight:700 }}>USERS REFERRED</th>
                    </tr>
                  </thead>
                  <tbody>
                    {topPerformerUsers.map(u => (
                      <tr key={u.rank} style={{ borderBottom:'1px solid #e8edf2' }}>
                        <td style={{ padding:'6px 8px', fontWeight:600 }}>{u.rank}</td>
                        <td style={{ padding:'6px 8px', fontWeight:600 }}>{u.name}</td>
                        <td style={{ padding:'6px 8px', textAlign:'right', fontWeight:700 }}>{u.referred}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Table 2 */}
              <div>
                <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:10 }}>
                  <div style={{ fontSize:11, fontWeight:800, color:'#0f172a', display:'flex', alignItems:'center', gap:4 }}><Briefcase size={12} color="#8b5cf6" /> Top Referred Partners</div>
                  <a href="#" style={{ fontSize:9, color:'#3b82f6', textDecoration:'none', fontWeight:600 }}>View All</a>
                </div>
                <table style={{ width:'100%', fontSize:9.5, borderCollapse:'collapse' }}>
                  <thead>
                    <tr style={{ background:'#1e1b4b', color:'#fff' }}>
                      <th style={{ textAlign:'left', padding:'6px 8px', fontWeight:700 }}>RANK</th>
                      <th style={{ textAlign:'left', padding:'6px 8px', fontWeight:700 }}>PARTNER NAME</th>
                      <th style={{ textAlign:'right', padding:'6px 8px', fontWeight:700 }}>PARTNERS REFERRED</th>
                    </tr>
                  </thead>
                  <tbody>
                    {topPerformerPartners.map(u => (
                      <tr key={u.rank} style={{ borderBottom:'1px solid #e8edf2' }}>
                        <td style={{ padding:'6px 8px', fontWeight:600 }}>{u.rank}</td>
                        <td style={{ padding:'6px 8px', fontWeight:600 }}>{u.name}</td>
                        <td style={{ padding:'6px 8px', textAlign:'right', fontWeight:700 }}>{u.referred}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Table 3 */}
              <div>
                <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:10 }}>
                  <div style={{ fontSize:11, fontWeight:800, color:'#0f172a', display:'flex', alignItems:'center', gap:4 }}><Star size={12} color="#f59e0b" /> Top Referred Influencers</div>
                  <a href="#" style={{ fontSize:9, color:'#3b82f6', textDecoration:'none', fontWeight:600 }}>View All</a>
                </div>
                <table style={{ width:'100%', fontSize:9.5, borderCollapse:'collapse' }}>
                  <thead>
                    <tr style={{ background:'#1e1b4b', color:'#fff' }}>
                      <th style={{ textAlign:'left', padding:'6px 8px', fontWeight:700 }}>RANK</th>
                      <th style={{ textAlign:'left', padding:'6px 8px', fontWeight:700 }}>INFLUENCER NAME</th>
                      <th style={{ textAlign:'right', padding:'6px 8px', fontWeight:700 }}>TOTAL REFERRED</th>
                    </tr>
                  </thead>
                  <tbody>
                    {topPerformerInfluencers.map(u => (
                      <tr key={u.rank} style={{ borderBottom:'1px solid #e8edf2' }}>
                        <td style={{ padding:'6px 8px', fontWeight:600 }}>{u.rank}</td>
                        <td style={{ padding:'6px 8px', fontWeight:600 }}>{u.name}</td>
                        <td style={{ padding:'6px 8px', textAlign:'right', fontWeight:700 }}>{u.tRef}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        {/* ── ROW 3: Donuts + Table ── */}
        <div style={{ display:'grid', gridTemplateColumns:'1.2fr 1fr 1fr 2.5fr', gap:12, marginBottom:12 }}>
          
          <div style={{ background:'#fff', borderRadius:10, padding:'18px', boxShadow:'0 1px 3px rgba(0,0,0,0.05)', border:'1px solid #e8edf2', display:'flex', flexDirection:'column' }}>
            <h2 style={{ fontSize:13, fontWeight:800, color:'#0f172a', margin:'0 0 8px' }}>Referral Codes Generated by</h2>
            <div style={{ display:'flex', alignItems:'center', gap:14 }}>
              <PieChart width={140} height={140}>
                <Pie data={genByDist} cx={70} cy={70} innerRadius={42} outerRadius={65} paddingAngle={2} dataKey="value" startAngle={90} endAngle={-270}>
                  {genByDist.map((e,i) => <Cell key={i} fill={e.color} />)}
                  <DonutCenter viewBox={{ cx:70, cy:70 }} value="2,568" label="Total Codes" />
                </Pie>
                <Tooltip formatter={v => fmtNum(v)} />
              </PieChart>
              <div style={{ flex:1, display:'flex', flexDirection:'column', gap:6 }}>
                {genByDist.map((item,i) => (
                  <div key={i} style={{ display:'flex', alignItems:'center', justifyContent:'space-between', fontSize:10.5 }}>
                    <div style={{ display:'flex', alignItems:'center', gap:5 }}>
                      <span style={{ width:7, height:7, borderRadius:'50%', background:item.color, flexShrink:0, display:'inline-block' }} />
                      <span style={{ color:'#475569', fontWeight:600 }}>{item.name}</span>
                    </div>
                    <div style={{ display:'flex', gap:4, alignItems:'center' }}>
                      <span style={{ fontWeight:800, color:'#0f172a' }}>{fmtNum(item.value)}</span>
                      <span style={{ color:'#94a3b8', fontSize:9.5 }}>({item.pct})</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div style={{ background:'#fff', borderRadius:10, padding:'18px', boxShadow:'0 1px 3px rgba(0,0,0,0.05)', border:'1px solid #e8edf2', display:'flex', flexDirection:'column' }}>
            <h2 style={{ fontSize:13, fontWeight:800, color:'#0f172a', margin:'0 0 8px' }}>Referral Codes Used by</h2>
            <div style={{ display:'flex', alignItems:'center', gap:14 }}>
              <PieChart width={140} height={140}>
                <Pie data={usedByDist} cx={70} cy={70} innerRadius={42} outerRadius={65} paddingAngle={2} dataKey="value" startAngle={90} endAngle={-270}>
                  {usedByDist.map((e,i) => <Cell key={i} fill={e.color} />)}
                  <DonutCenter viewBox={{ cx:70, cy:70 }} value="8,642" label="Total Members" />
                </Pie>
                <Tooltip formatter={v => fmtNum(v)} />
              </PieChart>
              <div style={{ flex:1, display:'flex', flexDirection:'column', gap:6 }}>
                {usedByDist.map((item,i) => (
                  <div key={i} style={{ display:'flex', alignItems:'center', justifyContent:'space-between', fontSize:10.5 }}>
                    <div style={{ display:'flex', alignItems:'center', gap:5 }}>
                      <span style={{ width:7, height:7, borderRadius:'50%', background:item.color, flexShrink:0, display:'inline-block' }} />
                      <span style={{ color:'#475569', fontWeight:600 }}>{item.name}</span>
                    </div>
                    <div style={{ display:'flex', gap:4, alignItems:'center' }}>
                      <span style={{ fontWeight:800, color:'#0f172a' }}>{fmtNum(item.value)}</span>
                      <span style={{ color:'#94a3b8', fontSize:9.5 }}>({item.pct})</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div style={{ background:'#fff', borderRadius:10, padding:'18px', boxShadow:'0 1px 3px rgba(0,0,0,0.05)', border:'1px solid #e8edf2', display:'flex', flexDirection:'column' }}>
            <h2 style={{ fontSize:13, fontWeight:800, color:'#0f172a', margin:'0 0 8px' }}>Referral Code Status</h2>
            <div style={{ display:'flex', alignItems:'center', gap:14 }}>
              <PieChart width={140} height={140}>
                <Pie data={statusDist} cx={70} cy={70} innerRadius={42} outerRadius={65} paddingAngle={2} dataKey="value" startAngle={90} endAngle={-270}>
                  {statusDist.map((e,i) => <Cell key={i} fill={e.color} />)}
                  <DonutCenter viewBox={{ cx:70, cy:70 }} value="2,568" label="Total Codes" />
                </Pie>
                <Tooltip formatter={v => fmtNum(v)} />
              </PieChart>
              <div style={{ flex:1, display:'flex', flexDirection:'column', gap:6 }}>
                {statusDist.map((item,i) => (
                  <div key={i} style={{ display:'flex', alignItems:'center', justifyContent:'space-between', fontSize:10.5 }}>
                    <div style={{ display:'flex', alignItems:'center', gap:5 }}>
                      <span style={{ width:7, height:7, borderRadius:'50%', background:item.color, flexShrink:0, display:'inline-block' }} />
                      <span style={{ color:'#475569', fontWeight:600 }}>{item.name}</span>
                    </div>
                    <div style={{ display:'flex', gap:4, alignItems:'center' }}>
                      <span style={{ fontWeight:800, color:'#0f172a' }}>{fmtNum(item.value)}</span>
                      <span style={{ color:'#94a3b8', fontSize:9.5 }}>({item.pct})</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div style={{ background:'#fff', borderRadius:10, padding:'18px', boxShadow:'0 1px 3px rgba(0,0,0,0.05)', border:'1px solid #e8edf2' }}>
            <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:12 }}>
              <h2 style={{ fontSize:13, fontWeight:800, color:'#0f172a', margin:0 }}>Codes Going to Expire</h2>
              <a href="#" style={{ fontSize:10, color:'#3b82f6', textDecoration:'none', fontWeight:600 }}>View All</a>
            </div>
            <table style={{ width:'100%', fontSize:10.5 }}>
              <thead>
                <tr>
                  <th style={{ textAlign:'left', color:'#94a3b8', paddingBottom:6, fontWeight:600 }}>Referral Code</th>
                  <th style={{ textAlign:'left', color:'#94a3b8', paddingBottom:6, fontWeight:600 }}>Expires On</th>
                  <th style={{ textAlign:'left', color:'#94a3b8', paddingBottom:6, fontWeight:600 }}>Generated By</th>
                  <th style={{ textAlign:'right', color:'#94a3b8', paddingBottom:6, fontWeight:600 }}>Days Left</th>
                </tr>
              </thead>
              <tbody>
                {expiringCodes.map(c => (
                  <tr key={c.code}>
                    <td style={{ padding:'6px 0', fontWeight:800, color:'#0f172a' }}>{c.code}</td>
                    <td style={{ padding:'6px 0', fontWeight:600, color:'#475569' }}>{c.expires}</td>
                    <td style={{ padding:'6px 0', fontWeight:600, color:'#475569' }}>{c.generatedBy}</td>
                    <td style={{ padding:'6px 0', textAlign:'right', fontWeight:700, color:'#ef4444' }}>{c.daysLeft} days</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* ── ROW 4: Line Chart + Donut + Table ── */}
        <div style={{ display:'grid', gridTemplateColumns:'2fr 1fr 1.5fr', gap:12, marginBottom:12 }}>
          
          <div style={{ background:'#fff', borderRadius:10, padding:'18px 18px 10px', boxShadow:'0 1px 3px rgba(0,0,0,0.05)', border:'1px solid #e8edf2' }}>
            <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:12 }}>
              <h2 style={{ fontSize:13, fontWeight:800, color:'#0f172a', margin:0 }}>Referral Members Over Time</h2>
              <FilterSelect options={['Daily','Weekly','Monthly']} />
            </div>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={referralOverTime} margin={{ top:4, right:4, left:-20, bottom:0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="day" tick={{ fontSize:10, fill:'#94a3b8', fontWeight:600 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize:10, fill:'#94a3b8', fontWeight:600 }} axisLine={false} tickLine={false} tickFormatter={v => v>=1000?(v/1000)+'K':v} />
                <Tooltip content={<LineTooltip />} />
                <Legend iconType="circle" iconSize={8} wrapperStyle={{ fontSize:11, paddingTop:6, fontWeight:600 }} />
                <Line type="monotone" dataKey="total"  name="Total Members"  stroke="#3b82f6" strokeWidth={3} dot={false} />
                <Line type="monotone" dataKey="users"   name="Users"   stroke="#22c55e" strokeWidth={3} dot={false} />
                <Line type="monotone" dataKey="partners"  name="Partners"  stroke="#8b5cf6" strokeWidth={3} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div style={{ background:'#fff', borderRadius:10, padding:'18px', boxShadow:'0 1px 3px rgba(0,0,0,0.05)', border:'1px solid #e8edf2', display:'flex', flexDirection:'column' }}>
            <h2 style={{ fontSize:13, fontWeight:800, color:'#0f172a', margin:'0 0 12px' }}>Top Reward Types</h2>
            <div style={{ display:'flex', alignItems:'center', gap:14 }}>
              <PieChart width={140} height={140}>
                <Pie data={rewardDist} cx={70} cy={70} innerRadius={42} outerRadius={65} paddingAngle={2} dataKey="value" startAngle={90} endAngle={-270}>
                  {rewardDist.map((e,i) => <Cell key={i} fill={e.color} />)}
                  <DonutCenter viewBox={{ cx:70, cy:70 }} value="8,642" label="Total Usage" />
                </Pie>
                <Tooltip formatter={v => fmtNum(v)} />
              </PieChart>
              <div style={{ flex:1, display:'flex', flexDirection:'column', gap:8 }}>
                {rewardDist.map((item,i) => (
                  <div key={i} style={{ display:'flex', alignItems:'center', justifyContent:'space-between', fontSize:10.5 }}>
                    <div style={{ display:'flex', alignItems:'center', gap:5 }}>
                      <span style={{ width:7, height:7, borderRadius:'50%', background:item.color, flexShrink:0, display:'inline-block' }} />
                      <span style={{ color:'#475569', fontWeight:600 }}>{item.name}</span>
                    </div>
                    <div style={{ display:'flex', gap:4, alignItems:'center' }}>
                      <span style={{ fontWeight:800, color:'#0f172a' }}>{fmtNum(item.value)}</span>
                      <span style={{ color:'#94a3b8', fontSize:9.5 }}>({item.pct})</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div style={{ background:'#fff', borderRadius:10, padding:'18px', boxShadow:'0 1px 3px rgba(0,0,0,0.05)', border:'1px solid #e8edf2' }}>
            <h2 style={{ fontSize:13, fontWeight:800, color:'#0f172a', margin:'0 0 12px' }}>Reward Types Performance</h2>
            <table style={{ width:'100%', fontSize:10.5 }}>
              <thead>
                <tr style={{ borderBottom:'1px solid #f1f5f9' }}>
                  <th style={{ textAlign:'left', color:'#94a3b8', paddingBottom:6, fontWeight:600 }}>Reward Type</th>
                  <th style={{ textAlign:'right', color:'#94a3b8', paddingBottom:6, fontWeight:600 }}>Total Codes</th>
                  <th style={{ textAlign:'right', color:'#94a3b8', paddingBottom:6, fontWeight:600 }}>Used Codes</th>
                  <th style={{ textAlign:'right', color:'#94a3b8', paddingBottom:6, fontWeight:600 }}>Total Usage</th>
                  <th style={{ textAlign:'right', color:'#94a3b8', paddingBottom:6, fontWeight:600 }}>% Usage</th>
                </tr>
              </thead>
              <tbody>
                {rewardPerformance.map(r => (
                  <tr key={r.type}>
                    <td style={{ padding:'8px 0', fontWeight:700, color:'#0f172a' }}>{r.type}</td>
                    <td style={{ padding:'8px 0', textAlign:'right', fontWeight:600, color:'#475569' }}>{r.total}</td>
                    <td style={{ padding:'8px 0', textAlign:'right', fontWeight:600, color:'#475569' }}>{r.used}</td>
                    <td style={{ padding:'8px 0', textAlign:'right', fontWeight:600, color:'#475569' }}>{fmtNum(r.usage)}</td>
                    <td style={{ padding:'8px 0', minWidth:90 }}>
                      <div style={{ display:'flex', alignItems:'center', justifyContent:'flex-end', gap:6 }}>
                        <div style={{ flex:1, height:4, borderRadius:2, background:'#f1f5f9', overflow:'hidden' }}>
                          <div style={{ height:'100%', background:r.color, width:`${r.pct}%` }} />
                        </div>
                        <span style={{ fontWeight:700, fontSize:10 }}>{r.pct}%</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* ── ROW 5: Main Table ── */}
        <div style={{ background:'#fff', borderRadius:10, padding:'18px', boxShadow:'0 1px 3px rgba(0,0,0,0.05)', border:'1px solid #e8edf2', overflowX:'auto' }}>
          <h2 style={{ fontSize:13, fontWeight:800, color:'#0f172a', margin:'0 0 12px' }}>Referral Codes Performance</h2>
          <table style={{ width:'100%', borderCollapse:'collapse', fontSize:10, minWidth:900 }}>
            <thead>
              <tr style={{ borderBottom:'1px solid #f1f5f9' }}>
                <th style={{ padding:'8px 6px', textAlign:'left', fontWeight:700, color:'#94a3b8', whiteSpace:'nowrap' }}>Referral Code</th>
                <th style={{ padding:'8px 6px', textAlign:'left', fontWeight:700, color:'#94a3b8', whiteSpace:'nowrap' }}>Generated By</th>
                <th style={{ padding:'8px 6px', textAlign:'left', fontWeight:700, color:'#94a3b8', whiteSpace:'nowrap' }}>Generated By Name</th>
                <th style={{ padding:'8px 6px', textAlign:'left', fontWeight:700, color:'#94a3b8', whiteSpace:'nowrap' }}>Code Type</th>
                <th style={{ padding:'8px 6px', textAlign:'left', fontWeight:700, color:'#94a3b8', whiteSpace:'nowrap' }}>Status</th>
                <th colSpan="3" style={{ padding:'8px 6px', textAlign:'center', fontWeight:700, color:'#94a3b8', whiteSpace:'nowrap' }}>Members Referred</th>
                <th style={{ padding:'8px 6px', textAlign:'left', fontWeight:700, color:'#94a3b8', whiteSpace:'nowrap' }}>Reward Type</th>
                <th style={{ padding:'8px 6px', textAlign:'right', fontWeight:700, color:'#94a3b8', whiteSpace:'nowrap' }}>Total Reward Earned</th>
                <th style={{ padding:'8px 6px', textAlign:'left', fontWeight:700, color:'#94a3b8', whiteSpace:'nowrap' }}>Expires On</th>
                <th style={{ padding:'8px 6px', textAlign:'left', fontWeight:700, color:'#94a3b8', whiteSpace:'nowrap' }}>Created On</th>
                <th style={{ padding:'8px 6px', textAlign:'center', fontWeight:700, color:'#94a3b8', whiteSpace:'nowrap' }}>Actions</th>
              </tr>
              <tr style={{ borderBottom:'1px solid #f1f5f9' }}>
                <th colSpan="5"></th>
                <th style={{ padding:'4px 6px', textAlign:'right', fontWeight:600, color:'#94a3b8', fontSize:9 }}>Users</th>
                <th style={{ padding:'4px 6px', textAlign:'right', fontWeight:600, color:'#94a3b8', fontSize:9 }}>Partners</th>
                <th style={{ padding:'4px 6px', textAlign:'right', fontWeight:600, color:'#94a3b8', fontSize:9 }}>Total</th>
                <th colSpan="5"></th>
              </tr>
            </thead>
            <tbody>
              {codesPerformance.map((r,i) => (
                <tr key={i} style={{ borderBottom:i<codesPerformance.length-1?'1px solid #f8fafc':'none' }}>
                  <td style={{ padding:'10px 6px', fontWeight:800, color:'#0f172a', whiteSpace:'nowrap' }}>{r.code}</td>
                  <td style={{ padding:'10px 6px', fontWeight:600, color:'#475569' }}>{r.genBy}</td>
                  <td style={{ padding:'10px 6px', fontWeight:700, color:'#0f172a' }}>{r.name}</td>
                  <td style={{ padding:'10px 6px', fontWeight:600, color:'#475569' }}>{r.type}</td>
                  <td style={{ padding:'10px 6px', fontWeight:700, color:r.status==='Active'?'#22c55e':r.status==='Inactive'?'#ef4444':'#f59e0b' }}>{r.status}</td>
                  <td style={{ padding:'10px 6px', textAlign:'right', fontWeight:700, color:'#0f172a' }}>{r.users}</td>
                  <td style={{ padding:'10px 6px', textAlign:'right', fontWeight:700, color:'#0f172a' }}>{r.partners}</td>
                  <td style={{ padding:'10px 6px', textAlign:'right', fontWeight:800, color:'#0f172a' }}>{r.total}</td>
                  <td style={{ padding:'10px 6px', fontWeight:600, color:'#475569' }}>{r.reward}</td>
                  <td style={{ padding:'10px 6px', textAlign:'right', fontWeight:700, color:'#0f172a' }}>{r.earned}</td>
                  <td style={{ padding:'10px 6px', fontWeight:600, color:'#475569' }}>{r.expires}</td>
                  <td style={{ padding:'10px 6px', fontWeight:600, color:'#475569' }}>{r.created}</td>
                  <td style={{ padding:'10px 6px', textAlign:'center' }}>
                    <button style={{ background:'#f0f7ff', border:'none', borderRadius:4, padding:'4px 6px', cursor:'pointer' }}>
                      <Eye size={12} color="#2563eb" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div style={{ display:'flex', justifyContent:'flex-end', marginTop:12, gap:6, alignItems:'center' }}>
            <span style={{ fontSize:10, color:'#64748b', fontWeight:600 }}>Page 1 of 257</span>
            <button style={{ border:'1px solid #dde3ea', background:'#fff', padding:'4px 8px', borderRadius:4, cursor:'pointer' }}>{'<'}</button>
            <button style={{ border:'none', background:'#2563eb', color:'#fff', padding:'4px 10px', borderRadius:4, cursor:'pointer', fontWeight:600 }}>1</button>
            <button style={{ border:'none', background:'transparent', color:'#475569', padding:'4px 10px', borderRadius:4, cursor:'pointer', fontWeight:600 }}>2</button>
            <button style={{ border:'none', background:'transparent', color:'#475569', padding:'4px 10px', borderRadius:4, cursor:'pointer', fontWeight:600 }}>3</button>
            <button style={{ border:'1px solid #dde3ea', background:'#fff', padding:'4px 8px', borderRadius:4, cursor:'pointer' }}>{'>'}</button>
          </div>
        </div>

      </div>
    </AdminShell>
  );
}