import React, { useState } from 'react';
import { 
  Play, Cloud, Search, Filter, Clock, User, MoreVertical, Loader2
} from 'lucide-react';
import AdminShell from '../../components/layouts/AdminShell';
import { useToast } from '../../components/common/ToastNotification';
import Select from "../../components/ui/Select";

const INITIAL_BACKUPS = [
  { id: '#BP-88291', time: 'Oct 24, 2023 - 03:00 AM', type: 'Automated', size: '4.2 GB', status: 'STABLE' },
  { id: '#BP-88285', time: 'Oct 23, 2023 - 03:00 AM', type: 'Automated', size: '4.1 GB', status: 'STABLE' },
  { id: '#BP-88122', time: 'Oct 22, 2023 - 11:45 PM', type: 'Manual', size: '1.8 GB', status: 'ARCHIVED' },
  { id: '#BP-88001', time: 'Oct 21, 2023 - 03:00 AM', type: 'Automated', size: '4.0 GB', status: 'CORRUPT' }
];

export default function BackupManagement() {
  const { addToast } = useToast();
  
  const [targetDest, setTargetDest] = useState('AWS S3 - North Virginia (us-east-1)');
  const [frequency, setFrequency] = useState('Daily');
  const [execTime, setExecTime] = useState('03:00 AM');
  const [retention, setRetention] = useState('30 DAYS DEFAULT');
  
  const [isSaving, setIsSaving] = useState(false);
  const [isTriggering, setIsTriggering] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  
  const [backups, setBackups] = useState(INITIAL_BACKUPS);

  const handleSaveConfigs = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      addToast("Backup configurations saved successfully!", "success");
    }, 1000);
  };

  const handleTriggerManual = () => {
    setIsTriggering(true);
    addToast("Initializing manual backup...", "info");
    setTimeout(() => {
      setIsTriggering(false);
      
      const newBackup = {
        id: `#BP-${Math.floor(Math.random() * 10000 + 89000)}`,
        time: 'Just now',
        type: 'Manual',
        size: '1.2 GB', // simulated size
        status: 'STABLE'
      };
      
      setBackups([newBackup, ...backups]);
      addToast("Manual backup completed and verified.", "success");
    }, 2000);
  };

  const filteredBackups = backups.filter(b => b.id.toLowerCase().includes(searchQuery.toLowerCase()));

  const getStatusStyle = (status) => {
    if (status === 'STABLE') return { bg: '#dcfce7', color: '#16a34a' };
    if (status === 'ARCHIVED') return { bg: '#e0f2fe', color: '#0284c7' };
    if (status === 'CORRUPT') return { bg: '#fee2e2', color: '#dc2626' };
    return { bg: '#f1f5f9', color: '#475569' };
  };

  return (
    <AdminShell
      activeTab="Settings"
      customProfileName="Alex Rivera"
      customProfileRole="Admin User"
      showGridIcon={true}
    >
      <div style={{ padding: '32px 40px 60px', maxWidth: '1200px' }}>
        
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '32px' }}>
          <div>
            <h1 style={{ fontSize: '24px', fontWeight: '800', color: '#0f172a', margin: '0 0 8px' }}>
              Backup Management
            </h1>
            <p style={{ fontSize: '13px', color: '#64748b', margin: 0 }}>
              Configure automated redundancy protocols and manage system restore points.
            </p>
          </div>
          <button 
            onClick={handleTriggerManual} 
            disabled={isTriggering}
            style={{ height: '40px', padding: '0 20px', background: '#312e81', border: 'none', borderRadius: '6px', fontSize: '12px', fontWeight: '700', color: '#fff', cursor: isTriggering ? 'not-allowed' : 'pointer', display: 'flex', alignItems: 'center', gap: '8px', opacity: isTriggering ? 0.8 : 1 }}
          >
            {isTriggering ? <Loader2 size={14} className="animate-spin" /> : <Play size={14} fill="#fff" />}
            {isTriggering ? 'Running Backup...' : 'Trigger Manual Backup'}
          </button>
        </div>

        {/* Top Section: Automated Scheduling */}
        <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: '12px', padding: 'var(--spacing-page)', boxShadow: '0 1px 3px rgba(0,0,0,0.02)', marginBottom: '32px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ width: '36px', height: '36px', background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Cloud size={18} color="#0f172a" />
              </div>
              <h2 style={{ fontSize: '16px', fontWeight: '800', color: '#0f172a', margin: 0 }}>Automated Scheduling</h2>
            </div>
            <span style={{ display: 'inline-block', background: '#f1f5f9', color: '#475569', fontSize: '9px', fontWeight: '800', padding: '4px 8px', borderRadius: '4px', letterSpacing: '0.5px' }}>
              S3 / CLOUD ACTIVE
            </span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px', marginBottom: '32px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-section)' }}>
              <div>
                <label style={{ display: 'block', fontSize: '11px', fontWeight: '800', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '8px' }}>Target Destination</label>
                <div style={{ position: 'relative' }}>
                  <Select
                    value={targetDest}
                    onChange={(e) => setTargetDest(e.target.value)}
                    style={{ width: '100%', height: '40px', border: '1px solid #e2e8f0', borderRadius: '6px', padding: '0 12px', fontSize: '13px', color: '#0f172a', boxSizing: 'border-box', outline: 'none', appearance: 'none', background: '#fff', cursor: 'pointer' }}
                    options={[
                      { label: "AWS S3 - North Virginia (us-east-1)", value: "AWS S3 - North Virginia (us-east-1)" }, 
                      { label: "GCP Cloud Storage (Multi-region)", value: "GCP Cloud Storage (Multi-region)" }, 
                      { label: "Azure Blob Storage", value: "Azure Blob Storage" }
                    ]} 
                  />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '11px', fontWeight: '800', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '8px' }}>Frequency</label>
                <div style={{ display: 'flex', border: '1px solid #e2e8f0', borderRadius: '6px', overflow: 'hidden' }}>
                  {['Daily', 'Weekly', 'Monthly'].map(f => (
                    <button 
                      key={f}
                      onClick={() => { setFrequency(f); addToast(`Frequency set to ${f}`, "info"); }} 
                      style={{ 
                        flex: 1, height: '36px', 
                        background: frequency === f ? '#312e81' : '#fff', 
                        border: 'none', 
                        borderLeft: f === 'Daily' ? 'none' : '1px solid #e2e8f0', 
                        color: frequency === f ? '#fff' : '#475569', 
                        fontSize: '11px', fontWeight: '700', cursor: 'pointer', transition: 'all 0.2s' 
                      }}
                    >
                      {f}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-section)' }}>
              <div>
                <label style={{ display: 'block', fontSize: '11px', fontWeight: '800', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '8px' }}>Preferred Execution Time</label>
                <input 
                  type="text" 
                  value={execTime} 
                  onChange={(e) => setExecTime(e.target.value)}
                  style={{ width: '100%', height: '40px', border: '1px solid #e2e8f0', borderRadius: '6px', padding: '0 12px', fontSize: '13px', color: '#0f172a', boxSizing: 'border-box', outline: 'none' }} 
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '11px', fontWeight: '800', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '8px' }}>Retention Policy</label>
                <div style={{ display: 'flex', alignItems: 'center', height: '36px', gap: 'var(--spacing-section)' }}>
                  {['7 DAYS', '30 DAYS DEFAULT', '90 DAYS'].map(r => (
                    <span 
                      key={r}
                      onClick={() => { setRetention(r); addToast(`Retention set to ${r}`, "info"); }} 
                      style={{ 
                        fontSize: '12px', fontWeight: '800', 
                        color: retention === r ? '#0f172a' : '#94a3b8', 
                        cursor: 'pointer', 
                        borderBottom: retention === r ? '2px solid #0f172a' : 'none', 
                        paddingBottom: retention === r ? '2px' : '0',
                        transition: 'all 0.2s'
                      }}
                    >
                      {r}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid #f1f5f9', paddingTop: '24px' }}>
            <span style={{ fontSize: '12px', color: '#64748b' }}>Last successful sync: <span style={{ color: '#0f172a', fontWeight: '600' }}>{backups[0]?.time === 'Just now' ? 'Just now' : '2 hours ago'}</span></span>
            <div style={{ display: 'flex', gap: '16px' }}>
              <button onClick={() => addToast("Credentials update prompt opened.", "info")} style={{ background: 'none', border: '1px solid #e2e8f0', borderRadius: '6px', padding: '0 16px', height: '36px', fontSize: '12px', fontWeight: '800', color: '#0f172a', cursor: 'pointer' }}>
                Update Credentials
              </button>
              <button 
                onClick={handleSaveConfigs} 
                disabled={isSaving}
                style={{ display: 'flex', alignItems: 'center', gap: '8px', background: '#09090b', border: 'none', borderRadius: '6px', padding: '0 20px', height: '36px', fontSize: '12px', fontWeight: '800', color: '#fff', cursor: isSaving ? 'not-allowed' : 'pointer', opacity: isSaving ? 0.8 : 1 }}
              >
                {isSaving && <Loader2 size={14} className="animate-spin" />}
                Save Configurations
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Section: Restore Points & History */}
        <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: '12px', boxShadow: '0 1px 3px rgba(0,0,0,0.02)', overflow: 'hidden' }}>
          <div style={{ padding: 'var(--spacing-section)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #e2e8f0' }}>
            <h2 style={{ fontSize: '16px', fontWeight: '800', color: '#0f172a', margin: 0 }}>Restore Points & History</h2>
            <div style={{ display: 'flex', gap: '12px' }}>
              <div style={{ position: 'relative' }}>
                <Search size={14} color="#94a3b8" style={{ position: 'absolute', left: '12px', top: '11px' }} />
                <input 
                  type="text" 
                  placeholder="Search by ID..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  style={{ height: '36px', width: '240px', border: '1px solid #e2e8f0', borderRadius: '6px', padding: '0 12px 0 32px', fontSize: '12px', outline: 'none' }} 
                />
              </div>
              <button onClick={() => addToast("Opening filter options...", "info")} style={{ height: '36px', padding: '0 16px', background: '#fff', border: '1px solid #e2e8f0', borderRadius: '6px', fontSize: '12px', fontWeight: '700', color: '#475569', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Filter size={14} /> Filter
              </button>
            </div>
          </div>

          <div className="table-responsive-wrapper">
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
              <thead>
                <tr style={{ background: '#f8fafc', borderBottom: '1px solid #e2e8f0' }}>
                  <th style={{ padding: '16px 24px', fontSize: '10px', fontWeight: '800', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.5px' }}>ID</th>
                  <th style={{ padding: '16px 24px', fontSize: '10px', fontWeight: '800', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.5px' }}>TIMESTAMP</th>
                  <th style={{ padding: '16px 24px', fontSize: '10px', fontWeight: '800', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.5px' }}>TYPE</th>
                  <th style={{ padding: '16px 24px', fontSize: '10px', fontWeight: '800', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.5px' }}>SIZE</th>
                  <th style={{ padding: '16px 24px', fontSize: '10px', fontWeight: '800', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.5px' }}>STATUS</th>
                  <th style={{ padding: '16px 24px', fontSize: '10px', fontWeight: '800', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.5px', textAlign: 'right' }}>ACTIONS</th>
                </tr>
              </thead>
              <tbody>
                {filteredBackups.map((backup, index) => {
                  const style = getStatusStyle(backup.status);
                  return (
                    <tr key={backup.id} className="animate-in fade-in slide-in-from-top-2" style={{ borderBottom: index === filteredBackups.length - 1 ? 'none' : '1px solid #f1f5f9' }}>
                      <td style={{ padding: '20px 24px', fontSize: '12px', fontWeight: '700', color: '#475569', fontFamily: "var(--materio-space)" }}>{backup.id}</td>
                      <td style={{ padding: '20px 24px', fontSize: '12px', color: '#334155' }}>{backup.time}</td>
                      <td style={{ padding: '20px 24px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#475569', fontSize: '12px' }}>
                          {backup.type === 'Automated' ? <Clock size={14} /> : <User size={14} />} {backup.type}
                        </div>
                      </td>
                      <td style={{ padding: '20px 24px', fontSize: '12px', color: '#334155' }}>{backup.size}</td>
                      <td style={{ padding: '20px 24px' }}>
                        <span style={{ display: 'inline-block', background: style.bg, color: style.color, fontSize: '9px', fontWeight: '800', padding: '4px 8px', borderRadius: '4px', letterSpacing: '0.5px' }}>
                          {backup.status}
                        </span>
                      </td>
                      <td style={{ padding: '20px 24px', textAlign: 'right' }}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '16px', opacity: backup.status === 'CORRUPT' ? 0.5 : 1 }}>
                          <button 
                            onClick={() => { if(backup.status !== 'CORRUPT') addToast(`Starting restore process for ${backup.id}...`, "info") }} 
                            disabled={backup.status === 'CORRUPT'}
                            style={{ background: 'none', border: 'none', fontSize: '11px', fontWeight: '800', color: backup.status === 'CORRUPT' ? '#94a3b8' : '#0f172a', cursor: backup.status === 'CORRUPT' ? 'not-allowed' : 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}
                          >
                            RESTORE
                          </button>
                          <MoreVertical size={16} color="#94a3b8" style={{ cursor: backup.status === 'CORRUPT' ? 'not-allowed' : 'pointer' }} />
                        </div>
                      </td>
                    </tr>
                  )
                })}
                {filteredBackups.length === 0 && (
                  <tr>
                    <td colSpan="6" style={{ padding: '40px', textAlign: 'center', color: '#64748b', fontSize: '13px' }}>
                      No backups found matching that ID.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </AdminShell>
  );
}
