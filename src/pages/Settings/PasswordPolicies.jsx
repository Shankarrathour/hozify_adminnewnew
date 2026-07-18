import React, { useState } from 'react';
import { 
  Shield, Lock, Clock, AlertTriangle, Loader2 
} from 'lucide-react';
import AdminShell from '../../components/layouts/AdminShell';
import { useToast } from '../../components/common/ToastNotification';
import Toggle from '../../components/common/Toggle';
import Select from "../../components/ui/Select";

const INITIAL_STATE = {
  minLength: 12,
  mixedCase: true,
  specialChars: true,
  numericValues: true,
  maxLoginAttempts: 5,
  lockoutDuration: '1 Hour',
  passwordLifetime: 90,
  historyRetention: 5,
  preventIdenticalMatch: true
};

export default function PasswordPolicies() {
  const { addToast } = useToast();
  
  const [formData, setFormData] = useState(INITIAL_STATE);
  const [isDeploying, setIsDeploying] = useState(false);

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleRestoreDefaults = () => {
    setFormData(INITIAL_STATE);
    addToast("Restored to default enterprise policies.", "info");
  };

  const handleCancel = () => {
    setFormData(INITIAL_STATE);
    addToast("Changes cancelled.", "info");
  };

  const handleDeploy = () => {
    setIsDeploying(true);
    setTimeout(() => {
      setIsDeploying(false);
      addToast("Password policy successfully deployed to all 1,240 accounts.", "success");
    }, 1200);
  };

  return (
    <AdminShell
      activeTab="Settings"
      customProfileName="Alex Rivera"
      customProfileRole="Admin User"
      showGridIcon={true}
    >
      <div style={{ padding: '32px 40px 60px', maxWidth: '1100px' }}>
        
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: 'var(--spacing-section)', marginBottom: '24px' }}>
          
          {/* Left Column */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-section)' }}>
            
            {/* Global Password Standards */}
            <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: '12px', padding: 'var(--spacing-page)' }}>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: '#64748b', fontSize: '10px', fontWeight: '800', letterSpacing: '0.5px', textTransform: 'uppercase', marginBottom: '16px' }}>
                <Shield size={14} /> ENTERPRISE SECURITY
              </div>
              <h1 style={{ fontSize: '24px', fontWeight: '800', color: '#0f172a', margin: '0 0 12px' }}>
                Global Password Standards
              </h1>
              <p style={{ fontSize: '13px', color: 'var(--muted)', margin: '0 0 32px', lineHeight: '1.6' }}>
                Enforce security protocols across all administrative accounts. Changes made here will affect 1,240 active directory profiles and take effect upon next login.
              </p>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
                <div style={{ border: '1px solid #e2e8f0', borderRadius: '8px', padding: '16px', background: '#f8fafc' }}>
                  <span style={{ display: 'block', fontSize: '10px', color: 'var(--muted)', fontWeight: '700', marginBottom: '8px' }}>Last Update</span>
                  <span style={{ fontSize: '14px', fontWeight: '800', color: '#0f172a' }}>Oct 12, 2023</span>
                </div>
                <div style={{ border: '1px solid #e2e8f0', borderRadius: '8px', padding: '16px', background: '#f8fafc' }}>
                  <span style={{ display: 'block', fontSize: '10px', color: 'var(--muted)', fontWeight: '700', marginBottom: '8px' }}>Policy Health</span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#1e1b4b' }}></span>
                    <span style={{ fontSize: '14px', fontWeight: '800', color: '#0f172a' }}>Robust</span>
                  </div>
                </div>
                <div style={{ border: '1px solid #e2e8f0', borderRadius: '8px', padding: '16px', background: '#f8fafc' }}>
                  <span style={{ display: 'block', fontSize: '10px', color: 'var(--muted)', fontWeight: '700', marginBottom: '8px' }}>Compliance</span>
                  <span style={{ fontSize: '14px', fontWeight: '800', color: '#0f172a' }}>SOC2 / HIPAA</span>
                </div>
              </div>
            </div>

            {/* Complexity Requirements */}
            <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: '12px', padding: 'var(--spacing-page)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                <h2 style={{ fontSize: '16px', fontWeight: '800', color: '#0f172a', margin: 0 }}>Complexity Requirements</h2>
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: '#f8fafc', border: '1px solid #e2e8f0', padding: '4px 8px', borderRadius: '12px', fontSize: '9px', fontWeight: '800', letterSpacing: '0.5px', color: '#475569' }}>
                  <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#475569' }}></span> REAL-TIME VALIDATION
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                
                {/* Minimum Length */}
                <div style={{ border: '1px solid #e2e8f0', borderRadius: '8px', padding: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <h4 style={{ fontSize: '13px', fontWeight: '800', color: '#0f172a', margin: '0 0 4px' }}>Minimum Length</h4>
                    <p style={{ fontSize: '11px', color: 'var(--muted)', margin: 0 }}>Must be at least {formData.minLength}<br/>characters</p>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <button type="button" onClick={() => handleChange('minLength', Math.max(8, formData.minLength - 1))} style={{ width: '28px', height: '28px', borderRadius: '4px', border: '1px solid #cbd5e1', background: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>-</button>
                    <div style={{ background: '#f8fafc', padding: '8px 12px', borderRadius: '6px', fontSize: '14px', fontWeight: '800', color: '#0f172a', minWidth: '40px', textAlign: 'center' }}>
                      {formData.minLength}
                    </div>
                    <button type="button" onClick={() => handleChange('minLength', Math.min(32, formData.minLength + 1))} style={{ width: '28px', height: '28px', borderRadius: '4px', border: '1px solid #cbd5e1', background: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>+</button>
                  </div>
                </div>

                {/* Mixed Case */}
                <div style={{ border: '1px solid #e2e8f0', borderRadius: '8px', padding: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <h4 style={{ fontSize: '13px', fontWeight: '800', color: '#0f172a', margin: '0 0 4px' }}>Mixed Case</h4>
                    <p style={{ fontSize: '11px', color: 'var(--muted)', margin: 0 }}>Require uppercase &<br/>lowercase</p>
                  </div>
                  <Toggle checked={formData.mixedCase} onChange={(val) => handleChange('mixedCase', val)} />
                </div>

                {/* Special Characters */}
                <div style={{ border: '1px solid #e2e8f0', borderRadius: '8px', padding: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <h4 style={{ fontSize: '13px', fontWeight: '800', color: '#0f172a', margin: '0 0 4px' }}>Special Characters</h4>
                    <p style={{ fontSize: '11px', color: 'var(--muted)', margin: 0 }}>Require symbols (!, @, #, $,<br/>etc.)</p>
                  </div>
                  <Toggle checked={formData.specialChars} onChange={(val) => handleChange('specialChars', val)} />
                </div>

                {/* Numeric Values */}
                <div style={{ border: '1px solid #e2e8f0', borderRadius: '8px', padding: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <h4 style={{ fontSize: '13px', fontWeight: '800', color: '#0f172a', margin: '0 0 4px' }}>Numeric Values</h4>
                    <p style={{ fontSize: '11px', color: 'var(--muted)', margin: 0 }}>Require at least one number</p>
                  </div>
                  <Toggle checked={formData.numericValues} onChange={(val) => handleChange('numericValues', val)} />
                </div>

              </div>
            </div>

          </div>

          {/* Right Column: Rules & Expiration */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-section)' }}>
            
            {/* Lockout Rules */}
            <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: '12px', padding: 'var(--spacing-page)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                <h2 style={{ fontSize: '16px', fontWeight: '800', color: '#0f172a', margin: 0 }}>Lockout Rules</h2>
                <Lock size={16} color="#475569" />
              </div>

              <div style={{ marginBottom: '24px' }}>
                <label style={{ display: 'block', fontSize: '10px', fontWeight: '800', color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '8px' }}>MAX LOGIN ATTEMPTS</label>
                <div style={{ borderBottom: '2px solid #e2e8f0', paddingBottom: '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                   <div style={{ display: 'flex', gap: '12px' }}>
                      {[3, 5, 10].map(val => (
                        <button 
                          key={val}
                          onClick={() => handleChange('maxLoginAttempts', val)}
                          style={{ background: 'none', border: 'none', padding: '4px 8px', borderRadius: '4px', fontSize: '13px', fontWeight: '700', color: formData.maxLoginAttempts === val ? '#0f172a' : '#94a3b8', backgroundColor: formData.maxLoginAttempts === val ? '#f1f5f9' : 'transparent', cursor: 'pointer' }}
                        >
                          {val}
                        </button>
                      ))}
                   </div>
                   <span style={{ fontSize: '14px', fontWeight: '800', color: '#0f172a' }}>{formData.maxLoginAttempts}</span>
                </div>
              </div>

              <div style={{ marginBottom: '24px' }}>
                <label style={{ display: 'block', fontSize: '10px', fontWeight: '800', color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '8px' }}>LOCKOUT DURATION</label>
                <Select
                  value={formData.lockoutDuration}
                  onChange={(e) => handleChange('lockoutDuration', e.target.value)}
                  style={{ width: '100%', height: '40px', border: '1px solid #e2e8f0', borderRadius: '6px', padding: '0 12px', fontSize: '13px', color: 'var(--text)', outline: 'none', background: '#fff', cursor: 'pointer' }}
                  options={[
                    { label: "15 Minutes", value: "15 Minutes" }, 
                    { label: "1 Hour", value: "1 Hour" }, 
                    { label: "2 Hours", value: "2 Hours" }, 
                    { label: "24 Hours", value: "24 Hours" }
                  ]} 
                />
              </div>

              <p style={{ fontSize: '11px', color: 'var(--muted)', margin: 0, lineHeight: '1.5' }}>
                *Prevents brute-force attacks on identity endpoints.
              </p>
            </div>

            {/* Expiration Cycles */}
            <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: '12px', padding: 'var(--spacing-page)' }}>
              <h2 style={{ fontSize: '16px', fontWeight: '800', color: '#0f172a', margin: '0 0 24px' }}>Expiration Cycles</h2>
              
              <div style={{ background: '#f8fafc', borderRadius: '8px', padding: '32px 24px', display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '24px', border: '1px solid #e2e8f0' }}>
                <span style={{ fontSize: '10px', fontWeight: '800', color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '12px' }}>PASSWORD LIFETIME</span>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px' }}>
                  <span className="animate-in fade-in" style={{ fontSize: '48px', fontWeight: '800', color: '#0f172a', lineHeight: '1', letterSpacing: '-1px' }}>{formData.passwordLifetime}</span>
                  <span style={{ fontSize: '12px', fontWeight: '700', color: '#0f172a' }}>DAYS</span>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '8px', marginBottom: '24px' }}>
                {[30, 90, 180].map(days => (
                  <button 
                    key={days}
                    onClick={() => handleChange('passwordLifetime', days)}
                    style={{ 
                      flex: 1, height: '36px', 
                      background: formData.passwordLifetime === days ? '#f8fafc' : '#fff', 
                      border: formData.passwordLifetime === days ? '1px solid #0f172a' : '1px solid #e2e8f0', 
                      borderRadius: '6px', fontSize: '12px', 
                      fontWeight: formData.passwordLifetime === days ? '800' : '600', 
                      color: formData.passwordLifetime === days ? '#0f172a' : 'var(--text)', 
                      cursor: 'pointer' 
                    }}
                  >
                    {days}d
                  </button>
                ))}
              </div>

              <div style={{ background: '#fff', border: '1px solid #fecaca', borderRadius: '8px', padding: '16px', display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                <AlertTriangle size={18} color="#ef4444" style={{ flexShrink: 0 }} />
                <p style={{ fontSize: '11px', color: '#ef4444', margin: 0, lineHeight: '1.5', fontWeight: '600' }}>
                  Frequent rotations are recommended by NIST for sensitive admin roles.
                </p>
              </div>
            </div>

          </div>
        </div>

        {/* Bottom Card: History Retention */}
        <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '24px 32px', marginBottom: '32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{ width: '40px', height: '40px', background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Clock size={20} color="#0f172a" />
            </div>
            <div>
              <h3 style={{ fontSize: '14px', fontWeight: '800', color: '#0f172a', margin: '0 0 4px' }}>History Retention</h3>
              <p style={{ fontSize: '12px', color: 'var(--muted)', margin: 0 }}>Number of previous passwords users are restricted from reusing.</p>
            </div>
          </div>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '48px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', border: '1px solid #e2e8f0', borderRadius: '6px', padding: '6px 12px' }}>
              <button 
                type="button" 
                onClick={() => handleChange('historyRetention', Math.max(0, formData.historyRetention - 1))} 
                style={{ background: 'none', border: 'none', padding: '0 8px', color: 'var(--muted)', cursor: 'pointer', fontWeight: '700', fontSize: '16px' }}
              >
                -
              </button>
              <span style={{ fontSize: '16px', fontWeight: '800', color: '#0f172a', minWidth: '24px', textAlign: 'center' }}>
                {formData.historyRetention}
              </span>
              <button 
                type="button" 
                onClick={() => handleChange('historyRetention', Math.min(24, formData.historyRetention + 1))} 
                style={{ background: 'none', border: 'none', padding: '0 8px', color: 'var(--muted)', cursor: 'pointer', fontWeight: '700', fontSize: '16px' }}
              >
                +
              </button>
            </div>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', borderLeft: '1px solid #e2e8f0', paddingLeft: '48px' }}>
              <span style={{ fontSize: '12px', fontWeight: '600', color: 'var(--text)', maxWidth: '120px' }}>Prevent identical match check</span>
              <Toggle checked={formData.preventIdenticalMatch} onChange={(val) => handleChange('preventIdenticalMatch', val)} />
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div style={{ borderTop: '1px solid #e2e8f0', paddingTop: '24px', display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: '16px' }}>
          <button 
            onClick={handleRestoreDefaults}
            disabled={isDeploying}
            style={{ background: 'none', border: 'none', fontSize: '12px', fontWeight: '700', color: 'var(--muted)', cursor: isDeploying ? 'not-allowed' : 'pointer', marginRight: '8px' }}
          >
            Restore Defaults
          </button>
          <button 
            onClick={handleCancel}
            disabled={isDeploying}
            style={{ height: '36px', padding: '0 24px', background: '#fff', border: '1px solid #e2e8f0', borderRadius: '6px', fontSize: '12px', fontWeight: '700', color: 'var(--text)', cursor: isDeploying ? 'not-allowed' : 'pointer' }}
          >
            Cancel changes
          </button>
          <button 
            onClick={handleDeploy}
            disabled={isDeploying}
            style={{ height: '36px', padding: '0 24px', background: '#0f172a', border: 'none', borderRadius: '6px', fontSize: '12px', fontWeight: '700', color: '#fff', cursor: isDeploying ? 'not-allowed' : 'pointer', display: 'flex', alignItems: 'center', gap: '8px', opacity: isDeploying ? 0.8 : 1 }}
          >
            {isDeploying && <Loader2 size={14} className="animate-spin" />}
            Deploy Updated Policy
          </button>
        </div>

      </div>
    </AdminShell>
  );
}
