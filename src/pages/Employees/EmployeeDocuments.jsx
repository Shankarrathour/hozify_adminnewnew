import React, { useState } from 'react';
import {
  Search, ListFilter, FileText, CheckCircle2, AlertCircle, Clock, Download, Eye, X, ShieldCheck, MoreVertical, Calendar as CalendarIcon
} from 'lucide-react';
import { useToast } from '../../components/common/ToastNotification';
import { Calendar as DateRangeCalendar } from 'react-date-range';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';

const MOCK_DOCUMENTS = [
  { id: 'DOC-901', employee: 'John Doe', type: 'Employment Contract', uploadDate: 'Sep 10, 2025', expiryDate: 'N/A', status: 'VERIFIED' },
  { id: 'DOC-902', employee: 'Alice Smith', type: 'Driving License', uploadDate: 'Oct 05, 2026', expiryDate: 'Nov 12, 2026', status: 'PENDING' },
  { id: 'DOC-903', employee: 'Bob Johnson', type: 'Health Certificate', uploadDate: 'Jan 15, 2024', expiryDate: 'Jan 15, 2025', status: 'EXPIRED' },
  { id: 'DOC-904', employee: 'Eve Williams', type: 'Background Check', uploadDate: 'Oct 12, 2026', expiryDate: 'Oct 12, 2027', status: 'VERIFIED' },
  { id: 'DOC-905', employee: 'Charlie Brown', type: 'Police Clearance', uploadDate: 'Oct 14, 2026', expiryDate: 'Oct 14, 2027', status: 'PENDING' },
];

export default function EmployeeDocuments() {
  const { addToast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [previewDoc, setPreviewDoc] = useState(null);
  const [activeDropdown, setActiveDropdown] = useState(null);

  const [date, setDate] = useState('2024-06-14');

  const filteredDocs = MOCK_DOCUMENTS.filter(d => {
    const matchSearch = d.employee.toLowerCase().includes(searchTerm.toLowerCase()) || d.type.toLowerCase().includes(searchTerm.toLowerCase());
    const matchStatus = statusFilter === 'All' || d.status === statusFilter;
    return matchSearch && matchStatus;
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-section)', paddingBottom: '40px' }}>
      
      {/* Table Section */}
      <div className="panel" style={{ background: '#fff', border: '1.5px solid #25108f', borderRadius: '12px', padding: 'var(--spacing-section)', overflow: 'visible' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <h3 style={{ fontSize: '16px', fontWeight: '800', color: 'var(--text)', margin: 0 }}>Document Repository</h3>
          <div style={{ position: 'relative', zIndex: 99 }}>
            {activeDropdown === 'calendar' && (
              <div style={{ position: 'fixed', inset: 0, zIndex: 40 }} onClick={() => setActiveDropdown(null)} />
            )}
            <div 
              onClick={() => setActiveDropdown(activeDropdown === 'calendar' ? null : 'calendar')}
              style={{ display: 'flex', alignItems: 'center', gap: '8px', border: '1.5px solid #25108f', padding: '6px 12px', borderRadius: '6px', background: '#fff', cursor: 'pointer', position: 'relative', zIndex: 41 }}
            >
              <CalendarIcon size={16} />
              <span style={{ fontWeight: '700', fontSize: '13px', color: 'var(--text)' }}>
                {date ? new Date(date).toLocaleDateString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' }) : 'Select Date'}
              </span>
            </div>
            {activeDropdown === 'calendar' && (
              <div className="calendar-dropdown">
                <DateRangeCalendar 
                  date={date ? new Date(date) : new Date()}
                  onChange={(item) => {
                    const localDate = new Date(item.getTime() - (item.getTimezoneOffset() * 60000)).toISOString().split('T')[0];
                    setDate(localDate);
                    setActiveDropdown(null);
                  }}
                  color="#25108f"
                />
              </div>
            )}
          </div>
        </div>

        <div className="table-wrap" style={{ overflowX: 'auto' }}>
          <div className="table-responsive-wrapper">
<table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr style={{ borderBottom: '1.5px solid #25108f' }}>
                <th style={{ padding: '12px', fontSize: '11px', color: 'var(--muted)' }}>Employee Name</th>
                <th style={{ padding: '12px', fontSize: '11px', color: 'var(--muted)' }}>Document Type</th>
                <th style={{ padding: '12px', fontSize: '11px', color: 'var(--muted)' }}>Status</th>
                <th style={{ padding: '12px', fontSize: '11px', color: 'var(--muted)', textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredDocs.map((row) => (
                <tr key={row.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                  <td style={{ padding: '12px' }}>{row.employee}</td>
                  <td style={{ padding: '12px' }}>{row.type}</td>
                  <td style={{ padding: '12px' }}>{row.status}</td>
                  <td style={{ padding: '12px', textAlign: 'right', position: 'relative' }}>
                    <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
                      
                      {/* View Dropdown Button */}
                      <div style={{ position: 'relative' }}>
                        <button 
                          onClick={() => setActiveDropdown(activeDropdown === row.id ? null : row.id)} 
                          style={{ background: '#f8fafc', border: '1.5px solid #25108f', padding: '6px 12px', borderRadius: '6px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '5px' }}
                        >
                          <Eye size={14} /> View
                        </button>

                        {activeDropdown === row.id && (
                          <div style={{ position: 'absolute', right: 0, top: '100%', marginTop: '5px', background: '#fff', border: '1.5px solid #25108f', borderRadius: '8px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)', zIndex: 10, width: '160px', padding: '5px 0' }}>
                            <button onClick={() => { setPreviewDoc(row); setActiveDropdown(null); }} style={{ display: 'block', width: '100%', padding: '8px 12px', textAlign: 'left', border: 'none', background: 'none', cursor: 'pointer' }}>View Document</button>
                            <button onClick={() => { addToast(`Upload triggered for ${row.id}`); setActiveDropdown(null); }} style={{ display: 'block', width: '100%', padding: '8px 12px', textAlign: 'left', border: 'none', background: 'none', cursor: 'pointer' }}>Upload New Version</button>
                            <button onClick={() => { addToast(`Delete ${row.id}`); setActiveDropdown(null); }} style={{ display: 'block', width: '100%', padding: '8px 12px', textAlign: 'left', border: 'none', background: 'none', cursor: 'pointer', color: 'red' }}>Delete</button>
                          </div>
                        )}
                      </div>

                      <button onClick={() => addToast(`Downloading ${row.id}`)} style={{ background: '#f8fafc', border: '1.5px solid #25108f', padding: '6px', borderRadius: '6px', cursor: 'pointer' }}>
                        <Download size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
</div>
        </div>
      </div>

      {/* Modal logic same as before... */}
    </div>
  );
}

