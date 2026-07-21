const fs = require('fs');

let content = fs.readFileSync('src/pages/Services/ServiceDashboard.jsx', 'utf8');

// 1. Add Imports
content = content.replace(
  `import AdminShell from '../../components/layouts/AdminShell';`,
  `import AdminShell from '../../components/layouts/AdminShell';
import PremiumTable from '../../components/ui/PremiumTable';
import StatusBadge from '../../components/common/StatusBadge';
import Avatar from '../../components/common/Avatar';`
);

// 2. Remove local SvcStatusBadge, SeverityBadge, CustomTooltip
content = content.replace(
  /function SvcStatusBadge[\s\S]*?function CustomTooltip/,
  `function CustomTooltip`
);

// 3. Define columns
const hooksTarget = `  const totalMix = revenueMixData.reduce((s, d) => s + d.value, 0);`;
const columnsDefinition = `  const totalMix = revenueMixData.reduce((s, d) => s + d.value, 0);

  const topServicesColumns = [
    { header: 'Service', accessor: 'name', render: (row) => <span style={{fontWeight: 600, color: '#1e293b'}}>{row.name}</span> },
    { header: 'Category', accessor: 'category', render: (row) => <span className="premium-chip premium-chip-indigo">{row.category}</span> },
    { header: 'Revenue', accessor: 'revenue', render: (row) => <span style={{fontWeight: 600, color: '#16a34a'}}>{row.revenue}</span> },
    { header: 'Orders', accessor: 'orders' },
    { header: 'Rating', accessor: 'rating', render: (row) => (
      <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', fontSize: '13px', fontWeight: 600, color: '#1e293b' }}>
        <Star size={14} color="#f59e0b" fill="#f59e0b" /> {row.rating}
      </span>
    ) },
    { header: 'Status', accessor: 'status', render: (row) => <StatusBadge status={row.status} /> }
  ];

  const recentOrdersColumns = [
    { header: 'Order ID', accessor: 'id', render: (row) => <span style={{fontWeight: 600, color: '#4f46e5'}}>{row.id}</span> },
    { header: 'Service', accessor: 'service', render: (row) => <span style={{fontWeight: 600, color: '#1e293b'}}>{row.service}</span> },
    { header: 'Amount', accessor: 'amount', render: (row) => <span style={{fontWeight: 600}}>{row.amount}</span> },
    { header: 'Status', accessor: 'status', render: (row) => <StatusBadge status={row.status} /> },
    { header: 'Date', accessor: 'date' }
  ];

  const slaAlertsColumns = [
    { header: 'Alert ID', accessor: 'id', render: (row) => <span style={{fontWeight: 600, color: '#4f46e5'}}>{row.id}</span> },
    { header: 'Service', accessor: 'service', render: (row) => <span style={{fontWeight: 600, color: '#1e293b'}}>{row.service}</span> },
    { header: 'Issue', accessor: 'issue', render: (row) => <span style={{color: '#64748b', fontSize: '13px'}}>{row.issue}</span> },
    { header: 'Severity', accessor: 'severity', render: (row) => <StatusBadge status={row.severity} /> },
    { header: 'Assignee', accessor: 'assignee' },
    { header: 'Date', accessor: 'date' }
  ];

  const renderActions = (row) => (
    <div className="action-btn-group">
      <button className="action-icon-btn" title="View Details"><Eye size={16} /></button>
    </div>
  );
`;
content = content.replace(hooksTarget, columnsDefinition);

// 4. Replace Top Performing Services Table
const topServicesRegex = /<div className="svc-dash-card">[\s\S]*?<h3>Top Performing Services<\/h3>[\s\S]*?<\/table>\s*<\/div>\s*<div className="svc-dash-view-all">[\s\S]*?<\/div>\s*<\/div>/;
const newTopServicesTable = `<PremiumTable 
            title="Top Performing Services"
            columns={topServicesColumns}
            data={topServices}
            searchable={true}
            pageSize={5}
          />`;
content = content.replace(topServicesRegex, newTopServicesTable);

// 5. Replace Recent Orders Table
const recentOrdersRegex = /<div className="svc-dash-card">[\s\S]*?<h3>Recent Orders<\/h3>[\s\S]*?<\/table>\s*<\/div>\s*<div className="svc-dash-view-all">[\s\S]*?<\/div>\s*<\/div>/;
const newRecentOrdersTable = `<PremiumTable 
            title="Recent Orders"
            columns={recentOrdersColumns}
            data={recentOrders}
            searchable={true}
            pageSize={5}
            actions={renderActions}
          />`;
content = content.replace(recentOrdersRegex, newRecentOrdersTable);

// 6. Replace SLA Alerts Table
const slaAlertsRegex = /<div className="svc-dash-card">[\s\S]*?<h3>SLA Alerts[\s\S]*?<\/table>\s*<\/div>\s*<div className="svc-dash-view-all">[\s\S]*?<\/div>\s*<\/div>/;
const newSlaAlertsTable = `<PremiumTable 
            title="SLA Alerts (This Month)"
            columns={slaAlertsColumns}
            data={slaAlerts}
            searchable={true}
            pageSize={5}
          />`;
content = content.replace(slaAlertsRegex, newSlaAlertsTable);

fs.writeFileSync('src/pages/Services/ServiceDashboard.jsx', content);
console.log('ServiceDashboard updated successfully.');
