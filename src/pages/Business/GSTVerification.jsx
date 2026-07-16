import toast from 'react-hot-toast';
import React, { useState, useMemo } from "react";
import AdminShell from "../../components/layouts/AdminShell";
import BusinessHeaderTabs from "./BusinessHeaderTabs";
import { useToast } from "../../components/common/ToastNotification";
import { triggerDownload, generateCSV } from "../../utils/downloadHelper";
import {
  Search,
  Bell,
  Grid3X3,
  ZoomIn,
  ZoomOut,
  Download,
  Building2,
  ShieldCheck,
  Plus,
  Minus,
  Cpu,
  Clock,
  ClipboardCopy,
  AlertTriangle,
  CheckCircle,
  Check,
  X
} from "lucide-react";

const MOCK_BUSINESSES = [
  {
    id: "1",
    legalName: "Lumina Tech Solutions PVT LTD",
    gstin: "27AAAAA0000A1Z5",
    regDate: "Oct 14, 2021",
    taxpayerType: "Regular",
    constitution: "Private Limited Company",
    aiScore: 98,
    checks: {
      gstinMatch: true,
      logoIntegrity: true,
      dateAlignment: true,
    },
    aiDescription: "System has successfully cross-referenced the GSTIN with the central government portal. Signature and Seal are consistent with regional norms.",
    activityFeed: [
      { id: 'act1', title: 'GSTIN Validation Successful', desc: 'Government database matched successfully.', status: 'success' },
      { id: 'act2', title: 'AI Analysis Completed', desc: 'Document authenticity score generated.', status: 'info' },
      { id: 'act3', title: 'Awaiting Compliance Approval', desc: 'Manual review required before approval.', status: 'warning' }
    ]
  },
  {
    id: "2",
    legalName: "Apex Retailers & Distributors",
    gstin: "27AAAAA0000B2Y6",
    regDate: "Jan 08, 2023",
    taxpayerType: "Regular",
    constitution: "Partnership Firm",
    aiScore: 92,
    checks: {
      gstinMatch: true,
      logoIntegrity: false,
      dateAlignment: true,
    },
    aiDescription: "GSTIN is active in government portal, but firm logo mismatch detected on the invoice header. Recommended manual review.",
    activityFeed: [
      { id: 'act1', title: 'GSTIN Found in Registry', desc: 'GSTIN is active and valid.', status: 'success' },
      { id: 'act2', title: 'Logo Mismatch Flagged', desc: 'Invoice logo differs from registered trade name.', status: 'error' },
      { id: 'act3', title: 'Awaiting Compliance Approval', desc: 'Review requested due to warning flags.', status: 'warning' }
    ]
  },
  {
    id: "3",
    legalName: "Vortex Digital Agency",
    gstin: "27AAAAA0000C3X7",
    regDate: "Mar 19, 2024",
    taxpayerType: "Composition",
    constitution: "Proprietorship",
    aiScore: 45,
    checks: {
      gstinMatch: false,
      logoIntegrity: false,
      dateAlignment: false,
    },
    aiDescription: "GSTIN registration has been suspended or is inactive. Address on the certificate does not match the input registry address.",
    activityFeed: [
      { id: 'act1', title: 'GSTIN Suspended/Inactive', desc: 'Government registry returned inactive status.', status: 'error' },
      { id: 'act2', title: 'Address Mismatch', desc: 'Address verification failed.', status: 'error' },
      { id: 'act3', title: 'Auto-Flagged for Rejection', desc: 'High risk parameters detected.', status: 'error' }
    ]
  }
];

