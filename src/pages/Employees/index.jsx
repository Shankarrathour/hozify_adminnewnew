import React, { useEffect, useState, useRef } from 'react';
import AdminShell from '../../components/layouts/AdminShell';
import { useApp } from '../../hooks/useApp';
import { ROUTES } from '../../config/routes';
import EmployeeOverview from './EmployeeOverview';
import EmployeeWorkforce from './EmployeeWorkforce';
import EmployeeProfile from './EmployeeProfile';
import AvailabilityBoard from './AvailabilityBoard';
import PerformanceDashboard from './PerformanceDashboard';
import EmployeeReports from './EmployeeReports';
import AttendanceDashboard from './AttendanceDashboard';
import LeaveManagement from './LeaveManagement';

// New imported components
import BranchManagers from './BranchManagers';
import EmployeeAssignments from './EmployeeAssignments';
import EmployeeDocuments from './EmployeeDocuments';
import EmployeeKyc from './EmployeeKyc';
import EmployeeRatings from './EmployeeRatings';
import EmployeeEarnings from './EmployeeEarnings';
import EmployeeAuditLogs from './EmployeeAuditLogs';
import EmployeeAnalytics from './EmployeeAnalytics';

// Lucide Icons (Proper bold stroke alignment)
import { CheckCircle2, ShieldAlert, Ban, Trash2, MoreVertical } from 'lucide-react';

