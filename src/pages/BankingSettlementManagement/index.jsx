import React, { useMemo, useState } from 'react';
import {
  AlertTriangle,
  ArrowLeft,
  Calendar,
  CheckCircle2,
  ClipboardCheck,
  Clock,
  Download,
  Edit3,
  Eye,
  FileText,
  Filter,
  Landmark,
  MoreVertical,
  Plus,
  RefreshCcw,
  Search,
  ShieldCheck,
  Upload,
  Users,
  Wallet,
  X,
  XCircle
} from 'lucide-react';
import { ROUTES } from '../../config/routes';
import { useApp } from '../../hooks/useApp';
import AdminShell from '../../components/layouts/AdminShell';
import {
  approvals,
  auditLogs,
  bankAccounts,
  bankPerformance,
  beneficiaries,
  failedSettlements,
  reconciliationIssues,
  reports,
  settlements,
  verificationQueue,
  withdrawals
} from './data';

import Select from "../../components/ui/Select";

const money = (value) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(value);
const mask = (last) => `XXXX XXXX ${last}`;

const meta = {
  [ROUTES.banking]: ['dashboard', 'Banking & Settlements', 'Real-time status of institutional liquidity and settlements.'],
  [ROUTES.bankingDashboard]: ['dashboard', 'Banking & Settlements', 'Real-time status of institutional liquidity and settlements.'],
  [ROUTES.bankAccounts]: ['accounts', 'Bank Accounts', 'Audit and manage the registered bank accounts for all platform participants.'],
  [ROUTES.bankAccountDetails]: ['accountDetails', 'Bank Account Details', 'Review account status, wallet linkage, verification, and audit history.'],
  [ROUTES.bankAccountAdd]: ['addAccount', 'Register Institutional Account', 'Onboard a new high-volume ledger for multi-party settlement operations.'],
  [ROUTES.bankAccountEdit]: ['editAccount', 'Edit Bank Account', 'Update masked bank details and verification documents.'],
  [ROUTES.bankVerificationQueue]: ['verificationQueue', 'Verification Queue', 'Manage and triage pending bank account verifications across the institutional network.'],
  [ROUTES.bankVerificationDetail]: ['verificationDetail', 'Queue #82391-V', 'Review uploaded statements, AI audit confidence, and ownership trail.'],
  [ROUTES.bankUpi]: ['upi', 'UPI Verification', 'Validate institutional UPI IDs and owner records.'],
  [ROUTES.bankBeneficiaries]: ['beneficiaries', 'Beneficiaries', 'Manage and verify institutional UPI IDs and bank accounts for Q3 settlements.'],
  [ROUTES.withdrawalRequests]: ['withdrawalQueue', 'Withdrawal Requests', 'Manage and audit pending institutional fund transfers.'],
  [ROUTES.withdrawalApprovals]: ['withdrawalDashboard', 'Withdrawal Approvals', 'Monitor withdrawal performance, approvals, and recent requests.'],
  [ROUTES.withdrawalDashboard]: ['withdrawalDashboard', 'Withdrawal Approvals', 'Monitor withdrawal performance, approvals, and recent requests.'],
  [ROUTES.withdrawalDetail]: ['withdrawalDetail', 'Withdrawal Detail', 'Review wallet position, recipient bank details, and approval timeline.'],
  [ROUTES.settlementDashboard]: ['settlementDashboard', 'Settlement Dashboard', 'Track settlement status distribution and bank transfer health.'],
  [ROUTES.settlementQueue]: ['settlementQueue', 'Settlement Queue', 'Manage institutional payouts and liquidity transfers.'],
  [ROUTES.settlementDetail]: ['settlementDetail', 'Settlement Detail', 'Review revenue split, wallet information, and bank transfer status.'],
  [ROUTES.bulkSettlements]: ['bulk', 'Bulk Settlements', 'Bulk approve, reject, retry, and export settlement batches.'],
  [ROUTES.failedSettlements]: ['failed', 'Failed Settlements', 'Resolve and manage unsuccessful transfers and ledger mismatches.'],
  [ROUTES.bankPerformance]: ['performance', 'Bank Performance', 'Analyze institution-level payment gateway reliability.'],
  [ROUTES.bankingAnalytics]: ['analytics', 'Banking Analytics', 'Settlement, withdrawal, approval, and bank performance trends.'],
  [ROUTES.bankingReports]: ['reports', 'Banking Reports', 'Configure and generate institutional-grade financial disclosures.'],
  [ROUTES.bankingSettings]: ['settings', 'Banking Settings', 'Configure global transaction policies and operational risk parameters.'],
  [ROUTES.payoutProcessing]: ['payouts', 'Payout Processing', 'Manage payout queue, batch processing, and success tracking.'],
  [ROUTES.financeApprovals]: ['approvals', 'Finance Approvals', 'Review and authorize high-priority institutional transactions across the ecosystem.'],
  [ROUTES.bankingReconciliation]: ['reconciliation', 'Reconciliation', 'Match gateway records with wallet and settlement ledger entries.'],
  [ROUTES.reconciliationDetails]: ['reconciliationDetail', 'Reconciliation Detail', 'Side-by-side comparison for gateway and wallet differences.']
};

function currentMeta(route) {
  if (route === ROUTES.bankAccounts) return meta[ROUTES.bankAccounts];
  return meta[route] || meta[ROUTES.banking];
}

function Shell({ children, title, subtitle, navigate, toast }) {
  React.useEffect(() => {
    document.title = `${title} | Hozify Admin`;
  }, [title]);

  return (
    <AdminShell
      activeTab="Banking & Settlements"
      headerTitle={title}
      searchPlaceholder="Search Transaction ID or Account..."
      showGridIcon
    >
      <section >
        <div className="-head">
          <div>
            <p className="kyc-flow-breadcrumb" style={{ color: 'var(--primary)', fontSize: '12px', fontWeight: '800', margin: '0 0 6px' }}>Banking & Settlements / {title}</p>
            <h1>{title}</h1>
            <p>{subtitle}</p>
          </div>
          <div className="banking-actions"><button className="custom-btn-secondary" type="button" onClick={() => toast('Export queued locally.')}><Download size={16} /> Export CSV</button><Btn primary icon={Plus} onClick={() => navigate(ROUTES.bankAccountAdd)}>Register Account</Btn></div>
        </div>
        {children}
      </section>
    </AdminShell>
  );
}

function Btn({ children, icon: Icon, primary, danger, onClick }) {
  return <button className={`banking-btn ${primary ? 'primary' : ''} ${danger ? 'danger' : ''}`} type="button" onClick={onClick}>{Icon && <Icon size={16} />}{children}</button>;
}

function Badge({ children, status }) {
  const key = String(status || children).toLowerCase().replace(/\s+/g, '-');
  return <span className={`banking-badge ${key}`}>{children}</span>;
}

function Kpi({ label, value, note, icon: Icon, danger }) {
  return <article className={`banking-kpi ${danger ? 'danger' : ''}`}>{Icon && <Icon size={24} />}<span>{label}</span><strong>{value}</strong>{note && <small>{note}</small>}</article>;
}

function Table({ cols, rows, actions, selectable }) {
  return (
    <div className="banking-table-wrap">
      <div className="table-responsive-wrapper">
<table className="banking-table">
        <thead><tr>{selectable && <th><input type="checkbox" /></th>}{cols.map((col) => <th key={col.key}>{col.label}</th>)}{actions && <th>Actions</th>}</tr></thead>
        <tbody>{rows.map((row) => <tr key={row.id}>{selectable && <td><input type="checkbox" /></td>}{cols.map((col) => <td key={col.key}>{col.render ? col.render(row) : row[col.key]}</td>)}{actions && <td><div className="banking-row-actions">{actions(row)}</div></td>}</tr>)}</tbody>
      </table>
</div>
    </div>
  );
}

