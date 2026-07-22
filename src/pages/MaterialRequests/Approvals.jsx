import React, { useState } from 'react';
import { 
  SlidersHorizontal, 
  Download, 
  FolderCheck, 
  CreditCard, 
  AlertOctagon, 
  CheckCircle2, 
  XCircle, 
  MoreVertical,
  ChevronDown,
  X,
  Loader2,
  Search
} from 'lucide-react';
import AdminShell from '../../components/layouts/AdminShell';
import { useApp } from '../../hooks/useApp';
import { ROUTES } from '../../config/routes';
import { useToast } from '../../components/common/ToastNotification';

import Select from "../../components/ui/Select";

const initialRequests = [
  { id: '#PR-8821', name: 'James Dalton', dept: 'Infrastructure Div.', initial: 'JD', category: 'Structural Steel', amount: '$42,500.00', status: 'PENDING REVIEW', statusColor: '#d97706', timeline: 'Requested 2h ago', barColor: '#f59e0b' },
  { id: '#PR-8819', name: 'Sarah Kovic', dept: 'Maintenance', initial: 'SK', category: 'HVAC Systems', amount: '$12,800.00', status: 'URGENT ACTION', statusColor: '#dc2626', timeline: 'Delayed 18h', barColor: '#ef4444' },
  { id: '#PR-8815', name: 'Markus Liao', dept: 'Logistics Ops.', initial: 'ML', category: 'Precision Tools', amount: '$5,240.00', status: 'PENDING REVIEW', statusColor: '#d97706', timeline: 'Requested 5h ago', barColor: '#3b82f6' },
  { id: '#PR-8799', name: 'Elena Vance', dept: 'Procurement Analyst', initial: 'EL', category: 'Office Electronics', amount: '$85,300.00', status: 'HIGH VALUE CHECK', statusColor: '#d97706', timeline: 'Under verification', barColor: '#111827' }
];

// Helper for downloading files
const downloadFile = (content, filename, contentType) => {
  const blob = new Blob([content], { type: contentType });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
};

