import React, { useState } from 'react';
import {
  Save,
  Trash2,
  TrendingUp,
  AlertCircle,
  Activity,
  Zap,
  Server,
  Database,
  Sliders,
  RefreshCw,
  SlidersHorizontal,
  CloudLightning,
  ChevronRight
} from 'lucide-react';
import AdminShell from '../../components/layouts/AdminShell';

export default function GlobalNotificationSettings({ activeTab = 'Notification Center' }) {
  // Config States
  const [twilioAccountSid, setTwilioAccountSid] = useState('AC88390b1c9a17387d898c1998fde');
  const [twilioAuthToken, setTwilioAuthToken] = useState('••••••••••••••••••••••••••••');
  const [senderId, setSenderId] = useState('HOZIFY');
  const [dlrEnabled, setDlrEnabled] = useState(true);
  
  const [quietHoursStart, setQuietHoursStart] = useState('22:00');
  const [quietHoursEnd, setQuietHoursEnd] = useState('08:00');

  const [pushTtl, setPushTtl] = useState(3600);
  const [callbackUrl, setCallbackUrl] = useState('https://api.hozify.internal/v1/dlr-callbacks');
  const [autoBadge, setAutoBadge] = useState(true);

  // Rate limits
  const [smsRateLimit, setSmsRateLimit] = useState(150); // msgs/sec
  const [pushRateLimit, setPushRateLimit] = useState(2500); // msgs/sec

  // Retry table
  const [retryStrategies, setRetryStrategies] = useState([
    { trigger: 'Rate Limit (429)', attempts: 5, backoff: 'Exponential (Factor 2)', jitter: 'Full Jitter', enabled: true },
    { trigger: 'Gateway Timeout (504)', attempts: 3, backoff: 'Linear (30s delay)', jitter: 'None', enabled: true },
    { trigger: 'Internal Server Error (500)', attempts: 2, backoff: 'Fixed (60s delay)', jitter: 'None', enabled: false }
  ]);

  const handleApplyConfig = (e) => {
    e.preventDefault();
    alert('Global notification settings saved successfully and synchronizing with edge nodes.');
  };

  const handleDiscard = () => {
    if (window.confirm('Discard all unsaved edits?')) {
      setTwilioAccountSid('AC88390b1c9a17387d898c1998fde');
      setTwilioAuthToken('••••••••••••••••••••••••••••');
      setSenderId('HOZIFY');
      setDlrEnabled(true);
      setQuietHoursStart('22:00');
      setQuietHoursEnd('08:00');
      setPushTtl(3600);
      setCallbackUrl('https://api.hozify.internal/v1/dlr-callbacks');
      setAutoBadge(true);
      setSmsRateLimit(150);
      setPushRateLimit(2500);
    }
  };

  const toggleStrategy = (index) => {
    const next = [...retryStrategies];
    next[index].enabled = !next[index].enabled;
    setRetryStrategies(next);
  };

  return (
    <AdminShell
      activeTab={activeTab}
      brandText="HOZIFY"
      brandSubText="System Settings"
      headerTitle="Global Notification Settings"
      searchPlaceholder="Search system config, callback variables..."
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-section)', padding: '24px 0', position: 'relative' }}>
        
        {/* Breadcrumb & Header Row */}
        <div>
          <div style={{ fontSize: '12px', fontWeight: '750', color: 'var(--muted)', display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '8px' }}>
            <span>Notification Center</span>
            <ChevronRight size={12} />
            <span style={{ color: 'var(--primary)' }}>Global Settings</span>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
            <div>
              <h1 style={{ fontSize: '24px', fontWeight: '800', color: 'var(--text)', margin: 0 }}>
                Global Notification Settings
              </h1>
              <p style={{ fontSize: '13px', color: 'var(--muted)', margin: '4px 0 0' }}>
                Manage core SMS gateways, push server connections, rate-limits, and routing policies
              </p>
            </div>

            <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
              <button
                onClick={handleDiscard}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  border: '1.5px solid #25108f',
                  background: '#fff',
                  color: 'var(--text)',
                  fontSize: '13px',
                  fontWeight: '700',
                  height: '38px',
                  padding: '0 16px',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease'
                }}
                type="button"
              >
                <Trash2 size={14} />
                <span>Discard Changes</span>
              </button>

              <button
                onClick={handleApplyConfig}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  border: 'none',
                  background: 'var(--primary)',
                  color: '#fff',
                  fontSize: '13px',
                  fontWeight: '700',
                  height: '38px',
                  padding: '0 16px',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  boxShadow: '0 2px 4px rgba(37, 16, 143, 0.08)',
                  transition: 'all 0.15s ease'
                }}
                type="button"
              >
                <Save size={14} />
                <span>Apply Config</span>
              </button>
            </div>
          </div>
        </div>

        {/* KPI Metrics Row */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
          {/* Card 1: Total Delivery */}
          <div className="panel" style={{ padding: 'var(--spacing-section)', display: 'flex', flexDirection: 'column', gap: '12px', position: 'relative' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '10px', fontWeight: '800', color: 'var(--muted)', letterSpacing: '0.5px', textTransform: 'uppercase' }}>
                Total Delivery (Monthly)
              </span>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '32px', height: '32px', borderRadius: '6px', background: '#ecfdf5', color: '#059669' }}>
                <CloudLightning size={15} />
              </div>
            </div>
            <div>
              <strong style={{ display: 'block', fontSize: '28px', color: 'var(--text)', fontWeight: '850' }}>
                1.2M
              </strong>
              <span style={{ fontSize: '12px', fontWeight: '750', color: 'var(--green)', display: 'inline-flex', alignItems: 'center', gap: '3px', marginTop: '4px' }}>
                <TrendingUp size={12} />
                +8.2% vs last mo
              </span>
            </div>
          </div>

          {/* Card 2: Error Rate */}
          <div className="panel" style={{ padding: 'var(--spacing-section)', display: 'flex', flexDirection: 'column', gap: '12px', position: 'relative' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '10px', fontWeight: '800', color: 'var(--muted)', letterSpacing: '0.5px', textTransform: 'uppercase' }}>
                Global Error Rate
              </span>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '32px', height: '32px', borderRadius: '6px', background: '#fee2e2', color: '#dc2626' }}>
                <AlertCircle size={15} />
              </div>
            </div>
            <div>
              <strong style={{ display: 'block', fontSize: '28px', color: 'var(--text)', fontWeight: '850' }}>
                0.08%
              </strong>
              <span style={{ fontSize: '12px', fontWeight: '750', color: 'var(--green)', display: 'inline-flex', alignItems: 'center', gap: '3px', marginTop: '4px' }}>
                Optimal Healthy Threshold
              </span>
            </div>
          </div>

          {/* Card 3: Pending Retries */}
          <div className="panel" style={{ padding: 'var(--spacing-section)', display: 'flex', flexDirection: 'column', gap: '12px', position: 'relative' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '10px', fontWeight: '800', color: 'var(--muted)', letterSpacing: '0.5px', textTransform: 'uppercase' }}>
                Pending Retries
              </span>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '32px', height: '32px', borderRadius: '6px', background: '#fff9db', color: '#b58000' }}>
                <RefreshCw size={15} />
              </div>
            </div>
            <div>
              <strong style={{ display: 'block', fontSize: '28px', color: 'var(--text)', fontWeight: '850' }}>
                429
              </strong>
              <span style={{ fontSize: '12px', fontWeight: '750', color: 'var(--muted)', display: 'inline-flex', alignItems: 'center', gap: '3px', marginTop: '4px' }}>
                Auto-processing queue
              </span>
            </div>
          </div>

          {/* Card 4: Average Latency */}
          <div className="panel" style={{ padding: 'var(--spacing-section)', display: 'flex', flexDirection: 'column', gap: '12px', position: 'relative' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '10px', fontWeight: '800', color: 'var(--muted)', letterSpacing: '0.5px', textTransform: 'uppercase' }}>
                Latency Avg
              </span>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '32px', height: '32px', borderRadius: '6px', background: '#f5f3ff', color: 'var(--primary)' }}>
                <Zap size={15} />
              </div>
            </div>
            <div>
              <strong style={{ display: 'block', fontSize: '28px', color: 'var(--text)', fontWeight: '850' }}>
                24ms
              </strong>
              <span style={{ fontSize: '12px', fontWeight: '750', color: 'var(--green)', display: 'inline-flex', alignItems: 'center', gap: '3px', marginTop: '4px' }}>
                AWS-edge CDN sync
              </span>
            </div>
          </div>
        </div>

        {/* Configurations Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr', lgGridTemplateColumns: '2.2fr 1fr', gap: 'var(--spacing-section)', alignItems: 'stretch' }}>
          
          {/* Connectivity config panels (Left Column) */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-section)' }}>
            {/* Global SMS Gateways settings */}
            <div className="panel" style={{ padding: 'var(--spacing-section)', display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <h2 style={{ fontSize: '15.5px', fontWeight: '850', color: 'var(--text)', margin: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Server size={18} style={{ color: 'var(--primary)' }} />
                Connectivity Settings: SMS Gateway (Twilio)
              </h2>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginTop: '8px' }}>
                <div style={{ gridColumn: 'span 2' }}>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: '750', color: 'var(--text)', marginBottom: '6px' }}>Twilio Account SID</label>
                  <input
                    type="text"
                    value={twilioAccountSid}
                    onChange={(e) => setTwilioAccountSid(e.target.value)}
                    style={{ width: '100%', height: '38px', border: '1.5px solid #25108f', borderRadius: '6px', padding: '0 12px', fontSize: '13px', fontFamily: "var(--materio-space)", }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: '750', color: 'var(--text)', marginBottom: '6px' }}>Twilio Auth Token</label>
                  <input
                    type="password"
                    value={twilioAuthToken}
                    onChange={(e) => setTwilioAuthToken(e.target.value)}
                    style={{ width: '100%', height: '38px', border: '1.5px solid #25108f', borderRadius: '6px', padding: '0 12px', fontSize: '13px' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: '750', color: 'var(--text)', marginBottom: '6px' }}>Sender Alpha-ID</label>
                  <input
                    type="text"
                    value={senderId}
                    onChange={(e) => setSenderId(e.target.value)}
                    style={{ width: '100%', height: '38px', border: '1.5px solid #25108f', borderRadius: '6px', padding: '0 12px', fontSize: '13px', fontWeight: '700' }}
                  />
                </div>

                <div style={{ gridColumn: 'span 2', display: 'flex', gap: '20px', flexWrap: 'wrap', borderTop: '1px dashed var(--lavender)', paddingTop: '16px', marginTop: '8px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '12px', fontWeight: '750', color: 'var(--text)', marginBottom: '6px' }}>Quiet Hours Blackout Window</label>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <input
                        type="time"
                        value={quietHoursStart}
                        onChange={(e) => setQuietHoursStart(e.target.value)}
                        style={{ height: '38px', border: '1.5px solid #25108f', borderRadius: '6px', padding: '0 12px', fontSize: '13px' }}
                      />
                      <span style={{ fontSize: '13px', color: 'var(--muted)' }}>to</span>
                      <input
                        type="time"
                        value={quietHoursEnd}
                        onChange={(e) => setQuietHoursEnd(e.target.value)}
                        style={{ height: '38px', border: '1.5px solid #25108f', borderRadius: '6px', padding: '0 12px', fontSize: '13px' }}
                      />
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', marginTop: '20px' }}>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '13px', fontWeight: '750', color: 'var(--text)' }}>
                      <input
                        type="checkbox"
                        checked={dlrEnabled}
                        onChange={() => setDlrEnabled(!dlrEnabled)}
                        style={{ height: '16px', width: '16px', accentColor: 'var(--primary)' }}
                      />
                      Enable Real-time Carrier DLR Callbacks
                    </label>
                  </div>
                </div>
              </div>
            </div>

            {/* FCM/APNs Push settings */}
            <div className="panel" style={{ padding: 'var(--spacing-section)', display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <h2 style={{ fontSize: '15.5px', fontWeight: '850', color: 'var(--text)', margin: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
                <CloudLightning size={18} style={{ color: 'var(--primary)' }} />
                Connectivity Settings: Push notifications (FCM & APNs)
              </h2>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginTop: '8px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: '750', color: 'var(--text)', marginBottom: '6px' }}>FCM Push TTL (Time to Live - seconds)</label>
                  <input
                    type="number"
                    value={pushTtl}
                    onChange={(e) => setPushTtl(Number(e.target.value))}
                    style={{ width: '100%', height: '38px', border: '1.5px solid #25108f', borderRadius: '6px', padding: '0 12px', fontSize: '13px' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: '750', color: 'var(--text)', marginBottom: '6px' }}>Universal Telemetry Callback URL</label>
                  <input
                    type="url"
                    value={callbackUrl}
                    onChange={(e) => setCallbackUrl(e.target.value)}
                    style={{ width: '100%', height: '38px', border: '1.5px solid #25108f', borderRadius: '6px', padding: '0 12px', fontSize: '13px', color: 'var(--muted)' }}
                  />
                </div>

                <div style={{ gridColumn: 'span 2', borderTop: '1px dashed var(--lavender)', paddingTop: '16px', marginTop: '8px' }}>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '13px', fontWeight: '750', color: 'var(--text)' }}>
                    <input
                      type="checkbox"
                      checked={autoBadge}
                      onChange={() => setAutoBadge(!autoBadge)}
                      style={{ height: '16px', width: '16px', accentColor: 'var(--primary)' }}
                    />
                    Auto-increment App Icon Badges on dispatch
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* Right Sidebar (Rate Limiting & Health) */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-section)' }}>
            
            {/* Rate Limiting & Throughput Panel */}
            <div className="panel" style={{ padding: 'var(--spacing-section)', display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <h3 style={{ fontSize: '14px', fontWeight: '850', color: 'var(--text)', margin: 0, display: 'flex', alignItems: 'center', gap: '6px' }}>
                <SlidersHorizontal size={16} style={{ color: 'var(--primary)' }} />
                Rate Limiting & Throughput
              </h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginTop: '4px' }}>
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12.5px', fontWeight: '750', marginBottom: '8px' }}>
                    <span style={{ color: 'var(--text)' }}>Global SMS Rate</span>
                    <strong style={{ color: 'var(--primary)' }}>{smsRateLimit} msg/s</strong>
                  </div>
                  <input
                    type="range"
                    min="10"
                    max="1000"
                    step="10"
                    value={smsRateLimit}
                    onChange={(e) => setSmsRateLimit(Number(e.target.value))}
                    style={{ width: '100%', accentColor: 'var(--primary)', cursor: 'pointer' }}
                  />
                </div>

                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12.5px', fontWeight: '750', marginBottom: '8px' }}>
                    <span style={{ color: 'var(--text)' }}>Push Delivery Rate</span>
                    <strong style={{ color: 'var(--primary)' }}>{pushRateLimit} msg/s</strong>
                  </div>
                  <input
                    type="range"
                    min="100"
                    max="10000"
                    step="100"
                    value={pushRateLimit}
                    onChange={(e) => setPushRateLimit(Number(e.target.value))}
                    style={{ width: '100%', accentColor: 'var(--primary)', cursor: 'pointer' }}
                  />
                </div>
              </div>
            </div>

            {/* Network Infrastructure Sync */}
            <div style={{
              background: 'linear-gradient(135deg, #1e1b4b 0%, #0c0a3e 100%)',
              color: '#fff',
              borderRadius: '12px',
              padding: 'var(--spacing-section)',
              display: 'flex',
              flexDirection: 'column',
              gap: '16px',
              boxShadow: '0 4px 12px rgba(12, 10, 62, 0.08)'
            }}>
              <div>
                <span style={{ fontSize: '9px', fontWeight: '900', color: '#38bdf8', letterSpacing: '1px', textTransform: 'uppercase' }}>
                  Infrastructure Status
                </span>
                <strong style={{ display: 'block', fontSize: '18px', marginTop: '6px', fontWeight: '800' }}>
                  AWS Infrastructure Sync
                </strong>
              </div>

              <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '16px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11.5px', color: '#c3c1db' }}>
                  <span>US-East Master Node</span>
                  <span style={{ color: '#34d399', fontWeight: '750' }}>Synced</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11.5px', color: '#c3c1db' }}>
                  <span>AP-South Edge (Mumbai)</span>
                  <span style={{ color: '#34d399', fontWeight: '750' }}>Synced</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11.5px', color: '#c3c1db' }}>
                  <span>EU-West Edge (Dublin)</span>
                  <span style={{ color: '#34d399', fontWeight: '750' }}>Synced</span>
                </div>

                <div style={{ display: 'flex', gap: '8px', alignItems: 'center', marginTop: '8px', fontSize: '11px', color: '#94a3b8' }}>
                  <Activity size={12} style={{ color: '#38bdf8' }} />
                  <span>Last edge configuration check: 1 min ago</span>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Retry Strategies Table Section */}
        <div className="panel" style={{ padding: 'var(--spacing-section)', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div>
            <h2 style={{ fontSize: '15px', fontWeight: '850', color: 'var(--text)', margin: 0 }}>
              Global Retry Strategies & Backoffs
            </h2>
            <p style={{ fontSize: '12px', color: 'var(--muted)', margin: '2px 0 0' }}>
              Determine timeout recovery and queue retry parameters for network gateway failures
            </p>
          </div>

          <div style={{ overflowY: 'auto', maxHeight: '400px' }}>
            <div className="table-responsive-wrapper">
<table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px', textAlign: 'left', minWidth: '700px' }}>
              <thead>
                <tr style={{ background: 'var(--soft)', borderBottom: '1.5px solid #25108f' }}>
                  <th style={{ padding: '12px 16px', color: 'var(--muted)', fontWeight: '800', textTransform: 'uppercase', fontSize: '10px' }}>Failure Trigger</th>
                  <th style={{ padding: '12px 16px', color: 'var(--muted)', fontWeight: '800', textTransform: 'uppercase', fontSize: '10px' }}>Max Retry Attempts</th>
                  <th style={{ padding: '12px 16px', color: 'var(--muted)', fontWeight: '800', textTransform: 'uppercase', fontSize: '10px' }}>Backoff Algorithm</th>
                  <th style={{ padding: '12px 16px', color: 'var(--muted)', fontWeight: '800', textTransform: 'uppercase', fontSize: '10px' }}>Jitter Profile</th>
                  <th style={{ padding: '12px 16px', color: 'var(--muted)', fontWeight: '800', textTransform: 'uppercase', fontSize: '10px' }}>Status</th>
                  <th style={{ padding: '12px 16px', color: 'var(--muted)', fontWeight: '800', textTransform: 'uppercase', fontSize: '10px', textAlign: 'right' }}>Toggle Action</th>
                </tr>
              </thead>
              <tbody>
                {retryStrategies.map((strategy, index) => (
                  <tr key={index} style={{ borderBottom: '1px solid var(--lavender)' }}>
                    <td style={{ padding: '16px', fontWeight: '800', color: 'var(--text)' }}>{strategy.trigger}</td>
                    <td style={{ padding: '16px', fontWeight: '700', color: 'var(--text)' }}>{strategy.attempts}x attempts</td>
                    <td style={{ padding: '16px', color: 'var(--muted)' }}>{strategy.backoff}</td>
                    <td style={{ padding: '16px', color: 'var(--muted)' }}>{strategy.jitter}</td>
                    <td style={{ padding: '16px' }}>
                      <span style={{
                        fontSize: '9.5px',
                        fontWeight: '900',
                        padding: '3px 8px',
                        borderRadius: '4px',
                        background: strategy.enabled ? '#ecfdf5' : '#fee2e2',
                        color: strategy.enabled ? '#07956f' : '#dc2626'
                      }}>
                        {strategy.enabled ? 'ACTIVE' : 'INACTIVE'}
                      </span>
                    </td>
                    <td style={{ padding: '16px', textAlign: 'right' }}>
                      <button
                        onClick={() => toggleStrategy(index)}
                        style={{
                          height: '24px',
                          padding: '0 12px',
                          borderRadius: '4px',
                          border: '1.5px solid #25108f',
                          background: strategy.enabled ? '#fee2e2' : '#ecfdf5',
                          color: strategy.enabled ? '#dc2626' : '#07956f',
                          fontSize: '11px',
                          fontWeight: '800',
                          cursor: 'pointer'
                        }}
                        type="button"
                      >
                        {strategy.enabled ? 'Deactivate' : 'Activate'}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
</div>
          </div>
        </div>

      </div>
    </AdminShell>
  );
}


