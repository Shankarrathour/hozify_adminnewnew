import React, { useState } from 'react';
import {
  TrendingUp,
  TrendingDown,
  ChevronRight,
  AlertTriangle,
  UserCheck,
  CheckCircle,
  Activity,
  ArrowUpRight,
  Award,
  Clock,
  Briefcase
} from 'lucide-react';
import AdminShell from '../../components/layouts/AdminShell';

export default function SupportOperationsOverview({ activeTab = 'Support Center' }) {
  const [timeframe, setTimeframe] = useState('Last 30 Days');

  const metricCards = [
    { label: 'Total Tickets', value: '12,842', trend: '+12%', isPositive: true, subText: 'incoming volume' },
    { label: 'Open', value: '438', trend: '+4%', isPositive: false, subText: 'waiting response' },
    { label: 'In Progress', value: '1,204', trend: 'stable', isPositive: true, subText: 'active resolution' },
    { label: 'Escalated', value: '52', trend: 'High', isPositive: false, subText: 'tier-3 queue' },
    { label: 'Resolved', value: '10,642', trend: '94%', isPositive: true, subText: 'rate target' },
    { label: 'SLA Breached', value: '18', trend: '-2%', isPositive: true, subText: 'breach reduction' }
  ];

  const categories = [
    { label: 'Payments & Refunds', pct: 42, color: 'var(--primary)' },
    { label: 'KYC Verification', pct: 28, color: '#3b82f6' },
    { label: 'Technical Issues', pct: 15, color: 'var(--green)' },
    { label: 'Account Access', pct: 10, color: '#8b5cf6' },
    { label: 'General Inquiry', pct: 5, color: '#6b7280' }
  ];

  const topAgents = [
    { name: 'Jane Smith', role: 'Senior Tier 2', initial: 'JS', tickets: 342, rating: 5, sla: '100%' },
    { name: 'Marcus Kane', role: 'Payments Lead', initial: 'MK', tickets: 289, rating: 4, sla: '99.4%' },
    { name: 'Elena Lopez', role: 'Technical Support', initial: 'EL', tickets: 274, rating: 5, sla: '98.1%' }
  ];

  const escalations = [
    { id: '#TK-9021', name: 'Critical Payment Failure', reporter: 'Enterprise User A', overdue: 'Breaching in 12m' },
    { id: '#TK-8842', name: 'KYC Document Rejection Loop', reporter: 'Global Partner X', overdue: 'Breaching in 45m' },
    { id: '#TK-9105', name: 'API Timeout - Webhooks', reporter: 'Developer Team', overdue: 'In Progress - Level 2' }
  ];

  return (
    <AdminShell
      activeTab={activeTab}
      brandText="HOZIFY"
      brandSubText="Enterprise Admin"
      headerTitle="Operations Overview"
      searchPlaceholder="Search operations log..."
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-section)', padding: '24px 0', position: 'relative' }}>
        
        {/* Breadcrumb Row */}
        <div style={{ fontSize: '12px', fontWeight: '750', color: 'var(--muted)', display: 'flex', alignItems: 'center', gap: '6px' }}>
          <span>Support Center</span>
          <ChevronRight size={12} />
          <span style={{ color: 'var(--primary)' }}>Support Operations Overview</span>
        </div>

        {/* Page Header */}
        <div style={{ display: 'flex', justifySelf: 'stretch', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <h1 style={{ fontSize: '24px', fontWeight: '800', color: 'var(--text)', margin: 0 }}>
              Support Operations Overview
            </h1>
            <p style={{ fontSize: '13px', color: 'var(--muted)', margin: '4px 0 0' }}>
              Live monitoring of global support performance and SLA compliance.
            </p>
          </div>

          {/* Timeframe selector toggle */}
          <div style={{ display: 'flex', gap: '2px', background: 'var(--soft)', padding: '2px', borderRadius: '8px', border: '1.5px solid #25108f' }}>
            <button
              onClick={() => setTimeframe('Last 30 Days')}
              style={{
                height: '32px',
                padding: '0 16px',
                borderRadius: '6px',
                border: 'none',
                background: timeframe === 'Last 30 Days' ? '#fff' : 'transparent',
                color: timeframe === 'Last 30 Days' ? 'var(--text)' : 'var(--muted)',
                fontSize: '12.5px',
                fontWeight: '750',
                cursor: 'pointer'
              }}
              type="button"
            >
              Last 30 Days
            </button>
            <button
              onClick={() => setTimeframe('Quarterly')}
              style={{
                height: '32px',
                padding: '0 16px',
                borderRadius: '6px',
                border: 'none',
                background: timeframe === 'Quarterly' ? '#fff' : 'transparent',
                color: timeframe === 'Quarterly' ? 'var(--text)' : 'var(--muted)',
                fontSize: '12.5px',
                fontWeight: '750',
                cursor: 'pointer'
              }}
              type="button"
            >
              Quarterly
            </button>
          </div>
        </div>

        {/* KPI Metrics row (6 cards) */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(170px, 1fr))', gap: '16px' }}>
          {metricCards.map((card, idx) => (
            <div key={idx} className="panel" style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '8px', background: '#fff' }}>
              <div style={{ display: 'flex', justifySelf: 'stretch', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '11px', fontWeight: '800', color: 'var(--muted)', textTransform: 'uppercase' }}>
                  {card.label}
                </span>
                <span style={{
                  fontSize: '10px',
                  fontWeight: '850',
                  color: card.isPositive ? '#07956f' : '#dc2626',
                  background: card.isPositive ? '#ecfdf5' : '#fee2e2',
                  padding: '2px 6px',
                  borderRadius: '4px'
                }}>
                  {card.trend}
                </span>
              </div>
              <div>
                <strong style={{ display: 'block', fontSize: '24px', fontWeight: '850', color: 'var(--text)' }}>
                  {card.value}
                </strong>
                <span style={{ fontSize: '11.5px', color: 'var(--muted)' }}>
                  {card.subText}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Trends & Category row */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr', lgGridTemplateColumns: '2fr 1fr', gap: 'var(--spacing-section)', alignItems: 'stretch' }}>
          
          {/* Ticket Volume Trends Chart (Custom CSS column charts) */}
          <div className="panel" style={{ padding: 'var(--spacing-section)', display: 'flex', flexDirection: 'column', gap: '16px', background: '#fff' }}>
            <div style={{ display: 'flex', justifySelf: 'stretch', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3 style={{ fontSize: '15px', fontWeight: '850', color: 'var(--text)', margin: 0 }}>
                Ticket Volume Trends
              </h3>
              <div style={{ display: 'flex', gap: '12px', fontSize: '11px', fontWeight: '750' }}>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', color: 'var(--primary)' }}>
                  <span style={{ height: '8px', width: '8px', borderRadius: '20%', background: 'var(--primary)' }} />
                  Incoming
                </span>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', color: 'var(--green)' }}>
                  <span style={{ height: '8px', width: '8px', borderRadius: '20%', background: '#07956f' }} />
                  Resolved
                </span>
              </div>
            </div>

            {/* Custom Side-by-side columns representation */}
            <div style={{ height: '200px', display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', borderBottom: '1.5px solid #25108f', paddingBottom: '8px', gap: '20px', marginTop: '16px' }}>
              {[
                { incoming: 48, resolved: 36 },
                { incoming: 62, resolved: 58 },
                { incoming: 75, resolved: 68 },
                { incoming: 50, resolved: 42 },
                { incoming: 82, resolved: 74 },
                { incoming: 58, resolved: 65 },
                { incoming: 70, resolved: 78 }
              ].map((val, idx) => (
                <div key={idx} style={{ flex: 1, display: 'flex', alignItems: 'flex-end', height: '100%', gap: '4px' }}>
                  {/* Incoming column */}
                  <div style={{
                    flex: 1,
                    height: `${val.incoming}%`,
                    background: 'var(--primary)',
                    borderRadius: '2px 2px 0 0',
                    transition: 'all 0.3s'
                  }} title={`Incoming: ${val.incoming}%`} />
                  
                  {/* Resolved column */}
                  <div style={{
                    flex: 1,
                    height: `${val.resolved}%`,
                    background: '#07956f',
                    borderRadius: '2px 2px 0 0',
                    transition: 'all 0.3s'
                  }} title={`Resolved: ${val.resolved}%`} />
                </div>
              ))}
            </div>

            {/* Labels */}
            <div style={{ display: 'flex', justifySelf: 'stretch', justifyContent: 'space-between', fontSize: '10px', color: 'var(--muted)', fontWeight: '750' }}>
              <span>Wk 1</span>
              <span>Wk 2</span>
              <span>Wk 3</span>
              <span>Wk 4</span>
              <span>Wk 5</span>
              <span>Wk 6</span>
              <span>Wk 7</span>
            </div>
          </div>

          {/* Category Distribution (Right column) */}
          <div className="panel" style={{ padding: 'var(--spacing-section)', display: 'flex', flexDirection: 'column', gap: '16px', background: '#fff' }}>
            <h3 style={{ fontSize: '15px', fontWeight: '850', color: 'var(--text)', margin: 0 }}>
              Category Distribution
            </h3>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', flex: 1, justifyContent: 'space-around' }}>
              {categories.map((cat, idx) => (
                <div key={idx} style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12.5px', fontWeight: '750' }}>
                    <span style={{ color: 'var(--text)' }}>{cat.label}</span>
                    <strong style={{ color: 'var(--text)' }}>{cat.pct}%</strong>
                  </div>
                  <div style={{ height: '6px', background: '#eee9f6', borderRadius: '3px', overflow: 'hidden' }}>
                    <div style={{ width: `${cat.pct}%`, height: '100%', background: cat.color }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* SLA Performance & Top Agents row */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr', lgGridTemplateColumns: '1.2fr 1.8fr', gap: 'var(--spacing-section)', alignItems: 'stretch' }}>
          
          {/* SLA Performance Circle Meter */}
          <div className="panel" style={{ padding: 'var(--spacing-section)', display: 'flex', flexDirection: 'column', gap: '20px', alignItems: 'center', justifyContent: 'space-between', background: '#fff' }}>
            <h3 style={{ fontSize: '15px', fontWeight: '850', color: 'var(--text)', margin: 0, alignSelf: 'flex-start' }}>
              SLA Performance
            </h3>

            {/* Circular Progress Ring */}
            <div style={{
              height: '130px',
              width: '130px',
              borderRadius: '50%',
              background: 'radial-gradient(closest-side, white 79%, transparent 80% 100%), conic-gradient(#07956f 98.2%, #eee9f6 0)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 4px 6px rgba(0,0,0,0.03)'
            }}>
              <strong style={{ fontSize: '24px', fontWeight: '900', color: 'var(--text)' }}>98.2%</strong>
              <span style={{ fontSize: '10px', color: 'var(--green)', fontWeight: '800', textTransform: 'uppercase', marginTop: '2px' }}>Target met</span>
            </div>

            <div style={{ width: '100%', borderTop: '1px solid var(--lavender)', paddingTop: '16px', display: 'flex', justifyContent: 'space-between', fontSize: '12.5px' }}>
              <div>
                <span style={{ color: 'var(--muted)', display: 'block' }}>Avg. First Response</span>
                <strong style={{ color: 'var(--text)', fontSize: '14.5px', fontWeight: '850' }}>14 min</strong>
              </div>
              <div style={{ textAlign: 'right' }}>
                <span style={{ color: 'var(--muted)', display: 'block' }}>Avg. Resolution Time</span>
                <strong style={{ color: 'var(--text)', fontSize: '14.5px', fontWeight: '850' }}>4.2 hrs</strong>
              </div>
            </div>
          </div>

          {/* Top Performing Agents table */}
          <div className="panel" style={{ padding: 'var(--spacing-section)', display: 'flex', flexDirection: 'column', gap: '16px', background: '#fff' }}>
            <div style={{ display: 'flex', justifySelf: 'stretch', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3 style={{ fontSize: '15px', fontWeight: '850', color: 'var(--text)', margin: 0 }}>
                Top Performing Agents
              </h3>
              <button style={{ border: 'none', background: 'transparent', color: 'var(--primary)', fontSize: '12px', fontWeight: '800', cursor: 'pointer' }}>
                View All
              </button>
            </div>

            <div style={{ overflowY: 'auto', maxHeight: '400px', flex: 1 }}>
              <div className="table-responsive-wrapper">
<table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px', textAlign: 'left' }}>
                <thead>
                  <tr style={{ borderBottom: '1.5px solid #25108f', paddingBottom: '6px' }}>
                    <th style={{ padding: '8px 12px', color: 'var(--muted)', fontWeight: '800', fontSize: '10px' }}>AGENT</th>
                    <th style={{ padding: '8px 12px', color: 'var(--muted)', fontWeight: '800', fontSize: '10px' }}>TICKETS</th>
                    <th style={{ padding: '8px 12px', color: 'var(--muted)', fontWeight: '800', fontSize: '10px' }}>RATING</th>
                    <th style={{ padding: '8px 12px', color: 'var(--muted)', fontWeight: '800', fontSize: '10px', textAlign: 'right' }}>SLA %</th>
                  </tr>
                </thead>
                <tbody>
                  {topAgents.map((ag, idx) => (
                    <tr key={idx} style={{ borderBottom: '1px solid var(--lavender)' }}>
                      <td style={{ padding: '12px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <div style={{
                            height: '26px',
                            width: '26px',
                            borderRadius: '50%',
                            background: '#e9e2f6',
                            color: 'var(--primary)',
                            fontSize: '10px',
                            fontWeight: '800',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                          }}>
                            {ag.initial}
                          </div>
                          <div>
                            <strong style={{ display: 'block', color: 'var(--text)' }}>{ag.name}</strong>
                            <span style={{ fontSize: '10px', color: 'var(--muted)' }}>{ag.role}</span>
                          </div>
                        </div>
                      </td>
                      <td style={{ padding: '12px', fontWeight: '750', color: 'var(--text)' }}>
                        {ag.tickets}
                      </td>
                      <td style={{ padding: '12px' }}>
                        <div style={{ display: 'flex', gap: '1px' }}>
                          {[1, 2, 3, 4, 5].map((star) => (
                            <span key={star} style={{ color: star <= ag.rating ? '#07956f' : '#d1d5db', fontSize: '14px' }}>★</span>
                          ))}
                        </div>
                      </td>
                      <td style={{ padding: '12px', fontWeight: '800', color: 'var(--green)', textAlign: 'right' }}>
                        {ag.sla}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
</div>
            </div>
          </div>

        </div>

        {/* Bottom Live Escalations cards row */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <h3 style={{ fontSize: '14.5px', fontWeight: '850', color: 'var(--text)', margin: 0 }}>
            Live Escalations
          </h3>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '16px' }}>
            {escalations.map((esc, idx) => (
              <div key={idx} className="panel" style={{
                padding: '16px 20px',
                borderLeft: '4px solid #dc2626',
                background: '#fff',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
                gap: '12px'
              }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  <span style={{ fontSize: '11px', fontWeight: '850', color: 'var(--primary)' }}>
                    {esc.id}
                  </span>
                  <strong style={{ fontSize: '13.5px', color: 'var(--text)' }}>
                    {esc.name}
                  </strong>
                  <span style={{ fontSize: '11.5px', color: 'var(--muted)' }}>
                    Reported by: {esc.reporter}
                  </span>
                </div>
                
                <span style={{
                  fontSize: '9.5px',
                  fontWeight: '950',
                  color: '#dc2626',
                  background: '#fee2e2',
                  padding: '2px 8px',
                  borderRadius: '12px',
                  whiteSpace: 'nowrap',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '4px'
                }}>
                  <Clock size={11} />
                  {esc.overdue}
                </span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </AdminShell>
  );
}


