import React, { useState } from 'react';
import {
  LayoutGrid,
  Users,
  Handshake,
  ShieldCheck,
  ClipboardList,
  Settings,
  HelpCircle,
  SlidersHorizontal,
  Download,
  Box,
  GitMerge,
  FileText,
  Landmark,
  ShieldAlert,
  ChevronLeft,
  ChevronRight,
  GitBranch
} from 'lucide-react';
import { useApp } from '../../hooks/useApp';
import { ROUTES } from '../../config/routes';
import KpiCard from '../../features/dashboard/KpiCard';
import AdminShell from '../../components/layouts/AdminShell';
import { useToast } from '../../components/common/ToastNotification';

import Select from "../../components/ui/Select";

// Queue specific navigation menu list mapping Image 5
const queueNavItems = [
  { label: 'Dashboard', route: ROUTES.dashboard, icon: LayoutGrid },
  { label: 'Users', route: '#', icon: Users },
  { label: 'Partners', route: ROUTES.partners, icon: Handshake },
  { label: 'KYC Verification', route: '#', icon: ShieldCheck },
  { label: 'Audit Logs', route: '#', icon: ClipboardList },
  { label: 'Settings', route: '#', icon: Settings },
  { label: 'Support', route: '#', icon: HelpCircle }
];

const approvalTasks = [
  { id: 1, partnerName: 'Nexis Logistics', partnerId: 'ID: PRT-99201', partnerInitials: 'NX', logoBg: '#cbd5e1', type: 'ISP', pendingItem: 'KYC Verification', pendingIcon: ShieldCheck, submittedDate: 'Oct 24, 2023 09:12 AM', priority: 'High', priorityColor: 'red', assignedToMe: true },
  { id: 2, partnerName: 'Blue Freight Inc.', partnerId: 'ID: PRT-88421', partnerInitials: 'BF', logoBg: '#c084fc', type: 'BSP', pendingItem: 'Bank Verification', pendingIcon: Landmark, submittedDate: 'Oct 24, 2023 10:45 AM', priority: 'Medium', priorityColor: 'orange', assignedToMe: true },
  { id: 3, partnerName: 'Swift Ventures', partnerId: 'ID: PRT-10293', partnerInitials: 'SV', logoBg: '#93c5fd', type: 'ISP', pendingItem: 'Tax Documents', pendingIcon: FileText, submittedDate: 'Oct 23, 2023 04:30 PM', priority: 'Low', priorityColor: 'gray', assignedToMe: false },
  { id: 4, partnerName: 'Global Reach Co.', partnerId: 'ID: PRT-20938', partnerInitials: 'GR', logoBg: '#fed7aa', type: 'BSP', pendingItem: 'New Branch: Singapore', pendingIcon: GitBranch, submittedDate: 'Oct 23, 2023 01:15 PM', priority: 'Medium', priorityColor: 'orange', assignedToMe: false },
  { id: 5, partnerName: 'Alpha Trade', partnerId: 'ID: PRT-11223', partnerInitials: 'AT', logoBg: '#fecaca', type: 'ISP', pendingItem: 'Account Update', pendingIcon: Settings, submittedDate: 'Oct 22, 2023 09:00 AM', priority: 'Low', priorityColor: 'gray', assignedToMe: true },
  { id: 6, partnerName: 'Zenith Logistics', partnerId: 'ID: PRT-44556', partnerInitials: 'ZL', logoBg: '#bbf7d0', type: 'BSP', pendingItem: 'Compliance Audit', pendingIcon: ShieldAlert, submittedDate: 'Oct 21, 2023 11:30 AM', priority: 'High', priorityColor: 'red', assignedToMe: false },
  { id: 7, partnerName: 'Omega Systems', partnerId: 'ID: PRT-77889', partnerInitials: 'OS', logoBg: '#fef08a', type: 'ISP', pendingItem: 'License Renewal', pendingIcon: FileText, submittedDate: 'Oct 20, 2023 02:45 PM', priority: 'Medium', priorityColor: 'orange', assignedToMe: true },
  { id: 8, partnerName: 'Nexus Corp', partnerId: 'ID: PRT-33445', partnerInitials: 'NC', logoBg: '#e9d5ff', type: 'BSP', pendingItem: 'Bank Verification', pendingIcon: Landmark, submittedDate: 'Oct 19, 2023 10:15 AM', priority: 'High', priorityColor: 'red', assignedToMe: false },
  { id: 9, partnerName: 'Pinnacle Trade', partnerId: 'ID: PRT-55667', partnerInitials: 'PT', logoBg: '#bae6fd', type: 'ISP', pendingItem: 'KYC Verification', pendingIcon: ShieldCheck, submittedDate: 'Oct 18, 2023 03:20 PM', priority: 'Low', priorityColor: 'gray', assignedToMe: true },
  { id: 10, partnerName: 'Vertex Inc.', partnerId: 'ID: PRT-88990', partnerInitials: 'VI', logoBg: '#fbcfe8', type: 'BSP', pendingItem: 'New Branch: London', pendingIcon: GitBranch, submittedDate: 'Oct 17, 2023 01:10 PM', priority: 'Medium', priorityColor: 'orange', assignedToMe: false },
  { id: 11, partnerName: 'Quantum LLC', partnerId: 'ID: PRT-12345', partnerInitials: 'QL', logoBg: '#d9f99d', type: 'ISP', pendingItem: 'Tax Documents', pendingIcon: FileText, submittedDate: 'Oct 16, 2023 04:50 PM', priority: 'High', priorityColor: 'red', assignedToMe: true },
  { id: 12, partnerName: 'Aurora Ltd.', partnerId: 'ID: PRT-67890', partnerInitials: 'AL', logoBg: '#fed7aa', type: 'BSP', pendingItem: 'Compliance Audit', pendingIcon: ShieldAlert, submittedDate: 'Oct 15, 2023 09:30 AM', priority: 'Low', priorityColor: 'gray', assignedToMe: false }
];

