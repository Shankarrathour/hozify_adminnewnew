import React, { useState } from 'react';
import AdminShell from '../../components/layouts/AdminShell';
import {
  Power,
  CheckCircle,
  XCircle,
  Eye,
  CheckSquare,
  AlertCircle,
  X,
  Terminal,
  Trash2
} from 'lucide-react';

import Select from "../../components/ui/Select";

const initialServices = [
  { id: 'SVC-ACT-101', name: 'Premium HVAC Maintenance', provider: 'HVAC Pros Ltd', region: 'North America', status: 'PENDING_ACTIVATION', logs: 'System diagnostics initiated. Awaiting gateway response.' },
  { id: 'SVC-ACT-102', name: 'Enterprise IT Support', provider: 'Tech Solutions Inc', region: 'Europe', status: 'ACTIVATED', logs: 'Rollout complete. 24 clusters provisioned successfully.' },
  { id: 'SVC-ACT-103', name: '24/7 Plumbing Emergency', provider: 'QuickFix Plumbing', region: 'Asia Pacific', status: 'FAILED', logs: 'Error 503: Provider webhook failed to handshake.' }
];

const initialShellLogs = [
  { timestamp: '06:01:12', type: 'info', text: 'Admin Core Engine initialized successfully.' },
  { timestamp: '06:02:45', type: 'success', text: 'Connection secure. Listening on WebSocket port 8080...' },
  { timestamp: '06:04:01', type: 'error', text: 'CRITICAL: SVC-ACT-103 deployment webhook rejected handshake.' }
];

