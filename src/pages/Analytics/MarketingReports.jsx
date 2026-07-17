import React, { useState, useRef, useEffect, useCallback } from 'react';
import ReactDOM from 'react-dom';
import AdminShell from '../../components/layouts/AdminShell';
import { useToast } from '../../components/common/ToastNotification';
import {
  Download,
  ChevronDown,
  TrendingUp,
  TrendingDown,
  Filter,
  Users,
  Eye,
  MousePointerClick,
  Activity,
  AlertTriangle,
  Info,
  ShieldAlert,
  ArrowRight,
  Calendar
} from 'lucide-react';
import { DateRange } from 'react-date-range';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import { format, subDays } from 'date-fns';

/* ─────────────── STATIC DATA ─────────────── */
const KPI_CARDS = [
  { id: 'referrals', label: 'Total Referrals', value: '12,482', growth: '+14.2%', isPositive: true, sub: 'vs last month', icon: Users, iconColor: '#4f46e5', iconBg: '#eef2ff' },
  { id: 'conversion', label: 'Conversion Rate', value: '28.4%', growth: '+2.1%', isPositive: true, sub: 'vs last month', icon: Activity, iconColor: '#10b981', iconBg: '#ecfdf5' },
  { id: 'impressions', label: 'Total Impressions', value: '4.2M', growth: '', isPositive: true, sub: '98% of quarterly target', icon: Eye, iconColor: '#0ea5e9', iconBg: '#e0f2fe' },
  { id: 'ctr', label: 'Average CTR', value: '3.82%', growth: '+0.4%', isPositive: true, sub: 'Improvement', icon: MousePointerClick, iconColor: '#8b5cf6', iconBg: '#f5f3ff' }
];

const REVENUE_DATA = [
  { month: 'Jan', val: 120 }, { month: 'Feb', val: 180 }, { month: 'Mar', val: 150 },
  { month: 'Apr', val: 240 }, { month: 'May', val: 210 }, { month: 'Jun', val: 290 },
  { month: 'Jul', val: 260 }, { month: 'Aug', val: 320 }, { month: 'Sep', val: 290 },
  { month: 'Oct', val: 380 }, { month: 'Nov', val: 340 }, { month: 'Dec', val: 410 }
];

const FUNNEL_DATA = [
  { label: 'SENT', value: '12,482', pct: 100 },
  { label: 'CLICKED', value: '8,940', pct: 71 },
  { label: 'SIGNED UP', value: '4,120', pct: 33 },
  { label: 'CONVERTED', value: '3,542', pct: 28 }
];

const ACTIVE_CAMPAIGNS = [
  { id: '1', name: 'Summer Banner Blast', type: 'Display', status: 'Active', imp: '1,240,500', ctr: '4.2%', roi: '3.2x' },
  { id: '2', name: 'Q3 Referral Program', type: 'Referral', status: 'Active', imp: '450,200', ctr: '8.5%', roi: '5.1x' },
  { id: '3', name: 'Flash Sale Retargeting', type: 'Banner', status: 'Paused', imp: '890,000', ctr: '2.1%', roi: '1.8x' },
  { id: '4', name: 'Influencer Launch', type: 'Referral', status: 'Active', imp: '312,900', ctr: '12.2%', roi: '7.4x' }
];

const TRAFFIC_SOURCES = [
  { label: 'Banner Ads', pct: 62 },
  { label: 'Referrals', pct: 28 },
  { label: 'Direct', pct: 10 }
];

const REFERRAL_SOURCES = [
  { source: 'Email Direct', type: '@', color: '#8b5cf6', ref: '4,821', cr: '32.1%', val: '$12,400' },
  { source: 'Social Links', type: '<', color: '#3b82f6', ref: '3,140', cr: '24.5%', val: '$8,920' },
  { source: 'Partner Portal', type: 'P', color: '#ef4444', ref: '2,945', cr: '41.8%', val: '$15,290' },
  { source: 'Offline QR', type: 'QR', color: '#64748b', ref: '1,576', cr: '18.2%', val: '$4,120' }
];

