import React, { useState } from 'react';
import {
  LineChart, Line, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';
import {
  ChevronDown, Eye, CalendarDays, CalendarPlus, Handshake, UserX, CalendarClock,
  Wrench, CheckCircle2, XCircle, MinusCircle, Package, FileText, IndianRupee,
  Wallet, Truck, TrendingUp, TrendingDown, X, Download
} from 'lucide-react';
import toast from 'react-hot-toast';
import { ROUTES as AppRoutes } from '../../config/routes';
import { useApp } from '../../hooks/useApp';
import { initialBookings } from './index';
import ExportReportModal from '../../components/common/ExportReportModal';

/* ─────────────────────────── DATA ─────────────────────────── */
const kpiCards = [
  { id: 'total-bookings',    label: 'Total Bookings',         value: 1248, trend: '12.5', trendUp: true,  color: '#3b82f6', bg: 'linear-gradient(135deg,#eff6ff 0%,#dbeafe 100%)', icon: CalendarDays },
  { id: 'new-bookings',      label: 'New Bookings',           value: 236,  trend: '8.4',  trendUp: true,  color: '#10b981', bg: 'linear-gradient(135deg,#ecfdf5 0%,#d1fae5 100%)', icon: CalendarPlus },
  { id: 'accepted',          label: 'Accepted Bookings',      value: 312,  trend: '15.1', trendUp: true,  color: '#8b5cf6', bg: 'linear-gradient(135deg,#f5f3ff 0%,#ede9fe 100%)', icon: Handshake },
  { id: 'unaccepted',        label: 'Unaccepted Bookings',    value: 54,   trend: '6.8',  trendUp: false, color: '#f97316', bg: 'linear-gradient(135deg,#fff7ed 0%,#fed7aa 100%)', icon: UserX },
  { id: 'upcoming',          label: 'Upcoming Bookings',      value: 412,  trend: '12.6', trendUp: true,  color: '#f59e0b', bg: 'linear-gradient(135deg,#fffbeb 0%,#fde68a 100%)', icon: CalendarClock },
  { id: 'wip',               label: 'Work In Progress',       value: 198,  trend: '3.2',  trendUp: false, color: '#ef4444', bg: 'linear-gradient(135deg,#fef2f2 0%,#fecaca 100%)', icon: Wrench },
  { id: 'completed',         label: 'Completed Bookings',     value: 356,  trend: '16.7', trendUp: true,  color: '#10b981', bg: 'linear-gradient(135deg,#ecfdf5 0%,#d1fae5 100%)', icon: CheckCircle2 },
  { id: 'cancelled',         label: 'Canceled Bookings',      value: 46,   trend: '0.1',  trendUp: false, color: '#ef4444', bg: 'linear-gradient(135deg,#fef2f2 0%,#fecaca 100%)', icon: XCircle },
  { id: 'missed',            label: 'Missed Bookings',        value: 32,   trend: '11.3', trendUp: false, color: '#6366f1', bg: 'linear-gradient(135deg,#eef2ff 0%,#e0e7ff 100%)', icon: MinusCircle },
  { id: 'material-request',  label: 'Material Request Raised',value: 87,   trend: '9.3',  trendUp: true,  color: '#ec4899', bg: 'linear-gradient(135deg,#fdf2f8 0%,#fce7f3 100%)', icon: Package },
  { id: 'total-order',       label: 'Total Order',            value: 1102, trend: '11.8', trendUp: false, color: '#3b82f6', bg: 'linear-gradient(135deg,#eff6ff 0%,#dbeafe 100%)', icon: FileText },
  { id: 'total-quotation',   label: 'Total Quotation',        value: 1356, trend: '13.8', trendUp: true,  color: '#8b5cf6', bg: 'linear-gradient(135deg,#f5f3ff 0%,#ede9fe 100%)', icon: FileText },
  { id: 'paid-bookings',     label: 'Paid Bookings',          value: 912,  trend: '14.2', trendUp: true,  color: '#10b981', bg: 'linear-gradient(135deg,#ecfdf5 0%,#d1fae5 100%)', icon: IndianRupee },
  { id: 'unpaid-bookings',   label: 'Unpaid Bookings',        value: 336,  trend: '4.5',  trendUp: false, color: '#ef4444', bg: 'linear-gradient(135deg,#fef2f2 0%,#fecaca 100%)', icon: Wallet },
  { id: 'total-delivery',    label: 'Total Delivery',         value: 978,  trend: '11.9', trendUp: true,  color: '#06b6d4', bg: 'linear-gradient(135deg,#ecfeff 0%,#cffafe 100%)', icon: Truck },
];

const overviewData = [
  { date: '01 May', New: 190, Accepted: 130, Upcoming: 90,  'Work In Progress': 70,  Completed: 35, Canceled: 15, Unaccepted: 5,  Missed: 2 },
  { date: '06 May', New: 240, Accepted: 160, Upcoming: 110, 'Work In Progress': 85,  Completed: 45, Canceled: 20, Unaccepted: 8,  Missed: 4 },
  { date: '11 May', New: 200, Accepted: 140, Upcoming: 100, 'Work In Progress': 75,  Completed: 40, Canceled: 18, Unaccepted: 7,  Missed: 3 },
  { date: '16 May', New: 230, Accepted: 170, Upcoming: 115, 'Work In Progress': 90,  Completed: 50, Canceled: 25, Unaccepted: 10, Missed: 5 },
  { date: '21 May', New: 195, Accepted: 135, Upcoming: 95,  'Work In Progress': 75,  Completed: 38, Canceled: 16, Unaccepted: 6,  Missed: 2 },
  { date: '26 May', New: 250, Accepted: 180, Upcoming: 120, 'Work In Progress': 95,  Completed: 55, Canceled: 28, Unaccepted: 12, Missed: 6 },
  { date: '31 May', New: 210, Accepted: 150, Upcoming: 105, 'Work In Progress': 80,  Completed: 42, Canceled: 20, Unaccepted: 9,  Missed: 4 },
];

const overviewLines = [
  { key: 'New',              color: '#3b82f6' },
  { key: 'Accepted',         color: '#f59e0b' },
  { key: 'Upcoming',         color: '#f97316' },
  { key: 'Work In Progress', color: '#eab308' },
  { key: 'Completed',        color: '#10b981' },
  { key: 'Canceled',         color: '#ef4444' },
  { key: 'Unaccepted',       color: '#ec4899' },
  { key: 'Missed',           color: '#6366f1' },
];

const statusDonutData = [
  { name: 'New',              value: 236, pct: '18.9%', color: '#3b82f6' },
  { name: 'Accepted',         value: 312, pct: '25.0%', color: '#10b981' },
  { name: 'Upcoming',         value: 412, pct: '33.0%', color: '#f97316' },
  { name: 'Work In Progress', value: 198, pct: '15.9%', color: '#8b5cf6' },
  { name: 'Completed',        value: 356, pct: '28.5%', color: '#06b6d4' },
  { name: 'Canceled',         value: 46,  pct: '3.7%',  color: '#ef4444' },
  { name: 'Unaccepted',       value: 54,  pct: '4.3%',  color: '#ec4899' },
  { name: 'Missed',           value: 32,  pct: '2.6%',  color: '#6366f1' },
  { name: 'Others',           value: 13,  pct: '1.0%',  color: '#94a3b8' },
];

const paymentDonutData = [
  { name: 'UPI',         value: 498, pct: '39.9%', color: '#3b82f6' },
  { name: 'Credit Card', value: 286, pct: '22.9%', color: '#ef4444' },
  { name: 'Net Banking', value: 212, pct: '17.0%', color: '#f59e0b' },
  { name: 'Wallet',      value: 156, pct: '12.5%', color: '#8b5cf6' },
  { name: 'Cash',        value: 96,  pct: '7.7%',  color: '#10b981' },
];

const recentBookings = [
  { id: 'HBK250527001', customer: 'Ramesh Kumar',  service: 'AC Repair',        provider: 'Ramu (SP)',       status: 'Work In Progress', date: '27 May 2026', amount: '2,450', payment: 'Paid' },
  { id: 'HBK250527002', customer: 'Suresh Babu',   service: 'Plumbing',         provider: 'Siva Teja (BSP)', status: 'Accepted',         date: '27 May 2026', amount: '1,850', payment: 'Unpaid' },
  { id: 'HBK250527003', customer: 'Anitha Devi',   service: 'Electrical',       provider: 'Manoj (SP)',      status: 'Upcoming',         date: '27 May 2026', amount: '1,250', payment: 'Paid' },
  { id: 'HBK250527004', customer: 'Kavitha Reddy', service: 'Cleaning',         provider: 'CleanPro (BSP)', status: 'Completed',        date: '26 May 2026', amount: '1,100', payment: 'Paid' },
  { id: 'HBK250527005', customer: 'Venkatesh',     service: 'Appliance Repair', provider: 'Ramu (SP)',       status: 'Canceled',         date: '26 May 2026', amount: '750',   payment: 'Unpaid' },
  { id: 'HBK250527006', customer: 'Raju Naik',     service: 'Plumbing',         provider: 'Siva Teja (BSP)', status: 'Missed',           date: '25 May 2026', amount: '650',   payment: 'Unpaid' },
];

const topCategories = [
  { name: 'AC Repair',        bookings: 312, pct: 25.0, color: '#3b82f6' },
  { name: 'Plumbing',         bookings: 248, pct: 19.9, color: '#f97316' },
  { name: 'Electrical',       bookings: 196, pct: 15.7, color: '#f59e0b' },
  { name: 'Cleaning',         bookings: 154, pct: 12.3, color: '#10b981' },
  { name: 'Appliance Repair', bookings: 126, pct: 10.1, color: '#06b6d4' },
  { name: 'Others',           bookings: 212, pct: 16.9, color: '#94a3b8' },
];

/* ─────────────────────────── HELPERS ─────────────────────────── */
const fmtNum = (n) => n >= 1000 ? n.toLocaleString('en-IN') : String(n);

const STATUS_STYLES = {
  'Work In Progress': { bg: '#fff7ed', color: '#ea580c', border: '#fed7aa', dot: '#f97316' },
  'Accepted':         { bg: '#f0fdf4', color: '#16a34a', border: '#bbf7d0', dot: '#22c55e' },
  'Upcoming':         { bg: '#fefce8', color: '#ca8a04', border: '#fde68a', dot: '#eab308' },
  'Completed':        { bg: '#ecfdf5', color: '#059669', border: '#a7f3d0', dot: '#10b981' },
  'Canceled':         { bg: '#fef2f2', color: '#dc2626', border: '#fecaca', dot: '#ef4444' },
  'Missed':           { bg: '#f5f3ff', color: '#7c3aed', border: '#ddd6fe', dot: '#8b5cf6' },
};

function StatusBadge({ status }) {
  const s = STATUS_STYLES[status] || { bg: '#f8fafc', color: '#64748b', border: '#e2e8f0', dot: '#94a3b8' };
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 5,
      background: s.bg, color: s.color,
      border: `1.5px solid ${s.border}`,
      borderRadius: 20, padding: '3px 10px 3px 8px',
      fontSize: 11.5, fontWeight: 700, whiteSpace: 'nowrap',
      letterSpacing: '0.01em',
      cursor: 'pointer'
    }}>
      <span style={{ width: 6, height: 6, borderRadius: '50%', background: s.dot, flexShrink: 0 }} />
      {status}
    </span>
  );
}

