import React, { useMemo, useState } from 'react';
import {
  AlertTriangle,
  Ban,
  CheckCircle2,
  ChevronDown,
  Download,
  Eye,
  FileText,
  Filter,
  Fingerprint,
  Lock,
  MoreVertical,
  Plus,
  RefreshCw,
  Send,
  Settings2,
  ShieldAlert,
  ShieldCheck,
  SlidersHorizontal,
  Unlock,
  UserPlus,
  X
} from 'lucide-react';
import AdminShell from '../../components/layouts/AdminShell';
import { ROUTES } from '../../config/routes';
import { useApp } from '../../hooks/useApp';
import { useToast } from '../../components/common/ToastNotification';
import {
  auditLogs,
  fraudCases,
  integrationRows,
  pageCatalog,
  recoveryRows,
  riskAlerts,
  riskRules
} from './data';

import Select from "../../components/ui/Select";

const routePageMap = {
  [ROUTES.fraudCenter]: 'dashboard',
  [ROUTES.fraudDashboard]: 'dashboard',
  [ROUTES.fraudCases]: 'cases',
  [ROUTES.fraudCaseDetails]: 'caseDetails',
  [ROUTES.fraudRiskMonitoring]: 'riskMonitoring',
  [ROUTES.fraudUser]: 'user',
  [ROUTES.fraudPartner]: 'partner',
  [ROUTES.fraudEmployee]: 'employee',
  [ROUTES.fraudBooking]: 'booking',
  [ROUTES.fraudWallet]: 'wallet',
  [ROUTES.fraudPayment]: 'payment',
  [ROUTES.fraudReferral]: 'referral',
  [ROUTES.fraudKyc]: 'kyc',
  [ROUTES.fraudDevice]: 'device',
  [ROUTES.fraudIp]: 'ip',
  [ROUTES.fraudGeo]: 'geo',
  [ROUTES.blacklistManagement]: 'blacklist',
  [ROUTES.fraudInvestigations]: 'investigations',
  [ROUTES.fraudWorkspace]: 'workspace',
  [ROUTES.fraudAlerts]: 'alerts',
  [ROUTES.fraudRisk]: 'risk',
  [ROUTES.fraudCompliance]: 'compliance',
  [ROUTES.fraudAml]: 'aml',
  [ROUTES.fraudAnalytics]: 'analytics',
  [ROUTES.fraudHeatmap]: 'heatmap',
  [ROUTES.fraudReports]: 'reports',
  [ROUTES.fraudResolution]: 'resolution',
  [ROUTES.whitelistManagement]: 'whitelist',
  [ROUTES.fraudAutomation]: 'automation',
  [ROUTES.fraudCommunication]: 'communication',
  [ROUTES.fraudAudit]: 'audit',
  [ROUTES.fraudExecutive]: 'executive',
  [ROUTES.fraudAssignment]: 'assignment',
  [ROUTES.fraudRecovery]: 'recovery',
  [ROUTES.fraudIntegrations]: 'integrations',
  [ROUTES.fraudSettings]: 'settings'
};

const defaultKpis = [
  { label: 'Open Cases', value: '248', delta: '+14', icon: ShieldAlert, tone: 'danger' },
  { label: 'Avg Risk Score', value: '72', delta: 'High', icon: AlertTriangle, tone: 'warning' },
  { label: 'Closed Today', value: '31', delta: '+8%', icon: ShieldCheck, tone: 'success' }
];

const tabs = ['Overview', 'Risk Analysis', 'Evidence', 'Related Accounts', 'Actions Taken', 'Timeline', 'Audit Logs'];

export default function FraudCenter() {
  const { route, navigate } = useApp();
  const [activeTab, setActiveTab] = useState('Overview');
  const [modal, setModal] = useState(null);
  const [drawer, setDrawer] = useState(null);
  const [notice, setNotice] = useState('');

  const page = useMemo(() => pageCatalog[routePageMap[route] || 'dashboard'], [route]);

  const openModal = (type) => setModal(type);
  const openDrawer = (type) => setDrawer(type);
  const completeAction = (message) => {
    setModal(null);
    setDrawer(null);
    setNotice(message);
  };

  return (
    <AdminShell
      activeTab="Fraud Management"
      headerTitle="Fraud Management & Risk Control"
      searchPlaceholder="Search case ID, entity, wallet, device, or IP..."
    >
      <main className={`fraud-page fraud-page-${page.variant}`}>
        <PageHeader page={page} onModal={openModal} onDrawer={openDrawer} />
        {notice && (
          <div className="fraud-notice">
            <CheckCircle2 size={18} />
            <span>{notice}</span>
            <button type="button" onClick={() => setNotice('')}><X size={16} /></button>
          </div>
        )}
        <PageBody
          page={page}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          navigate={navigate}
          onModal={openModal}
          onDrawer={openDrawer}
        />
      </main>
      {modal && <FraudModal type={modal} onClose={() => setModal(null)} onComplete={completeAction} />}
      {drawer && <FraudDrawer type={drawer} onClose={() => setDrawer(null)} onComplete={completeAction} />}
    </AdminShell>
  );
}

