import React, { useMemo, useState } from 'react';
import {
  Users,
  UserPlus,
  UserCheck,
  UserMinus,
  LogIn,
  LogOut,
  ShieldX,
  TrendingUp,
  TrendingDown,
  ChevronDown,
  ChevronUp,
  ChevronsUpDown,
  Search,
  Download,
  Eye,
  Edit3,
  Monitor,
  Activity,
  ChevronLeft,
  ChevronRight,
  Filter
} from 'lucide-react';
import AdminShell from '../../components/layouts/AdminShell';
import { useToast } from '../../components/common/ToastNotification';
import { usersMockData, loginAttemptsMockData, activityLogsMockData } from './usersMockData';
import ExportReportModal from '../../components/common/ExportReportModal';
import UserDirectoryViewModal from './UserDirectoryViewModal';
import UserEditModal from './UserEditModal';
import LoginAttemptViewModal from './LoginAttemptViewModal';
import ActivityLogViewModal from './ActivityLogViewModal';

// ─── CONSTANTS ────────────────────────────────────────────────────────────────

const ROWS_PER_PAGE = 7;
const LOG_ROWS_PER_PAGE = 7;
const ATTEMPT_ROWS_PER_PAGE = 7;

const monthsList = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
const yearsList  = Array.from({ length: 10 }, (_, i) => String(2026 + i));

// ─── HELPERS ─────────────────────────────────────────────────────────────────

function normalize(v) { return String(v || '').trim().toLowerCase(); }

function fmtNum(n) {
  if (n >= 1_000_000) return (n / 1_000_000).toFixed(1) + 'M';
  if (n >= 1_000)     return n.toLocaleString();
  return n.toString();
}

function Badge({ value, variant }) {
  const map = {
    success: { bg: '#E8FADF', color: '#71DD37' },
    warning: { bg: '#FFF2D6', color: '#FFAB00' },
    danger:  { bg: '#FFE0DB', color: '#FF3E1D' },
    info:    { bg: '#E1F0FF', color: '#03C3EC' },
    neutral: { bg: '#f1f5f9', color: '#64748b' },
    primary: { bg: 'rgba(105,108,255,0.12)', color: '#696CFF' },
  };
  const s = map[variant] || map.neutral;
  return (
    <span style={{ padding: '3px 10px', borderRadius: '9999px', fontSize: '11px', fontWeight: 700, background: s.bg, color: s.color, textTransform: 'uppercase', letterSpacing: '0.4px', whiteSpace: 'nowrap' }}>
      {value}
    </span>
  );
}

function getStatusVariant(val) {
  if (!val) return 'neutral';
  const v = val.toLowerCase();
  if (v === 'active' || v === 'online' || v === 'success') return 'success';
  if (v === 'suspended' || v === 'inactive' || v === 'otp expired' || v === 'offline') return 'warning';
  if (v === 'blocked' || v === 'failed') return 'danger';
  return 'neutral';
}

function SortIcon({ col, sortConfig }) {
  if (sortConfig.key !== col) return <ChevronsUpDown size={12} style={{ opacity: 0.35, marginLeft: '3px' }} />;
  return sortConfig.dir === 'asc' ? <ChevronUp size={12} style={{ marginLeft: '3px', color: '#fff' }} /> : <ChevronDown size={12} style={{ marginLeft: '3px', color: '#fff' }} />;
}

function usePagination(data, perPage) {
  const [page, setPage] = useState(1);
  const totalPages = Math.max(1, Math.ceil(data.length / perPage));
  const slice = data.slice((page - 1) * perPage, page * perPage);
  const safePage = (p) => setPage(Math.min(Math.max(1, p), totalPages));
  return { page, totalPages, slice, setPage: safePage };
}

function Pagination({ page, totalPages, setPage, total, perPage }) {
  const from = total === 0 ? 0 : (page - 1) * perPage + 1;
  const to = Math.min(page * perPage, total);
  const pages = [];
  for (let i = 1; i <= totalPages; i++) pages.push(i);
  const visible = pages.filter(p => p === 1 || p === totalPages || Math.abs(p - page) <= 1);

  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px 20px', borderTop: '1px solid var(--materio-border)' }}>
      <span style={{ fontSize: '13px', color: 'var(--materio-text-muted)' }}>
        Showing <strong>{from}–{to}</strong> of <strong>{total}</strong> entries
      </span>
      <div style={{ display: 'flex', gap: '4px', alignItems: 'center' }}>
        <button onClick={() => setPage(page - 1)} disabled={page === 1} style={{ border: '1px solid var(--materio-border)', background: 'transparent', padding: '5px 9px', borderRadius: '6px', cursor: page === 1 ? 'not-allowed' : 'pointer', opacity: page === 1 ? 0.4 : 1, display: 'flex', alignItems: 'center' }}>
          <ChevronLeft size={14} />
        </button>
        {visible.map((p, i) => {
          const prev = visible[i - 1];
          return (
            <React.Fragment key={p}>
              {prev && p - prev > 1 && <span style={{ padding: '5px', color: '#94a3b8', fontSize: '13px' }}>…</span>}
              <button onClick={() => setPage(p)} style={{ border: page === p ? 'none' : '1px solid var(--materio-border)', background: page === p ? 'var(--materio-primary)' : 'transparent', color: page === p ? '#fff' : 'var(--materio-text-main)', padding: '5px 10px', borderRadius: '6px', cursor: 'pointer', fontSize: '13px', fontWeight: page === p ? 700 : 400, minWidth: '32px' }}>
                {p}
              </button>
            </React.Fragment>
          );
        })}
        <button onClick={() => setPage(page + 1)} disabled={page === totalPages} style={{ border: '1px solid var(--materio-border)', background: 'transparent', padding: '5px 9px', borderRadius: '6px', cursor: page === totalPages ? 'not-allowed' : 'pointer', opacity: page === totalPages ? 0.4 : 1, display: 'flex', alignItems: 'center' }}>
          <ChevronRight size={14} />
        </button>
      </div>
    </div>
  );
}

// ─── TABLE HEADER CELL ────────────────────────────────────────────────────────

