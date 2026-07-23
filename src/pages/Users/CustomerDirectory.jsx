import React, { useState, useMemo } from 'react';
import {
  Users,
  UserPlus,
  UserCheck,
  UserMinus,
  LogIn,
  LogOut,
  ShieldX,
  Search,
  Download,
  Eye,
  Edit3,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Filter
} from 'lucide-react';
import AdminShell from '../../components/layouts/AdminShell';
import { useToast } from '../../components/common/ToastNotification';
import { usersMockData } from './usersMockData';
import UserDirectoryViewModal from './UserDirectoryViewModal';
import UserEditModal from './UserEditModal';
import ExportReportModal from '../../components/common/ExportReportModal';

const ROWS_PER_PAGE = 8;
const monthsList = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const yearsList = Array.from({ length: 10 }, (_, i) => String(2026 + i));

function Badge({ value }) {
  let bg = '#f1f5f9', color = '#64748b';
  const val = String(value || '').toUpperCase();
  if (val === 'ACTIVE' || val === 'ONLINE' || val === 'SUCCESS' || val === 'VERIFIED') {
    bg = '#E8FADF'; color = '#71DD37';
  } else if (val === 'INACTIVE' || val === 'OFFLINE' || val === 'PENDING') {
    bg = '#FFF2D6'; color = '#FFAB00';
  } else if (val === 'BLOCKED' || val === 'SUSPENDED' || val === 'FAILED') {
    bg = '#FFE0DB'; color = '#FF3E1D';
  }
  return (
    <span style={{
      padding: '3px 10px', borderRadius: '6px', fontSize: '11px', fontWeight: 700,
      background: bg, color: color, letterSpacing: '0.4px', textTransform: 'uppercase'
    }}>
      {value}
    </span>
  );
}

