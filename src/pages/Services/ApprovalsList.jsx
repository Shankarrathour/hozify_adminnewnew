import toast from 'react-hot-toast';
import React, { useState } from 'react';
import {
  SlidersHorizontal,
  Download,
  ChevronLeft,
  ChevronRight,
  Clock,
  ThumbsUp,
  XCircle,
  FileSearch,
  Cpu,
  Shield,
  Cloud,
  Layers
} from 'lucide-react';

const approvalQueueData = [
  {
    id: '#SRV-88291',
    name: 'Robotic Arm Calibration',
    partner: 'TechNexus Dynamics',
    category: 'Heavy Machinery',
    date: '2023-10-24 09:12',
    status: 'Pending',
    icon: Cpu
  },
  {
    id: '#SRV-88292',
    name: 'L3 Security Audit',
    partner: 'CyberShield Pro',
    category: 'IT & Compliance',
    date: '2023-10-23 15:45',
    status: 'Pending',
    icon: Shield
  },
  {
    id: '#SRV-88293',
    name: 'Cloud Migration Service',
    partner: 'BlueSky Cloud Corp',
    category: 'Software',
    date: '2023-10-23 11:20',
    status: 'Rejected',
    icon: Cloud
  },
  {
    id: '#SRV-88294',
    name: 'Grid Connectivity Setup',
    partner: 'VoltCore Systems',
    category: 'Facility',
    date: '2023-10-22 17:30',
    status: 'Pending',
    icon: Layers
  }
];

