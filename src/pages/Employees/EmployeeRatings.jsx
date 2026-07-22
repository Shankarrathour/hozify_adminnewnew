import React, { useState } from 'react';
import {
  Search, ListFilter, Star, MessageSquare, ThumbsUp, ThumbsDown, TrendingUp, User
} from 'lucide-react';
import { useToast } from '../../components/common/ToastNotification';

const MOCK_RATINGS = [
  { id: 'EMP-001', name: 'John Doe', branch: 'Downtown HQ', rating: 4.8, reviews: 124, lastReview: '2 days ago', status: 'EXCELLENT' },
  { id: 'EMP-002', name: 'Alice Smith', branch: 'North Suburbs', rating: 4.5, reviews: 98, lastReview: '1 week ago', status: 'GOOD' },
  { id: 'EMP-003', name: 'Bob Johnson', branch: 'Westside Heights', rating: 3.2, reviews: 45, lastReview: '3 days ago', status: 'NEEDS IMPROVEMENT' },
  { id: 'EMP-004', name: 'Eve Williams', branch: 'East River', rating: 4.9, reviews: 210, lastReview: '1 day ago', status: 'EXCELLENT' },
  { id: 'EMP-005', name: 'Charlie Brown', branch: 'Downtown HQ', rating: 4.1, reviews: 67, lastReview: '2 weeks ago', status: 'GOOD' },
];

const MOCK_TOP_RATED = [
  { name: 'Eve Williams', branch: 'East River', rating: 4.9 },
  { name: 'John Doe', branch: 'Downtown HQ', rating: 4.8 },
  { name: 'Sarah Jenkins', branch: 'North Suburbs', rating: 4.7 }
];

