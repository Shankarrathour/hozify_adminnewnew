import React, { useState } from 'react';
import {
  Search, ListFilter, DollarSign, Wallet, TrendingUp, Clock, ArrowUpRight, CheckCircle2, Download
} from 'lucide-react';
import { useToast } from '../../components/common/ToastNotification';

import Select from "../../components/ui/Select";

const MOCK_EARNINGS = [
  { id: 'EMP-001', name: 'John Doe', branch: 'Downtown HQ', base: 45000, incentive: 5500, total: 50500, status: 'PAID', date: 'Oct 01, 2026' },
  { id: 'EMP-002', name: 'Alice Smith', branch: 'North Suburbs', base: 42000, incentive: 3200, total: 45200, status: 'PENDING', date: 'Oct 01, 2026' },
  { id: 'EMP-003', name: 'Bob Johnson', branch: 'Westside Heights', base: 38000, incentive: 0, total: 38000, status: 'PAID', date: 'Oct 01, 2026' },
  { id: 'EMP-004', name: 'Eve Williams', branch: 'East River', base: 48000, incentive: 8500, total: 56500, status: 'PROCESSING', date: 'Oct 01, 2026' },
  { id: 'EMP-005', name: 'Charlie Brown', branch: 'Downtown HQ', base: 41000, incentive: 1200, total: 42200, status: 'PAID', date: 'Oct 01, 2026' },
];

const MOCK_TOP_EARNERS = [
  { name: 'Eve Williams', branch: 'East River', amount: '₹56,500' },
  { name: 'John Doe', branch: 'Downtown HQ', amount: '₹50,500' },
  { name: 'Sarah Jenkins', branch: 'North Suburbs', amount: '₹48,200' }
];

