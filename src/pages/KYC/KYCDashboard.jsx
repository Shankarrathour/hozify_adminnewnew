import React, { useState } from 'react';
import {
  FileCheck, FileClock, FileX, FileWarning, Clock,
  Users, Briefcase, Network, ShoppingBag, GitBranch, Star,
  TrendingUp, TrendingDown, Download, ChevronDown, RotateCcw, Eye,
  CheckCircle, AlertCircle, XCircle, ShieldCheck, Hourglass, AlarmClockOff, CalendarX
} from 'lucide-react';
import AdminShell from '../../components/layouts/AdminShell';
import { useToast } from '../../components/common/ToastNotification';
import {
  LineChart, Line, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';

// ─── MOCK DATA ────────────────────────────────────────────────────────────────

const kycTrend = [
  { month:'Jan', verified:5200, pending:1200, rejected:480,  expired:180 },
  { month:'Feb', verified:5600, pending:1350, rejected:510,  expired:195 },
  { month:'Mar', verified:6100, pending:1480, rejected:540,  expired:210 },
  { month:'Apr', verified:5800, pending:1320, rejected:495,  expired:188 },
  { month:'May', verified:6500, pending:1560, rejected:570,  expired:225 },
  { month:'Jun', verified:6200, pending:1400, rejected:520,  expired:200 },
  { month:'Jul', verified:5900, pending:1310, rejected:488,  expired:186 },
  { month:'Aug', verified:6300, pending:1450, rejected:532,  expired:205 },
  { month:'Sep', verified:5700, pending:1280, rejected:476,  expired:180 },
  { month:'Oct', verified:5400, pending:1220, rejected:456,  expired:172 },
  { month:'Nov', verified:5100, pending:1160, rejected:432,  expired:163 },
  { month:'Dec', verified:4800, pending:1100, rejected:408,  expired:154 },
];

const verificationByMonth = [
  { month:'Jan', users:3200, partners:2000 },
  { month:'Feb', users:3500, partners:2100 },
  { month:'Mar', users:3800, partners:2300 },
  { month:'Apr', users:3600, partners:2200 },
  { month:'May', users:4100, partners:2400 },
  { month:'Jun', users:3900, partners:2300 },
  { month:'Jul', users:3700, partners:2200 },
  { month:'Aug', users:4000, partners:2300 },
  { month:'Sep', users:3500, partners:2200 },
  { month:'Oct', users:3300, partners:2100 },
  { month:'Nov', users:3100, partners:2000 },
  { month:'Dec', users:2900, partners:1900 },
];

const statusDist = [
  { name:'Verified', value:20864, color:'#22c55e', pct:'72.8%' },
  { name:'Pending',  value:5342,  color:'#f97316', pct:'18.7%' },
  { name:'Rejected', value:1856,  color:'#ef4444', pct:'6.5%'  },
  { name:'Expired',  value:580,   color:'#8b5cf6', pct:'2.0%'  },
];

const entityDist = [
  { name:'Users',    value:16842, color:'#3b82f6', pct:'58.9%' },
  { name:'Partners', value:11800, color:'#22c55e', pct:'41.2%' },
];

const partnerRoleDist = [
  { name:'ISP (Independent Service Provider)', value:5126, color:'#3b82f6', pct:'43.4%' },
  { name:'BSP (Business Service Provider)',    value:3215, color:'#22c55e', pct:'27.2%' },
  { name:'BS (Business Seller)',               value:2145, color:'#f97316', pct:'18.2%' },
  { name:'Branch Manager',                     value:892,  color:'#8b5cf6', pct:'7.6%'  },
  { name:'Professional',                       value:422,  color:'#ec4899', pct:'3.6%'  },
];

const expiryDist = [
  { name:'Expiring in 0–30 Days',  value:1124, color:'#f97316', pct:'65.9%' },
  { name:'Expiring in 31–60 Days', value:386,  color:'#f59e0b', pct:'22.7%' },
  { name:'Expiring in 61–90 Days', value:134,  color:'#facc15', pct:'7.9%'  },
  { name:'Expired (>90 Days)',      value:60,   color:'#ef4444', pct:'3.5%'  },
];

const roleSummary = [
  { entity:'Users',    kyc:16842, verified:12256, pending:3248, rejected:876,  expired:250, expiringSoon:600, rate:72.7, isPartner:false, children:[] },
  { entity:'Partners', kyc:11800, verified:8608,  pending:2097, rejected:980,  expired:300, expiringSoon:174, rate:73.0, isPartner:true,
    children: [
      { entity:'ISP (Independent Service Provider)', kyc:5126, verified:3621, pending:842, rejected:332, expired:68,  expiringSoon:42, rate:74.5 },
      { entity:'BSP (Business Service Provider)',    kyc:3215, verified:2321, pending:612, rejected:198, expired:48,  expiringSoon:36, rate:72.2 },
      { entity:'BS (Business Seller)',               kyc:2145, verified:1512, pending:392, rejected:206, expired:28,  expiringSoon:27, rate:70.5 },
      { entity:'Branch Manager',                     kyc:892,  verified:642,  pending:148, rejected:69,  expired:18,  expiringSoon:18, rate:72.0 },
      { entity:'Professional',                       kyc:422,  verified:312,  pending:89,  rejected:34,  expired:10,  expiringSoon:10, rate:73.9 },
    ]
  },
];

const recentActivity = [
  { name:'Ramesh Kumar',      entityType:'Partner', role:'ISP',          kycType:'Individual', status:'Verified', date:'31 May 2026 10:24 AM' },
  { name:'Best Home Services',entityType:'Partner', role:'BSP',          kycType:'Business',   status:'Verified', date:'31 May 2026 09:45 AM' },
  { name:'Priya Sharma',      entityType:'User',    role:'–',            kycType:'Individual', status:'Pending',  date:'31 May 2026 09:15 AM' },
  { name:'Shree Hardware',    entityType:'Partner', role:'BS',           kycType:'Business',   status:'Rejected', date:'31 May 2026 09:15 AM' },
  { name:'TechPro Solutions', entityType:'Partner', role:'Professional', kycType:'Business',   status:'Pending',  date:'31 May 2026 06:00 AM' },
];

// ─── HELPERS ─────────────────────────────────────────────────────────────────

function fmtNum(n) {
  if (n >= 1_000_000) return (n / 1_000_000).toFixed(1) + 'M';
  if (n >= 1_000) return n.toLocaleString();
  return String(n);
}

function pct(v, t) { return ((v / t) * 100).toFixed(1) + '%'; }

const statusColor = { Verified:'#22c55e', Pending:'#f97316', Rejected:'#ef4444', Expired:'#8b5cf6' };
const statusBg    = { Verified:'#f0fdf4', Pending:'#fff7ed', Rejected:'#fff1f2', Expired:'#f5f3ff' };

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
      <div style={{ color:'#94a3b8', fontWeight:700, marginBottom:6 }}>{label} 2026</div>
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

const BarTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div style={{ background:'#1e293b', borderRadius:10, padding:'10px 14px', fontSize:11 }}>
      <div style={{ color:'#94a3b8', fontWeight:700, marginBottom:6 }}>{label} 2026</div>
      {payload.map(p => (
        <div key={p.name} style={{ display:'flex', alignItems:'center', gap:6, marginBottom:3 }}>
          <span style={{ width:7, height:7, borderRadius:'50%', background:p.fill, display:'inline-block' }} />
          <span style={{ color:'#cbd5e1' }}>{p.name}:</span>
          <strong style={{ color:'#fff' }}>{fmtNum(p.value)}</strong>
        </div>
      ))}
    </div>
  );
};

