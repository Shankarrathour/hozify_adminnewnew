import React, { useState } from 'react';
import AdminShell from '../../../../../components/layouts/AdminShell';
import { mockPayments } from '../data/mockData';
import { Eye, X } from 'lucide-react';

export default function AdminPaymentsPage() {
  const [viewPayment, setViewPayment] = useState(null);

  return (
    <AdminShell headerTitle="Payments Ledger" activeTab="Payments Ledger">
      <div style={{ padding: '24px' }}>
        <h1 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '24px' }}>Payments Ledger</h1>
        
        <div style={{ background: '#fff', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 2px 10px rgba(0,0,0,0.05)', border: '1px solid #e2e8f0' }}>
          <div className="table-responsive-wrapper">
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
              <thead>
                <tr style={{ background: '#f8fafc', borderBottom: '1px solid #e2e8f0' }}>
                  <th style={{ padding: '16px', fontWeight: 'bold', color: '#475569' }}>TXN ID</th>
                  <th style={{ padding: '16px', fontWeight: 'bold', color: '#475569' }}>ORDER ID</th>
                  <th style={{ padding: '16px', fontWeight: 'bold', color: '#475569' }}>AMOUNT</th>
                  <th style={{ padding: '16px', fontWeight: 'bold', color: '#475569' }}>METHOD</th>
                  <th style={{ padding: '16px', fontWeight: 'bold', color: '#475569' }}>DATE</th>
                  <th style={{ padding: '16px', fontWeight: 'bold', color: '#475569' }}>STATUS</th>
                  <th style={{ padding: '16px', fontWeight: 'bold', color: '#475569', textAlign: 'right' }}>ACTIONS</th>
                </tr>
              </thead>
              <tbody>
                {mockPayments.map(payment => (
                  <tr key={payment.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                    <td style={{ padding: '16px', fontWeight: 'bold' }}>{payment.id}</td>
                    <td style={{ padding: '16px', color: '#4f46e5', fontWeight: 'bold' }}>{payment.orderId}</td>
                    <td style={{ padding: '16px', fontWeight: 'bold' }}>₹{payment.amount}</td>
                    <td style={{ padding: '16px' }}>{payment.method}</td>
                    <td style={{ padding: '16px', color: '#64748b' }}>{payment.date}</td>
                    <td style={{ padding: '16px' }}>
                      <span style={{ 
                        padding: '4px 8px', 
                        background: payment.status === 'Success' ? '#d1fae5' : payment.status === 'Failed' ? '#fee2e2' : '#fef3c7', 
                        color: payment.status === 'Success' ? '#065f46' : payment.status === 'Failed' ? '#991b1b' : '#92400e', 
                        borderRadius: '4px', fontSize: '12px', fontWeight: 'bold' 
                      }}>
                        {payment.status}
                      </span>
                    </td>
                    <td style={{ padding: '16px', textAlign: 'right' }}>
                      <button onClick={() => setViewPayment(payment)} style={{ background: 'transparent', border: 'none', cursor: 'pointer', padding: '4px' }} title="View Details"><Eye size={18} /></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* View Modal */}
        {viewPayment && (
          <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 9999 }}>
            <div style={{ background: '#fff', borderRadius: '12px', width: '90%', maxWidth: '500px', boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)' }}>
              <div style={{ padding: '20px', borderBottom: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h2 style={{ fontSize: '18px', fontWeight: '700', margin: 0, color: '#0f172a' }}>Payment Details - {viewPayment.id}</h2>
                <button onClick={() => setViewPayment(null)} style={{ border: 'none', background: 'transparent', cursor: 'pointer', color: '#64748b' }}>
                  <X size={20} />
                </button>
              </div>
              <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div><strong>Transaction ID:</strong> {viewPayment.id}</div>
                <div><strong>Order ID:</strong> <span style={{ color: '#4f46e5', fontWeight: '600' }}>{viewPayment.orderId}</span></div>
                <div><strong>Amount:</strong> ₹{viewPayment.amount}</div>
                <div><strong>Method:</strong> {viewPayment.method}</div>
                <div><strong>Date:</strong> {viewPayment.date}</div>
                <div><strong>Status:</strong> {viewPayment.status}</div>
              </div>
              <div style={{ padding: '16px 20px', background: '#f8fafc', borderTop: '1px solid #e2e8f0', borderRadius: '0 0 12px 12px', display: 'flex', justifyContent: 'flex-end' }}>
                <button type="button" onClick={() => setViewPayment(null)} style={{ padding: '10px 16px', borderRadius: '8px', border: '1px solid #cbd5e1', background: '#fff', fontSize: '14px', fontWeight: '600', color: '#475569', cursor: 'pointer' }}>Close</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminShell>
  );
}