import React, { useState } from 'react';
import {
  Power,
  CheckCircle,
  XCircle,
  Eye,
  CheckSquare,
  AlertCircle,
  X
} from 'lucide-react';

const initialServices = [
  { id: 'SVC-ACT-101', name: 'Premium HVAC Maintenance', provider: 'HVAC Pros Ltd', region: 'North America', status: 'PENDING_ACTIVATION', logs: 'System diagnostics initiated. Awaiting gateway response.' },
  { id: 'SVC-ACT-102', name: 'Enterprise IT Support', provider: 'Tech Solutions Inc', region: 'Europe', status: 'ACTIVATED', logs: 'Rollout complete. 24 clusters provisioned successfully.' },
  { id: 'SVC-ACT-103', name: '24/7 Plumbing Emergency', provider: 'QuickFix Plumbing', region: 'Asia Pacific', status: 'FAILED', logs: 'Error 503: Provider webhook failed to handshake.' }
];

export default function ServiceActivation() {
  const [services, setServices] = useState(initialServices);
  const [selectedIds, setSelectedIds] = useState([]);
  
  // Modal states
  const [activeModal, setActiveModal] = useState(null);
  const [modalData, setModalData] = useState(null);

  // Dynamic KPI Counts
  const pendingCount = services.filter(s => s.status === 'PENDING_ACTIVATION').length;
  const activatedCount = services.filter(s => s.status === 'ACTIVATED').length;
  const failedCount = services.filter(s => s.status === 'FAILED').length;

  // Checkbox Selection Handler
  const handleSelectRow = (id) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter(item => item !== id));
    } else {
      setSelectedIds([...selectedIds, id]);
    }
  };

  // Select All/Deselect All Handler
  const handleSelectAll = () => {
    if (selectedIds.length === services.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(services.map(s => s.id));
    }
  };

  // --- FIX: Bulk Activation Action Logic ---
  const handleActivateSelected = () => {
    if (selectedIds.length === 0) return;

    // Sirf unhi services ko update karo jo selected hain
    const updatedServices = services.map(svc => {
      if (selectedIds.includes(svc.id)) {
        return { 
          ...svc, 
          status: 'ACTIVATED', 
          logs: 'Manually activated via bulk dashboard operation.' 
        };
      }
      return svc;
    });

    setServices(updatedServices);
    setSelectedIds([]); // Selection clear karo
  };

  // Single Row Quick Activation Action
  const handleSingleActivate = (id) => {
    setServices(services.map(svc => 
      svc.id === id ? { ...svc, status: 'ACTIVATED', logs: 'Activated directly via quick actions.' } : svc
    ));
  };

  // Open Popups
  const openModal = (type, service) => {
    setModalData(service);
    setActiveModal(type);
  };

  // Check if any selected service can be activated
  const hasSelectableServices = selectedIds.length > 0;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-section)', position: 'relative' }}>
      
      {/* Title & Actions Row */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h1 style={{ fontSize: '26px', fontWeight: '800', color: 'var(--text)', margin: 0 }}>Service Activation</h1>
          <p style={{ fontSize: '14px', color: 'var(--muted)', marginTop: '4px', margin: 0 }}>Manage rollouts and monitor the activation status of approved services.</p>
        </div>
        <div style={{ display: 'flex', gap: '12px' }}>
          <button
            onClick={handleActivateSelected}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              background: hasSelectableServices ? '#25108f' : '#94a3b8',
              color: '#ffffff',
              border: 'none',
              borderRadius: '6px',
              padding: '8px 16px',
              fontSize: '13px',
              fontWeight: '700',
              cursor: hasSelectableServices ? 'pointer' : 'not-allowed',
              transition: 'background 0.2s'
            }}
            disabled={!hasSelectableServices}
            type="button"
          >
            <Power size={16} />
            <span>Activate Selected ({selectedIds.length})</span>
          </button>
        </div>
      </div>

      {/* KPI Cards Row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px' }}>
        <div className="panel" style={{ background: '#ffffff', borderRadius: '12px', border: '1.5px solid #25108f', padding: '20px', display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <span style={{ display: 'block', fontSize: '10px', fontWeight: '800', color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Pending Activation</span>
              <strong style={{ display: 'block', fontSize: '28px', color: 'var(--text)', marginTop: '8px', fontWeight: '800' }}>{pendingCount}</strong>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '36px', height: '36px', borderRadius: '8px', background: '#fffbeb', color: '#d97706' }}>
              <Power size={20} />
            </div>
          </div>
        </div>

        <div className="panel" style={{ background: '#ffffff', borderRadius: '12px', border: '1.5px solid #25108f', padding: '20px', display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <span style={{ display: 'block', fontSize: '10px', fontWeight: '800', color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Successfully Activated</span>
              <strong style={{ display: 'block', fontSize: '28px', color: 'var(--text)', marginTop: '8px', fontWeight: '800' }}>{activatedCount}</strong>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '36px', height: '36px', borderRadius: '8px', background: '#ecfdf5', color: '#059669' }}>
              <CheckCircle size={20} />
            </div>
          </div>
        </div>

        <div className="panel" style={{ background: '#ffffff', borderRadius: '12px', border: '1.5px solid #25108f', padding: '20px', display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <span style={{ display: 'block', fontSize: '10px', fontWeight: '800', color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Failed Rollouts</span>
              <strong style={{ display: 'block', fontSize: '28px', color: 'var(--text)', marginTop: '8px', fontWeight: '800' }}>{failedCount}</strong>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '36px', height: '36px', borderRadius: '8px', background: '#fef2f2', color: '#dc2626' }}>
              <XCircle size={20} />
            </div>
          </div>
        </div>
      </div>

      {/* Table Section */}
      <div className="panel" style={{ background: '#ffffff', border: '1.5px solid #25108f', borderRadius: '12px', padding: 'var(--spacing-section)' }}>
        <div style={{ overflowY: 'auto', maxHeight: '400px' }}>
          <div style={{ overflowY: 'auto', maxHeight: '400px', width: '100%' }}>
            <div className="table-responsive-wrapper">
