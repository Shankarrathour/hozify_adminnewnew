import React, { useState } from 'react';
import AdminShell from '../../../../../components/layouts/AdminShell';
import { 
  GripVertical, Image as ImageIcon, Plus, Layout, Layers, Edit, Trash2, Smartphone, Save, Eye, X
} from 'lucide-react';
import { useToast } from '../../../../../components/common/ToastNotification';

import Select from "../../../../../components/ui/Select";

const INITIAL_SECTIONS = [
  { id: '1', type: 'Banner Carousel', title: 'Top Promotions', active: true },
  { id: '2', type: 'Category Grid', title: 'Main Services', active: true },
  { id: '3', type: 'Horizontal List', title: 'Featured Pros', active: true },
  { id: '4', type: 'Promo Banner', title: 'Summer Offer', active: false },
  { id: '5', type: 'Horizontal List', title: 'Recent Bookings', active: true }
];

export default function HomeBuilderPage() {
  const [sections, setSections] = useState(() => {
    try {
      const saved = localStorage.getItem('homeBuilderSections');
      return saved ? JSON.parse(saved) : INITIAL_SECTIONS;
    } catch (e) {
      return INITIAL_SECTIONS;
    }
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingSection, setEditingSection] = useState(null);
  const [sectionToDelete, setSectionToDelete] = useState(null);
  const { addToast } = useToast();

  const [formData, setFormData] = useState({
    title: '',
    type: 'Banner Carousel',
    active: true
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const openCreateModal = () => {
    setEditingSection(null);
    setFormData({ title: '', type: 'Banner Carousel', active: true });
    setIsModalOpen(true);
  };

  const openEditModal = (sec) => {
    setEditingSection(sec.id);
    setFormData({ title: sec.title, type: sec.type, active: sec.active });
    setIsModalOpen(true);
  };

  const handleSaveSection = (e) => {
    e.preventDefault();
    if (!formData.title) {
      addToast('Please enter a section title', 'error');
      return;
    }
    
    if (editingSection) {
      setSections(sections.map(s => s.id === editingSection ? { ...s, ...formData } : s));
      addToast('Section updated successfully!', 'success');
    } else {
      const newSection = {
        ...formData,
        id: Date.now().toString()
      };
      setSections([...sections, newSection]);
      addToast('Section added to layout successfully!', 'success');
    }
    setIsModalOpen(false);
  };

  const confirmDelete = () => {
    setSections(sections.filter(s => s.id !== sectionToDelete));
    setSectionToDelete(null);
    addToast('Section removed from layout.', 'success');
  };

  const handlePublish = () => {
    try {
      localStorage.setItem('homeBuilderSections', JSON.stringify(sections));
    } catch (e) {
      console.error("Failed to save to localStorage", e);
    }
    addToast('Home layout changes published successfully!', 'success');
  };

  return (
    <AdminShell activeTab="CMS" headerTitle="User App Home Layout Builder">
      <div style={{ padding: 'var(--spacing-section)', maxWidth: '1200px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '24px' }}>
        
        {/* Breadcrumb */}
        <div style={{ fontSize: '12px', color: 'var(--muted)', fontWeight: '600' }}>
          CMS &gt; App Management &gt; User App &gt; <span style={{ color: '#2A2454' }}>Home Screen Builder</span>
        </div>

        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <h1 className="custom-page-heading">Home Screen Builder</h1>
            <p style={{ fontSize: '13px', color: 'var(--muted)', margin: 0 }}>Drag and drop sections to construct the user app's home screen layout dynamically.</p>
          </div>
          <div style={{ display: 'flex', gap: '12px' }}>
            <button onClick={() => addToast('Opening App Preview...', 'success')} className="flex items-center gap-2 rounded-lg bg-white border border-gray-300 px-4 py-2 text-sm font-semibold text-gray-700 shadow-sm transition-all duration-200 hover:bg-gray-50">
              <Eye size={16} /> Preview App
            </button>
            <button onClick={handlePublish} className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-md transition-all duration-200 hover:bg-blue-700">
              <Save size={16} /> Publish Changes
            </button>
          </div>
        </div>

        {/* Builder Container */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: '24px', alignItems: 'start' }}>
          
          {/* Main Layout Area */}
          <div style={{ background: '#fff', border: '1.5px solid #25108f', borderRadius: '12px', padding: '24px', minHeight: '600px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
              <h3 style={{ fontSize: '16px', fontWeight: '800', color: '#1e1b4b', margin: 0 }}>Active Sections</h3>
              <button onClick={openCreateModal} className="flex items-center gap-2 rounded-lg bg-indigo-50 px-3 py-1.5 text-xs font-bold text-indigo-600 hover:bg-indigo-100 transition-colors">
                <Plus size={14} /> Add Section
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {sections.map((sec, idx) => (
                <div key={sec.id} style={{ 
                  display: 'flex', alignItems: 'center', padding: '16px', 
                  border: '1px solid #e2e8f0', borderRadius: '8px', 
                  background: sec.active ? '#f8fafc' : '#f1f5f9',
                  opacity: sec.active ? 1 : 0.6,
                  transition: 'all 0.2s',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.02)'
                }}>
                  <div style={{ cursor: 'grab', marginRight: '16px', color: '#94a3b8' }}>
                    <GripVertical size={20} />
                  </div>
                  
                  <div style={{ width: '40px', height: '40px', borderRadius: '8px', background: '#e0e7ff', color: '#4f46e5', display: 'flex', alignItems: 'center', justifyContent: 'center', marginRight: '16px' }}>
                    {sec.type.includes('Banner') ? <ImageIcon size={20} /> : sec.type.includes('Grid') ? <Layout size={20} /> : <Layers size={20} />}
                  </div>

                  <div style={{ flexGrow: 1 }}>
                    <h4 style={{ margin: '0 0 4px 0', fontSize: '14px', fontWeight: '700', color: '#1e293b' }}>{sec.title}</h4>
                    <span style={{ fontSize: '12px', color: '#64748b', fontWeight: '600' }}>Type: {sec.type}</span>
                  </div>

                  <div style={{ display: 'flex', gap: '8px' }}>
                    <button onClick={() => openEditModal(sec)} style={{ padding: '6px', border: 'none', background: '#e2e8f0', borderRadius: '6px', color: '#475569', cursor: 'pointer' }} title="Edit Config">
                      <Edit size={16} />
                    </button>
                    <button onClick={() => setSectionToDelete(sec.id)} style={{ padding: '6px', border: 'none', background: '#fee2e2', borderRadius: '6px', color: '#ef4444', cursor: 'pointer' }} title="Remove">
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Sidebar - Preview/Settings */}
          <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '24px', position: 'sticky', top: '100px' }}>
             <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
               <Smartphone size={20} color="#4f46e5" />
               <h3 style={{ fontSize: '16px', fontWeight: '800', color: '#1e1b4b', margin: 0 }}>Device Preview</h3>
             </div>
             
             {/* Mock Phone Frame */}
             <div style={{ width: '100%', height: '450px', border: '4px solid #1e293b', borderRadius: '24px', overflow: 'hidden', position: 'relative', background: '#f8fafc' }}>
                <div style={{ position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)', width: '40%', height: '16px', background: '#1e293b', borderBottomLeftRadius: '10px', borderBottomRightRadius: '10px' }} />
                
                {/* Mock Content */}
                <div style={{ padding: '24px 16px', height: '100%', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <div style={{ height: '40px', background: '#e2e8f0', borderRadius: '8px', marginTop: '10px' }} />
                  {sections.filter(s => s.active).map(sec => (
                    <div key={'prev'+sec.id} style={{ 
                      height: sec.type.includes('Banner') ? '100px' : '80px', 
                      background: sec.type.includes('Banner') ? '#dbeafe' : '#f1f5f9', 
                      borderRadius: '8px',
                      border: '1px dashed #cbd5e1',
                      display: 'flex', alignItems: 'center', justifyContent: 'center'
                    }}>
                      <span style={{ fontSize: '10px', color: '#64748b', fontWeight: 'bold' }}>{sec.title}</span>
                    </div>
                  ))}
                </div>
             </div>
          </div>

        </div>
        
        {/* Create/Edit Modal */}
        {isModalOpen && (
          <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 9999 }}>
            <div style={{ background: '#fff', borderRadius: '12px', width: '90%', maxWidth: '400px', boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)' }}>
              <div style={{ padding: '20px', borderBottom: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h2 style={{ fontSize: '18px', fontWeight: '700', margin: 0, color: '#0f172a' }}>{editingSection ? 'Edit Section' : 'Add New Section'}</h2>
                <button onClick={() => setIsModalOpen(false)} style={{ border: 'none', background: 'transparent', cursor: 'pointer', color: '#64748b' }}>
                  <X size={20} />
                </button>
              </div>
              
              <form onSubmit={handleSaveSection} style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#334155', marginBottom: '6px' }}>Section Title *</label>
                  <input 
                    type="text" 
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    placeholder="e.g. Special Offers"
                    style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '14px' }}
                    required
                  />
                </div>
                
                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#334155', marginBottom: '6px' }}>Section Type</label>
                  <Select
                    name="type"
                    value={formData.type}
                    onChange={handleInputChange}
                    style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '14px', backgroundColor: '#fff' }}
                    options={[{
                      label: "Banner Carousel",
                      value: "Banner Carousel"
                    }, {
                      label: "Category Grid",
                      value: "Category Grid"
                    }, {
                      label: "Horizontal List",
                      value: "Horizontal List"
                    }, {
                      label: "Vertical List",
                      value: "Vertical List"
                    }, {
                      label: "Promo Banner",
                      value: "Promo Banner"
                    }]} />
                </div>

                <div style={{ padding: '16px 20px', background: '#f8fafc', borderTop: '1px solid #e2e8f0', marginTop: '8px', borderRadius: '0 0 12px 12px', margin: '0 -20px -20px -20px', display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
                  <button type="button" onClick={() => setIsModalOpen(false)} style={{ padding: '10px 16px', borderRadius: '8px', border: '1px solid #cbd5e1', background: '#fff', fontSize: '14px', fontWeight: '600', color: '#475569', cursor: 'pointer' }}>Cancel</button>
                  <button type="submit" style={{ padding: '10px 16px', borderRadius: '8px', border: 'none', background: '#2563eb', color: '#fff', fontSize: '14px', fontWeight: '600', cursor: 'pointer' }}>{editingSection ? 'Update Section' : 'Add Section'}</button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Delete Confirmation Popup */}
        {sectionToDelete && (
          <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 9999 }}>
            <div style={{ background: '#fff', borderRadius: '12px', width: '90%', maxWidth: '350px', boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)', padding: '24px', textAlign: 'center' }}>
              <Trash2 size={40} color="#ef4444" style={{ margin: '0 auto 16px auto' }} />
              <h2 style={{ fontSize: '18px', fontWeight: '700', margin: '0 0 8px 0', color: '#0f172a' }}>Delete Section?</h2>
              <p style={{ fontSize: '14px', color: '#64748b', margin: '0 0 24px 0' }}>Are you sure you want to delete this section from the layout?</p>
              
              <div style={{ display: 'flex', gap: '12px' }}>
                <button onClick={() => setSectionToDelete(null)} style={{ flex: 1, padding: '10px', borderRadius: '8px', border: '1px solid #cbd5e1', background: '#fff', fontWeight: '600', color: '#475569', cursor: 'pointer' }}>Cancel</button>
                <button onClick={confirmDelete} style={{ flex: 1, padding: '10px', borderRadius: '8px', border: 'none', background: '#ef4444', fontWeight: '600', color: '#fff', cursor: 'pointer' }}>Delete</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminShell>
  );
}
