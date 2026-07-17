import React, { useState } from 'react';
import { ShieldCheck, Plus, ArrowLeft, RefreshCw } from 'lucide-react';
import AdminShell from '../../components/layouts/AdminShell';
import { useApp } from '../../hooks/useApp';
import { ROUTES } from '../../config/routes';
import { mockWallets, mockAuditLogs } from './data/mockData';

import Select from "../../components/ui/Select";

export default function WalletAdjustmentCenter() {
  const { navigate } = useApp();
  const [walletId, setWalletId] = useState(mockWallets[0].id);
  const [type, setType] = useState('Credit');
  const [amount, setAmount] = useState('');
  const [reason, setReason] = useState('Manual Compensation');
  const [remarks, setRemarks] = useState('');
  const [loading, setLoading] = useState(false);
  const [logs, setLogs] = useState(mockAuditLogs);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!amount || Number(amount) <= 0) {
      alert('Please enter a valid positive amount.');
      return;
    }

    setLoading(true);
    setTimeout(() => {
      const selectedWallet = mockWallets.find(w => w.id === walletId);
      const newLog = {
        id: `LOG-${Math.floor(1000 + Math.random() * 9000)}`,
        action: type === 'Credit' ? 'Credit Adjustment' : 'Debit Adjustment',
        admin: 'Sarah Jenkins (Current)',
        date: new Date().toISOString().replace('T', ' ').slice(0, 16),
        remarks: `Manual ${type.toLowerCase()} of ₹${amount} applied to ${selectedWallet?.owner || walletId}. Reason: ${reason}. Note: ${remarks}`
      };

      setLogs([newLog, ...logs]);
      setLoading(false);
      alert(`Successfully applied ${type.toLowerCase()} adjustment of ₹${amount} to ${selectedWallet?.owner || walletId}.`);
      
      // Reset form
      setAmount('');
      setRemarks('');
    }, 1000);
  };

  return (
    <AdminShell
      activeTab="Wallet Management"
      brandText="HOZIFY Wallet"
      brandSubText="Global Ledger v1.2"
      searchPlaceholder="Search adjustments..."
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-section)', padding: '24px 0' }}>
        
        {/* Navigation & Header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <button
            onClick={() => navigate(ROUTES.walletDashboard)}
            style={{ border: 'none', background: 'transparent', color: 'var(--muted)', display: 'flex', alignItems: 'center', cursor: 'pointer', padding: 0 }}
          >
            <ArrowLeft size={16} />
          </button>
          <span style={{ fontSize: '11px', color: 'var(--muted)', fontWeight: '750', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
            Wallet Management / Adjustment Center
          </span>
        </div>

        <div>
          <h1 style={{ fontSize: '24px', fontWeight: '800', color: 'var(--text)', margin: 0 }}>
            Wallet Adjustment Center
          </h1>
          <p style={{ fontSize: '13px', color: 'var(--muted)', margin: '4px 0 0' }}>
            Manually credit or debit partner and user wallets. All adjustments require reason categories and are logged in the master audit trail.
          </p>
        </div>

        {/* Form and Log trail grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1.8fr', gap: 'var(--spacing-section)', alignItems: 'start' }}>
          
          {/* LEFT: Adjustment Form */}
          <div className="panel" style={{ padding: 'var(--spacing-section)' }}>
            <h2 style={{ fontSize: '14px', fontWeight: '850', color: 'var(--text)', margin: '0 0 16px' }}>
              Create Adjustment Entry
            </h2>

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {/* Select Wallet */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label style={{ fontSize: '11px', fontWeight: '800', color: 'var(--muted)', textTransform: 'uppercase' }}>Target Wallet Owner</label>
                <Select
                  value={walletId}
                  onChange={(e) => setWalletId(e.target.value)}
                  options={mockWallets.map(w => ({
                    value: w.id,
                    label: `${w.owner} (${w.type} - Available: ₹${w.available.toLocaleString('en-IN')})`
                  }))}
                  style={{ border: '1.5px solid #25108f', background: '#fff', height: '38px', borderRadius: '6px', padding: '0 12px', fontSize: '13px', fontWeight: '700', outline: 'none' }}
                />
              </div>

              {/* Adjustment Type */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label style={{ fontSize: '11px', fontWeight: '800', color: 'var(--muted)', textTransform: 'uppercase' }}>Adjustment Type</label>
                <div style={{ display: 'flex', gap: '8px' }}>
                  {['Credit', 'Debit'].map((t) => (
                    <button
                      key={t}
                      type="button"
                      onClick={() => setType(t)}
                      style={{
                        flex: 1,
                        height: '38px',
                        border: type === t ? 'none' : '1.5px solid #25108f',
                        background: type === t ? (t === 'Credit' ? '#07956f' : '#d32929') : '#fff',
                        color: type === t ? '#fff' : 'var(--text)',
                        borderRadius: '6px',
                        fontSize: '12px',
                        fontWeight: '750',
                        cursor: 'pointer'
                      }}
                    >
                      {t === 'Credit' ? 'Add Funds (Credit)' : 'Deduct Funds (Debit)'}
                    </button>
                  ))}
                </div>
              </div>

              {/* Amount */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label style={{ fontSize: '11px', fontWeight: '800', color: 'var(--muted)', textTransform: 'uppercase' }}>Adjustment Amount (₹)</label>
                <input
                  type="number"
                  placeholder="Enter amount in ₹"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  style={{ border: '1.5px solid #25108f', height: '38px', borderRadius: '6px', padding: '0 12px', fontSize: '13px', outline: 'none' }}
                />
              </div>

              {/* Reason Category */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label style={{ fontSize: '11px', fontWeight: '800', color: 'var(--muted)', textTransform: 'uppercase' }}>Reason Category</label>
                <Select
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  style={{ border: '1.5px solid #25108f', background: '#fff', height: '38px', borderRadius: '6px', padding: '0 12px', fontSize: '13px', fontWeight: '700', outline: 'none' }}
                  options={[{
                    label: "Manual Compensation",
                    value: "Manual Compensation"
                  }, {
                    label: "SLA Resolution adjustment",
                    value: "SLA Resolution adjustment"
                  }, {
                    label: "Marketing Promotion Bonus",
                    value: "Marketing Promotion Bonus"
                  }, {
                    label: "Discrepancy Correction",
                    value: "Discrepancy Correction"
                  }, {
                    label: "Dispute Reversal",
                    value: "Dispute Reversal"
                  }]} />
              </div>

              {/* Remarks */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label style={{ fontSize: '11px', fontWeight: '800', color: 'var(--muted)', textTransform: 'uppercase' }}>Audit Remarks</label>
                <textarea
                  placeholder="Provide details for this manual audit..."
                  value={remarks}
                  onChange={(e) => setRemarks(e.target.value)}
                  rows={3}
                  style={{ border: '1.5px solid #25108f', borderRadius: '6px', padding: '10px 12px', fontSize: '13px', outline: 'none', resize: 'vertical' }}
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                style={{
                  height: '40px',
                  border: 'none',
                  background: 'var(--primary)',
                  color: '#fff',
                  borderRadius: '6px',
                  fontSize: '12px',
                  fontWeight: '750',
                  cursor: loading ? 'not-allowed' : 'pointer',
                  opacity: loading ? 0.7 : 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px'
                }}
              >
                {loading ? <RefreshCw size={14} className="animate-spin" /> : <ShieldCheck size={16} />}
                <span>Authorize & Apply Adjustment</span>
              </button>
            </form>
          </div>

          {/* RIGHT: Recent Adjustment Logs */}
          <div className="panel" style={{ padding: 'var(--spacing-section)' }}>
            <h2 style={{ fontSize: '14px', fontWeight: '850', color: 'var(--text)', margin: '0 0 16px' }}>
              Adjustment Audit Log (Recent Entries)
            </h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {logs.map((log) => (
                <div key={log.id} style={{ display: 'flex', flexDirection: 'column', gap: '6px', borderBottom: '1px solid var(--lavender)', paddingBottom: '12px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                    <span style={{ fontSize: '11px', fontWeight: '800', background: log.action.includes('Credit') ? '#ecfdf5' : '#fee2e2', color: log.action.includes('Credit') ? '#07956f' : '#d32929', padding: '2px 6px', borderRadius: '4px' }}>
                      {log.action.toUpperCase()}
                    </span>
                    <span style={{ fontSize: '11px', color: 'var(--muted)' }}>{log.date}</span>
                  </div>
                  <p style={{ fontSize: '12.5px', color: 'var(--text)', margin: 0 }}>{log.remarks}</p>
                  <span style={{ fontSize: '11px', color: 'var(--muted)' }}>Authorized by: <strong>{log.admin}</strong> • {log.id}</span>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </AdminShell>
  );
}


