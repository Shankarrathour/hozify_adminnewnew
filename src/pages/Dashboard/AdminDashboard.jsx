import React, { useState, useMemo } from 'react';
import toast from 'react-hot-toast';
import {
  Users,
  UserCheck,
  ShieldAlert,
  RefreshCw,
  Download,
  ChevronDown,
  Eye,
  TrendingUp,
  TrendingDown,
  LogIn,
  Shield,
  ChevronRight,
  AlertTriangle,
  Lock,
  UserX,
  FileBarChart2,
  Settings2,
  Database,
  BarChart2,
  Server
} from 'lucide-react';
import AdminShell from '../../components/layouts/AdminShell';
import ExportReportModal from '../../components/common/ExportReportModal';
import PremiumTable from '../../components/ui/PremiumTable';
import StatusBadge from '../../components/common/StatusBadge';
import Avatar from '../../components/common/Avatar';
import { useToast } from '../../components/common/ToastNotification';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend
} from 'recharts';

/* ───────────────────── Mock Data ───────────────────── */

const loginChartDataDaily = [
  { date: '01 May', logins: 620 },
  { date: '05 May', logins: 750 },
  { date: '08 May', logins: 500 },
  { date: '11 May', logins: 810 },
  { date: '14 May', logins: 640 },
  { date: '16 May', logins: 900 },
  { date: '18 May', logins: 740 },
  { date: '20 May', logins: 820 },
  { date: '22 May', logins: 680 },
  { date: '24 May', logins: 960 },
  { date: '26 May', logins: 780 },
  { date: '28 May', logins: 850 },
  { date: '31 May', logins: 720 },
];

const loginChartDataWeekly = [
  { date: 'Week 1', logins: 4500 },
  { date: 'Week 2', logins: 5100 },
  { date: 'Week 3', logins: 4800 },
  { date: 'Week 4', logins: 5400 },
];

const loginChartDataMonthly = [
  { date: 'Jan', logins: 18000 },
  { date: 'Feb', logins: 19500 },
  { date: 'Mar', logins: 21000 },
  { date: 'Apr', logins: 20500 },
  { date: 'May', logins: 22000 },
];

const statusData = [
  { name: 'Active', value: 129, color: '#22c55e' },
  { name: 'Inactive', value: 18, color: '#f59e0b' },
  { name: 'Suspended', value: 7, color: '#f97316' },
  { name: 'Locked', value: 3, color: '#ef4444' },
];

const teamData = [
  { name: 'Operations Team', value: 49, color: '#4f46e5' },
  { name: 'Support Team', value: 32, color: '#f59e0b' },
  { name: 'Finance Team', value: 24, color: '#22c55e' },
  { name: 'Analytics Team', value: 20, color: '#a855f7' },
  { name: 'IT Team', value: 18, color: '#06b6d4' },
  { name: 'Others', value: 14, color: '#94a3b8' },
];

const teamsOverview = [
  { name: 'Operations Team', lead: 'Priya Sharma', members: 48, active: 42, status: 'Active' },
  { name: 'Support Team', lead: 'Ramesh Kumar', members: 32, active: 28, status: 'Active' },
  { name: 'Finance Team', lead: 'Anil Verma', members: 24, active: 20, status: 'Active' },
  { name: 'Analytics Team', lead: 'Neha Singh', members: 20, active: 17, status: 'Active' },
  { name: 'IT Team', lead: 'Vikram Patel', members: 18, active: 15, status: 'Active' },
  { name: 'Compliance Team', lead: 'Sanjay Reddy', members: 14, active: 9, status: 'Inactive' },
];

const recentActivity = [
  { name: 'Ramesh Kumar', team: 'Support Team', action: 'Viewed', module: 'User Management', ip: '192.168.1.45', time: '31 May 2026 10:24 AM', actionType: 'view' },
  { name: 'Priya Sharma', team: 'Operations Team', action: 'Updated', module: 'Partner Dashboard', ip: '192.168.1.12', time: '31 May 2026 10:05 AM', actionType: 'update' },
  { name: 'Anil Verma', team: 'Finance Team', action: 'Deleted', module: 'Transaction Logs', ip: '192.168.1.33', time: '31 May 2026 09:30 AM', actionType: 'delete' },
  { name: 'Neha Singh', team: 'Analytics Team', action: 'Exported', module: 'Reports & Analytics', ip: '192.168.1.67', time: '31 May 2026 08:55 AM', actionType: 'export' },
  { name: 'Vikram Patel', team: 'IT Team', action: 'Created', module: 'System Settings', ip: '192.168.1.21', time: '31 May 2026 08:30 AM', actionType: 'create' },
];

