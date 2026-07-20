import toast from 'react-hot-toast';
import React, { useEffect, useMemo, useState } from 'react';

import {
  Activity,
  AlertTriangle,
  BarChart3,
  Bell,
  Camera,
  Check,
  CheckCircle2,
  Clock,
  Download,
  Eye,
  FileText,
  Filter,
  Gauge,
  IdCard,
  RefreshCcw,
  Search,
  Send,
  ShieldAlert,
  ShieldCheck,
  UploadCloud,
  Users,
  X,
  RotateCw,
  Maximize2,
  Loader2,
  ChevronDown
} from 'lucide-react';
import AdminShell from '../../components/layouts/AdminShell';
import { ROUTES } from '../../config/routes';
import { useApp } from '../../hooks/useApp';
import { triggerDownload, generateCSV } from '../../utils/downloadHelper';

import Select from "../../components/ui/Select";

const sections = [
  'Dashboard',
  'Pending KYC',
  'Approved KYC',
  'Rejected KYC',
  'Queue',
  'Review',
  'Aadhaar',
  'PAN',
  'GST',
  'Driving License',
  'Voter ID',
  'Selfie',
  'Face Match',
  'Video KYC',
  'Bulk Approval',
  'Reuploads',
  'Risk Center',
  'Investigation',
  'Analytics',
  'Audit Logs',
  'Reviewers',
  'Rejections'
];

const routeSectionMap = {
  [ROUTES.kyc]: 'Dashboard',
  [ROUTES.kycDashboard]: 'Dashboard',
  [ROUTES.kycPending]: 'Pending KYC',
  [ROUTES.kycApproved]: 'Approved KYC',
  [ROUTES.kycRejected]: 'Rejected KYC',
  [ROUTES.kycReupload]: 'Reuploads',
  [ROUTES.kycAadhaar]: 'Aadhaar',
  [ROUTES.kycPan]: 'PAN',
  [ROUTES.kycGst]: 'GST',
  [ROUTES.kycDriving]: 'Driving License',
  [ROUTES.kycVoter]: 'Voter ID',
  [ROUTES.kycSelfie]: 'Selfie',
  [ROUTES.kycFaceMatch]: 'Face Match',
  [ROUTES.kycVideo]: 'Video KYC',
  [ROUTES.kycRisk]: 'Risk Center',
  [ROUTES.kycManual]: 'Investigation',
  [ROUTES.kycAnalytics]: 'Analytics',
  [ROUTES.kycAuditLogs]: 'Audit Logs',
  [ROUTES.kycReviewers]: 'Reviewers'
};

const initialProfiles = [
  { id: 'KYC-92038', name: 'Johnathan Doe', type: 'User', doc: 'Aadhaar', date: '2023-10-24', city: 'Mumbai', risk: 12, status: 'Pending', reviewer: 'Meera S.', email: 'johnathan@example.com', mobile: '+91 98765 43210', avatar: 'JD' },
  { id: 'KYC-92031', name: 'Sarah Miller', type: 'Partner', doc: 'Passport', date: '2023-10-24', city: 'Bengaluru', risk: 84, status: 'Pending', reviewer: 'Alex R.', email: 'sarah@example.com', mobile: '+91 89898 42010', avatar: 'SM' },
  { id: 'KYC-92022', name: 'Vikram Kumar', type: 'Employee', doc: 'PAN', date: '2023-10-24', city: 'Delhi', risk: 45, status: 'Manual Review', reviewer: 'Sarah J.', email: 'vikram@example.com', mobile: '+91 91234 56780', avatar: 'VK' },
  { id: 'KYC-92013', name: 'Elena Rodriguez', type: 'User', doc: 'Passport', date: '2023-10-23', city: 'Pune', risk: 7, status: 'Pending', reviewer: 'David M.', email: 'elena@example.com', mobile: '+91 77654 33210', avatar: 'ER' },
  { id: 'KYC-92014', name: 'Chen Wei', type: 'Business Owner', doc: 'GST', date: '2023-10-23', city: 'Hyderabad', risk: 67, status: 'Pending', reviewer: 'Priya K.', email: 'chen@example.com', mobile: '+91 99887 66112', avatar: 'CW' },
  { id: 'KYC-92015', name: 'Marcus Vane', type: 'Partner', doc: 'Driving License', date: '2023-10-23', city: 'London', risk: 32, status: 'Approved', reviewer: 'Admin', email: 'marcus@example.com', mobile: '+44 161 908 2231', avatar: 'MV' },
  { id: 'KYC-92016', name: 'Aisha Bin-Tariq', type: 'User', doc: 'Voter ID', date: '2023-10-22', city: 'Lucknow', risk: 91, status: 'Rejected', reviewer: 'Michael C.', email: 'aisha@example.com', mobile: '+91 88990 11223', avatar: 'AB' },
  { id: 'KYC-92017', name: 'Svetlana I.', type: 'User', doc: 'Video KYC', date: '2023-10-22', city: 'Chennai', risk: 14, status: 'Pending', reviewer: 'Rohit S.', email: 'svetlana@example.com', mobile: '+91 98701 01010', avatar: 'SI' }
];

const latestSubmissions = [
  { name: 'Liam Henderson', doc: 'Passport', id: 'KYC-92013' },
  { name: 'Sarah Chen', doc: 'ID Card', id: 'KYC-92031' },
  { name: 'Marco Silva', doc: 'Driver Lic.', id: 'KYC-92015' },
  { name: 'Elena Rodriguez', doc: 'Passport', id: 'KYC-92013' }
];

const reuploads = [
  ['James Davenport', 'Driving License (Front)', 'Blurry Image', '2023-11-24 14:39', 'Awaiting'],
  ['Sarah Lindholm', 'Passport (Bio Page)', 'Expired ID', '2023-11-24 11:45', 'Overdue'],
  ['Marcus Weber', 'Utility Bill', 'Name Mismatch', '2023-11-23 09:12', 'In Progress'],
  ['Elena Kostic', 'National ID', 'Corners Cropped', '2023-11-22 16:55', 'Overdue']
];

const auditRows = [
  ['2023-10-19 14:22:12', 'ID_APPROVED', 'Sarah Jenkins', '192.168.1.45', 'USR-99283-K', 'Identity verified via biometric match.'],
  ['2023-10-19 14:18:12', 'ID_REJECTED', 'Michael Chen', '10.8.4.112', 'USR-11204-O', 'Document expiration date out of range.'],
  ['2023-10-19 13:55:46', 'RISK_OVERRIDE', 'Alex Rodriguez', '192.168.1.22', 'CORP-8051-B', 'Manual override for Tier 2 VIP account registration.'],
  ['2023-10-19 13:42:15', 'DOC_UPLOAD', 'System Auto', '::1', 'USR-99283-K', 'Automated extraction from Passport Page 1.'],
  ['2023-10-19 12:10:01', 'FLAG_FOR_REVIEW', 'AI Guard', 'INT-API-3', 'USR-55122-H', 'Sanctions list partial match detected.']
];

const reviewerRows = [
  ['Elena Dragan', '482', '12', '88%', 'Critical'],
  ['Marcus Knight', '115', '82', '94%', 'Optimal'],
  ['Sarah Chen', '289', '84', '72%', 'Monitoring'],
  ['James Taylor', '42', '08', '98%', 'Under-load']
];

const rejectionRows = [
  ['Alex Lindqvist', 'Invalid ID', '2023-10-24 14:22', 'Sarah Chen', '98.4%'],
  ['Marco Rossi', 'Blurry Image', '2023-10-24 12:05', 'David Miller', '62.1%'],
  ['Jessica Wong', 'Expired ID', '2023-10-23 16:45', 'Sarah Chen', '99.9%'],
  ['Elena Murphy', 'Name Mismatch', '2023-10-23 09:12', 'Michael Scott', '87.5%'],
  ['Kevin Tuan', 'Sanctions Match', '2023-10-22 22:30', 'Compliance Lead', '92.8%']
];

const Badge = ({ children, tone = 'neutral' }) => <span className={`kyc-flow-badge ${tone}`}>{children}</span>;

const StatCard = ({ label, value, sub, tone = 'neutral', icon: Icon = Activity, onClick }) => (
  <article className={`kyc-flow-stat ${tone} cursor-pointer hover:scale-[1.01] transition-transform`} onClick={onClick}>
    <div>
      <span>{label}</span>
      <strong>{value}</strong>
      {sub && <small>{sub}</small>}
    </div>
    <Icon size={22} />
  </article>
);

const Panel = ({ title, action, children, className = '' }) => (
  <section className={`kyc-flow-panel ${className}`}>
    {(title || action) && (
      <header className="kyc-flow-panel-head">
        <h2>{title}</h2>
        {action}
      </header>
    )}
    {children}
  </section>
);

const Progress = ({ value, danger = false }) => (
  <span className="kyc-risk-line">
    <i style={{ width: `${value}%` }} className={danger ? 'danger' : ''} />
    <em>{value}</em>
  </span>
);