function Bars({ values = [35, 58, 48, 72, 40, 82, 52, 38, 66, 76, 44, 54] }) {
  return <div className="banking-bars">{values.map((value, i) => <span key={i} style={{ height: `${value}%` }} />)}</div>;
}

function Progress({ label, value, danger }) {
  return <div className="banking-progress"><div><span>{label}</span><b>{value}%</b></div><em><i className={danger ? 'danger' : ''} style={{ width: `${value}%` }} /></em></div>;
}

function Dashboard({ nav, setModal, toast }) {
  return (
    <>
      <section className="banking-filter-panel"><b>Entity Type</b><span>All Bank Entities</span><b>Status Range</b><span>Active & Pending</span><b>Currency</b><span>USD / EUR / GBP</span><Btn icon={Filter} onClick={() => toast('Advanced Filters panel opened.')}>Advanced Filters</Btn></section>
      <section className="banking-kpi-grid six"><Kpi label="Total Bank Accounts" value="142" note="+2.4%" icon={Wallet} /><Kpi label="Active Beneficiaries" value="8,941" icon={Users} /><Kpi label="Pending Settlements" value="24" icon={Clock} /><Kpi label="Processed (24h)" value="1,208" icon={CheckCircle2} /><Kpi label="Failed Transfers" value="03" note="Critical" icon={AlertTriangle} danger /><Kpi label="Pending Withdrawals" value="114" icon={Upload} /></section>
      <section className="banking-layout">
        <div className="banking-stack">
          <article className="banking-card"><h3>Settlement & Withdrawal Trends</h3><p>Volume analysis for the current fiscal quarter.</p><Bars /></article>
          <article className="banking-card"><div className="banking-card-head"><h3>Recent Settlements</h3><button onClick={() => nav(ROUTES.settlementQueue)}>View All</button></div><SettlementMiniTable /></article>
        </div>
        <aside className="banking-stack">
          <article className="banking-card"><h3>Pending Approvals <span className="banking-pill">08</span></h3>{['Withdrawal Auth #391', 'Settlement Auth #402'].map((item, i) => <div className="banking-mini-row" key={item}><b>{item}</b><span>{money([50000, 125900][i] * 100)}</span><Btn primary onClick={() => setModal(['Approve settlement', 'Add notes before approving this settlement.'])}>Approve</Btn></div>)}</article>
          <article className="banking-card alert"><h3>Failed Transfers</h3><p>IBAN-4491 Invalid Target</p><p>Compliance Flag #9920</p><Btn danger onClick={() => setModal(['Retry failed transfers', 'Retry all failed transfers that are eligible.'])}>Retry All Failed</Btn></article>
          <article className="banking-dark"><span>Quarterly Efficiency</span><strong>98.2%</strong><p>Average settlement success rate is up by 1.2% this month.</p></article>
        </aside>
      </section>
    </>
  );
}

function BankAccountListing({ nav, setModal, toast }) {
  const [userType, setUserType] = useState('All Types');
  const [verificationStatus, setVerificationStatus] = useState('All Statuses');
  const [bankName, setBankName] = useState('All Banks');

  const filteredAccounts = bankAccounts.filter(a => {
    const matchesUser = userType === 'All Types' || a.type === userType;
    const matchesStatus = verificationStatus === 'All Statuses' || a.verification === verificationStatus;
    const matchesBank = bankName === 'All Banks' || a.bank === bankName;
    return matchesUser && matchesStatus && matchesBank;
  });

  const handleClearAll = () => {
    setUserType('All Types');
    setVerificationStatus('All Statuses');
    setBankName('All Banks');
    toast('Filters cleared.');
  };

  return (
    <>
      <div className="banking-filter-panel" style={{ position: 'relative', zIndex: 20 }}>
        <label>User Type
          <Select
            value={userType}
            onChange={(e) => setUserType(e.target.value)}
            options={[
              { label: "All Types", value: "All Types" },
              { label: "Partner", value: "Partner" },
              { label: "Customer", value: "Customer" },
              { label: "Employee", value: "Employee" },
              { label: "Seller", value: "Seller" }
            ]} />
        </label>
        <label>Verification Status
          <Select
            value={verificationStatus}
            onChange={(e) => setVerificationStatus(e.target.value)}
            options={[
              { label: "All Statuses", value: "All Statuses" },
              { label: "Verified", value: "Verified" },
              { label: "PENDING", value: "Pending" },
              { label: "Failed", value: "Failed" }
            ]} />
        </label>
        <label>Bank Name
          <Select
            value={bankName}
            onChange={(e) => setBankName(e.target.value)}
            options={[
              { label: "All Banks", value: "All Banks" },
              { label: "HDFC Bank", value: "HDFC Bank" },
              { label: "ICICI Bank", value: "ICICI Bank" },
              { label: "SBI", value: "SBI" },
              { label: "Axis Bank", value: "Axis Bank" }
            ]} />
        </label>
        <button type="button" onClick={handleClearAll}>Clear All</button>
      </div>
      <Table cols={[
        { key: 'holder', label: 'Account Holder', render: (a) => <div className="banking-entity"><span>{a.holder.slice(0, 2).toUpperCase()}</span><div><b>{a.holder}</b><small>{a.type}</small></div></div> },
        { key: 'bank', label: 'Bank Name' },
        { key: 'account', label: 'Account Details', render: (a) => <><b>{mask(a.account)}</b><small>IFSC: {a.ifsc}</small></> },
        { key: 'verification', label: 'Verification', render: (a) => <Badge status={a.verification}>{a.verification}</Badge> },
        { key: 'wallet', label: 'Linked Wallet' },
        { key: 'status', label: 'Status', render: (a) => <Badge status={a.status}>{a.status}</Badge> }
      ]} rows={filteredAccounts} actions={(a) => <><button type="button" onClick={() => nav(ROUTES.bankAccountDetails)}><Eye size={16} /></button><button type="button" onClick={() => nav(ROUTES.bankVerificationDetail)}><ShieldCheck size={16} /></button><button type="button" onClick={() => setModal(['Disable account', `Disable ${a.holder}? Add a finance note before continuing.`, () => toast(`Account for ${a.holder} disabled.`)])}><XCircle size={16} /></button></>} />
      <section className="banking-kpi-grid three"><Kpi label="Pending Verifications" value="12" note="+4 since last 24h" /><Kpi label="Active Accounts" value="218" note="92% of total registered" /><Kpi label="Internal Audit Status" value="Healthy" note="Next audit in 14 days" /></section>
    </>
  );
}

function AccountDetails({ nav, setModal, toast }) {
  const [tab, setTab] = useState('Overview');
  const tabs = ['Overview', 'Verification', 'Settlements', 'Withdrawals', 'Timeline', 'Audit Logs'];
  return (
    <>
      <article className="banking-hero"><Landmark size={42} /><div><h2>Global Merchant Logistics Ltd. <Badge status="Pending">Verification Pending</Badge></h2><p><b>Bank:</b> Standard Chartered Bank &nbsp; <b>IFSC:</b> SCBL0001002</p><p><b>Account:</b> 9920 1145 8821</p></div><Btn primary icon={ShieldCheck} onClick={() => setModal(['Approve account', 'Approve this account after adding notes.', () => toast('Account Approved.')])}>Approve Account</Btn><Btn icon={Edit3} onClick={() => nav(ROUTES.bankAccountEdit)}>Edit</Btn></article>
      <div className="banking-tabs">{tabs.map((item) => <button className={tab === item ? 'active' : ''} key={item} type="button" onClick={() => setTab(item)}>{item}</button>)}</div>
      {tab === 'Overview' && <section className="banking-detail-grid"><div className="banking-stack"><Kpi label="Linked Internal Wallet" value="WLT-8842-XQ" note="Balance ₹4,22,810" /><Kpi label="Total Earnings" value={money(12845000)} note="+12%" /><Kpi label="Total Withdrawals" value={money(9210200)} /><Kpi label="Pending Settlement" value={money(420000)} /></div><article className="banking-card"><h3>Recent Settlements</h3><SettlementMiniTable /></article></section>}
      {tab === 'Verification' && <VerificationPanel setModal={setModal} toast={toast} />}
      {tab === 'Settlements' && <SettlementMiniTable />}
      {tab === 'Withdrawals' && <WithdrawalTable setModal={setModal} toast={toast} />}
      {tab === 'Timeline' && <Timeline items={['Account Added', 'Verification Submitted', 'Verification Approved', 'Settlement Processed', 'Bank Updated']} />}
      {tab === 'Audit Logs' && <AuditTable />}
    </>
  );
}