const ANOMALIES = [
  { id: 1, title: 'IP Cluster Attack', desc: '42 signups from 185.x.x.x in 3 minutes. Accounts blocked for review.', type: 'critical', action: 'Review' },
  { id: 2, title: 'Cyclic Referral Chain', desc: 'Circular referral pattern detected between user_891 and user_442.', type: 'warning', action: 'Dismiss' },
  { id: 3, title: 'High Reward Velocity', desc: 'User "j_smith_92" exceeded $500 monthly reward cap.', type: 'info', action: 'Investigate' }
];

/* ─────────────── SUB-COMPONENTS ─────────────── */
function StatusBadge({ status }) {
  const isAct = status === 'Active';
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: '4px',
      background: isAct ? '#ecfdf5' : '#fffbeb', color: isAct ? '#059669' : '#d97706',
      fontSize: '11px', fontWeight: '600', padding: '3px 8px', borderRadius: '20px'
    }}>
      <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: isAct ? '#10b981' : '#f59e0b' }} />
      {status}
    </span>
  );
}

function SourceIcon({ type, color }) {
  return (
    <div style={{
      width: '28px', height: '28px', borderRadius: '8px',
      background: color + '20', color: color,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontSize: '12px', fontWeight: '700'
    }}>
      {type}
    </div>
  );
}

