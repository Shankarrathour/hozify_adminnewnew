import React, { useState } from 'react';
import { ShieldAlert, AlertTriangle, ArrowLeft, RefreshCw, CheckCircle2 } from 'lucide-react';
import AdminShell from '../../components/layouts/AdminShell';
import { useApp } from '../../hooks/useApp';
import { ROUTES } from '../../config/routes';
import { mockWallets } from './data/mockData';

import Select from "../../components/ui/Select";

export default function WalletFreezeCenter() {
  const { navigate } = useApp();
  const [walletId, setWalletId] = useState(mockWallets[0].id);
  const [actionType, setActionType] = useState('Freeze');
  const [freezeReason, setFreezeReason] = useState('Suspected refund manipulation rule RFD-88');
  const [confirmPin, setConfirmPin] = useState('');
  const [loading, setLoading] = useState(false);

  const selectedWallet = mockWallets.find(w => w.id === walletId) || mockWallets[0];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (confirmPin !== '1234') {
      alert('Security authorization PIN incorrect. Please use confirmation code "1234".');
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      alert(`Wallet ID ${walletId} has been successfully ${actionType === 'Freeze' ? 'frozen and transactions locked' : 'unfrozen and activated'}.`);
      setConfirmPin('');
    }, 1000);
  };

  return (
    <AdminShell
      activeTab="Wallet Management"
      brandText="HOZIFY Wallet"
      brandSubText="Global Ledger v1.2"
      searchPlaceholder="Search fraud rules..."
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-section)', padding: '24px 0' }}>
        
        {/* Navigation back */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <button
            onClick={() => navigate(ROUTES.walletDashboard)}
            style={{ border: 'none', background: 'transparent', color: 'var(--muted)', display: 'flex', alignItems: 'center', cursor: 'pointer', padding: 0 }}
          >
            <ArrowLeft size={16} />
          </button>
          <span style={{ fontSize: '11px', color: 'var(--muted)', fontWeight: '750', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
            Wallet Management / Freeze Center
          </span>
        </div>

        <div>
          <h1 style={{ fontSize: '24px', fontWeight: '800', color: 'var(--text)', margin: 0 }}>
            Wallet Freeze Center
          </h1>
          <p style={{ fontSize: '13px', color: 'var(--muted)', margin: '4px 0 0' }}>
            Restrict payouts, suspend withdrawals, or lock digital balances for audit and investigation purposes.
          </p>
        </div>

        {/* Dynamic Grid Layout */}
        <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1.8fr', gap: 'var(--spacing-section)', alignItems: 'start' }}>
          
          {/* LEFT: Freeze/Unfreeze form */}
          <div className="panel" style={{ padding: 'var(--spacing-section)' }}>
            <h2 style={{ fontSize: '14px', fontWeight: '850', color: 'var(--text)', margin: '0 0 16px' }}>
              Account Lock Configurations
            </h2>

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label style={{ fontSize: '11px', fontWeight: '800', color: 'var(--muted)', textTransform: 'uppercase' }}>Select Target Wallet</label>
                <Select
                  value={walletId}
                  onChange={(e) => setWalletId(e.target.value)}
                  options={mockWallets.map(w => ({
                    value: w.id,
                    label: `${w.owner} (Status: ${w.status})`
                  }))}
                  style={{ border: '1.5px solid #25108f', background: '#fff', height: '38px', borderRadius: '6px', padding: '0 12px', fontSize: '13px', fontWeight: '700', outline: 'none' }}
                />
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label style={{ fontSize: '11px', fontWeight: '800', color: 'var(--muted)', textTransform: 'uppercase' }}>Security State Lock</label>
                <div style={{ display: 'flex', gap: '8px' }}>
                  {['Freeze', 'Unfreeze'].map((act) => (
                    <button
                      key={act}
                      type="button"
                      onClick={() => setActionType(act)}
                      style={{
                        flex: 1,
                        height: '38px',
                        border: actionType === act ? 'none' : '1.5px solid #25108f',
                        background: actionType === act ? (act === 'Freeze' ? '#d32929' : '#07956f') : '#fff',
                        color: actionType === act ? '#fff' : 'var(--text)',
                        borderRadius: '6px',
                        fontSize: '12px',
                        fontWeight: '750',
                        cursor: 'pointer'
                      }}
                    >
                      {act === 'Freeze' ? 'Lock Account' : 'Reactivate Account'}
                    </button>
                  ))}
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label style={{ fontSize: '11px', fontWeight: '800', color: 'var(--muted)', textTransform: 'uppercase' }}>Risk Reason for locking/unlocking</label>
                <Select
                  value={freezeReason}
                  onChange={(e) => setFreezeReason(e.target.value)}
                  style={{ border: '1.5px solid #25108f', background: '#fff', height: '38px', borderRadius: '6px', padding: '0 12px', fontSize: '13px', fontWeight: '700', outline: 'none' }}
                  options={[{
                    label: "Suspected refund manipulation rule RFD-88",
                    value: "Suspected refund manipulation rule RFD-88"
                  }, {
                    label: "Pending document validation update",
                    value: "Pending document validation update"
                  }, {
                    label: "Multiple dispute chargeback alerts from gateway",
                    value: "Multiple dispute chargeback alerts from gateway"
                  }, {
                    label: "SLA delay rate over SLA compliance baseline",
                    value: "SLA delay rate over SLA compliance baseline"
                  }]} />
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label style={{ fontSize: '11px', fontWeight: '800', color: 'var(--muted)', textTransform: 'uppercase' }}>Enter Security PIN (Use "1234")</label>
                <input
                  type="password"
                  placeholder="PIN code authorization"
                  value={confirmPin}
                  onChange={(e) => setConfirmPin(e.target.value)}
                  style={{ border: '1.5px solid #25108f', height: '38px', borderRadius: '6px', padding: '0 12px', fontSize: '13px', outline: 'none' }}
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                style={{
                  height: '40px',
                  border: 'none',
                  background: actionType === 'Freeze' ? '#d32929' : '#07956f',
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
                {loading ? <RefreshCw size={14} className="animate-spin" /> : <ShieldAlert size={16} />}
                <span>Authorize {actionType} Command</span>
              </button>
            </form>
          </div>

          {/* RIGHT: Current risk meter & observations */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            
            <div className="panel" style={{ padding: 'var(--spacing-section)', display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <h3 style={{ fontSize: '14px', fontWeight: '850', color: 'var(--text)', margin: 0 }}>
                Selected Target Security Index
              </h3>

              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <div style={{ position: 'relative', height: '80px', width: '80px', borderRadius: '50%', background: '#f4eff8', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '3px solid #25108f' }}>
                  <strong style={{ fontSize: '20px', color: 'var(--text)' }}>{selectedWallet.riskScore}%</strong>
                </div>
                <div>
                  <strong style={{ display: 'block', fontSize: '15px', color: 'var(--text)' }}>
                    Risk Score: {selectedWallet.riskScore > 70 ? 'High Risk Account' : 'Standard Account'}
                  </strong>
                  <span style={{ fontSize: '12px', color: 'var(--muted)', display: 'block', marginTop: '2px' }}>
                    Available Funds: ₹{selectedWallet.available.toLocaleString('en-IN')}
                  </span>
                  <span style={{ fontSize: '12px', color: 'var(--muted)', display: 'block' }}>
                    KYC status is: {selectedWallet.kyc}
                  </span>
                </div>
              </div>
            </div>

            <div className="panel" style={{ padding: 'var(--spacing-section)' }}>
              <h3 style={{ fontSize: '14px', fontWeight: '850', color: 'var(--text)', margin: '0 0 12px' }}>Observations & Compliance</h3>
              <p style={{ fontSize: '12.5px', color: 'var(--muted)', margin: 0, lineHeight: 1.5 }}>
                Locking a wallet suspends instant split payments and blocks manual or scheduled withdrawal batches. Release restrictions only after verifying identification documents or settling disputes.
              </p>
            </div>

          </div>

        </div>

      </div>
    </AdminShell>
  );
}