function AccountForm({ edit, toast }) {
  const [account, setAccount] = useState('7890123456');
  const [confirm, setConfirm] = useState('7890123456');
  const [ifsc, setIfsc] = useState('ABCD0123456');
  const [protocol, setProtocol] = useState('penny');
  const [docs, setDocs] = useState(['statement_q2_acme.pdf']);
  const [isUploading, setIsUploading] = useState(false);
  const valid = account === confirm && /^[A-Z]{4}0[A-Z0-9]{6}$/.test(ifsc);

  const handleUpload = () => {
    if (isUploading) return;
    setIsUploading(true);
    setTimeout(() => {
      setIsUploading(false);
      setDocs(prev => [...prev, `document_${Math.floor(Math.random() * 1000)}.pdf`]);
      toast('Document uploaded successfully.');
    }, 1200);
  };

  const removeDoc = (doc) => {
    setDocs(prev => prev.filter(d => d !== doc));
    toast('Document removed.');
  };

  return (
    <section className="banking-layout">
      <div className="banking-stack">
        <article className="banking-card form"><h3>{edit ? 'Update Bank Details' : 'Account Architecture'}</h3><label>Account Holder Name<input placeholder="Acme Corp Institutional Holding" /></label><div className="banking-form-grid"><label>Bank Name<input placeholder="Select clearing bank" /></label><label>IFSC / SWIFT Code<input value={ifsc} onChange={(e) => setIfsc(e.target.value.toUpperCase())} /></label><label>Account Number<input value={account} onChange={(e) => setAccount(e.target.value)} /></label><label>Confirm Account Number<input value={confirm} onChange={(e) => setConfirm(e.target.value)} /></label><label>Branch Office<input placeholder="Central Business District, London" /></label></div>{!valid && <p className="banking-error">Account confirmation and IFSC format must be valid.</p>}</article>
        <article className="banking-card"><h3>Verification Protocol</h3><div className="banking-choice-grid"><button className={protocol === 'penny' ? 'active' : ''} onClick={() => setProtocol('penny')}>Penny Drop<br /><small>Instant validation via micro-deposit.</small></button><button className={protocol === 'manual' ? 'active' : ''} onClick={() => setProtocol('manual')}>Manual Verification<br /><small>Compliance review in 24-48 hours.</small></button></div><Btn primary onClick={() => valid ? toast(edit ? 'Bank account changes saved.' : 'Bank account submitted for verification.') : toast('Please fix validation errors.')}>{edit ? 'Save Changes' : 'Submit Account'}</Btn></article>
      </div>
      <aside className="banking-stack"><article className="banking-card"><h3>Compliance Documents</h3><div className="banking-upload" onClick={handleUpload} style={{ cursor: 'pointer', opacity: isUploading ? 0.5 : 1 }}><Upload />{isUploading ? 'Uploading...' : 'Click to upload'}<br /><small>PDF, JPEG or PNG</small></div>{docs.map(doc => <div key={doc} className="banking-doc">{doc} <button onClick={() => removeDoc(doc)}><X /></button></div>)}</article><article className="banking-dark"><h3>Onboarding Note</h3><p>Institutional accounts must match legal entity records. Discrepancies may delay reconciliation.</p></article></aside>
    </section>
  );
}

function VerificationQueue({ nav, setModal, toast }) {
  return (
    <>
      <section className="banking-kpi-grid four"><Kpi label="Pending" value="128" note="+12% from yesterday" /><Kpi label="Approved" value="1,402" note="94.2% success" /><Kpi label="Rejected" value="42" danger note="AML/KYC mismatches" /><Kpi label="Reupload Required" value="18" note="Blurred documentation" /></section>
      <div className="banking-filter-panel"><Select
        options={[{
          label: "Last 7 Days",
          value: "Last 7 Days"
        }]} /><Select
        options={[{
          label: "All Institutional",
          value: "All Institutional"
        }]} /><span>Showing 128 pending requests</span></div>
      <Table cols={[{ key: 'holder', label: 'Account Holder', render: (v) => <div className="banking-entity"><span>{v.holder.slice(0, 2)}</span><div><b>{v.holder}</b><small>ID: {v.id}</small></div></div> }, { key: 'bank', label: 'Bank Institution', render: (v) => <><b>{v.bank}</b><small>**** {v.account} ({v.type})</small></> }, { key: 'submitted', label: 'Submission Date' }, { key: 'status', label: 'Status', render: (v) => <Badge status={v.status}>{v.status}</Badge> }, { key: 'confidence', label: 'Verification Confidence', render: (v) => <Progress label="" value={v.confidence} danger={v.confidence < 60} /> }]} rows={verificationQueue} actions={(row) => <><button type="button" onClick={() => nav(ROUTES.bankVerificationDetail)}><Eye size={16} /></button><button type="button" onClick={() => setModal(['Reject verification', `Provide rejection notes for ${row.holder}'s audit trail.`, () => toast(`Verification for ${row.holder} rejected.`)])}><XCircle size={16} /></button></>} />
      <section className="banking-layout"><article className="banking-empty">Select an account from the queue to view detailed documentation, KYC validation results, and ownership trail.</article><article className="banking-card"><h3>Priority Insights</h3><p className="banking-info">AML update required for 3 accounts.</p><p className="banking-danger">High risk match requires senior manual review.</p></article></section>
    </>
  );
}

function VerificationDetail({ setModal, toast, nav }) {
  return <section className="banking-verification-detail"><aside className="banking-card"><button type="button" className="banking-link" onClick={() => nav(ROUTES.bankVerificationQueue)}><ArrowLeft size={18} /> Queue #82391-V</button><h2>Global Trade Partners Ltd</h2><Badge status="High Risk">Urgent Verification</Badge><h3>Entity Information</h3><p>REG-UK-2024-912803</p><p>United Kingdom</p><div className="banking-info-box"><b>HSBC UK Business Banking</b><span>{mask('9012')}</span><span>40-02-15</span></div><Timeline items={['KYC Initial Check', 'Document Match']} /></aside><article className="banking-doc-preview"><div className="banking-tabs"><button className="active" type="button">Statement</button><button type="button">Voided Cheque</button></div><div className="banking-statement"><h3>HSBC Commercial Banking Unit</h3><p>Global Trade Partners Ltd<br />158 Victoria Street<br />London SW1E 5LB</p><div className="table-responsive-wrapper">
<table><tbody><tr><td>12 Sep</td><td>INTL WIRE TRSF</td><td>45,000.00</td><td>120,402.12</td></tr><tr><td>15 Sep</td><td>SETTLEMENT ADD 01</td><td>1,200.00</td><td>119,202.12</td></tr><tr><td>22 Sep</td><td>TECH CORP SERVICE FEE</td><td>4,500.00</td><td>114,702.12</td></tr></tbody></table>
</div></div></article><aside className="banking-card"><h3>AI Audit Confidence</h3><Progress label="High Reliability" value={98.2} /><p className="banking-success">Entity names match 1:1</p><p className="banking-success">Sort code checksum valid</p><p className="banking-warning">Scan quality is 300DPI</p><textarea placeholder="Add manual verification notes here..." /><label><input type="checkbox" /> Logo authenticity verified</label><label><input type="checkbox" /> No digital tampering detected</label><Btn primary onClick={() => setModal(['Approve bank account', 'This will approve the account for settlements.', () => toast('Bank Account Approved.')])}>Approve Bank Account</Btn><Btn danger onClick={() => setModal(['Request reupload', 'Add the reupload reason for this account.', () => toast('Reupload Requested.')])}>Request Reupload</Btn></aside></section>;
}

