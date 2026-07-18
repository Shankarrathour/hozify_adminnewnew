import React, { useState } from 'react';
import { 
  Smartphone, MessageSquare, Monitor, Laptop, 
  ShieldCheck, Loader2, X
} from 'lucide-react';
import AdminShell from '../../components/layouts/AdminShell';
import { useToast } from '../../components/common/ToastNotification';

const INITIAL_SESSIONS = [
  { id: 1, device: 'macOS Ventura', browser: 'Chrome Browser', location: 'San Francisco, USA', time: 'Current Session', ip: '192.168.1.45', type: 'Laptop', isCurrent: true },
  { id: 2, device: 'iPhone 14 Pro', browser: 'Hozify App', location: 'London, UK', time: '2 hours ago', type: 'Smartphone', isCurrent: false },
  { id: 3, device: 'Windows 11', browser: 'Edge Browser', location: 'Berlin, DE', time: '4 days ago', type: 'Monitor', isCurrent: false }
];

export default function SecuritySettings() {
  const { addToast } = useToast();

  const [isAuthenticatorActive, setIsAuthenticatorActive] = useState(false);
  const [isRecoverySaved, setIsRecoverySaved] = useState(false);
  const [sessions, setSessions] = useState(INITIAL_SESSIONS);
  const [isSigningOut, setIsSigningOut] = useState(false);

  // Calculate dynamic security score
  let securityScore = 70; // Base score
  if (isAuthenticatorActive) securityScore += 15;
  if (isRecoverySaved) securityScore += 15;

  const handleSetupAuthenticator = () => {
    addToast("Setting up Authenticator App...", "info");
    setTimeout(() => {
      setIsAuthenticatorActive(true);
      addToast("Authenticator App successfully configured!", "success");
    }, 1000);
  };

  const handleGenerateRecovery = () => {
    addToast("Generating new recovery codes...", "info");
    setTimeout(() => {
      setIsRecoverySaved(true);
      addToast("Recovery codes generated and saved securely.", "success");
    }, 1000);
  };

  const handleRevokeSession = (id) => {
    setSessions(prev => prev.filter(s => s.id !== id));
    addToast("Session revoked successfully.", "success");
  };

  const handleSignOutAll = () => {
    setIsSigningOut(true);
    setTimeout(() => {
      setSessions(prev => prev.filter(s => s.isCurrent));
      setIsSigningOut(false);
      addToast("Signed out of all other devices.", "success");
    }, 1200);
  };

  const getIcon = (type) => {
    switch(type) {
      case 'Laptop': return <Laptop size={20} color="#475569" />;
      case 'Smartphone': return <Smartphone size={20} color="#475569" />;
      case 'Monitor': return <Monitor size={20} color="#475569" />;
      default: return <Monitor size={20} color="#475569" />;
    }
  };

  return (
    <AdminShell
      activeTab="Settings"
      customProfileName="Alex Rivera"
      customProfileRole="Admin User"
      showGridIcon={true}
    >
      <div style={{ padding: '32px 40px 60px', maxWidth: '1100px' }}>
        
        {/* Header */}
        <div style={{ marginBottom: '32px' }}>
          <h1 style={{ fontSize: '24px', fontWeight: '800', color: 'var(--text)', margin: '0 0 8px' }}>
            Security Settings
          </h1>
          <p style={{ fontSize: '14px', color: 'var(--muted)', margin: 0 }}>
            Manage your enterprise security protocols and authentication methods.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: 'var(--spacing-section)' }}>
          
          {/* Left Column */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-section)' }}>
            
            {/* Two-Factor Authentication (2FA) */}
            <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: '12px', padding: 'var(--spacing-page)', position: 'relative', overflow: 'hidden' }}>
              {/* Subtle background shield icon */}
              <div style={{ position: 'absolute', top: '-10px', right: '-10px', opacity: 0.04, pointerEvents: 'none' }}>
                <ShieldCheck size={180} />
              </div>

              <div style={{ position: 'relative', zIndex: 1 }}>
                <span style={{ display: 'inline-block', background: '#eff6ff', color: '#3b82f6', padding: '4px 10px', borderRadius: '4px', fontSize: '10px', fontWeight: '800', letterSpacing: '0.5px', marginBottom: '16px', textTransform: 'uppercase' }}>
                  MULTI-FACTOR
                </span>
                <h2 style={{ fontSize: '18px', fontWeight: '800', color: 'var(--text)', margin: '0 0 12px' }}>
                  Two-Factor Authentication (2FA)
                </h2>
                <p style={{ fontSize: '13px', color: 'var(--muted)', margin: '0 0 32px', maxWidth: '450px', lineHeight: '1.6' }}>
                  Add an extra layer of security to your account by requiring more than just a password to log in.
                </p>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                  {/* Authenticator App */}
                  <div style={{ border: isAuthenticatorActive ? '1px solid #16a34a' : '1px solid #e2e8f0', background: isAuthenticatorActive ? '#f0fdf4' : '#fff', borderRadius: '8px', padding: 'var(--spacing-section)', display: 'flex', flexDirection: 'column', transition: 'all 0.3s' }}>
                    <div style={{ width: '40px', height: '40px', background: isAuthenticatorActive ? '#dcfce7' : '#0f172a', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px' }}>
                      <Smartphone size={20} color={isAuthenticatorActive ? '#15803d' : '#fff'} />
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                      <h3 style={{ fontSize: '14px', fontWeight: '800', color: 'var(--text)', margin: 0 }}>Authenticator App</h3>
                      {isAuthenticatorActive && (
                        <span className="animate-in zoom-in" style={{ display: 'inline-block', background: '#dcfce7', color: '#16a34a', padding: '2px 8px', borderRadius: '4px', fontSize: '9px', fontWeight: '800', letterSpacing: '0.5px', textTransform: 'uppercase' }}>
                          ACTIVE
                        </span>
                      )}
                    </div>
                    <p style={{ fontSize: '12px', color: 'var(--muted)', margin: '0 0 24px', lineHeight: '1.6', flex: 1 }}>
                      Use apps like Google Authenticator or Microsoft Authenticator to generate verification codes.
                    </p>
                    <button 
                      onClick={handleSetupAuthenticator} 
                      disabled={isAuthenticatorActive}
                      style={{ width: '100%', height: '36px', background: isAuthenticatorActive ? '#fff' : '#0f172a', border: isAuthenticatorActive ? '1px solid #16a34a' : 'none', borderRadius: '6px', fontSize: '12px', fontWeight: '700', color: isAuthenticatorActive ? '#15803d' : '#fff', cursor: isAuthenticatorActive ? 'default' : 'pointer' }}
                    >
                      {isAuthenticatorActive ? 'Configured' : 'Set Up App'}
                    </button>
                  </div>

                  {/* SMS Verification */}
                  <div style={{ border: '1px solid #e2e8f0', borderRadius: '8px', padding: 'var(--spacing-section)', display: 'flex', flexDirection: 'column' }}>
                    <div style={{ width: '40px', height: '40px', background: '#fff', border: '1px solid #e2e8f0', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px' }}>
                      <MessageSquare size={20} color="#475569" />
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                      <h3 style={{ fontSize: '14px', fontWeight: '800', color: 'var(--text)', margin: 0 }}>SMS Verification</h3>
                      <span style={{ display: 'inline-block', background: '#dcfce7', color: '#16a34a', padding: '2px 8px', borderRadius: '4px', fontSize: '9px', fontWeight: '800', letterSpacing: '0.5px', textTransform: 'uppercase' }}>
                        ACTIVE
                      </span>
                    </div>
                    <p style={{ fontSize: '12px', color: 'var(--muted)', margin: '0 0 24px', lineHeight: '1.6', flex: 1 }}>
                      Verification codes are sent to your mobile phone via text message. Phone ending in **** 4492.
                    </p>
                    <button onClick={() => addToast("Phone number change requested.", "info")} style={{ width: '100%', height: '36px', background: '#fff', border: '1px solid #e2e8f0', borderRadius: '6px', fontSize: '12px', fontWeight: '700', color: 'var(--text)', cursor: 'pointer' }}>
                      Change Number
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Login Sessions */}
            <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: '12px', padding: 'var(--spacing-page)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '24px' }}>
                <div>
                  <h2 style={{ fontSize: '16px', fontWeight: '800', color: 'var(--text)', margin: '0 0 8px' }}>Login Sessions</h2>
                  <p style={{ fontSize: '13px', color: 'var(--muted)', margin: 0 }}>Review and manage your active web and mobile sessions.</p>
                </div>
                <button 
                  onClick={handleSignOutAll} 
                  disabled={isSigningOut || sessions.length <= 1}
                  style={{ height: '36px', padding: '0 16px', background: '#fff', border: '1px solid #ef4444', borderRadius: '6px', fontSize: '12px', fontWeight: '700', color: '#ef4444', cursor: (isSigningOut || sessions.length <= 1) ? 'not-allowed' : 'pointer', opacity: (isSigningOut || sessions.length <= 1) ? 0.5 : 1, textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}
                >
                  {isSigningOut ? (
                    <><Loader2 size={14} className="animate-spin" /> Signing out...</>
                  ) : (
                    <span>Sign out of all<br/>other devices</span>
                  )}
                </button>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {sessions.map(session => (
                  <div key={session.id} className="animate-in fade-in zoom-in-95 duration-200" style={{ border: session.isCurrent ? '1px solid #cbd5e1' : '1px solid #e2e8f0', background: session.isCurrent ? '#f8fafc' : '#fff', borderRadius: '8px', padding: '20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                      {getIcon(session.type)}
                      <div>
                        <h4 style={{ fontSize: '13px', fontWeight: '700', color: 'var(--text)', margin: '0 0 4px' }}>{session.device} • {session.browser}</h4>
                        <p style={{ fontSize: '11px', color: 'var(--muted)', margin: 0 }}>{session.location} • {session.time}</p>
                      </div>
                    </div>
                    {session.isCurrent ? (
                      <span style={{ fontSize: '11px', color: 'var(--muted)', fontWeight: '600' }}>Current Session<br/>IP: {session.ip}</span>
                    ) : (
                      <button onClick={() => handleRevokeSession(session.id)} style={{ background: 'none', border: 'none', padding: 0, fontSize: '11px', fontWeight: '700', color: '#ef4444', cursor: 'pointer' }}>
                        Revoke
                      </button>
                    )}
                  </div>
                ))}
                {sessions.length === 0 && (
                  <div style={{ padding: '20px', textAlign: 'center', color: 'var(--muted)', fontSize: '13px' }}>
                    No active sessions found.
                  </div>
                )}
              </div>
            </div>

          </div>

          {/* Right Column */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-section)' }}>
            
            {/* Advanced Protection Gradient Card */}
            <div style={{ background: 'linear-gradient(180deg, #f1f5f9 0%, #8b8ea5 50%, #4b4b60 100%)', borderRadius: '12px', padding: 'var(--spacing-page)', color: '#fff', height: '320px', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', boxShadow: '0 4px 6px rgba(0,0,0,0.05)' }}>
              <h2 style={{ fontSize: '16px', fontWeight: '800', margin: '0 0 8px', textShadow: '0 1px 2px rgba(0,0,0,0.2)' }}>Advanced Protection</h2>
              <p style={{ fontSize: '12px', margin: 0, opacity: 0.9, lineHeight: '1.5', textShadow: '0 1px 2px rgba(0,0,0,0.2)' }}>
                Our security protocols utilize machine learning to detect anomalies in real-time.
              </p>
            </div>

            {/* Account Recovery */}
            <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: '12px', padding: 'var(--spacing-page)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                <ShieldCheck size={20} color="#0f172a" />
                <h2 style={{ fontSize: '16px', fontWeight: '800', color: 'var(--text)', margin: 0 }}>Account Recovery</h2>
              </div>
              <p style={{ fontSize: '12px', color: 'var(--muted)', margin: '0 0 24px', lineHeight: '1.6' }}>
                Ensure you can always access your account if you lose your 2FA device or forget your password.
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {/* Recovery Codes */}
                <div style={{ background: isRecoverySaved ? '#f0fdf4' : '#f8fafc', border: isRecoverySaved ? '1px solid #bbf7d0' : 'none', borderRadius: '8px', padding: '16px', transition: 'all 0.3s' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                    <h4 style={{ fontSize: '13px', fontWeight: '700', color: 'var(--text)', margin: 0 }}>Recovery Codes</h4>
                    {isRecoverySaved ? (
                      <span className="animate-in zoom-in" style={{ display: 'inline-block', background: '#dcfce7', color: '#16a34a', padding: '2px 6px', borderRadius: '4px', fontSize: '9px', fontWeight: '800', letterSpacing: '0.5px', textTransform: 'uppercase' }}>SAVED</span>
                    ) : (
                      <span style={{ display: 'inline-block', background: '#e2e8f0', color: '#475569', padding: '2px 6px', borderRadius: '4px', fontSize: '9px', fontWeight: '800', letterSpacing: '0.5px', textTransform: 'uppercase' }}>NOT SAVED</span>
                    )}
                  </div>
                  <p style={{ fontSize: '11px', color: 'var(--muted)', margin: '0 0 16px', lineHeight: '1.5' }}>
                    Generate a set of one-time codes to use if you lose access to your authenticator.
                  </p>
                  <button 
                    onClick={handleGenerateRecovery} 
                    disabled={isRecoverySaved}
                    style={{ background: 'none', border: 'none', padding: 0, fontSize: '11px', fontWeight: '800', color: isRecoverySaved ? '#16a34a' : '#0f172a', cursor: isRecoverySaved ? 'default' : 'pointer' }}
                  >
                    {isRecoverySaved ? 'Codes Configured' : 'Generate New Codes'}
                  </button>
                </div>

                {/* Recovery Email */}
                <div style={{ background: '#f8fafc', borderRadius: '8px', padding: '16px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                    <h4 style={{ fontSize: '13px', fontWeight: '700', color: 'var(--text)', margin: 0 }}>Recovery Email</h4>
                    <span style={{ display: 'inline-block', background: '#dcfce7', color: '#16a34a', padding: '2px 6px', borderRadius: '4px', fontSize: '9px', fontWeight: '800', letterSpacing: '0.5px', textTransform: 'uppercase' }}>VERIFIED</span>
                  </div>
                  <p style={{ fontSize: '11px', color: 'var(--text)', margin: '0 0 16px', fontWeight: '500' }}>
                    secondary_admin@hozify.com
                  </p>
                  <button onClick={() => addToast("Change email request sent to current email.", "info")} style={{ background: 'none', border: 'none', padding: 0, fontSize: '11px', fontWeight: '800', color: '#0f172a', cursor: 'pointer' }}>
                    Change Email
                  </button>
                </div>
              </div>

              {/* Security Score */}
              <div style={{ marginTop: '32px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                  <span style={{ fontSize: '11px', fontWeight: '600', color: 'var(--muted)' }}>Security Score</span>
                  <span className="animate-in fade-in slide-in-from-bottom-2" style={{ fontSize: '12px', fontWeight: '800', color: securityScore >= 100 ? '#16a34a' : '#0f172a' }}>
                    {securityScore}%
                  </span>
                </div>
                <div style={{ width: '100%', height: '4px', background: '#e2e8f0', borderRadius: '2px', overflow: 'hidden' }}>
                  <div style={{ width: `${securityScore}%`, height: '100%', background: securityScore >= 100 ? '#16a34a' : '#0f172a', borderRadius: '2px', transition: 'width 1s cubic-bezier(0.4, 0, 0.2, 1), background-color 1s ease' }}></div>
                </div>
              </div>

            </div>

          </div>
        </div>

      </div>
    </AdminShell>
  );
}
