import React, { useState } from 'react';
import {
  CalendarCheck, CheckCircle, XCircle, Clock, Users, User, Briefcase, Star,
  Eye, ChevronDown, ChevronLeft, ChevronRight, DollarSign,
  TrendingUp, TrendingDown
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
  { name: 'Paid Online',       value: 2150, color: '#3b82f6', pct: '66.8%' },
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
  { id: 'BK-98462', genBy: 'User',    name: 'Ramesh Kumar',       category: 'Home Services', status: 'Completed', userBookings: 18, partnerBookings: 7,  total: 25, service: 'AC Repair',      amount: '1,250', expires: '05 Jun 2026', created: '05 May 2026' },
  { id: 'BK-75663', genBy: 'Partner', name: 'Suresh Electricals', category: 'Cleaning',      status: 'Completed', userBookings: 32, partnerBookings: 13, total: 45, service: 'Deep Cleaning',  amount: '2,450', expires: '06 Jun 2026', created: '06 May 2026' },
  { id: 'BK-14487', genBy: 'User',    name: 'Tech Review Hub',    category: 'Beauty & Salon',status: 'Pending',   userBookings: 60, partnerBookings: 18, total: 78, service: 'Hair Cut & Spa', amount: '780',   expires: '07 Jun 2026', created: '07 May 2026' },
  { id: 'BK-16219', genBy: 'Partner', name: 'Priya Sharma',       category: 'Home Services', status: 'Cancelled', userBookings: 9,  partnerBookings: 1,  total: 10, service: 'Plumbing',       amount: '100',   expires: '08 Jun 2026', created: '08 May 2026' },
  { id: 'BK-18351', genBy: 'User',    name: 'QuickFix Services',  category: 'Cleaning',      status: 'Completed', userBookings: 24, partnerBookings: 12, total: 36, service: 'Pest Control',   amount: '1,360', expires: '09 Jun 2026', created: '09 May 2026' },
];