function PageHeader({ page, onModal, onDrawer }) {
  const hasText = Boolean(page.eyebrow || page.title || page.subtitle);
  return (
    <section className="fraud-page-head" style={!hasText ? { justifyContent: 'flex-end', marginBottom: '12px' } : {}}>
      {hasText && (
        <div>
          {page.eyebrow && <p className="fraud-eyebrow">{page.eyebrow}</p>}
          {page.title && <h1 className="fraud-title">{page.title}</h1>}
          {page.subtitle && <p className="fraud-subtitle">{page.subtitle}</p>}
        </div>
      )}
      <div className="fraud-actions">
        {page.secondary && (
          <button className="fraud-btn ghost" type="button" onClick={() => onDrawer('report')}>
            {secondaryIcon(page.secondary)}
            {page.secondary}
          </button>
        )}
        {page.cta && (
          <button className="fraud-btn primary" type="button" onClick={() => primaryAction(page, onModal, onDrawer)}>
            {primaryIcon(page.cta)}
            {page.cta}
          </button>
        )}
      </div>
    </section>
  );
}

function secondaryIcon(label) {
  if (/filter|range|last|all/i.test(label)) return <Filter size={18} />;
  if (/export|download|report/i.test(label)) return <Download size={18} />;
  return <SlidersHorizontal size={18} />;
}

function primaryIcon(label) {
  if (/case|rule|provider|blacklist|whitelist/i.test(label)) return <Plus size={18} />;
  if (/freeze|lock/i.test(label)) return <Lock size={18} />;
  if (/dispatch|message/i.test(label)) return <Send size={18} />;
  if (/configuration|refresh/i.test(label)) return <RefreshCw size={18} />;
  return <ShieldCheck size={18} />;
}

function primaryAction(page, onModal, onDrawer) {
  if (/new case|initiate/i.test(page.cta)) return onModal('create-case');
  if (/freeze/i.test(page.cta)) return onDrawer('freeze-wallet');
  if (/blacklist/i.test(page.cta)) return onModal('blacklist');
  if (/whitelist/i.test(page.cta)) return onModal('whitelist');
  if (/assign|reassign/i.test(page.cta)) return onModal('assignment');
  if (/report|download|export/i.test(page.cta)) return onDrawer('report');
  if (/dispatch/i.test(page.cta)) return onModal('communication');
  if (/provider/i.test(page.cta)) return onModal('integration');
  if (/resolve|close/i.test(page.cta)) return onModal('resolution');
  return onModal('case-action');
}

function PageBody(props) {
  const { page } = props;
  if (page.variant === 'dashboard') return <DashboardPage {...props} />;
  if (page.variant === 'caseDetails') return <CaseDetailsPage {...props} />;
  if (page.variant === 'riskEngine') return <RiskEnginePage {...props} />;
  if (page.variant === 'accessList') return <AccessListPage {...props} />;
  if (page.variant === 'workspace') return <WorkspacePage {...props} />;
  if (page.variant === 'communication') return <CommunicationPage {...props} />;
  if (page.variant === 'reports') return <ReportsPage {...props} />;
  if (page.variant === 'integrations') return <IntegrationsPage {...props} />;
  if (page.variant === 'settings') return <SettingsPage {...props} />;
  if (page.variant === 'geo' || page.variant === 'heatmap') return <GeoPage {...props} />;
  if (page.variant === 'recovery') return <RecoveryPage {...props} />;
  if (page.variant === 'automation') return <AutomationPage {...props} />;
  if (page.variant === 'audit') return <AuditPage {...props} />;
  return <GenericFraudPage {...props} />;
}

function DashboardPage({ page, navigate, onDrawer }) {
  return (
    <>
      <KpiGrid items={page.kpis} />
      <section className="fraud-main-grid">
        <ChartCard title="Fraud Trends" subtitle="Detected anomalies vs. confirmed incidents over 30 days" />
        <RiskDistribution />
        <FraudTable title="High Risk Users" rows={fraudCases} navigate={navigate} onDrawer={onDrawer} />
        <AlertsPanel onDrawer={onDrawer} />
        <DarkInsight title="Network Security Shield" text="Behavioral analysis is scanning active sessions and wallet networks." />
      </section>
    </>
  );
}

