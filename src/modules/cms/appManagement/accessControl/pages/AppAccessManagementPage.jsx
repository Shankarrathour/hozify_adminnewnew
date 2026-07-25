import React, { useState, useMemo, useEffect } from 'react';
import AdminShell from '../../../../../components/layouts/AdminShell';
import Toggle from '../../../../../components/common/Toggle';
import { useAppManagement } from '../../../../../hooks/useAppManagement';
import { configService } from '../../../../../services/appManagement/configService';
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
  ChevronRight,
  Info,
  Copy,
  UserCheck,
  Users,
  User,
  Building,
  MapPin,
  Phone,
  Mail,
  Award,
  RefreshCw
} from 'lucide-react';
import { SuccessModal } from '../../../../../components/common/popups/Modals';

// Mock list of registered Users for User App
const MOCK_USERS = [
  { id: 'USR-1001', name: 'Rahul Sharma', email: 'rahul.sharma@example.com', phone: '+91 98765 43210', city: 'Mumbai', tier: 'VIP Gold Member', avatarBg: '#4f46e5', status: 'Active' },
  { id: 'USR-1002', name: 'Ananya Verma', email: 'ananya.v@example.com', phone: '+91 98123 45678', city: 'Delhi', tier: 'Platinum Customer', avatarBg: '#ec4899', status: 'Active' },
  { id: 'USR-1003', name: 'Vikramaditya Roy', email: 'vikram.roy@example.com', phone: '+91 99887 76655', city: 'Bengaluru', tier: 'Standard User', avatarBg: '#059669', status: 'Active' },
  { id: 'USR-1004', name: 'Priya Sundaram', email: 'priya.s@example.com', phone: '+91 97654 32109', city: 'Chennai', tier: 'VIP Silver Member', avatarBg: '#d97706', status: 'Active' },
  { id: 'USR-1005', name: 'Amit Kumar Patel', email: 'amit.patel@example.com', phone: '+91 91234 56789', city: 'Ahmedabad', tier: 'Standard User', avatarBg: '#0284c7', status: 'Active' },
  { id: 'USR-1006', name: 'Sneha Deshmukh', email: 'sneha.d@example.com', phone: '+91 94567 89012', city: 'Pune', tier: 'New Registered User', avatarBg: '#8b5cf6', status: 'Active' },
  { id: 'USR-1007', name: 'Rohan Mehta', email: 'rohan.m@example.com', phone: '+91 93210 98765', city: 'Hyderabad', tier: 'VIP Gold Member', avatarBg: '#e11d48', status: 'Active' },
  { id: 'USR-1008', name: 'Kavita Sen', email: 'kavita.sen@example.com', phone: '+91 92345 67890', city: 'Kolkata', tier: 'Standard User', avatarBg: '#0d9488', status: 'Active' }
];

// Mock list of registered Partners for Partner App
const MOCK_PARTNERS = [
  { id: 'PTR-5001', name: 'Apex Home Solutions', contact: 'Rajesh Kumar', email: 'rajesh@apexhome.in', phone: '+91 98220 11223', city: 'Mumbai', role: 'Enterprise Vendor', category: 'AC Repair & Electrical', avatarBg: '#059669', status: 'Verified' },
  { id: 'PTR-5002', name: 'CleanPro Services', contact: 'Sunil Joshi', email: 'sunil@cleanpro.in', phone: '+91 98334 45566', city: 'Bengaluru', role: 'BSP Franchise Partner', category: 'Deep Cleaning', avatarBg: '#2563eb', status: 'Verified' },
  { id: 'PTR-5003', name: 'QuickFix Technicians', contact: 'Imran Khan', email: 'imran@quickfix.in', phone: '+91 99112 23344', city: 'Delhi', role: 'Independent Technician', category: 'Plumbing & Carpentry', avatarBg: '#d97706', status: 'Verified' },
  { id: 'PTR-5004', name: 'Sparkle Spa & Wellness', contact: 'Meera Nair', email: 'meera@sparklespa.in', phone: '+91 97445 56677', city: 'Chennai', role: 'Branch Manager', category: 'Beauty & Salon', avatarBg: '#ec4899', status: 'Verified' },
  { id: 'PTR-5005', name: 'National Care Services', contact: 'Deepak Verma', email: 'deepak@nationalcare.in', phone: '+91 96556 67788', city: 'Hyderabad', role: 'ISP Vendor', category: 'Appliance Repair', avatarBg: '#7c3aed', status: 'Verified' },
  { id: 'PTR-5006', name: 'Urban Pest Solutions', contact: 'Sanjay Patil', email: 'sanjay@urbanpest.in', phone: '+91 95667 78899', city: 'Pune', role: 'Certified Specialist', category: 'Pest Control', avatarBg: '#0891b2', status: 'Verified' }
];

