const fs = require('fs');

let content = fs.readFileSync('src/pages/GSTManagement/GSTDashboard.jsx', 'utf8');

// 1. Add Imports
content = content.replace(
  `import AdminShell from '../../components/layouts/AdminShell';`,
  `import AdminShell from '../../components/layouts/AdminShell';
import PremiumTable from '../../components/ui/PremiumTable';
import StatusBadge from '../../components/common/StatusBadge';
import Avatar from '../../components/common/Avatar';`
);

// 2. Remove local StatusBadge, PriorityBadge, Avatar, CustomTooltip
content = content.replace(
  /function StatusBadge[\s\S]*?function CustomTooltip/,
  `function CustomTooltip`
);

// 3. Define columns
const hooksTarget = `  const totalGST = gstCollectionTrend.reduce((s, d) => s + d.cgst + d.sgst, 0);`;
const columnsDefinition = `  const totalGST = gstCollectionTrend.reduce((s, d) => s + d.cgst + d.sgst, 0);

  const rateSlabsColumns = [
    { header: 'HSN Code', accessor: 'hsn', render: (row) => <span style={{fontFamily: 'monospace', fontWeight: 600, color: '#4f46e5'}}>{row.hsn}</span> },
    { header: 'Category', accessor: 'category', render: (row) => <span style={{fontWeight: 500}}>{row.category}</span> },
    { header: 'Rate', accessor: 'rate', render: (row) => <span className="premium-chip">{row.rate}</span> },
    { header: 'CGST', accessor: 'cgst' },
    { header: 'SGST', accessor: 'sgst' },
    { header: 'Taxable Value', accessor: 'taxable' },
    { header: 'GST Amount', accessor: 'amount', render: (row) => <span style={{fontWeight: 600}}>{row.amount}</span> }
  ];

  const filingsColumns = [
    { header: 'GSTIN', accessor: 'gstin', render: (row) => <span style={{fontWeight: 600, color: '#4f46e5'}}>{row.gstin.substring(0, 12)}...</span> },
    { header: 'Partner', accessor: 'partner', render: (row) => <span style={{fontWeight: 500}}>{row.partner}</span> },
    { header: 'Type', accessor: 'returnType', render: (row) => <span className="premium-chip premium-chip-indigo">{row.returnType}</span> },
    { header: 'Period', accessor: 'period' },
    { header: 'Date', accessor: 'date' },
    { header: 'Status', accessor: 'status', render: (row) => <StatusBadge status={row.status} /> }
  ];

  const collectionColumns = [
    { header: 'Partner Name', accessor: 'partner', render: (row) => (
      <div className="avatar-cell">
        <Avatar name={row.partner} size={32} />
        <span className="avatar-cell-name">{row.partner}</span>
      </div>
    ) },
    { header: 'Category', accessor: 'category', render: (row) => <span className="premium-chip">{row.category}</span> },
    { header: 'Taxable Value', accessor: 'taxable', render: (row) => <span style={{fontWeight: 600}}>{row.taxable}</span> },
    { header: 'CGST', accessor: 'cgst', render: (row) => <span style={{color: '#4f46e5', fontWeight: 600}}>{row.cgst}</span> },
    { header: 'SGST', accessor: 'sgst', render: (row) => <span style={{color: '#9333ea', fontWeight: 600}}>{row.sgst}</span> },
    { header: 'Total GST', accessor: 'total', render: (row) => <span style={{fontWeight: 600}}>{row.total}</span> }
  ];

  const reconciliationColumns = [
    { header: 'Invoice No.', accessor: 'invoice', render: (row) => <span style={{fontWeight: 600, color: '#4f46e5'}}>{row.invoice}</span> },
    { header: 'Partner', accessor: 'partner', render: (row) => <span style={{fontWeight: 500}}>{row.partner}</span> },
    { header: 'Mismatch Type', accessor: 'mismatch', render: (row) => <span style={{color: '#64748b', fontSize: '12px'}}>{row.mismatch}</span> },
    { header: 'Diff Amount', accessor: 'diffAmount', render: (row) => <span style={{fontWeight: 600}}>{row.diffAmount}</span> },
    { header: 'Priority', accessor: 'priority', render: (row) => <StatusBadge status={row.priority} /> }
  ];

  const renderActions = (row) => (
    <div className="action-btn-group">
      <button className="action-icon-btn" title="View Details"><Eye size={16} /></button>
    </div>
  );
`;
content = content.replace(hooksTarget, columnsDefinition);

// 4. Replace Slabs Table
const rateSlabsRegex = /<div className="gst-dash-card">[\s\S]*?<h3>GST Rate Slabs Overview<\/h3>[\s\S]*?<\/table>\s*<div[\s\S]*?<\/div>\s*<\/div>/;
const newRateSlabsTable = `<PremiumTable 
            title="GST Rate Slabs Overview"
            columns={rateSlabsColumns}
            data={gstRateSlabs}
            searchable={false}
            pageSize={5}
          />`;
content = content.replace(rateSlabsRegex, newRateSlabsTable);

// 5. Replace Filings Table
const filingsRegex = /<div className="gst-dash-card">[\s\S]*?<h3>Recent GST Filings<\/h3>[\s\S]*?<\/table>\s*<div[\s\S]*?<\/div>\s*<\/div>/;
const newFilingsTable = `<PremiumTable 
            title="Recent GST Filings"
            columns={filingsColumns}
            data={recentFilings}
            searchable={true}
            pageSize={5}
            actions={renderActions}
          />`;
content = content.replace(filingsRegex, newFilingsTable);

// 6. Replace Collection Table
const collectionRegex = /<div className="gst-dash-card">[\s\S]*?<h3>Partner-wise GST Collection<\/h3>[\s\S]*?<\/table>\s*<div[\s\S]*?<\/div>\s*<\/div>/;
const newCollectionTable = `<PremiumTable 
            title="Partner-wise GST Collection"
            columns={collectionColumns}
            data={partnerCollection}
            searchable={true}
            pageSize={5}
          />`;
content = content.replace(collectionRegex, newCollectionTable);

// 7. Replace Reconciliation Table
const reconciliationRegex = /<div className="gst-dash-card">[\s\S]*?<h3>GST Reconciliation Issues<\/h3>[\s\S]*?<\/table>\s*<div[\s\S]*?<\/div>\s*<\/div>/;
const newReconciliationTable = `<PremiumTable 
            title="GST Reconciliation Issues"
            columns={reconciliationColumns}
            data={reconciliationIssues}
            searchable={true}
            pageSize={5}
          />`;
content = content.replace(reconciliationRegex, newReconciliationTable);

fs.writeFileSync('src/pages/GSTManagement/GSTDashboard.jsx', content);
console.log('GSTDashboard updated successfully.');
