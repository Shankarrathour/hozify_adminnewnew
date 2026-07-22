import React, { useState } from 'react';
import {
  Layers, CheckCircle2, Clock, PlusCircle, XCircle, AlertCircle,
  Tag, Grid3x3, Sliders, DollarSign, Star, TrendingUp, ChevronDown,
  ChevronLeft, ChevronRight, Search, Download, Eye, Settings, RefreshCw,
  BarChart2, Pause, Activity, X
} from 'lucide-react';
import AdminShell from '../../components/layouts/AdminShell';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip,
  Legend, ResponsiveContainer
} from 'recharts';

/* ═══════════════════════════ MOCK DATA ═══════════════════════════ */

const KPI = [
  { label: 'Total Services',      value: 1248, trend: 9.5,  up: true,  icon: Layers,      color: '#3b82f6', bg: '#eff6ff' },
  { label: 'Active Services',     value: 986,  trend: 10.7, up: true,  icon: CheckCircle2,color: '#10b981', bg: '#ecfdf5' },
  { label: 'New Services',        value: 156,  trend: 13.3, up: true,  icon: PlusCircle,  color: '#8b5cf6', bg: '#f3e8ff' },
  { label: 'Inactive Services',   value: 132,  trend: 8.7,  up: false, icon: Pause,       color: '#f59e0b', bg: '#fffbeb' },
  { label: 'Discontinued Services',value:58,   trend: 13.2, up: false, icon: XCircle,     color: '#ef4444', bg: '#fef2f2' },
  { label: 'Total Categories',    value: 12,   trend: 9.1,  up: true,  icon: Grid3x3,     color: '#0ea5e9', bg: '#e0f2fe' },
  { label: 'Total Sub Categories',value: 48,   trend: 8.2,  up: true,  icon: Tag,         color: '#10b981', bg: '#ecfdf5' },
  { label: 'Total Attributes',    value: 218,  trend: 11.6, up: true,  icon: Sliders,     color: '#6366f1', bg: '#e0e7ff' },
  { label: 'Avg. Service Price',  value: '₹1,245', trend: 6.4, up: false, icon: DollarSign, color: '#f59e0b', bg: '#fffbeb', isCurrency: true },
  { label: 'Services with Pricing',value: 932, trend: 10.2, up: true,  icon: Activity,    color: '#ec4899', bg: '#fdf2f8' },
];

const PERFORMANCE = [
  { label: 'Avg. Completion Rate', value: 92.6, color: '#10b981', icon: CheckCircle2, trend: 3.2, up: true },
  { label: 'On-Time Completion',   value: 90.2, color: '#3b82f6', icon: Clock,        trend: 4.2, up: false },
  { label: 'Customer Satisfaction',value: 4.6,  color: '#f59e0b', icon: Star,         trend: 0.3, up: true, outOf: 5 },
  { label: 'Rework Rate',          value: 3.8,  color: '#ef4444', icon: RefreshCw,    trend: 0.6, up: false },
];

const TOP_SERVICES = [
  { name: 'AC Installation',   bookings: 1256, pct: 100, color: '#3b82f6' },
  { name: 'Plumbing Repair',   bookings: 967,  pct: 77,  color: '#10b981' },
  { name: 'Cleaning Services', bookings: 876,  pct: 70,  color: '#8b5cf6' },
  { name: 'Appliance Repair',  bookings: 765,  pct: 61,  color: '#f59e0b' },
  { name: 'Electrical Repair', bookings: 654,  pct: 52,  color: '#ef4444' },
];

const TRENDING_DATA = [
  { month: 'Jan', ac: 800, plumbing: 600, cleaning: 500, appliance: 400, electrical: 300 },
  { month: 'Feb', ac: 950, plumbing: 700, cleaning: 550, appliance: 500, electrical: 400 },
  { month: 'Mar', ac: 1100,plumbing: 750, cleaning: 600, appliance: 520, electrical: 420 },
  { month: 'Apr', ac: 1000,plumbing: 800, cleaning: 650, appliance: 480, electrical: 390 },
  { month: 'May', ac: 1200,plumbing: 850, cleaning: 700, appliance: 600, electrical: 450 },
  { month: 'Jun', ac: 1250,plumbing: 970, cleaning: 780, appliance: 650, electrical: 500 },
];

const USER_RATINGS = [
  { name: 'AC Installation',   rating: 4.8, total: 12856 },
  { name: 'Plumbing Repair',   rating: 4.6, total: 9875 },
  { name: 'Cleaning Services', rating: 4.6, total: 8743 },
  { name: 'Appliance Repair',  rating: 4.5, total: 7654 },
  { name: 'Electrical Repair', rating: 4.4, total: 6543 },
];

const CATEGORY_DATA = [
  { name: 'Home Services', value: 332, color: '#3b82f6' },
  { name: 'Electrical',    value: 248, color: '#ef4444' },
  { name: 'Plumbing',      value: 198, color: '#10b981' },
  { name: 'Cleaning',      value: 154, color: '#8b5cf6' },
  { name: 'Appliance',     value: 120, color: '#f59e0b' },
  { name: 'Agriculture',   value: 98,  color: '#0ea5e9' },
  { name: 'Salon & Spa',   value: 62,  color: '#ec4899' },
  { name: 'Others',        value: 52,  color: '#94a3b8' },
];

const STATUS_DATA = [
  { name: 'Active',        value: 986, color: '#10b981' },
  { name: 'Inactive',      value: 132, color: '#f59e0b' },
  { name: 'Discontinued',  value: 58,  color: '#ef4444' },
  { name: 'Under Review',  value: 32,  color: '#3b82f6' },
  { name: 'Draft',         value: 40,  color: '#94a3b8' },
];

const PAYMENT_DATA = [
  { name: 'UPI',         value: 498, color: '#3b82f6' },
  { name: 'Credit Card', value: 286, color: '#8b5cf6' },
  { name: 'Net Banking', value: 212, color: '#f59e0b' },
  { name: 'Wallet',      value: 158, color: '#10b981' },
  { name: 'Cash',        value: 96,  color: '#ef4444' },
];

