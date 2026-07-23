import React from 'react';
import { X, User, Activity, Monitor, ArrowRightLeft, Info } from 'lucide-react';

function SectionTitle({ icon: Icon, title }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', margin: '20px 0 12px', paddingBottom: '8px', borderBottom: '2px solid var(--materio-primary)' }}>
      <div style={{ background: 'rgba(105,108,255,0.1)', padding: '5px', borderRadius: '6px', color: 'var(--materio-primary)', display: 'flex', alignItems: 'center' }}>
        <Icon size={14} />
      </div>
      <span style={{ fontSize: '12px', fontWeight: 700, color: 'var(--materio-primary)', textTransform: 'uppercase', letterSpacing: '0.6px' }}>{title}</span>
    </div>
  );
}

function InfoBox({ label, value }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2px', padding: '10px 14px', background: '#f8fafc', borderRadius: '8px', border: '1px solid #f1f5f9' }}>
      <span style={{ fontSize: '11px', color: 'var(--materio-text-muted)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px' }}>{label}</span>
      <span style={{ fontSize: '13px', fontWeight: 700, color: 'var(--materio-text-main)', wordBreak: 'break-word' }}>{value ?? '—'}</span>
    </div>
  );
}

function StatusBadge({ status }) {
  let bg = '#f1f5f9', color = '#64748b';
  if (status === 'Success') { bg = '#E8FADF'; color = '#71DD37'; }
  else if (status === 'Failed') { bg = '#FFE0DB'; color = '#FF3E1D'; }
  else if (status === 'Pending') { bg = '#FFF2D6'; color = '#FFAB00'; }
  return (
    <span style={{ padding: '3px 12px', borderRadius: '9999px', fontSize: '11px', fontWeight: 700, background: bg, color, textTransform: 'uppercase', letterSpacing: '0.4px' }}>
      {status}
    </span>
  );
}

function ActivityTypeBadge({ type }) {
  const colors = {
    'Profile Update': { bg: '#E1F0FF', color: '#03C3EC' },
    'Login': { bg: '#E8FADF', color: '#71DD37' },
    'Failed Login': { bg: '#FFE0DB', color: '#FF3E1D' },
    'Account Suspension': { bg: '#FFF2D6', color: '#FFAB00' },
    'Account Blocked': { bg: '#FFE0DB', color: '#FF3E1D' },
    'Booking': { bg: 'rgba(105,108,255,0.1)', color: '#696CFF' },
    'Create': { bg: '#E8FADF', color: '#16a34a' },
    'Submit': { bg: '#E8FADF', color: '#16a34a' },
    'Update Status': { bg: '#E8FADF', color: '#16a34a' },
    'Update': { bg: '#E8FADF', color: '#16a34a' },
    'Payment': { bg: '#E1F0FF', color: '#2563eb' },
    'Cancel': { bg: '#FFE0DB', color: '#dc2626' },
    'Suspend': { bg: '#FFE0DB', color: '#dc2626' },
    'Wallet Recharge': { bg: '#E8FADF', color: '#71DD37' },
    'Address Added': { bg: 'rgba(105,108,255,0.1)', color: '#696CFF' },
    'Password Change': { bg: '#FFF2D6', color: '#FFAB00' },
  };
  const s = colors[type] || { bg: '#f1f5f9', color: '#64748b' };
  return (
    <span style={{ padding: '3px 12px', borderRadius: '9999px', fontSize: '11px', fontWeight: 700, background: s.bg, color: s.color, letterSpacing: '0.4px' }}>
      {type}
    </span>
  );
}

