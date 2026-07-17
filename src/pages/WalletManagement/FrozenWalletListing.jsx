import React, { useState } from 'react';
import { ShieldAlert, Unlock, Search, Eye, AlertTriangle } from 'lucide-react';
import AdminShell from '../../components/layouts/AdminShell';
import { useApp } from '../../hooks/useApp';
import { ROUTES } from '../../config/routes';
import { mockWallets } from './data/mockData';

export default function FrozenWalletListing() {
  const { navigate } = useApp();
  const [wallets, setWallets] = useState(mockWallets);
  const [searchTerm, setSearchTerm] = useState('');

  const handleUnfreeze = (id) => {
    if (window.confirm(`Initiate unfreeze security check for Wallet ID ${id}?`)) {
      setWallets(prev => prev.map(w => w.id === id ? { ...w, status: 'Active', frozen: 0.00 } : w));
      alert(`Wallet ${id} unfreeze request approved! Status set to Active.`);
    }
  };

  const getFrozenWallets = () => {
    return wallets.filter(w => {
      const isFrozen = w.status === 'Frozen' || w.frozen > 0;
      const matchesSearch = w.owner.toLowerCase().includes(searchTerm.toLowerCase()) || w.id.toLowerCase().includes(searchTerm.toLowerCase());
      return isFrozen && matchesSearch;
    });
  };

  const frozenList = getFrozenWallets();

  return (
    <AdminShell
      activeTab="Wallet Management"
      brandText="HOZIFY Wallet"
      brandSubText="Global Ledger v1.2"
      searchPlaceholder="Search frozen wallets..."
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-section)', padding: '24px 0' }}>
        
        {/* Title Block */}
        <div>
          <h1 style={{ fontSize: '24px', fontWeight: '800', color: 'var(--text)', margin: 0 }}>
            Frozen Wallet Listing
          </h1>
          <p style={{ fontSize: '13px', color: 'var(--muted)', margin: '4px 0 0' }}>
            Index of all frozen/restricted entities under audit observation. Access unfreeze configuration controls here.
          </p>
        </div>

        {/* Warning Indicator Banner */}
        <div style={{ background: '#fee2e2', border: '1px solid #fca5a5', padding: '16px', borderRadius: '8px', display: 'flex', gap: '12px', alignItems: 'center' }}>
          <AlertTriangle size={20} style={{ color: 'var(--red)', flexShrink: 0 }} />
          <div style={{ fontSize: '13px', color: '#991b1b' }}>
            <strong>Risk Warning:</strong> Unfreezing wallets releases standard transaction processing limitations. Ensure all KYC review standards and manual audits are strictly passed before authorizing payouts.
          </div>
        </div>

        {/* Search filter bar */}
        <div className="panel" style={{ padding: '16px', display: 'flex', gap: '12px', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', border: '1.5px solid #25108f', background: '#fff', height: '36px', padding: '0 12px', borderRadius: '6px', flex: 1 }}>
            <Search size={14} style={{ color: 'var(--muted)' }} />
            <input
              placeholder="Search by owner name or wallet reference ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{ border: 'none', background: 'transparent', outline: 'none', fontSize: '13px', width: '100%' }}
            />
          </div>
        </div>

        {/* Frozen List Table */}
        <div className="panel" style={{ padding: 'var(--spacing-section)' }}>
          <div className="table-wrap">
            <div className="table-responsive-wrapper">
<table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px', textAlign: 'left' }}>
              <thead>
                <tr style={{ background: '#f4eff8', borderBottom: '1.5px solid #25108f' }}>
                  <th style={{ padding: '12px 16px', color: 'var(--muted)', fontWeight: '800', textTransform: 'uppercase', fontSize: '10px' }}>Wallet ID</th>
                  <th style={{ padding: '12px 16px', color: 'var(--muted)', fontWeight: '800', textTransform: 'uppercase', fontSize: '10px' }}>Owner</th>
                  <th style={{ padding: '12px 16px', color: 'var(--muted)', fontWeight: '800', textTransform: 'uppercase', fontSize: '10px' }}>Role Type</th>
                  <th style={{ padding: '12px 16px', color: 'var(--muted)', fontWeight: '800', textTransform: 'uppercase', fontSize: '10px' }}>Frozen Funds</th>
                  <th style={{ padding: '12px 16px', color: 'var(--muted)', fontWeight: '800', textTransform: 'uppercase', fontSize: '10px' }}>Risk Assessment</th>
                  <th style={{ padding: '12px 16px', color: 'var(--muted)', fontWeight: '800', textTransform: 'uppercase', fontSize: '10px' }}>KYC Level</th>
                  <th style={{ padding: '12px 16px', color: 'var(--muted)', fontWeight: '800', textTransform: 'uppercase', fontSize: '10px' }}>Status</th>
                  <th style={{ padding: '12px 16px', color: 'var(--muted)', fontWeight: '800', textTransform: 'uppercase', fontSize: '10px', textAlign: 'right' }}>Controls</th>
                </tr>
              </thead>
              <tbody>
                {frozenList.map((w) => (
                  <tr key={w.id} style={{ borderBottom: '1px solid var(--lavender)' }}>
                    <td style={{ padding: '16px', fontWeight: '750' }}>#{w.id}</td>
                    <td style={{ padding: '16px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <img src={w.avatar} alt={w.owner} style={{ height: '32px', width: '32px', borderRadius: '50%', objectFit: 'cover' }} />
                        <div>
                          <strong style={{ display: 'block', color: 'var(--text)' }}>{w.owner}</strong>
                          <span style={{ fontSize: '11px', color: 'var(--muted)' }}>{w.email}</span>
                        </div>
                      </div>
                    </td>
                    <td style={{ padding: '16px', fontWeight: '700' }}>{w.type}</td>
                    <td style={{ padding: '16px', fontWeight: '850', color: 'var(--red)' }}>
                      ₹{(w.frozen || 20000.00).toLocaleString('en-IN')}
                    </td>
                    <td style={{ padding: '16px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <div style={{ flex: 1, background: '#f3f4f6', height: '6px', borderRadius: '3px', width: '60px', overflow: 'hidden' }}>
                          <div style={{ background: w.riskScore > 70 ? '#d32929' : '#b45309', height: '100%', width: `${w.riskScore}%` }} />
                        </div>
                        <span style={{ fontSize: '11px', fontWeight: '800', color: w.riskScore > 70 ? '#d32929' : '#b45309' }}>
                          {w.riskScore}%
                        </span>
                      </div>
                    </td>
                    <td style={{ padding: '16px', color: 'var(--muted)' }}>{w.kyc}</td>
                    <td style={{ padding: '16px' }}>
                      <span style={{
                        fontSize: '9px',
                        fontWeight: '850',
                        background: '#fee2e2',
                        color: 'var(--red)',
                        padding: '3px 8px',
                        borderRadius: '4px',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '4px'
                      }}>
                        <ShieldAlert size={10} />
                        FROZEN
                      </span>
                    </td>
                    <td style={{ padding: '16px', textAlign: 'right' }}>
                      <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
                        <button
                          onClick={() => navigate(ROUTES.walletDetails.replace(':id', w.id))}
                          style={{ border: '1.5px solid #25108f', background: '#fff', padding: '5px 10px', borderRadius: '4px', display: 'inline-flex', alignItems: 'center', gap: '4px', fontSize: '11px', cursor: 'pointer', fontWeight: '750' }}
                        >
                          <Eye size={12} />
                          <span>Inspect</span>
                        </button>
                        <button
                          onClick={() => handleUnfreeze(w.id)}
                          style={{ border: 'none', background: '#07956f', color: '#fff', padding: '5px 10px', borderRadius: '4px', display: 'inline-flex', alignItems: 'center', gap: '4px', fontSize: '11px', cursor: 'pointer', fontWeight: '750' }}
                        >
                          <Unlock size={12} />
                          <span>Unfreeze</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
</div>
          </div>
        </div>

      </div>
    </AdminShell>
  );
}


