import React, { useState } from 'react';
import {
  Calendar, CheckCircle, XCircle, Clock, Users, User, Briefcase, Star,
  Download, ChevronDown, Eye, DollarSign, Activity, CalendarCheck, ShieldCheck, RefreshCcw
} from 'lucide-react';
import AdminShell from '../../components/layouts/AdminShell';
import { useToast } from '../../components/common/ToastNotification';
import {
  LineChart, Line, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';

// ─── MOCK DATA ────────────────────────────────────────────────────────────────

const bookingsOverTime = [
  { day:'01 May', total:150, completed:100, pending:50 },
  { day:'05 May', total:180, completed:120, pending:60 },
  { day:'10 May', total:240, completed:180, pending:60 },
  { day:'15 May', total:290, completed:210, pending:80 },
  { day:'20 May', total:320, completed:250, pending:70 },
  { day:'25 May', total:380, completed:310, pending:70 },
  { day:'31 May', total:420, completed:350, pending:70 },
];

const categoryDist = [
  { name:'Home Services', value:1450, color:'#3b82f6', pct:'45.0%' },
  { name:'Beauty & Salon', value:950, color:'#ec4899', pct:'29.5%' },
  { name:'Cleaning', value:820, color:'#22c55e', pct:'25.5%' },
];

const paymentDist = [
  { name:'Paid Online', value:2150, color:'#22c55e', pct:'66.8%' },
  { name:'Cash on Delivery', value:1070, color:'#f59e0b', pct:'33.2%' },
];

const statusDist = [
  { name:'Completed', value:2450, color:'#22c55e', pct:'76.1%' },
  { name:'Pending', value:620, color:'#f59e0b', pct:'19.2%' },
  { name:'Cancelled', value:150, color:'#ef4444', pct:'4.7%' },
];

const revenueDist = [
  { name:'Home Services', value:45000, color:'#3b82f6', pct:'42.8%' },
  { name:'Beauty & Salon', value:35000, color:'#ec4899', pct:'33.3%' },
  { name:'Cleaning', value:25000, color:'#22c55e', pct:'23.9%' },
];

const upcomingBookings = [
  { id:'BK-98462', date:'05 Jun 2026', customer:'Ramesh Kumar', status:'Pending' },
  { id:'BK-75663', date:'06 Jun 2026', customer:'Suresh Babu', status:'Assigned' },
  { id:'BK-14487', date:'07 Jun 2026', customer:'Priya Sharma', status:'Pending' },
  { id:'BK-16219', date:'08 Jun 2026', customer:'Anil Kumar', status:'Assigned' },
  { id:'BK-18351', date:'09 Jun 2026', customer:'Kavitha Reddy', status:'Pending' },
];

const topServices = [
  { rank:1, name:'Deep Cleaning', bookings:452 },
  { rank:2, name:'AC Repair', bookings:398 },
  { rank:3, name:'Plumbing', bookings:275 },
  { rank:4, name:'Hair Cut & Spa', bookings:264 },
  { rank:5, name:'Pest Control', bookings:152 },
];
const topProfessionals = [
  { rank:1, name:'Tech Revive Solutions', bookings:168 },
  { rank:2, name:'QuickFix Services', bookings:147 },
  { rank:3, name:'Home Care Pro', bookings:139 },
  { rank:4, name:'Service Hub India', bookings:131 },
  { rank:5, name:'Bright Services', bookings:127 },
];
const topCustomers = [
  { rank:1, name:'Rajesh Singhania', totalVal:'₹45,200', bookings:26 },
  { rank:2, name:'Vikram Mehta', totalVal:'₹34,100', bookings:21 },
  { rank:3, name:'Neha Gupta', totalVal:'₹28,900', bookings:18 },
  { rank:4, name:'Sandeep Sharma', totalVal:'₹25,300', bookings:15 },
  { rank:5, name:'Anjali Verma', totalVal:'₹21,700', bookings:12 },
];

const servicePerformance = [
  { type:'Deep Cleaning', bookings:856, completed:732, revenue:41250, pct:47.7, color:'#3b82f6' },
  { type:'AC Repair', bookings:642, completed:521, revenue:26530, pct:30.7, color:'#22c55e' },
  { type:'Plumbing', bookings:412, completed:298, revenue:12560, pct:14.5, color:'#f59e0b' },
  { type:'Hair Cut & Spa', bookings:218, completed:144, revenue:6080,  pct:7.0,  color:'#ec4899' },
];

const bookingsTable = [
  { id:'BK-98462', category:'Home Services', service:'AC Repair', customer:'Ramesh Kumar', professional:'Tech Revive', status:'Completed', amount:'₹1,250.00', date:'05 Jun 2026', created:'05 May 2026' },
  { id:'BK-75663', category:'Cleaning', service:'Deep Cleaning', customer:'Suresh Electricals', professional:'Home Care Pro', status:'Completed', amount:'₹2,450.00', date:'06 Jun 2026', created:'06 May 2026' },
  { id:'BK-14487', category:'Beauty & Salon', service:'Hair Cut & Spa', customer:'Tech Review Hub', professional:'Beauty Hub', status:'Pending', amount:'₹780.00', date:'07 Jun 2026', created:'07 May 2026' },
  { id:'BK-16219', category:'Home Services', service:'Plumbing', customer:'Priya Sharma', professional:'QuickFix', status:'Cancelled', amount:'₹100.00', date:'08 Jun 2026', created:'08 May 2026' },
  { id:'BK-18351', category:'Cleaning', service:'Pest Control', customer:'QuickFix Services', professional:'Pest Experts', status:'Completed', amount:'₹1,360.00', date:'09 Jun 2026', created:'09 May 2026' },
];

// ─── HELPERS ─────────────────────────────────────────────────────────────────

function fmtNum(n) {
  if (n >= 1_000_000) return (n / 1_000_000).toFixed(1) + 'M';
  if (n >= 1_000) return n.toLocaleString();
  return String(n);
}
function fmtCurr(n) {
  if (n >= 1_000_000) return '₹' + (n / 1_000_000).toFixed(1) + 'M';
  if (n >= 1_000) return '₹' + (n / 1_000).toFixed(1) + 'k';
  return '₹' + String(n);
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
export default function BookingAnalytics({ activeTab = 'Bookings Dashboard' }) {
  const { addToast } = useToast();
  const [period, setPeriod] = useState('Monthly');

  const topKpis = [
    { label:'Total Bookings', value:3220, sub:'↑ 18.6% vs Apr 2026', color:'#3b82f6', bg:'#eff6ff', icon:CalendarCheck },
    { label:'Completed Bookings', value:2450, sub:'76.1% of total ↑ 12.5%', color:'#22c55e', bg:'#f0fdf4', icon:CheckCircle },
    { label:'Pending Bookings', value:620, sub:'19.2% of total ↓ 5.8%', color:'#f59e0b', bg:'#fffbeb', icon:Clock },
    { label:'Cancelled Bookings', value:150, sub:'4.7% of total', color:'#ef4444', bg:'#fff1f2', icon:XCircle },
    { label:'Total Revenue', value:105000, isCurr:true, sub:'↑ 22.4% vs Apr 2026', color:'#8b5cf6', bg:'#f5f3ff', icon:DollarSign },
    { label:'Assigned Bookings', value:2150, sub:'66.8% of total', color:'#22c55e', bg:'#f0fdf4', icon:User },
    { label:'Refunded Bookings', value:85, sub:'2.6% of total', color:'#ef4444', bg:'#fff1f2', icon:RefreshCcw },
    { label:'Average Booking Value', value:0, isCustom:true, color:'#f59e0b', bg:'#fffbeb', icon:Activity },
  ];

  const subKpis = [
    { label:'Home Services', value:1450, sub:'45.0% of total', unused:450, unusedPct:'31.0%', color:'#3b82f6', bg:'#eff6ff', icon:ShieldCheck },
    { label:'Beauty & Salon', value:950, sub:'29.5% of total', unused:210, unusedPct:'22.1%', color:'#ec4899', bg:'#fdf2f8', icon:User },
    { label:'Cleaning', value:820, sub:'25.5% of total', unused:160, unusedPct:'19.5%', color:'#22c55e', bg:'#f0fdf4', icon:Briefcase },
  ];

  return (
    <AdminShell activeTab={activeTab} headerTitle="Bookings Dashboard" searchPlaceholder="Search pages, modules...">
      <div style={{ padding:'20px 24px 48px', background:'#f8fafc', minHeight:'100vh', fontFamily:"'Inter',-apple-system,sans-serif" }}>

        {/* ── HEADER ── */}
        <div style={{ marginBottom:16 }}>
          <h1 style={{ fontSize:22, fontWeight:800, color:'#0f172a', margin:0 }}>Bookings Dashboard</h1>
          <p style={{ fontSize:12, color:'#94a3b8', margin:'4px 0 0' }}>High-level overview of bookings performance and ecosystem health</p>
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

        {/* ── FILTER BAR 2 ── */}
        <div style={{
          marginBottom:14,
          display:'flex', alignItems:'center', flexWrap:'wrap', gap:12,
        }}>
          <FilterSelect label="Booking Category" options={['All','Home Services','Beauty & Salon','Cleaning']} />
          <FilterSelect label="Payment Status" options={['All','Paid Online','Cash on Delivery']} />
          <FilterSelect label="Service Type" options={['All','Deep Cleaning','AC Repair','Plumbing','Hair Cut & Spa']} />
          <FilterSelect label="Booking Status" options={['All','Completed','Pending','Cancelled']} />
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
                    <div style={{ fontSize:18, fontWeight:800, color:'#0f172a' }}>{k.isCurr ? fmtCurr(k.value) : fmtNum(k.value)}</div>
                    <div style={{ fontSize:9, color: k.sub.includes('↑') ? '#16a34a' : k.sub.includes('↓') ? '#dc2626' : '#64748b', fontWeight:600 }}>{k.sub}</div>
                  </>
                ) : (
                  <div style={{ display:'flex', flexDirection:'column', gap:2 }}>
                    <div style={{ display:'flex', justifyContent:'space-between', fontSize:9 }}>
                      <span style={{ color:'#64748b' }}>Current Month</span>
                      <span style={{ fontWeight:700 }}>₹1,425 <span style={{ color:'#16a34a', fontWeight:600 }}>(+2.1%)</span></span>
                    </div>
                    <div style={{ display:'flex', justifyContent:'space-between', fontSize:9 }}>
                      <span style={{ color:'#64748b' }}>Previous Month</span>
                      <span style={{ fontWeight:700 }}>₹1,395</span>
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
                      Pending
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
                  <div style={{ fontSize:11, fontWeight:800, color:'#0f172a', display:'flex', alignItems:'center', gap:4 }}><Activity size={12} color="#3b82f6" /> Top Services</div>
                  <a href="#" style={{ fontSize:9, color:'#3b82f6', textDecoration:'none', fontWeight:600 }}>View All</a>
                </div>
                <table style={{ width:'100%', fontSize:9.5, borderCollapse:'collapse' }}>
                  <thead>
                    <tr style={{ background:'#1e1b4b', color:'#fff' }}>
                      <th style={{ textAlign:'left', padding:'6px 8px', fontWeight:700 }}>RANK</th>
                      <th style={{ textAlign:'left', padding:'6px 8px', fontWeight:700 }}>SERVICE NAME</th>
                      <th style={{ textAlign:'right', padding:'6px 8px', fontWeight:700 }}>BOOKINGS</th>
                    </tr>
                  </thead>
                  <tbody>
                    {topServices.map(u => (
                      <tr key={u.rank} style={{ borderBottom:'1px solid #e8edf2' }}>
                        <td style={{ padding:'6px 8px', fontWeight:600 }}>{u.rank}</td>
                        <td style={{ padding:'6px 8px', fontWeight:600 }}>{u.name}</td>
                        <td style={{ padding:'6px 8px', textAlign:'right', fontWeight:700 }}>{u.bookings}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Table 2 */}
              <div>
                <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:10 }}>
                  <div style={{ fontSize:11, fontWeight:800, color:'#0f172a', display:'flex', alignItems:'center', gap:4 }}><Briefcase size={12} color="#8b5cf6" /> Top Professionals</div>
                  <a href="#" style={{ fontSize:9, color:'#3b82f6', textDecoration:'none', fontWeight:600 }}>View All</a>
                </div>
                <table style={{ width:'100%', fontSize:9.5, borderCollapse:'collapse' }}>
                  <thead>
                    <tr style={{ background:'#1e1b4b', color:'#fff' }}>
                      <th style={{ textAlign:'left', padding:'6px 8px', fontWeight:700 }}>RANK</th>
                      <th style={{ textAlign:'left', padding:'6px 8px', fontWeight:700 }}>PROFESSIONAL NAME</th>
                      <th style={{ textAlign:'right', padding:'6px 8px', fontWeight:700 }}>BOOKINGS</th>
                    </tr>
                  </thead>
                  <tbody>
                    {topProfessionals.map(u => (
                      <tr key={u.rank} style={{ borderBottom:'1px solid #e8edf2' }}>
                        <td style={{ padding:'6px 8px', fontWeight:600 }}>{u.rank}</td>
                        <td style={{ padding:'6px 8px', fontWeight:600 }}>{u.name}</td>
                        <td style={{ padding:'6px 8px', textAlign:'right', fontWeight:700 }}>{u.bookings}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Table 3 */}
              <div>
                <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:10 }}>
                  <div style={{ fontSize:11, fontWeight:800, color:'#0f172a', display:'flex', alignItems:'center', gap:4 }}><User size={12} color="#f59e0b" /> Top Customers</div>
                  <a href="#" style={{ fontSize:9, color:'#3b82f6', textDecoration:'none', fontWeight:600 }}>View All</a>
                </div>
                <table style={{ width:'100%', fontSize:9.5, borderCollapse:'collapse' }}>
                  <thead>
                    <tr style={{ background:'#1e1b4b', color:'#fff' }}>
                      <th style={{ textAlign:'left', padding:'6px 8px', fontWeight:700 }}>RANK</th>
                      <th style={{ textAlign:'left', padding:'6px 8px', fontWeight:700 }}>CUSTOMER NAME</th>
                      <th style={{ textAlign:'right', padding:'6px 8px', fontWeight:700 }}>VALUE</th>
                      <th style={{ textAlign:'right', padding:'6px 8px', fontWeight:700 }}>BOOKINGS</th>
                    </tr>
                  </thead>
                  <tbody>
                    {topCustomers.map(u => (
                      <tr key={u.rank} style={{ borderBottom:'1px solid #e8edf2' }}>
                        <td style={{ padding:'6px 8px', fontWeight:600 }}>{u.rank}</td>
                        <td style={{ padding:'6px 8px', fontWeight:600 }}>{u.name}</td>
                        <td style={{ padding:'6px 8px', textAlign:'right', fontWeight:700 }}>{u.totalVal}</td>
                        <td style={{ padding:'6px 8px', textAlign:'right', fontWeight:700 }}>{u.bookings}</td>
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
            <h2 style={{ fontSize:13, fontWeight:800, color:'#0f172a', margin:'0 0 8px' }}>Bookings by Category</h2>
            <div style={{ display:'flex', alignItems:'center', gap:14 }}>
              <PieChart width={140} height={140}>
                <Pie data={categoryDist} cx={70} cy={70} innerRadius={42} outerRadius={65} paddingAngle={2} dataKey="value" startAngle={90} endAngle={-270}>
                  {categoryDist.map((e,i) => <Cell key={i} fill={e.color} />)}
                  <DonutCenter viewBox={{ cx:70, cy:70 }} value="3,220" label="Total Bookings" />
                </Pie>
                <Tooltip formatter={v => fmtNum(v)} />
              </PieChart>
              <div style={{ flex:1, display:'flex', flexDirection:'column', gap:6 }}>
                {categoryDist.map((item,i) => (
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
            <h2 style={{ fontSize:13, fontWeight:800, color:'#0f172a', margin:'0 0 8px' }}>Payment Status</h2>
            <div style={{ display:'flex', alignItems:'center', gap:14 }}>
              <PieChart width={140} height={140}>
                <Pie data={paymentDist} cx={70} cy={70} innerRadius={42} outerRadius={65} paddingAngle={2} dataKey="value" startAngle={90} endAngle={-270}>
                  {paymentDist.map((e,i) => <Cell key={i} fill={e.color} />)}
                  <DonutCenter viewBox={{ cx:70, cy:70 }} value="3,220" label="Total Bookings" />
                </Pie>
                <Tooltip formatter={v => fmtNum(v)} />
              </PieChart>
              <div style={{ flex:1, display:'flex', flexDirection:'column', gap:6 }}>
                {paymentDist.map((item,i) => (
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
            <h2 style={{ fontSize:13, fontWeight:800, color:'#0f172a', margin:'0 0 8px' }}>Booking Status</h2>
            <div style={{ display:'flex', alignItems:'center', gap:14 }}>
              <PieChart width={140} height={140}>
                <Pie data={statusDist} cx={70} cy={70} innerRadius={42} outerRadius={65} paddingAngle={2} dataKey="value" startAngle={90} endAngle={-270}>
                  {statusDist.map((e,i) => <Cell key={i} fill={e.color} />)}
                  <DonutCenter viewBox={{ cx:70, cy:70 }} value="3,220" label="Total Bookings" />
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
              <h2 style={{ fontSize:13, fontWeight:800, color:'#0f172a', margin:0 }}>Upcoming Bookings</h2>
              <a href="#" style={{ fontSize:10, color:'#3b82f6', textDecoration:'none', fontWeight:600 }}>View All</a>
            </div>
            <table style={{ width:'100%', fontSize:10.5 }}>
              <thead>
                <tr>
                  <th style={{ textAlign:'left', color:'#94a3b8', paddingBottom:6, fontWeight:600 }}>Booking ID</th>
                  <th style={{ textAlign:'left', color:'#94a3b8', paddingBottom:6, fontWeight:600 }}>Date</th>
                  <th style={{ textAlign:'left', color:'#94a3b8', paddingBottom:6, fontWeight:600 }}>Customer</th>
                  <th style={{ textAlign:'right', color:'#94a3b8', paddingBottom:6, fontWeight:600 }}>Status</th>
                </tr>
              </thead>
              <tbody>
                {upcomingBookings.map(c => (
                  <tr key={c.id}>
                    <td style={{ padding:'6px 0', fontWeight:800, color:'#0f172a' }}>{c.id}</td>
                    <td style={{ padding:'6px 0', fontWeight:600, color:'#475569' }}>{c.date}</td>
                    <td style={{ padding:'6px 0', fontWeight:600, color:'#475569' }}>{c.customer}</td>
                    <td style={{ padding:'6px 0', textAlign:'right', fontWeight:700, color:'#f59e0b' }}>{c.status}</td>
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
              <h2 style={{ fontSize:13, fontWeight:800, color:'#0f172a', margin:0 }}>Bookings Over Time</h2>
              <FilterSelect options={['Daily','Weekly','Monthly']} />
            </div>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={bookingsOverTime} margin={{ top:4, right:4, left:-20, bottom:0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="day" tick={{ fontSize:10, fill:'#94a3b8', fontWeight:600 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize:10, fill:'#94a3b8', fontWeight:600 }} axisLine={false} tickLine={false} tickFormatter={v => v>=1000?(v/1000)+'K':v} />
                <Tooltip content={<LineTooltip />} />
                <Legend iconType="circle" iconSize={8} wrapperStyle={{ fontSize:11, paddingTop:6, fontWeight:600 }} />
                <Line type="monotone" dataKey="total"  name="Total Bookings"  stroke="#3b82f6" strokeWidth={3} dot={false} />
                <Line type="monotone" dataKey="completed"   name="Completed"   stroke="#22c55e" strokeWidth={3} dot={false} />
                <Line type="monotone" dataKey="pending"  name="Pending"  stroke="#f59e0b" strokeWidth={3} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div style={{ background:'#fff', borderRadius:10, padding:'18px', boxShadow:'0 1px 3px rgba(0,0,0,0.05)', border:'1px solid #e8edf2', display:'flex', flexDirection:'column' }}>
            <h2 style={{ fontSize:13, fontWeight:800, color:'#0f172a', margin:'0 0 12px' }}>Revenue by Category</h2>
            <div style={{ display:'flex', alignItems:'center', gap:14 }}>
              <PieChart width={140} height={140}>
                <Pie data={revenueDist} cx={70} cy={70} innerRadius={42} outerRadius={65} paddingAngle={2} dataKey="value" startAngle={90} endAngle={-270}>
                  {revenueDist.map((e,i) => <Cell key={i} fill={e.color} />)}
                  <DonutCenter viewBox={{ cx:70, cy:70 }} value="₹105K" label="Total Revenue" />
                </Pie>
                <Tooltip formatter={v => fmtCurr(v)} />
              </PieChart>
              <div style={{ flex:1, display:'flex', flexDirection:'column', gap:8 }}>
                {revenueDist.map((item,i) => (
                  <div key={i} style={{ display:'flex', alignItems:'center', justifyContent:'space-between', fontSize:10.5 }}>
                    <div style={{ display:'flex', alignItems:'center', gap:5 }}>
                      <span style={{ width:7, height:7, borderRadius:'50%', background:item.color, flexShrink:0, display:'inline-block' }} />
                      <span style={{ color:'#475569', fontWeight:600 }}>{item.name}</span>
                    </div>
                    <div style={{ display:'flex', gap:4, alignItems:'center' }}>
                      <span style={{ fontWeight:800, color:'#0f172a' }}>{fmtCurr(item.value)}</span>
                      <span style={{ color:'#94a3b8', fontSize:9.5 }}>({item.pct})</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div style={{ background:'#fff', borderRadius:10, padding:'18px', boxShadow:'0 1px 3px rgba(0,0,0,0.05)', border:'1px solid #e8edf2' }}>
            <h2 style={{ fontSize:13, fontWeight:800, color:'#0f172a', margin:'0 0 12px' }}>Service Revenue Performance</h2>
            <table style={{ width:'100%', fontSize:10.5 }}>
              <thead>
                <tr style={{ borderBottom:'1px solid #f1f5f9' }}>
                  <th style={{ textAlign:'left', color:'#94a3b8', paddingBottom:6, fontWeight:600 }}>Service Type</th>
                  <th style={{ textAlign:'right', color:'#94a3b8', paddingBottom:6, fontWeight:600 }}>Bookings</th>
                  <th style={{ textAlign:'right', color:'#94a3b8', paddingBottom:6, fontWeight:600 }}>Completed</th>
                  <th style={{ textAlign:'right', color:'#94a3b8', paddingBottom:6, fontWeight:600 }}>Revenue</th>
                  <th style={{ textAlign:'right', color:'#94a3b8', paddingBottom:6, fontWeight:600 }}>% Total</th>
                </tr>
              </thead>
              <tbody>
                {servicePerformance.map(r => (
                  <tr key={r.type}>
                    <td style={{ padding:'8px 0', fontWeight:700, color:'#0f172a' }}>{r.type}</td>
                    <td style={{ padding:'8px 0', textAlign:'right', fontWeight:600, color:'#475569' }}>{r.bookings}</td>
                    <td style={{ padding:'8px 0', textAlign:'right', fontWeight:600, color:'#475569' }}>{r.completed}</td>
                    <td style={{ padding:'8px 0', textAlign:'right', fontWeight:600, color:'#475569' }}>{fmtCurr(r.revenue)}</td>
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
          <h2 style={{ fontSize:13, fontWeight:800, color:'#0f172a', margin:'0 0 12px' }}>Recent Bookings</h2>
          <table style={{ width:'100%', borderCollapse:'collapse', fontSize:10, minWidth:900 }}>
            <thead>
              <tr style={{ borderBottom:'1px solid #f1f5f9' }}>
                <th style={{ padding:'8px 6px', textAlign:'left', fontWeight:700, color:'#94a3b8', whiteSpace:'nowrap' }}>Booking ID</th>
                <th style={{ padding:'8px 6px', textAlign:'left', fontWeight:700, color:'#94a3b8', whiteSpace:'nowrap' }}>Category</th>
                <th style={{ padding:'8px 6px', textAlign:'left', fontWeight:700, color:'#94a3b8', whiteSpace:'nowrap' }}>Service</th>
                <th style={{ padding:'8px 6px', textAlign:'left', fontWeight:700, color:'#94a3b8', whiteSpace:'nowrap' }}>Customer Name</th>
                <th style={{ padding:'8px 6px', textAlign:'left', fontWeight:700, color:'#94a3b8', whiteSpace:'nowrap' }}>Professional Name</th>
                <th style={{ padding:'8px 6px', textAlign:'left', fontWeight:700, color:'#94a3b8', whiteSpace:'nowrap' }}>Status</th>
                <th style={{ padding:'8px 6px', textAlign:'right', fontWeight:700, color:'#94a3b8', whiteSpace:'nowrap' }}>Amount</th>
                <th style={{ padding:'8px 6px', textAlign:'left', fontWeight:700, color:'#94a3b8', whiteSpace:'nowrap' }}>Date</th>
                <th style={{ padding:'8px 6px', textAlign:'left', fontWeight:700, color:'#94a3b8', whiteSpace:'nowrap' }}>Created On</th>
                <th style={{ padding:'8px 6px', textAlign:'center', fontWeight:700, color:'#94a3b8', whiteSpace:'nowrap' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {bookingsTable.map((r,i) => (
                <tr key={i} style={{ borderBottom:i<bookingsTable.length-1?'1px solid #f8fafc':'none' }}>
                  <td style={{ padding:'10px 6px', fontWeight:800, color:'#0f172a', whiteSpace:'nowrap' }}>{r.id}</td>
                  <td style={{ padding:'10px 6px', fontWeight:600, color:'#475569' }}>{r.category}</td>
                  <td style={{ padding:'10px 6px', fontWeight:700, color:'#0f172a' }}>{r.service}</td>
                  <td style={{ padding:'10px 6px', fontWeight:600, color:'#475569' }}>{r.customer}</td>
                  <td style={{ padding:'10px 6px', fontWeight:600, color:'#475569' }}>{r.professional}</td>
                  <td style={{ padding:'10px 6px', fontWeight:700, color:r.status==='Completed'?'#22c55e':r.status==='Cancelled'?'#ef4444':'#f59e0b' }}>{r.status}</td>
                  <td style={{ padding:'10px 6px', textAlign:'right', fontWeight:800, color:'#0f172a' }}>{r.amount}</td>
                  <td style={{ padding:'10px 6px', fontWeight:600, color:'#475569' }}>{r.date}</td>
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