export default function ServiceActivation() {
  const [services, setServices] = useState(initialServices);
  const [selectedIds, setSelectedIds] = useState([]);
  const [shellLogs, setShellLogs] = useState(initialShellLogs);
  const [logFilter, setLogFilter] = useState('ALL');

  const [activeModal, setActiveModal] = useState(null);
  const [modalData, setModalData] = useState(null);

  const pendingCount = services.filter(s => s.status === 'PENDING_ACTIVATION').length;
  const activatedCount = services.filter(s => s.status === 'ACTIVATED').length;
  const failedCount = services.filter(s => s.status === 'FAILED').length;

  const handleSelectRow = (id) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter(item => item !== id));
    } else {
      setSelectedIds([...selectedIds, id]);
    }
  };

  const handleSelectAll = () => {
    if (selectedIds.length === services.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(services.map(s => s.id));
    }
  };

  const pushToShell = (type, text) => {
    const time = new Date().toTimeString().split(' ')[0];
    setShellLogs(prev => [...prev, { timestamp: time, type, text }]);
  };

  const handleActivateSelected = () => {
    if (selectedIds.length === 0) return;

    const updated = services.map(svc => {
      if (selectedIds.includes(svc.id)) {
        pushToShell('success', `BULK ACTION: ${svc.id} deployment state shifted to ACTIVATED.`);
        return { ...svc, status: 'ACTIVATED', logs: 'Manually activated via bulk dashboard operation.' };
      }
      return svc;
    });

    setServices(updated);
    setSelectedIds([]);
  };

  const handleSingleActivate = (id) => {
    setServices(services.map(svc => {
      if (svc.id === id) {
        pushToShell('success', `DIRECT ACTION: ${svc.id} activation triggered successfully.`);
        return { ...svc, status: 'ACTIVATED', logs: 'Activated directly via quick actions.' };
      }
      return svc;
    }));
  };

  const openModal = (type, service) => {
    setModalData(service);
    setActiveModal(type);
    if (type === 'logs') {
      const logType = service.status === 'FAILED' ? 'error' : service.status === 'ACTIVATED' ? 'success' : 'info';
      pushToShell(logType, `INSPECTING LOGS [${service.id}]: ${service.logs}`);
    }
  };

  const filteredShellLogs = shellLogs.filter(log => {
    if (logFilter === 'SUCCESS') return log.type === 'success';
    if (logFilter === 'ERROR') return log.type === 'error';
    return true;
  });

  return (
    <AdminShell activeTab="Service Management" headerTitle="Service Activation">
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-section)', position: 'relative', paddingBottom: '40px', color: '#1e293b' }}>
        
        {/* Title & Actions Row */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <h1 style={{ fontSize: '26px', fontWeight: '800', color: '#0f172a', margin: 0 }}>Service Activation</h1>
            <p style={{ fontSize: '14px', color: '#64748b', marginTop: '4px', margin: 0 }}>Manage rollouts and monitor the activation status of approved services.</p>
          </div>
          <div style={{ display: 'flex', gap: '12px' }}>
            <button
              onClick={handleActivateSelected}
              disabled={selectedIds.length === 0}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                background: selectedIds.length > 0 ? '#4f46e5' : '#94a3b8',
                color: '#ffffff',
                border: 'none',
                borderRadius: '6px',
                padding: '10px 18px',
                fontSize: '13px',
                fontWeight: '700',
                cursor: selectedIds.length > 0 ? 'pointer' : 'not-allowed',
                boxShadow: selectedIds.length > 0 ? '0 2px 4px rgba(79, 70, 229, 0.2)' : 'none',
                transition: 'all 0.2s'
              }}
              type="button"
            >
              <Power size={16} />
              <span>Activate Selected ({selectedIds.length})</span>
            </button>
          </div>
        </div>

        {/* KPI Cards Row */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px' }}>
          <div style={{ background: '#ffffff', borderRadius: '12px', border: '1px solid #e2e8f0', padding: '20px', display: 'flex', flexDirection: 'column', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <span style={{ display: 'block', fontSize: '11px', fontWeight: '800', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Pending Activation</span>
                <strong style={{ display: 'block', fontSize: '28px', color: '#0f172a', marginTop: '8px', fontWeight: '800' }}>{pendingCount}</strong>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '40px', height: '40px', borderRadius: '8px', background: '#fffbeb', color: '#d97706' }}>
                <Power size={20} />
              </div>
            </div>
          </div>

          <div style={{ background: '#ffffff', borderRadius: '12px', border: '1px solid #e2e8f0', padding: '20px', display: 'flex', flexDirection: 'column', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <span style={{ display: 'block', fontSize: '11px', fontWeight: '800', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Successfully Activated</span>
                <strong style={{ display: 'block', fontSize: '28px', color: '#0f172a', marginTop: '8px', fontWeight: '800' }}>{activatedCount}</strong>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '40px', height: '40px', borderRadius: '8px', background: '#ecfdf5', color: '#059669' }}>
                <CheckCircle size={20} />
              </div>
            </div>
          </div>

          <div style={{ background: '#ffffff', borderRadius: '12px', border: '1px solid #e2e8f0', padding: '20px', display: 'flex', flexDirection: 'column', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <span style={{ display: 'block', fontSize: '11px', fontWeight: '800', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Failed Rollouts</span>
                <strong style={{ display: 'block', fontSize: '28px', color: '#0f172a', marginTop: '8px', fontWeight: '800' }}>{failedCount}</strong>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '40px', height: '40px', borderRadius: '8px', background: '#fef2f2', color: '#dc2626' }}>
                <XCircle size={20} />
              </div>
            </div>
          </div>
        </div>

        {/* Table Section - Padding aur horizontal spacing standard fix kar di */}
        <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '16px 24px', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
          <div style={{ overflowY: 'auto', maxHeight: '400px' }}>
            <div className="table-responsive-wrapper">
<table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
              <thead>
                <tr style={{ borderBottom: '2px solid #e2e8f0' }}>
                  <th style={{ padding: '14px 12px', width: '50px', textAlign: 'center' }}>
                    <input 
                      type="checkbox" 
                      onChange={handleSelectAll} 
                      checked={selectedIds.length === services.length && services.length > 0} 
                      style={{ cursor: 'pointer', transform: 'scale(1.1)' }}
                    />
                  </th>
                  <th style={{ padding: '14px 12px', fontSize: '12px', fontWeight: '800', color: '#64748b', textTransform: 'uppercase' }}>Service ID</th>
                  <th style={{ padding: '14px 12px', fontSize: '12px', fontWeight: '800', color: '#64748b', textTransform: 'uppercase' }}>Service Name</th>
                  <th style={{ padding: '14px 12px', fontSize: '12px', fontWeight: '800', color: '#64748b', textTransform: 'uppercase' }}>Provider</th>
                  <th style={{ padding: '14px 12px', fontSize: '12px', fontWeight: '800', color: '#64748b', textTransform: 'uppercase' }}>Region</th>
                  <th style={{ padding: '14px 12px', fontSize: '12px', fontWeight: '800', color: '#64748b', textTransform: 'uppercase' }}>Status</th>
                  <th style={{ padding: '14px 12px', width: '140px', textAlign: 'right', fontSize: '12px', fontWeight: '800', color: '#64748b', textTransform: 'uppercase' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {services.map((svc) => (
                  <tr key={svc.id} style={{ borderBottom: '1px solid #f1f5f9', background: selectedIds.includes(svc.id) ? '#f8fafc' : 'transparent', transition: 'background 0.15s' }}>
                    <td style={{ padding: '16px 12px', textAlign: 'center' }}>
                      <input 
                        type="checkbox" 
                        checked={selectedIds.includes(svc.id)} 
                        onChange={() => handleSelectRow(svc.id)} 
                        style={{ cursor: 'pointer', transform: 'scale(1.1)' }}
                      />
                    </td>
                    <td style={{ padding: '16px 12px', fontSize: '13px', fontWeight: '700', color: '#1e293b' }}>{svc.id}</td>
                    <td style={{ padding: '16px 12px', fontSize: '14px', fontWeight: '700', color: '#0f172a' }}>{svc.name}</td>
                    <td style={{ padding: '16px 12px', fontSize: '13px', color: '#334155' }}>{svc.provider}</td>
                    <td style={{ padding: '16px 12px', fontSize: '13px', color: '#334155' }}>{svc.region}</td>
                    <td style={{ padding: '16px 12px' }}>
                      <span
                        style={{
                          fontSize: '11px',
                          fontWeight: '700',
                          padding: '4px 10px',
                          borderRadius: '6px',
                          background: svc.status === 'ACTIVATED' ? '#d1fae5' : svc.status === 'PENDING_ACTIVATION' ? '#fef3c7' : '#fee2e2',
                          color: svc.status === 'ACTIVATED' ? '#065f46' : svc.status === 'PENDING_ACTIVATION' ? '#92400e' : '#991b1b'
                        }}
                      >
                        {svc.status.replace('_', ' ')}
                      </span>
                    </td>
                    <td style={{ padding: '16px 12px', textAlign: 'right' }}>
                      <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end', alignItems: 'center' }}>
                        <button onClick={() => openModal('view', svc)} style={{ border: 'none', background: 'transparent', color: '#64748b', cursor: 'pointer', padding: '6px', display: 'inline-flex', alignItems: 'center' }} type="button" title="View Details">
                          <Eye size={18} />
                        </button>
                        <button 
                          onClick={() => handleSingleActivate(svc.id)} 
                          disabled={svc.status === 'ACTIVATED'}
                          style={{ 
                            border: 'none', 
                            background: 'transparent', 
                            color: svc.status === 'ACTIVATED' ? '#cbd5e1' : '#059669', 
                            cursor: svc.status === 'ACTIVATED' ? 'not-allowed' : 'pointer', 
                            padding: '6px',
                            display: 'inline-flex',
                            alignItems: 'center'
                          }} 
                          type="button" 
                          title={svc.status === 'ACTIVATED' ? 'Already Activated' : 'Activate Now'}
                        >
                          <CheckSquare size={18} />
                        </button>
                        <button onClick={() => openModal('logs', svc)} style={{ border: 'none', background: 'transparent', color: '#2563eb', cursor: 'pointer', padding: '6px', display: 'inline-flex', alignItems: 'center' }} type="button" title="View System Logs">
                          <AlertCircle size={18} />
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

        {/* --- CONSOLE LOG ENGINE (ADMIN SYSTEM SHELL WINDOW) --- */}
        <div style={{ background: '#0f172a', borderRadius: '12px', border: '1px solid #1e293b', padding: '20px', color: '#f8fafc', fontFamily: "var(--materio-space)", }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px', borderBottom: '1px solid #1e293b', paddingBottom: '12px', marginBottom: '14px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#38bdf8' }}>
              <Terminal size={18} />
              <span style={{ fontSize: '13px', fontWeight: '700', letterSpacing: '0.5px' }}>ADMIN SYSTEM SHELL CORE</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Select
                value={logFilter}
                onChange={(e) => setLogFilter(e.target.value)}
                style={{ background: '#1e293b', color: '#f8fafc', border: '1px solid #334155', borderRadius: '4px', padding: '4px 8px', fontSize: '11px', outline: 'none', cursor: 'pointer' }}
                options={[{
                  label: "LOG LEVEL: ALL",
                  value: "ALL"
                }, {
                  label: "LOG LEVEL: SUCCESS Only",
                  value: "SUCCESS"
                }, {
                  label: "LOG LEVEL: ERRORS Only",
                  value: "ERROR"
                }]} />
              <button 
                onClick={() => setShellLogs([])} 
                style={{ display: 'flex', alignItems: 'center', gap: '4px', background: 'transparent', border: 'none', color: '#94a3b8', fontSize: '11px', cursor: 'pointer' }}
                title="Clear Console Output"
              >
                <Trash2 size={12} />
                <span>Clear Terminal</span>
              </button>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', maxHeight: '180px', overflowY: 'auto', fontSize: '12px', lineHeight: '1.6' }}>
            {filteredShellLogs.length === 0 ? (
              <div style={{ color: '#64748b', fontStyle: 'italic' }}>~ Terminal context empty or stream cleared. Trigger actions above to catch logs.</div>
            ) : (
              filteredShellLogs.map((log, index) => (
                <div key={index} style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                  <span style={{ color: '#64748b' }}>[{log.timestamp}]</span>
                  <span style={{ 
                    color: log.type === 'error' ? '#ef4444' : log.type === 'success' ? '#22c55e' : '#e2e8f0',
                    fontWeight: log.type !== 'info' ? '700' : 'normal'
                  }}>
                    {log.type === 'error' ? '✖ [SYS-ERR]' : log.type === 'success' ? '✔ [SYS-OK]' : 'ℹ [SYS-INF]'} : {log.text}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Action Modals Popup */}
        {activeModal && modalData && (
          <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: 'rgba(15,23,42,0.4)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 999 }}>
            <div style={{ background: '#ffffff', width: '100%', maxWidth: '460px', borderRadius: '12px', padding: 'var(--spacing-section)', boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1)' }}>
              
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', borderBottom: '1px solid #f1f5f9', paddingBottom: '12px' }}>
                <h3 style={{ margin: 0, fontSize: '16px', fontWeight: '800', color: '#0f172a' }}>
                  {activeModal === 'view' ? `Service Insight — ${modalData.id}` : `Deployment Logs — ${modalData.id}`}
                </h3>
                <button type="button" onClick={() => setActiveModal(null)} style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: '#94a3b8' }}>
                  <X size={18} />
                </button>
              </div>

              {activeModal === 'view' ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <div>
                    <span style={{ fontSize: '10px', fontWeight: '800', color: '#94a3b8' }}>SERVICE NAME</span>
                    <div style={{ fontSize: '14px', fontWeight: '700', color: '#1e293b', marginTop: '2px' }}>{modalData.name}</div>
                  </div>
                  <div>
                    <span style={{ fontSize: '10px', fontWeight: '800', color: '#94a3b8' }}>DEPLOYMENT PROVIDER</span>
                    <div style={{ fontSize: '13px', color: '#334155', marginTop: '2px' }}>{modalData.provider}</div>
                  </div>
                  <div>
                    <span style={{ fontSize: '10px', fontWeight: '800', color: '#94a3b8' }}>TARGET GEOLOCATION REGION</span>
                    <div style={{ fontSize: '13px', color: '#334155', marginTop: '2px' }}>{modalData.region}</div>
                  </div>
                </div>
              ) : (
                <div>
                  <span style={{ fontSize: '11px', fontWeight: '800', color: '#64748b', display: 'block', marginBottom: '6px' }}>CONSOLE OUTPUT Trace:</span>
                  <div style={{ background: '#0f172a', color: '#38bdf8', padding: '14px', borderRadius: '8px', fontSize: '12px' }}>
                    {modalData.logs}
                  </div>
                </div>
              )}

              <div style={{ marginTop: '24px', display: 'flex', justifyContent: 'flex-end' }}>
                <button type="button" onClick={() => setActiveModal(null)} style={{ padding: '8px 16px', borderRadius: '6px', border: '1px solid #cbd5e1', background: '#fff', fontSize: '12px', fontWeight: '700', cursor: 'pointer', color: '#334155' }}>
                  Dismiss Window
                </button>
              </div>

            </div>
          </div>
        )}
      </div>
    </AdminShell>
  );
}
