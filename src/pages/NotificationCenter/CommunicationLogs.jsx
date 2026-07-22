import React, { useState } from 'react';
import {
  FileSpreadsheet,
  Search,
  Filter,
  CheckCircle,
  AlertCircle,
  Clock,
  Mail,
  MessageSquare,
  Globe,
  ChevronRight,
  TrendingUp,
  TrendingDown,
  X,
  RefreshCw,
  Send
} from 'lucide-react';
import AdminShell from '../../components/layouts/AdminShell';

import Select from "../../components/ui/Select";

export default function CommunicationLogs({ activeTab = 'Notification Center' }) {
  const [timeframe, setTimeframe] = useState('Last 24 Hours');
  const [channelFilter, setChannelFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Selected log for the sidebar drawer
  const [selectedLog, setSelectedLog] = useState(null);

  const [logs, setLogs] = useState([
    {
      id: 'LOG-88201',
      recipient: '+1 (555) 902-1200',
      user: 'Sarah Jenkins',
      channel: 'SMS',
      provider: 'Twilio Gateway Node 2',
      snippet: 'Your Vortex Hozify authentication verification code is 482091.',
      status: 'Delivered',
      timestamp: 'Today, 11:24:02 AM',
      latency: '14ms',
      retries: 0,
      traceId: 'tr-twilio-sms-991209acbf',
      body: 'Your Vortex Hozify authentication verification code is 482091. This code will expire in 5 minutes.'
    },
    {
      id: 'LOG-88202',
      recipient: 'compliance@hozify.com',
      user: 'Legal Compliance Node',
      channel: 'Email',
      provider: 'AWS SES Node US-East',
      snippet: 'Vortex System Alert: Q3 Revenue Disclosures requires review.',
      status: 'Delivered',
      timestamp: 'Today, 11:15:30 AM',
      latency: '240ms',
      retries: 0,
      traceId: 'tr-aws-ses-11029cba88',
      body: 'Vortex System Alert: Q3 Revenue Disclosures requires review and sign-off by legal authorities before publication. Click link to view details: https://vortex.hozify.internal/approvals/q3-disclosures.'
    },
    {
      id: 'LOG-88205',
      recipient: 'd.vance@hozify.com',
      user: 'David Vance',
      channel: 'Email',
      provider: 'AWS SES Node US-East',
      snippet: 'Verification link: Confirm your admin credentials update request.',
      status: 'Failed',
      timestamp: 'Today, 10:45:12 AM',
      latency: '1500ms',
      retries: 3,
      traceId: 'tr-aws-ses-44819dfb01',
      body: 'Verification link: Confirm your admin credentials update request by clicking this secure link: https://auth.hozify.com/verify-admin-update?token=a8b309'
    },
    {
      id: 'LOG-88209',
      recipient: '+1 (555) 309-8800',
      user: 'Alex Sterling',
      channel: 'SMS',
      provider: 'Twilio Gateway Node 1',
      snippet: 'Revenue threshold breach alert: Module 18 daily metrics.',
      status: 'Delivered',
      timestamp: 'Today, 09:12:05 AM',
      latency: '18ms',
      retries: 0,
      traceId: 'tr-twilio-sms-22908fbd24',
      body: 'Revenue threshold breach alert: Module 18 daily metrics have exceeded safe operational threshold limits by 14.5%.'
    },
    {
      id: 'LOG-88212',
      recipient: 'iOS-DeviceToken-9921',
      user: 'Elena Rostova',
      channel: 'Push',
      provider: 'Google FCM Push',
      snippet: 'New Material Request pending approval in branch #12.',
      status: 'Delivered',
      timestamp: 'Yesterday, 04:30:15 PM',
      latency: '45ms',
      retries: 1,
      traceId: 'tr-fcm-push-88190facb33',
      body: 'New Material Request pending approval in branch #12. Requested by: Mark Henderson. Amount: $4,200.00.'
    }
  ]);

  const handleResend = (logId) => {
    const log = logs.find(l => l.id === logId);
    if (!log) return;

    alert(`Resending notification to ${log.recipient} via trace ID ${log.traceId}`);
    
    // update state to simulate processing
    setLogs(prevLogs =>
      prevLogs.map(l => {
        if (l.id === logId) {
          return {
            ...l,
            status: 'Delivered',
            timestamp: 'Just now',
            retries: l.retries + 1,
            latency: '12ms'
          };
        }
        return l;
      })
    );

    // update active selected log detail if open
    if (selectedLog && selectedLog.id === logId) {
      setSelectedLog(prev => ({
        ...prev,
        status: 'Delivered',
        timestamp: 'Just now',
        retries: prev.retries + 1,
        latency: '12ms'
      }));
    }
  };

  const filteredLogs = logs.filter(l => {
    // Channel filter
    if (channelFilter !== 'All' && l.channel.toLowerCase() !== channelFilter.toLowerCase()) {
      return false;
    }
    // Search query
    const query = searchQuery.toLowerCase();
    return (
      l.recipient.toLowerCase().includes(query) ||
      l.user.toLowerCase().includes(query) ||
      l.id.toLowerCase().includes(query) ||
      l.snippet.toLowerCase().includes(query)
    );
  });

  return (
    <AdminShell
      activeTab={activeTab}
      brandText="HOZIFY"
      brandSubText="System Logs"
      headerTitle="Communication Logs"
      searchPlaceholder="Search recipient, sender, trace id..."
    >
      <div style={{ display: 'flex', position: 'relative', minHeight: 'calc(100vh - 120px)' }}>
        
        {/* Main Logs Table Section */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 'var(--spacing-section)', padding: '24px 0', paddingRight: selectedLog ? '380px' : '0', transition: 'padding-right 0.25s ease' }}>
          
          {/* Header Row */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
            <div>
              <h1 style={{ fontSize: '24px', fontWeight: '800', color: 'var(--text)', margin: 0 }}>
                Communication Logs
              </h1>
              <p style={{ fontSize: '13px', color: 'var(--muted)', margin: '4px 0 0' }}>
                System-wide transaction ledger for outbound SMS, Email, and FCM/APNs Push events
              </p>
            </div>

            <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', border: '1.5px solid #25108f', padding: '6px 12px', borderRadius: '6px', background: '#fff' }}>
                <Clock size={14} style={{ color: 'var(--muted)' }} />
                <Select
                  value={timeframe}
                  onChange={(e) => setTimeframe(e.target.value)}
                  style={{ border: 'none', background: 'transparent', outline: 'none', fontWeight: '700', fontSize: '12px', cursor: 'pointer', color: '#565365' }}
                  aria-label="Filter timeframe log history"
                  options={[{
                    label: "Last 24 Hours",
                    value: "Last 24 Hours"
                  }, {
                    label: "Last 7 Days",
                    value: "Last 7 Days"
                  }, {
                    label: "Last 30 Days",
                    value: "Last 30 Days"
                  }]} />
              </div>

              <button
                onClick={() => alert('Exporting logs as CSV spreadsheet...')}
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
                type="button"
              >
                <FileSpreadsheet size={14} />
                <span>Export CSV</span>
              </button>
            </div>
          </div>

          {/* KPI Metrics Row */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
            <div className="panel" style={{ padding: '20px', display: 'flex', gap: '12px', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '38px', height: '38px', borderRadius: '6px', background: '#eff6ff', color: '#1e40af' }}>
                <RefreshCw size={18} />
              </div>
              <div>
                <span style={{ display: 'block', fontSize: '10px', fontWeight: '800', color: 'var(--muted)', textTransform: 'uppercase' }}>Total Sent</span>
                <strong style={{ display: 'block', fontSize: '20px', color: 'var(--text)', fontWeight: '800' }}>124,502</strong>
              </div>
            </div>

            <div className="panel" style={{ padding: '20px', display: 'flex', gap: '12px', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '38px', height: '38px', borderRadius: '6px', background: '#ecfdf5', color: '#059669' }}>
                <CheckCircle size={18} />
              </div>
              <div>
                <span style={{ display: 'block', fontSize: '10px', fontWeight: '800', color: 'var(--muted)', textTransform: 'uppercase' }}>Delivery Rate</span>
                <strong style={{ display: 'block', fontSize: '20px', color: 'var(--green)', fontWeight: '800' }}>99.2%</strong>
              </div>
            </div>

            <div className="panel" style={{ padding: '20px', display: 'flex', gap: '12px', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '38px', height: '38px', borderRadius: '6px', background: '#f5f3ff', color: 'var(--primary)' }}>
                <TrendingUp size={18} />
              </div>
              <div>
                <span style={{ display: 'block', fontSize: '10px', fontWeight: '800', color: 'var(--muted)', textTransform: 'uppercase' }}>Open Rate</span>
                <strong style={{ display: 'block', fontSize: '20px', color: 'var(--text)', fontWeight: '800' }}>14.5%</strong>
              </div>
            </div>

            <div className="panel" style={{ padding: '20px', display: 'flex', gap: '12px', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '38px', height: '38px', borderRadius: '6px', background: '#fee2e2', color: '#dc2626' }}>
                <AlertCircle size={18} />
              </div>
              <div>
                <span style={{ display: 'block', fontSize: '10px', fontWeight: '800', color: 'var(--muted)', textTransform: 'uppercase' }}>Failures</span>
                <strong style={{ display: 'block', fontSize: '20px', color: 'var(--red)', fontWeight: '800' }}>84</strong>
              </div>
            </div>
          </div>

          {/* Historical Ledger Table Panel */}
          <div className="panel" style={{ padding: 'var(--spacing-section)', display: 'flex', flexDirection: 'column', gap: '16px', flex: 1 }}>
            
            {/* Filters Row */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', border: '1.5px solid #25108f', padding: '6px 12px', borderRadius: '6px', background: '#fff', width: '280px' }}>
                <Search size={14} style={{ color: 'var(--muted)' }} />
                <input
                  type="text"
                  placeholder="Filter by recipient or trace..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  style={{ border: 'none', background: 'transparent', outline: 'none', fontSize: '12px', width: '100%', color: 'var(--text)' }}
                  aria-label="Filter ledger logs"
                />
              </div>

              <div style={{ display: 'flex', gap: '6px' }}>
                {['All', 'SMS', 'Email', 'Push'].map((channel) => (
                  <button
                    key={channel}
                    onClick={() => setChannelFilter(channel)}
                    style={{
                      height: '28px',
                      padding: '0 12px',
                      borderRadius: '4px',
                      border: '1.5px solid #25108f',
                      background: channelFilter === channel ? 'var(--primary)' : '#fff',
                      color: channelFilter === channel ? '#fff' : 'var(--muted)',
                      fontSize: '11.5px',
                      fontWeight: '700',
                      cursor: 'pointer'
                    }}
                    type="button"
                  >
                    {channel}
                  </button>
                ))}
              </div>
            </div>

            {/* Table Container */}
            <div style={{ overflowY: 'auto', maxHeight: '400px', flex: 1 }}>
              <div className="table-responsive-wrapper">
<table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px', textAlign: 'left', minWidth: '600px' }}>
                <thead>
                  <tr style={{ background: 'var(--soft)', borderBottom: '1.5px solid #25108f' }}>
                    <th style={{ padding: '12px 16px', color: 'var(--muted)', fontWeight: '800', textTransform: 'uppercase', fontSize: '10px' }}>Timestamp</th>
                    <th style={{ padding: '12px 16px', color: 'var(--muted)', fontWeight: '800', textTransform: 'uppercase', fontSize: '10px' }}>Recipient Details</th>
                    <th style={{ padding: '12px 16px', color: 'var(--muted)', fontWeight: '800', textTransform: 'uppercase', fontSize: '10px', width: '90px' }}>Channel</th>
                    <th style={{ padding: '12px 16px', color: 'var(--muted)', fontWeight: '800', textTransform: 'uppercase', fontSize: '10px' }}>Message Preview</th>
                    <th style={{ padding: '12px 16px', color: 'var(--muted)', fontWeight: '800', textTransform: 'uppercase', fontSize: '10px' }}>Status</th>
                    <th style={{ padding: '12px 16px', color: 'var(--muted)', fontWeight: '800', textTransform: 'uppercase', fontSize: '10px', textAlign: 'right' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredLogs.length === 0 ? (
                    <tr>
                      <td colSpan={6} style={{ padding: 'var(--spacing-section)', textAlign: 'center', color: 'var(--muted)' }}>
                        No communication ledger events found matching criteria.
                      </td>
                    </tr>
                  ) : (
                    filteredLogs.map((log) => {
                      const isSelected = selectedLog?.id === log.id;
                      return (
                        <tr
                          key={log.id}
                          onClick={() => setSelectedLog(log)}
                          style={{
                            borderBottom: '1px solid var(--lavender)',
                            cursor: 'pointer',
                            background: isSelected ? 'rgba(37, 16, 143, 0.02)' : 'transparent',
                            transition: 'all 0.15s ease'
                          }}
                        >
                          <td style={{ padding: '14px 16px', color: 'var(--muted)', whiteSpace: 'nowrap' }}>{log.timestamp}</td>
                          <td style={{ padding: '14px 16px' }}>
                            <strong style={{ display: 'block', color: 'var(--text)' }}>{log.recipient}</strong>
                            <span style={{ fontSize: '11px', color: 'var(--muted)' }}>User: {log.user}</span>
                          </td>
                          <td style={{ padding: '14px 16px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--primary)' }}>
                              {log.channel === 'SMS' ? <MessageSquare size={13} /> : log.channel === 'Email' ? <Mail size={13} /> : <Globe size={13} />}
                              <span style={{ fontWeight: '750' }}>{log.channel}</span>
                            </div>
                          </td>
                          <td style={{ padding: '14px 16px', color: 'var(--muted)', maxWidth: '300px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                            {log.snippet}
                          </td>
                          <td style={{ padding: '14px 16px' }}>
                            <span style={{
                              fontSize: '9.5px',
                              fontWeight: '900',
                              padding: '3px 8px',
                              borderRadius: '4px',
                              background: log.status === 'Delivered' ? '#ecfdf5' : '#fee2e2',
                              color: log.status === 'Delivered' ? '#07956f' : '#dc2626'
                            }}>
                              {log.status}
                            </span>
                          </td>
                          <td style={{ padding: '14px 16px', textAlign: 'right' }} onClick={(e) => e.stopPropagation()}>
                            <button
                              onClick={() => handleResend(log.id)}
                              style={{
                                border: 'none',
                                background: '#f4eff8',
                                color: 'var(--primary)',
                                height: '26px',
                                padding: '0 10px',
                                borderRadius: '4px',
                                fontSize: '11px',
                                fontWeight: '750',
                                cursor: 'pointer',
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '4px'
                              }}
                              type="button"
                            >
                              <RefreshCw size={11} />
                              <span>Resend</span>
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

            {/* Pagination footer */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid var(--lavender)', paddingTop: '16px', marginTop: '12px' }}>
              <span style={{ fontSize: '12px', color: 'var(--muted)' }}>
                Showing 1-{filteredLogs.length} of {logs.length} ledger events
              </span>
              <div style={{ display: 'flex', gap: '6px' }}>
                <button style={{ height: '28px', padding: '0 12px', borderRadius: '4px', border: '1.5px solid #25108f', background: '#fff', fontSize: '11px', fontWeight: '800', cursor: 'pointer', color: 'var(--muted)' }} type="button">Prev</button>
                <button style={{ height: '28px', padding: '0 12px', borderRadius: '4px', border: 'none', background: 'var(--primary)', fontSize: '11px', fontWeight: '800', cursor: 'pointer', color: '#fff' }} type="button">1</button>
                <button style={{ height: '28px', padding: '0 12px', borderRadius: '4px', border: '1.5px solid #25108f', background: '#fff', fontSize: '11px', fontWeight: '800', cursor: 'pointer', color: 'var(--muted)' }} type="button">Next</button>
              </div>
            </div>

          </div>

        </div>

        {/* Metadata Sidebar Panel (Log Details Overlay) */}
        {selectedLog && (
          <div style={{
            position: 'absolute',
            top: 0,
            right: 0,
            bottom: 0,
            width: '360px',
            background: '#fff',
            borderLeft: '1.5px solid #25108f',
            boxShadow: '-4px 0 20px rgba(17, 12, 60, 0.08)',
            display: 'flex',
            flexDirection: 'column',
            zIndex: 100,
            animation: 'slideIn 0.2s cubic-bezier(0.16, 1, 0.3, 1) forwards'
          }}>
            <style>{`
              @keyframes slideIn {
                from { transform: translateX(100%); }
                to { transform: translateX(0); }
              }
            `}</style>

            {/* Close Button Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 20px', borderBottom: '1px solid var(--lavender)' }}>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <span style={{ fontSize: '10.5px', fontWeight: '800', color: 'var(--muted)' }}>Ledger Trace ID</span>
                <strong style={{ fontSize: '13.5px', color: 'var(--text)', fontFamily: "var(--materio-space)", }}>{selectedLog.id}</strong>
              </div>
              <button
                onClick={() => setSelectedLog(null)}
                style={{ border: 'none', background: 'transparent', cursor: 'pointer', color: 'var(--muted)', padding: '4px' }}
                aria-label="Close sidebar"
              >
                <X size={18} />
              </button>
            </div>

            {/* Sidebar content */}
            <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '20px', flex: 1, overflowY: 'auto' }}>
              
              {/* Recipient card */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <span style={{ fontSize: '11px', fontWeight: '800', color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Recipient</span>
                <div style={{ background: 'var(--soft)', padding: '12px', borderRadius: '6px' }}>
                  <strong style={{ display: 'block', fontSize: '14px', color: 'var(--text)' }}>{selectedLog.recipient}</strong>
                  <span style={{ display: 'block', fontSize: '11px', color: 'var(--muted)', marginTop: '2px' }}>User: {selectedLog.user}</span>
                </div>
              </div>

              {/* Message body */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <span style={{ fontSize: '11px', fontWeight: '800', color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Message Body Payload</span>
                <div style={{ background: '#faf9fc', border: '1px solid var(--lavender)', padding: '12px', borderRadius: '6px', fontSize: '12.5px', color: 'var(--text)', lineHeight: '1.5',  wordBreak: 'break-word' }}>
                  {selectedLog.body}
                </div>
              </div>

              {/* Provider Telemetry indices */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <span style={{ fontSize: '11px', fontWeight: '800', color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Provider Telemetry</span>
                
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                  <div style={{ border: '1px solid var(--lavender)', padding: '10px', borderRadius: '6px' }}>
                    <span style={{ display: 'block', fontSize: '10px', color: 'var(--muted)' }}>Latency Index</span>
                    <strong style={{ display: 'block', fontSize: '13.5px', color: 'var(--text)', marginTop: '2px' }}>{selectedLog.latency}</strong>
                  </div>

                  <div style={{ border: '1px solid var(--lavender)', padding: '10px', borderRadius: '6px' }}>
                    <span style={{ display: 'block', fontSize: '10px', color: 'var(--muted)' }}>Retry Count</span>
                    <strong style={{ display: 'block', fontSize: '13.5px', color: 'var(--text)', marginTop: '2px' }}>{selectedLog.retries} attempts</strong>
                  </div>

                  <div style={{ border: '1px solid var(--lavender)', padding: '10px', borderRadius: '6px', gridColumn: 'span 2' }}>
                    <span style={{ display: 'block', fontSize: '10px', color: 'var(--muted)' }}>Delivery Gateway Provider</span>
                    <strong style={{ display: 'block', fontSize: '13.5px', color: 'var(--text)', marginTop: '2px' }}>{selectedLog.provider}</strong>
                  </div>

                  <div style={{ border: '1px solid var(--lavender)', padding: '10px', borderRadius: '6px', gridColumn: 'span 2' }}>
                    <span style={{ display: 'block', fontSize: '10px', color: 'var(--muted)' }}>Trace Transaction ID</span>
                    <strong style={{ display: 'block', fontSize: '11.5px', color: 'var(--text)', marginTop: '2px', fontFamily: "var(--materio-space)", wordBreak: 'break-word' }}>{selectedLog.traceId}</strong>
                  </div>
                </div>
              </div>

            </div>

            {/* Sidebar Footer Action */}
            <div style={{ padding: '16px 20px', borderTop: '1px solid var(--lavender)', display: 'flex', gap: '12px' }}>
              <button
                onClick={() => setSelectedLog(null)}
                style={{
                  flex: 1,
                  height: '38px',
                  border: '1.5px solid #25108f',
                  borderRadius: '6px',
                  background: '#fff',
                  fontSize: '13px',
                  fontWeight: '750',
                  color: 'var(--muted)',
                  cursor: 'pointer'
                }}
                type="button"
              >
                Close Drawer
              </button>

              <button
                onClick={() => handleResend(selectedLog.id)}
                style={{
                  flex: 1.5,
                  height: '38px',
                  border: 'none',
                  borderRadius: '6px',
                  background: 'var(--primary)',
                  fontSize: '13px',
                  fontWeight: '750',
                  color: '#fff',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '6px',
                  boxShadow: '0 2px 4px rgba(37, 16, 143, 0.08)'
                }}
                type="button"
              >
                <Send size={13} />
                <span>Resend Notification</span>
              </button>
            </div>

          </div>
        )}

      </div>
    </AdminShell>
  );
}


