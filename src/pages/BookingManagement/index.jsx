import toast from 'react-hot-toast';
import React, { useEffect, useMemo, useState } from 'react';
import {
  AlertTriangle,
  Archive,
  ArrowLeft,
  BadgeIndianRupee,
  Ban,
  BarChart3,
  Bell,
  ClipboardCheck,
  Clock,
  ChevronDown,
  Download,
  Eye,
  FileText,
  Filter,
  Flag,
  IndianRupee,
  ListChecks,
  LocateFixed,
  Mail,
  MapPinned,
  MessageSquare,
  MoreVertical,
  PackageCheck,
  Printer,
  RefreshCcw,
  Route,
  Search,
  Send,
  ShieldAlert,
  SlidersHorizontal,
  Star,
  UserCheck,
  Users,
  Wallet,
  XCircle
} from 'lucide-react';
import AdminShell from '../../components/layouts/AdminShell';
import BookingsDashboard from './BookingsDashboard';
import { ROUTES } from '../../config/routes';
import { useApp } from '../../hooks/useApp';
import GlobalDashboardFilters from '../../components/common/GlobalDashboardFilters';
import {
  LineChart, Line, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';

import Select from "../../components/ui/Select";

const money = (value) =>
  new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(value);

const normalize = (value) => String(value || '').trim().toLowerCase();

export const initialBookings = [
  {
    id: 'BK-8821',
    customer: 'Julianne Devis',
    mobile: '+91 98765 43210',
    email: 'j.devis@email.com',
    service: 'Express Delivery',
    category: 'Logistics',
    partner: 'SecureFlow Inc.',
    branch: 'North London Hub',
    employee: 'Marcus Reed',
    amount: 12450,
    status: 'Pending',
    priority: 'High',
    created: 'Oct 12, 2023',
    date: 'Oct 12, 2023 09:00 AM',
    location: 'South Regional HQ, Building C',
    eta: '42 min',
    distance: '8.4 km',
    payment: 'Partially Paid',
    risk: 72,
    otp: '490826',
    notes: 'Awaiting partner dispatch confirmation.',
    cancellationReason: 'Customer requested time change',
    refundReason: 'Service delay > 24hrs',
    sla: 'Breached'
  },
  {
    id: 'BK-8809',
    customer: 'Sarah Jenkins',
    mobile: '+91 91234 88990',
    email: 'sarah@global-logistics.com',
    service: 'IT Equipment Audit',
    category: 'Cyber Audit',
    partner: 'Vanguard Ops',
    branch: 'Manchester Central',
    employee: 'Sarah Jenkins',
    amount: 85800,
    status: 'Assigned',
    priority: 'Normal',
    created: 'Oct 14, 2023',
    date: 'Oct 15, 2023 10:30 AM',
    location: 'Manchester Central, Dock 4',
    eta: '1h 10m',
    distance: '21 km',
    payment: 'Pending',
    risk: 34,
    otp: '124905',
    notes: 'Equipment checklist uploaded.',
    cancellationReason: 'Not requested',
    refundReason: 'Duplicate billing',
    sla: 'Within SLA'
  },
  {
    id: 'BK-8791',
    customer: 'Apex Medical Plaza',
    mobile: '+91 99880 14567',
    email: 'ops@apexmedical.in',
    service: 'Facility Maintenance',
    category: 'Maintenance',
    partner: 'Direct Systems',
    branch: 'Birmingham Tech Park',
    employee: 'Elena Vance',
    amount: 45000,
    status: 'In Progress',
    priority: 'High',
    created: 'Oct 15, 2023',
    date: 'Oct 16, 2023 02:00 PM',
    location: 'Apex Tower, Floor 12',
    eta: '18 min',
    distance: '3.2 km',
    payment: 'Paid',
    risk: 41,
    otp: '673290',
    notes: 'Live job in progress. Materials approved.',
    cancellationReason: 'Not requested',
    refundReason: 'Cancellation policy',
    sla: 'Critical'
  },
  {
    id: 'BK-7715',
    customer: 'Standard Chartered Hub',
    mobile: '+91 90004 77881',
    email: 'facility@standardhub.com',
    service: 'Warehouse Restock',
    category: 'Inventory',
    partner: 'Guardian Group',
    branch: 'Glasgow Hub',
    employee: 'Unassigned',
    amount: 120900,
    status: 'Material Pending',
    priority: 'High',
    created: 'Oct 17, 2023',
    date: 'Oct 17, 2023 11:15 AM',
    location: 'North Terminal Warehouse',
    eta: 'Delayed',
    distance: '17 km',
    payment: 'Pending',
    risk: 63,
    otp: '832149',
    notes: 'Manual documentation required.',
    cancellationReason: 'Not requested',
    refundReason: 'Service incomplete',
    sla: 'Breached'
  },
  {
    id: 'BK-6502',
    customer: 'Elena Rossi',
    mobile: '+91 92222 11990',
    email: 'elena@rossi.co',
    service: 'HVAC Installation',
    category: 'Infrastructure',
    partner: 'Pro Cooling LLC',
    branch: 'South Regional',
    employee: 'Ishan Rao',
    amount: 32500,
    status: 'Quotation Pending',
    priority: 'Normal',
    created: 'Oct 18, 2023',
    date: 'Oct 19, 2023 12:00 PM',
    location: 'Bright Arcade, Tower B',
    eta: 'Awaiting quote',
    distance: '9.7 km',
    payment: 'Unpaid',
    risk: 25,
    otp: '558901',
    notes: 'Seller quotations under comparison.',
    cancellationReason: 'Not requested',
    refundReason: 'Refund on credit',
    sla: 'Within SLA'
  },
  {
    id: 'BK-5590',
    customer: 'Marcus Chen',
    mobile: '+91 94444 90887',
    email: 'marcus@northline.co',
    service: 'Router Replacement',
    category: 'Broadband',
    partner: 'NorthLine Digital',
    branch: 'Croydon',
    employee: 'David Miller',
    amount: 18900,
    status: 'OTP Pending',
    priority: 'Normal',
    created: 'Oct 20, 2023',
    date: 'Oct 20, 2023 04:45 PM',
    location: 'Croxley House, Unit 9',
    eta: '24 min',
    distance: '4.4 km',
    payment: 'Paid',
    risk: 19,
    otp: '401294',
    notes: 'Field verification needed before work start.',
    cancellationReason: 'Not requested',
    refundReason: 'Not applicable',
    sla: 'Within SLA'
  },
  {
    id: 'BK-4775',
    customer: 'ZenCo Manufacturing',
    mobile: '+91 90000 67812',
    email: 'support@zenco.in',
    service: 'Second Site Visit',
    category: 'On-site Security',
    partner: 'Cyber Audit 2.0',
    branch: 'Pune West',
    employee: 'Meera Kapoor',
    amount: 73000,
    status: 'Completed',
    priority: 'Normal',
    created: 'Oct 22, 2023',
    date: 'Oct 22, 2023 01:00 PM',
    location: 'ZenCo Industrial Park',
    eta: 'Completed',
    distance: '0 km',
    payment: 'Paid',
    risk: 12,
    otp: '998210',
    notes: 'Invoice generated and payment settled.',
    cancellationReason: 'Not requested',
    refundReason: 'Not applicable',
    sla: 'Closed'
  },
  {
    id: 'BK-9210',
    customer: 'Loomis Logistics',
    mobile: '+91 97777 33221',
    email: 'ops@loomis.example',
    service: 'Last-mile Courier Support',
    category: 'Logistics',
    partner: 'FastTrack Logistics',
    branch: 'Mumbai East',
    employee: 'Naveen Thomas',
    amount: 4500,
    status: 'Cancelled',
    priority: 'High',
    created: 'Oct 23, 2023',
    date: 'Oct 24, 2023 08:00 AM',
    location: 'Mira Road Dispatch Bay',
    eta: 'Cancelled',
    distance: '0 km',
    payment: 'Refund Pending',
    risk: 54,
    otp: '700145',
    notes: 'Cancellation approval waiting.',
    cancellationReason: 'Customer unavailable at address',
    refundReason: 'Service delay > 24hrs',
    sla: 'Breached'
  },
  {
    id: 'BK-7741',
    customer: 'Jessica Wu',
    mobile: '+91 96666 21540',
    email: 'jessica@wu.example',
    service: 'Fiber Maintenance',
    category: 'Network',
    partner: 'Fleet Monitoring',
    branch: 'Delhi NCR',
    employee: 'Rohit Menon',
    amount: 8900,
    status: 'Refunded',
    priority: 'Normal',
    created: 'Oct 25, 2023',
    date: 'Oct 25, 2023 02:30 PM',
    location: 'Sector 44, Gurgaon',
    eta: 'Refunded',
    distance: '0 km',
    payment: 'Refunded',
    risk: 22,
    otp: '143209',
    notes: 'Refund processed after duplicate charge.',
    cancellationReason: 'Not requested',
    refundReason: 'Refund on credit',
    sla: 'Closed'
  },
  {
    id: 'ESC-9921',
    customer: 'Jonathan Y.',
    mobile: '+91 98888 11122',
    email: 'jonathan@damonplus.example',
    service: 'Damaged Plus Recovery',
    category: 'Escalation',
    partner: 'OpsCenter Pro',
    branch: 'Kolkata Central',
    employee: 'Tier 2 Team',
    amount: 62400,
    status: 'Escalated',
    priority: 'Critical',
    created: 'Oct 26, 2023',
    date: 'Oct 26, 2023 03:10 PM',
    location: 'Eastern Freight Corridor',
    eta: 'Overdue',
    distance: '12 km',
    payment: 'Hold',
    risk: 94,
    otp: '220100',
    notes: 'Severe failure requires response team.',
    cancellationReason: 'Not requested',
    refundReason: 'Compensation review',
    sla: 'Critical'
  },
  {
    id: 'DISP-9021',
    customer: 'Elena Rodriguez',
    mobile: '+91 91111 23456',
    email: 'elena.r@example.com',
    service: 'Deep Cleaning',
    category: 'Dispute',
    partner: 'Sterling Services',
    branch: 'Hyderabad',
    employee: 'Marcus Sterling',
    amount: 12450,
    status: 'Disputed',
    priority: 'High',
    created: 'Oct 27, 2023',
    date: 'Oct 27, 2023 09:30 AM',
    location: 'Bay View Apartment',
    eta: 'Under review',
    distance: '0 km',
    payment: 'Claimed',
    risk: 61,
    otp: '783490',
    notes: 'Customer says service was incomplete.',
    cancellationReason: 'Not requested',
    refundReason: 'Claim compensation',
    sla: 'Warning'
  }
];

const partners = [
  { name: 'SecureFlow Inc.', rating: 4.8, distance: '2.4 km', revenue: '₹12.4L', availability: '94%' },
  { name: 'Vanguard Ops', rating: 4.6, distance: '4.8 km', revenue: '₹8.1L', availability: '87%' },
  { name: 'FastTrack Logistics', rating: 4.7, distance: '1.9 km', revenue: '₹10.8L', availability: '91%' }
];

const branches = [
  { name: 'North London Hub', city: 'London', revenue: '₹4.2L', rating: 4.9, availability: '18 employees' },
  { name: 'South Regional', city: 'Bengaluru', revenue: '₹6.8L', rating: 4.7, availability: '24 employees' },
  { name: 'Manchester Central', city: 'Manchester', revenue: '₹3.9L', rating: 4.5, availability: '12 employees' }
];

const employees = [
  { name: 'Marcus Reed', rating: 4.9, load: '2 jobs', availability: 'Available', experience: '6 yrs' },
  { name: 'Elena Vance', rating: 4.8, load: '3 jobs', availability: 'On route', experience: '5 yrs' },
  { name: 'Ishan Rao', rating: 4.6, load: '1 job', availability: 'Available', experience: '4 yrs' }
];

const routeMeta = {
  [ROUTES.bookings]: { screen: 'dashboard', title: 'Booking Dashboard', subtitle: 'Real-time operational control across booking lifecycle.' },
  [ROUTES.bookingAll]: { screen: 'listing', title: 'All Bookings', subtitle: 'Master registry of all bookings and deployments.' },
  [ROUTES.bookingPending]: { screen: 'status', status: 'Pending', title: 'Pending Bookings', subtitle: 'Bookings requiring dispatch or operations review.' },
  [ROUTES.bookingAssigned]: { screen: 'status', status: 'Assigned', title: 'Assigned Bookings', subtitle: 'Bookings with partner, branch, or employee assignment.' },
  [ROUTES.bookingAccepted]: { screen: 'status', status: 'Accepted', title: 'Accepted Bookings', subtitle: 'Bookings accepted by service teams.' },
  [ROUTES.bookingInProgress]: { screen: 'board', title: 'In Progress Bookings', subtitle: 'Live booking board by lifecycle stage.' },
  [ROUTES.bookingMaterialPending]: { screen: 'status', status: 'Material Pending', title: 'Material Pending Bookings', subtitle: 'Bookings awaiting material approval or vendor updates.' },
  [ROUTES.bookingQuotationPending]: { screen: 'status', status: 'Quotation Pending', title: 'Quotation Pending Bookings', subtitle: 'Bookings waiting for seller quotation decisions.' },
  [ROUTES.bookingOtpPending]: { screen: 'status', status: 'OTP Pending', title: 'OTP Pending Bookings', subtitle: 'Bookings blocked before field verification.' },
  [ROUTES.bookingCompleted]: { screen: 'status', status: 'Completed', title: 'Completed Bookings', subtitle: 'Bookings with work completed and closure checks done.' },
  [ROUTES.bookingCancelled]: { screen: 'cancellation', title: 'Booking Cancellation Center', subtitle: 'Review cancellation reasons, refund impact, and penalties.' },
  [ROUTES.bookingRefunded]: { screen: 'status', status: 'Refunded', title: 'Refunded Bookings', subtitle: 'Bookings with completed customer refund outcome.' },
  [ROUTES.bookingEscalated]: { screen: 'escalation', title: 'Booking Escalation Center', subtitle: 'High priority cases, service failures, and response actions.' },
  [ROUTES.bookingDisputed]: { screen: 'dispute', title: 'Booking Dispute Resolution', subtitle: 'Evidence, chat history, and claim resolution controls.' },
  [ROUTES.bookingAssignmentCenter]: { screen: 'assignment', title: 'Booking Assignment Center', subtitle: 'Assign partner, branch, and employee from one operations desk.' },
  [ROUTES.bookingOtpVerification]: { screen: 'otp', title: 'OTP Verification Center', subtitle: 'Verify field OTPs and regenerate secure work-start codes.' },
  [ROUTES.bookingCalendar]: { screen: 'calendar', title: 'Booking Calendar View', subtitle: 'Day, week, and month schedule for active operations.' },
  [ROUTES.bookingMap]: { screen: 'map', title: 'Booking Map View', subtitle: 'Active bookings, route visualization, clusters, and heatmap.' },
  [ROUTES.bookingPayments]: { screen: 'payments', title: 'Payment Settlement Screen', subtitle: 'Settlement breakdown across platform, partner, employee, and taxes.' },
  [ROUTES.bookingInvoices]: { screen: 'invoices', title: 'Invoice Management', subtitle: 'Invoice listing, preview, export, email, WhatsApp, and print actions.' },
  [ROUTES.bookingRefunds]: { screen: 'refunds', title: 'Refund Management', subtitle: 'Refund queue with pending, processed, and failed refund decisions.' },
  [ROUTES.bookingSla]: { screen: 'sla', title: 'Booking SLA Monitoring', subtitle: 'Delayed booking monitor with SLA breach and priority case tracking.' },
  [ROUTES.bookingAnalytics]: { screen: 'analytics', title: 'Booking Analytics Dashboard', subtitle: 'Performance overview, booking funnel, revenue funnel, and reports.' },
  [ROUTES.bookingCommunications]: { screen: 'communications', title: 'Booking Communication Center', subtitle: 'Send SMS, push, WhatsApp, and email updates to customers, partners, and employees.' },
  [ROUTES.bookingReports]: { screen: 'reports', title: 'Booking Reports', subtitle: 'Booking, revenue, cancellation, refund, and employee performance exports.' },
  [ROUTES.bookingFraud]: { screen: 'fraud', title: 'Booking Fraud Detection', subtitle: 'Risk indicators, suspicious events, and investigation actions.' },
  [ROUTES.bookingArchive]: { screen: 'archive', title: 'Booking Archive', subtitle: 'Closed bookings, historical reports, search, and restore.' }
};

const statusTone = {
  Pending: 'warning',
  Assigned: 'info',
  Accepted: 'success',
  'In Progress': 'info',
  'Material Pending': 'warning',
  'Quotation Pending': 'warning',
  'OTP Pending': 'warning',
  Completed: 'success',
  Cancelled: 'danger',
  Refunded: 'success',
  Escalated: 'danger',
  Disputed: 'danger'
};

function StatusBadge({ children, tone = 'info' }) {
  return <span className={`booking-badge ${tone}`}>{children}</span>;
}

function ActionButton({ icon: Icon, children, onClick, variant = 'ghost' }) {
  return (
    <button className={`booking-action ${variant}`} type="button" onClick={onClick}>
      {Icon && <Icon size={15} />}
      <span>{children}</span>
    </button>
  );
}

function KpiCard({ title, value, icon: Icon, trend, tone = 'blue' }) {
  return (
    <article className={`booking-kpi ${tone}`}>
      <div>
        <span>{title}</span>
        <strong>{value}</strong>
      </div>
      <Icon size={20} />
      {trend && <small>{trend}</small>}
    </article>
  );
}

function MiniBars({ values = [28, 44, 38, 62, 52, 72, 80], danger = false }) {
  return (
    <div className="booking-mini-bars" aria-hidden="true">
      {values.map((value, index) => (
        <span key={index} style={{ height: `${value}%` }} className={danger && index > 3 ? 'danger' : ''} />
      ))}
    </div>
  );
}

function TrendLine() {
  return (
    <div className="booking-trend-line" aria-hidden="true">
      <span />
      <span />
      <span />
      <span />
    </div>
  );
}

function BookingTable({
  rows,
  onView,
  onTrack,
  onAssign,
  onInvoice,
  view,
  track,
  assign,
  invoice,
  compact = false
}) {
  const handleView = onView || view || (() => {});
  const handleTrack = onTrack || track || (() => {});
  const handleAssign = onAssign || assign || (() => {});
  const handleInvoice = onInvoice || invoice || (() => {});

  return (
    <div className="booking-table-wrap">
      <div className="table-responsive-wrapper">
<table className="booking-table">
        <thead>
          <tr>
            <th>Booking ID</th>
            <th>Customer</th>
            {!compact && <th>Service</th>}
            <th>Partner</th>
            <th>Amount</th>
            <th>Status</th>
            {!compact && <th>Created Date</th>}
            <th className="booking-table-actions">Actions</th>
          </tr>
        </thead>
        <tbody>
          {rows.length ? rows.map((booking) => (
            <tr key={booking.id}>
              <td><button className="booking-link" type="button" onClick={() => handleView(booking)}>{booking.id}</button></td>
              <td>
                <strong>{booking.customer}</strong>
                <span>{booking.mobile}</span>
              </td>
              {!compact && <td>{booking.service}</td>}
              <td>{booking.partner}</td>
              <td>{money(booking.amount)}</td>
              <td><StatusBadge tone={statusTone[booking.status]}>{booking.status}</StatusBadge></td>
              {!compact && <td>{booking.created}</td>}
              <td>
                <div className="booking-row-actions">
                  <button title="View" type="button" onClick={() => handleView(booking)}><Eye size={14} /></button>
                  <button title="Track" type="button" onClick={() => handleTrack(booking)}><LocateFixed size={14} /></button>
                  <button title="Assign" type="button" onClick={() => handleAssign(booking)}><UserCheck size={14} /></button>
                  <button title="Invoice" type="button" onClick={() => handleInvoice(booking)}><FileText size={14} /></button>
                </div>
              </td>
            </tr>
          )) : (
            <tr>
              <td colSpan={compact ? 6 : 8} className="booking-empty">No bookings match this view.</td>
            </tr>
          )}
        </tbody>
      </table>
</div>
    </div>
  );
}

// ─── MOCK DATA ────────────────────────────────────────────────────────────────

const bookingOverTime = [
  { day:'01 May', total:1200, users:800, partners:400 },
  { day:'05 May', total:1500, users:1000, partners:500 },
  { day:'10 May', total:2100, users:1400, partners:700 },
  { day:'15 May', total:2400, users:1600, partners:800 },
  { day:'20 May', total:2800, users:1900, partners:900 },
  { day:'25 May', total:3200, users:2100, partners:1100 },
  { day:'31 May', total:3600, users:2500, partners:1100 },
];

const sourceDist = [
  { name:'Users',        value:1245, color:'#22c55e', pct:'48.5%' },
  { name:'Partners',     value:892,  color:'#3b82f6', pct:'34.7%' },
  { name:'Influencers',  value:431,  color:'#8b5cf6', pct:'16.8%' },
];

const bookingStatusDist = [
  { name:'Active',           value:1842, color:'#22c55e', pct:'71.7%' },
  { name:'Pending',          value:562,  color:'#ef4444', pct:'21.9%' },
  { name:'Cancelled',        value:164,  color:'#f59e0b', pct:'6.4%'  },
];

const categoryDist = [
  { name:'Cleaning', value:4125, color:'#3b82f6', pct:'47.7%' },
  { name:'Repair', value:2653, color:'#22c55e', pct:'30.7%' },
  { name:'Maintenance', value:1256, color:'#f59e0b', pct:'14.5%' },
  { name:'Delivery', value:608,  color:'#8b5cf6', pct:'7.0%'  },
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

const categoryPerformance = [
  { type:'Cleaning', total:856, used:732, usage:4125, pct:47.7, color:'#3b82f6' },
  { type:'Repair', total:642, used:521, usage:2653, pct:30.7, color:'#22c55e' },
  { type:'Maintenance', total:412, used:298, usage:1256, pct:14.5, color:'#f59e0b' },
  { type:'Delivery', total:218, used:144, usage:608,  pct:7.0,  color:'#8b5cf6' },
];

const bookingsPerformance = [
  { code:'BK-8821', genBy:'User', name:'Julianne Devis', type:'Logistics', status:'Active', users:18, partners:7, total:25, reward:'Express', earned:'₹12,450', expires:'05 Jun 2026', created:'05 May 2026' },
  { code:'BK-8809', genBy:'Partner', name:'Sarah Jenkins', type:'Cyber Audit', status:'Active', users:32, partners:13, total:45, reward:'Audit', earned:'₹85,800', expires:'06 Jun 2026', created:'06 May 2026' },
  { code:'BK-8791', genBy:'Influencer', name:'Apex Medical Plaza', type:'Maintenance', status:'Going to Expire', users:60, partners:18, total:78, reward:'Facility', earned:'₹45,000', expires:'07 Jun 2026', created:'07 May 2026' },
  { code:'BK-7715', genBy:'User', name:'Standard Chartered Hub', type:'Inventory', status:'Inactive', users:9, partners:1, total:10, reward:'Restock', earned:'₹1,20,900', expires:'08 Jun 2026', created:'08 May 2026' },
  { code:'BK-6502', genBy:'Partner', name:'Elena Rossi', type:'Infrastructure', status:'Active', users:24, partners:12, total:36, reward:'HVAC', earned:'₹32,500', expires:'09 Jun 2026', created:'09 May 2026' },
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

function DashboardScreen({ bookings, handlers, navigate, ROUTES }) {
  return <BookingsDashboard bookings={bookings} handlers={handlers} navigate={navigate} ROUTES={ROUTES} />;
}

function _OriginalDashboardScreenUnused({ bookings, handlers }) {
  const [period, setPeriod] = useState('Monthly');
  const [filterTrigger, setFilterTrigger] = useState(0);

  const topKpis = [
    { label:'Total Bookings', value:2568, sub:'↑ 18.6% vs Apr 2026', color:'#8b5cf6', bg:'#f5f3ff', icon:ClipboardCheck },
    { label:'Completed Bookings', value:1842, sub:'71.7% of total ↑ 12.5%', color:'#22c55e', bg:'#f0fdf4', icon:CheckCircle2 },
    { label:'Pending Bookings', value:562, sub:'21.9% of total ↓ 5.8%', color:'#ef4444', bg:'#fff1f2', icon:Clock },
    { label:'Cancelled Bookings', value:164, sub:'6.4% of total', color:'#f59e0b', bg:'#fffbeb', icon:XCircle },
    { label:'Total Revenue', value:8642, sub:'↑ 22.4% vs Apr 2026', color:'#3b82f6', bg:'#eff6ff', icon:Users },
    { label:'Avg Booking Value', value:6125, sub:'70.8% of total', color:'#22c55e', bg:'#f0fdf4', icon:User },
    { label:'Services Sold', value:2517, sub:'29.1% of total', color:'#8b5cf6', bg:'#f5f3ff', icon:Briefcase },
    { label:'Active Customers', value:0, isCustom:true, color:'#f59e0b', bg:'#fffbeb', icon:Star },
  ];

  const subKpis = [
    { label:'Direct Bookings', value:1245, sub:'48.5% of total', unused:312, unusedPct:'25.1%', color:'#3b82f6', bg:'#eff6ff', icon:User },
    { label:'Partner Bookings', value:892, sub:'34.7% of total', unused:213, unusedPct:'23.9%', color:'#8b5cf6', bg:'#f5f3ff', icon:Briefcase },
    { label:'Corporate Bookings', value:431, sub:'16.8% of total', unused:97, unusedPct:'22.5%', color:'#f59e0b', bg:'#fffbeb', icon:Star },
  ];

  const periodMultiplier = period === 'Yearly' ? 12 : period === 'Weekly' ? 0.25 : period === 'Daily' ? 0.03 : 1;
  const filterMultiplier = filterTrigger === 0 ? 1 : 1 + ((filterTrigger % 5) * 0.15);
  const m = periodMultiplier * filterMultiplier;

  const dynTopKpis = topKpis.map(k => ({ ...k, value: k.isCustom ? k.value : Math.floor(k.value * m) }));
  const dynSubKpis = subKpis.map(k => ({ ...k, value: Math.floor(k.value * m), unused: Math.floor(k.unused * m) }));
  
  const dynBookingOverTime = bookingOverTime.map(d => ({ ...d, total: Math.floor(d.total * m), users: Math.floor(d.users * m), partners: Math.floor(d.partners * m) }));
  const dynSourceDist = sourceDist.map(d => ({ ...d, value: Math.floor(d.value * m) }));
  const dynStatusDist = bookingStatusDist.map(d => ({ ...d, value: Math.floor(d.value * m) }));
  const dynCategoryDist = categoryDist.map(d => ({ ...d, value: Math.floor(d.value * m) }));
  const dynCategoryPerformance = categoryPerformance.map(d => ({ ...d, total: Math.floor(d.total * m), used: Math.floor(d.used * m), usage: Math.floor(d.usage * m) }));

  return (
    <>
        {/* ── Filter Bar (Combined Card) ── */}
        <div className="ref-filter-bar" style={{ margin: '0 24px 20px', width: 'auto' }}>
          {/* ╌ Row 1: Location + Period + Month/Year + Apply/Reset ╌ */}
          <div className="ref-filter-row">
            <div className="ref-filter-group">
              <label>State</label>
              <div className="ref-select-wrap">
                <select className="ref-select" style={{ minWidth: '110px' }}>
                  <option>All States</option>
                  <option>Maharashtra</option>
                  <option>Karnataka</option>
                  <option>Tamil Nadu</option>
                  <option>Delhi</option>
                </select>
                <ChevronDown size={12} className="ref-select-arrow" />
              </div>
            </div>

            <div className="ref-filter-group">
              <label>City</label>
              <div className="ref-select-wrap">
                <select className="ref-select" style={{ minWidth: '110px' }}>
                  <option>All Cities</option>
                  <option>Mumbai</option>
                  <option>Bengaluru</option>
                  <option>Chennai</option>
                </select>
                <ChevronDown size={12} className="ref-select-arrow" />
              </div>
            </div>

            <div className="ref-filter-group">
              <label>District</label>
              <div className="ref-select-wrap">
                <select className="ref-select" style={{ minWidth: '110px' }}>
                  <option>All Districts</option>
                  <option>Andheri</option>
                  <option>Koramangala</option>
                  <option>T. Nagar</option>
                </select>
                <ChevronDown size={12} className="ref-select-arrow" />
              </div>
            </div>

            <div className="ref-filter-divider" />

            <div className="ref-period-toggle" style={{ alignSelf: 'flex-end' }}>
              {['Daily', 'Weekly', 'Monthly', 'Yearly'].map(p => (
                <button
                  key={p}
                  className={`ref-period-btn${period === p ? ' active' : ''}`}
                  onClick={() => setPeriod(p)}
                >{p}</button>
              ))}
            </div>

            <div className="ref-filter-group" style={{ minWidth: '90px' }}>
              <label>Month</label>
              <div className="ref-select-wrap">
                <select className="ref-select ref-select-sm">
                  {['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'].map(m => (
                    <option key={m}>{m}</option>
                  ))}
                </select>
                <ChevronDown size={12} className="ref-select-arrow" />
              </div>
            </div>

            <div className="ref-filter-group" style={{ minWidth: '90px' }}>
              <label>Year</label>
              <div className="ref-select-wrap">
                <select className="ref-select ref-select-sm">
                  {['2026','2027','2028','2029','2030','2031','2032','2033','2034','2035'].map(y => (
                    <option key={y}>{y}</option>
                  ))}
                </select>
                <ChevronDown size={12} className="ref-select-arrow" />
              </div>
            </div>

            <div style={{ marginLeft: 'auto', display: 'flex', gap: '8px', alignSelf: 'flex-end' }}>
              <button
                className="ref-btn-primary"
                onClick={() => { setFilterTrigger(prev => prev + 1); toast.success('Filters applied'); }}
              >Apply</button>
              <button
                className="ref-btn-secondary"
                onClick={() => { setPeriod('Monthly'); setFilterTrigger(0); toast.success('Filters reset'); }}
              >Reset</button>
            </div>
          </div>

          <div className="ref-filter-row">
            <div className="ref-filter-group ref-filter-group-wide">
              <label>Booking Generated by</label>
              <div className="ref-select-wrap">
                <select className="ref-select">
                  {['All','User','Partner','Influencer'].map(o => <option key={o}>{o}</option>)}
                </select>
                <ChevronDown size={12} className="ref-select-arrow" />
              </div>
            </div>

            <div className="ref-filter-group ref-filter-group-wide">
              <label>Booking used by</label>
              <div className="ref-select-wrap">
                <select className="ref-select">
                  {['All','User','Partner'].map(o => <option key={o}>{o}</option>)}
                </select>
                <ChevronDown size={12} className="ref-select-arrow" />
              </div>
            </div>

            <div className="ref-filter-divider" />

            <div className="ref-filter-group ref-filter-group-wide">
              <label>Service Category</label>
              <div className="ref-select-wrap">
                <select className="ref-select">
                  {['All','Cleaning','Repair','Maintenance','Delivery'].map(o => <option key={o}>{o}</option>)}
                </select>
                <ChevronDown size={12} className="ref-select-arrow" />
              </div>
            </div>

            <div className="ref-filter-group ref-filter-group-wide">
              <label>Booking Status</label>
              <div className="ref-select-wrap">
                <select className="ref-select">
                  {['All','Active','Pending','Cancelled'].map(o => <option key={o}>{o}</option>)}
                </select>
                <ChevronDown size={12} className="ref-select-arrow" />
              </div>
            </div>
          </div>
        </div>

        {/* ── 8 KPI CARDS ── */}
        <div style={{ padding: '0 24px', display:'grid', gridTemplateColumns:'repeat(8,1fr)', gap:8, marginBottom:14 }}>
          {dynTopKpis.map((k, i) => {
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
                    <div style={{ fontSize:9, color: k.sub.includes('↑') ? '#16a34a' : k.sub.includes('↓') ? '#dc2626' : '#64748b', fontWeight:600, color:'#0f172a' }}>{k.sub}</div>
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
        <div style={{ padding: '0 24px', display:'grid', gridTemplateColumns:'1fr 1.5fr', gap:12, marginBottom:14 }}>
          {/* Sub KPIs (Left side) */}
          <div style={{ display:'flex', gap:10 }}>
            {dynSubKpis.map((k,i) => {
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
                    <div style={{ fontSize:9, color:'#64748b', fontWeight:600, color:'#0f172a' }}>{k.sub}</div>
                  </div>
                  
                  <div style={{ width:1, background:'#e8edf2', margin:'0 10px' }} />
                  
                  <div style={{ flex:1, display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'center', textAlign:'center' }}>
                    <div style={{ fontSize:10, fontWeight:800, color:'#3b82f6', marginBottom:4, lineHeight:1.1 }}>
                      Unused<br/>Codes
                    </div>
                    <div style={{ fontSize:16, fontWeight:800, color:'#0f172a' }}>{k.unused}</div>
                    <div style={{ fontSize:9, color:'#64748b', fontWeight:600, color:'#0f172a' }}>({k.unusedPct} of total)</div>
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
                  <div style={{ fontSize:11, fontWeight:800, color:'#0f172a', display:'flex', alignItems:'center', gap:4 }}><User size={12} color="#22c55e" /> Top Booking Customers</div>
                  <a href="#" style={{ fontSize:9, color:'#3b82f6', textDecoration:'none', fontWeight:600, color:'#0f172a' }}>View All</a>
                </div>
                <table style={{ width:'100%', fontSize:'11px', borderCollapse:'collapse' }}>
                  <thead>
                    <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
                      <th style={{ textAlign:'left', padding:'8px 4px 8px 0', color:'#1e3a8a', fontWeight:700, fontSize:'11px' }}>Rank</th>
                      <th style={{ textAlign:'left', padding:'8px 4px 8px 0', color:'#1e3a8a', fontWeight:700, fontSize:'11px' }}>Customer Name</th>
                      <th style={{ textAlign:'right', padding:'8px 4px 8px 0', color:'#1e3a8a', fontWeight:700, fontSize:'11px' }}>Bookings</th>
                    </tr>
                  </thead>
                  <tbody>
                    {topPerformerUsers.map(u => (
                      <tr key={u.rank} style={{ borderBottom:'1px solid #e8edf2' }}>
                        <td style={{ padding:'8px 4px 8px 0', whiteSpace:'nowrap', fontWeight:600, color:'#0f172a' }}>{u.rank}</td>
                        <td style={{ padding:'8px 4px 8px 0', whiteSpace:'nowrap', fontWeight:600, color:'#0f172a' }}>{u.name}</td>
                        <td style={{ padding:'8px 4px 8px 0', whiteSpace:'nowrap', textAlign:'right', fontWeight:700 }}>{u.referred}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Table 2 */}
              <div>
                <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:10 }}>
                  <div style={{ fontSize:11, fontWeight:800, color:'#0f172a', display:'flex', alignItems:'center', gap:4 }}><Briefcase size={12} color="#8b5cf6" /> Top Service Partners</div>
                  <a href="#" style={{ fontSize:9, color:'#3b82f6', textDecoration:'none', fontWeight:600, color:'#0f172a' }}>View All</a>
                </div>
                <table style={{ width:'100%', fontSize:'11px', borderCollapse:'collapse' }}>
                  <thead>
                    <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
                      <th style={{ textAlign:'left', padding:'8px 4px 8px 0', color:'#1e3a8a', fontWeight:700, fontSize:'11px' }}>Rank</th>
                      <th style={{ textAlign:'left', padding:'8px 4px 8px 0', color:'#1e3a8a', fontWeight:700, fontSize:'11px' }}>Partner Name</th>
                      <th style={{ textAlign:'right', padding:'8px 4px 8px 0', color:'#1e3a8a', fontWeight:700, fontSize:'11px' }}>Completed Jobs</th>
                    </tr>
                  </thead>
                  <tbody>
                    {topPerformerPartners.map(u => (
                      <tr key={u.rank} style={{ borderBottom:'1px solid #e8edf2' }}>
                        <td style={{ padding:'8px 4px 8px 0', whiteSpace:'nowrap', fontWeight:600, color:'#0f172a' }}>{u.rank}</td>
                        <td style={{ padding:'8px 4px 8px 0', whiteSpace:'nowrap', fontWeight:600, color:'#0f172a' }}>{u.name}</td>
                        <td style={{ padding:'8px 4px 8px 0', whiteSpace:'nowrap', textAlign:'right', fontWeight:700 }}>{u.referred}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Table 3 */}
              <div>
                <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:10 }}>
                  <div style={{ fontSize:11, fontWeight:800, color:'#0f172a', display:'flex', alignItems:'center', gap:4 }}><Star size={12} color="#f59e0b" /> Top Performing Branches</div>
                  <a href="#" style={{ fontSize:9, color:'#3b82f6', textDecoration:'none', fontWeight:600, color:'#0f172a' }}>View All</a>
                </div>
                <table style={{ width:'100%', fontSize:'11px', borderCollapse:'collapse' }}>
                  <thead>
                    <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
                      <th style={{ textAlign:'left', padding:'8px 4px 8px 0', color:'#1e3a8a', fontWeight:700, fontSize:'11px' }}>Rank</th>
                      <th style={{ textAlign:'left', padding:'8px 4px 8px 0', color:'#1e3a8a', fontWeight:700, fontSize:'11px' }}>Branch Name</th>
                      <th style={{ textAlign:'right', padding:'8px 4px 8px 0', color:'#1e3a8a', fontWeight:700, fontSize:'11px' }}>B2C</th>
                      <th style={{ textAlign:'right', padding:'8px 4px 8px 0', color:'#1e3a8a', fontWeight:700, fontSize:'11px' }}>B2B</th>
                      <th style={{ textAlign:'right', padding:'8px 4px 8px 0', color:'#1e3a8a', fontWeight:700, fontSize:'11px' }}>Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {topPerformerInfluencers.map(u => (
                      <tr key={u.rank} style={{ borderBottom:'1px solid #e8edf2' }}>
                        <td style={{ padding:'8px 4px 8px 0', whiteSpace:'nowrap', fontWeight:600, color:'#0f172a' }}>{u.rank}</td>
                        <td style={{ padding:'8px 4px 8px 0', whiteSpace:'nowrap', fontWeight:600, color:'#0f172a' }}>{u.name}</td>
                        <td style={{ padding:'8px 4px 8px 0', whiteSpace:'nowrap', textAlign:'right', fontWeight:700 }}>{u.uRef}</td>
                        <td style={{ padding:'8px 4px 8px 0', whiteSpace:'nowrap', textAlign:'right', fontWeight:700 }}>{u.pRef}</td>
                        <td style={{ padding:'8px 4px 8px 0', whiteSpace:'nowrap', textAlign:'right', fontWeight:700 }}>{u.tRef}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        {/* ── ROW 3: Donuts + Table ── */}
        <div style={{ padding: '0 24px', display:'grid', gridTemplateColumns:'1.2fr 1fr 1fr 2.5fr', gap:12, marginBottom:12 }}>
          
          <div style={{ background:'#fff', borderRadius:10, padding:'18px', boxShadow:'0 1px 3px rgba(0,0,0,0.05)', border:'1px solid #e8edf2', display:'flex', flexDirection:'column' }}>
            <h2 style={{ fontSize:13, fontWeight:800, color:'#0f172a', margin:'0 0 8px' }}>Bookings Generated by</h2>
            <div style={{ display:'flex', alignItems:'center', gap:14 }}>
              <PieChart width={140} height={140}>
                <Pie data={dynSourceDist} cx={70} cy={70} innerRadius={42} outerRadius={65} paddingAngle={2} dataKey="value" startAngle={90} endAngle={-270}>
                  {dynSourceDist.map((e,i) => <Cell key={i} fill={e.color} />)}
                  <DonutCenter viewBox={{ cx:70, cy:70 }} value={fmtNum(dynSourceDist.reduce((acc,curr)=>acc+curr.value,0))} label="Total Bookings" />
                </Pie>
                <Tooltip formatter={v => fmtNum(v)} />
              </PieChart>
              <div style={{ flex:1, display:'flex', flexDirection:'column', gap:6 }}>
                {dynSourceDist.map((item,i) => (
                  <div key={i} style={{ display:'flex', alignItems:'center', justifyContent:'space-between', fontSize:10.5 }}>
                    <div style={{ display:'flex', alignItems:'center', gap:5 }}>
                      <span style={{ width:7, height:7, borderRadius:'50%', background:item.color, flexShrink:0, display:'inline-block' }} />
                      <span style={{ color:'#475569', fontWeight:600, color:'#0f172a' }}>{item.name}</span>
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
            <h2 style={{ fontSize:13, fontWeight:800, color:'#0f172a', margin:'0 0 8px' }}>Bookings by Status</h2>
            <div style={{ display:'flex', alignItems:'center', gap:14 }}>
              <PieChart width={140} height={140}>
                <Pie data={dynStatusDist} cx={70} cy={70} innerRadius={42} outerRadius={65} paddingAngle={2} dataKey="value" startAngle={90} endAngle={-270}>
                  {dynStatusDist.map((e,i) => <Cell key={i} fill={e.color} />)}
                  <DonutCenter viewBox={{ cx:70, cy:70 }} value={fmtNum(dynStatusDist.reduce((acc,curr)=>acc+curr.value,0))} label="Total Status" />
                </Pie>
                <Tooltip formatter={v => fmtNum(v)} />
              </PieChart>
              <div style={{ flex:1, display:'flex', flexDirection:'column', gap:6 }}>
                {dynStatusDist.map((item,i) => (
                  <div key={i} style={{ display:'flex', alignItems:'center', justifyContent:'space-between', fontSize:10.5 }}>
                    <div style={{ display:'flex', alignItems:'center', gap:5 }}>
                      <span style={{ width:7, height:7, borderRadius:'50%', background:item.color, flexShrink:0, display:'inline-block' }} />
                      <span style={{ color:'#475569', fontWeight:600, color:'#0f172a' }}>{item.name}</span>
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
            <h2 style={{ fontSize:13, fontWeight:800, color:'#0f172a', margin:'0 0 8px' }}>Category Distribution</h2>
            <div style={{ display:'flex', alignItems:'center', gap:14 }}>
              <PieChart width={140} height={140}>
                <Pie data={dynCategoryDist} cx={70} cy={70} innerRadius={42} outerRadius={65} paddingAngle={2} dataKey="value" startAngle={90} endAngle={-270}>
                  {dynCategoryDist.map((e,i) => <Cell key={i} fill={e.color} />)}
                  <DonutCenter viewBox={{ cx:70, cy:70 }} value={fmtNum(dynCategoryDist.reduce((acc,curr)=>acc+curr.value,0))} label="Total Usage" />
                </Pie>
                <Tooltip formatter={v => fmtNum(v)} />
              </PieChart>
              <div style={{ flex:1, display:'flex', flexDirection:'column', gap:6 }}>
                {dynCategoryDist.map((item,i) => (
                  <div key={i} style={{ display:'flex', alignItems:'center', justifyContent:'space-between', fontSize:10.5 }}>
                    <div style={{ display:'flex', alignItems:'center', gap:5 }}>
                      <span style={{ width:7, height:7, borderRadius:'50%', background:item.color, flexShrink:0, display:'inline-block' }} />
                      <span style={{ color:'#475569', fontWeight:600, color:'#0f172a' }}>{item.name}</span>
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
              <h2 style={{ fontSize:13, fontWeight:800, color:'#0f172a', margin:0 }}>Latest Assigned Bookings</h2>
              <a href="#" style={{ fontSize:10, color:'#3b82f6', textDecoration:'none', fontWeight:600, color:'#0f172a' }}>View All</a>
            </div>
            <table style={{ width:'100%', fontSize:10.5 }}>
              <thead>
                <tr>
                  <th style={{ textAlign:'left', color:'#94a3b8', paddingBottom:6, fontWeight:600, color:'#0f172a' }}>Booking ID</th>
                  <th style={{ textAlign:'left', color:'#94a3b8', paddingBottom:6, fontWeight:600, color:'#0f172a' }}>Date Assigned</th>
                  <th style={{ textAlign:'left', color:'#94a3b8', paddingBottom:6, fontWeight:600, color:'#0f172a' }}>Partner</th>
                  <th style={{ textAlign:'right', color:'#94a3b8', paddingBottom:6, fontWeight:600, color:'#0f172a' }}>Status</th>
                </tr>
              </thead>
              <tbody>
                {bookingsPerformance.slice(0,5).map(c => (
                  <tr key={c.code}>
                    <td style={{ padding:'6px 0', fontWeight:800, color:'#0f172a' }}>{c.code}</td>
                    <td style={{ padding:'6px 0', fontWeight:600, color:'#475569' }}>{c.created}</td>
                    <td style={{ padding:'6px 0', fontWeight:600, color:'#475569' }}>{c.name}</td>
                    <td style={{ padding:'6px 0', textAlign:'right', fontWeight:700, color:'#ef4444' }}>{c.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* ── ROW 4: Line Chart + Donut + Table ── */}
        <div style={{ padding: '0 24px', display:'grid', gridTemplateColumns:'2fr 1fr 1.5fr', gap:12, marginBottom:12 }}>
          
          <div style={{ background:'#fff', borderRadius:10, padding:'18px 18px 10px', boxShadow:'0 1px 3px rgba(0,0,0,0.05)', border:'1px solid #e8edf2' }}>
            <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:12 }}>
              <h2 style={{ fontSize:13, fontWeight:800, color:'#0f172a', margin:0 }}>Bookings Over Time</h2>
              <FilterSelect options={['Daily','Weekly','Monthly']} />
            </div>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={dynBookingOverTime} margin={{ top:4, right:4, left:-20, bottom:0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="day" tick={{ fontSize:10, fill:'#94a3b8', fontWeight:600, color:'#0f172a' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize:10, fill:'#94a3b8', fontWeight:600, color:'#0f172a' }} axisLine={false} tickLine={false} tickFormatter={v => v>=1000?(v/1000)+'K':v} />
                <Tooltip content={<LineTooltip />} />
                <Legend iconType="circle" iconSize={8} wrapperStyle={{ fontSize:11, paddingTop:6, fontWeight:600, color:'#0f172a' }} />
                <Line type="monotone" dataKey="total"  name="Total Bookings"  stroke="#3b82f6" strokeWidth={3} dot={false} />
                <Line type="monotone" dataKey="users"   name="Completed"   stroke="#22c55e" strokeWidth={3} dot={false} />
                <Line type="monotone" dataKey="partners"  name="Cancelled"  stroke="#8b5cf6" strokeWidth={3} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div style={{ background:'#fff', borderRadius:10, padding:'18px', boxShadow:'0 1px 3px rgba(0,0,0,0.05)', border:'1px solid #e8edf2', display:'flex', flexDirection:'column' }}>
            <h2 style={{ fontSize:13, fontWeight:800, color:'#0f172a', margin:'0 0 12px' }}>Top Categories</h2>
            <div style={{ display:'flex', alignItems:'center', gap:14 }}>
              <PieChart width={140} height={140}>
                <Pie data={dynCategoryDist} cx={70} cy={70} innerRadius={42} outerRadius={65} paddingAngle={2} dataKey="value" startAngle={90} endAngle={-270}>
                  {dynCategoryDist.map((e,i) => <Cell key={i} fill={e.color} />)}
                  <DonutCenter viewBox={{ cx:70, cy:70 }} value={fmtNum(dynCategoryDist.reduce((acc,curr)=>acc+curr.value,0))} label="Total Usage" />
                </Pie>
                <Tooltip formatter={v => fmtNum(v)} />
              </PieChart>
              <div style={{ flex:1, display:'flex', flexDirection:'column', gap:8 }}>
                {dynCategoryDist.map((item,i) => (
                  <div key={i} style={{ display:'flex', alignItems:'center', justifyContent:'space-between', fontSize:10.5 }}>
                    <div style={{ display:'flex', alignItems:'center', gap:5 }}>
                      <span style={{ width:7, height:7, borderRadius:'50%', background:item.color, flexShrink:0, display:'inline-block' }} />
                      <span style={{ color:'#475569', fontWeight:600, color:'#0f172a' }}>{item.name}</span>
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
            <h2 style={{ fontSize:13, fontWeight:800, color:'#0f172a', margin:'0 0 12px' }}>Category Performance</h2>
            <table style={{ width:'100%', fontSize:10.5 }}>
              <thead>
                <tr style={{ borderBottom:'1px solid #f1f5f9' }}>
                  <th style={{ textAlign:'left', color:'#94a3b8', paddingBottom:6, fontWeight:600, color:'#0f172a' }}>Service Type</th>
                  <th style={{ textAlign:'right', color:'#94a3b8', paddingBottom:6, fontWeight:600, color:'#0f172a' }}>Total Bookings</th>
                  <th style={{ textAlign:'right', color:'#94a3b8', paddingBottom:6, fontWeight:600, color:'#0f172a' }}>Completed</th>
                  <th style={{ textAlign:'right', color:'#94a3b8', paddingBottom:6, fontWeight:600, color:'#0f172a' }}>Total Value</th>
                  <th style={{ textAlign:'right', color:'#94a3b8', paddingBottom:6, fontWeight:600, color:'#0f172a' }}>% Share</th>
                </tr>
              </thead>
              <tbody>
                {dynCategoryPerformance.map(r => (
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
        <div style={{ margin: '0 24px', background:'#fff', borderRadius:10, padding:'18px', boxShadow:'0 1px 3px rgba(0,0,0,0.05)', border:'1px solid #e8edf2', overflowX:'auto' }}>
          <h2 style={{ fontSize:13, fontWeight:800, color:'#0f172a', margin:'0 0 12px' }}>Detailed Booking Logs</h2>
          <table style={{ width:'100%', borderCollapse:'collapse', fontSize:10, minWidth:900 }}>
            <thead>
              <tr style={{ borderBottom:'1px solid #f1f5f9' }}>
                <th style={{ padding:'8px 6px', textAlign:'left', fontWeight:700, color:'#94a3b8', whiteSpace:'nowrap' }}>Booking ID</th>
                <th style={{ padding:'8px 6px', textAlign:'left', fontWeight:700, color:'#94a3b8', whiteSpace:'nowrap' }}>Generated By</th>
                <th style={{ padding:'8px 6px', textAlign:'left', fontWeight:700, color:'#94a3b8', whiteSpace:'nowrap' }}>Customer Name</th>
                <th style={{ padding:'8px 6px', textAlign:'left', fontWeight:700, color:'#94a3b8', whiteSpace:'nowrap' }}>Service Category</th>
                <th style={{ padding:'8px 6px', textAlign:'left', fontWeight:700, color:'#94a3b8', whiteSpace:'nowrap' }}>Status</th>
                <th colSpan="3" style={{ padding:'8px 6px', textAlign:'center', fontWeight:700, color:'#94a3b8', whiteSpace:'nowrap' }}>Tasks Assigned</th>
                <th style={{ padding:'8px 6px', textAlign:'left', fontWeight:700, color:'#94a3b8', whiteSpace:'nowrap' }}>Priority</th>
                <th style={{ padding:'8px 6px', textAlign:'right', fontWeight:700, color:'#94a3b8', whiteSpace:'nowrap' }}>Total Amount</th>
                <th style={{ padding:'8px 6px', textAlign:'left', fontWeight:700, color:'#94a3b8', whiteSpace:'nowrap' }}>Scheduled Date</th>
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
              {bookingsPerformance.map((r,i) => (
                <tr key={i} style={{ borderBottom:i<bookingsPerformance.length-1?'1px solid #f8fafc':'none' }}>
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
            <span style={{ fontSize:10, color:'#64748b', fontWeight:600, color:'#0f172a' }}>Page 1 of 257</span>
            <button style={{ border:'1px solid #dde3ea', background:'#fff', padding:'4px 8px', borderRadius:4, cursor:'pointer' }}>{'<'}</button>
            <button style={{ border:'none', background:'#2563eb', color:'#fff', padding:'4px 10px', borderRadius:4, cursor:'pointer', fontWeight:600, color:'#0f172a' }}>1</button>
            <button style={{ border:'none', background:'transparent', color:'#475569', padding:'4px 10px', borderRadius:4, cursor:'pointer', fontWeight:600, color:'#0f172a' }}>2</button>
            <button style={{ border:'none', background:'transparent', color:'#475569', padding:'4px 10px', borderRadius:4, cursor:'pointer', fontWeight:600, color:'#0f172a' }}>3</button>
            <button style={{ border:'1px solid #dde3ea', background:'#fff', padding:'4px 8px', borderRadius:4, cursor:'pointer' }}>{'>'}</button>
          </div>
        </div>
    </>
  );
}

function ListingScreen({ bookings, handlers }) {
  const [filters, setFilters] = useState({ id: '', customer: '', service: '', partner: '', status: 'All' });
  const [period, setPeriod] = useState('Monthly');
  const [filterTrigger, setFilterTrigger] = useState(0);
  
  const filtered = useMemo(() => {
    // We add filterTrigger as a dependency to force re-render when Apply is clicked
    return bookings.filter((booking) => {
    const textMatch = (key, query) => !query || normalize(booking[key]).includes(normalize(query));
    return textMatch('id', filters.id)
      && textMatch('customer', filters.customer)
      && textMatch('service', filters.service)
      && textMatch('partner', filters.partner)
      && (filters.status === 'All' || booking.status === filters.status);
    });
  }, [bookings, filters, filterTrigger]);

  const update = (key, value) => setFilters((current) => ({ ...current, [key]: value }));

  return (
    <>
      <section className="booking-toolbar">
        <div>
          <strong>Master Registry</strong>
          <span>Central database of service bookings and deployments.</span>
        </div>
        <ActionButton icon={Download} onClick={() => handlers.toast('Booking export prepared.')}>Export</ActionButton>
        <ActionButton icon={SlidersHorizontal} onClick={() => handlers.toast('Bulk action drawer opened.')}>Bulk Actions</ActionButton>
      </section>

      {/* ── Filter Bar (Combined Card) ── */}
      <div className="ref-filter-bar" style={{ margin: '0 24px 20px', width: 'auto' }}>
        {/* ╌ Row 1: Location + Period + Month/Year + Apply/Reset ╌ */}
        <div className="ref-filter-row">
          {/* Location dropdowns */}
          <div className="ref-filter-group">
            <label>State</label>
            <div className="ref-select-wrap">
              <select className="ref-select" style={{ minWidth: '110px' }}>
                <option>All States</option>
                <option>Maharashtra</option>
                <option>Karnataka</option>
                <option>Tamil Nadu</option>
                <option>Delhi</option>
              </select>
              <ChevronDown size={12} className="ref-select-arrow" />
            </div>
          </div>

          <div className="ref-filter-group">
            <label>City</label>
            <div className="ref-select-wrap">
              <select className="ref-select" style={{ minWidth: '110px' }}>
                <option>All Cities</option>
                <option>Mumbai</option>
                <option>Bengaluru</option>
                <option>Chennai</option>
              </select>
              <ChevronDown size={12} className="ref-select-arrow" />
            </div>
          </div>

          <div className="ref-filter-group">
            <label>District</label>
            <div className="ref-select-wrap">
              <select className="ref-select" style={{ minWidth: '110px' }}>
                <option>All Districts</option>
                <option>Andheri</option>
                <option>Koramangala</option>
                <option>T. Nagar</option>
              </select>
              <ChevronDown size={12} className="ref-select-arrow" />
            </div>
          </div>

          {/* Divider */}
          <div className="ref-filter-divider" />

          {/* Period Toggle */}
          <div className="ref-period-toggle" style={{ alignSelf: 'flex-end' }}>
            {['Daily', 'Weekly', 'Monthly', 'Yearly'].map(p => (
              <button
                key={p}
                className={`ref-period-btn${period === p ? ' active' : ''}`}
                onClick={() => setPeriod(p)}
              >{p}</button>
            ))}
          </div>

          {/* Month dropdown */}
          <div className="ref-filter-group" style={{ minWidth: '90px' }}>
            <label>Month</label>
            <div className="ref-select-wrap">
              <select className="ref-select ref-select-sm">
                {['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'].map(m => (
                  <option key={m}>{m}</option>
                ))}
              </select>
              <ChevronDown size={12} className="ref-select-arrow" />
            </div>
          </div>

          {/* Year dropdown */}
          <div className="ref-filter-group" style={{ minWidth: '90px' }}>
            <label>Year</label>
            <div className="ref-select-wrap">
              <select className="ref-select ref-select-sm">
                {['2026','2027','2028','2029','2030','2031','2032','2033','2034','2035'].map(y => (
                  <option key={y}>{y}</option>
                ))}
              </select>
              <ChevronDown size={12} className="ref-select-arrow" />
            </div>
          </div>

          {/* Apply + Reset pushed right */}
          <div style={{ marginLeft: 'auto', display: 'flex', gap: '8px', alignSelf: 'flex-end' }}>
            <button
              className="ref-btn-primary"
              onClick={() => { setFilterTrigger(prev => prev + 1); toast.success('Filters applied'); }}
            >Apply</button>
            <button
              className="ref-btn-secondary"
              onClick={() => { 
                setPeriod('Monthly'); 
                setFilters({ id: '', customer: '', service: '', partner: '', status: 'All' });
                setFilterTrigger(0); 
                toast.success('Filters reset'); 
              }}
            >Reset</button>
          </div>
        </div>

        {/* ╌ Row 2: Booking specific filters ╌ */}
        <div className="ref-filter-row">
          <div className="ref-filter-group ref-filter-group-wide">
            <label>Booking ID</label>
            <input className="ref-select" style={{ border: '1px solid #e2e8f0', background: '#fff', borderRadius: '6px', padding: '0 12px', height: '36px', fontSize: '12px' }} placeholder="Search ID" value={filters.id} onChange={(e) => update('id', e.target.value)} />
          </div>
          
          <div className="ref-filter-group ref-filter-group-wide">
            <label>Customer Name</label>
            <input className="ref-select" style={{ border: '1px solid #e2e8f0', background: '#fff', borderRadius: '6px', padding: '0 12px', height: '36px', fontSize: '12px' }} placeholder="Search Customer" value={filters.customer} onChange={(e) => update('customer', e.target.value)} />
          </div>

          <div className="ref-filter-group ref-filter-group-wide">
            <label>Service</label>
            <input className="ref-select" style={{ border: '1px solid #e2e8f0', background: '#fff', borderRadius: '6px', padding: '0 12px', height: '36px', fontSize: '12px' }} placeholder="Search Service" value={filters.service} onChange={(e) => update('service', e.target.value)} />
          </div>

          <div className="ref-filter-divider" />

          <div className="ref-filter-group ref-filter-group-wide">
            <label>Partner</label>
            <input className="ref-select" style={{ border: '1px solid #e2e8f0', background: '#fff', borderRadius: '6px', padding: '0 12px', height: '36px', fontSize: '12px' }} placeholder="Search Partner" value={filters.partner} onChange={(e) => update('partner', e.target.value)} />
          </div>

          <div className="ref-filter-group ref-filter-group-wide">
            <label>Status</label>
            <div className="ref-select-wrap">
              <select className="ref-select" value={filters.status} onChange={(e) => update('status', e.target.value)}>
                <option value="All">All Status</option>
                {Object.keys(statusTone).map(s => <option key={s} value={s}>{s}</option>)}
              </select>
              <ChevronDown size={12} className="ref-select-arrow" />
            </div>
          </div>
        </div>
      </div>

      <BookingTable rows={filtered} {...handlers} />
    </>
  );
}

function StatusScreen({ bookings, status, handlers, title }) {
  const rows = status === 'Accepted' ? bookings.filter((item) => item.status === 'Assigned') : bookings.filter((item) => item.status === status);
  return (
    <>
      <section className="booking-kpi-grid compact">
        <KpiCard title={title} value={rows.length} icon={ListChecks} trend="Filtered from lifecycle" />
        <KpiCard title="High Priority" value={rows.filter((item) => ['High', 'Critical'].includes(item.priority)).length} icon={AlertTriangle} trend="Needs review" tone="amber" />
        <KpiCard title="Avg Value" value={money(rows.reduce((sum, item) => sum + item.amount, 0) / Math.max(rows.length, 1))} icon={IndianRupee} trend="Current queue" tone="green" />
      </section>
      <BookingTable rows={rows} {...handlers} />
    </>
  );
}

function AssignmentScreen({ bookings, onToast, handlers }) {
  const [tab, setTab] = useState('Queue');
  const assignmentCards = tab === 'Partner' ? partners : tab === 'Branch' ? branches : employees;
  return (
    <>
      <div className="booking-segment large">
        {['Queue', 'Partner', 'Branch', 'Employee'].map((item) => (
          <button className={tab === item ? 'active' : ''} type="button" key={item} onClick={() => setTab(item)}>
            {item === 'Queue' ? 'Assignment Queue' : `${item} Assignment`}
          </button>
        ))}
      </div>
      {tab === 'Queue' ? (
        <BookingTable rows={bookings.filter((item) => ['Pending', 'Assigned', 'Material Pending', 'Quotation Pending'].includes(item.status))} {...handlers} />
      ) : (
        <section className="booking-card-grid">
          {assignmentCards.map((item) => (
            <article className="booking-panel booking-choice-card" key={item.name}>
              <span className="booking-avatar large">{item.name[0]}</span>
              <h3>{item.name}</h3>
              <p>{Object.entries(item).filter(([key]) => key !== 'name').map(([key, value]) => `${key}: ${value}`).join(' • ')}</p>
              <ActionButton icon={UserCheck} variant="primary" onClick={() => onToast(`${tab} assigned successfully.`)}>Assign</ActionButton>
            </article>
          ))}
        </section>
      )}
    </>
  );
}

function BoardScreen({ bookings, handlers }) {
  const columns = ['Pending', 'Assigned', 'In Progress', 'Completed', 'Cancelled'];
  return (
    <section className="booking-board">
      {columns.map((column) => (
        <div className="booking-board-column" key={column}>
          <h3><span />{column}</h3>
          {bookings.filter((booking) => booking.status === column).map((booking) => (
            <button className="booking-board-card" type="button" key={booking.id} onClick={() => handlers.view(booking)}>
              <strong>{booking.id}</strong>
              <span>{booking.service}</span>
              <small>{booking.employee} • {booking.eta}</small>
            </button>
          ))}
        </div>
      ))}
    </section>
  );
}

function OtpScreen({ bookings, onToast }) {
  const pending = bookings.find((item) => item.status === 'OTP Pending') || bookings[0];
  const [currentOtp, setCurrentOtp] = useState(pending.otp || '123456');
  const [isVerified, setIsVerified] = useState(false);
  const [bookingId, setBookingId] = useState(pending.id || 'BK-5590');

  return (
    <section className="booking-split">
      <article className="booking-panel">
        <StatusBadge tone={isVerified ? "success" : "warning"}>{isVerified ? "Verified" : "Pending Action"}</StatusBadge>
        <h3>Field Verification</h3>
        <label>Booking ID</label>
        <input 
          value={bookingId} 
          onChange={(e) => setBookingId(e.target.value)} 
          placeholder="Enter Booking ID"
        />
        <div className="booking-otp">
          {currentOtp.split('').map((digit, index) => <span key={index}>{digit}</span>)}
        </div>
        <div className="booking-row-actions wide">
          <ActionButton 
            icon={ShieldAlert} 
            variant={isVerified ? "ghost" : "primary"}
            onClick={() => {
              if (isVerified) return;
              setIsVerified(true);
              onToast('OTP verified successfully.', 'success');
            }}
          >
            {isVerified ? "Verified" : "Verify Booking"}
          </ActionButton>
          <ActionButton 
            icon={RefreshCcw} 
            onClick={() => {
              const newOtp = Math.floor(100000 + Math.random() * 900000).toString();
              setCurrentOtp(newOtp);
              setIsVerified(false);
              onToast('New OTP generated.', 'info');
            }}
          >
            Regenerate OTP
          </ActionButton>
        </div>
      </article>
      <article className="booking-panel">
        <div className="booking-panel-head">
          <h3>Verification Logs</h3>
          <ActionButton 
            icon={Download} 
            onClick={() => {
              onToast('Preparing OTP logs...', 'info');
              setTimeout(() => onToast('OTP_Logs.csv downloaded successfully.', 'success'), 1500);
            }}
          >
            Download CSV
          </ActionButton>
        </div>
        {['Invalid OTP attempt', 'OTP regenerated by system', 'Initial OTP dispatched', 'High-value booking start'].map((event, index) => (
          <div className="booking-log-row" key={event}><strong>{event}</strong><span>Oct 24, 2023 - 14:{32 + index}</span></div>
        ))}
      </article>
    </section>
  );
}

function CancellationScreen({ bookings, onToast }) {
  const row = bookings.find((item) => item.status === 'Cancelled') || bookings[0];
  return (
    <section className="booking-split">
      <article className="booking-panel">
        <h3>Booking Details</h3>
        <div className="booking-detail-list">
          <div><span>Booking</span><strong>{row.id}</strong></div>
          <div><span>Customer</span><strong>{row.customer}</strong></div>
          <div><span>Cancellation Reason</span><strong>{row.cancellationReason}</strong></div>
          <div><span>Refund Impact</span><strong>{money(row.amount * 0.8)}</strong></div>
          <div><span>Penalty Impact</span><strong>{money(row.amount * 0.05)}</strong></div>
        </div>
      </article>
      <article className="booking-price-card">
        <h3>Cancellation Decision</h3>
        <p>Review cancellation reason, partner effort, and payment state before approval.</p>
        <button type="button" onClick={() => onToast('Cancellation approved locally.')}>Approve Cancellation</button>
        <button className="danger" type="button" onClick={() => onToast('Cancellation rejected locally.')}>Reject Cancellation</button>
      </article>
    </section>
  );
}

function RefundScreen({ bookings, onToast }) {
  const initialRows = bookings.filter((item) => ['Cancelled', 'Refunded', 'Disputed'].includes(item.status));
  const [rows, setRows] = useState(initialRows);

  const pendingCount = 122 + rows.filter(r => r.status === 'Cancelled' || r.status === 'Disputed').length;
  const approvedTotal = 42890 + rows.filter(r => r.status === 'REFUNDED' && r.id !== 'BK-7741').reduce((sum, r) => sum + r.amount, 0);
  const failedCount = 3 + rows.filter(r => r.status === 'REJECTED').length;

  const handleAction = (id, action) => {
    setRows(rows.map(row => {
      if (row.id === id) {
        return { ...row, status: action === 'Approve' ? 'REFUNDED' : 'REJECTED' };
      }
      return row;
    }));
    onToast(`Refund ${action.toLowerCase()}d for ${id}.`, action === 'Approve' ? 'success' : 'danger');
  };

  return (
    <>
      <section className="booking-kpi-grid compact">
        <KpiCard title="Pending Refunds" value={pendingCount} icon={Wallet} trend="+12.5%" tone="amber" />
        <KpiCard title="Processed Refunds" value={money(approvedTotal)} icon={CheckCircle2} trend="+4.2%" tone="green" />
        <KpiCard title="Failed Refunds" value={failedCount} icon={AlertTriangle} trend="-18%" tone="red" />
      </section>
      <div className="booking-table-wrap">
        <div className="table-responsive-wrapper">
<table className="booking-table">
          <thead><tr><th>Booking</th><th>Customer</th><th>Amount</th><th>Reason</th><th>Status</th><th>Actions</th></tr></thead>
          <tbody>{rows.map((row) => {
            const isResolved = row.status === 'REFUNDED' || row.status === 'REJECTED' || row.status.toUpperCase() === 'REFUNDED';
            return (
              <tr key={row.id}>
                <td>{row.id}</td>
                <td>{row.customer}</td>
                <td>{money(row.amount)}</td>
                <td>{row.refundReason}</td>
                <td><StatusBadge tone={row.status.toUpperCase() === 'REFUNDED' ? 'success' : row.status === 'REJECTED' ? 'danger' : 'warning'}>{row.status.toUpperCase()}</StatusBadge></td>
                <td>
                  {isResolved ? (
                    <span style={{ fontSize: '13px', fontWeight: '700', color: row.status.toUpperCase() === 'REFUNDED' ? 'var(--success)' : 'var(--danger)' }}>
                      {row.status.toUpperCase() === 'REFUNDED' ? 'Approved' : 'Rejected'}
                    </span>
                  ) : (
                    <div className="booking-row-actions">
                      <button type="button" onClick={() => handleAction(row.id, 'Approve')}>Approve</button>
                      <button type="button" onClick={() => handleAction(row.id, 'Reject')}>Reject</button>
                    </div>
                  )}
                </td>
              </tr>
            );
          })}</tbody>
        </table>
</div>
      </div>
    </>
  );
}


function InvoiceScreen({ bookings, onToast, handlers }) {
  return (
    <section className="booking-split">
      <BookingTable rows={bookings.filter((item) => ['Completed', 'Refunded', 'In Progress'].includes(item.status))} {...handlers} compact />
      <article className="booking-panel invoice-preview">
        <h3>Invoice Preview</h3>
        <strong>INV-2823-001</strong>
        <p>Alpha Corp • Premium logistics service</p>
        <b>{money(42500)}</b>
        <div className="booking-row-actions wide">
          <ActionButton icon={Download} onClick={() => onToast('Invoice downloaded.')}>Download</ActionButton>
          <ActionButton icon={Mail} onClick={() => onToast('Invoice emailed.')}>Email</ActionButton>
          <ActionButton icon={Send} onClick={() => onToast('Invoice sent on WhatsApp.')}>WhatsApp</ActionButton>
          <ActionButton icon={Printer} onClick={() => onToast('Print dialog opened.')}>Print</ActionButton>
        </div>
      </article>
    </section>
  );
}

function PaymentsScreen({ onToast }) {
  const rows = [
    ['Gross Booking Value', '₹4,250.00'],
    ['Platform Revenue', '₹637.50'],
    ['Partner Revenue', '₹2,337.50'],
    ['Employee Share', '₹850.00'],
    ['Taxes & Fees', '-₹425.00'],
    ['Net Settlement', '₹3,825.00']
  ];
  return (
    <section className="booking-split">
      <article className="booking-panel">
        <h3>Settlement Breakdown</h3>
        <div className="booking-detail-list">{rows.map(([label, value]) => <div key={label}><span>{label}</span><strong>{value}</strong></div>)}</div>
      </article>
      <article className="booking-price-card">
        <h3>Net Settlement Amount</h3>
        <div className="total"><span>Payable total</span><strong>₹3,825.00</strong></div>
        <button type="button" onClick={() => onToast('Settlement authorized.')}>Authorize Disbursement</button>
        <button className="secondary" type="button" onClick={() => onToast('Settlement finalized.')}>Finalize Settlement</button>
      </article>
    </section>
  );
}

function EscalationScreen({ bookings, onToast }) {
  return (
    <section className="booking-split">
      <article className="booking-panel">
        <div className="booking-panel-head"><h3>Active High Priority Cases</h3><StatusBadge tone="danger">Urgent Only</StatusBadge></div>
        {bookings.filter((item) => ['Escalated', 'Disputed'].includes(item.status)).map((item) => (
          <div className="booking-case-row" key={item.id}>
            <strong>{item.id}</strong><span>{item.customer}</span><StatusBadge tone="danger">{item.priority}</StatusBadge><button type="button" onClick={() => onToast(`${item.id} response team assigned.`)}><MoreVertical size={15} /></button>
          </div>
        ))}
      </article>
      <article className="booking-price-card">
        <h3>Case Control</h3>
        <button type="button" onClick={() => onToast('Response team assigned.')}>Assign Response Team</button>
        <button className="secondary" type="button" onClick={() => onToast('Case escalated to senior management.')}>Escalate</button>
        <button className="success" type="button" onClick={() => onToast('Case resolved.')}>Resolve Case</button>
      </article>
    </section>
  );
}

function DisputeScreen({ bookings, onToast }) {
  const dispute = bookings.find((item) => item.status === 'Disputed') || bookings[0];
  return (
    <section className="booking-split">
      <article className="booking-panel">
        <h3>Dispute Summary</h3>
        <div className="booking-detail-list">
          <div><span>Booking ID</span><strong>{dispute.id}</strong></div>
          <div><span>Customer</span><strong>{dispute.customer}</strong></div>
          <div><span>Assigned Provider</span><strong>{dispute.partner}</strong></div>
          <div><span>Claim Amount</span><strong>{money(dispute.amount)}</strong></div>
        </div>
        <div className="booking-evidence">Evidence viewer • 3 files attached</div>
      </article>
      <article className="booking-panel">
        <h3>Resolution Actions</h3>
        <div className="booking-card-grid small">
          <button type="button" onClick={() => onToast('Refund issue opened.')}><Wallet size={22} /> Issue Refund</button>
          <button type="button" onClick={() => onToast('Claim rejected.')}><Ban size={22} /> Reject Claim</button>
          <button type="button" onClick={() => onToast('Dispute escalated.')}><AlertTriangle size={22} /> Escalate</button>
        </div>
      </article>
    </section>
  );
}

function AnalyticsScreen({ bookings, onToast, handlers }) {
  return (
    <>
      <section className="booking-kpi-grid compact">
        <KpiCard title="Total Bookings" value="12,482" icon={ClipboardCheck} trend="+12%" />
        <KpiCard title="Completion Rate" value="94.2%" icon={CheckCircle2} trend="+0.5%" tone="green" />
        <KpiCard title="Cancellation Rate" value="3.8%" icon={XCircle} trend="-1.2%" tone="red" />
        <KpiCard title="Avg. Revenue" value="₹342.50" icon={BadgeIndianRupee} trend="+4.1%" />
      </section>
      <section className="booking-dashboard-grid two">
        <article className="booking-panel"><h3>Booking Funnel</h3><MiniBars values={[92, 64, 52, 44]} /></article>
        <article className="booking-panel"><h3>Revenue Funnel Trend</h3><MiniBars values={[42, 57, 50, 72, 64, 82, 90]} /></article>
      </section>
      <article className="booking-panel">
        <div className="booking-panel-head"><h3>Booking Reports</h3><ActionButton icon={Download} onClick={() => onToast('Booking reports exported.')}>Export Reports</ActionButton></div>
        <BookingTable rows={bookings.slice(0, 4)} {...handlers} compact />
      </article>
    </>
  );
}

function CommunicationsScreen({ onToast }) {
  const [channel, setChannel] = useState('SMS');
  const channels = ['SMS', 'Push', 'WhatsApp', 'Email'];
  return (
    <section className="booking-split">
      <article className="booking-panel">
        <div className="booking-panel-head">
          <h3>Message Composer</h3>
          <ActionButton icon={FileText} onClick={() => onToast('Communication draft saved.')}>Save Draft</ActionButton>
        </div>
        <div className="booking-segment large">
          {channels.map((item) => (
            <button className={channel === item ? 'active' : ''} type="button" key={item} onClick={() => setChannel(item)}>
              {item}
            </button>
          ))}
        </div>
        <div className="booking-filter-grid">
          <Select
            defaultValue="Customers"
            options={[{
              label: "Customers",
              value: "Customers"
            }, {
              label: "Partners",
              value: "Partners"
            }, {
              label: "Employees",
              value: "Employees"
            }]} />
          <Select
            defaultValue="Booking confirmation"
            options={[{
              label: "Booking confirmation",
              value: "Booking confirmation"
            }, {
              label: "Delay alert",
              value: "Delay alert"
            }, {
              label: "Invoice ready",
              value: "Invoice ready"
            }]} />
        </div>
        <textarea className="booking-message-box" defaultValue={`Hello {{first_name}}, your booking {{service_type}} has been updated. Our team will arrive at {{scheduled_time}}.`} />
        <ActionButton icon={Send} variant="primary" onClick={() => onToast(`${channel} outreach queued locally.`)}>Blast Outreach</ActionButton>
      </article>
      <article className="booking-panel">
        <h3>Recent Activity Logs</h3>
        {['Sarah Jenkins • Delivered', 'Weekly Partner Update • Pending', 'Marcus Thomas • Replied', 'System Notification • Failed'].map((item) => (
          <div className="booking-log-row" key={item}><strong>{item}</strong><span>Booking communication</span></div>
        ))}
      </article>
    </section>
  );
}

function ReportsScreen({ onToast }) {
  const reports = ['Booking Report', 'Revenue Report', 'Cancellation Report', 'Refund Report', 'Employee Performance Report'];
  return (
    <section className="booking-card-grid">
      {reports.map((report) => (
        <article className="booking-panel booking-choice-card" key={report}>
          <FileText size={28} />
          <h3>{report}</h3>
          <p>Generated from current booking lifecycle data with filters ready for finance and operations review.</p>
          <div className="booking-row-actions wide">
            <ActionButton icon={Download} onClick={() => onToast(`${report} PDF exported.`)}>PDF</ActionButton>
            <ActionButton icon={Download} onClick={() => onToast(`${report} Excel exported.`)}>Excel</ActionButton>
            <ActionButton icon={Download} onClick={() => onToast(`${report} CSV exported.`)}>CSV</ActionButton>
          </div>
        </article>
      ))}
    </section>
  );
}

function CalendarScreen({ bookings }) {
  return (
    <section className="booking-calendar">
      {['Mon 23', 'Tue 24', 'Wed 25', 'Thu 26', 'Fri 27', 'Sat 28', 'Sun 29'].map((day, index) => (
        <div key={day}>
          <strong>{day}</strong>
          {bookings.slice(index, index + 2).map((booking) => <span key={booking.id} className={booking.status === 'Completed' ? 'done' : ''}>{booking.service}</span>)}
        </div>
      ))}
    </section>
  );
}

function MapScreen({ bookings }) {
  return (
    <section className="booking-map-grid">
      <div className="booking-map">
        {bookings.slice(0, 7).map((booking, index) => <span key={booking.id} style={{ left: `${18 + index * 10}%`, top: `${24 + (index % 4) * 13}%` }}>{index + 1}</span>)}
      </div>
      <aside className="booking-panel">
        <h3>Live Feed</h3>
        {bookings.slice(0, 4).map((booking) => <div className="booking-feed-row" key={booking.id}><span className="booking-avatar">{booking.customer[0]}</span><div><strong>{booking.id}</strong><small>{booking.status} • {booking.distance}</small></div></div>)}
      </aside>
    </section>
  );
}

function SlaScreen({ bookings, onToast, handlers }) {
  return (
    <>
      <section className="booking-kpi-grid compact">
        <KpiCard title="Within SLA" value={bookings.filter((item) => item.sla === 'Within SLA').length} icon={CheckCircle2} tone="green" />
        <KpiCard title="Outside SLA" value={bookings.filter((item) => item.sla === 'Breached').length} icon={Clock} tone="amber" />
        <KpiCard title="Escalated" value={bookings.filter((item) => item.status === 'Escalated').length} icon={Flag} tone="red" />
        <KpiCard title="Critical" value={bookings.filter((item) => item.sla === 'Critical').length} icon={ShieldAlert} tone="red" />
      </section>
      <article className="booking-panel">
        <div className="booking-panel-head"><h3>Live SLA Breach Monitor</h3><ActionButton icon={Route} onClick={() => onToast('Auto-reassignment suggested.')}>Auto-Reassign</ActionButton></div>
        <BookingTable rows={bookings.filter((item) => ['Breached', 'Critical', 'Warning'].includes(item.sla))} {...handlers} compact />
      </article>
      <section className="booking-dashboard-grid two"><article className="booking-panel"><h3>Response Time</h3><MiniBars danger /></article><article className="booking-panel"><h3>Completion Time</h3><MiniBars values={[80, 70, 62, 50, 44, 30]} /></article></section>
    </>
  );
}

function FraudScreen({ bookings, onToast }) {
  const suspicious = bookings.filter((item) => item.risk > 50);
  return (
    <>
      <section className="booking-kpi-grid compact">
        <KpiCard title="Multiple Bookings" value="15" icon={ClipboardCheck} tone="green" />
        <KpiCard title="Refund Abuse" value="8.4k" icon={Wallet} tone="amber" />
        <KpiCard title="Fake Customer" value="124" icon={Users} />
        <KpiCard title="Suspicious Payment" value="42" icon={ShieldAlert} tone="red" />
      </section>
      <section className="booking-split">
        <article className="booking-panel">
          <h3>Recent Suspicious Events</h3>
          {suspicious.map((item) => <div className="booking-case-row" key={item.id}><strong>{item.id}</strong><span>{item.customer}</span><StatusBadge tone="danger">Risk {item.risk}</StatusBadge><button type="button" onClick={() => onToast('Investigation opened.')}><MoreVertical size={15} /></button></div>)}
        </article>
        <article className="booking-risk-card">
          <AlertTriangle size={34} />
          <span>Critical Risk Score</span>
          <strong>94</strong>
          <div className="booking-row-actions wide"><ActionButton onClick={() => onToast('Booking frozen.')}>Freeze</ActionButton><ActionButton onClick={() => onToast('Investigation started.')}>Investigate</ActionButton><ActionButton onClick={() => onToast('Risk escalated.')}>Escalate</ActionButton></div>
        </article>
      </section>
    </>
  );
}

function ArchiveScreen({ bookings, onToast, handlers }) {
  const rows = bookings.filter((item) => ['Completed', 'Refunded', 'Cancelled'].includes(item.status));
  return (
    <>
      <section className="booking-toolbar"><div><strong>Closed & Archived Bookings</strong><span>Historical reports and restore-ready records.</span></div><ActionButton icon={Archive} onClick={() => onToast('Archive report downloaded.')}>Historical Reports</ActionButton></section>
      <BookingTable rows={rows} {...handlers} />
    </>
  );
}

function DetailsScreen({ booking, onBack, onToast }) {
  const [tab, setTab] = useState('Overview');
  const tabs = ['Overview', 'Customer', 'Partner', 'Employee', 'Timeline', 'Materials', 'Quotations', 'Tracking', 'Payments', 'Invoice', 'Reviews', 'Disputes', 'Audit Logs'];
  const timeline = ['Booking Created', 'Partner Assigned', 'Quotation Generated', 'Quotation Approved', 'Employee Assigned', 'OTP Generated', 'Work Started', 'Work Completed', 'Invoice Generated', 'Payment Settled', 'Review Submitted', 'Booking Closed'];

  const renderTab = () => {
    if (tab === 'Timeline') return <div className="booking-timeline">{timeline.map((item, index) => <div key={item}><span>{index + 1}</span><strong>{item}</strong><small>{index < 7 ? 'Completed' : 'Pending'}</small></div>)}</div>;
    if (tab === 'Materials') return <GenericRows rows={['Material Requests approved', 'Material Cost ₹12,400', 'Vendor Pro Supplies', 'Purchase History verified']} action="Modify Material" onToast={onToast} />;
    if (tab === 'Quotations') return <GenericRows rows={['QT-1201 • Pro Seller • ₹42,000 • Approved', 'QT-1202 • Direct Seller • ₹45,500 • Compare', 'QT-1203 • City Vendor • ₹44,000 • Reject']} action="Approve Quotation" onToast={onToast} />;
    if (tab === 'Tracking') return <MapScreen bookings={[booking]} />;
    if (tab === 'Payments') return <PaymentsScreen onToast={onToast} />;
    if (tab === 'Invoice') return <InvoiceScreen bookings={[booking]} onToast={onToast} />;
    if (tab === 'Reviews') return <GenericRows rows={['Customer Rating 4.8', 'Partner Rating 4.6', 'Employee Rating 4.9', 'Review Date Oct 27, 2023']} action="Flag Review" onToast={onToast} />;
    if (tab === 'Disputes') return <DisputeScreen bookings={[booking]} onToast={onToast} />;
    if (tab === 'Audit Logs') return <GenericRows rows={['Admin updated status • 10.4.2.11', 'System generated OTP • 10.4.2.21', 'Ops approved material • 10.4.2.45']} action="Export Logs" onToast={onToast} />;
    if (tab === 'Customer') return <GenericRows rows={[booking.customer, booking.mobile, booking.email, booking.location, 'Wallet balance ₹2,450']} action="Open Customer" onToast={onToast} />;
    if (tab === 'Partner') return <GenericRows rows={[booking.partner, booking.branch, 'Partner rating 4.7', 'Revenue contribution ₹8.1L']} action="Open Partner" onToast={onToast} />;
    if (tab === 'Employee') return <GenericRows rows={[booking.employee, 'Rating 4.8', 'Current status active', 'Performance score 92%']} action="Reassign Employee" onToast={onToast} />;
    return (
      <section className="booking-detail-grid">
        {[
          ['Booking Information', [['Reference #', booking.id], ['Type', booking.category], ['Duration', '3 Days'], ['Source', 'Direct API']]],
          ['Service Information', [['Main Category', booking.category], ['Service', booking.service], ['Priority', booking.priority], ['Risk Level', `${booking.risk}/100`]]],
          ['Location Information', [['Location', booking.location], ['Distance', booking.distance], ['ETA', booking.eta], ['Status', booking.status]]],
          ['Payment Information', [['Total Amount', money(booking.amount)], ['Paid', booking.payment], ['Pending', money(booking.amount * 0.35)], ['Refund', booking.refundReason]]],
          ['Assignment Information', [['Partner', booking.partner], ['Branch', booking.branch], ['Employee', booking.employee], ['SLA', booking.sla]]],
          ['Current Status', [['Completion', '65%'], ['Tasks', '12 / 18'], ['Issues', '1 Open'], ['Last update', '2 hours ago']]]
        ].map(([title, rows]) => <DetailCard key={title} title={title} rows={rows} />)}
      </section>
    );
  };

  return (
    <>
      <button className="booking-back" type="button" onClick={onBack}><ArrowLeft size={16} /> Back to bookings</button>
      <section className="booking-hero">
        <div>
          <span>ID: {booking.id}</span>
          <StatusBadge tone={statusTone[booking.status]}>{booking.status}</StatusBadge>
          <h2>{booking.service}</h2>
          <p>{booking.customer} • {booking.date} • {money(booking.amount)}</p>
        </div>
        <ActionButton icon={Download} onClick={() => onToast('Invoice downloaded.')}>Download Invoice</ActionButton>
        <ActionButton icon={FileText} variant="primary" onClick={() => onToast('Booking editor opened.')}>Edit Booking</ActionButton>
      </section>
      <div className="booking-tabs">{tabs.map((item) => <button type="button" className={tab === item ? 'active' : ''} key={item} onClick={() => setTab(item)}>{item}</button>)}</div>
      {renderTab()}
    </>
  );
}

function DetailCard({ title, rows }) {
  return (
    <article className="booking-panel detail-card">
      <h3>{title}</h3>
      {rows.map(([label, value]) => <div key={label}><span>{label}</span><strong>{value}</strong></div>)}
    </article>
  );
}

function GenericRows({ rows, action, onToast }) {
  return (
    <article className="booking-panel">
      {rows.map((row) => <div className="booking-log-row" key={row}><strong>{row}</strong><span>Operational record</span></div>)}
      <ActionButton icon={CheckCircle2} variant="primary" onClick={() => onToast(`${action} completed.`)}>{action}</ActionButton>
    </article>
  );
}

export default function BookingManagement() {
  const { route, navigate } = useApp();
  const [bookings, setBookings] = useState(initialBookings);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [feedback, setFeedback] = useState('');
  const meta = routeMeta[route] || routeMeta[ROUTES.bookings];

  useEffect(() => {
    setSelectedBooking(null);
  }, [route]);

  const toast = (message) => {
    setFeedback(message);
    window.setTimeout(() => setFeedback(''), 2200);
  };

  const handlers = {
    view: (booking) => setSelectedBooking(booking),
    track: (booking) => {
      toast(`Tracking opened for ${booking.id}.`);
      navigate(ROUTES.bookingMap);
    },
    assign: (booking) => {
      setBookings((current) => current.map((item) => item.id === booking.id ? { ...item, status: 'Assigned', employee: item.employee === 'Unassigned' ? 'Marcus Reed' : item.employee } : item));
      toast(`${booking.id} assignment updated.`);
    },
    invoice: (booking) => {
      toast(`Invoice preview opened for ${booking.id}.`);
      navigate(ROUTES.bookingInvoices);
    },
    openListing: () => navigate(ROUTES.bookingAll),

    toast
  };

  const content = () => {
    if (selectedBooking) return <DetailsScreen booking={selectedBooking} onBack={() => setSelectedBooking(null)} onToast={toast} />;
    if (meta.screen === 'dashboard') return <DashboardScreen bookings={bookings} handlers={handlers} navigate={navigate} ROUTES={ROUTES} />;
    if (meta.screen === 'listing') return <ListingScreen bookings={bookings} handlers={handlers} />;
    if (meta.screen === 'status') return <StatusScreen bookings={bookings} status={meta.status} title={meta.title} handlers={handlers} />;

    if (meta.screen === 'assignment') return <AssignmentScreen bookings={bookings} onToast={toast} handlers={handlers} />;
    if (meta.screen === 'board') return <BoardScreen bookings={bookings} handlers={handlers} />;
    if (meta.screen === 'otp') return <OtpScreen bookings={bookings} onToast={toast} />;
    if (meta.screen === 'cancellation') return <CancellationScreen bookings={bookings} onToast={toast} />;
    if (meta.screen === 'refunds') return <RefundScreen bookings={bookings} onToast={toast} />;
    if (meta.screen === 'invoices') return <InvoiceScreen bookings={bookings} onToast={toast} handlers={handlers} />;
    if (meta.screen === 'payments') return <PaymentsScreen onToast={toast} />;
    if (meta.screen === 'escalation') return <EscalationScreen bookings={bookings} onToast={toast} />;
    if (meta.screen === 'dispute') return <DisputeScreen bookings={bookings} onToast={toast} />;
    if (meta.screen === 'analytics') return <AnalyticsScreen bookings={bookings} onToast={toast} handlers={handlers} />;
    if (meta.screen === 'calendar') return <CalendarScreen bookings={bookings} />;
    if (meta.screen === 'map') return <MapScreen bookings={bookings} />;
    if (meta.screen === 'sla') return <SlaScreen bookings={bookings} onToast={toast} handlers={handlers} />;
    if (meta.screen === 'fraud') return <FraudScreen bookings={bookings} onToast={toast} />;
    if (meta.screen === 'communications') return <CommunicationsScreen onToast={toast} />;
    if (meta.screen === 'reports') return <ReportsScreen onToast={toast} />;
    if (meta.screen === 'archive') return <ArchiveScreen bookings={bookings} onToast={toast} handlers={handlers} />;
    return <DashboardScreen bookings={bookings} handlers={handlers} navigate={navigate} ROUTES={ROUTES} />;
  };

  const isDashboard = !selectedBooking && meta.screen === 'dashboard';

  return (
    <AdminShell
      activeTab="Booking Management"
      headerTitle={selectedBooking ? 'Booking Details' : meta.title}
      searchPlaceholder="Search bookings, clients, or IDs..."
    >
      {feedback && <div className="booking-feedback"><CheckCircle2 size={16} /> {feedback}</div>}
      {isDashboard ? (
        <section className="booking-module">
          {content()}
        </section>
      ) : (
        <section className="booking-module">
          <div className="booking-page-head">
            <div>
              <h1>{selectedBooking ? 'Booking Details' : meta.title}</h1>
              <p>{selectedBooking ? `${selectedBooking.id} • ${selectedBooking.customer} • ${selectedBooking.status}` : meta.subtitle}</p>
            </div>
            <div className="booking-page-actions">
              <ActionButton icon={Bell} onClick={() => toast('Operational alerts refreshed.')}>Alerts</ActionButton>
            </div>
          </div>
          {!selectedBooking && <GlobalDashboardFilters />}
          {content()}
        </section>
      )}
    </AdminShell>
  );
}
