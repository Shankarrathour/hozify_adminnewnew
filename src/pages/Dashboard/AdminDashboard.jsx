import React, { useState, useMemo } from 'react';
import { useApp } from '../../hooks/useApp';
import { ROUTES } from '../../config/routes';
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
  Server,
  X
} from 'lucide-react';
import AdminShell from '../../components/layouts/AdminShell';
import { teamsOverview, recentActivity, moduleAccess, securityAlerts } from '../../data/AdminData';
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
  const { navigate } = useApp();
  const [dateRange, setDateRange] = useState('01 May 2026 - 31 May 2026');
  const [viewAllModal, setViewAllModal] = useState(null);
  const [selectedRow, setSelectedRow] = useState(null);
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
                <PieChart width={180} height={180}>
                  <Pie
                    data={dynStatusData}
                    cx={90}
                    cy={90}
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
                <PieChart width={180} height={180}>
                  <Pie
                    data={dynTeamData}
                    cx={90}
                    cy={90}
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
          <div className="admin-dash-card admin-table-card">
            <div className="admin-dash-card-header">
              <h3>Teams Overview</h3>
            </div>
            <div className="admin-table-container">
            <table className="rev-dash-table admin-table" style={{ width: '100%' }}>
              <thead>
                <tr>
                  <th>Team Name</th>
                  <th>Team Lead</th>
                  <th>Members</th>
                  <th>Active Admins</th>
                  <th>Status</th>
                  <th style={{ textAlign: 'right' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {dynTeamsOverview.map((t, i) => (
                  <tr key={i}>
                    <td className="rev-bold-cell">{t.name}</td>
                    <td>
                      <div className="avatar-cell">
                        <Avatar name={t.lead} size={28} />
                        <span className="avatar-cell-name">{t.lead}</span>
                      </div>
                    </td>
                    <td>{t.members}</td>
                    <td>{t.active}</td>
                    <td><StatusBadge status={t.status} /></td>
                    <td style={{ textAlign: 'right' }}>{renderActions(t)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            </div>
            <div className="admin-card-footer-action">
              <button onClick={() => { setViewAllModal('teams'); setSelectedRow(null); }}>View All Teams <ChevronRight size={14} /></button>
            </div>
          </div>

          {/* Recent Activity Table */}
          <div className="admin-dash-card admin-table-card">
            <div className="admin-dash-card-header">
              <h3>Recent Admin Activity</h3>
            </div>
            <div className="admin-table-container">
            <table className="rev-dash-table admin-table" style={{ width: '100%' }}>
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
                        <Avatar name={r.name} size={28} />
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
            <div className="admin-card-footer-action">
              <button onClick={() => { setViewAllModal('activity'); setSelectedRow(null); }}>View All Activity <ChevronRight size={14} /></button>
            </div>
          </div>
        </div>

        {/* ── Module Access + Security Row ── */}
        <div className="admin-dash-bottom-row">

          {/* Module Access Table */}
          <div className="admin-dash-card admin-table-card">
            <div className="admin-dash-card-header">
              <h3>Admin Access Summary by Module</h3>
            </div>
            <div className="admin-table-container">
            <table className="rev-dash-table admin-table" style={{ width: '100%' }}>
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
            <div className="admin-card-footer-action">
              <button onClick={() => { setViewAllModal('modules'); setSelectedRow(null); }}>View All Modules <ChevronRight size={14} /></button>
            </div>
          </div>

          {/* Security Alerts Table */}
          <div className="admin-dash-card admin-table-card">
            <div className="admin-dash-card-header">
              <h3>Security Alerts (This Month)</h3>
            </div>
            <div className="admin-table-container">
            <table className="rev-dash-table admin-table" style={{ width: '100%' }}>
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
            <div className="admin-card-footer-action">
              <button onClick={() => { setViewAllModal('alerts'); setSelectedRow(null); }}>View All Alerts <ChevronRight size={14} /></button>
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
    
      
      {/* ════════════════════ MODAL ════════════════════ */}
      {viewAllModal && (
        <div className="sd-modal-overlay" onClick={() => { setViewAllModal(null); setSelectedRow(null); }} style={{position:'fixed',top:0,left:0,width:'100vw',height:'100vh',background:'rgba(15,23,42,0.6)',backdropFilter:'blur(4px)',zIndex:99999,display:'flex',alignItems:'center',justifyContent:'center',padding:20,animation:'fadeIn 0.2s ease-out'}}>
          <div className="sd-modal-content" onClick={e => e.stopPropagation()} style={{background:'#fff',borderRadius:16,width:'100%',maxWidth: selectedRow ? 600 : 900,maxHeight:'90vh',display:'flex',flexDirection:'column',boxShadow:'0 25px 50px -12px rgba(0,0,0,0.25)',animation:'slideDown 0.3s cubic-bezier(0.16, 1, 0.3, 1)'}}>
            
            <div className="sd-modal-header" style={{padding:'20px 24px',borderBottom:'1px solid #e2e8f0',display:'flex',justifyContent:'space-between',alignItems:'center'}}>
              <div style={{display:'flex',alignItems:'center',gap:12}}>
                {selectedRow && (
                  <button onClick={() => setSelectedRow(null)} style={{background:'#f1f5f9',color:'#475569',border:'none',borderRadius:8,padding:'6px 12px',fontSize:13,fontWeight:600,cursor:'pointer',display:'flex',alignItems:'center',gap:4}}>
                    ← Back
                  </button>
                )}
                <h3 className="sd-modal-title" style={{margin:0,fontSize:18,fontWeight:700,color:'#0f172a'}}>
                  {selectedRow ? 'Record Details' : (
                    viewAllModal === 'teams' ? 'All Teams' :
                    viewAllModal === 'activity' ? 'All Recent Admin Activity' :
                    viewAllModal === 'modules' ? 'All System Modules' :
                    viewAllModal === 'alerts' ? 'All Security Alerts' : 'Details'
                  )}
                </h3>
              </div>
              <button className="sd-modal-close" onClick={() => { setViewAllModal(null); setSelectedRow(null); }} style={{background:'transparent',border:'none',color:'#64748b',cursor:'pointer'}}><X size={18} /></button>
            </div>
            
            <div className="sd-modal-body" style={{padding:24,overflowY:'auto',flex:1}}>
              {selectedRow ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                  {Object.keys(selectedRow).map(k => {
                    if (k === 'icon') return null;
                    return (
                      <div key={k} style={{ display: 'flex', flexDirection: 'column', gap: 6, paddingBottom: 16, borderBottom: '1px dashed #e2e8f0' }}>
                        <span style={{ fontSize: 13, fontWeight: 600, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                          {k.replace(/([A-Z])/g, ' $1').trim()}
                        </span>
                        <span style={{ fontSize: 15, fontWeight: 500, color: '#1e293b' }}>
                          {typeof selectedRow[k] === 'boolean' ? (selectedRow[k] ? 'Yes' : 'No') : selectedRow[k]}
                        </span>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div style={{ overflowY: 'auto', maxHeight: '400px' }}>
                  <table className="sd-rtable" style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                    {(() => {
                      let data = [];
                      if (viewAllModal === 'teams') data = teamsOverview;
                      else if (viewAllModal === 'activity') data = recentActivity;
                      else if (viewAllModal === 'modules') data = moduleAccess;
                      else if (viewAllModal === 'alerts') data = securityAlerts;

                      if (!data.length) return <tbody><tr><td style={{padding: 20, textAlign: 'center'}}>No data available</td></tr></tbody>;

                      const keys = Object.keys(data[0]);
                      return (
                        <>
                          <thead>
                            <tr style={{ background: '#f8fafc', borderBottom: '1px solid #e2e8f0' }}>
                              {keys.map(k => <th key={k} style={{ textTransform: 'capitalize', padding: '12px 16px', color: '#475569', fontSize: 13, fontWeight: 600 }}>{k.replace(/([A-Z])/g, ' $1').trim()}</th>)}
                              <th style={{ padding: '12px 16px', color: '#475569', fontSize: 13, fontWeight: 600, textAlign: 'right' }}>Actions</th>
                            </tr>
                          </thead>
                          <tbody>
                            {data.map((r, i) => (
                              <tr key={i} style={{ borderBottom: '1px solid #f1f5f9', cursor: 'pointer', transition: 'background 0.2s' }}
                                  onMouseEnter={e => e.currentTarget.style.background = '#f8fafc'}
                                  onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                                  onClick={() => setSelectedRow(r)}>
                                {keys.map(k => {
                                  if (k === 'icon') {
                                    const IconComp = r[k];
                                    return (
                                      <td key={k} style={{ padding: '12px 16px' }}>
                                        {IconComp && <IconComp size={16} color="#64748b" />}
                                      </td>
                                    );
                                  }
                                  return (
                                    <td key={k} style={{ padding: '12px 16px', fontSize: 13, color: '#1e293b', fontWeight: typeof r[k] === 'number' ? 700 : 500 }}>
                                      {typeof r[k] === 'boolean' ? (r[k] ? 'Yes' : 'No') : r[k]}
                                    </td>
                                  );
                                })}
                                <td style={{ padding: '12px 16px', textAlign: 'right' }}>
                                  <button 
                                    onClick={(e) => { e.stopPropagation(); setSelectedRow(r); }}
                                    style={{
                                      background: '#e0e7ff', color: '#4f46e5', border: 'none', borderRadius: 6,
                                      padding: '6px 12px', fontSize: 13, fontWeight: 600, cursor: 'pointer',
                                      display: 'inline-flex', alignItems: 'center', gap: 4, transition: 'all 0.2s'
                                    }}
                                  >
                                    <Eye size={14} /> View
                                  </button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </>
                      );
                    })()}
                  </table>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
      <style>{`
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes slideDown { from { opacity: 0; transform: translateY(-20px) scale(0.98); } to { opacity: 1; transform: translateY(0) scale(1); } }
      `}</style>

    </AdminShell>
  );
}
