import React, { useState } from 'react';
import {
  Wallet, Clock, UserCircle, CheckCircle2, Building2, CheckSquare,
  Truck, CheckCircle, Percent, Award, Receipt, ShieldCheck, FileText,
  Undo2, BarChart3, TrendingUp, TrendingDown, ChevronDown, ChevronRight,
  ChevronLeft, Info, Download, ArrowDown, Share2, Layers, X, Search
} from 'lucide-react';
import AdminShell from '../../components/layouts/AdminShell';
import StatusBadge from '../../components/common/StatusBadge';
import {
  PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer
} from 'recharts';
import toast from 'react-hot-toast';

/* ═══════════════════════════ MOCK DATA ═══════════════════════════ */

const kpiData = [
  { label: 'Total Booking Payments Received', value: '₹24,58,760', trend: '+12.45%', trendUp: true, icon: Wallet, iconBg: '#eff6ff', iconColor: '#3b82f6' },
  { label: 'Customer Payments Pending', value: '₹3,25,430', trend: '+8.21%', trendUp: true, icon: Clock, iconBg: '#fff7ed', iconColor: '#f97316' },
  { label: 'Service Provider Settlement Pending', value: '₹3,20,110', trend: '+9.84%', trendUp: true, icon: UserCircle, iconBg: '#ecfdf5', iconColor: '#10b981' },
  { label: 'Service Provider Settlement Completed', value: '₹7,05,320', trend: '+15.23%', trendUp: true, icon: CheckCircle2, iconBg: '#ecfdf5', iconColor: '#10b981' },
  { label: 'Seller Settlement Pending', value: '₹2,34,780', trend: '+11.21%', trendUp: true, icon: Building2, iconBg: '#fff7ed', iconColor: '#f97316' },

  { label: 'Seller Settlement Completed', value: '₹6,21,430', trend: '+12.01%', trendUp: true, icon: CheckSquare, iconBg: '#fff7ed', iconColor: '#f97316' },
  { label: 'Delivery Charges Pending', value: '₹40,220', trend: '+6.91%', trendUp: true, icon: Truck, iconBg: '#e0f2fe', iconColor: '#0ea5e9' },
  { label: 'Delivery Charges Collected', value: '₹1,45,980', trend: '+8.91%', trendUp: true, icon: CheckCircle, iconBg: '#e0f2fe', iconColor: '#0ea5e9' },
  { label: 'Platform Fee Collected (18%)', value: '₹3,42,660', trend: '+13.24%', trendUp: true, icon: Percent, iconBg: '#f3e8ff', iconColor: '#8b5cf6' },
  { label: 'Commission Collected (5%)', value: '₹88,480', trend: '+9.21%', trendUp: true, icon: Award, iconBg: '#eff6ff', iconColor: '#3b82f6' },

  { label: 'GST Total Collected', value: '₹1,82,340', trend: '+10.11%', trendUp: true, icon: Receipt, iconBg: '#fef2f2', iconColor: '#ef4444' },
  { label: 'TDS Total Collected', value: '₹68,250', trend: '+6.72%', trendUp: true, icon: ShieldCheck, iconBg: '#fef2f2', iconColor: '#ef4444' },
  { label: 'TCS Total Collected', value: '₹31,420', trend: '+5.63%', trendUp: true, icon: FileText, iconBg: '#fff7ed', iconColor: '#f97316' },
  { label: 'Refund Amount', value: '₹56,230', trend: '+4.32%', trendUp: false, icon: Undo2, iconBg: '#fef2f2', iconColor: '#ef4444', trendColor: '#ef4444' },
  { label: 'Net Platform Revenue', value: '₹1,73,730', trend: '+14.22%', trendUp: true, icon: BarChart3, iconBg: '#ecfdf5', iconColor: '#10b981' },
];

const donutData = [
  { name: 'UPI', value: 845000, color: '#3b82f6' },
  { name: 'Credit Card', value: 675000, color: '#f59e0b' },
  { name: 'Debit Card', value: 410000, color: '#10b981' },
  { name: 'Net Banking', value: 230000, color: '#8b5cf6' },
  { name: 'Wallet', value: 105000, color: '#0ea5e9' },
  { name: 'Cash', value: 95000, color: '#ef4444' },
];

const barData = donutData.map(d => ({
  name: d.name,
  amount: d.value,
  color: d.color,
  label: d.value >= 100000 ? `₹${(d.value/100000).toFixed(2)}L` : `₹${(d.value/1000)}k`
}));

const splitData = [
  { component: 'Service Provider Share', amount: 41.71, pct: 41.71, color: '#10b981' },
  { component: 'Seller Share', amount: 34.83, pct: 34.83, color: '#f59e0b' },
  { component: 'Platform Fee (18%)', amount: 13.94, pct: 13.94, color: '#3b82f6' },
  { component: 'Delivery Charges', amount: 5.93, pct: 5.93, color: '#0ea5e9' },
  { component: 'Commission (5%)', amount: 3.59, pct: 3.59, color: '#f97316' },
];

const spSettlements = [
  { id: 'BK-250601-0001', name: 'RT CLOUD Solutions', payout: '₹1,500', type: 'Instant', status: 'Completed', date: '01 Jun 2026 12:15 PM' },
  { id: 'BK-250601-0002', name: 'Ramu Services', payout: '₹950', type: 'Weekly', status: 'Pending', date: '01 Jun 2026 11:45 AM' },
  { id: 'BK-250601-0003', name: 'Sri Electricals', payout: '₹1,750', type: 'Daily', status: 'Completed', date: '01 Jun 2026 11:30 AM' },
  { id: 'BK-250601-0004', name: 'TechFix Services', payout: '₹1,100', type: 'Weekly', status: 'Pending', date: '01 Jun 2026 12:20 PM' },
  { id: 'BK-250601-0005', name: 'Quick Home Care', payout: '₹2,200', type: 'Instant', status: 'Completed', date: '01 Jun 2026 12:45 PM' },
  { id: 'BK-250601-0006', name: 'Metro Plumbing Co', payout: '₹1,850', type: 'Weekly', status: 'Completed', date: '01 Jun 2026 01:10 PM' },
  { id: 'BK-250601-0007', name: 'Apex Appliance Repair', payout: '₹3,400', type: 'Instant', status: 'Pending', date: '01 Jun 2026 01:30 PM' },
  { id: 'BK-250601-0008', name: 'Urban Cleaners', payout: '₹1,250', type: 'Daily', status: 'Completed', date: '01 Jun 2026 02:00 PM' },
  { id: 'BK-250601-0009', name: 'Safe Locksmiths', payout: '₹800', type: 'Instant', status: 'Completed', date: '01 Jun 2026 02:25 PM' },
  { id: 'BK-250601-0010', name: 'Elite Electricians', payout: '₹2,150', type: 'Weekly', status: 'Pending', date: '01 Jun 2026 02:50 PM' },
];

