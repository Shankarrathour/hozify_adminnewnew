import React, { useState } from 'react';
import { 
  Eye, 
  Check, 
  X, 
  Filter, 
  RotateCcw, 
  ChevronLeft, 
  ChevronRight, 
  ArrowUpRight, 
  TrendingUp, 
  TrendingDown,
  Plus,
  Compass,
  FileText,
  ChevronDown
} from 'lucide-react';
import AdminShell from '../../components/layouts/AdminShell';
import { useApp } from '../../hooks/useApp';
import { ROUTES } from '../../config/routes';
import { useToast } from '../../components/common/ToastNotification';

import Select from "../../components/ui/Select";

const initialRequests = [
  { id: 'REQ-8902', bookingId: 'BK-2024-112', type: 'Premium Oak Flooring', qty: '450 sq ft', cost: '$12,450.00', status: 'Pending', branch: 'North Hub' },
  { id: 'REQ-8899', bookingId: 'BK-2024-098', type: 'Industrial Copper Piping', qty: '120 Units', cost: '$4,200.00', status: 'Approved', branch: 'South Hub' },
  { id: 'REQ-8895', bookingId: 'BK-2024-105', type: 'Reinforced Steel Beams', qty: '15 Units', cost: '$28,900.00', status: 'Rejected', branch: 'East Hub' },
  { id: 'REQ-8890', bookingId: 'BK-2024-121', type: 'External Facade Panels', qty: '2,000 sq ft', cost: '$45,000.00', status: 'Pending', branch: 'West Hub' },
  { id: 'REQ-8888', bookingId: 'BK-2024-130', type: 'Smart Lighting Controllers', qty: '64 Units', cost: '$18,200.00', status: 'Approved', branch: 'North Hub' }
];

