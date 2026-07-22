import React, { useState } from 'react';
import { AlertTriangle, Loader2, X, ChevronLeft, ChevronRight } from 'lucide-react';
import Toggle from '../../components/common/Toggle';
import AdminShell from '../../components/layouts/AdminShell';
import toast from 'react-hot-toast';

import Select from "../../components/ui/Select";

// Initial mock data for audit logs
const INITIAL_AUDIT_LOGS = [
  { id: 1, admin: 'Marcus Sterling', initials: 'MS', action: "Toggled 'Maintenance Mode' OFF", scope: 'Global/Public', date: 'Oct 24, 09:42 AM', status: 'SUCCESS' },
  { id: 2, admin: 'Elena Lundqvist', initials: 'EL', action: "Updated KYC threshold to 'Level 2'", scope: 'EU Region', date: 'Oct 23, 04:15 PM', status: 'SUCCESS' },
];

export default function PlatformConfiguration() {
  // Config State
  const [level1Checked, setLevel1Checked] = useState(true);
  const [level2Checked, setLevel2Checked] = useState(true);
  
  const [verificationLogic, setVerificationLogic] = useState("Automated API Only");
  const [retrialPeriod, setRetrialPeriod] = useState("24");
  const [claimsApproval, setClaimsApproval] = useState(false);
  const [refundLimit, setRefundLimit] = useState("250");

  // System State
  const [auditLogs, setAuditLogs] = useState(INITIAL_AUDIT_LOGS);
  const [loadingStates, setLoadingStates] = useState({});
  const [isResetting, setIsResetting] = useState(false);
  const [isAuditModalOpen, setIsAuditModalOpen] = useState(false);
  const [auditPage, setAuditPage] = useState(1);
  const LOGS_PER_PAGE = 8;

  const getTimestamp = () => {
    const now = new Date();
    return now.toLocaleString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });
  };

  const mockApiCall = (actionKey, successMessage, logEntry) => {
    return new Promise((resolve, reject) => {
      setLoadingStates(prev => ({ ...prev, [actionKey]: true }));
      
      setTimeout(() => {
        // 95% success rate
        const isSuccess = Math.random() > 0.05;
        
        setLoadingStates(prev => ({ ...prev, [actionKey]: false }));
        
        if (isSuccess) {
          toast.success(successMessage);
          setAuditLogs(prev => [{
            id: Date.now(),
            admin: 'Alex Rivera',
            initials: 'AR',
            action: logEntry.action,
            scope: logEntry.scope || 'Global/Public',
            date: getTimestamp(),
            status: 'SUCCESS'
          }, ...prev]);
          resolve();
        } else {
          toast.error(`API Failed: Unable to update ${actionKey.replace(/([A-Z])/g, ' $1').toLowerCase()}`);
          setAuditLogs(prev => [{
            id: Date.now(),
            admin: 'Alex Rivera',
            initials: 'AR',
            action: logEntry.action,
            scope: logEntry.scope || 'Global/Public',
            date: getTimestamp(),
            status: 'FAILED'
          }, ...prev]);
          reject(new Error('API Failure'));
        }
      }, 800);
    });
  };

  const handleVerificationLogicChange = async (e) => {
    const newValue = e.target.value;
    const prev = verificationLogic;
    setVerificationLogic(newValue); 

    try {
      await mockApiCall('verificationLogic', `Verification Logic updated to ${newValue}`, {
        action: `Changed Verification Logic to '${newValue}'`,
        scope: 'System Settings'
      });
    } catch (err) {
      setVerificationLogic(prev); 
    }
  };

  const handleRetrialPeriodSave = async () => {
    const val = parseInt(retrialPeriod, 10);
    if (isNaN(val) || val <= 0) {
      toast.error('Retrial period must be greater than 0');
      setRetrialPeriod("24");
      return;
    }

    try {
      await mockApiCall('retrialPeriod', `Retrial Period updated to ${val} Hours`, {
        action: `Updated Retrial Period to ${val} Hours`,
        scope: 'Compliance'
      });
    } catch (err) {
      // Rollback would happen here if we tracked previous saved state, 
      // but for simplicity we rely on the input's current visual state.
    }
  };

  const handleClaimsApprovalToggle = async (checked) => {
    const prev = claimsApproval;
    setClaimsApproval(checked);

    try {
      await mockApiCall('claimsApproval', `Standard Claims Approval ${checked ? 'Enabled' : 'Disabled'}`, {
        action: `Toggled Standard Claims Approval to ${checked ? 'ON' : 'OFF'}`,
        scope: 'Financials'
      });
    } catch (err) {
      setClaimsApproval(prev);
    }
  };

  const handleRefundLimitSave = async () => {
    const val = parseInt(refundLimit, 10);
    if (isNaN(val) || val < 0) {
      toast.error('Refund limit cannot be negative');
      setRefundLimit("250");
      return;
    }

    try {
      await mockApiCall('refundLimit', `Refund Limit updated to $${val}`, {
        action: `Updated Refund Limit (Unverified) to $${val}`,
        scope: 'Financials'
      });
    } catch (err) {
      // Error handled by mock API
    }
  };

  const handleResetDefaults = async () => {
    if (!window.confirm("Are you sure you want to reset all platform configurations to their factory defaults? This action cannot be fully undone.")) return;

    setIsResetting(true);
    
    const stateSnapshot = {
      verificationLogic, retrialPeriod, claimsApproval, refundLimit
    };

    setVerificationLogic("Automated API Only");
    setRetrialPeriod("24");
    setClaimsApproval(false);
    setRefundLimit("250");
    setLevel1Checked(true);
    setLevel2Checked(true);

    try {
      await mockApiCall('reset', 'Successfully reset to factory defaults', {
        action: 'Reset to Factory Defaults',
        scope: 'Global System'
      });
      setIsResetting(false);
    } catch (err) {
      setVerificationLogic(stateSnapshot.verificationLogic);
      setRetrialPeriod(stateSnapshot.retrialPeriod);
      setClaimsApproval(stateSnapshot.claimsApproval);
      setRefundLimit(stateSnapshot.refundLimit);
      setIsResetting(false);
    }
  };

  // Pagination for modal
  const totalPages = Math.ceil(auditLogs.length / LOGS_PER_PAGE);
  const currentLogs = auditLogs.slice((auditPage - 1) * LOGS_PER_PAGE, auditPage * LOGS_PER_PAGE);

  return (
    <AdminShell
      activeTab="Settings"
      customProfileName="Alex Rivera"
      customProfileRole="Admin User"
      showGridIcon={true}
    >
      <div className="platform-config-page relative" style={{ padding: '32px 40px 60px' }}>
        
        {/* Header */}
        <div style={{ marginBottom: '32px' }}>
          <h1 style={{ fontSize: '28px', fontWeight: '800', color: 'var(--text)', margin: '0 0 8px' }}>
            Platform Configuration
          </h1>
          <p style={{ fontSize: '14px', color: 'var(--muted)', margin: 0 }}>
            Manage global architectural triggers and compliance protocols for the entire enterprise ecosystem.
          </p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-section)' }}>
          
          {/* Top Row: Maintenance & Registration */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: 'var(--spacing-section)' }}>
            
            {/* Maintenance Mode */}
            <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: '8px', padding: 'var(--spacing-section)', display: 'flex', flexDirection: 'column' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '24px' }}>
                <div>
                  <h2 style={{ fontSize: '16px', fontWeight: '800', color: 'var(--text)', margin: '0 0 4px' }}>Maintenance Mode</h2>
                  <p style={{ fontSize: '13px', color: 'var(--muted)', margin: 0 }}>Disable all public-facing services for scheduled maintenance.</p>
                </div>
                <Toggle defaultChecked={false} />
              </div>

              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', fontSize: '11px', fontWeight: '800', color: 'var(--text)', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '8px' }}>Custom Downtime Message</label>
                <textarea 
                  defaultValue="The system is currently undergoing scheduled maintenance. Please check back in 2 hours."
                  style={{ width: '100%', minHeight: '80px', padding: '12px', border: '1px solid #e2e8f0', borderRadius: '6px', fontSize: '13px', color: 'var(--muted)', outline: 'none', resize: 'vertical' }}
                />
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#dc2626', fontSize: '13px', fontWeight: '600' }}>
                <AlertTriangle size={16} />
                <span>Activating this will disconnect all active sessions immediately.</span>
              </div>
            </div>

            {/* User Registration */}
            <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: '8px', padding: 'var(--spacing-section)' }}>
              <h2 style={{ fontSize: '16px', fontWeight: '800', color: 'var(--text)', margin: '0 0 24px' }}>User Registration</h2>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '13px', fontWeight: '600', color: 'var(--text)' }}>Allow New Sign-ups</span>
                  <Toggle defaultChecked={true} />
                </div>
                
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '13px', fontWeight: '600', color: 'var(--text)' }}>Email Domain Whitelist</span>
                  <Toggle defaultChecked={false} />
                </div>

                <div style={{ borderTop: '1px solid #e2e8f0', margin: '8px 0 0', paddingTop: '20px' }}>
                  <label style={{ display: 'block', fontSize: '11px', fontWeight: '800', color: 'var(--text)', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '8px' }}>Maximum Concurrent Sessions</label>
                  <input 
                    type="number" 
                    defaultValue="3"
                    style={{ width: '100%', height: '40px', padding: '0 12px', border: '1px solid #e2e8f0', borderRadius: '6px', fontSize: '13px', color: 'var(--text)', outline: 'none' }}
                  />
                </div>
              </div>
            </div>

          </div>

          {/* Middle Row: KYC & Thresholds */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: 'var(--spacing-section)' }}>
            
            {/* KYC & Compliance */}
            <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: '8px', padding: 'var(--spacing-section)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '24px' }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'var(--text)' }}>
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                  <polyline points="9 12 11 14 15 10"></polyline>
                </svg>
                <h2 style={{ fontSize: '16px', fontWeight: '800', color: 'var(--text)', margin: 0 }}>KYC & Compliance</h2>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--spacing-section)' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <label style={{ fontSize: '11px', fontWeight: '800', color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Level 1: Basic</label>
                  <div style={{ position: 'relative' }}>
                    <Select
                      defaultValue="Self-Declaration"
                      style={{ width: '100%', height: '40px', padding: '0 36px 0 12px', border: '1px solid #e2e8f0', borderRadius: '6px', fontSize: '13px', color: 'var(--text)', outline: 'none', appearance: 'none', backgroundColor: '#f8fafc', cursor: 'pointer', opacity: level1Checked ? 1 : 0.6 }}
                      options={[{
                        label: "Self-Declaration",
                        value: "Self-Declaration"
                      }, {
                        label: "Document Upload",
                        value: "Document Upload"
                      }, {
                        label: "Manual Review",
                        value: "Manual Review"
                      }]} />
                    <div 
                      onClick={() => {
                        setLevel1Checked(!level1Checked);
                      }}
                      style={{ position: 'absolute', right: '12px', top: '12px', width: '14px', height: '14px', background: level1Checked ? '#0f172a' : '#fff', border: level1Checked ? 'none' : '1px solid #cbd5e1', borderRadius: '3px', display: 'flex', justifyContent: 'center', alignItems: 'center', cursor: 'pointer', zIndex: 10 }}
                    >
                      {level1Checked && <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>}
                    </div>
                  </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <label style={{ fontSize: '11px', fontWeight: '800', color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.5px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    Verification Logic
                    {loadingStates.verificationLogic && <Loader2 size={12} className="animate-spin text-indigo-600" />}
                  </label>
                  <Select
                    value={verificationLogic}
                    onChange={handleVerificationLogicChange}
                    style={{ width: '100%', height: '40px', padding: '0 12px', border: '1px solid #e2e8f0', borderRadius: '6px', fontSize: '13px', color: 'var(--text)', outline: 'none', backgroundColor: '#f8fafc', opacity: loadingStates.verificationLogic ? 0.6 : 1 }}
                    options={[{
                      label: "Automated API Only",
                      value: "Automated API Only"
                    }, {
                      label: "Hybrid (API + Manual)",
                      value: "Hybrid (API + Manual)"
                    }, {
                      label: "Strict Manual Review",
                      value: "Strict Manual Review"
                    }]} />
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <label style={{ fontSize: '11px', fontWeight: '800', color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Level 2: Advanced</label>
                  <div style={{ position: 'relative' }}>
                    <Select
                      defaultValue="Biometric ID Scan"
                      style={{ width: '100%', height: '40px', padding: '0 36px 0 12px', border: '1px solid #e2e8f0', borderRadius: '6px', fontSize: '13px', color: 'var(--text)', outline: 'none', appearance: 'none', backgroundColor: '#f8fafc', cursor: 'pointer', opacity: level2Checked ? 1 : 0.6 }}
                      options={[{
                        label: "Biometric ID Scan",
                        value: "Biometric ID Scan"
                      }, {
                        label: "Video KYC",
                        value: "Video KYC"
                      }, {
                        label: "In-Person Verification",
                        value: "In-Person Verification"
                      }]} />
                    <div 
                      onClick={() => {
                        setLevel2Checked(!level2Checked);
                      }}
                      style={{ position: 'absolute', right: '12px', top: '12px', width: '14px', height: '14px', background: level2Checked ? '#0f172a' : '#fff', border: level2Checked ? 'none' : '1px solid #cbd5e1', borderRadius: '3px', display: 'flex', justifyContent: 'center', alignItems: 'center', cursor: 'pointer', zIndex: 10 }}
                    >
                      {level2Checked && <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>}
                    </div>
                  </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <label style={{ fontSize: '11px', fontWeight: '800', color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.5px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    Retrial Period
                    {loadingStates.retrialPeriod && <Loader2 size={12} className="animate-spin text-indigo-600" />}
                  </label>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <input 
                      type="number" 
                      value={retrialPeriod}
                      onChange={(e) => setRetrialPeriod(e.target.value)}
                      onBlur={handleRetrialPeriodSave}
                      onKeyDown={(e) => e.key === 'Enter' && e.target.blur()}
                      disabled={loadingStates.retrialPeriod}
                      style={{ width: '80px', height: '40px', padding: '0 12px', border: '1px solid #e2e8f0', borderRadius: '6px', fontSize: '13px', color: 'var(--text)', outline: 'none', opacity: loadingStates.retrialPeriod ? 0.6 : 1 }}
                    />
                    <span style={{ fontSize: '13px', color: 'var(--muted)', fontWeight: '600' }}>Hours</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Auto-Approval Thresholds */}
            <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: '8px', padding: 'var(--spacing-section)', display: 'flex', flexDirection: 'column' }}>
              <h2 style={{ fontSize: '16px', fontWeight: '800', color: 'var(--text)', margin: '0 0 24px' }}>Auto-Approval Thresholds</h2>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', flex: 1 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '13px', fontWeight: '600', color: 'var(--text)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    Standard Claims Approval
                    {loadingStates.claimsApproval && <Loader2 size={12} className="animate-spin text-indigo-600" />}
                  </span>
                  <Toggle 
                    checked={claimsApproval} 
                    onChange={handleClaimsApprovalToggle} 
                    disabled={loadingStates.claimsApproval}
                  />
                </div>
                
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '16px', borderBottom: '1px solid #e2e8f0' }}>
                  <span style={{ fontSize: '13px', fontWeight: '600', color: 'var(--text)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    Refund Limit (Unverified)
                    {loadingStates.refundLimit && <Loader2 size={12} className="animate-spin text-indigo-600" />}
                  </span>
                  <div style={{ position: 'relative' }}>
                    <span style={{ position: 'absolute', left: '10px', top: '9px', fontSize: '13px', color: 'var(--muted)', fontWeight: '600' }}>$</span>
                    <input 
                      type="number"
                      value={refundLimit}
                      onChange={(e) => setRefundLimit(e.target.value)}
                      onBlur={handleRefundLimitSave}
                      onKeyDown={(e) => e.key === 'Enter' && e.target.blur()}
                      disabled={loadingStates.refundLimit}
                      style={{ width: '90px', height: '36px', padding: '0 8px 0 22px', border: '1px solid #e2e8f0', borderRadius: '4px', fontSize: '13px', fontWeight: '700', color: 'var(--text)', outline: 'none', opacity: loadingStates.refundLimit ? 0.6 : 1 }}
                    />
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '12px', marginTop: '20px' }}>
                <button 
                  type="button" 
                  disabled={isResetting}
                  style={{ flex: 1, padding: '0 12px', height: '36px', background: '#fff', border: '1px solid #e2e8f0', borderRadius: '4px', fontSize: '12px', fontWeight: '700', color: 'var(--text)', cursor: isResetting ? 'not-allowed' : 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }} 
                  onClick={handleResetDefaults}
                >
                  {isResetting ? <Loader2 size={14} className="animate-spin" /> : null}
                  Reset to Factory Defaults
                </button>
              </div>
            </div>

          </div>

          {/* Bottom Table: Recent Configuration Changes */}
          <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: '8px', overflow: 'hidden' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px 24px', borderBottom: '1px solid #e2e8f0' }}>
              <h2 style={{ fontSize: '16px', fontWeight: '800', color: 'var(--text)', margin: 0 }}>Recent Configuration Changes</h2>
              <button 
                onClick={(e) => { e.preventDefault(); setIsAuditModalOpen(true); }}
                style={{ fontSize: '12px', fontWeight: '700', color: 'var(--text)', textDecoration: 'underline', textUnderlineOffset: '2px', background: 'none', border: 'none', cursor: 'pointer' }}
              >
                View Full Audit Log
              </button>
            </div>
            
            <div style={{ overflowY: 'auto', maxHeight: '400px' }}>
              <div className="table-responsive-wrapper">
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                  <thead>
                    <tr style={{ background: '#f8fafc', borderBottom: '1px solid #e2e8f0' }}>
                      <th style={{ padding: '12px 24px', fontSize: '11px', fontWeight: '800', color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Administrator</th>
                      <th style={{ padding: '12px 24px', fontSize: '11px', fontWeight: '800', color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Action</th>
                      <th style={{ padding: '12px 24px', fontSize: '11px', fontWeight: '800', color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Scope</th>
                      <th style={{ padding: '12px 24px', fontSize: '11px', fontWeight: '800', color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Date</th>
                      <th style={{ padding: '12px 24px', fontSize: '11px', fontWeight: '800', color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {auditLogs.slice(0, 5).map((log) => (
                      <tr key={log.id} style={{ borderBottom: '1px solid #e2e8f0' }} className="animate-in fade-in duration-300">
                        <td style={{ padding: '16px 24px' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                            <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: '#e0e7ff', color: '#4338ca', display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '11px', fontWeight: '800' }}>{log.initials}</div>
                            <span style={{ fontSize: '13px', fontWeight: '600', color: 'var(--text)' }}>{log.admin}</span>
                          </div>
                        </td>
                        <td style={{ padding: '16px 24px', fontSize: '13px', color: 'var(--text)' }}>{log.action}</td>
                        <td style={{ padding: '16px 24px', fontSize: '13px', color: 'var(--muted)' }}>{log.scope}</td>
                        <td style={{ padding: '16px 24px', fontSize: '13px', color: 'var(--muted)' }}>{log.date}</td>
                        <td style={{ padding: '16px 24px' }}>
                          <span style={{ 
                            padding: '4px 8px', 
                            background: log.status === 'SUCCESS' ? '#dcfce7' : '#fee2e2', 
                            color: log.status === 'SUCCESS' ? '#166534' : '#991b1b', 
                            border: `1px solid ${log.status === 'SUCCESS' ? '#bbf7d0' : '#fecaca'}`, 
                            borderRadius: '4px', fontSize: '11px', fontWeight: '800', letterSpacing: '0.5px' 
                          }}>
                            {log.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                    {auditLogs.length === 0 && (
                      <tr>
                        <td colSpan="5" style={{ padding: '32px', textAlign: 'center', fontSize: '13px', color: 'var(--muted)' }}>
                          No recent changes recorded.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Overlay for Full Audit Log */}
        {isAuditModalOpen && (
          <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(15, 23, 42, 0.4)', backdropFilter: 'blur(4px)', zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px' }}>
            <div className="animate-in zoom-in-95 duration-200" style={{ background: '#fff', borderRadius: '12px', width: '100%', maxWidth: '900px', maxHeight: '90vh', display: 'flex', flexDirection: 'column', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)' }}>
              
              <div style={{ padding: '20px 24px', borderBottom: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <h3 style={{ fontSize: '18px', fontWeight: '800', color: 'var(--text)', margin: '0 0 4px' }}>Platform Audit Log</h3>
                  <p style={{ fontSize: '13px', color: 'var(--muted)', margin: 0 }}>Comprehensive record of all configuration changes and system events.</p>
                </div>
                <button onClick={() => setIsAuditModalOpen(false)} style={{ background: '#f1f5f9', border: 'none', width: '32px', height: '32px', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: 'var(--muted)' }}>
                  <X size={18} />
                </button>
              </div>

              <div style={{ flex: 1, overflowY: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                  <thead style={{ position: 'sticky', top: 0, zIndex: 10 }}>
                    <tr style={{ background: '#f8fafc', borderBottom: '1px solid #e2e8f0' }}>
                      <th style={{ padding: '12px 24px', fontSize: '11px', fontWeight: '800', color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Administrator</th>
                      <th style={{ padding: '12px 24px', fontSize: '11px', fontWeight: '800', color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Action</th>
                      <th style={{ padding: '12px 24px', fontSize: '11px', fontWeight: '800', color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Scope</th>
                      <th style={{ padding: '12px 24px', fontSize: '11px', fontWeight: '800', color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Date</th>
                      <th style={{ padding: '12px 24px', fontSize: '11px', fontWeight: '800', color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentLogs.map((log) => (
                      <tr key={log.id} style={{ borderBottom: '1px solid #e2e8f0' }}>
                        <td style={{ padding: '16px 24px' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                            <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: '#e0e7ff', color: '#4338ca', display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '11px', fontWeight: '800' }}>{log.initials}</div>
                            <span style={{ fontSize: '13px', fontWeight: '600', color: 'var(--text)' }}>{log.admin}</span>
                          </div>
                        </td>
                        <td style={{ padding: '16px 24px', fontSize: '13px', color: 'var(--text)' }}>{log.action}</td>
                        <td style={{ padding: '16px 24px', fontSize: '13px', color: 'var(--muted)' }}>{log.scope}</td>
                        <td style={{ padding: '16px 24px', fontSize: '13px', color: 'var(--muted)' }}>{log.date}</td>
                        <td style={{ padding: '16px 24px' }}>
                          <span style={{ 
                            padding: '4px 8px', 
                            background: log.status === 'SUCCESS' ? '#dcfce7' : '#fee2e2', 
                            color: log.status === 'SUCCESS' ? '#166534' : '#991b1b', 
                            border: `1px solid ${log.status === 'SUCCESS' ? '#bbf7d0' : '#fecaca'}`, 
                            borderRadius: '4px', fontSize: '11px', fontWeight: '800', letterSpacing: '0.5px' 
                          }}>
                            {log.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div style={{ padding: '16px 24px', borderTop: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#f8fafc', borderBottomLeftRadius: '12px', borderBottomRightRadius: '12px' }}>
                <span style={{ fontSize: '13px', color: 'var(--muted)', fontWeight: '600' }}>
                  Showing {Math.min((auditPage - 1) * LOGS_PER_PAGE + 1, auditLogs.length)} to {Math.min(auditPage * LOGS_PER_PAGE, auditLogs.length)} of {auditLogs.length} entries
                </span>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <button 
                    onClick={() => setAuditPage(p => Math.max(1, p - 1))}
                    disabled={auditPage === 1}
                    style={{ padding: '6px 12px', background: '#fff', border: '1px solid #e2e8f0', borderRadius: '6px', fontSize: '13px', fontWeight: '600', color: 'var(--text)', cursor: auditPage === 1 ? 'not-allowed' : 'pointer', opacity: auditPage === 1 ? 0.5 : 1, display: 'flex', alignItems: 'center', gap: '4px' }}
                  >
                    <ChevronLeft size={16} /> Prev
                  </button>
                  <button 
                    onClick={() => setAuditPage(p => Math.min(totalPages, p + 1))}
                    disabled={auditPage === totalPages || totalPages === 0}
                    style={{ padding: '6px 12px', background: '#fff', border: '1px solid #e2e8f0', borderRadius: '6px', fontSize: '13px', fontWeight: '600', color: 'var(--text)', cursor: (auditPage === totalPages || totalPages === 0) ? 'not-allowed' : 'pointer', opacity: (auditPage === totalPages || totalPages === 0) ? 0.5 : 1, display: 'flex', alignItems: 'center', gap: '4px' }}
                  >
                    Next <ChevronRight size={16} />
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
