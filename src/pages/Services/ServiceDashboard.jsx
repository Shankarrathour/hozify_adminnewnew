import React, { useState } from 'react';
import {
  AlertTriangle,
  ArrowUpRight,
  TrendingDown,
  Clock,
  ThumbsUp,
  Sliders,
  DollarSign,
  TrendingUp,
  Map,
  MessageCircleQuestion,
  Info
} from 'lucide-react';
import { useToast } from '../../components/common/ToastNotification';
import GlobalDashboardFilters from '../../components/common/GlobalDashboardFilters';

const topServices = [
  { name: 'Premium On-Demand Support', value: '$842k', label: 'Excellent', progress: 85 },
  { name: 'Enterprise Security Audit', value: '$612k', label: 'Excellent', progress: 65 },
  { name: 'Cloud Infrastructure Managed', value: '$544k', label: 'Stable', progress: 58 }
];

const watchlist = [
  { name: 'Regional Logistics Bulk', value: '$120k', label: 'CRITICAL', color: '#dc2626', bg: '#fee2e2' },
  { name: 'Legacy Database Support', value: '$82k', label: 'AT RISK', color: '#d97706', bg: '#fef3c7' },
  { name: 'On-site Maintenance (Legacy)', value: '$44k', label: 'AT RISK', color: '#d97706', bg: '#fef3c7' }
];