function GenericFraudPage({ page, navigate, onModal, onDrawer }) {
  const { addToast } = useToast();
  const kpis = page.kpis || defaultKpis;
  return (
    <>
      <KpiGrid items={kpis} />
      <section className="fraud-filter-card">
        {['Fraud Type', 'Risk Score Range', 'Status', 'Investigator'].map((label) => (
          <label key={label}>
            <span>{label}</span>
            <Select
              onChange={(e) => addToast(`Filter applied: ${e.target.value}`, 'success')}
              style={{ width: '100%', borderRadius: '8px', border: '1px solid var(--border-color)', backgroundColor: 'var(--surface-color)', color: 'var(--text-primary)' }}
              options={[
                { value: `All ${label.split(' ')[0]}`, label: `All ${label.split(' ')[0]}` },
                ...(label === 'Fraud Type' ? ['Financial', 'Identity', 'Operational'].map(v => ({ value: v, label: v })) : []),
                ...(label === 'Risk Score Range' ? ['Critical (90-100)', 'High (70-89)', 'Medium (40-69)', 'Low (0-39)'].map(v => ({ value: v, label: v })) : []),
                ...(label === 'Status' ? ['Open', 'Investigating', 'Resolved'].map(v => ({ value: v, label: v })) : []),
                ...(label === 'Investigator' ? ['Alex Mercer', 'Sarah Connor', 'Unassigned'].map(v => ({ value: v, label: v })) : [])
              ]}
            />
          </label>
        ))}
        <button className="fraud-btn soft" type="button" onClick={() => addToast('Advanced Filters Opened', 'info')}><Filter size={18} />Advanced Filters</button>
      </section>
      <section className="fraud-main-grid">
        <FraudTable title={tableTitle(page)} rows={fraudCases} navigate={navigate} onDrawer={onDrawer} />
        <SidePanel page={page} onModal={onModal} onDrawer={onDrawer} />
        <ChartCard title={`${page.title} Trend`} subtitle="30-day velocity, risk, and resolution profile" />
        <AlertsPanel onDrawer={onDrawer} />
      </section>
    </>
  );
}

function CaseDetailsPage({ activeTab, setActiveTab, onModal, onDrawer }) {
  return (
    <>
      <section className="fraud-case-hero">
        <div className="fraud-icon-tile danger"><AlertTriangle size={28} /></div>
        <div>
          <h2>Case #F-9204-X <span className="fraud-pill danger">Critical</span></h2>
          <p>Suspicious high-velocity transfer patterns. Triggered 14 minutes ago.</p>
        </div>
        <dl>
          <div><dt>Risk Score</dt><dd>98/100</dd></div>
          <div><dt>Entity</dt><dd>Alexios Vane</dd></div>
          <div><dt>Exposure</dt><dd>$142,800</dd></div>
        </dl>
      </section>
      <nav className="fraud-tabs" aria-label="Case detail tabs">
        {tabs.map((tab) => (
          <button key={tab} className={activeTab === tab ? 'active' : ''} type="button" onClick={() => setActiveTab(tab)}>
            {tab}
          </button>
        ))}
      </nav>
      <section className="fraud-main-grid">
        <div className="fraud-card wide">
          {renderDetailTab(activeTab, onDrawer)}
        </div>
        <aside className="fraud-card action-card">
          <h3>Immediate Actions</h3>
          <button className="fraud-btn primary full" type="button" onClick={() => onDrawer('freeze-wallet')}><Lock size={18} />Freeze Wallet</button>
          <button className="fraud-btn danger-outline full" type="button" onClick={() => onDrawer('suspend-account')}><Ban size={18} />Suspend Account</button>
          <button className="fraud-btn ghost full" type="button" onClick={() => onModal('assignment')}><UserPlus size={18} />Escalate to Compliance</button>
          <textarea placeholder="Reason for action..." />
        </aside>
      </section>
    </>
  );
}

function renderDetailTab(activeTab, onDrawer) {
  if (activeTab === 'Evidence') {
    return (
      <>
        <h3>Evidence Vault</h3>
        <div className="fraud-evidence-grid">
          <div className="fraud-map dark">Video Capture<br /><span>CAM-04 | 22:14:02</span></div>
          <div className="fraud-mini-card">Audio Log<br /><strong>02:44</strong></div>
          <div className="fraud-mini-card">Device Hash<br /><strong>DEV-441-LLP</strong></div>
        </div>
      </>
    );
  }
  if (activeTab === 'Timeline' || activeTab === 'Audit Logs') return <AuditTimeline />;
  if (activeTab === 'Risk Analysis') return <RiskSignals onDrawer={onDrawer} />;
  return (
    <>
      <h3>Case Summary</h3>
      <p className="fraud-copy">The monitoring engine detected 12 rapid outbound transfers to unrecognized wallets within a 45-second window. Account access originated from an anomalous device and a residential IP that conflicts with primary KYC location.</p>
      <div className="fraud-four">
        {['IP Anomaly', 'Velocity Spike', 'Wallet Rotation', 'Device Fingerprint'].map((item) => (
          <div className="fraud-mini-card" key={item}>
            <Fingerprint size={22} />
            <strong>{item}</strong>
            <span>Critical Flag</span>
          </div>
        ))}
      </div>
    </>
  );
}

function RiskEnginePage({ page }) {
  return (
    <section className="fraud-split">
      <div>
        <KpiGrid items={page.kpis || defaultKpis} />
        <div className="fraud-card">
          <CardTitle icon={Settings2} title="Risk Formula Builder" />
          {[
            ['Booking Risk', 45],
            ['Wallet Risk', 30],
            ['Device Risk', 25]
          ].map(([label, value]) => (
            <div className="fraud-slider-row" key={label}>
              <div><strong>{label}</strong><span>{value}%</span></div>
              <div className="fraud-line"><i style={{ width: `${value}%` }} /></div>
            </div>
          ))}
          <button className="fraud-dashed" type="button" onClick={() => addToast('Parameter Added', 'success')}><Plus size={18} />Add Custom Parameter</button>
        </div>
        <DarkInsight title="Real-time Simulation" text="Projected impact: 14.2% approval rate drop, +$124k potential fraud saved, 0.8% false positive rate." />
      </div>
      <div>
        <div className="fraud-card">
          <CardTitle icon={SlidersHorizontal} title="Threshold Settings" />
          <div className="fraud-threshold"><span>Low</span><span>Medium</span><span>High</span></div>
          <div className="fraud-form-grid">
            <label>Auto-Reject Threshold<input value="75" readOnly /></label>
            <label>Manual Review Range<input value="30 to 75" readOnly /></label>
          </div>
        </div>
        <pre className="fraud-code">{`{
  "engine": "HOZIFY_V4",
  "scoring": {
    "booking_weight": 0.45,
    "wallet_weight": 0.30,
    "device_weight": 0.25
  },
  "auto_reject": 75
}`}</pre>
      </div>
    </section>
  );
}

