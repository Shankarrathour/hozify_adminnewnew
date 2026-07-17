import React from 'react';
import { 
  Mail, CheckCircle2, Activity, Sparkles, AlertTriangle, ArrowRight, ChevronDown 
} from 'lucide-react';
import AdminShell from '../../components/layouts/AdminShell';
import toast from 'react-hot-toast';

import Select from "../../components/ui/Select";

export default function EmailSmtpIntegration() {
  return (
    <AdminShell
      activeTab="Settings"
      customProfileName="Alex Rivera"
      customProfileRole="Admin User"
      showGridIcon={true}
    >
      <div style={{ padding: '32px 40px 60px', maxWidth: '1200px' }}>
        
        {/* Header */}
        <div style={{ marginBottom: '32px' }}>
          <h1 style={{ fontSize: '24px', fontWeight: '800', color: '#0f172a', margin: '0 0 8px' }}>
            Integration Engine
          </h1>
          <p style={{ fontSize: '13px', color: '#64748b', margin: 0, maxWidth: '600px', lineHeight: '1.5' }}>
            Configure core communication and geospatial service providers for the enterprise suite.
          </p>
        </div>

        {/* Top Section: Left (Form) | Right (Status + CTA) */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: 'var(--spacing-section)', alignItems: 'start', marginBottom: '24px' }}>
          
          {/* Left Column: Email SMTP Settings */}
          <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: '12px', padding: 'var(--spacing-page)', boxShadow: '0 1px 3px rgba(0,0,0,0.02)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ width: '36px', height: '36px', background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Mail size={18} color="#0f172a" />
                </div>
                <h2 style={{ fontSize: '18px', fontWeight: '800', color: '#0f172a', margin: 0 }}>Email SMTP Settings</h2>
              </div>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: '#dcfce7', border: '1px solid #bbf7d0', color: '#16a34a', fontSize: '10px', fontWeight: '800', padding: '4px 10px', borderRadius: '6px', letterSpacing: '0.5px' }}>
                <span style={{ width: '4px', height: '4px', borderRadius: '50%', background: '#16a34a' }}></span> SERVICE ACTIVE
              </span>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 120px', gap: 'var(--spacing-section)', marginBottom: '24px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '10px', fontWeight: '800', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '8px' }}>SMTP HOST</label>
                <input type="text" defaultValue="smtp.enterprise.relay" style={{ width: '100%', height: '40px', border: '1px solid #e2e8f0', borderRadius: '6px', padding: '0 12px', fontSize: '13px', color: '#0f172a', boxSizing: 'border-box', outline: 'none' }} />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '10px', fontWeight: '800', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '8px' }}>PORT</label>
                <input type="text" defaultValue="587" style={{ width: '100%', height: '40px', border: '1px solid #e2e8f0', borderRadius: '6px', padding: '0 12px', fontSize: '13px', color: '#0f172a', boxSizing: 'border-box', outline: 'none' }} />
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--spacing-section)', marginBottom: '24px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '10px', fontWeight: '800', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '8px' }}>SENDER NAME</label>
                <input type="text" defaultValue="Hozify System Notifications" style={{ width: '100%', height: '40px', border: '1px solid #e2e8f0', borderRadius: '6px', padding: '0 12px', fontSize: '13px', color: '#0f172a', boxSizing: 'border-box', outline: 'none' }} />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '10px', fontWeight: '800', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '8px' }}>SENDER EMAIL</label>
                <input type="text" defaultValue="noreply@hozify-enterprise.com" style={{ width: '100%', height: '40px', border: '1px solid #e2e8f0', borderRadius: '6px', padding: '0 12px', fontSize: '13px', color: '#0f172a', boxSizing: 'border-box', outline: 'none' }} />
              </div>
            </div>

            <div style={{ marginBottom: '24px' }}>
              <label style={{ display: 'block', fontSize: '10px', fontWeight: '800', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '8px' }}>AUTHENTICATION METHOD</label>
              <div style={{ position: 'relative' }}>
                <Select
                  style={{ width: '100%', height: '40px', border: '1px solid #e2e8f0', borderRadius: '6px', padding: '0 12px', fontSize: '13px', color: '#0f172a', boxSizing: 'border-box', outline: 'none', appearance: 'none', background: '#fff', cursor: 'pointer' }}
                  options={[{
                    label: "OAuth2 (Recommended)",
                    value: "OAuth2 (Recommended)"
                  }, {
                    label: "Basic Auth",
                    value: "Basic Auth"
                  }, {
                    label: "API Key",
                    value: "API Key"
                  }]} />

              </div>
            </div>

            <div style={{ marginBottom: '32px' }}>
              <label style={{ display: 'block', fontSize: '10px', fontWeight: '800', color: '#0f172a', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '8px' }}>ENVIRONMENT CONFIGURATION (YAML)</label>
              <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '16px', fontFamily: "var(--materio-space)", fontSize: '12px', color: '#475569', lineHeight: '1.6' }}>
                <span style={{ color: '#0f172a', fontWeight: '700' }}>mail:</span><br/>
                &nbsp;&nbsp;transport: <span style={{ color: '#0f172a' }}>smtp</span><br/>
                &nbsp;&nbsp;host: <span style={{ color: '#0f172a' }}>smtp.enterprise.relay</span><br/>
                &nbsp;&nbsp;port: <span style={{ color: '#0f172a' }}>587</span><br/>
                &nbsp;&nbsp;encryption: <span style={{ color: '#0f172a' }}>starttls</span><br/>
                &nbsp;&nbsp;auth:<br/>
                &nbsp;&nbsp;&nbsp;&nbsp;user: <span style={{ color: '#0f172a' }}>report-bot-v1</span><br/>
                &nbsp;&nbsp;&nbsp;&nbsp;pass: <span style={{ color: '#0f172a' }}>*************</span>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
              <button onClick={(e) => { e.preventDefault(); toast.success("Action performed successfully!"); }} style={{ height: '40px', padding: '0 20px', background: '#fff', border: '1px solid #e2e8f0', borderRadius: '6px', fontSize: '12px', fontWeight: '700', color: '#0f172a', cursor: 'pointer' }}>
                Send Test Email
              </button>
              <button onClick={(e) => { e.preventDefault(); toast.success("Action performed successfully!"); }} style={{ height: '40px', padding: '0 24px', background: '#09090b', border: 'none', borderRadius: '6px', fontSize: '12px', fontWeight: '700', color: '#fff', cursor: 'pointer' }}>
                Update Provider
              </button>
            </div>
          </div>

          {/* Right Column: Status & Custom Relay */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-section)' }}>
            
            {/* Quick Status */}
            <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: '12px', padding: 'var(--spacing-section)', boxShadow: '0 1px 3px rgba(0,0,0,0.02)' }}>
              <span style={{ display: 'block', fontSize: '10px', fontWeight: '800', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '16px' }}>QUICK STATUS</span>
              
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#f8fafc', padding: '12px 16px', borderRadius: '8px', marginBottom: '12px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <CheckCircle2 size={16} color="#16a34a" />
                  <span style={{ fontSize: '13px', fontWeight: '600', color: '#334155' }}>SSL Connectivity</span>
                </div>
                <span style={{ fontSize: '12px', color: '#0f172a' }}>Secure</span>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#f8fafc', padding: '12px 16px', borderRadius: '8px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <Activity size={16} color="#16a34a" />
                  <span style={{ fontSize: '13px', fontWeight: '600', color: '#334155' }}>Avg Latency</span>
                </div>
                <span style={{ fontSize: '12px', color: '#0f172a' }}>142ms</span>
              </div>
            </div>

            {/* Custom Relay Box */}
            <div style={{ background: '#09091b', borderRadius: '12px', padding: 'var(--spacing-page)', color: '#fff', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
              <div style={{ marginBottom: '24px' }}>
                <Sparkles size={24} color="#a5b4fc" style={{ marginBottom: '16px' }} />
                <h2 style={{ fontSize: '16px', fontWeight: '800', margin: '0 0 12px' }}>Need a custom relay?</h2>
                <p style={{ fontSize: '12px', color: '#94a3b8', margin: 0, lineHeight: '1.5' }}>
                  Our dedicated enterprise support team can assist with VPC peering and white-labeling.
                </p>
              </div>
              <button onClick={(e) => { e.preventDefault(); toast.success("Action performed successfully!"); }} style={{ width: '100%', height: '40px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '6px', fontSize: '12px', fontWeight: '700', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', cursor: 'pointer', transition: 'background 0.2s' }}>
                Contact Support <ArrowRight size={14} />
              </button>
            </div>

          </div>
        </div>

        {/* Bottom Full-Width Section: Usage & Billing Thresholds */}
        <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: '12px', padding: 'var(--spacing-page)', boxShadow: '0 1px 3px rgba(0,0,0,0.02)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '32px' }}>
            <div>
              <h2 style={{ fontSize: '18px', fontWeight: '800', color: '#0f172a', margin: '0 0 4px' }}>Usage & Billing Thresholds</h2>
              <p style={{ fontSize: '12px', color: '#64748b', margin: 0 }}>Monitor your SMTP API consumption across integrated services.</p>
            </div>
            <div style={{ display: 'flex', gap: '32px' }}>
              <div style={{ textAlign: 'right' }}>
                <span style={{ display: 'block', fontSize: '9px', fontWeight: '800', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '4px' }}>MONTHLY ESTIMATE</span>
                <span style={{ fontSize: '16px', fontWeight: '800', color: '#0f172a' }}>$412.ŽŽ</span>
              </div>
              <div style={{ textAlign: 'right' }}>
                <span style={{ display: 'block', fontSize: '9px', fontWeight: '800', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '4px' }}>REMAINING QUOTA</span>
                <span style={{ fontSize: '16px', fontWeight: '800', color: '#dc2626' }}>12.4%</span>
              </div>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '40px' }}>
            {/* Metric 1 */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                <span style={{ fontSize: '10px', fontWeight: '800', color: '#475569', textTransform: 'uppercase', letterSpacing: '0.5px' }}>SMTP REQUESTS</span>
                <span style={{ fontSize: '11px', fontWeight: '800', color: '#0f172a' }}>45,122 / 52K</span>
              </div>
              <div style={{ width: '100%', height: '4px', background: '#fee2e2', borderRadius: '2px', overflow: 'hidden', marginBottom: '12px' }}>
                <div style={{ width: '86%', height: '100%', background: '#dc2626', borderRadius: '2px' }}></div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#dc2626' }}>
                <AlertTriangle size={12} />
                <span style={{ fontSize: '11px', fontWeight: '600' }}>Approaching monthly limit</span>
              </div>
            </div>

            {/* Metric 2 */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                <span style={{ fontSize: '10px', fontWeight: '800', color: '#475569', textTransform: 'uppercase', letterSpacing: '0.5px' }}>TRANSACTIONAL API</span>
                <span style={{ fontSize: '11px', fontWeight: '800', color: '#0f172a' }}>12,402 / 122K</span>
              </div>
              <div style={{ width: '100%', height: '4px', background: '#e2e8f0', borderRadius: '2px', overflow: 'hidden', marginBottom: '12px' }}>
                <div style={{ width: '10%', height: '100%', background: '#16a34a', borderRadius: '2px' }}></div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#16a34a' }}>
                <CheckCircle2 size={12} />
                <span style={{ fontSize: '11px', fontWeight: '600' }}>Usage within normal parameters</span>
              </div>
            </div>

            {/* Metric 3 */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                <span style={{ fontSize: '10px', fontWeight: '800', color: '#475569', textTransform: 'uppercase', letterSpacing: '0.5px' }}>QUEUE BACKLOG</span>
                <span style={{ fontSize: '11px', fontWeight: '800', color: '#0f172a' }}>2 / 5K</span>
              </div>
              <div style={{ width: '100%', height: '4px', background: '#e2e8f0', borderRadius: '2px', overflow: 'hidden', marginBottom: '12px' }}>
                <div style={{ width: '1%', height: '100%', background: '#64748b', borderRadius: '2px' }}></div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#16a34a' }}>
                <CheckCircle2 size={12} />
                <span style={{ fontSize: '11px', fontWeight: '600' }}>Tier 2 billing active</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </AdminShell>
  );
}