export default function ServiceDashboard() {
  const { addToast } = useToast();
  const [trajectoryMode, setTrajectoryMode] = useState('Quarterly');

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-section)' }}>
      <GlobalDashboardFilters />
      {/* SLA Alert banner */}
      <div
        style={{
          background: '#fef2f2',
          border: '1px solid #fee2e2',
          borderRadius: '12px',
          padding: '16px 20px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '16px'
        }}
      >
        <div style={{ display: 'flex', gap: '14px', alignItems: 'center', flex: 1, minWidth: '280px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '36px', height: '36px', borderRadius: '8px', background: '#fee2e2', color: '#dc2626' }}>
            <AlertTriangle size={20} />
          </div>
          <div>
            <strong style={{ display: 'block', fontSize: '13px', color: '#991b1b' }}>Priority Risk Assessment: Critical</strong>
            <p style={{ fontSize: '12px', color: '#dc2626', margin: '2px 0 0', lineHeight: '1.4' }}>
              Service "Regional Logistics" has dropped 14% below target threshold. Urgent resource reallocation recommended to maintain SLA.
            </p>
          </div>
        </div>
        <button
          onClick={() => addToast('Emergency SLA action initiated successfully!', 'success')}
          style={{
            height: '34px',
            padding: '0 16px',
            background: '#b91c1c',
            color: '#ffffff',
            border: 'none',
            borderRadius: '6px',
            fontSize: '12px',
            fontWeight: '800',
            cursor: 'pointer'
          }}
          type="button"
        >
          Initiate Action
        </button>
      </div>

      {/* KPI Cards Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px' }}>
        
        {/* TOTAL REVENUE */}
        <div className="panel" style={{ background: '#ffffff', borderRadius: '12px', border: '1.5px solid #25108f', padding: '20px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <span style={{ fontSize: '10px', fontWeight: '800', color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Total Revenue</span>
          <strong style={{ fontSize: '28px', color: 'var(--text)', fontWeight: '800' }}>$4.2M</strong>
          <span style={{ fontSize: '11px', color: '#059669', fontWeight: '800', display: 'flex', alignItems: 'center', gap: '2px' }}>
            📈 +12%
          </span>
          <div style={{ height: '4px', background: '#eff6ff', borderRadius: '2px', overflow: 'hidden', marginTop: '4px' }}>
            <div style={{ width: '80%', height: '100%', background: 'var(--primary)' }} />
          </div>
        </div>

        {/* AVG. FULFILLMENT */}
        <div className="panel" style={{ background: '#ffffff', borderRadius: '12px', border: '1.5px solid #25108f', padding: '20px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <span style={{ fontSize: '10px', fontWeight: '800', color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Avg. Fulfillment</span>
          <strong style={{ fontSize: '28px', color: 'var(--text)', fontWeight: '800' }}>2.4d</strong>
          <span style={{ fontSize: '11px', color: '#dc2626', fontWeight: '800', display: 'flex', alignItems: 'center', gap: '2px' }}>
            📉 -0.3d
          </span>
          <div style={{ height: '4px', background: '#fef2f2', borderRadius: '2px', overflow: 'hidden', marginTop: '4px' }}>
            <div style={{ width: '64%', height: '100%', background: '#dc2626' }} />
          </div>
        </div>

        {/* ACTIVE ORDERS */}
        <div className="panel" style={{ background: '#ffffff', borderRadius: '12px', border: '1.5px solid #25108f', padding: '20px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <span style={{ fontSize: '10px', fontWeight: '800', color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Active Orders</span>
          <strong style={{ fontSize: '28px', color: 'var(--text)', fontWeight: '800' }}>1,842</strong>
          <span style={{ fontSize: '11px', color: 'var(--muted)', fontWeight: '800' }}>Stable</span>
          <div style={{ height: '4px', background: '#f1f5f9', borderRadius: '2px', overflow: 'hidden', marginTop: '4px' }}>
            <div style={{ width: '45%', height: '100%', background: '#d97706' }} />
          </div>
        </div>

        {/* CUSTOMER CSAT */}
        <div className="panel" style={{ background: '#ffffff', borderRadius: '12px', border: '1.5px solid #25108f', padding: '20px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <span style={{ fontSize: '10px', fontWeight: '800', color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Customer CSAT</span>
          <strong style={{ fontSize: '28px', color: 'var(--text)', fontWeight: '800' }}>4.8/5</strong>
          <span style={{ fontSize: '11px', color: '#059669', fontWeight: '800', display: 'flex', alignItems: 'center', gap: '2px' }}>
            📈 +0.2
          </span>
          <div style={{ height: '4px', background: '#dcfce7', borderRadius: '2px', overflow: 'hidden', marginTop: '4px' }}>
            <div style={{ width: '92%', height: '100%', background: '#10b981' }} />
          </div>
        </div>
      </div>

      {/* Row Charts & Tables */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr', lgGridTemplateColumns: '1.2fr 1fr', gap: 'var(--spacing-section)', alignItems: 'stretch' }}>
        
        {/* Left column */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-section)' }}>
          
          {/* Top Performing Services */}
          <div className="panel" style={{ background: '#ffffff', border: '1.5px solid #25108f', borderRadius: '12px', padding: '20px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ display: 'flex', justifySelf: 'stretch', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3 style={{ fontSize: '15px', fontWeight: '800', color: 'var(--text)', margin: 0 }}>Top Performing Services</h3>
              <a href="#details" onClick={(e) => e.preventDefault()} style={{ fontSize: '11px', color: 'var(--primary)', fontWeight: '800', textDecoration: 'none', display: 'flex', gap: '4px', alignItems: 'center' }}>
                View Detailed List <ArrowUpRight size={14} />
              </a>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', fontSize: '12px', fontWeight: '700' }}>
              {topServices.map((service, index) => (
                <div key={index}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                    <span style={{ color: 'var(--text)' }}>{service.name}</span>
                    <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                      <span style={{ color: 'var(--text)' }}>{service.value}</span>
                      <span style={{ fontSize: '9px', fontWeight: '900', color: '#059669', background: '#ecfdf5', padding: '2px 6px', borderRadius: '4px' }}>{service.label}</span>
                    </div>
                  </div>
                  <div style={{ height: '6px', background: '#f1f5f9', borderRadius: '3px', overflow: 'hidden' }}>
                    <div style={{ width: `${service.progress}%`, height: '100%', background: '#4f46e5' }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Revenue Mix */}
          <div className="panel" style={{ background: '#ffffff', border: '1.5px solid #25108f', borderRadius: '12px', padding: '20px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <h3 style={{ fontSize: '15px', fontWeight: '800', color: 'var(--text)', margin: 0 }}>Revenue Mix</h3>
            
            <div style={{ display: 'flex', gap: '32px', alignItems: 'center', justifyContent: 'center', flexWrap: 'wrap', background: '#f8fafc', padding: '20px', borderRadius: '8px', border: '1.5px solid #25108f' }}>
              {/* Radial donut chart */}
              <div style={{ position: 'relative', width: '110px', height: '110px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <svg width="110" height="110" viewBox="0 0 36 36">
                  <circle cx="18" cy="18" r="16" fill="none" stroke="#e2e8f0" strokeWidth="3" />
                  <circle cx="18" cy="18" r="16" fill="none" stroke="#25108f" strokeWidth="4.5" strokeDasharray="62 100" strokeDashoffset="0" strokeLinecap="round" />
                </svg>
                <div style={{ position: 'absolute', textAlign: 'center' }}>
                  <strong style={{ fontSize: '20px', color: 'var(--text)', display: 'block' }}>62%</strong>
                  <span style={{ fontSize: '9px', color: 'var(--muted)', fontWeight: '800' }}>Sub.</span>
                </div>
              </div>

              {/* Legends details */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '11px', fontWeight: '700', flex: 1, minWidth: '160px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--muted)' }}>
                    <span style={{ height: '8px', width: '8px', background: 'var(--primary)', borderRadius: '50%' }} />
                    Subscriptions
                  </span>
                  <span style={{ color: 'var(--text)' }}>62%</span>
                </div>
                
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--muted)' }}>
                    <span style={{ height: '8px', width: '8px', background: '#818cf8', borderRadius: '50%' }} />
                    Professional Services
                  </span>
                  <span style={{ color: 'var(--text)' }}>24%</span>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--muted)' }}>
                    <span style={{ height: '8px', width: '8px', background: '#cbd5e1', borderRadius: '50%' }} />
                    Ad-hoc / Other
                  </span>
                  <span style={{ color: 'var(--text)' }}>14%</span>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Right column */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-section)' }}>
          
          {/* Performance Watchlist */}
          <div className="panel" style={{ background: '#ffffff', border: '1.5px solid #25108f', borderRadius: '12px', padding: '20px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ display: 'flex', justifySelf: 'stretch', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3 style={{ fontSize: '15px', fontWeight: '800', color: 'var(--text)', margin: 0 }}>Performance Watchlist</h3>
              <a href="#audit" onClick={(e) => e.preventDefault()} style={{ fontSize: '11px', color: 'var(--muted)', fontWeight: '800', textDecoration: 'none' }}>
                Audit All ⚙
              </a>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {watchlist.map((item, idx) => (
                <div key={idx} style={{ display: 'flex', justifySelf: 'stretch', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '10px', borderBottom: idx < 2 ? '1px solid #f1f5f9' : 'none' }}>
                  <div>
                    <strong style={{ display: 'block', fontSize: '13px', color: 'var(--text)' }}>{item.name}</strong>
                    <span style={{ display: 'block', fontSize: '10px', color: 'var(--muted)', marginTop: '2px' }}>Decline: -14.2% this quarter</span>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <span style={{ display: 'block', fontSize: '12px', fontWeight: '700', color: 'var(--text)' }}>{item.value}</span>
                    <span style={{ fontSize: '8px', fontWeight: '900', color: item.color, background: item.bg, padding: '2px 6px', borderRadius: '3px', marginTop: '4px', display: 'inline-block' }}>
                      {item.label}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Growth Trajectory quarterly chart */}
          <div className="panel" style={{ background: '#ffffff', border: '1.5px solid #25108f', borderRadius: '12px', padding: '20px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ display: 'flex', justifySelf: 'stretch', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3 style={{ fontSize: '15px', fontWeight: '800', color: 'var(--text)', margin: 0 }}>Growth Trajectory</h3>
              
              <div style={{ display: 'flex', background: '#f1f5f9', padding: '3px', borderRadius: '6px' }}>
                {['Quarterly', 'Yearly'].map((mode) => (
                  <button
                    key={mode}
                    onClick={() => setTrajectoryMode(mode)}
                    style={{
                      border: 'none',
                      padding: '4px 10px',
                      background: trajectoryMode === mode ? '#ffffff' : 'transparent',
                      color: trajectoryMode === mode ? '#0f172a' : 'var(--muted)',
                      borderRadius: '4px',
                      fontSize: '11px',
                      fontWeight: '700',
                      cursor: 'pointer',
                      boxShadow: trajectoryMode === mode ? '0 1px 3px rgba(0,0,0,0.05)' : 'none'
                    }}
                    type="button"
                  >
                    {mode}
                  </button>
                ))}
              </div>
            </div>

            <div style={{ height: '140px', display: 'flex', alignItems: 'flex-end', justifySelf: 'stretch', justifyContent: 'space-between', borderBottom: '1px dashed var(--line)', paddingBottom: '6px', position: 'relative' }}>
              <div style={{ position: 'absolute', left: 0, right: 0, top: '33%', borderTop: '1px dashed rgba(0,0,0,0.05)' }} />
              <div style={{ position: 'absolute', left: 0, right: 0, top: '66%', borderTop: '1px dashed rgba(0,0,0,0.05)' }} />
              
              {[
                { label: 'Q1 2023', h: 35 },
                { label: 'Q2 2023', h: 45 },
                { label: 'Q3 2023', h: 40 },
                { label: 'Q4 2023', h: 70, highlight: true },
                { label: 'Q1 2024', h: 60 },
                { label: 'Q2 2024', h: 80 }
              ].map((c, idx) => (
                <div key={idx} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', alignItems: 'center', width: '12%', height: '100%', gap: '8px' }}>
                  <div style={{ width: '100%', height: `${c.h}%`, background: c.highlight ? '#25108f' : '#eff6ff', borderRadius: '4px 4px 0 0' }} />
                  <span style={{ fontSize: '9px', fontWeight: '800', color: 'var(--muted)' }}>{c.label}</span>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>

      {/* Bottom Global Service Density Map card */}
      <div className="panel" style={{ background: '#ffffff', border: '1.5px solid #25108f', borderRadius: '12px', padding: 'var(--spacing-section)', display: 'flex', flexDirection: 'column', gap: '16px', position: 'relative' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
          <div>
            <h3 style={{ fontSize: '16px', fontWeight: '800', color: 'var(--text)', margin: 0 }}>Global Service Density</h3>
            <p style={{ fontSize: '12px', color: 'var(--muted)', marginTop: '2px', margin: 0 }}>Real-time load balancing across regional hubs.</p>
          </div>
          
          <button
            onClick={() => addToast('Opening interactive global logistics network map...', 'info')}
            style={{
              height: '36px',
              padding: '0 16px',
              background: '#0f172a',
              color: '#ffffff',
              border: 'none',
              borderRadius: '6px',
              fontSize: '12px',
              fontWeight: '700',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
            type="button"
          >
            <Map size={14} />
            <span>View Network Map</span>
          </button>
        </div>

        {/* Gray styled world map SVG mock */}
        <div style={{ height: '280px', background: '#374151', borderRadius: '10px', position: 'relative', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          
          {/* World map layout vectors */}
          <svg width="100%" height="100%" viewBox="0 0 600 280" style={{ position: 'absolute', top: 0, left: 0, opacity: 0.2 }}>
            <rect width="100%" height="100%" fill="none" />
            <path d="M 50 100 Q 80 80, 120 100 T 200 120 T 260 90 T 320 120 T 400 100 T 520 120 L 520 200 L 50 200 Z" fill="#ffffff" />
            <circle cx="150" cy="110" r="10" fill="#ffffff" />
            <circle cx="420" cy="110" r="12" fill="#ffffff" />
          </svg>

          {/* North America status card overlay */}
          <div
            style={{
              position: 'absolute',
              top: '60px',
              left: '80px',
              background: '#ffffff',
              border: '1.5px solid #25108f',
              borderRadius: '8px',
              padding: '10px 14px',
              boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)'
            }}
          >
            <strong style={{ display: 'block', fontSize: '13px', color: 'var(--text)' }}>North America</strong>
            <span style={{ display: 'block', fontSize: '11px', color: 'var(--muted)', marginTop: '2px' }}>842 Services Active</span>
            <div style={{ display: 'flex', gap: '3px', marginTop: '6px' }}>
              <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#10b981' }} />
              <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#10b981' }} />
              <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#10b981' }} />
            </div>
          </div>

          {/* European Union status card overlay */}
          <div
            style={{
              position: 'absolute',
              bottom: '60px',
              right: '120px',
              background: '#ffffff',
              border: '1.5px solid #25108f',
              borderRadius: '8px',
              padding: '10px 14px',
              boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)'
            }}
          >
            <strong style={{ display: 'block', fontSize: '13px', color: 'var(--text)' }}>European Union</strong>
            <span style={{ display: 'block', fontSize: '11px', color: 'var(--muted)', marginTop: '2px' }}>615 Services Active</span>
            <div style={{ display: 'flex', gap: '3px', marginTop: '6px' }}>
              <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#10b981' }} />
              <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#f59e0b' }} />
              <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#f59e0b' }} />
            </div>
          </div>

          {/* Floated support button bottom right */}
          <button
            onClick={() => addToast('Loading Help & Support panel...', 'info')}
            style={{
              position: 'absolute',
              bottom: '16px',
              right: '16px',
              width: '36px',
              height: '36px',
              borderRadius: '50%',
              background: '#4f46e5',
              color: '#ffffff',
              border: 'none',
              boxShadow: '0 4px 6px rgba(0,0,0,0.15)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer'
            }}
            type="button"
          >
            <MessageCircleQuestion size={18} />
          </button>
        </div>
      </div>

    </div>
  );
}