export default function ActivityLogViewModal({ log, onClose }) {
  if (!log) return null;

  const dateStr = log.dateTime || log.activityDateTime;
  const descStr = log.description || log.actionPerformed;

  return (
    <div
      style={{ position: 'fixed', inset: 0, background: 'rgba(15,23,42,0.55)', backdropFilter: 'blur(3px)', zIndex: 2000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px', animation: 'fadeIn 0.2s ease' }}
      onClick={onClose}
    >
      <style>{`
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes slideUp { from { opacity: 0; transform: translateY(24px) scale(0.97); } to { opacity: 1; transform: translateY(0) scale(1); } }
        .act-log-modal::-webkit-scrollbar { width: 5px; }
        .act-log-modal::-webkit-scrollbar-thumb { background: #e2e8f0; border-radius: 10px; }
      `}</style>
      <div
        className="act-log-modal"
        onClick={e => e.stopPropagation()}
        style={{ background: '#fff', borderRadius: '16px', boxShadow: '0 25px 50px rgba(15,23,42,0.18)', width: '100%', maxWidth: '720px', maxHeight: '90vh', overflow: 'auto', animation: 'slideUp 0.25s cubic-bezier(0.4,0,0.2,1)' }}
      >
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '20px 24px', borderBottom: '1px solid var(--materio-border)', position: 'sticky', top: 0, background: '#fff', zIndex: 10 }}>
          <div>
            <div style={{ fontSize: '16px', fontWeight: 700, color: 'var(--materio-text-main)' }}>Activity Log Details</div>
            <div style={{ fontSize: '12px', color: 'var(--materio-text-muted)', marginTop: '2px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              {log.id} · {dateStr}
              <ActivityTypeBadge type={log.activityType} />
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <StatusBadge status={log.status} />
            <button onClick={onClose} style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: 'var(--materio-text-muted)', padding: '4px', borderRadius: '6px', display: 'flex', alignItems: 'center' }} onMouseEnter={e => e.currentTarget.style.background = '#f1f5f9'} onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
              <X size={18} />
            </button>
          </div>
        </div>

        <div style={{ padding: '4px 24px 24px' }}>

          {/* User Details */}
          <SectionTitle icon={User} title="User Details" />
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
            <InfoBox label="User Name" value={log.userName} />
            <InfoBox label="User Type" value={log.userType || 'User'} />
            <InfoBox label="Role" value={log.role || 'User'} />
            <InfoBox label="Mobile Number" value={log.mobileNumber} />
            <InfoBox label="Email ID" value={log.emailId} />
            <InfoBox label="Created By" value={log.createdBy || log.userName} />
          </div>

          {/* Activity Details */}
          <SectionTitle icon={Activity} title="Activity Details" />
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
            <InfoBox label="Activity Type" value={<ActivityTypeBadge type={log.activityType} />} />
            <InfoBox label="Module Name" value={log.moduleName} />
            <div style={{ gridColumn: '1 / -1' }}>
              <InfoBox label="Description / Action" value={descStr} />
            </div>
            <InfoBox label="Status" value={<StatusBadge status={log.status} />} />
            <InfoBox label="Activity Date & Time" value={dateStr} />
          </div>

          {/* Change History */}
          <SectionTitle icon={ArrowRightLeft} title="Change History" />
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            <div>
              <div style={{ fontSize: '11px', fontWeight: 700, color: '#FF3E1D', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '6px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                <span style={{ display: 'inline-block', width: '8px', height: '8px', borderRadius: '50%', background: '#FF3E1D' }} /> Old Value
              </div>
              <div style={{ padding: '14px 16px', background: '#FFF5F5', border: '1.5px solid #FFCDD2', borderRadius: '10px', fontSize: '13px', fontWeight: 600, color: '#c62828', minHeight: '52px', wordBreak: 'break-word' }}>
                {log.oldValue || '—'}
              </div>
            </div>
            <div>
              <div style={{ fontSize: '11px', fontWeight: 700, color: '#71DD37', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '6px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                <span style={{ display: 'inline-block', width: '8px', height: '8px', borderRadius: '50%', background: '#71DD37' }} /> New Value
              </div>
              <div style={{ padding: '14px 16px', background: '#F1FFF0', border: '1.5px solid #C8E6C9', borderRadius: '10px', fontSize: '13px', fontWeight: 600, color: '#2e7d32', minHeight: '52px', wordBreak: 'break-word' }}>
                {log.newValue || '—'}
              </div>
            </div>
          </div>

          {/* Device Information */}
          <SectionTitle icon={Monitor} title="Device Information" />
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
            <InfoBox label="Device Type" value={log.deviceType} />
            <InfoBox label="Browser" value={log.browser} />
            <InfoBox label="Operating System" value={log.operatingSystem} />
            <InfoBox label="IP Address" value={log.ipAddress} />
          </div>

          {/* System Information */}
          <SectionTitle icon={Info} title="System Information" />
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
            <InfoBox label="Device Location" value={log.deviceLocation} />
            <InfoBox label="Log ID" value={log.id} />
          </div>
        </div>

        {/* Footer */}
        <div style={{ padding: '14px 24px', borderTop: '1px solid var(--materio-border)', background: '#f8fafc', display: 'flex', justifyContent: 'flex-end' }}>
          <button onClick={onClose} className="btn-materio btn-materio-outline" style={{ fontSize: '13px' }}>Close</button>
        </div>
      </div>
    </div>
  );
}