function AccessListPage({ page, onModal, navigate, onDrawer }) {
  const whitelist = page.key === 'whitelist';
  return (
    <>
      <KpiGrid items={page.kpis || defaultKpis} />
      <section className="fraud-access-grid">
        <div className="fraud-card">
          <CardTitle icon={Plus} title={`Bulk Add ${whitelist ? 'Whitelist' : 'Blocklist'}`} />
          <textarea placeholder="Paste multiple identifiers separated by commas..." />
          <button className="fraud-btn primary full" type="button" onClick={() => onModal(whitelist ? 'whitelist' : 'blacklist')}>
            Execute Bulk Import
          </button>
        </div>
        <FraudTable title={`Active ${whitelist ? 'Whitelist' : 'Blocklist'}`} rows={fraudCases} navigate={navigate} onDrawer={onDrawer} />
      </section>
    </>
  );
}

function WorkspacePage({ onDrawer, onModal }) {
  return (
    <section className="fraud-workspace">
      <div className="fraud-card">
        <h3>Global Retailers Ltd.</h3>
        <span className="fraud-pill danger">Urgent Investigation</span>
        <dl className="fraud-meta-list">
          <div><dt>Entity Registration</dt><dd>REG-US-2026-912803</dd></div>
          <div><dt>Target Account</dt><dd>Wallet **** 9012</dd></div>
          <div><dt>Verification History</dt><dd>KYC passed, document match pending</dd></div>
        </dl>
      </div>
      <div className="fraud-card">
        <CardTitle icon={FileText} title="Evidence Viewer" />
        <div className="fraud-document">Statement<br /><span>Highlighted suspicious transfer rows</span></div>
      </div>
      <aside className="fraud-card action-card">
        <h3>AI Audit Confidence</h3>
        <RiskBar value={98} />
        <ul className="fraud-checklist">
          <li>Entity names match 1:1</li>
          <li>Device checksum valid</li>
          <li>Scan quality threshold warning</li>
        </ul>
        <button className="fraud-btn primary full" onClick={() => onModal('resolution')} type="button">Approve Action</button>
        <button className="fraud-btn ghost full" onClick={() => onDrawer('evidence')} type="button">Open Evidence Drawer</button>
      </aside>
    </section>
  );
}

function CommunicationPage({ onModal }) {
  return (
    <section className="fraud-split">
      <div>
        <div className="fraud-three">
          {['Fraud Alert', 'Account Suspended', 'Verification Required'].map((title) => (
            <div className="fraud-card" key={title}>
              <AlertTriangle size={28} />
              <h3>{title}</h3>
              <p>Secure template for risk mitigation notice.</p>
            </div>
          ))}
        </div>
        <div className="fraud-card">
          <div className="fraud-form-grid">
            <label>Recipient User ID<input value="USR-9920-XQ" readOnly /></label>
            <label>Dispatch Method<input value="Priority (Email + SMS + Push)" readOnly /></label>
          </div>
          <label className="fraud-field">Subject Line<input value="Urgent: Suspicious activity detected on your HOZIFY account" readOnly /></label>
          <label className="fraud-field">Message Body<textarea value={'Hello {user_name},\n\nOur system detected a login attempt from a new location. We have temporarily limited outgoing transfers as a precaution.\n\nClick the link below to verify your recent activity.'} readOnly /></label>
          <div className="fraud-actions right"><button className="fraud-btn ghost" type="button" onClick={() => addToast('Draft Saved', 'success')}>Save as Draft</button><button className="fraud-btn primary" type="button" onClick={() => onModal('communication')}>Dispatch Message</button></div>
        </div>
      </div>
      <div className="fraud-card phone-preview">
        <h3>Live Preview</h3>
        <div className="fraud-phone">
          <div className="fraud-message">HOZIFY Alert: unusual activity detected. Tap to review.</div>
          <div className="fraud-image-tile">Security Shield</div>
          <button type="button" onClick={() => addToast('Secure Link Clicked', 'info')}>Secure Account</button>
        </div>
      </div>
    </section>
  );
}

