import React, { useState } from 'react';
import { Landmark, Search, HelpCircle, Check, X, ShieldAlert, Eye, Calendar, CreditCard } from 'lucide-react';
import AdminShell from '../../components/layouts/AdminShell';
import { mockSettlements } from './data/mockData';

export default function SettlementRequestQueue() {
  const [settlements, setSettlements] = useState(mockSettlements);
  const [searchTerm, setSearchTerm] = useState('');
  const [toasts, setToasts] = useState([]);
  
  // Confirm action modal
  const [showConfirm, setShowConfirm] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [actionType, setActionType] = useState(''); // 'Approve', 'Reject', 'Hold'
  const [notes, setNotes] = useState('');

  // Detail view modal
  const [showDetail, setShowDetail] = useState(false);
  const [detailItem, setDetailItem] = useState(null);

  const toast = (message, type = 'success') => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), 3500);
  };

  const handleOpenConfirm = (item, type) => {
    setSelectedItem(item);
    setActionType(type);
    setShowConfirm(true);
  };

  const handleCloseConfirm = () => {
    setShowConfirm(false);
    setSelectedItem(null);
    setNotes('');
  };

  const handleAction = () => {
    const newStatus = actionType === 'Approve' ? 'Approved' : actionType === 'Reject' ? 'Rejected' : 'Hold';
    const newColor = actionType === 'Approve' ? 'green' : actionType === 'Reject' ? 'red' : 'orange';
    setSettlements(prev => prev.map(s => s.id === selectedItem.id ? { ...s, status: newStatus, statusColor: newColor } : s));
    toast(`Settlement ${selectedItem.id} marked as ${newStatus} successfully!`);
    handleCloseConfirm();
  };

  const filteredSettlements = settlements.filter(s => 
    s.partnerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <AdminShell
      activeTab="Wallet Management"
      brandText="HOZIFY Wallet"
      brandSubText="Global Ledger v1.2"
      searchPlaceholder="Search settlements..."
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-section)', padding: '24px 0' }}>
        
        {/* Title */}
        <div>
          <h1 style={{ fontSize: '24px', fontWeight: '800', color: 'var(--text)', margin: 0 }}>
            Settlement Request Queue
          </h1>
          <p style={{ fontSize: '13px', color: 'var(--muted)', margin: '4px 0 0' }}>
            Process and verify partner/seller payout requests. Secure bank credential masking enabled.
          </p>
        </div>

        {/* Filter bar */}
        <div className="panel" style={{ padding: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', border: '1.5px solid #25108f', background: '#fff', height: '36px', padding: '0 12px', borderRadius: '6px', maxWidth: '400px' }}>
            <Search size={14} style={{ color: 'var(--muted)' }} />
            <input
              placeholder="Search by ID or partner..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{ border: 'none', background: 'transparent', outline: 'none', fontSize: '13px', width: '100%' }}
            />
          </div>
        </div>

        {/* Table Queue */}
        <div className="panel" style={{ padding: 'var(--spacing-section)' }}>
          <div className="table-wrap">
            <div className="table-responsive-wrapper">
<table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px', textAlign: 'left' }}>
              <thead>
                <tr style={{ background: '#f4eff8', borderBottom: '1.5px solid #25108f' }}>
                  <th style={{ padding: '12px 16px', color: 'var(--muted)', fontWeight: '800', textTransform: 'uppercase', fontSize: '10px' }}>Settlement ID</th>
                  <th style={{ padding: '12px 16px', color: 'var(--muted)', fontWeight: '800', textTransform: 'uppercase', fontSize: '10px' }}>Partner</th>
                  <th style={{ padding: '12px 16px', color: 'var(--muted)', fontWeight: '800', textTransform: 'uppercase', fontSize: '10px' }}>Bank Name</th>
                  <th style={{ padding: '12px 16px', color: 'var(--muted)', fontWeight: '800', textTransform: 'uppercase', fontSize: '10px' }}>Bank Account</th>
                  <th style={{ padding: '12px 16px', color: 'var(--muted)', fontWeight: '800', textTransform: 'uppercase', fontSize: '10px' }}>Amount</th>
                  <th style={{ padding: '12px 16px', color: 'var(--muted)', fontWeight: '800', textTransform: 'uppercase', fontSize: '10px' }}>Status</th>
                  <th style={{ padding: '12px 16px', color: 'var(--muted)', fontWeight: '800', textTransform: 'uppercase', fontSize: '10px', textAlign: 'right' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredSettlements.map((req) => (
                  <tr key={req.id} style={{ borderBottom: '1px solid var(--lavender)' }}>
                    <td style={{ padding: '16px' }}>
                      <strong
                        style={{ color: 'var(--primary)', cursor: 'pointer', textDecoration: 'underline', textDecorationStyle: 'dotted', textUnderlineOffset: '3px' }}
                        title="Click to view settlement details"
                        onClick={() => { setDetailItem(req); setShowDetail(true); }}
                      >
                        {req.id}
                      </strong>
                    </td>
                    <td style={{ padding: '16px', fontWeight: '700' }}>{req.partnerName}</td>
                    <td style={{ padding: '16px', color: 'var(--muted)' }}>{req.bankName}</td>
                    <td style={{ padding: '16px', color: 'var(--muted)' }}>
                      <code>{req.accNo}</code>
                    </td>
                    <td style={{ padding: '16px', fontWeight: '850', color: 'var(--text)' }}>
                      ₹{req.amount.toLocaleString('en-IN')}
                    </td>
                    <td style={{ padding: '16px' }}>
                      <span style={{
                        fontSize: '9px',
                        fontWeight: '850',
                        background: req.status === 'Approved' || req.status === 'Processed' ? '#ecfdf5' : req.status === 'Pending' ? '#fffbeb' : '#fee2e2',
                        color: req.status === 'Approved' || req.status === 'Processed' ? '#07956f' : req.status === 'Pending' ? '#b45309' : '#d32929',
                        padding: '2px 6px',
                        borderRadius: '4px'
                      }}>
                        {req.status}
                      </span>
                    </td>
                    <td style={{ padding: '16px', textAlign: 'right' }}>
                      <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
                        {/* Approve */}
                        <button
                          onClick={() => handleOpenConfirm(req, 'Approve')}
                          disabled={req.status === 'Approved' || req.status === 'Processed'}
                          title="Approve Settlement"
                          style={{ border: '1px solid #bbf7d0', background: req.status === 'Approved' || req.status === 'Processed' ? '#f1f5f9' : '#ecfdf5', color: req.status === 'Approved' || req.status === 'Processed' ? '#cbd5e1' : '#07956f', height: '28px', width: '28px', borderRadius: '50%', cursor: req.status === 'Approved' || req.status === 'Processed' ? 'not-allowed' : 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.15s' }}
                        >
                          <Check size={13} />
                        </button>
                        {/* View Details */}
                        <button
                          onClick={() => { setDetailItem(req); setShowDetail(true); }}
                          title="View Settlement Details"
                          style={{ border: '1px solid #bfdbfe', background: '#eff6ff', color: '#3b82f6', height: '28px', width: '28px', borderRadius: '50%', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.15s' }}
                        >
                          <Eye size={13} />
                        </button>
                        {/* Reject */}
                        <button
                          onClick={() => handleOpenConfirm(req, 'Reject')}
                          disabled={req.status === 'Rejected'}
                          title="Reject Settlement"
                          style={{ border: '1px solid #fecaca', background: req.status === 'Rejected' ? '#f1f5f9' : '#fee2e2', color: req.status === 'Rejected' ? '#cbd5e1' : '#d32929', height: '28px', width: '28px', borderRadius: '50%', cursor: req.status === 'Rejected' ? 'not-allowed' : 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.15s' }}
                        >
                          <X size={13} />
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

        {/* Confirmation Modal */}
        {showConfirm && selectedItem && (
          <div style={{
            position: 'fixed',
            top: 0, left: 0, right: 0, bottom: 0,
            background: 'rgba(0,0,0,0.4)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 9999
          }}>
            <div className="panel" style={{ width: '450px', padding: 'var(--spacing-section)', display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Landmark size={20} style={{ color: 'var(--primary)' }} />
                <h3 style={{ margin: 0, fontSize: '16px', fontWeight: '850', color: 'var(--text)' }}>
                  Confirm Settlement Payout: {actionType}
                </h3>
              </div>
              <span style={{ fontSize: '13px', color: 'var(--muted)' }}>
                You are about to mark settlement <strong>{selectedItem.id}</strong> (₹{selectedItem.amount.toLocaleString('en-IN')}) for partner <strong>{selectedItem.partnerName}</strong> as <strong>{actionType}d</strong>.
              </span>

              {/* Approval Notes */}
              <div>
                <label style={{ display: 'block', fontSize: '11px', fontWeight: '800', color: 'var(--muted)', textTransform: 'uppercase', marginBottom: '6px' }}>
                  Compliance Audit Notes
                </label>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Enter notes for audit compliance trail..."
                  style={{ width: '100%', height: '80px', border: '1.5px solid #25108f', borderRadius: '6px', padding: '12px', fontSize: '13px', resize: 'none', outline: 'none' }}
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
                <button
                  onClick={handleCloseConfirm}
                  style={{ height: '36px', padding: '0 16px', border: '1.5px solid #25108f', background: '#fff', borderRadius: '6px', fontSize: '12px', fontWeight: '750', cursor: 'pointer' }}
                >
                  Cancel
                </button>
                <button
                  onClick={handleAction}
                  style={{ height: '36px', padding: '0 16px', border: 'none', background: 'var(--primary)', color: '#fff', borderRadius: '6px', fontSize: '12px', fontWeight: '750', cursor: 'pointer' }}
                >
                  Confirm Action
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Settlement Detail Modal */}
        {showDetail && detailItem && (
          <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.45)', zIndex: 10000, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div className="panel" style={{ width: '500px', padding: '28px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <CreditCard size={20} style={{ color: 'var(--primary)' }} />
                  <h3 style={{ margin: 0, fontSize: '16px', fontWeight: '800', color: 'var(--text)' }}>Settlement Details</h3>
                </div>
                <button onClick={() => setShowDetail(false)} style={{ border: 'none', background: 'transparent', cursor: 'pointer', color: 'var(--muted)', fontSize: '20px', lineHeight: 1 }}>&times;</button>
              </div>

              <div style={{ background: '#f8fafc', borderRadius: '10px', padding: '16px 20px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {[
                  ['Settlement ID', detailItem.id],
                  ['Partner Name', detailItem.partnerName],
                  ['Bank Name', detailItem.bankName],
                  ['Bank Account', detailItem.accNo],
                  ['Amount', `₹${detailItem.amount.toLocaleString('en-IN')}`],
                  ['Status', detailItem.status],
                  ['Requested On', detailItem.requestDate],
                  ['Processed On', detailItem.processedDate]
                ].map(([label, value]) => (
                  <div key={label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '13px', borderBottom: '1px solid #e2e8f0', paddingBottom: '8px' }}>
                    <span style={{ color: 'var(--muted)', fontWeight: '700', textTransform: 'uppercase', fontSize: '10px' }}>{label}</span>
                    <span style={{ fontWeight: '800', color: 'var(--text)' }}>{value}</span>
                  </div>
                ))}
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
                <button
                  onClick={() => setShowDetail(false)}
                  style={{ height: '36px', padding: '0 20px', border: '1.5px solid #25108f', background: '#fff', borderRadius: '6px', fontSize: '13px', fontWeight: '700', cursor: 'pointer' }}
                >
                  Close
                </button>
                {(detailItem.status === 'Pending' || detailItem.status === 'Hold') && (
                  <button
                    onClick={() => { setShowDetail(false); handleOpenConfirm(detailItem, 'Approve'); }}
                    style={{ height: '36px', padding: '0 20px', border: 'none', background: 'var(--primary)', color: '#fff', borderRadius: '6px', fontSize: '13px', fontWeight: '700', cursor: 'pointer' }}
                  >
                    Approve This Settlement
                  </button>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Toast Notifications */}
        <div style={{ position: 'fixed', bottom: '24px', right: '24px', zIndex: 10001, display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {toasts.map(t => (
            <div key={t.id} style={{ background: '#1e293b', color: '#fff', padding: '10px 16px', borderRadius: '8px', fontSize: '13px', fontWeight: '600', boxShadow: '0 4px 16px rgba(0,0,0,0.2)', maxWidth: '320px' }}>
              {t.message}
            </div>
          ))}
        </div>

      </div>
    </AdminShell>
  );
}