const moduleAccess = [
  { name: 'User Management', icon: Users, totalRoles: 15, totalAdmins: 98, active: 90, inactive: 8 },
  { name: 'Partner Management', icon: UserCheck, totalRoles: 14, totalAdmins: 87, active: 78, inactive: 9 },
  { name: 'Bookings Management', icon: FileBarChart2, totalRoles: 12, totalAdmins: 74, active: 66, inactive: 8 },
  { name: 'Finance & Wallet', icon: Database, totalRoles: 10, totalAdmins: 62, active: 56, inactive: 6 },
  { name: 'Reports & Analytics', icon: BarChart2, totalRoles: 12, totalAdmins: 71, active: 64, inactive: 7 },
  { name: 'System Settings', icon: Settings2, totalRoles: 8, totalAdmins: 45, active: 38, inactive: 7 },
];

const securityAlerts = [
  { type: 'Failed Login Attempts', icon: Lock, desc: 'Multiple failed login attempts', count: 12, status: 'High', time: '31 May 2026 10:18 AM' },
  { type: 'Unusual Login Location', icon: AlertTriangle, desc: 'Login from unrecognized location', count: 5, status: 'Medium', time: '31 May 2026 09:32 AM' },
  { type: 'Permission Changes', icon: Shield, desc: 'Critical permission changes', count: 3, status: 'Medium', time: '31 May 2026 08:41 AM' },
  { type: 'Data Export', icon: Download, desc: 'Bulk data export activity', count: 2, status: 'Low', time: '31 May 2026 07:55 AM' },
  { type: 'Account Locked', icon: UserX, desc: 'Admin account locked', count: 1, status: 'High', time: '31 May 2026 07:20 AM' },
];

/* ───────────────────── Sub-components ───────────────────── */

function StatCard({ icon: Icon, iconBg, iconColor, value, label, trend, trendUp, trendLabel, bottomLabel }) {
  return (
    <div className="admin-dash-stat-card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: '16px 20px', gap: '0' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        <div className="admin-dash-stat-icon" style={{ background: iconBg, width: '48px', height: '48px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
          <Icon size={24} color={iconColor} />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
          <div className="admin-dash-stat-label" style={{ fontSize: '13px', color: '#64748b', fontWeight: 600 }}>{label}</div>
          <div className="admin-dash-stat-value" style={{ fontSize: '24px', fontWeight: 800, color: '#0f172a', letterSpacing: '-0.5px' }}>{value}</div>
        </div>
      </div>
      
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '16px' }}>
        <div style={{ fontSize: '12px', color: '#64748b', fontWeight: 600 }}>{bottomLabel}</div>
        {trend && (
          <div className={`admin-dash-stat-trend ${trendUp ? 'up' : 'down'}`} style={{ margin: 0, display: 'flex', alignItems: 'center', gap: '4px', fontSize: '12px', fontWeight: 600, color: trendUp ? '#16a34a' : '#dc2626' }}>
            {trendUp ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
            <span>{trend}</span>
            <span className="trend-vs" style={{ color: '#94a3b8', fontWeight: 500 }}>{trendLabel}</span>
          </div>
        )}
      </div>
    </div>
  );
}

function CustomTooltip({ active, payload, label }) {
  if (active && payload && payload.length) {
    return (
      <div style={{ background: '#1e293b', border: '1px solid #334155', borderRadius: 8, padding: '8px 14px', color: '#f1f5f9', fontSize: 13 }}>
        <p style={{ margin: 0, color: '#94a3b8', marginBottom: 4 }}>{label}</p>
        <p style={{ margin: 0, fontWeight: 600 }}>{payload[0].value} Logins</p>
      </div>
    );
  }
  return null;
}

