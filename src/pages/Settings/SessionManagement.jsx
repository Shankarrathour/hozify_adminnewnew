import React, { useState } from 'react';
import { 
  ShieldCheck, ArrowUpRight, Globe,
  Laptop, Smartphone, Monitor, Shield, ArrowRight, Loader2
} from 'lucide-react';
import AdminShell from '../../components/layouts/AdminShell';
import { useToast } from '../../components/common/ToastNotification';
import Toggle from '../../components/common/Toggle';
import Select from "../../components/ui/Select";

const INITIAL_LIVE_SESSIONS = [
  { id: 1, initials: 'JD', name: 'jane.doe@hozify.com', role: 'Regional Manager', bg: '#dbeafe', color: '#1e40af', ip: '192.168.1.105', device: 'macOS Ventura', icon: 'Laptop', lastActive: 'Just now' },
  { id: 2, initials: 'AS', name: 'a.smith@hozify.com', role: 'Compliance Officer', bg: '#451a03', color: '#fff', ip: '45.23.11.89', device: 'iOS 17.4', icon: 'Smartphone', lastActive: '12 mins ago' },
  { id: 3, initials: 'RK', name: 'r.kumar@hozify.com', role: 'Lead Developer', bg: '#1e1b4b', color: '#fff', ip: '102.45.2.14', device: 'Windows 11', icon: 'Monitor', lastActive: '34 mins ago' },
  { id: 4, initials: 'ML', name: 'm.lee@hozify.com', role: 'Marketing Lead', bg: '#e2e8f0', color: '#475569', ip: '88.2.141.5', device: 'Ubuntu Linux', icon: 'Monitor', lastActive: '1 hour ago' },
];