export default function ApprovalsList({ onViewDetails, onClose }) {
  const [approvals] = useState(approvalQueueData);
  // Status filters: 'ALL' ya 'Pending' ko toggle karne ke liye state
  const [statusFilter, setStatusFilter] = useState('ALL');

  // Top header filter button click handler (Pending status toggle)
  const handleToggleFilter = () => {
    setStatusFilter(prev => (prev === 'ALL' ? 'Pending' : 'ALL'));
  };

  // CSV Generator and Downloader logic
  const handleExportCSV = () => {
    // CSV Header row
    const headers = ['Service ID', 'Service Name', 'Partner', 'Category', 'Submitted Date', 'Status'];
    
    // Rows logic mapping
    const rows = approvals.map(app => [
      app.id,
      `"${app.name.replace(/"/g, '""')}"`, // escaping commas and quotes
      `"${app.partner.replace(/"/g, '""')}"`,
      `"${app.category.replace(/"/g, '""')}"`,
      app.date,
      app.status
    ]);

    const csvContent = [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    
    // Creating download element anchor
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', 'approval_queue_export.csv');
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Filter dynamic dataset rendering logic
  const displayedApprovals = approvals.filter(app => {
    if (statusFilter === 'Pending') {
      return app.status === 'Pending';
    }
    return true;
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-section)' }}>
      
      {/* Breadcrumbs & Back */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: 'var(--muted)', fontWeight: '700' }}>
          <span style={{ cursor: 'pointer' }} onClick={onClose}>Catalog</span>
          <span>&gt;</span>
          <span style={{ color: 'var(--text)' }}>Approval Queue</span>
        </div>
        
        <button
          onClick={onClose}
          style={{
            border: 'none',
            background: 'transparent',
            color: 'var(--primary)',
            fontSize: '13px',
            fontWeight: '700',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '4px'
          }}
          type="button"
        >
          <ArrowLeftIcon />
          <span>Back to Catalog</span>
        </button>
      </div>

      {/* Page Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h1 style={{ fontSize: '26px', fontWeight: '800', color: 'var(--text)', margin: 0 }}>Approval Queue</h1>
          <p style={{ fontSize: '14px', color: 'var(--muted)', marginTop: '4px', margin: 0 }}>Review and moderate incoming service requests from active partners.</p>
        </div>
        <div style={{ display: 'flex', gap: '12px' }}>
          {/* Functional Filter button */}
          <button
            onClick={handleToggleFilter}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              background: statusFilter === 'Pending' ? '#eff6ff' : '#ffffff',
              color: statusFilter === 'Pending' ? '#2563eb' : 'var(--text)',
              border: statusFilter === 'Pending' ? '1px solid #2563eb' : '1.5px solid #25108f',
              borderRadius: '6px',
              padding: '8px 16px',
              fontSize: '13px',
              fontWeight: '700',
              cursor: 'pointer',
              transition: 'all 0.2s'
            }}
            type="button"
          >
            <SlidersHorizontal size={16} />
            <span>{statusFilter === 'Pending' ? 'Showing Pending' : 'Filter Pending'}</span>
          </button>
          
          {/* Functional CSV Export button */}
          <button
            onClick={handleExportCSV}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              background: '#ffffff',
              color: 'var(--text)',
              border: '1.5px solid #25108f',
              borderRadius: '6px',
              padding: '8px 16px',
              fontSize: '13px',
              fontWeight: '700',
              cursor: 'pointer'
            }}
            type="button"
          >
            <Download size={16} />
            <span>Export CSV</span>
          </button>
        </div>
      </div>

      {/* KPI summaries row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px' }}>
        
        {/* Total Pending */}
        <div className="panel" style={{ background: '#ffffff', borderRadius: '12px', border: '1.5px solid #25108f', padding: '20px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '10px', fontWeight: '800', color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Total Pending</span>
            <FileSearch size={18} style={{ color: '#d97706' }} />
          </div>
          <strong style={{ fontSize: '24px', fontWeight: '800', color: 'var(--text)' }}>24</strong>
          <span style={{ fontSize: '11px', color: '#059669', fontWeight: '700' }}>📈 +12%</span>
          <div style={{ height: '4px', background: '#fef3c7', borderRadius: '2px', overflow: 'hidden', marginTop: '4px' }}>
            <div style={{ width: '60%', height: '100%', background: '#f59e0b' }} />
          </div>
        </div>

        {/* Rejected (7d) */}
        <div className="panel" style={{ background: '#ffffff', borderRadius: '12px', border: '1.5px solid #25108f', padding: '20px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '10px', fontWeight: '800', color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Rejected (7d)</span>
            <XCircle size={18} style={{ color: '#dc2626' }} />
          </div>
          <strong style={{ fontSize: '24px', fontWeight: '800', color: 'var(--text)' }}>08</strong>
          <span style={{ fontSize: '11px', color: '#ef4444', fontWeight: '700' }}>📉 -3%</span>
          <div style={{ height: '4px', background: '#fee2e2', borderRadius: '2px', overflow: 'hidden', marginTop: '4px' }}>
            <div style={{ width: '30%', height: '100%', background: '#ef4444' }} />
          </div>
        </div>

        {/* Avg Response */}
        <div className="panel" style={{ background: '#ffffff', borderRadius: '12px', border: '1.5px solid #25108f', padding: '20px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '10px', fontWeight: '800', color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Avg. Response</span>
            <Clock size={18} style={{ color: '#2563eb' }} />
          </div>
          <strong style={{ fontSize: '24px', fontWeight: '800', color: 'var(--text)' }}>4.2h</strong>
          <span style={{ fontSize: '11px', color: '#059669', fontWeight: '700' }}>📉 -15%</span>
          <div style={{ height: '4px', background: '#dbeafe', borderRadius: '2px', overflow: 'hidden', marginTop: '4px' }}>
            <div style={{ width: '45%', height: '100%', background: '#3b82f6' }} />
          </div>
        </div>

        {/* Approval Rate */}
        <div className="panel" style={{ background: '#ffffff', borderRadius: '12px', border: '1.5px solid #25108f', padding: '20px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '10px', fontWeight: '800', color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Approval Rate</span>
            <ThumbsUp size={18} style={{ color: '#059669' }} />
          </div>
          <strong style={{ fontSize: '24px', fontWeight: '800', color: 'var(--text)' }}>94.1%</strong>
          <span style={{ fontSize: '11px', color: '#059669', fontWeight: '700' }}>📈 +2%</span>
          <div style={{ height: '4px', background: '#dcfce7', borderRadius: '2px', overflow: 'hidden', marginTop: '4px' }}>
            <div style={{ width: '94%', height: '100%', background: '#10b981' }} />
          </div>
        </div>
      </div>

      {/* Approvals Table Card */}
      <div className="panel" style={{ background: '#ffffff', border: '1.5px solid #25108f', borderRadius: '12px', padding: 'var(--spacing-section)' }}>
        
        {/* Table Filter Top header - Unnecessary controls completely removed */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '12px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <strong style={{ fontSize: '15px', color: 'var(--text)' }}>Queue Items</strong>
            <span style={{ fontSize: '10px', fontWeight: '800', color: '#2563eb', background: '#eff6ff', padding: '3px 8px', borderRadius: '12px' }}>
              {statusFilter === 'Pending' ? `${displayedApprovals.length} PENDING` : '24 NEW'}
            </span>
          </div>
        </div>

        {/* Table Content */}
        <div style={{ overflowY: 'auto', maxHeight: '400px' }}>
          <div className="table-responsive-wrapper">
<table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
              <thead>
                <tr style={{ borderBottom: '1.5px solid #25108f' }}>
                  <th style={{ padding: '12px 8px', fontSize: '11px', fontWeight: '800', color: 'var(--muted)', textTransform: 'uppercase' }}>Service Name</th>
                  <th style={{ padding: '12px 8px', fontSize: '11px', fontWeight: '800', color: 'var(--muted)', textTransform: 'uppercase' }}>Partner</th>
                  <th style={{ padding: '12px 8px', fontSize: '11px', fontWeight: '800', color: 'var(--muted)', textTransform: 'uppercase' }}>Category</th>
                  <th style={{ padding: '12px 8px', fontSize: '11px', fontWeight: '800', color: 'var(--muted)', textTransform: 'uppercase' }}>Submitted Date</th>
                  <th style={{ padding: '12px 8px', fontSize: '11px', fontWeight: '800', color: 'var(--muted)', textTransform: 'uppercase' }}>Status</th>
                  <th style={{ padding: '12px 8px', width: '60px' }} />
                </tr>
              </thead>
              <tbody>
                {displayedApprovals.map((app) => {
                  const CategoryIcon = app.icon;
                  return (
                    <tr
                      key={app.id}
                      onClick={() => onViewDetails(app.id)}
                      style={{ borderBottom: '1px solid #f1f5f9', cursor: 'pointer', transition: 'background 0.2s' }}
                      onMouseEnter={(e) => e.currentTarget.style.background = '#f8fafc'}
                      onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                    >
                      {/* Name */}
                      <td style={{ padding: '16px 8px' }}>
                        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '36px', height: '36px', borderRadius: '8px', background: '#eff6ff', color: '#2563eb' }}>
                            <CategoryIcon size={18} />
                          </div>
                          <div>
                            <strong style={{ display: 'block', fontSize: '14px', color: 'var(--text)' }}>{app.name}</strong>
                          </div>
                        </div>
                      </td>

                      {/* Partner */}
                      <td style={{ padding: '16px 8px', fontSize: '13px', color: 'var(--muted)', fontWeight: '700' }}>
                        {app.partner}
                      </td>

                      {/* Category */}
                      <td style={{ padding: '16px 8px' }}>
                        <span style={{ fontSize: '11px', fontWeight: '800', background: '#f1f5f9', color: 'var(--muted)', padding: '4px 8px', borderRadius: '4px' }}>
                          {app.category}
                        </span>
                      </td>

                      {/* Date */}
                      <td style={{ padding: '16px 8px', fontSize: '13px', color: 'var(--muted)' }}>
                        {app.date}
                      </td>

                      {/* Status */}
                      <td style={{ padding: '16px 8px' }}>
                        <span
                          style={{
                            fontSize: '10px',
                            fontWeight: '800',
                            padding: '4px 8px',
                            borderRadius: '4px',
                            background: app.status === 'Pending' ? '#fffbeb' : '#fef2f2',
                            color: app.status === 'Pending' ? '#d97706' : '#dc2626'
                          }}
                        >
                          ● {app.status}
                        </span>
                      </td>

                      {/* Actions */}
                      <td style={{ padding: '16px 8px', textAlign: 'center' }}>
                        <button
                          onClick={(e) => { e.stopPropagation(); onViewDetails(app.id); }}
                          style={{ border: 'none', background: 'transparent', color: '#4f46e5', fontSize: '12px', fontWeight: '800', cursor: 'pointer' }}
                          type="button"
                        >
                          Review
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
</div>
        </div>

        {/* Pagination Row */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '20px', flexWrap: 'wrap', gap: '16px' }}>
          <span style={{ fontSize: '13px', color: 'var(--muted)' }}>
            Showing <strong>{displayedApprovals.length}</strong> of <strong>{approvals.length}</strong> results
          </span>

          <div style={{ display: 'flex', border: '1.5px solid #25108f', borderRadius: '6px', overflow: 'hidden' }}>
            <button style={{ border: 'none', background: '#ffffff', color: 'var(--muted)', padding: '8px 10px', cursor: 'pointer', display: 'flex', alignItems: 'center' }} type="button" onClick={(e) => { e.preventDefault(); e.stopPropagation(); toast.success("Action performed successfully!"); }}>
              <ChevronLeft size={16} />
            </button>
            <button style={{ border: 'none', background: 'var(--primary)', color: '#ffffff', padding: '8px 14px', fontSize: '13px', fontWeight: '800', cursor: 'pointer' }} type="button" onClick={(e) => { e.preventDefault(); e.stopPropagation(); toast.success("Action performed successfully!"); }}>
              1
            </button>
            <button style={{ border: 'none', background: '#ffffff', color: 'var(--muted)', padding: '8px 14px', fontSize: '13px', fontWeight: '700', cursor: 'pointer' }} type="button" onClick={(e) => { e.preventDefault(); e.stopPropagation(); toast.success("Action performed successfully!"); }}>
              2
            </button>
            <button style={{ border: 'none', background: '#ffffff', color: 'var(--muted)', padding: '8px 14px', fontSize: '13px', fontWeight: '700', cursor: 'pointer' }} type="button" onClick={(e) => { e.preventDefault(); e.stopPropagation(); toast.success("Action performed successfully!"); }}>
              3
            </button>
            <button style={{ border: 'none', background: '#ffffff', color: 'var(--muted)', padding: '8px 10px', cursor: 'pointer', display: 'flex', alignItems: 'center' }} type="button" onClick={(e) => { e.preventDefault(); e.stopPropagation(); toast.success("Action performed successfully!"); }}>
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>

    </div>
  );
}

// Simple Back Arrow SVG icon
function ArrowLeftIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <line x1="19" y1="12" x2="5" y2="12"></line>
      <polyline points="12 19 5 12 12 5"></polyline>
    </svg>
  );
}