const TOP_LEVEL = [
  { name: 'AC Installation',   completion: 95.4, ontime: 92.1, rating: 4.7 },
  { name: 'Plumbing Repair',   completion: 94.1, ontime: 81.3, rating: 4.6 },
  { name: 'Cleaning Services', completion: 94.5, ontime: 82.8, rating: 4.6 },
  { name: 'Appliance Repair',  completion: 91.2, ontime: 80.0, rating: 4.5 },
  { name: 'Electrical Repair', completion: 90.1, ontime: 86.7, rating: 4.4 },
];

const SP_SERVICES = [
  { name: 'AC Installation',   count: 325 },
  { name: 'Plumbing Repair',   count: 278 },
  { name: 'Electrical Repair', count: 242 },
  { name: 'Cleaning Services', count: 198 },
  { name: 'Appliance Repair',  count: 176 },
];

const SELLER_SERVICES = [
  { name: 'Hardware & Tools',    count: 156 },
  { name: 'Electrical Materials',count: 132 },
  { name: 'Plumbing Materials',  count: 118 },
  { name: 'Cleaning Supplies',   count: 96 },
  { name: 'Appliance Spares',    count: 84 },
];

const RECENT_SERVICES = [
  { id: 'SRV20527501', name: 'AC Installation',   cat: 'Home Services', subcat: 'AC Services',         created: '27 May 2026', status: 'Active' },
  { id: 'SRV20527502', name: 'Plumbing Repair',   cat: 'Home Services', subcat: 'Plumbing Services',   created: '27 May 2026', status: 'Active' },
  { id: 'SRV20527503', name: 'Cleaning Services', cat: 'Home Services', subcat: 'Deep Cleaning',        created: '26 May 2026', status: 'Inactive' },
  { id: 'SRV20527504', name: 'Appliance Repair',  cat: 'Home Services', subcat: 'Refrigerator Repair',  created: '26 May 2026', status: 'Active' },
  { id: 'SRV20527505', name: 'Electrical Repair', cat: 'Home Services', subcat: 'Wiring & Fitting',     created: '25 May 2026', status: 'Active' },
];

