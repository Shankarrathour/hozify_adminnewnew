import React, { useState } from 'react';
import {
  Search, CheckCircle2, AlertCircle, Clock, ShieldAlert, Eye, X, Fingerprint, CreditCard, Building
} from 'lucide-react';
import { useToast } from '../../components/common/ToastNotification';

import Select from "../../components/ui/Select";

const MOCK_KYC = [
  { id: 'KYC-501', employee: 'John Doe', aadhaar: 'VERIFIED', pan: 'VERIFIED', bank: 'VERIFIED', date: 'Sep 10, 2025', status: 'APPROVED' },
  { id: 'KYC-502', employee: 'Alice Smith', aadhaar: 'VERIFIED', pan: 'PENDING', bank: 'PENDING', date: 'Oct 05, 2026', status: 'PENDING' },
  { id: 'KYC-503', employee: 'Bob Johnson', aadhaar: 'VERIFIED', pan: 'REJECTED', bank: 'VERIFIED', date: 'Jan 15, 2024', status: 'REJECTED' },
  { id: 'KYC-504', employee: 'Eve Williams', aadhaar: 'VERIFIED', pan: 'VERIFIED', bank: 'VERIFIED', date: 'Oct 12, 2026', status: 'APPROVED' },
  { id: 'KYC-505', employee: 'Charlie Brown', aadhaar: 'PENDING', pan: 'PENDING', bank: 'PENDING', date: 'Oct 14, 2026', status: 'PENDING' },
];

