import {
  Activity,
  AlertOctagon,
  AlertTriangle,
  Ban,
  BellRing,
  Bot,
  BrainCircuit,
  Briefcase,
  Building2,
  CheckCircle2,
  CircleDollarSign,
  ClipboardCheck,
  ClipboardList,
  CreditCard,
  DatabaseZap,
  FileCheck2,
  FileClock,
  Fingerprint,
  Flag,
  Gauge,
  Globe2,
  Landmark,
  Laptop,
  Link2,
  Lock,
  MapPinned,
  Network,
  Radar,
  ReceiptText,
  RotateCcw,
  Scale,
  ShieldAlert,
  ShieldCheck,
  ShieldX,
  Smartphone,
  UserCheck,
  UserCog,
  UserX,
  Wallet,
  Zap
} from 'lucide-react';

export const fraudCases = [
  {
    id: '#FC-9281-X',
    entityType: 'Merchant',
    entity: 'Global Retailers Ltd.',
    subtext: 'Merchant Account',
    fraudType: 'Payment Fraud',
    risk: 92,
    status: 'Investigating',
    investigator: 'M. Aurelius',
    created: 'Today, 14:22',
    amount: '$142,800',
    severity: 'Critical'
  },
  {
    id: '#FC-9275-B',
    entityType: 'Wallet',
    entity: 'NeoMarket Fintech',
    subtext: 'Corporate Wallet',
    fraudType: 'KYC Anomaly',
    risk: 74,
    status: 'Open',
    investigator: 'Unassigned',
    created: 'Today, 13:58',
    amount: '$42,500',
    severity: 'High'
  },
  {
    id: '#FC-8902-Z',
    entityType: 'User',
    entity: 'Alpha Solutions',
    subtext: 'Individual Tier 2',
    fraudType: 'Account Takeover',
    risk: 28,
    status: 'Closed',
    investigator: 'L. Horne',
    created: 'Yesterday',
    amount: '$8,900',
    severity: 'Low'
  },
  {
    id: '#FC-8112-Q',
    entityType: 'PSP',
    entity: 'Zenith Pay',
    subtext: 'PSP Partner',
    fraudType: 'AML Flag',
    risk: 56,
    status: 'Pending Review',
    investigator: 'S. Jenkins',
    created: 'Oct 24, 2023',
    amount: '$21,400',
    severity: 'Medium'
  }
];

export const riskAlerts = [
  { id: 'ALT-9012', title: 'High Velocity Withdrawal', entity: 'Alexios Vane', level: 'Critical', time: '2m ago', reason: '12 transfers in 45 seconds', score: 98 },
  { id: 'ALT-8841', title: 'IP Geolocation Mismatch', entity: 'OmniVault Alpha', level: 'High', time: '15m ago', reason: 'Session conflicts with active token', score: 82 },
  { id: 'ALT-7721', title: 'Duplicate Device Cluster', entity: 'Flash_Bot_992', level: 'High', time: '24m ago', reason: '18 linked accounts on single device', score: 88 },
  { id: 'ALT-6610', title: 'Sanction List Sync', entity: 'Apex Ventures LLC', level: 'Low', time: '1h ago', reason: 'OFAC list updated and checks passed', score: 18 }
];

export const investigations = [
  { caseId: '#FC-9281-X', investigator: 'Sarah Jenkins', workload: 7, sla: '1h 42m', priority: 'Critical', status: 'Assigned' },
  { caseId: '#FC-9275-B', investigator: 'Marcus Thorne', workload: 5, sla: '3h 12m', priority: 'High', status: 'Assigned' },
  { caseId: '#FC-8112-Q', investigator: 'Leah Horne', workload: 3, sla: '6h 05m', priority: 'Medium', status: 'Open' }
];

export const auditLogs = [
  { time: '14:22:01', actor: 'Risk Engine', action: 'Generated critical score 92', ip: 'system', type: 'System' },
  { time: '14:25:18', actor: 'S. Jenkins', action: 'Opened investigation workspace', ip: '172.20.1.45', type: 'Investigation' },
  { time: '14:31:52', actor: 'M. Aurelius', action: 'Requested wallet freeze approval', ip: '172.20.1.60', type: 'Account Action' },
  { time: '14:40:05', actor: 'Compliance Bot', action: 'AML pattern linked to 3 wallets', ip: 'system', type: 'Risk Changes' }
];