function UpiCenter({ setModal, toast }) {
  const initialUpiList = beneficiaries.filter((b) => b.method === 'UPI ID');
  const [upiList, setUpiList] = useState(initialUpiList);
  const [selected, setSelected] = useState(initialUpiList[0] || null);

  const handleAction = (status) => {
    setUpiList(prev => prev.map(item => item.id === selected.id ? { ...item, status } : item));
    setSelected(prev => ({ ...prev, status }));
    toast(`UPI ID ${status === 'VERIFIED' ? 'Verified' : 'Rejected'} successfully.`);
  };

  return <section className="banking-layout">
    <article className="banking-card form">
      <h3>UPI Validation</h3>
      <label>UPI ID<input value={selected?.account || ''} readOnly /></label>
      <label>Owner Name<input value={selected?.name || ''} readOnly /></label>
      <div className="banking-info-box">
        <b>Verification Result</b>
        <span>VPA pattern valid</span>
        <span>Owner name match: {selected?.status === 'VERIFIED' ? '100%' : '96%'}</span>
        <Badge status={selected?.status || 'Pending'}>{selected?.status || 'Pending Approval'}</Badge>
      </div>
      <textarea placeholder="Verification notes..." />
      <div className="banking-actions">
        <Btn primary onClick={() => setModal(['Verify UPI ID', `Approve ${selected?.account} for payouts?`, () => handleAction('VERIFIED')])}>Verify</Btn>
        <Btn danger onClick={() => setModal(['Reject UPI ID', 'Add rejection notes.', () => handleAction('FAILED')])}>Reject</Btn>
      </div>
    </article>
    <article className="banking-card">
      <h3>Recent UPI Checks</h3>
      <Table 
        cols={[
          { key: 'name', label: 'Owner' }, 
          { key: 'account', label: 'UPI ID' }, 
          { key: 'status', label: 'Status', render: (b) => <Badge status={b.status}>{b.status}</Badge> }
        ]} 
        rows={upiList}
        actions={(b) => <><button type="button" onClick={() => { setSelected(b); window.scrollTo({ top: 0, behavior: 'smooth' }); toast('Loaded ' + b.name); }}><Eye size={16} /></button></>}
      />
    </article>
  </section>;
}

function Beneficiaries({ setModal, toast }) {
  const [list, setList] = useState(beneficiaries);
  const [kpis, setKpis] = useState({ total: 2842, activeUpi: 1120 });
  const [isUploading, setIsUploading] = useState(false);

  const handleDelete = (id) => {
    setList(prev => prev.filter(item => item.id !== id));
    setKpis(prev => ({ ...prev, total: prev.total - 1 }));
    toast('Beneficiary disabled successfully.');
  };

  const handleUpload = () => {
    if (isUploading) return;
    setIsUploading(true);
    setTimeout(() => {
      setIsUploading(false);
      setKpis(prev => ({ ...prev, total: prev.total + 14, activeUpi: prev.activeUpi + 5 }));
      toast('Batch file uploaded and 14 records processed.');
    }, 1500);
  };

  return (
    <><section className="banking-kpi-grid four"><Kpi label="Total Beneficiaries" value={kpis.total.toLocaleString()} note="+12%" /><Kpi label="Active UPI IDs" value={kpis.activeUpi.toLocaleString()} note="40% of total" /><Kpi label="Pending Verification" value="48" danger note="Action Required" /><Kpi label="Success Rate" value="99.8%" /></section><div className="banking-filter-panel" style={{ position: 'relative', zIndex: 20 }}><div className="banking-search wide"><Search size={18} /><input placeholder="Search by name, UPI ID, or account number..." /></div><Select
      options={[
        { label: "All Types", value: "All Types" },
        { label: "Bank Account", value: "Bank Account" },
        { label: "UPI ID", value: "UPI ID" },
        { label: "Wallet", value: "Wallet" }
      ]} /><Select
      options={[
        { label: "All Statuses", value: "All Statuses" },
        { label: "Active", value: "Active" },
        { label: "Pending", value: "Pending" },
        { label: "Failed", value: "Failed" }
      ]} /></div><Table cols={[{ key: 'name', label: 'Beneficiary Name', render: (b) => <><b>{b.name}</b><small>ID: {b.id}</small></> }, { key: 'method', label: 'Type', render: (b) => <Badge status="info">{b.method}</Badge> }, { key: 'account', label: 'UPI ID / Account' }, { key: 'bank', label: 'Bank / Provider' }, { key: 'status', label: 'Status', render: (b) => <Badge status={b.status}>{b.status}</Badge> }, { key: 'last', label: 'Last Validated' }]} rows={list} actions={(b) => <><button type="button" onClick={() => toast(`Viewing details for ${b.name}`)}><Eye size={16} /></button><button type="button" onClick={() => toast(`Editing ${b.name}`)}><Edit3 size={16} /></button><button type="button" onClick={() => setModal(['Disable beneficiary', `Are you sure you want to disable ${b.name}?`, () => handleDelete(b.id)])}><XCircle size={16} /></button></>} /><section className="banking-layout"><article className="banking-card"><h3>Batch Verification</h3><p>Upload CSV/XLSX for bulk validation.</p><div className="banking-upload" onClick={handleUpload} style={{ cursor: 'pointer', opacity: isUploading ? 0.5 : 1 }}><Upload />{isUploading ? 'Uploading & Processing...' : 'Drag & drop or click to upload'}</div></article><article className="banking-info-panel"><h3>System Health</h3><p>API Online</p><Progress label="Bank Server Uptime" value={99} /></article></section></>
  );
}

function WithdrawalDashboard({ setModal, toast }) {
  return <><section className="banking-kpi-grid four"><Kpi label="Pending Withdrawals" value="128" /><Kpi label="Approved Withdrawals" value="1,280" /><Kpi label="Rejected Withdrawals" value="42" danger /><Kpi label="Total Withdrawal Amount" value={money(412950000)} /></section><section className="banking-layout"><article className="banking-card"><h3>Withdrawal Trend</h3><Bars /></article><article className="banking-card"><h3>Success Rate</h3><Progress label="Success" value={92} /><Progress label="Held" value={6} danger /></article></section><WithdrawalTable setModal={setModal} toast={toast} /></>;
}

function WithdrawalQueue({ setModal, toast }) {
  return <><section className="banking-kpi-grid four"><Kpi label="Total Pending" value={money(412950000)} note="+12% from yesterday" /><Kpi label="Approved Today" value={money(128000000)} /><Kpi label="Avg Processing Time" value="14.2 min" note="-2 min improvement" /><Kpi label="Queue Capacity" value="65%" /></section><WithdrawalTable setModal={setModal} toast={toast} /><div className="banking-footer-bar"><span>Showing 4 of 128 requests</span><span>Connected to Settlement Engine</span><span>Page 1 of 32</span></div></>;
}

