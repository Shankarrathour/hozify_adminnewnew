import React, { useState } from 'react';
import { 
  Download, Calendar, ShieldAlert, Globe, Server, AlertTriangle, Database, ShieldCheck, ChevronLeft, ChevronRight, Loader2
} from 'lucide-react';
import AdminShell from '../../components/layouts/AdminShell';
import { useToast } from '../../components/common/ToastNotification';

const ALL_LOGS = [
  { id: 1, time: '14:22:01.442', date: 'Oct 24, 2023', eventType: 'USER_LOGIN_SUCCESS', typeCategory: 'Security', actor: 'j.doe@enterprise.com', initials: 'JD', target: 'AUTH_SERVICE_01', status: 'SUCCESS' },
  { id: 2, time: '14:19:55.109', date: 'Oct 24, 2023', eventType: 'UNAUTHORIZED_ACCESS_ATTEMPT', typeCategory: 'Error', actor: 'IP: 192.168.1.104', isIp: true, target: 'DB_CLUSTER_PROD', status: 'BLOCKED' },
  { id: 3, time: '14:15:33.882', date: 'Oct 24, 2023', eventType: 'CONFIG_MODIFICATION', typeCategory: 'Security', actor: 's.knight@enterprise.com', initials: 'SK', target: 'API_GATEWAY_V2', status: 'SUCCESS' },
  { id: 4, time: '14:12:00.001', date: 'Oct 24, 2023', eventType: 'SYSTEM_BACKUP_INITIATED', typeCategory: 'System', actor: 'CRON_JOB_AGENT', isSystem: true, target: 'S3_STORAGE_LOGS', status: 'SUCCESS' },
  { id: 5, time: '13:58:22.610', date: 'Oct 24, 2023', eventType: 'FIREWALL_RULE_VIOLATION', typeCategory: 'Error', actor: 'IP: 45.122.11.90', isIp: true, target: 'CORE_VPC_INGRESS', status: 'BLOCKED' }
];