export default function SessionManagement() {
  const { addToast } = useToast();

  const [idleTimeout, setIdleTimeout] = useState('30');
  const [concurrentLimits, setConcurrentLimits] = useState('3 Devices');
  const [enforceMfa, setEnforceMfa] = useState(true);
  
  const [isUpdatingPolicy, setIsUpdatingPolicy] = useState(false);
  const [isRevokingAll, setIsRevokingAll] = useState(false);
  
  const [sessions, setSessions] = useState(INITIAL_LIVE_SESSIONS);

  const handleUpdatePolicy = () => {
    setIsUpdatingPolicy(true);
    setTimeout(() => {
      setIsUpdatingPolicy(false);
      addToast("Security policy updated successfully.", "success");
    }, 1000);
  };

  const handleRevokeSingle = (id) => {
    setSessions(prev => prev.filter(s => s.id !== id));
    addToast("Session revoked.", "success");
  };

  const handleRevokeAll = () => {
    setIsRevokingAll(true);
    setTimeout(() => {
      setSessions([]);
      setIsRevokingAll(false);
      addToast("All live sessions have been revoked.", "success");
    }, 1200);
  };

  const handleExport = () => {
    addToast("Session logs exported to CSV.", "info");
  };

  const getDeviceIcon = (iconName) => {
    switch (iconName) {
      case 'Laptop': return <Laptop size={14} color="#64748b" />;
      case 'Smartphone': return <Smartphone size={14} color="#64748b" />;
      case 'Monitor': return <Monitor size={14} color="#64748b" />;
      default: return <Monitor size={14} color="#64748b" />;
    }
  };

  return (
    <AdminShell
      activeTab="Settings"
      customProfileName="Alex Rivera"
      customProfileRole="Admin User"
      showGridIcon={true}
    >
      <div style={{ padding: '32px 40px 60px', maxWidth: '1200px' }}>
        
        {/* Top Section: Metrics + Banner (Left) and Policy (Right) */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: 'var(--spacing-section)', alignItems: 'start', marginBottom: '24px' }}>
          
          {/* Left Column */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-section)' }}>
            
            {/* Top Metrics Row */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 'var(--spacing-section)' }}>
              {/* Metric 1 */}
              <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: '12px', padding: 'var(--spacing-section)', boxShadow: '0 1px 3px rgba(0,0,0,0.02)', transition: 'all 0.3s' }}>
                <span style={{ display: 'block', fontSize: '10px', fontWeight: '800', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '12px' }}>ACTIVE SESSIONS</span>
                <div style={{ fontSize: '36px', fontWeight: '800', color: '#0f172a', marginBottom: '16px', lineHeight: '1', letterSpacing: '-1px' }}>
                  {138 + sessions.length}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#16a34a', fontSize: '11px', fontWeight: '800' }}>
                  <ArrowUpRight size={14} /> +12% vs last hour
                </div>
              </div>

              {/* Metric 2 */}
              <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: '12px', padding: 'var(--spacing-section)', boxShadow: '0 1px 3px rgba(0,0,0,0.02)' }}>
                <span style={{ display: 'block', fontSize: '10px', fontWeight: '800', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '12px' }}>UNIQUE IPS</span>
                <div style={{ fontSize: '36px', fontWeight: '800', color: '#0f172a', marginBottom: '16px', lineHeight: '1', letterSpacing: '-1px' }}>89</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#475569', fontSize: '11px', fontWeight: '700' }}>
                  <Globe size={14} /> Global distribution
                </div>
              </div>

              {/* Metric 3 */}
              <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: '12px', padding: 'var(--spacing-section)', boxShadow: '0 1px 3px rgba(0,0,0,0.02)' }}>
                <span style={{ display: 'block', fontSize: '10px', fontWeight: '800', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '12px' }}>SYSTEM STATUS</span>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '22px', lineHeight: '1' }}>
                  <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#16a34a' }}></span>
                  <span style={{ fontSize: '20px', fontWeight: '800', color: '#16a34a', letterSpacing: '-0.5px' }}>Compliant</span>
                </div>
                <div style={{ color: '#475569', fontSize: '11px', fontWeight: '600' }}>
                  Last audit: 4 mins ago
                </div>
              </div>
            </div>

            {/* Graphic Banner */}
            <div style={{ 
              background: 'linear-gradient(135deg, #e2e8f0 0%, #cbd5e1 50%, #312e81 100%)', 
              borderRadius: '12px', 
              padding: 'var(--spacing-page)', 
              height: '180px', 
              display: 'flex', 
              flexDirection: 'column', 
              justifyContent: 'flex-end',
              position: 'relative',
              overflow: 'hidden',
              boxShadow: 'inset 0 0 0 1px rgba(0,0,0,0.05)'
            }}>
              {/* Fake UI Overlay Background */}
              <div style={{ position: 'absolute', top: '10px', left: '10px', right: '10px', bottom: '30px', background: 'rgba(255,255,255,0.4)', borderRadius: '8px', filter: 'blur(1px)', pointerEvents: 'none' }}></div>
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'linear-gradient(to top, rgba(30,27,75,0.9) 0%, rgba(30,27,75,0) 100%)', pointerEvents: 'none' }}></div>
              
              <div style={{ position: 'relative', zIndex: 1, color: '#fff' }}>
                <p style={{ fontSize: '11px', fontWeight: '700', letterSpacing: '0.5px', margin: '0 0 4px', opacity: 0.8, textTransform: 'uppercase' }}>Network Topology</p>
                <h2 style={{ fontSize: '22px', fontWeight: '800', margin: 0, letterSpacing: '-0.5px', textShadow: '0 1px 2px rgba(0,0,0,0.3)' }}>Real-time Traffic Analysis</h2>
              </div>
            </div>

          </div>

          {/* Right Column: Security Policy */}
          <div>
            <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: '12px', padding: 'var(--spacing-page)', boxShadow: '0 1px 3px rgba(0,0,0,0.02)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '32px' }}>
                <ShieldCheck size={20} color="#0f172a" />
                <h2 style={{ fontSize: '16px', fontWeight: '800', color: '#0f172a', margin: 0 }}>Security Policy</h2>
              </div>

              <div style={{ marginBottom: '24px' }}>
                <label style={{ display: 'block', fontSize: '11px', fontWeight: '700', color: '#475569', marginBottom: '8px' }}>Idle Timeout (minutes)</label>
                <input 
                  type="number" 
                  value={idleTimeout}
                  onChange={(e) => setIdleTimeout(e.target.value)}
                  style={{ width: '100%', height: '40px', border: '1px solid #e2e8f0', borderRadius: '6px', padding: '0 12px', fontSize: '14px', color: '#0f172a', boxSizing: 'border-box', outline: 'none' }} 
                />
              </div>

              <div style={{ marginBottom: '32px' }}>
                <label style={{ display: 'block', fontSize: '11px', fontWeight: '700', color: '#475569', marginBottom: '8px' }}>Concurrent Login Limits</label>
                <Select
                  value={concurrentLimits}
                  onChange={(e) => setConcurrentLimits(e.target.value)}
                  style={{ width: '100%', height: '40px', border: '1px solid #e2e8f0', borderRadius: '6px', padding: '0 12px', fontSize: '14px', color: '#0f172a', boxSizing: 'border-box', outline: 'none', background: '#fff', cursor: 'pointer', appearance: 'none' }}
                  options={[
                    { label: "1 Device", value: "1 Device" },
                    { label: "3 Devices", value: "3 Devices" }, 
                    { label: "5 Devices", value: "5 Devices" }, 
                    { label: "Unlimited", value: "Unlimited" }
                  ]} 
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px', marginTop: '24px' }}>
                <div>
                  <h4 style={{ fontSize: '13px', fontWeight: '800', color: '#0f172a', margin: '0 0 4px' }}>Enforce MFA</h4>
                  <p style={{ fontSize: '11px', color: '#64748b', margin: 0 }}>Mandatory for all admin sessions</p>
                </div>
                <Toggle checked={enforceMfa} onChange={(val) => setEnforceMfa(val)} />
              </div>

              <button 
                onClick={handleUpdatePolicy} 
                disabled={isUpdatingPolicy}
                style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', width: '100%', height: '44px', background: '#0f172a', border: 'none', borderRadius: '6px', fontSize: '13px', fontWeight: '800', color: '#fff', cursor: isUpdatingPolicy ? 'not-allowed' : 'pointer', opacity: isUpdatingPolicy ? 0.8 : 1 }}
              >
                {isUpdatingPolicy && <Loader2 size={14} className="animate-spin" />}
                Update Security Policy
              </button>
            </div>
          </div>

        </div>

        {/* Live Sessions Table (Full Width) */}
        <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: '12px', boxShadow: '0 1px 3px rgba(0,0,0,0.02)', overflow: 'hidden' }}>
          <div style={{ padding: '20px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #e2e8f0' }}>
            <h2 style={{ fontSize: '16px', fontWeight: '800', color: '#0f172a', margin: 0 }}>Live Sessions</h2>
            <div style={{ display: 'flex', gap: '12px' }}>
              <button onClick={handleExport} style={{ height: '32px', padding: '0 16px', background: '#fff', border: '1px solid #cbd5e1', borderRadius: '6px', fontSize: '11px', fontWeight: '700', color: '#475569', cursor: 'pointer' }}>
                Export Logs
              </button>
              <button 
                onClick={handleRevokeAll}
                disabled={isRevokingAll || sessions.length === 0}
                style={{ display: 'flex', alignItems: 'center', gap: '6px', height: '32px', padding: '0 16px', background: '#dc2626', border: 'none', borderRadius: '6px', fontSize: '11px', fontWeight: '700', color: '#fff', cursor: (isRevokingAll || sessions.length === 0) ? 'not-allowed' : 'pointer', opacity: (isRevokingAll || sessions.length === 0) ? 0.6 : 1 }}
              >
                {isRevokingAll && <Loader2 size={12} className="animate-spin" />}
                Revoke All
              </button>
            </div>
          </div>

          <div className="table-responsive-wrapper">
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
              <thead>
                <tr style={{ background: '#f8fafc', borderBottom: '1px solid #e2e8f0' }}>
                  <th style={{ padding: '12px 24px', fontSize: '10px', fontWeight: '800', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.5px', width: '35%' }}>USER IDENTITY</th>
                  <th style={{ padding: '12px 24px', fontSize: '10px', fontWeight: '800', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.5px' }}>IP ADDRESS</th>
                  <th style={{ padding: '12px 24px', fontSize: '10px', fontWeight: '800', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.5px' }}>DEVICE / OS</th>
                  <th style={{ padding: '12px 24px', fontSize: '10px', fontWeight: '800', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.5px' }}>LAST ACTIVE</th>
                  <th style={{ padding: '12px 24px', fontSize: '10px', fontWeight: '800', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.5px', textAlign: 'right' }}>ACTIONS</th>
                </tr>
              </thead>
              <tbody>
                {sessions.map((session, index) => (
                  <tr key={session.id} className="animate-in fade-in slide-in-from-top-1" style={{ borderBottom: index === sessions.length - 1 ? 'none' : '1px solid #f1f5f9' }}>
                    <td style={{ padding: '16px 24px', display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: session.bg, color: session.color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', fontWeight: '800' }}>
                        {session.initials}
                      </div>
                      <div>
                        <div style={{ fontSize: '13px', fontWeight: '800', color: '#0f172a', marginBottom: '2px' }}>{session.name}</div>
                        <div style={{ fontSize: '11px', color: '#64748b' }}>{session.role}</div>
                      </div>
                    </td>
                    <td style={{ padding: '16px 24px', fontSize: '12px', color: '#334155', fontFamily: "var(--materio-space)" }}>{session.ip}</td>
                    <td style={{ padding: '16px 24px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px', color: '#334155' }}>
                        {getDeviceIcon(session.icon)} {session.device}
                      </div>
                    </td>
                    <td style={{ padding: '16px 24px', fontSize: '12px', color: '#334155' }}>{session.lastActive}</td>
                    <td style={{ padding: '16px 24px', textAlign: 'right' }}>
                      <button onClick={() => handleRevokeSingle(session.id)} style={{ background: 'none', border: 'none', fontSize: '11px', fontWeight: '800', color: '#dc2626', cursor: 'pointer', padding: 0 }}>
                        Revoke
                      </button>
                    </td>
                  </tr>
                ))}
                {sessions.length === 0 && (
                  <tr>
                    <td colSpan="5" style={{ padding: '32px', textAlign: 'center', color: '#64748b', fontSize: '13px' }}>
                      No active sessions found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          <div style={{ padding: '16px', display: 'flex', justifyContent: 'center', alignItems: 'center', background: '#f8fafc', borderTop: '1px solid #e2e8f0' }}>
            <button onClick={() => addToast("Loading more sessions...", "info")} style={{ background: 'none', border: 'none', fontSize: '11px', fontWeight: '800', color: '#0f172a', display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer' }}>
              View all sessions <ArrowRight size={14} />
            </button>
          </div>
        </div>

      </div>
    </AdminShell>
  );
}
