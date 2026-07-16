import React from 'react';
import {
  TrendingUp,
  TrendingDown,
  Sparkles,
  Wrench,
  Truck,
  Star,
  Download,
  Plus,
  Zap,
  HelpCircle,
  FileText
} from 'lucide-react';

export default function ComparisonHub() {
  const topMetrics = [
    { title: 'Global Avg. Revenue', value: '$42.8k', change: '+12.4%', type: 'up' },
    { title: 'Active Audits', value: '12', change: '— Steady', type: 'stable' },
    { title: 'Avg. Satisfaction', value: '4.8/5', change: '+0.2', type: 'up' },
    { title: 'Capacity Used', value: '82%', change: 'High Load', type: 'warning' }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-section)', fontFamily: 'Inter, sans-serif' }}>
      
      {/* Header Row */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '16px',
        borderBottom: '1.5px solid #25108f',
        paddingBottom: '20px'
      }}>
        <div>
          <h1 style={{ fontSize: '24px', fontWeight: '800', color: 'var(--text)', margin: 0 }}>Service Comparison Hub</h1>
          <span style={{ fontSize: '13px', color: 'var(--muted)', marginTop: '4px', display: 'block' }}>
            Comparative audit of active service vertical performance metrics.
          </span>
        </div>
        <div style={{ display: 'flex', gap: '12px' }}>
          <button
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '8px 16px',
              borderRadius: '6px',
              border: '1.5px solid #25108f',
              background: 'white',
              color: 'var(--text)',
              fontWeight: '600',
              fontSize: '13px',
              cursor: 'pointer',
              transition: 'all 0.2s'
            }}
            onClick={() => alert('Exporting PDF...')}
            type="button"
          >
            <Download size={15} />
            <span>Export PDF</span>
          </button>
          <button
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '8px 16px',
              borderRadius: '6px',
              border: 'none',
              background: '#0f172a',
              color: 'white',
              fontWeight: '600',
              fontSize: '13px',
              cursor: 'pointer',
              transition: 'all 0.2s'
            }}
            onClick={() => alert('Add other services to compare')}
            type="button"
          >
            <Plus size={15} />
            <span>Compare Others</span>
          </button>
        </div>
      </div>

      {/* KPI Cards Row */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '20px'
      }}>
        {topMetrics.map((m, idx) => (
          <div
            key={idx}
            className="panel"
            style={{
              background: 'white',
              borderRadius: '12px',
              border: '1.5px solid #25108f',
              padding: '20px',
              display: 'flex',
              flexDirection: 'column',
              gap: '4px'
            }}
          >
            <span style={{
              fontSize: '10px',
              fontWeight: '800',
              color: 'var(--muted)',
              textTransform: 'uppercase',
              letterSpacing: '0.5px'
            }}>
              {m.title}
            </span>
            <strong style={{ fontSize: '28px', color: 'var(--text)', fontWeight: '800', margin: '4px 0' }}>
              {m.value}
            </strong>
            <span style={{
              fontSize: '12px',
              fontWeight: '700',
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              color: m.type === 'up' ? '#10b981' : m.type === 'warning' ? '#ef4444' : 'var(--muted)'
            }}>
              {m.type === 'up' && '📈 '}
              {m.type === 'warning' && '🔥 '}
              {m.type === 'stable' && '— '}
              {m.change}
            </span>
          </div>
        ))}
      </div>

      {/* Matrix Table Comparison Grid */}
      <div className="panel" style={{
        background: 'white',
        borderRadius: '12px',
        border: '1.5px solid #25108f',
        overflow: 'hidden'
      }}>
        <div className="table-responsive-wrapper">
