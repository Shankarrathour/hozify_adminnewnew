import React, { useState } from 'react';
import { CheckCircle, AlertTriangle, Play, RefreshCw, Eye, Download } from 'lucide-react';
import AdminShell from '../../components/layouts/AdminShell';
import { mockReconciliation } from './data/mockData';

export default function FinancialReconciliation() {
  const [data, setData] = useState(mockReconciliation);
  const [filterStatus, setFilterStatus] = useState('All');
  const [reconciling, setReconciling] = useState(false);

  const handleReconcileAll = () => {
    setReconciling(true);
    setTimeout(() => {
      // simulate reconciliation update
      const updated = data.map(item => {
        if (item.status === 'Pending Review') {
          return { ...item, status: 'Matched', difference: 0.00, gatewayTotal: item.walletTotal };
        }
        return item;
      });
      setData(updated);
      setReconciling(false);
      alert('Reconciliation process completed! All mismatches verified and resolved.');
    }, 1500);
  };

  const getFilteredData = () => {
    if (filterStatus === 'All') return data;
    return data.filter(item => item.status === filterStatus);
  };

  const filteredReconciliation = getFilteredData();

  return (
    <AdminShell
      activeTab="Wallet Management"
      brandText="HOZIFY Wallet"
      brandSubText="Global Ledger v1.2"
      searchPlaceholder="Search reconciliations..."
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-section)', padding: '24px 0' }}>
        
        {/* Title & Actions */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <h1 style={{ fontSize: '24px', fontWeight: '800', color: 'var(--text)', margin: 0 }}>
              Financial Reconciliation Dashboard
            </h1>
            <p style={{ fontSize: '13px', color: 'var(--muted)', margin: '4px 0 0' }}>
              Automated ledger vs gateway balance auditing and discrepancy alerts.
            </p>
          </div>

          <button
            onClick={handleReconcileAll}
            disabled={reconciling}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              border: 'none',
              background: 'var(--primary)',
              color: '#fff',
              fontSize: '12px',
              fontWeight: '750',
              height: '38px',
              padding: '0 16px',
              borderRadius: '6px',
              cursor: reconciling ? 'not-allowed' : 'pointer',
              opacity: reconciling ? 0.7 : 1
            }}
          >
            <RefreshCw size={14} className={reconciling ? 'animate-spin' : ''} />
            <span>{reconciling ? 'Auditing...' : 'Run Reconciliation Audit'}</span>
          </button>
        </div>

        {/* Audit Stats Panel */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
          <div className="panel" style={{ padding: '20px' }}>
            <span style={{ fontSize: '10px', fontWeight: '800', color: 'var(--muted)', textTransform: 'uppercase' }}>Overall Match Rate</span>
            <strong style={{ display: 'block', fontSize: '26px', fontWeight: '850', color: 'var(--green)', marginTop: '8px' }}>99.2%</strong>
            <span style={{ display: 'block', fontSize: '11px', color: 'var(--muted)', marginTop: '6px' }}>+0.4% from last week</span>
          </div>

          <div className="panel" style={{ padding: '20px' }}>
            <span style={{ fontSize: '10px', fontWeight: '800', color: 'var(--muted)', textTransform: 'uppercase' }}>Unresolved Mismatches</span>
            <strong style={{ display: 'block', fontSize: '26px', fontWeight: '850', color: 'var(--red)', marginTop: '8px' }}>1 Alert</strong>
            <span style={{ display: 'block', fontSize: '11px', color: 'var(--muted)', marginTop: '6px' }}>Requires manual ledger entry</span>
          </div>

          <div className="panel" style={{ padding: '20px' }}>
            <span style={{ fontSize: '10px', fontWeight: '800', color: 'var(--muted)', textTransform: 'uppercase' }}>Total Gateway Audited</span>
            <strong style={{ display: 'block', fontSize: '26px', fontWeight: '850', color: 'var(--text)', marginTop: '8px' }}>₹36,41,800.50</strong>
            <span style={{ display: 'block', fontSize: '11px', color: 'var(--muted)', marginTop: '6px' }}>Across 4 active gateways</span>
          </div>
        </div>

        {/* Filter bar */}
        <div className="panel" style={{ padding: '16px', display: 'flex', gap: '12px', alignItems: 'center' }}>
          <span style={{ fontSize: '11px', fontWeight: '800', color: 'var(--muted)', textTransform: 'uppercase' }}>Filter status</span>
          <div style={{ display: 'flex', gap: '8px' }}>
            {['All', 'Matched', 'Unmatched', 'Pending Review'].map((status) => (
              <button
                key={status}
                onClick={() => setFilterStatus(status)}
                style={{
                  border: filterStatus === status ? 'none' : '1.5px solid #25108f',
                  background: filterStatus === status ? '#25108f' : '#fff',
                  color: filterStatus === status ? '#fff' : 'var(--text)',
                  padding: '6px 12px',
                  borderRadius: '4px',
                  fontSize: '11px',
                  fontWeight: '750',
                  cursor: 'pointer'
                }}
              >
                {status}
              </button>
            ))}
          </div>
        </div>

        {/* Ledger */}
        <div className="panel" style={{ padding: 'var(--spacing-section)' }}>
          <div className="table-wrap">
            <div className="table-responsive-wrapper">
<table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px', textAlign: 'left' }}>
              <thead>
                <tr style={{ background: '#f4eff8', borderBottom: '1.5px solid #25108f' }}>
                  <th style={{ padding: '12px 16px', color: 'var(--muted)', fontWeight: '800', textTransform: 'uppercase', fontSize: '10px' }}>Reconciliation Date</th>
                  <th style={{ padding: '12px 16px', color: 'var(--muted)', fontWeight: '800', textTransform: 'uppercase', fontSize: '10px' }}>Gateway aggregate</th>
                  <th style={{ padding: '12px 16px', color: 'var(--muted)', fontWeight: '800', textTransform: 'uppercase', fontSize: '10px' }}>Wallet ledger total</th>
                  <th style={{ padding: '12px 16px', color: 'var(--muted)', fontWeight: '800', textTransform: 'uppercase', fontSize: '10px' }}>Difference</th>
                  <th style={{ padding: '12px 16px', color: 'var(--muted)', fontWeight: '800', textTransform: 'uppercase', fontSize: '10px' }}>Audit Status</th>
                  <th style={{ padding: '12px 16px', color: 'var(--muted)', fontWeight: '800', textTransform: 'uppercase', fontSize: '10px', textAlign: 'right' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredReconciliation.map((item) => {
                  const hasDiff = item.difference !== 0;
                  return (
                    <tr key={item.id} style={{ borderBottom: '1px solid var(--lavender)' }}>
                      <td style={{ padding: '16px', fontWeight: '750' }}>{item.date}</td>
                      <td style={{ padding: '16px', fontWeight: '700' }}>₹{item.gatewayTotal.toLocaleString('en-IN')}</td>
                      <td style={{ padding: '16px', fontWeight: '700' }}>₹{item.walletTotal.toLocaleString('en-IN')}</td>
                      <td style={{ padding: '16px', fontWeight: '850', color: hasDiff ? '#d32929' : '#07956f' }}>
                        {hasDiff ? (item.difference > 0 ? `+₹${item.difference.toLocaleString('en-IN')}` : `-₹${Math.abs(item.difference).toLocaleString('en-IN')}`) : '₹0.00'}
                      </td>
                      <td style={{ padding: '16px' }}>
                        <span style={{
                          fontSize: '9px',
                          fontWeight: '850',
                          background: item.status === 'Matched' ? '#ecfdf5' : item.status === 'Unmatched' ? '#fee2e2' : '#fffbeb',
                          color: item.status === 'Matched' ? '#07956f' : item.status === 'Unmatched' ? '#d32929' : '#b45309',
                          padding: '3px 8px',
                          borderRadius: '4px',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '4px'
                        }}>
                          {item.status === 'Matched' ? <CheckCircle size={10} /> : <AlertTriangle size={10} />}
                          {item.status.toUpperCase()}
                        </span>
                      </td>
                      <td style={{ padding: '16px', textAlign: 'right' }}>
                        <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
                          <button
                            onClick={() => alert(`Showing digital log details for audit batch ${item.id}`)}
                            style={{ border: '1.5px solid #25108f', background: '#fff', padding: '4px 8px', borderRadius: '4px', display: 'inline-flex', alignItems: 'center', gap: '4px', fontSize: '11px', cursor: 'pointer', fontWeight: '700' }}
                          >
                            <Eye size={12} />
                            <span>Logs</span>
                          </button>
                          {hasDiff && (
                            <button
                              onClick={() => alert(`Executing automatic adjustment payout sequence to balance discrepancy ₹${item.difference}`)}
                              style={{ border: 'none', background: 'var(--primary)', color: '#fff', padding: '4px 8px', borderRadius: '4px', display: 'inline-flex', alignItems: 'center', gap: '4px', fontSize: '11px', cursor: 'pointer', fontWeight: '700' }}
                            >
                              <Play size={12} />
                              <span>Fix Mismatch</span>
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
</div>
          </div>
        </div>

      </div>
    </AdminShell>
  );
}


