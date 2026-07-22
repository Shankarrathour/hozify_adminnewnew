import toast from 'react-hot-toast';
import React, { useState, useMemo } from "react";
import AdminShell from "../../components/layouts/AdminShell";
import BusinessHeaderTabs from "./BusinessHeaderTabs";
import { useToast } from "../../components/common/ToastNotification";
import { triggerDownload, generateCSV } from "../../utils/downloadHelper";
import {
  ShieldCheck,
  CheckCircle2,
  Lock,
  ChevronDown,
  X,
  RotateCw,
  ZoomIn,
  ZoomOut,
  Download,
  Check,
  Plus,
  Minus,
  AlertTriangle
} from "lucide-react";

const RECORDS = [
  {
    id: "VER-99201-GLS",
    company: "Global Logistics Solutions Ltd",
    stakeholders: [
      {
        name: "Marcus Vane",
        ownership: "45%",
        status: "verified",
        docNumber: "E8921004X",
        dob: "11 Mar 1979",
        expiry: "12 Nov 2027",
        expiryColor: "#16a34a",
        ocrScore: "98.4%",
        livenessCheck: "Verified",
        screenStatus: "PASSED",
        screenColor: "#16a34a",
        screenBg: "#F0FDF4",
        screenBorder: "#D8F3DC",
      },
      {
        name: "Elena Rodriguez",
        ownership: "40%",
        status: "alert",
        docNumber: "B7411239M",
        dob: "24 Jan 1982",
        expiry: "15 Nov 2023",
        expiryColor: "#DC2626",
        ocrScore: "91.2%",
        livenessCheck: "Inconclusive",
        screenStatus: "ATTENTION REQUIRED",
        screenColor: "#EA580C",
        screenBg: "#FFF7ED",
        screenBorder: "#FED7AA",
      },
    ],
    minorStakeholders: "15%",
  },
  {
    id: "VER-44122-ARP",
    company: "Apex Retail Partners Inc.",
    stakeholders: [
      {
        name: "Sarah Jenkins",
        ownership: "60%",
        status: "verified",
        docNumber: "A1234567B",
        dob: "08 Jul 1975",
        expiry: "30 Jun 2028",
        expiryColor: "#16a34a",
        ocrScore: "99.1%",
        livenessCheck: "Verified",
        screenStatus: "PASSED",
        screenColor: "#16a34a",
        screenBg: "#F0FDF4",
        screenBorder: "#D8F3DC",
      },
      {
        name: "Michael Rodriguez",
        ownership: "40%",
        status: "verified",
        docNumber: "C9876543D",
        dob: "17 Feb 1980",
        expiry: "25 Aug 2026",
        expiryColor: "#16a34a",
        ocrScore: "97.8%",
        livenessCheck: "Verified",
        screenStatus: "PASSED",
        screenColor: "#16a34a",
        screenBg: "#F0FDF4",
        screenBorder: "#D8F3DC",
      },
    ],
    minorStakeholders: "0%",
  },
];

const STAKEHOLDER_BORDER = { verified: "#D9E7FF", alert: "#FFD5D5" };
const STAKEHOLDER_ICON = {
  verified: <ShieldCheck size={14} className="text-indigo-650" />,
  alert: <AlertTriangle size={14} className="text-[#DC2626]" />,
};

