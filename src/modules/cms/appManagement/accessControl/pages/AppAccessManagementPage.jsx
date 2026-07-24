import React, { useState, useMemo } from 'react';
import AdminShell from '../../../../../components/layouts/AdminShell';
import Toggle from '../../../../../components/common/Toggle';
import { useAppManagement } from '../../../../../hooks/useAppManagement';
import { USER_APP_MODULES, PARTNER_APP_MODULES } from '../../../../../registry/appManagement/moduleRegistry';
import { 
  Smartphone, 
  Handshake, 
  CheckCircle2, 
  XCircle, 
  RotateCcw, 
  CheckSquare, 
  Square, 
  Save, 
  Eye, 
  Search, 
  Filter, 
  Sparkles, 
  ShieldAlert, 
  X,
  Layers,
  ArrowRight,
  ChevronRight,
  Info
} from 'lucide-react';
import { SuccessModal } from '../../../../../components/common/popups/Modals';

export default function AppAccessManagementPage() {
  const {
    userAppConfig,
    partnerAppConfig,
    toggleModule,
    selectAllModules,
    deselectAllModules,
    resetModuleConfig,
    saveModuleConfig
  } = useAppManagement();

  const [activeApp, setActiveApp] = useState('user'); // 'user' | 'partner'
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('ALL');
  const [isSuccessOpen, setIsSuccessOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  // Active module definitions
  const modules = activeApp === 'user' ? USER_APP_MODULES : PARTNER_APP_MODULES;
  const currentConfigMap = activeApp === 'user' ? userAppConfig : partnerAppConfig;

  // Extract unique categories
  const categories = useMemo(() => {
    const set = new Set(modules.map(m => m.category));
    return ['ALL', ...Array.from(set)];
  }, [modules]);

  // Filtered modules
  const filteredModules = useMemo(() => {
    return modules.filter(m => {
      const matchesSearch = m.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            m.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            m.category.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = categoryFilter === 'ALL' || m.category === categoryFilter;
      return matchesSearch && matchesCategory;
    });
  }, [modules, searchTerm, categoryFilter]);

  // Statistics
  const totalCount = modules.length;
  const enabledCount = modules.filter(m => currentConfigMap[m.id] !== false).length;
  const disabledCount = totalCount - enabledCount;

  // Handlers
  const handleToggle = (id) => {
    toggleModule(activeApp, id);
  };

  const handleSelectAll = async () => {
    await selectAllModules(activeApp);
    setSuccessMessage(`All ${activeApp === 'user' ? 'User App' : 'Partner App'} modules enabled successfully!`);
    setIsSuccessOpen(true);
  };

  const handleDeselectAll = async () => {
    await deselectAllModules(activeApp);
    setSuccessMessage(`All ${activeApp === 'user' ? 'User App' : 'Partner App'} modules disabled!`);
    setIsSuccessOpen(true);
  };

  const handleReset = async () => {
    await resetModuleConfig(activeApp);
    setSuccessMessage(`Restored default configuration for ${activeApp === 'user' ? 'User App' : 'Partner App'}!`);
    setIsSuccessOpen(true);
  };

  const handleSave = async () => {
    await saveModuleConfig(activeApp, currentConfigMap);
    setSuccessMessage(`Configuration for ${activeApp === 'user' ? 'User App' : 'Partner App'} saved & live propagated!`);
    setIsSuccessOpen(true);
  };

  return (
    <AdminShell headerTitle="App Access Management" activeTab="CMS">
      <div style={{ padding: '24px', maxWidth: '1400px', margin: '0 auto' }}>
        
        {/* Breadcrumb Header */}
        <div style={{ marginBottom: '20px' }}>
          <p style={{ fontSize: '13px', color: '#64748b', margin: 0 }}>
            CMS &gt; App Management &gt; <span style={{ color: '#4f46e5', fontWeight: 600 }}>App Access Control</span>
          </p>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '6px' }}>
            <div>
              <h1 className="custom-page-heading" style={{ margin: 0, fontSize: '26px', fontWeight: 700, color: '#1e293b' }}>
                App Access Management
              </h1>
              <p style={{ color: '#64748b', fontSize: '14px', marginTop: '4px', margin: 0 }}>
                Control feature visibility and access policies in real-time across User App and Partner App.
              </p>
            </div>
            <button
              onClick={() => setIsPreviewOpen(true)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '10px 18px',
                background: 'linear-gradient(135deg, #4f46e5 0%, #3b82f6 100%)',
                color: '#ffffff',
                border: 'none',
                borderRadius: '8px',
                fontWeight: 600,
                cursor: 'pointer',
                boxShadow: '0 4px 12px rgba(79, 70, 229, 0.25)',
                transition: 'all 0.2s'
              }}
            >
              <Eye size={18} />
              Interactive Live Preview
            </button>
          </div>
        </div>

        {/* App Selector Tabs */}
        <div style={{ 
          display: 'flex', 
          gap: '12px', 
          marginBottom: '20px',
          borderBottom: '1px solid #e2e8f0',
          paddingBottom: '12px'
        }}>
          <button
            onClick={() => setActiveApp('user')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              padding: '12px 24px',
              borderRadius: '10px',
              fontWeight: 600,
              fontSize: '15px',
              border: activeApp === 'user' ? '2px solid #4f46e5' : '1px solid #cbd5e1',
              background: activeApp === 'user' ? '#eef2ff' : '#ffffff',
              color: activeApp === 'user' ? '#4f46e5' : '#64748b',
              cursor: 'pointer',
              transition: 'all 0.2s'
            }}
          >
            <Smartphone size={20} color={activeApp === 'user' ? '#4f46e5' : '#64748b'} />
            User App Access Control
            <span style={{
              background: activeApp === 'user' ? '#4f46e5' : '#94a3b8',
              color: '#fff',
              fontSize: '12px',
              padding: '2px 8px',
              borderRadius: '12px',
              fontWeight: 700
            }}>
              23 Modules
            </span>
          </button>

          <button
            onClick={() => setActiveApp('partner')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              padding: '12px 24px',
              borderRadius: '10px',
              fontWeight: 600,
              fontSize: '15px',
              border: activeApp === 'partner' ? '2px solid #059669' : '1px solid #cbd5e1',
              background: activeApp === 'partner' ? '#ecfdf5' : '#ffffff',
              color: activeApp === 'partner' ? '#059669' : '#64748b',
              cursor: 'pointer',
              transition: 'all 0.2s'
            }}
          >
            <Handshake size={20} color={activeApp === 'partner' ? '#059669' : '#64748b'} />
            Partner App Access Control
            <span style={{
              background: activeApp === 'partner' ? '#059669' : '#94a3b8',
              color: '#fff',
              fontSize: '12px',
              padding: '2px 8px',
              borderRadius: '12px',
              fontWeight: 700
            }}>
              19 Modules
            </span>
          </button>
        </div>

        {/* Overview Stats Cards */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', 
          gap: '16px', 
          marginBottom: '24px' 
        }}>
          <div style={{ background: '#ffffff', borderRadius: '12px', padding: '18px 20px', border: '1px solid #e2e8f0', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '13px', color: '#64748b', fontWeight: 600 }}>Total App Modules</span>
              <Layers size={18} color="#6366f1" />
            </div>
            <div style={{ fontSize: '26px', fontWeight: 700, color: '#1e293b', marginTop: '6px' }}>{totalCount}</div>
            <p style={{ fontSize: '12px', color: '#94a3b8', margin: '4px 0 0 0' }}>Configured under {activeApp === 'user' ? 'User App' : 'Partner App'}</p>
          </div>

          <div style={{ background: '#ffffff', borderRadius: '12px', padding: '18px 20px', border: '1px solid #e2e8f0', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '13px', color: '#059669', fontWeight: 600 }}>Active / Visible</span>
              <CheckCircle2 size={18} color="#059669" />
            </div>
            <div style={{ fontSize: '26px', fontWeight: 700, color: '#059669', marginTop: '6px' }}>{enabledCount}</div>
            <p style={{ fontSize: '12px', color: '#64748b', margin: '4px 0 0 0' }}>{Math.round((enabledCount/totalCount)*100)}% modules accessible</p>
          </div>

          <div style={{ background: '#ffffff', borderRadius: '12px', padding: '18px 20px', border: '1px solid #e2e8f0', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '13px', color: '#dc2626', fontWeight: 600 }}>Disabled / Hidden</span>
              <XCircle size={18} color="#dc2626" />
            </div>
            <div style={{ fontSize: '26px', fontWeight: 700, color: '#dc2626', marginTop: '6px' }}>{disabledCount}</div>
            <p style={{ fontSize: '12px', color: '#64748b', margin: '4px 0 0 0' }}>Hidden from app screens & navigation</p>
          </div>

          <div style={{ background: '#ffffff', borderRadius: '12px', padding: '18px 20px', border: '1px solid #e2e8f0', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '13px', color: '#4f46e5', fontWeight: 600 }}>Live Sync Status</span>
              <Sparkles size={18} color="#4f46e5" />
            </div>
            <div style={{ fontSize: '14px', fontWeight: 700, color: '#10b981', marginTop: '10px', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#10b981', display: 'inline-block' }}></span>
              Real-time Active
            </div>
            <p style={{ fontSize: '12px', color: '#94a3b8', margin: '4px 0 0 0' }}>Instant reflection without reloads</p>
          </div>
        </div>

        {/* Global Toolbar & Actions */}
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
          {/* Search & Filter */}
          <div style={{ display: 'flex', gap: '12px', alignItems: 'center', flex: '1', minWidth: '300px' }}>
            <div style={{ position: 'relative', flex: 1 }}>
              <Search size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
              <input
                type="text"
                placeholder="Search module by name or description..."
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
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                style={{
                  padding: '8px 12px',
                  borderRadius: '8px',
                  border: '1px solid #cbd5e1',
                  fontSize: '14px',
                  background: '#fff',
                  cursor: 'pointer'
                }}
              >
                {categories.map(cat => (
                  <option key={cat} value={cat}>Category: {cat}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Bulk Action Buttons */}
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            <button
              onClick={handleSelectAll}
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
              <CheckSquare size={16} color="#059669" />
              Select All
            </button>

            <button
              onClick={handleDeselectAll}
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
              <Square size={16} color="#dc2626" />
              Deselect All
            </button>

            <button
              onClick={handleReset}
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
              Reset Defaults
            </button>

            <button
              onClick={handleSave}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                padding: '8px 18px',
                background: '#4f46e5',
                color: '#ffffff',
                border: 'none',
                borderRadius: '8px',
                fontSize: '13px',
                fontWeight: 600,
                cursor: 'pointer',
                boxShadow: '0 2px 6px rgba(79, 70, 229, 0.3)'
              }}
            >
              <Save size={16} />
              Save Configuration
            </button>
          </div>
        </div>

        {/* Modules Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
          gap: '16px'
        }}>
          {filteredModules.map(mod => {
            const isEnabled = currentConfigMap[mod.id] !== false;
            return (
              <div
                key={mod.id}
                style={{
                  background: '#ffffff',
                  borderRadius: '12px',
                  padding: '20px',
                  border: isEnabled ? '1px solid #cbd5e1' : '1px dashed #fca5a5',
                  opacity: isEnabled ? 1 : 0.8,
                  transition: 'all 0.2s',
                  boxShadow: isEnabled ? '0 2px 4px rgba(0,0,0,0.03)' : 'none',
                  position: 'relative'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div>
                    <span style={{
                      fontSize: '11px',
                      fontWeight: 700,
                      textTransform: 'uppercase',
                      padding: '3px 8px',
                      borderRadius: '6px',
                      background: isEnabled ? '#e0e7ff' : '#fee2e2',
                      color: isEnabled ? '#4338ca' : '#991b1b'
                    }}>
                      {mod.category}
                    </span>
                    <h3 style={{ margin: '8px 0 4px 0', fontSize: '17px', fontWeight: 700, color: '#1e293b' }}>
                      {mod.name}
                    </h3>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Toggle
                      checked={isEnabled}
                      onChange={() => handleToggle(mod.id)}
                    />
                  </div>
                </div>

                <p style={{ fontSize: '13px', color: '#64748b', margin: '8px 0 16px 0', minHeight: '36px', lineHeight: '1.4' }}>
                  {mod.description}
                </p>

                <div style={{
                  display: 'flex',
                  justify: 'space-between',
                  alignItems: 'center',
                  paddingTop: '12px',
                  borderTop: '1px solid #f1f5f9',
                  fontSize: '12px'
                }}>
                  <span style={{ color: isEnabled ? '#059669' : '#dc2626', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '4px' }}>
                    {isEnabled ? (
                      <>
                        <CheckCircle2 size={14} /> Visible in {activeApp === 'user' ? 'User App' : 'Partner App'}
                      </>
                    ) : (
                      <>
                        <XCircle size={14} /> Hidden Everywhere
                      </>
                    )}
                  </span>
                  <span style={{ color: '#94a3b8' }}>ID: {mod.id}</span>
                </div>
              </div>
            );
          })}
        </div>

        {filteredModules.length === 0 && (
          <div style={{ textAlign: 'center', padding: '60px 20px', background: '#fff', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
            <ShieldAlert size={48} color="#94a3b8" style={{ margin: '0 auto 12px auto' }} />
            <h3 style={{ margin: 0, color: '#334155' }}>No matching modules found</h3>
            <p style={{ color: '#64748b', fontSize: '14px', marginTop: '4px' }}>Try clearing your search query or filter parameters.</p>
          </div>
        )}

      </div>

      {/* Success Confirmation Modal */}
      <SuccessModal
        isOpen={isSuccessOpen}
        onClose={() => setIsSuccessOpen(false)}
        title="Access Control Updated"
        message={successMessage}
      />

      {/* Interactive Mobile Live Preview Drawer */}
      {isPreviewOpen && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(15, 23, 42, 0.65)',
          backdropFilter: 'blur(4px)',
          zIndex: 9999,
          display: 'flex',
          justifyContent: 'flex-end'
        }}>
          <div style={{
            width: '460px',
            maxWidth: '100%',
            background: '#ffffff',
            height: '100%',
            boxShadow: '-4px 0 24px rgba(0,0,0,0.15)',
            display: 'flex',
            flexDirection: 'column',
            animation: 'slideInRight 0.3s ease-out'
          }}>
            {/* Drawer Header */}
            <div style={{
              padding: '16px 20px',
              borderBottom: '1px solid #e2e8f0',
              display: 'flex',
              justify: 'space-between',
              alignItems: 'center',
              background: '#0f172a',
              color: '#fff'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Smartphone size={20} color="#38bdf8" />
                <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 600 }}>
                  Live App Simulation ({activeApp === 'user' ? 'User App' : 'Partner App'})
                </h3>
              </div>
              <button
                onClick={() => setIsPreviewOpen(false)}
                style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer' }}
              >
                <X size={20} />
              </button>
            </div>

            {/* Mobile Device Mockup Container */}
            <div style={{ flex: 1, padding: '20px', background: '#f8fafc', overflowY: 'auto' }}>
              <div style={{
                maxWidth: '340px',
                margin: '0 auto',
                background: '#ffffff',
                borderRadius: '32px',
                border: '12px solid #1e293b',
                boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
                minHeight: '620px',
                overflow: 'hidden',
                position: 'relative'
              }}>
                {/* Notch */}
                <div style={{
                  height: '24px',
                  background: '#1e293b',
                  width: '140px',
                  margin: '0 auto',
                  borderBottomLeftRadius: '12px',
                  borderBottomRightRadius: '12px'
                }}></div>

                {/* App Screen Content */}
                <div style={{ padding: '16px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                    <h4 style={{ margin: 0, fontSize: '18px', fontWeight: 800, color: '#0f172a' }}>
                      {activeApp === 'user' ? 'Hozify User App' : 'Hozify Partner Desk'}
                    </h4>
                    <span style={{ fontSize: '10px', background: '#10b981', color: '#fff', padding: '2px 6px', borderRadius: '4px', fontWeight: 700 }}>
                      LIVE SYNC
                    </span>
                  </div>

                  <p style={{ fontSize: '11px', color: '#64748b', marginBottom: '16px' }}>
                    Modules disabled in admin hide automatically below:
                  </p>

                  {/* Dynamic Modules Visibility List */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {modules.map(mod => {
                      const enabled = currentConfigMap[mod.id] !== false;
                      return (
                        <div
                          key={mod.id}
                          style={{
                            padding: '10px 12px',
                            borderRadius: '8px',
                            background: enabled ? '#f0fdf4' : '#fef2f2',
                            border: enabled ? '1px solid #bbf7d0' : '1px dashed #fca5a5',
                            display: 'flex',
                            justify: 'space-between',
                            alignItems: 'center',
                            transition: 'all 0.3s'
                          }}
                        >
                          <div>
                            <div style={{ fontSize: '13px', fontWeight: 600, color: enabled ? '#166534' : '#991b1b' }}>
                              {mod.name}
                            </div>
                            <div style={{ fontSize: '10px', color: '#64748b' }}>
                              Category: {mod.category}
                            </div>
                          </div>

                          <span style={{
                            fontSize: '10px',
                            fontWeight: 700,
                            padding: '2px 6px',
                            borderRadius: '4px',
                            background: enabled ? '#166534' : '#dc2626',
                            color: '#fff'
                          }}>
                            {enabled ? 'VISIBLE' : 'HIDDEN'}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </AdminShell>
  );
}
