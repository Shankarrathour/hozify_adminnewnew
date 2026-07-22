import React, { useState } from 'react';
import {
  Clock,
  TrendingUp,
  TrendingDown,
  UserCheck,
  CheckCircle,
  AlertTriangle,
  Play,
  Sliders,
  MoreVertical,
  Activity,
  Send,
  HelpCircle,
  ArrowRight
} from 'lucide-react';
import AdminShell from '../../components/layouts/AdminShell';

export default function SupportDashboard({ activeTab = 'Support Center' }) {
  const [unassignedTickets, setUnassignedTickets] = useState([
    { id: '#TK-9021', name: 'Billing Discrepancy', text: 'User reporting an overcharge on the "Enterprise Basic" subscription', priority: 'High', time: '12m ago' },
    { id: '#TK-8944', name: 'API Integration Failure', text: 'Webhook endpoints returning 500 errors consistently for the last 2...', priority: 'Medium', time: '45m ago' },
    { id: '#TK-9102', name: 'Login Blocked', text: 'Admin user unable to access dashboard. MFA token not being...', priority: 'Critical', time: '2m ago' }
  ]);

  const [agents, setAgents] = useState([
    { id: 'Sarah', name: 'Sarah Miller', role: 'Tier 2 Support', status: 'Available', color: '#10b981', bg: '#ecfdf5', initials: 'SM', load: 4, max: 10, resolution: '11m 45s' },
    { id: 'John', name: 'John Davis', role: 'Billing Specialist', status: 'On Break', color: '#7a7688', bg: '#f3f4f6', initials: 'JD', load: 8, max: 10, resolution: '18m 12s' },
    { id: 'Emily', name: 'Emily Lu', role: 'Integration Lead', status: 'Available', color: '#10b981', bg: '#ecfdf5', initials: 'EL', load: 2, max: 10, resolution: '09m 20s' },
    { id: 'Marcus', name: 'Marcus Knight', role: 'General Support', status: 'Available', color: '#10b981', bg: '#ecfdf5', initials: 'MK', load: 6, max: 10, resolution: '15m 05s' }
  ]);

  const [selectedTicket, setSelectedTicket] = useState(unassignedTickets[0] || null);

  const handleAssign = (agentId) => {
    if (!selectedTicket) {
      alert('Please select a ticket from the left list to assign first.');
      return;
    }

    // Assign the ticket
    setUnassignedTickets(unassignedTickets.filter(t => t.id !== selectedTicket.id));
    setAgents(agents.map(a => {
      if (a.id === agentId) {
        return { ...a, load: Math.min(a.load + 1, a.max) };
      }
      return a;
    }));

    alert(`Ticket ${selectedTicket.id} has been assigned to ${agents.find(a => a.id === agentId).name}.`);
    
    // Select next ticket
    const remaining = unassignedTickets.filter(t => t.id !== selectedTicket.id);
    setSelectedTicket(remaining[0] || null);
  };

  return (
    <AdminShell showGlobalExport={true}
      activeTab={activeTab}
      brandText="HOZIFY"
      brandSubText="Enterprise Admin"
      headerTitle="Support Operations"
      searchPlaceholder="Search agents or tickets..."
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-section)', padding: '24px 0', position: 'relative' }}>
        
        {/* Page Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <h1 style={{ fontSize: '24px', fontWeight: '800', color: 'var(--text)', margin: 0 }}>
              Support Command Dashboard
            </h1>
            <p style={{ fontSize: '13px', color: 'var(--muted)', margin: '4px 0 0' }}>
              Real-time monitoring of service desk performance, queue depth, and agent allocations
            </p>
          </div>
        </div>

        {/* KPI Metrics Row */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
          {/* KPI 1: Unassigned */}
          <div className="panel" style={{ padding: 'var(--spacing-section)', display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '10.5px', fontWeight: '800', color: 'var(--muted)', letterSpacing: '0.5px', textTransform: 'uppercase' }}>
                Unassigned Queue
              </span>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '32px', height: '32px', borderRadius: '6px', background: '#fee2e2', color: '#dc2626' }}>
                <AlertTriangle size={15} />
              </div>
            </div>
            <div>
              <strong style={{ display: 'block', fontSize: '28px', color: 'var(--text)', fontWeight: '850' }}>
                {unassignedTickets.length}
              </strong>
              <span style={{ fontSize: '12px', fontWeight: '750', color: 'var(--green)', display: 'inline-flex', alignItems: 'center', gap: '3px', marginTop: '4px' }}>
                <TrendingDown size={12} />
                -12% vs last hour
              </span>
            </div>
          </div>

          {/* KPI 2: Capacity */}
          <div className="panel" style={{ padding: 'var(--spacing-section)', display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '10.5px', fontWeight: '800', color: 'var(--muted)', letterSpacing: '0.5px', textTransform: 'uppercase' }}>
                Avg. Capacity
              </span>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '32px', height: '32px', borderRadius: '6px', background: '#f5f3ff', color: 'var(--primary)' }}>
                <Activity size={15} />
              </div>
            </div>
            <div>
              <strong style={{ display: 'block', fontSize: '28px', color: 'var(--text)', fontWeight: '850' }}>
                76%
              </strong>
              {/* Progress bar */}
              <div style={{ height: '6px', background: '#eee9f6', borderRadius: '3px', overflow: 'hidden', marginTop: '12px' }}>
                <div style={{ width: '76%', height: '100%', background: 'var(--primary)' }} />
              </div>
            </div>
          </div>

          {/* KPI 3: Active Agents */}
          <div className="panel" style={{ padding: 'var(--spacing-section)', display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '10.5px', fontWeight: '800', color: 'var(--muted)', letterSpacing: '0.5px', textTransform: 'uppercase' }}>
                Active Agents
              </span>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '32px', height: '32px', borderRadius: '6px', background: '#ecfdf5', color: '#059669' }}>
                <UserCheck size={15} />
              </div>
            </div>
            <div>
              <strong style={{ display: 'block', fontSize: '28px', color: 'var(--text)', fontWeight: '850' }}>
                18/22
              </strong>
              <span style={{ fontSize: '12px', fontWeight: '750', color: 'var(--muted)', display: 'inline-flex', alignItems: 'center', gap: '3px', marginTop: '4px' }}>
                Live now
              </span>
            </div>
          </div>

          {/* KPI 4: Avg Resolution */}
          <div className="panel" style={{ padding: 'var(--spacing-section)', display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '10.5px', fontWeight: '800', color: 'var(--muted)', letterSpacing: '0.5px', textTransform: 'uppercase' }}>
                Resolution (Avg)
              </span>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '32px', height: '32px', borderRadius: '6px', background: '#eff6ff', color: '#1e40af' }}>
                <Clock size={15} />
              </div>
            </div>
            <div>
              <strong style={{ display: 'block', fontSize: '28px', color: 'var(--text)', fontWeight: '850' }}>
                14m
              </strong>
              <span style={{ fontSize: '12px', fontWeight: '750', color: 'var(--red)', display: 'inline-flex', alignItems: 'center', gap: '3px', marginTop: '4px' }}>
                <TrendingUp size={12} />
                +2m vs average
              </span>
            </div>
          </div>
        </div>

        {/* Content Layout */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr', lgGridTemplateColumns: '1.2fr 1.8fr', gap: 'var(--spacing-section)', alignItems: 'stretch' }}>
          
          {/* Unassigned Tickets (Left Column) */}
          <div className="panel" style={{ padding: 'var(--spacing-section)', display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h2 style={{ fontSize: '15.5px', fontWeight: '850', color: 'var(--text)', margin: 0 }}>
                Unassigned Tickets
              </h2>
              <span style={{
                background: 'var(--primary)',
                color: '#fff',
                fontSize: '10.5px',
                fontWeight: '900',
                padding: '2px 8px',
                borderRadius: '12px',
                textTransform: 'uppercase',
                letterSpacing: '0.5px'
              }}>
                New Arrivals
              </span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '8px' }}>
              {unassignedTickets.length === 0 ? (
                <div style={{ padding: '40px 16px', textAlign: 'center', color: 'var(--muted)', fontSize: '13px' }}>
                  All incoming tickets have been assigned to active support specialists.
                </div>
              ) : (
                unassignedTickets.map((t) => {
                  const isSelected = selectedTicket?.id === t.id;
                  return (
                    <div
                      key={t.id}
                      onClick={() => setSelectedTicket(t)}
                      style={{
                        padding: '16px',
                        borderRadius: '8px',
                        border: isSelected ? '2px solid var(--primary)' : '1px solid var(--lavender)',
                        background: isSelected ? 'rgba(37, 16, 143, 0.02)' : '#fff',
                        cursor: 'pointer',
                        transition: 'all 0.15s ease',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '10px'
                      }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={{ fontSize: '12px', fontWeight: '800', color: 'var(--muted)' }}>
                          {t.id}
                        </span>
                        
                        <span style={{
                          fontSize: '9px',
                          fontWeight: '950',
                          padding: '2px 6px',
                          borderRadius: '4px',
                          textTransform: 'uppercase',
                          background: t.priority === 'Critical' ? '#fee2e2' : t.priority === 'High' ? '#fff9db' : '#eff6ff',
                          color: t.priority === 'Critical' ? '#dc2626' : t.priority === 'High' ? '#b58000' : '#1e40af'
                        }}>
                          {t.priority}
                        </span>
                      </div>

                      <div>
                        <strong style={{ display: 'block', fontSize: '14px', color: 'var(--text)' }}>
                          {t.name}
                        </strong>
                        <p style={{ fontSize: '12px', color: 'var(--muted)', margin: '4px 0 0', lineHeight: '1.4' }}>
                          {t.text}
                        </p>
                      </div>

                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px dashed var(--lavender)', paddingTop: '10px', fontSize: '11px', color: 'var(--muted)' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                          <Clock size={12} />
                          <span>{t.time}</span>
                        </div>
                        
                        <button style={{ border: 'none', background: 'transparent', cursor: 'pointer', color: 'var(--muted)' }} aria-label="More options">
                          <MoreVertical size={14} />
                        </button>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>

          {/* Agent Capacity & Load (Right Column) */}
          <div className="panel" style={{ padding: 'var(--spacing-section)', display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
              <div>
                <h2 style={{ fontSize: '15.5px', fontWeight: '850', color: 'var(--text)', margin: 0 }}>
                  Agent Capacity & Load
                </h2>
                <span style={{ fontSize: '12px', color: 'var(--muted)', display: 'block', marginTop: '2px' }}>
                  Live workloads, performance ratios, and active channels
                </span>
              </div>

              <div style={{ display: 'flex', gap: '8px' }}>
                <button
                  onClick={() => alert('Filtering active agents')}
                  style={{
                    height: '32px',
                    padding: '0 12px',
                    borderRadius: '6px',
                    border: '1.5px solid #25108f',
                    background: '#fff',
                    color: 'var(--muted)',
                    fontSize: '12px',
                    fontWeight: '700',
                    cursor: 'pointer'
                  }}
                  type="button"
                >
                  Filter: Availability
                </button>
                <button
                  onClick={() => alert('Sorting agents')}
                  style={{
                    height: '32px',
                    padding: '0 12px',
                    borderRadius: '6px',
                    border: '1.5px solid #25108f',
                    background: '#fff',
                    color: 'var(--muted)',
                    fontSize: '12px',
                    fontWeight: '700',
                    cursor: 'pointer'
                  }}
                  type="button"
                >
                  Sort: Performance
                </button>
              </div>
            </div>

            <div style={{ overflowY: 'auto', maxHeight: '400px', flex: 1 }}>
              <div className="table-responsive-wrapper">
<table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px', textAlign: 'left', minWidth: '500px' }}>
                <thead>
                  <tr style={{ background: 'var(--soft)', borderBottom: '1.5px solid #25108f' }}>
                    <th style={{ padding: '12px 16px', color: 'var(--muted)', fontWeight: '800', textTransform: 'uppercase', fontSize: '10px' }}>Agent Name</th>
                    <th style={{ padding: '12px 16px', color: 'var(--muted)', fontWeight: '800', textTransform: 'uppercase', fontSize: '10px' }}>Status</th>
                    <th style={{ padding: '12px 16px', color: 'var(--muted)', fontWeight: '800', textTransform: 'uppercase', fontSize: '10px', width: '130px' }}>Current Load</th>
                    <th style={{ padding: '12px 16px', color: 'var(--muted)', fontWeight: '800', textTransform: 'uppercase', fontSize: '10px' }}>Avg Resolution</th>
                    <th style={{ padding: '12px 16px', color: 'var(--muted)', fontWeight: '800', textTransform: 'uppercase', fontSize: '10px', textAlign: 'right' }}>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {agents.map((agent) => (
                    <tr key={agent.id} style={{ borderBottom: '1px solid var(--lavender)' }}>
                      <td style={{ padding: '14px 16px' }}>
                        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                          <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            width: '34px',
                            height: '34px',
                            borderRadius: '50%',
                            background: '#e9e2f6',
                            color: 'var(--primary)',
                            fontSize: '12.5px',
                            fontWeight: '800'
                          }}>
                            {agent.initials}
                          </div>
                          <div>
                            <strong style={{ display: 'block', color: 'var(--text)' }}>{agent.name}</strong>
                            <span style={{ fontSize: '11px', color: 'var(--muted)' }}>{agent.role}</span>
                          </div>
                        </div>
                      </td>

                      <td style={{ padding: '14px 16px' }}>
                        <span style={{
                          fontSize: '10px',
                          fontWeight: '850',
                          padding: '3px 8px',
                          borderRadius: '12px',
                          background: agent.bg,
                          color: agent.color
                        }}>
                          {agent.status}
                        </span>
                      </td>

                      <td style={{ padding: '14px 16px' }}>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11.5px', fontWeight: '750' }}>
                            <span>{agent.load}/{agent.max}</span>
                          </div>
                          <div style={{ height: '4px', background: '#eee9f6', borderRadius: '2px', overflow: 'hidden' }}>
                            <div style={{ width: `${(agent.load / agent.max) * 100}%`, height: '100%', background: agent.load >= 8 ? '#dc2626' : 'var(--primary)' }} />
                          </div>
                        </div>
                      </td>

                      <td style={{ padding: '14px 16px', fontWeight: '700', color: 'var(--text)' }}>
                        {agent.resolution}
                      </td>

                      <td style={{ padding: '14px 16px', textAlign: 'right' }}>
                        <button
                          onClick={() => handleAssign(agent.id)}
                          disabled={agent.status === 'On Break'}
                          style={{
                            height: '28px',
                            padding: '0 12px',
                            borderRadius: '4px',
                            border: 'none',
                            background: agent.status === 'On Break' ? '#e5e7eb' : 'var(--primary)',
                            color: agent.status === 'On Break' ? '#9ca3af' : '#fff',
                            fontSize: '11.5px',
                            fontWeight: '750',
                            cursor: agent.status === 'On Break' ? 'not-allowed' : 'pointer',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '4px'
                          }}
                          type="button"
                        >
                          <span>Assign</span>
                          <ArrowRight size={11} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
</div>
            </div>
          </div>

        </div>

      </div>
    </AdminShell>
  );
}


