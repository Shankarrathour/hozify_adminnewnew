import React from 'react';
import AdminShell from '../../components/layouts/AdminShell';

export default function Placeholder({ title, activeTab }) {
  return (
    <AdminShell showGlobalExport={true}
      activeTab={activeTab || title}
      headerTitle={`${title} Console`}
      searchPlaceholder={`Search in ${title.toLowerCase()}...`}
      pageTitle={title}
      pageSubtitle={`Configure, audit, and manage real-time analytics for the ${title.toLowerCase()} service category.`}
    >
      <div className="partners-page-header">
        <div>
          <span className="queue-verification-control-tag font-bold blue-text bg-blue-soft" style={{ padding: '4px 8px', borderRadius: '4px', color: '#1d4ed8', background: '#dbeafe', fontSize: '11px', letterSpacing: '0.5px' }}>
            ENTERPRISE CORE
          </span>
          <h1 className="page-title margin-top-4">{title}</h1>
          <p className="page-subtitle">Configure, audit, and audit real-time analytics for the {title.toLowerCase()} service category.</p>
        </div>
      </div>

      <section className="panel" style={{ padding: '64px 32px', textAlign: 'center', background: '#fff', borderRadius: '8px', border: '1.5px solid #25108f', marginTop: '24px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '16px' }}>
          <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: '#eee9f6', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary)', fontSize: '24px', fontWeight: 'bold' }}>
            {title.charAt(0)}
          </div>
          <h2 style={{ fontSize: '20px', fontWeight: '700', color: 'var(--text)', margin: '0' }}>{title} Dashboard</h2>
          <p style={{ color: 'var(--muted)', fontSize: '14px', maxWidth: '480px', margin: '0 auto 16px', lineHeight: '1.5' }}>
            The operational modules for the **{title}** subsystem are currently being synchronized. Active interfaces and diagnostic logs will be available here.
          </p>
          <div style={{ display: 'flex', gap: '12px' }}>
            <button className="primary-action-btn font-bold" type="button" onClick={() => window.history.back()}>
              Go Back
            </button>
          </div>
        </div>
      </section>
    </AdminShell>
  );
}


