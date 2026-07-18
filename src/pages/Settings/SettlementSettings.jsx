import React, { useState } from 'react';
import { Calendar, Clock, Plus, ShieldCheck, Zap, LayoutGrid, CalendarDays, UserCheck, DollarSign, Building, AlertOctagon, Pencil, Eye, MoreVertical, FileCheck, Activity, ShieldAlert, PauseCircle, Loader2, X, ListPlus } from 'lucide-react';
import AdminShell from '../../components/layouts/AdminShell';
import { useToast } from '../../components/common/ToastNotification';
import Select from '../../components/ui/Select';

const INITIAL_FREQUENCY = "Daily";
const INITIAL_THRESHOLD = "500.00";

const INITIAL_RULES = [
  { id: 1, title: 'KYC Compliance', subtitle: 'Identity Verification', description: 'Account holder identity must match merchant legal entity.', priority: 'Mandatory', status: 'Active', iconType: 'UserCheck' },
  { id: 2, title: 'Micro-Deposit Verify', subtitle: 'Ownership Check', description: 'Confirm ownership via two random deposits under $0.50.', priority: 'Mandatory', status: 'Active', iconType: 'DollarSign' },
  { id: 3, title: 'SWIFT/BIC Check', subtitle: 'Bank Routing Validation', description: 'Cross-verify routing codes with the global interbank database.', priority: 'Optional', status: 'Paused', iconType: 'Building' },
  { id: 4, title: 'Fraud Watchlist', subtitle: 'Risk Screening', description: 'Real-time screening against global sanction and fraud lists.', priority: 'Mandatory', status: 'Active', iconType: 'AlertOctagon' }
];

const renderIcon = (type, props) => {
  switch (type) {
    case 'UserCheck': return <UserCheck {...props} />;
    case 'DollarSign': return <DollarSign {...props} />;
    case 'Building': return <Building {...props} />;
    case 'AlertOctagon': return <AlertOctagon {...props} />;
    default: return <ListPlus {...props} />;
  }
};

