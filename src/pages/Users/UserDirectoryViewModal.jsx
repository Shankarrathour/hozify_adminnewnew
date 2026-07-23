import React, { useState, useMemo } from 'react';
import {
  X,
  ArrowLeft,
  Edit,
  Phone,
  Mail,
  User,
  Compass,
  Calendar,
  UserCheck,
  Star,
  MapPin,
  Home,
  CheckCircle2,
  ChevronDown,
  Download,
  ChevronLeft,
  ChevronRight,
  ChevronsUpDown
} from 'lucide-react';

function Badge({ value }) {
  let bg = '#e1f0ff', color = '#03C3EC';
  if (value === 'Active' || value === 'Active User' || value === 'Success') { bg = '#e6f4ea'; color = '#137333'; }
  else if (value === 'Suspended' || value === 'Inactive') { bg = '#fef7e0'; color = '#b06000'; }
  else if (value === 'Blocked' || value === 'Failed') { bg = '#fce8e6'; color = '#c5221f'; }
  else if (value === 'Logged In' || value === 'Online') { bg = '#e6f4ea'; color = '#137333'; }
  else if (value === 'Logged Out' || value === 'Offline') { bg = '#f1f5f9'; color = '#64748b'; }
  return (
    <span style={{ padding: '3px 10px', borderRadius: '6px', fontSize: '11px', fontWeight: 600, background: bg, color, whiteSpace: 'nowrap' }}>
      {value}
    </span>
  );
}

function DetailRow({ label, value }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 0', borderBottom: '1px solid #f1f5f9', fontSize: '12px' }}>
      <span style={{ color: '#64748b', fontWeight: 500 }}>{label}</span>
      <span style={{ color: '#0f172a', fontWeight: 600, textAlign: 'right' }}>{value ?? '—'}</span>
    </div>
  );
}

function getTypeColor(type) {
  const blue = '#2563eb';
  const green = '#16a34a';
  const red = '#dc2626';

  if (type === 'Login' || type === 'Logout' || type === 'View') return blue;
  if (type === 'Create' || type === 'Update Status' || type === 'Update' || type === 'Transaction' || type === 'Upload') return green;
  if (type === 'Cancel' || type === 'Delete') return red;
  return blue;
}

const singleUserLogsData = [
  { sNo: 1, dateTime: '22 Jul 2026 10:45 AM', moduleName: 'Login', activityType: 'Login', description: 'User logged in successfully', ipAddress: '192.168.1.45', status: 'Success', performedOn: 'Web' },
  { sNo: 2, dateTime: '22 Jul 2026 10:30 AM', moduleName: 'Bookings', activityType: 'Create', description: 'New booking created for Booking ID: BK000123', ipAddress: '192.168.1.45', status: 'Success', performedOn: 'Android App' },
  { sNo: 3, dateTime: '22 Jul 2026 10:28 AM', moduleName: 'Material Request', activityType: 'Create', description: 'Material request raised for Booking ID: BK000123', ipAddress: '192.168.1.45', status: 'Success', performedOn: 'Android App' },
  { sNo: 4, dateTime: '22 Jul 2026 10:20 AM', moduleName: 'Quotations', activityType: 'View', description: 'Viewed quotations for Booking ID: BK000123', ipAddress: '192.168.1.45', status: 'Success', performedOn: 'Android App' },
  { sNo: 5, dateTime: '22 Jul 2026 10:15 AM', moduleName: 'Bookings', activityType: 'Update Status', description: 'Booking status changed to In Progress for Booking ID: BK000123', ipAddress: '192.168.1.45', status: 'Success', performedOn: 'Android App' },
  { sNo: 6, dateTime: '22 Jul 2026 10:02 AM', moduleName: 'Profile', activityType: 'Update', description: 'Profile information updated', ipAddress: '192.168.1.45', status: 'Success', performedOn: 'Android App' },
  { sNo: 7, dateTime: '22 Jul 2026 09:50 AM', moduleName: 'Wallet', activityType: 'Transaction', description: 'Wallet amount added of ₹2,500 via UPI', ipAddress: '192.168.1.45', status: 'Success', performedOn: 'Android App' },
  { sNo: 8, dateTime: '22 Jul 2026 09:25 AM', moduleName: 'Bookings', activityType: 'Cancel', description: 'Booking cancelled for Booking ID: BK000112', ipAddress: '192.168.1.45', status: 'Failed', performedOn: 'Android App' },
  { sNo: 9, dateTime: '22 Jul 2026 09:10 AM', moduleName: 'Documents', activityType: 'Upload', description: 'Document uploaded: GST Certificate', ipAddress: '192.168.1.45', status: 'Success', performedOn: 'Android App' },
  { sNo: 10, dateTime: '22 Jul 2026 08:55 AM', moduleName: 'Logout', activityType: 'Logout', description: 'User logged out', ipAddress: '192.168.1.45', status: 'Success', performedOn: 'Android App' },
];

