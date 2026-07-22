import React, { useState } from 'react';
import {
  ChevronRight,
  Plus,
  Trash2,
  Play,
  Sliders,
  CheckCircle,
  Clock,
  UserCheck,
  AlertCircle,
  Bell,
  Settings,
  ToggleLeft,
  ToggleRight,
  HelpCircle,
  Activity,
  ArrowRight
} from 'lucide-react';
import AdminShell from '../../components/layouts/AdminShell';

import Select from "../../components/ui/Select";

export default function SupportAutomationRules({ activeTab = 'Support Center' }) {
  const [activeFlows, setActiveFlows] = useState({
    vipRouting: true,
    refundEscalate: true,
    slaBreach: true,
    holidayResponse: false
  });

  const [conditions, setConditions] = useState([
    { id: 1, field: 'Ticket Category', operator: 'is equal to', value: 'Billing & Payments' }
  ]);

  const [actions, setActions] = useState([
    { id: 1, type: 'Assign to Agent Group', target: 'Finance Prime Team' }
  ]);

  const [slaTriggers, setSlaTriggers] = useState([
    {
      id: 1,
      name: 'Critical SLA Warning',
      threshold: 'First Response Overdue by 15m',
      recipients: 'Assigned Agent & Team Lead',
      channels: ['Email', 'In-App'],
      status: true
    },
    {
      id: 2,
      name: 'Tier-3 Executive Alert',
      threshold: 'Resolution Overdue by 4h',
      recipients: 'VP Support & Finance Lead',
      channels: ['Email', 'SMS', 'Slack'],
      status: true
    },
    {
      id: 3,
      name: 'Standard Follow-up',
      threshold: 'Idle in Pending Customer for 24h',
      recipients: 'Assigned Agent',
      channels: ['Email'],
      status: false
    }
  ]);

  const toggleFlow = (key) => {
    setActiveFlows(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const toggleSlaTrigger = (id) => {
    setSlaTriggers(slaTriggers.map(trig => {
      if (trig.id === id) {
        return { ...trig, status: !trig.status };
      }
      return trig;
    }));
  };

  const addCondition = () => {
    const newId = conditions.length > 0 ? Math.max(...conditions.map(c => c.id)) + 1 : 1;
    setConditions([...conditions, { id: newId, field: 'Ticket Category', operator: 'is equal to', value: 'Technical Support' }]);
  };

  const removeCondition = (id) => {
    setConditions(conditions.filter(c => c.id !== id));
  };

  const addAction = () => {
    const newId = actions.length > 0 ? Math.max(...actions.map(a => a.id)) + 1 : 1;
    setActions([...actions, { id: newId, type: 'Set Ticket Priority', target: 'High' }]);
  };

  const removeAction = (id) => {
    setActions(actions.filter(a => a.id !== id));
  };

  const handleSaveRule = () => {
    alert('Rule configurations saved successfully!');
  };

  return (
    <AdminShell
      activeTab={activeTab}
      brandText="HOZIFY"
      brandSubText="Enterprise Admin"
      headerTitle="Automation Rules"
      searchPlaceholder="Search rules and action triggers..."
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-section)', padding: '24px 0', position: 'relative' }}>
        
        {/* Breadcrumbs */}
        <div style={{ fontSize: '12px', fontWeight: '750', color: 'var(--muted)', display: 'flex', alignItems: 'center', gap: '6px' }}>
          <span>Support Center</span>
          <ChevronRight size={12} />
          <span style={{ color: 'var(--primary)' }}>Automation Rules Console</span>
        </div>

        {/* Page Header */}
        <div style={{ display: 'flex', justifySelf: 'stretch', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <h1 style={{ fontSize: '24px', fontWeight: '800', color: 'var(--text)', margin: 0 }}>
              Automation Rules Console
            </h1>
            <p style={{ fontSize: '13px', color: 'var(--muted)', margin: '4px 0 0' }}>
              Configure custom workflows, ticket routing, and SLA notifications.
            </p>
          </div>

          <button
            onClick={() => alert('Create new custom workflow drawer open')}
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
            <span>Create Rule</span>
          </button>
        </div>

        {/* Main Section Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr', lgGridTemplateColumns: '2fr 1fr', gap: 'var(--spacing-section)', alignItems: 'stretch' }}>
          
          {/* Left Side: Rule Builder */}
          <div className="panel" style={{ padding: 'var(--spacing-section)', display: 'flex', flexDirection: 'column', gap: '20px', background: '#fff' }}>
            <div>
              <h3 style={{ fontSize: '15px', fontWeight: '850', color: 'var(--text)', margin: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Sliders size={16} style={{ color: 'var(--primary)' }} />
                Rule Builder
              </h3>
              <p style={{ fontSize: '12px', color: 'var(--muted)', margin: '4px 0 0' }}>
                Build routing trigger policies using Boolean conditional logic constraints.
              </p>
            </div>

            {/* IF Conditions block */}
            <div style={{ background: 'var(--soft)', padding: '16px', borderRadius: '8px', border: '1.5px solid #25108f' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                <span style={{ fontSize: '12px', fontWeight: '900', color: 'var(--primary)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                  IF (Match all conditions)
                </span>
                <button
                  onClick={addCondition}
                  style={{ border: 'none', background: 'transparent', color: 'var(--primary)', fontSize: '12px', fontWeight: '800', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '2px' }}
                  type="button"
                >
                  <Plus size={12} />
                  Add Condition
                </button>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {conditions.map((cond, idx) => (
                  <div key={cond.id} style={{ display: 'flex', gap: '10px', alignItems: 'center', flexWrap: 'wrap' }}>
                    <Select
                      value={cond.field}
                      onChange={(e) => {
                        const next = [...conditions];
                        next[idx].field = e.target.value;
                        setConditions(next);
                      }}
                      style={{ flex: 1.5, minWidth: '150px', height: '34px', borderRadius: '6px', border: '1.5px solid #25108f', padding: '0 10px', fontSize: '12.5px' }}
                      options={[{
                        label: "Ticket Category",
                        value: "Ticket Category"
                      }, {
                        label: "Customer Tier",
                        value: "Customer Tier"
                      }, {
                        label: "Ticket Source",
                        value: "Ticket Source"
                      }, {
                        label: "Time Elapsed",
                        value: "Time Elapsed"
                      }]} />

                    <Select
                      value={cond.operator}
                      onChange={(e) => {
                        const next = [...conditions];
                        next[idx].operator = e.target.value;
                        setConditions(next);
                      }}
                      style={{ flex: 1, minWidth: '120px', height: '34px', borderRadius: '6px', border: '1.5px solid #25108f', padding: '0 10px', fontSize: '12.5px' }}
                      options={[{
                        label: "is equal to",
                        value: "is equal to"
                      }, {
                        label: "is not equal to",
                        value: "is not equal to"
                      }, {
                        label: "contains",
                        value: "contains"
                      }, {
                        label: "greater than",
                        value: "greater than"
                      }]} />

                    <Select
                      value={cond.value}
                      onChange={(e) => {
                        const next = [...conditions];
                        next[idx].value = e.target.value;
                        setConditions(next);
                      }}
                      style={{ flex: 1.5, minWidth: '150px', height: '34px', borderRadius: '6px', border: '1.5px solid #25108f', padding: '0 10px', fontSize: '12.5px' }}
                      options={[{
                        label: "Billing & Payments",
                        value: "Billing & Payments"
                      }, {
                        label: "KYC Verification",
                        value: "KYC Verification"
                      }, {
                        label: "Technical Support",
                        value: "Technical Support"
                      }, {
                        label: "Enterprise VIP",
                        value: "Enterprise VIP"
                      }]} />

                    {conditions.length > 1 && (
                      <button
                        onClick={() => removeCondition(cond.id)}
                        style={{ border: 'none', background: 'transparent', color: '#dc2626', cursor: 'pointer', padding: '6px' }}
                        type="button"
                      >
                        <Trash2 size={15} />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* THEN Actions block */}
            <div style={{ background: 'var(--soft)', padding: '16px', borderRadius: '8px', border: '1.5px solid #25108f' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                <span style={{ fontSize: '12px', fontWeight: '900', color: 'var(--green)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                  THEN (Execute operations)
                </span>
                <button
                  onClick={addAction}
                  style={{ border: 'none', background: 'transparent', color: 'var(--green)', fontSize: '12px', fontWeight: '800', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '2px' }}
                  type="button"
                >
                  <Plus size={12} />
                  Add Action
                </button>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {actions.map((act, idx) => (
                  <div key={act.id} style={{ display: 'flex', gap: '10px', alignItems: 'center', flexWrap: 'wrap' }}>
                    <Select
                      value={act.type}
                      onChange={(e) => {
                        const next = [...actions];
                        next[idx].type = e.target.value;
                        setActions(next);
                      }}
                      style={{ flex: 1.5, minWidth: '150px', height: '34px', borderRadius: '6px', border: '1.5px solid #25108f', padding: '0 10px', fontSize: '12.5px' }}
                      options={[{
                        label: "Assign to Agent Group",
                        value: "Assign to Agent Group"
                      }, {
                        label: "Set Ticket Priority",
                        value: "Set Ticket Priority"
                      }, {
                        label: "Escalate Level",
                        value: "Escalate Level"
                      }, {
                        label: "Trigger Notification",
                        value: "Trigger Notification"
                      }]} />

                    <span style={{ display: 'flex', alignItems: 'center', color: 'var(--muted)' }}>
                      <ArrowRight size={14} />
                    </span>

                    <Select
                      value={act.target}
                      onChange={(e) => {
                        const next = [...actions];
                        next[idx].target = e.target.value;
                        setActions(next);
                      }}
                      style={{ flex: 2, minWidth: '180px', height: '34px', borderRadius: '6px', border: '1.5px solid #25108f', padding: '0 10px', fontSize: '12.5px' }}
                      options={[{
                        label: "Finance Prime Team",
                        value: "Finance Prime Team"
                      }, {
                        label: "L2 Escalations",
                        value: "L2 Escalations"
                      }, {
                        label: "Technical Support Leads",
                        value: "Technical Support Leads"
                      }, {
                        label: "High",
                        value: "High"
                      }, {
                        label: "Critical",
                        value: "Critical"
                      }]} />

                    {actions.length > 1 && (
                      <button
                        onClick={() => removeAction(act.id)}
                        style={{ border: 'none', background: 'transparent', color: '#dc2626', cursor: 'pointer', padding: '6px' }}
                        type="button"
                      >
                        <Trash2 size={15} />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Action Bar */}
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', borderTop: '1px solid var(--lavender)', paddingTop: '16px' }}>
              <button
                onClick={() => {
                  setConditions([{ id: Date.now(), field: 'Ticket Category', operator: 'is equal to', value: 'Billing & Payments' }]);
                  setActions([{ id: Date.now(), type: 'Assign to Agent Group', target: 'Finance Prime Team' }]);
                }}
                style={{
                  height: '36px',
                  padding: '0 16px',
                  borderRadius: '6px',
                  border: '1.5px solid #25108f',
                  background: '#fff',
                  color: 'var(--text)',
                  fontSize: '12.5px',
                  fontWeight: '700',
                  cursor: 'pointer'
                }}
                type="button"
              >
                Discard Changes
              </button>
              <button
                onClick={handleSaveRule}
                style={{
                  height: '36px',
                  padding: '0 16px',
                  borderRadius: '6px',
                  border: 'none',
                  background: 'var(--primary)',
                  color: '#fff',
                  fontSize: '12.5px',
                  fontWeight: '700',
                  cursor: 'pointer',
                  boxShadow: '0 2px 4px rgba(37, 16, 143, 0.1)'
                }}
                type="button"
              >
                Save Rule
              </button>
            </div>
          </div>

          {/* Right Side: Active Flows & Automation Stats */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-section)' }}>
            
            {/* Active Flows Sidebar */}
            <div className="panel" style={{ padding: 'var(--spacing-section)', display: 'flex', flexDirection: 'column', gap: '16px', background: '#fff' }}>
              <div>
                <h3 style={{ fontSize: '14.5px', fontWeight: '850', color: 'var(--text)', margin: 0 }}>
                  Active Workflows
                </h3>
                <p style={{ fontSize: '11.5px', color: 'var(--muted)', margin: '2px 0 0' }}>
                  Toggle global auto-triggers in real-time.
                </p>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                {/* VIP routing flow */}
                <div style={{ display: 'flex', justifySelf: 'stretch', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <strong style={{ display: 'block', fontSize: '12.5px', color: 'var(--text)' }}>VIP Support Routing</strong>
                    <span style={{ fontSize: '11px', color: 'var(--muted)' }}>Direct routes Tier-1 users to leads</span>
                  </div>
                  <button
                    onClick={() => toggleFlow('vipRouting')}
                    style={{ border: 'none', background: 'transparent', cursor: 'pointer', padding: 0, display: 'flex', color: activeFlows.vipRouting ? '#07956f' : 'var(--muted)' }}
                    type="button"
                  >
                    {activeFlows.vipRouting ? <ToggleRight size={32} /> : <ToggleLeft size={32} />}
                  </button>
                </div>

                {/* Refund auto-escalate */}
                <div style={{ display: 'flex', justifySelf: 'stretch', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <strong style={{ display: 'block', fontSize: '12.5px', color: 'var(--text)' }}>Refund Auto-Escalate</strong>
                    <span style={{ fontSize: '11px', color: 'var(--muted)' }}>Triggers approval workflow for &gt;$100</span>
                  </div>
                  <button
                    onClick={() => toggleFlow('refundEscalate')}
                    style={{ border: 'none', background: 'transparent', cursor: 'pointer', padding: 0, display: 'flex', color: activeFlows.refundEscalate ? '#07956f' : 'var(--muted)' }}
                    type="button"
                  >
                    {activeFlows.refundEscalate ? <ToggleRight size={32} /> : <ToggleLeft size={32} />}
                  </button>
                </div>

                {/* Critical SLA breach */}
                <div style={{ display: 'flex', justifySelf: 'stretch', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <strong style={{ fontSize: '12.5px', color: 'var(--text)' }}>Critical SLA Breach</strong>
                      <span style={{ fontSize: '10px', color: 'var(--primary)', fontWeight: '800', cursor: 'pointer', textDecoration: 'underline' }} onClick={() => alert('View SLA breach logs')}>
                        view queue
                      </span>
                    </div>
                    <span style={{ fontSize: '11px', color: 'var(--muted)' }}>Escalates ticket to level 2 on breach</span>
                  </div>
                  <button
                    onClick={() => toggleFlow('slaBreach')}
                    style={{ border: 'none', background: 'transparent', cursor: 'pointer', padding: 0, display: 'flex', color: activeFlows.slaBreach ? '#07956f' : 'var(--muted)' }}
                    type="button"
                  >
                    {activeFlows.slaBreach ? <ToggleRight size={32} /> : <ToggleLeft size={32} />}
                  </button>
                </div>

                {/* Holiday Auto-Response */}
                <div style={{ display: 'flex', justifySelf: 'stretch', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <strong style={{ display: 'block', fontSize: '12.5px', color: 'var(--text)' }}>Holiday Auto-Response</strong>
                    <span style={{ fontSize: '11px', color: 'var(--muted)' }}>Sends auto replies during office downtime</span>
                  </div>
                  <button
                    onClick={() => toggleFlow('holidayResponse')}
                    style={{ border: 'none', background: 'transparent', cursor: 'pointer', padding: 0, display: 'flex', color: activeFlows.holidayResponse ? '#07956f' : 'var(--muted)' }}
                    type="button"
                  >
                    {activeFlows.holidayResponse ? <ToggleRight size={32} /> : <ToggleLeft size={32} />}
                  </button>
                </div>
              </div>

              <button
                onClick={() => alert('View active automation logs')}
                style={{
                  marginTop: '8px',
                  height: '34px',
                  width: '100%',
                  borderRadius: '6px',
                  border: '1.5px solid #25108f',
                  background: 'var(--soft)',
                  color: 'var(--text)',
                  fontSize: '12px',
                  fontWeight: '750',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '6px'
                }}
                type="button"
              >
                <Activity size={13} style={{ color: 'var(--primary)' }} />
                <span>View Automation Logs</span>
              </button>
            </div>

            {/* Flow Statistics */}
            <div className="panel" style={{ padding: 'var(--spacing-section)', display: 'flex', flexDirection: 'column', gap: '16px', background: '#fff' }}>
              <h3 style={{ fontSize: '14.5px', fontWeight: '850', color: 'var(--text)', margin: 0 }}>
                Automation Performance
              </h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'var(--soft)', padding: '10px 14px', borderRadius: '6px' }}>
                  <span style={{ fontSize: '12px', color: 'var(--muted)', fontWeight: '650' }}>Auto-Assignment</span>
                  <strong style={{ fontSize: '14px', color: 'var(--text)', fontWeight: '850' }}>3,428</strong>
                </div>
                
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'var(--soft)', padding: '10px 14px', borderRadius: '6px' }}>
                  <span style={{ fontSize: '12px', color: 'var(--muted)', fontWeight: '650' }}>Auto-Escalation</span>
                  <strong style={{ fontSize: '14px', color: 'var(--text)', fontWeight: '850' }}>184</strong>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'var(--soft)', padding: '10px 14px', borderRadius: '6px' }}>
                  <span style={{ fontSize: '12px', color: 'var(--muted)', fontWeight: '650' }}>Auto-Closure</span>
                  <strong style={{ fontSize: '14px', color: 'var(--text)', fontWeight: '850' }}>912</strong>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* SLA Notification Triggers Ledger */}
        <div className="panel" style={{ padding: 'var(--spacing-section)', display: 'flex', flexDirection: 'column', gap: '16px', background: '#fff' }}>
          <div>
            <h3 style={{ fontSize: '15px', fontWeight: '850', color: 'var(--text)', margin: 0 }}>
              SLA Notification Triggers
            </h3>
            <p style={{ fontSize: '12.5px', color: 'var(--muted)', margin: '4px 0 0' }}>
              Define alert recipients and delivery channels when SLA breach events occur.
            </p>
          </div>

          <div style={{ overflowY: 'auto', maxHeight: '400px' }}>
            <div className="table-responsive-wrapper">
<table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px', textAlign: 'left' }}>
              <thead>
                <tr style={{ borderBottom: '1.5px solid #25108f', color: 'var(--muted)' }}>
                  <th style={{ padding: '10px 12px', fontWeight: '800', fontSize: '10.5px' }}>TRIGGER RULE NAME</th>
                  <th style={{ padding: '10px 12px', fontWeight: '800', fontSize: '10.5px' }}>BREACH THRESHOLD</th>
                  <th style={{ padding: '10px 12px', fontWeight: '800', fontSize: '10.5px' }}>ALERT RECIPIENTS</th>
                  <th style={{ padding: '10px 12px', fontWeight: '800', fontSize: '10.5px' }}>CHANNELS</th>
                  <th style={{ padding: '10px 12px', fontWeight: '800', fontSize: '10.5px', textAlign: 'center' }}>STATUS</th>
                  <th style={{ padding: '10px 12px', fontWeight: '800', fontSize: '10.5px', textAlign: 'right' }}>ACTIONS</th>
                </tr>
              </thead>
              <tbody>
                {slaTriggers.map((trig) => (
                  <tr key={trig.id} style={{ borderBottom: '1px solid var(--lavender)' }}>
                    <td style={{ padding: '12px', fontWeight: '750', color: 'var(--text)' }}>
                      {trig.name}
                    </td>
                    <td style={{ padding: '12px', color: 'var(--text)', display: 'inline-flex', alignItems: 'center', gap: '6px', borderBottom: 'none', marginTop: '6px' }}>
                      <Clock size={13} style={{ color: 'var(--muted)' }} />
                      <span>{trig.threshold}</span>
                    </td>
                    <td style={{ padding: '12px', color: 'var(--muted)', fontWeight: '650' }}>
                      {trig.recipients}
                    </td>
                    <td style={{ padding: '12px' }}>
                      <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap' }}>
                        {trig.channels.map((chan, idx) => (
                          <span key={idx} style={{
                            fontSize: '9.5px',
                            fontWeight: '850',
                            background: 'var(--soft)',
                            color: 'var(--primary)',
                            padding: '2px 8px',
                            borderRadius: '4px',
                            textTransform: 'uppercase'
                          }}>
                            {chan}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td style={{ padding: '12px', textAlign: 'center' }}>
                      <button
                        onClick={() => toggleSlaTrigger(trig.id)}
                        style={{ border: 'none', background: 'transparent', cursor: 'pointer', padding: 0, display: 'inline-flex', color: trig.status ? '#07956f' : 'var(--muted)' }}
                        type="button"
                      >
                        {trig.status ? <ToggleRight size={28} /> : <ToggleLeft size={28} />}
                      </button>
                    </td>
                    <td style={{ padding: '12px', textAlign: 'right' }}>
                      <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
                        <button
                          onClick={() => alert(`Edit trigger: ${trig.name}`)}
                          style={{ border: 'none', background: 'transparent', color: 'var(--primary)', fontWeight: '800', cursor: 'pointer', fontSize: '12px' }}
                          type="button"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => setSlaTriggers(slaTriggers.filter(t => t.id !== trig.id))}
                          style={{ border: 'none', background: 'transparent', color: '#dc2626', fontWeight: '800', cursor: 'pointer', fontSize: '12px' }}
                          type="button"
                        >
                          Delete
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

      </div>
    </AdminShell>
  );
}


