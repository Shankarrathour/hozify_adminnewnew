import React, { useState } from 'react';
import { 
  BarChart2, ShieldCheck, Landmark, CheckCircle2, 
  MoreVertical, Plus, Info, Loader2, X 
} from 'lucide-react';
import Toggle from '../../components/common/Toggle';
import AdminShell from '../../components/layouts/AdminShell';
import { useToast } from '../../components/common/ToastNotification';
import Select from "../../components/ui/Select";

const INITIAL_STATE = {
  enableWallet: true,
  autoSettlement: false,
  withdrawalNotifications: true,
  dailyWithdrawalLimit: "250000.00",
  monthlyTransactionCap: "5000000.00",
  minimumBalanceAlert: "10000.00",
  payoutFrequency: "Weekly",
  preferredCurrency: "USD - United States Dollar",
  mfaEnforcement: true
};

const INITIAL_ACCOUNTS = [
  { id: 1, name: "Chase Business", mask: "8829", isPrimary: true },
  { id: 2, name: "SVB Operating", mask: "4410", isPrimary: false }
];

export default function WalletSettings() {
  const { addToast } = useToast();
  
  const [formData, setFormData] = useState(INITIAL_STATE);
  const [isSaving, setIsSaving] = useState(false);
  const [accounts, setAccounts] = useState(INITIAL_ACCOUNTS);
  
  // Link Account Modal State
  const [isAccountModalOpen, setIsAccountModalOpen] = useState(false);
  const [accountForm, setAccountForm] = useState({ name: '', mask: '' });

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleDiscard = () => {
    setFormData(INITIAL_STATE);
    setAccounts(INITIAL_ACCOUNTS);
    addToast("Changes discarded and restored to original state.", "info");
  };

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      addToast("Wallet Configurations saved successfully!", "success");
    }, 800);
  };

  const handleAddAccount = (e) => {
    e.preventDefault();
    if (!accountForm.name || !accountForm.mask) {
      addToast("Please fill in all account fields", "error");
      return;
    }
    
    // Mask should be 4 digits ideally
    const newMask = accountForm.mask.slice(-4);
    
    setAccounts(prev => [
      ...prev,
      { id: Date.now(), name: accountForm.name, mask: newMask, isPrimary: false }
    ]);
    
    setIsAccountModalOpen(false);
    setAccountForm({ name: '', mask: '' });
    addToast("New account linked successfully", "success");
  };

  const handleSetPrimary = (id) => {
    setAccounts(prev => prev.map(acc => 
      acc.id === id ? { ...acc, isPrimary: true } : { ...acc, isPrimary: false }
    ));
    addToast("Primary account updated", "success");
  };

  // Helper for numeric inputs to format with commas for display
  // We'll keep it simple and just use plain string in state, but controlled input
  return (
    <AdminShell
      activeTab="Settings"
      customProfileName="Alex Rivera"
      customProfileRole="Admin User"
      showGridIcon={true}
    >
      <div style={{ padding: '32px 40px 60px', maxWidth: '1100px', position: 'relative' }}>
        
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
            <button 
              onClick={handleDiscard} 
              disabled={isSaving}
              style={{ height: '36px', padding: '0 16px', background: '#fff', border: '1px solid #cbd5e1', borderRadius: '6px', fontSize: '12px', fontWeight: '700', color: '#475569', cursor: isSaving ? 'not-allowed' : 'pointer', opacity: isSaving ? 0.6 : 1 }}
            >
              Discard Changes
            </button>
            <button 
              onClick={handleSave} 
              disabled={isSaving}
              style={{ display: 'flex', alignItems: 'center', gap: '8px', height: '36px', padding: '0 20px', background: '#0f172a', border: 'none', borderRadius: '6px', fontSize: '12px', fontWeight: '700', color: '#fff', cursor: isSaving ? 'not-allowed' : 'pointer', opacity: isSaving ? 0.8 : 1 }}
            >
              {isSaving && <Loader2 size={14} className="animate-spin" />}
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
                  <Toggle checked={formData.enableWallet} onChange={(val) => handleChange('enableWallet', val)} />
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <h4 style={{ fontSize: '13px', fontWeight: '800', color: '#0f172a', margin: '0 0 4px' }}>Auto-Settlement</h4>
                    <p style={{ fontSize: '11px', color: '#64748b', margin: 0 }}>Automatically transfer funds to your primary bank account.</p>
                  </div>
                  <Toggle checked={formData.autoSettlement} onChange={(val) => handleChange('autoSettlement', val)} />
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <h4 style={{ fontSize: '13px', fontWeight: '800', color: '#0f172a', margin: '0 0 4px' }}>Withdrawal Notifications</h4>
                    <p style={{ fontSize: '11px', color: '#64748b', margin: 0 }}>Receive real-time alerts for all payout activities.</p>
                  </div>
                  <Toggle checked={formData.withdrawalNotifications} onChange={(val) => handleChange('withdrawalNotifications', val)} />
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
                    <input 
                      type="number" 
                      value={formData.dailyWithdrawalLimit} 
                      onChange={(e) => handleChange('dailyWithdrawalLimit', e.target.value)}
                      style={{ width: '100%', height: '40px', border: '1px solid #e2e8f0', borderRadius: '6px', padding: '0 12px 0 28px', fontSize: '14px', color: '#0f172a', boxSizing: 'border-box', outline: 'none' }} 
                    />
                  </div>
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '11px', fontWeight: '800', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '8px' }}>MONTHLY TRANSACTION CAP</label>
                  <div style={{ position: 'relative' }}>
                    <span style={{ position: 'absolute', left: '12px', top: '10px', fontSize: '14px', color: '#64748b' }}>$</span>
                    <input 
                      type="number" 
                      value={formData.monthlyTransactionCap} 
                      onChange={(e) => handleChange('monthlyTransactionCap', e.target.value)}
                      style={{ width: '100%', height: '40px', border: '1px solid #e2e8f0', borderRadius: '6px', padding: '0 12px 0 28px', fontSize: '14px', color: '#0f172a', boxSizing: 'border-box', outline: 'none' }} 
                    />
                  </div>
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '11px', fontWeight: '800', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '8px' }}>MINIMUM BALANCE ALERT</label>
                <div style={{ position: 'relative', marginBottom: '8px' }}>
                  <span style={{ position: 'absolute', left: '12px', top: '10px', fontSize: '14px', color: '#64748b' }}>$</span>
                  <input 
                    type="number" 
                    value={formData.minimumBalanceAlert} 
                    onChange={(e) => handleChange('minimumBalanceAlert', e.target.value)}
                    style={{ width: '100%', height: '40px', border: '1px solid #e2e8f0', borderRadius: '6px', padding: '0 12px 0 28px', fontSize: '14px', color: '#0f172a', boxSizing: 'border-box', outline: 'none' }} 
                  />
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
                      value={formData.payoutFrequency}
                      onChange={(e) => handleChange('payoutFrequency', e.target.value)}
                      style={{ width: '100%', height: '40px', border: '1px solid #e2e8f0', borderRadius: '6px', padding: '0 12px', fontSize: '14px', color: '#0f172a', boxSizing: 'border-box', outline: 'none', appearance: 'none', background: '#fff', cursor: 'pointer' }}
                      options={[
                        { label: "Weekly", value: "Weekly" }, 
                        { label: "Daily", value: "Daily" }, 
                        { label: "Monthly", value: "Monthly" }
                      ]} 
                    />
                  </div>
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '11px', fontWeight: '800', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '8px' }}>PREFERRED CURRENCY</label>
                  <div style={{ position: 'relative' }}>
                    <Select
                      value={formData.preferredCurrency}
                      onChange={(e) => handleChange('preferredCurrency', e.target.value)}
                      style={{ width: '100%', height: '40px', border: '1px solid #e2e8f0', borderRadius: '6px', padding: '0 12px', fontSize: '14px', color: '#0f172a', boxSizing: 'border-box', outline: 'none', appearance: 'none', background: '#fff', cursor: 'pointer' }}
                      options={[
                        { label: "USD - United States Dollar", value: "USD - United States Dollar" }, 
                        { label: "EUR - Euro", value: "EUR - Euro" }, 
                        { label: "GBP - British Pound", value: "GBP - British Pound" }
                      ]} 
                    />
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
                  <span style={{ fontSize: '12px', fontWeight: '800' }}>$142,500 / ${Number(formData.dailyWithdrawalLimit).toLocaleString()}</span>
                </div>
                <div style={{ width: '100%', height: '4px', background: 'rgba(255,255,255,0.2)', borderRadius: '2px', overflow: 'hidden' }}>
                  <div style={{ width: '57%', height: '100%', background: '#fff', borderRadius: '2px' }}></div>
                </div>
              </div>

              <div style={{ marginBottom: '32px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                  <span style={{ fontSize: '11px', opacity: 0.9 }}>Monthly Utilization</span>
                  <span style={{ fontSize: '12px', fontWeight: '800' }}>$1.2M / ${(Number(formData.monthlyTransactionCap)/1000000).toFixed(1)}M</span>
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
                <Toggle checked={formData.mfaEnforcement} onChange={(val) => handleChange('mfaEnforcement', val)} />
              </div>

              <span style={{ display: 'block', fontSize: '11px', fontWeight: '800', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '16px' }}>APPROVED PAYOUT ACCOUNTS</span>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '16px' }}>
                {accounts.map(account => (
                  <div key={account.id} className="animate-in fade-in" style={{ border: account.isPrimary ? '1px solid #16a34a' : '1px solid #e2e8f0', background: account.isPrimary ? '#f0fdf4' : '#fff', borderRadius: '8px', padding: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <div style={{ width: '32px', height: '32px', background: account.isPrimary ? '#dcfce7' : '#f1f5f9', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Landmark size={16} color={account.isPrimary ? '#15803d' : '#475569'} />
                      </div>
                      <div>
                        <h4 style={{ fontSize: '13px', fontWeight: '800', color: '#0f172a', margin: '0 0 2px' }}>{account.name}</h4>
                        <p style={{ fontSize: '11px', color: '#64748b', margin: 0 }}>**** {account.mask} {account.isPrimary && '(Primary)'}</p>
                      </div>
                    </div>
                    {account.isPrimary ? (
                      <CheckCircle2 size={16} color="#16a34a" />
                    ) : (
                      <button onClick={() => handleSetPrimary(account.id)} title="Set as Primary" style={{ background: 'none', border: 'none', padding: '4px', color: '#94a3b8', cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
                        <MoreVertical size={16} />
                      </button>
                    )}
                  </div>
                ))}
              </div>

              <button onClick={() => setIsAccountModalOpen(true)} style={{ width: '100%', height: '40px', background: '#fff', border: '1px dashed #cbd5e1', borderRadius: '8px', fontSize: '12px', fontWeight: '700', color: '#64748b', display: 'flex', alignItems: 'center', justifyItems: 'center', justifyContent: 'center', gap: '8px', cursor: 'pointer' }}>
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

        {/* Link Account Modal */}
        {isAccountModalOpen && (
          <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(15, 23, 42, 0.5)', backdropFilter: 'blur(4px)', zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px' }}>
            <div className="animate-in zoom-in-95 duration-200" style={{ background: '#fff', borderRadius: '12px', width: '100%', maxWidth: '400px', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)' }}>
              
              <div style={{ padding: '20px 24px', borderBottom: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <h3 style={{ fontSize: '18px', fontWeight: '800', color: 'var(--text)', margin: '0 0 4px' }}>
                    Link New Account
                  </h3>
                  <p style={{ fontSize: '13px', color: 'var(--muted)', margin: 0 }}>Add a bank account for payouts.</p>
                </div>
                <button onClick={() => setIsAccountModalOpen(false)} style={{ background: '#f1f5f9', border: 'none', width: '32px', height: '32px', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: 'var(--muted)' }}>
                  <X size={18} />
                </button>
              </div>

              <form onSubmit={handleAddAccount} style={{ padding: '24px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <label style={{ fontSize: '12px', fontWeight: '800', color: 'var(--text)' }}>Account Name</label>
                    <input 
                      type="text" 
                      placeholder="e.g. Citi Business"
                      value={accountForm.name}
                      onChange={e => setAccountForm({...accountForm, name: e.target.value})}
                      style={{ width: '100%', height: '44px', padding: '0 12px', border: '1px solid #e2e8f0', borderRadius: '6px', fontSize: '13px', color: 'var(--text)', outline: 'none' }}
                      required
                    />
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <label style={{ fontSize: '12px', fontWeight: '800', color: 'var(--text)' }}>Account Number (Last 4 Digits)</label>
                    <input 
                      type="text" 
                      placeholder="e.g. 1234"
                      value={accountForm.mask}
                      onChange={e => setAccountForm({...accountForm, mask: e.target.value})}
                      maxLength={4}
                      style={{ width: '100%', height: '44px', padding: '0 12px', border: '1px solid #e2e8f0', borderRadius: '6px', fontSize: '13px', color: 'var(--text)', outline: 'none' }}
                      required
                    />
                  </div>

                </div>
                
                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '32px' }}>
                  <button type="button" onClick={() => setIsAccountModalOpen(false)} style={{ padding: '0 20px', height: '44px', background: '#fff', border: '1px solid #e2e8f0', borderRadius: '6px', fontSize: '13px', fontWeight: '700', color: 'var(--text)', cursor: 'pointer' }}>
                    Cancel
                  </button>
                  <button type="submit" style={{ padding: '0 24px', height: '44px', background: '#1e1b4b', border: 'none', borderRadius: '6px', fontSize: '13px', fontWeight: '700', color: '#fff', cursor: 'pointer' }}>
                    Link Account
                  </button>
                </div>
              </form>

            </div>
          </div>
        )}

      </div>
    </AdminShell>
  );
}
