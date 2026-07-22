import toast from 'react-hot-toast';
import React, { useState, useMemo } from "react";
import AdminShell from "../../components/layouts/AdminShell";
import BusinessHeaderTabs from "./BusinessHeaderTabs";
import { useToast } from "../../components/common/ToastNotification";
import { triggerDownload, generateCSV } from "../../utils/downloadHelper";
import {
  ZoomIn,
  ZoomOut,
  RotateCw,
  Download,
  Printer,
  Expand,
  CheckCircle2,
  AlertCircle,
  Circle,
  PlusCircle,
  Pencil,
  ChevronDown,
  X,
  Clock,
  ShieldCheck,
  Building2,
  Check,
  Plus,
  Minus
} from "lucide-react";

const RECORDS = [
  {
    id: "REG-2024-8842",
    name: "Vanguard Logistics Solutions Ltd.",
    licenseNo: "TL-9920-X1",
    establishDate: "14 May 2018",
    address: "Unit 402, Enterprise Heights, Financial District, South Sector, Metro City, 441022",
    legalStatus: "Limited Liability Company",
    issueDate: "01 Jan 2024",
    expiryDate: "31 Dec 2024",
    expiryColor: "#D7191C",
    progress: 65,
    verified: 11,
    total: 17,
    queueTime: "4h 12m",
    activities: [
      "International Freight Forwarding & Logistics",
      "Warehousing and Inventory Management",
      "Customs Brokerage Services",
    ],
    checklistStatus: {
      entityName: "verified",
      licenseValidity: "urgent",
      addressAudit: "pending",
      uboReview: "verified",
    },
  },
  {
    id: "REG-2024-9013",
    name: "Apex Retail Partners Inc.",
    licenseNo: "TL-5521-B2",
    establishDate: "03 Mar 2020",
    address: "Block C, Regal Trade Tower, Business Hub, East Sector, Commerce City, 110011",
    legalStatus: "Private Limited Corporation",
    issueDate: "15 Mar 2024",
    expiryDate: "15 Mar 2027",
    expiryColor: "#16a34a",
    progress: 90,
    verified: 15,
    total: 17,
    queueTime: "1h 45m",
    activities: [
      "Wholesale Trade & Distribution",
      "Retail Chain Management",
      "Import/Export Consultancy",
    ],
    checklistStatus: {
      entityName: "verified",
      licenseValidity: "verified",
      addressAudit: "pending",
      uboReview: "verified",
    },
  },
  {
    id: "REG-2024-7701",
    name: "BioStream Labs Pvt. Ltd.",
    licenseNo: "TL-3310-C5",
    establishDate: "20 Jul 2016",
    address: "Lab Complex 7A, Pharma Zone, North Science Park, Research City, 560001",
    legalStatus: "Private Limited Company",
    issueDate: "01 Jan 2024",
    expiryDate: "31 Oct 2024",
    expiryColor: "#f59e0b",
    progress: 42,
    verified: 7,
    total: 17,
    queueTime: "7h 30m",
    activities: [
      "Pharmaceutical Research & Development",
      "Clinical Trial Management",
      "Biotech Supply Chain",
    ],
    checklistStatus: {
      entityName: "verified",
      licenseValidity: "urgent",
      addressAudit: "pending",
      uboReview: "urgent",
    },
  },
];

const STATUS_ICONS = {
  verified: <CheckCircle2 size={16} className="text-emerald-500 shrink-0 mt-0.5" />,
  urgent: <AlertCircle size={16} className="text-rose-500 shrink-0 mt-0.5" />,
  pending: <Circle size={14} className="text-slate-400 shrink-0 mt-0.5" />,
};

