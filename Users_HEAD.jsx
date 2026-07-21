import React, { useEffect, useMemo, useState } from 'react';
import {
  Ban,
  CheckCircle2,
  Edit3,
  Eye,
  RotateCcw,
  ShieldAlert,
  UserCheck,
  Users as UsersIcon,
  UserX,
  Star,
  MoreVertical,
  X,
  Search,
  Filter
} from 'lucide-react';
import AdminShell from '../../components/layouts/AdminShell';
import { ROUTES } from '../../config/routes';
import { useApp } from '../../hooks/useApp';
import { usersMockData } from './usersMockData';
import { useToast } from '../../components/common/ToastNotification';

import UserEditModal from './UserEditModal';
import UserSubTabs from "../../components/users/UserSubTabs";
import Select from "../../components/ui/Select";
import GlobalDashboardFilters from '../../components/common/GlobalDashboardFilters';

const statusOptions = ['All', 'Active', 'Suspended', 'Blocked', 'Deleted'];

function normalize(value) {
  return value.trim().toLowerCase();
}

function getRating(userId) {
  const num = parseInt(userId.replace(/\D/g, ''), 10) || 0;
  return ((num % 20) / 10 + 3.8).toFixed(1); 
}

function EmptyState() {
  return (
    <tr>
      <td colSpan="8" style={{ padding: 'var(--spacing-page)', textAlign: 'center', color: 'var(--materio-text-muted)' }}>
        No customers found matching the selected filters.
      </td>
    </tr>
  );
}