function ReportsPage() {
  const { addToast } = useToast();
  return (
    <section className="fraud-split">
      <div>
        <div className="fraud-report-tabs">
          {['Case Report', 'Risk Report', 'Investigation Report', 'AML Report'].map((tab, index) => <button className={index === 0 ? 'active' : ''} key={tab} type="button" onClick={() => addToast(`Switched to ${tab}`, 'info')}>{tab}</button>)}
        </div>
        <div className="fraud-card">
          <CardTitle icon={Filter} title="Configuration Parameters" />
          <div className="fraud-form-grid">
            <label>Date Range<input value="Oct 01, 2026 - Oct 14, 2026" readOnly /></label>
            <label>Report Type<input value="Institutional Fraud" readOnly /></label>
          </div>
        </div>
        <AuditTable />
      </div>
      <aside className="fraud-card action-card">
        <h3>Generate Export</h3>
        <div className="fraud-format-grid"><button onClick={() => addToast('PDF format selected', 'info')}>PDF</button><button className="active" onClick={() => addToast('Excel format selected', 'info')}>Excel</button><button onClick={() => addToast('CSV format selected', 'info')}>CSV</button></div>
        <button className="fraud-btn primary full" type="button" onClick={() => addToast('Report Downloaded', 'success')}><Download size={18} />Download Report</button>
      </aside>
    </section>
  );
}

function IntegrationsPage() {
  return (
    <>
      <section className="fraud-split">
        <ChartCard title="Integration Health" subtitle="API success rate vs latency in the last 24h" />
        <div className="fraud-stack">
          <KpiCard item={{ label: 'Total API Calls', value: '1.2M', delta: '+14.2%', icon: ShieldCheck, tone: 'success' }} />
          <KpiCard item={{ label: 'Avg. Response Time', value: '184ms', delta: '+12ms', icon: AlertTriangle, tone: 'danger' }} />
        </div>
      </section>
      <section className="fraud-three">
        {integrationRows.map((row) => <ProviderCard key={row.provider} row={row} />)}
      </section>
      <WebhookTable />
    </>
  );
}

function SettingsPage() {
  const { addToast } = useToast();
  return (
    <section className="fraud-split">
      <div>
        <div className="fraud-card">
          <CardTitle icon={Settings2} title="Risk & Treasury Logic" />
          <div className="fraud-toggle-row"><button className="active" onClick={() => addToast('Switched to T+1', 'info')}>T + 1</button><button onClick={() => addToast('Switched to T+2', 'info')}>T + 2</button><button onClick={() => addToast('Switched to Same Day', 'info')}>Same Day</button></div>
          <label className="fraud-field">Maximum daily freeze limit<input value="$5,000,000.00" readOnly /></label>
        </div>
        <AutomationPage compact />
      </div>
      <aside>
        <div className="fraud-card">
          <CardTitle icon={ShieldCheck} title="Verification Protocols" />
          <div className="fraud-setting-row">Penny-Drop Verification <span>ON</span></div>
          <div className="fraud-setting-row">VPA Pattern Matching <span>ON</span></div>
          <label className="fraud-field">Max Verification Retries<input value="Unlimited (Flag After 3)" readOnly /></label>
        </div>
        <DarkInsight title="Policy Version" text="v4.12.0-rc2. Last verified by Admin: Marcus Thorne." />
      </aside>
    </section>
  );
}

function GeoPage({ page, navigate, onDrawer }) {
  return (
    <>
      <KpiGrid items={page.kpis || defaultKpis} />
      <section className="fraud-geo-grid">
        <MapPlaceholder title={page.variant === 'heatmap' ? 'Risk Density Heatmap' : 'Geo-Velocity Map'} />
        <div>
          <AlertsPanel onDrawer={onDrawer} />
          <DarkInsight title="Automated Rules" text="Three active geo-fences are blocking transactions from high-risk ranges." />
        </div>
      </section>
      <FraudTable title="Suspicious Geo-events Registry" rows={fraudCases} navigate={navigate} onDrawer={onDrawer} />
    </>
  );
}

function RecoveryPage() {
  return (
    <>
      <KpiGrid items={[
        { label: 'Recovered Amount', value: '$2,482,190.00', icon: ShieldCheck, tone: 'success' },
        { label: 'Frozen Amount', value: '$841,500.50', icon: Lock, tone: 'info' },
        { label: 'Lost Amount', value: '$124,300.00', icon: AlertTriangle, tone: 'danger' }
      ]} />
      <section className="fraud-main-grid">
        <AuditTimeline title="Recovery Timeline" />
        <RecoveryTable />
        <MapPlaceholder title="Geographical Recovery Yield" />
      </section>
    </>
  );
}

function AutomationPage({ compact = false }) {
  const { addToast } = useToast();
  return (
    <div className={compact ? '' : 'fraud-main-grid'}>
      {!compact && <KpiGrid items={[{ label: 'Active Rules', value: '124', tone: 'info' }, { label: 'Auto-Freezes', value: '42', tone: 'danger' }, { label: 'Intervention Rate', value: '8.4%', tone: 'success' }]} />}
      <div className="fraud-card wide">
        <div className="fraud-card-head"><h3>Active Logic Sequences</h3><button onClick={() => addToast('Module filtered', 'info')}>All Modules</button></div>
        {riskRules.map((rule) => (
          <div className="fraud-rule-row" key={rule.rule}>
            <div><strong>{rule.rule}</strong><span>{rule.logic}</span></div>
            <Toggle on={rule.freeze} />
            <Toggle on={rule.block} />
            <Toggle on={rule.investigate} />
            <span>{rule.last}</span>
          </div>
        ))}
      </div>
      {!compact && <DarkInsight title="Global Safety Mode" text="Aggressive filtering is currently OFF. Enable it during elevated threat windows." />}
    </div>
  );
}

