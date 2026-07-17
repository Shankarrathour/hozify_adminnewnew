import React from 'react';
import { 
  BarChart2, ShieldCheck, Landmark, CheckCircle2, 
  MoreVertical, Plus, Info, ChevronDown 
} from 'lucide-react';
import Toggle from '../../components/common/Toggle';
import AdminShell from '../../components/layouts/AdminShell';
import toast from 'react-hot-toast';

import Select from "../../components/ui/Select";

export default function WalletSettings() {
  return (
    <AdminShell
      activeTab="Settings"
      customProfileName="Alex Rivera"
      customProfileRole="Admin User"
      showGridIcon={true}
    >
      <div style={{ padding: '32px 40px 60px', maxWidth: '1100px' }}>
        
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
          <div>
            <h1 style={{ fontSize: '24px', fontWeight: '800', color: '#0f172a', margin: '0 0 8px' }}>
              Wallet Settings
            </h1>
            <p style={{ fontSize: '13px', color: '#64748b', margin: 0 }}>
              Configure transactional limits, settlement logic, and payout security.
            </p>
          </div>
          <div style={{ display: 'flex', gap: '12px' }}>
            <button onClick={(e) => { e.preventDefault(); toast.success("Action performed successfully!"); }} style={{ height: '36px', padding: '0 16px', background: '#fff', border: '1px solid #cbd5e1', borderRadius: '6px', fontSize: '12px', fontWeight: '700', color: '#475569', cursor: 'pointer' }}>
              Discard Changes
            </button>
            <button onClick={(e) => { e.preventDefault(); toast.success("Action performed successfully!"); }} style={{ height: '36px', padding: '0 20px', background: '#0f172a', border: 'none', borderRadius: '6px', fontSize: '12px', fontWeight: '700', color: '#fff', cursor: 'pointer' }}>
              Save Configurations
            </button>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 360px', gap: 'var(--spacing-section)', alignItems: 'start' }}>
          
          {/* Left Column */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-section)' }}>
            
            {/* Wallet Preferences */}
            <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: '12px', padding: 'var(--spacing-page)', boxShadow: '0 1px 3px rgba(0,0,0,0.02)' }}>
              <h2 style={{ fontSize: '16px', fontWeight: '800', color: '#0f172a', margin: '0 0 24px' }}>Wallet Preferences</h2>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-section)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <h4 style={{ fontSize: '13px', fontWeight: '800', color: '#0f172a', margin: '0 0 4px' }}>Enable Wallet</h4>
                    <p style={{ fontSize: '11px', color: '#64748b', margin: 0 }}>Activate digital wallet for inward and outward transactions.</p>
                  </div>
                  <Toggle defaultChecked={true} />
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <h4 style={{ fontSize: '13px', fontWeight: '800', color: '#0f172a', margin: '0 0 4px' }}>Auto-Settlement</h4>
                    <p style={{ fontSize: '11px', color: '#64748b', margin: 0 }}>Automatically transfer funds to your primary bank account.</p>
                  </div>
                  <Toggle defaultChecked={false} />
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <h4 style={{ fontSize: '13px', fontWeight: '800', color: '#0f172a', margin: '0 0 4px' }}>Withdrawal Notifications</h4>
                    <p style={{ fontSize: '11px', color: '#64748b', margin: 0 }}>Receive real-time alerts for all payout activities.</p>
                  </div>
                  <Toggle defaultChecked={true} />
                </div>
              </div>
            </div>

            {/* Transaction Limits */}
            <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: '12px', padding: 'var(--spacing-page)', boxShadow: '0 1px 3px rgba(0,0,0,0.02)' }}>
              <h2 style={{ fontSize: '16px', fontWeight: '800', color: '#0f172a', margin: '0 0 24px' }}>Transaction Limits</h2>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--spacing-section)', marginBottom: '24px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '11px', fontWeight: '800', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '8px' }}>DAILY WITHDRAWAL LIMIT</label>
                  <div style={{ position: 'relative' }}>
                    <span style={{ position: 'absolute', left: '12px', top: '10px', fontSize: '14px', color: '#64748b' }}>$</span>
                    <input type="text" defaultValue="250,000.00" style={{ width: '100%', height: '40px', border: '1px solid #e2e8f0', borderRadius: '6px', padding: '0 12px 0 28px', fontSize: '14px', color: '#0f172a', boxSizing: 'border-box', outline: 'none' }} />
                  </div>
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '11px', fontWeight: '800', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '8px' }}>MONTHLY TRANSACTION CAP</label>
                  <div style={{ position: 'relative' }}>
                    <span style={{ position: 'absolute', left: '12px', top: '10px', fontSize: '14px', color: '#64748b' }}>$</span>
                    <input type="text" defaultValue="5,000,000.00" style={{ width: '100%', height: '40px', border: '1px solid #e2e8f0', borderRadius: '6px', padding: '0 12px 0 28px', fontSize: '14px', color: '#0f172a', boxSizing: 'border-box', outline: 'none' }} />
                  </div>
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '11px', fontWeight: '800', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '8px' }}>MINIMUM BALANCE ALERT</label>
                <div style={{ position: 'relative', marginBottom: '8px' }}>
                  <span style={{ position: 'absolute', left: '12px', top: '10px', fontSize: '14px', color: '#64748b' }}>$</span>
                  <input type="text" defaultValue="10,000.00" style={{ width: '100%', height: '40px', border: '1px solid #e2e8f0', borderRadius: '6px', padding: '0 12px 0 28px', fontSize: '14px', color: '#0f172a', boxSizing: 'border-box', outline: 'none' }} />
                </div>
                <p style={{ fontSize: '11px', color: '#94a3b8', margin: 0, fontStyle: 'italic' }}>Notify administrators when balance falls below this threshold.</p>
              </div>
            </div>

            {/* Settlement Configuration */}
            <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: '12px', padding: 'var(--spacing-page)', boxShadow: '0 1px 3px rgba(0,0,0,0.02)' }}>
              <h2 style={{ fontSize: '16px', fontWeight: '800', color: '#0f172a', margin: '0 0 24px' }}>Settlement Configuration</h2>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--spacing-section)' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '11px', fontWeight: '800', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '8px' }}>PAYOUT FREQUENCY</label>
                  <div style={{ position: 'relative' }}>
                    <Select
                      style={{ width: '100%', height: '40px', border: '1px solid #e2e8f0', borderRadius: '6px', padding: '0 12px', fontSize: '14px', color: '#0f172a', boxSizing: 'border-box', outline: 'none', appearance: 'none', background: '#fff', cursor: 'pointer' }}
                      options={[{
                        label: "Weekly",
                        value: "Weekly"
                      }, {
                        label: "Daily",
                        value: "Daily"
                      }, {
                        label: "Monthly",
                        value: "Monthly"
                      }]} />

                  </div>
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '11px', fontWeight: '800', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '8px' }}>PREFERRED CURRENCY</label>
                  <div style={{ position: 'relative' }}>
                    <Select
                      style={{ width: '100%', height: '40px', border: '1px solid #e2e8f0', borderRadius: '6px', padding: '0 12px', fontSize: '14px', color: '#0f172a', boxSizing: 'border-box', outline: 'none', appearance: 'none', background: '#fff', cursor: 'pointer' }}
                      options={[{
                        label: "USD - United States Dollar",
                        value: "USD - United States Dollar"
                      }, {
                        label: "EUR - Euro",
                        value: "EUR - Euro"
                      }, {
                        label: "GBP - British Pound",
                        value: "GBP - British Pound"
                      }]} />

                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-section)' }}>
            
            {/* Usage Summary Banner Card */}
            <div style={{ background: '#09091b', borderRadius: '12px', padding: 'var(--spacing-page)', color: '#fff', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '32px' }}>
                <div>
                  <h2 style={{ fontSize: '18px', fontWeight: '800', margin: '0 0 4px' }}>Usage Summary</h2>
                  <p style={{ fontSize: '11px', margin: 0, opacity: 0.7 }}>Current vs. Enterprise Limits</p>
                </div>
                <div style={{ width: '32px', height: '32px', background: 'rgba(255,255,255,0.1)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <BarChart2 size={16} color="#fff" />
                </div>
              </div>

              <div style={{ marginBottom: '24px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                  <span style={{ fontSize: '11px', opacity: 0.9 }}>Daily Utilization</span>
                  <span style={{ fontSize: '12px', fontWeight: '800' }}>$142,500 / $250,000</span>
                </div>
                <div style={{ width: '100%', height: '4px', background: 'rgba(255,255,255,0.2)', borderRadius: '2px', overflow: 'hidden' }}>
                  <div style={{ width: '57%', height: '100%', background: '#fff', borderRadius: '2px' }}></div>
                </div>
              </div>

              <div style={{ marginBottom: '32px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                  <span style={{ fontSize: '11px', opacity: 0.9 }}>Monthly Utilization</span>
                  <span style={{ fontSize: '12px', fontWeight: '800' }}>$1.2M / $5.0M</span>
                </div>
                <div style={{ width: '100%', height: '4px', background: 'rgba(255,255,255,0.2)', borderRadius: '2px', overflow: 'hidden' }}>
                  <div style={{ width: '24%', height: '100%', background: '#fff', borderRadius: '2px' }}></div>
                </div>
              </div>

              <div style={{ display: 'flex', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '24px' }}>
                <div style={{ flex: 1 }}>
                  <span style={{ display: 'block', fontSize: '9px', fontWeight: '800', color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '4px' }}>STATUS</span>
                  <span style={{ fontSize: '12px', fontWeight: '800', color: '#4ade80' }}>OPTIMAL</span>
                </div>
                <div style={{ flex: 1 }}>
                  <span style={{ display: 'block', fontSize: '9px', fontWeight: '800', color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '4px' }}>NEXT PAYOUT</span>
                  <span style={{ fontSize: '12px', fontWeight: '800', color: '#fff' }}>In 2 Days</span>
                </div>
              </div>
            </div>

            {/* Security Controls */}
            <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: '12px', padding: 'var(--spacing-page)', boxShadow: '0 1px 3px rgba(0,0,0,0.02)' }}>
              <h2 style={{ fontSize: '16px', fontWeight: '800', color: '#0f172a', margin: '0 0 24px' }}>Security Controls</h2>

              <div style={{ background: '#f8fafc', borderRadius: '8px', padding: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
                <div style={{ display: 'flex', gap: '12px' }}>
                  <ShieldCheck size={18} color="#0f172a" style={{ marginTop: '2px' }} />
                  <div>
                    <h4 style={{ fontSize: '13px', fontWeight: '800', color: '#0f172a', margin: '0 0 4px' }}>MFA Enforcement</h4>
                    <p style={{ fontSize: '11px', color: '#64748b', margin: 0 }}>Require code for all withdrawals.</p>
                  </div>
                </div>
                <Toggle defaultChecked={true} />
              </div>

              <span style={{ display: 'block', fontSize: '11px', fontWeight: '800', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '16px' }}>APPROVED PAYOUT ACCOUNTS</span>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '16px' }}>
                {/* Account 1 */}
                <div style={{ border: '1px solid #e2e8f0', borderRadius: '8px', padding: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{ width: '32px', height: '32px', background: '#f1f5f9', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Landmark size={16} color="#475569" />
                    </div>
                    <div>
                      <h4 style={{ fontSize: '13px', fontWeight: '800', color: '#0f172a', margin: '0 0 2px' }}>Chase Business</h4>
                      <p style={{ fontSize: '11px', color: '#64748b', margin: 0 }}>**** 8829 (Primary)</p>
                    </div>
                  </div>
                  <CheckCircle2 size={16} color="#16a34a" />
                </div>

                {/* Account 2 */}
                <div style={{ border: '1px solid #e2e8f0', borderRadius: '8px', padding: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{ width: '32px', height: '32px', background: '#f1f5f9', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Landmark size={16} color="#475569" />
                    </div>
                    <div>
                      <h4 style={{ fontSize: '13px', fontWeight: '800', color: '#0f172a', margin: '0 0 2px' }}>SVB Operating</h4>
                      <p style={{ fontSize: '11px', color: '#64748b', margin: 0 }}>**** 4410</p>
                    </div>
                  </div>
                  <button onClick={(e) => { e.preventDefault(); toast.success("Action performed successfully!"); }} style={{ background: 'none', border: 'none', padding: 0, color: '#94a3b8', cursor: 'pointer' }}>
                    <MoreVertical size={16} />
                  </button>
                </div>
              </div>

              <button onClick={(e) => { e.preventDefault(); toast.success("Action performed successfully!"); }} style={{ width: '100%', height: '40px', background: '#fff', border: '1px dashed #cbd5e1', borderRadius: '8px', fontSize: '12px', fontWeight: '700', color: '#64748b', display: 'flex', alignItems: 'center', justifyItems: 'center', justifyContent: 'center', gap: '8px', cursor: 'pointer' }}>
                <Plus size={14} /> Link New Account
              </button>
            </div>

            {/* Info Box */}
            <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '16px', display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
              <Info size={16} color="#64748b" style={{ flexShrink: 0, marginTop: '2px' }} />
              <p style={{ fontSize: '11px', color: '#64748b', margin: 0, lineHeight: '1.5' }}>
                Changes to limits and approved accounts require approval from a secondary administrator with "High-Risk Authorizer" permissions.
              </p>
            </div>

          </div>
        </div>

      </div>
    </AdminShell>
  );
}
