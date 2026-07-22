import React, { useState, useEffect } from 'react';
import AdminShell from '../../components/layouts/AdminShell';
import { useApp } from '../../hooks/useApp';
import { ROUTES } from '../../config/routes';
import BranchPerformance from './BranchPerformance';
import BranchApproval from './BranchApproval';
import BranchAnalytics from './BranchAnalytics';
import BranchCompliance from './BranchCompliance';
import BranchInventory from './BranchInventory';

export default function Branches({ defaultTab }) {
  const { route, navigate } = useApp();

  const getTabFromRouteOrProp = () => {
    if (defaultTab) return defaultTab;
    if (route === ROUTES.branchPerformance) return 'Performance';
    if (route === ROUTES.branchApproval) return 'ApprovalQueue';
    if (route === ROUTES.branchAnalytics) return 'Analytics';
    if (route === ROUTES.branchCompliance) return 'Compliance';
    return 'Directory'; // Default tab
  };

  const [activeTab, setActiveTab] = useState(getTabFromRouteOrProp);

  // Sync tab state when route or prop updates
  useEffect(() => {
    setActiveTab(getTabFromRouteOrProp());
  }, [route, defaultTab]);

  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
    if (tabId === 'Directory') {
      navigate(ROUTES.branches);
    } else if (tabId === 'Performance') {
      navigate(ROUTES.branchPerformance);
    } else if (tabId === 'ApprovalQueue') {
      navigate(ROUTES.branchApproval);
    } else if (tabId === 'Analytics') {
      navigate(ROUTES.branchAnalytics);
    } else if (tabId === 'Compliance') {
      navigate(ROUTES.branchCompliance);
    }
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'Directory':
        return <BranchInventory />;
      case 'Performance':
        return <BranchPerformance />;
      case 'ApprovalQueue':
        return <BranchApproval />;
      case 'Analytics':
        return <BranchAnalytics />;
      case 'Compliance':
        return <BranchCompliance />;
      default:
        return <BranchInventory />;
    }
  };

  return (
    <AdminShell showGlobalExport={true}
      activeTab="Branches"
      headerTitle={
        activeTab === 'Directory' ? 'Branch Directory' :
        activeTab === 'Performance' ? 'Branch Performance' :
        activeTab === 'ApprovalQueue' ? 'Approval Queue' :
        activeTab === 'Analytics' ? 'Revenue Analytics' :
        activeTab === 'Compliance' ? 'Branch Compliance' :
        'Branch Manager'
      }
      searchPlaceholder="Search in branch suite..."
    >
      {/* Sub-tab selection bar */}
      <div style={{ display: 'flex', gap: '16px', borderBottom: '1.5px solid #25108f', marginBottom: '24px', overflowY: 'auto', maxHeight: '400px', whiteSpace: 'nowrap' }}>
        {[
          { id: 'Directory', label: 'Directory' },
          { id: 'Performance', label: 'Performance Overview' },
          { id: 'ApprovalQueue', label: 'Approval Queue' },
          { id: 'Analytics', label: 'Revenue Analytics' },
          { id: 'Compliance', label: 'Compliance Center' }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => handleTabClick(tab.id)}
            type="button"
            style={{
              background: 'transparent',
              border: 'none',
              borderBottom: activeTab === tab.id ? '2px solid #4f46e5' : '2px solid transparent',
              color: activeTab === tab.id ? '#4f46e5' : 'var(--muted)',
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

      {/* Render sub-view component */}
      {renderContent()}
    </AdminShell>
  );
}


