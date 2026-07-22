import React, { useEffect, useState } from 'react';
import AdminShell from '../../components/layouts/AdminShell';
import { useApp } from '../../hooks/useApp';
import { ROUTES } from '../../config/routes';
import ServicesList from './ServicesList';
import ServiceCategories from './ServiceCategories';
import ZoneAnalysis from './ZoneAnalysis';
import NewServiceWizard from './NewServiceWizard';
import ServiceProfile from './ServiceProfile';
import ApprovalsList from './ApprovalsList';
import ApprovalDetails from './ApprovalDetails';
import ServiceDashboard from './ServiceDashboard';
import PricingStrategy from './PricingStrategy';
import FeaturedManagement from './FeaturedManagement';
import ComparisonHub from './ComparisonHub';
import MediaLibrary from './MediaLibrary';
import ServiceSubCategories from './ServiceSubCategories';
import CommissionManagement from './CommissionManagement';
import ServiceAuditLogs from './ServiceAuditLogs';
import ServiceCreation from './ServiceCreation';
import ServiceActivation from './ServiceActivation';

const routeTabMap = {
  [ROUTES.services]: 'services',
  [ROUTES.serviceAll]: 'services',
  [ROUTES.serviceCreation]: 'creation',
  [ROUTES.serviceActivation]: 'activation',
  [ROUTES.serviceCategories]: 'categories',
  [ROUTES.serviceSubCategories]: 'subcategories',
  [ROUTES.serviceAdd]: 'wizard',
  [ROUTES.serviceApprovals]: 'approvals',
  [ROUTES.servicePricing]: 'pricing',
  [ROUTES.serviceCommission]: 'commission',
  [ROUTES.serviceAuditLogs]: 'audit-logs',
  [ROUTES.serviceAreasList]: 'zones',
  [ROUTES.servicePerformance]: 'dashboard',
  [ROUTES.serviceAnalytics]: 'comparison',
  [ROUTES.serviceFeatured]: 'featured',
  [ROUTES.serviceMedia]: 'media'
};

