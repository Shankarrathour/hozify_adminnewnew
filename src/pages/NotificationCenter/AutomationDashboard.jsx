import React, { useState } from 'react';
import { 
  PlayCircle, 
  PauseCircle, 
  AlertCircle, 
  CheckCircle,
  Network,
  Mail,
  Database,
  FileText,
  Search,
  Plus,
  Terminal,
  Activity,
  Zap,
  MoreVertical,
  X,
  ShieldAlert
} from 'lucide-react';
import AdminShell from '../../components/layouts/AdminShell';

import Select from "../../components/ui/Select";

export default function AutomationDashboard({ activeTab = 'Notification Center' }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [openDropdownId, setOpenDropdownId] = useState(null);
  const [showNewRuleModal, setShowNewRuleModal] = useState(false);
  const [incidents, setIncidents] = useState([
    { id: 1, type: 'critical', title: 'API Connection Timeout', rule: 'Rule: Salesforce Sync L2' },
    { id: 2, type: 'info', title: 'Data Type Mismatch', rule: 'Rule: ERP Integration' },
    { id: 3, type: 'info', title: 'Resource Limit Reached', rule: 'Rule: Image Processor' }
  ]);

  const [rules, setRules] = useState([
    { id: 1, name: 'Revenue Rebalance L1', trigger: 'Daily Trigger • 04:00 AM', icon: Network, status: 'Operational', lastRun: '12 mins ago', successRate: '99.8%' },
    { id: 2, name: 'Churn Alert Notification', trigger: 'Real-time • Webhook', icon: Mail, status: 'Warning', lastRun: 'Just now', successRate: '92.4%' },
    { id: 3, name: 'Data Sync: Snowflake', trigger: 'Hourly • Scheduled', icon: Database, status: 'Operational', lastRun: '45 mins ago', successRate: '100%' },
    { id: 4, name: 'Subscription Auto-Billing', trigger: 'Batch • Event Driven', icon: FileText, status: 'Disabled', lastRun: '3 days ago', successRate: '--' }
  ]);

  const [newRule, setNewRule] = useState({
    name: '',
    trigger: 'Daily Trigger • 12:00 AM',
    status: 'Operational',
    iconType: 'Network'
  });

  const handleCreateRule = (e) => {
    e.preventDefault();
    if (!newRule.name) return;

    let RuleIcon = Network;
    if (newRule.iconType === 'Mail') RuleIcon = Mail;
    if (newRule.iconType === 'Database') RuleIcon = Database;
    if (newRule.iconType === 'FileText') RuleIcon = FileText;

    const created = {
      id: rules.length + 1,
      name: newRule.name,
      trigger: newRule.trigger,
      icon: RuleIcon,
      status: newRule.status,
      lastRun: 'Never',
      successRate: newRule.status === 'Operational' ? '100%' : '--'
    };

    setRules([created, ...rules]);
    setShowNewRuleModal(false);
    setNewRule({ name: '', trigger: 'Daily Trigger • 12:00 AM', status: 'Operational', iconType: 'Network' });
  };

  const handleResolveAll = () => {
    setIncidents([]);
    alert("All active critical incidents have been cleared and acknowledged.");
  };

  const filteredRules = rules.filter(r => 
    r.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    r.trigger.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <AdminShell showGlobalExport={true}
      activeTab={activeTab}
      brandText="HOZIFY"
      brandSubText="Enterprise Admin"
      headerTitle="Automation Rules"
      searchPlaceholder="Search automations..."
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-section)', padding: '24px 0' }}>
        
        {/* Title Bar */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <h1 style={{ fontSize: '24px', fontWeight: '800', color: 'var(--text)', margin: 0 }}>
              Automation Dashboard
            </h1>
            <p style={{ fontSize: '13px', color: 'var(--muted)', margin: '4px 0 0' }}>
              Real-time health and performance of your enterprise workflows.
            </p>
          </div>

          <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
            <button
              onClick={() => alert("Loading full automation audit logs...")}
              style={{
                height: '38px',
                padding: '0 16px',
                border: '1.5px solid #25108f',
                background: '#fff',
                color: 'var(--text)',
                borderRadius: '6px',
                fontWeight: '750',
                fontSize: '13px'
              }}
            >
              Audit Log
            </button>
            <button
              onClick={() => setShowNewRuleModal(true)}
              style={{
                background: 'var(--primary)',
                color: '#fff',
                border: 'none',
                height: '38px',
                padding: '0 16px',
                borderRadius: '6px',
                fontWeight: '700',
                fontSize: '13px',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                boxShadow: '0 2px 4px rgba(37, 16, 143, 0.08)'
              }}
            >
              <Plus size={16} />
              New Automation
            </button>
          </div>
        </div>

        {/* 4 Stats Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
          
          <div className="panel" style={{ padding: '20px', position: 'relative', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <span style={{ display: 'block', fontSize: '11px', fontWeight: '800', color: 'var(--muted)', marginBottom: '8px' }}>Active Automations</span>
              <strong style={{ fontSize: '28px', fontWeight: '850', color: 'var(--text)' }}>1,284</strong>
              <span style={{ display: 'block', fontSize: '11px', color: 'var(--green)', fontWeight: '750', marginTop: '4px' }}>↗ +12.4%</span>
            </div>
            <div style={{ height: '42px', width: '42px', borderRadius: '50%', background: '#ecfdf5', color: 'var(--green)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <PlayCircle size={22} />
            </div>
            <div style={{ height: '3px', background: '#07956f', position: 'absolute', bottom: 0, left: 0, right: 0 }} />
          </div>

          <div className="panel" style={{ padding: '20px', position: 'relative', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <span style={{ display: 'block', fontSize: '11px', fontWeight: '800', color: 'var(--muted)', marginBottom: '8px' }}>Paused Workflows</span>
              <strong style={{ fontSize: '28px', fontWeight: '850', color: 'var(--text)' }}>42</strong>
              <span style={{ display: 'block', fontSize: '11px', color: 'var(--muted)', fontWeight: '750', marginTop: '4px' }}>No change</span>
            </div>
            <div style={{ height: '42px', width: '42px', borderRadius: '50%', background: '#f1f5f9', color: '#64748b', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <PauseCircle size={22} />
            </div>
            <div style={{ height: '3px', background: '#64748b', position: 'absolute', bottom: 0, left: 0, right: 0 }} />
          </div>

          <div className="panel" style={{ padding: '20px', position: 'relative', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <span style={{ display: 'block', fontSize: '11px', fontWeight: '800', color: 'var(--muted)', marginBottom: '8px' }}>Failed (24h)</span>
              <strong style={{ fontSize: '28px', fontWeight: '850', color: 'var(--text)' }}>7</strong>
              <span style={{ display: 'block', fontSize: '11px', color: 'var(--red)', fontWeight: '750', marginTop: '4px' }}>↘ -3%</span>
            </div>
            <div style={{ height: '42px', width: '42px', borderRadius: '50%', background: '#fef2f2', color: 'var(--red)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <AlertCircle size={22} />
            </div>
            <div style={{ height: '3px', background: 'var(--red)', position: 'absolute', bottom: 0, left: 0, right: 0 }} />
          </div>

          <div className="panel" style={{ padding: '20px', position: 'relative', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <span style={{ display: 'block', fontSize: '11px', fontWeight: '800', color: 'var(--muted)', marginBottom: '8px' }}>Total Completed</span>
              <strong style={{ fontSize: '28px', fontWeight: '850', color: 'var(--text)' }}>84.2k</strong>
              <span style={{ display: 'block', fontSize: '11px', color: 'var(--primary)', fontWeight: '750', marginTop: '4px' }}>↗ +1.8%</span>
            </div>
            <div style={{ height: '42px', width: '42px', borderRadius: '50%', background: '#f4eff8', color: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <CheckCircle size={22} />
            </div>
            <div style={{ height: '3px', background: '#7c3aed', position: 'absolute', bottom: 0, left: 0, right: 0 }} />
          </div>

        </div>

        {/* Main Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '2.2fr 1fr', gap: 'var(--spacing-section)' }}>
          
          {/* Rules Panel */}
          <div className="panel" style={{ padding: 'var(--spacing-section)', display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                <h2 style={{ fontSize: '15px', fontWeight: '850', color: 'var(--text)', margin: 0 }}>Automation Running Rules</h2>
                
                <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                  <span style={{ fontSize: '11px', fontWeight: '750', color: 'var(--green)', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                    <span style={{ height: '6px', width: '6px', borderRadius: '50%', background: '#07956f' }} />
                    Healthy
                  </span>
                  <span style={{ fontSize: '11px', fontWeight: '750', color: '#b45309', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                    <span style={{ height: '6px', width: '6px', borderRadius: '50%', background: '#b45309' }} />
                    Warning
                  </span>
                </div>
              </div>

              <div style={{ position: 'relative' }}>
                <Search size={14} style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: 'var(--muted)' }} />
                <input
                  type="text"
                  placeholder="Filter rules..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  style={{
                    border: '1.5px solid #25108f',
                    borderRadius: '6px',
                    height: '32px',
                    padding: '0 10px 0 30px',
                    fontSize: '12px',
                    width: '180px',
                    background: '#fff'
                  }}
                />
              </div>
            </div>

            <div className="table-wrap">
              <div className="table-responsive-wrapper">
<table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px', textAlign: 'left' }}>
                <thead>
                  <tr style={{ background: 'var(--soft)', borderBottom: '1.5px solid #25108f' }}>
                    <th style={{ padding: '12px 16px', color: 'var(--muted)', fontWeight: '800', textTransform: 'uppercase', fontSize: '10px' }}>Rule Name</th>
                    <th style={{ padding: '12px 16px', color: 'var(--muted)', fontWeight: '800', textTransform: 'uppercase', fontSize: '10px' }}>Status</th>
                    <th style={{ padding: '12px 16px', color: 'var(--muted)', fontWeight: '800', textTransform: 'uppercase', fontSize: '10px' }}>Last Run</th>
                    <th style={{ padding: '12px 16px', color: 'var(--muted)', fontWeight: '800', textTransform: 'uppercase', fontSize: '10px' }}>Success Rate</th>
                    <th style={{ padding: '12px 16px', color: 'var(--muted)', fontWeight: '800', textTransform: 'uppercase', fontSize: '10px', textAlign: 'right' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredRules.map((rule, idx) => {
                    const IconComponent = rule.icon;
                    return (
                      <tr key={idx} style={{ borderBottom: '1px solid var(--lavender)' }}>
                        <td style={{ padding: '16px', display: 'flex', alignItems: 'center', gap: '12px' }}>
                          <div style={{ height: '32px', width: '32px', borderRadius: '6px', background: '#f4eff8', color: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <IconComponent size={15} />
                          </div>
                          <div>
                            <strong style={{ display: 'block', fontWeight: '800', color: 'var(--text)' }}>{rule.name}</strong>
                            <span style={{ fontSize: '11px', color: 'var(--muted)' }}>{rule.trigger}</span>
                          </div>
                        </td>
                        <td style={{ padding: '16px' }}>
                          <span style={{
                            fontSize: '11px',
                            fontWeight: '850',
                            padding: '3px 8px',
                            borderRadius: '4px',
                            background: rule.status === 'Operational' ? '#ecfdf5' : rule.status === 'Warning' ? '#fffbeb' : '#f1f5f9',
                            color: rule.status === 'Operational' ? '#07956f' : rule.status === 'Warning' ? '#b45309' : 'var(--muted)'
                          }}>
                            {rule.status}
                          </span>
                        </td>
                        <td style={{ padding: '16px', color: 'var(--text)', fontWeight: '700' }}>{rule.lastRun}</td>
                        <td style={{ padding: '16px', fontWeight: '800', color: rule.status === 'Warning' ? '#b45309' : 'var(--text)' }}>{rule.successRate}</td>
                        <td style={{ padding: '16px', textAlign: 'right', position: 'relative' }}>
                          <button 
                            onClick={(e) => { e.stopPropagation(); setOpenDropdownId(openDropdownId === rule.id ? null : rule.id); }}
                            style={{ border: 'none', background: 'transparent', cursor: 'pointer', color: 'var(--muted)' }}
                          >
                            <MoreVertical size={16} />
                          </button>
                          {openDropdownId === rule.id && (
                            <div style={{ position: 'absolute', right: '40px', top: '16px', width: '140px', background: '#fff', border: '1.5px solid #25108f', borderRadius: '8px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)', zIndex: 50, padding: '4px 0', textAlign: 'left' }}>
                              <button onClick={(e) => { e.stopPropagation(); setOpenDropdownId(null); alert('View Logs'); }} style={{ display: 'block', width: '100%', padding: '8px 16px', border: 'none', background: 'transparent', textAlign: 'left', fontSize: '12px', fontWeight: '600', cursor: 'pointer', color: 'var(--text)' }}>View Logs</button>
                              <button onClick={(e) => { e.stopPropagation(); setOpenDropdownId(null); alert('Edit Rule'); }} style={{ display: 'block', width: '100%', padding: '8px 16px', border: 'none', background: 'transparent', textAlign: 'left', fontSize: '12px', fontWeight: '600', cursor: 'pointer', color: 'var(--primary)' }}>Edit Rule</button>
                              <button onClick={(e) => { e.stopPropagation(); setOpenDropdownId(null); alert('Delete Rule'); }} style={{ display: 'block', width: '100%', padding: '8px 16px', border: 'none', background: 'transparent', textAlign: 'left', fontSize: '12px', fontWeight: '600', cursor: 'pointer', color: '#e11d48' }}>Delete</button>
                            </div>
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

          {/* Right Status / Queue Panel */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-section)' }}>
            
            {/* System Health Executionintegrity Card */}
            <div className="panel" style={{ background: '#110c3c', color: '#fff', padding: 'var(--spacing-section)', display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '12px', fontWeight: '800', color: '#b9aede', textTransform: 'uppercase' }}>System Health</span>
                <span style={{ fontSize: '11px', color: '#eee9f6' }}>Last 7 days</span>
              </div>

              <div>
                <strong style={{ fontSize: '32px', fontWeight: '900', display: 'block' }}>98.4%</strong>
                <span style={{ fontSize: '12px', color: 'var(--green)', fontWeight: '750', marginTop: '2px', display: 'block' }}>Optimal Performance</span>
              </div>

              {/* Weekly bar graph */}
              <div style={{ height: '70px', display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: '8px', marginTop: '10px' }}>
                {[
                  { day: 'MON', val: 78 },
                  { day: 'TUE', val: 90 },
                  { day: 'WED', val: 95 },
                  { day: 'THU', val: 100 },
                  { day: 'FRI', val: 85 },
                  { day: 'SAT', val: 92 },
                  { day: 'SUN', val: 98 }
                ].map((d, i) => (
                  <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px' }}>
                    <div style={{ background: '#7c3aed', width: '100%', height: `${d.val * 0.4}px`, borderRadius: '2px', opacity: d.day === 'THU' ? 1 : 0.65 }} />
                    <span style={{ fontSize: '9px', fontWeight: '750', color: '#b9aede' }}>{d.day}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Incident Queue */}
            <div className="panel" style={{ padding: 'var(--spacing-section)', display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h3 style={{ fontSize: '14px', fontWeight: '850', color: 'var(--text)', margin: 0 }}>Incident Queue</h3>
                {incidents.length > 0 && (
                  <span style={{ fontSize: '9px', fontWeight: '900', background: 'rgba(211, 41, 41, 0.1)', color: 'var(--red)', padding: '2px 6px', borderRadius: '4px' }}>
                    {incidents.length} CRITICAL
                  </span>
                )}
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {incidents.length > 0 ? (
                  incidents.map((inc, i) => (
                    <div
                      key={inc.id}
                      style={{
                        borderLeft: `3px solid ${inc.type === 'critical' ? 'var(--red)' : '#0284c7'}`,
                        background: '#faf9fc',
                        padding: '10px 12px',
                        borderRadius: '0 6px 6px 0',
                        border: '1.5px solid #25108f',
                        borderLeftWidth: '3px'
                      }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                        <span style={{ fontSize: '12.5px', fontWeight: '800', color: 'var(--text)' }}>{inc.title}</span>
                      </div>
                      <span style={{ display: 'block', fontSize: '11px', color: 'var(--muted)', marginTop: '2px' }}>{inc.rule}</span>
                    </div>
                  ))
                ) : (
                  <div style={{ padding: '16px', textAlign: 'center', color: 'var(--muted)', fontSize: '12.5px' }}>
                    No pending infrastructure incidents.
                  </div>
                )}
              </div>

              {incidents.length > 0 && (
                <button
                  onClick={handleResolveAll}
                  style={{
                    border: 'none',
                    background: 'transparent',
                    color: 'var(--primary)',
                    cursor: 'pointer',
                    fontWeight: '800',
                    fontSize: '12.5px',
                    textAlign: 'left',
                    padding: 0,
                    marginTop: '4px'
                  }}
                >
                  Resolve All Incidents
                </button>
              )}
            </div>

          </div>

        </div>

        {/* Bottom Explorer & AI Block */}
        <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: 'var(--spacing-section)' }}>
          
          <div className="panel" style={{
            backgroundImage: 'linear-gradient(to bottom, rgba(17, 12, 60, 0.4), rgba(17, 12, 60, 0.95)), url("https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=400&q=80")',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            borderRadius: '8px',
            padding: '60px 24px 24px',
            color: '#fff',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-end',
            gap: '6px',
            minHeight: '180px'
          }}>
            <h3 style={{ fontSize: '15px', fontWeight: '850', color: '#fff', margin: 0 }}>
              Architecture Explorer
            </h3>
            <p style={{ fontSize: '12px', color: '#eee9f6', margin: 0 }}>
              Visualize the dependency tree of cross-functional workflows.
            </p>
          </div>

          <div className="panel" style={{ padding: 'var(--spacing-section)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: '16px' }}>
            <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
              <div style={{ height: '36px', width: '36px', borderRadius: '50%', background: '#ecfdf5', color: 'var(--green)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <Zap size={18} />
              </div>
              <div>
                <h3 style={{ fontSize: '13px', fontWeight: '850', color: 'var(--text)', margin: 0 }}>
                  AI-Driven Optimization
                </h3>
                <p style={{ fontSize: '12px', color: 'var(--muted)', lineHeight: '1.5', margin: '6px 0 0' }}>
                  Our intelligence engine suggests 3 workflows that can be consolidated to reduce latency by 24%.
                </p>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
              <button
                onClick={() => alert("Loading recommendations tree...")}
                style={{
                  border: '1.5px solid #25108f',
                  background: '#fff',
                  borderRadius: '6px',
                  height: '36px',
                  padding: '0 16px',
                  fontSize: '12.5px',
                  fontWeight: '750',
                  cursor: 'pointer'
                }}
              >
                Dismiss
              </button>
              <button
                onClick={() => alert("Consolidating 3 rules workflow dependencies...")}
                style={{
                  border: 'none',
                  background: 'var(--primary)',
                  color: '#fff',
                  borderRadius: '6px',
                  height: '36px',
                  padding: '0 16px',
                  fontSize: '12.5px',
                  fontWeight: '750',
                  cursor: 'pointer'
                }}
              >
                View Suggestions
              </button>
            </div>
          </div>

        </div>

      </div>
      {/* New Rule Dialog overlay */}
      {showNewRuleModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(17, 12, 60, 0.5)',
          zIndex: 9999,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '16px'
        }}>
          <div style={{
            background: '#fff',
            borderRadius: '8px',
            border: '1.5px solid #25108f',
            width: '100%',
            maxWidth: '480px',
            boxShadow: '0 8px 24px rgba(17, 12, 60, 0.15)',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 20px', borderBottom: '1.5px solid #25108f' }}>
              <h3 style={{ fontSize: '15px', fontWeight: '850', color: 'var(--text)', margin: 0 }}>Add New Automation Rule</h3>
              <button onClick={() => setShowNewRuleModal(false)} style={{ border: 'none', background: 'transparent', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <X size={18} style={{ color: 'var(--muted)' }} />
              </button>
            </div>

            <form onSubmit={handleCreateRule} style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: '750', color: 'var(--text)', marginBottom: '6px' }}>Rule Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Lead Score Sync"
                  value={newRule.name}
                  onChange={(e) => setNewRule({ ...newRule, name: e.target.value })}
                  style={{
                    width: '100%',
                    height: '36px',
                    border: '1.5px solid #25108f',
                    borderRadius: '6px',
                    padding: '0 12px',
                    fontSize: '13px'
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: '750', color: 'var(--text)', marginBottom: '6px' }}>Trigger Type</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Hourly • Scheduled"
                  value={newRule.trigger}
                  onChange={(e) => setNewRule({ ...newRule, trigger: e.target.value })}
                  style={{
                    width: '100%',
                    height: '36px',
                    border: '1.5px solid #25108f',
                    borderRadius: '6px',
                    padding: '0 12px',
                    fontSize: '13px'
                  }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: '750', color: 'var(--text)', marginBottom: '6px' }}>Icon Representation</label>
                  <Select
                    value={newRule.iconType}
                    onChange={(e) => setNewRule({ ...newRule, iconType: e.target.value })}
                    style={{
                      width: '100%',
                      height: '36px',
                      border: '1.5px solid #25108f',
                      borderRadius: '6px',
                      padding: '0 12px',
                      fontSize: '13px',
                      background: '#fff'
                    }}
                    options={[{
                      label: "Flow (Network)",
                      value: "Network"
                    }, {
                      label: "Communication (Mail)",
                      value: "Mail"
                    }, {
                      label: "Data Sync (Database)",
                      value: "Database"
                    }, {
                      label: "System Action (FileText)",
                      value: "FileText"
                    }]} />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: '750', color: 'var(--text)', marginBottom: '6px' }}>Initial Status</label>
                  <Select
                    value={newRule.status}
                    onChange={(e) => setNewRule({ ...newRule, status: e.target.value })}
                    style={{
                      width: '100%',
                      height: '36px',
                      border: '1.5px solid #25108f',
                      borderRadius: '6px',
                      padding: '0 12px',
                      fontSize: '13px',
                      background: '#fff'
                    }}
                    options={[{
                      label: "Operational",
                      value: "Operational"
                    }, {
                      label: "Warning",
                      value: "Warning"
                    }, {
                      label: "Disabled",
                      value: "Disabled"
                    }]} />
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '10px' }}>
                <button
                  type="button"
                  onClick={() => setShowNewRuleModal(false)}
                  style={{
                    height: '36px',
                    padding: '0 16px',
                    border: '1.5px solid #25108f',
                    background: '#fff',
                    borderRadius: '6px',
                    fontSize: '13px',
                    fontWeight: '750'
                  }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  style={{
                    height: '36px',
                    padding: '0 16px',
                    border: 'none',
                    background: 'var(--primary)',
                    color: '#fff',
                    borderRadius: '6px',
                    fontSize: '13px',
                    fontWeight: '750'
                  }}
                >
                  Save Rule
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </AdminShell>
  );
}



