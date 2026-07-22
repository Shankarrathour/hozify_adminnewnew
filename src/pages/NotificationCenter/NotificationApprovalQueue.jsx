import React, { useState } from 'react';
import {
  CheckCircle,
  XCircle,
  Clock,
  TrendingUp,
  TrendingDown,
  Filter,
  Download,
  AlertTriangle,
  ChevronRight,
  ShieldCheck,
  UserCheck,
  Search,
  Eye
} from 'lucide-react';
import AdminShell from '../../components/layouts/AdminShell';

export default function NotificationApprovalQueue({ activeTab = 'Notification Center' }) {
  const [activeQueue, setActiveQueue] = useState([
    {
      id: 'CAMP-992',
      name: 'Q3 Wealth Management Re-engagement',
      module: 'Module 18 • Revenue Campaign',
      priority: 'Urgent',
      channel: 'SMS & Push',
      recipients: '254,000',
      driftRisk: 'High (76%)',
      createdDate: '10 mins ago',
      requestedBy: 'Sarah Jenkins (Marketing)',
      driftScore: 76,
      tags: ['Revenue', 'Wealth Mgmt']
    },
    {
      id: 'CAMP-995',
      name: 'Immediate Compliance Update: 1040-NR',
      module: 'Module 2 • Tax Compliance',
      priority: 'High',
      channel: 'Email Only',
      recipients: '12,500',
      driftRisk: 'Low (12%)',
      createdDate: '25 mins ago',
      requestedBy: 'David Vance (Legal)',
      driftScore: 12,
      tags: ['Compliance', 'Required']
    },
    {
      id: 'CAMP-998',
      name: 'Summer Promo Flash Discount Blast',
      module: 'Module 18 • Revenue Campaign',
      priority: 'Medium',
      channel: 'Push Notification',
      recipients: '1,200,000',
      driftRisk: 'Medium (45%)',
      createdDate: '1 hour ago',
      requestedBy: 'Elena Rostova (Growth)',
      driftScore: 45,
      tags: ['Promo', 'Revenue']
    }
  ]);

  const [auditLogs, setAuditLogs] = useState([
    { id: 'CAMP-980', name: 'Premium Loyalty Tier Invites', approver: 'Alex Sterling', outcome: 'Approved', timestamp: 'Today, 09:15 AM', notes: 'Copy verified, compliance checks passed.' },
    { id: 'CAMP-981', name: 'High-Net-Worth Advisory Alert', approver: 'System Auto-Pass', outcome: 'Approved', timestamp: 'Today, 08:30 AM', notes: 'Pre-approved template match.' },
    { id: 'CAMP-983', name: 'Crypto Yield Portfolio Updates', approver: 'Alex Sterling', outcome: 'Rejected', timestamp: 'Yesterday, 04:45 PM', notes: 'Drift index too high (85%). Content adjustment requested.' },
    { id: 'CAMP-988', name: 'Retirement Planner Push Reminder', approver: 'David Vance', outcome: 'Approved', timestamp: 'Yesterday, 02:10 PM', notes: 'Approved after subject rewrite.' }
  ]);

  const [selectedCampaign, setSelectedCampaign] = useState(activeQueue[0] || null);
  const [filterPriority, setFilterPriority] = useState('All');
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [rejectNotes, setRejectNotes] = useState('');

  const handleApprove = (campaignId) => {
    const campaign = activeQueue.find(c => c.id === campaignId);
    if (!campaign) return;

    // Remove from active queue
    setActiveQueue(activeQueue.filter(c => c.id !== campaignId));
    
    // Add to audit logs
    const newAuditLog = {
      id: campaign.id,
      name: campaign.name,
      approver: 'Alex Sterling (You)',
      outcome: 'Approved',
      timestamp: 'Just now',
      notes: 'Manually approved campaign from review queue.'
    };
    setAuditLogs([newAuditLog, ...auditLogs]);

    // Select next campaign if available
    const remaining = activeQueue.filter(c => c.id !== campaignId);
    setSelectedCampaign(remaining[0] || null);
  };

  const handleRejectClick = (campaign) => {
    setSelectedCampaign(campaign);
    setRejectNotes('');
    setShowRejectModal(true);
  };

  const submitReject = (e) => {
    e.preventDefault();
    if (!selectedCampaign) return;

    const campaignId = selectedCampaign.id;
    // Remove from active queue
    setActiveQueue(activeQueue.filter(c => c.id !== campaignId));
    
    // Add to audit logs
    const newAuditLog = {
      id: selectedCampaign.id,
      name: selectedCampaign.name,
      approver: 'Alex Sterling (You)',
      outcome: 'Rejected',
      timestamp: 'Just now',
      notes: rejectNotes || 'Rejected during queue verification.'
    };
    setAuditLogs([newAuditLog, ...auditLogs]);

    // Select next campaign if available
    const remaining = activeQueue.filter(c => c.id !== campaignId);
    setSelectedCampaign(remaining[0] || null);
    setShowRejectModal(false);
  };

  const filteredQueue = activeQueue.filter(c => {
    if (filterPriority === 'All') return true;
    return c.priority.toLowerCase() === filterPriority.toLowerCase();
  });

  return (
    <AdminShell
      activeTab={activeTab}
      brandText="HOZIFY"
      brandSubText="Revenue Review"
      headerTitle="Notification Approval Queue"
      searchPlaceholder="Search campaign reviews, logs, or authors..."
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-section)', padding: '24px 0', position: 'relative' }}>
        
        {/* Page Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <h1 style={{ fontSize: '24px', fontWeight: '800', color: 'var(--text)', margin: 0 }}>
              Notification Approval Queue
            </h1>
            <p style={{ fontSize: '13px', color: 'var(--muted)', margin: '4px 0 0' }}>
              Module 18 • Revenue Campaign Review & Compliance Gate
            </p>
          </div>

          <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
            <button
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                border: '1.5px solid #25108f',
                background: '#fff',
                color: 'var(--text)',
                fontSize: '13px',
                fontWeight: '700',
                height: '38px',
                padding: '0 16px',
                borderRadius: '6px',
                cursor: 'pointer',
                transition: 'all 0.15s ease'
              }}
              onClick={() => alert('Filter applied')}
              type="button"
            >
              <Filter size={14} />
              <span>Filter View</span>
            </button>

            <button
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
              onClick={() => alert('Exporting report...')}
              type="button"
            >
              <Download size={14} />
              <span>Export Report</span>
            </button>
          </div>
        </div>

        {/* KPI Metrics Row */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
          {/* Card 1: Pending */}
          <div className="panel" style={{ padding: 'var(--spacing-section)', display: 'flex', flexDirection: 'column', gap: '12px', position: 'relative' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '10px', fontWeight: '800', color: 'var(--muted)', letterSpacing: '0.5px', textTransform: 'uppercase' }}>
                Pending Approval
              </span>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '32px', height: '32px', borderRadius: '6px', background: '#fffbeb', color: '#d97706' }}>
                <Clock size={15} />
              </div>
            </div>
            <div>
              <strong style={{ display: 'block', fontSize: '28px', color: 'var(--text)', fontWeight: '850' }}>
                {activeQueue.length + 21}
              </strong>
              <span style={{ fontSize: '12px', fontWeight: '750', color: 'var(--red)', display: 'inline-flex', alignItems: 'center', gap: '3px', marginTop: '4px' }}>
                <TrendingUp size={12} />
                +12% vs last week
              </span>
            </div>
          </div>

          {/* Card 2: Total Approved */}
          <div className="panel" style={{ padding: 'var(--spacing-section)', display: 'flex', flexDirection: 'column', gap: '12px', position: 'relative' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '10px', fontWeight: '800', color: 'var(--muted)', letterSpacing: '0.5px', textTransform: 'uppercase' }}>
                Total Approved
              </span>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '32px', height: '32px', borderRadius: '6px', background: '#ecfdf5', color: '#059669' }}>
                <CheckCircle size={15} />
              </div>
            </div>
            <div>
              <strong style={{ display: 'block', fontSize: '28px', color: 'var(--text)', fontWeight: '850' }}>
                842
              </strong>
              <span style={{ fontSize: '12px', fontWeight: '750', color: 'var(--green)', display: 'inline-flex', alignItems: 'center', gap: '3px', marginTop: '4px' }}>
                <TrendingUp size={12} />
                ↑ Increased Today
              </span>
            </div>
          </div>

          {/* Card 3: Rejected */}
          <div className="panel" style={{ padding: 'var(--spacing-section)', display: 'flex', flexDirection: 'column', gap: '12px', position: 'relative' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '10px', fontWeight: '800', color: 'var(--muted)', letterSpacing: '0.5px', textTransform: 'uppercase' }}>
                Rejected Campaigns
              </span>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '32px', height: '32px', borderRadius: '6px', background: '#fee2e2', color: '#dc2626' }}>
                <XCircle size={15} />
              </div>
            </div>
            <div>
              <strong style={{ display: 'block', fontSize: '28px', color: 'var(--text)', fontWeight: '850' }}>
                12
              </strong>
              <span style={{ fontSize: '12px', fontWeight: '750', color: 'var(--muted)', display: 'inline-flex', alignItems: 'center', gap: '3px', marginTop: '4px' }}>
                ↓ Lower vs. prev wk
              </span>
            </div>
          </div>

          {/* Card 4: Avg Review Time */}
          <div className="panel" style={{ padding: 'var(--spacing-section)', display: 'flex', flexDirection: 'column', gap: '12px', position: 'relative' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '10px', fontWeight: '800', color: 'var(--muted)', letterSpacing: '0.5px', textTransform: 'uppercase' }}>
                Avg Review Time
              </span>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '32px', height: '32px', borderRadius: '6px', background: '#eff6ff', color: '#1e40af' }}>
                <Clock size={15} />
              </div>
            </div>
            <div>
              <strong style={{ display: 'block', fontSize: '28px', color: 'var(--text)', fontWeight: '850' }}>
                18m
              </strong>
              <span style={{ fontSize: '12px', fontWeight: '750', color: 'var(--green)', display: 'inline-flex', alignItems: 'center', gap: '3px', marginTop: '4px' }}>
                <TrendingDown size={12} />
                -4m from yesterday
              </span>
            </div>
          </div>
        </div>

        {/* Content Layout */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr', lgGridTemplateColumns: '2fr 1fr', gap: 'var(--spacing-section)', alignItems: 'stretch' }}>
          
          {/* Active Queue Section (Left Column) */}
          <div className="panel" style={{ padding: 'var(--spacing-section)', display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
              <h2 style={{ fontSize: '15px', fontWeight: '850', color: 'var(--text)', margin: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
                Active Queue: High-Priority Review
                <span style={{ background: '#dc2626', color: '#fff', fontSize: '11px', fontWeight: '900', padding: '2px 8px', borderRadius: '12px' }}>
                  {activeQueue.length} Urgent
                </span>
              </h2>

              <div style={{ display: 'flex', gap: '8px' }}>
                {['All', 'Urgent', 'High', 'Medium'].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setFilterPriority(tab)}
                    style={{
                      height: '28px',
                      padding: '0 12px',
                      borderRadius: '4px',
                      border: '1.5px solid #25108f',
                      background: filterPriority === tab ? 'var(--primary)' : '#fff',
                      color: filterPriority === tab ? '#fff' : 'var(--muted)',
                      fontSize: '11.5px',
                      fontWeight: '700',
                      cursor: 'pointer'
                    }}
                    type="button"
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '8px' }}>
              {filteredQueue.length === 0 ? (
                <div style={{ padding: '40px 16px', textAlign: 'center', color: 'var(--muted)', fontSize: '13px' }}>
                  No pending campaigns match the selection.
                </div>
              ) : (
                filteredQueue.map((item) => {
                  const isSelected = selectedCampaign?.id === item.id;
                  return (
                    <div
                      key={item.id}
                      onClick={() => setSelectedCampaign(item)}
                      style={{
                        padding: '16px',
                        borderRadius: '8px',
                        border: isSelected ? '2px solid var(--primary)' : '1px solid var(--lavender)',
                        background: isSelected ? 'rgba(37, 16, 143, 0.02)' : '#fff',
                        cursor: 'pointer',
                        transition: 'all 0.15s ease',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '12px'
                      }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                        <div>
                          <span style={{ fontSize: '11px', fontWeight: '800', color: 'var(--muted)' }}>
                            {item.module}
                          </span>
                          <h3 style={{ fontSize: '14.5px', fontWeight: '850', color: 'var(--text)', margin: '4px 0 0' }}>
                            {item.name}
                          </h3>
                        </div>

                        <span style={{
                          fontSize: '10px',
                          fontWeight: '900',
                          padding: '3px 8px',
                          borderRadius: '4px',
                          textTransform: 'uppercase',
                          background: item.priority === 'Urgent' ? '#fee2e2' : item.priority === 'High' ? '#fff9db' : '#f3f4f6',
                          color: item.priority === 'Urgent' ? '#dc2626' : item.priority === 'High' ? '#b58000' : '#4b5563'
                        }}>
                          {item.priority}
                        </span>
                      </div>

                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px', fontSize: '12px', color: 'var(--muted)', borderTop: '1px dashed var(--lavender)', paddingTop: '12px' }}>
                        <div style={{ display: 'flex', gap: '16px' }}>
                          <span>Target: <strong style={{ color: 'var(--text)' }}>{item.recipients}</strong></span>
                          <span>Channel: <strong style={{ color: 'var(--text)' }}>{item.channel}</strong></span>
                          <span>Requested: <strong style={{ color: 'var(--text)' }}>{item.createdDate}</strong></span>
                        </div>

                        <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
                          <button
                            onClick={(e) => { e.stopPropagation(); handleRejectClick(item); }}
                            style={{
                              border: '1px solid #fee2e2',
                              background: '#fff',
                              color: '#dc2626',
                              height: '28px',
                              padding: '0 10px',
                              borderRadius: '4px',
                              fontSize: '11px',
                              fontWeight: '750'
                            }}
                            type="button"
                          >
                            Reject
                          </button>
                          <button
                            onClick={(e) => { e.stopPropagation(); handleApprove(item.id); }}
                            style={{
                              border: 'none',
                              background: '#07956f',
                              color: '#fff',
                              height: '28px',
                              padding: '0 10px',
                              borderRadius: '4px',
                              fontSize: '11px',
                              fontWeight: '750',
                              boxShadow: '0 1px 2px rgba(0,0,0,0.05)'
                            }}
                            type="button"
                          >
                            Approve Dispatch
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>

          {/* Right Side Panel */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-section)' }}>
            
            {/* Performance Drift Gauge */}
            <div style={{
              background: 'linear-gradient(135deg, #1e1b4b 0%, #0c0a3e 100%)',
              color: '#fff',
              borderRadius: '12px',
              padding: 'var(--spacing-section)',
              display: 'flex',
              flexDirection: 'column',
              gap: '16px',
              boxShadow: '0 4px 12px rgba(12, 10, 62, 0.08)'
            }}>
              <div>
                <span style={{ fontSize: '9px', fontWeight: '900', color: '#a78bfa', letterSpacing: '1px', textTransform: 'uppercase' }}>
                  Model Drift Indicator
                </span>
                <strong style={{ display: 'block', fontSize: '20px', marginTop: '6px', fontWeight: '800' }}>
                  Performance Drift
                </strong>
                <p style={{ fontSize: '12px', color: '#c3c1db', marginTop: '6px', margin: 0, lineHeight: '1.4' }}>
                  Drift index checks message sentiment variance against the audience response profile.
                </p>
              </div>

              <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '16px', marginTop: '4px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                  <span style={{ fontSize: '12px', color: '#94a3b8' }}>Queue Health Rating</span>
                  <strong style={{ fontSize: '18px', color: '#38bdf8' }}>76%</strong>
                </div>
                
                {/* SVG Ring Progress or Premium Bar */}
                <div style={{ height: '8px', background: 'rgba(255,255,255,0.1)', borderRadius: '4px', overflow: 'hidden', position: 'relative' }}>
                  <div style={{ width: '76%', height: '100%', background: 'linear-gradient(90deg, #6366f1, #38bdf8)', borderRadius: '4px' }} />
                </div>

                <div style={{ display: 'flex', gap: '8px', alignItems: 'center', marginTop: '12px', fontSize: '11px', color: '#c3c1db' }}>
                  <AlertTriangle size={12} color="#f59e0b" />
                  <span>Variance alert threshold: 80%</span>
                </div>
              </div>
            </div>

            {/* Reason Distribution Meter Charts */}
            <div className="panel" style={{ padding: 'var(--spacing-section)', display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <h3 style={{ fontSize: '14px', fontWeight: '850', color: 'var(--text)', margin: 0 }}>
                Reason Distribution (Rejections)
              </h3>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                {[
                  { reason: 'Sentiment Mismatch', percentage: 48, count: 12, color: 'var(--primary)' },
                  { reason: 'Compliance Drift', percentage: 28, count: 7, color: 'var(--primary-3)' },
                  { reason: 'Duplicate Audiences', percentage: 16, count: 4, color: 'var(--line)' },
                  { reason: 'Spam Filter Risk', percentage: 8, count: 2, color: '#7a7688' }
                ].map((item, index) => (
                  <div key={index} style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', fontWeight: '750' }}>
                      <span style={{ color: 'var(--text)' }}>{item.reason}</span>
                      <span style={{ color: 'var(--muted)' }}>{item.percentage}% ({item.count})</span>
                    </div>
                    <div style={{ height: '6px', background: '#eee9f6', borderRadius: '3px', overflow: 'hidden' }}>
                      <div style={{ width: `${item.percentage}%`, height: '100%', background: item.color }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>

        {/* Audit Log Table Section */}
        <div className="panel" style={{ padding: 'var(--spacing-section)', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h2 style={{ fontSize: '15px', fontWeight: '850', color: 'var(--text)', margin: 0 }}>
              Audit Log: Historic Outcomes
            </h2>
            <button
              onClick={() => alert('Viewing detailed audit trail')}
              style={{ border: 'none', background: 'transparent', color: 'var(--primary)', fontSize: '12.5px', fontWeight: '750', display: 'flex', alignItems: 'center', gap: '4px', cursor: 'pointer' }}
              type="button"
            >
              <span>View Full Trail</span>
              <ChevronRight size={14} />
            </button>
          </div>

          <div style={{ overflowY: 'auto', maxHeight: '400px' }}>
            <div className="table-responsive-wrapper">
<table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px', textAlign: 'left', minWidth: '700px' }}>
              <thead>
                <tr style={{ background: 'var(--soft)', borderBottom: '1.5px solid #25108f' }}>
                  <th style={{ padding: '12px 16px', color: 'var(--muted)', fontWeight: '800', textTransform: 'uppercase', fontSize: '10px' }}>Campaign ID</th>
                  <th style={{ padding: '12px 16px', color: 'var(--muted)', fontWeight: '800', textTransform: 'uppercase', fontSize: '10px' }}>Campaign Name</th>
                  <th style={{ padding: '12px 16px', color: 'var(--muted)', fontWeight: '800', textTransform: 'uppercase', fontSize: '10px' }}>Approver</th>
                  <th style={{ padding: '12px 16px', color: 'var(--muted)', fontWeight: '800', textTransform: 'uppercase', fontSize: '10px' }}>Outcome</th>
                  <th style={{ padding: '12px 16px', color: 'var(--muted)', fontWeight: '800', textTransform: 'uppercase', fontSize: '10px' }}>Timestamp</th>
                  <th style={{ padding: '12px 16px', color: 'var(--muted)', fontWeight: '800', textTransform: 'uppercase', fontSize: '10px' }}>Audit Note / Reason</th>
                  <th style={{ padding: '12px 16px', color: 'var(--muted)', fontWeight: '800', textTransform: 'uppercase', fontSize: '10px', textAlign: 'right' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {auditLogs.map((log, index) => (
                  <tr key={index} style={{ borderBottom: '1px solid var(--lavender)' }}>
                    <td style={{ padding: '16px', fontWeight: '800', color: 'var(--text)' }}>{log.id}</td>
                    <td style={{ padding: '16px', fontWeight: '700', color: 'var(--text)' }}>{log.name}</td>
                    <td style={{ padding: '16px', color: 'var(--muted)' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <UserCheck size={13} style={{ color: 'var(--primary-3)' }} />
                        <span>{log.approver}</span>
                      </div>
                    </td>
                    <td style={{ padding: '16px' }}>
                      <span style={{
                        fontSize: '9.5px',
                        fontWeight: '900',
                        padding: '3px 8px',
                        borderRadius: '4px',
                        background: log.outcome === 'Approved' ? '#ecfdf5' : '#fee2e2',
                        color: log.outcome === 'Approved' ? '#07956f' : '#dc2626'
                      }}>
                        {log.outcome}
                      </span>
                    </td>
                    <td style={{ padding: '16px', color: 'var(--muted)' }}>{log.timestamp}</td>
                    <td style={{ padding: '16px', color: 'var(--muted)', maxWidth: '240px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {log.notes}
                    </td>
                    <td style={{ padding: '16px', textAlign: 'right' }}>
                      <button
                        onClick={() => alert(`Reviewing detail trail of ${log.id}`)}
                        style={{ border: 'none', background: 'transparent', color: 'var(--primary)', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '4px' }}
                        type="button"
                        aria-label="View Details"
                      >
                        <Eye size={14} />
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

      {/* Reject Modal */}
      {showRejectModal && selectedCampaign && (
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
            maxWidth: '460px',
            boxShadow: '0 8px 24px rgba(17, 12, 60, 0.15)',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 20px', borderBottom: '1.5px solid #25108f' }}>
              <h3 style={{ fontSize: '15px', fontWeight: '850', color: 'var(--text)', margin: 0 }}>Reject Campaign Content</h3>
              <button onClick={() => setShowRejectModal(false)} style={{ border: 'none', background: 'transparent', cursor: 'pointer', fontSize: '16px' }} aria-label="Close modal">
                x
              </button>
            </div>

            <form onSubmit={submitReject} style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <p style={{ fontSize: '13px', margin: 0, color: 'var(--muted)' }}>
                  Rejecting: <strong>{selectedCampaign.name}</strong> ({selectedCampaign.id})
                </p>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: '750', color: 'var(--text)', marginBottom: '6px' }}>Reason / Notes for Author</label>
                <textarea
                  required
                  rows={4}
                  placeholder="Explain why this campaign was rejected (e.g. sentiment drift index exceeds 80%, compliance copy error in Q3 disclosures)..."
                  value={rejectNotes}
                  onChange={(e) => setRejectNotes(e.target.value)}
                  style={{
                    width: '100%',
                    border: '1.5px solid #25108f',
                    borderRadius: '6px',
                    padding: '10px 12px',
                    fontSize: '13px',
                    
                    resize: 'vertical'
                  }}
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '8px' }}>
                <button
                  type="button"
                  onClick={() => setShowRejectModal(false)}
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
                    background: '#dc2626',
                    color: '#fff',
                    borderRadius: '6px',
                    fontSize: '13px',
                    fontWeight: '750'
                  }}
                >
                  Confirm Rejection
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </AdminShell>
  );
}


