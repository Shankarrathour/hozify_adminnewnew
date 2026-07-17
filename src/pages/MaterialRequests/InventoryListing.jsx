import React, { useState, useMemo } from 'react';
import toast from 'react-hot-toast';
import {
  SlidersHorizontal,
  Download,
  Calendar,
  Edit2,
  ChevronLeft,
  ChevronRight,
  TrendingUp,
  ChevronDown,
  Plus
} from 'lucide-react';
import AdminShell from '../../components/layouts/AdminShell';
import { useApp } from '../../hooks/useApp';
import { ROUTES } from '../../config/routes';

import Select from "../../components/ui/Select";

const initialInventoryData = [
  {
    id: 'MAT-7721',
    name: 'Structural Steel I-Beam',
    desc: 'Grade A36, 10-meter',
    category: 'Raw Structural',
    avail: 142,
    availColor: '#1c2536',
    reserved: 28,
    status: 'VERIFIED',
    statusFilter: 'In Stock',
    statusBg: '#ecfdf5',
    statusColor: '#059669',
    hasAlert: false,
    img: 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&w=100&h=100&q=80'
  },
  {
    id: 'MAT-8902',
    name: 'Copper Bus Bar',
    desc: '200A Rated High Cond.',
    category: 'Electrical Systems',
    avail: 12,
    availColor: '#dc2626',
    reserved: 0,
    status: 'LOW STOCK',
    statusFilter: 'Low',
    statusBg: '#fffbeb',
    statusColor: '#d97706',
    hasAlert: true,
    img: 'https://images.unsplash.com/photo-1590674899484-d5640e854abe?auto=format&fit=crop&w=100&h=100&q=80'
  },
  {
    id: 'MAT-1022',
    name: 'Brushed Brass Handle',
    desc: 'Signature Series - 120mm',
    category: 'Finishing Hardware',
    avail: 450,
    availColor: '#1c2536',
    reserved: 120,
    status: 'VERIFIED',
    statusFilter: 'In Stock',
    statusBg: '#ecfdf5',
    statusColor: '#059669',
    hasAlert: false,
    img: 'https://images.unsplash.com/photo-1618220179428-22790b461013?auto=format&fit=crop&w=100&h=100&q=80'
  },
  {
    id: 'MAT-4451',
    name: 'HEPA Filter Unit',
    desc: 'Grade H13 - Multi-Stage',
    category: 'HVAC Components',
    avail: 85,
    availColor: '#1c2536',
    reserved: 15,
    status: 'PENDING Q.A.',
    statusFilter: 'In Stock',
    statusBg: '#f1f5f9',
    statusColor: '#475569',
    hasAlert: false,
    img: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=100&h=100&q=80'
  }
];

