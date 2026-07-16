import React, { useState } from 'react';
import { useApp } from '../../hooks/useApp';
import { ROUTES } from '../../config/routes';
import { 
  Search, 
  Eye, 
  Filter, 
  ArrowUpRight, 
  ArrowDownRight, 
  Download, 
  FileText,
  Network,
  Home,
  ShoppingBag,
  CheckCircle,
  AlertTriangle,
  Star
} from 'lucide-react';
import { useDateFilter } from '../../contexts/DateFilterContext';
import DateFilter from '../../components/common/DateFilter';
import SkeletonLoader from '../../components/common/SkeletonLoader';
import EmptyState from '../../components/common/EmptyState';
import AdminShell from '../../components/layouts/AdminShell';

export default function PartnerAnalytics({ activeTab = 'Partner Management' }) {
  const { navigate } = useApp();
  const { preset, isFiltering, hasData } = useDateFilter();

  const kpis = [
    { title: "ISP PARTNERS", value: "1,248", trend: "+12%", positive: true, icon: Network, color: 'var(--primary)', bg: "#f4eff8" },
    { title: "BSP PARTNERS", value: "842", trend: "+8.4%", positive: true, icon: Home, color: 'var(--green)', bg: "#ecfdf5" },
    { title: "BUSINESS SELLERS", value: "4,192", trend: "-2.1%", positive: false, icon: ShoppingBag, color: "#b45309", bg: "#fffbeb" }
  ];

  const partnersList = [
    { name: "Global Connect ISP", id: "PT-10492", type: "ISP", rev: 124500.00, revGrowth: "+14% MoM", quality: 4.8, status: "Active" },
    { name: "Starlink Solutions", id: "PT-10884", type: "BSP", rev: 89400.00, revGrowth: "+8.2% MoM", quality: 4.5, status: "Active" },
    { name: "TechPort Logistics", id: "PT-10201", type: "Seller", rev: 54000.00, revGrowth: "-1.5% MoM", quality: 4.2, status: "Active" },
    { name: "Urban Net Systems", id: "PT-10022", type: "ISP", rev: 44100.00, revGrowth: "+2.1% MoM", quality: 4.0, status: "Active" }
  ];

  return (
    <AdminShell
      activeTab={activeTab}
      brandText="HOZIFY"
      brandSubText="Enterprise Admin"
      headerTitle="Partner Analytics"
      searchPlaceholder="Search partners, reviews, or metrics..."
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-section)', padding: '24px 0' }}>
        
        {/* Title Block & Time Tabs */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px', position: 'relative', zIndex: 100 }}>
          <div>
            <h1 style={{ fontSize: '24px', fontWeight: '800', color: 'var(--text)', margin: 0 }}>
              Partner Analytics
            </h1>
            <p style={{ fontSize: '13px', color: 'var(--muted)', margin: '4px 0 0' }}>
              Real-time performance metrics and revenue distribution across your global partner network.
            </p>
          </div>

          <div style={{ display: 'flex', gap: '12px', alignItems: 'center', flexWrap: 'wrap' }}>
            <DateFilter />

            <button
              onClick={() => alert("Generating full analytics PDF report...")}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                border: 'none',
                background: 'var(--primary)',
                color: '#fff',
                fontSize: '12px',
                fontWeight: '750',
                height: '36px',
                padding: '0 16px',
                borderRadius: '6px',
                cursor: 'pointer'
              }}
            >
              <Download size={14} />
              <span>Export Report</span>
            </button>
          </div>
        </div>

        {isFiltering ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-section)' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '14px' }}>
              <SkeletonLoader height="100px" />
              <SkeletonLoader height="100px" />
              <SkeletonLoader height="100px" />
              <SkeletonLoader height="100px" />
              <SkeletonLoader height="100px" />
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1.7fr 1fr', gap: '20px' }}>
              <SkeletonLoader height="300px" />
              <SkeletonLoader height="300px" />
            </div>
            <SkeletonLoader height="250px" />
          </div>
        ) : !hasData ? (
          <EmptyState />
        ) : (
          <>
        {/* KPI Cards Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '14px', overflowX: 'auto' }}>
          {kpis.map((kpi, idx) => {
            const Icon = kpi.icon;
            return (
              <div key={idx} className="panel" style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '8px', minWidth: '130px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '9px', fontWeight: '800', color: 'var(--muted)', textTransform: 'uppercase' }}>{kpi.title}</span>
                  <div style={{ height: '26px', width: '26px', borderRadius: '50%', background: kpi.bg, color: kpi.color, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Icon size={13} />
                  </div>
                </div>
                <div>
                  <strong style={{ fontSize: '20px', fontWeight: '850', color: 'var(--text)' }}>{kpi.value}</strong>
                  <span style={{ display: 'block', fontSize: '11px', fontWeight: '750', color: kpi.positive ? '#07956f' : '#d32929', marginTop: '2px' }}>
                    {kpi.trend}
                  </span>
                </div>
              </div>
            );
          })}

          {/* Active Partners - highlighted purple card */}
          <div className="panel" style={{ padding: '16px', background: 'var(--primary)', color: '#fff', display: 'flex', flexDirection: 'column', gap: '8px', minWidth: '130px', border: 'none' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '9px', fontWeight: '800', color: '#c8c0d7', textTransform: 'uppercase' }}>ACTIVE PARTNERS</span>
              <CheckCircle size={14} style={{ color: '#ecfdf5' }} />
            </div>
            <div>
              <strong style={{ fontSize: '20px', fontWeight: '850', color: '#fff' }}>94.2%</strong>
              <span style={{ display: 'block', fontSize: '11px', color: '#c8c0d7', marginTop: '2px' }}>Under SLA compliance</span>
            </div>
          </div>

          {/* Suspended - highlighted red card */}
          <div className="panel" style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '8px', minWidth: '130px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '9px', fontWeight: '800', color: 'var(--muted)', textTransform: 'uppercase' }}>SUSPENDED</span>
              <AlertTriangle size={14} style={{ color: 'var(--red)' }} />
            </div>
            <div>
              <strong style={{ fontSize: '20px', fontWeight: '850', color: 'var(--text)' }}>12</strong>
              <span style={{ display: 'block', fontSize: '11px', color: 'var(--red)', fontWeight: '750', marginTop: '2px' }}>Requires Review</span>
            </div>
          </div>
        </div>

        {/* Growth Curve and Top Ranking Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '1.7fr 1fr', gap: '20px', alignItems: 'stretch' }}>
          
          {/* Partner Growth Bar Chart */}
          <div className="panel" style={{ padding: 'var(--spacing-section)', display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <h2 style={{ fontSize: '14px', fontWeight: '850', color: 'var(--text)', margin: 0 }}>Partner Growth Trend</h2>
                <span style={{ fontSize: '11px', color: 'var(--muted)' }}>Acquisition and churn across all types.</span>
              </div>
              <div style={{ display: 'flex', gap: '12px', fontSize: '11px', fontWeight: '700' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '4px', color: 'var(--text)' }}>
                  <span style={{ height: '8px', width: '8px', background: 'var(--primary)', borderRadius: '50%' }} />
                  Direct
                </span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '4px', color: 'var(--text)' }}>
                  <span style={{ height: '8px', width: '8px', background: '#64748b', borderRadius: '50%' }} />
                  Referral
                </span>
              </div>
            </div>

            {/* Growth column bars with March tooltip */}
            <div style={{ height: '220px', borderBottom: '1.5px solid #25108f', display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', position: 'relative', padding: '10px 10px 0', marginTop: '10px' }}>
              
              {/* Tooltip bubble on March (index 2) */}
              <div style={{
                position: 'absolute',
                top: '55px', left: '21%',
                background: '#0f172a',
                color: '#fff',
                padding: '6px 10px',
                borderRadius: '4px',
                fontSize: '10px',
                fontWeight: '800',
                display: 'flex',
                flexDirection: 'column',
                gap: '2px',
                boxShadow: '0 4px 6px rgba(0,0,0,0.15)',
                zIndex: 10
              }}>
                <span>Growth</span>
                <span style={{ color: '#38bdf8' }}>+15%</span>
                <div style={{
                  position: 'absolute',
                  bottom: '-4px', left: '50%',
                  transform: 'translateX(-50%) rotate(45deg)',
                  height: '8px', width: '8px',
                  background: '#0f172a'
                }} />
              </div>

              {[
                { label: "Jan", val: 50 },
                { label: "Feb", val: 68 },
                { label: "Mar", val: 82 },
                { label: "Apr", val: 55 },
                { label: "May", val: 78 },
                { label: "Jun", val: 60 },
                { label: "Jul", val: 92 },
                { label: "Aug", val: 70 },
                { label: "Sep", val: 110 },
                { label: "Oct", val: 95 },
                { label: "Nov", val: 120 },
                { label: "Dec", val: 88 }
              ].map((item, idx) => (
                <div key={idx} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1 }}>
                  <div style={{ width: '16px', height: '180px', display: 'flex', alignItems: 'flex-end', background: '#f8fafc' }}>
                    <div style={{ width: '100%', height: `${item.val}%`, background: idx === 2 ? '#25108f' : '#c8c0d7', borderRadius: '2px 2px 0 0' }} />
                  </div>
                  <span style={{ fontSize: '10px', color: 'var(--muted)', fontWeight: '750', marginTop: '6px' }}>{item.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Top Performing Partners side list */}
          <div className="panel" style={{ padding: 'var(--spacing-section)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <h2 style={{ fontSize: '14px', fontWeight: '850', color: 'var(--text)', margin: '0 0 16px' }}>Top Performing Partners</h2>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                {[
                  { rank: "01", name: "Global Connect ISP", score: "9.8", width: "98%", color: 'var(--primary)' },
                  { rank: "02", name: "Starlink Solutions", score: "9.4", width: "94%", color: 'var(--primary)' },
                  { rank: "03", name: "TechPort Logistics", score: "8.9", width: "89%", color: 'var(--primary)' },
                  { rank: "04", name: "Urban Net Systems", score: "8.5", width: "85%", color: 'var(--primary)' }
                ].map((item, idx) => (
                  <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <span style={{ fontSize: '14px', fontWeight: '850', color: 'var(--muted)' }}>{item.rank}</span>
                    <div style={{ flex: 1 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', fontWeight: '750', marginBottom: '4px' }}>
                        <span style={{ color: 'var(--text)' }}>{item.name}</span>
                        <span style={{ color: 'var(--primary)', fontWeight: '850' }}>{item.score}</span>
                      </div>
                      <div style={{ height: '6px', background: '#f4eff8', borderRadius: '3px', overflow: 'hidden' }}>
                        <div style={{ width: item.width, height: '100%', background: item.color }} />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={() => alert("Loading full partner rankings directory...")}
              style={{
                width: '100%',
                height: '38px',
                border: '1px solid #25108f',
                background: '#fff',
                color: 'var(--primary)',
                fontSize: '12px',
                fontWeight: '800',
                borderRadius: '6px',
                cursor: 'pointer',
                marginTop: '20px'
              }}
            >
              View Full Ranking
            </button>
          </div>

        </div>

        {/* Detailed performance table list */}
        <div className="panel" style={{ padding: 'var(--spacing-section)' }}>
          <h2 style={{ fontSize: '14px', fontWeight: '850', color: 'var(--text)', margin: '0 0 16px' }}>Detailed Performance Metrics</h2>
          
          <div className="table-wrap">
            <div className="table-responsive-wrapper">
<table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px', textAlign: 'left' }}>
              <thead>
                <tr style={{ background: '#f4eff8', borderBottom: '1.5px solid #25108f' }}>
                  <th style={{ padding: '12px 16px', color: 'var(--muted)', fontWeight: '800', textTransform: 'uppercase', fontSize: '10px' }}>Partner Entity</th>
                  <th style={{ padding: '12px 16px', color: 'var(--muted)', fontWeight: '800', textTransform: 'uppercase', fontSize: '10px' }}>Type</th>
                  <th style={{ padding: '12px 16px', color: 'var(--muted)', fontWeight: '800', textTransform: 'uppercase', fontSize: '10px' }}>Revenue Contribution</th>
                  <th style={{ padding: '12px 16px', color: 'var(--muted)', fontWeight: '800', textTransform: 'uppercase', fontSize: '10px' }}>Service Quality</th>
                  <th style={{ padding: '12px 16px', color: 'var(--muted)', fontWeight: '800', textTransform: 'uppercase', fontSize: '10px' }}>Status</th>
                  <th style={{ padding: '12px 16px', color: 'var(--muted)', fontWeight: '800', textTransform: 'uppercase', fontSize: '10px', textAlign: 'right' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {partnersList.map((p, idx) => (
                  <tr key={idx} style={{ borderBottom: '1px solid var(--lavender)' }}>
                    <td style={{ padding: '16px' }}>
                      <strong style={{ display: 'block', color: 'var(--text)' }}>{p.name}</strong>
                      <span style={{ fontSize: '11px', color: 'var(--muted)' }}>ID: #{p.id}</span>
                    </td>
                    <td style={{ padding: '16px' }}>
                      <span style={{ fontSize: '10px', fontWeight: '800', background: '#f4eff8', color: 'var(--primary)', padding: '3px 8px', borderRadius: '4px' }}>
                        {p.type}
                      </span>
                    </td>
                    <td style={{ padding: '16px' }}>
                      <strong style={{ display: 'block', color: 'var(--text)' }}>${p.rev.toLocaleString('en-US', { minimumFractionDigits: 2 })}</strong>
                      <span style={{ fontSize: '11px', color: 'var(--green)', fontWeight: '750' }}>{p.revGrowth}</span>
                    </td>
                    <td style={{ padding: '16px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <div style={{ display: 'flex', color: '#fbbf24' }}>
                          {[1, 2, 3, 4, 5].map((s) => (
                            <Star key={s} size={12} fill={s <= Math.round(p.quality) ? '#fbbf24' : 'none'} stroke={s <= Math.round(p.quality) ? '#fbbf24' : 'var(--line)'} />
                          ))}
                        </div>
                        <span style={{ fontSize: '12px', fontWeight: '750', color: 'var(--text)' }}>{p.quality}</span>
                      </div>
                    </td>
                    <td style={{ padding: '16px' }}>
                      <span style={{ fontSize: '9px', fontWeight: '850', background: '#ecfdf5', color: 'var(--green)', padding: '3px 8px', borderRadius: '4px' }}>
                        {p.status}
                      </span>
                    </td>
                    <td style={{ padding: '16px', textAlign: 'right' }}>
                      <button
                        onClick={() => navigate(ROUTES.partnerDetails)}
                        style={{ border: 'none', background: 'transparent', color: 'var(--primary)', cursor: 'pointer' }}
                        title="View Details"
                      >
                        <Eye size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
</div>
          </div>
        </div>

        </>
        )}
      </div>
    </AdminShell>
  );
}


