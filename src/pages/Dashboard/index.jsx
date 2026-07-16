import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { 
  Calendar, 
  Download, 
  CheckCircle2, 
  AlertCircle, 
  MoreVertical, 
  Layers, 
  Database, 
  Shield, 
  TrendingUp, 
  Cloud, 
  HelpCircle, 
  Clock, 
  ChevronDown, 
  Users, 
  Gift, 
  Store, 
  CalendarCheck,
  FileText,
  ClipboardCheck,
  ShieldCheck,
  Truck,
  Wrench,
  ChevronRight,
  Zap,
  Activity,
  X,
  MapPin,
  Plus
} from 'lucide-react';
import AdminShell from '../../components/layouts/AdminShell';
import { useApp } from '../../hooks/useApp';
import { ROUTES } from '../../config/routes';
import { downloadDummyPDF } from '../../utils/downloadHelper';
import { useDateFilter } from '../../contexts/DateFilterContext';
import DateFilter from '../../components/common/DateFilter';
import SkeletonLoader from '../../components/common/SkeletonLoader';
import EmptyState from '../../components/common/EmptyState';

// Original dashboard components and data
import KpiCard from '../../features/dashboard/KpiCard';
import QuickActions from '../../features/dashboard/QuickActions';
import PendingKyc from '../../features/dashboard/PendingKyc';
import PartnerGrowth from '../../features/dashboard/PartnerGrowth';
import RecentBookings from '../../features/dashboard/RecentBookings';

import Select from "../../components/ui/Select";

const originalKpis = [
  { title: 'Total Users', value: '128,402', trend: '+8.2%', icon: Users, positive: true },
  { title: 'Total Partners', value: '4,810', trend: '+12.4%', icon: Gift, positive: true },
  { title: 'Total Sellers', value: '1,244', trend: '-2.1%', icon: Store, positive: false },
  { title: 'Total Bookings', value: '42,911', trend: '+22.5%', icon: CalendarCheck, positive: true },
  { title: 'Revenue (MTD)', value: '$2,482,100', footer: 'progress' },
  { title: 'Wallet Balance', value: '$412,055', footer: 'Ready for settlement' },
  { title: 'Pending Approvals', value: '124', footer: 'Applications', action: 'Review All →' },
  { title: 'Open Tickets', value: '18', footer: 'High Priority', negative: true }
];

const originalBookings = [
  ['#HZ-9102', 'JD', 'John Doe', 'Deep Cleaning', 'Oct 24, 10:30 AM', '$125.00', 'Completed'],
  ['#HZ-9101', 'SM', 'Sarah Miller', 'AC Maintenance', 'Oct 24, 11:15 AM', '$85.00', 'In Progress'],
  ['#HZ-9099', 'RK', 'Robert King', 'Plumbing Repair', 'Oct 24, 01:45 PM', '$210.00', 'Scheduled']
];

const workOrders = [
  { id: '#HZ-940121', type: 'Infrastructure Deployment', client: 'Aether Systems Corp', date: 'Oct 24, 2023', status: 'PENDING', value: '$12,450' },
  { id: '#HZ-940122', type: 'Cloud Optimization', client: 'Nexus Global', date: 'Oct 23, 2023', status: 'VERIFIED', value: '$4,200' },
  { id: '#HZ-940125', type: 'Security Audit v2.0', client: 'OmniRetail Group', date: 'Oct 23, 2023', status: 'VERIFIED', value: '$8,900' },
  { id: '#HZ-940128', type: 'Disaster Recovery', client: 'Vanguard Logistics', date: 'Oct 22, 2023', status: 'SUSPENDED', value: '$15,000' }
];

const recentServices = [
  { name: 'Managed Kubernetes', time: '2 mins ago', category: 'Infrastructure', icon: Database, color: '#eff6ff', iconColor: '#3b82f6' },
  { name: 'Zero-Trust Network', time: '15 mins ago', category: 'Security', icon: Shield, color: '#f0fdf4', iconColor: '#22c55e' },
  { name: 'Edge Analytics API', time: '42 mins ago', category: 'Development', icon: TrendingUp, color: '#faf5ff', iconColor: '#a855f7' },
  { name: 'Cloud Vault Storage', time: '1 hour ago', category: 'Storage', icon: Cloud, color: '#f0f9ff', iconColor: '#0ea5e9' }
];