function FilterSelect({ label, options }) {
  return (
    <div style={{ display:'flex', flexDirection:'column', gap:3 }}>
      {label && <label style={{ fontSize:10, fontWeight:600, color:'#94a3b8', letterSpacing:0.3 }}>{label}</label>}
      <div style={{ position:'relative' }}>
        <select style={{
          appearance:'none', background:'#fff', border:'1px solid #dde3ea',
          borderRadius:6, padding:'6px 26px 6px 10px', fontSize:11.5,
          fontWeight:500, color:'#334155', cursor:'pointer', outline:'none', minWidth:115,
        }}>
          {options.map(o => <option key={o}>{o}</option>)}
        </select>
        <ChevronDown size={11} style={{ position:'absolute', right:8, top:'50%', transform:'translateY(-50%)', color:'#94a3b8', pointerEvents:'none' }} />
      </div>
    </div>
  );
}

// ─── SUMMARY TABLE ROW ───────────────────────────────────────────────────────
function SummaryRow({ r, isChild, isTotal }) {
  const bg = isTotal ? '#f8fafc' : 'transparent';
  const fw = isTotal ? 800 : isChild ? 500 : 700;
  const textColor = isTotal ? '#0f172a' : '#334155';
  const barW = Math.min(100, r.rate);
  return (
    <tr style={{ background: bg, borderBottom:'1px solid #f1f5f9' }}>
      <td style={{ padding: isChild ? '6px 6px 6px 20px' : '7px 6px', fontWeight:fw, color:textColor, fontSize:10.5, whiteSpace:'nowrap' }}>
        {isChild ? `↳ ${r.entity}` : r.entity}
      </td>
      <td style={{ padding:'7px 6px', textAlign:'right', fontWeight:fw, color:'#0f172a', fontSize:10.5 }}>{fmtNum(r.kyc)}</td>
      <td style={{ padding:'7px 6px', textAlign:'right', fontSize:10.5 }}>
        <span style={{ fontWeight:fw, color:'#16a34a' }}>{fmtNum(r.verified)}</span>
        <span style={{ color:'#94a3b8', fontWeight:400, fontSize:9.5 }}> ({pct(r.verified, r.kyc)})</span>
      </td>
      <td style={{ padding:'7px 6px', textAlign:'right', fontSize:10.5 }}>
        <span style={{ fontWeight:fw, color:'#f97316' }}>{fmtNum(r.pending)}</span>
        <span style={{ color:'#94a3b8', fontWeight:400, fontSize:9.5 }}> ({pct(r.pending, r.kyc)})</span>
      </td>
      <td style={{ padding:'7px 6px', textAlign:'right', fontSize:10.5 }}>
        <span style={{ fontWeight:fw, color:'#ef4444' }}>{fmtNum(r.rejected)}</span>
        <span style={{ color:'#94a3b8', fontWeight:400, fontSize:9.5 }}> ({pct(r.rejected, r.kyc)})</span>
      </td>
      <td style={{ padding:'7px 6px', textAlign:'right', fontSize:10.5 }}>
        <span style={{ fontWeight:fw, color:'#94a3b8' }}>{fmtNum(r.expired)}</span>
        <span style={{ color:'#94a3b8', fontWeight:400, fontSize:9.5 }}> ({pct(r.expired, r.kyc)})</span>
      </td>
      <td style={{ padding:'7px 6px', textAlign:'right', fontSize:10.5 }}>
        <span style={{ fontWeight:fw, color:'#f97316' }}>{fmtNum(r.expiringSoon)}</span>
        <span style={{ color:'#94a3b8', fontWeight:400, fontSize:9.5 }}> ({pct(r.expiringSoon, r.kyc)})</span>
      </td>
      <td style={{ padding:'7px 10px', minWidth:110 }}>
        <div style={{ display:'flex', alignItems:'center', gap:6 }}>
          <div style={{ flex:1, height:4, borderRadius:3, background:'#f1f5f9', overflow:'hidden' }}>
            <div style={{ height:'100%', borderRadius:3, background:'#22c55e', width:`${barW}%` }} />
          </div>
          <span style={{ fontSize:10, fontWeight:700, color:'#0f172a', minWidth:32, textAlign:'right' }}>{r.rate}%</span>
        </div>
      </td>
    </tr>
  );
}

