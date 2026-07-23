import React, { useState, useMemo } from 'react';
import {
  Users,
  CheckCircle2,
  AlertTriangle,
  UserCheck,
  Search,
  Download,
  Eye,
  Calendar,
  ChevronLeft,
  ChevronRight,
  ChevronsUpDown,
  ChevronDown
} from 'lucide-react';
import AdminShell from '../../components/layouts/AdminShell';
import { useToast } from '../../components/common/ToastNotification';
import ActivityLogViewModal from './ActivityLogViewModal';
import ExportReportModal from '../../components/common/ExportReportModal';

// ─── INITIAL MOCK DATA ────────────────────────────────────────────────────────

const initialLogs = [
  {
    id: 'ACT-0001',
    sNo: 1,
    dateTime: '22 Jul 2026 10:45 AM',
    userName: 'Ramesh Kumar',
    userType: 'Service Provider',
    role: 'ISP',
    moduleName: 'Bookings',
    activityType: 'Create',
    description: 'New booking created for Booking ID: BK000123',
    ipAddress: '192.168.1.45',
    status: 'Success',
    oldValue: 'Draft',
    newValue: 'BK000123 Created',
    emailId: 'ramesh.kumar@example.com',
    mobileNumber: '+91 98765 11111',
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
    moduleName: 'Quotations',
    activityType: 'Submit',
    description: 'Quotation submitted for MR ID: MR000456',
    ipAddress: '192.168.1.52',
    status: 'Success',
    oldValue: 'Pending Submission',
    newValue: 'Quotation #QT-904 Submitting ₹4,500',
    emailId: 'suresh.babu@example.com',
    mobileNumber: '+91 98765 22222',
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
    moduleName: 'Orders',
    activityType: 'Update Status',
    description: 'Order status changed to Order Ready for Order ID: OR000789',
    ipAddress: '192.168.1.33',
    status: 'Success',
    oldValue: 'In Progress',
    newValue: 'Order Ready',
    emailId: 'anita.sharma@example.com',
    mobileNumber: '+91 98765 33333',
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
    moduleName: 'Material Request',
    activityType: 'Update',
    description: 'Material request updated MR ID: MR000321',
    ipAddress: '192.168.1.45',
    status: 'Success',
    oldValue: '5 items requested',
    newValue: '8 items requested',
    emailId: 'venkatesh@example.com',
    mobileNumber: '+91 98765 44444',
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
    moduleName: 'Inventory',
    activityType: 'Update',
    description: 'Inventory updated for Product: PVC Pipe 1 inch',
    ipAddress: '192.168.1.77',
    status: 'Success',
    oldValue: 'Stock: 120 units',
    newValue: 'Stock: 250 units',
    emailId: 'manish.patel@example.com',
    mobileNumber: '+91 98765 55555',
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
    moduleName: 'Payments',
    activityType: 'Payment',
    description: 'Payment of ₹2,450 successful for Order ID: OR000654',
    ipAddress: '192.168.1.29',
    status: 'Success',
    oldValue: 'Payment Pending',
    newValue: 'Paid ₹2,450 via UPI',
    emailId: 'priya.singh@example.com',
    mobileNumber: '+91 98765 66666',
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
    moduleName: 'Bookings',
    activityType: 'Cancel',
    description: 'Booking cancelled Booking ID: BK000111',
    ipAddress: '192.168.1.56',
    status: 'Failed',
    oldValue: 'Confirmed',
    newValue: 'Cancelled',
    emailId: 'karthik.r@example.com',
    mobileNumber: '+91 98765 77777',
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
    moduleName: 'Profile',
    activityType: 'Update',
    description: 'Profile information updated',
    ipAddress: '192.168.1.66',
    status: 'Success',
    oldValue: 'Address: Flat 101',
    newValue: 'Address: Flat 402, Green Glen Layout',
    emailId: 'rohit.verma@example.com',
    mobileNumber: '+91 98765 88888',
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
    moduleName: 'User Management',
    activityType: 'Suspend',
    description: 'User suspended User ID: USR000789',
    ipAddress: '192.168.1.10',
    status: 'Success',
    oldValue: 'Active',
    newValue: 'Suspended',
    emailId: 'admin.user@hozify.com',
    mobileNumber: '+91 98765 99999',
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
    moduleName: 'Login',
    activityType: 'Login',
    description: 'User logged in successfully',
    ipAddress: '192.168.1.23',
    status: 'Success',
    oldValue: 'Logged Out',
    newValue: 'Logged In',
    emailId: 'sunil.kumar@example.com',
    mobileNumber: '+91 98765 00000',
    deviceType: 'Web Portal',
    browser: 'Firefox 126',
    operatingSystem: 'Windows 10',
    deviceLocation: 'Jaipur, Rajasthan',
    createdBy: 'Sunil Kumar'
  },
  {
    id: 'ACT-0011',
    sNo: 11,
    dateTime: '22 Jul 2026 08:15 AM',
    userName: 'Neha Gupta',
    userType: 'Customer',
    role: 'User',
    moduleName: 'Bookings',
    activityType: 'Create',
    description: 'Deep Cleaning booking initiated BK000210',
    ipAddress: '192.168.1.84',
    status: 'Success',
    oldValue: 'None',
    newValue: 'BK000210 Created',
    emailId: 'neha.gupta@example.com',
    mobileNumber: '+91 98765 12345',
    deviceType: 'Mobile App',
    browser: 'Android App v2.4',
    operatingSystem: 'Android 14',
    deviceLocation: 'Delhi NCR',
    createdBy: 'Neha Gupta'
  },
  {
    id: 'ACT-0012',
    sNo: 12,
    dateTime: '22 Jul 2026 08:00 AM',
    userName: 'Vikram Sharma',
    userType: 'Customer',
    role: 'User',
    moduleName: 'Payments',
    activityType: 'Payment',
    description: 'Wallet recharge of ₹3,200 completed',
    ipAddress: '192.168.1.92',
    status: 'Success',
    oldValue: '₹0',
    newValue: '₹3,200',
    emailId: 'vikram.sharma@example.com',
    mobileNumber: '+91 93333 11220',
    deviceType: 'iOS App',
    browser: 'Safari Mobile',
    operatingSystem: 'iOS 17.5',
    deviceLocation: 'Delhi',
    createdBy: 'Vikram Sharma'
  }
];