function PaymentBadge({ status }) {
  const paid = status === 'Paid';
  return (
    <span style={{
      display: 'inline-block',
      background: paid ? '#ecfdf5' : '#fef2f2',
      color: paid ? '#059669' : '#dc2626',
      border: `1.5px solid ${paid ? '#a7f3d0' : '#fecaca'}`,
      borderRadius: 20, padding: '3px 12px',
      fontSize: 11.5, fontWeight: 700,
      cursor: 'pointer'
    }}>
      {status}
    </span>
  );
}

function DonutCenter({ viewBox, value, label }) {
  const { cx, cy } = viewBox;
  return (
    <g>
      <text x={cx} y={cy - 8}  textAnchor="middle" fill="#0f172a" fontSize={20} fontWeight={800} fontFamily="Inter,sans-serif">{value}</text>
      <text x={cx} y={cy + 10} textAnchor="middle" fill="#94a3b8" fontSize={11} fontWeight={600} fontFamily="Inter,sans-serif">{label}</text>
    </g>
  );
}

const ChartTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div style={{
      background: '#0f172a', borderRadius: 10, padding: '10px 14px',
      fontSize: 11.5, boxShadow: '0 8px 24px rgba(0,0,0,0.25)',
      border: '1px solid rgba(255,255,255,0.08)',
    }}>
      <div style={{ color: '#94a3b8', fontWeight: 700, marginBottom: 8, fontSize: 11 }}>{label}</div>
      {payload.map(p => (
        <div key={p.name} style={{ display: 'flex', alignItems: 'center', gap: 7, marginBottom: 4 }}>
          <span style={{ width: 8, height: 8, borderRadius: '50%', background: p.color, display: 'inline-block', flexShrink: 0 }} />
          <span style={{ color: '#94a3b8' }}>{p.name}</span>
          <strong style={{ color: '#fff', marginLeft: 'auto', paddingLeft: 8 }}>{p.value}</strong>
        </div>
      ))}
    </div>
  );
};