export default function EmployeeKyc() {
  const { addToast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [previewKyc, setPreviewKyc] = useState(null);

  const filteredKyc = MOCK_KYC.filter(k => {
    const matchSearch = k.employee.toLowerCase().includes(searchTerm.toLowerCase());
    const matchStatus = statusFilter === 'All' || k.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const getStatusBadge = (status) => {
    switch(status) {
      case 'VERIFIED':
      case 'APPROVED':
        return <span style={{ fontSize: '10px', fontWeight: '800', padding: '4px 8px', borderRadius: '4px', background: '#d1fae5', color: '#059669' }}>{status}</span>;
      case 'PENDING':
        return <span style={{ fontSize: '10px', fontWeight: '800', padding: '4px 8px', borderRadius: '4px', background: '#fef3c7', color: '#d97706' }}>{status}</span>;
      case 'REJECTED':
        return <span style={{ fontSize: '10px', fontWeight: '800', padding: '4px 8px', borderRadius: '4px', background: '#fee2e2', color: '#dc2626' }}>{status}</span>;
      default:
        return null;
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-section)', paddingBottom: '40px' }}>
      {/* KPI Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '24px' }}>
        <div 
          onClick={() => addToast("Card clicked: Total KYC Submitted details", "success")}
          className="kpi-card" 
          style={{ padding: '12px', borderRadius: '12px', border: '1.5px solid #25108f', background: '#fff', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', minHeight: '80px', cursor: 'pointer' }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', width: '100%' }}>
            <div>
              <span style={{ fontSize: '9px', fontWeight: '800', color: 'var(--muted)', textTransform: 'uppercase', display: 'block' }}>Total KYC Submitted</span>
              <strong style={{ display: 'block', fontSize: '18px', fontWeight: '800', color: 'var(--text)', marginTop: '4px' }}>842</strong>
            </div>
            <div style={{ width: '28px', height: '28px', borderRadius: '8px', background: '#eff6ff', color: '#3b82f6', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <ShieldAlert size={14} />
            </div>
          </div>
        </div>

        <div 
          onClick={() => addToast("Card clicked: Approved KYC metrics", "success")}
          className="kpi-card" 
          style={{ padding: '12px', borderRadius: '12px', border: '1.5px solid #25108f', background: '#fff', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', minHeight: '80px', cursor: 'pointer' }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', width: '100%' }}>
            <div>
              <span style={{ fontSize: '9px', fontWeight: '800', color: 'var(--muted)', textTransform: 'uppercase', display: 'block' }}>Approved KYC</span>
              <strong style={{ display: 'block', fontSize: '18px', fontWeight: '800', color: 'var(--text)', marginTop: '4px' }}>715</strong>
            </div>
            <div style={{ width: '28px', height: '28px', borderRadius: '8px', background: '#f0fdf4', color: '#10b981', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <CheckCircle2 size={14} />
            </div>
          </div>
        </div>

        <div 
          onClick={() => addToast("Card clicked: Pending Review list", "success")}
          className="kpi-card" 
          style={{ padding: '12px', borderRadius: '12px', border: '1.5px solid #25108f', background: '#fff', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', minHeight: '80px', cursor: 'pointer' }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', width: '100%' }}>
            <div>
              <span style={{ fontSize: '9px', fontWeight: '800', color: 'var(--muted)', textTransform: 'uppercase', display: 'block' }}>Pending Review</span>
              <strong style={{ display: 'block', fontSize: '18px', fontWeight: '800', color: 'var(--text)', marginTop: '4px' }}>84</strong>
            </div>
            <div style={{ width: '28px', height: '28px', borderRadius: '8px', background: '#fef3c7', color: '#d97706', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Clock size={14} />
            </div>
          </div>
        </div>

        <div 
          onClick={() => addToast("Card clicked: Rejected KYC metrics", "success")}
          className="kpi-card" 
          style={{ padding: '12px', borderRadius: '12px', border: '1.5px solid #25108f', background: '#fff', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', minHeight: '80px', cursor: 'pointer' }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', width: '100%' }}>
            <div>
              <span style={{ fontSize: '9px', fontWeight: '800', color: 'var(--muted)', textTransform: 'uppercase', display: 'block' }}>Rejected KYC</span>
              <strong style={{ display: 'block', fontSize: '18px', fontWeight: '800', color: 'var(--text)', marginTop: '4px' }}>43</strong>
            </div>
            <div style={{ width: '28px', height: '28px', borderRadius: '8px', background: '#fef2f2', color: '#ef4444', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <AlertCircle size={14} />
            </div>
          </div>
        </div>
      </div>
      <div className="panel" style={{ background: '#fff', border: '1.5px solid #25108f', borderRadius: '12px', padding: 'var(--spacing-section)', marginBottom: 0 }}>
        <div style={{ display: 'flex', justifycontent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '12px' }}>
          <h3 style={{ fontSize: '16px', fontWeight: '800', color: 'var(--text)', margin: 0 }}>KYC Applications</h3>
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginLeft: 'auto' }}>
            <div className="dash-search" style={{ margin: 0, height: '34px', border: '1.5px solid #25108f', borderRadius: '6px', width: '220px', display: 'flex', alignItems: 'center' }}>
              <Search size={14} style={{ marginLeft: '12px', color: 'var(--muted)' }} />
              <input
                placeholder="Search employees..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{ fontSize: '12px', border: 'none', background: 'transparent', outline: 'none', paddingLeft: '8px', flex: 1 }}
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
                label: "Approved",
                value: "APPROVED"
              }, {
                label: "Pending",
                value: "PENDING"
              }, {
                label: "Rejected",
                value: "REJECTED"
              }]} />
          </div>
        </div>

        <div className="table-wrap" style={{ overflowY: 'auto', maxHeight: '400px' }}>
          <div className="table-responsive-wrapper">
<table className="partner-table" style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', minWidth: '900px' }}>
            <thead>
              <tr style={{ borderBottom: '1.5px solid #25108f' }}>
                <th style={{ padding: '12px', fontSize: '11px', fontWeight: '800', color: 'var(--muted)', textTransform: 'uppercase' }}>Employee</th>
                <th style={{ padding: '12px', fontSize: '11px', fontWeight: '800', color: 'var(--muted)', textTransform: 'uppercase' }}>Aadhaar Status</th>
                <th style={{ padding: '12px', fontSize: '11px', fontWeight: '800', color: 'var(--muted)', textTransform: 'uppercase' }}>PAN Status</th>
                <th style={{ padding: '12px', fontSize: '11px', fontWeight: '800', color: 'var(--muted)', textTransform: 'uppercase' }}>Bank Verification</th>
                <th style={{ padding: '12px', fontSize: '11px', fontWeight: '800', color: 'var(--muted)', textTransform: 'uppercase' }}>Submitted Date</th>
                <th style={{ padding: '12px', fontSize: '11px', fontWeight: '800', color: 'var(--muted)', textTransform: 'uppercase' }}>Overall Status</th>
                <th style={{ padding: '12px', fontSize: '11px', fontWeight: '800', color: 'var(--muted)', textTransform: 'uppercase', textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredKyc.map((row) => (
                  <tr key={row.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                    <td style={{ padding: '12px' }}>
                      <strong style={{ display: 'block', fontSize: '13px', color: 'var(--text)' }}>{row.employee}</strong>
                      <span style={{ fontSize: '11px', color: 'var(--muted)' }}>{row.id}</span>
                    </td>
                    <td style={{ padding: '12px' }}>{getStatusBadge(row.aadhaar)}</td>
                    <td style={{ padding: '12px' }}>{getStatusBadge(row.pan)}</td>
                    <td style={{ padding: '12px' }}>{getStatusBadge(row.bank)}</td>
                    <td style={{ padding: '12px', fontSize: '12px', color: 'var(--muted)' }}>{row.date}</td>
                    <td style={{ padding: '12px' }}>{getStatusBadge(row.status)}</td>
                    <td style={{ padding: '12px', textAlign: 'right' }}>
                      <button 
                        onClick={() => { setPreviewKyc(row); addToast(`Reviewing KYC verification for ${row.employee}`, "success"); }} 
                        style={{ background: '#f8fafc', border: '1.5px solid #25108f', color: 'var(--text)', cursor: 'pointer', fontSize: '12px', padding: '6px 12px', borderRadius: '6px', fontWeight: '700' }}
                      >
                        Review
                      </button>
                    </td>
                  </tr>
                ))}
                {filteredKyc.length === 0 && (
                  <tr>
                    <td colSpan="7" style={{ padding: 'var(--spacing-section)', textAlign: 'center', color: 'var(--muted)', fontSize: '13px' }}>
                      No KYC records found.
                    </td>
                  </tr>
                )}
            </tbody>
          </table>
</div>
        </div>
      </div>
      {/* KYC Review Drawer */}
      {previewKyc && (
        <>
          <div 
            style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(15, 23, 42, 0.4)', backdropFilter: 'blur(4px)', zIndex: 999 }}
            onClick={() => setPreviewKyc(null)}
          />
          <div style={{ position: 'fixed', top: 0, right: 0, bottom: 0, width: '480px', background: '#fff', zIndex: 1000, boxShadow: '-8px 0 24px rgba(0,0,0,0.1)', display: 'flex', flexDirection: 'column' }}>
            <div style={{ padding: 'var(--spacing-section)', borderBottom: '1.5px solid #25108f', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#f8fafc' }}>
              <div>
                <h3 style={{ fontSize: '16px', fontWeight: '800', color: 'var(--text)', margin: 0 }}>KYC Review</h3>
                <span style={{ fontSize: '12px', color: 'var(--muted)' }}>{previewKyc.employee} ({previewKyc.id})</span>
              </div>
              <button onClick={() => setPreviewKyc(null)} style={{ background: 'transparent', border: 'none', color: 'var(--muted)', cursor: 'pointer', padding: '4px' }}>
                <X size={18} />
              </button>
            </div>
            
            <div style={{ padding: 'var(--spacing-section)', flex: 1, overflowY: 'auto' }}>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                {/* Aadhaar Section */}
                <div style={{ border: '1.5px solid #25108f', borderRadius: '12px', overflow: 'hidden' }}>
                  <div style={{ padding: '16px', background: '#f8fafc', borderBottom: '1.5px solid #25108f', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <Fingerprint size={16} style={{ color: 'var(--muted)' }} />
                      <strong style={{ fontSize: '13px', color: 'var(--text)' }}>Aadhaar Verification</strong>
                    </div>
                    {getStatusBadge(previewKyc.aadhaar)}
                  </div>
                  <div style={{ padding: '16px', display: 'flex', gap: '16px' }}>
                    <div style={{ flex: 1, height: '120px', background: '#f1f5f9', borderRadius: '8px', border: '1px dashed #cbd5e1', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <span style={{ fontSize: '11px', color: 'var(--muted)', fontWeight: '700' }}>Front Image</span>
                    </div>
                    <div style={{ flex: 1, height: '120px', background: '#f1f5f9', borderRadius: '8px', border: '1px dashed #cbd5e1', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <span style={{ fontSize: '11px', color: 'var(--muted)', fontWeight: '700' }}>Back Image</span>
                    </div>
                  </div>
                </div>

                {/* PAN Section */}
                <div style={{ border: '1.5px solid #25108f', borderRadius: '12px', overflow: 'hidden' }}>
                  <div style={{ padding: '16px', background: '#f8fafc', borderBottom: '1.5px solid #25108f', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <CreditCard size={16} style={{ color: 'var(--muted)' }} />
                      <strong style={{ fontSize: '13px', color: 'var(--text)' }}>PAN Verification</strong>
                    </div>
                    {getStatusBadge(previewKyc.pan)}
                  </div>
                  <div style={{ padding: '16px' }}>
                    <div style={{ height: '120px', background: '#f1f5f9', borderRadius: '8px', border: '1px dashed #cbd5e1', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <span style={{ fontSize: '11px', color: 'var(--muted)', fontWeight: '700' }}>PAN Image</span>
                    </div>
                  </div>
                </div>

                {/* Bank Section */}
                <div style={{ border: '1.5px solid #25108f', borderRadius: '12px', overflow: 'hidden' }}>
                  <div style={{ padding: '16px', background: '#f8fafc', borderBottom: '1.5px solid #25108f', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <Building size={16} style={{ color: 'var(--muted)' }} />
                      <strong style={{ fontSize: '13px', color: 'var(--text)' }}>Bank Verification</strong>
                    </div>
                    {getStatusBadge(previewKyc.bank)}
                  </div>
                  <div style={{ padding: '16px' }}>
                    <div style={{ height: '120px', background: '#f1f5f9', borderRadius: '8px', border: '1px dashed #cbd5e1', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <span style={{ fontSize: '11px', color: 'var(--muted)', fontWeight: '700' }}>Cancelled Cheque / Passbook</span>
                    </div>
                  </div>
                </div>

              </div>
            </div>

            <div style={{ padding: '20px', borderTop: '1.5px solid #25108f', display: 'flex', gap: '12px' }}>
              <button 
                onClick={() => { setPreviewKyc(null); addToast(`KYC submission rejected for ${previewKyc.employee}`, "success"); }}
                style={{ flex: 1, padding: '10px', background: '#fff', border: '1px solid #ef4444', borderRadius: '8px', color: '#ef4444', fontSize: '13px', fontWeight: '700', cursor: 'pointer' }}
              >
                Reject KYC
              </button>
              <button 
                onClick={() => { setPreviewKyc(null); addToast(`KYC submission approved and finalized for ${previewKyc.employee}!`, "success"); }}
                style={{ flex: 1, padding: '10px', background: '#10b981', border: 'none', borderRadius: '8px', color: '#fff', fontSize: '13px', fontWeight: '700', cursor: 'pointer' }}
              >
                Approve KYC
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}


