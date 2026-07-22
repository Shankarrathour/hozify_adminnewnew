import React, { useState } from 'react';
import {
  Calendar,
  Download,
  AlertCircle,
  TrendingUp,
  TrendingDown,
  Layers,
  ChevronRight,
  ShieldCheck,
  UserCheck,
  CheckCircle,
  Clock,
  ArrowUpRight
} from 'lucide-react';
import AdminShell from '../../components/layouts/AdminShell';

import Select from "../../components/ui/Select";

export default function SlaMonitoring({ activeTab = 'Support Center' }) {
  const [timeframe, setTimeframe] = useState('Last 30 Days');

  // Interactive mock data based on timeframe selection
  const getTrendBars = () => {
    if (timeframe === 'Last 7 Days') {
      return [35, 45, 28, 55, 60, 50, 48];
    }
    return [48, 52, 45, 62, 65, 58, 68, 70, 68, 75, 74];
  };

  const breaches = [
    { id: '#INC-4821', priority: 'P0 - CRITICAL', priorityColor: '#dc2626', priorityBg: '#fee2e2', category: 'Infrastructure', overdue: '2h 14m', agent: 'John Dorsey', avatar: 'JD', status: 'Investigating' },
    { id: '#INC-4835', priority: 'P1 - HIGH', priorityColor: '#b58000', priorityBg: '#fff9db', category: 'Payment API', overdue: '48m', agent: 'Sarah Lee', avatar: 'SL', status: 'Escalated' },
    { id: '#INC-4842', priority: 'P2 - MEDIUM', prioritycolor: 'var(--green)', priorityBg: '#d1fae5', category: 'UI Glitch', overdue: '12m', agent: 'Marcus Kane', avatar: 'MK', status: 'In Progress' }
  ];

  return (
    <AdminShell
      activeTab={activeTab}
      brandText="HOZIFY"
      brandSubText="Enterprise Admin"
      headerTitle="SLA Monitoring"
      searchPlaceholder="Search SLAs, breached tickets..."
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-section)', padding: '24px 0', position: 'relative' }}>
        
        {/* Breadcrumb Row */}
        <div style={{ fontSize: '12px', fontWeight: '750', color: 'var(--muted)', display: 'flex', alignItems: 'center', gap: '6px' }}>
          <span>Support Center</span>
          <ChevronRight size={12} />
          <span style={{ color: 'var(--primary)' }}>SLA Monitoring</span>
        </div>

        {/* Page Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <h1 style={{ fontSize: '24px', fontWeight: '800', color: 'var(--text)', margin: 0 }}>
              SLA Performance Dashboard
            </h1>
            <p style={{ fontSize: '13px', color: 'var(--muted)', margin: '4px 0 0' }}>
              Real-time service level agreement compliance and threat monitoring
            </p>
          </div>

          <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', border: '1.5px solid #25108f', padding: '6px 12px', borderRadius: '6px', background: '#fff' }}>
              <Calendar size={14} style={{ color: 'var(--muted)' }} />
              <Select
                value={timeframe}
                onChange={(e) => setTimeframe(e.target.value)}
                style={{ border: 'none', background: 'transparent', outline: 'none', fontWeight: '700', fontSize: '12px', cursor: 'pointer', color: '#565365' }}
                aria-label="Filter SLA timeframe"
                options={[{
                  label: "Last 30 Days",
                  value: "Last 30 Days"
                }, {
                  label: "Last 7 Days",
                  value: "Last 7 Days"
                }, {
                  label: "Today",
                  value: "Today"
                }]} />
            </div>

            <button
              onClick={() => alert('Exporting SLA reports...')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                border: 'none',
                background: 'var(--primary)',
                color: '#fff',
                fontSize: '13px',
                fontWeight: '700',
                height: '38px',
                padding: '0 16px',
                borderRadius: '6px',
                cursor: 'pointer',
                boxShadow: '0 2px 4px rgba(37, 16, 143, 0.08)',
                transition: 'all 0.15s ease'
              }}
              type="button"
            >
              <Download size={14} />
              <span>Export Report</span>
            </button>
          </div>
        </div>

        {/* KPI Metrics Row */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
          {/* Within SLA */}
          <div className="panel" style={{ padding: 'var(--spacing-section)', display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div style={{ display: 'flex', justifySelf: 'stretch', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '10.5px', fontWeight: '800', color: 'var(--muted)', letterSpacing: '0.5px', textTransform: 'uppercase' }}>Within SLA</span>
              <span style={{ fontSize: '10px', fontWeight: '850', color: 'var(--green)', background: '#d1fae5', padding: '2px 6px', borderRadius: '4px' }}>94.2%</span>
            </div>
            <div>
              <strong style={{ display: 'block', fontSize: '28px', color: 'var(--text)', fontWeight: '850' }}>2,841</strong>
              <span style={{ fontSize: '12px', fontWeight: '750', color: 'var(--green)', display: 'inline-flex', alignItems: 'center', gap: '3px', marginTop: '4px' }}>
                <TrendingUp size={12} />
                +1.2% vs prev. month
              </span>
            </div>
          </div>

          {/* Approaching Breach */}
          <div className="panel" style={{ padding: 'var(--spacing-section)', display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div style={{ display: 'flex', justifySelf: 'stretch', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '10.5px', fontWeight: '800', color: 'var(--muted)', letterSpacing: '0.5px', textTransform: 'uppercase' }}>Approaching Breach</span>
              <span style={{ fontSize: '10px', fontWeight: '850', color: '#b58000', background: '#fff9db', padding: '2px 6px', borderRadius: '4px' }}>RISK</span>
            </div>
            <div>
              <strong style={{ display: 'block', fontSize: '28px', color: 'var(--text)', fontWeight: '850' }}>142</strong>
              <span style={{ fontSize: '12px', fontWeight: '750', color: 'var(--red)', display: 'inline-flex', alignItems: 'center', gap: '3px', marginTop: '4px' }}>
                <TrendingUp size={12} />
                +14 since 09:00
              </span>
            </div>
          </div>

          {/* SLA Breached */}
          <div className="panel" style={{ padding: 'var(--spacing-section)', display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div style={{ display: 'flex', justifySelf: 'stretch', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '10.5px', fontWeight: '800', color: 'var(--muted)', letterSpacing: '0.5px', textTransform: 'uppercase' }}>SLA Breached</span>
              <span style={{ fontSize: '10px', fontWeight: '850', color: '#dc2626', background: '#fee2e2', padding: '2px 6px', borderRadius: '4px' }}>CRITICAL</span>
            </div>
            <div>
              <strong style={{ display: 'block', fontSize: '28px', color: 'var(--text)', fontWeight: '850' }}>24</strong>
              <span style={{ fontSize: '12px', fontWeight: '750', color: 'var(--green)', display: 'inline-flex', alignItems: 'center', gap: '3px', marginTop: '4px' }}>
                <TrendingDown size={12} />
                -8.5% improvement
              </span>
            </div>
          </div>

          {/* Avg Resolution Time */}
          <div className="panel" style={{ padding: 'var(--spacing-section)', display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div style={{ display: 'flex', justifySelf: 'stretch', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '10.5px', fontWeight: '800', color: 'var(--muted)', letterSpacing: '0.5px', textTransform: 'uppercase' }}>Avg. Resolution Time</span>
              <span style={{ fontSize: '9px', fontWeight: '900', color: 'var(--primary)', border: '1.5px solid #25108f', padding: '2px 6px', borderRadius: '4px' }}>TARGET: 4H</span>
            </div>
            <div>
              <strong style={{ display: 'block', fontSize: '28px', color: 'var(--text)', fontWeight: '850' }}>3h 22m</strong>
              <span style={{ fontSize: '12px', fontWeight: '750', color: 'var(--muted)', display: 'inline-flex', marginTop: '4px' }}>
                ~ Stable performance
              </span>
            </div>
          </div>
        </div>

        {/* Content Row: Trends & Breaches by Category */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr', lgGridTemplateColumns: '2fr 1fr', gap: 'var(--spacing-section)', alignItems: 'stretch' }}>
          
          {/* Compliance Trends Chart */}
          <div className="panel" style={{ padding: 'var(--spacing-section)', display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3 style={{ fontSize: '15px', fontWeight: '850', color: 'var(--text)', margin: 0 }}>
                SLA Compliance Trends
              </h3>
              <div style={{ display: 'flex', gap: '12px', fontSize: '11px', fontWeight: '750' }}>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', color: '#a7cfc3' }}>
                  <span style={{ height: '8px', width: '8px', borderRadius: '50%', background: '#a7cfc3' }} />
                  Compliance %
                </span>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', color: '#dc2626' }}>
                  <span style={{ height: '8px', width: '8px', borderRadius: '50%', background: '#dc2626' }} />
                  Breaches
                </span>
              </div>
            </div>

            {/* CSS Flex Bar Chart */}
            <div style={{ height: '220px', display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', borderBottom: '1.5px solid #25108f', paddingBottom: '12px', gap: '12px', marginTop: '20px' }}>
              {getTrendBars().map((val, idx) => (
                <div key={idx} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100%', justifyContent: 'flex-end', gap: '8px' }}>
                  {/* The interactive bar with light shades */}
                  <div
                    style={{
                      width: '100%',
                      height: `${val}%`,
                      background: 'linear-gradient(180deg, #b8dfd4 0%, #a7cfc3 100%)',
                      borderRadius: '4px 4px 0 0',
                      transition: 'all 0.3s ease',
                      position: 'relative'
                    }}
                    onMouseOver={(e) => e.currentTarget.style.filter = 'brightness(0.95)'}
                    onMouseOut={(e) => e.currentTarget.style.filter = 'none'}
                  >
                    <span style={{ position: 'absolute', top: '-20px', left: 0, right: 0, textAlign: 'center', fontSize: '9px', fontWeight: '800', color: 'var(--muted)' }}>
                      {val + 20}%
                    </span>
                  </div>
                  <span style={{ fontSize: '10px', color: 'var(--muted)', fontWeight: '700' }}>
                    Wk {idx + 1}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Breaches by Category (Right column) */}
          <div className="panel" style={{ padding: 'var(--spacing-section)', display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <h3 style={{ fontSize: '14.5px', fontWeight: '850', color: 'var(--text)', margin: 0 }}>
              Breaches by Category
            </h3>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', flex: 1 }}>
              {[
                { label: 'Infrastructure', count: '12 Breaches', percentage: 70, color: '#dc2626' },
                { label: 'Payment Processing', count: '8 Breaches', percentage: 48, color: '#7c2d12' },
                { label: 'User Authentication', count: '4 Breaches', percentage: 24, color: '#4b5563' },
                { label: 'Data Exports', count: '0 Breaches', percentage: 0, color: '#0284c7' }
              ].map((cat, idx) => (
                <div key={idx} style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12.5px', fontWeight: '750' }}>
                    <span style={{ color: 'var(--text)' }}>{cat.label}</span>
                    <strong style={{ color: cat.color }}>{cat.count}</strong>
                  </div>
                  <div style={{ height: '6px', background: '#eee9f6', borderRadius: '3px', overflow: 'hidden' }}>
                    <div style={{ width: `${cat.percentage}%`, height: '100%', background: cat.color }} />
                  </div>
                </div>
              ))}

              {/* AWS Outage Alert Banner */}
              <div style={{
                marginTop: 'auto',
                background: '#eff6ff',
                border: '1px solid #bfdbfe',
                borderRadius: '8px',
                padding: '12px 14px',
                display: 'flex',
                gap: '10px',
                alignItems: 'flex-start'
              }}>
                <AlertCircle size={15} style={{ color: '#1e40af', flexShrink: 0, marginTop: '2px' }} />
                <p style={{ fontSize: '11.5px', color: '#1e40af', margin: 0, lineHeight: '1.4' }}>
                  Infrastructure breaches have increased by 20% this week. Primary cause: AWS edge outage in us-east-1.
                </p>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Recent SLA Breaches Table */}
        <div className="panel" style={{ padding: 'var(--spacing-section)', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h2 style={{ fontSize: '15px', fontWeight: '850', color: 'var(--text)', margin: 0 }}>
              Recent SLA Breaches
            </h2>
            <button
              onClick={() => alert('Loading SLA Ticket list')}
              style={{ border: 'none', background: 'transparent', color: 'var(--primary)', fontSize: '12.5px', fontWeight: '750', display: 'flex', alignItems: 'center', gap: '4px', cursor: 'pointer' }}
              type="button"
            >
              <span>View All Tickets</span>
              <ArrowUpRight size={14} />
            </button>
          </div>

          <div style={{ overflowY: 'auto', maxHeight: '400px' }}>
            <div className="table-responsive-wrapper">
<table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px', textAlign: 'left', minWidth: '700px' }}>
              <thead>
                <tr style={{ background: 'var(--soft)', borderBottom: '1.5px solid #25108f' }}>
                  <th style={{ padding: '12px 16px', color: 'var(--muted)', fontWeight: '800', textTransform: 'uppercase', fontSize: '10px' }}>Ticket ID</th>
                  <th style={{ padding: '12px 16px', color: 'var(--muted)', fontWeight: '800', textTransform: 'uppercase', fontSize: '10px' }}>Priority</th>
                  <th style={{ padding: '12px 16px', color: 'var(--muted)', fontWeight: '800', textTransform: 'uppercase', fontSize: '10px' }}>Category</th>
                  <th style={{ padding: '12px 16px', color: 'var(--muted)', fontWeight: '800', textTransform: 'uppercase', fontSize: '10px' }}>Breached Since</th>
                  <th style={{ padding: '12px 16px', color: 'var(--muted)', fontWeight: '800', textTransform: 'uppercase', fontSize: '10px' }}>Assigned Agent</th>
                  <th style={{ padding: '12px 16px', color: 'var(--muted)', fontWeight: '800', textTransform: 'uppercase', fontSize: '10px' }}>Status</th>
                </tr>
              </thead>
              <tbody>
                {breaches.map((row, idx) => (
                  <tr key={idx} style={{ borderBottom: '1px solid var(--lavender)' }}>
                    <td style={{ padding: '16px', fontWeight: '800', color: 'var(--primary)' }}>{row.id}</td>
                    <td style={{ padding: '16px' }}>
                      <span style={{
                        fontSize: '9.5px',
                        fontWeight: '900',
                        padding: '3px 8px',
                        borderRadius: '4px',
                        background: row.priorityBg,
                        color: row.priorityColor
                      }}>
                        {row.priority}
                      </span>
                    </td>
                    <td style={{ padding: '16px', fontWeight: '700', color: 'var(--text)' }}>{row.category}</td>
                    <td style={{ padding: '16px', fontWeight: '800', color: '#dc2626' }}>{row.overdue}</td>
                    <td style={{ padding: '16px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <div style={{
                          height: '24px',
                          width: '24px',
                          borderRadius: '50%',
                          background: 'var(--soft)',
                          color: 'var(--primary)',
                          fontSize: '9.5px',
                          fontWeight: '850',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}>
                          {row.avatar}
                        </div>
                        <span style={{ color: 'var(--text)', fontWeight: '600' }}>{row.agent}</span>
                      </div>
                    </td>
                    <td style={{ padding: '16px', color: 'var(--muted)' }}>{row.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
</div>
          </div>
        </div>

      </div>
    </AdminShell>
  );
}


