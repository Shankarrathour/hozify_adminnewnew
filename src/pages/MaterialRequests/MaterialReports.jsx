import React, { useState } from 'react';
import {
  Download,
  SlidersHorizontal,
  ChevronDown,
  TrendingUp,
  TrendingDown,
  Filter,
  FileText,
  Clock,
  Plus,
  BookOpen,
  Share2,
  CalendarCheck,
  Check,
  X
} from 'lucide-react';
import AdminShell from '../../components/layouts/AdminShell';
import { useApp } from '../../hooks/useApp';
import { ROUTES } from '../../config/routes';

import Select from "../../components/ui/Select";

export default function MaterialReports() {
  const { navigate } = useApp();
  const [branch, setBranch] = useState('All Regional Hubs');
  const [period, setPeriod] = useState('Last 30 Days');

  const handleGenerateReport = (repName) => {
    alert(`Initiating generation for: ${repName}...`);
  };

  const handleDownloadFile = (fileName) => {
    alert(`Downloading requested file: ${fileName}...`);
  };

  const handleScheduleNew = () => {
    alert('Opening report schedule configurator...');
  };

  const handleFilterClick = () => {
    alert(`Filtering reports registry for Hub: ${branch} and Period: ${period}...`);
  };

  return (
    <AdminShell
      activeTab="Material Reports"
      brandText="Hozify Procurement"
      brandSubText="EXECUTIVE COMMAND"
      searchPlaceholder="Global search..."
      customProfileName="Admin User"
      customProfileRole="Procurement Director"
      headerTabs={
        <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
          <span style={{ fontSize: '13px', fontWeight: '600', color: '#565365', cursor: 'pointer' }} onClick={() => navigate(ROUTES.materialAnalytics)}>Analytics</span>
          <span style={{ fontSize: '13px', fontWeight: '600', color: '#565365', cursor: 'pointer' }} onClick={() => navigate(ROUTES.materialVendors)}>Suppliers</span>
          <span style={{ fontSize: '13px', fontWeight: '700', color: 'var(--primary)', borderBottom: '2px solid #25108f', paddingBottom: '4px' }}>Reports</span>
        </div>
      }
    >
      <div style={{ padding: '24px 0', display: 'flex', flexDirection: 'column', gap: 'var(--spacing-section)' }}>
        
        {/* Page Title & Filter Row */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <h1 style={{ fontSize: '24px', fontWeight: '800', color: '#1c2536', margin: 0 }}>
              Material Reports
            </h1>
            <p style={{ fontSize: '14px', color: '#7a7688', marginTop: '4px', margin: 0 }}>
              Generate and export multi-branch usage summaries and financial audits.
            </p>
          </div>
          
          {/* Controls */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <span style={{ fontSize: '10px', fontWeight: '800', color: '#7a7688', textTransform: 'uppercase' }}>Branch Selection</span>
              <div style={{ position: 'relative' }}>
                <Select
                  value={branch}
                  onChange={(e) => setBranch(e.target.value)}
                  style={{
                    appearance: 'none',
                    background: '#ffffff',
                    border: '1px solid #cbd5e1',
                    borderRadius: '6px',
                    padding: '8px 32px 8px 12px',
                    fontSize: '12.5px',
                    fontWeight: '700',
                    color: '#1c2536',
                    outline: 'none',
                    cursor: 'pointer',
                    minWidth: '160px'
                  }}
                  aria-label="Branch selection filter"
                  options={[{
                    label: "All Regional Hubs",
                    value: "All Regional Hubs"
                  }, {
                    label: "North Hub",
                    value: "North Hub"
                  }, {
                    label: "South Hub",
                    value: "South Hub"
                  }]} />

              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <span style={{ fontSize: '10px', fontWeight: '800', color: '#7a7688', textTransform: 'uppercase' }}>Reporting Period</span>
              <div style={{ position: 'relative' }}>
                <Select
                  value={period}
                  onChange={(e) => setPeriod(e.target.value)}
                  style={{
                    appearance: 'none',
                    background: '#ffffff',
                    border: '1px solid #cbd5e1',
                    borderRadius: '6px',
                    padding: '8px 32px 8px 12px',
                    fontSize: '12.5px',
                    fontWeight: '700',
                    color: '#1c2536',
                    outline: 'none',
                    cursor: 'pointer',
                    minWidth: '130px'
                  }}
                  aria-label="Reporting period timeframe"
                  options={[{
                    label: "Last 30 Days",
                    value: "Last 30 Days"
                  }, {
                    label: "Last 90 Days",
                    value: "Last 90 Days"
                  }]} />

              </div>
            </div>

            <button
              onClick={handleFilterClick}
              style={{
                alignSelf: 'flex-end',
                background: '#eff6ff',
                color: '#2563eb',
                border: 'none',
                borderRadius: '6px',
                padding: '9px 16px',
                fontSize: '12.5px',
                fontWeight: '700',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                height: '35px'
              }}
              type="button"
            >
              <SlidersHorizontal size={14} />
              <span>Filter</span>
            </button>
          </div>
        </div>

        {/* 4 KPIs Row */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px' }}>
          
          {/* Spend KPI */}
          <div className="panel" style={{ background: '#ffffff', border: '1.5px solid #25108f', borderRadius: '12px', padding: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <span style={{ display: 'block', fontSize: '10px', fontWeight: '800', color: '#7a7688', textTransform: 'uppercase' }}>Total Spend</span>
              <strong style={{ display: 'block', fontSize: '24px', color: '#1c2536', fontWeight: '800', marginTop: '6px' }}>$412.5k</strong>
              <span style={{ display: 'block', fontSize: '11px', color: '#059669', fontWeight: '700', marginTop: '4px' }}>↑ 12% vs last month</span>
            </div>
            {/* Sparkline mini-graph */}
            <div style={{ width: '60px', height: '30px' }}>
              <svg width="60" height="30" viewBox="0 0 60 30">
                <path d="M 0 25 Q 15 10, 30 20 T 60 5" fill="none" stroke="#10b981" strokeWidth="2" />
                <path d="M 0 25 Q 15 10, 30 20 T 60 5 L 60 30 L 0 30 Z" fill="rgba(16,185,129,0.08)" />
              </svg>
            </div>
          </div>

          {/* Accuracy KPI */}
          <div className="panel" style={{ background: '#ffffff', border: '1.5px solid #25108f', borderRadius: '12px', padding: '20px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <div>
              <span style={{ display: 'block', fontSize: '10px', fontWeight: '800', color: '#7a7688', textTransform: 'uppercase' }}>Inventory Accuracy</span>
              <strong style={{ display: 'block', fontSize: '24px', color: '#1c2536', fontWeight: '800', marginTop: '6px' }}>98.2%</strong>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '4px', fontSize: '11px', color: '#7a7688' }}>
                <span>Goal: 95.0%</span>
                <span style={{ fontWeight: '700', color: '#565365' }}>0% var</span>
              </div>
            </div>
          </div>

          {/* Stock Turnover KPI */}
          <div className="panel" style={{ background: '#ffffff', border: '1.5px solid #25108f', borderRadius: '12px', padding: '20px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <div>
              <span style={{ display: 'block', fontSize: '10px', fontWeight: '800', color: '#7a7688', textTransform: 'uppercase' }}>Stock Turnover</span>
              <strong style={{ display: 'block', fontSize: '24px', color: '#1c2536', fontWeight: '800', marginTop: '6px' }}>4.2x</strong>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '4px', fontSize: '11px', color: '#7a7688' }}>
                <span style={{ color: '#dc2626', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '2px' }}>↓ 4%</span>
                <span>Average monthly velocity</span>
              </div>
            </div>
          </div>

          {/* Active Supplier KPI */}
          <div className="panel" style={{ background: '#ffffff', border: '1.5px solid #25108f', borderRadius: '12px', padding: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <span style={{ display: 'block', fontSize: '10px', fontWeight: '800', color: '#7a7688', textTransform: 'uppercase' }}>Active Suppliers</span>
              <strong style={{ display: 'block', fontSize: '24px', color: '#1c2536', fontWeight: '800', marginTop: '6px' }}>142</strong>
              <span style={{ display: 'block', fontSize: '11px', color: '#059669', fontWeight: '700', marginTop: '4px' }}>+3 new strategic</span>
            </div>
            {/* Overlapping Avatars */}
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <div style={{ display: 'flex' }}>
                <div style={{ width: '22px', height: '22px', borderRadius: '50%', background: '#b2c5ff', border: '1.5px solid #ffffff', zIndex: 3 }} />
                <div style={{ width: '22px', height: '22px', borderRadius: '50%', background: '#d7e1ff', border: '1.5px solid #ffffff', marginLeft: '-8px', zIndex: 2 }} />
                <div style={{ width: '22px', height: '22px', borderRadius: '50%', background: '#c8ffe1', border: '1.5px solid #ffffff', marginLeft: '-8px', zIndex: 1 }} />
              </div>
              <span style={{ fontSize: '11px', color: '#7a7688', fontWeight: '700', marginLeft: '4px' }}>+139</span>
            </div>
          </div>

        </div>

        {/* Available Reports & Recent Exports Columns */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr', lgGridTemplateColumns: '2fr 1.2fr', gap: 'var(--spacing-section)' }}>
          
          {/* Left Column: Available Reports */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <h2 style={{ fontSize: '16px', fontWeight: '800', color: '#1c2536', margin: 0 }}>
              Available Reports
            </h2>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '20px' }}>
              
              {/* Report 1: Material Usage Audit */}
              <div className="panel" style={{ background: '#ffffff', border: '1.5px solid #25108f', borderRadius: '12px', padding: '20px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <div style={{ width: '36px', height: '36px', borderRadius: '8px', background: '#eff6ff', color: '#2563eb', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <FileText size={18} />
                </div>
                <div>
                  <strong style={{ display: 'block', fontSize: '14px', color: '#1c2536' }}>Material Usage Audit</strong>
                  <p style={{ fontSize: '11.5px', color: '#7a7688', marginTop: '6px', margin: 0, lineHeight: '1.4' }}>
                    Detailed breakdown of consumption by department and project code.
                  </p>
                </div>
                <div style={{ display: 'flex', gap: '8px', marginTop: 'auto' }}>
                  <button onClick={() => handleGenerateReport('Material Usage (PDF)')} style={{ flex: 1, background: '#f8fafc', border: '1px solid #cbd5e1', borderRadius: '6px', padding: '6px 0', fontSize: '11.5px', fontWeight: '700', color: '#565365', cursor: 'pointer' }} type="button">PDF</button>
                  <button onClick={() => handleGenerateReport('Material Usage (Excel)')} style={{ flex: 1, background: '#f8fafc', border: '1px solid #cbd5e1', borderRadius: '6px', padding: '6px 0', fontSize: '11.5px', fontWeight: '700', color: '#565365', cursor: 'pointer' }} type="button">Excel</button>
                  <button onClick={() => handleGenerateReport('Material Usage (CSV)')} style={{ flex: 1, background: '#f8fafc', border: '1px solid #cbd5e1', borderRadius: '6px', padding: '6px 0', fontSize: '11.5px', fontWeight: '700', color: '#565365', cursor: 'pointer' }} type="button">CSV</button>
                </div>
              </div>

              {/* Report 2: Procurement Cost Analysis */}
              <div className="panel" style={{ background: '#ffffff', border: '1.5px solid #25108f', borderRadius: '12px', padding: '20px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <div style={{ width: '36px', height: '36px', borderRadius: '8px', background: '#f5f3ff', color: '#7c3aed', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <BookOpen size={18} />
                </div>
                <div>
                  <strong style={{ display: 'block', fontSize: '14px', color: '#1c2536' }}>Procurement Cost Analysis</strong>
                  <p style={{ fontSize: '11.5px', color: '#7a7688', marginTop: '6px', margin: 0, lineHeight: '1.4' }}>
                    Comprehensive spend analysis comparing actual vs budgeted costs.
                  </p>
                </div>
                <div style={{ display: 'flex', gap: '8px', marginTop: 'auto' }}>
                  <button onClick={() => handleGenerateReport('Cost Analysis (PDF)')} style={{ flex: 1, background: '#f8fafc', border: '1px solid #cbd5e1', borderRadius: '6px', padding: '6px 0', fontSize: '11.5px', fontWeight: '700', color: '#565365', cursor: 'pointer' }} type="button">PDF</button>
                  <button onClick={() => handleGenerateReport('Cost Analysis (Excel)')} style={{ flex: 1, background: '#f8fafc', border: '1px solid #cbd5e1', borderRadius: '6px', padding: '6px 0', fontSize: '11.5px', fontWeight: '700', color: '#565365', cursor: 'pointer' }} type="button">Excel</button>
                </div>
              </div>

              {/* Report 3: Inventory Valuation */}
              <div className="panel" style={{ background: '#ffffff', border: '1.5px solid #25108f', borderRadius: '12px', padding: '20px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <div style={{ width: '36px', height: '36px', borderRadius: '8px', background: '#ecfdf5', color: '#059669', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Share2 size={18} />
                </div>
                <div>
                  <strong style={{ display: 'block', fontSize: '14px', color: '#1c2536' }}>Inventory Valuation</strong>
                  <p style={{ fontSize: '11.5px', color: '#7a7688', marginTop: '6px', margin: 0, lineHeight: '1.4' }}>
                    Real-time valuation of all stock items based on FIFO/LIFO models.
                  </p>
                </div>
                <button
                  onClick={() => handleGenerateReport('Inventory Valuation')}
                  style={{
                    width: '100%',
                    background: 'var(--primary)',
                    color: '#ffffff',
                    border: 'none',
                    borderRadius: '6px',
                    padding: '8px 0',
                    fontSize: '12px',
                    fontWeight: '700',
                    cursor: 'pointer',
                    marginTop: 'auto',
                    boxShadow: '0 4px 10px rgba(37,16,143,0.1)'
                  }}
                  type="button"
                >
                  Generate All
                </button>
              </div>

              {/* Report 4: Supplier Performance */}
              <div className="panel" style={{ background: '#ffffff', border: '1.5px solid #25108f', borderRadius: '12px', padding: '20px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <div style={{ width: '36px', height: '36px', borderRadius: '8px', background: '#fef2f2', color: '#dc2626', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <CalendarCheck size={18} />
                </div>
                <div>
                  <strong style={{ display: 'block', fontSize: '14px', color: '#1c2536' }}>Supplier Performance</strong>
                  <p style={{ fontSize: '11.5px', color: '#7a7688', marginTop: '6px', margin: 0, lineHeight: '1.4' }}>
                    Rating of lead times, quality adherence, and pricing consistency.
                  </p>
                </div>
                <div style={{ display: 'flex', gap: '8px', marginTop: 'auto' }}>
                  <button onClick={() => handleGenerateReport('Supplier Performance (Excel)')} style={{ flex: 1, background: '#f8fafc', border: '1px solid #cbd5e1', borderRadius: '6px', padding: '6px 0', fontSize: '11.5px', fontWeight: '700', color: '#565365', cursor: 'pointer' }} type="button">Excel</button>
                  <button onClick={() => handleGenerateReport('Supplier Performance (CSV)')} style={{ flex: 1, background: '#f8fafc', border: '1px solid #cbd5e1', borderRadius: '6px', padding: '6px 0', fontSize: '11.5px', fontWeight: '700', color: '#565365', cursor: 'pointer' }} type="button">CSV</button>
                </div>
              </div>

            </div>
          </div>

          {/* Right Column: Recent Exports */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <h2 style={{ fontSize: '16px', fontWeight: '800', color: '#1c2536', margin: 0 }}>
              Recent Exports
            </h2>
            
            <div className="panel" style={{ background: '#ffffff', border: '1.5px solid #25108f', borderRadius: '12px', padding: '20px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
              
              {[
                { name: 'Usage_Q2_North.xlsx', meta: 'YESTERDAY • 4.2 MB' },
                { name: 'Audit_Final_2023.pdf', meta: '2 DAYS AGO • 12.8 MB' },
                { name: 'Stock_Movement.csv', meta: '3 DAYS AGO • 840 KB' }
              ].map((file, idx) => (
                <div key={idx} style={{ display: 'flex', justifySelf: 'stretch', justifyContent: 'space-between', alignItems: 'center', paddingBottom: idx < 2 ? '14px' : '0', borderBottom: idx < 2 ? '1px solid #f1f5f9' : 'none' }}>
                  <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                    <div style={{ width: '30px', height: '30px', borderRadius: '6px', background: '#f8fafc', color: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <FileText size={15} />
                    </div>
                    <div>
                      <strong style={{ display: 'block', fontSize: '12.5px', color: '#1c2536' }}>{file.name}</strong>
                      <span style={{ display: 'block', fontSize: '10px', color: '#7a7688', marginTop: '2px' }}>{file.meta}</span>
                    </div>
                  </div>
                  <button
                    onClick={() => handleDownloadFile(file.name)}
                    style={{ background: 'transparent', border: 'none', color: '#7a7688', cursor: 'pointer', padding: '4px' }}
                    aria-label={`Download ${file.name}`}
                    type="button"
                  >
                    <Download size={16} />
                  </button>
                </div>
              ))}

              <button
                onClick={() => alert('Launching complete exports history audit log...')}
                style={{
                  width: '100%',
                  background: 'transparent',
                  border: '1px solid #cbd5e1',
                  borderRadius: '6px',
                  padding: '8px 0',
                  fontSize: '12.5px',
                  fontWeight: '700',
                  color: '#565365',
                  cursor: 'pointer',
                  marginTop: '10px'
                }}
                type="button"
              >
                View History
              </button>

            </div>

            {/* Custom Reports banner */}
            <div style={{ background: '#f5f3ff', border: '1px solid #e0e7ff', borderRadius: '12px', padding: '16px', borderLeft: '3px solid #7c3aed' }}>
              <span style={{ display: 'block', fontSize: '10.5px', color: '#7c3aed', fontWeight: '800', textTransform: 'uppercase' }}>Custom Reports</span>
              <p style={{ fontSize: '11.5px', color: '#565365', margin: '4px 0 0 0', lineHeight: '1.4' }}>
                Need a specific data schema? You can request a custom API export or schema definition from the settings panel.
              </p>
            </div>

          </div>

        </div>

        {/* Scheduled Deliveries Panel */}
        <div className="panel" style={{ background: '#ffffff', border: '1.5px solid #25108f', borderRadius: '12px', padding: 'var(--spacing-section)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <h2 style={{ fontSize: '16px', fontWeight: '800', color: '#1c2536', margin: 0 }}>
              Scheduled Reports
            </h2>
            <button
              onClick={handleScheduleNew}
              style={{
                background: 'transparent',
                border: 'none',
                color: 'var(--primary)',
                fontSize: '13px',
                fontWeight: '700',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '4px'
              }}
              type="button"
            >
              <Plus size={16} />
              <span>Schedule New</span>
            </button>
          </div>

          <div style={{ overflowX: 'auto' }}>
            <div className="table-responsive-wrapper">
<table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', minWidth: '700px' }}>
              <thead>
                <tr style={{ borderBottom: '1.5px solid #25108f' }}>
                  <th style={{ padding: '12px 8px', fontSize: '11px', fontWeight: '800', color: '#7a7688', textTransform: 'uppercase' }}>Report Name</th>
                  <th style={{ padding: '12px 8px', fontSize: '11px', fontWeight: '800', color: '#7a7688', textTransform: 'uppercase' }}>Frequency</th>
                  <th style={{ padding: '12px 8px', fontSize: '11px', fontWeight: '800', color: '#7a7688', textTransform: 'uppercase', textAlign: 'center' }}>Recipients</th>
                  <th style={{ padding: '12px 8px', fontSize: '11px', fontWeight: '800', color: '#7a7688', textTransform: 'uppercase' }}>Next Run</th>
                  <th style={{ padding: '12px 8px', fontSize: '11px', fontWeight: '800', color: '#7a7688', textTransform: 'uppercase' }}>Status</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { name: 'Monthly Financial Summary', freq: 'Monthly (1st)', initials: ['JD', 'AK'], next: 'Nov 01, 2024', status: 'ACTIVE', statusBg: '#ecfdf5', statusColor: '#059669' },
                  { name: 'Weekly Stock Movement', freq: 'Every Monday', initials: ['PM'], next: 'Oct 28, 2024', status: 'ACTIVE', statusBg: '#ecfdf5', statusColor: '#059669' },
                  { name: 'Daily Shortage Alert', freq: 'Daily (08:00)', initials: ['Procurement Team'], next: 'Oct 26, 2024', status: 'PAUSED', statusBg: '#f1f5f9', statusColor: '#565365' }
                ].map((row, idx) => (
                  <tr key={idx} style={{ borderBottom: '1px solid #f1f5f9' }}>
                    <td style={{ padding: '16px 8px', fontSize: '13.5px', fontWeight: '700', color: '#1c2536' }}>
                      {row.name}
                    </td>
                    <td style={{ padding: '16px 8px', fontSize: '13px', color: '#565365' }}>
                      {row.freq}
                    </td>
                    <td style={{ padding: '16px 8px', textAlign: 'center' }}>
                      <div style={{ display: 'inline-flex', alignItems: 'center', justifySelf: 'center', justifyContent: 'center' }}>
                        {row.initials.length === 1 && row.initials[0].length > 2 ? (
                          <span style={{ fontSize: '12px', color: '#7a7688', fontWeight: '600' }}>{row.initials[0]}</span>
                        ) : (
                          row.initials.map((init, i) => (
                            <div
                              key={i}
                              style={{
                                width: '22px',
                                height: '22px',
                                borderRadius: '50%',
                                background: i % 2 === 0 ? '#cbd5e1' : '#b2c5ff',
                                color: i % 2 === 0 ? '#1c2536' : '#25108f',
                                border: '1.5px solid #ffffff',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: '9px',
                                fontWeight: '800',
                                marginLeft: i > 0 ? '-6px' : '0',
                                zIndex: 10 - i
                              }}
                            >
                              {init}
                            </div>
                          ))
                        )}
                      </div>
                    </td>
                    <td style={{ padding: '16px 8px', fontSize: '13px', color: '#565365' }}>
                      {row.next}
                    </td>
                    <td style={{ padding: '16px 8px' }}>
                      <span style={{
                        fontSize: '10.5px',
                        fontWeight: '800',
                        padding: '3px 8px',
                        borderRadius: '4px',
                        background: row.statusBg,
                        color: row.statusColor
                      }}>
                        {row.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
</div>
          </div>
        </div>

      </div>
    </AdminShell>
  );
}