export default function GSTVerification() {
  const { addToast } = useToast();

  const [selectedBusiness, setSelectedBusiness] = useState(MOCK_BUSINESSES[0]);
  const [searchQuery, setSearchQuery] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [zoomScale, setZoomScale] = useState(1);
  const [rejectionModalOpen, setRejectionModalOpen] = useState(false);
  const [rejectionReason, setRejectionReason] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [statuses, setStatuses] = useState({});
  const [feeds, setFeeds] = useState({});

  const currentStatus = statuses[selectedBusiness.id] || { state: 'pending', reason: '' };
  const currentFeed = feeds[selectedBusiness.id] || selectedBusiness.activityFeed;

  const filteredBusinesses = useMemo(() => {
    if (!searchQuery.trim()) return MOCK_BUSINESSES;
    const query = searchQuery.toLowerCase();
    return MOCK_BUSINESSES.filter(b => 
      b.legalName.toLowerCase().includes(query) ||
      b.gstin.toLowerCase().includes(query)
    );
  }, [searchQuery]);

  const handleZoomIn = () => {
    setZoomScale(prev => Math.min(prev + 0.15, 1.6));
    addToast("Zoomed in", "success");
  };

  const handleZoomOut = () => {
    setZoomScale(prev => Math.max(prev - 0.15, 0.7));
    addToast("Zoomed out", "success");
  };

  const handleDownload = () => {
    const data = [
      ["Field", "Value"],
      ["Legal Name", selectedBusiness.legalName],
      ["GSTIN", selectedBusiness.gstin],
      ["Reg Date", selectedBusiness.regDate],
      ["Taxpayer Type", selectedBusiness.taxpayerType],
      ["Constitution", selectedBusiness.constitution],
      ["AI Confidence", `${selectedBusiness.aiScore}%`],
      ["Verification Status", currentStatus.state.toUpperCase()],
      ["Rejection Reason", currentStatus.reason || "N/A"]
    ];
    const csvContent = generateCSV(data[0], data.slice(1));
    triggerDownload(csvContent, `gst_verification_${selectedBusiness.id}.csv`, "text/csv");
    addToast(`Verification report downloaded for ${selectedBusiness.legalName}.`, "success");
  };

  const handleCopyGSTIN = () => {
    navigator.clipboard.writeText(selectedBusiness.gstin);
    addToast("GSTIN copied to clipboard!", "success");
  };

  const handleApprove = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setStatuses(prev => ({
        ...prev,
        [selectedBusiness.id]: { state: 'approved', reason: '' }
      }));
      setFeeds(prev => {
        const originalFeed = feeds[selectedBusiness.id] || selectedBusiness.activityFeed;
        if (originalFeed.some(f => f.title === 'GSTIN Validation Approved')) return prev;
        return {
          ...prev,
          [selectedBusiness.id]: [
            { id: 'approved_' + Date.now(), title: 'GSTIN Validation Approved', desc: 'Approved by Compliance Auditor.', status: 'success' },
            ...originalFeed
          ]
        };
      });
      addToast(`Approved GST for ${selectedBusiness.legalName}!`, 'success');
    }, 800);
  };

  const handleRejectConfirm = () => {
    if (!rejectionReason.trim()) {
      addToast('Please enter a rejection reason.', 'error');
      return;
    }
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setStatuses(prev => ({
        ...prev,
        [selectedBusiness.id]: { state: 'rejected', reason: rejectionReason }
      }));
      setFeeds(prev => {
        const originalFeed = feeds[selectedBusiness.id] || selectedBusiness.activityFeed;
        return {
          ...prev,
          [selectedBusiness.id]: [
            { id: 'rejected_' + Date.now(), title: 'GSTIN Validation Rejected', desc: `Reason: ${rejectionReason}`, status: 'error' },
            ...originalFeed
          ]
        };
      });
      addToast(`Rejected GST for ${selectedBusiness.legalName}.`, 'error');
      setRejectionModalOpen(false);
      setRejectionReason('');
    }, 800);
  };

  const handleReset = () => {
    setStatuses(prev => ({
      ...prev,
      [selectedBusiness.id]: { state: 'pending', reason: '' }
    }));
    setFeeds(prev => {
      const originalFeed = feeds[selectedBusiness.id] || selectedBusiness.activityFeed;
      return {
        ...prev,
        [selectedBusiness.id]: originalFeed.filter(f => !f.id.startsWith('approved_') && !f.id.startsWith('rejected_'))
      };
    });
    addToast('Status reset to pending.', 'success');
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'success': return 'bg-emerald-500';
      case 'error': return 'bg-rose-500';
      case 'warning': return 'bg-amber-500';
      case 'info':
      default:
        return 'bg-indigo-500';
    }
  };

  return (
    <AdminShell
      activeTab="Business"
      headerTitle="Business Registry"
      headerTabs={<BusinessHeaderTabs activeTab="Compliance" />}
      searchPlaceholder="Search entity, GSTN, or owner..."
    >
      <div className="business-doc-review-wrapper" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-section)', paddingBottom: '90px' }}>
        
        {/* Selection pills and Search Block */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px', borderBottom: '1px solid #e2e8f0', paddingBottom: '16px', position: 'relative' }}>
          <div style={{ display: 'flex', gap: '10px', overflowX: 'auto', maxWidth: '100%', paddingBottom: '4px' }}>
            {MOCK_BUSINESSES.map(b => {
              const isSelected = selectedBusiness.id === b.id;
              const status = statuses[b.id]?.state || 'pending';
              return (
                <button
                  key={b.id}
                  onClick={() => setSelectedBusiness(b)}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border text-xs font-bold transition whitespace-nowrap cursor-pointer ${
                    isSelected 
                      ? 'bg-indigo-900 text-white border-indigo-900 shadow-md' 
                      : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                  }`}
                  type="button"
                >
                  <span>{b.legalName}</span>
                  <span className={`w-2 h-2 rounded-full ${
                    status === 'approved' ? 'bg-emerald-500' : status === 'rejected' ? 'bg-rose-500' : 'bg-amber-400'
                  }`} />
                </button>
              );
            })}
          </div>
          
          {/* Clean Search Input */}
          <div style={{ display: 'flex', alignItems: 'center', background: '#fff', border: '1px solid #cbd5e1', borderRadius: '10px', padding: '6px 12px', width: '320px', gap: '8px' }}>
            <Search size={16} className="text-slate-400" />
            <input
              type="text"
              placeholder="Filter list by name or GSTIN..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setShowDropdown(true);
              }}
              onFocus={() => setShowDropdown(true)}
              style={{ border: 'none', outline: 'none', background: 'transparent', width: '100%', fontSize: '12px' }}
            />
            {searchQuery && (
              <button 
                onClick={() => { setSearchQuery(''); setShowDropdown(false); }} 
                style={{ border: 'none', background: 'transparent', cursor: 'pointer', color: '#94a3b8', fontSize: '14px', fontWeight: 'bold' }}
                type="button"
              >
                ×
              </button>
            )}
          </div>

          {/* Search Dropdown Overlay */}
          {showDropdown && (
            <>
              <div className="fixed inset-0 z-40 bg-transparent" onClick={() => setShowDropdown(false)} />
              <div className="absolute right-0 top-[50px] bg-white border border-[#D9DCE8] rounded-xl shadow-xl z-50 py-2 w-[320px] max-h-48 overflow-y-auto">
                {filteredBusinesses.map(b => (
                  <button
                    key={b.id}
                    onClick={() => {
                      setSelectedBusiness(b);
                      setSearchQuery('');
                      setShowDropdown(false);
                    }}
                    className="w-full text-left px-4 py-2 hover:bg-slate-50 transition flex flex-col border-none bg-transparent cursor-pointer"
                    type="button"
                  >
                    <span className="font-bold text-[#0F172A] text-xs">{b.legalName}</span>
                    <span className="text-[10px] text-slate-400 mt-0.5">{b.gstin}</span>
                  </button>
                ))}
                {filteredBusinesses.length === 0 && (
                  <div className="px-4 py-2 text-xs text-slate-400 italic">No business found</div>
                )}
              </div>
            </>
          )}
        </div>

        {/* Task Tag */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '11px', fontWeight: '800', color: '#4f46e5', background: '#e0e7ff', padding: '6px 12px', borderRadius: '20px', alignSelf: 'flex-start', border: '1px solid #c7d2fe' }}>
          <ShieldCheck size={14} />
          <span style={{ letterSpacing: '0.5px' }}>TASK: GST VALIDATION</span>
        </div>

        {/* Title Block */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <h1 className="page-title" style={{ margin: 0, fontSize: '24px', fontWeight: '900', letterSpacing: '-0.5px', color: '#0f172a' }}>Review Document: Form GST REG-06</h1>
            <p className="page-subtitle" style={{ margin: '6px 0 0', color: '#64748b', fontSize: '14px', fontWeight: '500' }}>Awaiting administrative verify check for {selectedBusiness.legalName}.</p>
          </div>

          <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
            <span style={{ fontSize: '12px', fontWeight: '700', color: '#64748b', marginRight: '4px' }}>Zoom: {Math.round(zoomScale * 100)}%</span>
            <button 
              style={{ border: '1px solid #cbd5e1', background: '#fff', color: '#334155', height: '36px', width: '36px', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', transition: 'all 0.2s' }} 
              type="button" 
              title="Zoom In" 
              onClick={handleZoomIn}
            >
              <Plus size={16} />
            </button>
            <button 
              style={{ border: '1px solid #cbd5e1', background: '#fff', color: '#334155', height: '36px', width: '36px', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', transition: 'all 0.2s' }} 
              type="button" 
              title="Zoom Out" 
              onClick={handleZoomOut}
            >
              <Minus size={16} />
            </button>
            <button 
              style={{ border: '1px solid #cbd5e1', background: '#fff', color: '#334155', height: '36px', width: '36px', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', transition: 'all 0.2s' }} 
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
          <div className="panel" style={{ background: '#0f172a', padding: 'var(--spacing-section)', display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '560px', overflow: 'auto', borderRadius: '12px', border: '1px solid #1e293b', boxShadow: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.6)' }}>
            
            {/* Scanned Document simulator mock */}
            <div style={{ 
              width: '100%', 
              maxWidth: '520px', 
              background: '#fff', 
              border: '1px solid #e2e8f0', 
              borderRadius: '8px', 
              padding: 'var(--spacing-page)', 
              position: 'relative', 
              boxShadow: '0 20px 25px -5px rgba(0,0,0,0.5)',
              transform: `scale(${zoomScale})`,
              transformOrigin: 'top center',
              transition: 'transform 0.2s ease-out-in'
            }}>
              
              {/* Box highlighter for GSTIN detected */}
              <div style={{ position: 'absolute', top: '90px', left: '170px', right: '40px', height: '26px', border: '1.5px solid #4f46e5', background: 'rgba(79, 70, 229, 0.06)', borderRadius: '4px', zIndex: 10, display: 'flex', alignItems: 'center', padding: '0 8px' }}>
                <span style={{ background: '#4f46e5', color: '#fff', fontSize: '7px', fontWeight: '900', padding: '2px 4px', borderRadius: '2px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>GSTIN DETECTED</span>
              </div>

              {/* Box highlighter for Name detected */}
              <div style={{ position: 'absolute', top: '168px', left: '120px', right: '40px', height: '26px', border: '1.5px solid #06b6d4', background: 'rgba(6, 182, 212, 0.06)', borderRadius: '4px', zIndex: 10, display: 'flex', alignItems: 'center', padding: '0 8px' }}>
                <span style={{ background: '#06b6d4', color: '#fff', fontSize: '7px', fontWeight: '900', padding: '2px 4px', borderRadius: '2px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>LEGAL NAME MATCH</span>
              </div>

              {/* Header document scan */}
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', borderBottom: '2px solid #0f172a', paddingBottom: '16px', marginBottom: '20px' }}>
                <strong style={{ fontSize: '12px', letterSpacing: '1px', color: '#0f172a', fontWeight: '900' }}>GOVERNMENT OF INDIA</strong>
                <span style={{ fontSize: '9px', color: '#475569', marginTop: '4px', fontWeight: '700' }}>Form GST REG-06 - Registration Certificate</span>
              </div>

              {/* Body lines scanned */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '10px', color: '#334155' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #f1f5f9', paddingBottom: '6px' }}>
                  <span style={{ fontWeight: '500', color: '#64748b' }}>Registration Number:</span>
                  <strong style={{ color: '#0f172a', fontFamily: "var(--materio-space)", fontSize: '11px' }}>{selectedBusiness.gstin}</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #f1f5f9', paddingBottom: '6px' }}>
                  <span style={{ fontWeight: '500', color: '#64748b' }}>Legal Name:</span>
                  <strong style={{ color: '#0f172a' }}>{selectedBusiness.legalName}</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #f1f5f9', paddingBottom: '6px' }}>
                  <span style={{ fontWeight: '500', color: '#64748b' }}>Trade Name:</span>
                  <strong style={{ color: '#0f172a' }}>{selectedBusiness.legalName.replace(" PVT LTD", "").replace(" & Distributors", "")}</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #f1f5f9', paddingBottom: '6px' }}>
                  <span style={{ fontWeight: '500', color: '#64748b' }}>Constitution of Business:</span>
                  <strong style={{ color: '#0f172a' }}>{selectedBusiness.constitution}</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #f1f5f9', paddingBottom: '6px' }}>
                  <span style={{ fontWeight: '500', color: '#64748b' }}>Date of Liability:</span>
                  <strong style={{ color: '#0f172a' }}>{selectedBusiness.regDate}</strong>
                </div>

                {/* Seal & Sign visual element */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginTop: '24px', paddingTop: '16px', borderTop: '1px dashed #cbd5e1' }}>
                  {/* Seal */}
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '70px', height: '70px', borderRadius: '50%', border: '2px double #0284c7', background: 'rgba(2, 132, 199, 0.03)', color: '#0284c7', fontSize: '7px', fontWeight: '800', textAlign: 'center', transform: 'rotate(-10deg)', lineHeight: '1.2' }}>
                    GST COUNCIL<br/>MUMBAI<br/>★ INDIA ★
                  </div>

                  {/* Sign */}
                  <div style={{ textAlign: 'right', display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
                    <span style={{ fontSize: '7px', color: '#94a3b8', fontStyle: 'italic', marginBottom: '4px' }}>Digitally signed by system</span>
                    <div style={{ width: '90px', height: '1.5px', background: '#334155' }} />
                    <span style={{ fontSize: '8px', fontWeight: '800', color: '#1e293b', marginTop: '4px' }}>Superintendent</span>
                    <span style={{ fontSize: '7px', color: '#64748b' }}>Mumbai Ward-4 Center</span>
                  </div>
                </div>
              </div>

            </div>

          </div>

          {/* Column 2: Metadata details, AI Verification, Activity Feed (Right) */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            
            {/* Legal details card */}
            <div className="panel" style={{ padding: 'var(--spacing-section)', border: '1px solid #e2e8f0', borderRadius: '12px' }}>
              <div style={{ display: 'flex', gap: '16px', alignItems: 'center', borderBottom: '1px solid #f1f5f9', paddingBottom: '16px', marginBottom: '16px' }}>
                <div style={{ height: '44px', width: '44px', borderRadius: '10px', background: '#eff6ff', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#3b82f6', flexShrink: 0 }}>
                  <Building2 size={22} />
                </div>
                <div>
                  <span style={{ display: 'block', fontSize: '11px', fontWeight: '800', color: '#3b82f6', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Business Profile</span>
                  <strong style={{ display: 'block', fontSize: '15px', color: '#0f172a', fontWeight: '800', marginTop: '2px' }}>{selectedBusiness.legalName}</strong>
                </div>
              </div>
                
              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', fontSize: '12px', color: '#64748b' }}>
                <div>
                  <span style={{ display: 'block', fontSize: '10px', fontWeight: '800', textTransform: 'uppercase', color: '#94a3b8' }}>GSTIN Number</span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '4px' }}>
                    <strong style={{ color: '#0f172a', fontSize: '13px', fontFamily: "var(--materio-space)", }}>{selectedBusiness.gstin}</strong>
                    <button onClick={handleCopyGSTIN} style={{ border: 'none', background: 'transparent', color: '#4f46e5', cursor: 'pointer', display: 'inline-flex', padding: 0 }} title="Copy GSTIN" type="button">
                      <ClipboardCopy size={14} className="hover:text-indigo-905" />
                    </button>
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  <div>
                    <span style={{ display: 'block', fontSize: '10px', fontWeight: '800', textTransform: 'uppercase', color: '#94a3b8' }}>Registration Date</span>
                    <strong style={{ color: '#0f172a', marginTop: '4px', display: 'block', fontWeight: '700' }}>{selectedBusiness.regDate}</strong>
                  </div>
                  <div>
                    <span style={{ display: 'block', fontSize: '10px', fontWeight: '800', textTransform: 'uppercase', color: '#94a3b8' }}>Taxpayer Type</span>
                    <strong style={{ color: '#0f172a', marginTop: '4px', display: 'block', fontWeight: '700' }}>{selectedBusiness.taxpayerType}</strong>
                  </div>
                </div>

                <div>
                  <span style={{ display: 'block', fontSize: '10px', fontWeight: '800', textTransform: 'uppercase', color: '#94a3b8' }}>Constitution of Business</span>
                  <strong style={{ color: '#0f172a', marginTop: '4px', display: 'block', fontWeight: '700' }}>{selectedBusiness.constitution}</strong>
                </div>
              </div>
            </div>

            {/* AI Verification result */}
            <div className="panel" style={{ padding: 'var(--spacing-section)', border: '1px solid #e2e8f0', borderRadius: '12px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                  <Cpu size={18} style={{ color: '#4f46e5' }} />
                  <strong style={{ fontSize: '14px', color: '#0f172a', fontWeight: '800' }}>AI Verification Checks</strong>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <span style={{ fontSize: '11px', fontWeight: '700', color: '#64748b' }}>Confidence Score</span>
                  <strong style={{ display: 'block', fontSize: '18px', color: selectedBusiness.aiScore >= 80 ? '#10b981' : '#f59e0b', fontWeight: '900' }}>{selectedBusiness.aiScore}%</strong>
                </div>
              </div>

              {/* Checklist */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', borderBottom: '1px solid #f1f5f9', paddingBottom: '16px', marginBottom: '16px' }}>
                <div style={{ display: 'flex', gap: '10px', alignItems: 'center', fontSize: '12px', fontWeight: '700', color: '#334155' }}>
                  <CheckCircle size={14} style={{ color: selectedBusiness.checks.gstinMatch ? '#10b981' : '#f43f5e' }} />
                  <span>GSTIN Signature Code Validation</span>
                </div>
                <div style={{ display: 'flex', gap: '10px', alignItems: 'center', fontSize: '12px', fontWeight: '700', color: '#334155' }}>
                  <CheckCircle size={14} style={{ color: selectedBusiness.checks.logoIntegrity ? '#10b981' : '#f43f5e' }} />
                  <span>Ashoka Pillar Emblem OCR Check</span>
                </div>
                <div style={{ display: 'flex', gap: '10px', alignItems: 'center', fontSize: '12px', fontWeight: '700', color: '#334155' }}>
                  <CheckCircle size={14} style={{ color: selectedBusiness.checks.dateAlignment ? '#10b981' : '#f43f5e' }} />
                  <span>Registration Validity & Liability Alignment</span>
                </div>
              </div>

              <p style={{ fontSize: '12px', color: '#64748b', lineHeight: '1.5', margin: 0 }}>
                {selectedBusiness.aiDescription}
              </p>
            </div>

            {/* Activity Feed */}
            <div className="panel" style={{ padding: 'var(--spacing-section)', border: '1px solid #e2e8f0', borderRadius: '12px' }}>
              <h2 style={{ fontSize: '14px', fontWeight: '850', color: '#0f172a', margin: '0 0 16px', letterSpacing: '-0.3px' }}>Document Audit History</h2>

              <div className="space-y-4">
                {currentFeed.map((item) => (
                  <div key={item.id} className="flex gap-4 text-xs">
                    <div className={`w-2.5 h-2.5 rounded-full mt-1.5 shrink-0 ${getStatusColor(item.status)}`} />
                    <div>
                      <p className="font-semibold text-slate-800 leading-none">
                        {item.title}
                      </p>
                      <p className="text-xs text-slate-500 mt-1.5 leading-normal">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>

        {/* Bottom Verification Actions bar */}
        {currentStatus.state === 'approved' ? (
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
              <CheckCircle size={16} />
              <span>GST Validation Approved successfully!</span>
            </div>
            <button
              onClick={handleReset}
              style={{ border: '1px solid #6ee7b7', background: '#fff', color: '#065f46', fontSize: '12px', fontWeight: '800', height: '36px', padding: '0 16px', borderRadius: '8px', cursor: 'pointer', transition: 'all 0.2s' }}
              type="button"
            >
              Reset Decision
            </button>
          </div>
        ) : currentStatus.state === 'rejected' ? (
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
              <span>GST Validation Rejected. Reason: {currentStatus.reason}</span>
            </div>
            <button
              onClick={handleReset}
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
                onClick={() => setRejectionModalOpen(true)}
                type="button"
                className="hover:bg-rose-50"
              >
                Reject With Reason
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
          <div style={{ position: 'fixed', inset: 0, zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(15,23,42,0.6)', backdropFilter: 'blur(2px)' }}>
            <div style={{ position: 'absolute', inset: 0 }} onClick={() => { setRejectionModalOpen(false); setRejectionReason(''); }} />
            <div style={{ position: 'relative', background: '#fff', width: '100%', maxWidth: '400px', margin: 'auto', borderRadius: '16px', padding: 'var(--spacing-section)', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.25)', border: '1px solid #f1f5f9' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '16px' }}>
                <div>
                  <h3 style={{ fontSize: '16px', fontWeight: '900', color: '#0f172a', margin: 0 }}>Reject GST Verification</h3>
                  <p style={{ fontSize: '12px', color: '#64748b', marginTop: '2px', margin: 0 }}>Document validation query for {selectedBusiness.legalName}</p>
                </div>
                <button onClick={() => { setRejectionModalOpen(false); setRejectionReason(''); }} style={{ border: 'none', background: 'transparent', cursor: 'pointer', color: '#94a3b8' }} type="button">
                  <X size={20} />
                </button>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <div>
                  <label style={{ fontSize: '11px', fontWeight: '800', textTransform: 'uppercase', color: '#64748b', display: 'block', marginBottom: '6px' }}>Reason for Rejection</label>
                  <textarea
                    rows="4"
                    value={rejectionReason}
                    onChange={(e) => setRejectionReason(e.target.value)}
                    placeholder="E.g., GST certificate signature is blurry, mismatching taxpayer address, incorrect filing date range..."
                    style={{ width: '100%', padding: '10px 12px', border: '1px solid #cbd5e1', borderRadius: '8px', fontSize: '12px', outline: 'none', resize: 'none',  }}
                  />
                </div>

                <div style={{ display: 'flex', gap: '10px', marginTop: '4px' }}>
                  <button
                    type="button"
                    onClick={() => { setRejectionModalOpen(false); setRejectionReason(''); }}
                    style={{ flex: 1, padding: '10px', height: '38px', background: '#fff', border: '1px solid #cbd5e1', borderRadius: '8px', fontSize: '12px', fontWeight: '750', color: '#475569', cursor: 'pointer' }}
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={handleRejectConfirm}
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
