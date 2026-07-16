import React from 'react';
import { useApp } from '../../hooks/useApp';
import { ROUTES } from '../../config/routes';

export default function BusinessHeaderTabs({ activeTab }) {
  const { navigate } = useApp();

  const tabs = [
    { label: 'Directory', route: ROUTES.business },
    { label: 'Compliance', route: ROUTES.businessApproval },
    { label: 'Risk Management', route: ROUTES.businessRisk },
    { label: 'Taxonomy', route: ROUTES.businessTaxonomy }
  ];

  return (
    <div style={{ display: 'flex', gap: '8px', background: 'rgba(255, 255, 255, 0.15)', padding: '4px', borderRadius: '8px', fontSize: '13px', fontWeight: '600', overflowX: 'auto', maxWidth: '100%' }}>
      {tabs.map((tab) => {
        const isActive = activeTab === tab.label;
        return (
          <button
            key={tab.label}
            onClick={() => tab.route !== '#' && navigate(tab.route)}
            style={{
              border: 'none',
              padding: '6px 14px',
              background: isActive ? '#ffffff' : 'transparent',
              color: isActive ? '#1e3a8a' : '#f1f5f9',
              borderRadius: '6px',
              boxShadow: isActive ? '0 2px 4px rgba(0,0,0,0.1)' : 'none',
              cursor: tab.route !== '#' ? 'pointer' : 'default',
              outline: 'none',
              transition: 'all 0.2s ease',
              fontWeight: isActive ? '700' : '500',
              flexShrink: 0,
              whiteSpace: 'nowrap'
            }}
            type="button"
          >
            {tab.label}
          </button>
        );
      })}
    </div>
  );
}
