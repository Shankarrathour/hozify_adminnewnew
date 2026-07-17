import React, { useState } from 'react';
import { 
  Play, Cloud, Search, Filter, Clock, User, MoreVertical, ChevronDown
} from 'lucide-react';
import AdminShell from '../../components/layouts/AdminShell';
import { useToast } from '../../components/common/ToastNotification';

import Select from "../../components/ui/Select";

export default function BackupManagement() {
  const { addToast } = useToast();
  const [frequency, setFrequency] = useState('Daily');
  const [retention, setRetention] = useState('30 DAYS DEFAULT');
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
          <button onClick={(e) => { e.preventDefault(); addToast("Manual backup triggered.", "success"); }} style={{ height: '40px', padding: '0 20px', background: '#312e81', border: 'none', borderRadius: '6px', fontSize: '12px', fontWeight: '700', color: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Play size={14} fill="#fff" /> Trigger Manual Backup
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
                    style={{ width: '100%', height: '40px', border: '1px solid #e2e8f0', borderRadius: '6px', padding: '0 12px', fontSize: '13px', color: '#0f172a', boxSizing: 'border-box', outline: 'none', appearance: 'none', background: '#fff', cursor: 'pointer' }}
                    options={[{
                      label: "AWS S3 - North Virginia (us-east-1)",
                      value: "AWS S3 - North Virginia (us-east-1)"
                    }, {
                      label: "GCP Cloud Storage (Multi-region)",
                      value: "GCP Cloud Storage (Multi-region)"
                    }, {
                      label: "Azure Blob Storage",
                      value: "Azure Blob Storage"
                    }]} />

                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '11px', fontWeight: '800', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '8px' }}>Frequency</label>
                <div style={{ display: 'flex', border: '1px solid #e2e8f0', borderRadius: '6px', overflow: 'hidden' }}>
                  <button onClick={(e) => { e.preventDefault(); setFrequency('Daily'); addToast("Frequency set to Daily", "info"); }} style={{ flex: 1, height: '36px', background: frequency === 'Daily' ? '#312e81' : '#fff', border: 'none', color: frequency === 'Daily' ? '#fff' : '#475569', fontSize: '11px', fontWeight: '700', cursor: 'pointer' }}>Daily</button>
                  <button onClick={(e) => { e.preventDefault(); setFrequency('Weekly'); addToast("Frequency set to Weekly", "info"); }} style={{ flex: 1, height: '36px', background: frequency === 'Weekly' ? '#312e81' : '#fff', border: 'none', borderLeft: frequency === 'Weekly' ? 'none' : '1px solid #e2e8f0', color: frequency === 'Weekly' ? '#fff' : '#475569', fontSize: '11px', fontWeight: '700', cursor: 'pointer' }}>Weekly</button>
                  <button onClick={(e) => { e.preventDefault(); setFrequency('Monthly'); addToast("Frequency set to Monthly", "info"); }} style={{ flex: 1, height: '36px', background: frequency === 'Monthly' ? '#312e81' : '#fff', border: 'none', borderLeft: frequency === 'Monthly' ? 'none' : '1px solid #e2e8f0', color: frequency === 'Monthly' ? '#fff' : '#475569', fontSize: '11px', fontWeight: '700', cursor: 'pointer' }}>Monthly</button>
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-section)' }}>
              <div>
                <label style={{ display: 'block', fontSize: '11px', fontWeight: '800', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '8px' }}>Preferred Execution Time</label>
                <input type="text" defaultValue="03:00 AM" style={{ width: '100%', height: '40px', border: '1px solid #e2e8f0', borderRadius: '6px', padding: '0 12px', fontSize: '13px', color: '#0f172a', boxSizing: 'border-box', outline: 'none' }} />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '11px', fontWeight: '800', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '8px' }}>Retention Policy</label>
                <div style={{ display: 'flex', alignItems: 'center', height: '36px', gap: 'var(--spacing-section)' }}>
                  <span onClick={(e) => { e.preventDefault(); setRetention('7 DAYS'); addToast("Retention set to 7 Days", "info"); }} style={{ fontSize: '12px', fontWeight: '800', color: retention === '7 DAYS' ? '#0f172a' : '#94a3b8', cursor: 'pointer', borderBottom: retention === '7 DAYS' ? '2px solid #0f172a' : 'none', paddingBottom: retention === '7 DAYS' ? '2px' : '0' }}>7 DAYS</span>
                  <span onClick={(e) => { e.preventDefault(); setRetention('30 DAYS DEFAULT'); addToast("Retention set to 30 Days", "info"); }} style={{ fontSize: '12px', fontWeight: '800', color: retention === '30 DAYS DEFAULT' ? '#0f172a' : '#94a3b8', cursor: 'pointer', borderBottom: retention === '30 DAYS DEFAULT' ? '2px solid #0f172a' : 'none', paddingBottom: retention === '30 DAYS DEFAULT' ? '2px' : '0' }}>30 DAYS DEFAULT</span>
                  <span onClick={(e) => { e.preventDefault(); setRetention('90 DAYS'); addToast("Retention set to 90 Days", "info"); }} style={{ fontSize: '12px', fontWeight: '800', color: retention === '90 DAYS' ? '#0f172a' : '#94a3b8', cursor: 'pointer', borderBottom: retention === '90 DAYS' ? '2px solid #0f172a' : 'none', paddingBottom: retention === '90 DAYS' ? '2px' : '0' }}>90 DAYS</span>
                </div>
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid #f1f5f9', paddingTop: '24px' }}>
            <span style={{ fontSize: '12px', color: '#64748b' }}>Last successful sync: <span style={{ color: '#0f172a', fontWeight: '600' }}>2 hours ago</span></span>
            <div style={{ display: 'flex', gap: '16px' }}>
              <button onClick={(e) => { e.preventDefault(); addToast("Credentials updated successfully.", "success"); }} style={{ background: 'none', border: '1px solid #e2e8f0', borderRadius: '6px', padding: '0 16px', height: '36px', fontSize: '12px', fontWeight: '800', color: '#0f172a', cursor: 'pointer' }}>
                Update Credentials
              </button>
              <button onClick={(e) => { e.preventDefault(); addToast("Backup configurations saved!", "success"); }} style={{ background: '#09090b', border: 'none', borderRadius: '6px', padding: '0 20px', height: '36px', fontSize: '12px', fontWeight: '800', color: '#fff', cursor: 'pointer' }}>
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
                <input type="text" placeholder="Search points..." style={{ height: '36px', width: '240px', border: '1px solid #e2e8f0', borderRadius: '6px', padding: '0 12px 0 32px', fontSize: '12px', outline: 'none' }} />
              </div>
              <button onClick={(e) => { e.preventDefault(); addToast("Opening filter options...", "info"); }} style={{ height: '36px', padding: '0 16px', background: '#fff', border: '1px solid #e2e8f0', borderRadius: '6px', fontSize: '12px', fontWeight: '700', color: '#475569', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}>
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
              {/* Row 1 */}
              <tr style={{ borderBottom: '1px solid #f1f5f9' }}>
                <td style={{ padding: '20px 24px', fontSize: '12px', fontWeight: '700', color: '#475569', fontFamily: "var(--materio-space)", }}>#BP-88291</td>
                <td style={{ padding: '20px 24px', fontSize: '12px', color: '#334155' }}>Oct 24, 2023 - 03:00 AM</td>
                <td style={{ padding: '20px 24px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#475569', fontSize: '12px' }}>
                    <Clock size={14} /> Automated
                  </div>
                </td>
                <td style={{ padding: '20px 24px', fontSize: '12px', color: '#334155' }}>4.2 GB</td>
                <td style={{ padding: '20px 24px' }}>
                  <span style={{ display: 'inline-block', background: '#dcfce7', color: '#16a34a', fontSize: '9px', fontWeight: '800', padding: '4px 8px', borderRadius: '4px', letterSpacing: '0.5px' }}>STABLE</span>
                </td>
                <td style={{ padding: '20px 24px', textAlign: 'right' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '16px' }}>
                    <button onClick={(e) => { e.preventDefault(); addToast("Starting restore process...", "info"); }} style={{ background: 'none', border: 'none', fontSize: '11px', fontWeight: '800', color: '#0f172a', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}>
                      RESTORE
                    </button>
                    <MoreVertical size={16} color="#94a3b8" style={{ cursor: 'pointer' }} />
                  </div>
                </td>
              </tr>

              {/* Row 2 */}
              <tr style={{ borderBottom: '1px solid #f1f5f9' }}>
                <td style={{ padding: '20px 24px', fontSize: '12px', fontWeight: '700', color: '#475569', fontFamily: "var(--materio-space)", }}>#BP-88285</td>
                <td style={{ padding: '20px 24px', fontSize: '12px', color: '#334155' }}>Oct 23, 2023 - 03:00 AM</td>
                <td style={{ padding: '20px 24px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#475569', fontSize: '12px' }}>
                    <Clock size={14} /> Automated
                  </div>
                </td>
                <td style={{ padding: '20px 24px', fontSize: '12px', color: '#334155' }}>4.1 GB</td>
                <td style={{ padding: '20px 24px' }}>
                  <span style={{ display: 'inline-block', background: '#dcfce7', color: '#16a34a', fontSize: '9px', fontWeight: '800', padding: '4px 8px', borderRadius: '4px', letterSpacing: '0.5px' }}>STABLE</span>
                </td>
                <td style={{ padding: '20px 24px', textAlign: 'right' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '16px' }}>
                    <button onClick={(e) => { e.preventDefault(); addToast("Starting restore process...", "info"); }} style={{ background: 'none', border: 'none', fontSize: '11px', fontWeight: '800', color: '#0f172a', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}>
                      RESTORE
                    </button>
                    <MoreVertical size={16} color="#94a3b8" style={{ cursor: 'pointer' }} />
                  </div>
                </td>
              </tr>

              {/* Row 3 */}
              <tr style={{ borderBottom: '1px solid #f1f5f9' }}>
                <td style={{ padding: '20px 24px', fontSize: '12px', fontWeight: '700', color: '#475569', fontFamily: "var(--materio-space)", }}>#BP-88122</td>
                <td style={{ padding: '20px 24px', fontSize: '12px', color: '#334155' }}>Oct 22, 2023 - 11:45 PM</td>
                <td style={{ padding: '20px 24px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#475569', fontSize: '12px' }}>
                    <User size={14} /> Manual
                  </div>
                </td>
                <td style={{ padding: '20px 24px', fontSize: '12px', color: '#334155' }}>1.8 GB</td>
                <td style={{ padding: '20px 24px' }}>
                  <span style={{ display: 'inline-block', background: '#e0f2fe', color: '#0284c7', fontSize: '9px', fontWeight: '800', padding: '4px 8px', borderRadius: '4px', letterSpacing: '0.5px' }}>ARCHIVED</span>
                </td>
                <td style={{ padding: '20px 24px', textAlign: 'right' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '16px' }}>
                    <button onClick={(e) => { e.preventDefault(); addToast("Starting restore process...", "info"); }} style={{ background: 'none', border: 'none', fontSize: '11px', fontWeight: '800', color: '#0f172a', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}>
                      RESTORE
                    </button>
                    <MoreVertical size={16} color="#94a3b8" style={{ cursor: 'pointer' }} />
                  </div>
                </td>
              </tr>

              {/* Row 4 */}
              <tr>
                <td style={{ padding: '20px 24px', fontSize: '12px', fontWeight: '700', color: '#475569', fontFamily: "var(--materio-space)", }}>#BP-88001</td>
                <td style={{ padding: '20px 24px', fontSize: '12px', color: '#334155' }}>Oct 21, 2023 - 03:00 AM</td>
                <td style={{ padding: '20px 24px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#475569', fontSize: '12px' }}>
                    <Clock size={14} /> Automated
                  </div>
                </td>
                <td style={{ padding: '20px 24px', fontSize: '12px', color: '#334155' }}>4.0 GB</td>
                <td style={{ padding: '20px 24px' }}>
                  <span style={{ display: 'inline-block', background: '#fee2e2', color: '#dc2626', fontSize: '9px', fontWeight: '800', padding: '4px 8px', borderRadius: '4px', letterSpacing: '0.5px' }}>CORRUPT</span>
                </td>
                <td style={{ padding: '20px 24px', textAlign: 'right' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '16px', opacity: 0.5 }}>
                    <button onClick={(e) => { e.preventDefault(); toast.success("Action performed successfully!"); }} style={{ background: 'none', border: 'none', fontSize: '11px', fontWeight: '800', color: '#94a3b8', cursor: 'not-allowed', display: 'flex', alignItems: 'center', gap: '6px' }}>
                      RESTORE
                    </button>
                    <MoreVertical size={16} color="#94a3b8" style={{ cursor: 'not-allowed' }} />
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
</div>
        </div>

      </div>
    </AdminShell>
  );
}