export default function InventoryListing() {
  const { navigate } = useApp();
  const [selectedCategory, setSelectedCategory] = useState('All Materials');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [showAdvanced, setShowAdvanced] = useState(false);

  const handleCreateRequest = () => {
    navigate(ROUTES.materialCreate);
  };

  const handleAdvanced = () => {
    setShowAdvanced(!showAdvanced);
  };

  const handleExportCSV = () => {
    // Empty action for now instead of alert
    console.log('Exporting CSV...');
  };

  const filteredData = useMemo(() => {
    return initialInventoryData.filter(item => {
      const matchCategory = selectedCategory === 'All Materials' || item.category === selectedCategory;
      const matchStatus = selectedStatus === 'All' || item.statusFilter === selectedStatus;
      return matchCategory && matchStatus;
    });
  }, [selectedCategory, selectedStatus]);

  return (
    <AdminShell
      activeTab="Material Management"
      brandText="Hozify Procurement"
      brandSubText="EXECUTIVE COMMAND"
      searchPlaceholder="Search materials by ID or name..."
      customProfileName="Admin User"
      customProfileRole="Procurement Director"
    >
      <div style={{ padding: '24px 0', display: 'flex', flexDirection: 'column', gap: 'var(--spacing-section)' }}>
        
        {/* Title and Stats Row */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <h1 style={{ fontSize: '24px', fontWeight: '800', color: '#1c2536', margin: 0 }}>
              Inventory Registry
            </h1>
            <p style={{ fontSize: '14px', color: '#7a7688', marginTop: '4px', margin: 0 }}>
              Master record of all raw materials and architectural supplies.
            </p>
          </div>
          
          {/* Header KPI Badge */}
          <div style={{ 
            background: '#ffffff', 
            border: '1.5px solid #25108f', 
            borderRadius: '8px', 
            padding: '12px 20px', 
            display: 'flex', 
            gap: 'var(--spacing-section)',
            alignItems: 'center',
            boxShadow: '0 1px 3px rgba(0,0,0,0.02)'
          }}>
            <div>
              <span style={{ display: 'block', fontSize: '10px', fontWeight: '800', color: '#7a7688', textTransform: 'uppercase' }}>Total SKUs</span>
              <strong style={{ display: 'block', fontSize: '18px', color: '#1c2536', fontWeight: '800', marginTop: '4px' }}>{filteredData.length}</strong>
            </div>
            <div style={{ width: '1px', background: '#e2e8f0', height: '30px' }} />
            <div>
              <span style={{ display: 'block', fontSize: '10px', fontWeight: '800', color: '#dc2626', textTransform: 'uppercase' }}>Low Stock</span>
              <strong style={{ display: 'block', fontSize: '18px', color: '#dc2626', fontWeight: '800', marginTop: '4px' }}>{filteredData.filter(item => item.statusFilter === 'Low').length} Alerts</strong>
            </div>
          </div>
        </div>

        {/* Filter Toolbar Panel & Inventory Health */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr', lgGridTemplateColumns: '2fr 1fr', gap: 'var(--spacing-section)' }}>
          
          {/* Filter Card */}
          <div className="panel" style={{ background: '#ffffff', border: '1.5px solid #25108f', borderRadius: '12px', padding: '16px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
            
            <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
              {/* Category Dropdown */}
              <div style={{ flex: '0 0 auto' }}>
                <label style={{ display: 'block', fontSize: '11px', fontWeight: '800', color: '#7a7688', textTransform: 'uppercase', marginBottom: '6px' }}>
                  Category
                </label>
                <div style={{ position: 'relative' }}>
                  <Select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    style={{
                      background: '#ffffff',
                      color: '#565365',
                      border: '1px solid #cbd5e1',
                      borderRadius: '6px',
                      padding: '6px 32px 6px 12px',
                      fontSize: '12px',
                      fontWeight: '700',
                      appearance: 'none',
                      outline: 'none',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center'
                    }}
                    aria-label="Filter by category"
                    options={[{
                      label: "All Materials",
                      value: "All Materials"
                    }, {
                      label: "Raw Structural",
                      value: "Raw Structural"
                    }, {
                      label: "Electrical Systems",
                      value: "Electrical Systems"
                    }, {
                      label: "Finishing Hardware",
                      value: "Finishing Hardware"
                    }, {
                      label: "HVAC Components",
                      value: "HVAC Components"
                    }]} />

                </div>
              </div>

              {/* Stock Status Segments */}
              <div style={{ flex: '1 1 180px' }}>
                <label style={{ display: 'block', fontSize: '11px', fontWeight: '800', color: '#7a7688', textTransform: 'uppercase', marginBottom: '6px' }}>
                  Stock Status
                </label>
                <div style={{ display: 'inline-flex', background: '#f1f5f9', padding: '3px', borderRadius: '6px', height: '34px', width: '100%' }}>
                  {['All', 'Low', 'In Stock'].map((st) => (
                    <button
                      key={st}
                      onClick={() => setSelectedStatus(st)}
                      style={{
                        flex: 1,
                        border: 'none',
                        background: selectedStatus === st ? '#ffffff' : 'transparent',
                        color: selectedStatus === st ? '#1c2536' : '#7a7688',
                        borderRadius: '4px',
                        fontSize: '12px',
                        fontWeight: '700',
                        cursor: 'pointer',
                        boxShadow: selectedStatus === st ? '0 1px 3px rgba(0,0,0,0.08)' : 'none',
                        transition: 'all 0.2s'
                      }}
                      type="button"
                    >
                      {st}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Actions Subbar */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid #f1f5f9', paddingTop: '12px' }}>
              <div style={{ fontSize: '12px', color: '#7a7688' }}>
                {showAdvanced && <span>Advanced options active</span>}
              </div>
              <div style={{ display: 'flex', gap: '8px' }}>
                <button
                  onClick={handleAdvanced}
                  style={{
                    background: showAdvanced ? '#f8fafc' : '#ffffff',
                    color: '#565365',
                    border: '1px solid #cbd5e1',
                    borderRadius: '6px',
                    padding: '6px 12px',
                    fontSize: '12px',
                    fontWeight: '700',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px'
                  }}
                  type="button"
                >
                  <SlidersHorizontal size={14} />
                  <span>Advanced</span>
                </button>
                <button
                  onClick={handleExportCSV}
                  style={{
                    background: '#ffffff',
                    color: '#565365',
                    border: '1px solid #cbd5e1',
                    borderRadius: '6px',
                    padding: '6px 12px',
                    fontSize: '12px',
                    fontWeight: '700',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px'
                  }}
                  type="button"
                  onClick={() => toast.success('CSV Export started.')}
                >
                  <Download size={14} />
                  <span>Export CSV</span>
                </button>
              </div>
            </div>

          </div>

          {/* Inventory Health Card */}
          <div className="panel" style={{ background: '#0b1329', color: '#ffffff', borderRadius: '12px', padding: 'var(--spacing-section)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <span style={{ fontSize: '10px', fontWeight: '800', color: 'rgba(255,255,255,0.6)', letterSpacing: '0.5px', textTransform: 'uppercase' }}>
                Inventory Health
              </span>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', marginTop: '6px' }}>
                <strong style={{ fontSize: '32px', fontWeight: '800', color: '#ffffff' }}>94.2%</strong>
                <span style={{ fontSize: '12px', fontWeight: '700', color: '#10b981', display: 'flex', alignItems: 'center', gap: '2px' }}>
                  <TrendingUp size={14} /> +2.1%
                </span>
              </div>
            </div>

            {/* Micro SVG Health bar chart */}
            <div style={{ height: '50px', display: 'flex', alignItems: 'flex-end', gap: '6px', marginTop: '16px' }}>
              {[30, 45, 40, 60, 50, 75, 70, 95].map((h, i) => (
                <div
                  key={i}
                  style={{
                    flex: 1,
                    height: `${h}%`,
                    background: i === 7 ? '#93c5fd' : 'rgba(255,255,255,0.2)',
                    borderRadius: '2px 2px 0 0'
                  }}
                />
              ))}
            </div>
          </div>

        </div>

        {/* Master Registry Table */}
        <div className="panel" style={{ background: '#ffffff', border: '1.5px solid #25108f', borderRadius: '12px', padding: 'var(--spacing-section)' }}>
          <div style={{ overflowX: 'auto' }}>
            <div className="table-responsive-wrapper">
<table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', minWidth: '850px' }}>
              <thead>
                <tr style={{ borderBottom: '1.5px solid #25108f' }}>
                  <th style={{ padding: '12px 8px', fontSize: '11px', fontWeight: '800', color: '#7a7688', textTransform: 'uppercase' }}>Material ID</th>
                  <th style={{ padding: '12px 8px', fontSize: '11px', fontWeight: '800', color: '#7a7688', textTransform: 'uppercase' }}>Name</th>
                  <th style={{ padding: '12px 8px', fontSize: '11px', fontWeight: '800', color: '#7a7688', textTransform: 'uppercase' }}>Category</th>
                  <th style={{ padding: '12px 8px', fontSize: '11px', fontWeight: '800', color: '#7a7688', textTransform: 'uppercase', textAlign: 'center' }}>Available Qty</th>
                  <th style={{ padding: '12px 8px', fontSize: '11px', fontWeight: '800', color: '#7a7688', textTransform: 'uppercase', textAlign: 'center' }}>Reserved Qty</th>
                  <th style={{ padding: '12px 8px', fontSize: '11px', fontWeight: '800', color: '#7a7688', textTransform: 'uppercase' }}>Status</th>
                  <th style={{ padding: '12px 8px', width: '90px' }} />
                </tr>
              </thead>
              <tbody>
                {filteredData.length > 0 ? (
                  filteredData.map((row) => (
                    <tr key={row.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                      <td style={{ padding: '14px 8px' }}>
                        <span style={{
                          background: '#f0f4ff',
                          color: 'var(--primary)',
                          padding: '4px 8px',
                          borderRadius: '4px',
                          fontSize: '11px',
                          fontWeight: '800'
                        }}>
                          {row.id}
                        </span>
                      </td>
                      <td style={{ padding: '14px 8px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                          <img src={row.img} alt={row.name} style={{ width: '36px', height: '36px', borderRadius: '6px', objectFit: 'cover' }} />
                          <div>
                            <strong style={{ display: 'block', fontSize: '13px', color: '#1c2536' }}>{row.name}</strong>
                            <span style={{ display: 'block', fontSize: '11px', color: '#7a7688', marginTop: '2px' }}>{row.desc}</span>
                          </div>
                        </div>
                      </td>
                      <td style={{ padding: '14px 8px', fontSize: '13px', color: '#565365' }}>
                        {row.category}
                      </td>
                      <td style={{ padding: '14px 8px', fontSize: '13px', fontWeight: '700', color: row.availColor, textAlign: 'center' }}>
                        {row.avail}
                      </td>
                      <td style={{ padding: '14px 8px', fontSize: '13px', color: '#565365', textAlign: 'center' }}>
                        {row.reserved}
                      </td>
                      <td style={{ padding: '14px 8px' }}>
                        <span style={{
                          fontSize: '11px',
                          fontWeight: '800',
                          padding: '3px 8px',
                          borderRadius: '4px',
                          background: row.statusBg,
                          color: row.statusColor
                        }}>
                          {row.status}
                        </span>
                      </td>
                      <td style={{ padding: '14px 8px', textAlign: 'right' }}>
                        <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end', alignItems: 'center' }}>
                          {row.hasAlert && (
                            <button
                              onClick={() => toast.success('Reorder schedule opened.')}
                              style={{ background: '#e0e7ff', border: 'none', color: 'var(--primary)', borderRadius: '4px', width: '26px', height: '26px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
                              title="Reorder Details"
                              type="button"
                            >
                              <Calendar size={14} />
                            </button>
                          )}
                          <button
                            onClick={() => toast.success('Edit item modal opened.')}
                            style={{ background: 'transparent', border: 'none', color: '#7a7688', cursor: 'pointer', padding: '4px' }}
                            title="Edit"
                            type="button"
                          >
                            <Edit2 size={15} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7" style={{ padding: 'var(--spacing-section)', textAlign: 'center', color: '#7a7688', fontSize: '13px' }}>
                      No materials found matching your filters.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
</div>
          </div>

          {/* Table Footer */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '20px', flexWrap: 'wrap', gap: '12px' }}>
            <span style={{ fontSize: '13px', color: '#7a7688' }}>
              Showing {filteredData.length > 0 ? 1 : 0}-{filteredData.length} of {filteredData.length} entries
            </span>
            <div style={{ display: 'flex', gap: '4px', alignItems: 'center' }}>
              <button style={{ width: '32px', height: '32px', borderRadius: '6px', border: '1px solid #cbd5e1', background: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }} aria-label="Previous Page" type="button">
                <ChevronLeft size={16} />
              </button>
              <button style={{ width: '32px', height: '32px', borderRadius: '6px', border: 'none', background: 'var(--primary)', color: '#ffffff', fontWeight: '700', fontSize: '13px', cursor: 'pointer' }} type="button">
                1
              </button>
              <button style={{ width: '32px', height: '32px', borderRadius: '6px', border: '1px solid #cbd5e1', background: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }} aria-label="Next Page" type="button">
                <ChevronRight size={16} />
              </button>
            </div>
          </div>

        </div>

        {/* System Footer Info Line */}
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center', 
          fontSize: '12px', 
          color: '#7a7688', 
          borderTop: '1.5px solid #25108f', 
          paddingTop: '20px', 
          marginTop: '12px',
          flexWrap: 'wrap',
          gap: '12px'
        }}>
          <span>© 2024 Hozify Procurement Systems</span>
          <div style={{ display: 'flex', gap: '20px' }}>
            <span style={{ cursor: 'pointer' }}>Documentation</span>
            <span style={{ cursor: 'pointer' }}>Release Notes</span>
            <span style={{ cursor: 'pointer' }}>Privacy</span>
          </div>
        </div>

      </div>
      {/* Floating Plus button on bottom right */}
      <button
        onClick={handleCreateRequest}
        style={{
          position: 'fixed',
          bottom: '24px',
          right: '24px',
          width: '50px',
          height: '50px',
          borderRadius: '50%',
          background: 'var(--primary)',
          color: '#ffffff',
          border: 'none',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 4px 12px rgba(37,16,143,0.3)',
          cursor: 'pointer',
          zIndex: 110
        }}
        aria-label="New restocking request"
        type="button"
      >
        <Plus size={24} />
      </button>
    </AdminShell>
  );
}