export default function OwnershipVerification() {
  const { addToast } = useToast();

  const [selectedRecord, setSelectedRecord] = useState(RECORDS[0]);
  const [activePersonIdx, setActivePersonIdx] = useState(0);
  const [statuses, setStatuses] = useState({}); // { id: 'pending' | 'approved' | 'rejected' | 'flagged' }
  const [rejectionReasons, setRejectionReasons] = useState({});
  const overallStatus = statuses[selectedRecord.id] || "pending";
  const [flagModalOpen, setFlagModalOpen] = useState(false);
  const [flagReason, setFlagReason] = useState("");
  const [rejectModalOpen, setRejectModalOpen] = useState(false);
  const [rejectReason, setRejectReason] = useState("");
  const [docScale, setDocScale] = useState(1);
  const [docRotation, setDocRotation] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [timeline, setTimeline] = useState([
    { label: "Identity Documents Reviewed", time: "Today • 09:42 AM", done: true },
    { label: "Shareholding Structure Confirmed", time: "Oct 14, 2023", done: true },
    { label: "Initial Ownership Filing", time: "Oct 12, 2023", done: false },
  ]);

  const activePerson = selectedRecord.stakeholders[activePersonIdx] || selectedRecord.stakeholders[0];

  const switchRecord = (rec) => {
    setSelectedRecord(rec);
    setActivePersonIdx(0);
    setDocScale(1);
    setDocRotation(0);
    addToast(`Switched audit to: ${rec.id}`, "info");
  };

  const handleApprove = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setStatuses(prev => ({ ...prev, [selectedRecord.id]: "approved" }));
      setTimeline((prev) => [{ label: "Identity Set Approved", time: "Just now", done: true }, ...prev]);
      addToast(`Identity set for ${selectedRecord.company} approved!`, "success");
    }, 800);
  };

  const handleFlagSubmit = () => {
    if (!flagReason.trim()) { 
      addToast("Please enter a revision reason.", "error"); 
      return; 
    }
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setStatuses(prev => ({ ...prev, [selectedRecord.id]: "flagged" }));
      setFlagModalOpen(false);
      setTimeline((prev) => [{ label: `Flagged for revision: "${flagReason}"`, time: "Just now", done: false }, ...prev]);
      addToast(`${selectedRecord.id} flagged for revision.`, "info");
      setFlagReason("");
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
      addToast(`Identity set for ${selectedRecord.company} rejected.`, "error");
      setRejectReason("");
    }, 800);
  };

  const handleResetDecision = () => {
    setStatuses(prev => ({ ...prev, [selectedRecord.id]: "pending" }));
    setTimeline((prev) => [{ label: "Audit status reset", time: "Just now", done: true }, ...prev]);
    addToast("Decision status reset to pending.", "success");
  };

  const handleDownload = () => {
    const data = [
      ["Field", "Value"],
      ["Company Name", selectedRecord.company],
      ["Stakeholder Name", activePerson.name],
      ["Ownership Stakes", activePerson.ownership],
      ["Doc Number", activePerson.docNumber],
      ["Date of Birth", activePerson.dob],
      ["Expiry Date", activePerson.expiry],
      ["OCR Accuracy", activePerson.ocrScore],
      ["Liveness Status", activePerson.livenessCheck],
      ["Verification Status", overallStatus.toUpperCase()]
    ];
    const csvContent = generateCSV(data[0], data.slice(1));
    triggerDownload(csvContent, `ownership_audit_${selectedRecord.id}.csv`, "text/csv");
    addToast(`Audit logs downloaded for ${selectedRecord.company}`, "success");
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
                  <span>{r.company.replace(" Solutions Ltd", "").replace(" Partners Inc.", "")}</span>
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
          <span style={{ letterSpacing: '0.5px' }}>TASK: BENEFICIAL OWNERSHIP AUDIT</span>
        </div>

        {/* Title Block */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <h1 className="page-title" style={{ margin: 0, fontSize: '24px', fontWeight: '900', letterSpacing: '-0.5px', color: '#0f172a' }}>UBO & Shareholding Structure</h1>
            <p className="page-subtitle" style={{ margin: '6px 0 0', color: '#64748b', fontSize: '14px', fontWeight: '500' }}>Reviewing significant control and shareholding structures for {selectedRecord.company}.</p>
          </div>

          <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
            <span style={{ fontSize: '12px', fontWeight: '700', color: '#64748b', marginRight: '4px' }}>Zoom: {Math.round(docScale * 100)}%</span>
            <button 
              style={{ border: '1px solid #cbd5e1', background: '#fff', color: '#334155', height: '36px', width: '36px', borderRadius: '8px', display: 'flex', alignItems: 'center', justifySelf: 'stretch', justifyContent: 'center', cursor: 'pointer', transition: 'all 0.2s' }} 
              type="button" 
              title="Zoom In" 
              onClick={() => setDocScale(s => Math.min(s + 0.15, 1.6))}
            >
              <Plus size={16} />
            </button>
            <button 
              style={{ border: '1px solid #cbd5e1', background: '#fff', color: '#334155', height: '36px', width: '36px', borderRadius: '8px', display: 'flex', alignItems: 'center', justifySelf: 'stretch', justifyContent: 'center', cursor: 'pointer', transition: 'all 0.2s' }} 
              type="button" 
              title="Zoom Out" 
              onClick={() => setDocScale(s => Math.max(s - 0.15, 0.7))}
            >
              <Minus size={16} />
            </button>
            <button 
              style={{ border: '1px solid #cbd5e1', background: '#fff', color: '#334155', height: '36px', width: '36px', borderRadius: '8px', display: 'flex', alignItems: 'center', justifySelf: 'stretch', justifyContent: 'center', cursor: 'pointer', transition: 'all 0.2s' }} 
              type="button" 
              title="Rotate" 
              onClick={() => setDocRotation(r => (r + 90) % 360)}
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
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {/* Shareholding Hierarchy panel */}
            <div className="panel" style={{ padding: 'var(--spacing-section)', border: '1px solid #e2e8f0', borderRadius: '12px' }}>
              <div style={{ display: 'flex', justifySelf: 'stretch', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <h2 style={{ fontSize: '13px', fontWeight: '900', color: '#0f172a', textTransform: 'uppercase', letterSpacing: '0.3px', margin: 0 }}>Shareholding Hierarchy</h2>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <span style={{ background: '#eff6ff', color: '#2563eb', fontSize: '10px', fontWeight: '800', padding: '3px 8px', borderRadius: '12px' }}>
                    Total: {selectedRecord.stakeholders.reduce((acc, s) => acc + parseInt(s.ownership), 0) + parseInt(selectedRecord.minorStakeholders)}%
                  </span>
                  <span style={{ background: '#fff5f5', color: '#ef4444', fontSize: '10px', fontWeight: '800', padding: '3px 8px', borderRadius: '12px' }}>
                    Unverified: {selectedRecord.minorStakeholders}
                  </span>
                </div>
              </div>

              {/* Dynamic Organizational flow visual */}
              <div style={{ position: 'relative', minHeight: '380px', background: '#fafafa', border: '1px dashed #cbd5e1', borderRadius: '8px', padding: 'var(--spacing-section)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                {/* Parent Block */}
                <div style={{ width: '220px', background: '#312e81', color: '#fff', borderRadius: '8px', padding: '12px', textAlign: 'center', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)' }}>
                  <strong style={{ fontSize: '11px', display: 'block' }}>{selectedRecord.company}</strong>
                  <span style={{ fontSize: '9px', color: '#c7d2fe', marginTop: '2px', display: 'block' }}>Holding Entity</span>
                </div>

                {/* Connector Line */}
                <div style={{ height: '32px', width: '2px', background: '#cbd5e1' }} />

                {/* Connector Split Row */}
                <div style={{ display: 'flex', gap: '16px', alignItems: 'start', justifySelf: 'stretch', justifyContent: 'center', width: '100%' }}>
                  {selectedRecord.stakeholders.map((s, i) => (
                    <div
                      key={i}
                      onClick={() => setActivePersonIdx(i)}
                      style={{
                        width: '120px',
                        background: '#fff',
                        border: activePersonIdx === i ? '2px solid #4f46e5' : '1px solid #e2e8f0',
                        borderRadius: '8px',
                        padding: '12px',
                        textAlign: 'center',
                        cursor: 'pointer',
                        transform: activePersonIdx === i ? 'scale(1.05)' : 'scale(1)',
                        boxShadow: activePersonIdx === i ? '0 10px 15px -3px rgba(0,0,0,0.1)' : '0 1px 3px 0 rgba(0,0,0,0.05)',
                        transition: 'all 0.2s'
                      }}
                    >
                      <strong style={{ fontSize: '10px', display: 'block', color: '#0f172a' }}>{s.name}</strong>
                      <span style={{ fontSize: '9px', color: '#64748b', display: 'block', marginTop: '2px' }}>{s.ownership} Stakes</span>
                      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '6px' }}>{STAKEHOLDER_ICON[s.status]}</div>
                    </div>
                  ))}

                  {/* Minor Stakeholders block */}
                  <div style={{ width: '120px', background: '#fafafa', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '12px', textAlign: 'center', color: '#94a3b8' }}>
                    <strong style={{ fontSize: '10px', display: 'block', color: '#64748b' }}>Minor Stakes</strong>
                    <span style={{ fontSize: '9px', display: 'block', marginTop: '2px' }}>{selectedRecord.minorStakeholders} Agg.</span>
                    <div style={{ display: 'flex', justifyContent: 'center', marginTop: '6px' }}><Lock size={12} /></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Screening & Watchlist panel */}
            <div className="panel" style={{ padding: 'var(--spacing-section)', border: '1px solid #e2e8f0', borderRadius: '12px' }}>
              <h2 style={{ fontSize: '13px', fontWeight: '900', color: '#0f172a', textTransform: 'uppercase', letterSpacing: '0.3px', margin: '0 0 16px' }}>Screening & Watchlists</h2>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {selectedRecord.stakeholders.map((s, i) => (
                  <div
                    key={i}
                    style={{ background: s.screenBg, borderColor: s.screenBorder, borderStyle: 'solid', borderWidth: '1px', padding: '12px 16px', borderRadius: '8px', display: 'flex', justifySelf: 'stretch', justifyContent: 'space-between', alignItems: 'center' }}
                  >
                    <div>
                      <strong style={{ fontSize: '11px', color: '#0f172a', display: 'block' }}>{s.name}</strong>
                      <span style={{ fontSize: '9px', color: '#64748b', display: 'block', marginTop: '1px' }}>Global Watchlist Screening check</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '10px', fontWeight: '850', color: s.screenColor }}>
                      <ShieldCheck size={14} />
                      <span>{s.screenStatus}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Column 2: Metadata details, Passport PDF visual (Right) */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {/* Identity documents visual check */}
            <div className="panel" style={{ padding: '20px', border: '1px solid #e2e8f0', borderRadius: '12px' }}>
              <h2 style={{ fontSize: '13px', fontWeight: '900', color: '#0f172a', textTransform: 'uppercase', letterSpacing: '0.3px', margin: '0 0 16px' }}>Identity Verification</h2>

              {/* Person Sub-Tabs */}
              <div style={{ display: 'flex', gap: '12px', borderBottom: '1px solid #e2e8f0', paddingBottom: '8px', marginBottom: '16px' }}>
                {selectedRecord.stakeholders.map((s, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      setActivePersonIdx(i);
                      setDocScale(1);
                      setDocRotation(0);
                    }}
                    style={{
                      border: 'none',
                      background: 'transparent',
                      paddingBottom: '8px',
                      fontSize: '11px',
                      fontWeight: '800',
                      color: activePersonIdx === i ? '#4f46e5' : '#94a3b8',
                      borderBottom: activePersonIdx === i ? '2px solid #4f46e5' : '2px solid transparent',
                      cursor: 'pointer'
                    }}
                    type="button"
                  >
                    {s.name.split(" ")[0]}
                  </button>
                ))}
              </div>

              {/* Passport Document Canvas visual */}
              <div style={{ background: '#0f172a', borderRadius: '8px', padding: '16px', display: 'flex', alignItems: 'center', justifySelf: 'stretch', justifyContent: 'center', minHeight: '200px', overflow: 'hidden', position: 'relative', marginBottom: '16px' }}>
                <div style={{
                  width: '100%',
                  maxWidth: '280px',
                  background: 'linear-gradient(135deg, #fce7f3, #e0e7ff)',
                  borderRadius: '6px',
                  padding: '16px',
                  boxShadow: '0 4px 6px -1px rgba(0,0,0,0.5)',
                  transform: `scale(${docScale}) rotate(${docRotation}deg)`,
                  transition: 'all 0.2s'
                }}>
                  <div style={{ display: 'flex', justifySelf: 'stretch', justifyContent: 'space-between', borderBottom: '1px solid rgba(15,23,42,0.1)', paddingBottom: '6px', marginBottom: '10px' }}>
                    <span style={{ fontSize: '6px', fontWeight: '900', color: '#1e3a8a' }}>PASSPORT / ID CARD</span>
                    <span style={{ fontSize: '6px', color: '#64748b' }}>No: {activePerson.docNumber}</span>
                  </div>

                  <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                    <div style={{ height: '40px', width: '32px', background: '#cbd5e1', borderRadius: '2px', display: 'flex', alignItems: 'center', justifySelf: 'stretch', justifyContent: 'center', fontSize: '6px', color: '#475569' }}>PHOTO</div>
                    <div style={{ fontSize: '6px', color: '#1e293b' }}>
                      <strong style={{ display: 'block' }}>{activePerson.name}</strong>
                      <span style={{ display: 'block', marginTop: '1px' }}>DOB: {activePerson.dob}</span>
                      <span style={{ display: 'block', color: activePerson.expiryColor }}>EXP: {activePerson.expiry}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* OCR Checkboxes */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '16px' }}>
                <div style={{ background: '#f8fafc', padding: '10px', borderRadius: '8px', border: '1px solid #f1f5f9' }}>
                  <span style={{ display: 'block', fontSize: '9px', fontWeight: '750', color: '#94a3b8', textTransform: 'uppercase' }}>OCR Match</span>
                  <strong style={{ fontSize: '12px', color: '#059669', display: 'block', marginTop: '2px' }}>{activePerson.ocrScore}</strong>
                </div>
                <div style={{ background: '#f8fafc', padding: '10px', borderRadius: '8px', border: '1px solid #f1f5f9' }}>
                  <span style={{ display: 'block', fontSize: '9px', fontWeight: '750', color: '#94a3b8', textTransform: 'uppercase' }}>Liveness Check</span>
                  <strong style={{ fontSize: '12px', color: activePerson.livenessCheck === 'Verified' ? '#059669' : '#f59e0b', display: 'block', marginTop: '2px' }}>{activePerson.livenessCheck}</strong>
                </div>
              </div>

              {/* Details table list */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '11px', color: '#64748b' }}>
                <div style={{ display: 'flex', justifySelf: 'stretch', justifyContent: 'space-between' }}>
                  <span>Document Number:</span>
                  <strong style={{ color: '#0f172a' }}>{activePerson.docNumber}</strong>
                </div>
                <div style={{ display: 'flex', justifySelf: 'stretch', justifyContent: 'space-between' }}>
                  <span>Date of Birth:</span>
                  <strong style={{ color: '#0f172a' }}>{activePerson.dob}</strong>
                </div>
                <div style={{ display: 'flex', justifySelf: 'stretch', justifyContent: 'space-between' }}>
                  <span>Expiry Date:</span>
                  <strong style={{ color: activePerson.expiryColor }}>{activePerson.expiry}</strong>
                </div>
              </div>
            </div>

            {/* Verification audit timeline */}
            <div className="panel" style={{ padding: '20px', border: '1px solid #e2e8f0', borderRadius: '12px' }}>
              <h3 style={{ fontSize: '11px', fontWeight: '900', color: '#334155', textTransform: 'uppercase', letterSpacing: '0.3px', margin: '0 0 12px' }}>Verification Audit</h3>
              
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
        {overallStatus === 'approved' ? (
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
              <span>Identity Set Approved successfully!</span>
            </div>
            <button
              onClick={handleResetDecision}
              style={{ border: '1px solid #6ee7b7', background: '#fff', color: '#065f46', fontSize: '12px', fontWeight: '800', height: '36px', padding: '0 16px', borderRadius: '8px', cursor: 'pointer', transition: 'all 0.2s' }}
              type="button"
            >
              Reset Decision
            </button>
          </div>
        ) : overallStatus === 'rejected' ? (
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
              <AlertTriangle size={16} />
              <span>Identity Set Rejected. Reason: {rejectionReasons[selectedRecord.id]}</span>
            </div>
            <button
              onClick={handleResetDecision}
              style={{ border: '1px solid #fca5a5', background: '#fff', color: '#991b1b', fontSize: '12px', fontWeight: '800', height: '36px', padding: '0 16px', borderRadius: '8px', cursor: 'pointer', transition: 'all 0.2s' }}
              type="button"
            >
              Reset Decision
            </button>
          </div>
        ) : overallStatus === 'flagged' ? (
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
              <AlertTriangle size={16} />
              <span>Identity Set Flagged for revision review.</span>
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
              <AlertTriangle size={15} className="text-amber-500 shrink-0" />
              <span>Awaiting final decision check. Click verify to register changes.</span>
            </div>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
              <button
                style={{ border: '1px solid #cbd5e1', background: '#fff', color: '#475569', fontSize: '13px', fontWeight: '800', height: '40px', padding: '0 20px', borderRadius: '8px', cursor: 'pointer', transition: 'all 0.2s' }}
                onClick={() => setFlagModalOpen(true)}
                type="button"
              >
                Flag for Revision
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
                    <span>Approve Identity Set</span>
                  </>
                )}
              </button>
            </div>
          </div>
        )}

        {/* ========================================================
            MODAL: FLAG FOR REVISION
            ======================================================== */}
        {flagModalOpen && (
          <div style={{ position: 'fixed', inset: 0, zIndex: 9999, display: 'flex', alignItems: 'center', justifySelf: 'stretch', justifyContent: 'center', background: 'rgba(15,23,42,0.6)', backdropFilter: 'blur(2px)' }}>
            <div style={{ position: 'absolute', inset: 0 }} onClick={() => { setFlagModalOpen(false); setFlagReason(''); }} />
            <div style={{ position: 'relative', background: '#fff', width: '100%', maxWidth: '400px', margin: 'auto', borderRadius: '16px', padding: 'var(--spacing-section)', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.25)', border: '1px solid #f1f5f9' }}>
              <div style={{ display: 'flex', justifySelf: 'stretch', justifyContent: 'space-between', alignItems: 'start', marginBottom: '16px' }}>
                <div>
                  <h3 style={{ fontSize: '16px', fontWeight: '900', color: '#0f172a', margin: 0 }}>Flag for Revision</h3>
                  <p style={{ fontSize: '12px', color: '#64748b', marginTop: '2px', margin: 0 }}>Describe the discrepancy found for {selectedRecord.company}</p>
                </div>
                <button onClick={() => { setFlagModalOpen(false); setFlagReason(''); }} style={{ border: 'none', background: 'transparent', cursor: 'pointer', color: '#94a3b8' }} type="button">
                  <X size={20} />
                </button>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <div>
                  <label style={{ fontSize: '11px', fontWeight: '800', textTransform: 'uppercase', color: '#64748b', display: 'block', marginBottom: '6px' }}>Revision Details</label>
                  <textarea
                    rows="4"
                    value={flagReason}
                    onChange={(e) => setFlagReason(e.target.value)}
                    placeholder="e.g. Elena Rodriguez's passport has expired. Require updated identity documents..."
                    style={{ width: '100%', padding: '10px 12px', border: '1px solid #cbd5e1', borderRadius: '8px', fontSize: '12px', outline: 'none', resize: 'none',  }}
                  />
                </div>

                <div style={{ display: 'flex', gap: '10px', marginTop: '4px' }}>
                  <button
                    type="button"
                    onClick={() => { setFlagModalOpen(false); setFlagReason(''); }}
                    style={{ flex: 1, padding: '10px', height: '38px', background: '#fff', border: '1px solid #cbd5e1', borderRadius: '8px', fontSize: '12px', fontWeight: '750', color: '#475569', cursor: 'pointer' }}
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={handleFlagSubmit}
                    disabled={isSubmitting}
                    style={{ flex: 1, padding: '10px', height: '38px', background: '#4f46e5', border: 'none', borderRadius: '8px', fontSize: '12px', fontWeight: '750', color: '#fff', cursor: 'pointer' }}
                  >
                    {isSubmitting ? 'Submitting...' : 'Submit Flag'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================
            MODAL: REJECT DIALOG
            ======================================================== */}
        {rejectModalOpen && (
          <div style={{ position: 'fixed', inset: 0, zIndex: 9999, display: 'flex', alignItems: 'center', justifySelf: 'stretch', justifyContent: 'center', background: 'rgba(15,23,42,0.6)', backdropFilter: 'blur(2px)' }}>
            <div style={{ position: 'absolute', inset: 0 }} onClick={() => { setRejectModalOpen(false); setRejectReason(''); }} />
            <div style={{ position: 'relative', background: '#fff', width: '100%', maxWidth: '400px', margin: 'auto', borderRadius: '16px', padding: 'var(--spacing-section)', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.25)', border: '1px solid #f1f5f9' }}>
              <div style={{ display: 'flex', justifySelf: 'stretch', justifyContent: 'space-between', alignItems: 'start', marginBottom: '16px' }}>
                <div>
                  <h3 style={{ fontSize: '16px', fontWeight: '900', color: '#0f172a', margin: 0 }}>Reject Identity Set</h3>
                  <p style={{ fontSize: '12px', color: '#64748b', marginTop: '2px', margin: 0 }}>UBO audit rejection query for {selectedRecord.company}</p>
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
                    placeholder="E.g., Failed sanctions screening check, invalid beneficial owner registration details..."
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