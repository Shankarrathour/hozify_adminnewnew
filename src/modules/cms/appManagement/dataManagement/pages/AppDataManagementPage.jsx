import React, { useState, useMemo } from 'react';
import AdminShell from '../../../../../components/layouts/AdminShell';
import { useAppManagement } from '../../../../../hooks/useAppManagement';
import { DATA_CATEGORIES, SCOPE_OPTIONS } from '../../../../../registry/appManagement/featureRegistry';
import { triggerDownload } from '../../../../../utils/downloadHelper';
import { 
  Database, 
  Search, 
  Plus, 
  Download, 
  Upload, 
  Edit, 
  Trash2, 
  Copy, 
  RotateCcw, 
  SlidersHorizontal, 
  CheckSquare, 
  Square, 
  Layers, 
  Sparkles, 
  FileText, 
  X, 
  Save, 
  AlertCircle,
  Filter,
  CheckCircle2,
  Tag
} from 'lucide-react';
import { 
  AddEditModal, 
  DeleteConfirmationModal, 
  SuccessModal,
  WarningModal 
} from '../../../../../components/common/popups/Modals';

export default function AppDataManagementPage() {
  const {
    centralData,
    createCentralData,
    updateCentralData,
    deleteCentralData,
    duplicateCentralData,
    restoreDefaultCentralData,
    bulkUpdateCentralData,
    importCentralDataJSON,
    exportCentralDataJSON
  } = useAppManagement();

  // Search & Filters
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [selectedScope, setSelectedScope] = useState('ALL');

  // Selection & Bulk Actions
  const [selectedIds, setSelectedIds] = useState([]);
  const [isBulkModalOpen, setIsBulkModalOpen] = useState(false);
  const [bulkCategory, setBulkCategory] = useState('');
  const [bulkScope, setBulkScope] = useState('');
  const [bulkPrefix, setBulkPrefix] = useState('');
  const [bulkSuffix, setBulkSuffix] = useState('');

  // Modals state
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isImportModalOpen, setIsImportModalOpen] = useState(false);
  const [isSuccessOpen, setIsSuccessOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  // Editing / Active Item
  const [selectedItem, setSelectedItem] = useState(null);
  const [importJsonText, setImportJsonText] = useState('');
  const [importMode, setImportMode] = useState('merge'); // 'merge' | 'replace'

  // Filtered Data
  const filteredData = useMemo(() => {
    return centralData.filter(item => {
      const matchesSearch = 
        item.key.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.label.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.value.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (item.description && item.description.toLowerCase().includes(searchTerm.toLowerCase()));

      const matchesCategory = selectedCategory === 'ALL' || item.category === selectedCategory;
      const matchesScope = selectedScope === 'ALL' || item.scope === selectedScope;

      return matchesSearch && matchesCategory && matchesScope;
    });
  }, [centralData, searchTerm, selectedCategory, selectedScope]);

  // Statistics
  const totalKeys = centralData.length;
  const userAppKeys = centralData.filter(i => i.scope === 'User App').length;
  const partnerAppKeys = centralData.filter(i => i.scope === 'Partner App').length;
  const sharedKeys = centralData.filter(i => i.scope === 'Shared').length;

  // Form Fields for Add / Edit Modal
  const formFields = [
    { name: 'key', label: 'Central String Key (Unique)', type: 'text', placeholder: 'e.g. service.cleaning.name', required: true },
    { name: 'label', label: 'Human Readable Title / Label', type: 'text', placeholder: 'e.g. Cleaning Category Title', required: true },
    { name: 'category', label: 'Data Category', type: 'select', required: true, options: DATA_CATEGORIES.map(c => ({ value: c, label: c })) },
    { name: 'scope', label: 'Application Scope', type: 'select', required: true, options: SCOPE_OPTIONS.map(s => ({ value: s, label: s })) },
    { name: 'value', label: 'Live String Value', type: 'textarea', placeholder: 'e.g. Deep Home Cleaning', required: true },
    { name: 'description', label: 'Usage Details & Context', type: 'textarea', placeholder: 'Describe where this string appears in the app...', required: false }
  ];

  // Actions
  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedIds(filteredData.map(item => item.id));
    } else {
      setSelectedIds([]);
    }
  };

  const handleSelectOne = (id) => {
    setSelectedIds(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const handleAddSave = async (val) => {
    await createCentralData(val);
    setSuccessMessage(`New central key "${val.key}" created and propagated live!`);
    setIsSuccessOpen(true);
  };

  const handleEditSave = async (val) => {
    await updateCentralData(selectedItem.id, val);
    setSuccessMessage(`Key "${val.key || selectedItem.key}" updated successfully across all apps!`);
    setIsSuccessOpen(true);
  };

  const handleDeleteConfirm = async () => {
    await deleteCentralData(selectedItem.id);
    setSuccessMessage(`Key "${selectedItem.key}" removed from central data store.`);
    setIsSuccessOpen(true);
  };

  const handleDuplicate = async (item) => {
    const dup = await duplicateCentralData(item.id);
    setSuccessMessage(`Duplicated key to "${dup.key}"`);
    setIsSuccessOpen(true);
  };

  const handleRestoreSingle = async (item) => {
    await restoreDefaultCentralData(item.id);
    setSuccessMessage(`Restored factory default value for "${item.key}"`);
    setIsSuccessOpen(true);
  };

  const handleRestoreAll = async () => {
    if (window.confirm('Are you sure you want to restore default values for ALL keys?')) {
      await restoreDefaultCentralData('ALL');
      setSuccessMessage('Restored factory default values for all central data items!');
      setIsSuccessOpen(true);
    }
  };

  const handleBulkSubmit = async () => {
    if (selectedIds.length === 0) return;
    const changes = {};
    if (bulkCategory) changes.category = bulkCategory;
    if (bulkScope) changes.scope = bulkScope;
    if (bulkPrefix) changes.prefix = bulkPrefix;
    if (bulkSuffix) changes.suffix = bulkSuffix;

    await bulkUpdateCentralData(selectedIds, changes);
    setIsBulkModalOpen(false);
    setSelectedIds([]);
    setBulkCategory('');
    setBulkScope('');
    setBulkPrefix('');
    setBulkSuffix('');
    setSuccessMessage(`Bulk updated ${selectedIds.length} items successfully!`);
    setIsSuccessOpen(true);
  };

  const handleExportJSON = () => {
    const jsonStr = exportCentralDataJSON();
    triggerDownload('hozify_central_app_data.json', jsonStr);
  };

  const handleImportJSONSubmit = async () => {
    try {
      const count = await importCentralDataJSON(importJsonText, importMode);
      setIsImportModalOpen(false);
      setImportJsonText('');
      setSuccessMessage(`Imported ${count} items into central data store (${importMode} mode)!`);
      setIsSuccessOpen(true);
    } catch (err) {
      alert(`Import failed: ${err.message}`);
    }
  };

  return (
    <AdminShell headerTitle="App Data Management" activeTab="CMS">
      <div style={{ padding: '24px', maxWidth: '1400px', margin: '0 auto' }}>
        
        {/* Breadcrumb Header */}
        <div style={{ marginBottom: '20px' }}>
          <p style={{ fontSize: '13px', color: '#64748b', margin: 0 }}>
            CMS &gt; App Management &gt; <span style={{ color: '#4f46e5', fontWeight: 600 }}>App Data Management</span>
          </p>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '6px' }}>
            <div>
              <h1 className="custom-page-heading" style={{ margin: 0, fontSize: '26px', fontWeight: 700, color: '#1e293b' }}>
                App Data Management
              </h1>
              <p style={{ color: '#64748b', fontSize: '14px', marginTop: '4px', margin: 0 }}>
                Master source for every editable text string, banner copy, price label, and status message across User & Partner Apps.
              </p>
            </div>
            
            <div style={{ display: 'flex', gap: '10px' }}>
              <button
                onClick={() => setIsImportModalOpen(true)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '9px 16px',
                  background: '#ffffff',
                  color: '#334155',
                  border: '1px solid #cbd5e1',
                  borderRadius: '8px',
                  fontWeight: 600,
                  fontSize: '13px',
                  cursor: 'pointer'
                }}
              >
                <Upload size={16} color="#4f46e5" />
                Import JSON
              </button>

              <button
                onClick={handleExportJSON}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '9px 16px',
                  background: '#ffffff',
                  color: '#334155',
                  border: '1px solid #cbd5e1',
                  borderRadius: '8px',
                  fontWeight: 600,
                  fontSize: '13px',
                  cursor: 'pointer'
                }}
              >
                <Download size={16} color="#059669" />
                Export JSON
              </button>

              <button
                onClick={() => setIsAddOpen(true)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '9px 18px',
                  background: 'linear-gradient(135deg, #4f46e5 0%, #3b82f6 100%)',
                  color: '#ffffff',
                  border: 'none',
                  borderRadius: '8px',
                  fontWeight: 600,
                  fontSize: '13px',
                  cursor: 'pointer',
                  boxShadow: '0 4px 12px rgba(79, 70, 229, 0.25)'
                }}
              >
                <Plus size={18} />
                Create New Data Key
              </button>
            </div>
          </div>
        </div>

        {/* Overview Stats Cards */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', 
          gap: '16px', 
          marginBottom: '24px' 
        }}>
          <div style={{ background: '#ffffff', borderRadius: '12px', padding: '18px 20px', border: '1px solid #e2e8f0' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '13px', color: '#64748b', fontWeight: 600 }}>Total Central Keys</span>
              <Database size={18} color="#6366f1" />
            </div>
            <div style={{ fontSize: '26px', fontWeight: 700, color: '#1e293b', marginTop: '6px' }}>{totalKeys}</div>
            <p style={{ fontSize: '12px', color: '#94a3b8', margin: '4px 0 0 0' }}>Active master application values</p>
          </div>

          <div style={{ background: '#ffffff', borderRadius: '12px', padding: '18px 20px', border: '1px solid #e2e8f0' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '13px', color: '#4f46e5', fontWeight: 600 }}>User App Scope</span>
              <FileText size={18} color="#4f46e5" />
            </div>
            <div style={{ fontSize: '26px', fontWeight: 700, color: '#4f46e5', marginTop: '6px' }}>{userAppKeys}</div>
            <p style={{ fontSize: '12px', color: '#64748b', margin: '4px 0 0 0' }}>Specific to customer app screens</p>
          </div>

          <div style={{ background: '#ffffff', borderRadius: '12px', padding: '18px 20px', border: '1px solid #e2e8f0' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '13px', color: '#059669', fontWeight: 600 }}>Partner App Scope</span>
              <FileText size={18} color="#059669" />
            </div>
            <div style={{ fontSize: '26px', fontWeight: 700, color: '#059669', marginTop: '6px' }}>{partnerAppKeys}</div>
            <p style={{ fontSize: '12px', color: '#64748b', margin: '4px 0 0 0' }}>Specific to partner provider portal</p>
          </div>

          <div style={{ background: '#ffffff', borderRadius: '12px', padding: '18px 20px', border: '1px solid #e2e8f0' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '13px', color: '#d97706', fontWeight: 600 }}>Shared Global Scope</span>
              <Layers size={18} color="#d97706" />
            </div>
            <div style={{ fontSize: '26px', fontWeight: 700, color: '#d97706', marginTop: '6px' }}>{sharedKeys}</div>
            <p style={{ fontSize: '12px', color: '#64748b', margin: '4px 0 0 0' }}>Shared across both applications</p>
          </div>
        </div>

        {/* Filters & Bulk Operations Bar */}
        <div style={{ 
          background: '#ffffff', 
          borderRadius: '12px', 
          padding: '16px 20px', 
          border: '1px solid #e2e8f0', 
          marginBottom: '20px',
          display: 'flex',
          flexWrap: 'wrap',
          gap: '12px',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          {/* Search, Category & Scope Filters */}
          <div style={{ display: 'flex', gap: '12px', alignItems: 'center', flex: '1', minWidth: '320px', flexWrap: 'wrap' }}>
            <div style={{ position: 'relative', flex: '1', minWidth: '220px' }}>
              <Search size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
              <input
                type="text"
                placeholder="Search key, title or live text value..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{
                  width: '100%',
                  paddingLeft: '38px',
                  paddingRight: '12px',
                  paddingTop: '8px',
                  paddingBottom: '8px',
                  borderRadius: '8px',
                  border: '1px solid #cbd5e1',
                  fontSize: '14px',
                  outline: 'none'
                }}
              />
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Filter size={16} color="#64748b" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                style={{
                  padding: '8px 12px',
                  borderRadius: '8px',
                  border: '1px solid #cbd5e1',
                  fontSize: '14px',
                  background: '#fff',
                  cursor: 'pointer'
                }}
              >
                <option value="ALL">Category: All ({DATA_CATEGORIES.length})</option>
                {DATA_CATEGORIES.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Tag size={16} color="#64748b" />
              <select
                value={selectedScope}
                onChange={(e) => setSelectedScope(e.target.value)}
                style={{
                  padding: '8px 12px',
                  borderRadius: '8px',
                  border: '1px solid #cbd5e1',
                  fontSize: '14px',
                  background: '#fff',
                  cursor: 'pointer'
                }}
              >
                <option value="ALL">Scope: All</option>
                {SCOPE_OPTIONS.map(s => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Bulk Action Controls */}
          <div style={{ display: 'flex', gap: '8px' }}>
            {selectedIds.length > 0 && (
              <button
                onClick={() => setIsBulkModalOpen(true)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '8px 14px',
                  background: '#4f46e5',
                  color: '#ffffff',
                  border: 'none',
                  borderRadius: '8px',
                  fontSize: '13px',
                  fontWeight: 600,
                  cursor: 'pointer'
                }}
              >
                <SlidersHorizontal size={16} />
                Bulk Update ({selectedIds.length})
              </button>
            )}

            <button
              onClick={handleRestoreAll}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                padding: '8px 14px',
                background: '#f1f5f9',
                color: '#334155',
                border: '1px solid #cbd5e1',
                borderRadius: '8px',
                fontSize: '13px',
                fontWeight: 600,
                cursor: 'pointer'
              }}
            >
              <RotateCcw size={16} color="#6366f1" />
              Restore All Defaults
            </button>
          </div>
        </div>

        {/* Master Data Table */}
        <div style={{
          background: '#ffffff',
          borderRadius: '12px',
          border: '1px solid #e2e8f0',
          overflow: 'hidden',
          boxShadow: '0 1px 3px rgba(0,0,0,0.05)'
        }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '14px' }}>
            <thead>
              <tr style={{ background: '#f8fafc', borderBottom: '1px solid #e2e8f0', color: '#475569', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                <th style={{ padding: '14px 16px', width: '40px' }}>
                  <input
                    type="checkbox"
                    checked={filteredData.length > 0 && selectedIds.length === filteredData.length}
                    onChange={handleSelectAll}
                    style={{ cursor: 'pointer' }}
                  />
                </th>
                <th style={{ padding: '14px 16px', fontWeight: 700 }}>Key & Label</th>
                <th style={{ padding: '14px 16px', fontWeight: 700 }}>Category</th>
                <th style={{ padding: '14px 16px', fontWeight: 700 }}>Scope</th>
                <th style={{ padding: '14px 16px', fontWeight: 700 }}>Live Text Value</th>
                <th style={{ padding: '14px 16px', fontWeight: 700, textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map(item => {
                const isSelected = selectedIds.includes(item.id);
                return (
                  <tr
                    key={item.id}
                    style={{
                      borderBottom: '1px solid #f1f5f9',
                      background: isSelected ? '#f8fafc' : '#ffffff',
                      transition: 'background 0.15s'
                    }}
                  >
                    <td style={{ padding: '14px 16px' }}>
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => handleSelectOne(item.id)}
                        style={{ cursor: 'pointer' }}
                      />
                    </td>
                    <td style={{ padding: '14px 16px' }}>
                      <div style={{ fontWeight: 700, color: '#1e293b' }}>{item.label}</div>
                      <code style={{ fontSize: '12px', background: '#f1f5f9', padding: '2px 6px', borderRadius: '4px', color: '#4f46e5' }}>
                        {item.key}
                      </code>
                    </td>
                    <td style={{ padding: '14px 16px' }}>
                      <span style={{
                        fontSize: '12px',
                        padding: '4px 10px',
                        borderRadius: '12px',
                        background: '#e0e7ff',
                        color: '#4338ca',
                        fontWeight: 600
                      }}>
                        {item.category}
                      </span>
                    </td>
                    <td style={{ padding: '14px 16px' }}>
                      <span style={{
                        fontSize: '12px',
                        padding: '4px 10px',
                        borderRadius: '12px',
                        background: item.scope === 'User App' ? '#ecfdf5' : item.scope === 'Partner App' ? '#fef3c7' : '#f3e8ff',
                        color: item.scope === 'User App' ? '#047857' : item.scope === 'Partner App' ? '#b45309' : '#6b21a8',
                        fontWeight: 600
                      }}>
                        {item.scope}
                      </span>
                    </td>
                    <td style={{ padding: '14px 16px', maxWidth: '300px' }}>
                      <div style={{
                        background: '#fafafa',
                        border: '1px solid #e2e8f0',
                        padding: '8px 12px',
                        borderRadius: '6px',
                        color: '#0f172a',
                        fontWeight: 600,
                        wordBreak: 'break-word'
                      }}>
                        {item.value}
                      </div>
                      {item.defaultValue && item.defaultValue !== item.value && (
                        <div style={{ fontSize: '11px', color: '#94a3b8', marginTop: '4px' }}>
                          Default: <span style={{ textDecoration: 'line-through' }}>{item.defaultValue}</span>
                        </div>
                      )}
                    </td>
                    <td style={{ padding: '14px 16px', textAlign: 'right' }}>
                      <div style={{ display: 'flex', gap: '6px', justifyContent: 'flex-end' }}>
                        <button
                          onClick={() => { setSelectedItem(item); setIsEditOpen(true); }}
                          title="Edit Key Value"
                          style={{
                            padding: '6px 10px',
                            background: '#f1f5f9',
                            border: '1px solid #cbd5e1',
                            borderRadius: '6px',
                            cursor: 'pointer',
                            color: '#334155'
                          }}
                        >
                          <Edit size={15} />
                        </button>

                        <button
                          onClick={() => handleDuplicate(item)}
                          title="Duplicate Key"
                          style={{
                            padding: '6px 10px',
                            background: '#f1f5f9',
                            border: '1px solid #cbd5e1',
                            borderRadius: '6px',
                            cursor: 'pointer',
                            color: '#334155'
                          }}
                        >
                          <Copy size={15} />
                        </button>

                        <button
                          onClick={() => handleRestoreSingle(item)}
                          title="Restore Factory Default"
                          style={{
                            padding: '6px 10px',
                            background: '#f1f5f9',
                            border: '1px solid #cbd5e1',
                            borderRadius: '6px',
                            cursor: 'pointer',
                            color: '#334155'
                          }}
                        >
                          <RotateCcw size={15} color="#4f46e5" />
                        </button>

                        <button
                          onClick={() => { setSelectedItem(item); setIsDeleteOpen(true); }}
                          title="Delete Key"
                          style={{
                            padding: '6px 10px',
                            background: '#fef2f2',
                            border: '1px solid #fca5a5',
                            borderRadius: '6px',
                            cursor: 'pointer',
                            color: '#dc2626'
                          }}
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          {filteredData.length === 0 && (
            <div style={{ textAlign: 'center', padding: '60px 20px' }}>
              <AlertCircle size={44} color="#94a3b8" style={{ margin: '0 auto 12px auto' }} />
              <h3 style={{ margin: 0, color: '#334155' }}>No central data items match query</h3>
              <p style={{ color: '#64748b', fontSize: '14px', marginTop: '4px' }}>Try resetting your search query or filter tags.</p>
            </div>
          )}
        </div>

      </div>

      {/* Add New Key Modal */}
      <AddEditModal
        isOpen={isAddOpen}
        onClose={() => setIsAddOpen(false)}
        onSave={handleAddSave}
        title="Create New Central Data Key"
        fields={formFields}
      />

      {/* Edit Key Modal */}
      <AddEditModal
        isOpen={isEditOpen}
        onClose={() => setIsEditOpen(false)}
        onSave={handleEditSave}
        initialValues={selectedItem}
        title={`Edit Central Key: ${selectedItem?.key || ''}`}
        fields={formFields}
      />

      {/* Delete Confirmation Modal */}
      <DeleteConfirmationModal
        isOpen={isDeleteOpen}
        onClose={() => setIsDeleteOpen(false)}
        onConfirm={handleDeleteConfirm}
        itemName={selectedItem?.key || ''}
      />

      {/* Bulk Update Modal */}
      {isBulkModalOpen && (
        <div style={{
          position: 'fixed',
          top: 0, left: 0, right: 0, bottom: 0,
          background: 'rgba(15, 23, 42, 0.6)',
          zIndex: 9999,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <div style={{
            background: '#fff',
            borderRadius: '16px',
            padding: '24px',
            width: '480px',
            maxWidth: '90%',
            boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <h3 style={{ margin: 0, fontSize: '18px', fontWeight: 700 }}>
                Bulk Update ({selectedIds.length} Items Selected)
              </h3>
              <button onClick={() => setIsBulkModalOpen(false)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
                <X size={20} />
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div>
                <label style={{ fontSize: '13px', fontWeight: 600, color: '#334155' }}>Update Category</label>
                <select
                  value={bulkCategory}
                  onChange={(e) => setBulkCategory(e.target.value)}
                  style={{ width: '100%', padding: '8px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', marginTop: '4px' }}
                >
                  <option value="">Keep Existing Categories</option>
                  {DATA_CATEGORIES.map(c => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>

              <div>
                <label style={{ fontSize: '13px', fontWeight: 600, color: '#334155' }}>Update Scope</label>
                <select
                  value={bulkScope}
                  onChange={(e) => setBulkScope(e.target.value)}
                  style={{ width: '100%', padding: '8px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', marginTop: '4px' }}
                >
                  <option value="">Keep Existing Scopes</option>
                  {SCOPE_OPTIONS.map(s => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>

              <div>
                <label style={{ fontSize: '13px', fontWeight: 600, color: '#334155' }}>Prepend Value Prefix (Optional)</label>
                <input
                  type="text"
                  placeholder="e.g. [Special] "
                  value={bulkPrefix}
                  onChange={(e) => setBulkPrefix(e.target.value)}
                  style={{ width: '100%', padding: '8px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', marginTop: '4px' }}
                />
              </div>

              <div>
                <label style={{ fontSize: '13px', fontWeight: 600, color: '#334155' }}>Append Value Suffix (Optional)</label>
                <input
                  type="text"
                  placeholder="e.g. (Verified)"
                  value={bulkSuffix}
                  onChange={(e) => setBulkSuffix(e.target.value)}
                  style={{ width: '100%', padding: '8px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', marginTop: '4px' }}
                />
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '20px' }}>
              <button
                onClick={() => setIsBulkModalOpen(false)}
                style={{ padding: '8px 16px', background: '#f1f5f9', border: '1px solid #cbd5e1', borderRadius: '8px', cursor: 'pointer' }}
              >
                Cancel
              </button>
              <button
                onClick={handleBulkSubmit}
                style={{ padding: '8px 20px', background: '#4f46e5', color: '#fff', border: 'none', borderRadius: '8px', fontWeight: 600, cursor: 'pointer' }}
              >
                Apply Bulk Changes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Import JSON Modal */}
      {isImportModalOpen && (
        <div style={{
          position: 'fixed',
          top: 0, left: 0, right: 0, bottom: 0,
          background: 'rgba(15, 23, 42, 0.6)',
          zIndex: 9999,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <div style={{
            background: '#fff',
            borderRadius: '16px',
            padding: '24px',
            width: '600px',
            maxWidth: '90%',
            boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <h3 style={{ margin: 0, fontSize: '18px', fontWeight: 700 }}>
                Import Central Data JSON
              </h3>
              <button onClick={() => setIsImportModalOpen(false)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
                <X size={20} />
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div>
                <label style={{ fontSize: '13px', fontWeight: 600, color: '#334155' }}>Import Mode</label>
                <div style={{ display: 'flex', gap: '16px', marginTop: '6px' }}>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer' }}>
                    <input
                      type="radio"
                      name="importMode"
                      value="merge"
                      checked={importMode === 'merge'}
                      onChange={() => setImportMode('merge')}
                    />
                    Merge / Update Existing Keys
                  </label>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer' }}>
                    <input
                      type="radio"
                      name="importMode"
                      value="replace"
                      checked={importMode === 'replace'}
                      onChange={() => setImportMode('replace')}
                    />
                    Replace Complete Central Data Store
                  </label>
                </div>
              </div>

              <div>
                <label style={{ fontSize: '13px', fontWeight: 600, color: '#334155' }}>Paste JSON Array Data</label>
                <textarea
                  rows={10}
                  placeholder={`[\n  {\n    "key": "banner.home.title",\n    "label": "Home Title",\n    "category": "Banner Title",\n    "scope": "User App",\n    "value": "Cleaning Sale - 30% OFF"\n  }\n]`}
                  value={importJsonText}
                  onChange={(e) => setImportJsonText(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '12px',
                    borderRadius: '8px',
                    border: '1px solid #cbd5e1',
                    fontFamily: 'monospace',
                    fontSize: '13px',
                    marginTop: '6px'
                  }}
                />
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '20px' }}>
              <button
                onClick={() => setIsImportModalOpen(false)}
                style={{ padding: '8px 16px', background: '#f1f5f9', border: '1px solid #cbd5e1', borderRadius: '8px', cursor: 'pointer' }}
              >
                Cancel
              </button>
              <button
                onClick={handleImportJSONSubmit}
                disabled={!importJsonText.trim()}
                style={{
                  padding: '8px 20px',
                  background: importJsonText.trim() ? '#4f46e5' : '#cbd5e1',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '8px',
                  fontWeight: 600,
                  cursor: importJsonText.trim() ? 'pointer' : 'not-allowed'
                }}
              >
                Execute Import
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Success Modal */}
      <SuccessModal
        isOpen={isSuccessOpen}
        onClose={() => setIsSuccessOpen(false)}
        title="Central Data Store Updated"
        message={successMessage}
      />
    </AdminShell>
  );
}
