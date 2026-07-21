const fs = require('fs');

let content = fs.readFileSync('src/pages/Dashboard/RevenueDashboard.jsx', 'utf8');

// 1. Add Imports
content = content.replace(
  `import AdminShell from '../../components/layouts/AdminShell';`,
  `import AdminShell from '../../components/layouts/AdminShell';
import PremiumTable from '../../components/ui/PremiumTable';
import StatusBadge from '../../components/common/StatusBadge';
import Avatar from '../../components/common/Avatar';`
);

// 2. Remove local TxnStatusBadge and Avatar
content = content.replace(
  /function TxnStatusBadge[\s\S]*?function Avatar[\s\S]*?function CustomTooltip/,
  `function CustomTooltip`
);

// 3. Define columns
const hooksTarget = `  const totalSellers = sellerTypeData.reduce((s, d) => s + d.value, 0);`;
const columnsDefinition = `  const totalSellers = sellerTypeData.reduce((s, d) => s + d.value, 0);

  const txnColumns = [
    { header: 'Txn ID', accessor: 'id', render: (row) => <span style={{fontWeight: 600, color: '#4f46e5'}}>{row.id}</span> },
    { header: 'Partner', accessor: 'partner', render: (row) => (
      <div className="avatar-cell">
        <Avatar name={row.partner} size={32} />
        <span className="avatar-cell-name">{row.partner}</span>
      </div>
    ) },
    { header: 'Category', accessor: 'category', render: (row) => <span className="premium-chip">{row.category}</span> },
    { header: 'Gross', accessor: 'gross', render: (row) => <span style={{fontWeight: 600}}>{row.gross}</span> },
    { header: 'Commission', accessor: 'commission', render: (row) => <span style={{fontWeight: 600, color: '#16a34a'}}>{row.commission}</span> },
    { header: 'Status', accessor: 'status', render: (row) => <StatusBadge status={row.status} /> },
    { header: 'Date & Time', accessor: 'date' }
  ];

  const partnerColumns = [
    { header: 'Partner', accessor: 'name', render: (row) => (
      <div className="avatar-cell">
        <Avatar name={row.name} size={32} />
        <span className="avatar-cell-name">{row.name}</span>
      </div>
    ) },
    { header: 'Category', accessor: 'category', render: (row) => <span className="premium-chip">{row.category}</span> },
    { header: 'Revenue', accessor: 'revenue', render: (row) => <span style={{fontWeight: 600}}>{row.revenue}</span> },
    { header: 'Orders', accessor: 'orders' },
    { header: 'Growth', accessor: 'growth', render: (row) => (
      <span style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '12px', fontWeight: 600, color: row.growthUp ? '#16a34a' : '#dc2626' }}>
        {row.growthUp ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
        {row.growth}
      </span>
    ) }
  ];

  const categoryColumns = [
    { header: 'Category', accessor: 'category', render: (row) => <span className="premium-chip premium-chip-indigo">{row.category}</span> },
    { header: 'Total Revenue', accessor: 'totalRevenue', render: (row) => <span style={{fontWeight: 600}}>{row.totalRevenue}</span> },
    { header: 'Commission Earned', accessor: 'commission', render: (row) => <span style={{color: '#16a34a', fontWeight: 600}}>{row.commission}</span> },
    { header: 'Active Partners', accessor: 'partners' },
    { header: 'Total Orders', accessor: 'orders' },
    { header: 'Revenue Share', accessor: 'share', render: (row) => (
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <div style={{ flex: 1, height: '6px', background: '#f1f5f9', borderRadius: '3px', overflow: 'hidden', minWidth: '60px' }}>
          <div style={{ width: row.share, height: '100%', background: '#4f46e5', borderRadius: '3px' }} />
        </div>
        <span style={{ fontSize: '12px', fontWeight: 600, color: '#4f46e5', minWidth: '30px' }}>{row.share}</span>
      </div>
    ) }
  ];

  const renderActions = (row) => (
    <div className="action-btn-group">
      <button className="action-icon-btn" title="View Details"><Eye size={16} /></button>
    </div>
  );
`;
content = content.replace(hooksTarget, columnsDefinition);

// 4. Replace Txn Table
const txnTableRegex = /<div className="rev-dash-card rev-dash-transactions">[\s\S]*?<\/div>\s*<\/div>/;
const newTxnTable = `<PremiumTable 
            title="Recent Transactions"
            columns={txnColumns}
            data={filteredTransactions}
            searchable={true}
            pageSize={5}
            actions={renderActions}
          />`;
content = content.replace(txnTableRegex, newTxnTable);

// 5. Replace Partners Table
const partnerTableRegex = /<div className="rev-dash-card rev-dash-partners">[\s\S]*?<\/div>\s*<\/div>/;
const newPartnerTable = `<PremiumTable 
            title="Top Earning Partners"
            columns={partnerColumns}
            data={topPartners}
            searchable={true}
            pageSize={5}
          />`;
content = content.replace(partnerTableRegex, newPartnerTable);

// 6. Replace Category Breakdown Table
const categoryTableRegex = /<div className="rev-dash-card rev-dash-category">[\s\S]*?<\/div>\s*<\/div>/;
const newCategoryTable = `<PremiumTable 
            title="Revenue by Category (This Month)"
            columns={categoryColumns}
            data={categoryBreakdown}
            searchable={true}
            pageSize={5}
          />`;
content = content.replace(categoryTableRegex, newCategoryTable);

fs.writeFileSync('src/pages/Dashboard/RevenueDashboard.jsx', content);
console.log('RevenueDashboard updated successfully.');
