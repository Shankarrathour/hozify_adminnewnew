import React, { useState } from 'react';
import {
  TrendingUp,
  TrendingDown,
  Zap,
  ChevronDown,
  Download,
  Star,
  MoreVertical,
  SlidersHorizontal,
  ArrowRight
} from 'lucide-react';
import AdminShell from '../../components/layouts/AdminShell';
import { useApp } from '../../hooks/useApp';
import { ROUTES } from '../../config/routes';

import Select from "../../components/ui/Select";

export default function MaterialAnalytics() {
  const { navigate } = useApp();
  const [period, setPeriod] = useState('Last 30 Days');

  const handleExportReport = () => {
    alert('Generating Q3 Material Expenditure & Pipeline Performance PDF report...');
  };

  return (
    <AdminShell
      activeTab="Material Analytics"
      brandText="Hozify Procurement"
      brandSubText="EXECUTIVE COMMAND"
      searchPlaceholder="Search analytics..."
      customProfileName="Admin User"
      customProfileRole="Procurement Director"
      headerTabs={
        <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
          <span style={{ fontSize: '13px', fontWeight: '700', color: 'var(--primary)', borderBottom: '2px solid #25108f', paddingBottom: '4px' }}>Analytics</span>
          <span style={{ fontSize: '13px', fontWeight: '600', color: '#565365', cursor: 'pointer' }} onClick={() => navigate(ROUTES.materialVendors)}>Suppliers</span>
          <span style={{ fontSize: '13px', fontWeight: '600', color: '#565365', cursor: 'pointer' }} onClick={() => navigate(ROUTES.materialReports)}>Reports</span>
        </div>
      }
    >
      <div style={{ padding: '24px 0', display: 'flex', flexDirection: 'column', gap: 'var(--spacing-section)' }}>
        
        {/* Title and Action Row */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <h1 style={{ fontSize: '24px', fontWeight: '800', color: '#1c2536', margin: 0 }}>
              Material Analytics
            </h1>
            <p style={{ fontSize: '14px', color: '#7a7688', marginTop: '4px', margin: 0 }}>
              Q3 Material Expenditure & Pipeline Performance
            </p>
          </div>
          <div style={{ display: 'flex', gap: '12px' }}>
            <div style={{ position: 'relative' }}>
              <Select
                value={period}
                onChange={(e) => setPeriod(e.target.value)}
                style={{
                  appearance: 'none',
                  background: '#ffffff',
                  border: '1px solid #cbd5e1',
                  borderRadius: '6px',
                  padding: '10px 32px 10px 16px',
                  fontSize: '13px',
                  fontWeight: '700',
                  color: '#565365',
                  outline: 'none',
                  cursor: 'pointer'
                }}
                aria-label="Analytics timeframe dropdown"
                options={[{
                  label: "Last 30 Days",
                  value: "Last 30 Days"
                }, {
                  label: "Last Quarter",
                  value: "Last Quarter"
                }, {
                  label: "Last Year",
                  value: "Last Year"
                }]} />

            </div>
            <button
              onClick={handleExportReport}
              style={{
                background: 'var(--primary)',
                color: '#ffffff',
                border: 'none',
                borderRadius: '6px',
                padding: '10px 18px',
                fontSize: '13px',
                fontWeight: '700',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                boxShadow: '0 4px 12px rgba(37,16,143,0.15)'
              }}
              type="button"
            >
              <Download size={16} />
              <span>Export Report</span>
            </button>
          </div>
        </div>

        {/* 4 KPIs Row */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px' }}>
          
          {/* KPI 1 */}
          <div className="panel" style={{ background: '#ffffff', border: '1.5px solid #25108f', borderRadius: '12px', padding: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <span style={{ display: 'block', fontSize: '10px', fontWeight: '800', color: '#7a7688', textTransform: 'uppercase' }}>Total Spend</span>
              <strong style={{ display: 'block', fontSize: '24px', color: '#1c2536', fontWeight: '800', marginTop: '6px' }}>$2.4M</strong>
              <span style={{ display: 'block', fontSize: '11px', color: '#059669', fontWeight: '700', marginTop: '4px' }}>+12.4% vs last Q</span>
            </div>
            <div style={{ width: '50px', height: '25px' }}>
              <svg width="50" height="25" viewBox="0 0 50 25">
                <path d="M 0 20 Q 12 5, 25 15 T 50 5" fill="none" stroke="#10b981" strokeWidth="2" />
                <path d="M 0 20 Q 12 5, 25 15 T 50 5 L 50 25 L 0 25 Z" fill="rgba(16,185,129,0.06)" />
              </svg>
            </div>
          </div>

          {/* KPI 2 */}
          <div className="panel" style={{ background: '#ffffff', border: '1.5px solid #25108f', borderRadius: '12px', padding: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <span style={{ display: 'block', fontSize: '10px', fontWeight: '800', color: '#7a7688', textTransform: 'uppercase' }}>Fulfillment Rate</span>
              <strong style={{ display: 'block', fontSize: '24px', color: '#1c2536', fontWeight: '800', marginTop: '6px' }}>94.2%</strong>
              <span style={{ display: 'block', fontSize: '11px', color: '#dc2626', fontWeight: '700', marginTop: '4px' }}>-2.1% logistics delay</span>
            </div>
            <div style={{ width: '50px', height: '25px' }}>
              <svg width="50" height="25" viewBox="0 0 50 25">
                <path d="M 0 5 Q 12 20, 25 10 T 50 20" fill="none" stroke="#dc2626" strokeWidth="2" />
                <path d="M 0 5 Q 12 20, 25 10 T 50 20 L 50 25 L 0 25 Z" fill="rgba(220,38,38,0.06)" />
              </svg>
            </div>
          </div>

          {/* KPI 3 */}
          <div className="panel" style={{ background: '#ffffff', border: '1.5px solid #25108f', borderRadius: '12px', padding: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <span style={{ display: 'block', fontSize: '10px', fontWeight: '800', color: '#7a7688', textTransform: 'uppercase' }}>Active Requests</span>
              <strong style={{ display: 'block', fontSize: '24px', color: '#1c2536', fontWeight: '800', marginTop: '6px' }}>142</strong>
              <span style={{ display: 'block', fontSize: '11px', color: '#059669', fontWeight: '700', marginTop: '4px' }}>+4 new requests today</span>
            </div>
            <div style={{ width: '50px', height: '25px' }}>
              <svg width="50" height="25" viewBox="0 0 50 25">
                <path d="M 0 22 Q 12 10, 25 12 T 50 2" fill="none" stroke="#10b981" strokeWidth="2" />
                <path d="M 0 22 Q 12 10, 25 12 T 50 2 L 50 25 L 0 25 Z" fill="rgba(16,185,129,0.06)" />
              </svg>
            </div>
          </div>

          {/* KPI 4 */}
          <div className="panel" style={{ background: '#ffffff', border: '1.5px solid #25108f', borderRadius: '12px', padding: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <span style={{ display: 'block', fontSize: '10px', fontWeight: '800', color: '#7a7688', textTransform: 'uppercase' }}>Avg Lead Time</span>
              <strong style={{ display: 'block', fontSize: '24px', color: '#1c2536', fontWeight: '800', marginTop: '6px' }}>5.2d</strong>
              <span style={{ display: 'block', fontSize: '11px', color: '#565365', fontWeight: '700', marginTop: '4px' }}>Stable performance</span>
            </div>
            <div style={{ width: '50px', height: '25px' }}>
              <svg width="50" height="25" viewBox="0 0 50 25">
                <line x1="0" y1="12" x2="50" y2="12" stroke="#565365" strokeWidth="2" />
              </svg>
            </div>
          </div>

        </div>

        {/* Funnel & High Demand Splitted Layout */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr', lgGridTemplateColumns: '2fr 1fr', gap: 'var(--spacing-section)' }}>
          
          {/* Left Panel: Procurement Funnel */}
          <div className="panel" style={{ background: '#ffffff', border: '1.5px solid #25108f', borderRadius: '12px', padding: 'var(--spacing-section)', display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div style={{ display: 'flex', justifySelf: 'stretch', justifyContent: 'space-between', alignItems: 'center' }}>
              <h2 style={{ fontSize: '16px', fontWeight: '800', color: '#1c2536', margin: 0 }}>
                Procurement Funnel
              </h2>
              <span style={{ fontSize: '11.5px', color: '#7a7688', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '4px' }}>
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--primary)' }} /> Requests
              </span>
            </div>

            {/* Funnel Visualisation */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', width: '100%', alignItems: 'center', padding: '10px 0' }}>
              
              {/* Step 1 */}
              <div style={{ width: '100%', background: '#f5f3ff', borderLeft: '4px solid #25108f', borderRadius: '6px', padding: '12px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '13px', color: '#1c2536', fontWeight: '700' }}>1. INITIAL REQUESTS</span>
                <strong style={{ fontSize: '14px', color: 'var(--primary)', fontWeight: '800' }}>482 units</strong>
              </div>

              {/* Step 2 */}
              <div style={{ width: '86%', background: '#f5f3ff', borderLeft: '4px solid #7c3aed', borderRadius: '6px', padding: '12px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '13px', color: '#1c2536', fontWeight: '700' }}>2. APPROVED</span>
                <strong style={{ fontSize: '14px', color: '#7c3aed', fontWeight: '800' }}>415 units</strong>
              </div>

              {/* Step 3 */}
              <div style={{ width: '80%', background: '#f5f3ff', borderLeft: '4px solid #60a5fa', borderRadius: '6px', padding: '12px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '13px', color: '#1c2536', fontWeight: '700' }}>3. REPLACEMENT</span>
                <strong style={{ fontSize: '14px', color: '#2563eb', fontWeight: '800' }}>388 units</strong>
              </div>

              {/* Step 4 */}
              <div style={{ width: '75%', background: '#f5f3ff', borderLeft: '4px solid #0f172a', borderRadius: '6px', padding: '12px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '13px', color: '#1c2536', fontWeight: '700' }}>4. DELIVERED & VERIFIED</span>
                <strong style={{ fontSize: '14px', color: '#0f172a', fontWeight: '800' }}>365 units</strong>
              </div>

            </div>

            {/* Bottom Conversion KPIs grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', borderTop: '1px solid #f1f5f9', paddingTop: '20px', textAlign: 'center' }}>
              <div>
                <span style={{ display: 'block', fontSize: '10px', color: '#7a7688', fontWeight: '800', textTransform: 'uppercase' }}>MR-PO Rate</span>
                <strong style={{ display: 'block', fontSize: '18px', color: '#dc2626', fontWeight: '800', marginTop: '4px' }}>24.2%</strong>
              </div>
              <div>
                <span style={{ display: 'block', fontSize: '10px', color: '#7a7688', fontWeight: '800', textTransform: 'uppercase' }}>Avg Process Time</span>
                <strong style={{ display: 'block', fontSize: '18px', color: '#1c2536', fontWeight: '800', marginTop: '4px' }}>3.2 Days</strong>
              </div>
              <div>
                <span style={{ display: 'block', fontSize: '10px', color: '#7a7688', fontWeight: '800', textTransform: 'uppercase' }}>Conversion Rate</span>
                <strong style={{ display: 'block', fontSize: '18px', color: 'var(--primary)', fontWeight: '800', marginTop: '4px' }}>75.8%</strong>
              </div>
            </div>

          </div>

          {/* Right Panel: High-Demand Materials */}
          <div className="panel" style={{ background: '#ffffff', border: '1.5px solid #25108f', borderRadius: '12px', padding: 'var(--spacing-section)', display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <h2 style={{ fontSize: '16px', fontWeight: '800', color: '#1c2536', margin: 0 }}>
              High-Demand Materials
            </h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', flex: 1 }}>
              {[
                { name: 'Reinforced Steel G-40', volume: '2.4k units this month', spend: '$84,200', pct: 85, color: 'var(--primary)' },
                { name: 'Premium Grade Cement', volume: '1.8k units this month', spend: '$42,150', pct: 60, color: '#7c3aed' },
                { name: 'Industrial Wiring 12/2', volume: '4.2k units this month', spend: '$31,000', pct: 45, color: '#3b82f6' },
                { name: 'Weather-Resistant Sealant', volume: '800 units this month', spend: '$18,400', pct: 25, color: '#94a3b8' }
              ].map((item, idx) => (
                <div key={idx} style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', fontSize: '12.5px' }}>
                    <div>
                      <strong style={{ display: 'block', color: '#1c2536' }}>{item.name}</strong>
                      <span style={{ display: 'block', fontSize: '11px', color: '#7a7688', marginTop: '2px' }}>{item.volume}</span>
                    </div>
                    <strong style={{ color: '#1c2536', fontWeight: '800' }}>{item.spend}</strong>
                  </div>
                  <div style={{ height: '5px', background: '#f1f5f9', borderRadius: '2.5px', overflow: 'hidden' }}>
                    <div style={{ width: `${item.pct}%`, height: '100%', background: item.color, borderRadius: '2.5px' }} />
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={() => navigate(ROUTES.materialListing)}
              style={{
                width: '100%',
                background: 'transparent',
                border: 'none',
                color: 'var(--primary)',
                fontSize: '13px',
                fontWeight: '700',
                cursor: 'pointer',
                textAlign: 'center',
                padding: '6px 0',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '6px',
                borderTop: '1px solid #f1f5f9',
                marginTop: '10px'
              }}
              type="button"
            >
              <span>View All Materials</span>
              <ArrowRight size={14} />
            </button>

          </div>

        </div>

        {/* Supplier Fulfillment Matrix Panel */}
        <div className="panel" style={{ background: '#ffffff', border: '1.5px solid #25108f', borderRadius: '12px', padding: 'var(--spacing-section)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <h2 style={{ fontSize: '16px', fontWeight: '800', color: '#1c2536', margin: 0 }}>
              Supplier Fulfillment Matrix
            </h2>
            <button
              onClick={() => alert('Launching supplier algorithm configurations...')}
              style={{ background: 'transparent', border: 'none', color: 'var(--primary)', cursor: 'pointer' }}
              aria-label="Fulfillment controls"
              type="button"
            >
              <SlidersHorizontal size={18} />
            </button>
          </div>

          <div style={{ overflowY: 'auto', maxHeight: '400px' }}>
            <div className="table-responsive-wrapper">
<table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', minWidth: '700px' }}>
              <thead>
                <tr style={{ borderBottom: '1.5px solid #25108f' }}>
                  <th style={{ padding: '12px 8px', fontSize: '11px', fontWeight: '800', color: '#7a7688', textTransform: 'uppercase' }}>Supplier</th>
                  <th style={{ padding: '12px 8px', fontSize: '11px', fontWeight: '800', color: '#7a7688', textTransform: 'uppercase', width: '200px' }}>Fulfillment Rate</th>
                  <th style={{ padding: '12px 8px', fontSize: '11px', fontWeight: '800', color: '#7a7688', textTransform: 'uppercase' }}>Quality Score</th>
                  <th style={{ padding: '12px 8px', fontSize: '11px', fontWeight: '800', color: '#7a7688', textTransform: 'uppercase' }}>Avg Lead Time</th>
                  <th style={{ padding: '12px 8px', fontSize: '11px', fontWeight: '800', color: '#7a7688', textTransform: 'uppercase' }}>Active MRs</th>
                  <th style={{ padding: '12px 8px', width: '40px' }} />
                </tr>
              </thead>
              <tbody>
                {[
                  { name: 'Apex Solutions', tag: 'Steel & Metals', rate: '98.5%', pct: 98.5, rateColor: '#10b981', stars: 5, time: '3.5 Days', active: '12 Active' },
                  { name: 'Global Concrete', tag: 'Raw Materials', rate: '82.1%', pct: 82.1, rateColor: '#f59e0b', stars: 4, time: '8.2 Days', active: '5 Active' },
                  { name: 'Titan Electrical', tag: 'Electrical Components', rate: '94.8%', pct: 94.8, rateColor: '#10b981', stars: 5, time: '4.1 Days', active: '28 Active' }
                ].map((row, idx) => (
                  <tr key={idx} style={{ borderBottom: '1px solid #f1f5f9' }}>
                    <td style={{ padding: '16px 8px' }}>
                      <div>
                        <strong style={{ display: 'block', fontSize: '13.5px', color: '#1c2536' }}>{row.name}</strong>
                        <span style={{ display: 'block', fontSize: '11.5px', color: '#7a7688', marginTop: '2px' }}>{row.tag}</span>
                      </div>
                    </td>
                    <td style={{ padding: '16px 8px' }}>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                        <span style={{ fontSize: '12.5px', color: '#1c2536', fontWeight: '700' }}>{row.rate}</span>
                        <div style={{ height: '4.5px', background: '#f1f5f9', borderRadius: '2px', overflow: 'hidden' }}>
                          <div style={{ width: `${row.pct}%`, height: '100%', background: row.rateColor, borderRadius: '2px' }} />
                        </div>
                      </div>
                    </td>
                    <td style={{ padding: '16px 8px' }}>
                      <div style={{ display: 'flex', gap: '2px', color: '#eab308' }}>
                        {[...Array(5)].map((_, i) => (
                          <Star 
                            key={i} 
                            size={14} 
                            fill={i < row.stars ? '#eab308' : 'none'} 
                            stroke={i < row.stars ? 'none' : '#cbd5e1'}
                          />
                        ))}
                      </div>
                    </td>
                    <td style={{ padding: '16px 8px', fontSize: '13px', color: '#565365', fontWeight: '600' }}>
                      {row.time}
                    </td>
                    <td style={{ padding: '16px 8px' }}>
                      <span style={{ fontSize: '11px', fontWeight: '800', background: '#eff6ff', color: '#2563eb', padding: '3px 8px', borderRadius: '4px' }}>
                        {row.active}
                      </span>
                    </td>
                    <td style={{ padding: '16px 8px', textAlign: 'center' }}>
                      <button
                        onClick={() => alert(`Launching profile analysis for supplier: ${row.name}`)}
                        style={{ background: 'transparent', border: 'none', color: '#cbd5e1', cursor: 'pointer', padding: '4px' }}
                        aria-label={`Options for ${row.name}`}
                        type="button"
                      >
                        <MoreVertical size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
</div>
          </div>
        </div>

        {/* Footer info line */}
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '12px', color: '#7a7688', borderTop: '1.5px solid #25108f', paddingTop: '20px', marginTop: '12px' }}>
          <span>© 2024 Hozify Procurement Systems. All data encrypted and verified.</span>
        </div>

      </div>
    </AdminShell>
  );
}