// ─── HELPERS ─────────────────────────────────────────────────────────────────

function getActivityTypeStyle(type) {
  const map = {
    'Create':        { color: '#16a34a' },
    'Submit':        { color: '#16a34a' },
    'Update Status': { color: '#16a34a' },
    'Update':        { color: '#16a34a' },
    'Payment':       { color: '#2563eb' },
    'Login':         { color: '#2563eb' },
    'Cancel':        { color: '#dc2626' },
    'Suspend':       { color: '#dc2626' },
  };
  return map[type] || { color: '#2563eb' };
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

  // Filters State
  const [dateRange, setDateRange]       = useState('22 Jun 2026 - 22 Jul 2026');
  const [userType, setUserType]         = useState('All');
  const [userSelect, setUserSelect]     = useState('All Users');
  const [statusSelect, setStatusSelect] = useState('All');
  const [moduleSelect, setModuleSelect] = useState('All Modules');
  const [typeSelect, setTypeSelect]     = useState('All');
  const [ipInput, setIpInput]           = useState('');

  // Table & Modal & Pagination state
  const [viewLog, setViewLog]           = useState(null);
  const [isExportOpen, setIsExportOpen] = useState(false);
  const [currentPage, setCurrentPage]   = useState(1);
  const perPage = 5;

  // Reset Filters
  const handleReset = () => {
    setDateRange('22 Jun 2026 - 22 Jul 2026');
    setUserType('All');
    setUserSelect('All Users');
    setStatusSelect('All');
    setModuleSelect('All Modules');
    setTypeSelect('All');
    setIpInput('');
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
    return initialLogs.filter(log => {
      const matchUT = userType === 'All' || log.userType === userType;
      const matchUser = userSelect === 'All Users' || log.userName === userSelect;
      const matchStatus = statusSelect === 'All' || log.status === statusSelect;
      const matchMod = moduleSelect === 'All Modules' || log.moduleName === moduleSelect;
      const matchType = typeSelect === 'All' || log.activityType === typeSelect;
      const matchIp = !ipInput.trim() || log.ipAddress.includes(ipInput.trim());

      return matchUT && matchUser && matchStatus && matchMod && matchType && matchIp;
    });
  }, [userType, userSelect, statusSelect, moduleSelect, typeSelect, ipInput]);

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

        {/* ── FILTER PANEL ── */}
        <div style={{
          background: '#fff', borderRadius: 12, padding: '16px 20px',
          border: '1px solid #e8edf2', boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
          marginBottom: 20, display: 'flex', flexDirection: 'column', gap: 14
        }}>
          {/* Row 1 Filters */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 14 }}>
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

            {/* User Type */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              <label style={{ fontSize: 11, fontWeight: 600, color: '#475569' }}>User Type</label>
              <div style={{ position: 'relative' }}>
                <select value={userType} onChange={e => setUserType(e.target.value)} style={{
                  width: '100%', appearance: 'none', background: '#fff', border: '1px solid #dde3ea',
                  borderRadius: 6, padding: '7px 28px 7px 10px', fontSize: 12,
                  fontWeight: 500, color: '#334155', cursor: 'pointer', outline: 'none'
                }}>
                  {['All', 'Customer', 'Service Provider', 'Seller', 'Admin'].map(o => <option key={o}>{o}</option>)}
                </select>
                <ChevronDown size={12} style={{ position: 'absolute', right: 8, top: '50%', transform: 'translateY(-50%)', color: '#64748b', pointerEvents: 'none' }} />
              </div>
            </div>

            {/* User */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              <label style={{ fontSize: 11, fontWeight: 600, color: '#475569' }}>User</label>
              <div style={{ position: 'relative' }}>
                <select value={userSelect} onChange={e => setUserSelect(e.target.value)} style={{
                  width: '100%', appearance: 'none', background: '#fff', border: '1px solid #dde3ea',
                  borderRadius: 6, padding: '7px 28px 7px 10px', fontSize: 12,
                  fontWeight: 500, color: '#334155', cursor: 'pointer', outline: 'none'
                }}>
                  {['All Users', 'Ramesh Kumar', 'Suresh Babu', 'Anita Sharma', 'Venkatesh', 'Manish Patel', 'Priya Singh', 'Karthik R', 'Rohit Verma', 'Admin User', 'Sunil Kumar'].map(o => <option key={o}>{o}</option>)}
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
          </div>

          {/* Row 2 Filters */}
          <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1.2fr 1.5fr auto', gap: 14, alignItems: 'flex-end' }}>
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

            {/* IP Address */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              <label style={{ fontSize: 11, fontWeight: 600, color: '#475569' }}>IP Address</label>
              <input
                type="text"
                placeholder="Enter IP Address"
                value={ipInput}
                onChange={e => setIpInput(e.target.value)}
                style={{
                  width: '100%', padding: '7px 10px', border: '1px solid #dde3ea',
                  borderRadius: 6, fontSize: 12, fontWeight: 500, color: '#334155', outline: 'none', background: '#fff'
                }}
              />
            </div>

            {/* Action Buttons */}
            <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end' }}>
              <button
                onClick={handleReset}
                style={{
                  padding: '7px 22px', borderRadius: 6, border: '1px solid #dde3ea',
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

        {/* ── 4 KPI STAT CARDS ── */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 20 }}>
          {/* Card 1: Total Activities */}
          <div style={{ background: '#fff', borderRadius: 12, padding: '16px 20px', border: '1px solid #e8edf2', display: 'flex', alignItems: 'center', gap: 16 }}>
            <div style={{ width: 44, height: 44, borderRadius: '50%', background: '#eff6ff', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <Users size={20} color="#2563eb" />
            </div>
            <div>
              <div style={{ fontSize: 12, color: '#64748b', fontWeight: 500, marginBottom: 2 }}>Total Activities</div>
              <div style={{ fontSize: 22, fontWeight: 800, color: '#0f172a' }}>{filteredLogs.length}</div>
            </div>
          </div>

          {/* Card 2: Successful Activities */}
          <div style={{ background: '#fff', borderRadius: 12, padding: '16px 20px', border: '1px solid #e8edf2', display: 'flex', alignItems: 'center', gap: 16 }}>
            <div style={{ width: 44, height: 44, borderRadius: '50%', background: '#f0fdf4', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <CheckCircle2 size={20} color="#16a34a" />
            </div>
            <div>
              <div style={{ fontSize: 12, color: '#64748b', fontWeight: 500, marginBottom: 2 }}>Successful Activities</div>
              <div style={{ fontSize: 22, fontWeight: 800, color: '#0f172a' }}>{filteredLogs.filter(l => l.status === 'Success').length}</div>
            </div>
          </div>

          {/* Card 3: Failed Activities */}
          <div style={{ background: '#fff', borderRadius: 12, padding: '16px 20px', border: '1px solid #e8edf2', display: 'flex', alignItems: 'center', gap: 16 }}>
            <div style={{ width: 44, height: 44, borderRadius: '50%', background: '#fff7ed', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <AlertTriangle size={20} color="#ea580c" />
            </div>
            <div>
              <div style={{ fontSize: 12, color: '#64748b', fontWeight: 500, marginBottom: 2 }}>Failed Activities</div>
              <div style={{ fontSize: 22, fontWeight: 800, color: '#0f172a' }}>{filteredLogs.filter(l => l.status === 'Failed').length}</div>
            </div>
          </div>

          {/* Card 4: Unique Users */}
          <div style={{ background: '#fff', borderRadius: 12, padding: '16px 20px', border: '1px solid #e8edf2', display: 'flex', alignItems: 'center', gap: 16 }}>
            <div style={{ width: 44, height: 44, borderRadius: '50%', background: '#faf5ff', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <UserCheck size={20} color="#9333ea" />
            </div>
            <div>
              <div style={{ fontSize: 12, color: '#64748b', fontWeight: 500, marginBottom: 2 }}>Unique Users</div>
              <div style={{ fontSize: 22, fontWeight: 800, color: '#0f172a' }}>{new Set(filteredLogs.map(l => l.userName)).size}</div>
            </div>
          </div>
        </div>

        {/* ── TABLE CARD ── */}
        <div style={{ background: '#fff', borderRadius: 12, border: '1px solid #e8edf2', boxShadow: '0 1px 3px rgba(0,0,0,0.05)', overflow: 'hidden' }}>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: 13 }}>
              <thead>
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
                  <th style={{ padding: '12px 16px', fontWeight: 600, color: '#475569', fontSize: 12 }}>Mobile No.</th>
                  <th style={{ padding: '12px 16px', fontWeight: 600, color: '#475569', fontSize: 12 }}>Activity Module</th>
                  <th style={{ padding: '12px 16px', fontWeight: 600, color: '#475569', fontSize: 12 }}>Activity Type</th>
                  <th style={{ padding: '12px 16px', fontWeight: 600, color: '#475569', fontSize: 12 }}>Description</th>
                  <th style={{ padding: '12px 16px', fontWeight: 600, color: '#475569', fontSize: 12 }}>IP Address</th>
                  <th style={{ padding: '12px 16px', fontWeight: 600, color: '#475569', fontSize: 12 }}>Status</th>
                  <th style={{ padding: '12px 16px', fontWeight: 600, color: '#475569', fontSize: 12, textAlign: 'center' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentLogs.length === 0 ? (
                  <tr>
                    <td colSpan={10} style={{ padding: '40px', textAlign: 'center', color: '#94a3b8' }}>
                      No activity logs found matching the filter criteria.
                    </td>
                  </tr>
                ) : currentLogs.map((log) => {
                  const typeStyle = getActivityTypeStyle(log.activityType);
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
                      <td style={{ padding: '14px 16px', fontWeight: 600, color: typeStyle.color }}>
                        {log.activityType}
                      </td>
                      <td style={{ padding: '14px 16px', color: '#334155', maxWidth: 280 }}>
                        {log.description}
                      </td>
                      <td style={{ padding: '14px 16px', color: '#475569', fontFamily: 'monospace', fontSize: 12 }}>
                        {log.ipAddress}
                      </td>
                      <td style={{ padding: '14px 16px' }}>
                        {getStatusBadge(log.status)}
                      </td>
                      <td style={{ padding: '14px 16px', textAlign: 'center' }}>
                        <button
                          title="View Details"
                          onClick={() => setViewLog(log)}
                          style={{
                            border: 'none', background: 'transparent', color: '#2563eb',
                            cursor: 'pointer', padding: 4, borderRadius: 4, display: 'inline-flex', alignItems: 'center'
                          }}
                        >
                          <Eye size={16} />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* ── FOOTER / INTERACTIVE PAGINATION ── */}
          <div style={{
            padding: '14px 20px', borderTop: '1px solid #e8edf2', background: '#fff',
            display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12
          }}>
            <span style={{ fontSize: 12, color: '#64748b' }}>
              Showing <strong>{filteredLogs.length === 0 ? 0 : (currentPage - 1) * perPage + 1} to {Math.min(currentPage * perPage, filteredLogs.length)}</strong> of <strong>{filteredLogs.length}</strong> entries
            </span>

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

              {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
                <button
                  key={p}
                  onClick={() => handlePageChange(p)}
                  style={{
                    border: currentPage === p ? 'none' : '1px solid #dde3ea',
                    background: currentPage === p ? '#2563eb' : '#fff',
                    color: currentPage === p ? '#fff' : '#334155',
                    padding: '5px 10px', borderRadius: 6, cursor: 'pointer',
                    fontSize: 12, fontWeight: currentPage === p ? 700 : 400, minWidth: 28
                  }}
                >
                  {p}
                </button>
              ))}

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

      {/* View Detail Modal */}
      <ActivityLogViewModal log={viewLog} onClose={() => setViewLog(null)} />
      <ExportReportModal isOpen={isExportOpen} onClose={() => setIsExportOpen(false)} entityName="User Activity Logs" data={filteredLogs} />
    </AdminShell>
  );
}