const sellerSettlements = [
  { id: 'BK-250601-0001', name: 'EBC Enterprise', amt: '₹750', type: 'Weekly', status: 'Completed', date: '01 Jun 2026 12:15 PM' },
  { id: 'BK-250601-0002', name: 'Moti E-marts', amt: '₹420', type: 'Weekly', status: 'Pending', date: '01 Jun 2026 11:45 AM' },
  { id: 'BK-250601-0003', name: 'Sai Home Store', amt: '₹600', type: 'Daily', status: 'Completed', date: '01 Jun 2026 12:05 PM' },
  { id: 'BK-250601-0004', name: 'BuildMart', amt: '₹450', type: 'Manual', status: 'Pending', date: '-' },
  { id: 'BK-250601-0005', name: 'Shree Hardware', amt: '₹800', type: 'On Delivery Confirmation', status: 'Pending', date: '-' },
  { id: 'BK-250601-0006', name: 'Supreme Sanitary', amt: '₹1,350', type: 'Weekly', status: 'Completed', date: '01 Jun 2026 01:15 PM' },
  { id: 'BK-250601-0007', name: 'Royal Electricals', amt: '₹920', type: 'Daily', status: 'Completed', date: '01 Jun 2026 01:40 PM' },
  { id: 'BK-250601-0008', name: 'Kisan Spare Parts', amt: '₹680', type: 'Manual', status: 'Pending', date: '-' },
  { id: 'BK-250601-0009', name: 'Delta Traders', amt: '₹1,150', type: 'Weekly', status: 'Completed', date: '01 Jun 2026 02:10 PM' },
  { id: 'BK-250601-0010', name: 'Vanguard Supplies', amt: '₹540', type: 'Daily', status: 'Pending', date: '01 Jun 2026 02:45 PM' },
];

const deliverySettlements = [
  { id: 'BK-250601-0001', name: 'Gaurav Delivery', charge: '₹150', type: 'Instant', status: 'Completed', date: '01 Jun 2026 12:15 PM' },
  { id: 'BK-250601-0002', name: 'Sabar Delivery', charge: '₹80', type: 'Weekly', status: 'Pending', date: '01 Jun 2026 11:45 AM' },
  { id: 'BK-250601-0003', name: 'Service Provider', charge: '₹250', type: 'Weekly', status: 'Pending', date: '01 Jun 2026 11:30 AM' },
  { id: 'BK-250601-0004', name: 'Sabar Delivery', charge: '₹100', type: 'Weekly', status: 'Pending', date: '-' },
  { id: 'BK-250601-0005', name: 'Service Provider', charge: '₹200', type: 'Instant', status: 'Completed', date: '01 Jun 2026 12:45 PM' },
  { id: 'BK-250601-0006', name: 'Express Logistics', charge: '₹180', type: 'Instant', status: 'Completed', date: '01 Jun 2026 01:10 PM' },
  { id: 'BK-250601-0007', name: 'Swift Delivery', charge: '₹120', type: 'Daily', status: 'Pending', date: '01 Jun 2026 01:50 PM' },
  { id: 'BK-250601-0008', name: 'Gaurav Delivery', charge: '₹90', type: 'Weekly', status: 'Completed', date: '01 Jun 2026 02:15 PM' },
  { id: 'BK-250601-0009', name: 'Urban Express', charge: '₹220', type: 'Instant', status: 'Completed', date: '01 Jun 2026 02:40 PM' },
  { id: 'BK-250601-0010', name: 'Service Provider', charge: '₹160', type: 'Daily', status: 'Pending', date: '-' },
];

const recentBookings = [
  { id: 'BK-250601-0001', order: 'OR-10001', user: 'Ramesh Kumar', cat: 'AC Repair', type: 'UPI', amt: '₹2,500', pStatus: 'Success', pDate: '01 Jun 2026 12:30 PM', txn: 'UPI1234567890', method: 'UPI', spType: 'Instant', sellerType: 'Weekly', tAmt: '₹2,500', status: 'Completed' },
  { id: 'BK-250601-0002', order: 'OR-10002', user: 'Sunita Devi', cat: 'Plumbing', type: 'Credit Card', amt: '₹1,000', pStatus: 'Success', pDate: '01 Jun 2026 11:15 AM', txn: 'CC9876543210', method: 'Credit Card', spType: 'Weekly', sellerType: 'Weekly', tAmt: '₹1,000', status: 'Completed' },
  { id: 'BK-250601-0003', order: 'OR-10003', user: 'Arun Singh', cat: 'Electrical', type: 'Wallet', amt: '₹3,200', pStatus: 'Success', pDate: '01 Jun 2026 11:45 AM', txn: 'WL5566677788', method: 'Wallet', spType: 'Daily', sellerType: 'Daily', tAmt: '₹3,200', status: 'Completed' },
  { id: 'BK-250601-0004', order: 'OR-10004', user: 'Pooja Patel', cat: 'Cleaning', type: 'Net Banking', amt: '₹2,100', pStatus: 'Success', pDate: '01 Jun 2026 12:20 PM', txn: 'NB1122334455', method: 'Net Banking', spType: 'Weekly', sellerType: 'Manual', tAmt: '₹2,100', status: 'Completed' },
  { id: 'BK-250601-0005', order: 'OR-10005', user: 'Vikram Rao', cat: 'Appliance Repair', type: 'UPI', amt: '₹4,300', pStatus: 'Pending', pDate: '01 Jun 2026 12:40 PM', txn: 'UPI9988776655', method: 'UPI', spType: 'Instant', sellerType: 'On Delivery Confirmation', tAmt: '₹4,300', status: 'Pending' },
  { id: 'BK-250601-0006', order: 'OR-10006', user: 'Ananya Sharma', cat: 'Painting', type: 'Credit Card', amt: '₹8,500', pStatus: 'Success', pDate: '01 Jun 2026 01:15 PM', txn: 'CC4433221100', method: 'Credit Card', spType: 'Instant', sellerType: 'Weekly', tAmt: '₹8,500', status: 'Completed' },
  { id: 'BK-250601-0007', order: 'OR-10007', user: 'Manish Verma', cat: 'Pest Control', type: 'UPI', amt: '₹1,800', pStatus: 'Success', pDate: '01 Jun 2026 01:45 PM', txn: 'UPI7766554433', method: 'UPI', spType: 'Daily', sellerType: 'Daily', tAmt: '₹1,800', status: 'Completed' },
  { id: 'BK-250601-0008', order: 'OR-10008', user: 'Kavita Joshi', cat: 'Carpentry', type: 'Net Banking', amt: '₹3,600', pStatus: 'Pending', pDate: '01 Jun 2026 02:10 PM', txn: 'NB9988112233', method: 'Net Banking', spType: 'Weekly', sellerType: 'Manual', tAmt: '₹3,600', status: 'Pending' },
  { id: 'BK-250601-0009', order: 'OR-10009', user: 'Sanjay Dutt', cat: 'Plumbing', type: 'Wallet', amt: '₹1,450', pStatus: 'Success', pDate: '01 Jun 2026 02:30 PM', txn: 'WL1144778899', method: 'Wallet', spType: 'Instant', sellerType: 'Weekly', tAmt: '₹1,450', status: 'Completed' },
  { id: 'BK-250601-0010', order: 'OR-10010', user: 'Deepak Mishra', cat: 'AC Service', type: 'UPI', amt: '₹2,900', pStatus: 'Success', pDate: '01 Jun 2026 03:00 PM', txn: 'UPI3322114455', method: 'UPI', spType: 'Daily', sellerType: 'Daily', tAmt: '₹2,900', status: 'Completed' },
];