function AuditPage() {
  return (
    <>
      <KpiGrid items={[{ label: 'System Events', value: '18,204' }, { label: 'Investigation Logs', value: '921' }, { label: 'Action Locks', value: '42' }]} />
      <AuditTable />
    </>
  );
}

function KpiGrid({ items = defaultKpis }) {
  return (
    <section className="fraud-kpi-grid">
      {items.map((item) => <KpiCard item={item} key={item.label} />)}
    </section>
  );
}

function KpiCard({ item }) {
  const Icon = item.icon || ShieldAlert;
  return (
    <article className={`fraud-card fraud-kpi ${item.tone || 'neutral'}`}>
      <div className="fraud-kpi-top">
        <span className="fraud-icon-tile"><Icon size={24} /></span>
        {item.delta && <span className="fraud-delta">{item.delta}</span>}
      </div>
      <span>{item.label}</span>
      <strong>{item.value}</strong>
    </article>
  );
}

function FraudTable({ title, rows = fraudCases, navigate, onDrawer }) {
  const { addToast } = useToast();
  return (
    <section className="fraud-card wide">
      <div className="fraud-card-head">
        <h3>{title}</h3>
        <button type="button" onClick={() => addToast('Table Filter Opened', 'info')}><Filter size={16} />Filter</button>
      </div>
      <div className="fraud-table-wrap">
        <div className="table-responsive-wrapper">
<table className="fraud-table">
          <thead>
            <tr>
              <th>Case ID</th>
              <th>Entity Name</th>
              <th>Fraud Type</th>
              <th>Risk Score</th>
              <th>Status</th>
              <th>Assigned To</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.id}>
                <td className="fraud-link">{row.id}</td>
                <td><EntityCell row={row} /></td>
                <td><span className="fraud-tag">{row.fraudType || row.severity}</span></td>
                <td><RiskBar value={row.risk || row.score || 70} /></td>
                <td><StatusBadge status={row.status} /></td>
                <td>{row.investigator || 'Sarah Jenkins'}</td>
                <td>
                  <div className="fraud-row-actions">
                    <button type="button" onClick={() => navigate?.(ROUTES.fraudCaseDetails)}><Eye size={18} /></button>
                    <button type="button" onClick={() => onDrawer?.('case-action')}><MoreVertical size={18} /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
</div>
      </div>
      <footer className="fraud-table-foot">Showing 1-4 of 248 cases <span>1&nbsp;&nbsp;2&nbsp;&nbsp;3&nbsp;&nbsp;...&nbsp;&nbsp;62</span></footer>
    </section>
  );
}

function EntityCell({ row }) {
  const initials = (row.entity || row.entityType || 'FR').split(' ').map((word) => word[0]).join('').slice(0, 2);
  return <div className="fraud-entity"><span>{initials}</span><div><strong>{row.entity}</strong><small>{row.subtext || row.entityType}</small></div></div>;
}

function StatusBadge({ status = 'Open' }) {
  const tone = /closed|verified|active|success/i.test(status) ? 'success' : /pending|review|open/i.test(status) ? 'info' : /critical|investigating|flag|hold/i.test(status) ? 'danger' : 'neutral';
  return <span className={`fraud-pill ${tone}`}>{status}</span>;
}

function RiskBar({ value }) {
  const tone = value > 75 ? 'danger' : value > 45 ? 'warning' : 'success';
  return <div className={`fraud-risk ${tone}`}><i style={{ width: `${value}%` }} /><strong>{value}</strong></div>;
}

function ChartCard({ title, subtitle }) {
  const { addToast } = useToast();
  return (
    <section className="fraud-card fraud-chart">
      <div className="fraud-card-head"><div><h3>{title}</h3><p>{subtitle}</p></div><Select
        style={{padding: '0.5rem', borderRadius: '4px', border: '1px solid var(--border-color)', backgroundColor: 'var(--surface-color)', color: 'var(--text-primary)', cursor: 'pointer', outline: 'none'}}
        onChange={(e) => addToast(`Timeframe changed to ${e.target.value}`, 'success')}
        options={[{
          label: "Last 30 Days",
          value: "Last 30 Days"
        }, {
          label: "Last 7 Days",
          value: "Last 7 Days"
        }, {
          label: "Today",
          value: "Today"
        }, {
          label: "All Time",
          value: "All Time"
        }]} /></div>
      <div className="fraud-chart-lines"><span /><span /><span /><svg viewBox="0 0 600 220" preserveAspectRatio="none"><path d="M0 155 C70 100 120 190 180 140 C240 90 270 20 335 105 C390 180 430 65 500 70 C545 75 570 90 600 88" /><path className="dash" d="M0 178 C80 140 140 170 195 132 C260 86 312 70 362 125 C412 175 470 100 600 112" /></svg></div>
    </section>
  );
}

