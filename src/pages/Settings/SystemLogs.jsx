import React, { useState } from 'react';
import { 
  Filter, Calendar, Zap, Download, Maximize, Settings, 
  ChevronLeft, ChevronRight 
} from 'lucide-react';
import AdminShell from '../../components/layouts/AdminShell';
import { useToast } from '../../components/common/ToastNotification';

const LOG_DATA = [
  { id: 1, date: '2023-11-28', time: '14:23:41.002', severity: 'CRITICAL', service: 'Auth-Gateway', messageTitle: 'DB_CONNECTION_FAILURE:', messageBody: 'Connection timeout on secondary replica cluster.', latency: '--' },
  { id: 2, date: '2023-11-28', time: '14:23:40.812', severity: 'WARNING', service: 'Payment-Proxy', messageTitle: 'RETRIABLE_EXCEPTION:', messageBody: 'Card validation service responded with 503. Retrying in 2s.', latency: '1.2s' },
  { id: 3, date: '2023-11-28', time: '14:23:39.155', severity: 'INFO', service: 'Search-Indexer', messageTitle: 'INDEX_UPDATE_SUCCESS:', messageBody: "Re-indexed 4,209 documents for 'Global-Search-V3'.", latency: '420ms' },
  { id: 4, date: '2023-11-28', time: '14:23:38.991', severity: 'INFO', service: 'API-v2', messageTitle: '', messageBody: 'GET /v2/analytics/operational?period=24h&scope=full [200 OK]', latency: '12ms' },
  { id: 5, date: '2023-11-28', time: '14:23:37.402', severity: 'CRITICAL', service: 'Node-Manager', messageTitle: 'MEMORY_THRESHOLD_EXCEEDED:', messageBody: 'Process id 8421 killed by OOM killer.', latency: '--' },
  { id: 6, date: '2023-11-28', time: '14:23:36.002', severity: 'WARNING', service: 'Job-Scheduler', messageTitle: 'LATE_EXECUTION:', messageBody: "Job 'Nightly-Backup' started with 12 minute delay.", latency: '--' },
  { id: 7, date: '2023-11-28', time: '14:23:35.812', severity: 'INFO', service: 'CDN-Worker', messageTitle: 'CACHE_PURGE_REQUEST:', messageBody: "Static asset purge initiated for path '/assets/v4/*'.", latency: '2ms' },
  { id: 8, date: '2023-11-28', time: '14:23:34.155', severity: 'INFO', service: 'Invoicing-Svc', messageTitle: 'EMAIL_DISPATCHED:', messageBody: 'Monthly statement sent to client 88219.', latency: '1.4s' }
];