<table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
              <thead>
                <tr style={{ borderBottom: '1.5px solid #25108f' }}>
                  <th style={{ padding: '12px 8px', width: '40px' }}>
                    <input 
                      type="checkbox" 
                      onChange={handleSelectAll} 
                      checked={selectedIds.length === services.length && services.length > 0} 
                      style={{ cursor: 'pointer' }}
                    />
                  </th>
                  <th style={{ padding: '12px 8px', fontSize: '11px', fontWeight: '800', color: 'var(--muted)', textTransform: 'uppercase' }}>Service ID</th>
                  <th style={{ padding: '12px 8px', fontSize: '11px', fontWeight: '800', color: 'var(--muted)', textTransform: 'uppercase' }}>Service Name</th>
                  <th style={{ padding: '12px 8px', fontSize: '11px', fontWeight: '800', color: 'var(--muted)', textTransform: 'uppercase' }}>Provider</th>
                  <th style={{ padding: '12px 8px', fontSize: '11px', fontWeight: '800', color: 'var(--muted)', textTransform: 'uppercase' }}>Region</th>
                  <th style={{ padding: '12px 8px', fontSize: '11px', fontWeight: '800', color: 'var(--muted)', textTransform: 'uppercase' }}>Status</th>
                  <th style={{ padding: '12px 8px', width: '120px', textAlign: 'right' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {services.map((svc) => (
                  <tr key={svc.id} style={{ borderBottom: '1px solid #f1f5f9', background: selectedIds.includes(svc.id) ? '#f8fafc' : 'transparent' }}>
                    <td style={{ padding: '16px 8px' }}>
                      <input 
                        type="checkbox" 
                        checked={selectedIds.includes(svc.id)} 
                        onChange={() => handleSelectRow(svc.id)} 
                        style={{ cursor: 'pointer' }}
                      />
                    </td>
                    <td style={{ padding: '16px 8px', fontSize: '13px', fontWeight: '700', color: 'var(--text)' }}>{svc.id}</td>
                    <td style={{ padding: '16px 8px', fontSize: '14px', fontWeight: '700', color: 'var(--text)' }}>{svc.name}</td>
                    <td style={{ padding: '16px 8px', fontSize: '13px', color: 'var(--text)' }}>{svc.provider}</td>
                    <td style={{ padding: '16px 8px', fontSize: '13px', color: 'var(--text)' }}>{svc.region}</td>
                    <td style={{ padding: '16px 8px' }}>
                      <span
                        style={{
                          fontSize: '10px',
                          fontWeight: '800',
                          padding: '4px 8px',
                          borderRadius: '4px',
                          background:
                            svc.status === 'ACTIVATED'
                              ? '#ecfdf5'
                              : svc.status === 'PENDING_ACTIVATION'
                              ? '#fffbeb'
                              : '#fef2f2',
                          color:
                            svc.status === 'ACTIVATED'
                              ? '#059669'
                              : svc.status === 'PENDING_ACTIVATION'
                              ? '#d97706'
                              : '#dc2626'
                        }}
                      >
                        {svc.status.replace('_', ' ')}
                      </span>
                    </td>
                    <td style={{ padding: '16px 8px', textAlign: 'right' }}>
                      <div style={{ display: 'flex', gap: '6px', justifyContent: 'flex-end' }}>
                        <button 
                          onClick={() => openModal('view', svc)}
                          style={{ border: 'none', background: 'transparent', color: '#64748b', cursor: 'pointer', padding: '6px', borderRadius: '4px' }} 
                          type="button" 
                          title="View Details"
                        >
                          <Eye size={16} />
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
                            borderRadius: '4px' 
                          }} 
                          type="button" 
                          title="Activate Now"
                        >
                          <CheckSquare size={16} />
                        </button>
                        <button 
                          onClick={() => openModal('logs', svc)}
                          style={{ border: 'none', background: 'transparent', color: '#2563eb', cursor: 'pointer', padding: '6px', borderRadius: '4px' }} 
                          type="button" 
                          title="View System Logs"
                        >
                          <AlertCircle size={16} />
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

      {/* Action Modals Popup */}
      {activeModal && modalData && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: 'rgba(15,23,42,0.3)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 999 }}>
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
                <div>
                  <span style={{ fontSize: '10px', fontWeight: '800', color: '#94a3b8' }}>SYSTEM ENGINE STATUS</span>
                  <div style={{ marginTop: '4px' }}>
                    <span style={{ fontSize: '11px', fontWeight: '700', padding: '4px 8px', borderRadius: '4px', background: modalData.status === 'ACTIVATED' ? '#ecfdf5' : '#fffbeb', color: modalData.status === 'ACTIVATED' ? '#059669' : '#d97706' }}>
                      {modalData.status}
                    </span>
                  </div>
                </div>
              </div>
            ) : (
              <div>
                <span style={{ fontSize: '11px', fontWeight: '800', color: '#64748b', display: 'block', marginBottom: '6px' }}>CONSOLE OUTPUT Trace:</span>
                <div style={{ background: '#0f172a', color: '#38bdf8', fontFamily: "var(--materio-space)", fontSize: '12px', padding: '14px', borderRadius: '8px', minHeight: '100px', lineHeight: '1.5' }}>
                  {modalData.logs}
                </div>
              </div>
            )}

            <div style={{ marginTop: '24px', display: 'flex', justifyContent: 'flex-end' }}>
              <button 
                type="button" 
                onClick={() => setActiveModal(null)} 
                style={{ padding: '8px 16px', borderRadius: '6px', border: '1px solid #cbd5e1', background: '#fff', fontSize: '12px', fontWeight: '700', cursor: 'pointer' }}
              >
                Dismiss Window
              </button>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}


