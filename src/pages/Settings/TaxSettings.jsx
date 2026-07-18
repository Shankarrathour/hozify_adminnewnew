import React, { useState, useRef } from 'react';
import { Plus, ShieldCheck, AlertTriangle, MoreVertical, Upload, CheckSquare, Square, Pencil, CheckCircle2, Loader2, X } from 'lucide-react';
import Toggle from '../../components/common/Toggle';
import AdminShell from '../../components/layouts/AdminShell';
import { useToast } from '../../components/common/ToastNotification';

const INITIAL_STATE = {
  taxId: "VAT-US-9910231",
  taxRate: "20.00",
  intraExempt: true,
  dstEnabled: false,
  exemptions: { edu: true, charity: false, export: true }
};

const INITIAL_REGIONS = [
  { id: 1, code: 'UK', name: 'United Kingdom', type: 'Standard VAT', rate: '20.0' },
  { id: 2, code: 'DE', name: 'Germany', type: 'Mehrwertsteuer', rate: '19.0' },
  { id: 3, code: 'US', name: 'California, USA', type: 'State Sales Tax', rate: '7.25' }
];

const INITIAL_CERTIFICATES = [
  { id: 1, name: 'EU-VAT-2024.crt', expiry: 'Dec 2024', status: 'valid' },
  { id: 2, name: 'IRS-TOKEN-REVOKED', expiry: 'Action Required', status: 'revoked' }
];

