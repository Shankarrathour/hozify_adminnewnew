import React, { useState } from 'react';
import {
  SlidersHorizontal,
  Download,
  TrendingUp,
  Compass,
  FileText,
  ChevronLeft,
  ChevronRight,
  Info,
  Users,
  CheckCircle2,
  Clock,
  Truck,
  FileCheck,
  RefreshCw,
  MessageSquare,
  Search,
  Award
} from 'lucide-react';
import AdminShell from '../../components/layouts/AdminShell';
import { useApp } from '../../hooks/useApp';
import { ROUTES } from '../../config/routes';

export default function PurchaseOrders() {
  const { navigate } = useApp();
  const [activeTab, setActiveTab] = useState('All');
  const [selectedPo, setSelectedPo] = useState({
    id: 'PO-2024-8845',
    origin: 'SFO, US',
    destination: 'LHR, UK',
    eta: 'Oct 24, 2023',
    update: 'Departed Facility, Memphis TN Hub',
    express: true
  });

  const orders = [
    { id: 'PO-2024-8842', supplier: 'SteelCore Industries', tag: 'Industrial Parts', logo: 'SC', status: 'APPROVED', statusBg: '#ecfdf5', statusColor: '#059669', progress: '40% In Processing', pct: 40, amount: '$12,450.00', origin: 'CHI, US', destination: 'NYC, US', eta: 'Oct 22, 2023', update: 'Arrived at local hub' },
    { id: 'PO-2024-8845', supplier: 'Vertex Logistics', tag: 'Shipping Service', logo: 'VL', status: 'IN TRANSIT', statusBg: '#eff6ff', statusColor: '#2563eb', progress: 'Arriving Tue 85%', pct: 85, amount: '$4,820.00', origin: 'SFO, US', destination: 'LHR, UK', eta: 'Oct 24, 2023', update: 'Departed Facility, Memphis TN Hub' },
    { id: 'PO-2024-8849', supplier: 'Nexus Materials', tag: 'Raw Aggregates', logo: 'NM', status: 'PENDING', statusBg: '#fffbeb', statusColor: '#d97706', progress: 'Awaiting App. 5%', pct: 5, amount: '$34,100.00', origin: 'MIA, US', destination: 'ATL, US', eta: 'Oct 29, 2023', update: 'PO Created' },
    { id: 'PO-2024-8852', supplier: 'Global Electric', tag: 'Circuit Systems', logo: 'GE', status: 'APPROVED', statusBg: '#ecfdf5', statusColor: '#059669', progress: '60% In Warehouse', pct: 60, amount: '$2,100.00', origin: 'LAX, US', destination: 'SEA, US', eta: 'Oct 26, 2023', update: 'Inspected and loaded' },
    { id: 'PO-2024-8856', supplier: 'Quantra Tek', tag: 'Digital Modules', logo: 'QT', status: 'IN TRANSIT', statusBg: '#eff6ff', statusColor: '#2563eb', progress: 'In Flight 75%', pct: 75, amount: '$9,320.00', origin: 'HND, JP', destination: 'LAX, US', eta: 'Oct 24, 2023', update: 'Customs cleared' }
  ];

  const handleRowClick = (po) => {
    setSelectedPo({
      id: po.id,
      origin: po.origin,
      destination: po.destination,
      eta: po.eta,
      update: po.update,
      express: po.status === 'IN TRANSIT'
    });
  };

  const handleAction = (act) => {
    alert(`Quick Action: ${act} trigger initiated.`);
  };

  return (
    <AdminShell
      activeTab="Material Requests"
      brandText="Hozify Procurement"
      brandSubText="EXECUTIVE COMMAND"
      searchPlaceholder="Search PO numbers, suppliers, or products..."
      customProfileName="Admin User"
      customProfileRole="Procurement Director"
    >
      <div style={{ padding: '24px 0', display: 'flex', flexDirection: 'column', gap: 'var(--spacing-section)' }}>
        
        {/* Header Block */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <h1 style={{ fontSize: '24px', fontWeight: '800', color: '#1c2536', margin: 0 }}>
              Purchase Orders
            </h1>
            <p style={{ fontSize: '14px', color: '#7a7688', marginTop: '4px', margin: 0 }}>
              Manage and track all procurement transactions across active projects.
            </p>
          </div>
          <div style={{ display: 'flex', gap: '12px' }}>
            <button
              onClick={() => alert('Filtering order registry...')}
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
              <SlidersHorizontal size={15} />
              <span>Filters</span>
            </button>
            <button
              onClick={() => alert('Exporting purchase order logs...')}
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
              <Download size={15} />
              <span>Export</span>
            </button>
          </div>
        </div>

        {/* 4 KPIs Row */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px' }}>
          
          {/* KPI 1 */}
          <div className="panel" style={{ background: '#ffffff', border: '1.5px solid #25108f', borderRadius: '12px', padding: '20px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <div>
              <span style={{ display: 'block', fontSize: '10px', fontWeight: '800', color: '#7a7688', textTransform: 'uppercase' }}>Total PO Volume</span>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '6px' }}>
                <strong style={{ fontSize: '24px', color: '#1c2536', fontWeight: '800' }}>$1.42M</strong>
                <span style={{ fontSize: '11px', fontWeight: '700', color: '#059669', background: '#ecfdf5', padding: '2px 6px', borderRadius: '4px' }}>
                  +12.5%
                </span>
              </div>
            </div>
            <div style={{ height: '3.5px', background: 'var(--primary)', borderRadius: '1.5px', width: '80%' }} />
          </div>

          {/* KPI 2 */}
          <div className="panel" style={{ background: '#ffffff', border: '1.5px solid #25108f', borderRadius: '12px', padding: '20px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <div>
              <span style={{ display: 'block', fontSize: '10px', fontWeight: '800', color: '#7a7688', textTransform: 'uppercase' }}>Active Shipments</span>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '6px' }}>
                <strong style={{ fontSize: '24px', color: '#1c2536', fontWeight: '800' }}>24</strong>
                <span style={{ fontSize: '11.5px', color: '#d97706', fontWeight: '700' }}>4 Urgent</span>
              </div>
            </div>
            <div style={{ height: '3.5px', background: '#7c3aed', borderRadius: '1.5px', width: '50%' }} />
          </div>

          {/* KPI 3 */}
          <div className="panel" style={{ background: '#ffffff', border: '1.5px solid #25108f', borderRadius: '12px', padding: '20px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <div>
              <span style={{ display: 'block', fontSize: '10px', fontWeight: '800', color: '#7a7688', textTransform: 'uppercase' }}>Pending Invoices</span>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '6px' }}>
                <strong style={{ fontSize: '24px', color: '#1c2536', fontWeight: '800' }}>18</strong>
                <span style={{ fontSize: '11px', fontWeight: '700', color: '#dc2626', background: '#fef2f2', padding: '2px 6px', borderRadius: '4px' }}>
                  3 Late
                </span>
              </div>
            </div>
            {/* Overlapping profile avatars */}
            <div style={{ display: 'flex', alignItems: 'center' }}>
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
              <span style={{ fontSize: '11.5px', color: '#7a7688', fontWeight: '700' }}>+5</span>
            </div>
          </div>

          {/* KPI 4 */}
          <div className="panel" style={{ background: '#ffffff', border: '1.5px solid #25108f', borderRadius: '12px', padding: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <span style={{ display: 'block', fontSize: '10px', fontWeight: '800', color: '#7a7688', textTransform: 'uppercase' }}>Average Fulfillment</span>
              <strong style={{ display: 'block', fontSize: '24px', color: '#1c2536', fontWeight: '800', marginTop: '6px' }}>4.2 Days</strong>
              <div style={{ background: '#f3e8ff', color: '#7c3aed', padding: '3px 8px', borderRadius: '4px', display: 'inline-block', fontSize: '11px', fontWeight: '700', marginTop: '6px' }}>
                0.8 days faster than Q3
              </div>
            </div>
            <div style={{ color: '#7c3aed', opacity: 0.8 }}>
              <Compass size={24} />
            </div>
          </div>

        </div>

        {/* 2 Columns: Order Registry & Active Shipment Panel */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr', lgGridTemplateColumns: '2fr 1fr', gap: 'var(--spacing-section)' }}>
          
          {/* Left: Order Registry Table */}
          <div className="panel" style={{ background: '#ffffff', border: '1.5px solid #25108f', borderRadius: '12px', padding: 'var(--spacing-section)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <h2 style={{ fontSize: '16px', fontWeight: '800', color: '#1c2536', margin: 0 }}>
                  Order Registry
                </h2>
                <span style={{ fontSize: '11px', fontWeight: '700', color: '#7c3aed', background: '#f5f3ff', padding: '3px 8px', borderRadius: '12px' }}>
                  82 Active POs
                </span>
              </div>

              {/* Toggle switch controls */}
              <div style={{ display: 'flex', background: '#f1f5f9', padding: '3px', borderRadius: '6px' }}>
                {['All', 'Draft', 'Issued'].map((t) => (
                  <button
                    key={t}
                    onClick={() => setActiveTab(t)}
                    style={{
                      border: 'none',
                      background: activeTab === t ? '#ffffff' : 'transparent',
                      color: activeTab === t ? '#1c2536' : '#7a7688',
                      padding: '5px 12px',
                      borderRadius: '4px',
                      fontSize: '11.5px',
                      fontWeight: '700',
                      cursor: 'pointer',
                      boxShadow: activeTab === t ? '0 1px 3px rgba(0,0,0,0.06)' : 'none'
                    }}
                    type="button"
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            <div style={{ overflowY: 'auto', maxHeight: '400px' }}>
              <div className="table-responsive-wrapper">
<table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', minWidth: '600px' }}>
                <thead>
                  <tr style={{ borderBottom: '1.5px solid #25108f' }}>
                    <th style={{ padding: '12px 8px', fontSize: '11px', fontWeight: '800', color: '#7a7688', textTransform: 'uppercase' }}>PO Number</th>
                    <th style={{ padding: '12px 8px', fontSize: '11px', fontWeight: '800', color: '#7a7688', textTransform: 'uppercase' }}>Supplier</th>
                    <th style={{ padding: '12px 8px', fontSize: '11px', fontWeight: '800', color: '#7a7688', textTransform: 'uppercase' }}>Status</th>
                    <th style={{ padding: '12px 8px', fontSize: '11px', fontWeight: '800', color: '#7a7688', textTransform: 'uppercase' }}>Fulfillment</th>
                    <th style={{ padding: '12px 8px', fontSize: '11px', fontWeight: '800', color: '#7a7688', textTransform: 'uppercase', textAlign: 'right' }}>Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((po) => {
                    const isSelected = selectedPo.id === po.id;
                    return (
                      <tr 
                        key={po.id} 
                        onClick={() => handleRowClick(po)}
                        style={{ 
                          borderBottom: '1px solid #f1f5f9',
                          cursor: 'pointer',
                          background: isSelected ? '#f5f3ff' : 'transparent',
                          transition: 'background-color 0.15s ease'
                        }}
                      >
                        <td style={{ padding: '16px 8px', fontSize: '13px', fontWeight: '700', color: 'var(--primary)' }}>
                          {po.id}
                        </td>
                        <td style={{ padding: '16px 8px' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <div style={{ width: '26px', height: '26px', borderRadius: '4px', background: '#f0f4ff', color: 'var(--primary)', fontSize: '10px', fontWeight: '800', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                              {po.logo}
                            </div>
                            <div>
                              <strong style={{ display: 'block', fontSize: '13px', color: '#1c2536' }}>{po.supplier}</strong>
                              <span style={{ display: 'block', fontSize: '11px', color: '#7a7688', marginTop: '1px' }}>{po.tag}</span>
                            </div>
                          </div>
                        </td>
                        <td style={{ padding: '16px 8px' }}>
                          <span style={{
                            fontSize: '10px',
                            fontWeight: '800',
                            padding: '3px 8px',
                            borderRadius: '4px',
                            background: po.statusBg,
                            color: po.statusColor
                          }}>
                            {po.status}
                          </span>
                        </td>
                        <td style={{ padding: '16px 8px' }}>
                          <div style={{ width: '130px' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '10.5px', color: '#7a7688', marginBottom: '4px' }}>
                              <span>{po.progress}</span>
                            </div>
                            <div style={{ height: '4px', background: '#f1f5f9', borderRadius: '2px', overflow: 'hidden' }}>
                              <div style={{ width: `${po.pct}%`, height: '100%', background: po.statusColor, borderRadius: '2px' }} />
                            </div>
                          </div>
                        </td>
                        <td style={{ padding: '16px 8px', fontSize: '13.5px', fontWeight: '700', color: '#1c2536', textAlign: 'right' }}>
                          {po.amount}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
</div>
            </div>

            {/* Pagination Footer */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '20px', flexWrap: 'wrap', gap: '12px' }}>
              <span style={{ fontSize: '13px', color: '#7a7688' }}>
                Showing 1-5 of 82 orders
              </span>
              <div style={{ display: 'flex', gap: '4px', alignItems: 'center' }}>
                <button style={{ width: '32px', height: '32px', borderRadius: '6px', border: '1px solid #cbd5e1', background: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }} aria-label="Previous Page" type="button">
                  <ChevronLeft size={16} />
                </button>
                <button style={{ width: '32px', height: '32px', borderRadius: '6px', border: 'none', background: 'var(--primary)', color: '#ffffff', fontWeight: '700', fontSize: '13px', cursor: 'pointer' }} type="button">
                  1
                </button>
                <button style={{ width: '32px', height: '32px', borderRadius: '6px', border: '1px solid #cbd5e1', background: '#ffffff', color: '#565365', fontWeight: '700', fontSize: '13px', cursor: 'pointer' }} type="button">
                  2
                </button>
                <button style={{ width: '32px', height: '32px', borderRadius: '6px', border: '1px solid #cbd5e1', background: '#ffffff', color: '#565365', fontWeight: '700', fontSize: '13px', cursor: 'pointer' }} type="button">
                  3
                </button>
                <button style={{ width: '32px', height: '32px', borderRadius: '6px', border: '1px solid #cbd5e1', background: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }} aria-label="Next Page" type="button">
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>

          </div>

          {/* Right Column details widgets */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-section)' }}>
            
            {/* Active Shipment Tracker */}
            <div className="panel" style={{ background: '#ffffff', border: '1.5px solid #25108f', borderRadius: '12px', padding: 'var(--spacing-section)', position: 'relative' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                <span style={{ fontSize: '11px', fontWeight: '800', color: '#7a7688', textTransform: 'uppercase' }}>Active Shipment</span>
                {selectedPo.express && (
                  <span style={{ fontSize: '9px', fontWeight: '800', color: '#ffffff', background: '#3b82f6', padding: '3px 8px', borderRadius: '4px', textTransform: 'uppercase' }}>
                    Express
                  </span>
                )}
              </div>

              <strong style={{ display: 'block', fontSize: '18px', color: '#1c2536', marginBottom: '16px' }}>{selectedPo.id}</strong>

              {/* SFO -> LHR route graphic */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px', background: '#f8fafc', borderRadius: '8px', border: '1px solid #cbd5e1', marginBottom: '16px' }}>
                <div style={{ textAlign: 'center' }}>
                  <span style={{ display: 'block', fontSize: '10px', color: '#7a7688' }}>ORIGIN</span>
                  <strong style={{ display: 'block', fontSize: '15px', color: '#1c2536', marginTop: '2px' }}>{selectedPo.origin}</strong>
                </div>
                <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', margin: '0 12px' }}>
                  <div style={{ width: '100%', height: '2px', background: '#cbd5e1', position: 'absolute' }} />
                  <Truck size={16} style={{ color: 'var(--primary)', zIndex: 2, background: '#f8fafc', padding: '0 4px' }} />
                </div>
                <div style={{ textAlign: 'center' }}>
                  <span style={{ display: 'block', fontSize: '10px', color: '#7a7688' }}>DEST</span>
                  <strong style={{ display: 'block', fontSize: '15px', color: '#1c2536', marginTop: '2px' }}>{selectedPo.destination}</strong>
                </div>
              </div>

              {/* Delivery Details info box */}
              <div style={{ background: '#0b1329', color: '#ffffff', padding: '14px', borderRadius: '8px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: 'rgba(255,255,255,0.6)', marginBottom: '6px' }}>
                  <span>Estimated Delivery</span>
                  <span>Last Update</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12.5px', fontWeight: '700', marginBottom: '10px' }}>
                  <span>{selectedPo.eta}</span>
                  <span style={{ color: '#93c5fd' }}>Mid-Transit</span>
                </div>
                <p style={{ fontSize: '11px', color: 'rgba(255,255,255,0.7)', margin: 0, borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '8px' }}>
                  {selectedPo.update}
                </p>
              </div>
            </div>

            {/* Quick Actions (4 Buttons grid) */}
            <div className="panel" style={{ background: '#ffffff', border: '1.5px solid #25108f', borderRadius: '12px', padding: '20px' }}>
              <span style={{ display: 'block', fontSize: '11px', fontWeight: '800', color: '#7a7688', textTransform: 'uppercase', marginBottom: '14px' }}>Quick Actions</span>
              
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <button
                  onClick={() => handleAction('Bulk Invoice')}
                  style={{ background: '#f8fafc', border: '1px solid #cbd5e1', borderRadius: '8px', padding: '12px 8px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', cursor: 'pointer' }}
                  type="button"
                >
                  <FileText size={18} style={{ color: 'var(--primary)' }} />
                  <span style={{ fontSize: '11.5px', fontWeight: '700', color: '#1c2536' }}>Bulk Invoice</span>
                </button>
                
                <button
                  onClick={() => handleAction('Reconcile')}
                  style={{ background: '#f8fafc', border: '1px solid #cbd5e1', borderRadius: '8px', padding: '12px 8px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', cursor: 'pointer' }}
                  type="button"
                >
                  <RefreshCw size={18} style={{ color: 'var(--primary)' }} />
                  <span style={{ fontSize: '11.5px', fontWeight: '700', color: '#1c2536' }}>Reconcile</span>
                </button>

                <button
                  onClick={() => handleAction('Supplier Msg')}
                  style={{ background: '#f8fafc', border: '1px solid #cbd5e1', borderRadius: '8px', padding: '12px 8px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', cursor: 'pointer' }}
                  type="button"
                >
                  <MessageSquare size={18} style={{ color: 'var(--primary)' }} />
                  <span style={{ fontSize: '11.5px', fontWeight: '700', color: '#1c2536' }}>Supplier Msg</span>
                </button>

                <button
                  onClick={() => handleAction('Inventory Check')}
                  style={{ background: '#f8fafc', border: '1px solid #cbd5e1', borderRadius: '8px', padding: '12px 8px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', cursor: 'pointer' }}
                  type="button"
                >
                  <FileCheck size={18} style={{ color: 'var(--primary)' }} />
                  <span style={{ fontSize: '11.5px', fontWeight: '700', color: '#1c2536' }}>Inventory Check</span>
                </button>
              </div>
            </div>

            {/* Top Performing Supplier */}
            <div className="panel" style={{ background: '#ffffff', border: '1.5px solid #25108f', borderRadius: '12px', padding: '20px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
                <span style={{ fontSize: '10px', fontWeight: '800', color: '#7a7688', textTransform: 'uppercase' }}>Top Performing Supplier</span>
                <Info size={14} style={{ color: '#cbd5e1' }} />
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px' }}>
                <div style={{ width: '36px', height: '36px', borderRadius: '8px', background: '#f0fdf4', color: '#16a34a', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Award size={20} />
                </div>
                <div>
                  <strong style={{ display: 'block', fontSize: '14px', color: '#1c2536' }}>CyberCore Components</strong>
                  <span style={{ display: 'block', fontSize: '11.5px', color: '#16a34a', fontWeight: '700', marginTop: '2px' }}>98.5% Reliability Score</span>
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', borderTop: '1px solid #f1f5f9', borderBottom: '1px solid #f1f5f9', padding: '12px 0', marginBottom: '14px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px' }}>
                  <span style={{ color: '#7a7688' }}>Orders this month</span>
                  <strong style={{ color: '#1c2536' }}>12</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px' }}>
                  <span style={{ color: '#7a7688' }}>Avg. Response Time</span>
                  <strong style={{ color: '#1c2536' }}>1.2 Hours</strong>
                </div>
              </div>

              <button
                onClick={() => alert('View CyberCore analytical charts...')}
                style={{
                  width: '100%',
                  background: 'transparent',
                  border: '1px solid #25108f',
                  borderRadius: '6px',
                  padding: '8px 0',
                  fontSize: '12.5px',
                  fontWeight: '700',
                  color: 'var(--primary)',
                  cursor: 'pointer',
                  textAlign: 'center'
                }}
                type="button"
              >
                View Full Analysis
              </button>
            </div>

          </div>

        </div>

      </div>
    </AdminShell>
  );
}


