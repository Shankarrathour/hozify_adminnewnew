import React, { useState } from 'react';
import { Search, MapPin, AlertCircle, Calendar, ExternalLink } from 'lucide-react';
import { useToast } from '../../components/common/ToastNotification';

const columnsData = {
  Available: [
    {
      name: 'Sarah Connor',
      role: 'Senior Engineer',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&h=100&q=80',
      load: 15,
      tags: ['Cloud', 'Python']
    },
    {
      name: 'James Wilson',
      role: 'UI Designer',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=100&h=100&q=80',
      load: 0,
      tags: []
    }
  ],
  Busy: [
    {
      name: 'Elena Rodriguez',
      role: 'Project Manager',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=100&h=100&q=80',
      load: 85,
      tags: [],
      warning: 'In planning workshop'
    }
  ],
  OnJob: [
    {
      name: 'Marcus Chen',
      role: 'Frontend Developer',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&h=100&q=80',
      load: 64,
      tags: [],
      project: 'Dashboard V3 Migration'
    }
  ],
  OnLeave: [
    {
      name: 'Lisa Lopez',
      role: 'UI Designer',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&h=100&q=80',
      load: 0,
      tags: [],
      note: 'Returning Monday'
    }
  ]
};

export default function AvailabilityBoard() {
  const { addToast } = useToast();
  const [searchQuery, setSearchQuery] = useState('');

  const filterCards = (cards) => {
    return cards.filter(card =>
      card.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      card.role.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };

  return (
    <div className="availability-board-flow" style={{ position: 'relative', minHeight: 'calc(100vh - 180px)', paddingBottom: '40px' }}>
      {/* Title Header with search bar inside header */}
      <div className="partners-page-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <div>
          <h1 className="page-title">Availability Board</h1>
          <p className="page-subtitle">Monitor and schedule field team availability in real-time.</p>
        </div>
        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
          <div className="dash-search" style={{ width: '280px', margin: 0 }}>
            <Search size={18} />
            <input
              placeholder="Search employees..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              aria-label="Search employees by name or role"
            />
          </div>
        </div>
      </div>

      {/* Swimlanes Layout */}
      <div className="fraud-top-grid" style={{ gap: '16px', alignItems: 'flex-start' }}>
        
        {/* Column Available */}
        <div style={{ flex: 1, backgroundColor: '#f8fafc', padding: '16px 12px', borderRadius: '8px', border: '1.5px solid #25108f', minHeight: '500px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px', padding: '0 4px' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', fontWeight: '800', color: '#15803d' }}>
              <span style={{ width: '8px', height: '8px', background: '#10b981', borderRadius: '50%' }} />
              Available
              <span style={{ fontSize: '11px', fontWeight: '800', background: '#dcf3ec', color: '#088261', padding: '2px 6px', borderRadius: '99px' }}>
                {filterCards(columnsData.Available).length}
              </span>
            </span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {filterCards(columnsData.Available).map((card, idx) => (
              <div 
                key={idx} 
                onClick={() => addToast(`Viewing availability details for ${card.name}`, "success")}
                style={{ padding: '14px', background: '#fff', borderRadius: '8px', border: '1px solid #e2e8f0', display: 'flex', flexDirection: 'column', gap: '10px', boxShadow: '0 1px 3px rgba(0,0,0,0.05)', cursor: 'pointer', marginBottom: 0 }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                    <img src={card.avatar} alt={card.name} style={{ width: '36px', height: '36px', borderRadius: '50%', objectFit: 'cover' }} />
                    <div>
                      <strong style={{ display: 'block', fontSize: '13px', color: 'var(--text)' }}>{card.name}</strong>
                      <span style={{ display: 'block', fontSize: '11px', color: 'var(--muted)' }}>{card.role}</span>
                    </div>
                  </div>
                  <ExternalLink 
                    size={14} 
                    color="var(--muted)" 
                    style={{ cursor: 'pointer' }} 
                    onClick={(e) => { e.stopPropagation(); addToast(`Opening dashboard profile link for ${card.name}`, "success"); }}
                  />
                </div>
                
                <div style={{ fontSize: '11px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px', fontWeight: '700' }}>
                    <span style={{ color: 'var(--muted)' }}>Current Load</span>
                    <span style={{ color: '#4f46e5' }}>{card.load}%</span>
                  </div>
                  <div style={{ width: '100%', height: '6px', background: '#f1ebf8', borderRadius: '3px', overflow: 'hidden' }}>
                    <div style={{ width: `${card.load}%`, height: '100%', background: '#4f46e5' }} />
                  </div>
                </div>

                {card.tags.length > 0 && (
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginTop: '2px' }}>
                    {card.tags.map((t, idx) => (
                      <span key={idx} style={{ fontSize: '9px', fontWeight: '800', background: '#f1ebf8', color: 'var(--primary-3)', padding: '2px 6px', borderRadius: '3px' }}>
                        {t}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Column Busy */}
        <div style={{ flex: 1, backgroundColor: '#f8fafc', padding: '16px 12px', borderRadius: '8px', border: '1.5px solid #25108f', minHeight: '500px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px', padding: '0 4px' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', fontWeight: '800', color: '#b45309' }}>
              <span style={{ width: '8px', height: '8px', background: '#f59e0b', borderRadius: '50%' }} />
              Busy
              <span style={{ fontSize: '11px', fontWeight: '800', background: '#fef3c7', color: '#b45309', padding: '2px 6px', borderRadius: '99px' }}>
                {filterCards(columnsData.Busy).length}
              </span>
            </span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {filterCards(columnsData.Busy).map((card, idx) => (
              <div 
                key={idx} 
                onClick={() => addToast(`Viewing availability details for ${card.name}`, "success")}
                style={{ padding: '14px', background: '#fff', borderRadius: '8px', border: '1px solid #e2e8f0', display: 'flex', flexDirection: 'column', gap: '10px', boxShadow: '0 1px 3px rgba(0,0,0,0.05)', cursor: 'pointer', marginBottom: 0 }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                    <img src={card.avatar} alt={card.name} style={{ width: '36px', height: '36px', borderRadius: '50%', objectFit: 'cover' }} />
                    <div>
                      <strong style={{ display: 'block', fontSize: '13px', color: 'var(--text)' }}>{card.name}</strong>
                      <span style={{ display: 'block', fontSize: '11px', color: 'var(--muted)' }}>{card.role}</span>
                    </div>
                  </div>
                </div>

                <div style={{ fontSize: '11px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px', fontWeight: '700' }}>
                    <span style={{ color: 'var(--muted)' }}>Current Load</span>
                    <span style={{ color: '#d97706' }}>{card.load}%</span>
                  </div>
                  <div style={{ width: '100%', height: '6px', background: '#fef3c7', borderRadius: '3px', overflow: 'hidden' }}>
                    <div style={{ width: `${card.load}%`, height: '100%', background: '#d97706' }} />
                  </div>
                </div>

                {card.warning && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '6px 8px', background: '#fff9db', border: '1px solid #ffe3e3', borderRadius: '4px', fontSize: '10px', fontWeight: '700', color: '#b45309' }}>
                    <AlertCircle size={12} />
                    <span>{card.warning}</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Column On Job */}
        <div style={{ flex: 1, backgroundColor: '#f8fafc', padding: '16px 12px', borderRadius: '8px', border: '1.5px solid #25108f', minHeight: '500px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px', padding: '0 4px' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', fontWeight: '800', color: '#2563eb' }}>
              <span style={{ width: '8px', height: '8px', background: '#3b82f6', borderRadius: '50%' }} />
              On Job
              <span style={{ fontSize: '11px', fontWeight: '800', background: '#dbeafe', color: '#1e40af', padding: '2px 6px', borderRadius: '99px' }}>
                {filterCards(columnsData.OnJob).length}
              </span>
            </span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {filterCards(columnsData.OnJob).map((card, idx) => (
              <div 
                key={idx} 
                onClick={() => addToast(`Viewing availability details for ${card.name}`, "success")}
                style={{ padding: '14px', background: '#fff', borderRadius: '8px', border: '1px solid #e2e8f0', display: 'flex', flexDirection: 'column', gap: '10px', boxShadow: '0 1px 3px rgba(0,0,0,0.05)', cursor: 'pointer', marginBottom: 0 }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                    <img src={card.avatar} alt={card.name} style={{ width: '36px', height: '36px', borderRadius: '50%', objectFit: 'cover' }} />
                    <div>
                      <strong style={{ display: 'block', fontSize: '13px', color: 'var(--text)' }}>{card.name}</strong>
                      <span style={{ display: 'block', fontSize: '11px', color: 'var(--muted)' }}>{card.role}</span>
                    </div>
                  </div>
                </div>

                <div style={{ fontSize: '11px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px', fontWeight: '700' }}>
                    <span style={{ color: 'var(--muted)' }}>Current Load</span>
                    <span style={{ color: '#2563eb' }}>{card.load}%</span>
                  </div>
                  <div style={{ width: '100%', height: '6px', background: '#dbeafe', borderRadius: '3px', overflow: 'hidden' }}>
                    <div style={{ width: `${card.load}%`, height: '100%', background: '#2563eb' }} />
                  </div>
                </div>

                {card.project && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '2px', fontSize: '11px' }}>
                    <span style={{ color: 'var(--muted)', fontWeight: '700' }}>Active Project</span>
                    <strong style={{ color: 'var(--text)' }}>{card.project}</strong>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Column On Leave */}
        <div style={{ flex: 1, backgroundColor: '#f8fafc', padding: '16px 12px', borderRadius: '8px', border: '1.5px solid #25108f', minHeight: '500px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px', padding: '0 4px' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', fontWeight: '800', color: '#6b7280' }}>
              <span style={{ width: '8px', height: '8px', background: '#9ca3af', borderRadius: '50%' }} />
              On Leave
              <span style={{ fontSize: '11px', fontWeight: '800', background: '#f3f4f6', color: '#374151', padding: '2px 6px', borderRadius: '99px' }}>
                {filterCards(columnsData.OnLeave).length}
              </span>
            </span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {filterCards(columnsData.OnLeave).map((card, idx) => (
              <div 
                key={idx} 
                onClick={() => addToast(`Viewing availability details for ${card.name}`, "success")}
                style={{ padding: '14px', background: '#fff', borderRadius: '8px', border: '1px solid #e2e8f0', display: 'flex', flexDirection: 'column', gap: '10px', boxShadow: '0 1px 3px rgba(0,0,0,0.05)', cursor: 'pointer', marginBottom: 0 }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                    <img src={card.avatar} alt={card.name} style={{ width: '36px', height: '36px', borderRadius: '50%', objectFit: 'cover' }} />
                    <div>
                      <strong style={{ display: 'block', fontSize: '13px', color: 'var(--text)' }}>{card.name}</strong>
                      <span style={{ display: 'block', fontSize: '11px', color: 'var(--muted)' }}>{card.role}</span>
                    </div>
                  </div>
                </div>

                {card.note && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#6b7280', fontSize: '11px', fontWeight: '700', marginTop: '4px' }}>
                    <Calendar size={13} />
                    <span>{card.note}</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
}


