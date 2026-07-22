import toast from 'react-hot-toast';
import React, { useState, useMemo } from "react";
import AdminShell from "../../components/layouts/AdminShell";
import BusinessHeaderTabs from "./BusinessHeaderTabs";
import { useToast } from "../../components/common/ToastNotification";
import { triggerDownload, generateCSV } from "../../utils/downloadHelper";
import {
  Eye,
  ZoomIn,
  RotateCw,
  Download,
  Pencil,
  Building2,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Check,
  X,
  Plus,
  Minus,
  ShieldCheck,
  ClipboardCopy,
  Clock
} from "lucide-react";

import { MOCK_PAN_RECORDS } from "./mockMetadata";

export default function KycVerificationPage() {
  const { addToast } = useToast();

  const [selectedRecord, setSelectedRecord] = useState(MOCK_PAN_RECORDS[0]);
  const [zoomScale, setZoomScale] = useState(1.0);
  const [rotationDegrees, setRotationDegrees] = useState(0); 

  const [notesState, setNotesState] = useState({});
  const [statuses, setStatuses] = useState({}); // { id: 'pending' | 'approved' | 'rejected' }
  const [rejectionReasons, setRejectionReasons] = useState({});
  const [rejectionModalOpen, setRejectionModalOpen] = useState(false);
  const [rejectionReasonInput, setRejectionReasonInput] = useState("");

  const [customTimelines, setCustomTimelines] = useState({});
  const [customMetadata, setCustomMetadata] = useState({}); 

  const [editingField, setEditingField] = useState(null);
  const [editValue, setEditValue] = useState("");
  const [editError, setEditError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const activePan = customMetadata[selectedRecord.id]?.panNumber || selectedRecord.panNumber;
  const activeHolder = customMetadata[selectedRecord.id]?.holderName || selectedRecord.holderName;
  const activeIssueDate = customMetadata[selectedRecord.id]?.issueDate || selectedRecord.issueDate;
  const activeCategory = customMetadata[selectedRecord.id]?.category || selectedRecord.category;
  const activeNotes = notesState[selectedRecord.id] || "";
  const activeStatus = statuses[selectedRecord.id] || "pending";
  
  const currentTimeline = useMemo(() => {
    return customTimelines[selectedRecord.id] || selectedRecord.timeline;
  }, [customTimelines, selectedRecord]);

  const handleSaveDraft = () => {
    addToast("PAN verification draft saved!", "success");
  };

  const handleSubmitReview = () => {
    addToast("PAN Card review submitted for validation!", "success");
  };

  const handleZoomIn = () => {
    setZoomScale(prev => Math.min(prev + 0.15, 1.6));
    addToast("Zoomed in", "success");
  };

  const handleZoomOut = () => {
    setZoomScale(prev => Math.max(prev - 0.15, 0.7));
    addToast("Zoomed out", "success");
  };

  const handleRotate = () => {
    setRotationDegrees(prev => (prev + 90) % 360);
    addToast("Rotated document clockwise", "success");
  };

  const handleDownload = () => {
    const data = [
      ["Field", "Value"],
      ["Holder Name", activeHolder],
      ["PAN Number", activePan],
      ["Issue Date", activeIssueDate],
      ["Category", activeCategory],
      ["Partner ID", selectedRecord.partnerId],
      ["Verification Status", activeStatus.toUpperCase()],
      ["Internal Notes", activeNotes || "N/A"]
    ];
    const csvContent = generateCSV(data[0], data.slice(1));
    triggerDownload(csvContent, `pan_verification_${selectedRecord.id}.csv`, "text/csv");
    addToast(`Verification report downloaded for ${activeHolder}.`, "success");
  };

  const validateField = (field, value) => {
    if (!value || value.trim() === "") return "Field is required";
    if (field === 'panNumber' && !/^[a-zA-Z]{5}[0-9]{4}[a-zA-Z]{1}$/.test(value)) {
      return "Invalid PAN format (e.g. ABCDE1234F)";
    }
    if (field === 'issueDate' && !/^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/.test(value)) {
      return "Invalid date format (DD/MM/YYYY)";
    }
    return "";
  };

  const handleStartEdit = (field, currentValue) => {
    setEditingField(field);
    setEditValue(currentValue);
    setEditError("");
  };

  const handleCancelEdit = () => {
    setEditingField(null);
    setEditValue("");
    setEditError("");
  };

  const handleSaveEdit = (field) => {
    let finalValue = editValue;
    if (field === 'panNumber') {
      finalValue = editValue.toUpperCase();
    }
    const error = validateField(field, finalValue);
    if (error) {
      setEditError(error);
      return;
    }

    setCustomMetadata(prev => ({
      ...prev,
      [selectedRecord.id]: {
        ...(prev[selectedRecord.id] || {}),
        [field]: finalValue
      }
    }));
    
    setEditingField(null);
    addToast("Metadata updated successfully", "success");
  };

  const renderMetadataField = (fieldKey, label, activeValue) => (
    <div>
      <label className="mb-1.5 block text-[10px] font-black uppercase tracking-wider text-slate-400">
        {label}
      </label>
      <div className="flex items-start gap-2">
        {editingField === fieldKey ? (
          <div className="flex-1 flex flex-col gap-1">
            <div className="flex items-center gap-1.5 w-full">
              <input 
                type="text" 
                value={editValue} 
                onChange={(e) => { setEditValue(e.target.value); setEditError(""); }}
                className="w-full flex-1 rounded-lg border border-indigo-600 bg-white px-3 py-1.5 text-xs font-semibold text-slate-800 outline-none"
              />
              <button onClick={() => handleSaveEdit(fieldKey)} className="rounded bg-emerald-50 p-2 text-emerald-600 hover:bg-emerald-100 transition cursor-pointer border-none" title="Save"><Check size={14} /></button>
              <button onClick={handleCancelEdit} className="rounded bg-rose-50 p-2 text-rose-600 hover:bg-rose-100 transition cursor-pointer border-none" title="Cancel"><X size={14} /></button>
            </div>
            {editError && <span className="text-[11px] text-red-600 font-bold">{editError}</span>}
          </div>
        ) : (
          <div className="flex w-full items-center gap-2">
            <div className="flex-1 rounded-lg border border-[#e2e8f0] bg-slate-50 px-3 py-1.5 text-xs font-bold text-slate-800">
              {activeValue}
            </div>
            <button onClick={() => handleStartEdit(fieldKey, activeValue)} title={`Edit ${label}`} className="border-none bg-transparent cursor-pointer">
              <Pencil size={15} className="text-slate-500 hover:text-indigo-900 transition" />
            </button>
          </div>
        )}
      </div>
    </div>
  );

  const handleApproveCard = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setStatuses(prev => ({ ...prev, [selectedRecord.id]: "approved" }));
      setCustomTimelines(prev => {
        const base = customTimelines[selectedRecord.id] || selectedRecord.timeline;
        if (base.some(t => t.title === 'PAN Approved')) return prev;
        return {
          ...prev,
          [selectedRecord.id]: [
            { id: 'app_' + Date.now(), title: 'PAN Approved', desc: 'Approved by Auditor AU.', active: true },
            ...base.map(t => ({ ...t, active: false }))
          ]
        };
      });
      addToast("PAN Card approved successfully!", "success");
    }, 800);
  };

  const handleRejectCard = () => {
    setRejectionModalOpen(true);
  };

  const handleRejectConfirm = () => {
    if (!rejectionReasonInput.trim()) {
      addToast("Please enter a rejection reason.", "error");
      return;
    }
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setStatuses(prev => ({ ...prev, [selectedRecord.id]: "rejected" }));
      setRejectionReasons(prev => ({ ...prev, [selectedRecord.id]: rejectionReasonInput }));
      setCustomTimelines(prev => {
        const base = customTimelines[selectedRecord.id] || selectedRecord.timeline;
        return {
          ...prev,
          [selectedRecord.id]: [
            { id: 'rej_' + Date.now(), title: 'PAN Rejected', desc: `Reason: ${rejectionReasonInput}`, active: true },
            ...base.map(t => ({ ...t, active: false }))
          ]
        };
      });
      addToast(`PAN Card rejected: ${rejectionReasonInput}`, "error");
      setRejectionModalOpen(false);
      setRejectionReasonInput("");
    }, 800);
  };

  const handleResetDecision = () => {
    setStatuses(prev => ({ ...prev, [selectedRecord.id]: "pending" }));
    setCustomTimelines(prev => {
      const base = customTimelines[selectedRecord.id] || selectedRecord.timeline;
      return {
        ...prev,
        [selectedRecord.id]: base.filter(t => !t.id.startsWith('app_') && !t.id.startsWith('rej_')).map((t, idx) => ({ ...t, active: idx === 0 }))
      };
    });
    addToast("Verification status reset to pending.", "success");
  };

  return (
    <AdminShell
      activeTab="Business"
      headerTitle="Business Registry"
      headerTabs={<BusinessHeaderTabs activeTab="Compliance" />}
      searchPlaceholder="Search entity, PAN, or partner..."
    >
      <div className="business-doc-review-wrapper" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-section)', paddingBottom: '90px' }}>
        
        {/* Selection pills and top buttons bar */}
        <div style={{ display: 'flex', alignItems: 'center', justifySelf: 'stretch', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px', borderBottom: '1px solid #e2e8f0', paddingBottom: '16px' }}>
          <div style={{ display: 'flex', gap: '10px', overflowY: 'auto', maxHeight: '400px', maxWidth: '100%', paddingBottom: '4px' }}>
            {MOCK_PAN_RECORDS.map(r => {
              const isSelected = selectedRecord.id === r.id;
              const status = statuses[r.id] || "pending";
              return (
                <button
                  key={r.id}
                  onClick={() => setSelectedRecord(r)}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border text-xs font-bold transition whitespace-nowrap cursor-pointer ${
                    isSelected 
                      ? 'bg-indigo-900 text-white border-indigo-900 shadow-md' 
                      : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                  }`}
                  type="button"
                >
                  <span>{r.holderName.replace(" PRIVATE LIMITED", "").replace(" PVT LTD", "")}</span>
                  <span className={`w-2 h-2 rounded-full ${
                    status === 'approved' ? 'bg-emerald-500' : status === 'rejected' ? 'bg-rose-500' : 'bg-amber-400'
                  }`} />
                </button>
              );
            })}
          </div>

          <div style={{ display: 'flex', gap: '8px' }}>
            <button
              onClick={handleSaveDraft}
              style={{ border: '1px solid #cbd5e1', background: '#fff', color: '#334155', fontSize: '11px', fontWeight: '800', height: '32px', padding: '0 12px', borderRadius: '6px', cursor: 'pointer' }}
              type="button"
            >
              Save Draft
            </button>
            <button
              onClick={handleSubmitReview}
              style={{ border: 'none', background: '#4f46e5', color: '#fff', fontSize: '11px', fontWeight: '800', height: '32px', padding: '0 12px', borderRadius: '6px', cursor: 'pointer' }}
              type="button"
            >
              Submit Review
            </button>
          </div>
        </div>

        {/* Task Tag */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '11px', fontWeight: '800', color: '#4f46e5', background: '#e0e7ff', padding: '6px 12px', borderRadius: '20px', alignSelf: 'flex-start', border: '1px solid #c7d2fe' }}>
          <ShieldCheck size={14} />
          <span style={{ letterSpacing: '0.5px' }}>TASK: PAN VALIDATION</span>
        </div>

        {/* Title Block */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <h1 className="page-title" style={{ margin: 0, fontSize: '24px', fontWeight: '900', letterSpacing: '-0.5px', color: '#0f172a' }}>Review Document: PAN Card</h1>
            <p className="page-subtitle" style={{ margin: '6px 0 0', color: '#64748b', fontSize: '14px', fontWeight: '500' }}>Awaiting administrative verify check for {activeHolder}.</p>
          </div>

          <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
            <span style={{ fontSize: '12px', fontWeight: '700', color: '#64748b', marginRight: '4px' }}>Zoom: {Math.round(zoomScale * 100)}%</span>
            <button 
              style={{ border: '1px solid #cbd5e1', background: '#fff', color: '#334155', height: '36px', width: '36px', borderRadius: '8px', display: 'flex', alignItems: 'center', justifySelf: 'stretch', justifyContent: 'center', cursor: 'pointer', transition: 'all 0.2s' }} 
              type="button" 
              title="Zoom In" 
              onClick={handleZoomIn}
            >
              <Plus size={16} />
            </button>
            <button 
              style={{ border: '1px solid #cbd5e1', background: '#fff', color: '#334155', height: '36px', width: '36px', borderRadius: '8px', display: 'flex', alignItems: 'center', justifySelf: 'stretch', justifyContent: 'center', cursor: 'pointer', transition: 'all 0.2s' }} 
              type="button" 
              title="Zoom Out" 
              onClick={handleZoomOut}
            >
              <Minus size={16} />
            </button>
            <button 
              style={{ border: '1px solid #cbd5e1', background: '#fff', color: '#334155', height: '36px', width: '36px', borderRadius: '8px', display: 'flex', alignItems: 'center', justifySelf: 'stretch', justifyContent: 'center', cursor: 'pointer', transition: 'all 0.2s' }} 
              type="button" 
              title="Rotate Clockwise" 
              onClick={handleRotate}
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
              maxWidth: '380px', 
              background: '#fff', 
              border: '1px solid #e2e8f0', 
              borderRadius: '8px', 
              padding: 'var(--spacing-section)', 
              position: 'relative', 
              boxShadow: '0 20px 25px -5px rgba(0,0,0,0.5)',
              transform: `scale(${zoomScale}) rotate(${rotationDegrees}deg)`,
              transformOrigin: 'top center',
              transition: 'transform 0.2s ease-out-in'
            }}>
              
              {/* Box highlighter for PAN detected */}
              <div style={{ position: 'absolute', top: '75px', left: '135px', right: '15px', height: '24px', border: '1.5px solid #4f46e5', background: 'rgba(79, 70, 229, 0.06)', borderRadius: '4px', zIndex: 10, display: 'flex', alignItems: 'center', padding: '0 6px' }}>
                <span style={{ background: '#4f46e5', color: '#fff', fontSize: '6px', fontWeight: '900', padding: '1.5px 3px', borderRadius: '2px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>PAN DETECTED</span>
              </div>

              {/* Box highlighter for Name detected */}
              <div style={{ position: 'absolute', top: '125px', left: '135px', right: '15px', height: '24px', border: '1.5px solid #06b6d4', background: 'rgba(6, 182, 212, 0.06)', borderRadius: '4px', zIndex: 10, display: 'flex', alignItems: 'center', padding: '0 6px' }}>
                <span style={{ background: '#06b6d4', color: '#fff', fontSize: '6px', fontWeight: '900', padding: '1.5px 3px', borderRadius: '2px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>LEGAL NAME MATCH</span>
              </div>

              {/* Header document scan */}
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', borderBottom: '1.5px solid #0f172a', paddingBottom: '10px', marginBottom: '14px' }}>
                <strong style={{ fontSize: '9px', letterSpacing: '0.8px', color: '#0f172a', fontWeight: '900' }}>INCOME TAX DEPARTMENT</strong>
                <span style={{ fontSize: '7px', color: '#475569', marginTop: '2px', fontWeight: '700' }}>GOVERNMENT OF INDIA</span>
              </div>

              {/* Body lines scanned */}
              <div style={{ display: 'flex', gap: '14px' }}>
                <div style={{ width: '80px', height: '90px', borderRadius: '4px', background: '#e2e8f0', display: 'flex', alignItems: 'center', justifySelf: 'stretch', justifyContent: 'center', border: '1px solid #cbd5e1', alignSelf: 'flex-start', flexShrink: 0 }}>
                  <span style={{ fontSize: '8px', fontWeight: 'bold', color: '#64748b' }}>PHOTO</span>
                </div>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '8px', color: '#334155', flex: 1 }}>
                  <div>
                    <span style={{ fontSize: '6px', color: '#94a3b8', display: 'block', textTransform: 'uppercase' }}>Permanent Account Number</span>
                    <strong style={{ color: '#0f172a', fontFamily: "var(--materio-space)", fontSize: '9.5px' }}>{activePan}</strong>
                  </div>
                  <div>
                    <span style={{ fontSize: '6px', color: '#94a3b8', display: 'block', textTransform: 'uppercase' }}>Name</span>
                    <strong style={{ color: '#0f172a', fontSize: '8.5px' }}>{activeHolder}</strong>
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px' }}>
                    <div>
                      <span style={{ fontSize: '5px', color: '#94a3b8', display: 'block', textTransform: 'uppercase' }}>Date of Issue</span>
                      <strong style={{ color: '#334155', fontSize: '7.5px' }}>{activeIssueDate}</strong>
                    </div>
                    <div>
                      <span style={{ fontSize: '5px', color: '#94a3b8', display: 'block', textTransform: 'uppercase' }}>Category</span>
                      <strong style={{ color: '#334155', fontSize: '7.5px' }}>{activeCategory}</strong>
                    </div>
                  </div>
                </div>
              </div>

              {/* Card stamp/seal */}
              <div style={{ display: 'flex', justifySelf: 'stretch', justifyContent: 'space-between', alignItems: 'center', marginTop: '16px', borderTop: '1px dashed #cbd5e1', paddingTop: '10px' }}>
                <div style={{ border: '1.5px solid #059669', color: '#059669', borderRadius: '4px', fontSize: '6px', padding: '2px 4px', fontWeight: '950', transform: 'rotate(-5deg)' }}>
                  NSDL INTEGRATED
                </div>
                <div style={{ width: '40px', height: '14px', background: '#cbd5e1', borderRadius: '2px' }} />
              </div>

            </div>

          </div>

          {/* Column 2: Metadata details, AI Verification, Activity Feed (Right) */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            
            {/* Metadata extraction panel */}
            <div className="panel" style={{ padding: '20px', border: '1px solid #e2e8f0', borderRadius: '12px' }}>
              <div style={{ display: 'flex', justifySelf: 'stretch', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #f1f5f9', paddingBottom: '12px', marginBottom: '14px' }}>
                <h2 style={{ fontSize: '13px', fontWeight: '900', color: '#0f172a', textTransform: 'uppercase', letterSpacing: '0.3px', margin: 0 }}>Metadata Extraction</h2>
                <span style={{ background: '#f1f5f9', px: '8px', py: '3px', borderRadius: '12px', fontSize: '10px', fontWeight: '750', color: '#64748b', padding: '3px 8px' }}>
                  Accuracy: {selectedRecord.scanAccuracy}
                </span>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {renderMetadataField('panNumber', 'PAN Number', activePan)}
                {renderMetadataField('holderName', 'Business Name / Holder Name', activeHolder)}
                
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                  {renderMetadataField('issueDate', 'Date Of Issue', activeIssueDate)}
                  {renderMetadataField('category', 'Category', activeCategory)}
                </div>
              </div>
            </div>

            {/* AI Verification checks panel */}
            <div className="panel" style={{ padding: '20px', border: '1px solid #e2e8f0', borderRadius: '12px' }}>
              <h3 style={{ fontSize: '11px', fontWeight: '900', color: '#4f46e5', textTransform: 'uppercase', letterSpacing: '0.5px', margin: '0 0 12px' }}>Verification Checks</h3>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifySelf: 'stretch', justifyContent: 'space-between', background: '#f8fafc', padding: '8px 12px', borderRadius: '8px', fontSize: '11px', border: '1px solid #f1f5f9' }}>
                  <span style={{ fontWeight: '700', color: '#334155' }}>Format Validation</span>
                  <span style={{ fontWeight: '800', color: '#059669' }}>{selectedRecord.checks.format}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', justifySelf: 'stretch', justifyContent: 'space-between', background: selectedRecord.checks.nsdl.startsWith('WARN') ? '#fff5f5' : '#f8fafc', padding: '8px 12px', borderRadius: '8px', fontSize: '11px', border: selectedRecord.checks.nsdl.startsWith('WARN') ? '1px solid #fee2e2' : '1px solid #f1f5f9' }}>
                  <span style={{ fontWeight: '700', color: '#334155' }}>NSDL API Database Match</span>
                  <span style={{ fontWeight: '800', color: selectedRecord.checks.nsdl.startsWith('WARN') ? '#ef4444' : '#059669' }}>{selectedRecord.checks.nsdl}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', justifySelf: 'stretch', justifyContent: 'space-between', background: selectedRecord.checks.tamper.startsWith('WARN') ? '#fff5f5' : '#f8fafc', padding: '8px 12px', borderRadius: '8px', fontSize: '11px', border: selectedRecord.checks.tamper.startsWith('WARN') ? '1px solid #fee2e2' : '1px solid #f1f5f9' }}>
                  <span style={{ fontWeight: '700', color: '#334155' }}>Tamper Detection Checks</span>
                  <span style={{ fontWeight: '800', color: selectedRecord.checks.tamper.startsWith('WARN') ? '#ef4444' : '#059669' }}>{selectedRecord.checks.tamper}</span>
                </div>
              </div>
            </div>

            {/* Requester details panel */}
            <div className="panel" style={{ padding: '20px', background: '#1e1b4b', border: 'none', borderRadius: '12px', color: '#fff' }}>
              <span style={{ fontSize: '9px', fontWeight: '800', color: '#a5b4fc', textTransform: 'uppercase', letterSpacing: '0.5px', display: 'block', marginBottom: '12px' }}>Requester Partner details</span>
              
              <div style={{ display: 'flex', gap: '12px', alignItems: 'center', borderBottom: '1px solid rgba(255,255,255,0.08)', paddingBottom: '12px', marginBottom: '12px' }}>
                <div style={{ height: '36px', width: '36px', borderRadius: '8px', background: '#312e81', display: 'flex', alignItems: 'center', justifySelf: 'stretch', justifyContent: 'center', color: '#c7d2fe' }}>
                  <Building2 size={18} />
                </div>
                <div>
                  <strong style={{ fontSize: '13px', display: 'block' }}>{selectedRecord.partnerName}</strong>
                  <span style={{ fontSize: '10px', color: '#c7d2fe' }}>ID: {selectedRecord.partnerId}</span>
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '11px', color: '#c7d2fe' }}>
                <div style={{ display: 'flex', justifySelf: 'stretch', justifyContent: 'space-between' }}>
                  <span>Submitted By:</span>
                  <strong style={{ color: '#fff' }}>{selectedRecord.submittedBy}</strong>
                </div>
                <div style={{ display: 'flex', justifySelf: 'stretch', justifyContent: 'space-between' }}>
                  <span>Submission Date:</span>
                  <strong style={{ color: '#fff' }}>{selectedRecord.submissionDate}</strong>
                </div>
                <div style={{ display: 'flex', justifySelf: 'stretch', justifyContent: 'space-between' }}>
                  <span>Account Tier:</span>
                  <strong style={{ color: '#fff' }}>{selectedRecord.accountTier}</strong>
                </div>
              </div>
            </div>

            {/* Internal verification notes panel */}
            <div className="panel" style={{ padding: '20px', border: '1px solid #e2e8f0', borderRadius: '12px' }}>
              <label style={{ fontSize: '11px', fontWeight: '900', color: '#334155', textTransform: 'uppercase', letterSpacing: '0.3px', display: 'block', marginBottom: '8px' }}>Internal Auditing Notes</label>
              <textarea
                rows={3}
                value={activeNotes}
                onChange={(e) => setNotesState(prev => ({ ...prev, [selectedRecord.id]: e.target.value }))}
                placeholder="Enter internal verification logs or notes..."
                style={{ width: '100%', padding: '8px 12px', border: '1px solid #cbd5e1', borderRadius: '8px', fontSize: '12px', outline: 'none', resize: 'none', background: '#f8fafc',  }}
              />
            </div>

            {/* Timeline panel */}
            <div className="panel" style={{ padding: '20px', border: '1px solid #e2e8f0', borderRadius: '12px' }}>
              <h3 style={{ fontSize: '11px', fontWeight: '900', color: '#334155', textTransform: 'uppercase', letterSpacing: '0.3px', margin: '0 0 12px' }}>Audit Timeline</h3>
              
              <div className="relative">
                <div style={{ position: 'absolute', left: '4px', top: '6px', bottom: '6px', width: '2px', background: '#f1f5f9' }} />
                {currentTimeline.map(item => (
                  <div key={item.id} style={{ display: 'flex', gap: '10px', position: 'relative', marginBottom: '12px' }} className="last:mb-0">
                    <div style={{ height: '8px', width: '8px', borderRadius: '50%', background: item.active ? '#4f46e5' : '#cbd5e1', zIndex: 10, marginTop: '4px', flexShrink: 0 }} />
                    <div style={{ fontSize: '11px' }}>
                      <strong style={{ display: 'block', color: item.active ? '#0f172a' : '#64748b', fontWeight: '700' }}>{item.title}</strong>
                      <span style={{ color: '#94a3b8', fontSize: '10px', marginTop: '1px', display: 'block' }}>{item.desc}</span>
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
              <span>PAN verification decision APPROVED successfully!</span>
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
              <AlertTriangle size={16} />
              <span>PAN verification REJECTED. Reason: {rejectionReasons[selectedRecord.id]}</span>
            </div>
            <button
              onClick={handleResetDecision}
              style={{ border: '1px solid #fca5a5', background: '#fff', color: '#991b1b', fontSize: '12px', fontWeight: '800', height: '36px', padding: '0 16px', borderRadius: '8px', cursor: 'pointer', transition: 'all 0.2s' }}
              type="button"
            >
              Reset Decision
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
              <AlertTriangle size={15} className="text-amber-500" />
              <span>Awaiting final decision check. Click verify to register changes.</span>
            </div>

            <div style={{ display: 'flex', gap: '12px' }}>
              <button
                style={{ border: '1px solid #fca5a5', background: '#fff', color: '#ef4444', fontSize: '13px', fontWeight: '800', height: '40px', padding: '0 20px', borderRadius: '8px', cursor: 'pointer', transition: 'all 0.2s' }}
                onClick={handleRejectCard}
                type="button"
                className="hover:bg-rose-50"
              >
                Reject With Reason
              </button>
              <button
                style={{ border: 'none', background: '#4f46e5', color: '#fff', fontSize: '13px', fontWeight: '800', height: '40px', padding: '0 20px', borderRadius: '8px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px', transition: 'all 0.2s' }}
                onClick={handleApproveCard}
                disabled={isSubmitting}
                type="button"
                className="hover:bg-indigo-700 shadow-md"
              >
                {isSubmitting ? 'Processing...' : (
                  <>
                    <Check size={16} /> 
                    <span>Verify & Approve</span>
                  </>
                )}
              </button>
            </div>
          </div>
        )}

        {/* ========================================================
            MODAL: REJECT WITH REASON DIALOG
            ======================================================== */}
        {rejectionModalOpen && (
          <div style={{ position: 'fixed', inset: 0, zIndex: 9999, display: 'flex', alignItems: 'center', justifySelf: 'stretch', justifyContent: 'center', background: 'rgba(15,23,42,0.6)', backdropFilter: 'blur(2px)' }}>
            <div style={{ position: 'absolute', inset: 0 }} onClick={() => { setRejectionModalOpen(false); setRejectionReasonInput(''); }} />
            <div style={{ position: 'relative', background: '#fff', width: '100%', maxWidth: '400px', margin: 'auto', borderRadius: '16px', padding: 'var(--spacing-section)', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.25)', border: '1px solid #f1f5f9' }}>
              <div style={{ display: 'flex', justifySelf: 'stretch', justifyContent: 'space-between', alignItems: 'start', marginBottom: '16px' }}>
                <div>
                  <h3 style={{ fontSize: '16px', fontWeight: '900', color: '#0f172a', margin: 0 }}>Reject PAN Verification</h3>
                  <p style={{ fontSize: '12px', color: '#64748b', marginTop: '2px', margin: 0 }}>Document validation query for {activeHolder}</p>
                </div>
                <button onClick={() => { setRejectionModalOpen(false); setRejectionReasonInput(''); }} style={{ border: 'none', background: 'transparent', cursor: 'pointer', color: '#94a3b8' }} type="button">
                  <X size={20} />
                </button>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <div>
                  <label style={{ fontSize: '11px', fontWeight: '800', textTransform: 'uppercase', color: '#64748b', display: 'block', marginBottom: '6px' }}>Reason for Rejection</label>
                  <textarea
                    rows="4"
                    value={rejectionReasonInput}
                    onChange={(e) => setRejectionReasonInput(e.target.value)}
                    placeholder="E.g., PAN image signature mismatch, name spelling mismatch in database, cropped photo..."
                    style={{ width: '100%', padding: '10px 12px', border: '1px solid #cbd5e1', borderRadius: '8px', fontSize: '12px', outline: 'none', resize: 'none',  }}
                  />
                </div>

                <div style={{ display: 'flex', gap: '10px', marginTop: '4px' }}>
                  <button
                    type="button"
                    onClick={() => { setRejectionModalOpen(false); setRejectionReasonInput(''); }}
                    style={{ flex: 1, padding: '10px', height: '38px', background: '#fff', border: '1px solid #cbd5e1', borderRadius: '8px', fontSize: '12px', fontWeight: '750', color: '#475569', cursor: 'pointer' }}
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={handleRejectConfirm}
                    style={{ flex: 1, padding: '10px', height: '38px', background: '#ef4444', border: 'none', borderRadius: '8px', fontSize: '12px', fontWeight: '750', color: '#fff', cursor: 'pointer' }}
                  >
                    Confirm Reject
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