/* ─────────────────── CSS ─────────────────── */
const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
  .ba-root { font-family:'Inter',-apple-system,BlinkMacSystemFont,sans-serif; background:#f8fafc; min-height:100%; padding-bottom:24px; }

  .ba-filter-card { background:#fff; border:1px solid #e8edf3; border-radius:16px; padding:18px 22px; margin-bottom:18px; box-shadow:0 1px 4px rgba(15,23,42,0.04); }
  .ba-filter-row { display:flex; flex-wrap:wrap; gap:14px; align-items:flex-end; }
  .ba-filter-row + .ba-filter-row { margin-top:14px; }
  .ba-flabel { font-size:11px; font-weight:600; color:#64748b; margin-bottom:5px; display:block; text-transform:uppercase; letter-spacing:0.05em; }
  .ba-swrap { position:relative; }
  .ba-sel { appearance:none; background:#f8fafc; border:1.5px solid #e2e8f0; border-radius:8px; padding:8px 30px 8px 12px; font-size:13px; font-weight:500; color:#1e293b; cursor:pointer; outline:none; width:100%; font-family:'Inter',sans-serif; transition:border-color 0.18s,box-shadow 0.18s; }
  .ba-sel:focus { border-color:#3b82f6; box-shadow:0 0 0 3px rgba(59,130,246,0.1); }
  .ba-sel:hover { border-color:#cbd5e1; }
  .ba-sarrow { position:absolute; right:10px; top:50%; transform:translateY(-50%); pointer-events:none; color:#94a3b8; }

  .ba-period-group { display:flex; background:#f1f5f9; border-radius:9px; padding:3px; gap:2px; border:1.5px solid #e2e8f0; }
  .ba-period-btn { padding:6px 14px; border:none; background:transparent; color:#64748b; font-size:12.5px; font-weight:600; cursor:pointer; border-radius:7px; transition:all 0.18s; font-family:'Inter',sans-serif; }
  .ba-period-btn.active { background:#1e293b; color:#fff; box-shadow:0 2px 6px rgba(15,23,42,0.2); }
  .ba-period-btn:hover:not(.active) { background:#e2e8f0; color:#1e293b; }

  .ba-apply { background:linear-gradient(135deg,#1e293b,#334155); color:#fff; border:none; border-radius:8px; padding:8px 22px; font-size:13px; font-weight:700; cursor:pointer; font-family:'Inter',sans-serif; box-shadow:0 2px 8px rgba(15,23,42,0.25); transition:all 0.18s; }
  .ba-apply:hover { transform:translateY(-1px); box-shadow:0 4px 14px rgba(15,23,42,0.35); }
  .ba-reset { background:#fff; color:#475569; border:1.5px solid #e2e8f0; border-radius:8px; padding:8px 22px; font-size:13px; font-weight:600; cursor:pointer; font-family:'Inter',sans-serif; transition:all 0.18s; }
  .ba-reset:hover { background:#f8fafc; border-color:#cbd5e1; }

  .ba-kpi-grid { display:grid; grid-template-columns:repeat(4,1fr); gap:14px; margin-bottom:18px; }
  .ba-kpi-card { background:#fff; border-radius:14px; border:1px solid #e8edf3; padding:16px; box-shadow:0 2px 6px rgba(15,23,42,0.04); transition:transform 0.22s cubic-bezier(.34,1.56,.64,1),box-shadow 0.22s; }
  .ba-kpi-card:hover { transform:translateY(-4px); box-shadow:0 12px 28px rgba(15,23,42,0.1); }
  .ba-kpi-top { display:flex; align-items:center; gap:10px; margin-bottom:12px; }
  .ba-kpi-icon { width:42px; height:42px; border-radius:11px; display:flex; align-items:center; justify-content:center; flex-shrink:0; }
  .ba-kpi-lbl { font-size:12px; font-weight:600; color:#64748b; line-height:1.3; }
  .ba-kpi-val { font-size:26px; font-weight:800; color:#0f172a; line-height:1; margin-bottom:8px; letter-spacing:-0.5px; }
  .ba-kpi-trend { display:inline-flex; align-items:center; gap:3px; font-size:11.5px; font-weight:700; border-radius:6px; padding:2px 7px 2px 4px; }
  .ba-kpi-trend.up { background:#f0fdf4; color:#16a34a; }
  .ba-kpi-trend.down { background:#fef2f2; color:#dc2626; }
  .ba-kpi-tsub { font-size:10.5px; color:#94a3b8; font-weight:500; margin-left:4px; }
  .ba-kpi-custom-row { display:flex; justify-content:space-between; align-items:center; padding:5px 0; border-bottom:1px dashed #f1f5f9; font-size:11.5px; }
  .ba-kpi-custom-row:last-child { border-bottom:none; }
  .ba-kpi-clbl { color:#64748b; font-weight:500; }
  .ba-kpi-cval { font-weight:700; color:#0f172a; }
  .ba-kpi-cpct { color:#94a3b8; font-weight:500; margin-left:3px; }

  .ba-sub-row { display:grid; grid-template-columns:repeat(3,1fr); gap:14px; margin-bottom:18px; }
  .ba-sub-card { background:#fff; border-radius:14px; border:1px solid #e8edf3; padding:16px; display:flex; align-items:center; gap:14px; box-shadow:0 2px 6px rgba(15,23,42,0.04); transition:transform 0.2s,box-shadow 0.2s; }
  .ba-sub-card:hover { transform:translateY(-3px); box-shadow:0 8px 20px rgba(15,23,42,0.08); }
  .ba-sub-icon { width:42px; height:42px; border-radius:11px; display:flex; align-items:center; justify-content:center; flex-shrink:0; }
  .ba-sub-lbl { font-size:11.5px; font-weight:600; color:#64748b; margin-bottom:2px; }
  .ba-sub-val { font-size:22px; font-weight:800; color:#0f172a; line-height:1; margin-bottom:3px; }
  .ba-sub-sub { font-size:11px; color:#94a3b8; font-weight:500; }
  .ba-sub-div { width:1px; height:48px; background:#f1f5f9; flex-shrink:0; }
  .ba-sub-right { text-align:center; min-width:70px; }
  .ba-sub-plbl { font-size:11px; font-weight:700; color:#f59e0b; text-transform:uppercase; letter-spacing:0.04em; margin-bottom:2px; }
  .ba-sub-pval { font-size:18px; font-weight:800; color:#0f172a; }
  .ba-sub-psub { font-size:10.5px; color:#94a3b8; font-weight:500; }

  .ba-card { background:#fff; border-radius:16px; border:1px solid #e8edf3; box-shadow:0 2px 6px rgba(15,23,42,0.04); overflow:hidden; }
  .ba-card-head { display:flex; justify-content:space-between; align-items:center; padding:16px 20px 14px; border-bottom:1.5px solid #f1f5f9; }
  .ba-card-title { font-size:14.5px; font-weight:800; color:#0f172a; margin:0; letter-spacing:-0.2px; }
  .ba-view-all { font-size:12px; color:#3b82f6; font-weight:600; background:#eff6ff; padding:5px 14px; border-radius:7px; border:1.5px solid #bfdbfe; cursor:pointer; transition:all 0.18s; font-family:'Inter',sans-serif; text-decoration:none; display:inline-block; }
  .ba-view-all:hover { background:#dbeafe; border-color:#93c5fd; }

  .ba-perf-row { display:grid; grid-template-columns:repeat(3,1fr); gap:14px; margin-bottom:18px; }
  .ba-perf-card { background:#fff; border-radius:16px; border:1px solid #e8edf3; box-shadow:0 2px 6px rgba(15,23,42,0.04); overflow:hidden; }
  .ba-perf-head { display:flex; justify-content:space-between; align-items:center; padding:14px 18px 12px; border-bottom:1.5px solid #f1f5f9; }
  .ba-perf-title { display:flex; align-items:center; gap:8px; font-size:13px; font-weight:700; color:#0f172a; }
  .ba-perf-icon { width:26px; height:26px; border-radius:50%; display:flex; align-items:center; justify-content:center; flex-shrink:0; }
  .ba-ptable { width:100%; border-collapse:collapse; font-size:12.5px; }
  .ba-ptable thead tr { background:#f8fafc; }
  .ba-ptable th { padding:8px 14px; text-align:left; font-weight:700; color:#475569; font-size:11px; text-transform:uppercase; letter-spacing:0.04em; border-bottom:1px solid #f1f5f9; }
  .ba-ptable td { padding:10px 14px; color:#334155; border-bottom:1px solid #f1f5f9; font-weight:500; }
  .ba-ptable tbody tr:last-child td { border-bottom:none; }
  .ba-ptable tbody tr:hover td { background:#f8fafc; }
  .ba-rank { width:22px; height:22px; background:#f1f5f9; border-radius:6px; display:inline-flex; align-items:center; justify-content:center; font-size:11px; font-weight:700; color:#475569; }

  .ba-charts-row { display:grid; grid-template-columns:1.9fr 1fr 1fr; gap:14px; margin-bottom:18px; }
  .ba-freq-btns { display:flex; background:#f1f5f9; border-radius:8px; padding:2px; gap:2px; border:1.5px solid #e2e8f0; }
  .ba-freq-btn { padding:4px 12px; border:none; background:transparent; color:#64748b; font-size:11.5px; font-weight:600; cursor:pointer; border-radius:6px; transition:all 0.18s; font-family:'Inter',sans-serif; }
  .ba-freq-btn.active { background:#1e293b; color:#fff; }
  .ba-freq-btn:hover:not(.active) { background:#e2e8f0; }

  .ba-donut-body { padding:16px 18px; display:flex; flex-direction:column; align-items:center; gap:14px; }
  .ba-dleg-row { display:flex; align-items:center; justify-content:space-between; width:100%; font-size:11.5px; padding:4px 0; border-bottom:1px dashed #f1f5f9; }
  .ba-dleg-row:last-child { border-bottom:none; }
  .ba-ddot { width:9px; height:9px; border-radius:50%; flex-shrink:0; }
  .ba-dname { color:#334155; font-weight:600; margin-left:7px; flex:1; }
  .ba-dval { font-weight:700; color:#0f172a; }
  .ba-dpct { color:#94a3b8; font-weight:500; margin-left:4px; }

  .ba-bottom-row { display:grid; grid-template-columns:1.4fr 1fr; gap:14px; margin-bottom:18px; }

  .ba-sptable { width:100%; border-collapse:collapse; font-size:12.5px; }
  .ba-sptable th { background:#f8fafc; padding:10px 14px; text-align:left; font-weight:700; color:#475569; font-size:11px; text-transform:uppercase; letter-spacing:0.04em; border-bottom:1.5px solid #f1f5f9; }
  .ba-sptable td { padding:12px 14px; border-bottom:1px solid #f1f5f9; color:#334155; font-weight:500; }
  .ba-sptable tbody tr:last-child td { border-bottom:none; }
  .ba-sptable tbody tr:hover td { background:#f8fafc; }

  .ba-uptable { width:100%; border-collapse:collapse; font-size:12.5px; }
  .ba-uptable th { background:#f8fafc; padding:10px 16px; text-align:left; font-weight:700; color:#475569; font-size:11px; text-transform:uppercase; letter-spacing:0.04em; border-bottom:1.5px solid #f1f5f9; }
  .ba-uptable td { padding:11px 16px; border-bottom:1px solid #f1f5f9; color:#334155; font-weight:500; }
  .ba-uptable tbody tr:last-child td { border-bottom:none; }
  .ba-uptable tbody tr:hover td { background:#f8fafc; }

  .ba-mtable-wrap { overflow-x:auto; }
  .ba-mtable { width:100%; border-collapse:collapse; font-size:12.5px; min-width:900px; }
  .ba-mtable thead tr { background:#f8fafc; }
  .ba-mtable th { padding:11px 14px; text-align:left; font-weight:700; color:#475569; font-size:11px; text-transform:uppercase; letter-spacing:0.04em; border-bottom:1.5px solid #e8edf3; white-space:nowrap; }
  .ba-mtable td { padding:12px 14px; color:#334155; border-bottom:1px solid #f1f5f9; font-weight:500; white-space:nowrap; }
  .ba-mtable tbody tr:hover td { background:#f8fafc; }
  .ba-mtable tbody tr:last-child td { border-bottom:none; }

  .ba-badge { display:inline-flex; align-items:center; gap:5px; padding:3px 10px 3px 8px; border-radius:20px; font-size:11px; font-weight:700; white-space:nowrap; border:1.5px solid; }
  .ba-bdot { width:6px; height:6px; border-radius:50%; }
  .ba-bc { background:#f0fdf4; color:#16a34a; border-color:#bbf7d0; }
  .ba-bp { background:#fffbeb; color:#d97706; border-color:#fde68a; }
  .ba-bx { background:#fef2f2; color:#dc2626; border-color:#fecaca; }

  .ba-act-btn { width:30px; height:30px; border-radius:7px; border:1.5px solid #e2e8f0; background:#fff; display:inline-flex; align-items:center; justify-content:center; cursor:pointer; color:#3b82f6; transition:all 0.18s; }
  .ba-act-btn:hover { background:#eff6ff; border-color:#bfdbfe; transform:scale(1.1); }

  .ba-pagi { display:flex; align-items:center; gap:6px; padding:12px 20px 16px; border-top:1.5px solid #f1f5f9; }
  .ba-pbtn { width:32px; height:32px; border-radius:7px; border:1.5px solid #e2e8f0; background:#fff; display:inline-flex; align-items:center; justify-content:center; cursor:pointer; font-size:12.5px; font-weight:600; color:#475569; transition:all 0.18s; font-family:'Inter',sans-serif; }
  .ba-pbtn.active { background:linear-gradient(135deg,#3b82f6,#2563eb); color:#fff; border-color:#3b82f6; box-shadow:0 3px 8px rgba(59,130,246,0.35); }
  .ba-pbtn:hover:not(.active) { background:#f1f5f9; border-color:#cbd5e1; }
  .ba-pinfo { font-size:12px; color:#64748b; font-weight:500; margin-left:8px; }

  .ba-prog-track { height:7px; background:#f1f5f9; border-radius:99px; overflow:hidden; }
  .ba-prog-fill { height:100%; border-radius:99px; }

  .ba-modal-ov { position:fixed; inset:0; background:rgba(15,23,42,0.5); display:flex; align-items:center; justify-content:center; z-index:1000; backdrop-filter:blur(4px); }
  .ba-modal { background:#fff; border-radius:16px; width:90%; max-width:560px; max-height:80vh; box-shadow:0 20px 60px rgba(15,23,42,0.25); display:flex; flex-direction:column; overflow:hidden; }
  .ba-mhead { display:flex; justify-content:space-between; align-items:center; padding:18px 22px; border-bottom:1.5px solid #f1f5f9; }
  .ba-mtitle { font-size:15px; font-weight:800; color:#0f172a; margin:0; }
  .ba-mclose { background:#f8fafc; border:1.5px solid #e2e8f0; border-radius:8px; width:32px; height:32px; display:flex; align-items:center; justify-content:center; cursor:pointer; color:#64748b; transition:all 0.18s; }
  .ba-mclose:hover { background:#fef2f2; border-color:#fca5a5; color:#ef4444; }
  .ba-mbody { overflow-y:auto; flex:1; }
  .ba-modaltable { width:100%; border-collapse:collapse; font-size:13px; }
  .ba-modaltable th { background:#f8fafc; padding:11px 18px; text-align:left; font-weight:700; color:#475569; font-size:11px; text-transform:uppercase; letter-spacing:0.04em; border-bottom:1.5px solid #f1f5f9; position:sticky; top:0; }
  .ba-modaltable td { padding:12px 18px; border-bottom:1px solid #f1f5f9; color:#334155; font-weight:500; }
  .ba-modaltable tbody tr:hover td { background:#f8fafc; }
`;

/* ─────────────────── Helpers ─────────────────── */
function fmtNum(n) {
  if (n >= 1_000_000) return (n / 1_000_000).toFixed(1) + 'M';
  if (n >= 1_000) return n.toLocaleString('en-IN');
  return String(n);
}

function StatusBadge({ status }) {
  const map = {
    Completed: { cls: 'ba-badge ba-bc', dot: '#22c55e' },
    Pending:   { cls: 'ba-badge ba-bp', dot: '#f59e0b' },
    Cancelled: { cls: 'ba-badge ba-bx', dot: '#ef4444' },
  };
  const s = map[status] || { cls: 'ba-badge', dot: '#94a3b8' };
  return (
    <span className={s.cls}>
      <span className="ba-bdot" style={{ background: s.dot }} />
      {status}
    </span>
  );
}

function DonutCenter({ viewBox, value, label }) {
  const { cx, cy } = viewBox;
  return (
    <g>
      <text x={cx} y={cy - 6}  textAnchor="middle" fill="#0f172a" fontSize={16} fontWeight={800} fontFamily="Inter,sans-serif">{value}</text>
      <text x={cx} y={cy + 10} textAnchor="middle" fill="#94a3b8" fontSize={9}  fontWeight={600} fontFamily="Inter,sans-serif">{label}</text>
    </g>
  );
}

function ChartTip({ active, payload, label }) {
  if (!active || !payload?.length) return null;
  return (
    <div style={{ background: '#0f172a', borderRadius: 10, padding: '10px 14px', fontSize: 11.5, boxShadow: '0 8px 24px rgba(0,0,0,0.25)' }}>
      <div style={{ color: '#94a3b8', fontWeight: 700, marginBottom: 8 }}>{label}</div>
      {payload.map(p => (
        <div key={p.name} style={{ display: 'flex', alignItems: 'center', gap: 7, marginBottom: 4 }}>
          <span style={{ width: 8, height: 8, borderRadius: '50%', background: p.color, display: 'inline-block' }} />
          <span style={{ color: '#94a3b8' }}>{p.name}</span>
          <strong style={{ color: '#fff', marginLeft: 'auto', paddingLeft: 8 }}>{fmtNum(p.value)}</strong>
        </div>
      ))}
    </div>
  );
}

/* ─────────────────── Main Component ─────────────────── */
export default function BookingAnalytics({ activeTab = 'Bookings Dashboard' }) {
  const { addToast } = useToast();
  const [period, setPeriod]             = useState('Monthly');
  const [chartFreq, setChartFreq]       = useState('Daily');
  const [viewAllModal, setViewAllModal] = useState(null);
  const [filterTrigger, setFilterTrigger] = useState(0);
  const [currentPage, setCurrentPage]   = useState(1);

  const m = filterTrigger === 0 ? 1 : 1 + ((filterTrigger % 5) * 0.15);

  const topKpis = [
    { label: 'Total Bookings',     value: Math.floor(3220 * m),   trendUp: true,  trend: '18.6', sub: 'vs Apr 2026',   icon: CalendarCheck, ic: '#3b82f6', ib: '#eff6ff' },
    { label: 'Completed Bookings', value: Math.floor(2450 * m),   trendUp: true,  trend: '12.5', sub: 'vs Apr 2026',   icon: CheckCircle,   ic: '#10b981', ib: '#ecfdf5' },
    { label: 'Pending Bookings',   value: Math.floor(620 * m),    trendUp: false, trend: '5.8',  sub: 'vs Apr 2026',   icon: Clock,         ic: '#f59e0b', ib: '#fffbeb' },
    { label: 'Cancelled Bookings', value: Math.floor(150 * m),    trendUp: null,  trend: null,   sub: '4.7% of total', icon: XCircle,       ic: '#ef4444', ib: '#fef2f2' },
    { label: 'Total Revenue',      value: Math.floor(105000 * m), trendUp: true,  trend: '22.4', sub: 'vs Apr 2026',   icon: DollarSign,    ic: '#8b5cf6', ib: '#f5f3ff', rupee: true },
    { label: 'Total Customers',    value: Math.floor(8642 * m),   trendUp: true,  trend: '15.2', sub: 'vs Apr 2026',   icon: Users,         ic: '#3b82f6', ib: '#eff6ff' },
    { label: 'Assigned Bookings',  value: Math.floor(2150 * m),   trendUp: null,  trend: null,   sub: '66.8% of total',icon: User,          ic: '#10b981', ib: '#ecfdf5' },
    { label: 'Booking Partners',   isCustom: true,                                                                      icon: Briefcase,     ic: '#f59e0b', ib: '#fffbeb' },
  ];

  const subKpis = [
    { label: 'Home Services',  value: Math.floor(1450 * m), sub: '45.0% of total', pend: Math.floor(450 * m), pPct: '31.0%', icon: CalendarCheck, ic: '#3b82f6', ib: '#eff6ff' },
    { label: 'Beauty & Salon', value: Math.floor(950 * m),  sub: '29.5% of total', pend: Math.floor(210 * m), pPct: '22.1%', icon: User,          ic: '#ec4899', ib: '#fdf2f8' },
    { label: 'Cleaning',       value: Math.floor(820 * m),  sub: '25.5% of total', pend: Math.floor(160 * m), pPct: '19.5%', icon: Briefcase,     ic: '#10b981', ib: '#ecfdf5' },
  ];

  const dynCat    = categoryDist.map(k => ({ ...k, value: Math.floor(k.value * m) }));
  const dynStat   = statusDist.map(k   => ({ ...k, value: Math.floor(k.value * m) }));
  const dynPay    = paymentDist.map(k  => ({ ...k, value: Math.floor(k.value * m) }));
  const dynSP     = servicePerformance.map(r => ({ ...r, total: Math.floor(r.total * m), completed: Math.floor(r.completed * m), revenue: Math.floor(r.revenue * m) }));
  const dynBP     = bookingsPerformance.map(c => ({ ...c, userBookings: Math.floor(c.userBookings * m), partnerBookings: Math.floor(c.partnerBookings * m), total: Math.floor(c.total * m) }));
  const dynU      = topPerformerUsers.map(u    => ({ ...u, bookings: Math.floor(u.bookings * m) }));
  const dynP      = topPerformerPartners.map(u => ({ ...u, bookings: Math.floor(u.bookings * m) }));
  const dynS      = topPerformerServices.map(u => ({ ...u, uBookings: Math.floor(u.uBookings * m), pBookings: Math.floor(u.pBookings * m), tBookings: Math.floor(u.tBookings * m) }));

  const chartW = [{ day: 'Week 1', total: 420, completed: 320, pending: 100 },{ day: 'Week 2', total: 560, completed: 430, pending: 130 },{ day: 'Week 3', total: 780, completed: 620, pending: 160 },{ day: 'Week 4', total: 920, completed: 750, pending: 170 }];
  const chartM = [{ day: 'Jan', total: 2100, completed: 1600, pending: 500 },{ day: 'Feb', total: 2400, completed: 1850, pending: 550 },{ day: 'Mar', total: 2800, completed: 2200, pending: 600 },{ day: 'Apr', total: 3100, completed: 2450, pending: 650 },{ day: 'May', total: 3220, completed: 2450, pending: 620 }];
  const dynChart = (chartFreq === 'Weekly' ? chartW : chartFreq === 'Monthly' ? chartM : bookingsOverTime).map(d => ({ ...d, total: Math.floor(d.total * m), completed: Math.floor(d.completed * m), pending: Math.floor(d.pending * m) }));

  return (
    <AdminShell activeTab={activeTab} headerTitle="Bookings Dashboard" searchPlaceholder="Search pages, modules...">
      <style>{CSS}</style>
      <div className="ba-root">

        {/* ── Filter Bar ── */}
        <div className="ba-filter-card">
          <div className="ba-filter-row">
            {[['State',['All States','Maharashtra','Karnataka','Tamil Nadu','Delhi'],130],['City',['All Cities','Mumbai','Bengaluru','Chennai','Hyderabad'],130],['District',['All Districts','Andheri','Koramangala','T. Nagar'],140]].map(([lbl,opts,w]) => (
              <div key={lbl}>
                <span className="ba-flabel">{lbl}</span>
                <div className="ba-swrap" style={{ minWidth: w }}>
                  <select className="ba-sel">{opts.map(o => <option key={o}>{o}</option>)}</select>
                  <ChevronDown size={14} className="ba-sarrow" />
                </div>
              </div>
            ))}
            <div>
              <span className="ba-flabel" style={{ opacity: 0 }}>.</span>
              <div className="ba-period-group">
                {['Daily','Weekly','Monthly','Yearly'].map(p => <button key={p} className={`ba-period-btn${period === p ? ' active' : ''}`} onClick={() => setPeriod(p)}>{p}</button>)}
              </div>
            </div>
            {[['Month',['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'],90],['Year',['2026','2025','2024','2023'],85]].map(([lbl,opts,w]) => (
              <div key={lbl}>
                <span className="ba-flabel">{lbl}</span>
                <div className="ba-swrap" style={{ minWidth: w }}>
                  <select className="ba-sel">{opts.map(o => <option key={o}>{o}</option>)}</select>
                  <ChevronDown size={14} className="ba-sarrow" />
                </div>
              </div>
            ))}
            <div style={{ marginLeft: 'auto', display: 'flex', gap: 8, alignItems: 'flex-end' }}>
              <span className="ba-flabel" style={{ opacity: 0 }}>.</span>
              <button className="ba-apply" onClick={() => { setFilterTrigger(p => p + 1); addToast('Filters applied', 'success'); }}>Apply</button>
              <button className="ba-reset" onClick={() => { setPeriod('Monthly'); setFilterTrigger(0); addToast('Filters reset', 'info'); }}>Reset</button>
            </div>
          </div>
          <div className="ba-filter-row">
            {[['Booking Category',['All','Home Services','Beauty & Salon','Cleaning'],180],['Payment Status',['All','Paid Online','Cash on Delivery'],175],['Service Type',['All','Deep Cleaning','AC Repair','Plumbing'],175],['Booking Status',['All','Completed','Pending','Cancelled'],165]].map(([lbl,opts,w]) => (
              <div key={lbl}>
                <span className="ba-flabel">{lbl}</span>
                <div className="ba-swrap" style={{ minWidth: w }}>
                  <select className="ba-sel">{opts.map(o => <option key={o}>{o}</option>)}</select>
                  <ChevronDown size={14} className="ba-sarrow" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── KPI Grid ── */}
        <div className="ba-kpi-grid">
          {topKpis.map((k, i) => {
            const Icon = k.icon;
            return (
              <div key={i} className="ba-kpi-card">
                <div className="ba-kpi-top">
                  <div className="ba-kpi-icon" style={{ background: k.ib }}>
                    <Icon size={20} color={k.ic} strokeWidth={2.2} />
                  </div>
                  <div className="ba-kpi-lbl">{k.label}</div>
                </div>
                {!k.isCustom ? (
                  <>
                    <div className="ba-kpi-val">{k.rupee ? '₹' : ''}{fmtNum(k.value)}</div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                      {k.trendUp !== null && (
                        <span className={`ba-kpi-trend ${k.trendUp ? 'up' : 'down'}`}>
                          {k.trendUp ? <TrendingUp size={12} strokeWidth={2.5} /> : <TrendingDown size={12} strokeWidth={2.5} />}
                          {k.trend}%
                        </span>
                      )}
                      <span className="ba-kpi-tsub">{k.sub}</span>
                    </div>
                  </>
                ) : (
                  <div style={{ marginTop: 4 }}>
                    <div className="ba-kpi-custom-row"><span className="ba-kpi-clbl">User Bookings</span><span className="ba-kpi-cval">{fmtNum(Math.floor(6125 * m))} <span className="ba-kpi-cpct">(70.8%)</span></span></div>
                    <div className="ba-kpi-custom-row"><span className="ba-kpi-clbl">Partner Bookings</span><span className="ba-kpi-cval">{fmtNum(Math.floor(2517 * m))} <span className="ba-kpi-cpct">(29.2%)</span></span></div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* ── Sub KPI Row ── */}
        <div className="ba-sub-row">
          {subKpis.map((k, i) => {
            const Icon = k.icon;
            return (
              <div key={i} className="ba-sub-card">
                <div className="ba-sub-icon" style={{ background: k.ib }}><Icon size={18} color={k.ic} strokeWidth={2.2} /></div>
                <div style={{ flex: 1 }}>
                  <div className="ba-sub-lbl">{k.label}</div>
                  <div className="ba-sub-val">{fmtNum(k.value)}</div>
                  <div className="ba-sub-sub">{k.sub}</div>
                </div>
                <div className="ba-sub-div" />
                <div className="ba-sub-right">
                  <div className="ba-sub-plbl">Pending</div>
                  <div className="ba-sub-pval">{fmtNum(k.pend)}</div>
                  <div className="ba-sub-psub">({k.pPct} of total)</div>
                </div>
              </div>
            );
          })}
        </div>

        {/* ── Top Performer Statistics ── */}
        <div style={{ marginBottom: 18 }}>
          <h3 style={{ fontSize: 15, fontWeight: 800, color: '#0f172a', margin: '0 0 14px', letterSpacing: '-0.2px' }}>Top Performer Statistics</h3>
          <div className="ba-perf-row">
            {[
              { title: 'Top Booking Customers', icon: User, iconBg: '#dcfce7', iconColor: '#22c55e', type: 'users', data: dynU, cols: ['Rank','Customer Name','Bookings'], rows: u => [<span className="ba-rank">{u.rank}</span>, <span style={{ fontWeight: 600, color: '#0f172a' }}>{u.name}</span>, <span style={{ fontWeight: 800, color: '#2563eb' }}>{u.bookings}</span>] },
              { title: 'Top Service Partners',   icon: Briefcase, iconBg: '#ede9fe', iconColor: '#8b5cf6', type: 'partners', data: dynP, cols: ['Rank','Partner Name','Bookings'], rows: u => [<span className="ba-rank">{u.rank}</span>, <span style={{ fontWeight: 600, color: '#0f172a' }}>{u.name}</span>, <span style={{ fontWeight: 800, color: '#2563eb' }}>{u.bookings}</span>] },
              { title: 'Top Services',           icon: Star, iconBg: '#ffedd5', iconColor: '#f59e0b', type: 'services', data: dynS, cols: ['Rank','Service Name','User Bkgs'], rows: u => [<span className="ba-rank">{u.rank}</span>, <span style={{ fontWeight: 600, color: '#0f172a' }}>{u.name}</span>, <span style={{ fontWeight: 800, color: '#2563eb' }}>{u.uBookings}</span>] },
            ].map(({ title, icon: Ic, iconBg, iconColor, type, data, cols, rows }) => (
              <div key={type} className="ba-perf-card">
                <div className="ba-perf-head">
                  <div className="ba-perf-title">
                    <div className="ba-perf-icon" style={{ background: iconBg }}><Ic size={13} color={iconColor} /></div>
                    {title}
                  </div>
                  <button className="ba-view-all" onClick={() => setViewAllModal({ type, title })}>View All</button>
                </div>
                <table className="ba-ptable">
                  <thead><tr>{cols.map((c, ci) => <th key={ci} style={ci === cols.length - 1 ? { textAlign: 'right' } : {}}>{c}</th>)}</tr></thead>
                  <tbody>
                    {data.map((u, ui) => {
                      const r = rows(u);
                      return (
                        <tr key={ui}>
                          {r.map((cell, ci) => <td key={ci} style={ci === r.length - 1 ? { textAlign: 'right' } : {}}>{cell}</td>)}
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            ))}
          </div>
        </div>

        {/* ── Charts Row ── */}
        <div className="ba-charts-row">
          {/* Line Chart */}
          <div className="ba-card">
            <div className="ba-card-head">
              <h2 className="ba-card-title">Bookings Over Time</h2>
              <div className="ba-freq-btns">
                {['Daily','Weekly','Monthly'].map(f => <button key={f} className={`ba-freq-btn${chartFreq === f ? ' active' : ''}`} onClick={() => setChartFreq(f)}>{f}</button>)}
              </div>
            </div>
            <div style={{ height: 240, padding: '8px 10px 8px 0' }}>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={dynChart} margin={{ top: 8, right: 10, left: -22, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="4 4" stroke="#f1f5f9" vertical={false} />
                  <XAxis dataKey="day" tick={{ fontSize: 10.5, fill: '#94a3b8', fontWeight: 600 }} axisLine={false} tickLine={false} dy={8} />
                  <YAxis tick={{ fontSize: 10.5, fill: '#94a3b8', fontWeight: 600 }} axisLine={false} tickLine={false} tickFormatter={v => v >= 1000 ? (v / 1000) + 'K' : v} />
                  <Tooltip content={<ChartTip />} />
                  <Legend iconType="circle" iconSize={8} wrapperStyle={{ fontSize: 11.5, paddingTop: 10, fontWeight: 600, color: '#475569' }} />
                  <Line type="monotone" dataKey="total"     name="Total Bookings" stroke="#3b82f6" strokeWidth={2.5} dot={false} activeDot={{ r: 5, strokeWidth: 0 }} />
                  <Line type="monotone" dataKey="completed" name="Completed"       stroke="#10b981" strokeWidth={2.5} dot={false} activeDot={{ r: 5, strokeWidth: 0 }} />
                  <Line type="monotone" dataKey="pending"   name="Pending"         stroke="#f59e0b" strokeWidth={2.5} dot={false} activeDot={{ r: 5, strokeWidth: 0 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Booking Status Donut */}
          <div className="ba-card" style={{ display: 'flex', flexDirection: 'column' }}>
            <div className="ba-card-head"><h2 className="ba-card-title">Booking Status</h2></div>
            <div className="ba-donut-body">
              <PieChart width={160} height={160}>
                <Pie data={dynStat} cx={80} cy={80} innerRadius={50} outerRadius={78} paddingAngle={2} dataKey="value" startAngle={90} endAngle={-270}>
                  {dynStat.map((e, i) => <Cell key={i} fill={e.color} />)}
                  <DonutCenter viewBox={{ cx: 80, cy: 80 }} value={fmtNum(Math.floor(3220 * m))} label="Total" />
                </Pie>
                <Tooltip formatter={v => fmtNum(v)} />
              </PieChart>
              <div style={{ width: '100%' }}>
                {dynStat.map((item, i) => (
                  <div key={i} className="ba-dleg-row">
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <span className="ba-ddot" style={{ background: item.color }} />
                      <span className="ba-dname">{item.name}</span>
                    </div>
                    <span className="ba-dval">{fmtNum(item.value)} <span className="ba-dpct">({item.pct})</span></span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Payment Method Donut */}
          <div className="ba-card" style={{ display: 'flex', flexDirection: 'column' }}>
            <div className="ba-card-head"><h2 className="ba-card-title">Payment Method</h2></div>
            <div className="ba-donut-body">
              <PieChart width={160} height={160}>
                <Pie data={dynPay} cx={80} cy={80} innerRadius={50} outerRadius={78} paddingAngle={2} dataKey="value" startAngle={90} endAngle={-270}>
                  {dynPay.map((e, i) => <Cell key={i} fill={e.color} />)}
                  <DonutCenter viewBox={{ cx: 80, cy: 80 }} value={fmtNum(Math.floor(3220 * m))} label="Total" />
                </Pie>
                <Tooltip formatter={v => fmtNum(v)} />
              </PieChart>
              <div style={{ width: '100%' }}>
                {dynPay.map((item, i) => (
                  <div key={i} className="ba-dleg-row">
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <span className="ba-ddot" style={{ background: item.color }} />
                      <span className="ba-dname">{item.name}</span>
                    </div>
                    <span className="ba-dval">{fmtNum(item.value)} <span className="ba-dpct">({item.pct})</span></span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ── Bottom Row ── */}
        <div className="ba-bottom-row">
          {/* Service Performance */}
          <div className="ba-card">
            <div className="ba-card-head"><h2 className="ba-card-title">Service Performance</h2></div>
            <table className="ba-sptable">
              <thead>
                <tr>
                  <th style={{ paddingLeft: 20 }}>Service Type</th>
                  <th style={{ textAlign: 'center' }}>Total Bookings</th>
                  <th style={{ textAlign: 'center' }}>Completed</th>
                  <th style={{ textAlign: 'center' }}>Revenue</th>
                  <th style={{ paddingRight: 20 }}>% Share</th>
                </tr>
              </thead>
              <tbody>
                {dynSP.map(r => (
                  <tr key={r.type}>
                    <td style={{ paddingLeft: 20 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <span style={{ width: 9, height: 9, borderRadius: '50%', background: r.color, flexShrink: 0 }} />
                        <span style={{ fontWeight: 700, color: '#0f172a' }}>{r.type}</span>
                      </div>
                    </td>
                    <td style={{ textAlign: 'center', fontWeight: 700 }}>{fmtNum(r.total)}</td>
                    <td style={{ textAlign: 'center', fontWeight: 600, color: '#10b981' }}>{fmtNum(r.completed)}</td>
                    <td style={{ textAlign: 'center', fontWeight: 700, color: '#2563eb' }}>₹{fmtNum(r.revenue)}</td>
                    <td style={{ paddingRight: 20 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                        <div className="ba-prog-track" style={{ flex: 1 }}>
                          <div className="ba-prog-fill" style={{ width: `${r.pct}%`, background: r.color }} />
                        </div>
                        <span style={{ fontSize: 12, fontWeight: 700, color: '#0f172a', minWidth: 40, textAlign: 'right' }}>{r.pct.toFixed(1)}%</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Upcoming Bookings */}
          <div className="ba-card">
            <div className="ba-card-head">
              <h2 className="ba-card-title">Upcoming Bookings</h2>
              <button className="ba-view-all">View All</button>
            </div>
            <table className="ba-uptable">
              <thead>
                <tr>
                  <th style={{ paddingLeft: 18 }}>Booking ID</th>
                  <th>Scheduled On</th>
                  <th>Booked By</th>
                  <th style={{ paddingRight: 18 }}>Days Left</th>
                </tr>
              </thead>
              <tbody>
                {upcomingBookings.map(c => (
                  <tr key={c.id}>
                    <td style={{ fontWeight: 700, color: '#2563eb', paddingLeft: 18 }}>{c.id}</td>
                    <td style={{ color: '#64748b' }}>{c.expires}</td>
                    <td style={{ fontWeight: 600, color: '#0f172a' }}>{c.generatedBy}</td>
                    <td style={{ paddingRight: 18 }}>
                      <span style={{ display: 'inline-flex', alignItems: 'center', background: c.danger ? '#fef2f2' : '#f0fdf4', color: c.danger ? '#ef4444' : '#10b981', border: `1.5px solid ${c.danger ? '#fecaca' : '#bbf7d0'}`, borderRadius: 20, padding: '3px 10px', fontSize: 11.5, fontWeight: 700 }}>
                        {c.daysLeft} days
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* ── Bookings Performance Table ── */}
        <div className="ba-card">
          <div className="ba-card-head"><h2 className="ba-card-title">Bookings Performance</h2></div>
          <div className="ba-mtable-wrap">
            <table className="ba-mtable">
              <thead>
                <tr>
                  <th style={{ paddingLeft: 18 }}>Booking ID</th>
                  <th>Booked By</th>
                  <th>Customer Name</th>
                  <th>Category</th>
                  <th>Status</th>
                  <th style={{ textAlign: 'center' }}>User Bkgs</th>
                  <th style={{ textAlign: 'center' }}>Partner Bkgs</th>
                  <th style={{ textAlign: 'center' }}>Total</th>
                  <th>Service</th>
                  <th>Amount</th>
                  <th>Scheduled On</th>
                  <th>Created On</th>
                  <th style={{ textAlign: 'center', paddingRight: 18 }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {dynBP.map((r, i) => (
                  <tr key={i}>
                    <td style={{ fontWeight: 700, color: '#2563eb', paddingLeft: 18 }}>{r.id}</td>
                    <td style={{ fontWeight: 600 }}>{r.genBy}</td>
                    <td style={{ fontWeight: 600, color: '#0f172a' }}>{r.name}</td>
                    <td style={{ color: '#475569' }}>{r.category}</td>
                    <td><StatusBadge status={r.status} /></td>
                    <td style={{ textAlign: 'center', fontWeight: 700 }}>{r.userBookings}</td>
                    <td style={{ textAlign: 'center', fontWeight: 700 }}>{r.partnerBookings}</td>
                    <td style={{ textAlign: 'center', fontWeight: 800, color: '#0f172a' }}>{r.total}</td>
                    <td style={{ color: '#475569' }}>{r.service}</td>
                    <td style={{ fontWeight: 700, color: '#0f172a' }}>₹{r.amount}</td>
                    <td style={{ color: '#64748b' }}>{r.expires}</td>
                    <td style={{ color: '#64748b' }}>{r.created}</td>
                    <td style={{ textAlign: 'center', paddingRight: 18 }}>
                      <button className="ba-act-btn" title="View"><Eye size={14} /></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="ba-pagi">
            <button className="ba-pbtn" onClick={() => setCurrentPage(p => Math.max(1, p - 1))}><ChevronLeft size={13} /></button>
            {[1,2,3,'...',5].map((p, i) => (
              <button key={i} className={`ba-pbtn${p === currentPage ? ' active' : ''}`} onClick={() => typeof p === 'number' && setCurrentPage(p)}>{p}</button>
            ))}
            <button className="ba-pbtn" onClick={() => setCurrentPage(p => Math.min(5, p + 1))}><ChevronRight size={13} /></button>
            <span className="ba-pinfo">257 total pages</span>
          </div>
        </div>
      </div>

      {/* ── View All Modal ── */}
      {viewAllModal && (
        <div className="ba-modal-ov" onClick={() => setViewAllModal(null)}>
          <div className="ba-modal" onClick={e => e.stopPropagation()}>
            <div className="ba-mhead">
              <h3 className="ba-mtitle">{viewAllModal.title}</h3>
              <button className="ba-mclose" onClick={() => setViewAllModal(null)}><XCircle size={16} /></button>
            </div>
            <div className="ba-mbody">
              <table className="ba-modaltable">
                {viewAllModal.type === 'users' && (<><thead><tr><th>Rank</th><th>Customer Name</th><th>Bookings</th></tr></thead><tbody>{dynU.map(u => (<tr key={u.rank}><td>{u.rank}</td><td style={{ fontWeight: 600, color: '#2563eb' }}>{u.name}</td><td style={{ fontWeight: 700 }}>{u.bookings}</td></tr>))}</tbody></>)}
                {viewAllModal.type === 'partners' && (<><thead><tr><th>Rank</th><th>Partner Name</th><th>Bookings</th></tr></thead><tbody>{dynP.map(u => (<tr key={u.rank}><td>{u.rank}</td><td style={{ fontWeight: 600, color: '#7c3aed' }}>{u.name}</td><td style={{ fontWeight: 700 }}>{u.bookings}</td></tr>))}</tbody></>)}
                {viewAllModal.type === 'services' && (<><thead><tr><th>Rank</th><th>Service Name</th><th>User Bkgs</th><th>Partner Bkgs</th><th>Total</th></tr></thead><tbody>{dynS.map(u => (<tr key={u.rank}><td>{u.rank}</td><td style={{ fontWeight: 600 }}>{u.name}</td><td>{u.uBookings}</td><td>{u.pBookings}</td><td style={{ fontWeight: 700 }}>{u.tBookings}</td></tr>))}</tbody></>)}
              </table>
            </div>
          </div>
        </div>
      )}
    </AdminShell>
  );
}
