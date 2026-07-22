import React, { useState } from 'react';
import { useToast } from '../../components/common/ToastNotification';
import { 
  ClipboardList, 
  Clock, 
  AlertTriangle, 
  Check, 
  X, 
  ArrowLeft, 
  ChevronRight, 
  ChevronLeft,
  Search,
  User,
  Building2,
  FileText
} from 'lucide-react';
import AdminShell from '../../components/layouts/AdminShell';

export default function ApprovalsDashboard({ activeTab = 'Dashboard' }) {
  const { addToast } = useToast();
  const [currentSubTab, setCurrentSubTab] = useState('Pending KYC');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const subTabs = [
    'Pending KYC',
    'Pending Partner',
    'Pending Branch',
    'Pending Service',
    'Withdrawals',
    'Quotations',
    'Material Requests'
  ];

  const allItems = [
    { priority: "High", owner: "Sarah Johnson", id: "USR-9283-KYC", date: "Oct 24, 2023 11:20 AM", type: "Individual KYC", tab: 'Pending KYC', status: "UNDER REVIEW", statusColor: "#1e3a8a", statusBg: "#dbeafe" },
    { priority: "Medium", owner: "Michael Zhang", id: "USR-1102-KYC", date: "Oct 24, 2023 09:15 AM", type: "Partner KYC", tab: 'Pending KYC', status: "QUEUED", statusColor: "#475569", statusBg: "#f1f5f9" },
    { priority: "High", owner: "Priya Sharma", id: "USR-8821-KYC", date: "Oct 23, 2023 04:50 PM", type: "Individual KYC", tab: 'Pending KYC', status: "RE-SUBMITTED", statuscolor: 'var(--primary)', statusBg: "#f4eff8" },
    { priority: "Medium", owner: "Urban Styles Ltd", id: "BIZ-4491-REG", date: "Oct 23, 2023 02:10 PM", type: "Business License", tab: 'Pending Partner', status: "QUEUED", statusColor: "#475569", statusBg: "#f1f5f9" },
    { priority: "High", owner: "Nexis Logistics", id: "PRT-99201", date: "Oct 23, 2023 01:10 PM", type: "Partner Agreement", tab: 'Pending Partner', status: "UNDER REVIEW", statusColor: "#1e3a8a", statusBg: "#dbeafe" },
    { priority: "Low", owner: "London Branch", id: "BRN-5531", date: "Oct 22, 2023 10:00 AM", type: "Branch Approval", tab: 'Pending Branch', status: "QUEUED", statusColor: "#475569", statusBg: "#f1f5f9" },
    { priority: "Medium", owner: "Cloud Hosting", id: "SRV-2291", date: "Oct 24, 2023 08:30 AM", type: "Service Provision", tab: 'Pending Service', status: "UNDER REVIEW", statusColor: "#1e3a8a", statusBg: "#dbeafe" },
    { priority: "High", owner: "James Smith", id: "WDL-1109", date: "Oct 25, 2023 11:45 AM", type: "Withdrawal Request", tab: 'Withdrawals', status: "QUEUED", statusColor: "#475569", statusBg: "#f1f5f9" },
    { priority: "Medium", owner: "TechCorp Inc.", id: "QUO-4492", date: "Oct 25, 2023 01:20 PM", type: "Enterprise Quote", tab: 'Quotations', status: "UNDER REVIEW", statusColor: "#1e3a8a", statusBg: "#dbeafe" },
    { priority: "Low", owner: "Warehouse B", id: "MAT-9921", date: "Oct 25, 2023 03:10 PM", type: "Material Restock", tab: 'Material Requests', status: "QUEUED", statusColor: "#475569", statusBg: "#f1f5f9" }
  ];

  const pendingItems = allItems.filter(item => item.tab === currentSubTab);

  const handleAction = (id, action) => {
    addToast(`Approvals action "${action}" executed for entity ID: ${id}`, action === 'Approve' ? 'success' : 'error');
  };

  return (
    <AdminShell showGlobalExport={true}
      activeTab={activeTab}
      brandText="HOZIFY"
      brandSubText="Enterprise Admin"
      headerTitle="Approvals Command"
      searchPlaceholder="Search approvals, entities, or IDs..."
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-section)', padding: '24px 0' }}>
        
        {/* Title */}
        <div>
          <h1 style={{ fontSize: '24px', fontWeight: '800', color: 'var(--text)', margin: 0 }}>
            Approvals
          </h1>
          <p style={{ fontSize: '13px', color: 'var(--muted)', margin: '4px 0 0' }}>
            Manage 24 pending administrative actions.
          </p>
        </div>

        {/* Stats Summary Rows */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
          
          <div className="panel" style={{ padding: '20px', display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{ height: '40px', width: '40px', borderRadius: '50%', background: '#f4eff8', color: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <ClipboardList size={18} />
            </div>
            <div>
              <span style={{ fontSize: '10px', fontWeight: '800', color: 'var(--muted)', textTransform: 'uppercase' }}>Total Pending</span>
              <strong style={{ display: 'block', fontSize: '22px', fontWeight: '850', color: 'var(--text)', marginTop: '2px' }}>142 Actions</strong>
            </div>
          </div>

          <div className="panel" style={{ padding: '20px', display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{ height: '40px', width: '40px', borderRadius: '50%', background: '#fffbeb', color: '#b45309', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Clock size={18} />
            </div>
            <div>
              <span style={{ fontSize: '10px', fontWeight: '800', color: 'var(--muted)', textTransform: 'uppercase' }}>Avg. Turnaround Time</span>
              <strong style={{ display: 'block', fontSize: '22px', fontWeight: '850', color: 'var(--text)', marginTop: '2px' }}>4.2 Hours</strong>
            </div>
          </div>

          <div className="panel" style={{ padding: '20px', display: 'flex', alignItems: 'center', gap: '16px', borderLeft: '4px solid #d32929' }}>
            <div style={{ height: '40px', width: '40px', borderRadius: '50%', background: '#fee2e2', color: 'var(--red)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <AlertTriangle size={18} />
            </div>
            <div>
              <span style={{ fontSize: '10px', fontWeight: '800', color: 'var(--muted)', textTransform: 'uppercase' }}>High Priority Alerts</span>
              <strong style={{ display: 'block', fontSize: '22px', fontWeight: '850', color: 'var(--red)', marginTop: '2px' }}>08 Pending</strong>
            </div>
          </div>

        </div>

        {/* Tab Selection Navigation Bar */}
        <div style={{ borderBottom: '1.5px solid #25108f', display: 'flex', gap: '8px', overflowY: 'auto', maxHeight: '400px', paddingBottom: '2px' }}>
          {subTabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setCurrentSubTab(tab)}
              style={{
                border: 'none',
                background: 'transparent',
                padding: '12px 16px',
                fontSize: '13px',
                fontWeight: '750',
                color: currentSubTab === tab ? '#25108f' : 'var(--muted)',
                borderBottom: currentSubTab === tab ? '3px solid #25108f' : '3px solid transparent',
                cursor: 'pointer',
                whiteSpace: 'nowrap'
              }}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Table list queue */}
        <div className="panel" style={{ padding: 'var(--spacing-section)' }}>
          <div className="table-wrap">
            <div className="table-responsive-wrapper">
<table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px', textAlign: 'left' }}>
              <thead>
                <tr style={{ background: '#f4eff8', borderBottom: '1.5px solid #25108f' }}>
                  <th style={{ padding: '12px 16px', color: 'var(--muted)', fontWeight: '800', textTransform: 'uppercase', fontSize: '10px' }}>Priority</th>
                  <th style={{ padding: '12px 16px', color: 'var(--muted)', fontWeight: '800', textTransform: 'uppercase', fontSize: '10px' }}>Entity / ID</th>
                  <th style={{ padding: '12px 16px', color: 'var(--muted)', fontWeight: '800', textTransform: 'uppercase', fontSize: '10px' }}>Submitted Date</th>
                  <th style={{ padding: '12px 16px', color: 'var(--muted)', fontWeight: '800', textTransform: 'uppercase', fontSize: '10px' }}>Type</th>
                  <th style={{ padding: '12px 16px', color: 'var(--muted)', fontWeight: '800', textTransform: 'uppercase', fontSize: '10px' }}>Status</th>
                  <th style={{ padding: '12px 16px', color: 'var(--muted)', fontWeight: '800', textTransform: 'uppercase', fontSize: '10px', textAlign: 'right' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {pendingItems.length > 0 ? (
                  pendingItems.map((item, idx) => {
                    const isHigh = item.priority === 'High';
                    const isBusiness = item.type.includes('Business');
                    return (
                      <tr key={idx} style={{ borderBottom: '1px solid var(--lavender)' }}>
                      <td style={{ padding: '16px' }}>
                        <span style={{
                          fontSize: '10px',
                          fontWeight: '850',
                          background: isHigh ? '#fee2e2' : '#f1f5f9',
                          color: isHigh ? '#d32929' : 'var(--muted)',
                          padding: '3px 8px',
                          borderRadius: '4px'
                        }}>
                          {item.priority}
                        </span>
                      </td>
                      <td style={{ padding: '16px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <div style={{
                            height: '32px', width: '32px', borderRadius: '4px',
                            background: '#f8fafc', border: '1.5px solid #25108f',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            color: '#64748b'
                          }}>
                            {isBusiness ? <Building2 size={15} /> : <User size={15} />}
                          </div>
                          <div>
                            <strong style={{ display: 'block', color: 'var(--text)' }}>{item.owner}</strong>
                            <span style={{ fontSize: '11px', color: 'var(--muted)' }}>{item.id}</span>
                          </div>
                        </div>
                      </td>
                      <td style={{ padding: '16px', color: 'var(--muted)', fontWeight: '650' }}>{item.date}</td>
                      <td style={{ padding: '16px', fontWeight: '700', color: 'var(--text)' }}>{item.type}</td>
                      <td style={{ padding: '16px' }}>
                        <span style={{
                          fontSize: '9px',
                          fontWeight: '850',
                          color: item.statusColor,
                          background: item.statusBg,
                          padding: '3px 8px',
                          borderRadius: '4px',
                          border: `1px solid ${item.statusColor}20`
                        }}>
                          {item.status}
                        </span>
                      </td>
                      <td style={{ padding: '16px', textAlign: 'right' }}>
                        <div style={{ display: 'flex', gap: '6px', justifyContent: 'flex-end' }}>
                          <button
                            onClick={() => handleAction(item.id, 'Approve')}
                            style={{
                              border: 'none', background: '#ecfdf5', color: 'var(--green)',
                              height: '28px', padding: '0 10px', borderRadius: '4px',
                              fontWeight: '750', fontSize: '11px', cursor: 'pointer'
                            }}
                          >
                            Approve
                          </button>
                          <button
                            onClick={() => handleAction(item.id, 'Reject')}
                            style={{
                              border: '1px solid #d32929', background: '#fff', color: 'var(--red)',
                              height: '28px', padding: '0 10px', borderRadius: '4px',
                              fontWeight: '750', fontSize: '11px', cursor: 'pointer'
                            }}
                          >
                            Reject
                          </button>
                        </div>
                      </td>
                    </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan="6" style={{ padding: '40px', textAlign: 'center', color: 'var(--muted)', fontSize: '13px' }}>
                      No pending items found for this category.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
</div>
          </div>

          {/* Pagination Footer */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '20px', flexWrap: 'wrap', gap: '12px' }}>
            <span style={{ fontSize: '12px', color: 'var(--muted)' }}>Showing 4 of 24 pending items</span>
            
            <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
              <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(1)}
                style={{ height: '28px', width: '28px', border: '1.5px solid #25108f', background: '#fff', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', opacity: currentPage === 1 ? 0.5 : 1 }}
                aria-label="Previous Page"
              >
                <ChevronLeft size={14} />
              </button>
              
              <button style={{ height: '28px', width: '28px', border: 'none', background: 'var(--primary)', color: '#fff', borderRadius: '4px', fontWeight: '800', fontSize: '12px', cursor: 'pointer' }} onClick={(e) => { e.preventDefault(); e.stopPropagation(); addToast("Navigating to page 1", "info"); }}>1</button>
              <button onClick={() => addToast('Navigate to page 2', 'info')} style={{ height: '28px', width: '28px', border: '1.5px solid #25108f', background: '#fff', color: 'var(--text)', borderRadius: '4px', fontWeight: '750', fontSize: '12px', cursor: 'pointer' }}>2</button>
              <button onClick={() => addToast('Navigate to page 3', 'info')} style={{ height: '28px', width: '28px', border: '1.5px solid #25108f', background: '#fff', color: 'var(--text)', borderRadius: '4px', fontWeight: '750', fontSize: '12px', cursor: 'pointer' }}>3</button>

              <button
                onClick={() => setCurrentPage(2)}
                style={{ height: '28px', width: '28px', border: '1.5px solid #25108f', background: '#fff', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
                aria-label="Next Page"
              >
                <ChevronRight size={14} />
              </button>
            </div>
          </div>
        </div>

      </div>
    </AdminShell>
  );
}