export default function Dashboard() {
  const { navigate } = useApp();
  const [dashboardView, setDashboardView] = useState('global'); // 'global' | 'system' | 'procurement'
  const [chartMode, setChartMode] = useState('Volume');
  const [showToast, setShowToast] = useState(true);
  const { preset, dateRange, isFiltering, hasData } = useDateFilter();
  const [trendView, setTrendView] = useState('Monthly');
  const [openMenuId, setOpenMenuId] = useState(null);

  const getMultiplier = () => {
    if (preset === 'Custom' && dateRange?.startDate && dateRange?.endDate) {
      const diffTime = Math.abs(dateRange.endDate - dateRange.startDate);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) || 1;
      return diffDays / 30;
    }
    switch(preset) {
      case 'Today': return 0.03;
      case 'Last 7 Days': return 0.23;
      case 'Last 30 Days': return 1;
      case 'This Month': return 0.8;
      case 'Current Year': return 8;
      default: return 1;
    }
  };
  const m = getMultiplier();
  const applyMultiplier = (valStr) => {
    if (!valStr || !valStr.replace) return valStr;
    const num = parseFloat(valStr.replace(/[^0-9.]/g, ''));
    if (isNaN(num)) return valStr;
    const newNum = Math.floor(num * m);
    if (valStr.includes('$')) return '$' + newNum.toLocaleString();
    return newNum.toLocaleString();
  };

  // Close dropdown on outside click
  useEffect(() => {
    const handleClick = () => setOpenMenuId(null);
    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, []);

  // Trigger toast hide automatically after 10s if not manual
  useEffect(() => {
    if (dashboardView === 'procurement') {
      const timer = setTimeout(() => {
        setShowToast(false);
      }, 10000);
      return () => clearTimeout(timer);
    }
  }, [dashboardView]);

  const handleCreateRequest = () => {
    navigate(ROUTES.materialCreate);
  };

  const handleViewAll = () => {
    navigate(ROUTES.materialRequests);
  };

  const handleGoToApprovals = () => {
    navigate(ROUTES.materialApprovals);
  };

  const handleRequestClick = (reqId) => {
    navigate(ROUTES.materialDetails);
  };

  // Header tabs specific to Procurement Overview (Screen 1 style)
  const headerTabs = dashboardView === 'procurement' ? (
    <div style={{ display: 'flex', gap: 'var(--spacing-section)', alignItems: 'center', height: '100%' }}>
      <button 
        style={{ 
          background: 'none', 
          border: 'none', 
          color: 'var(--primary)', 
          fontWeight: '700', 
          fontSize: '14px', 
          borderBottom: '2.5px solid #25108f', 
          padding: '16px 2px 10px 2px', 
          cursor: 'pointer' 
        }}
        onClick={() => setDashboardView('procurement')}
      >
        Analytics
      </button>
      <button 
        style={{ 
          background: 'none', 
          border: 'none', 
          color: '#565365', 
          fontWeight: '500', 
          fontSize: '14px', 
          padding: '16px 2px 10px 2px', 
          cursor: 'pointer' 
        }}
        onClick={handleViewAll}
      >
        Suppliers
      </button>
      <button 
        style={{ 
          background: 'none', 
          border: 'none', 
          color: '#565365', 
          fontWeight: '500', 
          fontSize: '14px', 
          padding: '16px 2px 10px 2px', 
          cursor: 'pointer' 
        }}
        onClick={handleGoToApprovals}
      >
        Reports
      </button>
    </div>
  ) : null;

  const renderDashboardContent = () => {
    if (isFiltering) {
      return (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 'var(--spacing-section)' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px' }}>
            <SkeletonLoader height="130px" />
            <SkeletonLoader height="130px" />
            <SkeletonLoader height="130px" />
            <SkeletonLoader height="130px" />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 'var(--spacing-section)' }}>
            <SkeletonLoader height="500px" />
            <SkeletonLoader height="500px" />
          </div>
        </div>
      );
    }

    if (!hasData) {
      return <EmptyState />;
    }

    if (dashboardView === 'system') {
      return (
        <>
          <section className="kpi-grid">
            {originalKpis.map((kpi) => {
              let handler = undefined;
              if (kpi.title === 'Pending Approvals') {
                handler = () => navigate(ROUTES.approvalQueue);
              }
              return (
                <KpiCard
                  key={kpi.title}
                  {...kpi}
                  value={applyMultiplier(kpi.value)}
                  onActionClick={handler}
                />
              );
            })}
          </section>
          <section className="dash-columns">
            <div className="dash-left">
              <div className="panel trends-panel">
                <div className="panel-head">
                  <div>
                    <h2>Revenue & Booking Trends</h2>
                    <p>{preset} performance metrics</p>
                  </div>
                  <div className="segmented">
                    <button className={trendView === 'Monthly' ? "active" : ""} onClick={() => setTrendView('Monthly')} type="button">Monthly</button>
                    <button className={trendView === 'Weekly' ? "active" : ""} onClick={() => setTrendView('Weekly')} type="button">Weekly</button>
                  </div>
                </div>
                <div className="bar-chart">
                  {(trendView === 'Monthly' ? [45, 30, 54, 40, 68, 73, 49, 35, 59, 34, 64, 82] : [80, 60, 40, 90]).map((height, index) => (
                    <span key={index} style={{ height: `${Math.min(height * (m < 1 ? 1 : m > 1 ? 1 : 1), 100)}%` }} className={index % 6 === 5 ? 'deep' : index % 2 ? 'mid' : 'light'} />
                  ))}
                </div>
                <div className="weeks">
                  {trendView === 'Monthly' ? (
                    <>
                      <span>Q1</span>
                      <span>Q2</span>
                      <span>Q3</span>
                      <span>Q4</span>
                    </>
                  ) : (
                    <>
                      <span>Week 1</span>
                      <span>Week 2</span>
                      <span>Week 3</span>
                      <span>Week 4</span>
                    </>
                  )}
                </div>
              </div>
              <RecentBookings bookings={originalBookings} onViewAll={() => navigate(ROUTES.bookings)} />
            </div>
            <aside className="dash-right">
              <QuickActions />
              <PendingKyc />
              <PartnerGrowth />
            </aside>
          </section>
        </>
      );
    }

    if (dashboardView === 'global') {
      return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-section)' }}>
          
          {/* Dashboard KPI Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: '12px' }}>
            {/* KPI 1: Total Users */}
            <div 
              className="panel" 
              onClick={() => navigate(ROUTES.users)}
              onMouseOver={(e) => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 4px 12px rgba(37,16,143,0.1)'; }}
              onMouseOut={(e) => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = 'none'; }}
              style={{ background: '#ffffff', borderRadius: '12px', border: '1.5px solid #25108f', padding: '14px', display: 'flex', flexDirection: 'column', gap: '8px', position: 'relative', cursor: 'pointer', transition: 'all 0.2s ease' }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '28px', height: '28px', borderRadius: '6px', background: '#eff6ff', color: '#2563eb' }}>
                  <Users size={16} />
                </div>
                <span style={{ fontSize: '10px', fontWeight: '800', color: '#16a34a', background: '#dcfce7', padding: '2px 6px', borderRadius: '12px', display: 'flex', alignItems: 'center', gap: '2px' }}>
                  ↑ 8.2%
                </span>
              </div>
              <div>
                <span style={{ display: 'block', fontSize: '9px', fontWeight: '800', color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Total Users</span>
                <strong style={{ display: 'block', fontSize: '20px', color: 'var(--text)', marginTop: '2px', fontWeight: '800' }}>{applyMultiplier('128,402')}</strong>
              </div>
              <div style={{ height: '3px', background: '#f1f5f9', borderRadius: '2px', overflow: 'hidden', marginTop: '2px' }}>
                <div style={{ width: '75%', height: '100%', background: '#2563eb' }} />
              </div>
            </div>

            {/* KPI 2: Total Partners */}
            <div 
              className="panel" 
              onClick={() => navigate(ROUTES.partners)}
              onMouseOver={(e) => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 4px 12px rgba(37,16,143,0.1)'; }}
              onMouseOut={(e) => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = 'none'; }}
              style={{ background: '#ffffff', borderRadius: '12px', border: '1.5px solid #25108f', padding: '14px', display: 'flex', flexDirection: 'column', gap: '8px', position: 'relative', cursor: 'pointer', transition: 'all 0.2s ease' }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '28px', height: '28px', borderRadius: '6px', background: '#ecfdf5', color: '#059669' }}>
                  <Store size={16} />
                </div>
                <span style={{ fontSize: '10px', fontWeight: '800', color: '#16a34a', background: '#dcfce7', padding: '2px 6px', borderRadius: '12px', display: 'flex', alignItems: 'center', gap: '2px' }}>
                  ↑ 12.4%
                </span>
              </div>
              <div>
                <span style={{ display: 'block', fontSize: '9px', fontWeight: '800', color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Total Partners</span>
                <strong style={{ display: 'block', fontSize: '20px', color: 'var(--text)', marginTop: '2px', fontWeight: '800' }}>{applyMultiplier('4,810')}</strong>
              </div>
              <div style={{ height: '3px', background: '#f1f5f9', borderRadius: '2px', overflow: 'hidden', marginTop: '2px' }}>
                <div style={{ width: '65%', height: '100%', background: '#059669' }} />
              </div>
            </div>

            {/* KPI 3: Bookings */}
            <div 
              className="panel" 
              onClick={() => navigate(ROUTES.bookings)}
              onMouseOver={(e) => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 4px 12px rgba(37,16,143,0.1)'; }}
              onMouseOut={(e) => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = 'none'; }}
              style={{ background: '#ffffff', borderRadius: '12px', border: '1.5px solid #25108f', padding: '14px', display: 'flex', flexDirection: 'column', gap: '8px', position: 'relative', cursor: 'pointer', transition: 'all 0.2s ease' }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '28px', height: '28px', borderRadius: '6px', background: '#fffbeb', color: '#d97706' }}>
                  <CalendarCheck size={16} />
                </div>
                <span style={{ fontSize: '10px', fontWeight: '800', color: '#16a34a', background: '#dcfce7', padding: '2px 6px', borderRadius: '12px', display: 'flex', alignItems: 'center', gap: '2px' }}>
                  ↑ 22.5%
                </span>
              </div>
              <div>
                <span style={{ display: 'block', fontSize: '9px', fontWeight: '800', color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Bookings</span>
                <strong style={{ display: 'block', fontSize: '20px', color: 'var(--text)', marginTop: '2px', fontWeight: '800' }}>{applyMultiplier('42,911')}</strong>
              </div>
              <div style={{ height: '3px', background: '#f1f5f9', borderRadius: '2px', overflow: 'hidden', marginTop: '2px' }}>
                <div style={{ width: '85%', height: '100%', background: '#d97706' }} />
              </div>
            </div>

            {/* KPI 4: Referrals */}
            <div 
              className="panel" 
              onClick={() => navigate(ROUTES.reportsReferral || ROUTES.users)}
              onMouseOver={(e) => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 4px 12px rgba(37,16,143,0.1)'; }}
              onMouseOut={(e) => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = 'none'; }}
              style={{ background: '#ffffff', borderRadius: '12px', border: '1.5px solid #25108f', padding: '14px', display: 'flex', flexDirection: 'column', gap: '8px', position: 'relative', cursor: 'pointer', transition: 'all 0.2s ease' }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '28px', height: '28px', borderRadius: '6px', background: '#faf5ff', color: '#9333ea' }}>
                  <Activity size={16} />
                </div>
                <span style={{ fontSize: '10px', fontWeight: '800', color: '#9333ea', background: '#f3e8ff', padding: '2px 6px', borderRadius: '12px', display: 'flex', alignItems: 'center', gap: '2px' }}>
                  — Steady
                </span>
              </div>
              <div>
                <span style={{ display: 'block', fontSize: '9px', fontWeight: '800', color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Referrals</span>
                <strong style={{ display: 'block', fontSize: '20px', color: 'var(--text)', marginTop: '2px', fontWeight: '800' }}>{applyMultiplier('8,204')}</strong>
              </div>
              <div style={{ height: '3px', background: '#f1f5f9', borderRadius: '2px', overflow: 'hidden', marginTop: '2px' }}>
                <div style={{ width: '45%', height: '100%', background: '#9333ea' }} />
              </div>
            </div>

            {/* KPI 5: Total Earnings */}
            <div 
              className="panel" 
              onClick={() => navigate(ROUTES.reportsRevenue || ROUTES.bookings)}
              onMouseOver={(e) => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 4px 12px rgba(37,16,143,0.1)'; }}
              onMouseOut={(e) => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = 'none'; }}
              style={{ background: '#ffffff', borderRadius: '12px', border: '1.5px solid #25108f', padding: '14px', display: 'flex', flexDirection: 'column', gap: '8px', position: 'relative', cursor: 'pointer', transition: 'all 0.2s ease' }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '28px', height: '28px', borderRadius: '6px', background: '#ecfdf5', color: '#059669' }}>
                  <TrendingUp size={16} />
                </div>
                <span style={{ fontSize: '10px', fontWeight: '800', color: '#16a34a', background: '#dcfce7', padding: '2px 6px', borderRadius: '12px', display: 'flex', alignItems: 'center', gap: '2px' }}>
                  ↑ 15.3%
                </span>
              </div>
              <div>
                <span style={{ display: 'block', fontSize: '9px', fontWeight: '800', color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Earnings</span>
                <strong style={{ display: 'block', fontSize: '20px', color: 'var(--text)', marginTop: '2px', fontWeight: '800' }}>{applyMultiplier('$2.48M')}</strong>
              </div>
              <div style={{ height: '3px', background: '#f1f5f9', borderRadius: '2px', overflow: 'hidden', marginTop: '2px' }}>
                <div style={{ width: '90%', height: '100%', background: '#059669' }} />
              </div>
            </div>

            {/* KPI 6: Quotations */}
            <div 
              className="panel" 
              onClick={() => navigate(ROUTES.orderManagement || ROUTES.bookings)}
              onMouseOver={(e) => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 4px 12px rgba(37,16,143,0.1)'; }}
              onMouseOut={(e) => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = 'none'; }}
              style={{ background: '#ffffff', borderRadius: '12px', border: '1.5px solid #25108f', padding: '14px', display: 'flex', flexDirection: 'column', gap: '8px', position: 'relative', cursor: 'pointer', transition: 'all 0.2s ease' }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '28px', height: '28px', borderRadius: '6px', background: '#eef2ff', color: '#4f46e5' }}>
                  <FileText size={16} />
                </div>
                <span style={{ fontSize: '10px', fontWeight: '800', color: '#4f46e5', background: '#e0e7ff', padding: '2px 6px', borderRadius: '12px', display: 'flex', alignItems: 'center', gap: '2px' }}>
                  ↑ 4.1%
                </span>
              </div>
              <div>
                <span style={{ display: 'block', fontSize: '9px', fontWeight: '800', color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Quotations</span>
                <strong style={{ display: 'block', fontSize: '20px', color: 'var(--text)', marginTop: '2px', fontWeight: '800' }}>{applyMultiplier('1,245')}</strong>
              </div>
              <div style={{ height: '3px', background: '#f1f5f9', borderRadius: '2px', overflow: 'hidden', marginTop: '2px' }}>
                <div style={{ width: '55%', height: '100%', background: '#4f46e5' }} />
              </div>
            </div>
          </div>

          {/* Dashboard Content Row */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr', lgGridTemplateColumns: '2fr 1fr', gap: 'var(--spacing-section)' }}>
            {/* Left Column (Chart & Table) */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-section)', flex: 2 }}>
              <div className="panel" style={{ background: '#ffffff', border: '1.5px solid #25108f', borderRadius: '12px', padding: 'var(--spacing-section)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                  <div>
                    <h2 style={{ fontSize: '18px', fontWeight: '800', color: 'var(--text)', margin: 0 }}>Revenue & Booking Dynamics</h2>
                    <p style={{ fontSize: '12px', color: 'var(--muted)', marginTop: '2px', margin: 0 }}>Correlation between total fulfillment and gross revenue</p>
                  </div>
                  <div style={{ display: 'flex', background: '#f1f5f9', padding: '4px', borderRadius: '6px' }}>
                    <button
                      onClick={() => setChartMode('Volume')}
                      style={{
                        border: 'none',
                        background: chartMode === 'Volume' ? '#ffffff' : 'transparent',
                        color: chartMode === 'Volume' ? 'var(--text)' : 'var(--muted)',
                        padding: '6px 16px',
                        borderRadius: '4px',
                        fontSize: '12px',
                        fontWeight: '700',
                        boxShadow: chartMode === 'Volume' ? '0 1px 3px rgba(0,0,0,0.1)' : 'none'
                      }}
                      type="button"
                    >
                      Volume
                    </button>
                    <button
                      onClick={() => setChartMode('Monetary')}
                      style={{
                        border: 'none',
                        background: chartMode === 'Monetary' ? '#ffffff' : 'transparent',
                        color: chartMode === 'Monetary' ? 'var(--text)' : 'var(--muted)',
                        padding: '6px 16px',
                        borderRadius: '4px',
                        fontSize: '12px',
                        fontWeight: '700',
                        boxShadow: chartMode === 'Monetary' ? '0 1px 3px rgba(0,0,0,0.1)' : 'none'
                      }}
                      type="button"
                    >
                      Monetary
                    </button>
                  </div>
                </div>

                {/* Stacked Chart mock layout */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', height: '200px', borderBottom: '1px dashed var(--line)', paddingBottom: '8px', position: 'relative' }}>
                    <div style={{ position: 'absolute', left: 0, right: 0, top: '25%', borderTop: '1px dashed rgba(0,0,0,0.05)' }} />
                    <div style={{ position: 'absolute', left: 0, right: 0, top: '50%', borderTop: '1px dashed rgba(0,0,0,0.05)' }} />
                    <div style={{ position: 'absolute', left: 0, right: 0, top: '75%', borderTop: '1px dashed rgba(0,0,0,0.05)' }} />

                    {(chartMode === 'Volume' ? [
                      { day: 'MON', height1: 65, height2: 15 },
                      { day: 'TUE', height1: 85, height2: 30 },
                      { day: 'WED', height1: 95, height2: 45 },
                      { day: 'THU', height1: 75, height2: 25 },
                      { day: 'FRI', height1: 110, height2: 60 },
                      { day: 'SAT', height1: 90, height2: 40 },
                      { day: 'SUN', height1: 105, height2: 55 }
                    ] : [
                      { day: 'MON', height1: 45, height2: 25 },
                      { day: 'TUE', height1: 65, height2: 40 },
                      { day: 'WED', height1: 105, height2: 65 },
                      { day: 'THU', height1: 55, height2: 15 },
                      { day: 'FRI', height1: 120, height2: 80 },
                      { day: 'SAT', height1: 110, height2: 70 },
                      { day: 'SUN', height1: 95, height2: 45 }
                    ]).map((col, idx) => (
                      <div key={idx} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '12%', gap: '8px', zIndex: 1 }}>
                        <div style={{ width: '100%', height: '140px', display: 'flex', flexDirection: 'column-reverse', background: '#eff6ff', borderRadius: '4px', overflow: 'hidden' }}>
                          <div style={{ height: `${col.height1}%`, background: '#818cf8', display: 'flex', flexDirection: 'column-reverse' }}>
                            <div style={{ height: `${(col.height2 / col.height1) * 100}%`, background: '#4f46e5' }} />
                          </div>
                        </div>
                        <span style={{ fontSize: '10px', fontWeight: '800', color: 'var(--muted)' }}>{col.day}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* High-Priority Work Orders Table */}
              <div className="panel" style={{ background: '#ffffff', border: '1.5px solid #25108f', borderRadius: '12px', padding: 'var(--spacing-section)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                  <h2 style={{ fontSize: '16px', fontWeight: '800', color: 'var(--text)', margin: 0 }}>High-Priority Work Orders</h2>
                  <button onClick={() => navigate(ROUTES.bookings)} style={{ border: 'none', background: 'transparent', color: '#4f46e5', fontSize: '12px', fontWeight: '800', cursor: 'pointer' }} type="button">
                    View All
                  </button>
                </div>

                <div style={{ overflowX: 'auto' }}>
                  <div className="table-responsive-wrapper">
<table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                    <thead>
                      <tr style={{ borderBottom: '1.5px solid #25108f' }}>
                        <th style={{ padding: '12px 8px', fontSize: '11px', fontWeight: '800', color: 'var(--muted)', textTransform: 'uppercase' }}>ID</th>
                        <th style={{ padding: '12px 8px', fontSize: '11px', fontWeight: '800', color: 'var(--muted)', textTransform: 'uppercase' }}>Service Type</th>
                        <th style={{ padding: '12px 8px', fontSize: '11px', fontWeight: '800', color: 'var(--muted)', textTransform: 'uppercase' }}>Client Name</th>
                        <th style={{ padding: '12px 8px', fontSize: '11px', fontWeight: '800', color: 'var(--muted)', textTransform: 'uppercase' }}>Execution Date</th>
                        <th style={{ padding: '12px 8px', fontSize: '11px', fontWeight: '800', color: 'var(--muted)', textTransform: 'uppercase' }}>Status</th>
                        <th style={{ padding: '12px 8px', fontSize: '11px', fontWeight: '800', color: 'var(--muted)', textTransform: 'uppercase' }}>Value</th>
                        <th style={{ padding: '12px 8px', width: '40px' }} />
                      </tr>
                    </thead>
                    <tbody>
                      {workOrders.map((order) => (
                        <tr key={order.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                          <td style={{ padding: '14px 8px', fontSize: '13px', fontWeight: '700', color: 'var(--text)' }}>{order.id}</td>
                          <td style={{ padding: '14px 8px', fontSize: '13px', color: 'var(--text)' }}>{order.type}</td>
                          <td style={{ padding: '14px 8px', fontSize: '13px', color: 'var(--muted)' }}>{order.client}</td>
                          <td style={{ padding: '14px 8px', fontSize: '13px', color: 'var(--muted)' }}>{order.date}</td>
                          <td style={{ padding: '14px 8px' }}>
                            <span
                              style={{
                                fontSize: '10px',
                                fontWeight: '800',
                                padding: '4px 8px',
                                borderRadius: '4px',
                                background:
                                  order.status === 'VERIFIED'
                                    ? '#ecfdf5'
                                    : order.status === 'PENDING'
                                    ? '#fffbeb'
                                    : '#fef2f2',
                                color:
                                  order.status === 'VERIFIED'
                                    ? '#059669'
                                    : order.status === 'PENDING'
                                    ? '#d97706'
                                    : '#dc2626'
                              }}
                            >
                              {order.status}
                            </span>
                          </td>
                          <td style={{ padding: '14px 8px', fontSize: '13px', fontWeight: '700', color: 'var(--text)' }}>{order.value}</td>
                          <td style={{ padding: '14px 8px', textAlign: 'center', position: 'relative' }}>
                            <button 
                              onClick={(e) => { 
                                e.preventDefault(); 
                                e.stopPropagation();
                                setOpenMenuId(openMenuId === order.id ? null : order.id); 
                              }} 
                              style={{ border: 'none', background: 'transparent', color: 'var(--muted)', cursor: 'pointer', padding: '4px' }} 
                              type="button"
                            >
                              <MoreVertical size={16} />
                            </button>
                            
                            {/* Dropdown Menu */}
                            {openMenuId === order.id && (
                              <div style={{
                                position: 'absolute',
                                right: '100%',
                                top: '50%',
                                transform: 'translateY(-50%)',
                                background: '#fff',
                                border: '1px solid #e2e8f0',
                                borderRadius: '8px',
                                boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                                zIndex: 10,
                                minWidth: '140px',
                                display: 'flex',
                                flexDirection: 'column',
                                padding: '4px',
                                textAlign: 'left'
                              }}>
                                <button
                                  onClick={(e) => { e.stopPropagation(); setOpenMenuId(null); toast.success(`Viewing details for ${order.id}`); }}
                                  style={{ padding: '8px 12px', background: 'transparent', border: 'none', textAlign: 'left', fontSize: '13px', cursor: 'pointer', borderRadius: '4px' }}
                                  onMouseEnter={(e) => e.target.style.background = '#f8fafc'}
                                  onMouseLeave={(e) => e.target.style.background = 'transparent'}
                                >
                                  View Details
                                </button>
                                <button
                                  onClick={(e) => { e.stopPropagation(); setOpenMenuId(null); toast.success(`${order.id} marked as completed`); }}
                                  style={{ padding: '8px 12px', background: 'transparent', border: 'none', textAlign: 'left', fontSize: '13px', cursor: 'pointer', borderRadius: '4px' }}
                                  onMouseEnter={(e) => e.target.style.background = '#f8fafc'}
                                  onMouseLeave={(e) => e.target.style.background = 'transparent'}
                                >
                                  Mark Complete
                                </button>
                                <button
                                  onClick={(e) => { e.stopPropagation(); setOpenMenuId(null); toast.error(`${order.id} deleted`); }}
                                  style={{ padding: '8px 12px', background: 'transparent', border: 'none', textAlign: 'left', fontSize: '13px', cursor: 'pointer', color: '#ef4444', borderRadius: '4px' }}
                                  onMouseEnter={(e) => e.target.style.background = '#fef2f2'}
                                  onMouseLeave={(e) => e.target.style.background = 'transparent'}
                                >
                                  Delete Order
                                </button>
                              </div>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
</div>
                </div>
              </div>
            </div>

            {/* Right Column (Sidebar Panels) */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-section)', flex: 1 }}>
              
              {/* System Health */}
              <div className="panel" style={{ background: '#0b1329', color: '#ffffff', borderRadius: '12px', padding: 'var(--spacing-section)' }}>
                <h3 style={{ fontSize: '16px', fontWeight: '800', margin: 0 }}>System Health</h3>
                <p style={{ fontSize: '12px', color: 'rgba(255, 255, 255, 0.6)', marginTop: '4px', margin: 0 }}>All systems operational across 12 regions.</p>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginTop: '24px' }}>
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', marginBottom: '6px' }}>
                      <span style={{ color: 'rgba(255, 255, 255, 0.7)' }}>Server Load</span>
                      <strong style={{ fontWeight: '700' }}>42%</strong>
                    </div>
                    <div style={{ height: '4px', background: 'rgba(255, 255, 255, 0.1)', borderRadius: '2px', overflow: 'hidden' }}>
                      <div style={{ width: '42%', height: '100%', background: '#4f46e5' }} />
                    </div>
                  </div>

                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', marginBottom: '6px' }}>
                      <span style={{ color: 'rgba(255, 255, 255, 0.7)' }}>Memory Usage</span>
                      <strong style={{ fontWeight: '700' }}>68%</strong>
                    </div>
                    <div style={{ height: '4px', background: 'rgba(255, 255, 255, 0.1)', borderRadius: '2px', overflow: 'hidden' }}>
                      <div style={{ width: '68%', height: '100%', background: '#4f46e5' }} />
                    </div>
                  </div>
                </div>
              </div>

              {/* Recently Added Services */}
              <div className="panel" style={{ background: '#ffffff', border: '1.5px solid #25108f', borderRadius: '12px', padding: 'var(--spacing-section)' }}>
                <h3 style={{ fontSize: '14px', fontWeight: '800', color: 'var(--text)', margin: 0, borderBottom: '1px solid #f1f5f9', paddingBottom: '12px' }}>
                  Recently Added Services
                </h3>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginTop: '16px' }}>
                  {recentServices.map((service, index) => {
                    const IconComponent = service.icon;
                    return (
                      <div key={index} style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '36px', height: '36px', borderRadius: '8px', background: service.color, color: service.iconColor }}>
                          <IconComponent size={18} />
                        </div>
                        <div style={{ flex: 1 }}>
                          <strong style={{ display: 'block', fontSize: '13px', color: 'var(--text)' }}>{service.name}</strong>
                          <span style={{ display: 'block', fontSize: '11px', color: 'var(--muted)', marginTop: '2px' }}>
                            {service.time} • {service.category}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div style={{ borderTop: '1px solid #f1f5f9', marginTop: '16px', paddingTop: '12px', textAlign: 'center' }}>
                  <a
                    href="#catalog"
                    onClick={(e) => { e.preventDefault(); navigate(ROUTES.services); }}
                    style={{ fontSize: '12px', color: '#4f46e5', fontWeight: '800', textDecoration: 'none' }}
                  >
                    Browse Entire Catalog
                  </a>
                </div>
              </div>

              {/* Support/Assistance Card */}
              <div className="panel" style={{ background: '#eff6ff', border: '1px solid #dbeafe', borderRadius: '12px', padding: 'var(--spacing-section)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '14px', textAlign: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '44px', height: '44px', borderRadius: '50%', background: '#dbeafe', color: '#1e40af' }}>
                  <HelpCircle size={24} />
                </div>
                <div>
                  <strong style={{ display: 'block', fontSize: '14px', color: '#1e3a8a' }}>Need Assistance?</strong>
                  <p style={{ fontSize: '11px', color: '#1e40af', marginTop: '4px', margin: 0, lineHeight: '1.4' }}>
                    Direct access to your dedicated Executive Support Manager.
                  </p>
                </div>
                <button
                  onClick={() => navigate(ROUTES.support)}
                  style={{
                    width: '100%',
                    height: '38px',
                    background: '#ffffff',
                    color: '#1e3a8a',
                    border: '1px solid #bfdbfe',
                    borderRadius: '6px',
                    fontSize: '12px',
                    fontWeight: '700',
                    cursor: 'pointer',
                    boxShadow: '0 1px 2px rgba(0,0,0,0.05)'
                  }}
                  type="button"
                >
                  Contact Support
                </button>
              </div>

            </div>
          </div>
        </div>
      );
    }

    // Procurement View (Screen 1)
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-section)', position: 'relative' }}>
        {/* 4 Stats Cards Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px' }}>
          {/* Card 1: TOTAL REQUESTS */}
          <div 
            onClick={handleViewAll}
            className="panel" 
            style={{ 
              background: '#ffffff', 
              borderRadius: '12px', 
              border: '1.5px solid #25108f', 
              padding: '20px', 
              display: 'flex', 
              flexDirection: 'column', 
              gap: '12px', 
              position: 'relative',
              cursor: 'pointer',
              transition: 'transform 0.18s ease, box-shadow 0.18s ease'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 8px 20px rgba(37,16,143,0.06)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = 'none';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <span style={{ fontSize: '11px', fontWeight: '800', color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                TOTAL REQUESTS
              </span>
              <span style={{ color: 'var(--primary)' }}>
                <FileText size={20} />
              </span>
            </div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
              <strong style={{ fontSize: '28px', color: 'var(--text)', fontWeight: '800' }}>1,284</strong>
              <span style={{ fontSize: '11px', fontWeight: '800', color: 'var(--green)' }}>
                +12%
              </span>
            </div>
            <div style={{ height: '4px', background: '#f1f5f9', borderRadius: '2px', overflow: 'hidden', marginTop: '4px' }}>
              <div style={{ width: '45%', height: '100%', background: 'var(--primary)' }} />
            </div>
          </div>

          {/* Card 2: PENDING APPROVALS */}
          <div 
            onClick={handleGoToApprovals}
            className="panel" 
            style={{ 
              background: '#ffffff', 
              borderRadius: '12px', 
              border: '1.5px solid #25108f', 
              padding: '20px', 
              display: 'flex', 
              flexDirection: 'column', 
              gap: '12px', 
              position: 'relative',
              cursor: 'pointer',
              transition: 'transform 0.18s ease, box-shadow 0.18s ease'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 8px 20px rgba(37,16,143,0.06)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = 'none';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <span style={{ fontSize: '11px', fontWeight: '800', color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                PENDING APPROVALS
              </span>
              <span style={{ color: '#f59e0b' }}>
                <ClipboardCheck size={20} />
              </span>
            </div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
              <strong style={{ fontSize: '28px', color: 'var(--text)', fontWeight: '800' }}>42</strong>
              <span style={{ fontSize: '11px', fontWeight: '800', color: '#d97706', background: '#fffbeb', padding: '3px 8px', borderRadius: '4px' }}>
                Action Required
              </span>
            </div>
            <div style={{ height: '4px', background: '#f1f5f9', borderRadius: '2px', overflow: 'hidden', marginTop: '4px' }}>
              <div style={{ width: '30%', height: '100%', background: '#f59e0b' }} />
            </div>
          </div>

          {/* Card 3: APPROVED REQUESTS */}
          <div 
            onClick={handleViewAll}
            className="panel" 
            style={{ 
              background: '#ffffff', 
              borderRadius: '12px', 
              border: '1.5px solid #25108f', 
              padding: '20px', 
              display: 'flex', 
              flexDirection: 'column', 
              gap: '12px', 
              position: 'relative',
              cursor: 'pointer',
              transition: 'transform 0.18s ease, box-shadow 0.18s ease'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 8px 20px rgba(37,16,143,0.06)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = 'none';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <span style={{ fontSize: '11px', fontWeight: '800', color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                APPROVED REQUESTS
              </span>
              <span style={{ color: '#10b981' }}>
                <ShieldCheck size={20} />
              </span>
            </div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
              <strong style={{ fontSize: '28px', color: 'var(--text)', fontWeight: '800' }}>918</strong>
              <span style={{ fontSize: '11px', fontWeight: '800', color: '#059669', background: '#ecfdf5', padding: '3px 8px', borderRadius: '4px' }}>
                89% Yield
              </span>
            </div>
            <div style={{ height: '4px', background: '#f1f5f9', borderRadius: '2px', overflow: 'hidden', marginTop: '4px' }}>
              <div style={{ width: '70%', height: '100%', background: '#10b981' }} />
            </div>
          </div>

          {/* Card 4: DELIVERED MATERIALS */}
          <div 
            onClick={handleViewAll}
            className="panel" 
            style={{ 
              background: '#ffffff', 
              borderRadius: '12px', 
              border: '1.5px solid #25108f', 
              padding: '20px', 
              display: 'flex', 
              flexDirection: 'column', 
              gap: '12px', 
              position: 'relative',
              cursor: 'pointer',
              transition: 'transform 0.18s ease, box-shadow 0.18s ease'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 8px 20px rgba(37,16,143,0.06)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = 'none';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <span style={{ fontSize: '11px', fontWeight: '800', color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                DELIVERED MATERIALS
              </span>
              <span style={{ color: '#111827' }}>
                <Truck size={20} />
              </span>
            </div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
              <strong style={{ fontSize: '28px', color: 'var(--text)', fontWeight: '800' }}>842</strong>
              <span style={{ fontSize: '11px', fontWeight: '800', color: '#111827', background: '#f3f4f6', padding: '3px 8px', borderRadius: '4px' }}>
                On Track
              </span>
            </div>
            <div style={{ height: '4px', background: '#f1f5f9', borderRadius: '2px', overflow: 'hidden', marginTop: '4px' }}>
              <div style={{ width: '85%', height: '100%', background: '#111827' }} />
            </div>
          </div>
        </div>
        {/* Main Content Layout Block: Left Column & Right Sidebar */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr', lgGridTemplateColumns: '2fr 1fr', gap: 'var(--spacing-section)' }}>
          {/* Left Column */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-section)' }}>
            <div className="panel" style={{ background: '#ffffff', border: '1.5px solid #25108f', borderRadius: '12px', padding: 'var(--spacing-section)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                <h2 style={{ fontSize: '16px', fontWeight: '800', color: 'var(--text)', margin: 0 }}>
                  Material Cost Trend (Quarterly)
                </h2>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', border: '1.5px solid #25108f', padding: '6px 12px', borderRadius: '6px', background: '#fcfaff' }}>
                  <Select
                    value={preset === 'Current Year' ? 'Current Year' : 'Last Quarter'}
                    onChange={(e) => {}}
                    style={{ border: 'none', background: 'transparent', outline: 'none', fontWeight: '700', fontSize: '13px', cursor: 'pointer', color: '#565365' }}
                    aria-label="Select timeframe"
                    options={[{
                      label: "Current Year",
                      value: "Current Year"
                    }, {
                      label: "Last Quarter",
                      value: "Last Quarter"
                    }, {
                      label: "Previous Year",
                      value: "Previous Year"
                    }]} />
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginTop: '20px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', height: '220px', paddingBottom: '8px', position: 'relative' }}>
                  {[
                    { month: 'JAN', height: '60%', isHighlighted: false },
                    { month: 'FEB', height: '40%', isHighlighted: false },
                    { month: 'MAR', height: '95%', isHighlighted: true },
                    { month: 'APR', height: '55%', isHighlighted: false },
                    { month: 'MAY', height: '75%', isHighlighted: false },
                    { month: 'JUN', height: '50%', isHighlighted: false }
                  ].map((bar, idx) => (
                    <div key={idx} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '13%', gap: '12px', height: '100%', justifyContent: 'flex-end' }}>
                      <div 
                        style={{ 
                          width: '100%', 
                          height: bar.height, 
                          background: bar.isHighlighted ? '#1d1b84' : '#d7e1ff', 
                          borderRadius: '4px',
                          transition: 'opacity 0.2s ease, transform 0.2s ease',
                          cursor: 'pointer'
                        }}
                        onMouseOver={(e) => {
                          e.currentTarget.style.opacity = '0.85';
                          e.currentTarget.style.transform = 'scaleY(1.02)';
                        }}
                        onMouseOut={(e) => {
                          e.currentTarget.style.opacity = '1';
                          e.currentTarget.style.transform = 'none';
                        }}
                      />
                      <span style={{ fontSize: '11px', fontWeight: '800', color: '#7a7688', textTransform: 'uppercase' }}>
                        {bar.month}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Top Supplier Performance Table */}
            <div className="panel" style={{ background: '#ffffff', border: '1.5px solid #25108f', borderRadius: '12px', padding: 'var(--spacing-section)' }}>
              <h2 style={{ fontSize: '16px', fontWeight: '800', color: 'var(--text)', margin: '0 0 20px 0' }}>
                Top Supplier Performance
              </h2>

              <div style={{ overflowX: 'auto' }}>
                <div className="table-responsive-wrapper">
<table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', minWidth: '550px' }}>
                  <thead>
                    <tr style={{ borderBottom: '1.5px solid #25108f' }}>
                      <th style={{ padding: '12px 8px', fontSize: '11px', fontWeight: '800', color: 'var(--muted)', textTransform: 'uppercase' }}>SUPPLIER</th>
                      <th style={{ padding: '12px 8px', fontSize: '11px', fontWeight: '800', color: 'var(--muted)', textTransform: 'uppercase', width: '150px' }}>RELIABILITY</th>
                      <th style={{ padding: '12px 8px', fontSize: '11px', fontWeight: '800', color: 'var(--muted)', textTransform: 'uppercase' }}>ORDER VOL.</th>
                      <th style={{ padding: '12px 8px', fontSize: '11px', fontWeight: '800', color: 'var(--muted)', textTransform: 'uppercase' }}>AVG. LEAD TIME</th>
                      <th style={{ padding: '12px 8px', fontSize: '11px', fontWeight: '800', color: 'var(--muted)', textTransform: 'uppercase', textAlign: 'right' }}>STATUS</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { name: 'Global Logis Group', reliability: 98, orderVol: '428 Units', leadTime: '3.2 Days', status: 'PREMIUM', statusColor: '#ecfdf5', statusText: '#059669', barcolor: 'var(--green)' },
                      { name: 'SteelPath Solutions', reliability: 85, orderVol: '152 Units', leadTime: '5.4 Days', status: 'STANDARD', statusColor: '#eff6ff', statusText: '#1e40af', barColor: '#f59e0b' },
                      { name: 'Apex Industrial', reliability: 92, orderVol: '310 Units', leadTime: '4.1 Days', status: 'PREMIUM', statusColor: '#ecfdf5', statusText: '#059669', barcolor: 'var(--green)' }
                    ].map((row, index) => (
                      <tr key={index} style={{ borderBottom: '1px solid #fcfaff' }}>
                        <td style={{ padding: '16px 8px', fontSize: '14px', fontWeight: '700', color: 'var(--text)' }}>{row.name}</td>
                        <td style={{ padding: '16px 8px' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <div style={{ flex: 1, height: '6px', background: '#eee9f6', borderRadius: '3px', overflow: 'hidden' }}>
                              <div style={{ width: `${row.reliability}%`, height: '100%', background: row.barColor, borderRadius: '3px' }} />
                            </div>
                            <span style={{ fontSize: '12px', fontWeight: '700', color: 'var(--text)', minWidth: '30px', textAlign: 'right' }}>{row.reliability}%</span>
                          </div>
                        </td>
                        <td style={{ padding: '16px 8px', fontSize: '13px', color: '#565365' }}>{row.orderVol}</td>
                        <td style={{ padding: '16px 8px', fontSize: '13px', color: '#565365' }}>{row.leadTime}</td>
                        <td style={{ padding: '16px 8px', textAlign: 'right' }}>
                          <span style={{ fontSize: '11px', fontWeight: '800', padding: '4px 8px', borderRadius: '4px', background: row.statusColor, color: row.statusText }}>{row.status}</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
</div>
              </div>
            </div>
          </div>

          {/* Right Column (Sidebar widgets) */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-section)' }}>
            {/* Recent Requests Card */}
            <div className="panel" style={{ background: '#ffffff', border: '1.5px solid #25108f', borderRadius: '12px', padding: 'var(--spacing-section)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                <h3 style={{ fontSize: '15px', fontWeight: '800', color: 'var(--text)', margin: 0 }}>Recent Requests</h3>
                <button onClick={handleViewAll} style={{ border: 'none', background: 'transparent', color: 'var(--primary)', fontSize: '12px', fontWeight: '800', cursor: 'pointer' }} type="button">View All</button>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {[
                  { title: 'Heavy Duty Grinders (12)', meta: 'Req #4928 • Today, 10:45 AM', status: 'PENDING', statusBg: '#fef3c7', statusText: '#d97706', icon: Wrench },
                  { title: 'Industrial Wiring Bulk', meta: 'Req #4925 • Today, 08:30 AM', status: 'SHIPPED', statusBg: '#ecfdf5', statusText: '#059669', icon: Zap },
                  { title: 'Precision Calipers', meta: 'Req #4922 • Yesterday', status: 'APPROVED', statusBg: '#ecfdf5', statusText: '#059669', icon: Activity }
                ].map((item, index) => {
                  const Icon = item.icon;
                  return (
                    <div 
                      key={index} 
                      onClick={() => handleRequestClick(item.meta)}
                      style={{ display: 'flex', gap: '12px', alignItems: 'flex-start', padding: '8px', borderRadius: '6px', cursor: 'pointer', transition: 'background-color 0.15s ease' }}
                      onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#f7f4fc'}
                      onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '36px', height: '36px', borderRadius: '8px', background: '#f1ebfa', color: 'var(--primary)', flexShrink: 0 }}>
                        <Icon size={18} />
                      </div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '8px' }}>
                          <strong style={{ fontSize: '13px', color: 'var(--text)', display: 'block', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{item.title}</strong>
                          <span style={{ fontSize: '9px', fontWeight: '800', padding: '2px 6px', borderRadius: '4px', background: item.statusBg, color: item.statusText, flexShrink: 0 }}>{item.status}</span>
                        </div>
                        <span style={{ display: 'block', fontSize: '11px', color: 'var(--muted)', marginTop: '4px' }}>{item.meta}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Critical Approvals Widget (Dark panel) */}
            <div className="panel" style={{ background: '#0b1329', color: '#ffffff', borderRadius: '12px', padding: 'var(--spacing-section)', display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <h3 style={{ fontSize: '16px', fontWeight: '800', margin: 0 }}>Critical Approvals</h3>
                <p style={{ fontSize: '12px', color: 'rgba(255, 255, 255, 0.6)', marginTop: '4px', margin: 0 }}>You have 5 requests exceeding $5k budget threshold.</p>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {[
                  { name: 'Site Alpha Power Grid', meta: '$12,400.00 • High Priority' },
                  { name: 'HVAC Maintenance Units', meta: '$8,200.00 • Standard' }
                ].map((item, idx) => (
                  <div 
                    key={idx}
                    onClick={() => navigate(ROUTES.materialDetails)}
                    style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '8px', padding: '12px 14px', cursor: 'pointer', transition: 'background-color 0.15s ease' }}
                    onMouseOver={(e) => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.08)'}
                    onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.04)'}
                  >
                    <div>
                      <strong style={{ display: 'block', fontSize: '13px', fontWeight: '700', color: '#ffffff' }}>{item.name}</strong>
                      <span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.5)', display: 'block', marginTop: '2px' }}>{item.meta}</span>
                    </div>
                    <ChevronRight size={16} style={{ color: 'rgba(255,255,255,0.3)' }} />
                  </div>
                ))}
              </div>

              <button onClick={handleGoToApprovals} style={{ width: '100%', height: '42px', background: 'var(--primary)', color: '#ffffff', border: 'none', borderRadius: '6px', fontSize: '13px', fontWeight: '700', cursor: 'pointer', marginTop: '6px' }} type="button">Go to Approval Queue</button>
            </div>

            {/* Market Intelligence Widget */}
            <div className="panel" style={{ background: '#ffffff', border: '1.5px solid #25108f', borderRadius: '12px', padding: 'var(--spacing-section)' }}>
              <h3 style={{ fontSize: '15px', fontWeight: '800', color: 'var(--text)', margin: '0 0 16px 0' }}>Market Intelligence</h3>
              <div style={{ background: '#fff5f5', borderLeft: '4px solid #ef4444', borderRadius: '0 8px 8px 0', padding: '16px' }}>
                <strong style={{ display: 'block', fontSize: '11px', fontWeight: '800', color: '#dc2626', letterSpacing: '0.5px' }}>PRICE SPIKE ALERT</strong>
                <p style={{ fontSize: '13px', color: 'var(--text)', marginTop: '6px', margin: 0, lineHeight: '1.45', fontWeight: '500' }}>Industrial steel prices rose 4.2% today. Review upcoming bulk orders.</p>
              </div>
            </div>
          </div>
        </div>
        {/* Floating Toast Notification */}
        {showToast && (
          <div style={{ position: 'fixed', bottom: '24px', right: '24px', background: '#ffffff', boxShadow: '0 10px 25px rgba(0,0,0,0.15)', borderRadius: '8px', padding: '16px 20px', display: 'flex', alignItems: 'center', gap: '12px', borderLeft: '4px solid #10b981', zIndex: 9999, animation: 'slideIn 0.3s ease-out' }}>
            <style>{`@keyframes slideIn { from { transform: translateY(100px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }`}</style>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '24px', height: '24px', borderRadius: '50%', background: '#ecfdf5', color: '#10b981' }}>
              <ShieldCheck size={16} />
            </div>
            <div style={{ flex: 1 }}>
              <strong style={{ display: 'block', fontSize: '13px', color: 'var(--text)' }}>Request Updated</strong>
              <span style={{ display: 'block', fontSize: '12px', color: 'var(--muted)', marginTop: '2px' }}>The material data has been refreshed successfully.</span>
            </div>
            <button onClick={() => setShowToast(false)} style={{ background: 'none', border: 'none', color: '#7a7688', cursor: 'pointer', padding: '4px', display: 'flex', alignItems: 'center' }} type="button" aria-label="Dismiss toast"><X size={16} /></button>
          </div>
        )}
      </div>
    );
  };

  return (
    <AdminShell
      activeTab="Dashboard"
    >
      <div style={{ padding: '24px 0', display: 'flex', flexDirection: 'column', gap: 'var(--spacing-section)' }}>
        
        {/* Page Header with Tab selectors */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px', position: 'relative', zIndex: 100 }}>
          <div>
            <h1 style={{ fontSize: '26px', fontWeight: '800', color: 'var(--text)', margin: 0 }}>
              {dashboardView === 'global' ? 'Dashboard' : dashboardView === 'system' ? 'System Overview' : 'Procurement Overview'}
            </h1>
            <p style={{ fontSize: '14px', color: 'var(--muted)', marginTop: '4px', margin: 0 }}>
              {dashboardView === 'global' ? "Welcome back! Here's what's happening today." : dashboardView === 'system' ? 'Core user metrics and booking statistics.' : 'Real-time logistics and expense metrics'}
            </p>
          </div>
          <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
            
            {/* 3-Way View Toggle */}
            <div style={{ display: 'flex', background: '#f1f5f9', padding: '4px', borderRadius: '6px' }}>
              <button
                onClick={() => setDashboardView('global')}
                style={{
                  border: 'none',
                  background: dashboardView === 'global' ? '#ffffff' : 'transparent',
                  color: dashboardView === 'global' ? 'var(--text)' : 'var(--muted)',
                  padding: '6px 12px',
                  borderRadius: '4px',
                  fontSize: '12px',
                  fontWeight: '700',
                  boxShadow: dashboardView === 'global' ? '0 1px 3px rgba(0,0,0,0.1)' : 'none',
                  cursor: 'pointer'
                }}
                type="button"
              >
                Global
              </button>
              <button
                onClick={() => setDashboardView('system')}
                style={{
                  border: 'none',
                  background: dashboardView === 'system' ? '#ffffff' : 'transparent',
                  color: dashboardView === 'system' ? 'var(--text)' : 'var(--muted)',
                  padding: '6px 12px',
                  borderRadius: '4px',
                  fontSize: '12px',
                  fontWeight: '700',
                  boxShadow: dashboardView === 'system' ? '0 1px 3px rgba(0,0,0,0.1)' : 'none',
                  cursor: 'pointer'
                }}
                type="button"
              >
                System
              </button>
              <button
                onClick={() => setDashboardView('procurement')}
                style={{
                  border: 'none',
                  background: dashboardView === 'procurement' ? '#ffffff' : 'transparent',
                  color: dashboardView === 'procurement' ? 'var(--text)' : 'var(--muted)',
                  padding: '6px 12px',
                  borderRadius: '4px',
                  fontSize: '12px',
                  fontWeight: '700',
                  boxShadow: dashboardView === 'procurement' ? '0 1px 3px rgba(0,0,0,0.1)' : 'none',
                  cursor: 'pointer'
                }}
                type="button"
              >
                Procurement
              </button>
            </div>

            {/* Actions for original views */}
            {dashboardView !== 'procurement' && (
              <div style={{ position: 'relative', display: 'flex', gap: '12px' }}>
                <DateFilter />
                <button
                  onClick={() => downloadDummyPDF(`Dashboard Executive Summary (${preset})`, `Total Users: ${applyMultiplier('128,402')}\nTotal Partners: ${applyMultiplier('4,810')}\nActive Bookings: ${applyMultiplier('1,842')}\nTotal Revenue: $${applyMultiplier('1,420,000')}`)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    background: '#0f172a',
                    color: '#ffffff',
                    border: 'none',
                    borderRadius: '6px',
                    padding: '8px 16px',
                    fontSize: '13px',
                    fontWeight: '700',
                    cursor: 'pointer'
                  }}
                  type="button"
                >
                  <Download size={16} />
                  <span>Export Report</span>
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Dashboard Content */}
        {renderDashboardContent()}

      </div>
    </AdminShell>
  );
}



