import React, { useState } from 'react';
import AdminShell from '../../components/layouts/AdminShell';
import ExportReportModal from '../../components/common/ExportReportModal';
import {
  Search, ChevronDown, ChevronLeft, ChevronRight, FileText, CheckCircle2,
  Clock, PackageCheck, Truck, RotateCcw, XCircle, AlertCircle, RefreshCcw,
  Check, CheckSquare, Download, Calendar, Filter, Users, Store, Banknote, FileCheck2, ShieldAlert, X
} from 'lucide-react';
import {
  LineChart, Line, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';

/* ============================ MOCK DATA ============================ */
const KPI_DATA = [
  { label: 'Total Orders', value: 1248, trendUp: true, trend: 12.5, icon: PackageCheck, color: '#3b82f6', bg: '#eff6ff' },
  { label: 'New Orders', value: 236, trendUp: false, trend: 8.4, icon: Calendar, color: '#10b981', bg: '#ecfdf5' },
  { label: 'Accepted Orders', value: 312, trendUp: true, trend: 15.1, icon: CheckCircle2, color: '#8b5cf6', bg: '#f3e8ff' },
  { label: 'Orders In Progress', value: 428, trendUp: true, trend: 10.7, icon: Clock, color: '#f97316', bg: '#fff7ed' },
  { label: 'Order Ready', value: 198, trendUp: true, trend: 9.2, icon: CheckSquare, color: '#7c3aed', bg: '#f3e8ff' },
  { label: 'Handover Pending', value: 156, trendUp: false, trend: 6.6, icon: RotateCcw, color: '#ea580c', bg: '#ffedd5' },

  { label: 'Completed Orders', value: 742, trendUp: true, trend: 11.9, icon: CheckCircle2, color: '#10b981', bg: '#ecfdf5' },
  { label: 'Canceled Orders', value: 64, trendUp: false, trend: 6.1, icon: XCircle, color: '#ef4444', bg: '#fef2f2' },
  { label: 'Rejected Orders', value: 18, trendUp: false, trend: 5.4, icon: AlertCircle, color: '#f43f5e', bg: '#fff1f2' },
  { label: 'Quotation Pending', value: 87, trendUp: true, trend: 9.3, icon: FileText, color: '#3b82f6', bg: '#eff6ff' },
  { label: 'Quotation Approved', value: 356, trendUp: true, trend: 13.8, icon: FileCheck2, color: '#10b981', bg: '#ecfdf5' },
  { label: 'Payment Pending Orders', value: 203, trendUp: false, trend: 4.5, icon: Banknote, color: '#f59e0b', bg: '#fffbeb' },

  { label: 'Paid Orders', value: 912, trendUp: true, trend: 14.2, icon: Banknote, color: '#10b981', bg: '#ecfdf5', isCurrency: true },
  { label: 'Unpaid Orders', value: 336, trendUp: false, trend: 4.5, icon: Banknote, color: '#ef4444', bg: '#fef2f2' },
  { label: 'Delivery Pending Orders', value: 978, trendUp: true, trend: 11.6, icon: Truck, color: '#6366f1', bg: '#e0e7ff' },
  { label: 'Delivered Orders', value: 854, trendUp: false, trend: 2.3, icon: CheckSquare, color: '#0ea5e9', bg: '#e0f2fe' },
  { label: 'Missed or Delayed Orders', value: 47, trendUp: false, trend: 11.3, icon: AlertCircle, color: '#ef4444', bg: '#fef2f2' },
];

const ORDER_STATUS_DIST = [
  { name: 'New', value: 236, color: '#3b82f6' },
  { name: 'In Progress', value: 312, color: '#f59e0b' },
  { name: 'Order Ready', value: 198, color: '#8b5cf6' },
  { name: 'Handover', value: 156, color: '#0ea5e9' },
  { name: 'Completed', value: 742, color: '#10b981' },
  { name: 'Canceled', value: 64, color: '#ef4444' },
];

const PAYMENT_STATUS = [
  { name: 'Paid', value: 912, color: '#10b981' },
  { name: 'Unpaid', value: 336, color: '#ef4444' },
  { name: 'Partially Paid', value: 112, color: '#f59e0b' },
  { name: 'Refunded', value: 72, color: '#8b5cf6' },
];

const PAYMENT_TYPE = [
  { name: 'UPI', value: 498, color: '#3b82f6' },
  { name: 'Credit Card', value: 286, color: '#8b5cf6' },
  { name: 'Debit Card', value: 156, color: '#0ea5e9' },
  { name: 'Net Banking', value: 212, color: '#f59e0b' },
  { name: 'Wallet', value: 156, color: '#10b981' },
  { name: 'Cash', value: 96, color: '#ef4444' },
];

const DELIVERY_STATUS = [
  { name: 'Delivery Pending', value: 236, color: '#3b82f6' },
  { name: 'Pickup Pending', value: 182, color: '#f59e0b' },
  { name: 'Out for Delivery', value: 298, color: '#8b5cf6' },
  { name: 'Delivered', value: 854, color: '#10b981' },
  { name: 'Delivery Failed', value: 46, color: '#ef4444' },
];

const ORDERS_TREND = [
  { day: '01 May', total: 100, completed: 80, canceled: 10 },
  { day: '06 May', total: 140, completed: 110, canceled: 15 },
  { day: '11 May', total: 200, completed: 160, canceled: 18 },
  { day: '16 May', total: 250, completed: 200, canceled: 22 },
  { day: '21 May', total: 210, completed: 180, canceled: 20 },
  { day: '26 May', total: 280, completed: 240, canceled: 18 },
  { day: '31 May', total: 320, completed: 280, canceled: 12 },
];

const RECENT_ORDERS = [
  { oid: 'ORD12450', bid: 'BK12450', cust: 'Rahul Sharma', seller: 'HomeFix Solutions', sp: 'Ramu (SP)', mat: 5, amt: 12850, pay: 'Paid', status: 'In Progress', del: 'Out For Delivery', date: '31 May 2026', time: '10:30 AM' },
  { oid: 'ORD12449', bid: 'BK12449', cust: 'Priya Singh', seller: 'BuildWell Store', sp: 'Shiva Teja (BSP)', mat: 3, amt: 5750, pay: 'Partially Paid', status: 'Quotation Approved', del: 'Pickup Pending', date: '31 May 2026', time: '09:15 AM' },
  { oid: 'ORD12448', bid: 'BK12448', cust: 'Amit Kumar', seller: 'ProCraft Supplies', sp: 'Manoj (SP)', mat: 4, amt: 9250, pay: 'Unpaid', status: 'New Order', del: 'Delivery Pending', date: '30 May 2026', time: '06:45 PM' },
  { oid: 'ORD12447', bid: 'BK12447', cust: 'Neha Verma', seller: 'UrbanMart', sp: 'Expert Technicians', mat: 6, amt: 15600, pay: 'Paid', status: 'Handover', del: 'Handover Pending', date: '30 May 2026', time: '04:30 PM' },
  { oid: 'ORD12446', bid: 'BK12446', cust: 'Vikram Patel', seller: 'MegaBuild Hub', sp: 'QuickHome Services', mat: 2, amt: 3450, pay: 'Paid', status: 'Completed', del: 'Delivered', date: '30 May 2026', time: '03:15 PM' },
];

const ATTENTION_REQUIRED = [
  { label: 'Quotation approval pending', count: 87 },
  { label: 'Material check pending', count: 28 },
  { label: 'Payment pending', count: 203 },
  { label: 'Handover OTP pending', count: 36 },
  { label: 'Seller acceptance pending', count: 64 },
  { label: 'Orders exceeding SLA', count: 29 },
  { label: 'Order ready but handover pending', count: 156 },
  { label: 'Canceled orders requiring refund', count: 31 },
  { label: 'Delivery delayed', count: 47 },
  { label: 'Failed deliveries', count: 22 },
];

const FLOW_STAGES = [
  { name: 'Quotation Pending', count: 87, icon: FileText, color: '#3b82f6', bg: '#eff6ff' },
  { name: 'Quotation Approved', count: 356, icon: FileCheck2, color: '#10b981', bg: '#ecfdf5' },
  { name: 'New Order', count: 236, icon: PackageCheck, color: '#3b82f6', bg: '#eff6ff' },
  { name: 'Accepted Order', count: 312, icon: CheckCircle2, color: '#8b5cf6', bg: '#f3e8ff' },
  { name: 'In Progress', count: 428, icon: Clock, color: '#f59e0b', bg: '#fffbeb' },
  { name: 'Order Ready', count: 198, icon: CheckSquare, color: '#7c3aed', bg: '#f3e8ff' },
  { name: 'Material Checked', count: 276, icon: ShieldAlert, color: '#10b981', bg: '#ecfdf5' },
  { name: 'Handover', count: 156, icon: Store, color: '#0ea5e9', bg: '#e0f2fe' },
  { name: 'Delivered', count: 854, icon: Truck, color: '#3b82f6', bg: '#eff6ff' },
  { name: 'Completed', count: 742, icon: Check, color: '#10b981', bg: '#ecfdf5' },
];
const EXCEPTIONS = [
  { name: 'Canceled', count: 64, color: '#ef4444' },
  { name: 'Rejected', count: 18, color: '#f43f5e' },
  { name: 'Returned', count: 22, color: '#8b5cf6' },
  { name: 'Delayed', count: 47, color: '#f59e0b' },
  { name: 'Missed', count: 32, color: '#ef4444' },
];


/* ============================ STYLES ============================ */
const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
  
  .od-root { font-family: 'Inter', sans-serif; background: #f8fafc; min-height: 100%; padding-bottom: 24px; }
  
  /* FILTER BAR */
  .od-filter-card { background: #fff; border: 1px solid #e8edf3; border-radius: 16px; padding: 18px 22px; margin-bottom: 18px; box-shadow: 0 1px 4px rgba(15,23,42,0.04); }
  .od-filter-row { display: flex; flex-wrap: wrap; gap: 14px; align-items: flex-end; margin-bottom: 14px; }
  .od-filter-row:last-child { margin-bottom: 0; }
  .od-filter-label { font-size: 11px; font-weight: 600; color: #64748b; margin-bottom: 5px; display: block; text-transform: uppercase; letter-spacing: 0.05em; }
  .od-select-wrap { position: relative; }
  .od-select { appearance: none; background: #f8fafc; border: 1.5px solid #e2e8f0; border-radius: 8px; padding: 8px 30px 8px 12px; font-size: 12.5px; font-weight: 600; color: #1e293b; cursor: pointer; outline: none; width: 100%; font-family: 'Inter', sans-serif; transition: border-color 0.18s; }
  .od-select:focus { border-color: #3b82f6; box-shadow: 0 0 0 3px rgba(59,130,246,0.1); }
  .od-select-arrow { position: absolute; right: 10px; top: 50%; transform: translateY(-50%); pointer-events: none; color: #94a3b8; }
  
  .od-period-group { display: flex; background: #f1f5f9; border-radius: 9px; padding: 3px; gap: 2px; border: 1.5px solid #e2e8f0; }
  .od-period-btn { padding: 6px 14px; border: none; background: transparent; color: #64748b; font-size: 12px; font-weight: 600; cursor: pointer; border-radius: 7px; transition: all 0.18s; }
  .od-period-btn.active { background: #1e293b; color: #fff; box-shadow: 0 2px 6px rgba(15,23,42,0.2); }
  .od-period-btn:hover:not(.active) { background: #e2e8f0; color: #1e293b; }
  
  .od-apply-btn { background: #1e293b; color: #fff; border: none; border-radius: 8px; padding: 8px 32px; min-width: 110px; font-size: 12.5px; font-weight: 700; cursor: pointer; transition: all 0.18s; }
  .od-apply-btn:hover { background: #0f172a; box-shadow: 0 4px 12px rgba(15,23,42,0.2); }
  .od-reset-btn { background: #fff; color: #475569; border: 1.5px solid #e2e8f0; border-radius: 8px; padding: 8px 32px; min-width: 110px; font-size: 12.5px; font-weight: 600; cursor: pointer; transition: all 0.18s; }
  .od-reset-btn:hover { background: #f8fafc; border-color: #cbd5e1; }

  /* KPI GRID */
  .od-kpi-grid { display: grid; grid-template-columns: repeat(6, 1fr); gap: 14px; margin-bottom: 18px; }
  .od-kpi-card { background: #fff; border-radius: 14px; border: 1px solid #e8edf3; padding: 14px; box-shadow: 0 2px 6px rgba(15,23,42,0.04); display: flex; align-items: flex-start; gap: 12px; transition: transform 0.2s, box-shadow 0.2s; }
  .od-kpi-card:hover { transform: translateY(-3px); box-shadow: 0 8px 20px rgba(15,23,42,0.08); }
  .od-kpi-icon { width: 38px; height: 38px; border-radius: 10px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
  .od-kpi-info { flex: 1; min-width: 0; }
  .od-kpi-val { font-size: 20px; font-weight: 800; color: #0f172a; line-height: 1; margin-bottom: 4px; }
  .od-kpi-label { font-size: 11px; font-weight: 700; color: #0f172a; line-height: 1.2; margin-bottom: 6px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
  .od-kpi-trend { font-size: 10px; font-weight: 700; display: inline-flex; align-items: center; gap: 2px; }
  .od-kpi-trend.up { color: #16a34a; }
  .od-kpi-trend.down { color: #dc2626; }
  .od-kpi-sub { color: #94a3b8; font-weight: 500; margin-left: 3px; font-size: 10px; }

  /* SECTION CARD */
  .od-card { background: #fff; border-radius: 16px; border: 1px solid #e8edf3; box-shadow: 0 2px 6px rgba(15,23,42,0.04); overflow: hidden; display: flex; flex-direction: column; }
  .od-card-head { display: flex; justify-content: space-between; align-items: center; padding: 16px 20px 14px; border-bottom: 1.5px solid #f1f5f9; }
  .od-card-title { font-size: 14px; font-weight: 800; color: #0f172a; margin: 0; }
  
  /* CHARTS ROW */
  .od-charts-row { display: grid; grid-template-columns: 1fr 1.8fr 1fr 1fr 1fr; gap: 14px; margin-bottom: 18px; }
  .od-donut-body { padding: 20px 16px 16px; display: flex; flex-direction: column; align-items: center; gap: 16px; flex: 1; }
  .od-donut-chart-wrap { width: 180px; height: 180px; flex-shrink: 0; position: relative; display: flex; align-items: center; justify-content: center; }
  .od-donut-dleg { width: 100%; }
  .od-dleg-row { display: flex; align-items: center; justify-content: space-between; width: 100%; font-size: 10.5px; padding: 3px 0; border-bottom: 1px dashed #f1f5f9; }
  .od-dleg-row:last-child { border-bottom: none; }
  .od-ddot { width: 7px; height: 7px; border-radius: 50%; flex-shrink: 0; }
  .od-dname { color: #334155; font-weight: 600; margin-left: 6px; flex: 1; white-space: nowrap; }
  .od-dval { font-weight: 700; color: #0f172a; }
  .od-dpct { color: #94a3b8; font-weight: 500; margin-left: 3px; }

  /* TIMELINE ROW */
  .od-timeline-wrap { padding: 24px; position: relative; overflow-x: auto; }
  .od-timeline { display: flex; align-items: flex-start; justify-content: space-between; min-width: 900px; position: relative; }
  .od-tl-line { position: absolute; top: 22px; left: 40px; right: 40px; height: 2px; background: #e2e8f0; z-index: 0; }
  .od-tl-item { display: flex; flex-direction: column; align-items: center; position: relative; z-index: 1; width: 90px; }
  .od-tl-icon { width: 44px; height: 44px; border-radius: 50%; display: flex; align-items: center; justify-content: center; background: #fff; border: 2.5px solid; transition: transform 0.2s; }
  .od-tl-item:hover .od-tl-icon { transform: scale(1.1); }
  .od-tl-label { font-size: 11px; font-weight: 700; color: #0f172a; text-align: center; margin-top: 8px; line-height: 1.2; height: 26px; }
  .od-tl-val { font-size: 15px; font-weight: 800; color: #0f172a; margin-top: 4px; }
  .od-tl-arrow { position: absolute; right: -25px; top: 16px; color: #cbd5e1; }
  
  .od-tl-exceptions { display: flex; align-items: center; gap: 20px; margin-top: 24px; padding-top: 16px; border-top: 1px dashed #e2e8f0; font-size: 11.5px; }
  .od-tl-exc-title { font-weight: 700; color: #475569; margin-right: 10px; }
  .od-tl-exc-item { display: flex; align-items: center; gap: 6px; font-weight: 700; }
  
  /* BOTTOM ROW */
  .od-bottom-row { display: grid; grid-template-columns: 2fr 1fr; gap: 14px; }
  
  /* TABLE */
  .od-table-wrap { padding: 12px 16px; }
  .od-search-bar { display: flex; align-items: center; gap: 10px; background: #f8fafc; border: 1.5px solid #e2e8f0; border-radius: 8px; padding: 6px 12px; width: 250px; margin-bottom: 12px; }
  .od-search-input { border: none; background: transparent; outline: none; font-size: 12.5px; font-weight: 500; font-family: 'Inter', sans-serif; width: 100%; }
  
  .od-table-cont { overflow-x: auto; border: 1px solid #f1f5f9; border-radius: 12px; }
  .od-table { width: 100%; border-collapse: collapse; font-size: 12px; min-width: 1300px; }
  .od-table th { background: #f8fafc; padding: 11px 14px; text-align: left; font-weight: 700; color: #475569; font-size: 10.5px; text-transform: uppercase; letter-spacing: 0.04em; border-bottom: 1.5px solid #e8edf3; white-space: nowrap; }
  .od-table td { padding: 12px 14px; color: #334155; border-bottom: 1px solid #f1f5f9; font-weight: 500; white-space: nowrap; }
  .od-table tbody tr:hover td { background: #f8fafc; }
  .od-table tbody tr:last-child td { border-bottom: none; }
  
  /* BADGES */
  .od-badge { display: inline-flex; align-items: center; padding: 3px 10px; border-radius: 20px; font-size: 10.5px; font-weight: 700; white-space: nowrap; border: 1px solid transparent; }
  .od-b-blue { background: #eff6ff; color: #2563eb; border-color: #bfdbfe; }
  .od-b-green { background: #ecfdf5; color: #10b981; border-color: #a7f3d0; }
  .od-b-yellow { background: #fffbeb; color: #d97706; border-color: #fde68a; }
  .od-b-orange { background: #fff7ed; color: #ea580c; border-color: #fed7aa; }
  .od-b-red { background: #fef2f2; color: #ef4444; border-color: #fecaca; }
  .od-b-purple { background: #f3e8ff; color: #9333ea; border-color: #e9d5ff; }

  /* PAGINATION */
  .od-pagi { display: flex; align-items: center; justify-content: space-between; padding: 12px 0 0; }
  .od-pagi-info { font-size: 11.5px; color: #64748b; font-weight: 600; }
  .od-pagi-btns { display: flex; gap: 4px; }
  .od-pbtn { width: 28px; height: 28px; border-radius: 6px; border: 1.5px solid #e2e8f0; background: #fff; display: inline-flex; align-items: center; justify-content: center; cursor: pointer; font-size: 12px; font-weight: 600; color: #475569; transition: all 0.18s; }
  .od-pbtn.active { background: #2563eb; color: #fff; border-color: #2563eb; }
  .od-pbtn:hover:not(.active) { background: #f1f5f9; }

  /* ATTENTION CARD */
  .od-attn-list { display: flex; flex-direction: column; }
  .od-attn-row { display: flex; align-items: center; justify-content: space-between; padding: 12px 20px; border-bottom: 1px solid #f1f5f9; cursor: pointer; transition: background 0.18s; }
  .od-attn-row:last-child { border-bottom: none; }
  .od-attn-row:hover { background: #f8fafc; }
  .od-attn-left { display: flex; align-items: center; gap: 10px; font-size: 12.5px; font-weight: 600; color: #0f172a; }
  .od-attn-icon { color: #ef4444; }
  .od-attn-badge { background: #ef4444; color: #fff; font-size: 11px; font-weight: 800; padding: 2px 10px; border-radius: 20px; min-width: 28px; text-align: center; }

  .od-view-all { font-size: 12px; color: #2563eb; font-weight: 700; background: transparent; border: none; cursor: pointer; display: flex; align-items: center; gap: 4px; }
  .od-view-all:hover { text-decoration: underline; }

  /* ── Modals ── */
  .od-modal-overlay {
    position: fixed; top: 0; left: 0; right: 0; bottom: 0;
    background: rgba(15,23,42,0.6); backdrop-filter: blur(4px);
    z-index: 9999; display: flex; justify-content: center; align-items: center;
    padding: 20px;
  }
  .od-modal-content {
    background: #fff; border-radius: 16px; width: 100%; max-width: 1000px;
    max-height: 90vh; display: flex; flex-direction: column;
    box-shadow: 0 20px 25px -5px rgba(0,0,0,0.1), 0 10px 10px -5px rgba(0,0,0,0.04);
  }
  .od-modal-header {
    padding: 20px 24px; border-bottom: 1px solid #e2e8f0;
    display: flex; justify-content: space-between; align-items: center;
  }
  .od-modal-title { font-size: 18px; font-weight: 700; color: #0f172a; margin: 0; }
  .od-modal-close {
    background: #f1f5f9; border: none; width: 32px; height: 32px; border-radius: 50%;
    display: flex; justify-content: center; align-items: center; cursor: pointer;
    color: #64748b; transition: all 0.2s;
  }
  .od-modal-close:hover { background: #e2e8f0; color: #0f172a; }
  .od-modal-body {
    padding: 24px; overflow-y: auto; flex: 1;
  }

  @media (max-width: 1400px) {
    .od-kpi-grid { grid-template-columns: repeat(4, 1fr); }
    .od-charts-row { grid-template-columns: repeat(3, 1fr); }
  }
  @media (max-width: 1024px) {
    .od-kpi-grid { grid-template-columns: repeat(3, 1fr); }
    .od-charts-row { grid-template-columns: repeat(2, 1fr); }
    .od-bottom-row { grid-template-columns: 1fr; }
  }
`;

function fmtNum(n) {
  return n.toLocaleString('en-IN');
}

function getStatusBadge(status) {
  let c = 'od-b-blue';
  if (['Paid', 'Completed', 'Delivered', 'Quotation Approved'].includes(status)) c = 'od-b-green';
  else if (['Unpaid', 'Canceled', 'Rejected', 'Delivery Failed'].includes(status)) c = 'od-b-red';
  else if (['Partially Paid', 'In Progress', 'Quotation Pending', 'Pickup Pending'].includes(status)) c = 'od-b-yellow';
  else if (['Handover Pending', 'Delivery Pending', 'Out For Delivery'].includes(status)) c = 'od-b-orange';
  else if (['New Order', 'Order Ready', 'Accepted'].includes(status)) c = 'od-b-purple';
  
  return <span className={`od-badge ${c}`}>{status}</span>;
}

/* Pure SVG Donut Chart — never clips, always perfectly circular */
function DonutChart({ data, total, label, size = 180 }) {
  const cx = size / 2;
  const cy = size / 2;
  const outerR = size / 2 - 8;
  const innerR = outerR * 0.62;
  const totalVal = data.reduce((s, d) => s + d.value, 0);

  let startAngle = -Math.PI / 2; // start from top
  const arcs = data.map(d => {
    const angle = (d.value / totalVal) * 2 * Math.PI;
    const endAngle = startAngle + angle;
    const x1 = cx + outerR * Math.cos(startAngle);
    const y1 = cy + outerR * Math.sin(startAngle);
    const x2 = cx + outerR * Math.cos(endAngle);
    const y2 = cy + outerR * Math.sin(endAngle);
    const ix1 = cx + innerR * Math.cos(endAngle);
    const iy1 = cy + innerR * Math.sin(endAngle);
    const ix2 = cx + innerR * Math.cos(startAngle);
    const iy2 = cy + innerR * Math.sin(startAngle);
    const large = angle > Math.PI ? 1 : 0;
    const path = `M ${x1} ${y1} A ${outerR} ${outerR} 0 ${large} 1 ${x2} ${y2} L ${ix1} ${iy1} A ${innerR} ${innerR} 0 ${large} 0 ${ix2} ${iy2} Z`;
    const midAngle = startAngle + angle / 2;
    startAngle = endAngle;
    return { path, color: d.color, name: d.name, value: d.value, midAngle };
  });

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} style={{ display: 'block', overflow: 'visible' }}>
      {arcs.map((arc, i) => (
        <path key={i} d={arc.path} fill={arc.color} stroke="#fff" strokeWidth={2}>
          <title>{arc.name}: {arc.value.toLocaleString('en-IN')}</title>
        </path>
      ))}
      <text x={cx} y={cy - 8} textAnchor="middle" dominantBaseline="middle"
        fill="#0f172a" fontSize={20} fontWeight={800} fontFamily="Inter,sans-serif">{total}</text>
      <text x={cx} y={cy + 14} textAnchor="middle" dominantBaseline="middle"
        fill="#94a3b8" fontSize={11} fontWeight={700} fontFamily="Inter,sans-serif">{label}</text>
    </svg>
  );
}

function CustomTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null;
  return (
    <div style={{ background: '#0f172a', borderRadius: 8, padding: '8px 12px', fontSize: 11, boxShadow: '0 8px 16px rgba(0,0,0,0.2)' }}>
      <div style={{ color: '#94a3b8', fontWeight: 700, marginBottom: 6 }}>{label}</div>
      {payload.map(p => (
        <div key={p.name} style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 2 }}>
          <span style={{ width: 6, height: 6, borderRadius: '50%', background: p.color }} />
          <span style={{ color: '#cbd5e1' }}>{p.name}</span>
          <strong style={{ color: '#fff', marginLeft: 8 }}>{fmtNum(p.value)}</strong>
        </div>
      ))}
    </div>
  );
}

export default function OrderDashboard({ activeTab = 'Order Dashboard' }) {
  const [period, setPeriod] = useState('Monthly');
  const [viewAllModal, setViewAllModal] = useState(null);
  const [isExportOpen, setIsExportOpen] = useState(false);
  
  return (
    <AdminShell showGlobalExport={true} activeTab={activeTab} headerTitle="Order Dashboard" searchPlaceholder="Search pages, modules...">
      <style>{CSS}</style>
      <div className="od-root">
        
        {/* FILTER SECTION */}
        <div className="od-filter-card">
          <div className="od-filter-row">
            {[
              ['State', ['All States','Maharashtra','Karnataka','Tamil Nadu','Delhi','Gujarat']],
              ['City', ['All Cities','Mumbai','Bengaluru','Chennai','New Delhi','Pune']],
              ['District', ['All Districts','Andheri','Koramangala','T. Nagar','Connaught Place']]
            ].map(([lbl, opts]) => (
              <div key={lbl} style={{ flex: 1, minWidth: 140 }}>
                <span className="od-filter-label">{lbl}</span>
                <div className="od-select-wrap">
                  <select className="od-select">{opts.map(o => <option key={o}>{o}</option>)}</select>
                  <ChevronDown size={14} className="od-select-arrow" />
                </div>
              </div>
            ))}
            <div style={{ marginLeft: 8, display: 'flex', gap: 10, alignItems: 'flex-end' }}>
              <div className="od-period-group">
                {['Daily','Weekly','Monthly','Yearly'].map(p => (
                  <button key={p} className={`od-period-btn${period === p ? ' active' : ''}`} onClick={() => setPeriod(p)}>{p}</button>
                ))}
              </div>
              <div className="od-select-wrap" style={{ width: 100 }}>
                <select className="od-select">
                  {['Jan','Feb','March','April','May','June','July','August','September','October','November','December'].map(m => <option key={m}>{m}</option>)}
                </select>
                <ChevronDown size={14} className="od-select-arrow" />
              </div>
              <div className="od-select-wrap" style={{ width: 90 }}>
                <select className="od-select">
                  {['2026','2027','2028','2029','2030','2031','2032','2033','2034','2035'].map(y => <option key={y}>{y}</option>)}
                </select>
                <ChevronDown size={14} className="od-select-arrow" />
              </div>
              <button className="od-apply-btn">Apply</button>
              <button className="od-reset-btn">Reset</button>
              <button className="od-apply-btn" style={{ background: '#2563eb', display: 'flex', alignItems: 'center', gap: 6, padding: '8px 20px', cursor: 'pointer' }} onClick={() => setIsExportOpen(true)}>
                <Download size={14} /> Export Report
              </button>
            </div>
          </div>
          <div className="od-filter-row">
            {[
              ['Service Category', ['All Service Categories','AC Repair & Service','Home Cleaning','Plumbing','Electrical','Appliance Repair']],
              ['Sub Category', ['All Sub Categories','AC Installation','Deep Cleaning','Bathroom Plumbing','Switchboard Repair']],
              ['Location Type', ['All','Urban','Rural']],
              ['Seller', ['All Sellers','Tech Electronics','Home Essentials','CleanPro Supplies','FixIt Hardware']]
            ].map(([lbl, opts]) => (
              <div key={lbl} style={{ flex: 1, minWidth: 180 }}>
                <span className="od-filter-label">{lbl}</span>
                <div className="od-select-wrap">
                  <select className="od-select">{opts.map(o => <option key={o}>{o}</option>)}</select>
                  <ChevronDown size={14} className="od-select-arrow" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* KPI GRID */}
        <div className="od-kpi-grid">
          {KPI_DATA.map((k, i) => {
            const Icon = k.icon;
            return (
              <div key={i} className="od-kpi-card">
                <div className="od-kpi-icon" style={{ background: k.bg, color: k.color }}>
                  <Icon size={20} strokeWidth={2.5} />
                </div>
                <div className="od-kpi-info">
                  <div className="od-kpi-val">{k.isCurrency ? '₹' : ''}{fmtNum(k.value)}</div>
                  <div className="od-kpi-label">{k.label}</div>
                  <div className="od-kpi-trend">
                    {k.trendUp ? <span className="od-kpi-trend up">↑ {k.trend}%</span> : <span className="od-kpi-trend down">↓ {k.trend}%</span>}
                    <span className="od-kpi-sub">vs last month</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* CHARTS ROW */}
        <div className="od-charts-row">
          {/* Order Status Donut */}
          <div className="od-card">
            <div className="od-card-head"><h2 className="od-card-title">Order Status Distribution</h2></div>
            <div className="od-donut-body">
              <div className="od-donut-chart-wrap">
                <DonutChart data={ORDER_STATUS_DIST} total="1,248" label="Total" size={180} />
              </div>
              <div className="od-donut-dleg">
                {ORDER_STATUS_DIST.map((item, i) => {
                  const pct = ((item.value / 1248) * 100).toFixed(1);
                  return (
                    <div key={i} className="od-dleg-row">
                      <div style={{ display: 'flex', alignItems: 'center' }}>
                        <span className="od-ddot" style={{ background: item.color }} />
                        <span className="od-dname">{item.name}</span>
                      </div>
                      <div>
                        <span className="od-dval">{fmtNum(item.value)}</span>
                        <span className="od-dpct">({pct}%)</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Orders Trend Line Chart */}
          <div className="od-card">
            <div className="od-card-head">
              <h2 className="od-card-title">Orders Trend</h2>
              <div className="od-select-wrap" style={{ width: 100 }}>
                <select className="od-select" style={{ padding: '4px 24px 4px 10px', fontSize: 11 }}><option>Monthly</option></select>
                <ChevronDown size={12} className="od-select-arrow" />
              </div>
            </div>
            <div style={{ height: 260, padding: '16px 14px 10px 0' }}>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={ORDERS_TREND} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                  <XAxis dataKey="day" tick={{ fontSize: 10, fill: '#94a3b8', fontWeight: 600 }} axisLine={false} tickLine={false} dy={8} />
                  <YAxis tick={{ fontSize: 10, fill: '#94a3b8', fontWeight: 600 }} axisLine={false} tickLine={false} />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend iconType="circle" iconSize={7} wrapperStyle={{ fontSize: 11, fontWeight: 600, color: '#475569', paddingTop: 10 }} />
                  <Line type="monotone" dataKey="total" name="Total Orders" stroke="#3b82f6" strokeWidth={2.5} dot={{ r: 3, fill: '#3b82f6', strokeWidth: 0 }} activeDot={{ r: 5, strokeWidth: 0 }} />
                  <Line type="monotone" dataKey="completed" name="Completed Orders" stroke="#10b981" strokeWidth={2.5} dot={{ r: 3, fill: '#10b981', strokeWidth: 0 }} activeDot={{ r: 5, strokeWidth: 0 }} />
                  <Line type="monotone" dataKey="canceled" name="Canceled Orders" stroke="#ef4444" strokeWidth={2.5} dot={{ r: 3, fill: '#ef4444', strokeWidth: 0 }} activeDot={{ r: 5, strokeWidth: 0 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Payment Status Donut */}
          <div className="od-card">
            <div className="od-card-head"><h2 className="od-card-title">Payment Status</h2></div>
            <div className="od-donut-body">
              <div className="od-donut-chart-wrap">
                <DonutChart data={PAYMENT_STATUS} total="1,248" label="Total" size={180} />
              </div>
              <div className="od-donut-dleg">
                {PAYMENT_STATUS.map((item, i) => {
                  const pct = ((item.value / 1248) * 100).toFixed(1);
                  return (
                    <div key={i} className="od-dleg-row">
                      <div style={{ display: 'flex', alignItems: 'center' }}>
                        <span className="od-ddot" style={{ background: item.color }} />
                        <span className="od-dname">{item.name}</span>
                      </div>
                      <div>
                        <span className="od-dval">{fmtNum(item.value)}</span>
                        <span className="od-dpct">({pct}%)</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Payment Type Donut */}
          <div className="od-card">
            <div className="od-card-head"><h2 className="od-card-title">Payment Type</h2></div>
            <div className="od-donut-body">
              <div className="od-donut-chart-wrap">
                <DonutChart data={PAYMENT_TYPE} total="1,248" label="Total" size={180} />
              </div>
              <div className="od-donut-dleg">
                {PAYMENT_TYPE.map((item, i) => {
                  const pct = ((item.value / 1248) * 100).toFixed(1);
                  return (
                    <div key={i} className="od-dleg-row">
                      <div style={{ display: 'flex', alignItems: 'center' }}>
                        <span className="od-ddot" style={{ background: item.color }} />
                        <span className="od-dname">{item.name}</span>
                      </div>
                      <div>
                        <span className="od-dval">{fmtNum(item.value)}</span>
                        <span className="od-dpct">({pct}%)</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Delivery Status Donut */}
          <div className="od-card">
            <div className="od-card-head"><h2 className="od-card-title">Delivery Status</h2></div>
            <div className="od-donut-body">
              <div className="od-donut-chart-wrap">
                <DonutChart data={DELIVERY_STATUS} total="1,248" label="Total" size={180} />
              </div>
              <div className="od-donut-dleg">
                {DELIVERY_STATUS.map((item, i) => {
                  const pct = ((item.value / 1248) * 100).toFixed(1);
                  return (
                    <div key={i} className="od-dleg-row">
                      <div style={{ display: 'flex', alignItems: 'center' }}>
                        <span className="od-ddot" style={{ background: item.color }} />
                        <span className="od-dname">{item.name}</span>
                      </div>
                      <div>
                        <span className="od-dval">{fmtNum(item.value)}</span>
                        <span className="od-dpct">({pct}%)</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* ORDER STATUS FLOW */}
        <div className="od-card" style={{ marginBottom: 18 }}>
          <div className="od-card-head"><h2 className="od-card-title">Order Status Flow</h2></div>
          <div className="od-timeline-wrap">
            <div className="od-timeline">
              <div className="od-tl-line" />
              {FLOW_STAGES.map((s, i) => {
                const Icon = s.icon;
                return (
                  <div key={i} className="od-tl-item">
                    <div className="od-tl-icon" style={{ borderColor: s.color, color: s.color }}>
                      <Icon size={20} strokeWidth={2.5} />
                    </div>
                    {i < FLOW_STAGES.length - 1 && <ChevronRight className="od-tl-arrow" size={16} />}
                    <div className="od-tl-label">{s.name}</div>
                    <div className="od-tl-val">{s.count}</div>
                  </div>
                );
              })}
            </div>
            
            <div className="od-tl-exceptions">
              <span className="od-tl-exc-title">Exception / Other Status:</span>
              {EXCEPTIONS.map((e, i) => (
                <div key={i} className="od-tl-exc-item" style={{ color: e.color }}>
                  <Filter size={12} style={{ transform: 'rotate(180deg)' }} />
                  {e.name} <span style={{ marginLeft: 4 }}>{e.count}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* BOTTOM ROW */}
        <div className="od-bottom-row">
          
          {/* Recent Orders Table */}
          <div className="od-card">
            <div className="od-card-head">
              <h2 className="od-card-title">Recent Orders</h2>
              <button className="od-view-all" onClick={() => setViewAllModal('orders')}>View All <ChevronRight size={14} /></button>
            </div>
            <div className="od-table-wrap">
              <div className="od-search-bar">
                <Search size={14} color="#94a3b8" />
                <input type="text" className="od-search-input" placeholder="Search orders..." />
              </div>
              <div className="od-table-cont">
                <table className="od-table">
                  <thead>
                    <tr>
                      <th>Order ID</th>
                      <th>Booking ID</th>
                      <th>Customer</th>
                      <th>Seller</th>
                      <th>Service Provider</th>
                      <th style={{ textAlign: 'center' }}>Materials</th>
                      <th>Total Amount</th>
                      <th>Payment Status</th>
                      <th>Order Status</th>
                      <th>Delivery Status</th>
                      <th>Order Date</th>
                      <th style={{ textAlign: 'center' }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {RECENT_ORDERS.map((r, i) => (
                      <tr key={i}>
                        <td style={{ fontWeight: 700, color: '#2563eb' }}>{r.oid}</td>
                        <td style={{ fontWeight: 600, color: '#64748b' }}>{r.bid}</td>
                        <td style={{ fontWeight: 700, color: '#0f172a' }}>{r.cust}</td>
                        <td style={{ fontWeight: 600, color: '#475569' }}>{r.seller}</td>
                        <td style={{ color: '#475569' }}>{r.sp}</td>
                        <td style={{ textAlign: 'center', fontWeight: 800 }}>{r.mat}</td>
                        <td style={{ fontWeight: 800, color: '#0f172a' }}>₹ {fmtNum(r.amt)}</td>
                        <td>{getStatusBadge(r.pay)}</td>
                        <td>{getStatusBadge(r.status)}</td>
                        <td>{getStatusBadge(r.del)}</td>
                        <td>
                          <div style={{ fontWeight: 600, color: '#1e293b' }}>{r.date}</div>
                          <div style={{ fontSize: 10.5, color: '#94a3b8' }}>{r.time}</div>
                        </td>
                        <td style={{ textAlign: 'center' }}>
                          <div style={{ display: 'flex', gap: 6, justifyContent: 'center' }}>
                            <button style={{ border: 'none', background: '#eff6ff', color: '#2563eb', width: 26, height: 26, borderRadius: 6, cursor: 'pointer' }}><FileText size={13} /></button>
                            <button style={{ border: 'none', background: '#f8fafc', color: '#64748b', width: 26, height: 26, borderRadius: 6, cursor: 'pointer' }}><Download size={13} /></button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="od-pagi">
                <span className="od-pagi-info">Showing 1 to 5 of 25 entries</span>
                <div className="od-pagi-btns">
                  <button className="od-pbtn"><ChevronLeft size={14} /></button>
                  <button className="od-pbtn active">1</button>
                  <button className="od-pbtn">2</button>
                  <button className="od-pbtn">3</button>
                  <button className="od-pbtn">4</button>
                  <button className="od-pbtn">5</button>
                  <button className="od-pbtn"><ChevronRight size={14} /></button>
                </div>
              </div>
            </div>
          </div>

          {/* Attention Required */}
          <div className="od-card">
            <div className="od-card-head">
              <h2 className="od-card-title">Attention Required</h2>
              <button className="od-view-all" onClick={() => setViewAllModal('attention')}>View All <ChevronRight size={14} /></button>
            </div>
            <div className="od-attn-list">
              {ATTENTION_REQUIRED.map((item, i) => (
                <div key={i} className="od-attn-row">
                  <div className="od-attn-left">
                    <AlertCircle size={15} className="od-attn-icon" />
                    {item.label}
                  </div>
                  <div className="od-attn-badge">{item.count}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ════════════════════ MODAL ════════════════════ */}
        {viewAllModal && (
          <div className="od-modal-overlay" onClick={() => setViewAllModal(null)}>
            <div className="od-modal-content" onClick={e => e.stopPropagation()}>
              <div className="od-modal-header">
                <h3 className="od-modal-title">{viewAllModal === 'attention' ? 'Attention Required' : 'All Recent Orders'}</h3>
                <button className="od-modal-close" onClick={() => setViewAllModal(null)}><X size={18} /></button>
              </div>
              <div className="od-modal-body">
                <div style={{ overflowY: 'auto', maxHeight: '400px' }}>
                  {viewAllModal === 'attention' ? (
                    <table className="od-table">
                      <thead>
                        <tr>
                          <th>Issue</th>
                          <th style={{ textAlign: 'center' }}>Count</th>
                        </tr>
                      </thead>
                      <tbody>
                        {ATTENTION_REQUIRED.map((r, i) => (
                          <tr key={i}>
                            <td style={{ fontWeight: 700, color: '#0f172a' }}>
                              <AlertCircle size={14} style={{ marginRight: 6, verticalAlign: 'middle', color: '#ef4444' }}/>
                              {r.label}
                            </td>
                            <td style={{ fontWeight: 800, color: '#ef4444', textAlign: 'center' }}>{r.count}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  ) : (
                    <table className="od-table">
                      <thead>
                        <tr>
                          <th>Order ID</th>
                          <th>Booking ID</th>
                          <th>Customer</th>
                          <th>Seller</th>
                          <th>Service Provider</th>
                          <th style={{ textAlign: 'center' }}>Materials</th>
                          <th>Total Amount</th>
                          <th>Payment Status</th>
                          <th>Order Status</th>
                          <th>Delivery Status</th>
                          <th>Order Date</th>
                        </tr>
                      </thead>
                      <tbody>
                        {RECENT_ORDERS.map((r, i) => (
                          <tr key={i}>
                            <td style={{ fontWeight: 700, color: '#2563eb' }}>{r.oid}</td>
                            <td style={{ fontWeight: 600, color: '#64748b' }}>{r.bid}</td>
                            <td style={{ fontWeight: 700, color: '#0f172a' }}>{r.cust}</td>
                            <td style={{ fontWeight: 600, color: '#475569' }}>{r.seller}</td>
                            <td style={{ fontWeight: 600, color: '#475569' }}>{r.sp}</td>
                            <td style={{ textAlign: 'center', fontWeight: 800 }}>{r.mat}</td>
                            <td style={{ fontWeight: 800, color: '#0f172a' }}>&#8377;{r.amt.toLocaleString('en-IN')}</td>
                            <td>{getStatusBadge(r.pay)}</td>
                            <td>{getStatusBadge(r.status)}</td>
                            <td>{getStatusBadge(r.del)}</td>
                            <td>
                              <div style={{ fontWeight: 600, color: '#0f172a' }}>{r.date}</div>
                              <div style={{ fontSize: 10, color: '#94a3b8' }}>{r.time}</div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
      <ExportReportModal isOpen={isExportOpen} onClose={() => setIsExportOpen(false)} entityName="Order Dashboard Report" data={KPI_DATA} />
    </AdminShell>
  );
}