function WithdrawalTable({ setModal, toast }) {
  return <Table cols={[{ key: 'id', label: 'Request ID' }, { key: 'user', label: 'User / Entity', render: (w) => <div className="banking-entity"><span>{w.user.slice(0, 2)}</span><b>{w.user}</b></div> }, { key: 'amount', label: 'Amount', render: (w) => money(w.amount) }, { key: 'bank', label: 'Bank Name', render: (w) => <><b>{w.bank}</b><small>{mask(w.account)}</small></> }, { key: 'requested', label: 'Requested Date' }, { key: 'status', label: 'Status', render: (w) => <Badge status={w.status}>{w.status}</Badge> }]} rows={withdrawals} actions={(row) => <><button type="button" onClick={() => setModal(['Approve withdrawal', `Add approval note for ${row.id}.`, () => toast && toast(`Withdrawal ${row.id} approved.`)])}><CheckCircle2 size={16} /></button><button type="button" onClick={() => setModal(['Reject withdrawal', `Add rejection reason for ${row.id}.`, () => toast && toast(`Withdrawal ${row.id} rejected.`)])}><XCircle size={16} /></button><button type="button" onClick={() => setModal(['Hold withdrawal', `Add hold reason for ${row.id}.`, () => toast && toast(`Withdrawal ${row.id} held.`)])}><Clock size={16} /></button></>} />;
}

function WithdrawalDetail({ setModal, toast }) {
  return <DetailDrawer title="Withdrawal Detail" id="WTH-99201" amount={124050000} setModal={setModal} toast={toast} />;
}

function SettlementDashboard({ setModal, toast }) {
  return <><section className="banking-kpi-grid four"><Kpi label="Pending Settlements" value="24" /><Kpi label="Processing" value="112" /><Kpi label="Completed" value="1,208" /><Kpi label="Failed" value="03" danger /></section><section className="banking-layout"><article className="banking-card"><h3>Settlement Volume</h3><Bars /></article><article className="banking-card"><h3>Bank Performance</h3>{bankPerformance.slice(0, 3).map((b) => <Progress key={b.id} label={b.institution} value={b.success} />)}</article></section><SettlementQueue setModal={setModal} toast={toast} /></>;
}

function SettlementQueue({ setModal = () => {}, toast = () => {} }) {
  const [list, setList] = useState(settlements);
  const [queueValue, setQueueValue] = useState(1428512045);

  const handleAction = (id, action) => {
    setList(prev => prev.filter(item => item.id !== id));
    toast(`Settlement ${id} ${action} successfully.`);
    setQueueValue(prev => prev - 150000000); 
  };

  const handleBulk = () => {
    toast('Bulk processing selected items...');
  };

  return (
    <><div className="banking-filter-panel"><Select
      options={[
        { label: "Status: All Queued", value: "Status: All Queued" },
        { label: "Status: Verified", value: "Status: Verified" },
        { label: "Status: Pending Review", value: "Status: Pending Review" },
        { label: "Status: Held", value: "Status: Held" },
        { label: "Status: Error", value: "Status: Error" }
      ]} /><Select
      options={[
        { label: "Partner: All Partners", value: "Partner: All Partners" },
        { label: "Partner: Nexus Gaming", value: "Partner: Nexus Gaming" },
        { label: "Partner: Global Corp", value: "Partner: Global Corp" },
        { label: "Partner: Alpha Solutions", value: "Partner: Alpha Solutions" },
        { label: "Partner: Beta Corp", value: "Partner: Beta Corp" }
      ]} /><span>Showing {list.length} transactions awaiting processing</span><Btn primary onClick={() => toast('Filters applied.')}>Apply Filters</Btn><button onClick={() => toast('Filters reset.')}>Reset</button></div><Table selectable cols={[{ key: 'id', label: 'Settlement ID' }, { key: 'partner', label: 'Partner Entity' }, { key: 'amount', label: 'Amount', render: (s) => <><b>{money(s.amount)}</b>{s.highValue && <Badge status="High Value">Institutional High Value</Badge>}</> }, { key: 'bank', label: 'Bank Details', render: (s) => <><b>BIC: {s.bank}</b><small>ACC: **** {s.account}</small></> }, { key: 'requested', label: 'Requested Date' }, { key: 'status', label: 'Status', render: (s) => <Badge status={s.status}>{s.status}</Badge> }]} rows={list} actions={(s) => <><button onClick={() => setModal(['Approve settlement', `Add notes before approval for ${s.id}.`, () => handleAction(s.id, 'approved')])}><CheckCircle2 size={16} /></button><button onClick={() => setModal(['Reject settlement', `Add rejection reason for ${s.id}.`, () => handleAction(s.id, 'rejected')])}><XCircle size={16} /></button><button onClick={() => setModal(['Hold settlement', `Add hold reason for ${s.id}.`, () => handleAction(s.id, 'held')])}><Clock size={16} /></button></>} /><div className="banking-footer-bar"><span>Total Queue Value {money(queueValue)}</span><span>Selected Items (3) {money(521250000)}</span><Btn primary onClick={handleBulk}>Bulk Process Selected</Btn></div></>
  );
}

function SettlementDetail({ setModal, toast }) {
  return <DetailDrawer title="Settlement Detail" id="SETL-99201-HV" amount={425000000} retry setModal={setModal} toast={toast} />;
}

function BulkCenter({ setModal, toast }) {
  return (
    <><div className="banking-filter-panel"><Select
      options={[
        { label: "Reviewer: Finance Lead", value: "Reviewer: Finance Lead" },
        { label: "Reviewer: Compliance Manager", value: "Reviewer: Compliance Manager" },
        { label: "Reviewer: Treasury Head", value: "Reviewer: Treasury Head" },
        { label: "Reviewer: Auto System", value: "Reviewer: Auto System" }
      ]} /><textarea placeholder="Bulk approval notes..." /><Btn primary onClick={() => setModal(['Bulk approve settlements', 'Approve all selected settlements.'])}>Bulk Approve</Btn><Btn danger onClick={() => setModal(['Bulk reject settlements', 'Reject all selected settlements.'])}>Bulk Reject</Btn><Btn icon={Download} onClick={() => toast('Bulk export started. Download will begin shortly.')}>Bulk Export</Btn><Btn icon={RefreshCcw} onClick={() => setModal(['Retry failed settlements', 'Retry selected failed settlements.'])}>Retry Failed</Btn></div><SettlementQueue setModal={setModal} toast={toast} /></>
  );
}

function FailedManagement({ setModal, toast }) {
  return (
    <><section className="banking-kpi-grid four"><Kpi label="Failed Today" value="28" note="Est. value: $1.4M USD" danger /><Kpi label="Failed This Week" value="142" note="84% recovery rate" /><Kpi label="Avg. Time to Resolve" value="3.4h" note="Fastest: 12m" /><article className="banking-dark"><h3>Queue Status</h3><p>Urgent intervention required.</p><Progress label="Resolved" value={62} /></article></section><div className="banking-filter-panel"><span>Filter By:</span><Select
      options={[
        { label: "Failure Reason (All)", value: "Failure Reason (All)" },
        { label: "Invalid Account", value: "Invalid Account" },
        { label: "Insufficient Funds", value: "Insufficient Funds" },
        { label: "Network Error", value: "Network Error" },
        { label: "Beneficiary Blocked", value: "Beneficiary Blocked" }
      ]} /><Select
      options={[
        { label: "All Banks", value: "All Banks" },
        { label: "HDFC Bank", value: "HDFC Bank" },
        { label: "ICICI Bank", value: "ICICI Bank" },
        { label: "SBI", value: "SBI" },
        { label: "Axis Bank", value: "Axis Bank" }
      ]} /><input placeholder="mm/dd/yyyy" /><label><input type="checkbox" /> High Value Only</label></div><Table selectable cols={[{ key: 'id', label: 'Settlement ID' }, { key: 'reason', label: 'Failure Reason', render: (f) => <><Badge status="Failed">{f.reason}</Badge><p>{f.note}</p></> }, { key: 'bank', label: 'Counterparty Bank' }, { key: 'amount', label: 'Amount', render: (f) => money(f.amount) }, { key: 'status', label: 'Status', render: (f) => <Badge status={f.status}>{f.status}</Badge> }]} rows={failedSettlements} actions={(row) => <><button type="button" onClick={() => setModal(['Retry settlement', `Retry failed transfer for ${row.id}.`, () => toast(`Retrying settlement ${row.id}.`)])}><RefreshCcw size={16} /></button><button type="button" onClick={() => setModal(['Resolve settlement', `Add resolution notes for ${row.id}.`, () => toast(`Settlement ${row.id} resolved.`)])}><CheckCircle2 size={16} /></button><button type="button" onClick={() => setModal(['Escalate settlement', `Escalate ${row.id} to finance lead.`, () => toast(`Settlement ${row.id} escalated.`)])}><AlertTriangle size={16} /></button></>} /></>
  );
}

