import React, { useState } from 'react';
import { Info, Plus, Lightbulb, Loader2, X } from 'lucide-react';
import AdminShell from '../../components/layouts/AdminShell';
import { useToast } from '../../components/common/ToastNotification';
import Select from '../../components/ui/Select';

const INITIAL_STATE = {
  ispCommission: "12.50",
  bspServiceFee: "8.00",
  sellerMargin: "15.00",
};

const INITIAL_CATEGORIES = [
  { id: 1, name: "Enterprise Cloud", ispRate: "14.00", bspRate: "5.00", type: "PERCENTAGE", status: "Active" },
  { id: 2, name: "Logistics & Shipping", ispRate: "12.00", bspRate: "4.50", type: "FIXED FEE", status: "Active" },
  { id: 3, name: "Consumer Electronics", ispRate: "9.25", bspRate: "6.00", type: "PERCENTAGE", status: "Draft" }
];

const MOCK_MORE_CATEGORIES = [
  { id: 4, name: "Fashion & Apparel", ispRate: "10.00", bspRate: "3.50", type: "PERCENTAGE", status: "Active" },
  { id: 5, name: "Home & Furniture", ispRate: "15.00", bspRate: "6.00", type: "PERCENTAGE", status: "Active" },
  { id: 6, name: "Digital Subscriptions", ispRate: "1.00", bspRate: "0.20", type: "FIXED FEE", status: "Active" },
  { id: 7, name: "Groceries & Daily Needs", ispRate: "5.00", bspRate: "2.50", type: "PERCENTAGE", status: "Active" },
  { id: 8, name: "Books & Media", ispRate: "8.50", bspRate: "4.00", type: "PERCENTAGE", status: "Draft" }
];

