const fs = require('fs');

let content = fs.readFileSync('src/pages/Dashboard/AdminDashboard.jsx', 'utf8');

// 1. Imports
content = content.replace(
  `import ExportReportModal from '../../components/common/ExportReportModal';`,
  `import ExportReportModal from '../../components/common/ExportReportModal';
import PremiumTable from '../../components/ui/PremiumTable';
import StatusBadge from '../../components/common/StatusBadge';
import Avatar from '../../components/common/Avatar';`
);

// 2. Remove Local Components
content = content.replace(
  /function ActionBadge[\s\S]*?function CustomTooltip/,
  `function CustomTooltip`
);

// 3. Define columns inside AdminDashboard
const hooksTarget = `  const totalAdmins = statusData.reduce((s, d) => s + d.value, 0);`;
const columnsDefinition = `  const totalAdmins = statusData.reduce((s, d) => s + d.value, 0);

  const teamsColumns = [
    { header: 'Team Name', accessor: 'name' },
    { header: 'Team Lead', accessor: 'lead', render: (row) => (
      <div className="avatar-cell">
        <Avatar name={row.lead} size={32} />
        <span className="avatar-cell-name">{row.lead}</span>
      </div>
    ) },
    { header: 'Members', accessor: 'members' },
    { header: 'Active Admins', accessor: 'active' },
    { header: 'Status', accessor: 'status', render: (row) => <StatusBadge status={row.status} /> }
  ];

  const activityColumns = [
    { header: 'Admin Name', accessor: 'name', render: (row) => (
      <div className="avatar-cell">
        <Avatar name={row.name} size={32} />
        <span className="avatar-cell-name">{row.name}</span>
      </div>
    ) },
    { header: 'Team', accessor: 'team' },
    { header: 'Action', accessor: 'action', render: (row) => (
      <span className="premium-chip premium-chip-indigo">{row.action}</span>
    ) },
    { header: 'Module / Section', accessor: 'module' },
    { header: 'IP Address', accessor: 'ip' },
    { header: 'Time', accessor: 'time' }
  ];

  const moduleColumns = [
    { header: 'Module / Section', accessor: 'name', render: (row) => (
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <row.icon size={16} color="var(--materio-primary)" />
        <span style={{ fontWeight: 500 }}>{row.name}</span>
      </div>
    ) },
    { header: 'Total Roles Access', accessor: 'totalRoles' },
    { header: 'Total Admins Access', accessor: 'totalAdmins' },
    { header: 'Active Access', accessor: 'active', render: (row) => (
      <span style={{ color: '#16a34a', fontWeight: 600 }}>{row.active} ({Math.round(row.active/row.totalAdmins*100)}%)</span>
    ) },
    { header: 'Inactive Access', accessor: 'inactive', render: (row) => (
      <span style={{ color: '#94a3b8' }}>{row.inactive} ({Math.round(row.inactive/row.totalAdmins*100)}%)</span>
    ) }
  ];

  const securityColumns = [
    { header: 'Alert Type', accessor: 'type', render: (row) => (
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: row.status==='High'?'#ef4444':row.status==='Medium'?'#f59e0b':'#3b82f6', fontWeight: 500 }}>
        <row.icon size={16} />
        {row.type}
      </div>
    ) },
    { header: 'Description', accessor: 'desc' },
    { header: 'Count', accessor: 'count' },
    { header: 'Status', accessor: 'status', render: (row) => <StatusBadge status={row.status} /> },
    { header: 'Last Occurred', accessor: 'time' }
  ];

  const renderActions = (row) => (
    <div className="action-btn-group">
      <button className="action-icon-btn" title="View Details"><Eye size={16} /></button>
    </div>
  );
`;
content = content.replace(hooksTarget, columnsDefinition);

// 4. Replace Teams Table
const teamsTableRegex = /<div className="admin-dash-card admin-dash-teams">[\s\S]*?<\/div>\s*<\/div>/;
const newTeamsTable = `<PremiumTable 
            title="Teams Overview"
            columns={teamsColumns}
            data={teamsOverview}
            searchable={true}
            pageSize={5}
            actions={renderActions}
          />`;
content = content.replace(teamsTableRegex, newTeamsTable);

// 5. Replace Activity Table
const activityTableRegex = /<div className="admin-dash-card admin-dash-activity">[\s\S]*?<\/div>\s*<\/div>/;
const newActivityTable = `<PremiumTable 
            title="Recent Admin Activity"
            columns={activityColumns}
            data={recentActivity}
            searchable={true}
            pageSize={5}
          />`;
content = content.replace(activityTableRegex, newActivityTable);

// 6. Replace Module Access Table
const moduleTableRegex = /<div className="admin-dash-card admin-dash-modules">[\s\S]*?<\/div>\s*<\/div>/;
const newModuleTable = `<PremiumTable 
            title="Admin Access Summary by Module"
            columns={moduleColumns}
            data={moduleAccess}
            searchable={true}
            pageSize={5}
          />`;
content = content.replace(moduleTableRegex, newModuleTable);

// 7. Replace Security Table
const securityTableRegex = /<div className="admin-dash-card admin-dash-security">[\s\S]*?<\/div>\s*<\/div>/;
const newSecurityTable = `<PremiumTable 
            title="Security Alerts (This Month)"
            columns={securityColumns}
            data={securityAlerts}
            searchable={true}
            pageSize={5}
          />`;
content = content.replace(securityTableRegex, newSecurityTable);

fs.writeFileSync('src/pages/Dashboard/AdminDashboard.jsx', content);
console.log('AdminDashboard updated successfully.');