function TH({ col, label, sortConfig, onSort, style = {} }) {
  return (
    <th onClick={() => onSort(col)} style={{ cursor: 'pointer', userSelect: 'none', whiteSpace: 'nowrap', ...style }}>
      <span style={{ display: 'inline-flex', alignItems: 'center' }}>
        {label}
        <SortIcon col={col} sortConfig={sortConfig} />
      </span>
    </th>
  );
}

// ─── MAIN COMPONENT ───────────────────────────────────────────────────────────

export default function UserDirectory() {
  const { addToast } = useToast();

  const [users, setUsers] = useState(usersMockData);

  // Modals
  const [viewUser, setViewUser]     = useState(null);
  const [editUser, setEditUser]     = useState(null);
  const [viewAttempt, setViewAttempt] = useState(null);
  const [viewLog, setViewLog]       = useState(null);
  const [isExportOpen, setIsExportOpen] = useState(false);

  // Filters State (Original Design matching Screenshot 1)
  const [stateFilter, setStateFilter] = useState('All States');
  const [cityFilter, setCityFilter]   = useState('All Cities');
  const [districtFilter, setDistrictFilter] = useState('All Districts');
  const [locationType, setLocationType]     = useState('All');
  const [period, setPeriod]                 = useState('Monthly');
  const [selectedMonth, setSelectedMonth]   = useState('May');
  const [selectedYear, setSelectedYear]     = useState('2026');
  const [mobileFilter, setMobileFilter]     = useState('');
  const [emailFilter, setEmailFilter]       = useState('');
  const [appliedTrigger, setAppliedTrigger] = useState(0);

  // Table Search & Sort
  const [userSearch, setUserSearch] = useState('');
  const [userSort, setUserSort]     = useState({ key: 'id', dir: 'asc' });

  // Login Attempts filters
  const [attemptSearch, setAttemptSearch] = useState('');
  const [attemptSort, setAttemptSort]     = useState({ key: 'id', dir: 'asc' });

  // Activity Logs filters
  const [logFilters, setLogFilters] = useState({ userName: '', mobile: '', email: '', activityType: '', module: '', status: '' });
  const [logSearch, setLogSearch]   = useState('');
  const [logSort, setLogSort]       = useState({ key: 'id', dir: 'asc' });

  const handleApplyFilters = () => {
    setAppliedTrigger(prev => prev + 1);
    addToast('Filters applied successfully', 'success');
  };

  const handleResetFilters = () => {
    setStateFilter('All States');
    setCityFilter('All Cities');
    setDistrictFilter('All Districts');
    setLocationType('All');
    setPeriod('Monthly');
    setSelectedMonth('May');
    setSelectedYear('2026');
    setMobileFilter('');
    setEmailFilter('');
    setAppliedTrigger(0);
    addToast('Filters reset', 'info');
  };

  // ── Multipliers & Dynamic KPI Box values ─────────────────────────────────────
  const periodMult = period === 'Daily' ? 0.03 : period === 'Weekly' ? 0.25 : period === 'Yearly' ? 12 : 1;
  const triggerMult = appliedTrigger === 0 ? 1 : 1 + ((appliedTrigger % 5) * 0.15);
  const locMult = locationType === 'Urban' ? 0.65 : locationType === 'Rural' ? 0.35 : 1;
  const m = periodMult * triggerMult * locMult;

  const dynKpis = useMemo(() => [
    { label: 'Total Users',    val: Math.floor(98642 * (m >= 1 ? 1 : m)), sub: 'All Time',    pct: 18.5, up: true,  color: '#2563eb', bg: '#eff6ff', icon: <Users size={16} color="#2563eb" /> },
    { label: 'New Users',      val: Math.floor(2842 * m),                 sub: 'This Period', pct: 12.4, up: true,  color: '#22c55e', bg: '#f0fdf4', icon: <UserPlus size={16} color="#22c55e" /> },
    { label: 'Active Users',   val: Math.floor(48215 * m),                sub: 'This Period', pct: 8.7,  up: true,  color: '#8b5cf6', bg: '#faf5ff', icon: <UserCheck size={16} color="#8b5cf6" /> },
    { label: 'Inactive Users', val: Math.floor(1204 * m),                 sub: 'This Period', pct: 2.1,  up: false, color: '#f97316', bg: '#fff7ed', icon: <UserMinus size={16} color="#f97316" /> },
    { label: 'Logged In',      val: Math.floor(32756 * m),                sub: 'This Period', pct: 9.6,  up: true,  color: '#2563eb', bg: '#eff6ff', icon: <LogIn size={16} color="#2563eb" /> },
    { label: 'Logged Out',     val: Math.floor(65886 * m),                sub: 'This Period', pct: 10.3, up: true,  color: '#8b5cf6', bg: '#faf5ff', icon: <LogOut size={16} color="#8b5cf6" /> },
    { label: 'Blocked Users',  val: Math.floor(156 * m),                  sub: 'This Period', pct: 5.4,  up: false, color: '#ef4444', bg: '#fff1f2', icon: <ShieldX size={16} color="#ef4444" /> },
  ], [m, appliedTrigger]);

  // ── Filtered + sorted users ───────────────────────────────────────────────
  const filteredUsers = useMemo(() => {
    const q = normalize(userSearch);
    const mob = normalize(mobileFilter);
    const em = normalize(emailFilter);
    const city = cityFilter !== 'All Cities' ? normalize(cityFilter) : '';
    const state = stateFilter !== 'All States' ? normalize(stateFilter) : '';
    const district = districtFilter !== 'All Districts' ? normalize(districtFilter) : '';
    const loc = locationType !== 'All' ? normalize(locationType) : '';

    let list = users.filter(u => {
      const matchQ   = !q || normalize(u.name).includes(q) || normalize(u.email).includes(q) || normalize(u.mobile).includes(q) || normalize(u.id).includes(q);
      const matchM   = !mob || normalize(u.mobile).includes(mob);
      const matchE   = !em  || normalize(u.email).includes(em);
      const matchC   = !city || normalize(u.city).includes(city);
      const matchSt  = !state || normalize(u.state).includes(state);
      const matchDist= !district || normalize(u.district).includes(district);
      const matchLoc = !loc || normalize(u.locationType).includes(loc);
      return matchQ && matchM && matchE && matchC && matchSt && matchDist && matchLoc;
    });

    list = [...list].sort((a, b) => {
      const av = a[userSort.key] ?? ''; const bv = b[userSort.key] ?? '';
      const cmp = typeof av === 'number' ? av - bv : String(av).localeCompare(String(bv));
      return userSort.dir === 'asc' ? cmp : -cmp;
    });
    return list;
  }, [users, userSearch, mobileFilter, emailFilter, cityFilter, stateFilter, districtFilter, locationType, userSort]);

  const userPag = usePagination(filteredUsers, ROWS_PER_PAGE);

  const onUserSort = (key) => {
    setUserSort(s => ({ key, dir: s.key === key && s.dir === 'asc' ? 'desc' : 'asc' }));
    userPag.setPage(1);
  };

  // ── Filtered + sorted attempts ─────────────────────────────────────────────
  const filteredAttempts = useMemo(() => {
    const q = normalize(attemptSearch);
    let list = loginAttemptsMockData.filter(a =>
      !q || normalize(a.userName).includes(q) || normalize(a.mobileNumber).includes(q) || normalize(a.ipAddress).includes(q) || normalize(a.attemptStatus).includes(q)
    );
    list = [...list].sort((a, b) => {
      const av = a[attemptSort.key] ?? ''; const bv = b[attemptSort.key] ?? '';
      const cmp = typeof av === 'number' ? av - bv : String(av).localeCompare(String(bv));
      return attemptSort.dir === 'asc' ? cmp : -cmp;
    });
    return list;
  }, [attemptSearch, attemptSort]);

  const attemptPag = usePagination(filteredAttempts, ATTEMPT_ROWS_PER_PAGE);
  const onAttemptSort = (key) => { setAttemptSort(s => ({ key, dir: s.key === key && s.dir === 'asc' ? 'desc' : 'asc' })); attemptPag.setPage(1); };

  // ── Filtered + sorted logs ─────────────────────────────────────────────────
  const filteredLogs = useMemo(() => {
    const q = normalize(logSearch);
    let list = activityLogsMockData.filter(l => {
      const matchQ  = !q || normalize(l.userName).includes(q) || normalize(l.mobileNumber).includes(q) || normalize(l.activityType).includes(q);
      const matchUN = !logFilters.userName || normalize(l.userName).includes(normalize(logFilters.userName));
      const matchM  = !logFilters.mobile   || normalize(l.mobileNumber).includes(normalize(logFilters.mobile));
      const matchE  = !logFilters.email    || normalize(l.emailId).includes(normalize(logFilters.email));
      const matchAT = !logFilters.activityType || l.activityType === logFilters.activityType;
      const matchMod = !logFilters.module  || l.moduleName === logFilters.module;
      const matchSt = !logFilters.status   || l.status === logFilters.status;
      return matchQ && matchUN && matchM && matchE && matchAT && matchMod && matchSt;
    });
    list = [...list].sort((a, b) => {
      const av = a[logSort.key] ?? ''; const bv = b[logSort.key] ?? '';
      const cmp = typeof av === 'number' ? av - bv : String(av).localeCompare(String(bv));
      return logSort.dir === 'asc' ? cmp : -cmp;
    });
    return list;
  }, [logSearch, logFilters, logSort]);

  const logPag = usePagination(filteredLogs, LOG_ROWS_PER_PAGE);
  const onLogSort = (key) => { setLogSort(s => ({ key, dir: s.key === key && s.dir === 'asc' ? 'desc' : 'asc' })); logPag.setPage(1); };

  // ── Save edit ────────────────────────────────────────────────────────────────
  const saveUser = (updated) => {
    setUsers(cur => cur.map(u => u.id === updated.id ? updated : u));
    setEditUser(null);
    addToast(`${updated.name} updated successfully.`, 'success');
  };

  // ─── RENDER ─────────────────────────────────────────────────────────────────
  return (
    <AdminShell activeTab="User Management" searchPlaceholder="Search user directory...">
      <div style={{ paddingBottom: '48px' }}>

        {/* ── FILTER BAR (Matching Screenshot 1) ── */}
        <div style={{
          background: '#fff', borderRadius: 10, padding: '14px 16px',
          boxShadow: '0 1px 3px rgba(0,0,0,0.06)', marginBottom: 16,
          display: 'flex', alignItems: 'flex-end', flexWrap: 'wrap', gap: 12,
          border: '1px solid #e8edf2',
        }}>
          {/* State */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            <label style={{ fontSize: 10, fontWeight: 600, color: '#94a3b8', letterSpacing: 0.3 }}>State</label>
            <div style={{ position: 'relative' }}>
              <select value={stateFilter} onChange={e => setStateFilter(e.target.value)} style={{
                appearance: 'none', background: '#fff', border: '1px solid #dde3ea',
                borderRadius: 6, padding: '6px 28px 6px 10px', fontSize: 12,
                fontWeight: 500, color: '#334155', cursor: 'pointer', outline: 'none', minWidth: 120,
              }}>
                {['All States','Maharashtra','Telangana','Haryana','Tamil Nadu','Kerala','Gujarat','Karnataka','Delhi','Rajasthan'].map(o => <option key={o}>{o}</option>)}
              </select>
              <ChevronDown size={11} style={{ position: 'absolute', right: 8, top: '50%', transform: 'translateY(-50%)', color: '#94a3b8', pointerEvents: 'none' }} />
            </div>
          </div>

          {/* City */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            <label style={{ fontSize: 10, fontWeight: 600, color: '#94a3b8', letterSpacing: 0.3 }}>City</label>
            <div style={{ position: 'relative' }}>
              <select value={cityFilter} onChange={e => setCityFilter(e.target.value)} style={{
                appearance: 'none', background: '#fff', border: '1px solid #dde3ea',
                borderRadius: 6, padding: '6px 28px 6px 10px', fontSize: 12,
                fontWeight: 500, color: '#334155', cursor: 'pointer', outline: 'none', minWidth: 120,
              }}>
                {['All Cities','Mumbai','Delhi','Bangalore','Hyderabad','Pune','Chennai','Kochi','Jaipur','Ahmedabad','Gurugram','Bengaluru'].map(o => <option key={o}>{o}</option>)}
              </select>
              <ChevronDown size={11} style={{ position: 'absolute', right: 8, top: '50%', transform: 'translateY(-50%)', color: '#94a3b8', pointerEvents: 'none' }} />
            </div>
          </div>

          {/* District */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            <label style={{ fontSize: 10, fontWeight: 600, color: '#94a3b8', letterSpacing: 0.3 }}>District</label>
            <div style={{ position: 'relative' }}>
              <select value={districtFilter} onChange={e => setDistrictFilter(e.target.value)} style={{
                appearance: 'none', background: '#fff', border: '1px solid #dde3ea',
                borderRadius: 6, padding: '6px 28px 6px 10px', fontSize: 12,
                fontWeight: 500, color: '#334155', cursor: 'pointer', outline: 'none', minWidth: 120,
              }}>
                {['All Districts','North','South','East','West','Andheri','Koramangala','Jubilee Hills','Sector 57','Besant Nagar','Baner','Ernakulam','Prahlad Nagar','Indiranagar'].map(o => <option key={o}>{o}</option>)}
              </select>
              <ChevronDown size={11} style={{ position: 'absolute', right: 8, top: '50%', transform: 'translateY(-50%)', color: '#94a3b8', pointerEvents: 'none' }} />
            </div>
          </div>

          {/* Location Type */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            <label style={{ fontSize: 10, fontWeight: 600, color: '#94a3b8', letterSpacing: 0.3 }}>Location Type</label>
            <div style={{ position: 'relative' }}>
              <select value={locationType} onChange={e => setLocationType(e.target.value)} style={{
                appearance: 'none', background: '#fff', border: '1px solid #dde3ea',
                borderRadius: 6, padding: '6px 28px 6px 10px', fontSize: 12,
                fontWeight: 500, color: '#334155', cursor: 'pointer', outline: 'none', minWidth: 100,
              }}>
                {['All', 'Urban', 'Semi-Urban', 'Rural'].map(o => <option key={o}>{o}</option>)}
              </select>
              <ChevronDown size={11} style={{ position: 'absolute', right: 8, top: '50%', transform: 'translateY(-50%)', color: '#94a3b8', pointerEvents: 'none' }} />
            </div>
          </div>

          {/* Mobile Filter */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            <label style={{ fontSize: 10, fontWeight: 600, color: '#94a3b8', letterSpacing: 0.3 }}>Mobile Number</label>
            <input type="text" placeholder="Mobile Number" value={mobileFilter} onChange={e => setMobileFilter(e.target.value)} style={{
              background: '#fff', border: '1px solid #dde3ea', borderRadius: 6,
              padding: '6px 10px', fontSize: 12, fontWeight: 500, color: '#334155', outline: 'none', minWidth: 130
            }} />
          </div>

          {/* Email Filter */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            <label style={{ fontSize: 10, fontWeight: 600, color: '#94a3b8', letterSpacing: 0.3 }}>Email ID</label>
            <input type="text" placeholder="Email ID" value={emailFilter} onChange={e => setEmailFilter(e.target.value)} style={{
              background: '#fff', border: '1px solid #dde3ea', borderRadius: 6,
              padding: '6px 10px', fontSize: 12, fontWeight: 500, color: '#334155', outline: 'none', minWidth: 140
            }} />
          </div>

          {/* Divider */}
          <div style={{ width: 1, height: 34, background: '#e8edf2', alignSelf: 'flex-end', margin: '0 4px' }} />

          {/* Timeframe Pills */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            <label style={{ fontSize: 10, fontWeight: 600, color: 'transparent', letterSpacing: 0.3 }}>_</label>
            <div style={{ display: 'flex', border: '1px solid #dde3ea', borderRadius: 6, overflow: 'hidden' }}>
              {['Daily','Weekly','Monthly','Yearly'].map((p, i) => (
                <button key={p} onClick={() => setPeriod(p)} style={{
                  padding: '6px 14px', border: 'none',
                  borderLeft: i > 0 ? '1px solid #dde3ea' : 'none',
                  fontSize: 12, fontWeight: 600, cursor: 'pointer', transition: 'all 0.15s',
                  background: period === p ? '#0f172a' : '#fff',
                  color: period === p ? '#fff' : '#64748b',
                }}>{p}</button>
              ))}
            </div>
          </div>

          {/* Month + Year selectors */}
          {period === 'Monthly' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              <label style={{ fontSize: 10, fontWeight: 600, color: 'transparent', letterSpacing: 0.3 }}>_</label>
              <div style={{ position: 'relative' }}>
                <select value={selectedMonth} onChange={e => setSelectedMonth(e.target.value)} style={{
                  appearance: 'none', background: '#fff', border: '1px solid #dde3ea',
                  borderRadius: 6, padding: '6px 28px 6px 10px', fontSize: 12,
                  fontWeight: 500, color: '#334155', cursor: 'pointer', outline: 'none', minWidth: 72,
                }}>
                  {monthsList.map(o => <option key={o}>{o}</option>)}
                </select>
                <ChevronDown size={11} style={{ position: 'absolute', right: 8, top: '50%', transform: 'translateY(-50%)', color: '#94a3b8', pointerEvents: 'none' }} />
              </div>
            </div>
          )}

          {period === 'Yearly' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              <label style={{ fontSize: 10, fontWeight: 600, color: 'transparent', letterSpacing: 0.3 }}>_</label>
              <div style={{ position: 'relative' }}>
                <select value={selectedYear} onChange={e => setSelectedYear(e.target.value)} style={{
                  appearance: 'none', background: '#fff', border: '1px solid #dde3ea',
                  borderRadius: 6, padding: '6px 28px 6px 10px', fontSize: 12,
                  fontWeight: 500, color: '#334155', cursor: 'pointer', outline: 'none', minWidth: 72,
                }}>
                  {yearsList.map(o => <option key={o}>{o}</option>)}
                </select>
                <ChevronDown size={11} style={{ position: 'absolute', right: 8, top: '50%', transform: 'translateY(-50%)', color: '#94a3b8', pointerEvents: 'none' }} />
              </div>
            </div>
          )}

          {/* Apply / Reset Buttons */}
          <div style={{ display: 'flex', gap: 8, alignSelf: 'flex-end', marginLeft: 'auto' }}>
            <button onClick={handleApplyFilters} style={{
              padding: '7px 20px', borderRadius: 6, border: 'none',
              background: '#0f172a', color: '#fff', fontSize: 12, fontWeight: 600,
              cursor: 'pointer', transition: 'opacity 0.15s',
            }}
              onMouseEnter={e => e.currentTarget.style.opacity = '0.85'}
              onMouseLeave={e => e.currentTarget.style.opacity = '1'}
            >Apply</button>
            <button onClick={handleResetFilters} style={{
              padding: '7px 16px', borderRadius: 6, border: '1px solid #dde3ea',
              background: '#fff', color: '#334155', fontSize: 12, fontWeight: 600,
              cursor: 'pointer', transition: 'background 0.15s',
            }}
              onMouseEnter={e => e.currentTarget.style.background = '#f8fafc'}
              onMouseLeave={e => e.currentTarget.style.background = '#fff'}
            >Reset</button>
          </div>
        </div>

        {/* ── 7 KPI CARDS (Matching Screenshot 1) ── */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))',
          gap: 12, marginBottom: 20,
        }}>
          {dynKpis.map((k, i) => (
            <div key={i} style={{
              background: '#fff', borderRadius: 10, padding: '14px 14px 12px',
              boxShadow: '0 1px 3px rgba(0,0,0,0.06)', border: '1px solid #e8edf2',
              transition: 'transform 0.18s, box-shadow 0.18s', cursor: 'default',
            }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 6px 20px rgba(37,99,235,0.1)'; }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.06)'; }}
            >
              {/* Icon + Label row */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
                <div style={{ background: k.bg, borderRadius: 8, padding: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  {k.icon}
                </div>
                <span style={{ fontSize: 10, fontWeight: 600, color: '#64748b', lineHeight: 1.3 }}>{k.label}</span>
              </div>
              {/* Value */}
              <div style={{ fontSize: 22, fontWeight: 800, color: '#0f172a', lineHeight: 1, marginBottom: 4 }}>
                {fmtNum(k.val)}
              </div>
              {/* Sub + Trend */}
              <div style={{ fontSize: 10, color: '#94a3b8', marginBottom: 4 }}>{k.sub}</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                {k.up
                  ? <TrendingUp size={10} color="#16a34a" />
                  : <TrendingDown size={10} color="#dc2626" />
                }
                <span style={{ fontSize: 10, fontWeight: 700, color: k.up ? '#16a34a' : '#dc2626' }}>
                  {k.up ? '+' : '-'}{k.pct}%
                </span>
              </div>
              <div style={{ fontSize: 9, color: '#cbd5e1', marginTop: 3 }}>vs Apr 2026</div>
            </div>
          ))}
        </div>

        {/* ── USER DIRECTORY TABLE ──────────────────────────────────────────────── */}
        <div className="materio-table-wrapper" style={{ marginBottom: '28px' }}>
          {/* Table Header */}
          <div className="materio-table-header">
            <h2 style={{ margin: 0, fontSize: '16px', fontWeight: 700 }}>User Directory</h2>
            <div style={{ display: 'flex', gap: '10px', alignItems: 'center', flexWrap: 'wrap' }}>
              <div style={{ position: 'relative' }}>
                <Search size={14} style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: 'var(--materio-text-muted)', pointerEvents: 'none' }} />
                <input type="text" placeholder="Search users…" value={userSearch} onChange={e => { setUserSearch(e.target.value); userPag.setPage(1); }}
                  style={{ padding: '7px 12px 7px 32px', border: '1px solid var(--materio-border)', borderRadius: '6px', fontSize: '13px', outline: 'none', width: '220px', fontFamily: 'inherit' }} />
              </div>
              <button onClick={() => setIsExportOpen(true)} className="btn-materio btn-materio-primary" style={{ padding: '7px 14px', fontSize: '13px' }}>
                <Download size={14} /> Export
              </button>
            </div>
          </div>

          {/* Scrollable Table */}
          <div style={{ overflowX: 'auto', maxHeight: '520px', overflowY: 'auto' }}>
            <table className="materio-table" style={{ minWidth: '1400px' }}>
              <thead>
                <tr>
                  <TH col="id" label="ID" sortConfig={userSort} onSort={onUserSort} style={{ minWidth: '90px' }} />
                  <TH col="name" label="User Name" sortConfig={userSort} onSort={onUserSort} style={{ minWidth: '160px' }} />
                  <TH col="mobile" label="Phone" sortConfig={userSort} onSort={onUserSort} style={{ minWidth: '140px' }} />
                  <TH col="email" label="Email ID" sortConfig={userSort} onSort={onUserSort} style={{ minWidth: '180px' }} />
                  <TH col="gender" label="Gender" sortConfig={userSort} onSort={onUserSort} style={{ minWidth: '90px' }} />
                  <TH col="dateOfBirth" label="Date of Birth" sortConfig={userSort} onSort={onUserSort} style={{ minWidth: '110px' }} />
                  <TH col="averageRating" label="Avg Rating" sortConfig={userSort} onSort={onUserSort} style={{ minWidth: '100px' }} />
                  <TH col="whatsappStatus" label="WhatsApp" sortConfig={userSort} onSort={onUserSort} style={{ minWidth: '100px' }} />
                  <TH col="accountStatus" label="Account Status" sortConfig={userSort} onSort={onUserSort} style={{ minWidth: '120px' }} />
                  <TH col="loginStatus" label="Login Status" sortConfig={userSort} onSort={onUserSort} style={{ minWidth: '110px' }} />
                  <TH col="memberSince" label="Member Since" sortConfig={userSort} onSort={onUserSort} style={{ minWidth: '110px' }} />
                  <TH col="favoriteAddressCount" label="Fav Addr." sortConfig={userSort} onSort={onUserSort} style={{ minWidth: '90px' }} />
                  <TH col="emergencyContactsCount" label="Emrg. Contacts" sortConfig={userSort} onSort={onUserSort} style={{ minWidth: '120px' }} />
                  <TH col="preferredLanguage" label="Pref. Language" sortConfig={userSort} onSort={onUserSort} style={{ minWidth: '120px' }} />
                  <TH col="notificationLanguage" label="Notif. Language" sortConfig={userSort} onSort={onUserSort} style={{ minWidth: '120px' }} />
                  <TH col="locationType" label="Location Type" sortConfig={userSort} onSort={onUserSort} style={{ minWidth: '110px' }} />
                  <TH col="city" label="City" sortConfig={userSort} onSort={onUserSort} style={{ minWidth: '100px' }} />
                  <TH col="district" label="District" sortConfig={userSort} onSort={onUserSort} style={{ minWidth: '110px' }} />
                  <TH col="state" label="State" sortConfig={userSort} onSort={onUserSort} style={{ minWidth: '120px' }} />
                  <th style={{ minWidth: '110px', textAlign: 'center !important' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {userPag.slice.length === 0 ? (
                  <tr><td colSpan={20} style={{ textAlign: 'center', padding: '40px', color: 'var(--materio-text-muted)', fontSize: '14px' }}>No users found matching the current filters.</td></tr>
                ) : userPag.slice.map(user => (
                  <tr key={user.id}>
                    <td><span style={{ fontWeight: 700, color: 'var(--materio-primary)', fontSize: '12px' }}>{user.id}</span></td>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <img src={user.avatar} alt={user.name} style={{ width: '34px', height: '34px', borderRadius: '50%', objectFit: 'cover', flexShrink: 0 }} onError={e => { e.target.style.display = 'none'; }} />
                        <span style={{ fontWeight: 600, fontSize: '13px', whiteSpace: 'nowrap' }}>{user.name}</span>
                      </div>
                    </td>
                    <td style={{ fontSize: '13px', whiteSpace: 'nowrap' }}>{user.mobile}</td>
                    <td style={{ fontSize: '12px', color: 'var(--materio-text-muted)', whiteSpace: 'nowrap' }}>{user.email}</td>
                    <td style={{ fontSize: '13px' }}>{user.gender}</td>
                    <td style={{ fontSize: '13px', whiteSpace: 'nowrap' }}>{user.dateOfBirth}</td>
                    <td>
                      <span style={{ display: 'inline-flex', alignItems: 'center', gap: '3px', fontWeight: 600, fontSize: '13px' }}>
                        ★ {user.averageRating}
                      </span>
                    </td>
                    <td><Badge value={user.whatsappStatus} variant={getStatusVariant(user.whatsappStatus)} /></td>
                    <td><Badge value={user.accountStatus} variant={getStatusVariant(user.accountStatus)} /></td>
                    <td><Badge value={user.loginStatus} variant={getStatusVariant(user.loginStatus)} /></td>
                    <td style={{ fontSize: '13px', whiteSpace: 'nowrap' }}>{user.memberSince}</td>
                    <td style={{ fontSize: '13px', textAlign: 'center' }}>{user.favoriteAddressCount}</td>
                    <td style={{ fontSize: '13px', textAlign: 'center' }}>{user.emergencyContactsCount}</td>
                    <td style={{ fontSize: '13px' }}>{user.preferredLanguage}</td>
                    <td style={{ fontSize: '13px' }}>{user.notificationLanguage}</td>
                    <td style={{ fontSize: '13px' }}>{user.locationType}</td>
                    <td style={{ fontSize: '13px' }}>{user.city}</td>
                    <td style={{ fontSize: '13px' }}>{user.district}</td>
                    <td style={{ fontSize: '13px' }}>{user.state}</td>
                    <td>
                      <div style={{ display: 'flex', gap: '6px', justifyContent: 'center' }}>
                        <button title="View" onClick={() => setViewUser(user)} style={{ background: 'rgba(3,195,236,0.1)', border: 'none', color: '#03C3EC', padding: '6px 10px', borderRadius: '6px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px', fontSize: '12px', fontWeight: 600, transition: 'all 0.2s' }} onMouseEnter={e => e.currentTarget.style.background = 'rgba(3,195,236,0.2)'} onMouseLeave={e => e.currentTarget.style.background = 'rgba(3,195,236,0.1)'}>
                          <Eye size={13} /> View
                        </button>
                        <button title="Edit" onClick={() => setEditUser(user)} style={{ background: 'rgba(105,108,255,0.1)', border: 'none', color: 'var(--materio-primary)', padding: '6px 10px', borderRadius: '6px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px', fontSize: '12px', fontWeight: 600, transition: 'all 0.2s' }} onMouseEnter={e => e.currentTarget.style.background = 'rgba(105,108,255,0.2)'} onMouseLeave={e => e.currentTarget.style.background = 'rgba(105,108,255,0.1)'}>
                          <Edit3 size={13} /> Edit
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <Pagination page={userPag.page} totalPages={userPag.totalPages} setPage={userPag.setPage} total={filteredUsers.length} perPage={ROWS_PER_PAGE} />
        </div>

        {/* ── LOGIN ATTEMPTS TABLE ───────────────────────────────────────────── */}
        <div className="materio-table-wrapper" style={{ marginBottom: '28px' }}>
          <div className="materio-table-header">
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{ background: 'rgba(105,108,255,0.1)', padding: '8px', borderRadius: '8px', color: 'var(--materio-primary)' }}><LogIn size={18} /></div>
              <h2 style={{ margin: 0, fontSize: '16px', fontWeight: 700 }}>Login Attempts</h2>
            </div>
            <div style={{ position: 'relative' }}>
              <Search size={14} style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: 'var(--materio-text-muted)', pointerEvents: 'none' }} />
              <input type="text" placeholder="Search attempts…" value={attemptSearch} onChange={e => { setAttemptSearch(e.target.value); attemptPag.setPage(1); }}
                style={{ padding: '7px 12px 7px 32px', border: '1px solid var(--materio-border)', borderRadius: '6px', fontSize: '13px', outline: 'none', width: '220px', fontFamily: 'inherit' }} />
            </div>
          </div>

          <div style={{ overflowX: 'auto', maxHeight: '420px', overflowY: 'auto' }}>
            <table className="materio-table" style={{ minWidth: '1100px' }}>
              <thead>
                <tr>
                  <TH col="id" label="ID" sortConfig={attemptSort} onSort={onAttemptSort} style={{ minWidth: '90px' }} />
                  <TH col="mobileNumber" label="Mobile Number" sortConfig={attemptSort} onSort={onAttemptSort} style={{ minWidth: '140px' }} />
                  <TH col="ipAddress" label="IP Address" sortConfig={attemptSort} onSort={onAttemptSort} style={{ minWidth: '130px' }} />
                  <TH col="deviceType" label="Device Type" sortConfig={attemptSort} onSort={onAttemptSort} style={{ minWidth: '110px' }} />
                  <TH col="deviceLocation" label="Device Location" sortConfig={attemptSort} onSort={onAttemptSort} style={{ minWidth: '160px' }} />
                  <TH col="attemptStatus" label="Attempt Status" sortConfig={attemptSort} onSort={onAttemptSort} style={{ minWidth: '130px' }} />
                  <TH col="attemptDateTime" label="Attempt Date & Time" sortConfig={attemptSort} onSort={onAttemptSort} style={{ minWidth: '160px' }} />
                  <TH col="activeDevice" label="Active Device" sortConfig={attemptSort} onSort={onAttemptSort} style={{ minWidth: '110px' }} />
                  <TH col="otpAttemptCount" label="OTP Attempts" sortConfig={attemptSort} onSort={onAttemptSort} style={{ minWidth: '110px' }} />
                  <th style={{ minWidth: '80px' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {attemptPag.slice.length === 0 ? (
                  <tr><td colSpan={10} style={{ textAlign: 'center', padding: '40px', color: 'var(--materio-text-muted)' }}>No login attempts found.</td></tr>
                ) : attemptPag.slice.map(a => (
                  <tr key={a.id}>
                    <td><span style={{ fontWeight: 700, color: 'var(--materio-primary)', fontSize: '12px' }}>{a.id}</span></td>
                    <td style={{ fontSize: '13px', whiteSpace: 'nowrap' }}>{a.mobileNumber}</td>
                    <td style={{ fontSize: '12px', fontFamily: 'monospace', color: '#475569' }}>{a.ipAddress}</td>
                    <td>
                      <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', fontSize: '13px' }}>
                        <Monitor size={12} color="#696CFF" />{a.deviceType}
                      </span>
                    </td>
                    <td style={{ fontSize: '13px' }}>{a.deviceLocation}</td>
                    <td><Badge value={a.attemptStatus} variant={getStatusVariant(a.attemptStatus)} /></td>
                    <td style={{ fontSize: '12px', whiteSpace: 'nowrap', color: 'var(--materio-text-muted)' }}>{a.attemptDateTime}</td>
                    <td>
                      {a.activeDevice
                        ? <Badge value="Active" variant="success" />
                        : <Badge value="Inactive" variant="neutral" />}
                    </td>
                    <td style={{ textAlign: 'center' }}>
                      <span style={{ fontSize: '13px', fontWeight: 700, color: a.attemptStatus === 'Failed' ? '#FF3E1D' : a.otpAttemptCount >= 4 ? '#FF3E1D' : a.otpAttemptCount >= 2 ? '#FFAB00' : '#71DD37' }}>
                        {a.attemptStatus === 'Failed' ? 0 : a.otpAttemptCount}
                      </span>
                    </td>
                    <td>
                      <button title="View" onClick={() => setViewAttempt(a)} style={{ background: 'rgba(3,195,236,0.1)', border: 'none', color: '#03C3EC', padding: '6px 10px', borderRadius: '6px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px', fontSize: '12px', fontWeight: 600, transition: 'all 0.2s' }} onMouseEnter={e => e.currentTarget.style.background = 'rgba(3,195,236,0.2)'} onMouseLeave={e => e.currentTarget.style.background = 'rgba(3,195,236,0.1)'}>
                        <Eye size={13} /> View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <Pagination page={attemptPag.page} totalPages={attemptPag.totalPages} setPage={attemptPag.setPage} total={filteredAttempts.length} perPage={ATTEMPT_ROWS_PER_PAGE} />
        </div>

        {/* ── ACTIVITY LOGS TABLE ────────────────────────────────────────────── */}
        <div className="materio-table-wrapper">
          <div className="materio-table-header">
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{ background: 'rgba(113,221,55,0.1)', padding: '8px', borderRadius: '8px', color: '#71DD37' }}><Activity size={18} /></div>
              <h2 style={{ margin: 0, fontSize: '16px', fontWeight: 700 }}>Activity Logs</h2>
            </div>
            <div style={{ position: 'relative' }}>
              <Search size={14} style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: 'var(--materio-text-muted)', pointerEvents: 'none' }} />
              <input type="text" placeholder="Search logs…" value={logSearch} onChange={e => { setLogSearch(e.target.value); logPag.setPage(1); }}
                style={{ padding: '7px 12px 7px 32px', border: '1px solid var(--materio-border)', borderRadius: '6px', fontSize: '13px', outline: 'none', width: '220px', fontFamily: 'inherit' }} />
            </div>
          </div>

          <div style={{ overflowX: 'auto', maxHeight: '520px', overflowY: 'auto' }}>
            <table className="materio-table" style={{ minWidth: '1600px' }}>
              <thead>
                <tr>
                  <TH col="id" label="ID" sortConfig={logSort} onSort={onLogSort} style={{ minWidth: '90px' }} />
                  <TH col="userName" label="User Name" sortConfig={logSort} onSort={onLogSort} style={{ minWidth: '140px' }} />
                  <TH col="mobileNumber" label="Mobile Number" sortConfig={logSort} onSort={onLogSort} style={{ minWidth: '130px' }} />
                  <TH col="emailId" label="Email ID" sortConfig={logSort} onSort={onLogSort} style={{ minWidth: '180px' }} />
                  <TH col="activityType" label="Activity Type" sortConfig={logSort} onSort={onLogSort} style={{ minWidth: '140px' }} />
                  <TH col="moduleName" label="Module Name" sortConfig={logSort} onSort={onLogSort} style={{ minWidth: '150px' }} />
                  <TH col="actionPerformed" label="Action Performed" sortConfig={logSort} onSort={onLogSort} style={{ minWidth: '200px' }} />
                  <TH col="oldValue" label="Old Value" sortConfig={logSort} onSort={onLogSort} style={{ minWidth: '120px' }} />
                  <TH col="newValue" label="New Value" sortConfig={logSort} onSort={onLogSort} style={{ minWidth: '120px' }} />
                  <TH col="ipAddress" label="IP Address" sortConfig={logSort} onSort={onLogSort} style={{ minWidth: '120px' }} />
                  <TH col="deviceType" label="Device Type" sortConfig={logSort} onSort={onLogSort} style={{ minWidth: '110px' }} />
                  <TH col="deviceLocation" label="Device Location" sortConfig={logSort} onSort={onLogSort} style={{ minWidth: '160px' }} />
                  <TH col="browser" label="Browser" sortConfig={logSort} onSort={onLogSort} style={{ minWidth: '120px' }} />
                  <TH col="operatingSystem" label="OS" sortConfig={logSort} onSort={onLogSort} style={{ minWidth: '130px' }} />
                  <TH col="status" label="Status" sortConfig={logSort} onSort={onLogSort} style={{ minWidth: '90px' }} />
                  <TH col="createdBy" label="Created By" sortConfig={logSort} onSort={onLogSort} style={{ minWidth: '160px' }} />
                  <TH col="activityDateTime" label="Activity Date & Time" sortConfig={logSort} onSort={onLogSort} style={{ minWidth: '160px' }} />
                  <th style={{ minWidth: '80px' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {logPag.slice.length === 0 ? (
                  <tr><td colSpan={18} style={{ textAlign: 'center', padding: '40px', color: 'var(--materio-text-muted)' }}>No activity logs found.</td></tr>
                ) : logPag.slice.map(log => (
                  <tr key={log.id}>
                    <td><span style={{ fontWeight: 700, color: 'var(--materio-primary)', fontSize: '12px' }}>{log.id}</span></td>
                    <td style={{ fontSize: '13px', fontWeight: 600 }}>{log.userName}</td>
                    <td style={{ fontSize: '13px', whiteSpace: 'nowrap' }}>{log.mobileNumber}</td>
                    <td style={{ fontSize: '12px', color: 'var(--materio-text-muted)', whiteSpace: 'nowrap' }}>{log.emailId}</td>
                    <td>
                      <Badge value={log.activityType} variant={
                        log.activityType === 'Login' ? 'success' :
                        log.activityType === 'Failed Login' || log.activityType === 'Account Blocked' ? 'danger' :
                        log.activityType === 'Account Suspension' || log.activityType === 'Password Change' ? 'warning' :
                        'primary'
                      } />
                    </td>
                    <td style={{ fontSize: '13px' }}>{log.moduleName}</td>
                    <td style={{ fontSize: '12px', maxWidth: '200px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }} title={log.actionPerformed}>{log.actionPerformed}</td>
                    <td>
                      <span style={{ fontSize: '11px', background: '#FFF5F5', color: '#c62828', padding: '2px 8px', borderRadius: '4px', fontFamily: 'monospace', display: 'inline-block', maxWidth: '100px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }} title={log.oldValue}>{log.oldValue || '—'}</span>
                    </td>
                    <td>
                      <span style={{ fontSize: '11px', background: '#F1FFF0', color: '#2e7d32', padding: '2px 8px', borderRadius: '4px', fontFamily: 'monospace', display: 'inline-block', maxWidth: '100px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }} title={log.newValue}>{log.newValue || '—'}</span>
                    </td>
                    <td style={{ fontSize: '12px', fontFamily: 'monospace', color: '#475569' }}>{log.ipAddress}</td>
                    <td style={{ fontSize: '13px' }}>{log.deviceType}</td>
                    <td style={{ fontSize: '13px' }}>{log.deviceLocation}</td>
                    <td style={{ fontSize: '12px', color: 'var(--materio-text-muted)' }}>{log.browser}</td>
                    <td style={{ fontSize: '12px', color: 'var(--materio-text-muted)' }}>{log.operatingSystem}</td>
                    <td><Badge value={log.status} variant={getStatusVariant(log.status)} /></td>
                    <td style={{ fontSize: '12px' }}>{log.createdBy}</td>
                    <td style={{ fontSize: '12px', whiteSpace: 'nowrap', color: 'var(--materio-text-muted)' }}>{log.activityDateTime}</td>
                    <td>
                      <button title="View" onClick={() => setViewLog(log)} style={{ background: 'rgba(3,195,236,0.1)', border: 'none', color: '#03C3EC', padding: '6px 10px', borderRadius: '6px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px', fontSize: '12px', fontWeight: 600, transition: 'all 0.2s' }} onMouseEnter={e => e.currentTarget.style.background = 'rgba(3,195,236,0.2)'} onMouseLeave={e => e.currentTarget.style.background = 'rgba(3,195,236,0.1)'}>
                        <Eye size={13} /> View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <Pagination page={logPag.page} totalPages={logPag.totalPages} setPage={logPag.setPage} total={filteredLogs.length} perPage={LOG_ROWS_PER_PAGE} />
        </div>
      </div>

      {/* ── MODALS ────────────────────────────────────────────────────────────── */}
      <UserDirectoryViewModal user={viewUser} onClose={() => setViewUser(null)} onEdit={(u) => { setViewUser(null); setEditUser(u); }} />
      <UserEditModal user={editUser} onClose={() => setEditUser(null)} onSave={saveUser} />
      <LoginAttemptViewModal attempt={viewAttempt} onClose={() => setViewAttempt(null)} />
      <ActivityLogViewModal log={viewLog} onClose={() => setViewLog(null)} />
      <ExportReportModal isOpen={isExportOpen} onClose={() => setIsExportOpen(false)} entityName="User Directory" data={filteredUsers} />
    </AdminShell>
  );
}
