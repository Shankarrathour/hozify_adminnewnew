import React, { useState } from 'react';
import { 
  Calendar, 
  Download, 
  TrendingUp, 
  TrendingDown, 
  MapPin, 
  SlidersHorizontal, 
  RotateCcw,
  X,
  DollarSign
} from 'lucide-react';
import AdminShell from '../../components/layouts/AdminShell';

import Select from "../../components/ui/Select";

export default function RevenueDashboard({ activeTab = 'Revenue Management' }) {
  // Working filter states
  const [selectedRange, setSelectedRange] = useState('Last 30 Days');
  const [selectedCity, setSelectedCity] = useState('All Cities');
  const [showInsight, setShowInsight] = useState(true);
  
  // Is state se transactions dynamically filter hongi (Attention Required vs All)
  const [filterAttentionOnly, setFilterAttentionOnly] = useState(false);

  // Raw Master Datasets with City mappings
  const rawTransactions = [
    { id: "TXN-882910", name: "Global Logistics Ltd.", initials: "GL", gross: 1240.00, comm: 186.00, payout: 1054.00, status: "Settled", date: "May 24, 14:20", city: "New York" },
    { id: "TXN-882911", name: "HomeCare Solutions", initials: "HC", gross: 450.00, comm: 67.50, payout: 382.50, status: "Pending", date: "May 24, 15:45", city: "Los Angeles" },
    { id: "TXN-882912", name: "Swift Delivery Co.", initials: "SD", gross: 2800.00, comm: 420.00, payout: 2380.00, status: "Settled", date: "May 23, 10:12", city: "New York" },
    { id: "TXN-882913", name: "Urban Cleaning Inc.", initials: "UC", gross: 85.00, comm: 12.75, payout: 72.25, status: "Refunded", date: "May 23, 09:30", city: "Los Angeles" }
  ];

  // Advanced Filter Logic Handler (City + Sliders icon toggle status)
  const filteredTransactions = rawTransactions.filter(txn => {
    // 1. City Match Check
    const cityMatch = selectedCity === 'All Cities' ? true : txn.city === selectedCity;
    
    // 2. Filter Button (Attention Required: Pending/Refunded) Match Check
    const filterMatch = filterAttentionOnly ? (txn.status === 'Pending' || txn.status === 'Refunded') : true;
    
    return cityMatch && filterMatch;
  });

  // Dynamic Multiplier based on Timeframe context
  const getRangeMultiplier = () => {
    if (selectedRange === 'Last 7 Days') return 0.23;
    if (selectedRange === 'This Month') return 0.88;
    return 1.0; 
  };

  const m = getRangeMultiplier();

  // Dynamic KPIs calculations
  const kpis = [
    { title: "TODAY'S REVENUE", value: `$${(12482.00 * (m * 0.9 + 0.1)).toLocaleString('en-US', { maximumFractionDigits: 0 })}`, trend: "+8.2% from yesterday", positive: true, iconcolor: 'var(--primary)', iconBg: "#f4eff8" },
    { title: "WEEKLY REVENUE", value: `$${(84210.50 * m).toLocaleString('en-US', { maximumFractionDigits: 0 })}`, trend: "+12.4% from last week", positive: true, iconColor: "#047857", iconBg: "#ecfdf5" },
    { title: "MONTHLY REVENUE", value: `$${(328000.00 * m).toLocaleString('en-US', { maximumFractionDigits: 0 })}`, trend: "-2.1% from last month", positive: false, iconColor: "#b45309", iconBg: "#fffbeb" },
    { title: "YEARLY REVENUE", value: "$4.2M", trend: "+15% target completion", positive: true, iconColor: "#1e40af", iconBg: "#eff6ff" }
  ];

  // Client side native CSV Downloader
  const handleExportCSV = () => {
    const headers = ["Transaction ID", "Entity Name", "City", "Gross Amount", "Commission (15%)", "Net Payout", "Status", "Date"];
    const rows = filteredTransactions.map(t => [
      `#${t.id}`, t.name, t.city, t.gross, t.comm, t.payout, t.status, t.date
    ]);

    const csvContent = [headers, ...rows].map(e => e.join(",")).join("\n");
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `HOZIFY_Revenue_Report.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <AdminShell
      activeTab={activeTab}
      brandText="HOZIFY"
      brandSubText="Enterprise Admin"
      headerTitle="Revenue Analytics"
      searchPlaceholder="Search transactions, partners, or analytics..."
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-section)', padding: '24px 0', position: 'relative' }}>
        
        {/* Title & Filter Bar */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <h1 style={{ fontSize: '24px', fontWeight: '800', color: 'var(--text)', margin: 0 }}>
              Revenue Analytics
            </h1>
            <p style={{ fontSize: '13px', color: 'var(--muted)', margin: '4px 0 0' }}>
              Real-time financial performance and commission tracking.
            </p>
          </div>

          {/* Quick Filters */}
          <div style={{ display: 'flex', gap: '10px', alignItems: 'center', flexWrap: 'wrap' }}>
            {/* Calendar Selector */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', border: '1.5px solid #25108f', background: '#fff', padding: '6px 12px', borderRadius: '6px' }}>
              <Calendar size={14} style={{ color: 'var(--muted)' }} />
              <Select
                value={selectedRange}
                onChange={(e) => setSelectedRange(e.target.value)}
                style={{ border: 'none', background: 'transparent', outline: 'none', fontWeight: '700', fontSize: '13px', cursor: 'pointer', color: 'var(--text)' }}
                aria-label="Timeframe selection"
                options={[{
                  label: "Last 30 Days",
                  value: "Last 30 Days"
                }, {
                  label: "Last 7 Days",
                  value: "Last 7 Days"
                }, {
                  label: "This Month",
                  value: "This Month"
                }]} />
            </div>

            {/* City Dropdown Filter */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', border: '1.5px solid #25108f', background: '#fff', padding: '6px 12px', borderRadius: '6px' }}>
              <MapPin size={14} style={{ color: 'var(--muted)' }} />
              <Select
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
                style={{ border: 'none', background: 'transparent', outline: 'none', fontWeight: '700', fontSize: '13px', cursor: 'pointer', color: 'var(--text)' }}
                aria-label="City selection"
                options={[{
                  label: "All Cities",
                  value: "All Cities"
                }, {
                  label: "New York",
                  value: "New York"
                }, {
                  label: "Los Angeles",
                  value: "Los Angeles"
                }]} />
            </div>

            {/* CLICKABLE INTERACTIVE FILTER ICON */}
            <button 
              type="button"
              onClick={() => {
                setSelectedRange('Last 30 Days');
                setSelectedCity('All Cities');
                setFilterAttentionOnly(false);
              }}
              style={{ 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                border: (selectedCity !== 'All Cities' || selectedRange !== 'Last 30 Days' || filterAttentionOnly) ? '1px solid #d32929' : '1.5px solid #25108f', 
                background: (selectedCity !== 'All Cities' || selectedRange !== 'Last 30 Days' || filterAttentionOnly) ? '#fee2e2' : '#fff', 
                padding: '8px 12px', 
                borderRadius: '6px', 
                color: (selectedCity !== 'All Cities' || selectedRange !== 'Last 30 Days' || filterAttentionOnly) ? '#d32929' : 'var(--text)',
                cursor: 'pointer',
                transition: 'all 0.15s ease'
              }}
              title="Reset all filters"
            >
              <RotateCcw size={14} />
            </button>
          </div>
        </div>

        {/* 4 KPI Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
          {kpis.map((kpi, idx) => (
            <div key={idx} className="panel" style={{ padding: 'var(--spacing-section)', display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '11px', fontWeight: '800', color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                  {kpi.title}
                </span>
                <div style={{ height: '32px', width: '32px', borderRadius: '50%', background: kpi.iconBg, color: kpi.iconColor, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <DollarSign size={16} />
                </div>
              </div>
              <div>
                <strong style={{ fontSize: '26px', fontWeight: '850', color: 'var(--text)', display: 'block', letterSpacing: '-0.5px' }}>
                  {kpi.value}
                </strong>
                <span style={{ fontSize: '12px', fontWeight: '750', color: kpi.positive ? '#07956f' : '#d32929', display: 'inline-flex', alignItems: 'center', gap: '4px', marginTop: '4px' }}>
                  {kpi.positive ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
                  {kpi.trend}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Charts Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '1.7fr 1fr', gap: '20px', alignItems: 'stretch' }}>
          <div className="panel" style={{ padding: 'var(--spacing-section)', display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <h2 style={{ fontSize: '14px', fontWeight: '850', color: 'var(--text)', margin: 0 }}>Revenue Growth Trend</h2>
                <span style={{ fontSize: '11px', color: 'var(--muted)' }}>Daily aggregated revenue across sectors ({selectedRange}).</span>
              </div>
            </div>

            <div style={{ height: '220px', position: 'relative', borderBottom: '1.5px solid #25108f', display: 'flex', alignItems: 'flex-end', marginTop: '20px' }}>
              <svg width="100%" height="100%" viewBox="0 0 500 150" preserveAspectRatio="none" style={{ overflow: 'visible' }}>
                <path d={`M 0 ${140 - (30 * m)} C 80 ${130 - (10 * m)}, 150 ${110 - (20 * m)}, 250 ${90 - (10 * m)} C 350 ${80 - (10 * m)}, 420 30, 500 15`} fill="none" stroke="#25108f" strokeWidth="3" strokeLinecap="round" />
                <path d={`M 0 ${140 - (30 * m)} C 80 ${130 - (10 * m)}, 150 ${110 - (20 * m)}, 250 ${90 - (10 * m)} C 350 ${80 - (10 * m)}, 420 30, 500 15 L 500 150 L 0 150 Z`} fill="url(#grad)" opacity="0.1" />
                <defs>
                  <linearGradient id="grad" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#25108f" />
                    <stop offset="100%" stopColor="#fff" />
                  </linearGradient>
                </defs>
              </svg>
              <div style={{ position: 'absolute', bottom: '-24px', left: 0, right: 0, display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: 'var(--muted)', fontWeight: '750' }}>
                <span>01 May</span><span>08 May</span><span>15 May</span><span>22 May</span><span>30 May</span>
              </div>
            </div>
          </div>

          {/* Seller Distribution */}
          <div className="panel" style={{ padding: 'var(--spacing-section)', display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <h2 style={{ fontSize: '14px', fontWeight: '850', color: 'var(--text)', margin: 0 }}>Seller Distribution</h2>
            <div style={{ display: 'flex', justifyContent: 'center', position: 'relative', height: '140px', alignItems: 'center' }}>
              <div style={{ height: '110px', width: '110px', borderRadius: '50%', border: '14px solid #25108f', borderTopColor: '#c8c0d7', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                <strong style={{ fontSize: '18px', fontWeight: '850', color: 'var(--primary)' }}>82%</strong>
                <span style={{ fontSize: '9px', fontWeight: '800', color: 'var(--muted)', textTransform: 'uppercase' }}>Top Tier</span>
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '12px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '6px', fontWeight: '750' }}><span style={{ height: '8px', width: '8px', background: 'var(--primary)', borderRadius: '50%' }} />Enterprise</span>
                <strong style={{ color: 'var(--text)' }}>${(210 * m).toFixed(0)}K</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '6px', fontWeight: '750' }}><span style={{ height: '8px', width: '8px', background: '#a855f7', borderRadius: '50%' }} />Mid-Market</span>
                <strong style={{ color: 'var(--text)' }}>${(94 * m).toFixed(0)}K</strong>
              </div>
            </div>
          </div>
        </div>

        {/* Transaction Breakdown Table Panel */}
        <div className="panel" style={{ padding: 'var(--spacing-section)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <h2 style={{ fontSize: '14px', fontWeight: '850', color: 'var(--text)', margin: 0 }}>Transaction Breakdown</h2>
              {(selectedCity !== 'All Cities' || filterAttentionOnly) && (
                <span style={{ fontSize: '10px', fontWeight: '800', background: filterAttentionOnly ? '#fee2e2' : '#f4eff8', color: filterAttentionOnly ? '#d32929' : '#25108f', padding: '2px 6px', borderRadius: '4px' }}>
                  {filterAttentionOnly ? "Attention Needed" : ""} {selectedCity !== 'All Cities' ? `(${selectedCity})` : ""}
                </span>
              )}
            </div>
            
            <button
              type="button"
              onClick={handleExportCSV}
              style={{ border: '1.5px solid #25108f', background: '#fff', padding: '6px 12px', borderRadius: '4px', fontSize: '11px', fontWeight: '800', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--text)' }}
            >
              <Download size={12} />
              <span>Export CSV</span>
            </button>
          </div>

          <div className="table-wrap">
            <div className="table-responsive-wrapper">
<table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12.5px', textAlign: 'left' }}>
                <thead>
                  <tr style={{ background: '#f4eff8', borderBottom: '1.5px solid #25108f' }}>
                    <th style={{ padding: '10px 12px', color: 'var(--muted)', fontWeight: '800', fontSize: '10px' }}>Transaction ID</th>
                    <th style={{ padding: '10px 12px', color: 'var(--muted)', fontWeight: '800', fontSize: '10px' }}>Entity Name</th>
                    <th style={{ padding: '10px 12px', color: 'var(--muted)', fontWeight: '800', fontSize: '10px' }}>City</th>
                    <th style={{ padding: '10px 12px', color: 'var(--muted)', fontWeight: '800', fontSize: '10px' }}>Gross Amount</th>
                    <th style={{ padding: '10px 12px', color: 'var(--muted)', fontWeight: '800', fontSize: '10px' }}>Commission</th>
                    <th style={{ padding: '10px 12px', color: 'var(--muted)', fontWeight: '800', fontSize: '10px' }}>Net Payout</th>
                    <th style={{ padding: '10px 12px', color: 'var(--muted)', fontWeight: '800', fontSize: '10px' }}>Status</th>
                    <th style={{ padding: '10px 12px', color: 'var(--muted)', fontWeight: '800', fontSize: '10px', textAlign: 'right' }}>Date</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredTransactions.length > 0 ? (
                    filteredTransactions.map((txn, i) => (
                      <tr key={i} style={{ borderBottom: '1px solid var(--lavender)' }}>
                        <td style={{ padding: '12px', fontWeight: '750', color: 'var(--primary)' }}>#{txn.id}</td>
                        <td style={{ padding: '12px' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <div style={{ height: '26px', width: '26px', borderRadius: '50%', background: '#f4eff8', color: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '9px', fontWeight: '850' }}>{txn.initials}</div>
                            <strong style={{ color: 'var(--text)' }}>{txn.name}</strong>
                          </div>
                        </td>
                        <td style={{ padding: '12px', color: 'var(--muted)', fontWeight: '600' }}>{txn.city}</td>
                        <td style={{ padding: '12px', fontWeight: '650' }}>${txn.gross.toLocaleString()}</td>
                        <td style={{ padding: '12px', fontWeight: '850', color: 'var(--primary)' }}>${txn.comm.toLocaleString()}</td>
                        <td style={{ padding: '12px', fontWeight: '650' }}>${txn.payout.toLocaleString()}</td>
                        <td style={{ padding: '12px' }}>
                          <span style={{
                            fontSize: '9px',
                            fontWeight: '850',
                            background: txn.status === 'Settled' ? '#ecfdf5' : txn.status === 'Pending' ? '#fffbeb' : '#fee2e2',
                            color: txn.status === 'Settled' ? '#07956f' : txn.status === 'Pending' ? '#b45309' : '#d32929',
                            padding: '2px 6px',
                            borderRadius: '4px'
                          }}>{txn.status}</span>
                        </td>
                        <td style={{ padding: '12px', textAlign: 'right', color: 'var(--muted)' }}>{txn.date}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={8} style={{ padding: 'var(--spacing-page)', textAlign: 'center', color: 'var(--muted)', fontStyle: 'italic' }}>
                        No mismatch criteria items found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
</div>
          </div>
        </div>

        {/* Floating Insight Alert */}
        {showInsight && (
          <div style={{ position: 'fixed', bottom: '24px', right: '24px', background: 'linear-gradient(135deg, #1e1b4b 0%, #31108f 100%)', color: '#fff', borderRadius: '8px', padding: '14px 20px', display: 'flex', alignItems: 'center', gap: '12px', boxShadow: '0 10px 25px rgba(37, 16, 143, 0.25)', zIndex: 99, maxWidth: '380px' }}>
            <div style={{ flex: 1 }}>
              <strong style={{ fontSize: '11px', color: '#c084fc' }}>PERFORMANCE SUMMARY</strong>
              <span style={{ fontSize: '12.5px', marginTop: '2px', display: 'block' }}>Filters dynamically isolate transaction anomalies instantly.</span>
            </div>
            <button type="button" onClick={() => setShowInsight(false)} style={{ border: 'none', background: 'transparent', color: '#c7d2fe', cursor: 'pointer' }}><X size={14} /></button>
          </div>
        )}
      </div>
    </AdminShell>
  );
}