export const intelligenceRows = [
  { id: 'DEV-441-LLP', os: 'Windows 11', ip: '45.12.8.211', users: 8, score: 88, status: 'High Risk', location: 'Singapore', detail: 'Browser automation signature detected' },
  { id: 'DEV-892-XAQ', os: 'macOS 14.2', ip: '192.168.1.104', users: 1, score: 12, status: 'Safe', location: 'New York', detail: 'Known device hash verified' },
  { id: 'DEV-991-OOQ', os: 'Windows 10', ip: '88.2.199.11', users: 12, score: 94, status: 'Blocked', location: 'Minsk', detail: 'Multiple account access within 60m' },
  { id: 'IP-203.0.113.42', os: 'Proxy Node', ip: '203.0.113.42', users: 26, score: 91, status: 'VPN/Proxy', location: 'Tokyo', detail: 'Impossible travel jump detected' }
];

export const recoveryRows = [
  { id: '#RE-9102', entity: 'Global Logistics Inc.', status: 'Frozen', amount: '$42,500.00', recovery: 82 },
  { id: '#RE-8994', entity: 'Apex Tech Solutions', status: 'Disputed', amount: '$12,800.20', recovery: 35 },
  { id: '#RE-8871', entity: 'Unknown Proxy Vendor', status: 'Escalated', amount: '$115,000.00', recovery: 8 },
  { id: '#RE-8840', entity: 'Merchant SV-09', status: 'Frozen', amount: '$5,400.00', recovery: 100 }
];

export const integrationRows = [
  { provider: 'Signzy', product: 'Identity Verification', status: 'Active', uptime: '99.98%', response: '200 OK' },
  { provider: 'Razorpay Risk', product: 'Payment Anomaly Detection', status: 'Degraded', uptime: '94.5%', response: '504 Timeout' },
  { provider: 'MaxMind', product: 'IP & Geo-Intelligence', status: 'Active', uptime: '100.0%', response: '200 OK' }
];

export const riskRules = [
  { rule: 'High Risk Wallet Behavior', logic: 'Risk Score > 85 AND Amount > $10k', freeze: true, block: false, investigate: true, last: '14 mins ago' },
  { rule: 'Cross-Border Velocity', logic: 'Countries > 3 IN 60 minutes', freeze: false, block: true, investigate: true, last: '2 hours ago' },
  { rule: 'First-Time Large Withdrawal', logic: 'History < 7 days AND Withdrawal > $5k', freeze: true, block: false, investigate: true, last: 'Yesterday' }
];