function RiskDistribution() {
  return (
    <section className="fraud-card">
      <h3>Risk Distribution</h3>
      <div className="fraud-donut"><span>100%<small>Total Userbase</small></span></div>
      <div className="fraud-legend"><span>Low Risk 72%</span><span>Medium 18%</span><span>High 8%</span><span>Critical 2%</span></div>
    </section>
  );
}

function AlertsPanel({ onDrawer }) {
  return (
    <section className="fraud-card">
      <div className="fraud-card-head"><h3>Latest Alerts</h3><span className="fraud-pill danger">Live</span></div>
      {riskAlerts.map((alert) => (
        <button className="fraud-alert-row" key={alert.id} type="button" onClick={() => onDrawer?.('alert')}>
          <AlertTriangle size={22} />
          <span><strong>{alert.title}</strong><small>{alert.reason}</small></span>
          <em>{alert.time}</em>
        </button>
      ))}
    </section>
  );
}

function SidePanel({ page, onModal, onDrawer }) {
  return (
    <aside className="fraud-card action-card">
      <h3>{page.title} Controls</h3>
      <button className="fraud-btn primary full" type="button" onClick={() => onDrawer('freeze-wallet')}><Lock size={18} />Freeze Wallet</button>
      <button className="fraud-btn danger-outline full" type="button" onClick={() => onDrawer('suspend-account')}><Ban size={18} />Suspend Account</button>
      <button className="fraud-btn ghost full" type="button" onClick={() => onModal('assignment')}><UserPlus size={18} />Assign Investigator</button>
      <DarkInsight title="Review Recommendation" text="Prioritize high-risk linked entities before closing this review batch." />
    </aside>
  );
}

function RiskSignals({ onDrawer }) {
  return (
    <>
      <h3>Risk Analysis</h3>
      <div className="fraud-four">
        {riskAlerts.slice(0, 4).map((alert) => (
          <button className="fraud-mini-card left" key={alert.id} type="button" onClick={() => onDrawer('risk-analysis')}>
            <strong>{alert.title}</strong>
            <RiskBar value={alert.score} />
            <span>{alert.reason}</span>
          </button>
        ))}
      </div>
    </>
  );
}

function AuditTimeline({ title = 'Event Timeline' }) {
  return (
    <section className="fraud-card">
      <h3>{title}</h3>
      <div className="fraud-timeline">
        {auditLogs.map((log) => (
          <div key={`${log.time}-${log.action}`}><span /> <strong>{log.time} - {log.actor}</strong><p>{log.action}</p></div>
        ))}
      </div>
    </section>
  );
}

function AuditTable() {
  const { addToast } = useToast();
  return (
    <section className="fraud-card wide">
      <div className="fraud-card-head"><h3>Audit Trail</h3><button onClick={() => addToast('Exporting Audit Trail...', 'success')}>Export</button></div>
      <div className="fraud-table-wrap">
        <div className="table-responsive-wrapper">
<table className="fraud-table">
          <thead><tr><th>Timestamp</th><th>Actor</th><th>Event Type</th><th>Action</th><th>IP</th></tr></thead>
          <tbody>{auditLogs.map((log) => <tr key={log.time}><td>{log.time}</td><td>{log.actor}</td><td>{log.type}</td><td>{log.action}</td><td>{log.ip}</td></tr>)}</tbody>
        </table>
</div>
      </div>
    </section>
  );
}

function MapPlaceholder({ title }) {
  return (
    <section className="fraud-card fraud-map-card">
      <h3>{title}</h3>
      <div className="fraud-map">
        <span className="pin a" /><span className="pin b" /><span className="pin c" />
        <div className="fraud-map-legend">Critical Density<br />High Variance<br />Standard Flow</div>
      </div>
    </section>
  );
}

function RecoveryTable() {
  const { addToast } = useToast();
  return (
    <section className="fraud-card wide">
      <div className="fraud-card-head"><h3>Active Recovery Cases</h3><button onClick={() => addToast('Filter applied', 'info')}>Filter</button></div>
      {recoveryRows.map((row) => (
        <div className="fraud-recovery-row" key={row.id}>
          <strong>{row.id}</strong><span>{row.entity}</span><StatusBadge status={row.status} /><span>{row.amount}</span><RiskBar value={row.recovery} />
        </div>
      ))}
    </section>
  );
}

function ProviderCard({ row }) {
  const { addToast } = useToast();
  return (
    <article className="fraud-card provider">
      <div className="fraud-card-head"><EntityCell row={{ entity: row.provider, subtext: row.product }} /><StatusBadge status={row.status} /></div>
      <p>Uptime <strong>{row.uptime}</strong></p>
      <p>Last response <strong>{row.response}</strong></p>
      <button className="fraud-btn primary full" type="button" onClick={() => addToast(`${row.status === 'Degraded' ? 'Reconnecting' : 'Opening Settings'} for ${row.provider}`, 'info')}>{row.status === 'Degraded' ? 'Reconnect' : 'Settings'}</button>
    </article>
  );
}

