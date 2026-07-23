import React, { useState, useEffect } from 'react';
import { X, Save, User, Activity, Smartphone } from 'lucide-react';

export default function LoginAttemptEditModal({ attempt, isOpen, onClose, onSave }) {
  const [formData, setFormData] = useState({
    userName: '',
    mobileNumber: '',
    attemptStatus: 'Success',
    otpAttemptCount: 1,
    deviceType: '',
    deviceLocation: '',
    ipAddress: ''
  });

  useEffect(() => {
    if (attempt) {
      setFormData({
        userName: attempt.userName || '',
        mobileNumber: attempt.mobileNumber || '',
        attemptStatus: attempt.attemptStatus || 'Success',
        otpAttemptCount: attempt.otpAttemptCount || 1,
        deviceType: attempt.deviceType || '',
        deviceLocation: attempt.deviceLocation || '',
        ipAddress: attempt.ipAddress || ''
      });
    }
  }, [attempt]);

  if (!isOpen || !attempt) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({
      ...attempt,
      ...formData,
      otpAttemptCount: Number(formData.otpAttemptCount)
    });
  };

  return (
    <div
      style={{
        position: 'fixed', inset: 0, background: 'rgba(15,23,42,0.55)',
        backdropFilter: 'blur(3px)', zIndex: 2000, display: 'flex',
        alignItems: 'center', justifyContent: 'center', padding: '24px',
        animation: 'fadeIn 0.2s ease'
      }}
      onClick={onClose}
    >
      <style>{`
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes slideUp { from { opacity: 0; transform: translateY(24px) scale(0.97); } to { opacity: 1; transform: translateY(0) scale(1); } }
      `}</style>

      <div
        onClick={e => e.stopPropagation()}
        style={{
          background: '#fff', borderRadius: '16px',
          boxShadow: '0 25px 50px rgba(15,23,42,0.18)', width: '100%',
          maxWidth: '600px', maxHeight: '90vh', overflow: 'auto',
          animation: 'slideUp 0.25s cubic-bezier(0.4,0,0.2,1)'
        }}
      >
        {/* Header */}
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '20px 24px', borderBottom: '1px solid #e2e8f0',
          position: 'sticky', top: 0, background: '#fff', zIndex: 10
        }}>
          <div>
            <div style={{ fontSize: '17px', fontWeight: 700, color: '#0f172a' }}>Edit Login Attempt</div>
            <div style={{ fontSize: '12px', color: '#64748b', marginTop: '2px' }}>
              Attempt ID: {attempt.id} · {attempt.attemptDateTime}
            </div>
          </div>
          <button
            onClick={onClose}
            style={{
              background: 'transparent', border: 'none', cursor: 'pointer',
              color: '#64748b', padding: '6px', borderRadius: '6px',
              display: 'flex', alignItems: 'center'
            }}
            onMouseEnter={e => e.currentTarget.style.background = '#f1f5f9'}
            onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
          >
            <X size={18} />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} style={{ padding: '24px' }}>
          
          <div style={{ marginBottom: '20px' }}>
            <div style={{ fontSize: '12px', fontWeight: 700, color: '#2563eb', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <User size={14} /> Attempt Details
            </div>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#475569', marginBottom: '6px' }}>User Name</label>
                <input
                  type="text"
                  name="userName"
                  value={formData.userName}
                  onChange={handleChange}
                  required
                  style={{ width: '100%', padding: '8px 12px', border: '1px solid #cbd5e1', borderRadius: '6px', fontSize: '13px', outline: 'none' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#475569', marginBottom: '6px' }}>Mobile Number</label>
                <input
                  type="text"
                  name="mobileNumber"
                  value={formData.mobileNumber}
                  onChange={handleChange}
                  required
                  style={{ width: '100%', padding: '8px 12px', border: '1px solid #cbd5e1', borderRadius: '6px', fontSize: '13px', outline: 'none' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#475569', marginBottom: '6px' }}>Attempt Status</label>
                <select
                  name="attemptStatus"
                  value={formData.attemptStatus}
                  onChange={handleChange}
                  style={{ width: '100%', padding: '8px 12px', border: '1px solid #cbd5e1', borderRadius: '6px', fontSize: '13px', outline: 'none', background: '#fff' }}
                >
                  <option value="Success">Success</option>
                  <option value="Failed">Failed</option>
                  <option value="Blocked">Blocked</option>
                  <option value="OTP Expired">OTP Expired</option>
                  <option value="Pending">Pending</option>
                </select>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#475569', marginBottom: '6px' }}>OTP Attempt Count</label>
                <input
                  type="number"
                  name="otpAttemptCount"
                  value={formData.otpAttemptCount}
                  onChange={handleChange}
                  min="0"
                  max="10"
                  required
                  style={{ width: '100%', padding: '8px 12px', border: '1px solid #cbd5e1', borderRadius: '6px', fontSize: '13px', outline: 'none' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#475569', marginBottom: '6px' }}>Device Type</label>
                <input
                  type="text"
                  name="deviceType"
                  value={formData.deviceType}
                  onChange={handleChange}
                  style={{ width: '100%', padding: '8px 12px', border: '1px solid #cbd5e1', borderRadius: '6px', fontSize: '13px', outline: 'none' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#475569', marginBottom: '6px' }}>IP Address</label>
                <input
                  type="text"
                  name="ipAddress"
                  value={formData.ipAddress}
                  onChange={handleChange}
                  style={{ width: '100%', padding: '8px 12px', border: '1px solid #cbd5e1', borderRadius: '6px', fontSize: '13px', outline: 'none' }}
                />
              </div>

              <div style={{ gridColumn: '1 / -1' }}>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#475569', marginBottom: '6px' }}>Device Location</label>
                <input
                  type="text"
                  name="deviceLocation"
                  value={formData.deviceLocation}
                  onChange={handleChange}
                  style={{ width: '100%', padding: '8px 12px', border: '1px solid #cbd5e1', borderRadius: '6px', fontSize: '13px', outline: 'none' }}
                />
              </div>
            </div>
          </div>

          {/* Footer Buttons */}
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', paddingTop: '16px', borderTop: '1px solid #e2e8f0' }}>
            <button
              type="button"
              onClick={onClose}
              style={{
                padding: '9px 20px', borderRadius: '6px', border: '1px solid #cbd5e1',
                background: '#fff', color: '#475569', fontSize: '13px', fontWeight: 600,
                cursor: 'pointer'
              }}
            >
              Cancel
            </button>
            <button
              type="submit"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '6px',
                padding: '9px 22px', borderRadius: '6px', border: 'none',
                background: '#2563eb', color: '#fff', fontSize: '13px', fontWeight: 600,
                cursor: 'pointer'
              }}
            >
              <Save size={15} /> Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
