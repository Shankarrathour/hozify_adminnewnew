import React, { useState } from 'react';
import AdminShell from '../../components/layouts/AdminShell';
import { useApp } from '../../hooks/useApp';
import { useToast } from '../../components/common/ToastNotification';
import { 
  User, Mail, Phone, Shield, Camera, Key, CheckCircle, ShieldAlert,
  Clock, ShieldCheck, Activity, LogOut, Terminal, MapPin, Eye, FileText,
  TrendingUp, TrendingDown, AlertCircle, Edit2
} from 'lucide-react';

export default function MyProfile() {
  const { session, navigate } = useApp();
  const { addToast } = useToast();

  const [activeSubTab, setActiveSubTab] = useState('personal'); // personal, account, activity
  const [tfaEnabled, setTfaEnabled] = useState(true);

  const userName = session?.user?.name || 'Alex Sterling';
  const email = session?.user?.email || 'alex.sterling@hozify.com';
  const roleLabel = session?.user?.roleLabel || 'System Administrator';

  // Personal Info Form State
  const [personalInfo, setPersonalInfo] = useState({
    fullName: userName,
    username: 'alex_sterling_super',
    email: email,
    mobile: '+91 98765 43210',
    empId: 'EMP-2026-908',
    department: 'Platform Security & Operations',
    designation: 'Principal Operations Lead',
    role: roleLabel,
    status: 'Active',
    joiningDate: '2025-01-10',
    lastLogin: '2026-06-27 10:14 AM'
  });

  const [isEditing, setIsEditing] = useState(false);
  const [tempInfo, setTempInfo] = useState({ ...personalInfo });

  const handleSavePersonalInfo = (e) => {
    e.preventDefault();
    setPersonalInfo({ ...tempInfo });
    setIsEditing(false);
    addToast('Personal information updated successfully!', 'success');
  };

  const handleTfaToggle = () => {
    setTfaEnabled(!tfaEnabled);
    addToast(`2FA has been ${!tfaEnabled ? 'Enabled' : 'Disabled'}!`, 'success');
  };

  const handleLogoutAllDevices = () => {
    addToast('Terminating all other active sessions...', 'info');
    setTimeout(() => {
      addToast('All other active sessions terminated successfully.', 'success');
    }, 1000);
  };

  const recentActivities = [
    { id: 1, action: 'User login success', ip: '192.168.1.104', device: 'Chrome / Windows 11', time: '2026-06-27 10:14 AM', type: 'security' },
    { id: 2, action: 'Modified commissions multiplier in Platform Fee Mgmt', ip: '192.168.1.104', device: 'Chrome / Windows 11', time: '2026-06-26 04:30 PM', type: 'action' },
    { id: 3, action: 'Approved partner request for BSP Delhi Goods', ip: '192.168.1.104', device: 'Chrome / Windows 11', time: '2026-06-26 11:20 AM', type: 'action' },
    { id: 4, action: '2FA authentication challenge success', ip: '192.168.1.102', device: 'Safari / iPhone 15 Pro', time: '2026-06-25 09:00 AM', type: 'security' }
  ];

  return (
    <AdminShell showGlobalExport={true} activeTab="Profile" headerTitle="My Profile Console">
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-section)', paddingBottom: '40px', maxWidth: '1200px', margin: '0 auto' }}>
        
        {/* Breadcrumb */}
        <div style={{ fontSize: '12px', color: 'var(--muted)', fontWeight: '600' }}>
          Profile &gt; <span style={{ color: '#2A2454' }}>My Profile</span>
        </div>

        {/* Profile Card Header */}
        <div className="report-kpi-card" style={{ display: 'flex', gap: 'var(--spacing-section)', alignItems: 'center', background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)', borderRadius: '12px', padding: 'var(--spacing-section)', color: '#fff', width: '100%' }}>
          <div style={{ position: 'relative' }}>
            <img 
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&h=120&q=80" 
              alt={userName}
              style={{ width: '100px', height: '100px', borderRadius: '50%', border: '4px solid rgba(255,255,255,0.1)', objectFit: 'cover' }}
            />
            <span style={{ position: 'absolute', bottom: '2px', right: '4px', width: '14px', height: '14px', background: '#22c55e', border: '2px solid #0f172a', borderRadius: '50%' }} />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <h1 style={{ fontSize: '22px', fontWeight: '800', margin: 0 }}>{personalInfo.fullName}</h1>
              <span style={{ fontSize: '10px', fontWeight: '800', background: '#3b82f6', color: '#fff', padding: '3px 8px', borderRadius: '4px', textTransform: 'uppercase' }}>
                {personalInfo.role}
              </span>
            </div>
            <p style={{ margin: 0, fontSize: '13px', color: '#94a3b8' }}>{personalInfo.email} • {personalInfo.designation}</p>
            <p style={{ margin: 0, fontSize: '12px', color: '#64748b' }}>Employee ID: {personalInfo.empId}</p>
          </div>
        </div>

        {/* Tab Selector Links */}
        <div style={{ display: 'flex', borderBottom: '1.5px solid #25108f', gap: 'var(--spacing-section)', paddingBottom: '4px' }}>
          <button 
            onClick={() => setActiveSubTab('personal')}
            style={{ border: 'none', background: 'none', padding: '8px 4px', fontSize: '13px', fontWeight: '700', color: activeSubTab === 'personal' ? '#2563eb' : 'var(--muted)', borderBottom: activeSubTab === 'personal' ? '2px solid #2563eb' : 'none', cursor: 'pointer' }}
          >
            Personal Information
          </button>
          <button 
            onClick={() => setActiveSubTab('account')}
            style={{ border: 'none', background: 'none', padding: '8px 4px', fontSize: '13px', fontWeight: '700', color: activeSubTab === 'account' ? '#2563eb' : 'var(--muted)', borderBottom: activeSubTab === 'account' ? '2px solid #2563eb' : 'none', cursor: 'pointer' }}
          >
            Account & Security
          </button>
          <button 
            onClick={() => setActiveSubTab('activity')}
            style={{ border: 'none', background: 'none', padding: '8px 4px', fontSize: '13px', fontWeight: '700', color: activeSubTab === 'activity' ? '#2563eb' : 'var(--muted)', borderBottom: activeSubTab === 'activity' ? '2px solid #2563eb' : 'none', cursor: 'pointer' }}
          >
            Activity Logs
          </button>
        </div>

        {/* TAB 1: PERSONAL INFORMATION */}
        {activeSubTab === 'personal' && (
          <div style={{ background: '#fff', border: '1.5px solid #25108f', borderRadius: '12px', padding: 'var(--spacing-section)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h2 style={{ fontSize: '15px', fontWeight: '800', margin: 0, color: 'var(--text)' }}>Personal Information Details</h2>
              {!isEditing ? (
                <button onClick={() => { setTempInfo({ ...personalInfo }); setIsEditing(true); }} className="custom-btn-secondary" style={{ height: '32px', padding: '0 12px', fontSize: '12px' }}>
                  <Edit2 size={12} style={{ marginRight: '6px' }} /> Edit Info
                </button>
              ) : (
                <div style={{ display: 'flex', gap: '8px' }}>
                  <button onClick={() => setIsEditing(false)} className="custom-btn-secondary" style={{ height: '32px', padding: '0 12px', fontSize: '12px' }}>
                    Cancel
                  </button>
                  <button onClick={handleSavePersonalInfo} className="custom-btn-primary" style={{ height: '32px', padding: '0 12px', fontSize: '12px' }}>
                    Save
                  </button>
                </div>
              )}
            </div>

            <form onSubmit={handleSavePersonalInfo} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '11px', fontWeight: '800', color: 'var(--text)', textTransform: 'uppercase', marginBottom: '6px' }}>Full Name</label>
                <input 
                  type="text" 
                  disabled={!isEditing}
                  value={isEditing ? tempInfo.fullName : personalInfo.fullName}
                  onChange={(e) => setTempInfo({ ...tempInfo, fullName: e.target.value })}
                  style={{ width: '100%', padding: '8px 12px', border: '1.5px solid #25108f', borderRadius: '6px', fontSize: '13px', background: isEditing ? '#fff' : '#f8fafc' }}
                />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '11px', fontWeight: '800', color: 'var(--text)', textTransform: 'uppercase', marginBottom: '6px' }}>Username</label>
                <input 
                  type="text" 
                  disabled={!isEditing}
                  value={isEditing ? tempInfo.username : personalInfo.username}
                  onChange={(e) => setTempInfo({ ...tempInfo, username: e.target.value })}
                  style={{ width: '100%', padding: '8px 12px', border: '1.5px solid #25108f', borderRadius: '6px', fontSize: '13px', background: isEditing ? '#fff' : '#f8fafc' }}
                />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '11px', fontWeight: '800', color: 'var(--text)', textTransform: 'uppercase', marginBottom: '6px' }}>Email Address</label>
                <input 
                  type="email" 
                  disabled={!isEditing}
                  value={isEditing ? tempInfo.email : personalInfo.email}
                  onChange={(e) => setTempInfo({ ...tempInfo, email: e.target.value })}
                  style={{ width: '100%', padding: '8px 12px', border: '1.5px solid #25108f', borderRadius: '6px', fontSize: '13px', background: isEditing ? '#fff' : '#f8fafc' }}
                />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '11px', fontWeight: '800', color: 'var(--text)', textTransform: 'uppercase', marginBottom: '6px' }}>Mobile Number</label>
                <input 
                  type="text" 
                  disabled={!isEditing}
                  value={isEditing ? tempInfo.mobile : personalInfo.mobile}
                  onChange={(e) => setTempInfo({ ...tempInfo, mobile: e.target.value })}
                  style={{ width: '100%', padding: '8px 12px', border: '1.5px solid #25108f', borderRadius: '6px', fontSize: '13px', background: isEditing ? '#fff' : '#f8fafc' }}
                />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '11px', fontWeight: '800', color: 'var(--text)', textTransform: 'uppercase', marginBottom: '6px' }}>Department</label>
                <input 
                  type="text" 
                  disabled={true}
                  value={personalInfo.department}
                  style={{ width: '100%', padding: '8px 12px', border: '1.5px solid #25108f', borderRadius: '6px', fontSize: '13px', background: '#f8fafc', color: 'var(--muted)' }}
                />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '11px', fontWeight: '800', color: 'var(--text)', textTransform: 'uppercase', marginBottom: '6px' }}>Designation</label>
                <input 
                  type="text" 
                  disabled={true}
                  value={personalInfo.designation}
                  style={{ width: '100%', padding: '8px 12px', border: '1.5px solid #25108f', borderRadius: '6px', fontSize: '13px', background: '#f8fafc', color: 'var(--muted)' }}
                />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '11px', fontWeight: '800', color: 'var(--text)', textTransform: 'uppercase', marginBottom: '6px' }}>Joining Date</label>
                <input 
                  type="text" 
                  disabled={true}
                  value={personalInfo.joiningDate}
                  style={{ width: '100%', padding: '8px 12px', border: '1.5px solid #25108f', borderRadius: '6px', fontSize: '13px', background: '#f8fafc', color: 'var(--muted)' }}
                />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '11px', fontWeight: '800', color: 'var(--text)', textTransform: 'uppercase', marginBottom: '6px' }}>Last Login</label>
                <input 
                  type="text" 
                  disabled={true}
                  value={personalInfo.lastLogin}
                  style={{ width: '100%', padding: '8px 12px', border: '1.5px solid #25108f', borderRadius: '6px', fontSize: '13px', background: '#f8fafc', color: 'var(--muted)' }}
                />
              </div>
            </form>
          </div>
        )}

        {/* TAB 2: ACCOUNT & SECURITY */}
        {activeSubTab === 'account' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-section)' }}>
            
            {/* Account Specs */}
            <div style={{ background: '#fff', border: '1.5px solid #25108f', borderRadius: '12px', padding: 'var(--spacing-section)' }}>
              <h3 style={{ fontSize: '15px', fontWeight: '800', color: 'var(--text)', margin: '0 0 16px' }}>Account Properties</h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
                <div>
                  <span style={{ fontSize: '11px', color: 'var(--muted)', display: 'block', marginBottom: '2px' }}>Secure Account UID</span>
                  <strong style={{ fontSize: '13px', color: 'var(--text)' }}>UID-2026-X88402</strong>
                </div>
                <div>
                  <span style={{ fontSize: '11px', color: 'var(--muted)', display: 'block', marginBottom: '2px' }}>Operational Status</span>
                  <strong style={{ fontSize: '13px', color: '#10b981', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <CheckCircle size={14} /> Active
                  </strong>
                </div>
                <div>
                  <span style={{ fontSize: '11px', color: 'var(--muted)', display: 'block', marginBottom: '2px' }}>Password Last Changed</span>
                  <strong style={{ fontSize: '13px', color: 'var(--text)' }}>24 Days Ago</strong>
                </div>
                <div>
                  <span style={{ fontSize: '11px', color: 'var(--muted)', display: 'block', marginBottom: '2px' }}>Two Factor Auth (2FA)</span>
                  <strong style={{ fontSize: '13px', color: tfaEnabled ? '#10b981' : '#ef4444' }}>
                    {tfaEnabled ? 'Enabled' : 'Disabled'}
                  </strong>
                </div>
              </div>
            </div>

            {/* Security Config Buttons */}
            <div style={{ background: '#fff', border: '1.5px solid #25108f', borderRadius: '12px', padding: 'var(--spacing-section)', display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <h3 style={{ fontSize: '15px', fontWeight: '800', color: 'var(--text)', margin: 0 }}>Security Control CenterCenter</h3>
              
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1.5px solid #25108f', paddingBottom: '16px' }}>
                <div>
                  <strong style={{ fontSize: '14px', color: 'var(--text)', display: 'block' }}>Change System Password</strong>
                  <span style={{ fontSize: '12px', color: 'var(--muted)' }}>Regularly updating your password prevents unauthorized platform access.</span>
                </div>
                <button onClick={() => navigate('/settings/change-password')} className="custom-btn-secondary">
                  <Key size={14} style={{ marginRight: '6px' }} /> Update Password
                </button>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1.5px solid #25108f', paddingBottom: '16px' }}>
                <div>
                  <strong style={{ fontSize: '14px', color: 'var(--text)', display: 'block' }}>Two-Factor Authentication (2FA)</strong>
                  <span style={{ fontSize: '12px', color: 'var(--muted)' }}>Adds an additional security layer requiring a dynamic authenticator OTP on login.</span>
                </div>
                <button 
                  onClick={handleTfaToggle} 
                  className="custom-btn-secondary"
                  style={{ borderColor: tfaEnabled ? '#ef4444' : '#10b981', color: tfaEnabled ? '#ef4444' : '#10b981' }}
                >
                  {tfaEnabled ? 'Disable 2FA' : 'Enable 2FA'}
                </button>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <strong style={{ fontSize: '14px', color: 'var(--text)', display: 'block' }}>Terminate Sessions on All Other Devices</strong>
                  <span style={{ fontSize: '12px', color: 'var(--muted)' }}>Logs out of all active web and mobile client sessions except this device.</span>
                </div>
                <button onClick={handleLogoutAllDevices} className="custom-btn-primary" style={{ background: '#dc2626', borderColor: '#dc2626' }}>
                  <LogOut size={14} style={{ marginRight: '6px' }} /> Logout All Devices
                </button>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: ACTIVITY LOGS */}
        {activeSubTab === 'activity' && (
          <div style={{ background: '#fff', border: '1.5px solid #25108f', borderRadius: '12px', padding: 'var(--spacing-section)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h3 style={{ fontSize: '15px', fontWeight: '800', color: 'var(--text)', margin: 0 }}>Recent Security &amp; Activity Log</h3>
              <button onClick={() => navigate('/profile/activity-log')} className="custom-btn-secondary" style={{ height: '32px', padding: '0 12px', fontSize: '12px' }}>
                <Terminal size={12} style={{ marginRight: '6px' }} /> Open Audit Center
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {recentActivities.map((act) => (
                <div key={act.id} style={{ display: 'flex', alignItems: 'flex-start', gap: '14px', borderBottom: '1.5px solid #25108f', paddingBottom: '12px' }}>
                  <div style={{ padding: '8px', borderRadius: '8px', background: act.type === 'security' ? '#fee2e2' : '#e0e7ff', color: act.type === 'security' ? '#ef4444' : '#4f46e5' }}>
                    {act.type === 'security' ? <ShieldAlert size={16} /> : <Activity size={16} />}
                  </div>
                  <div style={{ flex: 1 }}>
                    <strong style={{ display: 'block', fontSize: '13px', color: 'var(--text)' }}>{act.action}</strong>
                    <span style={{ fontSize: '12px', color: 'var(--muted)' }}>IP: {act.ip} • Device: {act.device}</span>
                  </div>
                  <span style={{ fontSize: '12px', color: 'var(--muted)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <Clock size={12} /> {act.time}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </AdminShell>
  );
}