export default function UserDirectoryViewModal({ user, onClose, onEdit }) {
  const [activeTab, setActiveTab] = useState('Overview');

  // Single User Activity Logs filter states
  const [logDateRange, setLogDateRange]     = useState('22 Jun 2026 - 22 Jul 2026');
  const [logModuleFilter, setLogModuleFilter] = useState('All Modules');
  const [logTypeFilter, setLogTypeFilter]   = useState('All');
  const [logStatusFilter, setLogStatusFilter] = useState('All');

  if (!user) return null;

  const tabs = [
    { name: 'Overview' },
    { name: 'Activity Logs' },
    { name: 'Login Attempts' },
    { name: 'Addresses', count: user.favoriteAddressCount || 2 },
    { name: 'Emergency Contacts', count: user.emergencyContactsCount || 3 },
    { name: 'Documents', count: 2 },
    { name: 'Devices', count: 3 },
    { name: 'Notifications' },
  ];

  const filteredSingleUserLogs = singleUserLogsData.filter(log => {
    const matchMod = logModuleFilter === 'All Modules' || log.moduleName === logModuleFilter;
    const matchType = logTypeFilter === 'All' || log.activityType === logTypeFilter;
    const matchStatus = logStatusFilter === 'All' || log.status === logStatusFilter;
    return matchMod && matchType && matchStatus;
  });

  return (
    <div
      style={{
        position: 'fixed', inset: 0, background: 'rgba(15, 23, 42, 0.65)', backdropFilter: 'blur(4px)',
        zIndex: 2000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px',
        animation: 'fadeIn 0.2s ease', fontFamily: "'Inter', -apple-system, sans-serif"
      }}
      onClick={onClose}
    >
      <style>{`
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes slideUp { from { opacity: 0; transform: translateY(20px) scale(0.98); } to { opacity: 1; transform: translateY(0) scale(1); } }
        .ud-modal-scroll::-webkit-scrollbar { width: 5px; height: 5px; }
        .ud-modal-scroll::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 10px; }
      `}</style>
      <div
        className="ud-modal-scroll"
        onClick={e => e.stopPropagation()}
        style={{
          background: '#f8fafc', borderRadius: '16px', boxShadow: '0 25px 50px rgba(15,23,42,0.22)',
          width: '96%', maxWidth: '1240px', maxHeight: '92vh', overflow: 'hidden',
          display: 'flex', flexDirection: 'column', animation: 'slideUp 0.25s cubic-bezier(0.4,0,0.2,1)'
        }}
      >
        {/* ── TOP HEADER ── */}
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '16px 24px', background: '#fff', borderBottom: '1px solid #e2e8f0', flexShrink: 0
        }}>
          <div>
            <h1 style={{ margin: 0, fontSize: '18px', fontWeight: 700, color: '#0f172a' }}>User Details</h1>
            <div style={{ fontSize: '12px', color: '#64748b', marginTop: '2px' }}>
              Dashboard &gt; Users &gt; All Users &gt; <span style={{ color: '#2563eb', fontWeight: 600 }}>User Details</span>
            </div>
          </div>
          <button
            onClick={onClose}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '6px',
              padding: '7px 14px', border: '1px solid #dde3ea', borderRadius: '8px',
              background: '#fff', color: '#334155', fontSize: '12px', fontWeight: 600,
              cursor: 'pointer', transition: 'all 0.15s'
            }}
            onMouseEnter={e => e.currentTarget.style.background = '#f1f5f9'}
            onMouseLeave={e => e.currentTarget.style.background = '#fff'}
          >
            <ArrowLeft size={14} /> Back to All Users
          </button>
        </div>

        {/* ── MAIN BODY CONTENT (2-COLUMN GRID) ── */}
        <div className="ud-modal-scroll" style={{
          flex: 1, overflowY: 'auto', padding: '24px',
          display: 'grid', gridTemplateColumns: '290px 1fr', gap: '20px'
        }}>

          {/* ── LEFT SIDEBAR PROFILE CARD ── */}
          <div style={{
            background: '#fff', borderRadius: '12px', border: '1px solid #e2e8f0',
            padding: '24px 20px', display: 'flex', flexDirection: 'column', alignItems: 'center'
          }}>
            <img
              src={user.avatar}
              alt={user.name}
              style={{ width: '96px', height: '96px', borderRadius: '50%', objectFit: 'cover', border: '3px solid #e0e7ff', marginBottom: '12px' }}
              onError={e => { e.target.src = 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&h=200&q=80'; }}
            />
            <h2 style={{ margin: '0 0 2px 0', fontSize: '18px', fontWeight: 700, color: '#0f172a', textAlign: 'center' }}>
              {user.name}
            </h2>
            <div style={{ fontSize: '12px', color: '#64748b', fontWeight: 500, marginBottom: '8px' }}>
              {user.id}
            </div>

            <div style={{ marginBottom: '14px' }}>
              <Badge value={user.status === 'Active' ? 'Active User' : `${user.status} User`} />
            </div>

            <button
              onClick={() => { if (onEdit) onEdit(user); }}
              style={{
                width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px',
                padding: '8px', border: '1px solid #dde3ea', borderRadius: '8px',
                background: '#fff', color: '#2563eb', fontSize: '13px', fontWeight: 600,
                cursor: 'pointer', transition: 'all 0.15s', marginBottom: '18px'
              }}
              onMouseEnter={e => e.currentTarget.style.background = '#eff6ff'}
              onMouseLeave={e => e.currentTarget.style.background = '#fff'}
            >
              <Edit size={14} /> Edit
            </button>

            <div style={{ width: '100%', borderTop: '1px solid #f1f5f9', paddingTop: '12px', display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Phone size={14} color="#64748b" style={{ flexShrink: 0 }} />
                <span style={{ color: '#64748b', flex: 1 }}>Phone</span>
                <span style={{ color: '#0f172a', fontWeight: 600 }}>{user.mobile}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Mail size={14} color="#64748b" style={{ flexShrink: 0 }} />
                <span style={{ color: '#64748b', flex: 1 }}>Email</span>
                <span style={{ color: '#0f172a', fontWeight: 600, fontSize: '11px', textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap', maxWidth: '140px' }}>{user.email}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <User size={14} color="#64748b" style={{ flexShrink: 0 }} />
                <span style={{ color: '#64748b', flex: 1 }}>User Type</span>
                <span style={{ color: '#0f172a', fontWeight: 600 }}>Customer</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Compass size={14} color="#64748b" style={{ flexShrink: 0 }} />
                <span style={{ color: '#64748b', flex: 1 }}>Gender</span>
                <span style={{ color: '#0f172a', fontWeight: 600 }}>{user.gender || 'Male'}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Calendar size={14} color="#64748b" style={{ flexShrink: 0 }} />
                <span style={{ color: '#64748b', flex: 1 }}>Date of Birth</span>
                <span style={{ color: '#0f172a', fontWeight: 600 }}>{user.dateOfBirth || '15-Jan-1992 (34 Yrs)'}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <UserCheck size={14} color="#64748b" style={{ flexShrink: 0 }} />
                <span style={{ color: '#64748b', flex: 1 }}>Member Since</span>
                <span style={{ color: '#0f172a', fontWeight: 600 }}>{user.memberSince || user.registrationDate}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <User size={14} color="#64748b" style={{ flexShrink: 0 }} />
                <span style={{ color: '#64748b', flex: 1 }}>Registered By</span>
                <span style={{ color: '#0f172a', fontWeight: 600 }}>Self Registration</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Star size={14} color="#64748b" style={{ flexShrink: 0 }} />
                <span style={{ color: '#64748b', flex: 1 }}>Is Influencer</span>
                <span style={{ padding: '2px 8px', borderRadius: '4px', fontSize: '11px', fontWeight: 700, background: user.isInfluencer ? '#e6f4ea' : '#fce8e6', color: user.isInfluencer ? '#137333' : '#c5221f' }}>
                  {user.isInfluencer ? 'Yes' : 'No'}
                </span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <MapPin size={14} color="#64748b" style={{ flexShrink: 0 }} />
                <span style={{ color: '#64748b', flex: 1 }}>Location Type</span>
                <span style={{ color: '#0f172a', fontWeight: 600 }}>{user.locationType || 'Urban'}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', marginTop: '4px' }}>
                <Home size={14} color="#64748b" style={{ flexShrink: 0, marginTop: '2px' }} />
                <span style={{ color: '#64748b', flexShrink: 0 }}>Address</span>
                <span style={{ color: '#0f172a', fontWeight: 600, textAlign: 'right', fontSize: '11px', lineHeight: 1.4 }}>
                  {user.addresses?.[0] || 'H.No 12-3-45, Road No 5, Banjara Hills, Hyderabad, Telangana - 500034'}
                </span>
              </div>
            </div>
          </div>

          {/* ── RIGHT MAIN PANEL (TABS + CONTENT CARDS) ── */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>

            {/* Horizontal Tabs Header */}
            <div style={{
              display: 'flex', gap: '8px', borderBottom: '1px solid #e2e8f0', paddingBottom: '2px', overflowX: 'auto'
            }}>
              {tabs.map(tab => {
                const isActive = activeTab === tab.name;
                return (
                  <button
                    key={tab.name}
                    onClick={() => setActiveTab(tab.name)}
                    style={{
                      padding: '8px 14px', border: 'none', borderBottom: isActive ? '2px solid #2563eb' : '2px solid transparent',
                      background: 'transparent', color: isActive ? '#2563eb' : '#64748b', fontWeight: isActive ? 700 : 500,
                      fontSize: '13px', cursor: 'pointer', whiteSpace: 'nowrap', display: 'inline-flex', alignItems: 'center', gap: '6px'
                    }}
                  >
                    {tab.name}
                    {tab.count !== undefined && (
                      <span style={{
                        background: isActive ? '#2563eb' : '#e2e8f0', color: isActive ? '#fff' : '#475569',
                        borderRadius: '50%', padding: '1px 6px', fontSize: '10px', fontWeight: 700
                      }}>
                        {tab.count}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            {/* ── OVERVIEW TAB CONTENT ── */}
            {activeTab === 'Overview' && (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>

                {/* Card 1: Account Information */}
                <div style={{ background: '#fff', borderRadius: '12px', border: '1px solid #e2e8f0', padding: '18px' }}>
                  <h3 style={{ margin: '0 0 12px 0', fontSize: '14px', fontWeight: 700, color: '#0f172a', paddingBottom: '8px', borderBottom: '1px solid #f1f5f9' }}>
                    Account Information
                  </h3>
                  <DetailRow label="Account Status" value={<Badge value={user.accountStatus || 'Active'} />} />
                  <DetailRow label="Login Status" value={<Badge value={user.loginStatus || 'Logged In'} />} />
                  <DetailRow label="Last Login" value="30-May-2026 10:30 AM" />
                  <DetailRow label="Member Since" value={user.memberSince || '28-May-2026'} />
                  <DetailRow label="Email Verified" value={<span style={{ color: '#137333', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '3px' }}><CheckCircle2 size={13} color="#137333" /> Verified</span>} />
                  <DetailRow label="Phone Verified" value={<span style={{ color: '#137333', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '3px' }}><CheckCircle2 size={13} color="#137333" /> Verified</span>} />
                </div>

                {/* Card 2: Preferences */}
                <div style={{ background: '#fff', borderRadius: '12px', border: '1px solid #e2e8f0', padding: '18px' }}>
                  <h3 style={{ margin: '0 0 12px 0', fontSize: '14px', fontWeight: 700, color: '#0f172a', paddingBottom: '8px', borderBottom: '1px solid #f1f5f9' }}>
                    Preferences
                  </h3>
                  <DetailRow label="Prefer Language" value={user.preferredLanguage || 'English'} />
                  <DetailRow label="Notification Language" value={user.notificationLanguage || 'English'} />
                  <DetailRow label="Is WhatsApp" value={<span style={{ color: '#137333', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '3px' }}><CheckCircle2 size={13} color="#137333" /> Yes</span>} />
                  <DetailRow label="Favorite Address Count" value={user.favoriteAddressCount || 2} />
                  <DetailRow label="Emergency Contacts Count" value={user.emergencyContactsCount || 3} />
                  <DetailRow label="Avg Rating" value={
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '3px', fontWeight: 700, color: '#0f172a' }}>
                      <span style={{ color: '#eab308' }}>★★★★★</span> {user.averageRating || 4.5}
                    </span>
                  } />
                </div>

                {/* Card 3: Location Information */}
                <div style={{ background: '#fff', borderRadius: '12px', border: '1px solid #e2e8f0', padding: '18px' }}>
                  <h3 style={{ margin: '0 0 12px 0', fontSize: '14px', fontWeight: 700, color: '#0f172a', paddingBottom: '8px', borderBottom: '1px solid #f1f5f9' }}>
                    Location Information
                  </h3>
                  <DetailRow label="Location Type" value={user.locationType || 'Urban'} />
                  <DetailRow label="City" value={user.city || 'Hyderabad'} />
                  <DetailRow label="District" value={user.district || 'Ranga Reddy'} />
                  <DetailRow label="State" value={user.state || 'Telangana'} />
                  <DetailRow label="Country" value="India" />
                  <DetailRow label="Pincode" value="500034" />
                </div>

              </div>
            )}

            {/* ── SINGLE USER ACTIVITY LOGS TAB CONTENT (MATCHING ATTACHED SCREENSHOT) ── */}
            {activeTab === 'Activity Logs' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>

                {/* ── FILTER PANEL ── */}
                <div style={{
                  background: '#fff', borderRadius: '12px', border: '1px solid #e2e8f0',
                  padding: '16px 20px', display: 'flex', flexDirection: 'column', gap: '12px'
                }}>
                  {/* Row 1: Date Range */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', maxWidth: '240px' }}>
                    <label style={{ fontSize: '11px', fontWeight: 600, color: '#475569' }}>Date Range</label>
                    <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                      <Calendar size={13} style={{ position: 'absolute', left: 10, color: '#64748b', pointerEvents: 'none' }} />
                      <input
                        type="text"
                        value={logDateRange}
                        onChange={e => setLogDateRange(e.target.value)}
                        style={{
                          width: '100%', padding: '6px 10px 6px 30px', border: '1px solid #dde3ea',
                          borderRadius: 6, fontSize: 12, fontWeight: 500, color: '#334155', outline: 'none', background: '#fff'
                        }}
                      />
                    </div>
                  </div>

                  {/* Row 2: Module, Type, Status, Reset, Search */}
                  <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1.2fr 1.2fr auto', gap: '12px', alignItems: 'flex-end' }}>
                    {/* Module */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                      <label style={{ fontSize: 11, fontWeight: 600, color: '#475569' }}>Activity Module</label>
                      <div style={{ position: 'relative' }}>
                        <select value={logModuleFilter} onChange={e => setLogModuleFilter(e.target.value)} style={{
                          width: '100%', appearance: 'none', background: '#fff', border: '1px solid #dde3ea',
                          borderRadius: 6, padding: '6px 26px 6px 10px', fontSize: 12,
                          fontWeight: 500, color: '#334155', cursor: 'pointer', outline: 'none'
                        }}>
                          {['All Modules', 'Login', 'Bookings', 'Material Request', 'Quotations', 'Profile', 'Wallet', 'Documents', 'Logout'].map(o => <option key={o}>{o}</option>)}
                        </select>
                        <ChevronDown size={12} style={{ position: 'absolute', right: 8, top: '50%', transform: 'translateY(-50%)', color: '#64748b', pointerEvents: 'none' }} />
                      </div>
                    </div>

                    {/* Type */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                      <label style={{ fontSize: 11, fontWeight: 600, color: '#475569' }}>Activity Type</label>
                      <div style={{ position: 'relative' }}>
                        <select value={logTypeFilter} onChange={e => setLogTypeFilter(e.target.value)} style={{
                          width: '100%', appearance: 'none', background: '#fff', border: '1px solid #dde3ea',
                          borderRadius: 6, padding: '6px 26px 6px 10px', fontSize: 12,
                          fontWeight: 500, color: '#334155', cursor: 'pointer', outline: 'none'
                        }}>
                          {['All', 'Login', 'Create', 'View', 'Update Status', 'Update', 'Transaction', 'Cancel', 'Upload', 'Logout'].map(o => <option key={o}>{o}</option>)}
                        </select>
                        <ChevronDown size={12} style={{ position: 'absolute', right: 8, top: '50%', transform: 'translateY(-50%)', color: '#64748b', pointerEvents: 'none' }} />
                      </div>
                    </div>

                    {/* Status */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                      <label style={{ fontSize: 11, fontWeight: 600, color: '#475569' }}>Status</label>
                      <div style={{ position: 'relative' }}>
                        <select value={logStatusFilter} onChange={e => setLogStatusFilter(e.target.value)} style={{
                          width: '100%', appearance: 'none', background: '#fff', border: '1px solid #dde3ea',
                          borderRadius: 6, padding: '6px 26px 6px 10px', fontSize: 12,
                          fontWeight: 500, color: '#334155', cursor: 'pointer', outline: 'none'
                        }}>
                          {['All', 'Success', 'Failed'].map(o => <option key={o}>{o}</option>)}
                        </select>
                        <ChevronDown size={12} style={{ position: 'absolute', right: 8, top: '50%', transform: 'translateY(-50%)', color: '#64748b', pointerEvents: 'none' }} />
                      </div>
                    </div>

                    {/* Buttons */}
                    <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
                      <button
                        onClick={() => { setLogModuleFilter('All Modules'); setLogTypeFilter('All'); setLogStatusFilter('All'); }}
                        style={{ padding: '6px 16px', borderRadius: 6, border: '1px solid #dde3ea', background: '#fff', color: '#334155', fontSize: 12, fontWeight: 600, cursor: 'pointer' }}
                      >
                        Reset
                      </button>
                      <button
                        style={{ padding: '6px 20px', borderRadius: 6, border: 'none', background: '#2563eb', color: '#fff', fontSize: 12, fontWeight: 600, cursor: 'pointer' }}
                      >
                        Search
                      </button>
                    </div>
                  </div>
                </div>

                {/* ── TABLE CARD ── */}
                <div style={{ background: '#fff', borderRadius: '12px', border: '1px solid #e2e8f0', overflow: 'hidden' }}>
                  <div style={{ overflowX: 'auto' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '12px' }}>
                      <thead>
                        <tr style={{ background: '#f8fafc', borderBottom: '1px solid #e2e8f0' }}>
                          <th style={{ padding: '10px 14px', fontWeight: 600, color: '#475569' }}>S.No</th>
                          <th style={{ padding: '10px 14px', fontWeight: 600, color: '#475569', whiteSpace: 'nowrap' }}>
                            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 3 }}>
                              Date & Time <ChevronsUpDown size={11} color="#94a3b8" />
                            </span>
                          </th>
                          <th style={{ padding: '10px 14px', fontWeight: 600, color: '#475569' }}>Activity Module</th>
                          <th style={{ padding: '10px 14px', fontWeight: 600, color: '#475569' }}>Activity Type</th>
                          <th style={{ padding: '10px 14px', fontWeight: 600, color: '#475569' }}>Description</th>
                          <th style={{ padding: '10px 14px', fontWeight: 600, color: '#475569' }}>IP Address</th>
                          <th style={{ padding: '10px 14px', fontWeight: 600, color: '#475569' }}>Status</th>
                          <th style={{ padding: '10px 14px', fontWeight: 600, color: '#475569' }}>Performed On</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredSingleUserLogs.length === 0 ? (
                          <tr>
                            <td colSpan={8} style={{ padding: '30px', textAlign: 'center', color: '#94a3b8' }}>
                              No activity logs found for this user.
                            </td>
                          </tr>
                        ) : filteredSingleUserLogs.map((log) => (
                          <tr key={log.sNo} style={{ borderBottom: '1px solid #f1f5f9' }}>
                            <td style={{ padding: '12px 14px', color: '#64748b' }}>{log.sNo}</td>
                            <td style={{ padding: '12px 14px', color: '#334155', whiteSpace: 'nowrap' }}>{log.dateTime}</td>
                            <td style={{ padding: '12px 14px', color: '#334155', fontWeight: 500 }}>{log.moduleName}</td>
                            <td style={{ padding: '12px 14px', fontWeight: 600, color: getTypeColor(log.activityType) }}>
                              {log.activityType}
                            </td>
                            <td style={{ padding: '12px 14px', color: '#334155', maxWidth: 300 }}>
                              {log.description}
                            </td>
                            <td style={{ padding: '12px 14px', color: '#475569', fontFamily: 'monospace' }}>
                              {log.ipAddress}
                            </td>
                            <td style={{ padding: '12px 14px' }}>
                              <Badge value={log.status} />
                            </td>
                            <td style={{ padding: '12px 14px', color: '#475569' }}>
                              {log.performedOn}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {/* Footer / Pagination */}
                  <div style={{ padding: '12px 16px', borderTop: '1px solid #e8edf2', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: 12, color: '#64748b' }}>Showing 1 to 10 of 152 entries</span>
                    <div style={{ display: 'flex', gap: 4, alignItems: 'center' }}>
                      <button style={{ border: '1px solid #dde3ea', background: '#fff', padding: '4px 8px', borderRadius: 6, cursor: 'pointer', color: '#64748b', display: 'flex', alignItems: 'center' }}>
                        <ChevronLeft size={13} />
                      </button>
                      <button style={{ border: 'none', background: '#2563eb', color: '#fff', padding: '4px 9px', borderRadius: 6, cursor: 'pointer', fontSize: 12, fontWeight: 700, minWidth: 26 }}>
                        1
                      </button>
                      <button style={{ border: '1px solid #dde3ea', background: '#fff', color: '#334155', padding: '4px 9px', borderRadius: 6, cursor: 'pointer', fontSize: 12, minWidth: 26 }}>
                        2
                      </button>
                      <button style={{ border: '1px solid #dde3ea', background: '#fff', color: '#334155', padding: '4px 9px', borderRadius: 6, cursor: 'pointer', fontSize: 12, minWidth: 26 }}>
                        3
                      </button>
                      <span style={{ padding: '0 4px', color: '#94a3b8', fontSize: 12 }}>...</span>
                      <button style={{ border: '1px solid #dde3ea', background: '#fff', color: '#334155', padding: '4px 9px', borderRadius: 6, cursor: 'pointer', fontSize: 12, minWidth: 32 }}>
                        16
                      </button>
                      <button style={{ border: '1px solid #dde3ea', background: '#fff', padding: '4px 8px', borderRadius: 6, cursor: 'pointer', color: '#64748b', display: 'flex', alignItems: 'center' }}>
                        <ChevronRight size={13} />
                      </button>
                    </div>
                    <button style={{ padding: '6px 14px', borderRadius: 6, border: '1px solid #2563eb', background: '#fff', color: '#2563eb', fontSize: 12, fontWeight: 600, cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                      <Download size={13} /> Export Report
                    </button>
                  </div>
                </div>

              </div>
            )}

            {/* ── OTHER TABS (Login Attempts, Addresses, Emergency Contacts, Documents, Devices, Notifications) ── */}
            {activeTab === 'Login Attempts' && (
              <div style={{ background: '#fff', borderRadius: '12px', border: '1px solid #e2e8f0', padding: '20px' }}>
                <h3 style={{ margin: '0 0 14px 0', fontSize: '14px', fontWeight: 700, color: '#0f172a' }}>Login Attempts</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  <div style={{ padding: '12px', border: '1px solid #f1f5f9', borderRadius: '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <div style={{ fontSize: '13px', fontWeight: 600, color: '#0f172a' }}>Android Mobile · IP 103.21.58.142</div>
                      <div style={{ fontSize: '11px', color: '#64748b' }}>Mumbai, Maharashtra · Active Device</div>
                    </div>
                    <Badge value="Success" />
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'Addresses' && (
              <div style={{ background: '#fff', borderRadius: '12px', border: '1px solid #e2e8f0', padding: '20px' }}>
                <h3 style={{ margin: '0 0 14px 0', fontSize: '14px', fontWeight: 700, color: '#0f172a' }}>Saved Addresses</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {(user.addresses && user.addresses.length > 0
                    ? user.addresses
                    : ['A-1204, Skyview Heights, Andheri West, Mumbai', '14 Palm Avenue, Koramangala, Bengaluru']
                  ).map((addr, i) => {
                    const addressText = typeof addr === 'string' ? addr : (addr.address || addr);
                    const isPrimary = i === 0 || addr.isPrimary;
                    return (
                      <div key={i} style={{ padding: '12px 16px', border: '1px solid #f1f5f9', borderRadius: '8px', fontSize: '13px', color: '#334155', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span>📍 <strong>Address {i + 1}:</strong> {addressText}</span>
                        {isPrimary && <Badge value="Primary" />}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {activeTab === 'Emergency Contacts' && (
              <div style={{ background: '#fff', borderRadius: '12px', border: '1px solid #e2e8f0', padding: '20px' }}>
                <h3 style={{ margin: '0 0 14px 0', fontSize: '14px', fontWeight: 700, color: '#0f172a' }}>Emergency Contacts</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  <div style={{ padding: '12px', border: '1px solid #f1f5f9', borderRadius: '8px', fontSize: '13px', display: 'flex', justifyContent: 'space-between' }}>
                    <span>📞 <strong>Contact 1:</strong> +91 98765 00001 (Father)</span>
                    <Badge value="Primary" />
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'Documents' && (
              <div style={{ background: '#fff', borderRadius: '12px', border: '1px solid #e2e8f0', padding: '20px' }}>
                <h3 style={{ margin: '0 0 14px 0', fontSize: '14px', fontWeight: 700, color: '#0f172a' }}>Uploaded Documents</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {(user.documents || [{ name: 'Aadhaar Card', type: 'Identity', verificationStatus: 'Verified' }]).map((doc, i) => (
                    <div key={i} style={{ padding: '12px', border: '1px solid #f1f5f9', borderRadius: '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontSize: '13px', color: '#0f172a', fontWeight: 600 }}>📄 {doc.name}</span>
                      <Badge value={doc.verificationStatus} />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'Devices' && (
              <div style={{ background: '#fff', borderRadius: '12px', border: '1px solid #e2e8f0', padding: '20px' }}>
                <h3 style={{ margin: '0 0 14px 0', fontSize: '14px', fontWeight: 700, color: '#0f172a' }}>Registered Devices</h3>
                <div style={{ padding: '12px', border: '1px solid #f1f5f9', borderRadius: '8px', fontSize: '13px', display: 'flex', justifyContent: 'space-between' }}>
                  <span>📱 Samsung Galaxy S23 (Android 14)</span>
                  <Badge value="Active" />
                </div>
              </div>
            )}

            {activeTab === 'Notifications' && (
              <div style={{ background: '#fff', borderRadius: '12px', border: '1px solid #e2e8f0', padding: '20px' }}>
                <h3 style={{ margin: '0 0 14px 0', fontSize: '14px', fontWeight: 700, color: '#0f172a' }}>Notification History</h3>
                <div style={{ padding: '12px', border: '1px solid #f1f5f9', borderRadius: '8px', fontSize: '13px', color: '#64748b' }}>
                  🔔 Service booking confirmation push notification sent on 22 Jul 2026.
                </div>
              </div>
            )}

          </div>

        </div>

      </div>
    </div>
  );
}