<table style={{ width: '100%', borderCollapse: 'collapse', tableLayout: 'fixed' }}>
          <thead>
            <tr style={{ borderBottom: '1.5px solid #25108f' }}>
              <th style={{
                padding: '24px 20px',
                textAlign: 'left',
                color: 'var(--muted)',
                fontSize: '11px',
                fontWeight: '800',
                letterSpacing: '0.5px',
                width: '25%'
              }}>
                COMPARISON METRICS
              </th>
              
              {/* Deep Cleaning */}
              <th style={{ padding: '24px 20px', textAlign: 'left', borderLeft: '1px solid #f1f5f9' }}>
                <div style={{ position: 'relative' }}>
                  <span style={{
                    position: 'absolute',
                    top: '-32px',
                    left: '0',
                    background: '#e0e7ff',
                    color: 'var(--primary)',
                    fontSize: '8px',
                    fontWeight: '900',
                    padding: '2px 6px',
                    borderRadius: '4px',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px'
                  }}>
                    Top Performer
                  </span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginTop: '4px' }}>
                    <div style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: '6px',
                      background: '#eff6ff',
                      color: '#2563eb',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      <Sparkles size={16} />
                    </div>
                    <div>
                      <strong style={{ display: 'block', fontSize: '13px', color: '#4ade80', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Deep Cleaning</strong>
                      <span style={{ fontSize: '11px', color: '#94a3b8', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Commercial Tier</span>
                    </div>
                  </div>
                </div>
              </th>

              {/* HVAC Repair */}
              <th style={{ padding: '24px 20px', textAlign: 'left', borderLeft: '1px solid #f1f5f9' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '6px',
                    background: '#fef3c7',
                    color: '#d97706',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <Wrench size={16} />
                  </div>
                  <div>
                    <strong style={{ display: 'block', fontSize: '13px', color: '#4ade80', textTransform: 'uppercase', letterSpacing: '0.5px' }}>HVAC Repair</strong>
                    <span style={{ fontSize: '11px', color: '#94a3b8', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.5px' }}>On-Demand Tier</span>
                  </div>
                </div>
              </th>

              {/* Supply Delivery */}
              <th style={{ padding: '24px 20px', textAlign: 'left', borderLeft: '1px solid #f1f5f9' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '6px',
                    background: '#e0f2fe',
                    color: '#0284c7',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <Truck size={16} />
                  </div>
                  <div>
                    <strong style={{ display: 'block', fontSize: '13px', color: '#4ade80', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Supply Delivery</strong>
                    <span style={{ fontSize: '11px', color: '#94a3b8', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Logistics Tier</span>
                  </div>
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            
            {/* Row 1: Pricing Model */}
            <tr style={{ borderBottom: '1px solid #f1f5f9' }}>
              <td style={{ padding: '20px', fontSize: '12px', fontWeight: '800', color: 'var(--muted)' }}>
                Pricing Model
              </td>
              <td style={{ padding: '20px', borderLeft: '1px solid #f1f5f9' }}>
                <strong style={{ display: 'block', fontSize: '13px', color: 'var(--primary)' }}>Square Footage</strong>
                <span style={{ fontSize: '11px', color: 'var(--muted)' }}>starting at $0.45/sqft</span>
              </td>
              <td style={{ padding: '20px', borderLeft: '1px solid #f1f5f9' }}>
                <strong style={{ display: 'block', fontSize: '13px', color: 'var(--text)' }}>Fixed Hourly</strong>
                <span style={{ fontSize: '11px', color: 'var(--muted)' }}>$85.00/hr + Parts</span>
              </td>
              <td style={{ padding: '20px', borderLeft: '1px solid #f1f5f9' }}>
                <strong style={{ display: 'block', fontSize: '13px', color: 'var(--text)' }}>Volume Weighted</strong>
                <span style={{ fontSize: '11px', color: 'var(--muted)' }}>via LA Based</span>
              </td>
            </tr>

            {/* Row 2: Total Bookings */}
            <tr style={{ borderBottom: '1px solid #f1f5f9' }}>
              <td style={{ padding: '20px', fontSize: '12px', fontWeight: '800', color: 'var(--muted)' }}>
                Total Bookings (Monthly)
              </td>
              <td style={{ padding: '20px', borderLeft: '1px solid #f1f5f9' }}>
                <strong style={{ fontSize: '20px', color: 'var(--text)', fontWeight: '800', display: 'block' }}>1,248</strong>
                <div style={{ width: '85%', height: '5px', background: 'var(--primary)', borderRadius: '3px', marginTop: '8px' }}></div>
              </td>
              <td style={{ padding: '20px', borderLeft: '1px solid #f1f5f9' }}>
                <strong style={{ fontSize: '20px', color: 'var(--text)', fontWeight: '800', display: 'block' }}>412</strong>
                <div style={{ width: '30%', height: '5px', background: '#93c5fd', borderRadius: '3px', marginTop: '8px' }}></div>
              </td>
              <td style={{ padding: '20px', borderLeft: '1px solid #f1f5f9' }}>
                <strong style={{ fontSize: '20px', color: 'var(--text)', fontWeight: '800', display: 'block' }}>894</strong>
                <div style={{ width: '60%', height: '5px', background: '#3b82f6', borderRadius: '3px', marginTop: '8px' }}></div>
              </td>
            </tr>

            {/* Row 3: Revenue (MTD) */}
            <tr style={{ borderBottom: '1px solid #f1f5f9' }}>
              <td style={{ padding: '20px', fontSize: '12px', fontWeight: '800', color: 'var(--muted)' }}>
                Revenue (MTD)
              </td>
              <td style={{ padding: '20px', borderLeft: '1px solid #f1f5f9' }}>
                <strong style={{ fontSize: '20px', color: '#10b981', fontWeight: '800', display: 'block' }}>$184,200</strong>
                <span style={{ fontSize: '11px', color: '#10b981', fontWeight: '700' }}>+18.2% vs LW</span>
              </td>
              <td style={{ padding: '20px', borderLeft: '1px solid #f1f5f9' }}>
                <strong style={{ fontSize: '20px', color: '#ef4444', fontWeight: '800', display: 'block' }}>$35,020</strong>
                <span style={{ fontSize: '11px', color: '#ef4444', fontWeight: '700' }}>-2.1% vs LW</span>
              </td>
              <td style={{ padding: '20px', borderLeft: '1px solid #f1f5f9' }}>
                <strong style={{ fontSize: '20px', color: '#10b981', fontWeight: '800', display: 'block' }}>$92,400</strong>
                <span style={{ fontSize: '11px', color: '#10b981', fontWeight: '700' }}>+4.5% vs LW</span>
              </td>
            </tr>

            {/* Row 4: User Satisfaction */}
            <tr style={{ borderBottom: 'none' }}>
              <td style={{ padding: '20px', fontSize: '12px', fontWeight: '800', color: 'var(--muted)' }}>
                User Satisfaction
              </td>
              <td style={{ padding: '20px', borderLeft: '1px solid #f1f5f9' }}>
                <div style={{ display: 'flex', gap: '2px', color: '#eab308' }}>
                  {[1, 2, 3, 4, 5].map(s => <Star key={s} size={14} fill="currentColor" stroke="none" />)}
                </div>
                <span style={{ fontSize: '11px', color: 'var(--muted)', display: 'block', marginTop: '6px' }}>4.92 / 5.0</span>
              </td>
              <td style={{ padding: '20px', borderLeft: '1px solid #f1f5f9' }}>
                <div style={{ display: 'flex', gap: '2px', color: '#eab308' }}>
                  {[1, 2, 3, 4].map(s => <Star key={s} size={14} fill="currentColor" stroke="none" />)}
                  <Star size={14} fill="none" stroke="currentColor" style={{ color: '#cbd5e1' }} />
                </div>
                <span style={{ fontSize: '11px', color: 'var(--muted)', display: 'block', marginTop: '6px' }}>4.15 / 5.0</span>
              </td>
              <td style={{ padding: '20px', borderLeft: '1px solid #f1f5f9' }}>
                <div style={{ display: 'flex', gap: '2px', color: '#eab308' }}>
                  {[1, 2, 3, 4].map(s => <Star key={s} size={14} fill="currentColor" stroke="none" />)}
                  <div style={{ position: 'relative', display: 'inline-block', width: '14px', height: '14px' }}>
                    <Star size={14} fill="none" stroke="currentColor" style={{ color: '#cbd5e1' }} />
                    <div style={{ position: 'absolute', top: 0, left: 0, width: '50%', overflow: 'hidden', color: '#eab308' }}>
                      <Star size={14} fill="currentColor" stroke="none" />
                    </div>
                  </div>
                </div>
                <span style={{ fontSize: '11px', color: 'var(--muted)', display: 'block', marginTop: '6px' }}>4.68 / 5.0</span>
              </td>
            </tr>

          </tbody>
        </table>
</div>
      </div>

      {/* Bottom Recommendation & Projection Section */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1.6fr 1fr',
        gap: 'var(--spacing-section)',
        alignItems: 'stretch'
      }}>
        
        {/* Executive Summary & Recommendations Card */}
        <div className="panel" style={{
          background: 'white',
          borderRadius: '12px',
          border: '1.5px solid #25108f',
          padding: '20px',
          display: 'flex',
          flexDirection: 'column'
        }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '16px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <FileText size={16} style={{ color: 'var(--primary)' }} />
              <h2 style={{ fontSize: '14px', fontWeight: '800', color: 'var(--text)', margin: 0 }}>
                Executive Summary & Recommendations
              </h2>
            </div>
            <span style={{ fontSize: '10px', color: 'var(--muted)', fontWeight: '800' }}>
              GENERATED 12M AGO
            </span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', flex: 1 }}>
            
            {/* Recommendation 1 */}
            <div style={{
              display: 'flex',
              gap: '12px',
              padding: '12px 14px',
              background: '#eff6ff',
              borderLeft: '4px solid #2563eb',
              borderRadius: '0 8px 8px 0'
            }}>
              <div>
                <strong style={{ display: 'block', fontSize: '13px', color: 'var(--text)', marginBottom: '4px' }}>
                  Scale Deep Cleaning Tier
                </strong>
                <p style={{ fontSize: '12px', color: 'var(--muted)', margin: 0, lineHeight: '1.5' }}>
                  The "Deep Cleaning" vertical shows highest ROI and customer satisfaction. Suggesting 15% increase in technician allocation for Q3.
                </p>
              </div>
            </div>

            {/* Recommendation 2 */}
            <div style={{
              display: 'flex',
              gap: '12px',
              padding: '12px 14px',
              background: '#fefce8',
              borderLeft: '4px solid #eab308',
              borderRadius: '0 8px 8px 0'
            }}>
              <div>
                <strong style={{ display: 'block', fontSize: '13px', color: 'var(--text)', marginBottom: '4px' }}>
                  Investigate HVAC Churn
                </strong>
                <p style={{ fontSize: '12px', color: 'var(--muted)', margin: 0, lineHeight: '1.5' }}>
                  Current HVAC satisfaction (4.15) sits below the enterprise benchmark of 4.5. Review technician dispatch times and customer feedback loops.
                </p>
              </div>
            </div>

          </div>
        </div>

        {/* Q3 Revenue Forecast Indigo Card */}
        <div style={{
          background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
          borderRadius: '12px',
          padding: 'var(--spacing-section)',
          color: 'white',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          position: 'relative',
          overflow: 'hidden',
          minHeight: '200px'
        }}>
          {/* Watermark Graphic */}
          <div style={{
            position: 'absolute',
            bottom: '-10px',
            right: '-10px',
            opacity: 0.15,
            width: '120px',
            height: '120px',
            pointerEvents: 'none'
          }}>
            <svg width="100%" height="100%" viewBox="0 0 100 100" fill="none">
              <path d="M10 80 Q30 50, 50 60 T90 20" stroke="white" strokeWidth="8" fill="none" strokeLinecap="round" />
              <path d="M10 90 L90 90" stroke="white" strokeWidth="4" />
            </svg>
          </div>

          <div>
            <span style={{
              fontSize: '11px',
              fontWeight: '800',
              color: '#94a3b8',
              textTransform: 'uppercase',
              letterSpacing: '0.5px'
            }}>
              Q3 Revenue Forecast
            </span>
            <strong style={{ fontSize: '36px', fontWeight: '800', color: 'white', display: 'block', marginTop: '12px' }}>
              $2.4M
            </strong>
            <span style={{ fontSize: '12px', color: '#10b981', fontWeight: '700', display: 'block', marginTop: '4px' }}>
              +14.2% Expected Growth
            </span>
          </div>

          <button
            style={{
              width: '100%',
              padding: '10px',
              borderRadius: '6px',
              border: 'none',
              background: 'white',
              color: '#0f172a',
              fontWeight: '700',
              fontSize: '13px',
              cursor: 'pointer',
              zIndex: 1,
              marginTop: '20px',
              textAlign: 'center',
              boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
            }}
            onClick={() => alert('Opening revenue projection dashboard')}
            type="button"
          >
            View Full Projection
          </button>
        </div>

      </div>

    </div>
  );
}