export default function SettlementSettings() {
  const { addToast } = useToast();

  const [frequency, setFrequency] = useState(INITIAL_FREQUENCY);
  const [threshold, setThreshold] = useState(INITIAL_THRESHOLD);
  const [rules, setRules] = useState(INITIAL_RULES);
  const [isSaving, setIsSaving] = useState(false);

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newRule, setNewRule] = useState({ title: '', subtitle: '', description: '', priority: 'Optional', status: 'Active' });

  const handleDiscard = () => {
    setFrequency(INITIAL_FREQUENCY);
    setThreshold(INITIAL_THRESHOLD);
    setRules(INITIAL_RULES);
    addToast("Changes discarded", "info");
  };

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      addToast("Settlement Settings saved successfully!", "success");
    }, 800);
  };

  const handleAddRule = (e) => {
    e.preventDefault();
    if (!newRule.title || !newRule.description) {
      addToast("Please fill in the required fields", "error");
      return;
    }
    
    setRules(prev => [
      ...prev,
      {
        id: Date.now(),
        ...newRule,
        iconType: 'ListPlus'
      }
    ]);
    setIsModalOpen(false);
    setNewRule({ title: '', subtitle: '', description: '', priority: 'Optional', status: 'Active' });
    addToast("New validation rule added!", "success");
  };

  const activeCount = rules.filter(r => r.status === 'Active').length;
  const mandatoryCount = rules.filter(r => r.priority === 'Mandatory').length;
  const pausedCount = rules.filter(r => r.status === 'Paused').length;

  return (
    <AdminShell
      activeTab="Settings"
      customProfileName="Alex Rivera"
      customProfileRole="Admin User"
      showGridIcon={true}
    >
      <div className="settlement-settings-page" style={{ padding: '32px 40px 60px' }}>
        
        {/* Header */}
        <div style={{ marginBottom: '32px' }}>
          <h1 style={{ fontSize: '28px', fontWeight: '800', color: 'var(--text)', margin: '0 0 8px' }}>
            Settlement Settings
          </h1>
          <p style={{ fontSize: '14px', color: 'var(--muted)', margin: 0 }}>
            Configure automated payout frequencies, bank validation protocols, and processing thresholds for enterprise-level fund distribution.
          </p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-section)' }}>
          
          {/* Top Row: Frequency Schedule & Payout Threshold */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: 'var(--spacing-section)' }}>
            
            {/* Frequency Schedule */}
            <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: '8px', padding: 'var(--spacing-section)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px' }}>
                <div>
                  <h2 style={{ fontSize: '16px', fontWeight: '800', color: 'var(--text)', margin: '0 0 4px' }}>Frequency Schedule</h2>
                  <p style={{ fontSize: '13px', color: 'var(--muted)', margin: 0 }}>Determine how often accumulated funds are batched for settlement.</p>
                </div>
                <Calendar size={20} style={{ color: '#0f172a' }} />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', marginBottom: '32px' }}>
                
                <div 
                  onClick={() => setFrequency('Daily')} 
                  style={{ border: frequency === 'Daily' ? '2px solid #4338ca' : '1px solid #e2e8f0', borderRadius: '6px', padding: '16px', cursor: 'pointer', background: frequency === 'Daily' ? '#fafaff' : '#fff' }}
                >
                  <Zap size={24} style={{ color: frequency === 'Daily' ? '#4338ca' : '#94a3b8', marginBottom: '12px' }} />
                  <h3 style={{ fontSize: '14px', fontWeight: '800', color: frequency === 'Daily' ? '#4338ca' : 'var(--text)', margin: '0 0 6px' }}>Daily</h3>
                  <p style={{ fontSize: '11px', color: frequency === 'Daily' ? '#4f46e5' : 'var(--muted)', margin: 0, lineHeight: '1.4' }}>Cleared every 24 hours. Best for high-velocity cash flow.</p>
                </div>
                
                <div 
                  onClick={() => setFrequency('Weekly')} 
                  style={{ border: frequency === 'Weekly' ? '2px solid #4338ca' : '1px solid #e2e8f0', borderRadius: '6px', padding: '16px', cursor: 'pointer', background: frequency === 'Weekly' ? '#fafaff' : '#fff' }}
                >
                  <LayoutGrid size={24} style={{ color: frequency === 'Weekly' ? '#4338ca' : '#94a3b8', marginBottom: '12px' }} />
                  <h3 style={{ fontSize: '14px', fontWeight: '800', color: frequency === 'Weekly' ? '#4338ca' : 'var(--text)', margin: '0 0 6px' }}>Weekly</h3>
                  <p style={{ fontSize: '11px', color: frequency === 'Weekly' ? '#4f46e5' : 'var(--muted)', margin: 0, lineHeight: '1.4' }}>Batched every Monday at 00:00 UTC. Standard business cycle.</p>
                </div>

                <div 
                  onClick={() => setFrequency('Monthly')} 
                  style={{ border: frequency === 'Monthly' ? '2px solid #4338ca' : '1px solid #e2e8f0', borderRadius: '6px', padding: '16px', cursor: 'pointer', background: frequency === 'Monthly' ? '#fafaff' : '#fff' }}
                >
                  <CalendarDays size={24} style={{ color: frequency === 'Monthly' ? '#4338ca' : '#94a3b8', marginBottom: '12px' }} />
                  <h3 style={{ fontSize: '14px', fontWeight: '800', color: frequency === 'Monthly' ? '#4338ca' : 'var(--text)', margin: '0 0 6px' }}>Monthly</h3>
                  <p style={{ fontSize: '11px', color: frequency === 'Monthly' ? '#4f46e5' : 'var(--muted)', margin: 0, lineHeight: '1.4' }}>Processed on the 1st of each month. Consolidates overhead.</p>
                </div>
              </div>

              <div>
                <h3 style={{ fontSize: '12px', fontWeight: '800', color: 'var(--text)', margin: '0 0 12px' }}>Batch Processing Times (UTC)</h3>
                <div style={{ display: 'flex', gap: '12px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '6px 12px', background: '#f1f5f9', borderRadius: '4px', fontSize: '11px', fontWeight: '700', color: 'var(--text)' }}>
                    <Clock size={14} style={{ color: 'var(--muted)' }} /> 04:00 AM
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '6px 12px', background: '#f1f5f9', borderRadius: '4px', fontSize: '11px', fontWeight: '700', color: 'var(--text)' }}>
                    <Clock size={14} style={{ color: 'var(--muted)' }} /> 12:00 PM
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '6px 12px', background: '#f1f5f9', borderRadius: '4px', fontSize: '11px', fontWeight: '700', color: 'var(--text)' }}>
                    <Clock size={14} style={{ color: 'var(--muted)' }} /> 08:00 PM
                  </div>
                </div>
              </div>
            </div>

            {/* Payout Threshold */}
            <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: '8px', padding: 'var(--spacing-section)', display: 'flex', flexDirection: 'column' }}>
              <h2 style={{ fontSize: '16px', fontWeight: '800', color: 'var(--text)', margin: '0 0 20px' }}>Payout Threshold</h2>
              
              <div style={{ marginBottom: '12px' }}>
                <label style={{ display: 'block', fontSize: '10px', fontWeight: '800', color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '8px' }}>Minimum Amount (USD)</label>
                <div style={{ display: 'flex', alignItems: 'center', padding: '0 16px', height: '44px', border: '1px solid #e2e8f0', borderRadius: '6px', fontSize: '14px', fontWeight: '700', color: 'var(--text)' }}>
                  <span style={{ color: 'var(--text)', marginRight: '4px' }}>$</span>
                  <input 
                    type="number" 
                    value={threshold}
                    onChange={(e) => setThreshold(e.target.value)}
                    style={{ flex: 1, border: 'none', background: 'transparent', outline: 'none', fontSize: '14px', fontWeight: '700', color: 'var(--text)' }}
                  />
                </div>
              </div>
              <p style={{ fontSize: '11px', color: 'var(--muted)', margin: '0 0 24px', fontStyle: 'italic' }}>
                Funds below this amount will roll over to the next period.
              </p>

              <div style={{ background: '#f8fafc', padding: '16px', borderRadius: '6px', marginBottom: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <h3 style={{ fontSize: '12px', fontWeight: '800', color: 'var(--text)', margin: '0 0 4px' }}>Accumulated Balance</h3>
                  <span style={{ fontSize: '11px', color: 'var(--muted)' }}>As of today, 09:41 AM</span>
                </div>
                <div style={{ fontSize: '18px', fontWeight: '800', color: '#0f172a' }}>
                  $12,450.00
                </div>
              </div>

              <button 
                type="button"
                onClick={() => addToast("Generating detailed payout schedule...", "info")}
                style={{ width: '100%', background: '#1e1b4b', padding: '16px', borderRadius: '6px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', border: 'none', cursor: 'pointer', transition: 'background-color 0.2s' }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#2e2b6b'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#1e1b4b'}
              >
                <h3 style={{ fontSize: '12px', fontWeight: '800', color: '#fff', margin: 0 }}>Estimated Next Payout</h3>
                <div style={{ fontSize: '12px', fontWeight: '800', color: '#fff' }}>
                  {frequency === 'Daily' ? 'Tomorrow' : frequency === 'Weekly' ? 'Next Monday' : '1st of Next Month'}
                </div>
              </button>
            </div>

          </div>

          {/* Bank Account Validation Rules */}
          <div style={{ background: '#fff', border: '1px solid #E2E8F0', borderRadius: '16px', padding: 'var(--spacing-page)', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03)' }}>
            
            {/* Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '32px' }}>
              <div>
                <h2 style={{ fontSize: '24px', fontWeight: '600', color: '#1e293b', margin: '0 0 8px' }}>Bank Account Validation Rules</h2>
                <p style={{ fontSize: '14px', color: '#64748B', margin: 0 }}>Security and compliance requirements for merchant payout accounts.</p>
              </div>
              <button onClick={() => setIsModalOpen(true)} type="button" style={{ display: 'flex', alignItems: 'center', gap: '8px', background: '#312E81', border: 'none', borderRadius: '8px', padding: '10px 20px', fontSize: '14px', fontWeight: '600', color: '#fff', cursor: 'pointer', transition: 'background-color 0.2s', ':hover': { background: '#282568' } }}>
                <Plus size={18} /> Add Custom Rule
              </button>
            </div>

            {/* Top Summary Row */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '32px' }}>
              <div style={{ background: '#f8fafc', borderRadius: '12px', padding: '20px', display: 'flex', alignItems: 'center', gap: '16px', border: '1px solid #f1f5f9' }}>
                <div style={{ background: '#e2e8f0', borderRadius: '8px', padding: '12px', color: '#475569' }}>
                  <FileCheck size={24} />
                </div>
                <div>
                  <p style={{ fontSize: '12px', fontWeight: '600', color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.5px', margin: '0 0 4px' }}>Total Rules</p>
                  <h3 style={{ fontSize: '24px', fontWeight: '700', color: '#1e293b', margin: 0 }}>{rules.length}</h3>
                </div>
              </div>
              
              <div style={{ background: '#f0fdf4', borderRadius: '12px', padding: '20px', display: 'flex', alignItems: 'center', gap: '16px', border: '1px solid #dcfce7' }}>
                <div style={{ background: '#dcfce7', borderRadius: '8px', padding: '12px', color: '#16A34A' }}>
                  <Activity size={24} />
                </div>
                <div>
                  <p style={{ fontSize: '12px', fontWeight: '600', color: '#16A34A', textTransform: 'uppercase', letterSpacing: '0.5px', margin: '0 0 4px' }}>Active Rules</p>
                  <h3 style={{ fontSize: '24px', fontWeight: '700', color: '#1e293b', margin: 0 }}>{activeCount}</h3>
                </div>
              </div>
              
              <div style={{ background: '#f5f3ff', borderRadius: '12px', padding: '20px', display: 'flex', alignItems: 'center', gap: '16px', border: '1px solid #ede9fe' }}>
                <div style={{ background: '#ede9fe', borderRadius: '8px', padding: '12px', color: '#312E81' }}>
                  <ShieldAlert size={24} />
                </div>
                <div>
                  <p style={{ fontSize: '12px', fontWeight: '600', color: '#312E81', textTransform: 'uppercase', letterSpacing: '0.5px', margin: '0 0 4px' }}>Mandatory Checks</p>
                  <h3 style={{ fontSize: '24px', fontWeight: '700', color: '#1e293b', margin: 0 }}>{mandatoryCount}</h3>
                </div>
              </div>
              
              <div style={{ background: '#f8fafc', borderRadius: '12px', padding: '20px', display: 'flex', alignItems: 'center', gap: '16px', border: '1px solid #f1f5f9' }}>
                <div style={{ background: '#e2e8f0', borderRadius: '8px', padding: '12px', color: '#64748B' }}>
                  <PauseCircle size={24} />
                </div>
                <div>
                  <p style={{ fontSize: '12px', fontWeight: '600', color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.5px', margin: '0 0 4px' }}>Paused Rules</p>
                  <h3 style={{ fontSize: '24px', fontWeight: '700', color: '#1e293b', margin: 0 }}>{pausedCount}</h3>
                </div>
              </div>
            </div>

            {/* Table Redesign */}
            <div className="table-responsive-wrapper">
              <table style={{ width: '100%', borderCollapse: 'collapse', borderSpacing: 0, textAlign: 'left' }}>
                <thead>
                  <tr>
                    <th style={{ padding: '0 20px 12px', fontSize: '12px', fontWeight: '600', color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.05em', background: '#fff', borderBottom: '1px solid #E2E8F0' }}>Validation Rule</th>
                    <th style={{ padding: '0 20px 12px', fontSize: '12px', fontWeight: '600', color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.05em', background: '#fff', borderBottom: '1px solid #E2E8F0' }}>Description</th>
                    <th style={{ padding: '0 20px 12px', fontSize: '12px', fontWeight: '600', color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.05em', background: '#fff', borderBottom: '1px solid #E2E8F0' }}>Priority</th>
                    <th style={{ padding: '0 20px 12px', fontSize: '12px', fontWeight: '600', color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.05em', background: '#fff', borderBottom: '1px solid #E2E8F0' }}>Status</th>
                    <th style={{ padding: '0 20px 12px', fontSize: '12px', fontWeight: '600', color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.05em', textAlign: 'right', background: '#fff', borderBottom: '1px solid #E2E8F0' }}>Actions</th>
                  </tr>
                </thead>
                <tbody style={{ background: '#fff' }}>
                  {rules.map(rule => (
                    <tr key={rule.id} className="animate-in fade-in" style={{ background: '#fff', boxShadow: 'inset 0 0 0 1px #E2E8F0', borderRadius: '12px', transition: 'all 0.2s ease', cursor: 'default' }} onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#f8fafc'; e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = 'inset 0 0 0 1px #cbd5e1, 0 4px 12px -2px rgba(0, 0, 0, 0.05)'; }} onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = '#fff'; e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'inset 0 0 0 1px #E2E8F0'; }}>
                      <td style={{ padding: '20px', borderTopLeftRadius: '12px', borderBottomLeftRadius: '12px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                          <div style={{ background: '#f1f5f9', borderRadius: '50%', padding: '12px', color: '#475569', flexShrink: 0 }}>
                            {renderIcon(rule.iconType, { size: 20 })}
                          </div>
                          <div>
                            <strong style={{ display: 'block', fontSize: '16px', fontWeight: '600', color: '#1e293b', marginBottom: '4px' }}>{rule.title}</strong>
                            <span style={{ fontSize: '13px', color: '#64748B' }}>{rule.subtitle}</span>
                          </div>
                        </div>
                      </td>
                      <td style={{ padding: '20px', fontSize: '14px', color: '#64748B', width: '35%', lineHeight: '1.5' }}>
                        {rule.description}
                      </td>
                      <td style={{ padding: '20px' }}>
                        <span style={{ display: 'inline-block', background: rule.priority === 'Mandatory' ? '#312E81' : '#f1f5f9', color: rule.priority === 'Mandatory' ? '#fff' : '#64748B', padding: '6px 14px', borderRadius: '9999px', fontSize: '12px', fontWeight: '600' }}>
                          {rule.priority}
                        </span>
                      </td>
                      <td style={{ padding: '20px' }}>
                        <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: rule.status === 'Active' ? '#dcfce7' : '#f1f5f9', color: rule.status === 'Active' ? '#16A34A' : '#64748b', padding: '6px 14px', borderRadius: '9999px', fontSize: '12px', fontWeight: '600' }}>
                          {rule.status === 'Active' ? (
                            <><span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#16A34A' }}></span> Active</>
                          ) : (
                            <><PauseCircle size={14} /> Paused</>
                          )}
                        </span>
                      </td>
                      <td style={{ padding: '20px', textAlign: 'right', borderTopRightRadius: '12px', borderBottomRightRadius: '12px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '8px' }}>
                          <button onClick={() => addToast("View rule details", "info")} style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer', padding: '8px', borderRadius: '8px', transition: 'all 0.2s' }} onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#f1f5f9'; e.currentTarget.style.color = '#334155'; }} onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.color = '#94a3b8'; }}><Eye size={18} /></button>
                          <button onClick={() => addToast("Edit rule", "info")} style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer', padding: '8px', borderRadius: '8px', transition: 'all 0.2s' }} onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#f1f5f9'; e.currentTarget.style.color = '#334155'; }} onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.color = '#94a3b8'; }}><Pencil size={18} /></button>
                          <button onClick={() => addToast("More options", "info")} style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer', padding: '8px', borderRadius: '8px', transition: 'all 0.2s' }} onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#f1f5f9'; e.currentTarget.style.color = '#334155'; }} onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.color = '#94a3b8'; }}><MoreVertical size={18} /></button>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {rules.length === 0 && (
                    <tr>
                      <td colSpan="5" style={{ padding: '40px', textAlign: 'center', color: '#64748b' }}>No validation rules configured.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Bottom Action Bar */}
          <div style={{ background: '#1e1b4b', borderRadius: '8px', padding: '16px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '8px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <ShieldCheck size={24} style={{ color: '#c7d2fe' }} />
              <div>
                <strong style={{ display: 'block', fontSize: '13px', color: '#fff', margin: '0 0 2px' }}>End-to-End Encryption Enabled</strong>
                <span style={{ fontSize: '11px', color: '#a5b4fc' }}>All bank account modifications require multi-factor authorization.</span>
              </div>
            </div>
            
            <div style={{ display: 'flex', gap: '12px' }}>
              <button 
                onClick={handleDiscard}
                disabled={isSaving}
                type="button" 
                style={{ padding: '0 20px', height: '36px', background: 'transparent', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '4px', fontSize: '11px', fontWeight: '800', color: '#fff', textTransform: 'uppercase', letterSpacing: '0.5px', cursor: isSaving ? 'not-allowed' : 'pointer', opacity: isSaving ? 0.6 : 1 }}
              >
                Discard Changes
              </button>
              <button 
                onClick={handleSave}
                disabled={isSaving}
                type="button" 
                style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '0 24px', height: '36px', background: '#fff', border: 'none', borderRadius: '4px', fontSize: '11px', fontWeight: '800', color: '#1e1b4b', textTransform: 'uppercase', letterSpacing: '0.5px', cursor: isSaving ? 'not-allowed' : 'pointer', opacity: isSaving ? 0.8 : 1 }}
              >
                {isSaving && <Loader2 size={14} className="animate-spin" />}
                Save Settings
              </button>
            </div>
          </div>

        </div>

        {/* Add Custom Rule Modal */}
        {isModalOpen && (
          <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(15, 23, 42, 0.5)', backdropFilter: 'blur(4px)', zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px' }}>
            <div className="animate-in zoom-in-95 duration-200" style={{ background: '#fff', borderRadius: '12px', width: '100%', maxWidth: '500px', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)' }}>
              
              <div style={{ padding: '20px 24px', borderBottom: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <h3 style={{ fontSize: '18px', fontWeight: '800', color: 'var(--text)', margin: '0 0 4px' }}>Add Custom Rule</h3>
                  <p style={{ fontSize: '13px', color: 'var(--muted)', margin: 0 }}>Create a new bank account validation check.</p>
                </div>
                <button onClick={() => setIsModalOpen(false)} style={{ background: '#f1f5f9', border: 'none', width: '32px', height: '32px', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: 'var(--muted)' }}>
                  <X size={18} />
                </button>
              </div>

              <form onSubmit={handleAddRule} style={{ padding: '24px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  
                  <div style={{ display: 'flex', gap: '16px' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', flex: 1 }}>
                      <label style={{ fontSize: '12px', fontWeight: '800', color: 'var(--text)' }}>Rule Title</label>
                      <input 
                        type="text" 
                        placeholder="e.g. AML Screening"
                        value={newRule.title}
                        onChange={e => setNewRule({...newRule, title: e.target.value})}
                        style={{ width: '100%', height: '44px', padding: '0 12px', border: '1px solid #e2e8f0', borderRadius: '6px', fontSize: '13px', color: 'var(--text)', outline: 'none' }}
                        required
                      />
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', flex: 1 }}>
                      <label style={{ fontSize: '12px', fontWeight: '800', color: 'var(--text)' }}>Subtitle</label>
                      <input 
                        type="text" 
                        placeholder="e.g. Identity Check"
                        value={newRule.subtitle}
                        onChange={e => setNewRule({...newRule, subtitle: e.target.value})}
                        style={{ width: '100%', height: '44px', padding: '0 12px', border: '1px solid #e2e8f0', borderRadius: '6px', fontSize: '13px', color: 'var(--text)', outline: 'none' }}
                      />
                    </div>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <label style={{ fontSize: '12px', fontWeight: '800', color: 'var(--text)' }}>Rule Description</label>
                    <textarea 
                      placeholder="Explain what this validation rule checks..."
                      value={newRule.description}
                      onChange={e => setNewRule({...newRule, description: e.target.value})}
                      rows={3}
                      style={{ width: '100%', padding: '12px', border: '1px solid #e2e8f0', borderRadius: '6px', fontSize: '13px', color: 'var(--text)', outline: 'none', resize: 'none' }}
                      required
                    />
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      <label style={{ fontSize: '12px', fontWeight: '800', color: 'var(--text)' }}>Priority</label>
                      <Select
                        value={newRule.priority}
                        onChange={e => setNewRule({...newRule, priority: e.target.value})}
                        style={{ width: '100%', height: '44px', padding: '0 12px', border: '1px solid #e2e8f0', borderRadius: '6px', fontSize: '13px', color: 'var(--text)', outline: 'none', backgroundColor: '#fff' }}
                        options={[{ label: "Mandatory", value: "Mandatory" }, { label: "Optional", value: "Optional" }]} 
                      />
                    </div>
                    
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      <label style={{ fontSize: '12px', fontWeight: '800', color: 'var(--text)' }}>Status</label>
                      <Select
                        value={newRule.status}
                        onChange={e => setNewRule({...newRule, status: e.target.value})}
                        style={{ width: '100%', height: '44px', padding: '0 12px', border: '1px solid #e2e8f0', borderRadius: '6px', fontSize: '13px', color: 'var(--text)', outline: 'none', backgroundColor: '#fff' }}
                        options={[{ label: "Active", value: "Active" }, { label: "Paused", value: "Paused" }]} 
                      />
                    </div>
                  </div>

                </div>
                
                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '32px' }}>
                  <button type="button" onClick={() => setIsModalOpen(false)} style={{ padding: '0 20px', height: '44px', background: '#fff', border: '1px solid #e2e8f0', borderRadius: '6px', fontSize: '13px', fontWeight: '700', color: 'var(--text)', cursor: 'pointer' }}>
                    Cancel
                  </button>
                  <button type="submit" style={{ padding: '0 24px', height: '44px', background: '#312E81', border: 'none', borderRadius: '6px', fontSize: '13px', fontWeight: '700', color: '#fff', cursor: 'pointer' }}>
                    Add Rule
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