/* ═══════════════════════════ COMPONENTS ═══════════════════════════ */

const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');

  .pd-root {
    font-family: 'Inter', -apple-system, sans-serif;
    background: #f8fafc;
    min-height: 100%;
    color: #0f172a;
    padding-bottom: 24px;
  }
  
  /* Filter Bar */
  .pd-filters {
    background: #fff;
    border: 1px solid #e8edf3;
    border-radius: 12px;
    padding: 16px;
    margin-bottom: 20px;
    box-shadow: 0 1px 4px rgba(15,23,42,0.03);
  }
  .pd-filter-row {
    display: flex; gap: 12px; align-items: flex-end; flex-wrap: wrap; margin-bottom: 12px;
  }
  .pd-filter-row:last-child { margin-bottom: 0; }
  .pd-filter-label { font-size: 11px; font-weight: 600; color: #64748b; margin-bottom: 6px; display: block; }
  .pd-select-wrap { position: relative; }
  .pd-select {
    appearance: none; background: #fff; border: 1.5px solid #e2e8f0; border-radius: 8px;
    padding: 8px 30px 8px 12px; font-size: 13px; font-weight: 600; color: #1e293b;
    outline: none; cursor: pointer; font-family: 'Inter', sans-serif;
    transition: all 0.2s;
  }
  .pd-select:focus { border-color: #3b82f6; }
  .pd-arr { position: absolute; right: 10px; top: 50%; transform: translateY(-50%); color: #64748b; pointer-events: none; }
  
  .pd-pbtn {
    background: #fff; border: 1.5px solid #e2e8f0; padding: 8px 16px; font-size: 12px; font-weight: 600; color: #64748b; cursor: pointer; transition: all 0.2s;
  }
  .pd-pbtn:first-child { border-radius: 8px 0 0 8px; border-right: none; }
  .pd-pbtn:last-child { border-radius: 0 8px 8px 0; border-left: none; }
  .pd-pbtn:not(:first-child):not(:last-child) { border-right: none; }
  .pd-pbtn.active { background: #0f172a; color: #fff; border-color: #0f172a; border-right: 1.5px solid #0f172a; }
  
  .pd-btn-apply { background: #0f172a; color: #fff; border: none; border-radius: 8px; padding: 8px 24px; font-size: 13px; font-weight: 600; cursor: pointer; transition: 0.2s; }
  .pd-btn-apply:hover { opacity: 0.9; }
  .pd-btn-reset { background: #fff; color: #0f172a; border: 1.5px solid #e2e8f0; border-radius: 8px; padding: 8px 24px; font-size: 13px; font-weight: 600; cursor: pointer; transition: 0.2s; }
  .pd-btn-reset:hover { background: #f8fafc; }

  /* KPI Grid 5x3 */
  .pd-kpi-grid {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: 16px;
    margin-bottom: 24px;
  }
  .pd-kpi-card {
    background: #fff; border: 1px solid #e8edf3; border-radius: 12px; padding: 16px;
    box-shadow: 0 1px 4px rgba(15,23,42,0.03); display: flex; align-items: flex-start; gap: 12px;
  }
  .pd-kpi-icon { width: 40px; height: 40px; border-radius: 10px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
  .pd-kpi-body { flex: 1; min-width: 0; }
  .pd-kpi-label { font-size: 11px; font-weight: 600; color: #64748b; margin-bottom: 6px; line-height: 1.3; }
  .pd-kpi-val { font-size: 18px; font-weight: 800; color: #0f172a; margin-bottom: 4px; }
  .pd-kpi-trend { font-size: 11px; font-weight: 600; display: inline-flex; align-items: center; gap: 2px; }
  .pd-kpi-vs { color: #94a3b8; font-size: 10px; margin-left: 2px; font-weight: 500; }

  /* 4-Col Analytics Row */
  .pd-4col-row {
    display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 16px; margin-bottom: 24px;
  }
  .pd-card {
    background: #fff; border: 1px solid #e8edf3; border-radius: 12px;
    box-shadow: 0 1px 4px rgba(15,23,42,0.03); display: flex; flex-direction: column; overflow: hidden;
  }
  .pd-card-header { padding: 16px 16px 12px; border-bottom: 1px solid #f1f5f9; }
  .pd-card-title { font-size: 14px; font-weight: 700; color: #0f172a; margin: 0; }
  .pd-card-sub { font-size: 11px; color: #64748b; font-weight: 500; margin-top: 2px; }
  .pd-card-body { padding: 16px; flex: 1; }

  /* Donut specific */
  .pd-donut-wrap { position: relative; display: flex; justify-content: center; }
  .pd-donut-center { position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); text-align: center; }
  .pd-donut-val { font-size: 16px; font-weight: 800; color: #0f172a; display: block; }
  .pd-donut-lbl { font-size: 10px; color: #64748b; font-weight: 600; }
  
  .pd-legend-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 8px 12px; margin-top: 16px; }
  .pd-legend-item { display: flex; align-items: center; gap: 6px; font-size: 10.5px; font-weight: 600; }
  .pd-legend-dot { width: 8px; height: 8px; border-radius: 2px; flex-shrink: 0; }
  
  /* Split Table */
  .pd-split-table { width: 100%; border-collapse: collapse; font-size: 11.5px; table-layout: fixed; }
  .pd-split-table th { 
    text-align: left; padding: 10px 8px; font-weight: 600; color: #64748b !important; 
    border-bottom: 1px solid #e2e8f0; background: #fff !important; text-transform: none !important;
    white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
  }
  .pd-split-table td { padding: 10px 8px; font-weight: 600; border-bottom: 1px solid #f1f5f9; color: #334155; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
  .pd-split-table tr:last-child td { border-bottom: none; }

  /* Settlement Flow */
  .pd-flow-wrap { display: flex; flex-direction: column; gap: 6px; height: 100%; justify-content: center; }
  .pd-flow-box { background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 12px; display: flex; align-items: flex-start; gap: 10px; }
  .pd-flow-num { width: 18px; height: 18px; border-radius: 50%; background: #e0e7ff; color: #4f46e5; font-size: 10px; font-weight: 800; display: flex; align-items: center; justify-content: center; flex-shrink: 0; margin-top: 2px; }
  .pd-flow-title { font-size: 11.5px; font-weight: 700; color: #0f172a; margin-bottom: 2px; }
  .pd-flow-desc { font-size: 10.5px; color: #64748b; font-weight: 500; line-height: 1.3; }
  .pd-flow-arr { display: flex; justify-content: center; color: #cbd5e1; margin: -2px 0; }
  .pd-flow-split { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; }
  .pd-flow-box-sm { background: #fff; border: 1px solid #e2e8f0; border-radius: 8px; padding: 10px; text-align: center; box-shadow: 0 1px 2px rgba(0,0,0,0.02); }

  /* 3-Col Settlements Row */
  .pd-3col-row { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 16px; margin-bottom: 24px; }
  .pd-settle-table { width: 100%; border-collapse: collapse; font-size: 11px; }
  .pd-settle-table th { 
    text-align: left; padding: 10px 8px; font-weight: 600; color: #64748b !important; 
    border-bottom: 1.5px solid #e2e8f0; white-space: nowrap; position: sticky; top: 0; 
    background: #fff !important; text-transform: none !important; z-index: 10;
  }
  .pd-settle-table td { padding: 10px 8px; border-bottom: 1px solid #f1f5f9; color: #0f172a; font-weight: 500; }
  
  .pd-card-footer { border-top: 1px solid #e2e8f0; padding: 12px 16px; display: flex; justify-content: space-between; align-items: center; background: #fafbfc; border-radius: 0 0 12px 12px; }
  .pd-footer-stat { display: flex; flex-direction: column; }
  .pd-footer-lbl { font-size: 10.5px; color: #64748b; font-weight: 600; margin-bottom: 2px; }
  .pd-footer-val { font-size: 14px; color: #0f172a; font-weight: 700; }
  .pd-view-all { font-size: 11.5px; font-weight: 700; color: #3b82f6; text-decoration: none; display: flex; align-items: center; gap: 2px; cursor: pointer; border: none; background: transparent; }
  .pd-view-all:hover { text-decoration: underline; }

  /* Full Width Table */
  .pd-full-table-wrap { 
    overflow-x: auto !important; 
    overflow-y: visible !important; 
    width: 100%; 
    padding-bottom: 10px;
    margin-bottom: 4px;
  }
  .pd-full-table-wrap::-webkit-scrollbar {
    height: 8px;
  }
  .pd-full-table-wrap::-webkit-scrollbar-track {
    background: #f1f5f9;
    border-radius: 4px;
  }
  .pd-full-table-wrap::-webkit-scrollbar-thumb {
    background: #cbd5e1;
    border-radius: 4px;
  }
  .pd-full-table-wrap::-webkit-scrollbar-thumb:hover {
    background: #94a3b8;
  }
  .pd-full-table { 
    width: 100%; 
    border-collapse: collapse; 
    font-size: 11.5px; 
    min-width: 1350px; 
  }
  .pd-full-table th { 
    text-align: left; 
    padding: 10px 12px !important; 
    font-weight: 600; 
    color: #64748b !important; 
    border-bottom: 1.5px solid #e2e8f0; 
    white-space: nowrap !important; 
    background: #f8fafc !important; 
    text-transform: none !important;
  }
  .pd-full-table td { 
    padding: 11px 12px !important; 
    border-bottom: 1px solid #f1f5f9; 
    color: #0f172a; 
    font-weight: 500; 
    white-space: nowrap !important; 
  }
  
  /* Footer Note & Button */
  .pd-bottom-bar { display: flex; justify-content: space-between; align-items: center; margin-top: 10px; flex-wrap: wrap; gap: 16px; }
  .pd-note { display: flex; align-items: center; gap: 8px; font-size: 11.5px; font-weight: 500; color: #475569; background: #f1f5f9; padding: 8px 12px; border-radius: 8px; }
  .pd-export-btn { background: #0f172a; color: #fff; display: flex; align-items: center; gap: 6px; padding: 10px 20px; border-radius: 8px; font-size: 13px; font-weight: 600; border: none; cursor: pointer; box-shadow: 0 4px 6px -1px rgba(15,23,42,0.1); }
  .pd-export-btn:hover { background: #1e293b; }

  @media (max-width: 1400px) {
    .pd-kpi-grid { grid-template-columns: repeat(3, 1fr); }
    .pd-4col-row { grid-template-columns: repeat(2, 1fr); }
    .pd-3col-row { grid-template-columns: 1fr; }
  }
  @media (max-width: 900px) {
    .pd-kpi-grid { grid-template-columns: repeat(2, 1fr); }
    .pd-4col-row { grid-template-columns: 1fr; }
  }
  @media (max-width: 600px) {
    .pd-kpi-grid { grid-template-columns: 1fr; }
  }
`;

function KPI({ data }) {
  const isPos = data.trend.startsWith('+');
  const tColor = data.trendColor || (isPos ? '#16a34a' : '#ef4444');
  return (
    <div className="pd-kpi-card">
      <div className="pd-kpi-icon" style={{ background: data.iconBg }}>
        <data.icon size={20} color={data.iconColor} />
      </div>
      <div className="pd-kpi-body">
        <div className="pd-kpi-label">{data.label}</div>
        <div className="pd-kpi-val">{data.value}</div>
        <div className="pd-kpi-trend" style={{ color: tColor }}>
          {isPos ? <TrendingUp size={11} /> : <TrendingDown size={11} />}
          {data.trend} <span className="pd-kpi-vs">vs Apr 2026</span>
        </div>
      </div>
    </div>
  );
}

export default function PaymentDashboard() {
  const [period, setPeriod] = useState('Monthly');
  const [activeModal, setActiveModal] = useState(null); // 'sp' | 'seller' | 'delivery' | 'recent'
  const [modalSearch, setModalSearch] = useState('');

  return (
    <AdminShell
      activeTab="Payment Dashboard"
      pageTitle="Payment Dashboard"
      pageSubtitle=""
      showGlobalExport={true}
    >
      <div className="pd-root">
        <style>{CSS}</style>

        {/* 1. FILTER BAR */}
        <div className="pd-filters">
          <div className="pd-filter-row">
            <div style={{ flex: 1, minWidth: 150 }}>
              <span className="pd-filter-label">State</span>
              <div className="pd-select-wrap">
                <select className="pd-select" style={{ width: '100%' }}><option>All States</option></select>
                <ChevronDown size={14} className="pd-arr" />
              </div>
            </div>
            <div style={{ flex: 1, minWidth: 150 }}>
              <span className="pd-filter-label">City</span>
              <div className="pd-select-wrap">
                <select className="pd-select" style={{ width: '100%' }}><option>All Cities</option></select>
                <ChevronDown size={14} className="pd-arr" />
              </div>
            </div>
            <div style={{ flex: 1, minWidth: 150 }}>
              <span className="pd-filter-label">District</span>
              <div className="pd-select-wrap">
                <select className="pd-select" style={{ width: '100%' }}><option>All Districts</option></select>
                <ChevronDown size={14} className="pd-arr" />
              </div>
            </div>

            <div style={{ display: 'flex', marginLeft: 'auto' }}>
              {['Daily','Weekly','Monthly','Yearly'].map(p => (
                <button key={p} className={`pd-pbtn ${period===p?'active':''}`} onClick={() => setPeriod(p)}>{p}</button>
              ))}
            </div>
            
            {period === 'Monthly' && (
              <div className="pd-select-wrap" style={{ width: 100 }}>
                <select className="pd-select" style={{ width: '100%' }}><option>May</option></select>
                <ChevronDown size={14} className="pd-arr" />
              </div>
            )}
            {(period === 'Monthly' || period === 'Yearly') && (
              <div className="pd-select-wrap" style={{ width: 100 }}>
                <select className="pd-select" style={{ width: '100%' }}><option>2026</option></select>
                <ChevronDown size={14} className="pd-arr" />
              </div>
            )}

            <button className="pd-btn-apply" onClick={() => toast.success('Filters Applied')}>Apply</button>
            <button className="pd-btn-reset">Reset</button>
          </div>

          <div className="pd-filter-row">
            <div style={{ flex: 1, minWidth: 180, maxWidth: 250 }}>
              <span className="pd-filter-label">Service Category</span>
              <div className="pd-select-wrap">
                <select className="pd-select" style={{ width: '100%' }}><option>All Service Categories</option></select>
                <ChevronDown size={14} className="pd-arr" />
              </div>
            </div>
            <div style={{ flex: 1, minWidth: 180, maxWidth: 250 }}>
              <span className="pd-filter-label">Sub Category</span>
              <div className="pd-select-wrap">
                <select className="pd-select" style={{ width: '100%' }}><option>All Sub Categories</option></select>
                <ChevronDown size={14} className="pd-arr" />
              </div>
            </div>
            <div style={{ flex: 1, minWidth: 150, maxWidth: 200 }}>
              <span className="pd-filter-label">Location Type</span>
              <div className="pd-select-wrap">
                <select className="pd-select" style={{ width: '100%' }}><option>All</option></select>
                <ChevronDown size={14} className="pd-arr" />
              </div>
            </div>
          </div>
        </div>

        {/* 2. KPI GRID (5x3) */}
        <div className="pd-kpi-grid">
          {kpiData.map((d, i) => <KPI key={i} data={d} />)}
        </div>

        {/* 3. 4-COL ANALYTICS ROW */}
        <div className="pd-4col-row">
          
          {/* Customer Payment Types */}
          <div className="pd-card">
            <div className="pd-card-header">
              <h3 className="pd-card-title">Customer Payment Types <span style={{color: '#64748b', fontSize: 12, fontWeight: 500}}>(By Amount)</span></h3>
            </div>
            <div className="pd-card-body" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <div className="pd-donut-wrap">
                <PieChart width={160} height={160}>
                  <Pie data={donutData} cx={80} cy={80} innerRadius={50} outerRadius={75} stroke="none" dataKey="value" startAngle={90} endAngle={-270}>
                    {donutData.map((entry, index) => <Cell key={index} fill={entry.color} />)}
                  </Pie>
                </PieChart>
                <div className="pd-donut-center">
                  <span className="pd-donut-lbl">Total</span>
                  <span className="pd-donut-val">₹24,58,760</span>
                </div>
              </div>
              <div className="pd-legend-grid">
                {donutData.map(d => (
                  <div key={d.name} className="pd-legend-item">
                    <span className="pd-legend-dot" style={{ background: d.color }}></span>
                    <span style={{ color: '#0f172a' }}>{d.name}</span>
                    <span style={{ color: '#64748b', fontWeight: 500, fontSize: 9 }}>₹{(d.value/100000).toFixed(2)}L ({(d.value/2458760*100).toFixed(2)}%)</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Amount by Payment Type */}
          <div className="pd-card">
            <div className="pd-card-header">
              <h3 className="pd-card-title">Amount by Payment Type</h3>
            </div>
            <div className="pd-card-body" style={{ padding: '24px 16px 16px', display: 'flex', alignItems: 'flex-end' }}>
              <ResponsiveContainer width="100%" height={220}>
                <BarChart data={barData} margin={{ top: 15, right: 0, left: -25, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="name" tick={{ fontSize: 9, fill: '#64748b', fontWeight: 600 }} axisLine={false} tickLine={false} interval={0} />
                  <YAxis tick={{ fontSize: 10, fill: '#64748b' }} axisLine={false} tickLine={false} tickFormatter={(v) => `₹${v/100000}L`} />
                  <Bar dataKey="amount" radius={[4,4,0,0]} barSize={24}>
                    {barData.map((entry, index) => (
                      <Cell key={index} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Booking-wise Split */}
          <div className="pd-card">
            <div className="pd-card-header">
              <h3 className="pd-card-title">Booking-wise Payment Split <span style={{color: '#64748b', fontSize: 11, fontWeight: 500}}>(How ₹100 from a booking is distributed)</span></h3>
            </div>
            <div className="pd-card-body" style={{ padding: '0 16px', overflowX: 'auto' }}>
              <table className="pd-split-table" style={{ marginTop: 10 }}>
                <thead>
                  <tr>
                    <th>Component</th>
                    <th style={{ textAlign: 'right' }}>Amount (₹)</th>
                    <th style={{ textAlign: 'right' }}>Percentage (%)</th>
                  </tr>
                </thead>
                <tbody>
                  {splitData.map((s, i) => (
                    <tr key={i}>
                      <td>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                          <span style={{ width: 8, height: 8, borderRadius: '50%', background: s.color }}></span>
                          {s.component}
                        </div>
                      </td>
                      <td style={{ textAlign: 'right' }}>{s.amount.toFixed(2)}</td>
                      <td style={{ textAlign: 'right' }}>{s.pct.toFixed(2)}</td>
                    </tr>
                  ))}
                  <tr>
                    <td style={{ color: '#0f172a', fontWeight: 800 }}>Total</td>
                    <td style={{ textAlign: 'right', color: '#0f172a', fontWeight: 800 }}>100.00</td>
                    <td style={{ textAlign: 'right', color: '#0f172a', fontWeight: 800 }}>100.00</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Flow Diagram */}
          <div className="pd-card">
            <div className="pd-card-header">
              <h3 className="pd-card-title">Payment & Settlement Flow</h3>
            </div>
            <div className="pd-card-body">
              <div className="pd-flow-wrap">
                <div className="pd-flow-box">
                  <div className="pd-flow-num" style={{ background: '#dcfce7', color: '#16a34a' }}><CheckCircle2 size={12} /></div>
                  <div>
                    <div className="pd-flow-title">1. Customer Payment Received</div>
                    <div className="pd-flow-desc">From customer via chosen method</div>
                  </div>
                </div>
                <div className="pd-flow-arr"><ArrowDown size={16} /></div>
                
                <div className="pd-flow-box">
                  <div className="pd-flow-num" style={{ background: '#f3e8ff', color: '#8b5cf6' }}><Share2 size={10} /></div>
                  <div>
                    <div className="pd-flow-title">2. Amount Split Automatically</div>
                    <div className="pd-flow-desc">Platform Fee, Commission, GST, TDS, TCS, Delivery Charges, SP & Seller share</div>
                  </div>
                </div>
                <div className="pd-flow-arr"><ArrowDown size={16} /></div>

                <div className="pd-flow-box">
                  <div className="pd-flow-num" style={{ background: '#e0f2fe', color: '#0ea5e9' }}><Layers size={10} /></div>
                  <div>
                    <div className="pd-flow-title">3. Settlement Queued</div>
                    <div className="pd-flow-desc">Based on settlement type & cycle</div>
                  </div>
                </div>
                <div className="pd-flow-arr"><ArrowDown size={16} /></div>

                <div className="pd-flow-split">
                  <div className="pd-flow-box-sm">
                    <div style={{ color: '#10b981', fontWeight: 700, fontSize: 10, marginBottom: 4 }}><UserCircle size={14} style={{ marginBottom: -3, marginRight: 2 }}/>4A. Service Provider</div>
                    <div className="pd-flow-title" style={{ fontSize: 10 }}>Payout to Service Provider</div>
                  </div>
                  <div className="pd-flow-box-sm">
                    <div style={{ color: '#f97316', fontWeight: 700, fontSize: 10, marginBottom: 4 }}><Building2 size={14} style={{ marginBottom: -3, marginRight: 2 }}/>4B. Seller</div>
                    <div className="pd-flow-title" style={{ fontSize: 10 }}>Payout to Seller</div>
                  </div>
                </div>
                <div className="pd-flow-arr"><ArrowDown size={16} /></div>

                <div className="pd-flow-box" style={{ padding: '8px 12px' }}>
                  <div className="pd-flow-num" style={{ background: '#16a34a', color: '#fff', padding: 2 }}><CheckCircle2 size={14} /></div>
                  <div>
                    <div className="pd-flow-title">5. Completed</div>
                    <div className="pd-flow-desc">Settlement completed & recorded</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* 4. 3-COL SETTLEMENTS ROW */}
        <div className="pd-3col-row">
          
          <div className="pd-card">
            <div className="pd-card-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3 className="pd-card-title">Service Provider Settlements</h3>
              <button className="pd-view-all" onClick={() => { setActiveModal('sp'); setModalSearch(''); }}>View All</button>
            </div>
            <div className="pd-card-body" style={{ padding: 0, overflowX: 'auto', maxHeight: 220, overflowY: 'auto' }}>
              <table className="pd-settle-table">
                <thead>
                  <tr>
                    <th>Booking ID</th>
                    <th>Service Provider</th>
                    <th>Payout Amt</th>
                    <th>Settlement Type</th>
                    <th>Status</th>
                    <th>Settlement Date</th>
                  </tr>
                </thead>
                <tbody>
                  {spSettlements.slice(0, 5).map((r, i) => (
                    <tr key={i}>
                      <td style={{ color: '#3b82f6', fontWeight: 600 }}>{r.id}</td>
                      <td>{r.name}</td>
                      <td style={{ fontWeight: 700 }}>{r.payout}</td>
                      <td>{r.type}</td>
                      <td><StatusBadge status={r.status} /></td>
                      <td style={{ color: '#64748b' }}>{r.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="pd-card-footer">
              <div className="pd-footer-stat">
                <span className="pd-footer-lbl">Total Pending Amount</span>
                <span className="pd-footer-val">₹3,20,110</span>
              </div>
              <div className="pd-footer-stat">
                <span className="pd-footer-lbl">Total Transactions</span>
                <span className="pd-footer-val">138</span>
              </div>
            </div>
          </div>

          <div className="pd-card">
            <div className="pd-card-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3 className="pd-card-title">Seller Settlements</h3>
              <button className="pd-view-all" onClick={() => { setActiveModal('seller'); setModalSearch(''); }}>View All</button>
            </div>
            <div className="pd-card-body" style={{ padding: 0, overflowX: 'auto', maxHeight: 220, overflowY: 'auto' }}>
              <table className="pd-settle-table">
                <thead>
                  <tr>
                    <th>Booking ID</th>
                    <th>Seller</th>
                    <th>Material Amount</th>
                    <th>Settlement Type</th>
                    <th>Status</th>
                    <th>Settlement Date</th>
                  </tr>
                </thead>
                <tbody>
                  {sellerSettlements.slice(0, 5).map((r, i) => (
                    <tr key={i}>
                      <td style={{ color: '#3b82f6', fontWeight: 600 }}>{r.id}</td>
                      <td>{r.name}</td>
                      <td style={{ fontWeight: 700 }}>{r.amt}</td>
                      <td>{r.type}</td>
                      <td><StatusBadge status={r.status} /></td>
                      <td style={{ color: '#64748b' }}>{r.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="pd-card-footer">
              <div className="pd-footer-stat">
                <span className="pd-footer-lbl">Total Pending Amount</span>
                <span className="pd-footer-val">₹2,34,780</span>
              </div>
              <div className="pd-footer-stat">
                <span className="pd-footer-lbl">Total Transactions</span>
                <span className="pd-footer-val">122</span>
              </div>
            </div>
          </div>

          <div className="pd-card">
            <div className="pd-card-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3 className="pd-card-title">Delivery Charges Settlements</h3>
              <button className="pd-view-all" onClick={() => { setActiveModal('delivery'); setModalSearch(''); }}>View All</button>
            </div>
            <div className="pd-card-body" style={{ padding: 0, overflowX: 'auto', maxHeight: 220, overflowY: 'auto' }}>
              <table className="pd-settle-table">
                <thead>
                  <tr>
                    <th>Booking ID</th>
                    <th>Delivered By</th>
                    <th>Delivery Charge</th>
                    <th>Settlement Type</th>
                    <th>Status</th>
                    <th>Settlement Date</th>
                  </tr>
                </thead>
                <tbody>
                  {deliverySettlements.slice(0, 5).map((r, i) => (
                    <tr key={i}>
                      <td style={{ color: '#3b82f6', fontWeight: 600 }}>{r.id}</td>
                      <td>{r.name}</td>
                      <td style={{ fontWeight: 700 }}>{r.charge}</td>
                      <td>{r.type}</td>
                      <td><StatusBadge status={r.status} /></td>
                      <td style={{ color: '#64748b' }}>{r.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="pd-card-footer">
              <div className="pd-footer-stat">
                <span className="pd-footer-lbl">Total Pending Amount</span>
                <span className="pd-footer-val">₹40,220</span>
              </div>
              <div className="pd-footer-stat">
                <span className="pd-footer-lbl">Total Transactions</span>
                <span className="pd-footer-val">96</span>
              </div>
            </div>
          </div>

        </div>

        {/* 5. FULL WIDTH TABLE */}
        <div className="pd-card" style={{ marginBottom: 16 }}>
          <div className="pd-card-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h3 className="pd-card-title">Recent Booking Payments <span style={{color: '#64748b', fontSize: 12, fontWeight: 500}}>(Customer Payments)</span></h3>
            <button className="pd-view-all" onClick={() => { setActiveModal('recent'); setModalSearch(''); }}>View All</button>
          </div>
          <div className="pd-full-table-wrap" style={{ position: 'relative' }}>
            <table className="pd-full-table">
              <thead>
                <tr>
                  <th>Booking ID</th>
                  <th>Order ID</th>
                  <th>Customer</th>
                  <th>Service Category</th>
                  <th>Payment Type</th>
                  <th>Amount (₹)</th>
                  <th>Payment Status</th>
                  <th>Payment Date & Time</th>
                  <th>Transaction ID</th>
                  <th>Payment Method</th>
                  <th>SP Settlement Type</th>
                  <th>Seller Settlement Type</th>
                  <th style={{ textAlign: 'right' }}>Total Amount (₹)</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {recentBookings.slice(0, 5).map((r, i) => (
                  <tr key={i}>
                    <td style={{ color: '#3b82f6', fontWeight: 600 }}>{r.id}</td>
                    <td style={{ color: '#3b82f6', fontWeight: 600 }}>{r.order}</td>
                    <td style={{ fontWeight: 600 }}>{r.user}</td>
                    <td>{r.cat}</td>
                    <td>{r.type}</td>
                    <td style={{ fontWeight: 700 }}>{r.amt}</td>
                    <td><span style={{ color: r.pStatus==='Success'?'#16a34a':'#f59e0b', fontWeight: 600 }}>{r.pStatus}</span></td>
                    <td style={{ color: '#64748b' }}>{r.pDate}</td>
                    <td style={{ fontFamily: 'monospace', fontSize: 11, color: '#64748b' }}>{r.txn}</td>
                    <td>{r.method}</td>
                    <td>{r.spType}</td>
                    <td>{r.sellerType}</td>
                    <td style={{ textAlign: 'right', fontWeight: 700 }}>{r.tAmt}</td>
                    <td><StatusBadge status={r.status} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* 6. FOOTER INFO & EXPORT */}
        <div className="pd-bottom-bar">
          <div className="pd-note">
            <Info size={16} color="#3b82f6" />
            Note: All amounts are in INR. Payments received from customers include Advance, Partial, and Full payments. Service Provider and Seller settlements are processed according to the selected settlement cycle.
          </div>
          <button className="pd-export-btn" onClick={() => toast.success('Exporting report...')}>
            <Download size={16} /> Export Reports <ChevronDown size={16} />
          </button>
        </div>

        {/* 7. VIEW ALL MODAL POPUP */}
        {activeModal && (
          <div 
            onClick={() => setActiveModal(null)}
            style={{
              position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh',
              background: 'rgba(15, 23, 42, 0.65)', backdropFilter: 'blur(4px)',
              zIndex: 99999, display: 'flex', alignItems: 'center', justifyContent: 'center',
              padding: 20
            }}
          >
            <div 
              onClick={e => e.stopPropagation()}
              style={{
                background: '#fff', borderRadius: 16, width: '100%', maxWidth: 1100,
                maxHeight: '85vh', display: 'flex', flexDirection: 'column',
                boxShadow: '0 25px 50px -12px rgba(0,0,0,0.25)', overflow: 'hidden'
              }}
            >
              {/* Modal Header */}
              <div style={{ padding: '18px 24px', borderBottom: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#fafbfc' }}>
                <div>
                  <h3 style={{ margin: 0, fontSize: 16, fontWeight: 700, color: '#0f172a' }}>
                    {activeModal === 'sp' && 'All Service Provider Settlements'}
                    {activeModal === 'seller' && 'All Seller Settlements'}
                    {activeModal === 'delivery' && 'All Delivery Charges Settlements'}
                    {activeModal === 'recent' && 'All Recent Booking Payments'}
                  </h3>
                  <span style={{ fontSize: 12, color: '#64748b', fontWeight: 500 }}>
                    Detailed records & status breakdown
                  </span>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div style={{ position: 'relative' }}>
                    <Search size={14} style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
                    <input 
                      type="text"
                      placeholder="Search records..."
                      value={modalSearch}
                      onChange={e => setModalSearch(e.target.value)}
                      style={{
                        padding: '6px 12px 6px 30px', fontSize: 12, borderRadius: 8,
                        border: '1.5px solid #e2e8f0', outline: 'none', width: 200,
                        fontFamily: 'Inter, sans-serif'
                      }}
                    />
                  </div>

                  <button 
                    onClick={() => setActiveModal(null)}
                    style={{ background: '#f1f5f9', border: 'none', color: '#64748b', borderRadius: '50%', width: 32, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
                  >
                    <X size={16} />
                  </button>
                </div>
              </div>

              {/* Modal Content Table */}
              <div style={{ padding: 20, overflowY: 'auto', flex: 1 }}>
                {activeModal === 'sp' && (
                  <table className="pd-settle-table" style={{ width: '100%' }}>
                    <thead>
                      <tr>
                        <th>Booking ID</th>
                        <th>Service Provider</th>
                        <th>Payout Amt</th>
                        <th>Settlement Type</th>
                        <th>Status</th>
                        <th>Settlement Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {spSettlements
                        .filter(r => r.id.toLowerCase().includes(modalSearch.toLowerCase()) || r.name.toLowerCase().includes(modalSearch.toLowerCase()) || r.type.toLowerCase().includes(modalSearch.toLowerCase()))
                        .map((r, i) => (
                          <tr key={i}>
                            <td style={{ color: '#3b82f6', fontWeight: 600 }}>{r.id}</td>
                            <td style={{ fontWeight: 600 }}>{r.name}</td>
                            <td style={{ fontWeight: 700 }}>{r.payout}</td>
                            <td>{r.type}</td>
                            <td><StatusBadge status={r.status} /></td>
                            <td style={{ color: '#64748b' }}>{r.date}</td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                )}

                {activeModal === 'seller' && (
                  <table className="pd-settle-table" style={{ width: '100%' }}>
                    <thead>
                      <tr>
                        <th>Booking ID</th>
                        <th>Seller</th>
                        <th>Material Amount</th>
                        <th>Settlement Type</th>
                        <th>Status</th>
                        <th>Settlement Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {sellerSettlements
                        .filter(r => r.id.toLowerCase().includes(modalSearch.toLowerCase()) || r.name.toLowerCase().includes(modalSearch.toLowerCase()) || r.type.toLowerCase().includes(modalSearch.toLowerCase()))
                        .map((r, i) => (
                          <tr key={i}>
                            <td style={{ color: '#3b82f6', fontWeight: 600 }}>{r.id}</td>
                            <td style={{ fontWeight: 600 }}>{r.name}</td>
                            <td style={{ fontWeight: 700 }}>{r.amt}</td>
                            <td>{r.type}</td>
                            <td><StatusBadge status={r.status} /></td>
                            <td style={{ color: '#64748b' }}>{r.date}</td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                )}

                {activeModal === 'delivery' && (
                  <table className="pd-settle-table" style={{ width: '100%' }}>
                    <thead>
                      <tr>
                        <th>Booking ID</th>
                        <th>Delivered By</th>
                        <th>Delivery Charge</th>
                        <th>Settlement Type</th>
                        <th>Status</th>
                        <th>Settlement Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {deliverySettlements
                        .filter(r => r.id.toLowerCase().includes(modalSearch.toLowerCase()) || r.name.toLowerCase().includes(modalSearch.toLowerCase()) || r.type.toLowerCase().includes(modalSearch.toLowerCase()))
                        .map((r, i) => (
                          <tr key={i}>
                            <td style={{ color: '#3b82f6', fontWeight: 600 }}>{r.id}</td>
                            <td style={{ fontWeight: 600 }}>{r.name}</td>
                            <td style={{ fontWeight: 700 }}>{r.charge}</td>
                            <td>{r.type}</td>
                            <td><StatusBadge status={r.status} /></td>
                            <td style={{ color: '#64748b' }}>{r.date}</td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                )}

                {activeModal === 'recent' && (
                  <div style={{ overflowX: 'auto' }}>
                    <table className="pd-full-table" style={{ minWidth: 1200 }}>
                      <thead>
                        <tr>
                          <th>Booking ID</th>
                          <th>Order ID</th>
                          <th>Customer</th>
                          <th>Service Category</th>
                          <th>Payment Type</th>
                          <th>Amount (₹)</th>
                          <th>Payment Status</th>
                          <th>Payment Date & Time</th>
                          <th>Transaction ID</th>
                          <th>Payment Method</th>
                          <th>SP Settlement Type</th>
                          <th>Seller Settlement Type</th>
                          <th style={{ textAlign: 'right' }}>Total Amount (₹)</th>
                          <th>Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {recentBookings
                          .filter(r => r.id.toLowerCase().includes(modalSearch.toLowerCase()) || r.user.toLowerCase().includes(modalSearch.toLowerCase()) || r.cat.toLowerCase().includes(modalSearch.toLowerCase()))
                          .map((r, i) => (
                            <tr key={i}>
                              <td style={{ color: '#3b82f6', fontWeight: 600 }}>{r.id}</td>
                              <td style={{ color: '#3b82f6', fontWeight: 600 }}>{r.order}</td>
                              <td style={{ fontWeight: 600 }}>{r.user}</td>
                              <td>{r.cat}</td>
                              <td>{r.type}</td>
                              <td style={{ fontWeight: 700 }}>{r.amt}</td>
                              <td><span style={{ color: r.pStatus==='Success'?'#16a34a':'#f59e0b', fontWeight: 600 }}>{r.pStatus}</span></td>
                              <td style={{ color: '#64748b' }}>{r.pDate}</td>
                              <td style={{ fontFamily: 'monospace', fontSize: 11, color: '#64748b' }}>{r.txn}</td>
                              <td>{r.method}</td>
                              <td>{r.spType}</td>
                              <td>{r.sellerType}</td>
                              <td style={{ textAlign: 'right', fontWeight: 700 }}>{r.tAmt}</td>
                              <td><StatusBadge status={r.status} /></td>
                            </tr>
                          ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>

              {/* Modal Footer */}
              <div style={{ padding: '12px 24px', borderTop: '1px solid #e2e8f0', background: '#fafbfc', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: 12, color: '#64748b', fontWeight: 500 }}>
                  Showing all records
                </span>
                <button 
                  onClick={() => setActiveModal(null)}
                  style={{ background: '#0f172a', color: '#fff', border: 'none', borderRadius: 8, padding: '8px 20px', fontSize: 12, fontWeight: 600, cursor: 'pointer' }}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </AdminShell>
  );
}