export default function CommissionSettings() {
  const { addToast } = useToast();
  
  const [formData, setFormData] = useState(INITIAL_STATE);
  const [isSaving, setIsSaving] = useState(false);

  // Category Rules State
  const [categories, setCategories] = useState(INITIAL_CATEGORIES);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newRule, setNewRule] = useState({
    name: '',
    ispRate: '',
    bspRate: '',
    type: 'PERCENTAGE',
    status: 'Active'
  });

  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [hasLoadedMore, setHasLoadedMore] = useState(false);

  const handleLoadMore = (e) => {
    e.preventDefault();
    setIsLoadingMore(true);
    setTimeout(() => {
      setCategories(prev => [...prev, ...MOCK_MORE_CATEGORIES]);
      setIsLoadingMore(false);
      setHasLoadedMore(true);
      addToast("Loaded all categories", "success");
    }, 800);
  };

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleDiscard = () => {
    setFormData(INITIAL_STATE);
    addToast("Changes discarded.", "info");
  };

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      addToast("Commission structures saved successfully!", "success");
    }, 800);
  };

  const handleAddRule = (e) => {
    e.preventDefault();
    if (!newRule.name || !newRule.ispRate || !newRule.bspRate) {
      addToast("Please fill in all required fields", "error");
      return;
    }
    
    const ruleToAdd = {
      ...newRule,
      id: Date.now()
    };
    
    setCategories(prev => [ruleToAdd, ...prev]);
    setIsModalOpen(false);
    setNewRule({ name: '', ispRate: '', bspRate: '', type: 'PERCENTAGE', status: 'Active' });
    addToast("Category rule added successfully!", "success");
  };

  return (
    <AdminShell
      activeTab="Settings"
      customProfileName="Alex Rivera"
      customProfileRole="Admin User"
      showGridIcon={true}
    >
      <div className="commission-settings-page relative" style={{ padding: '32px 40px 60px' }}>
        
        {/* Breadcrumb & Header Row */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '32px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '11px', fontWeight: '700', color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '12px' }}>
              <span style={{ color: '#94a3b8' }}>Financial</span>
              <span style={{ color: '#cbd5e1' }}>›</span>
              <span style={{ color: 'var(--text)' }}>Commission Settings</span>
            </div>
            <h1 style={{ fontSize: '28px', fontWeight: '800', color: 'var(--text)', margin: '0 0 8px' }}>
              Global Commission Structures
            </h1>
            <p style={{ fontSize: '14px', color: 'var(--muted)', margin: 0 }}>
              Configure administrative fees, vendor splits, and regional overrides across all entities.
            </p>
          </div>
          <div style={{ display: 'flex', gap: '12px', marginTop: '24px' }}>
            <button 
              onClick={handleDiscard} 
              disabled={isSaving}
              type="button" 
              style={{ padding: '0 20px', height: '40px', background: '#fff', border: '1px solid #e2e8f0', borderRadius: '6px', fontSize: '13px', fontWeight: '700', color: 'var(--text)', cursor: isSaving ? 'not-allowed' : 'pointer', opacity: isSaving ? 0.6 : 1 }}
            >
              Discard Changes
            </button>
            <button 
              onClick={handleSave} 
              disabled={isSaving}
              type="button" 
              style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '0 24px', height: '40px', background: '#1e1b4b', border: 'none', borderRadius: '6px', fontSize: '13px', fontWeight: '700', color: '#fff', cursor: isSaving ? 'not-allowed' : 'pointer', opacity: isSaving ? 0.8 : 1 }}
            >
              {isSaving && <Loader2 size={16} className="animate-spin" />}
              Save Structures
            </button>
          </div>
        </div>

        {/* Main Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: '32px' }}>
          
          {/* Left Column */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-section)' }}>
            
            {/* Standard Entities Base Rates */}
            <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '28px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                <h2 style={{ fontSize: '18px', fontWeight: '800', color: 'var(--text)', margin: 0 }}>Standard Entities Base Rates</h2>
                <Info size={20} style={{ color: '#94a3b8' }} />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 'var(--spacing-section)', marginBottom: '32px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <label style={{ fontSize: '11px', fontWeight: '800', color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>ISP Commission</label>
                  <div style={{ display: 'flex', height: '44px', border: '1px solid #e2e8f0', borderRadius: '6px', overflow: 'hidden' }}>
                    <input 
                      type="number" 
                      value={formData.ispCommission}
                      onChange={(e) => handleChange('ispCommission', e.target.value)}
                      style={{ flex: 1, padding: '0 16px', border: 'none', fontSize: '14px', color: 'var(--text)', fontWeight: '600', outline: 'none' }}
                    />
                    <div style={{ background: '#f8fafc', padding: '0 16px', borderLeft: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', fontSize: '14px', color: 'var(--muted)', fontWeight: '600' }}>
                      %
                    </div>
                  </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <label style={{ fontSize: '11px', fontWeight: '800', color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>BSP Service Fee</label>
                  <div style={{ display: 'flex', height: '44px', border: '1px solid #e2e8f0', borderRadius: '6px', overflow: 'hidden' }}>
                    <input 
                      type="number" 
                      value={formData.bspServiceFee}
                      onChange={(e) => handleChange('bspServiceFee', e.target.value)}
                      style={{ flex: 1, padding: '0 16px', border: 'none', fontSize: '14px', color: 'var(--text)', fontWeight: '600', outline: 'none' }}
                    />
                    <div style={{ background: '#f8fafc', padding: '0 16px', borderLeft: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', fontSize: '14px', color: 'var(--muted)', fontWeight: '600' }}>
                      %
                    </div>
                  </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <label style={{ fontSize: '11px', fontWeight: '800', color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Seller Margin</label>
                  <div style={{ display: 'flex', height: '44px', border: '1px solid #e2e8f0', borderRadius: '6px', overflow: 'hidden' }}>
                    <input 
                      type="number" 
                      value={formData.sellerMargin}
                      onChange={(e) => handleChange('sellerMargin', e.target.value)}
                      style={{ flex: 1, padding: '0 16px', border: 'none', fontSize: '14px', color: 'var(--text)', fontWeight: '600', outline: 'none' }}
                    />
                    <div style={{ background: '#f8fafc', padding: '0 16px', borderLeft: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', fontSize: '14px', color: 'var(--muted)', fontWeight: '600' }}>
                      %
                    </div>
                  </div>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--spacing-section)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 20px', border: '1px solid #e2e8f0', borderRadius: '6px' }}>
                  <div>
                    <h3 style={{ fontSize: '13px', fontWeight: '800', color: 'var(--text)', margin: '0 0 4px' }}>Fixed Transaction Fee</h3>
                    <p style={{ fontSize: '11px', color: 'var(--muted)', margin: 0 }}>Applied per successful invoice</p>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '16px', fontWeight: '700', color: 'var(--text)' }}>
                    <span style={{ color: 'var(--muted)' }}>$</span> 0.50
                  </div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 20px', border: '1px solid #e2e8f0', borderRadius: '6px' }}>
                  <div>
                    <h3 style={{ fontSize: '13px', fontWeight: '800', color: 'var(--text)', margin: '0 0 4px' }}>Settlement Buffer</h3>
                    <p style={{ fontSize: '11px', color: 'var(--muted)', margin: 0 }}>Holding period for disputes</p>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '16px', fontWeight: '700', color: 'var(--text)' }}>
                    48 <span style={{ color: 'var(--muted)', fontSize: '13px' }}>HRS</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Category-Level Overrides */}
            <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '28px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                <h2 style={{ fontSize: '18px', fontWeight: '800', color: 'var(--text)', margin: 0 }}>Category-Level Overrides</h2>
                <button onClick={() => setIsModalOpen(true)} type="button" style={{ display: 'flex', alignItems: 'center', gap: '6px', background: 'none', border: 'none', fontSize: '13px', fontWeight: '700', color: '#4f46e5', cursor: 'pointer', padding: 0 }}>
                  <Plus size={16} /> Add Category Rule
                </button>
              </div>

              <div style={{ border: '1px solid #e2e8f0', borderRadius: '6px', overflow: 'hidden' }}>
                <div className="table-responsive-wrapper">
                  <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                    <thead>
                      <tr style={{ background: '#f8fafc', borderBottom: '1px solid #e2e8f0' }}>
                        <th style={{ padding: '16px', fontSize: '10px', fontWeight: '800', color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Category Name</th>
                        <th style={{ padding: '16px', fontSize: '10px', fontWeight: '800', color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>ISP Rate</th>
                        <th style={{ padding: '16px', fontSize: '10px', fontWeight: '800', color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>BSP Rate</th>
                        <th style={{ padding: '16px', fontSize: '10px', fontWeight: '800', color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Type</th>
                        <th style={{ padding: '16px', fontSize: '10px', fontWeight: '800', color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {categories.map(cat => (
                        <tr key={cat.id} style={{ borderBottom: '1px solid #e2e8f0' }} className="animate-in fade-in">
                          <td style={{ padding: '16px', fontSize: '13px', fontWeight: '600', color: 'var(--text)' }}>{cat.name}</td>
                          <td style={{ padding: '16px', fontSize: '13px', color: 'var(--text)' }}>
                            {cat.type === 'PERCENTAGE' ? `${cat.ispRate}%` : `$${cat.ispRate}`}
                          </td>
                          <td style={{ padding: '16px', fontSize: '13px', color: 'var(--text)' }}>
                            {cat.type === 'PERCENTAGE' ? `${cat.bspRate}%` : `$${cat.bspRate}`}
                          </td>
                          <td style={{ padding: '16px' }}>
                            <span style={{ 
                              padding: '4px 8px', 
                              background: cat.type === 'PERCENTAGE' ? '#eff6ff' : '#fef2f2', 
                              color: cat.type === 'PERCENTAGE' ? '#2563eb' : '#ef4444', 
                              borderRadius: '4px', fontSize: '10px', fontWeight: '800', letterSpacing: '0.5px' 
                            }}>
                              {cat.type}
                            </span>
                          </td>
                          <td style={{ padding: '16px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', fontWeight: '600', color: cat.status === 'Active' ? 'var(--text)' : 'var(--muted)' }}>
                              <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: cat.status === 'Active' ? '#22c55e' : '#94a3b8' }}></span> {cat.status}
                            </div>
                          </td>
                        </tr>
                      ))}
                      {categories.length === 0 && (
                        <tr>
                          <td colSpan="5" style={{ padding: '32px', textAlign: 'center', color: 'var(--muted)', fontSize: '13px' }}>
                            No category rules configured.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
                {!hasLoadedMore && (
                  <div style={{ padding: '16px', textAlign: 'center', borderTop: '1px solid #e2e8f0', background: '#fafafa' }}>
                    <button 
                      onClick={handleLoadMore} 
                      disabled={isLoadingMore}
                      style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'none', border: 'none', fontSize: '12px', fontWeight: '700', color: 'var(--muted)', cursor: isLoadingMore ? 'not-allowed' : 'pointer' }}
                    >
                      {isLoadingMore && <Loader2 size={14} className="animate-spin" />}
                      {isLoadingMore ? "Loading..." : "View All Categories"}
                    </button>
                  </div>
                )}
              </div>
            </div>

          </div>

          {/* Right Column */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-section)' }}>
            
            {/* Rule Configuration Summary */}
            <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: '8px', padding: 'var(--spacing-section)' }}>
              <h3 style={{ fontSize: '11px', fontWeight: '800', color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '20px' }}>Rule Configuration Summary</h3>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '16px', borderBottom: '1px dashed #e2e8f0' }}>
                  <span style={{ fontSize: '13px', color: 'var(--muted)' }}>Active Overrides</span>
                  <span style={{ fontSize: '14px', fontWeight: '800', color: '#1e1b4b' }}>{categories.filter(c => c.status === 'Active').length + 15}</span>
                </div>
                
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '16px', borderBottom: '1px dashed #e2e8f0' }}>
                  <span style={{ fontSize: '13px', color: 'var(--muted)' }}>Conflict Protocol</span>
                  <span style={{ fontSize: '13px', fontWeight: '800', color: '#1e1b4b' }}>Most Specific</span>
                </div>
                
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '20px' }}>
                  <span style={{ fontSize: '13px', color: 'var(--muted)' }}>Rounding Logic</span>
                  <span style={{ fontSize: '13px', fontWeight: '800', color: '#1e1b4b' }}>Floor (2dp)</span>
                </div>

                <div style={{ background: '#f8fafc', padding: '16px', borderRadius: '4px', borderLeft: '4px solid #4338ca' }}>
                  <h4 style={{ fontSize: '12px', fontWeight: '800', color: 'var(--text)', margin: '0 0 8px' }}>Impact Analysis</h4>
                  <p style={{ fontSize: '12px', color: 'var(--muted)', margin: 0, lineHeight: '1.5' }}>
                    The current configuration will result in an estimated <strong style={{ color: 'var(--text)' }}>14.2%</strong> aggregate platform fee across projected Q4 volume.
                  </p>
                </div>
              </div>
            </div>

            {/* Fee Distribution Model Image */}
            <div style={{ background: '#0f172a', borderRadius: '8px', overflow: 'hidden', position: 'relative', height: '200px' }}>
              <img 
                src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=600&h=400&q=80" 
                alt="Network Data Visualization" 
                style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.6 }}
              />
              <div style={{ position: 'absolute', bottom: '0', left: '0', right: '0', padding: '20px', background: 'linear-gradient(to top, rgba(15,23,42,0.9), transparent)' }}>
                <h4 style={{ fontSize: '14px', fontWeight: '800', color: '#fff', margin: '0 0 4px' }}>Fee Distribution Model</h4>
                <p style={{ fontSize: '11px', color: 'rgba(255,255,255,0.7)', margin: 0 }}>Real-time simulation of revenue split across stakeholders.</p>
              </div>
            </div>

            {/* Best Practice Tip */}
            <div style={{ background: '#fff', border: '1px dashed #cbd5e1', borderRadius: '8px', padding: '20px', display: 'flex', gap: '16px' }}>
              <div style={{ flexShrink: 0 }}>
                <Lightbulb size={20} style={{ color: '#4338ca' }} />
              </div>
              <div>
                <h4 style={{ fontSize: '13px', fontWeight: '800', color: 'var(--text)', margin: '0 0 8px' }}>Best Practice Tip</h4>
                <p style={{ fontSize: '12px', color: 'var(--muted)', margin: 0, lineHeight: '1.5' }}>
                  For High-Volume sellers (&gt;$500k/mo), consider implementing a tiered percentage that scales down as volume increases to incentivize growth.
                </p>
              </div>
            </div>

          </div>

        </div>

        {/* Add Category Modal */}
        {isModalOpen && (
          <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(15, 23, 42, 0.5)', backdropFilter: 'blur(4px)', zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px' }}>
            <div className="animate-in zoom-in-95 duration-200" style={{ background: '#fff', borderRadius: '12px', width: '100%', maxWidth: '500px', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)' }}>
              
              <div style={{ padding: '20px 24px', borderBottom: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <h3 style={{ fontSize: '18px', fontWeight: '800', color: 'var(--text)', margin: '0 0 4px' }}>Add Category Rule</h3>
                  <p style={{ fontSize: '13px', color: 'var(--muted)', margin: 0 }}>Create a new rate override for a specific product category.</p>
                </div>
                <button onClick={() => setIsModalOpen(false)} style={{ background: '#f1f5f9', border: 'none', width: '32px', height: '32px', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: 'var(--muted)' }}>
                  <X size={18} />
                </button>
              </div>

              <form onSubmit={handleAddRule} style={{ padding: '24px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <label style={{ fontSize: '12px', fontWeight: '800', color: 'var(--text)' }}>Category Name</label>
                    <input 
                      type="text" 
                      placeholder="e.g. Digital Goods"
                      value={newRule.name}
                      onChange={e => setNewRule({...newRule, name: e.target.value})}
                      style={{ width: '100%', height: '44px', padding: '0 12px', border: '1px solid #e2e8f0', borderRadius: '6px', fontSize: '13px', color: 'var(--text)', outline: 'none' }}
                      required
                    />
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      <label style={{ fontSize: '12px', fontWeight: '800', color: 'var(--text)' }}>Rate Type</label>
                      <Select
                        value={newRule.type}
                        onChange={e => setNewRule({...newRule, type: e.target.value})}
                        style={{ width: '100%', height: '44px', padding: '0 12px', border: '1px solid #e2e8f0', borderRadius: '6px', fontSize: '13px', color: 'var(--text)', outline: 'none', backgroundColor: '#fff' }}
                        options={[{ label: "PERCENTAGE", value: "PERCENTAGE" }, { label: "FIXED FEE", value: "FIXED FEE" }]} 
                      />
                    </div>
                    
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      <label style={{ fontSize: '12px', fontWeight: '800', color: 'var(--text)' }}>Status</label>
                      <Select
                        value={newRule.status}
                        onChange={e => setNewRule({...newRule, status: e.target.value})}
                        style={{ width: '100%', height: '44px', padding: '0 12px', border: '1px solid #e2e8f0', borderRadius: '6px', fontSize: '13px', color: 'var(--text)', outline: 'none', backgroundColor: '#fff' }}
                        options={[{ label: "Active", value: "Active" }, { label: "Draft", value: "Draft" }]} 
                      />
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      <label style={{ fontSize: '12px', fontWeight: '800', color: 'var(--text)' }}>ISP Rate {newRule.type === 'PERCENTAGE' ? '(%)' : '($)'}</label>
                      <input 
                        type="number" 
                        step="0.01"
                        placeholder="0.00"
                        value={newRule.ispRate}
                        onChange={e => setNewRule({...newRule, ispRate: e.target.value})}
                        style={{ width: '100%', height: '44px', padding: '0 12px', border: '1px solid #e2e8f0', borderRadius: '6px', fontSize: '13px', color: 'var(--text)', outline: 'none' }}
                        required
                      />
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      <label style={{ fontSize: '12px', fontWeight: '800', color: 'var(--text)' }}>BSP Rate {newRule.type === 'PERCENTAGE' ? '(%)' : '($)'}</label>
                      <input 
                        type="number" 
                        step="0.01"
                        placeholder="0.00"
                        value={newRule.bspRate}
                        onChange={e => setNewRule({...newRule, bspRate: e.target.value})}
                        style={{ width: '100%', height: '44px', padding: '0 12px', border: '1px solid #e2e8f0', borderRadius: '6px', fontSize: '13px', color: 'var(--text)', outline: 'none' }}
                        required
                      />
                    </div>
                  </div>

                </div>
                
                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '32px' }}>
                  <button type="button" onClick={() => setIsModalOpen(false)} style={{ padding: '0 20px', height: '44px', background: '#fff', border: '1px solid #e2e8f0', borderRadius: '6px', fontSize: '13px', fontWeight: '700', color: 'var(--text)', cursor: 'pointer' }}>
                    Cancel
                  </button>
                  <button type="submit" style={{ padding: '0 24px', height: '44px', background: '#1e1b4b', border: 'none', borderRadius: '6px', fontSize: '13px', fontWeight: '700', color: '#fff', cursor: 'pointer' }}>
                    Add Rule
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
