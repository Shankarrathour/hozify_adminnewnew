import React from 'react';
import { 
  Play, Cloud, PenTool, AlertCircle, Search, Filter, 
  Clock, User, MoreVertical, RotateCcw, ChevronDown
} from 'lucide-react';
import AdminShell from '../../components/layouts/AdminShell';
import toast from 'react-hot-toast';
import Toggle from '../../components/common/Toggle';

import Select from "../../components/ui/Select";

export default function SystemBackupMaintenance() {
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
              System Backup & Maintenance
            </h1>
            <p style={{ fontSize: '13px', color: '#64748b', margin: 0 }}>
              Configure automated redundancy and system availability protocols.
            </p>
          </div>
          <button onClick={(e) => { e.preventDefault(); toast.success("Action performed successfully!"); }} style={{ height: '40px', padding: '0 20px', background: '#312e81', border: 'none', borderRadius: '6px', fontSize: '12px', fontWeight: '700', color: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Play size={14} fill="#fff" /> Trigger Manual Backup
          </button>
        </div>

        {/* Top Section: Backup (Left) | Maintenance (Right) */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: 'var(--spacing-section)', alignItems: 'start', marginBottom: '24px' }}>
          
          {/* Left Column: Automated Scheduling */}
          <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: '12px', padding: 'var(--spacing-page)', boxShadow: '0 1px 3px rgba(0,0,0,0.02)' }}>
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

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--spacing-section)', marginBottom: '24px' }}>
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
                <label style={{ display: 'block', fontSize: '11px', fontWeight: '800', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '8px' }}>Preferred Execution Time</label>
                <input type="text" defaultValue="03:00 AM" style={{ width: '100%', height: '40px', border: '1px solid #e2e8f0', borderRadius: '6px', padding: '0 12px', fontSize: '13px', color: '#0f172a', boxSizing: 'border-box', outline: 'none' }} />
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--spacing-section)', marginBottom: '32px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '11px', fontWeight: '800', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '8px' }}>Frequency</label>
                <div style={{ display: 'flex', border: '1px solid #e2e8f0', borderRadius: '6px', overflow: 'hidden' }}>
                  <button onClick={(e) => { e.preventDefault(); toast.success("Action performed successfully!"); }} style={{ flex: 1, height: '36px', background: '#312e81', border: 'none', color: '#fff', fontSize: '11px', fontWeight: '700', cursor: 'pointer' }}>Daily</button>
                  <button onClick={(e) => { e.preventDefault(); toast.success("Action performed successfully!"); }} style={{ flex: 1, height: '36px', background: '#fff', border: 'none', borderLeft: '1px solid #e2e8f0', color: '#475569', fontSize: '11px', fontWeight: '700', cursor: 'pointer' }}>Weekly</button>
                  <button onClick={(e) => { e.preventDefault(); toast.success("Action performed successfully!"); }} style={{ flex: 1, height: '36px', background: '#fff', border: 'none', borderLeft: '1px solid #e2e8f0', color: '#475569', fontSize: '11px', fontWeight: '700', cursor: 'pointer' }}>Monthly</button>
                </div>
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '11px', fontWeight: '800', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '8px' }}>Retention Policy</label>
                <div style={{ display: 'flex', alignItems: 'center', height: '36px', gap: '20px' }}>
                  <span onClick={(e) => { e.preventDefault(); toast.success("Action performed successfully!"); }} style={{ fontSize: '11px', fontWeight: '800', color: '#94a3b8', cursor: 'pointer' }}>7 DAYS</span>
                  <span onClick={(e) => { e.preventDefault(); toast.success("Action performed successfully!"); }} style={{ fontSize: '11px', fontWeight: '800', color: '#0f172a', cursor: 'pointer', borderBottom: '1px solid #0f172a', paddingBottom: '2px' }}>30 DAYS DEFAULT</span>
                  <span onClick={(e) => { e.preventDefault(); toast.success("Action performed successfully!"); }} style={{ fontSize: '11px', fontWeight: '800', color: '#94a3b8', cursor: 'pointer' }}>90 DAYS</span>
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid #f1f5f9', paddingTop: '24px' }}>
              <span style={{ fontSize: '12px', color: '#64748b' }}>Last successful sync: <span style={{ color: '#0f172a', fontWeight: '600' }}>2 hours ago</span></span>
              <button onClick={(e) => { e.preventDefault(); toast.success("Action performed successfully!"); }} style={{ background: 'none', border: 'none', fontSize: '12px', fontWeight: '800', color: '#0f172a', cursor: 'pointer' }}>
                Update Credentials
              </button>
            </div>
          </div>

          {/* Right Column: Maintenance Mode */}
          <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: '12px', padding: 'var(--spacing-page)', boxShadow: '0 1px 3px rgba(0,0,0,0.02)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
              <div style={{ width: '36px', height: '36px', background: '#fee2e2', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <PenTool size={18} color="#ef4444" />
              </div>
              <h2 style={{ fontSize: '16px', fontWeight: '800', color: '#0f172a', margin: 0 }}>Maintenance Mode</h2>
            </div>

            <div style={{ background: '#f1f5f9', borderRadius: '8px', padding: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
              <div>
                <h4 style={{ fontSize: '13px', fontWeight: '800', color: '#0f172a', margin: '0 0 2px' }}>System Status</h4>
                <p style={{ fontSize: '11px', color: '#64748b', margin: 0 }}>All systems operational</p>
              </div>
              <Toggle defaultChecked={false} />
            </div>

            <div style={{ marginBottom: '24px' }}>
              <label style={{ display: 'block', fontSize: '11px', fontWeight: '800', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '8px' }}>Public Announcement Message</label>
              <textarea 
                placeholder="e.g. System is undergoing scheduled maintenance. We'll be back at 04:00 UTC."
                style={{ width: '100%', height: '80px', border: '1px solid #e2e8f0', borderRadius: '6px', padding: '12px', fontSize: '13px', color: '#0f172a', boxSizing: 'border-box', outline: 'none', resize: 'none' }}
              />
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#dc2626', marginBottom: '16px' }}>
              <AlertCircle size={14} />
              <span style={{ fontSize: '10px', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.5px' }}>REQUIRES ADMIN 2FA CONFIRMATION</span>
            </div>

            <button onClick={(e) => { e.preventDefault(); toast.success("Action performed successfully!"); }} style={{ width: '100%', height: '40px', background: '#312e81', border: 'none', borderRadius: '6px', fontSize: '12px', fontWeight: '700', color: '#fff', cursor: 'pointer' }}>
              Save Maintenance State
            </button>
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
              <button onClick={(e) => { e.preventDefault(); toast.success("Action performed successfully!"); }} style={{ height: '36px', padding: '0 16px', background: '#fff', border: '1px solid #e2e8f0', borderRadius: '6px', fontSize: '12px', fontWeight: '700', color: '#475569', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}>
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
                    <button onClick={(e) => { e.preventDefault(); toast.success("Action performed successfully!"); }} style={{ background: 'none', border: 'none', fontSize: '11px', fontWeight: '800', color: '#0f172a', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}>
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
                    <button onClick={(e) => { e.preventDefault(); toast.success("Action performed successfully!"); }} style={{ background: 'none', border: 'none', fontSize: '11px', fontWeight: '800', color: '#0f172a', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}>
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
                    <button onClick={(e) => { e.preventDefault(); toast.success("Action performed successfully!"); }} style={{ background: 'none', border: 'none', fontSize: '11px', fontWeight: '800', color: '#0f172a', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}>
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
