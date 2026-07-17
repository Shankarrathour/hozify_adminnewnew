import React, { useState, useEffect, useRef, useCallback } from 'react';
import ReactDOM from 'react-dom';
import {
  Calendar,
  Filter,
  MoreVertical,
  Plus,
  Search,
  ChevronLeft,
  ChevronRight,
  Download,
  X,
  Eye,
  CheckCircle,
  HelpCircle,
  User
} from 'lucide-react';
import { useApp } from '../../hooks/useApp';
import { ROUTES } from '../../config/routes';
import AdminShell from '../../components/layouts/AdminShell';
import Select from "../../components/ui/Select";

import { DateRange } from 'react-date-range';
import 'react-date-range/dist/styles.css'; 
import 'react-date-range/dist/theme/default.css';
import { format } from 'date-fns';

export default function SupportOperationsList({ activeTab = 'Support Center', defaultFilter = 'all' }) {
  const { navigate } = useApp();

  const getHeaderInfo = () => {
    switch (defaultFilter) {
      case 'open':
        return {
          title: 'Open Tickets',
          desc: 'Review active, unassigned or pending customer support tickets.'
        };
      case 'in-progress':
        return {
          title: 'In Progress Tickets',
          desc: 'Manage tickets currently being handled by support agents.'
        };
      case 'closed':
        return {
          title: 'Closed Tickets',
          desc: 'Review resolved and finalized customer support cases.'
        };
      case 'bookings':
        return {
          title: 'Booking Issues',
          desc: 'Track and resolve tickets related to booking anomalies or schedules.'
        };
      case 'payments':
        return {
          title: 'Payment & Billing Issues',
          desc: 'Address client disputes, refund issues, and transactional inquiries.'
        };
      case 'wallet':
        return {
          title: 'Wallet Issues',
          desc: 'Investigate customer balance errors, rewards, and wallet discrepancies.'
        };
      case 'technical':
        return {
          title: 'Technical Issues',
          desc: 'Coordinate debug resources for app glitches and technical bugs.'
        };
      case 'kyc':
        return {
          title: 'KYC & Account Issues',
          desc: 'Review identity verification challenges and corporate account queries.'
        };
      default:
        return {
          title: 'Support Operations',
          desc: 'Manage and resolve high-priority enterprise support requests.'
        };
    }
  };

  const { title, desc } = getHeaderInfo();

  const [selectedPriority, setSelectedPriority] = useState('All');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedAgent, setSelectedAgent] = useState('All');
  
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [calendarPos, setCalendarPos] = useState({ top: 0, left: 0 });
  const datePickerRef = useRef(null);
  const [dateRange, setDateRange] = useState([
    {
      startDate: new Date(2023, 9, 1),
      endDate: new Date(2023, 9, 31),
      key: 'selection'
    }
  ]);

  const handleDateTriggerClick = useCallback(() => {
    if (datePickerRef.current) {
      const rect = datePickerRef.current.getBoundingClientRect();
      setCalendarPos({
        top: rect.bottom + window.scrollY + 8,
        left: rect.left + window.scrollX
      });
    }
    setShowDatePicker(prev => !prev);
  }, []);

  // Close calendar when clicking outside
  useEffect(() => {
    if (!showDatePicker) return;
    const handler = (e) => {
      if (datePickerRef.current && datePickerRef.current.contains(e.target)) return;
      // if click is inside the portal calendar, don't close
      const portal = document.getElementById('date-range-portal');
      if (portal && portal.contains(e.target)) return;
      setShowDatePicker(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [showDatePicker]);

  const [searchQuery, setSearchQuery] = useState('');
  const [activeMenuId, setActiveMenuId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const baseTickets = [
    {
      id: '#TK-8842',
      user: { name: 'Jared Smith', email: 'jared.s@gmail.com', initials: 'JS', color: '#3b82f6', bg: '#eff6ff' },
      category: 'Technical',
      priority: 'Critical',
      status: 'OPEN',
      agent: { name: 'Sarah J.', initials: 'SJ', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&fit=crop&q=80' },
      createdDate: 'Oct 12, 09:42 AM'
    },
    {
      id: '#TK-8843',
      user: { name: 'Maria Lopez', email: 'm.lopez@corporate.com', initials: 'ML', color: 'var(--primary)', bg: '#f1ebfa' },
      category: 'Billing',
      priority: 'Medium',
      status: 'IN PROGRESS',
      agent: { name: 'Mark T.', initials: 'MT', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&fit=crop&q=80' },
      createdDate: 'Oct 12, 10:15 AM'
    },
    {
      id: '#TK-8844',
      user: { name: 'Elena Fischer', email: 'elena.f@techhub.io', initials: 'EF', color: '#10b981', bg: '#ecfdf5' },
      category: 'Account',
      priority: 'High',
      status: 'OPEN',
      agent: { name: 'Unassigned', initials: 'UN', avatar: null },
      createdDate: 'Oct 12, 11:30 AM'
    },
    {
      id: '#TK-8845',
      user: { name: 'Robert Brown', email: 'rb@fasttrack.com', initials: 'RB', color: '#f59e0b', bg: '#fef3c7' },
      category: 'Technical',
      priority: 'Low',
      status: 'ON HOLD',
      agent: { name: 'Sarah J.', initials: 'SJ', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&fit=crop&q=80' },
      createdDate: 'Oct 12, 01:55 PM'
    },
    {
      id: '#TK-8846',
      user: { name: 'David Kim', email: 'd.kim@outlook.com', initials: 'DK', color: '#8b5cf6', bg: '#f5f3ff' },
      category: 'Bookings',
      priority: 'High',
      status: 'CLOSED',
      agent: { name: 'Mark T.', initials: 'MT', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&fit=crop&q=80' },
      createdDate: 'Oct 13, 08:20 AM'
    },
    {
      id: '#TK-8847',
      user: { name: 'Alice Watson', email: 'alice.w@design.co', initials: 'AW', color: '#ec4899', bg: '#fdf2f8' },
      category: 'Bookings',
      priority: 'Medium',
      status: 'OPEN',
      agent: { name: 'Sarah J.', initials: 'SJ', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&fit=crop&q=80' },
      createdDate: 'Oct 13, 11:05 AM'
    },
    {
      id: '#TK-8848',
      user: { name: 'Chris Evans', email: 'c.evans@avengers.io', initials: 'CE', color: '#ef4444', bg: '#fef2f2' },
      category: 'Wallet',
      priority: 'Low',
      status: 'OPEN',
      agent: { name: 'Unassigned', initials: 'UN', avatar: null },
      createdDate: 'Oct 14, 02:30 PM'
    },
    {
      id: '#TK-8849',
      user: { name: 'Diana Prince', email: 'diana.p@justice.org', initials: 'DP', color: '#10b981', bg: '#ecfdf5' },
      category: 'Technical',
      priority: 'Medium',
      status: 'CLOSED',
      agent: { name: 'Sarah J.', initials: 'SJ', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&fit=crop&q=80' },
      createdDate: 'Oct 14, 04:15 PM'
    }
  ];

  const [tickets, setTickets] = useState(() => {
    let arr = [];
    // Generate enough tickets for pagination and variety
    for (let i = 0; i < 20; i++) {
      arr = arr.concat(baseTickets.map((t, idx) => {
        // Vary status and priority to make sure filters find something
        let status = t.status;
        let priority = t.priority;
        if (i % 3 === 0) status = 'IN PROGRESS';
        if (i % 4 === 0) priority = 'Critical';
        
        return {
          ...t,
          id: `#TK-${parseInt(t.id.split('-')[1]) + i * 100 + idx}`,
          status,
          priority
        };
      }));
    }
    return arr;
  });

  // Synchronise or add dynamic ticket if added from supportCreate
  useEffect(() => {
    const stored = localStorage.getItem('hozify_new_tickets');
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          // Merge avoiding duplicates
          setTickets(prev => {
            const existingIds = new Set(prev.map(t => t.id));
            const newOnes = parsed.filter(t => !existingIds.has(t.id));
            return [...newOnes, ...prev];
          });
        }
      } catch (e) {
        console.error(e);
      }
    }
  }, []);

  const handleResetFilters = () => {
    setSelectedPriority('All');
    setSelectedCategory('All');
    setSelectedAgent('All');
    setSearchQuery('');
    setDateRange([
      {
        startDate: new Date(2023, 9, 1),
        endDate: new Date(2023, 9, 31),
        key: 'selection'
      }
    ]);
  };

  const handleActionClick = (ticketId, action) => {
    setActiveMenuId(null);
    if (action === 'view') {
      navigate(ROUTES.supportDetails.replace(':id', ticketId.replace('#', '')));
    } else if (action === 'assign') {
      const name = prompt('Enter agent name to assign to:');
      if (!name) return;
      setTickets(prev => prev.map(t => {
        if (t.id === ticketId) {
          return { ...t, agent: { name, initials: name.substring(0, 2).toUpperCase(), avatar: null } };
        }
        return t;
      }));
    } else if (action === 'close') {
      setTickets(prev => prev.map(t => {
        if (t.id === ticketId) {
          return { ...t, status: 'CLOSED' };
        }
        return t;
      }));
    }
  };

  // Filter tickets
  const filteredTickets = tickets.filter(t => {
    // Priority filter
    if (selectedPriority !== 'All' && t.priority !== selectedPriority) return false;
    
    // Category filter
    if (selectedCategory !== 'All' && t.category !== selectedCategory) return false;
    
    // Agent filter
    if (selectedAgent !== 'All') {
      if (selectedAgent === 'Unassigned' && t.agent.name !== 'Unassigned') return false;
      if (selectedAgent !== 'Unassigned' && t.agent.name === 'Unassigned') return false;
      if (selectedAgent !== 'Unassigned' && t.agent.name !== selectedAgent) return false;
    }

    // Default Filter from route prop
    if (defaultFilter !== 'all') {
      if (defaultFilter === 'open' && t.status !== 'OPEN') return false;
      if (defaultFilter === 'in-progress' && t.status !== 'IN PROGRESS') return false;
      if (defaultFilter === 'closed' && t.status !== 'CLOSED') return false;
      
      // Issue type mapping
      if (defaultFilter === 'bookings' && t.category.toLowerCase() !== 'bookings') {
        // Fallback for demo: if category contains technical or others, match if exact
        if (t.category.toLowerCase() !== 'booking' && t.category.toLowerCase() !== 'bookings') return false;
      }
      if (defaultFilter === 'payments' && t.category.toLowerCase() !== 'payments' && t.category.toLowerCase() !== 'billing') return false;
      if (defaultFilter === 'wallet' && t.category.toLowerCase() !== 'wallet') return false;
      if (defaultFilter === 'technical' && t.category.toLowerCase() !== 'technical') return false;
      if (defaultFilter === 'kyc' && t.category.toLowerCase() !== 'kyc' && t.category.toLowerCase() !== 'account') return false;
    }

    // Search query
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      return t.id.toLowerCase().includes(q) || 
             t.subject?.toLowerCase().includes(q) ||
             t.user.name.toLowerCase().includes(q) ||
             t.user.email.toLowerCase().includes(q) ||
             t.category.toLowerCase().includes(q);
    }

    return true;
  });

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedPriority, selectedCategory, selectedAgent, searchQuery, defaultFilter]);

  const totalPages = Math.max(1, Math.ceil(filteredTickets.length / itemsPerPage));
  const paginatedTickets = filteredTickets.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <AdminShell
      activeTab={activeTab}
      brandText="HOZIFY"
      brandSubText="Enterprise Admin"
      headerTitle="Support Operations"
      searchPlaceholder="Search tickets, IDs, or users..."
      searchValue={searchQuery}
      onSearchChange={(val) => setSearchQuery(val)}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-section)', padding: '24px 0', position: 'relative' }}>
        
        {/* Page Title & Actions */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <h1 style={{ fontSize: '24px', fontWeight: '800', color: 'var(--text)', margin: 0 }}>
              {title}
            </h1>
            <p style={{ fontSize: '13px', color: 'var(--muted)', margin: '4px 0 0' }}>
              {desc}
            </p>
          </div>

          <div style={{ display: 'flex', gap: '12px' }}>
            <button
              onClick={() => alert('Exporting ticket reports...')}
              style={{
                height: '38px',
                padding: '0 16px',
                borderRadius: '6px',
                border: '1.5px solid #25108f',
                background: '#fff',
                color: 'var(--text)',
                fontWeight: '700',
                fontSize: '13px',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px'
              }}
              type="button"
            >
              <Download size={14} />
              <span>Export Data</span>
            </button>

            <button
              onClick={() => navigate(ROUTES.supportCreate)}
              style={{
                height: '38px',
                padding: '0 16px',
                borderRadius: '6px',
                border: 'none',
                background: 'var(--primary)',
                color: '#fff',
                fontWeight: '700',
                fontSize: '13px',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                boxShadow: '0 2px 4px rgba(37, 16, 143, 0.1)'
              }}
              type="button"
            >
              <Plus size={16} />
              <span>New Ticket</span>
            </button>
          </div>
        </div>

        {/* Filter Card Grid */}
        <div className="panel" style={{ padding: '20px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', alignItems: 'center', background: '#fff', position: 'relative', zIndex: 20 }}>
          
          {/* Date Range */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', position: 'relative' }}>
            <span style={{ fontSize: '12px', fontWeight: '800', color: 'var(--muted)' }}>Date Range</span>
            <div 
              ref={datePickerRef}
              onClick={handleDateTriggerClick}
              style={{ display: 'flex', alignItems: 'center', gap: '8px', border: '1.5px solid #25108f', padding: '8px 12px', borderRadius: '6px', background: '#fff', cursor: 'pointer' }}
            >
              <Calendar size={14} style={{ color: 'var(--muted)' }} />
              <span style={{ fontSize: '13px', color: 'var(--text)', fontWeight: '600' }}>
                {format(dateRange[0].startDate, 'MMM d, yyyy')} - {format(dateRange[0].endDate, 'MMM d, yyyy')}
              </span>
            </div>
          </div>

          {/* Priority dropdown */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <span style={{ fontSize: '12px', fontWeight: '800', color: 'var(--muted)' }}>Priority</span>
            <Select
              value={selectedPriority}
              onChange={(e) => setSelectedPriority(e.target.value)}
              style={{ border: '1.5px solid #25108f', padding: '8px 12px', borderRadius: '6px', background: '#fff', outline: 'none', fontSize: '13px', color: 'var(--text)', fontWeight: '600', width: '100%' }}
              aria-label="Filter Priority"
              options={[{
                label: "All Priorities",
                value: "All"
              }, {
                label: "Critical",
                value: "Critical"
              }, {
                label: "High",
                value: "High"
              }, {
                label: "Medium",
                value: "Medium"
              }, {
                label: "Low",
                value: "Low"
              }]} />
          </div>

          {/* Category dropdown */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <span style={{ fontSize: '12px', fontWeight: '800', color: 'var(--muted)' }}>Category</span>
            <Select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              style={{ border: '1.5px solid #25108f', padding: '8px 12px', borderRadius: '6px', background: '#fff', outline: 'none', fontSize: '13px', color: 'var(--text)', fontWeight: '600', width: '100%' }}
              aria-label="Filter Category"
              options={[{
                label: "All Categories",
                value: "All"
              }, {
                label: "Technical",
                value: "Technical"
              }, {
                label: "Billing",
                value: "Billing"
              }, {
                label: "Account",
                value: "Account"
              }]} />
          </div>

          {/* Agent dropdown */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <span style={{ fontSize: '12px', fontWeight: '800', color: 'var(--muted)' }}>Agent</span>
            <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
              <Select
                value={selectedAgent}
                onChange={(e) => setSelectedAgent(e.target.value)}
                style={{ border: '1.5px solid #25108f', padding: '8px 12px', borderRadius: '6px', background: '#fff', outline: 'none', fontSize: '13px', color: 'var(--text)', fontWeight: '600', width: '100%' }}
                aria-label="Filter Agent"
                options={[{
                  label: "All Agents",
                  value: "All"
                }, {
                  label: "Sarah J.",
                  value: "Sarah J."
                }, {
                  label: "Mark T.",
                  value: "Mark T."
                }, {
                  label: "Unassigned",
                  value: "Unassigned"
                }]} />

              <button
                onClick={handleResetFilters}
                style={{
                  height: '35px',
                  width: '35px',
                  borderRadius: '6px',
                  border: '1.5px solid #25108f',
                  background: '#f4eff8',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--primary)',
                  cursor: 'pointer'
                }}
                title="Reset Filters"
                type="button"
              >
                <X size={15} />
              </button>
            </div>
          </div>

        </div>

        {/* Tickets Queue Table */}
        <div className="panel" style={{ padding: '0', background: '#fff', overflow: 'hidden' }}>
          <div style={{ overflowX: 'auto' }}>
            <div className="table-responsive-wrapper">
<table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13.5px', textAlign: 'left', minWidth: '850px' }}>
              <thead>
                <tr style={{ background: 'var(--soft)', borderBottom: '1.5px solid #25108f' }}>
                  <th style={{ padding: '16px 20px', width: '40px' }}>
                    <input type="checkbox" aria-label="Select all tickets" />
                  </th>
                  <th style={{ padding: '16px 20px', color: 'var(--muted)', fontWeight: '800', textTransform: 'uppercase', fontSize: '10.5px' }}>Ticket ID</th>
                  <th style={{ padding: '16px 20px', color: 'var(--muted)', fontWeight: '800', textTransform: 'uppercase', fontSize: '10.5px' }}>User</th>
                  <th style={{ padding: '16px 20px', color: 'var(--muted)', fontWeight: '800', textTransform: 'uppercase', fontSize: '10.5px' }}>Category</th>
                  <th style={{ padding: '16px 20px', color: 'var(--muted)', fontWeight: '800', textTransform: 'uppercase', fontSize: '10.5px' }}>Priority</th>
                  <th style={{ padding: '16px 20px', color: 'var(--muted)', fontWeight: '800', textTransform: 'uppercase', fontSize: '10.5px' }}>Status</th>
                  <th style={{ padding: '16px 20px', color: 'var(--muted)', fontWeight: '800', textTransform: 'uppercase', fontSize: '10.5px' }}>Assigned Agent</th>
                  <th style={{ padding: '16px 20px', color: 'var(--muted)', fontWeight: '800', textTransform: 'uppercase', fontSize: '10.5px' }}>Created Date</th>
                  <th style={{ padding: '16px 20px', width: '50px' }}></th>
                </tr>
              </thead>
              <tbody>
                {paginatedTickets.length === 0 ? (
                  <tr>
                    <td colSpan={9} style={{ padding: '48px', textAlign: 'center', color: 'var(--muted)' }}>
                      No support tickets found matching the search criteria or filters.
                    </td>
                  </tr>
                ) : (
                  paginatedTickets.map((tk) => (
                    <tr key={tk.id} style={{ borderBottom: '1px solid var(--lavender)', position: 'relative' }}>
                      <td style={{ padding: '16px 20px' }}>
                        <input type="checkbox" aria-label={`Select ticket ${tk.id}`} />
                      </td>
                      
                      {/* Ticket ID Link */}
                      <td style={{ padding: '16px 20px' }}>
                        <button
                          onClick={() => navigate(ROUTES.supportDetails.replace(':id', tk.id.replace('#', '')))}
                          style={{
                            border: 'none',
                            background: 'transparent',
                            fontWeight: '850',
                            color: 'var(--primary)',
                            padding: 0,
                            cursor: 'pointer',
                            fontSize: '13.5px'
                          }}
                          type="button"
                        >
                          {tk.id}
                        </button>
                      </td>

                      {/* User Column */}
                      <td style={{ padding: '16px 20px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                          <div style={{
                            height: '32px',
                            width: '32px',
                            borderRadius: '50%',
                            background: tk.user.bg,
                            color: tk.user.color,
                            fontSize: '11px',
                            fontWeight: '850',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                          }}>
                            {tk.user.initials}
                          </div>
                          <div>
                            <strong style={{ display: 'block', color: 'var(--text)', fontSize: '13px' }}>
                              {tk.user.name}
                            </strong>
                            <span style={{ fontSize: '11px', color: 'var(--muted)' }}>
                              {tk.user.email}
                            </span>
                          </div>
                        </div>
                      </td>

                      {/* Category */}
                      <td style={{ padding: '16px 20px' }}>
                        <span style={{
                          fontSize: '11px',
                          fontWeight: '750',
                          color: '#4638af',
                          background: 'rgba(70, 56, 175, 0.08)',
                          padding: '3px 8px',
                          borderRadius: '4px'
                        }}>
                          {tk.category}
                        </span>
                      </td>

                      {/* Priority */}
                      <td style={{ padding: '16px 20px' }}>
                        <span style={{
                          fontSize: '9.5px',
                          fontWeight: '900',
                          padding: '3px 8px',
                          borderRadius: '4px',
                          textTransform: 'uppercase',
                          background: tk.priority === 'Critical' ? '#fee2e2' : tk.priority === 'High' ? '#ffe8e8' : tk.priority === 'Medium' ? '#eff6ff' : '#f3f4f6',
                          color: tk.priority === 'Critical' ? '#dc2626' : tk.priority === 'High' ? '#ef4444' : tk.priority === 'Medium' ? '#2563eb' : '#4b5563'
                        }}>
                          {tk.priority}
                        </span>
                      </td>

                      {/* Status */}
                      <td style={{ padding: '16px 20px' }}>
                        <span style={{
                          fontSize: '9.5px',
                          fontWeight: '900',
                          padding: '3px 8px',
                          borderRadius: '4px',
                          background: tk.status === 'OPEN' ? '#d1fae5' : tk.status === 'IN PROGRESS' ? '#dbeafe' : '#f3f4f6',
                          color: tk.status === 'OPEN' ? '#07956f' : tk.status === 'IN PROGRESS' ? '#1e40af' : '#4b5563'
                        }}>
                          {tk.status}
                        </span>
                      </td>

                      {/* Agent */}
                      <td style={{ padding: '16px 20px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          {tk.agent.avatar ? (
                            <img
                              src={tk.agent.avatar}
                              alt={tk.agent.name}
                              style={{ height: '24px', width: '24px', borderRadius: '50%', objectFit: 'cover' }}
                            />
                          ) : (
                            <div style={{
                              height: '24px',
                              width: '24px',
                              borderRadius: '50%',
                              background: '#e5e7eb',
                              color: '#6b7280',
                              fontSize: '9.5px',
                              fontWeight: '800',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center'
                            }}>
                              {tk.agent.initials}
                            </div>
                          )}
                          <span style={{ color: tk.agent.name === 'Unassigned' ? '#9ca3af' : 'var(--text)', fontWeight: '600' }}>
                            {tk.agent.name}
                          </span>
                        </div>
                      </td>

                      {/* Created Date */}
                      <td style={{ padding: '16px 20px', color: 'var(--muted)', fontWeight: '600' }}>
                        {tk.createdDate}
                      </td>

                      {/* Actions Menu */}
                      <td style={{ padding: '16px 20px', position: 'relative' }}>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setActiveMenuId(activeMenuId === tk.id ? null : tk.id);
                          }}
                          style={{ border: 'none', background: 'transparent', cursor: 'pointer', color: 'var(--muted)' }}
                          aria-label="More actions"
                        >
                          <MoreVertical size={16} />
                        </button>

                        {/* Inline Actions dropdown */}
                        {activeMenuId === tk.id && (
                          <div style={{
                            position: 'absolute',
                            right: '30px',
                            top: '40px',
                            background: '#fff',
                            border: '1.5px solid #25108f',
                            borderRadius: '6px',
                            boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
                            zIndex: 10,
                            display: 'flex',
                            flexDirection: 'column',
                            minWidth: '130px'
                          }}>
                            <button
                              onClick={() => handleActionClick(tk.id, 'view')}
                              style={{ padding: '10px 14px', border: 'none', background: 'transparent', cursor: 'pointer', fontSize: '12.5px', textAlign: 'left', display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text)' }}
                              type="button"
                            >
                              <Eye size={13} />
                              <span>View Details</span>
                            </button>
                            <button
                              onClick={() => handleActionClick(tk.id, 'assign')}
                              style={{ padding: '10px 14px', border: 'none', background: 'transparent', cursor: 'pointer', fontSize: '12.5px', textAlign: 'left', display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text)', borderTop: '1px solid var(--soft)' }}
                              type="button"
                            >
                              <User size={13} />
                              <span>Assign Agent</span>
                            </button>
                            <button
                              onClick={() => handleActionClick(tk.id, 'close')}
                              style={{ padding: '10px 14px', border: 'none', background: 'transparent', cursor: 'pointer', fontSize: '12.5px', textAlign: 'left', display: 'flex', alignItems: 'center', gap: '8px', color: '#dc2626', borderTop: '1px solid var(--soft)' }}
                              type="button"
                            >
                              <CheckCircle size={13} />
                              <span>Close Ticket</span>
                            </button>
                          </div>
                        )}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
</div>
          </div>

          {/* Table pagination footer */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '16px 20px',
            borderTop: '1px solid var(--lavender)',
            background: '#fff',
            flexWrap: 'wrap',
            gap: '12px'
          }}>
            <span style={{ fontSize: '12.5px', color: 'var(--muted)', fontWeight: '600' }}>
              Showing {filteredTickets.length === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1} to {Math.min(currentPage * itemsPerPage, filteredTickets.length)} of {filteredTickets.length} results
            </span>

            <div style={{ display: 'flex', gap: '4px', alignItems: 'center' }}>
              <button 
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                style={{ height: '28px', width: '28px', borderRadius: '4px', border: '1.5px solid #25108f', background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: currentPage === 1 ? 'not-allowed' : 'pointer', color: 'var(--muted)', opacity: currentPage === 1 ? 0.5 : 1 }} 
                aria-label="Previous page">
                <ChevronLeft size={14} style={{ margin: 'auto' }} />
              </button>
              
              {Array.from({ length: Math.min(5, totalPages) }).map((_, idx) => {
                let pageNum = currentPage;
                if (totalPages <= 5) pageNum = idx + 1;
                else if (currentPage <= 3) pageNum = idx + 1;
                else if (currentPage >= totalPages - 2) pageNum = totalPages - 4 + idx;
                else pageNum = currentPage - 2 + idx;

                return (
                  <button 
                    key={pageNum}
                    onClick={() => setCurrentPage(pageNum)}
                    style={{ height: '28px', minWidth: '28px', padding: '0 8px', borderRadius: '4px', border: pageNum === currentPage ? 'none' : '1.5px solid #25108f', background: pageNum === currentPage ? 'var(--primary)' : '#fff', color: pageNum === currentPage ? '#fff' : 'var(--muted)', fontSize: '12.5px', fontWeight: pageNum === currentPage ? '800' : '750', cursor: 'pointer' }}>
                    {pageNum}
                  </button>
                );
              })}

              {totalPages > 5 && currentPage < totalPages - 2 && (
                <>
                  <span style={{ fontSize: '12.5px', color: 'var(--muted)', padding: '0 4px' }}>...</span>
                  <button 
                    onClick={() => setCurrentPage(totalPages)}
                    style={{ height: '28px', minWidth: '28px', padding: '0 8px', borderRadius: '4px', border: '1.5px solid #25108f', background: '#fff', color: 'var(--muted)', fontSize: '12.5px', fontWeight: '750', cursor: 'pointer' }}>
                    {totalPages}
                  </button>
                </>
              )}

              <button 
                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                style={{ height: '28px', width: '28px', borderRadius: '4px', border: '1.5px solid #25108f', background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: currentPage === totalPages ? 'not-allowed' : 'pointer', color: 'var(--muted)', opacity: currentPage === totalPages ? 0.5 : 1 }} 
                aria-label="Next page">
                <ChevronRight size={14} style={{ margin: 'auto' }} />
              </button>
            </div>
          </div>
        </div>

      </div>

      {/* Calendar Portal — renders outside all overflow:hidden containers */}
      {showDatePicker && ReactDOM.createPortal(
        <div
          id="date-range-portal"
          style={{
            position: 'fixed',
            top: calendarPos.top,
            left: calendarPos.left,
            zIndex: 99999,
            boxShadow: '0 8px 32px rgba(0,0,0,0.18)',
            borderRadius: '12px',
            overflow: 'hidden',
            background: '#fff',
            border: '1.5px solid #e5e7eb'
          }}
        >
          <DateRange
            editableDateInputs={true}
            onChange={item => setDateRange([item.selection])}
            moveRangeOnFirstSelection={false}
            ranges={dateRange}
            rangeColors={['#25108f']}
          />
          <div style={{ padding: '12px 16px', borderTop: '1px solid #eee', textAlign: 'right', background: '#f9f9f9', display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
            <button
              onClick={() => setShowDatePicker(false)}
              style={{ padding: '6px 14px', background: '#fff', color: '#25108f', border: '1.5px solid #25108f', borderRadius: '6px', cursor: 'pointer', fontSize: '12px', fontWeight: '700' }}
              type="button"
            >
              Cancel
            </button>
            <button 
              onClick={() => setShowDatePicker(false)}
              style={{ padding: '6px 16px', background: '#25108f', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '12px', fontWeight: '700' }}
              type="button"
            >
              Apply Range
            </button>
          </div>
        </div>,
        document.body
      )}
    </AdminShell>
  );
}


