import React, { useState, useMemo } from 'react';
import {
  Users,
  CheckCircle2,
  AlertTriangle,
  UserCheck,
  Search,
  Download,
  Eye,
  Pencil,
  Calendar,
  ChevronLeft,
  ChevronRight,
  ChevronsUpDown,
  ChevronDown,
  ShieldCheck,
  AlertCircle
} from 'lucide-react';
import AdminShell from '../../components/layouts/AdminShell';
import { useToast } from '../../components/common/ToastNotification';
import ActivityLogViewModal from './ActivityLogViewModal';
import ActivityLogEditModal from './ActivityLogEditModal';
import ExportReportModal from '../../components/common/ExportReportModal';

// ─── INITIAL MOCK DATA (MATCHING SCREENSHOT) ────────────────────────────────

const initialLogs = [
  {
    id: 'ACT-0001',
    sNo: 1,
    dateTime: '22 Jul 2026 10:45 AM',
    userName: 'Ramesh Kumar',
    userType: 'Service Provider',
    role: 'ISP',
    mobileNumber: '9876543210',
    moduleName: 'Bookings',
    activityType: 'Create',
    description: 'New booking created for Booking ID: BK000123',
    ipAddress: '192.168.1.45',
    status: 'Success',
    oldValue: 'Draft',
    newValue: 'BK000123 Created',
    emailId: 'ramesh.kumar@example.com',
    deviceType: 'Mobile App',
    browser: 'Android App v2.4',
    operatingSystem: 'Android 13',
    deviceLocation: 'Hyderabad, Telangana',
    createdBy: 'Ramesh Kumar'
  },
  {
    id: 'ACT-0002',
    sNo: 2,
    dateTime: '22 Jul 2026 10:30 AM',
    userName: 'Suresh Babu',
    userType: 'Seller',
    role: 'BS',
    mobileNumber: '9123456780',
    moduleName: 'Quotations',
    activityType: 'Submit',
    description: 'Quotation submitted for MR ID: MR000456',
    ipAddress: '192.168.1.52',
    status: 'Success',
    oldValue: 'Pending Submission',
    newValue: 'Quotation #QT-904 Submitting ₹4,500',
    emailId: 'suresh.babu@example.com',
    deviceType: 'Web Portal',
    browser: 'Chrome 125',
    operatingSystem: 'Windows 11',
    deviceLocation: 'Bengaluru, Karnataka',
    createdBy: 'Suresh Babu'
  },
  {
    id: 'ACT-0003',
    sNo: 3,
    dateTime: '22 Jul 2026 10:15 AM',
    userName: 'Anita Sharma',
    userType: 'Customer',
    role: 'User',
    mobileNumber: '9988776655',
    moduleName: 'Orders',
    activityType: 'Update Status',
    description: 'Order status changed to Order Ready for Order ID: OR000789',
    ipAddress: '192.168.1.33',
    status: 'Success',
    oldValue: 'In Progress',
    newValue: 'Order Ready',
    emailId: 'anita.sharma@example.com',
    deviceType: 'iOS App',
    browser: 'Safari Mobile',
    operatingSystem: 'iOS 17.4',
    deviceLocation: 'Mumbai, Maharashtra',
    createdBy: 'Anita Sharma'
  },
  {
    id: 'ACT-0004',
    sNo: 4,
    dateTime: '22 Jul 2026 10:02 AM',
    userName: 'Venkatesh',
    userType: 'Service Provider',
    role: 'BSP',
    mobileNumber: '9911223344',
    moduleName: 'Material Request',
    activityType: 'Update',
    description: 'Material request updated MR ID: MR000321',
    ipAddress: '192.168.1.45',
    status: 'Success',
    oldValue: '5 items requested',
    newValue: '8 items requested',
    emailId: 'venkatesh@example.com',
    deviceType: 'Web Portal',
    browser: 'Edge 125',
    operatingSystem: 'Windows 10',
    deviceLocation: 'Chennai, Tamil Nadu',
    createdBy: 'Venkatesh'
  },
  {
    id: 'ACT-0005',
    sNo: 5,
    dateTime: '22 Jul 2026 09:50 AM',
    userName: 'Manish Patel',
    userType: 'Seller',
    role: 'BS',
    mobileNumber: '9567891230',
    moduleName: 'Inventory',
    activityType: 'Update',
    description: 'Inventory updated for Product: PVC Pipe 1 inch',
    ipAddress: '192.168.1.77',
    status: 'Success',
    oldValue: 'Stock: 120 units',
    newValue: 'Stock: 250 units',
    emailId: 'manish.patel@example.com',
    deviceType: 'Web Portal',
    browser: 'Chrome 124',
    operatingSystem: 'macOS Sonoma',
    deviceLocation: 'Ahmedabad, Gujarat',
    createdBy: 'Manish Patel'
  },
  {
    id: 'ACT-0006',
    sNo: 6,
    dateTime: '22 Jul 2026 09:40 AM',
    userName: 'Priya Singh',
    userType: 'Customer',
    role: 'User',
    mobileNumber: '9001122334',
    moduleName: 'Payments',
    activityType: 'Payment',
    description: 'Payment of ₹ 2,450 successful for Order ID: OR000654',
    ipAddress: '192.168.1.29',
    status: 'Success',
    oldValue: 'Payment Pending',
    newValue: 'Paid ₹2,450 via UPI',
    emailId: 'priya.singh@example.com',
    deviceType: 'Android App',
    browser: 'Android App v2.4',
    operatingSystem: 'Android 14',
    deviceLocation: 'Delhi NCR',
    createdBy: 'Priya Singh'
  },
  {
    id: 'ACT-0007',
    sNo: 7,
    dateTime: '22 Jul 2026 09:25 AM',
    userName: 'Karthik R',
    userType: 'Service Provider',
    role: 'ISP',
    mobileNumber: '9988112233',
    moduleName: 'Bookings',
    activityType: 'Cancel',
    description: 'Booking cancelled Booking ID: BK000111',
    ipAddress: '192.168.1.56',
    status: 'Failed',
    oldValue: 'Confirmed',
    newValue: 'Cancelled',
    emailId: 'karthik.r@example.com',
    deviceType: 'Mobile App',
    browser: 'Android App v2.3',
    operatingSystem: 'Android 13',
    deviceLocation: 'Kochi, Kerala',
    createdBy: 'Karthik R'
  },
  {
    id: 'ACT-0008',
    sNo: 8,
    dateTime: '22 Jul 2026 09:10 AM',
    userName: 'Rohit Verma',
    userType: 'Customer',
    role: 'User',
    mobileNumber: '8899001122',
    moduleName: 'Profile',
    activityType: 'Update',
    description: 'Profile information updated',
    ipAddress: '192.168.1.66',
    status: 'Success',
    oldValue: 'Address: Flat 101',
    newValue: 'Address: Flat 402, Green Glen Layout',
    emailId: 'rohit.verma@example.com',
    deviceType: 'iOS App',
    browser: 'Safari Mobile',
    operatingSystem: 'iOS 17.2',
    deviceLocation: 'Pune, Maharashtra',
    createdBy: 'Rohit Verma'
  },
  {
    id: 'ACT-0009',
    sNo: 9,
    dateTime: '22 Jul 2026 08:55 AM',
    userName: 'Admin User',
    userType: 'Admin',
    role: 'Super Admin',
    mobileNumber: '7778889990',
    moduleName: 'User Management',
    activityType: 'Suspend',
    description: 'User suspended User ID: USR000789',
    ipAddress: '192.168.1.10',
    status: 'Success',
    oldValue: 'Active',
    newValue: 'Suspended',
    emailId: 'admin.user@hozify.com',
    deviceType: 'Web Portal',
    browser: 'Chrome 125',
    operatingSystem: 'Windows 11',
    deviceLocation: 'Hozify HQ',
    createdBy: 'Super Admin'
  },
  {
    id: 'ACT-0010',
    sNo: 10,
    dateTime: '22 Jul 2026 08:30 AM',
    userName: 'Sunil Kumar',
    userType: 'Seller',
    role: 'BS',
    mobileNumber: '9665544332',
    moduleName: 'Login',
    activityType: 'Login',
    description: 'User logged in successfully',
    ipAddress: '192.168.1.23',
    status: 'Success',
    oldValue: 'Logged Out',
    newValue: 'Logged In',
    emailId: 'sunil.kumar@example.com',
    deviceType: 'Web Portal',
    browser: 'Firefox 126',
    operatingSystem: 'Windows 10',
    deviceLocation: 'Jaipur, Rajasthan',
    createdBy: 'Sunil Kumar'
  }
];

