import React, { useState } from 'react';
import { useApp } from '../../hooks/useApp';
import { ROUTES } from '../../config/routes';
import AdminShell from '../../components/layouts/AdminShell';
import {
  MessageSquare,
  Send,
  Smartphone,
  Users,
  Target,
  FileText,
  Mail,
  Globe,
  Bell,
  CheckCircle,
  X,
  FileUp,
  Sliders,
  MoreVertical,
  Calendar,
  Search,
  Phone,
  Video,
  Paperclip,
  Smile,
  Mic,
  FolderOpen,
  Plus,
  Image,
  ChevronDown
} from 'lucide-react';

export default function CommunicationsCenter() {
  const { navigate } = useApp();
  const [viewMode, setViewMode] = useState('inbox'); // 'inbox' or 'campaign'
  const [activeThread, setActiveThread] = useState('global-steel');
  const [messageText, setMessageText] = useState('');

  // Inbox Chat Messages State
  const [conversations, setConversations] = useState({
    'global-steel': [
      {
        id: 1,
        sender: 'Global Steel Corp',
        text: 'Hello Alex, regarding PO-8829, we have received the revised specs for the structural steel girders. Our engineering team has confirmed they can maintain the load ratings requested.',
        time: '14:15',
        type: 'incoming',
        channel: 'Email'
      },
      {
        id: 2,
        sender: 'Alex Thompson',
        text: "That's excellent news. What's the lead time looking like if we finalize the order by end of day Friday? We need these on-site by Nov 12th.",
        time: '14:18',
        type: 'outgoing',
        channel: 'Email'
      },
      {
        id: 3,
        sender: 'Global Steel Corp',
        text: "I've attached the preliminary quote with the shipping schedule. We can meet the Nov 12th deadline if confirmed within 48 hours.",
        time: '14:20',
        type: 'incoming',
        channel: 'Email',
        attachment: {
          name: 'P3_8829_steelQuote.pdf',
          size: '1.4 MB'
        }
      }
    ],
    'james-supervisor': [
      {
        id: 1,
        sender: 'James (Site Supervisor)',
        text: 'Cement delivery delayed by 2 hours due to traffic. Need to reschedule cranes.',
        time: '10:45',
        type: 'incoming',
        channel: 'SMS'
      }
    ],
    'ecobuild': [
      {
        id: 1,
        sender: 'EcoBuild Solutions',
        text: 'Sent a photo: Invoice_Scan.jpg',
        time: 'Yesterday',
        type: 'incoming',
        channel: 'WhatsApp',
        image: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=300&q=80'
      }
    ],
    'titan': [
      {
        id: 1,
        sender: 'Titan Refineries',
        text: 'The updated MSDS documents are attached for your safety review team.',
        time: 'Tue',
        type: 'incoming',
        channel: 'Email'
      }
    ]
  });

  const handleSendMessage = () => {
    if (!messageText.trim()) return;
    const newMsg = {
      id: Date.now(),
      sender: 'Alex Thompson',
      text: messageText,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false }),
      type: 'outgoing',
      channel: 'Email'
    };
    setConversations({
      ...conversations,
      [activeThread]: [...conversations[activeThread], newMsg]
    });
    setMessageText('');
  };

  // --- CAMPAIGN COMPOSER STATES (PRESERVED LEGACY FEATURE) ---
  const [selectedChannel, setSelectedChannel] = useState('Email');
  const [campaignName, setCampaignName] = useState('');
  const [recipients, setRecipients] = useState(['Retail Category', 'North Region']);
  const [newRecipient, setNewRecipient] = useState('');
  const [msgBody, setMsgBody] = useState('');
  const [scheduleMode, setScheduleMode] = useState('now');
  const [scheduleTime, setScheduleTime] = useState('');
  const [isSent, setIsSent] = useState(false);
  const [outreachHistory, setOutreachHistory] = useState([
    { name: 'Annual Tax Filing Reminder', channel: 'Email', status: 'SENT', statusColor: '#10b981', statusBg: '#ecfdf5', reach: '4,502', engagement: '24.5%', engRate: 24.5, engColor: '#10b981' },
    { name: 'Emergency System Maintenance', channel: 'SMS', status: 'SCHEDULED', statusColor: '#2563eb', statusBg: '#eff6ff', reach: '1,120', engagement: 'Pending delivery...', engRate: 0, engColor: '#64748b' },
    { name: 'New Feature Spotlight: Analytics V2', channel: 'WhatsApp', status: 'DRAFT', statusColor: '#64748b', statusBg: '#f1f5f9', reach: '840', engagement: '—', engRate: 0, engColor: '#64748b' },
    { name: 'Holiday Hours Collection', channel: 'Push', status: 'SENT', statusColor: '#10b981', statusBg: '#ecfdf5', reach: '12,400', engagement: '12.2%', engRate: 12.2, engColor: '#f97316' }
  ]);

  const handleAddRecipient = (e) => {
    if (e.key === 'Enter' && newRecipient.trim()) {
      setRecipients([...recipients, newRecipient.trim()]);
      setNewRecipient('');
    }
  };
  const handleRemoveRecipient = (idx) => {
    setRecipients(recipients.filter((_, i) => i !== idx));
  };
  const handleDeploy = (e) => {
    e.preventDefault();
    if (!campaignName || !msgBody) {
      alert('Please fill out the Campaign Name and Message Body.');
      return;
    }
    const newCampaign = {
      name: campaignName,
      channel: selectedChannel,
      status: scheduleMode === 'now' ? 'SENT' : 'SCHEDULED',
      statusColor: scheduleMode === 'now' ? '#10b981' : '#2563eb',
      statusBg: scheduleMode === 'now' ? '#ecfdf5' : '#eff6ff',
      reach: '1,240',
      engagement: scheduleMode === 'now' ? '0.0%' : 'Pending delivery...',
      engRate: 0,
      engColor: '#64748b'
    };
    setOutreachHistory([newCampaign, ...outreachHistory]);
    setIsSent(true);
    setCampaignName('');
    setMsgBody('');
    setTimeout(() => setIsSent(false), 4000);
  };

  return (
    <AdminShell showGlobalExport={true}
      activeTab="Communications"
      brandText="Hozify"
      brandSubText="EXECUTIVE COMMAND"
      headerTitle=""
      customProfileName="Alex Thompson"
      customProfileRole="PROCUREMENT MANAGER"
      searchPlaceholder="Search conversations..."
    >
      {/* Dynamic toggle at the top to switch between Inbox and Campaigns */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1.5px solid #25108f', paddingBottom: '12px', marginBottom: '16px' }}>
        <div>
          <h1 style={{ margin: 0, fontSize: '20px', fontWeight: '800', color: 'var(--text)' }}>
            {viewMode === 'inbox' ? 'Communications Workspace' : 'Campaign Manager'}
          </h1>
        </div>
        <div style={{ display: 'flex', gap: '8px' }}>
          <button
            onClick={() => setViewMode('inbox')}
            style={{
              padding: '6px 14px',
              borderRadius: '6px',
              border: '1.5px solid #25108f',
              background: viewMode === 'inbox' ? '#25108f' : '#fff',
              color: viewMode === 'inbox' ? '#fff' : 'var(--text)',
              fontSize: '12px',
              fontWeight: '700',
              cursor: 'pointer'
            }}
          >
            Conversations Inbox
          </button>
          <button
            onClick={() => setViewMode('campaign')}
            style={{
              padding: '6px 14px',
              borderRadius: '6px',
              border: '1.5px solid #25108f',
              background: viewMode === 'campaign' ? '#25108f' : '#fff',
              color: viewMode === 'campaign' ? '#fff' : 'var(--text)',
              fontSize: '12px',
              fontWeight: '700',
              cursor: 'pointer'
            }}
          >
            Campaign Outreach
          </button>
        </div>
      </div>

      {viewMode === 'inbox' ? (
        /* SCREEN 2: 3-Column Chat Workspace */
        <div style={{ display: 'grid', gridTemplateColumns: '280px 1fr 280px', gap: '20px', minHeight: 'calc(100vh - 180px)', alignItems: 'stretch' }}>
          
          {/* COLUMN 1: INBOX LEDGER (Left) */}
          <div className="panel" style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '14px', overflowY: 'auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '15px', fontWeight: '800', color: 'var(--text)' }}>Inbox</span>
              {/* Filter Icons */}
              <div style={{ display: 'flex', gap: '8px' }}>
                <button style={{ border: 'none', background: 'transparent', color: 'var(--primary)', cursor: 'pointer' }}><Image size={15} /></button>
                <button style={{ border: 'none', background: 'transparent', color: '#565365', cursor: 'pointer' }}><Mail size={15} /></button>
                <button style={{ border: 'none', background: 'transparent', color: '#565365', cursor: 'pointer' }}><MessageSquare size={15} /></button>
              </div>
            </div>

            {/* Thread Search */}
            <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
              <Search size={14} style={{ position: 'absolute', left: '10px', color: 'var(--muted)' }} />
              <input
                placeholder="Search..."
                style={{ width: '100%', height: '34px', border: '1.5px solid #25108f', borderRadius: '6px', paddingLeft: '32px', paddingRight: '12px', fontSize: '12px', outline: 'none' }}
              />
            </div>

            {/* Conversation Threads */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', flex: 1 }}>
              {[
                { id: 'global-steel', name: 'Global Steel Corp', desc: 'Quote for PO-8829: We have reviewed the specifications for the heavy-duty...', time: '14:22', unread: true },
                { id: 'james-supervisor', name: 'James (Site Supervisor)', desc: 'Cement delivery delayed by 2 hours due to traffic. Need to reschedule cranes.', time: '10:45', comments: true },
                { id: 'ecobuild', name: 'EcoBuild Solutions', desc: 'Sent a photo: Invoice_Scan.jpg', time: 'Yesterday', photo: true },
                { id: 'titan', name: 'Titan Refineries', desc: 'The updated MSDS documents are attached for your safety review team.', time: 'Tue' }
              ].map((thread) => {
                const isActive = activeThread === thread.id;
                return (
                  <div
                    key={thread.id}
                    onClick={() => setActiveThread(thread.id)}
                    style={{
                      padding: '12px',
                      borderRadius: '8px',
                      background: isActive ? 'rgba(37, 16, 143, 0.06)' : 'transparent',
                      borderLeft: isActive ? '3px solid #25108f' : '3px solid transparent',
                      cursor: 'pointer',
                      transition: 'all 0.2s',
                      position: 'relative'
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                      <span style={{ fontSize: '13px', fontWeight: '800', color: 'var(--text)' }}>{thread.name}</span>
                      <span style={{ fontSize: '10px', color: 'var(--muted)' }}>{thread.time}</span>
                    </div>
                    <p style={{ fontSize: '11px', color: 'var(--muted)', margin: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: '210px' }}>
                      {thread.desc}
                    </p>
                    {thread.unread && (
                      <span style={{ position: 'absolute', right: '12px', bottom: '12px', height: '6px', width: '6px', borderRadius: '50%', background: '#07956f' }} />
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* COLUMN 2: ACTIVE CONVERSATION PANE (Center) */}
          <div className="panel" style={{ display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
            {/* Chat Header */}
            <div style={{ padding: '16px 20px', borderBottom: '1.5px solid #25108f', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ height: '36px', width: '36px', borderRadius: '50%', background: '#eee9f6', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '800', color: 'var(--primary)' }}>
                  GS
                </div>
                <div>
                  <strong style={{ display: 'block', fontSize: '14px', color: 'var(--text)' }}>
                    {activeThread === 'global-steel' ? 'Global Steel Corp' : activeThread === 'james-supervisor' ? 'James (Site Supervisor)' : activeThread === 'ecobuild' ? 'EcoBuild Solutions' : 'Titan Refineries'}
                  </strong>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '11px', color: 'var(--muted)', marginTop: '2px' }}>
                    <span style={{ height: '6px', width: '6px', borderRadius: '50%', background: '#07956f' }} />
                    Online • Active on Email & WhatsApp
                  </span>
                </div>
              </div>
              <div style={{ display: 'flex', gap: '16px', color: '#565365' }}>
                <button style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: 'inherit' }}><Phone size={18} /></button>
                <button style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: 'inherit' }}><Video size={18} /></button>
                <button style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: 'inherit' }}><MoreVertical size={18} /></button>
              </div>
            </div>

            {/* Conversation Timeline */}
            <div style={{ flex: 1, padding: '20px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '16px', background: '#fafafc' }}>
              <div style={{ alignSelf: 'center', background: '#eee9f6', color: '#565365', fontSize: '10px', fontWeight: '800', padding: '4px 10px', borderRadius: '20px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                Today, Oct 24
              </div>

              {conversations[activeThread]?.map((msg) => {
                const isOutgoing = msg.type === 'outgoing';
                return (
                  <div key={msg.id} style={{ display: 'flex', gap: '8px', alignSelf: isOutgoing ? 'flex-end' : 'flex-start', maxWidth: '75%', flexDirection: isOutgoing ? 'row-reverse' : 'row' }}>
                    {!isOutgoing && (
                      <div style={{ height: '28px', width: '28px', borderRadius: '50%', background: '#cbd5e1', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '10px', fontWeight: '800', color: '#334155', flexShrink: 0 }}>
                        {msg.sender.split(' ').map(n => n[0]).join('')}
                      </div>
                    )}
                    <div>
                      <div
                        style={{
                          background: isOutgoing ? '#25108f' : '#ffffff',
                          color: isOutgoing ? '#ffffff' : 'var(--text)',
                          padding: '12px 16px',
                          borderRadius: isOutgoing ? '12px 12px 0 12px' : '12px 12px 12px 0',
                          fontSize: '13px',
                          boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
                          lineHeight: '1.4'
                        }}
                      >
                        {msg.text}
                        
                        {msg.attachment && (
                          <div style={{ marginTop: '10px', background: '#f8f4fc', border: '1.5px solid #25108f', borderRadius: '6px', padding: '10px', display: 'flex', alignItems: 'center', justifySelf: 'stretch', justifyContent: 'space-between', gap: '12px', color: 'var(--text)' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                              <div style={{ height: '30px', width: '24px', background: '#fee2e2', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ef4444', fontWeight: '900', fontSize: '8px' }}>PDF</div>
                              <div>
                                <span style={{ display: 'block', fontSize: '11px', fontWeight: '700' }}>{msg.attachment.name}</span>
                                <span style={{ display: 'block', fontSize: '9px', color: 'var(--muted)' }}>{msg.attachment.size}</span>
                              </div>
                            </div>
                            <button style={{ border: 'none', background: 'transparent', color: 'var(--primary)', cursor: 'pointer' }}>💾</button>
                          </div>
                        )}

                        {msg.image && (
                          <img src={msg.image} alt="Attachment" style={{ width: '100%', borderRadius: '6px', marginTop: '10px' }} />
                        )}
                      </div>
                      <span style={{ display: 'block', fontSize: '9px', color: 'var(--muted)', marginTop: '4px', textAlign: isOutgoing ? 'right' : 'left' }}>
                        {msg.time} • {msg.channel} {isOutgoing && <span style={{ color: '#3b82f6', marginLeft: '4px' }}>✓✓</span>}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Quick Actions Row */}
            <div style={{ padding: '10px 20px', background: '#fff', borderTop: '1.5px solid #25108f', display: 'flex', gap: '10px' }}>
              <button
                onClick={() => alert('Quote approved')}
                style={{ background: 'rgba(37, 16, 143, 0.05)', border: '1px solid #25108f', color: 'var(--primary)', fontSize: '12px', fontWeight: '700', padding: '6px 14px', borderRadius: '20px', cursor: 'pointer' }}
              >
                Approve Quote
              </button>
              <button
                onClick={() => alert('Modification requested')}
                style={{ background: 'transparent', border: '1.5px solid #25108f', color: 'var(--text)', fontSize: '12px', fontWeight: '700', padding: '6px 14px', borderRadius: '20px', cursor: 'pointer' }}
              >
                Request Modification
              </button>
              <button
                onClick={() => alert('Delivery confirmed')}
                style={{ background: 'transparent', border: '1.5px solid #25108f', color: 'var(--text)', fontSize: '12px', fontWeight: '700', padding: '6px 14px', borderRadius: '20px', cursor: 'pointer' }}
              >
                Confirm Delivery
              </button>
            </div>

            {/* Chat Input Bar */}
            <div style={{ padding: '16px 20px', borderTop: '1.5px solid #25108f', background: '#fff' }}>
              <div style={{ border: '1.5px solid #25108f', borderRadius: '8px', padding: '10px', background: '#f8f9fa' }}>
                <textarea
                  placeholder="Type a message or use / for templates..."
                  value={messageText}
                  onChange={(e) => setMessageText(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handleSendMessage();
                    }
                  }}
                  style={{ width: '100%', border: 'none', background: 'transparent', outline: 'none', fontSize: '13px', resize: 'none', height: '40px' }}
                />
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '6px' }}>
                  {/* Accessories */}
                  <div style={{ display: 'flex', gap: '12px', color: 'var(--muted)' }}>
                    <button style={{ border: 'none', background: 'transparent', color: 'inherit', cursor: 'pointer' }}><Paperclip size={16} /></button>
                    <button style={{ border: 'none', background: 'transparent', color: 'inherit', cursor: 'pointer' }}><Smile size={16} /></button>
                    <button style={{ border: 'none', background: 'transparent', color: 'inherit', cursor: 'pointer' }}><Mic size={16} /></button>
                  </div>
                  {/* Send details */}
                  <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '11px', fontWeight: '700', color: 'var(--muted)', cursor: 'pointer' }}>
                      <span>Send as Email</span>
                      <ChevronDown size={12} />
                    </div>
                    <button
                      onClick={handleSendMessage}
                      style={{ background: 'var(--primary)', color: '#fff', border: 'none', borderRadius: '6px', height: '32px', padding: '0 14px', display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer' }}
                    >
                      <span>Send</span>
                      <Send size={12} />
                    </button>
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* COLUMN 3: CONTEXT CONSOLE (Right) */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            
            {/* Supplier Details */}
            <div className="panel" style={{ padding: '16px', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: '10px' }}>
              <span style={{ fontSize: '10px', fontWeight: '800', color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.5px', alignSelf: 'flex-start' }}>Supplier Details</span>
              
              <div style={{ height: '54px', width: '54px', borderRadius: '12px', background: '#fee2e2', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ef4444', fontWeight: '800', fontSize: '18px' }}>
                CO
              </div>
              <div>
                <strong style={{ display: 'block', fontSize: '13px', color: 'var(--text)' }}>Global Steel Corp</strong>
                <span style={{ display: 'block', fontSize: '11px', color: 'var(--muted)', marginTop: '2px' }}>Industrial Tier-1 Partner</span>
              </div>
              
              {/* Ratings / Orders info box */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', width: '100%', borderTop: '1.5px solid #25108f', paddingTop: '10px', marginTop: '4px' }}>
                <div style={{ borderRight: '1.5px solid #25108f' }}>
                  <strong style={{ display: 'block', fontSize: '14px', color: 'var(--text)' }}>4.8</strong>
                  <span style={{ display: 'block', fontSize: '9px', color: 'var(--muted)', textTransform: 'uppercase' }}>Rating</span>
                </div>
                <div>
                  <strong style={{ display: 'block', fontSize: '14px', color: 'var(--text)' }}>124</strong>
                  <span style={{ display: 'block', fontSize: '9px', color: 'var(--muted)', textTransform: 'uppercase' }}>Orders</span>
                </div>
              </div>
            </div>

            {/* Linked Order */}
            <div className="panel" style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <span style={{ fontSize: '10px', fontWeight: '800', color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Linked Order</span>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <span style={{ alignSelf: 'flex-start', fontSize: '9px', fontWeight: '900', background: '#fffbeb', color: '#b45309', padding: '2px 6px', borderRadius: '4px' }}>
                  DRAFT #PO-8829
                </span>
                <strong style={{ fontSize: '13px', color: 'var(--text)' }}>Heavy Structural Girders</strong>
                <span style={{ fontSize: '18px', fontWeight: '800', color: 'var(--text)' }}>$42,500.00</span>
                
                {/* Progress bar */}
                <div style={{ height: '4px', background: '#eee9f6', borderRadius: '2px', overflow: 'hidden', marginTop: '4px' }}>
                  <div style={{ width: '35%', height: '100%', background: 'var(--primary)' }} />
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '9px', color: 'var(--muted)', marginTop: '4px', fontWeight: '700' }}>
                  <span>Quote Phase</span>
                  <span>Est. Delivery Nov 12</span>
                </div>
              </div>
            </div>

            {/* Shared Media */}
            <div className="panel" style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <span style={{ fontSize: '10px', fontWeight: '800', color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Shared Media</span>
              
              <div style={{ display: 'flex', gap: '10px' }}>
                <img
                  src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=80&h=80&q=80"
                  alt="Shared media 1"
                  style={{ height: '48px', width: '48px', borderRadius: '6px', objectFit: 'cover' }}
                />
                <img
                  src="https://images.unsplash.com/photo-1581094288338-2314dddb7ecc?auto=format&fit=crop&w=80&h=80&q=80"
                  alt="Shared media 2"
                  style={{ height: '48px', width: '48px', borderRadius: '6px', objectFit: 'cover' }}
                />
                <button
                  onClick={() => alert('Add media')}
                  style={{ height: '48px', width: '48px', border: '1px dashed var(--line)', background: '#f8fafc', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: 'var(--muted)' }}
                >
                  <Plus size={16} />
                </button>
              </div>
            </div>

            {/* Archive Conversation */}
            <button
              onClick={() => alert('Conversation Archived')}
              style={{
                width: '100%',
                height: '40px',
                border: '1.5px solid #25108f',
                background: '#fff',
                color: 'var(--text)',
                borderRadius: '6px',
                fontSize: '12px',
                fontWeight: '700',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                cursor: 'pointer',
                marginTop: 'auto'
              }}
            >
              <FolderOpen size={14} />
              <span>Archive Conversation</span>
            </button>
          </div>

        </div>
      ) : (
        /* PRESERVED CAMPAIGN OUTREACH LAYOUT */
        <div className="communications-center-wrapper" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {isSent && (
            <div style={{ background: '#ecfdf5', border: '1px solid #a7f3d0', color: '#047857', padding: '12px 14px', borderRadius: '6px', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', fontWeight: '700' }}>
              <CheckCircle size={18} />
              <span>Campaign deployed successfully to the delivery network!</span>
            </div>
          )}

          <div className="fraud-top-grid" style={{ gap: '20px', alignItems: 'stretch' }}>
            
            {/* Column 1: Channels sidebar (Left) */}
            <div className="panel" style={{ flex: 0.6, padding: '20px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <h3 style={{ fontSize: '10px', fontWeight: '800', color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.5px', margin: '0 0 4px' }}>Channels</h3>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {[
                  { id: 'Email', label: 'Email', icon: Mail, usage: '6,540 / 10,000 messages' },
                  { id: 'SMS', label: 'SMS', icon: Smartphone, usage: null },
                  { id: 'WhatsApp', label: 'WhatsApp', icon: MessageSquare, usage: null },
                  { id: 'Push', label: 'Push Notification', icon: Bell, usage: null }
                ].map((ch) => {
                  const isActive = selectedChannel === ch.id;
                  const Icon = ch.icon;
                  return (
                    <button
                      key={ch.id}
                      onClick={() => setSelectedChannel(ch.id)}
                      style={{
                        width: '100%',
                        textAlign: 'left',
                        padding: '12px',
                        background: isActive ? '#eff6ff' : 'transparent',
                        border: isActive ? '1px solid #3b82f6' : '1px solid transparent',
                        color: isActive ? '#1e40af' : 'var(--text)',
                        borderRadius: '8px',
                        cursor: 'pointer',
                        outline: 'none'
                      }}
                      type="button"
                    >
                      <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                        <Icon size={18} />
                        <strong style={{ fontSize: '13px' }}>{ch.label}</strong>
                      </div>
                      {ch.id === 'Email' && (
                        <div style={{ marginTop: '8px', fontSize: '9px', fontWeight: '700', color: 'var(--muted)' }}>
                          <span style={{ display: 'block', marginBottom: '4px' }}>Usage Limit</span>
                          <div style={{ height: '4px', background: '#e2e8f0', borderRadius: '2px', overflow: 'hidden' }}>
                            <div style={{ width: '65%', height: '100%', background: '#4f46e5' }} />
                          </div>
                          <span style={{ display: 'block', marginTop: '4px' }}>{ch.usage}</span>
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Column 2: Broadcaster Composer Form (Center) */}
            <div className="panel" style={{ flex: 1.8, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
              <form onSubmit={handleDeploy} style={{ padding: 'var(--spacing-section)', display: 'flex', flexDirection: 'column', gap: '16px', flex: 1 }}>
                
                {/* Campaign Name */}
                <div>
                  <label htmlFor="campaign-name" style={{ display: 'block', fontSize: '11px', fontWeight: '800', color: 'var(--muted)', textTransform: 'uppercase', marginBottom: '6px' }}>Campaign Name</label>
                  <input
                    id="campaign-name"
                    type="text"
                    style={{ width: '100%', height: '40px', border: '1.5px solid #25108f', borderRadius: '6px', padding: '0 12px', fontSize: '13px', outline: 'none' }}
                    placeholder="e.g., Q4 Compliance Update"
                    value={campaignName}
                    onChange={(e) => setCampaignName(e.target.value)}
                  />
                </div>

                {/* Recipient Selection tags */}
                <div>
                  <label htmlFor="recipient-input" style={{ display: 'block', fontSize: '11px', fontWeight: '800', color: 'var(--muted)', textTransform: 'uppercase', marginBottom: '6px' }}>Recipient Selection</label>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', border: '1.5px solid #25108f', background: '#fff', borderRadius: '6px', padding: '6px 10px', minHeight: '40px' }}>
                    {recipients.map((rec, idx) => (
                      <span key={idx} style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', background: '#eff6ff', color: '#1e40af', padding: '2px 8px', borderRadius: '4px', fontSize: '11px', fontWeight: '700' }}>
                        {rec}
                        <X size={12} style={{ cursor: 'pointer' }} onClick={() => handleRemoveRecipient(idx)} />
                      </span>
                    ))}
                    <input
                      id="recipient-input"
                      type="text"
                      style={{ border: 'none', background: 'transparent', outline: 'none', fontSize: '12px', flex: 1, minWidth: '160px' }}
                      placeholder="Add businesses, regions or categories..."
                      value={newRecipient}
                      onChange={(e) => setNewRecipient(e.target.value)}
                      onKeyDown={handleAddRecipient}
                    />
                  </div>
                </div>

                {/* Message Body composer with Rich Text tools placeholder */}
                <div>
                  <label htmlFor="msg-body" style={{ display: 'block', fontSize: '11px', fontWeight: '800', color: 'var(--muted)', textTransform: 'uppercase', marginBottom: '6px' }}>Message Body</label>
                  
                  <div style={{ border: '1.5px solid #25108f', borderRadius: '6px', overflow: 'hidden' }}>
                    {/* WYSIWYG bar */}
                    <div style={{ display: 'flex', gap: '10px', background: '#f1f5f9', borderBottom: '1.5px solid #25108f', padding: '6px 12px', fontSize: '12px', fontWeight: '700', color: 'var(--muted)' }}>
                      <button type="button" style={{ border: 'none', background: 'transparent', fontWeight: '800', cursor: 'pointer' }}>B</button>
                      <button type="button" style={{ border: 'none', background: 'transparent', fontStyle: 'italic', cursor: 'pointer' }}>I</button>
                      <button type="button" style={{ border: 'none', background: 'transparent', cursor: 'pointer' }}>🔗</button>
                      <span style={{ borderLeft: '1.5px solid #25108f', height: '14px', margin: '2px 0' }} />
                      <button type="button" style={{ border: 'none', background: 'transparent', cursor: 'pointer' }}>☷</button>
                      <button type="button" style={{ border: 'none', background: 'transparent', cursor: 'pointer' }}>🖼</button>
                    </div>
                    
                    <textarea
                      id="msg-body"
                      style={{ width: '100%', height: '140px', border: 'none', padding: '12px', fontSize: '13px', outline: 'none', resize: 'none' }}
                      placeholder="Type your professional message here... Use {business_name} for personalization."
                      value={msgBody}
                      onChange={(e) => setMsgBody(e.target.value)}
                    />
                  </div>
                </div>

                {/* Attachment Drag-drop Box */}
                <div style={{ border: '2px dashed var(--line)', background: '#f8fafc', borderRadius: '6px', padding: '16px', textAlign: 'center', cursor: 'pointer' }} onClick={() => alert('Attachments browser')}>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px' }}>
                    <FileUp size={24} style={{ color: 'var(--muted)' }} />
                    <span style={{ fontSize: '12px', color: 'var(--muted)', fontWeight: '700' }}>
                      Drag and drop attachments or <span style={{ color: '#4f46e5', textDecoration: 'underline' }}>Browse files</span>
                    </span>
                  </div>
                </div>

              </form>
            </div>

            {/* Column 3: Schedulers & Action Buttons (Right) */}
            <div style={{ flex: 0.9, display: 'flex', flexDirection: 'column', gap: '20px' }}>
              
              {/* Campaign Scheduling Card */}
              <div className="panel" style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <h2 style={{ fontSize: '13px', fontWeight: '800', color: 'var(--text)', margin: 0 }}>Campaign Scheduling</h2>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {/* Send Now */}
                  <label style={{ display: 'flex', gap: '10px', alignItems: 'center', border: '1px solid #3b82f6', background: scheduleMode === 'now' ? '#eff6ff' : '#fff', padding: '12px', borderRadius: '6px', cursor: 'pointer' }}>
                    <input
                      type="radio"
                      name="schedule"
                      value="now"
                      checked={scheduleMode === 'now'}
                      onChange={() => setScheduleMode('now')}
                      style={{ accentColor: '#3b82f6' }}
                    />
                    <div>
                      <strong style={{ display: 'block', fontSize: '12px', color: '#1e40af' }}>Send Now</strong>
                      <span style={{ display: 'block', fontSize: '10px', color: '#1d4ed8', fontWeight: '500', marginTop: '2px' }}>Immediate delivery to all channels.</span>
                    </div>
                  </label>

                  {/* Schedule */}
                  <label style={{ display: 'flex', gap: '10px', alignItems: 'center', border: '1.5px solid #25108f', background: scheduleMode === 'schedule' ? '#eff6ff' : '#fff', padding: '12px', borderRadius: '6px', cursor: 'pointer' }}>
                    <input
                      type="radio"
                      name="schedule"
                      value="schedule"
                      checked={scheduleMode === 'schedule'}
                      onChange={() => setScheduleMode('schedule')}
                      style={{ accentColor: '#3b82f6' }}
                    />
                    <div>
                      <strong style={{ display: 'block', fontSize: '12px' }}>Schedule</strong>
                      <span style={{ display: 'block', fontSize: '10px', color: 'var(--muted)', marginTop: '2px' }}>Choose a future date and time.</span>
                    </div>
                  </label>

                  {/* Date input */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', border: '1.5px solid #25108f', borderRadius: '6px', padding: '0 10px', height: '36px', background: scheduleMode === 'schedule' ? '#fff' : '#f1f5f9' }}>
                    <Calendar size={14} style={{ color: 'var(--muted)' }} />
                    <input
                      type="text"
                      disabled={scheduleMode !== 'schedule'}
                      style={{ border: 'none', background: 'transparent', width: '100%', fontSize: '11px', outline: 'none', fontWeight: '700' }}
                      placeholder="mm/dd/yyyy, --:--"
                      value={scheduleTime}
                      onChange={(e) => setScheduleTime(e.target.value)}
                      aria-label="Campaign schedule date time input"
                    />
                  </div>
                </div>
              </div>

              {/* A/B Testing Toggle */}
              <div className="panel" style={{ padding: '16px 20px', display: 'flex', justifySelf: 'stretch', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <strong style={{ display: 'block', fontSize: '12px' }}>A/B Testing</strong>
                  <span style={{ display: 'block', fontSize: '10px', color: 'var(--muted)', marginTop: '2px' }}>Test different copy variants.</span>
                </div>
                <div style={{ width: '36px', height: '20px', background: '#cbd5e1', borderRadius: '10px', position: 'relative', cursor: 'pointer' }}>
                  <span style={{ position: 'absolute', left: '2px', top: '2px', height: '16px', width: '16px', background: '#fff', borderRadius: '50%' }} />
                </div>
              </div>

              {/* Projected Reach Dark Card */}
              <div className="panel" style={{ padding: '20px', background: '#0b1329', color: '#fff', border: 'none', display: 'flex', flexDirection: 'column', gap: '8px', position: 'relative', overflow: 'hidden' }}>
                <span style={{ fontSize: '9px', fontWeight: '800', color: 'rgba(255,255,255,0.6)', textTransform: 'uppercase' }}>Projected Reach</span>
                <strong style={{ display: 'block', fontSize: '24px' }}>1,240 <span style={{ fontSize: '11px', fontWeight: 'normal', color: 'rgba(255,255,255,0.6)' }}>Units</span></strong>
                <span style={{ fontSize: '10px', color: '#10b981', fontWeight: '700' }}>
                  ↗ +12% vs last campaign
                </span>
              </div>

              {/* Form actions (Deploy / Save) */}
              <div style={{ display: 'flex', gap: '10px' }}>
                <button
                  style={{ flex: 1, border: '1.5px solid #25108f', background: '#fff', color: 'var(--text)', fontSize: '12px', fontWeight: '800', height: '40px', borderRadius: '6px', cursor: 'pointer' }}
                  onClick={() => alert('Saved Draft.')}
                  type="button"
                >
                  Save as Draft
                </button>
                <button
                  style={{ flex: 1.2, border: 'none', background: '#4f46e5', color: '#fff', fontSize: '12px', fontWeight: '800', height: '40px', borderRadius: '6px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}
                  onClick={handleDeploy}
                  type="button"
                >
                  <Send size={12} /> Deploy Campaign
                </button>
              </div>

            </div>

          </div>

          {/* Outreach History list */}
          <section className="panel" style={{ padding: '20px', marginTop: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <h2 style={{ fontSize: '14px', fontWeight: '800', color: 'var(--text)', margin: 0 }}>Recent Outreach History</h2>
              <a href="#audit" onClick={(e) => e.preventDefault()} style={{ color: '#4f46e5', fontWeight: '800', fontSize: '11px', textDecoration: 'none' }}>
                View Full Audit Log →
              </a>
            </div>

            <div className="table-wrap">
              <div className="table-responsive-wrapper">
<table className="partner-table" style={{ border: 'none' }}>
                <thead>
                  <tr style={{ background: '#f4eff8' }}>
                    <th style={{ padding: '12px 16px', fontSize: '11px', fontWeight: '800', color: 'var(--muted)', textAlign: 'left', borderRadius: '6px 0 0 6px' }}>CAMPAIGN NAME</th>
                    <th style={{ padding: '12px 16px', fontSize: '11px', fontWeight: '800', color: 'var(--muted)' }}>CHANNEL</th>
                    <th style={{ padding: '12px 16px', fontSize: '11px', fontWeight: '800', color: 'var(--muted)' }}>STATUS</th>
                    <th style={{ padding: '12px 16px', fontSize: '11px', fontWeight: '800', color: 'var(--muted)' }}>REACH</th>
                    <th style={{ padding: '12px 16px', fontSize: '11px', fontWeight: '800', color: 'var(--muted)' }}>ENGAGEMENT</th>
                    <th style={{ padding: '12px 16px', fontSize: '11px', fontWeight: '800', color: 'var(--muted)', textAlign: 'right', borderRadius: '0 6px 6px 0' }}>ACTIONS</th>
                  </tr>
                </thead>
                <tbody>
                  {outreachHistory.map((row, idx) => (
                    <tr key={idx} style={{ borderBottom: '1px solid #eee9f6' }}>
                      <td style={{ padding: '16px' }}><strong style={{ fontSize: '13px', color: 'var(--text)' }}>{row.name}</strong></td>
                      <td style={{ padding: '16px', fontSize: '12px', color: 'var(--muted)', fontWeight: '700' }}>{row.channel}</td>
                      <td style={{ padding: '16px' }}>
                        <span style={{ fontSize: '8px', fontWeight: '950', color: row.statusColor, background: row.statusBg, padding: '3px 8px', borderRadius: '3px' }}>
                          {row.status}
                        </span>
                      </td>
                      <td style={{ padding: '16px', fontSize: '12px', color: 'var(--text)', fontWeight: '700' }}>{row.reach}</td>
                      <td style={{ padding: '16px' }}>
                        {row.status === 'SENT' ? (
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', width: '120px' }}>
                            <span style={{ fontSize: '11px', fontWeight: '800', color: 'var(--text)', width: '32px' }}>{row.engagement}</span>
                            <div style={{ flex: 1, height: '4px', background: '#eee9f6', borderRadius: '2px', overflow: 'hidden' }}>
                              <div style={{ width: `${row.engRate}%`, height: '100%', background: row.engColor }} />
                            </div>
                          </div>
                        ) : (
                          <span style={{ fontSize: '11px', color: 'var(--muted)', fontWeight: '750' }}>{row.engagement}</span>
                        )}
                      </td>
                      <td style={{ padding: '16px', textAlign: 'right' }}>
                        <button className="btn-action-circle" style={{ background: 'transparent', border: 'none', color: 'var(--muted)' }} type="button"><MoreVertical size={14} /></button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
</div>
            </div>
          </section>
        </div>
      )}
    </AdminShell>
  );
}