export default function MaterialRequests() {
  const { navigate } = useApp();
  const { addToast } = useToast();
  
  // Filter states
  const [bookingId, setBookingId] = useState('BK-2024-');
  const [materialType, setMaterialType] = useState('All Types');
  const [branch, setBranch] = useState('All Branches');
  const [status, setStatus] = useState('All Statuses');

  // Hardcoded table data mimicking Screen 4
  const [requests, setRequests] = useState(initialRequests);

  const handleFilter = () => {
    let filtered = initialRequests;
    
    if (bookingId && bookingId.trim() !== '' && bookingId !== 'BK-2024-') {
      filtered = filtered.filter(req => req.bookingId.toLowerCase().includes(bookingId.toLowerCase()));
    }
    if (materialType !== 'All Types') {
      filtered = filtered.filter(req => {
        if (materialType === 'Structural') return req.type.includes('Steel') || req.type.includes('Facade');
        if (materialType === 'Electrical' || materialType === 'Lighting') return req.type.includes('Lighting');
        return req.type.toLowerCase().includes(materialType.toLowerCase());
      });
    }
    if (branch !== 'All Branches') {
      filtered = filtered.filter(req => req.branch === branch);
    }
    if (status !== 'All Statuses') {
      filtered = filtered.filter(req => req.status === status);
    }
    
    setRequests(filtered);
  };

  const handleResetFilters = () => {
    setBookingId('BK-2024-');
    setMaterialType('All Types');
    setBranch('All Branches');
    setStatus('All Statuses');
    setRequests(initialRequests);
  };

  const handleRowClick = (reqId) => {
    navigate(ROUTES.materialDetails);
  };

  const handleCreateRequest = () => {
    navigate(ROUTES.materialCreate);
  };

  const handleAction = (event, reqId, action) => {
    event.stopPropagation();
    
    // Update the master mock data so filters remain accurate
    const itemIndex = initialRequests.findIndex(r => r.id === reqId);
    if (itemIndex > -1) {
      initialRequests[itemIndex].status = action;
    }
    
    // Update local table state
    setRequests(prev => prev.map(req => req.id === reqId ? { ...req, status: action } : req));
    
    if (action === 'Approved') {
      addToast(`Request ${reqId} has been successfully approved.`, 'success');
    } else if (action === 'Rejected') {
      addToast(`Request ${reqId} has been rejected.`, 'error');
    }
  };

  return (
    <AdminShell showGlobalExport={true}
      activeTab="Material Requests"
      brandText="Hozify Procurement"
      brandSubText="EXECUTIVE COMMAND"
      searchPlaceholder="Search requests..."
      customProfileName="Admin User"
      customProfileRole="Procurement lead"
    >
      <div style={{ padding: '24px 0', display: 'flex', flexDirection: 'column', gap: 'var(--spacing-section)' }}>
        
        {/* Page Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <h1 style={{ fontSize: '24px', fontWeight: '800', color: 'var(--text)', margin: 0 }}>
              Material Requests
            </h1>
            <p style={{ fontSize: '14px', color: 'var(--muted)', marginTop: '4px', margin: 0 }}>
              Manage and approve procurement tasks across all branches.
            </p>
          </div>
          <div>
            <button
              onClick={handleCreateRequest}
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
                boxShadow: '0 4px 12px rgba(37,16,143,0.15)',
                transition: 'all 0.15s ease'
              }}
              onMouseOver={(e) => e.currentTarget.style.opacity = '0.9'}
              onMouseOut={(e) => e.currentTarget.style.opacity = '1'}
              type="button"
            >
              <Plus size={16} />
              <span>New Request</span>
            </button>
          </div>
        </div>

        {/* Stats Row */}
        <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
          
          {/* Stat Card 1 */}
          <div className="panel" style={{ flex: '1 1 200px', background: '#ffffff', border: '1.5px solid #25108f', borderRadius: '12px', padding: '16px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <span style={{ display: 'block', fontSize: '11px', fontWeight: '800', color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                Pending Approval
              </span>
              <strong style={{ display: 'block', fontSize: '28px', color: 'var(--text)', fontWeight: '800', marginTop: '6px' }}>
                24
              </strong>
            </div>
            <span style={{ fontSize: '11px', fontWeight: '800', color: '#dc2626', background: '#fef2f2', padding: '4px 8px', borderRadius: '4px', display: 'flex', alignItems: 'center', gap: '4px' }}>
              <TrendingUp size={12} /> +5%
            </span>
          </div>

          {/* Stat Card 2 */}
          <div className="panel" style={{ flex: '1 1 200px', background: '#ffffff', border: '1.5px solid #25108f', borderRadius: '12px', padding: '16px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <span style={{ display: 'block', fontSize: '11px', fontWeight: '800', color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                Active Requests
              </span>
              <strong style={{ display: 'block', fontSize: '28px', color: 'var(--text)', fontWeight: '800', marginTop: '6px' }}>
                156
              </strong>
            </div>
            <span style={{ fontSize: '11px', fontWeight: '800', color: 'var(--primary)', background: '#f5f3ff', padding: '4px 8px', borderRadius: '4px', display: 'flex', alignItems: 'center', gap: '4px' }}>
              <TrendingDown size={12} /> -2%
            </span>
          </div>
        </div>

        {/* Filter Panel */}
        <div className="panel" style={{ background: '#ffffff', border: '1.5px solid #25108f', borderRadius: '12px', padding: '20px' }}>
          <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', alignItems: 'flex-end' }}>
            
            {/* Booking ID Input */}
            <div style={{ flex: '1 1 180px' }}>
              <label style={{ display: 'block', fontSize: '11px', fontWeight: '800', color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '6px' }}>
                Booking ID
              </label>
              <input
                value={bookingId}
                onChange={(e) => setBookingId(e.target.value)}
                placeholder="BK-2024-..."
                style={{
                  width: '100%',
                  height: '38px',
                  background: '#ffffff',
                  border: '1.5px solid #25108f',
                  borderRadius: '6px',
                  padding: '0 12px',
                  fontSize: '13px',
                  color: 'var(--text)',
                  outline: 'none'
                }}
              />
            </div>

            {/* Material Type Dropdown */}
            <div style={{ flex: '1 1 180px' }}>
              <label style={{ display: 'block', fontSize: '11px', fontWeight: '800', color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '6px' }}>
                Material Type
              </label>
              <div style={{ position: 'relative' }}>
                <Select
                  value={materialType}
                  onChange={(e) => setMaterialType(e.target.value)}
                  style={{
                    width: '100%',
                    height: '38px',
                    background: '#ffffff',
                    border: '1.5px solid #25108f',
                    borderRadius: '6px',
                    padding: '0 12px',
                    fontSize: '13px',
                    color: 'var(--text)',
                    appearance: 'none',
                    outline: 'none',
                    fontWeight: '600'
                  }}
                  aria-label="Select material type"
                  options={[{
                    label: "All Types",
                    value: "All Types"
                  }, {
                    label: "Flooring",
                    value: "Flooring"
                  }, {
                    label: "Piping",
                    value: "Piping"
                  }, {
                    label: "Structural",
                    value: "Structural"
                  }, {
                    label: "Electrical",
                    value: "Electrical"
                  }, {
                    label: "Lighting",
                    value: "Lighting"
                  }]} />
                <div style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', color: '#7a7688' }}>
                  <ChevronDown size={14} />
                </div>
              </div>
            </div>

            {/* Branch Dropdown */}
            <div style={{ flex: '1 1 180px' }}>
              <label style={{ display: 'block', fontSize: '11px', fontWeight: '800', color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '6px' }}>
                Branch
              </label>
              <div style={{ position: 'relative' }}>
                <Select
                  value={branch}
                  onChange={(e) => setBranch(e.target.value)}
                  style={{
                    width: '100%',
                    height: '38px',
                    background: '#ffffff',
                    border: '1.5px solid #25108f',
                    borderRadius: '6px',
                    padding: '0 12px',
                    fontSize: '13px',
                    color: 'var(--text)',
                    appearance: 'none',
                    outline: 'none',
                    fontWeight: '600'
                  }}
                  aria-label="Select branch"
                  options={[{
                    label: "All Branches",
                    value: "All Branches"
                  }, {
                    label: "North Hub",
                    value: "North Hub"
                  }, {
                    label: "South Hub",
                    value: "South Hub"
                  }, {
                    label: "East Hub",
                    value: "East Hub"
                  }, {
                    label: "West Hub",
                    value: "West Hub"
                  }]} />
                <div style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', color: '#7a7688' }}>
                  <ChevronDown size={14} />
                </div>
              </div>
            </div>

            {/* Status Dropdown */}
            <div style={{ flex: '1 1 180px' }}>
              <label style={{ display: 'block', fontSize: '11px', fontWeight: '800', color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '6px' }}>
                Status
              </label>
              <div style={{ position: 'relative' }}>
                <Select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  style={{
                    width: '100%',
                    height: '38px',
                    background: '#ffffff',
                    border: '1.5px solid #25108f',
                    borderRadius: '6px',
                    padding: '0 12px',
                    fontSize: '13px',
                    color: 'var(--text)',
                    appearance: 'none',
                    outline: 'none',
                    fontWeight: '600'
                  }}
                  aria-label="Select status"
                  options={[{
                    label: "All Statuses",
                    value: "All Statuses"
                  }, {
                    label: "Pending",
                    value: "Pending"
                  }, {
                    label: "Approved",
                    value: "Approved"
                  }, {
                    label: "Rejected",
                    value: "Rejected"
                  }]} />
                <div style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', color: '#7a7688' }}>
                  <ChevronDown size={14} />
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div style={{ display: 'flex', gap: '8px' }}>
              <button
                onClick={handleFilter}
                style={{
                  height: '38px',
                  background: '#0b1329',
                  color: '#ffffff',
                  border: 'none',
                  borderRadius: '6px',
                  padding: '0 16px',
                  fontSize: '13px',
                  fontWeight: '700',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}
                type="button"
              >
                <Filter size={14} />
                <span>Filter</span>
              </button>
              <button
                onClick={handleResetFilters}
                style={{
                  height: '38px',
                  background: '#ffffff',
                  color: '#565365',
                  border: '1.5px solid #25108f',
                  borderRadius: '6px',
                  width: '38px',
                  padding: 0,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer'
                }}
                title="Reset filters"
                type="button"
              >
                <RotateCcw size={14} />
              </button>
            </div>
          </div>
        </div>

        {/* Requests Table Panel */}
        <div className="panel" style={{ background: '#ffffff', border: '1.5px solid #25108f', borderRadius: '12px', padding: '20px' }}>
          <div style={{ overflowY: 'auto', maxHeight: '400px' }}>
            <div className="table-responsive-wrapper">
<table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', minWidth: '700px' }}>
              <thead>
                <tr style={{ borderBottom: '1.5px solid #25108f' }}>
                  <th style={{ padding: '12px 8px', fontSize: '11px', fontWeight: '800', color: 'var(--muted)', textTransform: 'uppercase' }}>Request ID</th>
                  <th style={{ padding: '12px 8px', fontSize: '11px', fontWeight: '800', color: 'var(--muted)', textTransform: 'uppercase' }}>Booking ID</th>
                  <th style={{ padding: '12px 8px', fontSize: '11px', fontWeight: '800', color: 'var(--muted)', textTransform: 'uppercase' }}>Material Type</th>
                  <th style={{ padding: '12px 8px', fontSize: '11px', fontWeight: '800', color: 'var(--muted)', textTransform: 'uppercase' }}>Quantity</th>
                  <th style={{ padding: '12px 8px', fontSize: '11px', fontWeight: '800', color: 'var(--muted)', textTransform: 'uppercase' }}>Estimated Cost</th>
                  <th style={{ padding: '12px 8px', fontSize: '11px', fontWeight: '800', color: 'var(--muted)', textTransform: 'uppercase' }}>Status</th>
                  <th style={{ padding: '12px 8px', fontSize: '11px', fontWeight: '800', color: 'var(--muted)', textTransform: 'uppercase', textAlign: 'right', width: '120px' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {requests.map((req) => (
                  <tr 
                    key={req.id} 
                    onClick={() => handleRowClick(req.id)}
                    style={{ borderBottom: '1px solid #fcfaff', cursor: 'pointer', transition: 'background-color 0.15s ease' }}
                    onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#fcfaff'}
                    onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                  >
                    <td style={{ padding: '16px 8px', fontSize: '13px', fontWeight: '700', color: 'var(--text)' }}>
                      {req.id}
                    </td>
                    <td style={{ padding: '16px 8px', fontSize: '13px', color: '#565365' }}>
                      {req.bookingId}
                    </td>
                    <td style={{ padding: '16px 8px', fontSize: '13px', color: 'var(--text)', fontWeight: '600' }}>
                      {req.type}
                    </td>
                    <td style={{ padding: '16px 8px', fontSize: '13px', color: '#565365' }}>
                      {req.qty}
                    </td>
                    <td style={{ padding: '16px 8px', fontSize: '13px', fontWeight: '700', color: 'var(--text)' }}>
                      {req.cost}
                    </td>
                    <td style={{ padding: '16px 8px' }}>
                      <span
                        style={{
                          fontSize: '11px',
                          fontWeight: '800',
                          padding: '3px 8px',
                          borderRadius: '4px',
                          background: req.status === 'Pending' ? '#fef3c7' : req.status === 'Approved' ? '#ecfdf5' : '#fef2f2',
                          color: req.status === 'Pending' ? '#d97706' : req.status === 'Approved' ? '#059669' : '#dc2626'
                        }}
                      >
                        {req.status}
                      </span>
                    </td>
                    <td style={{ padding: '16px 8px', textAlign: 'right' }}>
                      <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
                        <button 
                          onClick={(e) => { e.stopPropagation(); navigate(ROUTES.materialDetails); }}
                          style={{ border: 'none', background: 'transparent', color: '#565365', cursor: 'pointer', padding: '4px' }}
                          title="View Details"
                          aria-label="View Details"
                          type="button"
                        >
                          <Eye size={16} />
                        </button>
                        <button 
                          onClick={(e) => handleAction(e, req.id, 'Approved')}
                          style={{ border: 'none', background: 'transparent', color: req.status === 'Pending' ? '#07956f' : '#cbd5e1', cursor: req.status === 'Pending' ? 'pointer' : 'default', padding: '4px' }}
                          disabled={req.status !== 'Pending'}
                          title="Approve"
                          aria-label="Approve"
                          type="button"
                        >
                          <Check size={16} />
                        </button>
                        <button 
                          onClick={(e) => handleAction(e, req.id, 'Rejected')}
                          style={{ border: 'none', background: 'transparent', color: req.status === 'Pending' ? '#d32929' : '#cbd5e1', cursor: req.status === 'Pending' ? 'pointer' : 'default', padding: '4px' }}
                          disabled={req.status !== 'Pending'}
                          title="Reject"
                          aria-label="Reject"
                          type="button"
                        >
                          <X size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
</div>
          </div>

          {/* Pagination Footer */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '20px', flexWrap: 'wrap', gap: '12px' }}>
            <span style={{ fontSize: '13px', color: '#565365' }}>
              Showing 1 to 5 of 156 entries
            </span>
            <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
              <button 
                onClick={() => addToast("You are already on the first page.", "info")}
                style={{ background: 'transparent', border: '1.5px solid #25108f', color: '#565365', borderRadius: '4px', width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
                aria-label="Previous Page"
                type="button"
              >
                <ChevronLeft size={16} />
              </button>
              <button 
                style={{ background: 'var(--primary)', border: 'none', color: '#ffffff', borderRadius: '4px', width: '32px', height: '32px', fontSize: '13px', fontWeight: '700', cursor: 'pointer' }}
                type="button"
              >
                1
              </button>
              <button 
                style={{ background: 'transparent', border: '1.5px solid #25108f', color: '#565365', borderRadius: '4px', width: '32px', height: '32px', fontSize: '13px', fontWeight: '700', cursor: 'pointer' }}
                type="button"
              >
                2
              </button>
              <button 
                style={{ background: 'transparent', border: '1.5px solid #25108f', color: '#565365', borderRadius: '4px', width: '32px', height: '32px', fontSize: '13px', fontWeight: '700', cursor: 'pointer' }}
                type="button"
              >
                3
              </button>
              <button 
                onClick={() => addToast("No more pages available.", "info")}
                style={{ background: 'transparent', border: '1.5px solid #25108f', color: '#565365', borderRadius: '4px', width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
                aria-label="Next Page"
                type="button"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Section Layout */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr', lgGridTemplateColumns: '2fr 1fr', gap: 'var(--spacing-section)' }}>
          
          {/* Automated Cost Optimization Card */}
          <div className="panel" style={{ background: '#1c2536', color: '#ffffff', borderRadius: '12px', padding: 'var(--spacing-section)', display: 'flex', flexDirection: 'column', gap: '16px', justifyContent: 'space-between' }}>
            <div>
              <h2 style={{ fontSize: '18px', fontWeight: '800', margin: 0 }}>
                Automated Cost Optimization
              </h2>
              <p style={{ fontSize: '13px', color: 'rgba(255, 255, 255, 0.7)', marginTop: '8px', margin: 0, lineHeight: '1.5', maxWidth: '500px' }}>
                Our smart procurement engine has identified $12.4k in potential savings across the current pending queue.
              </p>
            </div>
            <div>
              <button
                onClick={() => alert('Cost Optimization report loaded.')}
                style={{
                  background: '#4f46e5',
                  color: '#ffffff',
                  border: 'none',
                  borderRadius: '6px',
                  padding: '10px 20px',
                  fontSize: '13px',
                  fontWeight: '700',
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  transition: 'opacity 0.2s'
                }}
                onMouseOver={(e) => e.currentTarget.style.opacity = '0.9'}
                onMouseOut={(e) => e.currentTarget.style.opacity = '1'}
                type="button"
              >
                <span>View Analysis</span>
                <ArrowUpRight size={16} />
              </button>
            </div>
          </div>

          {/* Quick Analytics Card */}
          <div className="panel" style={{ background: '#ffffff', border: '1.5px solid #25108f', borderRadius: '12px', padding: 'var(--spacing-section)', display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <h3 style={{ fontSize: '15px', fontWeight: '800', color: 'var(--text)', margin: 0 }}>
              Quick Analytics
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                  <span style={{ fontSize: '13px', color: '#565365' }}>Request Velocity</span>
                  <span style={{ fontSize: '12px', fontWeight: '800', color: '#059669' }}>Optimal</span>
                </div>
                <div style={{ height: '6px', background: '#f3f4f6', borderRadius: '3px', overflow: 'hidden' }}>
                  <div style={{ width: '82%', height: '100%', background: 'var(--primary)', borderRadius: '3px' }} />
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid #fcfaff', paddingTop: '16px' }}>
                <span style={{ fontSize: '13px', color: '#565365' }}>Avg. Approval Time</span>
                <strong style={{ fontSize: '15px', fontWeight: '800', color: 'var(--text)' }}>4.2 Hours</strong>
              </div>
            </div>
          </div>
        </div>

      </div>
    </AdminShell>
  );
}