export default function AppAccessManagementPage() {
  const { userAppConfig, partnerAppConfig } = useAppManagement();

  // Primary State
  const [activeApp, setActiveApp] = useState('user'); // 'user' | 'partner'
  const [selectedUser, setSelectedUser] = useState(MOCK_USERS[0]);
  const [selectedPartner, setSelectedPartner] = useState(MOCK_PARTNERS[0]);
  
  // Per-entity feature permissions state map
  const [permissionsMap, setPermissionsMap] = useState({});
  const [isCustomPolicy, setIsCustomPolicy] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  // Filters & Search
  const [entitySearch, setEntitySearch] = useState('');
  const [moduleSearch, setModuleSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('ALL');
  
  // UI Drawers & Modals
  const [isCopyModalOpen, setIsCopyModalOpen] = useState(false);
  const [copySourceId, setCopySourceId] = useState('');
  const [isSuccessOpen, setIsSuccessOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  // Active module definitions
  const modules = activeApp === 'user' ? USER_APP_MODULES : PARTNER_APP_MODULES;

  // Active target entity
  const currentTarget = activeApp === 'user' ? selectedUser : selectedPartner;

  // Load target permissions whenever activeApp, selectedUser, or selectedPartner changes
  useEffect(() => {
    let isMounted = true;
    async function loadTargetPermissions() {
      try {
        if (activeApp === 'user') {
          if (!selectedUser) return;
          const config = await configService.getUserAccessConfig(selectedUser.id);
          const hasCustom = typeof window !== 'undefined' && window.localStorage ? !!localStorage.getItem(`hozify_user_access_${selectedUser.id}`) : false;
          if (isMounted) {
            setPermissionsMap(config || {});
            setIsCustomPolicy(hasCustom);
          }
        } else {
          if (!selectedPartner) return;
          const config = await configService.getPartnerAccessConfig(selectedPartner.id);
          const hasCustom = typeof window !== 'undefined' && window.localStorage ? !!localStorage.getItem(`hozify_partner_access_${selectedPartner.id}`) : false;
          if (isMounted) {
            setPermissionsMap(config || {});
            setIsCustomPolicy(hasCustom);
          }
        }
      } catch (err) {
        console.error('Error loading permissions:', err);
      }
    }
    loadTargetPermissions();
    return () => { isMounted = false; };
  }, [activeApp, selectedUser, selectedPartner]);

  // Extract unique categories
  const categories = useMemo(() => {
    const list = modules || [];
    const set = new Set(list.map(m => m.category));
    return ['ALL', ...Array.from(set)];
  }, [modules]);

  // Filtered target entity candidates for search selector
  const filteredCandidates = useMemo(() => {
    const candidates = activeApp === 'user' ? MOCK_USERS : MOCK_PARTNERS;
    if (!entitySearch.trim()) return candidates;
    const q = entitySearch.toLowerCase();
    return candidates.filter(c => 
      (c.name || '').toLowerCase().includes(q) ||
      (c.id || '').toLowerCase().includes(q) ||
      (c.email || '').toLowerCase().includes(q) ||
      (c.phone || '').toLowerCase().includes(q) ||
      (c.city || '').toLowerCase().includes(q) ||
      (c.tier && c.tier.toLowerCase().includes(q)) ||
      (c.role && c.role.toLowerCase().includes(q))
    );
  }, [activeApp, entitySearch]);

  // Filtered modules
  const filteredModules = useMemo(() => {
    const list = modules || [];
    return list.filter(m => {
      const matchesSearch = (m.name || '').toLowerCase().includes(moduleSearch.toLowerCase()) ||
                            (m.description || '').toLowerCase().includes(moduleSearch.toLowerCase()) ||
                            (m.category || '').toLowerCase().includes(moduleSearch.toLowerCase());
      const matchesCategory = categoryFilter === 'ALL' || m.category === categoryFilter;
      return matchesSearch && matchesCategory;
    });
  }, [modules, moduleSearch, categoryFilter]);

  // Statistics
  const totalCount = (modules || []).length;
  const enabledCount = (modules || []).filter(m => permissionsMap && permissionsMap[m.id] !== false).length;
  const disabledCount = totalCount - enabledCount;

  // Handlers
  const handleToggle = (id) => {
    setPermissionsMap(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const handleSelectAll = () => {
    const updated = {};
    modules.forEach(m => { updated[m.id] = true; });
    setPermissionsMap(updated);
  };

  const handleDeselectAll = () => {
    const updated = {};
    modules.forEach(m => { updated[m.id] = false; });
    setPermissionsMap(updated);
  };

  const handleResetToDefault = async () => {
    if (activeApp === 'user') {
      const defaultConfig = await configService.resetUserAccessConfig(selectedUser.id);
      setPermissionsMap(defaultConfig);
      setIsCustomPolicy(false);
      setSuccessMessage(`Reset access permissions for User ${selectedUser.name} (${selectedUser.id}) to Global Defaults!`);
    } else {
      const defaultConfig = await configService.resetPartnerAccessConfig(selectedPartner.id);
      setPermissionsMap(defaultConfig);
      setIsCustomPolicy(false);
      setSuccessMessage(`Reset access permissions for Partner ${selectedPartner.name} (${selectedPartner.id}) to Global Defaults!`);
    }
    setIsSuccessOpen(true);
  };

  const handleSaveAccess = async () => {
    setIsSaving(true);
    try {
      if (activeApp === 'user') {
        await configService.saveUserAccessConfig(selectedUser.id, permissionsMap);
        setIsCustomPolicy(true);
        setSuccessMessage(`Access permissions saved specifically for User ${selectedUser.name} (${selectedUser.id})! Changing this user does not affect any other users.`);
      } else {
        await configService.savePartnerAccessConfig(selectedPartner.id, permissionsMap);
        setIsCustomPolicy(true);
        setSuccessMessage(`Access permissions saved specifically for Partner ${selectedPartner.name} (${selectedPartner.id})! Changing this partner does not affect any other partners.`);
      }
      setIsSuccessOpen(true);
    } catch (err) {
      console.error('Error saving per-entity access config:', err);
    } finally {
      setIsSaving(false);
    }
  };

  const handleApplyCopyAccess = async () => {
    if (!copySourceId) return;
    let sourceConfig = {};
    let sourceName = '';

    if (activeApp === 'user') {
      if (copySourceId === 'GLOBAL_DEFAULT') {
        sourceConfig = await configService.getAppConfig('user');
        sourceName = 'Global Default Policy';
      } else {
        const found = MOCK_USERS.find(u => u.id === copySourceId);
        sourceConfig = await configService.getUserAccessConfig(copySourceId);
        sourceName = found ? found.name : copySourceId;
      }
      setPermissionsMap(sourceConfig);
      setIsCopyModalOpen(false);
      setSuccessMessage(`Successfully copied access settings from "${sourceName}" to User ${selectedUser.name}! Click Save Access to persist.`);
      setIsSuccessOpen(true);
    } else {
      if (copySourceId === 'GLOBAL_DEFAULT') {
        sourceConfig = await configService.getAppConfig('partner');
        sourceName = 'Global Default Policy';
      } else {
        const found = MOCK_PARTNERS.find(p => p.id === copySourceId);
        sourceConfig = await configService.getPartnerAccessConfig(copySourceId);
        sourceName = found ? found.name : copySourceId;
      }
      setPermissionsMap(sourceConfig);
      setIsCopyModalOpen(false);
      setSuccessMessage(`Successfully copied access settings from "${sourceName}" to Partner ${selectedPartner.name}! Click Save Access to persist.`);
      setIsSuccessOpen(true);
    }
  };

  return (
    <AdminShell headerTitle="App Access Management" activeTab="CMS">
      <div style={{ padding: '24px', maxWidth: '1400px', margin: '0 auto' }}>
        
        {/* ── STEP 1: Target App Selection (User App vs Partner App) & Preview ── */}
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: '12px', 
          marginBottom: '20px',
          borderBottom: '1px solid #e2e8f0',
          paddingBottom: '14px',
          flexWrap: 'wrap'
        }}>
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <button
              onClick={() => {
                setActiveApp('user');
                setCategoryFilter('ALL');
                setModuleSearch('');
              }}
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
              User App Access
              <span style={{
                background: activeApp === 'user' ? '#4f46e5' : '#94a3b8',
                color: '#fff',
                fontSize: '11px',
                padding: '2px 8px',
                borderRadius: '12px',
                fontWeight: 700
              }}>
                23 Modules
              </span>
            </button>

            <button
              onClick={() => {
                setActiveApp('partner');
                setCategoryFilter('ALL');
                setModuleSearch('');
              }}
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
              <Users size={20} color={activeApp === 'partner' ? '#059669' : '#64748b'} />
              Partner App Access
              <span style={{
                background: activeApp === 'partner' ? '#059669' : '#94a3b8',
                color: '#fff',
                fontSize: '11px',
                padding: '2px 8px',
                borderRadius: '12px',
                fontWeight: 700
              }}>
                19 Modules
              </span>
            </button>
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
            Preview Visible Modules
          </button>
        </div>

        {/* ── STEP 2: Target Entity Selector & Searchable Selector ── */}
        <div style={{
          background: '#ffffff',
          borderRadius: '14px',
          padding: '20px',
          border: '1px solid #e2e8f0',
          boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
          marginBottom: '24px'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', flexWrap: 'wrap', gap: '10px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              {activeApp === 'user' ? <User size={20} color="#4f46e5" /> : <Building size={20} color="#059669" />}
              <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 700, color: '#1e293b' }}>
                Select Target {activeApp === 'user' ? 'User' : 'Partner'} to Configure
              </h3>
            </div>
            <span style={{ fontSize: '13px', color: '#64748b', background: '#f1f5f9', padding: '4px 10px', borderRadius: '6px', fontWeight: 600 }}>
              Showing {filteredCandidates.length} Registered {activeApp === 'user' ? 'Users' : 'Partners'}
            </span>
          </div>

          {/* Search Candidate Input */}
          <div style={{ position: 'relative', marginBottom: '16px' }}>
            <Search size={18} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
            <input
              type="text"
              placeholder={`Search ${activeApp === 'user' ? 'User by Name, ID (e.g. USR-1001), Email, Phone or City...' : 'Partner by Business Name, ID (e.g. PTR-5001), Contact, Category or City...'}`}
              value={entitySearch}
              onChange={(e) => setEntitySearch(e.target.value)}
              style={{
                width: '100%',
                paddingLeft: '42px',
                paddingRight: '14px',
                paddingTop: '10px',
                paddingBottom: '10px',
                borderRadius: '8px',
                border: '1.5px solid #cbd5e1',
                fontSize: '14px',
                outline: 'none',
                background: '#fafafa'
              }}
            />
          </div>

          {/* Searchable Cards Pills Carousel / Selector List */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
            gap: '12px',
            maxHeight: '220px',
            overflowY: 'auto',
            paddingRight: '4px'
          }}>
            {filteredCandidates.map(item => {
              const isSelected = activeApp === 'user' 
                ? (selectedUser && selectedUser.id === item.id)
                : (selectedPartner && selectedPartner.id === item.id);
              
              const isCustom = !!localStorage.getItem(`hozify_${activeApp}_access_${item.id}`);

              return (
                <div
                  key={item.id}
                  onClick={() => {
                    if (activeApp === 'user') setSelectedUser(item);
                    else setSelectedPartner(item);
                  }}
                  style={{
                    padding: '12px 14px',
                    borderRadius: '10px',
                    border: isSelected 
                      ? (activeApp === 'user' ? '2px solid #4f46e5' : '2px solid #059669') 
                      : '1px solid #e2e8f0',
                    background: isSelected 
                      ? (activeApp === 'user' ? '#eef2ff' : '#ecfdf5') 
                      : '#ffffff',
                    cursor: 'pointer',
                    transition: 'all 0.15s',
                    boxShadow: isSelected ? '0 3px 10px rgba(0,0,0,0.06)' : 'none'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div style={{
                      width: '36px',
                      height: '36px',
                      borderRadius: '50%',
                      background: item.avatarBg || '#6366f1',
                      color: '#fff',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: 700,
                      fontSize: '14px',
                      flexShrink: 0
                    }}>
                      {item.name.charAt(0)}
                    </div>

                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <h4 style={{ margin: 0, fontSize: '14px', fontWeight: 700, color: '#1e293b', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                          {item.name}
                        </h4>
                        <span style={{ fontSize: '10px', color: '#64748b', fontWeight: 600 }}>{item.id}</span>
                      </div>

                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '2px' }}>
                        <span style={{ fontSize: '11px', color: '#64748b' }}>{item.city}</span>
                        <span style={{ fontSize: '10px', color: '#94a3b8' }}>•</span>
                        <span style={{ 
                          fontSize: '10px', 
                          fontWeight: 700, 
                          color: activeApp === 'user' ? '#4338ca' : '#047857',
                          background: activeApp === 'user' ? '#e0e7ff' : '#d1fae5',
                          padding: '1px 6px',
                          borderRadius: '4px'
                        }}>
                          {item.tier || item.role}
                        </span>
                      </div>
                    </div>
                  </div>

                  {isCustom && (
                    <div style={{ marginTop: '8px', paddingTop: '6px', borderTop: '1px dashed #cbd5e1', display: 'flex', alignItems: 'center', gap: '4px', fontSize: '10px', color: '#d97706', fontWeight: 600 }}>
                      <Sparkles size={12} /> Custom Policy Overridden
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {filteredCandidates.length === 0 && (
            <div style={{ textAlign: 'center', padding: '20px', color: '#64748b', fontSize: '13px' }}>
              No {activeApp === 'user' ? 'users' : 'partners'} match your query "{entitySearch}".
            </div>
          )}
        </div>

        {/* ── STEP 3: Selected Target Information Card ── */}
        {currentTarget && (
          <div style={{
            background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)',
            borderRadius: '16px',
            padding: '22px 26px',
            color: '#ffffff',
            marginBottom: '24px',
            boxShadow: '0 10px 25px -5px rgba(15, 23, 42, 0.25)',
            position: 'relative',
            overflow: 'hidden'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px' }}>
              
              {/* User / Partner Details */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <div style={{
                  width: '56px',
                  height: '56px',
                  borderRadius: '50%',
                  background: currentTarget.avatarBg || '#4f46e5',
                  color: '#ffffff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '22px',
                  fontWeight: 800,
                  boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
                  border: '3px solid rgba(255,255,255,0.2)'
                }}>
                  {currentTarget.name.charAt(0)}
                </div>

                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
                    <h2 style={{ margin: 0, fontSize: '20px', fontWeight: 800, color: '#ffffff' }}>
                      {currentTarget.name}
                    </h2>
                    <span style={{
                      background: 'rgba(255, 255, 255, 0.15)',
                      color: '#38bdf8',
                      fontSize: '12px',
                      padding: '3px 10px',
                      borderRadius: '12px',
                      fontWeight: 700,
                      letterSpacing: '0.5px'
                    }}>
                      ID: {currentTarget.id}
                    </span>
                    <span style={{
                      background: isCustomPolicy ? '#f59e0b' : '#10b981',
                      color: '#ffffff',
                      fontSize: '11px',
                      padding: '3px 10px',
                      borderRadius: '12px',
                      fontWeight: 700,
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px'
                    }}>
                      {isCustomPolicy ? (
                        <>
                          <Sparkles size={12} /> Custom Policy Saved
                        </>
                      ) : (
                        <>
                          <CheckCircle2 size={12} /> Global Default Policy
                        </>
                      )}
                    </span>
                  </div>

                  <div style={{ display: 'flex', gap: '16px', marginTop: '8px', fontSize: '13px', color: '#cbd5e1', flexWrap: 'wrap' }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <Award size={14} color="#fcd34d" />
                      {currentTarget.tier || currentTarget.role}
                    </span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <MapPin size={14} color="#38bdf8" />
                      {currentTarget.city}
                    </span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <Phone size={14} color="#a7f3d0" />
                      {currentTarget.phone}
                    </span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <Mail size={14} color="#f472b6" />
                      {currentTarget.email}
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Buttons for Current Entity */}
              <div style={{ display: 'flex', gap: '10px', alignItems: 'center', flexWrap: 'wrap' }}>
                <button
                  onClick={() => setIsCopyModalOpen(true)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    padding: '9px 16px',
                    background: 'rgba(255, 255, 255, 0.12)',
                    color: '#ffffff',
                    border: '1px solid rgba(255, 255, 255, 0.25)',
                    borderRadius: '8px',
                    fontSize: '13px',
                    fontWeight: 600,
                    cursor: 'pointer',
                    backdropFilter: 'blur(4px)',
                    transition: 'all 0.2s'
                  }}
                >
                  <Copy size={15} />
                  Copy Access From Another {activeApp === 'user' ? 'User' : 'Partner'}
                </button>

                <button
                  onClick={handleSaveAccess}
                  disabled={isSaving}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    padding: '9px 20px',
                    background: '#10b981',
                    color: '#ffffff',
                    border: 'none',
                    borderRadius: '8px',
                    fontSize: '13px',
                    fontWeight: 700,
                    cursor: isSaving ? 'wait' : 'pointer',
                    boxShadow: '0 4px 14px rgba(16, 185, 129, 0.35)',
                    transition: 'all 0.2s'
                  }}
                >
                  <Save size={16} />
                  {isSaving ? 'Saving...' : `Save Access for ${currentTarget.name}`}
                </button>
              </div>
            </div>

            {/* Quick Permissions Stats Strip */}
            <div style={{
              display: 'flex',
              gap: '24px',
              marginTop: '18px',
              paddingTop: '14px',
              borderTop: '1px solid rgba(255, 255, 255, 0.1)',
              fontSize: '13px',
              flexWrap: 'wrap'
            }}>
              <div>
                <span style={{ color: '#94a3b8' }}>Total App Modules: </span>
                <strong style={{ color: '#ffffff' }}>{totalCount}</strong>
              </div>
              <div>
                <span style={{ color: '#94a3b8' }}>Enabled Modules: </span>
                <strong style={{ color: '#34d399' }}>{enabledCount} ({Math.round((enabledCount/totalCount)*100)}%)</strong>
              </div>
              <div>
                <span style={{ color: '#94a3b8' }}>Disabled Modules: </span>
                <strong style={{ color: '#f87171' }}>{disabledCount}</strong>
              </div>
              <div>
                <span style={{ color: '#94a3b8' }}>Scope: </span>
                <strong style={{ color: '#38bdf8' }}>Specific {activeApp === 'user' ? 'User' : 'Partner'} Only ({currentTarget.id})</strong>
              </div>
            </div>
          </div>
        )}

        {/* ── STEP 4: Global Module Toolbar & Controls ── */}
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
          {/* Module Search & Category Filter */}
          <div style={{ display: 'flex', gap: '12px', alignItems: 'center', flex: '1', minWidth: '300px' }}>
            <div style={{ position: 'relative', flex: 1 }}>
              <Search size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
              <input
                type="text"
                placeholder="Search feature module by name (e.g. Home, Wallet, Bookings, Settings...)"
                value={moduleSearch}
                onChange={(e) => setModuleSearch(e.target.value)}
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
              onClick={handleResetToDefault}
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
              Reset to Defaults
            </button>
          </div>
        </div>

        {/* ── STEP 5: Feature Toggle Grid ── */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
          gap: '16px'
        }}>
          {filteredModules.map(mod => {
            const isEnabled = permissionsMap[mod.id] !== false;

            return (
              <div
                key={mod.id}
                style={{
                  background: '#ffffff',
                  borderRadius: '12px',
                  padding: '20px',
                  border: isEnabled ? '1.5px solid #cbd5e1' : '1.5px dashed #fca5a5',
                  opacity: isEnabled ? 1 : 0.85,
                  transition: 'all 0.2s',
                  boxShadow: isEnabled ? '0 2px 6px rgba(0,0,0,0.03)' : 'none',
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
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  paddingTop: '12px',
                  borderTop: '1px solid #f1f5f9',
                  fontSize: '12px'
                }}>
                  <span style={{ color: isEnabled ? '#059669' : '#dc2626', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '4px' }}>
                    {isEnabled ? (
                      <>
                        <CheckCircle2 size={14} /> Visible for {currentTarget ? currentTarget.name : 'Target'}
                      </>
                    ) : (
                      <>
                        <XCircle size={14} /> Hidden for {currentTarget ? currentTarget.name : 'Target'}
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
            <p style={{ color: '#64748b', fontSize: '14px', marginTop: '4px' }}>Try clearing your search query or category filter.</p>
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

      {/* Copy Access Modal */}
      {isCopyModalOpen && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          background: 'rgba(15, 23, 42, 0.65)',
          backdropFilter: 'blur(4px)',
          zIndex: 99999,
          display: 'flex',
          justify: 'center',
          alignItems: 'center'
        }}>
          <div style={{
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            background: '#ffffff',
            borderRadius: '16px',
            width: '500px',
            maxWidth: '92vw',
            maxHeight: '90vh',
            padding: '24px',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.35)',
            border: '1px solid #e2e8f0',
            overflowY: 'auto',
            zIndex: 100000
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Copy size={20} color="#4f46e5" />
                <h3 style={{ margin: 0, fontSize: '18px', fontWeight: 700, color: '#1e293b' }}>
                  Copy Access Configuration
                </h3>
              </div>
              <button onClick={() => setIsCopyModalOpen(false)} style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer' }}>
                <X size={20} />
              </button>
            </div>

            <p style={{ fontSize: '13px', color: '#64748b', margin: '0 0 16px 0', lineHeight: '1.5' }}>
              Copy all module permissions from another {activeApp === 'user' ? 'user' : 'partner'} or global default template directly to <strong>{currentTarget ? currentTarget.name : 'Target'}</strong> ({currentTarget ? currentTarget.id : ''}).
            </p>

            <label style={{ fontSize: '12px', fontWeight: 700, color: '#334155', display: 'block', marginBottom: '6px' }}>
              Select Source {activeApp === 'user' ? 'User' : 'Partner'} or Template:
            </label>

            <select
              value={copySourceId}
              onChange={(e) => setCopySourceId(e.target.value)}
              style={{
                width: '100%',
                padding: '10px 12px',
                borderRadius: '8px',
                border: '1.5px solid #cbd5e1',
                fontSize: '14px',
                background: '#fff',
                marginBottom: '20px',
                cursor: 'pointer'
              }}
            >
              <option value="">-- Select Source Candidate --</option>
              <option value="GLOBAL_DEFAULT">⚙️ Global Default System Policy</option>
              {(activeApp === 'user' ? MOCK_USERS : MOCK_PARTNERS)
                .filter(item => item.id !== (currentTarget ? currentTarget.id : ''))
                .map(item => (
                  <option key={item.id} value={item.id}>
                    {item.name} ({item.id}) - {item.tier || item.role} ({item.city})
                  </option>
                ))}
            </select>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
              <button
                onClick={() => setIsCopyModalOpen(false)}
                style={{
                  padding: '9px 16px',
                  borderRadius: '8px',
                  border: '1px solid #cbd5e1',
                  background: '#ffffff',
                  color: '#475569',
                  fontWeight: 600,
                  fontSize: '13px',
                  cursor: 'pointer'
                }}
              >
                Cancel
              </button>

              <button
                onClick={handleApplyCopyAccess}
                disabled={!copySourceId}
                style={{
                  padding: '9px 20px',
                  borderRadius: '8px',
                  border: 'none',
                  background: copySourceId ? '#4f46e5' : '#94a3b8',
                  color: '#ffffff',
                  fontWeight: 700,
                  fontSize: '13px',
                  cursor: copySourceId ? 'pointer' : 'not-allowed',
                  boxShadow: copySourceId ? '0 4px 12px rgba(79, 70, 229, 0.25)' : 'none'
                }}
              >
                Apply Copy Access
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Interactive Mobile Live Preview Modal (Centered) */}
      {isPreviewOpen && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          background: 'rgba(15, 23, 42, 0.65)',
          backdropFilter: 'blur(4px)',
          zIndex: 99999,
          display: 'flex',
          justify: 'center',
          alignItems: 'center'
        }}>
          <div style={{
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '460px',
            maxWidth: '92vw',
            maxHeight: '90vh',
            background: '#ffffff',
            borderRadius: '24px',
            boxShadow: '0 25px 60px rgba(0,0,0,0.35)',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
            border: '1px solid #cbd5e1',
            zIndex: 100000
          }}>
            {/* Modal Header */}
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
                  App Live Simulation ({currentTarget ? currentTarget.name : 'Target'})
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
                minHeight: '540px',
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
                    <div>
                      <h4 style={{ margin: 0, fontSize: '16px', fontWeight: 800, color: '#0f172a' }}>
                        {activeApp === 'user' ? 'Hozify User App' : 'Hozify Partner Desk'}
                      </h4>
                      <p style={{ margin: '2px 0 0 0', fontSize: '11px', color: '#4f46e5', fontWeight: 600 }}>
                        Target: {currentTarget ? currentTarget.name : 'Selected User'}
                      </p>
                    </div>
                    <span style={{ fontSize: '10px', background: '#10b981', color: '#fff', padding: '2px 6px', borderRadius: '4px', fontWeight: 700 }}>
                      PER-TARGET LIVE
                    </span>
                  </div>

                  <p style={{ fontSize: '11px', color: '#64748b', marginBottom: '16px' }}>
                    Below modules reflect custom access toggles for this target:
                  </p>

                  {/* Dynamic Modules Visibility List */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {modules.map(mod => {
                      const enabled = permissionsMap[mod.id] !== false;
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
