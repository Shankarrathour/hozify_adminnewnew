const fs = require('fs');

let content = fs.readFileSync('src/pages/PaymentManagement/PaymentDashboard.jsx', 'utf8');

// 1. Add Imports
content = content.replace(
  `import AdminShell from '../../components/layouts/AdminShell';`,
  `import AdminShell from '../../components/layouts/AdminShell';
import PremiumTable from '../../components/ui/PremiumTable';
import StatusBadge from '../../components/common/StatusBadge';
import Avatar from '../../components/common/Avatar';`
);

// 2. Remove local StatusBadge, Avatar, CustomTooltip
content = content.replace(
  /function StatusBadge[\s\S]*?function Avatar[\s\S]*?function CustomTooltip/,
  `function CustomTooltip`
);

// 3. Define columns
const hooksTarget = `  const [activeGatewayTab, setActiveGatewayTab] = useState('All');`;
const columnsDefinition = `  const [activeGatewayTab, setActiveGatewayTab] = useState('All');

  const txnColumns = [
    { header: 'Txn ID', accessor: 'id', render: (row) => <span style={{fontWeight: 600, color: '#4f46e5'}}>{row.id}</span> },
    { header: 'User', accessor: 'user', render: (row) => (
      <div className="avatar-cell">
        <Avatar name={row.user} size={32} />
        <span className="avatar-cell-name">{row.user}</span>
      </div>
    ) },
    { header: 'Amount', accessor: 'amount', render: (row) => <span style={{fontWeight: 600}}>{row.amount}</span> },
    { header: 'Method', accessor: 'method', render: (row) => <span className="premium-chip premium-chip-indigo">{row.method}</span> },
    { header: 'Gateway', accessor: 'gateway' },
    { header: 'Status', accessor: 'status', render: (row) => <StatusBadge status={row.status} /> },
    { header: 'Date & Time', accessor: 'date' }
  ];

  const gatewayColumns = [
    { header: 'Gateway', accessor: 'name', render: (row) => (
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <div style={{ width: 28, height: 28, borderRadius: 6, background: '#f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Zap size={14} color="#4f46e5" />
        </div>
        <span style={{ fontWeight: 600 }}>{row.name}</span>
      </div>
    ) },
    { header: 'Success Rate', accessor: 'successRate', render: (row) => <span style={{fontWeight: 600, color: '#16a34a'}}>{row.successRate}</span> },
    { header: 'Avg Response', accessor: 'avgTime' },
    { header: 'Total Vol', accessor: 'totalVol', render: (row) => <span style={{fontWeight: 600}}>{row.totalVol}</span> },
    { header: 'Status', accessor: 'status', render: (row) => <StatusBadge status={row.status} /> }
  ];

  const refundColumns = [
    { header: 'Refund ID', accessor: 'id', render: (row) => <span style={{fontWeight: 600, color: '#4f46e5'}}>{row.id}</span> },
    { header: 'Orig Txn', accessor: 'origTxn', render: (row) => <span style={{color: '#64748b'}}>{row.origTxn}</span> },
    { header: 'Amount', accessor: 'amount', render: (row) => <span style={{fontWeight: 600}}>{row.amount}</span> },
    { header: 'User', accessor: 'user', render: (row) => <span style={{fontWeight: 500}}>{row.user}</span> },
    { header: 'Reason', accessor: 'reason' },
    { header: 'Status', accessor: 'status', render: (row) => <StatusBadge status={row.status} /> }
  ];

  const cbColumns = [
    { header: 'CB ID', accessor: 'id', render: (row) => <span style={{fontWeight: 600, color: '#4f46e5'}}>{row.id}</span> },
    { header: 'Orig Txn', accessor: 'origTxn', render: (row) => <span style={{color: '#64748b'}}>{row.origTxn}</span> },
    { header: 'Amount', accessor: 'amount', render: (row) => <span style={{fontWeight: 600}}>{row.amount}</span> },
    { header: 'User', accessor: 'user', render: (row) => <span style={{fontWeight: 500}}>{row.user}</span> },
    { header: 'Gateway', accessor: 'gateway' },
    { header: 'Status', accessor: 'status', render: (row) => <StatusBadge status={row.status} /> }
  ];

  const renderActions = (row) => (
    <div className="action-btn-group">
      <button className="action-icon-btn" title="View Details"><Eye size={16} /></button>
    </div>
  );
`;
content = content.replace(hooksTarget, columnsDefinition);

// 4. Replace Txn Table
const txnTableRegex = /<div className="pay-dash-card pay-dash-transactions">[\s\S]*?<\/div>\s*<\/div>/;
const newTxnTable = `<PremiumTable 
            title="Recent Transactions"
            columns={txnColumns}
            data={recentTransactions}
            searchable={true}
            pageSize={5}
            actions={renderActions}
          />`;
content = content.replace(txnTableRegex, newTxnTable);

// 5. Replace Gateway Table
const gatewayTableRegex = /<div className="pay-dash-card pay-dash-gateway-perf">[\s\S]*?<\/div>\s*<\/div>/;
const newGatewayTable = `<PremiumTable 
            title="Gateway Performance"
            columns={gatewayColumns}
            data={gatewayPerformance}
            searchable={false}
            pageSize={5}
          />`;
content = content.replace(gatewayTableRegex, newGatewayTable);

// 6. Replace Refunds Table
const refundsTableRegex = /<div className="pay-dash-card pay-dash-refunds">[\s\S]*?<\/div>\s*<\/div>/;
const newRefundsTable = `<PremiumTable 
            title="Refund Requests"
            columns={refundColumns}
            data={refundRequests}
            searchable={true}
            pageSize={5}
          />`;
content = content.replace(refundsTableRegex, newRefundsTable);

// 7. Replace Chargebacks Table
const chargebacksTableRegex = /<div className="pay-dash-card pay-dash-chargebacks">[\s\S]*?<\/div>\s*<\/div>/;
const newChargebacksTable = `<PremiumTable 
            title="Chargeback Summary"
            columns={cbColumns}
            data={chargebackSummary}
            searchable={true}
            pageSize={5}
          />`;
content = content.replace(chargebacksTableRegex, newChargebacksTable);

fs.writeFileSync('src/pages/PaymentManagement/PaymentDashboard.jsx', content);
console.log('PaymentDashboard updated successfully.');
