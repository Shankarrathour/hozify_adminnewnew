import React, { useState } from 'react';
import {
  Wallet,
  TrendingUp,
  FileText,
  DollarSign,
  ChevronRight,
  ShieldCheck,
  CheckCircle,
  AlertOctagon,
  ArrowRight,
  Users,
  Activity,
  Award
} from 'lucide-react';
import AdminShell from '../../components/layouts/AdminShell';

import Select from "../../components/ui/Select";

export default function SupportFinancialResolutions({ activeTab = 'Support Center' }) {
  const [activeSubTab, setActiveSubTab] = useState('Resolutions');
  const [selectedTicket, setSelectedTicket] = useState({
    id: '#TK-9884',
    customer: 'James Donovan',
    reason: 'Subscription Double Billing',
    amount: '25.00',
    type: 'Wallet',
    notes: 'Double billing checkout webhook timeouts verified.'
  });

  // Mock list of pending approvals
  const [pendingApprovals, setPendingApprovals] = useState([
    { id: '#TK-9921', customer: 'Alex Lindholm', initial: 'AL', reason: 'Service Delay', amount: '45.00' },
    { id: '#TK-9905', customer: 'Sarah Miller', initial: 'SM', reason: 'Billing Error', amount: '112.50' },
    { id: '#TK-9884', customer: 'James Donovan', initial: 'JD', reason: 'Partial Refund', amount: '25.00' }
  ]);

  // Mock recently processed feed
  const [recentProcessed, setRecentProcessed] = useState([
    { id: '#TK-9762', amount: '$12.00', customer: 'Robert Chen', time: '12m ago' },
    { id: '#TK-9755', amount: '$250.00', customer: 'Lana Vogt', time: '45m ago' },
    { id: '#TK-9740', amount: '$65.00', customer: 'Marcus Wright', time: '1h ago' },
    { id: '#TK-9712', amount: '$8.50', customer: 'Emily Blunt', time: '2h ago' }
  ]);

  const handleSelectTicket = (tk) => {
    setSelectedTicket({
      id: tk.id,
      customer: tk.customer,
      reason: tk.reason === 'Partial Refund' ? 'Subscription Double Billing' : tk.reason === 'Billing Error' ? 'Invoice Mistake' : 'Service Delay',
      amount: tk.amount,
      type: 'Wallet',
      notes: ''
    });
  };

  const handleExecuteCompensation = () => {
    if (!selectedTicket.amount || isNaN(selectedTicket.amount) || parseFloat(selectedTicket.amount) <= 0) {
      alert('Please enter a valid refund amount.');
      return;
    }

    // Add to recently processed
    const newProcessed = {
      id: selectedTicket.id,
      amount: `$${parseFloat(selectedTicket.amount).toFixed(2)}`,
      customer: selectedTicket.customer,
      time: 'Just now'
    };
    setRecentProcessed([newProcessed, ...recentProcessed]);

    // Remove from pending
    setPendingApprovals(pendingApprovals.filter(t => t.id !== selectedTicket.id));

    alert(`Compensation of $${selectedTicket.amount} successfully executed for ${selectedTicket.id}.`);
    
    // Select next pending
    const remaining = pendingApprovals.filter(t => t.id !== selectedTicket.id);
    if (remaining.length > 0) {
      handleSelectTicket(remaining[0]);
    } else {
      setSelectedTicket(null);
    }
  };

  return (
    <AdminShell
      activeTab={activeTab}
      brandText="HOZIFY"
      brandSubText="Enterprise Admin"
      headerTitle="Financial Resolutions"
      searchPlaceholder="Search compensation audits, ticket IDs..."
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-section)', padding: '24px 0', position: 'relative' }}>
        
        {/* Breadcrumb Row */}
        <div style={{ fontSize: '12px', fontWeight: '750', color: 'var(--muted)', display: 'flex', alignItems: 'center', gap: '6px' }}>
          <span>Support Center</span>
          <ChevronRight size={12} />
          <span style={{ color: 'var(--primary)' }}>Financial Resolutions</span>
        </div>

        {/* Page Header (Resolutions, Unassigned, Escalated Sub Tabs + Wallet Reserve Badge) */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px', borderBottom: '1.5px solid #25108f', paddingBottom: '16px' }}>
          {/* Sub Tabs */}
          <div style={{ display: 'flex', gap: 'var(--spacing-section)' }}>
            {['Resolutions', 'Unassigned', 'Escalated'].map((tName) => {
              const isActive = activeSubTab === tName;
              return (
                <button
                  key={tName}
                  onClick={() => setActiveSubTab(tName)}
                  style={{
                    border: 'none',
                    background: 'transparent',
                    padding: '12px 4px',
                    fontSize: '14px',
                    fontWeight: isActive ? '850' : '700',
                    color: isActive ? 'var(--primary)' : 'var(--muted)',
                    borderBottom: isActive ? '3px solid var(--primary)' : '3px solid transparent',
                    cursor: 'pointer',
                    transition: 'all 0.15s ease',
                    marginBottom: '-19px'
                  }}
                  type="button"
                >
                  {tName}
                </button>
              );
            })}
          </div>

          {/* Wallet Reserve Info Box */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            background: 'var(--soft)',
            border: '1.5px solid #25108f',
            padding: '8px 16px',
            borderRadius: '8px'
          }}>
            <Wallet size={16} style={{ color: 'var(--primary)' }} />
            <div>
              <span style={{ display: 'block', fontSize: '9px', fontWeight: '800', color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                Wallet Reserve
              </span>
              <strong style={{ fontSize: '14.5px', color: 'var(--primary)', fontWeight: '850' }}>
                $128,450.00
              </strong>
            </div>
          </div>
        </div>

        {/* Content Layout Grid columns */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr', lgGridTemplateColumns: '2fr 1fr', gap: 'var(--spacing-section)', alignItems: 'stretch' }}>
          
          {/* Left Column Panels: Pending approvals table + Compensation terminal form */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-section)' }}>
            
            {/* Pending Compensation list */}
            <div className="panel" style={{ padding: 'var(--spacing-section)', background: '#fff' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                <h3 style={{ fontSize: '15px', fontWeight: '850', color: 'var(--text)', margin: 0 }}>
                  Pending Compensation Approval
                </h3>
                <span style={{ fontSize: '10.5px', fontWeight: '900', background: '#fee2e2', color: '#dc2626', padding: '2px 8px', borderRadius: '12px' }}>
                  {pendingApprovals.length} Required
                </span>
              </div>

              <div style={{ overflowY: 'auto', maxHeight: '400px' }}>
                <div className="table-responsive-wrapper">
<table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px', textAlign: 'left', minWidth: '400px' }}>
                  <thead>
                    <tr style={{ background: 'var(--soft)', borderBottom: '1.5px solid #25108f' }}>
                      <th style={{ padding: '10px 14px', color: 'var(--muted)', fontWeight: '800', textTransform: 'uppercase', fontSize: '10px' }}>Ticket ID</th>
                      <th style={{ padding: '10px 14px', color: 'var(--muted)', fontWeight: '800', textTransform: 'uppercase', fontSize: '10px' }}>Customer</th>
                      <th style={{ padding: '10px 14px', color: 'var(--muted)', fontWeight: '800', textTransform: 'uppercase', fontSize: '10px' }}>Reason</th>
                      <th style={{ padding: '10px 14px', color: 'var(--muted)', fontWeight: '800', textTransform: 'uppercase', fontSize: '10px' }}>Amount</th>
                      <th style={{ padding: '10px 14px', color: 'var(--muted)', fontWeight: '800', textTransform: 'uppercase', fontSize: '10px', textAlign: 'right' }}>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {pendingApprovals.length === 0 ? (
                      <tr>
                        <td colSpan={5} style={{ padding: 'var(--spacing-section)', textAlign: 'center', color: 'var(--muted)' }}>
                          No pending compensation requests at this time.
                        </td>
                      </tr>
                    ) : (
                      pendingApprovals.map((tk) => {
                        const isFocused = selectedTicket?.id === tk.id;
                        return (
                          <tr
                            key={tk.id}
                            onClick={() => handleSelectTicket(tk)}
                            style={{
                              borderBottom: '1px solid var(--lavender)',
                              background: isFocused ? 'rgba(37, 16, 143, 0.02)' : 'transparent',
                              cursor: 'pointer',
                              transition: 'background 0.15s ease'
                            }}
                          >
                            <td style={{ padding: '12px 14px', fontWeight: '800', color: 'var(--primary)' }}>{tk.id}</td>
                            <td style={{ padding: '12px 14px' }}>
                              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <div style={{
                                  height: '24px',
                                  width: '24px',
                                  borderRadius: '50%',
                                  background: '#e9e2f6',
                                  color: 'var(--primary)',
                                  fontSize: '10px',
                                  fontWeight: '800',
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center'
                                }}>
                                  {tk.initial}
                                </div>
                                <span style={{ fontWeight: '600', color: 'var(--text)' }}>{tk.customer}</span>
                              </div>
                            </td>
                            <td style={{ padding: '12px 14px' }}>
                              <span style={{
                                fontSize: '10.5px',
                                fontWeight: '750',
                                color: '#d97706',
                                background: '#fef3c7',
                                padding: '2px 6px',
                                borderRadius: '4px'
                              }}>
                                {tk.reason}
                              </span>
                            </td>
                            <td style={{ padding: '12px 14px', fontWeight: '750', color: 'var(--text)' }}>
                              ${tk.amount}
                            </td>
                            <td style={{ padding: '12px 14px', textAlign: 'right' }}>
                              <button
                                style={{
                                  height: '26px',
                                  padding: '0 10px',
                                  borderRadius: '4px',
                                  border: 'none',
                                  background: isFocused ? 'var(--primary)' : 'var(--soft)',
                                  color: isFocused ? '#fff' : 'var(--primary)',
                                  fontSize: '11px',
                                  fontWeight: '800',
                                  cursor: 'pointer'
                                }}
                                type="button"
                              >
                                {isFocused ? 'Reviewing' : 'Select'}
                              </button>
                            </td>
                          </tr>
                        );
                      })
                    )}
                  </tbody>
                </table>
</div>
              </div>
            </div>

            {/* Compensation Terminal Form Form */}
            {selectedTicket ? (
              <div className="panel" style={{ padding: 'var(--spacing-section)', display: 'flex', flexDirection: 'column', gap: '16px', background: '#fff', border: '1.5px solid #25108f' }}>
                <h3 style={{ fontSize: '15px', fontWeight: '850', color: 'var(--text)', margin: 0 }}>
                  Compensation Terminal: {selectedTicket.id}
                </h3>
                
                <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '16px' }}>
                  
                  {/* Reason for Compensation dropdown */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <span style={{ fontSize: '11.5px', fontWeight: '800', color: 'var(--muted)' }}>Reason for Compensation</span>
                    <Select
                      value={selectedTicket.reason}
                      onChange={(e) => setSelectedTicket({ ...selectedTicket, reason: e.target.value })}
                      style={{ border: '1.5px solid #25108f', padding: '10px 12px', borderRadius: '6px', background: '#fff', outline: 'none', fontSize: '13px', color: 'var(--text)', fontWeight: '600' }}
                      options={[{
                        label: "Subscription Double Billing",
                        value: "Subscription Double Billing"
                      }, {
                        label: "Invoice Mistake",
                        value: "Invoice Mistake"
                      }, {
                        label: "Service Delay",
                        value: "Service Delay"
                      }, {
                        label: "SLA Breach Compensation",
                        value: "SLA Breach Compensation"
                      }]} />
                  </div>

                  {/* Approval level required */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <span style={{ fontSize: '11.5px', fontWeight: '800', color: 'var(--muted)' }}>Approval Level Required</span>
                    <div style={{
                      height: '38px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                      background: '#ecfdf5',
                      border: '1px solid #d1fae5',
                      borderRadius: '6px',
                      padding: '0 12px'
                    }}>
                      <span style={{ fontSize: '11.5px', fontWeight: '800', color: '#047857' }}>
                        Standard Agent
                      </span>
                      <span style={{ fontSize: '9px', fontWeight: '900', background: '#059669', color: '#fff', padding: '1px 5px', borderRadius: '4px', textTransform: 'uppercase' }}>
                        AUTO-APPROVED
                      </span>
                    </div>
                  </div>

                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  
                  {/* Amount input */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <span style={{ fontSize: '11.5px', fontWeight: '800', color: 'var(--muted)' }}>Amount (USD)</span>
                    <div style={{ display: 'flex', alignItems: 'center', border: '1.5px solid #25108f', padding: '0 12px', borderRadius: '6px', background: '#fff' }}>
                      <span style={{ fontSize: '13.5px', color: 'var(--muted)', fontWeight: '800', marginRight: '4px' }}>$</span>
                      <input
                        type="text"
                        value={selectedTicket.amount}
                        onChange={(e) => setSelectedTicket({ ...selectedTicket, amount: e.target.value })}
                        style={{ border: 'none', background: 'transparent', outline: 'none', padding: '10px 0', fontSize: '13px', color: 'var(--text)', fontWeight: '750', width: '100%' }}
                      />
                    </div>
                  </div>

                  {/* Refund type selector */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <span style={{ fontSize: '11.5px', fontWeight: '800', color: 'var(--muted)' }}>Refund Type</span>
                    <div style={{ display: 'flex', gap: '10px', height: '38px' }}>
                      <button
                        type="button"
                        onClick={() => setSelectedTicket({ ...selectedTicket, type: 'Wallet' })}
                        style={{
                          flex: 1,
                          border: selectedTicket.type === 'Wallet' ? '2px solid var(--primary)' : '1.5px solid #25108f',
                          borderRadius: '6px',
                          background: selectedTicket.type === 'Wallet' ? 'var(--primary)' : '#fff',
                          color: selectedTicket.type === 'Wallet' ? '#fff' : 'var(--text)',
                          fontWeight: '800',
                          fontSize: '12.5px',
                          cursor: 'pointer'
                        }}
                      >
                        Wallet
                      </button>
                      <button
                        type="button"
                        onClick={() => setSelectedTicket({ ...selectedTicket, type: 'Card' })}
                        style={{
                          flex: 1,
                          border: selectedTicket.type === 'Card' ? '2px solid var(--primary)' : '1.5px solid #25108f',
                          borderRadius: '6px',
                          background: selectedTicket.type === 'Card' ? 'var(--primary)' : '#fff',
                          color: selectedTicket.type === 'Card' ? '#fff' : 'var(--text)',
                          fontWeight: '800',
                          fontSize: '12.5px',
                          cursor: 'pointer'
                        }}
                      >
                        Card
                      </button>
                    </div>
                  </div>

                </div>

                {/* Internal notes */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <span style={{ fontSize: '11.5px', fontWeight: '800', color: 'var(--muted)' }}>Internal Notes</span>
                  <textarea
                    placeholder="Explain the rationale for this adjustment..."
                    value={selectedTicket.notes}
                    onChange={(e) => setSelectedTicket({ ...selectedTicket, notes: e.target.value })}
                    rows={3}
                    style={{ width: '100%', border: '1.5px solid #25108f', padding: '10px', borderRadius: '6px', fontSize: '13px', outline: 'none', resize: 'vertical' }}
                  />
                </div>

                {/* Warning notice */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  background: '#eff6ff',
                  border: '1px solid #bfdbfe',
                  borderRadius: '6px',
                  padding: '10px 14px'
                }}>
                  <ShieldCheck size={16} style={{ color: '#1e40af', flexShrink: 0 }} />
                  <p style={{ fontSize: '11.5px', color: '#1e40af', margin: 0, fontWeight: '600' }}>
                    Funds will be available in HOZIFY Wallet instantly.
                  </p>
                </div>

                {/* Action buttons */}
                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', borderTop: '1px dashed var(--lavender)', paddingTop: '16px' }}>
                  <button
                    onClick={() => setSelectedTicket(null)}
                    style={{
                      height: '36px',
                      padding: '0 16px',
                      borderRadius: '6px',
                      border: '1.5px solid #25108f',
                      background: '#fff',
                      color: 'var(--text)',
                      fontSize: '13px',
                      fontWeight: '750',
                      cursor: 'pointer'
                    }}
                    type="button"
                  >
                    Discard
                  </button>

                  <button
                    onClick={handleExecuteCompensation}
                    style={{
                      height: '36px',
                      padding: '0 16px',
                      borderRadius: '6px',
                      border: 'none',
                      background: 'var(--primary)',
                      color: '#fff',
                      fontSize: '13px',
                      fontWeight: '750',
                      cursor: 'pointer',
                      boxShadow: '0 2px 4px rgba(37, 16, 143, 0.1)'
                    }}
                    type="button"
                  >
                    Execute Compensation
                  </button>
                </div>

              </div>
            ) : (
              <div className="panel" style={{ padding: '48px 24px', textAlign: 'center', color: 'var(--muted)' }}>
                Select a pending compensation request above to initialize the terminal form.
              </div>
            )}

          </div>

          {/* Right Column Panels: Wallet Details + Processed Feed */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-section)' }}>
            
            {/* HOZIFY Wallet Details */}
            <div className="panel" style={{
              background: 'linear-gradient(135deg, var(--primary) 0%, var(--primary-2) 100%)',
              color: '#ffffff',
              padding: 'var(--spacing-section)',
              display: 'flex',
              flexDirection: 'column',
              gap: '16px',
              position: 'relative'
            }}>
              <div>
                <span style={{ fontSize: '10.5px', fontWeight: '850', color: 'rgba(255, 255, 255, 0.7)', letterSpacing: '0.5px', textTransform: 'uppercase' }}>
                  Hozify Wallet
                </span>
                <span style={{ display: 'block', fontSize: '11px', color: 'rgba(255,255,255,0.7)', marginTop: '2px' }}>
                  Total payouts today
                </span>
                <strong style={{ display: 'block', fontSize: '26px', color: '#ffffff', fontWeight: '850', marginTop: '4px' }}>
                  $4,285.40
                </strong>
              </div>

              {/* Velocity stats */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '16px' }}>
                <div>
                  <span style={{ display: 'block', fontSize: '11px', color: 'rgba(255, 255, 255, 0.8)' }}>
                    Payout Velocity
                  </span>
                  <span style={{ fontSize: '12px', fontWeight: '850', color: '#6ee7b7', display: 'inline-flex', alignItems: 'center', gap: '2px', marginTop: '2px' }}>
                    <TrendingUp size={11} />
                    +12% vs Yesterday
                  </span>
                </div>

                {/* Simulated Sparkline Bar Chart */}
                <div style={{ display: 'flex', gap: '4px', alignItems: 'flex-end', height: '30px' }}>
                  <div style={{ height: '10px', width: '4px', background: 'rgba(255,255,255,0.3)', borderRadius: '1px' }} />
                  <div style={{ height: '14px', width: '4px', background: 'rgba(255,255,255,0.3)', borderRadius: '1px' }} />
                  <div style={{ height: '22px', width: '4px', background: 'rgba(255,255,255,0.6)', borderRadius: '1px' }} />
                  <div style={{ height: '30px', width: '4px', background: '#6ee7b7', borderRadius: '1px' }} />
                </div>
              </div>
            </div>

            {/* Recently Processed feed */}
            <div className="panel" style={{ padding: 'var(--spacing-section)', display: 'flex', flexDirection: 'column', gap: '16px', background: '#fff' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h3 style={{ fontSize: '14.5px', fontWeight: '850', color: 'var(--text)', margin: 0 }}>
                  Recently Processed
                </h3>
                <button
                  onClick={() => alert('Loading session processed receipts...')}
                  style={{ border: 'none', background: 'transparent', color: 'var(--primary)', fontSize: '11.5px', fontWeight: '800', cursor: 'pointer' }}
                  type="button"
                >
                  View All
                </button>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {recentProcessed.map((item, idx) => (
                  <div
                    key={idx}
                    style={{
                      display: 'flex',
                      gap: '10px',
                      alignItems: 'center',
                      borderBottom: '1px solid var(--lavender)',
                      paddingBottom: '10px',
                      fontSize: '12.5px'
                    }}
                  >
                    <CheckCircle size={15} style={{ color: '#10b981', flexShrink: 0 }} />
                    <div style={{ flex: 1, overflow: 'hidden' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <strong style={{ color: 'var(--text)', textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>
                          {item.id} • {item.amount}
                        </strong>
                        <span style={{ fontSize: '10.5px', color: 'var(--muted)', flexShrink: 0 }}>
                          {item.time}
                        </span>
                      </div>
                      <span style={{ fontSize: '11px', color: 'var(--muted)', display: 'block', marginTop: '1px' }}>
                        Processed for {item.customer}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              <button
                onClick={() => alert('Exporting session log files...')}
                style={{
                  width: '100%',
                  height: '35px',
                  border: '1.5px solid #25108f',
                  background: '#fff',
                  borderRadius: '6px',
                  fontSize: '12px',
                  fontWeight: '800',
                  color: 'var(--muted)',
                  cursor: 'pointer',
                  marginTop: '4px'
                }}
                type="button"
              >
                End of session processing log
              </button>
            </div>

          </div>

        </div>

        {/* Bottom Section: Resolution Metrics by Approval Level */}
        <div className="panel" style={{ padding: 'var(--spacing-section)', display: 'flex', flexDirection: 'column', gap: '16px', background: '#fff' }}>
          <h3 style={{ fontSize: '15.5px', fontWeight: '850', color: 'var(--text)', margin: 0 }}>
            Resolution Metrics by Approval Level
          </h3>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', marginTop: '4px' }}>
            
            {/* L1 Support */}
            <div style={{ padding: '16px', border: '1.5px solid #25108f', borderRadius: '8px', background: 'var(--soft)' }}>
              <span style={{ display: 'block', fontSize: '10.5px', color: 'var(--muted)', fontWeight: '800', textTransform: 'uppercase' }}>
                L1 Support (Standard)
              </span>
              <strong style={{ display: 'block', fontSize: '20px', color: 'var(--text)', fontWeight: '850', marginTop: '4px' }}>
                $1,240
              </strong>
              <div style={{ height: '4px', background: '#eee9f6', borderRadius: '2px', overflow: 'hidden', marginTop: '10px' }}>
                <div style={{ width: '40%', height: '100%', background: '#10b981' }} />
              </div>
              <span style={{ fontSize: '11px', color: '#10b981', fontWeight: '800', display: 'block', marginTop: '6px' }}>
                Low Risk
              </span>
            </div>

            {/* Team Leads */}
            <div style={{ padding: '16px', border: '1.5px solid #25108f', borderRadius: '8px', background: 'var(--soft)' }}>
              <span style={{ display: 'block', fontSize: '10.5px', color: 'var(--muted)', fontWeight: '800', textTransform: 'uppercase' }}>
                Team Leads
              </span>
              <strong style={{ display: 'block', fontSize: '20px', color: 'var(--text)', fontWeight: '850', marginTop: '4px' }}>
                $3,890
              </strong>
              <div style={{ height: '4px', background: '#eee9f6', borderRadius: '2px', overflow: 'hidden', marginTop: '10px' }}>
                <div style={{ width: '65%', height: '100%', background: '#d97706' }} />
              </div>
              <span style={{ fontSize: '11px', color: '#d97706', fontWeight: '800', display: 'block', marginTop: '6px' }}>
                Moderate Risk
              </span>
            </div>

            {/* Finance Dept */}
            <div style={{ padding: '16px', border: '1.5px solid #25108f', borderRadius: '8px', background: 'var(--soft)' }}>
              <span style={{ display: 'block', fontSize: '10.5px', color: 'var(--muted)', fontWeight: '800', textTransform: 'uppercase' }}>
                Finance Dept
              </span>
              <strong style={{ display: 'block', fontSize: '20px', color: 'var(--text)', fontWeight: '850', marginTop: '4px' }}>
                $12,450
              </strong>
              <div style={{ height: '4px', background: '#eee9f6', borderRadius: '2px', overflow: 'hidden', marginTop: '10px' }}>
                <div style={{ width: '85%', height: '100%', background: '#dc2626' }} />
              </div>
              <span style={{ fontSize: '11px', color: '#dc2626', fontWeight: '800', display: 'block', marginTop: '6px' }}>
                High Vol Risk
              </span>
            </div>

            {/* VP Approval */}
            <div style={{ padding: '16px', border: '1.5px solid #25108f', borderRadius: '8px', background: 'var(--soft)' }}>
              <span style={{ display: 'block', fontSize: '10.5px', color: 'var(--muted)', fontWeight: '800', textTransform: 'uppercase' }}>
                VP Approval (Executive)
              </span>
              <strong style={{ display: 'block', fontSize: '20px', color: 'var(--text)', fontWeight: '850', marginTop: '4px' }}>
                $0.00
              </strong>
              <div style={{ height: '4px', background: '#eee9f6', borderRadius: '2px', overflow: 'hidden', marginTop: '10px' }}>
                <div style={{ width: '0%', height: '100%', background: '#4b5563' }} />
              </div>
              <span style={{ fontSize: '11px', color: 'var(--muted)', fontWeight: '800', display: 'block', marginTop: '6px' }}>
                Inactive
              </span>
            </div>

          </div>
        </div>

      </div>
    </AdminShell>
  );
}


