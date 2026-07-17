import React, { useState } from 'react';
import { ArrowLeft, Wallet, ShieldAlert, CheckCircle, Clock, Settings, TrendingUp } from 'lucide-react';
import AdminShell from '../../components/layouts/AdminShell';
import { useApp } from '../../hooks/useApp';
import { ROUTES } from '../../config/routes';
import { mockWallets, mockTransactions, mockTimelineEvents } from './data/mockData';

export default function WalletDetails() {
  const { navigate, params } = useApp();
  const [activeTab, setActiveTab] = useState('Transactions');

  const walletId = params?.id || 'WLT-99201';
  const wallet = mockWallets.find(w => w.id === walletId) || mockWallets[0];

  const handleAdjustBalance = () => {
    navigate(ROUTES.walletAdjustment);
  };

  const handleFreezeToggle = () => {
    navigate(ROUTES.walletFreezeCenter);
  };

  // Filter transactions for this specific wallet
  const transactions = mockTransactions.filter(t => t.walletId === wallet.id);

  return (
    <AdminShell
      activeTab="Wallet Management"
      brandText="HOZIFY Wallet"
      brandSubText="Global Ledger v1.2"
      searchPlaceholder="Search wallet history..."
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-section)', padding: '24px 0' }}>
        
        {/* Navigation Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <button
              onClick={() => navigate(ROUTES.walletAll)}
              style={{ border: 'none', background: 'transparent', color: 'var(--muted)', display: 'flex', alignItems: 'center', cursor: 'pointer', padding: 0 }}
            >
              <ArrowLeft size={16} />
            </button>
            <span style={{ fontSize: '11px', color: 'var(--muted)', fontWeight: '750', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              Wallets / Detail Inspection
            </span>
          </div>

          <div style={{ display: 'flex', gap: '12px' }}>
            <button
              onClick={handleAdjustBalance}
              style={{ border: '1.5px solid #25108f', background: '#fff', fontSize: '12px', fontWeight: '750', height: '36px', padding: '0 16px', borderRadius: '6px', cursor: 'pointer' }}
            >
              Adjust Balance
            </button>
            <button
              onClick={handleFreezeToggle}
              style={{ border: 'none', background: '#d32929', color: '#fff', fontSize: '12px', fontWeight: '750', height: '36px', padding: '0 16px', borderRadius: '6px', cursor: 'pointer' }}
            >
              Freeze / Lock Wallet
            </button>
          </div>
        </div>

        {/* Profile Card Header */}
        <div className="panel" style={{ padding: 'var(--spacing-section)', display: 'flex', gap: '20px', alignItems: 'center', flexWrap: 'wrap' }}>
          <img src={wallet.avatar} alt={wallet.owner} style={{ height: '64px', width: '64px', borderRadius: '50%', objectFit: 'cover', border: '3px solid #25108f' }} />
          <div style={{ flex: 1 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
              <h2 style={{ fontSize: '20px', fontWeight: '800', color: 'var(--text)', margin: 0 }}>{wallet.owner}</h2>
              <span style={{ fontSize: '10px', fontWeight: '800', background: '#f4eff8', color: 'var(--primary)', padding: '2px 8px', borderRadius: '4px' }}>
                {wallet.type.toUpperCase()}
              </span>
              <span style={{ fontSize: '10px', fontWeight: '800', background: '#ecfdf5', color: 'var(--green)', padding: '2px 8px', borderRadius: '4px' }}>
                {wallet.kyc}
              </span>
            </div>
            <p style={{ fontSize: '13px', color: 'var(--muted)', margin: '4px 0 0' }}>
              Wallet ID: <strong>{wallet.id}</strong> • Registered Email: {wallet.email}
            </p>
          </div>
          <div>
            <span style={{
              fontSize: '11px',
              fontWeight: '850',
              background: wallet.status === 'Active' ? '#ecfdf5' : '#fee2e2',
              color: wallet.status === 'Active' ? '#07956f' : '#d32929',
              padding: '4px 12px',
              borderRadius: '6px'
            }}>
              {wallet.status.toUpperCase()}
            </span>
          </div>
        </div>

        {/* Balance KPI cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px' }}>
          <div className="panel" style={{ padding: '16px' }}>
            <span style={{ fontSize: '10px', fontWeight: '800', color: 'var(--muted)', textTransform: 'uppercase' }}>Available Balance</span>
            <strong style={{ display: 'block', fontSize: '20px', fontWeight: '850', color: 'var(--text)', marginTop: '8px' }}>
              ₹{wallet.available.toLocaleString('en-IN')}
            </strong>
          </div>
          <div className="panel" style={{ padding: '16px' }}>
            <span style={{ fontSize: '10px', fontWeight: '800', color: 'var(--muted)', textTransform: 'uppercase' }}>Frozen Balance</span>
            <strong style={{ display: 'block', fontSize: '20px', fontWeight: '850', color: 'var(--red)', marginTop: '8px' }}>
              ₹{wallet.frozen.toLocaleString('en-IN')}
            </strong>
          </div>
          <div className="panel" style={{ padding: '16px' }}>
            <span style={{ fontSize: '10px', fontWeight: '800', color: 'var(--muted)', textTransform: 'uppercase' }}>Lifetime Earnings</span>
            <strong style={{ display: 'block', fontSize: '20px', fontWeight: '850', color: 'var(--green)', marginTop: '8px' }}>
              ₹{wallet.lifetimeEarnings.toLocaleString('en-IN')}
            </strong>
          </div>
          <div className="panel" style={{ padding: '16px' }}>
            <span style={{ fontSize: '10px', fontWeight: '800', color: 'var(--muted)', textTransform: 'uppercase' }}>Withdrawn Payouts</span>
            <strong style={{ display: 'block', fontSize: '20px', fontWeight: '850', color: 'var(--text)', marginTop: '8px' }}>
              ₹{wallet.lifetimeWithdrawals.toLocaleString('en-IN')}
            </strong>
          </div>
        </div>

        {/* Tab Selection */}
        <div style={{ borderBottom: '1.5px solid #25108f', display: 'flex', gap: '20px' }}>
          {['Transactions', 'History & Audit Timeline', 'Settings & Limits'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              style={{
                border: 'none',
                background: 'transparent',
                padding: '12px 4px',
                fontSize: '13px',
                fontWeight: '750',
                color: activeTab === tab ? '#25108f' : 'var(--muted)',
                borderBottom: activeTab === tab ? '3px solid #25108f' : '3px solid transparent',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Dynamic Tab Panel */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {activeTab === 'Transactions' && (
            <div className="panel" style={{ padding: 'var(--spacing-section)' }}>
              <h3 style={{ fontSize: '14px', fontWeight: '850', color: 'var(--text)', margin: '0 0 16px' }}>Transaction History</h3>
              {transactions.length === 0 ? (
                <p style={{ fontSize: '13px', color: 'var(--muted)', margin: 0 }}>No transactions recorded for this wallet.</p>
              ) : (
                <div className="table-wrap">
                  <div className="table-responsive-wrapper">
<table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px', textAlign: 'left' }}>
                    <thead>
                      <tr style={{ background: '#f4eff8', borderBottom: '1.5px solid #25108f' }}>
                        <th style={{ padding: '10px 12px', color: 'var(--muted)', fontWeight: '800', textTransform: 'uppercase', fontSize: '10px' }}>Reference</th>
                        <th style={{ padding: '10px 12px', color: 'var(--muted)', fontWeight: '800', textTransform: 'uppercase', fontSize: '10px' }}>Type</th>
                        <th style={{ padding: '10px 12px', color: 'var(--muted)', fontWeight: '800', textTransform: 'uppercase', fontSize: '10px' }}>Amount</th>
                        <th style={{ padding: '10px 12px', color: 'var(--muted)', fontWeight: '800', textTransform: 'uppercase', fontSize: '10px' }}>Source</th>
                        <th style={{ padding: '10px 12px', color: 'var(--muted)', fontWeight: '800', textTransform: 'uppercase', fontSize: '10px' }}>Date</th>
                        <th style={{ padding: '10px 12px', color: 'var(--muted)', fontWeight: '800', textTransform: 'uppercase', fontSize: '10px', textAlign: 'right' }}>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {transactions.map((txn) => {
                        const isCredit = txn.type === 'Credit';
                        return (
                          <tr key={txn.id} style={{ borderBottom: '1px solid var(--lavender)' }}>
                            <td style={{ padding: '12px' }}>
                              <strong style={{ color: 'var(--primary)', textDecoration: 'underline', cursor: 'pointer' }} onClick={() => navigate(ROUTES.transactionDetail.replace(':id', txn.id))}>
                                #{txn.id}
                              </strong>
                              <span style={{ display: 'block', fontSize: '11px', color: 'var(--muted)', marginTop: '2px' }}>{txn.reference}</span>
                            </td>
                            <td style={{ padding: '12px', fontWeight: '700' }}>{txn.type}</td>
                            <td style={{ padding: '12px', fontWeight: '800', color: isCredit ? '#07956f' : '#d32929' }}>
                              {isCredit ? '+' : '-'}₹{txn.amount.toLocaleString('en-IN')}
                            </td>
                            <td style={{ padding: '12px' }}>{txn.source}</td>
                            <td style={{ padding: '12px', color: 'var(--muted)' }}>{txn.date}</td>
                            <td style={{ padding: '12px', textAlign: 'right' }}>
                              <span style={{
                                fontSize: '9px',
                                fontWeight: '850',
                                background: txn.status === 'Success' ? '#ecfdf5' : txn.status === 'Pending' ? '#fffbeb' : '#fee2e2',
                                color: txn.status === 'Success' ? '#07956f' : txn.status === 'Pending' ? '#b45309' : '#d32929',
                                padding: '2px 6px',
                                borderRadius: '4px'
                              }}>
                                {txn.status.toUpperCase()}
                              </span>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
</div>
                </div>
              )}
            </div>
          )}

          {activeTab === 'History & Audit Timeline' && (
            <div className="panel" style={{ padding: 'var(--spacing-section)' }}>
              <h3 style={{ fontSize: '14px', fontWeight: '850', color: 'var(--text)', margin: '0 0 20px' }}>Security Audit Log & Events</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', borderLeft: '2px solid var(--line)', paddingLeft: '20px', marginLeft: '10px' }}>
                {mockTimelineEvents.map((event) => (
                  <div key={event.id} style={{ position: 'relative' }}>
                    <div style={{
                      position: 'absolute',
                      left: '-26px',
                      top: '2px',
                      height: '10px',
                      width: '10px',
                      borderRadius: '50%',
                      background: 'var(--primary)'
                    }} />
                    <strong style={{ display: 'block', fontSize: '13px', color: 'var(--text)' }}>{event.label}</strong>
                    <span style={{ fontSize: '11px', color: 'var(--muted)' }}>{event.date}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'Settings & Limits' && (
            <div className="panel" style={{ padding: 'var(--spacing-section)' }}>
              <h3 style={{ fontSize: '14px', fontWeight: '850', color: 'var(--text)', margin: '0 0 16px' }}>Account Settings</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '13px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '8px', borderBottom: '1.5px solid #25108f' }}>
                  <span style={{ color: 'var(--muted)' }}>Auto Settlement Limit:</span>
                  <strong>₹50,000.00</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '8px', borderBottom: '1.5px solid #25108f' }}>
                  <span style={{ color: 'var(--muted)' }}>Minimum Payout Reserve:</span>
                  <strong>₹1,000.00</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--muted)' }}>Compliance Risk Threshold:</span>
                  <strong style={{ color: wallet.riskScore > 70 ? '#d32929' : 'var(--text)' }}>{wallet.riskScore}%</strong>
                </div>
              </div>
            </div>
          )}
        </div>

      </div>
    </AdminShell>
  );
}