export default function Users() {
  const { route, navigate } = useApp();
  const { addToast } = useToast();
  const [users, setUsers] = useState(usersMockData);
  const [filters, setFilters] = useState({
    search: '',
    status: 'All'
  });
  
  const [drawerUser, setDrawerUser] = useState(null);
  const [editingUser, setEditingUser] = useState(null);
  const [feedback, setFeedback] = useState('');

  useEffect(() => {
    setFilters((current) => ({
      ...current,
      status: route === ROUTES.blockedUsers ? 'Blocked' : 'All'
    }));
  }, [route]);

  const summary = useMemo(() => ({
    total: users.length,
    active: users.filter((user) => user.status === 'Active').length,
    suspended: users.filter((user) => user.status === 'Suspended').length,
    blocked: users.filter((user) => user.status === 'Blocked').length
  }), [users]);

  const filteredUsers = useMemo(() => {
    const query = normalize(filters.search);

    return users.filter((user) => {
      const matchesSearch = !query || 
        normalize(user.name).includes(query) || 
        normalize(user.email).includes(query) || 
        normalize(user.mobile).includes(query);
      const matchesStatus = filters.status === 'All' || user.status === filters.status;

      return matchesSearch && matchesStatus;
    });
  }, [filters, users]);

  const showFeedback = (message) => {
    addToast(message, 'success');
  };

  const updateFilter = (key, value) => {
    setFilters((current) => ({ ...current, [key]: value }));
  };

  const updateUserStatus = (user, status) => {
    if (user.status === status) {
      showFeedback(`${user.name} is already ${status.toLowerCase()}.`);
      return;
    }
    const confirmed = window.confirm(`Change ${user.name}'s status to ${status}?`);
    if (!confirmed) return;

    setUsers((current) =>
      current.map((item) => (item.id === user.id ? { ...item, status } : item))
    );
    showFeedback(`${user.name} status updated to ${status}.`);
    
    // Update drawer if open
    if (drawerUser && drawerUser.id === user.id) {
      setDrawerUser({ ...drawerUser, status });
    }
  };

  const saveEditedUser = (updatedUser) => {
    setUsers((current) =>
      current.map((user) => (user.id === updatedUser.id ? updatedUser : user))
    );
    setEditingUser(null);
    showFeedback(`${updatedUser.name} updated successfully.`);
    if (drawerUser && drawerUser.id === updatedUser.id) {
      setDrawerUser(updatedUser);
    }
  };

  return (
    <AdminShell
      activeTab="User Management"
      searchPlaceholder="Search customer directory..."
    >
      <div style={{ paddingBottom: '40px' }}>
        
        {/* Header & Breadcrumb */}
        <div style={{ marginBottom: '24px' }}>
          <h1 style={{ fontSize: '24px', fontWeight: 600, color: 'var(--materio-text-main)', margin: '0 0 8px 0' }}>
            Customer Directory
          </h1>
          <div style={{ fontSize: '13px', color: 'var(--materio-text-muted)' }}>
            User & Partner Admin / User Management / <span style={{ color: 'var(--materio-primary)' }}>User Listing</span>
          </div>
        </div>

        {/* PROFILE SUB-TABS */}
        <UserSubTabs />

        <GlobalDashboardFilters />

        {/* KPI Cards */}
        <div className="materio-kpi-grid">
          <div className="materio-card" style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{ background: 'rgba(105, 108, 255, 0.1)', padding: '12px', borderRadius: '8px', color: 'var(--materio-primary)' }}>
              <UsersIcon size={24} />
            </div>
            <div>
              <div style={{ fontSize: '22px', fontWeight: 700 }}>{summary.total}</div>
              <div style={{ fontSize: '13px', color: 'var(--materio-text-muted)' }}>Total Customers</div>
            </div>
          </div>
          <div className="materio-card" style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{ background: 'rgba(113, 221, 55, 0.1)', padding: '12px', borderRadius: '8px', color: '#71DD37' }}>
              <UserCheck size={24} />
            </div>
            <div>
              <div style={{ fontSize: '22px', fontWeight: 700 }}>{summary.active}</div>
              <div style={{ fontSize: '13px', color: 'var(--materio-text-muted)' }}>Active Accounts</div>
            </div>
          </div>
          <div className="materio-card" style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{ background: 'rgba(255, 171, 0, 0.1)', padding: '12px', borderRadius: '8px', color: '#FFAB00' }}>
              <ShieldAlert size={24} />
            </div>
            <div>
              <div style={{ fontSize: '22px', fontWeight: 700 }}>{summary.suspended}</div>
              <div style={{ fontSize: '13px', color: 'var(--materio-text-muted)' }}>Suspended</div>
            </div>
          </div>
          <div className="materio-card" style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{ background: 'rgba(255, 62, 29, 0.1)', padding: '12px', borderRadius: '8px', color: '#FF3E1D' }}>
              <UserX size={24} />
            </div>
            <div>
              <div style={{ fontSize: '22px', fontWeight: 700 }}>{summary.blocked}</div>
              <div style={{ fontSize: '13px', color: 'var(--materio-text-muted)' }}>Blocked</div>
            </div>
          </div>
        </div>

        {feedback && (
          <div style={{ padding: '12px 16px', background: '#E8FADF', color: '#71DD37', borderRadius: '8px', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <CheckCircle2 size={18} />
            <span style={{ fontWeight: 500, fontSize: '14px' }}>{feedback}</span>
          </div>
        )}

        {/* Directory Table Wrapper */}
        <div className="materio-table-wrapper">
          <div className="materio-table-header">
            <h2 style={{ margin: 0, fontSize: '18px', fontWeight: 600 }}>Customers Directory</h2>
            <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
              <div style={{ position: 'relative' }}>
                <Search size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--materio-text-muted)' }} />
                <input 
                  type="text" 
                  placeholder="Search customer directory..." 
                  value={filters.search}
                  onChange={(e) => updateFilter('search', e.target.value)}
                  style={{ 
                    padding: '8px 12px 8px 36px', 
                    border: '1px solid var(--materio-border)', 
                    borderRadius: '6px',
                    fontSize: '14px',
                    outline: 'none',
                    width: '260px'
                  }}
                />
              </div>
              <Select 
                value={filters.status} 
                onChange={(e) => updateFilter('status', e.target.value)}
                options={statusOptions.map(opt => ({
                  value: opt,
                  label: opt
                }))}
                style={{ 
                  padding: '8px 12px', 
                  border: '1px solid var(--materio-border)', 
                  borderRadius: '6px',
                  fontSize: '14px',
                  outline: 'none',
                  background: 'var(--materio-surface)'
                }}
              />
            </div>
          </div>

          <div style={{ overflowX: 'auto' }}>
            <div className="table-responsive-wrapper">
<table className="materio-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>CUSTOMER DETAILS</th>
                  <th>PHONE / EMAIL</th>
                  <th>WALLET BAL.</th>
                  <th>RATING</th>
                  <th>BOOKINGS</th>
                  <th>STATUS</th>
                  <th>ACTIONS</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.length === 0 ? <EmptyState /> : filteredUsers.map(user => {
                  const rating = getRating(user.id);
                  let statusClass = 'success';
                  if(user.status === 'Suspended') statusClass = 'warning';
                  if(user.status === 'Blocked') statusClass = 'danger';

                  return (
                    <tr key={user.id}>
                      <td style={{ fontWeight: 600, color: 'var(--materio-text-main)' }}>
                        {user.id.replace('USR-', 'usr_')}
                      </td>
                      <td>
                        <div className="materio-user-cell">
                          <img src={user.avatar || "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&h=100&q=80"} alt={user.name} />
                          <div className="user-info">
                            <strong>{user.name}</strong>
                          </div>
                        </div>
                      </td>
                      <td>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                          <span style={{ fontSize: '13px', color: 'var(--materio-text-main)' }}>{user.mobile}</span>
                          <span style={{ fontSize: '12px', color: 'var(--materio-text-muted)' }}>{user.email.toLowerCase()}</span>
                        </div>
                      </td>
                      <td style={{ fontWeight: 600 }}>
                        ₹{(user.wallet?.balance || 0).toFixed(2)}
                      </td>
                      <td>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontWeight: 600 }}>
                          <Star size={14} fill="#FFAB00" color="#FFAB00" />
                          {rating}
                        </div>
                      </td>
                      <td>
                        <span style={{ fontSize: '14px', color: 'var(--materio-text-muted)' }}>
                          {user.bookingHistory?.length || 0} Bookings
                        </span>
                      </td>
                      <td>
                        <span className={`materio-badge ${statusClass}`}>
                          {user.status}
                        </span>
                      </td>
                      <td>
                        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                          <button 
                            className="btn-materio btn-materio-outline" 
                            style={{ padding: '6px 12px', fontSize: '13px' }}
                            onClick={() => setDrawerUser(user)}
                          >
                            <UserCheck size={14} /> Profile
                          </button>
                          <button className="btn-materio btn-materio-icon" title="Actions" onClick={() => setEditingUser(user)}>
                            <MoreVertical size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
</div>
          </div>
          
          <div style={{ padding: '16px 24px', borderTop: '1px solid var(--materio-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '13px', color: 'var(--materio-text-muted)' }}>
              Showing {filteredUsers.length} of {users.length} entries
            </span>
            {/* Simple pagination placeholder styling */}
            <div style={{ display: 'flex', gap: '4px' }}>
              <button onClick={() => addToast('Pagination: Previous page loaded', 'success')} style={{ border: '1px solid var(--materio-border)', background: 'transparent', padding: '6px 10px', borderRadius: '4px', cursor: 'pointer' }}>Prev</button>
              <button onClick={() => addToast('Pagination: Page 1 active', 'success')} style={{ border: 'none', background: 'var(--materio-primary)', color: '#fff', padding: '6px 12px', borderRadius: '4px', cursor: 'pointer' }}>1</button>
              <button onClick={() => addToast('Pagination: Next page loaded', 'success')} style={{ border: '1px solid var(--materio-border)', background: 'transparent', padding: '6px 10px', borderRadius: '4px', cursor: 'pointer' }}>Next</button>
            </div>
          </div>
        </div>
      </div>

      {/* Right Drawer for Profile Details */}
      <div className={`materio-drawer-overlay ${drawerUser ? 'open' : ''}`} onClick={() => setDrawerUser(null)}></div>
      <div className={`materio-drawer ${drawerUser ? 'open' : ''}`}>
        <div className="materio-drawer-header">
          <h2>Customer Profile</h2>
          <button className="btn-materio btn-materio-icon" onClick={() => setDrawerUser(null)}>
            <X size={20} />
          </button>
        </div>
        
        {drawerUser && (
          <div className="materio-drawer-content">
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '24px' }}>
              <img src={drawerUser.avatar} alt={drawerUser.name} style={{ width: '100px', height: '100px', borderRadius: '50%', marginBottom: '12px', objectFit: 'cover' }} />
              <h3 style={{ margin: '0 0 4px 0', fontSize: '20px' }}>{drawerUser.name}</h3>
              <span className={`materio-badge ${drawerUser.status === 'Active' ? 'success' : drawerUser.status === 'Suspended' ? 'warning' : 'danger'}`}>
                {drawerUser.status}
              </span>
            </div>

            <div style={{ marginBottom: '24px' }}>
              <h4 style={{ fontSize: '13px', color: 'var(--materio-text-muted)', textTransform: 'uppercase', marginBottom: '12px', borderBottom: '1px solid var(--materio-border)', paddingBottom: '8px' }}>Personal Details</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--materio-text-muted)' }}>ID</span>
                  <strong style={{ color: 'var(--materio-text-main)' }}>{drawerUser.id}</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--materio-text-muted)' }}>Email</span>
                  <strong style={{ color: 'var(--materio-text-main)' }}>{drawerUser.email}</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--materio-text-muted)' }}>Phone</span>
                  <strong style={{ color: 'var(--materio-text-main)' }}>{drawerUser.mobile}</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--materio-text-muted)' }}>Address</span>
                  <strong style={{ color: 'var(--materio-text-main)', textAlign: 'right', maxWidth: '200px' }}>{drawerUser.address || 'Not Provided'}</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--materio-text-muted)' }}>Joined</span>
                  <strong style={{ color: 'var(--materio-text-main)' }}>{drawerUser.registrationDate}</strong>
                </div>
              </div>
            </div>

            <div style={{ marginBottom: '24px' }}>
              <h4 style={{ fontSize: '13px', color: 'var(--materio-text-muted)', textTransform: 'uppercase', marginBottom: '12px', borderBottom: '1px solid var(--materio-border)', paddingBottom: '8px' }}>Activity & Wallet</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--materio-text-muted)' }}>Wallet Balance</span>
                  <strong style={{ color: 'var(--materio-text-main)' }}>₹{(drawerUser.wallet?.balance || 0).toFixed(2)}</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--materio-text-muted)' }}>Referral Earnings</span>
                  <strong style={{ color: 'var(--materio-text-main)' }}>₹{(drawerUser.referralEarnings || 0).toFixed(2)}</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--materio-text-muted)' }}>Total Bookings</span>
                  <strong style={{ color: 'var(--materio-text-main)' }}>{drawerUser.bookingHistory?.length || 0}</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--materio-text-muted)' }}>Rating</span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontWeight: 600 }}>
                    <Star size={14} fill="#FFAB00" color="#FFAB00" />
                    {getRating(drawerUser.id)}
                  </div>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--materio-text-muted)' }}>Audit Logs</span>
                  <button 
                    type="button" 
                    onClick={() => {
                      navigate(ROUTES.userAuditLogs);
                      setDrawerUser(null);
                      addToast(`Navigating to Audit Logs for ${drawerUser.name}`, 'success');
                    }}
                    style={{ background: 'transparent', border: 'none', color: 'var(--materio-primary)', fontWeight: 600, cursor: 'pointer', padding: 0 }}
                  >
                    View Logs ({drawerUser.auditLogsCount || 12})
                  </button>
                </div>
              </div>
            </div>
            
            <div style={{ marginBottom: '24px' }}>
              <h4 style={{ fontSize: '13px', color: 'var(--materio-text-muted)', textTransform: 'uppercase', marginBottom: '12px', borderBottom: '1px solid var(--materio-border)', paddingBottom: '8px' }}>Recent Bookings</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {drawerUser.bookingHistory && drawerUser.bookingHistory.length > 0 ? (
                  drawerUser.bookingHistory.map(bk => (
                    <div key={bk.id} style={{ padding: '12px', border: '1px solid var(--materio-border)', borderRadius: '6px', fontSize: '13px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                        <strong>{bk.serviceName}</strong>
                        <span>₹{bk.amount}</span>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--materio-text-muted)' }}>
                        <span>{bk.date}</span>
                        <span>{bk.status}</span>
                      </div>
                    </div>
                  ))
                ) : (
                  <span style={{ color: 'var(--materio-text-muted)', fontSize: '13px' }}>No recent bookings</span>
                )}
              </div>
            </div>
          </div>
        )}

        {drawerUser && (
          <div className="materio-drawer-footer">
            <button className="btn-materio btn-materio-primary" style={{ flex: 1, justifyContent: 'center' }} onClick={() => setEditingUser(drawerUser)}>
              <Edit3 size={16} /> Edit Profile
            </button>
            {drawerUser.status !== 'Blocked' && (
              <button 
                className="btn-materio btn-materio-outline" 
                style={{ flex: 1, justifyContent: 'center', borderColor: '#FF3E1D', color: '#FF3E1D' }}
                onClick={() => updateUserStatus(drawerUser, 'Blocked')}
              >
                <Ban size={16} /> Block
              </button>
            )}
            {drawerUser.status === 'Blocked' && (
              <button 
                className="btn-materio btn-materio-outline" 
                style={{ flex: 1, justifyContent: 'center', borderColor: '#71DD37', color: '#71DD37' }}
                onClick={() => updateUserStatus(drawerUser, 'Active')}
              >
                <CheckCircle2 size={16} /> Activate
              </button>
            )}
          </div>
        )}
      </div>

      <UserEditModal user={editingUser} onClose={() => setEditingUser(null)} onSave={saveEditedUser} />
    </AdminShell>
  );
}
