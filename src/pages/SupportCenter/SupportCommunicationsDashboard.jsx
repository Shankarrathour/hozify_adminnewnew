import React, { useState } from 'react';
import {
  ChevronRight,
  ChevronLeft,
  Mail,
  MessageSquare,
  Send,
  Plus,
  Search,
  Filter,
  TrendingUp,
  ExternalLink,
  CheckCheck,
  AlertCircle,
  HelpCircle,
  Smartphone,
  Check,
  ArrowUpRight
} from 'lucide-react';
import AdminShell from '../../components/layouts/AdminShell';

import Select from "../../components/ui/Select";

export default function SupportCommunicationsDashboard({ activeTab = 'Support Center' }) {
  const [selectedChannel, setSelectedChannel] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [showBroadcastModal, setShowBroadcastModal] = useState(false);
  const [broadcastMessage, setBroadcastMessage] = useState('');
  const [broadcastChannel, setBroadcastChannel] = useState('Email');

  const channels = ['All', 'Email', 'SMS', 'WhatsApp', 'In-App'];

  const kpis = [
    { label: 'Email Health', value: '98.2%', trend: '+0.5%', desc: 'inbox deliverability', isPositive: true },
    { label: 'WhatsApp Open', value: '84.5%', trend: '+4.2%', desc: 'read rate score', isPositive: true },
    { label: 'SMS Delivery', value: '99.1%', trend: '-0.1%', desc: 'network success', isPositive: false },
    { label: 'In-App CTR', value: '12.8%', trend: '+1.5%', desc: 'click-through rate', isPositive: true }
  ];

  const templates = [
    { title: 'Standard Welcome', type: 'Onboarding Sequence', channel: 'Email' },
    { title: 'OTP Authentication', type: 'Security Auto-Response', channel: 'SMS' },
    { title: 'Payment Reminder', type: 'Billing Follow-up', channel: 'WhatsApp' },
    { title: 'Feedback Survey', type: 'Customer Success', channel: 'In-App' }
  ];

  const [activities, setActivities] = useState([
    { id: 1, channel: 'Email', contact: 'john.doe@enterprise.com', preview: 'Re: Critical payment gateway error resolved. Thanks for your patience...', status: 'Delivered', time: '12 mins ago' },
    { id: 2, channel: 'WhatsApp', contact: '+1 (555) 019-2834', preview: 'Your refund for order #BK-9021 has been processed to your wallet.', status: 'Read', time: '45 mins ago' },
    { id: 3, channel: 'SMS', contact: '+91 98765 43210', preview: 'HOZIFY Admin Alert: High CPU load on DB-Primary. Escalating to Devops.', status: 'Seen', time: '1 hour ago' },
    { id: 4, channel: 'In-App', contact: 'User #9842 (Jane S.)', preview: 'Special Offer: Get 20% off your next booking using code SAVE20.', status: 'Seen', time: '2 hours ago' },
    { id: 5, channel: 'Email', contact: 'support@techcorp.io', preview: 'Agreement review draft uploaded. Please confirm visibility permissions.', status: 'Delivered', time: '3 hours ago' },
    { id: 6, channel: 'WhatsApp', contact: '+1 (555) 043-9821', preview: 'Verification complete. You can now access your partner console.', status: 'Read', time: '4 hours ago' },
    { id: 7, channel: 'SMS', contact: '+44 7911 123456', preview: 'Your OTP verification code for login is 904253. Valid for 5 minutes.', status: 'Expired', time: '1 day ago' }
  ]);

  const handleCopyTemplate = (title) => {
    alert(`Template "${title}" copied to clipboard!`);
  };

  const handleSendBroadcast = (e) => {
    e.preventDefault();
    if (!broadcastMessage.trim()) return;

    const newActivity = {
      id: Date.now(),
      channel: broadcastChannel,
      contact: 'Broadcast List (All Users)',
      preview: broadcastMessage,
      status: 'Delivered',
      time: 'Just now'
    };

    setActivities([newActivity, ...activities]);
    setBroadcastMessage('');
    setShowBroadcastModal(false);
    alert('Broadcast dispatch request triggered successfully.');
  };

  // Filter logic
  const filteredActivities = activities.filter(act => {
    if (selectedChannel !== 'All' && act.channel !== selectedChannel) return false;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      return act.contact.toLowerCase().includes(q) || act.preview.toLowerCase().includes(q);
    }
    return true;
  });

  // Simple Pagination variables
  const itemsPerPage = 5;
  const totalPages = Math.ceil(filteredActivities.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = filteredActivities.slice(startIndex, startIndex + itemsPerPage);

  const getStatusStyle = (status) => {
    switch (status) {
      case 'Delivered':
        return { color: '#2563eb', bg: '#eff6ff' };
      case 'Read':
      case 'Seen':
        return { color: 'var(--green)', bg: '#ecfdf5' };
      case 'Expired':
        return { color: '#dc2626', bg: '#fee2e2' };
      default:
        return { color: 'var(--muted)', bg: 'var(--soft)' };
    }
  };

  const getChannelIcon = (channel) => {
    switch (channel) {
      case 'Email':
        return <Mail size={14} />;
      case 'SMS':
        return <Smartphone size={14} />;
      case 'WhatsApp':
        return <MessageSquare size={14} />;
      default:
        return <Send size={14} />;
    }
  };

  return (
    <AdminShell showGlobalExport={true}
      activeTab={activeTab}
      brandText="HOZIFY"
      brandSubText="Enterprise Admin"
      headerTitle="Communication Center"
      searchPlaceholder="Search communication log records..."
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-section)', padding: '24px 0', position: 'relative' }}>
        
        {/* Breadcrumb Row */}
        <div style={{ fontSize: '12px', fontWeight: '750', color: 'var(--muted)', display: 'flex', alignItems: 'center', gap: '6px' }}>
          <span>Support Center</span>
          <ChevronRight size={12} />
          <span style={{ color: 'var(--primary)' }}>Communication Center</span>
        </div>

        {/* Page Header */}
        <div style={{ display: 'flex', justifySelf: 'stretch', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <h1 style={{ fontSize: '24px', fontWeight: '800', color: 'var(--text)', margin: 0 }}>
              Communication Center Dashboard
            </h1>
            <p style={{ fontSize: '13px', color: 'var(--muted)', margin: '4px 0 0' }}>
              Track delivery logs, response times, and run notification campaigns.
            </p>
          </div>

          <button
            onClick={() => setShowBroadcastModal(true)}
            style={{
              height: '38px',
              padding: '0 16px',
              borderRadius: '6px',
              border: 'none',
              background: 'var(--primary)',
              color: '#fff',
              fontWeight: '700',
              fontSize: '13px',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              cursor: 'pointer',
              boxShadow: '0 2px 4px rgba(37, 16, 143, 0.1)'
            }}
            type="button"
          >
            <Send size={14} />
            <span>Broadcast Message</span>
          </button>
        </div>

        {/* KPI Row */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
          {kpis.map((kpi, idx) => (
            <div key={idx} className="panel" style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '8px', background: '#fff' }}>
              <div style={{ display: 'flex', justifySelf: 'stretch', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '11px', fontWeight: '800', color: 'var(--muted)', textTransform: 'uppercase' }}>
                  {kpi.label}
                </span>
                <span style={{
                  fontSize: '10px',
                  fontWeight: '850',
                  color: kpi.isPositive ? '#07956f' : '#dc2626',
                  background: kpi.isPositive ? '#ecfdf5' : '#fee2e2',
                  padding: '2px 6px',
                  borderRadius: '4px'
                }}>
                  {kpi.trend}
                </span>
              </div>
              <div>
                <strong style={{ display: 'block', fontSize: '26px', fontWeight: '850', color: 'var(--text)' }}>
                  {kpi.value}
                </strong>
                <span style={{ fontSize: '11.5px', color: 'var(--muted)' }}>
                  {kpi.desc}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Content Section Split Pane */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr', lgGridTemplateColumns: '1fr 2.2fr', gap: 'var(--spacing-section)', alignItems: 'stretch' }}>
          
          {/* Left Side: Template Manager & Dispatch Stats */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-section)' }}>
            
            {/* Template Manager */}
            <div className="panel" style={{ padding: 'var(--spacing-section)', display: 'flex', flexDirection: 'column', gap: '16px', background: '#fff' }}>
              <div style={{ display: 'flex', justifySelf: 'stretch', justifyContent: 'space-between', alignItems: 'center' }}>
                <h3 style={{ fontSize: '14.5px', fontWeight: '850', color: 'var(--text)', margin: 0 }}>
                  Response Templates
                </h3>
                <button
                  onClick={() => alert('Redirecting to full template catalog')}
                  style={{ border: 'none', background: 'transparent', color: 'var(--primary)', fontSize: '12px', fontWeight: '800', cursor: 'pointer' }}
                  type="button"
                >
                  Manage All
                </button>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {templates.map((tpl, idx) => (
                  <div
                    key={idx}
                    onClick={() => handleCopyTemplate(tpl.title)}
                    style={{
                      padding: '12px',
                      borderRadius: '6px',
                      border: '1.5px solid #25108f',
                      background: 'var(--soft)',
                      cursor: 'pointer',
                      transition: 'all 0.15s ease'
                    }}
                    onMouseOver={(e) => e.currentTarget.style.border = '1.5px solid var(--primary)'}
                    onMouseOut={(e) => e.currentTarget.style.border = '1.5px solid #25108f'}
                  >
                    <div style={{ display: 'flex', justifySelf: 'stretch', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                      <strong style={{ fontSize: '12.5px', color: 'var(--text)' }}>{tpl.title}</strong>
                      <span style={{ fontSize: '9px', fontWeight: '850', color: 'var(--primary)', background: '#fff', border: '1.5px solid #25108f', padding: '1px 5px', borderRadius: '3px' }}>
                        {tpl.channel}
                      </span>
                    </div>
                    <span style={{ fontSize: '11px', color: 'var(--muted)' }}>{tpl.type}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Channel Routing Stats */}
            <div className="panel" style={{ padding: 'var(--spacing-section)', display: 'flex', flexDirection: 'column', gap: '16px', background: '#fff' }}>
              <h3 style={{ fontSize: '14.5px', fontWeight: '850', color: 'var(--text)', margin: 0 }}>
                Channel Share Ratio
              </h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {/* Email share */}
                <div>
                  <div style={{ display: 'flex', justifySelf: 'stretch', justifyContent: 'space-between', fontSize: '11.5px', fontWeight: '750', marginBottom: '4px' }}>
                    <span style={{ color: 'var(--muted)' }}>Email dispatch</span>
                    <strong style={{ color: 'var(--text)' }}>45%</strong>
                  </div>
                  <div style={{ height: '5px', background: '#eee9f6', borderRadius: '3px', overflow: 'hidden' }}>
                    <div style={{ width: '45%', height: '100%', background: 'var(--primary)' }} />
                  </div>
                </div>

                {/* WhatsApp share */}
                <div>
                  <div style={{ display: 'flex', justifySelf: 'stretch', justifyContent: 'space-between', fontSize: '11.5px', fontWeight: '750', marginBottom: '4px' }}>
                    <span style={{ color: 'var(--muted)' }}>WhatsApp message</span>
                    <strong style={{ color: 'var(--text)' }}>30%</strong>
                  </div>
                  <div style={{ height: '5px', background: '#eee9f6', borderRadius: '3px', overflow: 'hidden' }}>
                    <div style={{ width: '30%', height: '100%', background: '#07956f' }} />
                  </div>
                </div>

                {/* SMS share */}
                <div>
                  <div style={{ display: 'flex', justifySelf: 'stretch', justifyContent: 'space-between', fontSize: '11.5px', fontWeight: '750', marginBottom: '4px' }}>
                    <span style={{ color: 'var(--muted)' }}>SMS push dispatch</span>
                    <strong style={{ color: 'var(--text)' }}>15%</strong>
                  </div>
                  <div style={{ height: '5px', background: '#eee9f6', borderRadius: '3px', overflow: 'hidden' }}>
                    <div style={{ width: '15%', height: '100%', background: '#f59e0b' }} />
                  </div>
                </div>

                {/* In-App share */}
                <div>
                  <div style={{ display: 'flex', justifySelf: 'stretch', justifyContent: 'space-between', fontSize: '11.5px', fontWeight: '750', marginBottom: '4px' }}>
                    <span style={{ color: 'var(--muted)' }}>In-App alerts</span>
                    <strong style={{ color: 'var(--text)' }}>10%</strong>
                  </div>
                  <div style={{ height: '5px', background: '#eee9f6', borderRadius: '3px', overflow: 'hidden' }}>
                    <div style={{ width: '10%', height: '100%', background: '#3b82f6' }} />
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* Right Side: Paginated Activity Ledger with Search & Tab Filters */}
          <div className="panel" style={{ padding: 'var(--spacing-section)', display: 'flex', flexDirection: 'column', gap: '20px', background: '#fff' }}>
            
            {/* Header Filters row */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
              {/* Tabs */}
              <div style={{ display: 'flex', gap: '4px', background: 'var(--soft)', padding: '2px', borderRadius: '8px', border: '1.5px solid #25108f' }}>
                {channels.map((chan) => (
                  <button
                    key={chan}
                    onClick={() => { setSelectedChannel(chan); setCurrentPage(1); }}
                    style={{
                      height: '30px',
                      padding: '0 12px',
                      borderRadius: '6px',
                      border: 'none',
                      background: selectedChannel === chan ? '#fff' : 'transparent',
                      color: selectedChannel === chan ? 'var(--text)' : 'var(--muted)',
                      fontSize: '12px',
                      fontWeight: '750',
                      cursor: 'pointer'
                    }}
                    type="button"
                  >
                    {chan}
                  </button>
                ))}
              </div>

              {/* Search input */}
              <div style={{ position: 'relative', minWidth: '200px' }}>
                <Search size={14} style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: 'var(--muted)' }} />
                <input
                  type="text"
                  placeholder="Search contacts..."
                  value={searchQuery}
                  onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }}
                  style={{
                    height: '32px',
                    width: '100%',
                    borderRadius: '6px',
                    border: '1.5px solid #25108f',
                    padding: '0 10px 0 32px',
                    fontSize: '12.5px'
                  }}
                />
              </div>
            </div>

            {/* Activities Table */}
            <div style={{ overflowY: 'auto', maxHeight: '400px', flex: 1 }}>
              <div className="table-responsive-wrapper">
<table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px', textAlign: 'left' }}>
                <thead>
                  <tr style={{ borderBottom: '1.5px solid #25108f', color: 'var(--muted)' }}>
                    <th style={{ padding: '10px 12px', fontWeight: '800', fontSize: '10px' }}>CHANNEL</th>
                    <th style={{ padding: '10px 12px', fontWeight: '800', fontSize: '10px' }}>CONTACT</th>
                    <th style={{ padding: '10px 12px', fontWeight: '800', fontSize: '10px' }}>MESSAGE SUMMARY PREVIEW</th>
                    <th style={{ padding: '10px 12px', fontWeight: '800', fontSize: '10px' }}>STATUS</th>
                    <th style={{ padding: '10px 12px', fontWeight: '800', fontSize: '10px', textAlign: 'right' }}>SENT TIME</th>
                  </tr>
                </thead>
                <tbody>
                  {currentItems.length === 0 ? (
                    <tr>
                      <td colSpan={5} style={{ padding: 'var(--spacing-page)', textAlign: 'center', color: 'var(--muted)' }}>
                        No dispatch logs matched your filter criteria.
                      </td>
                    </tr>
                  ) : (
                    currentItems.map((act) => {
                      const statStyle = getStatusStyle(act.status);
                      return (
                        <tr key={act.id} style={{ borderBottom: '1px solid var(--lavender)' }}>
                          <td style={{ padding: '12px' }}>
                            <span style={{
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: '6px',
                              fontSize: '11px',
                              fontWeight: '800',
                              color: 'var(--primary)',
                              background: 'var(--soft)',
                              padding: '3px 8px',
                              borderRadius: '4px'
                            }}>
                              {getChannelIcon(act.channel)}
                              {act.channel}
                            </span>
                          </td>
                          <td style={{ padding: '12px', fontWeight: '750', color: 'var(--text)' }}>
                            {act.contact}
                          </td>
                          <td style={{ padding: '12px', color: 'var(--muted)', maxWidth: '280px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                            {act.preview}
                          </td>
                          <td style={{ padding: '12px' }}>
                            <span style={{
                              fontSize: '10px',
                              fontWeight: '900',
                              color: statStyle.color,
                              background: statStyle.bg,
                              padding: '2px 8px',
                              borderRadius: '12px',
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: '4px'
                            }}>
                              {act.status === 'Read' || act.status === 'Seen' ? <CheckCheck size={11} /> : <Check size={11} />}
                              {act.status}
                            </span>
                          </td>
                          <td style={{ padding: '12px', color: 'var(--muted)', fontSize: '11.5px', textAlign: 'right' }}>
                            {act.time}
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
</div>
            </div>

            {/* Pagination Footer */}
            {totalPages > 1 && (
              <div style={{ display: 'flex', justifySelf: 'stretch', justifyContent: 'space-between', alignItems: 'center', borderTop: '1.5px solid #25108f', paddingTop: '14px' }}>
                <span style={{ fontSize: '11.5px', color: 'var(--muted)' }}>
                  Showing <strong>{startIndex + 1}</strong> to <strong>{Math.min(startIndex + itemsPerPage, filteredActivities.length)}</strong> of <strong>{filteredActivities.length}</strong> items
                </span>
                
                <div style={{ display: 'flex', gap: '6px' }}>
                  <button
                    onClick={() => setCurrentPage(p => Math.max(p - 1, 1))}
                    disabled={currentPage === 1}
                    style={{
                      height: '30px',
                      width: '30px',
                      borderRadius: '6px',
                      border: '1.5px solid #25108f',
                      background: '#fff',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: currentPage === 1 ? 'not-allowed' : 'pointer',
                      opacity: currentPage === 1 ? 0.5 : 1
                    }}
                    type="button"
                  >
                    <ChevronLeft size={14} />
                  </button>

                  <button
                    onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    style={{
                      height: '30px',
                      width: '30px',
                      borderRadius: '6px',
                      border: '1.5px solid #25108f',
                      background: '#fff',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: currentPage === totalPages ? 'not-allowed' : 'pointer',
                      opacity: currentPage === totalPages ? 0.5 : 1
                    }}
                    type="button"
                  >
                    <ChevronRight size={14} />
                  </button>
                </div>
              </div>
            )}
          </div>

        </div>

      </div>
      {/* Broadcast Message Modal Overlay */}
      {showBroadcastModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.4)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 9999,
          padding: '20px'
        }}>
          <div style={{
            background: '#fff',
            borderRadius: '12px',
            width: '100%',
            maxWidth: '480px',
            padding: 'var(--spacing-section)',
            boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px'
          }}>
            <div style={{ display: 'flex', justifySelf: 'stretch', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3 style={{ fontSize: '16px', fontWeight: '850', color: 'var(--text)', margin: 0 }}>
                Broadcast Message
              </h3>
              <button
                onClick={() => setShowBroadcastModal(false)}
                style={{ border: 'none', background: 'transparent', color: 'var(--muted)', fontSize: '18px', cursor: 'pointer', padding: '4px' }}
                type="button"
              >
                ×
              </button>
            </div>

            <form onSubmit={handleSendBroadcast} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label style={{ fontSize: '11.5px', fontWeight: '800', color: 'var(--muted)', textTransform: 'uppercase' }}>
                  Target Delivery Channel
                </label>
                <Select
                  value={broadcastChannel}
                  onChange={(e) => setBroadcastChannel(e.target.value)}
                  style={{ height: '36px', borderRadius: '6px', border: '1.5px solid #25108f', padding: '0 10px', fontSize: '12.5px' }}
                  options={[{
                    label: "Email",
                    value: "Email"
                  }, {
                    label: "SMS",
                    value: "SMS"
                  }, {
                    label: "WhatsApp",
                    value: "WhatsApp"
                  }, {
                    label: "In-App",
                    value: "In-App"
                  }]} />
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label style={{ fontSize: '11.5px', fontWeight: '800', color: 'var(--muted)', textTransform: 'uppercase' }}>
                  Message Content
                </label>
                <textarea
                  placeholder="Enter message text to broadcast..."
                  value={broadcastMessage}
                  onChange={(e) => setBroadcastMessage(e.target.value)}
                  required
                  rows={4}
                  style={{
                    borderRadius: '6px',
                    border: '1.5px solid #25108f',
                    padding: '10px',
                    fontSize: '12.5px',
                    
                    resize: 'vertical'
                  }}
                />
              </div>

              <div style={{ display: 'flex', justifySelf: 'stretch', justifyContent: 'flex-end', gap: '10px', marginTop: '10px' }}>
                <button
                  type="button"
                  onClick={() => setShowBroadcastModal(false)}
                  style={{
                    height: '36px',
                    padding: '0 16px',
                    borderRadius: '6px',
                    border: '1.5px solid #25108f',
                    background: '#fff',
                    color: 'var(--text)',
                    fontSize: '12.5px',
                    fontWeight: '700',
                    cursor: 'pointer'
                  }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  style={{
                    height: '36px',
                    padding: '0 16px',
                    borderRadius: '6px',
                    border: 'none',
                    background: 'var(--primary)',
                    color: '#fff',
                    fontSize: '12.5px',
                    fontWeight: '700',
                    cursor: 'pointer',
                    boxShadow: '0 2px 4px rgba(37, 16, 143, 0.1)'
                  }}
                >
                  Dispatch
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </AdminShell>
  );
}