export default function ApprovalQueue() {
  const { navigate } = useApp();
  const { addToast } = useToast();
  
  const [tasks, setTasks] = useState(approvalTasks);
  const [activeTab, setActiveTab] = useState('All Tasks');
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const kpisData = [
    { title: 'Pending KYC', value: '24', topLabel: '! 8 Urgent', topLabelClass: 'red-text bg-red-soft font-bold', icon: Users },
    { title: 'Pending Services', value: '12', topLabel: '4 New Today', topLabelClass: 'blue-text bg-blue-soft font-bold', icon: Box },
    { title: 'Pending Branches', value: '08', topLabel: 'Stable flow', topLabelClass: 'gray-badge font-bold', icon: GitMerge },
    { title: 'Pending Documents', value: '45', topLabel: 'High volume', topLabelClass: 'blue-text bg-blue-soft font-bold', icon: FileText },
    // Shortened topLabel to fix layout cut-off issues
    { title: 'Bank Verification', value: '05', topLabel: 'Critical', topLabelClass: 'red-text bg-red-soft font-bold', icon: Landmark }
  ];

  const handleAction = (e, taskId, actionName, partnerName) => {
    e.stopPropagation();
    addToast(`${actionName} request from ${partnerName}`, actionName === 'Approved' ? 'success' : 'error');
    setTasks(prev => prev.filter(t => t.id !== taskId));
  };

  const filteredTasks = tasks.filter(t => {
    if (activeTab === 'Assigned to Me') return t.assignedToMe;
    return true;
  });

  const totalPages = Math.max(1, Math.ceil(filteredTasks.length / rowsPerPage));
  const startIndex = (currentPage - 1) * rowsPerPage;
  const paginatedTasks = filteredTasks.slice(startIndex, startIndex + rowsPerPage);

  // Ensure current page is valid when filtering changes
  React.useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [totalPages, currentPage]);

  return (
    <AdminShell
      activeTab="Partners"
      brandText="Partner Admin"
      brandSubText="Management Suite"
      navItemsOverride={queueNavItems}
      headerTitle="PartnerConnect Enterprise"
      showGridIcon={true}
      customProfileName="Admin User"
      customProfileRole="SUPER ADMIN"
      customProfileAvatar="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&h=100&q=80"
      searchPlaceholder="Search approvals, partners, or IDs..."
    >
      {/* View Header */}
      <div className="partners-page-header">
        <div>
          <span className="queue-verification-control-tag">VERIFICATION CONTROL</span>
          <h1 className="page-title margin-top-4">Partner Approval Queue</h1>
          <p className="page-subtitle">Manage and verify pending administrative requests from global partners.</p>
        </div>
        <div className="partners-header-buttons">
          <button className="secondary-action-btn font-bold" type="button" onClick={() => addToast('Opening Filter Requests...', 'info')}>
            <SlidersHorizontal size={16} />
            <span>Filter Requests</span>
          </button>
          <button className="primary-action-btn font-bold" type="button" onClick={() => addToast('Generating Export Report...', 'success')}>
            <Download size={16} />
            <span>Export Report</span>
          </button>
        </div>
      </div>
      {/* 5 KPI Cards Row */}
      <section className="kpi-grid queue-kpi-grid">
        {kpisData.map((kpi, idx) => (
          <KpiCard key={idx} {...kpi} />
        ))}
      </section>
      {/* Table Card */}
      <section className="panel approval-queue-directory-panel">
        <div className="directory-panel-header">
          <h2>Active Approval Queue</h2>
          <div className="approval-header-filters-wrap">
            <div className="segmented-tab-filter">
              <button
                className={activeTab === 'All Tasks' ? 'active' : ''}
                onClick={() => {
                  setActiveTab('All Tasks');
                  setCurrentPage(1);
                }}
                type="button"
              >
                All Tasks
              </button>
              <button
                className={activeTab === 'Assigned to Me' ? 'active' : ''}
                onClick={() => {
                  setActiveTab('Assigned to Me');
                  setCurrentPage(1);
                }}
                type="button"
              >
                Assigned to Me
              </button>
            </div>
            <span className="queue-showing-results-text">
              Showing {filteredTasks.length === 0 ? 0 : startIndex + 1}-{Math.min(startIndex + rowsPerPage, filteredTasks.length)} of {filteredTasks.length} items
            </span>
          </div>
        </div>

        <div className="table-wrap">
          <div className="table-responsive-wrapper">
<table className="approval-queue-table">
            <thead>
              <tr>
                <th>PARTNER</th>
                <th>TYPE</th>
                <th>PENDING ITEM</th>
                <th>SUBMITTED DATE</th>
                <th>PRIORITY</th>
                <th>ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {paginatedTasks.length === 0 ? (
                <tr>
                  <td colSpan="6" style={{ textAlign: 'center', padding: '2rem', color: '#64748b' }}>
                    No tasks found.
                  </td>
                </tr>
              ) : (
                paginatedTasks.map((task) => {
                  const PendingIcon = task.pendingIcon;
                  return (
                    <tr key={task.id} className="partner-row-clickable" onClick={() => navigate(ROUTES.partnerDetails)}>
                      <td className="partner-name-cell">
                        <div className="partner-info-wrap">
                          <span className="queue-partner-avatar-logo" style={{ backgroundColor: task.logoBg }}>
                            {task.partnerInitials}
                          </span>
                          <div className="partner-name-meta">
                            <span className="partner-name-txt">{task.partnerName}</span>
                            <span className="partner-est-txt">{task.partnerId}</span>
                          </div>
                        </div>
                      </td>
                      <td>
                        <span className={`partner-type-badge ${task.type.toLowerCase()}`}>
                          {task.type}
                        </span>
                      </td>
                      <td className="pending-item-cell-wrap">
                        <div className="pending-item-inner">
                          <PendingIcon size={16} className="pending-icon-indicator" />
                          <span>{task.pendingItem}</span>
                        </div>
                      </td>
                      <td className="submitted-date-cell">{task.submittedDate}</td>
                      <td>
                        <div className="priority-cell-wrap">
                          <span className={`priority-bullet-dot ${task.priorityColor}`} />
                          <span>{task.priority}</span>
                        </div>
                      </td>
                      <td className="actions-cell-wrap">
                        <div className="actions-buttons-cell-row" onClick={(e) => e.stopPropagation()}>
                          <button 
                            className="btn-action-circle approve-green" 
                            type="button" 
                            title="Approve" 
                            onClick={(e) => handleAction(e, task.id, 'Approved', task.partnerName)}
                          >
                            ✔
                          </button>
                          <button 
                            className="btn-action-circle reject-red" 
                            type="button" 
                            title="Reject" 
                            onClick={(e) => handleAction(e, task.id, 'Rejected', task.partnerName)}
                          >
                            ✘
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
</div>
        </div>

        <div className="directory-table-footer">
          <div className="rows-per-page-combo">
            <span>Rows per page:</span>
            <Select
              aria-label="Rows per page select"
              value={rowsPerPage.toString()}
              onChange={(e) => {
                setRowsPerPage(Number(e.target.value));
                setCurrentPage(1);
              }}
              options={[{
                label: "10",
                value: "10"
              }, {
                label: "20",
                value: "20"
              }, {
                label: "50",
                value: "50"
              }]} 
            />
          </div>

          <div className="pagination-wrap">
            <button 
              className="pag-nav-btn" 
              type="button" 
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
            >
              <ChevronLeft size={16} />
            </button>
            {Array.from({ length: totalPages }).map((_, i) => (
              <button 
                key={i}
                className={`pag-num-btn ${currentPage === i + 1 ? 'active' : ''}`}
                onClick={() => setCurrentPage(i + 1)}
                type="button"
              >
                {i + 1}
              </button>
            ))}
            <button 
              className="pag-nav-btn" 
              type="button" 
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </section>
      {/* Bottom Automate Queue Banner */}
      <section className="panel queue-automation-big-panel">
        <div className="automation-panel-left-content">
          <h2>Automate Your Queue</h2>
          <p>Enable Smart-Approval for trusted partners to bypass standard manual review for low-risk documents and branch updates.</p>
          <button className="btn-configure-rules" type="button" onClick={() => addToast('Opening Smart-Approval Rules configuration...', 'info')}>
            Configure Rules
          </button>
        </div>
        
        <div className="automation-panel-right-illustration">
          <img
            className="automation-robot-img"
            src="https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=600&q=80"
            alt="AI Robotics automation illustration preview"
          />
        </div>
      </section>
    </AdminShell>
  );
}