/* ─────────────────────────── CSS BLOCK ─────────────────────────── */
const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');

  .bkd-root { font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif; min-height: 100%; background: #f8fafc; }

  /* ── Filter Bar ── */
  .bkd-filter-card {
    background: #fff;
    border: 1px solid #e8edf3;
    border-radius: 16px;
    padding: 18px 22px;
    margin-bottom: 18px;
    box-shadow: 0 1px 4px rgba(15,23,42,0.04);
  }
  .bkd-filter-row { display: flex; flex-wrap: wrap; gap: 14px; align-items: flex-end; }
  .bkd-filter-row + .bkd-filter-row { margin-top: 14px; }
  .bkd-filter-label {
    font-size: 11.5px; font-weight: 600; color: #64748b;
    margin-bottom: 5px; display: block; text-transform: uppercase; letter-spacing: 0.04em;
  }
  .bkd-select-wrap { position: relative; }
  .bkd-select {
    appearance: none; background: #f8fafc; border: 1.5px solid #e2e8f0;
    border-radius: 8px; padding: 8px 32px 8px 12px;
    font-size: 13px; font-weight: 500; color: #1e293b;
    cursor: pointer; outline: none; width: 100%;
    font-family: 'Inter', sans-serif;
    transition: border-color 0.18s, box-shadow 0.18s;
  }
  .bkd-select:focus { border-color: #3b82f6; box-shadow: 0 0 0 3px rgba(59,130,246,0.1); }
  .bkd-select:hover { border-color: #cbd5e1; }
  .bkd-select-arrow {
    position: absolute; right: 10px; top: 50%; transform: translateY(-50%);
    pointer-events: none; color: #94a3b8;
  }

  /* Period toggles */
  .bkd-period-group {
    display: flex; background: #f1f5f9; border-radius: 9px;
    padding: 3px; gap: 2px; border: 1.5px solid #e2e8f0;
  }
  .bkd-period-btn {
    padding: 6px 15px; border: none; background: transparent;
    color: #64748b; font-size: 12.5px; font-weight: 600;
    cursor: pointer; border-radius: 7px;
    transition: all 0.18s; font-family: 'Inter', sans-serif;
  }
  .bkd-period-btn.active { background: #1e293b; color: #fff; box-shadow: 0 2px 6px rgba(15,23,42,0.2); }
  .bkd-period-btn:hover:not(.active) { background: #e2e8f0; color: #1e293b; }

  /* Apply / Reset */
  .bkd-apply-btn {
    background: linear-gradient(135deg,#1e293b 0%,#334155 100%);
    color: #fff; border: none; border-radius: 8px;
    padding: 8px 32px; min-width: 110px; font-size: 13px; font-weight: 700;
    cursor: pointer; transition: all 0.18s;
    font-family: 'Inter', sans-serif;
    box-shadow: 0 2px 8px rgba(15,23,42,0.25);
  }
  .bkd-apply-btn:hover { box-shadow: 0 4px 14px rgba(15,23,42,0.35); transform: translateY(-1px); }
  .bkd-reset-btn {
    background: #fff; color: #475569; border: 1.5px solid #e2e8f0;
    border-radius: 8px; padding: 8px 32px; min-width: 110px; font-size: 13px; font-weight: 600;
    cursor: pointer; transition: all 0.18s; font-family: 'Inter', sans-serif;
  }
  .bkd-reset-btn:hover { background: #f8fafc; border-color: #cbd5e1; }

  /* ── KPI Cards ── */
  .bkd-kpi-grid {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: 14px;
    margin-bottom: 18px;
  }
  .bkd-kpi-card {
    background: #fff;
    border-radius: 14px;
    border: 1px solid #e8edf3;
    padding: 16px 16px 14px;
    display: flex; align-items: flex-start; gap: 12px;
    box-shadow: 0 2px 6px rgba(15,23,42,0.04);
    transition: transform 0.22s cubic-bezier(.34,1.56,.64,1), box-shadow 0.22s;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .bkd-kpi-card::after {
    content: ''; position: absolute; inset: 0;
    background: linear-gradient(135deg, rgba(255,255,255,0) 50%, rgba(255,255,255,0.6));
    pointer-events: none;
  }
  .bkd-kpi-card:hover {
    transform: translateY(-4px) scale(1.01);
    box-shadow: 0 12px 28px rgba(15,23,42,0.1);
  }
  .bkd-kpi-icon {
    width: 46px; height: 46px; border-radius: 12px;
    display: flex; align-items: center; justify-content: center;
    flex-shrink: 0; position: relative; z-index: 1;
  }
  .bkd-kpi-body { flex: 1; min-width: 0; position: relative; z-index: 1; }
  .bkd-kpi-label {
    font-size: 11.5px; font-weight: 600; color: #64748b;
    margin-bottom: 5px; line-height: 1.3;
    white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
  }
  .bkd-kpi-value {
    font-size: 26px; font-weight: 800; color: #0f172a;
    line-height: 1; margin-bottom: 7px; letter-spacing: -0.5px;
  }
  .bkd-kpi-trend {
    display: inline-flex; align-items: center; gap: 3px;
    font-size: 11.5px; font-weight: 700; border-radius: 6px; padding: 2px 7px 2px 4px;
  }
  .bkd-kpi-trend.up   { background: #f0fdf4; color: #16a34a; }
  .bkd-kpi-trend.down { background: #fef2f2; color: #dc2626; }
  .bkd-kpi-trend-label { font-size: 10.5px; color: #94a3b8; font-weight: 500; margin-left: 4px; }

  /* ── Section Cards ── */
  .bkd-section-card {
    background: #fff;
    border-radius: 16px;
    border: 1px solid #e8edf3;
    box-shadow: 0 2px 6px rgba(15,23,42,0.04);
    overflow: hidden;
  }
  .bkd-section-head {
    display: flex; justify-content: space-between; align-items: center;
    padding: 18px 20px 14px;
    border-bottom: 1.5px solid #f1f5f9;
  }
  .bkd-section-title {
    font-size: 14.5px; font-weight: 800; color: #0f172a; margin: 0;
    letter-spacing: -0.2px;
  }
  .bkd-view-all {
    font-size: 12px; color: #3b82f6; font-weight: 600;
    background: #eff6ff; padding: 5px 14px; border-radius: 7px;
    border: 1.5px solid #bfdbfe; cursor: pointer;
    transition: all 0.18s; font-family: 'Inter', sans-serif;
  }
  .bkd-view-all:hover { background: #dbeafe; border-color: #93c5fd; }

  /* ── Table ── */
  .bkd-table { width: 100%; border-collapse: collapse; font-size: 12.5px; }
  .bkd-table thead tr { background: #f8fafc; }
  .bkd-table th {
    color: #475569; font-weight: 700; padding: 11px 16px;
    text-align: left; white-space: nowrap;
    font-size: 11.5px; text-transform: uppercase; letter-spacing: 0.04em;
    border-bottom: 1.5px solid #e8edf3;
  }
  .bkd-table td {
    padding: 12px 16px; color: #334155;
    border-bottom: 1px solid #f1f5f9;
    white-space: nowrap; font-weight: 500;
    transition: background 0.12s;
  }
  .bkd-table tbody tr:hover td { background: #f8fafc; }
  .bkd-table tbody tr:last-child td { border-bottom: none; }

  /* Action button */
  .bkd-action-btn {
    width: 30px; height: 30px; border-radius: 7px;
    border: 1.5px solid #e2e8f0; background: #f8fafc;
    display: inline-flex; align-items: center; justify-content: center;
    cursor: pointer; color: #3b82f6; transition: all 0.18s;
  }
  .bkd-action-btn:hover {
    background: #eff6ff; border-color: #bfdbfe;
    transform: scale(1.1); color: #2563eb;
  }

  /* Pagination */
  .bkd-pg-btn {
    width: 33px; height: 33px; border-radius: 7px;
    border: 1.5px solid #e2e8f0; background: #fff;
    display: inline-flex; align-items: center; justify-content: center;
    cursor: pointer; font-size: 13px; font-weight: 600; color: #475569;
    transition: all 0.18s; font-family: 'Inter', sans-serif;
  }
  .bkd-pg-btn.active {
    background: linear-gradient(135deg,#3b82f6,#2563eb);
    color: #fff; border-color: #3b82f6;
    box-shadow: 0 3px 8px rgba(59,130,246,0.35);
  }
  .bkd-pg-btn:hover:not(.active) { background: #f1f5f9; border-color: #cbd5e1; }

  /* Progress bar */
  .bkd-prog-track {
    height: 7px; background: #f1f5f9;
    border-radius: 99px; overflow: hidden; flex: 1;
  }
  .bkd-prog-fill {
    height: 100%; border-radius: 99px;
    transition: width 0.6s cubic-bezier(.34,1.56,.64,1);
  }

  /* Donut legend */
  .bkd-legend-item {
    display: flex; align-items: center;
    justify-content: space-between; font-size: 11.5px;
    padding: 4px 0;
    border-bottom: 1px dashed #f1f5f9;
  }
  .bkd-legend-item:last-child { border-bottom: none; }
  .bkd-legend-dot { width: 9px; height: 9px; border-radius: 50%; flex-shrink: 0; }

  /* Chart wrapper */
  .bkd-chart-inner { padding: 4px 10px 12px 0; }

  @media (max-width: 1280px) {
    .bkd-kpi-grid { grid-template-columns: repeat(4,1fr); }
  }
  @media (max-width: 1024px) {
    .bkd-kpi-grid { grid-template-columns: repeat(3,1fr); }
    .bkd-charts-row { grid-template-columns: 1fr !important; }
    .bkd-bottom-row { grid-template-columns: 1fr !important; }
  }
  @media (max-width: 768px) {
    .bkd-kpi-grid { grid-template-columns: repeat(2,1fr); }
  }

  /* ── Modals ── */
  .bkd-modal-overlay {
    position: fixed; top: 0; left: 0; right: 0; bottom: 0;
    background: rgba(15,23,42,0.6); backdrop-filter: blur(4px);
    z-index: 9999; display: flex; justify-content: center; align-items: center;
    padding: 20px;
  }
  .bkd-modal-content {
    background: #fff; border-radius: 16px; width: 100%; max-width: 900px;
    max-height: 90vh; display: flex; flex-direction: column;
    box-shadow: 0 20px 25px -5px rgba(0,0,0,0.1), 0 10px 10px -5px rgba(0,0,0,0.04);
  }
  .bkd-modal-header {
    padding: 20px 24px; border-bottom: 1px solid #e2e8f0;
    display: flex; justify-content: space-between; align-items: center;
  }
  .bkd-modal-title { font-size: 18px; font-weight: 700; color: #0f172a; margin: 0; }
  .bkd-modal-close {
    background: #f1f5f9; border: none; width: 32px; height: 32px; border-radius: 50%;
    display: flex; justify-content: center; align-items: center; cursor: pointer;
    color: #64748b; transition: all 0.2s;
  }
  .bkd-modal-close:hover { background: #e2e8f0; color: #0f172a; }
  .bkd-modal-body {
    padding: 24px; overflow-y: auto; flex: 1;
  }
`;

/* ─────────────────────────── COMPONENT ─────────────────────────── */
export default function BookingsDashboard({ bookings, handlers = {}, navigate: propsNavigate, ROUTES = AppRoutes }) {
  const { navigate: appNavigate } = useApp();
  const navigate = propsNavigate || appNavigate;
  
  // Use initialBookings as fallback if bookings is not provided or empty
  const activeBookings = bookings && bookings.length > 0 ? bookings : initialBookings;

  const [period, setPeriod]       = useState('Monthly');
  const [month, setMonth]         = useState('May');
  const [year, setYear]           = useState('2026');
  
  const [viewAllModal, setViewAllModal] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [isExportOpen, setIsExportOpen] = useState(false);
  
  const [filters, setFilters] = useState({
    State: 'All States',
    City: 'All Cities',
    District: 'All Districts',
    'Service Category': 'All Service Categories',
    'Sub Category': 'All Sub Categories',
    'Location Type': 'All'
  });
  
  const [filterTrigger, setFilterTrigger] = useState(0);

  const [searchQuery, setSearchQuery] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: 'date', direction: 'desc' });

  const months = ['Jan','Feb','March','April','May','June','July','August','September','October','November','December'];
  const years  = ['2026','2027','2028','2029','2030','2031','2032','2033','2034','2035'];

  const periodMultiplier = period === 'Daily' ? 0.03 : period === 'Weekly' ? 0.25 : period === 'Yearly' ? 12 : 1;
  const filterMultiplier = filterTrigger === 0 ? 1 : 1 + ((filterTrigger % 5) * 0.15);
  const locationMultiplier = filters['Location Type'] === 'Residential' ? 0.6 : filters['Location Type'] === 'Commercial' ? 0.3 : filters['Location Type'] === 'Industrial' ? 0.1 : 1;
  const m = periodMultiplier * filterMultiplier * locationMultiplier;

  // Filtered and Sorted Table Data
  const filteredBookings = activeBookings.filter(b => {
    if (!searchQuery) return true;
    const q = searchQuery.toLowerCase();
    return (
      (b.id || '').toLowerCase().includes(q) ||
      (b.customer || '').toLowerCase().includes(q) ||
      (b.partner || '').toLowerCase().includes(q)
    );
  });
  
  const sortedBookings = [...filteredBookings].sort((a, b) => {
    let valA = a[sortConfig.key];
    let valB = b[sortConfig.key];
    if (sortConfig.key === 'amount') {
      valA = typeof valA === 'number' ? valA : parseFloat(String(valA || '0').replace(/[^0-9.-]+/g,""));
      valB = typeof valB === 'number' ? valB : parseFloat(String(valB || '0').replace(/[^0-9.-]+/g,""));
    }
    if (valA < valB) return sortConfig.direction === 'asc' ? -1 : 1;
    if (valA > valB) return sortConfig.direction === 'asc' ? 1 : -1;
    return 0;
  });

  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') direction = 'desc';
    setSortConfig({ key, direction });
  };

  const ITEMS_PER_PAGE = 6;
  const totalPages = Math.ceil(sortedBookings.length / ITEMS_PER_PAGE) || 1;
  // Make sure current page is valid
  const validPage = Math.min(Math.max(1, currentPage), totalPages);
  const paginatedBookings = sortedBookings.slice((validPage - 1) * ITEMS_PER_PAGE, validPage * ITEMS_PER_PAGE);

  // Derived data based on multiplier
  const dynKpis = kpiCards.map(k => ({ ...k, value: Math.floor(k.value * m) }));
  const dynOverviewData = overviewData.map(d => {
    const next = { ...d };
    overviewLines.forEach(l => { next[l.key] = Math.floor(d[l.key] * m); });
    return next;
  });
  const dynStatusDonutData = statusDonutData.map(d => ({ ...d, value: Math.floor(d.value * m) }));
  const dynPaymentDonutData = paymentDonutData.map(d => ({ ...d, value: Math.floor(d.value * m) }));
  const dynTopCategories = topCategories.map(d => ({ ...d, bookings: Math.floor(d.bookings * m) }));
  const totalStatusDonut = dynStatusDonutData.reduce((acc, curr) => acc + curr.value, 0);
  const totalPaymentDonut = dynPaymentDonutData.reduce((acc, curr) => acc + curr.value, 0);
  const totalTopCategories = dynTopCategories.reduce((acc, curr) => acc + curr.bookings, 0);

  return (
    <div className="bkd-root">
      <style>{CSS}</style>

      {/* ════════════════════ FILTER BAR ════════════════════ */}
      <div className="bkd-filter-card">
        {/* Row 1 */}
        <div className="bkd-filter-row">
          {[
            ['State',    ['All States','Maharashtra','Karnataka','Tamil Nadu','Delhi'],     150],
            ['City',     ['All Cities','Mumbai','Bengaluru','Chennai','Hyderabad'],         140],
            ['District', ['All Districts','Andheri','Koramangala','T. Nagar'],             155],
          ].map(([lbl, opts, w]) => (
            <div key={lbl}>
              <span className="bkd-filter-label">{lbl}</span>
              <div className="bkd-select-wrap" style={{ minWidth: w }}>
                <select className="bkd-select" value={filters[lbl]} onChange={e => setFilters({...filters, [lbl]: e.target.value})}>
                  {opts.map(o => <option key={o}>{o}</option>)}
                </select>
                <ChevronDown size={14} className="bkd-select-arrow" />
              </div>
            </div>
          ))}

          {/* Period toggle group */}
          <div style={{ marginLeft: 8 }}>
            <span className="bkd-filter-label" style={{ opacity: 0 }}>.</span>
            <div className="bkd-period-group">
              {['Daily','Weekly','Monthly','Yearly'].map(p => (
                <button
                  key={p}
                  className={`bkd-period-btn${period === p ? ' active' : ''}`}
                  onClick={() => setPeriod(p)}
                >{p}</button>
              ))}
            </div>
          </div>

          {/* Month */}
          <div>
            <span className="bkd-filter-label" style={{ opacity: 0 }}>.</span>
            <div className="bkd-select-wrap" style={{ minWidth: 90 }}>
              <select className="bkd-select" value={month} onChange={e => setMonth(e.target.value)}>
                {months.map(m => <option key={m}>{m}</option>)}
              </select>
              <ChevronDown size={14} className="bkd-select-arrow" />
            </div>
          </div>

          {/* Year */}
          <div>
            <span className="bkd-filter-label" style={{ opacity: 0 }}>.</span>
            <div className="bkd-select-wrap" style={{ minWidth: 90 }}>
              <select className="bkd-select" value={year} onChange={e => setYear(e.target.value)}>
                {years.map(y => <option key={y}>{y}</option>)}
              </select>
              <ChevronDown size={14} className="bkd-select-arrow" />
            </div>
          </div>

          {/* Apply / Reset */}
          <div style={{ marginLeft: 8, display: 'flex', gap: 8, alignItems: 'flex-end' }}>
            <span className="bkd-filter-label" style={{ opacity: 0 }}>.</span>
            <button className="bkd-apply-btn" onClick={() => { setFilterTrigger(prev => prev + 1); toast.success('Filters applied!'); }}>Apply</button>
            <button className="bkd-reset-btn" onClick={() => { 
              setPeriod('Monthly'); setMonth('May'); setYear('2026'); 
              setFilters({
                State: 'All States', City: 'All Cities', District: 'All Districts',
                'Service Category': 'All Service Categories', 'Sub Category': 'All Sub Categories', 'Location Type': 'All'
              });
              setFilterTrigger(0);
              toast.success('Filters reset!'); 
            }}>Reset</button>
            <button className="bkd-apply-btn" style={{ background: '#2563eb', display: 'flex', alignItems: 'center', gap: 6, padding: '8px 20px', cursor: 'pointer' }} onClick={() => setIsExportOpen(true)}>
              <Download size={14} /> Export Report
            </button>
          </div>
        </div>

        {/* Row 2 */}
        <div className="bkd-filter-row">
          {[
            ['Service Category', ['All Service Categories','AC Repair','Plumbing','Electrical','Cleaning'], 190],
            ['Sub Category',     ['All Sub Categories','AC Installation','Pipe Repair','Deep Cleaning'],    185],
            ['Location Type',    ['All','Urban','Rural'],                                                   135],
          ].map(([lbl, opts, w]) => (
            <div key={lbl}>
              <span className="bkd-filter-label">{lbl}</span>
              <div className="bkd-select-wrap" style={{ minWidth: w }}>
                <select className="bkd-select" value={filters[lbl]} onChange={e => setFilters({...filters, [lbl]: e.target.value})}>
                  {opts.map(o => <option key={o}>{o}</option>)}
                </select>
                <ChevronDown size={14} className="bkd-select-arrow" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ════════════════════ KPI GRID ════════════════════ */}
      <div className="bkd-kpi-grid">
        {dynKpis.map(card => {
          const Icon = card.icon;
          
          // Map KPI label to route
          const routeMap = {
            'Pending Bookings': ROUTES.bookingPending,
            'Assigned Bookings': ROUTES.bookingAssigned,
            'Accepted Bookings': ROUTES.bookingAccepted,
            'In Progress Bookings': ROUTES.bookingInProgress,
            'Completed Bookings': ROUTES.bookingCompleted,
            'Canceled Bookings': ROUTES.bookingCancelled,
            'Refunded Bookings': ROUTES.bookingRefunded,
            'Escalated Bookings': ROUTES.bookingEscalated,
            'Disputed Bookings': ROUTES.bookingDisputed,
            'Upcoming Bookings': ROUTES.bookingPending,
            'Total Bookings': ROUTES.bookingAll
          };
          
          const targetRoute = routeMap[card.label] || ROUTES.bookingAll;

          return (
            <div 
              key={card.id} 
              className="bkd-kpi-card" 
              style={{ cursor: 'pointer' }}
              onClick={() => navigate && navigate(targetRoute)}
            >
              {/* Icon */}
              <div className="bkd-kpi-icon" style={{ background: card.bg }}>
                <Icon size={22} color={card.color} strokeWidth={2.2} />
              </div>

              {/* Body */}
              <div className="bkd-kpi-body">
                <div className="bkd-kpi-label">{card.label}</div>
                <div className="bkd-kpi-value">{fmtNum(card.value)}</div>
                <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: 4 }}>
                  <span className={`bkd-kpi-trend ${card.trendUp ? 'up' : 'down'}`}>
                    {card.trendUp
                      ? <TrendingUp size={12} strokeWidth={2.5} />
                      : <TrendingDown size={12} strokeWidth={2.5} />}
                    {card.trend}%
                  </span>
                  <span className="bkd-kpi-trend-label">vs last month</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* ════════════════════ CHARTS ROW ════════════════════ */}
      <div className="bkd-charts-row" style={{ display: 'grid', gridTemplateColumns: '1.9fr 1fr 1fr', gap: 16, marginBottom: 18 }}>

        {/* Bookings Overview Line Chart */}
        <div className="bkd-section-card">
          <div className="bkd-section-head">
            <h2 className="bkd-section-title">Bookings Overview</h2>
            <div className="bkd-select-wrap" style={{ minWidth: 110 }}>
              <select className="bkd-select" style={{ padding: '6px 28px 6px 11px', fontSize: 12.5 }}>
                <option>Monthly</option>
                <option>Weekly</option>
                <option>Daily</option>
              </select>
              <ChevronDown size={12} className="bkd-select-arrow" />
            </div>
          </div>
          <div className="bkd-chart-inner" style={{ height: 240, padding: '8px 12px 8px 0' }}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={dynOverviewData} margin={{ top: 8, right: 10, left: -20, bottom: 0 }} onClick={(e) => {
                if (e && e.activePayload) {
                  navigate && navigate(ROUTES.bookingAll);
                }
              }}>
                <CartesianGrid strokeDasharray="4 4" stroke="#f1f5f9" vertical={false} />
                <XAxis
                  dataKey="date"
                  tick={{ fontSize: 10.5, fill: '#94a3b8', fontWeight: 600 }}
                  axisLine={false} tickLine={false} dy={8}
                />
                <YAxis
                  tick={{ fontSize: 10.5, fill: '#94a3b8', fontWeight: 600 }}
                  axisLine={false} tickLine={false}
                  domain={[0, 280]} ticks={[0,50,100,150,200,250]}
                />
                <Tooltip content={<ChartTooltip />} />
                <Legend
                  iconType="circle" iconSize={8}
                  wrapperStyle={{ fontSize: 11, paddingTop: 10, fontWeight: 600, color: '#475569' }}
                />
                {overviewLines.map(l => (
                  <Line
                    key={l.key} type="monotone" dataKey={l.key}
                    stroke={l.color} strokeWidth={2.5}
                    dot={false} activeDot={{ r: 5, strokeWidth: 0 }}
                  />
                ))}
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Bookings by Status Donut */}
        <div className="bkd-section-card" style={{ display: 'flex', flexDirection: 'column' }}>
          <div className="bkd-section-head">
            <h2 className="bkd-section-title">Bookings by Status</h2>
          </div>
          <div style={{ padding: '14px 18px 16px', display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1, gap: 12 }}>
            <PieChart width={170} height={170}>
              <Pie
                data={dynStatusDonutData} cx={85} cy={85}
                innerRadius={54} outerRadius={82}
                paddingAngle={2} dataKey="value"
                startAngle={90} endAngle={-270}
                onClick={(data, index) => {
                  navigate && navigate(ROUTES.bookingAll);
                }}
              >
                {dynStatusDonutData.map((e, i) => <Cell key={i} fill={e.color} style={{ cursor: 'pointer' }} />)}
                <DonutCenter viewBox={{ cx: 85, cy: 85 }} value={fmtNum(totalStatusDonut)} label="Total" />
              </Pie>
              <Tooltip formatter={v => fmtNum(v)} />
            </PieChart>

            <div style={{ width: '100%' }}>
              {dynStatusDonutData.map((item, i) => (
                <div key={i} className="bkd-legend-item">
                  <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
                    <span className="bkd-legend-dot" style={{ background: item.color }} />
                    <span style={{ color: '#334155', fontWeight: 600 }}>{item.name}</span>
                  </div>
                  <span style={{ color: '#0f172a', fontWeight: 700 }}>
                    {fmtNum(item.value)}{' '}
                    <span style={{ color: '#94a3b8', fontWeight: 500 }}>({item.pct})</span>
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bookings by Payment Type Donut */}
        <div className="bkd-section-card" style={{ display: 'flex', flexDirection: 'column' }}>
          <div className="bkd-section-head">
            <h2 className="bkd-section-title">Bookings by Payment Type</h2>
          </div>
          <div style={{ padding: '14px 18px 16px', display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1, gap: 12 }}>
            <PieChart width={170} height={170}>
              <Pie
                data={dynPaymentDonutData} cx={85} cy={85}
                innerRadius={54} outerRadius={82}
                paddingAngle={2} dataKey="value"
                startAngle={90} endAngle={-270}
                onClick={(data, index) => {
                  navigate && navigate(ROUTES.bookingAll);
                }}
              >
                {dynPaymentDonutData.map((e, i) => <Cell key={i} fill={e.color} style={{ cursor: 'pointer' }} />)}
                <DonutCenter viewBox={{ cx: 85, cy: 85 }} value={fmtNum(totalPaymentDonut)} label="Total" />
              </Pie>
              <Tooltip formatter={v => fmtNum(v)} />
            </PieChart>

            <div style={{ width: '100%' }}>
              {dynPaymentDonutData.map((item, i) => (
                <div key={i} className="bkd-legend-item">
                  <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
                    <span className="bkd-legend-dot" style={{ background: item.color }} />
                    <span style={{ color: '#334155', fontWeight: 600 }}>{item.name}</span>
                  </div>
                  <span style={{ color: '#0f172a', fontWeight: 700 }}>
                    {fmtNum(item.value)}{' '}
                    <span style={{ color: '#94a3b8', fontWeight: 500 }}>({item.pct})</span>
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ════════════════════ BOTTOM ROW ════════════════════ */}
      <div className="bkd-bottom-row" style={{ display: 'grid', gridTemplateColumns: '1.65fr 1fr', gap: 16 }}>

        {/* Recent Bookings */}
        <div className="bkd-section-card">
          <div className="bkd-section-head" style={{ paddingBottom: 14 }}>
            <h2 className="bkd-section-title">Recent Bookings</h2>
            <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
              <input 
                type="text" 
                placeholder="Search..." 
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                style={{
                  padding: '6px 12px', borderRadius: 8, border: '1.5px solid #e2e8f0', 
                  fontSize: 12, outline: 'none', background: '#f8fafc', width: 140
                }}
              />
              <button className="bkd-view-all" onClick={() => {
                setViewAllModal('bookings');
              }}>View All</button>
            </div>
          </div>

          <div style={{ overflowY: 'auto', maxHeight: '400px' }}>
            <table className="bkd-table">
              <thead>
                <tr>
                  <th style={{ paddingLeft: 20, cursor: 'pointer' }} onClick={() => handleSort('id')}>
                    Booking ID {sortConfig.key === 'id' ? (sortConfig.direction === 'asc' ? '↑' : '↓') : ''}
                  </th>
                  <th style={{ cursor: 'pointer' }} onClick={() => handleSort('customer')}>
                    Customer Name {sortConfig.key === 'customer' ? (sortConfig.direction === 'asc' ? '↑' : '↓') : ''}
                  </th>
                  <th style={{ cursor: 'pointer' }} onClick={() => handleSort('category')}>
                    Service Category {sortConfig.key === 'category' ? (sortConfig.direction === 'asc' ? '↑' : '↓') : ''}
                  </th>
                  <th style={{ cursor: 'pointer' }} onClick={() => handleSort('partner')}>
                    Service Provider {sortConfig.key === 'partner' ? (sortConfig.direction === 'asc' ? '↑' : '↓') : ''}
                  </th>
                  <th style={{ cursor: 'pointer' }} onClick={() => handleSort('status')}>
                    Status {sortConfig.key === 'status' ? (sortConfig.direction === 'asc' ? '↑' : '↓') : ''}
                  </th>
                  <th style={{ cursor: 'pointer' }} onClick={() => handleSort('date')}>
                    Booking Date {sortConfig.key === 'date' ? (sortConfig.direction === 'asc' ? '↑' : '↓') : ''}
                  </th>
                  <th style={{ cursor: 'pointer' }} onClick={() => handleSort('amount')}>
                    Amount {sortConfig.key === 'amount' ? (sortConfig.direction === 'asc' ? '↑' : '↓') : ''}
                  </th>
                  <th style={{ cursor: 'pointer' }} onClick={() => handleSort('payment')}>
                    Payment Status {sortConfig.key === 'payment' ? (sortConfig.direction === 'asc' ? '↑' : '↓') : ''}
                  </th>
                  <th style={{ textAlign: 'center', paddingRight: 20 }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {paginatedBookings.length > 0 ? paginatedBookings.map((row, i) => (
                  <tr key={i}>
                    <td style={{ fontWeight: 700, color: '#2563eb', fontSize: 12.5, paddingLeft: 20 }}>
                      {row.id}
                    </td>
                    <td style={{ fontWeight: 600, color: '#0f172a' }}>{row.customer}</td>
                    <td style={{ color: '#475569' }}>{row.category || row.service}</td>
                    <td style={{ color: '#475569' }}>{row.partner || row.provider}</td>
                    <td onClick={() => navigate && navigate(ROUTES.bookingAll)}><StatusBadge status={row.status} /></td>
                    <td style={{ color: '#64748b', fontWeight: 600 }}>{row.date}</td>
                    <td style={{ fontWeight: 700, color: '#0f172a' }}>&#8377;{row.amount}</td>
                    <td onClick={() => navigate && navigate(ROUTES.payments)}><PaymentBadge status={row.payment || (Math.random() > 0.5 ? 'Paid' : 'Unpaid')} /></td>
                    <td style={{ textAlign: 'center', paddingRight: 20 }}>
                      <button className="bkd-action-btn" title="View details" onClick={() => {
                        if (handlers && handlers.view) handlers.view(row);
                      }}>
                        <Eye size={14} />
                      </button>
                    </td>
                  </tr>
                )) : (
                  <tr>
                    <td colSpan="9" style={{ textAlign: 'center', padding: '30px', color: '#64748b', fontStyle: 'italic' }}>
                      No bookings match your search or filters.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div style={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            padding: '12px 20px 16px', borderTop: '1.5px solid #f1f5f9',
          }}>
            <span style={{ fontSize: 12.5, color: '#64748b', fontWeight: 500 }}>
              Showing {(validPage - 1) * ITEMS_PER_PAGE + (paginatedBookings.length > 0 ? 1 : 0)} to {(validPage - 1) * ITEMS_PER_PAGE + paginatedBookings.length} of {sortedBookings.length} entries
            </span>
            <div style={{ display: 'flex', gap: 6 }}>
              <button className="bkd-pg-btn" onClick={() => setCurrentPage(p => Math.max(1, p - 1))} disabled={validPage === 1}>‹</button>
              {Array.from({ length: totalPages }, (_, idx) => idx + 1).slice(
                Math.max(0, validPage - 3),
                Math.min(totalPages, validPage + 2)
              ).map(p => (
                <button
                  key={p}
                  className={`bkd-pg-btn${validPage === p ? ' active' : ''}`}
                  onClick={() => setCurrentPage(p)}
                >{p}</button>
              ))}
              <button className="bkd-pg-btn" onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))} disabled={validPage === totalPages}>›</button>
            </div>
          </div>
        </div>

        {/* Top Service Categories */}
        <div className="bkd-section-card">
          <div className="bkd-section-head">
            <h2 className="bkd-section-title">Top Service Categories</h2>
            <button className="bkd-view-all" onClick={() => setViewAllModal('categories')}>View All</button>
          </div>

          <div style={{ padding: '0 4px 4px', maxHeight: '350px', overflowY: 'auto' }}>
            <table className="bkd-table" style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead style={{ position: 'sticky', top: 0, background: '#fff', zIndex: 10 }}>
                <tr>
                  <th style={{ paddingLeft: 20 }}>Category</th>
                  <th style={{ textAlign: 'right' }}>Bookings</th>
                  <th style={{ paddingRight: 20 }}>% Share</th>
                </tr>
              </thead>
              <tbody>
                {dynTopCategories.map((row, i) => (
                  <tr key={i}>
                    <td style={{ fontWeight: 600, color: '#0f172a', paddingLeft: 20 }}>
                      {row.name}
                    </td>
                    <td style={{ textAlign: 'right', fontWeight: 800, color: '#1e293b' }}>
                      {fmtNum(row.bookings)}
                    </td>
                    <td style={{ paddingRight: 20 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                        <div className="bkd-prog-track">
                          <div
                            className="bkd-prog-fill"
                            style={{ width: `${row.pct}%`, background: row.color }}
                          />
                        </div>
                        <span style={{ fontSize: 12, fontWeight: 700, color: '#0f172a', minWidth: 40, textAlign: 'right' }}>
                          {row.pct}%
                        </span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr style={{ borderTop: '2px solid #e8edf3' }}>
                  <td style={{ fontWeight: 800, color: '#0f172a', padding: '14px 16px 14px 20px' }}>Total</td>
                  <td style={{ textAlign: 'right', fontWeight: 800, color: '#0f172a', padding: '14px 16px' }}>{fmtNum(totalTopCategories)}</td>
                  <td style={{ fontWeight: 800, color: '#0f172a', padding: '14px 20px 14px 16px' }}>100%</td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      </div>

      {/* ════════════════════ MODALS ════════════════════ */}
      {viewAllModal && (
        <div className="bkd-modal-overlay" onClick={() => setViewAllModal(null)}>
          <div className="bkd-modal-content" onClick={e => e.stopPropagation()}>
            <div className="bkd-modal-header">
              <h3 className="bkd-modal-title">
                {viewAllModal === 'bookings' ? 'All Recent Bookings' : 'Top Service Categories'}
              </h3>
              <button className="bkd-modal-close" onClick={() => setViewAllModal(null)}><X size={18} /></button>
            </div>
            <div className="bkd-modal-body">
              {viewAllModal === 'bookings' && (
                <div style={{ overflowY: 'auto', maxHeight: '400px' }}>
                  <table className="bkd-table">
                    <thead>
                      <tr>
                        <th style={{ paddingLeft: 20 }}>Booking ID</th>
                        <th>Customer Name</th>
                        <th>Service Category</th>
                        <th>Service Provider</th>
                        <th>Status</th>
                        <th>Booking Date</th>
                        <th>Amount</th>
                        <th>Payment Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {sortedBookings.map((row, i) => (
                        <tr key={i}>
                          <td style={{ fontWeight: 700, color: '#2563eb', fontSize: 12.5, paddingLeft: 20 }}>{row.id}</td>
                          <td style={{ fontWeight: 600, color: '#0f172a' }}>{row.customer}</td>
                          <td style={{ color: '#475569' }}>{row.category || row.service}</td>
                          <td style={{ color: '#475569' }}>{row.partner || row.provider}</td>
                          <td><StatusBadge status={row.status} /></td>
                          <td style={{ color: '#64748b', fontWeight: 600 }}>{row.date}</td>
                          <td style={{ fontWeight: 700, color: '#0f172a' }}>&#8377;{row.amount}</td>
                          <td><PaymentBadge status={row.payment || (Math.random() > 0.5 ? 'Paid' : 'Unpaid')} /></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
              {viewAllModal === 'categories' && (
                <div style={{ overflowY: 'auto', maxHeight: '400px' }}>
                  <table className="bkd-table">
                    <thead>
                      <tr>
                        <th style={{ paddingLeft: 20 }}>Category</th>
                        <th style={{ textAlign: 'right' }}>Bookings</th>
                        <th style={{ paddingRight: 20 }}>% Share</th>
                      </tr>
                    </thead>
                    <tbody>
                      {dynTopCategories.map((row, i) => (
                        <tr key={i}>
                          <td style={{ fontWeight: 600, color: '#334155', paddingLeft: 20 }}>{row.name}</td>
                          <td style={{ textAlign: 'right', fontWeight: 800, color: '#1e293b' }}>{fmtNum(row.bookings)}</td>
                          <td style={{ paddingRight: 20 }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                              <div style={{ flex: 1, height: 6, background: '#f1f5f9', borderRadius: 3, overflow: 'hidden' }}>
                                <div style={{ height: '100%', background: row.color, width: `${row.pct}%` }} />
                              </div>
                              <span style={{ fontSize: 12, fontWeight: 700, color: '#64748b', minWidth: 40, textAlign: 'right' }}>
                                {row.pct}%
                              </span>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
      {/* Export Report Modal */}
      <ExportReportModal isOpen={isExportOpen} onClose={() => setIsExportOpen(false)} entityName="Bookings Dashboard Report" data={filteredBookings} />
    </div>
  );
}