/* Custom Legend for donut */
function DonutLegend({ data }) {
  return (
    <div className="admin-donut-legend">
      {data.map(d => (
        <div key={d.name} className="admin-donut-legend-item">
          <span className="admin-donut-legend-dot" style={{ background: d.color }} />
          <span className="admin-donut-legend-name">{d.name}</span>
          <span className="admin-donut-legend-val">{d.value}</span>
          <span className="admin-donut-legend-pct">({((d.value / data.reduce((s, x) => s + x.value, 0)) * 100).toFixed(1)}%)</span>
        </div>
      ))}
    </div>
  );
}

/* ───────────────────── Main Component ───────────────────── */

export default function AdminDashboard() {
  const { addToast } = useToast();
  const [dateRange, setDateRange] = useState('01 May 2026 - 31 May 2026');
  const [team, setTeam] = useState('All Teams');
  const [role, setRole] = useState('All Roles');
  const [statusFilter, setStatusFilter] = useState('All Status');
  const [chartFreq, setChartFreq] = useState('Daily');
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);

  const [filterTrigger, setFilterTrigger] = useState(0);

  const m = dateRange === '01 Jun 2026 - 30 Jun 2026' ? 0.8 : dateRange === '01 Jul 2026 - 31 Jul 2026' ? 1.5 : 1;

  const dynStatusData = useMemo(() => statusData.map(d => ({ ...d, value: Math.floor(d.value * m) })), [m, filterTrigger]);
  const dynTeamData = useMemo(() => teamData.map(d => ({ ...d, value: Math.floor(d.value * m) })), [m, filterTrigger]);
  
  const dynTeamsOverview = useMemo(() => teamsOverview.slice(0, Math.max(2, Math.floor(teamsOverview.length * (m >= 1 ? 1 : m * 1.5)))), [m, filterTrigger]);
  const dynRecentActivity = useMemo(() => recentActivity.slice(0, Math.max(2, Math.floor(recentActivity.length * (m >= 1 ? 1 : m * 1.5)))), [m, filterTrigger]);
  const dynModuleAccess = useMemo(() => moduleAccess.map(d => ({ ...d, active: Math.floor(d.active * m), inactive: Math.floor(d.inactive * m) })), [m, filterTrigger]);
  const dynSecurityAlerts = useMemo(() => securityAlerts.slice(0, Math.max(2, Math.floor(securityAlerts.length * (m >= 1 ? 1 : m * 1.5)))), [m, filterTrigger]);

  const totalAdmins = dynStatusData.reduce((s, d) => s + d.value, 0);

  const renderActions = (row) => (
    <div className="action-btn-group">
      <button className="action-icon-btn" title="View Details" onClick={() => toast.success('Viewing Details')}><Eye size={16} /></button>
    </div>
  );

  const handleRefresh = () => {
    setFilterTrigger(prev => prev + 1);
    toast.success('Dashboard data refreshed successfully.');
  };

  const getChartData = () => {
    if (chartFreq === 'Weekly') return loginChartDataWeekly;
    if (chartFreq === 'Monthly') return loginChartDataMonthly;
    return loginChartDataDaily;
  };

  return (
    <AdminShell
      activeTab="Admin Management"
      pageTitle="Admin Dashboard"
      pageSubtitle="Manage Admin Panel Access & Monitoring"
    >
      <div className="admin-dash-root">

        {/* ── Header Filters ── */}
        <div className="admin-dash-filters">
          <div className="admin-filter-group">
            <label>Date Range</label>
            <div style={{ position: 'relative' }}>
              <select 
                className="admin-filter-select" 
                style={{ appearance: 'none', paddingRight: '28px', width: '100%' }}
                value={dateRange}
                onChange={(e) => setDateRange(e.target.value)}
              >
                <option>01 May 2026 - 31 May 2026</option>
                <option>01 Jun 2026 - 30 Jun 2026</option>
                <option>01 Jul 2026 - 31 Jul 2026</option>
              </select>
              <ChevronDown size={14} style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }} />
            </div>
          </div>
          <div className="admin-filter-group">
            <label>Team</label>
            <div style={{ position: 'relative' }}>
              <select 
                className="admin-filter-select" 
                style={{ appearance: 'none', paddingRight: '28px', width: '100%' }}
                value={team}
                onChange={(e) => setTeam(e.target.value)}
              >
                <option>All Teams</option>
                <option>Operations Team</option>
                <option>Support Team</option>
                <option>Finance Team</option>
                <option>Analytics Team</option>
                <option>IT Team</option>
              </select>
              <ChevronDown size={14} style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }} />
            </div>
          </div>
          <div className="admin-filter-group">
            <label>Role</label>
            <div style={{ position: 'relative' }}>
              <select 
                className="admin-filter-select" 
                style={{ appearance: 'none', paddingRight: '28px', width: '100%' }}
                value={role}
                onChange={(e) => setRole(e.target.value)}
              >
                <option>All Roles</option>
                <option>Super Admin</option>
                <option>Manager</option>
                <option>Analyst</option>
                <option>Support Staff</option>
              </select>
              <ChevronDown size={14} style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }} />
            </div>
          </div>
          <div className="admin-filter-group">
            <label>Status</label>
            <div style={{ position: 'relative' }}>
              <select 
                className="admin-filter-select" 
                style={{ appearance: 'none', paddingRight: '28px', width: '100%' }}
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option>All Status</option>
                <option>Active</option>
                <option>Inactive</option>
                <option>Suspended</option>
              </select>
              <ChevronDown size={14} style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }} />
            </div>
          </div>
          <div className="admin-filter-actions">
            <button className="admin-filter-btn-refresh" onClick={handleRefresh}>
              <RefreshCw size={15} /> Refresh
            </button>
            <button className="admin-filter-btn-export" onClick={() => setIsExportModalOpen(true)}>
              <Download size={15} /> Export Report
            </button>
          </div>
        </div>

        {/* ── Stat Cards Row ── */}
        <div className="admin-dash-stats-grid">
          <StatCard
            icon={Users} iconBg="#eff6ff" iconColor="#2563eb"
            value={Math.floor(156 * m)} label="Total Admins"
            trend="+12%" trendUp={true} trendLabel="vs prev" bottomLabel="All Time"
          />
          <StatCard
            icon={UserCheck} iconBg="#f0fdf4" iconColor="#16a34a"
            value={Math.floor(129 * m)} label="Active Admins"
            trend="+5%" trendUp={true} trendLabel="vs prev" bottomLabel="Currently Active"
          />
          <StatCard
            icon={ShieldAlert} iconBg="#fff1f2" iconColor="#e11d48"
            value={Math.floor(21 * m)} label="Security Alerts"
            trend="-3%" trendUp={false} trendLabel="vs prev" bottomLabel="This Month"
          />
          <StatCard
            icon={FileBarChart2} iconBg="#faf5ff" iconColor="#9333ea"
            value={Math.floor(14 * m)} label="Total Roles"
            trend="+2" trendUp={true} trendLabel="new roles" bottomLabel="System wide"
          />
          <StatCard
            icon={LogIn}
            iconBg="#f0f9ff" iconColor="#0284c7"
            value="8,642" label="Total Logins" bottomLabel="This Month"
            trend="+18.9%" trendUp={true} trendLabel="vs Apr 2026"
          />
          <StatCard
            icon={ShieldAlert}
            iconBg="#fff1f2" iconColor="#e11d48"
            value="23" label="Security Alerts" bottomLabel="This Month"
            trend="-17.3%" trendUp={false} trendLabel="vs Apr 2026"
          />
        </div>

        {/* ── Charts Row ── */}
        <div className="admin-dash-charts-row">

          {/* Login Chart */}
          <div className="admin-dash-card admin-dash-login-chart">
            <div className="admin-dash-card-header">
              <div>
                <h3>Admin Logins Over Time</h3>
              </div>
              <div style={{ position: 'relative' }}>
                <select 
                  style={{ appearance: 'none', background: '#fff', border: '1px solid #e2e8f0', borderRadius: '6px', padding: '6px 28px 6px 12px', fontSize: '12px', fontWeight: 600, color: '#334155', cursor: 'pointer', outline: 'none' }}
                  value={chartFreq}
                  onChange={(e) => setChartFreq(e.target.value)}
                >
                  <option value="Daily">Daily</option>
                  <option value="Weekly">Weekly</option>
                  <option value="Monthly">Monthly</option>
                </select>
                <ChevronDown size={14} style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', color: '#64748b' }} />
              </div>
            </div>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={getChartData()} margin={{ top: 8, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
                <XAxis dataKey="date" tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                <Tooltip content={<CustomTooltip />} />
                <Line
                  type="monotone"
                  dataKey="logins"
                  stroke="#4f46e5"
                  strokeWidth={2.5}
                  dot={false}
                  activeDot={{ r: 5, fill: '#4f46e5' }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Status Donut */}
          <div className="admin-dash-card admin-dash-donut">
            <div className="admin-dash-card-header">
              <h3>Admin Status Distribution</h3>
            </div>
            <div className="admin-donut-content">
              <div className="admin-donut-wrap">
                <PieChart width={220} height={220}>
                  <Pie
                    data={dynStatusData}
                    cx={80}
                    cy={80}
                    innerRadius={52}
                    outerRadius={78}
                    dataKey="value"
                    startAngle={90}
                    endAngle={-270}
                    stroke="none"
                  >
                    {dynStatusData.map((entry, i) => (
                      <Cell key={i} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
                <div className="admin-donut-center-label">
                  <span className="admin-donut-center-val">{totalAdmins}</span>
                  <span className="admin-donut-center-txt">Total Admins</span>
                </div>
              </div>
              <DonutLegend data={dynStatusData} />
            </div>
          </div>

          {/* Team Donut */}
          <div className="admin-dash-card admin-dash-donut">
            <div className="admin-dash-card-header">
              <h3>Admins by Team</h3>
            </div>
            <div className="admin-donut-content">
              <div className="admin-donut-wrap">
                <PieChart width={220} height={220}>
                  <Pie
                    data={dynTeamData}
                    cx={80}
                    cy={80}
                    innerRadius={52}
                    outerRadius={78}
                    dataKey="value"
                    startAngle={90}
                    endAngle={-270}
                    stroke="none"
                  >
                    {dynTeamData.map((entry, i) => (
                      <Cell key={i} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
                <div className="admin-donut-center-label">
                  <span className="admin-donut-center-val">{totalAdmins}</span>
                  <span className="admin-donut-center-txt">Total Admins</span>
                </div>
              </div>
              <DonutLegend data={dynTeamData} />
            </div>
          </div>
        </div>

        {/* ── Teams + Activity Row ── */}
        <div className="admin-dash-mid-row">

          {/* Teams Overview Table */}
          <div className="admin-dash-card">
            <div className="admin-dash-card-header">
              <h3>Teams Overview</h3>
            </div>
            <div style={{ overflowX: 'auto', width: '100%' }}>
            <table className="rev-dash-table" style={{ width: '100%', minWidth: '600px' }}>
              <thead>
                <tr>
                  <th>Team Name</th>
                  <th>Team Lead</th>
                  <th>Members</th>
                  <th>Active Admins</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {dynTeamsOverview.map((t, i) => (
                  <tr key={i}>
                    <td className="rev-bold-cell">{t.name}</td>
                    <td>
                      <div className="avatar-cell">
                        <Avatar name={t.lead} size={32} />
                        <span className="avatar-cell-name">{t.lead}</span>
                      </div>
                    </td>
                    <td>{t.members}</td>
                    <td>{t.active}</td>
                    <td><StatusBadge status={t.status} /></td>
                    <td>{renderActions(t)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            </div>
            <div className="rev-dash-view-all" style={{ paddingLeft: '16px', paddingRight: '16px' }}>
              <button onClick={() => toast.success('Navigating to All Teams')}>View All Teams <ChevronRight size={14} /></button>
            </div>
          </div>

          {/* Recent Activity Table */}
          <div className="admin-dash-card">
            <div className="admin-dash-card-header">
              <h3>Recent Admin Activity</h3>
            </div>
            <div style={{ overflowX: 'auto', width: '100%' }}>
            <table className="rev-dash-table" style={{ width: '100%', minWidth: '700px' }}>
              <thead>
                <tr>
                  <th>Admin Name</th>
                  <th>Team</th>
                  <th>Action</th>
                  <th>Module / Section</th>
                  <th>IP Address</th>
                  <th>Time</th>
                </tr>
              </thead>
              <tbody>
                {dynRecentActivity.map((r, i) => (
                  <tr key={i}>
                    <td>
                      <div className="avatar-cell">
                        <Avatar name={r.name} size={32} />
                        <span className="avatar-cell-name">{r.name}</span>
                      </div>
                    </td>
                    <td>{r.team}</td>
                    <td><span className="premium-chip premium-chip-indigo">{r.action}</span></td>
                    <td>{r.module}</td>
                    <td className="rev-mono-cell">{r.ip}</td>
                    <td className="rev-time-cell">{r.time}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            </div>
            <div className="rev-dash-view-all" style={{ paddingLeft: '16px', paddingRight: '16px' }}>
              <button onClick={() => toast.success('Navigating to All Activity')}>View All Activity <ChevronRight size={14} /></button>
            </div>
          </div>
        </div>

        {/* ── Module Access + Security Row ── */}
        <div className="admin-dash-bottom-row">

          {/* Module Access Table */}
          <div className="admin-dash-card">
            <div className="admin-dash-card-header">
              <h3>Admin Access Summary by Module</h3>
            </div>
            <div style={{ overflowX: 'auto', width: '100%' }}>
            <table className="rev-dash-table" style={{ width: '100%', minWidth: '600px' }}>
              <thead>
                <tr>
                  <th>Module / Section</th>
                  <th>Total Roles Access</th>
                  <th>Total Admins Access</th>
                  <th>Active Access</th>
                  <th>Inactive Access</th>
                </tr>
              </thead>
              <tbody>
                {dynModuleAccess.map((m, i) => (
                  <tr key={i}>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <m.icon size={16} color="var(--materio-primary)" />
                        <span style={{ fontWeight: 500 }}>{m.name}</span>
                      </div>
                    </td>
                    <td>{m.totalRoles}</td>
                    <td>{m.totalAdmins}</td>
                    <td>
                      <span style={{ color: '#16a34a', fontWeight: 600 }}>{m.active} ({Math.round(m.active/m.totalAdmins*100)}%)</span>
                    </td>
                    <td>
                      <span style={{ color: '#94a3b8' }}>{m.inactive} ({Math.round(m.inactive/m.totalAdmins*100)}%)</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            </div>
            <div className="rev-dash-view-all" style={{ paddingLeft: '16px', paddingRight: '16px' }}>
              <button onClick={() => toast.success('Navigating to All Modules')}>View All Modules <ChevronRight size={14} /></button>
            </div>
          </div>

          {/* Security Alerts Table */}
          <div className="admin-dash-card">
            <div className="admin-dash-card-header">
              <h3>Security Alerts (This Month)</h3>
            </div>
            <div style={{ overflowX: 'auto', width: '100%' }}>
            <table className="rev-dash-table" style={{ width: '100%', minWidth: '550px' }}>
              <thead>
                <tr>
                  <th>Alert Type</th>
                  <th>Description</th>
                  <th>Count</th>
                  <th>Status</th>
                  <th>Last Occurred</th>
                </tr>
              </thead>
              <tbody>
                {dynSecurityAlerts.map((s, i) => (
                  <tr key={i}>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: s.status==='High'?'#ef4444':s.status==='Medium'?'#f59e0b':'#3b82f6', fontWeight: 500 }}>
                        <s.icon size={16} />
                        {s.type}
                      </div>
                    </td>
                    <td>{s.desc}</td>
                    <td className="rev-bold-cell">{s.count}</td>
                    <td><StatusBadge status={s.status} /></td>
                    <td className="rev-time-cell">{s.time}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            </div>
            <div className="rev-dash-view-all" style={{ paddingLeft: '16px', paddingRight: '16px' }}>
              <button onClick={() => toast.success('Navigating to All Alerts')}>View All Alerts <ChevronRight size={14} /></button>
            </div>
          </div>
        </div>
      </div>

      <ExportReportModal 
        isOpen={isExportModalOpen}
        onClose={() => setIsExportModalOpen(false)}
        entityName="Admin Report"
        data={teamsOverview}
      />
    </AdminShell>
  );
}
