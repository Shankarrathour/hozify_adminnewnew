import React, { useState } from 'react';
import { 
  Users, 
  UserCheck, 
  UserMinus, 
  ShieldAlert, 
  ArrowRight,
  TrendingUp,
  Download,
  MoreVertical
} from 'lucide-react';
import AdminShell from '../../components/layouts/AdminShell';
import { useDateFilter } from '../../contexts/DateFilterContext';
import DateFilter from '../../components/common/DateFilter';
import SkeletonLoader from '../../components/common/SkeletonLoader';
import EmptyState from '../../components/common/EmptyState';

export default function UserAnalytics({ activeTab = 'Dashboard' }) {
  const { preset, isFiltering, hasData } = useDateFilter();

  const kpis = [
    { title: "New Users", value: "2,842", subtitle: "this week", trend: "+12%", positive: true, icon: UserCheck, color: 'var(--green)', bg: "#ecfdf5" },
    { title: "Active Users", value: "48.2k", subtitle: "MAU", trend: "+5.2%", positive: true, icon: Users, color: 'var(--primary)', bg: "#f4eff8" },
    { title: "Inactive Users", value: "1,204", subtitle: "30d+ idle", trend: "-2.1%", positive: false, icon: UserMinus, color: "#b45309", bg: "#fffbeb" },
    { title: "Blocked Users", value: "156", subtitle: "manual + auto", trend: "Security Flag", alert: true, icon: ShieldAlert, color: 'var(--red)', bg: "#fee2e2" }
  ];

  const referringUsers = [
    { name: "Alex Morgan", role: "Premium Tier", count: 482, conv: "12.5%", initials: "AM", bg: "#eff6ff", text: "#1e40af" },
    { name: "Sarah Chen", role: "VIP Partner", count: 315, conv: "18.2%", initials: "SC", bg: "#fdf2f8", text: "#9d174d" },
    { name: "David Kimmich", role: "Regular User", count: 294, conv: "9.8%", initials: "DK", bg: "#fffbeb", text: "#b45309" }
  ];

  const blockedUsers = [
    { name: "unkn0wn_99", id: "B9901", reason: "Bot Behavior", date: "2h ago", color: "#fee2e2", txt: "#d32929" },
    { name: "spam_master_x", id: "B9904", reason: "Spamming", date: "5h ago", color: "#fffbeb", txt: "#b45309" },
    { name: "johnny_doe_88", id: "B9907", reason: "ToS Violation", date: "8h ago", color: "#eff6ff", txt: "#1e40af" }
  ];

  return (
    <AdminShell
      activeTab={activeTab}
      brandText="HOZIFY"
      brandSubText="Enterprise Admin"
      headerTitle="User Analytics"
      searchPlaceholder="Search user metrics, profiles, or logs..."
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-section)', padding: '24px 0' }}>
        
        {/* Title Block & Time Tabs */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px', position: 'relative', zIndex: 100 }}>
          <div>
            <h1 style={{ fontSize: '24px', fontWeight: '800', color: 'var(--text)', margin: 0 }}>
              User Analytics
            </h1>
            <p style={{ fontSize: '13px', color: 'var(--muted)', margin: '4px 0 0' }}>
              In-depth performance metrics and user behavior insights.
            </p>
          </div>

          <div style={{ display: 'flex', alignItems: 'center' }}>
            <DateFilter />
          </div>
        </div>

        {isFiltering ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-section)' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
              <SkeletonLoader height="120px" />
              <SkeletonLoader height="120px" />
              <SkeletonLoader height="120px" />
              <SkeletonLoader height="120px" />
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1.7fr 1fr', gap: '20px' }}>
              <SkeletonLoader height="280px" />
              <SkeletonLoader height="280px" />
            </div>
            <SkeletonLoader height="300px" />
          </div>
        ) : !hasData ? (
          <EmptyState />
        ) : (
          <>
        {/* KPI Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
          {kpis.map((kpi, idx) => {
            const IconComponent = kpi.icon;
            return (
              <div key={idx} className="panel" style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '10px', fontWeight: '800', color: 'var(--muted)', textTransform: 'uppercase' }}>
                    {kpi.title}
                  </span>
                  <div style={{ height: '32px', width: '32px', borderRadius: '50%', background: kpi.bg, color: kpi.color, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <IconComponent size={15} />
                  </div>
                </div>
                <div>
                  <strong style={{ fontSize: '26px', fontWeight: '850', color: 'var(--text)', display: 'block', letterSpacing: '-0.5px' }}>
                    {kpi.value}
                  </strong>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '6px', fontSize: '11px', fontWeight: '750' }}>
                    <span style={{ color: 'var(--muted)' }}>{kpi.subtitle}</span>
                    <span style={{ color: kpi.alert ? '#d32929' : (kpi.positive ? '#07956f' : '#d32929') }}>
                      {kpi.trend}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Charts & Attributions */}
        <div style={{ display: 'grid', gridTemplateColumns: '1.7fr 1fr', gap: '20px', alignItems: 'stretch' }}>
          
          {/* Growth & Retention Bar Chart */}
          <div className="panel" style={{ padding: 'var(--spacing-section)', display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h2 style={{ fontSize: '14px', fontWeight: '850', color: 'var(--text)', margin: 0 }}>Growth Trend & Retention</h2>
              <div style={{ display: 'flex', gap: '12px', fontSize: '11px', fontWeight: '700' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '4px', color: 'var(--text)' }}>
                  <span style={{ height: '8px', width: '8px', background: 'var(--primary)', borderRadius: '50%' }} />
                  New
                </span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '4px', color: 'var(--text)' }}>
                  <span style={{ height: '8px', width: '8px', background: '#94a3b8', borderRadius: '50%' }} />
                  Returning
                </span>
              </div>
            </div>

            {/* SVG Bars Column Chart */}
            <div style={{ height: '180px', borderBottom: '1.5px solid #25108f', display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', padding: '10px 10px 0' }}>
              {[
                { label: "Mon", new: 60, ret: 30 },
                { label: "Tue", new: 45, ret: 40 },
                { label: "Wed", new: 80, ret: 50 },
                { label: "Thu", new: 55, ret: 35 },
                { label: "Fri", new: 90, ret: 45 },
                { label: "Sat", new: 110, ret: 60 },
                { label: "Sun", new: 75, ret: 40 }
              ].map((item, idx) => (
                <div key={idx} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1 }}>
                  <div style={{ width: '30px', height: '140px', display: 'flex', alignItems: 'flex-end', gap: '2px', background: '#f8fafc', borderRadius: '4px' }}>
                    <div style={{ flex: 1, height: `${item.new}%`, background: 'var(--primary)', borderRadius: '2px 2px 0 0' }} />
                    <div style={{ flex: 1, height: `${item.ret}%`, background: '#c8c0d7', borderRadius: '2px 2px 0 0' }} />
                  </div>
                  <span style={{ fontSize: '11px', color: 'var(--muted)', fontWeight: '750', marginTop: '6px' }}>{item.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* User Source Analysis Attribution Donut */}
          <div className="panel" style={{ padding: 'var(--spacing-section)', display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <h2 style={{ fontSize: '14px', fontWeight: '850', color: 'var(--text)', margin: 0 }}>User Source Analysis</h2>

            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '130px', position: 'relative' }}>
              <div style={{
                height: '100px',
                width: '100px',
                borderRadius: '50%',
                border: '12px solid #25108f',
                borderTopColor: '#b45309',
                borderRightColor: '#64748b',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center'
              }}>
                <strong style={{ fontSize: '16px', fontWeight: '850', color: 'var(--text)' }}>100%</strong>
                <span style={{ fontSize: '8px', color: 'var(--muted)', fontWeight: '800' }}>Attribution</span>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '12px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '6px', fontWeight: '750' }}>
                  <span style={{ height: '8px', width: '8px', background: 'var(--primary)', borderRadius: '50%' }} />
                  Organic Search
                </span>
                <strong style={{ color: 'var(--text)' }}>45%</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '6px', fontWeight: '750' }}>
                  <span style={{ height: '8px', width: '8px', background: '#64748b', borderRadius: '50%' }} />
                  Referrals
                </span>
                <strong style={{ color: 'var(--text)' }}>30%</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '6px', fontWeight: '750' }}>
                  <span style={{ height: '8px', width: '8px', background: '#b45309', borderRadius: '50%' }} />
                  Social Media
                </span>
                <strong style={{ color: 'var(--text)' }}>25%</strong>
              </div>
            </div>
          </div>

        </div>

        {/* Campaign Performance bar comparisons */}
        <div className="panel" style={{ padding: 'var(--spacing-section)', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h2 style={{ fontSize: '14px', fontWeight: '850', color: 'var(--text)', margin: 0 }}>Campaign Performance</h2>
            <button
              onClick={() => alert("Downloading campaigns CSV reports...")}
              style={{ border: 'none', background: 'transparent', color: 'var(--primary)', fontSize: '12px', fontWeight: '800', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}
            >
              <span>Download CSV</span>
              <ArrowRight size={12} />
            </button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginTop: '10px' }}>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', fontWeight: '750', marginBottom: '6px' }}>
                <span style={{ color: 'var(--text)' }}>Summer Onboarding Drive</span>
                <span style={{ color: 'var(--muted)' }}>84% Target Achieved</span>
              </div>
              <div style={{ height: '8px', background: '#f4eff8', borderRadius: '4px', overflow: 'hidden' }}>
                <div style={{ width: '84%', height: '100%', background: 'var(--primary)' }} />
              </div>
            </div>

            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', fontWeight: '750', marginBottom: '6px' }}>
                <span style={{ color: 'var(--text)' }}>Influencer Referral Wave v2</span>
                <span style={{ color: 'var(--muted)' }}>62% Target Achieved</span>
              </div>
              <div style={{ height: '8px', background: '#f4eff8', borderRadius: '4px', overflow: 'hidden' }}>
                <div style={{ width: '62%', height: '100%', background: '#64748b' }} />
              </div>
            </div>
        </div>
        </div>

        {/* Referrers & Blocked Lists */}
        <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '20px', alignItems: 'stretch' }}>
          
          {/* Top Referring Users Table */}
          <div className="panel" style={{ padding: 'var(--spacing-section)', display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <h2 style={{ fontSize: '14px', fontWeight: '850', color: 'var(--text)', margin: 0 }}>Top Referring Users</h2>
              <MoreVertical onClick={() => alert("Options menu for Top Referring Users")} size={16} style={{ color: 'var(--muted)', cursor: 'pointer' }} />
            </div>

            <div className="table-wrap">
              <div className="table-responsive-wrapper">
<table style={{ width: '100%', minWidth: '500px', borderCollapse: 'collapse', fontSize: '13px', textAlign: 'left', tableLayout: 'fixed' }}>
                <thead>
                  <tr style={{ background: '#f4eff8', borderBottom: '1.5px solid #25108f' }}>
                    <th style={{ width: '50%', padding: '8px 6px', color: 'var(--muted)', fontWeight: '800', textTransform: 'uppercase', fontSize: '10px' }}>User</th>
                    <th style={{ width: '25%', padding: '8px 6px', color: 'var(--muted)', fontWeight: '800', textTransform: 'uppercase', fontSize: '10px' }}>Referrals</th>
                    <th style={{ width: '25%', padding: '8px 6px', color: 'var(--muted)', fontWeight: '800', textTransform: 'uppercase', fontSize: '10px', textAlign: 'right' }}>Conv.</th>
                  </tr>
                </thead>
                <tbody>
                  {referringUsers.map((item, idx) => (
                    <tr key={idx} style={{ borderBottom: '1px solid var(--lavender)' }}>
                      <td style={{ padding: '8px 6px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <div style={{ height: '28px', width: '28px', borderRadius: '50%', background: item.bg, color: item.text, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '10px', fontWeight: '850' }}>
                            {item.initials}
                          </div>
                          <div>
                            <strong style={{ display: 'block', color: 'var(--text)' }}>{item.name}</strong>
                            <span style={{ fontSize: '10px', color: 'var(--muted)' }}>{item.role}</span>
                          </div>
                        </div>
                      </td>
                      <td style={{ padding: '8px 6px', fontWeight: '750' }}>{item.count}</td>
                      <td style={{ padding: '8px 6px', fontWeight: '850', color: 'var(--green)', textAlign: 'right' }}>{item.conv}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
</div>
            </div>
          </div>

          {/* Recently Blocked User list */}
          <div className="panel" style={{ padding: 'var(--spacing-section)', display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <h2 style={{ fontSize: '14px', fontWeight: '850', color: 'var(--text)', margin: 0 }}>Recently Blocked</h2>
              <span style={{ fontSize: '11px', color: 'var(--muted)', fontWeight: '700' }}>Last 24 Hours</span>
            </div>

            <div className="table-wrap">
              <div className="table-responsive-wrapper">
<table style={{ width: '100%', minWidth: '500px', borderCollapse: 'collapse', fontSize: '12.5px', textAlign: 'left', tableLayout: 'fixed' }}>
                <thead>
                  <tr style={{ background: '#f4eff8', borderBottom: '1.5px solid #25108f' }}>
                    <th style={{ width: '35%', padding: '8px 6px', color: 'var(--muted)', fontWeight: '800', textTransform: 'uppercase', fontSize: '10px' }}>User</th>
                    <th style={{ width: '25%', padding: '8px 6px', color: 'var(--muted)', fontWeight: '800', textTransform: 'uppercase', fontSize: '10px' }}>Reason</th>
                    <th style={{ width: '25%', padding: '8px 6px', color: 'var(--muted)', fontWeight: '800', textTransform: 'uppercase', fontSize: '10px' }}>Date</th>
                    <th style={{ width: '15%', padding: '8px 6px', color: 'var(--muted)', fontWeight: '800', textTransform: 'uppercase', fontSize: '10px', textAlign: 'right' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {blockedUsers.map((item, idx) => (
                    <tr key={idx} style={{ borderBottom: '1px solid var(--lavender)' }}>
                      <td style={{ padding: '8px 6px' }}>
                        <strong style={{ display: 'block', color: 'var(--text)' }}>{item.name}</strong>
                        <span style={{ fontSize: '10px', color: 'var(--muted)' }}>ID: #{item.id}</span>
                      </td>
                      <td style={{ padding: '8px 6px' }}>
                        <span style={{
                          fontSize: '9px',
                          fontWeight: '850',
                          background: item.color,
                          color: item.txt,
                          padding: '2px 6px',
                          borderRadius: '4px'
                        }}>
                          {item.reason}
                        </span>
                      </td>
                      <td style={{ padding: '8px 6px', color: 'var(--muted)' }}>{item.date}</td>
                      <td style={{ padding: '8px 6px', textAlign: 'right' }}>
                        <button
                          onClick={() => alert(`Reviewing security flags log for ${item.name}`)}
                          style={{ border: 'none', background: 'transparent', color: 'var(--primary)', cursor: 'pointer', fontWeight: '800' }}
                        >
                          Review
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
</div>
            </div>
          </div>
        </div>
        </>
      )}
      </div>
    </AdminShell>
  );
}


