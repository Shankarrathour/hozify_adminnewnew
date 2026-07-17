import React, { useState } from 'react';
import {
  Plus,
  Filter,
  Download,
  ChevronRight,
  ChevronLeft,
  RefreshCw,
  Zap,
  Truck,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  FileText,
  ChevronDown
} from 'lucide-react';
import AdminShell from '../../components/layouts/AdminShell';
import { useApp } from '../../hooks/useApp';
import { ROUTES } from '../../config/routes';
import { useToast } from '../../components/common/ToastNotification';
import { triggerDownload, generateCSV } from '../../utils/downloadHelper';

import Select from "../../components/ui/Select";

export default function MaterialReturns() {
  const { navigate } = useApp();
  const { addToast } = useToast();

  // Return ledger list matching Screen 4
  const [returns, setReturns] = useState([
    {
      id: 'RT-9021',
      vendor: 'SteelFab Inc.',
      vendorId: 'ID: 88201',
      material: 'H-Beam G-40',
      qty: 'Qty: 24 units',
      condition: 'DAMAGED',
      conditionBg: '#fef2f2',
      conditionColor: '#dc2626',
      status: 'SHIPPED',
      statusBg: '#eff6ff',
      statusColor: '#2563eb'
    },
    {
      id: 'RT-9025',
      vendor: 'Lumber Metrics',
      vendorId: 'ID: 44092',
      material: 'Cedar Planks 2×4',
      qty: 'Qty: 110 units',
      condition: 'UNUSED',
      conditionBg: '#f1f5f9',
      conditionColor: '#475569',
      status: 'IN REVIEW',
      statusBg: '#f5f3ff',
      statusColor: '#7c3aed'
    },
    {
      id: 'RT-8992',
      vendor: 'Global Circuits',
      vendorId: 'ID: 11203',
      material: 'Control Panels v3',
      qty: 'Qty: 2 units',
      condition: 'DEFECTIVE',
      conditionBg: '#fef2f2',
      conditionColor: '#dc2626',
      status: 'REFUNDED',
      statusBg: '#ecfdf5',
      statusColor: '#059669'
    },
    {
      id: 'RT-8950',
      vendor: 'PipeMaster Ltd.',
      vendorId: 'ID: 77212',
      material: 'Copper Elbows 4"',
      qty: 'Qty: 45 units',
      condition: 'UNUSED',
      conditionBg: '#f1f5f9',
      conditionColor: '#475569',
      status: 'WAITING PICKUP',
      statusBg: '#0f172a',
      statusColor: '#ffffff'
    }
  ]);

  // Form states
  const [poRef, setPoRef] = useState('');
  const [qty, setQty] = useState(1);
  const [condition, setCondition] = useState('Unused');
  const [reason, setReason] = useState('');

  // Filtering & Pagination States
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [activeFilterMenu, setActiveFilterMenu] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedTrackingId, setSelectedTrackingId] = useState('RT-9021');

  // Log Return Modal Form States
  const [logReturnModalOpen, setLogReturnModalOpen] = useState(false);
  const [modalVendor, setModalVendor] = useState('SteelFab Inc.');
  const [modalMaterial, setModalMaterial] = useState('');
  const [modalPoRef, setModalPoRef] = useState('');
  const [modalQty, setModalQty] = useState(1);
  const [modalCondition, setModalCondition] = useState('Unused');
  const [modalReason, setModalReason] = useState('');

  const handleProcessReturn = (e) => {
    e.preventDefault();
    if (!poRef.trim() || !reason.trim()) {
      addToast('Please fill out the PO Reference Number and Return Reason.', 'error');
      return;
    }

    const newReturnId = `RT-${Math.floor(1000 + Math.random() * 9000)}`;
    const conditionUpper = condition.toUpperCase();
    
    let condBg = '#f1f5f9';
    let condCol = '#475569';
    if (conditionUpper === 'DAMAGED' || conditionUpper === 'DEFECTIVE') {
      condBg = '#fef2f2';
      condCol = '#dc2626';
    }

    const newReturnItem = {
      id: newReturnId,
      vendor: 'Generic Vendor Corp.',
      vendorId: `ID: ${Math.floor(10000 + Math.random() * 90000)}`,
      material: `Return Material (${poRef})`,
      qty: `Qty: ${qty} units`,
      condition: conditionUpper,
      conditionBg: condBg,
      conditionColor: condCol,
      status: 'INITIATED',
      statusBg: '#fef3c7',
      statusColor: '#d97706'
    };

    setReturns((prev) => [newReturnItem, ...prev]);
    setSelectedTrackingId(newReturnId);
    addToast(`Return logic initiated successfully! Logged as Return ID: ${newReturnId}`, 'success');
    
    // Reset inputs
    setPoRef('');
    setQty(1);
    setCondition('Unused');
    setReason('');
  };

  const handleModalProcessReturn = (e) => {
    e.preventDefault();
    if (!modalPoRef.trim() || !modalMaterial.trim() || !modalReason.trim()) {
      addToast('Please fill out all required fields.', 'error');
      return;
    }

    const newReturnId = `RT-${Math.floor(1000 + Math.random() * 9000)}`;
    const conditionUpper = modalCondition.toUpperCase();
    
    let condBg = '#f1f5f9';
    let condCol = '#475569';
    if (conditionUpper === 'DAMAGED' || conditionUpper === 'DEFECTIVE') {
      condBg = '#fef2f2';
      condCol = '#dc2626';
    }

    const newReturnItem = {
      id: newReturnId,
      vendor: modalVendor,
      vendorId: `ID: ${Math.floor(10000 + Math.random() * 90000)}`,
      material: modalMaterial,
      qty: `Qty: ${modalQty} units`,
      condition: conditionUpper,
      conditionBg: condBg,
      conditionColor: condCol,
      status: 'INITIATED',
      statusBg: '#fef3c7',
      statusColor: '#d97706'
    };

    setReturns((prev) => [newReturnItem, ...prev]);
    setSelectedTrackingId(newReturnId);
    addToast(`New return logged: ${newReturnId}`, 'success');
    setLogReturnModalOpen(false);

    // Reset inputs
    setModalMaterial('');
    setModalPoRef('');
    setModalQty(1);
    setModalCondition('Unused');
    setModalReason('');
  };

  const handleLogNewReturnButton = () => {
    setLogReturnModalOpen(true);
  };

  return (
    <AdminShell
      activeTab="Material Returns"
      brandText="Hozify Procurement"
      brandSubText="EXECUTIVE COMMAND"
      searchPlaceholder="Search returns..."
      customProfileName="Admin User"
      customProfileRole="Procurement Director"
    >
      <div style={{ padding: '24px 0', display: 'flex', flexDirection: 'column', gap: 'var(--spacing-section)' }}>
        
        {/* Header Section */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <h1 style={{ fontSize: '24px', fontWeight: '800', color: '#1c2536', margin: 0 }}>
              Material Returns
            </h1>
            <p style={{ fontSize: '14px', color: '#7a7688', marginTop: '4px', margin: 0 }}>
              Manage unused or damaged material workflow and track refund status.
            </p>
          </div>
          <div style={{ display: 'flex', gap: '12px', position: 'relative' }}>
            <button
              onClick={() => setActiveFilterMenu(!activeFilterMenu)}
              style={{
                background: '#ffffff',
                color: '#565365',
                border: '1px solid #cbd5e1',
                borderRadius: '6px',
                padding: '10px 16px',
                fontSize: '13px',
                fontWeight: '700',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}
              type="button"
            >
              <Filter size={15} />
              <span>Filter: {statusFilter === 'ALL' ? 'All' : statusFilter}</span>
            </button>

            {activeFilterMenu && (
              <>
                <div 
                  onClick={() => setActiveFilterMenu(false)}
                  style={{ position: 'fixed', inset: 0, zIndex: 999 }}
                />
                <div 
                  style={{ 
                    position: 'absolute', 
                    left: '0', 
                    top: '40px', 
                    width: '160px', 
                    background: '#ffffff', 
                    border: '1px solid #cbd5e1', 
                    borderRadius: '8px', 
                    boxShadow: '0 4px 12px rgba(0,0,0,0.1)', 
                    zIndex: 1000, 
                    padding: '6px 0',
                    textAlign: 'left'
                  }}
                >
                  {['ALL', 'INITIATED', 'SHIPPED', 'IN REVIEW', 'REFUNDED', 'WAITING PICKUP'].map((status) => (
                    <button
                      key={status}
                      onClick={() => {
                        setStatusFilter(status);
                        setCurrentPage(1);
                        setActiveFilterMenu(false);
                        addToast(`Filtered returns by ${status}`, 'info');
                      }}
                      style={{
                        width: '100%',
                        border: 'none',
                        background: 'transparent',
                        padding: '8px 12px',
                        fontSize: '12px',
                        color: '#1c2536',
                        fontWeight: statusFilter === status ? '800' : '500',
                        textAlign: 'left',
                        cursor: 'pointer'
                      }}
                      className="hover:bg-slate-50"
                    >
                      {status === 'ALL' ? 'All' : status}
                    </button>
                  ))}
                </div>
              </>
            )}

            <button
              onClick={handleLogNewReturnButton}
              style={{
                background: 'var(--primary)',
                color: '#ffffff',
                border: 'none',
                borderRadius: '6px',
                padding: '10px 18px',
                fontSize: '13px',
                fontWeight: '700',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                boxShadow: '0 4px 12px rgba(37,16,143,0.15)'
              }}
              type="button"
            >
              <Plus size={15} />
              <span>Log New Return</span>
            </button>
          </div>
        </div>

        {/* 4 KPIs Row */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px' }}>
          
          {/* KPI 1 */}
          <div className="panel" style={{ background: '#ffffff', border: '1.5px solid #25108f', borderRadius: '12px', padding: '20px' }}>
            <span style={{ display: 'block', fontSize: '10px', fontWeight: '800', color: '#7a7688', textTransform: 'uppercase' }}>Pending Returns</span>
            <strong style={{ display: 'block', fontSize: '24px', color: '#1c2536', fontWeight: '800', marginTop: '6px' }}>{returns.filter(r => r.status !== 'REFUNDED').length}</strong>
            <span style={{ display: 'block', fontSize: '11px', color: '#dc2626', fontWeight: '700', marginTop: '4px' }}>~12% vs last month</span>
          </div>

          {/* KPI 2 */}
          <div className="panel" style={{ background: '#ffffff', border: '1.5px solid #25108f', borderRadius: '12px', padding: '20px' }}>
            <span style={{ display: 'block', fontSize: '10px', fontWeight: '800', color: '#7a7688', textTransform: 'uppercase' }}>Refunds Processed</span>
            <strong style={{ display: 'block', fontSize: '24px', color: '#1c2536', fontWeight: '800', marginTop: '6px' }}>$42.8k</strong>
            <span style={{ display: 'block', fontSize: '11px', color: '#059669', fontWeight: '700', marginTop: '4px' }}>~8.4% recovery rate</span>
          </div>

          {/* KPI 3 */}
          <div className="panel" style={{ background: '#ffffff', border: '1.5px solid #25108f', borderRadius: '12px', padding: '20px' }}>
            <span style={{ display: 'block', fontSize: '10px', fontWeight: '800', color: '#7a7688', textTransform: 'uppercase' }}>Replacement Rate</span>
            <strong style={{ display: 'block', fontSize: '24px', color: '#1c2536', fontWeight: '800', marginTop: '6px' }}>32%</strong>
            <span style={{ display: 'block', fontSize: '11px', color: '#7a7688', marginTop: '4px' }}>vs 28% last month</span>
          </div>

          {/* KPI 4 */}
          <div className="panel" style={{ background: '#ffffff', border: '1.5px solid #25108f', borderRadius: '12px', padding: '20px' }}>
            <span style={{ display: 'block', fontSize: '10px', fontWeight: '800', color: '#7a7688', textTransform: 'uppercase' }}>Avg. Return Cycle</span>
            <strong style={{ display: 'block', fontSize: '24px', color: '#1c2536', fontWeight: '800', marginTop: '6px' }}>4.2d</strong>
            <span style={{ display: 'block', fontSize: '11px', color: '#059669', fontWeight: '700', marginTop: '4px' }}>~1.5d faster fulfillment</span>
          </div>

        </div>

        {/* Mid layout split: Return table & Quick Action widgets */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr', lgGridTemplateColumns: '2fr 1fr', gap: 'var(--spacing-section)' }}>
          
          {/* Left Panel: Active Returns Ledger */}
          <div className="panel" style={{ background: '#ffffff', border: '1.5px solid #25108f', borderRadius: '12px', padding: 'var(--spacing-section)' }}>
            <div style={{ display: 'flex', justifySelf: 'stretch', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h2 style={{ fontSize: '16px', fontWeight: '800', color: '#1c2536', margin: 0 }}>
                Active Returns
              </h2>
              <button
                onClick={() => {
                  const data = [
                    ["Return ID", "Vendor", "Material", "Quantity", "Condition", "Status"],
                    ...returns.map(r => [r.id, r.vendor, r.material, r.qty, r.condition, r.status])
                  ];
                  const csvContent = generateCSV(data[0], data.slice(1));
                  triggerDownload(csvContent, "material_returns_ledger.csv", "text/csv");
                  addToast("Returns ledger downloaded successfully!", "success");
                }}
                style={{ background: 'transparent', border: 'none', color: '#7a7688', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}
                aria-label="Download CSV report"
                type="button"
              >
                <Download size={16} />
              </button>
            </div>

            <div style={{ overflowX: 'auto' }}>
              <div className="table-responsive-wrapper">
<table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', minWidth: '550px' }}>
                <thead>
                  <tr style={{ borderBottom: '1.5px solid #25108f' }}>
                    <th style={{ padding: '12px 8px', fontSize: '11px', fontWeight: '800', color: '#7a7688', textTransform: 'uppercase' }}>Return ID</th>
                    <th style={{ padding: '12px 8px', fontSize: '11px', fontWeight: '800', color: '#7a7688', textTransform: 'uppercase' }}>Vendor</th>
                    <th style={{ padding: '12px 8px', fontSize: '11px', fontWeight: '800', color: '#7a7688', textTransform: 'uppercase' }}>Material</th>
                    <th style={{ padding: '12px 8px', fontSize: '11px', fontWeight: '800', color: '#7a7688', textTransform: 'uppercase' }}>Condition</th>
                    <th style={{ padding: '12px 8px', fontSize: '11px', fontWeight: '800', color: '#7a7688', textTransform: 'uppercase' }}>Status</th>
                    <th style={{ padding: '12px 8px', width: '30px' }} />
                  </tr>
                </thead>
                <tbody>
                  {(() => {
                    const filtered = returns.filter(r => statusFilter === 'ALL' || r.status === statusFilter);
                    const itemsPerPage = 3;
                    const totalPages = Math.ceil(filtered.length / itemsPerPage);
                    const activePage = Math.min(currentPage, totalPages || 1);
                    const displayed = filtered.slice((activePage - 1) * itemsPerPage, activePage * itemsPerPage);
                    
                    if (displayed.length === 0) {
                      return (
                        <tr>
                          <td colSpan="6" style={{ padding: 'var(--spacing-page)', textAlign: 'center', color: '#7a7688', fontSize: '13px', fontWeight: '600' }}>
                            No return records found matching the status filter.
                          </td>
                        </tr>
                      );
                    }

                    return displayed.map((row) => {
                      const isSelected = selectedTrackingId === row.id;
                      return (
                        <tr 
                          key={row.id} 
                          onClick={() => setSelectedTrackingId(row.id)}
                          style={{ 
                            borderBottom: '1px solid #f1f5f9', 
                            background: isSelected ? '#f8fafc' : 'transparent',
                            cursor: 'pointer',
                            transition: 'background 0.2s'
                          }}
                        >
                          <td style={{ padding: '16px 8px', fontSize: '13px', fontWeight: '700', color: 'var(--primary)' }}>
                            {row.id}
                          </td>
                          <td style={{ padding: '16px 8px' }}>
                            <div>
                              <strong style={{ display: 'block', fontSize: '13px', color: '#1c2536' }}>{row.vendor}</strong>
                              <span style={{ display: 'block', fontSize: '11px', color: '#7a7688', marginTop: '2px' }}>{row.vendorId}</span>
                            </div>
                          </td>
                          <td style={{ padding: '16px 8px' }}>
                            <div>
                              <strong style={{ display: 'block', fontSize: '13px', color: '#1c2536' }}>{row.material}</strong>
                              <span style={{ display: 'block', fontSize: '11px', color: '#7a7688', marginTop: '2px' }}>{row.qty}</span>
                            </div>
                          </td>
                          <td style={{ padding: '16px 8px' }}>
                            <span style={{
                              fontSize: '10px',
                              fontWeight: '800',
                              padding: '3px 8px',
                              borderRadius: '4px',
                              background: row.conditionBg,
                              color: row.conditionColor
                            }}>
                              {row.condition}
                            </span>
                          </td>
                          <td style={{ padding: '16px 8px' }}>
                            <span style={{
                              fontSize: '10px',
                              fontWeight: '800',
                              padding: '3px 8px',
                              borderRadius: '4px',
                              background: row.statusBg,
                              color: row.statusColor
                            }}>
                              {row.status}
                            </span>
                          </td>
                          <td style={{ padding: '16px 8px' }}>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                setSelectedTrackingId(row.id);
                                addToast(`Selected ${row.id} for tracking`, 'info');
                              }}
                              style={{ background: 'transparent', border: 'none', color: isSelected ? '#25108f' : '#7a7688', cursor: 'pointer' }}
                              aria-label="View return tracking"
                              type="button"
                            >
                              <ChevronRight size={16} />
                            </button>
                          </td>
                        </tr>
                      );
                    });
                  })()}
                </tbody>
              </table>
</div>
            </div>

            {/* Pagination */}
            {(() => {
              const filtered = returns.filter(r => statusFilter === 'ALL' || r.status === statusFilter);
              const itemsPerPage = 3;
              const totalPages = Math.ceil(filtered.length / itemsPerPage);
              const activePage = Math.min(currentPage, totalPages || 1);
              return (
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '20px' }}>
                  <span style={{ fontSize: '13px', color: '#7a7688' }}>
                    Showing {filtered.length > 0 ? (activePage - 1) * itemsPerPage + 1 : 0}-{Math.min(activePage * itemsPerPage, filtered.length)} of {filtered.length} returns
                  </span>
                  <div style={{ display: 'flex', gap: '4px', alignItems: 'center' }}>
                    <button 
                      onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                      disabled={activePage === 1}
                      style={{ width: '32px', height: '32px', borderRadius: '6px', border: '1px solid #cbd5e1', background: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: activePage === 1 ? 'default' : 'pointer', opacity: activePage === 1 ? 0.5 : 1 }} 
                      aria-label="Previous Page" 
                      type="button"
                    >
                      <ChevronLeft size={16} />
                    </button>
                    <button 
                      onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                      disabled={activePage === totalPages || totalPages === 0}
                      style={{ width: '32px', height: '32px', borderRadius: '6px', border: '1px solid #cbd5e1', background: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: (activePage === totalPages || totalPages === 0) ? 'default' : 'pointer', opacity: (activePage === totalPages || totalPages === 0) ? 0.5 : 1 }} 
                      aria-label="Next Page" 
                      type="button"
                    >
                      <ChevronRight size={16} />
                    </button>
                  </div>
                </div>
              );
            })()}

          </div>

          {/* Right Panel: Quick Action Form & Warehouse Sync */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-section)' }}>
            
            {/* Quick Action Card */}
            <div className="panel" style={{ background: '#ffffff', border: '1.5px solid #25108f', borderRadius: '12px', padding: 'var(--spacing-section)' }}>
              <div style={{ display: 'flex', gap: '10px', alignItems: 'center', marginBottom: '16px' }}>
                <div style={{ width: '30px', height: '30px', borderRadius: '6px', background: '#f5f3ff', color: '#7c3aed', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Zap size={16} />
                </div>
                <h3 style={{ fontSize: '15px', fontWeight: '800', color: '#1c2536', margin: 0 }}>
                  Quick Action
                </h3>
              </div>

              <form onSubmit={handleProcessReturn} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  <label htmlFor="poRef" style={{ fontSize: '11px', fontWeight: '800', color: '#7a7688', textTransform: 'uppercase' }}>PO Reference Number</label>
                  <input
                    id="poRef"
                    type="text"
                    placeholder="e.g. PO-7782"
                    value={poRef}
                    onChange={(e) => setPoRef(e.target.value)}
                    style={{
                      height: '36px',
                      border: '1px solid #cbd5e1',
                      borderRadius: '6px',
                      padding: '0 12px',
                      fontSize: '13px',
                      outline: 'none',
                      color: '#1c2536'
                    }}
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: '12px' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    <label htmlFor="qty" style={{ fontSize: '11px', fontWeight: '800', color: '#7a7688', textTransform: 'uppercase' }}>Quantity</label>
                    <input
                      id="qty"
                      type="number"
                      min="1"
                      value={qty}
                      onChange={(e) => setQty(parseInt(e.target.value, 10) || 1)}
                      style={{
                        height: '36px',
                        border: '1px solid #cbd5e1',
                        borderRadius: '6px',
                        padding: '0 12px',
                        fontSize: '13px',
                        outline: 'none',
                        color: '#1c2536',
                        textAlign: 'center'
                      }}
                    />
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    <label htmlFor="condition" style={{ fontSize: '11px', fontWeight: '800', color: '#7a7688', textTransform: 'uppercase' }}>Condition</label>
                    <div style={{ position: 'relative' }}>
                      <Select
                        id="condition"
                        value={condition}
                        onChange={(e) => setCondition(e.target.value)}
                        style={{
                          width: '100%',
                          height: '36px',
                          appearance: 'none',
                          background: '#ffffff',
                          border: '1px solid #cbd5e1',
                          borderRadius: '6px',
                          padding: '0 28px 0 12px',
                          fontSize: '13px',
                          outline: 'none',
                          color: '#1c2536',
                          cursor: 'pointer'
                        }}
                        options={[{
                          label: "Unused",
                          value: "Unused"
                        }, {
                          label: "Damaged",
                          value: "Damaged"
                        }, {
                          label: "Defective",
                          value: "Defective"
                        }]} />

                    </div>
                  </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  <label htmlFor="reason" style={{ fontSize: '11px', fontWeight: '800', color: '#7a7688', textTransform: 'uppercase' }}>Return Reason</label>
                  <textarea
                    id="reason"
                    placeholder="Describe the reason for return..."
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
                    style={{
                      minHeight: '60px',
                      border: '1px solid #cbd5e1',
                      borderRadius: '6px',
                      padding: '8px 12px',
                      fontSize: '13px',
                      outline: 'none',
                      color: '#1c2536',
                      resize: 'none'
                    }}
                  />
                </div>

                <button
                  type="submit"
                  style={{
                    width: '100%',
                    background: 'var(--primary)',
                    color: '#ffffff',
                    border: 'none',
                    borderRadius: '6px',
                    padding: '10px 0',
                    fontSize: '13px',
                    fontWeight: '700',
                    cursor: 'pointer',
                    boxShadow: '0 4px 12px rgba(37,16,143,0.15)',
                    marginTop: '4px'
                  }}
                >
                  Process Return
                </button>
              </form>
            </div>

            {/* Warehouse Sync Card */}
            <div className="panel" style={{ background: '#0f172a', color: '#ffffff', borderRadius: '12px', padding: '20px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <strong style={{ display: 'block', fontSize: '14.5px' }}>Warehouse Sync</strong>
              <p style={{ fontSize: '11.5px', color: '#94a3b8', margin: 0, lineHeight: '1.4' }}>
                All return logs are synchronized in real-time with central inventory and vendor portals for faster processing.
              </p>
              <span
                onClick={() => alert('Redirecting to live warehouse stock tracking dashboard...')}
                style={{ fontSize: '11.5px', color: '#38bdf8', fontWeight: '700', cursor: 'pointer', display: 'inline-block', textDecoration: 'none', marginTop: '6px' }}
              >
                View global status →
              </span>
            </div>

          </div>

        </div>

        {/* Workflow progress line */}
        <div className="panel" style={{ background: '#ffffff', border: '1.5px solid #25108f', borderRadius: '12px', padding: 'var(--spacing-section)' }}>
          <strong style={{ display: 'block', fontSize: '14px', color: '#1c2536', marginBottom: '20px' }}>
            Return Workflow Tracking: {selectedTrackingId} ({returns.find(r => r.id === selectedTrackingId)?.vendor || 'Generic'})
          </strong>
          
          {(() => {
            const selectedReturn = returns.find(r => r.id === selectedTrackingId) || returns[0] || { status: 'INITIATED' };
            const status = selectedReturn.status;
            
            const getStatusStyle = (stepIdx) => {
              let isCompleted = false;
              let isActive = false;
              
              if (status === 'COMPLETED') {
                isCompleted = true;
              } else if (status === 'REFUNDED') {
                if (stepIdx <= 4) isCompleted = true;
                else if (stepIdx === 5) isActive = true;
              } else if (status === 'IN REVIEW') {
                if (stepIdx <= 3) isCompleted = true;
                else if (stepIdx === 4) isActive = true;
              } else if (status === 'SHIPPED') {
                if (stepIdx <= 2) isCompleted = true;
                else if (stepIdx === 3) isActive = true;
              } else {
                if (stepIdx <= 1) isCompleted = true;
                else if (stepIdx === 2) isActive = true;
              }
              
              if (isCompleted) {
                return {
                  bg: '#f5f3ff',
                  color: 'var(--primary)',
                  border: '2px solid #25108f',
                  textColor: '#1c2536'
                };
              }
              if (isActive) {
                return {
                  bg: '#eff6ff',
                  color: '#2563eb',
                  border: '2px solid #2563eb',
                  textColor: '#2563eb',
                  pulse: true
                };
              }
              return {
                bg: '#f8fafc',
                color: '#94a3b8',
                border: '2px solid #e2e8f0',
                textColor: '#7a7688'
              };
            };

            const step1 = getStatusStyle(1);
            const step2 = getStatusStyle(2);
            const step3 = getStatusStyle(3);
            const step4 = getStatusStyle(4);
            const step5 = getStatusStyle(5);

            return (
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '20px', position: 'relative', width: '100%' }}>
                {/* Step 1 */}
                <div style={{ display: 'flex', gap: '12px', alignItems: 'center', flex: 1, minWidth: '140px' }}>
                  <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: step1.bg, color: step1.color, display: 'flex', alignItems: 'center', justifyContent: 'center', border: step1.border }}>
                    <CheckCircle2 size={16} />
                  </div>
                  <div>
                    <strong style={{ display: 'block', fontSize: '12.5px', color: step1.textColor }}>Initiated</strong>
                    <span style={{ display: 'block', fontSize: '10px', color: '#7a7688', marginTop: '2px' }}>Oct 12, 09:00</span>
                  </div>
                </div>

                <div style={{ flex: 0.5, height: '2px', background: step2.bg === '#f5f3ff' ? '#25108f' : '#e2e8f0', minWidth: '20px' }} />

                {/* Step 2 */}
                <div style={{ display: 'flex', gap: '12px', alignItems: 'center', flex: 1, minWidth: '140px' }}>
                  <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: step2.bg, color: step2.color, display: 'flex', alignItems: 'center', justifyContent: 'center', border: step2.border }}>
                    <Truck size={16} />
                  </div>
                  <div>
                    <strong style={{ display: 'block', fontSize: '12.5px', color: step2.textColor }}>Shipped</strong>
                    <span style={{ display: 'block', fontSize: '10px', color: '#7a7688', marginTop: '2px' }}>Oct 14, 14:30</span>
                  </div>
                </div>

                <div style={{ flex: 0.5, height: '2px', background: step3.bg === '#f5f3ff' ? '#25108f' : '#e2e8f0', minWidth: '20px' }} />

                {/* Step 3 */}
                <div style={{ display: 'flex', gap: '12px', alignItems: 'center', flex: 1, minWidth: '160px' }}>
                  <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: step3.bg, color: step3.color, display: 'flex', alignItems: 'center', justifyContent: 'center', border: step3.border }}>
                    <RefreshCw size={14} className={step3.pulse ? 'spin' : ''} />
                  </div>
                  <div>
                    <strong style={{ display: 'block', fontSize: '12.5px', color: step3.textColor }}>Vendor Inspection</strong>
                    <span style={{ display: 'block', fontSize: '10px', color: '#7a7688', marginTop: '2px' }}>{status === 'IN REVIEW' ? 'Completed' : (status === 'SHIPPED' ? 'In Progress' : 'Pending')}</span>
                  </div>
                </div>

                <div style={{ flex: 0.5, height: '2px', background: step4.bg === '#f5f3ff' ? '#25108f' : '#e2e8f0', minWidth: '20px' }} />

                {/* Step 4 */}
                <div style={{ display: 'flex', gap: '12px', alignItems: 'center', flex: 1, minWidth: '130px' }}>
                  <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: step4.bg, color: step4.color, display: 'flex', alignItems: 'center', justifyContent: 'center', border: step4.border }}>
                    <span>4</span>
                  </div>
                  <div>
                    <strong style={{ display: 'block', fontSize: '12.5px', color: step4.textColor }}>Refund Issued</strong>
                    <span style={{ display: 'block', fontSize: '10px', color: '#7a7688', marginTop: '2px' }}>{status === 'REFUNDED' || status === 'COMPLETED' ? 'Completed' : (status === 'IN REVIEW' ? 'Processing...' : 'Pending')}</span>
                  </div>
                </div>

                <div style={{ flex: 0.5, height: '2px', background: step5.bg === '#f5f3ff' ? '#25108f' : '#e2e8f0', minWidth: '20px' }} />

                {/* Step 5 */}
                <div style={{ display: 'flex', gap: '12px', alignItems: 'center', flex: 1, minWidth: '110px' }}>
                  <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: step5.bg, color: step5.color, display: 'flex', alignItems: 'center', justifyContent: 'center', border: step5.border }}>
                    <span>5</span>
                  </div>
                  <div>
                    <strong style={{ display: 'block', fontSize: '12.5px', color: step5.textColor }}>Completed</strong>
                    <span style={{ display: 'block', fontSize: '10px', color: '#7a7688', marginTop: '2px' }}>{status === 'COMPLETED' ? 'Finished' : 'Pending'}</span>
                  </div>
                </div>
              </div>
            );
          })()}

          <style>{`
            @keyframes spin {
              from { transform: rotate(0deg); }
              to { transform: rotate(360deg); }
            }
            .spin {
              animation: spin 3s linear infinite;
            }
          `}</style>
        </div>

        {/* Log Return Modal Dialog */}
        {logReturnModalOpen && (
          <div style={{ position: 'fixed', inset: 0, zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(15,23,42,0.6)', backdropFilter: 'blur(2px)' }}>
            <div style={{ position: 'absolute', inset: 0 }} onClick={() => setLogReturnModalOpen(false)} />
            <div style={{ position: 'relative', background: '#fff', width: '100%', maxWidth: '440px', borderRadius: '16px', padding: 'var(--spacing-section)', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.25)', border: '1px solid #f1f5f9' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                <h3 style={{ fontSize: '16px', fontWeight: '900', color: '#1c2536', margin: 0 }}>Log New Return</h3>
                <button onClick={() => setLogReturnModalOpen(false)} style={{ border: 'none', background: 'transparent', cursor: 'pointer', color: '#94a3b8', fontSize: '12px', fontWeight: '700' }} type="button">
                  Cancel
                </button>
              </div>

              <form onSubmit={handleModalProcessReturn} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div>
                  <label style={{ fontSize: '11px', fontWeight: '800', textTransform: 'uppercase', color: '#7a7688', display: 'block', marginBottom: '6px' }}>Vendor</label>
                  <Select
                    value={modalVendor}
                    onChange={(e) => setModalVendor(e.target.value)}
                    style={{ width: '100%', padding: '10px 12px', border: '1px solid #cbd5e1', borderRadius: '8px', fontSize: '13px', outline: 'none', background: '#fff' }}
                    options={[{
                      label: "SteelFab Inc.",
                      value: "SteelFab Inc."
                    }, {
                      label: "Lumber Metrics",
                      value: "Lumber Metrics"
                    }, {
                      label: "Global Circuits",
                      value: "Global Circuits"
                    }, {
                      label: "PipeMaster Ltd.",
                      value: "PipeMaster Ltd."
                    }]} />
                </div>

                <div>
                  <label style={{ fontSize: '11px', fontWeight: '800', textTransform: 'uppercase', color: '#7a7688', display: 'block', marginBottom: '6px' }}>Material Description</label>
                  <input
                    type="text"
                    value={modalMaterial}
                    onChange={(e) => setModalMaterial(e.target.value)}
                    placeholder="e.g. Cedar Planks 2x4"
                    style={{ width: '100%', padding: '10px 12px', border: '1px solid #cbd5e1', borderRadius: '8px', fontSize: '13px', outline: 'none' }}
                    required
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                  <div>
                    <label style={{ fontSize: '11px', fontWeight: '800', textTransform: 'uppercase', color: '#7a7688', display: 'block', marginBottom: '6px' }}>PO Reference</label>
                    <input
                      type="text"
                      value={modalPoRef}
                      onChange={(e) => setModalPoRef(e.target.value)}
                      placeholder="e.g. PO-8921"
                      style={{ width: '100%', padding: '10px 12px', border: '1px solid #cbd5e1', borderRadius: '8px', fontSize: '13px', outline: 'none' }}
                      required
                    />
                  </div>
                  <div>
                    <label style={{ fontSize: '11px', fontWeight: '800', textTransform: 'uppercase', color: '#7a7688', display: 'block', marginBottom: '6px' }}>Quantity</label>
                    <input
                      type="number"
                      min="1"
                      value={modalQty}
                      onChange={(e) => setModalQty(parseInt(e.target.value, 10) || 1)}
                      style={{ width: '100%', padding: '10px 12px', border: '1px solid #cbd5e1', borderRadius: '8px', fontSize: '13px', outline: 'none' }}
                      required
                    />
                  </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  <label style={{ fontSize: '11px', fontWeight: '800', textTransform: 'uppercase', color: '#7a7688', display: 'block', marginBottom: '6px' }}>Condition</label>
                  <Select
                    value={modalCondition}
                    onChange={(e) => setModalCondition(e.target.value)}
                    style={{ width: '100%', padding: '10px 12px', border: '1px solid #cbd5e1', borderRadius: '8px', fontSize: '13px', outline: 'none', background: '#fff' }}
                    options={[{
                      label: "Unused",
                      value: "Unused"
                    }, {
                      label: "Damaged",
                      value: "Damaged"
                    }, {
                      label: "Defective",
                      value: "Defective"
                    }]} />
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  <label style={{ fontSize: '11px', fontWeight: '800', textTransform: 'uppercase', color: '#7a7688', display: 'block', marginBottom: '6px' }}>Return Reason</label>
                  <textarea
                    placeholder="Describe the reason for return..."
                    value={modalReason}
                    onChange={(e) => setModalReason(e.target.value)}
                    style={{ minHeight: '60px', border: '1px solid #cbd5e1', borderRadius: '8px', padding: '8px 12px', fontSize: '13px', outline: 'none', resize: 'none' }}
                    required
                  />
                </div>

                <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                  <button
                    type="button"
                    onClick={() => setLogReturnModalOpen(false)}
                    style={{ flex: 1, padding: '10px', background: '#fff', border: '1px solid #cbd5e1', borderRadius: '8px', fontSize: '13px', fontWeight: '750', color: '#475569', cursor: 'pointer' }}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    style={{ flex: 1, padding: '10px', background: 'var(--primary)', border: 'none', borderRadius: '8px', fontSize: '13px', fontWeight: '750', color: '#fff', cursor: 'pointer' }}
                  >
                    Process Return
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

      </div>
    </AdminShell>
  );
}


