import React, { useState } from 'react';
import {
  FileText,
  BarChart3,
  MousePointerClick,
  DollarSign,
  Download,
  Calendar,
  Layers,
  Database,
  Search,
  Plus,
  RefreshCw,
  Clock,
  ExternalLink,
  ChevronDown
} from 'lucide-react';
import AdminShell from '../../components/layouts/AdminShell';

import Select from "../../components/ui/Select";

export default function NotificationReports({ activeTab = 'Notification Center' }) {
  const [selectedCategory, setSelectedCategory] = useState('Campaign');
  const [fileFormat, setFileFormat] = useState('PDF');
  const [dateRange, setDateRange] = useState('Last 30 Days');
  const [selectedProvider, setSelectedProvider] = useState('All Providers');
  
  const [exports, setExports] = useState([
    { id: 'EXP-109', name: 'Q3 SMS Conversion Engagement.pdf', size: '4.2 MB', date: 'Today, 10:30 AM', progress: 100, status: 'Ready' },
    { id: 'EXP-108', name: 'Delivery Metrics - May 2026.csv', size: '12.8 MB', date: 'Yesterday', progress: 100, status: 'Ready' },
    { id: 'EXP-110', name: 'Global Messaging Spend Analysis.xlsx', size: '840 KB', date: 'Just now', progress: 45, status: 'Generating' }
  ]);

  const [campaignData, setCampaignData] = useState([
    { name: 'Revenue Re-engagement Q3', reach: '254,000', success: '98.9%', ctr: '12.4%', efficiency: 'High ($0.009/act)' },
    { name: 'Immediate Compliance 1040-NR', reach: '12,500', success: '99.8%', ctr: '48.2%', efficiency: 'Optimal ($0.015/act)' },
    { name: 'Promo Flash Sale Discount Blast', reach: '1,200,000', success: '94.2%', ctr: '4.8%', efficiency: 'Moderate ($0.011/act)' },
    { name: 'Loyalty Rewards Tier Invites', reach: '45,808', success: '99.1%', ctr: '18.9%', efficiency: 'High ($0.008/act)' },
    { name: 'Feedback Survey Link Campaign', reach: '65,000', success: '91.4%', ctr: '2.1%', efficiency: 'Low ($0.014/act)' }
  ]);

  const [searchQuery, setSearchQuery] = useState('');

  const handleGenerateReport = (e) => {
    e.preventDefault();
    const newExport = {
      id: `EXP-${Math.floor(111 + Math.random() * 50)}`,
      name: `${selectedCategory}_Report_${dateRange.replace(/ /g, '_')}.${fileFormat.toLowerCase() === 'pdf' ? 'pdf' : fileFormat.toLowerCase() === 'excel' ? 'xlsx' : 'csv'}`,
      size: 'Generating...',
      date: 'Just now',
      progress: 15,
      status: 'Generating'
    };

    setExports([newExport, ...exports]);

    // Simulate progress load
    let currentProgress = 15;
    const interval = setInterval(() => {
      currentProgress += 25;
      setExports(prevExports => 
        prevExports.map(exp => {
          if (exp.id === newExport.id) {
            if (currentProgress >= 100) {
              clearInterval(interval);
              return { ...exp, progress: 100, status: 'Ready', size: '1.8 MB' };
            }
            return { ...exp, progress: currentProgress };
          }
          return exp;
        })
      );
    }, 800);
  };

  const filteredCampaigns = campaignData.filter(c =>
    c.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <AdminShell
      activeTab={activeTab}
      brandText="HOZIFY"
      brandSubText="Data Analytics"
      headerTitle="Reports & Export"
      searchPlaceholder="Search campaign performance, reports, files..."
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-section)', padding: '24px 0', position: 'relative' }}>
        
        {/* Page Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <h1 style={{ fontSize: '24px', fontWeight: '800', color: 'var(--text)', margin: 0 }}>
              Reports & Export
            </h1>
            <p style={{ fontSize: '13px', color: 'var(--muted)', margin: '4px 0 0' }}>
              Compile notification dispatch telemetry, delivery cost center analysis, and click-through conversions
            </p>
          </div>

          <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', border: '1.5px solid #25108f', padding: '6px 12px', borderRadius: '6px', background: '#fff' }}>
              <Calendar size={14} style={{ color: 'var(--muted)' }} />
              <Select
                value={dateRange}
                onChange={(e) => setDateRange(e.target.value)}
                style={{ border: 'none', background: 'transparent', outline: 'none', fontWeight: '700', fontSize: '12px', cursor: 'pointer', color: '#565365' }}
                aria-label="Report timeframe filter"
                options={[{
                  label: "Last 30 Days",
                  value: "Last 30 Days"
                }, {
                  label: "Last 7 Days",
                  value: "Last 7 Days"
                }, {
                  label: "This Month",
                  value: "This Month"
                }, {
                  label: "Custom Range",
                  value: "Custom Range"
                }]} />
            </div>

            <button
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                border: 'none',
                background: 'var(--primary)',
                color: '#fff',
                fontSize: '13px',
                fontWeight: '700',
                height: '38px',
                padding: '0 16px',
                borderRadius: '6px',
                cursor: 'pointer',
                boxShadow: '0 2px 4px rgba(37, 16, 143, 0.08)',
                transition: 'all 0.15s ease'
              }}
              onClick={() => alert('New Custom Template Dialog')}
              type="button"
            >
              <Plus size={16} />
              <span>New Report Template</span>
            </button>
          </div>
        </div>

        {/* KPI Metrics Row */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
          {/* Card 1: Avg Delivery Rate */}
          <div className="panel" style={{ padding: 'var(--spacing-section)', display: 'flex', flexDirection: 'column', gap: '12px', position: 'relative' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '10px', fontWeight: '800', color: 'var(--muted)', letterSpacing: '0.5px', textTransform: 'uppercase' }}>
                Avg. Delivery Rate
              </span>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '32px', height: '32px', borderRadius: '6px', background: '#ecfdf5', color: '#059669' }}>
                <Layers size={15} />
              </div>
            </div>
            <div>
              <strong style={{ display: 'block', fontSize: '28px', color: 'var(--text)', fontWeight: '850' }}>
                98.4%
              </strong>
              <span style={{ fontSize: '12px', fontWeight: '750', color: 'var(--green)', display: 'inline-flex', alignItems: 'center', gap: '3px', marginTop: '4px' }}>
                Optimal Platform Score
              </span>
            </div>
          </div>

          {/* Card 2: Open Rate */}
          <div className="panel" style={{ padding: 'var(--spacing-section)', display: 'flex', flexDirection: 'column', gap: '12px', position: 'relative' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '10px', fontWeight: '800', color: 'var(--muted)', letterSpacing: '0.5px', textTransform: 'uppercase' }}>
                Open / Interaction Rate
              </span>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '32px', height: '32px', borderRadius: '6px', background: '#eff6ff', color: '#1e40af' }}>
                <MousePointerClick size={15} />
              </div>
            </div>
            <div>
              <strong style={{ display: 'block', fontSize: '28px', color: 'var(--text)', fontWeight: '850' }}>
                24.1%
              </strong>
              <span style={{ fontSize: '12px', fontWeight: '750', color: 'var(--primary)', display: 'inline-flex', alignItems: 'center', gap: '3px', marginTop: '4px' }}>
                +1.8% vs last week
              </span>
            </div>
          </div>

          {/* Card 3: Total Spend */}
          <div className="panel" style={{ padding: 'var(--spacing-section)', display: 'flex', flexDirection: 'column', gap: '12px', position: 'relative' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '10px', fontWeight: '800', color: 'var(--muted)', letterSpacing: '0.5px', textTransform: 'uppercase' }}>
                Spend Analysis
              </span>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '32px', height: '32px', borderRadius: '6px', background: '#f5f3ff', color: 'var(--primary)' }}>
                <DollarSign size={15} />
              </div>
            </div>
            <div>
              <strong style={{ display: 'block', fontSize: '28px', color: 'var(--text)', fontWeight: '850' }}>
                $12.4K
              </strong>
              <span style={{ fontSize: '12px', fontWeight: '750', color: 'var(--muted)', display: 'inline-flex', alignItems: 'center', gap: '3px', marginTop: '4px' }}>
                Across SMS/Email/Push
              </span>
            </div>
          </div>

          {/* Card 4: Reports Ready */}
          <div className="panel" style={{ padding: 'var(--spacing-section)', display: 'flex', flexDirection: 'column', gap: '12px', position: 'relative' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '10px', fontWeight: '800', color: 'var(--muted)', letterSpacing: '0.5px', textTransform: 'uppercase' }}>
                Reports Available
              </span>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '32px', height: '32px', borderRadius: '6px', background: '#fef3c7', color: '#d97706' }}>
                <FileText size={15} />
              </div>
            </div>
            <div>
              <strong style={{ display: 'block', fontSize: '28px', color: 'var(--text)', fontWeight: '850' }}>
                07
              </strong>
              <span style={{ fontSize: '12px', fontWeight: '750', color: 'var(--green)', display: 'inline-flex', alignItems: 'center', gap: '3px', marginTop: '4px' }}>
                All exports generated
              </span>
            </div>
          </div>
        </div>

        {/* Content Layout */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr', lgGridTemplateColumns: '2fr 1fr', gap: 'var(--spacing-section)', alignItems: 'stretch' }}>
          
          {/* Configuration Console (Left Column) */}
          <div className="panel" style={{ padding: 'var(--spacing-section)', display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div>
              <h2 style={{ fontSize: '15px', fontWeight: '850', color: 'var(--text)', margin: 0 }}>
                Report Configuration Console
              </h2>
              <p style={{ fontSize: '12.5px', color: 'var(--muted)', margin: '4px 0 0' }}>
                Select a dataset, filters, and output format to compile details
              </p>
            </div>

            <form onSubmit={handleGenerateReport} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {/* Category Cards Selector */}
              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: '800', color: 'var(--text)', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '10px' }}>
                  1. Select Report Category
                </label>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', gap: '12px' }}>
                  {[
                    { id: 'Campaign', label: 'Campaign Metrics', desc: 'Conversions & CTRs', icon: BarChart3 },
                    { id: 'Delivery', label: 'Delivery Telemetry', desc: 'Bounces & latency', icon: Layers },
                    { id: 'Engagement', label: 'User Engagement', desc: 'Quiet hour preferences', icon: MousePointerClick },
                    { id: 'Cost', label: 'Cost Analysis', desc: 'Billing & provider rates', icon: DollarSign }
                  ].map((cat) => {
                    const isSelected = selectedCategory === cat.id;
                    const Icon = cat.icon;
                    return (
                      <div
                        key={cat.id}
                        onClick={() => setSelectedCategory(cat.id)}
                        style={{
                          padding: '16px',
                          borderRadius: '8px',
                          border: isSelected ? '2px solid var(--primary)' : '1px solid var(--lavender)',
                          background: isSelected ? 'rgba(37, 16, 143, 0.02)' : '#fff',
                          cursor: 'pointer',
                          transition: 'all 0.15s ease',
                          display: 'flex',
                          flexDirection: 'column',
                          gap: '8px'
                        }}
                      >
                        <div style={{ color: isSelected ? 'var(--primary)' : 'var(--muted)' }}>
                          <Icon size={18} />
                        </div>
                        <div>
                          <strong style={{ display: 'block', fontSize: '13px', color: 'var(--text)' }}>{cat.label}</strong>
                          <span style={{ fontSize: '10.5px', color: 'var(--muted)' }}>{cat.desc}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Advanced Configurations */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr mdGridTemplateColumns:1fr 1fr', gap: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: '800', color: 'var(--text)', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '8px' }}>
                    2. Select Network Provider
                  </label>
                  <div style={{ position: 'relative' }}>
                    <Select
                      value={selectedProvider}
                      onChange={(e) => setSelectedProvider(e.target.value)}
                      style={{
                        width: '100%',
                        height: '38px',
                        border: '1.5px solid #25108f',
                        borderRadius: '6px',
                        padding: '0 12px',
                        fontSize: '13px',
                        appearance: 'none',
                        background: '#fff',
                        outline: 'none',
                        fontWeight: '700',
                        color: 'var(--text)'
                      }}
                      aria-label="Select gateway network provider"
                      options={[{
                        label: "All Providers (Twilio, APNs, FCM)",
                        value: "All Providers"
                      }, {
                        label: "Twilio SMS Gateway",
                        value: "Twilio SMS"
                      }, {
                        label: "AWS SES Email Node",
                        value: "AWS SES"
                      }, {
                        label: "Google FCM (Android Push)",
                        value: "Google FCM"
                      }, {
                        label: "Apple APNs (iOS Push)",
                        value: "Apple APNs"
                      }]} />

                  </div>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: '800', color: 'var(--text)', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '8px' }}>
                    3. Report Output Format
                  </label>
                  <div style={{ display: 'flex', gap: '12px' }}>
                    {['PDF Document', 'CSV Spreadsheet', 'Excel Ledger'].map((format) => {
                      const value = format.split(' ')[0].toUpperCase();
                      const isChecked = fileFormat === value;
                      return (
                        <label
                          key={format}
                          style={{
                            flex: 1,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '8px',
                            border: isChecked ? '1.5px solid #25108f' : '1.5px solid #25108f',
                            borderRadius: '6px',
                            background: isChecked ? 'rgba(37, 16, 143, 0.03)' : '#fff',
                            height: '38px',
                            fontSize: '12.5px',
                            fontWeight: '750',
                            cursor: 'pointer',
                            color: isChecked ? 'var(--primary)' : 'var(--muted)'
                          }}
                        >
                          <input
                            type="radio"
                            name="reportFormat"
                            checked={isChecked}
                            onChange={() => setFileFormat(value)}
                            style={{ display: 'none' }}
                          />
                          <span>{format}</span>
                        </label>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div style={{ borderTop: '1px dashed var(--lavender)', paddingTop: '16px', display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
                <button
                  type="button"
                  onClick={() => {
                    setSelectedCategory('Campaign');
                    setFileFormat('PDF');
                    setDateRange('Last 30 Days');
                    setSelectedProvider('All Providers');
                  }}
                  style={{
                    height: '38px',
                    padding: '0 16px',
                    border: '1.5px solid #25108f',
                    background: '#fff',
                    borderRadius: '6px',
                    fontSize: '13px',
                    fontWeight: '750'
                  }}
                >
                  Reset Form
                </button>
                <button
                  type="submit"
                  style={{
                    height: '38px',
                    padding: '0 20px',
                    border: 'none',
                    background: 'var(--primary)',
                    color: '#fff',
                    borderRadius: '6px',
                    fontSize: '13px',
                    fontWeight: '750',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    boxShadow: '0 2px 4px rgba(37, 16, 143, 0.08)'
                  }}
                >
                  <RefreshCw size={14} />
                  <span>Compile & Export Report</span>
                </button>
              </div>
            </form>
          </div>

          {/* Recent Exports Sidebar (Right Column) */}
          <div className="panel" style={{ padding: 'var(--spacing-section)', display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3 style={{ fontSize: '14.5px', fontWeight: '850', color: 'var(--text)', margin: 0 }}>
                Recent Exports Sidebar
              </h3>
              <button
                onClick={() => alert('Refreshing export files')}
                style={{ border: 'none', background: 'transparent', color: 'var(--primary)', cursor: 'pointer' }}
                aria-label="Refresh files"
              >
                <RefreshCw size={14} />
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', maxHeight: '380px', overflowY: 'auto' }}>
              {exports.map((exp) => (
                <div
                  key={exp.id}
                  style={{
                    padding: '12px',
                    borderRadius: '8px',
                    border: '1px solid var(--lavender)',
                    background: exp.status === 'Generating' ? '#fbfcfe' : '#fff',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '8px'
                  }}
                >
                  <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: '32px',
                      height: '32px',
                      borderRadius: '6px',
                      background: exp.name.endsWith('.pdf') ? '#fee2e2' : exp.name.endsWith('.csv') ? '#ecfdf5' : '#eff6ff',
                      color: exp.name.endsWith('.pdf') ? '#dc2626' : exp.name.endsWith('.csv') ? '#059669' : '#1e40af'
                    }}>
                      <FileText size={16} />
                    </div>

                    <div style={{ flex: 1, minWidth: 0 }}>
                      <strong style={{ display: 'block', fontSize: '12.5px', color: 'var(--text)', textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>
                        {exp.name}
                      </strong>
                      <span style={{ display: 'block', fontSize: '11px', color: 'var(--muted)', marginTop: '2px' }}>
                        {exp.size} • {exp.date}
                      </span>
                    </div>
                  </div>

                  {exp.status === 'Generating' ? (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '10.5px', color: 'var(--primary)', fontWeight: '750' }}>
                        <span>Generating Output...</span>
                        <span>{exp.progress}%</span>
                      </div>
                      <div style={{ height: '4px', background: '#eee9f6', borderRadius: '2px', overflow: 'hidden' }}>
                        <div style={{ width: `${exp.progress}%`, height: '100%', background: 'var(--primary)' }} />
                      </div>
                    </div>
                  ) : (
                    <button
                      onClick={() => alert(`Downloading file: ${exp.name}`)}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '6px',
                        width: '100%',
                        height: '28px',
                        background: '#f4eff8',
                        border: 'none',
                        borderRadius: '4px',
                        fontSize: '11.5px',
                        fontWeight: '750',
                        color: 'var(--primary)',
                        cursor: 'pointer'
                      }}
                      type="button"
                    >
                      <Download size={12} />
                      <span>Download File</span>
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Global Campaign Performance Audit Table */}
        <div className="panel" style={{ padding: 'var(--spacing-section)', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
            <div>
              <h2 style={{ fontSize: '15px', fontWeight: '850', color: 'var(--text)', margin: 0 }}>
                Global Campaign Performance Audit
              </h2>
              <p style={{ fontSize: '12px', color: 'var(--muted)', margin: '2px 0 0' }}>
                Historical reach, quality ratios, click logs, and action metrics
              </p>
            </div>

            <div style={{ display: 'flex', gap: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', border: '1.5px solid #25108f', padding: '6px 12px', borderRadius: '6px', background: '#fff', width: '220px' }}>
                <Search size={14} style={{ color: 'var(--muted)' }} />
                <input
                  type="text"
                  placeholder="Search performance table..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  style={{ border: 'none', background: 'transparent', outline: 'none', fontSize: '12px', width: '100%', color: 'var(--text)' }}
                  aria-label="Filter campaign audit log table"
                />
              </div>
            </div>
          </div>

          <div style={{ overflowX: 'auto' }}>
            <div className="table-responsive-wrapper">
<table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px', textAlign: 'left', minWidth: '700px' }}>
              <thead>
                <tr style={{ background: 'var(--soft)', borderBottom: '1.5px solid #25108f' }}>
                  <th style={{ padding: '12px 16px', color: 'var(--muted)', fontWeight: '800', textTransform: 'uppercase', fontSize: '10px' }}>Campaign Name</th>
                  <th style={{ padding: '12px 16px', color: 'var(--muted)', fontWeight: '800', textTransform: 'uppercase', fontSize: '10px' }}>Total Reach</th>
                  <th style={{ padding: '12px 16px', color: 'var(--muted)', fontWeight: '800', textTransform: 'uppercase', fontSize: '10px' }}>Success Rate</th>
                  <th style={{ padding: '12px 16px', color: 'var(--muted)', fontWeight: '800', textTransform: 'uppercase', fontSize: '10px' }}>Click-Through Rate (CTR)</th>
                  <th style={{ padding: '12px 16px', color: 'var(--muted)', fontWeight: '800', textTransform: 'uppercase', fontSize: '10px' }}>Cost Efficiency</th>
                  <th style={{ padding: '12px 16px', color: 'var(--muted)', fontWeight: '800', textTransform: 'uppercase', fontSize: '10px', textAlign: 'right' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredCampaigns.length === 0 ? (
                  <tr>
                    <td colSpan={6} style={{ padding: 'var(--spacing-section)', textAlign: 'center', color: 'var(--muted)' }}>
                      No campaigns found matching search criteria.
                    </td>
                  </tr>
                ) : (
                  filteredCampaigns.map((camp, index) => (
                    <tr key={index} style={{ borderBottom: '1px solid var(--lavender)' }}>
                      <td style={{ padding: '16px', fontWeight: '800', color: 'var(--text)' }}>{camp.name}</td>
                      <td style={{ padding: '16px', fontWeight: '700', color: 'var(--text)' }}>{camp.reach}</td>
                      <td style={{ padding: '16px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <span style={{ fontWeight: '750', color: parseFloat(camp.success) > 95 ? '#07956f' : '#dc2626' }}>{camp.success}</span>
                          <div style={{ width: '60px', height: '4px', background: '#eee9f6', borderRadius: '2px', overflow: 'hidden' }}>
                            <div style={{ width: camp.success, height: '100%', background: parseFloat(camp.success) > 95 ? '#07956f' : '#dc2626' }} />
                          </div>
                        </div>
                      </td>
                      <td style={{ padding: '16px', fontWeight: '750', color: 'var(--primary)' }}>{camp.ctr}</td>
                      <td style={{ padding: '16px' }}>
                        <span style={{
                          fontSize: '10px',
                          fontWeight: '850',
                          padding: '3px 8px',
                          borderRadius: '4px',
                          background: camp.efficiency.includes('High') || camp.efficiency.includes('Optimal') ? '#ecfdf5' : '#f3f4f6',
                          color: camp.efficiency.includes('High') || camp.efficiency.includes('Optimal') ? '#07956f' : '#565365'
                        }}>
                          {camp.efficiency}
                        </span>
                      </td>
                      <td style={{ padding: '16px', textAlign: 'right' }}>
                        <button
                          onClick={() => alert(`Redirecting to full campaign metrics of ${camp.name}`)}
                          style={{ border: 'none', background: 'transparent', color: 'var(--primary)', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '4px' }}
                          type="button"
                          aria-label="Detailed analytics report view"
                        >
                          <ExternalLink size={14} />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
</div>
          </div>
        </div>

      </div>
    </AdminShell>
  );
}


