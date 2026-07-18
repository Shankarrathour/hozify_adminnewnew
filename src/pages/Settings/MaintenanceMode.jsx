import React, { useState } from 'react';
import { PenTool, AlertCircle, Loader2 } from 'lucide-react';
import AdminShell from '../../components/layouts/AdminShell';
import { useToast } from '../../components/common/ToastNotification';
import Toggle from '../../components/common/Toggle';

export default function MaintenanceMode() {
  const { addToast } = useToast();

  const [isMaintenanceMode, setIsMaintenanceMode] = useState(false);
  const [message, setMessage] = useState('');
  
  const [isSaving, setIsSaving] = useState(false);

  const handleDiscard = () => {
    setIsMaintenanceMode(false);
    setMessage('');
    addToast("Changes discarded.", "info");
  };

  const handleSave = () => {
    setIsSaving(true);
    addToast("Initiating 2FA confirmation...", "info");
    
    // Simulate 2FA confirmation and save process
    setTimeout(() => {
      setIsSaving(false);
      if (isMaintenanceMode) {
        addToast("System is now in Maintenance Mode.", "success");
      } else {
        addToast("System is live. Maintenance Mode disabled.", "success");
      }
    }, 2000);
  };

  return (
    <AdminShell
      activeTab="Settings"
      customProfileName="Alex Rivera"
      customProfileRole="Admin User"
      showGridIcon={true}
    >
      <div style={{ padding: '32px 40px 60px', maxWidth: '800px', margin: '0 auto' }}>
        
        {/* Header */}
        <div style={{ marginBottom: '32px', textAlign: 'center' }}>
          <h1 style={{ fontSize: '24px', fontWeight: '800', color: '#0f172a', margin: '0 0 8px' }}>
            Maintenance Mode
          </h1>
          <p style={{ fontSize: '13px', color: '#64748b', margin: 0 }}>
            Temporarily disable system access for scheduled updates and hotfixes.
          </p>
        </div>

        {/* Maintenance Card */}
        <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '40px', boxShadow: '0 4px 6px rgba(0,0,0,0.02)', transition: 'all 0.3s', borderColor: isMaintenanceMode ? '#fecaca' : '#e2e8f0' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '32px' }}>
            <div style={{ width: '48px', height: '48px', background: isMaintenanceMode ? '#fee2e2' : '#f1f5f9', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'background-color 0.3s' }}>
              <PenTool size={24} color={isMaintenanceMode ? '#ef4444' : '#475569'} style={{ transition: 'color 0.3s' }} />
            </div>
            <div>
              <h2 style={{ fontSize: '18px', fontWeight: '800', color: isMaintenanceMode ? '#ef4444' : '#0f172a', margin: '0 0 4px', transition: 'color 0.3s' }}>
                {isMaintenanceMode ? 'Maintenance Mode Active' : 'System Maintenance'}
              </h2>
              <p style={{ fontSize: '12px', color: '#64748b', margin: 0 }}>Control user access to the storefront and dashboard.</p>
            </div>
          </div>

          <div style={{ background: isMaintenanceMode ? '#fef2f2' : '#f8fafc', border: isMaintenanceMode ? '1px solid #fecaca' : '1px solid #e2e8f0', borderRadius: '12px', padding: 'var(--spacing-section)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px', transition: 'all 0.3s' }}>
            <div>
              <h4 style={{ fontSize: '14px', fontWeight: '800', color: '#0f172a', margin: '0 0 4px' }}>Current System Status</h4>
              <p style={{ fontSize: '12px', color: isMaintenanceMode ? '#dc2626' : '#16a34a', margin: 0, fontWeight: '600', transition: 'color 0.3s' }}>
                {isMaintenanceMode ? 'System is under maintenance (Offline)' : 'All systems operational (Live)'}
              </p>
            </div>
            <Toggle checked={isMaintenanceMode} onChange={(val) => setIsMaintenanceMode(val)} />
          </div>

          <div style={{ marginBottom: '32px' }}>
            <label style={{ display: 'block', fontSize: '11px', fontWeight: '800', color: '#0f172a', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '12px' }}>Public Announcement Message</label>
            <textarea 
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              disabled={!isMaintenanceMode}
              placeholder={isMaintenanceMode ? "e.g. System is undergoing scheduled maintenance. We'll be back at 04:00 UTC." : "Enable maintenance mode to set a message"}
              style={{ width: '100%', height: '120px', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '16px', fontSize: '14px', color: '#0f172a', boxSizing: 'border-box', outline: 'none', resize: 'vertical', lineHeight: '1.5', background: isMaintenanceMode ? '#fff' : '#f8fafc', cursor: isMaintenanceMode ? 'text' : 'not-allowed', opacity: isMaintenanceMode ? 1 : 0.6 }}
            />
            <p style={{ fontSize: '11px', color: '#64748b', margin: '8px 0 0' }}>This message will be displayed to all users attempting to access the platform during maintenance.</p>
          </div>

          <div className="animate-in fade-in slide-in-from-bottom-2" style={{ display: isMaintenanceMode ? 'flex' : 'none', alignItems: 'center', gap: '8px', color: '#dc2626', background: '#fef2f2', padding: '12px 16px', borderRadius: '8px', marginBottom: '24px', border: '1px solid #fecaca' }}>
            <AlertCircle size={16} />
            <span style={{ fontSize: '11px', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.5px' }}>REQUIRES ADMIN 2FA CONFIRMATION TO ACTIVATE</span>
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '16px' }}>
            <button 
              onClick={handleDiscard}
              disabled={isSaving}
              style={{ height: '44px', padding: '0 24px', background: '#fff', border: '1px solid #cbd5e1', borderRadius: '8px', fontSize: '13px', fontWeight: '700', color: '#475569', cursor: isSaving ? 'not-allowed' : 'pointer' }}
            >
              Discard Changes
            </button>
            <button 
              onClick={handleSave}
              disabled={isSaving}
              style={{ display: 'flex', alignItems: 'center', gap: '8px', height: '44px', padding: '0 32px', background: isMaintenanceMode ? '#dc2626' : '#312e81', border: 'none', borderRadius: '8px', fontSize: '13px', fontWeight: '700', color: '#fff', cursor: isSaving ? 'not-allowed' : 'pointer', opacity: isSaving ? 0.8 : 1, transition: 'background-color 0.3s' }}
            >
              {isSaving && <Loader2 size={14} className="animate-spin" />}
              {isSaving ? 'Verifying...' : 'Save Maintenance State'}
            </button>
          </div>
        </div>

      </div>
    </AdminShell>
  );
}