/* ─────────────── MAIN PAGE ─────────────── */
export default function MarketingReports() {
  const { addToast } = useToast();
  const maxRev = Math.max(...REVENUE_DATA.map(d => d.val));

  // Date Range Picker state
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [calendarPos, setCalendarPos] = useState({ top: 0, left: 0 });
  const datePickerRef = useRef(null);
  const [dateRange, setDateRange] = useState([
    {
      startDate: subDays(new Date(), 29),
      endDate: new Date(),
      key: 'selection'
    }
  ]);

  const handleDateTriggerClick = useCallback(() => {
    if (datePickerRef.current) {
      const rect = datePickerRef.current.getBoundingClientRect();
      setCalendarPos({
        top: rect.bottom + window.scrollY + 8,
        left: rect.left + window.scrollX
      });
    }
    setShowDatePicker(prev => !prev);
  }, []);

  useEffect(() => {
    if (!showDatePicker) return;
    const handler = (e) => {
      if (datePickerRef.current && datePickerRef.current.contains(e.target)) return;
      const portal = document.getElementById('marketing-date-portal');
      if (portal && portal.contains(e.target)) return;
      setShowDatePicker(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [showDatePicker]);

  const dateLabel = `${format(dateRange[0].startDate, 'MMM d, yyyy')} – ${format(dateRange[0].endDate, 'MMM d, yyyy')}`;

  return (
    <AdminShell activeTab="Reports & Analytics" searchPlaceholder="Search campaigns..." headerTitle="Marketing Reports">
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', fontFamily: "'Inter', sans-serif" }}>

        {/* HEADER */}
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
          <div>
            <h1 style={{ fontSize: '22px', fontWeight: '700', color: '#0f172a', margin: 0, lineHeight: 1.3 }}>Marketing Reports</h1>
            <p style={{ margin: '4px 0 0', color: '#64748b', fontSize: '13px' }}>Real-time analysis of banner and referral network ROI.</p>
          </div>
          <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
            {/* Date Range Picker Trigger */}
            <button
              ref={datePickerRef}
              type="button"
              onClick={handleDateTriggerClick}
              style={{ display: 'flex', alignItems: 'center', gap: '6px', background: '#fff', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '8px 12px', fontSize: '13px', fontWeight: '600', color: '#334155', cursor: 'pointer' }}
            >
              <Calendar size={14} color="#64748b" />
              {dateLabel} <ChevronDown size={14} color="#64748b" />
            </button>
            <button type="button" onClick={() => addToast('Opening Filters...', 'info')} style={{ display: 'flex', alignItems: 'center', gap: '6px', background: '#fff', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '8px 12px', fontSize: '13px', fontWeight: '600', color: '#334155', cursor: 'pointer' }}>
              <Filter size={14} color="#64748b" /> Filters
            </button>
          </div>
        </div>

        {/* KPIs */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px' }}>
          {KPI_CARDS.map(card => {
            const Icon = card.icon;
            return (
              <div
                key={card.id}
                className="report-kpi-card"
                style={{ background: '#fff', borderRadius: '12px', padding: '16px 20px', display: 'flex', flexDirection: 'column', gap: '10px' }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '11px', fontWeight: '600', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.5px' }}>{card.label}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'flex-end', gap: '8px' }}>
                  <span style={{ fontSize: '24px', fontWeight: '800', color: '#0f172a', lineHeight: 1 }}>{card.value}</span>
                  {card.growth && (
                    <span style={{ display: 'flex', alignItems: 'center', gap: '2px', fontSize: '12px', fontWeight: '700', lineHeight: 1, marginBottom: '2px', color: card.isPositive ? '#10b981' : '#ef4444' }}>
                      {card.isPositive ? <TrendingUp size={12} /> : <TrendingDown size={12} />}{card.growth}
                    </span>
                  )}
                </div>
                <span style={{ fontSize: '11.5px', color: '#94a3b8' }}>{card.sub}</span>
              </div>
            );
          })}
        </div>

        {/* ROW 1: Charts */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: '16px', alignItems: 'start' }}>

          {/* Revenue Trend */}
          <div style={{ background: '#fff', borderRadius: '12px', border: '1px solid #e2e8f0', padding: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '24px' }}>
              <div>
                <h2 style={{ margin: '0 0 4px', fontSize: '12px', fontWeight: '700', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Aggregate Revenue Trend</h2>
                <div style={{ fontSize: '24px', fontWeight: '800', color: '#0f172a' }}>$412,890.44</div>
              </div>
              <div style={{ background: '#ecfdf5', color: '#10b981', padding: '4px 8px', borderRadius: '6px', fontSize: '12px', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '4px' }}>
                <TrendingUp size={14} /> +14.2%
              </div>
            </div>

            {/* Chart Simulation */}
            <div style={{ display: 'flex', gap: '4px', alignItems: 'flex-end', height: '180px' }}>
              {REVENUE_DATA.map((d, i) => {
                const pct = (d.val / maxRev) * 100;
                const isHighlight = i === 5 || i === 8;
                return (
                  <div key={d.month} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', height: '100%', justifyContent: 'flex-end' }}>
                    <div style={{ width: '100%', height: `${pct}%`, background: isHighlight ? '#1e1b4b' : '#f1f5f9', borderRadius: '4px 4px 0 0' }} />
                  </div>
                );
              })}
            </div>
          </div>

          {/* Referral Funnel */}
          <div style={{ background: '#fff', borderRadius: '12px', border: '1px solid #e2e8f0', padding: '20px', height: '100%' }}>
            <h2 style={{ margin: '0 0 20px', fontSize: '15px', fontWeight: '700', color: '#0f172a' }}>Referral Funnel</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
              {FUNNEL_DATA.map(step => (
                <div key={step.label}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                    <span style={{ fontSize: '11px', fontWeight: '600', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.5px' }}>{step.label}</span>
                    <span style={{ fontSize: '12px', fontWeight: '700', color: '#0f172a' }}>{step.value}</span>
                  </div>
                  <div style={{ height: '12px', background: '#f1f5f9', borderRadius: '2px' }}>
                    <div style={{ height: '100%', width: `${step.pct}%`, background: '#1e1b4b', borderRadius: '2px' }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ROW 2: Tables & Insights */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: '16px', alignItems: 'start' }}>

          {/* Active Campaigns Table */}
          <div style={{ background: '#fff', borderRadius: '12px', border: '1px solid #e2e8f0', padding: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h2 style={{ margin: 0, fontSize: '15px', fontWeight: '700', color: '#0f172a' }}>Active Campaigns</h2>
              <span onClick={() => addToast('Opening all campaigns...', 'info')} style={{ fontSize: '12px', fontWeight: '600', color: '#4f46e5', cursor: 'pointer' }}>View All →</span>
            </div>

            <div style={{ overflowX: 'auto' }}>
              <div className="table-responsive-wrapper">
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
                  <thead>
                    <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
                      {['Campaign Name', 'Type', 'Status', 'Impressions', 'CTR', 'ROI'].map(col => (
                        <th key={col} style={{ padding: '10px 8px', textAlign: 'left', fontSize: '11px', fontWeight: '600', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.5px' }}>{col}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {ACTIVE_CAMPAIGNS.map((row, i) => (
                      <tr key={row.id} style={{ borderBottom: i < ACTIVE_CAMPAIGNS.length - 1 ? '1px solid #f1f5f9' : 'none' }}>
                        <td style={{ padding: '14px 8px' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <div style={{ width: '28px', height: '28px', background: '#f1f5f9', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                              <Activity size={14} color="#64748b" />
                            </div>
                            <span style={{ fontWeight: '600', color: '#0f172a' }}>{row.name}</span>
                          </div>
                        </td>
                        <td style={{ padding: '14px 8px', color: '#64748b' }}>{row.type}</td>
                        <td style={{ padding: '14px 8px' }}><StatusBadge status={row.status} /></td>
                        <td style={{ padding: '14px 8px', fontWeight: '600', color: '#334155' }}>{row.imp}</td>
                        <td style={{ padding: '14px 8px', fontWeight: '600', color: '#334155' }}>{row.ctr}</td>
                        <td style={{ padding: '14px 8px', fontWeight: '700', color: '#0f172a' }}>{row.roi}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Traffic Source */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ background: '#fff', borderRadius: '12px', border: '1px solid #e2e8f0', padding: '20px' }}>
              <h2 style={{ margin: '0 0 16px', fontSize: '11px', fontWeight: '600', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Traffic Source</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {TRAFFIC_SOURCES.map(src => (
                  <div key={src.label}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                      <span style={{ fontSize: '12px', fontWeight: '500', color: '#334155' }}>{src.label}</span>
                      <span style={{ fontSize: '12px', fontWeight: '700', color: '#0f172a' }}>{src.pct}%</span>
                    </div>
                    <div style={{ height: '4px', background: '#f1f5f9', borderRadius: '2px' }}>
                      <div style={{ width: `${src.pct}%`, height: '100%', background: '#1e1b4b', borderRadius: '2px' }} />
                    </div>
                  </div>
                ))}
              </div>

              <div style={{ marginTop: '20px', background: '#1e1b4b', borderRadius: '8px', padding: '16px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <span style={{ fontSize: '12px', color: '#fff', fontWeight: '500' }}>Referral efficiency is up</span>
                <span style={{ fontSize: '16px', color: '#818cf8', fontWeight: '700' }}>+22% this week</span>
              </div>
            </div>
          </div>
        </div>

        {/* ROW 3: Top Sources & Anomalies */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: '16px', alignItems: 'start' }}>

          {/* Top Referral Sources Table */}
          <div style={{ background: '#fff', borderRadius: '12px', border: '1px solid #e2e8f0', padding: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h2 style={{ margin: 0, fontSize: '15px', fontWeight: '700', color: '#0f172a' }}>Referral Sources</h2>
              <span onClick={() => addToast('Opening all referral sources...', 'info')} style={{ fontSize: '12px', fontWeight: '600', color: '#4f46e5', cursor: 'pointer' }}>View All →</span>
            </div>

            <div className="table-responsive-wrapper">
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
                    {['Source', 'Referrals', 'CR%', 'Value'].map(col => (
                      <th key={col} style={{ padding: '10px 8px', textAlign: 'left', fontSize: '11px', fontWeight: '600', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.5px' }}>{col}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {REFERRAL_SOURCES.map((row, i) => (
                    <tr key={row.source} style={{ borderBottom: i < REFERRAL_SOURCES.length - 1 ? '1px solid #f1f5f9' : 'none' }}>
                      <td style={{ padding: '14px 8px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                          <SourceIcon type={row.type} color={row.color} />
                          <span style={{ fontWeight: '600', color: '#0f172a' }}>{row.source}</span>
                        </div>
                      </td>
                      <td style={{ padding: '14px 8px', fontWeight: '600', color: '#334155' }}>{row.ref}</td>
                      <td style={{ padding: '14px 8px', fontWeight: '600', color: '#334155' }}>{row.cr}</td>
                      <td style={{ padding: '14px 8px', fontWeight: '700', color: '#0f172a' }}>{row.val}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Anomalies Detected */}
          <div style={{ background: '#fff', borderRadius: '12px', border: '1px solid #fca5a5', padding: '20px', position: 'relative', overflow: 'hidden' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <h2 style={{ margin: 0, fontSize: '15px', fontWeight: '700', color: '#991b1b' }}>Anomalies Detected</h2>
              <span style={{ background: '#ef4444', color: '#fff', fontSize: '10px', fontWeight: '700', padding: '2px 8px', borderRadius: '4px', textTransform: 'uppercase' }}>Critical</span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {ANOMALIES.map(anom => (
                <div key={anom.id} style={{ display: 'flex', gap: '12px', padding: '12px', background: anom.type === 'critical' ? '#fef2f2' : '#f8fafc', borderRadius: '8px', border: anom.type === 'critical' ? '1px solid #fecaca' : '1px solid #e2e8f0' }}>
                  <div style={{ paddingTop: '2px' }}>
                    {anom.type === 'critical' ? <AlertTriangle size={16} color="#ef4444" /> : <Info size={16} color="#64748b" />}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontSize: '12px', fontWeight: '600', color: '#64748b' }}>System Action:</span>
                      <span onClick={() => addToast(`Executing action: ${anom.action}`, 'success')} style={{ fontSize: '11px', fontWeight: '600', color: anom.type === 'critical' ? '#ef4444' : '#64748b', cursor: 'pointer' }}>{anom.action}</span>
                    </div>
                    <p style={{ margin: 0, fontSize: '12px', color: anom.type === 'critical' ? '#b91c1c' : '#475569', lineHeight: 1.4 }}>
                      {anom.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>

      {/* DateRange Portal — renders outside all containers to avoid clipping */}
      {showDatePicker && ReactDOM.createPortal(
        <div
          id="marketing-date-portal"
          style={{
            position: 'fixed',
            top: calendarPos.top,
            left: calendarPos.left,
            zIndex: 99999,
            boxShadow: '0 8px 32px rgba(0,0,0,0.18)',
            borderRadius: '12px',
            overflow: 'hidden',
            background: '#fff',
            border: '1.5px solid #e5e7eb'
          }}
        >
          <DateRange
            editableDateInputs={true}
            onChange={item => setDateRange([item.selection])}
            moveRangeOnFirstSelection={false}
            ranges={dateRange}
            rangeColors={['#25108f']}
          />
          <div style={{ padding: '12px 16px', borderTop: '1px solid #eee', background: '#f9f9f9', display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
            <button
              onClick={() => setShowDatePicker(false)}
              style={{ padding: '6px 14px', background: '#fff', color: '#25108f', border: '1.5px solid #25108f', borderRadius: '6px', cursor: 'pointer', fontSize: '12px', fontWeight: '700' }}
              type="button"
            >
              Cancel
            </button>
            <button
              onClick={() => setShowDatePicker(false)}
              style={{ padding: '6px 16px', background: '#25108f', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '12px', fontWeight: '700' }}
              type="button"
            >
              Apply Range
            </button>
          </div>
        </div>,
        document.body
      )}
    </AdminShell>
  );
}
