import toast from 'react-hot-toast';
import React, { useState, useMemo } from 'react';
import { useApp } from '../../hooks/useApp';
import { ROUTES } from '../../config/routes';
import { useToast } from '../../components/common/ToastNotification';
import AdminShell from '../../components/layouts/AdminShell';
import BusinessHeaderTabs from './BusinessHeaderTabs';
import {
  ArrowLeft,
  Search,
  Plus,
  Minus,
  Download,
  Building,
  Check,
  CheckCircle,
  X,
  FileCheck,
  Cpu,
  Clock,
  ClipboardCopy,
  AlertTriangle,
  FolderLock,
  ZoomIn,
  ZoomOut,
  CheckSquare,
  Square,
  ShieldCheck
} from 'lucide-react';

export default function BusinessDocReview() {
  const { navigate } = useApp();
  const { addToast } = useToast();

  const entityName = 'Lumina Tech Solutions PVT LTD';
  const gstin = '27AAAAA0000A1Z5';

  // Interactive States
  const [zoomScale, setZoomScale] = useState(1);
  const [checklist, setChecklist] = useState({
    gstin: true,
    logo: true,
    date: true,
    jurisdiction: true
  });
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [rejectReason, setRejectReason] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Dynamic AI Score calculation
  const aiScore = useMemo(() => {
    let score = 20;
    if (checklist.gstin) score += 25;
    if (checklist.logo) score += 20;
    if (checklist.date) score += 20;
    if (checklist.jurisdiction) score += 13;
    return score;
  }, [checklist]);

  const handleApprove = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      addToast('Document validation successful. GST Form approved.', 'success');
      navigate(ROUTES.businessReview);
    }, 1000);
  };

  const handleConfirmReject = () => {
    if (!rejectReason.trim()) {
      toast.error('Please specify a rejection reason.');
      return;
    }
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setShowRejectModal(false);
      addToast(`Document rejected: ${rejectReason}`, 'error');
      navigate(ROUTES.businessReview);
    }, 1000);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(gstin);
    addToast('GSTIN copied to clipboard!', 'success');
  };

  const toggleCheck = (key) => {
    setChecklist(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  return (
    <AdminShell
      activeTab="Business"
      headerTitle="Business Registry"
      headerTabs={<BusinessHeaderTabs activeTab="Compliance" />}
      searchPlaceholder="Search registry..."
    >
      <div className="business-doc-review-wrapper" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-section)', paddingBottom: '80px' }}>
        
        {/* Task Tag */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '11px', fontWeight: '800', color: '#4f46e5', background: '#e0e7ff', padding: '6px 12px', borderRadius: '20px', alignSelf: 'flex-start', border: '1px solid #c7d2fe' }}>
          <FileCheck size={14} />
          <span style={{ letterSpacing: '0.5px' }}>TASK: GST VALIDATION</span>
        </div>

        {/* Title Block */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <h1 className="page-title" style={{ margin: 0, fontSize: '24px', fontWeight: '900', letterSpacing: '-0.5px', color: '#0f172a' }}>Review Document: Form GST REG-06</h1>
            <p className="page-subtitle" style={{ margin: '6px 0 0', color: '#64748b', fontSize: '14px', fontWeight: '500' }}>Awaiting administrative verify check for Lumina Tech Solutions PVT LTD.</p>
          </div>

          <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
            <span style={{ fontSize: '12px', fontWeight: '700', color: '#64748b', marginRight: '4px' }}>Zoom: {Math.round(zoomScale * 100)}%</span>
            <button 
              style={{ border: '1px solid #cbd5e1', background: '#fff', color: '#334155', height: '36px', width: '36px', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', transition: 'all 0.2s' }} 
              type="button" 
              title="Zoom In" 
              onClick={() => setZoomScale(prev => Math.min(prev + 0.15, 1.6))}
            >
              <Plus size={16} />
            </button>
            <button 
              style={{ border: '1px solid #cbd5e1', background: '#fff', color: '#334155', height: '36px', width: '36px', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', transition: 'all 0.2s' }} 
              type="button" 
              title="Zoom Out" 
              onClick={() => setZoomScale(prev => Math.max(prev - 0.15, 0.7))}
            >
              <Minus size={16} />
            </button>
            <button 
              style={{ border: '1px solid #cbd5e1', background: '#fff', color: '#334155', height: '36px', width: '36px', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', transition: 'all 0.2s' }} 
              type="button" 
              title="Download Document" 
              onClick={() => {
                toast.success("GST REG-06 mock certificate download initialized.");
              }}
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
                  <strong style={{ color: '#0f172a', fontFamily: "var(--materio-space)", fontSize: '11px' }}>{gstin}</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #f1f5f9', paddingBottom: '6px' }}>
                  <span style={{ fontWeight: '500', color: '#64748b' }}>Legal Name:</span>
                  <strong style={{ color: '#0f172a' }}>{entityName}</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #f1f5f9', paddingBottom: '6px' }}>
                  <span style={{ fontWeight: '500', color: '#64748b' }}>Trade Name:</span>
                  <strong style={{ color: '#0f172a' }}>Lumina Tech Solutions</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #f1f5f9', paddingBottom: '6px' }}>
                  <span style={{ fontWeight: '500', color: '#64748b' }}>Constitution of Business:</span>
                  <strong style={{ color: '#0f172a' }}>Private Limited Company</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #f1f5f9', paddingBottom: '6px' }}>
                  <span style={{ fontWeight: '500', color: '#64748b' }}>Date of Liability:</span>
                  <strong style={{ color: '#0f172a' }}>Oct 14, 2021</strong>
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
                  <Building size={22} />
                </div>
                <div>
                  <span style={{ display: 'block', fontSize: '11px', fontWeight: '800', color: '#3b82f6', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Business Profile</span>
                  <strong style={{ display: 'block', fontSize: '15px', color: '#0f172a', fontWeight: '800', marginTop: '2px' }}>{entityName}</strong>
                </div>
              </div>
                
              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', fontSize: '12px', color: '#64748b' }}>
                <div>
                  <span style={{ display: 'block', fontSize: '10px', fontWeight: '800', textTransform: 'uppercase', color: '#94a3b8' }}>GSTIN Number</span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '4px' }}>
                    <strong style={{ color: '#0f172a', fontSize: '13px', fontFamily: "var(--materio-space)", }}>{gstin}</strong>
                    <button onClick={copyToClipboard} style={{ border: 'none', background: 'transparent', color: '#4f46e5', cursor: 'pointer', display: 'inline-flex', padding: 0 }} title="Copy GSTIN" type="button">
                      <ClipboardCopy size={14} className="hover:text-indigo-900" />
                    </button>
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  <div>
                    <span style={{ display: 'block', fontSize: '10px', fontWeight: '800', textTransform: 'uppercase', color: '#94a3b8' }}>Registration Date</span>
                    <strong style={{ color: '#0f172a', marginTop: '4px', display: 'block', fontWeight: '700' }}>Oct 14, 2021</strong>
                  </div>
                  <div>
                    <span style={{ display: 'block', fontSize: '10px', fontWeight: '800', textTransform: 'uppercase', color: '#94a3b8' }}>Taxpayer Type</span>
                    <strong style={{ color: '#0f172a', marginTop: '4px', display: 'block', fontWeight: '700' }}>Regular</strong>
                  </div>
                </div>

                <div>
                  <span style={{ display: 'block', fontSize: '10px', fontWeight: '800', textTransform: 'uppercase', color: '#94a3b8' }}>Constitution of Business</span>
                  <strong style={{ color: '#0f172a', marginTop: '4px', display: 'block', fontWeight: '700' }}>Private Limited Company</strong>
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
                  <strong style={{ display: 'block', fontSize: '18px', color: aiScore >= 80 ? '#10b981' : '#f59e0b', fontWeight: '900' }}>{aiScore}%</strong>
                </div>
              </div>

              {/* Checklist */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', borderBottom: '1px solid #f1f5f9', paddingBottom: '16px', marginBottom: '16px' }}>
                <div 
                  onClick={() => toggleCheck('gstin')} 
                  style={{ display: 'flex', gap: '10px', alignItems: 'center', fontSize: '12px', fontWeight: '700', color: '#334155', cursor: 'pointer', userSelect: 'none' }}
                >
                  <input type="checkbox" checked={checklist.gstin} readOnly style={{ accentColor: '#4f46e5', cursor: 'pointer' }} />
                  <span>GSTIN Signature Code Validation</span>
                </div>
                <div 
                  onClick={() => toggleCheck('logo')} 
                  style={{ display: 'flex', gap: '10px', alignItems: 'center', fontSize: '12px', fontWeight: '700', color: '#334155', cursor: 'pointer', userSelect: 'none' }}
                >
                  <input type="checkbox" checked={checklist.logo} readOnly style={{ accentColor: '#4f46e5', cursor: 'pointer' }} />
                  <span>Ashoka Pillar Emblem OCR Check</span>
                </div>
                <div 
                  onClick={() => toggleCheck('date')} 
                  style={{ display: 'flex', gap: '10px', alignItems: 'center', fontSize: '12px', fontWeight: '700', color: '#334155', cursor: 'pointer', userSelect: 'none' }}
                >
                  <input type="checkbox" checked={checklist.date} readOnly style={{ accentColor: '#4f46e5', cursor: 'pointer' }} />
                  <span>Registration Validity & Liability Alignment</span>
                </div>
                <div 
                  onClick={() => toggleCheck('jurisdiction')} 
                  style={{ display: 'flex', gap: '10px', alignItems: 'center', fontSize: '12px', fontWeight: '700', color: '#334155', cursor: 'pointer', userSelect: 'none' }}
                >
                  <input type="checkbox" checked={checklist.jurisdiction} readOnly style={{ accentColor: '#4f46e5', cursor: 'pointer' }} />
                  <span>State & Central Ward Authority Verification</span>
                </div>
              </div>

              <p style={{ fontSize: '12px', color: '#64748b', lineHeight: '1.5', margin: 0 }}>
                System has validated the document checksum keys. Toggle the verification check parameters above to refine the administrative confidence calculation rating.
              </p>
            </div>

            {/* Activity Feed */}
            <div className="panel" style={{ padding: 'var(--spacing-section)', border: '1px solid #e2e8f0', borderRadius: '12px' }}>
              <h2 style={{ fontSize: '14px', fontWeight: '850', color: '#0f172a', margin: '0 0 16px', letterSpacing: '-0.3px' }}>Document Audit History</h2>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', fontSize: '12px' }}>
                <div style={{ display: 'flex', gap: '12px' }}>
                  <Clock size={16} style={{ color: '#94a3b8', marginTop: '2px' }} />
                  <div>
                    <span style={{ color: '#94a3b8', fontWeight: '600' }}>Today, 10:45 AM</span>
                    <strong style={{ display: 'block', color: '#334155', marginTop: '2px', fontWeight: '700' }}>OCR details successfully compiled</strong>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '12px' }}>
                  <CheckCircle size={16} style={{ color: '#10b981', marginTop: '2px' }} />
                  <div>
                    <span style={{ color: '#94a3b8', fontWeight: '600' }}>Today, 10:46 AM</span>
                    <strong style={{ display: 'block', color: '#334155', marginTop: '2px', fontWeight: '700' }}>GSTIN Portal matching: Active registration confirmed</strong>
                  </div>
                </div>
              </div>
            </div>

          </div>

        </div>

        {/* Bottom Verification Actions bar */}
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
              onClick={() => setShowRejectModal(true)}
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

        {/* ========================================================
            MODAL: REJECT WITH REASON DIALOG
            ======================================================== */}
        {showRejectModal && (
          <div style={{ position: 'fixed', inset: 0, zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(15,23,42,0.6)', backdropFilter: 'blur(2px)' }}>
            <div style={{ position: 'absolute', inset: 0 }} onClick={() => setShowRejectModal(false)} />
            <div style={{ position: 'relative', background: '#fff', width: '100%', maxWidth: '400px', margin: 'auto', borderRadius: '16px', padding: 'var(--spacing-section)', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.25)', border: '1px solid #f1f5f9' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '16px' }}>
                <div>
                  <h3 style={{ fontSize: '16px', fontWeight: '900', color: '#0f172a', margin: 0 }}>Reject GST Verification</h3>
                  <p style={{ fontSize: '12px', color: '#64748b', marginTop: '2px', margin: 0 }}>Document validation query for {entityName}</p>
                </div>
                <button onClick={() => setShowRejectModal(false)} style={{ border: 'none', background: 'transparent', cursor: 'pointer', color: '#94a3b8' }} type="button">
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
                    placeholder="E.g., GST certificate signature is blurry, mismatching taxpayer address, incorrect filing date range..."
                    style={{ width: '100%', padding: '10px 12px', border: '1px solid #cbd5e1', borderRadius: '8px', fontSize: '12px', outline: 'none', resize: 'none',  }}
                  />
                </div>

                <div style={{ display: 'flex', gap: '10px', marginTop: '4px' }}>
                  <button
                    type="button"
                    onClick={() => setShowRejectModal(false)}
                    style={{ flex: 1, padding: '10px', height: '38px', background: '#fff', border: '1px solid #cbd5e1', borderRadius: '8px', fontSize: '12px', fontWeight: '750', color: '#475569', cursor: 'pointer' }}
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={handleConfirmReject}
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
