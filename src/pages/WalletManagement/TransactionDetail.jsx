import React from 'react';
import { ArrowLeft, Printer, ShieldCheck, AlertOctagon, CornerUpLeft } from 'lucide-react';
import AdminShell from '../../components/layouts/AdminShell';
import { useApp } from '../../hooks/useApp';
import { ROUTES } from '../../config/routes';
import { mockTransactions } from './data/mockData';

export default function TransactionDetail() {
  const { navigate, params } = useApp();
  
  // Find transaction matching params.id, or fallback to first txn
  const txnId = params?.id || 'TXN-7741092';
  const transaction = mockTransactions.find(t => t.id === txnId) || mockTransactions[0];

  const handlePrint = () => {
    window.print();
  };

  const handleRefund = () => {
    alert(`Initiating refund protocol for transaction: ${transaction.id}. Redirecting to Refund Queue...`);
    navigate(ROUTES.walletRefunds);
  };

  const handleFlag = () => {
    alert(`Flagging transaction ${transaction.id} for manual compliance check...`);
  };

  const isCredit = transaction.type === 'Credit';

  return (
    <AdminShell
      activeTab="Wallet Management"
      brandText="HOZIFY Wallet"
      brandSubText="Global Ledger v1.2"
      searchPlaceholder="Search ledger..."
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-section)', padding: '24px 0' }}>
        
        {/* Header Navigation */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <button
              onClick={() => navigate(ROUTES.walletTransactions)}
              style={{ border: 'none', background: 'transparent', color: 'var(--muted)', display: 'flex', alignItems: 'center', cursor: 'pointer', padding: 0 }}
            >
              <ArrowLeft size={16} />
            </button>
            <span style={{ fontSize: '11px', color: 'var(--muted)', fontWeight: '750', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              Ledger / Transaction Detail
            </span>
          </div>

          <div style={{ display: 'flex', gap: '12px' }}>
            <button
              onClick={handlePrint}
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
              <Printer size={14} />
              <span>Print Receipt</span>
            </button>

            {transaction.status === 'Success' && !isCredit && (
              <button
                onClick={handleRefund}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  border: '1.5px solid #25108f',
                  background: '#fff',
                  color: 'var(--red)',
                  fontSize: '12px',
                  fontWeight: '750',
                  height: '36px',
                  padding: '0 16px',
                  borderRadius: '6px',
                  cursor: 'pointer'
                }}
              >
                <CornerUpLeft size={14} />
                <span>Issue Refund</span>
              </button>
            )}

            <button
              onClick={handleFlag}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                border: 'none',
                background: '#d32929',
                color: '#fff',
                fontSize: '12px',
                fontWeight: '750',
                height: '36px',
                padding: '0 16px',
                borderRadius: '6px',
                cursor: 'pointer'
              }}
            >
              <AlertOctagon size={14} />
              <span>Flag Transaction</span>
            </button>
          </div>
        </div>

        {/* Details Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '1.8fr 1.2fr', gap: '20px', alignItems: 'start' }}>
          
          {/* Main Transaction Receipt Summary */}
          <div className="panel" style={{ padding: 'var(--spacing-page)', display: 'flex', flexDirection: 'column', gap: 'var(--spacing-section)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <span style={{ fontSize: '12px', fontWeight: '800', color: 'var(--muted)', textTransform: 'uppercase' }}>HOZIFY OFFICIAL RECEIPT</span>
                <h2 style={{ fontSize: '20px', fontWeight: '800', color: 'var(--text)', margin: '4px 0 0' }}>Transaction #{transaction.id}</h2>
              </div>
              <span style={{
                fontSize: '10px',
                fontWeight: '850',
                background: transaction.status === 'Success' ? '#ecfdf5' : transaction.status === 'Pending' ? '#fffbeb' : '#fee2e2',
                color: transaction.status === 'Success' ? '#07956f' : transaction.status === 'Pending' ? '#b45309' : '#d32929',
                padding: '4px 10px',
                borderRadius: '4px',
                textTransform: 'uppercase'
              }}>
                {transaction.status}
              </span>
            </div>

            <hr style={{ border: 'none', borderBottom: '1.5px solid #25108f', margin: 0 }} />

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
              <div>
                <span style={{ fontSize: '11px', color: 'var(--muted)', fontWeight: '750', textTransform: 'uppercase' }}>Sender / Wallet ID</span>
                <strong style={{ display: 'block', fontSize: '14px', color: 'var(--text)', marginTop: '4px' }}>{transaction.owner}</strong>
                <span style={{ display: 'block', fontSize: '12px', color: 'var(--muted)', marginTop: '2px' }}>{transaction.walletId}</span>
              </div>
              <div>
                <span style={{ fontSize: '11px', color: 'var(--muted)', fontWeight: '750', textTransform: 'uppercase' }}>Timestamp</span>
                <strong style={{ display: 'block', fontSize: '14px', color: 'var(--text)', marginTop: '4px' }}>{transaction.date}</strong>
                <span style={{ display: 'block', fontSize: '12px', color: 'var(--muted)', marginTop: '2px' }}>System Timezone (IST)</span>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
              <div>
                <span style={{ fontSize: '11px', color: 'var(--muted)', fontWeight: '750', textTransform: 'uppercase' }}>Reference Description</span>
                <strong style={{ display: 'block', fontSize: '14px', color: 'var(--text)', marginTop: '4px' }}>{transaction.reference}</strong>
              </div>
              <div>
                <span style={{ fontSize: '11px', color: 'var(--muted)', fontWeight: '750', textTransform: 'uppercase' }}>Digital Flow Type</span>
                <strong style={{ display: 'block', fontSize: '14px', color: isCredit ? '#07956f' : '#d32929', marginTop: '4px' }}>
                  {transaction.type === 'Credit' ? 'CREDIT (+) INTO WALLET' : 'DEBIT (-) FROM WALLET'}
                </strong>
              </div>
            </div>

            <div style={{ background: '#f4eff8', borderRadius: '8px', padding: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <strong style={{ fontSize: '13px', color: 'var(--primary)', display: 'block' }}>Total Net Impact</strong>
                <span style={{ fontSize: '11px', color: 'var(--muted)' }}>Including gateway transaction splits</span>
              </div>
              <strong style={{ fontSize: '28px', fontWeight: '850', color: isCredit ? '#07956f' : '#d32929' }}>
                {isCredit ? '+' : '-'}₹{transaction.amount.toLocaleString('en-IN')}
              </strong>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', border: '1.5px solid #25108f', background: '#fafafa', padding: '12px', borderRadius: '6px' }}>
              <ShieldCheck size={18} style={{ color: 'var(--green)' }} />
              <span style={{ fontSize: '12px', color: 'var(--muted)' }}>
                Cryptographically signed ledger audit hash matching key: <code style={{ fontSize: '11px', fontWeight: 'bold' }}>{`0x${transaction.id.replace('-', '')}e8f99ab2c`}</code>
              </span>
            </div>

          </div>

          {/* Right audit properties pane */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            
            <div className="panel" style={{ padding: 'var(--spacing-section)', display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <h3 style={{ fontSize: '14px', fontWeight: '850', color: 'var(--text)', margin: 0 }}>System Indicators</h3>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '12px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '8px', borderBottom: '1.5px solid #25108f' }}>
                  <span style={{ color: 'var(--muted)' }}>Gateway Channel:</span>
                  <strong style={{ color: 'var(--text)' }}>Razorpay Split API</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '8px', borderBottom: '1.5px solid #25108f' }}>
                  <span style={{ color: 'var(--muted)' }}>Post-TX Balance:</span>
                  <strong style={{ color: 'var(--text)' }}>₹{transaction.balance.toLocaleString('en-IN')}</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '8px', borderBottom: '1.5px solid #25108f' }}>
                  <span style={{ color: 'var(--muted)' }}>Ledger Category:</span>
                  <strong style={{ color: 'var(--text)' }}>{transaction.source}</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--muted)' }}>Settlement Batch ID:</span>
                  <strong style={{ color: 'var(--primary)', textDecoration: 'underline', cursor: 'pointer' }} onClick={() => navigate(ROUTES.settlements)}>
                    SET-BATCH-99A
                  </strong>
                </div>
              </div>
            </div>

            <div className="panel" style={{ padding: 'var(--spacing-section)', display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <h3 style={{ fontSize: '14px', fontWeight: '850', color: 'var(--text)', margin: 0 }}>Security Auditing</h3>
              <p style={{ fontSize: '12px', color: 'var(--muted)', margin: 0 }}>
                This record was logged under IP address <code style={{ fontWeight: 'bold' }}>157.44.20.181</code> and signed off automatically by the auto-monitor engine.
              </p>
            </div>

          </div>

        </div>

      </div>
    </AdminShell>
  );
}


