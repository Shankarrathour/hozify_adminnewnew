import React, { useState } from 'react';
import { Check, X, ShieldAlert, CheckCircle2, Search, ArrowLeft } from 'lucide-react';
import AdminShell from '../../components/layouts/AdminShell';
import { useApp } from '../../hooks/useApp';
import { ROUTES } from '../../config/routes';
import { mockRefunds } from './data/mockData';

import Select from "../../components/ui/Select";

export default function RefundApprovalQueue() {
  const { navigate } = useApp();
  const [refunds, setRefunds] = useState(mockRefunds);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  const handleAction = (id, newStatus) => {
    setRefunds(prev => prev.map(r => r.id === id ? { ...r, status: newStatus } : r));
    alert(`Refund request ${id} has been ${newStatus.toLowerCase()}.`);
  };

  const getFilteredRefunds = () => {
    return refunds.filter(r => {
      const matchesSearch = r.customer.toLowerCase().includes(searchTerm.toLowerCase()) || r.bookingId.toLowerCase().includes(searchTerm.toLowerCase()) || r.id.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = statusFilter === 'All' || r.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  };

  const filteredData = getFilteredRefunds();

  return (
    <AdminShell
      activeTab="Wallet Management"
      brandText="HOZIFY Wallet"
      brandSubText="Global Ledger v1.2"
      searchPlaceholder="Search refund requests..."
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-section)', padding: '24px 0' }}>
        
        {/* Back and Title */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
              <button
                onClick={() => navigate(ROUTES.walletDashboard)}
                style={{ border: 'none', background: 'transparent', color: 'var(--muted)', display: 'flex', alignItems: 'center', cursor: 'pointer', padding: 0 }}
              >
                <ArrowLeft size={16} />
              </button>
              <span style={{ fontSize: '11px', color: 'var(--muted)', fontWeight: '750', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                Wallet Management / Refund Queue
              </span>
            </div>
            <h1 style={{ fontSize: '24px', fontWeight: '800', color: 'var(--text)', margin: 0 }}>
              Refund Approval Queue
            </h1>
            <p style={{ fontSize: '13px', color: 'var(--muted)', margin: '4px 0 0' }}>
              Authorize customer refund requests based on booking delays, quality complaints, or cancellations.
            </p>
          </div>
        </div>

        {/* Stats */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
          <div className="panel" style={{ padding: '16px' }}>
            <span style={{ fontSize: '10px', fontWeight: '800', color: 'var(--muted)', textTransform: 'uppercase' }}>Pending Approvals</span>
            <strong style={{ display: 'block', fontSize: '22px', fontWeight: '850', color: '#b45309', marginTop: '6px' }}>
              {refunds.filter(r => r.status === 'Pending').length} Request(s)
            </strong>
          </div>
          <div className="panel" style={{ padding: '16px' }}>
            <span style={{ fontSize: '10px', fontWeight: '800', color: 'var(--muted)', textTransform: 'uppercase' }}>Approved Amount (Today)</span>
            <strong style={{ display: 'block', fontSize: '22px', fontWeight: '850', color: 'var(--green)', marginTop: '6px' }}>
              ₹8,500.00
            </strong>
          </div>
          <div className="panel" style={{ padding: '16px' }}>
            <span style={{ fontSize: '10px', fontWeight: '800', color: 'var(--muted)', textTransform: 'uppercase' }}>Auto-Settlement Limits</span>
            <strong style={{ display: 'block', fontSize: '22px', fontWeight: '850', color: 'var(--primary)', marginTop: '6px' }}>
              ₹15,000 / ticket
            </strong>
          </div>
        </div>

        {/* Filter Toolbar */}
        <div className="panel" style={{ padding: '16px', display: 'flex', gap: '16px', alignItems: 'center', flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', border: '1.5px solid #25108f', background: '#fff', height: '36px', padding: '0 12px', borderRadius: '6px', flex: 1, minWidth: '200px' }}>
            <Search size={14} style={{ color: 'var(--muted)' }} />
            <input
              placeholder="Search by refund ID, booking ID, or customer name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{ border: 'none', background: 'transparent', outline: 'none', fontSize: '13px', width: '100%' }}
            />
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', border: '1.5px solid #25108f', background: '#fff', height: '36px', padding: '0 12px', borderRadius: '6px' }}>
            <span style={{ fontSize: '11px', fontWeight: '800', color: 'var(--muted)', textTransform: 'uppercase' }}>Status</span>
            <Select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              style={{ border: 'none', background: 'transparent', outline: 'none', fontSize: '13px', fontWeight: '700', cursor: 'pointer' }}
              aria-label="Filter by refund status"
              options={[{
                label: "All Statuses",
                value: "All"
              }, {
                label: "Pending",
                value: "Pending"
              }, {
                label: "Approved",
                value: "Approved"
              }, {
                label: "Rejected",
                value: "Rejected"
              }]} />
          </div>
        </div>

        {/* Table List */}
        <div className="panel" style={{ padding: 'var(--spacing-section)' }}>
          <div className="table-wrap">
            <div className="table-responsive-wrapper">
<table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px', textAlign: 'left' }}>
              <thead>
                <tr style={{ background: '#f4eff8', borderBottom: '1.5px solid #25108f' }}>
                  <th style={{ padding: '12px 16px', color: 'var(--muted)', fontWeight: '800', textTransform: 'uppercase', fontSize: '10px' }}>Refund ID</th>
                  <th style={{ padding: '12px 16px', color: 'var(--muted)', fontWeight: '800', textTransform: 'uppercase', fontSize: '10px' }}>Booking Reference</th>
                  <th style={{ padding: '12px 16px', color: 'var(--muted)', fontWeight: '800', textTransform: 'uppercase', fontSize: '10px' }}>Customer</th>
                  <th style={{ padding: '12px 16px', color: 'var(--muted)', fontWeight: '800', textTransform: 'uppercase', fontSize: '10px' }}>Amount</th>
                  <th style={{ padding: '12px 16px', color: 'var(--muted)', fontWeight: '800', textTransform: 'uppercase', fontSize: '10px' }}>Reason</th>
                  <th style={{ padding: '12px 16px', color: 'var(--muted)', fontWeight: '800', textTransform: 'uppercase', fontSize: '10px' }}>Request Date</th>
                  <th style={{ padding: '12px 16px', color: 'var(--muted)', fontWeight: '800', textTransform: 'uppercase', fontSize: '10px' }}>Status</th>
                  <th style={{ padding: '12px 16px', color: 'var(--muted)', fontWeight: '800', textTransform: 'uppercase', fontSize: '10px', textAlign: 'right' }}>Authorization</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.map((r) => {
                  const isPending = r.status === 'Pending';
                  return (
                    <tr key={r.id} style={{ borderBottom: '1px solid var(--lavender)' }}>
                      <td style={{ padding: '16px', fontWeight: '750' }}>#{r.id}</td>
                      <td style={{ padding: '16px' }}>
                        <span style={{ color: 'var(--primary)', fontWeight: '750' }}>{r.bookingId}</span>
                      </td>
                      <td style={{ padding: '16px', fontWeight: '700' }}>{r.customer}</td>
                      <td style={{ padding: '16px', fontWeight: '850', color: 'var(--red)' }}>-₹{r.amount.toLocaleString('en-IN')}</td>
                      <td style={{ padding: '16px', color: 'var(--muted)', maxWidth: '240px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{r.reason}</td>
                      <td style={{ padding: '16px', color: 'var(--muted)' }}>{r.date}</td>
                      <td style={{ padding: '16px' }}>
                        <span style={{
                          fontSize: '9px',
                          fontWeight: '850',
                          background: r.status === 'Approved' ? '#ecfdf5' : r.status === 'Pending' ? '#fffbeb' : '#fee2e2',
                          color: r.status === 'Approved' ? '#07956f' : r.status === 'Pending' ? '#b45309' : '#d32929',
                          padding: '3px 8px',
                          borderRadius: '4px'
                        }}>
                          {r.status}
                        </span>
                      </td>
                      <td style={{ padding: '16px', textAlign: 'right' }}>
                        {isPending ? (
                          <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
                            <button
                              onClick={() => handleAction(r.id, 'Approved')}
                              style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '4px',
                                border: 'none',
                                background: '#07956f',
                                color: '#fff',
                                padding: '6px 12px',
                                borderRadius: '4px',
                                fontSize: '11px',
                                fontWeight: '750',
                                cursor: 'pointer'
                              }}
                            >
                              <Check size={12} />
                              <span>Approve</span>
                            </button>
                            <button
                              onClick={() => handleAction(r.id, 'Rejected')}
                              style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '4px',
                                border: '1px solid #d32929',
                                background: '#fff',
                                color: 'var(--red)',
                                padding: '6px 12px',
                                borderRadius: '4px',
                                fontSize: '11px',
                                fontWeight: '750',
                                cursor: 'pointer'
                              }}
                            >
                              <X size={12} />
                              <span>Reject</span>
                            </button>
                          </div>
                        ) : (
                          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', fontSize: '11px', color: 'var(--muted)', fontWeight: '700' }}>
                            <CheckCircle2 size={12} style={{ color: r.status === 'Approved' ? '#07956f' : '#d32929' }} />
                            <span>Processed</span>
                          </span>
                        )}
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


