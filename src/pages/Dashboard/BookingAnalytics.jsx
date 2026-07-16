import React, { useState } from 'react';
import { 
  Calendar, 
  TrendingUp, 
  TrendingDown, 
  MapPin, 
  Plus, 
  Compass, 
  Eye, 
  Activity, 
  ArrowRight,
  Maximize2,
  Minimize2
} from 'lucide-react';
import AdminShell from '../../components/layouts/AdminShell';
import { useDateFilter } from '../../contexts/DateFilterContext';
import DateFilter from '../../components/common/DateFilter';
import SkeletonLoader from '../../components/common/SkeletonLoader';
import EmptyState from '../../components/common/EmptyState';

export default function BookingAnalytics({ activeTab = 'Booking Management' }) {
  const { preset, isFiltering, hasData } = useDateFilter();

  const tabData = {
    Daily: {
      range: 'Today, Oct 30',
      kpis: [
        { title: "PENDING", value: "184", trend: "+5%", positive: true },
        { title: "ASSIGNED", value: "142", trend: "+2%", positive: true },
        { title: "IN PROGRESS", value: "56", trend: "-1%", neutral: true },
        { title: "COMPLETED", value: "402", trend: "+14%", positive: true },
        { title: "CANCELLED", value: "12", trend: "-1%", positive: false },
        { title: "REFUNDED", value: "4", trend: "0%", neutral: true }
      ]
    },
    Weekly: {
      range: 'Oct 24 - Oct 30',
      kpis: [
        { title: "PENDING", value: "1,284", trend: "+12%", positive: true },
        { title: "ASSIGNED", value: "842", trend: "+8%", positive: true },
        { title: "IN PROGRESS", value: "256", trend: "-0%", neutral: true },
        { title: "COMPLETED", value: "15,402", trend: "+24%", positive: true },
        { title: "CANCELLED", value: "112", trend: "-3%", positive: false },
        { title: "REFUNDED", value: "42", trend: "-2%", positive: false }
      ]
    },
    Monthly: {
      range: 'October 2026',
      kpis: [
        { title: "PENDING", value: "5,284", trend: "+22%", positive: true },
        { title: "ASSIGNED", value: "3,842", trend: "+18%", positive: true },
        { title: "IN PROGRESS", value: "856", trend: "+4%", positive: true },
        { title: "COMPLETED", value: "65,402", trend: "+34%", positive: true },
        { title: "CANCELLED", value: "512", trend: "-8%", positive: false },
        { title: "REFUNDED", value: "142", trend: "-5%", positive: false }
      ]
    }
  };

  // Generate dynamic KPIs based on the time tab or custom range
  const kpis = tabData[preset] ? tabData[preset].kpis : tabData['Weekly'].kpis.map(k => ({
    ...k,
    value: (parseInt(k.value.replace(/,/g, '')) * 1.5).toLocaleString('en-US'),
  }));

  const funnelStages = [
    { label: "Impression to View (92%)", name: "Booking Landing Page", count: "245k", width: "92%", color: "#c8c0d7" },
    { label: "View to Selection (64%)", name: "Service Selection", count: "156k", width: "64%", color: "#a89fc0" },
    { label: "Selection to Checkout (38%)", name: "Checkout Initiated", count: "59k", width: "38%", color: "#857da5" },
    { label: "Checkout to Paid (82%)", name: "Successful Booking", count: "48k", width: "82%", color: 'var(--primary)' }
  ];

  const handleCreateBooking = () => {
    alert("Triggering New Booking wizard sequence...");
  };

  return (
    <AdminShell
      activeTab={activeTab}
      brandText="HOZIFY"
      brandSubText="Enterprise Admin"
      headerTitle="Booking Analytics"
      searchPlaceholder="Search operational metrics..."
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-section)', padding: '24px 0' }}>
        
        {/* Page Title & Toggles */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px', position: 'relative', zIndex: 100 }}>
          <div>
            <h1 style={{ fontSize: '24px', fontWeight: '800', color: 'var(--text)', margin: 0 }}>
              Booking Analytics
            </h1>
            <p style={{ fontSize: '13px', color: 'var(--muted)', margin: '4px 0 0' }}>
              Real-time operational overview and conversion performance.
            </p>
          </div>

          <div style={{ display: 'flex', gap: '12px', alignItems: 'center', flexWrap: 'wrap' }}>
            <DateFilter />
          </div>
        </div>

        {isFiltering ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-section)' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '16px' }}>
              <SkeletonLoader height="120px" />
              <SkeletonLoader height="120px" />
              <SkeletonLoader height="120px" />
              <SkeletonLoader height="120px" />
              <SkeletonLoader height="120px" />
              <SkeletonLoader height="120px" />
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '20px' }}>
              <SkeletonLoader height="300px" />
              <SkeletonLoader height="300px" />
            </div>
          </div>
        ) : !hasData ? (
          <EmptyState />
        ) : (
          <>
        {/* Top KPIs Cards horizontal flow */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: '12px', overflowX: 'auto' }}>
          {kpis.map((kpi, index) => (
            <div key={index} className="panel" style={{ padding: '16px', minWidth: '110px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '10px', fontWeight: '800', color: 'var(--muted)', textTransform: 'uppercase' }}>{kpi.title}</span>
                <span style={{
                  fontSize: '10px',
                  fontWeight: '850',
                  color: kpi.neutral ? 'var(--muted)' : (kpi.positive ? '#07956f' : '#d32929')
                }}>
                  {kpi.trend}
                </span>
              </div>
              <strong style={{ display: 'block', fontSize: '22px', fontWeight: '850', color: 'var(--text)', marginTop: '8px' }}>
                {kpi.value}
              </strong>
            </div>
          ))}
        </div>

        {/* Dynamic Funnel and Rate Widgets */}
        <div style={{ display: 'grid', gridTemplateColumns: '1.6fr 1fr', gap: '20px', alignItems: 'stretch' }}>
          
          {/* Funnel Widget */}
          <div className="panel" style={{ padding: 'var(--spacing-section)', display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <h2 style={{ fontSize: '14px', fontWeight: '850', color: 'var(--text)', margin: 0 }}>Booking Funnel & Stage Conversion</h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginTop: '10px' }}>
              {funnelStages.map((stage, idx) => (
                <div key={idx}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', fontWeight: '800', color: 'var(--muted)', textTransform: 'uppercase', marginBottom: '6px' }}>
                    <span>{stage.label}</span>
                    <span>{stage.count}</span>
                  </div>
                  <div style={{ height: '34px', background: '#f4eff8', borderRadius: '4px', overflow: 'hidden', position: 'relative', display: 'flex', alignItems: 'center', paddingLeft: '12px' }}>
                    <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: stage.width, background: stage.color, borderRadius: '4px' }} />
                    <span style={{ position: 'relative', zIndex: 2, color: stage.color === '#25108f' ? '#fff' : 'var(--text)', fontSize: '12px', fontWeight: '800' }}>
                      {stage.name}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Rates Columns */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            
            {/* Conversion Rate Card */}
            <div className="panel" style={{ padding: 'var(--spacing-section)', display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <span style={{ fontSize: '11px', fontWeight: '800', color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>CONVERSION RATE</span>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
                <strong style={{ fontSize: '28px', fontWeight: '850', color: 'var(--text)' }}>18.4%</strong>
                <span style={{ fontSize: '12px', fontWeight: '750', color: 'var(--green)' }}>+2.4%</span>
              </div>

              {/* Sparkline Column bars */}
              <div style={{ height: '40px', display: 'flex', alignItems: 'flex-end', gap: '4px', marginTop: '10px' }}>
                {[15, 25, 20, 35, 30, 42, 50].map((val, i) => (
                  <div key={i} style={{
                    flex: 1,
                    height: `${val}%`,
                    background: i === 6 ? '#25108f' : '#c8c0d7',
                    borderRadius: '2px 2px 0 0'
                  }} />
                ))}
              </div>
            </div>

            {/* Completion Rate Card */}
            <div className="panel" style={{ padding: 'var(--spacing-section)', display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <span style={{ fontSize: '11px', fontWeight: '800', color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>COMPLETION RATE</span>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
                <strong style={{ fontSize: '28px', fontWeight: '850', color: 'var(--text)' }}>94.2%</strong>
                <span style={{ fontSize: '12px', fontWeight: '750', color: 'var(--green)' }}>+0.8%</span>
              </div>

              {/* Sparkline Column bars */}
              <div style={{ height: '40px', display: 'flex', alignItems: 'flex-end', gap: '4px', marginTop: '10px' }}>
                {[40, 42, 45, 43, 48, 50, 60].map((val, i) => (
                  <div key={i} style={{
                    flex: 1,
                    height: `${val}%`,
                    background: i === 6 ? '#334155' : '#c8c0d7',
                    borderRadius: '2px 2px 0 0'
                  }} />
                ))}
              </div>
            </div>

          </div>

        </div>

        {/* City Listings & Map mockup */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.6fr', gap: '20px', alignItems: 'stretch' }}>
          
          {/* Location Listings & actions */}
          <div className="panel" style={{ padding: 'var(--spacing-section)', display: 'flex', flexDirection: 'column', justifySelf: 'stretch', justifyContent: 'space-between' }}>
            <div>
              <h2 style={{ fontSize: '14px', fontWeight: '850', color: 'var(--text)', margin: '0 0 4px' }}>Bookings By Location</h2>
              <span style={{ fontSize: '11px', color: 'var(--muted)' }}>Heat clusters based on density.</span>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginTop: '24px' }}>
                {[
                  { city: "New York City", count: "4,281", color: 'var(--primary)' },
                  { city: "Los Angeles", count: "3,110", color: "#7c2d12" },
                  { city: "Chicago", count: "2,445", color: "#1e3a8a" },
                  { city: "Austin", count: "1,902", color: "#475569" }
                ].map((item, index) => (
                  <div key={index} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: '750', fontSize: '13px' }}>
                      <span style={{ height: '8px', width: '8px', background: item.color, borderRadius: '50%' }} />
                      {item.city}
                    </span>
                    <strong style={{ fontSize: '13px', color: 'var(--text)' }}>{item.count}</strong>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '24px' }}>
              <button
                onClick={handleCreateBooking}
                style={{
                  width: '100%',
                  height: '40px',
                  border: 'none',
                  background: 'var(--primary)',
                  color: '#fff',
                  fontSize: '13px',
                  fontWeight: '750',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px'
                }}
              >
                <Plus size={16} />
                <span>Create New Booking</span>
              </button>
              <button
                onClick={() => alert("Loading full geographical location distribution database...")}
                style={{
                  width: '100%',
                  height: '40px',
                  border: '1.5px solid #25108f',
                  background: '#fff',
                  color: 'var(--text)',
                  fontSize: '13px',
                  fontWeight: '750',
                  borderRadius: '6px',
                  cursor: 'pointer'
                }}
              >
                View Full Distribution
              </button>
            </div>
          </div>

          {/* Right Map Mockup */}
          <div className="panel" style={{ padding: 0, overflow: 'hidden', background: '#e2e8f0', minHeight: '320px', position: 'relative', display: 'flex' }}>
            
            {/* Grid line effect to feel like 3D dashboard map */}
            <div style={{
              position: 'absolute',
              top: 0, left: 0, right: 0, bottom: 0,
              background: 'radial-gradient(circle, transparent 20%, #e2e8f0 70%), linear-gradient(rgba(37,16,143,0.08) 1.5px, transparent 1.5px), linear-gradient(90deg, rgba(37,16,143,0.08) 1.5px, transparent 1.5px)',
              backgroundSize: '100% 100%, 20px 20px, 20px 20px',
              transform: 'perspective(500px) rotateX(25deg) scale(1.1)',
              transformOrigin: 'bottom'
            }} />

            {/* SVG or layout nodes matching the blueprint/screenshot bubbles */}
            <div style={{ position: 'absolute', top: '30%', left: '25%', transform: 'translate(-50%, -50%)' }}>
              <div style={{ height: '32px', width: '32px', borderRadius: '50%', background: 'rgba(37,16,143,0.2)', border: '2px solid #25108f', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div style={{ height: '12px', width: '12px', borderRadius: '50%', background: 'var(--primary)' }} />
              </div>
            </div>

            <div style={{ position: 'absolute', top: '65%', left: '70%', transform: 'translate(-50%, -50%)' }}>
              <div style={{ height: '42px', width: '42px', borderRadius: '50%', background: 'rgba(37,16,143,0.2)', border: '2px solid #25108f', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div style={{ height: '16px', width: '16px', borderRadius: '50%', background: 'var(--primary)' }} />
              </div>
            </div>

            <div style={{ position: 'absolute', top: '50%', left: '55%', transform: 'translate(-50%, -50%)' }}>
              <div style={{ height: '26px', width: '26px', borderRadius: '50%', background: 'rgba(71,85,105,0.2)', border: '2px solid #475569', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div style={{ height: '8px', width: '8px', borderRadius: '50%', background: '#475569' }} />
              </div>
            </div>

            {/* Map Controls */}
            <div style={{ position: 'absolute', bottom: '16px', right: '16px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <button
                style={{ height: '32px', width: '32px', border: '1.5px solid #25108f', background: '#fff', borderRadius: '6px', fontWeight: '800', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                onClick={() => alert('Map Zoom In')}
              >
                +
              </button>
              <button
                style={{ height: '32px', width: '32px', border: '1.5px solid #25108f', background: '#fff', borderRadius: '6px', fontWeight: '800', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                onClick={() => alert('Map Zoom Out')}
              >
                -
              </button>
              <button
                style={{ height: '32px', width: '32px', border: '1.5px solid #25108f', background: '#fff', borderRadius: '6px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                onClick={() => alert('Recenter Map View')}
              >
                <Compass size={14} style={{ color: 'var(--muted)' }} />
              </button>
            </div>

          </div>
        </div>
          </>
        )}
      </div>
    </AdminShell>
  );
}


