import React from 'react';
import {
  Wallet,
  CheckCircle,
  AlertTriangle,
  TrendingUp,
  Download,
  RefreshCw,
  Clock,
  ArrowRight,
  TrendingDown,
  ChevronRight
} from 'lucide-react';
import AdminShell from '../../components/layouts/AdminShell';
import { useApp } from '../../hooks/useApp';
import { ROUTES } from '../../config/routes';
import { mockTransactions, mockRefunds, mockWallets } from './data/mockData';

export default function WalletDashboard() {
  const { navigate } = useApp();

  const handleExport = () => {
    alert('Exporting Master Wallet Ledger...');
  };

  const handleReconcile = () => {
    navigate(ROUTES.walletReconciliation);
  };

  // 6 KPI cards calculations
  const totalBalance = mockWallets.reduce((sum, w) => sum + w.available, 0);
  const totalFrozen = mockWallets.reduce((sum, w) => sum + w.frozen, 0);
  const pendingSettlements = 482201; // Mock total pending settlements
  const totalTxCount = 48201;
  const refundAmount = 12400.50;
  const penaltyAmount = 6500.00;

  const kpis = [
    { title: 'Total Balance', value: `₹${totalBalance.toLocaleString('en-IN')}`, trend: '+12.4%', trendcolor: 'var(--green)', icon: Wallet, color: 'var(--primary)', bg: '#f4eff8' },
    { title: 'Frozen Amount', value: `₹${totalFrozen.toLocaleString('en-IN')}`, trend: 'Risk Alert', trendcolor: 'var(--red)', icon: AlertTriangle, color: 'var(--red)', bg: '#fee2e2' },
    { title: 'Pending Settlements', value: `₹${pendingSettlements.toLocaleString('en-IN')}`, trend: '14 Batches', trendColor: 'var(--muted)', icon: Clock, color: '#b45309', bg: '#fffbeb' },
    { title: 'TX Count', value: totalTxCount.toLocaleString('en-IN'), trend: 'Last 24h', trendColor: 'var(--muted)', icon: TrendingUp, color: '#1e40af', bg: '#eff6ff' },
    { title: 'Refunds', value: `-₹${refundAmount.toLocaleString('en-IN')}`, trend: '-2.1% MoM', trendcolor: 'var(--red)', icon: TrendingDown, color: '#9d174d', bg: '#fdf2f8' },
    { title: 'Penalties', value: `₹${penaltyAmount.toLocaleString('en-IN')}`, trend: 'Compliance', trendcolor: 'var(--green)', icon: CheckCircle, color: '#047857', bg: '#ecfdf5' }
  ];

  return (
    <AdminShell
      activeTab="Wallet Management"
      brandText="HOZIFY Wallet"
      brandSubText="Global Ledger v1.2"
      searchPlaceholder="Search transactions, wallets, or references..."
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-section)', padding: '24px 0' }}>
        
        {/* Title area & header buttons */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <h1 style={{ fontSize: '24px', fontWeight: '800', color: 'var(--text)', margin: 0 }}>
              Wallet Dashboard
            </h1>
            <p style={{ fontSize: '13px', color: 'var(--muted)', margin: '4px 0 0' }}>
              Real-time fiscal monitoring for Global Ledger v1.2
            </p>
          </div>

          <div style={{ display: 'flex', gap: '12px' }}>
            <button
              onClick={handleExport}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                border: '1.5px solid #25108f',
                background: '#fff',
                color: 'var(--text)',
                fontSize: '12px',
                fontWeight: '750',
                height: '36px',
                padding: '0 16px',
                borderRadius: '6px',
                cursor: 'pointer'
              }}
            >
              <Download size={14} />
              <span>Export Ledger</span>
            </button>
            <button
              onClick={handleReconcile}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                border: 'none',
                background: 'var(--primary)',
                color: '#fff',
                fontSize: '12px',
                fontWeight: '750',
                height: '36px',
                padding: '0 16px',
                borderRadius: '6px',
                cursor: 'pointer',
                boxShadow: '0 4px 10px rgba(37, 16, 143, 0.12)'
              }}
            >
              <RefreshCw size={14} />
              <span>Reconcile</span>
            </button>
          </div>
        </div>

        {/* 6 KPI Cards Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '16px' }}>
          {kpis.map((kpi, idx) => {
            const IconComponent = kpi.icon;
            return (
              <div key={idx} className="panel" style={{ padding: '20px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', minHeight: '120px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '10px', fontWeight: '800', color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                    {kpi.title}
                  </span>
                  <div style={{
                    height: '28px',
                    width: '28px',
                    borderRadius: '6px',
                    background: kpi.bg,
                    color: kpi.color,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <IconComponent size={14} />
                  </div>
                </div>
                <div style={{ marginTop: '12px' }}>
                  <strong style={{ fontSize: '20px', fontWeight: '850', color: 'var(--text)', display: 'block', letterSpacing: '-0.5px' }}>
                    {kpi.value}
                  </strong>
                  <span style={{ fontSize: '11px', fontWeight: '750', color: kpi.trendColor, display: 'block', marginTop: '4px' }}>
                    {kpi.trend}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Charts and Side Section */}
        <div style={{ display: 'grid', gridTemplateColumns: '1.6fr 1fr', gap: '20px', alignItems: 'stretch' }}>
          
          {/* LEFT: Growth and Trends Charts */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            
            {/* Wallet Growth (7D) */}
            <div className="panel" style={{ padding: 'var(--spacing-section)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <h2 style={{ fontSize: '14px', fontWeight: '850', color: 'var(--text)', margin: 0 }}>
                  Wallet Growth (7D)
                </h2>
                <div style={{ display: 'flex', background: '#f4eff8', borderRadius: '6px', padding: '3px', gap: '4px' }}>
                  {['Day', 'Week', 'Month'].map((tab) => (
                    <button
                      key={tab}
                      style={{
                        border: 'none',
                        background: tab === 'Week' ? '#25108f' : 'transparent',
                        color: tab === 'Week' ? '#fff' : 'var(--muted)',
                        padding: '4px 10px',
                        borderRadius: '4px',
                        fontSize: '11px',
                        fontWeight: '750',
                        cursor: 'pointer'
                      }}
                      onClick={() => alert(`Showing analytics by ${tab}`)}
                    >
                      {tab}
                    </button>
                  ))}
                </div>
              </div>

              {/* Responsive SVG Growth Curve */}
              <div style={{ height: '180px', position: 'relative', borderBottom: '1.5px solid #25108f', display: 'flex', alignItems: 'flex-end' }}>
                <svg width="100%" height="100%" viewBox="0 0 500 150" preserveAspectRatio="none" style={{ overflow: 'visible' }}>
                  {/* Wavy path */}
                  <path d="M 0 120 C 80 110, 150 130, 220 90 C 300 40, 380 100, 440 60 C 470 40, 500 20, 500 10" fill="none" stroke="#25108f" strokeWidth="2.5" strokeLinecap="round" />
                  {/* Grid Lines */}
                  <line x1="0" y1="50" x2="500" y2="50" stroke="#f4eff8" strokeWidth="1" strokeDasharray="4" />
                  <line x1="0" y1="100" x2="500" y2="100" stroke="#f4eff8" strokeWidth="1" strokeDasharray="4" />
                </svg>
                
                {/* Day labels */}
                <div style={{
                  position: 'absolute',
                  bottom: '-22px',
                  left: 0,
                  right: 0,
                  display: 'flex',
                  justifyContent: 'space-between',
                  fontSize: '10px',
                  color: 'var(--muted)',
                  fontWeight: '750'
                }}>
                  <span>Mon</span>
                  <span>Tue</span>
                  <span>Wed</span>
                  <span>Thu</span>
                  <span>Fri</span>
                  <span>Sat</span>
                  <span>Sun</span>
                </div>
              </div>
            </div>

            {/* Recent Transaction Ledger */}
            <div className="panel" style={{ padding: 'var(--spacing-section)' }}>
              <div style={{ display: 'flex', justifySelf: 'stretch', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                <h2 style={{ fontSize: '14px', fontWeight: '850', color: 'var(--text)', margin: 0 }}>
                  Recent Transaction Ledger
                </h2>
                <span
                  onClick={() => navigate(ROUTES.walletTransactions)}
                  style={{ fontSize: '12px', fontWeight: '800', color: 'var(--primary)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}
                >
                  <span>View Full History</span>
                  <ArrowRight size={13} />
                </span>
              </div>

              {/* Transactions list */}
              <div className="table-wrap">
                <div className="table-responsive-wrapper">
<table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px', textAlign: 'left' }}>
                  <thead>
                    <tr style={{ background: '#f4eff8', borderBottom: '1.5px solid #25108f' }}>
                      <th style={{ padding: '10px 12px', color: 'var(--muted)', fontWeight: '800', textTransform: 'uppercase', fontSize: '10px' }}>Timestamp</th>
                      <th style={{ padding: '10px 12px', color: 'var(--muted)', fontWeight: '800', textTransform: 'uppercase', fontSize: '10px' }}>Reference ID</th>
                      <th style={{ padding: '10px 12px', color: 'var(--muted)', fontWeight: '800', textTransform: 'uppercase', fontSize: '10px' }}>Counterparty</th>
                      <th style={{ padding: '10px 12px', color: 'var(--muted)', fontWeight: '800', textTransform: 'uppercase', fontSize: '10px' }}>Amount</th>
                      <th style={{ padding: '10px 12px', color: 'var(--muted)', fontWeight: '800', textTransform: 'uppercase', fontSize: '10px', textAlign: 'right' }}>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {mockTransactions.slice(0, 3).map((txn) => {
                      const isCredit = txn.type === 'Credit';
                      return (
                        <tr key={txn.id} style={{ borderBottom: '1px solid var(--lavender)' }}>
                          <td style={{ padding: '12px', color: 'var(--muted)', fontWeight: '650' }}>{txn.date}</td>
                          <td style={{ padding: '12px' }}>
                            <strong
                              style={{ color: 'var(--primary)', textDecoration: 'underline', cursor: 'pointer' }}
                              onClick={() => navigate(ROUTES.transactionDetail.replace(':id', txn.id))}
                            >
                              #{txn.id}
                            </strong>
                          </td>
                          <td style={{ padding: '12px', fontWeight: '750', color: 'var(--text)' }}>{txn.owner}</td>
                          <td style={{ padding: '12px', fontWeight: '850', color: isCredit ? '#07956f' : '#d32929' }}>
                            {isCredit ? '+' : '-'}₹{txn.amount.toLocaleString('en-IN')}
                          </td>
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
            </div>

          </div>

          {/* RIGHT: Cash Flow & Suspicious Activity Alerts */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            
            {/* Cash Flow Volume */}
            <div className="panel" style={{ padding: 'var(--spacing-section)', display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <h2 style={{ fontSize: '14px', fontWeight: '850', color: 'var(--text)', margin: 0 }}>
                Cash Flow Volume
              </h2>
              
              {/* Double-bar chart mockup */}
              <div style={{ height: '120px', display: 'flex', alignItems: 'flex-end', justifyContent: 'space-around', position: 'relative', borderBottom: '1.5px solid #25108f', paddingBottom: '6px' }}>
                <div style={{ display: 'flex', gap: '3px', alignItems: 'flex-end' }}>
                  <div style={{ width: '16px', height: '80px', background: 'var(--primary)', borderRadius: '2px 2px 0 0' }} />
                  <div style={{ width: '16px', height: '40px', background: '#d32929', borderRadius: '2px 2px 0 0' }} />
                </div>
                <div style={{ display: 'flex', gap: '3px', alignItems: 'flex-end' }}>
                  <div style={{ width: '16px', height: '95px', background: 'var(--primary)', borderRadius: '2px 2px 0 0' }} />
                  <div style={{ width: '16px', height: '65px', background: '#d32929', borderRadius: '2px 2px 0 0' }} />
                </div>
                <div style={{ display: 'flex', gap: '3px', alignItems: 'flex-end' }}>
                  <div style={{ width: '16px', height: '60px', background: 'var(--primary)', borderRadius: '2px 2px 0 0' }} />
                  <div style={{ width: '16px', height: '28px', background: '#d32929', borderRadius: '2px 2px 0 0' }} />
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', fontWeight: '750', color: 'var(--muted)' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <span style={{ height: '8px', width: '8px', background: 'var(--primary)', borderRadius: '50%' }} />
                  Credits
                </span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <span style={{ height: '8px', width: '8px', background: '#d32929', borderRadius: '50%' }} />
                  Debits
                </span>
              </div>
            </div>

            {/* Suspicious Activity */}
            <div className="panel" style={{ padding: 'var(--spacing-section)', display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h2 style={{ fontSize: '14px', fontWeight: '850', color: 'var(--text)', margin: 0, display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <AlertTriangle size={16} style={{ color: 'var(--red)' }} />
                  <span>Suspicious Activity</span>
                </h2>
                <span style={{ fontSize: '9px', fontWeight: '900', background: '#fee2e2', color: 'var(--red)', padding: '2px 6px', borderRadius: '4px' }}>
                  3 HIGH RISK
                </span>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div style={{ borderLeft: '3px solid #d32929', paddingLeft: '12px', background: '#fafafa', borderRadius: '0 4px 4px 0', padding: '10px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                    <strong style={{ fontSize: '12px', color: 'var(--text)' }}>Duplicate Settlement Attempt</strong>
                    <span style={{ fontSize: '10px', color: 'var(--red)', fontWeight: '750' }}>Just Now</span>
                  </div>
                  <span style={{ display: 'block', fontSize: '11px', color: 'var(--muted)', marginTop: '4px' }}>
                    Ref ID #TX-882194 - Source: IP 192.168.1.1
                  </span>
                  <div style={{ display: 'flex', gap: '8px', marginTop: '8px' }}>
                    <button style={{ border: 'none', background: 'transparent', color: 'var(--red)', fontSize: '11px', fontWeight: '800', cursor: 'pointer', padding: 0 }} onClick={() => navigate(ROUTES.walletFreezeCenter)}>Freeze</button>
                    <button style={{ border: 'none', background: 'transparent', color: 'var(--muted)', fontSize: '11px', fontWeight: '750', cursor: 'pointer', padding: 0 }} onClick={() => alert('Dismissed warning')}>Dismiss</button>
                  </div>
                </div>

                <div style={{ borderLeft: '3px solid #b45309', paddingLeft: '12px', background: '#fafafa', borderRadius: '0 4px 4px 0', padding: '10px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                    <strong style={{ fontSize: '12px', color: 'var(--text)' }}>Large Volume Transfer</strong>
                    <span style={{ fontSize: '10px', color: 'var(--muted)', fontWeight: '750' }}>2h ago</span>
                  </div>
                  <span style={{ display: 'block', fontSize: '11px', color: 'var(--muted)', marginTop: '4px' }}>
                    Cross-border payout to Bank of London.
                  </span>
                </div>
              </div>
            </div>

            {/* Open Refund Requests */}
            <div className="panel" style={{ padding: 'var(--spacing-section)', display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <h2 style={{ fontSize: '14px', fontWeight: '850', color: 'var(--text)', margin: 0 }}>
                Open Refund Requests
              </h2>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {mockRefunds.slice(0, 2).map((r) => (
                  <div key={r.id} style={{ display: 'flex', justifySelf: 'stretch', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '10px', borderBottom: '1px solid var(--lavender)' }}>
                    <div>
                      <strong style={{ display: 'block', fontSize: '13px', color: 'var(--text)' }}>{r.customer}</strong>
                      <span style={{ display: 'block', fontSize: '11px', color: 'var(--muted)', marginTop: '2px' }}>
                        ₹{r.amount.toLocaleString('en-IN')} • ID #{r.id}
                      </span>
                    </div>
                    <ChevronRight size={16} style={{ color: 'var(--muted)', cursor: 'pointer' }} onClick={() => navigate(ROUTES.walletRefunds)} />
                  </div>
                ))}
              </div>

              <button
                onClick={() => navigate(ROUTES.walletRefunds)}
                style={{
                  width: '100%',
                  border: '1.5px solid #25108f',
                  background: '#fff',
                  color: 'var(--text)',
                  fontSize: '12px',
                  fontWeight: '750',
                  height: '38px',
                  borderRadius: '6px',
                  cursor: 'pointer'
                }}
              >
                Approve All (2)
              </button>
            </div>

          </div>

        </div>

      </div>
    </AdminShell>
  );
}