export default function EmployeeEarnings() {
  const { addToast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  const filteredEarnings = MOCK_EARNINGS.filter(e => {
    const matchSearch = e.name.toLowerCase().includes(searchTerm.toLowerCase()) || e.branch.toLowerCase().includes(searchTerm.toLowerCase());
    const matchStatus = statusFilter === 'All' || e.status === statusFilter;
    return matchSearch && matchStatus;
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-section)', paddingBottom: '40px' }}>
      {/* KPI Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '24px' }}>
        <div 
          onClick={() => addToast("Card clicked: Total Payout details", "success")}
          className="kpi-card" 
          style={{ padding: '12px', borderRadius: '12px', border: '1.5px solid #25108f', background: '#fff', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', minHeight: '80px', cursor: 'pointer' }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', width: '100%' }}>
            <div>
              <span style={{ fontSize: '9px', fontWeight: '800', color: 'var(--muted)', textTransform: 'uppercase', display: 'block' }}>Total Payout YTD</span>
              <strong style={{ display: 'block', fontSize: '18px', fontWeight: '800', color: 'var(--text)', marginTop: '4px' }}>₹12.4M</strong>
              <span style={{ fontSize: '9px', color: '#10b981', fontWeight: '700', marginTop: '2px', display: 'block' }}>+15% vs last year</span>
            </div>
            <div style={{ width: '28px', height: '28px', borderRadius: '8px', background: '#eff6ff', color: '#3b82f6', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Wallet size={14} />
            </div>
          </div>
        </div>

        <div 
          onClick={() => addToast("Card clicked: Monthly Earnings details", "success")}
          className="kpi-card" 
          style={{ padding: '12px', borderRadius: '12px', border: '1.5px solid #25108f', background: '#fff', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', minHeight: '80px', cursor: 'pointer' }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', width: '100%' }}>
            <div>
              <span style={{ fontSize: '9px', fontWeight: '800', color: 'var(--muted)', textTransform: 'uppercase', display: 'block' }}>Monthly Earnings (Oct)</span>
              <strong style={{ display: 'block', fontSize: '18px', fontWeight: '800', color: 'var(--text)', marginTop: '4px' }}>₹1.2M</strong>
              <span style={{ fontSize: '9px', color: '#10b981', fontWeight: '700', marginTop: '2px', display: 'block' }}>Estimated</span>
            </div>
            <div style={{ width: '28px', height: '28px', borderRadius: '8px', background: '#f0fdf4', color: '#10b981', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <DollarSign size={14} />
            </div>
          </div>
        </div>

        <div 
          onClick={() => addToast("Card clicked: Pending Payments list", "success")}
          className="kpi-card" 
          style={{ padding: '12px', borderRadius: '12px', border: '1.5px solid #25108f', background: '#fff', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', minHeight: '80px', cursor: 'pointer' }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', width: '100%' }}>
            <div>
              <span style={{ fontSize: '9px', fontWeight: '800', color: 'var(--muted)', textTransform: 'uppercase', display: 'block' }}>Pending Payments</span>
              <strong style={{ display: 'block', fontSize: '18px', fontWeight: '800', color: 'var(--text)', marginTop: '4px' }}>₹345K</strong>
              <span style={{ fontSize: '9px', color: '#f59e0b', fontWeight: '700', marginTop: '2px', display: 'block' }}>Processing cycle</span>
            </div>
            <div style={{ width: '28px', height: '28px', borderRadius: '8px', background: '#fef3c7', color: '#d97706', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Clock size={14} />
            </div>
          </div>
        </div>

        <div 
          onClick={() => addToast("Card clicked: Total Incentives details", "success")}
          className="kpi-card" 
          style={{ padding: '12px', borderRadius: '12px', border: '1.5px solid #25108f', background: '#fff', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', minHeight: '80px', cursor: 'pointer' }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', width: '100%' }}>
            <div>
              <span style={{ fontSize: '9px', fontWeight: '800', color: 'var(--muted)', textTransform: 'uppercase', display: 'block' }}>Total Incentives</span>
              <strong style={{ display: 'block', fontSize: '18px', fontWeight: '800', color: 'var(--text)', marginTop: '4px' }}>₹125K</strong>
              <span style={{ fontSize: '9px', color: '#10b981', fontWeight: '700', marginTop: '2px', display: 'block' }}>Performance bonus</span>
            </div>
            <div style={{ width: '28px', height: '28px', borderRadius: '8px', background: '#fdf2f8', color: '#ec4899', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <ArrowUpRight size={14} />
            </div>
          </div>
        </div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 'var(--spacing-section)' }}>
        
        {/* Left Column */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-section)' }}>
          
          <div className="panel" style={{ background: '#fff', border: '1.5px solid #25108f', borderRadius: '12px', padding: 'var(--spacing-section)', marginBottom: 0 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '12px' }}>
              <h3 style={{ fontSize: '16px', fontWeight: '800', color: 'var(--text)', margin: 0 }}>Earnings Directory</h3>
              <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                <div className="dash-search" style={{ margin: 0, height: '34px', border: '1.5px solid #25108f', borderRadius: '6px', width: '220px', display: 'flex', alignItems: 'center' }}>
                  <Search size={14} style={{ marginLeft: '12px', color: 'var(--muted)' }} />
                  <input
                    placeholder="Search employees..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    style={{ fontSize: '12px', border: 'none', background: 'transparent', outline: 'none', paddingLeft: '8px', flex: 1, color: 'var(--text)' }}
                  />
                </div>
                <Select
                  className="dash-select"
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  style={{ height: '34px', border: '1.5px solid #25108f', borderRadius: '6px', padding: '0 12px', fontSize: '12px', color: 'var(--text)', background: '#fff', outline: 'none', cursor: 'pointer', fontWeight: '700' }}
                  options={[{
                    label: "All Statuses",
                    value: "All"
                  }, {
                    label: "Paid",
                    value: "PAID"
                  }, {
                    label: "Processing",
                    value: "PROCESSING"
                  }, {
                    label: "Pending",
                    value: "PENDING"
                  }]} />
                <button 
                  onClick={() => addToast("Exporting earnings spreadsheet...", "success")}
                  style={{ height: '34px', padding: '0 12px', border: '1.5px solid #25108f', background: '#fff', borderRadius: '6px', display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', fontWeight: '700', color: 'var(--text)', cursor: 'pointer' }}
                >
                  <Download size={14} /> Export
                </button>
              </div>
            </div>

            <div className="table-wrap" style={{ overflowY: 'auto', maxHeight: '400px' }}>
              <div className="table-responsive-wrapper">
<table className="partner-table" style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', minWidth: '800px' }}>
                <thead>
                  <tr style={{ borderBottom: '1.5px solid #25108f' }}>
                    <th style={{ padding: '12px', fontSize: '11px', fontWeight: '800', color: 'var(--muted)', textTransform: 'uppercase' }}>Employee Name</th>
                    <th style={{ padding: '12px', fontSize: '11px', fontWeight: '800', color: 'var(--muted)', textTransform: 'uppercase' }}>Branch</th>
                    <th style={{ padding: '12px', fontSize: '11px', fontWeight: '800', color: 'var(--muted)', textTransform: 'uppercase', textAlign: 'right' }}>Base Salary</th>
                    <th style={{ padding: '12px', fontSize: '11px', fontWeight: '800', color: 'var(--muted)', textTransform: 'uppercase', textAlign: 'right' }}>Incentive</th>
                    <th style={{ padding: '12px', fontSize: '11px', fontWeight: '800', color: 'var(--muted)', textTransform: 'uppercase', textAlign: 'right' }}>Total Earnings</th>
                    <th style={{ padding: '12px', fontSize: '11px', fontWeight: '800', color: 'var(--muted)', textTransform: 'uppercase', paddingLeft: '24px' }}>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredEarnings.map((row) => (
                      <tr 
                        key={row.id} 
                        onClick={() => addToast(`Opening payout log for ${row.name}`, "success")}
                        className="partner-row-clickable"
                      >
                        <td style={{ padding: '12px' }}>
                          <strong style={{ display: 'block', fontSize: '13px', color: 'var(--text)' }}>{row.name}</strong>
                          <span style={{ fontSize: '11px', color: 'var(--muted)' }}>{row.id}</span>
                        </td>
                        <td style={{ padding: '12px', fontSize: '12px', color: 'var(--text)' }}>{row.branch}</td>
                        <td style={{ padding: '12px', fontSize: '13px', color: 'var(--text)', textAlign: 'right' }}>₹{row.base.toLocaleString()}</td>
                        <td style={{ padding: '12px', fontSize: '13px', color: '#10b981', fontWeight: '700', textAlign: 'right' }}>₹{row.incentive.toLocaleString()}</td>
                        <td style={{ padding: '12px', fontSize: '14px', color: 'var(--text)', fontWeight: '800', textAlign: 'right' }}>₹{row.total.toLocaleString()}</td>
                        <td style={{ padding: '12px', paddingLeft: '24px' }}>
                          <span style={{ fontSize: '10px', fontWeight: '800', padding: '4px 8px', borderRadius: '4px', background: row.status === 'PAID' ? '#d1fae5' : row.status === 'PROCESSING' ? '#e0e7ff' : '#fef3c7', color: row.status === 'PAID' ? '#059669' : row.status === 'PROCESSING' ? '#4f46e5' : '#d97706' }}>
                            {row.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                    {filteredEarnings.length === 0 && (
                      <tr>
                        <td colSpan="6" style={{ padding: 'var(--spacing-section)', textAlign: 'center', color: 'var(--muted)', fontSize: '13px' }}>
                          No earnings records found.
                        </td>
                      </tr>
                    )}
                </tbody>
              </table>
</div>
            </div>
          </div>

        </div>

        {/* Right Column */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-section)' }}>
          
          <div className="panel" style={{ background: '#fff', border: '1.5px solid #25108f', borderRadius: '12px', padding: 'var(--spacing-section)', marginBottom: 0 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
              <TrendingUp size={18} style={{ color: '#10b981' }} />
              <h3 style={{ fontSize: '15px', fontWeight: '800', color: 'var(--text)', margin: 0 }}>Highest Earning Employees</h3>
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {MOCK_TOP_EARNERS.map((emp, i) => (
                <div 
                  key={i} 
                  onClick={() => addToast(`Viewing profile highlights of ${emp.name}`, "success")}
                  style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px', borderRadius: '8px', background: '#f8fafc', border: '1.5px solid #25108f', cursor: 'pointer' }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{ width: '32px', height: '32px', borderRadius: '16px', background: '#d1fae5', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#059669', fontSize: '13px', fontWeight: '800' }}>
                      {i + 1}
                    </div>
                    <div>
                      <strong style={{ display: 'block', fontSize: '13px', color: 'var(--text)' }}>{emp.name}</strong>
                      <span style={{ fontSize: '11px', color: 'var(--muted)' }}>{emp.branch}</span>
                    </div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <strong style={{ display: 'block', fontSize: '14px', color: 'var(--text)' }}>{emp.amount}</strong>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="panel" style={{ background: '#fff', border: '1.5px solid #25108f', borderRadius: '12px', padding: 'var(--spacing-section)', marginBottom: 0 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
              <Wallet size={18} style={{ color: '#4f46e5' }} />
              <h3 style={{ fontSize: '15px', fontWeight: '800', color: 'var(--text)', margin: 0 }}>Earnings Trend (YTD)</h3>
            </div>
            
            <div style={{ height: '200px', display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: '8px', padding: '16px 0 0 0' }}>
              {/* Dummy bar chart */}
              {[40, 55, 45, 60, 75, 65, 80, 95].map((h, i) => (
                <div key={i} style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
                  <div style={{ width: '100%', height: `${h}%`, background: i === 7 ? '#4f46e5' : '#e0e7ff', borderRadius: '4px 4px 0 0' }} />
                  <span style={{ fontSize: '10px', color: 'var(--muted)' }}>{['Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'][i]}</span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}