export default function SystemLogs() {
  const { addToast } = useToast();
  const [activeFilter, setActiveFilter] = useState('All Logs');
  const [currentPage, setCurrentPage] = useState(1);

  const getFilteredLogs = () => {
    if (activeFilter === 'All Logs') return LOG_DATA;
    return LOG_DATA.filter(log => log.severity === activeFilter.toUpperCase() || log.severity.includes(activeFilter.toUpperCase().substring(0, 4)));
  };

  const filteredLogs = getFilteredLogs();

  const getSeverityStyle = (severity) => {
    switch(severity) {
      case 'CRITICAL': return { bg: '#fee2e2', color: '#dc2626' };
      case 'WARNING': return { bg: '#fef3c7', color: '#d97706' };
      case 'INFO': return { bg: '#e0f2fe', color: '#0284c7' };
      default: return { bg: '#f1f5f9', color: '#475569' };
    }
  };

  return (
    <AdminShell
      activeTab="Settings"
      customProfileName="Alex Rivera"
      customProfileRole="Admin User"
      showGridIcon={true}
    >
      <div style={{ padding: '32px 40px 60px', maxWidth: '1300px' }}>
        
        {/* Header & Controls */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '32px' }}>
          <div>
            <h1 style={{ fontSize: '24px', fontWeight: '800', color: '#0f172a', margin: '0 0 8px' }}>
              System Logs
            </h1>
            <p style={{ fontSize: '13px', color: '#64748b', margin: 0 }}>
              Real-time monitoring of server health and application events.
            </p>
          </div>
          <div style={{ display: 'flex', gap: '16px' }}>
            <div style={{ display: 'flex', border: '1px solid #e2e8f0', borderRadius: '6px', overflow: 'hidden' }}>
              {['All Logs', 'Critical', 'Warnings', 'Info'].map((f, i) => (
                <button 
                  key={f}
                  onClick={() => { setActiveFilter(f); setCurrentPage(1); }} 
                  style={{ 
                    height: '40px', padding: '0 16px', 
                    background: activeFilter === f ? '#f1f5f9' : '#fff', 
                    border: 'none', borderLeft: i === 0 ? 'none' : '1px solid #e2e8f0', 
                    fontSize: '12px', fontWeight: activeFilter === f ? '800' : '700', 
                    color: activeFilter === f ? '#0f172a' : '#64748b', 
                    cursor: 'pointer', transition: 'all 0.2s' 
                  }}
                >
                  {f}
                </button>
              ))}
            </div>
            <button onClick={() => addToast("Advanced filters modal opened", "info")} style={{ height: '40px', padding: '0 16px', background: '#fff', border: '1px solid #e2e8f0', borderRadius: '6px', fontSize: '12px', fontWeight: '700', color: '#0f172a', display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
              <Filter size={14} /> Advanced Filters
            </button>
            <button onClick={() => addToast("Time range set to Last 24 Hours", "info")} style={{ height: '40px', padding: '0 16px', background: '#fff', border: '1px solid #e2e8f0', borderRadius: '6px', fontSize: '12px', fontWeight: '700', color: '#0f172a', display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
              <Calendar size={14} /> Last 24 Hours
            </button>
          </div>
        </div>

        {/* Top Cards Row */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1.5fr', gap: 'var(--spacing-section)', marginBottom: '32px' }}>
          
          {/* Error Rate Card */}
          <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: '8px', padding: 'var(--spacing-section)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <span style={{ fontSize: '11px', fontWeight: '800', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.5px' }}>ERROR RATE</span>
              <span style={{ fontSize: '12px', fontWeight: '800', color: '#dc2626' }}>+0.02%</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', marginBottom: '16px' }}>
              <span style={{ fontSize: '32px', fontWeight: '800', color: '#0f172a', lineHeight: '1' }}>0.14%</span>
              <span style={{ fontSize: '11px', color: '#64748b' }}>avg/min</span>
            </div>
            {/* Fake bar chart */}
            <div style={{ display: 'flex', alignItems: 'flex-end', gap: '4px', height: '32px', background: '#fef2f2', padding: '4px', borderRadius: '4px' }}>
              <div style={{ flex: 1, background: '#ef4444', height: '40%' }}></div>
              <div style={{ flex: 1, background: '#ef4444', height: '30%' }}></div>
              <div style={{ flex: 1, background: '#ef4444', height: '60%' }}></div>
              <div style={{ flex: 1, background: '#ef4444', height: '50%' }}></div>
              <div style={{ flex: 1, background: '#ef4444', height: '90%' }}></div>
              <div style={{ flex: 1, background: '#ef4444', height: '100%' }}></div>
              <div style={{ flex: 1, background: '#ef4444', height: '70%' }}></div>
              <div style={{ flex: 1, background: 'transparent' }}></div>
              <div style={{ flex: 1, background: 'transparent' }}></div>
              <div style={{ flex: 1, background: 'transparent' }}></div>
              <div style={{ flex: 1, background: 'transparent' }}></div>
            </div>
          </div>

          {/* Total Requests Card */}
          <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: '8px', padding: 'var(--spacing-section)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
              <span style={{ fontSize: '11px', fontWeight: '800', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.5px', width: '60px', lineHeight: '1.4' }}>TOTAL REQUESTS</span>
              <Zap size={16} color="#64748b" />
            </div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', marginBottom: '24px' }}>
              <span style={{ fontSize: '32px', fontWeight: '800', color: '#0f172a', lineHeight: '1' }}>2.4M</span>
              <span style={{ fontSize: '11px', color: '#64748b' }}>past 24h</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ flex: 1, height: '4px', background: '#e2e8f0', borderRadius: '2px', overflow: 'hidden' }}>
                <div style={{ width: '72%', height: '100%', background: '#0f172a', borderRadius: '2px' }}></div>
              </div>
              <span style={{ fontSize: '10px', color: '#64748b' }}>72% of quota</span>
            </div>
          </div>

          {/* Node Distribution Card */}
          <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: '8px', padding: 'var(--spacing-section)', display: 'flex', flexDirection: 'column' }}>
            <span style={{ display: 'block', fontSize: '11px', fontWeight: '800', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '20px' }}>NODE DISTRIBUTION</span>
            <div style={{ display: 'flex', gap: '40px', flex: 1, alignItems: 'center' }}>
              <div>
                <h4 style={{ fontSize: '16px', fontWeight: '800', color: '#0f172a', margin: '0 0 8px' }}>Node-US-East</h4>
                <p style={{ fontSize: '11px', color: '#64748b', margin: 0 }}>Operational • 12ms latency</p>
              </div>
              <div>
                <h4 style={{ fontSize: '16px', fontWeight: '800', color: '#0f172a', margin: '0 0 8px' }}>Node-EU-West</h4>
                <p style={{ fontSize: '11px', color: '#64748b', margin: 0 }}>Operational • 42ms latency</p>
              </div>
            </div>
          </div>

        </div>

        {/* Main Event Registry Table */}
        <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.02)', overflow: 'hidden' }}>
          
          {/* Table Toolbar */}
          <div style={{ background: '#1e1b4b', padding: '16px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <h2 style={{ fontSize: '12px', fontWeight: '800', color: '#fff', letterSpacing: '1px', margin: 0 }}>EVENT REGISTRY</h2>
              <span className="animate-pulse" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: 'rgba(255,255,255,0.1)', color: '#fff', fontSize: '9px', fontWeight: '800', padding: '4px 10px', borderRadius: '12px', letterSpacing: '0.5px' }}>
                <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#4ade80', boxShadow: '0 0 6px #4ade80' }}></span> LIVE STREAMING
              </span>
            </div>
            <div style={{ display: 'flex', gap: '16px', color: '#94a3b8' }}>
              <Download onClick={() => addToast("Downloading raw logs...", "success")} size={16} style={{ cursor: 'pointer' }} />
              <Maximize onClick={() => addToast("Entering full-screen mode", "info")} size={16} style={{ cursor: 'pointer' }} />
              <Settings onClick={() => addToast("Opening log settings", "info")} size={16} style={{ cursor: 'pointer' }} />
            </div>
          </div>

          <div className="table-responsive-wrapper">
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
                  <th style={{ padding: '12px 24px', fontSize: '10px', fontWeight: '800', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.5px' }}>TIMESTAMP (UTC)</th>
                  <th style={{ padding: '12px 24px', fontSize: '10px', fontWeight: '800', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.5px' }}>SEVERITY</th>
                  <th style={{ padding: '12px 24px', fontSize: '10px', fontWeight: '800', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.5px' }}>SERVICE</th>
                  <th style={{ padding: '12px 24px', fontSize: '10px', fontWeight: '800', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.5px' }}>MESSAGE</th>
                  <th style={{ padding: '12px 24px', fontSize: '10px', fontWeight: '800', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.5px', textAlign: 'right' }}>LATENCY</th>
                </tr>
              </thead>
              <tbody style={{ fontFamily: "var(--materio-space)", fontSize: '11px' }}>
                {filteredLogs.map((log, index) => {
                  const style = getSeverityStyle(log.severity);
                  return (
                    <tr key={log.id} className="animate-in fade-in" style={{ borderBottom: index === filteredLogs.length - 1 ? 'none' : '1px solid #f1f5f9' }}>
                      <td style={{ padding: '16px 24px', color: '#64748b' }}>{log.date}<br/>{log.time}</td>
                      <td style={{ padding: '16px 24px' }}>
                        <span style={{ display: 'inline-block', background: style.bg, color: style.color, fontSize: '9px', fontWeight: '800', padding: '4px 8px', borderRadius: '4px', letterSpacing: '0.5px' }}>
                          {log.severity}
                        </span>
                      </td>
                      <td style={{ padding: '16px 24px', color: '#0f172a', fontWeight: '700' }}>{log.service}</td>
                      <td style={{ padding: '16px 24px', color: '#334155', maxWidth: '400px', lineHeight: '1.5' }}>
                        {log.messageTitle && <span style={{ color: log.severity === 'CRITICAL' ? '#dc2626' : '#0f172a', fontWeight: '700' }}>{log.messageTitle} </span>}
                        {log.messageBody}
                      </td>
                      <td style={{ padding: '16px 24px', color: log.latency === '--' ? '#94a3b8' : '#16a34a', textAlign: 'right' }}>
                        {log.latency}
                      </td>
                    </tr>
                  )
                })}
                {filteredLogs.length === 0 && (
                  <tr>
                    <td colSpan="5" style={{ padding: '40px', textAlign: 'center', color: '#64748b', fontSize: '13px' }}>
                      No logs found for this filter in the current view.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination Footer */}
          <div style={{ padding: '16px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid #e2e8f0' }}>
            <span style={{ fontSize: '11px', color: '#64748b' }}>Showing {filteredLogs.length > 0 ? 1 : 0}-{filteredLogs.length} of {activeFilter === 'All Logs' ? '12,402' : filteredLogs.length} entries</span>
            <div style={{ display: 'flex', gap: '4px' }}>
              <button 
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                style={{ width: '28px', height: '28px', background: '#fff', border: '1px solid #e2e8f0', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: currentPage === 1 ? 'not-allowed' : 'pointer', color: currentPage === 1 ? '#cbd5e1' : '#64748b' }}
              >
                <ChevronLeft size={14} />
              </button>
              <button onClick={() => setCurrentPage(1)} style={{ width: '28px', height: '28px', background: currentPage === 1 ? '#1e1b4b' : '#fff', border: currentPage === 1 ? 'none' : '1px solid #e2e8f0', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: currentPage === 1 ? '#fff' : '#64748b', fontSize: '11px', fontWeight: '700' }}>1</button>
              <button onClick={() => setCurrentPage(2)} style={{ width: '28px', height: '28px', background: currentPage === 2 ? '#1e1b4b' : '#fff', border: currentPage === 2 ? 'none' : '1px solid #e2e8f0', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: currentPage === 2 ? '#fff' : '#64748b', fontSize: '11px', fontWeight: '700' }}>2</button>
              <button onClick={() => setCurrentPage(3)} style={{ width: '28px', height: '28px', background: currentPage === 3 ? '#1e1b4b' : '#fff', border: currentPage === 3 ? 'none' : '1px solid #e2e8f0', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: currentPage === 3 ? '#fff' : '#64748b', fontSize: '11px', fontWeight: '700' }}>3</button>
              <span style={{ width: '28px', height: '28px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#64748b', fontSize: '11px' }}>...</span>
              <button style={{ width: '32px', height: '28px', background: '#fff', border: '1px solid #e2e8f0', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: '#64748b', fontSize: '11px', fontWeight: '700' }}>249</button>
              <button 
                onClick={() => setCurrentPage(currentPage + 1)}
                style={{ width: '28px', height: '28px', background: '#fff', border: '1px solid #e2e8f0', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: '#64748b' }}
              >
                <ChevronRight size={14} />
              </button>
            </div>
          </div>
        </div>

      </div>
    </AdminShell>
  );
}