export default function CustomerDirectory() {
  const { addToast } = useToast();
  const [customers, setCustomers] = useState(usersMockData);

  // Modals
  const [viewCustomer, setViewCustomer] = useState(null);
  const [editCustomer, setEditCustomer] = useState(null);
  const [isExportOpen, setIsExportOpen] = useState(false);
  const [showFilter, setShowFilter] = useState(true);

  // Specific Filters State
  const [accountStatus, setAccountStatus] = useState('All');
  const [loginStatus, setLoginStatus] = useState('All');
  const [stateFilter, setStateFilter] = useState('All States');
  const [cityFilter, setCityFilter] = useState('All Cities');
  const [districtFilter, setDistrictFilter] = useState('All Districts');
  const [locationType, setLocationType] = useState('All');
  const [mobileFilter, setMobileFilter] = useState('');
  const [emailFilter, setEmailFilter] = useState('');
  const [period, setPeriod] = useState('Monthly');
  const [selectedMonth, setSelectedMonth] = useState('May');
  const [selectedYear, setSelectedYear] = useState('2026');
  const [appliedTrigger, setAppliedTrigger] = useState(0);

  // Table Search & Pagination
  const [tableSearch, setTableSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  // Handle Filter Actions
  const handleApplyFilters = () => {
    setAppliedTrigger(prev => prev + 1);
    setCurrentPage(1);
    addToast('Customer directory filters applied', 'success');
  };

  const handleResetFilters = () => {
    setAccountStatus('All');
    setLoginStatus('All');
    setStateFilter('All States');
    setCityFilter('All Cities');
    setDistrictFilter('All Districts');
    setLocationType('All');
    setMobileFilter('');
    setEmailFilter('');
    setPeriod('Monthly');
    setSelectedMonth('May');
    setSelectedYear('2026');
    setTableSearch('');
    setAppliedTrigger(0);
    setCurrentPage(1);
    addToast('Filters reset to default', 'info');
  };

  // Filtered Customers
  const filteredCustomers = useMemo(() => {
    return customers.filter(c => {
      const matchAcc = accountStatus === 'All' || c.accountStatus === accountStatus;
      const matchLog = loginStatus === 'All' || c.loginStatus === loginStatus;
      const matchState = stateFilter === 'All States' || c.state === stateFilter;
      const matchCity = cityFilter === 'All Cities' || c.city === cityFilter;
      const matchDist = districtFilter === 'All Districts' || c.district === districtFilter;
      const matchLoc = locationType === 'All' || c.locationType === locationType;
      const matchMob = !mobileFilter.trim() || (c.mobile && c.mobile.includes(mobileFilter.trim()));
      const matchEm = !emailFilter.trim() || (c.email && c.email.toLowerCase().includes(emailFilter.trim().toLowerCase()));

      const q = tableSearch.trim().toLowerCase();
      const matchQ = !q ||
        c.id.toLowerCase().includes(q) ||
        c.name.toLowerCase().includes(q) ||
        (c.mobile && c.mobile.includes(q)) ||
        (c.email && c.email.toLowerCase().includes(q)) ||
        (c.city && c.city.toLowerCase().includes(q));

      return matchAcc && matchLog && matchState && matchCity && matchDist && matchLoc && matchMob && matchEm && matchQ;
    });
  }, [customers, accountStatus, loginStatus, stateFilter, cityFilter, districtFilter, locationType, mobileFilter, emailFilter, tableSearch, appliedTrigger]);

  // Pagination calculation
  const totalPages = Math.max(1, Math.ceil(filteredCustomers.length / ROWS_PER_PAGE));
  const currentSlice = useMemo(() => {
    const start = (currentPage - 1) * ROWS_PER_PAGE;
    return filteredCustomers.slice(start, start + ROWS_PER_PAGE);
  }, [filteredCustomers, currentPage]);

  const handlePageChange = (p) => {
    if (p >= 1 && p <= totalPages) setCurrentPage(p);
  };

  const handleSaveCustomer = (updated) => {
    setCustomers(prev => prev.map(c => c.id === updated.id ? updated : c));
    setEditCustomer(null);
    addToast(`Customer ${updated.name} updated successfully`, 'success');
  };

  return (
    <AdminShell activeTab="User Management" searchPlaceholder="Search customer directory...">
      <div style={{ paddingBottom: '48px', fontFamily: "'Inter', -apple-system, sans-serif" }}>

        {/* ── 7 KPI STAT CARDS (TOP OF PAGE MATCHING SCREENSHOT) ── */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: 12, marginBottom: 20 }}>
          
          <div style={{ background: '#fff', borderRadius: 10, padding: '14px 16px', border: '1px solid #e8edf2', boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, color: '#64748b', fontWeight: 500, marginBottom: 6 }}>
              <div style={{ width: 22, height: 22, borderRadius: '50%', background: '#eff6ff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Users size={13} color="#2563eb" />
              </div>
              Total Users
            </div>
            <div style={{ fontSize: 20, fontWeight: 800, color: '#0f172a', marginBottom: 2 }}>98,642</div>
            <div style={{ fontSize: 11, color: '#94a3b8' }}>All Time · <span style={{ color: '#16a34a', fontWeight: 700 }}>+18.5%</span></div>
          </div>

          <div style={{ background: '#fff', borderRadius: 10, padding: '14px 16px', border: '1px solid #e8edf2', boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, color: '#64748b', fontWeight: 500, marginBottom: 6 }}>
              <div style={{ width: 22, height: 22, borderRadius: '50%', background: '#f0fdf4', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <UserPlus size={13} color="#16a34a" />
              </div>
              New Users
            </div>
            <div style={{ fontSize: 20, fontWeight: 800, color: '#0f172a', marginBottom: 2 }}>2,842</div>
            <div style={{ fontSize: 11, color: '#94a3b8' }}>This Period · <span style={{ color: '#16a34a', fontWeight: 700 }}>+12.4%</span></div>
          </div>

          <div style={{ background: '#fff', borderRadius: 10, padding: '14px 16px', border: '1px solid #e8edf2', boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, color: '#64748b', fontWeight: 500, marginBottom: 6 }}>
              <div style={{ width: 22, height: 22, borderRadius: '50%', background: '#faf5ff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <UserCheck size={13} color="#9333ea" />
              </div>
              Active Users
            </div>
            <div style={{ fontSize: 20, fontWeight: 800, color: '#0f172a', marginBottom: 2 }}>48,215</div>
            <div style={{ fontSize: 11, color: '#94a3b8' }}>This Period · <span style={{ color: '#16a34a', fontWeight: 700 }}>+8.7%</span></div>
          </div>

          <div style={{ background: '#fff', borderRadius: 10, padding: '14px 16px', border: '1px solid #e8edf2', boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, color: '#64748b', fontWeight: 500, marginBottom: 6 }}>
              <div style={{ width: 22, height: 22, borderRadius: '50%', background: '#fff7ed', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <UserMinus size={13} color="#ea580c" />
              </div>
              Inactive Users
            </div>
            <div style={{ fontSize: 20, fontWeight: 800, color: '#0f172a', marginBottom: 2 }}>1,204</div>
            <div style={{ fontSize: 11, color: '#94a3b8' }}>This Period · <span style={{ color: '#dc2626', fontWeight: 700 }}>-2.1%</span></div>
          </div>

          <div style={{ background: '#fff', borderRadius: 10, padding: '14px 16px', border: '1px solid #e8edf2', boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, color: '#64748b', fontWeight: 500, marginBottom: 6 }}>
              <div style={{ width: 22, height: 22, borderRadius: '50%', background: '#eff6ff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <LogIn size={13} color="#2563eb" />
              </div>
              Logged In
            </div>
            <div style={{ fontSize: 20, fontWeight: 800, color: '#0f172a', marginBottom: 2 }}>32,756</div>
            <div style={{ fontSize: 11, color: '#94a3b8' }}>This Period · <span style={{ color: '#16a34a', fontWeight: 700 }}>+9.6%</span></div>
          </div>

          <div style={{ background: '#fff', borderRadius: 10, padding: '14px 16px', border: '1px solid #e8edf2', boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, color: '#64748b', fontWeight: 500, marginBottom: 6 }}>
              <div style={{ width: 22, height: 22, borderRadius: '50%', background: '#faf5ff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <LogOut size={13} color="#9333ea" />
              </div>
              Logged Out
            </div>
            <div style={{ fontSize: 20, fontWeight: 800, color: '#0f172a', marginBottom: 2 }}>65,886</div>
            <div style={{ fontSize: 11, color: '#94a3b8' }}>This Period · <span style={{ color: '#16a34a', fontWeight: 700 }}>+10.3%</span></div>
          </div>

          <div style={{ background: '#fff', borderRadius: 10, padding: '14px 16px', border: '1px solid #e8edf2', boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, color: '#64748b', fontWeight: 500, marginBottom: 6 }}>
              <div style={{ width: 22, height: 22, borderRadius: '50%', background: '#fef2f2', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <ShieldX size={13} color="#dc2626" />
              </div>
              Blocked Users
            </div>
            <div style={{ fontSize: 20, fontWeight: 800, color: '#0f172a', marginBottom: 2 }}>156</div>
            <div style={{ fontSize: 11, color: '#94a3b8' }}>This Period · <span style={{ color: '#dc2626', fontWeight: 700 }}>-5.4%</span></div>
          </div>

        </div>

        {/* ── TABLE CARD (WITH INTEGRATED FILTER PANEL AS SHOWN IN SCREENSHOT) ── */}
        <div style={{ background: '#fff', borderRadius: 12, border: '1px solid #e8edf2', boxShadow: '0 1px 3px rgba(0,0,0,0.04)', overflow: 'hidden' }}>

          {/* Table Header Bar (Filter Toggle + Search + Export Report) */}
          <div style={{
            padding: '16px 20px', borderBottom: '1px solid #e8edf2',
            display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12
          }}>

            {/* Filter Toggle Button */}
            <button
              onClick={() => setShowFilter(f => !f)}
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 6,
                padding: '7px 14px', borderRadius: 6,
                border: showFilter ? 'none' : '1px solid #dde3ea',
                background: showFilter ? '#2563eb' : '#fff',
                color: showFilter ? '#fff' : '#334155',
                fontSize: 12, fontWeight: 600, cursor: 'pointer', transition: 'all 0.15s'
              }}
            >
              <Filter size={14} />
              Filter
            </button>
            
            {/* Right Controls: Search + Export Report */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                <Search size={14} style={{ position: 'absolute', left: 10, color: '#94a3b8', pointerEvents: 'none' }} />
                <input
                  type="text"
                  placeholder="Search customers..."
                  value={tableSearch}
                  onChange={e => { setTableSearch(e.target.value); setCurrentPage(1); }}
                  style={{
                    padding: '7px 12px 7px 32px', border: '1px solid #dde3ea', borderRadius: 6,
                    fontSize: 12, color: '#334155', outline: 'none', background: '#fff', width: 220
                  }}
                />
              </div>

              <button
                onClick={() => setIsExportOpen(true)}
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: 6,
                  padding: '7px 16px', borderRadius: 6, border: 'none',
                  background: '#2563eb', color: '#fff', fontSize: 12, fontWeight: 600,
                  cursor: 'pointer', transition: 'background 0.15s'
                }}
              >
                <Download size={14} /> Export Report
              </button>
            </div>

          </div>

          {/* ── FILTER PANEL INSIDE TABLE CARD (MATCHING SCREENSHOT 1 & 2) ── */}
          {showFilter && (
            <div style={{
              padding: '18px 20px', background: '#fafcff',
              borderBottom: '1px solid #e8edf2',
              display: 'flex', flexDirection: 'column', gap: 14
            }}>
              
              {/* Row 1: Account Status, Login Status, State, City, District, Location Type */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: 12 }}>
                
                {/* Account Status */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                  <label style={{ fontSize: 11, fontWeight: 600, color: '#475569' }}>Account Status</label>
                  <div style={{ position: 'relative' }}>
                    <select value={accountStatus} onChange={e => setAccountStatus(e.target.value)} style={{
                      width: '100%', appearance: 'none', background: '#fff', border: '1px solid #dde3ea',
                      borderRadius: 6, padding: '7px 26px 7px 10px', fontSize: 12, fontWeight: 500, color: '#334155', cursor: 'pointer', outline: 'none'
                    }}>
                      <option value="All">All Statuses</option>
                      <option value="Active">Active</option>
                      <option value="Inactive">Inactive</option>
                      <option value="Blocked">Blocked</option>
                      <option value="Suspended">Suspended</option>
                    </select>
                    <ChevronDown size={12} style={{ position: 'absolute', right: 8, top: '50%', transform: 'translateY(-50%)', color: '#94a3b8', pointerEvents: 'none' }} />
                  </div>
                </div>

                {/* Login Status */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                  <label style={{ fontSize: 11, fontWeight: 600, color: '#475569' }}>Login Status</label>
                  <div style={{ position: 'relative' }}>
                    <select value={loginStatus} onChange={e => setLoginStatus(e.target.value)} style={{
                      width: '100%', appearance: 'none', background: '#fff', border: '1px solid #dde3ea',
                      borderRadius: 6, padding: '7px 26px 7px 10px', fontSize: 12, fontWeight: 500, color: '#334155', cursor: 'pointer', outline: 'none'
                    }}>
                      <option value="All">All</option>
                      <option value="Online">Online</option>
                      <option value="Offline">Offline</option>
                    </select>
                    <ChevronDown size={12} style={{ position: 'absolute', right: 8, top: '50%', transform: 'translateY(-50%)', color: '#94a3b8', pointerEvents: 'none' }} />
                  </div>
                </div>

                {/* State */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                  <label style={{ fontSize: 11, fontWeight: 600, color: '#475569' }}>State</label>
                  <div style={{ position: 'relative' }}>
                    <select value={stateFilter} onChange={e => setStateFilter(e.target.value)} style={{
                      width: '100%', appearance: 'none', background: '#fff', border: '1px solid #dde3ea',
                      borderRadius: 6, padding: '7px 26px 7px 10px', fontSize: 12, fontWeight: 500, color: '#334155', cursor: 'pointer', outline: 'none'
                    }}>
                      {['All States', 'Telangana', 'Karnataka', 'Maharashtra', 'Delhi', 'Tamil Nadu'].map(o => <option key={o}>{o}</option>)}
                    </select>
                    <ChevronDown size={12} style={{ position: 'absolute', right: 8, top: '50%', transform: 'translateY(-50%)', color: '#94a3b8', pointerEvents: 'none' }} />
                  </div>
                </div>

                {/* City */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                  <label style={{ fontSize: 11, fontWeight: 600, color: '#475569' }}>City</label>
                  <div style={{ position: 'relative' }}>
                    <select value={cityFilter} onChange={e => setCityFilter(e.target.value)} style={{
                      width: '100%', appearance: 'none', background: '#fff', border: '1px solid #dde3ea',
                      borderRadius: 6, padding: '7px 26px 7px 10px', fontSize: 12, fontWeight: 500, color: '#334155', cursor: 'pointer', outline: 'none'
                    }}>
                      {['All Cities', 'Hyderabad', 'Bengaluru', 'Mumbai', 'Delhi', 'Chennai'].map(o => <option key={o}>{o}</option>)}
                    </select>
                    <ChevronDown size={12} style={{ position: 'absolute', right: 8, top: '50%', transform: 'translateY(-50%)', color: '#94a3b8', pointerEvents: 'none' }} />
                  </div>
                </div>

                {/* District */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                  <label style={{ fontSize: 11, fontWeight: 600, color: '#475569' }}>District</label>
                  <div style={{ position: 'relative' }}>
                    <select value={districtFilter} onChange={e => setDistrictFilter(e.target.value)} style={{
                      width: '100%', appearance: 'none', background: '#fff', border: '1px solid #dde3ea',
                      borderRadius: 6, padding: '7px 26px 7px 10px', fontSize: 12, fontWeight: 500, color: '#334155', cursor: 'pointer', outline: 'none'
                    }}>
                      {['All Districts', 'Hyderabad', 'Rangareddy', 'Medchal', 'Bangalore Urban'].map(o => <option key={o}>{o}</option>)}
                    </select>
                    <ChevronDown size={12} style={{ position: 'absolute', right: 8, top: '50%', transform: 'translateY(-50%)', color: '#94a3b8', pointerEvents: 'none' }} />
                  </div>
                </div>

                {/* Location Type */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                  <label style={{ fontSize: 11, fontWeight: 600, color: '#475569' }}>Location Type</label>
                  <div style={{ position: 'relative' }}>
                    <select value={locationType} onChange={e => setLocationType(e.target.value)} style={{
                      width: '100%', appearance: 'none', background: '#fff', border: '1px solid #dde3ea',
                      borderRadius: 6, padding: '7px 26px 7px 10px', fontSize: 12, fontWeight: 500, color: '#334155', cursor: 'pointer', outline: 'none'
                    }}>
                      <option value="All">All</option>
                      <option value="Urban">Urban</option>
                      <option value="Rural">Rural</option>
                    </select>
                    <ChevronDown size={12} style={{ position: 'absolute', right: 8, top: '50%', transform: 'translateY(-50%)', color: '#94a3b8', pointerEvents: 'none' }} />
                  </div>
                </div>

              </div>

              {/* Row 2: Mobile Number, Email ID, Timeframe Selector, Apply & Reset Buttons */}
              <div style={{ display: 'flex', alignItems: 'flex-end', gap: 12, flexWrap: 'wrap' }}>
                
                {/* Mobile Number */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 4, minWidth: 160, flex: 1 }}>
                  <label style={{ fontSize: 11, fontWeight: 600, color: '#475569' }}>Mobile Number</label>
                  <input
                    type="text"
                    placeholder="Mobile Number"
                    value={mobileFilter}
                    onChange={e => setMobileFilter(e.target.value)}
                    style={{
                      width: '100%', padding: '7px 10px', border: '1px solid #dde3ea',
                      borderRadius: 6, fontSize: 12, fontWeight: 500, color: '#334155', outline: 'none', background: '#fff'
                    }}
                  />
                </div>

                {/* Email ID */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 4, minWidth: 180, flex: 1 }}>
                  <label style={{ fontSize: 11, fontWeight: 600, color: '#475569' }}>Email ID</label>
                  <input
                    type="text"
                    placeholder="Email ID"
                    value={emailFilter}
                    onChange={e => setEmailFilter(e.target.value)}
                    style={{
                      width: '100%', padding: '7px 10px', border: '1px solid #dde3ea',
                      borderRadius: 6, fontSize: 12, fontWeight: 500, color: '#334155', outline: 'none', background: '#fff'
                    }}
                  />
                </div>

                {/* Time Period Tabs: Daily, Weekly, Monthly, Yearly */}
                <div style={{ display: 'flex', border: '1px solid #dde3ea', borderRadius: 6, overflow: 'hidden', background: '#fff' }}>
                  {['Daily', 'Weekly', 'Monthly', 'Yearly'].map(p => (
                    <button
                      key={p}
                      onClick={() => setPeriod(p)}
                      style={{
                        padding: '6px 14px', border: 'none', background: period === p ? '#0f172a' : 'transparent',
                        color: period === p ? '#fff' : '#475569', fontSize: 12, fontWeight: period === p ? 700 : 500,
                        cursor: 'pointer', transition: 'all 0.15s'
                      }}
                    >
                      {p}
                    </button>
                  ))}
                </div>

                {/* Month Dropdown */}
                {period === 'Monthly' && (
                  <div style={{ position: 'relative' }}>
                    <select value={selectedMonth} onChange={e => setSelectedMonth(e.target.value)} style={{
                      appearance: 'none', background: '#fff', border: '1px solid #dde3ea',
                      borderRadius: 6, padding: '6px 28px 6px 10px', fontSize: 12,
                      fontWeight: 500, color: '#334155', cursor: 'pointer', outline: 'none', minWidth: 70
                    }}>
                      {monthsList.map(m => <option key={m}>{m}</option>)}
                    </select>
                    <ChevronDown size={12} style={{ position: 'absolute', right: 8, top: '50%', transform: 'translateY(-50%)', color: '#94a3b8', pointerEvents: 'none' }} />
                  </div>
                )}

                {/* Year Dropdown */}
                <div style={{ position: 'relative' }}>
                  <select value={selectedYear} onChange={e => setSelectedYear(e.target.value)} style={{
                    appearance: 'none', background: '#fff', border: '1px solid #dde3ea',
                    borderRadius: 6, padding: '6px 28px 6px 10px', fontSize: 12,
                    fontWeight: 500, color: '#334155', cursor: 'pointer', outline: 'none', minWidth: 72
                  }}>
                    {yearsList.map(y => <option key={y}>{y}</option>)}
                  </select>
                  <ChevronDown size={12} style={{ position: 'absolute', right: 8, top: '50%', transform: 'translateY(-50%)', color: '#94a3b8', pointerEvents: 'none' }} />
                </div>

                {/* Apply & Reset Buttons */}
                <div style={{ display: 'flex', gap: 8, marginLeft: 'auto' }}>
                  <button
                    onClick={handleApplyFilters}
                    style={{
                      padding: '7px 22px', borderRadius: 6, border: 'none',
                      background: '#0f172a', color: '#fff', fontSize: 12, fontWeight: 600,
                      cursor: 'pointer', transition: 'opacity 0.15s'
                    }}
                  >
                    Apply
                  </button>
                  <button
                    onClick={handleResetFilters}
                    style={{
                      padding: '7px 18px', borderRadius: 6, border: '1px solid #dde3ea',
                      background: '#fff', color: '#334155', fontSize: 12, fontWeight: 600,
                      cursor: 'pointer', transition: 'background 0.15s'
                    }}
                  >
                    Reset
                  </button>
                </div>

              </div>

            </div>
          )}

          {/* Dual Scroll Table (Horizontal & Vertical with Sticky Light Header) */}
          <div style={{ maxHeight: '520px', overflowX: 'auto', overflowY: 'auto', position: 'relative' }}>
            <table style={{ width: '100%', minWidth: '1600px', borderCollapse: 'collapse', textAlign: 'left', fontSize: 13 }}>
              <thead style={{ position: 'sticky', top: 0, zIndex: 10, background: '#f8fafc', boxShadow: '0 1px 2px rgba(0,0,0,0.05)' }}>
                <tr style={{ background: '#f8fafc', borderBottom: '1px solid #e2e8f0' }}>
                  <th style={{ padding: '12px 16px', fontWeight: 600, color: '#475569', fontSize: 12, minWidth: '90px' }}>ID</th>
                  <th style={{ padding: '12px 16px', fontWeight: 600, color: '#475569', fontSize: 12, minWidth: '160px' }}>Customer Name</th>
                  <th style={{ padding: '12px 16px', fontWeight: 600, color: '#475569', fontSize: 12, minWidth: '130px' }}>Phone</th>
                  <th style={{ padding: '12px 16px', fontWeight: 600, color: '#475569', fontSize: 12, minWidth: '180px' }}>Email ID</th>
                  <th style={{ padding: '12px 16px', fontWeight: 600, color: '#475569', fontSize: 12, minWidth: '90px' }}>Gender</th>
                  <th style={{ padding: '12px 16px', fontWeight: 600, color: '#475569', fontSize: 12, minWidth: '110px' }}>Date of Birth</th>
                  <th style={{ padding: '12px 16px', fontWeight: 600, color: '#475569', fontSize: 12, minWidth: '100px' }}>Avg Rating</th>
                  <th style={{ padding: '12px 16px', fontWeight: 600, color: '#475569', fontSize: 12, minWidth: '100px' }}>WhatsApp</th>
                  <th style={{ padding: '12px 16px', fontWeight: 600, color: '#475569', fontSize: 12, minWidth: '120px' }}>Account Status</th>
                  <th style={{ padding: '12px 16px', fontWeight: 600, color: '#475569', fontSize: 12, minWidth: '110px' }}>Login Status</th>
                  <th style={{ padding: '12px 16px', fontWeight: 600, color: '#475569', fontSize: 12, minWidth: '110px' }}>Member Since</th>
                  <th style={{ padding: '12px 16px', fontWeight: 600, color: '#475569', fontSize: 12, minWidth: '90px' }}>Fav Addr.</th>
                  <th style={{ padding: '12px 16px', fontWeight: 600, color: '#475569', fontSize: 12, minWidth: '120px' }}>Emrg. Contacts</th>
                  <th style={{ padding: '12px 16px', fontWeight: 600, color: '#475569', fontSize: 12, minWidth: '110px' }}>Location Type</th>
                  <th style={{ padding: '12px 16px', fontWeight: 600, color: '#475569', fontSize: 12, minWidth: '100px' }}>City</th>
                  <th style={{ padding: '12px 16px', fontWeight: 600, color: '#475569', fontSize: 12, minWidth: '110px' }}>State</th>
                  <th style={{ padding: '12px 16px', fontWeight: 600, color: '#475569', fontSize: 12, minWidth: '110px', textAlign: 'center' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentSlice.length === 0 ? (
                  <tr>
                    <td colSpan={17} style={{ padding: '40px', textAlign: 'center', color: '#94a3b8' }}>
                      No customers found matching the filter criteria.
                    </td>
                  </tr>
                ) : currentSlice.map(c => (
                  <tr key={c.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                    <td style={{ padding: '14px 16px', fontWeight: 700, color: '#2563eb', fontSize: 12 }}>{c.id}</td>
                    <td style={{ padding: '14px 16px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                        <img src={c.avatar} alt={c.name} style={{ width: 32, height: 32, borderRadius: '50%', objectFit: 'cover' }} onError={e => e.target.style.display = 'none'} />
                        <span style={{ fontWeight: 600, color: '#0f172a', whiteSpace: 'nowrap' }}>{c.name}</span>
                      </div>
                    </td>
                    <td style={{ padding: '14px 16px', color: '#334155', whiteSpace: 'nowrap' }}>{c.mobile}</td>
                    <td style={{ padding: '14px 16px', color: '#64748b', whiteSpace: 'nowrap' }}>{c.email}</td>
                    <td style={{ padding: '14px 16px', color: '#334155' }}>{c.gender}</td>
                    <td style={{ padding: '14px 16px', color: '#334155', whiteSpace: 'nowrap' }}>{c.dateOfBirth}</td>
                    <td style={{ padding: '14px 16px', fontWeight: 600, color: '#0f172a' }}>★ {c.averageRating}</td>
                    <td style={{ padding: '14px 16px' }}><Badge value={c.whatsappStatus} /></td>
                    <td style={{ padding: '14px 16px' }}><Badge value={c.accountStatus} /></td>
                    <td style={{ padding: '14px 16px' }}><Badge value={c.loginStatus} /></td>
                    <td style={{ padding: '14px 16px', color: '#334155', whiteSpace: 'nowrap' }}>{c.memberSince}</td>
                    <td style={{ padding: '14px 16px', textAlign: 'center', color: '#334155' }}>{c.favoriteAddressCount}</td>
                    <td style={{ padding: '14px 16px', textAlign: 'center', color: '#334155' }}>{c.emergencyContactsCount}</td>
                    <td style={{ padding: '14px 16px', color: '#334155' }}>{c.locationType}</td>
                    <td style={{ padding: '14px 16px', color: '#334155' }}>{c.city}</td>
                    <td style={{ padding: '14px 16px', color: '#334155' }}>{c.state}</td>
                    <td style={{ padding: '14px 16px', textAlign: 'center' }}>
                      <div style={{ display: 'inline-flex', gap: 6 }}>
                        <button
                          title="View Details"
                          onClick={() => setViewCustomer(c)}
                          style={{
                            border: 'none', background: '#eff6ff', color: '#2563eb',
                            cursor: 'pointer', width: 28, height: 28, borderRadius: '50%',
                            display: 'inline-flex', alignItems: 'center', justifyContent: 'center'
                          }}
                        >
                          <Eye size={15} />
                        </button>
                        <button
                          title="Edit Customer"
                          onClick={() => setEditCustomer(c)}
                          style={{
                            border: 'none', background: '#f0fdf4', color: '#16a34a',
                            cursor: 'pointer', width: 28, height: 28, borderRadius: '50%',
                            display: 'inline-flex', alignItems: 'center', justifyContent: 'center'
                          }}
                        >
                          <Edit3 size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Footer Pagination */}
          <div style={{
            padding: '14px 20px', borderTop: '1px solid #e8edf2', background: '#fff',
            display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12
          }}>
            <span style={{ fontSize: 12, color: '#64748b' }}>
              Showing <strong>{((currentPage - 1) * ROWS_PER_PAGE) + 1} to {Math.min(currentPage * ROWS_PER_PAGE, filteredCustomers.length)}</strong> of <strong>{filteredCustomers.length}</strong> entries
            </span>

            <div style={{ display: 'flex', gap: 4, alignItems: 'center' }}>
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                style={{
                  border: '1px solid #dde3ea', background: '#fff', padding: '5px 9px', borderRadius: 6,
                  cursor: currentPage === 1 ? 'not-allowed' : 'pointer', opacity: currentPage === 1 ? 0.4 : 1,
                  color: '#64748b'
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
                    fontSize: 12, fontWeight: currentPage === p ? 700 : 500, minWidth: 28
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
                  color: '#64748b'
                }}
              >
                <ChevronRight size={14} />
              </button>
            </div>
          </div>

        </div>

      </div>

      {/* Modals */}
      <UserDirectoryViewModal user={viewCustomer} onClose={() => setViewCustomer(null)} onEdit={u => { setViewCustomer(null); setEditCustomer(u); }} />
      <UserEditModal user={editCustomer} onClose={() => setEditCustomer(null)} onSave={handleSaveCustomer} />
      <ExportReportModal isOpen={isExportOpen} onClose={() => setIsExportOpen(false)} entityName="Customer Directory" data={filteredCustomers} />
    </AdminShell>
  );
}