export default function SystemAuditLogs() {
  const { addToast } = useToast();
  const [activeFilter, setActiveFilter] = useState('All Logs');
  const [isExporting, setIsExporting] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const filteredLogs = ALL_LOGS.filter(log => {
    if (activeFilter === 'All Logs') return true;
    if (activeFilter === 'Errors') return log.typeCategory === 'Error';
    if (activeFilter === 'Security') return log.typeCategory === 'Security';
    return true;
  });

  const handleExport = () => {
    setIsExporting(true);
    addToast("Preparing CSV export...", "info");
    setTimeout(() => {
      setIsExporting(false);
      addToast("Export complete. Download started.", "success");
    }, 1500);
  };

  const renderActorIcon = (log) => {
    if (log.isIp) {
      return (
        <div style={{ width: '24px', height: '24px', borderRadius: '6px', background: '#fee2e2', color: '#ef4444', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Globe size={12} />
        </div>
      );
    }
    if (log.isSystem) {
      return (
        <div style={{ width: '24px', height: '24px', borderRadius: '6px', background: '#f1f5f9', color: '#64748b', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Server size={12} />
        </div>
      );
    }
    return (
      <div style={{ width: '24px', height: '24px', borderRadius: '6px', background: '#e2e8f0', color: '#475569', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '9px', fontWeight: '800' }}>
        {log.initials}
      </div>
    );
  };

  const getEventColor = (category, status) => {
    if (status === 'BLOCKED' || category === 'Error') return '#ef4444';
    if (category === 'Security' && status === 'SUCCESS') return '#3b82f6';
    if (category === 'Security') return '#f59e0b';
    return '#3b82f6'; // default System/Success
  };

  return (
    <AdminShell
      activeTab="Settings"
      customProfileName="Alex Rivera"
      customProfileRole="Admin User"
      showGridIcon={true}
    >
      <div style={{ padding: '32px 40px 60px', maxWidth: '1200px' }}>
        
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
          <div>
            <h1 style={{ fontSize: '24px', fontWeight: '800', color: '#0f172a', margin: '0 0 8px' }}>
              System Audit Logs
            </h1>
            <p style={{ fontSize: '13px', color: 'var(--muted)', margin: 0 }}>
              Comprehensive immutable record of all system-level activities and security events.
            </p>
          </div>
          <button 
            onClick={handleExport} 
            disabled={isExporting}
            style={{ height: '40px', padding: '0 20px', background: '#0f172a', border: 'none', borderRadius: '6px', fontSize: '12px', fontWeight: '700', color: '#fff', display: 'flex', alignItems: 'center', gap: '8px', cursor: isExporting ? 'not-allowed' : 'pointer', opacity: isExporting ? 0.8 : 1 }}
          >
            {isExporting ? <Loader2 size={14} className="animate-spin" /> : <Download size={14} />}
            {isExporting ? 'Exporting...' : 'Export CSV'}
          </button>
        </div>

        {/* Filters Bar */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{ display: 'flex', background: '#f1f5f9', borderRadius: '8px', padding: '4px' }}>
              {['All Logs', 'Errors', 'Security'].map(filter => (
                <button 
                  key={filter}
                  onClick={() => setActiveFilter(filter)} 
                  style={{ 
                    height: '32px', padding: '0 16px', 
                    background: activeFilter === filter ? '#0f172a' : 'transparent', 
                    border: 'none', borderRadius: '6px', fontSize: '12px', 
                    fontWeight: activeFilter === filter ? '700' : '600', 
                    color: activeFilter === filter ? '#fff' : '#475569', 
                    cursor: 'pointer', transition: 'all 0.2s' 
                  }}
                >
                  {filter}
                </button>
              ))}
            </div>
            
            <button onClick={() => addToast("Timeframe filter opened", "info")} style={{ height: '40px', padding: '0 16px', background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '8px', fontSize: '12px', fontWeight: '600', color: '#475569', display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
              <Calendar size={14} /> Last 24 Hours
            </button>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ display: 'flex' }}>
              <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: '#e0e7ff', color: '#4f46e5', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '10px', fontWeight: '800', border: '2px solid #fff', zIndex: 3 }}>JD</div>
              <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: '#dbeafe', color: '#2563eb', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '10px', fontWeight: '800', border: '2px solid #fff', marginLeft: '-8px', zIndex: 2 }}>SM</div>
              <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: '#ffedd5', color: '#ea580c', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '10px', fontWeight: '800', border: '2px solid #fff', marginLeft: '-8px', zIndex: 1 }}>AM</div>
            </div>
            <span style={{ fontSize: '12px', fontWeight: '600', color: '#475569' }}>3 active reviewers</span>
          </div>
        </div>

        {/* Main Table Container */}
        <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: '12px', boxShadow: '0 1px 3px rgba(0,0,0,0.02)', marginBottom: '24px', overflow: 'hidden' }}>
          
          <div className="table-responsive-wrapper">
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
              <thead>
                <tr style={{ background: '#f8fafc', borderBottom: '1px solid #e2e8f0' }}>
                  <th style={{ padding: '16px 24px', fontSize: '10px', fontWeight: '800', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.5px' }}>TIMESTAMP</th>
                  <th style={{ padding: '16px 24px', fontSize: '10px', fontWeight: '800', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.5px' }}>EVENT TYPE</th>
                  <th style={{ padding: '16px 24px', fontSize: '10px', fontWeight: '800', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.5px' }}>ACTOR</th>
                  <th style={{ padding: '16px 24px', fontSize: '10px', fontWeight: '800', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.5px' }}>TARGET RESOURCE</th>
                  <th style={{ padding: '16px 24px', fontSize: '10px', fontWeight: '800', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.5px', textAlign: 'right' }}>STATUS</th>
                </tr>
              </thead>
              <tbody>
                {filteredLogs.map((log, index) => (
                  <tr key={log.id} className="animate-in fade-in" style={{ borderBottom: index === filteredLogs.length - 1 ? 'none' : '1px solid #f1f5f9' }}>
                    <td style={{ padding: '20px 24px', fontSize: '11px', color: '#475569', lineHeight: '1.5' }}>
                      <span style={{ display: 'block', fontWeight: '600' }}>{log.date}</span>
                      <span style={{ fontFamily: "var(--materio-space)" }}>{log.time}</span>
                    </td>
                    <td style={{ padding: '20px 24px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: getEventColor(log.typeCategory, log.status) }}></span>
                        <span style={{ fontSize: '12px', fontWeight: '800', color: '#0f172a' }}>{log.eventType}</span>
                      </div>
                    </td>
                    <td style={{ padding: '20px 24px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        {renderActorIcon(log)}
                        <span style={{ fontSize: '12px', fontWeight: '600', color: '#334155' }}>{log.actor}</span>
                      </div>
                    </td>
                    <td style={{ padding: '20px 24px' }}>
                      <span style={{ display: 'inline-block', background: '#f1f5f9', border: '1px solid #e2e8f0', color: '#475569', padding: '4px 8px', borderRadius: '4px', fontSize: '9px', fontWeight: '700', letterSpacing: '0.5px' }}>
                        {log.target}
                      </span>
                    </td>
                    <td style={{ padding: '20px 24px', textAlign: 'right' }}>
                      {log.status === 'SUCCESS' ? (
                        <span style={{ display: 'inline-block', background: '#dcfce7', border: '1px solid #bbf7d0', color: '#16a34a', padding: '4px 8px', borderRadius: '4px', fontSize: '9px', fontWeight: '800', letterSpacing: '0.5px' }}>
                          SUCCESS
                        </span>
                      ) : (
                        <span style={{ display: 'inline-block', background: '#fee2e2', border: '1px solid #fecaca', color: '#dc2626', padding: '4px 8px', borderRadius: '4px', fontSize: '9px', fontWeight: '800', letterSpacing: '0.5px' }}>
                          BLOCKED
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
                {filteredLogs.length === 0 && (
                  <tr>
                    <td colSpan="5" style={{ padding: '40px', textAlign: 'center', color: '#64748b', fontSize: '13px' }}>
                      No logs found for this filter.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination Footer */}
          <div style={{ padding: '16px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid #e2e8f0', background: '#fff' }}>
            <span style={{ fontSize: '12px', color: '#475569' }}>Showing <b>1</b> to <b>{filteredLogs.length}</b> of <b>{activeFilter === 'All Logs' ? '12,402' : filteredLogs.length}</b> logs</span>
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <button 
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))} 
                disabled={currentPage === 1}
                style={{ width: '28px', height: '28px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#fff', border: '1px solid #e2e8f0', borderRadius: '6px', color: currentPage === 1 ? '#cbd5e1' : '#475569', cursor: currentPage === 1 ? 'not-allowed' : 'pointer' }}
              >
                <ChevronLeft size={14} />
              </button>
              <button onClick={() => setCurrentPage(1)} style={{ width: '28px', height: '28px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: currentPage === 1 ? '#0f172a' : '#fff', border: currentPage === 1 ? 'none' : '1px solid #e2e8f0', borderRadius: '6px', color: currentPage === 1 ? '#fff' : '#475569', fontSize: '12px', fontWeight: '700', cursor: 'pointer' }}>1</button>
              <button onClick={() => setCurrentPage(2)} style={{ width: '28px', height: '28px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: currentPage === 2 ? '#0f172a' : '#fff', border: currentPage === 2 ? 'none' : '1px solid #e2e8f0', borderRadius: '6px', color: currentPage === 2 ? '#fff' : '#475569', fontSize: '12px', fontWeight: '600', cursor: 'pointer' }}>2</button>
              <button onClick={() => setCurrentPage(3)} style={{ width: '28px', height: '28px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: currentPage === 3 ? '#0f172a' : '#fff', border: currentPage === 3 ? 'none' : '1px solid #e2e8f0', borderRadius: '6px', color: currentPage === 3 ? '#fff' : '#475569', fontSize: '12px', fontWeight: '600', cursor: 'pointer' }}>3</button>
              <span style={{ color: '#94a3b8', fontSize: '12px', margin: '0 4px' }}>...</span>
              <button style={{ padding: '0 8px', height: '28px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#fff', border: '1px solid #e2e8f0', borderRadius: '6px', color: '#475569', fontSize: '12px', fontWeight: '600', cursor: 'pointer' }}>2481</button>
              <button 
                onClick={() => setCurrentPage(currentPage + 1)}
                style={{ width: '28px', height: '28px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#fff', border: '1px solid #e2e8f0', borderRadius: '6px', color: '#475569', cursor: 'pointer' }}
              >
                <ChevronRight size={14} />
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Metrics Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 'var(--spacing-section)' }}>
          
          {/* Security Alerts */}
          <div style={{ background: '#fff', border: '1px solid #fecaca', borderRadius: '12px', padding: 'var(--spacing-section)', boxShadow: '0 1px 3px rgba(0,0,0,0.02)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <span style={{ fontSize: '10px', fontWeight: '800', color: '#475569', textTransform: 'uppercase', letterSpacing: '0.5px' }}>SECURITY ALERTS</span>
              <AlertTriangle size={16} color="#dc2626" />
            </div>
            <div style={{ fontSize: '32px', fontWeight: '800', color: '#0f172a', marginBottom: '4px', lineHeight: '1' }}>24</div>
            <div style={{ fontSize: '11px', color: '#64748b', marginBottom: '16px' }}>Identified in the last 24h</div>
            <div style={{ width: '100%', height: '4px', background: '#fee2e2', borderRadius: '2px', overflow: 'hidden' }}>
              <div style={{ width: '24%', height: '100%', background: '#dc2626', borderRadius: '2px' }}></div>
            </div>
          </div>

          {/* Storage Load */}
          <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: '12px', padding: 'var(--spacing-section)', boxShadow: '0 1px 3px rgba(0,0,0,0.02)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <span style={{ fontSize: '10px', fontWeight: '800', color: '#475569', textTransform: 'uppercase', letterSpacing: '0.5px' }}>STORAGE LOAD</span>
              <Database size={16} color="#2563eb" />
            </div>
            <div style={{ fontSize: '32px', fontWeight: '800', color: '#0f172a', marginBottom: '4px', lineHeight: '1' }}>82%</div>
            <div style={{ fontSize: '11px', color: '#64748b', marginBottom: '16px' }}>Log cluster capacity</div>
            <div style={{ width: '100%', height: '4px', background: '#e2e8f0', borderRadius: '2px', overflow: 'hidden' }}>
              <div style={{ width: '82%', height: '100%', background: '#2563eb', borderRadius: '2px' }}></div>
            </div>
          </div>

          {/* Compliance Health */}
          <div style={{ background: '#fff', border: '1px solid #bbf7d0', borderRadius: '12px', padding: 'var(--spacing-section)', boxShadow: '0 1px 3px rgba(0,0,0,0.02)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <span style={{ fontSize: '10px', fontWeight: '800', color: '#475569', textTransform: 'uppercase', letterSpacing: '0.5px' }}>COMPLIANCE HEALTH</span>
              <ShieldCheck size={16} color="#16a34a" />
            </div>
            <div style={{ fontSize: '32px', fontWeight: '800', color: '#0f172a', marginBottom: '4px', lineHeight: '1' }}>99.9%</div>
            <div style={{ fontSize: '11px', color: '#64748b', marginBottom: '16px' }}>Log integrity verified</div>
            <div style={{ width: '100%', height: '4px', background: '#dcfce7', borderRadius: '2px', overflow: 'hidden' }}>
              <div style={{ width: '99.9%', height: '100%', background: '#16a34a', borderRadius: '2px' }}></div>
            </div>
          </div>

        </div>

      </div>
    </AdminShell>
  );
}