function Reconciliation({ setModal, toast }) {
  const [issues, setIssues] = useState(reconciliationIssues);
  const [selectedIssue, setSelectedIssue] = useState(reconciliationIssues[0]);

  const handleAction = (id, action) => {
    setIssues(prev => {
      const next = prev.filter(iss => iss.id !== id);
      if (selectedIssue?.id === id) {
        setSelectedIssue(next[0] || null);
      }
      return next;
    });
    toast(`Issue ${id} ${action} successfully.`);
  };

  return (
    <><section className="banking-kpi-grid four"><Kpi label="Matched" value="11,842" note="95.1% success rate" /><Kpi label="Unmatched" value={issues.length} danger note="Missing platform records" /><Kpi label="Pending Review" value="512" /><Kpi label="Gateway Errors" value="54" /></section><div className="banking-filter-panel"><div className="banking-search wide"><Search size={18} /><input placeholder="Search Transaction ID, UTR, or Customer Name..." /></div><Select
      options={[
        { label: "All Gateways", value: "All Gateways" },
        { label: "Razorpay", value: "Razorpay" },
        { label: "Stripe", value: "Stripe" },
        { label: "Cashfree", value: "Cashfree" },
        { label: "PayU", value: "PayU" }
      ]} /><Select
      options={[
        { label: "Status: All Discrepancies", value: "Status: All Discrepancies" },
        { label: "Status: Pending Review", value: "Status: Pending Review" },
        { label: "Status: Force Matched", value: "Status: Force Matched" },
        { label: "Status: Escalated", value: "Status: Escalated" }
      ]} /></div><section className="banking-recon-grid"><article className="banking-card"><h3>Active Issues ({issues.length})</h3>{issues.map((r) => <button className={`banking-issue ${selectedIssue?.id === r.id ? 'active' : ''}`} key={r.id} onClick={() => setSelectedIssue(r)}><b>{r.id}</b><span>{r.customer}</span><Badge status={r.mismatch}>{r.mismatch}</Badge></button>)}</article>
    {selectedIssue ? <article className="banking-card"><div className="banking-card-head"><h3>Comparison: {selectedIssue.id}</h3><Btn danger onClick={() => setModal(['Flag for audit', 'Flag this reconciliation issue for audit.', () => handleAction(selectedIssue.id, 'flagged for audit')])}>Flag for Audit</Btn><Btn primary onClick={() => handleAction(selectedIssue.id, 'force matched')}>Force Match</Btn></div><div className="banking-compare"><div><h4>Platform Record</h4><b>{selectedIssue.id}</b><strong>{money(selectedIssue.platform)}</strong><Badge status="Completed">Completed</Badge></div><div><h4>Gateway ({selectedIssue.gateway})</h4><b>pay_{selectedIssue.id.split('_')[1] || 'N92jks821'}</b><strong className="danger">{money(selectedIssue.gatewayAmount)}</strong><Badge status={selectedIssue.status}>{selectedIssue.status}</Badge></div></div><div className="banking-info-panel"><b>Recommendation Engine Notice</b><p>This mismatch matches configured platform fee. Apply standard fee rule.</p></div></article> : <article className="banking-card"><h3>No issue selected</h3></article>}
    </section></>
  );
}

function ReconciliationDetail({ setModal, toast }) {
  return <section className="banking-layout"><article className="banking-card"><h3>Difference Analysis</h3><div className="banking-compare"><div><h4>Gateway Transaction</h4><b>pay_N92jks821</b><strong>{money(422550)}</strong></div><div><h4>Wallet Transaction</h4><b>WLT-8842-XQ</b><strong>{money(425000)}</strong></div></div><p className="banking-danger">Difference: -₹2,450 fees unaccounted.</p><textarea placeholder="Resolution notes..." /><Btn primary onClick={() => setModal(['Mark resolved', 'Mark this reconciliation issue as resolved.', () => toast('Issue marked as resolved.')])}>Mark Resolved</Btn><Btn danger onClick={() => setModal(['Escalate reconciliation', 'Escalate to audit team.', () => toast('Issue escalated.')])}>Escalate</Btn></article><article className="banking-card"><h3>Settlement Transaction</h3><SettlementMiniTable /></article></section>;
}

function Payouts({ setModal, toast }) {
  return <><section className="banking-kpi-grid four"><Kpi label="Payout Queue" value="342" /><Kpi label="Batches Processing" value="12" /><Kpi label="Succeeded" value="1,204" /><Kpi label="Failed" value="18" danger /></section><section className="banking-layout"><article className="banking-card"><h3>Payout Queue</h3><SettlementQueue setModal={setModal} toast={toast} /></article><article className="banking-card"><h3>Approval Workflow</h3><Timeline items={['Batch Created', 'Finance Review', 'Treasury Approval', 'Bank Transfer', 'Completion']} /><Btn icon={RefreshCcw} onClick={() => setModal(['Retry failed payouts', 'Retry failed payout batch.', () => toast('Payouts Retried.')])}>Retry Failed Payouts</Btn></article></section></>;
}

function Approvals({ setModal, toast }) {
  return (
    <><section className="banking-kpi-grid four"><Kpi label="Pending Queue" value="142" /><Kpi label="High Priority" value="28" danger note="Immediate action" /><Kpi label="Avg Approval Time" value="4.2h" note="Target: 3.0h" /><Kpi label="Total Value Risk" value="₹1.4M" /></section><div className="banking-filter-panel"><button type="button" onClick={() => toast('Filters updated.')}>All</button><button type="button" onClick={() => toast('Filters updated.')}>Withdrawals</button><button type="button" onClick={() => toast('Filters updated.')}>Settlements</button><button type="button" onClick={() => toast('Filters updated.')}>Refunds</button><Select
      options={[
        { label: "Reviewer: All", value: "Reviewer: All" },
        { label: "Reviewer: Finance Lead", value: "Reviewer: Finance Lead" },
        { label: "Reviewer: Compliance Manager", value: "Reviewer: Compliance Manager" },
        { label: "Reviewer: Treasury Head", value: "Reviewer: Treasury Head" }
      ]} /><Select
      options={[
        { label: "Highest Priority", value: "Highest Priority" },
        { label: "Priority: High", value: "Priority: High" },
        { label: "Priority: Medium", value: "Priority: Medium" },
        { label: "Priority: Low", value: "Priority: Low" }
      ]} /></div><Table selectable cols={[{ key: 'type', label: 'Type / ID', render: (a) => <><b>{a.type}</b><small>{a.id}</small></> }, { key: 'entity', label: 'Entity / Recipient', render: (a) => <><b>{a.entity}</b><small>{a.bank}</small></> }, { key: 'risk', label: 'Risk Score', render: (a) => <Progress label="" value={a.risk} danger={a.risk > 60} /> }, { key: 'reviewer', label: 'Reviewer' }, { key: 'amount', label: 'Amount', render: (a) => money(a.amount) }, { key: 'status', label: 'Status', render: (a) => <Badge status={a.status}>{a.status}</Badge> }]} rows={approvals} actions={(row) => <><button type="button" onClick={() => setModal(['Approve transaction', `Add approval note for ${row.id}.`, () => toast(`Transaction ${row.id} approved.`)])}><CheckCircle2 size={16} /></button><button type="button" onClick={() => setModal(['Reject transaction', `Add rejection note for ${row.id}.`, () => toast(`Transaction ${row.id} rejected.`)])}><XCircle size={16} /></button><button type="button" onClick={() => setModal(['Assign reviewer', `Choose reviewer and add context for ${row.id}.`, () => toast(`Reviewer assigned for ${row.id}.`)])}><Users size={16} /></button></>} /></>
  );
}