export default function EmployeeRatings() {
  const { addToast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredRatings = MOCK_RATINGS.filter(r => 
    r.name.toLowerCase().includes(searchTerm.toLowerCase()) || r.branch.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-section)', paddingBottom: '40px' }}>
      
      {/* KPI Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '24px' }}>
        <div 
          onClick={() => addToast("Card clicked: Average Rating details", "success")}
          className="kpi-card" 
          style={{ padding: '12px', borderRadius: '12px', border: '1.5px solid #25108f', background: '#fff', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', minHeight: '80px', cursor: 'pointer' }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', width: '100%' }}>
            <div>
              <span style={{ fontSize: '9px', fontWeight: '800', color: 'var(--muted)', textTransform: 'uppercase', display: 'block' }}>Average Rating</span>
              <strong style={{ display: 'block', fontSize: '18px', fontWeight: '800', color: 'var(--text)', marginTop: '4px' }}>4.6</strong>
              <div style={{ display: 'flex', gap: '2px', marginTop: '4px' }}>
                {[1, 2, 3, 4, 5].map(i => (
                  <Star key={i} size={10} fill={i <= 4 ? '#f59e0b' : '#e2e8f0'} color={i <= 4 ? '#f59e0b' : '#cbd5e1'} />
                ))}
              </div>
            </div>
            <div style={{ width: '28px', height: '28px', borderRadius: '8px', background: '#fef3c7', color: '#d97706', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Star size={14} />
            </div>
          </div>
        </div>

        <div 
          onClick={() => addToast("Card clicked: Total Reviews count metrics", "success")}
          className="kpi-card" 
          style={{ padding: '12px', borderRadius: '12px', border: '1.5px solid #25108f', background: '#fff', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', minHeight: '80px', cursor: 'pointer' }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', width: '100%' }}>
            <div>
              <span style={{ fontSize: '9px', fontWeight: '800', color: 'var(--muted)', textTransform: 'uppercase', display: 'block' }}>Total Reviews</span>
              <strong style={{ display: 'block', fontSize: '18px', fontWeight: '800', color: 'var(--text)', marginTop: '4px' }}>12,450</strong>
              <span style={{ fontSize: '9px', color: '#10b981', fontWeight: '700', marginTop: '2px', display: 'block' }}>+450 this month</span>
            </div>
            <div style={{ width: '28px', height: '28px', borderRadius: '8px', background: '#eff6ff', color: '#3b82f6', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <MessageSquare size={14} />
            </div>
          </div>
        </div>

        <div 
          onClick={() => addToast("Card clicked: Positive Reviews breakdown", "success")}
          className="kpi-card" 
          style={{ padding: '12px', borderRadius: '12px', border: '1.5px solid #25108f', background: '#fff', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', minHeight: '80px', cursor: 'pointer' }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', width: '100%' }}>
            <div>
              <span style={{ fontSize: '9px', fontWeight: '800', color: 'var(--muted)', textTransform: 'uppercase', display: 'block' }}>Positive Reviews</span>
              <strong style={{ display: 'block', fontSize: '18px', fontWeight: '800', color: 'var(--text)', marginTop: '4px' }}>92%</strong>
              <span style={{ fontSize: '9px', color: '#10b981', fontWeight: '700', marginTop: '2px', display: 'block' }}>Rated 4 or 5 stars</span>
            </div>
            <div style={{ width: '28px', height: '28px', borderRadius: '8px', background: '#f0fdf4', color: '#10b981', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <ThumbsUp size={14} />
            </div>
          </div>
        </div>

        <div 
          onClick={() => addToast("Card clicked: Negative Reviews breakdown", "success")}
          className="kpi-card" 
          style={{ padding: '12px', borderRadius: '12px', border: '1.5px solid #25108f', background: '#fff', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', minHeight: '80px', cursor: 'pointer' }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', width: '100%' }}>
            <div>
              <span style={{ fontSize: '9px', fontWeight: '800', color: 'var(--muted)', textTransform: 'uppercase', display: 'block' }}>Negative Reviews</span>
              <strong style={{ display: 'block', fontSize: '18px', fontWeight: '800', color: 'var(--text)', marginTop: '4px' }}>8%</strong>
              <span style={{ fontSize: '9px', color: '#ef4444', fontWeight: '700', marginTop: '2px', display: 'block' }}>Rated 1 or 2 stars</span>
            </div>
            <div style={{ width: '28px', height: '28px', borderRadius: '8px', background: '#fef2f2', color: '#ef4444', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <ThumbsDown size={14} />
            </div>
          </div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 'var(--spacing-section)' }}>
        
        {/* Left Column */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-section)' }}>
          
          <div className="panel" style={{ background: '#fff', border: '1.5px solid #25108f', borderRadius: '12px', padding: 'var(--spacing-section)', marginBottom: 0 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '12px' }}>
              <h3 style={{ fontSize: '16px', fontWeight: '800', color: 'var(--text)', margin: 0 }}>Employee Ratings</h3>
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
                <button 
                  onClick={() => addToast("Ratings filter panel loaded", "success")}
                  style={{ height: '34px', padding: '0 12px', border: '1.5px solid #25108f', background: '#fff', borderRadius: '6px', display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', fontWeight: '700', color: 'var(--text)', cursor: 'pointer' }}
                >
                  <ListFilter size={14} /> Filter
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
                    <th style={{ padding: '12px', fontSize: '11px', fontWeight: '800', color: 'var(--muted)', textTransform: 'uppercase' }}>Rating</th>
                    <th style={{ padding: '12px', fontSize: '11px', fontWeight: '800', color: 'var(--muted)', textTransform: 'uppercase' }}>Review Count</th>
                    <th style={{ padding: '12px', fontSize: '11px', fontWeight: '800', color: 'var(--muted)', textTransform: 'uppercase' }}>Last Review</th>
                    <th style={{ padding: '12px', fontSize: '11px', fontWeight: '800', color: 'var(--muted)', textTransform: 'uppercase' }}>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredRatings.map((row) => (
                      <tr 
                        key={row.id} 
                        onClick={() => addToast(`Opening detailed review console for ${row.name}`, "success")}
                        className="partner-row-clickable"
                      >
                        <td style={{ padding: '12px' }}>
                          <strong style={{ display: 'block', fontSize: '13px', color: 'var(--text)' }}>{row.name}</strong>
                          <span style={{ fontSize: '11px', color: 'var(--muted)' }}>{row.id}</span>
                        </td>
                        <td style={{ padding: '12px', fontSize: '12px', color: 'var(--text)' }}>{row.branch}</td>
                        <td style={{ padding: '12px', fontSize: '13px', color: 'var(--text)', fontWeight: '700' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                            <Star size={14} style={{ color: '#f59e0b', fill: '#f59e0b' }} /> {row.rating}
                          </div>
                        </td>
                        <td style={{ padding: '12px', fontSize: '12px', color: 'var(--muted)' }}>{row.reviews} reviews</td>
                        <td style={{ padding: '12px', fontSize: '12px', color: 'var(--muted)' }}>{row.lastReview}</td>
                        <td style={{ padding: '12px' }}>
                          <span style={{ fontSize: '10px', fontWeight: '800', padding: '4px 8px', borderRadius: '4px', background: row.status === 'EXCELLENT' ? '#d1fae5' : row.status === 'GOOD' ? '#e0e7ff' : '#fee2e2', color: row.status === 'EXCELLENT' ? '#059669' : row.status === 'GOOD' ? '#4f46e5' : '#dc2626' }}>
                            {row.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                    {filteredRatings.length === 0 && (
                      <tr>
                        <td colSpan="6" style={{ padding: 'var(--spacing-section)', textAlign: 'center', color: 'var(--muted)', fontSize: '13px' }}>
                          No ratings found.
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
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-section)', flex: '1' }}>
          
          <div className="panel" style={{ background: '#fff', border: '1.5px solid #25108f', borderRadius: '12px', padding: 'var(--spacing-section)', marginBottom: 0 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
              <TrendingUp size={18} style={{ color: '#4f46e5' }} />
              <h3 style={{ fontSize: '15px', fontWeight: '800', color: 'var(--text)', margin: 0 }}>Top Rated Employees</h3>
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {MOCK_TOP_RATED.map((emp, i) => (
                <div 
                  key={i} 
                  onClick={() => addToast(`Viewing top-rated rating card for ${emp.name}`, "success")}
                  style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px', borderRadius: '8px', background: '#f8fafc', border: '1.5px solid #25108f', cursor: 'pointer' }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{ width: '32px', height: '32px', borderRadius: '16px', background: '#e0e7ff', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#4f46e5' }}>
                      <User size={16} />
                    </div>
                    <div>
                      <strong style={{ display: 'block', fontSize: '13px', color: 'var(--text)' }}>{emp.name}</strong>
                      <span style={{ fontSize: '11px', color: 'var(--muted)' }}>{emp.branch}</span>
                    </div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <Star size={14} style={{ color: '#f59e0b', fill: '#f59e0b' }} />
                    <strong style={{ display: 'block', fontSize: '14px', color: 'var(--text)' }}>{emp.rating}</strong>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="panel" style={{ background: '#fff', border: '1.5px solid #25108f', borderRadius: '12px', padding: 'var(--spacing-section)', marginBottom: 0 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
              <Star size={18} style={{ color: '#f59e0b' }} />
              <h3 style={{ fontSize: '15px', fontWeight: '800', color: 'var(--text)', margin: 0 }}>Rating Distribution</h3>
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {[
                { stars: 5, val: 65, color: '#10b981' },
                { stars: 4, val: 25, color: '#3b82f6' },
                { stars: 3, val: 5, color: '#f59e0b' },
                { stars: 2, val: 3, color: '#f97316' },
                { stars: 1, val: 2, color: '#ef4444' },
              ].map(item => (
                <div key={item.stars}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', fontWeight: '700', marginBottom: '6px' }}>
                    <span style={{ color: 'var(--text)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                      {item.stars} <Star size={10} style={{ color: '#f59e0b', fill: '#f59e0b' }} />
                    </span>
                    <span style={{ color: 'var(--muted)' }}>{item.val}%</span>
                  </div>
                  <div style={{ height: '6px', background: '#f1f5f9', borderRadius: '3px', overflow: 'hidden' }}>
                    <div style={{ width: `${item.val}%`, height: '100%', background: item.color, borderRadius: '3px' }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}


