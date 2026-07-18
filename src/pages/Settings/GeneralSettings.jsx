import React, { useState } from 'react';
import { Info, Palette, Loader2 } from 'lucide-react';
import AdminShell from '../../components/layouts/AdminShell';
import { useToast } from '../../components/common/ToastNotification';

import Select from "../../components/ui/Select";

const INITIAL_STATE = {
  orgName: "Hozify Enterprise Solutions",
  legalId: "HE-992-001-X",
  supportEmail: "enterprise-support@hozify.com",
  timezone: "(UTC-05:00) Eastern Time (US & Canada)",
  language: "English (United States)"
};

export default function GeneralSettings() {
  const { addToast } = useToast();
  
  const [formData, setFormData] = useState(INITIAL_STATE);
  const [isSaving, setIsSaving] = useState(false);

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleDiscard = () => {
    setFormData(INITIAL_STATE);
    addToast("Changes discarded and restored to original state.", "info");
  };

  const handleSave = () => {
    setIsSaving(true);
    // Simulate API delay
    setTimeout(() => {
      setIsSaving(false);
      addToast("Configuration saved successfully!", "success");
    }, 800);
  };

  return (
    <AdminShell
      activeTab="Settings"
      customProfileName="Alex Rivera"
      customProfileRole="Admin User"
      showGridIcon={true}
    >
      <div className="general-settings-page" style={{ padding: '32px 40px 60px' }}>
        
        {/* Header */}
        <div style={{ marginBottom: '32px' }}>
          <h1 style={{ fontSize: '28px', fontWeight: '800', color: 'var(--text)', margin: '0 0 8px' }}>
            General Settings
          </h1>
          <p style={{ fontSize: '14px', color: 'var(--muted)', margin: 0 }}>
            Manage your organization's core configuration, branding, and localization preferences.
          </p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-section)' }}>
          
          {/* Basic Info Card */}
          <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: '8px', padding: 'var(--spacing-section)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px' }}>
              <div>
                <h2 style={{ fontSize: '16px', fontWeight: '800', color: 'var(--text)', margin: '0 0 4px' }}>Basic Info</h2>
                <p style={{ fontSize: '13px', color: 'var(--muted)', margin: 0 }}>Control the public-facing identity of your enterprise workspace.</p>
              </div>
              <Info size={20} style={{ color: '#94a3b8' }} />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <label style={{ fontSize: '11px', fontWeight: '800', color: 'var(--text)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Organization Name</label>
                <input 
                  type="text" 
                  value={formData.orgName}
                  onChange={(e) => handleChange('orgName', e.target.value)}
                  style={{ width: '100%', height: '40px', padding: '0 12px', border: '1px solid #e2e8f0', borderRadius: '6px', fontSize: '13px', color: 'var(--text)', outline: 'none' }}
                />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <label style={{ fontSize: '11px', fontWeight: '800', color: 'var(--text)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Legal Entity ID</label>
                <input 
                  type="text" 
                  value={formData.legalId}
                  onChange={(e) => handleChange('legalId', e.target.value)}
                  style={{ width: '100%', height: '40px', padding: '0 12px', border: '1px solid #e2e8f0', borderRadius: '6px', fontSize: '13px', color: 'var(--text)', outline: 'none' }}
                />
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <label style={{ fontSize: '11px', fontWeight: '800', color: 'var(--text)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Support Email Address</label>
              <input 
                type="email" 
                value={formData.supportEmail}
                onChange={(e) => handleChange('supportEmail', e.target.value)}
                style={{ width: '100%', height: '40px', padding: '0 12px', border: '1px solid #e2e8f0', borderRadius: '6px', fontSize: '13px', color: 'var(--text)', outline: 'none' }}
              />
            </div>
          </div>

          {/* Branding Card */}
          <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: '8px', padding: 'var(--spacing-section)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px' }}>
              <div>
                <h2 style={{ fontSize: '16px', fontWeight: '800', color: 'var(--text)', margin: '0 0 4px' }}>Branding</h2>
                <p style={{ fontSize: '13px', color: 'var(--muted)', margin: 0 }}>Customize visual elements to match your corporate identity.</p>
              </div>
              <Palette size={20} style={{ color: '#94a3b8' }} />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 'var(--spacing-section)' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <label style={{ fontSize: '11px', fontWeight: '800', color: 'var(--text)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Primary Logo</label>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <div style={{ width: '72px', height: '72px', background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '6px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <div style={{ width: '48px', height: '48px', background: '#070235', borderRadius: '4px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                      <span style={{ color: '#fff', fontSize: '12px', fontWeight: '700' }}>LOGO</span>
                    </div>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <button onClick={(e) => { e.preventDefault(); addToast("Opening file uploader...", "info"); }} type="button" style={{ padding: '6px 12px', background: '#fff', border: '1px solid #e2e8f0', borderRadius: '4px', fontSize: '12px', fontWeight: '700', color: 'var(--text)', cursor: 'pointer' }}>Upload New</button>
                    <button onClick={(e) => { e.preventDefault(); addToast("Logo removed.", "success"); }} type="button" style={{ padding: '0', background: 'none', border: 'none', fontSize: '12px', fontWeight: '700', color: '#ef4444', cursor: 'pointer', textAlign: 'left' }}>Remove</button>
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <label style={{ fontSize: '11px', fontWeight: '800', color: 'var(--text)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Primary Brand Color</label>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{ width: '40px', height: '40px', background: '#070235', borderRadius: '4px' }}></div>
                  <div style={{ flex: 1 }}>
                    <strong style={{ display: 'block', fontSize: '13px', color: 'var(--text)', margin: '0 0 2px' }}>#070235</strong>
                    <span style={{ display: 'block', fontSize: '12px', color: 'var(--muted)' }}>Midnight Navy</span>
                  </div>
                  <button onClick={(e) => { e.preventDefault(); addToast("Opening color picker...", "info"); }} type="button" style={{ padding: '6px 12px', background: '#fff', border: '1px solid #e2e8f0', borderRadius: '4px', fontSize: '12px', fontWeight: '700', color: 'var(--text)', cursor: 'pointer' }}>Edit</button>
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <label style={{ fontSize: '11px', fontWeight: '800', color: 'var(--text)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Accent Color</label>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{ width: '40px', height: '40px', background: '#F8FAFC', border: '1px solid #e2e8f0', borderRadius: '4px' }}></div>
                  <div style={{ flex: 1 }}>
                    <strong style={{ display: 'block', fontSize: '13px', color: 'var(--text)', margin: '0 0 2px' }}>#F8FAFC</strong>
                    <span style={{ display: 'block', fontSize: '12px', color: 'var(--muted)' }}>Ghost White</span>
                  </div>
                  <button onClick={(e) => { e.preventDefault(); addToast("Opening color picker...", "info"); }} type="button" style={{ padding: '6px 12px', background: '#fff', border: '1px solid #e2e8f0', borderRadius: '4px', fontSize: '12px', fontWeight: '700', color: 'var(--text)', cursor: 'pointer' }}>Edit</button>
                </div>
              </div>
            </div>
          </div>

          {/* Localization & Profile Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--spacing-section)' }}>
            
            {/* Localization */}
            <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: '8px', padding: 'var(--spacing-section)' }}>
              <div style={{ marginBottom: '20px' }}>
                <h2 style={{ fontSize: '16px', fontWeight: '800', color: 'var(--text)', margin: '0 0 4px' }}>Localization</h2>
                <p style={{ fontSize: '13px', color: 'var(--muted)', margin: 0 }}>Regional formats and time standards.</p>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <label style={{ fontSize: '11px', fontWeight: '800', color: 'var(--text)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Timezone</label>
                  <Select
                    value={formData.timezone}
                    onChange={(e) => handleChange('timezone', e.target.value)}
                    style={{ width: '100%', height: '40px', padding: '0 12px', border: '1px solid #e2e8f0', borderRadius: '6px', fontSize: '13px', color: 'var(--text)', outline: 'none', backgroundColor: '#fff' }}
                    options={[{
                      label: "(UTC-05:00) Eastern Time (US & Canada)",
                      value: "(UTC-05:00) Eastern Time (US & Canada)"
                    }, {
                      label: "(UTC-08:00) Pacific Time (US & Canada)",
                      value: "(UTC-08:00) Pacific Time (US & Canada)"
                    }]} />
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <label style={{ fontSize: '11px', fontWeight: '800', color: 'var(--text)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>System Language</label>
                  <Select
                    value={formData.language}
                    onChange={(e) => handleChange('language', e.target.value)}
                    style={{ width: '100%', height: '40px', padding: '0 12px', border: '1px solid #e2e8f0', borderRadius: '6px', fontSize: '13px', color: 'var(--text)', outline: 'none', backgroundColor: '#fff' }}
                    options={[{
                      label: "English (United States)",
                      value: "English (United States)"
                    }, {
                      label: "Spanish (Spain)",
                      value: "Spanish (Spain)"
                    }]} />
                </div>
              </div>
            </div>

            {/* Profile Details */}
            <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: '8px', padding: 'var(--spacing-section)' }}>
              <div style={{ marginBottom: '20px' }}>
                <h2 style={{ fontSize: '16px', fontWeight: '800', color: 'var(--text)', margin: '0 0 4px' }}>Profile Details</h2>
                <p style={{ fontSize: '13px', color: 'var(--muted)', margin: 0 }}>Your personal administrative identity.</p>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <img 
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=100&h=100&q=80" 
                    alt="Admin User" 
                    style={{ width: '40px', height: '40px', borderRadius: '6px', objectFit: 'cover' }}
                  />
                  <div>
                    <strong style={{ display: 'block', fontSize: '14px', color: 'var(--text)', margin: '0 0 2px' }}>Admin User</strong>
                    <span style={{ display: 'block', fontSize: '12px', color: 'var(--muted)' }}>admin@hozify.enterprise</span>
                  </div>
                </div>
                <button onClick={(e) => { e.preventDefault(); addToast("Profile details updated!", "success"); }} type="button" style={{ padding: '6px 12px', background: '#fff', border: '1px solid #e2e8f0', borderRadius: '4px', fontSize: '12px', fontWeight: '700', color: 'var(--text)', cursor: 'pointer' }}>Update Profile</button>
              </div>

              <div style={{ borderTop: '1px solid #e2e8f0', paddingTop: '16px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '13px', color: 'var(--muted)' }}>Role</span>
                  <span style={{ fontSize: '13px', color: 'var(--text)', fontWeight: '700' }}>Super Administrator</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '13px', color: 'var(--muted)' }}>Last Login</span>
                  <span style={{ fontSize: '13px', color: 'var(--text)' }}>24 Oct, 09:41 AM</span>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '16px', borderTop: '1px solid #e2e8f0', paddingTop: '24px' }}>
            <button 
              onClick={handleDiscard} 
              disabled={isSaving}
              type="button" 
              style={{ padding: '0 20px', height: '44px', background: '#fff', border: '1px solid #e2e8f0', borderRadius: '6px', fontSize: '14px', fontWeight: '700', color: 'var(--text)', cursor: isSaving ? 'not-allowed' : 'pointer', opacity: isSaving ? 0.6 : 1 }}
            >
              Discard Changes
            </button>
            <button 
              onClick={handleSave} 
              disabled={isSaving}
              type="button" 
              style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '0 24px', height: '44px', background: '#1e1b4b', border: 'none', borderRadius: '6px', fontSize: '14px', fontWeight: '700', color: '#fff', cursor: isSaving ? 'not-allowed' : 'pointer', opacity: isSaving ? 0.8 : 1 }}
            >
              {isSaving ? <Loader2 size={16} className="animate-spin" /> : null}
              Save Configuration
            </button>
          </div>

        </div>
      </div>
    </AdminShell>
  );
}