export default function KycQueue() {
  const { route } = useApp();
  const [activeSection, setActiveSection] = useState('Dashboard');
  const [profiles, setProfiles] = useState(initialProfiles);
  const [selectedIds, setSelectedIds] = useState(['KYC-92038', 'KYC-92031', 'KYC-92022', 'KYC-92013']);
  const [query, setQuery] = useState('');
  const [note, setNote] = useState('');
  const [selectedProfileId, setSelectedProfileId] = useState('KYC-92038');

  // Interactive controls
  const [activeModal, setActiveModal] = useState(null); // 'zoom' | 'reupload' | 'assign' | 'filters' | 'progress'
  const [modalMeta, setModalMeta] = useState(null);
  const [riskFilter, setRiskFilter] = useState('All Types');
  const [rotationDegrees, setRotationDegrees] = useState({});
  const [auditPage, setAuditPage] = useState(1);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [videoSpeed, setVideoSpeed] = useState('1.0x');
  const [isRefreshing, setIsRefreshing] = useState(false);

  const selectedProfile = useMemo(() => {
    return profiles.find(p => p.id === selectedProfileId) || profiles[0];
  }, [profiles, selectedProfileId]);

  useEffect(() => {
    setActiveSection(routeSectionMap[route] || 'Dashboard');
  }, [route]);

  const metrics = useMemo(() => ({
    pending: profiles.filter((item) => item.status === 'Pending').length,
    approved: profiles.filter((item) => item.status === 'Approved').length,
    rejected: profiles.filter((item) => item.status === 'Rejected').length,
    highRisk: profiles.filter((item) => item.risk > 70).length
  }), [profiles]);

  const updateProfileStatus = (id, status) => {
    setProfiles((items) => items.map((item) => item.id === id ? { ...item, status } : item));
    toast.success(`${id} marked ${status}.`);
  };

  const bulkUpdate = (status) => {
    setProfiles((items) => items.map((item) => selectedIds.includes(item.id) ? { ...item, status } : item));
    toast.success(`${selectedIds.length} profiles marked ${status}.`);
  };

  const toggleSelected = (id) => {
    setSelectedIds((items) => items.includes(id) ? items.filter((item) => item !== id) : [...items, id]);
  };

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
      toast.success("KYC verification queue successfully synchronized!");
    }, 1200);
  };

  const handleDocAction = (type, title) => {
    if (type === 'zoom') {
      setModalMeta({ title });
      setActiveModal('zoom');
    } else if (type === 'rotate') {
      setRotationDegrees(prev => ({
        ...prev,
        [title]: ((prev[title] || 0) + 90) % 360
      }));
      toast.success(`Rotated ${title} view.`);
    } else if (type === 'download') {
      toast.success(`Direct secure download started for file: ${title.toLowerCase().replace(/ /g, '_')}.jpg`);
    }
  };

  const filteredProfiles = profiles.filter((item) => {
    const text = `${item.id} ${item.name} ${item.type} ${item.doc} ${item.city}`.toLowerCase();
    const matchesQuery = text.includes(query.toLowerCase());

    if (!matchesQuery) return false;

    if (riskFilter === 'Low') return item.risk <= 20;
    if (riskFilter === 'Medium') return item.risk > 20 && item.risk <= 50;
    if (riskFilter === 'High') return item.risk > 50 && item.risk <= 80;
    if (riskFilter === 'Critical') return item.risk > 80;

    return true;
  });

  const getStatusProfiles = (status) =>
    filteredProfiles.filter((item) => item.status === status);

  const renderSection = () => {
    switch (activeSection) {
      case 'Pending KYC':
        return <StatusKycSection title="Pending KYC Panel" status="Pending" profiles={getStatusProfiles('Pending')} query={query} setQuery={setQuery} setActiveSection={setActiveSection} setSelectedProfileId={setSelectedProfileId} updateProfileStatus={updateProfileStatus} />;
      case 'Approved KYC':
        return <StatusKycSection title="Approved KYC Panel" status="Approved" profiles={getStatusProfiles('Approved')} query={query} setQuery={setQuery} setActiveSection={setActiveSection} setSelectedProfileId={setSelectedProfileId} updateProfileStatus={updateProfileStatus} />;
      case 'Rejected KYC':
        return <StatusKycSection title="Rejected KYC Panel" status="Rejected" profiles={getStatusProfiles('Rejected')} query={query} setQuery={setQuery} setActiveSection={setActiveSection} setSelectedProfileId={setSelectedProfileId} updateProfileStatus={updateProfileStatus} />;
      case 'Queue':
        return <QueueSection profiles={filteredProfiles} query={query} setQuery={setQuery} setActiveSection={setActiveSection} setSelectedProfileId={setSelectedProfileId} riskFilter={riskFilter} setRiskFilter={setRiskFilter} updateProfileStatus={updateProfileStatus} />;
      case 'Review':
        return <ReviewSection profile={selectedProfile} note={note} setNote={setNote} updateProfileStatus={updateProfileStatus} setActiveModal={setActiveModal} />;
      case 'Aadhaar':
        return <AadhaarSection setActiveSection={setActiveSection} />;
      case 'PAN':
        return <PanSection setActiveSection={setActiveSection} />;
      case 'GST':
        return <GstSection setActiveSection={setActiveSection} />;
      case 'Driving License':
        return <DrivingSection setActiveSection={setActiveSection} />;
      case 'Voter ID':
        return <VoterSection setActiveSection={setActiveSection} />;
      case 'Selfie':
        return <SelfieSection />;
      case 'Face Match':
        return <FaceSection />;
      case 'Video KYC':
        return <VideoSection isVideoPlaying={isVideoPlaying} setIsVideoPlaying={setIsVideoPlaying} videoSpeed={videoSpeed} setVideoSpeed={setVideoSpeed} />;
      case 'Bulk Approval':
        return <BulkSection profiles={profiles} selectedIds={selectedIds} toggleSelected={toggleSelected} bulkUpdate={bulkUpdate} setActiveSection={setActiveSection} />;
      case 'Reuploads':
        return <ReuploadSection />;
      case 'Risk Center':
        return <RiskSection />;
      case 'Investigation':
        return <InvestigationSection />;
      case 'Analytics':
        return <AnalyticsSection metrics={metrics} />;
      case 'Audit Logs':
        return <AuditSection auditPage={auditPage} setAuditPage={setAuditPage} />;
      case 'Reviewers':
        return <ReviewerSection />;
      case 'Rejections':
        return <RejectionSection />;
      default:
        return <DashboardSection metrics={metrics} setActiveSection={setActiveSection} setSelectedProfileId={setSelectedProfileId} />;
    }
  };

  return (
    <AdminShell
      activeTab="KYC Management"
      headerTitle="KYC Management"
      searchPlaceholder="Search KYC profiles, documents, or risk flags..."
      searchValue={query}
      onSearchChange={setQuery}
    >
      <div className="kyc-flow">
        <div className="partners-page-header kyc-flow-main-head">
          <div>
            <p className="kyc-flow-breadcrumb">KYC Management / {activeSection}</p>
            <h1 className="page-title">KYC Verification Management</h1>
            <p className="page-subtitle">Centralized verification for users, partners, employees, branches, and business owners.</p>
          </div>
          <div className="partners-header-buttons">
            <button className="secondary-action-btn font-bold cursor-pointer" type="button" onClick={() => toast.success('Reports compiled and exported to CSV successfully.')}>
              <Download size={14} />
              <span>Export Reports</span>
            </button>
            <button className="secondary-action-btn font-bold cursor-pointer" type="button" onClick={() => setActiveSection('Bulk Approval')}>
              <Users size={14} />
              <span>Bulk Approval</span>
            </button>
            <button className="primary-action-btn font-bold cursor-pointer flex items-center justify-center gap-1.5" type="button" disabled={isRefreshing} onClick={handleRefresh}>
              {isRefreshing ? <Loader2 size={14} className="animate-spin" /> : <RefreshCcw size={14} />}
              <span>{isRefreshing ? "Syncing..." : "Refresh Queue"}</span>
            </button>
          </div>
        </div>

        <nav className="kyc-flow-tabs" aria-label="KYC sections">
          {sections.map((section) => (
            <button
              key={section}
              className={activeSection === section ? 'active' : ''}
              type="button"
              onClick={() => setActiveSection(section)}
            >
              {section}
            </button>
          ))}
        </nav>

        {renderSection()}
      </div>
      {/* ========================================================
          MODAL: REUPLOAD REQUEST FORM
          ======================================================== */}
      {activeModal === 'reupload' && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs select-none animate-in fade-in duration-200">
          <div className="fixed inset-0 bg-transparent" onClick={() => setActiveModal(null)} />
          <div className="relative bg-white w-full max-w-sm rounded-2xl border border-slate-100 shadow-2xl p-6 overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-base font-black text-slate-900 tracking-tight">Request Reupload</h3>
                <p className="text-xs font-semibold text-slate-400 mt-0.5">Specify document corrections required</p>
              </div>
              <button onClick={() => setActiveModal(null)} className="p-1 rounded-full text-slate-400 hover:bg-slate-100 hover:text-slate-700 cursor-pointer border-none bg-transparent">
                <X className="h-5 w-5" />
              </button>
            </div>
            
            <div className="space-y-4 text-xs">
              <div>
                <label className="text-[11px] font-black text-slate-500 uppercase tracking-wider block mb-1.5">Document Target</label>
                <Select
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl bg-white text-slate-800 focus:outline-none focus:border-[#25108f] font-semibold"
                  options={[{
                    label: "Front Page",
                    value: "Front Page"
                  }, {
                    label: "Back Page",
                    value: "Back Page"
                  }, {
                    label: "Selfie Verification Photo",
                    value: "Selfie Verification Photo"
                  }]} />
              </div>

              <div>
                <label className="text-[11px] font-black text-slate-500 uppercase tracking-wider block mb-1.5">Rejection Reason</label>
                <Select
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl bg-white text-slate-800 focus:outline-none focus:border-[#25108f] font-semibold"
                  options={[{
                    label: "Blurry or Unreadable text details",
                    value: "Blurry or Unreadable text details"
                  }, {
                    label: "Document corners cropped or obstructed",
                    value: "Document corners cropped or obstructed"
                  }, {
                    label: "Expired Identity document date range",
                    value: "Expired Identity document date range"
                  }, {
                    label: "Name spelling mismatch on Registry records",
                    value: "Name spelling mismatch on Registry records"
                  }]} />
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setActiveModal(null)}
                  className="flex-1 py-2.5 text-center border border-slate-200 rounded-xl font-bold text-slate-700 bg-white hover:bg-slate-50 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={() => {
                    updateProfileStatus(selectedProfile.id, 'Reupload Awaiting');
                    setActiveModal(null);
                  }}
                  className="flex-1 py-2.5 text-center bg-indigo-900 text-white rounded-xl font-bold hover:bg-indigo-950 cursor-pointer shadow-md"
                >
                  Send Request
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* ========================================================
          MODAL: DOCUMENT PREVIEW ZOOM
          ======================================================== */}
      {activeModal === 'zoom' && modalMeta && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-slate-900/65 backdrop-blur-xs select-none animate-in fade-in duration-200">
          <div className="fixed inset-0 bg-transparent" onClick={() => setActiveModal(null)} />
          <div className="relative bg-white w-full max-w-lg rounded-2xl border border-slate-100 shadow-2xl p-6 overflow-hidden animate-in zoom-in-95 duration-200 text-center">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-sm font-black text-slate-900 tracking-tight">{modalMeta.title} - High Res Vault View</h3>
              <button onClick={() => setActiveModal(null)} className="p-1 rounded-full text-slate-400 hover:bg-slate-100 hover:text-slate-700 cursor-pointer border-none bg-transparent">
                <X className="h-5 w-5" />
              </button>
            </div>
            
            <div className="h-64 w-full bg-slate-50 border border-slate-200 rounded-2xl flex flex-col items-center justify-center text-slate-400 gap-2 overflow-hidden">
              <IdCard size={64} className="text-slate-300" />
              <span className=" text-xs font-bold text-slate-900 uppercase tracking-widest">{modalMeta.title}</span>
              <span className="text-[10px] text-slate-400 uppercase tracking-widest font-black">Cryptographic Seal Match: Verified</span>
            </div>
            
            <button
              onClick={() => setActiveModal(null)}
              className="mt-4 px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold cursor-pointer border-none"
            >
              Close Viewer
            </button>
          </div>
        </div>
      )}
    </AdminShell>
  );
}