function WebhookTable() {
  const { addToast } = useToast();
  return (
    <section className="fraud-card wide">
      <div className="fraud-card-head"><h3>Webhook Log</h3><button onClick={() => addToast('Event log refreshed', 'success')}>All Events</button></div>
      <div className="fraud-table-wrap">
        <div className="table-responsive-wrapper">
<table className="fraud-table">
          <thead><tr><th>Timestamp</th><th>Provider</th><th>Event Type</th><th>Status</th><th>Response</th></tr></thead>
          <tbody>{integrationRows.map((row, index) => <tr key={row.provider}><td>14:2{index}:01.042</td><td>{row.provider}</td><td>{row.product}</td><td><StatusBadge status={row.response} /></td><td>View JSON</td></tr>)}</tbody>
        </table>
</div>
      </div>
    </section>
  );
}

function CardTitle({ icon: Icon, title }) {
  return <div className="fraud-card-title"><Icon size={22} /><h3>{title}</h3></div>;
}

function DarkInsight({ title, text }) {
  return <section className="fraud-dark"><h3>{title}</h3><p>{text}</p></section>;
}

function Toggle({ on }) {
  return <span className={`fraud-toggle ${on ? 'on' : ''}`}><i /></span>;
}

function tableTitle(page) {
  if (page.variant === 'alerts') return 'Live Alert Queue';
  if (page.variant === 'assignment') return 'Investigator Assignment Queue';
  if (page.variant === 'aml') return 'AML Review Queue';
  if (page.variant === 'compliance') return 'Pending Account Reviews';
  return `${page.title} Queue`;
}

function FraudModal({ type, onClose, onComplete }) {
  const title = modalTitle(type);
  return (
    <div className="fraud-modal-backdrop" role="presentation">
      <section className="fraud-modal" role="dialog" aria-modal="true" aria-label={title}>
        <button className="fraud-close" type="button" onClick={onClose}><X size={20} /></button>
        <h2>{title}</h2>
        <p>{modalCopy(type)}</p>
        <div className="fraud-form-grid">
          <label>Entity / Case ID<input placeholder="#FC-9281-X" /></label>
          <label>Priority<Select
            defaultValue="critical"
            options={[{
              label: "Critical",
              value: "critical"
            }, {
              label: "High",
              value: "High"
            }, {
              label: "Medium",
              value: "Medium"
            }]} /></label>
        </div>
        <label className="fraud-field">Investigation Notes<textarea placeholder="Add notes for audit trail..." /></label>
        <div className="fraud-actions right">
          <button className="fraud-btn ghost" type="button" onClick={onClose}>Cancel</button>
          <button className="fraud-btn primary" type="button" onClick={() => onComplete(`${title} completed.`)}>Confirm</button>
        </div>
      </section>
    </div>
  );
}

function FraudDrawer({ type, onClose, onComplete }) {
  const title = drawerTitle(type);
  return (
    <aside className="fraud-drawer" aria-label={title}>
      <button className="fraud-close" type="button" onClick={onClose}><X size={20} /></button>
      <h2>{title}</h2>
      <div className="fraud-drawer-summary">
        <span>Total Exposure</span>
        <strong>$1,240,500.00</strong>
        <RiskBar value={type === 'freeze-wallet' ? 92 : 64} />
      </div>
      <dl className="fraud-meta-list">
        <div><dt>Entity</dt><dd>Global Retailers Ltd.</dd></div>
        <div><dt>Linked Wallet</dt><dd>WLT-8842-XQ</dd></div>
        <div><dt>Reviewer</dt><dd>Sarah Jenkins</dd></div>
      </dl>
      <AuditTimeline title="Approval Timeline" />
      <div className="fraud-drawer-actions">
        <button className="fraud-btn primary" type="button" onClick={() => onComplete(`${title} approved.`)}><ShieldCheck size={18} />Approve</button>
        <button className="fraud-btn danger-outline" type="button" onClick={() => onComplete(`${title} rejected.`)}><Ban size={18} />Reject</button>
        <button className="fraud-btn ghost" type="button"><Unlock size={18} />Hold</button>
      </div>
    </aside>
  );
}

function modalTitle(type) {
  const titles = {
    'create-case': 'Initiate New Fraud Case',
    blacklist: 'Add to Blacklist',
    whitelist: 'Add to Whitelist',
    assignment: 'Assign Investigator',
    communication: 'Dispatch Secure Message',
    resolution: 'Resolve Fraud Case',
    integration: 'Add Risk Provider',
    'case-action': 'Case Action'
  };
  return titles[type] || 'Fraud Action';
}

function modalCopy(type) {
  if (type === 'resolution') return 'Capture final findings, action notes, and closure evidence for audit-ready review.';
  if (type === 'assignment') return 'Assign ownership, SLA priority, and reviewer notes to the investigation queue.';
  return 'Complete the required fields to continue with a controlled and auditable fraud action.';
}

function drawerTitle(type) {
  const titles = {
    'freeze-wallet': 'Freeze Wallet Review',
    'suspend-account': 'Suspend Account Review',
    evidence: 'Evidence Viewer',
    alert: 'Alert Resolution',
    report: 'Report Export',
    'risk-analysis': 'Risk Analysis Drawer',
    'case-action': 'Transaction Detail'
  };
  return titles[type] || 'Fraud Detail';
}
