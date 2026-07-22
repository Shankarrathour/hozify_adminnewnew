import React, { useState } from 'react';
import {
  Package,
  Zap,
  Brush,
  Wrench,
  Cpu,
  Plus,
  TrendingUp,
  ArrowRight,
  AlertCircle,
  MoreVertical
} from 'lucide-react';
import AdminShell from '../../components/layouts/AdminShell';
import { useApp } from '../../hooks/useApp';
import { ROUTES } from '../../config/routes';

export default function MaterialCategories() {
  const { navigate } = useApp();

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState('');
  const [newCategoryDesc, setNewCategoryDesc] = useState('');

  const handleAddCategory = () => {
    setIsCreateModalOpen(true);
  };

  const handleSaveCategory = (e) => {
    e.preventDefault();
    if (!newCategoryName.trim()) return;
    
    // Simulate save
    console.log('Saved new category:', newCategoryName, newCategoryDesc);
    setIsCreateModalOpen(false);
    setNewCategoryName('');
    setNewCategoryDesc('');
  };

  const handleViewAllActivity = () => {
    alert('Navigating to full activity audits logs...');
  };

  return (
    <>
    <AdminShell
      activeTab="Material Management"
      brandText="Hozify Procurement"
      brandSubText="EXECUTIVE COMMAND"
      searchPlaceholder="Search categories..."
      customProfileName="Admin User"
      customProfileRole="Procurement Director"
    >
      <div style={{ padding: '24px 0', display: 'flex', flexDirection: 'column', gap: 'var(--spacing-section)' }}>
        
        {/* Header Row */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <h1 style={{ fontSize: '24px', fontWeight: '800', color: '#1c2536', margin: 0 }}>
              Material Categories
            </h1>
            <p style={{ fontSize: '14px', color: '#7a7688', marginTop: '4px', margin: 0 }}>
              Manage organizational procurement verticals and track usage metrics.
            </p>
          </div>
          <div>
            <button
              onClick={handleAddCategory}
              style={{
                background: '#0f172a',
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
                boxShadow: '0 4px 12px rgba(15,23,42,0.15)'
              }}
              type="button"
            >
              <Plus size={16} />
              <span>Add Category</span>
            </button>
          </div>
        </div>

        {/* 4 KPIs Row */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px' }}>
          
          {/* KPI 1 */}
          <div className="panel" style={{ background: '#ffffff', border: '1.5px solid #25108f', borderRadius: '12px', padding: '20px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <span style={{ display: 'block', fontSize: '10px', fontWeight: '800', color: '#7a7688', textTransform: 'uppercase' }}>Total Categories</span>
            <strong style={{ display: 'block', fontSize: '28px', color: '#1c2536', fontWeight: '800' }}>12</strong>
            <div style={{ height: '3.5px', background: 'var(--primary)', borderRadius: '1.5px', width: '60%' }} />
          </div>

          {/* KPI 2 */}
          <div className="panel" style={{ background: '#ffffff', border: '1.5px solid #25108f', borderRadius: '12px', padding: '20px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <span style={{ display: 'block', fontSize: '10px', fontWeight: '800', color: '#7a7688', textTransform: 'uppercase' }}>Active Materials</span>
            <strong style={{ display: 'block', fontSize: '28px', color: '#1c2536', fontWeight: '800' }}>1,482</strong>
            <span style={{ fontSize: '12px', fontWeight: '700', color: '#059669', display: 'flex', alignItems: 'center', gap: '4px' }}>
              <TrendingUp size={14} /> +12% this month
            </span>
          </div>

          {/* KPI 3 */}
          <div className="panel" style={{ background: '#ffffff', border: '1.5px solid #25108f', borderRadius: '12px', padding: '20px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <span style={{ display: 'block', fontSize: '10px', fontWeight: '800', color: '#7a7688', textTransform: 'uppercase' }}>Avg. Usage Rate</span>
            <strong style={{ display: 'block', fontSize: '28px', color: '#1c2536', fontWeight: '800' }}>68%</strong>
            <span style={{ fontSize: '12px', fontWeight: '700', color: '#d97706', display: 'flex', alignItems: 'center', gap: '4px' }}>
              <ArrowRight size={14} /> Stable
            </span>
          </div>

          {/* KPI 4 */}
          <div className="panel" style={{ background: '#ffffff', border: '1.5px solid #25108f', borderRadius: '12px', padding: '20px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <span style={{ display: 'block', fontSize: '10px', fontWeight: '800', color: '#7a7688', textTransform: 'uppercase' }}>Low Stock Alerts</span>
            <strong style={{ display: 'block', fontSize: '28px', color: '#dc2626', fontWeight: '800' }}>24</strong>
            <span style={{ fontSize: '12px', fontWeight: '700', color: '#dc2626', display: 'flex', alignItems: 'center', gap: '4px' }}>
              <AlertCircle size={14} /> Action Required
            </span>
          </div>

        </div>

        {/* Categories Grid (6 Cards) */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 'var(--spacing-section)' }}>
          
          {/* Card 1: Packing */}
          <div className="panel" style={{ background: '#ffffff', border: '1.5px solid #25108f', borderRadius: '12px', padding: 'var(--spacing-section)', display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ width: '40px', height: '40px', borderRadius: '8px', background: '#eff6ff', color: '#2563eb', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Package size={22} />
            </div>
            <div>
              <h3 style={{ fontSize: '16px', fontWeight: '800', color: '#1c2536', margin: '0 0 6px 0' }}>Packing</h3>
              <p style={{ fontSize: '12.5px', color: '#7a7688', margin: 0, lineHeight: '1.5', minHeight: '60px' }}>
                Corrugated boxes, bubble wrap, industrial tape, and structural filler materials.
              </p>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', borderTop: '1px solid #f1f5f9', paddingTop: '14px' }}>
              <div>
                <span style={{ display: 'block', fontSize: '10px', color: '#7a7688', textTransform: 'uppercase' }}>Materials</span>
                <strong style={{ display: 'block', fontSize: '15px', color: '#1c2536', marginTop: '4px' }}>342</strong>
              </div>
              <div>
                <span style={{ display: 'block', fontSize: '10px', color: '#7a7688', textTransform: 'uppercase' }}>Monthly Usage</span>
                <strong style={{ display: 'block', fontSize: '15px', color: '#1c2536', marginTop: '4px' }}>8,4k</strong>
              </div>
            </div>
          </div>

          {/* Card 2: Electrical */}
          <div className="panel" style={{ background: '#ffffff', border: '1.5px solid #25108f', borderRadius: '12px', padding: 'var(--spacing-section)', display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ width: '40px', height: '40px', borderRadius: '8px', background: '#fffbeb', color: '#d97706', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Zap size={22} />
            </div>
            <div>
              <h3 style={{ fontSize: '16px', fontWeight: '800', color: '#1c2536', margin: '0 0 6px 0' }}>Electrical</h3>
              <p style={{ fontSize: '12.5px', color: '#7a7688', margin: 0, lineHeight: '1.5', minHeight: '60px' }}>
                Cables, circuit breakers, lighting fixtures, and industrial sensors.
              </p>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', borderTop: '1px solid #f1f5f9', paddingTop: '14px' }}>
              <div>
                <span style={{ display: 'block', fontSize: '10px', color: '#7a7688', textTransform: 'uppercase' }}>Materials</span>
                <strong style={{ display: 'block', fontSize: '15px', color: '#1c2536', marginTop: '4px' }}>512</strong>
              </div>
              <div>
                <span style={{ display: 'block', fontSize: '10px', color: '#7a7688', textTransform: 'uppercase' }}>Monthly Usage</span>
                <strong style={{ display: 'block', fontSize: '15px', color: '#1c2536', marginTop: '4px' }}>2,1k</strong>
              </div>
            </div>
          </div>

          {/* Card 3: Cleaning */}
          <div className="panel" style={{ background: '#ffffff', border: '1.5px solid #25108f', borderRadius: '12px', padding: 'var(--spacing-section)', display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ width: '40px', height: '40px', borderRadius: '8px', background: '#ecfdf5', color: '#059669', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Brush size={22} />
            </div>
            <div>
              <h3 style={{ fontSize: '16px', fontWeight: '800', color: '#1c2536', margin: '0 0 6px 0' }}>Cleaning</h3>
              <p style={{ fontSize: '12.5px', color: '#7a7688', margin: 0, lineHeight: '1.5', minHeight: '60px' }}>
                Sanitation chemicals, industrial vacuums, and heavy-duty protective gear.
              </p>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', borderTop: '1px solid #f1f5f9', paddingTop: '14px' }}>
              <div>
                <span style={{ display: 'block', fontSize: '10px', color: '#7a7688', textTransform: 'uppercase' }}>Materials</span>
                <strong style={{ display: 'block', fontSize: '15px', color: '#1c2536', marginTop: '4px' }}>128</strong>
              </div>
              <div>
                <span style={{ display: 'block', fontSize: '10px', color: '#7a7688', textTransform: 'uppercase' }}>Monthly Usage</span>
                <strong style={{ display: 'block', fontSize: '15px', color: '#1c2536', marginTop: '4px' }}>4,2k</strong>
              </div>
            </div>
          </div>

          {/* Card 4: Repair */}
          <div className="panel" style={{ background: '#ffffff', border: '1.5px solid #25108f', borderRadius: '12px', padding: 'var(--spacing-section)', display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ width: '40px', height: '40px', borderRadius: '8px', background: '#fef2f2', color: '#dc2626', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Wrench size={22} />
            </div>
            <div>
              <h3 style={{ fontSize: '16px', fontWeight: '800', color: '#1c2536', margin: '0 0 6px 0' }}>Repair</h3>
              <p style={{ fontSize: '12.5px', color: '#7a7688', margin: 0, lineHeight: '1.5', minHeight: '60px' }}>
                Spares for machinery, welding supplies, and lubrication compounds.
              </p>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', borderTop: '1px solid #f1f5f9', paddingTop: '14px' }}>
              <div>
                <span style={{ display: 'block', fontSize: '10px', color: '#7a7688', textTransform: 'uppercase' }}>Materials</span>
                <strong style={{ display: 'block', fontSize: '15px', color: '#1c2536', marginTop: '4px' }}>284</strong>
              </div>
              <div>
                <span style={{ display: 'block', fontSize: '10px', color: '#7a7688', textTransform: 'uppercase' }}>Monthly Usage</span>
                <strong style={{ display: 'block', fontSize: '15px', color: '#1c2536', marginTop: '4px' }}>1,8k</strong>
              </div>
            </div>
          </div>

          {/* Card 5: Equipment */}
          <div className="panel" style={{ background: '#ffffff', border: '1.5px solid #25108f', borderRadius: '12px', padding: 'var(--spacing-section)', display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ width: '40px', height: '40px', borderRadius: '8px', background: '#f5f3ff', color: '#8b5cf6', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Cpu size={22} />
            </div>
            <div>
              <h3 style={{ fontSize: '16px', fontWeight: '800', color: '#1c2536', margin: '0 0 6px 0' }}>Equipment</h3>
              <p style={{ fontSize: '12.5px', color: '#7a7688', margin: 0, lineHeight: '1.5', minHeight: '60px' }}>
                Heavy machinery, pneumatic tools, and automated assembly line components.
              </p>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', borderTop: '1px solid #f1f5f9', paddingTop: '14px' }}>
              <div>
                <span style={{ display: 'block', fontSize: '10px', color: '#7a7688', textTransform: 'uppercase' }}>Materials</span>
                <strong style={{ display: 'block', fontSize: '15px', color: '#1c2536', marginTop: '4px' }}>96</strong>
              </div>
              <div>
                <span style={{ display: 'block', fontSize: '10px', color: '#7a7688', textTransform: 'uppercase' }}>Monthly Usage</span>
                <strong style={{ display: 'block', fontSize: '15px', color: '#1c2536', marginTop: '4px' }}>520</strong>
              </div>
            </div>
          </div>

          {/* Card 6: New Category (Dashed border) */}
          <div 
            onClick={handleAddCategory}
            style={{ 
              background: 'transparent', 
              border: '2px dashed #cbd5e1', 
              borderRadius: '12px', 
              padding: 'var(--spacing-section)', 
              display: 'flex', 
              flexDirection: 'column', 
              alignItems: 'center', 
              justifyContent: 'center', 
              gap: '12px',
              cursor: 'pointer',
              minHeight: '230px',
              transition: 'all 0.15s ease'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.borderColor = '#25108f';
              e.currentTarget.style.background = '#f5f3ff';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.borderColor = '#cbd5e1';
              e.currentTarget.style.background = 'transparent';
            }}
          >
            <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: '#eff6ff', color: '#2563eb', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Plus size={24} />
            </div>
            <div style={{ textAlign: 'center' }}>
              <strong style={{ display: 'block', fontSize: '15px', color: '#1c2536' }}>New Category</strong>
              <span style={{ display: 'block', fontSize: '12px', color: '#7a7688', marginTop: '4px' }}>Create a new procurement vertical</span>
            </div>
          </div>

        </div>

        {/* Recent Category Modifications List */}
        <div className="panel" style={{ background: '#ffffff', border: '1.5px solid #25108f', borderRadius: '12px', padding: 'var(--spacing-section)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <h2 style={{ fontSize: '16px', fontWeight: '800', color: '#1c2536', margin: 0 }}>
              Recent Category Modifications
            </h2>
            <button
              onClick={handleViewAllActivity}
              style={{ background: 'transparent', border: 'none', color: 'var(--primary)', fontSize: '13px', fontWeight: '700', cursor: 'pointer' }}
              type="button"
            >
              View All Activity
            </button>
          </div>

          <div style={{ overflowY: 'auto', maxHeight: '400px' }}>
            <div className="table-responsive-wrapper">
<table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', minWidth: '700px' }}>
              <thead>
                <tr style={{ borderBottom: '1.5px solid #25108f' }}>
                  <th style={{ padding: '12px 8px', fontSize: '11px', fontWeight: '800', color: '#7a7688', textTransform: 'uppercase' }}>Category</th>
                  <th style={{ padding: '12px 8px', fontSize: '11px', fontWeight: '800', color: '#7a7688', textTransform: 'uppercase' }}>Action</th>
                  <th style={{ padding: '12px 8px', fontSize: '11px', fontWeight: '800', color: '#7a7688', textTransform: 'uppercase' }}>Modified By</th>
                  <th style={{ padding: '12px 8px', fontSize: '11px', fontWeight: '800', color: '#7a7688', textTransform: 'uppercase' }}>Date</th>
                  <th style={{ padding: '12px 8px', fontSize: '11px', fontWeight: '800', color: '#7a7688', textTransform: 'uppercase', textAlign: 'right' }}>Impact</th>
                </tr>
              </thead>
              <tbody>
                {[
                  {
                    cat: 'Packing',
                    act: 'STOCK ADDED',
                    actBg: '#ecfdf5',
                    actColor: '#059669',
                    user: 'John Dorsey',
                    initials: 'JD',
                    date: 'Oct 24, 2023 · 14:22',
                    impact: '+$12,400.00',
                    impactColor: '#059669'
                  },
                  {
                    cat: 'Electrical',
                    act: 'UPDATED',
                    actBg: '#fffbeb',
                    actColor: '#d97706',
                    user: 'Alice Miller',
                    initials: 'AM',
                    date: 'Oct 23, 2023 · 09:15',
                    impact: 'N/A',
                    impactColor: '#7a7688'
                  },
                  {
                    cat: 'Repair',
                    act: 'EXPIRING',
                    actBg: '#fef2f2',
                    actColor: '#dc2626',
                    user: 'System',
                    initials: 'SY',
                    date: 'Oct 22, 2023 · 18:45',
                    impact: '-12%',
                    impactColor: '#dc2626'
                  }
                ].map((row, idx) => (
                  <tr key={idx} style={{ borderBottom: '1px solid #f1f5f9' }}>
                    <td style={{ padding: '14px 8px', fontSize: '14px', fontWeight: '700', color: '#1c2536' }}>
                      {row.cat}
                    </td>
                    <td style={{ padding: '14px 8px' }}>
                      <span style={{
                        fontSize: '10px',
                        fontWeight: '800',
                        padding: '3px 8px',
                        borderRadius: '4px',
                        background: row.actBg,
                        color: row.actColor
                      }}>
                        {row.act}
                      </span>
                    </td>
                    <td style={{ padding: '14px 8px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <div style={{ width: '24px', height: '24px', borderRadius: '50%', background: '#f0f4ff', color: 'var(--primary)', fontSize: '10px', fontWeight: '800', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          {row.initials}
                        </div>
                        <span style={{ fontSize: '13px', color: '#1c2536', fontWeight: '600' }}>{row.user}</span>
                      </div>
                    </td>
                    <td style={{ padding: '14px 8px', fontSize: '13px', color: '#7a7688' }}>
                      {row.date}
                    </td>
                    <td style={{ padding: '14px 8px', fontSize: '13px', fontWeight: '700', color: row.impactColor, textAlign: 'right' }}>
                      {row.impact}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
</div>
          </div>
        </div>

      </div>

      {/* Floating Plus button on bottom right */}
      <button
        onClick={handleAddCategory}
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
        aria-label="Create new category vertical"
        type="button"
      >
        <Plus size={24} />
      </button>

    </AdminShell>
      
      {/* Create Category Modal */}
      {isCreateModalOpen && (
        <div style={{
          position: 'fixed',
          top: 0, left: 0, right: 0, bottom: 0,
          background: 'rgba(15, 23, 42, 0.6)',
          backdropFilter: 'blur(4px)',
          zIndex: 9999,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 'var(--spacing-section)'
        }}>
          <div style={{
            background: '#ffffff',
            borderRadius: '16px',
            width: '100%',
            maxWidth: '480px',
            boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
            overflow: 'hidden'
          }}>
            <div style={{ padding: 'var(--spacing-section)', borderBottom: '1px solid #f1f5f9' }}>
              <h2 style={{ fontSize: '18px', fontWeight: '800', color: '#1c2536', margin: 0 }}>Create New Category</h2>
              <p style={{ fontSize: '13px', color: '#7a7688', marginTop: '6px', margin: '6px 0 0 0' }}>Add a new vertical to track specialized materials.</p>
            </div>
            
            <form onSubmit={handleSaveCategory} style={{ padding: 'var(--spacing-section)' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: '800', color: '#1c2536', marginBottom: '8px' }}>
                    Category Name
                  </label>
                  <input
                    type="text"
                    required
                    value={newCategoryName}
                    onChange={(e) => setNewCategoryName(e.target.value)}
                    placeholder="e.g. Plumbing Hardware"
                    style={{
                      width: '100%',
                      padding: '12px',
                      borderRadius: '8px',
                      border: '1px solid #cbd5e1',
                      fontSize: '14px',
                      outline: 'none',
                      transition: 'border-color 0.2s'
                    }}
                    onFocus={(e) => e.target.style.borderColor = '#25108f'}
                    onBlur={(e) => e.target.style.borderColor = '#cbd5e1'}
                  />
                </div>
                
                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: '800', color: '#1c2536', marginBottom: '8px' }}>
                    Description
                  </label>
                  <textarea
                    rows="3"
                    value={newCategoryDesc}
                    onChange={(e) => setNewCategoryDesc(e.target.value)}
                    placeholder="Brief description of materials in this category..."
                    style={{
                      width: '100%',
                      padding: '12px',
                      borderRadius: '8px',
                      border: '1px solid #cbd5e1',
                      fontSize: '14px',
                      outline: 'none',
                      resize: 'none',
                      transition: 'border-color 0.2s'
                    }}
                    onFocus={(e) => e.target.style.borderColor = '#25108f'}
                    onBlur={(e) => e.target.style.borderColor = '#cbd5e1'}
                  />
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '32px' }}>
                <button
                  type="button"
                  onClick={() => setIsCreateModalOpen(false)}
                  style={{
                    padding: '10px 18px',
                    borderRadius: '8px',
                    border: '1px solid #cbd5e1',
                    background: '#ffffff',
                    color: '#565365',
                    fontSize: '13px',
                    fontWeight: '700',
                    cursor: 'pointer'
                  }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  style={{
                    padding: '10px 24px',
                    borderRadius: '8px',
                    border: 'none',
                    background: 'var(--primary)',
                    color: '#ffffff',
                    fontSize: '13px',
                    fontWeight: '700',
                    cursor: 'pointer',
                    boxShadow: '0 4px 12px rgba(37,16,143,0.15)'
                  }}
                >
                  Create Category
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}