// ─── HELPERS ─────────────────────────────────────────────────────────────────

function getActivityTypeColor(type) {
  const green = '#16a34a';
  const blue = '#2563eb';
  const red = '#dc2626';

  if (type === 'Create' || type === 'Submit' || type === 'Update Status' || type === 'Update') return green;
  if (type === 'Payment' || type === 'Login') return green; // Screenshot 1 shows Payment/Login in green
  if (type === 'Cancel' || type === 'Suspend') return red;
  return green;
}

function getStatusBadge(status) {
  if (status === 'Success') {
    return (
      <span style={{ padding: '3px 10px', borderRadius: '6px', fontSize: '12px', fontWeight: 600, background: '#e6f4ea', color: '#137333' }}>
        Success
      </span>
    );
  }
  return (
    <span style={{ padding: '3px 10px', borderRadius: '6px', fontSize: '12px', fontWeight: 600, background: '#fce8e6', color: '#c5221f' }}>
      Failed
    </span>
  );
}

// ─── MAIN COMPONENT ───────────────────────────────────────────────────────────

export default function UserActivityLogs() {
  const { addToast } = useToast();

  // Dynamic Logs State
  const [logs, setLogs]                 = useState(initialLogs);

  // Single Row Filter States
  const [dateRange, setDateRange]       = useState('22 Jun 2026 - 22 Jul 2026');
  const [moduleSelect, setModuleSelect] = useState('All Modules');
  const [typeSelect, setTypeSelect]     = useState('All');
  const [statusSelect, setStatusSelect] = useState('All');
  const [mobileSearch, setMobileSearch] = useState('');

  // Table & Modal & Pagination state
  const [viewLog, setViewLog]           = useState(null);
  const [editLog, setEditLog]           = useState(null);
  const [isExportOpen, setIsExportOpen] = useState(false);
  const [currentPage, setCurrentPage]   = useState(1);
  const [showFilter, setShowFilter]     = useState(false);
  const [tableSearch, setTableSearch]   = useState('');
  const perPage = 10;

  // Handle Save Edit
  const handleSaveEdit = (updatedLog) => {
    setLogs(prev => prev.map(item => item.id === updatedLog.id ? updatedLog : item));
    setEditLog(null);
    addToast('Activity log updated successfully', 'success');
  };

  // Reset Filters
  const handleReset = () => {
    setDateRange('22 Jun 2026 - 22 Jul 2026');
    setModuleSelect('All Modules');
    setTypeSelect('All');
    setStatusSelect('All');
    setMobileSearch('');
    setCurrentPage(1);
    addToast('Filters reset to default', 'info');
  };

  // Apply Search
  const handleSearch = () => {
    setCurrentPage(1);
    addToast('Activity logs filtered successfully', 'success');
  };

  // Filtered Logs
  const filteredLogs = useMemo(() => {
    return logs.filter(log => {
      const matchMod = moduleSelect === 'All Modules' || log.moduleName === moduleSelect;
      const matchType = typeSelect === 'All' || log.activityType === typeSelect;
      const matchStatus = statusSelect === 'All' || log.status === statusSelect;
      const matchMobile = !mobileSearch.trim() || log.mobileNumber.includes(mobileSearch.trim());
      const q = tableSearch.trim().toLowerCase();
      const matchSearch = !q ||
        log.userName.toLowerCase().includes(q) ||
        log.mobileNumber.includes(q) ||
        log.moduleName.toLowerCase().includes(q) ||
        log.activityType.toLowerCase().includes(q) ||
        log.description.toLowerCase().includes(q);
      return matchMod && matchType && matchStatus && matchMobile && matchSearch;
    });
  }, [logs, moduleSelect, typeSelect, statusSelect, mobileSearch, tableSearch]);

  // Pagination calculation
  const totalPages = Math.max(1, Math.ceil(filteredLogs.length / perPage));
  const currentLogs = useMemo(() => {
    const start = (currentPage - 1) * perPage;
    return filteredLogs.slice(start, start + perPage);
  }, [filteredLogs, currentPage, perPage]);

  const handlePageChange = (p) => {
    if (p >= 1 && p <= totalPages) {
      setCurrentPage(p);
    }
  };

  return (
    <AdminShell activeTab="User Activity Logs" searchPlaceholder="Search user activities...">
      <div style={{ paddingBottom: '48px', fontFamily: "'Inter', -apple-system, sans-serif" }}>



        {/* ── SINGLE-ROW FILTER PANEL (MATCHING SCREENSHOT) ── */}
        <div style={{
          background: '#fff', borderRadius: 12, padding: '16px 20px',
          border: '1px solid #e8edf2', boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
          marginBottom: 20, display: 'flex', flexDirection: 'column', gap: 14
        }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1.2fr 1fr 1fr 1.4fr auto', gap: 14, alignItems: 'flex-end' }}>

            {/* Date Range */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              <label style={{ fontSize: 11, fontWeight: 600, color: '#475569' }}>Date Range</label>
              <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                <Calendar size={13} style={{ position: 'absolute', left: 10, color: '#64748b', pointerEvents: 'none' }} />
                <input
                  type="text"
                  value={dateRange}
                  onChange={e => setDateRange(e.target.value)}
                  style={{
                    width: '100%', padding: '7px 10px 7px 30px', border: '1px solid #dde3ea',
                    borderRadius: 6, fontSize: 12, fontWeight: 500, color: '#334155', outline: 'none', background: '#fff'
                  }}
                />
              </div>
            </div>

            {/* Activity Module */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              <label style={{ fontSize: 11, fontWeight: 600, color: '#475569' }}>Activity Module</label>
              <div style={{ position: 'relative' }}>
                <select value={moduleSelect} onChange={e => setModuleSelect(e.target.value)} style={{
                  width: '100%', appearance: 'none', background: '#fff', border: '1px solid #dde3ea',
                  borderRadius: 6, padding: '7px 28px 7px 10px', fontSize: 12,
                  fontWeight: 500, color: '#334155', cursor: 'pointer', outline: 'none'
                }}>
                  {['All Modules', 'Bookings', 'Quotations', 'Orders', 'Material Request', 'Inventory', 'Payments', 'Profile', 'User Management', 'Login'].map(o => <option key={o}>{o}</option>)}
                </select>
                <ChevronDown size={12} style={{ position: 'absolute', right: 8, top: '50%', transform: 'translateY(-50%)', color: '#64748b', pointerEvents: 'none' }} />
              </div>
            </div>

            {/* Activity Type */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              <label style={{ fontSize: 11, fontWeight: 600, color: '#475569' }}>Activity Type</label>
              <div style={{ position: 'relative' }}>
                <select value={typeSelect} onChange={e => setTypeSelect(e.target.value)} style={{
                  width: '100%', appearance: 'none', background: '#fff', border: '1px solid #dde3ea',
                  borderRadius: 6, padding: '7px 28px 7px 10px', fontSize: 12,
                  fontWeight: 500, color: '#334155', cursor: 'pointer', outline: 'none'
                }}>
                  {['All', 'Create', 'Submit', 'Update Status', 'Update', 'Payment', 'Cancel', 'Suspend', 'Login'].map(o => <option key={o}>{o}</option>)}
                </select>
                <ChevronDown size={12} style={{ position: 'absolute', right: 8, top: '50%', transform: 'translateY(-50%)', color: '#64748b', pointerEvents: 'none' }} />
              </div>
            </div>

            {/* Status */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              <label style={{ fontSize: 11, fontWeight: 600, color: '#475569' }}>Status</label>
              <div style={{ position: 'relative' }}>
                <select value={statusSelect} onChange={e => setStatusSelect(e.target.value)} style={{
                  width: '100%', appearance: 'none', background: '#fff', border: '1px solid #dde3ea',
                  borderRadius: 6, padding: '7px 28px 7px 10px', fontSize: 12,
                  fontWeight: 500, color: '#334155', cursor: 'pointer', outline: 'none'
                }}>
                  {['All', 'Success', 'Failed'].map(o => <option key={o}>{o}</option>)}
                </select>
                <ChevronDown size={12} style={{ position: 'absolute', right: 8, top: '50%', transform: 'translateY(-50%)', color: '#64748b', pointerEvents: 'none' }} />
              </div>
            </div>

            {/* Mobile Number Search */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              <label style={{ fontSize: 11, fontWeight: 600, color: '#475569' }}>Mobile Number</label>
              <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                <Search size={13} style={{ position: 'absolute', left: 10, color: '#94a3b8', pointerEvents: 'none' }} />
                <input
                  type="text"
                  placeholder="Enter Mobile Number"
                  value={mobileSearch}
                  onChange={e => setMobileSearch(e.target.value)}
                  style={{
                    width: '100%', padding: '7px 10px 7px 30px', border: '1px solid #dde3ea',
                    borderRadius: 6, fontSize: 12, fontWeight: 500, color: '#334155', outline: 'none', background: '#fff'
                  }}
                />
              </div>
            </div>

            {/* Reset & Search Buttons */}
            <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
              <button
                onClick={handleReset}
                style={{
                  padding: '7px 20px', borderRadius: 6, border: '1px solid #dde3ea',
                  background: '#fff', color: '#334155', fontSize: 12, fontWeight: 600,
                  cursor: 'pointer', transition: 'background 0.15s'
                }}
                onMouseEnter={e => e.currentTarget.style.background = '#f8fafc'}
                onMouseLeave={e => e.currentTarget.style.background = '#fff'}
              >
                Reset
              </button>
              <button
                onClick={handleSearch}
                style={{
                  padding: '7px 26px', borderRadius: 6, border: 'none',
                  background: '#2563eb', color: '#fff', fontSize: 12, fontWeight: 600,
                  cursor: 'pointer', transition: 'background 0.15s'
                }}
                onMouseEnter={e => e.currentTarget.style.background = '#1d4ed8'}
                onMouseLeave={e => e.currentTarget.style.background = '#2563eb'}
              >
                Search
              </button>
            </div>

          </div>
        </div>

        {/* ── 4 KPI STAT CARDS (UNIFIED CONTAINER MATCHING SCREENSHOT) ── */}
        <div style={{
          background: '#fff', borderRadius: 12, border: '1px solid #e8edf2',
          padding: '18px 24px', boxShadow: '0 1px 3px rgba(0,0,0,0.04)', marginBottom: 20,
          display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)'
        }}>

          {/* Card 1: Total Activities */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, paddingRight: 20, borderRight: '1px solid #e8edf2' }}>
            <div style={{ width: 44, height: 44, borderRadius: '50%', background: '#2563eb', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <Users size={20} color="#fff" />
            </div>
            <div>
              <div style={{ fontSize: 12, color: '#64748b', fontWeight: 500, marginBottom: 2 }}>Total Activities</div>
              <div style={{ fontSize: 20, fontWeight: 800, color: '#0f172a' }}>12,458</div>
            </div>
          </div>

          {/* Card 2: Successful Activities */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, paddingLeft: 20, paddingRight: 20, borderRight: '1px solid #e8edf2' }}>
            <div style={{ width: 44, height: 44, borderRadius: '50%', background: '#059669', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <ShieldCheck size={20} color="#fff" />
            </div>
            <div>
              <div style={{ fontSize: 12, color: '#64748b', fontWeight: 500, marginBottom: 2 }}>Successful Activities</div>
              <div style={{ fontSize: 20, fontWeight: 800, color: '#0f172a' }}>11,230</div>
            </div>
          </div>

          {/* Card 3: Failed Activities */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, paddingLeft: 20, paddingRight: 20, borderRight: '1px solid #e8edf2' }}>
            <div style={{ width: 44, height: 44, borderRadius: '50%', background: '#d97706', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <AlertCircle size={20} color="#fff" />
            </div>
            <div>
              <div style={{ fontSize: 12, color: '#64748b', fontWeight: 500, marginBottom: 2 }}>Failed Activities</div>
              <div style={{ fontSize: 20, fontWeight: 800, color: '#0f172a' }}>1,128</div>
            </div>
          </div>

          {/* Card 4: Unique Users */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, paddingLeft: 20 }}>
            <div style={{ width: 44, height: 44, borderRadius: '50%', background: '#7c3aed', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <UserCheck size={20} color="#fff" />
            </div>
            <div>
              <div style={{ fontSize: 12, color: '#64748b', fontWeight: 500, marginBottom: 2 }}>Unique Users</div>
              <div style={{ fontSize: 20, fontWeight: 800, color: '#0f172a' }}>2,145</div>
            </div>
          </div>

        </div>

        {/* ── TABLE CARD ── */}
        <div style={{ background: '#fff', borderRadius: 12, border: '1px solid #e8edf2', boxShadow: '0 1px 3px rgba(0,0,0,0.04)', overflow: 'hidden' }}>

          <div style={{
            maxHeight: '520px',
            overflowX: 'auto',
            overflowY: 'auto',
            position: 'relative'
          }}>
            <table style={{ width: '100%', minWidth: '1000px', borderCollapse: 'collapse', textAlign: 'left', fontSize: 13 }}>
              <thead style={{ position: 'sticky', top: 0, zIndex: 10, background: '#f8fafc', boxShadow: '0 1px 2px rgba(0,0,0,0.05)' }}>
                <tr style={{ background: '#f8fafc', borderBottom: '1px solid #e2e8f0' }}>
                  <th style={{ padding: '12px 16px', fontWeight: 600, color: '#475569', fontSize: 12 }}>S.No</th>
                  <th style={{ padding: '12px 16px', fontWeight: 600, color: '#475569', fontSize: 12, whiteSpace: 'nowrap' }}>
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}>
                      Date & Time <ChevronsUpDown size={12} color="#94a3b8" />
                    </span>
                  </th>
                  <th style={{ padding: '12px 16px', fontWeight: 600, color: '#475569', fontSize: 12 }}>
                    User Name<br /><span style={{ fontSize: 10, fontWeight: 500, color: '#94a3b8' }}>User Type</span>
                  </th>
                  <th style={{ padding: '12px 16px', fontWeight: 600, color: '#475569', fontSize: 12 }}>Mobile Number</th>
                  <th style={{ padding: '12px 16px', fontWeight: 600, color: '#475569', fontSize: 12 }}>Activity Module</th>
                  <th style={{ padding: '12px 16px', fontWeight: 600, color: '#475569', fontSize: 12 }}>Activity Type</th>
                  <th style={{ padding: '12px 16px', fontWeight: 600, color: '#475569', fontSize: 12 }}>Description</th>
                  <th style={{ padding: '12px 16px', fontWeight: 600, color: '#475569', fontSize: 12 }}>Status</th>
                  <th style={{ padding: '12px 16px', fontWeight: 600, color: '#475569', fontSize: 12, textAlign: 'center' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentLogs.length === 0 ? (
                  <tr>
                    <td colSpan={9} style={{ padding: '40px', textAlign: 'center', color: '#94a3b8' }}>
                      No activity logs found matching the filter criteria.
                    </td>
                  </tr>
                ) : currentLogs.map((log) => {
                  return (
                    <tr key={log.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                      <td style={{ padding: '14px 16px', color: '#64748b' }}>{log.sNo}</td>
                      <td style={{ padding: '14px 16px', color: '#334155', whiteSpace: 'nowrap' }}>{log.dateTime}</td>
                      <td style={{ padding: '14px 16px' }}>
                        <div style={{ fontWeight: 600, color: '#0f172a' }}>{log.userName}</div>
                        <div style={{ fontSize: 11, color: '#64748b' }}>{log.userType}</div>
                      </td>
                      <td style={{ padding: '14px 16px', color: '#334155', whiteSpace: 'nowrap' }}>{log.mobileNumber}</td>
                      <td style={{ padding: '14px 16px', color: '#334155' }}>{log.moduleName}</td>
                      <td style={{ padding: '14px 16px', fontWeight: 600, color: getActivityTypeColor(log.activityType) }}>
                        {log.activityType}
                      </td>
                      <td style={{ padding: '14px 16px', color: '#334155', maxWidth: 300 }}>
                        {log.description}
                      </td>
                      <td style={{ padding: '14px 16px' }}>
                        {getStatusBadge(log.status)}
                      </td>
                      <td style={{ padding: '14px 16px', textAlign: 'center' }}>
                          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                            <button
                              title="View Details"
                              onClick={() => setViewLog(log)}
                              style={{
                                border: 'none', background: '#eff6ff', color: '#2563eb',
                                cursor: 'pointer', width: 28, height: 28, borderRadius: '50%',
                                display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                                transition: 'background 0.15s'
                              }}
                              onMouseEnter={e => e.currentTarget.style.background = '#dbeafe'}
                              onMouseLeave={e => e.currentTarget.style.background = '#eff6ff'}
                            >
                              <Eye size={15} />
                            </button>
                            <button
                              title="Edit"
                              onClick={() => setEditLog(log)}
                              style={{
                                border: 'none', background: '#f0fdf4', color: '#16a34a',
                                cursor: 'pointer', width: 28, height: 28, borderRadius: '50%',
                                display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                                transition: 'background 0.15s'
                              }}
                              onMouseEnter={e => e.currentTarget.style.background = '#dcfce7'}
                              onMouseLeave={e => e.currentTarget.style.background = '#f0fdf4'}
                            >
                              <Pencil size={14} />
                            </button>
                          </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* ── FOOTER / INTERACTIVE PAGINATION (MATCHING SCREENSHOT) ── */}
          <div style={{
            padding: '14px 20px', borderTop: '1px solid #e8edf2', background: '#fff',
            display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12
          }}>
            <span style={{ fontSize: 12, color: '#64748b' }}>
              Showing <strong>{((currentPage - 1) * perPage) + 1} to {Math.min(currentPage * perPage, filteredLogs.length)}</strong> of <strong>{filteredLogs.length.toLocaleString()}</strong> entries
            </span>

            <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
              <div style={{ display: 'flex', gap: 4, alignItems: 'center' }}>
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  style={{
                    border: '1px solid #dde3ea', background: '#fff', padding: '5px 9px', borderRadius: 6,
                    cursor: currentPage === 1 ? 'not-allowed' : 'pointer', opacity: currentPage === 1 ? 0.4 : 1,
                    color: '#64748b', display: 'flex', alignItems: 'center'
                  }}
                >
                  <ChevronLeft size={14} />
                </button>

                <button
                  onClick={() => handlePageChange(1)}
                  style={{
                    border: currentPage === 1 ? 'none' : '1px solid #dde3ea',
                    background: currentPage === 1 ? '#2563eb' : '#fff',
                    color: currentPage === 1 ? '#fff' : '#334155',
                    padding: '5px 10px', borderRadius: 6, cursor: 'pointer',
                    fontSize: 12, fontWeight: currentPage === 1 ? 700 : 500, minWidth: 28
                  }}
                >
                  1
                </button>
                <button
                  onClick={() => handlePageChange(2)}
                  style={{
                    border: currentPage === 2 ? 'none' : '1px solid #dde3ea',
                    background: currentPage === 2 ? '#2563eb' : '#fff',
                    color: currentPage === 2 ? '#fff' : '#334155',
                    padding: '5px 10px', borderRadius: 6, cursor: 'pointer',
                    fontSize: 12, fontWeight: currentPage === 2 ? 700 : 500, minWidth: 28
                  }}
                >
                  2
                </button>
                <button
                  onClick={() => handlePageChange(3)}
                  style={{
                    border: currentPage === 3 ? 'none' : '1px solid #dde3ea',
                    background: currentPage === 3 ? '#2563eb' : '#fff',
                    color: currentPage === 3 ? '#fff' : '#334155',
                    padding: '5px 10px', borderRadius: 6, cursor: 'pointer',
                    fontSize: 12, fontWeight: currentPage === 3 ? 700 : 500, minWidth: 28
                  }}
                >
                  3
                </button>
                <span style={{ padding: '0 4px', color: '#94a3b8', fontSize: 12 }}>...</span>
                <button
                  onClick={() => handlePageChange(1246)}
                  style={{
                    border: '1px solid #dde3ea', background: '#fff', color: '#334155',
                    padding: '5px 10px', borderRadius: 6, cursor: 'pointer',
                    fontSize: 12, minWidth: 34
                  }}
                >
                  1246
                </button>

                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  style={{
                    border: '1px solid #dde3ea', background: '#fff', padding: '5px 9px', borderRadius: 6,
                    cursor: currentPage === totalPages ? 'not-allowed' : 'pointer', opacity: currentPage === totalPages ? 0.4 : 1,
                    color: '#64748b', display: 'flex', alignItems: 'center'
                  }}
                >
                  <ChevronRight size={14} />
                </button>
              </div>

              <button
                onClick={() => setIsExportOpen(true)}
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: 6,
                  padding: '7px 18px', borderRadius: 6, border: 'none',
                  background: '#2563eb', color: '#fff', fontSize: 12, fontWeight: 600,
                  cursor: 'pointer', transition: 'background 0.15s'
                }}
                onMouseEnter={e => e.currentTarget.style.background = '#1d4ed8'}
                onMouseLeave={e => e.currentTarget.style.background = '#2563eb'}
              >
                <Download size={14} /> Export Report
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* View Detail Modal & Edit Modal */}
      <ActivityLogViewModal log={viewLog} onClose={() => setViewLog(null)} />
      <ActivityLogEditModal log={editLog} isOpen={!!editLog} onClose={() => setEditLog(null)} onSave={handleSaveEdit} />
      <ExportReportModal isOpen={isExportOpen} onClose={() => setIsExportOpen(false)} entityName="User Activity Logs" data={filteredLogs} />
    </AdminShell>
  );
}