export default function ApprovalPipeline() {
  const { navigate, setSelectedRequestId } = useApp();
  const { addToast } = useToast();
  const [activeSegment, setActiveSegment] = useState('All');
  const [requestsList, setRequestsList] = useState(initialRequests);

  // Filter popup and context menu states
  const [showFiltersModal, setShowFiltersModal] = useState(false);
  const [filterDept, setFilterDept] = useState("All");
  const [filterStatus, setFilterStatus] = useState("All");
  const [filterMinAmount, setFilterMinAmount] = useState("");

  const [showExportModal, setShowExportModal] = useState(false);
  const [exportFormat, setExportFormat] = useState("CSV");
  const [isExporting, setIsExporting] = useState(false);
  const [exportProgress, setExportProgress] = useState(0);
  const [exportStatusText, setExportStatusText] = useState("");

  const [activeMenuId, setActiveMenuId] = useState(null);

  const handleRowClick = (reqId) => {
    if (setSelectedRequestId) {
      setSelectedRequestId(reqId === '#PR-8821' ? 'MR-8821' : 'REQ-2024-0892');
    }
    navigate(ROUTES.materialDetails);
  };

  const handleAction = (e, reqId, action) => {
    e.stopPropagation();
    
    if (action === 'Menu Open') {
      setActiveMenuId(activeMenuId === reqId ? null : reqId);
      return;
    }

    const itemIndex = requestsList.findIndex(r => r.id === reqId);
    if (itemIndex > -1) {
      const updatedList = [...requestsList];
      updatedList[itemIndex].status = action === 'Approve' ? 'APPROVED' : 'REJECTED';
      updatedList[itemIndex].statusColor = action === 'Approve' ? '#059669' : '#dc2626';
      setRequestsList(updatedList);
    }

    if (action === 'Approve') {
      addToast(`Successfully approved ${reqId}.`, 'success');
    } else {
      addToast(`Request ${reqId} has been rejected.`, 'error');
    }
  };

  // Filter queue items based on Segment + Dialog Filter options
  const filteredRequests = requestsList.filter(item => {
    // 1. Segment Tabs
    if (activeSegment === 'Urgent' && item.status !== 'URGENT ACTION') return false;
    if (activeSegment === 'Bulk') {
      const numericVal = parseFloat(item.amount.replace(/[^0-9.-]+/g, ''));
      if (numericVal <= 20000) return false;
    }

    // 2. Department Filter
    if (filterDept !== 'All' && item.dept !== filterDept) return false;

    // 3. Status Filter
    if (filterStatus !== 'All' && item.status !== filterStatus) return false;

    // 4. Min Amount Filter
    if (filterMinAmount) {
      const numericVal = parseFloat(item.amount.replace(/[^0-9.-]+/g, ''));
      if (numericVal < parseFloat(filterMinAmount)) return false;
    }

    return true;
  });

  // Export report execution
  const handleStartExport = () => {
    setIsExporting(true);
    setExportProgress(0);
    setExportStatusText("Initializing compiler...");
    
    const steps = [
      { progress: 25, text: "Formatting dataset headers..." },
      { progress: 50, text: "Consolidating approvals audit ledger..." },
      { progress: 75, text: "Generating CSV container data..." },
      { progress: 100, text: "Ready to transfer container..." }
    ];

    let currentStep = 0;
    const interval = setInterval(() => {
      if (currentStep < steps.length) {
        setExportProgress(steps[currentStep].progress);
        setExportStatusText(steps[currentStep].text);
        currentStep++;
      } else {
        clearInterval(interval);
        
        let fileContent = "";
        let filename = "";
        
        if (exportFormat === "CSV") {
          fileContent = "ID,Requester,Department,Category,Amount,Status,Timeline\n" +
            filteredRequests.map(r => `"${r.id}","${r.name}","${r.dept}","${r.category}","${r.amount}","${r.status}","${r.timeline}"`).join("\n") + "\n";
          filename = `Hozify_Approvals_Report.csv`;
          downloadFile(fileContent, filename, "text/csv;charset=utf-8;");
        } else if (exportFormat === "JSON") {
          fileContent = JSON.stringify({
            report: "Material Requests Approval Pipeline",
            exportedAt: new Date().toISOString(),
            filterDepartment: filterDept,
            filterStatus,
            minAmount: filterMinAmount || "None",
            requests: filteredRequests
          }, null, 2);
          filename = `Hozify_Approvals_Report.json`;
          downloadFile(fileContent, filename, "application/json;charset=utf-8;");
        } else {
          // TXT Report Sim
          fileContent = "==================================================\n" +
            "            HOZIFY PROCUREMENT AUDIT REPORT\n" +
            "==================================================\n" +
            `Export Date: ${new Date().toLocaleString()}\n` +
            `Scope: ${filterDept === "All" ? "All Departments" : filterDept}\n` +
            `Status Filter: ${filterStatus}\n` +
            "--------------------------------------------------\n\n" +
            filteredRequests.map(r => `[${r.id}] ${r.name} (${r.dept}) - ${r.category} - ${r.amount} - ${r.status}`).join("\n") + "\n\n" +
            "==================================================\n";
          filename = `Hozify_Approvals_Report.txt`;
          downloadFile(fileContent, filename, "text/plain;charset=utf-8;");
        }
        
        addToast(`Report successfully generated as ${exportFormat}!`, 'success');
        setIsExporting(false);
        setShowExportModal(false);
      }
    }, 450);
  };

  return (
    <AdminShell
      activeTab="Material Requests"
      brandText="Hozify Procurement"
      brandSubText="EXECUTIVE COMMAND"
      searchPlaceholder="Search requests..."
      customProfileName="Admin User"
      customProfileRole="Procurement lead"
    >
      <div style={{ padding: '24px 0', display: 'flex', flexDirection: 'column', gap: 'var(--spacing-section)' }}>
        
        {/* Page Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <h1 style={{ fontSize: '24px', fontWeight: '800', color: 'var(--text)', margin: 0 }}>
              Approval Pipeline
            </h1>
            <p style={{ fontSize: '14px', color: 'var(--muted)', marginTop: '4px', margin: 0 }}>
              Monitor and process pending material procurement requests across all departments.
            </p>
          </div>
          <div style={{ display: 'flex', gap: '12px' }}>
            <button
              onClick={() => setShowFiltersModal(true)}
              style={{
                background: '#ffffff',
                color: 'var(--text)',
                border: '1.5px solid #25108f',
                borderRadius: '6px',
                padding: '8px 16px',
                fontSize: '13px',
                fontWeight: '700',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}
              type="button"
            >
              <SlidersHorizontal size={14} />
              <span>Filters</span>
              {(filterDept !== "All" || filterStatus !== "All" || filterMinAmount) && (
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#dc2626' }} />
              )}
            </button>
            <button
              onClick={() => setShowExportModal(true)}
              style={{
                background: '#0b1329',
                color: '#ffffff',
                border: 'none',
                borderRadius: '6px',
                padding: '8px 16px',
                fontSize: '13px',
                fontWeight: '700',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}
              type="button"
            >
              <Download size={14} />
              <span>Export Report</span>
            </button>
          </div>
        </div>

        {/* 3 Analytics KPI cards row */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px' }}>
          
          {/* Card 1 */}
          <div className="panel" style={{ background: '#ffffff', border: '1.5px solid #25108f', borderRadius: '12px', padding: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <span style={{ display: 'block', fontSize: '11px', fontWeight: '800', color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                PENDING QUEUE
              </span>
              <strong style={{ display: 'block', fontSize: '28px', color: 'var(--text)', fontWeight: '800', marginTop: '6px' }}>
                24
              </strong>
              <span style={{ display: 'block', fontSize: '12px', fontWeight: '700', color: '#dc2626', marginTop: '6px' }}>
                ~12% vs last week
              </span>
            </div>
            <div style={{ width: '40px', height: '40px', borderRadius: '8px', background: '#fffbeb', color: '#f59e0b', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <FolderCheck size={22} />
            </div>
          </div>

          {/* Card 2 */}
          <div className="panel" style={{ background: '#ffffff', border: '1.5px solid #25108f', borderRadius: '12px', padding: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <span style={{ display: 'block', fontSize: '11px', fontWeight: '800', color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                HIGH VALUE TOTAL
              </span>
              <strong style={{ display: 'block', fontSize: '28px', color: 'var(--text)', fontWeight: '800', marginTop: '6px' }}>
                $142.8k
              </strong>
              <span style={{ display: 'block', fontSize: '12px', fontWeight: '700', color: '#059669', marginTop: '6px' }}>
                ~4.2% average ticket size
              </span>
            </div>
            <div style={{ width: '40px', height: '40px', borderRadius: '8px', background: '#eff6ff', color: '#3b82f6', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <CreditCard size={22} />
            </div>
          </div>

          {/* Card 3 */}
          <div className="panel" style={{ background: '#ffffff', border: '1.5px solid #25108f', borderRadius: '12px', padding: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <span style={{ display: 'block', fontSize: '11px', fontWeight: '800', color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                CRITICAL DELAY
              </span>
              <strong style={{ display: 'block', fontSize: '28px', color: '#dc2626', fontWeight: '800', marginTop: '6px' }}>
                08
              </strong>
              <span style={{ display: 'block', fontSize: '12px', fontWeight: '700', color: '#dc2626', marginTop: '6px' }}>
                Action required within 24 hours
              </span>
            </div>
            <div style={{ width: '40px', height: '40px', borderRadius: '8px', background: '#fef2f2', color: '#dc2626', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <AlertOctagon size={22} />
            </div>
          </div>
        </div>

        {/* Detailed Requests Queue Panel */}
        <div className="panel" style={{ background: '#ffffff', border: '1.5px solid #25108f', borderRadius: '12px', padding: 'var(--spacing-section)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '16px' }}>
            <h2 style={{ fontSize: '16px', fontWeight: '800', color: 'var(--text)', margin: 0 }}>
              Detailed Requests Queue
            </h2>

            {/* Segmented select filter tabs */}
            <div style={{ display: 'flex', background: '#f1f5f9', padding: '4px', borderRadius: '6px' }}>
              {['All', 'Urgent', 'Bulk'].map((seg) => (
                <button
                  key={seg}
                  onClick={() => setActiveSegment(seg)}
                  style={{
                    border: 'none',
                    background: activeSegment === seg ? '#ffffff' : 'transparent',
                    color: activeSegment === seg ? 'var(--text)' : 'var(--muted)',
                    padding: '6px 16px',
                    borderRadius: '4px',
                    fontSize: '12px',
                    fontWeight: '700',
                    boxShadow: activeSegment === seg ? '0 1px 3px rgba(0,0,0,0.1)' : 'none',
                    cursor: 'pointer',
                    transition: 'all 0.15s'
                  }}
                  type="button"
                >
                  {seg}
                </button>
              ))}
            </div>
          </div>

          <div style={{ overflowY: 'auto', maxHeight: '400px' }}>
            <div className="table-responsive-wrapper">
<table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', minWidth: '700px' }}>
              <thead>
                <tr style={{ borderBottom: '1.5px solid #25108f' }}>
                  <th style={{ padding: '12px 8px', fontSize: '11px', fontWeight: '800', color: 'var(--muted)', textTransform: 'uppercase' }}>ID</th>
                  <th style={{ padding: '12px 8px', fontSize: '11px', fontWeight: '800', color: 'var(--muted)', textTransform: 'uppercase' }}>Requester</th>
                  <th style={{ padding: '12px 8px', fontSize: '11px', fontWeight: '800', color: 'var(--muted)', textTransform: 'uppercase' }}>Category</th>
                  <th style={{ padding: '12px 8px', fontSize: '11px', fontWeight: '800', color: 'var(--muted)', textTransform: 'uppercase' }}>Amount</th>
                  <th style={{ padding: '12px 8px', fontSize: '11px', fontWeight: '800', color: 'var(--muted)', textTransform: 'uppercase' }}>Status</th>
                  <th style={{ padding: '12px 8px', fontSize: '11px', fontWeight: '800', color: 'var(--muted)', textTransform: 'uppercase' }}>Timeline</th>
                  <th style={{ padding: '12px 8px', fontSize: '11px', fontWeight: '800', color: 'var(--muted)', textTransform: 'uppercase', textAlign: 'right', width: '100px' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredRequests.map((req) => (
                  <tr 
                    key={req.id} 
                    onClick={() => handleRowClick(req.id)}
                    style={{ borderBottom: '1px solid #fcfaff', cursor: 'pointer', transition: 'background-color 0.15s ease' }}
                    onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#fcfaff'}
                    onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                  >
                    <td style={{ padding: '16px 8px', fontSize: '13px', fontWeight: '700', color: 'var(--primary)' }}>
                      {req.id}
                    </td>
                    <td style={{ padding: '16px 8px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: '#f1ebfa', color: 'var(--primary)', fontSize: '11px', fontWeight: '800', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          {req.initial}
                        </div>
                        <div>
                          <strong style={{ display: 'block', fontSize: '13px', color: 'var(--text)' }}>{req.name}</strong>
                          <span style={{ display: 'block', fontSize: '11px', color: 'var(--muted)', marginTop: '2px' }}>{req.dept}</span>
                        </div>
                      </div>
                    </td>
                    <td style={{ padding: '16px 8px', fontSize: '13px', color: 'var(--text)', fontWeight: '600' }}>
                      {req.category}
                    </td>
                    <td style={{ padding: '16px 8px', fontSize: '13px', fontWeight: '700', color: 'var(--text)' }}>
                      {req.amount}
                    </td>
                    <td style={{ padding: '16px 8px' }}>
                      <span style={{ fontSize: '11px', fontWeight: '800', color: req.statusColor }}>
                        {req.status}
                      </span>
                    </td>
                    <td style={{ padding: '16px 8px' }}>
                      <div style={{ display: 'inline-block' }}>
                        <span style={{ display: 'block', fontSize: '12px', color: '#565365' }}>{req.timeline}</span>
                        <div style={{ height: '3px', background: req.barColor, borderRadius: '1.5px', marginTop: '6px', width: '50px' }} />
                      </div>
                    </td>
                    <td style={{ padding: '16px 8px', textAlign: 'right', position: 'relative' }}>
                      <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end', alignItems: 'center' }}>
                        <button 
                          onClick={(e) => handleAction(e, req.id, 'Approve')}
                          style={{ border: 'none', background: 'transparent', color: (req.status !== 'APPROVED' && req.status !== 'REJECTED') ? '#07956f' : '#cbd5e1', cursor: (req.status !== 'APPROVED' && req.status !== 'REJECTED') ? 'pointer' : 'default', padding: '4px' }}
                          disabled={req.status === 'APPROVED' || req.status === 'REJECTED'}
                          title="Approve"
                          type="button"
                        >
                          <CheckCircle2 size={18} />
                        </button>
                        <button 
                          onClick={(e) => handleAction(e, req.id, 'Reject')}
                          style={{ border: 'none', background: 'transparent', color: (req.status !== 'APPROVED' && req.status !== 'REJECTED') ? '#d32929' : '#cbd5e1', cursor: (req.status !== 'APPROVED' && req.status !== 'REJECTED') ? 'pointer' : 'default', padding: '4px' }}
                          disabled={req.status === 'APPROVED' || req.status === 'REJECTED'}
                          title="Reject"
                          type="button"
                        >
                          <XCircle size={18} />
                        </button>
                        <button 
                          onClick={(e) => handleAction(e, req.id, 'Menu Open')}
                          style={{ border: 'none', background: 'transparent', color: '#7a7688', cursor: 'pointer', padding: '4px' }}
                          title="More"
                          type="button"
                        >
                          <MoreVertical size={16} />
                        </button>

                        {/* Actions 3-dot dropdown menu */}
                        {activeMenuId === req.id && (
                          <>
                            <div 
                              className="fixed inset-0 z-40" 
                              onClick={(e) => { e.stopPropagation(); setActiveMenuId(null); }}
                            />
                            <div 
                              style={{ 
                                position: 'absolute', 
                                right: '10px', 
                                top: '34px', 
                                width: '150px', 
                                background: '#ffffff', 
                                border: '1.5px solid #25108f', 
                                borderRadius: '8px', 
                                boxShadow: '0 4px 12px rgba(0,0,0,0.15)', 
                                zIndex: 50, 
                                padding: '4px 0',
                                textAlign: 'left'
                              }}
                            >
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setActiveMenuId(null);
                                  handleRowClick(req.id);
                                }}
                                style={{ width: '100%', border: 'none', background: 'transparent', padding: '8px 12px', fontSize: '12px', color: '#111827', fontWeight: '700', textAlign: 'left', cursor: 'pointer' }}
                                className="hover:bg-slate-50"
                              >
                                View Details
                              </button>
                              <button
                                onClick={(e) => {
                                  setActiveMenuId(null);
                                  handleAction(e, req.id, 'Approve');
                                }}
                                disabled={req.status === 'APPROVED' || req.status === 'REJECTED'}
                                style={{ width: '100%', border: 'none', background: 'transparent', padding: '8px 12px', fontSize: '12px', color: (req.status !== 'APPROVED' && req.status !== 'REJECTED') ? '#059669' : '#cbd5e1', fontWeight: '700', textAlign: 'left', cursor: (req.status !== 'APPROVED' && req.status !== 'REJECTED') ? 'pointer' : 'default' }}
                                className="hover:bg-slate-50"
                              >
                                Approve Request
                              </button>
                              <button
                                onClick={(e) => {
                                  setActiveMenuId(null);
                                  handleAction(e, req.id, 'Reject');
                                }}
                                disabled={req.status === 'APPROVED' || req.status === 'REJECTED'}
                                style={{ width: '100%', border: 'none', background: 'transparent', padding: '8px 12px', fontSize: '12px', color: (req.status !== 'APPROVED' && req.status !== 'REJECTED') ? '#dc2626' : '#cbd5e1', fontWeight: '700', textAlign: 'left', cursor: (req.status !== 'APPROVED' && req.status !== 'REJECTED') ? 'pointer' : 'default' }}
                                className="hover:bg-slate-50"
                              >
                                Reject Request
                              </button>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setActiveMenuId(null);
                                  addToast(`Forwarded request ${req.id} to Procurement Manager`, 'success');
                                }}
                                style={{ width: '100%', border: 'none', background: 'transparent', padding: '8px 12px', fontSize: '12px', color: '#6b7280', fontWeight: '700', textAlign: 'left', cursor: 'pointer' }}
                                className="hover:bg-slate-50"
                              >
                                Forward to Lead
                              </button>
                            </div>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
</div>
          </div>

          {/* Table Footer */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '20px', flexWrap: 'wrap', gap: '12px' }}>
            <span style={{ fontSize: '13px', color: '#565365' }}>
              Showing {filteredRequests.length > 0 ? 1 : 0}-{filteredRequests.length} of {filteredRequests.length} requests
            </span>
            <div style={{ display: 'flex', gap: '8px' }}>
              <button 
                onClick={() => addToast("You are already on the first page.", "info")}
                style={{ background: 'transparent', border: '1.5px solid #25108f', color: '#565365', borderRadius: '6px', padding: '6px 14px', fontSize: '13px', fontWeight: '700', cursor: 'pointer' }} type="button">
                Previous
              </button>
              <button 
                onClick={() => addToast("No more pages available.", "info")}
                style={{ background: 'transparent', border: '1.5px solid #25108f', color: '#565365', borderRadius: '6px', padding: '6px 14px', fontSize: '13px', fontWeight: '700', cursor: 'pointer' }} type="button">
                Next
              </button>
            </div>
          </div>
        </div>

        {/* Charts Row */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr', lgGridTemplateColumns: '2fr 1fr', gap: 'var(--spacing-section)' }}>
          
          {/* Approval Trend Line Chart */}
          <div className="panel" style={{ background: '#ffffff', border: '1.5px solid #25108f', borderRadius: '12px', padding: 'var(--spacing-section)' }}>
            <h2 style={{ fontSize: '16px', fontWeight: '800', color: 'var(--text)', margin: '0 0 20px 0' }}>
              Approval Trend (7 Days)
            </h2>
            
            {/* SVG Line Chart Viewport */}
            <div style={{ height: '200px', width: '100%', position: 'relative', marginTop: '20px' }}>
              <svg width="100%" height="100%" viewBox="0 0 500 150" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="trend-grad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#25108f" stopOpacity="0.15" />
                    <stop offset="100%" stopColor="#25108f" stopOpacity="0.0" />
                  </linearGradient>
                </defs>
                {/* Horizontal dotted grid lines */}
                <line x1="0" y1="37" x2="500" y2="37" stroke="#eee9f6" strokeWidth="1" strokeDasharray="3,3" />
                <line x1="0" y1="75" x2="500" y2="75" stroke="#eee9f6" strokeWidth="1" strokeDasharray="3,3" />
                <line x1="0" y1="112" x2="500" y2="112" stroke="#eee9f6" strokeWidth="1" strokeDasharray="3,3" />
                
                {/* Chart Path Area */}
                <path d="M 0 120 C 80 110, 120 135, 166 75 C 212 15, 290 85, 332 45 C 374 5, 420 50, 500 20 L 500 150 L 0 150 Z" fill="url(#trend-grad)" />
                {/* Line Path */}
                <path d="M 0 120 C 80 110, 120 135, 166 75 C 212 15, 290 85, 332 45 C 374 5, 420 50, 500 20" fill="none" stroke="#25108f" strokeWidth="2.5" />
                
                {/* Data Points circles */}
                <circle cx="166" cy="75" r="4" fill="#25108f" stroke="#ffffff" strokeWidth="1.5" />
                <circle cx="332" cy="45" r="4" fill="#25108f" stroke="#ffffff" strokeWidth="1.5" />
                <circle cx="500" cy="20" r="4" fill="#25108f" stroke="#ffffff" strokeWidth="1.5" />
              </svg>
            </div>
            
            {/* Chart X Labels */}
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', fontWeight: '800', color: '#7a7688', marginTop: '12px', padding: '0 8px' }}>
              <span>MON</span>
              <span>TUE</span>
              <span>WED</span>
              <span>THU</span>
              <span>FRI</span>
              <span>SAT</span>
              <span>SUN</span>
            </div>
          </div>

          {/* Department Share Donut Chart */}
          <div className="panel" style={{ background: '#ffffff', border: '1.5px solid #25108f', borderRadius: '12px', padding: 'var(--spacing-section)', display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <h2 style={{ fontSize: '16px', fontWeight: '800', color: 'var(--text)', margin: 0 }}>
              Department Share
            </h2>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '16px', flexWrap: 'wrap', marginTop: '20px' }}>
              
              {/* Donut SVG drawing */}
              <div style={{ width: '110px', height: '110px', position: 'relative' }}>
                <svg width="100%" height="100%" viewBox="0 0 36 36">
                  {/* Gray background track */}
                  <circle cx="18" cy="18" r="15.915" fill="none" stroke="#eee9f6" strokeWidth="4.2" />
                  
                  {/* Segment 1: Infrastructure 62% - starting at angle -90deg (top) */}
                  <circle 
                    cx="18" cy="18" r="15.915" 
                    fill="none" 
                    stroke="#25108f" 
                    strokeWidth="4.2" 
                    strokeDasharray="62 38" 
                    strokeDashoffset="25" 
                  />
                  
                  {/* Segment 2: Operations 28% */}
                  <circle 
                    cx="18" cy="18" r="15.915" 
                    fill="none" 
                    stroke="#0b1329" 
                    strokeWidth="4.2" 
                    strokeDasharray="28 72" 
                    strokeDashoffset="63" 
                  />
                  
                  {/* Segment 3: Other 10% */}
                  <circle 
                    cx="18" cy="18" r="15.915" 
                    fill="none" 
                    stroke="#d7e1ff" 
                    strokeWidth="4.2" 
                    strokeDasharray="10 90" 
                    strokeDashoffset="35" 
                  />
                </svg>
              </div>

              {/* Legend List */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', flex: 1, minWidth: '120px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '13px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--primary)' }} />
                    <span style={{ color: '#565365' }}>Infrastructure</span>
                  </div>
                  <strong style={{ color: 'var(--text)' }}>62%</strong>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '13px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#0b1329' }} />
                    <span style={{ color: '#565365' }}>Operations</span>
                  </div>
                  <strong style={{ color: 'var(--text)' }}>28%</strong>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '13px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#d7e1ff' }} />
                    <span style={{ color: '#565365' }}>Other</span>
                  </div>
                  <strong style={{ color: 'var(--text)' }}>10%</strong>
                </div>
              </div>

            </div>
          </div>

        </div>

      </div>
      {/* ==========================================
          DYNAMIC FILTERS MODAL LAYER
         ========================================== */}
      {showFiltersModal && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs select-none animate-in fade-in duration-200">
          <div 
            className="fixed inset-0 bg-transparent" 
            onClick={() => setShowFiltersModal(false)}
          />
          <div className="relative bg-white w-full max-w-md rounded-2xl border border-slate-100 shadow-2xl p-6 overflow-hidden animate-in zoom-in-95 duration-200">
            {/* Modal Header */}
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-base font-black text-slate-900 tracking-tight">Filter Approval Queue</h3>
                <p className="text-xs font-semibold text-slate-400 mt-0.5">Narrow down pending requisitions in the pipeline.</p>
              </div>
              <button 
                onClick={() => setShowFiltersModal(false)}
                className="p-1 rounded-full text-slate-400 hover:bg-slate-100 hover:text-slate-700 cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Modal Form */}
            <div className="space-y-4">
              {/* Department Option */}
              <div>
                <label className="text-[11px] font-black text-slate-500 uppercase tracking-wider block mb-1.5">Department</label>
                <Select
                  value={filterDept}
                  onChange={(e) => setFilterDept(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs bg-white text-slate-800 font-bold focus:outline-none focus:border-[#25108f]"
                  options={[{
                    label: "All Departments",
                    value: "All"
                  }, {
                    label: "Infrastructure Div.",
                    value: "Infrastructure Div."
                  }, {
                    label: "Maintenance",
                    value: "Maintenance"
                  }, {
                    label: "Logistics Ops.",
                    value: "Logistics Ops."
                  }, {
                    label: "Procurement Analyst",
                    value: "Procurement Analyst"
                  }]} />
              </div>

              {/* Status Option */}
              <div>
                <label className="text-[11px] font-black text-slate-500 uppercase tracking-wider block mb-1.5">Status</label>
                <Select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs bg-white text-slate-800 font-bold focus:outline-none focus:border-[#25108f]"
                  options={[{
                    label: "All Statuses",
                    value: "All"
                  }, {
                    label: "PENDING REVIEW",
                    value: "PENDING REVIEW"
                  }, {
                    label: "URGENT ACTION",
                    value: "URGENT ACTION"
                  }, {
                    label: "HIGH VALUE CHECK",
                    value: "HIGH VALUE CHECK"
                  }, {
                    label: "APPROVED",
                    value: "APPROVED"
                  }, {
                    label: "REJECTED",
                    value: "REJECTED"
                  }]} />
              </div>

              {/* Minimum Value Input */}
              <div>
                <label className="text-[11px] font-black text-slate-500 uppercase tracking-wider block mb-1.5">Min Requisition Amount ($)</label>
                <input
                  type="number"
                  placeholder="e.g. 10000"
                  value={filterMinAmount}
                  onChange={(e) => setFilterMinAmount(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs bg-white text-slate-850 placeholder-slate-400 focus:outline-none focus:border-[#25108f]"
                />
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => {
                    setFilterDept("All");
                    setFilterStatus("All");
                    setFilterMinAmount("");
                    setShowFiltersModal(false);
                    addToast("Filters reset to default.", "info");
                  }}
                  className="flex-1 py-2 text-center border border-slate-200 rounded-xl text-xs font-bold text-slate-700 bg-white hover:bg-slate-50 cursor-pointer"
                >
                  Reset
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowFiltersModal(false);
                    addToast("Filters applied successfully.", "success");
                  }}
                  className="flex-1 py-2 text-center bg-[#0b1329] text-white rounded-xl text-xs font-bold hover:bg-[#0b1329]/95 cursor-pointer shadow-md active:scale-98 transition-transform"
                >
                  Apply Filters
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* ==========================================
          DYNAMIC EXPORT MODAL LAYER
         ========================================== */}
      {showExportModal && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs select-none animate-in fade-in duration-200">
          <div 
            className="fixed inset-0 bg-transparent" 
            onClick={() => !isExporting && setShowExportModal(false)}
          />
          <div className="relative bg-white w-full max-w-md rounded-2xl border border-slate-100 shadow-2xl p-6 overflow-hidden animate-in zoom-in-95 duration-200">
            {/* Modal Header */}
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-base font-black text-slate-900 tracking-tight">Export Procurement Report</h3>
                <p className="text-xs font-semibold text-slate-400 mt-0.5">Package approval data for offline accounting audit.</p>
              </div>
              {!isExporting && (
                <button 
                  onClick={() => setShowExportModal(false)}
                  className="p-1 rounded-full text-slate-400 hover:bg-slate-100 hover:text-slate-700 cursor-pointer"
                >
                  <X className="h-5 w-5" />
                </button>
              )}
            </div>

            {/* Modal Body */}
            {!isExporting ? (
              <div className="space-y-4">
                {/* Format selection */}
                <div>
                  <label className="text-[11px] font-black text-slate-500 uppercase tracking-wider block mb-2">Export Format</label>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { id: "CSV", title: "Spreadsheet", label: "CSV" },
                      { id: "PDF", title: "Summary Doc", label: "PDF" },
                      { id: "JSON", title: "Raw Data", label: "JSON" }
                    ].map((fmt) => (
                      <button
                        key={fmt.id}
                        type="button"
                        onClick={() => setExportFormat(fmt.id)}
                        className={`flex flex-col items-center justify-center p-3 rounded-xl border text-center cursor-pointer transition-all ${
                          exportFormat === fmt.id 
                            ? "bg-[#25108f]/5 border-[#25108f] ring-1 ring-[#25108f]" 
                            : "border-slate-200 hover:border-slate-300 hover:bg-slate-50"
                        }`}
                      >
                        <span className={`text-xs font-black ${exportFormat === fmt.id ? "text-[#25108f]" : "text-slate-800"}`}>{fmt.label}</span>
                        <span className="text-[9px] font-bold text-slate-400 mt-0.5">{fmt.title}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Scope parameters */}
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 space-y-2">
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-bold text-slate-500">Filtered Records:</span>
                    <span className="font-black text-slate-900 bg-white px-2 py-0.5 rounded-md border border-slate-200 shadow-3xs">{filteredRequests.length} of {requestsList.length}</span>
                  </div>
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-bold text-slate-500">Selected Segment:</span>
                    <span className="font-black text-slate-900">{activeSegment}</span>
                  </div>
                </div>

                {/* Footer Buttons */}
                <div className="flex gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowExportModal(false)}
                    className="flex-1 py-2 text-center border border-slate-200 rounded-xl text-xs font-bold text-slate-700 bg-white hover:bg-slate-50 cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={handleStartExport}
                    className="flex-1 py-2 text-center bg-[#0b1329] text-white rounded-xl text-xs font-bold hover:bg-[#0b1329]/90 cursor-pointer flex items-center justify-center gap-1.5 shadow-md active:scale-98 transition-transform"
                  >
                    <Download className="h-3.5 w-3.5" />
                    <span>Generate Report</span>
                  </button>
                </div>
              </div>
            ) : (
              /* Export Processing View */
              (<div className="py-8 space-y-6 flex flex-col items-center text-center">
                <Loader2 className="h-8 w-8 text-[#25108f] animate-spin" />
                <div className="w-full space-y-2">
                  <div className="flex justify-between items-center text-xs font-bold px-1">
                    <span className="text-slate-500">Compiling Report...</span>
                    <span className="text-[#25108f]">{exportProgress}%</span>
                  </div>
                  <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-[#25108f] transition-all duration-300 rounded-full"
                      style={{ width: `${exportProgress}%` }}
                    />
                  </div>
                  <p className="text-[11px] font-semibold text-slate-400 animate-pulse">{exportStatusText}</p>
                </div>
              </div>)
            )}
          </div>
        </div>
      )}
    </AdminShell>
  );
}