export default function TaxSettings() {
  const { addToast } = useToast();
  
  const [formData, setFormData] = useState(INITIAL_STATE);
  const [isSaving, setIsSaving] = useState(false);
  const [regions, setRegions] = useState(INITIAL_REGIONS);
  
  // Region Modal State
  const [isRegionModalOpen, setIsRegionModalOpen] = useState(false);
  const [editingRegionId, setEditingRegionId] = useState(null);
  const [regionForm, setRegionForm] = useState({ code: '', name: '', type: '', rate: '' });

  // Certificate State
  const [certificates, setCertificates] = useState(INITIAL_CERTIFICATES);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef(null);

  // Compliance Report State
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [isGeneratingReport, setIsGeneratingReport] = useState(false);

  const handleViewReport = () => {
    setIsGeneratingReport(true);
    addToast('Generating compliance report...', 'info');
    setTimeout(() => {
      setIsGeneratingReport(false);
      setIsReportModalOpen(true);
    }, 1200);
  };

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleExemptionToggle = (key) => {
    setFormData(prev => ({
      ...prev,
      exemptions: {
        ...prev.exemptions,
        [key]: !prev.exemptions[key]
      }
    }));
  };

  const handleDiscard = () => {
    setFormData(INITIAL_STATE);
    setRegions(INITIAL_REGIONS);
    setCertificates(INITIAL_CERTIFICATES);
    addToast("Changes discarded and restored to original state.", "info");
  };

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      addToast("Tax Configuration saved successfully!", "success");
    }, 800);
  };

  const openRegionModal = (region = null) => {
    if (region) {
      setEditingRegionId(region.id);
      setRegionForm({ code: region.code, name: region.name, type: region.type, rate: region.rate });
    } else {
      setEditingRegionId(null);
      setRegionForm({ code: '', name: '', type: '', rate: '' });
    }
    setIsRegionModalOpen(true);
  };

  const handleSaveRegion = (e) => {
    e.preventDefault();
    if (!regionForm.code || !regionForm.name || !regionForm.type || !regionForm.rate) {
      addToast("Please fill in all region fields", "error");
      return;
    }

    if (editingRegionId) {
      setRegions(prev => prev.map(r => r.id === editingRegionId ? { ...regionForm, id: editingRegionId } : r));
      addToast("Region updated successfully", "success");
    } else {
      setRegions(prev => [...prev, { ...regionForm, id: Date.now() }]);
      addToast("New region added successfully", "success");
    }
    setIsRegionModalOpen(false);
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    setIsUploading(true);
    // Simulate upload delay
    setTimeout(() => {
      setCertificates(prev => [
        ...prev,
        { id: Date.now(), name: file.name, expiry: 'Valid (1 Year)', status: 'valid' }
      ]);
      setIsUploading(false);
      addToast(`${file.name} uploaded successfully`, 'success');
      // Reset input so the same file can be selected again
      if (fileInputRef.current) fileInputRef.current.value = '';
    }, 1200);
  };

  return (
    <AdminShell
      activeTab="Settings"
      customProfileName="Alex Rivera"
      customProfileRole="Admin User"
      showGridIcon={true}
    >
      <div className="tax-settings-page" style={{ padding: '32px 40px 60px', position: 'relative', minHeight: 'calc(100vh - 64px)', display: 'flex', flexDirection: 'column' }}>
        
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '32px' }}>
          <div>
            <h1 style={{ fontSize: '28px', fontWeight: '800', color: 'var(--text)', margin: '0 0 8px' }}>
              Tax Settings
            </h1>
            <p style={{ fontSize: '14px', color: 'var(--muted)', margin: 0 }}>
              Configure global VAT, GST, and regional compliance rules for enterprise operations.
            </p>
          </div>
          <div style={{ display: 'flex', gap: '12px', marginTop: '12px' }}>
            <button 
              onClick={handleDiscard} 
              disabled={isSaving}
              type="button" 
              style={{ padding: '0 20px', height: '40px', background: '#fff', border: '1px solid #e2e8f0', borderRadius: '6px', fontSize: '13px', fontWeight: '700', color: 'var(--text)', cursor: isSaving ? 'not-allowed' : 'pointer', opacity: isSaving ? 0.6 : 1 }}
            >
              Discard Changes
            </button>
            <button 
              onClick={handleSave} 
              disabled={isSaving}
              type="button" 
              style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '0 24px', height: '40px', background: '#1e1b4b', border: 'none', borderRadius: '6px', fontSize: '13px', fontWeight: '700', color: '#fff', cursor: isSaving ? 'not-allowed' : 'pointer', opacity: isSaving ? 0.8 : 1 }}
            >
              {isSaving && <Loader2 size={16} className="animate-spin" />}
              Save Configuration
            </button>
          </div>
        </div>

        {/* Main Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: '32px', flex: 1 }}>
          
          {/* Left Column */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-section)' }}>
            
            {/* Global VAT/GST Rules */}
            <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '28px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                <h2 style={{ fontSize: '18px', fontWeight: '800', color: 'var(--text)', margin: 0 }}>Global VAT/GST Rules</h2>
                <span style={{ background: '#dbeafe', color: '#1e40af', padding: '4px 12px', borderRadius: '12px', fontSize: '11px', fontWeight: '800', letterSpacing: '0.5px' }}>
                  Compliance Active
                </span>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--spacing-section)', marginBottom: '32px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <label style={{ fontSize: '11px', fontWeight: '800', color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Primary Tax Identification</label>
                  <input 
                    type="text" 
                    value={formData.taxId}
                    onChange={(e) => handleChange('taxId', e.target.value)}
                    style={{ width: '100%', height: '44px', padding: '0 16px', border: '1px solid #e2e8f0', borderRadius: '6px', fontSize: '14px', color: 'var(--text)', outline: 'none' }}
                  />
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <label style={{ fontSize: '11px', fontWeight: '800', color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Standard Tax Rate (%)</label>
                  <div style={{ display: 'flex', height: '44px', border: '1px solid #e2e8f0', borderRadius: '6px', overflow: 'hidden' }}>
                    <input 
                      type="number"
                      step="0.01" 
                      value={formData.taxRate}
                      onChange={(e) => handleChange('taxRate', e.target.value)}
                      style={{ flex: 1, padding: '0 16px', border: 'none', fontSize: '14px', color: 'var(--text)', outline: 'none' }}
                    />
                    <div style={{ background: '#f8fafc', padding: '0 16px', borderLeft: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', fontSize: '14px', color: 'var(--muted)', fontWeight: '600' }}>
                      %
                    </div>
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px', border: '1px solid #e2e8f0', borderRadius: '6px' }}>
                  <div>
                    <h3 style={{ fontSize: '13px', fontWeight: '800', color: 'var(--text)', margin: '0 0 4px' }}>Intra-community Supply Exemption</h3>
                    <p style={{ fontSize: '12px', color: 'var(--muted)', margin: 0 }}>Enable tax-free transactions between registered EU entities.</p>
                  </div>
                  <Toggle 
                    checked={formData.intraExempt} 
                    onChange={(val) => handleChange('intraExempt', val)} 
                  />
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px', border: '1px solid #e2e8f0', borderRadius: '6px' }}>
                  <div>
                    <h3 style={{ fontSize: '13px', fontWeight: '800', color: 'var(--text)', margin: '0 0 4px' }}>Digital Services Tax (DST)</h3>
                    <p style={{ fontSize: '12px', color: 'var(--muted)', margin: 0 }}>Apply jurisdiction-specific DST for multi-national digital advertising revenue.</p>
                  </div>
                  <Toggle 
                    checked={formData.dstEnabled} 
                    onChange={(val) => handleChange('dstEnabled', val)} 
                  />
                </div>
              </div>
            </div>

            {/* Country-Specific Overrides */}
            <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '28px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                <h2 style={{ fontSize: '18px', fontWeight: '800', color: 'var(--text)', margin: 0 }}>Country-Specific Overrides</h2>
                <button type="button" onClick={() => openRegionModal()} style={{ display: 'flex', alignItems: 'center', gap: '6px', background: 'none', border: 'none', fontSize: '13px', fontWeight: '700', color: '#4f46e5', cursor: 'pointer', padding: 0 }}>
                  <Plus size={16} /> Add Region
                </button>
              </div>

              <div>
                <div className="table-responsive-wrapper">
                  <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                    <thead>
                      <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
                        <th style={{ padding: '0 0 16px', fontSize: '10px', fontWeight: '800', color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Region</th>
                        <th style={{ padding: '0 0 16px', fontSize: '10px', fontWeight: '800', color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Tax Type</th>
                        <th style={{ padding: '0 0 16px', fontSize: '10px', fontWeight: '800', color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Rate</th>
                        <th style={{ padding: '0 0 16px', fontSize: '10px', fontWeight: '800', color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.5px', textAlign: 'right' }}>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {regions.map((region) => (
                        <tr key={region.id} style={{ borderBottom: '1px solid #e2e8f0' }} className="animate-in fade-in">
                          <td style={{ padding: '16px 0', fontSize: '13px', fontWeight: '700', color: 'var(--text)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <span style={{ background: '#e2e8f0', padding: '2px 4px', borderRadius: '3px', fontSize: '10px' }}>{region.code}</span> {region.name}
                          </td>
                          <td style={{ padding: '16px 0', fontSize: '13px', color: 'var(--muted)' }}>{region.type}</td>
                          <td style={{ padding: '16px 0', fontSize: '13px', fontWeight: '800', color: 'var(--text)' }}>{region.rate}%</td>
                          <td style={{ padding: '16px 0', textAlign: 'right' }}>
                            <button 
                              style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--muted)' }} 
                              onClick={() => openRegionModal(region)}
                            >
                              <Pencil size={16} />
                            </button>
                          </td>
                        </tr>
                      ))}
                      {regions.length === 0 && (
                        <tr>
                          <td colSpan="4" style={{ padding: '32px', textAlign: 'center', color: 'var(--muted)', fontSize: '13px' }}>
                            No region overrides configured.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-section)' }}>
            
            {/* Digital Certificates */}
            <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: '8px', padding: 'var(--spacing-section)' }}>
              <h2 style={{ fontSize: '16px', fontWeight: '800', color: 'var(--text)', margin: '0 0 8px' }}>Digital Certificates</h2>
              <p style={{ fontSize: '12px', color: 'var(--muted)', margin: '0 0 20px', lineHeight: '1.5' }}>Manage cryptographic tax certificates for automated filing and validation.</p>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '20px' }}>
                {certificates.map(cert => (
                  <div key={cert.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 16px', border: cert.status === 'revoked' ? '1px dashed #fca5a5' : '1px solid #e2e8f0', background: cert.status === 'revoked' ? '#fef2f2' : 'transparent', borderRadius: '6px' }} className="animate-in fade-in">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      {cert.status === 'revoked' ? <AlertTriangle size={20} style={{ color: '#ef4444' }} /> : <ShieldCheck size={20} style={{ color: 'var(--text)' }} />}
                      <div>
                        <strong style={{ display: 'block', fontSize: '13px', color: cert.status === 'revoked' ? '#ef4444' : 'var(--text)' }}>{cert.name}</strong>
                        <span style={{ fontSize: '10px', color: cert.status === 'revoked' ? '#ef4444' : 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.5px', fontWeight: cert.status === 'revoked' ? '700' : '400' }}>{cert.status === 'revoked' ? cert.expiry : `Expires: ${cert.expiry}`}</span>
                      </div>
                    </div>
                    <button style={{ background: 'none', border: 'none', color: cert.status === 'revoked' ? '#fca5a5' : '#cbd5e1', cursor: 'pointer' }} onClick={(e) => { e.preventDefault(); addToast('Certificate options opened.', 'info'); }}><MoreVertical size={16} /></button>
                  </div>
                ))}
              </div>

              <input 
                type="file" 
                ref={fileInputRef} 
                onChange={handleFileUpload} 
                style={{ display: 'none' }} 
                accept=".crt,.pem,.key,.pfx,.pdf,.png,.jpg,.jpeg"
              />
              <button 
                type="button" 
                disabled={isUploading}
                style={{ width: '100%', padding: '12px', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px', border: '1px dashed #cbd5e1', background: '#fff', borderRadius: '6px', fontSize: '12px', fontWeight: '700', color: 'var(--text)', cursor: isUploading ? 'not-allowed' : 'pointer', opacity: isUploading ? 0.6 : 1 }} 
                onClick={() => fileInputRef.current.click()}
              >
                {isUploading ? <Loader2 size={16} className="animate-spin" /> : <Upload size={16} />}
                {isUploading ? 'Uploading...' : 'Upload New Certificate'}
              </button>
            </div>

            {/* Tax Exemptions */}
            <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: '8px', padding: 'var(--spacing-section)' }}>
              <h2 style={{ fontSize: '16px', fontWeight: '800', color: 'var(--text)', margin: '0 0 20px' }}>Tax Exemptions</h2>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', cursor: 'pointer' }} onClick={() => handleExemptionToggle('edu')}>
                  <div style={{ marginTop: '2px' }}>
                    {formData.exemptions.edu ? (
                      <CheckSquare size={18} style={{ color: '#0f172a' }} fill="#0f172a" stroke="#fff" />
                    ) : (
                      <Square size={18} style={{ color: '#cbd5e1' }} />
                    )}
                  </div>
                  <div>
                    <strong style={{ display: 'block', fontSize: '13px', color: 'var(--text)', marginBottom: '2px' }}>Educational Institutions</strong>
                    <span style={{ fontSize: '12px', color: 'var(--muted)' }}>Zero-rated for all 501(c)(3) entities.</span>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', cursor: 'pointer' }} onClick={() => handleExemptionToggle('charity')}>
                  <div style={{ marginTop: '2px' }}>
                    {formData.exemptions.charity ? (
                      <CheckSquare size={18} style={{ color: '#0f172a' }} fill="#0f172a" stroke="#fff" />
                    ) : (
                      <Square size={18} style={{ color: '#cbd5e1' }} />
                    )}
                  </div>
                  <div>
                    <strong style={{ display: 'block', fontSize: '13px', color: 'var(--text)', marginBottom: '2px' }}>Charitable Organizations</strong>
                    <span style={{ fontSize: '12px', color: 'var(--muted)', lineHeight: '1.4', display: 'block' }}>Requires manual certificate verification.</span>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', cursor: 'pointer' }} onClick={() => handleExemptionToggle('export')}>
                  <div style={{ marginTop: '2px' }}>
                    {formData.exemptions.export ? (
                      <CheckSquare size={18} style={{ color: '#0f172a' }} fill="#0f172a" stroke="#fff" />
                    ) : (
                      <Square size={18} style={{ color: '#cbd5e1' }} />
                    )}
                  </div>
                  <div>
                    <strong style={{ display: 'block', fontSize: '13px', color: 'var(--text)', marginBottom: '2px' }}>Export Goods</strong>
                    <span style={{ fontSize: '12px', color: 'var(--muted)', lineHeight: '1.4', display: 'block' }}>Automatic zero-rate for cross-border shipping.</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Audit Readiness */}
            <div style={{ background: '#1e1b4b', borderRadius: '8px', padding: 'var(--spacing-section)', color: '#fff' }}>
              <h2 style={{ fontSize: '16px', fontWeight: '800', color: '#fff', margin: '0 0 12px' }}>Audit Readiness</h2>
              <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.7)', margin: '0 0 24px', lineHeight: '1.5' }}>
                Your current tax configuration matches 98% of regional compliance requirements for Q4 2024.
              </p>
              
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <div style={{ padding: '8px 12px', background: 'rgba(255,255,255,0.1)', borderRadius: '6px', fontSize: '16px', fontWeight: '800' }}>
                  98%
                </div>
                <button type="button" onClick={handleViewReport} disabled={isGeneratingReport} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, fontSize: '12px', fontWeight: '700', color: '#fff', textDecoration: 'underline', textUnderlineOffset: '2px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  {isGeneratingReport && <Loader2 size={12} className="animate-spin" />}
                  {isGeneratingReport ? 'Generating...' : 'View Compliance Report'}
                </button>
              </div>
            </div>

          </div>

        </div>

        {/* Footer sticky bar (simulated position absolute at bottom or just flex-end) */}
        <div style={{ marginTop: '40px', padding: '20px 0 0', borderTop: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', gap: 'var(--spacing-section)', fontSize: '11px', fontWeight: '700', color: 'var(--muted)' }}>
            <span>Tax Jurisdiction: US-FED-GLOBAL</span>
            <span>Last Updated: {new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}, {new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', timeZoneName: 'short' })}</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11px', fontWeight: '800', color: '#16a34a' }}>
            <CheckCircle2 size={14} /> Systems Fully Compliant
          </div>
        </div>

        {/* Add/Edit Region Modal */}
        {isRegionModalOpen && (
          <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(15, 23, 42, 0.5)', backdropFilter: 'blur(4px)', zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px' }}>
            <div className="animate-in zoom-in-95 duration-200" style={{ background: '#fff', borderRadius: '12px', width: '100%', maxWidth: '400px', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)' }}>
              
              <div style={{ padding: '20px 24px', borderBottom: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <h3 style={{ fontSize: '18px', fontWeight: '800', color: 'var(--text)', margin: '0 0 4px' }}>
                    {editingRegionId ? "Edit Region" : "Add Region"}
                  </h3>
                  <p style={{ fontSize: '13px', color: 'var(--muted)', margin: 0 }}>Configure tax rules for a specific region.</p>
                </div>
                <button onClick={() => setIsRegionModalOpen(false)} style={{ background: '#f1f5f9', border: 'none', width: '32px', height: '32px', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: 'var(--muted)' }}>
                  <X size={18} />
                </button>
              </div>

              <form onSubmit={handleSaveRegion} style={{ padding: '24px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  
                  <div style={{ display: 'flex', gap: '16px' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', width: '80px' }}>
                      <label style={{ fontSize: '12px', fontWeight: '800', color: 'var(--text)' }}>Code</label>
                      <input 
                        type="text" 
                        placeholder="e.g. UK"
                        value={regionForm.code}
                        onChange={e => setRegionForm({...regionForm, code: e.target.value.toUpperCase()})}
                        maxLength={4}
                        style={{ width: '100%', height: '44px', padding: '0 12px', border: '1px solid #e2e8f0', borderRadius: '6px', fontSize: '13px', color: 'var(--text)', outline: 'none', textTransform: 'uppercase' }}
                        required
                      />
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', flex: 1 }}>
                      <label style={{ fontSize: '12px', fontWeight: '800', color: 'var(--text)' }}>Region Name</label>
                      <input 
                        type="text" 
                        placeholder="e.g. United Kingdom"
                        value={regionForm.name}
                        onChange={e => setRegionForm({...regionForm, name: e.target.value})}
                        style={{ width: '100%', height: '44px', padding: '0 12px', border: '1px solid #e2e8f0', borderRadius: '6px', fontSize: '13px', color: 'var(--text)', outline: 'none' }}
                        required
                      />
                    </div>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <label style={{ fontSize: '12px', fontWeight: '800', color: 'var(--text)' }}>Tax Type</label>
                    <input 
                      type="text" 
                      placeholder="e.g. Standard VAT"
                      value={regionForm.type}
                      onChange={e => setRegionForm({...regionForm, type: e.target.value})}
                      style={{ width: '100%', height: '44px', padding: '0 12px', border: '1px solid #e2e8f0', borderRadius: '6px', fontSize: '13px', color: 'var(--text)', outline: 'none' }}
                      required
                    />
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <label style={{ fontSize: '12px', fontWeight: '800', color: 'var(--text)' }}>Tax Rate (%)</label>
                    <input 
                      type="number" 
                      step="0.01"
                      placeholder="0.00"
                      value={regionForm.rate}
                      onChange={e => setRegionForm({...regionForm, rate: e.target.value})}
                      style={{ width: '100%', height: '44px', padding: '0 12px', border: '1px solid #e2e8f0', borderRadius: '6px', fontSize: '13px', color: 'var(--text)', outline: 'none' }}
                      required
                    />
                  </div>

                </div>
                
                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '32px' }}>
                  <button type="button" onClick={() => setIsRegionModalOpen(false)} style={{ padding: '0 20px', height: '44px', background: '#fff', border: '1px solid #e2e8f0', borderRadius: '6px', fontSize: '13px', fontWeight: '700', color: 'var(--text)', cursor: 'pointer' }}>
                    Cancel
                  </button>
                  <button type="submit" style={{ padding: '0 24px', height: '44px', background: '#1e1b4b', border: 'none', borderRadius: '6px', fontSize: '13px', fontWeight: '700', color: '#fff', cursor: 'pointer' }}>
                    {editingRegionId ? "Update Region" : "Add Region"}
                  </button>
                </div>
              </form>

            </div>
          </div>
        )}

        {/* Compliance Report Modal */}
        {isReportModalOpen && (
          <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(15, 23, 42, 0.5)', backdropFilter: 'blur(4px)', zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px' }}>
            <div className="animate-in zoom-in-95 duration-200" style={{ background: '#fff', borderRadius: '12px', width: '100%', maxWidth: '700px', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)', display: 'flex', flexDirection: 'column', maxHeight: '90vh' }}>
              
              <div style={{ padding: '20px 24px', borderBottom: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <h3 style={{ fontSize: '18px', fontWeight: '800', color: 'var(--text)', margin: '0 0 4px' }}>
                    Q4 2024 Compliance Report
                  </h3>
                  <p style={{ fontSize: '13px', color: 'var(--muted)', margin: 0 }}>Global Tax Jurisdiction Readiness Assessment</p>
                </div>
                <button onClick={() => setIsReportModalOpen(false)} style={{ background: '#f1f5f9', border: 'none', width: '32px', height: '32px', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: 'var(--muted)' }}>
                  <X size={18} />
                </button>
              </div>

              <div style={{ padding: '24px', flex: 1, overflowY: 'auto' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginBottom: '32px' }}>
                  <div style={{ background: '#f8fafc', padding: '20px', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                    <div style={{ fontSize: '28px', fontWeight: '800', color: '#16a34a', marginBottom: '4px' }}>98%</div>
                    <div style={{ fontSize: '13px', fontWeight: '700', color: 'var(--text)' }}>Overall Compliance Score</div>
                    <div style={{ fontSize: '12px', color: 'var(--muted)' }}>Top tier rating achieved</div>
                  </div>
                  <div style={{ background: '#f8fafc', padding: '20px', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                    <div style={{ fontSize: '28px', fontWeight: '800', color: '#ef4444', marginBottom: '4px' }}>1</div>
                    <div style={{ fontSize: '13px', fontWeight: '700', color: 'var(--text)' }}>Action Item Required</div>
                    <div style={{ fontSize: '12px', color: 'var(--muted)' }}>IRS Token revocation issue</div>
                  </div>
                </div>

                <h4 style={{ fontSize: '14px', fontWeight: '800', color: 'var(--text)', marginBottom: '16px' }}>Regional Breakdown</h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {regions.map(r => (
                    <div key={r.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 16px', border: '1px solid #e2e8f0', borderRadius: '6px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <ShieldCheck size={18} style={{ color: '#16a34a' }} />
                        <span style={{ fontSize: '13px', fontWeight: '600', color: 'var(--text)' }}>{r.name} ({r.code})</span>
                      </div>
                      <span style={{ fontSize: '11px', fontWeight: '800', color: '#16a34a', background: '#dcfce7', padding: '2px 8px', borderRadius: '4px' }}>VERIFIED</span>
                    </div>
                  ))}
                  {regions.length === 0 && (
                    <div style={{ padding: '16px', textAlign: 'center', color: 'var(--muted)', fontSize: '13px', border: '1px solid #e2e8f0', borderRadius: '6px' }}>
                      No active regions configured.
                    </div>
                  )}
                </div>
              </div>

              <div style={{ padding: '16px 24px', borderTop: '1px solid #e2e8f0', display: 'flex', justifyContent: 'flex-end' }}>
                <button type="button" onClick={() => setIsReportModalOpen(false)} style={{ padding: '0 24px', height: '40px', background: '#1e1b4b', border: 'none', borderRadius: '6px', fontSize: '13px', fontWeight: '700', color: '#fff', cursor: 'pointer' }}>
                  Close Report
                </button>
              </div>

            </div>
          </div>
        )}

      </div>
    </AdminShell>
  );
}
