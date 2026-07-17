import React, { useState } from 'react';
import {
  ShieldAlert,
  ShieldCheck,
  Lock,
  AlertTriangle,
  ArrowRight,
  ChevronDown,
  Download,
  Plus,
  SlidersHorizontal,
  MoreVertical,
  Trash2,
  Edit3,
  Eye
} from 'lucide-react';
import AdminShell from '../../components/layouts/AdminShell';
import { useApp } from '../../hooks/useApp';
import { ROUTES } from '../../config/routes';
import { useToast } from '../../components/common/ToastNotification';

import Select from "../../components/ui/Select";

export default function InventoryDashboard() {
  const { navigate } = useApp();
  const { addToast } = useToast();
  const [timeframe, setTimeframe] = useState('Last 30 Days');

  // Materials State for dynamic table
  const [materials, setMaterials] = useState([
    {
      id: 1,
      name: 'Cold Rolled Steel Sheets',
      sku: 'STE-2940-CR',
      stock: 4200,
      unit: 'Units',
      status: 'Approved',
      updated: '2h ago',
      img: 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&w=100&h=100&q=80'
    },
    {
      id: 2,
      name: 'Industrial Grade Polymer',
      sku: 'POL-1120-HD',
      stock: 850,
      unit: 'Reorder',
      status: 'Pending',
      updated: '15m ago',
      img: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=100&h=100&q=80'
    },
    {
      id: 3,
      name: 'Aluminum Alloy Rods',
      sku: 'ALU-8821-EX',
      stock: 2150,
      unit: 'Units',
      status: 'Approved',
      updated: 'Yesterday',
      img: 'https://images.unsplash.com/photo-1535813547-99c456a41d4a?auto=format&fit=crop&w=100&h=100&q=80'
    },
    {
      id: 4,
      name: 'Micro-Control Units',
      sku: 'MCU-4512-P',
      stock: 12,
      unit: 'Critical',
      status: 'Suspended',
      updated: '5m ago',
      img: 'https://images.unsplash.com/photo-1591453089816-0fbb971b454c?auto=format&fit=crop&w=100&h=100&q=80'
    }
  ]);

  // Dropdown & Modal States
  const [activeMenuId, setActiveMenuId] = useState(null);
  const [adjustStockModalOpen, setAdjustStockModalOpen] = useState(false);
  const [selectedMaterialForStock, setSelectedMaterialForStock] = useState(null);
  const [newStockValue, setNewStockValue] = useState('');
  const [newStockUnit, setNewStockUnit] = useState('Units');

  const [editStatusModalOpen, setEditStatusModalOpen] = useState(false);
  const [selectedMaterialForStatus, setSelectedMaterialForStatus] = useState(null);
  const [newStatusValue, setNewStatusValue] = useState('Approved');

  const handleAddMaterial = () => {
    navigate(ROUTES.materialCreate);
  };

  const handleExportCSV = () => {
    alert('Exporting inventory registry to CSV...');
  };

  return (
    <AdminShell
      activeTab="Material Management"
      brandText="Hozify Procurement"
      brandSubText="EXECUTIVE COMMAND"
      searchPlaceholder="Search inventory..."
      customProfileName="Admin User"
      customProfileRole="Procurement Director"
    >
      <div style={{ padding: '24px 0', display: 'flex', flexDirection: 'column', gap: 'var(--spacing-section)' }}>
        
        {/* Header Row */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <h1 style={{ fontSize: '24px', fontWeight: '800', color: '#1c2536', margin: 0 }}>
              Material Inventory Dashboard
            </h1>
            <p style={{ fontSize: '14px', color: '#7a7688', marginTop: '4px', margin: 0 }}>
              Real-time stock levels and consumption tracking.
            </p>
          </div>
          <div style={{ display: 'flex', gap: '12px' }}>
            <button
              onClick={handleExportCSV}
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
              <Download size={16} />
              <span>Export CSV</span>
            </button>
            <button
              onClick={handleAddMaterial}
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
              <Plus size={16} />
              <span>Add Material</span>
            </button>
          </div>
        </div>

        {/* 4 KPIs Row */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px' }}>
          
          {/* KPI 1: Available Stock */}
          <div className="panel" style={{ background: '#ffffff', border: '1.5px solid #25108f', borderRadius: '12px', padding: '20px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ width: '36px', height: '36px', borderRadius: '8px', background: '#f5f3ff', color: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <ShieldCheck size={20} />
              </div>
              <span style={{ fontSize: '11px', fontWeight: '800', color: '#059669', background: '#ecfdf5', padding: '2px 6px', borderRadius: '4px' }}>
                +12% vs LW
              </span>
            </div>
            <div>
              <span style={{ display: 'block', fontSize: '11px', fontWeight: '800', color: '#7a7688', textTransform: 'uppercase' }}>Available Stock</span>
              <strong style={{ display: 'block', fontSize: '28px', color: '#1c2536', fontWeight: '800', marginTop: '4px' }}>12,482</strong>
            </div>
            <div style={{ height: '3px', background: 'var(--primary)', borderRadius: '1.5px', width: '80%' }} />
          </div>

          {/* KPI 2: Scheduled Requests */}
          <div className="panel" style={{ background: '#ffffff', border: '1.5px solid #25108f', borderRadius: '12px', padding: '20px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ width: '36px', height: '36px', borderRadius: '8px', background: '#eff6ff', color: '#2563eb', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Lock size={20} />
              </div>
              <span style={{ fontSize: '11px', color: '#7a7688' }}>Scheduled Requests</span>
            </div>
            <div>
              <span style={{ display: 'block', fontSize: '11px', fontWeight: '800', color: '#7a7688', textTransform: 'uppercase' }}>Reserved Items</span>
              <strong style={{ display: 'block', fontSize: '28px', color: '#1c2536', fontWeight: '800', marginTop: '4px' }}>1,894</strong>
            </div>
            <div style={{ height: '3px', background: '#bfdbfe', borderRadius: '1.5px', width: '50%' }} />
          </div>

          {/* KPI 3: Out of Stock */}
          <div className="panel" style={{ background: '#ffffff', border: '1.5px solid #25108f', borderRadius: '12px', padding: '20px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ width: '36px', height: '36px', borderRadius: '8px', background: '#fef2f2', color: '#dc2626', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <ShieldAlert size={20} />
              </div>
              <span style={{ fontSize: '11px', fontWeight: '800', color: '#dc2626', textTransform: 'uppercase' }}>Critical</span>
            </div>
            <div>
              <span style={{ display: 'block', fontSize: '11px', fontWeight: '800', color: '#7a7688', textTransform: 'uppercase' }}>Out of Stock</span>
              <strong style={{ display: 'block', fontSize: '28px', color: '#1c2536', fontWeight: '800', marginTop: '4px' }}>18</strong>
            </div>
            <span style={{ fontSize: '11px', color: '#dc2626', fontWeight: '600' }}>Needs immediate re-order</span>
          </div>

          {/* KPI 4: Low Stock Units */}
          <div className="panel" style={{ background: '#ffffff', border: '1.5px solid #25108f', borderRadius: '12px', padding: '20px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ width: '36px', height: '36px', borderRadius: '8px', background: '#fffbeb', color: '#d97706', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <AlertTriangle size={20} />
              </div>
              <span style={{ fontSize: '11px', fontWeight: '800', color: '#d97706', textTransform: 'uppercase' }}>Reorder Alert</span>
            </div>
            <div>
              <span style={{ display: 'block', fontSize: '11px', fontWeight: '800', color: '#7a7688', textTransform: 'uppercase' }}>Low Stock Units</span>
              <strong style={{ display: 'block', fontSize: '28px', color: '#1c2536', fontWeight: '800', marginTop: '4px' }}>142</strong>
            </div>
            {/* Overlapping profiles count badge */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <div style={{ display: 'flex', marginRight: '4px' }}>
                {[1, 2, 3].map((n) => (
                  <div
                    key={n}
                    style={{
                      width: '18px',
                      height: '18px',
                      borderRadius: '50%',
                      background: '#d7e1ff',
                      border: '1.5px solid #ffffff',
                      marginLeft: n > 1 ? '-6px' : '0',
                      zIndex: 4 - n
                    }}
                  />
                ))}
              </div>
              <span style={{ fontSize: '11px', color: '#7a7688', fontWeight: '700' }}>+12</span>
            </div>
          </div>

        </div>

        {/* Charts Section */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr', lgGridTemplateColumns: '2fr 1fr', gap: 'var(--spacing-section)' }}>
          
          {/* Inventory Levels Trend */}
          <div className="panel" style={{ background: '#ffffff', border: '1.5px solid #25108f', borderRadius: '12px', padding: 'var(--spacing-section)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h2 style={{ fontSize: '16px', fontWeight: '800', color: '#1c2536', margin: 0 }}>
                Inventory Levels Trend
              </h2>
              <div style={{ position: 'relative' }}>
                <Select
                  value={timeframe}
                  onChange={(e) => setTimeframe(e.target.value)}
                  style={{
                    appearance: 'none',
                    background: '#f1f5f9',
                    border: 'none',
                    borderRadius: '6px',
                    padding: '6px 28px 6px 12px',
                    fontSize: '12px',
                    fontWeight: '700',
                    color: '#565365',
                    outline: 'none',
                    cursor: 'pointer'
                  }}
                  aria-label="Select trend timeframe"
                  options={[{
                    label: "Last 30 Days",
                    value: "Last 30 Days"
                  }, {
                    label: "Last 6 Months",
                    value: "Last 6 Months"
                  }, {
                    label: "Yearly",
                    value: "Yearly"
                  }]} />

              </div>
            </div>

            {/* SVG Bar Chart */}
            <div style={{ height: '200px', display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid #f1f5f9' }}>
              {[
                { label: 'WK 1', height: 40, active: false },
                { label: 'WK 2', height: 60, active: false },
                { label: 'WK 3', height: 50, active: false },
                { label: 'WK 4', height: 90, active: true },
                { label: 'WK 5', height: 70, active: false },
                { label: 'WK 6', height: 45, active: false },
                { label: 'WK 7', height: 85, active: false },
                { label: 'WK 8', height: 65, active: false }
              ].map((bar, idx) => (
                <div key={idx} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '10%' }}>
                  <div
                    style={{
                      width: '100%',
                      height: `${bar.height}%`,
                      background: bar.active ? '#25108f' : '#d7e1ff',
                      borderRadius: '4px 4px 0 0',
                      transition: 'all 0.3s ease'
                    }}
                  />
                  <span style={{ fontSize: '10px', fontWeight: '800', color: '#7a7688', marginTop: '8px' }}>{bar.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Consumption by Dept */}
          <div className="panel" style={{ background: '#ffffff', border: '1.5px solid #25108f', borderRadius: '12px', padding: 'var(--spacing-section)', display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <h2 style={{ fontSize: '16px', fontWeight: '800', color: '#1c2536', margin: 0 }}>
              Consumption by Dept
            </h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {[
                { dept: 'Engineering', pct: '45%', color: 'var(--primary)' },
                { dept: 'Operations', pct: '32%', color: '#1c2536' },
                { dept: 'Logistics', pct: '15%', color: '#93c5fd' },
                { dept: 'R&D', pct: '8%', color: '#cbd5e1' }
              ].map((item, idx) => (
                <div key={idx}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', marginBottom: '6px' }}>
                    <span style={{ fontWeight: '700', color: '#1c2536' }}>{item.dept}</span>
                    <strong style={{ color: '#565365' }}>{item.pct}</strong>
                  </div>
                  <div style={{ height: '6px', background: '#f1f5f9', borderRadius: '3px', overflow: 'hidden' }}>
                    <div style={{ width: item.pct, height: '100%', background: item.color, borderRadius: '3px' }} />
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={() => navigate(ROUTES.materialReports)}
              style={{
                width: '100%',
                background: 'transparent',
                border: '1px solid #cbd5e1',
                borderRadius: '6px',
                padding: '10px 0',
                fontSize: '13px',
                fontWeight: '700',
                color: '#565365',
                cursor: 'pointer',
                textAlign: 'center',
                marginTop: 'auto'
              }}
              type="button"
            >
              View Detailed Log
            </button>
          </div>

        </div>

        {/* Live Inventory Status Table */}
        <div className="panel" style={{ background: '#ffffff', border: '1.5px solid #25108f', borderRadius: '12px', padding: 'var(--spacing-section)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '16px' }}>
            <h2 style={{ fontSize: '16px', fontWeight: '800', color: '#1c2536', margin: 0 }}>
              Live Inventory Status
            </h2>
            <div style={{ display: 'flex', gap: '8px' }}>
              <button style={{ border: 'none', background: 'transparent', color: '#565365', cursor: 'pointer', padding: '4px' }} title="Filter" type="button">
                <SlidersHorizontal size={18} />
              </button>
            </div>
          </div>

          <div style={{ overflowX: 'auto' }}>
            <div className="table-responsive-wrapper">
<table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', minWidth: '700px' }}>
              <thead>
                <tr style={{ borderBottom: '1.5px solid #25108f' }}>
                  <th style={{ padding: '12px 8px', fontSize: '11px', fontWeight: '800', color: '#7a7688', textTransform: 'uppercase' }}>Material Name</th>
                  <th style={{ padding: '12px 8px', fontSize: '11px', fontWeight: '800', color: '#7a7688', textTransform: 'uppercase' }}>SKU</th>
                  <th style={{ padding: '12px 8px', fontSize: '11px', fontWeight: '800', color: '#7a7688', textTransform: 'uppercase' }}>Stock Level</th>
                  <th style={{ padding: '12px 8px', fontSize: '11px', fontWeight: '800', color: '#7a7688', textTransform: 'uppercase' }}>Status</th>
                  <th style={{ padding: '12px 8px', fontSize: '11px', fontWeight: '800', color: '#7a7688', textTransform: 'uppercase' }}>Last Updated</th>
                  <th style={{ padding: '12px 8px', width: '50px' }} />
                </tr>
              </thead>
              <tbody>
                {materials.map((row, idx) => {
                  // Compute stock styles dynamically
                  let stockColor = '#1c2536';
                  if (row.unit === 'Critical') {
                    stockColor = '#dc2626';
                  } else if (row.unit === 'Reorder') {
                    stockColor = '#d97706';
                  }

                  // Compute status styles dynamically
                  let statusBg = '#ecfdf5';
                  let statusColor = '#059669';
                  if (row.status === 'Pending') {
                    statusBg = '#fffbeb';
                    statusColor = '#d97706';
                  } else if (row.status === 'Suspended') {
                    statusBg = '#fef2f2';
                    statusColor = '#dc2626';
                  }

                  return (
                    <tr key={row.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                      <td style={{ padding: '14px 8px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                          <img src={row.img} alt={row.name} style={{ width: '36px', height: '36px', borderRadius: '6px', objectFit: 'cover' }} />
                          <strong style={{ fontSize: '13px', color: '#1c2536' }}>{row.name}</strong>
                        </div>
                      </td>
                      <td style={{ padding: '14px 8px', fontSize: '12px', color: '#565365', fontWeight: '600' }}>
                        {row.sku}
                      </td>
                      <td style={{ padding: '14px 8px', fontSize: '13px', fontWeight: '700', color: stockColor }}>
                        {row.stock.toLocaleString()} {row.unit}
                      </td>
                      <td style={{ padding: '14px 8px' }}>
                        <span style={{
                          fontSize: '11px',
                          fontWeight: '800',
                          padding: '3px 8px',
                          borderRadius: '4px',
                          background: statusBg,
                          color: statusColor
                        }}>
                          {row.status}
                        </span>
                      </td>
                      <td style={{ padding: '14px 8px', fontSize: '12px', color: '#7a7688' }}>
                        {row.updated}
                      </td>
                      <td style={{ padding: '14px 8px', textAlign: 'right', position: 'relative' }}>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setActiveMenuId(activeMenuId === row.id ? null : row.id);
                          }}
                          style={{ border: 'none', background: 'transparent', color: '#7a7688', cursor: 'pointer', padding: '6px' }}
                          type="button"
                          aria-label="More actions"
                        >
                          <MoreVertical size={16} />
                        </button>

                        {/* Actions 3-dot dropdown menu */}
                        {activeMenuId === row.id && (
                          <>
                            <div 
                              onClick={(e) => { e.stopPropagation(); setActiveMenuId(null); }}
                              style={{ position: 'fixed', inset: 0, zIndex: 999 }}
                            />
                            <div 
                              style={{ 
                                position: 'absolute', 
                                right: '10px', 
                                top: '34px', 
                                width: '150px', 
                                background: '#ffffff', 
                                border: '1px solid var(--line, #e2e8f0)', 
                                borderRadius: '8px', 
                                boxShadow: '0 4px 12px rgba(0,0,0,0.15)', 
                                zIndex: 1000, 
                                padding: '4px 0',
                                textAlign: 'left'
                              }}
                            >
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setActiveMenuId(null);
                                  navigate(ROUTES.materialDetails);
                                }}
                                style={{ width: '100%', border: 'none', background: 'transparent', padding: '8px 12px', fontSize: '12px', color: '#111827', fontWeight: '700', textAlign: 'left', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}
                                className="hover:bg-slate-50"
                              >
                                <Eye size={14} />
                                <span>View Details</span>
                              </button>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setActiveMenuId(null);
                                  setSelectedMaterialForStock(row);
                                  setNewStockValue(row.stock);
                                  setNewStockUnit(row.unit);
                                  setAdjustStockModalOpen(true);
                                }}
                                style={{ width: '100%', border: 'none', background: 'transparent', padding: '8px 12px', fontSize: '12px', color: '#111827', fontWeight: '700', textAlign: 'left', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}
                                className="hover:bg-slate-50"
                              >
                                <SlidersHorizontal size={14} />
                                <span>Adjust Stock</span>
                              </button>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setActiveMenuId(null);
                                  setSelectedMaterialForStatus(row);
                                  setNewStatusValue(row.status);
                                  setEditStatusModalOpen(true);
                                }}
                                style={{ width: '100%', border: 'none', background: 'transparent', padding: '8px 12px', fontSize: '12px', color: '#111827', fontWeight: '700', textAlign: 'left', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}
                                className="hover:bg-slate-50"
                              >
                                <Edit3 size={14} />
                                <span>Edit Status</span>
                              </button>
                              <div style={{ borderTop: '1px solid #f1f5f9', margin: '4px 0' }} />
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setActiveMenuId(null);
                                  if (confirm(`Are you sure you want to delete ${row.name}?`)) {
                                    setMaterials(prev => prev.filter(m => m.id !== row.id));
                                    addToast(`${row.name} deleted successfully`, 'success');
                                  }
                                }}
                                style={{ width: '100%', border: 'none', background: 'transparent', padding: '8px 12px', fontSize: '12px', color: '#ef4444', fontWeight: '700', textAlign: 'left', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}
                                className="hover:bg-slate-50"
                              >
                                <Trash2 size={14} />
                                <span>Delete</span>
                              </button>
                            </div>
                          </>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
</div>
          </div>

          {/* Pagination */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '20px', flexWrap: 'wrap', gap: '12px' }}>
            <span style={{ fontSize: '13px', color: '#7a7688' }}>
              Showing 1-10 of 124 materials
            </span>
            <div style={{ display: 'flex', gap: '8px' }}>
              <button style={{ background: '#ffffff', border: '1px solid #cbd5e1', color: '#565365', borderRadius: '6px', padding: '6px 14px', fontSize: '13px', fontWeight: '700', cursor: 'pointer' }} type="button">
                Previous
              </button>
              <button style={{ background: '#0b1329', border: 'none', color: '#ffffff', borderRadius: '6px', padding: '6px 14px', fontSize: '13px', fontWeight: '700', cursor: 'pointer' }} type="button">
                Next
              </button>
            </div>
          </div>

        </div>

        {/* Modal containers */}
        {adjustStockModalOpen && selectedMaterialForStock && (
          <div style={{ position: 'fixed', inset: 0, zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(15,23,42,0.6)', backdropFilter: 'blur(2px)' }}>
            <div style={{ position: 'absolute', inset: 0 }} onClick={() => setAdjustStockModalOpen(false)} />
            <div style={{ position: 'relative', background: '#fff', width: '100%', maxWidth: '400px', borderRadius: '16px', padding: 'var(--spacing-section)', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.25)', border: '1px solid #f1f5f9' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                <h3 style={{ fontSize: '16px', fontWeight: '900', color: '#1c2536', margin: 0 }}>Adjust Stock Level</h3>
                <button onClick={() => setAdjustStockModalOpen(false)} style={{ border: 'none', background: 'transparent', cursor: 'pointer', color: '#94a3b8', fontSize: '12px', fontWeight: '700' }} type="button">
                  Cancel
                </button>
              </div>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <p style={{ fontSize: '13px', color: '#565365', margin: 0 }}>
                  Adjust the stock quantity and classification category for <strong>{selectedMaterialForStock.name}</strong>.
                </p>

                <div>
                  <label style={{ fontSize: '11px', fontWeight: '800', textTransform: 'uppercase', color: '#7a7688', display: 'block', marginBottom: '6px' }}>Quantity</label>
                  <input
                    type="number"
                    value={newStockValue}
                    onChange={(e) => setNewStockValue(e.target.value)}
                    style={{ width: '100%', padding: '10px 12px', border: '1px solid #cbd5e1', borderRadius: '8px', fontSize: '13px', outline: 'none' }}
                  />
                </div>

                <div>
                  <label style={{ fontSize: '11px', fontWeight: '800', textTransform: 'uppercase', color: '#7a7688', display: 'block', marginBottom: '6px' }}>Stock Alert Category</label>
                  <Select
                    value={newStockUnit}
                    onChange={(e) => setNewStockUnit(e.target.value)}
                    style={{ width: '100%', padding: '10px 12px', border: '1px solid #cbd5e1', borderRadius: '8px', fontSize: '13px', outline: 'none', background: '#fff' }}
                    options={[{
                      label: "Normal (Units)",
                      value: "Units"
                    }, {
                      label: "Low Stock Alert (Reorder)",
                      value: "Reorder"
                    }, {
                      label: "Critical Alert (Critical)",
                      value: "Critical"
                    }]} />
                </div>

                <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                  <button
                    type="button"
                    onClick={() => setAdjustStockModalOpen(false)}
                    style={{ flex: 1, padding: '10px', background: '#fff', border: '1px solid #cbd5e1', borderRadius: '8px', fontSize: '13px', fontWeight: '750', color: '#475569', cursor: 'pointer' }}
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      const val = parseInt(newStockValue, 10);
                      if (isNaN(val) || val < 0) {
                        addToast('Please enter a valid stock level.', 'error');
                        return;
                      }
                      setMaterials(prev => prev.map(m => m.id === selectedMaterialForStock.id ? {
                        ...m,
                        stock: val,
                        unit: newStockUnit
                      } : m));
                      addToast(`Stock for ${selectedMaterialForStock.name} updated!`, 'success');
                      setAdjustStockModalOpen(false);
                    }}
                    style={{ flex: 1, padding: '10px', background: 'var(--primary)', border: 'none', borderRadius: '8px', fontSize: '13px', fontWeight: '750', color: '#fff', cursor: 'pointer' }}
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {editStatusModalOpen && selectedMaterialForStatus && (
          <div style={{ position: 'fixed', inset: 0, zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(15,23,42,0.6)', backdropFilter: 'blur(2px)' }}>
            <div style={{ position: 'absolute', inset: 0 }} onClick={() => setEditStatusModalOpen(false)} />
            <div style={{ position: 'relative', background: '#fff', width: '100%', maxWidth: '400px', borderRadius: '16px', padding: 'var(--spacing-section)', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.25)', border: '1px solid #f1f5f9' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                <h3 style={{ fontSize: '16px', fontWeight: '900', color: '#1c2536', margin: 0 }}>Edit Material Status</h3>
                <button onClick={() => setEditStatusModalOpen(false)} style={{ border: 'none', background: 'transparent', cursor: 'pointer', color: '#94a3b8', fontSize: '12px', fontWeight: '700' }} type="button">
                  Cancel
                </button>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <p style={{ fontSize: '13px', color: '#565365', margin: 0 }}>
                  Select the status for <strong>{selectedMaterialForStatus.name}</strong>.
                </p>

                <div>
                  <label style={{ fontSize: '11px', fontWeight: '800', textTransform: 'uppercase', color: '#7a7688', display: 'block', marginBottom: '6px' }}>Status</label>
                  <Select
                    value={newStatusValue}
                    onChange={(e) => setNewStatusValue(e.target.value)}
                    style={{ width: '100%', padding: '10px 12px', border: '1px solid #cbd5e1', borderRadius: '8px', fontSize: '13px', outline: 'none', background: '#fff' }}
                    options={[{
                      label: "Approved",
                      value: "Approved"
                    }, {
                      label: "Pending",
                      value: "Pending"
                    }, {
                      label: "Suspended",
                      value: "Suspended"
                    }]} />
                </div>

                <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                  <button
                    type="button"
                    onClick={() => setEditStatusModalOpen(false)}
                    style={{ flex: 1, padding: '10px', background: '#fff', border: '1px solid #cbd5e1', borderRadius: '8px', fontSize: '13px', fontWeight: '750', color: '#475569', cursor: 'pointer' }}
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setMaterials(prev => prev.map(m => m.id === selectedMaterialForStatus.id ? {
                        ...m,
                        status: newStatusValue
                      } : m));
                      addToast(`Status of ${selectedMaterialForStatus.name} updated to ${newStatusValue}!`, 'success');
                      setEditStatusModalOpen(false);
                    }}
                    style={{ flex: 1, padding: '10px', background: 'var(--primary)', border: 'none', borderRadius: '8px', fontSize: '13px', fontWeight: '750', color: '#fff', cursor: 'pointer' }}
                  >
                    Save Status
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </AdminShell>
  );
}