function DashboardSection({ metrics, setActiveSection, setSelectedProfileId }) {
  return (
    <>
      <div className="kyc-flow-stats six">
        <StatCard label="Total Pending KYC" value={metrics.pending + 124} sub="+6.4%" icon={Clock} onClick={() => setActiveSection('Pending KYC')} />
        <StatCard label="Approved Today" value="450" sub="At expected pace" icon={ShieldCheck} tone="success" onClick={() => setActiveSection('Approved KYC')} />
        <StatCard label="Rejected Today" value={metrics.rejected + 11} sub="Needs review" icon={X} tone="danger" onClick={() => setActiveSection('Rejected KYC')} />
        <StatCard label="Reupload Requests" value="85" sub="42 waiting" icon={UploadCloud} onClick={() => setActiveSection('Reuploads')} />
        <StatCard label="High Risk Profiles" value={metrics.highRisk + 21} sub="Urgent" icon={ShieldAlert} tone="danger" onClick={() => setActiveSection('Risk Center')} />
        <StatCard label="Video KYC Pending" value="15" sub="Live queue" icon={Camera} onClick={() => setActiveSection('Video KYC')} />
      </div>

      <div className="kyc-flow-grid dashboard">
        <Panel title="Verification Trends">
          <div className="kyc-bar-chart">
            {[36, 52, 44, 66, 82, 58, 94, 72, 45, 61].map((height, index) => <i key={index} style={{ height: `${height}%` }} />)}
          </div>
          <div className="kyc-chart-labels"><span>Submissions</span><span>Approvals</span></div>
        </Panel>
        <Panel title="Approval Rate">
          <div className="kyc-meter"><strong>94.2%</strong><span>Exceeding KPI 90%</span></div>
          <div className="kyc-mini-bars">{[30, 42, 56, 71, 85, 62].map((height, index) => <i key={index} style={{ height }} />)}</div>
        </Panel>
        <Panel title="Latest Submitted KYC">
          <div className="table-responsive-wrapper">
<table className="kyc-flow-table compact">
            <tbody>
              {latestSubmissions.map((row) => (
                <tr key={row.id}>
                  <td>{row.name}</td>
                  <td>{row.doc}</td>
                  <td>
                    <button 
                      type="button" 
                      onClick={() => {
                        setSelectedProfileId(row.id);
                        setActiveSection('Review');
                      }}
                      className="cursor-pointer"
                    >
                      Review
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
</div>
        </Panel>
        <Panel title="High Risk & Escalations" action={<Badge tone="danger">21 cases</Badge>}>
          {['Vanguard Logistics Ltd', 'Ahmed Al-Farsi', 'Cryptflow LLC'].map((item, index) => (
            <div className="kyc-alert-row" key={item}>
              <strong>{item}</strong>
              <span>{index === 0 ? 'Sanctions list partial match' : index === 1 ? 'Multiple identity mismatch' : 'Behavioral risk detected'}</span>
              <button type="button" className="cursor-pointer" onClick={() => setActiveSection('Investigation')}>Inspect</button>
            </div>
          ))}
        </Panel>
        <Panel title="Rejection Reasons">
          <div className="kyc-donut"><strong>12</strong><span>Total</span></div>
          <ul className="kyc-legend"><li>Doc Quality 50%</li><li>Fraud Risk 30%</li><li>Expired 15%</li></ul>
        </Panel>
        <Panel title="System Status">
          <div className="kyc-status-stack">
            <span><ShieldCheck size={15} /> OCR Engine Online</span>
            <span><Bell size={15} /> Sanctions DB Synced</span>
            <span className="danger"><AlertTriangle size={15} /> Reviewer Load High</span>
          </div>
        </Panel>
      </div>
    </>
  );
}

function StatusKycSection({ title, status, profiles, query, setQuery, setActiveSection, setSelectedProfileId, updateProfileStatus }) {
  const tone = status === 'Approved' ? 'success' : status === 'Rejected' ? 'danger' : 'warning';
  const highRiskCount = profiles.filter((item) => item.risk > 70).length;
  const averageRisk = profiles.length
    ? Math.round(profiles.reduce((total, item) => total + item.risk, 0) / profiles.length)
    : 0;

  return (
    <>
      <div className="kyc-flow-stats three">
        <StatCard label={`${status} Profiles`} value={profiles.length} sub="Current filtered records" icon={status === 'Approved' ? ShieldCheck : status === 'Rejected' ? X : Clock} tone={tone} />
        <StatCard label="High Risk Cases" value={highRiskCount} sub="Risk score above 70" icon={ShieldAlert} tone={highRiskCount > 0 ? 'danger' : 'success'} />
        <StatCard label="Average Risk Score" value={averageRisk} sub="Across visible profiles" icon={Gauge} />
      </div>

      <Panel title={title} action={<Badge tone={tone}>{status}</Badge>}>
        <div className="kyc-flow-filters">
          <label><Search size={14} /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search by KYC ID, city, or user" /></label>
          <button type="button" className="cursor-pointer" onClick={() => setQuery('')}>Clear Search</button>
        </div>
        <div className="table-wrap">
          <div className="table-responsive-wrapper">
<table className="kyc-flow-table">
            <thead>
              <tr>
                <th>KYC ID</th>
                <th>User Name</th>
                <th>User Type</th>
                <th>Submitted Date</th>
                <th>Verification Type</th>
                <th>Risk Score</th>
                <th>Status</th>
                <th>Reviewer</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {profiles.length === 0 ? (
                <tr>
                  <td colSpan="9" className="kyc-empty-row">No {status.toLowerCase()} KYC profiles found.</td>
                </tr>
              ) : profiles.map((row) => (
                <tr key={row.id}>
                  <td>{row.id}</td>
                  <td><span className="kyc-person"><i>{row.avatar}</i>{row.name}</span></td>
                  <td>{row.type}</td>
                  <td>{row.date}</td>
                  <td><Badge>{row.doc}</Badge></td>
                  <td><Progress value={row.risk} danger={row.risk > 70} /></td>
                  <td><Badge tone={tone}>{row.status}</Badge></td>
                  <td>{row.reviewer}</td>
                  <td>
                    <div className="kyc-row-actions">
                      <button 
                        type="button" 
                        onClick={() => {
                          setSelectedProfileId(row.id);
                          setActiveSection('Review');
                        }}
                        className="cursor-pointer"
                      >
                        <Eye size={14} />View
                      </button>
                      {status === 'Pending' && (
                        <>
                          <button type="button" className="cursor-pointer" onClick={() => updateProfileStatus(row.id, 'Approved')}><Check size={14} />Approve</button>
                          <button type="button" className="cursor-pointer" onClick={() => updateProfileStatus(row.id, 'Rejected')}><X size={14} />Reject</button>
                        </>
                      )}
                      {status === 'Rejected' && (
                        <button type="button" className="cursor-pointer" onClick={() => updateProfileStatus(row.id, 'Pending')}><RefreshCcw size={14} />Reopen</button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
</div>
        </div>
      </Panel>
    </>
  );
}

function QueueSection({ profiles, query, setQuery, setActiveSection, setSelectedProfileId, riskFilter, setRiskFilter, updateProfileStatus }) {
  const handleExportQueue = () => {
    const csvContent = generateCSV(["ID", "Name", "Type", "Doc", "Date", "Risk", "Status"], profiles);
    triggerDownload(csvContent, "kyc_verification_queue.csv", "text/csv");
    toast.success("Verification queue database successfully exported!");
  };

  return (
    <Panel 
      title="Verification Queue" 
      action={
        <button 
          className="primary-action-btn cursor-pointer" 
          type="button" 
          onClick={handleExportQueue}
        >
          <Download size={14} />Export Report
        </button>
      }
    >
      <div className="kyc-flow-filters">
        {['All Types', 'Low', 'Medium', 'High', 'Critical'].map((item) => (
          <button 
            type="button" 
            key={item} 
            onClick={() => {
              setRiskFilter(item);
              toast.success(`Queue risk filter switched to "${item}"`);
            }}
            className={`cursor-pointer ${riskFilter === item ? 'active font-bold border-indigo-900 bg-indigo-50' : ''}`}
          >
            {item}
          </button>
        ))}
        <label><Search size={14} /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search by KYC ID, city, or user" /></label>
        <button 
          type="button" 
          onClick={() => {
            setQuery('');
            setRiskFilter('All Types');
            toast.success("All search parameters and filters reset.");
          }}
          className="cursor-pointer"
        >
          <Filter size={14} />Clear Filters
        </button>
      </div>
      <div className="table-wrap">
        <div className="table-responsive-wrapper">
<table className="kyc-flow-table">
          <thead><tr><th>KYC ID</th><th>User Name</th><th>User Type</th><th>Submitted Date</th><th>Verification Type</th><th>Risk Score</th><th>Status</th><th>Reviewer</th><th>Actions</th></tr></thead>
          <tbody>
            {profiles.map((row) => (
              <tr key={row.id}>
                <td>{row.id}</td>
                <td><span className="kyc-person"><i>{row.avatar}</i>{row.name}</span></td>
                <td>{row.type}</td>
                <td>{row.date}</td>
                <td><Badge>{row.doc}</Badge></td>
                <td><Progress value={row.risk} danger={row.risk > 70} /></td>
                <td><Badge tone={row.status === 'Approved' ? 'success' : row.status === 'Rejected' ? 'danger' : 'warning'}>{row.status}</Badge></td>
                <td>{row.reviewer}</td>
                <td>
                  <div className="kyc-row-actions">
                    <button 
                      type="button" 
                      onClick={() => {
                        setSelectedProfileId(row.id);
                        setActiveSection('Review');
                      }}
                      className="cursor-pointer"
                    >
                      <Eye size={14} />View
                    </button>
                    <button type="button" className="cursor-pointer" onClick={() => updateProfileStatus(row.id, 'Approved')}><Check size={14} />Verify</button>
                    <button type="button" className="cursor-pointer" onClick={() => updateProfileStatus(row.id, 'Rejected')}><X size={14} />Reject</button>
                  </div>
                </td>
              </tr>
            ))}
            {profiles.length === 0 && (
              <tr>
                <td colSpan="9" className="text-center py-6 text-slate-400 font-bold">
                  No queue records match active filters.
                </td>
              </tr>
            )}
          </tbody>
        </table>
</div>
      </div>
      <div className="kyc-flow-bottom-kpis">
        <StatCard label="Average Review Time" value="4m 12s" sub="-8%" />
        <StatCard label="Queue Velocity" value="82/hr" sub="+11%" tone="success" />
        <StatCard label="Fraud Shield Status" value="Online" sub="Active & Protected" />
      </div>
    </Panel>
  );
}

function ReviewSection({ profile, note, setNote, updateProfileStatus, setActiveModal }) {
  return (
    <div className="kyc-review-layout">
      <Panel title="User Profile">
        <div className="kyc-profile-card">
          <span>{profile.avatar}</span>
          <h2>{profile.name}</h2>
          <Badge tone={profile.status === 'Approved' ? 'success' : profile.status === 'Rejected' ? 'danger' : 'warning'}>{profile.status}</Badge>
        </div>
        {[
          ['User ID', profile.id],
          ['Mobile', profile.mobile],
          ['Email', profile.email],
          ['Registration Date', '12 Oct 2024'],
          ['User Type', profile.type],
          ['City', profile.city]
        ].map(([label, value]) => <div className="kyc-info-line" key={label}><span>{label}</span><strong>{value}</strong></div>)}
      </Panel>

      <Panel title="Document Preview">
        <div className="kyc-document-stack">
          <DocumentCard title={`${profile.doc} Front`} />
          <DocumentCard title={`${profile.doc} Back`} small />
        </div>
        <div className="kyc-doc-meta">
          <span>Format: JPEG High Res</span>
          <span>Uploaded: Oct 24, 2023 14:22</span>
          <span>Checksum: Verified</span>
        </div>
      </Panel>

      <Panel title="Verification Engine">
        {[
          ['OCR Confidence', '98.4%', 'success'],
          ['Name Match', '100%', 'success'],
          ['Face Match', '94.2%', 'success'],
          ['Duplicate Check', 'Passed', 'success'],
          ['Risk Score', `${profile.risk}/100`, profile.risk > 70 ? 'danger' : 'success']
        ].map(([label, value, tone]) => <div className="kyc-check-line" key={label}><span>{label}</span><Badge tone={tone}>{value}</Badge></div>)}
        <textarea value={note} onChange={(event) => setNote(event.target.value)} placeholder="Reviewer notes..." />
        <div className="kyc-flow-actions">
          <button type="button" className="cursor-pointer" onClick={() => setActiveModal('reupload')}>Request Reupload</button>
          <button type="button" className="danger cursor-pointer" onClick={() => updateProfileStatus(profile.id, 'Rejected')}>Reject</button>
          <button type="button" className="primary cursor-pointer" onClick={() => updateProfileStatus(profile.id, 'Approved')}>Approve</button>
        </div>
      </Panel>
    </div>
  );
}

function AadhaarSection({ setActiveSection }) {
  return <DocumentVerification title="Aadhaar Verification" docLabel="AADHAAR_FRONT.JPG" fields={[['Aadhaar Number', 'XXXX 3201 8234'], ['Name', 'Arjun Vardhan'], ['DOB', '15/08/1982'], ['Address', 'Mumbai, Maharashtra']]} checks={['Name Match 100%', 'DOB Match 100%', 'Address Match 84%', 'OCR Confidence 98.4%']} setActiveSection={setActiveSection} />;
}

function PanSection({ setActiveSection }) {
  return <DocumentVerification title="PAN Verification" docLabel="PAN_CARD.JPG" fields={[['PAN Number', 'ABCDE1234F'], ['Full Name', 'Aditya Sharma'], ['Date of Birth', '12/05/1992']]} checks={['Format Check Passed', 'Duplicate Case Check Low Risk', 'PAN Database Mapping Matched']} setActiveSection={setActiveSection} />;
}

function GstSection({ setActiveSection }) {
  return <DocumentVerification title="GST Verification & Analytics" docLabel="GST_CERTIFICATE.PDF" business fields={[['GST Number', '27AACCP3912B1ZS'], ['Business Name', 'Chronos Logistics Private Limited'], ['Registration Type', 'Regular'], ['Status', 'Active']]} checks={['GST Match Validated', 'Registration Match 98%', 'Aggregated Risk Score 24']} setActiveSection={setActiveSection} />;
}

function DrivingSection({ setActiveSection }) {
  return <DocumentVerification title="Driving License Verification" docLabel="LICENSE_FRONT.JPG" fields={[['License No.', 'L-1984-893-281'], ['Expiry Date', '24 Oct 2028'], ['Full Name', 'Jonathan W. Caldwell'], ['OCR Status', 'Character mismatch detected']]} checks={['Validity Check Active', 'Document Match 99%', 'Face Match 98.4%', 'Security Watermark Visible']} setActiveSection={setActiveSection} />;
}

function VoterSection({ setActiveSection }) {
  return <DocumentVerification title="Voter ID Identity Match" docLabel="VOTER_ID.JPG" fields={[['EPIC Number', 'WJD1290384'], ['Full Name', 'Arjun S. Deshmukh'], ['Relation Name', 'Shivaji Deshmukh'], ['DOB', '12/05/1988']]} checks={['NVSP Database Match', 'De-duplication Check Passed', 'Address History Cross-ref Pending']} setActiveSection={setActiveSection} />;
}

function SelfieSection() {
  return (
    <div className="kyc-doc-review">
      <Panel title="Selfie Verification">
        <div className="kyc-selfie-stage"><Camera size={52} /><strong>Live Selfie Preview</strong><span>Face visible, lighting optimal, no mask detected.</span></div>
      </Panel>
      <Panel title="Verification Engine">
        {['Face Detection Passed', 'Face Clarity Excellent', 'Liveness Check Passed', 'Mask Detection None', 'Duplicate Face Detection Clear'].map((item) => <div className="kyc-check-line" key={item}><span>{item}</span><CheckCircle2 size={16} /></div>)}
        <StatCard label="Face Confidence" value="98.4%" sub="Risk score 12/100" icon={Gauge} />
        <div className="kyc-flow-actions">
          <button type="button" className="danger cursor-pointer" onClick={() => toast.error('Selfie photo rejected.')}>Reject</button>
          <button type="button" className="primary cursor-pointer" onClick={() => toast.success('Selfie photo successfully verified.')}>Approve</button>
        </div>
      </Panel>
    </div>
  );
}

function FaceSection() {
  return (
    <div className="kyc-doc-review face">
      <Panel title="Biometric Face Comparison">
        <div className="kyc-face-split"><DocumentCard title="Document Source" /><DocumentCard title="Live Selfie Verification" /></div>
      </Panel>
      <Panel title="AI Results">
        <div className="kyc-circle-score"><strong>94.2%</strong><span>Match Probability</span></div>
        <div className="kyc-check-line"><span>Confidence Score</span><Badge tone="success">High</Badge></div>
        <div className="kyc-check-line"><span>Similarity Index</span><strong>0.9423</strong></div>
        <div className="kyc-check-line"><span>Status</span><Badge tone="success">Matched</Badge></div>
        <div className="kyc-flow-actions">
          <button type="button" className="cursor-pointer" onClick={() => toast.success('Biometric mismatch case escalated to compliance supervisor.')}>Escalate</button>
          <button type="button" className="danger cursor-pointer" onClick={() => toast.error('Face match comparison rejected.')}>Reject</button>
          <button type="button" className="primary cursor-pointer" onClick={() => toast.success('Face comparison verified matching.')}>Approve</button>
        </div>
      </Panel>
    </div>
  );
}

function VideoSection({ isVideoPlaying, setIsVideoPlaying, videoSpeed, setVideoSpeed }) {
  const handleTogglePlay = () => {
    setIsVideoPlaying(!isVideoPlaying);
    toast.success(isVideoPlaying ? "Video review paused." : "Playing KYC video feed...");
  };

  const handleSpeedToggle = () => {
    const next = videoSpeed === '1.0x' ? '1.5x' : videoSpeed === '1.5x' ? '2.0x' : '1.0x';
    setVideoSpeed(next);
    toast.success(`Video speed set to ${next}`);
  };

  return (
    <div className="kyc-video-layout">
      <Panel title="Live Video KYC Review">
        <div className="kyc-video-screen">
          <span className="kyc-video-pill">AI Match 98.4%</span>
          <div className="flex flex-col items-center justify-center h-48 bg-slate-900 rounded-xl text-slate-400 gap-2 relative">
            <Camera size={54} className={isVideoPlaying ? 'text-indigo-400 animate-pulse' : 'text-slate-600'} />
            <strong>{isVideoPlaying ? "Marcus Vane Video Feed Active" : "Video KYC Paused"}</strong>
            <span className="absolute bottom-2 right-2 text-[10px] font-bold text-slate-500 ">Speed: {videoSpeed}</span>
          </div>
          <div className="kyc-video-controls">
            <button type="button" className="cursor-pointer" onClick={handleTogglePlay}>{isVideoPlaying ? "Pause Review" : "Play Feed"}</button>
            <button type="button" className="cursor-pointer" onClick={handleSpeedToggle}>{videoSpeed} Speed</button>
          </div>
        </div>
        <div className="kyc-video-subgrid">
          <DocumentCard title="Extracted Identity Card" small />
          <div className="kyc-status-stack"><span>Name Match Passed</span><span>DOB Match Passed</span><span>Face Liveness Verifying...</span></div>
        </div>
        <div className="kyc-flow-actions">
          <button type="button" className="cursor-pointer" onClick={() => toast.success('Notification sent: Partner requested to re-record Video KYC.')}>Request New Video</button>
          <button type="button" className="danger cursor-pointer" onClick={() => toast.error('Video KYC submission rejected.')}>Reject Application</button>
          <button type="button" className="primary cursor-pointer" onClick={() => toast.success('Video KYC verified successfully.')}>Approve Identity</button>
        </div>
      </Panel>
      <Panel title="Reviewer Notes">
        <div className="kyc-profile-card small"><span>MV</span><h2>Marcus Vane</h2><Badge tone="success">Risk 12/100</Badge></div>
        <textarea defaultValue="Automatic liveness detection confirmed. No spoofing detected in 00:15 - 00:45 segment." />
        <textarea placeholder="Add a new observation..." />
        <div className="kyc-info-line"><span>Device</span><strong>iPhone 14 Pro</strong></div>
        <div className="kyc-info-line"><span>IP Address</span><strong>192.168.1.146</strong></div>
      </Panel>
    </div>
  );
}

function BulkSection({ profiles, selectedIds, toggleSelected, bulkUpdate, setActiveSection }) {
  return (
    <Panel title="KYC Approval Center" action={<Badge>{selectedIds.length} Profiles Selected</Badge>}>
      <div className="kyc-flow-filters">
        <button type="button" className="cursor-pointer" onClick={() => toast.success("Filtered by Risk Level: Low")}>Risk Level: Low</button>
        <button type="button" className="cursor-pointer" onClick={() => toast.success("Filtered by Document Type: All")}>Doc Type: All</button>
        <button type="button" className="cursor-pointer" onClick={() => toast.success("Batch size adjusted to 25 Profiles")}>Batch Size: 25 Profiles</button>
        <button type="button" className="cursor-pointer" onClick={() => toast.success("Advanced bulk assignment configurations opened.")}><Filter size={14} />Advanced Filters</button>
      </div>
      <div className="kyc-bulk-bar">
        <span>{selectedIds.length} Profiles Selected</span>
        <button type="button" className="cursor-pointer" onClick={() => bulkUpdate('Approved')}>Approve Selected</button>
        <button type="button" className="danger cursor-pointer" onClick={() => bulkUpdate('Rejected')}>Reject Selected</button>
        <button type="button" className="cursor-pointer" onClick={() => toast.success(`Assigned ${selectedIds.length} selected profiles to compliance reviewer.`)}>Assign Reviewer</button>
      </div>
      <div className="table-responsive-wrapper">
<table className="kyc-flow-table"><thead><tr><th></th><th>Profile</th><th>Risk Score</th><th>Documents</th><th>Verification Score</th><th>Last Updated</th><th>Actions</th></tr></thead><tbody>
        {profiles.slice(0, 5).map((row, index) => <tr key={row.id}><td><input type="checkbox" checked={selectedIds.includes(row.id)} onChange={() => toggleSelected(row.id)} /></td><td><span className="kyc-person"><i>{row.avatar}</i>{row.name}</span></td><td><Progress value={row.risk} danger={row.risk > 70} /></td><td><FileText size={18} /></td><td><Badge tone="success">{98 - index}%</Badge></td><td>{20 + index * 8} mins ago</td><td><button type="button" className="cursor-pointer" onClick={() => setActiveSection('Review')}>Review</button></td></tr>)}
      </tbody></table>
</div>
    </Panel>
  );
}

function ReuploadSection() {
  return (
    <Panel title="Reupload Requests" action={<button className="primary-action-btn cursor-pointer" type="button" onClick={() => toast.success('Bulk notifications sent to all 4 pending users via email and SMS.')}><Send size={14} />Bulk Notify</button>}>
      <div className="kyc-flow-stats four"><StatCard label="Pending Reuploads" value="42" sub="+12%" /><StatCard label="Avg Response Time" value="4.2h" /><StatCard label="Blurry Image Rate" value="18%" /><StatCard label="Successful Re-submits" value="94%" tone="success" /></div>
      <div className="table-responsive-wrapper">
<table className="kyc-flow-table"><thead><tr><th>User</th><th>Rejected Document</th><th>Reason</th><th>Request Date</th><th>Status</th><th>Actions</th></tr></thead><tbody>
        {reuploads.map((row) => <tr key={row[0]}><td>{row[0]}</td><td>{row[1]}</td><td><Badge tone="danger">{row[2]}</Badge></td><td>{row[3]}</td><td>{row[4]}</td><td><button type="button" className="cursor-pointer" onClick={() => toast.success(`${row[0]} has been re-notified.`)}>Re-notify</button></td></tr>)}
      </tbody></table>
</div>
    </Panel>
  );
}

function RiskSection() {
  return (
    <>
      <div className="kyc-flow-stats six"><StatCard label="Duplicate Aadhaar" value="3" tone="danger" /><StatCard label="Duplicate PAN" value="2" tone="danger" /><StatCard label="Multiple Accounts" value="8" /><StatCard label="Device Mismatch" value="New IMEI" tone="danger" /><StatCard label="Geo Mismatch" value="Flagged" /><StatCard label="Verification Score" value="98.4%" /></div>
      <div className="kyc-flow-grid risk">
        <Panel title="Global Risk Score"><div className="kyc-risk-gauge"><strong>75</strong><span>High Risk</span></div><Badge tone="danger">Fraudulent patterns detected</Badge></Panel>
        <Panel title="Linked Account Network Visualization">
          <div className="kyc-network-map" style={{ position: 'relative', overflow: 'hidden' }}>
            <svg style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none' }}>
              <line x1="50%" y1="50%" x2="25%" y2="30%" stroke="rgba(239, 68, 68, 0.6)" strokeWidth="2" strokeDasharray="4 4" />
              <line x1="50%" y1="50%" x2="25%" y2="70%" stroke="rgba(239, 68, 68, 0.6)" strokeWidth="2" />
              <line x1="50%" y1="50%" x2="75%" y2="50%" stroke="rgba(99, 102, 241, 0.6)" strokeWidth="2" />
            </svg>
            <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', zIndex: 2 }}>
              <div style={{ background: '#ef4444', padding: '12px', borderRadius: '50%', boxShadow: '0 0 20px rgba(239, 68, 68, 0.6)', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Users size={24} color="white" />
              </div>
              <strong style={{ background: '#ef4444', borderRadius: '999px', fontSize: '10px', padding: '4px 10px', textTransform: 'uppercase', color: 'white' }}>Target Subject</strong>
            </div>
            <div style={{ position: 'absolute', top: '30%', left: '25%', transform: 'translate(-50%, -50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', zIndex: 2 }}>
              <div style={{ background: '#1e1b4b', border: '2px solid #ef4444', padding: '10px', borderRadius: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <AlertTriangle size={18} color="#fca5a5" />
              </div>
              <span style={{ fontSize: '10px', color: '#cbd5e1', fontWeight: '600' }}>Flagged Device</span>
            </div>
            <div style={{ position: 'absolute', top: '70%', left: '25%', transform: 'translate(-50%, -50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', zIndex: 2 }}>
              <div style={{ background: '#1e1b4b', border: '2px solid #ef4444', padding: '10px', borderRadius: '50%', boxShadow: '0 0 15px rgba(239, 68, 68, 0.4)', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Activity size={18} color="#fca5a5" />
              </div>
              <span style={{ fontSize: '10px', color: '#cbd5e1', fontWeight: '600' }}>Shared IP (3x)</span>
            </div>
            <div style={{ position: 'absolute', top: '50%', left: '75%', transform: 'translate(-50%, -50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', zIndex: 2 }}>
              <div style={{ background: '#1e1b4b', border: '2px solid #6366f1', padding: '10px', borderRadius: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <IdCard size={18} color="#818cf8" />
              </div>
              <span style={{ fontSize: '10px', color: '#cbd5e1', fontWeight: '600' }}>Linked PAN</span>
            </div>
          </div>
        </Panel>
        <Panel title="Recent Suspicious Events">{['Rapid Sequential Logins', 'Aadhaar Data Match', 'VPN Detection'].map((item) => <div className="kyc-alert-row" key={item}><strong>{item}</strong><span>Risk engine raised a critical signal.</span><button type="button" className="cursor-pointer" onClick={() => toast.success(`Fraud event "${item}" successfully added to investigation case.`)}>Trace</button></div>)}</Panel>
      </div>
    </>
  );
}

function InvestigationSection() {
  const [activeAction, setActiveAction] = useState('escalate');

  const handleAction = (actionName, toastMsg, isSuccess) => {
    setActiveAction(actionName);
    if (isSuccess) {
      toast.success(toastMsg);
    } else {
      toast.error(toastMsg);
    }
  };

  return (
    <div className="kyc-investigation">
      <Panel title="Investigation: Alex Rivera">
        <div className="kyc-flow-actions top flex gap-2">
          <button 
            type="button" 
            className={`cursor-pointer px-4 py-2 rounded-xl text-xs font-bold transition border ${
              activeAction === 'freeze' 
                ? 'bg-rose-600 text-white border-rose-600 shadow-sm' 
                : 'text-rose-600 border-rose-200 bg-white hover:bg-rose-50'
            }`}
            onClick={() => handleAction('freeze', 'Account frozen and payouts locked.', false)}
          >
            Freeze Account
          </button>
          <button 
            type="button" 
            className={`cursor-pointer px-4 py-2 rounded-xl text-xs font-bold transition border ${
              activeAction === 'suspend' 
                ? 'bg-slate-800 text-white border-slate-800 shadow-sm' 
                : 'text-slate-700 border-slate-200 bg-white hover:bg-slate-50'
            }`}
            onClick={() => handleAction('suspend', 'User access suspended pending KYC investigation.', false)}
          >
            Suspend User
          </button>
          <button 
            type="button" 
            className={`cursor-pointer px-4 py-2 rounded-xl text-xs font-bold transition border ${
              activeAction === 'escalate' 
                ? 'bg-indigo-650 text-white border-indigo-650 shadow-sm' 
                : 'text-indigo-600 border-indigo-200 bg-white hover:bg-indigo-50'
            }`}
            onClick={() => handleAction('escalate', 'Case escalated to Senior Director of Compliance.', true)}
          >
            Escalate
          </button>
          <button 
            type="button" 
            className={`cursor-pointer px-4 py-2 rounded-xl text-xs font-bold transition border ${
              activeAction === 'safe' 
                ? 'bg-emerald-600 text-white border-emerald-600 shadow-sm' 
                : 'text-slate-700 border-slate-200 bg-white hover:bg-slate-50'
            }`}
            onClick={() => handleAction('safe', 'Investigation complete: Account marked safe.', true)}
          >
            Mark Safe
          </button>
        </div>
        <div className="kyc-flow-stats four"><StatCard label="Composite Risk" value="78/100" tone="danger" /><StatCard label="Identity Status" value="L2 Verified" /><StatCard label="Account Longevity" value="14 Days" /><StatCard label="Avg Transaction" value="$1,200" /></div>
        <div className="kyc-doc-review"><DocumentCard title="KYC Comparison Viewer" /><div className="kyc-status-stack"><span>Full Name: Alex Rodriguez Rivera</span><span>DOB: 1988-04-12</span><span>ID Number: G-2009384-B2</span><span>Address: TX</span></div></div>
      </Panel>
      <Panel title="Evidence Panel">
        <div className="kyc-network-map small" style={{ position: 'relative', overflow: 'hidden' }}>
          <svg style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none' }}>
            <line x1="30%" y1="50%" x2="70%" y2="50%" stroke="rgba(99, 102, 241, 0.6)" strokeWidth="2" strokeDasharray="4 4" />
          </svg>
          <div style={{ position: 'absolute', top: '50%', left: '30%', transform: 'translate(-50%, -50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px', zIndex: 2 }}>
            <div style={{ background: '#ef4444', padding: '8px', borderRadius: '50%', boxShadow: '0 0 15px rgba(239, 68, 68, 0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <Users size={16} color="white" />
            </div>
            <strong style={{ background: '#ef4444', borderRadius: '999px', fontSize: '9px', padding: '3px 8px', textTransform: 'uppercase', color: 'white' }}>Subject</strong>
          </div>
          <div style={{ position: 'absolute', top: '50%', left: '70%', transform: 'translate(-50%, -50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px', zIndex: 2 }}>
            <div style={{ background: '#1e1b4b', border: '2px solid #6366f1', padding: '8px', borderRadius: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <IdCard size={16} color="#818cf8" />
            </div>
            <span style={{ fontSize: '9px', color: '#cbd5e1', fontWeight: '600' }}>Linked Entity</span>
          </div>
        </div>
        <textarea placeholder="Add investigation findings..." className="mt-4" />
        <button type="button" className="primary-action-btn mt-2 cursor-pointer w-full text-center py-2 text-xs font-bold" onClick={() => toast.success("Notes saved to investigation diary.")}>Save Investigation Notes</button>
      </Panel>
    </div>
  );
}

function AnalyticsSection({ metrics }) {
  const totalReviewed = metrics.approved + metrics.rejected;
  const approvalRate = totalReviewed ? Math.round((metrics.approved / totalReviewed) * 100) : 0;

  return (
    <>
      <div className="kyc-flow-stats four">
        <StatCard label="Approval Rate" value={`${approvalRate}%`} sub="Approved vs reviewed" icon={ShieldCheck} tone="success" />
        <StatCard label="Pending Workload" value={metrics.pending} sub="Profiles awaiting action" icon={Clock} />
        <StatCard label="Rejected Profiles" value={metrics.rejected} sub="Requires reupload or review" icon={X} tone="danger" />
        <StatCard label="High Risk Profiles" value={metrics.highRisk} sub="Risk score above 70" icon={ShieldAlert} tone={metrics.highRisk ? 'danger' : 'success'} />
      </div>

      <div className="kyc-flow-grid dashboard">
        <Panel title="KYC Analytics">
          <div className="kyc-bar-chart">
            {[58, 72, 64, 86, 92, 76, 88, 69, 74, 81].map((height, index) => <i key={index} style={{ height: `${height}%` }} />)}
          </div>
          <div className="kyc-chart-labels"><span>Verification Volume</span><span>Weekly Trend</span></div>
        </Panel>
        <Panel title="Decision Mix">
          <div className="kyc-meter"><strong>{approvalRate}%</strong><span>Approval rate across reviewed profiles</span></div>
          <ul className="kyc-legend"><li>Pending {metrics.pending}</li><li>Approved {metrics.approved}</li><li>Rejected {metrics.rejected}</li></ul>
        </Panel>
        <Panel title="Risk Distribution">
          <div className="kyc-status-stack">
            <span><ShieldCheck size={15} /> Low Risk: {Math.max(metrics.approved, 1)} profiles</span>
            <span><Gauge size={15} /> Medium Risk: {Math.max(metrics.pending - metrics.highRisk, 0)} profiles</span>
            <span className={metrics.highRisk ? 'danger' : ''}><AlertTriangle size={15} /> High Risk: {metrics.highRisk} profiles</span>
          </div>
        </Panel>
      </div>
    </>
  );
}

function AuditSection() {
  const auditLogsDb = useMemo(() => [
    { time: '2023-10-19 14:22:12', action: 'ID_APPROVED', reviewer: 'Sarah Jenkins', ip: '192.168.1.45', entity: 'USR-99283-K', remarks: 'Identity verified via biometric match.' },
    { time: '2023-10-19 14:18:12', action: 'ID_REJECTED', reviewer: 'Michael Chen', ip: '10.8.4.112', entity: 'USR-11204-O', remarks: 'Document expiration date out of range.' },
    { time: '2023-10-19 13:55:46', action: 'RISK_OVERRIDE', reviewer: 'Alex Rodriguez', ip: '192.168.1.22', entity: 'CORP-8051-B', remarks: 'Manual override for Tier 2 VIP account registration.' },
    { time: '2023-10-19 13:42:15', action: 'DOC_UPLOAD', reviewer: 'System Auto', ip: '::1', entity: 'USR-99283-K', remarks: 'Automated extraction from Passport Page 1.' },
    { time: '2023-10-19 12:10:01', action: 'FLAG_FOR_REVIEW', reviewer: 'AI Guard', ip: 'INT-API-3', entity: 'USR-55122-H', remarks: 'Sanctions list partial match detected.' },
    { time: '2023-10-18 16:05:32', action: 'ID_APPROVED', reviewer: 'Michael Chen', ip: '10.8.4.112', entity: 'USR-38291-P', remarks: 'Aadhaar matching scores comply with verification guidelines.' },
    { time: '2023-10-18 15:40:11', action: 'DOC_UPLOAD', reviewer: 'System Auto', ip: '::1', entity: 'USR-38291-P', remarks: 'Aadhaar front and back uploaded by user.' },
    { time: '2023-10-18 11:22:04', action: 'ID_REJECTED', reviewer: 'Sarah Jenkins', ip: '192.168.1.45', entity: 'USR-48201-E', remarks: 'Incorrect PAN formatting checksum verification failed.' },
    { time: '2023-10-17 10:15:55', action: 'RISK_OVERRIDE', reviewer: 'Sarah Jenkins', ip: '192.168.1.2', entity: 'CORP-3021-X', remarks: 'Authorized VIP branch operation override.' },
    { time: '2023-10-17 09:30:12', action: 'FLAG_FOR_REVIEW', reviewer: 'AI Guard', ip: 'INT-API-3', entity: 'USR-78210-D', remarks: 'Unusual face-comparison confidence index alert (54%).' },
    { time: '2023-10-16 17:42:01', action: 'ID_APPROVED', reviewer: 'Sarah Jenkins', ip: '192.168.1.45', entity: 'USR-10293-A', remarks: 'Biometric liveness confirmed.' },
    { time: '2023-10-16 14:15:39', action: 'DOC_UPLOAD', reviewer: 'System Auto', ip: '::1', entity: 'USR-10293-A', remarks: 'PAN card image upload successfully processed.' },
    { time: '2023-10-15 13:02:18', action: 'ID_REJECTED', reviewer: 'Michael Chen', ip: '10.8.4.112', entity: 'USR-88210-M', remarks: 'Voter ID image resolution below system threshold.' },
    { time: '2023-10-15 11:45:00', action: 'FLAG_FOR_REVIEW', reviewer: 'AI Guard', ip: 'INT-API-3', entity: 'USR-66210-Z', remarks: 'Blacklisted device fingerprint detected.' }
  ], []);

  const [openDropdown, setOpenDropdown] = useState(null); 
  const [selectedDateRange, setSelectedDateRange] = useState("Oct 12, 2023 - Oct 19, 2023");
  const [selectedReviewer, setSelectedReviewer] = useState("All Reviewers");
  const [selectedAction, setSelectedAction] = useState("All Actions");

  const [appliedDateRange, setAppliedDateRange] = useState("Oct 12, 2023 - Oct 19, 2023");
  const [appliedReviewer, setAppliedReviewer] = useState("All Reviewers");
  const [appliedAction, setAppliedAction] = useState("All Actions");

  const [activePage, setActivePage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const clickOutside = () => setOpenDropdown(null);
    document.addEventListener("click", clickOutside);
    return () => document.removeEventListener("click", clickOutside);
  }, []);

  const handleApplyFilters = () => {
    setIsLoading(true);
    setAppliedDateRange(selectedDateRange);
    setAppliedReviewer(selectedReviewer);
    setAppliedAction(selectedAction);
    setActivePage(1);

    setTimeout(() => {
      setIsLoading(false);
      toast.success("Audit filters applied successfully!");
    }, 500);
  };

  const filteredLogs = useMemo(() => {
    return auditLogsDb.filter(log => {
      if (appliedReviewer !== "All Reviewers" && log.reviewer !== appliedReviewer) return false;
      if (appliedAction !== "All Actions" && log.action !== appliedAction) return false;
      if (appliedDateRange !== "Oct 12, 2023 - Oct 19, 2023") {
        if (appliedDateRange === "Today" && !log.time.includes("2023-10-19")) return false;
        if (appliedDateRange === "Last 3 Days" && !(log.time.includes("2023-10-19") || log.time.includes("2023-10-18") || log.time.includes("2023-10-17"))) return false;
      }
      return true;
    });
  }, [auditLogsDb, appliedDateRange, appliedReviewer, appliedAction]);

  const itemsPerPage = 5;
  const totalPages = Math.max(Math.ceil(filteredLogs.length / itemsPerPage), 1);
  const currentLogs = useMemo(() => {
    const start = (activePage - 1) * itemsPerPage;
    return filteredLogs.slice(start, start + itemsPerPage);
  }, [filteredLogs, activePage]);

  const handleExportAudit = () => {
    const csvContent = generateCSV(["Timestamp", "Action", "Reviewer", "IP", "EntityID", "Remarks"], filteredLogs.map(l => [l.time, l.action, l.reviewer, l.ip, l.entity, l.remarks]));
    triggerDownload(csvContent, "kyc_compliance_audit_logs.csv", "text/csv");
    toast.success("Filtered audit log history exported successfully!");
  };

  return (
    <>
      <Panel title="Audit Logs">
        <div className="kyc-flow-filters flex flex-wrap gap-2 relative">
          <div className="relative" onClick={(e) => e.stopPropagation()}>
            <button 
              type="button" 
              className="cursor-pointer px-3 py-1.5 border border-slate-200 rounded-lg text-slate-700 bg-white text-xs font-semibold hover:bg-slate-50 flex items-center gap-1"
              onClick={() => setOpenDropdown(openDropdown === 'date' ? null : 'date')}
            >
              <span>{selectedDateRange}</span>
              <ChevronDown size={12} className="text-slate-400" />
            </button>
            {openDropdown === 'date' && (
              <div className="absolute left-0 mt-1.5 z-40 bg-white border border-slate-100 rounded-xl p-1.5 shadow-xl w-48 text-left">
                {["Oct 12, 2023 - Oct 19, 2023", "Last 3 Days", "Today"].map((opt) => (
                  <button
                    key={opt}
                    onClick={() => {
                      setSelectedDateRange(opt);
                      setOpenDropdown(null);
                    }}
                    className={`w-full rounded-lg px-3 py-1.5 text-left text-xs font-semibold border-none bg-transparent cursor-pointer ${selectedDateRange === opt ? 'bg-indigo-650 text-white' : 'text-slate-600 hover:bg-slate-50'}`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            )}
          </div>
          <div className="relative" onClick={(e) => e.stopPropagation()}>
            <button 
              type="button" 
              className="cursor-pointer px-3 py-1.5 border border-slate-200 rounded-lg text-slate-700 bg-white text-xs font-semibold hover:bg-slate-50 flex items-center gap-1"
              onClick={() => setOpenDropdown(openDropdown === 'reviewer' ? null : 'reviewer')}
            >
              <span>{selectedReviewer}</span>
              <ChevronDown size={12} className="text-slate-400" />
            </button>
            {openDropdown === 'reviewer' && (
              <div className="absolute left-0 mt-1.5 z-40 bg-white border border-slate-100 rounded-xl p-1.5 shadow-xl w-48 text-left max-h-48 overflow-y-auto">
                {["All Reviewers", "Sarah Jenkins", "Michael Chen", "Alex Rodriguez", "System Auto", "AI Guard"].map((opt) => (
                  <button
                    key={opt}
                    onClick={() => {
                      setSelectedReviewer(opt);
                      setOpenDropdown(null);
                    }}
                    className={`w-full rounded-lg px-3 py-1.5 text-left text-xs font-semibold border-none bg-transparent cursor-pointer ${selectedReviewer === opt ? 'bg-indigo-650 text-white' : 'text-slate-600 hover:bg-slate-50'}`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            )}
          </div>
          <div className="relative" onClick={(e) => e.stopPropagation()}>
            <button 
              type="button" 
              className="cursor-pointer px-3 py-1.5 border border-slate-200 rounded-lg text-slate-700 bg-white text-xs font-semibold hover:bg-slate-50 flex items-center gap-1"
              onClick={() => setOpenDropdown(openDropdown === 'action' ? null : 'action')}
            >
              <span>{selectedAction}</span>
              <ChevronDown size={12} className="text-slate-400" />
            </button>
            {openDropdown === 'action' && (
              <div className="absolute left-0 mt-1.5 z-40 bg-white border border-slate-100 rounded-xl p-1.5 shadow-xl w-48 text-left max-h-48 overflow-y-auto">
                {["All Actions", "ID_APPROVED", "ID_REJECTED", "RISK_OVERRIDE", "DOC_UPLOAD", "FLAG_FOR_REVIEW"].map((opt) => (
                  <button
                    key={opt}
                    onClick={() => {
                      setSelectedAction(opt);
                      setOpenDropdown(null);
                    }}
                    className={`w-full rounded-lg px-3 py-1.5 text-left text-xs font-semibold border-none bg-transparent cursor-pointer ${selectedAction === opt ? 'bg-indigo-650 text-white' : 'text-slate-600 hover:bg-slate-50'}`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            )}
          </div>
          <button 
            type="button" 
            className="primary cursor-pointer flex items-center justify-center gap-1" 
            onClick={handleApplyFilters}
            disabled={isLoading}
          >
            {isLoading ? <Loader2 size={12} className="animate-spin" /> : <Filter size={12} />}
            <span>Apply Filters</span>
          </button>
          <button 
            type="button" 
            className="cursor-pointer flex items-center justify-center gap-1" 
            onClick={handleExportAudit}
          >
            <Download size={12} />
            <span>Export CSV</span>
          </button>
        </div>
        <div className="table-wrap relative" style={{ minHeight: "150px" }}>
          {isLoading && (
            <div className="absolute inset-0 bg-white/70 backdrop-blur-xs flex items-center justify-center z-10">
              <Loader2 size={24} className="text-indigo-900 animate-spin" />
            </div>
          )}
          <div className="table-responsive-wrapper">
<table className="kyc-flow-table">
              <thead>
                <tr>
                  <th>Timestamp</th>
                  <th>Action</th>
                  <th>Performed By</th>
                  <th>IP Address</th>
                  <th>Entity ID</th>
                  <th>Remarks</th>
                </tr>
              </thead>
              <tbody>
                {currentLogs.map((log) => (
                  <tr key={`${log.time}-${log.entity}`}>
                    <td>{log.time}</td>
                    <td>
                      <Badge tone={log.action.includes('REJECTED') || log.action.includes('FLAG') ? 'danger' : 'neutral'}>
                        {log.action}
                      </Badge>
                    </td>
                    <td>{log.reviewer}</td>
                    <td>{log.ip}</td>
                    <td>{log.entity}</td>
                    <td>{log.remarks}</td>
                  </tr>
                ))}
                {currentLogs.length === 0 && (
                  <tr>
                    <td colSpan="6" className="text-center py-8 text-slate-400 font-bold">
                      No compliance logs found matching active filters.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
</div>
        </div>
        <div className="kyc-pagination">
          <button 
            type="button" 
            className="cursor-pointer"
            onClick={() => {
              if (activePage > 1) setActivePage(activePage - 1);
            }}
            disabled={activePage === 1}
          >
            ‹
          </button>
          {Array.from({ length: totalPages }, (_, idx) => idx + 1).map((pNum) => (
            <button 
              key={pNum}
              className={activePage === pNum ? "active cursor-pointer font-bold" : "cursor-pointer"} 
              type="button" 
              onClick={() => setActivePage(pNum)}
            >
              {pNum}
            </button>
          ))}
          {totalPages > 3 && activePage < totalPages - 1 && (
            <>
              <span>...</span>
              <button 
                type="button" 
                className="cursor-pointer" 
                onClick={() => setActivePage(totalPages)}
              >
                {totalPages}
              </button>
            </>
          )}
          <button 
            type="button" 
            className="cursor-pointer"
            onClick={() => {
              if (activePage < totalPages) setActivePage(activePage + 1);
            }}
            disabled={activePage === totalPages}
          >
            ›
          </button>
        </div>
      </Panel>
      <div className="kyc-flow-stats three"><StatCard label="Audit Integrity" value="SHA-256 verified" /><StatCard label="Average Daily Logs" value="4,812" /><StatCard label="Critical Warnings" value="0 Issues" tone="success" /></div>
    </>
  );
}

function ReviewerSection() {
  const [reviewers, setReviewers] = useState([
    { name: 'Elena Dragan', assigned: 482, pending: 12, rate: '88%', status: 'Critical' },
    { name: 'Marcus Knight', assigned: 115, pending: 82, rate: '94%', status: 'Optimal' },
    { name: 'Sarah Chen', assigned: 289, pending: 84, rate: '72%', status: 'Monitoring' },
    { name: 'James Taylor', assigned: 42, pending: 8, rate: '98%', status: 'Under-load' }
  ]);

  const [isDistributing, setIsDistributing] = useState(false);
  const [isOptimizing, setIsOptimizing] = useState(false);
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [targetReviewer, setTargetReviewer] = useState(null);
  const [casesToAssign, setCasesToAssign] = useState(15);
  const [assignmentQueue, setAssignmentQueue] = useState("Aadhaar Verification");

  const handleSmartDistribute = () => {
    setIsDistributing(true);
    setTimeout(() => {
      setReviewers(prev => prev.map(r => ({
        ...r,
        pending: 21,
        status: 'Optimal'
      })));
      setIsDistributing(false);
      toast.success("Smart Load Balancer: Load redistributed equally among online reviewers.");
    }, 1200);
  };

  const handleApplyOptimization = () => {
    setIsOptimizing(true);
    setTimeout(() => {
      setReviewers(prev => prev.map(r => {
        if (r.status === 'Critical') {
          return { ...r, status: 'Optimal', pending: Math.max(r.pending - 8, 2) };
        }
        return r;
      }));
      setIsOptimizing(false);
      toast.success("AI Load Balancing Optimization applied successfully!");
    }, 1000);
  };

  const handleOpenAssign = (reviewer) => {
    setTargetReviewer(reviewer);
    setShowAssignModal(true);
  };

  const handleConfirmAssign = () => {
    setReviewers(prev => prev.map(r => {
      if (r.name === targetReviewer.name) {
        return {
          ...r,
          assigned: r.assigned + Number(casesToAssign),
          pending: r.pending + Number(casesToAssign),
          status: (r.pending + Number(casesToAssign)) > 50 ? 'Critical' : 'Optimal'
        };
      }
      return r;
    }));
    toast.success(`Assigned ${casesToAssign} cases from ${assignmentQueue} queue to ${targetReviewer.name}.`);
    setShowAssignModal(false);
  };

  return (
    <Panel 
      title="Reviewer Assignment" 
      action={
        <button 
          className="primary-action-btn cursor-pointer flex items-center justify-center gap-1.5" 
          type="button" 
          disabled={isDistributing}
          onClick={handleSmartDistribute}
        >
          {isDistributing && <Loader2 size={14} className="animate-spin" />}
          <span>Smart Distribute Load</span>
        </button>
      }
    >
      <div className="kyc-flow-stats three">
        <StatCard label="Total Reviewers" value="24" tone="success" />
        <StatCard label="Unassigned Cases" value="142" tone="danger" />
        <StatCard label="Average Throughput" value="89.4 Cases / Day" />
      </div>
      <div className="table-responsive-wrapper">
<table className="kyc-flow-table">
          <thead>
            <tr>
              <th>Reviewer Name</th>
              <th>Assigned Cases</th>
              <th>Pending</th>
              <th>Approval/Rejection</th>
              <th>Capacity Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {reviewers.map((row) => (
              <tr key={row.name}>
                <td>{row.name}</td>
                <td>{row.assigned}</td>
                <td>{row.pending}</td>
                <td>{row.rate}</td>
                <td>
                  <Badge tone={row.status === 'Critical' ? 'danger' : row.status === 'Optimal' ? 'success' : 'neutral'}>
                    {row.status}
                  </Badge>
                </td>
                <td>
                  <button 
                    type="button" 
                    className="cursor-pointer font-bold text-indigo-750 hover:underline border-none bg-transparent"
                    onClick={() => handleOpenAssign(row)}
                  >
                    Assign
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
</div>
      <div className="kyc-load-card">
        <BarChart3 size={34} />
        <div>
          <strong>Automated Load Balancer</strong>
          <span>AI suggested optimal redistribution of 14 cases from overloaded reviewers.</span>
        </div>
        <button 
          type="button" 
          className="cursor-pointer flex items-center justify-center gap-1.5" 
          disabled={isOptimizing}
          onClick={handleApplyOptimization}
        >
          {isOptimizing && <Loader2 size={14} className="animate-spin" />}
          <span>Apply Optimization</span>
        </button>
      </div>
      {/* ========================================================
          MODAL: ASSIGN CASES DIRECT DIALOG
          ======================================================== */}
      {showAssignModal && targetReviewer && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs select-none animate-in fade-in duration-200">
          <div className="fixed inset-0 bg-transparent" onClick={() => setShowAssignModal(false)} />
          <div className="relative bg-white w-full max-w-sm rounded-2xl border border-slate-100 shadow-2xl p-6 overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-base font-black text-slate-900 tracking-tight">Assign Cases</h3>
                <p className="text-xs font-semibold text-slate-400 mt-0.5">Assigning queue work to {targetReviewer.name}</p>
              </div>
              <button onClick={() => setShowAssignModal(false)} className="p-1 rounded-full text-slate-400 hover:bg-slate-100 hover:text-slate-700 cursor-pointer border-none bg-transparent">
                <X className="h-5 w-5" />
              </button>
            </div>
            
            <div className="space-y-4 text-xs">
              <div>
                <label className="text-[11px] font-black text-slate-500 uppercase tracking-wider block mb-1.5">Source Queue</label>
                <Select
                  value={assignmentQueue}
                  onChange={(e) => setAssignmentQueue(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl bg-white text-slate-800 focus:outline-none focus:border-[#25108f] font-semibold"
                  options={[{
                    label: "Aadhaar Verification",
                    value: "Aadhaar Verification"
                  }, {
                    label: "PAN Verification",
                    value: "PAN Verification"
                  }, {
                    label: "GST Verification & Analytics",
                    value: "GST Verification & Analytics"
                  }, {
                    label: "Driving License Verification",
                    value: "Driving License Verification"
                  }, {
                    label: "Voter ID Identity Match",
                    value: "Voter ID Identity Match"
                  }, {
                    label: "Live Selfie Preview",
                    value: "Live Selfie Preview"
                  }, {
                    label: "Video KYC",
                    value: "Video KYC"
                  }]} />
              </div>

              <div>
                <label className="text-[11px] font-black text-slate-500 uppercase tracking-wider block mb-1.5">Number of Cases</label>
                <input 
                  type="number"
                  min="1"
                  max="100"
                  value={casesToAssign}
                  onChange={(e) => setCasesToAssign(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl bg-white text-slate-850 focus:outline-none focus:border-[#25108f] font-semibold"
                />
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAssignModal(false)}
                  className="flex-1 py-2.5 text-center border border-slate-200 rounded-xl font-bold text-slate-700 bg-white hover:bg-slate-50 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleConfirmAssign}
                  className="flex-1 py-2.5 text-center bg-indigo-900 text-white rounded-xl font-bold hover:bg-indigo-950 cursor-pointer shadow-md"
                >
                  Assign Work
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </Panel>
  );
}

function RejectionSection() {
  return (
    <Panel title="Rejection Management">
      <div className="kyc-flow-stats four"><StatCard label="Total Rejections" value="1,284" tone="danger" /><StatCard label="Restore Rate" value="4.2%" /><StatCard label="Avg Review Time" value="18m" /><StatCard label="Top Category" value="ID Expiry" /></div>
      <div className="table-responsive-wrapper">
<table className="kyc-flow-table"><thead><tr><th>User</th><th>Reason Category</th><th>Rejection Date</th><th>Reviewer Name</th><th>Verification Score</th><th>Actions</th></tr></thead><tbody>{rejectionRows.map((row) => <tr key={row[0]}>{row.map((cell, index) => <td key={index}>{index === 1 ? <Badge tone="danger">{cell}</Badge> : cell}</td>)}<td><button type="button" className="cursor-pointer" onClick={() => toast.success(`Reupload request sent to user: ${row[0]}.`)}>Request Reupload</button></td></tr>)}</tbody></table>
</div>
    </Panel>
  );
}

function DocumentVerification({ title, docLabel, fields, checks, business = false, setActiveSection }) {
  return (
    <div className="kyc-doc-review">
      <Panel title={title}>
        <div className={`kyc-doc-stage ${business ? 'business' : ''}`}>
          <DocumentCard title={docLabel} />
        </div>
      </Panel>
      <Panel title={business ? 'Entity Data Extraction' : 'Extracted OCR Data'}>
        <div className="kyc-ocr-grid">
          {fields.map(([label, value]) => <div key={label}><span>{label}</span><strong>{value}</strong></div>)}
        </div>
        <h3 className="kyc-mini-heading">Validation Engine</h3>
        {checks.map((item, index) => (
          <div className="kyc-check-line" key={item}>
            <span>{item}</span>
            {index === checks.length - 1 ? (
              <span 
                onClick={() => setActiveSection && setActiveSection('Review')} 
                style={{ cursor: 'pointer' }}
              >
                <Badge>Review</Badge>
              </span>
            ) : (
              <CheckCircle2 size={16} />
            )}
          </div>
        ))}
        <textarea placeholder="Optional: Add notes for the audit trail..." />
        <div className="kyc-flow-actions">
          <button type="button" className="danger cursor-pointer" onClick={() => toast.error(`${title} verification has been rejected.`)}>Reject</button>
          <button type="button" className="primary cursor-pointer" onClick={() => toast.success(`${title} verified successfully!`)}>Approve Verification</button>
        </div>
      </Panel>
    </div>
  );
}

function DocumentCard({ title, small = false }) {
  // Rotate degree state helper
  const [degree, setDegree] = useState(0);

  const handleZoom = () => {
    toast.success(`Zoom view triggered for ${title}`);
  };

  const handleRotate = () => {
    const next = (degree + 90) % 360;
    setDegree(next);
    toast.success(`Rotated ${title} image to ${next}°`);
  };

  const handleDownload = () => {
    toast.success(`Downloading high-resolution copy of: ${title.toLowerCase().replace(/ /g, '_')}.jpg`);
  };

  return (
    <div className={`kyc-document-card ${small ? 'small' : ''}`}>
      <div className="kyc-doc-toolbar">
        <Maximize2 size={13} className="cursor-pointer text-slate-400 hover:text-slate-900" onClick={handleZoom} />
        <RotateCw size={13} className="cursor-pointer text-slate-400 hover:text-slate-900" onClick={handleRotate} />
        <Download size={13} className="cursor-pointer text-slate-400 hover:text-slate-900" onClick={handleDownload} />
      </div>
      <div 
        className="kyc-id-card transition-transform duration-200"
        style={{ transform: `rotate(${degree}deg) scale(${degree % 180 !== 0 ? 0.75 : 1})` }}
      >
        <IdCard size={34} />
        <strong>{title}</strong>
        <span>HOZIFY SECURE</span>
        <small>ABCDE1234F</small>
      </div>
    </div>
  );
}