function BankingAnalytics() {
  return <><section className="banking-kpi-grid four"><Kpi label="Settlement Volume" value="₹14.2B" note="+12% MoM" /><Kpi label="Withdrawal Volume" value="₹4.1B" note="-3% MoM" /><Kpi label="Avg Transaction Size" value="₹1.2M" /><Kpi label="Total Processing Fees" value="₹24.8M" /></section><section className="banking-layout"><article className="banking-card"><h3>Volume Over Time</h3><Bars values={[42, 56, 34, 72, 80, 55, 90, 85, 95, 78, 65, 88]} /></article><article className="banking-card"><h3>Transaction Types</h3><Progress label="B2B Settlements" value={65} /><Progress label="Vendor Payouts" value={20} /><Progress label="User Withdrawals" value={10} /><Progress label="Refunds" value={5} /></article></section><section className="banking-layout"><article className="banking-card"><h3>Regional Distribution</h3><Progress label="North America" value={45} /><Progress label="Europe" value={30} /><Progress label="Asia Pacific" value={25} /></article><article className="banking-dark"><h3>Growth Insight</h3><strong>+14.2%</strong><p>Overall volume has increased significantly this quarter due to new enterprise onboarding.</p></article></section></>;
}

function BankPerformanceDashboard() {
  return <><section className="banking-kpi-grid four"><Kpi label="Fastest Processing" value="Chase Bank" note="12ms avg" /><Kpi label="Highest Success Rate" value="HSBC Global" note="99.9%" /><Kpi label="Gateway Uptime" value="99.99%" /><Kpi label="Critical Anomalies" value="03" danger note="Requires attention" /></section><section className="banking-layout"><article className="banking-card"><h3>Processing Throughput (Last 7 Days)</h3><Bars values={[92, 88, 95, 91, 85, 98, 94]} /></article><article className="banking-card"><h3>Failure Patterns</h3><Progress label="Network Timeout" value={42} danger /><Progress label="Account Verification" value={28} /><Progress label="Insufficient Collateral" value={18} /><Progress label="Other API Errors" value={12} /></article></section><article className="banking-card"><h3>Gateway Routing Metrics</h3><Table cols={[{ key: 'institution', label: 'Institution' }, { key: 'success', label: 'Success Rate', render: (b) => `${b.success}%` }, { key: 'latency', label: 'Latency' }, { key: 'volume', label: 'Volume (24h)', render: (b) => money(b.volume) }, { key: 'status', label: 'Status', render: (b) => <Badge status={b.status}>{b.status}</Badge> }, { key: 'gateway', label: 'Primary Gateway' }]} rows={bankPerformance} /></article></>;
}

function Reports({ toast }) {
  return (
    <section className="banking-layout"><div className="banking-stack"><div className="banking-report-tabs">{['Settlement Report', 'Withdrawal Report', 'Reconciliation Report', 'Bank Performance'].map((r, i) => <button className={i === 0 ? 'active' : ''} key={r}><FileText />{r}</button>)}</div><article className="banking-card form"><h3>Configuration Parameters</h3><div className="banking-form-grid"><label>Date Range<input value="Oct 01, 2024 - Oct 14, 2024" readOnly /></label><label>Institution / Bank<Select
      options={[
        { label: "All Integrated Banks", value: "All Integrated Banks" },
        { label: "HDFC Bank", value: "HDFC Bank" },
        { label: "ICICI Bank", value: "ICICI Bank" },
        { label: "SBI", value: "SBI" },
        { label: "Axis Bank", value: "Axis Bank" }
      ]} /></label></div><div className="banking-actions"><Badge status="info">Institutional</Badge><Badge status="Pending">Broker</Badge><Badge status="info">Liquidity</Badge></div></article><article className="banking-card"><h3>Data Preview (Recent 50 Rows)</h3><Table cols={[{ key: 'id', label: 'Transaction ID' }, { key: 'owner', label: 'Counterparty' }, { key: 'status', label: 'Status', render: (r) => <Badge status={r.status}>{r.status}</Badge> }, { key: 'value', label: 'Value', render: (r) => money(r.value) }]} rows={reports.map((r) => ({ ...r, owner: r.owner, value: r.value }))} /></article></div><aside className="banking-stack"><article className="banking-card"><h3>Generate Export</h3><div className="banking-choice-grid"><button>PDF</button><button className="active">Excel</button><button>CSV</button></div><Btn primary icon={Download} onClick={() => toast('Report download prepared.')}>Download Report</Btn></article><article className="banking-card"><h3>Automated Scheduling</h3><p>Every Monday @ 06:00 GMT</p><p>Recipients: Finance Team, Compliance Div</p><Btn>Update Schedule</Btn></article><article className="banking-dark"><h3>Audit-Ready Compliance</h3><p>Exports contain cryptographic signatures and reconciliation markers.</p></article></aside></section>
  );
}

function SettingsPage({ toast }) {
  return (
    <><section className="banking-layout"><div className="banking-stack"><article className="banking-card"><h3>Settlement & Treasury Logic</h3><div className="banking-choice-grid"><button className="active">T + 1</button><button>T + 2</button><button>Same Day</button></div><label>Maximum daily withdrawal limit<input value="5000000.00" readOnly /></label><p>Global Reserve Buffer <b>12.5%</b></p></article><article className="banking-card"><h3>Auto-Approval Risk Matrix <Badge status="Verified">Engine Active</Badge></h3><Table cols={[{ key: 'range', label: 'Risk Score Range' }, { key: 'action', label: 'Policy Action' }, { key: 'threshold', label: 'Threshold' }]} rows={[{ id: 'r1', range: '00 - 15', action: 'Full Auto-Approval', threshold: '< 1,000,000.00' }, { id: 'r2', range: '16 - 45', action: 'Single Sign-off', threshold: '< 250,000.00' }, { id: 'r3', range: '46+', action: 'Manual Compliance Audit', threshold: 'Any Value' }]} /></article></div><aside className="banking-stack"><article className="banking-card"><h3>Verification Protocols</h3><label><input type="checkbox" defaultChecked /> Penny-Drop Bank Verification</label><label><input type="checkbox" defaultChecked /> VPA Pattern Matching</label><label>Max Verification Retries<Select
      options={[
        { label: "Unlimited (Flag After 3)", value: "Unlimited (Flag After 3)" },
        { label: "1 Retry (Strict)", value: "1 Retry (Strict)" },
        { label: "3 Retries (Standard)", value: "3 Retries (Standard)" },
        { label: "5 Retries (Relaxed)", value: "5 Retries (Relaxed)" }
      ]} /></label></article><article className="banking-card"><h3>Escalation Policies</h3><Timeline items={['Level 1: Compliance Officer', 'Level 2: VP Finance', 'Level 3: Board Audit']} /><Btn>Manage Recipients</Btn></article></aside></section><div className="banking-bottom-dark"><span>Configuration Uptime <b>99.998%</b></span><span>Policy Version <b>v4.12.0-rc2</b></span><span>Last Verified By <b>Admin: Marcus Thorne</b></span></div><div className="banking-actions"><Btn onClick={() => toast('Changes discarded.')}>Discard Changes</Btn><Btn primary onClick={() => toast('Configuration saved locally.')}>Save Configuration</Btn></div></>
  );
}

