import React, { useState, useEffect } from 'react';
import {
  Plus,
  Radio,
  Clock,
  Activity,
  User,
  Users,
  Search,
  CheckCircle,
  AlertOctagon,
  ArrowRight,
  TrendingUp,
  Filter,
  Volume2,
  ShieldAlert
} from 'lucide-react';
import AdminShell from '../../components/layouts/AdminShell';

export default function SupportOperationsCenter({ activeTab = 'Support Center', defaultFilter = 'all' }) {
  const [filter, setFilter] = useState(defaultFilter);
  const [search, setSearch] = useState('');
  const [broadcastActive, setBroadcastActive] = useState(false);

  // Sync prop changes to filter state
  useEffect(() => {
    setFilter(defaultFilter);
  }, [defaultFilter]);

  // Interactive Live Ticket Queue
  const [tickets, setTickets] = useState([
    { id: '#TK-4821', priority: 'Critical', subject: 'Subscription refund gateway failing', requester: 'Marcus Aurelius', status: 'open', category: 'payments' },
    { id: '#TK-4835', priority: 'High', subject: 'ISP branch manager credentials locked', requester: 'Sarah Connor', status: 'in-progress', category: 'technical' },
    { id: '#TK-4842', priority: 'Normal', subject: 'Aadhaar file format upload issue', requester: 'Vikram Singh', status: 'open', category: 'kyc' },
    { id: '#TK-4890', priority: 'Critical', subject: 'Wallet double-debit during checkout', requester: 'Elena Rostova', status: 'in-progress', category: 'wallet' },
    { id: '#TK-4712', priority: 'Normal', subject: 'Incorrect invoice calculation on GST', requester: 'Lars Ulrich', status: 'closed', category: 'payments' },
    { id: '#TK-4680', priority: 'High', subject: 'Double booking reservation overlap', requester: 'John Doe', status: 'open', category: 'bookings' }
  ]);

  // Handle adding a new ticket mock
  const handleNewTicket = () => {
    const subject = prompt('Enter Ticket Subject:');
    if (!subject) return;
    const category = prompt('Enter Category (bookings, payments, wallet, technical, kyc):') || 'technical';
    const priority = prompt('Enter Priority (Critical, High, Normal):') || 'Normal';

    const newTk = {
      id: `#TK-${Math.floor(1000 + Math.random() * 9000)}`,
      priority,
      subject,
      requester: 'Admin Console User',
      status: 'open',
      category: category.toLowerCase()
    };

    setTickets([newTk, ...tickets]);
  };

  const handleBroadcast = () => {
    setBroadcastActive(true);
    setTimeout(() => {
      setBroadcastActive(false);
    }, 6000);
  };

  // Filter logic
  const filteredTickets = tickets.filter(t => {
    // Search filter
    const matchesSearch = t.id.toLowerCase().includes(search.toLowerCase()) || 
                          t.subject.toLowerCase().includes(search.toLowerCase()) ||
                          t.requester.toLowerCase().includes(search.toLowerCase());
    
    // Tab filter
    if (filter === 'all') return matchesSearch;
    if (filter === 'open') return t.status === 'open' && matchesSearch;
    if (filter === 'in-progress') return t.status === 'in-progress' && matchesSearch;
    if (filter === 'closed') return t.status === 'closed' && matchesSearch;
    
    // Category mapping filters
    return t.category === filter && matchesSearch;
  });

  return (
    <AdminShell
      activeTab={activeTab}
      brandText="HOZIFY"
      brandSubText="Enterprise Admin"
      headerTitle="Operations Center"
      searchPlaceholder="Search Live tickets, IDs..."
      searchValue={search}
      onSearchChange={(val) => setSearch(val)}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-section)', padding: '24px 0', position: 'relative' }}>
        
        {/* Broadcast System Banner Alert */}
        {broadcastActive && (
          <div style={{
            background: 'linear-gradient(90deg, #1e40af 0%, #3b82f6 50%, #1e40af 100%)',
            border: '1.5px solid #60a5fa',
            borderRadius: '8px',
            padding: '14px 20px',
            color: '#fff',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            animation: 'slide-down 0.3s ease-out',
            boxShadow: '0 4px 12px rgba(59, 130, 246, 0.3)'
          }}>
            <Volume2 size={18} style={{ flexShrink: 0 }} />
            <div style={{ flex: 1 }}>
              <strong style={{ fontSize: '14px', display: 'block' }}>SYSTEM BROADCAST SENT</strong>
              <span style={{ fontSize: '12px', opacity: 0.9 }}>
                Notification alert ping sent to all 22 active online support specialists.
              </span>
            </div>
          </div>
        )}

        {/* Page Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <h1 style={{ fontSize: '24px', fontWeight: '800', color: 'var(--text)', margin: 0 }}>
              Support Operations Center
            </h1>
            <p style={{ fontSize: '13px', color: 'var(--muted)', margin: '4px 0 0' }}>
              Live incoming support requests queue, agent utilization metrics, and security incident monitors
            </p>
          </div>

          <div style={{ display: 'flex', gap: '12px' }}>
            <button
              onClick={handleBroadcast}
              style={{
                height: '38px',
                padding: '0 16px',
                borderRadius: '6px',
                border: '1.5px solid #25108f',
                background: '#fff',
                color: 'var(--muted)',
                fontWeight: '700',
                fontSize: '13px',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                cursor: 'pointer'
              }}
              type="button"
            >
              <Radio size={14} style={{ color: '#ef4444' }} />
              <span>Broadcast Alert</span>
            </button>

            <button
              onClick={handleNewTicket}
              style={{
                height: '38px',
                padding: '0 16px',
                borderRadius: '6px',
                border: 'none',
                background: 'var(--primary)',
                color: '#fff',
                fontWeight: '700',
                fontSize: '13px',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                cursor: 'pointer',
                boxShadow: '0 2px 4px rgba(37, 16, 143, 0.1)'
              }}
              type="button"
            >
              <Plus size={16} />
              <span>New Ticket</span>
            </button>
          </div>
        </div>

        {/* Interactive Filter Menu Tabs */}
        <div style={{ display: 'flex', borderBottom: '1.5px solid var(--lavender)', gap: '16px', flexWrap: 'wrap' }}>
          {[
            { key: 'all', label: 'All Live' },
            { key: 'open', label: 'Open' },
            { key: 'in-progress', label: 'In Progress' },
            { key: 'closed', label: 'Closed' },
            { key: 'bookings', label: 'Bookings' },
            { key: 'payments', label: 'Payments' },
            { key: 'wallet', label: 'Wallet' },
            { key: 'technical', label: 'Technical' },
            { key: 'kyc', label: 'KYC' }
          ].map((item) => {
            const isActive = filter === item.key;
            return (
              <button
                key={item.key}
                onClick={() => setFilter(item.key)}
                style={{
                  border: 'none',
                  background: 'transparent',
                  padding: '10px 4px',
                  fontSize: '13px',
                  fontWeight: isActive ? '850' : '700',
                  color: isActive ? 'var(--primary)' : 'var(--muted)',
                  borderBottom: isActive ? '3px solid var(--primary)' : '3px solid transparent',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease',
                  marginBottom: '-1px'
                }}
                type="button"
              >
                {item.label}
              </button>
            );
          })}
        </div>

        {/* Section 1: Queue and Critical Breaches */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr', lgGridTemplateColumns: '2fr 1fr', gap: 'var(--spacing-section)', alignItems: 'stretch' }}>
          
          {/* Live Ticket Queue Table */}
          <div className="panel" style={{ padding: 'var(--spacing-section)', display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <h3 style={{ fontSize: '15px', fontWeight: '850', color: 'var(--text)', margin: 0 }}>
              Live Ticket Queue
            </h3>
            
            <div style={{ overflowY: 'auto', maxHeight: '400px', flex: 1 }}>
              <div className="table-responsive-wrapper">
<table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px', textAlign: 'left', minWidth: '600px' }}>
                <thead>
                  <tr style={{ background: 'var(--soft)', borderBottom: '1.5px solid #25108f' }}>
                    <th style={{ padding: '12px 16px', color: 'var(--muted)', fontWeight: '800', textTransform: 'uppercase', fontSize: '10px' }}>Priority</th>
                    <th style={{ padding: '12px 16px', color: 'var(--muted)', fontWeight: '800', textTransform: 'uppercase', fontSize: '10px' }}>Ticket ID</th>
                    <th style={{ padding: '12px 16px', color: 'var(--muted)', fontWeight: '800', textTransform: 'uppercase', fontSize: '10px' }}>Subject</th>
                    <th style={{ padding: '12px 16px', color: 'var(--muted)', fontWeight: '800', textTransform: 'uppercase', fontSize: '10px' }}>Requester</th>
                    <th style={{ padding: '12px 16px', color: 'var(--muted)', fontWeight: '800', textTransform: 'uppercase', fontSize: '10px' }}>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredTickets.length === 0 ? (
                    <tr>
                      <td colSpan={5} style={{ padding: 'var(--spacing-page)', textAlign: 'center', color: 'var(--muted)' }}>
                        No tickets match the selected filter.
                      </td>
                    </tr>
                  ) : (
                    filteredTickets.map((row) => (
                      <tr key={row.id} style={{ borderBottom: '1px solid var(--lavender)' }}>
                        <td style={{ padding: '14px 16px' }}>
                          <span style={{
                            fontSize: '9.5px',
                            fontWeight: '900',
                            padding: '2px 6px',
                            borderRadius: '4px',
                            textTransform: 'uppercase',
                            background: row.priority === 'Critical' ? '#fee2e2' : row.priority === 'High' ? '#fff9db' : '#eff6ff',
                            color: row.priority === 'Critical' ? '#dc2626' : row.priority === 'High' ? '#b58000' : '#1e40af'
                          }}>
                            {row.priority}
                          </span>
                        </td>
                        <td style={{ padding: '14px 16px', fontWeight: '800', color: 'var(--primary)' }}>
                          {row.id}
                        </td>
                        <td style={{ padding: '14px 16px', fontWeight: '700', color: 'var(--text)' }}>
                          {row.subject}
                        </td>
                        <td style={{ padding: '14px 16px', color: 'var(--muted)' }}>
                          {row.requester}
                        </td>
                        <td style={{ padding: '14px 16px' }}>
                          <span style={{
                            fontSize: '10px',
                            fontWeight: '850',
                            padding: '3px 8px',
                            borderRadius: '12px',
                            background: row.status === 'open' ? '#fee2e2' : row.status === 'in-progress' ? '#fff9db' : '#d1fae5',
                            color: row.status === 'open' ? '#dc2626' : row.status === 'in-progress' ? '#b58000' : '#07956f'
                          }}>
                            {row.status === 'in-progress' ? 'In Progress' : row.status === 'open' ? 'Open' : 'Closed'}
                          </span>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
</div>
            </div>
          </div>

          {/* Right Column: SLA Breaches & Stress Monitor */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-section)' }}>
            
            {/* Global Stress Monitor graphic card */}
            <div className="panel" style={{
              background: 'linear-gradient(135deg, var(--primary) 0%, var(--primary-2) 100%)',
              color: '#ffffff',
              padding: 'var(--spacing-section)',
              display: 'flex',
              flexDirection: 'column',
              gap: '16px',
              position: 'relative',
              overflow: 'hidden'
            }}>
              {/* Graphic Ring Background effect */}
              <div style={{
                position: 'absolute',
                right: '-40px',
                bottom: '-40px',
                width: '180px',
                height: '180px',
                borderRadius: '50%',
                border: '18px solid rgba(255, 255, 255, 0.05)',
                pointerEvents: 'none'
              }} />

              <div>
                <span style={{ fontSize: '10px', fontWeight: '850', color: 'rgba(255, 255, 255, 0.7)', letterSpacing: '1px', textTransform: 'uppercase' }}>
                  Operational State
                </span>
                <h3 style={{ fontSize: '17px', fontWeight: '850', color: '#ffffff', margin: '4px 0 0' }}>
                  Global Stress Monitor
                </h3>
              </div>

              {/* Dial Representation */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '20px', margin: '8px 0' }}>
                <div style={{
                  height: '64px',
                  width: '64px',
                  borderRadius: '50%',
                  border: '6px solid rgba(255,255,255,0.1)',
                  borderTopColor: '#ef4444', // Red indicator
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  position: 'relative'
                }}>
                  <strong style={{ fontSize: '15px', fontWeight: '900' }}>8.4</strong>
                </div>

                <div>
                  <strong style={{ fontSize: '15px', color: '#fca5a5', display: 'block', textTransform: 'uppercase', fontWeight: '850' }}>
                    HIGH STRESS
                  </strong>
                  <span style={{ fontSize: '12px', color: 'rgba(255, 255, 255, 0.8)' }}>
                    Queue exceeds optimal threshold capacity ratio by 22%
                  </span>
                </div>
              </div>
            </div>

            {/* Critical SLA Breaches cards */}
            <div className="panel" style={{ padding: 'var(--spacing-section)', display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <h3 style={{ fontSize: '14.5px', fontWeight: '850', color: 'var(--text)', margin: 0 }}>
                Critical SLA Breaches
              </h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {[
                  { id: '#TK-4821', overdue: '-05:43:02', pct: 92, subj: 'Refund Gateway Failure' },
                  { id: '#TK-4890', overdue: '-02:14:15', pct: 78, subj: 'Checkout Wallet Double-Debit' }
                ].map((item, idx) => (
                  <div
                    key={idx}
                    style={{
                      padding: '14px',
                      borderRadius: '6px',
                      border: '1px solid #fee2e2',
                      background: '#fff5f5',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '8px'
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <strong style={{ fontSize: '12.5px', color: '#dc2626' }}>{item.id}</strong>
                      <span style={{
                        fontSize: '11px',
                        fontWeight: '850',
                        color: '#dc2626',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '3px'
                      }}>
                        <Clock size={12} />
                        {item.overdue}
                      </span>
                    </div>
                    <span style={{ fontSize: '12px', fontWeight: '700', color: 'var(--text)' }}>
                      {item.subj}
                    </span>
                    {/* Progress limits */}
                    <div style={{ height: '4px', background: '#fee2e2', borderRadius: '2px', overflow: 'hidden', marginTop: '4px' }}>
                      <div style={{ width: `${item.pct}%`, height: '100%', background: '#dc2626' }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>

        {/* Section 2: Attribution, Resolution Velocity, and High Severity Incidents */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 'var(--spacing-section)' }}>
          
          {/* Active Agents list */}
          <div className="panel" style={{ padding: 'var(--spacing-section)', display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <h3 style={{ fontSize: '15px', fontWeight: '850', color: 'var(--text)', margin: 0 }}>
              Agents Active (Online)
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {[
                { name: 'Sarah Miller', initial: 'SM', status: 'Available', color: '#10b981', details: 'Active on 2 technical threads' },
                { name: 'Marcus Knight', initial: 'MK', status: 'In Call', color: '#3b82f6', details: 'Handling high billing escalation' },
                { name: 'Emily Lu', initial: 'EL', status: 'Available', color: '#10b981', details: 'Unassigned load capacity (2/10)' },
                { name: 'John Davis', initial: 'JD', status: 'On Break', color: '#7a7688', details: 'Returning in 8 minutes' }
              ].map((ag, idx) => (
                <div key={idx} style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                  <div style={{ position: 'relative' }}>
                    <div style={{
                      height: '34px',
                      width: '34px',
                      borderRadius: '50%',
                      background: 'var(--soft)',
                      color: 'var(--primary)',
                      fontSize: '12px',
                      fontWeight: '800',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      {ag.initial}
                    </div>
                    {/* Status dot overlay */}
                    <span style={{
                      position: 'absolute',
                      right: '0',
                      bottom: '0',
                      height: '8px',
                      width: '8px',
                      borderRadius: '50%',
                      background: ag.color,
                      border: '1.5px solid #fff'
                    }} />
                  </div>

                  <div style={{ flex: 1 }}>
                    <strong style={{ display: 'block', fontSize: '13px', color: 'var(--text)' }}>
                      {ag.name}
                    </strong>
                    <span style={{ fontSize: '11px', color: 'var(--muted)' }}>
                      {ag.details}
                    </span>
                  </div>

                  <span style={{
                    fontSize: '10px',
                    fontWeight: '800',
                    color: ag.status === 'Available' ? '#10b981' : ag.status === 'In Call' ? '#2563eb' : '#4b5563'
                  }}>
                    {ag.status}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Resolution Velocity Panel */}
          <div className="panel" style={{ padding: 'var(--spacing-section)', display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <h3 style={{ fontSize: '15px', fontWeight: '850', color: 'var(--text)', margin: 0 }}>
                  Resolution Velocity
                </h3>
                <span style={{ fontSize: '12px', color: 'var(--muted)', display: 'block', marginTop: '2px' }}>
                  Completed issues velocity tracker
                </span>
              </div>
              <strong style={{ fontSize: '18px', color: 'var(--green)', fontWeight: '850' }}>
                14.2 tk/hr
              </strong>
            </div>

            {/* Teal custom CSS progress/bar lines */}
            <div style={{ height: '110px', display: 'flex', alignItems: 'flex-end', gap: '10px', borderBottom: '1.5px solid #25108f', paddingBottom: '8px', marginTop: '12px' }}>
              {[35, 42, 50, 48, 62, 70, 78].map((pct, idx) => (
                <div key={idx} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
                  <div style={{
                    width: '100%',
                    height: `${pct}px`,
                    background: 'linear-gradient(180deg, #5eead4 0%, #14b8a6 100%)',
                    borderRadius: '3px 3px 0 0'
                  }} />
                  <span style={{ fontSize: '9px', color: 'var(--muted)', fontWeight: '750' }}>
                    H{idx + 1}
                  </span>
                </div>
              ))}
            </div>

            <span style={{ fontSize: '11.5px', color: 'var(--muted)', display: 'inline-flex', alignItems: 'center', gap: '3px', marginTop: '4px' }}>
              <TrendingUp size={12} style={{ color: 'var(--green)' }} />
              <strong style={{ color: 'var(--green)' }}>+18% productivity</strong> since queue bypass rules
            </span>
          </div>

          {/* High Severity Security Incident alerts */}
          <div className="panel" style={{ padding: 'var(--spacing-section)', display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <h3 style={{ fontSize: '15px', fontWeight: '850', color: 'var(--text)', margin: 0 }}>
              High-Severity Incidents
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {[
                { title: 'Financial Anomaly', details: 'Payout mismatch of ₹48,000 on partner branch ID #492', color: '#dc2626' },
                { title: 'Data Privacy GDPR', details: 'Authorized request for full profile deletion from ID #9102', color: 'var(--primary)' },
                { title: 'Identity Fraud Lock', details: 'Multiple simultaneous logins blocked for account #SM-944', color: '#d97706' }
              ].map((inc, idx) => (
                <div
                  key={idx}
                  style={{
                    display: 'flex',
                    gap: '10px',
                    alignItems: 'flex-start',
                    borderBottom: '1px solid var(--lavender)',
                    paddingBottom: '10px'
                  }}
                >
                  <AlertOctagon size={16} style={{ color: inc.color, flexShrink: 0, marginTop: '2px' }} />
                  <div>
                    <strong style={{ display: 'block', fontSize: '12.5px', color: inc.color }}>
                      {inc.title}
                    </strong>
                    <span style={{ fontSize: '11.5px', color: 'var(--muted)', lineHeight: '1.3', display: 'block', marginTop: '2px' }}>
                      {inc.details}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
      
      <style>{`
        @keyframes slide-down {
          from {
            transform: translateY(-10px);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
      `}</style>
    </AdminShell>
  );
}


