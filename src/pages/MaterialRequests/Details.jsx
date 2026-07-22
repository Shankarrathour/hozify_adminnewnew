import React, { useState } from 'react';
import { 
  FileText, 
  Check, 
  MoreVertical, 
  AlertCircle, 
  Plus, 
  Edit2, 
  MapPin, 
  ChevronRight,
  Download,
  Users,
  ExternalLink,
  ShieldCheck,
  Map,
  ArrowLeft,
  Info,
  CheckCircle2,
  AlertTriangle,
  Eye,
  X
} from 'lucide-react';
import AdminShell from '../../components/layouts/AdminShell';
import { useApp } from '../../hooks/useApp';
import { ROUTES } from '../../config/routes';

export default function MaterialRequestDetails() {
  const { navigate, selectedRequestId } = useApp();
  const [activeTab, setActiveTab] = useState('Overview');
  const [isApproved, setIsApproved] = useState(false);
  
  // Interactive state for MR-8821
  const [mr8821Status, setMr8821Status] = useState('AWAITING APPROVAL');
  const [approvalNotes, setApprovalNotes] = useState('');

  const handleApprove = () => {
    setIsApproved(true);
    alert('Request REQ-2024-0892 has been approved successfully.');
  };

  const handleAddRequest = () => {
    navigate(ROUTES.materialCreate);
  };

  const tabs = ['Overview', 'Materials', 'Quotations', 'Supplier', 'Delivery', 'Cost Analysis', 'Timeline'];

  // Render Request #MR-8821 Approver Details (Screen 1)
  if (selectedRequestId === 'MR-8821') {
    return (
      <AdminShell
        activeTab="Approval Queue"
        brandText="Hozify Procurement"
        brandSubText="EXECUTIVE COMMAND"
        searchPlaceholder="Search requests..."
        customProfileName="Admin User"
        customProfileRole="CONTROLLER"
        headerTitle={
          <div 
            onClick={() => navigate(ROUTES.materialApprovals)}
            style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}
          >
            <ArrowLeft size={18} style={{ color: '#565365' }} />
            <span style={{ fontSize: '15px', fontWeight: '700', color: '#565365' }}>
              Procurement Portal / Request #MR-8821
            </span>
          </div>
        }
        headerTabs={
          <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
            <span style={{ fontSize: '13px', fontWeight: '600', color: '#565365', cursor: 'pointer' }} onClick={() => navigate(ROUTES.materialAnalytics)}>Analytics</span>
            <span style={{ fontSize: '13px', fontWeight: '600', color: '#565365', cursor: 'pointer' }} onClick={() => navigate(ROUTES.materialVendors)}>Suppliers</span>
            <span style={{ fontSize: '13px', fontWeight: '600', color: '#565365', cursor: 'pointer' }} onClick={() => navigate(ROUTES.materialReports)}>Reports</span>
          </div>
        }
      >
        <div style={{ padding: '24px 0', display: 'flex', flexDirection: 'column', gap: 'var(--spacing-section)', position: 'relative', minHeight: 'calc(100vh - 120px)', paddingBottom: '90px' }}>
          
          {/* Header Row */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px' }}>
            <div>
              <span style={{ 
                display: 'inline-block',
                fontSize: '11px', 
                fontWeight: '800', 
                padding: '4px 8px', 
                borderRadius: '4px', 
                background: mr8821Status === 'APPROVED' ? '#ecfdf5' : mr8821Status === 'REJECTED' ? '#fef2f2' : '#fffbeb', 
                color: mr8821Status === 'APPROVED' ? '#059669' : mr8821Status === 'REJECTED' ? '#dc2626' : '#d97706',
                letterSpacing: '0.5px'
              }}>
                {mr8821Status}
              </span>
              <h1 style={{ fontSize: '28px', fontWeight: '800', color: '#1c2536', margin: '8px 0 4px 0' }}>
                Structural Steel Components
              </h1>
              <p style={{ fontSize: '14px', color: '#7a7688', margin: 0 }}>
                Project: SkyRise Residential Complex - Phase II
              </p>
            </div>
            <div style={{ textAlign: 'right' }}>
              <span style={{ display: 'block', fontSize: '11px', fontWeight: '700', color: '#7a7688', textTransform: 'uppercase' }}>
                Total Value
              </span>
              <strong style={{ display: 'block', fontSize: '32px', fontWeight: '800', color: 'var(--primary)', marginTop: '4px' }}>
                $142,850.00
              </strong>
            </div>
          </div>

          {/* Cards Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 'var(--spacing-section)' }}>
            
            {/* Column 1: Requester Details & Compliance */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-section)' }}>
              
              {/* Requester Details Card */}
              <div className="panel" style={{ background: '#ffffff', border: '1.5px solid #25108f', borderRadius: '12px', padding: 'var(--spacing-section)' }}>
                <span style={{ display: 'block', fontSize: '11px', fontWeight: '800', color: '#7a7688', letterSpacing: '0.5px', textTransform: 'uppercase', marginBottom: '16px' }}>
                  Requester Details
                </span>
                
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', paddingBottom: '16px', borderBottom: '1px solid #f1f5f9', marginBottom: '16px' }}>
                  <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: '#f0eefc', color: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Users size={20} />
                  </div>
                  <div>
                    <strong style={{ display: 'block', fontSize: '15px', color: '#1c2536' }}>David Chen</strong>
                    <span style={{ display: 'block', fontSize: '13px', color: '#7a7688', marginTop: '2px' }}>Site Engineer</span>
                  </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                  <div>
                    <span style={{ display: 'block', fontSize: '11px', color: '#7a7688', textTransform: 'uppercase' }}>Requested On</span>
                    <span style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#1c2536', marginTop: '4px' }}>Oct 24, 2023 • 14:30 PM</span>
                  </div>
                  <div>
                    <span style={{ display: 'block', fontSize: '11px', color: '#7a7688', textTransform: 'uppercase' }}>Department</span>
                    <span style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#1c2536', marginTop: '4px' }}>Civil Engineering</span>
                  </div>
                  <div>
                    <span style={{ display: 'block', fontSize: '11px', color: '#7a7688', textTransform: 'uppercase' }}>Urgency</span>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '4px' }}>
                      <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#dc2626' }} />
                      <span style={{ fontSize: '13px', fontWeight: '700', color: '#dc2626' }}>High Priority</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Compliance Card */}
              <div className="panel" style={{ background: '#ffffff', border: '1.5px solid #25108f', borderRadius: '12px', padding: 'var(--spacing-section)' }}>
                <span style={{ display: 'block', fontSize: '11px', fontWeight: '800', color: '#7a7688', letterSpacing: '0.5px', textTransform: 'uppercase', marginBottom: '16px' }}>
                  Compliance
                </span>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '13px', color: '#1c2536' }}>Safety Certifications</span>
                    <div style={{ color: '#10b981', display: 'flex', alignItems: 'center' }}>
                      <CheckCircle2 size={18} fill="#ecfdf5" />
                    </div>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '13px', color: '#1c2536' }}>Environmental Audit</span>
                    <div style={{ color: '#10b981', display: 'flex', alignItems: 'center' }}>
                      <CheckCircle2 size={18} fill="#ecfdf5" />
                    </div>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '13px', color: '#1c2536' }}>Import Permits</span>
                    <div style={{ color: '#f59e0b', display: 'flex', alignItems: 'center' }}>
                      <AlertTriangle size={18} fill="#fffbeb" />
                    </div>
                  </div>
                </div>
              </div>

            </div>

            {/* Column 2: Material Itemization & Tech Note */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-section)' }}>
              
              {/* Material Itemization Card */}
              <div className="panel" style={{ background: '#ffffff', border: '1.5px solid #25108f', borderRadius: '12px', padding: 'var(--spacing-section)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                  <span style={{ fontSize: '15px', fontWeight: '800', color: '#1c2536' }}>
                    Material Itemization
                  </span>
                  <span style={{ fontSize: '12px', color: '#7a7688' }}>
                    3 Items Total
                  </span>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  
                  {/* Item 1 */}
                  <div style={{ borderBottom: '1px solid #f1f5f9', paddingBottom: '14px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                      <div>
                        <strong style={{ display: 'block', fontSize: '14px', color: '#1c2536' }}>I-Beam 300×150 S355JR</strong>
                        <span style={{ display: 'block', fontSize: '11px', color: '#7a7688', marginTop: '2px' }}>STL-300-882</span>
                      </div>
                      <div style={{ textAlign: 'right' }}>
                        <span style={{ display: 'block', fontSize: '13px', fontWeight: '700', color: '#1c2536' }}>$83,250.00</span>
                      </div>
                    </div>
                    <div style={{ display: 'flex', gap: 'var(--spacing-section)', marginTop: '8px', fontSize: '12px', color: '#7a7688' }}>
                      <span>Quantity: <strong style={{ color: '#1c2536' }}>45 Units</strong></span>
                      <span>Unit Price: <strong style={{ color: '#1c2536' }}>$1,850.00</strong></span>
                    </div>
                  </div>

                  {/* Item 2 */}
                  <div style={{ borderBottom: '1px solid #f1f5f9', paddingBottom: '14px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                      <div>
                        <strong style={{ display: 'block', fontSize: '14px', color: '#1c2536' }}>Steel Reinforcement Bars 20mm</strong>
                        <span style={{ display: 'block', fontSize: '11px', color: '#7a7688', marginTop: '2px' }}>REBAR-20-D</span>
                      </div>
                      <div style={{ textAlign: 'right' }}>
                        <span style={{ display: 'block', fontSize: '13px', fontWeight: '700', color: '#1c2536' }}>$50,400.00</span>
                      </div>
                    </div>
                    <div style={{ display: 'flex', gap: 'var(--spacing-section)', marginTop: '8px', fontSize: '12px', color: '#7a7688' }}>
                      <span>Quantity: <strong style={{ color: '#1c2536' }}>12 Tons</strong></span>
                      <span>Unit Price: <strong style={{ color: '#1c2536' }}>$4,200.00</strong></span>
                    </div>
                  </div>

                  {/* Item 3 */}
                  <div style={{ paddingBottom: '4px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                      <div>
                        <strong style={{ display: 'block', fontSize: '14px', color: '#1c2536' }}>Welding Electrodes E7018</strong>
                        <span style={{ display: 'block', fontSize: '11px', color: '#7a7688', marginTop: '2px' }}>WLD-E70-BOX</span>
                      </div>
                      <div style={{ textAlign: 'right' }}>
                        <span style={{ display: 'block', fontSize: '13px', fontWeight: '700', color: '#1c2536' }}>$9,200.00</span>
                      </div>
                    </div>
                    <div style={{ display: 'flex', gap: 'var(--spacing-section)', marginTop: '8px', fontSize: '12px', color: '#7a7688' }}>
                      <span>Quantity: <strong style={{ color: '#1c2536' }}>150 Boxes</strong></span>
                      <span>Unit Price: <strong style={{ color: '#1c2536' }}>$61.33</strong></span>
                    </div>
                  </div>

                </div>
              </div>

              {/* Technical Spec note */}
              <div style={{ 
                background: '#eff6ff', 
                border: '1px dashed #3b82f6', 
                borderRadius: '8px', 
                padding: '16px',
                display: 'flex',
                gap: '12px',
                alignItems: 'flex-start'
              }}>
                <Info size={20} style={{ color: '#2563eb', flexShrink: 0, marginTop: '2px' }} />
                <div>
                  <strong style={{ display: 'block', fontSize: '13px', color: '#1e3a8a', marginBottom: '4px' }}>Technical Specification Note</strong>
                  <p style={{ fontSize: '12px', color: '#1e40af', margin: 0, lineHeight: '1.5' }}>
                    All steel components must adhere to ASTM A36 standard. Vendor has provided mill test certificates for the previous 3 batches. Quality control is mandatory upon site delivery.
                  </p>
                </div>
              </div>

            </div>

            {/* Column 3: Budget Analysis & Reviewer Notes */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-section)' }}>
              
              {/* Budget Analysis Card */}
              <div className="panel" style={{ background: '#ffffff', border: '1.5px solid #25108f', borderRadius: '12px', padding: 'var(--spacing-section)' }}>
                <span style={{ display: 'block', fontSize: '11px', fontWeight: '800', color: '#7a7688', letterSpacing: '0.5px', textTransform: 'uppercase', marginBottom: '16px' }}>
                  Budget Analysis
                </span>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                  <span style={{ fontSize: '13px', fontWeight: '700', color: '#1c2536' }}>Project Allocation</span>
                  <strong style={{ fontSize: '14px', color: '#7a7688' }}>$2,500,000</strong>
                </div>

                {/* Progress bar */}
                <div style={{ height: '8px', background: '#f1f5f9', borderRadius: '4px', overflow: 'hidden', marginBottom: '20px' }}>
                  <div style={{ width: '68%', height: '100%', background: 'var(--primary)', borderRadius: '4px' }} />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
                  <div style={{ background: '#f8fafc', padding: '12px', borderRadius: '6px', textAlign: 'center' }}>
                    <span style={{ display: 'block', fontSize: '10px', color: '#7a7688', textTransform: 'uppercase' }}>Spent</span>
                    <strong style={{ display: 'block', fontSize: '16px', color: '#1c2536', marginTop: '4px' }}>$1.7M</strong>
                  </div>
                  <div style={{ background: '#f0f5ff', padding: '12px', borderRadius: '6px', textAlign: 'center' }}>
                    <span style={{ display: 'block', fontSize: '10px', color: '#2563eb', textTransform: 'uppercase' }}>Impact</span>
                    <strong style={{ display: 'block', fontSize: '16px', color: '#2563eb', marginTop: '4px' }}>+5.7%</strong>
                  </div>
                </div>

                <p style={{ fontSize: '12px', color: '#7a7688', margin: 0, lineHeight: '1.5', fontStyle: 'italic' }}>
                  This request represents 5.7% of the remaining phase budget. Request is within +/- 10% threshold.
                </p>
              </div>

              {/* Reviewer Notes Card */}
              <div className="panel" style={{ background: '#ffffff', border: '1.5px solid #25108f', borderRadius: '12px', padding: 'var(--spacing-section)' }}>
                <span style={{ display: 'block', fontSize: '11px', fontWeight: '800', color: '#7a7688', letterSpacing: '0.5px', textTransform: 'uppercase', marginBottom: '16px' }}>
                  Reviewer Notes
                </span>

                <div style={{ display: 'flex', gap: '12px', position: 'relative', paddingBottom: '16px' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: 'var(--primary)', marginTop: '4px', zIndex: 2 }} />
                    <div style={{ width: '2px', background: '#e2e8f0', flex: 1, minHeight: '60px', marginTop: '4px', zIndex: 1 }} />
                  </div>
                  <div>
                    <strong style={{ display: 'block', fontSize: '13px', color: '#1c2536' }}>Inventory Check</strong>
                    <span style={{ display: 'block', fontSize: '11px', color: '#7a7688', marginTop: '2px' }}>Oct 24 • 15:00</span>
                    <p style={{ fontSize: '12px', color: '#565365', marginTop: '8px', margin: 0, lineHeight: '1.4' }}>
                      Confirmed: Stock levels for Steel Reinforcement are zero. Current requisition is justified.
                    </p>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '12px' }}>
                  <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#cbd5e1', marginTop: '4px' }} />
                  <div style={{ flex: 1 }}>
                    <textarea 
                      placeholder="Add your approval notes here..."
                      value={approvalNotes}
                      onChange={(e) => setApprovalNotes(e.target.value)}
                      style={{
                        width: '100%',
                        height: '70px',
                        border: '1px solid #cbd5e1',
                        borderRadius: '6px',
                        padding: '10px',
                        fontSize: '12px',
                        resize: 'none',
                        outline: 'none',
                        
                      }}
                    />
                  </div>
                </div>
              </div>

            </div>

          </div>

          {/* Sticky Bottom Action Bar */}
          <div style={{
            position: 'fixed',
            bottom: 0,
            left: '260px', // adapts to standard sidebar layout width
            right: 0,
            background: '#ffffff',
            borderTop: '1.5px solid #25108f',
            padding: '16px 32px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            zIndex: 100,
            boxShadow: '0 -4px 12px rgba(0,0,0,0.03)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#7a7688' }}>
              <Eye size={18} />
              <span style={{ fontSize: '13px', fontWeight: '600' }}>Viewing as Procurement Director</span>
            </div>
            
            <div style={{ display: 'flex', gap: '12px' }}>
              <button
                onClick={() => {
                  setMr8821Status('CHANGES REQUESTED');
                  alert('Changes requested.');
                }}
                style={{
                  background: '#ffffff',
                  color: '#565365',
                  border: '1px solid #cbd5e1',
                  borderRadius: '6px',
                  padding: '10px 20px',
                  fontSize: '13px',
                  fontWeight: '700',
                  cursor: 'pointer'
                }}
                type="button"
              >
                Request Changes
              </button>
              <button
                onClick={() => {
                  setMr8821Status('REJECTED');
                  alert('Request rejected.');
                }}
                style={{
                  background: '#ffffff',
                  color: '#dc2626',
                  border: '1px solid #fca5a5',
                  borderRadius: '6px',
                  padding: '10px 20px',
                  fontSize: '13px',
                  fontWeight: '700',
                  cursor: 'pointer'
                }}
                type="button"
              >
                Reject
              </button>
              <button
                onClick={() => {
                  setMr8821Status('APPROVED');
                  alert('Request approved successfully!');
                }}
                style={{
                  background: 'var(--primary)',
                  color: '#ffffff',
                  border: 'none',
                  borderRadius: '6px',
                  padding: '10px 24px',
                  fontSize: '13px',
                  fontWeight: '700',
                  cursor: 'pointer'
                }}
                type="button"
              >
                Approve Request
              </button>
            </div>
          </div>

        </div>
      </AdminShell>
    );
  }

  // Fallback to original REQ-2024-0892 layout (Phase 1)
  return (
    <AdminShell
      activeTab="Material Requests"
      brandText="Hozify Procurement"
      brandSubText="EXECUTIVE COMMAND"
      searchPlaceholder="Search requests..."
      customProfileName="Admin User"
      customProfileRole="Procurement lead"
    >
      <div style={{ padding: '24px 0', display: 'flex', flexDirection: 'column', gap: 'var(--spacing-section)' }}>
        
        {/* Requisition Sheet Header Card */}
        <div className="panel" style={{ background: '#ffffff', border: '1.5px solid #25108f', borderRadius: '12px', padding: 'var(--spacing-section)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <h1 style={{ fontSize: '24px', fontWeight: '800', color: 'var(--text)', margin: 0 }}>
                  REQ-2024-0892
                </h1>
                <span style={{ 
                  fontSize: '11px', 
                  fontWeight: '800', 
                  padding: '4px 8px', 
                  borderRadius: '4px', 
                  background: isApproved ? '#ecfdf5' : '#fffbeb', 
                  color: isApproved ? '#059669' : '#d97706' 
                }}>
                  {isApproved ? 'APPROVED' : 'PENDING APPROVAL'}
                </span>
              </div>
              <p style={{ fontSize: '14px', color: 'var(--muted)', marginTop: '6px', margin: 0 }}>
                Structural Steel Reinforcement for Project Zenith Phase II
              </p>
            </div>
            
            <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
              <button
                style={{
                  background: '#ffffff',
                  color: 'var(--text)',
                  border: '1.5px solid #25108f',
                  borderRadius: '6px',
                  padding: '8px 16px',
                  fontSize: '13px',
                  fontWeight: '700',
                  cursor: 'pointer'
                }}
                type="button"
              >
                View Attachments
              </button>
              <button
                onClick={handleApprove}
                disabled={isApproved}
                style={{
                  background: isApproved ? '#cbd5e1' : '#25108f',
                  color: '#ffffff',
                  border: 'none',
                  borderRadius: '6px',
                  padding: '8px 16px',
                  fontSize: '13px',
                  fontWeight: '700',
                  cursor: isApproved ? 'default' : 'pointer'
                }}
                type="button"
              >
                {isApproved ? 'Approved' : 'Approve Request'}
              </button>
              <button
                style={{
                  background: '#ffffff',
                  color: '#565365',
                  border: '1.5px solid #25108f',
                  borderRadius: '6px',
                  width: '36px',
                  height: '36px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer'
                }}
                aria-label="More actions"
                type="button"
              >
                <MoreVertical size={16} />
              </button>
            </div>
          </div>
        </div>

        {/* Tab Sub-navigation */}
        <div style={{ borderBottom: '1.5px solid #25108f', display: 'flex', gap: 'var(--spacing-section)', overflowY: 'auto', maxHeight: '400px', paddingBottom: '2px' }}>
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              style={{
                background: 'none',
                border: 'none',
                color: activeTab === tab ? '#25108f' : '#7a7688',
                fontWeight: activeTab === tab ? '700' : '500',
                fontSize: '14px',
                padding: '8px 4px 12px 4px',
                borderBottom: activeTab === tab ? '2.5px solid #25108f' : '2.5px solid transparent',
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                transition: 'all 0.15s ease'
              }}
              type="button"
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Main Content Layout */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr', lgGridTemplateColumns: '2fr 1fr', gap: 'var(--spacing-section)' }}>
          
          {/* Left Column Content */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-section)' }}>
            
            {/* 3 Detail KPI Mini Cards */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
              {/* Mini Card 1 */}
              <div className="panel" style={{ background: '#ffffff', border: '1.5px solid #25108f', borderRadius: '12px', padding: '16px 20px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: '10px' }}>
                <div>
                  <span style={{ display: 'block', fontSize: '10px', fontWeight: '800', color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                    TOTAL ESTIMATED VALUE
                  </span>
                  <strong style={{ display: 'block', fontSize: '20px', color: 'var(--text)', fontWeight: '800', marginTop: '4px' }}>
                    $142,500.00
                  </strong>
                </div>
                <span style={{ fontSize: '11px', fontWeight: '700', color: '#059669' }}>
                  +4.2% vs Plan
                </span>
                <div style={{ height: '4px', background: '#f1f5f9', borderRadius: '2px', overflow: 'hidden' }}>
                  <div style={{ width: '65%', height: '100%', background: 'var(--primary)', borderRadius: '2px' }} />
                </div>
              </div>

              {/* Mini Card 2 */}
              <div className="panel" style={{ background: '#ffffff', border: '1.5px solid #25108f', borderRadius: '12px', padding: '16px 20px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: '10px' }}>
                <div>
                  <span style={{ display: 'block', fontSize: '10px', fontWeight: '800', color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                    PRIORITY LEVEL
                  </span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '4px' }}>
                    <AlertCircle size={18} style={{ color: 'var(--red)' }} />
                    <strong style={{ fontSize: '20px', color: 'var(--text)', fontWeight: '800' }}>
                      High
                    </strong>
                  </div>
                </div>
                <span style={{ fontSize: '12px', color: 'var(--muted)' }}>
                  Required by Oct 24, 2024
                </span>
              </div>

              {/* Mini Card 3 */}
              <div className="panel" style={{ background: '#ffffff', border: '1.5px solid #25108f', borderRadius: '12px', padding: '16px 20px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: '10px' }}>
                <div>
                  <span style={{ display: 'block', fontSize: '10px', fontWeight: '800', color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                    APPROVAL CHAIN
                  </span>
                  {/* Avatars */}
                  <div style={{ display: 'flex', gap: '6px', marginTop: '6px' }}>
                    {['JD', 'MK', 'AS'].map((init, i) => (
                      <div 
                        key={i} 
                        style={{ 
                          width: '28px', 
                          height: '28px', 
                          borderRadius: '50%', 
                          background: i === 2 ? '#25108f' : '#e2e8f0', 
                          color: i === 2 ? '#ffffff' : '#565365', 
                          fontSize: '11px', 
                          fontWeight: '800', 
                          display: 'flex', 
                          alignItems: 'center', 
                          justifyContent: 'center',
                          border: '1.5px solid #ffffff'
                        }}
                      >
                        {init}
                      </div>
                    ))}
                  </div>
                </div>
                <span style={{ fontSize: '12px', color: 'var(--muted)' }}>
                  2 of 3 Verified
                </span>
              </div>
            </div>

            {/* Requested Materials Card */}
            <div className="panel" style={{ background: '#ffffff', border: '1.5px solid #25108f', borderRadius: '12px', padding: 'var(--spacing-section)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <h2 style={{ fontSize: '16px', fontWeight: '800', color: 'var(--text)', margin: 0 }}>
                  Requested Materials
                </h2>
                <button
                  onClick={handleAddRequest}
                  style={{
                    background: 'transparent',
                    border: 'none',
                    color: 'var(--primary)',
                    fontSize: '13px',
                    fontWeight: '700',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px'
                  }}
                  type="button"
                >
                  <Plus size={14} />
                  <span>Add Item</span>
                </button>
              </div>

              <div style={{ overflowY: 'auto', maxHeight: '400px' }}>
                <div className="table-responsive-wrapper">
<table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', minWidth: '580px' }}>
                  <thead>
                    <tr style={{ borderBottom: '1.5px solid #25108f' }}>
                      <th style={{ padding: '12px 8px', fontSize: '11px', fontWeight: '800', color: 'var(--muted)', textTransform: 'uppercase' }}>SKU</th>
                      <th style={{ padding: '12px 8px', fontSize: '11px', fontWeight: '800', color: 'var(--muted)', textTransform: 'uppercase' }}>DESCRIPTION</th>
                      <th style={{ padding: '12px 8px', fontSize: '11px', fontWeight: '800', color: 'var(--muted)', textTransform: 'uppercase' }}>QUANTITY</th>
                      <th style={{ padding: '12px 8px', fontSize: '11px', fontWeight: '800', color: 'var(--muted)', textTransform: 'uppercase' }}>UNIT PRICE</th>
                      <th style={{ padding: '12px 8px', fontSize: '11px', fontWeight: '800', color: 'var(--muted)', textTransform: 'uppercase' }}>TOTAL</th>
                      <th style={{ padding: '12px 8px', width: '40px' }} />
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { sku: 'ST-REBAR-16', desc: 'Steel Rebar Grade 60 (16mm)', detail: 'Standard 12m length', qty: '2,500 units', price: '$45.00', total: '$112,500.00' },
                      { sku: 'CM-PORT-01', desc: 'Portland Cement Type I', detail: 'Bulk supply / 50kg bags', qty: '2,000 units', price: '$15.00', total: '$30,000.00' }
                    ].map((row, idx) => (
                      <tr key={idx} style={{ borderBottom: '1px solid #fcfaff' }}>
                        <td style={{ padding: '16px 8px', fontSize: '13px', fontWeight: '700', color: '#565365' }}>
                          {row.sku}
                        </td>
                        <td style={{ padding: '16px 8px' }}>
                          <strong style={{ display: 'block', fontSize: '13px', color: 'var(--text)' }}>
                            {row.desc}
                          </strong>
                          <span style={{ display: 'block', fontSize: '11px', color: 'var(--muted)', marginTop: '2px' }}>
                            {row.detail}
                          </span>
                        </td>
                        <td style={{ padding: '16px 8px', fontSize: '13px', color: 'var(--text)', fontWeight: '600' }}>
                          {row.qty}
                        </td>
                        <td style={{ padding: '16px 8px', fontSize: '13px', color: '#565365' }}>
                          {row.price}
                        </td>
                        <td style={{ padding: '16px 8px', fontSize: '13px', fontWeight: '700', color: 'var(--text)' }}>
                          {row.total}
                        </td>
                        <td style={{ padding: '16px 8px', textAlign: 'center' }}>
                          <button
                            onClick={() => alert(`Editing item ${row.sku}`)}
                            style={{ border: 'none', background: 'transparent', color: '#7a7688', cursor: 'pointer', padding: '4px' }}
                            title="Edit Item"
                            type="button"
                          >
                            <Edit2 size={14} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
</div>
              </div>
            </div>

          </div>

          {/* Right Column Content */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-section)' }}>
            
            {/* Primary Supplier dark card */}
            <div className="panel" style={{ background: '#0b1329', color: '#ffffff', borderRadius: '12px', padding: 'var(--spacing-section)', display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <span style={{ fontSize: '10px', fontWeight: '800', color: 'rgba(255,255,255,0.6)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                  PRIMARY SUPPLIER
                </span>
                <strong style={{ display: 'block', fontSize: '20px', fontWeight: '800', color: '#ffffff', marginTop: '6px' }}>
                  Titan Steel Industries
                </strong>
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '11px', fontWeight: '800', color: '#10b981', border: '1px solid rgba(16,185,129,0.3)', background: 'rgba(16,185,129,0.1)', padding: '4px 10px', borderRadius: '16px', marginTop: '12px' }}>
                  <ShieldCheck size={14} />
                  <span>Preferred Platinum Vendor</span>
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', borderTop: '1px solid rgba(255,255,255,0.08)', borderBottom: '1px solid rgba(255,255,255,0.08)', padding: '16px 0' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px' }}>
                  <span style={{ color: 'rgba(255,255,255,0.6)' }}>Lead Time</span>
                  <strong style={{ fontWeight: '700' }}>14 Days</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px' }}>
                  <span style={{ color: 'rgba(255,255,255,0.6)' }}>Reliability Score</span>
                  <strong style={{ fontWeight: '700' }}>98.4%</strong>
                </div>
              </div>

              <button
                onClick={() => alert('Opening Titan Steel Industries contract...')}
                style={{
                  width: '100%',
                  height: '38px',
                  background: '#ffffff',
                  color: '#0b1329',
                  border: 'none',
                  borderRadius: '6px',
                  fontSize: '13px',
                  fontWeight: '700',
                  cursor: 'pointer',
                  transition: 'opacity 0.2s'
                }}
                onMouseOver={(e) => e.currentTarget.style.opacity = '0.9'}
                onMouseOut={(e) => e.currentTarget.style.opacity = '1'}
                type="button"
              >
                View Contract
              </button>
            </div>

            {/* Activity Timeline Card */}
            <div className="panel" style={{ background: '#ffffff', border: '1.5px solid #25108f', borderRadius: '12px', padding: 'var(--spacing-section)', display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <h3 style={{ fontSize: '15px', fontWeight: '800', color: 'var(--text)', margin: 0 }}>
                Activity Timeline
              </h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
                {[
                  { title: 'Request Created', desc: 'by Sarah Jenkins · 2 hours ago', status: 'completed' },
                  { title: 'Inventory Check Passed', desc: 'Stock insufficient, procurement advised · 1 hour ago', status: 'completed' },
                  { title: 'Awaiting Dept. Head Approval', desc: 'Assigned to Marcus K. · Pending', status: 'pending' }
                ].map((event, index) => (
                  <div key={index} style={{ display: 'flex', gap: '16px', position: 'relative' }}>
                    
                    {/* Circle and Line */}
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '20px' }}>
                      <div style={{ 
                        width: '10px', 
                        height: '10px', 
                        borderRadius: '50%', 
                        background: event.status === 'completed' ? '#07956f' : '#f59e0b',
                        zIndex: 2,
                        marginTop: '4px'
                      }} />
                      {index < 2 && (
                        <div style={{ width: '2px', background: '#eee9f6', flex: 1, minHeight: '36px', zIndex: 1 }} />
                      )}
                    </div>

                    {/* Info */}
                    <div style={{ flex: 1, paddingBottom: '20px' }}>
                      <strong style={{ display: 'block', fontSize: '13px', color: 'var(--text)' }}>
                        {event.title}
                      </strong>
                      <span style={{ display: 'block', fontSize: '11px', color: 'var(--muted)', marginTop: '4px' }}>
                        {event.desc}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              <button 
                onClick={() => alert('Audit logs loaded.')}
                style={{ border: 'none', background: 'transparent', color: 'var(--primary)', fontSize: '13px', fontWeight: '800', cursor: 'pointer', textAlign: 'center', width: '100%', borderTop: '1px solid #fcfaff', paddingTop: '12px' }}
                type="button"
              >
                View Full Audit Log
              </button>
            </div>

            {/* Destination map card */}
            <div className="panel" style={{ border: '1.5px solid #25108f', borderRadius: '12px', padding: 0, overflow: 'hidden', height: '220px', position: 'relative', background: '#f1ebfa' }}>
              
              {/* Custom SVG background looking like map grid */}
              <div style={{ width: '100%', height: '100%', position: 'absolute', top: 0, left: 0, opacity: 0.15, zIndex: 1 }}>
                <svg width="100%" height="100%">
                  <pattern id="grid" width="30" height="30" patternUnits="userSpaceOnUse">
                    <path d="M 30 0 L 0 0 0 30" fill="none" stroke="#25108f" strokeWidth="1" />
                  </pattern>
                  <rect width="100%" height="100%" fill="url(#grid)" />
                  <path d="M 0 50 Q 150 120 300 20 T 450 180" fill="none" stroke="#25108f" strokeWidth="3" strokeDasharray="5,5" />
                  <circle cx="200" cy="110" r="16" fill="rgba(37,16,143,0.2)" />
                  <circle cx="200" cy="110" r="8" fill="#25108f" />
                </svg>
              </div>

              {/* Destination Panel overlay */}
              <div style={{ position: 'absolute', bottom: '12px', left: '12px', right: '12px', background: '#ffffff', borderRadius: '8px', padding: '12px', zIndex: 2, display: 'flex', alignItems: 'center', gap: '8px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
                <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: '#f1ebfa', color: 'var(--primary)', display: 'flex', alignItems: 'center', justifySelf: 'center', justifyContent: 'center' }}>
                  <MapPin size={16} />
                </div>
                <div style={{ flex: 1 }}>
                  <span style={{ display: 'block', fontSize: '11px', color: 'var(--muted)' }}>Destination</span>
                  <strong style={{ display: 'block', fontSize: '12px', color: 'var(--text)', fontWeight: '700' }}>Project Zenith Site, Sector 7</strong>
                </div>
              </div>

              {/* Float floating + button */}
              <button 
                onClick={() => alert('Pinning custom destination coordinates...')}
                style={{ 
                  position: 'absolute', 
                  bottom: '12px', 
                  right: '12px', 
                  width: '40px', 
                  height: '40px', 
                  borderRadius: '50%', 
                  background: 'var(--primary)', 
                  color: '#ffffff', 
                  border: 'none', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center', 
                  boxShadow: '0 4px 12px rgba(0,0,0,0.25)', 
                  cursor: 'pointer',
                  zIndex: 3 
                }}
                aria-label="Add location marker"
                type="button"
              >
                <Plus size={20} />
              </button>
            </div>

          </div>
        </div>

      </div>
    </AdminShell>
  );
}


