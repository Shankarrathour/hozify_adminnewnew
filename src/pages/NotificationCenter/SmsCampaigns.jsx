import React, { useState } from 'react';
import { 
  Send, 
  CheckCircle, 
  AlertCircle, 
  CreditCard, 
  Plus, 
  Download, 
  ChevronDown, 
  MoreVertical, 
  MessageSquare,
  Globe,
  Sliders,
  TrendingUp,
  TrendingDown
} from 'lucide-react';
import AdminShell from '../../components/layouts/AdminShell';

import Select from "../../components/ui/Select";

export default function SmsCampaigns({ activeTab = 'Notification Center' }) {
  const [timeframe, setTimeframe] = useState('Last 30 Days');
  const [openDropdownId, setOpenDropdownId] = useState(null);
  const [showNewCampaignModal, setShowNewCampaignModal] = useState(false);
  const [campaigns, setCampaigns] = useState([
    { id: 'SMS-2024-001', name: 'Summer Flash Sale', recipients: '45,808', success: 99.1, status: 'COMPLETED', cost: '$675.00', color: '#10b981' },
    { id: 'SMS-2024-002', name: 'Loyalty Rewards Blast', recipients: '12,402', success: 98.5, status: 'COMPLETED', cost: '$186.03', color: '#10b981' },
    { id: 'SMS-AUTO-88', name: 'Abandoned Cart Re-engagement', recipients: '2,150', success: 84.2, status: 'SENDING', cost: '$32.25', color: '#6366f1' },
    { id: 'SMS-2024-009', name: 'Feedback Survey Link', recipients: '65,000', success: 91.4, status: 'FAILED', cost: '$975.00', color: '#ef4444' }
  ]);
  const [newCampaign, setNewCampaign] = useState({ name: '', recipients: '', cost: '' });

  const handleCreateCampaign = (e) => {
    e.preventDefault();
    if (!newCampaign.name) return;

    const created = {
      id: `SMS-2024-${Math.floor(100 + Math.random() * 900)}`,
      name: newCampaign.name,
      recipients: Number(newCampaign.recipients || 0).toLocaleString(),
      success: 100.0,
      status: 'SENDING',
      cost: `$${(Number(newCampaign.cost || 0)).toFixed(2)}`,
      color: '#6366f1'
    };

    setCampaigns([created, ...campaigns]);
    setShowNewCampaignModal(false);
    setNewCampaign({ name: '', recipients: '', cost: '' });
  };

  return (
    <AdminShell
      activeTab={activeTab}
      brandText="HOZIFY"
      brandSubText="Enterprise SaaS"
      headerTitle="SMS Campaigns"
      searchPlaceholder="Search campaigns, logs, or analytics..."
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-section)', padding: '24px 0', position: 'relative' }}>
        
        {/* Page Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <h1 style={{ fontSize: '24px', fontWeight: '800', color: 'var(--text)', margin: 0 }}>
              SMS Campaigns Dashboard
            </h1>
            <p style={{ fontSize: '13px', color: 'var(--muted)', margin: '4px 0 0' }}>
              Real-time performance tracking and revenue management
            </p>
          </div>

          <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
            <button
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
              onClick={() => alert('Exporting ledger...')}
              type="button"
            >
              <Download size={14} />
              <span>Export Ledger</span>
            </button>

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
              onClick={() => setShowNewCampaignModal(true)}
              type="button"
            >
              <Plus size={16} />
              <span>New SMS Campaign</span>
            </button>
          </div>
        </div>

        {/* KPI Metrics Row */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
          
          {/* Card 1: SMS Sent */}
          <div className="panel" style={{ padding: 'var(--spacing-section)', display: 'flex', flexDirection: 'column', gap: '12px', position: 'relative' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '10px', fontWeight: '800', color: 'var(--muted)', letterSpacing: '0.5px', textTransform: 'uppercase' }}>
                SMS Sent
              </span>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '32px', height: '32px', borderRadius: '6px', background: '#f4eff8', color: 'var(--primary)' }}>
                <Send size={15} />
              </div>
            </div>
            <div>
              <strong style={{ display: 'block', fontSize: '28px', color: 'var(--text)', fontWeight: '850' }}>
                124,502
              </strong>
              <span style={{ fontSize: '12px', fontWeight: '750', color: 'var(--green)', display: 'inline-flex', alignItems: 'center', gap: '3px', marginTop: '4px' }}>
                <TrendingUp size={12} />
                +12.4% vs last mo
              </span>
            </div>
          </div>

          {/* Card 2: Delivered */}
          <div className="panel" style={{ padding: 'var(--spacing-section)', display: 'flex', flexDirection: 'column', gap: '12px', position: 'relative' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '10px', fontWeight: '800', color: 'var(--muted)', letterSpacing: '0.5px', textTransform: 'uppercase' }}>
                Delivered
              </span>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '32px', height: '32px', borderRadius: '6px', background: '#ecfdf5', color: '#059669' }}>
                <CheckCircle size={15} />
              </div>
            </div>
            <div>
              <strong style={{ display: 'block', fontSize: '28px', color: 'var(--text)', fontWeight: '850' }}>
                121,088
              </strong>
              <span style={{ fontSize: '12px', fontWeight: '750', color: 'var(--muted)', display: 'inline-flex', alignItems: 'center', gap: '3px', marginTop: '4px' }}>
                97.26% Success rate
              </span>
            </div>
          </div>

          {/* Card 3: Failed */}
          <div className="panel" style={{ padding: 'var(--spacing-section)', display: 'flex', flexDirection: 'column', gap: '12px', position: 'relative' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '10px', fontWeight: '800', color: 'var(--muted)', letterSpacing: '0.5px', textTransform: 'uppercase' }}>
                Failed
              </span>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '32px', height: '32px', borderRadius: '6px', background: '#fee2e2', color: '#dc2626' }}>
                <AlertCircle size={15} />
              </div>
            </div>
            <div>
              <strong style={{ display: 'block', fontSize: '28px', color: 'var(--text)', fontWeight: '850' }}>
                3,414
              </strong>
              <span style={{ fontSize: '12px', fontWeight: '750', color: 'var(--red)', display: 'inline-flex', alignItems: 'center', gap: '3px', marginTop: '4px' }}>
                <TrendingDown size={12} />
                -0.4% from avg
              </span>
            </div>
          </div>

          {/* Card 4: Total Cost */}
          <div className="panel" style={{ padding: 'var(--spacing-section)', display: 'flex', flexDirection: 'column', gap: '12px', position: 'relative' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '10px', fontWeight: '800', color: 'var(--muted)', letterSpacing: '0.5px', textTransform: 'uppercase' }}>
                Total Cost
              </span>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '32px', height: '32px', borderRadius: '6px', background: '#eff6ff', color: '#1e40af' }}>
                <CreditCard size={15} />
              </div>
            </div>
            <div>
              <strong style={{ display: 'block', fontSize: '28px', color: 'var(--text)', fontWeight: '850' }}>
                $1,867.53
              </strong>
              <span style={{ fontSize: '12px', fontWeight: '750', color: 'var(--muted)', display: 'inline-flex', alignItems: 'center', gap: '3px', marginTop: '4px' }}>
                $0.015 avg / msg
              </span>
            </div>
          </div>

        </div>

        {/* Content Section: Table & Panels */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr', lgGridTemplateColumns: '2.1fr 1fr', gap: 'var(--spacing-section)', alignItems: 'stretch' }}>
          
          {/* Active Campaign Ledger (Left Column) */}
          <div className="panel" style={{ padding: 'var(--spacing-section)', display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h2 style={{ fontSize: '15px', fontWeight: '850', color: 'var(--text)', margin: 0 }}>
                Active Campaign Ledger
              </h2>
              
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', border: '1.5px solid #25108f', padding: '6px 12px', borderRadius: '6px', background: '#fff' }}>
                <Select
                  value={timeframe}
                  onChange={(e) => setTimeframe(e.target.value)}
                  style={{ border: 'none', background: 'transparent', outline: 'none', fontWeight: '700', fontSize: '12px', cursor: 'pointer', color: '#565365' }}
                  aria-label="Filter timeframe"
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
            </div>

            <div style={{ overflowY: 'auto', maxHeight: '400px', flex: 1 }}>
              <div className="table-responsive-wrapper">
<table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px', textAlign: 'left', minWidth: '580px' }}>
                <thead>
                  <tr style={{ background: 'var(--soft)', borderBottom: '1.5px solid #25108f' }}>
                    <th style={{ padding: '12px 16px', color: 'var(--muted)', fontWeight: '800', textTransform: 'uppercase', fontSize: '10px' }}>Campaign Name</th>
                    <th style={{ padding: '12px 16px', color: 'var(--muted)', fontWeight: '800', textTransform: 'uppercase', fontSize: '10px' }}>Recipients</th>
                    <th style={{ padding: '12px 16px', color: 'var(--muted)', fontWeight: '800', textTransform: 'uppercase', fontSize: '10px', width: '140px' }}>Success %</th>
                    <th style={{ padding: '12px 16px', color: 'var(--muted)', fontWeight: '800', textTransform: 'uppercase', fontSize: '10px' }}>Status</th>
                    <th style={{ padding: '12px 16px', color: 'var(--muted)', fontWeight: '800', textTransform: 'uppercase', fontSize: '10px' }}>Cost</th>
                    <th style={{ padding: '12px 16px', color: 'var(--muted)', fontWeight: '800', textTransform: 'uppercase', fontSize: '10px', textAlign: 'right' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {campaigns.map((c, i) => (
                    <tr key={i} style={{ borderBottom: '1px solid var(--lavender)' }}>
                      <td style={{ padding: '16px' }}>
                        <strong style={{ display: 'block', fontWeight: '800', color: 'var(--text)' }}>{c.name}</strong>
                        <span style={{ fontSize: '11px', color: 'var(--muted)' }}>ID: {c.id}</span>
                      </td>
                      <td style={{ padding: '16px', fontWeight: '700', color: 'var(--text)' }}>{c.recipients}</td>
                      <td style={{ padding: '16px' }}>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                          <strong style={{ fontSize: '12.5px', color: c.color }}>{c.success}%</strong>
                          <div style={{ height: '4px', background: '#eee9f6', borderRadius: '2px', overflow: 'hidden' }}>
                            <div style={{ width: `${c.success}%`, height: '100%', background: c.color }} />
                          </div>
                        </div>
                      </td>
                      <td style={{ padding: '16px' }}>
                        <span style={{
                          fontSize: '10px',
                          fontWeight: '850',
                          padding: '3px 8px',
                          borderRadius: '4px',
                          background: c.status === 'COMPLETED' ? '#ecfdf5' : c.status === 'SENDING' ? '#eff6ff' : '#fee2e2',
                          color: c.status === 'COMPLETED' ? '#07956f' : c.status === 'SENDING' ? 'var(--primary)' : '#dc2626'
                        }}>
                          {c.status}
                        </span>
                      </td>
                      <td style={{ padding: '16px', fontWeight: '700', color: 'var(--text)' }}>{c.cost}</td>
                      <td style={{ padding: '16px', textAlign: 'right', position: 'relative' }}>
                        <button 
                          onClick={(e) => { e.stopPropagation(); setOpenDropdownId(openDropdownId === i ? null : i); }}
                          style={{ border: 'none', background: 'transparent', cursor: 'pointer', color: 'var(--muted)' }} aria-label="More actions">
                          <MoreVertical size={16} />
                        </button>
                        {openDropdownId === i && (
                          <div style={{ position: 'absolute', right: '40px', top: '16px', width: '140px', background: '#fff', border: '1.5px solid #25108f', borderRadius: '8px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)', zIndex: 50, padding: '4px 0', textAlign: 'left' }}>
                            <button onClick={(e) => { e.stopPropagation(); setOpenDropdownId(null); alert('View Details clicked'); }} style={{ display: 'block', width: '100%', padding: '8px 16px', border: 'none', background: 'transparent', textAlign: 'left', fontSize: '12px', fontWeight: '600', cursor: 'pointer', color: 'var(--text)' }}>View Details</button>
                            <button onClick={(e) => { e.stopPropagation(); setOpenDropdownId(null); alert('Resend SMS'); }} style={{ display: 'block', width: '100%', padding: '8px 16px', border: 'none', background: 'transparent', textAlign: 'left', fontSize: '12px', fontWeight: '600', cursor: 'pointer', color: 'var(--green)' }}>Resend</button>
                            <button onClick={(e) => { e.stopPropagation(); setOpenDropdownId(null); alert('Delete Campaign'); }} style={{ display: 'block', width: '100%', padding: '8px 16px', border: 'none', background: 'transparent', textAlign: 'left', fontSize: '12px', fontWeight: '600', cursor: 'pointer', color: '#e11d48' }}>Delete</button>
                          </div>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
</div>
            </div>

            {/* Pagination */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid var(--lavender)', paddingTop: '16px', marginTop: '12px' }}>
              <span style={{ fontSize: '12px', color: 'var(--muted)' }}>
                Showing 1-4 of 124 campaigns
              </span>
              <div style={{ display: 'flex', gap: '6px' }}>
                {['1', '2', '3'].map((page, idx) => (
                  <button
                    key={idx}
                    style={{
                      height: '32px',
                      width: '32px',
                      borderRadius: '6px',
                      border: '1.5px solid #25108f',
                      background: page === '1' ? 'var(--primary)' : '#fff',
                      color: page === '1' ? '#fff' : 'var(--text)',
                      fontWeight: '700',
                      fontSize: '12px',
                      cursor: 'pointer'
                    }}
                    onClick={() => alert(`Navigating to page ${page}`)}
                  >
                    {page}
                  </button>
                ))}
              </div>
            </div>

          </div>

          {/* Right Side Panels */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-section)' }}>
            
            {/* Delivery by Provider */}
            <div className="panel" style={{ padding: 'var(--spacing-section)', display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <h3 style={{ fontSize: '14px', fontWeight: '850', color: 'var(--text)', margin: 0 }}>
                Delivery by Provider
              </h3>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                {[
                  { name: 'Verizon Wireless', rate: 98.2, color: 'var(--primary)' },
                  { name: 'AT&T Mobility', rate: 97.8, color: 'var(--primary)' },
                  { name: 'T-Mobile', rate: 96.4, color: 'var(--primary)' },
                  { name: 'Other MVNOs', rate: 94.1, color: '#7a7688' }
                ].map((p, idx) => (
                  <div key={idx} style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', fontWeight: '750' }}>
                      <span style={{ color: 'var(--text)' }}>{p.name}</span>
                      <span style={{ color: 'var(--text)' }}>{p.rate}%</span>
                    </div>
                    <div style={{ height: '6px', background: '#eee9f6', borderRadius: '3px', overflow: 'hidden' }}>
                      <div style={{ width: `${p.rate}%`, height: '100%', background: p.color }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Carrier Reliability Index */}
            <div style={{ 
              background: 'linear-gradient(135deg, #1e1b4b 0%, #0c0a3e 100%)', 
              color: '#fff', 
              borderRadius: '12px', 
              padding: 'var(--spacing-section)', 
              display: 'flex', 
              flexDirection: 'column', 
              gap: '16px',
              boxShadow: '0 4px 10px rgba(0,0,0,0.05)'
            }}>
              <div>
                <span style={{ fontSize: '9px', fontWeight: '900', color: '#a78bfa', letterSpacing: '1px', textTransform: 'uppercase' }}>
                  Carrier Reliability Index
                </span>
                <strong style={{ display: 'block', fontSize: '20px', marginTop: '6px', fontWeight: '800' }}>
                  Optimal
                </strong>
                <p style={{ fontSize: '12px', color: '#c3c1db', marginTop: '6px', margin: 0, lineHeight: '1.4' }}>
                  Current routing is 12% more cost-effective than standard regional aggregates.
                </p>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '16px', marginTop: '8px' }}>
                <div>
                  <strong style={{ fontSize: '36px', fontWeight: '900', display: 'block', lineHeight: 1 }}>99.8</strong>
                  <span style={{ fontSize: '9px', fontWeight: '850', color: '#a78bfa', letterSpacing: '0.5px' }}>SCORE</span>
                </div>
                
                {/* Colored circle badges V, A, T */}
                <div style={{ display: 'flex', gap: '-4px', alignItems: 'center' }}>
                  <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '24px', width: '24px', borderRadius: '50%', background: '#10b981', color: '#fff', fontSize: '10px', fontWeight: '900', border: '2px solid #0c0a3e', zIndex: 3 }}>V</span>
                  <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '24px', width: '24px', borderRadius: '50%', background: '#ef4444', color: '#fff', fontSize: '10px', fontWeight: '900', border: '2px solid #0c0a3e', zIndex: 2, marginLeft: '-6px' }}>A</span>
                  <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '24px', width: '24px', borderRadius: '50%', background: '#6366f1', color: '#fff', fontSize: '10px', fontWeight: '900', border: '2px solid #0c0a3e', zIndex: 1, marginLeft: '-6px' }}>T</span>
                </div>
              </div>
            </div>

            {/* Deliverability Alerts */}
            <div className="panel" style={{ padding: 'var(--spacing-section)', display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <h3 style={{ fontSize: '14px', fontWeight: '850', color: 'var(--text)', margin: 0, display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={{ color: 'var(--primary)' }}>!</span> Deliverability Alerts
              </h3>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div style={{ display: 'flex', gap: '12px', borderLeft: '3px solid #ef4444', paddingLeft: '12px' }}>
                  <div style={{ flex: 1 }}>
                    <strong style={{ display: 'block', fontSize: '12.5px', color: 'var(--text)' }}>Spam Filter Triggered</strong>
                    <span style={{ display: 'block', fontSize: '11px', color: 'var(--muted)', marginTop: '4px', lineHeight: '1.4' }}>
                      Campaign ID: SMS-2024-009 flagged by Canadian carriers.
                    </span>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '12px', borderLeft: '3px solid #f59e0b', paddingLeft: '12px' }}>
                  <div style={{ flex: 1 }}>
                    <strong style={{ display: 'block', fontSize: '12.5px', color: 'var(--text)' }}>Rate Limit Reached</strong>
                    <span style={{ display: 'block', fontSize: '11px', color: 'var(--muted)', marginTop: '4px', lineHeight: '1.4' }}>
                      Throttling applied to 'Loyalty Rewards' (API Level 2).
                    </span>
                  </div>
                </div>
              </div>
            </div>

          </div>

        </div>

        {/* Global Precision Routing Bottom Graphic Banner */}
        <div style={{ 
          background: 'linear-gradient(135deg, #090f1d 0%, #17243c 100%)', 
          borderRadius: '12px', 
          padding: '48px 24px', 
          position: 'relative', 
          overflow: 'hidden', 
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          color: '#fff',
          marginTop: '8px'
        }}>
          {/* SVG Map Backdrop layout */}
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, opacity: 0.2, zIndex: 0 }}>
            <svg width="100%" height="100%" viewBox="0 0 800 300" fill="none" preserveAspectRatio="none">
              <path d="M 100 150 Q 200 50, 300 150 T 500 150 T 700 150" stroke="#3b82f6" strokeWidth="1.5" strokeDasharray="5 5" />
              <path d="M 150 120 Q 300 200, 450 120 T 750 120" stroke="#3b82f6" strokeWidth="1" />
              <circle cx="100" cy="150" r="4" fill="#60a5fa" />
              <circle cx="300" cy="150" r="4" fill="#60a5fa" />
              <circle cx="500" cy="150" r="4" fill="#60a5fa" />
              <circle cx="700" cy="150" r="4" fill="#60a5fa" />
            </svg>
          </div>

          <div style={{ position: 'relative', zIndex: 1, maxWidth: '640px', display: 'flex', flexDirection: 'column', gap: '14px', alignItems: 'center' }}>
            <div style={{ height: '36px', width: '36px', borderRadius: '50%', background: 'rgba(59, 130, 246, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#60a5fa' }}>
              <Globe size={20} />
            </div>
            
            <h2 style={{ fontSize: '24px', fontWeight: '800', margin: 0, letterSpacing: '-0.5px' }}>
              Global Precision Routing
            </h2>
            
            <p style={{ fontSize: '13.5px', color: '#94a3b8', margin: 0, lineHeight: '1.5' }}>
              Every message is optimized for cost and deliverability through our proprietary AI-mesh network, ensuring enterprise-grade performance across 190+ countries.
            </p>
          </div>
        </div>

        {/* Floating Chat Widget Trigger Button */}
        <button
          onClick={() => alert('Opening live chat console...')}
          style={{
            position: 'fixed',
            bottom: '24px',
            right: '24px',
            height: '48px',
            width: '48px',
            borderRadius: '50%',
            background: 'var(--primary)',
            color: '#fff',
            border: 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 4px 12px rgba(37, 16, 143, 0.35)',
            cursor: 'pointer',
            zIndex: 999,
            transition: 'transform 0.15s ease'
          }}
          onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
          onMouseOut={(e) => e.currentTarget.style.transform = 'none'}
          aria-label="Open support chat"
        >
          <MessageSquare size={20} />
        </button>

      </div>
      {/* New Campaign Creation Modal */}
      {showNewCampaignModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(17, 12, 60, 0.5)',
          zIndex: 9999,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '16px'
        }}>
          <div style={{
            background: '#fff',
            borderRadius: '8px',
            border: '1.5px solid #25108f',
            width: '100%',
            maxWidth: '440px',
            boxShadow: '0 8px 24px rgba(17, 12, 60, 0.15)',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 20px', borderBottom: '1.5px solid #25108f' }}>
              <h3 style={{ fontSize: '15px', fontWeight: '850', color: 'var(--text)', margin: 0 }}>Create SMS Campaign</h3>
              <button onClick={() => setShowNewCampaignModal(false)} style={{ border: 'none', background: 'transparent', cursor: 'pointer' }} aria-label="Close modal">
                x
              </button>
            </div>

            <form onSubmit={handleCreateCampaign} style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: '750', color: 'var(--text)', marginBottom: '6px' }}>Campaign Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Summer Promo Alert"
                  value={newCampaign.name}
                  onChange={(e) => setNewCampaign({ ...newCampaign, name: e.target.value })}
                  style={{
                    width: '100%',
                    height: '36px',
                    border: '1.5px solid #25108f',
                    borderRadius: '6px',
                    padding: '0 12px',
                    fontSize: '13px'
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: '750', color: 'var(--text)', marginBottom: '6px' }}>Target Recipients</label>
                <input
                  type="number"
                  required
                  placeholder="e.g. 15000"
                  value={newCampaign.recipients}
                  onChange={(e) => setNewCampaign({ ...newCampaign, recipients: e.target.value })}
                  style={{
                    width: '100%',
                    height: '36px',
                    border: '1.5px solid #25108f',
                    borderRadius: '6px',
                    padding: '0 12px',
                    fontSize: '13px'
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: '750', color: 'var(--text)', marginBottom: '6px' }}>Allocated Cost ($)</label>
                <input
                  type="number"
                  required
                  placeholder="e.g. 250"
                  value={newCampaign.cost}
                  onChange={(e) => setNewCampaign({ ...newCampaign, cost: e.target.value })}
                  style={{
                    width: '100%',
                    height: '36px',
                    border: '1.5px solid #25108f',
                    borderRadius: '6px',
                    padding: '0 12px',
                    fontSize: '13px'
                  }}
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '8px' }}>
                <button
                  type="button"
                  onClick={() => setShowNewCampaignModal(false)}
                  style={{
                    height: '36px',
                    padding: '0 16px',
                    border: '1.5px solid #25108f',
                    background: '#fff',
                    borderRadius: '6px',
                    fontSize: '13px',
                    fontWeight: '750'
                  }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  style={{
                    height: '36px',
                    padding: '0 16px',
                    border: 'none',
                    background: 'var(--primary)',
                    color: '#fff',
                    borderRadius: '6px',
                    fontSize: '13px',
                    fontWeight: '750'
                  }}
                >
                  Launch Campaign
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </AdminShell>
  );
}


