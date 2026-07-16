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
  CheckCircle2,
  ClipboardCheck,
  Clock,
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
import { ROUTES } from '../../config/routes';
import { useApp } from '../../hooks/useApp';
import GlobalDashboardFilters from '../../components/common/GlobalDashboardFilters';

import Select from "../../components/ui/Select";

const money = (value) =>
  new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(value);

const normalize = (value) => String(value || '').trim().toLowerCase();

const initialBookings = [
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

function DashboardScreen({ bookings, handlers }) {
  const active = bookings.filter((item) => ['Assigned', 'Accepted', 'In Progress'].includes(item.status)).length;
  return (
    <>
      <section className="booking-kpi-grid">
        <KpiCard title="Total Bookings" value={bookings.length} icon={ClipboardCheck} trend="+12% vs last week" />
        <KpiCard title="Active Bookings" value={active} icon={Route} trend="Ongoing operations" />
        <KpiCard title="Pending Bookings" value={bookings.filter((item) => item.status.includes('Pending')).length} icon={Clock} trend="Requires action" tone="amber" />
        <KpiCard title="Completed Bookings" value={bookings.filter((item) => item.status === 'Completed').length} icon={CheckCircle2} trend="This period" tone="green" />
        <KpiCard title="Cancelled" value={bookings.filter((item) => item.status === 'Cancelled').length} icon={XCircle} trend="-4%" tone="red" />
        <KpiCard title="Refunded" value={bookings.filter((item) => item.status === 'Refunded').length} icon={Wallet} trend="Total volume" />
      </section>

      <section className="booking-dashboard-grid">
        <article className="booking-panel wide">
          <div className="booking-panel-head">
            <h3>Operations Analytics</h3>
            <div className="booking-segment"><button className="active" type="button" onClick={(e) => { e.preventDefault(); e.stopPropagation(); toast.success("Action performed successfully!"); }}>Weekly</button><button type="button" onClick={(e) => { e.preventDefault(); e.stopPropagation(); toast.success("Action performed successfully!"); }}>Monthly</button></div>
          </div>
          <div className="booking-chart-grid">
            <div className="booking-chart-card"><span>Booking Trend</span><TrendLine /></div>
            <div className="booking-chart-card"><span>Revenue Growth</span><MiniBars /></div>
          </div>
          <div className="booking-rates">
            <div><strong>92%</strong><span>Completion Rate</span><small>Efficiency is 4.2% higher than previous quarter.</small></div>
            <div><strong>3.8%</strong><span>Cancellation Rate</span><small>Rate dropped to 1.4% following new pre-audit flow.</small></div>
          </div>
        </article>
        <aside className="booking-side-stack">
          <article className="booking-panel alert-panel">
            <div className="booking-panel-head"><h3>Delayed Bookings</h3><StatusBadge tone="danger">4 Alert</StatusBadge></div>
            {bookings.filter((item) => ['Breached', 'Critical'].includes(item.sla)).slice(0, 3).map((item) => (
              <button className="booking-alert-row" type="button" key={item.id} onClick={() => handlers.view(item)}>
                <strong>{item.id} - {item.priority}</strong>
                <span>{item.notes}</span>
              </button>
            ))}
          </article>
          <article className="booking-panel">
            <div className="booking-panel-head">
              <h3>Escalated Cases</h3>
              <button 
                type="button" 
                onClick={(e) => { e.preventDefault(); e.stopPropagation(); toast.success("Escalated cases options opened."); }}
                style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '4px', color: 'var(--text)', display: 'flex', alignItems: 'center' }}
              >
                <MoreVertical size={16} />
              </button>
            </div>
            {bookings.filter((item) => item.status === 'Escalated' || item.status === 'Disputed').map((item) => (
              <div className="booking-feed-row" key={item.id}>
                <span className="booking-avatar">{item.customer[0]}</span>
                <div><strong>{item.service}</strong><small>{item.id} assigned to {item.employee}</small></div>
              </div>
            ))}
          </article>
        </aside>
      </section>

      <article className="booking-panel">
        <div className="booking-panel-head">
          <h3>Latest Bookings</h3>
          <ActionButton onClick={handlers.openListing}>View All</ActionButton>
        </div>
        <BookingTable rows={bookings.slice(0, 5)} {...handlers} compact />
      </article>
    </>
  );
}

function ListingScreen({ bookings, handlers }) {
  const [filters, setFilters] = useState({ id: '', customer: '', service: '', partner: '', status: 'All' });
  const filtered = useMemo(() => bookings.filter((booking) => {
    const textMatch = (key, query) => !query || normalize(booking[key]).includes(normalize(query));
    return textMatch('id', filters.id)
      && textMatch('customer', filters.customer)
      && textMatch('service', filters.service)
      && textMatch('partner', filters.partner)
      && (filters.status === 'All' || booking.status === filters.status);
  }), [bookings, filters]);

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

      <section className="booking-filter-panel">
        <div className="booking-filter-title"><Filter size={16} /> Advanced Filters</div>
        <div className="booking-filter-grid">
          <input placeholder="Booking ID" value={filters.id} onChange={(e) => update('id', e.target.value)} />
          <input placeholder="Customer name" value={filters.customer} onChange={(e) => update('customer', e.target.value)} />
          <input placeholder="Service" value={filters.service} onChange={(e) => update('service', e.target.value)} />
          <input placeholder="Partner" value={filters.partner} onChange={(e) => update('partner', e.target.value)} />
          <Select
            value={filters.status}
            onChange={(e) => update('status', e.target.value)}
            options={[
              { value: "All", label: "All" },
              ...Object.keys(statusTone).map((status) => ({ value: status, label: status }))
            ]}
          />
        </div>
      </section>

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
    if (meta.screen === 'dashboard') return <DashboardScreen bookings={bookings} handlers={handlers} />;
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
    return <DashboardScreen bookings={bookings} handlers={handlers} />;
  };

  return (
    <AdminShell
      activeTab="Booking Management"
      headerTitle={selectedBooking ? 'Booking Details' : meta.title}
      searchPlaceholder="Search bookings, clients, or IDs..."
    >
      {feedback && <div className="booking-feedback"><CheckCircle2 size={16} /> {feedback}</div>}
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
    </AdminShell>
  );
}
