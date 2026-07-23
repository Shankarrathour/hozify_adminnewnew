import React from 'react';
import { X, Smartphone, Globe, MapPin, Clock, Shield, Wifi, Activity } from 'lucide-react';

function InfoRow({ label, value }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2px', padding: '10px 14px', background: '#f8fafc', borderRadius: '8px', border: '1px solid #f1f5f9' }}>
      <span style={{ fontSize: '11px', color: 'var(--materio-text-muted)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px' }}>{label}</span>
      <span style={{ fontSize: '13px', fontWeight: 700, color: 'var(--materio-text-main)' }}>{value ?? '—'}</span>
    </div>
  );
}

function AttemptBadge({ status }) {
  const map = {
    'Success': { bg: '#E8FADF', color: '#71DD37' },
    'Failed': { bg: '#FFE0DB', color: '#FF3E1D' },
    'Blocked': { bg: '#FFE0DB', color: '#FF3E1D' },
    'OTP Expired': { bg: '#FFF2D6', color: '#FFAB00' },
    'Pending': { bg: '#E1F0FF', color: '#03C3EC' },
  };
  const style = map[status] || { bg: '#f1f5f9', color: '#64748b' };
  return (
    <span style={{ padding: '4px 14px', borderRadius: '9999px', fontSize: '12px', fontWeight: 700, background: style.bg, color: style.color, textTransform: 'uppercase', letterSpacing: '0.4px', display: 'inline-block' }}>
      {status}
    </span>
  );
}

export default function LoginAttemptViewModal({ attempt, onClose }) {
  if (!attempt) return null;

  return (
    <div
      style={{ position: 'fixed', inset: 0, background: 'rgba(15,23,42,0.55)', backdropFilter: 'blur(3px)', zIndex: 2000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px', animation: 'fadeIn 0.2s ease' }}
      onClick={onClose}
    >
      <style>{`
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes slideUp { from { opacity: 0; transform: translateY(24px) scale(0.97); } to { opacity: 1; transform: translateY(0) scale(1); } }
      `}</style>
      <div
        onClick={e => e.stopPropagation()}
        style={{ background: '#fff', borderRadius: '16px', boxShadow: '0 25px 50px rgba(15,23,42,0.18)', width: '100%', maxWidth: '620px', maxHeight: '90vh', overflow: 'auto', animation: 'slideUp 0.25s cubic-bezier(0.4,0,0.2,1)' }}
      >
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '20px 24px', borderBottom: '1px solid var(--materio-border)', background: '#fff', position: 'sticky', top: 0, zIndex: 10 }}>
          <div>
            <div style={{ fontSize: '16px', fontWeight: 700, color: 'var(--materio-text-main)' }}>Login Attempt Details</div>
            <div style={{ fontSize: '12px', color: 'var(--materio-text-muted)', marginTop: '2px' }}>{attempt.id} · {attempt.userName}</div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <AttemptBadge status={attempt.attemptStatus} />
            <button onClick={onClose} style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: 'var(--materio-text-muted)', padding: '4px', borderRadius: '6px', display: 'flex', alignItems: 'center' }} onMouseEnter={e => e.currentTarget.style.background = '#f1f5f9'} onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Status Banner */}
        <div style={{ margin: '20px 24px 0', padding: '14px 18px', borderRadius: '10px', background: attempt.attemptStatus === 'Success' ? '#E8FADF' : attempt.attemptStatus === 'Blocked' ? '#FFE0DB' : attempt.attemptStatus === 'OTP Expired' ? '#FFF2D6' : '#FFE0DB', display: 'flex', alignItems: 'center', gap: '10px' }}>
          <Activity size={16} color={attempt.attemptStatus === 'Success' ? '#71DD37' : attempt.attemptStatus === 'OTP Expired' ? '#FFAB00' : '#FF3E1D'} />
          <div>
            <div style={{ fontSize: '13px', fontWeight: 700, color: attempt.attemptStatus === 'Success' ? '#71DD37' : attempt.attemptStatus === 'OTP Expired' ? '#FFAB00' : '#FF3E1D' }}>
              {attempt.attemptStatus === 'Success' ? 'Login was successful' : attempt.attemptStatus === 'Blocked' ? 'Account blocked due to repeated failures' : attempt.attemptStatus === 'OTP Expired' ? 'OTP expired before use' : 'Login attempt failed'}
            </div>
            <div style={{ fontSize: '12px', color: '#64748b', marginTop: '2px' }}>{attempt.attemptDateTime}</div>
          </div>
        </div>

        {/* Body */}
        <div style={{ padding: '20px 24px' }}>
          {/* User Info */}
          <div style={{ fontSize: '11px', fontWeight: 700, color: 'var(--materio-primary)', textTransform: 'uppercase', letterSpacing: '0.6px', marginBottom: '10px', paddingBottom: '6px', borderBottom: '2px solid var(--materio-primary)' }}>User Information</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '20px' }}>
            <InfoRow label="User Name" value={attempt.userName} />
            <InfoRow label="Mobile Number" value={attempt.mobileNumber} />
            <InfoRow label="Attempt Status" value={<AttemptBadge status={attempt.attemptStatus} />} />
            <InfoRow label="OTP Attempt Count" value={`${attempt.attemptStatus === 'Failed' ? 0 : attempt.otpAttemptCount} attempt(s)`} />
          </div>

          {/* Device Info */}
          <div style={{ fontSize: '11px', fontWeight: 700, color: 'var(--materio-primary)', textTransform: 'uppercase', letterSpacing: '0.6px', marginBottom: '10px', paddingBottom: '6px', borderBottom: '2px solid var(--materio-primary)' }}>Device Information</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '20px' }}>
            <InfoRow label="Device Type" value={attempt.deviceType} />
            <InfoRow label="Device ID" value={attempt.deviceId} />
            <InfoRow label="Browser" value={attempt.browser} />
            <InfoRow label="Operating System" value={attempt.os} />
            <InfoRow label="Active Device" value={
              attempt.activeDevice
                ? <span style={{ color: '#71DD37', fontWeight: 700 }}>✓ Active</span>
                : <span style={{ color: '#FF3E1D', fontWeight: 700 }}>✗ Not Active</span>
            } />
            <InfoRow label="Network Type" value={attempt.networkType} />
          </div>

          {/* Network Info */}
          <div style={{ fontSize: '11px', fontWeight: 700, color: 'var(--materio-primary)', textTransform: 'uppercase', letterSpacing: '0.6px', marginBottom: '10px', paddingBottom: '6px', borderBottom: '2px solid var(--materio-primary)' }}>Network & Location</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
            <InfoRow label="IP Address" value={attempt.ipAddress} />
            <InfoRow label="Device Location" value={attempt.deviceLocation} />
            <InfoRow label="Date & Time" value={attempt.attemptDateTime} />
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
