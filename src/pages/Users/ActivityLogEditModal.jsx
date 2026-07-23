import React, { useState, useEffect } from 'react';
import { X, Save, User, Activity } from 'lucide-react';

export default function ActivityLogEditModal({ log, isOpen, onClose, onSave }) {
  const [formData, setFormData] = useState({
    userName: '',
    userType: '',
    mobileNumber: '',
    moduleName: '',
    activityType: '',
    description: '',
    status: 'Success',
    oldValue: '',
    newValue: ''
  });

  useEffect(() => {
    if (log) {
      setFormData({
        userName: log.userName || '',
        userType: log.userType || '',
        mobileNumber: log.mobileNumber || '',
        moduleName: log.moduleName || '',
        activityType: log.activityType || '',
        description: log.description || log.actionPerformed || '',
        status: log.status || 'Success',
        oldValue: log.oldValue || '',
        newValue: log.newValue || ''
      });
    }
  }, [log]);

  if (!isOpen || !log) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({
      ...log,
      ...formData
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
        .act-edit-modal::-webkit-scrollbar { width: 5px; }
        .act-edit-modal::-webkit-scrollbar-thumb { background: #e2e8f0; border-radius: 10px; }
      `}</style>

      <div
        className="act-edit-modal"
        onClick={e => e.stopPropagation()}
        style={{
          background: '#fff', borderRadius: '16px',
          boxShadow: '0 25px 50px rgba(15,23,42,0.18)', width: '100%',
          maxWidth: '650px', maxHeight: '90vh', overflow: 'auto',
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
            <div style={{ fontSize: '17px', fontWeight: 700, color: '#0f172a' }}>Edit Activity Log</div>
            <div style={{ fontSize: '12px', color: '#64748b', marginTop: '2px' }}>
              Log ID: {log.id} · {log.dateTime}
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
          
          {/* User Info Section */}
          <div style={{ marginBottom: '20px' }}>
            <div style={{ fontSize: '12px', fontWeight: 700, color: '#2563eb', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <User size={14} /> User Information
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
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#475569', marginBottom: '6px' }}>User Type</label>
                <select
                  name="userType"
                  value={formData.userType}
                  onChange={handleChange}
                  style={{ width: '100%', padding: '8px 12px', border: '1px solid #cbd5e1', borderRadius: '6px', fontSize: '13px', outline: 'none', background: '#fff' }}
                >
                  <option value="Customer">Customer</option>
                  <option value="Service Provider">Service Provider</option>
                  <option value="Seller">Seller</option>
                  <option value="Franchise">Franchise</option>
                  <option value="Admin">Admin</option>
                </select>
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
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#475569', marginBottom: '6px' }}>Status</label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  style={{ width: '100%', padding: '8px 12px', border: '1px solid #cbd5e1', borderRadius: '6px', fontSize: '13px', outline: 'none', background: '#fff' }}
                >
                  <option value="Success">Success</option>
                  <option value="Failed">Failed</option>
                  <option value="Pending">Pending</option>
                </select>
              </div>
            </div>
          </div>

          {/* Activity Info Section */}
          <div style={{ marginBottom: '20px' }}>
            <div style={{ fontSize: '12px', fontWeight: 700, color: '#2563eb', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Activity size={14} /> Activity Details
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#475569', marginBottom: '6px' }}>Activity Module</label>
                <select
                  name="moduleName"
                  value={formData.moduleName}
                  onChange={handleChange}
                  style={{ width: '100%', padding: '8px 12px', border: '1px solid #cbd5e1', borderRadius: '6px', fontSize: '13px', outline: 'none', background: '#fff' }}
                >
                  {['Bookings', 'Quotations', 'Orders', 'Material Request', 'Inventory', 'Payments', 'Profile', 'User Management', 'Login'].map(m => (
                    <option key={m} value={m}>{m}</option>
                  ))}
                </select>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#475569', marginBottom: '6px' }}>Activity Type</label>
                <select
                  name="activityType"
                  value={formData.activityType}
                  onChange={handleChange}
                  style={{ width: '100%', padding: '8px 12px', border: '1px solid #cbd5e1', borderRadius: '6px', fontSize: '13px', outline: 'none', background: '#fff' }}
                >
                  {['Create', 'Submit', 'Update Status', 'Update', 'Payment', 'Cancel', 'Suspend', 'Login'].map(t => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
              </div>

              <div style={{ gridColumn: '1 / -1' }}>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#475569', marginBottom: '6px' }}>Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows={2}
                  required
                  style={{ width: '100%', padding: '8px 12px', border: '1px solid #cbd5e1', borderRadius: '6px', fontSize: '13px', outline: 'none', resize: 'vertical' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#475569', marginBottom: '6px' }}>Old Value</label>
                <input
                  type="text"
                  name="oldValue"
                  value={formData.oldValue}
                  onChange={handleChange}
                  style={{ width: '100%', padding: '8px 12px', border: '1px solid #cbd5e1', borderRadius: '6px', fontSize: '13px', outline: 'none' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#475569', marginBottom: '6px' }}>New Value</label>
                <input
                  type="text"
                  name="newValue"
                  value={formData.newValue}
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
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
