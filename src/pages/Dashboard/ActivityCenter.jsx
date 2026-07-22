import React, { useState } from 'react';
import { 
  Bell, 
  AlertTriangle, 
  ShoppingBag, 
  UserPlus, 
  CreditCard, 
  MessageSquare, 
  Star, 
  ChevronDown, 
  Download
} from 'lucide-react';
import AdminShell from '../../components/layouts/AdminShell';
import PageHeader from '../../components/ui/PageHeader';
import FilterBar from '../../components/ui/FilterBar';
import Card from '../../components/ui/Card';
import Badge from '../../components/ui/Badge';
import Button from '../../components/ui/Button';

export default function ActivityCenter({ activeTab = 'Dashboard' }) {
  const [eventType, setEventType] = useState('');
  const [severity, setSeverity] = useState('');
  const [adminUser, setAdminUser] = useState('');
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');
  const [search, setSearch] = useState('');

  const handleReset = () => {
    setEventType('');
    setSeverity('');
    setAdminUser('');
    setDateFrom('');
    setDateTo('');
    setSearch('');
  };

  const handleDownload = () => {
    alert("Downloading complete activity audit report...");
  };

  const handleFilterChange = (key, value) => {
    if (key === 'eventType') setEventType(value);
    if (key === 'severity') setSeverity(value);
    if (key === 'adminUser') setAdminUser(value);
  };

  return (
    <AdminShell showGlobalExport={true}
      activeTab={activeTab}
      brandText="HOZIFY"
      brandSubText="Enterprise Admin"
      headerTitle="Activity Center"
      searchPlaceholder="Search activities, logs, IDs..."
    >
      <div style={{ padding: 'var(--spacing-page) 0', display: 'flex', flexDirection: 'column', gap: 'var(--spacing-section)' }}>
        
        <PageHeader 
          title="Activity Center" 
          subtitle="Real-time global audit trail and system events."
          actions={
            <>
              <Badge variant="info">ACTIVE EVENTS: 1,284 Today</Badge>
              <Badge variant="danger">SECURITY ALERTS: 3 Critical</Badge>
            </>
          }
        />

        <FilterBar 
          onSearch={setSearch}
          searchPlaceholder="Search activities, logs, IDs..."
          onReset={handleReset}
          filters={[
            {
              key: 'eventType',
              label: 'All Events',
              options: [
                { label: 'Security', value: 'Security' },
                { label: 'Booking', value: 'Booking' },
                { label: 'User Action', value: 'User Action' },
                { label: 'Withdrawal', value: 'Withdrawal' }
              ]
            },
            {
              key: 'severity',
              label: 'All Severities',
              options: [
                { label: 'Critical', value: 'Critical' },
                { label: 'High', value: 'High' },
                { label: 'Standard', value: 'Standard' }
              ]
            },
            {
              key: 'adminUser',
              label: 'Filter by admin...',
              options: [
                { label: 'Sarah J.', value: 'Sarah J.' },
                { label: 'Michael C.', value: 'Michael C.' }
              ]
            }
          ]}
        />

        {/* Date fields aren't supported natively in FilterBar yet, so we could add them if needed, but keeping it clean for now */}

        {/* Event Timeline list feed */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-card)', position: 'relative' }}>
          
          {/* Vertical line indicator */}
          <div style={{
            position: 'absolute',
            top: '20px', bottom: '20px', left: '26px',
            width: '2px', background: 'var(--line)'
          }} />

          {/* TODAY Group */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px', zIndex: 2, position: 'relative' }}>
              <Badge variant="default">TODAY - OCTOBER 24, 2023</Badge>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginLeft: '14px' }}>
              
              {/* Item 1: Fraud Detected */}
              <div style={{ display: 'flex', gap: '16px', zIndex: 2, position: 'relative' }}>
                <div style={{ height: '26px', width: '26px', borderRadius: '50%', background: '#fee2e2', color: 'var(--red)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: '10px' }}>
                  <AlertTriangle size={13} />
                </div>
                <Card style={{ flex: 1, borderLeft: '4px solid var(--red)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', flexWrap: 'wrap', gap: '8px' }}>
                    <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                      <strong style={{ fontSize: 'var(--text-body)', color: 'var(--text)' }}>Fraud Detected</strong>
                      <Badge variant="danger">CRITICAL ALERT</Badge>
                    </div>
                    <span
                      onClick={() => alert("Redirecting to security logs for UID-9921-X")}
                      style={{ fontSize: 'var(--text-small)', fontWeight: '800', color: 'var(--primary)', cursor: 'pointer' }}
                    >
                      View Security Logs
                    </span>
                  </div>
                  <p style={{ fontSize: 'var(--text-body)', color: 'var(--muted)', margin: '8px 0 12px' }}>
                    Multiple failed withdrawal attempts from a blacklisted IP address (192.168.1.42). System has auto-locked the account.
                  </p>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', gap: '12px', fontSize: 'var(--text-small)', background: '#f8fafc', padding: '12px', borderRadius: '8px' }}>
                    <div>
                      <span style={{ color: 'var(--muted)', display: 'block' }}>USER ID</span>
                      <strong style={{ color: 'var(--text)' }}>UID-9921-X</strong>
                    </div>
                    <div>
                      <span style={{ color: 'var(--muted)', display: 'block' }}>TIMESTAMP</span>
                      <strong style={{ color: 'var(--text)' }}>14:22:15 GMT+5</strong>
                    </div>
                    <div>
                      <span style={{ color: 'var(--muted)', display: 'block' }}>ATTEMPT COUNT</span>
                      <strong style={{ color: 'var(--text)' }}>5 Retries</strong>
                    </div>
                    <div>
                      <span style={{ color: 'var(--muted)', display: 'block' }}>LOCATION</span>
                      <strong style={{ color: 'var(--text)' }}>Eastern Europe (VPN)</strong>
                    </div>
                  </div>
                </Card>
              </div>

              {/* Item 2: Booking Created */}
              <div style={{ display: 'flex', gap: '16px', zIndex: 2, position: 'relative' }}>
                <div style={{ height: '26px', width: '26px', borderRadius: '50%', background: 'var(--soft)', color: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: '10px' }}>
                  <ShoppingBag size={13} />
                </div>
                <Card style={{ flex: 1 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', flexWrap: 'wrap', gap: '8px' }}>
                    <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                      <strong style={{ fontSize: 'var(--text-body)', color: 'var(--text)' }}>Booking Created</strong>
                      <span style={{ fontSize: 'var(--text-small)', fontWeight: '800', color: 'var(--muted)' }}>Standard</span>
                    </div>
                    <span
                      onClick={() => alert("Directing to manage booking #BK-77291")}
                      style={{ fontSize: 'var(--text-small)', fontWeight: '800', color: 'var(--primary)', cursor: 'pointer' }}
                    >
                      Manage Booking
                    </span>
                  </div>
                  <p style={{ fontSize: 'var(--text-body)', color: 'var(--muted)', margin: '8px 0 12px' }}>
                    New enterprise service booking confirmed for 'Global Logistics Hub' - Service: Deep Industrial Cleaning.
                  </p>
                  <div style={{ display: 'flex', gap: 'var(--spacing-section)', fontSize: 'var(--text-small)' }}>
                    <div>
                      <span style={{ color: 'var(--muted)', marginRight: '6px' }}>ORDER ID:</span>
                      <strong style={{ color: 'var(--text)' }}>#BK-77291</strong>
                    </div>
                    <div>
                      <span style={{ color: 'var(--muted)', marginRight: '6px' }}>TIME:</span>
                      <strong style={{ color: 'var(--text)' }}>13:05:44</strong>
                    </div>
                    <div>
                      <span style={{ color: 'var(--muted)', marginRight: '6px' }}>VALUE:</span>
                      <strong style={{ color: 'var(--primary)', fontWeight: '800' }}>$4,200.00</strong>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'center', marginTop: '16px' }}>
            <Button variant="ghost" icon={ChevronDown} onClick={() => alert("Loading older timeline event logs...")}>
              Load More Events
            </Button>
          </div>
        </div>

        <button
          onClick={handleDownload}
          style={{
            position: 'fixed',
            bottom: '24px',
            right: '24px',
            height: '42px',
            width: '42px',
            borderRadius: '50%',
            background: 'var(--primary)',
            color: '#fff',
            border: 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: 'var(--shadow-standard)',
            cursor: 'pointer',
            zIndex: 99
          }}
          aria-label="Download activity audit report"
        >
          <Download size={18} />
        </button>

      </div>
    </AdminShell>
  );
}
