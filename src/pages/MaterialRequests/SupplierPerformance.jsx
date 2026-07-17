import React, { useState } from 'react';
import {
  Calendar,
  Download,
  TrendingUp,
  TrendingDown,
  Minus,
  Sliders,
  ChevronLeft,
  ChevronRight,
  ArrowUpRight,
  Plus,
  LayoutGrid,
  FileText,
  Inbox,
  CalendarCheck,
  Settings,
  HelpCircle,
  ChevronDown
} from 'lucide-react';
import AdminShell from '../../components/layouts/AdminShell';
import { useApp } from '../../hooks/useApp';
import { ROUTES } from '../../config/routes';
import { useToast } from '../../components/common/ToastNotification';
import { triggerDownload, generateCSV } from '../../utils/downloadHelper';

export default function SupplierPerformance() {
  const { navigate } = useApp();
  const { addToast } = useToast();
  const [selectedTab, setSelectedTab] = useState('Suppliers');

  // Calendar State
  const [dateRange, setDateRange] = useState('Last 30 Days');
  const [activeDateMenu, setActiveDateMenu] = useState(false);

  // Audit filter/pagination states
  const [auditStatusFilter, setAuditStatusFilter] = useState('ALL');
  const [activeSlidersMenu, setActiveSlidersMenu] = useState(false);
  const [auditPage, setAuditPage] = useState(1);

  // Dynamic KPI calculations based on selected date range
  const getKpiData = () => {
    switch (dateRange) {
      case 'Today':
        return { delivery: '98.1%', quality: '99.5%', cost: '$120k', risk: 'Low', deliveryTrend: '+0.8%', qualityTrend: '+0.2%', costTrend: '-0.1%', deliveryPath: 'M 0,20 L 20,10 L 40,15 L 60,5 L 80,2' };
      case 'Last 7 Days':
        return { delivery: '95.4%', quality: '98.9%', cost: '$1.1M', risk: 'Low', deliveryTrend: '+1.5%', qualityTrend: '+0.5%', costTrend: '-0.3%', deliveryPath: 'M 0,20 L 20,18 L 40,12 L 60,8 L 80,4' };
      case 'Last 90 Days':
        return { delivery: '92.9%', quality: '97.6%', cost: '$12.8M', risk: 'Medium', deliveryTrend: '+3.1%', qualityTrend: '+1.8%', costTrend: '-1.2%', deliveryPath: 'M 0,20 L 20,24 L 40,18 L 60,12 L 80,10' };
      case 'This Year':
        return { delivery: '93.5%', quality: '98.0%', cost: '$54.1M', risk: 'Low', deliveryTrend: '+4.0%', qualityTrend: '+2.5%', costTrend: '-2.4%', deliveryPath: 'M 0,20 L 20,22 L 40,15 L 60,10 L 80,6' };
      case 'Last 30 Days':
      default:
        return { delivery: '94.2%', quality: '98.7%', cost: '$4.2M', risk: 'Low', deliveryTrend: '+2.4%', qualityTrend: '+1.1%', costTrend: '-0.8%', deliveryPath: 'M 0,20 L 10,18 L 20,22 L 30,15 L 40,19 L 50,12 L 60,14 L 70,8 L 80,4' };
    }
  };

  const kpis = getKpiData();

  // Audit data
  const page1Suppliers = [
    { name: 'Global Logistics Inc.', id: 'SUP-48291', onTime: '99.8%', onTimecolor: 'var(--green)', defect: '0.02%', costIdx: '1.02', status: 'PREFERRED', statusBg: '#ecfdf5', statuscolor: 'var(--green)' },
    { name: 'Precision Parts Co.', id: 'SUP-22104', onTime: '92.5%', onTimeColor: 'var(--text)', defect: '0.15%', costIdx: '0.95', status: 'ACTIVE', statusBg: '#ecfdf5', statuscolor: 'var(--green)' },
    { name: 'Apex Materials Ltd.', id: 'SUP-11829', onTime: '84.2%', onTimeColor: '#b45309', defect: '2.1%', defectcolor: 'var(--red)', costIdx: '1.45', status: 'WATCHLIST', statusBg: '#fffbeb', statusColor: '#b45309' },
    { name: 'Zenith Solutions', id: 'SUP-94832', onTime: '96.1%', onTimeColor: 'var(--text)', defect: '0.05%', costIdx: '1.10', status: 'ACTIVE', statusBg: '#ecfdf5', statuscolor: 'var(--green)' }
  ];

  const page2Suppliers = [
    { name: 'Falcon Steel Inc.', id: 'SUP-88301', onTime: '91.0%', onTimeColor: 'var(--text)', defect: '0.45%', costIdx: '0.99', status: 'ACTIVE', statusBg: '#ecfdf5', statuscolor: 'var(--green)' },
    { name: 'LogiRoute Logistics', id: 'SUP-44093', onTime: '97.5%', onTimecolor: 'var(--green)', defect: '0.10%', costIdx: '1.05', status: 'ACTIVE', statusBg: '#ecfdf5', statuscolor: 'var(--green)' },
    { name: 'Titan Ironworks', id: 'SUP-77215', onTime: '80.1%', onTimeColor: '#b45309', defect: '4.5%', defectcolor: 'var(--red)', costIdx: '1.80', status: 'WATCHLIST', statusBg: '#fffbeb', statusColor: '#b45309' },
    { name: 'Alpha Circuits', id: 'SUP-12003', onTime: '99.9%', onTimecolor: 'var(--green)', defect: '0.01%', costIdx: '1.01', status: 'PREFERRED', statusBg: '#ecfdf5', statuscolor: 'var(--green)' }
  ];

  const allSuppliersList = auditPage === 1 ? page1Suppliers : page2Suppliers;
  const filteredSuppliers = allSuppliersList.filter(s => auditStatusFilter === 'ALL' || s.status === auditStatusFilter);

  // Sidebar items matching the mockup exactly
  const sidebarItems = [
    { label: 'Dashboard', route: ROUTES.dashboard, icon: LayoutGrid },
    { label: 'Material Requests', route: ROUTES.materialRequests, icon: FileText },
    { label: 'Approval Queue', route: ROUTES.materialApprovals, icon: CalendarCheck },
    { label: 'Inventory', route: ROUTES.materialInventory, icon: Inbox },
    { label: 'Suppliers', route: ROUTES.materialSupplierPerformance, icon: Inbox },
    { label: 'Cost Analysis', route: ROUTES.materialCostOptimization, icon: TrendingUp }
  ];

  const sidebarBtn = (
    <button
      onClick={() => navigate(ROUTES.materialCreate)}
      style={{
        width: '100%',
        background: 'var(--primary)',
        color: '#ffffff',
        border: 'none',
        borderRadius: '6px',
        padding: '12px',
        fontSize: '13px',
        fontWeight: '700',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '8px',
        boxShadow: '0 4px 12px rgba(37, 16, 143, 0.15)',
        transition: 'all 0.2s'
      }}
      onMouseOver={(e) => (e.currentTarget.style.opacity = '0.9')}
      onMouseOut={(e) => (e.currentTarget.style.opacity = '1')}
    >
      <Plus size={16} />
      <span>New Request</span>
    </button>
  );

  return (
    <AdminShell
      activeTab="Material Management"
      brandText="Hozify Procurement"
      brandSubText="Executive Command"
      headerTitle="Procurement Portal"
      searchPlaceholder="Search suppliers..."
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-section)', padding: '24px 0' }}>
        
        {/* H1 Overview bar */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <h1 style={{ fontSize: '24px', fontWeight: '800', color: 'var(--text)', margin: 0 }}>
              Supplier Performance Overview
            </h1>
            <p style={{ fontSize: '14px', color: 'var(--muted)', marginTop: '4px', margin: 0 }}>
              Real-time tracking of vendor reliability, quality metrics, and cost efficiency across the global supply chain.
            </p>
          </div>
          <div style={{ display: 'flex', gap: '12px', position: 'relative' }}>
            <div 
              onClick={() => setActiveDateMenu(!activeDateMenu)}
              style={{ display: 'flex', alignItems: 'center', gap: '8px', border: '1.5px solid #25108f', background: '#fff', borderRadius: '6px', padding: '8px 12px', fontSize: '13px', fontWeight: '700', color: 'var(--text)', cursor: 'pointer' }}
            >
              <Calendar size={15} style={{ color: 'var(--muted)' }} />
              <span>{dateRange}</span>
              <ChevronDown size={14} style={{ color: '#565365' }} />
            </div>

            {activeDateMenu && (
              <>
                <div 
                  onClick={() => setActiveDateMenu(false)}
                  style={{ position: 'fixed', inset: 0, zIndex: 999 }}
                />
                <div 
                  style={{ 
                    position: 'absolute', 
                    left: '0', 
                    top: '40px', 
                    width: '160px', 
                    background: '#ffffff', 
                    border: '1px solid #cbd5e1', 
                    borderRadius: '8px', 
                    boxShadow: '0 4px 12px rgba(0,0,0,0.1)', 
                    zIndex: 1000, 
                    padding: '6px 0',
                    textAlign: 'left'
                  }}
                >
                  {['Today', 'Last 7 Days', 'Last 30 Days', 'Last 90 Days', 'This Year'].map((range) => (
                    <button
                      key={range}
                      onClick={() => {
                        setDateRange(range);
                        setActiveDateMenu(false);
                        addToast(`Performance metrics re-calculated for ${range}`, 'info');
                      }}
                      style={{
                        width: '100%',
                        border: 'none',
                        background: 'transparent',
                        padding: '8px 12px',
                        fontSize: '12px',
                        color: '#1c2536',
                        fontWeight: dateRange === range ? '800' : '500',
                        textAlign: 'left',
                        cursor: 'pointer'
                      }}
                      className="hover:bg-slate-50"
                    >
                      {range}
                    </button>
                  ))}
                </div>
              </>
            )}

            <button
              onClick={() => {
                const data = [
                  ["Supplier Name", "Supplier ID", "On-Time %", "Defect Rate", "Cost Index", "Rating"],
                  ["Global Logistics Inc.", "SUP-48291", "99.8%", "0.02%", "1.02", "PREFERRED"],
                  ["Precision Parts Co.", "SUP-22104", "92.5%", "0.15%", "0.95", "ACTIVE"],
                  ["Apex Materials Ltd.", "SUP-11829", "84.2%", "2.1%", "1.45", "WATCHLIST"],
                  ["Zenith Solutions", "SUP-94832", "96.1%", "0.05%", "1.10", "ACTIVE"]
                ];
                const csvContent = generateCSV(data[0], data.slice(1));
                triggerDownload(csvContent, "supplier_performance_data.csv", "text/csv");
                addToast("Supplier performance data exported successfully!", "success");
              }}
              style={{ display: 'flex', alignItems: 'center', gap: '8px', border: 'none', background: '#0b1329', color: '#fff', borderRadius: '6px', padding: '8px 16px', fontSize: '13px', fontWeight: '700', cursor: 'pointer', transition: 'background 0.2s' }}
              onMouseOver={(e) => (e.currentTarget.style.background = '#1e293b')}
              onMouseOut={(e) => (e.currentTarget.style.background = '#0b1329')}
            >
              <Download size={15} />
              <span>Export Data</span>
            </button>
          </div>
        </div>

        {/* 4 KPI Cards Row */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px' }}>
          
          {/* Card 1: On-time delivery */}
          <div className="panel" style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '11px', fontWeight: '800', color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>On-Time Delivery</span>
              <span style={{ fontSize: '10px', fontWeight: '800', color: 'var(--green)', background: '#ecfdf5', padding: '2px 6px', borderRadius: '4px' }}>{kpis.deliveryTrend}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
              <strong style={{ fontSize: '28px', fontWeight: '800', color: 'var(--text)' }}>{kpis.delivery}</strong>
              {/* Sparkline */}
              <svg width="80" height="24" viewBox="0 0 80 24" style={{ overflow: 'visible' }}>
                <path d={kpis.deliveryPath} fill="none" stroke="#25108f" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <circle cx="80" cy="4" r="2.5" fill="#25108f" />
              </svg>
            </div>
          </div>

          {/* Card 2: Quality Rating */}
          <div className="panel" style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '11px', fontWeight: '800', color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Quality Rating</span>
              <span style={{ fontSize: '10px', fontWeight: '800', color: 'var(--green)', background: '#ecfdf5', padding: '2px 6px', borderRadius: '4px' }}>{kpis.qualityTrend}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
              <strong style={{ fontSize: '28px', fontWeight: '800', color: 'var(--text)' }}>{kpis.quality}</strong>
              {/* Sparkline */}
              <svg width="80" height="24" viewBox="0 0 80 24" style={{ overflow: 'visible' }}>
                <path d="M 0,12 L 10,12 L 20,13 L 30,12 L 40,11 L 50,12 L 60,11 L 70,10 L 80,9" fill="none" stroke="#25108f" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <circle cx="80" cy="9" r="2.5" fill="#25108f" />
              </svg>
            </div>
          </div>

          {/* Card 3: Cost Variance */}
          <div className="panel" style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '11px', fontWeight: '800', color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Cost Variance</span>
              <span style={{ fontSize: '10px', fontWeight: '800', color: 'var(--red)', background: '#fee2e2', padding: '2px 6px', borderRadius: '4px' }}>{kpis.costTrend}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
              <strong style={{ fontSize: '28px', fontWeight: '800', color: 'var(--text)' }}>{kpis.cost}</strong>
              {/* Sparkline */}
              <svg width="80" height="24" viewBox="0 0 80 24" style={{ overflow: 'visible' }}>
                <path d="M 0,4 L 10,6 L 20,8 L 30,7 L 40,10 L 50,11 L 60,13 L 70,14 L 80,16" fill="none" stroke="#25108f" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <circle cx="80" cy="16" r="2.5" fill="#25108f" />
              </svg>
            </div>
          </div>

          {/* Card 4: Supply Risk */}
          <div className="panel" style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '11px', fontWeight: '800', color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Supply Risk</span>
              <span style={{ fontSize: '10px', fontWeight: '800', color: 'var(--green)', background: '#ecfdf5', padding: '2px 6px', borderRadius: '4px' }}>{kpis.risk === 'Low' ? 'Stable' : 'Elevated'}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
              <strong style={{ fontSize: '28px', fontWeight: '800', color: 'var(--text)' }}>{kpis.risk}</strong>
              {/* Sparkline */}
              <svg width="80" height="24" viewBox="0 0 80 24" style={{ overflow: 'visible' }}>
                <path d="M 0,20 L 80,20" fill="none" stroke="#25108f" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <circle cx="80" cy="20" r="2.5" fill="#25108f" />
              </svg>
            </div>
          </div>

        </div>

        {/* Trends & Top Performers Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '20px', alignItems: 'stretch' }}>
          
          {/* Performance Trends Line Graph */}
          <div className="panel" style={{ padding: 'var(--spacing-section)', display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h2 style={{ fontSize: '16px', fontWeight: '800', color: 'var(--text)', margin: 0 }}>Performance Trends</h2>
              <div style={{ display: 'flex', gap: '16px', fontSize: '12px', fontWeight: '700', color: 'var(--muted)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <span style={{ height: '8px', width: '8px', borderRadius: '50%', background: 'var(--primary)' }} />
                  <span>Delivery</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <span style={{ height: '8px', width: '8px', borderRadius: '50%', background: '#a5b4fc' }} />
                  <span>Quality</span>
                </div>
              </div>
            </div>
            
            {/* SVG Interactive Double Line Chart */}
            <div style={{ flex: 1, minHeight: '260px', position: 'relative', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div style={{ width: '100%', height: '220px', position: 'relative' }}>
                <svg width="100%" height="100%" viewBox="0 0 500 220" preserveAspectRatio="none">
                  {/* Grid Lines */}
                  {[0, 1, 2, 3, 4].map((i) => (
                    <line key={i} x1="0" y1={44 * i + 10} x2="500" y2={44 * i + 10} stroke="#eee9f6" strokeWidth="1" strokeDasharray="3,3" />
                  ))}
                  
                  {/* Area fill for Quality (indigo light) */}
                  <path d="M 0,220 L 0,110 L 100,105 L 200,95 L 300,80 L 400,90 L 500,75 L 500,220 Z" fill="rgba(165,180,252,0.15)" />
                  {/* Area fill for Delivery (primary dark) */}
                  <path d="M 0,220 L 0,140 L 100,120 L 200,130 L 300,100 L 400,110 L 500,90 L 500,220 Z" fill="rgba(37,16,143,0.06)" />

                  {/* Delivery Curve (Dark Purple) */}
                  <path d="M 0,140 Q 50,115 100,120 T 200,130 T 300,100 T 400,110 T 500,90" fill="none" stroke="#25108f" strokeWidth="2.5" />
                  {/* Quality Curve (Light Blue) */}
                  <path d="M 0,110 Q 50,100 100,105 T 200,95 T 300,80 T 400,90 T 500,75" fill="none" stroke="#a5b4fc" strokeWidth="2.5" />

                  {/* Dots for June */}
                  <circle cx="500" cy="90" r="4" fill="#25108f" />
                  <circle cx="500" cy="75" r="4" fill="#a5b4fc" />
                </svg>
              </div>
              
              {/* X Axis Labels */}
              <div style={{ display: 'flex', justifyContent: 'space-between', paddingLeft: '8px', paddingRight: '8px', fontSize: '10px', fontWeight: '800', color: 'var(--muted)', textTransform: 'uppercase' }}>
                <span>Jan</span>
                <span>Feb</span>
                <span>Mar</span>
                <span>Apr</span>
                <span>May</span>
                <span>Jun</span>
              </div>
            </div>
          </div>

          {/* Top Performers Card */}
          <div className="panel" style={{ padding: 'var(--spacing-section)', display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <h2 style={{ fontSize: '16px', fontWeight: '800', color: 'var(--text)', margin: 0 }}>Top Performers</h2>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', flex: 1 }}>
              
              {/* Performer 1 */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px', padding: '14px', background: '#f4eff8', borderRadius: '8px' }}>
                <div style={{ height: '36px', width: '36px', background: '#0b1329', color: '#fff', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '900', fontSize: '15px' }}>
                  1
                </div>
                <div style={{ flex: 1 }}>
                  <strong style={{ display: 'block', fontSize: '13px', color: 'var(--text)' }}>Global Logistics Inc.</strong>
                  <span style={{ fontSize: '11px', color: 'var(--muted)', fontWeight: '700' }}>99.2 Rating</span>
                </div>
                <ArrowUpRight size={18} style={{ color: 'var(--green)' }} />
              </div>

              {/* Performer 2 */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px', padding: '14px', border: '1.5px solid #25108f', borderRadius: '8px' }}>
                <div style={{ height: '36px', width: '36px', background: '#f1f5f9', color: '#565365', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '900', fontSize: '15px', border: '1.5px solid #25108f' }}>
                  2
                </div>
                <div style={{ flex: 1 }}>
                  <strong style={{ display: 'block', fontSize: '13px', color: 'var(--text)' }}>Precision Parts Co.</strong>
                  <span style={{ fontSize: '11px', color: 'var(--muted)', fontWeight: '700' }}>97.8 Rating</span>
                </div>
                <Minus size={18} style={{ color: 'var(--muted)' }} />
              </div>

              {/* Performer 3 */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px', padding: '14px', border: '1.5px solid #25108f', borderRadius: '8px' }}>
                <div style={{ height: '36px', width: '36px', background: '#f1f5f9', color: '#565365', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '900', fontSize: '15px', border: '1.5px solid #25108f' }}>
                  3
                </div>
                <div style={{ flex: 1 }}>
                  <strong style={{ display: 'block', fontSize: '13px', color: 'var(--text)' }}>Apex Materials Ltd.</strong>
                  <span style={{ fontSize: '11px', color: 'var(--muted)', fontWeight: '700' }}>95.1 Rating</span>
                </div>
                <TrendingDown size={18} style={{ color: 'var(--red)' }} />
              </div>

            </div>

            <button
              onClick={() => alert('Viewing all rankings...')}
              style={{ background: 'transparent', border: 'none', color: 'var(--primary)', fontWeight: '800', fontSize: '13px', cursor: 'pointer', textAlign: 'center', outline: 'none' }}
            >
              View All Rankings
            </button>
          </div>

        </div>

        {/* Detailed Performance Audit Table */}
        <div className="panel" style={{ padding: 'var(--spacing-section)', display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h2 style={{ fontSize: '16px', fontWeight: '800', color: 'var(--text)', margin: 0 }}>Detailed Performance Audit</h2>
            <div style={{ display: 'flex', gap: '10px', position: 'relative' }}>
              <button 
                style={{ height: '34px', width: '34px', background: '#fff', border: '1.5px solid #25108f', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: 'var(--text)' }} 
                onClick={() => setActiveSlidersMenu(!activeSlidersMenu)}
              >
                <Sliders size={16} />
              </button>

              {activeSlidersMenu && (
                <>
                  <div 
                    onClick={() => setActiveSlidersMenu(false)}
                    style={{ position: 'fixed', inset: 0, zIndex: 999 }}
                  />
                  <div 
                    style={{ 
                      position: 'absolute', 
                      right: '44px', 
                      top: '0', 
                      width: '160px', 
                      background: '#ffffff', 
                      border: '1px solid #cbd5e1', 
                      borderRadius: '8px', 
                      boxShadow: '0 4px 12px rgba(0,0,0,0.1)', 
                      zIndex: 1000, 
                      padding: '6px 0',
                      textAlign: 'left'
                    }}
                  >
                    {['ALL', 'PREFERRED', 'ACTIVE', 'WATCHLIST'].map((status) => (
                      <button
                        key={status}
                        onClick={() => {
                          setAuditStatusFilter(status);
                          setAuditPage(1);
                          setActiveSlidersMenu(false);
                          addToast(`Filtered suppliers by ${status}`, 'info');
                        }}
                        style={{
                          width: '100%',
                          border: 'none',
                          background: 'transparent',
                          padding: '8px 12px',
                          fontSize: '12px',
                          color: '#1c2536',
                          fontWeight: auditStatusFilter === status ? '800' : '500',
                          textAlign: 'left',
                          cursor: 'pointer'
                        }}
                        className="hover:bg-slate-50"
                      >
                        {status}
                      </button>
                    ))}
                  </div>
                </>
              )}

              <button 
                style={{ height: '34px', width: '34px', background: '#fff', border: '1.5px solid #25108f', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: 'var(--text)' }} 
                onClick={() => {
                  const data = [
                    ["Supplier Name", "Supplier ID", "On-Time %", "Defect Rate", "Cost Index", "Status"],
                    ...filteredSuppliers.map(s => [s.name, s.id, s.onTime, s.defect, s.costIdx, s.status])
                  ];
                  const csvContent = generateCSV(data[0], data.slice(1));
                  triggerDownload(csvContent, "supplier_performance_audit.csv", "text/csv");
                  addToast("Performance audit CSV downloaded!", "success");
                }}
              >
                <Download size={16} />
              </button>
            </div>
          </div>

          <div className="table-wrap">
            <div className="table-responsive-wrapper">
<table className="partner-table" style={{ border: 'none' }}>
              <thead>
                <tr style={{ background: '#f4eff8' }}>
                  <th style={{ padding: '12px 16px', fontSize: '11px', fontWeight: '800', color: 'var(--muted)', textAlign: 'left', borderRadius: '6px 0 0 6px' }}>SUPPLIER NAME</th>
                  <th style={{ padding: '12px 16px', fontSize: '11px', fontWeight: '800', color: 'var(--muted)', textAlign: 'center' }}>ON-TIME %</th>
                  <th style={{ padding: '12px 16px', fontSize: '11px', fontWeight: '800', color: 'var(--muted)', textAlign: 'center' }}>DEFECT RATE</th>
                  <th style={{ padding: '12px 16px', fontSize: '11px', fontWeight: '800', color: 'var(--muted)', textAlign: 'center' }}>COST INDEX</th>
                  <th style={{ padding: '12px 16px', fontSize: '11px', fontWeight: '800', color: 'var(--muted)', textAlign: 'center', borderRadius: '0 6px 6px 0' }}>RATING</th>
                </tr>
              </thead>
              <tbody>
                {filteredSuppliers.map((row, idx) => (
                  <tr key={idx} style={{ borderBottom: '1px solid #eee9f6' }}>
                    <td style={{ padding: '16px', display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <div style={{ height: '32px', width: '32px', borderRadius: '6px', background: '#f4eff8', color: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '800', fontSize: '11px' }}>
                        {row.name.split(' ').map(n => n[0]).slice(0, 2).join('')}
                      </div>
                      <div>
                        <strong style={{ display: 'block', fontSize: '13px', color: 'var(--text)' }}>{row.name}</strong>
                        <span style={{ display: 'block', fontSize: '10px', color: 'var(--muted)', marginTop: '2px' }}>ID: {row.id}</span>
                      </div>
                    </td>
                    <td style={{ padding: '16px', fontSize: '13px', fontWeight: '800', textAlign: 'center', color: row.onTimeColor }}>{row.onTime}</td>
                    <td style={{ padding: '16px', fontSize: '13px', fontWeight: '700', textAlign: 'center', color: row.defectColor || 'var(--text)' }}>{row.defect}</td>
                    <td style={{ padding: '16px', fontSize: '13px', fontWeight: '700', textAlign: 'center' }}>{row.costIdx}</td>
                    <td style={{ padding: '16px', textAlign: 'center' }}>
                      <span style={{ fontSize: '9px', fontWeight: '900', letterSpacing: '0.5px', background: row.statusBg, color: row.statusColor, padding: '3px 8px', borderRadius: '4px' }}>
                        {row.status}
                      </span>
                    </td>
                  </tr>
                ))}
                {filteredSuppliers.length === 0 && (
                  <tr>
                    <td colSpan="5" style={{ padding: 'var(--spacing-page)', textAlign: 'center', color: 'var(--muted)', fontSize: '13px', fontWeight: '600' }}>
                      No suppliers match this filter criteria.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
</div>
          </div>

          {/* Table Footer */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
            <span style={{ fontSize: '12px', color: 'var(--muted)', fontWeight: '700' }}>
              Showing {(auditPage - 1) * 4 + 1}-{Math.min(auditPage * 4, 8)} of 8 suppliers (Filtered: {filteredSuppliers.length})
            </span>
            <div style={{ display: 'flex', gap: '8px' }}>
              <button 
                style={{ height: '34px', padding: '0 14px', border: '1.5px solid #25108f', background: '#fff', color: auditPage === 1 ? 'var(--muted)' : 'var(--text)', borderRadius: '6px', fontSize: '12px', fontWeight: '700', cursor: auditPage === 1 ? 'default' : 'pointer', opacity: auditPage === 1 ? 0.5 : 1 }} 
                onClick={() => { if (auditPage > 1) { setAuditPage(1); addToast('Loaded page 1', 'info'); } }}
                disabled={auditPage === 1}
              >
                Previous
              </button>
              <button 
                style={{ height: '34px', padding: '0 14px', border: '1.5px solid #25108f', background: '#fff', color: auditPage === 2 ? 'var(--muted)' : 'var(--text)', borderRadius: '6px', fontSize: '12px', fontWeight: '700', cursor: auditPage === 2 ? 'default' : 'pointer', opacity: auditPage === 2 ? 0.5 : 1 }} 
                onClick={() => { if (auditPage === 1) { setAuditPage(2); addToast('Loaded page 2', 'info'); } }}
                disabled={auditPage === 2}
              >
                Next
              </button>
            </div>
          </div>
        </div>

      </div>
      
      {/* System Status footer matching Screen 1 exactly */}
      <footer style={{ borderTop: '1.5px solid #25108f', padding: '16px 0', marginTop: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '11px', fontWeight: '800', color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
        <div>
          SYSTEM STATUS: <span style={{ color: 'var(--green)' }}>NOMINAL</span> | ALL NODES SYNCING
        </div>
        <div style={{ display: 'flex', gap: '20px' }}>
          <a href="#privacy" onClick={(e) => e.preventDefault()} style={{ color: 'var(--muted)', textDecoration: 'none' }}>Privacy Policy</a>
          <a href="#audit" onClick={(e) => e.preventDefault()} style={{ color: 'var(--muted)', textDecoration: 'none' }}>Audit Logs</a>
        </div>
      </footer>
    </AdminShell>
  );
}



