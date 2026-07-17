import React, { useState, useEffect } from 'react';
import {
  LayoutGrid,
  Briefcase,
  Bell,
  HelpCircle,
  ChevronRight,
  ChevronDown,
  MessageSquare,
  Globe2,
  Moon,
  Maximize,
  Minimize,
  Menu,
  User,
  Settings,
  Key,
  Terminal,
  RefreshCw,
  LogOut,
  X,
  ArrowLeft
} from 'lucide-react';
import { useApp } from '../../hooks/useApp';
import { sidebarNavigation } from '../../config/sidebarNavigation';
import { useShell } from './ShellContext';
import { useToast } from '../../components/common/ToastNotification';
import GlobalSearch from '../common/GlobalSearch';
import brandLogo from '../../assets/logo.png';


export default function GlobalAdminShell({ children }) {
  const { shellProps } = useShell();
  const { session, logout, navigate, route, goBack, canGoBack } = useApp();

  // Extract props from Context (set by the page proxies)
  const {
    activeTab = 'Dashboard',
    brandText = 'HOZIFY',
    brandSubText = 'Enterprise Admin',
    headerTitle = '',
    customProfileName = '',
    customProfileRole = '',
    customProfileAvatar = '',
    headerTabs = null,
    sidebarButton = null,
    pageTitle = '',
    pageSubtitle = '',
  } = shellProps;

  const activeNavModules = sidebarNavigation;

  const userName = customProfileName || session?.user?.name || 'Alex Sterling';
  const roleLabel = customProfileRole || session?.user?.roleLabel || 'System Administrator';
  const role = session?.role || 'super-admin';

  const isSuperAdmin = role === 'super-admin';
  const hasCustomAvatar = !!customProfileAvatar;

  // Sync expanded module on load or when route changes
  const [openModule, setOpenModule] = useState(() => {
    const activeModule = activeNavModules.find(m =>
      m.route === route ||
      m.label === activeTab ||
      hasRoute(m, route)
    );
    return activeModule ? activeModule.label : null;
  });
  const { addToast } = useToast();
  const email = session?.user?.email || 'alex.sterling@hozify.com';
  const [activeRoleLabel, setActiveRoleLabel] = useState(roleLabel);
  const [showSwitchRolePopup, setShowSwitchRolePopup] = useState(false);
  const [openSubModules, setOpenSubModules] = useState({});
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [notifications, setNotifications] = useState([
    { id: 1, title: 'New Booking Request', message: 'AC Installation request from Amit K.', time: '5 mins ago', read: false },
    { id: 2, title: 'Payment Settled', message: 'Partner batch weekly payout completed.', time: '1 hr ago', read: false },
    { id: 3, title: 'Database Threshold Alert', message: 'Usage reached 82% on main instance.', time: '4 hrs ago', read: true }
  ]);
  const [notifDropdownOpen, setNotifDropdownOpen] = useState(false);

  const unreadCount = notifications.filter(n => !n.read).length;

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
    addToast('All notifications marked as read.', 'success');
  };

  const markAsRead = (id) => {
    setNotifications(notifications.map(n => n.id === id ? { ...n, read: true } : n));
  };

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch((err) => {
        addToast(`Error enabling fullscreen: ${err.message}`, 'error');
      });
    } else {
      document.exitFullscreen();
    }
  };

  useEffect(() => {
    const activeModule = activeNavModules.find(m =>
      m.route === route ||
      hasRoute(m, route)
    );
    if (activeModule) {
      setOpenModule(activeModule.label);
      setOpenSubModules((current) => ({
        ...current,
        ...getActiveGroupKeys(activeModule.children, route, activeModule.label)
      }));
    }
    // Close sidebar on mobile when navigating
    setSidebarOpen(false);
  }, [route]);

  const handleNavClick = (targetRoute) => {
    if (targetRoute && targetRoute !== '#') {
      navigate(targetRoute);
    }
  };

  const handleModuleClick = (module) => {
    if (module.route) {
      setOpenModule(module.label);
      navigate(module.route);
      return;
    }

    setOpenModule(prev => prev === module.label ? null : module.label);
  };

  const isParentActive = (module) => {
    if (hasRoute(module, route)) return true;
    if (module.route === route) return true;
    if (module.label === activeTab) return true;
    
    // Prevent multiple modules from becoming active when child labels (e.g. 'Audit Logs') are duplicated
    if (module.label === openModule) {
      return module.children?.some(c => c.label === activeTab) || false;
    }
    return false;
  };

  function hasRoute(item, currentRoute) {
    if (!item) return false;
    if (item.route === currentRoute) return true;
    return item.children?.some((child) => hasRoute(child, currentRoute)) || false;
  }

  function getActiveGroupKeys(items = [], currentRoute, prefix) {
    return items.reduce((acc, item) => {
      const itemKey = `${prefix}::${item.label}`;
      if (item.children?.length && hasRoute(item, currentRoute)) {
        acc[itemKey] = true;
        Object.assign(acc, getActiveGroupKeys(item.children, currentRoute, itemKey));
      }
      return acc;
    }, {});
  }

  const toggleSubModule = (key) => {  
    setOpenSubModules((current) => ({
      ...current,
      [key]: !current[key]
    }));
  };

  const renderNavChildren = (items, parentKey, depth = 1) => (
    <div className={depth === 1 ? 'sidebar-subnav' : 'sidebar-nested-subnav'} style={{
      animation: 'slideDown 0.25s ease-out',
      transformOrigin: 'top center',
      overflow: 'hidden'
    }}>
      {items.map((child) => {
        const childKey = `${parentKey}::${child.label}`;
        const hasChildren = !!child.children?.length;
        const isChildActive = child.route === route || hasRoute(child, route);
        const isOpen = !!openSubModules[childKey] || isChildActive;

        if (hasChildren) {
          return (
            <div key={childKey}>
              <button
                type="button"
                className={`sidebar-subnav-btn sidebar-group-btn ${isChildActive ? 'active-sub' : ''}`}
                onClick={() => toggleSubModule(childKey)}
              >
                <span>{child.label}</span>
                <ChevronRight
                  size={13}
                  className={`sidebar-chevron ${isOpen ? 'open' : ''}`}
                  style={{ marginLeft: 'auto', transition: 'transform 0.2s' }}
                />
              </button>
              {isOpen && renderNavChildren(child.children, childKey, depth + 1)}
            </div>
          );
        }

        return (
          <button
            key={childKey}
            type="button"
            className={`sidebar-subnav-btn ${isChildActive ? 'active-sub' : ''}`}
            onClick={() => handleNavClick(child.route)}
          >
            <span>{child.label}</span>
          </button>
        );
      })}
    </div>
  );

  const getActivePageLabel = () => {
    let foundLabel = null;
    const searchNav = (items) => {
      for (const item of items) {
        if (item.route === route) {
          foundLabel = item.label;
          return true;
        }
        if (item.children && searchNav(item.children)) {
          return true;
        }
      }
      return false;
    };
    searchNav(activeNavModules);
    return foundLabel;
  };

  return (
    <main className="dashboard global-dashboard">
      <style>{`
        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .global-sidebar {
          border-right: none !important;
          background: linear-gradient(180deg, #1B2435 0%, #232F45 100%) !important;
        }

        .global-sidebar .sidebar-module-btn {
          padding: 0 20px !important;
          height: 50px !important;
          margin-bottom: 8px !important;
          border-radius: 10px !important;
          font-weight: 500 !important;
          font-size: 15px !important;
          color: rgba(255, 255, 255, 0.95) !important;
          background-color: transparent !important;
          box-shadow: none !important;
          transition: all 0.25s ease-in-out !important;
        }

        .global-sidebar .sidebar-module-btn svg {
          color: #E5E7EB !important;
          width: 22px !important;
          height: 22px !important;
          stroke-width: 2.2px !important;
          transition: all 0.25s ease-in-out !important;
        }

        .global-sidebar .sidebar-module-btn.active {
          background-color: #3B82F6 !important;
          color: #ffffff !important;
          box-shadow: 0 4px 12px rgba(59, 130, 246, 0.4) !important;
        }

        .global-sidebar .sidebar-module-btn:hover:not(.active) {
          background-color: rgba(59, 130, 246, 0.15) !important;
          color: #ffffff !important;
        }

        .global-sidebar .sidebar-module-btn.active svg,
        .global-sidebar .sidebar-module-btn:hover svg {
          color: #ffffff !important;
        }

        .global-sidebar .sidebar-subnav-btn {
          color: #cbd5e1 !important;
          font-size: 14px !important;
          font-weight: 400 !important;
          padding: 8px 12px 8px 44px !important;
          margin-bottom: 4px !important;
          background-color: transparent !important;
        }

        .global-sidebar .sidebar-subnav-btn:hover,
        .global-sidebar .sidebar-subnav-btn.active-sub {
          color: #ffffff !important;
          background-color: rgba(255, 255, 255, 0.05) !important;
        }

        .global-header {
          background: linear-gradient(90deg, #1B0B90 0%, #2F1DB8 100%) !important;
          border-bottom: 1px solid rgba(255, 255, 255, 0.08) !important;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06) !important;
          padding: 0 24px !important;
          height: 64px !important;
          position: sticky !important;
          top: 0 !important;
          z-index: 1000 !important;
        }

        .global-header .header-icon-btn {
          color: #CBD5E1 !important;
          background: transparent !important;
          border: none !important;
          border-radius: 8px !important;
          padding: 8px !important;
          transition: all 0.2s ease-in-out !important;
          cursor: pointer !important;
        }

        .global-header .header-icon-btn:hover {
          background: #334155 !important;
          color: #fff !important;
        }

        .global-header .header-profile-meta strong {
          color: #F8FAFC !important;
        }

        .global-header .header-profile-meta span {
          color: #94A3B8 !important;
        }

        .dropdown-action-item {
          transition: all 0.2s ease-in-out !important;
        }

        .dropdown-action-item:hover {
          background: #f1f5f9 !important;
          transform: translateX(4px) !important;
        }

        .dropdown-logout-item {
          transition: all 0.2s ease-in-out !important;
        }

        .dropdown-logout-item:hover {
          background: #fef2f2 !important;
          transform: translateX(4px) !important;
        }
      `}</style>
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className="sidebar-overlay"
          onClick={() => setSidebarOpen(false)}
          style={{ position: 'fixed', inset: 0, background: 'rgba(66, 124, 201, 0.4)', zIndex: 900 }}
        />
      )}

      <aside className={`sidebar global-sidebar ${sidebarOpen ? 'open' : ''}`}>
        <div className="sidebar-brand" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: '28px', paddingBottom: '24px', justifyContent: 'center', background: 'transparent' }}>
          <img
            src={brandLogo}
            alt="HOZIFY Partner Logo"
            style={{
              width: '150px',
              height: 'auto',
              maxHeight: '85px',
              objectFit: 'contain',
              background: 'transparent',
              display: 'block',
            }}
          />
        </div>

        <nav className="sidebar-nav">
          {activeNavModules.map((item) => {
            const Icon = item.icon;
            const activeParent = isParentActive(item);
            const isExpanded = openModule === item.label;

            return (
              <div key={item.label}>
                <button
                  className={`sidebar-module-btn ${activeParent ? 'active' : ''}`}
                  type="button"
                  onClick={() => handleModuleClick(item)}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                    <Icon size={22} />
                    <span>{item.label}</span>
                  </div>
                  {item.children && (
                    <ChevronRight
                      size={15}
                      className={`sidebar-chevron ${isExpanded ? 'open' : ''}`}
                      style={{ marginLeft: 'auto', transition: 'transform 0.25s' }}
                    />
                  )}
                </button>
                {isExpanded && item.children && renderNavChildren(item.children, item.label)}
              </div>
            );
          })}
        </nav>

        {sidebarButton && (
          <div style={{ padding: '0 16px 16px' }}>
            {sidebarButton}
          </div>
        )}
      </aside>

      <section className="dashboard-main" style={{ background: '#f8fafc' }}>
        <header 
          className="dash-header global-header" 
          style={{ 
            position: 'sticky', 
            top: 0, 
            zIndex: 90, 
            display: 'flex', 
            flexDirection: 'row',
            justifyContent: 'space-between', 
            alignItems: 'center', 
            flexWrap: 'nowrap',
            padding: '10px 24px', 
            minHeight: '64px', 
            background: 'linear-gradient(90deg, #1B0B90 0%, #2F1DB8 100%)', 
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.05)' 
          }}
        >
          {/* Left Combo */}
          <div className="header-left-combo" style={{ display: 'flex', alignItems: 'center', gap: '12px', flex: '0 1 auto', minWidth: 0 }}>
            <button
              className="mobile-menu-btn"
              onClick={() => setSidebarOpen(true)}
              style={{ display: 'none', background: 'none', border: 'none', color: '#ffffff', cursor: 'pointer' }}
            >
              <Menu size={24} />
            </button>
            <img 
              src={brandLogo} 
              alt="Brand Logo" 
              className="mobile-header-logo"
              style={{ display: 'none', width: '32px', height: '32px', objectFit: 'contain', flexShrink: 0, background: '#ffffff', borderRadius: '4px', padding: '2px' }} 
            />
            {canGoBack && (
              <button
                onClick={(e) => { e.preventDefault(); goBack(); }}
                style={{
                  background: 'rgba(255, 255, 255, 0.12)',
                  border: 'none',
                  color: '#ffffff',
                  borderRadius: '50%',
                  width: '30px',
                  height: '30px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  transition: 'background 0.2s',
                  flexShrink: 0
                }}
                onMouseEnter={e => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.22)'}
                onMouseLeave={e => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.12)'}
                title="Go Back"
              >
                <ArrowLeft size={16} />
              </button>
            )}
            {/* Always show the active module/tab name in navbar */}
            <span style={{ fontWeight: '800', fontSize: '20px', color: '#FFFFFF', whiteSpace: 'nowrap', letterSpacing: '-0.02em', fontFamily: 'Inter, sans-serif', overflow: 'hidden', textOverflow: 'ellipsis', display: 'block' }}>
              {headerTitle || getActivePageLabel() || activeTab}
            </span>
          </div>

          {/* Center Area (Tabs or Search) */}
          <div className="header-center-area" style={{ display: 'flex', justifyContent: 'center', flex: '1 1 auto', margin: '0 24px', minWidth: 0, overflow: 'hidden' }}>
            {headerTabs ? (
              <div className="secondary-page-tabs" style={{ display: 'flex', gap: '24px', width: '100%', overflowX: 'auto', whiteSpace: 'nowrap', padding: '0 16px' }}>
                {headerTabs}
              </div>
            ) : (
              <div style={{ width: '100%', maxWidth: '480px' }}>
                <GlobalSearch />
              </div>
            )}
          </div>

          {/* Right Actions Combo */}
          <div className="dash-actions" style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '16px', flex: '0 0 auto' }}>

            {/* Fullscreen Button */}
            <button
              className="header-icon-btn"
              type="button"
              title={isFullscreen ? "Exit Fullscreen" : "Fullscreen"}
              onClick={toggleFullscreen}
              style={{ color: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            >
              {isFullscreen ? <Minimize size={20} /> : <Maximize size={20} />}
            </button>

            <div style={{ width: '1px', height: '24px', background: 'rgba(255, 255, 255, 0.2)' }} />

            {/* Notification Bell with Dropdown */}
            <div style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <button
                className="header-icon-btn"
                type="button"
                title="Notifications"
                onClick={() => setNotifDropdownOpen(!notifDropdownOpen)}
                style={{ position: 'relative', color: '#ffffff' }}
              >
                <Bell size={20} />
                {unreadCount > 0 && (
                  <span
                    className="badge"
                    style={{
                      position: 'absolute',
                      top: '4px',
                      right: '4px',
                      width: '16px',
                      height: '16px',
                      background: '#ef4444',
                      color: '#fff',
                      borderRadius: '50%',
                      fontSize: '9px',
                      fontWeight: '800',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    {unreadCount}
                  </span>
                )}
              </button>

              {notifDropdownOpen && (
                <>
                  {/* Click outside to close */}
                  <div
                    onClick={() => setNotifDropdownOpen(false)}
                    style={{ position: 'fixed', inset: 0, zIndex: 998 }}
                  />
                  <div style={{ position: 'absolute', top: '100%', right: 0, marginTop: '8px', width: '320px', background: '#fff', border: '1.5px solid #25108f', borderRadius: '12px', boxShadow: '0 10px 25px -5px rgba(0,0,0,0.1), 0 8px 10px -6px rgba(0,0,0,0.05)', padding: '16px', zIndex: 999, display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <strong style={{ fontSize: '14px', color: 'var(--text)' }}>Notifications</strong>
                      {unreadCount > 0 && (
                        <button
                          onClick={markAllAsRead}
                          style={{ background: 'none', border: 'none', color: '#2563eb', fontSize: '11px', fontWeight: '700', cursor: 'pointer' }}
                        >
                          Mark all as read
                        </button>
                      )}
                    </div>

                    <div style={{ height: '1px', background: 'var(--line)' }} />

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', maxHeight: '240px', overflowY: 'auto' }}>
                      {notifications.length > 0 ? (
                        notifications.map(n => (
                          <div
                            key={n.id}
                            onClick={() => { markAsRead(n.id); }}
                            style={{
                              display: 'flex',
                              flexDirection: 'column',
                              gap: '2px',
                              padding: '8px',
                              borderRadius: '6px',
                              background: n.read ? 'transparent' : '#f8fafc',
                              cursor: 'pointer',
                              borderLeft: n.read ? 'none' : '3px solid #2563eb',
                              transition: 'background 0.2s',
                              textAlign: 'left'
                            }}
                            onMouseEnter={e => e.currentTarget.style.background = '#f1f5f9'}
                            onMouseLeave={e => e.currentTarget.style.background = n.read ? 'transparent' : '#f8fafc'}
                          >
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                              <span style={{ fontSize: '12px', fontWeight: '700', color: 'var(--text)' }}>{n.title}</span>
                              <span style={{ fontSize: '10px', color: 'var(--muted)' }}>{n.time}</span>
                            </div>
                            <span style={{ fontSize: '11px', color: 'var(--muted)' }}>{n.message}</span>
                          </div>
                        ))
                      ) : (
                        <span style={{ fontSize: '12px', color: 'var(--muted)', textAlign: 'center', padding: '16px' }}>No notifications</span>
                      )}
                    </div>

                    <div style={{ height: '1px', background: 'var(--line)' }} />

                    <button
                      onClick={() => { setNotifDropdownOpen(false); navigate('/notifications'); }}
                      style={{ width: '100%', background: '#f8fafc', border: 'none', padding: '8px', borderRadius: '6px', fontSize: '12px', fontWeight: '700', color: '#2563eb', cursor: 'pointer', textAlign: 'center', transition: 'background 0.2s' }}
                      onMouseEnter={e => e.currentTarget.style.background = '#f1f5f9'}
                      onMouseLeave={e => e.currentTarget.style.background = '#f8fafc'}
                    >
                      View all notifications
                    </button>
                  </div>
                </>
              )}
            </div>

            {/* Restored Profile Section in Header */}
            <div className="header-profile-section" style={{ position: 'relative', display: 'flex', alignItems: 'center', marginLeft: '4px' }}>
              <div
                onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                style={{ position: 'relative', cursor: 'pointer', display: 'flex', alignItems: 'center' }}
                className="header-profile-trigger"
              >
                <img
                  src={customProfileAvatar || "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&h=100&q=80"}
                  alt={userName}
                  style={{ width: '38px', height: '38px', borderRadius: '50%', objectFit: 'cover' }}
                />
                {/* Online Indicator Badge */}
                <span style={{ position: 'absolute', bottom: '0', right: '0', width: '12px', height: '12px', background: '#22c55e', border: '2px solid #fff', borderRadius: '50%' }} title="Online" />
              </div>

              {/* Profile Dropdown Menu */}
              {profileDropdownOpen && (
                <>
                  {/* Click outside overlay to close */}
                  <div
                    onClick={() => setProfileDropdownOpen(false)}
                    style={{ position: 'fixed', inset: 0, zIndex: 998 }}
                  />
                  <div style={{ position: 'absolute', top: '100%', right: 0, marginTop: '8px', width: '280px', background: '#fff', border: '1.5px solid #25108f', borderRadius: '12px', boxShadow: '0 10px 25px -5px rgba(0,0,0,0.1), 0 8px 10px -6px rgba(0,0,0,0.05)', padding: '16px', zIndex: 999, display: 'flex', flexDirection: 'column', gap: '8px' }}>

                    {/* Premium Profile Header Info */}
                    <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                      <div style={{ position: 'relative' }}>
                        <img
                          src={customProfileAvatar || "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&h=100&q=80"}
                          alt={userName}
                          style={{ width: '48px', height: '48px', borderRadius: '50%', objectFit: 'cover' }}
                        />
                        <span style={{ position: 'absolute', bottom: '1px', right: '1px', width: '10px', height: '10px', background: '#22c55e', border: '2px solid #fff', borderRadius: '50%' }} title="Online" />
                      </div>
                      <div style={{ display: 'flex', flexDirection: 'column', textAlign: 'left', minWidth: 0 }}>
                        <strong style={{ fontSize: '14px', fontWeight: '800', color: 'var(--text)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{userName}</strong>
                        <span style={{ fontSize: '11px', color: 'var(--muted)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', marginBottom: '4px' }}>{email}</span>
                        <span style={{ width: 'fit-content', fontSize: '9px', fontWeight: '800', background: '#e0e7ff', color: '#4f46e5', padding: '2px 6px', borderRadius: '4px', textTransform: 'uppercase' }}>
                          {activeRoleLabel}
                        </span>
                      </div>
                    </div>

                    <div style={{ height: '1px', background: 'var(--line)', margin: '8px 0' }} />

                    {/* Actions List with Icons and Premium Styling */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                      <button
                        onClick={() => { setProfileDropdownOpen(false); setShowSwitchRolePopup(true); }}
                        style={{ display: 'flex', alignItems: 'center', gap: '8px', width: '100%', textAlign: 'left', background: 'none', border: 'none', padding: '8px 12px', borderRadius: '6px', fontSize: '13px', color: 'var(--text)', cursor: 'pointer', transition: 'all 0.2s' }}
                        className="dropdown-action-item"
                      >
                        <RefreshCw size={14} color="#64748b" /> Switch Role
                      </button>
                      <button
                        onClick={() => { setProfileDropdownOpen(false); navigate('/my-profile'); }}
                        style={{ display: 'flex', alignItems: 'center', gap: '8px', width: '100%', textAlign: 'left', background: 'none', border: 'none', padding: '8px 12px', borderRadius: '6px', fontSize: '13px', color: 'var(--text)', cursor: 'pointer', transition: 'all 0.2s' }}
                        className="dropdown-action-item"
                      >
                        <User size={14} color="#64748b" /> My Profile
                      </button>
                      <button
                        onClick={() => { setProfileDropdownOpen(false); navigate('/settings/account'); }}
                        style={{ display: 'flex', alignItems: 'center', gap: '8px', width: '100%', textAlign: 'left', background: 'none', border: 'none', padding: '8px 12px', borderRadius: '6px', fontSize: '13px', color: 'var(--text)', cursor: 'pointer', transition: 'all 0.2s' }}
                        className="dropdown-action-item"
                      >
                        <Settings size={14} color="#64748b" /> Account Settings
                      </button>
                      <button
                        onClick={() => { setProfileDropdownOpen(false); navigate('/settings/change-password'); }}
                        style={{ display: 'flex', alignItems: 'center', gap: '8px', width: '100%', textAlign: 'left', background: 'none', border: 'none', padding: '8px 12px', borderRadius: '6px', fontSize: '13px', color: 'var(--text)', cursor: 'pointer', transition: 'all 0.2s' }}
                        className="dropdown-action-item"
                      >
                        <Key size={14} color="#64748b" /> Change Password
                      </button>
                      <button
                        onClick={() => { setProfileDropdownOpen(false); navigate('/profile/activity-log'); }}
                        style={{ display: 'flex', alignItems: 'center', gap: '8px', width: '100%', textAlign: 'left', background: 'none', border: 'none', padding: '8px 12px', borderRadius: '6px', fontSize: '13px', color: 'var(--text)', cursor: 'pointer', transition: 'all 0.2s' }}
                        className="dropdown-action-item"
                      >
                        <Terminal size={14} color="#64748b" /> Activity Log
                      </button>
                      <button
                        onClick={() => { setProfileDropdownOpen(false); navigate('/help-support'); }}
                        style={{ display: 'flex', alignItems: 'center', gap: '8px', width: '100%', textAlign: 'left', background: 'none', border: 'none', padding: '8px 12px', borderRadius: '6px', fontSize: '13px', color: 'var(--text)', cursor: 'pointer', transition: 'all 0.2s' }}
                        className="dropdown-action-item"
                      >
                        <HelpCircle size={14} color="#64748b" /> Help &amp; Support
                      </button>

                      <div style={{ height: '1px', background: 'var(--line)', margin: '8px 0' }} />

                      <button
                        onClick={() => { setProfileDropdownOpen(false); setShowLogoutConfirm(true); }}
                        style={{ display: 'flex', alignItems: 'center', gap: '8px', width: '100%', textAlign: 'left', background: 'none', border: 'none', padding: '8px 12px', borderRadius: '6px', fontSize: '13px', color: '#ef4444', fontWeight: '700', cursor: 'pointer', transition: 'all 0.2s' }}
                        className="dropdown-logout-item"
                      >
                        <LogOut size={14} color="#ef4444" /> Logout
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </header>
        {showLogoutConfirm && (
          <div style={{ position: 'fixed', inset: 0, background: 'rgba(15,23,42,0.4)', backdropFilter: 'blur(4px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 9999 }}>
            <div style={{ background: '#fff', borderRadius: '12px', padding: '24px', width: '360px', boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1), 0 10px 10px -5px rgba(0,0,0,0.04)', display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <h3 style={{ fontSize: '16px', fontWeight: '800', color: '#0f172a', margin: 0 }}>Confirm Logout</h3>
              <p style={{ fontSize: '13px', color: '#64748b', margin: 0 }}>Are you sure you want to log out of the Hozify Admin platform?</p>
              <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end', marginTop: '4px' }}>
                <button
                  onClick={() => setShowLogoutConfirm(false)}
                  className="custom-btn-secondary"
                  style={{ height: '36px', padding: '0 16px', fontSize: '13px' }}
                >
                  Cancel
                </button>
                <button
                  onClick={() => { setShowLogoutConfirm(false); logout(); }}
                  className="custom-btn-primary"
                  style={{ height: '36px', padding: '0 16px', fontSize: '13px', background: '#ef4444', borderColor: '#ef4444' }}
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Switch Role Popup Modal */}
        {showSwitchRolePopup && (
          <div style={{ position: 'fixed', inset: 0, background: 'rgba(15,23,42,0.4)', backdropFilter: 'blur(4px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 9999 }}>
            <div style={{ background: '#fff', borderRadius: '12px', padding: '24px', width: '380px', boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1), 0 10px 10px -5px rgba(0,0,0,0.04)', display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h3 style={{ fontSize: '16px', fontWeight: '800', color: '#0f172a', margin: 0 }}>Switch User Role</h3>
                <button onClick={() => setShowSwitchRolePopup(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--muted)' }} aria-label="Close switch role popup">
                  <X size={16} />
                </button>
              </div>
              <p style={{ fontSize: '13px', color: '#64748b', margin: 0 }}>Select an authorized administrative role below to update dynamic permissions immediately.</p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {['Super Admin', 'Admin', 'Manager', 'Support'].map((r) => {
                  const isCurrent = activeRoleLabel === r;
                  return (
                    <button
                      key={r}
                      onClick={() => {
                        setActiveRoleLabel(r);
                        setShowSwitchRolePopup(false);
                        addToast(`Role switched to ${r} successfully! Dynamic permissions synced.`, 'success');
                      }}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        width: '100%',
                        padding: '12px 16px',
                        borderRadius: '8px',
                        border: isCurrent ? '2px solid #2563eb' : '1.5px solid #25108f',
                        background: isCurrent ? '#eff6ff' : '#fff',
                        fontSize: '13px',
                        fontWeight: '700',
                        color: isCurrent ? '#1e40af' : 'var(--text)',
                        cursor: 'pointer',
                        transition: 'all 0.2s'
                      }}
                    >
                      <span>{r}</span>
                      {isCurrent && <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#2563eb' }} />}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        )}
        <div className="dash-content global-content" style={{ padding: 'var(--spacing-section, 24px)' }}>

          {/* Page Title Banner - rendered in content area, below the sticky header */}
          {pageTitle && (
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '16px',
              marginBottom: '24px'
            }}>
              <div>
                <h1 style={{ fontSize: '26px', fontWeight: '800', color: 'var(--text)', margin: 0 }}>
                  {pageTitle}
                </h1>
                {pageSubtitle && (
                  <p style={{ fontSize: '14px', color: 'var(--muted)', marginTop: '4px', margin: 0 }}>
                    {pageSubtitle}
                  </p>
                )}
              </div>
            </div>
          )}
          {children}
        </div>
      </section>
    </main>
  );
}


