import React, { useState } from 'react';
import {
  FileText,
  Share2,
  Plus,
  Minus,
  MapPin,
  Truck,
  Phone,
  Scale,
  ShieldCheck,
  HelpCircle,
  Send,
  CheckCircle2
} from 'lucide-react';
import AdminShell from '../../components/layouts/AdminShell';
import { useApp } from '../../hooks/useApp';
import { ROUTES } from '../../config/routes';

export default function DeliveryTracking() {
  const { navigate } = useApp();
  const [zoomLevel, setZoomLevel] = useState(1);

  const handleOpenSupport = () => {
    alert('Opening logistics support ticket form...');
  };

  const handleShareTracking = () => {
    alert('Tracking link copied to clipboard.');
  };

  return (
    <AdminShell
      activeTab="Material Management"
      brandText="Hozify Procurement"
      brandSubText="EXECUTIVE COMMAND"
      searchPlaceholder="Search manifests or tracking IDs..."
      customProfileName="Admin User"
      customProfileRole="Procurement Director"
    >
      <div style={{ padding: '24px 0', display: 'flex', flexDirection: 'column', gap: 'var(--spacing-section)' }}>
        
        {/* Header Block */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <span style={{ fontSize: '11px', fontWeight: '800', color: '#2563eb', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              Active Shipment
            </span>
            <h1 style={{ fontSize: '28px', fontWeight: '800', color: '#1c2536', margin: '4px 0 0 0' }}>
              TRK-9902847551
            </h1>
          </div>
          <div style={{ display: 'flex', gap: '12px' }}>
            <button
              onClick={() => alert('Manifest file downloading...')}
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
              <FileText size={16} />
              <span>Manifest</span>
            </button>
            <button
              onClick={handleShareTracking}
              style={{
                background: 'var(--primary)',
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
                boxShadow: '0 4px 12px rgba(37,16,143,0.15)'
              }}
              type="button"
            >
              <Share2 size={16} />
              <span>Share Tracking</span>
            </button>
          </div>
        </div>

        {/* 2 Columns Layout: Map/Courier & Timeline/Details */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr', lgGridTemplateColumns: '2fr 1fr', gap: 'var(--spacing-section)' }}>
          
          {/* Left Column: Map and Courier widgets */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-section)' }}>
            
            {/* Map Container */}
            <div style={{
              height: '380px',
              border: '1.5px solid #25108f',
              borderRadius: '12px',
              background: '#090e1a',
              position: 'relative',
              overflow: 'hidden'
            }}>
              
              {/* Custom Neon Road Network SVG */}
              <div style={{ width: '100%', height: '100%', position: 'absolute', top: 0, left: 0, opacity: 0.85 }}>
                <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" style={{ transition: 'transform 0.3s ease', transform: `scale(${zoomLevel})` }}>
                  {/* Grid Lines background */}
                  <pattern id="map-grid" width="40" height="40" patternUnits="userSpaceOnUse">
                    <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(37,16,143,0.08)" strokeWidth="1" />
                  </pattern>
                  <rect width="100%" height="100%" fill="url(#map-grid)" />

                  {/* Neon Roads paths */}
                  <path d="M -50 150 L 600 150" fill="none" stroke="rgba(37,99,235,0.15)" strokeWidth="12" />
                  <path d="M -50 150 L 600 150" fill="none" stroke="#2563eb" strokeWidth="2" />

                  <path d="M 100 -50 L 100 450" fill="none" stroke="rgba(37,99,235,0.1)" strokeWidth="8" />
                  <path d="M 100 -50 L 100 450" fill="none" stroke="#1e3a8a" strokeWidth="1.5" />

                  <path d="M 380 -50 L 380 450" fill="none" stroke="rgba(37,99,235,0.1)" strokeWidth="8" />
                  <path d="M 380 -50 L 380 450" fill="none" stroke="#1e3a8a" strokeWidth="1.5" />

                  {/* Route progress path */}
                  <path d="M 100 150 C 200 150, 200 280, 380 280" fill="none" stroke="rgba(16,185,129,0.3)" strokeWidth="8" strokeDasharray="5,5" />
                  <path d="M 100 150 C 200 150, 200 280, 380 280" fill="none" stroke="#10b981" strokeWidth="2" />

                  {/* Delivery Start & Stop Pins */}
                  <circle cx="100" cy="150" r="8" fill="#1e3a8a" stroke="#3b82f6" strokeWidth="2" />
                  <circle cx="380" cy="280" r="8" fill="#dc2626" stroke="#fca5a5" strokeWidth="2" />

                  {/* Live truck marker location */}
                  <g transform="translate(230, 195)">
                    <circle cx="0" cy="0" r="16" fill="rgba(16,185,129,0.2)" />
                    <circle cx="0" cy="0" r="8" fill="#10b981" />
                  </g>
                </svg>
              </div>

              {/* Map Floating overlays */}
              {/* Top Left: Estimated Arrival */}
              <div style={{
                position: 'absolute',
                top: '16px',
                left: '16px',
                background: '#ffffff',
                borderRadius: '8px',
                padding: '12px 16px',
                boxShadow: '0 4px 16px rgba(0,0,0,0.12)',
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                zIndex: 10
              }}>
                <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: '#eff6ff', color: '#2563eb', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Truck size={16} />
                </div>
                <div>
                  <span style={{ display: 'block', fontSize: '10px', color: '#7a7688', textTransform: 'uppercase' }}>Estimated Arrival</span>
                  <strong style={{ display: 'block', fontSize: '14px', color: '#1c2536', marginTop: '2px' }}>14:45 PM (Today)</strong>
                </div>
              </div>

              {/* Bottom Left: Current Position */}
              <div style={{
                position: 'absolute',
                bottom: '16px',
                left: '16px',
                background: '#ffffff',
                borderRadius: '8px',
                padding: '10px 14px',
                boxShadow: '0 4px 16px rgba(0,0,0,0.12)',
                zIndex: 10
              }}>
                <span style={{ display: 'block', fontSize: '10px', color: '#7a7688' }}>Currently at:</span>
                <strong style={{ display: 'block', fontSize: '12.5px', color: '#1c2536', marginTop: '2px' }}>Mid-Transit Hub • Des Plaines, IL</strong>
              </div>

              {/* Zoom Controls */}
              <div style={{
                position: 'absolute',
                bottom: '16px',
                right: '16px',
                display: 'flex',
                flexDirection: 'column',
                gap: '8px',
                zIndex: 10
              }}>
                <button onClick={() => setZoomLevel(z => Math.min(z + 0.5, 3))} style={{ width: '36px', height: '36px', borderRadius: '50%', background: '#ffffff', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', boxShadow: '0 2px 8px rgba(0,0,0,0.15)' }} aria-label="Zoom In" type="button">
                  <Plus size={16} style={{ color: '#565365' }} />
                </button>
                <button onClick={() => setZoomLevel(z => Math.max(z - 0.5, 0.5))} style={{ width: '36px', height: '36px', borderRadius: '50%', background: '#ffffff', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', boxShadow: '0 2px 8px rgba(0,0,0,0.15)' }} aria-label="Zoom Out" type="button">
                  <Minus size={16} style={{ color: '#565365' }} />
                </button>
                <button onClick={() => setZoomLevel(1)} style={{ width: '36px', height: '36px', borderRadius: '50%', background: '#ffffff', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', boxShadow: '0 2px 8px rgba(0,0,0,0.15)' }} aria-label="My Location" type="button">
                  <MapPin size={16} style={{ color: '#565365' }} />
                </button>
              </div>

            </div>

            {/* Courier, Contact, Weight Widgets (3 Columns grid) */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '20px' }}>
              
              {/* Courier Card */}
              <div className="panel" style={{ background: '#ffffff', border: '1.5px solid #25108f', borderRadius: '12px', padding: '16px 20px', display: 'flex', alignItems: 'center', gap: '12px' }}>
                <img 
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=80&h=80&q=80" 
                  alt="Marcus courier" 
                  style={{ width: '42px', height: '42px', borderRadius: '50%', objectFit: 'cover' }}
                />
                <div>
                  <span style={{ display: 'block', fontSize: '10px', color: '#7a7688', textTransform: 'uppercase' }}>Courier</span>
                  <strong style={{ display: 'block', fontSize: '13.5px', color: '#1c2536', marginTop: '2px' }}>Marcus Jensen</strong>
                  <span style={{ display: 'block', fontSize: '11px', color: '#eab308', fontWeight: '700', marginTop: '2px' }}>★ 4.9</span>
                </div>
              </div>

              {/* Contact Card */}
              <div className="panel" style={{ background: '#ffffff', border: '1.5px solid #25108f', borderRadius: '12px', padding: '16px 20px', display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: '#eff6ff', color: '#2563eb', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Phone size={18} />
                </div>
                <div style={{ flex: 1 }}>
                  <span style={{ display: 'block', fontSize: '10px', color: '#7a7688', textTransform: 'uppercase' }}>Contact</span>
                  <strong style={{ display: 'block', fontSize: '13px', color: '#1c2536', marginTop: '2px' }}>+1 (555) 012-4492</strong>
                  <span 
                    onClick={() => alert('Opening messaging chat overlay...')}
                    style={{ display: 'block', fontSize: '11px', color: '#2563eb', fontWeight: '700', cursor: 'pointer', marginTop: '2px' }}
                  >
                    Message Driver
                  </span>
                </div>
              </div>

              {/* Shipment Weight Card */}
              <div className="panel" style={{ background: '#ffffff', border: '1.5px solid #25108f', borderRadius: '12px', padding: '16px 20px', display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: '#f5f3ff', color: '#8b5cf6', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Scale size={18} />
                </div>
                <div>
                  <span style={{ display: 'block', fontSize: '10px', color: '#7a7688', textTransform: 'uppercase' }}>Shipment Weight</span>
                  <strong style={{ display: 'block', fontSize: '13.5px', color: '#1c2536', marginTop: '2px' }}>1,240.50 kg</strong>
                  <span style={{ display: 'block', fontSize: '11px', color: '#7a7688', marginTop: '2px' }}>4 Pallets • Grade A</span>
                </div>
              </div>

            </div>

          </div>

          {/* Right Column: Timeline, Contents, and Support */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-section)' }}>
            
            {/* Delivery Progress */}
            <div className="panel" style={{ background: '#ffffff', border: '1.5px solid #25108f', borderRadius: '12px', padding: 'var(--spacing-section)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <span style={{ fontSize: '14px', fontWeight: '800', color: '#1c2536' }}>Delivery Progress</span>
                <span style={{ fontSize: '11px', fontWeight: '800', color: '#7c3aed', background: '#f5f3ff', padding: '4px 8px', borderRadius: '4px' }}>
                  In Transit
                </span>
              </div>

              {/* Vert Timeline */}
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                
                {/* Node 1 */}
                <div style={{ display: 'flex', gap: '14px', position: 'relative' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <div style={{ width: '18px', height: '18px', borderRadius: '50%', background: '#ecfdf5', color: '#059669', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 2 }}>
                      <CheckCircle2 size={14} fill="#ecfdf5" />
                    </div>
                    <div style={{ width: '2px', background: '#10b981', flex: 1, minHeight: '40px', zIndex: 1 }} />
                  </div>
                  <div style={{ paddingBottom: '16px' }}>
                    <strong style={{ display: 'block', fontSize: '13px', color: '#1c2536' }}>Dispatched from Source</strong>
                    <span style={{ display: 'block', fontSize: '11px', color: '#7a7688', marginTop: '2px' }}>Warehouse A • Oct 24, 08:30 AM</span>
                  </div>
                </div>

                {/* Node 2 */}
                <div style={{ display: 'flex', gap: '14px', position: 'relative' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <div style={{ width: '18px', height: '18px', borderRadius: '50%', background: '#ffffff', border: '2.5px solid #25108f', zIndex: 2 }} />
                    <div style={{ width: '2px', background: '#e2e8f0', flex: 1, minHeight: '90px', zIndex: 1 }} />
                  </div>
                  <div style={{ paddingBottom: '16px', flex: 1 }}>
                    <strong style={{ display: 'block', fontSize: '13px', color: 'var(--primary)' }}>In Transit</strong>
                    <span style={{ display: 'block', fontSize: '11px', color: '#7a7688', marginTop: '2px' }}>Arriving at Hub B • Oct 25, 10:45 AM</span>
                    
                    <div style={{ background: '#f8fafc', padding: '10px', borderRadius: '6px', border: '1px solid #cbd5e1', marginTop: '10px' }}>
                      <p style={{ fontSize: '11px', color: '#565365', margin: 0, fontStyle: 'italic', lineHeight: '1.4' }}>
                        "Driver is currently ahead of schedule by 15 minutes."
                      </p>
                    </div>
                  </div>
                </div>

                {/* Node 3 */}
                <div style={{ display: 'flex', gap: '14px', position: 'relative' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <div style={{ width: '18px', height: '18px', borderRadius: '50%', background: '#e2e8f0', zIndex: 2 }} />
                    <div style={{ width: '2px', background: '#e2e8f0', flex: 1, minHeight: '30px', zIndex: 1 }} />
                  </div>
                  <div style={{ paddingBottom: '16px' }}>
                    <strong style={{ display: 'block', fontSize: '13px', color: '#7a7688' }}>Out for Delivery</strong>
                    <span style={{ display: 'block', fontSize: '11px', color: '#7a7688', marginTop: '2px' }}>Expected Today, 01:15 PM</span>
                  </div>
                </div>

                {/* Node 4 */}
                <div style={{ display: 'flex', gap: '14px' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <div style={{ width: '18px', height: '18px', borderRadius: '50%', background: '#e2e8f0', zIndex: 2 }} />
                  </div>
                  <div>
                    <strong style={{ display: 'block', fontSize: '13px', color: '#7a7688' }}>Delivered</strong>
                    <span style={{ display: 'block', fontSize: '11px', color: '#7a7688', marginTop: '2px' }}>Destination: Main HQ Site</span>
                  </div>
                </div>

              </div>
            </div>

            {/* Shipment Contents */}
            <div className="panel" style={{ background: '#ffffff', border: '1.5px solid #25108f', borderRadius: '12px', padding: 'var(--spacing-section)' }}>
              <strong style={{ display: 'block', fontSize: '14px', color: '#1c2536', marginBottom: '6px' }}>Shipment Contents</strong>
              <span style={{ display: 'block', fontSize: '11.5px', color: '#7a7688', marginBottom: '16px' }}>PO #440029-X</span>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', paddingBottom: '14px', borderBottom: '1px solid #f1f5f9' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px' }}>
                  <div>
                    <strong style={{ display: 'block', color: '#1c2536' }}>Industrial Grade Sealant</strong>
                    <span style={{ display: 'block', fontSize: '11px', color: '#7a7688', marginTop: '2px' }}>SKU: IND-SEA-09</span>
                  </div>
                  <strong style={{ color: '#1c2536' }}>450 Units</strong>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px' }}>
                  <div>
                    <strong style={{ display: 'block', color: '#1c2536' }}>Aluminum Alloy Plates</strong>
                    <span style={{ display: 'block', fontSize: '11px', color: '#7a7688', marginTop: '2px' }}>SKU: MET-ALU-22</span>
                  </div>
                  <strong style={{ color: '#1c2536' }}>85 Units</strong>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px' }}>
                  <div>
                    <strong style={{ display: 'block', color: '#1c2536' }}>Carbon Fiber Mesh</strong>
                    <span style={{ display: 'block', fontSize: '11px', color: '#7a7688', marginTop: '2px' }}>SKU: FAB-CAR-51</span>
                  </div>
                  <strong style={{ color: '#1c2536' }}>12 Rolls</strong>
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '14px', fontSize: '13px' }}>
                <span style={{ color: '#7a7688' }}>Total Volume</span>
                <strong style={{ color: '#1c2536' }}>12.5 m³</strong>
              </div>
            </div>

            {/* Issue with delivery? */}
            <div className="panel" style={{ background: '#0b1329', color: '#ffffff', borderRadius: '12px', padding: '20px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div>
                <strong style={{ display: 'block', fontSize: '14px' }}>Issue with delivery?</strong>
                <p style={{ fontSize: '11.5px', color: 'rgba(255,255,255,0.7)', margin: '6px 0 0 0', lineHeight: '1.4' }}>
                  Our logistics support team is available 24/7 for active shipment assistance.
                </p>
              </div>
              <button
                onClick={handleOpenSupport}
                style={{
                  width: '100%',
                  background: '#ffffff',
                  color: '#0b1329',
                  border: 'none',
                  borderRadius: '6px',
                  padding: '9px 0',
                  fontSize: '12.5px',
                  fontWeight: '700',
                  cursor: 'pointer'
                }}
                type="button"
              >
                Open Support Ticket
              </button>
            </div>

          </div>

        </div>

      </div>
    </AdminShell>
  );
}