/* ════════════════════════════ CSS ════════════════════════════ */
const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');

  .sd-root { font-family:'Inter',sans-serif; background:#f8fafc; padding-bottom:28px; }

  /* ── FILTER ── */
  .sd-filter { background:#fff; border:1px solid #e8edf3; border-radius:16px; padding:18px 22px; margin-bottom:18px; box-shadow:0 1px 4px rgba(15,23,42,.04); }
  .sd-filter-row { display:flex; flex-wrap:wrap; gap:14px; align-items:flex-end; }
  .sd-filter-row+.sd-filter-row { margin-top:12px; }
  .sd-flabel { font-size:11px; font-weight:700; color:#64748b; text-transform:uppercase; letter-spacing:.05em; display:block; margin-bottom:5px; }
  .sd-sel-wrap { position:relative; }
  .sd-sel { appearance:none; background:#f8fafc; border:1.5px solid #e2e8f0; border-radius:8px; padding:8px 32px 8px 12px; font-size:12.5px; font-weight:600; color:#1e293b; cursor:pointer; outline:none; font-family:'Inter',sans-serif; transition:border-color .18s; }
  .sd-sel:focus { border-color:#3b82f6; box-shadow:0 0 0 3px rgba(59,130,246,.1); }
  .sd-arr { position:absolute; right:10px; top:50%; transform:translateY(-50%); pointer-events:none; color:#94a3b8; }
  .sd-period { display:flex; background:#f1f5f9; border-radius:9px; padding:3px; gap:2px; border:1.5px solid #e2e8f0; }
  .sd-pbtn { padding:6px 14px; border:none; background:transparent; color:#64748b; font-size:12px; font-weight:600; cursor:pointer; border-radius:7px; transition:all .18s; font-family:'Inter',sans-serif; }
  .sd-pbtn.active { background:#1e293b; color:#fff; box-shadow:0 2px 6px rgba(15,23,42,.2); }
  .sd-pbtn:hover:not(.active) { background:#e2e8f0; }
  .sd-apply { background:#1e293b; color:#fff; border:none; border-radius:8px; padding:8px 22px; font-size:12.5px; font-weight:700; cursor:pointer; transition:all .18s; font-family:'Inter',sans-serif; }
  .sd-apply:hover { background:#0f172a; box-shadow:0 4px 12px rgba(15,23,42,.2); }
  .sd-reset { background:#fff; color:#475569; border:1.5px solid #e2e8f0; border-radius:8px; padding:8px 22px; font-size:12.5px; font-weight:600; cursor:pointer; transition:all .18s; font-family:'Inter',sans-serif; }
  .sd-reset:hover { background:#f8fafc; }

  /* ── KPI GRID ── */
  .sd-kpi-grid { display:grid; grid-template-columns:repeat(5,1fr); gap:14px; margin-bottom:18px; }
  .sd-kpi { background:#fff; border-radius:14px; border:1px solid #e8edf3; padding:14px 16px; box-shadow:0 2px 6px rgba(15,23,42,.04); display:flex; align-items:flex-start; gap:12px; transition:transform .2s,box-shadow .2s; cursor:default; }
  .sd-kpi:hover { transform:translateY(-3px); box-shadow:0 8px 20px rgba(15,23,42,.09); }
  .sd-kpi-ico { width:40px; height:40px; border-radius:11px; display:flex; align-items:center; justify-content:center; flex-shrink:0; }
  .sd-kpi-val { font-size:22px; font-weight:800; color:#0f172a; line-height:1; margin-bottom:3px; }
  .sd-kpi-lbl { font-size:11px; font-weight:700; color:#0f172a; line-height:1.3; margin-bottom:6px; }
  .sd-kpi-t { font-size:10px; font-weight:700; display:inline-flex; align-items:center; gap:2px; }
  .sd-kpi-t.up { color:#16a34a; }
  .sd-kpi-t.dn { color:#dc2626; }
  .sd-kpi-sub { color:#94a3b8; font-weight:500; font-size:10px; margin-left:3px; }

  /* ── CARD BASE ── */
  .sd-card { background:#fff; border-radius:16px; border:1px solid #e8edf3; box-shadow:0 2px 6px rgba(15,23,42,.04); display:flex; flex-direction:column; }
  .sd-card-head { display:flex; justify-content:space-between; align-items:center; padding:14px 18px 12px; border-bottom:1.5px solid #f1f5f9; flex-shrink:0; }
  .sd-card-title { font-size:13.5px; font-weight:800; color:#0f172a; margin:0; }
  .sd-view-all { font-size:11.5px; color:#2563eb; font-weight:700; background:transparent; border:none; cursor:pointer; display:flex; align-items:center; gap:3px; }
  .sd-view-all:hover { text-decoration:underline; }

  /* ── ANALYTICS ROW 1 ── */
  .sd-row1 { display:grid; grid-template-columns:1fr 1fr 1.5fr 1fr; gap:14px; margin-bottom:18px; }

  /* performance */
  .sd-perf-body { padding:14px 18px; display:flex; flex-direction:column; gap:12px; }
  .sd-perf-item { display:flex; align-items:center; gap:10px; padding:8px 10px; border-radius:10px; background:#f8fafc; border:1px solid #f1f5f9; }
  .sd-perf-ico { width:32px; height:32px; border-radius:8px; display:flex; align-items:center; justify-content:center; flex-shrink:0; }
  .sd-perf-val { font-size:17px; font-weight:800; color:#0f172a; }
  .sd-perf-lbl { font-size:10px; font-weight:700; color:#64748b; }

  /* top services */
  .sd-top-body { padding:12px 18px; flex:1; }
  .sd-top-row { display:flex; align-items:center; gap:8px; margin-bottom:10px; }
  .sd-top-rank { width:20px; height:20px; border-radius:5px; display:flex; align-items:center; justify-content:center; font-size:10px; font-weight:800; color:#fff; flex-shrink:0; }
  .sd-top-name { font-size:11.5px; font-weight:700; color:#1e293b; flex:1; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; }
  .sd-top-cnt { font-size:11px; font-weight:700; color:#0f172a; width:40px; text-align:right; }
  .sd-top-bar-wrap { width:90px; height:5px; background:#f1f5f9; border-radius:99px; flex-shrink:0; }
  .sd-top-bar { height:5px; border-radius:99px; }
  .sd-top-foot { font-size:10.5px; color:#94a3b8; font-weight:600; padding-top:8px; border-top:1px solid #f1f5f9; }

  /* trending */
  .sd-trend-body { padding:12px 14px 14px; flex:1; display:flex; flex-direction:column; }

  /* ratings */
  .sd-rat-head-row { display:flex; justify-content:space-between; font-size:10px; font-weight:700; color:#94a3b8; text-transform:uppercase; letter-spacing:.05em; padding:8px 18px; border-bottom:1.5px solid #f1f5f9; }
  .sd-rat-row { display:flex; justify-content:space-between; align-items:center; padding:9px 18px; border-bottom:1px solid #f1f5f9; transition:background .15s; }
  .sd-rat-row:last-child { border-bottom:none; }
  .sd-rat-row:hover { background:#f8fafc; }
  .sd-rat-name { font-size:11.5px; font-weight:700; color:#1e293b; flex:1; }
  .sd-rat-stars { display:flex; align-items:center; gap:3px; color:#f59e0b; font-size:11px; font-weight:700; }
  .sd-rat-total { font-size:11px; font-weight:700; color:#475569; text-align:right; }

  /* ── DONUT ROW ── */
  .sd-row2 { display:grid; grid-template-columns:1fr 1fr 1fr 1.3fr; gap:14px; margin-bottom:18px; }
  .sd-donut-body { padding:16px; display:flex; flex-direction:column; align-items:center; gap:14px; flex:1; }
  .sd-donut-leg { width:100%; }
  .sd-dleg-row { display:flex; align-items:center; justify-content:space-between; padding:3px 0; border-bottom:1px dashed #f1f5f9; font-size:10.5px; }
  .sd-dleg-row:last-child { border-bottom:none; }
  .sd-dot { width:7px; height:7px; border-radius:50%; flex-shrink:0; }
  .sd-dname { color:#334155; font-weight:600; margin-left:6px; flex:1; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; }
  .sd-dval { font-weight:700; color:#0f172a; }
  .sd-dpct { color:#94a3b8; font-weight:500; margin-left:3px; }

  /* top level table */
  .sd-level-body { padding:0; overflow:hidden; }
  .sd-level-scroll { max-height:260px; overflow-y:auto; overflow-x:hidden; }
  .sd-level-table { width:100%; border-collapse:collapse; font-size:11.5px; }
  .sd-level-table th { background:#f8fafc; padding:9px 14px; text-align:left; font-weight:700; color:#64748b; font-size:10px; text-transform:uppercase; letter-spacing:.04em; border-bottom:1.5px solid #e8edf3; white-space:nowrap; position:sticky; top:0; z-index:2; }
  .sd-level-table td { padding:9px 14px; color:#334155; border-bottom:1px solid #f1f5f9; }
  .sd-level-table tbody tr:hover td { background:#f8fafc; }
  .sd-level-table tbody tr:last-child td { border-bottom:none; }
  .sd-prog-wrap { width:60px; height:5px; background:#f1f5f9; border-radius:99px; display:inline-block; margin-left:6px; vertical-align:middle; }
  .sd-prog { height:5px; border-radius:99px; }
  .sd-star-row { display:inline-flex; align-items:center; gap:3px; color:#f59e0b; font-size:11px; font-weight:700; }

  /* ── BOTTOM ROW (Vertical Layout) ── */
  .sd-row3 { display:flex; flex-direction:column; gap:16px; width:100%; }
  .sd-btable-cont { overflow-x:auto; max-height:260px; overflow-y:auto; }
  .sd-btable { width:100%; border-collapse:collapse; font-size:12px; }
  .sd-btable th { background:#f8fafc; padding:9px 14px; text-align:left; font-weight:700; color:#64748b; font-size:10.5px; text-transform:uppercase; letter-spacing:.04em; border-bottom:1.5px solid #e8edf3; white-space:nowrap; position:sticky; top:0; z-index:2; }
  .sd-btable td { padding:10px 14px; color:#334155; border-bottom:1px solid #f1f5f9; font-weight:500; white-space:nowrap; }
  .sd-btable tbody tr:hover td { background:#f8fafc; }
  .sd-btable tbody tr:last-child td { border-bottom:none; }
  .sd-btable-foot { display:flex; align-items:center; justify-content:space-between; padding:10px 14px; border-top:1px solid #f1f5f9; }
  .sd-foot-info { font-size:11px; color:#64748b; font-weight:600; }
  .sd-pagi { display:flex; gap:4px; }
  .sd-ppbtn { width:26px; height:26px; border-radius:6px; border:1.5px solid #e2e8f0; background:#fff; display:inline-flex; align-items:center; justify-content:center; cursor:pointer; font-size:11px; font-weight:700; color:#475569; transition:all .18s; }
  .sd-ppbtn.active { background:#2563eb; color:#fff; border-color:#2563eb; }
  .sd-ppbtn:hover:not(.active) { background:#f1f5f9; }

  /* badges */
  .sd-badge { display:inline-flex; align-items:center; padding:3px 10px; border-radius:20px; font-size:10.5px; font-weight:700; border:1px solid transparent; }
  .sd-b-green { background:#ecfdf5; color:#059669; border-color:#a7f3d0; }
  .sd-b-yellow { background:#fffbeb; color:#d97706; border-color:#fde68a; }
  .sd-b-red { background:#fef2f2; color:#ef4444; border-color:#fecaca; }

  /* recent table */
  .sd-rtable { width:100%; border-collapse:collapse; font-size:11.5px; min-width:750px; }
  .sd-rtable th { background:#f8fafc; padding:9px 12px; text-align:left; font-weight:700; color:#64748b; font-size:10px; text-transform:uppercase; letter-spacing:.04em; border-bottom:1.5px solid #e8edf3; white-space:nowrap; }
  .sd-rtable td { padding:9px 12px; color:#334155; border-bottom:1px solid #f1f5f9; font-weight:500; white-space:nowrap; }
  .sd-rtable tbody tr:hover td { background:#f8fafc; }
  .sd-rtable tbody tr:last-child td { border-bottom:none; }
  .sd-search-bar { display:flex; align-items:center; gap:8px; background:#f8fafc; border:1.5px solid #e2e8f0; border-radius:8px; padding:5px 10px; width:200px; margin:10px 14px 8px; }
  .sd-search-inp { border:none; background:transparent; outline:none; font-size:12px; font-weight:500; font-family:'Inter',sans-serif; width:100%; }

  /* ── Modals ── */
  .sd-modal-overlay {
    position: fixed; top: 0; left: 0; right: 0; bottom: 0;
    background: rgba(15,23,42,0.6); backdrop-filter: blur(4px);
    z-index: 9999; display: flex; justify-content: center; align-items: center;
    padding: 20px;
  }
  .sd-modal-content {
    background: #fff; border-radius: 16px; width: 100%; max-width: 900px;
    max-height: 90vh; display: flex; flex-direction: column;
    box-shadow: 0 20px 25px -5px rgba(0,0,0,0.1), 0 10px 10px -5px rgba(0,0,0,0.04);
  }
  .sd-modal-header {
    padding: 20px 24px; border-bottom: 1px solid #e2e8f0;
    display: flex; justify-content: space-between; align-items: center;
  }
  .sd-modal-title { font-size: 18px; font-weight: 700; color: #0f172a; margin: 0; }
  .sd-modal-close {
    background: #f1f5f9; border: none; width: 32px; height: 32px; border-radius: 50%;
    display: flex; justify-content: center; align-items: center; cursor: pointer;
    color: #64748b; transition: all 0.2s;
  }
  .sd-modal-close:hover { background: #e2e8f0; color: #0f172a; }
  .sd-modal-body {
    padding: 24px; overflow-y: auto; flex: 1;
  }

  @media (max-width:1400px) {
    .sd-kpi-grid { grid-template-columns:repeat(4,1fr); }
    .sd-row1 { grid-template-columns:1fr 1fr; }
    .sd-row2 { grid-template-columns:1fr 1fr; }
    .sd-row3 { display:flex; flex-direction:column; }
  }
  @media (max-width:1024px) {
    .sd-kpi-grid { grid-template-columns:repeat(3,1fr); }
    .sd-row1 { grid-template-columns:1fr; }
    .sd-row2 { grid-template-columns:1fr; }
    .sd-row3 { display:flex; flex-direction:column; }
  }
`;

/* ══════════════════ PURE SVG DONUT ══════════════════ */
function DonutChart({ data, total, label, size = 160 }) {
  const cx = size / 2, cy = size / 2;
  const outerR = size / 2 - 8, innerR = outerR * 0.6;
  const totalVal = data.reduce((s, d) => s + d.value, 0);
  let angle = -Math.PI / 2;
  const arcs = data.map(d => {
    const sweep = (d.value / totalVal) * 2 * Math.PI;
    const ea = angle + sweep;
    const x1 = cx + outerR * Math.cos(angle), y1 = cy + outerR * Math.sin(angle);
    const x2 = cx + outerR * Math.cos(ea),    y2 = cy + outerR * Math.sin(ea);
    const ix1 = cx + innerR * Math.cos(ea),   iy1 = cy + innerR * Math.sin(ea);
    const ix2 = cx + innerR * Math.cos(angle),iy2 = cy + innerR * Math.sin(angle);
    const lg = sweep > Math.PI ? 1 : 0;
    const path = `M${x1},${y1} A${outerR},${outerR} 0 ${lg},1 ${x2},${y2} L${ix1},${iy1} A${innerR},${innerR} 0 ${lg},0 ${ix2},${iy2} Z`;
    angle = ea;
    return { path, color: d.color, name: d.name, value: d.value };
  });
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} style={{ display:'block', overflow:'visible', flexShrink:0 }}>
      {arcs.map((a, i) => (
        <path key={i} d={a.path} fill={a.color} stroke="#fff" strokeWidth={2}>
          <title>{a.name}: {a.value.toLocaleString()}</title>
        </path>
      ))}
      <text x={cx} y={cy - 7} textAnchor="middle" dominantBaseline="middle" fill="#0f172a" fontSize={18} fontWeight={800} fontFamily="Inter,sans-serif">{total}</text>
      <text x={cx} y={cy + 11} textAnchor="middle" dominantBaseline="middle" fill="#94a3b8" fontSize={10} fontWeight={700} fontFamily="Inter,sans-serif">{label}</text>
    </svg>
  );
}

function fmtN(n) { return typeof n === 'number' ? n.toLocaleString('en-IN') : n; }

function Stars({ rating }) {
  return (
    <span className="sd-rat-stars">
      {'★'.repeat(Math.floor(rating))}{'☆'.repeat(5 - Math.floor(rating))} {rating}
    </span>
  );
}

const LINE_COLORS = ['#3b82f6','#10b981','#8b5cf6','#f59e0b','#ef4444'];
const LINE_KEYS = ['ac','plumbing','cleaning','appliance','electrical'];
const LINE_NAMES = ['AC Installation','Plumbing Repair','Cleaning Services','Appliance Repair','Electrical Repair'];

function TrendTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null;
  return (
    <div style={{ background:'#0f172a', borderRadius:8, padding:'8px 12px', fontSize:11, boxShadow:'0 8px 16px rgba(0,0,0,.2)' }}>
      <div style={{ color:'#94a3b8', fontWeight:700, marginBottom:6 }}>{label}</div>
      {payload.map(p => (
        <div key={p.dataKey} style={{ display:'flex', alignItems:'center', gap:6, marginBottom:2 }}>
          <span style={{ width:6, height:6, borderRadius:'50%', background:p.color }} />
          <span style={{ color:'#cbd5e1' }}>{p.name}</span>
          <strong style={{ color:'#fff', marginLeft:8 }}>{fmtN(p.value)}</strong>
        </div>
      ))}
    </div>
  );
}

export default function ServicesOverviewDashboard({ activeTab = 'Services Dashboard' }) {
  const [period, setPeriod] = useState('Monthly');
  const [viewAllModal, setViewAllModal] = useState(null);

  return (
    <AdminShell showGlobalExport={true} activeTab={activeTab} headerTitle="Services Dashboard" searchPlaceholder="Search pages, modules...">
      <style>{CSS}</style>
      <div className="sd-root">

        {/* ── FILTER ── */}
        <div className="sd-filter">
          <div className="sd-filter-row">
            {[['State',['All States','Maharashtra','Delhi']],['City',['All Cities','Mumbai','Delhi']],['District',['All Districts','Andheri']],['Service',['All Services']],['Partner Wise',['All Partners']]].map(([l,opts]) => (
              <div key={l} style={{ flex:1, minWidth:130 }}>
                <span className="sd-flabel">{l}</span>
                <div className="sd-sel-wrap">
                  <select className="sd-sel">{opts.map(o => <option key={o}>{o}</option>)}</select>
                  <ChevronDown size={13} className="sd-arr" />
                </div>
              </div>
            ))}
            <div style={{ marginLeft:'auto', display:'flex', gap:10, alignItems:'flex-end', flexWrap: 'wrap' }}>
              <div className="sd-period">
                {['Daily','Weekly','Monthly','Yearly'].map(p => (
                  <button key={p} className={`sd-pbtn${period===p?' active':''}`} onClick={() => setPeriod(p)}>{p}</button>
                ))}
              </div>
              {period === 'Monthly' && (
                <div className="sd-sel-wrap" style={{ width:90 }}>
                  <select className="sd-sel">
                    {['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'].map(m => <option key={m}>{m}</option>)}
                  </select>
                  <ChevronDown size={13} className="sd-arr" />
                </div>
              )}
              {(period === 'Monthly' || period === 'Yearly') && (
                <div className="sd-sel-wrap" style={{ width:90 }}>
                  <select className="sd-sel">
                    {[2026,2027,2028,2029,2030,2031,2032,2033,2034,2035].map(y => <option key={y}>{y}</option>)}
                  </select>
                  <ChevronDown size={13} className="sd-arr" />
                </div>
              )}
              <button className="sd-apply">Apply</button>
              <button className="sd-reset">Reset</button>
              <button className="sd-apply" style={{ background: '#0f172a', display: 'flex', alignItems: 'center', gap: 6, padding: '8px 20px' }} onClick={() => alert('Generating report... Download will start shortly.')}>
                <Download size={14} /> Export Report
              </button>
            </div>
          </div>
          <div className="sd-filter-row" style={{ marginTop:12 }}>
            <div style={{ flex:'0 0 220px' }}>
              <span className="sd-flabel">Location Type</span>
              <div className="sd-sel-wrap">
                <select className="sd-sel"><option>All</option><option>Urban</option><option>Rural</option></select>
                <ChevronDown size={13} className="sd-arr" />
              </div>
            </div>
          </div>
        </div>

        {/* ── KPI ── */}
        <div className="sd-kpi-grid">
          {KPI.map((k, i) => {
            const Icon = k.icon;
            return (
              <div key={i} className="sd-kpi">
                <div className="sd-kpi-ico" style={{ background: k.bg, color: k.color }}>
                  <Icon size={20} strokeWidth={2.5} />
                </div>
                <div style={{ flex:1, minWidth:0 }}>
                  <div className="sd-kpi-val">{fmtN(k.value)}</div>
                  <div className="sd-kpi-lbl">{k.label}</div>
                  <div className="sd-kpi-t">
                    {k.up
                      ? <span className="sd-kpi-t up">↑ {k.trend}%</span>
                      : <span className="sd-kpi-t dn">↓ {k.trend}%</span>}
                    <span className="sd-kpi-sub">vs last month</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* ── ANALYTICS ROW 1 ── */}
        <div className="sd-row1">

          {/* Service Level Performance */}
          <div className="sd-card">
            <div className="sd-card-head">
              <h2 className="sd-card-title">Service Level Performance</h2>
              <div className="sd-sel-wrap" style={{ width:100 }}>
                <select className="sd-sel" style={{ padding:'4px 22px 4px 10px', fontSize:11 }}><option>Monthly</option></select>
                <ChevronDown size={12} className="sd-arr" />
              </div>
            </div>
            <div className="sd-perf-body">
              {PERFORMANCE.map((p, i) => {
                const Icon = p.icon;
                return (
                  <div key={i} className="sd-perf-item">
                    <div className="sd-perf-ico" style={{ background: p.color + '18', color: p.color }}>
                      <Icon size={16} strokeWidth={2.5} />
                    </div>
                    <div style={{ flex:1 }}>
                      <div className="sd-perf-lbl">{p.label}</div>
                      <div style={{ display:'flex', alignItems:'center', gap:8, marginTop:2 }}>
                        <div className="sd-perf-val" style={{ color: p.color }}>{p.value}{p.outOf ? ' / 5' : '%'}</div>
                        <div style={{ fontSize:10, fontWeight:700, color: p.up ? '#16a34a' : '#dc2626' }}>
                          {p.up ? '↑' : '↓'} {p.trend}{p.outOf ? '' : '%'}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Most Booking Services */}
          <div className="sd-card">
            <div className="sd-card-head">
              <h2 className="sd-card-title">Most Booking Services</h2>
              <button className="sd-view-all" onClick={() => setViewAllModal('topServices')}>View All <ChevronRight size={13} /></button>
            </div>
            <div className="sd-top-body">
              {TOP_SERVICES.map((s, i) => (
                <div key={i} className="sd-top-row">
                  <div className="sd-top-rank" style={{ background: s.color }}>{i + 1}</div>
                  <span className="sd-top-name">{s.name}</span>
                  <span className="sd-top-cnt">{s.bookings.toLocaleString()}</span>
                  <div className="sd-top-bar-wrap">
                    <div className="sd-top-bar" style={{ width: `${s.pct}%`, background: s.color }} />
                  </div>
                  <span style={{ fontSize:10.5, color:'#64748b', fontWeight:700, width:36, textAlign:'right' }}>
                    {((s.bookings / 1256) * 22.5).toFixed(1)}%
                  </span>
                </div>
              ))}
              <div className="sd-top-foot">Showing 1 to 5 of 10 services</div>
            </div>
          </div>

          {/* Trending Services */}
          <div className="sd-card">
            <div className="sd-card-head">
              <h2 className="sd-card-title">Trending Services</h2>
              <div style={{ display:'flex', alignItems:'center', gap:8 }}>
                <button className="sd-view-all">View All <ChevronRight size={13} /></button>
                <div className="sd-sel-wrap" style={{ width:90 }}>
                  <select className="sd-sel" style={{ padding:'4px 22px 4px 10px', fontSize:11 }}><option>Monthly</option></select>
                  <ChevronDown size={12} className="sd-arr" />
                </div>
              </div>
            </div>
            <div className="sd-trend-body">
              <div style={{ flex:1, minHeight:0, height:240 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={TRENDING_DATA} margin={{ top:5, right:10, left:-20, bottom:0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                    <XAxis dataKey="month" tick={{ fontSize:10, fill:'#94a3b8', fontWeight:600 }} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fontSize:10, fill:'#94a3b8', fontWeight:600 }} axisLine={false} tickLine={false} />
                    <Tooltip content={<TrendTooltip />} />
                    <Legend iconType="circle" iconSize={7} wrapperStyle={{ fontSize:10, fontWeight:600, color:'#475569', paddingTop:8 }} />
                    {LINE_KEYS.map((k, i) => (
                      <Line key={k} type="monotone" dataKey={k} name={LINE_NAMES[i]} stroke={LINE_COLORS[i]} strokeWidth={2.5}
                        dot={{ r:3, fill:LINE_COLORS[i], strokeWidth:0 }} activeDot={{ r:5, strokeWidth:0 }} />
                    ))}
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* User Ratings */}
          <div className="sd-card">
            <div className="sd-card-head">
              <h2 className="sd-card-title">User Ratings</h2>
              <button className="sd-view-all" onClick={() => setViewAllModal('ratings')}>View All <ChevronRight size={13} /></button>
            </div>
            <div className="sd-rat-head-row">
              <span style={{ flex:1 }}>Service Name</span>
              <span style={{ width:90, textAlign:'center' }}>Avg. Rating</span>
              <span style={{ width:70, textAlign:'right' }}>Total Ratings</span>
            </div>
            {USER_RATINGS.map((r, i) => (
              <div key={i} className="sd-rat-row">
                <span className="sd-rat-name">{r.name}</span>
                <div style={{ width:90, display:'flex', justifyContent:'center' }}><Stars rating={r.rating} /></div>
                <span className="sd-rat-total">{fmtN(r.total)}</span>
              </div>
            ))}
            <div style={{ padding:'8px 18px', fontSize:10.5, color:'#94a3b8', fontWeight:600, borderTop:'1px solid #f1f5f9' }}>
              Showing 1 to 5 of 10 services
            </div>
          </div>
        </div>

        {/* ── DONUT ROW ── */}
        <div className="sd-row2">

          {/* Services by Category */}
          <div className="sd-card">
            <div className="sd-card-head">
              <h2 className="sd-card-title">Services by Category</h2>
              <button className="sd-view-all" onClick={() => setViewAllModal('category')}>View All <ChevronRight size={13} /></button>
            </div>
            <div className="sd-donut-body">
              <DonutChart data={CATEGORY_DATA} total="1,248" label="Total" size={160} />
              <div className="sd-donut-leg">
                {CATEGORY_DATA.map((d, i) => {
                  const pct = ((d.value / 1264) * 100).toFixed(1);
                  return (
                    <div key={i} className="sd-dleg-row">
                      <div style={{ display:'flex', alignItems:'center', flex:1, minWidth:0 }}>
                        <span className="sd-dot" style={{ background: d.color }} />
                        <span className="sd-dname">{d.name}</span>
                      </div>
                      <span className="sd-dval">{fmtN(d.value)}</span>
                      <span className="sd-dpct">({pct}%)</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Services by Status */}
          <div className="sd-card">
            <div className="sd-card-head">
              <h2 className="sd-card-title">Services by Status</h2>
              <button className="sd-view-all" onClick={() => setViewAllModal('status')}>View All <ChevronRight size={13} /></button>
            </div>
            <div className="sd-donut-body">
              <DonutChart data={STATUS_DATA} total="1,248" label="Total" size={160} />
              <div className="sd-donut-leg">
                {STATUS_DATA.map((d, i) => {
                  const pct = ((d.value / 1248) * 100).toFixed(1);
                  return (
                    <div key={i} className="sd-dleg-row">
                      <div style={{ display:'flex', alignItems:'center', flex:1, minWidth:0 }}>
                        <span className="sd-dot" style={{ background: d.color }} />
                        <span className="sd-dname">{d.name}</span>
                      </div>
                      <span className="sd-dval">{fmtN(d.value)}</span>
                      <span className="sd-dpct">({pct}%)</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Services by Payment Type */}
          <div className="sd-card">
            <div className="sd-card-head">
              <h2 className="sd-card-title">Services by Payment Type</h2>
              <button className="sd-view-all" onClick={() => setViewAllModal('payment')}>View All <ChevronRight size={13} /></button>
            </div>
            <div className="sd-donut-body">
              <DonutChart data={PAYMENT_DATA} total="1,248" label="Total" size={160} />
              <div className="sd-donut-leg">
                {PAYMENT_DATA.map((d, i) => {
                  const pct = ((d.value / 1250) * 100).toFixed(1);
                  return (
                    <div key={i} className="sd-dleg-row">
                      <div style={{ display:'flex', alignItems:'center', flex:1, minWidth:0 }}>
                        <span className="sd-dot" style={{ background: d.color }} />
                        <span className="sd-dname">{d.name}</span>
                      </div>
                      <span className="sd-dval">{fmtN(d.value)}</span>
                      <span className="sd-dpct">({pct}%)</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Top Service Level Performance */}
          <div className="sd-card">
            <div className="sd-card-head">
              <h2 className="sd-card-title">Top Service Level Performance</h2>
              <button className="sd-view-all" onClick={() => setViewAllModal('topLevel')}>View All <ChevronRight size={13} /></button>
            </div>
            <div className="sd-level-body">
              <table className="sd-level-table">
                <thead>
                  <tr>
                    <th>Service Name</th>
                    <th>Completion Rate</th>
                    <th>On-Time Rate</th>
                    <th>Avg. Rating</th>
                  </tr>
                </thead>
                <tbody>
                  {TOP_LEVEL.map((r, i) => (
                    <tr key={i}>
                      <td style={{ fontWeight:700, color:'#0f172a' }}>{r.name}</td>
                      <td>
                        <span style={{ fontWeight:700, fontSize:11.5, color:'#10b981' }}>{r.completion}%</span>
                        <span className="sd-prog-wrap"><span className="sd-prog" style={{ width:`${r.completion}%`, background:'#10b981' }} /></span>
                      </td>
                      <td>
                        <span style={{ fontWeight:700, fontSize:11.5, color:'#3b82f6' }}>{r.ontime}%</span>
                        <span className="sd-prog-wrap"><span className="sd-prog" style={{ width:`${r.ontime}%`, background:'#3b82f6' }} /></span>
                      </td>
                      <td>
                        <span className="sd-star-row">★ {r.rating}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div style={{ padding:'8px 14px', fontSize:10.5, color:'#94a3b8', fontWeight:600, borderTop:'1px solid #f1f5f9' }}>
                Showing 1 to 5 of 10 services
              </div>
            </div>
          </div>
        </div>

        {/* ── BOTTOM ROW ── */}
        <div className="sd-row3">

          {/* Service Provider Available Services */}
          <div className="sd-card">
            <div className="sd-card-head">
              <h2 className="sd-card-title">Service Provider Available Services</h2>
              <button className="sd-view-all" onClick={() => setViewAllModal('spServices')}>View All <ChevronRight size={13} /></button>
            </div>
            <div className="sd-btable-cont">
              <table className="sd-btable">
                <thead>
                  <tr>
                    <th>Service Name</th>
                    <th style={{ textAlign:'right' }}>Service Providers Count</th>
                  </tr>
                </thead>
                <tbody>
                  {SP_SERVICES.map((r, i) => (
                    <tr key={i}>
                      <td style={{ fontWeight:700, color:'#0f172a' }}>{r.name}</td>
                      <td style={{ fontWeight:800, color:'#2563eb', textAlign:'right' }}>{r.count}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="sd-btable-foot">
              <span className="sd-foot-info">Showing 1 to 5 of 12 services</span>
              <div className="sd-pagi">
                <button className="sd-ppbtn"><ChevronLeft size={12} /></button>
                <button className="sd-ppbtn active">1</button>
                <button className="sd-ppbtn">2</button>
                <button className="sd-ppbtn">3</button>
                <button className="sd-ppbtn"><ChevronRight size={12} /></button>
              </div>
            </div>
          </div>

          {/* Seller Available Services */}
          <div className="sd-card">
            <div className="sd-card-head">
              <h2 className="sd-card-title">Seller Available Services</h2>
              <button className="sd-view-all" onClick={() => setViewAllModal('sellerServices')}>View All <ChevronRight size={13} /></button>
            </div>
            <div className="sd-btable-cont">
              <table className="sd-btable">
                <thead>
                  <tr>
                    <th>Service Name</th>
                    <th style={{ textAlign:'right' }}>Sellers Count</th>
                  </tr>
                </thead>
                <tbody>
                  {SELLER_SERVICES.map((r, i) => (
                    <tr key={i}>
                      <td style={{ fontWeight:700, color:'#0f172a' }}>{r.name}</td>
                      <td style={{ fontWeight:800, color:'#2563eb', textAlign:'right' }}>{r.count}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="sd-btable-foot">
              <span className="sd-foot-info">Showing 1 to 5 of 12 services</span>
              <div className="sd-pagi">
                <button className="sd-ppbtn"><ChevronLeft size={12} /></button>
                <button className="sd-ppbtn active">1</button>
                <button className="sd-ppbtn">2</button>
                <button className="sd-ppbtn">3</button>
                <button className="sd-ppbtn"><ChevronRight size={12} /></button>
              </div>
            </div>
          </div>

          {/* Recent Services */}
          <div className="sd-card">
            <div className="sd-card-head">
              <h2 className="sd-card-title">Recent Services</h2>
              <button className="sd-view-all" onClick={() => setViewAllModal('recentServices')}>View All <ChevronRight size={13} /></button>
            </div>
            <div className="sd-search-bar">
              <Search size={13} color="#94a3b8" />
              <input type="text" className="sd-search-inp" placeholder="Search services..." />
            </div>
            <div className="sd-btable-cont">
              <table className="sd-rtable">
                <thead>
                  <tr>
                    <th>Service ID</th>
                    <th>Service Name</th>
                    <th>Category</th>
                    <th>Sub Category</th>
                    <th>Created On</th>
                    <th>Status</th>
                    <th style={{ textAlign:'center' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {RECENT_SERVICES.map((r, i) => (
                    <tr key={i}>
                      <td style={{ color:'#2563eb', fontWeight:700 }}>{r.id}</td>
                      <td style={{ fontWeight:700, color:'#0f172a' }}>{r.name}</td>
                      <td style={{ color:'#475569' }}>{r.cat}</td>
                      <td style={{ color:'#64748b' }}>{r.subcat}</td>
                      <td style={{ color:'#64748b' }}>{r.created}</td>
                      <td>
                        <span className={`sd-badge ${r.status === 'Active' ? 'sd-b-green' : r.status === 'Inactive' ? 'sd-b-yellow' : 'sd-b-red'}`}>
                          {r.status}
                        </span>
                      </td>
                      <td style={{ textAlign:'center' }}>
                        <div style={{ display:'flex', gap:5, justifyContent:'center' }}>
                          <button style={{ border:'none', background:'#eff6ff', color:'#2563eb', width:26, height:26, borderRadius:6, cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center' }}><Eye size={12} /></button>
                          <button style={{ border:'none', background:'#f8fafc', color:'#64748b', width:26, height:26, borderRadius:6, cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center' }}><Settings size={12} /></button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="sd-btable-foot">
              <span className="sd-foot-info">Showing 1 to 5 of 25 services</span>
              <div className="sd-pagi">
                <button className="sd-ppbtn"><ChevronLeft size={12} /></button>
                <button className="sd-ppbtn active">1</button>
                <button className="sd-ppbtn">2</button>
                <button className="sd-ppbtn">3</button>
                <button className="sd-ppbtn">4</button>
                <button className="sd-ppbtn">5</button>
                <button className="sd-ppbtn"><ChevronRight size={12} /></button>
              </div>
            </div>
          </div>
        </div>

        {/* ════════════════════ MODAL ════════════════════ */}
        {viewAllModal && (
          <div className="sd-modal-overlay" onClick={() => setViewAllModal(null)}>
            <div className="sd-modal-content" onClick={e => e.stopPropagation()}>
              <div className="sd-modal-header">
                <h3 className="sd-modal-title">
                  {viewAllModal === 'topServices' ? 'Most Booking Services' :
                   viewAllModal === 'trending' ? 'Trending Services' :
                   viewAllModal === 'ratings' ? 'User Ratings' :
                   viewAllModal === 'category' ? 'Services by Category' :
                   viewAllModal === 'status' ? 'Services by Status' :
                   viewAllModal === 'payment' ? 'Services by Payment Type' :
                   viewAllModal === 'topLevel' ? 'Top Service Level Performance' :
                   viewAllModal === 'spServices' ? 'Service Provider Available Services' :
                   viewAllModal === 'sellerServices' ? 'Seller Available Services' :
                   'All Recent Services'}
                </h3>
                <button className="sd-modal-close" onClick={() => setViewAllModal(null)}><X size={18} /></button>
              </div>
              <div className="sd-modal-body">
                <div style={{ overflowY: 'auto', maxHeight: '400px' }}>
                  <table className="sd-rtable" style={{ minWidth: 800 }}>
                    {(() => {
                      let data = [];
                      if (viewAllModal === 'topServices') data = TOP_SERVICES;
                      else if (viewAllModal === 'trending') data = TRENDING_DATA;
                      else if (viewAllModal === 'ratings') data = USER_RATINGS;
                      else if (viewAllModal === 'category') data = CATEGORY_DATA;
                      else if (viewAllModal === 'status') data = STATUS_DATA;
                      else if (viewAllModal === 'payment') data = PAYMENT_DATA;
                      else if (viewAllModal === 'topLevel') data = TOP_LEVEL;
                      else if (viewAllModal === 'spServices') data = SP_SERVICES;
                      else if (viewAllModal === 'sellerServices') data = SELLER_SERVICES;
                      else if (viewAllModal === 'recentServices') data = RECENT_SERVICES;

                      if (!data.length) return <tbody><tr><td style={{padding: 20, textAlign: 'center'}}>No data available</td></tr></tbody>;

                      if (viewAllModal === 'recentServices') {
                        return (
                          <>
                            <thead>
                              <tr>
                                <th>Service ID</th>
                                <th>Service Name</th>
                                <th>Category</th>
                                <th>Sub Category</th>
                                <th>Created On</th>
                                <th>Status</th>
                                <th style={{ textAlign:'center' }}>Actions</th>
                              </tr>
                            </thead>
                            <tbody>
                              {data.map((r, i) => (
                                <tr key={i}>
                                  <td style={{ color:'#2563eb', fontWeight:700 }}>{r.id}</td>
                                  <td style={{ fontWeight:700, color:'#0f172a' }}>{r.name}</td>
                                  <td style={{ color:'#475569' }}>{r.cat}</td>
                                  <td style={{ color:'#64748b' }}>{r.subcat}</td>
                                  <td style={{ color:'#64748b' }}>{r.created}</td>
                                  <td>
                                    <span className={`sd-badge ${r.status === 'Active' ? 'sd-b-green' : r.status === 'Inactive' ? 'sd-b-yellow' : 'sd-b-red'}`}>
                                      {r.status}
                                    </span>
                                  </td>
                                  <td style={{ textAlign:'center' }}>
                                    <div style={{ display:'flex', gap:5, justifyContent:'center' }}>
                                      <button style={{ border:'none', background:'#eff6ff', color:'#2563eb', width:26, height:26, borderRadius:6, cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center' }}><Eye size={12} /></button>
                                      <button style={{ border:'none', background:'#f8fafc', color:'#64748b', width:26, height:26, borderRadius:6, cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center' }}><Settings size={12} /></button>
                                    </div>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </>
                        );
                      }

                      const keys = Object.keys(data[0]);
                      return (
                        <>
                          <thead>
                            <tr>
                              {keys.map(k => <th key={k} style={{ textTransform: 'capitalize' }}>{k}</th>)}
                            </tr>
                          </thead>
                          <tbody>
                            {data.map((r, i) => (
                              <tr key={i}>
                                {keys.map(k => (
                                  <td key={k} style={{ fontWeight: typeof r[k] === 'number' ? 700 : 500 }}>
                                    {r[k]}
                                  </td>
                                ))}
                              </tr>
                            ))}
                          </tbody>
                        </>
                      );
                    })()}
                  </table>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </AdminShell>
  );
}
