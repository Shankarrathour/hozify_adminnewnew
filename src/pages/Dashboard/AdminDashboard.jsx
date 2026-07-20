import React, { useState } from 'react';
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

const loginChartData = [
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

function StatCard({ icon: Icon, iconBg, iconColor, value, label, trend, trendUp, trendLabel }) {
  return (
    <div className="admin-dash-stat-card">
      <div className="admin-dash-stat-icon" style={{ background: iconBg }}>
        <Icon size={22} color={iconColor} />
      </div>
      <div className="admin-dash-stat-body">
        <div className="admin-dash-stat-value">{value}</div>
        <div className="admin-dash-stat-label">{label}</div>
        {trend && (
          <div className={`admin-dash-stat-trend ${trendUp ? 'up' : 'down'}`}>
            {trendUp ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
            <span>{trend}</span>
            <span className="trend-vs">{trendLabel}</span>
          </div>
        )}
      </div>
    </div>
  );
}

function ActionBadge({ type }) {
  const map = {
    view: { label: 'Viewed', cls: 'badge-view' },
    update: { label: 'Updated', cls: 'badge-update' },
    delete: { label: 'Deleted', cls: 'badge-delete' },
    export: { label: 'Exported', cls: 'badge-export' },
    create: { label: 'Created', cls: 'badge-create' },
  };
  const { label, cls } = map[type] || { label: type, cls: '' };
  return <span className={`admin-action-badge ${cls}`}>{label}</span>;
}

function StatusBadge({ status }) {
  const cls = status === 'Active' ? 'admin-status-active' : 'admin-status-inactive';
  return <span className={`admin-status-badge ${cls}`}>{status}</span>;
}

function AlertStatus({ status }) {
  const cls = status === 'High' ? 'alert-high' : status === 'Medium' ? 'alert-medium' : 'alert-low';
  return <span className={`admin-alert-status ${cls}`}>{status}</span>;
}

/* Avatar with initials */
function Avatar({ name }) {
  const initials = name.split(' ').slice(0, 2).map(n => n[0]).join('').toUpperCase();
  return <div className="admin-activity-avatar">{initials}</div>;
}

/* ───────────────────── Custom Tooltip ───────────────────── */
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
  const [dateRange, setDateRange] = useState('01 May 2026 - 31 May 2026');
  const [team, setTeam] = useState('All Teams');
  const [role, setRole] = useState('All Roles');
  const [statusFilter, setStatusFilter] = useState('All Status');
  const [chartFreq, setChartFreq] = useState('Daily');

  const totalAdmins = statusData.reduce((s, d) => s + d.value, 0);

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
            <div className="admin-filter-select">
              <span>{dateRange}</span>
              <ChevronDown size={14} />
            </div>
          </div>
          <div className="admin-filter-group">
            <label>Team</label>
            <div className="admin-filter-select">
              <span>{team}</span>
              <ChevronDown size={14} />
            </div>
          </div>
          <div className="admin-filter-group">
            <label>Role</label>
            <div className="admin-filter-select">
              <span>{role}</span>
              <ChevronDown size={14} />
            </div>
          </div>
          <div className="admin-filter-group">
            <label>Status</label>
            <div className="admin-filter-select">
              <span>{statusFilter}</span>
              <ChevronDown size={14} />
            </div>
          </div>
          <div className="admin-filter-actions">
            <button className="admin-filter-btn-refresh">
              <RefreshCw size={15} /> Refresh
            </button>
            <button className="admin-filter-btn-export">
              <Download size={15} /> Export Report
            </button>
          </div>
        </div>

        {/* ── Stat Cards Row ── */}
        <div className="admin-dash-stats-grid">
          <StatCard
            icon={Users}
            iconBg="#eff6ff" iconColor="#2563eb"
            value="156" label="Total Admins"
            trend="+12.4%" trendUp={true} trendLabel="vs Apr 2026"
          />
          <StatCard
            icon={UserCheck}
            iconBg="#f0fdf4" iconColor="#16a34a"
            value="128" label="Active Admins"
            trend="+9.7%" trendUp={true} trendLabel="vs Apr 2026"
          />
          <StatCard
            icon={Users}
            iconBg="#faf5ff" iconColor="#9333ea"
            value="12" label="Teams"
            trend="+7.1%" trendUp={true} trendLabel="vs Apr 2026"
          />
          <StatCard
            icon={Shield}
            iconBg="#fff7ed" iconColor="#ea580c"
            value="28" label="Roles"
            trend="+3.6%" trendUp={true} trendLabel="vs Apr 2026"
          />
          <StatCard
            icon={LogIn}
            iconBg="#f0f9ff" iconColor="#0284c7"
            value="8,642" label="Total Logins"
            trend="+18.9%" trendUp={true} trendLabel="vs Apr 2026"
          />
          <StatCard
            icon={ShieldAlert}
            iconBg="#fff1f2" iconColor="#e11d48"
            value="23" label="Security Alerts"
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
              <div className="admin-chart-freq">
                {['Daily', 'Weekly', 'Monthly'].map(f => (
                  <button
                    key={f}
                    className={`admin-chart-freq-btn ${chartFreq === f ? 'active' : ''}`}
                    onClick={() => setChartFreq(f)}
                  >
                    {f}
                  </button>
                ))}
              </div>
            </div>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={loginChartData} margin={{ top: 8, right: 10, left: -20, bottom: 0 }}>
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
                <PieChart width={170} height={170}>
                  <Pie
                    data={statusData}
                    cx={80}
                    cy={80}
                    innerRadius={52}
                    outerRadius={78}
                    dataKey="value"
                    startAngle={90}
                    endAngle={-270}
                    stroke="none"
                  >
                    {statusData.map((entry, i) => (
                      <Cell key={i} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
                <div className="admin-donut-center-label">
                  <span className="admin-donut-center-val">{totalAdmins}</span>
                  <span className="admin-donut-center-txt">Total Admins</span>
                </div>
              </div>
              <DonutLegend data={statusData} />
            </div>
          </div>

          {/* Team Donut */}
          <div className="admin-dash-card admin-dash-donut">
            <div className="admin-dash-card-header">
              <h3>Admins by Team</h3>
            </div>
            <div className="admin-donut-content">
              <div className="admin-donut-wrap">
                <PieChart width={170} height={170}>
                  <Pie
                    data={teamData}
                    cx={80}
                    cy={80}
                    innerRadius={52}
                    outerRadius={78}
                    dataKey="value"
                    startAngle={90}
                    endAngle={-270}
                    stroke="none"
                  >
                    {teamData.map((entry, i) => (
                      <Cell key={i} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
                <div className="admin-donut-center-label">
                  <span className="admin-donut-center-val">{totalAdmins}</span>
                  <span className="admin-donut-center-txt">Total Admins</span>
                </div>
              </div>
              <DonutLegend data={teamData} />
            </div>
          </div>
        </div>

        {/* ── Teams + Activity Row ── */}
        <div className="admin-dash-mid-row">

          {/* Teams Overview Table */}
          <div className="admin-dash-card admin-dash-teams">
            <div className="admin-dash-card-header">
              <h3>Teams Overview</h3>
            </div>
            <table className="admin-dash-table">
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
                {teamsOverview.map((t, i) => (
                  <tr key={i}>
                    <td className="team-name-cell">{t.name}</td>
                    <td>{t.lead}</td>
                    <td>{t.members}</td>
                    <td>{t.active}</td>
                    <td><StatusBadge status={t.status} /></td>
                    <td>
                      <button className="admin-table-eye-btn"><Eye size={15} /></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="admin-dash-view-all">
              <button>View All Teams <ChevronRight size={14} /></button>
            </div>
          </div>

          {/* Recent Activity Table */}
          <div className="admin-dash-card admin-dash-activity">
            <div className="admin-dash-card-header">
              <h3>Recent Admin Activity</h3>
            </div>
            <table className="admin-dash-table">
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
                {recentActivity.map((a, i) => (
                  <tr key={i}>
                    <td>
                      <div className="admin-activity-name">
                        <Avatar name={a.name} />
                        <span>{a.name}</span>
                      </div>
                    </td>
                    <td>{a.team}</td>
                    <td><ActionBadge type={a.actionType} /></td>
                    <td>{a.module}</td>
                    <td className="ip-cell">{a.ip}</td>
                    <td className="time-cell">{a.time}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="admin-dash-view-all">
              <button>View All Activity <ChevronRight size={14} /></button>
            </div>
          </div>
        </div>

        {/* ── Module Access + Security Row ── */}
        <div className="admin-dash-bottom-row">

          {/* Module Access Table */}
          <div className="admin-dash-card admin-dash-modules">
            <div className="admin-dash-card-header">
              <h3>Admin Access Summary by Module</h3>
            </div>
            <table className="admin-dash-table">
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
                {moduleAccess.map((m, i) => {
                  const activePercent = Math.round((m.active / m.totalAdmins) * 100);
                  const inactivePercent = Math.round((m.inactive / m.totalAdmins) * 100);
                  return (
                    <tr key={i}>
                      <td>
                        <div className="admin-module-name">
                          <m.icon size={16} className="admin-module-icon" />
                          <span>{m.name}</span>
                        </div>
                      </td>
                      <td>{m.totalRoles}</td>
                      <td>{m.totalAdmins}</td>
                      <td>
                        <span className="admin-module-active">{m.active} <span className="pct">({activePercent}%)</span></span>
                      </td>
                      <td>
                        <span className="admin-module-inactive">{m.inactive} <span className="pct">({inactivePercent}%)</span></span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            <div className="admin-dash-view-all">
              <button>View All Modules <ChevronRight size={14} /></button>
            </div>
          </div>

          {/* Security Alerts Table */}
          <div className="admin-dash-card admin-dash-security">
            <div className="admin-dash-card-header">
              <h3>Security Alerts <span className="admin-dash-card-subtitle">(This Month)</span></h3>
            </div>
            <table className="admin-dash-table">
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
                {securityAlerts.map((a, i) => (
                  <tr key={i}>
                    <td>
                      <div className="admin-alert-type">
                        <a.icon size={15} className={`alert-icon-${a.status.toLowerCase()}`} />
                        <span>{a.type}</span>
                      </div>
                    </td>
                    <td>{a.desc}</td>
                    <td>{a.count}</td>
                    <td><AlertStatus status={a.status} /></td>
                    <td className="time-cell">{a.time}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="admin-dash-view-all">
              <button>View All Alerts <ChevronRight size={14} /></button>
            </div>
          </div>
        </div>
      </div>
    </AdminShell>
  );
}
