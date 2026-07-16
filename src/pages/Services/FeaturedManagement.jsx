import toast from 'react-hot-toast';
import React, { useState } from 'react';
import {
  Sparkles,
  Wrench,
  Zap,
  Truck,
  Scissors,
  TrendingUp,
  RefreshCw,
  MoreVertical,
  Plus,
  Shield,
  HelpCircle,
  CheckCircle2,
  Calendar,
  AlertCircle
} from 'lucide-react';
import { useToast } from '../../components/common/ToastNotification';

export default function FeaturedManagement() {
  const { addToast } = useToast();
  const [registryServices, setRegistryServices] = useState([
    { id: 1, name: 'Deep Cleaning', category: 'Residential', price: '$85/hr', icon: Sparkles, color: '#e0e7ff', iconColor: '#4f46e5' },
    { id: 2, name: 'Pipe Repair', category: 'Maintenance', price: '$120/hr', icon: Wrench, color: '#fef3c7', iconColor: '#d97706' },
    { id: 3, name: 'EV Charger Install', category: 'Technical', price: '$450/flat', icon: Zap, color: '#d1fae5', iconColor: '#059669' },
    { id: 4, name: 'Local Hauling', category: 'Logistics', price: '$90/hr', icon: Truck, color: '#e0f2fe', iconColor: '#0284c7' },
    { id: 5, name: 'Lawn Care', category: 'Outdoor', price: '$65/hr', icon: Scissors, color: '#fae8ff', iconColor: '#c084fc' }
  ]);

  const [promotions, setPromotions] = useState([
    { id: 1, name: 'Smart Integration', placement: 'Homepage Featured', share: 82, status: 'Active', icon: Shield },
    { id: 2, name: 'Seasonal HVAC Check', placement: 'Trending Cluster', share: 45, status: 'Pending Review', icon: RefreshCw }
  ]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-section)', fontFamily: 'Inter, sans-serif' }}>
      
      {/* Header Panel */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '16px',
        borderBottom: '1.5px solid #25108f',
        paddingBottom: '20px'
      }}>
        <div>
          <h1 style={{ fontSize: '24px', fontWeight: '800', color: 'var(--text)', margin: 0 }}>Featured Services Management</h1>
          <span style={{ fontSize: '13px', color: 'var(--muted)', marginTop: '4px', display: 'block' }}>
            Configure front-end service exposure and promotional clusters.
          </span>
        </div>
        <div style={{ display: 'flex', gap: '12px' }}>
          <button
            style={{
              padding: '8px 16px',
              borderRadius: '6px',
              border: '1.5px solid #25108f',
              background: 'white',
              color: 'var(--text)',
              fontWeight: '600',
              fontSize: '13px',
              cursor: 'pointer',
              transition: 'all 0.2s'
            }}
            onClick={() => addToast('Changes discarded successfully.', 'info')}
            type="button"
          >
            Discard Changes
          </button>
          <button
            style={{
              padding: '8px 16px',
              borderRadius: '6px',
              border: 'none',
              background: '#0f172a',
              color: 'white',
              fontWeight: '600',
              fontSize: '13px',
              cursor: 'pointer',
              transition: 'all 0.2s'
            }}
            onClick={() => addToast('Promotional layout published successfully!', 'success')}
            type="button"
          >
            Publish Layout
          </button>
        </div>
      </div>

      {/* Main Grid Workspace */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'minmax(280px, 320px) 1fr',
        gap: 'var(--spacing-section)',
        alignItems: 'start'
      }}>
        
        {/* Left Side: Service Registry & Forecast Impact */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-section)' }}>
          
          {/* Service Registry */}
          <div className="panel" style={{
            background: 'white',
            borderRadius: '12px',
            border: '1.5px solid #25108f',
            padding: '20px'
          }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '16px'
            }}>
              <h3 style={{
                fontSize: '11px',
                fontWeight: '800',
                color: 'var(--muted)',
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
                margin: 0
              }}>
                Service Registry
              </h3>
              <button
                style={{
                  border: 'none',
                  background: 'transparent',
                  cursor: 'pointer',
                  color: 'var(--muted)',
                  display: 'flex',
                  alignItems: 'center'
                }}
                type="button"
                aria-label="Filter Registry"
               onClick={(e) => { e.preventDefault(); e.stopPropagation(); addToast("Filter options opened.", "info"); }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon></svg>
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {registryServices.map((service) => {
                const IconComp = service.icon;
                return (
                  <div
                    key={service.id}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                      paddingBottom: '12px',
                      borderBottom: service.id === registryServices.length ? 'none' : '1px solid #f1f5f9',
                      cursor: 'grab'
                    }}
                  >
                    <div style={{
                      width: '36px',
                      height: '36px',
                      borderRadius: '8px',
                      background: service.color,
                      color: service.iconColor,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      <IconComp size={18} />
                    </div>
                    <div style={{ flex: 1 }}>
                      <strong style={{ display: 'block', fontSize: '13px', color: 'var(--text)' }}>
                        {service.name}
                      </strong>
                      <span style={{ fontSize: '11px', color: 'var(--muted)' }}>
                        {service.category} • {service.price}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Forecast Impact Indigo Panel */}
          <div style={{
            background: 'linear-gradient(135deg, #1e1b4b 0%, #2e1065 100%)',
            borderRadius: '12px',
            padding: 'var(--spacing-section)',
            color: 'white',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <TrendingUp size={16} style={{ color: '#c084fc' }} />
              <span style={{
                fontSize: '10px',
                fontWeight: '800',
                color: '#c084fc',
                textTransform: 'uppercase',
                letterSpacing: '1px'
              }}>
                Forecast Impact
              </span>
            </div>

            <div>
              <span style={{ fontSize: '13px', color: '#cbd5e1', display: 'block' }}>
                Predicted Click-Through
              </span>
              <strong style={{ fontSize: '32px', fontWeight: '800', color: 'white', display: 'block', margin: '4px 0' }}>
                +24.8%
              </strong>
            </div>

            {/* Progress/Graph fill line */}
            <div style={{ height: '6px', background: 'rgba(255,255,255,0.15)', borderRadius: '3px', overflow: 'hidden' }}>
              <div style={{ width: '68%', height: '100%', background: 'linear-gradient(90deg, #c084fc 0%, #a855f7 100%)' }} />
            </div>

            <span style={{ fontSize: '11px', color: '#94a3b8', lineHeight: '1.4' }}>
              Based on historic CTR for 'Homepage Featured' cluster in Q4.
            </span>
          </div>

        </div>

        {/* Right Side: Cluster Config & Promos Ledger */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-section)' }}>
          
          {/* Homepage Featured Cluster */}
          <div className="panel" style={{
            background: 'white',
            borderRadius: '12px',
            border: '1.5px solid #25108f',
            padding: '20px'
          }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '16px'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ color: 'var(--primary)', fontSize: '16px', display: 'flex', alignItems: 'center' }}>★</span>
                <h2 style={{ fontSize: '14px', fontWeight: '800', color: 'var(--text)', margin: 0 }}>
                  Homepage Featured Cluster
                </h2>
              </div>
              <span style={{
                fontSize: '10px',
                fontWeight: '800',
                color: 'var(--primary)',
                background: '#e0e7ff',
                padding: '4px 8px',
                borderRadius: '4px',
                textTransform: 'uppercase',
                letterSpacing: '0.5px'
              }}>
                Slots: 3/4 Filled
              </span>
            </div>

            {/* Slots Horizontal Layout Grid */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '16px',
              border: '2px dashed #e2e8f0',
              padding: '16px',
              borderRadius: '8px',
              background: '#f8fafc'
            }}>
              
              {/* Slot 1: Home Protection Plus */}
              <div style={{
                background: 'white',
                border: '1.5px solid #25108f',
                borderRadius: '8px',
                padding: '16px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                minHeight: '160px',
                position: 'relative',
                boxShadow: '0 1px 3px rgba(0,0,0,0.05)'
              }}>
                <div>
                  <div style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '6px',
                    background: '#eff6ff',
                    color: '#2563eb',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '12px'
                  }}>
                    <Shield size={16} />
                  </div>
                  <strong style={{ display: 'block', fontSize: '13px', color: 'var(--text)', marginBottom: '4px' }}>
                    Home Protection Plus
                  </strong>
                  <p style={{ fontSize: '11px', color: 'var(--muted)', margin: 0, lineClamp: 2, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                    Complete smart security setup and 24/7 monitoring...
                  </p>
                </div>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginTop: '12px'
                }}>
                  <strong style={{ fontSize: '14px', color: 'var(--primary)' }}>$1,200</strong>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '2px', cursor: 'grab' }}>
                    <div style={{ width: '12px', height: '2px', background: '#cbd5e1' }}></div>
                    <div style={{ width: '12px', height: '2px', background: '#cbd5e1' }}></div>
                  </div>
                </div>
              </div>

              {/* Slot 2: Energy Audit 360 */}
              <div style={{
                background: 'white',
                border: '1.5px solid #25108f',
                borderRadius: '8px',
                padding: '16px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                minHeight: '160px',
                position: 'relative',
                boxShadow: '0 1px 3px rgba(0,0,0,0.05)'
              }}>
                <div>
                  <div style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '6px',
                    background: '#f5f3ff',
                    color: '#7c3aed',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '12px'
                  }}>
                    <Zap size={16} />
                  </div>
                  <strong style={{ display: 'block', fontSize: '13px', color: 'var(--text)', marginBottom: '4px' }}>
                    Energy Audit 360
                  </strong>
                  <p style={{ fontSize: '11px', color: 'var(--muted)', margin: 0, lineClamp: 2, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                    Whole-home thermal imaging and efficiency...
                  </p>
                </div>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginTop: '12px'
                }}>
                  <strong style={{ fontSize: '14px', color: 'var(--primary)' }}>$249</strong>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '2px', cursor: 'grab' }}>
                    <div style={{ width: '12px', height: '2px', background: '#cbd5e1' }}></div>
                    <div style={{ width: '12px', height: '2px', background: '#cbd5e1' }}></div>
                  </div>
                </div>
              </div>

              {/* Slot 3: DROP TO ADD */}
              <div 
                onClick={() => addToast('Opening Service Selection Dialog...', 'success')}
                onDragOver={(e) => { e.preventDefault(); e.stopPropagation(); }}
                onDrop={(e) => { e.preventDefault(); addToast('Service added to featured slot!', 'success'); }}
                style={{
                border: '2px dashed #cbd5e1',
                borderRadius: '8px',
                background: '#f1f5f9',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: '160px',
                cursor: 'pointer',
                color: 'var(--muted)',
                gap: '8px',
                transition: 'all 0.2s'
              }}>
                <div style={{
                  width: '28px',
                  height: '28px',
                  borderRadius: '50%',
                  background: 'white',
                  border: '1px solid #cbd5e1',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--muted)'
                }}>
                  <Plus size={16} />
                </div>
                <span style={{ fontSize: '10px', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                  Drop to Add
                </span>
              </div>

            </div>
          </div>

          {/* Trending Clusters (Live Algorithm) */}
          <div className="panel" style={{
            background: 'white',
            borderRadius: '12px',
            border: '1.5px solid #25108f',
            padding: '20px'
          }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '16px'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <TrendingUp size={16} style={{ color: '#ef4444' }} />
                <h2 style={{ fontSize: '14px', fontWeight: '800', color: 'var(--text)', margin: 0 }}>
                  Trending Clusters (Live Algorithm)
                </h2>
              </div>
              <div style={{ display: 'flex', gap: '8px' }}>
                <button onClick={() => addToast('Refreshing trending clusters algorithm data...', 'success')} style={{ border: 'none', background: 'transparent', cursor: 'pointer', color: 'var(--muted)' }} type="button" aria-label="Refresh trending">
                  <RefreshCw size={15} />
                </button>
                <button onClick={() => addToast('Trending clusters options menu opened.', 'info')} style={{ border: 'none', background: 'transparent', cursor: 'pointer', color: 'var(--muted)' }} type="button" aria-label="More options">
                  <MoreVertical size={15} />
                </button>
              </div>
            </div>

            {/* Horizontal Cards Grid */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '16px'
            }}>
              
              {/* Card 1: Air Quality Master */}
              <div style={{
                borderRadius: '8px',
                border: '1.5px solid #25108f',
                overflow: 'hidden',
                background: 'white',
                boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
                display: 'flex',
                flexDirection: 'column'
              }}>
                <div style={{ height: '90px', position: 'relative', background: '#e2e8f0' }}>
                  <img
                    src="https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&w=300&h=120&q=80"
                    alt="Air Quality Master"
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                  <span style={{
                    position: 'absolute',
                    top: '8px',
                    left: '8px',
                    background: 'linear-gradient(45deg, #ef4444, #f87171)',
                    color: 'white',
                    fontSize: '8px',
                    fontWeight: '900',
                    padding: '2px 6px',
                    borderRadius: '4px',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px'
                  }}>
                    #1 Trending
                  </span>
                </div>
                <div style={{ padding: '12px' }}>
                  <strong style={{ display: 'block', fontSize: '13px', color: 'var(--text)', marginBottom: '4px' }}>
                    Air Quality Master
                  </strong>
                  <span style={{ fontSize: '11px', color: '#10b981', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    📈 4.2k views/day
                  </span>
                </div>
              </div>

              {/* Card 2: Leak Shield Pro */}
              <div style={{
                borderRadius: '8px',
                border: '1.5px solid #25108f',
                overflow: 'hidden',
                background: 'white',
                boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
                display: 'flex',
                flexDirection: 'column'
              }}>
                <div style={{ height: '90px', position: 'relative', background: '#e2e8f0' }}>
                  <img
                    src="https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&w=300&h=120&q=80"
                    alt="Leak Shield Pro"
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                  <span style={{
                    position: 'absolute',
                    top: '8px',
                    left: '8px',
                    background: 'linear-gradient(45deg, #f97316, #fb923c)',
                    color: 'white',
                    fontSize: '8px',
                    fontWeight: '900',
                    padding: '2px 6px',
                    borderRadius: '4px',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px'
                  }}>
                    #2 Trending
                  </span>
                </div>
                <div style={{ padding: '12px' }}>
                  <strong style={{ display: 'block', fontSize: '13px', color: 'var(--text)', marginBottom: '4px' }}>
                    Leak Shield Pro
                  </strong>
                  <span style={{ fontSize: '11px', color: '#10b981', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    📈 3.8k views/day
                  </span>
                </div>
              </div>

              {/* Card 3: Override Algorithmic Selection */}
              <div 
                onClick={() => addToast('Opening override configuration...', 'info')}
                style={{
                border: '2px dashed #e2e8f0',
                borderRadius: '8px',
                background: '#f8fafc',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: '140px',
                cursor: 'pointer',
                color: 'var(--muted)',
                gap: '8px',
                textAlign: 'center',
                padding: '12px'
              }}>
                <div style={{
                  width: '28px',
                  height: '28px',
                  borderRadius: '50%',
                  background: 'white',
                  border: '1px solid #cbd5e1',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--muted)'
                }}>
                  <Zap size={14} />
                </div>
                <span style={{ fontSize: '10px', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                  Override Algorithmic Selection
                </span>
              </div>

            </div>
          </div>

          {/* Active Promotions Ledger */}
          <div className="panel" style={{
            background: 'white',
            borderRadius: '12px',
            border: '1.5px solid #25108f',
            padding: '20px'
          }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '16px'
            }}>
              <h2 style={{ fontSize: '14px', fontWeight: '800', color: 'var(--text)', margin: 0 }}>
                Active Promotions Ledger
              </h2>
              <a href="#view-historical" onClick={(e) => e.preventDefault()} style={{
                fontSize: '12px',
                color: 'var(--primary)',
                fontWeight: '700',
                textDecoration: 'none'
              }}>
                View Historical Performance
              </a>
            </div>

            <div className="table-wrap">
              <div className="table-responsive-wrapper">
<table className="approval-queue-table" style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px' }}>
                <thead>
                  <tr style={{ textAlign: 'left', borderBottom: '1.5px solid #25108f' }}>
                    <th style={{ padding: '10px 8px', color: 'var(--muted)', fontWeight: '800', textTransform: 'uppercase', fontSize: '10px' }}>Service Name</th>
                    <th style={{ padding: '10px 8px', color: 'var(--muted)', fontWeight: '800', textTransform: 'uppercase', fontSize: '10px' }}>Placement</th>
                    <th style={{ padding: '10px 8px', color: 'var(--muted)', fontWeight: '800', textTransform: 'uppercase', fontSize: '10px' }}>Impression Share</th>
                    <th style={{ padding: '10px 8px', color: 'var(--muted)', fontWeight: '800', textTransform: 'uppercase', fontSize: '10px' }}>Status</th>
                    <th style={{ padding: '10px 8px', color: 'var(--muted)', fontWeight: '800', textTransform: 'uppercase', fontSize: '10px', textAlign: 'right' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {promotions.map((row) => {
                    const IconType = row.icon;
                    const isActive = row.status === 'Active';
                    return (
                      <tr key={row.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                        <td style={{ padding: '12px 8px' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <div style={{
                              width: '24px',
                              height: '24px',
                              borderRadius: '4px',
                              background: '#f1f5f9',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              color: 'var(--muted)'
                            }}>
                              <IconType size={14} />
                            </div>
                            <strong style={{ color: 'var(--text)' }}>{row.name}</strong>
                          </div>
                        </td>
                        <td style={{ padding: '12px 8px', color: 'var(--muted)', fontWeight: '600' }}>
                          {row.placement}
                        </td>
                        <td style={{ padding: '12px 8px' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <span style={{ fontWeight: '700', width: '32px' }}>{row.share}%</span>
                            <div style={{ width: '100px', height: '6px', background: '#e2e8f0', borderRadius: '3px', overflow: 'hidden' }}>
                              <div style={{ width: `${row.share}%`, height: '100%', background: 'var(--primary)' }}></div>
                            </div>
                          </div>
                        </td>
                        <td style={{ padding: '12px 8px' }}>
                          <span style={{
                            fontSize: '9px',
                            fontWeight: '800',
                            padding: '3px 8px',
                            borderRadius: '4px',
                            textTransform: 'uppercase',
                            background: isActive ? '#e6f4ea' : '#fef7e0',
                            color: isActive ? '#137333' : '#b06000'
                          }}>
                            {row.status}
                          </span>
                        </td>
                        <td style={{ padding: '12px 8px', textAlign: 'right' }}>
                          <button onClick={() => addToast(`Promotion actions menu opened for "${row.name}".`, 'info')} style={{ border: 'none', background: 'transparent', cursor: 'pointer', color: 'var(--muted)' }} type="button" aria-label="Promotion actions">
                            <MoreVertical size={16} />
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
</div>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}