export default function RegistrationVerification() {
  const { addToast } = useToast();

  const [selectedRecord, setSelectedRecord] = useState(RECORDS[0]);
  const [scale, setScale] = useState(1);
  const [rotation, setRotation] = useState(0);
  
  const [checklistStatus, setChecklistStatus] = useState(selectedRecord.checklistStatus);
  const [progress, setProgress] = useState(selectedRecord.progress);
  const [verifiedCount, setVerifiedCount] = useState(selectedRecord.verified);
  
  const [statuses, setStatuses] = useState({}); // { id: 'pending' | 'approved' | 'rejected' | 'flagged' }
  const [rejectionReasons, setRejectionReasons] = useState({});
  const [rejectModalOpen, setRejectModalOpen] = useState(false);
  const [rejectReason, setRejectReason] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const activeStatus = statuses[selectedRecord.id] || "pending";

  const [customItems, setCustomItems] = useState([]);
  const [timeline, setTimeline] = useState([
    { label: "Queue Assignment", time: "Today • 09:10 AM", done: true },
    { label: "Entity Name Check", time: "Today • 09:30 AM", done: true },
  ]);

  const switchRecord = (rec) => {
    setSelectedRecord(rec);
    setChecklistStatus(rec.checklistStatus);
    setProgress(rec.progress);
    setVerifiedCount(rec.verified);
    setScale(1);
    setRotation(0);
    setCustomItems([]);
    addToast(`Switched to record: ${rec.id}`, "info");
  };

  const handleChecklistAction = (key, action) => {
    const newStatus = { ...checklistStatus, [key]: action };
    setChecklistStatus(newStatus);

    const verifiedItems = Object.values(newStatus).filter((s) => s === "verified").length;
    const total = selectedRecord.total;
    const base = total - 4;
    const newVerified = base + verifiedItems;
    setVerifiedCount(newVerified);
    setProgress(Math.round((newVerified / total) * 100));

    const msg = action === "verified" ? "✓ Item marked as Verified!" : action === "urgent" ? "⚠ Item flagged as Invalid." : "Item marked for review.";
    addToast(msg, action === "verified" ? "success" : "error");

    setTimeline((prev) => [
      { label: `${key.replace(/([A-Z])/g, " $1")} → ${action}`, time: "Just now", done: action === "verified" },
      ...prev,
    ]);
  };

  const handleApprove = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setStatuses(prev => ({ ...prev, [selectedRecord.id]: "approved" }));
      setProgress(100);
      setVerifiedCount(selectedRecord.total);
      setChecklistStatus({ entityName: "verified", licenseValidity: "verified", addressAudit: "verified", uboReview: "verified" });
      setTimeline((prev) => [{ label: "Registration Approved", time: "Just now", done: true }, ...prev]);
      addToast(`Registration ${selectedRecord.id} approved successfully!`, "success");
    }, 800);
  };

  const handleRejectSubmit = () => {
    if (!rejectReason.trim()) { 
      addToast("Please enter a rejection reason.", "error"); 
      return; 
    }
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setStatuses(prev => ({ ...prev, [selectedRecord.id]: "rejected" }));
      setRejectionReasons(prev => ({ ...prev, [selectedRecord.id]: rejectReason }));
      setRejectModalOpen(false);
      setTimeline((prev) => [{ label: `Rejected: "${rejectReason}"`, time: "Just now", done: false }, ...prev]);
      addToast(`Registration ${selectedRecord.id} rejected.`, "error");
      setRejectReason("");
    }, 800);
  };

  const handleFlag = () => {
    setStatuses(prev => ({ ...prev, [selectedRecord.id]: "flagged" }));
    setTimeline((prev) => [{ label: `Flagged for senior review`, time: "Just now", done: false }, ...prev]);
    addToast(`${selectedRecord.id} flagged for senior reviewer.`, "info");
  };

  const handleResetDecision = () => {
    setStatuses(prev => ({ ...prev, [selectedRecord.id]: "pending" }));
    setProgress(selectedRecord.progress);
    setVerifiedCount(selectedRecord.verified);
    setChecklistStatus(selectedRecord.checklistStatus);
    setTimeline((prev) => [{ label: `Decision reset to pending`, time: "Just now", done: true }, ...prev]);
    addToast("Decision status reset to pending.", "success");
  };

  const handleAddCustomItem = () => {
    const label = prompt("Enter checklist item name:");
    if (label && label.trim()) {
      setCustomItems((prev) => [...prev, { label: label.trim(), status: "pending" }]);
      addToast("Custom checklist item added.", "success");
    }
  };

  const handleDownload = () => {
    const data = [
      ["Field", "Value"],
      ["Record ID", selectedRecord.id],
      ["Company Name", selectedRecord.name],
      ["License No", selectedRecord.licenseNo],
      ["Establish Date", selectedRecord.establishDate],
      ["Address", selectedRecord.address],
      ["Legal Status", selectedRecord.legalStatus],
      ["Expiry Date", selectedRecord.expiryDate],
      ["Progress Complete", `${progress}%`],
      ["Verification Status", activeStatus.toUpperCase()]
    ];
    const csvContent = generateCSV(data[0], data.slice(1));
    triggerDownload(csvContent, `registration_verify_${selectedRecord.id}.csv`, "text/csv");
    addToast(`Report downloaded successfully for ${selectedRecord.name}`, "success");
  };

  return (
    <AdminShell
      activeTab="Business"
      headerTitle="Business Registry"
      headerTabs={<BusinessHeaderTabs activeTab="Compliance" />}
      searchPlaceholder="Search registry..."
    >
      <div className="business-doc-review-wrapper" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-section)' }}>
        
        {/* Selection pills row */}
        <div style={{ display: 'flex', alignItems: 'center', justifySelf: 'stretch', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px', borderBottom: '1px solid #e2e8f0', paddingBottom: '16px' }}>
          <div style={{ display: 'flex', gap: '10px', overflowY: 'auto', maxHeight: '400px', maxWidth: '100%', paddingBottom: '4px' }}>
            {RECORDS.map(r => {
              const isSelected = selectedRecord.id === r.id;
              const status = statuses[r.id] || "pending";
              return (
                <button
                  key={r.id}
                  onClick={() => switchRecord(r)}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border text-xs font-bold transition whitespace-nowrap cursor-pointer ${
                    isSelected 
                      ? 'bg-indigo-900 text-white border-indigo-900 shadow-md' 
                      : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                  }`}
                  type="button"
                >
                  <span>{r.name.replace(" Solutions Ltd.", "").replace(" Partners Inc.", "").replace(" Labs Pvt. Ltd.", "")}</span>
                  <span className={`w-2 h-2 rounded-full ${
                    status === 'approved' ? 'bg-emerald-500' : status === 'rejected' ? 'bg-rose-500' : status === 'flagged' ? 'bg-indigo-500' : 'bg-amber-400'
                  }`} />
                </button>
              );
            })}
          </div>
        </div>

        {/* Task Tag */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '11px', fontWeight: '800', color: '#4f46e5', background: '#e0e7ff', padding: '6px 12px', borderRadius: '20px', alignSelf: 'flex-start', border: '1px solid #c7d2fe' }}>
          <ShieldCheck size={14} />
          <span style={{ letterSpacing: '0.5px' }}>TASK: REGISTRATION VALIDATION</span>
        </div>

        {/* Title Block */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <h1 className="page-title" style={{ margin: 0, fontSize: '24px', fontWeight: '900', letterSpacing: '-0.5px', color: '#0f172a' }}>Review Document: Trade License</h1>
            <p className="page-subtitle" style={{ margin: '6px 0 0', color: '#64748b', fontSize: '14px', fontWeight: '500' }}>Awaiting administrative check for {selectedRecord.name}.</p>
          </div>

          <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
            <span style={{ fontSize: '12px', fontWeight: '700', color: '#64748b', marginRight: '4px' }}>Zoom: {Math.round(scale * 100)}%</span>
            <button 
              style={{ border: '1px solid #cbd5e1', background: '#fff', color: '#334155', height: '36px', width: '36px', borderRadius: '8px', display: 'flex', alignItems: 'center', justifySelf: 'stretch', justifyContent: 'center', cursor: 'pointer', transition: 'all 0.2s' }} 
              type="button" 
              title="Zoom In" 
              onClick={() => setScale(s => Math.min(s + 0.15, 1.6))}
            >
              <Plus size={16} />
            </button>
            <button 
              style={{ border: '1px solid #cbd5e1', background: '#fff', color: '#334155', height: '36px', width: '36px', borderRadius: '8px', display: 'flex', alignItems: 'center', justifySelf: 'stretch', justifyContent: 'center', cursor: 'pointer', transition: 'all 0.2s' }} 
              type="button" 
              title="Zoom Out" 
              onClick={() => setScale(s => Math.max(s - 0.15, 0.7))}
            >
              <Minus size={16} />
            </button>
            <button 
              style={{ border: '1px solid #cbd5e1', background: '#fff', color: '#334155', height: '36px', width: '36px', borderRadius: '8px', display: 'flex', alignItems: 'center', justifySelf: 'stretch', justifyContent: 'center', cursor: 'pointer', transition: 'all 0.2s' }} 
              type="button" 
              title="Rotate Clockwise" 
              onClick={() => setRotation(r => (r + 90) % 360)}
            >
              <RotateCw size={16} />
            </button>
            <button 
              style={{ border: '1px solid #cbd5e1', background: '#fff', color: '#334155', height: '36px', width: '36px', borderRadius: '8px', display: 'flex', alignItems: 'center', justifySelf: 'stretch', justifyContent: 'center', cursor: 'pointer', transition: 'all 0.2s' }} 
              type="button" 
              title="Download Report" 
              onClick={handleDownload}
            >
              <Download size={16} />
            </button>
          </div>
        </div>

        {/* 2-Column main content layout */}
        <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 'var(--spacing-section)', alignItems: 'start' }}>
          
          {/* Column 1: Document canvas visual (Left) */}
          <div className="panel" style={{ background: '#0f172a', padding: 'var(--spacing-section)', display: 'flex', alignItems: 'center', justifySelf: 'stretch', justifyContent: 'center', minHeight: '560px', overflow: 'auto', borderRadius: '12px', border: '1px solid #1e293b', boxShadow: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.6)' }}>
            
            {/* Scanned Document simulator mock */}
            <div style={{ 
              width: '100%', 
              maxWidth: '420px', 
              background: '#fff', 
              border: '1px solid #e2e8f0', 
              borderRadius: '8px', 
              padding: 'var(--spacing-section)', 
              position: 'relative', 
              boxShadow: '0 20px 25px -5px rgba(0,0,0,0.5)',
              transform: `scale(${scale}) rotate(${rotation}deg)`,
              transformOrigin: 'top center',
              transition: 'transform 0.2s ease-out-in'
            }}>
              
              {/* Box highlighter for License detected */}
              <div style={{ position: 'absolute', top: '75px', left: '135px', right: '15px', height: '24px', border: '1.5px solid #4f46e5', background: 'rgba(79, 70, 229, 0.06)', borderRadius: '4px', zIndex: 10, display: 'flex', alignItems: 'center', padding: '0 6px' }}>
                <span style={{ background: '#4f46e5', color: '#fff', fontSize: '6px', fontWeight: '900', padding: '1.5px 3px', borderRadius: '2px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>LICENSE DETECTED</span>
              </div>

              {/* Header document scan */}
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', borderBottom: '1.5px solid #0f172a', paddingBottom: '10px', marginBottom: '14px' }}>
                <strong style={{ fontSize: '9px', letterSpacing: '0.8px', color: '#0f172a', fontWeight: '900' }}>DEPARTMENT OF CONSUMER AFFAIRS</strong>
                <span style={{ fontSize: '7px', color: '#475569', marginTop: '2px', fontWeight: '700' }}>MUNICIPAL TRADE REGISTER LICENSE</span>
              </div>

              {/* Body lines scanned */}
              <div style={{ display: 'flex', gap: '14px', marginBottom: '16px' }}>
                <div style={{ width: '60px', height: '60px', borderRadius: '4px', background: '#eff6ff', display: 'flex', alignItems: 'center', justifySelf: 'stretch', justifyContent: 'center', color: '#2563eb', flexShrink: 0 }}>
                  <Building2 size={24} />
                </div>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '8px', color: '#334155', flex: 1 }}>
                  <div>
                    <span style={{ fontSize: '5px', color: '#94a3b8', display: 'block', textTransform: 'uppercase' }}>License Number</span>
                    <strong style={{ color: '#0f172a', fontFamily: "var(--materio-space)", fontSize: '9.5px' }}>{selectedRecord.licenseNo}</strong>
                  </div>
                  <div>
                    <span style={{ fontSize: '5px', color: '#94a3b8', display: 'block', textTransform: 'uppercase' }}>Commercial Name / Trade Entity</span>
                    <strong style={{ color: '#0f172a', fontSize: '8.5px' }}>{selectedRecord.name}</strong>
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '8px', color: '#475569', borderBottom: '1px solid #f1f5f9', paddingBottom: '12px', marginBottom: '12px' }}>
                <div>
                  <span style={{ fontSize: '5px', color: '#94a3b8', display: 'block', textTransform: 'uppercase' }}>Registered Address</span>
                  <strong style={{ color: '#0f172a' }}>{selectedRecord.address}</strong>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '6px' }}>
                  <div>
                    <span style={{ fontSize: '5px', color: '#94a3b8', display: 'block', textTransform: 'uppercase' }}>Legal Status</span>
                    <strong style={{ color: '#334155' }}>{selectedRecord.legalStatus}</strong>
                  </div>
                  <div>
                    <span style={{ fontSize: '5px', color: '#94a3b8', display: 'block', textTransform: 'uppercase' }}>Issue Date</span>
                    <strong style={{ color: '#334155' }}>{selectedRecord.issueDate}</strong>
                  </div>
                  <div>
                    <span style={{ fontSize: '5px', color: '#94a3b8', display: 'block', textTransform: 'uppercase' }}>Expiry Date</span>
                    <strong style={{ color: selectedRecord.expiryColor }}>{selectedRecord.expiryDate}</strong>
                  </div>
                </div>
              </div>

              <div>
                <span style={{ fontSize: '5px', color: '#94a3b8', display: 'block', textTransform: 'uppercase', marginBottom: '4px' }}>Licensed Trade Activities</span>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
                  {selectedRecord.activities.map((act, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '7px', color: '#334155' }}>
                      <span style={{ height: '3px', width: '3px', borderRadius: '50%', background: '#64748b' }} />
                      <span>{act}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Card stamp/seal */}
              <div style={{ display: 'flex', justifySelf: 'stretch', justifyContent: 'space-between', alignItems: 'center', marginTop: '16px', borderTop: '1px dashed #cbd5e1', paddingTop: '10px' }}>
                <div style={{ border: '1.5px solid #059669', color: '#059669', borderRadius: '4px', fontSize: '6px', padding: '2px 4px', fontWeight: '950', transform: 'rotate(-5deg)' }}>
                  REGISTERED & STAMPED
                </div>
                <div style={{ textAlign: 'right', display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
                  <div style={{ width: '40px', height: '1px', background: '#64748b' }} />
                  <span style={{ fontSize: '5px', color: '#94a3b8', marginTop: '2px' }}>Licensing Authority</span>
                </div>
              </div>

            </div>

          </div>

          {/* Column 2: Metadata details, AI Verification, Activity Feed (Right) */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            
            {/* Application Progress */}
            <div className="panel" style={{ padding: '20px', border: '1px solid #e2e8f0', borderRadius: '12px' }}>
              <h2 style={{ fontSize: '11px', fontWeight: '900', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.5px', margin: '0 0 12px' }}>Application Progress</h2>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '14px' }}>
                <div style={{ height: '8px', flex: 1, background: '#e2e8f0', borderRadius: '10px', overflow: 'hidden' }}>
                  <div style={{ height: '100%', background: '#0f172a', width: `${progress}%`, borderRadius: '10px', transition: 'width 0.3s' }} />
                </div>
                <span style={{ fontSize: '12px', fontWeight: '850', color: '#0f172a' }}>{progress}%</span>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div style={{ background: '#f8fafc', padding: '10px 14px', borderRadius: '8px', border: '1px solid #f1f5f9' }}>
                  <span style={{ display: 'block', fontSize: '9px', fontWeight: '750', color: '#94a3b8', textTransform: 'uppercase' }}>Items Verified</span>
                  <strong style={{ fontSize: '14px', color: '#0f172a', display: 'block', marginTop: '2px' }}>{verifiedCount}/{selectedRecord.total}</strong>
                </div>
                <div style={{ background: '#f8fafc', padding: '10px 14px', borderRadius: '8px', border: '1px solid #f1f5f9' }}>
                  <span style={{ display: 'block', fontSize: '9px', fontWeight: '750', color: '#94a3b8', textTransform: 'uppercase' }}>Time In Queue</span>
                  <strong style={{ fontSize: '14px', color: '#0f172a', display: 'block', marginTop: '2px' }}>{selectedRecord.queueTime}</strong>
                </div>
              </div>
            </div>

            {/* Verification Checklist */}
            <div className="panel" style={{ padding: '20px', border: '1px solid #e2e8f0', borderRadius: '12px' }}>
              <div style={{ display: 'flex', justifySelf: 'stretch', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #f1f5f9', paddingBottom: '12px', marginBottom: '14px' }}>
                <h2 style={{ fontSize: '13px', fontWeight: '900', color: '#0f172a', textTransform: 'uppercase', letterSpacing: '0.3px', margin: 0 }}>Verification Checklist</h2>
                <span style={{ background: '#dbeafe', px: '8px', py: '3px', borderRadius: '12px', fontSize: '10px', fontWeight: '750', color: '#1e40af', padding: '3px 8px' }}>
                  ACTION REQUIRED
                </span>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {/* Entity Name */}
                <div>
                  <div style={{ display: 'flex', justifySelf: 'stretch', justifyContent: 'space-between', alignItems: 'start' }}>
                    <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                      {STATUS_ICONS[checklistStatus.entityName]}
                      <strong style={{ fontSize: '12px', color: '#0f172a' }}>Entity Name Verification</strong>
                    </div>
                    <button onClick={() => handleChecklistAction("entityName", checklistStatus.entityName === "verified" ? "pending" : "verified")} type="button" style={{ border: 'none', background: 'transparent', cursor: 'pointer', padding: 0 }}>
                      <Pencil size={14} className="text-slate-400 hover:text-indigo-900" />
                    </button>
                  </div>
                  <div style={{ marginLeft: '24px', marginTop: '6px', background: checklistStatus.entityName === "verified" ? '#ecfdf5' : '#f8fafc', padding: '8px 12px', borderRadius: '8px', border: checklistStatus.entityName === "verified" ? '1px solid #d1fae5' : '1px solid #f1f5f9' }}>
                    <span style={{ fontSize: '11px', color: checklistStatus.entityName === "verified" ? '#065f46' : '#64748b', lineHeight: '1.4', display: 'block' }}>
                      {checklistStatus.entityName === "verified" ? "Match found in National Registry. No discrepancies detected." : "Pending national registry cross-check."}
                    </span>
                  </div>
                </div>

                {/* License Validity */}
                <div style={{ borderTop: '1px solid #f1f5f9', paddingTop: '14px' }}>
                  <div style={{ display: 'flex', justifySelf: 'stretch', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                    <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                      {STATUS_ICONS[checklistStatus.licenseValidity]}
                      <strong style={{ fontSize: '12px', color: '#0f172a' }}>License Validity Period</strong>
                    </div>
                    {checklistStatus.licenseValidity === "urgent" && (
                      <span style={{ background: '#fee2e2', color: '#ef4444', fontSize: '9px', fontWeight: '800', padding: '2px 6px', borderRadius: '4px' }}>URGENT</span>
                    )}
                  </div>
                  <div style={{ marginLeft: '24px' }}>
                    <p style={{ fontSize: '11px', color: '#64748b', lineHeight: '1.4', margin: '0 0 10px' }}>
                      {checklistStatus.licenseValidity === "urgent"
                        ? "Document expiry date is within 90 days. Check for renewal application or flag for review."
                        : "License validity period confirmed and within acceptable range."}
                    </p>
                    <div style={{ display: 'flex', gap: '6px' }}>
                      <button onClick={() => handleChecklistAction("licenseValidity", "urgent")} type="button" style={{ height: '26px', padding: '0 10px', borderRadius: '6px', background: '#ef4444', border: 'none', color: '#fff', fontSize: '10px', fontWeight: '800', cursor: 'pointer' }}>Invalid</button>
                      <button onClick={() => handleChecklistAction("licenseValidity", "pending")} type="button" style={{ height: '26px', padding: '0 10px', borderRadius: '6px', background: '#cbd5e1', border: 'none', color: '#334155', fontSize: '10px', fontWeight: '800', cursor: 'pointer' }}>Flag</button>
                      <button onClick={() => handleChecklistAction("licenseValidity", "verified")} type="button" style={{ height: '26px', padding: '0 10px', borderRadius: '6px', background: '#fff', border: '1px solid #cbd5e1', color: '#334155', fontSize: '10px', fontWeight: '800', cursor: 'pointer' }}>Verified</button>
                    </div>
                  </div>
                </div>

                {/* Registered Address Audit */}
                <div style={{ borderTop: '1px solid #f1f5f9', paddingTop: '14px' }}>
                  <div style={{ display: 'flex', justifySelf: 'stretch', justifyContent: 'space-between', alignItems: 'start' }}>
                    <div style={{ display: 'flex', gap: '8px', alignItems: 'start' }}>
                      {STATUS_ICONS[checklistStatus.addressAudit]}
                      <div>
                        <strong style={{ fontSize: '12px', color: '#0f172a', display: 'block' }}>Registered Address Audit</strong>
                        <span style={{ fontSize: '10px', color: '#64748b', display: 'block', marginTop: '2px' }}>Verify address against utility bill registry records.</span>
                      </div>
                    </div>
                    <button
                      onClick={() => handleChecklistAction("addressAudit", checklistStatus.addressAudit === "verified" ? "pending" : "verified")}
                      type="button"
                      style={{ border: '1px solid #cbd5e1', background: '#fff', color: '#334155', fontSize: '10px', fontWeight: '800', height: '26px', padding: '0 10px', borderRadius: '6px', cursor: 'pointer' }}
                    >
                      {checklistStatus.addressAudit === "verified" ? "Revert" : "Verify"}
                    </button>
                  </div>
                </div>

                {/* UBO Review */}
                <div style={{ borderTop: '1px solid #f1f5f9', paddingTop: '14px' }}>
                  <div style={{ display: 'flex', gap: '8px', alignItems: 'start' }}>
                    {STATUS_ICONS[checklistStatus.uboReview]}
                    <div style={{ flex: 1 }}>
                      <strong style={{ fontSize: '12px', color: '#0f172a', display: 'block' }}>UBO & Shareholders Review</strong>
                      
                      <div style={{ marginTop: '8px', background: '#f8fafc', padding: '8px 12px', borderRadius: '8px', border: '1px solid #f1f5f9', display: 'flex', justifySelf: 'stretch', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div>
                          <strong style={{ fontSize: '11px', color: '#0f172a', display: 'block' }}>Marcus J. Thorne</strong>
                          <span style={{ fontSize: '10px', color: '#64748b', display: 'block', marginTop: '1px' }}>Beneficial Ownership: 45%</span>
                        </div>
                        <button
                          onClick={() => handleChecklistAction("uboReview", checklistStatus.uboReview === "verified" ? "urgent" : "verified")}
                          type="button"
                          style={{ background: "none", border: "none", cursor: "pointer", padding: 0 }}
                        >
                          <Pencil size={14} className="text-slate-400 hover:text-indigo-900" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Custom Items */}
                {customItems.map((item, idx) => (
                  <div key={idx} style={{ borderTop: '1px solid #f1f5f9', paddingTop: '14px', display: 'flex', items: 'center', gap: '8px', fontSize: '12px' }}>
                    <Circle size={14} className="text-slate-400 shrink-0 mt-0.5" />
                    <span style={{ fontWeight: '700', color: '#0f172a' }}>{item.label}</span>
                  </div>
                ))}

                {/* Add Custom Item */}
                <div style={{ borderTop: '1px solid #f1f5f9', paddingTop: '14px' }}>
                  <button
                    onClick={handleAddCustomItem}
                    type="button"
                    style={{ display: 'flex', width: '100%', alignItems: 'center', justifyContent: 'center', gap: '8px', border: '1.5px dashed #cbd5e1', background: '#fafafa', borderRadius: '8px', height: '40px', fontSize: '11px', fontWeight: '800', color: '#475569', cursor: 'pointer' }}
                  >
                    <PlusCircle size={14} />
                    <span>Add Custom Checklist Item</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Activity Log */}
            <div className="panel" style={{ padding: '20px', border: '1px solid #e2e8f0', borderRadius: '12px' }}>
              <h3 style={{ fontSize: '11px', fontWeight: '900', color: '#334155', textTransform: 'uppercase', letterSpacing: '0.3px', margin: '0 0 12px' }}>Activity Log</h3>
              
              <div className="relative">
                <div style={{ position: 'absolute', left: '4px', top: '6px', bottom: '6px', width: '2px', background: '#f1f5f9' }} />
                {timeline.map((item, i) => (
                  <div key={i} style={{ display: 'flex', gap: '10px', position: 'relative', marginBottom: '12px' }} className="last:mb-0">
                    <div style={{ height: '8px', width: '8px', borderRadius: '50%', background: item.done ? '#4f46e5' : '#cbd5e1', zIndex: 10, marginTop: '4px', flexShrink: 0 }} />
                    <div style={{ fontSize: '11px' }}>
                      <strong style={{ display: 'block', color: item.done ? '#0f172a' : '#64748b', fontWeight: '700' }}>{item.label}</strong>
                      <span style={{ color: '#94a3b8', fontSize: '10px', marginTop: '1px', display: 'block' }}>{item.time}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>

        {/* Bottom Verification Actions bar */}
        {activeStatus === 'approved' ? (
          <div style={{ 
            marginTop: '20px',
            background: '#ecfdf5',
            border: '1px solid #a7f3d0',
            borderRadius: '12px',
            padding: '16px 24px',
            display: 'flex',
            flexWrap: 'wrap',
            gap: '16px',
            justifyContent: 'space-between',
            alignItems: 'center',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', fontWeight: '700', color: '#065f46' }}>
              <CheckCircle2 size={16} />
              <span>Registration approved successfully!</span>
            </div>
            <button
              onClick={handleResetDecision}
              style={{ border: '1px solid #6ee7b7', background: '#fff', color: '#065f46', fontSize: '12px', fontWeight: '800', height: '36px', padding: '0 16px', borderRadius: '8px', cursor: 'pointer', transition: 'all 0.2s' }}
              type="button"
            >
              Reset Decision
            </button>
          </div>
        ) : activeStatus === 'rejected' ? (
          <div style={{ 
            marginTop: '20px',
            background: '#fff5f5',
            border: '1px solid #fecaca',
            borderRadius: '12px',
            padding: '16px 24px',
            display: 'flex',
            flexWrap: 'wrap',
            gap: '16px',
            justifyContent: 'space-between',
            alignItems: 'center',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', fontWeight: '700', color: '#991b1b' }}>
              <AlertCircle size={16} />
              <span>Registration rejected. Reason: {rejectionReasons[selectedRecord.id]}</span>
            </div>
            <button
              onClick={handleResetDecision}
              style={{ border: '1px solid #fca5a5', background: '#fff', color: '#991b1b', fontSize: '12px', fontWeight: '800', height: '36px', padding: '0 16px', borderRadius: '8px', cursor: 'pointer', transition: 'all 0.2s' }}
              type="button"
            >
              Reset Decision
            </button>
          </div>
        ) : activeStatus === 'flagged' ? (
          <div style={{ 
            marginTop: '20px',
            background: '#eff6ff',
            border: '1px solid #bfdbfe',
            borderRadius: '12px',
            padding: '16px 24px',
            display: 'flex',
            flexWrap: 'wrap',
            gap: '16px',
            justifyContent: 'space-between',
            alignItems: 'center',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', fontWeight: '700', color: '#1e40af' }}>
              <AlertCircle size={16} />
              <span>Application currently FLAGGED for Senior Review.</span>
            </div>
            <button
              onClick={handleResetDecision}
              style={{ border: '1px solid #93c5fd', background: '#fff', color: '#1e40af', fontSize: '12px', fontWeight: '800', height: '36px', padding: '0 16px', borderRadius: '8px', cursor: 'pointer', transition: 'all 0.2s' }}
              type="button"
            >
              Reset Status
            </button>
          </div>
        ) : (
          <div style={{ 
            marginTop: '20px',
            background: '#fff',
            border: '1px solid #e2e8f0',
            borderRadius: '12px',
            padding: '16px 24px',
            display: 'flex',
            flexWrap: 'wrap',
            gap: '16px',
            justifyContent: 'space-between',
            alignItems: 'center',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', fontWeight: '600', color: '#64748b' }}>
              <AlertCircle size={15} className="text-amber-500 shrink-0" />
              <span>Awaiting final decision check. Click verify to register changes.</span>
            </div>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
              <button
                style={{ border: '1px solid #cbd5e1', background: '#fff', color: '#475569', fontSize: '13px', fontWeight: '800', height: '40px', padding: '0 20px', borderRadius: '8px', cursor: 'pointer', transition: 'all 0.2s' }}
                onClick={handleFlag}
                type="button"
              >
                Flag for Review
              </button>
              <button
                style={{ border: '1px solid #fca5a5', background: '#fff', color: '#ef4444', fontSize: '13px', fontWeight: '800', height: '40px', padding: '0 20px', borderRadius: '8px', cursor: 'pointer', transition: 'all 0.2s' }}
                onClick={() => setRejectModalOpen(true)}
                type="button"
              >
                Reject Application
              </button>
              <button
                style={{ border: 'none', background: '#4f46e5', color: '#fff', fontSize: '13px', fontWeight: '800', height: '40px', padding: '0 20px', borderRadius: '8px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px', transition: 'all 0.2s' }}
                onClick={handleApprove}
                disabled={isSubmitting}
                type="button"
                className="hover:bg-indigo-700 shadow-md"
              >
                {isSubmitting ? 'Processing...' : (
                  <>
                    <Check size={16} /> 
                    <span>Approve Registration</span>
                  </>
                )}
              </button>
            </div>
          </div>
        )}

        {/* ========================================================
            MODAL: REJECT WITH REASON DIALOG
            ======================================================== */}
        {rejectModalOpen && (
          <div style={{ position: 'fixed', inset: 0, zIndex: 9999, display: 'flex', alignItems: 'center', justifySelf: 'stretch', justifyContent: 'center', background: 'rgba(15,23,42,0.6)', backdropFilter: 'blur(2px)' }}>
            <div style={{ position: 'absolute', inset: 0 }} onClick={() => { setRejectModalOpen(false); setRejectReason(''); }} />
            <div style={{ position: 'relative', background: '#fff', width: '100%', maxWidth: '400px', margin: 'auto', borderRadius: '16px', padding: 'var(--spacing-section)', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.25)', border: '1px solid #f1f5f9' }}>
              <div style={{ display: 'flex', justifySelf: 'stretch', justifyContent: 'space-between', alignItems: 'start', marginBottom: '16px' }}>
                <div>
                  <h3 style={{ fontSize: '16px', fontWeight: '900', color: '#0f172a', margin: 0 }}>Reject Registration</h3>
                  <p style={{ fontSize: '12px', color: '#64748b', marginTop: '2px', margin: 0 }}>Document validation query for {selectedRecord.name}</p>
                </div>
                <button onClick={() => { setRejectModalOpen(false); setRejectReason(''); }} style={{ border: 'none', background: 'transparent', cursor: 'pointer', color: '#94a3b8' }} type="button">
                  <X size={20} />
                </button>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <div>
                  <label style={{ fontSize: '11px', fontWeight: '800', textTransform: 'uppercase', color: '#64748b', display: 'block', marginBottom: '6px' }}>Reason for Rejection</label>
                  <textarea
                    rows="4"
                    value={rejectReason}
                    onChange={(e) => setRejectReason(e.target.value)}
                    placeholder="E.g., Expired trade license period, legal registered address mismatch, failed UBO background check..."
                    style={{ width: '100%', padding: '10px 12px', border: '1px solid #cbd5e1', borderRadius: '8px', fontSize: '12px', outline: 'none', resize: 'none',  }}
                  />
                </div>

                <div style={{ display: 'flex', gap: '10px', marginTop: '4px' }}>
                  <button
                    type="button"
                    onClick={() => { setRejectModalOpen(false); setRejectReason(''); }}
                    style={{ flex: 1, padding: '10px', height: '38px', background: '#fff', border: '1px solid #cbd5e1', borderRadius: '8px', fontSize: '12px', fontWeight: '750', color: '#475569', cursor: 'pointer' }}
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={handleRejectSubmit}
                    disabled={isSubmitting}
                    style={{ flex: 1, padding: '10px', height: '38px', background: '#ef4444', border: 'none', borderRadius: '8px', fontSize: '12px', fontWeight: '750', color: '#fff', cursor: 'pointer' }}
                  >
                    {isSubmitting ? 'Rejecting...' : 'Confirm Reject'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </AdminShell>
  );
}
