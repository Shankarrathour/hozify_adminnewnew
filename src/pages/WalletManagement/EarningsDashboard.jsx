import React, { useState } from 'react';
import { TrendingUp, RefreshCw, BarChart2, DollarSign, Wallet } from 'lucide-react';
import AdminShell from '../../components/layouts/AdminShell';
import { mockWallets } from './data/mockData';

export default function EarningsDashboard() {
  const [filterType, setFilterType] = useState('All');

  const getFilteredWallets = () => {
    if (filterType === 'All') return mockWallets;
    return mockWallets.filter(w => w.type === filterType);
  };

  const filteredWallets = getFilteredWallets();

  // Calculations
  const lifetimeTotal = mockWallets.reduce((sum, w) => sum + w.lifetimeEarnings, 0);
  const averageEarnings = lifetimeTotal / mockWallets.length;
  const totalPayouts = mockWallets.reduce((sum, w) => sum + w.lifetimeWithdrawals, 0);

  return (
    <AdminShell showGlobalExport={true}
      activeTab="Wallet Management"
      brandText="HOZIFY Wallet"
      brandSubText="Global Ledger v1.2"
      searchPlaceholder="Search earnings..."
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-section)', padding: '24px 0' }}>
        
        {/* Title */}
        <div>
          <h1 style={{ fontSize: '24px', fontWeight: '800', color: 'var(--text)', margin: 0 }}>
            Earnings Dashboard
          </h1>
          <p style={{ fontSize: '13px', color: 'var(--muted)', margin: '4px 0 0' }}>
            Audits of platform fee sharing rules, partner splits (65%), commissions (15%), and employee payouts (20%).
          </p>
        </div>

        {/* Highlight Stats */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px' }}>
          <div className="panel" style={{ padding: '20px' }}>
            <span style={{ fontSize: '10px', fontWeight: '800', color: 'var(--muted)', textTransform: 'uppercase' }}>Cumulative Earnings</span>
            <strong style={{ display: 'block', fontSize: '24px', fontWeight: '850', color: 'var(--primary)', marginTop: '8px' }}>
              ₹{lifetimeTotal.toLocaleString('en-IN')}
            </strong>
            <span style={{ display: 'block', fontSize: '11px', color: 'var(--green)', marginTop: '4px' }}>+18.4% YoY Growth</span>
          </div>

          <div className="panel" style={{ padding: '20px' }}>
            <span style={{ fontSize: '10px', fontWeight: '800', color: 'var(--muted)', textTransform: 'uppercase' }}>Platform Share (15%)</span>
            <strong style={{ display: 'block', fontSize: '24px', fontWeight: '850', color: 'var(--green)', marginTop: '8px' }}>
              ₹{(lifetimeTotal * 0.15).toLocaleString('en-IN')}
            </strong>
            <span style={{ display: 'block', fontSize: '11px', color: 'var(--muted)', marginTop: '4px' }}>Auto-deducted at gateway</span>
          </div>

          <div className="panel" style={{ padding: '20px' }}>
            <span style={{ fontSize: '10px', fontWeight: '800', color: 'var(--muted)', textTransform: 'uppercase' }}>Partner Share (65%)</span>
            <strong style={{ display: 'block', fontSize: '24px', fontWeight: '850', color: 'var(--text)', marginTop: '8px' }}>
              ₹{(lifetimeTotal * 0.65).toLocaleString('en-IN')}
            </strong>
            <span style={{ display: 'block', fontSize: '11px', color: 'var(--muted)', marginTop: '4px' }}>Distributed to 482 active partners</span>
          </div>

          <div className="panel" style={{ padding: '20px' }}>
            <span style={{ fontSize: '10px', fontWeight: '800', color: 'var(--muted)', textTransform: 'uppercase' }}>Total Processed Payouts</span>
            <strong style={{ display: 'block', fontSize: '24px', fontWeight: '850', color: 'var(--text)', marginTop: '8px' }}>
              ₹{totalPayouts.toLocaleString('en-IN')}
            </strong>
            <span style={{ display: 'block', fontSize: '11px', color: 'var(--green)', marginTop: '4px' }}>99.8% Payout Success Rate</span>
          </div>
        </div>

        {/* Charts and Share Distributions */}
        <div style={{ display: 'grid', gridTemplateColumns: '1.8fr 1.2fr', gap: '20px' }}>
          
          {/* Earnings Allocations by Entity */}
          <div className="panel" style={{ padding: 'var(--spacing-section)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '12px' }}>
              <h2 style={{ fontSize: '14px', fontWeight: '850', color: 'var(--text)', margin: 0 }}>
                Entity Earnings Catalog
              </h2>
              <div style={{ display: 'flex', gap: '6px' }}>
                {['All', 'Partner', 'User', 'Seller', 'Employee'].map((type) => (
                  <button
                    key={type}
                    onClick={() => setFilterType(type)}
                    style={{
                      border: filterType === type ? 'none' : '1.5px solid #25108f',
                      background: filterType === type ? '#25108f' : '#fff',
                      color: filterType === type ? '#fff' : 'var(--text)',
                      padding: '4px 10px',
                      borderRadius: '4px',
                      fontSize: '11px',
                      fontWeight: '750',
                      cursor: 'pointer'
                    }}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            <div className="table-wrap">
              <div className="table-responsive-wrapper">
<table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px', textAlign: 'left' }}>
                <thead>
                  <tr style={{ background: '#f4eff8', borderBottom: '1.5px solid #25108f' }}>
                    <th style={{ padding: '12px 16px', color: 'var(--muted)', fontWeight: '800', textTransform: 'uppercase', fontSize: '10px' }}>Owner</th>
                    <th style={{ padding: '12px 16px', color: 'var(--muted)', fontWeight: '800', textTransform: 'uppercase', fontSize: '10px' }}>Type</th>
                    <th style={{ padding: '12px 16px', color: 'var(--muted)', fontWeight: '800', textTransform: 'uppercase', fontSize: '10px' }}>Lifetime Earnings</th>
                    <th style={{ padding: '12px 16px', color: 'var(--muted)', fontWeight: '800', textTransform: 'uppercase', fontSize: '10px' }}>Payouts Withdrawn</th>
                    <th style={{ padding: '12px 16px', color: 'var(--muted)', fontWeight: '800', textTransform: 'uppercase', fontSize: '10px' }}>Wallet Balance</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredWallets.map((w) => (
                    <tr key={w.id} style={{ borderBottom: '1px solid var(--lavender)' }}>
                      <td style={{ padding: '16px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <img src={w.avatar} alt={w.owner} style={{ height: '32px', width: '32px', borderRadius: '50%', objectFit: 'cover' }} />
                          <div>
                            <strong style={{ display: 'block', color: 'var(--text)' }}>{w.owner}</strong>
                            <span style={{ fontSize: '11px', color: 'var(--muted)' }}>#{w.id}</span>
                          </div>
                        </div>
                      </td>
                      <td style={{ padding: '16px', fontWeight: '700' }}>{w.type}</td>
                      <td style={{ padding: '16px', fontWeight: '800', color: 'var(--green)' }}>₹{w.lifetimeEarnings.toLocaleString('en-IN')}</td>
                      <td style={{ padding: '16px', color: 'var(--muted)', fontWeight: '700' }}>₹{w.lifetimeWithdrawals.toLocaleString('en-IN')}</td>
                      <td style={{ padding: '16px', fontWeight: '800', color: 'var(--text)' }}>₹{w.available.toLocaleString('en-IN')}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
</div>
            </div>
          </div>

          {/* Right Distribution Breakdown */}
          <div className="panel" style={{ padding: 'var(--spacing-section)', display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <h2 style={{ fontSize: '14px', fontWeight: '850', color: 'var(--text)', margin: 0 }}>
              SLA Compliance Waivers
            </h2>
            <p style={{ fontSize: '12px', color: 'var(--muted)', margin: 0 }}>
              All earning metrics are adjusted relative to standard SLA compliance scores. Penalties auto-deduct from the Partner share index.
            </p>
            
            <div style={{ background: '#f4eff8', padding: '16px', borderRadius: '6px', display: 'flex', gap: '12px', alignItems: 'center' }}>
              <Wallet size={20} style={{ color: 'var(--primary)' }} />
              <div>
                <strong style={{ fontSize: '13px', color: 'var(--primary)', display: 'block' }}>Auto-Settlement Threshold</strong>
                <span style={{ fontSize: '11px', color: 'var(--muted)' }}>Threshold is set to ₹50,000</span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </AdminShell>
  );
}


