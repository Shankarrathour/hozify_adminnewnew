import toast from 'react-hot-toast';
import React, { useState } from 'react';
import { 
  TrendingUp, 
  TrendingDown, 
  Sparkles, 
  Download, 
  Sliders, 
  ChevronDown, 
  Rocket, 
  Repeat, 
  MessageSquare, 
  ChevronRight 
} from 'lucide-react';
import { useDateFilter } from '../../contexts/DateFilterContext';
import DateFilter from '../../components/common/DateFilter';
import SkeletonLoader from '../../components/common/SkeletonLoader';
import EmptyState from '../../components/common/EmptyState';
import AdminShell from '../../components/layouts/AdminShell';

export default function ConversionAnalytics({ activeTab = 'Dashboard' }) {
  const { preset, isFiltering, hasData } = useDateFilter();

  return (
    <AdminShell
      activeTab={activeTab}
      brandText="HOZIFY"
      brandSubText="Enterprise SaaS"
      headerTitle="Conversion Analytics"
      searchPlaceholder="Global revenue search..."
      customProfileName="Alex Sterling"
      customProfileRole="Chief Revenue Officer"
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-section)', padding: '24px 0', position: 'relative' }}>
        
        {/* Page Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px', position: 'relative', zIndex: 100 }}>
          <div>
            <h1 style={{ fontSize: '24px', fontWeight: '800', color: 'var(--text)', margin: 0 }}>
              Conversion Analytics
            </h1>
            <p style={{ fontSize: '13px', color: 'var(--muted)', margin: '4px 0 0' }}>
              Real-time revenue performance and campaign conversion funnel.
            </p>
          </div>

          <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
            <DateFilter />
          </div>
        </div>

        {isFiltering ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-section)' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
              <SkeletonLoader height="100px" />
              <SkeletonLoader height="100px" />
              <SkeletonLoader height="100px" />
              <SkeletonLoader height="100px" />
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 'var(--spacing-section)' }}>
              <SkeletonLoader height="300px" />
              <SkeletonLoader height="300px" />
            </div>
            <SkeletonLoader height="250px" />
          </div>
        ) : !hasData ? (
          <EmptyState />
        ) : (
          <>
        {/* KPI Row */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
          
          {/* Card 1: Total Reached */}
          <div className="panel" style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <span style={{ fontSize: '10px', fontWeight: '800', color: 'var(--muted)', textTransform: 'uppercase' }}>Total Reached</span>
            <strong style={{ fontSize: '24px', fontWeight: '800', color: 'var(--text)' }}>1,284,500</strong>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '11px', fontWeight: '750', color: 'var(--green)', display: 'inline-flex', alignItems: 'center', gap: '2px' }}>
                <TrendingUp size={11} />
                +12.4%
              </span>
              <svg width="40" height="12" viewBox="0 0 40 12" style={{ overflow: 'visible' }}>
                <path d="M 0 10 Q 10 5, 20 8 T 40 2" fill="none" stroke="#10b981" strokeWidth="1.5" />
              </svg>
            </div>
          </div>

          {/* Card 2: Avg Open Rate */}
          <div className="panel" style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <span style={{ fontSize: '10px', fontWeight: '800', color: 'var(--muted)', textTransform: 'uppercase' }}>Avg. Open Rate</span>
            <strong style={{ fontSize: '24px', fontWeight: '800', color: 'var(--text)' }}>42.8%</strong>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '11px', fontWeight: '750', color: 'var(--green)', display: 'inline-flex', alignItems: 'center', gap: '2px' }}>
                <TrendingUp size={11} />
                +3.2%
              </span>
              <svg width="40" height="12" viewBox="0 0 40 12" style={{ overflow: 'visible' }}>
                <path d="M 0 8 Q 10 9, 20 4 T 40 2" fill="none" stroke="#10b981" strokeWidth="1.5" />
              </svg>
            </div>
          </div>

          {/* Card 3: Converted */}
          <div className="panel" style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <span style={{ fontSize: '10px', fontWeight: '800', color: 'var(--muted)', textTransform: 'uppercase' }}>Converted</span>
            <strong style={{ fontSize: '24px', fontWeight: '800', color: 'var(--text)' }}>54,201</strong>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '11px', fontWeight: '750', color: 'var(--red)', display: 'inline-flex', alignItems: 'center', gap: '2px' }}>
                <TrendingDown size={11} />
                -1.1%
              </span>
              <svg width="40" height="12" viewBox="0 0 40 12" style={{ overflow: 'visible' }}>
                <path d="M 0 2 Q 10 4, 20 8 T 40 10" fill="none" stroke="#ef4444" strokeWidth="1.5" />
              </svg>
            </div>
          </div>

          {/* Card 4: Revenue Impact */}
          <div style={{ 
            background: 'linear-gradient(135deg, #0f0a40 0%, #1e106b 100%)', 
            color: '#fff', 
            borderRadius: '12px', 
            padding: '20px', 
            display: 'flex', 
            flexDirection: 'column', 
            gap: '8px', 
            position: 'relative' 
          }}>
            <span style={{ fontSize: '10px', fontWeight: '800', color: '#c0b4fc', textTransform: 'uppercase' }}>Revenue Impact</span>
            <strong style={{ fontSize: '24px', fontWeight: '900', color: '#fff' }}>$4,284,000</strong>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '2px' }}>
              <span style={{ fontSize: '10px', fontWeight: '900', color: '#1e40af', background: '#bfdbfe', padding: '2px 6px', borderRadius: '4px' }}>
                High Value
              </span>
              <Sparkles size={14} style={{ color: '#a78bfa' }} />
            </div>
          </div>

        </div>

        {/* Chart Row: Revenue Trend Analysis & Funnel */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr', lgGridTemplateColumns: '2fr 1fr', gap: 'var(--spacing-section)', alignItems: 'stretch' }}>
          
          {/* Revenue Trend Analysis */}
          <div className="panel" style={{ padding: 'var(--spacing-section)', display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3 style={{ fontSize: '15px', fontWeight: '850', color: 'var(--text)', margin: 0 }}>
                Revenue Trend Analysis
              </h3>

              <div style={{ display: 'flex', gap: '12px', fontSize: '11px', fontWeight: '750' }}>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', color: 'var(--text)' }}>
                  <span style={{ height: '8px', width: '8px', borderRadius: '50%', background: 'var(--primary)' }} />
                  Current
                </span>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', color: 'var(--muted)' }}>
                  <span style={{ height: '8px', width: '8px', borderRadius: '50%', background: '#fff', border: '1.5px dashed var(--primary)' }} />
                  Projected
                </span>
              </div>
            </div>

            {/* Custom Bar Graph Grid */}
            <div style={{ height: '180px', display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', paddingBottom: '8px', position: 'relative', marginTop: '20px' }}>
              {/* Tooltip on JUN */}
              <div style={{
                position: 'absolute',
                top: '0px',
                left: '42.5%',
                background: 'var(--primary)',
                color: '#fff',
                padding: '4px 8px',
                borderRadius: '4px',
                fontSize: '10px',
                fontWeight: '700',
                whiteSpace: 'nowrap',
                boxShadow: '0 2px 4px rgba(0,0,0,0.15)',
                zIndex: 10
              }}>
                Peak Performance
                {/* little bubble arrow */}
                <div style={{
                  position: 'absolute',
                  bottom: '-4px',
                  left: '50%',
                  marginLeft: '-4px',
                  width: 0,
                  height: 0,
                  borderLeft: '4px solid transparent',
                  borderRight: '4px solid transparent',
                  borderTop: '4px solid var(--primary)'
                }} />
              </div>

              {[
                { m: 'JAN', val: 50, projected: false },
                { m: 'FEB', val: 65, projected: false },
                { m: 'MAR', val: 60, projected: false },
                { m: 'APR', val: 80, projected: false },
                { m: 'MAY', val: 70, projected: false },
                { m: 'JUN', val: 95, projected: false },
                { m: 'JUL', val: 85, projected: false },
                { m: 'AUG', val: 90, projected: false },
                { m: 'SEP', val: 82, projected: false },
                { m: 'OCT', val: 92, projected: true },
                { m: 'NOV', val: 80, projected: true },
                { m: 'DEC', val: 96, projected: true }
              ].map((bar, i) => (
                <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '7%', gap: '8px', height: '100%', justifyContent: 'flex-end' }}>
                  <div style={{ 
                    width: '100%', 
                    height: `${bar.val}%`, 
                    background: bar.projected ? 'transparent' : 'var(--primary)', 
                    border: bar.projected ? '2px dashed var(--primary)' : 'none',
                    borderRadius: '2px 2px 0 0'
                  }} />
                  <span style={{ fontSize: '10px', fontWeight: '800', color: 'var(--muted)' }}>{bar.m}</span>
                </div>
              ))}
            </div>

          </div>

          {/* Conversion Funnel */}
          <div className="panel" style={{ padding: 'var(--spacing-section)', display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <h3 style={{ fontSize: '14.5px', fontWeight: '850', color: 'var(--text)', margin: 0 }}>
              Conversion Funnel
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', flex: 1 }}>
              {/* Funnel Stage 1 */}
              <div style={{ background: '#f1f5f9', padding: '10px 12px', borderRadius: '6px', display: 'flex', justifySelf: 'stretch', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '12px', fontWeight: '700', color: 'var(--text)' }}>Reached</span>
                <strong style={{ fontSize: '13px' }}>1.2M</strong>
              </div>

              <div style={{ textAlign: 'center', height: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span style={{ color: 'var(--line)', fontSize: '12px' }}>▼</span>
              </div>

              {/* Funnel Stage 2 */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <div style={{ background: '#e2e8f0', padding: '10px 12px', borderRadius: '6px', display: 'flex', justifySelf: 'stretch', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '12px', fontWeight: '700', color: 'var(--text)' }}>Opened</span>
                  <strong style={{ fontSize: '13px' }}>549k</strong>
                </div>
                <div style={{ height: '3px', background: '#cbd5e1', borderRadius: '1.5px', overflow: 'hidden' }}>
                  <div style={{ width: '45.8%', height: '100%', background: 'var(--primary)' }} />
                </div>
              </div>

              <div style={{ textAlign: 'center', height: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span style={{ color: 'var(--line)', fontSize: '12px' }}>▼</span>
              </div>

              {/* Funnel Stage 3 */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <div style={{ background: '#cbd5e1', padding: '10px 12px', borderRadius: '6px', display: 'flex', justifySelf: 'stretch', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '12px', fontWeight: '700', color: 'var(--text)' }}>Clicked</span>
                  <strong style={{ fontSize: '13px' }}>82k</strong>
                </div>
                <div style={{ height: '3px', background: '#cbd5e1', borderRadius: '1.5px', overflow: 'hidden' }}>
                  <div style={{ width: '15%', height: '100%', background: 'var(--primary)' }} />
                </div>
              </div>

              <div style={{ textAlign: 'center', height: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span style={{ color: 'var(--line)', fontSize: '12px' }}>▼</span>
              </div>

              {/* Funnel Stage 4 */}
              <div style={{ background: 'var(--primary)', color: '#fff', padding: '10px 12px', borderRadius: '6px', display: 'flex', justifySelf: 'stretch', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '12px', fontWeight: '700' }}>Converted</span>
                <strong style={{ fontSize: '13px' }}>54k</strong>
              </div>
            </div>

            {/* Net Efficiency Box */}
            <div style={{ 
              background: '#e6f4ea', 
              border: '1px solid #a3cfb6', 
              borderRadius: '8px', 
              padding: '12px', 
              textAlign: 'center', 
              marginTop: '12px' 
            }}>
              <span style={{ fontSize: '10px', color: '#137333', fontWeight: '800', letterSpacing: '0.5px', display: 'block' }}>NET EFFICIENCY</span>
              <strong style={{ fontSize: '24px', color: '#137333', fontWeight: '900', display: 'block', marginTop: '2px' }}>4.4%</strong>
            </div>
          </div>

        </div>

        {/* Table: Campaign Performance Detail */}
        <div className="panel" style={{ padding: 'var(--spacing-section)', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h3 style={{ fontSize: '15px', fontWeight: '850', color: 'var(--text)', margin: 0 }}>
              Campaign Performance Detail
            </h3>

            <div style={{ display: 'flex', gap: '8px' }}>
              <button style={{ height: '32px', width: '32px', border: '1.5px solid #25108f', background: '#fff', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }} aria-label="Filter campaigns" onClick={(e) => { e.preventDefault(); e.stopPropagation(); toast.success("Action performed successfully!"); }}>
                <Sliders size={14} style={{ color: 'var(--muted)' }} />
              </button>
              <button style={{ height: '32px', width: '32px', border: '1.5px solid #25108f', background: '#fff', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }} aria-label="Export campaigns" onClick={(e) => { e.preventDefault(); e.stopPropagation(); toast.success("Action performed successfully!"); }}>
                <Download size={14} style={{ color: 'var(--muted)' }} />
              </button>
            </div>
          </div>

          <div style={{ overflowY: 'auto', maxHeight: '400px' }}>
            <div className="table-responsive-wrapper">
<table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px', textAlign: 'left', minWidth: '600px' }}>
              <thead>
                <tr style={{ background: 'var(--soft)', borderBottom: '1.5px solid #25108f' }}>
                  <th style={{ padding: '12px 16px', color: 'var(--muted)', fontWeight: '800', textTransform: 'uppercase', fontSize: '10px' }}>Campaign Name</th>
                  <th style={{ padding: '12px 16px', color: 'var(--muted)', fontWeight: '800', textTransform: 'uppercase', fontSize: '10px' }}>Channel</th>
                  <th style={{ padding: '12px 16px', color: 'var(--muted)', fontWeight: '800', textTransform: 'uppercase', fontSize: '10px' }}>Reach</th>
                  <th style={{ padding: '12px 16px', color: 'var(--muted)', fontWeight: '800', textTransform: 'uppercase', fontSize: '10px' }}>Conv %</th>
                  <th style={{ padding: '12px 16px', color: 'var(--muted)', fontWeight: '800', textTransform: 'uppercase', fontSize: '10px' }}>Revenue</th>
                  <th style={{ padding: '12px 16px', color: 'var(--muted)', fontWeight: '800', textTransform: 'uppercase', fontSize: '10px', textAlign: 'right' }}>Status</th>
                </tr>
              </thead>
              <tbody>
                <tr style={{ borderBottom: '1px solid var(--lavender)' }}>
                  <td style={{ padding: '16px' }}>
                    <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                      <div style={{ height: '30px', width: '30px', borderRadius: '50%', background: '#f4eff8', color: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Rocket size={14} />
                      </div>
                      <div>
                        <strong style={{ display: 'block', fontWeight: '800' }}>Winter Catalyst 2024</strong>
                        <span style={{ fontSize: '11px', color: 'var(--muted)' }}>ID: CP-98231</span>
                      </div>
                    </div>
                  </td>
                  <td style={{ padding: '16px', fontWeight: '700', color: 'var(--text)' }}>Direct Email</td>
                  <td style={{ padding: '16px', fontWeight: '700', color: 'var(--text)' }}>452,100</td>
                  <td style={{ padding: '16px', fontWeight: '700', color: 'var(--text)' }}>5.2%</td>
                  <td style={{ padding: '16px', fontWeight: '800', color: '#137333' }}>$1,240,000</td>
                  <td style={{ padding: '16px', textAlign: 'right' }}>
                    <span style={{ fontSize: '10px', fontWeight: '850', color: '#137333', background: '#e6f4ea', padding: '3px 8px', borderRadius: '4px' }}>ACTIVE</span>
                  </td>
                </tr>

                <tr style={{ borderBottom: '1px solid var(--lavender)' }}>
                  <td style={{ padding: '16px' }}>
                    <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                      <div style={{ height: '30px', width: '30px', borderRadius: '50%', background: '#eff6ff', color: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Repeat size={14} />
                      </div>
                      <div>
                        <strong style={{ display: 'block', fontWeight: '800' }}>Retargeting: High LTV</strong>
                        <span style={{ fontSize: '11px', color: 'var(--muted)' }}>ID: CP-44120</span>
                      </div>
                    </div>
                  </td>
                  <td style={{ padding: '16px', fontWeight: '700', color: 'var(--text)' }}>Display Ads</td>
                  <td style={{ padding: '16px', fontWeight: '700', color: 'var(--text)' }}>820,400</td>
                  <td style={{ padding: '16px', fontWeight: '700', color: 'var(--text)' }}>2.1%</td>
                  <td style={{ padding: '16px', fontWeight: '800', color: '#137333' }}>$890,200</td>
                  <td style={{ padding: '16px', textAlign: 'right' }}>
                    <span style={{ fontSize: '10px', fontWeight: '850', color: '#137333', background: '#e6f4ea', padding: '3px 8px', borderRadius: '4px' }}>ACTIVE</span>
                  </td>
                </tr>

                <tr>
                  <td style={{ padding: '16px' }}>
                    <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                      <div style={{ height: '30px', width: '30px', borderRadius: '50%', background: '#eff6ff', color: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <MessageSquare size={14} />
                      </div>
                      <div>
                        <strong style={{ display: 'block', fontWeight: '800' }}>Community Referral Hub</strong>
                        <span style={{ fontSize: '11px', color: 'var(--muted)' }}>ID: CP-21004</span>
                      </div>
                    </div>
                  </td>
                  <td style={{ padding: '16px', fontWeight: '700', color: 'var(--text)' }}>Social</td>
                  <td style={{ padding: '16px', fontWeight: '700', color: 'var(--text)' }}>12,400</td>
                  <td style={{ padding: '16px', fontWeight: '700', color: 'var(--text)' }}>12.8%</td>
                  <td style={{ padding: '16px', fontWeight: '800', color: 'var(--text)' }}>$512,000</td>
                  <td style={{ padding: '16px', textAlign: 'right' }}>
                    <span style={{ fontSize: '10px', fontWeight: '850', color: 'var(--muted)', background: '#f1f5f9', padding: '3px 8px', borderRadius: '4px' }}>PAUSED</span>
                  </td>
                </tr>
              </tbody>
            </table>
</div>
          </div>

          {/* View all button */}
          <button
            onClick={() => alert('Loading remaining 39 campaigns...')}
            style={{
              width: '100%',
              height: '38px',
              border: 'none',
              background: '#f1f5f9',
              color: 'var(--primary)',
              fontSize: '12.5px',
              fontWeight: '750',
              borderRadius: '6px',
              cursor: 'pointer',
              marginTop: '6px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px',
              transition: 'all 0.15s ease'
            }}
          >
            <span>View All 42 Campaigns</span>
            <ChevronRight size={14} />
          </button>

        </div>
          </>
        )}
      </div>
    </AdminShell>
  );
}


