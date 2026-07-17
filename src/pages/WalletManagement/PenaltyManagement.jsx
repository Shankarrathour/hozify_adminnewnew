import React, { useState } from 'react';
import { ShieldAlert, Plus, X, Search, CheckCircle2 } from 'lucide-react';
import AdminShell from '../../components/layouts/AdminShell';
import { mockPenalties, mockWallets } from './data/mockData';

import Select from "../../components/ui/Select";

export default function PenaltyManagement() {
  const [penalties, setPenalties] = useState(mockPenalties);
  const [showForm, setShowForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  // Form states
  const [walletId, setWalletId] = useState(mockWallets[0].id);
  const [amount, setAmount] = useState('');
  const [reason, setReason] = useState('No-show for urgent plumbing assignment');

  const handleCreatePenalty = (e) => {
    e.preventDefault();
    if (!amount || Number(amount) <= 0) {
      alert('Please enter a valid positive penalty amount.');
      return;
    }

    const wallet = mockWallets.find(w => w.id === walletId);
    const newPenalty = {
      id: `PEN-${Math.floor(88000 + Math.random() * 1000)}`,
      owner: wallet?.owner || 'Unknown',
      walletId,
      reason,
      amount: Number(amount),
      appliedBy: 'Admin (Sarah J.)',
      date: new Date().toISOString().slice(0, 10),
      status: 'Active'
    };

    setPenalties([newPenalty, ...penalties]);
    setShowForm(false);
    setAmount('');
    alert(`Successfully applied SLA penalty of ₹${amount} to ${wallet?.owner || walletId}.`);
  };

  const handleWaiver = (id) => {
    if (window.confirm(`Are you sure you want to wave/remove penalty ${id}?`)) {
      setPenalties(prev => prev.map(p => p.id === id ? { ...p, status: 'Removed' } : p));
      alert(`Penalty ${id} has been successfully waived and status set to Removed.`);
    }
  };

  const getFilteredPenalties = () => {
    return penalties.filter(p => {
      return p.owner.toLowerCase().includes(searchTerm.toLowerCase()) || p.id.toLowerCase().includes(searchTerm.toLowerCase()) || p.reason.toLowerCase().includes(searchTerm.toLowerCase());
    });
  };

  const filteredData = getFilteredPenalties();

  return (
    <AdminShell
      activeTab="Wallet Management"
      brandText="HOZIFY Wallet"
      brandSubText="Global Ledger v1.2"
      searchPlaceholder="Search penalties..."
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-section)', padding: '24px 0' }}>
        
        {/* Header Title & Create Button */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <h1 style={{ fontSize: '24px', fontWeight: '800', color: 'var(--text)', margin: 0 }}>
              Penalty Management Dashboard
            </h1>
            <p style={{ fontSize: '13px', color: 'var(--muted)', margin: '4px 0 0' }}>
              Catalog and apply SLA infraction penalties to partner accounts or request waiver approvals.
            </p>
          </div>

          <button
            onClick={() => setShowForm(true)}
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
              cursor: 'pointer'
            }}
          >
            <Plus size={16} />
            <span>Apply SLA Penalty</span>
          </button>
        </div>

        {/* Form Modal / Overlay (Inline styled for reliability) */}
        {showForm && (
          <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0,0,0,0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
            padding: '20px'
          }}>
            <div className="panel" style={{ width: '100%', maxWidth: '480px', padding: '28px', background: '#fff', display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h3 style={{ fontSize: '16px', fontWeight: '850', color: 'var(--text)', margin: 0 }}>Impose New SLA Penalty</h3>
                <button onClick={() => setShowForm(false)} style={{ border: 'none', background: 'transparent', cursor: 'pointer', color: 'var(--muted)' }}>
                  <X size={18} />
                </button>
              </div>

              <form onSubmit={handleCreatePenalty} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <label style={{ fontSize: '11px', fontWeight: '800', color: 'var(--muted)', textTransform: 'uppercase' }}>Target Partner Wallet</label>
                  <Select
                    value={walletId}
                    onChange={(e) => setWalletId(e.target.value)}
                    options={mockWallets.map(w => ({
                      value: w.id,
                      label: `${w.owner} (${w.type} - ${w.id})`
                    }))}
                    style={{ border: '1.5px solid #25108f', background: '#fff', height: '38px', borderRadius: '6px', padding: '0 12px', fontSize: '13px', fontWeight: '700', outline: 'none' }}
                  />
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <label style={{ fontSize: '11px', fontWeight: '800', color: 'var(--muted)', textTransform: 'uppercase' }}>Infraction Penalty Amount (₹)</label>
                  <input
                    type="number"
                    placeholder="e.g. 1500"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    style={{ border: '1.5px solid #25108f', height: '38px', borderRadius: '6px', padding: '0 12px', fontSize: '13px', outline: 'none' }}
                  />
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <label style={{ fontSize: '11px', fontWeight: '800', color: 'var(--muted)', textTransform: 'uppercase' }}>Reason/Rule Violated</label>
                  <Select
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
                    style={{ border: '1.5px solid #25108f', background: '#fff', height: '38px', borderRadius: '6px', padding: '0 12px', fontSize: '13px', fontWeight: '700', outline: 'none' }}
                    options={[{
                      label: "No-show for urgent plumbing assignment",
                      value: "No-show for urgent plumbing assignment"
                    }, {
                      label: "SLA delay over 120 minutes",
                      value: "SLA delay over 120 minutes"
                    }, {
                      label: "Unprofessional service standard complaint",
                      value: "Unprofessional service standard complaint"
                    }, {
                      label: "Client dispute resolution deduction",
                      value: "Client dispute resolution deduction"
                    }]} />
                </div>

                <button
                  type="submit"
                  style={{
                    height: '40px',
                    border: 'none',
                    background: 'var(--primary)',
                    color: '#fff',
                    borderRadius: '6px',
                    fontSize: '12px',
                    fontWeight: '750',
                    cursor: 'pointer',
                    marginTop: '8px'
                  }}
                >
                  Confirm Penalty Imposition
                </button>
              </form>
            </div>
          </div>
        )}

        {/* Filter bar */}
        <div className="panel" style={{ padding: '16px', display: 'flex', gap: '16px', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', border: '1.5px solid #25108f', background: '#fff', height: '36px', padding: '0 12px', borderRadius: '6px', flex: 1 }}>
            <Search size={14} style={{ color: 'var(--muted)' }} />
            <input
              placeholder="Search by owner name, penalty ID, or infraction..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{ border: 'none', background: 'transparent', outline: 'none', fontSize: '13px', width: '100%' }}
            />
          </div>
        </div>

        {/* Listing Grid */}
        <div className="panel" style={{ padding: 'var(--spacing-section)' }}>
          <div className="table-wrap">
            <div className="table-responsive-wrapper">
<table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px', textAlign: 'left' }}>
              <thead>
                <tr style={{ background: '#f4eff8', borderBottom: '1.5px solid #25108f' }}>
                  <th style={{ padding: '12px 16px', color: 'var(--muted)', fontWeight: '800', textTransform: 'uppercase', fontSize: '10px' }}>Penalty ID</th>
                  <th style={{ padding: '12px 16px', color: 'var(--muted)', fontWeight: '800', textTransform: 'uppercase', fontSize: '10px' }}>Owner</th>
                  <th style={{ padding: '12px 16px', color: 'var(--muted)', fontWeight: '800', textTransform: 'uppercase', fontSize: '10px' }}>Wallet Reference</th>
                  <th style={{ padding: '12px 16px', color: 'var(--muted)', fontWeight: '800', textTransform: 'uppercase', fontSize: '10px' }}>Violation Reason</th>
                  <th style={{ padding: '12px 16px', color: 'var(--muted)', fontWeight: '800', textTransform: 'uppercase', fontSize: '10px' }}>Amount</th>
                  <th style={{ padding: '12px 16px', color: 'var(--muted)', fontWeight: '800', textTransform: 'uppercase', fontSize: '10px' }}>Applied By</th>
                  <th style={{ padding: '12px 16px', color: 'var(--muted)', fontWeight: '800', textTransform: 'uppercase', fontSize: '10px' }}>Date</th>
                  <th style={{ padding: '12px 16px', color: 'var(--muted)', fontWeight: '800', textTransform: 'uppercase', fontSize: '10px' }}>Status</th>
                  <th style={{ padding: '12px 16px', color: 'var(--muted)', fontWeight: '800', textTransform: 'uppercase', fontSize: '10px', textAlign: 'right' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.map((p) => {
                  const isActive = p.status === 'Active';
                  return (
                    <tr key={p.id} style={{ borderBottom: '1px solid var(--lavender)' }}>
                      <td style={{ padding: '16px', fontWeight: '750' }}>#{p.id}</td>
                      <td style={{ padding: '16px', fontWeight: '700' }}>{p.owner}</td>
                      <td style={{ padding: '16px', color: 'var(--muted)' }}>{p.walletId}</td>
                      <td style={{ padding: '16px', color: 'var(--muted)', maxWidth: '240px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{p.reason}</td>
                      <td style={{ padding: '16px', fontWeight: '850', color: 'var(--red)' }}>₹{p.amount.toLocaleString('en-IN')}</td>
                      <td style={{ padding: '16px', color: 'var(--muted)' }}>{p.appliedBy}</td>
                      <td style={{ padding: '16px', color: 'var(--muted)' }}>{p.date}</td>
                      <td style={{ padding: '16px' }}>
                        <span style={{
                          fontSize: '9px',
                          fontWeight: '850',
                          background: isActive ? '#fee2e2' : '#f3f4f6',
                          color: isActive ? '#d32929' : 'var(--muted)',
                          padding: '3px 8px',
                          borderRadius: '4px'
                        }}>
                          {p.status.toUpperCase()}
                        </span>
                      </td>
                      <td style={{ padding: '16px', textAlign: 'right' }}>
                        {isActive ? (
                          <button
                            onClick={() => handleWaiver(p.id)}
                            style={{
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: '4px',
                              border: '1.5px solid #25108f',
                              background: '#fff',
                              color: 'var(--primary)',
                              padding: '5px 10px',
                              borderRadius: '4px',
                              fontSize: '11px',
                              fontWeight: '750',
                              cursor: 'pointer'
                            }}
                          >
                            <ShieldAlert size={12} />
                            <span>Request Waiver</span>
                          </button>
                        ) : (
                          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', fontSize: '11px', color: 'var(--muted)', fontWeight: '700' }}>
                            <CheckCircle2 size={12} style={{ color: 'var(--green)' }} />
                            <span>Waived</span>
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


