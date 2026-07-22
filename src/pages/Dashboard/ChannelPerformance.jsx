import toast from 'react-hot-toast';
import React, { useState } from 'react';
import { 
  CreditCard, 
  TrendingUp, 
  Target, 
  UserMinus, 
  Download, 
  ChevronDown, 
  Sliders, 
  MoreVertical, 
  Zap, 
  MessageSquare, 
  Mail,
  TrendingDown
} from 'lucide-react';
import { useDateFilter } from '../../contexts/DateFilterContext';
import DateFilter from '../../components/common/DateFilter';
import SkeletonLoader from '../../components/common/SkeletonLoader';
import EmptyState from '../../components/common/EmptyState';
import AdminShell from '../../components/layouts/AdminShell';

import Select from "../../components/ui/Select";

export default function ChannelPerformance({ activeTab = 'Dashboard' }) {
  const { preset, isFiltering, hasData } = useDateFilter();
  const [regionFilter, setRegionFilter] = useState('Filter by Region');

  return (
    <AdminShell
      activeTab={activeTab}
      brandText="HOZIFY"
      brandSubText="Enterprise SaaS"
      headerTitle="Channel Performance & ROI"
      searchPlaceholder="Search performance metrics..."
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-section)', padding: '24px 0', position: 'relative' }}>
        
        {/* Page Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px', position: 'relative', zIndex: 100 }}>
          <div>
            <span style={{ fontSize: '10px', fontWeight: '800', color: 'var(--muted)', letterSpacing: '0.5px' }}>MODULE 18 / SCREEN 22</span>
            <h1 style={{ fontSize: '24px', fontWeight: '800', color: 'var(--text)', margin: '4px 0 0' }}>
              Channel Performance & ROI
            </h1>
            <p style={{ fontSize: '13px', color: 'var(--muted)', margin: '4px 0 0' }}>
              High-fidelity attribution analysis.
            </p>
          </div>

          <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
            <DateFilter />

            <button
              onClick={() => alert('Exporting attribution analysis...')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                border: '1.5px solid #25108f',
                background: '#fff',
                color: 'var(--text)',
                fontSize: '13px',
                fontWeight: '700',
                height: '38px',
                padding: '0 16px',
                borderRadius: '6px',
                cursor: 'pointer',
                transition: 'all 0.15s ease'
              }}
              type="button"
            >
              <Download size={14} />
              <span>Export</span>
            </button>
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
          
          {/* Card 1: Total Spend */}
          <div className="panel" style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '10px', fontWeight: '800', color: 'var(--muted)', textTransform: 'uppercase' }}>Total Spend</span>
              <CreditCard size={15} style={{ color: 'var(--muted)' }} />
            </div>
            <div>
              <strong style={{ fontSize: '24px', fontWeight: '800', color: 'var(--text)' }}>$124,500</strong>
              <span style={{ fontSize: '11px', fontWeight: '750', color: 'var(--green)', display: 'block', marginTop: '4px' }}>
                +2.4% <span style={{ color: 'var(--muted)', fontWeight: '500' }}>vs prev. month</span>
              </span>
            </div>
          </div>

          {/* Card 2: Avg ROI */}
          <div className="panel" style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '10px', fontWeight: '800', color: 'var(--muted)', textTransform: 'uppercase' }}>Avg. ROI</span>
              <TrendingUp size={15} style={{ color: 'var(--muted)' }} />
            </div>
            <div>
              <strong style={{ fontSize: '24px', fontWeight: '800', color: 'var(--text)' }}>12.8x</strong>
              <span style={{ fontSize: '11px', fontWeight: '750', color: 'var(--green)', display: 'block', marginTop: '4px' }}>
                +0.8x <span style={{ color: 'var(--muted)', fontWeight: '500' }}>efficiency boost</span>
              </span>
            </div>
          </div>

          {/* Card 3: Total Conversions */}
          <div className="panel" style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '10px', fontWeight: '800', color: 'var(--muted)', textTransform: 'uppercase' }}>Total Conversions</span>
              <Target size={15} style={{ color: 'var(--muted)' }} />
            </div>
            <div>
              <strong style={{ fontSize: '24px', fontWeight: '800', color: 'var(--text)' }}>84.2k</strong>
              <span style={{ fontSize: '11px', fontWeight: '750', color: 'var(--red)', display: 'block', marginTop: '4px' }}>
                -1.2% <span style={{ color: 'var(--muted)', fontWeight: '500' }}>conversion drop</span>
              </span>
            </div>
          </div>

          {/* Card 4: Opt-Out Rate */}
          <div className="panel" style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '10px', fontWeight: '800', color: 'var(--muted)', textTransform: 'uppercase' }}>Opt-Out Rate</span>
              <UserMinus size={15} style={{ color: 'var(--muted)' }} />
            </div>
            <div>
              <strong style={{ fontSize: '24px', fontWeight: '800', color: 'var(--text)' }}>0.42%</strong>
              <span style={{ fontSize: '11px', fontWeight: '750', color: 'var(--green)', display: 'block', marginTop: '4px' }}>
                -0.05% <span style={{ color: 'var(--muted)', fontWeight: '500' }}>retention improving</span>
              </span>
            </div>
          </div>

        </div>

        {/* Comparisons: Push vs SMS & WhatsApp vs Email */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr', mdGridTemplateColumns: '1fr 1fr', gap: '20px' }}>
          
          {/* Card 1: Push vs SMS */}
          <div className="panel" style={{ padding: 'var(--spacing-section)', display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3 style={{ fontSize: '14.5px', fontWeight: '850', color: 'var(--text)', margin: 0 }}>
                Push Notification vs. SMS
              </h3>
              <span style={{ fontSize: '10px', fontWeight: '900', color: '#059669', background: '#ecfdf5', padding: '3px 8px', borderRadius: '4px' }}>
                High Reliability
              </span>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <div style={{ background: '#f8fafc', padding: '12px', borderRadius: '8px' }}>
                <span style={{ fontSize: '11px', color: 'var(--muted)', display: 'block' }}>Push</span>
                <strong style={{ fontSize: '18px', display: 'block', margin: '4px 0 6px', color: 'var(--text)' }}>78.4% Open Rate</strong>
                <div style={{ height: '4px', background: '#e2e8f0', borderRadius: '2px', overflow: 'hidden' }}>
                  <div style={{ width: '78.4%', height: '100%', background: '#3b82f6' }} />
                </div>
                <span style={{ fontSize: '10px', color: 'var(--muted)', display: 'block', marginTop: '6px' }}>Cost/Msg: $0.001</span>
              </div>

              <div style={{ background: '#f8fafc', padding: '12px', borderRadius: '8px' }}>
                <span style={{ fontSize: '11px', color: 'var(--muted)', display: 'block' }}>SMS</span>
                <strong style={{ fontSize: '18px', display: 'block', margin: '4px 0 6px', color: 'var(--text)' }}>94.1% Open Rate</strong>
                <div style={{ height: '4px', background: '#e2e8f0', borderRadius: '2px', overflow: 'hidden' }}>
                  <div style={{ width: '94.1%', height: '100%', background: '#10b981' }} />
                </div>
                <span style={{ fontSize: '10px', color: 'var(--muted)', display: 'block', marginTop: '6px' }}>Cost/Msg: $0.008</span>
              </div>
            </div>

            {/* Comparison Table */}
            <div className="table-responsive-wrapper">
<table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px', textAlign: 'left', marginTop: '4px' }}>
              <thead>
                <tr style={{ borderBottom: '1.5px solid #25108f' }}>
                  <th style={{ padding: '8px 4px', color: 'var(--muted)', fontWeight: '800' }}>METRIC</th>
                  <th style={{ padding: '8px 4px', color: 'var(--primary)', fontWeight: '800' }}>PUSH</th>
                  <th style={{ padding: '8px 4px', color: '#10b981', fontWeight: '800' }}>SMS</th>
                </tr>
              </thead>
              <tbody>
                <tr style={{ borderBottom: '1px solid #f1f5f9' }}>
                  <td style={{ padding: '10px 4px', color: 'var(--muted)' }}>CTR</td>
                  <td style={{ padding: '10px 4px', fontWeight: '700' }}>12.4%</td>
                  <td style={{ padding: '10px 4px', fontWeight: '700' }}>18.9%</td>
                </tr>
                <tr style={{ borderBottom: '1px solid #f1f5f9' }}>
                  <td style={{ padding: '10px 4px', color: 'var(--muted)' }}>Conversion</td>
                  <td style={{ padding: '10px 4px', fontWeight: '700' }}>2.1%</td>
                  <td style={{ padding: '10px 4px', fontWeight: '700' }}>4.8%</td>
                </tr>
                <tr>
                  <td style={{ padding: '10px 4px', color: 'var(--muted)' }}>ROI</td>
                  <td style={{ padding: '10px 4px', fontWeight: '700' }}>14.2x</td>
                  <td style={{ padding: '10px 4px', fontWeight: '700' }}>9.1x</td>
                </tr>
              </tbody>
            </table>
</div>
          </div>

          {/* Card 2: WhatsApp vs Email */}
          <div className="panel" style={{ padding: 'var(--spacing-section)', display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3 style={{ fontSize: '14.5px', fontWeight: '850', color: 'var(--text)', margin: 0 }}>
                WhatsApp vs. Email
              </h3>
              <span style={{ fontSize: '10px', fontWeight: '900', color: '#dc2626', background: '#fee2e2', padding: '3px 8px', borderRadius: '4px' }}>
                High Engagement
              </span>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <div style={{ background: '#f8fafc', padding: '12px', borderRadius: '8px' }}>
                <span style={{ fontSize: '11px', color: 'var(--muted)', display: 'block' }}>WhatsApp</span>
                <strong style={{ fontSize: '18px', display: 'block', margin: '4px 0 6px', color: 'var(--text)' }}>62.2% Open Rate</strong>
                <div style={{ height: '4px', background: '#e2e8f0', borderRadius: '2px', overflow: 'hidden' }}>
                  <div style={{ width: '62.2%', height: '100%', background: '#3b82f6' }} />
                </div>
                <span style={{ fontSize: '10px', color: 'var(--muted)', display: 'block', marginTop: '6px' }}>Cost/Msg: $0.012</span>
              </div>

              <div style={{ background: '#f8fafc', padding: '12px', borderRadius: '8px' }}>
                <span style={{ fontSize: '11px', color: 'var(--muted)', display: 'block' }}>Email</span>
                <strong style={{ fontSize: '18px', display: 'block', margin: '4px 0 6px', color: 'var(--text)' }}>24.5% Open Rate</strong>
                <div style={{ height: '4px', background: '#e2e8f0', borderRadius: '2px', overflow: 'hidden' }}>
                  <div style={{ width: '24.5%', height: '100%', background: '#ef4444' }} />
                </div>
                <span style={{ fontSize: '10px', color: 'var(--muted)', display: 'block', marginTop: '6px' }}>Cost/Msg: $0.0005</span>
              </div>
            </div>

            {/* Comparison Table */}
            <div className="table-responsive-wrapper">
<table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px', textAlign: 'left', marginTop: '4px' }}>
              <thead>
                <tr style={{ borderBottom: '1.5px solid #25108f' }}>
                  <th style={{ padding: '8px 4px', color: 'var(--muted)', fontWeight: '800' }}>METRIC</th>
                  <th style={{ padding: '8px 4px', color: '#10b981', fontWeight: '800' }}>WHATSAPP</th>
                  <th style={{ padding: '8px 4px', color: '#ef4444', fontWeight: '800' }}>EMAIL</th>
                </tr>
              </thead>
              <tbody>
                <tr style={{ borderBottom: '1px solid #f1f5f9' }}>
                  <td style={{ padding: '10px 4px', color: 'var(--muted)' }}>Reply Rate</td>
                  <td style={{ padding: '10px 4px', fontWeight: '700' }}>14.2%</td>
                  <td style={{ padding: '10px 4px', fontWeight: '700' }}>0.8%</td>
                </tr>
                <tr style={{ borderBottom: '1px solid #f1f5f9' }}>
                  <td style={{ padding: '10px 4px', color: 'var(--muted)' }}>Click-to-Convert</td>
                  <td style={{ padding: '10px 4px', fontWeight: '700' }}>8.4%</td>
                  <td style={{ padding: '10px 4px', fontWeight: '700' }}>1.2%</td>
                </tr>
                <tr>
                  <td style={{ padding: '10px 4px', color: 'var(--muted)' }}>ROI</td>
                  <td style={{ padding: '10px 4px', fontWeight: '700' }}>8.2x</td>
                  <td style={{ padding: '10px 4px', fontWeight: '700' }}>22.4x</td>
                </tr>
              </tbody>
            </table>
</div>
          </div>

        </div>

        {/* Row 2: Timeline Chart & Channel Mix */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr', lgGridTemplateColumns: '2fr 1fr', gap: 'var(--spacing-section)', alignItems: 'stretch' }}>
          
          {/* Attribution Timeline (Left Column) */}
          <div className="panel" style={{ padding: 'var(--spacing-section)', display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <h3 style={{ fontSize: '15px', fontWeight: '850', color: 'var(--text)', margin: 0 }}>
                  Channel Attribution Timeline
                </h3>
                <span style={{ fontSize: '12px', color: 'var(--muted)', display: 'block', marginTop: '4px' }}>
                  Revenue attribution by touchpoint over the last 30 days.
                </span>
              </div>

              {/* Legend */}
              <div style={{ display: 'flex', gap: '12px', fontSize: '11px', fontWeight: '750' }}>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', color: 'var(--text)' }}>
                  <span style={{ height: '8px', width: '8px', borderRadius: '50%', background: 'var(--primary)' }} />
                  Push
                </span>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', color: 'var(--text)' }}>
                  <span style={{ height: '8px', width: '8px', borderRadius: '50%', background: '#10b981' }} />
                  SMS
                </span>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', color: 'var(--text)' }}>
                  <span style={{ height: '8px', width: '8px', borderRadius: '50%', background: '#9a3412' }} />
                  Email
                </span>
              </div>
            </div>

            {/* Custom Bar Graph Layout */}
            <div style={{ height: '170px', display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', borderBottom: '1.5px solid #25108f', paddingBottom: '8px', marginTop: '16px' }}>
              {[
                { hPush: 30, hSms: 40, hEmail: 15 },
                { hPush: 45, hSms: 30, hEmail: 20 },
                { hPush: 25, hSms: 55, hEmail: 10 },
                { hPush: 50, hSms: 20, hEmail: 25 },
                { hPush: 35, hSms: 60, hEmail: 30 },
                { hPush: 65, hSms: 40, hEmail: 15 },
                { hPush: 40, hSms: 35, hEmail: 20 },
                { hPush: 55, hSms: 45, hEmail: 10 },
                { hPush: 30, hSms: 50, hEmail: 25 }
              ].map((bar, i) => (
                <div key={i} style={{ width: '8%', height: '100%', display: 'flex', gap: '2px', alignItems: 'flex-end' }}>
                  <div style={{ width: '30%', height: `${bar.hPush}%`, background: 'var(--primary)', borderRadius: '1px 1px 0 0' }} />
                  <div style={{ width: '30%', height: `${bar.hSms}%`, background: '#10b981', borderRadius: '1px 1px 0 0' }} />
                  <div style={{ width: '30%', height: `${bar.hEmail}%`, background: '#9a3412', borderRadius: '1px 1px 0 0' }} />
                </div>
              ))}
            </div>

            {/* Bottom perform metrics summary row */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px', borderTop: '1px solid var(--lavender)', paddingTop: '16px', marginTop: '4px', textAlign: 'center' }}>
              <div>
                <span style={{ fontSize: '11px', color: 'var(--muted)', display: 'block' }}>Top Performer</span>
                <strong style={{ fontSize: '13px', color: 'var(--text)', display: 'block', marginTop: '3px' }}>SMS (94% Open)</strong>
              </div>
              <div>
                <span style={{ fontSize: '11px', color: 'var(--muted)', display: 'block' }}>Highest ROI</span>
                <strong style={{ fontSize: '13px', color: 'var(--text)', display: 'block', marginTop: '3px' }}>Email (22.4x)</strong>
              </div>
              <div>
                <span style={{ fontSize: '11px', color: 'var(--muted)', display: 'block' }}>Viral Coeff.</span>
                <strong style={{ fontSize: '13px', color: 'var(--text)', display: 'block', marginTop: '3px' }}>WhatsApp (1.2)</strong>
              </div>
            </div>

          </div>

          {/* Channel Mix (Right Column) */}
          <div className="panel" style={{ 
            background: 'linear-gradient(135deg, #0f0a40 0%, #1e106b 100%)', 
            color: '#fff', 
            padding: 'var(--spacing-section)', 
            display: 'flex', 
            flexDirection: 'column', 
            gap: '16px',
            borderRadius: '12px'
          }}>
            <div>
              <h3 style={{ fontSize: '14.5px', fontWeight: '850', margin: 0 }}>
                Channel Mix
              </h3>
              <p style={{ fontSize: '11px', color: '#c0b4fc', marginTop: '4px', margin: 0, lineHeight: '1.4' }}>
                Optimal allocation based on current ML models.
              </p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', flex: 1, marginTop: '8px' }}>
              {[
                { name: 'Direct Push', rate: 45, color: '#3b82f6' },
                { name: 'Transactional SMS', rate: 30, color: 'rgba(255, 255, 255, 0.4)' },
                { name: 'Newsletter Email', rate: 15, color: '#a855f7' },
                { name: 'Other', rate: 10, color: '#c084fc' }
              ].map((item, idx) => (
                <div key={idx} style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', fontWeight: '750' }}>
                    <span style={{ color: '#fff' }}>{item.name}</span>
                    <span style={{ color: '#fff' }}>{item.rate}%</span>
                  </div>
                  <div style={{ height: '6px', background: 'rgba(255, 255, 255, 0.1)', borderRadius: '3px', overflow: 'hidden' }}>
                    <div style={{ width: `${item.rate}%`, height: '100%', background: item.color }} />
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={() => alert('Adjusting channel budget... (simulation active)')}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                border: 'none',
                background: '#fff',
                color: 'var(--primary)',
                fontSize: '13px',
                fontWeight: '750',
                height: '38px',
                borderRadius: '6px',
                width: '100%',
                cursor: 'pointer',
                marginTop: '12px'
              }}
            >
              <Sliders size={14} />
              <span>Adjust Channel Budget</span>
            </button>
          </div>

        </div>

        {/* Cost Effectiveness Table (Row 3) */}
        <div className="panel" style={{ padding: 'var(--spacing-section)', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h3 style={{ fontSize: '15px', fontWeight: '850', color: 'var(--text)', margin: 0 }}>
              Channel Cost Effectiveness Analysis
            </h3>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', border: '1.5px solid #25108f', padding: '6px 12px', borderRadius: '6px', background: '#fff' }}>
                <Select
                  value={regionFilter}
                  onChange={(e) => setRegionFilter(e.target.value)}
                  style={{ border: 'none', background: 'transparent', outline: 'none', fontWeight: '700', fontSize: '12px', cursor: 'pointer', color: '#565365' }}
                  aria-label="Filter region"
                  options={[{
                    label: "Filter by Region",
                    value: "Filter by Region"
                  }, {
                    label: "North America",
                    value: "North America"
                  }, {
                    label: "EMEA",
                    value: "EMEA"
                  }, {
                    label: "APAC",
                    value: "APAC"
                  }]} />
              </div>
              <button style={{ border: 'none', background: 'transparent', cursor: 'pointer', color: 'var(--muted)' }} aria-label="More options" onClick={(e) => { e.preventDefault(); e.stopPropagation(); toast.success("Action performed successfully!"); }}>
                <MoreVertical size={16} />
              </button>
            </div>
          </div>

          <div style={{ overflowY: 'auto', maxHeight: '400px' }}>
            <div className="table-responsive-wrapper">
<table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px', textAlign: 'left', minWidth: '650px' }}>
              <thead>
                <tr style={{ background: 'var(--soft)', borderBottom: '1.5px solid #25108f' }}>
                  <th style={{ padding: '12px 16px', color: 'var(--muted)', fontWeight: '800', textTransform: 'uppercase', fontSize: '10px' }}>Channel Segment</th>
                  <th style={{ padding: '12px 16px', color: 'var(--muted)', fontWeight: '800', textTransform: 'uppercase', fontSize: '10px' }}>Messages Sent</th>
                  <th style={{ padding: '12px 16px', color: 'var(--muted)', fontWeight: '800', textTransform: 'uppercase', fontSize: '10px' }}>Cost Per Acquisition</th>
                  <th style={{ padding: '12px 16px', color: 'var(--muted)', fontWeight: '800', textTransform: 'uppercase', fontSize: '10px' }}>Gross Margin</th>
                  <th style={{ padding: '12px 16px', color: 'var(--muted)', fontWeight: '800', textTransform: 'uppercase', fontSize: '10px' }}>CLV (90D)</th>
                  <th style={{ padding: '12px 16px', color: 'var(--muted)', fontWeight: '800', textTransform: 'uppercase', fontSize: '10px', textAlign: 'right' }}>Channel Score</th>
                </tr>
              </thead>
              <tbody>
                <tr style={{ borderBottom: '1px solid var(--lavender)' }}>
                  <td style={{ padding: '16px' }}>
                    <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                      <div style={{ height: '30px', width: '30px', borderRadius: '6px', background: '#e0e7ff', color: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Zap size={14} />
                      </div>
                      <div>
                        <strong style={{ display: 'block', fontWeight: '800' }}>Push - Personalized</strong>
                        <span style={{ fontSize: '11px', color: 'var(--muted)' }}>Automated Triggered</span>
                      </div>
                    </div>
                  </td>
                  <td style={{ padding: '16px', fontWeight: '700' }}>1.2M</td>
                  <td style={{ padding: '16px', fontWeight: '700' }}>$0.14</td>
                  <td style={{ padding: '16px', fontWeight: '700' }}>68%</td>
                  <td style={{ padding: '16px', fontWeight: '700' }}>$412</td>
                  <td style={{ padding: '16px', textAlign: 'right' }}>
                    <span style={{ fontSize: '10px', fontWeight: '850', color: '#137333', background: '#e6f4ea', padding: '3px 8px', borderRadius: '4px' }}>9.8</span>
                  </td>
                </tr>

                <tr style={{ borderBottom: '1px solid var(--lavender)' }}>
                  <td style={{ padding: '16px' }}>
                    <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                      <div style={{ height: '30px', width: '30px', borderRadius: '6px', background: '#d1fae5', color: 'var(--green)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <MessageSquare size={14} />
                      </div>
                      <div>
                        <strong style={{ display: 'block', fontWeight: '800' }}>SMS - Flash Sale</strong>
                        <span style={{ fontSize: '11px', color: 'var(--muted)' }}>Manual Campaign</span>
                      </div>
                    </div>
                  </td>
                  <td style={{ padding: '16px', fontWeight: '700' }}>240k</td>
                  <td style={{ padding: '16px', fontWeight: '700' }}>$2.10</td>
                  <td style={{ padding: '16px', fontWeight: '700' }}>42%</td>
                  <td style={{ padding: '16px', fontWeight: '700' }}>$856</td>
                  <td style={{ padding: '16px', textAlign: 'right' }}>
                    <span style={{ fontSize: '10px', fontWeight: '850', color: 'var(--primary)', background: '#f4eff8', padding: '3px 8px', borderRadius: '4px' }}>7.2</span>
                  </td>
                </tr>

                <tr>
                  <td style={{ padding: '16px' }}>
                    <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                      <div style={{ height: '30px', width: '30px', borderRadius: '6px', background: '#fee2e2', color: '#ef4444', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Mail size={14} />
                      </div>
                      <div>
                        <strong style={{ display: 'block', fontWeight: '800' }}>Email - Re-engagement</strong>
                        <span style={{ fontSize: '11px', color: 'var(--muted)' }}>Lifecycle Flow</span>
                      </div>
                    </div>
                  </td>
                  <td style={{ padding: '16px', fontWeight: '700' }}>4.8M</td>
                  <td style={{ padding: '16px', fontWeight: '700' }}>$0.02</td>
                  <td style={{ padding: '16px', fontWeight: '700' }}>91%</td>
                  <td style={{ padding: '16px', fontWeight: '700' }}>$112</td>
                  <td style={{ padding: '16px', textAlign: 'right' }}>
                    <span style={{ fontSize: '10px', fontWeight: '850', color: 'var(--primary)', background: '#f4eff8', padding: '3px 8px', borderRadius: '4px' }}>8.4</span>
                  </td>
                </tr>
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