export default function Employees({ defaultTab }) {
  const { route, navigate } = useApp();
  
  const getDefaultTab = () => {
    if (defaultTab) return defaultTab;
    if (route === ROUTES.employeeAll) return 'Workforce';
    if (route === ROUTES.employeeAvailability) return 'Availability';
    if (route === ROUTES.branchManagers) return 'BranchManagers';
    if (route === ROUTES.employeeAssignments) return 'EmployeeAssignments';
    if (route === ROUTES.employeeDocuments) return 'Documents';
    if (route === ROUTES.employeeKyc) return 'EmployeeKyc';
    if (route === ROUTES.employeeRatings) return 'EmployeeRatings';
    if (route === ROUTES.employeeEarnings) return 'EmployeeEarnings';
    if (route === ROUTES.employeeAuditLogs) return 'EmployeeAuditLogs';
    if (route === ROUTES.employeeAnalytics) return 'EmployeeAnalytics';
    if (route === ROUTES.performance) return 'Performance';
    if (route === ROUTES.reports) return 'Reports';
    if (route === ROUTES.attendance) return 'Attendance';
    if (route === ROUTES.leaveManagement) return 'LeaveManagement';
    return 'Overview';
  };

  const [activeTab, setActiveTab] = useState(getDefaultTab);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  
  // States to explicitly handle dynamic triggers & inputs
  const [activeDropdownId, setActiveDropdownId] = useState(null);
  const [employeeRemarks, setEmployeeRemarks] = useState({});
  const menuContainerRef = useRef(null);

  useEffect(() => {
    setActiveTab(getDefaultTab());
  }, [route, defaultTab]);

  // Global listener to shut down menus on random window clicks
  useEffect(() => {
    function handleGlobalClick(event) {
      if (menuContainerRef.current && !menuContainerRef.current.contains(event.target)) {
        setActiveDropdownId(null);
      }
    }
    document.addEventListener("mousedown", handleGlobalClick);
    return () => document.removeEventListener("mousedown", handleGlobalClick);
  }, []);

  const handleSelectEmployee = (emp) => {
    setSelectedEmployee(emp);
    setActiveTab('Profile');
  };

  // Status Modifiers
  const executeStatusTrigger = (employeeId, type) => {
    console.log(`Dispatched event state: [${type}] for context reference: ${employeeId}`);
    alert(`Success: Employee status changed to ${type}!`);
    setActiveDropdownId(null); // Instantly dismiss menu container
  };

  const syncRemarkState = (employeeId, value) => {
    setEmployeeRemarks(prev => ({
      ...prev,
      [employeeId]: value
    }));
  };

  // RELIABLE THREE-DOT ACTION DISPATCHER
  const renderActionsColumn = (employeeId, isOnLeave) => {
    const isOpen = activeDropdownId === employeeId;

    return (
      <div 
        style={{ position: 'relative', display: 'inline-block', verticalAlign: 'middle' }}
        ref={isOpen ? menuContainerRef : null}
      >
        {/* Toggle Button explicitly capturing synthetic propagation */}
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation(); // Prevents child table row actions from blocking this event
            setActiveDropdownId(isOpen ? null : employeeId);
          }}
          style={{
            background: 'transparent',
            border: 'none',
            cursor: 'pointer',
            padding: '8px',
            color: '#64748b',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: '9999px',
            transition: 'background-color 0.2s',
            outline: 'none'
          }}
          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f1f5f9'}
          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
        >
          <MoreVertical size={20} strokeWidth={2.5} style={{ pointerEvents: 'none' }} />
        </button>

        {/* Floating Menu overlay container */}
        {isOpen && (
          <div 
            onClick={(e) => e.stopPropagation()} // Prevents clicks inside menu from closing itself
            style={{
              position: 'absolute',
              right: '0',
              top: '100%',
              marginTop: '6px',
              zIndex: 9999, // Kept exceptionally high to bypass any nested CSS table wrappers
              backgroundColor: '#ffffff',
              border: '1px solid #e2e8f0',
              borderRadius: '8px',
              boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)',
              padding: '12px',
              minWidth: '190px'
            }}
          >
            <div style={{ fontSize: '11px', fontWeight: '700', color: '#94a3b8', textTransform: 'uppercase', marginBottom: '8px', letterSpacing: '0.05em' }}>
              Control Suite
            </div>
            
            {/* Bold Action Icons Row */}
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '14px', 
              marginBottom: isOnLeave ? '12px' : '0',
              paddingBottom: isOnLeave ? '8px' : '0',
              borderBottom: isOnLeave ? '1px solid #f1f5f9' : 'none'
            }}>
              
              {/* ACTIVATE */}
              <button 
                type="button"
                onClick={() => executeStatusTrigger(employeeId, 'ACTIVE')}
                title="Set Active"
                style={{ border: 'none', background: 'transparent', cursor: 'pointer', color: '#16a34a', padding: '4px', display: 'flex' }}
              >
                <CheckCircle2 size={18} strokeWidth={3} />
              </button>

              {/* SUSPEND */}
              <button 
                type="button"
                onClick={() => executeStatusTrigger(employeeId, 'SUSPEND')}
                title="Suspend Session"
                style={{ border: 'none', background: 'transparent', cursor: 'pointer', color: '#ea580c', padding: '4px', display: 'flex' }}
              >
                <ShieldAlert size={18} strokeWidth={3} />
              </button>

              {/* BLOCK */}
              <button 
                type="button"
                onClick={() => executeStatusTrigger(employeeId, 'BLOCK')}
                title="Block Security Access"
                style={{ border: 'none', background: 'transparent', cursor: 'pointer', color: '#dc2626', padding: '4px', display: 'flex' }}
              >
                <Ban size={18} strokeWidth={3} />
              </button>

              {/* DELETE */}
              <button 
                type="button"
                onClick={() => executeStatusTrigger(employeeId, 'DELETE')}
                title="Purge Record"
                style={{ border: 'none', background: 'transparent', cursor: 'pointer', color: '#4b5563', padding: '4px', display: 'flex' }}
              >
                <Trash2 size={18} strokeWidth={3} />
              </button>
            </div>

            {/* Leave input form handler */}
            {isOnLeave && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <label style={{ fontSize: '11px', fontWeight: '700', color: '#475569' }}>Leave Remark</label>
                <input
                  type="text"
                  placeholder="Type justification..."
                  value={employeeRemarks[employeeId] || ''}
                  onChange={(e) => syncRemarkState(employeeId, e.target.value)}
                  style={{
                    width: '100%',
                    padding: '6px 8px',
                    fontSize: '12px',
                    border: '1px solid #cbd5e1',
                    borderRadius: '4px',
                    outline: 'none',
                    backgroundColor: '#f8fafc'
                  }}
                />
              </div>
            )}
          </div>
        )}
      </div>
    );
  };

  const employeeTabRoutes = {
    Overview: ROUTES.employees,
    Workforce: ROUTES.employeeAll,
    BranchManagers: ROUTES.branchManagers,
    EmployeeAssignments: ROUTES.employeeAssignments,
    Availability: ROUTES.employeeAvailability,
    Attendance: ROUTES.attendance,
    LeaveManagement: ROUTES.leaveManagement,
    Documents: ROUTES.employeeDocuments,
    EmployeeKyc: ROUTES.employeeKyc,
    Performance: ROUTES.performance,
    EmployeeRatings: ROUTES.employeeRatings,
    EmployeeEarnings: ROUTES.employeeEarnings,
    Reports: ROUTES.reports,
    EmployeeAnalytics: ROUTES.employeeAnalytics,
    EmployeeAuditLogs: ROUTES.employeeAuditLogs
  };

  const handleTabClick = (tabId) => {
    navigate(employeeTabRoutes[tabId] || ROUTES.employees);
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'Overview':
        return (
          <EmployeeOverview
            onNavigateToWorkforce={() => navigate(ROUTES.employeeAll)}
          />
        );
      case 'Workforce':
        return (
          <EmployeeWorkforce
            onSelectEmployee={handleSelectEmployee}
            renderActionsColumn={renderActionsColumn}
          />
        );
      case 'BranchManagers':
        return <BranchManagers renderActionsColumn={renderActionsColumn} />;
      case 'EmployeeAssignments':
        return <EmployeeAssignments />;
      case 'Documents':
        return <EmployeeDocuments />;
      case 'EmployeeKyc':
        return <EmployeeKyc />;
      case 'EmployeeRatings':
        return <EmployeeRatings />;
      case 'EmployeeEarnings':
        return <EmployeeEarnings />;
      case 'EmployeeAuditLogs':
        return <EmployeeAuditLogs />;
      case 'EmployeeAnalytics':
        return <EmployeeAnalytics />;
      case 'Availability':
        return (
          <AvailabilityBoard renderActionsColumn={renderActionsColumn} />
        );
      case 'Performance':
        return (
          <PerformanceDashboard />
        );
      case 'Attendance':
        return (
          <AttendanceDashboard />
        );
      case 'LeaveManagement':
        return (
          <LeaveManagement renderActionsColumn={renderActionsColumn} />
        );
      case 'Reports':
        return (
          <EmployeeReports />
        );
      case 'Profile':
        return (
          <EmployeeProfile
            employee={selectedEmployee}
            onBack={() => {
              setSelectedEmployee(null);
              setActiveTab('Workforce');
            }}
          />
        );
      default:
        return (
          <EmployeeOverview
            onNavigateToWorkforce={() => navigate(ROUTES.employeeAll)}
          />
        );
    }
  };

  const showTabHeader = [
    'Overview',
    'Workforce',
    'BranchManagers',
    'EmployeeAssignments',
    'Availability',
    'Attendance',
    'LeaveManagement',
    'Documents',
    'EmployeeKyc',
    'Performance',
    'EmployeeRatings',
    'EmployeeEarnings',
    'Reports',
    'EmployeeAnalytics',
    'EmployeeAuditLogs'
  ].includes(activeTab);

  return (
    <AdminShell showGlobalExport={true}
      activeTab="Employees"
      headerTitle="Employee Management"
      searchPlaceholder="Search in employee suite..."
    >
      {/* Sub-tab selection bar */}
      {showTabHeader && (
        <div style={{ display: 'flex', gap: '16px', borderBottom: '1.5px solid #25108f', marginBottom: '24px', overflowY: 'auto', maxHeight: '400px', whiteSpace: 'nowrap' }}>
          {[
            { id: 'Overview', label: 'Overview' },
            { id: 'Workforce', label: 'Workforce Directory' },
            { id: 'BranchManagers', label: 'Branch Managers' },
            { id: 'EmployeeAssignments', label: 'Assignments' },
            { id: 'Availability', label: 'Availability Board' },
            { id: 'Attendance', label: 'Attendance' },
            { id: 'LeaveManagement', label: 'Leave Management' },
            { id: 'Documents', label: 'Documents' },
            { id: 'EmployeeKyc', label: 'KYC & Verification' },
            { id: 'Performance', label: 'Performance' },
            { id: 'EmployeeRatings', label: 'Ratings & Reviews' },
            { id: 'EmployeeEarnings', label: 'Earnings' },
            { id: 'Reports', label: 'Reports' },
            { id: 'EmployeeAnalytics', label: 'Analytics' },
            { id: 'EmployeeAuditLogs', label: 'Audit Logs' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => handleTabClick(tab.id)}
              type="button"
              style={{
                background: 'transparent',
                border: 'none',
                borderBottom: activeTab === tab.id ? '2px solid #4f46e5' : '2px solid transparent',
                color: activeTab === tab.id ? '#4f46e5' : 'var(--muted)',
                fontWeight: '700',
                fontSize: '13px',
                padding: '10px 4px',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                marginRight: '8px'
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>
      )}

      {/* Render sub-view component */}
      {renderContent()}
    </AdminShell>
  );
}

