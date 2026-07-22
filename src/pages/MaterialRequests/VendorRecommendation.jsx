import React, { useState } from 'react';
import {
  SlidersHorizontal,
  Columns,
  Download,
  Star,
  Zap,
  TrendingDown,
  TrendingUp,
  ShieldAlert,
  ShieldCheck,
  CheckCircle2,
  Check,
  X,
  Search,
  ChevronDown
} from 'lucide-react';
import AdminShell from '../../components/layouts/AdminShell';
import { useApp } from '../../hooks/useApp';
import { ROUTES } from '../../config/routes';

export default function VendorRecommendation() {
  const { navigate } = useApp();
  const [selectedVendors, setSelectedVendors] = useState([]);

  const handleToggleSelect = (vendorId) => {
    setSelectedVendors((prev) =>
      prev.includes(vendorId) ? prev.filter((id) => id !== vendorId) : [...prev, vendorId]
    );
  };

  const handleClearComparison = () => {
    setSelectedVendors([]);
  };

  const handleCompare = () => {
    alert(`Initiating side-by-side reliability analysis for: ${selectedVendors.join(', ')}`);
  };

  const handleConfigure = () => {
    alert('Opening algorithm configuration wizard...');
  };

  return (
    <AdminShell
      activeTab="Material Management"
      brandText="Hozify Procurement"
      brandSubText="VENDOR INTELLIGENCE"
      searchPlaceholder="Search vendors, suppliers, or logistics..."
      customProfileName="Alex Rivera"
      customProfileRole="Sr. Procurement"
      customProfileAvatar="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&h=100&q=80"
    >
      <div style={{ padding: '24px 0', display: 'flex', flexDirection: 'column', gap: 'var(--spacing-section)', position: 'relative', minHeight: 'calc(100vh - 120px)', paddingBottom: selectedVendors.length > 0 ? '90px' : '24px' }}>
        
        {/* Header section */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <h1 style={{ fontSize: '24px', fontWeight: '800', color: '#1c2536', margin: 0 }}>
              Vendor Recommendation Center
            </h1>
            <p style={{ fontSize: '14px', color: '#7a7688', marginTop: '4px', margin: 0 }}>
              Algorithmic selection engine prioritizing unit economics, fulfillment velocity, and quality benchmarks for your active material requests.
            </p>
          </div>
          <div style={{ display: 'flex', gap: '12px' }}>
            <button
              onClick={handleConfigure}
              style={{
                background: '#ffffff',
                color: '#565365',
                border: '1px solid #cbd5e1',
                borderRadius: '6px',
                padding: '10px 16px',
                fontSize: '13px',
                fontWeight: '700',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}
              type="button"
            >
              <SlidersHorizontal size={15} />
              <span>Configure Algorithm</span>
            </button>
            <button
              onClick={() => setSelectedVendors(['Precision Logistics', 'Global Supply'])}
              style={{
                background: '#0b1329',
                color: '#ffffff',
                border: 'none',
                borderRadius: '6px',
                padding: '10px 18px',
                fontSize: '13px',
                fontWeight: '700',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                boxShadow: '0 4px 12px rgba(11,19,41,0.15)'
              }}
              type="button"
            >
              <Columns size={15} />
              <span>Open Comparison</span>
            </button>
          </div>
        </div>

        {/* Top Split Layout: Vendors Table & Stats Column */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--spacing-section)' }}>
          
          {/* Left: Best Value Suggestions */}
          <div className="panel" style={{ flex: '1 1 65%', minWidth: '350px', background: '#ffffff', border: '1.5px solid #25108f', borderRadius: '12px', padding: 'var(--spacing-section)', overflowY: 'auto', maxHeight: '400px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Zap size={16} style={{ color: 'var(--primary)' }} />
                <h2 style={{ fontSize: '16px', fontWeight: '800', color: '#1c2536', margin: 0 }}>
                  Best Value Suggestions
                </h2>
              </div>
              <span style={{ fontSize: '11px', fontWeight: '700', color: 'var(--primary)', background: '#e0e7ff', padding: '4px 8px', borderRadius: '4px' }}>
                Updated 4m ago
              </span>
            </div>

            <div style={{ overflowY: 'auto', maxHeight: '400px' }}>
              <div className="table-responsive-wrapper">
<table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', minWidth: '550px' }}>
                <thead>
                  <tr style={{ borderBottom: '1.5px solid #25108f' }}>
                    <th style={{ padding: '12px 8px', width: '30px' }} />
                    <th style={{ padding: '12px 8px', fontSize: '11px', fontWeight: '800', color: 'rgba(255,255,255,0.8)', textTransform: 'uppercase' }}>Vendor Entity</th>
                    <th style={{ padding: '12px 8px', fontSize: '11px', fontWeight: '800', color: 'rgba(255,255,255,0.8)', textTransform: 'uppercase', textAlign: 'center' }}>Score</th>
                    <th style={{ padding: '12px 8px', fontSize: '11px', fontWeight: '800', color: 'rgba(255,255,255,0.8)', textTransform: 'uppercase' }}>Price / Unit</th>
                    <th style={{ padding: '12px 8px', fontSize: '11px', fontWeight: '800', color: 'rgba(255,255,255,0.8)', textTransform: 'uppercase' }}>Lead Time</th>
                    <th style={{ padding: '12px 8px', fontSize: '11px', fontWeight: '800', color: 'rgba(255,255,255,0.8)', textTransform: 'uppercase' }}>Rating</th>
                    <th style={{ padding: '12px 8px', fontSize: '11px', fontWeight: '800', color: 'rgba(255,255,255,0.8)', textTransform: 'uppercase', textAlign: 'right' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    {
                      id: 'Precision Logistics',
                      name: 'Precision Logistics Corp',
                      desc: 'Tier 1 Strategic Partner',
                      score: 98,
                      price: '$142.50',
                      diff: '-8.2% vs Market',
                      time: '2-3 Business Days',
                      stars: 5,
                      img: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=40&h=40&q=80'
                    },
                    {
                      id: 'Global Supply',
                      name: 'Global Supply Dynamics',
                      desc: 'Direct Importer',
                      score: 92,
                      price: '$138.20',
                      diff: '-12.4% vs Market',
                      time: '5-7 Business Days',
                      stars: 4,
                      img: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=40&h=40&q=80'
                    }
                  ].map((vendor) => {
                    const isSelected = selectedVendors.includes(vendor.id);
                    return (
                      <tr 
                        key={vendor.id} 
                        style={{ 
                          borderBottom: '1px solid #f1f5f9',
                          background: isSelected ? '#f5f3ff' : 'transparent',
                          transition: 'background-color 0.15s ease'
                        }}
                      >
                        <td style={{ padding: '16px 8px' }}>
                          <input 
                            type="checkbox"
                            checked={isSelected}
                            onChange={() => handleToggleSelect(vendor.id)}
                            style={{ cursor: 'pointer', width: '16px', height: '16px' }}
                            aria-label={`Select ${vendor.name} for comparison`}
                          />
                        </td>
                        <td style={{ padding: '16px 8px' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <img src={vendor.img} alt={vendor.name} style={{ width: '36px', height: '36px', borderRadius: '6px', objectFit: 'cover' }} />
                            <div>
                              <strong style={{ display: 'block', fontSize: '13px', color: '#1c2536' }}>{vendor.name}</strong>
                              <span style={{ display: 'block', fontSize: '11px', color: '#7a7688', marginTop: '2px' }}>{vendor.desc}</span>
                            </div>
                          </div>
                        </td>
                        <td style={{ padding: '16px 8px', fontSize: '15px', fontWeight: '800', color: 'var(--primary)', textAlign: 'center' }}>
                          {vendor.score}
                        </td>
                        <td style={{ padding: '16px 8px' }}>
                          <strong style={{ display: 'block', fontSize: '13px', color: '#1c2536' }}>{vendor.price}</strong>
                          <span style={{ display: 'block', fontSize: '10.5px', color: '#059669', fontWeight: '700', marginTop: '2px' }}>{vendor.diff}</span>
                        </td>
                        <td style={{ padding: '16px 8px', fontSize: '13px', color: '#565365', fontWeight: '600' }}>
                          {vendor.time}
                        </td>
                        <td style={{ padding: '16px 8px' }}>
                          <div style={{ display: 'flex', gap: '2px', color: '#eab308' }}>
                            {[...Array(5)].map((_, i) => (
                              <Star 
                                key={i} 
                                size={12} 
                                fill={i < vendor.stars ? '#eab308' : 'none'} 
                                stroke={i < vendor.stars ? 'none' : '#cbd5e1'}
                              />
                            ))}
                          </div>
                        </td>
                        <td style={{ padding: '16px 8px', textAlign: 'right' }}>
                          <button
                            onClick={() => alert(`Sending quick RESTOCK request to: ${vendor.name}`)}
                            style={{
                              background: 'var(--primary)',
                              color: '#ffffff',
                              border: 'none',
                              borderRadius: '6px',
                              padding: '6px 12px',
                              fontSize: '11px',
                              fontWeight: '700',
                              cursor: 'pointer'
                            }}
                            type="button"
                          >
                            Quick Request
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

          {/* Right: Optimization KPIs & Market Volatility */}
          <div style={{ flex: '1 1 300px', display: 'flex', flexDirection: 'column', gap: 'var(--spacing-section)' }}>
            
            {/* Success Optimization */}
            <div className="panel" style={{ background: '#0b1329', color: '#ffffff', borderRadius: '12px', padding: 'var(--spacing-section)', display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <h3 style={{ fontSize: '15px', fontWeight: '800', margin: 0 }}>Success Optimization</h3>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12.5px', marginBottom: '6px' }}>
                    <span style={{ color: 'rgba(255,255,255,0.7)' }}>Budget Utilization</span>
                    <strong style={{ fontWeight: '800' }}>84%</strong>
                  </div>
                  <div style={{ height: '6px', background: 'rgba(255,255,255,0.1)', borderRadius: '3px', overflow: 'hidden' }}>
                    <div style={{ width: '84%', height: '100%', background: '#3b82f6', borderRadius: '3px' }} />
                  </div>
                </div>

                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12.5px', marginBottom: '6px' }}>
                    <span style={{ color: 'rgba(255,255,255,0.7)' }}>On-Time Fulfillment</span>
                    <strong style={{ fontWeight: '800' }}>96.2%</strong>
                  </div>
                  <div style={{ height: '6px', background: 'rgba(255,255,255,0.1)', borderRadius: '3px', overflow: 'hidden' }}>
                    <div style={{ width: '96.2%', height: '100%', background: '#10b981', borderRadius: '3px' }} />
                  </div>
                </div>
              </div>

              {/* Cost Optimization Tip */}
              <div style={{ background: 'rgba(255,255,255,0.04)', borderRadius: '8px', padding: '14px', borderLeft: '3px solid #25108f' }}>
                <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.8)', margin: 0, lineHeight: '1.4' }}>
                  <strong>Cost Optimization:</strong> Switching to "Precision Logistics" for the next 48h could save approximately <strong>$4.2k</strong> based on current volume trends.
                </p>
              </div>
            </div>

            {/* Market Volatility Chart */}
            <div className="panel" style={{ background: '#dbeafe', border: '1px solid #bfdbfe', borderRadius: '12px', padding: '20px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <span style={{ display: 'block', fontSize: '10px', fontWeight: '800', color: '#1e40af', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                Market Volatility
              </span>
              
              {/* Custom SVG bars */}
              <div style={{ height: '60px', display: 'flex', alignItems: 'flex-end', gap: '4px', margin: '8px 0' }}>
                {[30, 45, 65, 40, 55, 75, 60].map((h, i) => (
                  <div 
                    key={i} 
                    style={{ 
                      flex: 1, 
                      height: `${h}%`, 
                      background: i === 5 ? '#1d4ed8' : '#60a5fa', 
                      borderRadius: '2px 2px 0 0' 
                    }} 
                  />
                ))}
              </div>

              <p style={{ fontSize: '11.5px', color: '#1e3a8a', margin: 0, lineHeight: '1.4' }}>
                Prices for raw steel have stabilized (+0.2% variance) while logistics indices show a sharp decline in East coast rates.
              </p>
            </div>

          </div>

        </div>

        {/* Category Leaders Section */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
            <Zap size={18} style={{ color: 'var(--primary)' }} />
            <h2 style={{ fontSize: '16px', fontWeight: '800', color: '#1c2536', margin: 0 }}>
              Category Leaders
            </h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 'var(--spacing-section)' }}>
            
            {/* Card 1: Apex */}
            <div className="panel" style={{ background: '#ffffff', border: '1.5px solid #25108f', borderRadius: '12px', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
              <div style={{ position: 'relative', height: '140px' }}>
                <img 
                  src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=300&h=140&q=80" 
                  alt="Apex industrial" 
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                <span style={{ position: 'absolute', top: '12px', left: '12px', background: 'var(--primary)', color: '#ffffff', fontSize: '9px', fontWeight: '800', padding: '3px 8px', borderRadius: '12px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <Star size={10} fill="#ffffff" /> TOP RATED
                </span>
              </div>
              <div style={{ padding: '20px', flex: 1, display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <strong style={{ fontSize: '15px', color: '#1c2536' }}>Apex Industrial Solutions</strong>
                    <strong style={{ fontSize: '18px', color: 'var(--primary)', fontWeight: '800' }}>99%</strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '2px' }}>
                    <span style={{ fontSize: '12px', color: '#7a7688' }}>Specialty Raw Materials</span>
                    <span style={{ fontSize: '10px', color: '#7a7688' }}>Success Rate</span>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '8px', padding: '8px 0', borderTop: '1px solid #f1f5f9', borderBottom: '1px solid #f1f5f9' }}>
                  <div style={{ flex: 1, textAlign: 'center', background: '#f8fafc', padding: '6px', borderRadius: '4px' }}>
                    <span style={{ display: 'block', fontSize: '9px', color: '#7a7688', textTransform: 'uppercase' }}>Pricing</span>
                    <TrendingDown size={14} style={{ color: '#059669', margin: '4px auto 0 auto' }} />
                  </div>
                  <div style={{ flex: 1, textAlign: 'center', background: '#f8fafc', padding: '6px', borderRadius: '4px' }}>
                    <span style={{ display: 'block', fontSize: '9px', color: '#7a7688', textTransform: 'uppercase' }}>Reliability</span>
                    <Zap size={14} style={{ color: '#3b82f6', margin: '4px auto 0 auto' }} />
                  </div>
                  <div style={{ flex: 1, textAlign: 'center', background: '#f8fafc', padding: '6px', borderRadius: '4px' }}>
                    <span style={{ display: 'block', fontSize: '9px', color: '#7a7688', textTransform: 'uppercase' }}>Compliance</span>
                    <CheckCircle2 size={14} style={{ color: '#2563eb', margin: '4px auto 0 auto' }} />
                  </div>
                </div>

                <button
                  onClick={() => alert('View detailed audit files for Apex...')}
                  style={{ width: '100%', background: '#eff6ff', color: '#2563eb', border: 'none', borderRadius: '6px', padding: '8px 0', fontSize: '12.5px', fontWeight: '700', cursor: 'pointer', marginTop: 'auto' }}
                  type="button"
                >
                  View Detailed Audit
                </button>
              </div>
            </div>

            {/* Card 2: Velocity */}
            <div className="panel" style={{ background: '#ffffff', border: '1.5px solid #25108f', borderRadius: '12px', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
              <div style={{ position: 'relative', height: '140px' }}>
                <img 
                  src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=300&h=140&q=80" 
                  alt="Velocity logs" 
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                <span style={{ position: 'absolute', top: '12px', left: '12px', background: '#f97316', color: '#ffffff', fontSize: '9px', fontWeight: '800', padding: '3px 8px', borderRadius: '12px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <Star size={10} fill="#ffffff" /> FASTEST SHIPPER
                </span>
              </div>
              <div style={{ padding: '20px', flex: 1, display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <strong style={{ fontSize: '15px', color: '#1c2536' }}>Velocity Logistics Intl</strong>
                    <strong style={{ fontSize: '18px', color: 'var(--primary)', fontWeight: '800' }}>94%</strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '2px' }}>
                    <span style={{ fontSize: '12px', color: '#7a7688' }}>Global Distribution</span>
                    <span style={{ fontSize: '10px', color: '#7a7688' }}>Success Rate</span>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '8px', padding: '8px 0', borderTop: '1px solid #f1f5f9', borderBottom: '1px solid #f1f5f9' }}>
                  <div style={{ flex: 1, textAlign: 'center', background: '#f8fafc', padding: '6px', borderRadius: '4px' }}>
                    <span style={{ display: 'block', fontSize: '9px', color: '#7a7688', textTransform: 'uppercase' }}>Pricing</span>
                    <span style={{ display: 'block', fontSize: '13px', fontWeight: '800', color: '#565365', marginTop: '3px' }}>=</span>
                  </div>
                  <div style={{ flex: 1, textAlign: 'center', background: '#f8fafc', padding: '6px', borderRadius: '4px' }}>
                    <span style={{ display: 'block', fontSize: '9px', color: '#7a7688', textTransform: 'uppercase' }}>Reliability</span>
                    <TrendingUp size={14} style={{ color: '#059669', margin: '4px auto 0 auto' }} />
                  </div>
                  <div style={{ flex: 1, textAlign: 'center', background: '#f8fafc', padding: '6px', borderRadius: '4px' }}>
                    <span style={{ display: 'block', fontSize: '9px', color: '#7a7688', textTransform: 'uppercase' }}>Compliance</span>
                    <ShieldCheck size={14} style={{ color: '#3b82f6', margin: '4px auto 0 auto' }} />
                  </div>
                </div>

                <button
                  onClick={() => alert('View detailed audit files for Velocity...')}
                  style={{ width: '100%', background: '#eff6ff', color: '#2563eb', border: 'none', borderRadius: '6px', padding: '8px 0', fontSize: '12.5px', fontWeight: '700', cursor: 'pointer', marginTop: 'auto' }}
                  type="button"
                >
                  View Detailed Audit
                </button>
              </div>
            </div>

            {/* Card 3: Economical */}
            <div className="panel" style={{ background: '#ffffff', border: '1.5px solid #25108f', borderRadius: '12px', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
              <div style={{ position: 'relative', height: '140px' }}>
                <img 
                  src="https://images.unsplash.com/photo-1581092921461-eab62e97a780?auto=format&fit=crop&w=300&h=140&q=80" 
                  alt="Economical supplies" 
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                <span style={{ position: 'absolute', top: '12px', left: '12px', background: '#10b981', color: '#ffffff', fontSize: '9px', fontWeight: '800', padding: '3px 8px', borderRadius: '12px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <Star size={10} fill="#ffffff" /> LOWEST COST
                </span>
              </div>
              <div style={{ padding: '20px', flex: 1, display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <strong style={{ fontSize: '15px', color: '#1c2536' }}>Economical Supply Co.</strong>
                    <strong style={{ fontSize: '18px', color: 'var(--primary)', fontWeight: '800' }}>88%</strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '2px' }}>
                    <span style={{ fontSize: '12px', color: '#7a7688' }}>General Components</span>
                    <span style={{ fontSize: '10px', color: '#7a7688' }}>Success Rate</span>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '8px', padding: '8px 0', borderTop: '1px solid #f1f5f9', borderBottom: '1px solid #f1f5f9' }}>
                  <div style={{ flex: 1, textAlign: 'center', background: '#f8fafc', padding: '6px', borderRadius: '4px' }}>
                    <span style={{ display: 'block', fontSize: '9px', color: '#7a7688', textTransform: 'uppercase' }}>Pricing</span>
                    <div style={{ display: 'flex', justifyContent: 'center', color: '#059669', gap: '1px', marginTop: '4px' }}>
                      <TrendingDown size={12} /><TrendingDown size={12} />
                    </div>
                  </div>
                  <div style={{ flex: 1, textAlign: 'center', background: '#f8fafc', padding: '6px', borderRadius: '4px' }}>
                    <span style={{ display: 'block', fontSize: '9px', color: '#7a7688', textTransform: 'uppercase' }}>Reliability</span>
                    <ShieldAlert size={14} style={{ color: '#f59e0b', margin: '4px auto 0 auto' }} />
                  </div>
                  <div style={{ flex: 1, textAlign: 'center', background: '#f8fafc', padding: '6px', borderRadius: '4px' }}>
                    <span style={{ display: 'block', fontSize: '9px', color: '#7a7688', textTransform: 'uppercase' }}>Compliance</span>
                    <CheckCircle2 size={14} style={{ color: '#059669', margin: '4px auto 0 auto' }} />
                  </div>
                </div>

                <button
                  onClick={() => alert('View detailed audit files for Economical...')}
                  style={{ width: '100%', background: '#eff6ff', color: '#2563eb', border: 'none', borderRadius: '6px', padding: '8px 0', fontSize: '12.5px', fontWeight: '700', cursor: 'pointer', marginTop: 'auto' }}
                  type="button"
                >
                  View Detailed Audit
                </button>
              </div>
            </div>

          </div>
        </div>

        {/* Floating Side-by-Side Comparison Drawer */}
        {selectedVendors.length > 0 && (
          <div style={{
            position: 'fixed',
            bottom: '24px',
            left: '280px',
            right: '24px',
            background: '#1c2536',
            color: '#ffffff',
            borderRadius: '12px',
            padding: '16px 24px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            boxShadow: '0 8px 32px rgba(0,0,0,0.15)',
            zIndex: 120,
            border: '1px solid rgba(255,255,255,0.08)',
            animation: 'slideUp 0.3s ease-out'
          }}>
            <style>{`
              @keyframes slideUp {
                from { transform: translateY(100px); opacity: 0; }
                to { transform: translateY(0); opacity: 1; }
              }
            `}</style>
            <div>
              <strong style={{ display: 'block', fontSize: '14px' }}>{selectedVendors.length} Vendors selected for comparison</strong>
              <span style={{ display: 'block', fontSize: '11px', color: 'rgba(255,255,255,0.6)', marginTop: '2px' }}>Running side-by-side reliability analysis...</span>
            </div>
            
            <div style={{ display: 'flex', gap: '14px', alignItems: 'center' }}>
              <button
                onClick={handleClearComparison}
                style={{ background: 'transparent', border: 'none', color: 'rgba(255,255,255,0.7)', fontSize: '12.5px', fontWeight: '600', cursor: 'pointer' }}
                type="button"
              >
                Clear All
              </button>
              <button
                onClick={handleCompare}
                style={{
                  background: 'var(--primary)',
                  color: '#ffffff',
                  border: 'none',
                  borderRadius: '6px',
                  padding: '10px 20px',
                  fontSize: '13px',
                  fontWeight: '700',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}
                type="button"
              >
                <Columns size={15} />
                <span>Compare Now</span>
              </button>
            </div>
          </div>
        )}

      </div>
    </AdminShell>
  );
}


