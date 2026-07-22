import React, { useState } from 'react';
import {
  TrendingUp,
  TrendingDown,
  Zap,
  BarChart3,
  ChevronDown,
  Download,
  AlertTriangle,
  CheckCircle2,
  ArrowRight
} from 'lucide-react';
import AdminShell from '../../components/layouts/AdminShell';
import { useApp } from '../../hooks/useApp';
import { ROUTES } from '../../config/routes';

export default function CostOptimization() {
  const { navigate } = useApp();
  const [timeframe, setTimeframe] = useState('Last Quarter');
  const [materialTab, setMaterialTab] = useState('Top 5');

  const handleExportReport = () => {
    alert('Generating cost optimization PDF report...');
  };

  return (
    <AdminShell
      activeTab="Cost Analysis"
      brandText="Hozify Procurement"
      brandSubText="EXECUTIVE COMMAND"
      searchPlaceholder="Search savings records..."
      customProfileName="Admin User"
      customProfileRole="Procurement Director"
    >
      <div style={{ padding: '24px 0', display: 'flex', flexDirection: 'column', gap: 'var(--spacing-section)' }}>
        
        {/* Header Breadcrumbs / Title Row */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <span style={{ fontSize: '11px', fontWeight: '800', color: '#7a7688', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              Global Overview
            </span>
            <h1 style={{ fontSize: '24px', fontWeight: '800', color: '#1c2536', margin: '4px 0 0 0' }}>
              Cost Optimization Dashboard
            </h1>
            <p style={{ fontSize: '14px', color: '#7a7688', marginTop: '4px', margin: 0 }}>
              Manage and optimize procurement spend across all projects.
            </p>
          </div>
          <div style={{ display: 'flex', gap: '12px' }}>
            <div style={{ position: 'relative' }}>
              <button
                style={{
                  background: '#ffffff',
                  color: '#565365',
                  border: '1px solid #cbd5e1',
                  borderRadius: '6px',
                  padding: '10px 32px 10px 16px',
                  fontSize: '13px',
                  fontWeight: '700',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}
                onClick={() => alert('Change quarter timeframe dropdown...')}
                type="button"
              >
                <span>{timeframe}</span>

              </button>
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
          
          {/* KPI 1: YTD Spend */}
          <div className="panel" style={{ background: '#ffffff', border: '1.5px solid #25108f', borderRadius: '12px', padding: '20px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <div>
              <span style={{ display: 'block', fontSize: '10px', fontWeight: '800', color: '#7a7688', textTransform: 'uppercase' }}>Total Spend (YTD)</span>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '6px' }}>
                <strong style={{ fontSize: '24px', color: '#1c2536', fontWeight: '800' }}>$1,248,390</strong>
                <span style={{ fontSize: '11px', fontWeight: '700', color: '#dc2626', background: '#fef2f2', padding: '2px 6px', borderRadius: '4px' }}>
                  +4.2%
                </span>
              </div>
            </div>
            <div style={{ height: '4px', background: '#f1f5f9', borderRadius: '2px', overflow: 'hidden' }}>
              <div style={{ width: '65%', height: '100%', background: 'var(--primary)', borderRadius: '2px' }} />
            </div>
          </div>

          {/* KPI 2: Budget Efficiency */}
          <div className="panel" style={{ background: '#ffffff', border: '1.5px solid #25108f', borderRadius: '12px', padding: '20px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <div>
              <span style={{ display: 'block', fontSize: '10px', fontWeight: '800', color: '#7a7688', textTransform: 'uppercase' }}>Budget Efficiency</span>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '6px' }}>
                <strong style={{ fontSize: '24px', color: '#1c2536', fontWeight: '800' }}>87.4%</strong>
                <span style={{ fontSize: '11px', fontWeight: '700', color: '#2563eb', background: '#eff6ff', padding: '2px 6px', borderRadius: '4px' }}>
                  92% Target
                </span>
              </div>
            </div>
            <div style={{ height: '4px', background: '#f1f5f9', borderRadius: '2px', overflow: 'hidden' }}>
              <div style={{ width: '87.4%', height: '100%', background: '#7c3aed', borderRadius: '2px' }} />
            </div>
          </div>

          {/* KPI 3: Material Volatility */}
          <div className="panel" style={{ background: '#ffffff', border: '1.5px solid #25108f', borderRadius: '12px', padding: '20px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <div>
              <span style={{ display: 'block', fontSize: '10px', fontWeight: '800', color: '#7a7688', textTransform: 'uppercase' }}>Material Volatility</span>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '6px' }}>
                <strong style={{ fontSize: '24px', color: '#1c2536', fontWeight: '800' }}>Low</strong>
                <span style={{ fontSize: '11px', fontWeight: '700', color: '#7a7688', background: '#f1f5f9', padding: '2px 6px', borderRadius: '4px' }}>
                  Moderate
                </span>
              </div>
            </div>
            {/* Overlapping profile avatars */}
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <div style={{ display: 'flex', marginRight: '4px' }}>
                {[1, 2, 3].map((n) => (
                  <div
                    key={n}
                    style={{
                      width: '18px',
                      height: '18px',
                      borderRadius: '50%',
                      background: '#d7e1ff',
                      border: '1.5px solid #ffffff',
                      marginLeft: n > 1 ? '-6px' : '0',
                      zIndex: 4 - n
                    }}
                  />
                ))}
              </div>
              <span style={{ fontSize: '11.5px', color: '#7a7688', fontWeight: '700' }}>+12</span>
            </div>
          </div>

          {/* KPI 4: Optimization Ops */}
          <div className="panel" style={{ background: '#ffffff', border: '1.5px solid #25108f', borderRadius: '12px', padding: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <span style={{ display: 'block', fontSize: '10px', fontWeight: '800', color: '#7a7688', textTransform: 'uppercase' }}>Optimization Ops</span>
              <strong style={{ display: 'block', fontSize: '24px', color: '#1c2536', fontWeight: '800', marginTop: '6px' }}>$42,500</strong>
              <span style={{ display: 'block', fontSize: '11px', color: '#7c3aed', fontWeight: '700', marginTop: '6px' }}>3 identified opportunities</span>
            </div>
            <div style={{ width: '36px', height: '36px', borderRadius: '8px', background: '#eff6ff', color: '#2563eb', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Zap size={20} />
            </div>
          </div>

        </div>

        {/* Splitting layout: Most Expensive Materials & Supplier Performance Circular Gauge */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr', lgGridTemplateColumns: '2fr 1fr', gap: 'var(--spacing-section)' }}>
          
          {/* Left: Most Expensive Materials */}
          <div className="panel" style={{ background: '#ffffff', border: '1.5px solid #25108f', borderRadius: '12px', padding: 'var(--spacing-section)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '16px' }}>
              <h2 style={{ fontSize: '16px', fontWeight: '800', color: '#1c2536', margin: 0 }}>
                Most Expensive Materials
              </h2>
              <div style={{ display: 'flex', background: '#f1f5f9', padding: '3px', borderRadius: '6px' }}>
                {['Top 5', 'All Materials'].map(tab => (
                  <button
                    key={tab}
                    onClick={() => setMaterialTab(tab)}
                    style={{
                      border: 'none',
                      background: materialTab === tab ? '#ffffff' : 'transparent',
                      color: materialTab === tab ? '#1c2536' : '#7a7688',
                      padding: '5px 12px',
                      borderRadius: '4px',
                      fontSize: '11.5px',
                      fontWeight: '700',
                      cursor: 'pointer',
                      boxShadow: materialTab === tab ? '0 1px 3px rgba(0,0,0,0.06)' : 'none'
                    }}
                    type="button"
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {[
                { name: 'Steel Reinforcement (12mm)', cost: '$482,000', pct: '38%', color: '#1c2536' },
                { name: 'Concrete (High Performance)', cost: '$315,000', pct: '25%', color: 'var(--primary)' },
                { name: 'Electrical Infrastructure Components', cost: '$205,000', pct: '16%', color: '#60a5fa' },
                { name: 'Facade Glass (Triple Glazed)', cost: '$112,000', pct: '9%', color: '#d7e1ff' }
              ].map((item, idx) => (
                <div key={idx}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', marginBottom: '6px' }}>
                    <strong style={{ color: '#1c2536' }}>{item.name}</strong>
                    <span style={{ color: '#565365' }}><strong>{item.cost}</strong> / {item.pct} of spend</span>
                  </div>
                  <div style={{ height: '6px', background: '#f1f5f9', borderRadius: '3px', overflow: 'hidden' }}>
                    <div style={{ width: item.pct, height: '100%', background: item.color, borderRadius: '3px' }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Supplier Performance Gauge */}
          <div className="panel" style={{ background: '#ffffff', border: '1.5px solid #25108f', borderRadius: '12px', padding: 'var(--spacing-section)', display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <h2 style={{ fontSize: '16px', fontWeight: '800', color: '#1c2536', margin: 0 }}>
              Supplier Performance
            </h2>

            {/* Circular Gauge */}
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '150px' }}>
              <div style={{ width: '120px', height: '120px', position: 'relative' }}>
                <svg width="100%" height="100%" viewBox="0 0 36 36">
                  <circle cx="18" cy="18" r="15.915" fill="none" stroke="#f1f5f9" strokeWidth="3.5" />
                  <circle 
                    cx="18" cy="18" r="15.915" 
                    fill="none" 
                    stroke="#25108f" 
                    strokeWidth="3.5" 
                    strokeDasharray="75 25" 
                    strokeDashoffset="25" 
                    strokeLinecap="round"
                  />
                </svg>
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                  <strong style={{ fontSize: '20px', color: '#1c2536', fontWeight: '800' }}>75%</strong>
                  <span style={{ fontSize: '9px', color: '#7a7688', textTransform: 'uppercase', fontWeight: '800', marginTop: '2px' }}>On-Time</span>
                </div>
              </div>
            </div>

            {/* Legend indicators */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', borderTop: '1px solid #f1f5f9', paddingTop: '14px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--primary)' }} />
                  <span style={{ color: '#7a7688' }}>Vendor Reliability</span>
                </div>
                <strong style={{ color: '#1c2536' }}>Top Tier</strong>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#1c2536' }} />
                  <span style={{ color: '#7a7688' }}>Cost Variance</span>
                </div>
                <strong style={{ color: '#dc2626' }}>+2.1%</strong>
              </div>
            </div>

          </div>

        </div>

        {/* Savings Opportunities Identified list */}
        <div className="panel" style={{ background: '#ffffff', border: '1.5px solid #25108f', borderRadius: '12px', padding: 'var(--spacing-section)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <h2 style={{ fontSize: '16px', fontWeight: '800', color: '#1c2536', margin: 0 }}>
              Savings Opportunities Identified
            </h2>
            <button
              onClick={() => alert('View full system cost optimization audits...')}
              style={{ background: 'transparent', border: 'none', color: 'var(--primary)', fontSize: '13px', fontWeight: '700', cursor: 'pointer' }}
              type="button"
            >
              View All Recommendations
            </button>
          </div>

          <div style={{ overflowY: 'auto', maxHeight: '400px' }}>
            <div className="table-responsive-wrapper">
<table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', minWidth: '700px' }}>
              <thead>
                <tr style={{ borderBottom: '1.5px solid #25108f' }}>
                  <th style={{ padding: '12px 8px', fontSize: '11px', fontWeight: '800', color: '#7a7688', textTransform: 'uppercase' }}>Material Category</th>
                  <th style={{ padding: '12px 8px', fontSize: '11px', fontWeight: '800', color: '#7a7688', textTransform: 'uppercase' }}>Status</th>
                  <th style={{ padding: '12px 8px', fontSize: '11px', fontWeight: '800', color: '#7a7688', textTransform: 'uppercase' }}>Est. Savings</th>
                  <th style={{ padding: '12px 8px', fontSize: '11px', fontWeight: '800', color: '#7a7688', textTransform: 'uppercase' }}>Action Required</th>
                  <th style={{ padding: '12px 8px', fontSize: '11px', fontWeight: '800', color: '#7a7688', textTransform: 'uppercase', width: '130px' }}>Confidence</th>
                </tr>
              </thead>
              <tbody>
                {[
                  {
                    cat: 'Reinforcement Bars (Bulk)',
                    status: 'Pending Analysis',
                    statusBg: '#fffbeb',
                    statusColor: '#d97706',
                    savings: '$22,400',
                    action: 'Consolidate Q3 vendor contracts',
                    confidence: 'High',
                    pct: 90,
                    confColor: '#10b981'
                  },
                  {
                    cat: 'HVAC Control Units',
                    status: 'Verified',
                    statusBg: '#ecfdf5',
                    statusColor: '#059669',
                    savings: '$14,800',
                    action: 'Switch to alternative manufacturer',
                    confidence: 'Med',
                    pct: 60,
                    confColor: '#3b82f6'
                  },
                  {
                    cat: 'Low VOC Finishes',
                    status: 'Verified',
                    statusBg: '#ecfdf5',
                    statusColor: '#059669',
                    savings: '$5,300',
                    action: 'Incentivize long-term supply agreement',
                    confidence: 'Low',
                    pct: 25,
                    confColor: '#94a3b8'
                  }
                ].map((row, idx) => (
                  <tr key={idx} style={{ borderBottom: '1px solid #f1f5f9' }}>
                    <td style={{ padding: '16px 8px', fontSize: '13.5px', fontWeight: '700', color: '#1c2536' }}>
                      {row.cat}
                    </td>
                    <td style={{ padding: '16px 8px' }}>
                      <span style={{
                        fontSize: '11px',
                        fontWeight: '800',
                        padding: '3px 8px',
                        borderRadius: '4px',
                        background: row.statusBg,
                        color: row.statusColor
                      }}>
                        {row.status}
                      </span>
                    </td>
                    <td style={{ padding: '16px 8px', fontSize: '13.5px', fontWeight: '800', color: 'var(--primary)' }}>
                      {row.savings}
                    </td>
                    <td style={{ padding: '16px 8px', fontSize: '13px', color: '#565365' }}>
                      {row.action}
                    </td>
                    <td style={{ padding: '16px 8px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '10.5px', color: '#7a7688', marginBottom: '4px' }}>
                        <span>{row.confidence}</span>
                      </div>
                      <div style={{ height: '4.5px', background: '#f1f5f9', borderRadius: '2px', overflow: 'hidden' }}>
                        <div style={{ width: `${row.pct}%`, height: '100%', background: row.confColor, borderRadius: '2px' }} />
                      </div>
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


