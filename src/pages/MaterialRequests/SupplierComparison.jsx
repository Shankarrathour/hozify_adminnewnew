import React, { useState } from 'react';
import {
  Download,
  Star,
  Zap,
  TrendingDown,
  TrendingUp,
  ShieldAlert,
  ShieldCheck,
  CheckCircle2,
  Check,
  X,
  Search,
  ChevronDown,
  FileText,
  AlertTriangle,
  Award,
  MoreVertical
} from 'lucide-react';
import AdminShell from '../../components/layouts/AdminShell';
import { useApp } from '../../hooks/useApp';
import { ROUTES } from '../../config/routes';

import Select from "../../components/ui/Select";

export default function SupplierComparison() {
  const { navigate } = useApp();
  const [volatilityPeriod, setVolatilityPeriod] = useState('Last 12 Months');

  const handleAssignContract = () => {
    alert('Precision Alloys Ltd selected for Q4 Supply Chain contract. Generating contract agreement...');
  };

  const handleExportPDF = () => {
    alert('Downloading Supplier Comparison Matrix PDF Report...');
  };

  const handleApprove = () => {
    alert('Recommendation approved. Contract assignment pending procurement signature.');

  };

  return (
    <AdminShell
      activeTab="Supplier Comparison"
      brandText="Hozify Procurement"
      brandSubText="EXECUTIVE COMMAND"
      searchPlaceholder="Search suppliers, orders..."
      customProfileName="Admin User"
      customProfileRole="Procurement Director"
    >
      <div style={{ padding: '24px 0', display: 'flex', flexDirection: 'column', gap: 'var(--spacing-section)' }}>
        
        {/* Navigation Breadcrumb */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: '#7a7688' }}>
          <span style={{ cursor: 'pointer' }} onClick={() => navigate(ROUTES.materialVendors)}>Suppliers</span>
          <span>&gt;</span>
          <span style={{ fontWeight: '700', color: '#1c2536' }}>Comparisons</span>
        </div>

        {/* Page Title & Actions */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <h1 style={{ fontSize: '24px', fontWeight: '800', color: '#1c2536', margin: 0 }}>
              Supplier Comparison Matrix
            </h1>
            <p style={{ fontSize: '14px', color: '#7a7688', marginTop: '4px', margin: 0 }}>
              Detailed evaluation for Strategic Metal Components — Q4 Supply Chain
            </p>
          </div>
          <div style={{ display: 'flex', gap: '12px' }}>
            <button
              onClick={handleExportPDF}
              style={{
                background: '#ffffff',
                color: '#565365',
                border: '1px solid #cbd5e1',
                borderRadius: '6px',
                padding: '10px 16px',
                fontSize: '13px',
                fontWeight: '700',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}
              type="button"
            >
              <Download size={16} />
              <span>Export PDF</span>
            </button>
            <button
              onClick={handleAssignContract}
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
              <Zap size={16} fill="#ffffff" />
              <span>Assign Contract</span>
            </button>
          </div>
        </div>

        {/* 3 KPI Cards Row */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 'var(--spacing-section)' }}>
          
          {/* KPI 1: Average Price Variance */}
          <div className="panel" style={{ background: '#ffffff', border: '1.5px solid #25108f', borderRadius: '12px', padding: 'var(--spacing-section)', display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '10px', fontWeight: '800', color: '#7a7688', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Critical Metric</span>
              <span style={{ fontSize: '11px', fontWeight: '700', color: '#059669', background: '#ecfdf5', padding: '3px 8px', borderRadius: '4px' }}>+4.2%</span>
            </div>
            <div>
              <span style={{ display: 'block', fontSize: '12px', color: '#565365', fontWeight: '600' }}>Average Price Variance</span>
              <strong style={{ display: 'block', fontSize: '28px', color: '#1c2536', fontWeight: '800', marginTop: '6px' }}>$1,240.00</strong>
            </div>
            <div style={{ height: '5px', background: '#f1f5f9', borderRadius: '2.5px', overflow: 'hidden', marginTop: '4px' }}>
              <div style={{ width: '45%', height: '100%', background: 'var(--primary)', borderRadius: '2.5px' }} />
            </div>
          </div>

          {/* KPI 2: Mean Lead Time */}
          <div className="panel" style={{ background: '#ffffff', border: '1.5px solid #25108f', borderRadius: '12px', padding: 'var(--spacing-section)', display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '10px', fontWeight: '800', color: '#7a7688', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Efficiency Factor</span>
              <span style={{ fontSize: '11px', fontWeight: '700', color: '#dc2626', background: '#fef2f2', padding: '3px 8px', borderRadius: '4px' }}>↑1.5d</span>
            </div>
            <div>
              <span style={{ display: 'block', fontSize: '12px', color: '#565365', fontWeight: '600' }}>Mean Lead Time</span>
              <strong style={{ display: 'block', fontSize: '28px', color: '#1c2536', fontWeight: '800', marginTop: '6px' }}>12.4 Days</strong>
            </div>
            <div style={{ height: '5px', background: '#f1f5f9', borderRadius: '2.5px', overflow: 'hidden', marginTop: '4px' }}>
              <div style={{ width: '65%', height: '100%', background: 'var(--primary)', borderRadius: '2.5px' }} />
            </div>
          </div>

          {/* KPI 3: Reliability Score */}
          <div className="panel" style={{ background: '#ffffff', border: '1.5px solid #25108f', borderRadius: '12px', padding: 'var(--spacing-section)', display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '10px', fontWeight: '800', color: '#7a7688', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Risk Profile</span>
              <span style={{ fontSize: '11px', fontWeight: '700', color: '#059669', background: '#ecfdf5', padding: '3px 8px', borderRadius: '4px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                <ShieldCheck size={12} /> High
              </span>
            </div>
            <div>
              <span style={{ display: 'block', fontSize: '12px', color: '#565365', fontWeight: '600' }}>Reliability Score</span>
              <strong style={{ display: 'block', fontSize: '28px', color: '#1c2536', fontWeight: '800', marginTop: '6px' }}>94.8%</strong>
            </div>
            <div style={{ height: '5px', background: '#f1f5f9', borderRadius: '2.5px', overflow: 'hidden', marginTop: '4px' }}>
              <div style={{ width: '85%', height: '100%', background: 'var(--primary)', borderRadius: '2.5px' }} />
            </div>
          </div>

        </div>

        {/* Evaluation Attribute Matrix Table */}
        <div className="panel" style={{ background: '#ffffff', border: '1.5px solid #25108f', borderRadius: '12px', overflow: 'hidden' }}>
          <div style={{ overflowY: 'auto', maxHeight: '400px' }}>
            <div className="table-responsive-wrapper">
<table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', minWidth: '800px' }}>
              <thead>
                <tr style={{ background: '#f8fafc', borderBottom: '1.5px solid #25108f' }}>
                  <th style={{ padding: '20px 24px', fontSize: '11px', fontWeight: '800', color: 'rgba(255,255,255,0.8)', textTransform: 'uppercase', width: '25%' }}>Evaluation Attribute</th>
                  <th style={{ padding: '20px 24px', width: '25%' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                      <strong style={{ fontSize: '14px', color: '#ffffff' }}>Global Steel Co.</strong>
                      <span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.8)' }}>Tier 1 Partner</span>
                    </div>
                  </th>
                  <th style={{ padding: '20px 24px', width: '25%', background: 'rgba(255,255,255,0.1)', borderLeft: '1px solid rgba(255,255,255,0.2)', borderRight: '1px solid rgba(255,255,255,0.2)' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                        <strong style={{ fontSize: '14px', color: '#ffffff' }}>Precision Alloys Ltd</strong>
                        <span style={{ fontSize: '9px', fontWeight: '800', color: '#ffffff', background: '#7c3aed', padding: '2px 6px', borderRadius: '4px', textTransform: 'uppercase' }}>Winner Recommendation</span>
                      </div>
                      <span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.8)' }}>New Bidder</span>
                    </div>
                  </th>
                  <th style={{ padding: '20px 24px', width: '25%' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                      <strong style={{ fontSize: '14px', color: '#ffffff' }}>Nexus Fabrication</strong>
                      <span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.8)' }}>Legacy Vendor</span>
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody>
                
                {/* Unit Price (Avg) */}
                <tr style={{ borderBottom: '1px solid #f1f5f9' }}>
                  <td style={{ padding: '18px 24px', fontSize: '13px', color: '#565365', fontWeight: '700' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <FileText size={16} style={{ color: '#7a7688' }} />
                      <span>Unit Price (Avg)</span>
                    </div>
                  </td>
                  <td style={{ padding: '18px 24px', fontSize: '14px', color: '#1c2536' }}>$14.50</td>
                  <td style={{ padding: '18px 24px', fontSize: '14px', color: 'var(--primary)', fontWeight: '800', background: '#f5f3ff', borderLeft: '1px solid #e0e7ff', borderRight: '1px solid #e0e7ff' }}>$12.20</td>
                  <td style={{ padding: '18px 24px', fontSize: '14px', color: '#1c2536' }}>$15.75</td>
                </tr>

                {/* Delivery Time */}
                <tr style={{ borderBottom: '1px solid #f1f5f9' }}>
                  <td style={{ padding: '18px 24px', fontSize: '13px', color: '#565365', fontWeight: '700' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <Zap size={16} style={{ color: '#7a7688' }} />
                      <span>Delivery Time</span>
                    </div>
                  </td>
                  <td style={{ padding: '18px 24px', fontSize: '14px', color: '#1c2536' }}>14 Days</td>
                  <td style={{ padding: '18px 24px', fontSize: '14px', color: 'var(--primary)', fontWeight: '800', background: '#f5f3ff', borderLeft: '1px solid #e0e7ff', borderRight: '1px solid #e0e7ff' }}>8 Days</td>
                  <td style={{ padding: '18px 24px', fontSize: '14px', color: '#1c2536' }}>21 Days</td>
                </tr>

                {/* Quality Rating */}
                <tr style={{ borderBottom: '1px solid #f1f5f9' }}>
                  <td style={{ padding: '18px 24px', fontSize: '13px', color: '#565365', fontWeight: '700' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <Star size={16} style={{ color: '#7a7688' }} />
                      <span>Quality Rating</span>
                    </div>
                  </td>
                  <td style={{ padding: '18px 24px' }}>
                    <div style={{ display: 'flex', gap: '2px', color: '#eab308' }}>
                      {[...Array(5)].map((_, i) => <Star key={i} size={14} fill={i < 4 ? '#eab308' : 'none'} stroke={i < 4 ? 'none' : '#cbd5e1'} />)}
                    </div>
                  </td>
                  <td style={{ padding: '18px 24px', background: '#f5f3ff', borderLeft: '1px solid #e0e7ff', borderRight: '1px solid #e0e7ff' }}>
                    <div style={{ display: 'flex', gap: '2px', color: '#eab308' }}>
                      {[...Array(5)].map((_, i) => <Star key={i} size={14} fill="#eab308" stroke="none" />)}
                    </div>
                  </td>
                  <td style={{ padding: '18px 24px' }}>
                    <div style={{ display: 'flex', gap: '2px', color: '#eab308' }}>
                      {[...Array(5)].map((_, i) => <Star key={i} size={14} fill={i < 4 ? '#eab308' : 'none'} stroke={i < 4 ? 'none' : '#cbd5e1'} />)}
                    </div>
                  </td>
                </tr>

                {/* Previous Performance */}
                <tr style={{ borderBottom: '1px solid #f1f5f9' }}>
                  <td style={{ padding: '18px 24px', fontSize: '13px', color: '#565365', fontWeight: '700' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <Award size={16} style={{ color: '#7a7688' }} />
                      <span>Previous Performance</span>
                    </div>
                  </td>
                  <td style={{ padding: '18px 24px' }}>
                    <span style={{ fontSize: '10.5px', fontWeight: '800', color: '#059669', background: '#ecfdf5', padding: '3px 8px', borderRadius: '4px', textTransform: 'uppercase' }}>Reliable</span>
                  </td>
                  <td style={{ padding: '18px 24px', background: '#f5f3ff', borderLeft: '1px solid #e0e7ff', borderRight: '1px solid #e0e7ff' }}>
                    <span style={{ fontSize: '10.5px', fontWeight: '800', color: '#7c3aed', background: '#f5f3ff', padding: '3px 8px', borderRadius: '4px', textTransform: 'uppercase' }}>Optimal</span>
                  </td>
                  <td style={{ padding: '18px 24px' }}>
                    <span style={{ fontSize: '10.5px', fontWeight: '800', color: '#d97706', background: '#fffbeb', padding: '3px 8px', borderRadius: '4px', textTransform: 'uppercase' }}>Inconsistent</span>
                  </td>
                </tr>

                {/* Compliance Certs */}
                <tr style={{ borderBottom: '1px solid #f1f5f9' }}>
                  <td style={{ padding: '18px 24px', fontSize: '13px', color: '#565365', fontWeight: '700' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <ShieldCheck size={16} style={{ color: '#7a7688' }} />
                      <span>Compliance Certs</span>
                    </div>
                  </td>
                  <td style={{ padding: '18px 24px', fontSize: '13px', color: '#565365' }}>ISO 9001, AS9100</td>
                  <td style={{ padding: '18px 24px', fontSize: '13px', color: '#1c2536', fontWeight: '600', background: '#f5f3ff', borderLeft: '1px solid #e0e7ff', borderRight: '1px solid #e0e7ff' }}>ISO 9001, ISO 14001, AS9100D</td>
                  <td style={{ padding: '18px 24px', fontSize: '13px', color: '#565365' }}>ISO 9001</td>
                </tr>

                {/* Logistics Hub */}
                <tr>
                  <td style={{ padding: '18px 24px', fontSize: '13px', color: '#565365', fontWeight: '700' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <AlertTriangle size={16} style={{ color: '#7a7688' }} />
                      <span>Logistics Hub</span>
                    </div>
                  </td>
                  <td style={{ padding: '18px 24px', fontSize: '13px', color: '#565365' }}>Berlin, DE</td>
                  <td style={{ padding: '18px 24px', fontSize: '13px', color: '#1c2536', fontWeight: '600', background: '#f5f3ff', borderLeft: '1px solid #e0e7ff', borderRight: '1px solid #e0e7ff' }}>Stuttgart, DE (Local)</td>
                  <td style={{ padding: '18px 24px', fontSize: '13px', color: '#565365' }}>Warsaw, PL</td>
                </tr>

              </tbody>
            </table>
</div>
          </div>
        </div>

        {/* Smart Procurement Insights Banner */}
        <div className="panel" style={{ background: '#f5f3ff', border: '1px solid #e0e7ff', borderRadius: '12px', padding: 'var(--spacing-section)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '20px' }}>
          <div style={{ display: 'flex', gap: '16px', flex: 1, minWidth: '280px' }}>
            <div style={{ width: '40px', height: '40px', borderRadius: '8px', background: 'var(--primary)', color: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <Zap size={22} fill="#ffffff" />
            </div>
            <div>
              <strong style={{ display: 'block', fontSize: '16px', color: '#1c2536' }}>Smart Procurement Insights</strong>
              <p style={{ fontSize: '13px', color: '#565365', marginTop: '6px', margin: 0, lineHeight: '1.5' }}>
                <strong>Precision Alloys Ltd</strong> is the recommended choice based on a 42% faster lead time and 15% cost reduction compared to current benchmarks. Their proximity to the Stuttgart hub further reduces carbon footprint by an estimated 12.4 tonnes annually.
              </p>
            </div>
          </div>
          <div style={{ display: 'flex', gap: '12px' }}>
            <button
              onClick={handleApprove}
              style={{
                background: 'var(--primary)',
                color: '#ffffff',
                border: 'none',
                borderRadius: '6px',
                padding: '10px 18px',
                fontSize: '13px',
                fontWeight: '700',
                cursor: 'pointer',
                boxShadow: '0 4px 12px rgba(37,16,143,0.15)'
              }}
              type="button"
            >
              Approve Recommendation
            </button>
            <button
              onClick={() => alert('Launching deep audit log view...')}
              style={{
                background: '#ffffff',
                color: '#565365',
                border: '1px solid #cbd5e1',
                borderRadius: '6px',
                padding: '10px 18px',
                fontSize: '13px',
                fontWeight: '700',
                cursor: 'pointer'
              }}
              type="button"
            >
              View Detailed Audit
            </button>
          </div>
        </div>

        {/* Bottom Split Layout: Price Volatility & Supplier Risk */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr', lgGridTemplateColumns: '1fr 1fr', gap: 'var(--spacing-section)' }}>
          
          {/* Price Volatility Card */}
          <div className="panel" style={{ background: '#ffffff', border: '1.5px solid #25108f', borderRadius: '12px', padding: 'var(--spacing-section)', display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3 style={{ fontSize: '16px', fontWeight: '800', color: '#1c2536', margin: 0 }}>
                Price Volatility Index
              </h3>
              <div style={{ position: 'relative' }}>
                <Select
                  value={volatilityPeriod}
                  onChange={(e) => setVolatilityPeriod(e.target.value)}
                  style={{
                    appearance: 'none',
                    background: '#f1f5f9',
                    border: 'none',
                    borderRadius: '6px',
                    padding: '6px 28px 6px 12px',
                    fontSize: '12px',
                    fontWeight: '700',
                    color: '#565365',
                    outline: 'none',
                    cursor: 'pointer'
                  }}
                  aria-label="Volatility timeframe"
                  options={[{
                    label: "Last 12 Months",
                    value: "Last 12 Months"
                  }, {
                    label: "Last 30 Days",
                    value: "Last 30 Days"
                  }]} />

              </div>
            </div>
            
            {/* Custom SVG Bar Chart */}
            <div style={{ height: '140px', width: '100%', position: 'relative', marginTop: '8px' }}>
              <div style={{ display: 'flex', height: '100%', alignItems: 'flex-end', gap: '12px' }}>
                {[30, 48, 42, 60, 15, 36, 50, 25, 45, 55, 38, 48].map((h, idx) => (
                  <div key={idx} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100%' }}>
                    <div
                      style={{
                        width: '100%',
                        height: `${h}%`,
                        background: idx === 6 ? '#25108f' : '#eff0f6',
                        borderRadius: '4px 4px 0 0',
                        marginTop: 'auto',
                        transition: 'background-color 0.2s'
                      }}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Supplier Risk Distribution */}
          <div className="panel" style={{ background: '#ffffff', border: '1.5px solid #25108f', borderRadius: '12px', padding: 'var(--spacing-section)', display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3 style={{ fontSize: '16px', fontWeight: '800', color: '#1c2536', margin: 0 }}>
                Supplier Risk Distribution
              </h3>
              <span style={{ fontSize: '10px', fontWeight: '800', color: '#7a7688', background: '#f1f5f9', padding: '4px 8px', borderRadius: '4px', textTransform: 'uppercase' }}>
                Updated Hourly
              </span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {/* Quality Assurance */}
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12.5px', marginBottom: '6px' }}>
                  <span style={{ color: '#565365', fontWeight: '700' }}>Quality Assurance</span>
                  <strong style={{ color: '#1c2536', fontWeight: '800' }}>98%</strong>
                </div>
                <div style={{ height: '6px', background: '#f1f5f9', borderRadius: '3px', overflow: 'hidden' }}>
                  <div style={{ width: '98%', height: '100%', background: '#10b981', borderRadius: '3px' }} />
                </div>
              </div>

              {/* On-Time Fulfillment */}
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12.5px', marginBottom: '6px' }}>
                  <span style={{ color: '#565365', fontWeight: '700' }}>On-Time Fulfillment</span>
                  <strong style={{ color: '#1c2536', fontWeight: '800' }}>82%</strong>
                </div>
                <div style={{ height: '6px', background: '#f1f5f9', borderRadius: '3px', overflow: 'hidden' }}>
                  <div style={{ width: '82%', height: '100%', background: '#f59e0b', borderRadius: '3px' }} />
                </div>
              </div>

              {/* Financial Stability */}
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12.5px', marginBottom: '6px' }}>
                  <span style={{ color: '#565365', fontWeight: '700' }}>Financial Stability</span>
                  <strong style={{ color: '#1c2536', fontWeight: '800' }}>91%</strong>
                </div>
                <div style={{ height: '6px', background: '#f1f5f9', borderRadius: '3px', overflow: 'hidden' }}>
                  <div style={{ width: '91%', height: '100%', background: 'var(--primary)', borderRadius: '3px' }} />
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>
    </AdminShell>
  );
}