// ─── MAIN ────────────────────────────────────────────────────────────────────
export default function KYCDashboard({ activeTab = 'KYC Management' }) {
  const { addToast } = useToast();
  const [period, setPeriod] = useState('Monthly');

  const kpis = [
    { label:'Total KYC',           value:28642, sub:'All Time',          pct:18.6, up:true,  cmp:'vs Apr 2026', color:'#2563eb', bg:'#eff6ff', icon:FileCheck   },
    { label:'Verified KYC',        value:20864, sub:'72.8% of Total',    pct:16.3, up:true,  cmp:'vs Apr 2026', color:'#22c55e', bg:'#f0fdf4', icon:ShieldCheck },
    { label:'Pending KYC',         value:5342,  sub:'18.7% of Total',    pct:8.5,  up:true,  cmp:'vs Apr 2026', color:'#f97316', bg:'#fff7ed', icon:Hourglass   },
    { label:'Rejected KYC',        value:1856,  sub:'6.5% of Total',     pct:5.1,  up:false, cmp:'vs Apr 2026', color:'#ef4444', bg:'#fff1f2', icon:AlarmClockOff },
    { label:'Expired KYC',         value:580,   sub:'2.0% of Total',     pct:6.2,  up:true,  cmp:'vs Apr 2026', color:'#8b5cf6', bg:'#f5f3ff', icon:CalendarX },
    { label:'Expiring Soon (30 Days)', value:1124, sub:'3.9% of Total',  pct:12.8, up:true,  cmp:'vs Apr 2026', color:'#f59e0b', bg:'#fffbeb', icon:Clock       },
  ];

  const totalKyc = 28642;
  const totalRow = {
    entity:'Total', kyc:totalKyc, verified:20864, pending:5342, rejected:1856, expired:580, expiringSoon:1704, rate:72.9
  };

  return (
    <AdminShell activeTab={activeTab} headerTitle="KYC Dashboard" searchPlaceholder="Search pages, modules...">
      <div style={{ padding:'20px 24px 48px', background:'#f8fafc', minHeight:'100vh', fontFamily:"'Inter',-apple-system,sans-serif" }}>

        

        {/* ── FILTER BAR ── */}
        <div style={{
          background:'#fff', borderRadius:10, padding:'12px 16px',
          boxShadow:'0 1px 3px rgba(0,0,0,0.05)', marginBottom:14,
          display:'flex', alignItems:'flex-end', flexWrap:'wrap', gap:12, border:'1px solid #e8edf2',
        }}>
          <FilterSelect label="Entity Type" options={['All (Users & Partners)','Users Only','Partners Only']} />
          <FilterSelect label="Role Type"   options={['All Roles','ISP','BSP','Business Seller','Branch Manager','Professional']} />
          <FilterSelect label="State"       options={['All States','Maharashtra','Karnataka','Telangana','Tamil Nadu','Delhi']} />
          <FilterSelect label="City"        options={['All Cities','Mumbai','Bengaluru','Hyderabad','Chennai','Delhi','Pune']} />
          <FilterSelect label="District"    options={['All Districts','Andheri','Koramangala','Banjara Hills','T. Nagar']} />

          <div style={{ width:1, height:34, background:'#e8edf2', alignSelf:'flex-end', margin:'0 2px' }} />

          <div style={{ display:'flex', flexDirection:'column', gap:3 }}>
            <label style={{ fontSize:10, fontWeight:600, color:'transparent' }}>_</label>
            <div style={{ display:'flex', border:'1px solid #dde3ea', borderRadius:6, overflow:'hidden' }}>
              {['Daily','Weekly','Monthly','Yearly'].map((p, i) => (
                <button key={p} onClick={() => setPeriod(p)} style={{
                  padding:'6px 12px', border:'none', borderLeft:i>0?'1px solid #dde3ea':'none',
                  fontSize:11.5, fontWeight:600, cursor:'pointer', transition:'all 0.15s',
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
            <button onClick={() => { setPeriod('Monthly'); addToast('Filters reset','info'); }} style={{ padding:'7px 14px', borderRadius:6, border:'1px solid #dde3ea', background:'#fff', color:'#334155', fontSize:12, fontWeight:600, cursor:'pointer' }}>Reset</button>
          </div>
        </div>

        {/* ── 6 KPI CARDS ── */}
        <div style={{ display:'grid', gridTemplateColumns:'repeat(6,1fr)', gap:11, marginBottom:14 }}>
          {kpis.map((k, i) => {
            const Icon = k.icon;
            return (
              <div key={i} style={{
                background:'#fff', borderRadius:10, padding:'14px',
                boxShadow:'0 1px 3px rgba(0,0,0,0.06)', border:'1px solid #e8edf2',
                transition:'transform 0.18s, box-shadow 0.18s', cursor:'default',
              }}
                onMouseEnter={e => { e.currentTarget.style.transform='translateY(-2px)'; e.currentTarget.style.boxShadow='0 6px 20px rgba(0,0,0,0.08)'; }}
                onMouseLeave={e => { e.currentTarget.style.transform='translateY(0)'; e.currentTarget.style.boxShadow='0 1px 3px rgba(0,0,0,0.06)'; }}
              >
                <div style={{ display:'flex', gap: 10 }}>
                  <div style={{ background:k.bg, borderRadius:'50%', width:36, height:36, display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
                    <Icon size={18} color={k.color} />
                  </div>
                  <div style={{ flex: 1, minWidth:0 }}>
                    <div style={{ fontSize:10.5, fontWeight:600, color:'#64748b', marginBottom:2, whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis' }}>{k.label}</div>
                    <div style={{ fontSize:18, fontWeight:800, color:'#0f172a', lineHeight:1.1, marginBottom:8 }}>{fmtNum(k.value)}</div>
                    <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-end' }}>
                      <div style={{ fontSize:10, color:'#94a3b8', paddingBottom:2 }}>{k.sub}</div>
                      <div style={{ textAlign:'right' }}>
                        <div style={{ display:'flex', alignItems:'center', gap:3, justifyContent:'flex-end' }}>
                          <span style={{ fontSize:10, fontWeight:700, color: k.up ? '#16a34a' : '#dc2626' }}>
                            {k.up ? '↑' : '↓'} {k.pct}%
                          </span>
                        </div>
                        <div style={{ fontSize:9, color:'#94a3b8', marginTop:1 }}>{k.cmp}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* ── ROW 2: Status Donut + Entity Donut + Partner Role ── */}
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr 1.3fr', gap:12, marginBottom:12 }}>

          {/* KYC Status Distribution */}
          <div style={{ background:'#fff', borderRadius:10, padding:'18px', boxShadow:'0 1px 3px rgba(0,0,0,0.05)', border:'1px solid #e8edf2', display:'flex', flexDirection:'column' }}>
            <h2 style={{ fontSize:13, fontWeight:700, color:'#0f172a', margin:'0 0 8px' }}>KYC Status Distribution</h2>
            <div style={{ display:'flex', alignItems:'center', gap:14 }}>
              <PieChart width={150} height={150}>
                <Pie data={statusDist} cx={75} cy={75} innerRadius={45} outerRadius={70} paddingAngle={2} dataKey="value" startAngle={90} endAngle={-270}>
                  {statusDist.map((e,i) => <Cell key={i} fill={e.color} />)}
                  <DonutCenter viewBox={{ cx:75, cy:75 }} value="28,642" label="Total KYC" />
                </Pie>
                <Tooltip formatter={v => fmtNum(v)} />
              </PieChart>
              <div style={{ flex:1, display:'flex', flexDirection:'column', gap:6 }}>
                {statusDist.map((item,i) => (
                  <div key={i} style={{ display:'flex', alignItems:'center', justifyContent:'space-between', fontSize:10.5 }}>
                    <div style={{ display:'flex', alignItems:'center', gap:5 }}>
                      <span style={{ width:7, height:7, borderRadius:'50%', background:item.color, flexShrink:0, display:'inline-block' }} />
                      <span style={{ color:'#475569', fontWeight:500 }}>{item.name}</span>
                    </div>
                    <div style={{ display:'flex', gap:4, alignItems:'center' }}>
                      <span style={{ fontWeight:700, color:'#0f172a' }}>{fmtNum(item.value)}</span>
                      <span style={{ color:'#94a3b8', fontSize:9.5 }}>({item.pct})</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* KYC by Entity Type */}
          <div style={{ background:'#fff', borderRadius:10, padding:'18px', boxShadow:'0 1px 3px rgba(0,0,0,0.05)', border:'1px solid #e8edf2', display:'flex', flexDirection:'column' }}>
            <h2 style={{ fontSize:13, fontWeight:700, color:'#0f172a', margin:'0 0 8px' }}>KYC by Entity Type</h2>
            <div style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:12 }}>
              <PieChart width={148} height={148}>
                <Pie data={entityDist} cx={74} cy={74} innerRadius={45} outerRadius={70} paddingAngle={2} dataKey="value" startAngle={90} endAngle={-270}>
                  {entityDist.map((e,i) => <Cell key={i} fill={e.color} />)}
                  <DonutCenter viewBox={{ cx:74, cy:74 }} value="28,642" label="Total KYC" />
                </Pie>
                <Tooltip formatter={v => fmtNum(v)} />
              </PieChart>
              <div style={{ width:'100%', display:'flex', flexDirection:'column', gap:7 }}>
                {entityDist.map((item,i) => (
                  <div key={i} style={{ display:'flex', alignItems:'center', justifyContent:'space-between', fontSize:10.5 }}>
                    <div style={{ display:'flex', alignItems:'center', gap:5 }}>
                      <span style={{ width:7, height:7, borderRadius:'50%', background:item.color, display:'inline-block' }} />
                      <span style={{ color:'#475569', fontWeight:500 }}>{item.name}</span>
                    </div>
                    <div>
                      <span style={{ fontWeight:700, color:'#0f172a' }}>{fmtNum(item.value)}</span>
                      <span style={{ color:'#94a3b8', fontSize:9.5 }}> ({item.pct})</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* KYC by Role (Partners) */}
          <div style={{ background:'#fff', borderRadius:10, padding:'18px', boxShadow:'0 1px 3px rgba(0,0,0,0.05)', border:'1px solid #e8edf2', display:'flex', flexDirection:'column' }}>
            <h2 style={{ fontSize:13, fontWeight:700, color:'#0f172a', margin:'0 0 8px' }}>KYC by Role (Partners)</h2>
            <div style={{ display:'flex', alignItems:'center', gap:14 }}>
              <PieChart width={148} height={148}>
                <Pie data={partnerRoleDist} cx={74} cy={74} innerRadius={45} outerRadius={70} paddingAngle={2} dataKey="value" startAngle={90} endAngle={-270}>
                  {partnerRoleDist.map((e,i) => <Cell key={i} fill={e.color} />)}
                  <DonutCenter viewBox={{ cx:74, cy:74 }} value="11,800" label="Total Partners KYC" />
                </Pie>
                <Tooltip formatter={v => fmtNum(v)} />
              </PieChart>
              <div style={{ flex:1, display:'flex', flexDirection:'column', gap:6 }}>
                {partnerRoleDist.map((item,i) => (
                  <div key={i} style={{ display:'flex', alignItems:'center', justifyContent:'space-between', fontSize:10 }}>
                    <div style={{ display:'flex', alignItems:'center', gap:5 }}>
                      <span style={{ width:7, height:7, borderRadius:'50%', background:item.color, flexShrink:0, display:'inline-block' }} />
                      <span style={{ color:'#475569', fontWeight:500, lineHeight:1.3 }}>{item.name}</span>
                    </div>
                    <div style={{ display:'flex', gap:4, flexShrink:0, marginLeft:6 }}>
                      <span style={{ fontWeight:700, color:'#0f172a' }}>{fmtNum(item.value)}</span>
                      <span style={{ color:'#94a3b8', fontSize:9 }}>({item.pct})</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ── ROW 3: KYC Trend + Verification by Month + Expiry Overview ── */}
        <div style={{ display:'grid', gridTemplateColumns:'1.5fr 1.5fr 1fr', gap:12, marginBottom:12 }}>

          {/* KYC Trend Over Time — Line Chart */}
          <div style={{ background:'#fff', borderRadius:10, padding:'18px 18px 10px', boxShadow:'0 1px 3px rgba(0,0,0,0.05)', border:'1px solid #e8edf2' }}>
            <h2 style={{ fontSize:13, fontWeight:700, color:'#0f172a', margin:'0 0 12px' }}>KYC Trend Over Time</h2>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={kycTrend} margin={{ top:4, right:4, left:-28, bottom:0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="month" tick={{ fontSize:8, fill:'#94a3b8' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize:8, fill:'#94a3b8' }} axisLine={false} tickLine={false} tickFormatter={v => v>=1000?(v/1000)+'K':v} />
                <Tooltip content={<LineTooltip />} />
                <Legend iconType="circle" iconSize={7} wrapperStyle={{ fontSize:10, paddingTop:6 }} />
                <Line type="monotone" dataKey="verified"  name="Verified"  stroke="#22c55e" strokeWidth={2} dot={false} />
                <Line type="monotone" dataKey="pending"   name="Pending"   stroke="#f97316" strokeWidth={2} dot={false} />
                <Line type="monotone" dataKey="rejected"  name="Rejected"  stroke="#ef4444" strokeWidth={2} dot={false} />
                <Line type="monotone" dataKey="expired"   name="Expired"   stroke="#8b5cf6" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* KYC Verification by Month — Grouped Bar */}
          <div style={{ background:'#fff', borderRadius:10, padding:'18px 18px 10px', boxShadow:'0 1px 3px rgba(0,0,0,0.05)', border:'1px solid #e8edf2' }}>
            <h2 style={{ fontSize:13, fontWeight:700, color:'#0f172a', margin:'0 0 12px' }}>KYC Verification by Month</h2>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={verificationByMonth} margin={{ top:4, right:4, left:-28, bottom:0 }} barSize={10} barGap={2}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                <XAxis dataKey="month" tick={{ fontSize:8, fill:'#94a3b8' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize:8, fill:'#94a3b8' }} axisLine={false} tickLine={false} tickFormatter={v => v>=1000?(v/1000)+'K':v} />
                <Tooltip content={<BarTooltip />} cursor={{ fill:'rgba(99,102,241,0.05)' }} />
                <Legend iconType="circle" iconSize={7} wrapperStyle={{ fontSize:10, paddingTop:6 }} />
                <Bar dataKey="users"    name="Users"    radius={[4,4,0,0]} fill="#3b82f6" />
                <Bar dataKey="partners" name="Partners" radius={[4,4,0,0]} fill="#22c55e" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* KYC Expiry Overview — Donut */}
          <div style={{ background:'#fff', borderRadius:10, padding:'18px', boxShadow:'0 1px 3px rgba(0,0,0,0.05)', border:'1px solid #e8edf2', display:'flex', flexDirection:'column' }}>
            <h2 style={{ fontSize:13, fontWeight:700, color:'#0f172a', margin:'0 0 8px' }}>KYC Expiry Overview</h2>
            <div style={{ display:'flex', justifyContent:'center' }}>
              <PieChart width={148} height={148}>
                <Pie data={expiryDist} cx={74} cy={74} innerRadius={42} outerRadius={68} paddingAngle={2} dataKey="value" startAngle={90} endAngle={-270}>
                  {expiryDist.map((e,i) => <Cell key={i} fill={e.color} />)}
                  <DonutCenter viewBox={{ cx:74, cy:74 }} value="1,704" label="Total" />
                </Pie>
                <Tooltip formatter={v => fmtNum(v)} />
              </PieChart>
            </div>
            <div style={{ display:'flex', flexDirection:'column', gap:5, marginTop:4 }}>
              {expiryDist.map((item,i) => (
                <div key={i} style={{ display:'flex', alignItems:'center', justifyContent:'space-between', fontSize:9.5 }}>
                  <div style={{ display:'flex', alignItems:'center', gap:5 }}>
                    <span style={{ width:7, height:7, borderRadius:'50%', background:item.color, flexShrink:0, display:'inline-block' }} />
                    <span style={{ color:'#475569', fontWeight:500, lineHeight:1.3 }}>{item.name}</span>
                  </div>
                  <div>
                    <span style={{ fontWeight:700, color:'#0f172a' }}>{fmtNum(item.value)}</span>
                    <span style={{ color:'#94a3b8', fontSize:9 }}> ({item.pct})</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── ROW 4: Summary Table + Recent KYC Activity ── */}
        <div style={{ display:'grid', gridTemplateColumns:'1.15fr 1fr', gap:12, marginBottom:12 }}>

          {/* KYC Status Summary Table */}
          <div style={{ background:'#fff', borderRadius:10, padding:'18px', boxShadow:'0 1px 3px rgba(0,0,0,0.05)', border:'1px solid #e8edf2', overflowX:'auto' }}>
            <h2 style={{ fontSize:13, fontWeight:700, color:'#0f172a', margin:'0 0 12px' }}>KYC Status Summary (Users & Partners)</h2>
            <table style={{ width:'100%', borderCollapse:'collapse', fontSize:10.5, minWidth:560 }}>
              <thead>
                <tr style={{ background:'#f8fafc' }}>
                  {['Entity','Total KYC','Verified','Pending','Rejected','Expired','Expiring Soon','Verification Rate'].map(h => (
                    <th key={h} style={{ padding:'8px 6px', textAlign:h==='Entity'?'left':'right', fontWeight:700, color:'#64748b', fontSize:9.5, borderBottom:'1px solid #f1f5f9', whiteSpace:'nowrap' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {roleSummary.map((r,i) => (
                  <React.Fragment key={i}>
                    <SummaryRow r={r} isChild={false} isTotal={false} />
                    {r.children && r.children.map((c,j) => (
                      <SummaryRow key={j} r={c} isChild={true} isTotal={false} />
                    ))}
                  </React.Fragment>
                ))}
                <SummaryRow r={totalRow} isChild={false} isTotal={true} />
              </tbody>
            </table>
          </div>

          {/* Recent KYC Activity */}
          <div style={{ background:'#fff', borderRadius:10, padding:'18px', boxShadow:'0 1px 3px rgba(0,0,0,0.05)', border:'1px solid #e8edf2', overflowX:'auto' }}>
            <h2 style={{ fontSize:13, fontWeight:700, color:'#0f172a', margin:'0 0 12px' }}>Recent KYC Activity</h2>
            <table style={{ width:'100%', borderCollapse:'collapse', fontSize:10.5, minWidth:420 }}>
              <thead>
                <tr style={{ background:'#f8fafc' }}>
                  {['Name','Entity Type','Role','KYC Type','Status','Verified On','Action'].map(h => (
                    <th key={h} style={{ padding:'8px 8px', textAlign:'left', fontWeight:700, color:'#64748b', fontSize:9.5, borderBottom:'1px solid #f1f5f9', whiteSpace:'nowrap' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {recentActivity.map((r,i) => (
                  <tr key={i} style={{ borderBottom:i<recentActivity.length-1?'1px solid #f8fafc':'none' }}>
                    <td style={{ padding:'9px 8px', fontWeight:600, color:'#0f172a', whiteSpace:'nowrap' }}>{r.name}</td>
                    <td style={{ padding:'9px 8px', color:'#475569' }}>{r.entityType}</td>
                    <td style={{ padding:'9px 8px', color:'#64748b' }}>{r.role}</td>
                    <td style={{ padding:'9px 8px', color:'#64748b' }}>{r.kycType}</td>
                    <td style={{ padding:'9px 8px' }}>
                      <span style={{
                        fontSize:9.5, fontWeight:700, padding:'3px 8px', borderRadius:12,
                        background: statusBg[r.status] || '#f8fafc',
                        color: statusColor[r.status] || '#64748b',
                      }}>{r.status}</span>
                    </td>
                    <td style={{ padding:'9px 8px', color:'#64748b', fontSize:9.5, whiteSpace:'nowrap' }}>{r.date}</td>
                    <td style={{ padding:'9px 8px' }}>
                      <button style={{ background:'#f0f7ff', border:'none', borderRadius:6, padding:'4px 8px', cursor:'pointer', display:'flex', alignItems:'center', gap:4 }}
                        onClick={() => addToast(`Viewing KYC for ${r.name}`,'info')}
                      >
                        <Eye size={12} color="#2563eb" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div style={{ display:'flex', justifyContent:'flex-end', marginTop:10 }}>
              <button onClick={() => addToast('Navigating to all KYC activity...','info')} style={{ background:'none', border:'none', color:'#2563eb', fontSize:11, fontWeight:600, cursor:'pointer' }}>
                View All KYC Activity →
              </button>
            </div>
          </div>
        </div>

        {/* ── FOOTER ── */}
        <div style={{
          background:'#fff', borderRadius:10, padding:'13px 18px',
          boxShadow:'0 1px 3px rgba(0,0,0,0.05)', border:'1px solid #e8edf2',
          display:'flex', alignItems:'center', justifyContent:'space-between', flexWrap:'wrap', gap:10,
        }}>
          <div style={{ display:'flex', alignItems:'center', gap:8 }}>
            <span style={{ fontSize:11, color:'#94a3b8' }}>ⓘ KYC data is updated as of 31 May 2026, 11:30 AM</span>
          </div>
          <button onClick={() => addToast('Generating KYC report...','success')} style={{
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
    </AdminShell>
  );
}