export const pageCatalog = {
  dashboard: {
    key: 'dashboard',
    title: '',
    subtitle: '',
    eyebrow: '',
    variant: 'dashboard',
    cta: 'Export Report',
    secondary: 'Filter View',
    kpis: [
      { label: 'Active Fraud Cases', value: '1,402', delta: '+12%', icon: ShieldAlert, tone: 'danger' },
      { label: 'High Risk Accounts', value: '348', delta: '-3%', icon: AlertOctagon, tone: 'neutral' },
      { label: 'Blocked Accounts', value: '5,912', delta: '+8%', icon: Ban, tone: 'success' },
      { label: 'Open Investigations', value: '124', delta: 'Active', icon: ClipboardList, tone: 'info' },
      { label: 'Fraud Amount Prevented', value: '$1.2M', delta: '+22%', icon: Landmark, tone: 'success' },
      { label: 'Critical Alerts', value: '42', delta: 'Critical', icon: AlertTriangle, tone: 'danger' }
    ]
  },
  cases: {
    key: 'cases',
    title: 'Fraud Operations',
    subtitle: 'Review, assign, and resolve suspicious activity across platform entities.',
    eyebrow: 'Compliance > Fraud Case Listing',
    variant: 'listing',
    cta: 'Initiate New Case',
    secondary: 'Export CSV'
  },
  caseDetails: {
    key: 'caseDetails',
    title: 'Case #F-9204-X',
    subtitle: 'Suspicious high-velocity transfer patterns triggered 14m ago.',
    eyebrow: 'Fraud Case Detail',
    variant: 'caseDetails',
    cta: 'Resolve Case',
    secondary: 'Evidence Viewer'
  },
  riskMonitoring: {
    key: 'riskMonitoring',
    title: 'Risk Monitoring Center',
    subtitle: 'Live risk signals, active alerts, and escalation controls.',
    variant: 'monitoring',
    cta: 'Export Report',
    secondary: 'Filter View',
    kpis: [
      { label: 'Critical Severity', value: '04', delta: '+2 since 1h', icon: ShieldX, tone: 'danger' },
      { label: 'High Severity', value: '12', delta: '-4 since 1h', icon: AlertTriangle, tone: 'danger' },
      { label: 'Medium Severity', value: '38', delta: 'Stable', icon: BellRing, tone: 'info' },
      { label: 'Low Severity', value: '91', delta: 'Automated', icon: ShieldCheck, tone: 'success' }
    ]
  },
  user: {
    key: 'user',
    title: 'User Fraud Monitoring',
    subtitle: 'Real-time analysis of identity abuse and multi-accounting vectors.',
    variant: 'entity',
    cta: 'New Rule',
    secondary: 'Export Report',
    kpis: [
      { label: 'Fake Accounts', value: '1,284', delta: '+12.4%', icon: UserX, tone: 'danger' },
      { label: 'Multiple Accounts', value: '452', delta: '-3.2%', icon: UserCheck, tone: 'success' },
      { label: 'Device Sharing', value: '318', delta: '+8.7%', icon: Laptop, tone: 'danger' },
      { label: 'Referral Abuse', value: '94', delta: '+5.1%', icon: Link2, tone: 'info' }
    ]
  },
  partner: { key: 'partner', title: 'Partner Fraud Monitoring', subtitle: 'Monitor fake services, branch anomalies, reviews, and revenue abuse.', variant: 'entity', cta: 'Terminate Partner', secondary: 'Review Queue', kpis: [{ label: 'Fake Services', value: '42', icon: Briefcase, tone: 'danger' }, { label: 'Branch Flags', value: '18', icon: Building2, tone: 'info' }, { label: 'Revenue Impact', value: '$88.4k', icon: CircleDollarSign, tone: 'danger' }] },
  employee: { key: 'employee', title: 'Employee Fraud Monitoring', subtitle: 'Audit attendance mismatch, GPS spoofing, and booking completion suspicion.', variant: 'entity', cta: 'Escalate', secondary: 'Export', kpis: [{ label: 'Fake Attendance', value: '31', icon: UserCog, tone: 'danger' }, { label: 'GPS Spoofing', value: '14', icon: MapPinned, tone: 'danger' }, { label: 'Completion Flags', value: '27', icon: ClipboardCheck, tone: 'info' }] },
  booking: { key: 'booking', title: 'Booking Fraud Monitoring', subtitle: 'Track refund abuse, repeated cancellations, and service manipulation.', variant: 'tableFocus', cta: 'Freeze Booking', secondary: 'Filter', kpis: [{ label: 'Fake Bookings', value: '284', icon: FileClock, tone: 'danger' }, { label: 'Refund Abuse', value: '63', icon: RotateCcw, tone: 'danger' }, { label: 'Service Manipulation', value: '19', icon: Bot, tone: 'info' }] },
  wallet: { key: 'wallet', title: 'Wallet Fraud Monitoring', subtitle: 'Velocity, suspicious credits, withdrawals, and chargeback abuse.', variant: 'wallet', cta: 'Freeze Wallet', secondary: 'Batch Process', kpis: [{ label: 'Suspicious Credits', value: '$428,904.00', icon: Wallet, tone: 'danger' }, { label: 'Multiple Withdrawals', value: '1,482', icon: CircleDollarSign, tone: 'info' }, { label: 'Chargeback Abuse', value: '2.4%', icon: CreditCard, tone: 'danger' }] },
  payment: { key: 'payment', title: 'Payment Fraud Monitoring', subtitle: 'Stolen cards, reversals, failed attempts, and chargeback review.', variant: 'tableFocus', cta: 'Block Gateway Pattern', secondary: 'Review', kpis: [{ label: 'Stolen Cards', value: '48', icon: CreditCard, tone: 'danger' }, { label: 'Payment Reversals', value: '$76.2k', icon: RotateCcw, tone: 'danger' }, { label: 'Failed Attempts', value: '1,908', icon: AlertOctagon, tone: 'info' }] },
  referral: { key: 'referral', title: 'Referral Fraud Monitoring', subtitle: 'Detect self-referrals, reward farming, and device duplication loops.', variant: 'tableFocus', cta: 'Reject Rewards', secondary: 'Freeze Rewards', kpis: [{ label: 'Self Referrals', value: '312', icon: Link2, tone: 'danger' }, { label: 'Reward Farming', value: '$42.8k', icon: CircleDollarSign, tone: 'danger' }, { label: 'Device Match', value: '87%', icon: Fingerprint, tone: 'info' }] },
  kyc: { key: 'kyc', title: 'KYC Fraud Monitoring', subtitle: 'Review fake documents, duplicate identities, and face-match failures.', variant: 'review', cta: 'Reject KYC', secondary: 'Escalate', kpis: [{ label: 'Fake Aadhaar', value: '18', icon: FileCheck2, tone: 'danger' }, { label: 'Duplicate Identity', value: '72', icon: Fingerprint, tone: 'danger' }, { label: 'Face Match Failure', value: '11%', icon: UserX, tone: 'info' }] },
  device: { key: 'device', title: 'Device Intelligence Center', subtitle: 'Hardware-level risk assessment and fingerprinting.', variant: 'intelligence', cta: 'Refresh Nodes', secondary: 'Export Data', kpis: [{ label: 'Unique Devices', value: '42,891', icon: Smartphone, tone: 'info' }, { label: 'Shared Devices', value: '1,402', icon: Network, tone: 'danger' }, { label: 'Blocked Devices', value: '618', icon: Ban, tone: 'danger' }] },
  ip: { key: 'ip', title: 'IP Intelligence Center', subtitle: 'Identify proxy, VPN, geolocation, and velocity anomalies.', variant: 'intelligence', cta: 'Block IP', secondary: 'Whitelist', kpis: [{ label: 'Suspicious IPs', value: '811', icon: Globe2, tone: 'danger' }, { label: 'Blocked IPs', value: '293', icon: Ban, tone: 'danger' }, { label: 'VPN Usage', value: '2.1k', icon: Radar, tone: 'info' }] },
  geo: { key: 'geo', title: 'Geo Fraud Intelligence', subtitle: 'Real-time geospatial anomaly monitoring and risk zone analysis.', variant: 'geo', cta: 'Adjust Parameters', secondary: 'Filters', kpis: [{ label: 'Impossible Travel', value: '42', icon: MapPinned, tone: 'danger' }, { label: 'GPS Spoofing Detected', value: '158', icon: Radar, tone: 'success' }, { label: 'High Risk Zones', value: '09', icon: Globe2, tone: 'danger' }, { label: 'Geo-Fenced Alerts', value: '2.1k', icon: BellRing, tone: 'info' }] },
  blacklist: { key: 'blacklist', title: 'Blacklist Management', subtitle: 'Centralized repository for restricted access across users, partners, hardware, and gateways.', variant: 'accessList', cta: 'Add to Blacklist', secondary: 'Review', kpis: [{ label: 'Total Blocked Users', value: '1,429', icon: UserX, tone: 'info' }, { label: 'Restricted IPs', value: '8,112', icon: Ban, tone: 'danger' }, { label: 'Flagged Partners', value: '42', icon: Briefcase, tone: 'success' }] },
  investigations: { key: 'investigations', title: 'Investigation Center', subtitle: 'Queue, workload, SLA, and assignment management for fraud investigators.', variant: 'investigations', cta: 'Assign Investigator', secondary: 'Export Queue' },
  workspace: { key: 'workspace', title: 'Investigator Workspace', subtitle: 'Review evidence, inspect risk signals, and take controlled account action.', variant: 'workspace', cta: 'Close Case', secondary: 'Mark Safe' },
  alerts: { key: 'alerts', title: 'Fraud Alerts Center', subtitle: 'Severity-based alert feed for acknowledgement, assignment, and resolution.', variant: 'alerts', cta: 'Resolve Selected', secondary: 'Acknowledge' },
  risk: { key: 'risk', title: 'Risk Scoring Engine', subtitle: 'Configure heuristic and algorithmic weights for transaction risk scores.', variant: 'riskEngine', cta: 'Deploy Configuration', secondary: 'Discard Changes' },
  compliance: { key: 'compliance', title: 'Regulatory Health Overview', subtitle: 'Track compliance issues, regulatory alerts, and pending reviews.', variant: 'compliance', cta: 'Export PDF', secondary: 'Last 30 Days' },
  aml: { key: 'aml', title: 'AML Monitoring', subtitle: 'Anti money laundering signals across large transactions and wallet networks.', variant: 'aml', cta: 'Escalate AML Case', secondary: 'Freeze Wallets' },
  analytics: { key: 'analytics', title: 'Fraud Analytics', subtitle: 'Trend analysis across fraud type, risk growth, and resolution velocity.', variant: 'analytics', cta: 'Export Analysis', secondary: 'Date Range' },
  heatmap: { key: 'heatmap', title: 'Fraud Heatmap', subtitle: 'Fraud density, city risk, state risk, and active hot zones.', variant: 'heatmap', cta: 'Export Full Report', secondary: 'Filter Risk' },
  reports: { key: 'reports', title: 'Fraud Reports', subtitle: 'Generate fraud case, risk, investigation, blacklist, and AML reports.', variant: 'reports', cta: 'Download Report', secondary: 'Manage Schedules' },
  resolution: { key: 'resolution', title: 'Case Resolution Center', subtitle: 'Document final action, notes, and closure confirmation.', variant: 'resolution', cta: 'Close Case', secondary: 'Save Draft' },
  whitelist: { key: 'whitelist', title: 'Whitelist Management', subtitle: 'Manage trusted users, partners, devices, IPs, and wallets.', variant: 'accessList', cta: 'Add to Whitelist', secondary: 'Remove Selected' },
  automation: { key: 'automation', title: 'Fraud Automation Rules', subtitle: 'Define logic-based actions for transaction flows and entity behavior.', variant: 'automation', cta: 'Create New Rule', secondary: 'All Modules' },
  communication: { key: 'communication', title: 'Fraud Communication Center', subtitle: 'Configure and dispatch secure messaging to flagged accounts.', variant: 'communication', cta: 'Dispatch Message', secondary: 'Save as Draft' },
  audit: { key: 'audit', title: 'Fraud Audit Center', subtitle: 'System, investigation, risk changes, and account action logs.', variant: 'audit', cta: 'Export Audit', secondary: 'Filter Logs' },
  executive: { key: 'executive', title: 'Executive Risk Dashboard', subtitle: 'Top-level risk posture, loss prevention, compliance, and live alerts.', variant: 'executive', cta: 'Refine Metrics', secondary: 'Last 30 Days', kpis: [{ label: 'Total Risk Exposure', value: '$4.2M', icon: Wallet, tone: 'info' }, { label: 'Fraud Prevented Value', value: '$12.8M', icon: ShieldCheck, tone: 'success' }, { label: 'Compliance Score', value: '98.4/100', icon: ClipboardCheck, tone: 'info' }] },
  assignment: { key: 'assignment', title: 'Case Assignment Center', subtitle: 'Assign investigator workload and track priority SLAs.', variant: 'assignment', cta: 'Reassign Case', secondary: 'Export SLA' },
  recovery: { key: 'recovery', title: 'Fraud Recovery Center', subtitle: 'Asset reclamation and dispute management hub.', variant: 'recovery', cta: 'Initiate Chargeback Dispute', secondary: 'Legal Escalation' },
  integrations: { key: 'integrations', title: 'Third-Party Risk Integrations', subtitle: 'Monitor provider health, API status, and webhook activity.', variant: 'integrations', cta: 'Add Provider', secondary: 'Refresh Status' },
  settings: { key: 'settings', title: 'Fraud Settings', subtitle: 'Risk rules, blacklist logic, fraud thresholds, AML, escalation, and compliance settings.', variant: 'settings', cta: 'Save Configuration', secondary: 'Reset' }
};