function SettlementMiniTable() {
  const rows = settlements.slice(0, 3).map((s) => ({ ...s, beneficiary: s.partner, date: s.requested }));
  return <Table cols={[{ key: 'id', label: 'Transaction ID' }, { key: 'beneficiary', label: 'Beneficiary' }, { key: 'date', label: 'Date / Time' }, { key: 'amount', label: 'Amount', render: (s) => money(s.amount) }, { key: 'status', label: 'Status', render: (s) => <Badge status={s.status}>{s.status}</Badge> }]} rows={rows} />;
}

function VerificationPanel({ setModal, toast }) {
  return <section className="banking-detail-grid"><article className="banking-card"><h3>Verification Documents</h3>{['Latest Bank Passbook', 'Cancelled Cheque', '6-Month Bank Statement'].map((doc, i) => <div className="banking-doc" key={doc}><FileText />{doc}<Badge status={i === 0 ? 'Pending' : 'Verified'}>{i === 0 ? 'Pending' : 'Verified'}</Badge></div>)}<textarea placeholder="Verification remarks..." /><div className="banking-actions"><Btn primary onClick={() => setModal(['Approve verification', 'Approve verification documents.', () => toast && toast('Verification approved.')])}>Approve</Btn><Btn danger onClick={() => setModal(['Reject verification', 'Reject with reason.', () => toast && toast('Verification rejected.')])}>Reject</Btn><Btn onClick={() => setModal(['Request reupload', 'Ask user to upload clearer documents.', () => toast && toast('Reupload requested.')])}>Request Reupload</Btn></div></article><article className="banking-card"><h3>Verification Results</h3><Progress label="Document Match" value={92} /><Progress label="Account Name Match" value={88} /><Progress label="IFSC Validity" value={100} /></article></section>;
}

function AuditTable() {
  return <Table cols={[{ key: 'action', label: 'Action' }, { key: 'admin', label: 'Admin' }, { key: 'date', label: 'Date' }, { key: 'remarks', label: 'Remarks' }]} rows={auditLogs} />;
}

function Timeline({ items }) {
  return <div className="banking-timeline">{items.map((item, i) => <div key={item}><span>{i + 1}</span><b>{item}</b><small>{i < 2 ? 'Completed' : 'Pending'}</small></div>)}</div>;
}

function DetailDrawer({ title, id, amount, retry, setModal, toast }) {
  return <section className="banking-layout"><div className="banking-stack"><article className="banking-card"><h3>{title}</h3><h2>{id}</h2><Kpi label="Total Settlement" value={money(amount)} note="Risk score 15: Low Threat" /><div className="banking-compare"><div><span>Service Fee</span><b>{money(amount * 0.01)}</b></div><div><span>Net Payout</span><b>{money(amount * 0.99)}</b></div></div></article><article className="banking-card"><h3>Recipient Bank Details</h3><p>Account Name <b>Alpha Global Partners LLC</b></p><p>Bank Name <b>JP Morgan Chase Bank, N.A.</b></p><p>SWIFT/BIC <b>CHASUS33XXX</b></p><p>Account Number <b>{mask('8821')}</b></p></article></div><aside className="banking-card"><h3>Approval Timeline</h3><Timeline items={['Initiated', 'AI Check Completed', 'Finance Lead Review', 'Bank Transfer']} /><textarea placeholder="Approval notes..." /><Btn primary onClick={() => setModal(['Approve transaction', 'Approve this finance transaction.', () => toast && toast('Transaction Approved.')])}>Approve</Btn><Btn danger onClick={() => setModal(['Reject transaction', 'Reject with notes.', () => toast && toast('Transaction Rejected.')])}>Reject</Btn>{retry && <Btn icon={RefreshCcw} onClick={() => setModal(['Retry settlement', 'Retry this failed settlement.', () => toast && toast('Settlement Retried.')])}>Retry</Btn>}<Btn onClick={() => setModal(['Escalate transaction', 'Escalate for senior review.', () => toast && toast('Transaction Escalated.')])}>Escalate</Btn></aside></section>;
}

function Modal({ modal, onClose }) {
  if (!modal) return null;
  return <div className="banking-modal-backdrop" onClick={onClose}><section className="banking-modal" onClick={(e) => e.stopPropagation()}><h3>{modal[0]}</h3><p>{modal[1]}</p><textarea placeholder="Finance notes / reason..." /><div className="banking-actions"><Btn onClick={onClose}>Cancel</Btn><Btn primary onClick={() => { if(modal[2]) modal[2](); onClose(); }}>Confirm</Btn></div></section></div>;
}

export default function BankingSettlementManagement() {
  const { route, navigate } = useApp();
  const [toastMsg, setToastMsg] = useState('');
  const [modal, setModal] = useState(null);
  const [screen, title, subtitle] = currentMeta(route);
  const toast = (msg) => {
    setToastMsg(msg);
    window.setTimeout(() => setToastMsg(''), 2200);
  };
  const content = useMemo(() => {
    const props = { nav: navigate, setModal, toast };
    if (screen === 'accounts') return <BankAccountListing {...props} />;
    if (screen === 'accountDetails') return <AccountDetails {...props} />;
    if (screen === 'addAccount') return <AccountForm {...props} />;
    if (screen === 'editAccount') return <AccountForm edit {...props} />;
    if (screen === 'verificationQueue') return <VerificationQueue {...props} />;
    if (screen === 'verificationDetail') return <VerificationDetail {...props} />;
    if (screen === 'upi') return <UpiCenter {...props} />;
    if (screen === 'beneficiaries') return <Beneficiaries {...props} />;
    if (screen === 'withdrawalDashboard') return <WithdrawalDashboard {...props} />;
    if (screen === 'withdrawalQueue') return <WithdrawalQueue {...props} />;
    if (screen === 'withdrawalDetail') return <WithdrawalDetail {...props} />;
    if (screen === 'settlementDashboard') return <SettlementDashboard {...props} />;
    if (screen === 'settlementQueue') return <SettlementQueue {...props} />;
    if (screen === 'settlementDetail') return <SettlementDetail {...props} />;
    if (screen === 'bulk') return <BulkCenter {...props} />;
    if (screen === 'failed') return <FailedManagement {...props} />;
    if (screen === 'reconciliation') return <Reconciliation {...props} />;
    if (screen === 'reconciliationDetail') return <ReconciliationDetail {...props} />;
    if (screen === 'payouts') return <Payouts {...props} />;
    if (screen === 'approvals') return <Approvals {...props} />;
    if (screen === 'analytics') return <BankingAnalytics {...props} />;
    if (screen === 'performance') return <BankPerformanceDashboard {...props} />;
    if (screen === 'reports') return <Reports {...props} />;
    if (screen === 'settings') return <SettingsPage {...props} />;
    return <Dashboard {...props} />;
  }, [screen, route]);

  return (
    <Shell title={title} subtitle={subtitle} active={route} navigate={navigate} toast={toast}>
      {toastMsg && <div className="banking-toast"><CheckCircle2 size={16} />{toastMsg}</div>}
      {content}
      <Modal modal={modal} onClose={() => setModal(null)} />
    </Shell>
  );
}