export default function Services({ defaultTab }) {
  const { route } = useApp();
  const getTabFromRoute = () => defaultTab || routeTabMap[route] || 'services';
  const [activeTab, setActiveTab] = useState(getTabFromRoute);
  // 'services' | 'categories' | 'zones' | 'dashboard' | 'pricing' | 'profile' | 'approvals' | 'approval-details' | 'wizard'
  
  const [wizardFromTab, setWizardFromTab] = useState('services');
  const [selectedApprovalId, setSelectedApprovalId] = useState(null);

  useEffect(() => {
    setActiveTab(getTabFromRoute());
  }, [route, defaultTab]);

  const openWizard = (fromTab = 'services') => {
    setWizardFromTab(fromTab);
    setActiveTab('wizard');
  };

  const closeWizard = () => {
    setActiveTab(wizardFromTab);
  };

  const showCatalog = () => {
    setActiveTab('services');
  };

  const showProfile = () => {
    setActiveTab('profile');
  };

  const showApprovalsList = () => {
    setActiveTab('approvals');
  };

  const showApprovalDetails = (id) => {
    setSelectedApprovalId(id);
    setActiveTab('approval-details');
  };

  const getHeaderTitle = (tab) => {
    switch (tab) {
      case 'wizard': return 'New Service Wizard';
      case 'profile': return 'Service Profile';
      case 'approvals': return 'Service Approvals';
      case 'approval-details': return 'Approval Details';
      case 'creation': return 'Service Creation';
      case 'activation': return 'Service Activation';
      case 'categories': return 'Service Categories';
      case 'subcategories': return 'Sub Categories';
      case 'zones': return 'GIS Zone Analysis';
      case 'dashboard': return 'Service Dashboard';
      case 'pricing': return 'Pricing Strategy';
      case 'commission': return 'Commission Rules';
      case 'featured': return 'Featured Clusters';
      case 'comparison': return 'Comparison Hub';
      case 'media': return 'Media Library';
      case 'audit-logs': return 'Audit Logs';
      case 'services':
      default: return 'Services Catalog';
    }
  };

  // 1. Wizard View (renders full-screen inside AdminShell)
  if (activeTab === 'wizard') {
    return (
      <AdminShell showGlobalExport={true} activeTab="Services" headerTitle={getHeaderTitle(activeTab)} searchPlaceholder="Search catalog...">
        <NewServiceWizard onClose={closeWizard} />
      </AdminShell>
    );
  }

  // 2. Service Profile sub-view
  if (activeTab === 'profile') {
    return (
      <AdminShell showGlobalExport={true} activeTab="Services" headerTitle={getHeaderTitle(activeTab)} searchPlaceholder="Search profile details...">
        <ServiceProfile onClose={showCatalog} />
      </AdminShell>
    );
  }

  // 3. Approvals Queue sub-view
  if (activeTab === 'approvals') {
    return (
      <AdminShell showGlobalExport={true} activeTab="Services" headerTitle={getHeaderTitle(activeTab)} searchPlaceholder="Search approval requests...">
        <ApprovalsList onViewDetails={showApprovalDetails} onClose={showCatalog} />
      </AdminShell>
    );
  }

  // 4. Approval Details sub-view
  if (activeTab === 'approval-details') {
    return (
      <AdminShell showGlobalExport={true} activeTab="Services" headerTitle={getHeaderTitle(activeTab)} searchPlaceholder="Search specs, risk score...">
        <ApprovalDetails requestId={selectedApprovalId} onBack={showApprovalsList} />
      </AdminShell>
    );
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'creation':
        return <ServiceCreation />;
      case 'activation':
        return <ServiceActivation />;
      case 'services':
        return (
          <ServicesList
            onAddService={() => openWizard('services')}
            onViewProfile={showProfile}
            onViewApprovals={showApprovalsList}
          />
        );
      case 'categories':
        return <ServiceCategories onAddCategory={() => openWizard('categories')} />;
      case 'subcategories':
        return <ServiceSubCategories onAddSubCategory={() => openWizard('subcategories')} />;
      case 'zones':
        return <ZoneAnalysis />;
      case 'dashboard':
        return <ServiceDashboard />;
      case 'pricing':
        return <PricingStrategy />;
      case 'commission':
        return <CommissionManagement />;
      case 'audit-logs':
        return <ServiceAuditLogs />;
      case 'featured':
        return <FeaturedManagement />;
      case 'comparison':
        return <ComparisonHub />;
      case 'media':
        return <MediaLibrary />;
      default:
        return (
          <ServicesList
            onAddService={() => openWizard('services')}
            onViewProfile={showProfile}
            onViewApprovals={showApprovalsList}
          />
        );
    }
  };

  return (
    <AdminShell showGlobalExport={true}
      activeTab="Services"
      headerTitle={getHeaderTitle(activeTab)}
      searchPlaceholder={
        activeTab === 'categories'
          ? 'Search categories...'
          : activeTab === 'zones'
          ? 'Search service areas...'
          : activeTab === 'dashboard'
          ? 'Search performance charts...'
          : activeTab === 'pricing'
          ? 'Search pricing rules...'
          : activeTab === 'commission'
          ? 'Search commission rules...'
          : activeTab === 'audit-logs'
          ? 'Search audit logs...'
          : activeTab === 'featured'
          ? 'Search service registry...'
          : activeTab === 'comparison'
          ? 'Search comparison metrics...'
          : activeTab === 'media'
          ? 'Search service assets...'
          : 'Search services...'
      }
    >
      {/* Sub-tab Selection Header */}
      <div
        style={{
          display: 'flex',
          gap: 'var(--spacing-section)',
          borderBottom: '1.5px solid #25108f',
          marginBottom: '24px',
          overflowY: 'auto', maxHeight: '400px',
          whiteSpace: 'nowrap'
        }}
      >
        {[
          { id: 'services', label: 'Services Catalog' },
          { id: 'creation', label: 'Service Creation' },
          { id: 'activation', label: 'Service Activation' },
          { id: 'categories', label: 'Service Categories' },
          { id: 'subcategories', label: 'Sub Categories' },
          { id: 'zones', label: 'GIS Zone Analysis' },
          { id: 'dashboard', label: 'Dashboard' },
          { id: 'pricing', label: 'Pricing Strategy' },
          { id: 'commission', label: 'Commission Rules' },
          { id: 'featured', label: 'Featured Clusters' },
          { id: 'comparison', label: 'Comparison Hub' },
          { id: 'media', label: 'Media Library' },
          { id: 'audit-logs', label: 'Audit Logs' }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            type="button"
            style={{
              background: 'transparent',
              border: 'none',
              borderBottom: activeTab === tab.id ? '2px solid #25108f' : '2px solid transparent',
              color: activeTab === tab.id ? '#25108f' : 'var(--muted)',
              fontWeight: '700',
              fontSize: '13px',
              padding: '10px 4px',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              marginRight: '8px'
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Renders Selected Sub-View Component */}
      {renderContent()}
    </AdminShell>
  );
}


